// SPDX-License-Identifier: GPL-3.0-or-later
// Ported from Keiyoushi's TheBlank extension (libsodium secretstream).

// @ts-ignore
import CryptoJS from "crypto-js";

const TAG_MESSAGE = 0x00;
const TAG_PUSH = 0x01;
const TAG_REKEY = 0x02;
export const TAG_FINAL = TAG_PUSH | TAG_REKEY; // 0x03
export const ABYTES = 17; // 1 + 16

const PAD0 = new Uint8Array(16);

export class SecretStreamState {
  k = new Uint8Array(32);
  nonce = new Uint8Array(12);
  _pad = new Uint8Array(8);
}

export class SecretStream {
  initPull(state: SecretStreamState, header: Uint8Array, key: Uint8Array): void {
    HChaCha20(state.k, header, key);
    counterReset(state);
    state.nonce.set(header.subarray(16, 24), 4);
    state._pad.fill(0);
  }

  pull(
    state: SecretStreamState,
    input: Uint8Array,
    ad?: Uint8Array,
  ): { message: Uint8Array; tag: number } | null {
    const inlen = input.length;
    if (inlen < ABYTES) return null;
    const mlen = inlen - ABYTES;

    const polyState = new Poly1305State();
    const block = new Uint8Array(64);
    const slen = new Uint8Array(8);
    const mac = new Uint8Array(16);

    // Poly1305 key from ChaCha20
    ChaCha20.streamIETF(block, 64, state.nonce, state.k);
    Poly1305.init(polyState, block);
    block.fill(0);

    if (ad && ad.length > 0) {
      Poly1305.update(polyState, ad, 0, ad.length);
      Poly1305.update(polyState, PAD0, 0, (0x10 - ad.length) & 0xf);
    }

    block.fill(0);
    block[0] = input[0] ?? 0;
    ChaCha20.streamIETFXorIC(block, block, 64, state.nonce, 1, state.k);
    const tag = block[0] ?? 0;
    block[0] = input[0] ?? 0;
    Poly1305.update(polyState, block, 0, 64);

    const c = input.subarray(1);
    Poly1305.update(polyState, c, 0, mlen);
    const padLen = (0x10 - 64 + mlen) & 0xf;
    Poly1305.update(polyState, PAD0, 0, padLen);

    store64_le(slen, 0, ad ? ad.length : 0);
    Poly1305.update(polyState, slen, 0, 8);
    store64_le(slen, 0, 64 + mlen);
    Poly1305.update(polyState, slen, 0, 8);

    Poly1305.finalizeMAC(polyState, mac);

    const macStart = 1 + mlen;
    const storedMac = input.subarray(macStart, macStart + 16);
    if (!constantTimeCompare(mac, storedMac)) {
      mac.fill(0);
      return null;
    }

    const m = new Uint8Array(mlen);
    ChaCha20.streamIETFXorIC(m, c, mlen, state.nonce, 2, state.k);

    for (let i = 0; i < 8; i++) {
      const idx = 4 + i;
      const current = state.nonce[idx] ?? 0;
      state.nonce[idx] = current ^ (mac[i] ?? 0);
    }
    incrementCounter(state);
    if ((tag & TAG_REKEY) !== 0 || isCounterZero(state)) {
      rekey(state);
    }

    return { message: m, tag };
  }
}

export function sha256Bytes(input: string): Uint8Array {
  const hash = CryptoJS.SHA256(CryptoJS.enc.Utf8.parse(input));
  const hex = hash.toString(CryptoJS.enc.Hex);
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return out;
}

export function decodeBase64Url(input: string): Uint8Array {
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  const raw = CryptoJS.enc.Base64.parse(padded);
  const out = new Uint8Array(raw.sigBytes);
  for (let i = 0; i < raw.sigBytes; i++) {
    out[i] = (raw.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
  }
  return out;
}

export function rsaDecryptOaep(privateKeyDerBase64: string, ciphertext: Uint8Array): Uint8Array {
  const der = decodeBase64Url(privateKeyDerBase64);
  const { n, d } = parsePkcs8PrivateKey(der);
  const k = getByteLength(n);
  const m = modPow(os2ip(ciphertext), d, n);
  const em = i2osp(m, k);
  return oaepDecode(em);
}

// --- RSA + OAEP helpers ---

function parsePkcs8PrivateKey(data: Uint8Array): { n: bigint; d: bigint } {
  const reader = new DerReader(data);
  reader.expectTag(0x30); // sequence
  reader.readLength();
  reader.readInteger(); // version
  reader.readSequence(); // algorithm id
  const pkcs1 = reader.readOctetString();
  const pkcsReader = new DerReader(pkcs1);
  pkcsReader.expectTag(0x30);
  pkcsReader.readLength();
  pkcsReader.readInteger(); // version
  const n = pkcsReader.readInteger();
  pkcsReader.readInteger(); // e
  const d = pkcsReader.readInteger();
  return { n, d };
}

function oaepDecode(em: Uint8Array): Uint8Array {
  const hLen = 32; // SHA-256
  if (em.length < 2 * hLen + 2) {
    throw new Error("OAEP decode error: encoded message too short");
  }
  if (em[0] !== 0) {
    throw new Error("OAEP decode error: leading byte non-zero");
  }
  const seed = em.subarray(1, 1 + hLen);
  const db = em.subarray(1 + hLen);
  const seedMask = mgf1(db, hLen);
  xorInPlace(seed, seedMask);
  const dbMask = mgf1(seed, em.length - hLen - 1);
  xorInPlace(db, dbMask);

  const lHash = sha256Bytes("");
  for (let i = 0; i < hLen; i++) {
    if (db[i] !== lHash[i]) {
      throw new Error("OAEP decode error: lHash mismatch");
    }
  }

  let idx = hLen;
  while (idx < db.length && db[idx] === 0) idx++;
  if (idx >= db.length || db[idx] !== 1) {
    throw new Error("OAEP decode error: 0x01 separator not found");
  }
  return db.subarray(idx + 1);
}

function mgf1(seed: Uint8Array, length: number): Uint8Array {
  const hLen = 32;
  const count = Math.ceil(length / hLen);
  const output = new Uint8Array(count * hLen);
  for (let i = 0; i < count; i++) {
    const counter = i2osp(BigInt(i), 4);
    const data = concatBytes(seed, counter);
    const hash = sha256BytesBytes(data);
    output.set(hash, i * hLen);
  }
  return output.subarray(0, length);
}

function sha256BytesBytes(input: Uint8Array): Uint8Array {
  const wordArray = CryptoJS.lib.WordArray.create(input as any);
  const hash = CryptoJS.SHA256(wordArray);
  const hex = hash.toString(CryptoJS.enc.Hex);
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return out;
}

function os2ip(bytes: Uint8Array): bigint {
  let result = 0n;
  for (const b of bytes) {
    result = (result << 8n) + BigInt(b);
  }
  return result;
}

function i2osp(value: bigint, length: number): Uint8Array {
  const out = new Uint8Array(length);
  let v = value;
  for (let i = length - 1; i >= 0; i--) {
    out[i] = Number(v & 0xffn);
    v >>= 8n;
  }
  return out;
}

function getByteLength(n: bigint): number {
  let bits = 0;
  let temp = n;
  while (temp > 0n) {
    temp >>= 1n;
    bits++;
  }
  return Math.ceil(bits / 8);
}

function modPow(base: bigint, exponent: bigint, modulus: bigint): bigint {
  if (modulus === 1n) return 0n;
  let result = 1n;
  let b = base % modulus;
  let e = exponent;
  while (e > 0n) {
    if (e & 1n) result = (result * b) % modulus;
    e >>= 1n;
    b = (b * b) % modulus;
  }
  return result;
}

function xorInPlace(target: Uint8Array, mask: Uint8Array): void {
  for (let i = 0; i < target.length && i < mask.length; i++) {
    target[i] = (target[i] ?? 0) ^ (mask[i] ?? 0);
  }
}

function concatBytes(a: Uint8Array, b: Uint8Array): Uint8Array {
  const out = new Uint8Array(a.length + b.length);
  out.set(a, 0);
  out.set(b, a.length);
  return out;
}

class DerReader {
  private offset = 0;
  constructor(private data: Uint8Array) {}

  expectTag(tag: number): void {
    const actual = this.data[this.offset++];
    if (actual !== tag) {
      throw new Error(`DER parse error: expected tag ${tag}, got ${actual}`);
    }
  }

  readLength(): number {
    const first = this.data[this.offset++] ?? 0;
    if ((first & 0x80) === 0) return first;
    const lenBytes = first & 0x7f;
    let length = 0;
    for (let i = 0; i < lenBytes; i++) {
      length = (length << 8) | (this.data[this.offset++] ?? 0);
    }
    return length;
  }

  readInteger(): bigint {
    this.expectTag(0x02);
    const len = this.readLength();
    const start = this.offset;
    const end = start + len;
    this.offset = end;
    let bytes = this.data.subarray(start, end);
    if (bytes[0] === 0x00) bytes = bytes.subarray(1);
    return os2ip(bytes);
  }

  readSequence(): Uint8Array {
    this.expectTag(0x30);
    const len = this.readLength();
    const start = this.offset;
    this.offset += len;
    return this.data.subarray(start, start + len);
  }

  readOctetString(): Uint8Array {
    this.expectTag(0x04);
    const len = this.readLength();
    const start = this.offset;
    this.offset += len;
    return this.data.subarray(start, start + len);
  }
}

// --- SecretStream helpers (ported) ---

class ChaCha20 {
  private static readonly ROUNDS = 20;

  private static chachaBlock(output: Uint32Array, input: Uint32Array): void {
    let x0 = input[0]!;
    let x1 = input[1]!;
    let x2 = input[2]!;
    let x3 = input[3]!;
    let x4 = input[4]!;
    let x5 = input[5]!;
    let x6 = input[6]!;
    let x7 = input[7]!;
    let x8 = input[8]!;
    let x9 = input[9]!;
    let x10 = input[10]!;
    let x11 = input[11]!;
    let x12 = input[12]!;
    let x13 = input[13]!;
    let x14 = input[14]!;
    let x15 = input[15]!;

    for (let i = 0; i < ChaCha20.ROUNDS; i += 2) {
      x0 += x4;
      x12 = rotl32(x12 ^ x0, 16);
      x8 += x12;
      x4 = rotl32(x4 ^ x8, 12);
      x0 += x4;
      x12 = rotl32(x12 ^ x0, 8);
      x8 += x12;
      x4 = rotl32(x4 ^ x8, 7);

      x1 += x5;
      x13 = rotl32(x13 ^ x1, 16);
      x9 += x13;
      x5 = rotl32(x5 ^ x9, 12);
      x1 += x5;
      x13 = rotl32(x13 ^ x1, 8);
      x9 += x13;
      x5 = rotl32(x5 ^ x9, 7);

      x2 += x6;
      x14 = rotl32(x14 ^ x2, 16);
      x10 += x14;
      x6 = rotl32(x6 ^ x10, 12);
      x2 += x6;
      x14 = rotl32(x14 ^ x2, 8);
      x10 += x14;
      x6 = rotl32(x6 ^ x10, 7);

      x3 += x7;
      x15 = rotl32(x15 ^ x3, 16);
      x11 += x15;
      x7 = rotl32(x7 ^ x11, 12);
      x3 += x7;
      x15 = rotl32(x15 ^ x3, 8);
      x11 += x15;
      x7 = rotl32(x7 ^ x11, 7);

      x0 += x5;
      x15 = rotl32(x15 ^ x0, 16);
      x10 += x15;
      x5 = rotl32(x5 ^ x10, 12);
      x0 += x5;
      x15 = rotl32(x15 ^ x0, 8);
      x10 += x15;
      x5 = rotl32(x5 ^ x10, 7);

      x1 += x6;
      x12 = rotl32(x12 ^ x1, 16);
      x11 += x12;
      x6 = rotl32(x6 ^ x11, 12);
      x1 += x6;
      x12 = rotl32(x12 ^ x1, 8);
      x11 += x12;
      x6 = rotl32(x6 ^ x11, 7);

      x2 += x7;
      x13 = rotl32(x13 ^ x2, 16);
      x8 += x13;
      x7 = rotl32(x7 ^ x8, 12);
      x2 += x7;
      x13 = rotl32(x13 ^ x2, 8);
      x8 += x13;
      x7 = rotl32(x7 ^ x8, 7);

      x3 += x4;
      x14 = rotl32(x14 ^ x3, 16);
      x9 += x14;
      x4 = rotl32(x4 ^ x9, 12);
      x3 += x4;
      x14 = rotl32(x14 ^ x3, 8);
      x9 += x14;
      x4 = rotl32(x4 ^ x9, 7);
    }

    output[0] = (x0 + input[0]!) >>> 0;
    output[1] = (x1 + input[1]!) >>> 0;
    output[2] = (x2 + input[2]!) >>> 0;
    output[3] = (x3 + input[3]!) >>> 0;
    output[4] = (x4 + input[4]!) >>> 0;
    output[5] = (x5 + input[5]!) >>> 0;
    output[6] = (x6 + input[6]!) >>> 0;
    output[7] = (x7 + input[7]!) >>> 0;
    output[8] = (x8 + input[8]!) >>> 0;
    output[9] = (x9 + input[9]!) >>> 0;
    output[10] = (x10 + input[10]!) >>> 0;
    output[11] = (x11 + input[11]!) >>> 0;
    output[12] = (x12 + input[12]!) >>> 0;
    output[13] = (x13 + input[13]!) >>> 0;
    output[14] = (x14 + input[14]!) >>> 0;
    output[15] = (x15 + input[15]!) >>> 0;
  }

  static streamIETF(c: Uint8Array, clen: number, nonce: Uint8Array, key: Uint8Array): void {
    const input = new Uint32Array(16);
    const output = new Uint32Array(16);
    const block = new Uint8Array(64);

    input[0] = 0x61707865;
    input[1] = 0x3320646e;
    input[2] = 0x79622d32;
    input[3] = 0x6b206574;

    input[4] = load32_le(key, 0);
    input[5] = load32_le(key, 4);
    input[6] = load32_le(key, 8);
    input[7] = load32_le(key, 12);
    input[8] = load32_le(key, 16);
    input[9] = load32_le(key, 20);
    input[10] = load32_le(key, 24);
    input[11] = load32_le(key, 28);

    input[12] = 0;
    input[13] = load32_le(nonce, 0);
    input[14] = load32_le(nonce, 4);
    input[15] = load32_le(nonce, 8);

    let pos = 0;
    while (pos < clen) {
      ChaCha20.chachaBlock(output, input);
      for (let i = 0; i < 16; i++) {
        store32_le(block, i * 4, output[i]!);
      }
      const remaining = clen - pos;
      const toCopy = Math.min(remaining, 64);
      c.set(block.subarray(0, toCopy), pos);
      pos += 64;
      input[12] = (input[12]! + 1) >>> 0;
    }
  }

  static streamIETFXorIC(
    c: Uint8Array,
    m: Uint8Array,
    mlen: number,
    nonce: Uint8Array,
    ic: number,
    key: Uint8Array,
  ): void {
    const input = new Uint32Array(16);
    const output = new Uint32Array(16);
    const block = new Uint8Array(64);

    input[0] = 0x61707865;
    input[1] = 0x3320646e;
    input[2] = 0x79622d32;
    input[3] = 0x6b206574;

    input[4] = load32_le(key, 0);
    input[5] = load32_le(key, 4);
    input[6] = load32_le(key, 8);
    input[7] = load32_le(key, 12);
    input[8] = load32_le(key, 16);
    input[9] = load32_le(key, 20);
    input[10] = load32_le(key, 24);
    input[11] = load32_le(key, 28);

    input[12] = ic >>> 0;
    input[13] = load32_le(nonce, 0);
    input[14] = load32_le(nonce, 4);
    input[15] = load32_le(nonce, 8);

    let pos = 0;
    while (pos < mlen) {
      ChaCha20.chachaBlock(output, input);
      for (let i = 0; i < 16; i++) {
        store32_le(block, i * 4, output[i]!);
      }
      const remaining = mlen - pos;
      const toProcess = Math.min(remaining, 64);
      for (let i = 0; i < toProcess; i++) {
        c[pos + i] = (m[pos + i] ?? 0) ^ (block[i] ?? 0);
      }
      pos += 64;
      input[12] = (input[12]! + 1) >>> 0;
    }
  }
}

class Poly1305State {
  r0 = 0;
  r1 = 0;
  r2 = 0;
  r3 = 0;
  r4 = 0;
  h0 = 0;
  h1 = 0;
  h2 = 0;
  h3 = 0;
  h4 = 0;
  pad0 = 0;
  pad1 = 0;
  pad2 = 0;
  pad3 = 0;
  buffer = new Uint8Array(16);
  leftover = 0;
}

class Poly1305 {
  static init(state: Poly1305State, key: Uint8Array): void {
    const t0 = load32_le(key, 0);
    const t1 = load32_le(key, 4);
    const t2 = load32_le(key, 8);
    const t3 = load32_le(key, 12);

    state.r0 = t0 & 0x3ffffff;
    state.r1 = ((t0 >>> 26) | (t1 << 6)) & 0x3ffff03;
    state.r2 = ((t1 >>> 20) | (t2 << 12)) & 0x3ffc0ff;
    state.r3 = ((t2 >>> 14) | (t3 << 18)) & 0x3f03fff;
    state.r4 = (t3 >>> 8) & 0x00fffff;

    state.h0 = 0;
    state.h1 = 0;
    state.h2 = 0;
    state.h3 = 0;
    state.h4 = 0;

    state.pad0 = load32_le(key, 16);
    state.pad1 = load32_le(key, 20);
    state.pad2 = load32_le(key, 24);
    state.pad3 = load32_le(key, 28);

    state.leftover = 0;
  }

  static update(state: Poly1305State, m: Uint8Array, offset: number, mlen: number): void {
    let pos = offset;
    let remaining = mlen;

    if (state.leftover > 0) {
      let want = 16 - state.leftover;
      if (want > remaining) want = remaining;
      state.buffer.set(m.subarray(pos, pos + want), state.leftover);
      remaining -= want;
      pos += want;
      state.leftover += want;
      if (state.leftover < 16) return;
      Poly1305.blocks(state, state.buffer, 0, 16);
      state.leftover = 0;
    }

    if (remaining >= 16) {
      const want = remaining & ~15;
      Poly1305.blocks(state, m, pos, want);
      pos += want;
      remaining -= want;
    }

    if (remaining > 0) {
      state.buffer.set(m.subarray(pos, pos + remaining), 0);
      state.leftover = remaining;
    }
  }

  static finalizeMAC(state: Poly1305State, mac: Uint8Array): void {
    if (state.leftover > 0) {
      state.buffer[state.leftover] = 1;
      for (let i = state.leftover + 1; i < 16; i++) state.buffer[i] = 0;
      Poly1305.blocksPartial(state, state.buffer, 0, 16);
    }

    let h0 = state.h0;
    let h1 = state.h1;
    let h2 = state.h2;
    let h3 = state.h3;
    let h4 = state.h4;

    let c = h1 >>> 26;
    h1 &= 0x3ffffff;
    h2 += c;
    c = h2 >>> 26;
    h2 &= 0x3ffffff;
    h3 += c;
    c = h3 >>> 26;
    h3 &= 0x3ffffff;
    h4 += c;
    c = h4 >>> 26;
    h4 &= 0x3ffffff;
    h0 += c * 5;
    c = h0 >>> 26;
    h0 &= 0x3ffffff;
    h1 += c;

    let g0 = h0 + 5;
    c = g0 >>> 26;
    g0 &= 0x3ffffff;
    let g1 = h1 + c;
    c = g1 >>> 26;
    g1 &= 0x3ffffff;
    let g2 = h2 + c;
    c = g2 >>> 26;
    g2 &= 0x3ffffff;
    let g3 = h3 + c;
    c = g3 >>> 26;
    g3 &= 0x3ffffff;
    let g4 = h4 + c - (1 << 26);

    let mask = (g4 >>> 63) - 1;
    g0 &= mask;
    g1 &= mask;
    g2 &= mask;
    g3 &= mask;
    g4 &= mask;
    mask = ~mask;
    h0 = (h0 & mask) | g0;
    h1 = (h1 & mask) | g1;
    h2 = (h2 & mask) | g2;
    h3 = (h3 & mask) | g3;
    h4 = (h4 & mask) | g4;

    h0 = (h0 | (h1 << 26)) >>> 0;
    h1 = ((h1 >>> 6) | (h2 << 20)) >>> 0;
    h2 = ((h2 >>> 12) | (h3 << 14)) >>> 0;
    h3 = ((h3 >>> 18) | (h4 << 8)) >>> 0;

    let f = (h0 + state.pad0) >>> 0;
    h0 = f >>> 0;
    f = (h1 + state.pad1 + (f >>> 32)) >>> 0;
    h1 = f >>> 0;
    f = (h2 + state.pad2 + (f >>> 32)) >>> 0;
    h2 = f >>> 0;
    f = (h3 + state.pad3 + (f >>> 32)) >>> 0;
    h3 = f >>> 0;

    store32_le(mac, 0, h0);
    store32_le(mac, 4, h1);
    store32_le(mac, 8, h2);
    store32_le(mac, 12, h3);
  }

  private static blocks(state: Poly1305State, m: Uint8Array, offset: number, bytes: number): void {
    const hibit = 1 << 24;
    let r0 = state.r0;
    let r1 = state.r1;
    let r2 = state.r2;
    let r3 = state.r3;
    let r4 = state.r4;

    let h0 = state.h0;
    let h1 = state.h1;
    let h2 = state.h2;
    let h3 = state.h3;
    let h4 = state.h4;

    const s1 = r1 * 5;
    const s2 = r2 * 5;
    const s3 = r3 * 5;
    const s4 = r4 * 5;

    let pos = offset;
    while (bytes >= 16) {
      const t0 = load32_le(m, pos + 0);
      const t1 = load32_le(m, pos + 4);
      const t2 = load32_le(m, pos + 8);
      const t3 = load32_le(m, pos + 12);

      h0 += t0 & 0x3ffffff;
      h1 += ((t0 >>> 26) | (t1 << 6)) & 0x3ffffff;
      h2 += ((t1 >>> 20) | (t2 << 12)) & 0x3ffffff;
      h3 += ((t2 >>> 14) | (t3 << 18)) & 0x3ffffff;
      h4 += (t3 >>> 8) | hibit;

      const d0 = h0 * r0 + h1 * s4 + h2 * s3 + h3 * s2 + h4 * s1;
      const d1 = h0 * r1 + h1 * r0 + h2 * s4 + h3 * s3 + h4 * s2;
      const d2 = h0 * r2 + h1 * r1 + h2 * r0 + h3 * s4 + h4 * s3;
      const d3 = h0 * r3 + h1 * r2 + h2 * r1 + h3 * r0 + h4 * s4;
      const d4 = h0 * r4 + h1 * r3 + h2 * r2 + h3 * r1 + h4 * r0;

      let c = d0 >>> 26;
      h0 = d0 & 0x3ffffff;
      let u1 = d1 + c;
      c = u1 >>> 26;
      h1 = u1 & 0x3ffffff;
      let u2 = d2 + c;
      c = u2 >>> 26;
      h2 = u2 & 0x3ffffff;
      let u3 = d3 + c;
      c = u3 >>> 26;
      h3 = u3 & 0x3ffffff;
      let u4 = d4 + c;
      c = u4 >>> 26;
      h4 = u4 & 0x3ffffff;
      h0 += c * 5;
      c = h0 >>> 26;
      h0 &= 0x3ffffff;
      h1 += c;

      pos += 16;
      bytes -= 16;
    }

    state.h0 = h0;
    state.h1 = h1;
    state.h2 = h2;
    state.h3 = h3;
    state.h4 = h4;
  }

  private static blocksPartial(
    state: Poly1305State,
    m: Uint8Array,
    offset: number,
    _bytes: number,
  ): void {
    const r0 = state.r0;
    const r1 = state.r1;
    const r2 = state.r2;
    const r3 = state.r3;
    const r4 = state.r4;

    let h0 = state.h0;
    let h1 = state.h1;
    let h2 = state.h2;
    let h3 = state.h3;
    let h4 = state.h4;

    const s1 = r1 * 5;
    const s2 = r2 * 5;
    const s3 = r3 * 5;
    const s4 = r4 * 5;

    const t0 = load32_le(m, offset + 0);
    const t1 = load32_le(m, offset + 4);
    const t2 = load32_le(m, offset + 8);
    const t3 = load32_le(m, offset + 12);

    h0 += t0 & 0x3ffffff;
    h1 += ((t0 >>> 26) | (t1 << 6)) & 0x3ffffff;
    h2 += ((t1 >>> 20) | (t2 << 12)) & 0x3ffffff;
    h3 += ((t2 >>> 14) | (t3 << 18)) & 0x3ffffff;
    h4 += t3 >>> 8;

    const d0 = h0 * r0 + h1 * s4 + h2 * s3 + h3 * s2 + h4 * s1;
    const d1 = h0 * r1 + h1 * r0 + h2 * s4 + h3 * s3 + h4 * s2;
    const d2 = h0 * r2 + h1 * r1 + h2 * r0 + h3 * s4 + h4 * s3;
    const d3 = h0 * r3 + h1 * r2 + h2 * r1 + h3 * r0 + h4 * s4;
    const d4 = h0 * r4 + h1 * r3 + h2 * r2 + h3 * r1 + h4 * r0;

    let c = d0 >>> 26;
    h0 = d0 & 0x3ffffff;
    let u1 = d1 + c;
    c = u1 >>> 26;
    h1 = u1 & 0x3ffffff;
    let u2 = d2 + c;
    c = u2 >>> 26;
    h2 = u2 & 0x3ffffff;
    let u3 = d3 + c;
    c = u3 >>> 26;
    h3 = u3 & 0x3ffffff;
    let u4 = d4 + c;
    c = u4 >>> 26;
    h4 = u4 & 0x3ffffff;
    h0 += c * 5;
    c = h0 >>> 26;
    h0 &= 0x3ffffff;
    h1 += c;

    state.h0 = h0;
    state.h1 = h1;
    state.h2 = h2;
    state.h3 = h3;
    state.h4 = h4;
  }
}

function HChaCha20(out: Uint8Array, input: Uint8Array, key: Uint8Array): void {
  const x = new Uint32Array(16);
  x[0] = 0x61707865;
  x[1] = 0x3320646e;
  x[2] = 0x79622d32;
  x[3] = 0x6b206574;

  x[4] = load32_le(key, 0);
  x[5] = load32_le(key, 4);
  x[6] = load32_le(key, 8);
  x[7] = load32_le(key, 12);
  x[8] = load32_le(key, 16);
  x[9] = load32_le(key, 20);
  x[10] = load32_le(key, 24);
  x[11] = load32_le(key, 28);
  x[12] = load32_le(input, 0);
  x[13] = load32_le(input, 4);
  x[14] = load32_le(input, 8);
  x[15] = load32_le(input, 12);

  for (let i = 0; i < 10; i++) {
    [x[0], x[4], x[8], x[12]] = quarterRound(x[0], x[4], x[8], x[12]);
    [x[1], x[5], x[9], x[13]] = quarterRound(x[1], x[5], x[9], x[13]);
    [x[2], x[6], x[10], x[14]] = quarterRound(x[2], x[6], x[10], x[14]);
    [x[3], x[7], x[11], x[15]] = quarterRound(x[3], x[7], x[11], x[15]);

    [x[0], x[5], x[10], x[15]] = quarterRound(x[0], x[5], x[10], x[15]);
    [x[1], x[6], x[11], x[12]] = quarterRound(x[1], x[6], x[11], x[12]);
    [x[2], x[7], x[8], x[13]] = quarterRound(x[2], x[7], x[8], x[13]);
    [x[3], x[4], x[9], x[14]] = quarterRound(x[3], x[4], x[9], x[14]);
  }

  store32_le(out, 0, x[0]!);
  store32_le(out, 4, x[1]!);
  store32_le(out, 8, x[2]!);
  store32_le(out, 12, x[3]!);
  store32_le(out, 16, x[12]!);
  store32_le(out, 20, x[13]!);
  store32_le(out, 24, x[14]!);
  store32_le(out, 28, x[15]!);
}

function counterReset(state: SecretStreamState): void {
  state.nonce.fill(0);
  state.nonce[0] = 1;
}

function rekey(state: SecretStreamState): void {
  const newKeyAndInonce = new Uint8Array(40);
  newKeyAndInonce.set(state.k, 0);
  newKeyAndInonce.set(state.nonce.subarray(4, 12), 32);
  ChaCha20.streamIETFXorIC(newKeyAndInonce, newKeyAndInonce, 40, state.nonce, 0, state.k);
  state.k.set(newKeyAndInonce.subarray(0, 32), 0);
  state.nonce.set(newKeyAndInonce.subarray(32, 40), 4);
  counterReset(state);
}

function incrementCounter(state: SecretStreamState): void {
  let carry = 1;
  for (let i = 0; i < 4; i++) {
    const val = (state.nonce[i] ?? 0) + carry;
    state.nonce[i] = val & 0xff;
    carry = val >> 8;
    if (carry === 0) break;
  }
}

function isCounterZero(state: SecretStreamState): boolean {
  for (let i = 0; i < 4; i++) {
    if (state.nonce[i] !== 0) return false;
  }
  return true;
}

function constantTimeCompare(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i]! ^ b[i]!;
  return diff === 0;
}

function store64_le(dst: Uint8Array, offset: number, w: number): void {
  dst[offset] = w & 0xff;
  dst[offset + 1] = (w >>> 8) & 0xff;
  dst[offset + 2] = (w >>> 16) & 0xff;
  dst[offset + 3] = (w >>> 24) & 0xff;
  dst[offset + 4] = 0;
  dst[offset + 5] = 0;
  dst[offset + 6] = 0;
  dst[offset + 7] = 0;
}

function load32_le(src: Uint8Array, offset: number): number {
  return (
    ((src[offset] ?? 0) |
      ((src[offset + 1] ?? 0) << 8) |
      ((src[offset + 2] ?? 0) << 16) |
      ((src[offset + 3] ?? 0) << 24)) >>>
    0
  );
}

function store32_le(dst: Uint8Array, offset: number, w: number): void {
  dst[offset] = w & 0xff;
  dst[offset + 1] = (w >>> 8) & 0xff;
  dst[offset + 2] = (w >>> 16) & 0xff;
  dst[offset + 3] = (w >>> 24) & 0xff;
}

function rotl32(x: number, n: number): number {
  return ((x << n) | (x >>> (32 - n))) >>> 0;
}

function quarterRound(
  a: number,
  b: number,
  c: number,
  d: number,
): [number, number, number, number] {
  a = (a + b) >>> 0;
  d = rotl32(d ^ a, 16);
  c = (c + d) >>> 0;
  b = rotl32(b ^ c, 12);
  a = (a + b) >>> 0;
  d = rotl32(d ^ a, 8);
  c = (c + d) >>> 0;
  b = rotl32(b ^ c, 7);
  return [a, b, c, d];
}
