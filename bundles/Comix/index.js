"use strict";
var source = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  // node_modules/base64-js/index.js
  var require_base64_js = __commonJS({
    "node_modules/base64-js/index.js"(exports) {
      "use strict";
      init_buffer();
      exports.byteLength = byteLength;
      exports.toByteArray = toByteArray;
      exports.fromByteArray = fromByteArray;
      var lookup = [];
      var revLookup = [];
      var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      for (i = 0, len = code.length; i < len; ++i) {
        lookup[i] = code[i];
        revLookup[code.charCodeAt(i)] = i;
      }
      var i;
      var len;
      revLookup["-".charCodeAt(0)] = 62;
      revLookup["_".charCodeAt(0)] = 63;
      function getLens(b64) {
        var len2 = b64.length;
        if (len2 % 4 > 0) {
          throw new Error("Invalid string. Length must be a multiple of 4");
        }
        var validLen = b64.indexOf("=");
        if (validLen === -1) validLen = len2;
        var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
        return [validLen, placeHoldersLen];
      }
      function byteLength(b64) {
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function _byteLength(b64, validLen, placeHoldersLen) {
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function toByteArray(b64) {
        var tmp;
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
        var curByte = 0;
        var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
        var i2;
        for (i2 = 0; i2 < len2; i2 += 4) {
          tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
          arr[curByte++] = tmp >> 16 & 255;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 2) {
          tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 1) {
          tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        return arr;
      }
      function tripletToBase64(num) {
        return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
      }
      function encodeChunk(uint8, start, end) {
        var tmp;
        var output = [];
        for (var i2 = start; i2 < end; i2 += 3) {
          tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
          output.push(tripletToBase64(tmp));
        }
        return output.join("");
      }
      function fromByteArray(uint8) {
        var tmp;
        var len2 = uint8.length;
        var extraBytes = len2 % 3;
        var parts = [];
        var maxChunkLength = 16383;
        for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
          parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
        }
        if (extraBytes === 1) {
          tmp = uint8[len2 - 1];
          parts.push(
            lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
          );
        } else if (extraBytes === 2) {
          tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
          parts.push(
            lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
          );
        }
        return parts.join("");
      }
    }
  });

  // node_modules/ieee754/index.js
  var require_ieee754 = __commonJS({
    "node_modules/ieee754/index.js"(exports) {
      init_buffer();
      exports.read = function(buffer, offset, isLE, mLen, nBytes) {
        var e, m;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var nBits = -7;
        var i = isLE ? nBytes - 1 : 0;
        var d = isLE ? -1 : 1;
        var s = buffer[offset + i];
        i += d;
        e = s & (1 << -nBits) - 1;
        s >>= -nBits;
        nBits += eLen;
        for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
        }
        m = e & (1 << -nBits) - 1;
        e >>= -nBits;
        nBits += mLen;
        for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
        }
        if (e === 0) {
          e = 1 - eBias;
        } else if (e === eMax) {
          return m ? NaN : (s ? -1 : 1) * Infinity;
        } else {
          m = m + Math.pow(2, mLen);
          e = e - eBias;
        }
        return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
      };
      exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
        var e, m, c;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        var i = isLE ? 0 : nBytes - 1;
        var d = isLE ? 1 : -1;
        var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
        value = Math.abs(value);
        if (isNaN(value) || value === Infinity) {
          m = isNaN(value) ? 1 : 0;
          e = eMax;
        } else {
          e = Math.floor(Math.log(value) / Math.LN2);
          if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
          }
          if (e + eBias >= 1) {
            value += rt / c;
          } else {
            value += rt * Math.pow(2, 1 - eBias);
          }
          if (value * c >= 2) {
            e++;
            c /= 2;
          }
          if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
          } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
          } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
          }
        }
        for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
        }
        e = e << mLen | m;
        eLen += mLen;
        for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
        }
        buffer[offset + i - d] |= s * 128;
      };
    }
  });

  // node_modules/buffer/index.js
  var require_buffer = __commonJS({
    "node_modules/buffer/index.js"(exports) {
      "use strict";
      init_buffer();
      var base64 = require_base64_js();
      var ieee754 = require_ieee754();
      var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
      exports.Buffer = Buffer3;
      exports.SlowBuffer = SlowBuffer;
      exports.INSPECT_MAX_BYTES = 50;
      var K_MAX_LENGTH = 2147483647;
      exports.kMaxLength = K_MAX_LENGTH;
      Buffer3.TYPED_ARRAY_SUPPORT = typedArraySupport();
      if (!Buffer3.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
        console.error(
          "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
        );
      }
      function typedArraySupport() {
        try {
          const arr = new Uint8Array(1);
          const proto = { foo: function() {
            return 42;
          } };
          Object.setPrototypeOf(proto, Uint8Array.prototype);
          Object.setPrototypeOf(arr, proto);
          return arr.foo() === 42;
        } catch (e) {
          return false;
        }
      }
      Object.defineProperty(Buffer3.prototype, "parent", {
        enumerable: true,
        get: function() {
          if (!Buffer3.isBuffer(this)) return void 0;
          return this.buffer;
        }
      });
      Object.defineProperty(Buffer3.prototype, "offset", {
        enumerable: true,
        get: function() {
          if (!Buffer3.isBuffer(this)) return void 0;
          return this.byteOffset;
        }
      });
      function createBuffer(length) {
        if (length > K_MAX_LENGTH) {
          throw new RangeError('The value "' + length + '" is invalid for option "size"');
        }
        const buf = new Uint8Array(length);
        Object.setPrototypeOf(buf, Buffer3.prototype);
        return buf;
      }
      function Buffer3(arg, encodingOrOffset, length) {
        if (typeof arg === "number") {
          if (typeof encodingOrOffset === "string") {
            throw new TypeError(
              'The "string" argument must be of type string. Received type number'
            );
          }
          return allocUnsafe(arg);
        }
        return from(arg, encodingOrOffset, length);
      }
      Buffer3.poolSize = 8192;
      function from(value, encodingOrOffset, length) {
        if (typeof value === "string") {
          return fromString(value, encodingOrOffset);
        }
        if (ArrayBuffer.isView(value)) {
          return fromArrayView(value);
        }
        if (value == null) {
          throw new TypeError(
            "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
          );
        }
        if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof value === "number") {
          throw new TypeError(
            'The "value" argument must not be of type number. Received type number'
          );
        }
        const valueOf = value.valueOf && value.valueOf();
        if (valueOf != null && valueOf !== value) {
          return Buffer3.from(valueOf, encodingOrOffset, length);
        }
        const b = fromObject(value);
        if (b) return b;
        if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
          return Buffer3.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
        }
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
        );
      }
      Buffer3.from = function(value, encodingOrOffset, length) {
        return from(value, encodingOrOffset, length);
      };
      Object.setPrototypeOf(Buffer3.prototype, Uint8Array.prototype);
      Object.setPrototypeOf(Buffer3, Uint8Array);
      function assertSize(size) {
        if (typeof size !== "number") {
          throw new TypeError('"size" argument must be of type number');
        } else if (size < 0) {
          throw new RangeError('The value "' + size + '" is invalid for option "size"');
        }
      }
      function alloc(size, fill, encoding) {
        assertSize(size);
        if (size <= 0) {
          return createBuffer(size);
        }
        if (fill !== void 0) {
          return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
        }
        return createBuffer(size);
      }
      Buffer3.alloc = function(size, fill, encoding) {
        return alloc(size, fill, encoding);
      };
      function allocUnsafe(size) {
        assertSize(size);
        return createBuffer(size < 0 ? 0 : checked(size) | 0);
      }
      Buffer3.allocUnsafe = function(size) {
        return allocUnsafe(size);
      };
      Buffer3.allocUnsafeSlow = function(size) {
        return allocUnsafe(size);
      };
      function fromString(string, encoding) {
        if (typeof encoding !== "string" || encoding === "") {
          encoding = "utf8";
        }
        if (!Buffer3.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        const length = byteLength(string, encoding) | 0;
        let buf = createBuffer(length);
        const actual = buf.write(string, encoding);
        if (actual !== length) {
          buf = buf.slice(0, actual);
        }
        return buf;
      }
      function fromArrayLike(array) {
        const length = array.length < 0 ? 0 : checked(array.length) | 0;
        const buf = createBuffer(length);
        for (let i = 0; i < length; i += 1) {
          buf[i] = array[i] & 255;
        }
        return buf;
      }
      function fromArrayView(arrayView) {
        if (isInstance(arrayView, Uint8Array)) {
          const copy = new Uint8Array(arrayView);
          return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
        }
        return fromArrayLike(arrayView);
      }
      function fromArrayBuffer(array, byteOffset, length) {
        if (byteOffset < 0 || array.byteLength < byteOffset) {
          throw new RangeError('"offset" is outside of buffer bounds');
        }
        if (array.byteLength < byteOffset + (length || 0)) {
          throw new RangeError('"length" is outside of buffer bounds');
        }
        let buf;
        if (byteOffset === void 0 && length === void 0) {
          buf = new Uint8Array(array);
        } else if (length === void 0) {
          buf = new Uint8Array(array, byteOffset);
        } else {
          buf = new Uint8Array(array, byteOffset, length);
        }
        Object.setPrototypeOf(buf, Buffer3.prototype);
        return buf;
      }
      function fromObject(obj) {
        if (Buffer3.isBuffer(obj)) {
          const len = checked(obj.length) | 0;
          const buf = createBuffer(len);
          if (buf.length === 0) {
            return buf;
          }
          obj.copy(buf, 0, 0, len);
          return buf;
        }
        if (obj.length !== void 0) {
          if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
            return createBuffer(0);
          }
          return fromArrayLike(obj);
        }
        if (obj.type === "Buffer" && Array.isArray(obj.data)) {
          return fromArrayLike(obj.data);
        }
      }
      function checked(length) {
        if (length >= K_MAX_LENGTH) {
          throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
        }
        return length | 0;
      }
      function SlowBuffer(length) {
        if (+length != length) {
          length = 0;
        }
        return Buffer3.alloc(+length);
      }
      Buffer3.isBuffer = function isBuffer(b) {
        return b != null && b._isBuffer === true && b !== Buffer3.prototype;
      };
      Buffer3.compare = function compare(a, b) {
        if (isInstance(a, Uint8Array)) a = Buffer3.from(a, a.offset, a.byteLength);
        if (isInstance(b, Uint8Array)) b = Buffer3.from(b, b.offset, b.byteLength);
        if (!Buffer3.isBuffer(a) || !Buffer3.isBuffer(b)) {
          throw new TypeError(
            'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
          );
        }
        if (a === b) return 0;
        let x = a.length;
        let y = b.length;
        for (let i = 0, len = Math.min(x, y); i < len; ++i) {
          if (a[i] !== b[i]) {
            x = a[i];
            y = b[i];
            break;
          }
        }
        if (x < y) return -1;
        if (y < x) return 1;
        return 0;
      };
      Buffer3.isEncoding = function isEncoding(encoding) {
        switch (String(encoding).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return true;
          default:
            return false;
        }
      };
      Buffer3.concat = function concat(list, length) {
        if (!Array.isArray(list)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        if (list.length === 0) {
          return Buffer3.alloc(0);
        }
        let i;
        if (length === void 0) {
          length = 0;
          for (i = 0; i < list.length; ++i) {
            length += list[i].length;
          }
        }
        const buffer = Buffer3.allocUnsafe(length);
        let pos = 0;
        for (i = 0; i < list.length; ++i) {
          let buf = list[i];
          if (isInstance(buf, Uint8Array)) {
            if (pos + buf.length > buffer.length) {
              if (!Buffer3.isBuffer(buf)) buf = Buffer3.from(buf);
              buf.copy(buffer, pos);
            } else {
              Uint8Array.prototype.set.call(
                buffer,
                buf,
                pos
              );
            }
          } else if (!Buffer3.isBuffer(buf)) {
            throw new TypeError('"list" argument must be an Array of Buffers');
          } else {
            buf.copy(buffer, pos);
          }
          pos += buf.length;
        }
        return buffer;
      };
      function byteLength(string, encoding) {
        if (Buffer3.isBuffer(string)) {
          return string.length;
        }
        if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
          return string.byteLength;
        }
        if (typeof string !== "string") {
          throw new TypeError(
            'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
          );
        }
        const len = string.length;
        const mustMatch = arguments.length > 2 && arguments[2] === true;
        if (!mustMatch && len === 0) return 0;
        let loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "ascii":
            case "latin1":
            case "binary":
              return len;
            case "utf8":
            case "utf-8":
              return utf8ToBytes(string).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return len * 2;
            case "hex":
              return len >>> 1;
            case "base64":
              return base64ToBytes(string).length;
            default:
              if (loweredCase) {
                return mustMatch ? -1 : utf8ToBytes(string).length;
              }
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer3.byteLength = byteLength;
      function slowToString(encoding, start, end) {
        let loweredCase = false;
        if (start === void 0 || start < 0) {
          start = 0;
        }
        if (start > this.length) {
          return "";
        }
        if (end === void 0 || end > this.length) {
          end = this.length;
        }
        if (end <= 0) {
          return "";
        }
        end >>>= 0;
        start >>>= 0;
        if (end <= start) {
          return "";
        }
        if (!encoding) encoding = "utf8";
        while (true) {
          switch (encoding) {
            case "hex":
              return hexSlice(this, start, end);
            case "utf8":
            case "utf-8":
              return utf8Slice(this, start, end);
            case "ascii":
              return asciiSlice(this, start, end);
            case "latin1":
            case "binary":
              return latin1Slice(this, start, end);
            case "base64":
              return base64Slice(this, start, end);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return utf16leSlice(this, start, end);
            default:
              if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
              encoding = (encoding + "").toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer3.prototype._isBuffer = true;
      function swap(b, n, m) {
        const i = b[n];
        b[n] = b[m];
        b[m] = i;
      }
      Buffer3.prototype.swap16 = function swap16() {
        const len = this.length;
        if (len % 2 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        }
        for (let i = 0; i < len; i += 2) {
          swap(this, i, i + 1);
        }
        return this;
      };
      Buffer3.prototype.swap32 = function swap32() {
        const len = this.length;
        if (len % 4 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 32-bits");
        }
        for (let i = 0; i < len; i += 4) {
          swap(this, i, i + 3);
          swap(this, i + 1, i + 2);
        }
        return this;
      };
      Buffer3.prototype.swap64 = function swap64() {
        const len = this.length;
        if (len % 8 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 64-bits");
        }
        for (let i = 0; i < len; i += 8) {
          swap(this, i, i + 7);
          swap(this, i + 1, i + 6);
          swap(this, i + 2, i + 5);
          swap(this, i + 3, i + 4);
        }
        return this;
      };
      Buffer3.prototype.toString = function toString2() {
        const length = this.length;
        if (length === 0) return "";
        if (arguments.length === 0) return utf8Slice(this, 0, length);
        return slowToString.apply(this, arguments);
      };
      Buffer3.prototype.toLocaleString = Buffer3.prototype.toString;
      Buffer3.prototype.equals = function equals(b) {
        if (!Buffer3.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
        if (this === b) return true;
        return Buffer3.compare(this, b) === 0;
      };
      Buffer3.prototype.inspect = function inspect3() {
        let str = "";
        const max = exports.INSPECT_MAX_BYTES;
        str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
        if (this.length > max) str += " ... ";
        return "<Buffer " + str + ">";
      };
      if (customInspectSymbol) {
        Buffer3.prototype[customInspectSymbol] = Buffer3.prototype.inspect;
      }
      Buffer3.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
        if (isInstance(target, Uint8Array)) {
          target = Buffer3.from(target, target.offset, target.byteLength);
        }
        if (!Buffer3.isBuffer(target)) {
          throw new TypeError(
            'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
          );
        }
        if (start === void 0) {
          start = 0;
        }
        if (end === void 0) {
          end = target ? target.length : 0;
        }
        if (thisStart === void 0) {
          thisStart = 0;
        }
        if (thisEnd === void 0) {
          thisEnd = this.length;
        }
        if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
          throw new RangeError("out of range index");
        }
        if (thisStart >= thisEnd && start >= end) {
          return 0;
        }
        if (thisStart >= thisEnd) {
          return -1;
        }
        if (start >= end) {
          return 1;
        }
        start >>>= 0;
        end >>>= 0;
        thisStart >>>= 0;
        thisEnd >>>= 0;
        if (this === target) return 0;
        let x = thisEnd - thisStart;
        let y = end - start;
        const len = Math.min(x, y);
        const thisCopy = this.slice(thisStart, thisEnd);
        const targetCopy = target.slice(start, end);
        for (let i = 0; i < len; ++i) {
          if (thisCopy[i] !== targetCopy[i]) {
            x = thisCopy[i];
            y = targetCopy[i];
            break;
          }
        }
        if (x < y) return -1;
        if (y < x) return 1;
        return 0;
      };
      function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
        if (buffer.length === 0) return -1;
        if (typeof byteOffset === "string") {
          encoding = byteOffset;
          byteOffset = 0;
        } else if (byteOffset > 2147483647) {
          byteOffset = 2147483647;
        } else if (byteOffset < -2147483648) {
          byteOffset = -2147483648;
        }
        byteOffset = +byteOffset;
        if (numberIsNaN(byteOffset)) {
          byteOffset = dir ? 0 : buffer.length - 1;
        }
        if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
        if (byteOffset >= buffer.length) {
          if (dir) return -1;
          else byteOffset = buffer.length - 1;
        } else if (byteOffset < 0) {
          if (dir) byteOffset = 0;
          else return -1;
        }
        if (typeof val === "string") {
          val = Buffer3.from(val, encoding);
        }
        if (Buffer3.isBuffer(val)) {
          if (val.length === 0) {
            return -1;
          }
          return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
        } else if (typeof val === "number") {
          val = val & 255;
          if (typeof Uint8Array.prototype.indexOf === "function") {
            if (dir) {
              return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
            } else {
              return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
            }
          }
          return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
        }
        throw new TypeError("val must be string, number or Buffer");
      }
      function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
        let indexSize = 1;
        let arrLength = arr.length;
        let valLength = val.length;
        if (encoding !== void 0) {
          encoding = String(encoding).toLowerCase();
          if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
            if (arr.length < 2 || val.length < 2) {
              return -1;
            }
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
          }
        }
        function read(buf, i2) {
          if (indexSize === 1) {
            return buf[i2];
          } else {
            return buf.readUInt16BE(i2 * indexSize);
          }
        }
        let i;
        if (dir) {
          let foundIndex = -1;
          for (i = byteOffset; i < arrLength; i++) {
            if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
              if (foundIndex === -1) foundIndex = i;
              if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
            } else {
              if (foundIndex !== -1) i -= i - foundIndex;
              foundIndex = -1;
            }
          }
        } else {
          if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
          for (i = byteOffset; i >= 0; i--) {
            let found = true;
            for (let j = 0; j < valLength; j++) {
              if (read(arr, i + j) !== read(val, j)) {
                found = false;
                break;
              }
            }
            if (found) return i;
          }
        }
        return -1;
      }
      Buffer3.prototype.includes = function includes(val, byteOffset, encoding) {
        return this.indexOf(val, byteOffset, encoding) !== -1;
      };
      Buffer3.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
      };
      Buffer3.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
      };
      function hexWrite(buf, string, offset, length) {
        offset = Number(offset) || 0;
        const remaining = buf.length - offset;
        if (!length) {
          length = remaining;
        } else {
          length = Number(length);
          if (length > remaining) {
            length = remaining;
          }
        }
        const strLen = string.length;
        if (length > strLen / 2) {
          length = strLen / 2;
        }
        let i;
        for (i = 0; i < length; ++i) {
          const parsed = parseInt(string.substr(i * 2, 2), 16);
          if (numberIsNaN(parsed)) return i;
          buf[offset + i] = parsed;
        }
        return i;
      }
      function utf8Write(buf, string, offset, length) {
        return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
      }
      function asciiWrite(buf, string, offset, length) {
        return blitBuffer(asciiToBytes(string), buf, offset, length);
      }
      function base64Write(buf, string, offset, length) {
        return blitBuffer(base64ToBytes(string), buf, offset, length);
      }
      function ucs2Write(buf, string, offset, length) {
        return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
      }
      Buffer3.prototype.write = function write(string, offset, length, encoding) {
        if (offset === void 0) {
          encoding = "utf8";
          length = this.length;
          offset = 0;
        } else if (length === void 0 && typeof offset === "string") {
          encoding = offset;
          length = this.length;
          offset = 0;
        } else if (isFinite(offset)) {
          offset = offset >>> 0;
          if (isFinite(length)) {
            length = length >>> 0;
            if (encoding === void 0) encoding = "utf8";
          } else {
            encoding = length;
            length = void 0;
          }
        } else {
          throw new Error(
            "Buffer.write(string, encoding, offset[, length]) is no longer supported"
          );
        }
        const remaining = this.length - offset;
        if (length === void 0 || length > remaining) length = remaining;
        if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
          throw new RangeError("Attempt to write outside buffer bounds");
        }
        if (!encoding) encoding = "utf8";
        let loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "hex":
              return hexWrite(this, string, offset, length);
            case "utf8":
            case "utf-8":
              return utf8Write(this, string, offset, length);
            case "ascii":
            case "latin1":
            case "binary":
              return asciiWrite(this, string, offset, length);
            case "base64":
              return base64Write(this, string, offset, length);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return ucs2Write(this, string, offset, length);
            default:
              if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      };
      Buffer3.prototype.toJSON = function toJSON() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      function base64Slice(buf, start, end) {
        if (start === 0 && end === buf.length) {
          return base64.fromByteArray(buf);
        } else {
          return base64.fromByteArray(buf.slice(start, end));
        }
      }
      function utf8Slice(buf, start, end) {
        end = Math.min(buf.length, end);
        const res = [];
        let i = start;
        while (i < end) {
          const firstByte = buf[i];
          let codePoint = null;
          let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
          if (i + bytesPerSequence <= end) {
            let secondByte, thirdByte, fourthByte, tempCodePoint;
            switch (bytesPerSequence) {
              case 1:
                if (firstByte < 128) {
                  codePoint = firstByte;
                }
                break;
              case 2:
                secondByte = buf[i + 1];
                if ((secondByte & 192) === 128) {
                  tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                  if (tempCodePoint > 127) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 3:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                  if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 4:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                fourthByte = buf[i + 3];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                  if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                    codePoint = tempCodePoint;
                  }
                }
            }
          }
          if (codePoint === null) {
            codePoint = 65533;
            bytesPerSequence = 1;
          } else if (codePoint > 65535) {
            codePoint -= 65536;
            res.push(codePoint >>> 10 & 1023 | 55296);
            codePoint = 56320 | codePoint & 1023;
          }
          res.push(codePoint);
          i += bytesPerSequence;
        }
        return decodeCodePointsArray(res);
      }
      var MAX_ARGUMENTS_LENGTH = 4096;
      function decodeCodePointsArray(codePoints) {
        const len = codePoints.length;
        if (len <= MAX_ARGUMENTS_LENGTH) {
          return String.fromCharCode.apply(String, codePoints);
        }
        let res = "";
        let i = 0;
        while (i < len) {
          res += String.fromCharCode.apply(
            String,
            codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
          );
        }
        return res;
      }
      function asciiSlice(buf, start, end) {
        let ret = "";
        end = Math.min(buf.length, end);
        for (let i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i] & 127);
        }
        return ret;
      }
      function latin1Slice(buf, start, end) {
        let ret = "";
        end = Math.min(buf.length, end);
        for (let i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i]);
        }
        return ret;
      }
      function hexSlice(buf, start, end) {
        const len = buf.length;
        if (!start || start < 0) start = 0;
        if (!end || end < 0 || end > len) end = len;
        let out = "";
        for (let i = start; i < end; ++i) {
          out += hexSliceLookupTable[buf[i]];
        }
        return out;
      }
      function utf16leSlice(buf, start, end) {
        const bytes = buf.slice(start, end);
        let res = "";
        for (let i = 0; i < bytes.length - 1; i += 2) {
          res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
        }
        return res;
      }
      Buffer3.prototype.slice = function slice(start, end) {
        const len = this.length;
        start = ~~start;
        end = end === void 0 ? len : ~~end;
        if (start < 0) {
          start += len;
          if (start < 0) start = 0;
        } else if (start > len) {
          start = len;
        }
        if (end < 0) {
          end += len;
          if (end < 0) end = 0;
        } else if (end > len) {
          end = len;
        }
        if (end < start) end = start;
        const newBuf = this.subarray(start, end);
        Object.setPrototypeOf(newBuf, Buffer3.prototype);
        return newBuf;
      };
      function checkOffset(offset, ext, length) {
        if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
        if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
      }
      Buffer3.prototype.readUintLE = Buffer3.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        let val = this[offset];
        let mul = 1;
        let i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        return val;
      };
      Buffer3.prototype.readUintBE = Buffer3.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          checkOffset(offset, byteLength2, this.length);
        }
        let val = this[offset + --byteLength2];
        let mul = 1;
        while (byteLength2 > 0 && (mul *= 256)) {
          val += this[offset + --byteLength2] * mul;
        }
        return val;
      };
      Buffer3.prototype.readUint8 = Buffer3.prototype.readUInt8 = function readUInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 1, this.length);
        return this[offset];
      };
      Buffer3.prototype.readUint16LE = Buffer3.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        return this[offset] | this[offset + 1] << 8;
      };
      Buffer3.prototype.readUint16BE = Buffer3.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        return this[offset] << 8 | this[offset + 1];
      };
      Buffer3.prototype.readUint32LE = Buffer3.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
      };
      Buffer3.prototype.readUint32BE = Buffer3.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
      };
      Buffer3.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
        const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
        return BigInt(lo) + (BigInt(hi) << BigInt(32));
      });
      Buffer3.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
        const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
        return (BigInt(hi) << BigInt(32)) + BigInt(lo);
      });
      Buffer3.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        let val = this[offset];
        let mul = 1;
        let i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        mul *= 128;
        if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer3.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        let i = byteLength2;
        let mul = 1;
        let val = this[offset + --i];
        while (i > 0 && (mul *= 256)) {
          val += this[offset + --i] * mul;
        }
        mul *= 128;
        if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer3.prototype.readInt8 = function readInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 1, this.length);
        if (!(this[offset] & 128)) return this[offset];
        return (255 - this[offset] + 1) * -1;
      };
      Buffer3.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        const val = this[offset] | this[offset + 1] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer3.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        const val = this[offset + 1] | this[offset] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer3.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
      };
      Buffer3.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
      };
      Buffer3.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
        return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
      });
      Buffer3.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const val = (first << 24) + // Overflow
        this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
        return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
      });
      Buffer3.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, true, 23, 4);
      };
      Buffer3.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, false, 23, 4);
      };
      Buffer3.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, true, 52, 8);
      };
      Buffer3.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, false, 52, 8);
      };
      function checkInt(buf, value, offset, ext, max, min) {
        if (!Buffer3.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
      }
      Buffer3.prototype.writeUintLE = Buffer3.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        let mul = 1;
        let i = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer3.prototype.writeUintBE = Buffer3.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        let i = byteLength2 - 1;
        let mul = 1;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer3.prototype.writeUint8 = Buffer3.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer3.prototype.writeUint16LE = Buffer3.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer3.prototype.writeUint16BE = Buffer3.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer3.prototype.writeUint32LE = Buffer3.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset + 3] = value >>> 24;
        this[offset + 2] = value >>> 16;
        this[offset + 1] = value >>> 8;
        this[offset] = value & 255;
        return offset + 4;
      };
      Buffer3.prototype.writeUint32BE = Buffer3.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      function wrtBigUInt64LE(buf, value, offset, min, max) {
        checkIntBI(value, min, max, buf, offset, 7);
        let lo = Number(value & BigInt(4294967295));
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        let hi = Number(value >> BigInt(32) & BigInt(4294967295));
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        return offset;
      }
      function wrtBigUInt64BE(buf, value, offset, min, max) {
        checkIntBI(value, min, max, buf, offset, 7);
        let lo = Number(value & BigInt(4294967295));
        buf[offset + 7] = lo;
        lo = lo >> 8;
        buf[offset + 6] = lo;
        lo = lo >> 8;
        buf[offset + 5] = lo;
        lo = lo >> 8;
        buf[offset + 4] = lo;
        let hi = Number(value >> BigInt(32) & BigInt(4294967295));
        buf[offset + 3] = hi;
        hi = hi >> 8;
        buf[offset + 2] = hi;
        hi = hi >> 8;
        buf[offset + 1] = hi;
        hi = hi >> 8;
        buf[offset] = hi;
        return offset + 8;
      }
      Buffer3.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
        return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      Buffer3.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
        return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      Buffer3.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          const limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        let i = 0;
        let mul = 1;
        let sub = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer3.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          const limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        let i = byteLength2 - 1;
        let mul = 1;
        let sub = 0;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer3.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
        if (value < 0) value = 255 + value + 1;
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer3.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer3.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer3.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        this[offset + 2] = value >>> 16;
        this[offset + 3] = value >>> 24;
        return offset + 4;
      };
      Buffer3.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
        if (value < 0) value = 4294967295 + value + 1;
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      Buffer3.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
        return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      Buffer3.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
        return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      function checkIEEE754(buf, value, offset, ext, max, min) {
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
        if (offset < 0) throw new RangeError("Index out of range");
      }
      function writeFloat(buf, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
        }
        ieee754.write(buf, value, offset, littleEndian, 23, 4);
        return offset + 4;
      }
      Buffer3.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
        return writeFloat(this, value, offset, true, noAssert);
      };
      Buffer3.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
        return writeFloat(this, value, offset, false, noAssert);
      };
      function writeDouble(buf, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
        }
        ieee754.write(buf, value, offset, littleEndian, 52, 8);
        return offset + 8;
      }
      Buffer3.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
        return writeDouble(this, value, offset, true, noAssert);
      };
      Buffer3.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
        return writeDouble(this, value, offset, false, noAssert);
      };
      Buffer3.prototype.copy = function copy(target, targetStart, start, end) {
        if (!Buffer3.isBuffer(target)) throw new TypeError("argument should be a Buffer");
        if (!start) start = 0;
        if (!end && end !== 0) end = this.length;
        if (targetStart >= target.length) targetStart = target.length;
        if (!targetStart) targetStart = 0;
        if (end > 0 && end < start) end = start;
        if (end === start) return 0;
        if (target.length === 0 || this.length === 0) return 0;
        if (targetStart < 0) {
          throw new RangeError("targetStart out of bounds");
        }
        if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
        if (end < 0) throw new RangeError("sourceEnd out of bounds");
        if (end > this.length) end = this.length;
        if (target.length - targetStart < end - start) {
          end = target.length - targetStart + start;
        }
        const len = end - start;
        if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
          this.copyWithin(targetStart, start, end);
        } else {
          Uint8Array.prototype.set.call(
            target,
            this.subarray(start, end),
            targetStart
          );
        }
        return len;
      };
      Buffer3.prototype.fill = function fill(val, start, end, encoding) {
        if (typeof val === "string") {
          if (typeof start === "string") {
            encoding = start;
            start = 0;
            end = this.length;
          } else if (typeof end === "string") {
            encoding = end;
            end = this.length;
          }
          if (encoding !== void 0 && typeof encoding !== "string") {
            throw new TypeError("encoding must be a string");
          }
          if (typeof encoding === "string" && !Buffer3.isEncoding(encoding)) {
            throw new TypeError("Unknown encoding: " + encoding);
          }
          if (val.length === 1) {
            const code = val.charCodeAt(0);
            if (encoding === "utf8" && code < 128 || encoding === "latin1") {
              val = code;
            }
          }
        } else if (typeof val === "number") {
          val = val & 255;
        } else if (typeof val === "boolean") {
          val = Number(val);
        }
        if (start < 0 || this.length < start || this.length < end) {
          throw new RangeError("Out of range index");
        }
        if (end <= start) {
          return this;
        }
        start = start >>> 0;
        end = end === void 0 ? this.length : end >>> 0;
        if (!val) val = 0;
        let i;
        if (typeof val === "number") {
          for (i = start; i < end; ++i) {
            this[i] = val;
          }
        } else {
          const bytes = Buffer3.isBuffer(val) ? val : Buffer3.from(val, encoding);
          const len = bytes.length;
          if (len === 0) {
            throw new TypeError('The value "' + val + '" is invalid for argument "value"');
          }
          for (i = 0; i < end - start; ++i) {
            this[i + start] = bytes[i % len];
          }
        }
        return this;
      };
      var errors = {};
      function E(sym, getMessage3, Base) {
        errors[sym] = class NodeError extends Base {
          constructor() {
            super();
            Object.defineProperty(this, "message", {
              value: getMessage3.apply(this, arguments),
              writable: true,
              configurable: true
            });
            this.name = `${this.name} [${sym}]`;
            this.stack;
            delete this.name;
          }
          get code() {
            return sym;
          }
          set code(value) {
            Object.defineProperty(this, "code", {
              configurable: true,
              enumerable: true,
              value,
              writable: true
            });
          }
          toString() {
            return `${this.name} [${sym}]: ${this.message}`;
          }
        };
      }
      E(
        "ERR_BUFFER_OUT_OF_BOUNDS",
        function(name) {
          if (name) {
            return `${name} is outside of buffer bounds`;
          }
          return "Attempt to access memory outside buffer bounds";
        },
        RangeError
      );
      E(
        "ERR_INVALID_ARG_TYPE",
        function(name, actual) {
          return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
        },
        TypeError
      );
      E(
        "ERR_OUT_OF_RANGE",
        function(str, range, input) {
          let msg = `The value of "${str}" is out of range.`;
          let received = input;
          if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
            received = addNumericalSeparator(String(input));
          } else if (typeof input === "bigint") {
            received = String(input);
            if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
              received = addNumericalSeparator(received);
            }
            received += "n";
          }
          msg += ` It must be ${range}. Received ${received}`;
          return msg;
        },
        RangeError
      );
      function addNumericalSeparator(val) {
        let res = "";
        let i = val.length;
        const start = val[0] === "-" ? 1 : 0;
        for (; i >= start + 4; i -= 3) {
          res = `_${val.slice(i - 3, i)}${res}`;
        }
        return `${val.slice(0, i)}${res}`;
      }
      function checkBounds(buf, offset, byteLength2) {
        validateNumber(offset, "offset");
        if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
          boundsError(offset, buf.length - (byteLength2 + 1));
        }
      }
      function checkIntBI(value, min, max, buf, offset, byteLength2) {
        if (value > max || value < min) {
          const n = typeof min === "bigint" ? "n" : "";
          let range;
          if (byteLength2 > 3) {
            if (min === 0 || min === BigInt(0)) {
              range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
            } else {
              range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
            }
          } else {
            range = `>= ${min}${n} and <= ${max}${n}`;
          }
          throw new errors.ERR_OUT_OF_RANGE("value", range, value);
        }
        checkBounds(buf, offset, byteLength2);
      }
      function validateNumber(value, name) {
        if (typeof value !== "number") {
          throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
        }
      }
      function boundsError(value, length, type3) {
        if (Math.floor(value) !== value) {
          validateNumber(value, type3);
          throw new errors.ERR_OUT_OF_RANGE(type3 || "offset", "an integer", value);
        }
        if (length < 0) {
          throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
        }
        throw new errors.ERR_OUT_OF_RANGE(
          type3 || "offset",
          `>= ${type3 ? 1 : 0} and <= ${length}`,
          value
        );
      }
      var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
      function base64clean(str) {
        str = str.split("=")[0];
        str = str.trim().replace(INVALID_BASE64_RE, "");
        if (str.length < 2) return "";
        while (str.length % 4 !== 0) {
          str = str + "=";
        }
        return str;
      }
      function utf8ToBytes(string, units) {
        units = units || Infinity;
        let codePoint;
        const length = string.length;
        let leadSurrogate = null;
        const bytes = [];
        for (let i = 0; i < length; ++i) {
          codePoint = string.charCodeAt(i);
          if (codePoint > 55295 && codePoint < 57344) {
            if (!leadSurrogate) {
              if (codePoint > 56319) {
                if ((units -= 3) > -1) bytes.push(239, 191, 189);
                continue;
              } else if (i + 1 === length) {
                if ((units -= 3) > -1) bytes.push(239, 191, 189);
                continue;
              }
              leadSurrogate = codePoint;
              continue;
            }
            if (codePoint < 56320) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              leadSurrogate = codePoint;
              continue;
            }
            codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
          } else if (leadSurrogate) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
          }
          leadSurrogate = null;
          if (codePoint < 128) {
            if ((units -= 1) < 0) break;
            bytes.push(codePoint);
          } else if (codePoint < 2048) {
            if ((units -= 2) < 0) break;
            bytes.push(
              codePoint >> 6 | 192,
              codePoint & 63 | 128
            );
          } else if (codePoint < 65536) {
            if ((units -= 3) < 0) break;
            bytes.push(
              codePoint >> 12 | 224,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else if (codePoint < 1114112) {
            if ((units -= 4) < 0) break;
            bytes.push(
              codePoint >> 18 | 240,
              codePoint >> 12 & 63 | 128,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else {
            throw new Error("Invalid code point");
          }
        }
        return bytes;
      }
      function asciiToBytes(str) {
        const byteArray = [];
        for (let i = 0; i < str.length; ++i) {
          byteArray.push(str.charCodeAt(i) & 255);
        }
        return byteArray;
      }
      function utf16leToBytes(str, units) {
        let c, hi, lo;
        const byteArray = [];
        for (let i = 0; i < str.length; ++i) {
          if ((units -= 2) < 0) break;
          c = str.charCodeAt(i);
          hi = c >> 8;
          lo = c % 256;
          byteArray.push(lo);
          byteArray.push(hi);
        }
        return byteArray;
      }
      function base64ToBytes(str) {
        return base64.toByteArray(base64clean(str));
      }
      function blitBuffer(src, dst, offset, length) {
        let i;
        for (i = 0; i < length; ++i) {
          if (i + offset >= dst.length || i >= src.length) break;
          dst[i + offset] = src[i];
        }
        return i;
      }
      function isInstance(obj, type3) {
        return obj instanceof type3 || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type3.name;
      }
      function numberIsNaN(obj) {
        return obj !== obj;
      }
      var hexSliceLookupTable = (function() {
        const alphabet = "0123456789abcdef";
        const table = new Array(256);
        for (let i = 0; i < 16; ++i) {
          const i16 = i * 16;
          for (let j = 0; j < 16; ++j) {
            table[i16 + j] = alphabet[i] + alphabet[j];
          }
        }
        return table;
      })();
      function defineBigIntMethod(fn) {
        return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
      }
      function BufferBigIntNotDefined() {
        throw new Error("BigInt not supported");
      }
    }
  });

  // node_modules/@paperback/toolchain/lib/shims/buffer.js
  var import_buffer, Buffer2;
  var init_buffer = __esm({
    "node_modules/@paperback/toolchain/lib/shims/buffer.js"() {
      import_buffer = __toESM(require_buffer(), 1);
      Buffer2 = import_buffer.Buffer;
    }
  });

  // src/Comix/main.ts
  var main_exports = {};
  __export(main_exports, {
    ComixExtension: () => ComixExtension
  });
  init_buffer();

  // node_modules/@paperback/types/lib/index.js
  init_buffer();

  // node_modules/@paperback/types/lib/impl/index.js
  init_buffer();

  // node_modules/@paperback/types/lib/impl/SettingsUI/index.js
  init_buffer();

  // node_modules/@paperback/types/lib/impl/SettingsUI/Form.js
  init_buffer();
  var Form = class {
    reloadForm() {
      const formId = this["__underlying_formId"];
      if (!formId)
        return;
      Application.formDidChange(formId);
    }
    // If this returns true, the app will display `Submit` and `Cancel` buttons
    // and call the relevant methods when they are pressed
    get requiresExplicitSubmission() {
      return false;
    }
  };

  // node_modules/@paperback/types/lib/impl/SettingsUI/FormItemElement.js
  init_buffer();

  // node_modules/@paperback/types/lib/impl/SettingsUI/FormSection.js
  init_buffer();
  function Section(params, items) {
    let info;
    if (typeof params === "string") {
      info = { id: params };
    } else {
      info = params;
    }
    return {
      ...info,
      items: items.filter((x) => x)
    };
  }

  // node_modules/@paperback/types/lib/impl/interfaces/index.js
  init_buffer();

  // node_modules/@paperback/types/lib/impl/interfaces/ChapterProviding.js
  init_buffer();

  // node_modules/@paperback/types/lib/impl/interfaces/CloudflareBypassRequestProviding.js
  init_buffer();

  // node_modules/@paperback/types/lib/impl/interfaces/DiscoverSectionProviding.js
  init_buffer();

  // node_modules/@paperback/types/lib/impl/interfaces/ManagedCollectionProviding.js
  init_buffer();

  // node_modules/@paperback/types/lib/impl/interfaces/MangaProgressProviding.js
  init_buffer();

  // node_modules/@paperback/types/lib/impl/interfaces/MangaProviding.js
  init_buffer();

  // node_modules/@paperback/types/lib/impl/interfaces/SearchResultsProviding.js
  init_buffer();

  // node_modules/@paperback/types/lib/impl/interfaces/SettingsFormProviding.js
  init_buffer();

  // node_modules/@paperback/types/lib/impl/Application.js
  init_buffer();

  // node_modules/@paperback/types/lib/impl/PaperbackInterceptor.js
  init_buffer();
  var PaperbackInterceptor = class {
    constructor(id) {
      __publicField(this, "id");
      this.id = id;
    }
    registerInterceptor() {
      Application.registerInterceptor(this.id, Application.Selector(this, "interceptRequest"), Application.Selector(this, "interceptResponse"));
    }
    unregisterInterceptor() {
      Application.unregisterInterceptor(this.id);
    }
  };

  // node_modules/@paperback/types/lib/impl/Selector.js
  init_buffer();

  // node_modules/@paperback/types/lib/impl/Extension.js
  init_buffer();

  // node_modules/@paperback/types/lib/impl/BasicRateLimiter.js
  init_buffer();

  // node_modules/@paperback/types/lib/impl/Lock.js
  init_buffer();
  var promises = {};
  var resolvers = {};
  var lock = async (uid) => {
    if (promises[uid]) {
      await promises[uid];
      await lock(uid);
      return;
    }
    promises[uid] = new Promise((resolve) => resolvers[uid] = () => {
      delete promises[uid];
      resolve();
    });
  };
  var unlock = (uid) => {
    if (resolvers[uid]) {
      resolvers[uid]();
    }
  };

  // node_modules/@paperback/types/lib/impl/BasicRateLimiter.js
  var BasicRateLimiter = class extends PaperbackInterceptor {
    constructor(id, options) {
      super(id);
      __publicField(this, "options");
      __publicField(this, "promise");
      __publicField(this, "currentRequestsMade", 0);
      __publicField(this, "lastReset", Date.now());
      __publicField(this, "imageRegex", new RegExp(/\.(png|gif|jpeg|jpg|webp)(\?|$)/i));
      this.options = options;
    }
    async interceptRequest(request) {
      if (this.options.ignoreImages && this.imageRegex.test(request.url)) {
        return request;
      }
      await lock(this.id);
      await this.incrementRequestCount();
      unlock(this.id);
      return request;
    }
    async interceptResponse(request, response, data) {
      return data;
    }
    async incrementRequestCount() {
      await this.promise;
      const secondsSinceLastReset = (Date.now() - this.lastReset) / 1e3;
      if (secondsSinceLastReset > this.options.bufferInterval) {
        this.currentRequestsMade = 0;
        this.lastReset = Date.now();
      }
      this.currentRequestsMade += 1;
      if (this.currentRequestsMade >= this.options.numberOfRequests) {
        const secondsSinceLastReset2 = (Date.now() - this.lastReset) / 1e3;
        if (secondsSinceLastReset2 <= this.options.bufferInterval) {
          const sleepTime = this.options.bufferInterval - secondsSinceLastReset2;
          console.log(`[BasicRateLimiter] rate limit hit, sleeping for ${sleepTime}`);
          this.promise = Application.sleep(sleepTime);
        }
      }
    }
  };

  // node_modules/@paperback/types/lib/impl/CloudflareError.js
  init_buffer();

  // node_modules/@paperback/types/lib/impl/CookieStorageInterceptor.js
  init_buffer();

  // node_modules/@paperback/types/lib/impl/URL.js
  init_buffer();

  // node_modules/@paperback/types/lib/impl/TestDefinition.js
  init_buffer();

  // node_modules/@paperback/types/lib/impl/SourceInfo.js
  init_buffer();
  var SourceIntents;
  (function(SourceIntents2) {
    SourceIntents2[SourceIntents2["NONE"] = 0] = "NONE";
    SourceIntents2[SourceIntents2["MANGA_CHAPTERS"] = 1] = "MANGA_CHAPTERS";
    SourceIntents2[SourceIntents2["CHAPTER_PROVIDING"] = 1] = "CHAPTER_PROVIDING";
    SourceIntents2[SourceIntents2["MANGA_PROGRESS"] = 2] = "MANGA_PROGRESS";
    SourceIntents2[SourceIntents2["MANGA_PROGRESS_PROVIDING"] = 2] = "MANGA_PROGRESS_PROVIDING";
    SourceIntents2[SourceIntents2["DISCOVER_SECIONS"] = 4] = "DISCOVER_SECIONS";
    SourceIntents2[SourceIntents2["DISCOVER_SECIONS_PROVIDING"] = 4] = "DISCOVER_SECIONS_PROVIDING";
    SourceIntents2[SourceIntents2["COLLECTION_MANAGEMENT"] = 8] = "COLLECTION_MANAGEMENT";
    SourceIntents2[SourceIntents2["MANAGED_COLLECTION_PROVIDING"] = 8] = "MANAGED_COLLECTION_PROVIDING";
    SourceIntents2[SourceIntents2["CLOUDFLARE_BYPASS_REQUIRED"] = 16] = "CLOUDFLARE_BYPASS_REQUIRED";
    SourceIntents2[SourceIntents2["CLOUDFLARE_BYPASS_PROVIDING"] = 16] = "CLOUDFLARE_BYPASS_PROVIDING";
    SourceIntents2[SourceIntents2["SETTINGS_UI"] = 32] = "SETTINGS_UI";
    SourceIntents2[SourceIntents2["SETTINGS_FORM_PROVIDING"] = 32] = "SETTINGS_FORM_PROVIDING";
    SourceIntents2[SourceIntents2["MANGA_SEARCH"] = 64] = "MANGA_SEARCH";
    SourceIntents2[SourceIntents2["SEARCH_RESULTS_PROVIDING"] = 64] = "SEARCH_RESULTS_PROVIDING";
  })(SourceIntents || (SourceIntents = {}));
  var ContentRating;
  (function(ContentRating2) {
    ContentRating2["EVERYONE"] = "SAFE";
    ContentRating2["MATURE"] = "MATURE";
    ContentRating2["ADULT"] = "ADULT";
  })(ContentRating || (ContentRating = {}));

  // node_modules/chai/index.js
  init_buffer();
  var __defProp2 = Object.defineProperty;
  var __name = (target, value) => __defProp2(target, "name", { value, configurable: true });
  var __export2 = (target, all) => {
    for (var name in all)
      __defProp2(target, name, { get: all[name], enumerable: true });
  };
  var utils_exports = {};
  __export2(utils_exports, {
    addChainableMethod: () => addChainableMethod,
    addLengthGuard: () => addLengthGuard,
    addMethod: () => addMethod,
    addProperty: () => addProperty,
    checkError: () => check_error_exports,
    compareByInspect: () => compareByInspect,
    eql: () => deep_eql_default,
    expectTypes: () => expectTypes,
    flag: () => flag,
    getActual: () => getActual,
    getMessage: () => getMessage2,
    getName: () => getName,
    getOperator: () => getOperator,
    getOwnEnumerableProperties: () => getOwnEnumerableProperties,
    getOwnEnumerablePropertySymbols: () => getOwnEnumerablePropertySymbols,
    getPathInfo: () => getPathInfo,
    hasProperty: () => hasProperty,
    inspect: () => inspect2,
    isNaN: () => isNaN22,
    isNumeric: () => isNumeric,
    isProxyEnabled: () => isProxyEnabled,
    isRegExp: () => isRegExp2,
    objDisplay: () => objDisplay,
    overwriteChainableMethod: () => overwriteChainableMethod,
    overwriteMethod: () => overwriteMethod,
    overwriteProperty: () => overwriteProperty,
    proxify: () => proxify,
    test: () => test,
    transferFlags: () => transferFlags,
    type: () => type
  });
  var check_error_exports = {};
  __export2(check_error_exports, {
    compatibleConstructor: () => compatibleConstructor,
    compatibleInstance: () => compatibleInstance,
    compatibleMessage: () => compatibleMessage,
    getConstructorName: () => getConstructorName,
    getMessage: () => getMessage
  });
  function isErrorInstance(obj) {
    return obj instanceof Error || Object.prototype.toString.call(obj) === "[object Error]";
  }
  __name(isErrorInstance, "isErrorInstance");
  function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === "[object RegExp]";
  }
  __name(isRegExp, "isRegExp");
  function compatibleInstance(thrown, errorLike) {
    return isErrorInstance(errorLike) && thrown === errorLike;
  }
  __name(compatibleInstance, "compatibleInstance");
  function compatibleConstructor(thrown, errorLike) {
    if (isErrorInstance(errorLike)) {
      return thrown.constructor === errorLike.constructor || thrown instanceof errorLike.constructor;
    } else if ((typeof errorLike === "object" || typeof errorLike === "function") && errorLike.prototype) {
      return thrown.constructor === errorLike || thrown instanceof errorLike;
    }
    return false;
  }
  __name(compatibleConstructor, "compatibleConstructor");
  function compatibleMessage(thrown, errMatcher) {
    const comparisonString = typeof thrown === "string" ? thrown : thrown.message;
    if (isRegExp(errMatcher)) {
      return errMatcher.test(comparisonString);
    } else if (typeof errMatcher === "string") {
      return comparisonString.indexOf(errMatcher) !== -1;
    }
    return false;
  }
  __name(compatibleMessage, "compatibleMessage");
  function getConstructorName(errorLike) {
    let constructorName = errorLike;
    if (isErrorInstance(errorLike)) {
      constructorName = errorLike.constructor.name;
    } else if (typeof errorLike === "function") {
      constructorName = errorLike.name;
      if (constructorName === "") {
        const newConstructorName = new errorLike().name;
        constructorName = newConstructorName || constructorName;
      }
    }
    return constructorName;
  }
  __name(getConstructorName, "getConstructorName");
  function getMessage(errorLike) {
    let msg = "";
    if (errorLike && errorLike.message) {
      msg = errorLike.message;
    } else if (typeof errorLike === "string") {
      msg = errorLike;
    }
    return msg;
  }
  __name(getMessage, "getMessage");
  function flag(obj, key, value) {
    let flags = obj.__flags || (obj.__flags = /* @__PURE__ */ Object.create(null));
    if (arguments.length === 3) {
      flags[key] = value;
    } else {
      return flags[key];
    }
  }
  __name(flag, "flag");
  function test(obj, args) {
    let negate = flag(obj, "negate"), expr = args[0];
    return negate ? !expr : expr;
  }
  __name(test, "test");
  function type(obj) {
    if (typeof obj === "undefined") {
      return "undefined";
    }
    if (obj === null) {
      return "null";
    }
    const stringTag = obj[Symbol.toStringTag];
    if (typeof stringTag === "string") {
      return stringTag;
    }
    const type3 = Object.prototype.toString.call(obj).slice(8, -1);
    return type3;
  }
  __name(type, "type");
  var canElideFrames = "captureStackTrace" in Error;
  var _a;
  var AssertionError = (_a = class extends Error {
    constructor(message = "Unspecified AssertionError", props, ssf) {
      super(message);
      __publicField(this, "message");
      this.message = message;
      if (canElideFrames) {
        Error.captureStackTrace(this, ssf || _a);
      }
      for (const key in props) {
        if (!(key in this)) {
          this[key] = props[key];
        }
      }
    }
    get name() {
      return "AssertionError";
    }
    get ok() {
      return false;
    }
    toJSON(stack) {
      return {
        ...this,
        name: this.name,
        message: this.message,
        ok: false,
        stack: stack !== false ? this.stack : void 0
      };
    }
  }, __name(_a, "AssertionError"), _a);
  function expectTypes(obj, types) {
    let flagMsg = flag(obj, "message");
    let ssfi = flag(obj, "ssfi");
    flagMsg = flagMsg ? flagMsg + ": " : "";
    obj = flag(obj, "object");
    types = types.map(function(t) {
      return t.toLowerCase();
    });
    types.sort();
    let str = types.map(function(t, index) {
      let art = ~["a", "e", "i", "o", "u"].indexOf(t.charAt(0)) ? "an" : "a";
      let or = types.length > 1 && index === types.length - 1 ? "or " : "";
      return or + art + " " + t;
    }).join(", ");
    let objType = type(obj).toLowerCase();
    if (!types.some(function(expected) {
      return objType === expected;
    })) {
      throw new AssertionError(
        flagMsg + "object tested must be " + str + ", but " + objType + " given",
        void 0,
        ssfi
      );
    }
  }
  __name(expectTypes, "expectTypes");
  function getActual(obj, args) {
    return args.length > 4 ? args[4] : obj._obj;
  }
  __name(getActual, "getActual");
  var ansiColors = {
    bold: ["1", "22"],
    dim: ["2", "22"],
    italic: ["3", "23"],
    underline: ["4", "24"],
    // 5 & 6 are blinking
    inverse: ["7", "27"],
    hidden: ["8", "28"],
    strike: ["9", "29"],
    // 10-20 are fonts
    // 21-29 are resets for 1-9
    black: ["30", "39"],
    red: ["31", "39"],
    green: ["32", "39"],
    yellow: ["33", "39"],
    blue: ["34", "39"],
    magenta: ["35", "39"],
    cyan: ["36", "39"],
    white: ["37", "39"],
    brightblack: ["30;1", "39"],
    brightred: ["31;1", "39"],
    brightgreen: ["32;1", "39"],
    brightyellow: ["33;1", "39"],
    brightblue: ["34;1", "39"],
    brightmagenta: ["35;1", "39"],
    brightcyan: ["36;1", "39"],
    brightwhite: ["37;1", "39"],
    grey: ["90", "39"]
  };
  var styles = {
    special: "cyan",
    number: "yellow",
    bigint: "yellow",
    boolean: "yellow",
    undefined: "grey",
    null: "bold",
    string: "green",
    symbol: "green",
    date: "magenta",
    regexp: "red"
  };
  var truncator = "\u2026";
  function colorise(value, styleType) {
    const color = ansiColors[styles[styleType]] || ansiColors[styleType] || "";
    if (!color) {
      return String(value);
    }
    return `\x1B[${color[0]}m${String(value)}\x1B[${color[1]}m`;
  }
  __name(colorise, "colorise");
  function normaliseOptions({
    showHidden = false,
    depth = 2,
    colors = false,
    customInspect = true,
    showProxy = false,
    maxArrayLength = Infinity,
    breakLength = Infinity,
    seen = [],
    // eslint-disable-next-line no-shadow
    truncate: truncate2 = Infinity,
    stylize = String
  } = {}, inspect3) {
    const options = {
      showHidden: Boolean(showHidden),
      depth: Number(depth),
      colors: Boolean(colors),
      customInspect: Boolean(customInspect),
      showProxy: Boolean(showProxy),
      maxArrayLength: Number(maxArrayLength),
      breakLength: Number(breakLength),
      truncate: Number(truncate2),
      seen,
      inspect: inspect3,
      stylize
    };
    if (options.colors) {
      options.stylize = colorise;
    }
    return options;
  }
  __name(normaliseOptions, "normaliseOptions");
  function isHighSurrogate(char) {
    return char >= "\uD800" && char <= "\uDBFF";
  }
  __name(isHighSurrogate, "isHighSurrogate");
  function truncate(string, length, tail = truncator) {
    string = String(string);
    const tailLength = tail.length;
    const stringLength = string.length;
    if (tailLength > length && stringLength > tailLength) {
      return tail;
    }
    if (stringLength > length && stringLength > tailLength) {
      let end = length - tailLength;
      if (end > 0 && isHighSurrogate(string[end - 1])) {
        end = end - 1;
      }
      return `${string.slice(0, end)}${tail}`;
    }
    return string;
  }
  __name(truncate, "truncate");
  function inspectList(list, options, inspectItem, separator = ", ") {
    inspectItem = inspectItem || options.inspect;
    const size = list.length;
    if (size === 0)
      return "";
    const originalLength = options.truncate;
    let output = "";
    let peek = "";
    let truncated = "";
    for (let i = 0; i < size; i += 1) {
      const last = i + 1 === list.length;
      const secondToLast = i + 2 === list.length;
      truncated = `${truncator}(${list.length - i})`;
      const value = list[i];
      options.truncate = originalLength - output.length - (last ? 0 : separator.length);
      const string = peek || inspectItem(value, options) + (last ? "" : separator);
      const nextLength = output.length + string.length;
      const truncatedLength = nextLength + truncated.length;
      if (last && nextLength > originalLength && output.length + truncated.length <= originalLength) {
        break;
      }
      if (!last && !secondToLast && truncatedLength > originalLength) {
        break;
      }
      peek = last ? "" : inspectItem(list[i + 1], options) + (secondToLast ? "" : separator);
      if (!last && secondToLast && truncatedLength > originalLength && nextLength + peek.length > originalLength) {
        break;
      }
      output += string;
      if (!last && !secondToLast && nextLength + peek.length >= originalLength) {
        truncated = `${truncator}(${list.length - i - 1})`;
        break;
      }
      truncated = "";
    }
    return `${output}${truncated}`;
  }
  __name(inspectList, "inspectList");
  function quoteComplexKey(key) {
    if (key.match(/^[a-zA-Z_][a-zA-Z_0-9]*$/)) {
      return key;
    }
    return JSON.stringify(key).replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
  }
  __name(quoteComplexKey, "quoteComplexKey");
  function inspectProperty([key, value], options) {
    options.truncate -= 2;
    if (typeof key === "string") {
      key = quoteComplexKey(key);
    } else if (typeof key !== "number") {
      key = `[${options.inspect(key, options)}]`;
    }
    options.truncate -= key.length;
    value = options.inspect(value, options);
    return `${key}: ${value}`;
  }
  __name(inspectProperty, "inspectProperty");
  function inspectArray(array, options) {
    const nonIndexProperties = Object.keys(array).slice(array.length);
    if (!array.length && !nonIndexProperties.length)
      return "[]";
    options.truncate -= 4;
    const listContents = inspectList(array, options);
    options.truncate -= listContents.length;
    let propertyContents = "";
    if (nonIndexProperties.length) {
      propertyContents = inspectList(nonIndexProperties.map((key) => [key, array[key]]), options, inspectProperty);
    }
    return `[ ${listContents}${propertyContents ? `, ${propertyContents}` : ""} ]`;
  }
  __name(inspectArray, "inspectArray");
  var getArrayName = /* @__PURE__ */ __name((array) => {
    if (typeof Buffer2 === "function" && array instanceof Buffer2) {
      return "Buffer";
    }
    if (array[Symbol.toStringTag]) {
      return array[Symbol.toStringTag];
    }
    return array.constructor.name;
  }, "getArrayName");
  function inspectTypedArray(array, options) {
    const name = getArrayName(array);
    options.truncate -= name.length + 4;
    const nonIndexProperties = Object.keys(array).slice(array.length);
    if (!array.length && !nonIndexProperties.length)
      return `${name}[]`;
    let output = "";
    for (let i = 0; i < array.length; i++) {
      const string = `${options.stylize(truncate(array[i], options.truncate), "number")}${i === array.length - 1 ? "" : ", "}`;
      options.truncate -= string.length;
      if (array[i] !== array.length && options.truncate <= 3) {
        output += `${truncator}(${array.length - array[i] + 1})`;
        break;
      }
      output += string;
    }
    let propertyContents = "";
    if (nonIndexProperties.length) {
      propertyContents = inspectList(nonIndexProperties.map((key) => [key, array[key]]), options, inspectProperty);
    }
    return `${name}[ ${output}${propertyContents ? `, ${propertyContents}` : ""} ]`;
  }
  __name(inspectTypedArray, "inspectTypedArray");
  function inspectDate(dateObject, options) {
    const stringRepresentation = dateObject.toJSON();
    if (stringRepresentation === null) {
      return "Invalid Date";
    }
    const split = stringRepresentation.split("T");
    const date = split[0];
    return options.stylize(`${date}T${truncate(split[1], options.truncate - date.length - 1)}`, "date");
  }
  __name(inspectDate, "inspectDate");
  function inspectFunction(func, options) {
    const functionType = func[Symbol.toStringTag] || "Function";
    const name = func.name;
    if (!name) {
      return options.stylize(`[${functionType}]`, "special");
    }
    return options.stylize(`[${functionType} ${truncate(name, options.truncate - 11)}]`, "special");
  }
  __name(inspectFunction, "inspectFunction");
  function inspectMapEntry([key, value], options) {
    options.truncate -= 4;
    key = options.inspect(key, options);
    options.truncate -= key.length;
    value = options.inspect(value, options);
    return `${key} => ${value}`;
  }
  __name(inspectMapEntry, "inspectMapEntry");
  function mapToEntries(map) {
    const entries = [];
    map.forEach((value, key) => {
      entries.push([key, value]);
    });
    return entries;
  }
  __name(mapToEntries, "mapToEntries");
  function inspectMap(map, options) {
    if (map.size === 0)
      return "Map{}";
    options.truncate -= 7;
    return `Map{ ${inspectList(mapToEntries(map), options, inspectMapEntry)} }`;
  }
  __name(inspectMap, "inspectMap");
  var isNaN2 = Number.isNaN || ((i) => i !== i);
  function inspectNumber(number, options) {
    if (isNaN2(number)) {
      return options.stylize("NaN", "number");
    }
    if (number === Infinity) {
      return options.stylize("Infinity", "number");
    }
    if (number === -Infinity) {
      return options.stylize("-Infinity", "number");
    }
    if (number === 0) {
      return options.stylize(1 / number === Infinity ? "+0" : "-0", "number");
    }
    return options.stylize(truncate(String(number), options.truncate), "number");
  }
  __name(inspectNumber, "inspectNumber");
  function inspectBigInt(number, options) {
    let nums = truncate(number.toString(), options.truncate - 1);
    if (nums !== truncator)
      nums += "n";
    return options.stylize(nums, "bigint");
  }
  __name(inspectBigInt, "inspectBigInt");
  function inspectRegExp(value, options) {
    const flags = value.toString().split("/")[2];
    const sourceLength = options.truncate - (2 + flags.length);
    const source = value.source;
    return options.stylize(`/${truncate(source, sourceLength)}/${flags}`, "regexp");
  }
  __name(inspectRegExp, "inspectRegExp");
  function arrayFromSet(set2) {
    const values = [];
    set2.forEach((value) => {
      values.push(value);
    });
    return values;
  }
  __name(arrayFromSet, "arrayFromSet");
  function inspectSet(set2, options) {
    if (set2.size === 0)
      return "Set{}";
    options.truncate -= 7;
    return `Set{ ${inspectList(arrayFromSet(set2), options)} }`;
  }
  __name(inspectSet, "inspectSet");
  var stringEscapeChars = new RegExp("['\\u0000-\\u001f\\u007f-\\u009f\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]", "g");
  var escapeCharacters = {
    "\b": "\\b",
    "	": "\\t",
    "\n": "\\n",
    "\f": "\\f",
    "\r": "\\r",
    "'": "\\'",
    "\\": "\\\\"
  };
  var hex = 16;
  var unicodeLength = 4;
  function escape(char) {
    return escapeCharacters[char] || `\\u${`0000${char.charCodeAt(0).toString(hex)}`.slice(-unicodeLength)}`;
  }
  __name(escape, "escape");
  function inspectString(string, options) {
    if (stringEscapeChars.test(string)) {
      string = string.replace(stringEscapeChars, escape);
    }
    return options.stylize(`'${truncate(string, options.truncate - 2)}'`, "string");
  }
  __name(inspectString, "inspectString");
  function inspectSymbol(value) {
    if ("description" in Symbol.prototype) {
      return value.description ? `Symbol(${value.description})` : "Symbol()";
    }
    return value.toString();
  }
  __name(inspectSymbol, "inspectSymbol");
  var getPromiseValue = /* @__PURE__ */ __name(() => "Promise{\u2026}", "getPromiseValue");
  var promise_default = getPromiseValue;
  function inspectObject(object, options) {
    const properties = Object.getOwnPropertyNames(object);
    const symbols = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(object) : [];
    if (properties.length === 0 && symbols.length === 0) {
      return "{}";
    }
    options.truncate -= 4;
    options.seen = options.seen || [];
    if (options.seen.includes(object)) {
      return "[Circular]";
    }
    options.seen.push(object);
    const propertyContents = inspectList(properties.map((key) => [key, object[key]]), options, inspectProperty);
    const symbolContents = inspectList(symbols.map((key) => [key, object[key]]), options, inspectProperty);
    options.seen.pop();
    let sep = "";
    if (propertyContents && symbolContents) {
      sep = ", ";
    }
    return `{ ${propertyContents}${sep}${symbolContents} }`;
  }
  __name(inspectObject, "inspectObject");
  var toStringTag = typeof Symbol !== "undefined" && Symbol.toStringTag ? Symbol.toStringTag : false;
  function inspectClass(value, options) {
    let name = "";
    if (toStringTag && toStringTag in value) {
      name = value[toStringTag];
    }
    name = name || value.constructor.name;
    if (!name || name === "_class") {
      name = "<Anonymous Class>";
    }
    options.truncate -= name.length;
    return `${name}${inspectObject(value, options)}`;
  }
  __name(inspectClass, "inspectClass");
  function inspectArguments(args, options) {
    if (args.length === 0)
      return "Arguments[]";
    options.truncate -= 13;
    return `Arguments[ ${inspectList(args, options)} ]`;
  }
  __name(inspectArguments, "inspectArguments");
  var errorKeys = [
    "stack",
    "line",
    "column",
    "name",
    "message",
    "fileName",
    "lineNumber",
    "columnNumber",
    "number",
    "description",
    "cause"
  ];
  function inspectObject2(error, options) {
    const properties = Object.getOwnPropertyNames(error).filter((key) => errorKeys.indexOf(key) === -1);
    const name = error.name;
    options.truncate -= name.length;
    let message = "";
    if (typeof error.message === "string") {
      message = truncate(error.message, options.truncate);
    } else {
      properties.unshift("message");
    }
    message = message ? `: ${message}` : "";
    options.truncate -= message.length + 5;
    options.seen = options.seen || [];
    if (options.seen.includes(error)) {
      return "[Circular]";
    }
    options.seen.push(error);
    const propertyContents = inspectList(properties.map((key) => [key, error[key]]), options, inspectProperty);
    return `${name}${message}${propertyContents ? ` { ${propertyContents} }` : ""}`;
  }
  __name(inspectObject2, "inspectObject");
  function inspectAttribute([key, value], options) {
    options.truncate -= 3;
    if (!value) {
      return `${options.stylize(String(key), "yellow")}`;
    }
    return `${options.stylize(String(key), "yellow")}=${options.stylize(`"${value}"`, "string")}`;
  }
  __name(inspectAttribute, "inspectAttribute");
  function inspectNodeCollection(collection, options) {
    return inspectList(collection, options, inspectNode, "\n");
  }
  __name(inspectNodeCollection, "inspectNodeCollection");
  function inspectNode(node, options) {
    switch (node.nodeType) {
      case 1:
        return inspectHTML(node, options);
      case 3:
        return options.inspect(node.data, options);
      default:
        return options.inspect(node, options);
    }
  }
  __name(inspectNode, "inspectNode");
  function inspectHTML(element, options) {
    const properties = element.getAttributeNames();
    const name = element.tagName.toLowerCase();
    const head = options.stylize(`<${name}`, "special");
    const headClose = options.stylize(`>`, "special");
    const tail = options.stylize(`</${name}>`, "special");
    options.truncate -= name.length * 2 + 5;
    let propertyContents = "";
    if (properties.length > 0) {
      propertyContents += " ";
      propertyContents += inspectList(properties.map((key) => [key, element.getAttribute(key)]), options, inspectAttribute, " ");
    }
    options.truncate -= propertyContents.length;
    const truncate2 = options.truncate;
    let children = inspectNodeCollection(element.children, options);
    if (children && children.length > truncate2) {
      children = `${truncator}(${element.children.length})`;
    }
    return `${head}${propertyContents}${headClose}${children}${tail}`;
  }
  __name(inspectHTML, "inspectHTML");
  var symbolsSupported = typeof Symbol === "function" && typeof Symbol.for === "function";
  var chaiInspect = symbolsSupported ? Symbol.for("chai/inspect") : "@@chai/inspect";
  var nodeInspect = Symbol.for("nodejs.util.inspect.custom");
  var constructorMap = /* @__PURE__ */ new WeakMap();
  var stringTagMap = {};
  var baseTypesMap = {
    undefined: /* @__PURE__ */ __name((value, options) => options.stylize("undefined", "undefined"), "undefined"),
    null: /* @__PURE__ */ __name((value, options) => options.stylize("null", "null"), "null"),
    boolean: /* @__PURE__ */ __name((value, options) => options.stylize(String(value), "boolean"), "boolean"),
    Boolean: /* @__PURE__ */ __name((value, options) => options.stylize(String(value), "boolean"), "Boolean"),
    number: inspectNumber,
    Number: inspectNumber,
    bigint: inspectBigInt,
    BigInt: inspectBigInt,
    string: inspectString,
    String: inspectString,
    function: inspectFunction,
    Function: inspectFunction,
    symbol: inspectSymbol,
    // A Symbol polyfill will return `Symbol` not `symbol` from typedetect
    Symbol: inspectSymbol,
    Array: inspectArray,
    Date: inspectDate,
    Map: inspectMap,
    Set: inspectSet,
    RegExp: inspectRegExp,
    Promise: promise_default,
    // WeakSet, WeakMap are totally opaque to us
    WeakSet: /* @__PURE__ */ __name((value, options) => options.stylize("WeakSet{\u2026}", "special"), "WeakSet"),
    WeakMap: /* @__PURE__ */ __name((value, options) => options.stylize("WeakMap{\u2026}", "special"), "WeakMap"),
    Arguments: inspectArguments,
    Int8Array: inspectTypedArray,
    Uint8Array: inspectTypedArray,
    Uint8ClampedArray: inspectTypedArray,
    Int16Array: inspectTypedArray,
    Uint16Array: inspectTypedArray,
    Int32Array: inspectTypedArray,
    Uint32Array: inspectTypedArray,
    Float32Array: inspectTypedArray,
    Float64Array: inspectTypedArray,
    Generator: /* @__PURE__ */ __name(() => "", "Generator"),
    DataView: /* @__PURE__ */ __name(() => "", "DataView"),
    ArrayBuffer: /* @__PURE__ */ __name(() => "", "ArrayBuffer"),
    Error: inspectObject2,
    HTMLCollection: inspectNodeCollection,
    NodeList: inspectNodeCollection
  };
  var inspectCustom = /* @__PURE__ */ __name((value, options, type3) => {
    if (chaiInspect in value && typeof value[chaiInspect] === "function") {
      return value[chaiInspect](options);
    }
    if (nodeInspect in value && typeof value[nodeInspect] === "function") {
      return value[nodeInspect](options.depth, options);
    }
    if ("inspect" in value && typeof value.inspect === "function") {
      return value.inspect(options.depth, options);
    }
    if ("constructor" in value && constructorMap.has(value.constructor)) {
      return constructorMap.get(value.constructor)(value, options);
    }
    if (stringTagMap[type3]) {
      return stringTagMap[type3](value, options);
    }
    return "";
  }, "inspectCustom");
  var toString = Object.prototype.toString;
  function inspect(value, opts = {}) {
    const options = normaliseOptions(opts, inspect);
    const { customInspect } = options;
    let type3 = value === null ? "null" : typeof value;
    if (type3 === "object") {
      type3 = toString.call(value).slice(8, -1);
    }
    if (type3 in baseTypesMap) {
      return baseTypesMap[type3](value, options);
    }
    if (customInspect && value) {
      const output = inspectCustom(value, options, type3);
      if (output) {
        if (typeof output === "string")
          return output;
        return inspect(output, options);
      }
    }
    const proto = value ? Object.getPrototypeOf(value) : false;
    if (proto === Object.prototype || proto === null) {
      return inspectObject(value, options);
    }
    if (value && typeof HTMLElement === "function" && value instanceof HTMLElement) {
      return inspectHTML(value, options);
    }
    if ("constructor" in value) {
      if (value.constructor !== Object) {
        return inspectClass(value, options);
      }
      return inspectObject(value, options);
    }
    if (value === Object(value)) {
      return inspectObject(value, options);
    }
    return options.stylize(String(value), type3);
  }
  __name(inspect, "inspect");
  var config = {
    /**
     * ### config.includeStack
     *
     * User configurable property, influences whether stack trace
     * is included in Assertion error message. Default of false
     * suppresses stack trace in the error message.
     *
     *     chai.config.includeStack = true;  // enable stack on error
     *
     * @param {boolean}
     * @public
     */
    includeStack: false,
    /**
     * ### config.showDiff
     *
     * User configurable property, influences whether or not
     * the `showDiff` flag should be included in the thrown
     * AssertionErrors. `false` will always be `false`; `true`
     * will be true when the assertion has requested a diff
     * be shown.
     *
     * @param {boolean}
     * @public
     */
    showDiff: true,
    /**
     * ### config.truncateThreshold
     *
     * User configurable property, sets length threshold for actual and
     * expected values in assertion errors. If this threshold is exceeded, for
     * example for large data structures, the value is replaced with something
     * like `[ Array(3) ]` or `{ Object (prop1, prop2) }`.
     *
     * Set it to zero if you want to disable truncating altogether.
     *
     * This is especially userful when doing assertions on arrays: having this
     * set to a reasonable large value makes the failure messages readily
     * inspectable.
     *
     *     chai.config.truncateThreshold = 0;  // disable truncating
     *
     * @param {number}
     * @public
     */
    truncateThreshold: 40,
    /**
     * ### config.useProxy
     *
     * User configurable property, defines if chai will use a Proxy to throw
     * an error when a non-existent property is read, which protects users
     * from typos when using property-based assertions.
     *
     * Set it to false if you want to disable this feature.
     *
     *     chai.config.useProxy = false;  // disable use of Proxy
     *
     * This feature is automatically disabled regardless of this config value
     * in environments that don't support proxies.
     *
     * @param {boolean}
     * @public
     */
    useProxy: true,
    /**
     * ### config.proxyExcludedKeys
     *
     * User configurable property, defines which properties should be ignored
     * instead of throwing an error if they do not exist on the assertion.
     * This is only applied if the environment Chai is running in supports proxies and
     * if the `useProxy` configuration setting is enabled.
     * By default, `then` and `inspect` will not throw an error if they do not exist on the
     * assertion object because the `.inspect` property is read by `util.inspect` (for example, when
     * using `console.log` on the assertion object) and `.then` is necessary for promise type-checking.
     *
     *     // By default these keys will not throw an error if they do not exist on the assertion object
     *     chai.config.proxyExcludedKeys = ['then', 'inspect'];
     *
     * @param {Array}
     * @public
     */
    proxyExcludedKeys: ["then", "catch", "inspect", "toJSON"],
    /**
     * ### config.deepEqual
     *
     * User configurable property, defines which a custom function to use for deepEqual
     * comparisons.
     * By default, the function used is the one from the `deep-eql` package without custom comparator.
     *
     *     // use a custom comparator
     *     chai.config.deepEqual = (expected, actual) => {
     *         return chai.util.eql(expected, actual, {
     *             comparator: (expected, actual) => {
     *                 // for non number comparison, use the default behavior
     *                 if(typeof expected !== 'number') return null;
     *                 // allow a difference of 10 between compared numbers
     *                 return typeof actual === 'number' && Math.abs(actual - expected) < 10
     *             }
     *         })
     *     };
     *
     * @param {Function}
     * @public
     */
    deepEqual: null
  };
  function inspect2(obj, showHidden, depth, colors) {
    let options = {
      colors,
      depth: typeof depth === "undefined" ? 2 : depth,
      showHidden,
      truncate: config.truncateThreshold ? config.truncateThreshold : Infinity
    };
    return inspect(obj, options);
  }
  __name(inspect2, "inspect");
  function objDisplay(obj) {
    let str = inspect2(obj), type3 = Object.prototype.toString.call(obj);
    if (config.truncateThreshold && str.length >= config.truncateThreshold) {
      if (type3 === "[object Function]") {
        return !obj.name || obj.name === "" ? "[Function]" : "[Function: " + obj.name + "]";
      } else if (type3 === "[object Array]") {
        return "[ Array(" + obj.length + ") ]";
      } else if (type3 === "[object Object]") {
        let keys = Object.keys(obj), kstr = keys.length > 2 ? keys.splice(0, 2).join(", ") + ", ..." : keys.join(", ");
        return "{ Object (" + kstr + ") }";
      } else {
        return str;
      }
    } else {
      return str;
    }
  }
  __name(objDisplay, "objDisplay");
  function getMessage2(obj, args) {
    let negate = flag(obj, "negate");
    let val = flag(obj, "object");
    let expected = args[3];
    let actual = getActual(obj, args);
    let msg = negate ? args[2] : args[1];
    let flagMsg = flag(obj, "message");
    if (typeof msg === "function") msg = msg();
    msg = msg || "";
    msg = msg.replace(/#\{this\}/g, function() {
      return objDisplay(val);
    }).replace(/#\{act\}/g, function() {
      return objDisplay(actual);
    }).replace(/#\{exp\}/g, function() {
      return objDisplay(expected);
    });
    return flagMsg ? flagMsg + ": " + msg : msg;
  }
  __name(getMessage2, "getMessage");
  function transferFlags(assertion, object, includeAll) {
    let flags = assertion.__flags || (assertion.__flags = /* @__PURE__ */ Object.create(null));
    if (!object.__flags) {
      object.__flags = /* @__PURE__ */ Object.create(null);
    }
    includeAll = arguments.length === 3 ? includeAll : true;
    for (let flag3 in flags) {
      if (includeAll || flag3 !== "object" && flag3 !== "ssfi" && flag3 !== "lockSsfi" && flag3 != "message") {
        object.__flags[flag3] = flags[flag3];
      }
    }
  }
  __name(transferFlags, "transferFlags");
  function type2(obj) {
    if (typeof obj === "undefined") {
      return "undefined";
    }
    if (obj === null) {
      return "null";
    }
    const stringTag = obj[Symbol.toStringTag];
    if (typeof stringTag === "string") {
      return stringTag;
    }
    const sliceStart = 8;
    const sliceEnd = -1;
    return Object.prototype.toString.call(obj).slice(sliceStart, sliceEnd);
  }
  __name(type2, "type");
  function FakeMap() {
    this._key = "chai/deep-eql__" + Math.random() + Date.now();
  }
  __name(FakeMap, "FakeMap");
  FakeMap.prototype = {
    get: /* @__PURE__ */ __name(function get(key) {
      return key[this._key];
    }, "get"),
    set: /* @__PURE__ */ __name(function set(key, value) {
      if (Object.isExtensible(key)) {
        Object.defineProperty(key, this._key, {
          value,
          configurable: true
        });
      }
    }, "set")
  };
  var MemoizeMap = typeof WeakMap === "function" ? WeakMap : FakeMap;
  function memoizeCompare(leftHandOperand, rightHandOperand, memoizeMap) {
    if (!memoizeMap || isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) {
      return null;
    }
    var leftHandMap = memoizeMap.get(leftHandOperand);
    if (leftHandMap) {
      var result = leftHandMap.get(rightHandOperand);
      if (typeof result === "boolean") {
        return result;
      }
    }
    return null;
  }
  __name(memoizeCompare, "memoizeCompare");
  function memoizeSet(leftHandOperand, rightHandOperand, memoizeMap, result) {
    if (!memoizeMap || isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) {
      return;
    }
    var leftHandMap = memoizeMap.get(leftHandOperand);
    if (leftHandMap) {
      leftHandMap.set(rightHandOperand, result);
    } else {
      leftHandMap = new MemoizeMap();
      leftHandMap.set(rightHandOperand, result);
      memoizeMap.set(leftHandOperand, leftHandMap);
    }
  }
  __name(memoizeSet, "memoizeSet");
  var deep_eql_default = deepEqual;
  function deepEqual(leftHandOperand, rightHandOperand, options) {
    if (options && options.comparator) {
      return extensiveDeepEqual(leftHandOperand, rightHandOperand, options);
    }
    var simpleResult = simpleEqual(leftHandOperand, rightHandOperand);
    if (simpleResult !== null) {
      return simpleResult;
    }
    return extensiveDeepEqual(leftHandOperand, rightHandOperand, options);
  }
  __name(deepEqual, "deepEqual");
  function simpleEqual(leftHandOperand, rightHandOperand) {
    if (leftHandOperand === rightHandOperand) {
      return leftHandOperand !== 0 || 1 / leftHandOperand === 1 / rightHandOperand;
    }
    if (leftHandOperand !== leftHandOperand && // eslint-disable-line no-self-compare
    rightHandOperand !== rightHandOperand) {
      return true;
    }
    if (isPrimitive(leftHandOperand) || isPrimitive(rightHandOperand)) {
      return false;
    }
    return null;
  }
  __name(simpleEqual, "simpleEqual");
  function extensiveDeepEqual(leftHandOperand, rightHandOperand, options) {
    options = options || {};
    options.memoize = options.memoize === false ? false : options.memoize || new MemoizeMap();
    var comparator = options && options.comparator;
    var memoizeResultLeft = memoizeCompare(leftHandOperand, rightHandOperand, options.memoize);
    if (memoizeResultLeft !== null) {
      return memoizeResultLeft;
    }
    var memoizeResultRight = memoizeCompare(rightHandOperand, leftHandOperand, options.memoize);
    if (memoizeResultRight !== null) {
      return memoizeResultRight;
    }
    if (comparator) {
      var comparatorResult = comparator(leftHandOperand, rightHandOperand);
      if (comparatorResult === false || comparatorResult === true) {
        memoizeSet(leftHandOperand, rightHandOperand, options.memoize, comparatorResult);
        return comparatorResult;
      }
      var simpleResult = simpleEqual(leftHandOperand, rightHandOperand);
      if (simpleResult !== null) {
        return simpleResult;
      }
    }
    var leftHandType = type2(leftHandOperand);
    if (leftHandType !== type2(rightHandOperand)) {
      memoizeSet(leftHandOperand, rightHandOperand, options.memoize, false);
      return false;
    }
    memoizeSet(leftHandOperand, rightHandOperand, options.memoize, true);
    var result = extensiveDeepEqualByType(leftHandOperand, rightHandOperand, leftHandType, options);
    memoizeSet(leftHandOperand, rightHandOperand, options.memoize, result);
    return result;
  }
  __name(extensiveDeepEqual, "extensiveDeepEqual");
  function extensiveDeepEqualByType(leftHandOperand, rightHandOperand, leftHandType, options) {
    switch (leftHandType) {
      case "String":
      case "Number":
      case "Boolean":
      case "Date":
        return deepEqual(leftHandOperand.valueOf(), rightHandOperand.valueOf());
      case "Promise":
      case "Symbol":
      case "function":
      case "WeakMap":
      case "WeakSet":
        return leftHandOperand === rightHandOperand;
      case "Error":
        return keysEqual(leftHandOperand, rightHandOperand, ["name", "message", "code"], options);
      case "Arguments":
      case "Int8Array":
      case "Uint8Array":
      case "Uint8ClampedArray":
      case "Int16Array":
      case "Uint16Array":
      case "Int32Array":
      case "Uint32Array":
      case "Float32Array":
      case "Float64Array":
      case "Array":
        return iterableEqual(leftHandOperand, rightHandOperand, options);
      case "RegExp":
        return regexpEqual(leftHandOperand, rightHandOperand);
      case "Generator":
        return generatorEqual(leftHandOperand, rightHandOperand, options);
      case "DataView":
        return iterableEqual(new Uint8Array(leftHandOperand.buffer), new Uint8Array(rightHandOperand.buffer), options);
      case "ArrayBuffer":
        return iterableEqual(new Uint8Array(leftHandOperand), new Uint8Array(rightHandOperand), options);
      case "Set":
        return entriesEqual(leftHandOperand, rightHandOperand, options);
      case "Map":
        return entriesEqual(leftHandOperand, rightHandOperand, options);
      case "Temporal.PlainDate":
      case "Temporal.PlainTime":
      case "Temporal.PlainDateTime":
      case "Temporal.Instant":
      case "Temporal.ZonedDateTime":
      case "Temporal.PlainYearMonth":
      case "Temporal.PlainMonthDay":
        return leftHandOperand.equals(rightHandOperand);
      case "Temporal.Duration":
        return leftHandOperand.total("nanoseconds") === rightHandOperand.total("nanoseconds");
      case "Temporal.TimeZone":
      case "Temporal.Calendar":
        return leftHandOperand.toString() === rightHandOperand.toString();
      default:
        return objectEqual(leftHandOperand, rightHandOperand, options);
    }
  }
  __name(extensiveDeepEqualByType, "extensiveDeepEqualByType");
  function regexpEqual(leftHandOperand, rightHandOperand) {
    return leftHandOperand.toString() === rightHandOperand.toString();
  }
  __name(regexpEqual, "regexpEqual");
  function entriesEqual(leftHandOperand, rightHandOperand, options) {
    try {
      if (leftHandOperand.size !== rightHandOperand.size) {
        return false;
      }
      if (leftHandOperand.size === 0) {
        return true;
      }
    } catch (sizeError) {
      return false;
    }
    var leftHandItems = [];
    var rightHandItems = [];
    leftHandOperand.forEach(/* @__PURE__ */ __name(function gatherEntries(key, value) {
      leftHandItems.push([key, value]);
    }, "gatherEntries"));
    rightHandOperand.forEach(/* @__PURE__ */ __name(function gatherEntries(key, value) {
      rightHandItems.push([key, value]);
    }, "gatherEntries"));
    return iterableEqual(leftHandItems.sort(), rightHandItems.sort(), options);
  }
  __name(entriesEqual, "entriesEqual");
  function iterableEqual(leftHandOperand, rightHandOperand, options) {
    var length = leftHandOperand.length;
    if (length !== rightHandOperand.length) {
      return false;
    }
    if (length === 0) {
      return true;
    }
    var index = -1;
    while (++index < length) {
      if (deepEqual(leftHandOperand[index], rightHandOperand[index], options) === false) {
        return false;
      }
    }
    return true;
  }
  __name(iterableEqual, "iterableEqual");
  function generatorEqual(leftHandOperand, rightHandOperand, options) {
    return iterableEqual(getGeneratorEntries(leftHandOperand), getGeneratorEntries(rightHandOperand), options);
  }
  __name(generatorEqual, "generatorEqual");
  function hasIteratorFunction(target) {
    return typeof Symbol !== "undefined" && typeof target === "object" && typeof Symbol.iterator !== "undefined" && typeof target[Symbol.iterator] === "function";
  }
  __name(hasIteratorFunction, "hasIteratorFunction");
  function getIteratorEntries(target) {
    if (hasIteratorFunction(target)) {
      try {
        return getGeneratorEntries(target[Symbol.iterator]());
      } catch (iteratorError) {
        return [];
      }
    }
    return [];
  }
  __name(getIteratorEntries, "getIteratorEntries");
  function getGeneratorEntries(generator) {
    var generatorResult = generator.next();
    var accumulator = [generatorResult.value];
    while (generatorResult.done === false) {
      generatorResult = generator.next();
      accumulator.push(generatorResult.value);
    }
    return accumulator;
  }
  __name(getGeneratorEntries, "getGeneratorEntries");
  function getEnumerableKeys(target) {
    var keys = [];
    for (var key in target) {
      keys.push(key);
    }
    return keys;
  }
  __name(getEnumerableKeys, "getEnumerableKeys");
  function getEnumerableSymbols(target) {
    var keys = [];
    var allKeys = Object.getOwnPropertySymbols(target);
    for (var i = 0; i < allKeys.length; i += 1) {
      var key = allKeys[i];
      if (Object.getOwnPropertyDescriptor(target, key).enumerable) {
        keys.push(key);
      }
    }
    return keys;
  }
  __name(getEnumerableSymbols, "getEnumerableSymbols");
  function keysEqual(leftHandOperand, rightHandOperand, keys, options) {
    var length = keys.length;
    if (length === 0) {
      return true;
    }
    for (var i = 0; i < length; i += 1) {
      if (deepEqual(leftHandOperand[keys[i]], rightHandOperand[keys[i]], options) === false) {
        return false;
      }
    }
    return true;
  }
  __name(keysEqual, "keysEqual");
  function objectEqual(leftHandOperand, rightHandOperand, options) {
    var leftHandKeys = getEnumerableKeys(leftHandOperand);
    var rightHandKeys = getEnumerableKeys(rightHandOperand);
    var leftHandSymbols = getEnumerableSymbols(leftHandOperand);
    var rightHandSymbols = getEnumerableSymbols(rightHandOperand);
    leftHandKeys = leftHandKeys.concat(leftHandSymbols);
    rightHandKeys = rightHandKeys.concat(rightHandSymbols);
    if (leftHandKeys.length && leftHandKeys.length === rightHandKeys.length) {
      if (iterableEqual(mapSymbols(leftHandKeys).sort(), mapSymbols(rightHandKeys).sort()) === false) {
        return false;
      }
      return keysEqual(leftHandOperand, rightHandOperand, leftHandKeys, options);
    }
    var leftHandEntries = getIteratorEntries(leftHandOperand);
    var rightHandEntries = getIteratorEntries(rightHandOperand);
    if (leftHandEntries.length && leftHandEntries.length === rightHandEntries.length) {
      leftHandEntries.sort();
      rightHandEntries.sort();
      return iterableEqual(leftHandEntries, rightHandEntries, options);
    }
    if (leftHandKeys.length === 0 && leftHandEntries.length === 0 && rightHandKeys.length === 0 && rightHandEntries.length === 0) {
      return true;
    }
    return false;
  }
  __name(objectEqual, "objectEqual");
  function isPrimitive(value) {
    return value === null || typeof value !== "object";
  }
  __name(isPrimitive, "isPrimitive");
  function mapSymbols(arr) {
    return arr.map(/* @__PURE__ */ __name(function mapSymbol(entry) {
      if (typeof entry === "symbol") {
        return entry.toString();
      }
      return entry;
    }, "mapSymbol"));
  }
  __name(mapSymbols, "mapSymbols");
  function hasProperty(obj, name) {
    if (typeof obj === "undefined" || obj === null) {
      return false;
    }
    return name in Object(obj);
  }
  __name(hasProperty, "hasProperty");
  function parsePath(path) {
    const str = path.replace(/([^\\])\[/g, "$1.[");
    const parts = str.match(/(\\\.|[^.]+?)+/g);
    return parts.map((value) => {
      if (value === "constructor" || value === "__proto__" || value === "prototype") {
        return {};
      }
      const regexp = /^\[(\d+)\]$/;
      const mArr = regexp.exec(value);
      let parsed = null;
      if (mArr) {
        parsed = { i: parseFloat(mArr[1]) };
      } else {
        parsed = { p: value.replace(/\\([.[\]])/g, "$1") };
      }
      return parsed;
    });
  }
  __name(parsePath, "parsePath");
  function internalGetPathValue(obj, parsed, pathDepth) {
    let temporaryValue = obj;
    let res = null;
    pathDepth = typeof pathDepth === "undefined" ? parsed.length : pathDepth;
    for (let i = 0; i < pathDepth; i++) {
      const part = parsed[i];
      if (temporaryValue) {
        if (typeof part.p === "undefined") {
          temporaryValue = temporaryValue[part.i];
        } else {
          temporaryValue = temporaryValue[part.p];
        }
        if (i === pathDepth - 1) {
          res = temporaryValue;
        }
      }
    }
    return res;
  }
  __name(internalGetPathValue, "internalGetPathValue");
  function getPathInfo(obj, path) {
    const parsed = parsePath(path);
    const last = parsed[parsed.length - 1];
    const info = {
      parent: parsed.length > 1 ? internalGetPathValue(obj, parsed, parsed.length - 1) : obj,
      name: last.p || last.i,
      value: internalGetPathValue(obj, parsed)
    };
    info.exists = hasProperty(info.parent, info.name);
    return info;
  }
  __name(getPathInfo, "getPathInfo");
  var _a2;
  var Assertion = (_a2 = class {
    /**
     * Creates object for chaining.
     * `Assertion` objects contain metadata in the form of flags. Three flags can
     * be assigned during instantiation by passing arguments to this constructor:
     *
     * - `object`: This flag contains the target of the assertion. For example, in
     * the assertion `expect(numKittens).to.equal(7);`, the `object` flag will
     * contain `numKittens` so that the `equal` assertion can reference it when
     * needed.
     *
     * - `message`: This flag contains an optional custom error message to be
     * prepended to the error message that's generated by the assertion when it
     * fails.
     *
     * - `ssfi`: This flag stands for "start stack function indicator". It
     * contains a function reference that serves as the starting point for
     * removing frames from the stack trace of the error that's created by the
     * assertion when it fails. The goal is to provide a cleaner stack trace to
     * end users by removing Chai's internal functions. Note that it only works
     * in environments that support `Error.captureStackTrace`, and only when
     * `Chai.config.includeStack` hasn't been set to `false`.
     *
     * - `lockSsfi`: This flag controls whether or not the given `ssfi` flag
     * should retain its current value, even as assertions are chained off of
     * this object. This is usually set to `true` when creating a new assertion
     * from within another assertion. It's also temporarily set to `true` before
     * an overwritten assertion gets called by the overwriting assertion.
     *
     * - `eql`: This flag contains the deepEqual function to be used by the assertion.
     *
     * @param {unknown} obj target of the assertion
     * @param {string} [msg] (optional) custom error message
     * @param {Function} [ssfi] (optional) starting point for removing stack frames
     * @param {boolean} [lockSsfi] (optional) whether or not the ssfi flag is locked
     */
    constructor(obj, msg, ssfi, lockSsfi) {
      /** @type {{}} */
      __publicField(this, "__flags", {});
      flag(this, "ssfi", ssfi || _a2);
      flag(this, "lockSsfi", lockSsfi);
      flag(this, "object", obj);
      flag(this, "message", msg);
      flag(this, "eql", config.deepEqual || deep_eql_default);
      return proxify(this);
    }
    /** @returns {boolean} */
    static get includeStack() {
      console.warn(
        "Assertion.includeStack is deprecated, use chai.config.includeStack instead."
      );
      return config.includeStack;
    }
    /** @param {boolean} value */
    static set includeStack(value) {
      console.warn(
        "Assertion.includeStack is deprecated, use chai.config.includeStack instead."
      );
      config.includeStack = value;
    }
    /** @returns {boolean} */
    static get showDiff() {
      console.warn(
        "Assertion.showDiff is deprecated, use chai.config.showDiff instead."
      );
      return config.showDiff;
    }
    /** @param {boolean} value */
    static set showDiff(value) {
      console.warn(
        "Assertion.showDiff is deprecated, use chai.config.showDiff instead."
      );
      config.showDiff = value;
    }
    /**
     * @param {string} name
     * @param {Function} fn
     */
    static addProperty(name, fn) {
      addProperty(this.prototype, name, fn);
    }
    /**
     * @param {string} name
     * @param {Function} fn
     */
    static addMethod(name, fn) {
      addMethod(this.prototype, name, fn);
    }
    /**
     * @param {string} name
     * @param {Function} fn
     * @param {Function} chainingBehavior
     */
    static addChainableMethod(name, fn, chainingBehavior) {
      addChainableMethod(this.prototype, name, fn, chainingBehavior);
    }
    /**
     * @param {string} name
     * @param {Function} fn
     */
    static overwriteProperty(name, fn) {
      overwriteProperty(this.prototype, name, fn);
    }
    /**
     * @param {string} name
     * @param {Function} fn
     */
    static overwriteMethod(name, fn) {
      overwriteMethod(this.prototype, name, fn);
    }
    /**
     * @param {string} name
     * @param {Function} fn
     * @param {Function} chainingBehavior
     */
    static overwriteChainableMethod(name, fn, chainingBehavior) {
      overwriteChainableMethod(this.prototype, name, fn, chainingBehavior);
    }
    /**
     * ### .assert(expression, message, negateMessage, expected, actual, showDiff)
     *
     * Executes an expression and check expectations. Throws AssertionError for reporting if test doesn't pass.
     *
     * @name assert
     * @param {unknown} _expr to be tested
     * @param {string | Function} msg or function that returns message to display if expression fails
     * @param {string | Function} _negateMsg or function that returns negatedMessage to display if negated expression fails
     * @param {unknown} expected value (remember to check for negation)
     * @param {unknown} _actual (optional) will default to `this.obj`
     * @param {boolean} showDiff (optional) when set to `true`, assert will display a diff in addition to the message if expression fails
     * @returns {void}
     */
    assert(_expr, msg, _negateMsg, expected, _actual, showDiff) {
      const ok = test(this, arguments);
      if (false !== showDiff) showDiff = true;
      if (void 0 === expected && void 0 === _actual) showDiff = false;
      if (true !== config.showDiff) showDiff = false;
      if (!ok) {
        msg = getMessage2(this, arguments);
        const actual = getActual(this, arguments);
        const assertionErrorObjectProperties = {
          actual,
          expected,
          showDiff
        };
        const operator = getOperator(this, arguments);
        if (operator) {
          assertionErrorObjectProperties.operator = operator;
        }
        throw new AssertionError(
          msg,
          assertionErrorObjectProperties,
          // @ts-expect-error Not sure what to do about these types yet
          config.includeStack ? this.assert : flag(this, "ssfi")
        );
      }
    }
    /**
     * Quick reference to stored `actual` value for plugin developers.
     *
     * @returns {unknown}
     */
    get _obj() {
      return flag(this, "object");
    }
    /**
     * Quick reference to stored `actual` value for plugin developers.
     *
     * @param {unknown} val
     */
    set _obj(val) {
      flag(this, "object", val);
    }
  }, __name(_a2, "Assertion"), _a2);
  function isProxyEnabled() {
    return config.useProxy && typeof Proxy !== "undefined" && typeof Reflect !== "undefined";
  }
  __name(isProxyEnabled, "isProxyEnabled");
  function addProperty(ctx, name, getter) {
    getter = getter === void 0 ? function() {
    } : getter;
    Object.defineProperty(ctx, name, {
      get: /* @__PURE__ */ __name(function propertyGetter() {
        if (!isProxyEnabled() && !flag(this, "lockSsfi")) {
          flag(this, "ssfi", propertyGetter);
        }
        let result = getter.call(this);
        if (result !== void 0) return result;
        let newAssertion = new Assertion();
        transferFlags(this, newAssertion);
        return newAssertion;
      }, "propertyGetter"),
      configurable: true
    });
  }
  __name(addProperty, "addProperty");
  var fnLengthDesc = Object.getOwnPropertyDescriptor(function() {
  }, "length");
  function addLengthGuard(fn, assertionName, isChainable) {
    if (!fnLengthDesc.configurable) return fn;
    Object.defineProperty(fn, "length", {
      get: /* @__PURE__ */ __name(function() {
        if (isChainable) {
          throw Error(
            "Invalid Chai property: " + assertionName + '.length. Due to a compatibility issue, "length" cannot directly follow "' + assertionName + '". Use "' + assertionName + '.lengthOf" instead.'
          );
        }
        throw Error(
          "Invalid Chai property: " + assertionName + '.length. See docs for proper usage of "' + assertionName + '".'
        );
      }, "get")
    });
    return fn;
  }
  __name(addLengthGuard, "addLengthGuard");
  function getProperties(object) {
    let result = Object.getOwnPropertyNames(object);
    function addProperty2(property) {
      if (result.indexOf(property) === -1) {
        result.push(property);
      }
    }
    __name(addProperty2, "addProperty");
    let proto = Object.getPrototypeOf(object);
    while (proto !== null) {
      Object.getOwnPropertyNames(proto).forEach(addProperty2);
      proto = Object.getPrototypeOf(proto);
    }
    return result;
  }
  __name(getProperties, "getProperties");
  var builtins = ["__flags", "__methods", "_obj", "assert"];
  function proxify(obj, nonChainableMethodName) {
    if (!isProxyEnabled()) return obj;
    return new Proxy(obj, {
      get: /* @__PURE__ */ __name(function proxyGetter(target, property) {
        if (typeof property === "string" && config.proxyExcludedKeys.indexOf(property) === -1 && !Reflect.has(target, property)) {
          if (nonChainableMethodName) {
            throw Error(
              "Invalid Chai property: " + nonChainableMethodName + "." + property + '. See docs for proper usage of "' + nonChainableMethodName + '".'
            );
          }
          let suggestion = null;
          let suggestionDistance = 4;
          getProperties(target).forEach(function(prop) {
            if (
              // we actually mean to check `Object.prototype` here
              // eslint-disable-next-line no-prototype-builtins
              !Object.prototype.hasOwnProperty(prop) && builtins.indexOf(prop) === -1
            ) {
              let dist = stringDistanceCapped(property, prop, suggestionDistance);
              if (dist < suggestionDistance) {
                suggestion = prop;
                suggestionDistance = dist;
              }
            }
          });
          if (suggestion !== null) {
            throw Error(
              "Invalid Chai property: " + property + '. Did you mean "' + suggestion + '"?'
            );
          } else {
            throw Error("Invalid Chai property: " + property);
          }
        }
        if (builtins.indexOf(property) === -1 && !flag(target, "lockSsfi")) {
          flag(target, "ssfi", proxyGetter);
        }
        return Reflect.get(target, property);
      }, "proxyGetter")
    });
  }
  __name(proxify, "proxify");
  function stringDistanceCapped(strA, strB, cap) {
    if (Math.abs(strA.length - strB.length) >= cap) {
      return cap;
    }
    let memo = [];
    for (let i = 0; i <= strA.length; i++) {
      memo[i] = Array(strB.length + 1).fill(0);
      memo[i][0] = i;
    }
    for (let j = 0; j < strB.length; j++) {
      memo[0][j] = j;
    }
    for (let i = 1; i <= strA.length; i++) {
      let ch = strA.charCodeAt(i - 1);
      for (let j = 1; j <= strB.length; j++) {
        if (Math.abs(i - j) >= cap) {
          memo[i][j] = cap;
          continue;
        }
        memo[i][j] = Math.min(
          memo[i - 1][j] + 1,
          memo[i][j - 1] + 1,
          memo[i - 1][j - 1] + (ch === strB.charCodeAt(j - 1) ? 0 : 1)
        );
      }
    }
    return memo[strA.length][strB.length];
  }
  __name(stringDistanceCapped, "stringDistanceCapped");
  function addMethod(ctx, name, method) {
    let methodWrapper = /* @__PURE__ */ __name(function() {
      if (!flag(this, "lockSsfi")) {
        flag(this, "ssfi", methodWrapper);
      }
      let result = method.apply(this, arguments);
      if (result !== void 0) return result;
      let newAssertion = new Assertion();
      transferFlags(this, newAssertion);
      return newAssertion;
    }, "methodWrapper");
    addLengthGuard(methodWrapper, name, false);
    ctx[name] = proxify(methodWrapper, name);
  }
  __name(addMethod, "addMethod");
  function overwriteProperty(ctx, name, getter) {
    let _get = Object.getOwnPropertyDescriptor(ctx, name), _super = /* @__PURE__ */ __name(function() {
    }, "_super");
    if (_get && "function" === typeof _get.get) _super = _get.get;
    Object.defineProperty(ctx, name, {
      get: /* @__PURE__ */ __name(function overwritingPropertyGetter() {
        if (!isProxyEnabled() && !flag(this, "lockSsfi")) {
          flag(this, "ssfi", overwritingPropertyGetter);
        }
        let origLockSsfi = flag(this, "lockSsfi");
        flag(this, "lockSsfi", true);
        let result = getter(_super).call(this);
        flag(this, "lockSsfi", origLockSsfi);
        if (result !== void 0) {
          return result;
        }
        let newAssertion = new Assertion();
        transferFlags(this, newAssertion);
        return newAssertion;
      }, "overwritingPropertyGetter"),
      configurable: true
    });
  }
  __name(overwriteProperty, "overwriteProperty");
  function overwriteMethod(ctx, name, method) {
    let _method = ctx[name], _super = /* @__PURE__ */ __name(function() {
      throw new Error(name + " is not a function");
    }, "_super");
    if (_method && "function" === typeof _method) _super = _method;
    let overwritingMethodWrapper = /* @__PURE__ */ __name(function() {
      if (!flag(this, "lockSsfi")) {
        flag(this, "ssfi", overwritingMethodWrapper);
      }
      let origLockSsfi = flag(this, "lockSsfi");
      flag(this, "lockSsfi", true);
      let result = method(_super).apply(this, arguments);
      flag(this, "lockSsfi", origLockSsfi);
      if (result !== void 0) {
        return result;
      }
      let newAssertion = new Assertion();
      transferFlags(this, newAssertion);
      return newAssertion;
    }, "overwritingMethodWrapper");
    addLengthGuard(overwritingMethodWrapper, name, false);
    ctx[name] = proxify(overwritingMethodWrapper, name);
  }
  __name(overwriteMethod, "overwriteMethod");
  var canSetPrototype = typeof Object.setPrototypeOf === "function";
  var testFn = /* @__PURE__ */ __name(function() {
  }, "testFn");
  var excludeNames = Object.getOwnPropertyNames(testFn).filter(function(name) {
    let propDesc = Object.getOwnPropertyDescriptor(testFn, name);
    if (typeof propDesc !== "object") return true;
    return !propDesc.configurable;
  });
  var call = Function.prototype.call;
  var apply = Function.prototype.apply;
  function addChainableMethod(ctx, name, method, chainingBehavior) {
    if (typeof chainingBehavior !== "function") {
      chainingBehavior = /* @__PURE__ */ __name(function() {
      }, "chainingBehavior");
    }
    let chainableBehavior = {
      method,
      chainingBehavior
    };
    if (!ctx.__methods) {
      ctx.__methods = {};
    }
    ctx.__methods[name] = chainableBehavior;
    Object.defineProperty(ctx, name, {
      get: /* @__PURE__ */ __name(function chainableMethodGetter() {
        chainableBehavior.chainingBehavior.call(this);
        let chainableMethodWrapper = /* @__PURE__ */ __name(function() {
          if (!flag(this, "lockSsfi")) {
            flag(this, "ssfi", chainableMethodWrapper);
          }
          let result = chainableBehavior.method.apply(this, arguments);
          if (result !== void 0) {
            return result;
          }
          let newAssertion = new Assertion();
          transferFlags(this, newAssertion);
          return newAssertion;
        }, "chainableMethodWrapper");
        addLengthGuard(chainableMethodWrapper, name, true);
        if (canSetPrototype) {
          let prototype = Object.create(this);
          prototype.call = call;
          prototype.apply = apply;
          Object.setPrototypeOf(chainableMethodWrapper, prototype);
        } else {
          let asserterNames = Object.getOwnPropertyNames(ctx);
          asserterNames.forEach(function(asserterName) {
            if (excludeNames.indexOf(asserterName) !== -1) {
              return;
            }
            let pd = Object.getOwnPropertyDescriptor(ctx, asserterName);
            Object.defineProperty(chainableMethodWrapper, asserterName, pd);
          });
        }
        transferFlags(this, chainableMethodWrapper);
        return proxify(chainableMethodWrapper);
      }, "chainableMethodGetter"),
      configurable: true
    });
  }
  __name(addChainableMethod, "addChainableMethod");
  function overwriteChainableMethod(ctx, name, method, chainingBehavior) {
    let chainableBehavior = ctx.__methods[name];
    let _chainingBehavior = chainableBehavior.chainingBehavior;
    chainableBehavior.chainingBehavior = /* @__PURE__ */ __name(function overwritingChainableMethodGetter() {
      let result = chainingBehavior(_chainingBehavior).call(this);
      if (result !== void 0) {
        return result;
      }
      let newAssertion = new Assertion();
      transferFlags(this, newAssertion);
      return newAssertion;
    }, "overwritingChainableMethodGetter");
    let _method = chainableBehavior.method;
    chainableBehavior.method = /* @__PURE__ */ __name(function overwritingChainableMethodWrapper() {
      let result = method(_method).apply(this, arguments);
      if (result !== void 0) {
        return result;
      }
      let newAssertion = new Assertion();
      transferFlags(this, newAssertion);
      return newAssertion;
    }, "overwritingChainableMethodWrapper");
  }
  __name(overwriteChainableMethod, "overwriteChainableMethod");
  function compareByInspect(a, b) {
    return inspect2(a) < inspect2(b) ? -1 : 1;
  }
  __name(compareByInspect, "compareByInspect");
  function getOwnEnumerablePropertySymbols(obj) {
    if (typeof Object.getOwnPropertySymbols !== "function") return [];
    return Object.getOwnPropertySymbols(obj).filter(function(sym) {
      return Object.getOwnPropertyDescriptor(obj, sym).enumerable;
    });
  }
  __name(getOwnEnumerablePropertySymbols, "getOwnEnumerablePropertySymbols");
  function getOwnEnumerableProperties(obj) {
    return Object.keys(obj).concat(getOwnEnumerablePropertySymbols(obj));
  }
  __name(getOwnEnumerableProperties, "getOwnEnumerableProperties");
  var isNaN22 = Number.isNaN;
  function isObjectType(obj) {
    let objectType = type(obj);
    let objectTypes = ["Array", "Object", "Function"];
    return objectTypes.indexOf(objectType) !== -1;
  }
  __name(isObjectType, "isObjectType");
  function getOperator(obj, args) {
    let operator = flag(obj, "operator");
    let negate = flag(obj, "negate");
    let expected = args[3];
    let msg = negate ? args[2] : args[1];
    if (operator) {
      return operator;
    }
    if (typeof msg === "function") msg = msg();
    msg = msg || "";
    if (!msg) {
      return void 0;
    }
    if (/\shave\s/.test(msg)) {
      return void 0;
    }
    let isObject = isObjectType(expected);
    if (/\snot\s/.test(msg)) {
      return isObject ? "notDeepStrictEqual" : "notStrictEqual";
    }
    return isObject ? "deepStrictEqual" : "strictEqual";
  }
  __name(getOperator, "getOperator");
  function getName(fn) {
    return fn.name;
  }
  __name(getName, "getName");
  function isRegExp2(obj) {
    return Object.prototype.toString.call(obj) === "[object RegExp]";
  }
  __name(isRegExp2, "isRegExp");
  function isNumeric(obj) {
    return ["Number", "BigInt"].includes(type(obj));
  }
  __name(isNumeric, "isNumeric");
  var { flag: flag2 } = utils_exports;
  [
    "to",
    "be",
    "been",
    "is",
    "and",
    "has",
    "have",
    "with",
    "that",
    "which",
    "at",
    "of",
    "same",
    "but",
    "does",
    "still",
    "also"
  ].forEach(function(chain) {
    Assertion.addProperty(chain);
  });
  Assertion.addProperty("not", function() {
    flag2(this, "negate", true);
  });
  Assertion.addProperty("deep", function() {
    flag2(this, "deep", true);
  });
  Assertion.addProperty("nested", function() {
    flag2(this, "nested", true);
  });
  Assertion.addProperty("own", function() {
    flag2(this, "own", true);
  });
  Assertion.addProperty("ordered", function() {
    flag2(this, "ordered", true);
  });
  Assertion.addProperty("any", function() {
    flag2(this, "any", true);
    flag2(this, "all", false);
  });
  Assertion.addProperty("all", function() {
    flag2(this, "all", true);
    flag2(this, "any", false);
  });
  var functionTypes = {
    function: [
      "function",
      "asyncfunction",
      "generatorfunction",
      "asyncgeneratorfunction"
    ],
    asyncfunction: ["asyncfunction", "asyncgeneratorfunction"],
    generatorfunction: ["generatorfunction", "asyncgeneratorfunction"],
    asyncgeneratorfunction: ["asyncgeneratorfunction"]
  };
  function an(type3, msg) {
    if (msg) flag2(this, "message", msg);
    type3 = type3.toLowerCase();
    let obj = flag2(this, "object"), article = ~["a", "e", "i", "o", "u"].indexOf(type3.charAt(0)) ? "an " : "a ";
    const detectedType = type(obj).toLowerCase();
    if (functionTypes["function"].includes(type3)) {
      this.assert(
        functionTypes[type3].includes(detectedType),
        "expected #{this} to be " + article + type3,
        "expected #{this} not to be " + article + type3
      );
    } else {
      this.assert(
        type3 === detectedType,
        "expected #{this} to be " + article + type3,
        "expected #{this} not to be " + article + type3
      );
    }
  }
  __name(an, "an");
  Assertion.addChainableMethod("an", an);
  Assertion.addChainableMethod("a", an);
  function SameValueZero(a, b) {
    return isNaN22(a) && isNaN22(b) || a === b;
  }
  __name(SameValueZero, "SameValueZero");
  function includeChainingBehavior() {
    flag2(this, "contains", true);
  }
  __name(includeChainingBehavior, "includeChainingBehavior");
  function include(val, msg) {
    if (msg) flag2(this, "message", msg);
    let obj = flag2(this, "object"), objType = type(obj).toLowerCase(), flagMsg = flag2(this, "message"), negate = flag2(this, "negate"), ssfi = flag2(this, "ssfi"), isDeep = flag2(this, "deep"), descriptor = isDeep ? "deep " : "", isEql = isDeep ? flag2(this, "eql") : SameValueZero;
    flagMsg = flagMsg ? flagMsg + ": " : "";
    let included = false;
    switch (objType) {
      case "string":
        included = obj.indexOf(val) !== -1;
        break;
      case "weakset":
        if (isDeep) {
          throw new AssertionError(
            flagMsg + "unable to use .deep.include with WeakSet",
            void 0,
            ssfi
          );
        }
        included = obj.has(val);
        break;
      case "map":
        obj.forEach(function(item) {
          included = included || isEql(item, val);
        });
        break;
      case "set":
        if (isDeep) {
          obj.forEach(function(item) {
            included = included || isEql(item, val);
          });
        } else {
          included = obj.has(val);
        }
        break;
      case "array":
        if (isDeep) {
          included = obj.some(function(item) {
            return isEql(item, val);
          });
        } else {
          included = obj.indexOf(val) !== -1;
        }
        break;
      default: {
        if (val !== Object(val)) {
          throw new AssertionError(
            flagMsg + "the given combination of arguments (" + objType + " and " + type(val).toLowerCase() + ") is invalid for this assertion. You can use an array, a map, an object, a set, a string, or a weakset instead of a " + type(val).toLowerCase(),
            void 0,
            ssfi
          );
        }
        let props = Object.keys(val);
        let firstErr = null;
        let numErrs = 0;
        props.forEach(function(prop) {
          let propAssertion = new Assertion(obj);
          transferFlags(this, propAssertion, true);
          flag2(propAssertion, "lockSsfi", true);
          if (!negate || props.length === 1) {
            propAssertion.property(prop, val[prop]);
            return;
          }
          try {
            propAssertion.property(prop, val[prop]);
          } catch (err) {
            if (!check_error_exports.compatibleConstructor(err, AssertionError)) {
              throw err;
            }
            if (firstErr === null) firstErr = err;
            numErrs++;
          }
        }, this);
        if (negate && props.length > 1 && numErrs === props.length) {
          throw firstErr;
        }
        return;
      }
    }
    this.assert(
      included,
      "expected #{this} to " + descriptor + "include " + inspect2(val),
      "expected #{this} to not " + descriptor + "include " + inspect2(val)
    );
  }
  __name(include, "include");
  Assertion.addChainableMethod("include", include, includeChainingBehavior);
  Assertion.addChainableMethod("contain", include, includeChainingBehavior);
  Assertion.addChainableMethod("contains", include, includeChainingBehavior);
  Assertion.addChainableMethod("includes", include, includeChainingBehavior);
  Assertion.addProperty("ok", function() {
    this.assert(
      flag2(this, "object"),
      "expected #{this} to be truthy",
      "expected #{this} to be falsy"
    );
  });
  Assertion.addProperty("true", function() {
    this.assert(
      true === flag2(this, "object"),
      "expected #{this} to be true",
      "expected #{this} to be false",
      flag2(this, "negate") ? false : true
    );
  });
  Assertion.addProperty("numeric", function() {
    const object = flag2(this, "object");
    this.assert(
      ["Number", "BigInt"].includes(type(object)),
      "expected #{this} to be numeric",
      "expected #{this} to not be numeric",
      flag2(this, "negate") ? false : true
    );
  });
  Assertion.addProperty("callable", function() {
    const val = flag2(this, "object");
    const ssfi = flag2(this, "ssfi");
    const message = flag2(this, "message");
    const msg = message ? `${message}: ` : "";
    const negate = flag2(this, "negate");
    const assertionMessage = negate ? `${msg}expected ${inspect2(val)} not to be a callable function` : `${msg}expected ${inspect2(val)} to be a callable function`;
    const isCallable = [
      "Function",
      "AsyncFunction",
      "GeneratorFunction",
      "AsyncGeneratorFunction"
    ].includes(type(val));
    if (isCallable && negate || !isCallable && !negate) {
      throw new AssertionError(assertionMessage, void 0, ssfi);
    }
  });
  Assertion.addProperty("false", function() {
    this.assert(
      false === flag2(this, "object"),
      "expected #{this} to be false",
      "expected #{this} to be true",
      flag2(this, "negate") ? true : false
    );
  });
  Assertion.addProperty("null", function() {
    this.assert(
      null === flag2(this, "object"),
      "expected #{this} to be null",
      "expected #{this} not to be null"
    );
  });
  Assertion.addProperty("undefined", function() {
    this.assert(
      void 0 === flag2(this, "object"),
      "expected #{this} to be undefined",
      "expected #{this} not to be undefined"
    );
  });
  Assertion.addProperty("NaN", function() {
    this.assert(
      isNaN22(flag2(this, "object")),
      "expected #{this} to be NaN",
      "expected #{this} not to be NaN"
    );
  });
  function assertExist() {
    let val = flag2(this, "object");
    this.assert(
      val !== null && val !== void 0,
      "expected #{this} to exist",
      "expected #{this} to not exist"
    );
  }
  __name(assertExist, "assertExist");
  Assertion.addProperty("exist", assertExist);
  Assertion.addProperty("exists", assertExist);
  Assertion.addProperty("empty", function() {
    let val = flag2(this, "object"), ssfi = flag2(this, "ssfi"), flagMsg = flag2(this, "message"), itemsCount;
    flagMsg = flagMsg ? flagMsg + ": " : "";
    switch (type(val).toLowerCase()) {
      case "array":
      case "string":
        itemsCount = val.length;
        break;
      case "map":
      case "set":
        itemsCount = val.size;
        break;
      case "weakmap":
      case "weakset":
        throw new AssertionError(
          flagMsg + ".empty was passed a weak collection",
          void 0,
          ssfi
        );
      case "function": {
        const msg = flagMsg + ".empty was passed a function " + getName(val);
        throw new AssertionError(msg.trim(), void 0, ssfi);
      }
      default:
        if (val !== Object(val)) {
          throw new AssertionError(
            flagMsg + ".empty was passed non-string primitive " + inspect2(val),
            void 0,
            ssfi
          );
        }
        itemsCount = Object.keys(val).length;
    }
    this.assert(
      0 === itemsCount,
      "expected #{this} to be empty",
      "expected #{this} not to be empty"
    );
  });
  function checkArguments() {
    let obj = flag2(this, "object"), type3 = type(obj);
    this.assert(
      "Arguments" === type3,
      "expected #{this} to be arguments but got " + type3,
      "expected #{this} to not be arguments"
    );
  }
  __name(checkArguments, "checkArguments");
  Assertion.addProperty("arguments", checkArguments);
  Assertion.addProperty("Arguments", checkArguments);
  function assertEqual(val, msg) {
    if (msg) flag2(this, "message", msg);
    let obj = flag2(this, "object");
    if (flag2(this, "deep")) {
      let prevLockSsfi = flag2(this, "lockSsfi");
      flag2(this, "lockSsfi", true);
      this.eql(val);
      flag2(this, "lockSsfi", prevLockSsfi);
    } else {
      this.assert(
        val === obj,
        "expected #{this} to equal #{exp}",
        "expected #{this} to not equal #{exp}",
        val,
        this._obj,
        true
      );
    }
  }
  __name(assertEqual, "assertEqual");
  Assertion.addMethod("equal", assertEqual);
  Assertion.addMethod("equals", assertEqual);
  Assertion.addMethod("eq", assertEqual);
  function assertEql(obj, msg) {
    if (msg) flag2(this, "message", msg);
    let eql = flag2(this, "eql");
    this.assert(
      eql(obj, flag2(this, "object")),
      "expected #{this} to deeply equal #{exp}",
      "expected #{this} to not deeply equal #{exp}",
      obj,
      this._obj,
      true
    );
  }
  __name(assertEql, "assertEql");
  Assertion.addMethod("eql", assertEql);
  Assertion.addMethod("eqls", assertEql);
  function assertAbove(n, msg) {
    if (msg) flag2(this, "message", msg);
    let obj = flag2(this, "object"), doLength = flag2(this, "doLength"), flagMsg = flag2(this, "message"), msgPrefix = flagMsg ? flagMsg + ": " : "", ssfi = flag2(this, "ssfi"), objType = type(obj).toLowerCase(), nType = type(n).toLowerCase();
    if (doLength && objType !== "map" && objType !== "set") {
      new Assertion(obj, flagMsg, ssfi, true).to.have.property("length");
    }
    if (!doLength && objType === "date" && nType !== "date") {
      throw new AssertionError(
        msgPrefix + "the argument to above must be a date",
        void 0,
        ssfi
      );
    } else if (!isNumeric(n) && (doLength || isNumeric(obj))) {
      throw new AssertionError(
        msgPrefix + "the argument to above must be a number",
        void 0,
        ssfi
      );
    } else if (!doLength && objType !== "date" && !isNumeric(obj)) {
      let printObj = objType === "string" ? "'" + obj + "'" : obj;
      throw new AssertionError(
        msgPrefix + "expected " + printObj + " to be a number or a date",
        void 0,
        ssfi
      );
    }
    if (doLength) {
      let descriptor = "length", itemsCount;
      if (objType === "map" || objType === "set") {
        descriptor = "size";
        itemsCount = obj.size;
      } else {
        itemsCount = obj.length;
      }
      this.assert(
        itemsCount > n,
        "expected #{this} to have a " + descriptor + " above #{exp} but got #{act}",
        "expected #{this} to not have a " + descriptor + " above #{exp}",
        n,
        itemsCount
      );
    } else {
      this.assert(
        obj > n,
        "expected #{this} to be above #{exp}",
        "expected #{this} to be at most #{exp}",
        n
      );
    }
  }
  __name(assertAbove, "assertAbove");
  Assertion.addMethod("above", assertAbove);
  Assertion.addMethod("gt", assertAbove);
  Assertion.addMethod("greaterThan", assertAbove);
  function assertLeast(n, msg) {
    if (msg) flag2(this, "message", msg);
    let obj = flag2(this, "object"), doLength = flag2(this, "doLength"), flagMsg = flag2(this, "message"), msgPrefix = flagMsg ? flagMsg + ": " : "", ssfi = flag2(this, "ssfi"), objType = type(obj).toLowerCase(), nType = type(n).toLowerCase(), errorMessage, shouldThrow = true;
    if (doLength && objType !== "map" && objType !== "set") {
      new Assertion(obj, flagMsg, ssfi, true).to.have.property("length");
    }
    if (!doLength && objType === "date" && nType !== "date") {
      errorMessage = msgPrefix + "the argument to least must be a date";
    } else if (!isNumeric(n) && (doLength || isNumeric(obj))) {
      errorMessage = msgPrefix + "the argument to least must be a number";
    } else if (!doLength && objType !== "date" && !isNumeric(obj)) {
      let printObj = objType === "string" ? "'" + obj + "'" : obj;
      errorMessage = msgPrefix + "expected " + printObj + " to be a number or a date";
    } else {
      shouldThrow = false;
    }
    if (shouldThrow) {
      throw new AssertionError(errorMessage, void 0, ssfi);
    }
    if (doLength) {
      let descriptor = "length", itemsCount;
      if (objType === "map" || objType === "set") {
        descriptor = "size";
        itemsCount = obj.size;
      } else {
        itemsCount = obj.length;
      }
      this.assert(
        itemsCount >= n,
        "expected #{this} to have a " + descriptor + " at least #{exp} but got #{act}",
        "expected #{this} to have a " + descriptor + " below #{exp}",
        n,
        itemsCount
      );
    } else {
      this.assert(
        obj >= n,
        "expected #{this} to be at least #{exp}",
        "expected #{this} to be below #{exp}",
        n
      );
    }
  }
  __name(assertLeast, "assertLeast");
  Assertion.addMethod("least", assertLeast);
  Assertion.addMethod("gte", assertLeast);
  Assertion.addMethod("greaterThanOrEqual", assertLeast);
  function assertBelow(n, msg) {
    if (msg) flag2(this, "message", msg);
    let obj = flag2(this, "object"), doLength = flag2(this, "doLength"), flagMsg = flag2(this, "message"), msgPrefix = flagMsg ? flagMsg + ": " : "", ssfi = flag2(this, "ssfi"), objType = type(obj).toLowerCase(), nType = type(n).toLowerCase(), errorMessage, shouldThrow = true;
    if (doLength && objType !== "map" && objType !== "set") {
      new Assertion(obj, flagMsg, ssfi, true).to.have.property("length");
    }
    if (!doLength && objType === "date" && nType !== "date") {
      errorMessage = msgPrefix + "the argument to below must be a date";
    } else if (!isNumeric(n) && (doLength || isNumeric(obj))) {
      errorMessage = msgPrefix + "the argument to below must be a number";
    } else if (!doLength && objType !== "date" && !isNumeric(obj)) {
      let printObj = objType === "string" ? "'" + obj + "'" : obj;
      errorMessage = msgPrefix + "expected " + printObj + " to be a number or a date";
    } else {
      shouldThrow = false;
    }
    if (shouldThrow) {
      throw new AssertionError(errorMessage, void 0, ssfi);
    }
    if (doLength) {
      let descriptor = "length", itemsCount;
      if (objType === "map" || objType === "set") {
        descriptor = "size";
        itemsCount = obj.size;
      } else {
        itemsCount = obj.length;
      }
      this.assert(
        itemsCount < n,
        "expected #{this} to have a " + descriptor + " below #{exp} but got #{act}",
        "expected #{this} to not have a " + descriptor + " below #{exp}",
        n,
        itemsCount
      );
    } else {
      this.assert(
        obj < n,
        "expected #{this} to be below #{exp}",
        "expected #{this} to be at least #{exp}",
        n
      );
    }
  }
  __name(assertBelow, "assertBelow");
  Assertion.addMethod("below", assertBelow);
  Assertion.addMethod("lt", assertBelow);
  Assertion.addMethod("lessThan", assertBelow);
  function assertMost(n, msg) {
    if (msg) flag2(this, "message", msg);
    let obj = flag2(this, "object"), doLength = flag2(this, "doLength"), flagMsg = flag2(this, "message"), msgPrefix = flagMsg ? flagMsg + ": " : "", ssfi = flag2(this, "ssfi"), objType = type(obj).toLowerCase(), nType = type(n).toLowerCase(), errorMessage, shouldThrow = true;
    if (doLength && objType !== "map" && objType !== "set") {
      new Assertion(obj, flagMsg, ssfi, true).to.have.property("length");
    }
    if (!doLength && objType === "date" && nType !== "date") {
      errorMessage = msgPrefix + "the argument to most must be a date";
    } else if (!isNumeric(n) && (doLength || isNumeric(obj))) {
      errorMessage = msgPrefix + "the argument to most must be a number";
    } else if (!doLength && objType !== "date" && !isNumeric(obj)) {
      let printObj = objType === "string" ? "'" + obj + "'" : obj;
      errorMessage = msgPrefix + "expected " + printObj + " to be a number or a date";
    } else {
      shouldThrow = false;
    }
    if (shouldThrow) {
      throw new AssertionError(errorMessage, void 0, ssfi);
    }
    if (doLength) {
      let descriptor = "length", itemsCount;
      if (objType === "map" || objType === "set") {
        descriptor = "size";
        itemsCount = obj.size;
      } else {
        itemsCount = obj.length;
      }
      this.assert(
        itemsCount <= n,
        "expected #{this} to have a " + descriptor + " at most #{exp} but got #{act}",
        "expected #{this} to have a " + descriptor + " above #{exp}",
        n,
        itemsCount
      );
    } else {
      this.assert(
        obj <= n,
        "expected #{this} to be at most #{exp}",
        "expected #{this} to be above #{exp}",
        n
      );
    }
  }
  __name(assertMost, "assertMost");
  Assertion.addMethod("most", assertMost);
  Assertion.addMethod("lte", assertMost);
  Assertion.addMethod("lessThanOrEqual", assertMost);
  Assertion.addMethod("within", function(start, finish, msg) {
    if (msg) flag2(this, "message", msg);
    let obj = flag2(this, "object"), doLength = flag2(this, "doLength"), flagMsg = flag2(this, "message"), msgPrefix = flagMsg ? flagMsg + ": " : "", ssfi = flag2(this, "ssfi"), objType = type(obj).toLowerCase(), startType = type(start).toLowerCase(), finishType = type(finish).toLowerCase(), errorMessage, shouldThrow = true, range = startType === "date" && finishType === "date" ? start.toISOString() + ".." + finish.toISOString() : start + ".." + finish;
    if (doLength && objType !== "map" && objType !== "set") {
      new Assertion(obj, flagMsg, ssfi, true).to.have.property("length");
    }
    if (!doLength && objType === "date" && (startType !== "date" || finishType !== "date")) {
      errorMessage = msgPrefix + "the arguments to within must be dates";
    } else if ((!isNumeric(start) || !isNumeric(finish)) && (doLength || isNumeric(obj))) {
      errorMessage = msgPrefix + "the arguments to within must be numbers";
    } else if (!doLength && objType !== "date" && !isNumeric(obj)) {
      let printObj = objType === "string" ? "'" + obj + "'" : obj;
      errorMessage = msgPrefix + "expected " + printObj + " to be a number or a date";
    } else {
      shouldThrow = false;
    }
    if (shouldThrow) {
      throw new AssertionError(errorMessage, void 0, ssfi);
    }
    if (doLength) {
      let descriptor = "length", itemsCount;
      if (objType === "map" || objType === "set") {
        descriptor = "size";
        itemsCount = obj.size;
      } else {
        itemsCount = obj.length;
      }
      this.assert(
        itemsCount >= start && itemsCount <= finish,
        "expected #{this} to have a " + descriptor + " within " + range,
        "expected #{this} to not have a " + descriptor + " within " + range
      );
    } else {
      this.assert(
        obj >= start && obj <= finish,
        "expected #{this} to be within " + range,
        "expected #{this} to not be within " + range
      );
    }
  });
  function assertInstanceOf(constructor, msg) {
    if (msg) flag2(this, "message", msg);
    let target = flag2(this, "object");
    let ssfi = flag2(this, "ssfi");
    let flagMsg = flag2(this, "message");
    let isInstanceOf;
    try {
      isInstanceOf = target instanceof constructor;
    } catch (err) {
      if (err instanceof TypeError) {
        flagMsg = flagMsg ? flagMsg + ": " : "";
        throw new AssertionError(
          flagMsg + "The instanceof assertion needs a constructor but " + type(constructor) + " was given.",
          void 0,
          ssfi
        );
      }
      throw err;
    }
    let name = getName(constructor);
    if (name == null) {
      name = "an unnamed constructor";
    }
    this.assert(
      isInstanceOf,
      "expected #{this} to be an instance of " + name,
      "expected #{this} to not be an instance of " + name
    );
  }
  __name(assertInstanceOf, "assertInstanceOf");
  Assertion.addMethod("instanceof", assertInstanceOf);
  Assertion.addMethod("instanceOf", assertInstanceOf);
  function assertProperty(name, val, msg) {
    if (msg) flag2(this, "message", msg);
    let isNested = flag2(this, "nested"), isOwn = flag2(this, "own"), flagMsg = flag2(this, "message"), obj = flag2(this, "object"), ssfi = flag2(this, "ssfi"), nameType = typeof name;
    flagMsg = flagMsg ? flagMsg + ": " : "";
    if (isNested) {
      if (nameType !== "string") {
        throw new AssertionError(
          flagMsg + "the argument to property must be a string when using nested syntax",
          void 0,
          ssfi
        );
      }
    } else {
      if (nameType !== "string" && nameType !== "number" && nameType !== "symbol") {
        throw new AssertionError(
          flagMsg + "the argument to property must be a string, number, or symbol",
          void 0,
          ssfi
        );
      }
    }
    if (isNested && isOwn) {
      throw new AssertionError(
        flagMsg + 'The "nested" and "own" flags cannot be combined.',
        void 0,
        ssfi
      );
    }
    if (obj === null || obj === void 0) {
      throw new AssertionError(
        flagMsg + "Target cannot be null or undefined.",
        void 0,
        ssfi
      );
    }
    let isDeep = flag2(this, "deep"), negate = flag2(this, "negate"), pathInfo = isNested ? getPathInfo(obj, name) : null, value = isNested ? pathInfo.value : obj[name], isEql = isDeep ? flag2(this, "eql") : (val1, val2) => val1 === val2;
    let descriptor = "";
    if (isDeep) descriptor += "deep ";
    if (isOwn) descriptor += "own ";
    if (isNested) descriptor += "nested ";
    descriptor += "property ";
    let hasProperty2;
    if (isOwn) hasProperty2 = Object.prototype.hasOwnProperty.call(obj, name);
    else if (isNested) hasProperty2 = pathInfo.exists;
    else hasProperty2 = hasProperty(obj, name);
    if (!negate || arguments.length === 1) {
      this.assert(
        hasProperty2,
        "expected #{this} to have " + descriptor + inspect2(name),
        "expected #{this} to not have " + descriptor + inspect2(name)
      );
    }
    if (arguments.length > 1) {
      this.assert(
        hasProperty2 && isEql(val, value),
        "expected #{this} to have " + descriptor + inspect2(name) + " of #{exp}, but got #{act}",
        "expected #{this} to not have " + descriptor + inspect2(name) + " of #{act}",
        val,
        value
      );
    }
    flag2(this, "object", value);
  }
  __name(assertProperty, "assertProperty");
  Assertion.addMethod("property", assertProperty);
  function assertOwnProperty(_name, _value, _msg) {
    flag2(this, "own", true);
    assertProperty.apply(this, arguments);
  }
  __name(assertOwnProperty, "assertOwnProperty");
  Assertion.addMethod("ownProperty", assertOwnProperty);
  Assertion.addMethod("haveOwnProperty", assertOwnProperty);
  function assertOwnPropertyDescriptor(name, descriptor, msg) {
    if (typeof descriptor === "string") {
      msg = descriptor;
      descriptor = null;
    }
    if (msg) flag2(this, "message", msg);
    let obj = flag2(this, "object");
    let actualDescriptor = Object.getOwnPropertyDescriptor(Object(obj), name);
    let eql = flag2(this, "eql");
    if (actualDescriptor && descriptor) {
      this.assert(
        eql(descriptor, actualDescriptor),
        "expected the own property descriptor for " + inspect2(name) + " on #{this} to match " + inspect2(descriptor) + ", got " + inspect2(actualDescriptor),
        "expected the own property descriptor for " + inspect2(name) + " on #{this} to not match " + inspect2(descriptor),
        descriptor,
        actualDescriptor,
        true
      );
    } else {
      this.assert(
        actualDescriptor,
        "expected #{this} to have an own property descriptor for " + inspect2(name),
        "expected #{this} to not have an own property descriptor for " + inspect2(name)
      );
    }
    flag2(this, "object", actualDescriptor);
  }
  __name(assertOwnPropertyDescriptor, "assertOwnPropertyDescriptor");
  Assertion.addMethod("ownPropertyDescriptor", assertOwnPropertyDescriptor);
  Assertion.addMethod("haveOwnPropertyDescriptor", assertOwnPropertyDescriptor);
  function assertLengthChain() {
    flag2(this, "doLength", true);
  }
  __name(assertLengthChain, "assertLengthChain");
  function assertLength(n, msg) {
    if (msg) flag2(this, "message", msg);
    let obj = flag2(this, "object"), objType = type(obj).toLowerCase(), flagMsg = flag2(this, "message"), ssfi = flag2(this, "ssfi"), descriptor = "length", itemsCount;
    switch (objType) {
      case "map":
      case "set":
        descriptor = "size";
        itemsCount = obj.size;
        break;
      default:
        new Assertion(obj, flagMsg, ssfi, true).to.have.property("length");
        itemsCount = obj.length;
    }
    this.assert(
      itemsCount == n,
      "expected #{this} to have a " + descriptor + " of #{exp} but got #{act}",
      "expected #{this} to not have a " + descriptor + " of #{act}",
      n,
      itemsCount
    );
  }
  __name(assertLength, "assertLength");
  Assertion.addChainableMethod("length", assertLength, assertLengthChain);
  Assertion.addChainableMethod("lengthOf", assertLength, assertLengthChain);
  function assertMatch(re, msg) {
    if (msg) flag2(this, "message", msg);
    let obj = flag2(this, "object");
    this.assert(
      re.exec(obj),
      "expected #{this} to match " + re,
      "expected #{this} not to match " + re
    );
  }
  __name(assertMatch, "assertMatch");
  Assertion.addMethod("match", assertMatch);
  Assertion.addMethod("matches", assertMatch);
  Assertion.addMethod("string", function(str, msg) {
    if (msg) flag2(this, "message", msg);
    let obj = flag2(this, "object"), flagMsg = flag2(this, "message"), ssfi = flag2(this, "ssfi");
    new Assertion(obj, flagMsg, ssfi, true).is.a("string");
    this.assert(
      ~obj.indexOf(str),
      "expected #{this} to contain " + inspect2(str),
      "expected #{this} to not contain " + inspect2(str)
    );
  });
  function assertKeys(keys) {
    let obj = flag2(this, "object"), objType = type(obj), keysType = type(keys), ssfi = flag2(this, "ssfi"), isDeep = flag2(this, "deep"), str, deepStr = "", actual, ok = true, flagMsg = flag2(this, "message");
    flagMsg = flagMsg ? flagMsg + ": " : "";
    let mixedArgsMsg = flagMsg + "when testing keys against an object or an array you must give a single Array|Object|String argument or multiple String arguments";
    if (objType === "Map" || objType === "Set") {
      deepStr = isDeep ? "deeply " : "";
      actual = [];
      obj.forEach(function(val, key) {
        actual.push(key);
      });
      if (keysType !== "Array") {
        keys = Array.prototype.slice.call(arguments);
      }
    } else {
      actual = getOwnEnumerableProperties(obj);
      switch (keysType) {
        case "Array":
          if (arguments.length > 1) {
            throw new AssertionError(mixedArgsMsg, void 0, ssfi);
          }
          break;
        case "Object":
          if (arguments.length > 1) {
            throw new AssertionError(mixedArgsMsg, void 0, ssfi);
          }
          keys = Object.keys(keys);
          break;
        default:
          keys = Array.prototype.slice.call(arguments);
      }
      keys = keys.map(function(val) {
        return typeof val === "symbol" ? val : String(val);
      });
    }
    if (!keys.length) {
      throw new AssertionError(flagMsg + "keys required", void 0, ssfi);
    }
    let len = keys.length, any = flag2(this, "any"), all = flag2(this, "all"), expected = keys, isEql = isDeep ? flag2(this, "eql") : (val1, val2) => val1 === val2;
    if (!any && !all) {
      all = true;
    }
    if (any) {
      ok = expected.some(function(expectedKey) {
        return actual.some(function(actualKey) {
          return isEql(expectedKey, actualKey);
        });
      });
    }
    if (all) {
      ok = expected.every(function(expectedKey) {
        return actual.some(function(actualKey) {
          return isEql(expectedKey, actualKey);
        });
      });
      if (!flag2(this, "contains")) {
        ok = ok && keys.length == actual.length;
      }
    }
    if (len > 1) {
      keys = keys.map(function(key) {
        return inspect2(key);
      });
      let last = keys.pop();
      if (all) {
        str = keys.join(", ") + ", and " + last;
      }
      if (any) {
        str = keys.join(", ") + ", or " + last;
      }
    } else {
      str = inspect2(keys[0]);
    }
    str = (len > 1 ? "keys " : "key ") + str;
    str = (flag2(this, "contains") ? "contain " : "have ") + str;
    this.assert(
      ok,
      "expected #{this} to " + deepStr + str,
      "expected #{this} to not " + deepStr + str,
      expected.slice(0).sort(compareByInspect),
      actual.sort(compareByInspect),
      true
    );
  }
  __name(assertKeys, "assertKeys");
  Assertion.addMethod("keys", assertKeys);
  Assertion.addMethod("key", assertKeys);
  function assertThrows(errorLike, errMsgMatcher, msg) {
    if (msg) flag2(this, "message", msg);
    let obj = flag2(this, "object"), ssfi = flag2(this, "ssfi"), flagMsg = flag2(this, "message"), negate = flag2(this, "negate") || false;
    new Assertion(obj, flagMsg, ssfi, true).is.a("function");
    if (isRegExp2(errorLike) || typeof errorLike === "string") {
      errMsgMatcher = errorLike;
      errorLike = null;
    }
    let caughtErr;
    let errorWasThrown = false;
    try {
      obj();
    } catch (err) {
      errorWasThrown = true;
      caughtErr = err;
    }
    let everyArgIsUndefined = errorLike === void 0 && errMsgMatcher === void 0;
    let everyArgIsDefined = Boolean(errorLike && errMsgMatcher);
    let errorLikeFail = false;
    let errMsgMatcherFail = false;
    if (everyArgIsUndefined || !everyArgIsUndefined && !negate) {
      let errorLikeString = "an error";
      if (errorLike instanceof Error) {
        errorLikeString = "#{exp}";
      } else if (errorLike) {
        errorLikeString = check_error_exports.getConstructorName(errorLike);
      }
      let actual = caughtErr;
      if (caughtErr instanceof Error) {
        actual = caughtErr.toString();
      } else if (typeof caughtErr === "string") {
        actual = caughtErr;
      } else if (caughtErr && (typeof caughtErr === "object" || typeof caughtErr === "function")) {
        try {
          actual = check_error_exports.getConstructorName(caughtErr);
        } catch (_err) {
        }
      }
      this.assert(
        errorWasThrown,
        "expected #{this} to throw " + errorLikeString,
        "expected #{this} to not throw an error but #{act} was thrown",
        errorLike && errorLike.toString(),
        actual
      );
    }
    if (errorLike && caughtErr) {
      if (errorLike instanceof Error) {
        let isCompatibleInstance = check_error_exports.compatibleInstance(
          caughtErr,
          errorLike
        );
        if (isCompatibleInstance === negate) {
          if (everyArgIsDefined && negate) {
            errorLikeFail = true;
          } else {
            this.assert(
              negate,
              "expected #{this} to throw #{exp} but #{act} was thrown",
              "expected #{this} to not throw #{exp}" + (caughtErr && !negate ? " but #{act} was thrown" : ""),
              errorLike.toString(),
              caughtErr.toString()
            );
          }
        }
      }
      let isCompatibleConstructor = check_error_exports.compatibleConstructor(
        caughtErr,
        errorLike
      );
      if (isCompatibleConstructor === negate) {
        if (everyArgIsDefined && negate) {
          errorLikeFail = true;
        } else {
          this.assert(
            negate,
            "expected #{this} to throw #{exp} but #{act} was thrown",
            "expected #{this} to not throw #{exp}" + (caughtErr ? " but #{act} was thrown" : ""),
            errorLike instanceof Error ? errorLike.toString() : errorLike && check_error_exports.getConstructorName(errorLike),
            caughtErr instanceof Error ? caughtErr.toString() : caughtErr && check_error_exports.getConstructorName(caughtErr)
          );
        }
      }
    }
    if (caughtErr && errMsgMatcher !== void 0 && errMsgMatcher !== null) {
      let placeholder = "including";
      if (isRegExp2(errMsgMatcher)) {
        placeholder = "matching";
      }
      let isCompatibleMessage = check_error_exports.compatibleMessage(
        caughtErr,
        errMsgMatcher
      );
      if (isCompatibleMessage === negate) {
        if (everyArgIsDefined && negate) {
          errMsgMatcherFail = true;
        } else {
          this.assert(
            negate,
            "expected #{this} to throw error " + placeholder + " #{exp} but got #{act}",
            "expected #{this} to throw error not " + placeholder + " #{exp}",
            errMsgMatcher,
            check_error_exports.getMessage(caughtErr)
          );
        }
      }
    }
    if (errorLikeFail && errMsgMatcherFail) {
      this.assert(
        negate,
        "expected #{this} to throw #{exp} but #{act} was thrown",
        "expected #{this} to not throw #{exp}" + (caughtErr ? " but #{act} was thrown" : ""),
        errorLike instanceof Error ? errorLike.toString() : errorLike && check_error_exports.getConstructorName(errorLike),
        caughtErr instanceof Error ? caughtErr.toString() : caughtErr && check_error_exports.getConstructorName(caughtErr)
      );
    }
    flag2(this, "object", caughtErr);
  }
  __name(assertThrows, "assertThrows");
  Assertion.addMethod("throw", assertThrows);
  Assertion.addMethod("throws", assertThrows);
  Assertion.addMethod("Throw", assertThrows);
  function respondTo(method, msg) {
    if (msg) flag2(this, "message", msg);
    let obj = flag2(this, "object"), itself = flag2(this, "itself"), context = "function" === typeof obj && !itself ? obj.prototype[method] : obj[method];
    this.assert(
      "function" === typeof context,
      "expected #{this} to respond to " + inspect2(method),
      "expected #{this} to not respond to " + inspect2(method)
    );
  }
  __name(respondTo, "respondTo");
  Assertion.addMethod("respondTo", respondTo);
  Assertion.addMethod("respondsTo", respondTo);
  Assertion.addProperty("itself", function() {
    flag2(this, "itself", true);
  });
  function satisfy(matcher, msg) {
    if (msg) flag2(this, "message", msg);
    let obj = flag2(this, "object");
    let result = matcher(obj);
    this.assert(
      result,
      "expected #{this} to satisfy " + objDisplay(matcher),
      "expected #{this} to not satisfy" + objDisplay(matcher),
      flag2(this, "negate") ? false : true,
      result
    );
  }
  __name(satisfy, "satisfy");
  Assertion.addMethod("satisfy", satisfy);
  Assertion.addMethod("satisfies", satisfy);
  function closeTo(expected, delta, msg) {
    if (msg) flag2(this, "message", msg);
    let obj = flag2(this, "object"), flagMsg = flag2(this, "message"), ssfi = flag2(this, "ssfi");
    new Assertion(obj, flagMsg, ssfi, true).is.numeric;
    let message = "A `delta` value is required for `closeTo`";
    if (delta == void 0) {
      throw new AssertionError(
        flagMsg ? `${flagMsg}: ${message}` : message,
        void 0,
        ssfi
      );
    }
    new Assertion(delta, flagMsg, ssfi, true).is.numeric;
    message = "A `expected` value is required for `closeTo`";
    if (expected == void 0) {
      throw new AssertionError(
        flagMsg ? `${flagMsg}: ${message}` : message,
        void 0,
        ssfi
      );
    }
    new Assertion(expected, flagMsg, ssfi, true).is.numeric;
    const abs = /* @__PURE__ */ __name((x) => x < 0n ? -x : x, "abs");
    const strip = /* @__PURE__ */ __name((number) => parseFloat(parseFloat(number).toPrecision(12)), "strip");
    this.assert(
      strip(abs(obj - expected)) <= delta,
      "expected #{this} to be close to " + expected + " +/- " + delta,
      "expected #{this} not to be close to " + expected + " +/- " + delta
    );
  }
  __name(closeTo, "closeTo");
  Assertion.addMethod("closeTo", closeTo);
  Assertion.addMethod("approximately", closeTo);
  function isSubsetOf(_subset, _superset, cmp, contains, ordered) {
    let superset = Array.from(_superset);
    let subset = Array.from(_subset);
    if (!contains) {
      if (subset.length !== superset.length) return false;
      superset = superset.slice();
    }
    return subset.every(function(elem, idx) {
      if (ordered) return cmp ? cmp(elem, superset[idx]) : elem === superset[idx];
      if (!cmp) {
        let matchIdx = superset.indexOf(elem);
        if (matchIdx === -1) return false;
        if (!contains) superset.splice(matchIdx, 1);
        return true;
      }
      return superset.some(function(elem2, matchIdx) {
        if (!cmp(elem, elem2)) return false;
        if (!contains) superset.splice(matchIdx, 1);
        return true;
      });
    });
  }
  __name(isSubsetOf, "isSubsetOf");
  Assertion.addMethod("members", function(subset, msg) {
    if (msg) flag2(this, "message", msg);
    let obj = flag2(this, "object"), flagMsg = flag2(this, "message"), ssfi = flag2(this, "ssfi");
    new Assertion(obj, flagMsg, ssfi, true).to.be.iterable;
    new Assertion(subset, flagMsg, ssfi, true).to.be.iterable;
    let contains = flag2(this, "contains");
    let ordered = flag2(this, "ordered");
    let subject, failMsg, failNegateMsg;
    if (contains) {
      subject = ordered ? "an ordered superset" : "a superset";
      failMsg = "expected #{this} to be " + subject + " of #{exp}";
      failNegateMsg = "expected #{this} to not be " + subject + " of #{exp}";
    } else {
      subject = ordered ? "ordered members" : "members";
      failMsg = "expected #{this} to have the same " + subject + " as #{exp}";
      failNegateMsg = "expected #{this} to not have the same " + subject + " as #{exp}";
    }
    let cmp = flag2(this, "deep") ? flag2(this, "eql") : void 0;
    this.assert(
      isSubsetOf(subset, obj, cmp, contains, ordered),
      failMsg,
      failNegateMsg,
      subset,
      obj,
      true
    );
  });
  Assertion.addProperty("iterable", function(msg) {
    if (msg) flag2(this, "message", msg);
    let obj = flag2(this, "object");
    this.assert(
      obj != void 0 && obj[Symbol.iterator],
      "expected #{this} to be an iterable",
      "expected #{this} to not be an iterable",
      obj
    );
  });
  function oneOf(list, msg) {
    if (msg) flag2(this, "message", msg);
    let expected = flag2(this, "object"), flagMsg = flag2(this, "message"), ssfi = flag2(this, "ssfi"), contains = flag2(this, "contains"), isDeep = flag2(this, "deep"), eql = flag2(this, "eql");
    new Assertion(list, flagMsg, ssfi, true).to.be.an("array");
    if (contains) {
      this.assert(
        list.some(function(possibility) {
          return expected.indexOf(possibility) > -1;
        }),
        "expected #{this} to contain one of #{exp}",
        "expected #{this} to not contain one of #{exp}",
        list,
        expected
      );
    } else {
      if (isDeep) {
        this.assert(
          list.some(function(possibility) {
            return eql(expected, possibility);
          }),
          "expected #{this} to deeply equal one of #{exp}",
          "expected #{this} to deeply equal one of #{exp}",
          list,
          expected
        );
      } else {
        this.assert(
          list.indexOf(expected) > -1,
          "expected #{this} to be one of #{exp}",
          "expected #{this} to not be one of #{exp}",
          list,
          expected
        );
      }
    }
  }
  __name(oneOf, "oneOf");
  Assertion.addMethod("oneOf", oneOf);
  function assertChanges(subject, prop, msg) {
    if (msg) flag2(this, "message", msg);
    let fn = flag2(this, "object"), flagMsg = flag2(this, "message"), ssfi = flag2(this, "ssfi");
    new Assertion(fn, flagMsg, ssfi, true).is.a("function");
    let initial;
    if (!prop) {
      new Assertion(subject, flagMsg, ssfi, true).is.a("function");
      initial = subject();
    } else {
      new Assertion(subject, flagMsg, ssfi, true).to.have.property(prop);
      initial = subject[prop];
    }
    fn();
    let final = prop === void 0 || prop === null ? subject() : subject[prop];
    let msgObj = prop === void 0 || prop === null ? initial : "." + prop;
    flag2(this, "deltaMsgObj", msgObj);
    flag2(this, "initialDeltaValue", initial);
    flag2(this, "finalDeltaValue", final);
    flag2(this, "deltaBehavior", "change");
    flag2(this, "realDelta", final !== initial);
    this.assert(
      initial !== final,
      "expected " + msgObj + " to change",
      "expected " + msgObj + " to not change"
    );
  }
  __name(assertChanges, "assertChanges");
  Assertion.addMethod("change", assertChanges);
  Assertion.addMethod("changes", assertChanges);
  function assertIncreases(subject, prop, msg) {
    if (msg) flag2(this, "message", msg);
    let fn = flag2(this, "object"), flagMsg = flag2(this, "message"), ssfi = flag2(this, "ssfi");
    new Assertion(fn, flagMsg, ssfi, true).is.a("function");
    let initial;
    if (!prop) {
      new Assertion(subject, flagMsg, ssfi, true).is.a("function");
      initial = subject();
    } else {
      new Assertion(subject, flagMsg, ssfi, true).to.have.property(prop);
      initial = subject[prop];
    }
    new Assertion(initial, flagMsg, ssfi, true).is.a("number");
    fn();
    let final = prop === void 0 || prop === null ? subject() : subject[prop];
    let msgObj = prop === void 0 || prop === null ? initial : "." + prop;
    flag2(this, "deltaMsgObj", msgObj);
    flag2(this, "initialDeltaValue", initial);
    flag2(this, "finalDeltaValue", final);
    flag2(this, "deltaBehavior", "increase");
    flag2(this, "realDelta", final - initial);
    this.assert(
      final - initial > 0,
      "expected " + msgObj + " to increase",
      "expected " + msgObj + " to not increase"
    );
  }
  __name(assertIncreases, "assertIncreases");
  Assertion.addMethod("increase", assertIncreases);
  Assertion.addMethod("increases", assertIncreases);
  function assertDecreases(subject, prop, msg) {
    if (msg) flag2(this, "message", msg);
    let fn = flag2(this, "object"), flagMsg = flag2(this, "message"), ssfi = flag2(this, "ssfi");
    new Assertion(fn, flagMsg, ssfi, true).is.a("function");
    let initial;
    if (!prop) {
      new Assertion(subject, flagMsg, ssfi, true).is.a("function");
      initial = subject();
    } else {
      new Assertion(subject, flagMsg, ssfi, true).to.have.property(prop);
      initial = subject[prop];
    }
    new Assertion(initial, flagMsg, ssfi, true).is.a("number");
    fn();
    let final = prop === void 0 || prop === null ? subject() : subject[prop];
    let msgObj = prop === void 0 || prop === null ? initial : "." + prop;
    flag2(this, "deltaMsgObj", msgObj);
    flag2(this, "initialDeltaValue", initial);
    flag2(this, "finalDeltaValue", final);
    flag2(this, "deltaBehavior", "decrease");
    flag2(this, "realDelta", initial - final);
    this.assert(
      final - initial < 0,
      "expected " + msgObj + " to decrease",
      "expected " + msgObj + " to not decrease"
    );
  }
  __name(assertDecreases, "assertDecreases");
  Assertion.addMethod("decrease", assertDecreases);
  Assertion.addMethod("decreases", assertDecreases);
  function assertDelta(delta, msg) {
    if (msg) flag2(this, "message", msg);
    let msgObj = flag2(this, "deltaMsgObj");
    let initial = flag2(this, "initialDeltaValue");
    let final = flag2(this, "finalDeltaValue");
    let behavior = flag2(this, "deltaBehavior");
    let realDelta = flag2(this, "realDelta");
    let expression;
    if (behavior === "change") {
      expression = Math.abs(final - initial) === Math.abs(delta);
    } else {
      expression = realDelta === Math.abs(delta);
    }
    this.assert(
      expression,
      "expected " + msgObj + " to " + behavior + " by " + delta,
      "expected " + msgObj + " to not " + behavior + " by " + delta
    );
  }
  __name(assertDelta, "assertDelta");
  Assertion.addMethod("by", assertDelta);
  Assertion.addProperty("extensible", function() {
    let obj = flag2(this, "object");
    let isExtensible = obj === Object(obj) && Object.isExtensible(obj);
    this.assert(
      isExtensible,
      "expected #{this} to be extensible",
      "expected #{this} to not be extensible"
    );
  });
  Assertion.addProperty("sealed", function() {
    let obj = flag2(this, "object");
    let isSealed = obj === Object(obj) ? Object.isSealed(obj) : true;
    this.assert(
      isSealed,
      "expected #{this} to be sealed",
      "expected #{this} to not be sealed"
    );
  });
  Assertion.addProperty("frozen", function() {
    let obj = flag2(this, "object");
    let isFrozen = obj === Object(obj) ? Object.isFrozen(obj) : true;
    this.assert(
      isFrozen,
      "expected #{this} to be frozen",
      "expected #{this} to not be frozen"
    );
  });
  Assertion.addProperty("finite", function(_msg) {
    let obj = flag2(this, "object");
    this.assert(
      typeof obj === "number" && isFinite(obj),
      "expected #{this} to be a finite number",
      "expected #{this} to not be a finite number"
    );
  });
  function compareSubset(expected, actual) {
    if (expected === actual) {
      return true;
    }
    if (typeof actual !== typeof expected) {
      return false;
    }
    if (typeof expected !== "object" || expected === null) {
      return expected === actual;
    }
    if (!actual) {
      return false;
    }
    if (Array.isArray(expected)) {
      if (!Array.isArray(actual)) {
        return false;
      }
      return expected.every(function(exp) {
        return actual.some(function(act) {
          return compareSubset(exp, act);
        });
      });
    }
    if (expected instanceof Date) {
      if (actual instanceof Date) {
        return expected.getTime() === actual.getTime();
      } else {
        return false;
      }
    }
    return Object.keys(expected).every(function(key) {
      let expectedValue = expected[key];
      let actualValue = actual[key];
      if (typeof expectedValue === "object" && expectedValue !== null && actualValue !== null) {
        return compareSubset(expectedValue, actualValue);
      }
      if (typeof expectedValue === "function") {
        return expectedValue(actualValue);
      }
      return actualValue === expectedValue;
    });
  }
  __name(compareSubset, "compareSubset");
  Assertion.addMethod("containSubset", function(expected) {
    const actual = flag(this, "object");
    const showDiff = config.showDiff;
    this.assert(
      compareSubset(expected, actual),
      "expected #{act} to contain subset #{exp}",
      "expected #{act} to not contain subset #{exp}",
      expected,
      actual,
      showDiff
    );
  });
  function expect(val, message) {
    return new Assertion(val, message);
  }
  __name(expect, "expect");
  expect.fail = function(actual, expected, message, operator) {
    if (arguments.length < 2) {
      message = actual;
      actual = void 0;
    }
    message = message || "expect.fail()";
    throw new AssertionError(
      message,
      {
        actual,
        expected,
        operator
      },
      expect.fail
    );
  };
  var should_exports = {};
  __export2(should_exports, {
    Should: () => Should,
    should: () => should
  });
  function loadShould() {
    function shouldGetter() {
      if (this instanceof String || this instanceof Number || this instanceof Boolean || typeof Symbol === "function" && this instanceof Symbol || typeof BigInt === "function" && this instanceof BigInt) {
        return new Assertion(this.valueOf(), null, shouldGetter);
      }
      return new Assertion(this, null, shouldGetter);
    }
    __name(shouldGetter, "shouldGetter");
    function shouldSetter(value) {
      Object.defineProperty(this, "should", {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    }
    __name(shouldSetter, "shouldSetter");
    Object.defineProperty(Object.prototype, "should", {
      set: shouldSetter,
      get: shouldGetter,
      configurable: true
    });
    let should2 = {};
    should2.fail = function(actual, expected, message, operator) {
      if (arguments.length < 2) {
        message = actual;
        actual = void 0;
      }
      message = message || "should.fail()";
      throw new AssertionError(
        message,
        {
          actual,
          expected,
          operator
        },
        should2.fail
      );
    };
    should2.equal = function(actual, expected, message) {
      new Assertion(actual, message).to.equal(expected);
    };
    should2.Throw = function(fn, errt, errs, msg) {
      new Assertion(fn, msg).to.Throw(errt, errs);
    };
    should2.exist = function(val, msg) {
      new Assertion(val, msg).to.exist;
    };
    should2.not = {};
    should2.not.equal = function(actual, expected, msg) {
      new Assertion(actual, msg).to.not.equal(expected);
    };
    should2.not.Throw = function(fn, errt, errs, msg) {
      new Assertion(fn, msg).to.not.Throw(errt, errs);
    };
    should2.not.exist = function(val, msg) {
      new Assertion(val, msg).to.not.exist;
    };
    should2["throw"] = should2["Throw"];
    should2.not["throw"] = should2.not["Throw"];
    return should2;
  }
  __name(loadShould, "loadShould");
  var should = loadShould;
  var Should = loadShould;
  function assert(express, errmsg) {
    let test2 = new Assertion(null, null, assert, true);
    test2.assert(express, errmsg, "[ negation message unavailable ]");
  }
  __name(assert, "assert");
  assert.fail = function(actual, expected, message, operator) {
    if (arguments.length < 2) {
      message = actual;
      actual = void 0;
    }
    message = message || "assert.fail()";
    throw new AssertionError(
      message,
      {
        actual,
        expected,
        operator
      },
      assert.fail
    );
  };
  assert.isOk = function(val, msg) {
    new Assertion(val, msg, assert.isOk, true).is.ok;
  };
  assert.isNotOk = function(val, msg) {
    new Assertion(val, msg, assert.isNotOk, true).is.not.ok;
  };
  assert.equal = function(act, exp, msg) {
    let test2 = new Assertion(act, msg, assert.equal, true);
    test2.assert(
      exp == flag(test2, "object"),
      "expected #{this} to equal #{exp}",
      "expected #{this} to not equal #{act}",
      exp,
      act,
      true
    );
  };
  assert.notEqual = function(act, exp, msg) {
    let test2 = new Assertion(act, msg, assert.notEqual, true);
    test2.assert(
      exp != flag(test2, "object"),
      "expected #{this} to not equal #{exp}",
      "expected #{this} to equal #{act}",
      exp,
      act,
      true
    );
  };
  assert.strictEqual = function(act, exp, msg) {
    new Assertion(act, msg, assert.strictEqual, true).to.equal(exp);
  };
  assert.notStrictEqual = function(act, exp, msg) {
    new Assertion(act, msg, assert.notStrictEqual, true).to.not.equal(exp);
  };
  assert.deepEqual = assert.deepStrictEqual = function(act, exp, msg) {
    new Assertion(act, msg, assert.deepEqual, true).to.eql(exp);
  };
  assert.notDeepEqual = function(act, exp, msg) {
    new Assertion(act, msg, assert.notDeepEqual, true).to.not.eql(exp);
  };
  assert.isAbove = function(val, abv, msg) {
    new Assertion(val, msg, assert.isAbove, true).to.be.above(abv);
  };
  assert.isAtLeast = function(val, atlst, msg) {
    new Assertion(val, msg, assert.isAtLeast, true).to.be.least(atlst);
  };
  assert.isBelow = function(val, blw, msg) {
    new Assertion(val, msg, assert.isBelow, true).to.be.below(blw);
  };
  assert.isAtMost = function(val, atmst, msg) {
    new Assertion(val, msg, assert.isAtMost, true).to.be.most(atmst);
  };
  assert.isTrue = function(val, msg) {
    new Assertion(val, msg, assert.isTrue, true).is["true"];
  };
  assert.isNotTrue = function(val, msg) {
    new Assertion(val, msg, assert.isNotTrue, true).to.not.equal(true);
  };
  assert.isFalse = function(val, msg) {
    new Assertion(val, msg, assert.isFalse, true).is["false"];
  };
  assert.isNotFalse = function(val, msg) {
    new Assertion(val, msg, assert.isNotFalse, true).to.not.equal(false);
  };
  assert.isNull = function(val, msg) {
    new Assertion(val, msg, assert.isNull, true).to.equal(null);
  };
  assert.isNotNull = function(val, msg) {
    new Assertion(val, msg, assert.isNotNull, true).to.not.equal(null);
  };
  assert.isNaN = function(val, msg) {
    new Assertion(val, msg, assert.isNaN, true).to.be.NaN;
  };
  assert.isNotNaN = function(value, message) {
    new Assertion(value, message, assert.isNotNaN, true).not.to.be.NaN;
  };
  assert.exists = function(val, msg) {
    new Assertion(val, msg, assert.exists, true).to.exist;
  };
  assert.notExists = function(val, msg) {
    new Assertion(val, msg, assert.notExists, true).to.not.exist;
  };
  assert.isUndefined = function(val, msg) {
    new Assertion(val, msg, assert.isUndefined, true).to.equal(void 0);
  };
  assert.isDefined = function(val, msg) {
    new Assertion(val, msg, assert.isDefined, true).to.not.equal(void 0);
  };
  assert.isCallable = function(value, message) {
    new Assertion(value, message, assert.isCallable, true).is.callable;
  };
  assert.isNotCallable = function(value, message) {
    new Assertion(value, message, assert.isNotCallable, true).is.not.callable;
  };
  assert.isObject = function(val, msg) {
    new Assertion(val, msg, assert.isObject, true).to.be.a("object");
  };
  assert.isNotObject = function(val, msg) {
    new Assertion(val, msg, assert.isNotObject, true).to.not.be.a("object");
  };
  assert.isArray = function(val, msg) {
    new Assertion(val, msg, assert.isArray, true).to.be.an("array");
  };
  assert.isNotArray = function(val, msg) {
    new Assertion(val, msg, assert.isNotArray, true).to.not.be.an("array");
  };
  assert.isString = function(val, msg) {
    new Assertion(val, msg, assert.isString, true).to.be.a("string");
  };
  assert.isNotString = function(val, msg) {
    new Assertion(val, msg, assert.isNotString, true).to.not.be.a("string");
  };
  assert.isNumber = function(val, msg) {
    new Assertion(val, msg, assert.isNumber, true).to.be.a("number");
  };
  assert.isNotNumber = function(val, msg) {
    new Assertion(val, msg, assert.isNotNumber, true).to.not.be.a("number");
  };
  assert.isNumeric = function(val, msg) {
    new Assertion(val, msg, assert.isNumeric, true).is.numeric;
  };
  assert.isNotNumeric = function(val, msg) {
    new Assertion(val, msg, assert.isNotNumeric, true).is.not.numeric;
  };
  assert.isFinite = function(val, msg) {
    new Assertion(val, msg, assert.isFinite, true).to.be.finite;
  };
  assert.isBoolean = function(val, msg) {
    new Assertion(val, msg, assert.isBoolean, true).to.be.a("boolean");
  };
  assert.isNotBoolean = function(val, msg) {
    new Assertion(val, msg, assert.isNotBoolean, true).to.not.be.a("boolean");
  };
  assert.typeOf = function(val, type3, msg) {
    new Assertion(val, msg, assert.typeOf, true).to.be.a(type3);
  };
  assert.notTypeOf = function(value, type3, message) {
    new Assertion(value, message, assert.notTypeOf, true).to.not.be.a(type3);
  };
  assert.instanceOf = function(val, type3, msg) {
    new Assertion(val, msg, assert.instanceOf, true).to.be.instanceOf(type3);
  };
  assert.notInstanceOf = function(val, type3, msg) {
    new Assertion(val, msg, assert.notInstanceOf, true).to.not.be.instanceOf(
      type3
    );
  };
  assert.include = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.include, true).include(inc);
  };
  assert.notInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.notInclude, true).not.include(inc);
  };
  assert.deepInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.deepInclude, true).deep.include(inc);
  };
  assert.notDeepInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.notDeepInclude, true).not.deep.include(inc);
  };
  assert.nestedInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.nestedInclude, true).nested.include(inc);
  };
  assert.notNestedInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.notNestedInclude, true).not.nested.include(
      inc
    );
  };
  assert.deepNestedInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.deepNestedInclude, true).deep.nested.include(
      inc
    );
  };
  assert.notDeepNestedInclude = function(exp, inc, msg) {
    new Assertion(
      exp,
      msg,
      assert.notDeepNestedInclude,
      true
    ).not.deep.nested.include(inc);
  };
  assert.ownInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.ownInclude, true).own.include(inc);
  };
  assert.notOwnInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.notOwnInclude, true).not.own.include(inc);
  };
  assert.deepOwnInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.deepOwnInclude, true).deep.own.include(inc);
  };
  assert.notDeepOwnInclude = function(exp, inc, msg) {
    new Assertion(exp, msg, assert.notDeepOwnInclude, true).not.deep.own.include(
      inc
    );
  };
  assert.match = function(exp, re, msg) {
    new Assertion(exp, msg, assert.match, true).to.match(re);
  };
  assert.notMatch = function(exp, re, msg) {
    new Assertion(exp, msg, assert.notMatch, true).to.not.match(re);
  };
  assert.property = function(obj, prop, msg) {
    new Assertion(obj, msg, assert.property, true).to.have.property(prop);
  };
  assert.notProperty = function(obj, prop, msg) {
    new Assertion(obj, msg, assert.notProperty, true).to.not.have.property(prop);
  };
  assert.propertyVal = function(obj, prop, val, msg) {
    new Assertion(obj, msg, assert.propertyVal, true).to.have.property(prop, val);
  };
  assert.notPropertyVal = function(obj, prop, val, msg) {
    new Assertion(obj, msg, assert.notPropertyVal, true).to.not.have.property(
      prop,
      val
    );
  };
  assert.deepPropertyVal = function(obj, prop, val, msg) {
    new Assertion(obj, msg, assert.deepPropertyVal, true).to.have.deep.property(
      prop,
      val
    );
  };
  assert.notDeepPropertyVal = function(obj, prop, val, msg) {
    new Assertion(
      obj,
      msg,
      assert.notDeepPropertyVal,
      true
    ).to.not.have.deep.property(prop, val);
  };
  assert.ownProperty = function(obj, prop, msg) {
    new Assertion(obj, msg, assert.ownProperty, true).to.have.own.property(prop);
  };
  assert.notOwnProperty = function(obj, prop, msg) {
    new Assertion(obj, msg, assert.notOwnProperty, true).to.not.have.own.property(
      prop
    );
  };
  assert.ownPropertyVal = function(obj, prop, value, msg) {
    new Assertion(obj, msg, assert.ownPropertyVal, true).to.have.own.property(
      prop,
      value
    );
  };
  assert.notOwnPropertyVal = function(obj, prop, value, msg) {
    new Assertion(
      obj,
      msg,
      assert.notOwnPropertyVal,
      true
    ).to.not.have.own.property(prop, value);
  };
  assert.deepOwnPropertyVal = function(obj, prop, value, msg) {
    new Assertion(
      obj,
      msg,
      assert.deepOwnPropertyVal,
      true
    ).to.have.deep.own.property(prop, value);
  };
  assert.notDeepOwnPropertyVal = function(obj, prop, value, msg) {
    new Assertion(
      obj,
      msg,
      assert.notDeepOwnPropertyVal,
      true
    ).to.not.have.deep.own.property(prop, value);
  };
  assert.nestedProperty = function(obj, prop, msg) {
    new Assertion(obj, msg, assert.nestedProperty, true).to.have.nested.property(
      prop
    );
  };
  assert.notNestedProperty = function(obj, prop, msg) {
    new Assertion(
      obj,
      msg,
      assert.notNestedProperty,
      true
    ).to.not.have.nested.property(prop);
  };
  assert.nestedPropertyVal = function(obj, prop, val, msg) {
    new Assertion(
      obj,
      msg,
      assert.nestedPropertyVal,
      true
    ).to.have.nested.property(prop, val);
  };
  assert.notNestedPropertyVal = function(obj, prop, val, msg) {
    new Assertion(
      obj,
      msg,
      assert.notNestedPropertyVal,
      true
    ).to.not.have.nested.property(prop, val);
  };
  assert.deepNestedPropertyVal = function(obj, prop, val, msg) {
    new Assertion(
      obj,
      msg,
      assert.deepNestedPropertyVal,
      true
    ).to.have.deep.nested.property(prop, val);
  };
  assert.notDeepNestedPropertyVal = function(obj, prop, val, msg) {
    new Assertion(
      obj,
      msg,
      assert.notDeepNestedPropertyVal,
      true
    ).to.not.have.deep.nested.property(prop, val);
  };
  assert.lengthOf = function(exp, len, msg) {
    new Assertion(exp, msg, assert.lengthOf, true).to.have.lengthOf(len);
  };
  assert.hasAnyKeys = function(obj, keys, msg) {
    new Assertion(obj, msg, assert.hasAnyKeys, true).to.have.any.keys(keys);
  };
  assert.hasAllKeys = function(obj, keys, msg) {
    new Assertion(obj, msg, assert.hasAllKeys, true).to.have.all.keys(keys);
  };
  assert.containsAllKeys = function(obj, keys, msg) {
    new Assertion(obj, msg, assert.containsAllKeys, true).to.contain.all.keys(
      keys
    );
  };
  assert.doesNotHaveAnyKeys = function(obj, keys, msg) {
    new Assertion(obj, msg, assert.doesNotHaveAnyKeys, true).to.not.have.any.keys(
      keys
    );
  };
  assert.doesNotHaveAllKeys = function(obj, keys, msg) {
    new Assertion(obj, msg, assert.doesNotHaveAllKeys, true).to.not.have.all.keys(
      keys
    );
  };
  assert.hasAnyDeepKeys = function(obj, keys, msg) {
    new Assertion(obj, msg, assert.hasAnyDeepKeys, true).to.have.any.deep.keys(
      keys
    );
  };
  assert.hasAllDeepKeys = function(obj, keys, msg) {
    new Assertion(obj, msg, assert.hasAllDeepKeys, true).to.have.all.deep.keys(
      keys
    );
  };
  assert.containsAllDeepKeys = function(obj, keys, msg) {
    new Assertion(
      obj,
      msg,
      assert.containsAllDeepKeys,
      true
    ).to.contain.all.deep.keys(keys);
  };
  assert.doesNotHaveAnyDeepKeys = function(obj, keys, msg) {
    new Assertion(
      obj,
      msg,
      assert.doesNotHaveAnyDeepKeys,
      true
    ).to.not.have.any.deep.keys(keys);
  };
  assert.doesNotHaveAllDeepKeys = function(obj, keys, msg) {
    new Assertion(
      obj,
      msg,
      assert.doesNotHaveAllDeepKeys,
      true
    ).to.not.have.all.deep.keys(keys);
  };
  assert.throws = function(fn, errorLike, errMsgMatcher, msg) {
    if ("string" === typeof errorLike || errorLike instanceof RegExp) {
      errMsgMatcher = errorLike;
      errorLike = null;
    }
    let assertErr = new Assertion(fn, msg, assert.throws, true).to.throw(
      errorLike,
      errMsgMatcher
    );
    return flag(assertErr, "object");
  };
  assert.doesNotThrow = function(fn, errorLike, errMsgMatcher, message) {
    if ("string" === typeof errorLike || errorLike instanceof RegExp) {
      errMsgMatcher = errorLike;
      errorLike = null;
    }
    new Assertion(fn, message, assert.doesNotThrow, true).to.not.throw(
      errorLike,
      errMsgMatcher
    );
  };
  assert.operator = function(val, operator, val2, msg) {
    let ok;
    switch (operator) {
      case "==":
        ok = val == val2;
        break;
      case "===":
        ok = val === val2;
        break;
      case ">":
        ok = val > val2;
        break;
      case ">=":
        ok = val >= val2;
        break;
      case "<":
        ok = val < val2;
        break;
      case "<=":
        ok = val <= val2;
        break;
      case "!=":
        ok = val != val2;
        break;
      case "!==":
        ok = val !== val2;
        break;
      default:
        msg = msg ? msg + ": " : msg;
        throw new AssertionError(
          msg + 'Invalid operator "' + operator + '"',
          void 0,
          assert.operator
        );
    }
    let test2 = new Assertion(ok, msg, assert.operator, true);
    test2.assert(
      true === flag(test2, "object"),
      "expected " + inspect2(val) + " to be " + operator + " " + inspect2(val2),
      "expected " + inspect2(val) + " to not be " + operator + " " + inspect2(val2)
    );
  };
  assert.closeTo = function(act, exp, delta, msg) {
    new Assertion(act, msg, assert.closeTo, true).to.be.closeTo(exp, delta);
  };
  assert.approximately = function(act, exp, delta, msg) {
    new Assertion(act, msg, assert.approximately, true).to.be.approximately(
      exp,
      delta
    );
  };
  assert.sameMembers = function(set1, set2, msg) {
    new Assertion(set1, msg, assert.sameMembers, true).to.have.same.members(set2);
  };
  assert.notSameMembers = function(set1, set2, msg) {
    new Assertion(
      set1,
      msg,
      assert.notSameMembers,
      true
    ).to.not.have.same.members(set2);
  };
  assert.sameDeepMembers = function(set1, set2, msg) {
    new Assertion(
      set1,
      msg,
      assert.sameDeepMembers,
      true
    ).to.have.same.deep.members(set2);
  };
  assert.notSameDeepMembers = function(set1, set2, msg) {
    new Assertion(
      set1,
      msg,
      assert.notSameDeepMembers,
      true
    ).to.not.have.same.deep.members(set2);
  };
  assert.sameOrderedMembers = function(set1, set2, msg) {
    new Assertion(
      set1,
      msg,
      assert.sameOrderedMembers,
      true
    ).to.have.same.ordered.members(set2);
  };
  assert.notSameOrderedMembers = function(set1, set2, msg) {
    new Assertion(
      set1,
      msg,
      assert.notSameOrderedMembers,
      true
    ).to.not.have.same.ordered.members(set2);
  };
  assert.sameDeepOrderedMembers = function(set1, set2, msg) {
    new Assertion(
      set1,
      msg,
      assert.sameDeepOrderedMembers,
      true
    ).to.have.same.deep.ordered.members(set2);
  };
  assert.notSameDeepOrderedMembers = function(set1, set2, msg) {
    new Assertion(
      set1,
      msg,
      assert.notSameDeepOrderedMembers,
      true
    ).to.not.have.same.deep.ordered.members(set2);
  };
  assert.includeMembers = function(superset, subset, msg) {
    new Assertion(superset, msg, assert.includeMembers, true).to.include.members(
      subset
    );
  };
  assert.notIncludeMembers = function(superset, subset, msg) {
    new Assertion(
      superset,
      msg,
      assert.notIncludeMembers,
      true
    ).to.not.include.members(subset);
  };
  assert.includeDeepMembers = function(superset, subset, msg) {
    new Assertion(
      superset,
      msg,
      assert.includeDeepMembers,
      true
    ).to.include.deep.members(subset);
  };
  assert.notIncludeDeepMembers = function(superset, subset, msg) {
    new Assertion(
      superset,
      msg,
      assert.notIncludeDeepMembers,
      true
    ).to.not.include.deep.members(subset);
  };
  assert.includeOrderedMembers = function(superset, subset, msg) {
    new Assertion(
      superset,
      msg,
      assert.includeOrderedMembers,
      true
    ).to.include.ordered.members(subset);
  };
  assert.notIncludeOrderedMembers = function(superset, subset, msg) {
    new Assertion(
      superset,
      msg,
      assert.notIncludeOrderedMembers,
      true
    ).to.not.include.ordered.members(subset);
  };
  assert.includeDeepOrderedMembers = function(superset, subset, msg) {
    new Assertion(
      superset,
      msg,
      assert.includeDeepOrderedMembers,
      true
    ).to.include.deep.ordered.members(subset);
  };
  assert.notIncludeDeepOrderedMembers = function(superset, subset, msg) {
    new Assertion(
      superset,
      msg,
      assert.notIncludeDeepOrderedMembers,
      true
    ).to.not.include.deep.ordered.members(subset);
  };
  assert.oneOf = function(inList, list, msg) {
    new Assertion(inList, msg, assert.oneOf, true).to.be.oneOf(list);
  };
  assert.isIterable = function(obj, msg) {
    if (obj == void 0 || !obj[Symbol.iterator]) {
      msg = msg ? `${msg} expected ${inspect2(obj)} to be an iterable` : `expected ${inspect2(obj)} to be an iterable`;
      throw new AssertionError(msg, void 0, assert.isIterable);
    }
  };
  assert.changes = function(fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === "function") {
      msg = prop;
      prop = null;
    }
    new Assertion(fn, msg, assert.changes, true).to.change(obj, prop);
  };
  assert.changesBy = function(fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === "function") {
      let tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }
    new Assertion(fn, msg, assert.changesBy, true).to.change(obj, prop).by(delta);
  };
  assert.doesNotChange = function(fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === "function") {
      msg = prop;
      prop = null;
    }
    return new Assertion(fn, msg, assert.doesNotChange, true).to.not.change(
      obj,
      prop
    );
  };
  assert.changesButNotBy = function(fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === "function") {
      let tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }
    new Assertion(fn, msg, assert.changesButNotBy, true).to.change(obj, prop).but.not.by(delta);
  };
  assert.increases = function(fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === "function") {
      msg = prop;
      prop = null;
    }
    return new Assertion(fn, msg, assert.increases, true).to.increase(obj, prop);
  };
  assert.increasesBy = function(fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === "function") {
      let tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }
    new Assertion(fn, msg, assert.increasesBy, true).to.increase(obj, prop).by(delta);
  };
  assert.doesNotIncrease = function(fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === "function") {
      msg = prop;
      prop = null;
    }
    return new Assertion(fn, msg, assert.doesNotIncrease, true).to.not.increase(
      obj,
      prop
    );
  };
  assert.increasesButNotBy = function(fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === "function") {
      let tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }
    new Assertion(fn, msg, assert.increasesButNotBy, true).to.increase(obj, prop).but.not.by(delta);
  };
  assert.decreases = function(fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === "function") {
      msg = prop;
      prop = null;
    }
    return new Assertion(fn, msg, assert.decreases, true).to.decrease(obj, prop);
  };
  assert.decreasesBy = function(fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === "function") {
      let tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }
    new Assertion(fn, msg, assert.decreasesBy, true).to.decrease(obj, prop).by(delta);
  };
  assert.doesNotDecrease = function(fn, obj, prop, msg) {
    if (arguments.length === 3 && typeof obj === "function") {
      msg = prop;
      prop = null;
    }
    return new Assertion(fn, msg, assert.doesNotDecrease, true).to.not.decrease(
      obj,
      prop
    );
  };
  assert.doesNotDecreaseBy = function(fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === "function") {
      let tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }
    return new Assertion(fn, msg, assert.doesNotDecreaseBy, true).to.not.decrease(obj, prop).by(delta);
  };
  assert.decreasesButNotBy = function(fn, obj, prop, delta, msg) {
    if (arguments.length === 4 && typeof obj === "function") {
      let tmpMsg = delta;
      delta = prop;
      msg = tmpMsg;
    } else if (arguments.length === 3) {
      delta = prop;
      prop = null;
    }
    new Assertion(fn, msg, assert.decreasesButNotBy, true).to.decrease(obj, prop).but.not.by(delta);
  };
  assert.ifError = function(val) {
    if (val) {
      throw val;
    }
  };
  assert.isExtensible = function(obj, msg) {
    new Assertion(obj, msg, assert.isExtensible, true).to.be.extensible;
  };
  assert.isNotExtensible = function(obj, msg) {
    new Assertion(obj, msg, assert.isNotExtensible, true).to.not.be.extensible;
  };
  assert.isSealed = function(obj, msg) {
    new Assertion(obj, msg, assert.isSealed, true).to.be.sealed;
  };
  assert.isNotSealed = function(obj, msg) {
    new Assertion(obj, msg, assert.isNotSealed, true).to.not.be.sealed;
  };
  assert.isFrozen = function(obj, msg) {
    new Assertion(obj, msg, assert.isFrozen, true).to.be.frozen;
  };
  assert.isNotFrozen = function(obj, msg) {
    new Assertion(obj, msg, assert.isNotFrozen, true).to.not.be.frozen;
  };
  assert.isEmpty = function(val, msg) {
    new Assertion(val, msg, assert.isEmpty, true).to.be.empty;
  };
  assert.isNotEmpty = function(val, msg) {
    new Assertion(val, msg, assert.isNotEmpty, true).to.not.be.empty;
  };
  assert.containsSubset = function(val, exp, msg) {
    new Assertion(val, msg).to.containSubset(exp);
  };
  assert.doesNotContainSubset = function(val, exp, msg) {
    new Assertion(val, msg).to.not.containSubset(exp);
  };
  var aliases = [
    ["isOk", "ok"],
    ["isNotOk", "notOk"],
    ["throws", "throw"],
    ["throws", "Throw"],
    ["isExtensible", "extensible"],
    ["isNotExtensible", "notExtensible"],
    ["isSealed", "sealed"],
    ["isNotSealed", "notSealed"],
    ["isFrozen", "frozen"],
    ["isNotFrozen", "notFrozen"],
    ["isEmpty", "empty"],
    ["isNotEmpty", "notEmpty"],
    ["isCallable", "isFunction"],
    ["isNotCallable", "isNotFunction"],
    ["containsSubset", "containSubset"]
  ];
  for (const [name, as] of aliases) {
    assert[as] = assert[name];
  }
  var used = [];
  function use(fn) {
    const exports = {
      use,
      AssertionError,
      util: utils_exports,
      config,
      expect,
      assert,
      Assertion,
      ...should_exports
    };
    if (!~used.indexOf(fn)) {
      fn(exports, utils_exports);
      used.push(fn);
    }
    return exports;
  }
  __name(use, "use");

  // node_modules/@paperback/types/lib/Chapter.js
  init_buffer();

  // node_modules/@paperback/types/lib/ChapterDetails.js
  init_buffer();

  // node_modules/@paperback/types/lib/Cookie.js
  init_buffer();

  // node_modules/@paperback/types/lib/DiscoverSectionItem.js
  init_buffer();

  // node_modules/@paperback/types/lib/DiscoverSectionType.js
  init_buffer();
  var DiscoverSectionType;
  (function(DiscoverSectionType2) {
    DiscoverSectionType2[DiscoverSectionType2["featured"] = 0] = "featured";
    DiscoverSectionType2[DiscoverSectionType2["simpleCarousel"] = 1] = "simpleCarousel";
    DiscoverSectionType2[DiscoverSectionType2["prominentCarousel"] = 2] = "prominentCarousel";
    DiscoverSectionType2[DiscoverSectionType2["chapterUpdates"] = 3] = "chapterUpdates";
    DiscoverSectionType2[DiscoverSectionType2["genres"] = 4] = "genres";
  })(DiscoverSectionType || (DiscoverSectionType = {}));

  // node_modules/@paperback/types/lib/HomeSection.js
  init_buffer();

  // node_modules/@paperback/types/lib/MangaInfo.js
  init_buffer();

  // node_modules/@paperback/types/lib/MangaProgress.js
  init_buffer();

  // node_modules/@paperback/types/lib/PagedResults.js
  init_buffer();
  var EndOfPageResults = Object.freeze({
    items: [],
    metadata: void 0
  });

  // node_modules/@paperback/types/lib/PBCanvas.js
  init_buffer();

  // node_modules/@paperback/types/lib/PBImage.js
  init_buffer();

  // node_modules/@paperback/types/lib/Request.js
  init_buffer();

  // node_modules/@paperback/types/lib/Response.js
  init_buffer();

  // node_modules/@paperback/types/lib/SearchFilter.js
  init_buffer();

  // node_modules/@paperback/types/lib/SearchQuery.js
  init_buffer();

  // node_modules/@paperback/types/lib/SearchResultItem.js
  init_buffer();

  // node_modules/@paperback/types/lib/SourceManga.js
  init_buffer();

  // node_modules/@paperback/types/lib/Tag.js
  init_buffer();

  // node_modules/@paperback/types/lib/TagSection.js
  init_buffer();

  // node_modules/@paperback/types/lib/TrackedMangaChapterReadAction.js
  init_buffer();

  // node_modules/@paperback/types/lib/SortingOption.js
  init_buffer();

  // src/Comix/forms.ts
  init_buffer();
  var SettingsForm = class extends Form {
    getSections() {
      return [
        Section("info", [
          // Add settings rows here if needed
        ])
      ];
    }
  };

  // src/Comix/network.ts
  init_buffer();
  var MainInterceptor = class extends PaperbackInterceptor {
    async interceptRequest(request) {
      request.headers = {
        ...request.headers,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Referer: "https://comix.to/"
      };
      return request;
    }
    async interceptResponse(request, response, data) {
      return data;
    }
  };

  // src/Comix/main.ts
  var COMIX_DOMAIN = "https://comix.to";
  var ComixExtension = class {
    constructor() {
      __publicField(this, "mainRateLimiter", new BasicRateLimiter("main", {
        numberOfRequests: 4,
        bufferInterval: 1,
        ignoreImages: true
      }));
      __publicField(this, "mainInterceptor", new MainInterceptor("main"));
    }
    async initialise() {
      this.mainRateLimiter.registerInterceptor();
      this.mainInterceptor.registerInterceptor();
    }
    async getSettingsForm() {
      return new SettingsForm();
    }
    async getDiscoverSections() {
      return [
        {
          id: "latest-updates",
          title: "Latest Updates",
          type: DiscoverSectionType.simpleCarousel
        },
        {
          id: "popular",
          title: "Popular",
          type: DiscoverSectionType.simpleCarousel
        }
      ];
    }
    async getDiscoverSectionItems(sectionId, metadata) {
      const page = metadata?.page ?? 1;
      const url = `${COMIX_DOMAIN}/home`;
      try {
        const request = new Request(url);
        const response = await request.send();
        const $ = Application.Cheerio.load(response.data);
        const items = [];
        $('a[href*="/title/"]').each((_, element) => {
          const href = $(element).attr("href");
          if (!href) return;
          const match = href.match(/\/title\/([^\/]+)/);
          if (!match) return;
          const mangaId = match[1];
          const title = $(element).text().trim();
          const img = $(element).find("img").first();
          const coverUrl = img.attr("src") || img.attr("data-src") || "";
          if (title && mangaId && !items.find((item) => item.id === mangaId)) {
            items.push({
              id: mangaId,
              title,
              coverUrl
            });
          }
        });
        return {
          items: items.slice(0, 20),
          metadata: { page: page + 1 }
        };
      } catch (error) {
        console.error(`Error fetching discover section ${sectionId}:`, error);
        return { items: [], metadata };
      }
    }
    async getSearchFilters() {
      return [];
    }
    async getSearchResults(query, metadata) {
      const page = metadata?.page ?? 1;
      const searchTerm = query.title ?? "";
      if (!searchTerm) {
        return { items: [], metadata };
      }
      const url = `${COMIX_DOMAIN}/search?q=${encodeURIComponent(searchTerm)}`;
      try {
        const request = new Request(url);
        const response = await request.send();
        const $ = Application.Cheerio.load(response.data);
        const results = [];
        $('a[href*="/title/"]').each((_, element) => {
          const href = $(element).attr("href");
          if (!href) return;
          const match = href.match(/\/title\/([^\/]+)/);
          if (!match) return;
          const mangaId = match[1];
          const title = $(element).text().trim();
          const img = $(element).find("img").first();
          const coverUrl = img.attr("src") || img.attr("data-src") || "";
          if (title && mangaId && !results.find((item) => item.id === mangaId)) {
            results.push({
              id: mangaId,
              title,
              coverUrl
            });
          }
        });
        return {
          items: results,
          metadata: { page: page + 1 }
        };
      } catch (error) {
        console.error("Error during search:", error);
        return { items: [], metadata };
      }
    }
    async getMangaDetails(mangaId) {
      const url = `${COMIX_DOMAIN}/title/${mangaId}`;
      try {
        const request = new Request(url);
        const response = await request.send();
        const $ = Application.Cheerio.load(response.data);
        const primaryTitle = $("h1").first().text().trim() || $("title").text().replace(" - Comix", "").trim();
        const secondaryTitles = [];
        $("h3").first().text().split("/").forEach((title) => {
          const cleaned = title.trim();
          if (cleaned && cleaned !== primaryTitle) {
            secondaryTitles.push(cleaned);
          }
        });
        const coverUrl = $('img[src*="static.comix.to"]').first().attr("src") || "";
        const synopsis = $("p").filter((_, el) => {
          const text = $(el).text();
          return text.length > 100;
        }).first().text().trim();
        const ratingText = $('.rating, [class*="rating"]').text();
        const rating = parseFloat(ratingText) || 0;
        const tags = [];
        $('a[href*="/genres/"], a[href*="/tags/"]').each((_, el) => {
          const tagName = $(el).text().trim();
          if (tagName) {
            tags.push({
              id: tagName.toLowerCase().replace(/\s+/g, "-"),
              label: tagName
            });
          }
        });
        let contentRating = ContentRating.EVERYONE;
        const tagLabels = tags.map((t) => t.label.toLowerCase());
        if (tagLabels.some((t) => ["ecchi", "mature", "adult"].includes(t))) {
          contentRating = ContentRating.MATURE;
        }
        return {
          mangaId,
          titles: [primaryTitle, ...secondaryTitles],
          coverUrl,
          author: "",
          artist: "",
          synopsis,
          status: "Ongoing",
          contentRating,
          tags
        };
      } catch (error) {
        console.error(`Error fetching manga details for ${mangaId}:`, error);
        throw error;
      }
    }
    async getChapters(mangaId) {
      const url = `${COMIX_DOMAIN}/title/${mangaId}`;
      try {
        const request = new Request(url);
        const response = await request.send();
        const $ = Application.Cheerio.load(response.data);
        const chapters = [];
        $('a[href*="/title/"]').each((_, element) => {
          const href = $(element).attr("href");
          if (!href) return;
          const match = href.match(/\/title\/[^\/]+\/(\d+)-chapter-([0-9.]+)/);
          if (!match) return;
          const chapterId = match[1];
          const chapterNum = parseFloat(match[2]);
          const chapterText = $(element).text().trim();
          const title = chapterText.replace(/^Ch\.?\s*/i, "").trim();
          const dateText = $(element).closest("div, li, tr").find('[class*="time"], [class*="date"]').text().trim();
          let timestamp = Date.now();
          if (dateText) {
            const timeMatch = dateText.match(/(\d+)\s*(d|h|m|s)/i);
            if (timeMatch) {
              const value = parseInt(timeMatch[1]);
              const unit = timeMatch[2].toLowerCase();
              const multiplier = {
                "s": 1e3,
                "m": 60 * 1e3,
                "h": 60 * 60 * 1e3,
                "d": 24 * 60 * 60 * 1e3
              }[unit] || 0;
              timestamp = Date.now() - value * multiplier;
            }
          }
          if (!chapters.find((ch) => ch.id === chapterId)) {
            chapters.push({
              id: `${mangaId}/${chapterId}`,
              mangaId,
              name: title || `Chapter ${chapterNum}`,
              chapterNumber: chapterNum,
              volume: 0,
              language: "en",
              timestamp
            });
          }
        });
        return chapters.sort((a, b) => (b.chapterNumber ?? 0) - (a.chapterNumber ?? 0));
      } catch (error) {
        console.error(`Error fetching chapters for ${mangaId}:`, error);
        return [];
      }
    }
    async getChapterDetails(chapterId) {
      const url = `${COMIX_DOMAIN}/title/${chapterId}`;
      try {
        const request = new Request(url);
        const response = await request.send();
        const $ = Application.Cheerio.load(response.data);
        const pages = [];
        $("script").each((_, script) => {
          const scriptContent = $(script).html();
          if (!scriptContent) return;
          const imageMatches = scriptContent.match(/https?:\/\/[^\s"']+\.(?:jpg|jpeg|png|webp)/gi);
          if (imageMatches) {
            imageMatches.forEach((url2) => {
              if (!pages.includes(url2)) {
                pages.push(url2);
              }
            });
          }
        });
        $('img[src*="static.comix.to"]').each((_, img) => {
          const src = $(img).attr("src") || $(img).attr("data-src");
          if (src && !pages.includes(src)) {
            pages.push(src);
          }
        });
        $("img[data-src]").each((_, img) => {
          const src = $(img).attr("data-src");
          if (src && !pages.includes(src)) {
            pages.push(src);
          }
        });
        return {
          chapterId,
          pages
        };
      } catch (error) {
        console.error(`Error fetching chapter details for ${chapterId}:`, error);
        throw error;
      }
    }
  };
  return __toCommonJS(main_exports);
})();
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)

chai/index.js:
  (*!
   * Chai - flag utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Chai - test utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Chai - expectTypes utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Chai - getActual utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Chai - message composition utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Chai - transferFlags utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * chai
   * http://chaijs.com
   * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Chai - isProxyEnabled helper
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Chai - addProperty utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Chai - addLengthGuard utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Chai - getProperties utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Chai - proxify utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Chai - addMethod utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Chai - overwriteProperty utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Chai - overwriteMethod utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Chai - addChainingMethod utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Chai - overwriteChainableMethod utility
   * Copyright(c) 2012-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Chai - compareByInspect utility
   * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Chai - getOwnEnumerablePropertySymbols utility
   * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Chai - getOwnEnumerableProperties utility
   * Copyright(c) 2011-2016 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * Chai - isNaN utility
   * Copyright(c) 2012-2015 Sakthipriyan Vairamani <thechargingvolcano@gmail.com>
   * MIT Licensed
   *)
  (*!
   * chai
   * Copyright(c) 2011 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*!
   * chai
   * Copyright(c) 2011-2014 Jake Luer <jake@alogicalparadox.com>
   * MIT Licensed
   *)
  (*! Bundled license information:
  
  deep-eql/index.js:
    (*!
     * deep-eql
     * Copyright(c) 2013 Jake Luer <jake@alogicalparadox.com>
     * MIT Licensed
     *)
    (*!
     * Check to see if the MemoizeMap has recorded a result of the two operands
     *
     * @param {Mixed} leftHandOperand
     * @param {Mixed} rightHandOperand
     * @param {MemoizeMap} memoizeMap
     * @returns {Boolean|null} result
    *)
    (*!
     * Set the result of the equality into the MemoizeMap
     *
     * @param {Mixed} leftHandOperand
     * @param {Mixed} rightHandOperand
     * @param {MemoizeMap} memoizeMap
     * @param {Boolean} result
    *)
    (*!
     * Primary Export
     *)
    (*!
     * The main logic of the `deepEqual` function.
     *
     * @param {Mixed} leftHandOperand
     * @param {Mixed} rightHandOperand
     * @param {Object} [options] (optional) Additional options
     * @param {Array} [options.comparator] (optional) Override default algorithm, determining custom equality.
     * @param {Array} [options.memoize] (optional) Provide a custom memoization object which will cache the results of
        complex objects for a speed boost. By passing `false` you can disable memoization, but this will cause circular
        references to blow the stack.
     * @return {Boolean} equal match
    *)
    (*!
     * Compare two Regular Expressions for equality.
     *
     * @param {RegExp} leftHandOperand
     * @param {RegExp} rightHandOperand
     * @return {Boolean} result
     *)
    (*!
     * Compare two Sets/Maps for equality. Faster than other equality functions.
     *
     * @param {Set} leftHandOperand
     * @param {Set} rightHandOperand
     * @param {Object} [options] (Optional)
     * @return {Boolean} result
     *)
    (*!
     * Simple equality for flat iterable objects such as Arrays, TypedArrays or Node.js buffers.
     *
     * @param {Iterable} leftHandOperand
     * @param {Iterable} rightHandOperand
     * @param {Object} [options] (Optional)
     * @return {Boolean} result
     *)
    (*!
     * Simple equality for generator objects such as those returned by generator functions.
     *
     * @param {Iterable} leftHandOperand
     * @param {Iterable} rightHandOperand
     * @param {Object} [options] (Optional)
     * @return {Boolean} result
     *)
    (*!
     * Determine if the given object has an @@iterator function.
     *
     * @param {Object} target
     * @return {Boolean} `true` if the object has an @@iterator function.
     *)
    (*!
     * Gets all iterator entries from the given Object. If the Object has no @@iterator function, returns an empty array.
     * This will consume the iterator - which could have side effects depending on the @@iterator implementation.
     *
     * @param {Object} target
     * @returns {Array} an array of entries from the @@iterator function
     *)
    (*!
     * Gets all entries from a Generator. This will consume the generator - which could have side effects.
     *
     * @param {Generator} target
     * @returns {Array} an array of entries from the Generator.
     *)
    (*!
     * Gets all own and inherited enumerable keys from a target.
     *
     * @param {Object} target
     * @returns {Array} an array of own and inherited enumerable keys from the target.
     *)
    (*!
     * Determines if two objects have matching values, given a set of keys. Defers to deepEqual for the equality check of
     * each key. If any value of the given key is not equal, the function will return false (early).
     *
     * @param {Mixed} leftHandOperand
     * @param {Mixed} rightHandOperand
     * @param {Array} keys An array of keys to compare the values of leftHandOperand and rightHandOperand against
     * @param {Object} [options] (Optional)
     * @return {Boolean} result
     *)
    (*!
     * Recursively check the equality of two Objects. Once basic sameness has been established it will defer to `deepEqual`
     * for each enumerable key in the object.
     *
     * @param {Mixed} leftHandOperand
     * @param {Mixed} rightHandOperand
     * @param {Object} [options] (Optional)
     * @return {Boolean} result
     *)
    (*!
     * Returns true if the argument is a primitive.
     *
     * This intentionally returns true for all objects that can be compared by reference,
     * including functions and symbols.
     *
     * @param {Mixed} value
     * @return {Boolean} result
     *)
  *)
*/
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9pbmRleC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvaWVlZTc1NC9pbmRleC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3Rvb2xjaGFpbi9saWIvc2hpbXMvYnVmZmVyLmpzIiwgIi4uLy4uL3NyYy9Db21peC9tYWluLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3R5cGVzL3NyYy9pbmRleC50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9zcmMvaW1wbC9pbmRleC50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9zcmMvaW1wbC9TZXR0aW5nc1VJL2luZGV4LnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3R5cGVzL3NyYy9pbXBsL1NldHRpbmdzVUkvRm9ybS50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9zcmMvaW1wbC9TZXR0aW5nc1VJL0Zvcm1JdGVtRWxlbWVudC50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9zcmMvaW1wbC9TZXR0aW5nc1VJL0Zvcm1TZWN0aW9uLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3R5cGVzL3NyYy9pbXBsL2ludGVyZmFjZXMvaW5kZXgudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BwYXBlcmJhY2svdHlwZXMvc3JjL2ltcGwvaW50ZXJmYWNlcy9DaGFwdGVyUHJvdmlkaW5nLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3R5cGVzL2xpYi9pbXBsL2ludGVyZmFjZXMvQ2xvdWRmbGFyZUJ5cGFzc1JlcXVlc3RQcm92aWRpbmcuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BwYXBlcmJhY2svdHlwZXMvbGliL2ltcGwvaW50ZXJmYWNlcy9EaXNjb3ZlclNlY3Rpb25Qcm92aWRpbmcuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BwYXBlcmJhY2svdHlwZXMvbGliL2ltcGwvaW50ZXJmYWNlcy9NYW5hZ2VkQ29sbGVjdGlvblByb3ZpZGluZy5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9zcmMvaW1wbC9pbnRlcmZhY2VzL01hbmdhUHJvZ3Jlc3NQcm92aWRpbmcudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BwYXBlcmJhY2svdHlwZXMvbGliL2ltcGwvaW50ZXJmYWNlcy9NYW5nYVByb3ZpZGluZy5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9zcmMvaW1wbC9pbnRlcmZhY2VzL1NlYXJjaFJlc3VsdHNQcm92aWRpbmcudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BwYXBlcmJhY2svdHlwZXMvbGliL2ltcGwvaW50ZXJmYWNlcy9TZXR0aW5nc0Zvcm1Qcm92aWRpbmcuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BwYXBlcmJhY2svdHlwZXMvbGliL2ltcGwvQXBwbGljYXRpb24uanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BwYXBlcmJhY2svdHlwZXMvc3JjL2ltcGwvUGFwZXJiYWNrSW50ZXJjZXB0b3IudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BwYXBlcmJhY2svdHlwZXMvbGliL2ltcGwvU2VsZWN0b3IuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BwYXBlcmJhY2svdHlwZXMvbGliL2ltcGwvRXh0ZW5zaW9uLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3R5cGVzL3NyYy9pbXBsL0Jhc2ljUmF0ZUxpbWl0ZXIudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BwYXBlcmJhY2svdHlwZXMvc3JjL2ltcGwvTG9jay50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9zcmMvaW1wbC9DbG91ZGZsYXJlRXJyb3IudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BwYXBlcmJhY2svdHlwZXMvc3JjL2ltcGwvQ29va2llU3RvcmFnZUludGVyY2VwdG9yLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3R5cGVzL3NyYy9pbXBsL1VSTC50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9zcmMvaW1wbC9UZXN0RGVmaW5pdGlvbi50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9zcmMvaW1wbC9Tb3VyY2VJbmZvLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9jaGFpL2luZGV4LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3R5cGVzL2xpYi9DaGFwdGVyLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3R5cGVzL2xpYi9DaGFwdGVyRGV0YWlscy5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9saWIvQ29va2llLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3R5cGVzL2xpYi9EaXNjb3ZlclNlY3Rpb25JdGVtLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3R5cGVzL3NyYy9EaXNjb3ZlclNlY3Rpb25UeXBlLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3R5cGVzL2xpYi9Ib21lU2VjdGlvbi5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9saWIvTWFuZ2FJbmZvLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3R5cGVzL2xpYi9NYW5nYVByb2dyZXNzLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3R5cGVzL3NyYy9QYWdlZFJlc3VsdHMudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BwYXBlcmJhY2svdHlwZXMvbGliL1BCQ2FudmFzLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3R5cGVzL2xpYi9QQkltYWdlLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3R5cGVzL3NyYy9SZXF1ZXN0LnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3R5cGVzL3NyYy9SZXNwb25zZS50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9saWIvU2VhcmNoRmlsdGVyLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3R5cGVzL2xpYi9TZWFyY2hRdWVyeS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9saWIvU2VhcmNoUmVzdWx0SXRlbS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9saWIvU291cmNlTWFuZ2EuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BwYXBlcmJhY2svdHlwZXMvbGliL1RhZy5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9saWIvVGFnU2VjdGlvbi5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9saWIvVHJhY2tlZE1hbmdhQ2hhcHRlclJlYWRBY3Rpb24uanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BwYXBlcmJhY2svdHlwZXMvbGliL1NvcnRpbmdPcHRpb24uanMiLCAiLi4vLi4vc3JjL0NvbWl4L2Zvcm1zLnRzIiwgIi4uLy4uL3NyYy9Db21peC9uZXR3b3JrLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIndXNlIHN0cmljdCdcblxuZXhwb3J0cy5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuZXhwb3J0cy50b0J5dGVBcnJheSA9IHRvQnl0ZUFycmF5XG5leHBvcnRzLmZyb21CeXRlQXJyYXkgPSBmcm9tQnl0ZUFycmF5XG5cbnZhciBsb29rdXAgPSBbXVxudmFyIHJldkxvb2t1cCA9IFtdXG52YXIgQXJyID0gdHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnID8gVWludDhBcnJheSA6IEFycmF5XG5cbnZhciBjb2RlID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nXG5mb3IgKHZhciBpID0gMCwgbGVuID0gY29kZS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICBsb29rdXBbaV0gPSBjb2RlW2ldXG4gIHJldkxvb2t1cFtjb2RlLmNoYXJDb2RlQXQoaSldID0gaVxufVxuXG4vLyBTdXBwb3J0IGRlY29kaW5nIFVSTC1zYWZlIGJhc2U2NCBzdHJpbmdzLCBhcyBOb2RlLmpzIGRvZXMuXG4vLyBTZWU6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Jhc2U2NCNVUkxfYXBwbGljYXRpb25zXG5yZXZMb29rdXBbJy0nLmNoYXJDb2RlQXQoMCldID0gNjJcbnJldkxvb2t1cFsnXycuY2hhckNvZGVBdCgwKV0gPSA2M1xuXG5mdW5jdGlvbiBnZXRMZW5zIChiNjQpIHtcbiAgdmFyIGxlbiA9IGI2NC5sZW5ndGhcblxuICBpZiAobGVuICUgNCA+IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3RyaW5nLiBMZW5ndGggbXVzdCBiZSBhIG11bHRpcGxlIG9mIDQnKVxuICB9XG5cbiAgLy8gVHJpbSBvZmYgZXh0cmEgYnl0ZXMgYWZ0ZXIgcGxhY2Vob2xkZXIgYnl0ZXMgYXJlIGZvdW5kXG4gIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2JlYXRnYW1taXQvYmFzZTY0LWpzL2lzc3Vlcy80MlxuICB2YXIgdmFsaWRMZW4gPSBiNjQuaW5kZXhPZignPScpXG4gIGlmICh2YWxpZExlbiA9PT0gLTEpIHZhbGlkTGVuID0gbGVuXG5cbiAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IHZhbGlkTGVuID09PSBsZW5cbiAgICA/IDBcbiAgICA6IDQgLSAodmFsaWRMZW4gJSA0KVxuXG4gIHJldHVybiBbdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbl1cbn1cblxuLy8gYmFzZTY0IGlzIDQvMyArIHVwIHRvIHR3byBjaGFyYWN0ZXJzIG9mIHRoZSBvcmlnaW5hbCBkYXRhXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChiNjQpIHtcbiAgdmFyIGxlbnMgPSBnZXRMZW5zKGI2NClcbiAgdmFyIHZhbGlkTGVuID0gbGVuc1swXVxuICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gbGVuc1sxXVxuICByZXR1cm4gKCh2YWxpZExlbiArIHBsYWNlSG9sZGVyc0xlbikgKiAzIC8gNCkgLSBwbGFjZUhvbGRlcnNMZW5cbn1cblxuZnVuY3Rpb24gX2J5dGVMZW5ndGggKGI2NCwgdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbikge1xuICByZXR1cm4gKCh2YWxpZExlbiArIHBsYWNlSG9sZGVyc0xlbikgKiAzIC8gNCkgLSBwbGFjZUhvbGRlcnNMZW5cbn1cblxuZnVuY3Rpb24gdG9CeXRlQXJyYXkgKGI2NCkge1xuICB2YXIgdG1wXG4gIHZhciBsZW5zID0gZ2V0TGVucyhiNjQpXG4gIHZhciB2YWxpZExlbiA9IGxlbnNbMF1cbiAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IGxlbnNbMV1cblxuICB2YXIgYXJyID0gbmV3IEFycihfYnl0ZUxlbmd0aChiNjQsIHZhbGlkTGVuLCBwbGFjZUhvbGRlcnNMZW4pKVxuXG4gIHZhciBjdXJCeXRlID0gMFxuXG4gIC8vIGlmIHRoZXJlIGFyZSBwbGFjZWhvbGRlcnMsIG9ubHkgZ2V0IHVwIHRvIHRoZSBsYXN0IGNvbXBsZXRlIDQgY2hhcnNcbiAgdmFyIGxlbiA9IHBsYWNlSG9sZGVyc0xlbiA+IDBcbiAgICA/IHZhbGlkTGVuIC0gNFxuICAgIDogdmFsaWRMZW5cblxuICB2YXIgaVxuICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpICs9IDQpIHtcbiAgICB0bXAgPVxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMTgpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCAxMikgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildIDw8IDYpIHxcbiAgICAgIHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMyldXG4gICAgYXJyW2N1ckJ5dGUrK10gPSAodG1wID4+IDE2KSAmIDB4RkZcbiAgICBhcnJbY3VyQnl0ZSsrXSA9ICh0bXAgPj4gOCkgJiAweEZGXG4gICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICBpZiAocGxhY2VIb2xkZXJzTGVuID09PSAyKSB7XG4gICAgdG1wID1cbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDIpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA+PiA0KVxuICAgIGFycltjdXJCeXRlKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgaWYgKHBsYWNlSG9sZGVyc0xlbiA9PT0gMSkge1xuICAgIHRtcCA9XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAxMCkgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDQpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDIpXSA+PiAyKVxuICAgIGFycltjdXJCeXRlKytdID0gKHRtcCA+PiA4KSAmIDB4RkZcbiAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBhcnJcbn1cblxuZnVuY3Rpb24gdHJpcGxldFRvQmFzZTY0IChudW0pIHtcbiAgcmV0dXJuIGxvb2t1cFtudW0gPj4gMTggJiAweDNGXSArXG4gICAgbG9va3VwW251bSA+PiAxMiAmIDB4M0ZdICtcbiAgICBsb29rdXBbbnVtID4+IDYgJiAweDNGXSArXG4gICAgbG9va3VwW251bSAmIDB4M0ZdXG59XG5cbmZ1bmN0aW9uIGVuY29kZUNodW5rICh1aW50OCwgc3RhcnQsIGVuZCkge1xuICB2YXIgdG1wXG4gIHZhciBvdXRwdXQgPSBbXVxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkgKz0gMykge1xuICAgIHRtcCA9XG4gICAgICAoKHVpbnQ4W2ldIDw8IDE2KSAmIDB4RkYwMDAwKSArXG4gICAgICAoKHVpbnQ4W2kgKyAxXSA8PCA4KSAmIDB4RkYwMCkgK1xuICAgICAgKHVpbnQ4W2kgKyAyXSAmIDB4RkYpXG4gICAgb3V0cHV0LnB1c2godHJpcGxldFRvQmFzZTY0KHRtcCkpXG4gIH1cbiAgcmV0dXJuIG91dHB1dC5qb2luKCcnKVxufVxuXG5mdW5jdGlvbiBmcm9tQnl0ZUFycmF5ICh1aW50OCkge1xuICB2YXIgdG1wXG4gIHZhciBsZW4gPSB1aW50OC5sZW5ndGhcbiAgdmFyIGV4dHJhQnl0ZXMgPSBsZW4gJSAzIC8vIGlmIHdlIGhhdmUgMSBieXRlIGxlZnQsIHBhZCAyIGJ5dGVzXG4gIHZhciBwYXJ0cyA9IFtdXG4gIHZhciBtYXhDaHVua0xlbmd0aCA9IDE2MzgzIC8vIG11c3QgYmUgbXVsdGlwbGUgb2YgM1xuXG4gIC8vIGdvIHRocm91Z2ggdGhlIGFycmF5IGV2ZXJ5IHRocmVlIGJ5dGVzLCB3ZSdsbCBkZWFsIHdpdGggdHJhaWxpbmcgc3R1ZmYgbGF0ZXJcbiAgZm9yICh2YXIgaSA9IDAsIGxlbjIgPSBsZW4gLSBleHRyYUJ5dGVzOyBpIDwgbGVuMjsgaSArPSBtYXhDaHVua0xlbmd0aCkge1xuICAgIHBhcnRzLnB1c2goZW5jb2RlQ2h1bmsodWludDgsIGksIChpICsgbWF4Q2h1bmtMZW5ndGgpID4gbGVuMiA/IGxlbjIgOiAoaSArIG1heENodW5rTGVuZ3RoKSkpXG4gIH1cblxuICAvLyBwYWQgdGhlIGVuZCB3aXRoIHplcm9zLCBidXQgbWFrZSBzdXJlIHRvIG5vdCBmb3JnZXQgdGhlIGV4dHJhIGJ5dGVzXG4gIGlmIChleHRyYUJ5dGVzID09PSAxKSB7XG4gICAgdG1wID0gdWludDhbbGVuIC0gMV1cbiAgICBwYXJ0cy5wdXNoKFxuICAgICAgbG9va3VwW3RtcCA+PiAyXSArXG4gICAgICBsb29rdXBbKHRtcCA8PCA0KSAmIDB4M0ZdICtcbiAgICAgICc9PSdcbiAgICApXG4gIH0gZWxzZSBpZiAoZXh0cmFCeXRlcyA9PT0gMikge1xuICAgIHRtcCA9ICh1aW50OFtsZW4gLSAyXSA8PCA4KSArIHVpbnQ4W2xlbiAtIDFdXG4gICAgcGFydHMucHVzaChcbiAgICAgIGxvb2t1cFt0bXAgPj4gMTBdICtcbiAgICAgIGxvb2t1cFsodG1wID4+IDQpICYgMHgzRl0gK1xuICAgICAgbG9va3VwWyh0bXAgPDwgMikgJiAweDNGXSArXG4gICAgICAnPSdcbiAgICApXG4gIH1cblxuICByZXR1cm4gcGFydHMuam9pbignJylcbn1cbiIsICIvKiEgaWVlZTc1NC4gQlNELTMtQ2xhdXNlIExpY2Vuc2UuIEZlcm9zcyBBYm91a2hhZGlqZWggPGh0dHBzOi8vZmVyb3NzLm9yZy9vcGVuc291cmNlPiAqL1xuZXhwb3J0cy5yZWFkID0gZnVuY3Rpb24gKGJ1ZmZlciwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG1cbiAgdmFyIGVMZW4gPSAobkJ5dGVzICogOCkgLSBtTGVuIC0gMVxuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMVxuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDFcbiAgdmFyIG5CaXRzID0gLTdcbiAgdmFyIGkgPSBpc0xFID8gKG5CeXRlcyAtIDEpIDogMFxuICB2YXIgZCA9IGlzTEUgPyAtMSA6IDFcbiAgdmFyIHMgPSBidWZmZXJbb2Zmc2V0ICsgaV1cblxuICBpICs9IGRcblxuICBlID0gcyAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBzID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBlTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IGUgPSAoZSAqIDI1NikgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBtID0gZSAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBlID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBtTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IG0gPSAobSAqIDI1NikgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBpZiAoZSA9PT0gMCkge1xuICAgIGUgPSAxIC0gZUJpYXNcbiAgfSBlbHNlIGlmIChlID09PSBlTWF4KSB7XG4gICAgcmV0dXJuIG0gPyBOYU4gOiAoKHMgPyAtMSA6IDEpICogSW5maW5pdHkpXG4gIH0gZWxzZSB7XG4gICAgbSA9IG0gKyBNYXRoLnBvdygyLCBtTGVuKVxuICAgIGUgPSBlIC0gZUJpYXNcbiAgfVxuICByZXR1cm4gKHMgPyAtMSA6IDEpICogbSAqIE1hdGgucG93KDIsIGUgLSBtTGVuKVxufVxuXG5leHBvcnRzLndyaXRlID0gZnVuY3Rpb24gKGJ1ZmZlciwgdmFsdWUsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtLCBjXG4gIHZhciBlTGVuID0gKG5CeXRlcyAqIDgpIC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBydCA9IChtTGVuID09PSAyMyA/IE1hdGgucG93KDIsIC0yNCkgLSBNYXRoLnBvdygyLCAtNzcpIDogMClcbiAgdmFyIGkgPSBpc0xFID8gMCA6IChuQnl0ZXMgLSAxKVxuICB2YXIgZCA9IGlzTEUgPyAxIDogLTFcbiAgdmFyIHMgPSB2YWx1ZSA8IDAgfHwgKHZhbHVlID09PSAwICYmIDEgLyB2YWx1ZSA8IDApID8gMSA6IDBcblxuICB2YWx1ZSA9IE1hdGguYWJzKHZhbHVlKVxuXG4gIGlmIChpc05hTih2YWx1ZSkgfHwgdmFsdWUgPT09IEluZmluaXR5KSB7XG4gICAgbSA9IGlzTmFOKHZhbHVlKSA/IDEgOiAwXG4gICAgZSA9IGVNYXhcbiAgfSBlbHNlIHtcbiAgICBlID0gTWF0aC5mbG9vcihNYXRoLmxvZyh2YWx1ZSkgLyBNYXRoLkxOMilcbiAgICBpZiAodmFsdWUgKiAoYyA9IE1hdGgucG93KDIsIC1lKSkgPCAxKSB7XG4gICAgICBlLS1cbiAgICAgIGMgKj0gMlxuICAgIH1cbiAgICBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIHZhbHVlICs9IHJ0IC8gY1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSArPSBydCAqIE1hdGgucG93KDIsIDEgLSBlQmlhcylcbiAgICB9XG4gICAgaWYgKHZhbHVlICogYyA+PSAyKSB7XG4gICAgICBlKytcbiAgICAgIGMgLz0gMlxuICAgIH1cblxuICAgIGlmIChlICsgZUJpYXMgPj0gZU1heCkge1xuICAgICAgbSA9IDBcbiAgICAgIGUgPSBlTWF4XG4gICAgfSBlbHNlIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgbSA9ICgodmFsdWUgKiBjKSAtIDEpICogTWF0aC5wb3coMiwgbUxlbilcbiAgICAgIGUgPSBlICsgZUJpYXNcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IHZhbHVlICogTWF0aC5wb3coMiwgZUJpYXMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pXG4gICAgICBlID0gMFxuICAgIH1cbiAgfVxuXG4gIGZvciAoOyBtTGVuID49IDg7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IG0gJiAweGZmLCBpICs9IGQsIG0gLz0gMjU2LCBtTGVuIC09IDgpIHt9XG5cbiAgZSA9IChlIDw8IG1MZW4pIHwgbVxuICBlTGVuICs9IG1MZW5cbiAgZm9yICg7IGVMZW4gPiAwOyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBlICYgMHhmZiwgaSArPSBkLCBlIC89IDI1NiwgZUxlbiAtPSA4KSB7fVxuXG4gIGJ1ZmZlcltvZmZzZXQgKyBpIC0gZF0gfD0gcyAqIDEyOFxufVxuIiwgIi8qIVxuICogVGhlIGJ1ZmZlciBtb2R1bGUgZnJvbSBub2RlLmpzLCBmb3IgdGhlIGJyb3dzZXIuXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGh0dHBzOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cblxuJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGJhc2U2NCA9IHJlcXVpcmUoJ2Jhc2U2NC1qcycpXG5jb25zdCBpZWVlNzU0ID0gcmVxdWlyZSgnaWVlZTc1NCcpXG5jb25zdCBjdXN0b21JbnNwZWN0U3ltYm9sID1cbiAgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFN5bWJvbFsnZm9yJ10gPT09ICdmdW5jdGlvbicpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZG90LW5vdGF0aW9uXG4gICAgPyBTeW1ib2xbJ2ZvciddKCdub2RlanMudXRpbC5pbnNwZWN0LmN1c3RvbScpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZG90LW5vdGF0aW9uXG4gICAgOiBudWxsXG5cbmV4cG9ydHMuQnVmZmVyID0gQnVmZmVyXG5leHBvcnRzLlNsb3dCdWZmZXIgPSBTbG93QnVmZmVyXG5leHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTID0gNTBcblxuY29uc3QgS19NQVhfTEVOR1RIID0gMHg3ZmZmZmZmZlxuZXhwb3J0cy5rTWF4TGVuZ3RoID0gS19NQVhfTEVOR1RIXG5cbi8qKlxuICogSWYgYEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUYDpcbiAqICAgPT09IHRydWUgICAgVXNlIFVpbnQ4QXJyYXkgaW1wbGVtZW50YXRpb24gKGZhc3Rlc3QpXG4gKiAgID09PSBmYWxzZSAgIFByaW50IHdhcm5pbmcgYW5kIHJlY29tbWVuZCB1c2luZyBgYnVmZmVyYCB2NC54IHdoaWNoIGhhcyBhbiBPYmplY3RcbiAqICAgICAgICAgICAgICAgaW1wbGVtZW50YXRpb24gKG1vc3QgY29tcGF0aWJsZSwgZXZlbiBJRTYpXG4gKlxuICogQnJvd3NlcnMgdGhhdCBzdXBwb3J0IHR5cGVkIGFycmF5cyBhcmUgSUUgMTArLCBGaXJlZm94IDQrLCBDaHJvbWUgNyssIFNhZmFyaSA1LjErLFxuICogT3BlcmEgMTEuNissIGlPUyA0LjIrLlxuICpcbiAqIFdlIHJlcG9ydCB0aGF0IHRoZSBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdHlwZWQgYXJyYXlzIGlmIHRoZSBhcmUgbm90IHN1YmNsYXNzYWJsZVxuICogdXNpbmcgX19wcm90b19fLiBGaXJlZm94IDQtMjkgbGFja3Mgc3VwcG9ydCBmb3IgYWRkaW5nIG5ldyBwcm9wZXJ0aWVzIHRvIGBVaW50OEFycmF5YFxuICogKFNlZTogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9Njk1NDM4KS4gSUUgMTAgbGFja3Mgc3VwcG9ydFxuICogZm9yIF9fcHJvdG9fXyBhbmQgaGFzIGEgYnVnZ3kgdHlwZWQgYXJyYXkgaW1wbGVtZW50YXRpb24uXG4gKi9cbkJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUID0gdHlwZWRBcnJheVN1cHBvcnQoKVxuXG5pZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHR5cGVvZiBjb25zb2xlLmVycm9yID09PSAnZnVuY3Rpb24nKSB7XG4gIGNvbnNvbGUuZXJyb3IoXG4gICAgJ1RoaXMgYnJvd3NlciBsYWNrcyB0eXBlZCBhcnJheSAoVWludDhBcnJheSkgc3VwcG9ydCB3aGljaCBpcyByZXF1aXJlZCBieSAnICtcbiAgICAnYGJ1ZmZlcmAgdjUueC4gVXNlIGBidWZmZXJgIHY0LnggaWYgeW91IHJlcXVpcmUgb2xkIGJyb3dzZXIgc3VwcG9ydC4nXG4gIClcbn1cblxuZnVuY3Rpb24gdHlwZWRBcnJheVN1cHBvcnQgKCkge1xuICAvLyBDYW4gdHlwZWQgYXJyYXkgaW5zdGFuY2VzIGNhbiBiZSBhdWdtZW50ZWQ/XG4gIHRyeSB7XG4gICAgY29uc3QgYXJyID0gbmV3IFVpbnQ4QXJyYXkoMSlcbiAgICBjb25zdCBwcm90byA9IHsgZm9vOiBmdW5jdGlvbiAoKSB7IHJldHVybiA0MiB9IH1cbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YocHJvdG8sIFVpbnQ4QXJyYXkucHJvdG90eXBlKVxuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihhcnIsIHByb3RvKVxuICAgIHJldHVybiBhcnIuZm9vKCkgPT09IDQyXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoQnVmZmVyLnByb3RvdHlwZSwgJ3BhcmVudCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFCdWZmZXIuaXNCdWZmZXIodGhpcykpIHJldHVybiB1bmRlZmluZWRcbiAgICByZXR1cm4gdGhpcy5idWZmZXJcbiAgfVxufSlcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1ZmZlci5wcm90b3R5cGUsICdvZmZzZXQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIGlmICghQnVmZmVyLmlzQnVmZmVyKHRoaXMpKSByZXR1cm4gdW5kZWZpbmVkXG4gICAgcmV0dXJuIHRoaXMuYnl0ZU9mZnNldFxuICB9XG59KVxuXG5mdW5jdGlvbiBjcmVhdGVCdWZmZXIgKGxlbmd0aCkge1xuICBpZiAobGVuZ3RoID4gS19NQVhfTEVOR1RIKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBcIicgKyBsZW5ndGggKyAnXCIgaXMgaW52YWxpZCBmb3Igb3B0aW9uIFwic2l6ZVwiJylcbiAgfVxuICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZVxuICBjb25zdCBidWYgPSBuZXcgVWludDhBcnJheShsZW5ndGgpXG4gIE9iamVjdC5zZXRQcm90b3R5cGVPZihidWYsIEJ1ZmZlci5wcm90b3R5cGUpXG4gIHJldHVybiBidWZcbn1cblxuLyoqXG4gKiBUaGUgQnVmZmVyIGNvbnN0cnVjdG9yIHJldHVybnMgaW5zdGFuY2VzIG9mIGBVaW50OEFycmF5YCB0aGF0IGhhdmUgdGhlaXJcbiAqIHByb3RvdHlwZSBjaGFuZ2VkIHRvIGBCdWZmZXIucHJvdG90eXBlYC4gRnVydGhlcm1vcmUsIGBCdWZmZXJgIGlzIGEgc3ViY2xhc3Mgb2ZcbiAqIGBVaW50OEFycmF5YCwgc28gdGhlIHJldHVybmVkIGluc3RhbmNlcyB3aWxsIGhhdmUgYWxsIHRoZSBub2RlIGBCdWZmZXJgIG1ldGhvZHNcbiAqIGFuZCB0aGUgYFVpbnQ4QXJyYXlgIG1ldGhvZHMuIFNxdWFyZSBicmFja2V0IG5vdGF0aW9uIHdvcmtzIGFzIGV4cGVjdGVkIC0tIGl0XG4gKiByZXR1cm5zIGEgc2luZ2xlIG9jdGV0LlxuICpcbiAqIFRoZSBgVWludDhBcnJheWAgcHJvdG90eXBlIHJlbWFpbnMgdW5tb2RpZmllZC5cbiAqL1xuXG5mdW5jdGlvbiBCdWZmZXIgKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIC8vIENvbW1vbiBjYXNlLlxuICBpZiAodHlwZW9mIGFyZyA9PT0gJ251bWJlcicpIHtcbiAgICBpZiAodHlwZW9mIGVuY29kaW5nT3JPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAnVGhlIFwic3RyaW5nXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIHN0cmluZy4gUmVjZWl2ZWQgdHlwZSBudW1iZXInXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBhbGxvY1Vuc2FmZShhcmcpXG4gIH1cbiAgcmV0dXJuIGZyb20oYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cbkJ1ZmZlci5wb29sU2l6ZSA9IDgxOTIgLy8gbm90IHVzZWQgYnkgdGhpcyBpbXBsZW1lbnRhdGlvblxuXG5mdW5jdGlvbiBmcm9tICh2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGZyb21TdHJpbmcodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQpXG4gIH1cblxuICBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KHZhbHVlKSkge1xuICAgIHJldHVybiBmcm9tQXJyYXlWaWV3KHZhbHVlKVxuICB9XG5cbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgJ1RoZSBmaXJzdCBhcmd1bWVudCBtdXN0IGJlIG9uZSBvZiB0eXBlIHN0cmluZywgQnVmZmVyLCBBcnJheUJ1ZmZlciwgQXJyYXksICcgK1xuICAgICAgJ29yIEFycmF5LWxpa2UgT2JqZWN0LiBSZWNlaXZlZCB0eXBlICcgKyAodHlwZW9mIHZhbHVlKVxuICAgIClcbiAgfVxuXG4gIGlmIChpc0luc3RhbmNlKHZhbHVlLCBBcnJheUJ1ZmZlcikgfHxcbiAgICAgICh2YWx1ZSAmJiBpc0luc3RhbmNlKHZhbHVlLmJ1ZmZlciwgQXJyYXlCdWZmZXIpKSkge1xuICAgIHJldHVybiBmcm9tQXJyYXlCdWZmZXIodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIGlmICh0eXBlb2YgU2hhcmVkQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAoaXNJbnN0YW5jZSh2YWx1ZSwgU2hhcmVkQXJyYXlCdWZmZXIpIHx8XG4gICAgICAodmFsdWUgJiYgaXNJbnN0YW5jZSh2YWx1ZS5idWZmZXIsIFNoYXJlZEFycmF5QnVmZmVyKSkpKSB7XG4gICAgcmV0dXJuIGZyb21BcnJheUJ1ZmZlcih2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgJ1RoZSBcInZhbHVlXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgb2YgdHlwZSBudW1iZXIuIFJlY2VpdmVkIHR5cGUgbnVtYmVyJ1xuICAgIClcbiAgfVxuXG4gIGNvbnN0IHZhbHVlT2YgPSB2YWx1ZS52YWx1ZU9mICYmIHZhbHVlLnZhbHVlT2YoKVxuICBpZiAodmFsdWVPZiAhPSBudWxsICYmIHZhbHVlT2YgIT09IHZhbHVlKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5mcm9tKHZhbHVlT2YsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIGNvbnN0IGIgPSBmcm9tT2JqZWN0KHZhbHVlKVxuICBpZiAoYikgcmV0dXJuIGJcblxuICBpZiAodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvUHJpbWl0aXZlICE9IG51bGwgJiZcbiAgICAgIHR5cGVvZiB2YWx1ZVtTeW1ib2wudG9QcmltaXRpdmVdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5mcm9tKHZhbHVlW1N5bWJvbC50b1ByaW1pdGl2ZV0oJ3N0cmluZycpLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICdUaGUgZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBvbmUgb2YgdHlwZSBzdHJpbmcsIEJ1ZmZlciwgQXJyYXlCdWZmZXIsIEFycmF5LCAnICtcbiAgICAnb3IgQXJyYXktbGlrZSBPYmplY3QuIFJlY2VpdmVkIHR5cGUgJyArICh0eXBlb2YgdmFsdWUpXG4gIClcbn1cblxuLyoqXG4gKiBGdW5jdGlvbmFsbHkgZXF1aXZhbGVudCB0byBCdWZmZXIoYXJnLCBlbmNvZGluZykgYnV0IHRocm93cyBhIFR5cGVFcnJvclxuICogaWYgdmFsdWUgaXMgYSBudW1iZXIuXG4gKiBCdWZmZXIuZnJvbShzdHJbLCBlbmNvZGluZ10pXG4gKiBCdWZmZXIuZnJvbShhcnJheSlcbiAqIEJ1ZmZlci5mcm9tKGJ1ZmZlcilcbiAqIEJ1ZmZlci5mcm9tKGFycmF5QnVmZmVyWywgYnl0ZU9mZnNldFssIGxlbmd0aF1dKVxuICoqL1xuQnVmZmVyLmZyb20gPSBmdW5jdGlvbiAodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gZnJvbSh2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxufVxuXG4vLyBOb3RlOiBDaGFuZ2UgcHJvdG90eXBlICphZnRlciogQnVmZmVyLmZyb20gaXMgZGVmaW5lZCB0byB3b3JrYXJvdW5kIENocm9tZSBidWc6XG4vLyBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2J1ZmZlci9wdWxsLzE0OFxuT2JqZWN0LnNldFByb3RvdHlwZU9mKEJ1ZmZlci5wcm90b3R5cGUsIFVpbnQ4QXJyYXkucHJvdG90eXBlKVxuT2JqZWN0LnNldFByb3RvdHlwZU9mKEJ1ZmZlciwgVWludDhBcnJheSlcblxuZnVuY3Rpb24gYXNzZXJ0U2l6ZSAoc2l6ZSkge1xuICBpZiAodHlwZW9mIHNpemUgIT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJzaXplXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIG51bWJlcicpXG4gIH0gZWxzZSBpZiAoc2l6ZSA8IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIFwiJyArIHNpemUgKyAnXCIgaXMgaW52YWxpZCBmb3Igb3B0aW9uIFwic2l6ZVwiJylcbiAgfVxufVxuXG5mdW5jdGlvbiBhbGxvYyAoc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgYXNzZXJ0U2l6ZShzaXplKVxuICBpZiAoc2l6ZSA8PSAwKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcihzaXplKVxuICB9XG4gIGlmIChmaWxsICE9PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPbmx5IHBheSBhdHRlbnRpb24gdG8gZW5jb2RpbmcgaWYgaXQncyBhIHN0cmluZy4gVGhpc1xuICAgIC8vIHByZXZlbnRzIGFjY2lkZW50YWxseSBzZW5kaW5nIGluIGEgbnVtYmVyIHRoYXQgd291bGRcbiAgICAvLyBiZSBpbnRlcnByZXRlZCBhcyBhIHN0YXJ0IG9mZnNldC5cbiAgICByZXR1cm4gdHlwZW9mIGVuY29kaW5nID09PSAnc3RyaW5nJ1xuICAgICAgPyBjcmVhdGVCdWZmZXIoc2l6ZSkuZmlsbChmaWxsLCBlbmNvZGluZylcbiAgICAgIDogY3JlYXRlQnVmZmVyKHNpemUpLmZpbGwoZmlsbClcbiAgfVxuICByZXR1cm4gY3JlYXRlQnVmZmVyKHNpemUpXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBmaWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICogYWxsb2Moc2l6ZVssIGZpbGxbLCBlbmNvZGluZ11dKVxuICoqL1xuQnVmZmVyLmFsbG9jID0gZnVuY3Rpb24gKHNpemUsIGZpbGwsIGVuY29kaW5nKSB7XG4gIHJldHVybiBhbGxvYyhzaXplLCBmaWxsLCBlbmNvZGluZylcbn1cblxuZnVuY3Rpb24gYWxsb2NVbnNhZmUgKHNpemUpIHtcbiAgYXNzZXJ0U2l6ZShzaXplKVxuICByZXR1cm4gY3JlYXRlQnVmZmVyKHNpemUgPCAwID8gMCA6IGNoZWNrZWQoc2l6ZSkgfCAwKVxufVxuXG4vKipcbiAqIEVxdWl2YWxlbnQgdG8gQnVmZmVyKG51bSksIGJ5IGRlZmF1bHQgY3JlYXRlcyBhIG5vbi16ZXJvLWZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKiAqL1xuQnVmZmVyLmFsbG9jVW5zYWZlID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgcmV0dXJuIGFsbG9jVW5zYWZlKHNpemUpXG59XG4vKipcbiAqIEVxdWl2YWxlbnQgdG8gU2xvd0J1ZmZlcihudW0pLCBieSBkZWZhdWx0IGNyZWF0ZXMgYSBub24temVyby1maWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICovXG5CdWZmZXIuYWxsb2NVbnNhZmVTbG93ID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgcmV0dXJuIGFsbG9jVW5zYWZlKHNpemUpXG59XG5cbmZ1bmN0aW9uIGZyb21TdHJpbmcgKHN0cmluZywgZW5jb2RpbmcpIHtcbiAgaWYgKHR5cGVvZiBlbmNvZGluZyAhPT0gJ3N0cmluZycgfHwgZW5jb2RpbmcgPT09ICcnKSB7XG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgfVxuXG4gIGlmICghQnVmZmVyLmlzRW5jb2RpbmcoZW5jb2RpbmcpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICB9XG5cbiAgY29uc3QgbGVuZ3RoID0gYnl0ZUxlbmd0aChzdHJpbmcsIGVuY29kaW5nKSB8IDBcbiAgbGV0IGJ1ZiA9IGNyZWF0ZUJ1ZmZlcihsZW5ndGgpXG5cbiAgY29uc3QgYWN0dWFsID0gYnVmLndyaXRlKHN0cmluZywgZW5jb2RpbmcpXG5cbiAgaWYgKGFjdHVhbCAhPT0gbGVuZ3RoKSB7XG4gICAgLy8gV3JpdGluZyBhIGhleCBzdHJpbmcsIGZvciBleGFtcGxlLCB0aGF0IGNvbnRhaW5zIGludmFsaWQgY2hhcmFjdGVycyB3aWxsXG4gICAgLy8gY2F1c2UgZXZlcnl0aGluZyBhZnRlciB0aGUgZmlyc3QgaW52YWxpZCBjaGFyYWN0ZXIgdG8gYmUgaWdub3JlZC4gKGUuZy5cbiAgICAvLyAnYWJ4eGNkJyB3aWxsIGJlIHRyZWF0ZWQgYXMgJ2FiJylcbiAgICBidWYgPSBidWYuc2xpY2UoMCwgYWN0dWFsKVxuICB9XG5cbiAgcmV0dXJuIGJ1ZlxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlMaWtlIChhcnJheSkge1xuICBjb25zdCBsZW5ndGggPSBhcnJheS5sZW5ndGggPCAwID8gMCA6IGNoZWNrZWQoYXJyYXkubGVuZ3RoKSB8IDBcbiAgY29uc3QgYnVmID0gY3JlYXRlQnVmZmVyKGxlbmd0aClcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgIGJ1ZltpXSA9IGFycmF5W2ldICYgMjU1XG4gIH1cbiAgcmV0dXJuIGJ1ZlxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlWaWV3IChhcnJheVZpZXcpIHtcbiAgaWYgKGlzSW5zdGFuY2UoYXJyYXlWaWV3LCBVaW50OEFycmF5KSkge1xuICAgIGNvbnN0IGNvcHkgPSBuZXcgVWludDhBcnJheShhcnJheVZpZXcpXG4gICAgcmV0dXJuIGZyb21BcnJheUJ1ZmZlcihjb3B5LmJ1ZmZlciwgY29weS5ieXRlT2Zmc2V0LCBjb3B5LmJ5dGVMZW5ndGgpXG4gIH1cbiAgcmV0dXJuIGZyb21BcnJheUxpa2UoYXJyYXlWaWV3KVxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlCdWZmZXIgKGFycmF5LCBieXRlT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKGJ5dGVPZmZzZXQgPCAwIHx8IGFycmF5LmJ5dGVMZW5ndGggPCBieXRlT2Zmc2V0KSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1wib2Zmc2V0XCIgaXMgb3V0c2lkZSBvZiBidWZmZXIgYm91bmRzJylcbiAgfVxuXG4gIGlmIChhcnJheS5ieXRlTGVuZ3RoIDwgYnl0ZU9mZnNldCArIChsZW5ndGggfHwgMCkpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXCJsZW5ndGhcIiBpcyBvdXRzaWRlIG9mIGJ1ZmZlciBib3VuZHMnKVxuICB9XG5cbiAgbGV0IGJ1ZlxuICBpZiAoYnl0ZU9mZnNldCA9PT0gdW5kZWZpbmVkICYmIGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYnVmID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXkpXG4gIH0gZWxzZSBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBidWYgPSBuZXcgVWludDhBcnJheShhcnJheSwgYnl0ZU9mZnNldClcbiAgfSBlbHNlIHtcbiAgICBidWYgPSBuZXcgVWludDhBcnJheShhcnJheSwgYnl0ZU9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgLy8gUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2VcbiAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGJ1ZiwgQnVmZmVyLnByb3RvdHlwZSlcblxuICByZXR1cm4gYnVmXG59XG5cbmZ1bmN0aW9uIGZyb21PYmplY3QgKG9iaikge1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKG9iaikpIHtcbiAgICBjb25zdCBsZW4gPSBjaGVja2VkKG9iai5sZW5ndGgpIHwgMFxuICAgIGNvbnN0IGJ1ZiA9IGNyZWF0ZUJ1ZmZlcihsZW4pXG5cbiAgICBpZiAoYnVmLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGJ1ZlxuICAgIH1cblxuICAgIG9iai5jb3B5KGJ1ZiwgMCwgMCwgbGVuKVxuICAgIHJldHVybiBidWZcbiAgfVxuXG4gIGlmIChvYmoubGVuZ3RoICE9PSB1bmRlZmluZWQpIHtcbiAgICBpZiAodHlwZW9mIG9iai5sZW5ndGggIT09ICdudW1iZXInIHx8IG51bWJlcklzTmFOKG9iai5sZW5ndGgpKSB7XG4gICAgICByZXR1cm4gY3JlYXRlQnVmZmVyKDApXG4gICAgfVxuICAgIHJldHVybiBmcm9tQXJyYXlMaWtlKG9iailcbiAgfVxuXG4gIGlmIChvYmoudHlwZSA9PT0gJ0J1ZmZlcicgJiYgQXJyYXkuaXNBcnJheShvYmouZGF0YSkpIHtcbiAgICByZXR1cm4gZnJvbUFycmF5TGlrZShvYmouZGF0YSlcbiAgfVxufVxuXG5mdW5jdGlvbiBjaGVja2VkIChsZW5ndGgpIHtcbiAgLy8gTm90ZTogY2Fubm90IHVzZSBgbGVuZ3RoIDwgS19NQVhfTEVOR1RIYCBoZXJlIGJlY2F1c2UgdGhhdCBmYWlscyB3aGVuXG4gIC8vIGxlbmd0aCBpcyBOYU4gKHdoaWNoIGlzIG90aGVyd2lzZSBjb2VyY2VkIHRvIHplcm8uKVxuICBpZiAobGVuZ3RoID49IEtfTUFYX0xFTkdUSCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdBdHRlbXB0IHRvIGFsbG9jYXRlIEJ1ZmZlciBsYXJnZXIgdGhhbiBtYXhpbXVtICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICdzaXplOiAweCcgKyBLX01BWF9MRU5HVEgudG9TdHJpbmcoMTYpICsgJyBieXRlcycpXG4gIH1cbiAgcmV0dXJuIGxlbmd0aCB8IDBcbn1cblxuZnVuY3Rpb24gU2xvd0J1ZmZlciAobGVuZ3RoKSB7XG4gIGlmICgrbGVuZ3RoICE9IGxlbmd0aCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGVxZXFlcVxuICAgIGxlbmd0aCA9IDBcbiAgfVxuICByZXR1cm4gQnVmZmVyLmFsbG9jKCtsZW5ndGgpXG59XG5cbkJ1ZmZlci5pc0J1ZmZlciA9IGZ1bmN0aW9uIGlzQnVmZmVyIChiKSB7XG4gIHJldHVybiBiICE9IG51bGwgJiYgYi5faXNCdWZmZXIgPT09IHRydWUgJiZcbiAgICBiICE9PSBCdWZmZXIucHJvdG90eXBlIC8vIHNvIEJ1ZmZlci5pc0J1ZmZlcihCdWZmZXIucHJvdG90eXBlKSB3aWxsIGJlIGZhbHNlXG59XG5cbkJ1ZmZlci5jb21wYXJlID0gZnVuY3Rpb24gY29tcGFyZSAoYSwgYikge1xuICBpZiAoaXNJbnN0YW5jZShhLCBVaW50OEFycmF5KSkgYSA9IEJ1ZmZlci5mcm9tKGEsIGEub2Zmc2V0LCBhLmJ5dGVMZW5ndGgpXG4gIGlmIChpc0luc3RhbmNlKGIsIFVpbnQ4QXJyYXkpKSBiID0gQnVmZmVyLmZyb20oYiwgYi5vZmZzZXQsIGIuYnl0ZUxlbmd0aClcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYSkgfHwgIUJ1ZmZlci5pc0J1ZmZlcihiKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAnVGhlIFwiYnVmMVwiLCBcImJ1ZjJcIiBhcmd1bWVudHMgbXVzdCBiZSBvbmUgb2YgdHlwZSBCdWZmZXIgb3IgVWludDhBcnJheSdcbiAgICApXG4gIH1cblxuICBpZiAoYSA9PT0gYikgcmV0dXJuIDBcblxuICBsZXQgeCA9IGEubGVuZ3RoXG4gIGxldCB5ID0gYi5sZW5ndGhcblxuICBmb3IgKGxldCBpID0gMCwgbGVuID0gTWF0aC5taW4oeCwgeSk7IGkgPCBsZW47ICsraSkge1xuICAgIGlmIChhW2ldICE9PSBiW2ldKSB7XG4gICAgICB4ID0gYVtpXVxuICAgICAgeSA9IGJbaV1cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgaWYgKHggPCB5KSByZXR1cm4gLTFcbiAgaWYgKHkgPCB4KSByZXR1cm4gMVxuICByZXR1cm4gMFxufVxuXG5CdWZmZXIuaXNFbmNvZGluZyA9IGZ1bmN0aW9uIGlzRW5jb2RpbmcgKGVuY29kaW5nKSB7XG4gIHN3aXRjaCAoU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgY2FzZSAnYXNjaWknOlxuICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5CdWZmZXIuY29uY2F0ID0gZnVuY3Rpb24gY29uY2F0IChsaXN0LCBsZW5ndGgpIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KGxpc3QpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0XCIgYXJndW1lbnQgbXVzdCBiZSBhbiBBcnJheSBvZiBCdWZmZXJzJylcbiAgfVxuXG4gIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBCdWZmZXIuYWxsb2MoMClcbiAgfVxuXG4gIGxldCBpXG4gIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGxlbmd0aCA9IDBcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7ICsraSkge1xuICAgICAgbGVuZ3RoICs9IGxpc3RbaV0ubGVuZ3RoXG4gICAgfVxuICB9XG5cbiAgY29uc3QgYnVmZmVyID0gQnVmZmVyLmFsbG9jVW5zYWZlKGxlbmd0aClcbiAgbGV0IHBvcyA9IDBcbiAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICBsZXQgYnVmID0gbGlzdFtpXVxuICAgIGlmIChpc0luc3RhbmNlKGJ1ZiwgVWludDhBcnJheSkpIHtcbiAgICAgIGlmIChwb3MgKyBidWYubGVuZ3RoID4gYnVmZmVyLmxlbmd0aCkge1xuICAgICAgICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSBidWYgPSBCdWZmZXIuZnJvbShidWYpXG4gICAgICAgIGJ1Zi5jb3B5KGJ1ZmZlciwgcG9zKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgVWludDhBcnJheS5wcm90b3R5cGUuc2V0LmNhbGwoXG4gICAgICAgICAgYnVmZmVyLFxuICAgICAgICAgIGJ1ZixcbiAgICAgICAgICBwb3NcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RcIiBhcmd1bWVudCBtdXN0IGJlIGFuIEFycmF5IG9mIEJ1ZmZlcnMnKVxuICAgIH0gZWxzZSB7XG4gICAgICBidWYuY29weShidWZmZXIsIHBvcylcbiAgICB9XG4gICAgcG9zICs9IGJ1Zi5sZW5ndGhcbiAgfVxuICByZXR1cm4gYnVmZmVyXG59XG5cbmZ1bmN0aW9uIGJ5dGVMZW5ndGggKHN0cmluZywgZW5jb2RpbmcpIHtcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihzdHJpbmcpKSB7XG4gICAgcmV0dXJuIHN0cmluZy5sZW5ndGhcbiAgfVxuICBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KHN0cmluZykgfHwgaXNJbnN0YW5jZShzdHJpbmcsIEFycmF5QnVmZmVyKSkge1xuICAgIHJldHVybiBzdHJpbmcuYnl0ZUxlbmd0aFxuICB9XG4gIGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAnVGhlIFwic3RyaW5nXCIgYXJndW1lbnQgbXVzdCBiZSBvbmUgb2YgdHlwZSBzdHJpbmcsIEJ1ZmZlciwgb3IgQXJyYXlCdWZmZXIuICcgK1xuICAgICAgJ1JlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBzdHJpbmdcbiAgICApXG4gIH1cblxuICBjb25zdCBsZW4gPSBzdHJpbmcubGVuZ3RoXG4gIGNvbnN0IG11c3RNYXRjaCA9IChhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gPT09IHRydWUpXG4gIGlmICghbXVzdE1hdGNoICYmIGxlbiA9PT0gMCkgcmV0dXJuIDBcblxuICAvLyBVc2UgYSBmb3IgbG9vcCB0byBhdm9pZCByZWN1cnNpb25cbiAgbGV0IGxvd2VyZWRDYXNlID0gZmFsc2VcbiAgZm9yICg7Oykge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGVuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuIHV0ZjhUb0J5dGVzKHN0cmluZykubGVuZ3RoXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gbGVuICogMlxuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGxlbiA+Pj4gMVxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgcmV0dXJuIGJhc2U2NFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGhcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkge1xuICAgICAgICAgIHJldHVybiBtdXN0TWF0Y2ggPyAtMSA6IHV0ZjhUb0J5dGVzKHN0cmluZykubGVuZ3RoIC8vIGFzc3VtZSB1dGY4XG4gICAgICAgIH1cbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cbkJ1ZmZlci5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuXG5mdW5jdGlvbiBzbG93VG9TdHJpbmcgKGVuY29kaW5nLCBzdGFydCwgZW5kKSB7XG4gIGxldCBsb3dlcmVkQ2FzZSA9IGZhbHNlXG5cbiAgLy8gTm8gbmVlZCB0byB2ZXJpZnkgdGhhdCBcInRoaXMubGVuZ3RoIDw9IE1BWF9VSU5UMzJcIiBzaW5jZSBpdCdzIGEgcmVhZC1vbmx5XG4gIC8vIHByb3BlcnR5IG9mIGEgdHlwZWQgYXJyYXkuXG5cbiAgLy8gVGhpcyBiZWhhdmVzIG5laXRoZXIgbGlrZSBTdHJpbmcgbm9yIFVpbnQ4QXJyYXkgaW4gdGhhdCB3ZSBzZXQgc3RhcnQvZW5kXG4gIC8vIHRvIHRoZWlyIHVwcGVyL2xvd2VyIGJvdW5kcyBpZiB0aGUgdmFsdWUgcGFzc2VkIGlzIG91dCBvZiByYW5nZS5cbiAgLy8gdW5kZWZpbmVkIGlzIGhhbmRsZWQgc3BlY2lhbGx5IGFzIHBlciBFQ01BLTI2MiA2dGggRWRpdGlvbixcbiAgLy8gU2VjdGlvbiAxMy4zLjMuNyBSdW50aW1lIFNlbWFudGljczogS2V5ZWRCaW5kaW5nSW5pdGlhbGl6YXRpb24uXG4gIGlmIChzdGFydCA9PT0gdW5kZWZpbmVkIHx8IHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ID0gMFxuICB9XG4gIC8vIFJldHVybiBlYXJseSBpZiBzdGFydCA+IHRoaXMubGVuZ3RoLiBEb25lIGhlcmUgdG8gcHJldmVudCBwb3RlbnRpYWwgdWludDMyXG4gIC8vIGNvZXJjaW9uIGZhaWwgYmVsb3cuXG4gIGlmIChzdGFydCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICBpZiAoZW5kID09PSB1bmRlZmluZWQgfHwgZW5kID4gdGhpcy5sZW5ndGgpIHtcbiAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICB9XG5cbiAgaWYgKGVuZCA8PSAwKSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICAvLyBGb3JjZSBjb2VyY2lvbiB0byB1aW50MzIuIFRoaXMgd2lsbCBhbHNvIGNvZXJjZSBmYWxzZXkvTmFOIHZhbHVlcyB0byAwLlxuICBlbmQgPj4+PSAwXG4gIHN0YXJ0ID4+Pj0gMFxuXG4gIGlmIChlbmQgPD0gc3RhcnQpIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIGlmICghZW5jb2RpbmcpIGVuY29kaW5nID0gJ3V0ZjgnXG5cbiAgd2hpbGUgKHRydWUpIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gaGV4U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICAgIHJldHVybiB1dGY4U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgICByZXR1cm4gYXNjaWlTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxhdGluMVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIHJldHVybiBiYXNlNjRTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gdXRmMTZsZVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgICAgICBlbmNvZGluZyA9IChlbmNvZGluZyArICcnKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuXG4vLyBUaGlzIHByb3BlcnR5IGlzIHVzZWQgYnkgYEJ1ZmZlci5pc0J1ZmZlcmAgKGFuZCB0aGUgYGlzLWJ1ZmZlcmAgbnBtIHBhY2thZ2UpXG4vLyB0byBkZXRlY3QgYSBCdWZmZXIgaW5zdGFuY2UuIEl0J3Mgbm90IHBvc3NpYmxlIHRvIHVzZSBgaW5zdGFuY2VvZiBCdWZmZXJgXG4vLyByZWxpYWJseSBpbiBhIGJyb3dzZXJpZnkgY29udGV4dCBiZWNhdXNlIHRoZXJlIGNvdWxkIGJlIG11bHRpcGxlIGRpZmZlcmVudFxuLy8gY29waWVzIG9mIHRoZSAnYnVmZmVyJyBwYWNrYWdlIGluIHVzZS4gVGhpcyBtZXRob2Qgd29ya3MgZXZlbiBmb3IgQnVmZmVyXG4vLyBpbnN0YW5jZXMgdGhhdCB3ZXJlIGNyZWF0ZWQgZnJvbSBhbm90aGVyIGNvcHkgb2YgdGhlIGBidWZmZXJgIHBhY2thZ2UuXG4vLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mZXJvc3MvYnVmZmVyL2lzc3Vlcy8xNTRcbkJ1ZmZlci5wcm90b3R5cGUuX2lzQnVmZmVyID0gdHJ1ZVxuXG5mdW5jdGlvbiBzd2FwIChiLCBuLCBtKSB7XG4gIGNvbnN0IGkgPSBiW25dXG4gIGJbbl0gPSBiW21dXG4gIGJbbV0gPSBpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDE2ID0gZnVuY3Rpb24gc3dhcDE2ICgpIHtcbiAgY29uc3QgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDIgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDE2LWJpdHMnKVxuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpICs9IDIpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyAxKVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDMyID0gZnVuY3Rpb24gc3dhcDMyICgpIHtcbiAgY29uc3QgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDQgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDMyLWJpdHMnKVxuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpICs9IDQpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyAzKVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyAyKVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDY0ID0gZnVuY3Rpb24gc3dhcDY0ICgpIHtcbiAgY29uc3QgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDggIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDY0LWJpdHMnKVxuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpICs9IDgpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyA3KVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyA2KVxuICAgIHN3YXAodGhpcywgaSArIDIsIGkgKyA1KVxuICAgIHN3YXAodGhpcywgaSArIDMsIGkgKyA0KVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyAoKSB7XG4gIGNvbnN0IGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW5ndGggPT09IDApIHJldHVybiAnJ1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHV0ZjhTbGljZSh0aGlzLCAwLCBsZW5ndGgpXG4gIHJldHVybiBzbG93VG9TdHJpbmcuYXBwbHkodGhpcywgYXJndW1lbnRzKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvTG9jYWxlU3RyaW5nID0gQnVmZmVyLnByb3RvdHlwZS50b1N0cmluZ1xuXG5CdWZmZXIucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIGVxdWFscyAoYikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlcicpXG4gIGlmICh0aGlzID09PSBiKSByZXR1cm4gdHJ1ZVxuICByZXR1cm4gQnVmZmVyLmNvbXBhcmUodGhpcywgYikgPT09IDBcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbnNwZWN0ID0gZnVuY3Rpb24gaW5zcGVjdCAoKSB7XG4gIGxldCBzdHIgPSAnJ1xuICBjb25zdCBtYXggPSBleHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTXG4gIHN0ciA9IHRoaXMudG9TdHJpbmcoJ2hleCcsIDAsIG1heCkucmVwbGFjZSgvKC57Mn0pL2csICckMSAnKS50cmltKClcbiAgaWYgKHRoaXMubGVuZ3RoID4gbWF4KSBzdHIgKz0gJyAuLi4gJ1xuICByZXR1cm4gJzxCdWZmZXIgJyArIHN0ciArICc+J1xufVxuaWYgKGN1c3RvbUluc3BlY3RTeW1ib2wpIHtcbiAgQnVmZmVyLnByb3RvdHlwZVtjdXN0b21JbnNwZWN0U3ltYm9sXSA9IEJ1ZmZlci5wcm90b3R5cGUuaW5zcGVjdFxufVxuXG5CdWZmZXIucHJvdG90eXBlLmNvbXBhcmUgPSBmdW5jdGlvbiBjb21wYXJlICh0YXJnZXQsIHN0YXJ0LCBlbmQsIHRoaXNTdGFydCwgdGhpc0VuZCkge1xuICBpZiAoaXNJbnN0YW5jZSh0YXJnZXQsIFVpbnQ4QXJyYXkpKSB7XG4gICAgdGFyZ2V0ID0gQnVmZmVyLmZyb20odGFyZ2V0LCB0YXJnZXQub2Zmc2V0LCB0YXJnZXQuYnl0ZUxlbmd0aClcbiAgfVxuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcih0YXJnZXQpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICdUaGUgXCJ0YXJnZXRcIiBhcmd1bWVudCBtdXN0IGJlIG9uZSBvZiB0eXBlIEJ1ZmZlciBvciBVaW50OEFycmF5LiAnICtcbiAgICAgICdSZWNlaXZlZCB0eXBlICcgKyAodHlwZW9mIHRhcmdldClcbiAgICApXG4gIH1cblxuICBpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCkge1xuICAgIHN0YXJ0ID0gMFxuICB9XG4gIGlmIChlbmQgPT09IHVuZGVmaW5lZCkge1xuICAgIGVuZCA9IHRhcmdldCA/IHRhcmdldC5sZW5ndGggOiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpc1N0YXJ0ID0gMFxuICB9XG4gIGlmICh0aGlzRW5kID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzRW5kID0gdGhpcy5sZW5ndGhcbiAgfVxuXG4gIGlmIChzdGFydCA8IDAgfHwgZW5kID4gdGFyZ2V0Lmxlbmd0aCB8fCB0aGlzU3RhcnQgPCAwIHx8IHRoaXNFbmQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdvdXQgb2YgcmFuZ2UgaW5kZXgnKVxuICB9XG5cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kICYmIHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kKSB7XG4gICAgcmV0dXJuIC0xXG4gIH1cbiAgaWYgKHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAxXG4gIH1cblxuICBzdGFydCA+Pj49IDBcbiAgZW5kID4+Pj0gMFxuICB0aGlzU3RhcnQgPj4+PSAwXG4gIHRoaXNFbmQgPj4+PSAwXG5cbiAgaWYgKHRoaXMgPT09IHRhcmdldCkgcmV0dXJuIDBcblxuICBsZXQgeCA9IHRoaXNFbmQgLSB0aGlzU3RhcnRcbiAgbGV0IHkgPSBlbmQgLSBzdGFydFxuICBjb25zdCBsZW4gPSBNYXRoLm1pbih4LCB5KVxuXG4gIGNvbnN0IHRoaXNDb3B5ID0gdGhpcy5zbGljZSh0aGlzU3RhcnQsIHRoaXNFbmQpXG4gIGNvbnN0IHRhcmdldENvcHkgPSB0YXJnZXQuc2xpY2Uoc3RhcnQsIGVuZClcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKHRoaXNDb3B5W2ldICE9PSB0YXJnZXRDb3B5W2ldKSB7XG4gICAgICB4ID0gdGhpc0NvcHlbaV1cbiAgICAgIHkgPSB0YXJnZXRDb3B5W2ldXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGlmICh4IDwgeSkgcmV0dXJuIC0xXG4gIGlmICh5IDwgeCkgcmV0dXJuIDFcbiAgcmV0dXJuIDBcbn1cblxuLy8gRmluZHMgZWl0aGVyIHRoZSBmaXJzdCBpbmRleCBvZiBgdmFsYCBpbiBgYnVmZmVyYCBhdCBvZmZzZXQgPj0gYGJ5dGVPZmZzZXRgLFxuLy8gT1IgdGhlIGxhc3QgaW5kZXggb2YgYHZhbGAgaW4gYGJ1ZmZlcmAgYXQgb2Zmc2V0IDw9IGBieXRlT2Zmc2V0YC5cbi8vXG4vLyBBcmd1bWVudHM6XG4vLyAtIGJ1ZmZlciAtIGEgQnVmZmVyIHRvIHNlYXJjaFxuLy8gLSB2YWwgLSBhIHN0cmluZywgQnVmZmVyLCBvciBudW1iZXJcbi8vIC0gYnl0ZU9mZnNldCAtIGFuIGluZGV4IGludG8gYGJ1ZmZlcmA7IHdpbGwgYmUgY2xhbXBlZCB0byBhbiBpbnQzMlxuLy8gLSBlbmNvZGluZyAtIGFuIG9wdGlvbmFsIGVuY29kaW5nLCByZWxldmFudCBpcyB2YWwgaXMgYSBzdHJpbmdcbi8vIC0gZGlyIC0gdHJ1ZSBmb3IgaW5kZXhPZiwgZmFsc2UgZm9yIGxhc3RJbmRleE9mXG5mdW5jdGlvbiBiaWRpcmVjdGlvbmFsSW5kZXhPZiAoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpIHtcbiAgLy8gRW1wdHkgYnVmZmVyIG1lYW5zIG5vIG1hdGNoXG4gIGlmIChidWZmZXIubGVuZ3RoID09PSAwKSByZXR1cm4gLTFcblxuICAvLyBOb3JtYWxpemUgYnl0ZU9mZnNldFxuICBpZiAodHlwZW9mIGJ5dGVPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgZW5jb2RpbmcgPSBieXRlT2Zmc2V0XG4gICAgYnl0ZU9mZnNldCA9IDBcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0ID4gMHg3ZmZmZmZmZikge1xuICAgIGJ5dGVPZmZzZXQgPSAweDdmZmZmZmZmXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA8IC0weDgwMDAwMDAwKSB7XG4gICAgYnl0ZU9mZnNldCA9IC0weDgwMDAwMDAwXG4gIH1cbiAgYnl0ZU9mZnNldCA9ICtieXRlT2Zmc2V0IC8vIENvZXJjZSB0byBOdW1iZXIuXG4gIGlmIChudW1iZXJJc05hTihieXRlT2Zmc2V0KSkge1xuICAgIC8vIGJ5dGVPZmZzZXQ6IGl0IGl0J3MgdW5kZWZpbmVkLCBudWxsLCBOYU4sIFwiZm9vXCIsIGV0Yywgc2VhcmNoIHdob2xlIGJ1ZmZlclxuICAgIGJ5dGVPZmZzZXQgPSBkaXIgPyAwIDogKGJ1ZmZlci5sZW5ndGggLSAxKVxuICB9XG5cbiAgLy8gTm9ybWFsaXplIGJ5dGVPZmZzZXQ6IG5lZ2F0aXZlIG9mZnNldHMgc3RhcnQgZnJvbSB0aGUgZW5kIG9mIHRoZSBidWZmZXJcbiAgaWYgKGJ5dGVPZmZzZXQgPCAwKSBieXRlT2Zmc2V0ID0gYnVmZmVyLmxlbmd0aCArIGJ5dGVPZmZzZXRcbiAgaWYgKGJ5dGVPZmZzZXQgPj0gYnVmZmVyLmxlbmd0aCkge1xuICAgIGlmIChkaXIpIHJldHVybiAtMVxuICAgIGVsc2UgYnl0ZU9mZnNldCA9IGJ1ZmZlci5sZW5ndGggLSAxXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA8IDApIHtcbiAgICBpZiAoZGlyKSBieXRlT2Zmc2V0ID0gMFxuICAgIGVsc2UgcmV0dXJuIC0xXG4gIH1cblxuICAvLyBOb3JtYWxpemUgdmFsXG4gIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgIHZhbCA9IEJ1ZmZlci5mcm9tKHZhbCwgZW5jb2RpbmcpXG4gIH1cblxuICAvLyBGaW5hbGx5LCBzZWFyY2ggZWl0aGVyIGluZGV4T2YgKGlmIGRpciBpcyB0cnVlKSBvciBsYXN0SW5kZXhPZlxuICBpZiAoQnVmZmVyLmlzQnVmZmVyKHZhbCkpIHtcbiAgICAvLyBTcGVjaWFsIGNhc2U6IGxvb2tpbmcgZm9yIGVtcHR5IHN0cmluZy9idWZmZXIgYWx3YXlzIGZhaWxzXG4gICAgaWYgKHZhbC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiAtMVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXlJbmRleE9mKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgdmFsID0gdmFsICYgMHhGRiAvLyBTZWFyY2ggZm9yIGEgYnl0ZSB2YWx1ZSBbMC0yNTVdXG4gICAgaWYgKHR5cGVvZiBVaW50OEFycmF5LnByb3RvdHlwZS5pbmRleE9mID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBpZiAoZGlyKSB7XG4gICAgICAgIHJldHVybiBVaW50OEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gVWludDhBcnJheS5wcm90b3R5cGUubGFzdEluZGV4T2YuY2FsbChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFycmF5SW5kZXhPZihidWZmZXIsIFt2YWxdLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKVxuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcigndmFsIG11c3QgYmUgc3RyaW5nLCBudW1iZXIgb3IgQnVmZmVyJylcbn1cblxuZnVuY3Rpb24gYXJyYXlJbmRleE9mIChhcnIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcikge1xuICBsZXQgaW5kZXhTaXplID0gMVxuICBsZXQgYXJyTGVuZ3RoID0gYXJyLmxlbmd0aFxuICBsZXQgdmFsTGVuZ3RoID0gdmFsLmxlbmd0aFxuXG4gIGlmIChlbmNvZGluZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZW5jb2RpbmcgPSBTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICBpZiAoZW5jb2RpbmcgPT09ICd1Y3MyJyB8fCBlbmNvZGluZyA9PT0gJ3Vjcy0yJyB8fFxuICAgICAgICBlbmNvZGluZyA9PT0gJ3V0ZjE2bGUnIHx8IGVuY29kaW5nID09PSAndXRmLTE2bGUnKSB7XG4gICAgICBpZiAoYXJyLmxlbmd0aCA8IDIgfHwgdmFsLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgcmV0dXJuIC0xXG4gICAgICB9XG4gICAgICBpbmRleFNpemUgPSAyXG4gICAgICBhcnJMZW5ndGggLz0gMlxuICAgICAgdmFsTGVuZ3RoIC89IDJcbiAgICAgIGJ5dGVPZmZzZXQgLz0gMlxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWQgKGJ1ZiwgaSkge1xuICAgIGlmIChpbmRleFNpemUgPT09IDEpIHtcbiAgICAgIHJldHVybiBidWZbaV1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGJ1Zi5yZWFkVUludDE2QkUoaSAqIGluZGV4U2l6ZSlcbiAgICB9XG4gIH1cblxuICBsZXQgaVxuICBpZiAoZGlyKSB7XG4gICAgbGV0IGZvdW5kSW5kZXggPSAtMVxuICAgIGZvciAoaSA9IGJ5dGVPZmZzZXQ7IGkgPCBhcnJMZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHJlYWQoYXJyLCBpKSA9PT0gcmVhZCh2YWwsIGZvdW5kSW5kZXggPT09IC0xID8gMCA6IGkgLSBmb3VuZEluZGV4KSkge1xuICAgICAgICBpZiAoZm91bmRJbmRleCA9PT0gLTEpIGZvdW5kSW5kZXggPSBpXG4gICAgICAgIGlmIChpIC0gZm91bmRJbmRleCArIDEgPT09IHZhbExlbmd0aCkgcmV0dXJuIGZvdW5kSW5kZXggKiBpbmRleFNpemVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChmb3VuZEluZGV4ICE9PSAtMSkgaSAtPSBpIC0gZm91bmRJbmRleFxuICAgICAgICBmb3VuZEluZGV4ID0gLTFcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGJ5dGVPZmZzZXQgKyB2YWxMZW5ndGggPiBhcnJMZW5ndGgpIGJ5dGVPZmZzZXQgPSBhcnJMZW5ndGggLSB2YWxMZW5ndGhcbiAgICBmb3IgKGkgPSBieXRlT2Zmc2V0OyBpID49IDA7IGktLSkge1xuICAgICAgbGV0IGZvdW5kID0gdHJ1ZVxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB2YWxMZW5ndGg7IGorKykge1xuICAgICAgICBpZiAocmVhZChhcnIsIGkgKyBqKSAhPT0gcmVhZCh2YWwsIGopKSB7XG4gICAgICAgICAgZm91bmQgPSBmYWxzZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gLTFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbmNsdWRlcyA9IGZ1bmN0aW9uIGluY2x1ZGVzICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiB0aGlzLmluZGV4T2YodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykgIT09IC0xXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uIGluZGV4T2YgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGJpZGlyZWN0aW9uYWxJbmRleE9mKHRoaXMsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIHRydWUpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUubGFzdEluZGV4T2YgPSBmdW5jdGlvbiBsYXN0SW5kZXhPZiAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gYmlkaXJlY3Rpb25hbEluZGV4T2YodGhpcywgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZmFsc2UpXG59XG5cbmZ1bmN0aW9uIGhleFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgb2Zmc2V0ID0gTnVtYmVyKG9mZnNldCkgfHwgMFxuICBjb25zdCByZW1haW5pbmcgPSBidWYubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gIH0gZWxzZSB7XG4gICAgbGVuZ3RoID0gTnVtYmVyKGxlbmd0aClcbiAgICBpZiAobGVuZ3RoID4gcmVtYWluaW5nKSB7XG4gICAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgICB9XG4gIH1cblxuICBjb25zdCBzdHJMZW4gPSBzdHJpbmcubGVuZ3RoXG5cbiAgaWYgKGxlbmd0aCA+IHN0ckxlbiAvIDIpIHtcbiAgICBsZW5ndGggPSBzdHJMZW4gLyAyXG4gIH1cbiAgbGV0IGlcbiAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgY29uc3QgcGFyc2VkID0gcGFyc2VJbnQoc3RyaW5nLnN1YnN0cihpICogMiwgMiksIDE2KVxuICAgIGlmIChudW1iZXJJc05hTihwYXJzZWQpKSByZXR1cm4gaVxuICAgIGJ1ZltvZmZzZXQgKyBpXSA9IHBhcnNlZFxuICB9XG4gIHJldHVybiBpXG59XG5cbmZ1bmN0aW9uIHV0ZjhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKHV0ZjhUb0J5dGVzKHN0cmluZywgYnVmLmxlbmd0aCAtIG9mZnNldCksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGFzY2lpV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcihhc2NpaVRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gYmFzZTY0V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcihiYXNlNjRUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIHVjczJXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKHV0ZjE2bGVUb0J5dGVzKHN0cmluZywgYnVmLmxlbmd0aCAtIG9mZnNldCksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiB3cml0ZSAoc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCwgZW5jb2RpbmcpIHtcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZylcbiAgaWYgKG9mZnNldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgICBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICAgIG9mZnNldCA9IDBcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZywgZW5jb2RpbmcpXG4gIH0gZWxzZSBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQgJiYgdHlwZW9mIG9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICBlbmNvZGluZyA9IG9mZnNldFxuICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gICAgb2Zmc2V0ID0gMFxuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nLCBvZmZzZXRbLCBsZW5ndGhdWywgZW5jb2RpbmddKVxuICB9IGVsc2UgaWYgKGlzRmluaXRlKG9mZnNldCkpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgICBpZiAoaXNGaW5pdGUobGVuZ3RoKSkge1xuICAgICAgbGVuZ3RoID0gbGVuZ3RoID4+PiAwXG4gICAgICBpZiAoZW5jb2RpbmcgPT09IHVuZGVmaW5lZCkgZW5jb2RpbmcgPSAndXRmOCdcbiAgICB9IGVsc2Uge1xuICAgICAgZW5jb2RpbmcgPSBsZW5ndGhcbiAgICAgIGxlbmd0aCA9IHVuZGVmaW5lZFxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnQnVmZmVyLndyaXRlKHN0cmluZywgZW5jb2RpbmcsIG9mZnNldFssIGxlbmd0aF0pIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQnXG4gICAgKVxuICB9XG5cbiAgY29uc3QgcmVtYWluaW5nID0gdGhpcy5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkIHx8IGxlbmd0aCA+IHJlbWFpbmluZykgbGVuZ3RoID0gcmVtYWluaW5nXG5cbiAgaWYgKChzdHJpbmcubGVuZ3RoID4gMCAmJiAobGVuZ3RoIDwgMCB8fCBvZmZzZXQgPCAwKSkgfHwgb2Zmc2V0ID4gdGhpcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQXR0ZW1wdCB0byB3cml0ZSBvdXRzaWRlIGJ1ZmZlciBib3VuZHMnKVxuICB9XG5cbiAgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSAndXRmOCdcblxuICBsZXQgbG93ZXJlZENhc2UgPSBmYWxzZVxuICBmb3IgKDs7KSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGhleFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgICByZXR1cm4gdXRmOFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gYXNjaWlXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICAvLyBXYXJuaW5nOiBtYXhMZW5ndGggbm90IHRha2VuIGludG8gYWNjb3VudCBpbiBiYXNlNjRXcml0ZVxuICAgICAgICByZXR1cm4gYmFzZTY0V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIHVjczJXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04gKCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdCdWZmZXInLFxuICAgIGRhdGE6IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuX2FyciB8fCB0aGlzLCAwKVxuICB9XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKHN0YXJ0ID09PSAwICYmIGVuZCA9PT0gYnVmLmxlbmd0aCkge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1Zi5zbGljZShzdGFydCwgZW5kKSlcbiAgfVxufVxuXG5mdW5jdGlvbiB1dGY4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG4gIGNvbnN0IHJlcyA9IFtdXG5cbiAgbGV0IGkgPSBzdGFydFxuICB3aGlsZSAoaSA8IGVuZCkge1xuICAgIGNvbnN0IGZpcnN0Qnl0ZSA9IGJ1ZltpXVxuICAgIGxldCBjb2RlUG9pbnQgPSBudWxsXG4gICAgbGV0IGJ5dGVzUGVyU2VxdWVuY2UgPSAoZmlyc3RCeXRlID4gMHhFRilcbiAgICAgID8gNFxuICAgICAgOiAoZmlyc3RCeXRlID4gMHhERilcbiAgICAgICAgICA/IDNcbiAgICAgICAgICA6IChmaXJzdEJ5dGUgPiAweEJGKVxuICAgICAgICAgICAgICA/IDJcbiAgICAgICAgICAgICAgOiAxXG5cbiAgICBpZiAoaSArIGJ5dGVzUGVyU2VxdWVuY2UgPD0gZW5kKSB7XG4gICAgICBsZXQgc2Vjb25kQnl0ZSwgdGhpcmRCeXRlLCBmb3VydGhCeXRlLCB0ZW1wQ29kZVBvaW50XG5cbiAgICAgIHN3aXRjaCAoYnl0ZXNQZXJTZXF1ZW5jZSkge1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgaWYgKGZpcnN0Qnl0ZSA8IDB4ODApIHtcbiAgICAgICAgICAgIGNvZGVQb2ludCA9IGZpcnN0Qnl0ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweDFGKSA8PCAweDYgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4N0YpIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICB0aGlyZEJ5dGUgPSBidWZbaSArIDJdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKHRoaXJkQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4RikgPDwgMHhDIHwgKHNlY29uZEJ5dGUgJiAweDNGKSA8PCAweDYgfCAodGhpcmRCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHg3RkYgJiYgKHRlbXBDb2RlUG9pbnQgPCAweEQ4MDAgfHwgdGVtcENvZGVQb2ludCA+IDB4REZGRikpIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICB0aGlyZEJ5dGUgPSBidWZbaSArIDJdXG4gICAgICAgICAgZm91cnRoQnl0ZSA9IGJ1ZltpICsgM11cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAodGhpcmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKGZvdXJ0aEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweEYpIDw8IDB4MTIgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpIDw8IDB4QyB8ICh0aGlyZEJ5dGUgJiAweDNGKSA8PCAweDYgfCAoZm91cnRoQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4RkZGRiAmJiB0ZW1wQ29kZVBvaW50IDwgMHgxMTAwMDApIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29kZVBvaW50ID09PSBudWxsKSB7XG4gICAgICAvLyB3ZSBkaWQgbm90IGdlbmVyYXRlIGEgdmFsaWQgY29kZVBvaW50IHNvIGluc2VydCBhXG4gICAgICAvLyByZXBsYWNlbWVudCBjaGFyIChVK0ZGRkQpIGFuZCBhZHZhbmNlIG9ubHkgMSBieXRlXG4gICAgICBjb2RlUG9pbnQgPSAweEZGRkRcbiAgICAgIGJ5dGVzUGVyU2VxdWVuY2UgPSAxXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPiAweEZGRkYpIHtcbiAgICAgIC8vIGVuY29kZSB0byB1dGYxNiAoc3Vycm9nYXRlIHBhaXIgZGFuY2UpXG4gICAgICBjb2RlUG9pbnQgLT0gMHgxMDAwMFxuICAgICAgcmVzLnB1c2goY29kZVBvaW50ID4+PiAxMCAmIDB4M0ZGIHwgMHhEODAwKVxuICAgICAgY29kZVBvaW50ID0gMHhEQzAwIHwgY29kZVBvaW50ICYgMHgzRkZcbiAgICB9XG5cbiAgICByZXMucHVzaChjb2RlUG9pbnQpXG4gICAgaSArPSBieXRlc1BlclNlcXVlbmNlXG4gIH1cblxuICByZXR1cm4gZGVjb2RlQ29kZVBvaW50c0FycmF5KHJlcylcbn1cblxuLy8gQmFzZWQgb24gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjI3NDcyNzIvNjgwNzQyLCB0aGUgYnJvd3NlciB3aXRoXG4vLyB0aGUgbG93ZXN0IGxpbWl0IGlzIENocm9tZSwgd2l0aCAweDEwMDAwIGFyZ3MuXG4vLyBXZSBnbyAxIG1hZ25pdHVkZSBsZXNzLCBmb3Igc2FmZXR5XG5jb25zdCBNQVhfQVJHVU1FTlRTX0xFTkdUSCA9IDB4MTAwMFxuXG5mdW5jdGlvbiBkZWNvZGVDb2RlUG9pbnRzQXJyYXkgKGNvZGVQb2ludHMpIHtcbiAgY29uc3QgbGVuID0gY29kZVBvaW50cy5sZW5ndGhcbiAgaWYgKGxlbiA8PSBNQVhfQVJHVU1FTlRTX0xFTkdUSCkge1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgY29kZVBvaW50cykgLy8gYXZvaWQgZXh0cmEgc2xpY2UoKVxuICB9XG5cbiAgLy8gRGVjb2RlIGluIGNodW5rcyB0byBhdm9pZCBcImNhbGwgc3RhY2sgc2l6ZSBleGNlZWRlZFwiLlxuICBsZXQgcmVzID0gJydcbiAgbGV0IGkgPSAwXG4gIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoXG4gICAgICBTdHJpbmcsXG4gICAgICBjb2RlUG9pbnRzLnNsaWNlKGksIGkgKz0gTUFYX0FSR1VNRU5UU19MRU5HVEgpXG4gICAgKVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuZnVuY3Rpb24gYXNjaWlTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGxldCByZXQgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0gJiAweDdGKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gbGF0aW4xU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBsZXQgcmV0ID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gaGV4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBjb25zdCBsZW4gPSBidWYubGVuZ3RoXG5cbiAgaWYgKCFzdGFydCB8fCBzdGFydCA8IDApIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCB8fCBlbmQgPCAwIHx8IGVuZCA+IGxlbikgZW5kID0gbGVuXG5cbiAgbGV0IG91dCA9ICcnXG4gIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgb3V0ICs9IGhleFNsaWNlTG9va3VwVGFibGVbYnVmW2ldXVxuICB9XG4gIHJldHVybiBvdXRcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgY29uc3QgYnl0ZXMgPSBidWYuc2xpY2Uoc3RhcnQsIGVuZClcbiAgbGV0IHJlcyA9ICcnXG4gIC8vIElmIGJ5dGVzLmxlbmd0aCBpcyBvZGQsIHRoZSBsYXN0IDggYml0cyBtdXN0IGJlIGlnbm9yZWQgKHNhbWUgYXMgbm9kZS5qcylcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGggLSAxOyBpICs9IDIpIHtcbiAgICByZXMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShieXRlc1tpXSArIChieXRlc1tpICsgMV0gKiAyNTYpKVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zbGljZSA9IGZ1bmN0aW9uIHNsaWNlIChzdGFydCwgZW5kKSB7XG4gIGNvbnN0IGxlbiA9IHRoaXMubGVuZ3RoXG4gIHN0YXJ0ID0gfn5zdGFydFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IGxlbiA6IH5+ZW5kXG5cbiAgaWYgKHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ICs9IGxlblxuICAgIGlmIChzdGFydCA8IDApIHN0YXJ0ID0gMFxuICB9IGVsc2UgaWYgKHN0YXJ0ID4gbGVuKSB7XG4gICAgc3RhcnQgPSBsZW5cbiAgfVxuXG4gIGlmIChlbmQgPCAwKSB7XG4gICAgZW5kICs9IGxlblxuICAgIGlmIChlbmQgPCAwKSBlbmQgPSAwXG4gIH0gZWxzZSBpZiAoZW5kID4gbGVuKSB7XG4gICAgZW5kID0gbGVuXG4gIH1cblxuICBpZiAoZW5kIDwgc3RhcnQpIGVuZCA9IHN0YXJ0XG5cbiAgY29uc3QgbmV3QnVmID0gdGhpcy5zdWJhcnJheShzdGFydCwgZW5kKVxuICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZVxuICBPYmplY3Quc2V0UHJvdG90eXBlT2YobmV3QnVmLCBCdWZmZXIucHJvdG90eXBlKVxuXG4gIHJldHVybiBuZXdCdWZcbn1cblxuLypcbiAqIE5lZWQgdG8gbWFrZSBzdXJlIHRoYXQgYnVmZmVyIGlzbid0IHRyeWluZyB0byB3cml0ZSBvdXQgb2YgYm91bmRzLlxuICovXG5mdW5jdGlvbiBjaGVja09mZnNldCAob2Zmc2V0LCBleHQsIGxlbmd0aCkge1xuICBpZiAoKG9mZnNldCAlIDEpICE9PSAwIHx8IG9mZnNldCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdvZmZzZXQgaXMgbm90IHVpbnQnKVxuICBpZiAob2Zmc2V0ICsgZXh0ID4gbGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVHJ5aW5nIHRvIGFjY2VzcyBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVpbnRMRSA9XG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50TEUgPSBmdW5jdGlvbiByZWFkVUludExFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIGxldCB2YWwgPSB0aGlzW29mZnNldF1cbiAgbGV0IG11bCA9IDFcbiAgbGV0IGkgPSAwXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgaV0gKiBtdWxcbiAgfVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVWludEJFID1cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnRCRSA9IGZ1bmN0aW9uIHJlYWRVSW50QkUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuICB9XG5cbiAgbGV0IHZhbCA9IHRoaXNbb2Zmc2V0ICsgLS1ieXRlTGVuZ3RoXVxuICBsZXQgbXVsID0gMVxuICB3aGlsZSAoYnl0ZUxlbmd0aCA+IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyAtLWJ5dGVMZW5ndGhdICogbXVsXG4gIH1cblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVpbnQ4ID1cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQ4ID0gZnVuY3Rpb24gcmVhZFVJbnQ4IChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDEsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVpbnQxNkxFID1cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkxFID0gZnVuY3Rpb24gcmVhZFVJbnQxNkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdIHwgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVWludDE2QkUgPVxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2QkUgPSBmdW5jdGlvbiByZWFkVUludDE2QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDgpIHwgdGhpc1tvZmZzZXQgKyAxXVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVaW50MzJMRSA9XG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJMRSA9IGZ1bmN0aW9uIHJlYWRVSW50MzJMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKCh0aGlzW29mZnNldF0pIHxcbiAgICAgICh0aGlzW29mZnNldCArIDFdIDw8IDgpIHxcbiAgICAgICh0aGlzW29mZnNldCArIDJdIDw8IDE2KSkgK1xuICAgICAgKHRoaXNbb2Zmc2V0ICsgM10gKiAweDEwMDAwMDApXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVpbnQzMkJFID1cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkJFID0gZnVuY3Rpb24gcmVhZFVJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdICogMHgxMDAwMDAwKSArXG4gICAgKCh0aGlzW29mZnNldCArIDFdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgOCkgfFxuICAgIHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEJpZ1VJbnQ2NExFID0gZGVmaW5lQmlnSW50TWV0aG9kKGZ1bmN0aW9uIHJlYWRCaWdVSW50NjRMRSAob2Zmc2V0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICB2YWxpZGF0ZU51bWJlcihvZmZzZXQsICdvZmZzZXQnKVxuICBjb25zdCBmaXJzdCA9IHRoaXNbb2Zmc2V0XVxuICBjb25zdCBsYXN0ID0gdGhpc1tvZmZzZXQgKyA3XVxuICBpZiAoZmlyc3QgPT09IHVuZGVmaW5lZCB8fCBsYXN0ID09PSB1bmRlZmluZWQpIHtcbiAgICBib3VuZHNFcnJvcihvZmZzZXQsIHRoaXMubGVuZ3RoIC0gOClcbiAgfVxuXG4gIGNvbnN0IGxvID0gZmlyc3QgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiA4ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMTYgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiAyNFxuXG4gIGNvbnN0IGhpID0gdGhpc1srK29mZnNldF0gK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiA4ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMTYgK1xuICAgIGxhc3QgKiAyICoqIDI0XG5cbiAgcmV0dXJuIEJpZ0ludChsbykgKyAoQmlnSW50KGhpKSA8PCBCaWdJbnQoMzIpKVxufSlcblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkQmlnVUludDY0QkUgPSBkZWZpbmVCaWdJbnRNZXRob2QoZnVuY3Rpb24gcmVhZEJpZ1VJbnQ2NEJFIChvZmZzZXQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIHZhbGlkYXRlTnVtYmVyKG9mZnNldCwgJ29mZnNldCcpXG4gIGNvbnN0IGZpcnN0ID0gdGhpc1tvZmZzZXRdXG4gIGNvbnN0IGxhc3QgPSB0aGlzW29mZnNldCArIDddXG4gIGlmIChmaXJzdCA9PT0gdW5kZWZpbmVkIHx8IGxhc3QgPT09IHVuZGVmaW5lZCkge1xuICAgIGJvdW5kc0Vycm9yKG9mZnNldCwgdGhpcy5sZW5ndGggLSA4KVxuICB9XG5cbiAgY29uc3QgaGkgPSBmaXJzdCAqIDIgKiogMjQgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiAxNiArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDggK1xuICAgIHRoaXNbKytvZmZzZXRdXG5cbiAgY29uc3QgbG8gPSB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMjQgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiAxNiArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDggK1xuICAgIGxhc3RcblxuICByZXR1cm4gKEJpZ0ludChoaSkgPDwgQmlnSW50KDMyKSkgKyBCaWdJbnQobG8pXG59KVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnRMRSA9IGZ1bmN0aW9uIHJlYWRJbnRMRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICBsZXQgdmFsID0gdGhpc1tvZmZzZXRdXG4gIGxldCBtdWwgPSAxXG4gIGxldCBpID0gMFxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIGldICogbXVsXG4gIH1cbiAgbXVsICo9IDB4ODBcblxuICBpZiAodmFsID49IG11bCkgdmFsIC09IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50QkUgPSBmdW5jdGlvbiByZWFkSW50QkUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgbGV0IGkgPSBieXRlTGVuZ3RoXG4gIGxldCBtdWwgPSAxXG4gIGxldCB2YWwgPSB0aGlzW29mZnNldCArIC0taV1cbiAgd2hpbGUgKGkgPiAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgLS1pXSAqIG11bFxuICB9XG4gIG11bCAqPSAweDgwXG5cbiAgaWYgKHZhbCA+PSBtdWwpIHZhbCAtPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aClcblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDggPSBmdW5jdGlvbiByZWFkSW50OCAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAxLCB0aGlzLmxlbmd0aClcbiAgaWYgKCEodGhpc1tvZmZzZXRdICYgMHg4MCkpIHJldHVybiAodGhpc1tvZmZzZXRdKVxuICByZXR1cm4gKCgweGZmIC0gdGhpc1tvZmZzZXRdICsgMSkgKiAtMSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZMRSA9IGZ1bmN0aW9uIHJlYWRJbnQxNkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICBjb25zdCB2YWwgPSB0aGlzW29mZnNldF0gfCAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KVxuICByZXR1cm4gKHZhbCAmIDB4ODAwMCkgPyB2YWwgfCAweEZGRkYwMDAwIDogdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2QkUgPSBmdW5jdGlvbiByZWFkSW50MTZCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgY29uc3QgdmFsID0gdGhpc1tvZmZzZXQgKyAxXSB8ICh0aGlzW29mZnNldF0gPDwgOClcbiAgcmV0dXJuICh2YWwgJiAweDgwMDApID8gdmFsIHwgMHhGRkZGMDAwMCA6IHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkxFID0gZnVuY3Rpb24gcmVhZEludDMyTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0pIHxcbiAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAzXSA8PCAyNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJCRSA9IGZ1bmN0aW9uIHJlYWRJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDI0KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEJpZ0ludDY0TEUgPSBkZWZpbmVCaWdJbnRNZXRob2QoZnVuY3Rpb24gcmVhZEJpZ0ludDY0TEUgKG9mZnNldCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgdmFsaWRhdGVOdW1iZXIob2Zmc2V0LCAnb2Zmc2V0JylcbiAgY29uc3QgZmlyc3QgPSB0aGlzW29mZnNldF1cbiAgY29uc3QgbGFzdCA9IHRoaXNbb2Zmc2V0ICsgN11cbiAgaWYgKGZpcnN0ID09PSB1bmRlZmluZWQgfHwgbGFzdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYm91bmRzRXJyb3Iob2Zmc2V0LCB0aGlzLmxlbmd0aCAtIDgpXG4gIH1cblxuICBjb25zdCB2YWwgPSB0aGlzW29mZnNldCArIDRdICtcbiAgICB0aGlzW29mZnNldCArIDVdICogMiAqKiA4ICtcbiAgICB0aGlzW29mZnNldCArIDZdICogMiAqKiAxNiArXG4gICAgKGxhc3QgPDwgMjQpIC8vIE92ZXJmbG93XG5cbiAgcmV0dXJuIChCaWdJbnQodmFsKSA8PCBCaWdJbnQoMzIpKSArXG4gICAgQmlnSW50KGZpcnN0ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogOCArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDE2ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMjQpXG59KVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRCaWdJbnQ2NEJFID0gZGVmaW5lQmlnSW50TWV0aG9kKGZ1bmN0aW9uIHJlYWRCaWdJbnQ2NEJFIChvZmZzZXQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIHZhbGlkYXRlTnVtYmVyKG9mZnNldCwgJ29mZnNldCcpXG4gIGNvbnN0IGZpcnN0ID0gdGhpc1tvZmZzZXRdXG4gIGNvbnN0IGxhc3QgPSB0aGlzW29mZnNldCArIDddXG4gIGlmIChmaXJzdCA9PT0gdW5kZWZpbmVkIHx8IGxhc3QgPT09IHVuZGVmaW5lZCkge1xuICAgIGJvdW5kc0Vycm9yKG9mZnNldCwgdGhpcy5sZW5ndGggLSA4KVxuICB9XG5cbiAgY29uc3QgdmFsID0gKGZpcnN0IDw8IDI0KSArIC8vIE92ZXJmbG93XG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDE2ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogOCArXG4gICAgdGhpc1srK29mZnNldF1cblxuICByZXR1cm4gKEJpZ0ludCh2YWwpIDw8IEJpZ0ludCgzMikpICtcbiAgICBCaWdJbnQodGhpc1srK29mZnNldF0gKiAyICoqIDI0ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMTYgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiA4ICtcbiAgICBsYXN0KVxufSlcblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRMRSA9IGZ1bmN0aW9uIHJlYWRGbG9hdExFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgdHJ1ZSwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0QkUgPSBmdW5jdGlvbiByZWFkRmxvYXRCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIGZhbHNlLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlTEUgPSBmdW5jdGlvbiByZWFkRG91YmxlTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgOCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCB0cnVlLCA1MiwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlQkUgPSBmdW5jdGlvbiByZWFkRG91YmxlQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgOCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCBmYWxzZSwgNTIsIDgpXG59XG5cbmZ1bmN0aW9uIGNoZWNrSW50IChidWYsIHZhbHVlLCBvZmZzZXQsIGV4dCwgbWF4LCBtaW4pIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYnVmKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJidWZmZXJcIiBhcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyIGluc3RhbmNlJylcbiAgaWYgKHZhbHVlID4gbWF4IHx8IHZhbHVlIDwgbWluKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXCJ2YWx1ZVwiIGFyZ3VtZW50IGlzIG91dCBvZiBib3VuZHMnKVxuICBpZiAob2Zmc2V0ICsgZXh0ID4gYnVmLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVaW50TEUgPVxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnRMRSA9IGZ1bmN0aW9uIHdyaXRlVUludExFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNvbnN0IG1heEJ5dGVzID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpIC0gMVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG1heEJ5dGVzLCAwKVxuICB9XG5cbiAgbGV0IG11bCA9IDFcbiAgbGV0IGkgPSAwXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAodmFsdWUgLyBtdWwpICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVpbnRCRSA9XG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludEJFID0gZnVuY3Rpb24gd3JpdGVVSW50QkUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY29uc3QgbWF4Qnl0ZXMgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCkgLSAxXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbWF4Qnl0ZXMsIDApXG4gIH1cblxuICBsZXQgaSA9IGJ5dGVMZW5ndGggLSAxXG4gIGxldCBtdWwgPSAxXG4gIHRoaXNbb2Zmc2V0ICsgaV0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKC0taSA+PSAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICh2YWx1ZSAvIG11bCkgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVWludDggPVxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQ4ID0gZnVuY3Rpb24gd3JpdGVVSW50OCAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDEsIDB4ZmYsIDApXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyAxXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVaW50MTZMRSA9XG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2TEUgPSBmdW5jdGlvbiB3cml0ZVVJbnQxNkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHhmZmZmLCAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVWludDE2QkUgPVxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkJFID0gZnVuY3Rpb24gd3JpdGVVSW50MTZCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4ZmZmZiwgMClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiA4KVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVpbnQzMkxFID1cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJMRSA9IGZ1bmN0aW9uIHdyaXRlVUludDMyTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweGZmZmZmZmZmLCAwKVxuICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlID4+PiAyNClcbiAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVaW50MzJCRSA9XG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyQkUgPSBmdW5jdGlvbiB3cml0ZVVJbnQzMkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHhmZmZmZmZmZiwgMClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiAyNClcbiAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDgpXG4gIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5mdW5jdGlvbiB3cnRCaWdVSW50NjRMRSAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBtaW4sIG1heCkge1xuICBjaGVja0ludEJJKHZhbHVlLCBtaW4sIG1heCwgYnVmLCBvZmZzZXQsIDcpXG5cbiAgbGV0IGxvID0gTnVtYmVyKHZhbHVlICYgQmlnSW50KDB4ZmZmZmZmZmYpKVxuICBidWZbb2Zmc2V0KytdID0gbG9cbiAgbG8gPSBsbyA+PiA4XG4gIGJ1ZltvZmZzZXQrK10gPSBsb1xuICBsbyA9IGxvID4+IDhcbiAgYnVmW29mZnNldCsrXSA9IGxvXG4gIGxvID0gbG8gPj4gOFxuICBidWZbb2Zmc2V0KytdID0gbG9cbiAgbGV0IGhpID0gTnVtYmVyKHZhbHVlID4+IEJpZ0ludCgzMikgJiBCaWdJbnQoMHhmZmZmZmZmZikpXG4gIGJ1ZltvZmZzZXQrK10gPSBoaVxuICBoaSA9IGhpID4+IDhcbiAgYnVmW29mZnNldCsrXSA9IGhpXG4gIGhpID0gaGkgPj4gOFxuICBidWZbb2Zmc2V0KytdID0gaGlcbiAgaGkgPSBoaSA+PiA4XG4gIGJ1ZltvZmZzZXQrK10gPSBoaVxuICByZXR1cm4gb2Zmc2V0XG59XG5cbmZ1bmN0aW9uIHdydEJpZ1VJbnQ2NEJFIChidWYsIHZhbHVlLCBvZmZzZXQsIG1pbiwgbWF4KSB7XG4gIGNoZWNrSW50QkkodmFsdWUsIG1pbiwgbWF4LCBidWYsIG9mZnNldCwgNylcblxuICBsZXQgbG8gPSBOdW1iZXIodmFsdWUgJiBCaWdJbnQoMHhmZmZmZmZmZikpXG4gIGJ1ZltvZmZzZXQgKyA3XSA9IGxvXG4gIGxvID0gbG8gPj4gOFxuICBidWZbb2Zmc2V0ICsgNl0gPSBsb1xuICBsbyA9IGxvID4+IDhcbiAgYnVmW29mZnNldCArIDVdID0gbG9cbiAgbG8gPSBsbyA+PiA4XG4gIGJ1ZltvZmZzZXQgKyA0XSA9IGxvXG4gIGxldCBoaSA9IE51bWJlcih2YWx1ZSA+PiBCaWdJbnQoMzIpICYgQmlnSW50KDB4ZmZmZmZmZmYpKVxuICBidWZbb2Zmc2V0ICsgM10gPSBoaVxuICBoaSA9IGhpID4+IDhcbiAgYnVmW29mZnNldCArIDJdID0gaGlcbiAgaGkgPSBoaSA+PiA4XG4gIGJ1ZltvZmZzZXQgKyAxXSA9IGhpXG4gIGhpID0gaGkgPj4gOFxuICBidWZbb2Zmc2V0XSA9IGhpXG4gIHJldHVybiBvZmZzZXQgKyA4XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVCaWdVSW50NjRMRSA9IGRlZmluZUJpZ0ludE1ldGhvZChmdW5jdGlvbiB3cml0ZUJpZ1VJbnQ2NExFICh2YWx1ZSwgb2Zmc2V0ID0gMCkge1xuICByZXR1cm4gd3J0QmlnVUludDY0TEUodGhpcywgdmFsdWUsIG9mZnNldCwgQmlnSW50KDApLCBCaWdJbnQoJzB4ZmZmZmZmZmZmZmZmZmZmZicpKVxufSlcblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUJpZ1VJbnQ2NEJFID0gZGVmaW5lQmlnSW50TWV0aG9kKGZ1bmN0aW9uIHdyaXRlQmlnVUludDY0QkUgKHZhbHVlLCBvZmZzZXQgPSAwKSB7XG4gIHJldHVybiB3cnRCaWdVSW50NjRCRSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBCaWdJbnQoMCksIEJpZ0ludCgnMHhmZmZmZmZmZmZmZmZmZmZmJykpXG59KVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50TEUgPSBmdW5jdGlvbiB3cml0ZUludExFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNvbnN0IGxpbWl0ID0gTWF0aC5wb3coMiwgKDggKiBieXRlTGVuZ3RoKSAtIDEpXG5cbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBsaW1pdCAtIDEsIC1saW1pdClcbiAgfVxuXG4gIGxldCBpID0gMFxuICBsZXQgbXVsID0gMVxuICBsZXQgc3ViID0gMFxuICB0aGlzW29mZnNldF0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICBpZiAodmFsdWUgPCAwICYmIHN1YiA9PT0gMCAmJiB0aGlzW29mZnNldCArIGkgLSAxXSAhPT0gMCkge1xuICAgICAgc3ViID0gMVxuICAgIH1cbiAgICB0aGlzW29mZnNldCArIGldID0gKCh2YWx1ZSAvIG11bCkgPj4gMCkgLSBzdWIgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50QkUgPSBmdW5jdGlvbiB3cml0ZUludEJFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNvbnN0IGxpbWl0ID0gTWF0aC5wb3coMiwgKDggKiBieXRlTGVuZ3RoKSAtIDEpXG5cbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBsaW1pdCAtIDEsIC1saW1pdClcbiAgfVxuXG4gIGxldCBpID0gYnl0ZUxlbmd0aCAtIDFcbiAgbGV0IG11bCA9IDFcbiAgbGV0IHN1YiA9IDBcbiAgdGhpc1tvZmZzZXQgKyBpXSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoLS1pID49IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICBpZiAodmFsdWUgPCAwICYmIHN1YiA9PT0gMCAmJiB0aGlzW29mZnNldCArIGkgKyAxXSAhPT0gMCkge1xuICAgICAgc3ViID0gMVxuICAgIH1cbiAgICB0aGlzW29mZnNldCArIGldID0gKCh2YWx1ZSAvIG11bCkgPj4gMCkgLSBzdWIgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50OCA9IGZ1bmN0aW9uIHdyaXRlSW50OCAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDEsIDB4N2YsIC0weDgwKVxuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmYgKyB2YWx1ZSArIDFcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2TEUgPSBmdW5jdGlvbiB3cml0ZUludDE2TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweDdmZmYsIC0weDgwMDApXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkJFID0gZnVuY3Rpb24gd3JpdGVJbnQxNkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHg3ZmZmLCAtMHg4MDAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDgpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJMRSA9IGZ1bmN0aW9uIHdyaXRlSW50MzJMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiAxNilcbiAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSA+Pj4gMjQpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkJFID0gZnVuY3Rpb24gd3JpdGVJbnQzMkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmZmZmZiArIHZhbHVlICsgMVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDI0KVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiAxNilcbiAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gOClcbiAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVCaWdJbnQ2NExFID0gZGVmaW5lQmlnSW50TWV0aG9kKGZ1bmN0aW9uIHdyaXRlQmlnSW50NjRMRSAodmFsdWUsIG9mZnNldCA9IDApIHtcbiAgcmV0dXJuIHdydEJpZ1VJbnQ2NExFKHRoaXMsIHZhbHVlLCBvZmZzZXQsIC1CaWdJbnQoJzB4ODAwMDAwMDAwMDAwMDAwMCcpLCBCaWdJbnQoJzB4N2ZmZmZmZmZmZmZmZmZmZicpKVxufSlcblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUJpZ0ludDY0QkUgPSBkZWZpbmVCaWdJbnRNZXRob2QoZnVuY3Rpb24gd3JpdGVCaWdJbnQ2NEJFICh2YWx1ZSwgb2Zmc2V0ID0gMCkge1xuICByZXR1cm4gd3J0QmlnVUludDY0QkUodGhpcywgdmFsdWUsIG9mZnNldCwgLUJpZ0ludCgnMHg4MDAwMDAwMDAwMDAwMDAwJyksIEJpZ0ludCgnMHg3ZmZmZmZmZmZmZmZmZmZmJykpXG59KVxuXG5mdW5jdGlvbiBjaGVja0lFRUU3NTQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgZXh0LCBtYXgsIG1pbikge1xuICBpZiAob2Zmc2V0ICsgZXh0ID4gYnVmLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG4gIGlmIChvZmZzZXQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbn1cblxuZnVuY3Rpb24gd3JpdGVGbG9hdCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tJRUVFNzU0KGJ1ZiwgdmFsdWUsIG9mZnNldCwgNCwgMy40MDI4MjM0NjYzODUyODg2ZSszOCwgLTMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgpXG4gIH1cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgMjMsIDQpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdExFID0gZnVuY3Rpb24gd3JpdGVGbG9hdExFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0QkUgPSBmdW5jdGlvbiB3cml0ZUZsb2F0QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gd3JpdGVEb3VibGUgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrSUVFRTc1NChidWYsIHZhbHVlLCBvZmZzZXQsIDgsIDEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4LCAtMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgpXG4gIH1cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgNTIsIDgpXG4gIHJldHVybiBvZmZzZXQgKyA4XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVMRSA9IGZ1bmN0aW9uIHdyaXRlRG91YmxlTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUJFID0gZnVuY3Rpb24gd3JpdGVEb3VibGVCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuLy8gY29weSh0YXJnZXRCdWZmZXIsIHRhcmdldFN0YXJ0PTAsIHNvdXJjZVN0YXJ0PTAsIHNvdXJjZUVuZD1idWZmZXIubGVuZ3RoKVxuQnVmZmVyLnByb3RvdHlwZS5jb3B5ID0gZnVuY3Rpb24gY29weSAodGFyZ2V0LCB0YXJnZXRTdGFydCwgc3RhcnQsIGVuZCkge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcih0YXJnZXQpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdhcmd1bWVudCBzaG91bGQgYmUgYSBCdWZmZXInKVxuICBpZiAoIXN0YXJ0KSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgJiYgZW5kICE9PSAwKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0U3RhcnQgPj0gdGFyZ2V0Lmxlbmd0aCkgdGFyZ2V0U3RhcnQgPSB0YXJnZXQubGVuZ3RoXG4gIGlmICghdGFyZ2V0U3RhcnQpIHRhcmdldFN0YXJ0ID0gMFxuICBpZiAoZW5kID4gMCAmJiBlbmQgPCBzdGFydCkgZW5kID0gc3RhcnRcblxuICAvLyBDb3B5IDAgYnl0ZXM7IHdlJ3JlIGRvbmVcbiAgaWYgKGVuZCA9PT0gc3RhcnQpIHJldHVybiAwXG4gIGlmICh0YXJnZXQubGVuZ3RoID09PSAwIHx8IHRoaXMubGVuZ3RoID09PSAwKSByZXR1cm4gMFxuXG4gIC8vIEZhdGFsIGVycm9yIGNvbmRpdGlvbnNcbiAgaWYgKHRhcmdldFN0YXJ0IDwgMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCd0YXJnZXRTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgfVxuICBpZiAoc3RhcnQgPCAwIHx8IHN0YXJ0ID49IHRoaXMubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbiAgaWYgKGVuZCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdzb3VyY2VFbmQgb3V0IG9mIGJvdW5kcycpXG5cbiAgLy8gQXJlIHdlIG9vYj9cbiAgaWYgKGVuZCA+IHRoaXMubGVuZ3RoKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0Lmxlbmd0aCAtIHRhcmdldFN0YXJ0IDwgZW5kIC0gc3RhcnQpIHtcbiAgICBlbmQgPSB0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0U3RhcnQgKyBzdGFydFxuICB9XG5cbiAgY29uc3QgbGVuID0gZW5kIC0gc3RhcnRcblxuICBpZiAodGhpcyA9PT0gdGFyZ2V0ICYmIHR5cGVvZiBVaW50OEFycmF5LnByb3RvdHlwZS5jb3B5V2l0aGluID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gVXNlIGJ1aWx0LWluIHdoZW4gYXZhaWxhYmxlLCBtaXNzaW5nIGZyb20gSUUxMVxuICAgIHRoaXMuY29weVdpdGhpbih0YXJnZXRTdGFydCwgc3RhcnQsIGVuZClcbiAgfSBlbHNlIHtcbiAgICBVaW50OEFycmF5LnByb3RvdHlwZS5zZXQuY2FsbChcbiAgICAgIHRhcmdldCxcbiAgICAgIHRoaXMuc3ViYXJyYXkoc3RhcnQsIGVuZCksXG4gICAgICB0YXJnZXRTdGFydFxuICAgIClcbiAgfVxuXG4gIHJldHVybiBsZW5cbn1cblxuLy8gVXNhZ2U6XG4vLyAgICBidWZmZXIuZmlsbChudW1iZXJbLCBvZmZzZXRbLCBlbmRdXSlcbi8vICAgIGJ1ZmZlci5maWxsKGJ1ZmZlclssIG9mZnNldFssIGVuZF1dKVxuLy8gICAgYnVmZmVyLmZpbGwoc3RyaW5nWywgb2Zmc2V0WywgZW5kXV1bLCBlbmNvZGluZ10pXG5CdWZmZXIucHJvdG90eXBlLmZpbGwgPSBmdW5jdGlvbiBmaWxsICh2YWwsIHN0YXJ0LCBlbmQsIGVuY29kaW5nKSB7XG4gIC8vIEhhbmRsZSBzdHJpbmcgY2FzZXM6XG4gIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgIGlmICh0eXBlb2Ygc3RhcnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbmNvZGluZyA9IHN0YXJ0XG4gICAgICBzdGFydCA9IDBcbiAgICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZW5kID09PSAnc3RyaW5nJykge1xuICAgICAgZW5jb2RpbmcgPSBlbmRcbiAgICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gICAgfVxuICAgIGlmIChlbmNvZGluZyAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBlbmNvZGluZyAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2VuY29kaW5nIG11c3QgYmUgYSBzdHJpbmcnKVxuICAgIH1cbiAgICBpZiAodHlwZW9mIGVuY29kaW5nID09PSAnc3RyaW5nJyAmJiAhQnVmZmVyLmlzRW5jb2RpbmcoZW5jb2RpbmcpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgfVxuICAgIGlmICh2YWwubGVuZ3RoID09PSAxKSB7XG4gICAgICBjb25zdCBjb2RlID0gdmFsLmNoYXJDb2RlQXQoMClcbiAgICAgIGlmICgoZW5jb2RpbmcgPT09ICd1dGY4JyAmJiBjb2RlIDwgMTI4KSB8fFxuICAgICAgICAgIGVuY29kaW5nID09PSAnbGF0aW4xJykge1xuICAgICAgICAvLyBGYXN0IHBhdGg6IElmIGB2YWxgIGZpdHMgaW50byBhIHNpbmdsZSBieXRlLCB1c2UgdGhhdCBudW1lcmljIHZhbHVlLlxuICAgICAgICB2YWwgPSBjb2RlXG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgdmFsID0gdmFsICYgMjU1XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgdmFsID0gTnVtYmVyKHZhbClcbiAgfVxuXG4gIC8vIEludmFsaWQgcmFuZ2VzIGFyZSBub3Qgc2V0IHRvIGEgZGVmYXVsdCwgc28gY2FuIHJhbmdlIGNoZWNrIGVhcmx5LlxuICBpZiAoc3RhcnQgPCAwIHx8IHRoaXMubGVuZ3RoIDwgc3RhcnQgfHwgdGhpcy5sZW5ndGggPCBlbmQpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignT3V0IG9mIHJhbmdlIGluZGV4JylcbiAgfVxuXG4gIGlmIChlbmQgPD0gc3RhcnQpIHtcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgc3RhcnQgPSBzdGFydCA+Pj4gMFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IHRoaXMubGVuZ3RoIDogZW5kID4+PiAwXG5cbiAgaWYgKCF2YWwpIHZhbCA9IDBcblxuICBsZXQgaVxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgICB0aGlzW2ldID0gdmFsXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNvbnN0IGJ5dGVzID0gQnVmZmVyLmlzQnVmZmVyKHZhbClcbiAgICAgID8gdmFsXG4gICAgICA6IEJ1ZmZlci5mcm9tKHZhbCwgZW5jb2RpbmcpXG4gICAgY29uc3QgbGVuID0gYnl0ZXMubGVuZ3RoXG4gICAgaWYgKGxlbiA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIHZhbHVlIFwiJyArIHZhbCArXG4gICAgICAgICdcIiBpcyBpbnZhbGlkIGZvciBhcmd1bWVudCBcInZhbHVlXCInKVxuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgZW5kIC0gc3RhcnQ7ICsraSkge1xuICAgICAgdGhpc1tpICsgc3RhcnRdID0gYnl0ZXNbaSAlIGxlbl1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpc1xufVxuXG4vLyBDVVNUT00gRVJST1JTXG4vLyA9PT09PT09PT09PT09XG5cbi8vIFNpbXBsaWZpZWQgdmVyc2lvbnMgZnJvbSBOb2RlLCBjaGFuZ2VkIGZvciBCdWZmZXItb25seSB1c2FnZVxuY29uc3QgZXJyb3JzID0ge31cbmZ1bmN0aW9uIEUgKHN5bSwgZ2V0TWVzc2FnZSwgQmFzZSkge1xuICBlcnJvcnNbc3ltXSA9IGNsYXNzIE5vZGVFcnJvciBleHRlbmRzIEJhc2Uge1xuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgIHN1cGVyKClcblxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdtZXNzYWdlJywge1xuICAgICAgICB2YWx1ZTogZ2V0TWVzc2FnZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICB9KVxuXG4gICAgICAvLyBBZGQgdGhlIGVycm9yIGNvZGUgdG8gdGhlIG5hbWUgdG8gaW5jbHVkZSBpdCBpbiB0aGUgc3RhY2sgdHJhY2UuXG4gICAgICB0aGlzLm5hbWUgPSBgJHt0aGlzLm5hbWV9IFske3N5bX1dYFxuICAgICAgLy8gQWNjZXNzIHRoZSBzdGFjayB0byBnZW5lcmF0ZSB0aGUgZXJyb3IgbWVzc2FnZSBpbmNsdWRpbmcgdGhlIGVycm9yIGNvZGVcbiAgICAgIC8vIGZyb20gdGhlIG5hbWUuXG4gICAgICB0aGlzLnN0YWNrIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLWV4cHJlc3Npb25zXG4gICAgICAvLyBSZXNldCB0aGUgbmFtZSB0byB0aGUgYWN0dWFsIG5hbWUuXG4gICAgICBkZWxldGUgdGhpcy5uYW1lXG4gICAgfVxuXG4gICAgZ2V0IGNvZGUgKCkge1xuICAgICAgcmV0dXJuIHN5bVxuICAgIH1cblxuICAgIHNldCBjb2RlICh2YWx1ZSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdjb2RlJywge1xuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgICAgfSlcbiAgICB9XG5cbiAgICB0b1N0cmluZyAoKSB7XG4gICAgICByZXR1cm4gYCR7dGhpcy5uYW1lfSBbJHtzeW19XTogJHt0aGlzLm1lc3NhZ2V9YFxuICAgIH1cbiAgfVxufVxuXG5FKCdFUlJfQlVGRkVSX09VVF9PRl9CT1VORFMnLFxuICBmdW5jdGlvbiAobmFtZSkge1xuICAgIGlmIChuYW1lKSB7XG4gICAgICByZXR1cm4gYCR7bmFtZX0gaXMgb3V0c2lkZSBvZiBidWZmZXIgYm91bmRzYFxuICAgIH1cblxuICAgIHJldHVybiAnQXR0ZW1wdCB0byBhY2Nlc3MgbWVtb3J5IG91dHNpZGUgYnVmZmVyIGJvdW5kcydcbiAgfSwgUmFuZ2VFcnJvcilcbkUoJ0VSUl9JTlZBTElEX0FSR19UWVBFJyxcbiAgZnVuY3Rpb24gKG5hbWUsIGFjdHVhbCkge1xuICAgIHJldHVybiBgVGhlIFwiJHtuYW1lfVwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBudW1iZXIuIFJlY2VpdmVkIHR5cGUgJHt0eXBlb2YgYWN0dWFsfWBcbiAgfSwgVHlwZUVycm9yKVxuRSgnRVJSX09VVF9PRl9SQU5HRScsXG4gIGZ1bmN0aW9uIChzdHIsIHJhbmdlLCBpbnB1dCkge1xuICAgIGxldCBtc2cgPSBgVGhlIHZhbHVlIG9mIFwiJHtzdHJ9XCIgaXMgb3V0IG9mIHJhbmdlLmBcbiAgICBsZXQgcmVjZWl2ZWQgPSBpbnB1dFxuICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKGlucHV0KSAmJiBNYXRoLmFicyhpbnB1dCkgPiAyICoqIDMyKSB7XG4gICAgICByZWNlaXZlZCA9IGFkZE51bWVyaWNhbFNlcGFyYXRvcihTdHJpbmcoaW5wdXQpKVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGlucHV0ID09PSAnYmlnaW50Jykge1xuICAgICAgcmVjZWl2ZWQgPSBTdHJpbmcoaW5wdXQpXG4gICAgICBpZiAoaW5wdXQgPiBCaWdJbnQoMikgKiogQmlnSW50KDMyKSB8fCBpbnB1dCA8IC0oQmlnSW50KDIpICoqIEJpZ0ludCgzMikpKSB7XG4gICAgICAgIHJlY2VpdmVkID0gYWRkTnVtZXJpY2FsU2VwYXJhdG9yKHJlY2VpdmVkKVxuICAgICAgfVxuICAgICAgcmVjZWl2ZWQgKz0gJ24nXG4gICAgfVxuICAgIG1zZyArPSBgIEl0IG11c3QgYmUgJHtyYW5nZX0uIFJlY2VpdmVkICR7cmVjZWl2ZWR9YFxuICAgIHJldHVybiBtc2dcbiAgfSwgUmFuZ2VFcnJvcilcblxuZnVuY3Rpb24gYWRkTnVtZXJpY2FsU2VwYXJhdG9yICh2YWwpIHtcbiAgbGV0IHJlcyA9ICcnXG4gIGxldCBpID0gdmFsLmxlbmd0aFxuICBjb25zdCBzdGFydCA9IHZhbFswXSA9PT0gJy0nID8gMSA6IDBcbiAgZm9yICg7IGkgPj0gc3RhcnQgKyA0OyBpIC09IDMpIHtcbiAgICByZXMgPSBgXyR7dmFsLnNsaWNlKGkgLSAzLCBpKX0ke3Jlc31gXG4gIH1cbiAgcmV0dXJuIGAke3ZhbC5zbGljZSgwLCBpKX0ke3Jlc31gXG59XG5cbi8vIENIRUNLIEZVTkNUSU9OU1xuLy8gPT09PT09PT09PT09PT09XG5cbmZ1bmN0aW9uIGNoZWNrQm91bmRzIChidWYsIG9mZnNldCwgYnl0ZUxlbmd0aCkge1xuICB2YWxpZGF0ZU51bWJlcihvZmZzZXQsICdvZmZzZXQnKVxuICBpZiAoYnVmW29mZnNldF0gPT09IHVuZGVmaW5lZCB8fCBidWZbb2Zmc2V0ICsgYnl0ZUxlbmd0aF0gPT09IHVuZGVmaW5lZCkge1xuICAgIGJvdW5kc0Vycm9yKG9mZnNldCwgYnVmLmxlbmd0aCAtIChieXRlTGVuZ3RoICsgMSkpXG4gIH1cbn1cblxuZnVuY3Rpb24gY2hlY2tJbnRCSSAodmFsdWUsIG1pbiwgbWF4LCBidWYsIG9mZnNldCwgYnl0ZUxlbmd0aCkge1xuICBpZiAodmFsdWUgPiBtYXggfHwgdmFsdWUgPCBtaW4pIHtcbiAgICBjb25zdCBuID0gdHlwZW9mIG1pbiA9PT0gJ2JpZ2ludCcgPyAnbicgOiAnJ1xuICAgIGxldCByYW5nZVxuICAgIGlmIChieXRlTGVuZ3RoID4gMykge1xuICAgICAgaWYgKG1pbiA9PT0gMCB8fCBtaW4gPT09IEJpZ0ludCgwKSkge1xuICAgICAgICByYW5nZSA9IGA+PSAwJHtufSBhbmQgPCAyJHtufSAqKiAkeyhieXRlTGVuZ3RoICsgMSkgKiA4fSR7bn1gXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByYW5nZSA9IGA+PSAtKDIke259ICoqICR7KGJ5dGVMZW5ndGggKyAxKSAqIDggLSAxfSR7bn0pIGFuZCA8IDIgKiogYCArXG4gICAgICAgICAgICAgICAgYCR7KGJ5dGVMZW5ndGggKyAxKSAqIDggLSAxfSR7bn1gXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJhbmdlID0gYD49ICR7bWlufSR7bn0gYW5kIDw9ICR7bWF4fSR7bn1gXG4gICAgfVxuICAgIHRocm93IG5ldyBlcnJvcnMuRVJSX09VVF9PRl9SQU5HRSgndmFsdWUnLCByYW5nZSwgdmFsdWUpXG4gIH1cbiAgY2hlY2tCb3VuZHMoYnVmLCBvZmZzZXQsIGJ5dGVMZW5ndGgpXG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlTnVtYmVyICh2YWx1ZSwgbmFtZSkge1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBlcnJvcnMuRVJSX0lOVkFMSURfQVJHX1RZUEUobmFtZSwgJ251bWJlcicsIHZhbHVlKVxuICB9XG59XG5cbmZ1bmN0aW9uIGJvdW5kc0Vycm9yICh2YWx1ZSwgbGVuZ3RoLCB0eXBlKSB7XG4gIGlmIChNYXRoLmZsb29yKHZhbHVlKSAhPT0gdmFsdWUpIHtcbiAgICB2YWxpZGF0ZU51bWJlcih2YWx1ZSwgdHlwZSlcbiAgICB0aHJvdyBuZXcgZXJyb3JzLkVSUl9PVVRfT0ZfUkFOR0UodHlwZSB8fCAnb2Zmc2V0JywgJ2FuIGludGVnZXInLCB2YWx1ZSlcbiAgfVxuXG4gIGlmIChsZW5ndGggPCAwKSB7XG4gICAgdGhyb3cgbmV3IGVycm9ycy5FUlJfQlVGRkVSX09VVF9PRl9CT1VORFMoKVxuICB9XG5cbiAgdGhyb3cgbmV3IGVycm9ycy5FUlJfT1VUX09GX1JBTkdFKHR5cGUgfHwgJ29mZnNldCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgPj0gJHt0eXBlID8gMSA6IDB9IGFuZCA8PSAke2xlbmd0aH1gLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUpXG59XG5cbi8vIEhFTFBFUiBGVU5DVElPTlNcbi8vID09PT09PT09PT09PT09PT1cblxuY29uc3QgSU5WQUxJRF9CQVNFNjRfUkUgPSAvW14rLzAtOUEtWmEtei1fXS9nXG5cbmZ1bmN0aW9uIGJhc2U2NGNsZWFuIChzdHIpIHtcbiAgLy8gTm9kZSB0YWtlcyBlcXVhbCBzaWducyBhcyBlbmQgb2YgdGhlIEJhc2U2NCBlbmNvZGluZ1xuICBzdHIgPSBzdHIuc3BsaXQoJz0nKVswXVxuICAvLyBOb2RlIHN0cmlwcyBvdXQgaW52YWxpZCBjaGFyYWN0ZXJzIGxpa2UgXFxuIGFuZCBcXHQgZnJvbSB0aGUgc3RyaW5nLCBiYXNlNjQtanMgZG9lcyBub3RcbiAgc3RyID0gc3RyLnRyaW0oKS5yZXBsYWNlKElOVkFMSURfQkFTRTY0X1JFLCAnJylcbiAgLy8gTm9kZSBjb252ZXJ0cyBzdHJpbmdzIHdpdGggbGVuZ3RoIDwgMiB0byAnJ1xuICBpZiAoc3RyLmxlbmd0aCA8IDIpIHJldHVybiAnJ1xuICAvLyBOb2RlIGFsbG93cyBmb3Igbm9uLXBhZGRlZCBiYXNlNjQgc3RyaW5ncyAobWlzc2luZyB0cmFpbGluZyA9PT0pLCBiYXNlNjQtanMgZG9lcyBub3RcbiAgd2hpbGUgKHN0ci5sZW5ndGggJSA0ICE9PSAwKSB7XG4gICAgc3RyID0gc3RyICsgJz0nXG4gIH1cbiAgcmV0dXJuIHN0clxufVxuXG5mdW5jdGlvbiB1dGY4VG9CeXRlcyAoc3RyaW5nLCB1bml0cykge1xuICB1bml0cyA9IHVuaXRzIHx8IEluZmluaXR5XG4gIGxldCBjb2RlUG9pbnRcbiAgY29uc3QgbGVuZ3RoID0gc3RyaW5nLmxlbmd0aFxuICBsZXQgbGVhZFN1cnJvZ2F0ZSA9IG51bGxcbiAgY29uc3QgYnl0ZXMgPSBbXVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBjb2RlUG9pbnQgPSBzdHJpbmcuY2hhckNvZGVBdChpKVxuXG4gICAgLy8gaXMgc3Vycm9nYXRlIGNvbXBvbmVudFxuICAgIGlmIChjb2RlUG9pbnQgPiAweEQ3RkYgJiYgY29kZVBvaW50IDwgMHhFMDAwKSB7XG4gICAgICAvLyBsYXN0IGNoYXIgd2FzIGEgbGVhZFxuICAgICAgaWYgKCFsZWFkU3Vycm9nYXRlKSB7XG4gICAgICAgIC8vIG5vIGxlYWQgeWV0XG4gICAgICAgIGlmIChjb2RlUG9pbnQgPiAweERCRkYpIHtcbiAgICAgICAgICAvLyB1bmV4cGVjdGVkIHRyYWlsXG4gICAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfSBlbHNlIGlmIChpICsgMSA9PT0gbGVuZ3RoKSB7XG4gICAgICAgICAgLy8gdW5wYWlyZWQgbGVhZFxuICAgICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICAvLyB2YWxpZCBsZWFkXG4gICAgICAgIGxlYWRTdXJyb2dhdGUgPSBjb2RlUG9pbnRcblxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICAvLyAyIGxlYWRzIGluIGEgcm93XG4gICAgICBpZiAoY29kZVBvaW50IDwgMHhEQzAwKSB7XG4gICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICBsZWFkU3Vycm9nYXRlID0gY29kZVBvaW50XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8vIHZhbGlkIHN1cnJvZ2F0ZSBwYWlyXG4gICAgICBjb2RlUG9pbnQgPSAobGVhZFN1cnJvZ2F0ZSAtIDB4RDgwMCA8PCAxMCB8IGNvZGVQb2ludCAtIDB4REMwMCkgKyAweDEwMDAwXG4gICAgfSBlbHNlIGlmIChsZWFkU3Vycm9nYXRlKSB7XG4gICAgICAvLyB2YWxpZCBibXAgY2hhciwgYnV0IGxhc3QgY2hhciB3YXMgYSBsZWFkXG4gICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICB9XG5cbiAgICBsZWFkU3Vycm9nYXRlID0gbnVsbFxuXG4gICAgLy8gZW5jb2RlIHV0ZjhcbiAgICBpZiAoY29kZVBvaW50IDwgMHg4MCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAxKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKGNvZGVQb2ludClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4ODAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDIpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgfCAweEMwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHgxMDAwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAzKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHhDIHwgMHhFMCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHgxMTAwMDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gNCkgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4MTIgfCAweEYwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHhDICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNvZGUgcG9pbnQnKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBieXRlc1xufVxuXG5mdW5jdGlvbiBhc2NpaVRvQnl0ZXMgKHN0cikge1xuICBjb25zdCBieXRlQXJyYXkgPSBbXVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIC8vIE5vZGUncyBjb2RlIHNlZW1zIHRvIGJlIGRvaW5nIHRoaXMgYW5kIG5vdCAmIDB4N0YuLlxuICAgIGJ5dGVBcnJheS5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpICYgMHhGRilcbiAgfVxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVUb0J5dGVzIChzdHIsIHVuaXRzKSB7XG4gIGxldCBjLCBoaSwgbG9cbiAgY29uc3QgYnl0ZUFycmF5ID0gW11cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKHVuaXRzIC09IDIpIDwgMCkgYnJlYWtcblxuICAgIGMgPSBzdHIuY2hhckNvZGVBdChpKVxuICAgIGhpID0gYyA+PiA4XG4gICAgbG8gPSBjICUgMjU2XG4gICAgYnl0ZUFycmF5LnB1c2gobG8pXG4gICAgYnl0ZUFycmF5LnB1c2goaGkpXG4gIH1cblxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFRvQnl0ZXMgKHN0cikge1xuICByZXR1cm4gYmFzZTY0LnRvQnl0ZUFycmF5KGJhc2U2NGNsZWFuKHN0cikpXG59XG5cbmZ1bmN0aW9uIGJsaXRCdWZmZXIgKHNyYywgZHN0LCBvZmZzZXQsIGxlbmd0aCkge1xuICBsZXQgaVxuICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKGkgKyBvZmZzZXQgPj0gZHN0Lmxlbmd0aCkgfHwgKGkgPj0gc3JjLmxlbmd0aCkpIGJyZWFrXG4gICAgZHN0W2kgKyBvZmZzZXRdID0gc3JjW2ldXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuLy8gQXJyYXlCdWZmZXIgb3IgVWludDhBcnJheSBvYmplY3RzIGZyb20gb3RoZXIgY29udGV4dHMgKGkuZS4gaWZyYW1lcykgZG8gbm90IHBhc3Ncbi8vIHRoZSBgaW5zdGFuY2VvZmAgY2hlY2sgYnV0IHRoZXkgc2hvdWxkIGJlIHRyZWF0ZWQgYXMgb2YgdGhhdCB0eXBlLlxuLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2J1ZmZlci9pc3N1ZXMvMTY2XG5mdW5jdGlvbiBpc0luc3RhbmNlIChvYmosIHR5cGUpIHtcbiAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIHR5cGUgfHxcbiAgICAob2JqICE9IG51bGwgJiYgb2JqLmNvbnN0cnVjdG9yICE9IG51bGwgJiYgb2JqLmNvbnN0cnVjdG9yLm5hbWUgIT0gbnVsbCAmJlxuICAgICAgb2JqLmNvbnN0cnVjdG9yLm5hbWUgPT09IHR5cGUubmFtZSlcbn1cbmZ1bmN0aW9uIG51bWJlcklzTmFOIChvYmopIHtcbiAgLy8gRm9yIElFMTEgc3VwcG9ydFxuICByZXR1cm4gb2JqICE9PSBvYmogLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zZWxmLWNvbXBhcmVcbn1cblxuLy8gQ3JlYXRlIGxvb2t1cCB0YWJsZSBmb3IgYHRvU3RyaW5nKCdoZXgnKWBcbi8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9idWZmZXIvaXNzdWVzLzIxOVxuY29uc3QgaGV4U2xpY2VMb29rdXBUYWJsZSA9IChmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGFscGhhYmV0ID0gJzAxMjM0NTY3ODlhYmNkZWYnXG4gIGNvbnN0IHRhYmxlID0gbmV3IEFycmF5KDI1NilcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNjsgKytpKSB7XG4gICAgY29uc3QgaTE2ID0gaSAqIDE2XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxNjsgKytqKSB7XG4gICAgICB0YWJsZVtpMTYgKyBqXSA9IGFscGhhYmV0W2ldICsgYWxwaGFiZXRbal1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRhYmxlXG59KSgpXG5cbi8vIFJldHVybiBub3QgZnVuY3Rpb24gd2l0aCBFcnJvciBpZiBCaWdJbnQgbm90IHN1cHBvcnRlZFxuZnVuY3Rpb24gZGVmaW5lQmlnSW50TWV0aG9kIChmbikge1xuICByZXR1cm4gdHlwZW9mIEJpZ0ludCA9PT0gJ3VuZGVmaW5lZCcgPyBCdWZmZXJCaWdJbnROb3REZWZpbmVkIDogZm5cbn1cblxuZnVuY3Rpb24gQnVmZmVyQmlnSW50Tm90RGVmaW5lZCAoKSB7XG4gIHRocm93IG5ldyBFcnJvcignQmlnSW50IG5vdCBzdXBwb3J0ZWQnKVxufVxuIiwgImltcG9ydCB7IEJ1ZmZlciBhcyBOb2RlQnVmZmVyIH0gZnJvbSAnYnVmZmVyJ1xuZXhwb3J0IGNvbnN0IEJ1ZmZlciA9IE5vZGVCdWZmZXJcbiIsICIvKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogR1BMLTMuMC1vci1sYXRlciAqL1xyXG4vKiBDb3B5cmlnaHQgXHUwMEE5IDIwMjUgSW5rZGV4ICovXHJcblxyXG5pbXBvcnQge1xyXG4gIEJhc2ljUmF0ZUxpbWl0ZXIsXHJcbiAgQ29udGVudFJhdGluZyxcclxuICBEaXNjb3ZlclNlY3Rpb25UeXBlLFxyXG4gIEZvcm0sXHJcbiAgdHlwZSBDaGFwdGVyLFxyXG4gIHR5cGUgQ2hhcHRlckRldGFpbHMsXHJcbiAgdHlwZSBDaGFwdGVyUHJvdmlkaW5nLFxyXG4gIHR5cGUgRGlzY292ZXJTZWN0aW9uLFxyXG4gIHR5cGUgRGlzY292ZXJTZWN0aW9uSXRlbSxcclxuICB0eXBlIERpc2NvdmVyU2VjdGlvblByb3ZpZGluZyxcclxuICB0eXBlIEV4dGVuc2lvbixcclxuICB0eXBlIE1hbmdhUHJvdmlkaW5nLFxyXG4gIHR5cGUgUGFnZWRSZXN1bHRzLFxyXG4gIHR5cGUgU2VhcmNoRmlsdGVyLFxyXG4gIHR5cGUgU2VhcmNoUXVlcnksXHJcbiAgdHlwZSBTZWFyY2hSZXN1bHRJdGVtLFxyXG4gIHR5cGUgU2VhcmNoUmVzdWx0c1Byb3ZpZGluZyxcclxuICB0eXBlIFNldHRpbmdzRm9ybVByb3ZpZGluZyxcclxuICB0eXBlIFNvdXJjZU1hbmdhLFxyXG4gIHR5cGUgVGFnLFxyXG59IGZyb20gXCJAcGFwZXJiYWNrL3R5cGVzXCI7XHJcblxyXG5pbXBvcnQgeyBTZXR0aW5nc0Zvcm0gfSBmcm9tIFwiLi9mb3Jtc1wiO1xyXG5pbXBvcnQgeyBNYWluSW50ZXJjZXB0b3IgfSBmcm9tIFwiLi9uZXR3b3JrXCI7XHJcblxyXG5jb25zdCBDT01JWF9ET01BSU4gPSBcImh0dHBzOi8vY29taXgudG9cIjtcclxuXHJcbnR5cGUgQ29taXhJbXBsZW1lbnRhdGlvbiA9IFNldHRpbmdzRm9ybVByb3ZpZGluZyAmXHJcbiAgRXh0ZW5zaW9uICZcclxuICBEaXNjb3ZlclNlY3Rpb25Qcm92aWRpbmcgJlxyXG4gIFNlYXJjaFJlc3VsdHNQcm92aWRpbmcgJlxyXG4gIE1hbmdhUHJvdmlkaW5nICZcclxuICBDaGFwdGVyUHJvdmlkaW5nO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbWl4RXh0ZW5zaW9uIGltcGxlbWVudHMgQ29taXhJbXBsZW1lbnRhdGlvbiB7XHJcbiAgbWFpblJhdGVMaW1pdGVyID0gbmV3IEJhc2ljUmF0ZUxpbWl0ZXIoXCJtYWluXCIsIHtcclxuICAgIG51bWJlck9mUmVxdWVzdHM6IDQsXHJcbiAgICBidWZmZXJJbnRlcnZhbDogMSxcclxuICAgIGlnbm9yZUltYWdlczogdHJ1ZSxcclxuICB9KTtcclxuXHJcbiAgbWFpbkludGVyY2VwdG9yID0gbmV3IE1haW5JbnRlcmNlcHRvcihcIm1haW5cIik7XHJcblxyXG4gIGFzeW5jIGluaXRpYWxpc2UoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICB0aGlzLm1haW5SYXRlTGltaXRlci5yZWdpc3RlckludGVyY2VwdG9yKCk7XHJcbiAgICB0aGlzLm1haW5JbnRlcmNlcHRvci5yZWdpc3RlckludGVyY2VwdG9yKCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRTZXR0aW5nc0Zvcm0oKTogUHJvbWlzZTxGb3JtPiB7XHJcbiAgICByZXR1cm4gbmV3IFNldHRpbmdzRm9ybSgpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0RGlzY292ZXJTZWN0aW9ucygpOiBQcm9taXNlPERpc2NvdmVyU2VjdGlvbltdPiB7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6IFwibGF0ZXN0LXVwZGF0ZXNcIixcclxuICAgICAgICB0aXRsZTogXCJMYXRlc3QgVXBkYXRlc1wiLFxyXG4gICAgICAgIHR5cGU6IERpc2NvdmVyU2VjdGlvblR5cGUuc2ltcGxlQ2Fyb3VzZWwsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogXCJwb3B1bGFyXCIsXHJcbiAgICAgICAgdGl0bGU6IFwiUG9wdWxhclwiLFxyXG4gICAgICAgIHR5cGU6IERpc2NvdmVyU2VjdGlvblR5cGUuc2ltcGxlQ2Fyb3VzZWwsXHJcbiAgICAgIH0sXHJcbiAgICBdO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0RGlzY292ZXJTZWN0aW9uSXRlbXMoXHJcbiAgICBzZWN0aW9uSWQ6IHN0cmluZyxcclxuICAgIG1ldGFkYXRhOiB1bmtub3duLFxyXG4gICk6IFByb21pc2U8UGFnZWRSZXN1bHRzPERpc2NvdmVyU2VjdGlvbkl0ZW0+PiB7XHJcbiAgICBjb25zdCBwYWdlID0gKG1ldGFkYXRhIGFzIHsgcGFnZT86IG51bWJlciB9KT8ucGFnZSA/PyAxO1xyXG4gICAgXHJcbiAgICBjb25zdCB1cmwgPSBgJHtDT01JWF9ET01BSU59L2hvbWVgO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgUmVxdWVzdCh1cmwpO1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHJlcXVlc3Quc2VuZCgpO1xyXG4gICAgICBjb25zdCAkID0gQXBwbGljYXRpb24uQ2hlZXJpby5sb2FkKHJlc3BvbnNlLmRhdGEpO1xyXG5cclxuICAgICAgY29uc3QgaXRlbXM6IERpc2NvdmVyU2VjdGlvbkl0ZW1bXSA9IFtdO1xyXG4gICAgICBcclxuICAgICAgLy8gUGFyc2UgbWFuZ2EgaXRlbXMgZnJvbSB0aGUgaG9tZSBwYWdlXHJcbiAgICAgICQoJ2FbaHJlZio9XCIvdGl0bGUvXCJdJykuZWFjaCgoXywgZWxlbWVudCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGhyZWYgPSAkKGVsZW1lbnQpLmF0dHIoJ2hyZWYnKTtcclxuICAgICAgICBpZiAoIWhyZWYpIHJldHVybjtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBtYXRjaCA9IGhyZWYubWF0Y2goL1xcL3RpdGxlXFwvKFteXFwvXSspLyk7XHJcbiAgICAgICAgaWYgKCFtYXRjaCkgcmV0dXJuO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IG1hbmdhSWQgPSBtYXRjaFsxXTtcclxuICAgICAgICBjb25zdCB0aXRsZSA9ICQoZWxlbWVudCkudGV4dCgpLnRyaW0oKTtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBpbWcgPSAkKGVsZW1lbnQpLmZpbmQoJ2ltZycpLmZpcnN0KCk7XHJcbiAgICAgICAgY29uc3QgY292ZXJVcmwgPSBpbWcuYXR0cignc3JjJykgfHwgaW1nLmF0dHIoJ2RhdGEtc3JjJykgfHwgJyc7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRpdGxlICYmIG1hbmdhSWQgJiYgIWl0ZW1zLmZpbmQoaXRlbSA9PiBpdGVtLmlkID09PSBtYW5nYUlkKSkge1xyXG4gICAgICAgICAgaXRlbXMucHVzaCh7XHJcbiAgICAgICAgICAgIGlkOiBtYW5nYUlkLFxyXG4gICAgICAgICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgICAgICAgIGNvdmVyVXJsOiBjb3ZlclVybCxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIFxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGl0ZW1zOiBpdGVtcy5zbGljZSgwLCAyMCksXHJcbiAgICAgICAgbWV0YWRhdGE6IHsgcGFnZTogcGFnZSArIDEgfSxcclxuICAgICAgfTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGZldGNoaW5nIGRpc2NvdmVyIHNlY3Rpb24gJHtzZWN0aW9uSWR9OmAsIGVycm9yKTtcclxuICAgICAgcmV0dXJuIHsgaXRlbXM6IFtdLCBtZXRhZGF0YSB9O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0U2VhcmNoRmlsdGVycygpOiBQcm9taXNlPFNlYXJjaEZpbHRlcltdPiB7XHJcbiAgICByZXR1cm4gW107XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRTZWFyY2hSZXN1bHRzKFxyXG4gICAgcXVlcnk6IFNlYXJjaFF1ZXJ5LFxyXG4gICAgbWV0YWRhdGE6IHVua25vd24sXHJcbiAgKTogUHJvbWlzZTxQYWdlZFJlc3VsdHM8U2VhcmNoUmVzdWx0SXRlbT4+IHtcclxuICAgIGNvbnN0IHBhZ2UgPSAobWV0YWRhdGEgYXMgeyBwYWdlPzogbnVtYmVyIH0pPy5wYWdlID8/IDE7XHJcbiAgICBjb25zdCBzZWFyY2hUZXJtID0gcXVlcnkudGl0bGUgPz8gXCJcIjtcclxuXHJcbiAgICBpZiAoIXNlYXJjaFRlcm0pIHtcclxuICAgICAgcmV0dXJuIHsgaXRlbXM6IFtdLCBtZXRhZGF0YSB9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHVybCA9IGAke0NPTUlYX0RPTUFJTn0vc2VhcmNoP3E9JHtlbmNvZGVVUklDb21wb25lbnQoc2VhcmNoVGVybSl9YDtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXF1ZXN0ID0gbmV3IFJlcXVlc3QodXJsKTtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCByZXF1ZXN0LnNlbmQoKTtcclxuICAgICAgY29uc3QgJCA9IEFwcGxpY2F0aW9uLkNoZWVyaW8ubG9hZChyZXNwb25zZS5kYXRhKTtcclxuXHJcbiAgICAgIGNvbnN0IHJlc3VsdHM6IFNlYXJjaFJlc3VsdEl0ZW1bXSA9IFtdO1xyXG4gICAgICBcclxuICAgICAgJCgnYVtocmVmKj1cIi90aXRsZS9cIl0nKS5lYWNoKChfLCBlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgY29uc3QgaHJlZiA9ICQoZWxlbWVudCkuYXR0cignaHJlZicpO1xyXG4gICAgICAgIGlmICghaHJlZikgcmV0dXJuO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IG1hdGNoID0gaHJlZi5tYXRjaCgvXFwvdGl0bGVcXC8oW15cXC9dKykvKTtcclxuICAgICAgICBpZiAoIW1hdGNoKSByZXR1cm47XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgbWFuZ2FJZCA9IG1hdGNoWzFdO1xyXG4gICAgICAgIGNvbnN0IHRpdGxlID0gJChlbGVtZW50KS50ZXh0KCkudHJpbSgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IGltZyA9ICQoZWxlbWVudCkuZmluZCgnaW1nJykuZmlyc3QoKTtcclxuICAgICAgICBjb25zdCBjb3ZlclVybCA9IGltZy5hdHRyKCdzcmMnKSB8fCBpbWcuYXR0cignZGF0YS1zcmMnKSB8fCAnJztcclxuICAgICAgICBcclxuICAgICAgICBpZiAodGl0bGUgJiYgbWFuZ2FJZCAmJiAhcmVzdWx0cy5maW5kKGl0ZW0gPT4gaXRlbS5pZCA9PT0gbWFuZ2FJZCkpIHtcclxuICAgICAgICAgIHJlc3VsdHMucHVzaCh7XHJcbiAgICAgICAgICAgIGlkOiBtYW5nYUlkLFxyXG4gICAgICAgICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgICAgICAgIGNvdmVyVXJsOiBjb3ZlclVybCxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIFxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGl0ZW1zOiByZXN1bHRzLFxyXG4gICAgICAgIG1ldGFkYXRhOiB7IHBhZ2U6IHBhZ2UgKyAxIH0sXHJcbiAgICAgIH07XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZHVyaW5nIHNlYXJjaDpcIiwgZXJyb3IpO1xyXG4gICAgICByZXR1cm4geyBpdGVtczogW10sIG1ldGFkYXRhIH07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRNYW5nYURldGFpbHMobWFuZ2FJZDogc3RyaW5nKTogUHJvbWlzZTxTb3VyY2VNYW5nYT4ge1xyXG4gICAgY29uc3QgdXJsID0gYCR7Q09NSVhfRE9NQUlOfS90aXRsZS8ke21hbmdhSWR9YDtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXF1ZXN0ID0gbmV3IFJlcXVlc3QodXJsKTtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCByZXF1ZXN0LnNlbmQoKTtcclxuICAgICAgY29uc3QgJCA9IEFwcGxpY2F0aW9uLkNoZWVyaW8ubG9hZChyZXNwb25zZS5kYXRhKTtcclxuXHJcbiAgICAgIGNvbnN0IHByaW1hcnlUaXRsZSA9ICQoJ2gxJykuZmlyc3QoKS50ZXh0KCkudHJpbSgpIHx8IFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICQoJ3RpdGxlJykudGV4dCgpLnJlcGxhY2UoJyAtIENvbWl4JywgJycpLnRyaW0oKTtcclxuICAgICAgXHJcbiAgICAgIGNvbnN0IHNlY29uZGFyeVRpdGxlczogc3RyaW5nW10gPSBbXTtcclxuICAgICAgJCgnaDMnKS5maXJzdCgpLnRleHQoKS5zcGxpdCgnLycpLmZvckVhY2godGl0bGUgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNsZWFuZWQgPSB0aXRsZS50cmltKCk7XHJcbiAgICAgICAgaWYgKGNsZWFuZWQgJiYgY2xlYW5lZCAhPT0gcHJpbWFyeVRpdGxlKSB7XHJcbiAgICAgICAgICBzZWNvbmRhcnlUaXRsZXMucHVzaChjbGVhbmVkKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBcclxuICAgICAgY29uc3QgY292ZXJVcmwgPSAkKCdpbWdbc3JjKj1cInN0YXRpYy5jb21peC50b1wiXScpLmZpcnN0KCkuYXR0cignc3JjJykgfHwgJyc7XHJcbiAgICAgIFxyXG4gICAgICBjb25zdCBzeW5vcHNpcyA9ICQoJ3AnKS5maWx0ZXIoKF8sIGVsKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdGV4dCA9ICQoZWwpLnRleHQoKTtcclxuICAgICAgICByZXR1cm4gdGV4dC5sZW5ndGggPiAxMDA7XHJcbiAgICAgIH0pLmZpcnN0KCkudGV4dCgpLnRyaW0oKTtcclxuICAgICAgXHJcbiAgICAgIGNvbnN0IHJhdGluZ1RleHQgPSAkKCcucmF0aW5nLCBbY2xhc3MqPVwicmF0aW5nXCJdJykudGV4dCgpO1xyXG4gICAgICBjb25zdCByYXRpbmcgPSBwYXJzZUZsb2F0KHJhdGluZ1RleHQpIHx8IDA7XHJcbiAgICAgIFxyXG4gICAgICBjb25zdCB0YWdzOiBUYWdbXSA9IFtdO1xyXG4gICAgICAkKCdhW2hyZWYqPVwiL2dlbnJlcy9cIl0sIGFbaHJlZio9XCIvdGFncy9cIl0nKS5lYWNoKChfLCBlbCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHRhZ05hbWUgPSAkKGVsKS50ZXh0KCkudHJpbSgpO1xyXG4gICAgICAgIGlmICh0YWdOYW1lKSB7XHJcbiAgICAgICAgICB0YWdzLnB1c2goe1xyXG4gICAgICAgICAgICBpZDogdGFnTmFtZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoL1xccysvZywgJy0nKSxcclxuICAgICAgICAgICAgbGFiZWw6IHRhZ05hbWUsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBcclxuICAgICAgbGV0IGNvbnRlbnRSYXRpbmcgPSBDb250ZW50UmF0aW5nLkVWRVJZT05FO1xyXG4gICAgICBjb25zdCB0YWdMYWJlbHMgPSB0YWdzLm1hcCh0ID0+IHQubGFiZWwudG9Mb3dlckNhc2UoKSk7XHJcbiAgICAgIGlmICh0YWdMYWJlbHMuc29tZSh0ID0+IFsnZWNjaGknLCAnbWF0dXJlJywgJ2FkdWx0J10uaW5jbHVkZXModCkpKSB7XHJcbiAgICAgICAgY29udGVudFJhdGluZyA9IENvbnRlbnRSYXRpbmcuTUFUVVJFO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIG1hbmdhSWQsXHJcbiAgICAgICAgdGl0bGVzOiBbcHJpbWFyeVRpdGxlLCAuLi5zZWNvbmRhcnlUaXRsZXNdLFxyXG4gICAgICAgIGNvdmVyVXJsOiBjb3ZlclVybCxcclxuICAgICAgICBhdXRob3I6ICcnLFxyXG4gICAgICAgIGFydGlzdDogJycsXHJcbiAgICAgICAgc3lub3BzaXM6IHN5bm9wc2lzLFxyXG4gICAgICAgIHN0YXR1czogXCJPbmdvaW5nXCIsXHJcbiAgICAgICAgY29udGVudFJhdGluZzogY29udGVudFJhdGluZyxcclxuICAgICAgICB0YWdzOiB0YWdzLFxyXG4gICAgICB9O1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgZmV0Y2hpbmcgbWFuZ2EgZGV0YWlscyBmb3IgJHttYW5nYUlkfTpgLCBlcnJvcik7XHJcbiAgICAgIHRocm93IGVycm9yO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0Q2hhcHRlcnMobWFuZ2FJZDogc3RyaW5nKTogUHJvbWlzZTxDaGFwdGVyW10+IHtcclxuICAgIGNvbnN0IHVybCA9IGAke0NPTUlYX0RPTUFJTn0vdGl0bGUvJHttYW5nYUlkfWA7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KHVybCk7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgcmVxdWVzdC5zZW5kKCk7XHJcbiAgICAgIGNvbnN0ICQgPSBBcHBsaWNhdGlvbi5DaGVlcmlvLmxvYWQocmVzcG9uc2UuZGF0YSk7XHJcblxyXG4gICAgICBjb25zdCBjaGFwdGVyczogQ2hhcHRlcltdID0gW107XHJcbiAgICAgIFxyXG4gICAgICAkKCdhW2hyZWYqPVwiL3RpdGxlL1wiXScpLmVhY2goKF8sIGVsZW1lbnQpID0+IHtcclxuICAgICAgICBjb25zdCBocmVmID0gJChlbGVtZW50KS5hdHRyKCdocmVmJyk7XHJcbiAgICAgICAgaWYgKCFocmVmKSByZXR1cm47XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgbWF0Y2ggPSBocmVmLm1hdGNoKC9cXC90aXRsZVxcL1teXFwvXStcXC8oXFxkKyktY2hhcHRlci0oWzAtOS5dKykvKTtcclxuICAgICAgICBpZiAoIW1hdGNoKSByZXR1cm47XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgY2hhcHRlcklkID0gbWF0Y2hbMV07XHJcbiAgICAgICAgY29uc3QgY2hhcHRlck51bSA9IHBhcnNlRmxvYXQobWF0Y2hbMl0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IGNoYXB0ZXJUZXh0ID0gJChlbGVtZW50KS50ZXh0KCkudHJpbSgpO1xyXG4gICAgICAgIGNvbnN0IHRpdGxlID0gY2hhcHRlclRleHQucmVwbGFjZSgvXkNoXFwuP1xccyovaSwgJycpLnRyaW0oKTtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBkYXRlVGV4dCA9ICQoZWxlbWVudCkuY2xvc2VzdCgnZGl2LCBsaSwgdHInKS5maW5kKCdbY2xhc3MqPVwidGltZVwiXSwgW2NsYXNzKj1cImRhdGVcIl0nKS50ZXh0KCkudHJpbSgpO1xyXG4gICAgICAgIGxldCB0aW1lc3RhbXAgPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmIChkYXRlVGV4dCkge1xyXG4gICAgICAgICAgY29uc3QgdGltZU1hdGNoID0gZGF0ZVRleHQubWF0Y2goLyhcXGQrKVxccyooZHxofG18cykvaSk7XHJcbiAgICAgICAgICBpZiAodGltZU1hdGNoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gcGFyc2VJbnQodGltZU1hdGNoWzFdKTtcclxuICAgICAgICAgICAgY29uc3QgdW5pdCA9IHRpbWVNYXRjaFsyXS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICBjb25zdCBtdWx0aXBsaWVyID0ge1xyXG4gICAgICAgICAgICAgICdzJzogMTAwMCxcclxuICAgICAgICAgICAgICAnbSc6IDYwICogMTAwMCxcclxuICAgICAgICAgICAgICAnaCc6IDYwICogNjAgKiAxMDAwLFxyXG4gICAgICAgICAgICAgICdkJzogMjQgKiA2MCAqIDYwICogMTAwMCxcclxuICAgICAgICAgICAgfVt1bml0XSB8fCAwO1xyXG4gICAgICAgICAgICB0aW1lc3RhbXAgPSBEYXRlLm5vdygpIC0gKHZhbHVlICogbXVsdGlwbGllcik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICghY2hhcHRlcnMuZmluZChjaCA9PiBjaC5pZCA9PT0gY2hhcHRlcklkKSkge1xyXG4gICAgICAgICAgY2hhcHRlcnMucHVzaCh7XHJcbiAgICAgICAgICAgIGlkOiBgJHttYW5nYUlkfS8ke2NoYXB0ZXJJZH1gLFxyXG4gICAgICAgICAgICBtYW5nYUlkOiBtYW5nYUlkLFxyXG4gICAgICAgICAgICBuYW1lOiB0aXRsZSB8fCBgQ2hhcHRlciAke2NoYXB0ZXJOdW19YCxcclxuICAgICAgICAgICAgY2hhcHRlck51bWJlcjogY2hhcHRlck51bSxcclxuICAgICAgICAgICAgdm9sdW1lOiAwLFxyXG4gICAgICAgICAgICBsYW5ndWFnZTogJ2VuJyxcclxuICAgICAgICAgICAgdGltZXN0YW1wOiB0aW1lc3RhbXAsXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICBcclxuICAgICAgcmV0dXJuIGNoYXB0ZXJzLnNvcnQoKGEsIGIpID0+IChiLmNoYXB0ZXJOdW1iZXIgPz8gMCkgLSAoYS5jaGFwdGVyTnVtYmVyID8/IDApKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGZldGNoaW5nIGNoYXB0ZXJzIGZvciAke21hbmdhSWR9OmAsIGVycm9yKTtcclxuICAgICAgcmV0dXJuIFtdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0Q2hhcHRlckRldGFpbHMoY2hhcHRlcklkOiBzdHJpbmcpOiBQcm9taXNlPENoYXB0ZXJEZXRhaWxzPiB7XHJcbiAgICBjb25zdCB1cmwgPSBgJHtDT01JWF9ET01BSU59L3RpdGxlLyR7Y2hhcHRlcklkfWA7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KHVybCk7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgcmVxdWVzdC5zZW5kKCk7XHJcbiAgICAgIGNvbnN0ICQgPSBBcHBsaWNhdGlvbi5DaGVlcmlvLmxvYWQocmVzcG9uc2UuZGF0YSk7XHJcblxyXG4gICAgICBjb25zdCBwYWdlczogc3RyaW5nW10gPSBbXTtcclxuICAgICAgXHJcbiAgICAgICQoJ3NjcmlwdCcpLmVhY2goKF8sIHNjcmlwdCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNjcmlwdENvbnRlbnQgPSAkKHNjcmlwdCkuaHRtbCgpO1xyXG4gICAgICAgIGlmICghc2NyaXB0Q29udGVudCkgcmV0dXJuO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IGltYWdlTWF0Y2hlcyA9IHNjcmlwdENvbnRlbnQubWF0Y2goL2h0dHBzPzpcXC9cXC9bXlxcc1wiJ10rXFwuKD86anBnfGpwZWd8cG5nfHdlYnApL2dpKTtcclxuICAgICAgICBpZiAoaW1hZ2VNYXRjaGVzKSB7XHJcbiAgICAgICAgICBpbWFnZU1hdGNoZXMuZm9yRWFjaCh1cmwgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXBhZ2VzLmluY2x1ZGVzKHVybCkpIHtcclxuICAgICAgICAgICAgICBwYWdlcy5wdXNoKHVybCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIFxyXG4gICAgICAkKCdpbWdbc3JjKj1cInN0YXRpYy5jb21peC50b1wiXScpLmVhY2goKF8sIGltZykgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNyYyA9ICQoaW1nKS5hdHRyKCdzcmMnKSB8fCAkKGltZykuYXR0cignZGF0YS1zcmMnKTtcclxuICAgICAgICBpZiAoc3JjICYmICFwYWdlcy5pbmNsdWRlcyhzcmMpKSB7XHJcbiAgICAgICAgICBwYWdlcy5wdXNoKHNyYyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgXHJcbiAgICAgICQoJ2ltZ1tkYXRhLXNyY10nKS5lYWNoKChfLCBpbWcpID0+IHtcclxuICAgICAgICBjb25zdCBzcmMgPSAkKGltZykuYXR0cignZGF0YS1zcmMnKTtcclxuICAgICAgICBpZiAoc3JjICYmICFwYWdlcy5pbmNsdWRlcyhzcmMpKSB7XHJcbiAgICAgICAgICBwYWdlcy5wdXNoKHNyYyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgY2hhcHRlcklkLFxyXG4gICAgICAgIHBhZ2VzLFxyXG4gICAgICB9O1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihgRXJyb3IgZmV0Y2hpbmcgY2hhcHRlciBkZXRhaWxzIGZvciAke2NoYXB0ZXJJZH06YCwgZXJyb3IpO1xyXG4gICAgICB0aHJvdyBlcnJvcjtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwgImV4cG9ydCAqIGZyb20gJy4vaW1wbC9pbmRleC5qcydcbmV4cG9ydCAqIGZyb20gJy4vQ2hhcHRlci5qcydcbmV4cG9ydCAqIGZyb20gJy4vQ2hhcHRlckRldGFpbHMuanMnXG5leHBvcnQgKiBmcm9tICcuL0Nvb2tpZS5qcydcbmV4cG9ydCAqIGZyb20gJy4vRGlzY292ZXJTZWN0aW9uSXRlbS5qcydcbmV4cG9ydCAqIGZyb20gJy4vRGlzY292ZXJTZWN0aW9uVHlwZS5qcydcbmV4cG9ydCAqIGZyb20gJy4vSG9tZVNlY3Rpb24uanMnXG5leHBvcnQgKiBmcm9tICcuL2luZGV4LmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9NYW5nYUluZm8uanMnXG5leHBvcnQgKiBmcm9tICcuL01hbmdhUHJvZ3Jlc3MuanMnXG5leHBvcnQgKiBmcm9tICcuL1BhZ2VkUmVzdWx0cy5qcydcbmV4cG9ydCAqIGZyb20gJy4vUEJDYW52YXMuanMnXG5leHBvcnQgKiBmcm9tICcuL1BCSW1hZ2UuanMnXG5leHBvcnQgKiBmcm9tICcuL1JlcXVlc3QuanMnXG5leHBvcnQgKiBmcm9tICcuL1Jlc3BvbnNlLmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9TZWFyY2hGaWx0ZXIuanMnXG5leHBvcnQgKiBmcm9tICcuL1NlYXJjaFF1ZXJ5LmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9TZWFyY2hSZXN1bHRJdGVtLmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9Tb3VyY2VNYW5nYS5qcydcbmV4cG9ydCAqIGZyb20gJy4vVGFnLmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9UYWdTZWN0aW9uLmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9UcmFja2VkTWFuZ2FDaGFwdGVyUmVhZEFjdGlvbi5qcydcbmV4cG9ydCAqIGZyb20gJy4vU29ydGluZ09wdGlvbi5qcydcbiIsICJleHBvcnQgKiBmcm9tICcuL1NldHRpbmdzVUkvaW5kZXguanMnXG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZXMvaW5kZXguanMnXG5cbmV4cG9ydCAqIGZyb20gJy4vQXBwbGljYXRpb24uanMnXG5leHBvcnQgKiBmcm9tICcuL1BhcGVyYmFja0ludGVyY2VwdG9yLmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9TZWxlY3Rvci5qcydcbmV4cG9ydCAqIGZyb20gJy4vRXh0ZW5zaW9uLmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9CYXNpY1JhdGVMaW1pdGVyLmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9DbG91ZGZsYXJlRXJyb3IuanMnXG5leHBvcnQgKiBmcm9tICcuL0Nvb2tpZVN0b3JhZ2VJbnRlcmNlcHRvci5qcydcbmV4cG9ydCAqIGZyb20gJy4vVVJMLmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9UZXN0RGVmaW5pdGlvbi5qcydcbmV4cG9ydCAqIGZyb20gJy4vU291cmNlSW5mby5qcydcbiIsICJleHBvcnQgKiBmcm9tICcuL0Zvcm0uanMnXG5leHBvcnQgKiBmcm9tICcuL0Zvcm1JdGVtRWxlbWVudC5qcydcbmV4cG9ydCAqIGZyb20gJy4vRm9ybVNlY3Rpb24uanMnXG4iLCAiaW1wb3J0IHR5cGUgeyBGb3JtU2VjdGlvbkVsZW1lbnQgfSBmcm9tICcuL0Zvcm1TZWN0aW9uLmpzJ1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRm9ybSB7XG4gIHJlbG9hZEZvcm0oKSB7XG4gICAgLy8gQHRzLWV4cGVjdC1lcnJvciBoaWRkZW4gZmllbGRcbiAgICBjb25zdCBmb3JtSWQgPSB0aGlzWydfX3VuZGVybHlpbmdfZm9ybUlkJ10gYXMgc3RyaW5nIHwgdW5kZWZpbmVkXG5cbiAgICBpZiAoIWZvcm1JZCkgcmV0dXJuXG5cbiAgICAvLyBAdHMtZXhwZWN0LWVycm9yIGhpZGRlbiBmdW5jdGlvblxuICAgIEFwcGxpY2F0aW9uLmZvcm1EaWRDaGFuZ2UoZm9ybUlkKVxuICB9XG5cbiAgYWJzdHJhY3QgZ2V0U2VjdGlvbnMoKTogRm9ybVNlY3Rpb25FbGVtZW50W11cblxuICAvKiBMaWZlIGN5Y2xlIG1ldGhvZHMsIGFsd2F5cyBjYWxsZWQsIGVycm9ycyBsb2dnZWQgYnV0IGlnbm9yZWQgKi9cbiAgZm9ybVdpbGxBcHBlYXI/KCk6IHZvaWRcbiAgZm9ybURpZEFwcGVhcj8oKTogdm9pZFxuICBmb3JtV2lsbERpc2FwcGVhcj8oKTogdm9pZFxuICBmb3JtRGlkRGlzYXBwZWFyPygpOiB2b2lkXG5cbiAgLy8gSWYgdGhpcyByZXR1cm5zIHRydWUsIHRoZSBhcHAgd2lsbCBkaXNwbGF5IGBTdWJtaXRgIGFuZCBgQ2FuY2VsYCBidXR0b25zXG4gIC8vIGFuZCBjYWxsIHRoZSByZWxldmFudCBtZXRob2RzIHdoZW4gdGhleSBhcmUgcHJlc3NlZFxuICBnZXQgcmVxdWlyZXNFeHBsaWNpdFN1Ym1pc3Npb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICAvLyBUaGUgYXBwIGNhbGxzIHRoaXMgbWV0aG9kIHdoZW4gdGhlIHVzZXIgcHJlc3NlcyBgU3VibWl0YFxuICAvLyBUaHJvdyBhbiBlcnJvciBoZXJlIHRvIGhhbHQgdGhlIGRpc21pc3NhbCBhbmQgZGlzcGxheSBhbiBhbGVydCBwb3B1cFxuICBmb3JtRGlkU3VibWl0PygpOiBQcm9taXNlPHZvaWQ+XG5cbiAgLy8gVGhlIGFwcCBjYWxscyB0aGlzIG1ldGhvZCB3aGVuIHRoZSB1c2VyIHByZXNzZXMgYENhbmNlbGBcbiAgLy8gQW55IGVycm9ycyB0aHJvd24gZnJvbSBoZXJlIGFyZSBpZ25vcmVkIGFuZCB0aGUgZGlzbWlzc2FsIGlzIG5vdCBibG9ja2VkXG4gIGZvcm1EaWRDYW5jZWw/KCk6IHZvaWRcbn1cbiIsICJpbXBvcnQgdHlwZSB7IENvb2tpZSB9IGZyb20gJy4uLy4uL0Nvb2tpZS5qcydcbmltcG9ydCB0eXBlIHsgUmVxdWVzdCB9IGZyb20gJy4uLy4uL1JlcXVlc3QuanMnXG5pbXBvcnQgdHlwZSB7IFNlbGVjdG9ySUQgfSBmcm9tICcuLi9TZWxlY3Rvci5qcydcbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuL0Zvcm0uanMnXG5cbmV4cG9ydCBpbnRlcmZhY2UgRm9ybUl0ZW1FbGVtZW50PFQ+IHtcbiAgaWQ6IHN0cmluZ1xuICB0eXBlOiBUXG4gIGlzSGlkZGVuOiBib29sZWFuXG59XG5cbnR5cGUgVHlwZWRSb3dFbGVtZW50PFQsIFA+ID0gRm9ybUl0ZW1FbGVtZW50PFQ+ICYgUFxuXG50eXBlIExhYmVsUm93RWxlbWVudCA9IFR5cGVkUm93RWxlbWVudDwnbGFiZWxSb3cnLCBMYWJlbFJvd1Byb3BzPlxudHlwZSBPQXV0aEJ1dHRvblJvd0VsZW1lbnQgPSBUeXBlZFJvd0VsZW1lbnQ8XG4gICdvYXV0aEJ1dHRvblJvdycsXG4gIE9BdXRoQnV0dG9uUm93UHJvcHNcbj5cbnR5cGUgTmF2aWdhdGlvblJvd0VsZW1lbnQgPSBUeXBlZFJvd0VsZW1lbnQ8J25hdmlnYXRpb25Sb3cnLCBOYXZpZ2F0aW9uUm93UHJvcHM+XG50eXBlIEJ1dHRvblJvd0VsZW1lbnQgPSBUeXBlZFJvd0VsZW1lbnQ8J2J1dHRvblJvdycsIEJ1dHRvblJvd1Byb3BzPlxudHlwZSBTZWxlY3RSb3dFbGVtZW50ID0gVHlwZWRSb3dFbGVtZW50PCdzZWxlY3RSb3cnLCBTZWxlY3RSb3dQcm9wcz5cbnR5cGUgVG9nZ2xlUm93RWxlbWVudCA9IFR5cGVkUm93RWxlbWVudDwndG9nZ2xlUm93JywgVG9nZ2xlUm93UHJvcHM+XG50eXBlIElucHV0Um93RWxlbWVudCA9IFR5cGVkUm93RWxlbWVudDwnaW5wdXRSb3cnLCBJbnB1dFJvd1Byb3BzPlxudHlwZSBTdGVwcGVyUm93RWxlbWVudCA9IFR5cGVkUm93RWxlbWVudDwnc3RlcHBlclJvdycsIFN0ZXBwZXJSb3dQcm9wcz5cbnR5cGUgV2ViVmlld1Jvd0VsZW1lbnQgPSBUeXBlZFJvd0VsZW1lbnQ8J3dlYlZpZXdSb3cnLCBXZWJWaWV3Um93UHJvcHM+XG5cbmV4cG9ydCB0eXBlIExhYmVsUm93UHJvcHMgPSB7XG4gIHRpdGxlOiBzdHJpbmdcbiAgc3VidGl0bGU/OiBzdHJpbmdcbiAgdmFsdWU/OiBzdHJpbmdcbiAgaXNIaWRkZW4/OiBib29sZWFuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBMYWJlbFJvdyhpZDogc3RyaW5nLCBwcm9wczogTGFiZWxSb3dQcm9wcyk6IExhYmVsUm93RWxlbWVudCB7XG4gIHJldHVybiB7IC4uLnByb3BzLCBpZCwgdHlwZTogJ2xhYmVsUm93JywgaXNIaWRkZW46IHByb3BzLmlzSGlkZGVuID8/IGZhbHNlIH1cbn1cblxuZXhwb3J0IHR5cGUgSW5wdXRSb3dQcm9wcyA9IHtcbiAgdGl0bGU6IHN0cmluZ1xuICB2YWx1ZTogc3RyaW5nXG4gIGlzSGlkZGVuPzogYm9vbGVhblxuICBvblZhbHVlQ2hhbmdlOiBTZWxlY3RvcklEPCh2YWx1ZTogc3RyaW5nKSA9PiBQcm9taXNlPHZvaWQ+PlxufVxuXG5leHBvcnQgZnVuY3Rpb24gSW5wdXRSb3coaWQ6IHN0cmluZywgcHJvcHM6IElucHV0Um93UHJvcHMpOiBJbnB1dFJvd0VsZW1lbnQge1xuICByZXR1cm4geyAuLi5wcm9wcywgaWQsIHR5cGU6ICdpbnB1dFJvdycsIGlzSGlkZGVuOiBwcm9wcy5pc0hpZGRlbiA/PyBmYWxzZSB9XG59XG5cbmV4cG9ydCB0eXBlIFN0ZXBwZXJSb3dQcm9wcyA9IHtcbiAgdGl0bGU6IHN0cmluZ1xuICBzdWJ0aXRsZT86IHN0cmluZ1xuXG4gIHZhbHVlOiBudW1iZXJcblxuICBtaW5WYWx1ZTogbnVtYmVyXG4gIG1heFZhbHVlOiBudW1iZXJcbiAgc3RlcFZhbHVlOiBudW1iZXJcbiAgbG9vcE92ZXI6IGJvb2xlYW5cblxuICBpc0hpZGRlbj86IGJvb2xlYW5cblxuICBvblZhbHVlQ2hhbmdlOiBTZWxlY3RvcklEPCh2YWx1ZTogbnVtYmVyKSA9PiBQcm9taXNlPHZvaWQ+PlxufVxuXG5leHBvcnQgZnVuY3Rpb24gU3RlcHBlclJvdyhcbiAgaWQ6IHN0cmluZyxcbiAgcHJvcHM6IFN0ZXBwZXJSb3dQcm9wc1xuKTogU3RlcHBlclJvd0VsZW1lbnQge1xuICByZXR1cm4ge1xuICAgIC4uLnByb3BzLFxuICAgIGlkLFxuICAgIHR5cGU6ICdzdGVwcGVyUm93JyxcbiAgICBpc0hpZGRlbjogcHJvcHMuaXNIaWRkZW4gPz8gZmFsc2UsXG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgVG9nZ2xlUm93UHJvcHMgPSB7XG4gIHRpdGxlOiBzdHJpbmdcbiAgc3VidGl0bGU/OiBzdHJpbmdcbiAgdmFsdWU6IGJvb2xlYW5cbiAgaXNIaWRkZW4/OiBib29sZWFuXG4gIG9uVmFsdWVDaGFuZ2U6IFNlbGVjdG9ySUQ8KHZhbHVlOiBib29sZWFuKSA9PiBQcm9taXNlPHZvaWQ+PlxufVxuXG5leHBvcnQgZnVuY3Rpb24gVG9nZ2xlUm93KGlkOiBzdHJpbmcsIHByb3BzOiBUb2dnbGVSb3dQcm9wcyk6IFRvZ2dsZVJvd0VsZW1lbnQge1xuICByZXR1cm4geyAuLi5wcm9wcywgaWQsIHR5cGU6ICd0b2dnbGVSb3cnLCBpc0hpZGRlbjogcHJvcHMuaXNIaWRkZW4gPz8gZmFsc2UgfVxufVxuXG5leHBvcnQgdHlwZSBTZWxlY3RSb3dQcm9wcyA9IHtcbiAgdGl0bGU6IHN0cmluZ1xuICBzdWJ0aXRsZT86IHN0cmluZ1xuICB2YWx1ZTogc3RyaW5nW11cbiAgbWluSXRlbUNvdW50OiBudW1iZXJcbiAgbWF4SXRlbUNvdW50OiBudW1iZXJcbiAgb3B0aW9uczogeyBpZDogc3RyaW5nOyB0aXRsZTogc3RyaW5nIH1bXVxuICBpc0hpZGRlbj86IGJvb2xlYW5cbiAgb25WYWx1ZUNoYW5nZTogU2VsZWN0b3JJRDwodmFsdWU6IHN0cmluZ1tdKSA9PiBQcm9taXNlPHZvaWQ+PlxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2VsZWN0Um93KGlkOiBzdHJpbmcsIHByb3BzOiBTZWxlY3RSb3dQcm9wcyk6IFNlbGVjdFJvd0VsZW1lbnQge1xuICByZXR1cm4geyAuLi5wcm9wcywgaWQsIHR5cGU6ICdzZWxlY3RSb3cnLCBpc0hpZGRlbjogcHJvcHMuaXNIaWRkZW4gPz8gZmFsc2UgfVxufVxuXG5leHBvcnQgdHlwZSBCdXR0b25Sb3dQcm9wcyA9IHtcbiAgdGl0bGU6IHN0cmluZ1xuICBpc0hpZGRlbj86IGJvb2xlYW5cbiAgb25TZWxlY3Q6IFNlbGVjdG9ySUQ8KCkgPT4gUHJvbWlzZTx2b2lkPj5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEJ1dHRvblJvdyhpZDogc3RyaW5nLCBwcm9wczogQnV0dG9uUm93UHJvcHMpOiBCdXR0b25Sb3dFbGVtZW50IHtcbiAgcmV0dXJuIHsgLi4ucHJvcHMsIGlkLCB0eXBlOiAnYnV0dG9uUm93JywgaXNIaWRkZW46IHByb3BzLmlzSGlkZGVuID8/IGZhbHNlIH1cbn1cblxuZXhwb3J0IHR5cGUgV2ViVmlld1Jvd1Byb3BzID0ge1xuICB0aXRsZTogc3RyaW5nXG4gIHJlcXVlc3Q6IFJlcXVlc3RcbiAgaXNIaWRkZW4/OiBib29sZWFuXG4gIG9uQ29tcGxldGU6IFNlbGVjdG9ySUQ8KGNvb2tpZXM6IENvb2tpZVtdKSA9PiBQcm9taXNlPHZvaWQ+PlxuICBvbkNhbmNlbDogU2VsZWN0b3JJRDwoKSA9PiBQcm9taXNlPHZvaWQ+PlxufVxuXG5leHBvcnQgZnVuY3Rpb24gV2ViVmlld1JvdyhcbiAgaWQ6IHN0cmluZyxcbiAgcHJvcHM6IFdlYlZpZXdSb3dQcm9wc1xuKTogV2ViVmlld1Jvd0VsZW1lbnQge1xuICByZXR1cm4ge1xuICAgIC4uLnByb3BzLFxuICAgIGlkLFxuICAgIHR5cGU6ICd3ZWJWaWV3Um93JyxcbiAgICBpc0hpZGRlbjogcHJvcHMuaXNIaWRkZW4gPz8gZmFsc2UsXG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgTmF2aWdhdGlvblJvd1Byb3BzID0ge1xuICB0aXRsZTogc3RyaW5nXG4gIHN1YnRpdGxlPzogc3RyaW5nXG4gIHZhbHVlPzogc3RyaW5nXG4gIGlzSGlkZGVuPzogYm9vbGVhblxuICBmb3JtOiBGb3JtXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBOYXZpZ2F0aW9uUm93KFxuICBpZDogc3RyaW5nLFxuICBwcm9wczogTmF2aWdhdGlvblJvd1Byb3BzXG4pOiBOYXZpZ2F0aW9uUm93RWxlbWVudCB7XG4gIHJldHVybiB7XG4gICAgLi4ucHJvcHMsXG4gICAgaWQsXG4gICAgdHlwZTogJ25hdmlnYXRpb25Sb3cnLFxuICAgIGlzSGlkZGVuOiBwcm9wcy5pc0hpZGRlbiA/PyBmYWxzZSxcbiAgfVxufVxuXG5leHBvcnQgdHlwZSBPQXV0aEJ1dHRvblJvd1Byb3BzID0ge1xuICB0aXRsZTogc3RyaW5nXG4gIHN1YnRpdGxlPzogc3RyaW5nXG5cbiAgb25TdWNjZXNzOiBTZWxlY3RvcklEPFxuICAgIChyZWZyZXNoVG9rZW46IHN0cmluZywgYWNjZXNzVG9rZW46IHN0cmluZykgPT4gUHJvbWlzZTx2b2lkPlxuICA+XG4gIGF1dGhvcml6ZUVuZHBvaW50OiBzdHJpbmdcbiAgcmVzcG9uc2VUeXBlOlxuICAgIHwge1xuICAgICAgICB0eXBlOiAndG9rZW4nXG4gICAgICB9XG4gICAgfCB7XG4gICAgICAgIHR5cGU6ICdjb2RlJ1xuICAgICAgICB0b2tlbkVuZHBvaW50OiBzdHJpbmdcbiAgICAgIH1cbiAgICB8IHtcbiAgICAgICAgdHlwZTogJ3BrY2UnXG4gICAgICAgIHRva2VuRW5kcG9pbnQ6IHN0cmluZ1xuICAgICAgICBwa2NlQ29kZUxlbmd0aDogbnVtYmVyXG4gICAgICAgIHBrY2VDb2RlTWV0aG9kOiAnUzI1NicgfCAncGxhaW4nXG4gICAgICAgIGZvcm1FbmNvZGVHcmFudDogYm9vbGVhblxuICAgICAgfVxuICBjbGllbnRJZD86IHN0cmluZ1xuICByZWRpcmVjdFVyaT86IHN0cmluZ1xuICBzY29wZXM/OiBzdHJpbmdbXVxuXG4gIGlzSGlkZGVuPzogYm9vbGVhblxufVxuXG5leHBvcnQgZnVuY3Rpb24gT0F1dGhCdXR0b25Sb3coXG4gIGlkOiBzdHJpbmcsXG4gIHByb3BzOiBPQXV0aEJ1dHRvblJvd1Byb3BzXG4pOiBPQXV0aEJ1dHRvblJvd0VsZW1lbnQge1xuICByZXR1cm4ge1xuICAgIC4uLnByb3BzLFxuICAgIGlkLFxuICAgIHR5cGU6ICdvYXV0aEJ1dHRvblJvdycsXG4gICAgaXNIaWRkZW46IHByb3BzLmlzSGlkZGVuID8/IGZhbHNlLFxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBEZWZlcnJlZEl0ZW08ViwgVCBleHRlbmRzIEZvcm1JdGVtRWxlbWVudDxWPj4od29yazogKCkgPT4gVCk6IFRcbmV4cG9ydCBmdW5jdGlvbiBEZWZlcnJlZEl0ZW08ViwgVCBleHRlbmRzIEZvcm1JdGVtRWxlbWVudDxWPj4oXG4gIHdvcms6ICgpID0+IFQgfCB1bmRlZmluZWRcbik6IFQgfCB1bmRlZmluZWQge1xuICByZXR1cm4gd29yaygpXG59XG4iLCAiaW1wb3J0IHR5cGUgeyBGb3JtSXRlbUVsZW1lbnQgfSBmcm9tICcuL0Zvcm1JdGVtRWxlbWVudC5qcydcblxuZXhwb3J0IGludGVyZmFjZSBGb3JtU2VjdGlvbkVsZW1lbnQge1xuICBpZDogc3RyaW5nXG4gIGhlYWRlcj86IHN0cmluZ1xuICBmb290ZXI/OiBzdHJpbmdcbiAgaXRlbXM6IEZvcm1JdGVtRWxlbWVudDx1bmtub3duPltdXG59XG5cbmV4cG9ydCB0eXBlIFNlY3Rpb25JbmZvID0ge1xuICBpZDogc3RyaW5nXG4gIGhlYWRlcj86IHN0cmluZ1xuICBmb290ZXI/OiBzdHJpbmdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNlY3Rpb24oXG4gIHBhcmFtczogc3RyaW5nIHwgU2VjdGlvbkluZm8sXG4gIGl0ZW1zOiAoRm9ybUl0ZW1FbGVtZW50PHVua25vd24+IHwgdW5kZWZpbmVkKVtdXG4pOiBGb3JtU2VjdGlvbkVsZW1lbnQge1xuICBsZXQgaW5mbzogU2VjdGlvbkluZm9cbiAgaWYgKHR5cGVvZiBwYXJhbXMgPT09ICdzdHJpbmcnKSB7XG4gICAgaW5mbyA9IHsgaWQ6IHBhcmFtcyB9XG4gIH0gZWxzZSB7XG4gICAgaW5mbyA9IHBhcmFtc1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5pbmZvLFxuICAgIGl0ZW1zOiBpdGVtcy5maWx0ZXIoKHgpID0+IHgpIGFzIEZvcm1JdGVtRWxlbWVudDx1bmtub3duPltdLFxuICB9XG59XG5cbi8vIHR5cGUgTGlzdFNlY3Rpb25Qcm9wcyA9IHtcbi8vICAgaXRlbXM6IHVua25vd25cbi8vICAgYWxsb3dEZWxldGlvbjogYm9vbGVhblxuLy8gICBvblJlbW92ZTogU2VsZWN0b3JJRDwoKSA9PiBQcm9taXNlPHZvaWQ+PlxuLy8gICBhbGxvd0FkZGl0aW9uOiBib29sZWFuXG4vLyAgIG9uQWRkOiBTZWxlY3RvcklEPCgpID0+IFByb21pc2U8dm9pZD4+XG4vLyAgIHJvd0J1aWxkZXI6IChpdGVtOiB1bmtub3duKSA9PiBGb3JtSXRlbUVsZW1lbnQ8dW5rbm93bj5cbi8vIH1cblxuLy8gZnVuY3Rpb24gTGlzdFNlY3Rpb24oaWQ6IHN0cmluZywgcHJvcHM6IExpc3RTZWN0aW9uUHJvcHMpIHtcbi8vIFRPRE9cbi8vIExpc3RTZWN0aW9uKCdteVNlY3Rpb24nLCB7XG4vLyAgICAgaXRlbXM6IFt7IHZhbHVlOiAnaGVsbG8nLCBpZDogJ3dvcmxkJyB9XSxcbi8vICAgICBhbGxvd0RlbGV0aW9uOiB0cnVlLFxuLy8gICAgIG9uUmVtb3ZlOiBBcHBsaWNhdGlvbi5zZWxlY3Rvcih0aGlzLCAnbXlJdGVtRGlkUmVtb3ZlJyksXG4vLyAgICAgYWxsb3dBZGRpdGlvbjogdHJ1ZSxcbi8vICAgICBvbkFkZDogQXBwbGljYXRpb24uc2VsZWN0b3IodGhpcywgJ215SXRlbURpZEFkZCcpLFxuLy8gICAgIHJvd0J1aWxkZXI6IChlbGVtZW50KSA9PiBJbnB1dFJvdygnbXlSb3cnLCB7XG4vLyAgICAgICAgIGlkOiBlbGVtZW50LmlkLFxuLy8gICAgICAgICB2YWx1ZTogZWxlbWVudC52YWx1ZSxcbi8vICAgICAgICAgcGxhY2Vob2xkZXI6ICdGb28nXG4vLyAgICAgfSlcbi8vIH0pXG4vLyB9XG4iLCAiZXhwb3J0ICogZnJvbSAnLi9DaGFwdGVyUHJvdmlkaW5nLmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9DbG91ZGZsYXJlQnlwYXNzUmVxdWVzdFByb3ZpZGluZy5qcydcbmV4cG9ydCAqIGZyb20gJy4vRGlzY292ZXJTZWN0aW9uUHJvdmlkaW5nLmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9NYW5hZ2VkQ29sbGVjdGlvblByb3ZpZGluZy5qcydcbmV4cG9ydCAqIGZyb20gJy4vTWFuZ2FQcm9ncmVzc1Byb3ZpZGluZy5qcydcbmV4cG9ydCAqIGZyb20gJy4vTWFuZ2FQcm92aWRpbmcuanMnXG5leHBvcnQgKiBmcm9tICcuL1NlYXJjaFJlc3VsdHNQcm92aWRpbmcuanMnXG5leHBvcnQgKiBmcm9tICcuL1NldHRpbmdzRm9ybVByb3ZpZGluZy5qcydcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbmV4cG9ydCBmdW5jdGlvbiBoYXNQcm9wZXJ0aWVzT2Y8VD4ocHJvcGVydGllczogKGtleW9mIFQpW10sIG9iajogYW55KTogb2JqIGlzIFQge1xuICByZXR1cm4gcHJvcGVydGllcy5ldmVyeSgoaykgPT4gayBpbiBvYmopXG59IiwgImltcG9ydCB0eXBlIHsgQ2hhcHRlciB9IGZyb20gJy4uLy4uL0NoYXB0ZXIuanMnXG5pbXBvcnQgdHlwZSB7IENoYXB0ZXJEZXRhaWxzIH0gZnJvbSAnLi4vLi4vQ2hhcHRlckRldGFpbHMuanMnXG5pbXBvcnQgdHlwZSB7IFNvdXJjZU1hbmdhIH0gZnJvbSAnLi4vLi4vU291cmNlTWFuZ2EuanMnXG5pbXBvcnQgeyBoYXNQcm9wZXJ0aWVzT2YgfSBmcm9tICcuL2luZGV4LmpzJ1xuaW1wb3J0IHR5cGUgeyBNYW5nYVByb3ZpZGluZyB9IGZyb20gJy4vTWFuZ2FQcm92aWRpbmcuanMnXG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2hhcHRlclByb3ZpZGluZyBleHRlbmRzIE1hbmdhUHJvdmlkaW5nIHtcbiAgLyoqXG4gICAqIEBwYXJhbSBzb3VyY2VNYW5nYSBUaGUgc291cmNlTWFuZ2EgZm9yIHdoaWNoIHRoZSBjaGFwdGVycyBzaG91bGQgYmUgZmV0Y2hlZFxuICAgKi9cbiAgZ2V0Q2hhcHRlcnMoc291cmNlTWFuZ2E6IFNvdXJjZU1hbmdhLCBzaW5jZURhdGU/OiBEYXRlKTogUHJvbWlzZTxDaGFwdGVyW10+XG5cbiAgLyoqXG4gICAqIEBwYXJhbSBjaGFwdGVyIFRoZSBjaGFwdGVyIGxpc3RpbmcgZm9yIHdoaWNoIHRoZSBkZXRhaWxzIHNob3VsZCBiZSBmZXRjaGVkXG4gICAqL1xuICBnZXRDaGFwdGVyRGV0YWlscyhjaGFwdGVyOiBDaGFwdGVyKTogUHJvbWlzZTxDaGFwdGVyRGV0YWlscz5cblxuICAvKipcbiAgICogSW1wbGVtZW50IHRoaXMgT05MWSBpZiB0aGUgc291cmNlIGNhbiBkZXRlcm1pbmUsIGluIGJ1bGssIHdoaWNoIHRpdGxlIGhhcyBiZWVuIHVwZGF0ZWRcbiAgICogWW91IGNhbiBhbHNvIHVzZSB0aGlzIHRvIHNraXAgdGhlIGFwcCBjYWxsaW5nIHtAbGluayBnZXROZXdDaGFwdGVyc30gZW50aXJlbHkgYW5kIHByb3ZpZGUgbmV3XG4gICAqIGNoYXB0ZXIgaW4gaGVyZVxuICAgKiBAcGFyYW0gdXBkYXRlTWFuYWdlciB0aGUgdXBkYXRlIG1hbmFnZXIgd2hpY2ggd2lsbCBiZSByZXNwb25zaWJsZSBmb3IgZmV0Y2hpbmcgdXBkYXRlcywgRE8gTk9UIFNUT1JFIFRISVNcbiAgICogQHBhcmFtIGxhc3RVcGRhdGVEYXRlIGxhc3QgdGltZSB0aGUgYXBwIHN1Y2Nlc3NmdWxseSBmZXRjaGVkIHVwZGF0ZXNcbiAgICogXG4gICAqIE5vdGVzOlxuICAgKiAtIElmIHlvdXIgc291cmNlIG5lZWRzIGNsb3VkZmxhcmUgYnlwYXNzIHRocm93IGEge0BsaW5rIENsb3VkZmxhcmVFcnJvcn0gaGVyZVxuICAgKi9cbiAgcHJvY2Vzc1RpdGxlc0ZvclVwZGF0ZXM/KFxuICAgIHVwZGF0ZU1hbmFnZXI6IFVwZGF0ZU1hbmFnZXIsXG4gICAgbGFzdFVwZGF0ZURhdGU/OiBEYXRlXG4gICk6IFByb21pc2U8dm9pZD5cbn1cblxuZXhwb3J0IGludGVyZmFjZSBVcGRhdGVNYW5hZ2VyIHtcbiAgZ2V0UXVldWVkSXRlbXMoKTogU291cmNlTWFuZ2FbXVxuXG4gIHNldFVwZGF0ZVByaW9yaXR5KFxuICAgIG1hbmdhSWQ6IHN0cmluZyxcbiAgICB1cGRhdGVQcmlvcml0eTogJ2hpZ2gnIHwgJ2xvdycgfCAnc2tpcCdcbiAgKTogUHJvbWlzZTx2b2lkPlxuXG4gIGdldE51bWJlck9mQ2hhcHRlcnMobWFuZ2FJZDogc3RyaW5nKTogUHJvbWlzZTxudW1iZXI+XG5cbiAgLyoqXG4gICAqIEdldCBhbGwgY2hhcHRlcnMgZm9yIGEgdGl0bGUgZnJvbSBhcHAgZGJcbiAgICogXG4gICAqIFRoaXMgY2FuIHBvdGVudGlhbGx5IGJlIGEgcmVhbGx5IGV4cGVuc2l2ZSBjYWxsLCBvbmx5IHBlcmZvcm0gdGhpcyB3aGVuIHlvdSBrbm93IHlvdSdsbCBiZSBzYXZpbmcgbWFueSByZXF1ZXN0cy5cbiAgICpcbiAgICogSW4gZ2VuZXJhbCwgYXZvaWQgZG9pbmcgZGlmZmluZyBpbiB0aGUgc291cmNlIGFuZCBsZXQgdGhlIGFwcCBoYW5kbGUgbWVyZ2luZyBjaGFwdGVycy5cbiAgICpcbiAgICogQSBwb3RlbnRpYWwgdXNlLWNhc2UgZm9yIHRoaXMgbWV0aG9kIGlzIGRldGVybWluaW5nIHdoYXQgdGhlIHNvcnQtaW5kZXggaXMgZm9yIHRoZSBuZXcgY2hhcHRlcnNcbiAgICovXG4gIGdldENoYXB0ZXJzKG1hbmdhSWQ6IHN0cmluZyk6IFByb21pc2U8Q2hhcHRlcltdPlxuXG4gIC8qKlxuICAgKiBQcm92aWRlIG5ldyBjaGFwdGVycyBmb3IgdGhlIGdpdmVuIG1hbmdhIHVwZnJvbnQsIHNraXBwaW5nIGl0cyBgZ2V0Q2hhcHRlcnNgIGNhbGwuXG4gICAqXG4gICAqIE5vdGU6XG4gICAqIC0gaWYgc291cmNlIHNldHMgYHNvcnRpbmdJbmRleGAsIG1ha2Ugc3VyZSBpdCBpcyBzZXQgY29ycmVjdGx5IGZvciB0aGUgbmV3IGNoYXB0ZXJzLlxuICAgKiAtIE9ubHkgdXNlIHRoaXMgaWYgaXQncyBhIG1vcmUgZWZmaWNpZW50IGNhbGwgdGhhbiBgQ2hhcHRlclByb3ZpZGluZy5nZXRDaGFwdGVyc2BcbiAgICovXG4gIHNldE5ld0NoYXB0ZXJzKFxuICAgIG1hbmdhSWQ6IHN0cmluZyxcbiAgICBjaGFwdGVyczogQ2hhcHRlcltdIHwgdW5kZWZpbmVkXG4gICk6IFByb21pc2U8dm9pZD5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGltcGxlbWVudHNDaGFwdGVyUHJvdmlkaW5nKFxuICBleHRlbnNpb246IE1hbmdhUHJvdmlkaW5nXG4pOiBleHRlbnNpb24gaXMgQ2hhcHRlclByb3ZpZGluZyB7XG4gIHJldHVybiBoYXNQcm9wZXJ0aWVzT2Y8Q2hhcHRlclByb3ZpZGluZz4oXG4gICAgWydnZXRDaGFwdGVycycsICdnZXRNYW5nYURldGFpbHMnXSxcbiAgICBleHRlbnNpb25cbiAgKVxufVxuIiwgImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUNsb3VkZmxhcmVCeXBhc3NSZXF1ZXN0UHJvdmlkaW5nLmpzLm1hcCIsICJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1EaXNjb3ZlclNlY3Rpb25Qcm92aWRpbmcuanMubWFwIiwgImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU1hbmFnZWRDb2xsZWN0aW9uUHJvdmlkaW5nLmpzLm1hcCIsICJpbXBvcnQgdHlwZSB7IE1hbmdhUHJvZ3Jlc3MgfSBmcm9tICcuLi8uLi9NYW5nYVByb2dyZXNzLmpzJ1xuaW1wb3J0IHR5cGUgeyBTb3VyY2VNYW5nYSB9IGZyb20gJy4uLy4uL1NvdXJjZU1hbmdhLmpzJ1xuaW1wb3J0IHR5cGUgeyBUcmFja2VkTWFuZ2FDaGFwdGVyUmVhZEFjdGlvbiB9IGZyb20gJy4uLy4uL1RyYWNrZWRNYW5nYUNoYXB0ZXJSZWFkQWN0aW9uLmpzJ1xuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4uL1NldHRpbmdzVUkvRm9ybS5qcydcblxuZXhwb3J0IHR5cGUgQ2hhcHRlclJlYWRBY3Rpb25RdWV1ZVByb2Nlc3NpbmdSZXN1bHQgPSB7XG4gIHN1Y2Nlc3NmdWxJdGVtczogc3RyaW5nW11cbiAgZmFpbGVkSXRlbXM6IHN0cmluZ1tdXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWFuZ2FQcm9ncmVzc1Byb3ZpZGluZyB7XG4gIGdldE1hbmdhUHJvZ3Jlc3NNYW5hZ2VtZW50Rm9ybShzb3VyY2VNYW5nYTogU291cmNlTWFuZ2EpOiBQcm9taXNlPEZvcm0+XG4gIGdldE1hbmdhUHJvZ3Jlc3Moc291cmNlTWFuZ2E6IFNvdXJjZU1hbmdhKTogUHJvbWlzZTxNYW5nYVByb2dyZXNzIHwgdW5kZWZpbmVkPlxuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRhdGlvbiBOb3RlczpcbiAgICogICAtIEhhbmRsZSBhbGwgZXJyb3JzLCB0aHJvd2luZyBjYW4gY2F1c2UgaXNzdWVzXG4gICAqICAgLSBJZiBhIGNoYXB0ZXIgYWN0aW9uIGlzIHB1c2hlZCwgaXQgc2hvdWxkIGJlIGluIGVpdGhlciBgc3VjY2Vzc2Z1bEl0ZW1zYCBvciBgZmFpbGVkSXRlbXNgXG4gICAqICAgLSBJdGVtcyBub3QgaW4gZWl0aGVyIGBDaGFwdGVyUmVhZEFjdGlvblF1ZXVlUHJvY2Vzc2luZ1Jlc3VsdGAgZmllbGRzIHdpbGwgYmUgc2VlbiBhcyBcIm5vdCBhdHRlbXB0ZWRcIlxuICAgKi9cbiAgcHJvY2Vzc0NoYXB0ZXJSZWFkQWN0aW9uUXVldWUoXG4gICAgYWN0aW9uczogVHJhY2tlZE1hbmdhQ2hhcHRlclJlYWRBY3Rpb25bXVxuICApOiBQcm9taXNlPENoYXB0ZXJSZWFkQWN0aW9uUXVldWVQcm9jZXNzaW5nUmVzdWx0PlxufVxuIiwgImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU1hbmdhUHJvdmlkaW5nLmpzLm1hcCIsICJpbXBvcnQgdHlwZSB7IFBhZ2VkUmVzdWx0cyB9IGZyb20gJy4uLy4uL1BhZ2VkUmVzdWx0cy5qcydcbmltcG9ydCB0eXBlIHsgU2VhcmNoRmlsdGVyIH0gZnJvbSAnLi4vLi4vU2VhcmNoRmlsdGVyLmpzJ1xuaW1wb3J0IHR5cGUgeyBTZWFyY2hRdWVyeSB9IGZyb20gJy4uLy4uL1NlYXJjaFF1ZXJ5LmpzJ1xuaW1wb3J0IHR5cGUgeyBTZWFyY2hSZXN1bHRJdGVtIH0gZnJvbSAnLi4vLi4vU2VhcmNoUmVzdWx0SXRlbS5qcydcbmltcG9ydCB0eXBlIHsgU29ydGluZ09wdGlvbiB9IGZyb20gJy4uLy4uL1NvcnRpbmdPcHRpb24uanMnXG5pbXBvcnQgeyBoYXNQcm9wZXJ0aWVzT2YgfSBmcm9tICcuL2luZGV4LmpzJ1xuaW1wb3J0IHR5cGUgeyBNYW5nYVByb3ZpZGluZyB9IGZyb20gJy4vTWFuZ2FQcm92aWRpbmcuanMnXG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgVXNlIHtAbGluayBTZWFyY2hSZXN1bHRzUHJvdmlkaW5nfVxuICovXG5leHBvcnQgdHlwZSBTZWFyY2hhYmxlID0gU2VhcmNoUmVzdWx0c1Byb3ZpZGluZ1xuXG5leHBvcnQgaW50ZXJmYWNlIFNlYXJjaFJlc3VsdHNQcm92aWRpbmcgZXh0ZW5kcyBNYW5nYVByb3ZpZGluZyB7XG4gIGdldFNlYXJjaEZpbHRlcnMoKTogUHJvbWlzZTxTZWFyY2hGaWx0ZXJbXT5cblxuICBnZXRTZWFyY2hSZXN1bHRzKFxuICAgIHF1ZXJ5OiBTZWFyY2hRdWVyeSxcbiAgICBtZXRhZGF0YTogdW5rbm93biB8IHVuZGVmaW5lZCxcbiAgICBzb3J0aW5nT3B0aW9uOiBTb3J0aW5nT3B0aW9uIHwgdW5kZWZpbmVkXG4gICk6IFByb21pc2U8UGFnZWRSZXN1bHRzPFNlYXJjaFJlc3VsdEl0ZW0+PlxuXG4gIGdldFNvcnRpbmdPcHRpb25zPyhxdWVyeTogU2VhcmNoUXVlcnkpOiBQcm9taXNlPFNvcnRpbmdPcHRpb25bXT5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGltcGxlbWVudHNTZWFyY2hSZXN1bHRzUHJvdmlkaW5nKFxuICBleHRlbnNpb246IE1hbmdhUHJvdmlkaW5nXG4pOiBleHRlbnNpb24gaXMgU2VhcmNoUmVzdWx0c1Byb3ZpZGluZyB7XG4gIHJldHVybiBoYXNQcm9wZXJ0aWVzT2Y8U2VhcmNoUmVzdWx0c1Byb3ZpZGluZz4oXG4gICAgWydnZXRTZWFyY2hGaWx0ZXJzJywgJ2dldFNlYXJjaFJlc3VsdHMnXSxcbiAgICBleHRlbnNpb25cbiAgKVxufVxuIiwgImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVNldHRpbmdzRm9ybVByb3ZpZGluZy5qcy5tYXAiLCAiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QXBwbGljYXRpb24uanMubWFwIiwgImltcG9ydCB0eXBlIHsgUmVxdWVzdCB9IGZyb20gJy4uL1JlcXVlc3QuanMnXG5pbXBvcnQgdHlwZSB7IFJlc3BvbnNlIH0gZnJvbSAnLi4vUmVzcG9uc2UuanMnXG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQYXBlcmJhY2tJbnRlcmNlcHRvciB7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBpZDogc3RyaW5nKSB7fVxuXG4gIGFic3RyYWN0IGludGVyY2VwdFJlcXVlc3QocmVxdWVzdDogUmVxdWVzdCk6IFByb21pc2U8UmVxdWVzdD5cbiAgYWJzdHJhY3QgaW50ZXJjZXB0UmVzcG9uc2UoXG4gICAgcmVxdWVzdDogUmVxdWVzdCxcbiAgICByZXNwb25zZTogUmVzcG9uc2UsXG4gICAgZGF0YTogQXJyYXlCdWZmZXJcbiAgKTogUHJvbWlzZTxBcnJheUJ1ZmZlcj5cblxuICByZWdpc3RlckludGVyY2VwdG9yKCkge1xuICAgIEFwcGxpY2F0aW9uLnJlZ2lzdGVySW50ZXJjZXB0b3IoXG4gICAgICB0aGlzLmlkLFxuICAgICAgQXBwbGljYXRpb24uU2VsZWN0b3IodGhpcyBhcyBQYXBlcmJhY2tJbnRlcmNlcHRvciwgJ2ludGVyY2VwdFJlcXVlc3QnKSxcbiAgICAgIEFwcGxpY2F0aW9uLlNlbGVjdG9yKHRoaXMgYXMgUGFwZXJiYWNrSW50ZXJjZXB0b3IsICdpbnRlcmNlcHRSZXNwb25zZScpXG4gICAgKVxuICB9XG5cbiAgdW5yZWdpc3RlckludGVyY2VwdG9yKCkge1xuICAgIEFwcGxpY2F0aW9uLnVucmVnaXN0ZXJJbnRlcmNlcHRvcih0aGlzLmlkKVxuICB9XG59XG4iLCAiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U2VsZWN0b3IuanMubWFwIiwgImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUV4dGVuc2lvbi5qcy5tYXAiLCAiaW1wb3J0IHsgbG9jaywgdW5sb2NrIH0gZnJvbSAnLi9Mb2NrLmpzJ1xuaW1wb3J0IHsgUGFwZXJiYWNrSW50ZXJjZXB0b3IgfSBmcm9tICcuL1BhcGVyYmFja0ludGVyY2VwdG9yLmpzJ1xuaW1wb3J0IHR5cGUgeyBSZXF1ZXN0IH0gZnJvbSAnLi4vUmVxdWVzdC5qcydcbmltcG9ydCB0eXBlIHsgUmVzcG9uc2UgfSBmcm9tICcuLi9SZXNwb25zZS5qcydcblxuZXhwb3J0IHR5cGUgQmFzaWNSYXRlTGltaXRlck9wdGlvbnMgPSB7XG4gIG51bWJlck9mUmVxdWVzdHM6IG51bWJlclxuICBidWZmZXJJbnRlcnZhbDogbnVtYmVyXG4gIGlnbm9yZUltYWdlczogYm9vbGVhblxufVxuXG5leHBvcnQgY2xhc3MgQmFzaWNSYXRlTGltaXRlciBleHRlbmRzIFBhcGVyYmFja0ludGVyY2VwdG9yIHtcbiAgcHJpdmF0ZSBwcm9taXNlPzogUHJvbWlzZTx2b2lkPlxuICBwcml2YXRlIGN1cnJlbnRSZXF1ZXN0c01hZGU6IG51bWJlciA9IDBcbiAgcHJpdmF0ZSBsYXN0UmVzZXQ6IG51bWJlciA9IERhdGUubm93KClcbiAgcHJpdmF0ZSByZWFkb25seSBpbWFnZVJlZ2V4ID0gbmV3IFJlZ0V4cCgvXFwuKHBuZ3xnaWZ8anBlZ3xqcGd8d2VicCkoXFw/fCQpL2kpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgaWQ6IHN0cmluZyxcbiAgICByZWFkb25seSBvcHRpb25zOiBCYXNpY1JhdGVMaW1pdGVyT3B0aW9uc1xuICApIHtcbiAgICBzdXBlcihpZClcbiAgfVxuXG4gIGFzeW5jIGludGVyY2VwdFJlcXVlc3QocmVxdWVzdDogUmVxdWVzdCk6IFByb21pc2U8UmVxdWVzdD4ge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuaWdub3JlSW1hZ2VzICYmIHRoaXMuaW1hZ2VSZWdleC50ZXN0KHJlcXVlc3QudXJsKSkge1xuICAgICAgcmV0dXJuIHJlcXVlc3RcbiAgICB9XG5cbiAgICBhd2FpdCBsb2NrKHRoaXMuaWQpXG4gICAgYXdhaXQgdGhpcy5pbmNyZW1lbnRSZXF1ZXN0Q291bnQoKVxuICAgIHVubG9jayh0aGlzLmlkKVxuICAgIHJldHVybiByZXF1ZXN0XG4gIH1cblxuICBhc3luYyBpbnRlcmNlcHRSZXNwb25zZShcbiAgICByZXF1ZXN0OiBSZXF1ZXN0LFxuICAgIHJlc3BvbnNlOiBSZXNwb25zZSxcbiAgICBkYXRhOiBBcnJheUJ1ZmZlclxuICApOiBQcm9taXNlPEFycmF5QnVmZmVyPiB7XG4gICAgcmV0dXJuIGRhdGFcbiAgfVxuXG4gIGFzeW5jIGluY3JlbWVudFJlcXVlc3RDb3VudCgpIHtcbiAgICBhd2FpdCB0aGlzLnByb21pc2VcblxuICAgIGNvbnN0IHNlY29uZHNTaW5jZUxhc3RSZXNldCA9IChEYXRlLm5vdygpIC0gdGhpcy5sYXN0UmVzZXQpIC8gMTAwMFxuICAgIGlmIChzZWNvbmRzU2luY2VMYXN0UmVzZXQgPiB0aGlzLm9wdGlvbnMuYnVmZmVySW50ZXJ2YWwpIHtcbiAgICAgIHRoaXMuY3VycmVudFJlcXVlc3RzTWFkZSA9IDBcbiAgICAgIHRoaXMubGFzdFJlc2V0ID0gRGF0ZS5ub3coKVxuICAgIH1cblxuICAgIHRoaXMuY3VycmVudFJlcXVlc3RzTWFkZSArPSAxXG5cbiAgICBpZiAodGhpcy5jdXJyZW50UmVxdWVzdHNNYWRlID49IHRoaXMub3B0aW9ucy5udW1iZXJPZlJlcXVlc3RzKSB7XG4gICAgICBjb25zdCBzZWNvbmRzU2luY2VMYXN0UmVzZXQgPSAoRGF0ZS5ub3coKSAtIHRoaXMubGFzdFJlc2V0KSAvIDEwMDBcbiAgICAgIGlmIChzZWNvbmRzU2luY2VMYXN0UmVzZXQgPD0gdGhpcy5vcHRpb25zLmJ1ZmZlckludGVydmFsKSB7XG4gICAgICAgIGNvbnN0IHNsZWVwVGltZSA9IHRoaXMub3B0aW9ucy5idWZmZXJJbnRlcnZhbCAtIHNlY29uZHNTaW5jZUxhc3RSZXNldFxuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICBgW0Jhc2ljUmF0ZUxpbWl0ZXJdIHJhdGUgbGltaXQgaGl0LCBzbGVlcGluZyBmb3IgJHtzbGVlcFRpbWV9YFxuICAgICAgICApXG4gICAgICAgIHRoaXMucHJvbWlzZSA9IEFwcGxpY2F0aW9uLnNsZWVwKHNsZWVwVGltZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZHluYW1pYy1kZWxldGUgKi9cbmNvbnN0IHByb21pc2VzOiBSZWNvcmQ8c3RyaW5nLCBQcm9taXNlPHZvaWQ+IHwgdW5kZWZpbmVkPiA9IHt9LFxuICByZXNvbHZlcnM6IFJlY29yZDxzdHJpbmcsICgoKSA9PiB2b2lkKSB8IHVuZGVmaW5lZD4gPSB7fVxuLy8gdWlkIHNob3VsZCBiZSB1bmlxdWUgcGVyIGNvZGUgeW91IHByb3RlY3QsIGUuZy4gdGhlIG1ldGhvZCBzaWduYXR1cmVcbmV4cG9ydCBjb25zdCBsb2NrID0gYXN5bmMgKHVpZDogc3RyaW5nKSA9PiB7XG4gIGlmIChwcm9taXNlc1t1aWRdKSB7XG4gICAgLy8gY2hlY2sgaWYgbG9jayBleGlzdHNcbiAgICBhd2FpdCBwcm9taXNlc1t1aWRdIC8vIHdhaXQgb24gbG9jayBwcm9taXNlXG4gICAgYXdhaXQgbG9jayh1aWQpIC8vIHN0YWNrIGxvY2sgY2hlY2sgYWZ0ZXIgcHJvbWlzZSByZXNvbHZlc1xuICAgIHJldHVybiAvLyBwcmV2IG1ldGhvZHMgZG8gbm90aGluZ1xuICB9XG4gIC8vIHRoZXJlIGlzIG5vIGxvY2ssIHNvIHdlJ2xsIFwiYWNxdWlyZVwiIGl0IGhlcmVcbiAgcHJvbWlzZXNbdWlkXSA9IG5ldyBQcm9taXNlKFxuICAgIChyZXNvbHZlKSA9PlxuICAgICAgKHJlc29sdmVyc1t1aWRdID0gKCkgPT4ge1xuICAgICAgICBkZWxldGUgcHJvbWlzZXNbdWlkXSAvLyByZWxlYXNlXG4gICAgICAgIHJlc29sdmUoKSAvLyByZXNvbHZlXG4gICAgICB9KVxuICApXG59XG5leHBvcnQgY29uc3QgdW5sb2NrID0gKHVpZDogc3RyaW5nKSA9PiB7XG4gIGlmIChyZXNvbHZlcnNbdWlkXSkge1xuICAgIHJlc29sdmVyc1t1aWRdISgpXG4gIH1cbn1cbiIsICJpbXBvcnQgdHlwZSB7IFJlcXVlc3QgfSBmcm9tICcuLi9SZXF1ZXN0LmpzJ1xuXG5leHBvcnQgY2xhc3MgQ2xvdWRmbGFyZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9ICdjbG91ZGZsYXJlRXJyb3InXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHJlYWRvbmx5IHJlc29sdXRpb25SZXF1ZXN0OiBSZXF1ZXN0LFxuICAgIG1lc3NhZ2U6IHN0cmluZyA9ICdDbG91ZGZsYXJlIGJ5cGFzcyBpcyByZXF1aXJlZCdcbiAgKSB7XG4gICAgc3VwZXIobWVzc2FnZSlcbiAgfVxufVxuIiwgIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1keW5hbWljLWRlbGV0ZSAqL1xuaW1wb3J0IHR5cGUgeyBDb29raWUgfSBmcm9tICcuLi9Db29raWUuanMnXG5pbXBvcnQgeyBQYXBlcmJhY2tJbnRlcmNlcHRvciB9IGZyb20gJy4vUGFwZXJiYWNrSW50ZXJjZXB0b3IuanMnXG5pbXBvcnQgdHlwZSB7IFJlcXVlc3QgfSBmcm9tICcuLi9SZXF1ZXN0LmpzJ1xuaW1wb3J0IHR5cGUgeyBSZXNwb25zZSB9IGZyb20gJy4uL1Jlc3BvbnNlLmpzJ1xuaW1wb3J0IHsgVVJMIH0gZnJvbSAnLi9VUkwuanMnXG5cbnR5cGUgQ29va2llU3RvcmFnZU9wdGlvbnMgPSB7XG4gIHN0b3JhZ2U6ICdzdGF0ZU1hbmFnZXInIHwgJ21lbW9yeSdcbn1cblxuY29uc3QgY29va2llU3RhdGVLZXkgPSAnY29va2llX3N0b3JlX2Nvb2tpZXMnXG5cbmV4cG9ydCBjbGFzcyBDb29raWVTdG9yYWdlSW50ZXJjZXB0b3IgZXh0ZW5kcyBQYXBlcmJhY2tJbnRlcmNlcHRvciB7XG4gIHByaXZhdGUgX2Nvb2tpZXM6IFJlY29yZDxzdHJpbmcsIENvb2tpZT4gPSB7fVxuXG4gIGdldCBjb29raWVzKCk6IFJlYWRvbmx5PENvb2tpZVtdPiB7XG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUoT2JqZWN0LnZhbHVlcyh0aGlzLl9jb29raWVzKSlcbiAgfVxuXG4gIHNldCBjb29raWVzKG5ld1ZhbHVlOiBDb29raWVbXSkge1xuICAgIGNvbnN0IGNvb2tpZXM6IFJlY29yZDxzdHJpbmcsIENvb2tpZT4gPSB7fVxuICAgIGZvciAoY29uc3QgY29va2llIG9mIG5ld1ZhbHVlKSB7XG4gICAgICAvLyBJZiB0aGUgY29va2llIGlzIGFscmVhZHkgZXhwaXJlZCwgc2tpcFxuICAgICAgaWYgKHRoaXMuaXNDb29raWVFeHBpcmVkKGNvb2tpZSkpIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgY29va2llc1t0aGlzLmNvb2tpZUlkZW50aWZpZXIoY29va2llKV0gPSBjb29raWVcbiAgICB9XG5cbiAgICB0aGlzLl9jb29raWVzID0gY29va2llc1xuICAgIHRoaXMuc2F2ZUNvb2tpZXNUb1N0b3JhZ2UoKVxuICB9XG5cbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IG9wdGlvbnM6IENvb2tpZVN0b3JhZ2VPcHRpb25zKSB7XG4gICAgc3VwZXIoJ2Nvb2tpZV9zdG9yZScpXG4gICAgdGhpcy5sb2FkQ29va2llc0Zyb21TdG9yYWdlKClcbiAgfVxuXG4gIGFzeW5jIGludGVyY2VwdFJlcXVlc3QocmVxdWVzdDogUmVxdWVzdCk6IFByb21pc2U8UmVxdWVzdD4ge1xuICAgIHJlcXVlc3QuY29va2llcyA9IHtcbiAgICAgIC8vIEFscmVhZHkgc2V0IGNvb2tpZXNcbiAgICAgIC4uLihyZXF1ZXN0LmNvb2tpZXMgPz8ge30pLFxuXG4gICAgICAvLyBJbmplY3QgYWxsIHRoZSBjb29raWVzIGFzIHsgbmFtZTogdmFsdWUgfVxuICAgICAgLi4udGhpcy5jb29raWVzRm9yVXJsKHJlcXVlc3QudXJsKS5yZWR1Y2UoXG4gICAgICAgICh2LCBjKSA9PiB7XG4gICAgICAgICAgdltjLm5hbWVdID0gYy52YWx1ZVxuICAgICAgICAgIHJldHVybiB2XG4gICAgICAgIH0sXG4gICAgICAgIHt9IGFzIFJlY29yZDxzdHJpbmcsIHN0cmluZz5cbiAgICAgICksXG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcXVlc3RcbiAgfVxuXG4gIGFzeW5jIGludGVyY2VwdFJlc3BvbnNlKFxuICAgIHJlcXVlc3Q6IFJlcXVlc3QsXG4gICAgcmVzcG9uc2U6IFJlc3BvbnNlLFxuICAgIGRhdGE6IEFycmF5QnVmZmVyXG4gICk6IFByb21pc2U8QXJyYXlCdWZmZXI+IHtcbiAgICBjb25zdCBjb29raWVzOiBSZWNvcmQ8c3RyaW5nLCBDb29raWU+ID0gdGhpcy5fY29va2llc1xuXG4gICAgZm9yIChjb25zdCBjb29raWUgb2YgcmVzcG9uc2UuY29va2llcykge1xuICAgICAgY29uc3QgaWRlbnRpZmllciA9IHRoaXMuY29va2llSWRlbnRpZmllcihjb29raWUpXG5cbiAgICAgIC8vIElmIHRoZSBjb29raWUgaXMgYWxyZWFkeSBleHBpcmVkLCBkZWxldGUgaXRcbiAgICAgIC8vIFVzdWFsbHkgYmFja2VuZHMgXCJkZWxldGVcIiBhIGNvb2tpZSBieSBzZXR0aW5nIGl0c1xuICAgICAgLy8gZXhwaXJ5IGluIHRoZSBwYXN0XG4gICAgICBpZiAodGhpcy5pc0Nvb2tpZUV4cGlyZWQoY29va2llKSkge1xuICAgICAgICBkZWxldGUgY29va2llc1tpZGVudGlmaWVyXVxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICBjb29raWVzW2lkZW50aWZpZXJdID0gY29va2llXG4gICAgfVxuXG4gICAgdGhpcy5fY29va2llcyA9IGNvb2tpZXNcbiAgICB0aGlzLnNhdmVDb29raWVzVG9TdG9yYWdlKClcblxuICAgIHJldHVybiBkYXRhXG4gIH1cblxuICBzZXRDb29raWUoY29va2llOiBDb29raWUpIHtcbiAgICAvLyBJZiB0aGUgY29va2llIGlzIGFscmVhZHkgZXhwaXJlZCwgc2tpcFxuICAgIGlmICh0aGlzLmlzQ29va2llRXhwaXJlZChjb29raWUpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0aGlzLl9jb29raWVzW3RoaXMuY29va2llSWRlbnRpZmllcihjb29raWUpXSA9IGNvb2tpZVxuICAgIHRoaXMuc2F2ZUNvb2tpZXNUb1N0b3JhZ2UoKVxuICB9XG5cbiAgZGVsZXRlQ29va2llKGNvb2tpZTogQ29va2llKSB7XG4gICAgZGVsZXRlIHRoaXMuX2Nvb2tpZXNbdGhpcy5jb29raWVJZGVudGlmaWVyKGNvb2tpZSldXG4gIH1cblxuICBjb29raWVzRm9yVXJsKHVybFN0cmluZzogc3RyaW5nKTogQ29va2llW10ge1xuICAgIGNvbnNvbGUubG9nKCdbQ09NUEFUXSBDT09LSUVTIEZPUiBVUkwnKVxuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwodXJsU3RyaW5nKVxuICAgIGNvbnN0IGhvc3RuYW1lID0gdXJsLmhvc3RuYW1lXG5cbiAgICBpZiAoIWhvc3RuYW1lKSB7XG4gICAgICByZXR1cm4gW11cbiAgICB9XG5cbiAgICBjb25zdCBtYXRjaGVkQ29va2llczogUmVjb3JkPFxuICAgICAgc3RyaW5nLFxuICAgICAgeyBjb29raWU6IENvb2tpZTsgcGF0aE1hdGNoZXM6IG51bWJlciB9XG4gICAgPiA9IHt9XG5cbiAgICBjb25zdCBwYXRobmFtZSA9IHVybC5wYXRoLnN0YXJ0c1dpdGgoJy8nKSA/IHVybC5wYXRoIDogYC8ke3VybC5wYXRofWBcblxuICAgIGNvbnN0IHNwbGl0SG9zdG5hbWUgPSBob3N0bmFtZS5zcGxpdCgnLicpXG4gICAgY29uc3Qgc3BsaXRVcmxQYXRoID0gcGF0aG5hbWUuc3BsaXQoJy8nKVxuICAgIHNwbGl0VXJsUGF0aC5zaGlmdCgpXG5cbiAgICBjb25zdCBjb29raWVzID0gdGhpcy5jb29raWVzXG4gICAgZm9yIChjb25zdCBjb29raWUgb2YgY29va2llcykge1xuICAgICAgaWYgKHRoaXMuaXNDb29raWVFeHBpcmVkKGNvb2tpZSkpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuX2Nvb2tpZXNbdGhpcy5jb29raWVJZGVudGlmaWVyKGNvb2tpZSldXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNvb2tpZURvbWFpbiA9IHRoaXMuY29va2llU2FuaXRpemVkRG9tYWluKGNvb2tpZSlcbiAgICAgIGNvbnN0IHNwbGl0Q29va2llRG9tYWluID0gY29va2llRG9tYWluLnNwbGl0KCcuJylcbiAgICAgIGlmIChcbiAgICAgICAgc3BsaXRIb3N0bmFtZS5sZW5ndGggPCBzcGxpdENvb2tpZURvbWFpbi5sZW5ndGggfHxcbiAgICAgICAgc3BsaXRDb29raWVEb21haW4ubGVuZ3RoID09IDBcbiAgICAgICkge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICBsZXQgY29va2llRG9tYWluTWF0Y2hlcyA9IHRydWVcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3BsaXRDb29raWVEb21haW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc3BsaXRDb29raWVJbmRleCA9IHNwbGl0Q29va2llRG9tYWluLmxlbmd0aCAtIDEgLSBpXG4gICAgICAgIGNvbnN0IHNwbGl0SG9zdG5hbWVJbmRleCA9IHNwbGl0SG9zdG5hbWUubGVuZ3RoIC0gMSAtIGlcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHNwbGl0Q29va2llRG9tYWluW3NwbGl0Q29va2llSW5kZXhdICE9XG4gICAgICAgICAgc3BsaXRIb3N0bmFtZVtzcGxpdEhvc3RuYW1lSW5kZXhdXG4gICAgICAgICkge1xuICAgICAgICAgIGNvb2tpZURvbWFpbk1hdGNoZXMgPSBmYWxzZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFjb29raWVEb21haW5NYXRjaGVzKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNvb2tpZVBhdGggPSB0aGlzLmNvb2tpZVNhbml0aXplZFBhdGgoY29va2llKVxuICAgICAgY29uc3Qgc3BsaXRDb29raWVQYXRoID0gY29va2llUGF0aC5zcGxpdCgnLycpXG4gICAgICBzcGxpdENvb2tpZVBhdGguc2hpZnQoKVxuXG4gICAgICBsZXQgcGF0aE1hdGNoZXMgPSAwXG4gICAgICBpZiAocGF0aG5hbWUgPT09IGNvb2tpZVBhdGgpIHtcbiAgICAgICAgcGF0aE1hdGNoZXMgPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUlxuICAgICAgfSBlbHNlIGlmIChzcGxpdENvb2tpZVBhdGgubGVuZ3RoID09PSAwIHx8IGNvb2tpZVBhdGggPT09ICcvJykge1xuICAgICAgICBwYXRoTWF0Y2hlcyA9IDFcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIHBhdGhuYW1lLnN0YXJ0c1dpdGgoY29va2llUGF0aCkgJiZcbiAgICAgICAgc3BsaXRVcmxQYXRoLmxlbmd0aCA+PSBzcGxpdENvb2tpZVBhdGgubGVuZ3RoXG4gICAgICApIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzcGxpdENvb2tpZVBhdGgubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoc3BsaXRDb29raWVQYXRoW2ldID09PSBzcGxpdFVybFBhdGhbaV0pIHtcbiAgICAgICAgICAgIHBhdGhNYXRjaGVzICs9IDFcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHBhdGhNYXRjaGVzIDw9IDApIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgaWYgKChtYXRjaGVkQ29va2llc1tjb29raWUubmFtZV0/LnBhdGhNYXRjaGVzID8/IDApIDwgcGF0aE1hdGNoZXMpIHtcbiAgICAgICAgbWF0Y2hlZENvb2tpZXNbY29va2llLm5hbWVdID0geyBjb29raWUsIHBhdGhNYXRjaGVzIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gT2JqZWN0LnZhbHVlcyhtYXRjaGVkQ29va2llcykubWFwKCh4KSA9PiB4LmNvb2tpZSlcbiAgfVxuXG4gIHByaXZhdGUgY29va2llSWRlbnRpZmllcihjb29raWU6IENvb2tpZSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGAke2Nvb2tpZS5uYW1lfS0ke3RoaXMuY29va2llU2FuaXRpemVkRG9tYWluKFxuICAgICAgY29va2llXG4gICAgKX0tJHt0aGlzLmNvb2tpZVNhbml0aXplZFBhdGgoY29va2llKX1gXG4gIH1cblxuICBwcml2YXRlIGNvb2tpZVNhbml0aXplZFBhdGgoY29va2llOiBDb29raWUpOiBzdHJpbmcge1xuICAgIHJldHVybiBjb29raWUucGF0aD8uc3RhcnRzV2l0aCgnLycpXG4gICAgICA/IGNvb2tpZS5wYXRoXG4gICAgICA6ICcvJyArIChjb29raWUucGF0aCA/PyAnJylcbiAgfVxuXG4gIHByaXZhdGUgY29va2llU2FuaXRpemVkRG9tYWluKGNvb2tpZTogQ29va2llKTogc3RyaW5nIHtcbiAgICByZXR1cm4gY29va2llLmRvbWFpbi5yZXBsYWNlKC9eKHd3dyk/XFwuPy9naSwgJycpLnRvTG93ZXJDYXNlKClcbiAgfVxuXG4gIHByaXZhdGUgaXNDb29raWVFeHBpcmVkKGNvb2tpZTogQ29va2llKTogYm9vbGVhbiB7XG4gICAgaWYgKGNvb2tpZS5leHBpcmVzICYmIGNvb2tpZS5leHBpcmVzLmdldFRpbWUoKSA8PSBEYXRlLm5vdygpKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGxvYWRDb29raWVzRnJvbVN0b3JhZ2UoKSB7XG4gICAgLy8gSWYgdGhpcyBzdG9yZXMgaW4gbWVtb3J5LCB3ZSBwcm9iYWJseSBhbHJlYWR5IGhhdmUgdGhlIGxhdGVzdCBjb29raWVzXG4gICAgaWYgKHRoaXMub3B0aW9ucy5zdG9yYWdlID09ICdtZW1vcnknKSByZXR1cm5cblxuICAgIGNvbnN0IGNvb2tpZURhdGEgPSBBcHBsaWNhdGlvbi5nZXRTdGF0ZShjb29raWVTdGF0ZUtleSkgYXNcbiAgICAgIHwgQ29va2llW11cbiAgICAgIHwgdW5kZWZpbmVkXG4gICAgaWYgKCFjb29raWVEYXRhKSB7XG4gICAgICB0aGlzLl9jb29raWVzID0ge31cbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IGNvb2tpZXM6IFJlY29yZDxzdHJpbmcsIENvb2tpZT4gPSB7fVxuICAgIGZvciAoY29uc3QgY29va2llIG9mIGNvb2tpZURhdGEpIHtcbiAgICAgIC8vIGlnbm9yZSBzZXNzaW9uIGNvb2tpZXMgYW5kIGV4cGlyZWQgY29va2llc1xuICAgICAgaWYgKCFjb29raWUuZXhwaXJlcyB8fCB0aGlzLmlzQ29va2llRXhwaXJlZChjb29raWUpKSBjb250aW51ZVxuXG4gICAgICBjb29raWVzW3RoaXMuY29va2llSWRlbnRpZmllcihjb29raWUpXSA9IGNvb2tpZVxuICAgIH1cblxuICAgIHRoaXMuX2Nvb2tpZXMgPSBjb29raWVzXG4gIH1cblxuICBwcml2YXRlIHNhdmVDb29raWVzVG9TdG9yYWdlKCkge1xuICAgIC8vIElmIHRoaXMgc3RvcmVzIGluIG1lbW9yeSwgd2UgcHJvYmFibHkgYWxyZWFkeSBoYXZlIHRoZSBsYXRlc3QgY29va2llc1xuICAgIGlmICh0aGlzLm9wdGlvbnMuc3RvcmFnZSA9PSAnbWVtb3J5JykgcmV0dXJuXG5cbiAgICAvLyBUT0RPOiBoYW5kbGUgc2VjdXJlIGNvb2tpZXMgZGlmZmVyZW50bHkgbWF5YmU/XG4gICAgQXBwbGljYXRpb24uc2V0U3RhdGUoXG4gICAgICB0aGlzLmNvb2tpZXMuZmlsdGVyKCh4KSA9PiB4LmV4cGlyZXMpLFxuICAgICAgY29va2llU3RhdGVLZXlcbiAgICApXG4gIH1cbn1cblxuLyoqXG4gKiBcbiAqICBUZXN0IGNhc2VzIGZvciB0ZXN0aW5nIGNvb2tpZXMgYXJlIGJlaGF2aW5nIGFzIGV4cGVjdGVkXG4gKiBcblxuZnVuY3Rpb24gYXNzZXJ0KGE6IGJvb2xlYW4sIG1zZzogc3RyaW5nKSB7XG4gICAgaWYoIWEpIHtcbiAgICAgICAgdGhyb3cgbXNnXG4gICAgfVxufVxuXG4oZnVuY3Rpb24gcnVuVGVzdHMoKSB7XG4gIGNvbnN0IGNvb2tpZVN0b3JhZ2UgPSBuZXcgQ29va2llU3RvcmFnZUludGVyY2VwdG9yKCk7XG4gIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG5cbiAgLy8gVGVzdCAxOiBCYXNpYyBzZXQgYW5kIHJldHJpZXZhbFxuICBjb25zdCBjb29raWUxOiBDb29raWUgPSB7XG4gICAgbmFtZTogXCJzZXNzaW9uSWRcIixcbiAgICB2YWx1ZTogXCJhYmMxMjNcIixcbiAgICBkb21haW46IFwiZXhhbXBsZS5jb21cIixcbiAgICBwYXRoOiBcIi9cIixcbiAgICBleHBpcmVzOiBuZXcgRGF0ZShub3cgKyAxMDAwMCkgLy8gZXhwaXJlcyBpbiAxMCBzZWNvbmRzXG4gIH07XG4gIGNvb2tpZVN0b3JhZ2Uuc2V0Q29va2llKGNvb2tpZTEpO1xuICBsZXQgY29va2llcyA9IGNvb2tpZVN0b3JhZ2UuY29va2llc0ZvclVybChcImh0dHA6Ly9leGFtcGxlLmNvbS9cIik7XG4gIGFzc2VydChjb29raWVzLmxlbmd0aCA9PT0gMSwgXCJTaG91bGQgcmV0cmlldmUgb25lIGNvb2tpZSBmb3IgZXhhbXBsZS5jb20gcm9vdFwiKTtcblxuICAvLyBUZXN0IDI6IERvbWFpbiBtYXRjaGluZyB3aXRoIHN1YmRvbWFpbiAoUkZDIDYyNjU6IGRvbWFpbi1tYXRjaClcbiAgY29uc3QgY29va2llMjogQ29va2llID0ge1xuICAgIG5hbWU6IFwidXNlclwiLFxuICAgIHZhbHVlOiBcImpvaG5cIixcbiAgICBkb21haW46IFwiZXhhbXBsZS5jb21cIixcbiAgICBwYXRoOiBcIi9cIixcbiAgICBleHBpcmVzOiBuZXcgRGF0ZShub3cgKyAxMDAwMClcbiAgfTtcbiAgY29va2llU3RvcmFnZS5zZXRDb29raWUoY29va2llMik7XG4gIGNvb2tpZXMgPSBjb29raWVTdG9yYWdlLmNvb2tpZXNGb3JVcmwoXCJodHRwOi8vd3d3LmV4YW1wbGUuY29tL1wiKTtcbiAgYXNzZXJ0KFxuICAgIGNvb2tpZXMuc29tZShjID0+IGMubmFtZSA9PT0gXCJ1c2VyXCIpLFxuICAgIFwiQ29va2llIHdpdGggZG9tYWluIGV4YW1wbGUuY29tIHNob3VsZCBtYXRjaCB3d3cuZXhhbXBsZS5jb21cIlxuICApO1xuXG4gIC8vIFRlc3QgMzogUGF0aCBtYXRjaGluZ1xuICBjb25zdCBjb29raWUzOiBDb29raWUgPSB7XG4gICAgbmFtZTogXCJwcmVmXCIsXG4gICAgdmFsdWU6IFwiZGFya1wiLFxuICAgIGRvbWFpbjogXCJleGFtcGxlLmNvbVwiLFxuICAgIHBhdGg6IFwiL2RvY3NcIixcbiAgICBleHBpcmVzOiBuZXcgRGF0ZShub3cgKyAxMDAwMClcbiAgfTtcbiAgY29va2llU3RvcmFnZS5zZXRDb29raWUoY29va2llMyk7XG4gIGNvb2tpZXMgPSBjb29raWVTdG9yYWdlLmNvb2tpZXNGb3JVcmwoXCJodHRwOi8vZXhhbXBsZS5jb20vZG9jcy9pbmRleC5odG1sXCIpO1xuICBhc3NlcnQoXG4gICAgY29va2llcy5zb21lKGMgPT4gYy5uYW1lID09PSBcInByZWZcIiksXG4gICAgXCJDb29raWUgd2l0aCBwYXRoIC9kb2NzIHNob3VsZCBtYXRjaCAvZG9jcy9pbmRleC5odG1sXCJcbiAgKTtcbiAgY29va2llcyA9IGNvb2tpZVN0b3JhZ2UuY29va2llc0ZvclVybChcImh0dHA6Ly9leGFtcGxlLmNvbS9hYm91dFwiKTtcbiAgYXNzZXJ0KFxuICAgICFjb29raWVzLnNvbWUoYyA9PiBjLm5hbWUgPT09IFwicHJlZlwiKSxcbiAgICBcIkNvb2tpZSB3aXRoIHBhdGggL2RvY3Mgc2hvdWxkIG5vdCBtYXRjaCAvYWJvdXRcIlxuICApO1xuXG4gIC8vIFRlc3QgNDogRXhwaXJlZCBjb29raWUgc2hvdWxkIG5vdCBiZSBzdG9yZWQgb3IgcmV0dXJuZWRcbiAgY29uc3QgY29va2llNDogQ29va2llID0ge1xuICAgIG5hbWU6IFwiZXhwaXJlZFwiLFxuICAgIHZhbHVlOiBcIm9sZFwiLFxuICAgIGRvbWFpbjogXCJleGFtcGxlLmNvbVwiLFxuICAgIHBhdGg6IFwiL1wiLFxuICAgIGV4cGlyZXM6IG5ldyBEYXRlKG5vdyAtIDEwMDAwKSAvLyBleHBpcmVkIDEwIHNlY29uZHMgYWdvXG4gIH07XG4gIGNvb2tpZVN0b3JhZ2Uuc2V0Q29va2llKGNvb2tpZTQpO1xuICBjb29raWVzID0gY29va2llU3RvcmFnZS5jb29raWVzRm9yVXJsKFwiaHR0cDovL2V4YW1wbGUuY29tL1wiKTtcbiAgYXNzZXJ0KFxuICAgICFjb29raWVzLnNvbWUoYyA9PiBjLm5hbWUgPT09IFwiZXhwaXJlZFwiKSxcbiAgICBcIkV4cGlyZWQgY29va2llIHNob3VsZCBub3QgYmUgcmV0dXJuZWRcIlxuICApO1xuXG4gIC8vIFRlc3QgNTogQ29va2llIG92ZXJ3cml0aW5nIGJhc2VkIG9uIHBhdGggc3BlY2lmaWNpdHlcbiAgLy8gQ29va2llIHdpdGggbmFtZSBcImlkXCIgYW5kIHBhdGggXCIvXCIgKGxlc3Mgc3BlY2lmaWMpXG4gIGNvbnN0IGNvb2tpZUE6IENvb2tpZSA9IHtcbiAgICBuYW1lOiBcImlkXCIsXG4gICAgdmFsdWU6IFwiQVwiLFxuICAgIGRvbWFpbjogXCJleGFtcGxlLmNvbVwiLFxuICAgIHBhdGg6IFwiL1wiLFxuICAgIGV4cGlyZXM6IG5ldyBEYXRlKG5vdyArIDEwMDAwKVxuICB9O1xuICAvLyBDb29raWUgd2l0aCB0aGUgc2FtZSBuYW1lIGJ1dCBhIG1vcmUgc3BlY2lmaWMgcGF0aCBcIi9kb2NzXCJcbiAgY29uc3QgY29va2llQjogQ29va2llID0ge1xuICAgIG5hbWU6IFwiaWRcIixcbiAgICB2YWx1ZTogXCJCXCIsXG4gICAgZG9tYWluOiBcImV4YW1wbGUuY29tXCIsXG4gICAgcGF0aDogXCIvZG9jc1wiLFxuICAgIGV4cGlyZXM6IG5ldyBEYXRlKG5vdyArIDEwMDAwKVxuICB9O1xuICBjb29raWVTdG9yYWdlLnNldENvb2tpZShjb29raWVBKTtcbiAgY29va2llU3RvcmFnZS5zZXRDb29raWUoY29va2llQik7XG4gIGNvb2tpZXMgPSBjb29raWVTdG9yYWdlLmNvb2tpZXNGb3JVcmwoXCJodHRwOi8vZXhhbXBsZS5jb20vZG9jc1wiKTtcbiAgY29uc3QgY29va2llSWQgPSBjb29raWVzLmZpbmQoYyA9PiBjLm5hbWUgPT09IFwiaWRcIik7XG4gIGFzc2VydChcbiAgICBjb29raWVJZD8udmFsdWUgPT09IFwiQlwiLFxuICAgIFwiTW9yZSBzcGVjaWZpYyBjb29raWUgc2hvdWxkIGJlIHJldHVybmVkIGZvciBVUkwgL2RvY3NcIlxuICApO1xuXG4gIC8vIFRlc3QgNjogRGVsZXRpbmcgYSBjb29raWVcbiAgY29va2llU3RvcmFnZS5kZWxldGVDb29raWUoY29va2llQik7XG4gIGNvb2tpZXMgPSBjb29raWVTdG9yYWdlLmNvb2tpZXNGb3JVcmwoXCJodHRwOi8vZXhhbXBsZS5jb20vZG9jc1wiKTtcbiAgY29uc3QgY29va2llSWRBZnRlckRlbGV0ZSA9IGNvb2tpZXMuZmluZChjID0+IGMubmFtZSA9PT0gXCJpZFwiKTtcbiAgYXNzZXJ0KFxuICAgIGNvb2tpZUlkQWZ0ZXJEZWxldGU/LnZhbHVlID09PSBcIkFcIixcbiAgICBcIkFmdGVyIGRlbGV0aW9uIG9mIHRoZSBzcGVjaWZpYyBjb29raWUsIHRoZSBsZXNzIHNwZWNpZmljIGNvb2tpZSBzaG91bGQgYmUgcmV0dXJuZWRcIlxuICApO1xuXG4gIC8vIFRlc3QgNzogVXNpbmcgdGhlIGNvb2tpZXMgc2V0dGVyIChleHBpcmVkIGNvb2tpZXMgZmlsdGVyZWQgb3V0KVxuICBjb29raWVTdG9yYWdlLmNvb2tpZXMgPSBbY29va2llMSwgY29va2llNF07IC8vIGNvb2tpZTQgaXMgZXhwaXJlZFxuICBjb25zdCBzdG9yZWRDb29raWVzID0gY29va2llU3RvcmFnZS5jb29raWVzO1xuICBhc3NlcnQoXG4gICAgc3RvcmVkQ29va2llcy5zb21lKGMgPT4gYy5uYW1lID09PSBcInNlc3Npb25JZFwiKSxcbiAgICBcInNlc3Npb25JZCBjb29raWUgc2hvdWxkIGJlIHN0b3JlZCB2aWEgc2V0dGVyXCJcbiAgKTtcbiAgYXNzZXJ0KFxuICAgICFzdG9yZWRDb29raWVzLnNvbWUoYyA9PiBjLm5hbWUgPT09IFwiZXhwaXJlZFwiKSxcbiAgICBcIkV4cGlyZWQgY29va2llIHNob3VsZCBiZSBmaWx0ZXJlZCBvdXQgaW4gdGhlIHNldHRlclwiXG4gICk7XG5cbiAgY29uc29sZS5sb2coXCJBbGwgdGVzdHMgcGFzc2VkIHN1Y2Nlc3NmdWxseS5cIik7XG59KSgpO1xuICovXG4iLCAiLyoqXG4gKiBJbnRlcm5hbCBtZXRob2QgdG8gcGFyc2UgYSBVUkwgc3RyaW5nIGFuZCB1cGRhdGUgdGhlIGN1cnJlbnQgY29tcG9uZW50cy5cbiAqXG4gKiBAcGFyYW0gdXJsIC0gVGhlIFVSTCBzdHJpbmcgdG8gcGFyc2UuXG4gKiBAcGFyYW0gcGFydGlhbCAtIElmIHRydWUsIG9ubHkgdXBkYXRlIGNvbXBvbmVudHMgcHJlc2VudCBpbiB0aGUgaW5wdXQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVVSTCh1cmw6IHN0cmluZyk6IFVSTENvbXBvbmVudHMge1xuICBjb25zdCBjb21wb25lbnRzOiBVUkxDb21wb25lbnRzID0ge31cblxuICAvLyBSZWd1bGFyIGV4cHJlc3Npb24gdXNpbmcgbnVtYmVyZWQgY2FwdHVyZSBncm91cHMuXG4gIC8vIENhcHR1cmUgZ3JvdXBzOlxuICAvLyAgIDE6IHByb3RvY29sLCAyOiBhdXRob3JpdHksIDM6IHBhdGhuYW1lLCA0OiBxdWVyeSwgNTogaGFzaC5cbiAgY29uc3QgcmVnZXggPVxuICAgIC9eKD86KFthLXpBLVpdW2EtekEtWlxcZCtcXC0uXSopOik/KD86XFwvXFwvKFteLz8jXSopKT8oW14/I10qKSg/OlxcPyhbXiNdKikpPyg/OiMoLiopKT8kL1xuICBjb25zdCBtYXRjaCA9IHVybC5tYXRjaChyZWdleClcbiAgaWYgKCFtYXRjaCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBVUkwgc3RyaW5nIHByb3ZpZGVkLicpXG4gIH1cblxuICAvLyBPbmx5IHVwZGF0ZSBhIGNvbXBvbmVudCBpZiB0aGUgY2FwdHVyZSBncm91cCBpcyBkZWZpbmVkIGFuZCAoZm9yIHNvbWUgY29tcG9uZW50cykgbm9uLWVtcHR5LlxuICBpZiAobWF0Y2hbMV0gIT09IHVuZGVmaW5lZCAmJiBtYXRjaFsxXSAhPT0gJycpIHtcbiAgICBjb21wb25lbnRzLnByb3RvY29sID0gbWF0Y2hbMV1cbiAgfVxuXG4gIGlmIChtYXRjaFsyXSAhPT0gdW5kZWZpbmVkICYmIG1hdGNoWzJdICE9PSAnJykge1xuICAgIC8vIFBhcnNlIGF1dGhvcml0eSBpbnRvIHVzZXJuYW1lLCBwYXNzd29yZCwgaG9zdG5hbWUsIGFuZCBwb3J0LlxuICAgIGNvbnN0IGF1dGhvcml0eSA9IG1hdGNoWzJdXG4gICAgbGV0IHVzZXJJbmZvID0gJydcbiAgICBsZXQgaG9zdFBvcnQgPSAnJ1xuICAgIGNvbnN0IGF0SW5kZXggPSBhdXRob3JpdHkuaW5kZXhPZignQCcpXG4gICAgaWYgKGF0SW5kZXggIT09IC0xKSB7XG4gICAgICB1c2VySW5mbyA9IGF1dGhvcml0eS5zdWJzdHJpbmcoMCwgYXRJbmRleClcbiAgICAgIGhvc3RQb3J0ID0gYXV0aG9yaXR5LnN1YnN0cmluZyhhdEluZGV4ICsgMSlcbiAgICAgIGlmICh1c2VySW5mbyAhPT0gJycpIHtcbiAgICAgICAgY29uc3QgY29sb25JbmRleCA9IHVzZXJJbmZvLmluZGV4T2YoJzonKVxuICAgICAgICBpZiAoY29sb25JbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICBjb21wb25lbnRzLnVzZXJuYW1lID0gdXNlckluZm8uc3Vic3RyaW5nKDAsIGNvbG9uSW5kZXgpXG4gICAgICAgICAgY29tcG9uZW50cy5wYXNzd29yZCA9IHVzZXJJbmZvLnN1YnN0cmluZyhjb2xvbkluZGV4ICsgMSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb21wb25lbnRzLnVzZXJuYW1lID0gdXNlckluZm9cbiAgICAgICAgICBjb21wb25lbnRzLnBhc3N3b3JkID0gJydcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBob3N0UG9ydCA9IGF1dGhvcml0eVxuICAgIH1cblxuICAgIGlmIChob3N0UG9ydCAhPT0gJycpIHtcbiAgICAgIGlmIChob3N0UG9ydC5zdGFydHNXaXRoKCdbJykpIHtcbiAgICAgICAgY29uc3QgY2xvc2luZ0JyYWNrZXRJbmRleCA9IGhvc3RQb3J0LmluZGV4T2YoJ10nKVxuICAgICAgICBpZiAoY2xvc2luZ0JyYWNrZXRJbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgSVB2NiBhZGRyZXNzIGluIFVSTCB1cGRhdGUuJylcbiAgICAgICAgfVxuICAgICAgICBjb21wb25lbnRzLmhvc3RuYW1lID0gaG9zdFBvcnQuc3Vic3RyaW5nKDAsIGNsb3NpbmdCcmFja2V0SW5kZXggKyAxKVxuICAgICAgICBjb25zdCBwb3J0UGFydCA9IGhvc3RQb3J0LnN1YnN0cmluZyhjbG9zaW5nQnJhY2tldEluZGV4ICsgMSlcbiAgICAgICAgaWYgKHBvcnRQYXJ0LnN0YXJ0c1dpdGgoJzonKSkge1xuICAgICAgICAgIGNvbXBvbmVudHMucG9ydCA9IHBvcnRQYXJ0LnN1YnN0cmluZygxKVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBjb2xvbkluZGV4ID0gaG9zdFBvcnQubGFzdEluZGV4T2YoJzonKVxuICAgICAgICBpZiAoY29sb25JbmRleCAhPT0gLTEgJiYgaG9zdFBvcnQuaW5kZXhPZignOicpID09PSBjb2xvbkluZGV4KSB7XG4gICAgICAgICAgY29tcG9uZW50cy5ob3N0bmFtZSA9IGhvc3RQb3J0LnN1YnN0cmluZygwLCBjb2xvbkluZGV4KVxuICAgICAgICAgIGNvbXBvbmVudHMucG9ydCA9IGhvc3RQb3J0LnN1YnN0cmluZyhjb2xvbkluZGV4ICsgMSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb21wb25lbnRzLmhvc3RuYW1lID0gaG9zdFBvcnRcbiAgICAgICAgICBjb21wb25lbnRzLnBvcnQgPSAnJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gUGF0aG5hbWUuXG4gIGlmIChtYXRjaFszXSAhPT0gdW5kZWZpbmVkICYmIG1hdGNoWzNdICE9PSAnJykge1xuICAgIGNvbXBvbmVudHMucGF0aCA9IG1hdGNoWzNdLnN0YXJ0c1dpdGgoJy8nKSA/IG1hdGNoWzNdIDogYC8ke21hdGNoWzNdfWBcbiAgfVxuXG4gIC8vIFF1ZXJ5LlxuICBpZiAobWF0Y2hbNF0gIT09IHVuZGVmaW5lZCkge1xuICAgIGNvbnN0IHF1ZXJ5OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmcgfCBzdHJpbmdbXT4gPSB7fVxuICAgIGNvbnN0IHBhaXJzID0gbWF0Y2hbNF0uc3BsaXQoJyYnKVxuICAgIGZvciAoY29uc3QgcGFpciBvZiBwYWlycykge1xuICAgICAgaWYgKCFwYWlyKSBjb250aW51ZVxuICAgICAgY29uc3QgW3Jhd0tleSwgcmF3VmFsdWUgPSAnJ10gPSBwYWlyLnNwbGl0KCc9JylcbiAgICAgIGlmIChyYXdLZXkgPT09IHVuZGVmaW5lZCkgY29udGludWUgLy8gU2tpcCBpZiBubyBrZXkgZm91bmRcbiAgICAgIGNvbnN0IGtleSA9IGRlY29kZVVSSUNvbXBvbmVudChyYXdLZXkpXG4gICAgICBjb25zdCB2YWx1ZSA9IGRlY29kZVVSSUNvbXBvbmVudChyYXdWYWx1ZSlcbiAgICAgIGlmIChrZXkgaW4gcXVlcnkpIHtcbiAgICAgICAgY29uc3QgZXhpc3RpbmcgPSBxdWVyeVtrZXldISAvLyBOb24tbnVsbCBhc3NlcnRpb24gc2luY2Ugd2Uga25vdyBrZXkgZXhpc3RzXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGV4aXN0aW5nKSkge1xuICAgICAgICAgIGV4aXN0aW5nLnB1c2godmFsdWUpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcXVlcnlba2V5XSA9IFtleGlzdGluZywgdmFsdWVdXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXJ5W2tleV0gPSB2YWx1ZVxuICAgICAgfVxuICAgIH1cbiAgICBjb21wb25lbnRzLnF1ZXJ5SXRlbXMgPSBxdWVyeVxuICB9XG5cbiAgLy8gSGFzaC5cbiAgaWYgKG1hdGNoWzVdICE9PSB1bmRlZmluZWQpIHtcbiAgICBjb21wb25lbnRzLmZyYWdtZW50ID0gbWF0Y2hbNV1cbiAgfVxuXG4gIHJldHVybiBjb21wb25lbnRzXG59XG5cbi8qKlxuICogQW4gaW50ZXJmYWNlIHJlcHJlc2VudGluZyB0aGUgY29tcG9uZW50cyBvZiBhIFVSTC5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBVUkxDb21wb25lbnRzIHtcbiAgcHJvdG9jb2w/OiBzdHJpbmcgLy8gZS5nLiwgXCJodHRwczpcIlxuICB1c2VybmFtZT86IHN0cmluZ1xuICBwYXNzd29yZD86IHN0cmluZ1xuICBob3N0bmFtZT86IHN0cmluZ1xuICBwb3J0Pzogc3RyaW5nXG4gIHBhdGg/OiBzdHJpbmdcbiAgcXVlcnlJdGVtcz86IFJlY29yZDxzdHJpbmcsIHN0cmluZyB8IHN0cmluZ1tdPlxuICBmcmFnbWVudD86IHN0cmluZyAvLyBlLmcuLCBcIiNzZWN0aW9uXCJcbn1cblxuLyoqXG4gKiBBIGNsYXNzIGZvciBwYXJzaW5nLCB1cGRhdGluZywgYW5kIGJ1aWxkaW5nIFVSTHMuXG4gKlxuICogVGhlIGNsYXNzIGRvZXMgbm90IHVzZSB0aGUgYnVpbHRcdTIwMTFpbiBVUkwgY2xhc3Mgb3IgbmFtZWQgcmVnZXggY2FwdHVyZSBncm91cHMuXG4gKi9cbmV4cG9ydCBjbGFzcyBVUkwge1xuICBwcm90b2NvbDogc3RyaW5nXG4gIGhvc3RuYW1lOiBzdHJpbmdcbiAgcGF0aDogc3RyaW5nXG5cbiAgdXNlcm5hbWU/OiBzdHJpbmdcbiAgcGFzc3dvcmQ/OiBzdHJpbmdcbiAgcG9ydD86IHN0cmluZ1xuICBxdWVyeUl0ZW1zPzogUmVjb3JkPHN0cmluZywgc3RyaW5nIHwgc3RyaW5nW10+IHwgdW5kZWZpbmVkXG4gIGZyYWdtZW50Pzogc3RyaW5nXG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgU2ltcGxlVVJMIGluc3RhbmNlLlxuICAgKiBAcGFyYW0gdXJsIC0gKE9wdGlvbmFsKSBBIFVSTCBzdHJpbmcgdG8gaW5pdGlhbGl6ZSB0aGUgaW5zdGFuY2UuXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih1cmw6IHN0cmluZykge1xuICAgIGNvbnN0IGNvbXBvbmVudHMgPSBwYXJzZVVSTCh1cmwpXG5cbiAgICBpZiAoIWNvbXBvbmVudHMuaG9zdG5hbWUgfHwgIWNvbXBvbmVudHMucHJvdG9jb2wpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVVJMIEhvc3RuYW1lIGFuZCBQcm90b2NvbCBhcmUgcmVxdWlyZWQnKVxuICAgIH1cblxuICAgIHRoaXMuaG9zdG5hbWUgPSBjb21wb25lbnRzLmhvc3RuYW1lXG4gICAgdGhpcy5wcm90b2NvbCA9IGNvbXBvbmVudHMucHJvdG9jb2xcbiAgICB0aGlzLnBhdGggPSBjb21wb25lbnRzLnBhdGggPz8gJydcbiAgICB0aGlzLnVzZXJuYW1lID0gY29tcG9uZW50cy51c2VybmFtZVxuICAgIHRoaXMucGFzc3dvcmQgPSBjb21wb25lbnRzLnBhc3N3b3JkXG4gICAgdGhpcy5wb3J0ID0gY29tcG9uZW50cy5wb3J0XG4gICAgdGhpcy5xdWVyeUl0ZW1zID0gY29tcG9uZW50cy5xdWVyeUl0ZW1zXG4gICAgdGhpcy5mcmFnbWVudCA9IGNvbXBvbmVudHMuZnJhZ21lbnRcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBmdWxsIFVSTCBzdHJpbmcgYnVpbHQgZnJvbSB0aGUgY3VycmVudCBjb21wb25lbnRzLlxuICAgKi9cbiAgdG9TdHJpbmcoKTogc3RyaW5nIHtcbiAgICBsZXQgdXJsID0gYCR7dGhpcy5wcm90b2NvbH06Ly9gXG5cbiAgICAvLyBBcHBlbmQgdXNlciBpbmZvIGlmIGF2YWlsYWJsZS5cbiAgICBpZiAodGhpcy51c2VybmFtZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMudXNlcm5hbWUgIT09ICcnKSB7XG4gICAgICB1cmwgKz0gdGhpcy51c2VybmFtZVxuICAgICAgaWYgKHRoaXMucGFzc3dvcmQgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnBhc3N3b3JkICE9PSAnJykge1xuICAgICAgICB1cmwgKz0gYDoke3RoaXMucGFzc3dvcmR9YFxuICAgICAgfVxuICAgICAgdXJsICs9ICdAJ1xuICAgIH1cblxuICAgIHVybCArPSB0aGlzLmhvc3RuYW1lXG5cbiAgICBpZiAodGhpcy5wb3J0ICE9PSB1bmRlZmluZWQgJiYgdGhpcy5wb3J0ICE9PSAnJykge1xuICAgICAgdXJsICs9IGA6JHt0aGlzLnBvcnR9YFxuICAgIH1cblxuICAgIC8vIFBhdGhuYW1lLlxuICAgIGlmICh0aGlzLnBhdGggIT09ICcnKSB7XG4gICAgICB1cmwgKz0gdGhpcy5wYXRoLnN0YXJ0c1dpdGgoJy8nKSA/IHRoaXMucGF0aCA6IGAvJHt0aGlzLnBhdGh9YFxuICAgIH1cblxuICAgIGlmICh0aGlzLnF1ZXJ5SXRlbXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gUXVlcnkgc3RyaW5nLlxuICAgICAgY29uc3QgcXVlcnlLZXlzID0gT2JqZWN0LmtleXModGhpcy5xdWVyeUl0ZW1zKVxuICAgICAgY29uc3QgcGFyYW1zOiBzdHJpbmdbXSA9IFtdXG4gICAgICBpZiAocXVlcnlLZXlzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgcXVlcnlLZXlzKSB7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnF1ZXJ5SXRlbXNba2V5XVxuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCB2IG9mIHZhbHVlKSB7XG4gICAgICAgICAgICAgIHBhcmFtcy5wdXNoKGAke2VuY29kZVVSSUNvbXBvbmVudChrZXkpfT0ke2VuY29kZVVSSUNvbXBvbmVudCh2KX1gKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcGFyYW1zLnB1c2goXG4gICAgICAgICAgICAgIGAke2VuY29kZVVSSUNvbXBvbmVudChrZXkpfT0ke2VuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSl9YFxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdXJsICs9IGA/JHtwYXJhbXMuam9pbignJicpfWBcbiAgICB9XG5cbiAgICAvLyBIYXNoIChmcmFnbWVudCkuXG4gICAgaWYgKHRoaXMuZnJhZ21lbnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdXJsICs9IGAjJHt0aGlzLmZyYWdtZW50fWBcbiAgICB9XG5cbiAgICByZXR1cm4gdXJsXG4gIH1cblxuICAvKipcbiAgICogQ29udmVuaWVuY2UgbWV0aG9kIHRvIHVwZGF0ZSB0aGUgcHJvdG9jb2wuXG4gICAqL1xuICBzZXRQcm90b2NvbChuZXdQcm90b2NvbDogc3RyaW5nKTogdGhpcyB7XG4gICAgaWYgKG5ld1Byb3RvY29sID09PSAnJykgdGhyb3cgbmV3IEVycm9yKCdQcm90b2NvbCBpcyByZXF1aXJlZCcpXG5cbiAgICB0aGlzLnByb3RvY29sID0gbmV3UHJvdG9jb2xcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlbmllbmNlIG1ldGhvZCB0byB1cGRhdGUgdGhlIHVzZXJuYW1lLlxuICAgKi9cbiAgc2V0VXNlcm5hbWUobmV3VXNlcm5hbWU/OiBzdHJpbmcpOiB0aGlzIHtcbiAgICBpZiAobmV3VXNlcm5hbWUgPT09ICcnKSB0aGlzLnVzZXJuYW1lID0gdW5kZWZpbmVkXG4gICAgZWxzZSB0aGlzLnVzZXJuYW1lID0gbmV3VXNlcm5hbWVcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlbmllbmNlIG1ldGhvZCB0byB1cGRhdGUgdGhlIHBhc3N3b3JkLlxuICAgKi9cbiAgc2V0UGFzc3dvcmQobmV3UGFzc3dvcmQ/OiBzdHJpbmcpOiB0aGlzIHtcbiAgICBpZiAobmV3UGFzc3dvcmQgPT09ICcnKSB0aGlzLnBhc3N3b3JkID0gdW5kZWZpbmVkXG4gICAgZWxzZSB0aGlzLnBhc3N3b3JkID0gbmV3UGFzc3dvcmRcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogQ29udmVuaWVuY2UgbWV0aG9kIHRvIHVwZGF0ZSB0aGUgaG9zdG5hbWUuXG4gICAqL1xuICBzZXRIb3N0bmFtZShuZXdIb3N0bmFtZTogc3RyaW5nKTogdGhpcyB7XG4gICAgaWYgKG5ld0hvc3RuYW1lID09PSAnJykgdGhyb3cgbmV3IEVycm9yKCdIb3N0bmFtZSBpcyByZXF1aXJlZCcpXG5cbiAgICB0aGlzLmhvc3RuYW1lID0gbmV3SG9zdG5hbWVcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlbmllbmNlIG1ldGhvZCB0byB1cGRhdGUgdGhlIHBvcnQuXG4gICAqL1xuICBzZXRQb3J0KG5ld1BvcnQ/OiBzdHJpbmcpOiB0aGlzIHtcbiAgICBpZiAobmV3UG9ydCA9PT0gJycpIHRoaXMucG9ydCA9IHVuZGVmaW5lZFxuICAgIGVsc2UgdGhpcy5wb3J0ID0gbmV3UG9ydFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogQ29udmVuaWVuY2UgbWV0aG9kIHRvIHVwZGF0ZSB0aGUgcGF0aG5hbWUuXG4gICAqL1xuICBzZXRQYXRoKG5ld1BhdGhuYW1lOiBzdHJpbmcpOiB0aGlzIHtcbiAgICB0aGlzLnBhdGggPSBuZXdQYXRobmFtZS5zdGFydHNXaXRoKCcvJykgPyBuZXdQYXRobmFtZSA6IGAvJHtuZXdQYXRobmFtZX1gXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGFkZFBhdGhDb21wb25lbnQoY29tcG9uZW50OiBzdHJpbmcpOiB0aGlzIHtcbiAgICB0aGlzLnBhdGggPVxuICAgICAgKHRoaXMucGF0aCA/PyAnJykgK1xuICAgICAgKGNvbXBvbmVudC5zdGFydHNXaXRoKCcvJykgPyBjb21wb25lbnQgOiBgLyR7Y29tcG9uZW50fWApXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXBsYWNlIHRoZSBlbnRpcmUgcXVlcnkgb2JqZWN0LlxuICAgKi9cbiAgc2V0UXVlcnlJdGVtcyhuZXdRdWVyeT86IFJlY29yZDxzdHJpbmcsIHN0cmluZyB8IHN0cmluZ1tdPik6IHRoaXMge1xuICAgIHRoaXMucXVlcnlJdGVtcyA9IG5ld1F1ZXJ5XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgb3IgYWRkIGEgc2luZ2xlIHF1ZXJ5IHBhcmFtZXRlci5cbiAgICovXG4gIHNldFF1ZXJ5SXRlbShrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyB8IHN0cmluZ1tdKTogdGhpcyB7XG4gICAgaWYgKHRoaXMucXVlcnlJdGVtcyA9PT0gdW5kZWZpbmVkKSB0aGlzLnF1ZXJ5SXRlbXMgPSB7fVxuXG4gICAgdGhpcy5xdWVyeUl0ZW1zW2tleV0gPSB2YWx1ZVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGEgcXVlcnkgcGFyYW1ldGVyLlxuICAgKi9cbiAgcmVtb3ZlUXVlcnlJdGVtKGtleTogc3RyaW5nKTogdGhpcyB7XG4gICAgZGVsZXRlIHRoaXMucXVlcnlJdGVtcz8uW2tleV1cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlbmllbmNlIG1ldGhvZCB0byB1cGRhdGUgdGhlIGhhc2ggKGZyYWdtZW50KS5cbiAgICovXG4gIHNldEZyYWdtZW50KG5ld0hhc2g6IHN0cmluZyk6IHRoaXMge1xuICAgIHRoaXMuZnJhZ21lbnQgPSBuZXdIYXNoXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIGN1cnJlbnQgVVJMIGNvbXBvbmVudHMuXG4gICAqXG4gICAqIEFjY2VwdHMgZWl0aGVyOlxuICAgKiAtIEEgVVJMIHN0cmluZywgd2hpY2ggbWF5IGJlIGEgZnVsbCBVUkwgKGUuZy4sIFwiaHR0cHM6Ly9leGFtcGxlLmNvbS9wYXRoP2Zvbz1iYXJcIilcbiAgICogICBvciBhIHBhcnRpYWwgVVJMIChlLmcuLCBcIi9uZXcvcGF0aD9mb289YmFyI3NlY3Rpb25cIikuIEluIHRoaXMgY2FzZSwgb25seSB0aGUgY29tcG9uZW50c1xuICAgKiAgIHByZXNlbnQgaW4gdGhlIHN0cmluZyB3aWxsIGJlIHVwZGF0ZWQuXG4gICAqIC0gQSBwYXJ0aWFsIFVybENvbXBvbmVudHMgb2JqZWN0LlxuICAgKlxuICAgKiBAcGFyYW0gaW5wdXQgLSBBIFVSTCBzdHJpbmcgb3IgYSBwYXJ0aWFsIFVybENvbXBvbmVudHMgb2JqZWN0LlxuICAgKi9cbiAgdXBkYXRlKGlucHV0OiBzdHJpbmcgfCBQYXJ0aWFsPFVSTENvbXBvbmVudHM+KTogdGhpcyB7XG4gICAgbGV0IGNvbXBvbmVudHM6IFVSTENvbXBvbmVudHNcblxuICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAvLyBJZiBpbnB1dCBpcyBhIHN0cmluZywgcGFyc2UgYW5kIHVwZGF0ZSBvbmx5IHRoZSBwcm92aWRlZCBjb21wb25lbnRzLlxuICAgICAgY29tcG9uZW50cyA9IHBhcnNlVVJMKGlucHV0KVxuICAgIH0gZWxzZSB7XG4gICAgICBjb21wb25lbnRzID0gaW5wdXRcbiAgICB9XG5cbiAgICAvLyBPdGhlcndpc2UsIHVwZGF0ZSBwcm92aWRlZCBmaWVsZHMuXG4gICAgaWYgKGNvbXBvbmVudHMucHJvdG9jb2wgIT09IHVuZGVmaW5lZCkgdGhpcy5zZXRQcm90b2NvbChjb21wb25lbnRzLnByb3RvY29sKVxuICAgIGlmIChjb21wb25lbnRzLnVzZXJuYW1lICE9PSB1bmRlZmluZWQpIHRoaXMuc2V0VXNlcm5hbWUoY29tcG9uZW50cy51c2VybmFtZSlcbiAgICBpZiAoY29tcG9uZW50cy5wYXNzd29yZCAhPT0gdW5kZWZpbmVkKSB0aGlzLnNldFBhc3N3b3JkKGNvbXBvbmVudHMucGFzc3dvcmQpXG4gICAgaWYgKGNvbXBvbmVudHMuaG9zdG5hbWUgIT09IHVuZGVmaW5lZCkgdGhpcy5zZXRIb3N0bmFtZShjb21wb25lbnRzLmhvc3RuYW1lKVxuICAgIGlmIChjb21wb25lbnRzLnBvcnQgIT09IHVuZGVmaW5lZCkgdGhpcy5zZXRQb3J0KGNvbXBvbmVudHMucG9ydClcbiAgICBpZiAoY29tcG9uZW50cy5wYXRoICE9PSB1bmRlZmluZWQpIHRoaXMuc2V0UGF0aChjb21wb25lbnRzLnBhdGgpXG4gICAgaWYgKGNvbXBvbmVudHMucXVlcnlJdGVtcyAhPT0gdW5kZWZpbmVkKVxuICAgICAgdGhpcy5zZXRRdWVyeUl0ZW1zKGNvbXBvbmVudHMucXVlcnlJdGVtcylcbiAgICBpZiAoY29tcG9uZW50cy5mcmFnbWVudCAhPT0gdW5kZWZpbmVkKSB0aGlzLnNldEZyYWdtZW50KGNvbXBvbmVudHMuZnJhZ21lbnQpXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG4iLCAiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC1leHByZXNzaW9ucyAqL1xuaW1wb3J0IHR5cGUgeyBDaGFwdGVyIH0gZnJvbSAnLi4vQ2hhcHRlci5qcydcbmltcG9ydCB7IFNvdXJjZUludGVudHMsIHR5cGUgRXh0ZW5zaW9uSW5mbyB9IGZyb20gJy4uL2ltcGwvU291cmNlSW5mby5qcydcbmltcG9ydCB0eXBlIHsgUGFnZWRSZXN1bHRzIH0gZnJvbSAnLi4vUGFnZWRSZXN1bHRzLmpzJ1xuaW1wb3J0IHR5cGUgeyBTZWFyY2hGaWx0ZXIgfSBmcm9tICcuLi9TZWFyY2hGaWx0ZXIuanMnXG5pbXBvcnQgdHlwZSB7IFNlYXJjaFF1ZXJ5IH0gZnJvbSAnLi4vU2VhcmNoUXVlcnkuanMnXG5pbXBvcnQgdHlwZSB7IFNlYXJjaFJlc3VsdEl0ZW0gfSBmcm9tICcuLi9TZWFyY2hSZXN1bHRJdGVtLmpzJ1xuaW1wb3J0IHR5cGUgeyBTb3J0aW5nT3B0aW9uIH0gZnJvbSAnLi4vU29ydGluZ09wdGlvbi5qcydcbmltcG9ydCB0eXBlIHsgU291cmNlTWFuZ2EgfSBmcm9tICcuLi9Tb3VyY2VNYW5nYS5qcydcbmltcG9ydCB0eXBlIHsgRXh0ZW5zaW9uIH0gZnJvbSAnLi9FeHRlbnNpb24uanMnXG5pbXBvcnQgeyBpbXBsZW1lbnRzQ2hhcHRlclByb3ZpZGluZywgdHlwZSBDaGFwdGVyUHJvdmlkaW5nIH0gZnJvbSAnLi9pbnRlcmZhY2VzL0NoYXB0ZXJQcm92aWRpbmcuanMnXG5pbXBvcnQgdHlwZSB7IE1hbmdhUHJvdmlkaW5nIH0gZnJvbSAnLi9pbnRlcmZhY2VzL01hbmdhUHJvdmlkaW5nLmpzJ1xuaW1wb3J0IHtcbiAgaW1wbGVtZW50c1NlYXJjaFJlc3VsdHNQcm92aWRpbmcsXG4gIHR5cGUgU2VhcmNoUmVzdWx0c1Byb3ZpZGluZyxcbn0gZnJvbSAnLi9pbnRlcmZhY2VzL1NlYXJjaFJlc3VsdHNQcm92aWRpbmcuanMnXG5pbXBvcnQgeyBleHBlY3QgfSBmcm9tICdjaGFpJ1xuXG4vLyBUeXBlcyBmb3IgdGVzdCBjYXNlcyBhbmQgcmVzdWx0c1xudHlwZSBUZXN0Q2FzZSA9IHtcbiAgbmFtZTogc3RyaW5nXG4gIGZuOiAoKSA9PiBQcm9taXNlPHVua25vd24+XG59XG5cbnR5cGUgVGVzdFJlc3VsdCA9IHtcbiAgbmFtZTogc3RyaW5nXG4gIHBhc3NlZDogYm9vbGVhblxuICBlcnJvcj86IEVycm9yXG4gIGR1cmF0aW9uOiBudW1iZXJcbiAgcmV0dXJuVmFsdWU/OiB1bmtub3duXG59XG5cbnR5cGUgU3VpdGVSZXN1bHQgPSB7XG4gIHN1aXRlTmFtZTogc3RyaW5nXG4gIHBhc3NlZDogbnVtYmVyXG4gIGZhaWxlZDogbnVtYmVyXG4gIHRvdGFsOiBudW1iZXJcbiAgZHVyYXRpb246IG51bWJlclxuICB0ZXN0UmVzdWx0czogVGVzdFJlc3VsdFtdXG59XG5cbi8vIFRlc3QgU3VpdGUgY2xhc3NcbmV4cG9ydCBjbGFzcyBUZXN0U3VpdGUge1xuICByZWFkb25seSBzdGF0ZTogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gPSB7fVxuICBwcml2YXRlIHRlc3RDYXNlczogVGVzdENhc2VbXSA9IFtdXG4gIHByaXZhdGUgc3VpdGVOYW1lOiBzdHJpbmdcblxuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICB0aGlzLnN1aXRlTmFtZSA9IG5hbWVcbiAgfVxuXG4gIC8vIFJlZ2lzdGVyIGEgdGVzdCBjYXNlXG4gIHRlc3QobmFtZTogc3RyaW5nLCBmbjogKCkgPT4gUHJvbWlzZTx2b2lkPik6IHZvaWQge1xuICAgIHRoaXMudGVzdENhc2VzLnB1c2goeyBuYW1lLCBmbiB9KVxuICB9XG5cbiAgLy8gUnVuIGFsbCB0ZXN0IGNhc2VzIHNlcXVlbnRpYWxseVxuICBhc3luYyBydW4oKTogUHJvbWlzZTxTdWl0ZVJlc3VsdD4ge1xuICAgIGNvbnNvbGUubG9nKGBcXG5cdUQ4M0VcdURERUEgUnVubmluZyB0ZXN0IHN1aXRlOiAke3RoaXMuc3VpdGVOYW1lfWApXG4gICAgY29uc29sZS5sb2coJz0nLnJlcGVhdCg1MCkpXG5cbiAgICBjb25zdCBzdGFydFRpbWUgPSBEYXRlLm5vdygpXG4gICAgY29uc3QgdGVzdFJlc3VsdHM6IFRlc3RSZXN1bHRbXSA9IFtdXG4gICAgbGV0IHBhc3NlZCA9IDBcbiAgICBsZXQgZmFpbGVkID0gMFxuXG4gICAgZm9yIChjb25zdCB0ZXN0Q2FzZSBvZiB0aGlzLnRlc3RDYXNlcykge1xuICAgICAgY29uc3QgdGVzdFN0YXJ0VGltZSA9IERhdGUubm93KClcbiAgICAgIGxldCB0ZXN0UmVzdWx0OiBUZXN0UmVzdWx0XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJldHVyblZhbHVlID0gYXdhaXQgdGVzdENhc2UuZm4oKVxuICAgICAgICBjb25zdCBkdXJhdGlvbiA9IERhdGUubm93KCkgLSB0ZXN0U3RhcnRUaW1lXG4gICAgICAgIHRlc3RSZXN1bHQgPSB7XG4gICAgICAgICAgbmFtZTogdGVzdENhc2UubmFtZSxcbiAgICAgICAgICBwYXNzZWQ6IHRydWUsXG4gICAgICAgICAgZHVyYXRpb24sXG4gICAgICAgICAgcmV0dXJuVmFsdWUsXG4gICAgICAgIH1cbiAgICAgICAgcGFzc2VkKytcbiAgICAgICAgY29uc29sZS5sb2coYFx1MjcwNSAke3Rlc3RDYXNlLm5hbWV9ICgke2R1cmF0aW9ufW1zKWApXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zdCBkdXJhdGlvbiA9IERhdGUubm93KCkgLSB0ZXN0U3RhcnRUaW1lXG4gICAgICAgIHRlc3RSZXN1bHQgPSB7XG4gICAgICAgICAgbmFtZTogdGVzdENhc2UubmFtZSxcbiAgICAgICAgICBwYXNzZWQ6IGZhbHNlLFxuICAgICAgICAgIGVycm9yOiBlcnJvciBhcyBFcnJvcixcbiAgICAgICAgICBkdXJhdGlvbixcbiAgICAgICAgfVxuICAgICAgICBmYWlsZWQrK1xuICAgICAgICBjb25zb2xlLmxvZyhgXHUyNzRDICR7dGVzdENhc2UubmFtZX0gKCR7ZHVyYXRpb259bXMpYClcbiAgICAgICAgY29uc29sZS5sb2coYCAgIEVycm9yOiAkeyhlcnJvciBhcyBFcnJvcikubWVzc2FnZX1gKVxuICAgICAgfVxuXG4gICAgICB0ZXN0UmVzdWx0cy5wdXNoKHRlc3RSZXN1bHQpXG4gICAgfVxuXG4gICAgY29uc3QgdG90YWxEdXJhdGlvbiA9IERhdGUubm93KCkgLSBzdGFydFRpbWVcbiAgICBjb25zdCBzdWl0ZVJlc3VsdDogU3VpdGVSZXN1bHQgPSB7XG4gICAgICBzdWl0ZU5hbWU6IHRoaXMuc3VpdGVOYW1lLFxuICAgICAgcGFzc2VkLFxuICAgICAgZmFpbGVkLFxuICAgICAgdG90YWw6IHRoaXMudGVzdENhc2VzLmxlbmd0aCxcbiAgICAgIGR1cmF0aW9uOiB0b3RhbER1cmF0aW9uLFxuICAgICAgdGVzdFJlc3VsdHMsXG4gICAgfVxuXG4gICAgdGhpcy5wcmludFN1bW1hcnkoc3VpdGVSZXN1bHQpXG4gICAgcmV0dXJuIHN1aXRlUmVzdWx0XG4gIH1cblxuICBwcml2YXRlIHByaW50U3VtbWFyeShyZXN1bHQ6IFN1aXRlUmVzdWx0KTogdm9pZCB7XG4gICAgY29uc29sZS5sb2coJ1xcblx1RDgzRFx1RENDQSBUZXN0IFN1bW1hcnk6JylcbiAgICBjb25zb2xlLmxvZyhgICAgVG90YWw6ICR7cmVzdWx0LnRvdGFsfWApXG4gICAgY29uc29sZS5sb2coYCAgIFBhc3NlZDogJHtyZXN1bHQucGFzc2VkfWApXG4gICAgY29uc29sZS5sb2coYCAgIEZhaWxlZDogJHtyZXN1bHQuZmFpbGVkfWApXG4gICAgY29uc29sZS5sb2coYCAgIER1cmF0aW9uOiAke3Jlc3VsdC5kdXJhdGlvbn1tc2ApXG5cbiAgICBpZiAocmVzdWx0LmZhaWxlZCA+IDApIHtcbiAgICAgIGNvbnNvbGUubG9nKGBcXG5cdTI3NEMgU3VpdGUgXCIke3Jlc3VsdC5zdWl0ZU5hbWV9XCIgZmFpbGVkYClcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coYFxcblx1MjcwNSBTdWl0ZSBcIiR7cmVzdWx0LnN1aXRlTmFtZX1cIiBwYXNzZWRgKVxuICAgIH1cbiAgfVxufVxuXG50eXBlIEV4dGVuc2lvblRlc3REYXRhID0ge1xuICBzZWFyY2hSZXN1bHRzUHJvdmlkaW5nPzoge1xuICAgIGdldFNlYXJjaFJlc3VsdHM6IFBhcmFtZXRlcnM8U2VhcmNoUmVzdWx0c1Byb3ZpZGluZ1snZ2V0U2VhcmNoUmVzdWx0cyddPlxuICAgIGdldFNvcnRpbmdPcHRpb25zPzogUGFyYW1ldGVyczxcbiAgICAgIEV4Y2x1ZGU8U2VhcmNoUmVzdWx0c1Byb3ZpZGluZ1snZ2V0U29ydGluZ09wdGlvbnMnXSwgdW5kZWZpbmVkPlxuICAgID5cbiAgfVxuICBtYW5nYVByb3ZpZGluZz86IHtcbiAgICBnZXRNYW5nYURldGFpbHM6IFBhcmFtZXRlcnM8TWFuZ2FQcm92aWRpbmdbJ2dldE1hbmdhRGV0YWlscyddPlxuICB9XG4gIGNoYXB0ZXJQcm92aWRpbmc/OiB7XG4gICAgZ2V0Q2hhcHRlcnM6IFBhcmFtZXRlcnM8Q2hhcHRlclByb3ZpZGluZ1snZ2V0Q2hhcHRlcnMnXT5cbiAgICBnZXRDaGFwdGVyRGV0YWlsczogUGFyYW1ldGVyczxDaGFwdGVyUHJvdmlkaW5nWydnZXRDaGFwdGVyRGV0YWlscyddPlxuICB9XG59XG5cbmV4cG9ydCBjb25zdCByZWdpc3RlckRlZmF1bHRUZXN0cyA9IGZ1bmN0aW9uIChcbiAgc3VpdGU6IFRlc3RTdWl0ZSxcbiAgZXh0ZW5zaW9uOiBFeHRlbnNpb24sXG4gIGV4dGVuc2lvbkluZm86IEV4dGVuc2lvbkluZm8sXG4gIHRlc3REYXRhOiBFeHRlbnNpb25UZXN0RGF0YSA9IHt9XG4pIHtcbiAgcmVnaXN0ZXJEZWZhdWx0SW5pdGlhbGlzYXRpb25UZXN0cyhzdWl0ZSwgZXh0ZW5zaW9uKVxuXG4gIGxldCBzb3VyY2VDYXBhYmlsaXRpZXM6IFNvdXJjZUludGVudHMgPSAwXG4gIGlmIChBcnJheS5pc0FycmF5KGV4dGVuc2lvbkluZm8uY2FwYWJpbGl0aWVzKSkge1xuICAgIHNvdXJjZUNhcGFiaWxpdGllcyA9IGV4dGVuc2lvbkluZm8uY2FwYWJpbGl0aWVzLnJlZHVjZShcbiAgICAgIChhLCBiKSA9PiBhIHwgYixcbiAgICAgIHNvdXJjZUNhcGFiaWxpdGllc1xuICAgIClcbiAgfSBlbHNlIHtcbiAgICBzb3VyY2VDYXBhYmlsaXRpZXMgPSBleHRlbnNpb25JbmZvLmNhcGFiaWxpdGllc1xuICB9XG5cbiAgaWYgKHNvdXJjZUNhcGFiaWxpdGllcyAmIFNvdXJjZUludGVudHMuU0VBUkNIX1JFU1VMVFNfUFJPVklESU5HKSB7XG4gICAgaWYgKGltcGxlbWVudHNTZWFyY2hSZXN1bHRzUHJvdmlkaW5nKGV4dGVuc2lvbikpIHtcbiAgICAgIHJlZ2lzdGVyRGVmYXVsdFNlYXJjaFJlc3VsdHNQcm92aWRpbmdTb3VyY2VUZXN0cyhcbiAgICAgICAgc3VpdGUsXG4gICAgICAgIGV4dGVuc2lvbixcbiAgICAgICAgdGVzdERhdGFcbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgZXh0ZW5zaW9uIGRvZXMgbm90IGltcGxlbWVudCAnU2VhcmNoUmVzdWx0c1Byb3ZpZGluZycgYnV0IGhhcyB0aGUgJ1NFQVJDSF9SRVNVTFRTX1BST1ZJRElORycgY2FwYWJpbGl0eWBcbiAgICAgIClcbiAgICB9XG4gIH1cblxuXG4gIHJlZ2lzdGVyRGVmYXVsdE1hbmdhUHJvdmlkaW5nU291cmNlVGVzdHMoc3VpdGUsIGV4dGVuc2lvbiwgdGVzdERhdGEpXG5cbiAgaWYgKHNvdXJjZUNhcGFiaWxpdGllcyAmIFNvdXJjZUludGVudHMuQ0hBUFRFUl9QUk9WSURJTkcpIHtcbiAgICBpZiAoaW1wbGVtZW50c0NoYXB0ZXJQcm92aWRpbmcoZXh0ZW5zaW9uKSkge1xuICAgICAgcmVnaXN0ZXJEZWZhdWx0Q2hhcHRlclByb3ZpZGluZ1NvdXJjZVRlc3RzKFxuICAgICAgICBzdWl0ZSxcbiAgICAgICAgZXh0ZW5zaW9uLFxuICAgICAgICB0ZXN0RGF0YVxuICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBleHRlbnNpb24gZG9lcyBub3QgaW1wbGVtZW50ICdDaGFwdGVyUHJvdmlkaW5nJyBidXQgaGFzIHRoZSAnQ0hBUFRFUl9QUk9WSURJTkcnIGNhcGFiaWxpdHlgXG4gICAgICApXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCByZWdpc3RlckRlZmF1bHRJbml0aWFsaXNhdGlvblRlc3RzID0gZnVuY3Rpb24gKFxuICBzdWl0ZTogVGVzdFN1aXRlLFxuICBleHRlbnNpb246IEV4dGVuc2lvblxuKSB7XG4gIHN1aXRlLnRlc3QoJ2luaXRpYWxpc2F0aW9uJywgYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IGV4dGVuc2lvbi5pbml0aWFsaXNlKClcbiAgfSlcbn1cblxuY29uc3QgU1RBVEVfS0VZID0ge1xuICBTZWFyY2hSZXN1bHRzUHJvdmlkaW5nOiB7XG4gICAgZ2V0U2VhcmNoRmlsdGVyczogJ1NlYXJjaFJlc3VsdHNQcm92aWRpbmcuZ2V0U2VhcmNoRmlsdGVycycsXG4gICAgZ2V0U2VhcmNoUmVzdWx0czogJ1NlYXJjaFJlc3VsdHNQcm92aWRpbmcuZ2V0U2VhcmNoUmVzdWx0cycsXG4gICAgZ2V0U29ydGluZ09wdGlvbnM6ICdTZWFyY2hSZXN1bHRzUHJvdmlkaW5nLmdldFNvcnRpbmdPcHRpb25zJyxcbiAgfSxcbiAgTWFuZ2FQcm92aWRpbmc6IHtcbiAgICBnZXRNYW5nYURldGFpbHM6ICdNYW5nYVByb3ZpZGluZy5nZXRNYW5nYURldGFpbHMnLFxuICB9LFxuICBDaGFwdGVyUHJvdmlkaW5nOiB7XG4gICAgZ2V0Q2hhcHRlcnM6ICdDaGFwdGVyUHJvdmlkaW5nLmdldENoYXB0ZXJzJyxcbiAgICBnZXRDaGFwdGVyRGV0YWlsczogJ0NoYXB0ZXJQcm92aWRpbmcuZ2V0Q2hhcHRlckRldGFpbHMnLFxuICB9LFxufVxuXG5leHBvcnQgY29uc3QgcmVnaXN0ZXJEZWZhdWx0U2VhcmNoUmVzdWx0c1Byb3ZpZGluZ1NvdXJjZVRlc3RzID0gZnVuY3Rpb24gKFxuICBzdWl0ZTogVGVzdFN1aXRlLFxuICBleHRlbnNpb246IEV4dGVuc2lvbiAmIFNlYXJjaFJlc3VsdHNQcm92aWRpbmcsXG4gIHtcbiAgICBzZWFyY2hSZXN1bHRzUHJvdmlkaW5nOiB0ZXN0RGF0YSxcbiAgfTogUGljazxFeHRlbnNpb25UZXN0RGF0YSwgJ3NlYXJjaFJlc3VsdHNQcm92aWRpbmcnPlxuKSB7XG4gIHN1aXRlLnRlc3QoJ2dldFNlYXJjaEZpbHRlcnMnLCBhc3luYyAoKSA9PiB7XG4gICAgZXhwZWN0KGV4dGVuc2lvbikudG8uaGF2ZS5wcm9wZXJ0eSgnZ2V0U2VhcmNoRmlsdGVycycpXG5cbiAgICBjb25zdCBzZWFyY2hGaWx0ZXJzID0gYXdhaXQgZXh0ZW5zaW9uLmdldFNlYXJjaEZpbHRlcnMoKVxuXG4gICAgZXhwZWN0KHNlYXJjaEZpbHRlcnMpLnRvLm5vdC5iZS51bmRlZmluZWRcbiAgICBzdWl0ZS5zdGF0ZVtTVEFURV9LRVkuU2VhcmNoUmVzdWx0c1Byb3ZpZGluZy5nZXRTZWFyY2hGaWx0ZXJzXSA9XG4gICAgICBzZWFyY2hGaWx0ZXJzXG4gIH0pXG5cbiAgaWYgKCdnZXRTb3J0aW5nT3B0aW9ucycgaW4gZXh0ZW5zaW9uKSB7XG4gICAgc3VpdGUudGVzdCgnZ2V0U29ydGluZ09wdGlvbnMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgcGFyYW1zID0gdGVzdERhdGE/LmdldFNvcnRpbmdPcHRpb25zXG4gICAgICBpZiAoIXBhcmFtcykge1xuICAgICAgICBjb25zdCBzZWFyY2hGaWx0ZXJzID0gc3VpdGUuc3RhdGVbXG4gICAgICAgICAgU1RBVEVfS0VZLlNlYXJjaFJlc3VsdHNQcm92aWRpbmcuZ2V0U2VhcmNoRmlsdGVyc1xuICAgICAgICBdIGFzIFNlYXJjaEZpbHRlcltdIHwgdW5kZWZpbmVkXG4gICAgICAgIHBhcmFtcyA9IFt7IHRpdGxlOiAnJywgZmlsdGVyczogc2VhcmNoRmlsdGVycyA/PyBbXSB9XVxuICAgICAgfVxuXG4gICAgICBjb25zdCBzb3J0aW5nT3B0aW9ucyA9IGF3YWl0IGV4dGVuc2lvbi5nZXRTb3J0aW5nT3B0aW9ucyEoLi4ucGFyYW1zKVxuICAgICAgZXhwZWN0KHNvcnRpbmdPcHRpb25zKS5ub3QuZW1wdHlcblxuICAgICAgc3VpdGUuc3RhdGVbU1RBVEVfS0VZLlNlYXJjaFJlc3VsdHNQcm92aWRpbmcuZ2V0U29ydGluZ09wdGlvbnNdID1cbiAgICAgICAgc29ydGluZ09wdGlvbnNcbiAgICB9KVxuICB9XG5cbiAgc3VpdGUudGVzdCgnZ2V0U2VhcmNoUmVzdWx0cycsIGFzeW5jICgpID0+IHtcbiAgICBleHBlY3QoZXh0ZW5zaW9uKS50by5oYXZlLnByb3BlcnR5KCdnZXRTZWFyY2hSZXN1bHRzJylcblxuICAgIGxldCBwYXJhbXMgPSB0ZXN0RGF0YT8uZ2V0U2VhcmNoUmVzdWx0c1xuICAgIGlmICghcGFyYW1zKSB7XG4gICAgICBjb25zdCBzZWFyY2hGaWx0ZXJzID0gc3VpdGUuc3RhdGVbXG4gICAgICAgIFNUQVRFX0tFWS5TZWFyY2hSZXN1bHRzUHJvdmlkaW5nLmdldFNlYXJjaEZpbHRlcnNcbiAgICAgIF0gYXMgU2VhcmNoRmlsdGVyW10gfCB1bmRlZmluZWRcbiAgICAgIGNvbnN0IHNvcnRpbmdPcHRpb25zID0gc3VpdGUuc3RhdGVbXG4gICAgICAgIFNUQVRFX0tFWS5TZWFyY2hSZXN1bHRzUHJvdmlkaW5nLmdldFNvcnRpbmdPcHRpb25zXG4gICAgICBdIGFzIFNvcnRpbmdPcHRpb25bXSB8IHVuZGVmaW5lZFxuICAgICAgcGFyYW1zID0gW1xuICAgICAgICB7IHRpdGxlOiAnJywgZmlsdGVyczogc2VhcmNoRmlsdGVycyA/PyBbXSB9LFxuICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgIHNvcnRpbmdPcHRpb25zPy5bMF0sXG4gICAgICBdXG4gICAgfVxuXG4gICAgY29uc3Qgc2VhcmNoUmVzdWx0cyA9IGF3YWl0IGV4dGVuc2lvbi5nZXRTZWFyY2hSZXN1bHRzKC4uLnBhcmFtcylcbiAgICBleHBlY3Qoc2VhcmNoUmVzdWx0cykubm90LmVtcHR5XG4gICAgZXhwZWN0KHNlYXJjaFJlc3VsdHMuaXRlbXMpLm5vdC5iZS5lbXB0eVxuXG4gICAgc3VpdGUuc3RhdGVbU1RBVEVfS0VZLlNlYXJjaFJlc3VsdHNQcm92aWRpbmcuZ2V0U2VhcmNoUmVzdWx0c10gPVxuICAgICAgc2VhcmNoUmVzdWx0c1xuICB9KVxufVxuXG5leHBvcnQgY29uc3QgcmVnaXN0ZXJEZWZhdWx0TWFuZ2FQcm92aWRpbmdTb3VyY2VUZXN0cyA9IGZ1bmN0aW9uIChcbiAgc3VpdGU6IFRlc3RTdWl0ZSxcbiAgZXh0ZW5zaW9uOiBFeHRlbnNpb24sXG4gIHsgbWFuZ2FQcm92aWRpbmc6IHRlc3REYXRhIH06IFBpY2s8RXh0ZW5zaW9uVGVzdERhdGEsICdtYW5nYVByb3ZpZGluZyc+XG4pIHtcbiAgc3VpdGUudGVzdCgnZ2V0TWFuZ2FEZXRhaWxzJywgYXN5bmMgKCkgPT4ge1xuICAgIGV4cGVjdChleHRlbnNpb24pLnRvLmhhdmUucHJvcGVydHkoJ2dldE1hbmdhRGV0YWlscycpXG5cbiAgICBsZXQgcGFyYW1zID0gdGVzdERhdGE/LmdldE1hbmdhRGV0YWlsc1xuICAgIGlmICghcGFyYW1zKSB7XG4gICAgICBjb25zdCBzZWFyY2hSZXN1bHRzID0gc3VpdGUuc3RhdGVbXG4gICAgICAgIFNUQVRFX0tFWS5TZWFyY2hSZXN1bHRzUHJvdmlkaW5nLmdldFNlYXJjaFJlc3VsdHNcbiAgICAgIF0gYXMgUGFnZWRSZXN1bHRzPFNlYXJjaFJlc3VsdEl0ZW0+IHwgdW5kZWZpbmVkXG4gICAgICBpZiAoc2VhcmNoUmVzdWx0cz8uaXRlbXNbMF0/Lm1hbmdhSWQpIHtcbiAgICAgICAgcGFyYW1zID0gW3NlYXJjaFJlc3VsdHMuaXRlbXNbMF0ubWFuZ2FJZF1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnTm8gYG1hbmdhSWRgIHByb3ZpZGVkIGluIHRlc3QgZGF0YS4gVW5hYmxlIHRvIGluZmVyIGZyb20gYFNlYXJjaFJlc3VsdHNQcm92aWRpbmcuZ2V0U2VhcmNoUmVzdWx0c2AnXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBtYW5nYURldGFpbHMgPSBhd2FpdCBleHRlbnNpb24uZ2V0TWFuZ2FEZXRhaWxzKC4uLnBhcmFtcylcbiAgICBleHBlY3QobWFuZ2FEZXRhaWxzKS50by5ub3QuYmUudW5kZWZpbmVkXG4gICAgZXhwZWN0KG1hbmdhRGV0YWlscy5tYW5nYUluZm8pLnRvLm5vdC5iZS51bmRlZmluZWRcblxuICAgIHN1aXRlLnN0YXRlW1NUQVRFX0tFWS5NYW5nYVByb3ZpZGluZy5nZXRNYW5nYURldGFpbHNdID0gbWFuZ2FEZXRhaWxzXG4gIH0pXG59XG5cbmV4cG9ydCBjb25zdCByZWdpc3RlckRlZmF1bHRDaGFwdGVyUHJvdmlkaW5nU291cmNlVGVzdHMgPSBmdW5jdGlvbiAoXG4gIHN1aXRlOiBUZXN0U3VpdGUsXG4gIGV4dGVuc2lvbjogRXh0ZW5zaW9uICYgQ2hhcHRlclByb3ZpZGluZyxcbiAgeyBjaGFwdGVyUHJvdmlkaW5nOiB0ZXN0RGF0YSB9OiBQaWNrPEV4dGVuc2lvblRlc3REYXRhLCAnY2hhcHRlclByb3ZpZGluZyc+XG4pIHtcbiAgc3VpdGUudGVzdCgnZ2V0Q2hhcHRlcnMnLCBhc3luYyAoKSA9PiB7XG4gICAgZXhwZWN0KGV4dGVuc2lvbikudG8uaGF2ZS5wcm9wZXJ0eSgnZ2V0Q2hhcHRlcnMnKVxuXG4gICAgbGV0IHBhcmFtcyA9IHRlc3REYXRhPy5nZXRDaGFwdGVyc1xuICAgIGlmICghcGFyYW1zKSB7XG4gICAgICBjb25zdCBzb3VyY2VNYW5nYSA9IHN1aXRlLnN0YXRlW1xuICAgICAgICBTVEFURV9LRVkuTWFuZ2FQcm92aWRpbmcuZ2V0TWFuZ2FEZXRhaWxzXG4gICAgICBdIGFzIFNvdXJjZU1hbmdhIHwgdW5kZWZpbmVkXG5cbiAgICAgIGlmIChzb3VyY2VNYW5nYSkge1xuICAgICAgICBwYXJhbXMgPSBbc291cmNlTWFuZ2FdXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ05vIGBzb3VyY2VNYW5nYWAgcHJvdmlkZWQgaW4gdGVzdCBkYXRhLiBVbmFibGUgdG8gaW5mZXIgZnJvbSBgTWFuZ2FQcm92aWRpbmcuZ2V0TWFuZ2FEZXRhaWxzYCdcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNoYXB0ZXJzID0gYXdhaXQgZXh0ZW5zaW9uLmdldENoYXB0ZXJzKC4uLnBhcmFtcylcbiAgICBleHBlY3QoY2hhcHRlcnMpLnRvLm5vdC5iZS5lbXB0eVxuXG4gICAgc3VpdGUuc3RhdGVbU1RBVEVfS0VZLkNoYXB0ZXJQcm92aWRpbmcuZ2V0Q2hhcHRlcnNdID0gY2hhcHRlcnNcbiAgfSlcblxuICBzdWl0ZS50ZXN0KCdnZXRDaGFwdGVyRGV0YWlscycsIGFzeW5jICgpID0+IHtcbiAgICBleHBlY3QoZXh0ZW5zaW9uKS50by5oYXZlLnByb3BlcnR5KCdnZXRDaGFwdGVyRGV0YWlscycpXG5cbiAgICBsZXQgcGFyYW1zID0gdGVzdERhdGE/LmdldENoYXB0ZXJEZXRhaWxzXG4gICAgaWYgKCFwYXJhbXMpIHtcbiAgICAgIGNvbnN0IGNoYXB0ZXJzID0gc3VpdGUuc3RhdGVbU1RBVEVfS0VZLkNoYXB0ZXJQcm92aWRpbmcuZ2V0Q2hhcHRlcnNdIGFzXG4gICAgICAgIHwgQ2hhcHRlcltdXG4gICAgICAgIHwgdW5kZWZpbmVkXG5cbiAgICAgIGlmIChjaGFwdGVycz8uWzBdKSB7XG4gICAgICAgIHBhcmFtcyA9IFtjaGFwdGVyc1swXV1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnTm8gYHNvdXJjZU1hbmdhYCBwcm92aWRlZCBpbiB0ZXN0IGRhdGEuIFVuYWJsZSB0byBpbmZlciBmcm9tIGBNYW5nYVByb3ZpZGluZy5nZXRNYW5nYURldGFpbHNgJ1xuICAgICAgICApXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY2hhcHRlckRldGFpbHMgPSBhd2FpdCBleHRlbnNpb24uZ2V0Q2hhcHRlckRldGFpbHMoLi4ucGFyYW1zKVxuICAgIGV4cGVjdChjaGFwdGVyRGV0YWlscykudG8ubm90LmJlLnVuZGVmaW5lZFxuXG4gICAgc3VpdGUuc3RhdGVbU1RBVEVfS0VZLkNoYXB0ZXJQcm92aWRpbmcuZ2V0Q2hhcHRlckRldGFpbHNdID0gY2hhcHRlckRldGFpbHNcbiAgfSlcbn1cbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvcHJlZmVyLWxpdGVyYWwtZW51bS1tZW1iZXIgKi9cbmV4cG9ydCBlbnVtIFNvdXJjZUludGVudHMge1xuICBOT05FID0gMCxcblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgdXNlIHtAbGluayBDSEFQVEVSX1BST1ZJRElOR31cbiAgICovXG4gIE1BTkdBX0NIQVBURVJTID0gMSA8PCAwLFxuICBDSEFQVEVSX1BST1ZJRElORyA9IDEgPDwgMCxcblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgdXNlIHtAbGluayBNQU5HQV9QUk9HUkVTU19QUk9WSURJTkd9XG4gICAqL1xuICBNQU5HQV9QUk9HUkVTUyA9IDEgPDwgMSxcbiAgTUFOR0FfUFJPR1JFU1NfUFJPVklESU5HID0gMSA8PCAxLFxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCB1c2Uge0BsaW5rIERJU0NPVkVSX1NFQ0lPTlNfUFJPVklESU5HfVxuICAgKi9cbiAgRElTQ09WRVJfU0VDSU9OUyA9IDEgPDwgMixcbiAgRElTQ09WRVJfU0VDSU9OU19QUk9WSURJTkcgPSAxIDw8IDIsXG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIHVzZSB7QGxpbmsgTUFOQUdFRF9DT0xMRUNUSU9OX1BST1ZJRElOR31cbiAgICovXG4gIENPTExFQ1RJT05fTUFOQUdFTUVOVCA9IDEgPDwgMyxcbiAgTUFOQUdFRF9DT0xMRUNUSU9OX1BST1ZJRElORyA9IDEgPDwgMyxcblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgdXNlIHtAbGluayBDTE9VREZMQVJFX0JZUEFTU19QUk9WSURJTkd9XG4gICAqL1xuICBDTE9VREZMQVJFX0JZUEFTU19SRVFVSVJFRCA9IDEgPDwgNCxcbiAgQ0xPVURGTEFSRV9CWVBBU1NfUFJPVklESU5HID0gMSA8PCA0LFxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCB1c2Uge0BsaW5rIFNFVFRJTkdTX0ZPUk1fUFJPVklESU5HfVxuICAgKi9cbiAgU0VUVElOR1NfVUkgPSAxIDw8IDUsXG4gIFNFVFRJTkdTX0ZPUk1fUFJPVklESU5HID0gMSA8PCA1LFxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCB1c2Uge0BsaW5rIFNFQVJDSF9SRVNVTFRTX1BST1ZJRElOR31cbiAgICovXG4gIE1BTkdBX1NFQVJDSCA9IDEgPDwgNixcbiAgU0VBUkNIX1JFU1VMVFNfUFJPVklESU5HID0gMSA8PCA2LFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNvdXJjZURldmVsb3BlciB7XG4gIHJlYWRvbmx5IG5hbWU6IHN0cmluZ1xuICByZWFkb25seSB3ZWJzaXRlPzogc3RyaW5nXG4gIHJlYWRvbmx5IGdpdGh1Yj86IHN0cmluZ1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNvdXJjZUJhZGdlIHtcbiAgcmVhZG9ubHkgbGFiZWw6IHN0cmluZ1xuICByZWFkb25seSB0ZXh0Q29sb3I6IHN0cmluZ1xuICByZWFkb25seSBiYWNrZ3JvdW5kQ29sb3I6IHN0cmluZ1xufVxuXG4vKipcbiAqIEEgY29udGVudCByYXRpbmcgdG8gYmUgYXR0cmlidXRlZCB0byBlYWNoIHNvdXJjZS5cbiAqL1xuZXhwb3J0IGVudW0gQ29udGVudFJhdGluZyB7XG4gIEVWRVJZT05FID0gJ1NBRkUnLFxuICBNQVRVUkUgPSAnTUFUVVJFJyxcbiAgQURVTFQgPSAnQURVTFQnLFxufVxuXG4vKipcbiAqIEBkZXByZWNhdGVkIHVzZSB7QGxpbmsgRXh0ZW5zaW9uSW5mb31cbiAqL1xuZXhwb3J0IHR5cGUgU291cmNlSW5mbyA9IEV4dGVuc2lvbkluZm9cblxuZXhwb3J0IGludGVyZmFjZSBFeHRlbnNpb25JbmZvIHtcbiAgLyoqXG4gICAqIFJlcXVpcmVkIGNsYXNzIHZhcmlhYmxlIHdoaWNoIGRlbm90ZXMgdGhlIGN1cnJlbnQgdmVyc2lvbiBvZiB0aGUgYXBwbGljYXRpb24uXG4gICAqIFRoaXMgaXMgd2hhdCB0aGUgYXBwbGljYXRpb24gdXNlcyB0byBkZXRlcm1pbmUgd2hldGhlciBpdCBuZWVkcyB0byB1cGRhdGUgaXQncyBsb2NhbFxuICAgKiB2ZXJzaW9uIG9mIHRoZSBzb3VyY2UsIHRvIGEgbmV3IHZlcnNpb24gb24gdGhlIHJlcG9zaXRvcnlcbiAgICovXG4gIHJlYWRvbmx5IHZlcnNpb246IHN0cmluZ1xuXG4gIC8qKlxuICAgKiBUaGUgdGl0bGUgb2YgdGhpcyBzb3VyY2UsIHRoaXMgaXMgd2hhdCB3aWxsIHNob3cgdXAgaW4gdGhlIGFwcGxpY2F0aW9uXG4gICAqIHRvIGlkZW50aWZ5IHdoYXQgTWFuZ2EgbG9jYXRpb24gaXMgYmVpbmcgdGFyZ2V0ZWRcbiAgICovXG4gIHJlYWRvbmx5IG5hbWU6IHN0cmluZ1xuXG4gIC8qKlxuICAgKiBBbiBJTlRFUk5BTCByZWZlcmVuY2UgdG8gYW4gaWNvbiB3aGljaCBpcyBhc3NvY2lhdGVkIHdpdGggdGhpcyBzb3VyY2UuXG4gICAqIFRoaXMgSWNvbiBzaG91bGQgaWRlYWxseSBiZSBhIG1hdGNoaW5nIGFzcGVjdCByYXRpbyAoYSBjdWJlKVxuICAgKiBUaGUgbG9jYXRpb24gb2YgdGhpcyBzaG91bGQgYmUgaW4gYW4gaW5jbHVkZXMgZGlyZWN0b3J5IG5leHQgdG8geW91ciBzb3VyY2UuXG4gICAqIEZvciBleGFtcGxlLCB0aGUgUGFwZXJiYWNrIGxpbmsgc2l0cyBhdDogc291cmNlcy9QYXBlcmJhY2svc3RhdGljL2ljb24ucG5nXG4gICAqIFRoaXMge0BsaW5rIFNvdXJjZS5pY29ufSBmaWVsZCB3b3VsZCB0aGVuIGJlIHNpbXBseSByZWZlcmVuY2VkIGFzICdpY29uLnBuZycgYW5kXG4gICAqIHRoZSBwYXRoIHdpbGwgdGhlbiByZXNvbHZlIGNvcnJlY3RseSBpbnRlcm5hbGx5XG4gICAqL1xuICByZWFkb25seSBpY29uOiBzdHJpbmdcblxuICAvKipcbiAgICogQSBicmllZiBkZXNjcmlwdGlvbiBvZiB3aGF0IHRoaXMgc291cmNlIHRhcmdldHMuIFRoaXMgaXMgYWRkaXRpb25hbCBjb250ZW50IGRpc3BsYXllZCB0byB0aGUgdXNlciB3aGVuXG4gICAqIGJyb3dzaW5nIHNvdXJjZXMuXG4gICAqIFdoYXQgd2Vic2l0ZSBkb2VzIGl0IHRhcmdldD8gV2hhdCBmZWF0dXJlcyBhcmUgd29ya2luZz8gRXRjLlxuICAgKi9cbiAgcmVhZG9ubHkgZGVzY3JpcHRpb246IHN0cmluZ1xuXG4gIC8qKlxuICAgKiBBIGNvbnRlbnQgcmF0aW5nIGF0dHJpYnV0ZWQgdG8gZWFjaCBzb3VyY2UuIFRoaXMgY2FuIGJlIG9uZSBvZiB0aHJlZSB2YWx1ZXMsIGFuZCBzaG91bGQgYmUgc2V0IGFwcHJvcHJpYXRlbHkuXG4gICAqIEV2ZXJ5b25lOiBUaGlzIHNvdXJjZSBkb2VzIG5vdCBoYXZlIGFueSBzb3J0IG9mIGFkdWx0IGNvbnRlbnQgYXZhaWxhYmxlLiBFYWNoIHRpdGxlIHdpdGhpbiBpcyBhc3N1bWVkIHNhZmUgZm9yIGFsbCBhdWRpZW5jZXNcbiAgICogTWF0dXJlOiBUaGlzIHNvdXJjZSBNQVkgaGF2ZSBtYXR1cmUgY29udGVudCBpbnNpZGUgb2YgaXQuIEV2ZW4gaWYgbW9zdCBjb250ZW50IGlzIHNhZmUsIG1hdHVyZSBzaG91bGQgYmUgc2VsZWN0ZWQgZXZlbiBpZiBhIHNtYWxsIHN1YnNldCBhcHBsaWVzXG4gICAqIEFkdWx0OiBUaGlzIHNvdXJjZSBwcm9iYWJseSBoYXMgc3RyYWlnaHQgdXAgcG9ybm9ncmFwaHkgYXZhaWxhYmxlLlxuICAgKlxuICAgKiBUaGlzIHJhdGluZyBoZWxwcyB1cyBmaWx0ZXIgeW91ciBzb3VyY2UgdG8gdXNlcnMgd2hvIGhhdmUgdGhlIG5lY2Vzc2FyeSB2aXNpYmlsaXR5IHJ1bGVzIHRvZ2dsZWQgZm9yIHRoZWlyIHByb2ZpbGUuXG4gICAqIE5hdHVyYWxseSwgb25seSAnRXZlcnlvbmUnIHNvdXJjZXMgd2lsbCBzaG93IHVwIGZvciB1c2VycyB3aXRob3V0IGFuIGFjY291bnQsIG9yIHdpdGhvdXQgYW55IG1vZGUgdG9nZ2xlcyBjaGFuZ2VkLlxuICAgKi9cbiAgcmVhZG9ubHkgY29udGVudFJhdGluZzogQ29udGVudFJhdGluZ1xuXG4gIC8qKlxuICAgKiBUaGUgYXV0aG9yIG9mIHRoaXMgc291cmNlLiBUaGUgc3RyaW5nIGhlcmUgd2lsbCBiZSBzaG93biBvZmYgdG8gdGhlIHB1YmxpYyBvbiB0aGUgYXBwbGljYXRpb25cbiAgICogaW50ZXJmYWNlLCBzbyBvbmx5IHdyaXRlIHdoYXQgeW91J3JlIGNvbWZvcnRhYmxlIHdpdGggc2hvd2luZ1xuICAgKi9cbiAgcmVhZG9ubHkgZGV2ZWxvcGVyczogU291cmNlRGV2ZWxvcGVyW11cblxuICAvKipcbiAgICogQW4gb3B0aW9uYWwgZmllbGQgdGhhdCBkZWZpbmVzIHRoZSBsYW5ndWFnZSBvZiB0aGUgZXh0ZW5zaW9uJ3Mgc291cmNlXG4gICAqL1xuICByZWFkb25seSBsYW5ndWFnZT86IHN0cmluZ1xuXG4gIC8qKlxuICAgKiBMaXR0bGUgYml0cyBvZiBtZXRhZGF0YSB3aGljaCBpcyByZW5kZXJlZCBvbiB0aGUgd2Vic2l0ZVxuICAgKiB1bmRlciB5b3VyIHJlcG9zaXRvcmllcyBzZWN0aW9uXG4gICAqL1xuICByZWFkb25seSBiYWRnZXM6IFNvdXJjZUJhZGdlW11cblxuICByZWFkb25seSBjYXBhYmlsaXRpZXM6IFNvdXJjZUludGVudHNbXSB8IFNvdXJjZUludGVudHNcbn1cbiIsICJ2YXIgX19kZWZQcm9wID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xudmFyIF9fbmFtZSA9ICh0YXJnZXQsIHZhbHVlKSA9PiBfX2RlZlByb3AodGFyZ2V0LCBcIm5hbWVcIiwgeyB2YWx1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0pO1xudmFyIF9fZXhwb3J0ID0gKHRhcmdldCwgYWxsKSA9PiB7XG4gIGZvciAodmFyIG5hbWUgaW4gYWxsKVxuICAgIF9fZGVmUHJvcCh0YXJnZXQsIG5hbWUsIHsgZ2V0OiBhbGxbbmFtZV0sIGVudW1lcmFibGU6IHRydWUgfSk7XG59O1xuXG4vLyBsaWIvY2hhaS91dGlscy9pbmRleC5qc1xudmFyIHV0aWxzX2V4cG9ydHMgPSB7fTtcbl9fZXhwb3J0KHV0aWxzX2V4cG9ydHMsIHtcbiAgYWRkQ2hhaW5hYmxlTWV0aG9kOiAoKSA9PiBhZGRDaGFpbmFibGVNZXRob2QsXG4gIGFkZExlbmd0aEd1YXJkOiAoKSA9PiBhZGRMZW5ndGhHdWFyZCxcbiAgYWRkTWV0aG9kOiAoKSA9PiBhZGRNZXRob2QsXG4gIGFkZFByb3BlcnR5OiAoKSA9PiBhZGRQcm9wZXJ0eSxcbiAgY2hlY2tFcnJvcjogKCkgPT4gY2hlY2tfZXJyb3JfZXhwb3J0cyxcbiAgY29tcGFyZUJ5SW5zcGVjdDogKCkgPT4gY29tcGFyZUJ5SW5zcGVjdCxcbiAgZXFsOiAoKSA9PiBkZWVwX2VxbF9kZWZhdWx0LFxuICBleHBlY3RUeXBlczogKCkgPT4gZXhwZWN0VHlwZXMsXG4gIGZsYWc6ICgpID0+IGZsYWcsXG4gIGdldEFjdHVhbDogKCkgPT4gZ2V0QWN0dWFsLFxuICBnZXRNZXNzYWdlOiAoKSA9PiBnZXRNZXNzYWdlMixcbiAgZ2V0TmFtZTogKCkgPT4gZ2V0TmFtZSxcbiAgZ2V0T3BlcmF0b3I6ICgpID0+IGdldE9wZXJhdG9yLFxuICBnZXRPd25FbnVtZXJhYmxlUHJvcGVydGllczogKCkgPT4gZ2V0T3duRW51bWVyYWJsZVByb3BlcnRpZXMsXG4gIGdldE93bkVudW1lcmFibGVQcm9wZXJ0eVN5bWJvbHM6ICgpID0+IGdldE93bkVudW1lcmFibGVQcm9wZXJ0eVN5bWJvbHMsXG4gIGdldFBhdGhJbmZvOiAoKSA9PiBnZXRQYXRoSW5mbyxcbiAgaGFzUHJvcGVydHk6ICgpID0+IGhhc1Byb3BlcnR5LFxuICBpbnNwZWN0OiAoKSA9PiBpbnNwZWN0MixcbiAgaXNOYU46ICgpID0+IGlzTmFOMixcbiAgaXNOdW1lcmljOiAoKSA9PiBpc051bWVyaWMsXG4gIGlzUHJveHlFbmFibGVkOiAoKSA9PiBpc1Byb3h5RW5hYmxlZCxcbiAgaXNSZWdFeHA6ICgpID0+IGlzUmVnRXhwMixcbiAgb2JqRGlzcGxheTogKCkgPT4gb2JqRGlzcGxheSxcbiAgb3ZlcndyaXRlQ2hhaW5hYmxlTWV0aG9kOiAoKSA9PiBvdmVyd3JpdGVDaGFpbmFibGVNZXRob2QsXG4gIG92ZXJ3cml0ZU1ldGhvZDogKCkgPT4gb3ZlcndyaXRlTWV0aG9kLFxuICBvdmVyd3JpdGVQcm9wZXJ0eTogKCkgPT4gb3ZlcndyaXRlUHJvcGVydHksXG4gIHByb3hpZnk6ICgpID0+IHByb3hpZnksXG4gIHRlc3Q6ICgpID0+IHRlc3QsXG4gIHRyYW5zZmVyRmxhZ3M6ICgpID0+IHRyYW5zZmVyRmxhZ3MsXG4gIHR5cGU6ICgpID0+IHR5cGVcbn0pO1xuXG4vLyBub2RlX21vZHVsZXMvY2hlY2stZXJyb3IvaW5kZXguanNcbnZhciBjaGVja19lcnJvcl9leHBvcnRzID0ge307XG5fX2V4cG9ydChjaGVja19lcnJvcl9leHBvcnRzLCB7XG4gIGNvbXBhdGlibGVDb25zdHJ1Y3RvcjogKCkgPT4gY29tcGF0aWJsZUNvbnN0cnVjdG9yLFxuICBjb21wYXRpYmxlSW5zdGFuY2U6ICgpID0+IGNvbXBhdGlibGVJbnN0YW5jZSxcbiAgY29tcGF0aWJsZU1lc3NhZ2U6ICgpID0+IGNvbXBhdGlibGVNZXNzYWdlLFxuICBnZXRDb25zdHJ1Y3Rvck5hbWU6ICgpID0+IGdldENvbnN0cnVjdG9yTmFtZSxcbiAgZ2V0TWVzc2FnZTogKCkgPT4gZ2V0TWVzc2FnZVxufSk7XG5mdW5jdGlvbiBpc0Vycm9ySW5zdGFuY2Uob2JqKSB7XG4gIHJldHVybiBvYmogaW5zdGFuY2VvZiBFcnJvciB8fCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gXCJbb2JqZWN0IEVycm9yXVwiO1xufVxuX19uYW1lKGlzRXJyb3JJbnN0YW5jZSwgXCJpc0Vycm9ySW5zdGFuY2VcIik7XG5mdW5jdGlvbiBpc1JlZ0V4cChvYmopIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSBcIltvYmplY3QgUmVnRXhwXVwiO1xufVxuX19uYW1lKGlzUmVnRXhwLCBcImlzUmVnRXhwXCIpO1xuZnVuY3Rpb24gY29tcGF0aWJsZUluc3RhbmNlKHRocm93biwgZXJyb3JMaWtlKSB7XG4gIHJldHVybiBpc0Vycm9ySW5zdGFuY2UoZXJyb3JMaWtlKSAmJiB0aHJvd24gPT09IGVycm9yTGlrZTtcbn1cbl9fbmFtZShjb21wYXRpYmxlSW5zdGFuY2UsIFwiY29tcGF0aWJsZUluc3RhbmNlXCIpO1xuZnVuY3Rpb24gY29tcGF0aWJsZUNvbnN0cnVjdG9yKHRocm93biwgZXJyb3JMaWtlKSB7XG4gIGlmIChpc0Vycm9ySW5zdGFuY2UoZXJyb3JMaWtlKSkge1xuICAgIHJldHVybiB0aHJvd24uY29uc3RydWN0b3IgPT09IGVycm9yTGlrZS5jb25zdHJ1Y3RvciB8fCB0aHJvd24gaW5zdGFuY2VvZiBlcnJvckxpa2UuY29uc3RydWN0b3I7XG4gIH0gZWxzZSBpZiAoKHR5cGVvZiBlcnJvckxpa2UgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGVycm9yTGlrZSA9PT0gXCJmdW5jdGlvblwiKSAmJiBlcnJvckxpa2UucHJvdG90eXBlKSB7XG4gICAgcmV0dXJuIHRocm93bi5jb25zdHJ1Y3RvciA9PT0gZXJyb3JMaWtlIHx8IHRocm93biBpbnN0YW5jZW9mIGVycm9yTGlrZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5fX25hbWUoY29tcGF0aWJsZUNvbnN0cnVjdG9yLCBcImNvbXBhdGlibGVDb25zdHJ1Y3RvclwiKTtcbmZ1bmN0aW9uIGNvbXBhdGlibGVNZXNzYWdlKHRocm93biwgZXJyTWF0Y2hlcikge1xuICBjb25zdCBjb21wYXJpc29uU3RyaW5nID0gdHlwZW9mIHRocm93biA9PT0gXCJzdHJpbmdcIiA/IHRocm93biA6IHRocm93bi5tZXNzYWdlO1xuICBpZiAoaXNSZWdFeHAoZXJyTWF0Y2hlcikpIHtcbiAgICByZXR1cm4gZXJyTWF0Y2hlci50ZXN0KGNvbXBhcmlzb25TdHJpbmcpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBlcnJNYXRjaGVyID09PSBcInN0cmluZ1wiKSB7XG4gICAgcmV0dXJuIGNvbXBhcmlzb25TdHJpbmcuaW5kZXhPZihlcnJNYXRjaGVyKSAhPT0gLTE7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuX19uYW1lKGNvbXBhdGlibGVNZXNzYWdlLCBcImNvbXBhdGlibGVNZXNzYWdlXCIpO1xuZnVuY3Rpb24gZ2V0Q29uc3RydWN0b3JOYW1lKGVycm9yTGlrZSkge1xuICBsZXQgY29uc3RydWN0b3JOYW1lID0gZXJyb3JMaWtlO1xuICBpZiAoaXNFcnJvckluc3RhbmNlKGVycm9yTGlrZSkpIHtcbiAgICBjb25zdHJ1Y3Rvck5hbWUgPSBlcnJvckxpa2UuY29uc3RydWN0b3IubmFtZTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZXJyb3JMaWtlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBjb25zdHJ1Y3Rvck5hbWUgPSBlcnJvckxpa2UubmFtZTtcbiAgICBpZiAoY29uc3RydWN0b3JOYW1lID09PSBcIlwiKSB7XG4gICAgICBjb25zdCBuZXdDb25zdHJ1Y3Rvck5hbWUgPSBuZXcgZXJyb3JMaWtlKCkubmFtZTtcbiAgICAgIGNvbnN0cnVjdG9yTmFtZSA9IG5ld0NvbnN0cnVjdG9yTmFtZSB8fCBjb25zdHJ1Y3Rvck5hbWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBjb25zdHJ1Y3Rvck5hbWU7XG59XG5fX25hbWUoZ2V0Q29uc3RydWN0b3JOYW1lLCBcImdldENvbnN0cnVjdG9yTmFtZVwiKTtcbmZ1bmN0aW9uIGdldE1lc3NhZ2UoZXJyb3JMaWtlKSB7XG4gIGxldCBtc2cgPSBcIlwiO1xuICBpZiAoZXJyb3JMaWtlICYmIGVycm9yTGlrZS5tZXNzYWdlKSB7XG4gICAgbXNnID0gZXJyb3JMaWtlLm1lc3NhZ2U7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGVycm9yTGlrZSA9PT0gXCJzdHJpbmdcIikge1xuICAgIG1zZyA9IGVycm9yTGlrZTtcbiAgfVxuICByZXR1cm4gbXNnO1xufVxuX19uYW1lKGdldE1lc3NhZ2UsIFwiZ2V0TWVzc2FnZVwiKTtcblxuLy8gbGliL2NoYWkvdXRpbHMvZmxhZy5qc1xuZnVuY3Rpb24gZmxhZyhvYmosIGtleSwgdmFsdWUpIHtcbiAgbGV0IGZsYWdzID0gb2JqLl9fZmxhZ3MgfHwgKG9iai5fX2ZsYWdzID0gLyogQF9fUFVSRV9fICovIE9iamVjdC5jcmVhdGUobnVsbCkpO1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMykge1xuICAgIGZsYWdzW2tleV0gPSB2YWx1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmxhZ3Nba2V5XTtcbiAgfVxufVxuX19uYW1lKGZsYWcsIFwiZmxhZ1wiKTtcblxuLy8gbGliL2NoYWkvdXRpbHMvdGVzdC5qc1xuZnVuY3Rpb24gdGVzdChvYmosIGFyZ3MpIHtcbiAgbGV0IG5lZ2F0ZSA9IGZsYWcob2JqLCBcIm5lZ2F0ZVwiKSwgZXhwciA9IGFyZ3NbMF07XG4gIHJldHVybiBuZWdhdGUgPyAhZXhwciA6IGV4cHI7XG59XG5fX25hbWUodGVzdCwgXCJ0ZXN0XCIpO1xuXG4vLyBsaWIvY2hhaS91dGlscy90eXBlLWRldGVjdC5qc1xuZnVuY3Rpb24gdHlwZShvYmopIHtcbiAgaWYgKHR5cGVvZiBvYmogPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4gXCJ1bmRlZmluZWRcIjtcbiAgfVxuICBpZiAob2JqID09PSBudWxsKSB7XG4gICAgcmV0dXJuIFwibnVsbFwiO1xuICB9XG4gIGNvbnN0IHN0cmluZ1RhZyA9IG9ialtTeW1ib2wudG9TdHJpbmdUYWddO1xuICBpZiAodHlwZW9mIHN0cmluZ1RhZyA9PT0gXCJzdHJpbmdcIikge1xuICAgIHJldHVybiBzdHJpbmdUYWc7XG4gIH1cbiAgY29uc3QgdHlwZTMgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKS5zbGljZSg4LCAtMSk7XG4gIHJldHVybiB0eXBlMztcbn1cbl9fbmFtZSh0eXBlLCBcInR5cGVcIik7XG5cbi8vIG5vZGVfbW9kdWxlcy9hc3NlcnRpb24tZXJyb3IvaW5kZXguanNcbnZhciBjYW5FbGlkZUZyYW1lcyA9IFwiY2FwdHVyZVN0YWNrVHJhY2VcIiBpbiBFcnJvcjtcbnZhciBBc3NlcnRpb25FcnJvciA9IGNsYXNzIF9Bc3NlcnRpb25FcnJvciBleHRlbmRzIEVycm9yIHtcbiAgc3RhdGljIHtcbiAgICBfX25hbWUodGhpcywgXCJBc3NlcnRpb25FcnJvclwiKTtcbiAgfVxuICBtZXNzYWdlO1xuICBnZXQgbmFtZSgpIHtcbiAgICByZXR1cm4gXCJBc3NlcnRpb25FcnJvclwiO1xuICB9XG4gIGdldCBvaygpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgY29uc3RydWN0b3IobWVzc2FnZSA9IFwiVW5zcGVjaWZpZWQgQXNzZXJ0aW9uRXJyb3JcIiwgcHJvcHMsIHNzZikge1xuICAgIHN1cGVyKG1lc3NhZ2UpO1xuICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgaWYgKGNhbkVsaWRlRnJhbWVzKSB7XG4gICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCBzc2YgfHwgX0Fzc2VydGlvbkVycm9yKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBrZXkgaW4gcHJvcHMpIHtcbiAgICAgIGlmICghKGtleSBpbiB0aGlzKSkge1xuICAgICAgICB0aGlzW2tleV0gPSBwcm9wc1trZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICB0b0pTT04oc3RhY2spIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4udGhpcyxcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgIG1lc3NhZ2U6IHRoaXMubWVzc2FnZSxcbiAgICAgIG9rOiBmYWxzZSxcbiAgICAgIHN0YWNrOiBzdGFjayAhPT0gZmFsc2UgPyB0aGlzLnN0YWNrIDogdm9pZCAwXG4gICAgfTtcbiAgfVxufTtcblxuLy8gbGliL2NoYWkvdXRpbHMvZXhwZWN0VHlwZXMuanNcbmZ1bmN0aW9uIGV4cGVjdFR5cGVzKG9iaiwgdHlwZXMpIHtcbiAgbGV0IGZsYWdNc2cgPSBmbGFnKG9iaiwgXCJtZXNzYWdlXCIpO1xuICBsZXQgc3NmaSA9IGZsYWcob2JqLCBcInNzZmlcIik7XG4gIGZsYWdNc2cgPSBmbGFnTXNnID8gZmxhZ01zZyArIFwiOiBcIiA6IFwiXCI7XG4gIG9iaiA9IGZsYWcob2JqLCBcIm9iamVjdFwiKTtcbiAgdHlwZXMgPSB0eXBlcy5tYXAoZnVuY3Rpb24odCkge1xuICAgIHJldHVybiB0LnRvTG93ZXJDYXNlKCk7XG4gIH0pO1xuICB0eXBlcy5zb3J0KCk7XG4gIGxldCBzdHIgPSB0eXBlcy5tYXAoZnVuY3Rpb24odCwgaW5kZXgpIHtcbiAgICBsZXQgYXJ0ID0gfltcImFcIiwgXCJlXCIsIFwiaVwiLCBcIm9cIiwgXCJ1XCJdLmluZGV4T2YodC5jaGFyQXQoMCkpID8gXCJhblwiIDogXCJhXCI7XG4gICAgbGV0IG9yID0gdHlwZXMubGVuZ3RoID4gMSAmJiBpbmRleCA9PT0gdHlwZXMubGVuZ3RoIC0gMSA/IFwib3IgXCIgOiBcIlwiO1xuICAgIHJldHVybiBvciArIGFydCArIFwiIFwiICsgdDtcbiAgfSkuam9pbihcIiwgXCIpO1xuICBsZXQgb2JqVHlwZSA9IHR5cGUob2JqKS50b0xvd2VyQ2FzZSgpO1xuICBpZiAoIXR5cGVzLnNvbWUoZnVuY3Rpb24oZXhwZWN0ZWQpIHtcbiAgICByZXR1cm4gb2JqVHlwZSA9PT0gZXhwZWN0ZWQ7XG4gIH0pKSB7XG4gICAgdGhyb3cgbmV3IEFzc2VydGlvbkVycm9yKFxuICAgICAgZmxhZ01zZyArIFwib2JqZWN0IHRlc3RlZCBtdXN0IGJlIFwiICsgc3RyICsgXCIsIGJ1dCBcIiArIG9ialR5cGUgKyBcIiBnaXZlblwiLFxuICAgICAgdm9pZCAwLFxuICAgICAgc3NmaVxuICAgICk7XG4gIH1cbn1cbl9fbmFtZShleHBlY3RUeXBlcywgXCJleHBlY3RUeXBlc1wiKTtcblxuLy8gbGliL2NoYWkvdXRpbHMvZ2V0QWN0dWFsLmpzXG5mdW5jdGlvbiBnZXRBY3R1YWwob2JqLCBhcmdzKSB7XG4gIHJldHVybiBhcmdzLmxlbmd0aCA+IDQgPyBhcmdzWzRdIDogb2JqLl9vYmo7XG59XG5fX25hbWUoZ2V0QWN0dWFsLCBcImdldEFjdHVhbFwiKTtcblxuLy8gbm9kZV9tb2R1bGVzL2xvdXBlL2xpYi9oZWxwZXJzLmpzXG52YXIgYW5zaUNvbG9ycyA9IHtcbiAgYm9sZDogW1wiMVwiLCBcIjIyXCJdLFxuICBkaW06IFtcIjJcIiwgXCIyMlwiXSxcbiAgaXRhbGljOiBbXCIzXCIsIFwiMjNcIl0sXG4gIHVuZGVybGluZTogW1wiNFwiLCBcIjI0XCJdLFxuICAvLyA1ICYgNiBhcmUgYmxpbmtpbmdcbiAgaW52ZXJzZTogW1wiN1wiLCBcIjI3XCJdLFxuICBoaWRkZW46IFtcIjhcIiwgXCIyOFwiXSxcbiAgc3RyaWtlOiBbXCI5XCIsIFwiMjlcIl0sXG4gIC8vIDEwLTIwIGFyZSBmb250c1xuICAvLyAyMS0yOSBhcmUgcmVzZXRzIGZvciAxLTlcbiAgYmxhY2s6IFtcIjMwXCIsIFwiMzlcIl0sXG4gIHJlZDogW1wiMzFcIiwgXCIzOVwiXSxcbiAgZ3JlZW46IFtcIjMyXCIsIFwiMzlcIl0sXG4gIHllbGxvdzogW1wiMzNcIiwgXCIzOVwiXSxcbiAgYmx1ZTogW1wiMzRcIiwgXCIzOVwiXSxcbiAgbWFnZW50YTogW1wiMzVcIiwgXCIzOVwiXSxcbiAgY3lhbjogW1wiMzZcIiwgXCIzOVwiXSxcbiAgd2hpdGU6IFtcIjM3XCIsIFwiMzlcIl0sXG4gIGJyaWdodGJsYWNrOiBbXCIzMDsxXCIsIFwiMzlcIl0sXG4gIGJyaWdodHJlZDogW1wiMzE7MVwiLCBcIjM5XCJdLFxuICBicmlnaHRncmVlbjogW1wiMzI7MVwiLCBcIjM5XCJdLFxuICBicmlnaHR5ZWxsb3c6IFtcIjMzOzFcIiwgXCIzOVwiXSxcbiAgYnJpZ2h0Ymx1ZTogW1wiMzQ7MVwiLCBcIjM5XCJdLFxuICBicmlnaHRtYWdlbnRhOiBbXCIzNTsxXCIsIFwiMzlcIl0sXG4gIGJyaWdodGN5YW46IFtcIjM2OzFcIiwgXCIzOVwiXSxcbiAgYnJpZ2h0d2hpdGU6IFtcIjM3OzFcIiwgXCIzOVwiXSxcbiAgZ3JleTogW1wiOTBcIiwgXCIzOVwiXVxufTtcbnZhciBzdHlsZXMgPSB7XG4gIHNwZWNpYWw6IFwiY3lhblwiLFxuICBudW1iZXI6IFwieWVsbG93XCIsXG4gIGJpZ2ludDogXCJ5ZWxsb3dcIixcbiAgYm9vbGVhbjogXCJ5ZWxsb3dcIixcbiAgdW5kZWZpbmVkOiBcImdyZXlcIixcbiAgbnVsbDogXCJib2xkXCIsXG4gIHN0cmluZzogXCJncmVlblwiLFxuICBzeW1ib2w6IFwiZ3JlZW5cIixcbiAgZGF0ZTogXCJtYWdlbnRhXCIsXG4gIHJlZ2V4cDogXCJyZWRcIlxufTtcbnZhciB0cnVuY2F0b3IgPSBcIlxcdTIwMjZcIjtcbmZ1bmN0aW9uIGNvbG9yaXNlKHZhbHVlLCBzdHlsZVR5cGUpIHtcbiAgY29uc3QgY29sb3IgPSBhbnNpQ29sb3JzW3N0eWxlc1tzdHlsZVR5cGVdXSB8fCBhbnNpQ29sb3JzW3N0eWxlVHlwZV0gfHwgXCJcIjtcbiAgaWYgKCFjb2xvcikge1xuICAgIHJldHVybiBTdHJpbmcodmFsdWUpO1xuICB9XG4gIHJldHVybiBgXFx4MUJbJHtjb2xvclswXX1tJHtTdHJpbmcodmFsdWUpfVxceDFCWyR7Y29sb3JbMV19bWA7XG59XG5fX25hbWUoY29sb3Jpc2UsIFwiY29sb3Jpc2VcIik7XG5mdW5jdGlvbiBub3JtYWxpc2VPcHRpb25zKHtcbiAgc2hvd0hpZGRlbiA9IGZhbHNlLFxuICBkZXB0aCA9IDIsXG4gIGNvbG9ycyA9IGZhbHNlLFxuICBjdXN0b21JbnNwZWN0ID0gdHJ1ZSxcbiAgc2hvd1Byb3h5ID0gZmFsc2UsXG4gIG1heEFycmF5TGVuZ3RoID0gSW5maW5pdHksXG4gIGJyZWFrTGVuZ3RoID0gSW5maW5pdHksXG4gIHNlZW4gPSBbXSxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNoYWRvd1xuICB0cnVuY2F0ZTogdHJ1bmNhdGUyID0gSW5maW5pdHksXG4gIHN0eWxpemUgPSBTdHJpbmdcbn0gPSB7fSwgaW5zcGVjdDMpIHtcbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICBzaG93SGlkZGVuOiBCb29sZWFuKHNob3dIaWRkZW4pLFxuICAgIGRlcHRoOiBOdW1iZXIoZGVwdGgpLFxuICAgIGNvbG9yczogQm9vbGVhbihjb2xvcnMpLFxuICAgIGN1c3RvbUluc3BlY3Q6IEJvb2xlYW4oY3VzdG9tSW5zcGVjdCksXG4gICAgc2hvd1Byb3h5OiBCb29sZWFuKHNob3dQcm94eSksXG4gICAgbWF4QXJyYXlMZW5ndGg6IE51bWJlcihtYXhBcnJheUxlbmd0aCksXG4gICAgYnJlYWtMZW5ndGg6IE51bWJlcihicmVha0xlbmd0aCksXG4gICAgdHJ1bmNhdGU6IE51bWJlcih0cnVuY2F0ZTIpLFxuICAgIHNlZW4sXG4gICAgaW5zcGVjdDogaW5zcGVjdDMsXG4gICAgc3R5bGl6ZVxuICB9O1xuICBpZiAob3B0aW9ucy5jb2xvcnMpIHtcbiAgICBvcHRpb25zLnN0eWxpemUgPSBjb2xvcmlzZTtcbiAgfVxuICByZXR1cm4gb3B0aW9ucztcbn1cbl9fbmFtZShub3JtYWxpc2VPcHRpb25zLCBcIm5vcm1hbGlzZU9wdGlvbnNcIik7XG5mdW5jdGlvbiBpc0hpZ2hTdXJyb2dhdGUoY2hhcikge1xuICByZXR1cm4gY2hhciA+PSBcIlxcdUQ4MDBcIiAmJiBjaGFyIDw9IFwiXFx1REJGRlwiO1xufVxuX19uYW1lKGlzSGlnaFN1cnJvZ2F0ZSwgXCJpc0hpZ2hTdXJyb2dhdGVcIik7XG5mdW5jdGlvbiB0cnVuY2F0ZShzdHJpbmcsIGxlbmd0aCwgdGFpbCA9IHRydW5jYXRvcikge1xuICBzdHJpbmcgPSBTdHJpbmcoc3RyaW5nKTtcbiAgY29uc3QgdGFpbExlbmd0aCA9IHRhaWwubGVuZ3RoO1xuICBjb25zdCBzdHJpbmdMZW5ndGggPSBzdHJpbmcubGVuZ3RoO1xuICBpZiAodGFpbExlbmd0aCA+IGxlbmd0aCAmJiBzdHJpbmdMZW5ndGggPiB0YWlsTGVuZ3RoKSB7XG4gICAgcmV0dXJuIHRhaWw7XG4gIH1cbiAgaWYgKHN0cmluZ0xlbmd0aCA+IGxlbmd0aCAmJiBzdHJpbmdMZW5ndGggPiB0YWlsTGVuZ3RoKSB7XG4gICAgbGV0IGVuZCA9IGxlbmd0aCAtIHRhaWxMZW5ndGg7XG4gICAgaWYgKGVuZCA+IDAgJiYgaXNIaWdoU3Vycm9nYXRlKHN0cmluZ1tlbmQgLSAxXSkpIHtcbiAgICAgIGVuZCA9IGVuZCAtIDE7XG4gICAgfVxuICAgIHJldHVybiBgJHtzdHJpbmcuc2xpY2UoMCwgZW5kKX0ke3RhaWx9YDtcbiAgfVxuICByZXR1cm4gc3RyaW5nO1xufVxuX19uYW1lKHRydW5jYXRlLCBcInRydW5jYXRlXCIpO1xuZnVuY3Rpb24gaW5zcGVjdExpc3QobGlzdCwgb3B0aW9ucywgaW5zcGVjdEl0ZW0sIHNlcGFyYXRvciA9IFwiLCBcIikge1xuICBpbnNwZWN0SXRlbSA9IGluc3BlY3RJdGVtIHx8IG9wdGlvbnMuaW5zcGVjdDtcbiAgY29uc3Qgc2l6ZSA9IGxpc3QubGVuZ3RoO1xuICBpZiAoc2l6ZSA9PT0gMClcbiAgICByZXR1cm4gXCJcIjtcbiAgY29uc3Qgb3JpZ2luYWxMZW5ndGggPSBvcHRpb25zLnRydW5jYXRlO1xuICBsZXQgb3V0cHV0ID0gXCJcIjtcbiAgbGV0IHBlZWsgPSBcIlwiO1xuICBsZXQgdHJ1bmNhdGVkID0gXCJcIjtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpICs9IDEpIHtcbiAgICBjb25zdCBsYXN0ID0gaSArIDEgPT09IGxpc3QubGVuZ3RoO1xuICAgIGNvbnN0IHNlY29uZFRvTGFzdCA9IGkgKyAyID09PSBsaXN0Lmxlbmd0aDtcbiAgICB0cnVuY2F0ZWQgPSBgJHt0cnVuY2F0b3J9KCR7bGlzdC5sZW5ndGggLSBpfSlgO1xuICAgIGNvbnN0IHZhbHVlID0gbGlzdFtpXTtcbiAgICBvcHRpb25zLnRydW5jYXRlID0gb3JpZ2luYWxMZW5ndGggLSBvdXRwdXQubGVuZ3RoIC0gKGxhc3QgPyAwIDogc2VwYXJhdG9yLmxlbmd0aCk7XG4gICAgY29uc3Qgc3RyaW5nID0gcGVlayB8fCBpbnNwZWN0SXRlbSh2YWx1ZSwgb3B0aW9ucykgKyAobGFzdCA/IFwiXCIgOiBzZXBhcmF0b3IpO1xuICAgIGNvbnN0IG5leHRMZW5ndGggPSBvdXRwdXQubGVuZ3RoICsgc3RyaW5nLmxlbmd0aDtcbiAgICBjb25zdCB0cnVuY2F0ZWRMZW5ndGggPSBuZXh0TGVuZ3RoICsgdHJ1bmNhdGVkLmxlbmd0aDtcbiAgICBpZiAobGFzdCAmJiBuZXh0TGVuZ3RoID4gb3JpZ2luYWxMZW5ndGggJiYgb3V0cHV0Lmxlbmd0aCArIHRydW5jYXRlZC5sZW5ndGggPD0gb3JpZ2luYWxMZW5ndGgpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAoIWxhc3QgJiYgIXNlY29uZFRvTGFzdCAmJiB0cnVuY2F0ZWRMZW5ndGggPiBvcmlnaW5hbExlbmd0aCkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHBlZWsgPSBsYXN0ID8gXCJcIiA6IGluc3BlY3RJdGVtKGxpc3RbaSArIDFdLCBvcHRpb25zKSArIChzZWNvbmRUb0xhc3QgPyBcIlwiIDogc2VwYXJhdG9yKTtcbiAgICBpZiAoIWxhc3QgJiYgc2Vjb25kVG9MYXN0ICYmIHRydW5jYXRlZExlbmd0aCA+IG9yaWdpbmFsTGVuZ3RoICYmIG5leHRMZW5ndGggKyBwZWVrLmxlbmd0aCA+IG9yaWdpbmFsTGVuZ3RoKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgb3V0cHV0ICs9IHN0cmluZztcbiAgICBpZiAoIWxhc3QgJiYgIXNlY29uZFRvTGFzdCAmJiBuZXh0TGVuZ3RoICsgcGVlay5sZW5ndGggPj0gb3JpZ2luYWxMZW5ndGgpIHtcbiAgICAgIHRydW5jYXRlZCA9IGAke3RydW5jYXRvcn0oJHtsaXN0Lmxlbmd0aCAtIGkgLSAxfSlgO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHRydW5jYXRlZCA9IFwiXCI7XG4gIH1cbiAgcmV0dXJuIGAke291dHB1dH0ke3RydW5jYXRlZH1gO1xufVxuX19uYW1lKGluc3BlY3RMaXN0LCBcImluc3BlY3RMaXN0XCIpO1xuZnVuY3Rpb24gcXVvdGVDb21wbGV4S2V5KGtleSkge1xuICBpZiAoa2V5Lm1hdGNoKC9eW2EtekEtWl9dW2EtekEtWl8wLTldKiQvKSkge1xuICAgIHJldHVybiBrZXk7XG4gIH1cbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGtleSkucmVwbGFjZSgvJy9nLCBcIlxcXFwnXCIpLnJlcGxhY2UoL1xcXFxcIi9nLCAnXCInKS5yZXBsYWNlKC8oXlwifFwiJCkvZywgXCInXCIpO1xufVxuX19uYW1lKHF1b3RlQ29tcGxleEtleSwgXCJxdW90ZUNvbXBsZXhLZXlcIik7XG5mdW5jdGlvbiBpbnNwZWN0UHJvcGVydHkoW2tleSwgdmFsdWVdLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMudHJ1bmNhdGUgLT0gMjtcbiAgaWYgKHR5cGVvZiBrZXkgPT09IFwic3RyaW5nXCIpIHtcbiAgICBrZXkgPSBxdW90ZUNvbXBsZXhLZXkoa2V5KTtcbiAgfSBlbHNlIGlmICh0eXBlb2Yga2V5ICE9PSBcIm51bWJlclwiKSB7XG4gICAga2V5ID0gYFske29wdGlvbnMuaW5zcGVjdChrZXksIG9wdGlvbnMpfV1gO1xuICB9XG4gIG9wdGlvbnMudHJ1bmNhdGUgLT0ga2V5Lmxlbmd0aDtcbiAgdmFsdWUgPSBvcHRpb25zLmluc3BlY3QodmFsdWUsIG9wdGlvbnMpO1xuICByZXR1cm4gYCR7a2V5fTogJHt2YWx1ZX1gO1xufVxuX19uYW1lKGluc3BlY3RQcm9wZXJ0eSwgXCJpbnNwZWN0UHJvcGVydHlcIik7XG5cbi8vIG5vZGVfbW9kdWxlcy9sb3VwZS9saWIvYXJyYXkuanNcbmZ1bmN0aW9uIGluc3BlY3RBcnJheShhcnJheSwgb3B0aW9ucykge1xuICBjb25zdCBub25JbmRleFByb3BlcnRpZXMgPSBPYmplY3Qua2V5cyhhcnJheSkuc2xpY2UoYXJyYXkubGVuZ3RoKTtcbiAgaWYgKCFhcnJheS5sZW5ndGggJiYgIW5vbkluZGV4UHJvcGVydGllcy5sZW5ndGgpXG4gICAgcmV0dXJuIFwiW11cIjtcbiAgb3B0aW9ucy50cnVuY2F0ZSAtPSA0O1xuICBjb25zdCBsaXN0Q29udGVudHMgPSBpbnNwZWN0TGlzdChhcnJheSwgb3B0aW9ucyk7XG4gIG9wdGlvbnMudHJ1bmNhdGUgLT0gbGlzdENvbnRlbnRzLmxlbmd0aDtcbiAgbGV0IHByb3BlcnR5Q29udGVudHMgPSBcIlwiO1xuICBpZiAobm9uSW5kZXhQcm9wZXJ0aWVzLmxlbmd0aCkge1xuICAgIHByb3BlcnR5Q29udGVudHMgPSBpbnNwZWN0TGlzdChub25JbmRleFByb3BlcnRpZXMubWFwKChrZXkpID0+IFtrZXksIGFycmF5W2tleV1dKSwgb3B0aW9ucywgaW5zcGVjdFByb3BlcnR5KTtcbiAgfVxuICByZXR1cm4gYFsgJHtsaXN0Q29udGVudHN9JHtwcm9wZXJ0eUNvbnRlbnRzID8gYCwgJHtwcm9wZXJ0eUNvbnRlbnRzfWAgOiBcIlwifSBdYDtcbn1cbl9fbmFtZShpbnNwZWN0QXJyYXksIFwiaW5zcGVjdEFycmF5XCIpO1xuXG4vLyBub2RlX21vZHVsZXMvbG91cGUvbGliL3R5cGVkYXJyYXkuanNcbnZhciBnZXRBcnJheU5hbWUgPSAvKiBAX19QVVJFX18gKi8gX19uYW1lKChhcnJheSkgPT4ge1xuICBpZiAodHlwZW9mIEJ1ZmZlciA9PT0gXCJmdW5jdGlvblwiICYmIGFycmF5IGluc3RhbmNlb2YgQnVmZmVyKSB7XG4gICAgcmV0dXJuIFwiQnVmZmVyXCI7XG4gIH1cbiAgaWYgKGFycmF5W1N5bWJvbC50b1N0cmluZ1RhZ10pIHtcbiAgICByZXR1cm4gYXJyYXlbU3ltYm9sLnRvU3RyaW5nVGFnXTtcbiAgfVxuICByZXR1cm4gYXJyYXkuY29uc3RydWN0b3IubmFtZTtcbn0sIFwiZ2V0QXJyYXlOYW1lXCIpO1xuZnVuY3Rpb24gaW5zcGVjdFR5cGVkQXJyYXkoYXJyYXksIG9wdGlvbnMpIHtcbiAgY29uc3QgbmFtZSA9IGdldEFycmF5TmFtZShhcnJheSk7XG4gIG9wdGlvbnMudHJ1bmNhdGUgLT0gbmFtZS5sZW5ndGggKyA0O1xuICBjb25zdCBub25JbmRleFByb3BlcnRpZXMgPSBPYmplY3Qua2V5cyhhcnJheSkuc2xpY2UoYXJyYXkubGVuZ3RoKTtcbiAgaWYgKCFhcnJheS5sZW5ndGggJiYgIW5vbkluZGV4UHJvcGVydGllcy5sZW5ndGgpXG4gICAgcmV0dXJuIGAke25hbWV9W11gO1xuICBsZXQgb3V0cHV0ID0gXCJcIjtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHN0cmluZyA9IGAke29wdGlvbnMuc3R5bGl6ZSh0cnVuY2F0ZShhcnJheVtpXSwgb3B0aW9ucy50cnVuY2F0ZSksIFwibnVtYmVyXCIpfSR7aSA9PT0gYXJyYXkubGVuZ3RoIC0gMSA/IFwiXCIgOiBcIiwgXCJ9YDtcbiAgICBvcHRpb25zLnRydW5jYXRlIC09IHN0cmluZy5sZW5ndGg7XG4gICAgaWYgKGFycmF5W2ldICE9PSBhcnJheS5sZW5ndGggJiYgb3B0aW9ucy50cnVuY2F0ZSA8PSAzKSB7XG4gICAgICBvdXRwdXQgKz0gYCR7dHJ1bmNhdG9yfSgke2FycmF5Lmxlbmd0aCAtIGFycmF5W2ldICsgMX0pYDtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBvdXRwdXQgKz0gc3RyaW5nO1xuICB9XG4gIGxldCBwcm9wZXJ0eUNvbnRlbnRzID0gXCJcIjtcbiAgaWYgKG5vbkluZGV4UHJvcGVydGllcy5sZW5ndGgpIHtcbiAgICBwcm9wZXJ0eUNvbnRlbnRzID0gaW5zcGVjdExpc3Qobm9uSW5kZXhQcm9wZXJ0aWVzLm1hcCgoa2V5KSA9PiBba2V5LCBhcnJheVtrZXldXSksIG9wdGlvbnMsIGluc3BlY3RQcm9wZXJ0eSk7XG4gIH1cbiAgcmV0dXJuIGAke25hbWV9WyAke291dHB1dH0ke3Byb3BlcnR5Q29udGVudHMgPyBgLCAke3Byb3BlcnR5Q29udGVudHN9YCA6IFwiXCJ9IF1gO1xufVxuX19uYW1lKGluc3BlY3RUeXBlZEFycmF5LCBcImluc3BlY3RUeXBlZEFycmF5XCIpO1xuXG4vLyBub2RlX21vZHVsZXMvbG91cGUvbGliL2RhdGUuanNcbmZ1bmN0aW9uIGluc3BlY3REYXRlKGRhdGVPYmplY3QsIG9wdGlvbnMpIHtcbiAgY29uc3Qgc3RyaW5nUmVwcmVzZW50YXRpb24gPSBkYXRlT2JqZWN0LnRvSlNPTigpO1xuICBpZiAoc3RyaW5nUmVwcmVzZW50YXRpb24gPT09IG51bGwpIHtcbiAgICByZXR1cm4gXCJJbnZhbGlkIERhdGVcIjtcbiAgfVxuICBjb25zdCBzcGxpdCA9IHN0cmluZ1JlcHJlc2VudGF0aW9uLnNwbGl0KFwiVFwiKTtcbiAgY29uc3QgZGF0ZSA9IHNwbGl0WzBdO1xuICByZXR1cm4gb3B0aW9ucy5zdHlsaXplKGAke2RhdGV9VCR7dHJ1bmNhdGUoc3BsaXRbMV0sIG9wdGlvbnMudHJ1bmNhdGUgLSBkYXRlLmxlbmd0aCAtIDEpfWAsIFwiZGF0ZVwiKTtcbn1cbl9fbmFtZShpbnNwZWN0RGF0ZSwgXCJpbnNwZWN0RGF0ZVwiKTtcblxuLy8gbm9kZV9tb2R1bGVzL2xvdXBlL2xpYi9mdW5jdGlvbi5qc1xuZnVuY3Rpb24gaW5zcGVjdEZ1bmN0aW9uKGZ1bmMsIG9wdGlvbnMpIHtcbiAgY29uc3QgZnVuY3Rpb25UeXBlID0gZnVuY1tTeW1ib2wudG9TdHJpbmdUYWddIHx8IFwiRnVuY3Rpb25cIjtcbiAgY29uc3QgbmFtZSA9IGZ1bmMubmFtZTtcbiAgaWYgKCFuYW1lKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMuc3R5bGl6ZShgWyR7ZnVuY3Rpb25UeXBlfV1gLCBcInNwZWNpYWxcIik7XG4gIH1cbiAgcmV0dXJuIG9wdGlvbnMuc3R5bGl6ZShgWyR7ZnVuY3Rpb25UeXBlfSAke3RydW5jYXRlKG5hbWUsIG9wdGlvbnMudHJ1bmNhdGUgLSAxMSl9XWAsIFwic3BlY2lhbFwiKTtcbn1cbl9fbmFtZShpbnNwZWN0RnVuY3Rpb24sIFwiaW5zcGVjdEZ1bmN0aW9uXCIpO1xuXG4vLyBub2RlX21vZHVsZXMvbG91cGUvbGliL21hcC5qc1xuZnVuY3Rpb24gaW5zcGVjdE1hcEVudHJ5KFtrZXksIHZhbHVlXSwgb3B0aW9ucykge1xuICBvcHRpb25zLnRydW5jYXRlIC09IDQ7XG4gIGtleSA9IG9wdGlvbnMuaW5zcGVjdChrZXksIG9wdGlvbnMpO1xuICBvcHRpb25zLnRydW5jYXRlIC09IGtleS5sZW5ndGg7XG4gIHZhbHVlID0gb3B0aW9ucy5pbnNwZWN0KHZhbHVlLCBvcHRpb25zKTtcbiAgcmV0dXJuIGAke2tleX0gPT4gJHt2YWx1ZX1gO1xufVxuX19uYW1lKGluc3BlY3RNYXBFbnRyeSwgXCJpbnNwZWN0TWFwRW50cnlcIik7XG5mdW5jdGlvbiBtYXBUb0VudHJpZXMobWFwKSB7XG4gIGNvbnN0IGVudHJpZXMgPSBbXTtcbiAgbWFwLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICBlbnRyaWVzLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgfSk7XG4gIHJldHVybiBlbnRyaWVzO1xufVxuX19uYW1lKG1hcFRvRW50cmllcywgXCJtYXBUb0VudHJpZXNcIik7XG5mdW5jdGlvbiBpbnNwZWN0TWFwKG1hcCwgb3B0aW9ucykge1xuICBpZiAobWFwLnNpemUgPT09IDApXG4gICAgcmV0dXJuIFwiTWFwe31cIjtcbiAgb3B0aW9ucy50cnVuY2F0ZSAtPSA3O1xuICByZXR1cm4gYE1hcHsgJHtpbnNwZWN0TGlzdChtYXBUb0VudHJpZXMobWFwKSwgb3B0aW9ucywgaW5zcGVjdE1hcEVudHJ5KX0gfWA7XG59XG5fX25hbWUoaW5zcGVjdE1hcCwgXCJpbnNwZWN0TWFwXCIpO1xuXG4vLyBub2RlX21vZHVsZXMvbG91cGUvbGliL251bWJlci5qc1xudmFyIGlzTmFOID0gTnVtYmVyLmlzTmFOIHx8ICgoaSkgPT4gaSAhPT0gaSk7XG5mdW5jdGlvbiBpbnNwZWN0TnVtYmVyKG51bWJlciwgb3B0aW9ucykge1xuICBpZiAoaXNOYU4obnVtYmVyKSkge1xuICAgIHJldHVybiBvcHRpb25zLnN0eWxpemUoXCJOYU5cIiwgXCJudW1iZXJcIik7XG4gIH1cbiAgaWYgKG51bWJlciA9PT0gSW5maW5pdHkpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5zdHlsaXplKFwiSW5maW5pdHlcIiwgXCJudW1iZXJcIik7XG4gIH1cbiAgaWYgKG51bWJlciA9PT0gLUluZmluaXR5KSB7XG4gICAgcmV0dXJuIG9wdGlvbnMuc3R5bGl6ZShcIi1JbmZpbml0eVwiLCBcIm51bWJlclwiKTtcbiAgfVxuICBpZiAobnVtYmVyID09PSAwKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMuc3R5bGl6ZSgxIC8gbnVtYmVyID09PSBJbmZpbml0eSA/IFwiKzBcIiA6IFwiLTBcIiwgXCJudW1iZXJcIik7XG4gIH1cbiAgcmV0dXJuIG9wdGlvbnMuc3R5bGl6ZSh0cnVuY2F0ZShTdHJpbmcobnVtYmVyKSwgb3B0aW9ucy50cnVuY2F0ZSksIFwibnVtYmVyXCIpO1xufVxuX19uYW1lKGluc3BlY3ROdW1iZXIsIFwiaW5zcGVjdE51bWJlclwiKTtcblxuLy8gbm9kZV9tb2R1bGVzL2xvdXBlL2xpYi9iaWdpbnQuanNcbmZ1bmN0aW9uIGluc3BlY3RCaWdJbnQobnVtYmVyLCBvcHRpb25zKSB7XG4gIGxldCBudW1zID0gdHJ1bmNhdGUobnVtYmVyLnRvU3RyaW5nKCksIG9wdGlvbnMudHJ1bmNhdGUgLSAxKTtcbiAgaWYgKG51bXMgIT09IHRydW5jYXRvcilcbiAgICBudW1zICs9IFwiblwiO1xuICByZXR1cm4gb3B0aW9ucy5zdHlsaXplKG51bXMsIFwiYmlnaW50XCIpO1xufVxuX19uYW1lKGluc3BlY3RCaWdJbnQsIFwiaW5zcGVjdEJpZ0ludFwiKTtcblxuLy8gbm9kZV9tb2R1bGVzL2xvdXBlL2xpYi9yZWdleHAuanNcbmZ1bmN0aW9uIGluc3BlY3RSZWdFeHAodmFsdWUsIG9wdGlvbnMpIHtcbiAgY29uc3QgZmxhZ3MgPSB2YWx1ZS50b1N0cmluZygpLnNwbGl0KFwiL1wiKVsyXTtcbiAgY29uc3Qgc291cmNlTGVuZ3RoID0gb3B0aW9ucy50cnVuY2F0ZSAtICgyICsgZmxhZ3MubGVuZ3RoKTtcbiAgY29uc3Qgc291cmNlID0gdmFsdWUuc291cmNlO1xuICByZXR1cm4gb3B0aW9ucy5zdHlsaXplKGAvJHt0cnVuY2F0ZShzb3VyY2UsIHNvdXJjZUxlbmd0aCl9LyR7ZmxhZ3N9YCwgXCJyZWdleHBcIik7XG59XG5fX25hbWUoaW5zcGVjdFJlZ0V4cCwgXCJpbnNwZWN0UmVnRXhwXCIpO1xuXG4vLyBub2RlX21vZHVsZXMvbG91cGUvbGliL3NldC5qc1xuZnVuY3Rpb24gYXJyYXlGcm9tU2V0KHNldDIpIHtcbiAgY29uc3QgdmFsdWVzID0gW107XG4gIHNldDIuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICB2YWx1ZXMucHVzaCh2YWx1ZSk7XG4gIH0pO1xuICByZXR1cm4gdmFsdWVzO1xufVxuX19uYW1lKGFycmF5RnJvbVNldCwgXCJhcnJheUZyb21TZXRcIik7XG5mdW5jdGlvbiBpbnNwZWN0U2V0KHNldDIsIG9wdGlvbnMpIHtcbiAgaWYgKHNldDIuc2l6ZSA9PT0gMClcbiAgICByZXR1cm4gXCJTZXR7fVwiO1xuICBvcHRpb25zLnRydW5jYXRlIC09IDc7XG4gIHJldHVybiBgU2V0eyAke2luc3BlY3RMaXN0KGFycmF5RnJvbVNldChzZXQyKSwgb3B0aW9ucyl9IH1gO1xufVxuX19uYW1lKGluc3BlY3RTZXQsIFwiaW5zcGVjdFNldFwiKTtcblxuLy8gbm9kZV9tb2R1bGVzL2xvdXBlL2xpYi9zdHJpbmcuanNcbnZhciBzdHJpbmdFc2NhcGVDaGFycyA9IG5ldyBSZWdFeHAoXCJbJ1xcXFx1MDAwMC1cXFxcdTAwMWZcXFxcdTAwN2YtXFxcXHUwMDlmXFxcXHUwMGFkXFxcXHUwNjAwLVxcXFx1MDYwNFxcXFx1MDcwZlxcXFx1MTdiNFxcXFx1MTdiNVxcXFx1MjAwYy1cXFxcdTIwMGZcXFxcdTIwMjgtXFxcXHUyMDJmXFxcXHUyMDYwLVxcXFx1MjA2ZlxcXFx1ZmVmZlxcXFx1ZmZmMC1cXFxcdWZmZmZdXCIsIFwiZ1wiKTtcbnZhciBlc2NhcGVDaGFyYWN0ZXJzID0ge1xuICBcIlxcYlwiOiBcIlxcXFxiXCIsXG4gIFwiXHRcIjogXCJcXFxcdFwiLFxuICBcIlxcblwiOiBcIlxcXFxuXCIsXG4gIFwiXFxmXCI6IFwiXFxcXGZcIixcbiAgXCJcXHJcIjogXCJcXFxcclwiLFxuICBcIidcIjogXCJcXFxcJ1wiLFxuICBcIlxcXFxcIjogXCJcXFxcXFxcXFwiXG59O1xudmFyIGhleCA9IDE2O1xudmFyIHVuaWNvZGVMZW5ndGggPSA0O1xuZnVuY3Rpb24gZXNjYXBlKGNoYXIpIHtcbiAgcmV0dXJuIGVzY2FwZUNoYXJhY3RlcnNbY2hhcl0gfHwgYFxcXFx1JHtgMDAwMCR7Y2hhci5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKGhleCl9YC5zbGljZSgtdW5pY29kZUxlbmd0aCl9YDtcbn1cbl9fbmFtZShlc2NhcGUsIFwiZXNjYXBlXCIpO1xuZnVuY3Rpb24gaW5zcGVjdFN0cmluZyhzdHJpbmcsIG9wdGlvbnMpIHtcbiAgaWYgKHN0cmluZ0VzY2FwZUNoYXJzLnRlc3Qoc3RyaW5nKSkge1xuICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKHN0cmluZ0VzY2FwZUNoYXJzLCBlc2NhcGUpO1xuICB9XG4gIHJldHVybiBvcHRpb25zLnN0eWxpemUoYCcke3RydW5jYXRlKHN0cmluZywgb3B0aW9ucy50cnVuY2F0ZSAtIDIpfSdgLCBcInN0cmluZ1wiKTtcbn1cbl9fbmFtZShpbnNwZWN0U3RyaW5nLCBcImluc3BlY3RTdHJpbmdcIik7XG5cbi8vIG5vZGVfbW9kdWxlcy9sb3VwZS9saWIvc3ltYm9sLmpzXG5mdW5jdGlvbiBpbnNwZWN0U3ltYm9sKHZhbHVlKSB7XG4gIGlmIChcImRlc2NyaXB0aW9uXCIgaW4gU3ltYm9sLnByb3RvdHlwZSkge1xuICAgIHJldHVybiB2YWx1ZS5kZXNjcmlwdGlvbiA/IGBTeW1ib2woJHt2YWx1ZS5kZXNjcmlwdGlvbn0pYCA6IFwiU3ltYm9sKClcIjtcbiAgfVxuICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKTtcbn1cbl9fbmFtZShpbnNwZWN0U3ltYm9sLCBcImluc3BlY3RTeW1ib2xcIik7XG5cbi8vIG5vZGVfbW9kdWxlcy9sb3VwZS9saWIvcHJvbWlzZS5qc1xudmFyIGdldFByb21pc2VWYWx1ZSA9IC8qIEBfX1BVUkVfXyAqLyBfX25hbWUoKCkgPT4gXCJQcm9taXNle1xcdTIwMjZ9XCIsIFwiZ2V0UHJvbWlzZVZhbHVlXCIpO1xudmFyIHByb21pc2VfZGVmYXVsdCA9IGdldFByb21pc2VWYWx1ZTtcblxuLy8gbm9kZV9tb2R1bGVzL2xvdXBlL2xpYi9vYmplY3QuanNcbmZ1bmN0aW9uIGluc3BlY3RPYmplY3Qob2JqZWN0LCBvcHRpb25zKSB7XG4gIGNvbnN0IHByb3BlcnRpZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmplY3QpO1xuICBjb25zdCBzeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMob2JqZWN0KSA6IFtdO1xuICBpZiAocHJvcGVydGllcy5sZW5ndGggPT09IDAgJiYgc3ltYm9scy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gXCJ7fVwiO1xuICB9XG4gIG9wdGlvbnMudHJ1bmNhdGUgLT0gNDtcbiAgb3B0aW9ucy5zZWVuID0gb3B0aW9ucy5zZWVuIHx8IFtdO1xuICBpZiAob3B0aW9ucy5zZWVuLmluY2x1ZGVzKG9iamVjdCkpIHtcbiAgICByZXR1cm4gXCJbQ2lyY3VsYXJdXCI7XG4gIH1cbiAgb3B0aW9ucy5zZWVuLnB1c2gob2JqZWN0KTtcbiAgY29uc3QgcHJvcGVydHlDb250ZW50cyA9IGluc3BlY3RMaXN0KHByb3BlcnRpZXMubWFwKChrZXkpID0+IFtrZXksIG9iamVjdFtrZXldXSksIG9wdGlvbnMsIGluc3BlY3RQcm9wZXJ0eSk7XG4gIGNvbnN0IHN5bWJvbENvbnRlbnRzID0gaW5zcGVjdExpc3Qoc3ltYm9scy5tYXAoKGtleSkgPT4gW2tleSwgb2JqZWN0W2tleV1dKSwgb3B0aW9ucywgaW5zcGVjdFByb3BlcnR5KTtcbiAgb3B0aW9ucy5zZWVuLnBvcCgpO1xuICBsZXQgc2VwID0gXCJcIjtcbiAgaWYgKHByb3BlcnR5Q29udGVudHMgJiYgc3ltYm9sQ29udGVudHMpIHtcbiAgICBzZXAgPSBcIiwgXCI7XG4gIH1cbiAgcmV0dXJuIGB7ICR7cHJvcGVydHlDb250ZW50c30ke3NlcH0ke3N5bWJvbENvbnRlbnRzfSB9YDtcbn1cbl9fbmFtZShpbnNwZWN0T2JqZWN0LCBcImluc3BlY3RPYmplY3RcIik7XG5cbi8vIG5vZGVfbW9kdWxlcy9sb3VwZS9saWIvY2xhc3MuanNcbnZhciB0b1N0cmluZ1RhZyA9IHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgU3ltYm9sLnRvU3RyaW5nVGFnID8gU3ltYm9sLnRvU3RyaW5nVGFnIDogZmFsc2U7XG5mdW5jdGlvbiBpbnNwZWN0Q2xhc3ModmFsdWUsIG9wdGlvbnMpIHtcbiAgbGV0IG5hbWUgPSBcIlwiO1xuICBpZiAodG9TdHJpbmdUYWcgJiYgdG9TdHJpbmdUYWcgaW4gdmFsdWUpIHtcbiAgICBuYW1lID0gdmFsdWVbdG9TdHJpbmdUYWddO1xuICB9XG4gIG5hbWUgPSBuYW1lIHx8IHZhbHVlLmNvbnN0cnVjdG9yLm5hbWU7XG4gIGlmICghbmFtZSB8fCBuYW1lID09PSBcIl9jbGFzc1wiKSB7XG4gICAgbmFtZSA9IFwiPEFub255bW91cyBDbGFzcz5cIjtcbiAgfVxuICBvcHRpb25zLnRydW5jYXRlIC09IG5hbWUubGVuZ3RoO1xuICByZXR1cm4gYCR7bmFtZX0ke2luc3BlY3RPYmplY3QodmFsdWUsIG9wdGlvbnMpfWA7XG59XG5fX25hbWUoaW5zcGVjdENsYXNzLCBcImluc3BlY3RDbGFzc1wiKTtcblxuLy8gbm9kZV9tb2R1bGVzL2xvdXBlL2xpYi9hcmd1bWVudHMuanNcbmZ1bmN0aW9uIGluc3BlY3RBcmd1bWVudHMoYXJncywgb3B0aW9ucykge1xuICBpZiAoYXJncy5sZW5ndGggPT09IDApXG4gICAgcmV0dXJuIFwiQXJndW1lbnRzW11cIjtcbiAgb3B0aW9ucy50cnVuY2F0ZSAtPSAxMztcbiAgcmV0dXJuIGBBcmd1bWVudHNbICR7aW5zcGVjdExpc3QoYXJncywgb3B0aW9ucyl9IF1gO1xufVxuX19uYW1lKGluc3BlY3RBcmd1bWVudHMsIFwiaW5zcGVjdEFyZ3VtZW50c1wiKTtcblxuLy8gbm9kZV9tb2R1bGVzL2xvdXBlL2xpYi9lcnJvci5qc1xudmFyIGVycm9yS2V5cyA9IFtcbiAgXCJzdGFja1wiLFxuICBcImxpbmVcIixcbiAgXCJjb2x1bW5cIixcbiAgXCJuYW1lXCIsXG4gIFwibWVzc2FnZVwiLFxuICBcImZpbGVOYW1lXCIsXG4gIFwibGluZU51bWJlclwiLFxuICBcImNvbHVtbk51bWJlclwiLFxuICBcIm51bWJlclwiLFxuICBcImRlc2NyaXB0aW9uXCIsXG4gIFwiY2F1c2VcIlxuXTtcbmZ1bmN0aW9uIGluc3BlY3RPYmplY3QyKGVycm9yLCBvcHRpb25zKSB7XG4gIGNvbnN0IHByb3BlcnRpZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhlcnJvcikuZmlsdGVyKChrZXkpID0+IGVycm9yS2V5cy5pbmRleE9mKGtleSkgPT09IC0xKTtcbiAgY29uc3QgbmFtZSA9IGVycm9yLm5hbWU7XG4gIG9wdGlvbnMudHJ1bmNhdGUgLT0gbmFtZS5sZW5ndGg7XG4gIGxldCBtZXNzYWdlID0gXCJcIjtcbiAgaWYgKHR5cGVvZiBlcnJvci5tZXNzYWdlID09PSBcInN0cmluZ1wiKSB7XG4gICAgbWVzc2FnZSA9IHRydW5jYXRlKGVycm9yLm1lc3NhZ2UsIG9wdGlvbnMudHJ1bmNhdGUpO1xuICB9IGVsc2Uge1xuICAgIHByb3BlcnRpZXMudW5zaGlmdChcIm1lc3NhZ2VcIik7XG4gIH1cbiAgbWVzc2FnZSA9IG1lc3NhZ2UgPyBgOiAke21lc3NhZ2V9YCA6IFwiXCI7XG4gIG9wdGlvbnMudHJ1bmNhdGUgLT0gbWVzc2FnZS5sZW5ndGggKyA1O1xuICBvcHRpb25zLnNlZW4gPSBvcHRpb25zLnNlZW4gfHwgW107XG4gIGlmIChvcHRpb25zLnNlZW4uaW5jbHVkZXMoZXJyb3IpKSB7XG4gICAgcmV0dXJuIFwiW0NpcmN1bGFyXVwiO1xuICB9XG4gIG9wdGlvbnMuc2Vlbi5wdXNoKGVycm9yKTtcbiAgY29uc3QgcHJvcGVydHlDb250ZW50cyA9IGluc3BlY3RMaXN0KHByb3BlcnRpZXMubWFwKChrZXkpID0+IFtrZXksIGVycm9yW2tleV1dKSwgb3B0aW9ucywgaW5zcGVjdFByb3BlcnR5KTtcbiAgcmV0dXJuIGAke25hbWV9JHttZXNzYWdlfSR7cHJvcGVydHlDb250ZW50cyA/IGAgeyAke3Byb3BlcnR5Q29udGVudHN9IH1gIDogXCJcIn1gO1xufVxuX19uYW1lKGluc3BlY3RPYmplY3QyLCBcImluc3BlY3RPYmplY3RcIik7XG5cbi8vIG5vZGVfbW9kdWxlcy9sb3VwZS9saWIvaHRtbC5qc1xuZnVuY3Rpb24gaW5zcGVjdEF0dHJpYnV0ZShba2V5LCB2YWx1ZV0sIG9wdGlvbnMpIHtcbiAgb3B0aW9ucy50cnVuY2F0ZSAtPSAzO1xuICBpZiAoIXZhbHVlKSB7XG4gICAgcmV0dXJuIGAke29wdGlvbnMuc3R5bGl6ZShTdHJpbmcoa2V5KSwgXCJ5ZWxsb3dcIil9YDtcbiAgfVxuICByZXR1cm4gYCR7b3B0aW9ucy5zdHlsaXplKFN0cmluZyhrZXkpLCBcInllbGxvd1wiKX09JHtvcHRpb25zLnN0eWxpemUoYFwiJHt2YWx1ZX1cImAsIFwic3RyaW5nXCIpfWA7XG59XG5fX25hbWUoaW5zcGVjdEF0dHJpYnV0ZSwgXCJpbnNwZWN0QXR0cmlidXRlXCIpO1xuZnVuY3Rpb24gaW5zcGVjdE5vZGVDb2xsZWN0aW9uKGNvbGxlY3Rpb24sIG9wdGlvbnMpIHtcbiAgcmV0dXJuIGluc3BlY3RMaXN0KGNvbGxlY3Rpb24sIG9wdGlvbnMsIGluc3BlY3ROb2RlLCBcIlxcblwiKTtcbn1cbl9fbmFtZShpbnNwZWN0Tm9kZUNvbGxlY3Rpb24sIFwiaW5zcGVjdE5vZGVDb2xsZWN0aW9uXCIpO1xuZnVuY3Rpb24gaW5zcGVjdE5vZGUobm9kZSwgb3B0aW9ucykge1xuICBzd2l0Y2ggKG5vZGUubm9kZVR5cGUpIHtcbiAgICBjYXNlIDE6XG4gICAgICByZXR1cm4gaW5zcGVjdEhUTUwobm9kZSwgb3B0aW9ucyk7XG4gICAgY2FzZSAzOlxuICAgICAgcmV0dXJuIG9wdGlvbnMuaW5zcGVjdChub2RlLmRhdGEsIG9wdGlvbnMpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gb3B0aW9ucy5pbnNwZWN0KG5vZGUsIG9wdGlvbnMpO1xuICB9XG59XG5fX25hbWUoaW5zcGVjdE5vZGUsIFwiaW5zcGVjdE5vZGVcIik7XG5mdW5jdGlvbiBpbnNwZWN0SFRNTChlbGVtZW50LCBvcHRpb25zKSB7XG4gIGNvbnN0IHByb3BlcnRpZXMgPSBlbGVtZW50LmdldEF0dHJpYnV0ZU5hbWVzKCk7XG4gIGNvbnN0IG5hbWUgPSBlbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcbiAgY29uc3QgaGVhZCA9IG9wdGlvbnMuc3R5bGl6ZShgPCR7bmFtZX1gLCBcInNwZWNpYWxcIik7XG4gIGNvbnN0IGhlYWRDbG9zZSA9IG9wdGlvbnMuc3R5bGl6ZShgPmAsIFwic3BlY2lhbFwiKTtcbiAgY29uc3QgdGFpbCA9IG9wdGlvbnMuc3R5bGl6ZShgPC8ke25hbWV9PmAsIFwic3BlY2lhbFwiKTtcbiAgb3B0aW9ucy50cnVuY2F0ZSAtPSBuYW1lLmxlbmd0aCAqIDIgKyA1O1xuICBsZXQgcHJvcGVydHlDb250ZW50cyA9IFwiXCI7XG4gIGlmIChwcm9wZXJ0aWVzLmxlbmd0aCA+IDApIHtcbiAgICBwcm9wZXJ0eUNvbnRlbnRzICs9IFwiIFwiO1xuICAgIHByb3BlcnR5Q29udGVudHMgKz0gaW5zcGVjdExpc3QocHJvcGVydGllcy5tYXAoKGtleSkgPT4gW2tleSwgZWxlbWVudC5nZXRBdHRyaWJ1dGUoa2V5KV0pLCBvcHRpb25zLCBpbnNwZWN0QXR0cmlidXRlLCBcIiBcIik7XG4gIH1cbiAgb3B0aW9ucy50cnVuY2F0ZSAtPSBwcm9wZXJ0eUNvbnRlbnRzLmxlbmd0aDtcbiAgY29uc3QgdHJ1bmNhdGUyID0gb3B0aW9ucy50cnVuY2F0ZTtcbiAgbGV0IGNoaWxkcmVuID0gaW5zcGVjdE5vZGVDb2xsZWN0aW9uKGVsZW1lbnQuY2hpbGRyZW4sIG9wdGlvbnMpO1xuICBpZiAoY2hpbGRyZW4gJiYgY2hpbGRyZW4ubGVuZ3RoID4gdHJ1bmNhdGUyKSB7XG4gICAgY2hpbGRyZW4gPSBgJHt0cnVuY2F0b3J9KCR7ZWxlbWVudC5jaGlsZHJlbi5sZW5ndGh9KWA7XG4gIH1cbiAgcmV0dXJuIGAke2hlYWR9JHtwcm9wZXJ0eUNvbnRlbnRzfSR7aGVhZENsb3NlfSR7Y2hpbGRyZW59JHt0YWlsfWA7XG59XG5fX25hbWUoaW5zcGVjdEhUTUwsIFwiaW5zcGVjdEhUTUxcIik7XG5cbi8vIG5vZGVfbW9kdWxlcy9sb3VwZS9saWIvaW5kZXguanNcbnZhciBzeW1ib2xzU3VwcG9ydGVkID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuZm9yID09PSBcImZ1bmN0aW9uXCI7XG52YXIgY2hhaUluc3BlY3QgPSBzeW1ib2xzU3VwcG9ydGVkID8gU3ltYm9sLmZvcihcImNoYWkvaW5zcGVjdFwiKSA6IFwiQEBjaGFpL2luc3BlY3RcIjtcbnZhciBub2RlSW5zcGVjdCA9IFN5bWJvbC5mb3IoXCJub2RlanMudXRpbC5pbnNwZWN0LmN1c3RvbVwiKTtcbnZhciBjb25zdHJ1Y3Rvck1hcCA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgV2Vha01hcCgpO1xudmFyIHN0cmluZ1RhZ01hcCA9IHt9O1xudmFyIGJhc2VUeXBlc01hcCA9IHtcbiAgdW5kZWZpbmVkOiAvKiBAX19QVVJFX18gKi8gX19uYW1lKCh2YWx1ZSwgb3B0aW9ucykgPT4gb3B0aW9ucy5zdHlsaXplKFwidW5kZWZpbmVkXCIsIFwidW5kZWZpbmVkXCIpLCBcInVuZGVmaW5lZFwiKSxcbiAgbnVsbDogLyogQF9fUFVSRV9fICovIF9fbmFtZSgodmFsdWUsIG9wdGlvbnMpID0+IG9wdGlvbnMuc3R5bGl6ZShcIm51bGxcIiwgXCJudWxsXCIpLCBcIm51bGxcIiksXG4gIGJvb2xlYW46IC8qIEBfX1BVUkVfXyAqLyBfX25hbWUoKHZhbHVlLCBvcHRpb25zKSA9PiBvcHRpb25zLnN0eWxpemUoU3RyaW5nKHZhbHVlKSwgXCJib29sZWFuXCIpLCBcImJvb2xlYW5cIiksXG4gIEJvb2xlYW46IC8qIEBfX1BVUkVfXyAqLyBfX25hbWUoKHZhbHVlLCBvcHRpb25zKSA9PiBvcHRpb25zLnN0eWxpemUoU3RyaW5nKHZhbHVlKSwgXCJib29sZWFuXCIpLCBcIkJvb2xlYW5cIiksXG4gIG51bWJlcjogaW5zcGVjdE51bWJlcixcbiAgTnVtYmVyOiBpbnNwZWN0TnVtYmVyLFxuICBiaWdpbnQ6IGluc3BlY3RCaWdJbnQsXG4gIEJpZ0ludDogaW5zcGVjdEJpZ0ludCxcbiAgc3RyaW5nOiBpbnNwZWN0U3RyaW5nLFxuICBTdHJpbmc6IGluc3BlY3RTdHJpbmcsXG4gIGZ1bmN0aW9uOiBpbnNwZWN0RnVuY3Rpb24sXG4gIEZ1bmN0aW9uOiBpbnNwZWN0RnVuY3Rpb24sXG4gIHN5bWJvbDogaW5zcGVjdFN5bWJvbCxcbiAgLy8gQSBTeW1ib2wgcG9seWZpbGwgd2lsbCByZXR1cm4gYFN5bWJvbGAgbm90IGBzeW1ib2xgIGZyb20gdHlwZWRldGVjdFxuICBTeW1ib2w6IGluc3BlY3RTeW1ib2wsXG4gIEFycmF5OiBpbnNwZWN0QXJyYXksXG4gIERhdGU6IGluc3BlY3REYXRlLFxuICBNYXA6IGluc3BlY3RNYXAsXG4gIFNldDogaW5zcGVjdFNldCxcbiAgUmVnRXhwOiBpbnNwZWN0UmVnRXhwLFxuICBQcm9taXNlOiBwcm9taXNlX2RlZmF1bHQsXG4gIC8vIFdlYWtTZXQsIFdlYWtNYXAgYXJlIHRvdGFsbHkgb3BhcXVlIHRvIHVzXG4gIFdlYWtTZXQ6IC8qIEBfX1BVUkVfXyAqLyBfX25hbWUoKHZhbHVlLCBvcHRpb25zKSA9PiBvcHRpb25zLnN0eWxpemUoXCJXZWFrU2V0e1xcdTIwMjZ9XCIsIFwic3BlY2lhbFwiKSwgXCJXZWFrU2V0XCIpLFxuICBXZWFrTWFwOiAvKiBAX19QVVJFX18gKi8gX19uYW1lKCh2YWx1ZSwgb3B0aW9ucykgPT4gb3B0aW9ucy5zdHlsaXplKFwiV2Vha01hcHtcXHUyMDI2fVwiLCBcInNwZWNpYWxcIiksIFwiV2Vha01hcFwiKSxcbiAgQXJndW1lbnRzOiBpbnNwZWN0QXJndW1lbnRzLFxuICBJbnQ4QXJyYXk6IGluc3BlY3RUeXBlZEFycmF5LFxuICBVaW50OEFycmF5OiBpbnNwZWN0VHlwZWRBcnJheSxcbiAgVWludDhDbGFtcGVkQXJyYXk6IGluc3BlY3RUeXBlZEFycmF5LFxuICBJbnQxNkFycmF5OiBpbnNwZWN0VHlwZWRBcnJheSxcbiAgVWludDE2QXJyYXk6IGluc3BlY3RUeXBlZEFycmF5LFxuICBJbnQzMkFycmF5OiBpbnNwZWN0VHlwZWRBcnJheSxcbiAgVWludDMyQXJyYXk6IGluc3BlY3RUeXBlZEFycmF5LFxuICBGbG9hdDMyQXJyYXk6IGluc3BlY3RUeXBlZEFycmF5LFxuICBGbG9hdDY0QXJyYXk6IGluc3BlY3RUeXBlZEFycmF5LFxuICBHZW5lcmF0b3I6IC8qIEBfX1BVUkVfXyAqLyBfX25hbWUoKCkgPT4gXCJcIiwgXCJHZW5lcmF0b3JcIiksXG4gIERhdGFWaWV3OiAvKiBAX19QVVJFX18gKi8gX19uYW1lKCgpID0+IFwiXCIsIFwiRGF0YVZpZXdcIiksXG4gIEFycmF5QnVmZmVyOiAvKiBAX19QVVJFX18gKi8gX19uYW1lKCgpID0+IFwiXCIsIFwiQXJyYXlCdWZmZXJcIiksXG4gIEVycm9yOiBpbnNwZWN0T2JqZWN0MixcbiAgSFRNTENvbGxlY3Rpb246IGluc3BlY3ROb2RlQ29sbGVjdGlvbixcbiAgTm9kZUxpc3Q6IGluc3BlY3ROb2RlQ29sbGVjdGlvblxufTtcbnZhciBpbnNwZWN0Q3VzdG9tID0gLyogQF9fUFVSRV9fICovIF9fbmFtZSgodmFsdWUsIG9wdGlvbnMsIHR5cGUzKSA9PiB7XG4gIGlmIChjaGFpSW5zcGVjdCBpbiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWVbY2hhaUluc3BlY3RdID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICByZXR1cm4gdmFsdWVbY2hhaUluc3BlY3RdKG9wdGlvbnMpO1xuICB9XG4gIGlmIChub2RlSW5zcGVjdCBpbiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWVbbm9kZUluc3BlY3RdID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICByZXR1cm4gdmFsdWVbbm9kZUluc3BlY3RdKG9wdGlvbnMuZGVwdGgsIG9wdGlvbnMpO1xuICB9XG4gIGlmIChcImluc3BlY3RcIiBpbiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUuaW5zcGVjdCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgcmV0dXJuIHZhbHVlLmluc3BlY3Qob3B0aW9ucy5kZXB0aCwgb3B0aW9ucyk7XG4gIH1cbiAgaWYgKFwiY29uc3RydWN0b3JcIiBpbiB2YWx1ZSAmJiBjb25zdHJ1Y3Rvck1hcC5oYXModmFsdWUuY29uc3RydWN0b3IpKSB7XG4gICAgcmV0dXJuIGNvbnN0cnVjdG9yTWFwLmdldCh2YWx1ZS5jb25zdHJ1Y3RvcikodmFsdWUsIG9wdGlvbnMpO1xuICB9XG4gIGlmIChzdHJpbmdUYWdNYXBbdHlwZTNdKSB7XG4gICAgcmV0dXJuIHN0cmluZ1RhZ01hcFt0eXBlM10odmFsdWUsIG9wdGlvbnMpO1xuICB9XG4gIHJldHVybiBcIlwiO1xufSwgXCJpbnNwZWN0Q3VzdG9tXCIpO1xudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbmZ1bmN0aW9uIGluc3BlY3QodmFsdWUsIG9wdHMgPSB7fSkge1xuICBjb25zdCBvcHRpb25zID0gbm9ybWFsaXNlT3B0aW9ucyhvcHRzLCBpbnNwZWN0KTtcbiAgY29uc3QgeyBjdXN0b21JbnNwZWN0IH0gPSBvcHRpb25zO1xuICBsZXQgdHlwZTMgPSB2YWx1ZSA9PT0gbnVsbCA/IFwibnVsbFwiIDogdHlwZW9mIHZhbHVlO1xuICBpZiAodHlwZTMgPT09IFwib2JqZWN0XCIpIHtcbiAgICB0eXBlMyA9IHRvU3RyaW5nLmNhbGwodmFsdWUpLnNsaWNlKDgsIC0xKTtcbiAgfVxuICBpZiAodHlwZTMgaW4gYmFzZVR5cGVzTWFwKSB7XG4gICAgcmV0dXJuIGJhc2VUeXBlc01hcFt0eXBlM10odmFsdWUsIG9wdGlvbnMpO1xuICB9XG4gIGlmIChjdXN0b21JbnNwZWN0ICYmIHZhbHVlKSB7XG4gICAgY29uc3Qgb3V0cHV0ID0gaW5zcGVjdEN1c3RvbSh2YWx1ZSwgb3B0aW9ucywgdHlwZTMpO1xuICAgIGlmIChvdXRwdXQpIHtcbiAgICAgIGlmICh0eXBlb2Ygb3V0cHV0ID09PSBcInN0cmluZ1wiKVxuICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgICAgcmV0dXJuIGluc3BlY3Qob3V0cHV0LCBvcHRpb25zKTtcbiAgICB9XG4gIH1cbiAgY29uc3QgcHJvdG8gPSB2YWx1ZSA/IE9iamVjdC5nZXRQcm90b3R5cGVPZih2YWx1ZSkgOiBmYWxzZTtcbiAgaWYgKHByb3RvID09PSBPYmplY3QucHJvdG90eXBlIHx8IHByb3RvID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGluc3BlY3RPYmplY3QodmFsdWUsIG9wdGlvbnMpO1xuICB9XG4gIGlmICh2YWx1ZSAmJiB0eXBlb2YgSFRNTEVsZW1lbnQgPT09IFwiZnVuY3Rpb25cIiAmJiB2YWx1ZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgcmV0dXJuIGluc3BlY3RIVE1MKHZhbHVlLCBvcHRpb25zKTtcbiAgfVxuICBpZiAoXCJjb25zdHJ1Y3RvclwiIGluIHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlLmNvbnN0cnVjdG9yICE9PSBPYmplY3QpIHtcbiAgICAgIHJldHVybiBpbnNwZWN0Q2xhc3ModmFsdWUsIG9wdGlvbnMpO1xuICAgIH1cbiAgICByZXR1cm4gaW5zcGVjdE9iamVjdCh2YWx1ZSwgb3B0aW9ucyk7XG4gIH1cbiAgaWYgKHZhbHVlID09PSBPYmplY3QodmFsdWUpKSB7XG4gICAgcmV0dXJuIGluc3BlY3RPYmplY3QodmFsdWUsIG9wdGlvbnMpO1xuICB9XG4gIHJldHVybiBvcHRpb25zLnN0eWxpemUoU3RyaW5nKHZhbHVlKSwgdHlwZTMpO1xufVxuX19uYW1lKGluc3BlY3QsIFwiaW5zcGVjdFwiKTtcblxuLy8gbGliL2NoYWkvY29uZmlnLmpzXG52YXIgY29uZmlnID0ge1xuICAvKipcbiAgICogIyMjIGNvbmZpZy5pbmNsdWRlU3RhY2tcbiAgICpcbiAgICogVXNlciBjb25maWd1cmFibGUgcHJvcGVydHksIGluZmx1ZW5jZXMgd2hldGhlciBzdGFjayB0cmFjZVxuICAgKiBpcyBpbmNsdWRlZCBpbiBBc3NlcnRpb24gZXJyb3IgbWVzc2FnZS4gRGVmYXVsdCBvZiBmYWxzZVxuICAgKiBzdXBwcmVzc2VzIHN0YWNrIHRyYWNlIGluIHRoZSBlcnJvciBtZXNzYWdlLlxuICAgKlxuICAgKiAgICAgY2hhaS5jb25maWcuaW5jbHVkZVN0YWNrID0gdHJ1ZTsgIC8vIGVuYWJsZSBzdGFjayBvbiBlcnJvclxuICAgKlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59XG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGluY2x1ZGVTdGFjazogZmFsc2UsXG4gIC8qKlxuICAgKiAjIyMgY29uZmlnLnNob3dEaWZmXG4gICAqXG4gICAqIFVzZXIgY29uZmlndXJhYmxlIHByb3BlcnR5LCBpbmZsdWVuY2VzIHdoZXRoZXIgb3Igbm90XG4gICAqIHRoZSBgc2hvd0RpZmZgIGZsYWcgc2hvdWxkIGJlIGluY2x1ZGVkIGluIHRoZSB0aHJvd25cbiAgICogQXNzZXJ0aW9uRXJyb3JzLiBgZmFsc2VgIHdpbGwgYWx3YXlzIGJlIGBmYWxzZWA7IGB0cnVlYFxuICAgKiB3aWxsIGJlIHRydWUgd2hlbiB0aGUgYXNzZXJ0aW9uIGhhcyByZXF1ZXN0ZWQgYSBkaWZmXG4gICAqIGJlIHNob3duLlxuICAgKlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59XG4gICAqIEBwdWJsaWNcbiAgICovXG4gIHNob3dEaWZmOiB0cnVlLFxuICAvKipcbiAgICogIyMjIGNvbmZpZy50cnVuY2F0ZVRocmVzaG9sZFxuICAgKlxuICAgKiBVc2VyIGNvbmZpZ3VyYWJsZSBwcm9wZXJ0eSwgc2V0cyBsZW5ndGggdGhyZXNob2xkIGZvciBhY3R1YWwgYW5kXG4gICAqIGV4cGVjdGVkIHZhbHVlcyBpbiBhc3NlcnRpb24gZXJyb3JzLiBJZiB0aGlzIHRocmVzaG9sZCBpcyBleGNlZWRlZCwgZm9yXG4gICAqIGV4YW1wbGUgZm9yIGxhcmdlIGRhdGEgc3RydWN0dXJlcywgdGhlIHZhbHVlIGlzIHJlcGxhY2VkIHdpdGggc29tZXRoaW5nXG4gICAqIGxpa2UgYFsgQXJyYXkoMykgXWAgb3IgYHsgT2JqZWN0IChwcm9wMSwgcHJvcDIpIH1gLlxuICAgKlxuICAgKiBTZXQgaXQgdG8gemVybyBpZiB5b3Ugd2FudCB0byBkaXNhYmxlIHRydW5jYXRpbmcgYWx0b2dldGhlci5cbiAgICpcbiAgICogVGhpcyBpcyBlc3BlY2lhbGx5IHVzZXJmdWwgd2hlbiBkb2luZyBhc3NlcnRpb25zIG9uIGFycmF5czogaGF2aW5nIHRoaXNcbiAgICogc2V0IHRvIGEgcmVhc29uYWJsZSBsYXJnZSB2YWx1ZSBtYWtlcyB0aGUgZmFpbHVyZSBtZXNzYWdlcyByZWFkaWx5XG4gICAqIGluc3BlY3RhYmxlLlxuICAgKlxuICAgKiAgICAgY2hhaS5jb25maWcudHJ1bmNhdGVUaHJlc2hvbGQgPSAwOyAgLy8gZGlzYWJsZSB0cnVuY2F0aW5nXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfVxuICAgKiBAcHVibGljXG4gICAqL1xuICB0cnVuY2F0ZVRocmVzaG9sZDogNDAsXG4gIC8qKlxuICAgKiAjIyMgY29uZmlnLnVzZVByb3h5XG4gICAqXG4gICAqIFVzZXIgY29uZmlndXJhYmxlIHByb3BlcnR5LCBkZWZpbmVzIGlmIGNoYWkgd2lsbCB1c2UgYSBQcm94eSB0byB0aHJvd1xuICAgKiBhbiBlcnJvciB3aGVuIGEgbm9uLWV4aXN0ZW50IHByb3BlcnR5IGlzIHJlYWQsIHdoaWNoIHByb3RlY3RzIHVzZXJzXG4gICAqIGZyb20gdHlwb3Mgd2hlbiB1c2luZyBwcm9wZXJ0eS1iYXNlZCBhc3NlcnRpb25zLlxuICAgKlxuICAgKiBTZXQgaXQgdG8gZmFsc2UgaWYgeW91IHdhbnQgdG8gZGlzYWJsZSB0aGlzIGZlYXR1cmUuXG4gICAqXG4gICAqICAgICBjaGFpLmNvbmZpZy51c2VQcm94eSA9IGZhbHNlOyAgLy8gZGlzYWJsZSB1c2Ugb2YgUHJveHlcbiAgICpcbiAgICogVGhpcyBmZWF0dXJlIGlzIGF1dG9tYXRpY2FsbHkgZGlzYWJsZWQgcmVnYXJkbGVzcyBvZiB0aGlzIGNvbmZpZyB2YWx1ZVxuICAgKiBpbiBlbnZpcm9ubWVudHMgdGhhdCBkb24ndCBzdXBwb3J0IHByb3hpZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn1cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgdXNlUHJveHk6IHRydWUsXG4gIC8qKlxuICAgKiAjIyMgY29uZmlnLnByb3h5RXhjbHVkZWRLZXlzXG4gICAqXG4gICAqIFVzZXIgY29uZmlndXJhYmxlIHByb3BlcnR5LCBkZWZpbmVzIHdoaWNoIHByb3BlcnRpZXMgc2hvdWxkIGJlIGlnbm9yZWRcbiAgICogaW5zdGVhZCBvZiB0aHJvd2luZyBhbiBlcnJvciBpZiB0aGV5IGRvIG5vdCBleGlzdCBvbiB0aGUgYXNzZXJ0aW9uLlxuICAgKiBUaGlzIGlzIG9ubHkgYXBwbGllZCBpZiB0aGUgZW52aXJvbm1lbnQgQ2hhaSBpcyBydW5uaW5nIGluIHN1cHBvcnRzIHByb3hpZXMgYW5kXG4gICAqIGlmIHRoZSBgdXNlUHJveHlgIGNvbmZpZ3VyYXRpb24gc2V0dGluZyBpcyBlbmFibGVkLlxuICAgKiBCeSBkZWZhdWx0LCBgdGhlbmAgYW5kIGBpbnNwZWN0YCB3aWxsIG5vdCB0aHJvdyBhbiBlcnJvciBpZiB0aGV5IGRvIG5vdCBleGlzdCBvbiB0aGVcbiAgICogYXNzZXJ0aW9uIG9iamVjdCBiZWNhdXNlIHRoZSBgLmluc3BlY3RgIHByb3BlcnR5IGlzIHJlYWQgYnkgYHV0aWwuaW5zcGVjdGAgKGZvciBleGFtcGxlLCB3aGVuXG4gICAqIHVzaW5nIGBjb25zb2xlLmxvZ2Agb24gdGhlIGFzc2VydGlvbiBvYmplY3QpIGFuZCBgLnRoZW5gIGlzIG5lY2Vzc2FyeSBmb3IgcHJvbWlzZSB0eXBlLWNoZWNraW5nLlxuICAgKlxuICAgKiAgICAgLy8gQnkgZGVmYXVsdCB0aGVzZSBrZXlzIHdpbGwgbm90IHRocm93IGFuIGVycm9yIGlmIHRoZXkgZG8gbm90IGV4aXN0IG9uIHRoZSBhc3NlcnRpb24gb2JqZWN0XG4gICAqICAgICBjaGFpLmNvbmZpZy5wcm94eUV4Y2x1ZGVkS2V5cyA9IFsndGhlbicsICdpbnNwZWN0J107XG4gICAqXG4gICAqIEBwYXJhbSB7QXJyYXl9XG4gICAqIEBwdWJsaWNcbiAgICovXG4gIHByb3h5RXhjbHVkZWRLZXlzOiBbXCJ0aGVuXCIsIFwiY2F0Y2hcIiwgXCJpbnNwZWN0XCIsIFwidG9KU09OXCJdLFxuICAvKipcbiAgICogIyMjIGNvbmZpZy5kZWVwRXF1YWxcbiAgICpcbiAgICogVXNlciBjb25maWd1cmFibGUgcHJvcGVydHksIGRlZmluZXMgd2hpY2ggYSBjdXN0b20gZnVuY3Rpb24gdG8gdXNlIGZvciBkZWVwRXF1YWxcbiAgICogY29tcGFyaXNvbnMuXG4gICAqIEJ5IGRlZmF1bHQsIHRoZSBmdW5jdGlvbiB1c2VkIGlzIHRoZSBvbmUgZnJvbSB0aGUgYGRlZXAtZXFsYCBwYWNrYWdlIHdpdGhvdXQgY3VzdG9tIGNvbXBhcmF0b3IuXG4gICAqXG4gICAqICAgICAvLyB1c2UgYSBjdXN0b20gY29tcGFyYXRvclxuICAgKiAgICAgY2hhaS5jb25maWcuZGVlcEVxdWFsID0gKGV4cGVjdGVkLCBhY3R1YWwpID0+IHtcbiAgICogICAgICAgICByZXR1cm4gY2hhaS51dGlsLmVxbChleHBlY3RlZCwgYWN0dWFsLCB7XG4gICAqICAgICAgICAgICAgIGNvbXBhcmF0b3I6IChleHBlY3RlZCwgYWN0dWFsKSA9PiB7XG4gICAqICAgICAgICAgICAgICAgICAvLyBmb3Igbm9uIG51bWJlciBjb21wYXJpc29uLCB1c2UgdGhlIGRlZmF1bHQgYmVoYXZpb3JcbiAgICogICAgICAgICAgICAgICAgIGlmKHR5cGVvZiBleHBlY3RlZCAhPT0gJ251bWJlcicpIHJldHVybiBudWxsO1xuICAgKiAgICAgICAgICAgICAgICAgLy8gYWxsb3cgYSBkaWZmZXJlbmNlIG9mIDEwIGJldHdlZW4gY29tcGFyZWQgbnVtYmVyc1xuICAgKiAgICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBhY3R1YWwgPT09ICdudW1iZXInICYmIE1hdGguYWJzKGFjdHVhbCAtIGV4cGVjdGVkKSA8IDEwXG4gICAqICAgICAgICAgICAgIH1cbiAgICogICAgICAgICB9KVxuICAgKiAgICAgfTtcbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn1cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgZGVlcEVxdWFsOiBudWxsXG59O1xuXG4vLyBsaWIvY2hhaS91dGlscy9pbnNwZWN0LmpzXG5mdW5jdGlvbiBpbnNwZWN0MihvYmosIHNob3dIaWRkZW4sIGRlcHRoLCBjb2xvcnMpIHtcbiAgbGV0IG9wdGlvbnMgPSB7XG4gICAgY29sb3JzLFxuICAgIGRlcHRoOiB0eXBlb2YgZGVwdGggPT09IFwidW5kZWZpbmVkXCIgPyAyIDogZGVwdGgsXG4gICAgc2hvd0hpZGRlbixcbiAgICB0cnVuY2F0ZTogY29uZmlnLnRydW5jYXRlVGhyZXNob2xkID8gY29uZmlnLnRydW5jYXRlVGhyZXNob2xkIDogSW5maW5pdHlcbiAgfTtcbiAgcmV0dXJuIGluc3BlY3Qob2JqLCBvcHRpb25zKTtcbn1cbl9fbmFtZShpbnNwZWN0MiwgXCJpbnNwZWN0XCIpO1xuXG4vLyBsaWIvY2hhaS91dGlscy9vYmpEaXNwbGF5LmpzXG5mdW5jdGlvbiBvYmpEaXNwbGF5KG9iaikge1xuICBsZXQgc3RyID0gaW5zcGVjdDIob2JqKSwgdHlwZTMgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKTtcbiAgaWYgKGNvbmZpZy50cnVuY2F0ZVRocmVzaG9sZCAmJiBzdHIubGVuZ3RoID49IGNvbmZpZy50cnVuY2F0ZVRocmVzaG9sZCkge1xuICAgIGlmICh0eXBlMyA9PT0gXCJbb2JqZWN0IEZ1bmN0aW9uXVwiKSB7XG4gICAgICByZXR1cm4gIW9iai5uYW1lIHx8IG9iai5uYW1lID09PSBcIlwiID8gXCJbRnVuY3Rpb25dXCIgOiBcIltGdW5jdGlvbjogXCIgKyBvYmoubmFtZSArIFwiXVwiO1xuICAgIH0gZWxzZSBpZiAodHlwZTMgPT09IFwiW29iamVjdCBBcnJheV1cIikge1xuICAgICAgcmV0dXJuIFwiWyBBcnJheShcIiArIG9iai5sZW5ndGggKyBcIikgXVwiO1xuICAgIH0gZWxzZSBpZiAodHlwZTMgPT09IFwiW29iamVjdCBPYmplY3RdXCIpIHtcbiAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMob2JqKSwga3N0ciA9IGtleXMubGVuZ3RoID4gMiA/IGtleXMuc3BsaWNlKDAsIDIpLmpvaW4oXCIsIFwiKSArIFwiLCAuLi5cIiA6IGtleXMuam9pbihcIiwgXCIpO1xuICAgICAgcmV0dXJuIFwieyBPYmplY3QgKFwiICsga3N0ciArIFwiKSB9XCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBzdHI7XG4gIH1cbn1cbl9fbmFtZShvYmpEaXNwbGF5LCBcIm9iakRpc3BsYXlcIik7XG5cbi8vIGxpYi9jaGFpL3V0aWxzL2dldE1lc3NhZ2UuanNcbmZ1bmN0aW9uIGdldE1lc3NhZ2UyKG9iaiwgYXJncykge1xuICBsZXQgbmVnYXRlID0gZmxhZyhvYmosIFwibmVnYXRlXCIpO1xuICBsZXQgdmFsID0gZmxhZyhvYmosIFwib2JqZWN0XCIpO1xuICBsZXQgZXhwZWN0ZWQgPSBhcmdzWzNdO1xuICBsZXQgYWN0dWFsID0gZ2V0QWN0dWFsKG9iaiwgYXJncyk7XG4gIGxldCBtc2cgPSBuZWdhdGUgPyBhcmdzWzJdIDogYXJnc1sxXTtcbiAgbGV0IGZsYWdNc2cgPSBmbGFnKG9iaiwgXCJtZXNzYWdlXCIpO1xuICBpZiAodHlwZW9mIG1zZyA9PT0gXCJmdW5jdGlvblwiKSBtc2cgPSBtc2coKTtcbiAgbXNnID0gbXNnIHx8IFwiXCI7XG4gIG1zZyA9IG1zZy5yZXBsYWNlKC8jXFx7dGhpc1xcfS9nLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gb2JqRGlzcGxheSh2YWwpO1xuICB9KS5yZXBsYWNlKC8jXFx7YWN0XFx9L2csIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBvYmpEaXNwbGF5KGFjdHVhbCk7XG4gIH0pLnJlcGxhY2UoLyNcXHtleHBcXH0vZywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG9iakRpc3BsYXkoZXhwZWN0ZWQpO1xuICB9KTtcbiAgcmV0dXJuIGZsYWdNc2cgPyBmbGFnTXNnICsgXCI6IFwiICsgbXNnIDogbXNnO1xufVxuX19uYW1lKGdldE1lc3NhZ2UyLCBcImdldE1lc3NhZ2VcIik7XG5cbi8vIGxpYi9jaGFpL3V0aWxzL3RyYW5zZmVyRmxhZ3MuanNcbmZ1bmN0aW9uIHRyYW5zZmVyRmxhZ3MoYXNzZXJ0aW9uLCBvYmplY3QsIGluY2x1ZGVBbGwpIHtcbiAgbGV0IGZsYWdzID0gYXNzZXJ0aW9uLl9fZmxhZ3MgfHwgKGFzc2VydGlvbi5fX2ZsYWdzID0gLyogQF9fUFVSRV9fICovIE9iamVjdC5jcmVhdGUobnVsbCkpO1xuICBpZiAoIW9iamVjdC5fX2ZsYWdzKSB7XG4gICAgb2JqZWN0Ll9fZmxhZ3MgPSAvKiBAX19QVVJFX18gKi8gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgfVxuICBpbmNsdWRlQWxsID0gYXJndW1lbnRzLmxlbmd0aCA9PT0gMyA/IGluY2x1ZGVBbGwgOiB0cnVlO1xuICBmb3IgKGxldCBmbGFnMyBpbiBmbGFncykge1xuICAgIGlmIChpbmNsdWRlQWxsIHx8IGZsYWczICE9PSBcIm9iamVjdFwiICYmIGZsYWczICE9PSBcInNzZmlcIiAmJiBmbGFnMyAhPT0gXCJsb2NrU3NmaVwiICYmIGZsYWczICE9IFwibWVzc2FnZVwiKSB7XG4gICAgICBvYmplY3QuX19mbGFnc1tmbGFnM10gPSBmbGFnc1tmbGFnM107XG4gICAgfVxuICB9XG59XG5fX25hbWUodHJhbnNmZXJGbGFncywgXCJ0cmFuc2ZlckZsYWdzXCIpO1xuXG4vLyBub2RlX21vZHVsZXMvZGVlcC1lcWwvaW5kZXguanNcbmZ1bmN0aW9uIHR5cGUyKG9iaikge1xuICBpZiAodHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiBcInVuZGVmaW5lZFwiO1xuICB9XG4gIGlmIChvYmogPT09IG51bGwpIHtcbiAgICByZXR1cm4gXCJudWxsXCI7XG4gIH1cbiAgY29uc3Qgc3RyaW5nVGFnID0gb2JqW1N5bWJvbC50b1N0cmluZ1RhZ107XG4gIGlmICh0eXBlb2Ygc3RyaW5nVGFnID09PSBcInN0cmluZ1wiKSB7XG4gICAgcmV0dXJuIHN0cmluZ1RhZztcbiAgfVxuICBjb25zdCBzbGljZVN0YXJ0ID0gODtcbiAgY29uc3Qgc2xpY2VFbmQgPSAtMTtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopLnNsaWNlKHNsaWNlU3RhcnQsIHNsaWNlRW5kKTtcbn1cbl9fbmFtZSh0eXBlMiwgXCJ0eXBlXCIpO1xuZnVuY3Rpb24gRmFrZU1hcCgpIHtcbiAgdGhpcy5fa2V5ID0gXCJjaGFpL2RlZXAtZXFsX19cIiArIE1hdGgucmFuZG9tKCkgKyBEYXRlLm5vdygpO1xufVxuX19uYW1lKEZha2VNYXAsIFwiRmFrZU1hcFwiKTtcbkZha2VNYXAucHJvdG90eXBlID0ge1xuICBnZXQ6IC8qIEBfX1BVUkVfXyAqLyBfX25hbWUoZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgIHJldHVybiBrZXlbdGhpcy5fa2V5XTtcbiAgfSwgXCJnZXRcIiksXG4gIHNldDogLyogQF9fUFVSRV9fICovIF9fbmFtZShmdW5jdGlvbiBzZXQoa2V5LCB2YWx1ZSkge1xuICAgIGlmIChPYmplY3QuaXNFeHRlbnNpYmxlKGtleSkpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShrZXksIHRoaXMuX2tleSwge1xuICAgICAgICB2YWx1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICB9KTtcbiAgICB9XG4gIH0sIFwic2V0XCIpXG59O1xudmFyIE1lbW9pemVNYXAgPSB0eXBlb2YgV2Vha01hcCA9PT0gXCJmdW5jdGlvblwiID8gV2Vha01hcCA6IEZha2VNYXA7XG5mdW5jdGlvbiBtZW1vaXplQ29tcGFyZShsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQsIG1lbW9pemVNYXApIHtcbiAgaWYgKCFtZW1vaXplTWFwIHx8IGlzUHJpbWl0aXZlKGxlZnRIYW5kT3BlcmFuZCkgfHwgaXNQcmltaXRpdmUocmlnaHRIYW5kT3BlcmFuZCkpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB2YXIgbGVmdEhhbmRNYXAgPSBtZW1vaXplTWFwLmdldChsZWZ0SGFuZE9wZXJhbmQpO1xuICBpZiAobGVmdEhhbmRNYXApIHtcbiAgICB2YXIgcmVzdWx0ID0gbGVmdEhhbmRNYXAuZ2V0KHJpZ2h0SGFuZE9wZXJhbmQpO1xuICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSBcImJvb2xlYW5cIikge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5fX25hbWUobWVtb2l6ZUNvbXBhcmUsIFwibWVtb2l6ZUNvbXBhcmVcIik7XG5mdW5jdGlvbiBtZW1vaXplU2V0KGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCwgbWVtb2l6ZU1hcCwgcmVzdWx0KSB7XG4gIGlmICghbWVtb2l6ZU1hcCB8fCBpc1ByaW1pdGl2ZShsZWZ0SGFuZE9wZXJhbmQpIHx8IGlzUHJpbWl0aXZlKHJpZ2h0SGFuZE9wZXJhbmQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBsZWZ0SGFuZE1hcCA9IG1lbW9pemVNYXAuZ2V0KGxlZnRIYW5kT3BlcmFuZCk7XG4gIGlmIChsZWZ0SGFuZE1hcCkge1xuICAgIGxlZnRIYW5kTWFwLnNldChyaWdodEhhbmRPcGVyYW5kLCByZXN1bHQpO1xuICB9IGVsc2Uge1xuICAgIGxlZnRIYW5kTWFwID0gbmV3IE1lbW9pemVNYXAoKTtcbiAgICBsZWZ0SGFuZE1hcC5zZXQocmlnaHRIYW5kT3BlcmFuZCwgcmVzdWx0KTtcbiAgICBtZW1vaXplTWFwLnNldChsZWZ0SGFuZE9wZXJhbmQsIGxlZnRIYW5kTWFwKTtcbiAgfVxufVxuX19uYW1lKG1lbW9pemVTZXQsIFwibWVtb2l6ZVNldFwiKTtcbnZhciBkZWVwX2VxbF9kZWZhdWx0ID0gZGVlcEVxdWFsO1xuZnVuY3Rpb24gZGVlcEVxdWFsKGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCwgb3B0aW9ucykge1xuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmNvbXBhcmF0b3IpIHtcbiAgICByZXR1cm4gZXh0ZW5zaXZlRGVlcEVxdWFsKGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCwgb3B0aW9ucyk7XG4gIH1cbiAgdmFyIHNpbXBsZVJlc3VsdCA9IHNpbXBsZUVxdWFsKGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCk7XG4gIGlmIChzaW1wbGVSZXN1bHQgIT09IG51bGwpIHtcbiAgICByZXR1cm4gc2ltcGxlUmVzdWx0O1xuICB9XG4gIHJldHVybiBleHRlbnNpdmVEZWVwRXF1YWwobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kLCBvcHRpb25zKTtcbn1cbl9fbmFtZShkZWVwRXF1YWwsIFwiZGVlcEVxdWFsXCIpO1xuZnVuY3Rpb24gc2ltcGxlRXF1YWwobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kKSB7XG4gIGlmIChsZWZ0SGFuZE9wZXJhbmQgPT09IHJpZ2h0SGFuZE9wZXJhbmQpIHtcbiAgICByZXR1cm4gbGVmdEhhbmRPcGVyYW5kICE9PSAwIHx8IDEgLyBsZWZ0SGFuZE9wZXJhbmQgPT09IDEgLyByaWdodEhhbmRPcGVyYW5kO1xuICB9XG4gIGlmIChsZWZ0SGFuZE9wZXJhbmQgIT09IGxlZnRIYW5kT3BlcmFuZCAmJiAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNlbGYtY29tcGFyZVxuICByaWdodEhhbmRPcGVyYW5kICE9PSByaWdodEhhbmRPcGVyYW5kKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKGlzUHJpbWl0aXZlKGxlZnRIYW5kT3BlcmFuZCkgfHwgaXNQcmltaXRpdmUocmlnaHRIYW5kT3BlcmFuZCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5fX25hbWUoc2ltcGxlRXF1YWwsIFwic2ltcGxlRXF1YWxcIik7XG5mdW5jdGlvbiBleHRlbnNpdmVEZWVwRXF1YWwobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBvcHRpb25zLm1lbW9pemUgPSBvcHRpb25zLm1lbW9pemUgPT09IGZhbHNlID8gZmFsc2UgOiBvcHRpb25zLm1lbW9pemUgfHwgbmV3IE1lbW9pemVNYXAoKTtcbiAgdmFyIGNvbXBhcmF0b3IgPSBvcHRpb25zICYmIG9wdGlvbnMuY29tcGFyYXRvcjtcbiAgdmFyIG1lbW9pemVSZXN1bHRMZWZ0ID0gbWVtb2l6ZUNvbXBhcmUobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kLCBvcHRpb25zLm1lbW9pemUpO1xuICBpZiAobWVtb2l6ZVJlc3VsdExlZnQgIT09IG51bGwpIHtcbiAgICByZXR1cm4gbWVtb2l6ZVJlc3VsdExlZnQ7XG4gIH1cbiAgdmFyIG1lbW9pemVSZXN1bHRSaWdodCA9IG1lbW9pemVDb21wYXJlKHJpZ2h0SGFuZE9wZXJhbmQsIGxlZnRIYW5kT3BlcmFuZCwgb3B0aW9ucy5tZW1vaXplKTtcbiAgaWYgKG1lbW9pemVSZXN1bHRSaWdodCAhPT0gbnVsbCkge1xuICAgIHJldHVybiBtZW1vaXplUmVzdWx0UmlnaHQ7XG4gIH1cbiAgaWYgKGNvbXBhcmF0b3IpIHtcbiAgICB2YXIgY29tcGFyYXRvclJlc3VsdCA9IGNvbXBhcmF0b3IobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kKTtcbiAgICBpZiAoY29tcGFyYXRvclJlc3VsdCA9PT0gZmFsc2UgfHwgY29tcGFyYXRvclJlc3VsdCA9PT0gdHJ1ZSkge1xuICAgICAgbWVtb2l6ZVNldChsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQsIG9wdGlvbnMubWVtb2l6ZSwgY29tcGFyYXRvclJlc3VsdCk7XG4gICAgICByZXR1cm4gY29tcGFyYXRvclJlc3VsdDtcbiAgICB9XG4gICAgdmFyIHNpbXBsZVJlc3VsdCA9IHNpbXBsZUVxdWFsKGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCk7XG4gICAgaWYgKHNpbXBsZVJlc3VsdCAhPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHNpbXBsZVJlc3VsdDtcbiAgICB9XG4gIH1cbiAgdmFyIGxlZnRIYW5kVHlwZSA9IHR5cGUyKGxlZnRIYW5kT3BlcmFuZCk7XG4gIGlmIChsZWZ0SGFuZFR5cGUgIT09IHR5cGUyKHJpZ2h0SGFuZE9wZXJhbmQpKSB7XG4gICAgbWVtb2l6ZVNldChsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQsIG9wdGlvbnMubWVtb2l6ZSwgZmFsc2UpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBtZW1vaXplU2V0KGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCwgb3B0aW9ucy5tZW1vaXplLCB0cnVlKTtcbiAgdmFyIHJlc3VsdCA9IGV4dGVuc2l2ZURlZXBFcXVhbEJ5VHlwZShsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQsIGxlZnRIYW5kVHlwZSwgb3B0aW9ucyk7XG4gIG1lbW9pemVTZXQobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kLCBvcHRpb25zLm1lbW9pemUsIHJlc3VsdCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5fX25hbWUoZXh0ZW5zaXZlRGVlcEVxdWFsLCBcImV4dGVuc2l2ZURlZXBFcXVhbFwiKTtcbmZ1bmN0aW9uIGV4dGVuc2l2ZURlZXBFcXVhbEJ5VHlwZShsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQsIGxlZnRIYW5kVHlwZSwgb3B0aW9ucykge1xuICBzd2l0Y2ggKGxlZnRIYW5kVHlwZSkge1xuICAgIGNhc2UgXCJTdHJpbmdcIjpcbiAgICBjYXNlIFwiTnVtYmVyXCI6XG4gICAgY2FzZSBcIkJvb2xlYW5cIjpcbiAgICBjYXNlIFwiRGF0ZVwiOlxuICAgICAgcmV0dXJuIGRlZXBFcXVhbChsZWZ0SGFuZE9wZXJhbmQudmFsdWVPZigpLCByaWdodEhhbmRPcGVyYW5kLnZhbHVlT2YoKSk7XG4gICAgY2FzZSBcIlByb21pc2VcIjpcbiAgICBjYXNlIFwiU3ltYm9sXCI6XG4gICAgY2FzZSBcImZ1bmN0aW9uXCI6XG4gICAgY2FzZSBcIldlYWtNYXBcIjpcbiAgICBjYXNlIFwiV2Vha1NldFwiOlxuICAgICAgcmV0dXJuIGxlZnRIYW5kT3BlcmFuZCA9PT0gcmlnaHRIYW5kT3BlcmFuZDtcbiAgICBjYXNlIFwiRXJyb3JcIjpcbiAgICAgIHJldHVybiBrZXlzRXF1YWwobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kLCBbXCJuYW1lXCIsIFwibWVzc2FnZVwiLCBcImNvZGVcIl0sIG9wdGlvbnMpO1xuICAgIGNhc2UgXCJBcmd1bWVudHNcIjpcbiAgICBjYXNlIFwiSW50OEFycmF5XCI6XG4gICAgY2FzZSBcIlVpbnQ4QXJyYXlcIjpcbiAgICBjYXNlIFwiVWludDhDbGFtcGVkQXJyYXlcIjpcbiAgICBjYXNlIFwiSW50MTZBcnJheVwiOlxuICAgIGNhc2UgXCJVaW50MTZBcnJheVwiOlxuICAgIGNhc2UgXCJJbnQzMkFycmF5XCI6XG4gICAgY2FzZSBcIlVpbnQzMkFycmF5XCI6XG4gICAgY2FzZSBcIkZsb2F0MzJBcnJheVwiOlxuICAgIGNhc2UgXCJGbG9hdDY0QXJyYXlcIjpcbiAgICBjYXNlIFwiQXJyYXlcIjpcbiAgICAgIHJldHVybiBpdGVyYWJsZUVxdWFsKGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCwgb3B0aW9ucyk7XG4gICAgY2FzZSBcIlJlZ0V4cFwiOlxuICAgICAgcmV0dXJuIHJlZ2V4cEVxdWFsKGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCk7XG4gICAgY2FzZSBcIkdlbmVyYXRvclwiOlxuICAgICAgcmV0dXJuIGdlbmVyYXRvckVxdWFsKGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCwgb3B0aW9ucyk7XG4gICAgY2FzZSBcIkRhdGFWaWV3XCI6XG4gICAgICByZXR1cm4gaXRlcmFibGVFcXVhbChuZXcgVWludDhBcnJheShsZWZ0SGFuZE9wZXJhbmQuYnVmZmVyKSwgbmV3IFVpbnQ4QXJyYXkocmlnaHRIYW5kT3BlcmFuZC5idWZmZXIpLCBvcHRpb25zKTtcbiAgICBjYXNlIFwiQXJyYXlCdWZmZXJcIjpcbiAgICAgIHJldHVybiBpdGVyYWJsZUVxdWFsKG5ldyBVaW50OEFycmF5KGxlZnRIYW5kT3BlcmFuZCksIG5ldyBVaW50OEFycmF5KHJpZ2h0SGFuZE9wZXJhbmQpLCBvcHRpb25zKTtcbiAgICBjYXNlIFwiU2V0XCI6XG4gICAgICByZXR1cm4gZW50cmllc0VxdWFsKGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCwgb3B0aW9ucyk7XG4gICAgY2FzZSBcIk1hcFwiOlxuICAgICAgcmV0dXJuIGVudHJpZXNFcXVhbChsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQsIG9wdGlvbnMpO1xuICAgIGNhc2UgXCJUZW1wb3JhbC5QbGFpbkRhdGVcIjpcbiAgICBjYXNlIFwiVGVtcG9yYWwuUGxhaW5UaW1lXCI6XG4gICAgY2FzZSBcIlRlbXBvcmFsLlBsYWluRGF0ZVRpbWVcIjpcbiAgICBjYXNlIFwiVGVtcG9yYWwuSW5zdGFudFwiOlxuICAgIGNhc2UgXCJUZW1wb3JhbC5ab25lZERhdGVUaW1lXCI6XG4gICAgY2FzZSBcIlRlbXBvcmFsLlBsYWluWWVhck1vbnRoXCI6XG4gICAgY2FzZSBcIlRlbXBvcmFsLlBsYWluTW9udGhEYXlcIjpcbiAgICAgIHJldHVybiBsZWZ0SGFuZE9wZXJhbmQuZXF1YWxzKHJpZ2h0SGFuZE9wZXJhbmQpO1xuICAgIGNhc2UgXCJUZW1wb3JhbC5EdXJhdGlvblwiOlxuICAgICAgcmV0dXJuIGxlZnRIYW5kT3BlcmFuZC50b3RhbChcIm5hbm9zZWNvbmRzXCIpID09PSByaWdodEhhbmRPcGVyYW5kLnRvdGFsKFwibmFub3NlY29uZHNcIik7XG4gICAgY2FzZSBcIlRlbXBvcmFsLlRpbWVab25lXCI6XG4gICAgY2FzZSBcIlRlbXBvcmFsLkNhbGVuZGFyXCI6XG4gICAgICByZXR1cm4gbGVmdEhhbmRPcGVyYW5kLnRvU3RyaW5nKCkgPT09IHJpZ2h0SGFuZE9wZXJhbmQudG9TdHJpbmcoKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIG9iamVjdEVxdWFsKGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCwgb3B0aW9ucyk7XG4gIH1cbn1cbl9fbmFtZShleHRlbnNpdmVEZWVwRXF1YWxCeVR5cGUsIFwiZXh0ZW5zaXZlRGVlcEVxdWFsQnlUeXBlXCIpO1xuZnVuY3Rpb24gcmVnZXhwRXF1YWwobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kKSB7XG4gIHJldHVybiBsZWZ0SGFuZE9wZXJhbmQudG9TdHJpbmcoKSA9PT0gcmlnaHRIYW5kT3BlcmFuZC50b1N0cmluZygpO1xufVxuX19uYW1lKHJlZ2V4cEVxdWFsLCBcInJlZ2V4cEVxdWFsXCIpO1xuZnVuY3Rpb24gZW50cmllc0VxdWFsKGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCwgb3B0aW9ucykge1xuICB0cnkge1xuICAgIGlmIChsZWZ0SGFuZE9wZXJhbmQuc2l6ZSAhPT0gcmlnaHRIYW5kT3BlcmFuZC5zaXplKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChsZWZ0SGFuZE9wZXJhbmQuc2l6ZSA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9IGNhdGNoIChzaXplRXJyb3IpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGxlZnRIYW5kSXRlbXMgPSBbXTtcbiAgdmFyIHJpZ2h0SGFuZEl0ZW1zID0gW107XG4gIGxlZnRIYW5kT3BlcmFuZC5mb3JFYWNoKC8qIEBfX1BVUkVfXyAqLyBfX25hbWUoZnVuY3Rpb24gZ2F0aGVyRW50cmllcyhrZXksIHZhbHVlKSB7XG4gICAgbGVmdEhhbmRJdGVtcy5wdXNoKFtrZXksIHZhbHVlXSk7XG4gIH0sIFwiZ2F0aGVyRW50cmllc1wiKSk7XG4gIHJpZ2h0SGFuZE9wZXJhbmQuZm9yRWFjaCgvKiBAX19QVVJFX18gKi8gX19uYW1lKGZ1bmN0aW9uIGdhdGhlckVudHJpZXMoa2V5LCB2YWx1ZSkge1xuICAgIHJpZ2h0SGFuZEl0ZW1zLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgfSwgXCJnYXRoZXJFbnRyaWVzXCIpKTtcbiAgcmV0dXJuIGl0ZXJhYmxlRXF1YWwobGVmdEhhbmRJdGVtcy5zb3J0KCksIHJpZ2h0SGFuZEl0ZW1zLnNvcnQoKSwgb3B0aW9ucyk7XG59XG5fX25hbWUoZW50cmllc0VxdWFsLCBcImVudHJpZXNFcXVhbFwiKTtcbmZ1bmN0aW9uIGl0ZXJhYmxlRXF1YWwobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kLCBvcHRpb25zKSB7XG4gIHZhciBsZW5ndGggPSBsZWZ0SGFuZE9wZXJhbmQubGVuZ3RoO1xuICBpZiAobGVuZ3RoICE9PSByaWdodEhhbmRPcGVyYW5kLmxlbmd0aCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAobGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdmFyIGluZGV4ID0gLTE7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKGRlZXBFcXVhbChsZWZ0SGFuZE9wZXJhbmRbaW5kZXhdLCByaWdodEhhbmRPcGVyYW5kW2luZGV4XSwgb3B0aW9ucykgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuX19uYW1lKGl0ZXJhYmxlRXF1YWwsIFwiaXRlcmFibGVFcXVhbFwiKTtcbmZ1bmN0aW9uIGdlbmVyYXRvckVxdWFsKGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCwgb3B0aW9ucykge1xuICByZXR1cm4gaXRlcmFibGVFcXVhbChnZXRHZW5lcmF0b3JFbnRyaWVzKGxlZnRIYW5kT3BlcmFuZCksIGdldEdlbmVyYXRvckVudHJpZXMocmlnaHRIYW5kT3BlcmFuZCksIG9wdGlvbnMpO1xufVxuX19uYW1lKGdlbmVyYXRvckVxdWFsLCBcImdlbmVyYXRvckVxdWFsXCIpO1xuZnVuY3Rpb24gaGFzSXRlcmF0b3JGdW5jdGlvbih0YXJnZXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIHRhcmdldCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiB0YXJnZXRbU3ltYm9sLml0ZXJhdG9yXSA9PT0gXCJmdW5jdGlvblwiO1xufVxuX19uYW1lKGhhc0l0ZXJhdG9yRnVuY3Rpb24sIFwiaGFzSXRlcmF0b3JGdW5jdGlvblwiKTtcbmZ1bmN0aW9uIGdldEl0ZXJhdG9yRW50cmllcyh0YXJnZXQpIHtcbiAgaWYgKGhhc0l0ZXJhdG9yRnVuY3Rpb24odGFyZ2V0KSkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gZ2V0R2VuZXJhdG9yRW50cmllcyh0YXJnZXRbU3ltYm9sLml0ZXJhdG9yXSgpKTtcbiAgICB9IGNhdGNoIChpdGVyYXRvckVycm9yKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICB9XG4gIHJldHVybiBbXTtcbn1cbl9fbmFtZShnZXRJdGVyYXRvckVudHJpZXMsIFwiZ2V0SXRlcmF0b3JFbnRyaWVzXCIpO1xuZnVuY3Rpb24gZ2V0R2VuZXJhdG9yRW50cmllcyhnZW5lcmF0b3IpIHtcbiAgdmFyIGdlbmVyYXRvclJlc3VsdCA9IGdlbmVyYXRvci5uZXh0KCk7XG4gIHZhciBhY2N1bXVsYXRvciA9IFtnZW5lcmF0b3JSZXN1bHQudmFsdWVdO1xuICB3aGlsZSAoZ2VuZXJhdG9yUmVzdWx0LmRvbmUgPT09IGZhbHNlKSB7XG4gICAgZ2VuZXJhdG9yUmVzdWx0ID0gZ2VuZXJhdG9yLm5leHQoKTtcbiAgICBhY2N1bXVsYXRvci5wdXNoKGdlbmVyYXRvclJlc3VsdC52YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIGFjY3VtdWxhdG9yO1xufVxuX19uYW1lKGdldEdlbmVyYXRvckVudHJpZXMsIFwiZ2V0R2VuZXJhdG9yRW50cmllc1wiKTtcbmZ1bmN0aW9uIGdldEVudW1lcmFibGVLZXlzKHRhcmdldCkge1xuICB2YXIga2V5cyA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gdGFyZ2V0KSB7XG4gICAga2V5cy5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIGtleXM7XG59XG5fX25hbWUoZ2V0RW51bWVyYWJsZUtleXMsIFwiZ2V0RW51bWVyYWJsZUtleXNcIik7XG5mdW5jdGlvbiBnZXRFbnVtZXJhYmxlU3ltYm9scyh0YXJnZXQpIHtcbiAgdmFyIGtleXMgPSBbXTtcbiAgdmFyIGFsbEtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHRhcmdldCk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYWxsS2V5cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIHZhciBrZXkgPSBhbGxLZXlzW2ldO1xuICAgIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KS5lbnVtZXJhYmxlKSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGtleXM7XG59XG5fX25hbWUoZ2V0RW51bWVyYWJsZVN5bWJvbHMsIFwiZ2V0RW51bWVyYWJsZVN5bWJvbHNcIik7XG5mdW5jdGlvbiBrZXlzRXF1YWwobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kLCBrZXlzLCBvcHRpb25zKSB7XG4gIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgaWYgKGxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICBpZiAoZGVlcEVxdWFsKGxlZnRIYW5kT3BlcmFuZFtrZXlzW2ldXSwgcmlnaHRIYW5kT3BlcmFuZFtrZXlzW2ldXSwgb3B0aW9ucykgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuX19uYW1lKGtleXNFcXVhbCwgXCJrZXlzRXF1YWxcIik7XG5mdW5jdGlvbiBvYmplY3RFcXVhbChsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQsIG9wdGlvbnMpIHtcbiAgdmFyIGxlZnRIYW5kS2V5cyA9IGdldEVudW1lcmFibGVLZXlzKGxlZnRIYW5kT3BlcmFuZCk7XG4gIHZhciByaWdodEhhbmRLZXlzID0gZ2V0RW51bWVyYWJsZUtleXMocmlnaHRIYW5kT3BlcmFuZCk7XG4gIHZhciBsZWZ0SGFuZFN5bWJvbHMgPSBnZXRFbnVtZXJhYmxlU3ltYm9scyhsZWZ0SGFuZE9wZXJhbmQpO1xuICB2YXIgcmlnaHRIYW5kU3ltYm9scyA9IGdldEVudW1lcmFibGVTeW1ib2xzKHJpZ2h0SGFuZE9wZXJhbmQpO1xuICBsZWZ0SGFuZEtleXMgPSBsZWZ0SGFuZEtleXMuY29uY2F0KGxlZnRIYW5kU3ltYm9scyk7XG4gIHJpZ2h0SGFuZEtleXMgPSByaWdodEhhbmRLZXlzLmNvbmNhdChyaWdodEhhbmRTeW1ib2xzKTtcbiAgaWYgKGxlZnRIYW5kS2V5cy5sZW5ndGggJiYgbGVmdEhhbmRLZXlzLmxlbmd0aCA9PT0gcmlnaHRIYW5kS2V5cy5sZW5ndGgpIHtcbiAgICBpZiAoaXRlcmFibGVFcXVhbChtYXBTeW1ib2xzKGxlZnRIYW5kS2V5cykuc29ydCgpLCBtYXBTeW1ib2xzKHJpZ2h0SGFuZEtleXMpLnNvcnQoKSkgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBrZXlzRXF1YWwobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kLCBsZWZ0SGFuZEtleXMsIG9wdGlvbnMpO1xuICB9XG4gIHZhciBsZWZ0SGFuZEVudHJpZXMgPSBnZXRJdGVyYXRvckVudHJpZXMobGVmdEhhbmRPcGVyYW5kKTtcbiAgdmFyIHJpZ2h0SGFuZEVudHJpZXMgPSBnZXRJdGVyYXRvckVudHJpZXMocmlnaHRIYW5kT3BlcmFuZCk7XG4gIGlmIChsZWZ0SGFuZEVudHJpZXMubGVuZ3RoICYmIGxlZnRIYW5kRW50cmllcy5sZW5ndGggPT09IHJpZ2h0SGFuZEVudHJpZXMubGVuZ3RoKSB7XG4gICAgbGVmdEhhbmRFbnRyaWVzLnNvcnQoKTtcbiAgICByaWdodEhhbmRFbnRyaWVzLnNvcnQoKTtcbiAgICByZXR1cm4gaXRlcmFibGVFcXVhbChsZWZ0SGFuZEVudHJpZXMsIHJpZ2h0SGFuZEVudHJpZXMsIG9wdGlvbnMpO1xuICB9XG4gIGlmIChsZWZ0SGFuZEtleXMubGVuZ3RoID09PSAwICYmIGxlZnRIYW5kRW50cmllcy5sZW5ndGggPT09IDAgJiYgcmlnaHRIYW5kS2V5cy5sZW5ndGggPT09IDAgJiYgcmlnaHRIYW5kRW50cmllcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5fX25hbWUob2JqZWN0RXF1YWwsIFwib2JqZWN0RXF1YWxcIik7XG5mdW5jdGlvbiBpc1ByaW1pdGl2ZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT09IG51bGwgfHwgdHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiO1xufVxuX19uYW1lKGlzUHJpbWl0aXZlLCBcImlzUHJpbWl0aXZlXCIpO1xuZnVuY3Rpb24gbWFwU3ltYm9scyhhcnIpIHtcbiAgcmV0dXJuIGFyci5tYXAoLyogQF9fUFVSRV9fICovIF9fbmFtZShmdW5jdGlvbiBtYXBTeW1ib2woZW50cnkpIHtcbiAgICBpZiAodHlwZW9mIGVudHJ5ID09PSBcInN5bWJvbFwiKSB7XG4gICAgICByZXR1cm4gZW50cnkudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgcmV0dXJuIGVudHJ5O1xuICB9LCBcIm1hcFN5bWJvbFwiKSk7XG59XG5fX25hbWUobWFwU3ltYm9scywgXCJtYXBTeW1ib2xzXCIpO1xuXG4vLyBub2RlX21vZHVsZXMvcGF0aHZhbC9pbmRleC5qc1xuZnVuY3Rpb24gaGFzUHJvcGVydHkob2JqLCBuYW1lKSB7XG4gIGlmICh0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiIHx8IG9iaiA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gbmFtZSBpbiBPYmplY3Qob2JqKTtcbn1cbl9fbmFtZShoYXNQcm9wZXJ0eSwgXCJoYXNQcm9wZXJ0eVwiKTtcbmZ1bmN0aW9uIHBhcnNlUGF0aChwYXRoKSB7XG4gIGNvbnN0IHN0ciA9IHBhdGgucmVwbGFjZSgvKFteXFxcXF0pXFxbL2csIFwiJDEuW1wiKTtcbiAgY29uc3QgcGFydHMgPSBzdHIubWF0Y2goLyhcXFxcXFwufFteLl0rPykrL2cpO1xuICByZXR1cm4gcGFydHMubWFwKCh2YWx1ZSkgPT4ge1xuICAgIGlmICh2YWx1ZSA9PT0gXCJjb25zdHJ1Y3RvclwiIHx8IHZhbHVlID09PSBcIl9fcHJvdG9fX1wiIHx8IHZhbHVlID09PSBcInByb3RvdHlwZVwiKSB7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuICAgIGNvbnN0IHJlZ2V4cCA9IC9eXFxbKFxcZCspXFxdJC87XG4gICAgY29uc3QgbUFyciA9IHJlZ2V4cC5leGVjKHZhbHVlKTtcbiAgICBsZXQgcGFyc2VkID0gbnVsbDtcbiAgICBpZiAobUFycikge1xuICAgICAgcGFyc2VkID0geyBpOiBwYXJzZUZsb2F0KG1BcnJbMV0pIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcnNlZCA9IHsgcDogdmFsdWUucmVwbGFjZSgvXFxcXChbLltcXF1dKS9nLCBcIiQxXCIpIH07XG4gICAgfVxuICAgIHJldHVybiBwYXJzZWQ7XG4gIH0pO1xufVxuX19uYW1lKHBhcnNlUGF0aCwgXCJwYXJzZVBhdGhcIik7XG5mdW5jdGlvbiBpbnRlcm5hbEdldFBhdGhWYWx1ZShvYmosIHBhcnNlZCwgcGF0aERlcHRoKSB7XG4gIGxldCB0ZW1wb3JhcnlWYWx1ZSA9IG9iajtcbiAgbGV0IHJlcyA9IG51bGw7XG4gIHBhdGhEZXB0aCA9IHR5cGVvZiBwYXRoRGVwdGggPT09IFwidW5kZWZpbmVkXCIgPyBwYXJzZWQubGVuZ3RoIDogcGF0aERlcHRoO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHBhdGhEZXB0aDsgaSsrKSB7XG4gICAgY29uc3QgcGFydCA9IHBhcnNlZFtpXTtcbiAgICBpZiAodGVtcG9yYXJ5VmFsdWUpIHtcbiAgICAgIGlmICh0eXBlb2YgcGFydC5wID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIHRlbXBvcmFyeVZhbHVlID0gdGVtcG9yYXJ5VmFsdWVbcGFydC5pXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRlbXBvcmFyeVZhbHVlID0gdGVtcG9yYXJ5VmFsdWVbcGFydC5wXTtcbiAgICAgIH1cbiAgICAgIGlmIChpID09PSBwYXRoRGVwdGggLSAxKSB7XG4gICAgICAgIHJlcyA9IHRlbXBvcmFyeVZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzO1xufVxuX19uYW1lKGludGVybmFsR2V0UGF0aFZhbHVlLCBcImludGVybmFsR2V0UGF0aFZhbHVlXCIpO1xuZnVuY3Rpb24gZ2V0UGF0aEluZm8ob2JqLCBwYXRoKSB7XG4gIGNvbnN0IHBhcnNlZCA9IHBhcnNlUGF0aChwYXRoKTtcbiAgY29uc3QgbGFzdCA9IHBhcnNlZFtwYXJzZWQubGVuZ3RoIC0gMV07XG4gIGNvbnN0IGluZm8gPSB7XG4gICAgcGFyZW50OiBwYXJzZWQubGVuZ3RoID4gMSA/IGludGVybmFsR2V0UGF0aFZhbHVlKG9iaiwgcGFyc2VkLCBwYXJzZWQubGVuZ3RoIC0gMSkgOiBvYmosXG4gICAgbmFtZTogbGFzdC5wIHx8IGxhc3QuaSxcbiAgICB2YWx1ZTogaW50ZXJuYWxHZXRQYXRoVmFsdWUob2JqLCBwYXJzZWQpXG4gIH07XG4gIGluZm8uZXhpc3RzID0gaGFzUHJvcGVydHkoaW5mby5wYXJlbnQsIGluZm8ubmFtZSk7XG4gIHJldHVybiBpbmZvO1xufVxuX19uYW1lKGdldFBhdGhJbmZvLCBcImdldFBhdGhJbmZvXCIpO1xuXG4vLyBsaWIvY2hhaS9hc3NlcnRpb24uanNcbnZhciBBc3NlcnRpb24gPSBjbGFzcyBfQXNzZXJ0aW9uIHtcbiAgc3RhdGljIHtcbiAgICBfX25hbWUodGhpcywgXCJBc3NlcnRpb25cIik7XG4gIH1cbiAgLyoqIEB0eXBlIHt7fX0gKi9cbiAgX19mbGFncyA9IHt9O1xuICAvKipcbiAgICogQ3JlYXRlcyBvYmplY3QgZm9yIGNoYWluaW5nLlxuICAgKiBgQXNzZXJ0aW9uYCBvYmplY3RzIGNvbnRhaW4gbWV0YWRhdGEgaW4gdGhlIGZvcm0gb2YgZmxhZ3MuIFRocmVlIGZsYWdzIGNhblxuICAgKiBiZSBhc3NpZ25lZCBkdXJpbmcgaW5zdGFudGlhdGlvbiBieSBwYXNzaW5nIGFyZ3VtZW50cyB0byB0aGlzIGNvbnN0cnVjdG9yOlxuICAgKlxuICAgKiAtIGBvYmplY3RgOiBUaGlzIGZsYWcgY29udGFpbnMgdGhlIHRhcmdldCBvZiB0aGUgYXNzZXJ0aW9uLiBGb3IgZXhhbXBsZSwgaW5cbiAgICogdGhlIGFzc2VydGlvbiBgZXhwZWN0KG51bUtpdHRlbnMpLnRvLmVxdWFsKDcpO2AsIHRoZSBgb2JqZWN0YCBmbGFnIHdpbGxcbiAgICogY29udGFpbiBgbnVtS2l0dGVuc2Agc28gdGhhdCB0aGUgYGVxdWFsYCBhc3NlcnRpb24gY2FuIHJlZmVyZW5jZSBpdCB3aGVuXG4gICAqIG5lZWRlZC5cbiAgICpcbiAgICogLSBgbWVzc2FnZWA6IFRoaXMgZmxhZyBjb250YWlucyBhbiBvcHRpb25hbCBjdXN0b20gZXJyb3IgbWVzc2FnZSB0byBiZVxuICAgKiBwcmVwZW5kZWQgdG8gdGhlIGVycm9yIG1lc3NhZ2UgdGhhdCdzIGdlbmVyYXRlZCBieSB0aGUgYXNzZXJ0aW9uIHdoZW4gaXRcbiAgICogZmFpbHMuXG4gICAqXG4gICAqIC0gYHNzZmlgOiBUaGlzIGZsYWcgc3RhbmRzIGZvciBcInN0YXJ0IHN0YWNrIGZ1bmN0aW9uIGluZGljYXRvclwiLiBJdFxuICAgKiBjb250YWlucyBhIGZ1bmN0aW9uIHJlZmVyZW5jZSB0aGF0IHNlcnZlcyBhcyB0aGUgc3RhcnRpbmcgcG9pbnQgZm9yXG4gICAqIHJlbW92aW5nIGZyYW1lcyBmcm9tIHRoZSBzdGFjayB0cmFjZSBvZiB0aGUgZXJyb3IgdGhhdCdzIGNyZWF0ZWQgYnkgdGhlXG4gICAqIGFzc2VydGlvbiB3aGVuIGl0IGZhaWxzLiBUaGUgZ29hbCBpcyB0byBwcm92aWRlIGEgY2xlYW5lciBzdGFjayB0cmFjZSB0b1xuICAgKiBlbmQgdXNlcnMgYnkgcmVtb3ZpbmcgQ2hhaSdzIGludGVybmFsIGZ1bmN0aW9ucy4gTm90ZSB0aGF0IGl0IG9ubHkgd29ya3NcbiAgICogaW4gZW52aXJvbm1lbnRzIHRoYXQgc3VwcG9ydCBgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2VgLCBhbmQgb25seSB3aGVuXG4gICAqIGBDaGFpLmNvbmZpZy5pbmNsdWRlU3RhY2tgIGhhc24ndCBiZWVuIHNldCB0byBgZmFsc2VgLlxuICAgKlxuICAgKiAtIGBsb2NrU3NmaWA6IFRoaXMgZmxhZyBjb250cm9scyB3aGV0aGVyIG9yIG5vdCB0aGUgZ2l2ZW4gYHNzZmlgIGZsYWdcbiAgICogc2hvdWxkIHJldGFpbiBpdHMgY3VycmVudCB2YWx1ZSwgZXZlbiBhcyBhc3NlcnRpb25zIGFyZSBjaGFpbmVkIG9mZiBvZlxuICAgKiB0aGlzIG9iamVjdC4gVGhpcyBpcyB1c3VhbGx5IHNldCB0byBgdHJ1ZWAgd2hlbiBjcmVhdGluZyBhIG5ldyBhc3NlcnRpb25cbiAgICogZnJvbSB3aXRoaW4gYW5vdGhlciBhc3NlcnRpb24uIEl0J3MgYWxzbyB0ZW1wb3JhcmlseSBzZXQgdG8gYHRydWVgIGJlZm9yZVxuICAgKiBhbiBvdmVyd3JpdHRlbiBhc3NlcnRpb24gZ2V0cyBjYWxsZWQgYnkgdGhlIG92ZXJ3cml0aW5nIGFzc2VydGlvbi5cbiAgICpcbiAgICogLSBgZXFsYDogVGhpcyBmbGFnIGNvbnRhaW5zIHRoZSBkZWVwRXF1YWwgZnVuY3Rpb24gdG8gYmUgdXNlZCBieSB0aGUgYXNzZXJ0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge3Vua25vd259IG9iaiB0YXJnZXQgb2YgdGhlIGFzc2VydGlvblxuICAgKiBAcGFyYW0ge3N0cmluZ30gW21zZ10gKG9wdGlvbmFsKSBjdXN0b20gZXJyb3IgbWVzc2FnZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbc3NmaV0gKG9wdGlvbmFsKSBzdGFydGluZyBwb2ludCBmb3IgcmVtb3Zpbmcgc3RhY2sgZnJhbWVzXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2xvY2tTc2ZpXSAob3B0aW9uYWwpIHdoZXRoZXIgb3Igbm90IHRoZSBzc2ZpIGZsYWcgaXMgbG9ja2VkXG4gICAqL1xuICBjb25zdHJ1Y3RvcihvYmosIG1zZywgc3NmaSwgbG9ja1NzZmkpIHtcbiAgICBmbGFnKHRoaXMsIFwic3NmaVwiLCBzc2ZpIHx8IF9Bc3NlcnRpb24pO1xuICAgIGZsYWcodGhpcywgXCJsb2NrU3NmaVwiLCBsb2NrU3NmaSk7XG4gICAgZmxhZyh0aGlzLCBcIm9iamVjdFwiLCBvYmopO1xuICAgIGZsYWcodGhpcywgXCJtZXNzYWdlXCIsIG1zZyk7XG4gICAgZmxhZyh0aGlzLCBcImVxbFwiLCBjb25maWcuZGVlcEVxdWFsIHx8IGRlZXBfZXFsX2RlZmF1bHQpO1xuICAgIHJldHVybiBwcm94aWZ5KHRoaXMpO1xuICB9XG4gIC8qKiBAcmV0dXJucyB7Ym9vbGVhbn0gKi9cbiAgc3RhdGljIGdldCBpbmNsdWRlU3RhY2soKSB7XG4gICAgY29uc29sZS53YXJuKFxuICAgICAgXCJBc3NlcnRpb24uaW5jbHVkZVN0YWNrIGlzIGRlcHJlY2F0ZWQsIHVzZSBjaGFpLmNvbmZpZy5pbmNsdWRlU3RhY2sgaW5zdGVhZC5cIlxuICAgICk7XG4gICAgcmV0dXJuIGNvbmZpZy5pbmNsdWRlU3RhY2s7XG4gIH1cbiAgLyoqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsdWUgKi9cbiAgc3RhdGljIHNldCBpbmNsdWRlU3RhY2sodmFsdWUpIHtcbiAgICBjb25zb2xlLndhcm4oXG4gICAgICBcIkFzc2VydGlvbi5pbmNsdWRlU3RhY2sgaXMgZGVwcmVjYXRlZCwgdXNlIGNoYWkuY29uZmlnLmluY2x1ZGVTdGFjayBpbnN0ZWFkLlwiXG4gICAgKTtcbiAgICBjb25maWcuaW5jbHVkZVN0YWNrID0gdmFsdWU7XG4gIH1cbiAgLyoqIEByZXR1cm5zIHtib29sZWFufSAqL1xuICBzdGF0aWMgZ2V0IHNob3dEaWZmKCkge1xuICAgIGNvbnNvbGUud2FybihcbiAgICAgIFwiQXNzZXJ0aW9uLnNob3dEaWZmIGlzIGRlcHJlY2F0ZWQsIHVzZSBjaGFpLmNvbmZpZy5zaG93RGlmZiBpbnN0ZWFkLlwiXG4gICAgKTtcbiAgICByZXR1cm4gY29uZmlnLnNob3dEaWZmO1xuICB9XG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW59IHZhbHVlICovXG4gIHN0YXRpYyBzZXQgc2hvd0RpZmYodmFsdWUpIHtcbiAgICBjb25zb2xlLndhcm4oXG4gICAgICBcIkFzc2VydGlvbi5zaG93RGlmZiBpcyBkZXByZWNhdGVkLCB1c2UgY2hhaS5jb25maWcuc2hvd0RpZmYgaW5zdGVhZC5cIlxuICAgICk7XG4gICAgY29uZmlnLnNob3dEaWZmID0gdmFsdWU7XG4gIH1cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAqL1xuICBzdGF0aWMgYWRkUHJvcGVydHkobmFtZSwgZm4pIHtcbiAgICBhZGRQcm9wZXJ0eSh0aGlzLnByb3RvdHlwZSwgbmFtZSwgZm4pO1xuICB9XG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgKi9cbiAgc3RhdGljIGFkZE1ldGhvZChuYW1lLCBmbikge1xuICAgIGFkZE1ldGhvZCh0aGlzLnByb3RvdHlwZSwgbmFtZSwgZm4pO1xuICB9XG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjaGFpbmluZ0JlaGF2aW9yXG4gICAqL1xuICBzdGF0aWMgYWRkQ2hhaW5hYmxlTWV0aG9kKG5hbWUsIGZuLCBjaGFpbmluZ0JlaGF2aW9yKSB7XG4gICAgYWRkQ2hhaW5hYmxlTWV0aG9kKHRoaXMucHJvdG90eXBlLCBuYW1lLCBmbiwgY2hhaW5pbmdCZWhhdmlvcik7XG4gIH1cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAqL1xuICBzdGF0aWMgb3ZlcndyaXRlUHJvcGVydHkobmFtZSwgZm4pIHtcbiAgICBvdmVyd3JpdGVQcm9wZXJ0eSh0aGlzLnByb3RvdHlwZSwgbmFtZSwgZm4pO1xuICB9XG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgKi9cbiAgc3RhdGljIG92ZXJ3cml0ZU1ldGhvZChuYW1lLCBmbikge1xuICAgIG92ZXJ3cml0ZU1ldGhvZCh0aGlzLnByb3RvdHlwZSwgbmFtZSwgZm4pO1xuICB9XG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjaGFpbmluZ0JlaGF2aW9yXG4gICAqL1xuICBzdGF0aWMgb3ZlcndyaXRlQ2hhaW5hYmxlTWV0aG9kKG5hbWUsIGZuLCBjaGFpbmluZ0JlaGF2aW9yKSB7XG4gICAgb3ZlcndyaXRlQ2hhaW5hYmxlTWV0aG9kKHRoaXMucHJvdG90eXBlLCBuYW1lLCBmbiwgY2hhaW5pbmdCZWhhdmlvcik7XG4gIH1cbiAgLyoqXG4gICAqICMjIyAuYXNzZXJ0KGV4cHJlc3Npb24sIG1lc3NhZ2UsIG5lZ2F0ZU1lc3NhZ2UsIGV4cGVjdGVkLCBhY3R1YWwsIHNob3dEaWZmKVxuICAgKlxuICAgKiBFeGVjdXRlcyBhbiBleHByZXNzaW9uIGFuZCBjaGVjayBleHBlY3RhdGlvbnMuIFRocm93cyBBc3NlcnRpb25FcnJvciBmb3IgcmVwb3J0aW5nIGlmIHRlc3QgZG9lc24ndCBwYXNzLlxuICAgKlxuICAgKiBAbmFtZSBhc3NlcnRcbiAgICogQHBhcmFtIHt1bmtub3dufSBfZXhwciB0byBiZSB0ZXN0ZWRcbiAgICogQHBhcmFtIHtzdHJpbmcgfCBGdW5jdGlvbn0gbXNnIG9yIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBtZXNzYWdlIHRvIGRpc3BsYXkgaWYgZXhwcmVzc2lvbiBmYWlsc1xuICAgKiBAcGFyYW0ge3N0cmluZyB8IEZ1bmN0aW9ufSBfbmVnYXRlTXNnIG9yIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBuZWdhdGVkTWVzc2FnZSB0byBkaXNwbGF5IGlmIG5lZ2F0ZWQgZXhwcmVzc2lvbiBmYWlsc1xuICAgKiBAcGFyYW0ge3Vua25vd259IGV4cGVjdGVkIHZhbHVlIChyZW1lbWJlciB0byBjaGVjayBmb3IgbmVnYXRpb24pXG4gICAqIEBwYXJhbSB7dW5rbm93bn0gX2FjdHVhbCAob3B0aW9uYWwpIHdpbGwgZGVmYXVsdCB0byBgdGhpcy5vYmpgXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2hvd0RpZmYgKG9wdGlvbmFsKSB3aGVuIHNldCB0byBgdHJ1ZWAsIGFzc2VydCB3aWxsIGRpc3BsYXkgYSBkaWZmIGluIGFkZGl0aW9uIHRvIHRoZSBtZXNzYWdlIGlmIGV4cHJlc3Npb24gZmFpbHNcbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBhc3NlcnQoX2V4cHIsIG1zZywgX25lZ2F0ZU1zZywgZXhwZWN0ZWQsIF9hY3R1YWwsIHNob3dEaWZmKSB7XG4gICAgY29uc3Qgb2sgPSB0ZXN0KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKGZhbHNlICE9PSBzaG93RGlmZikgc2hvd0RpZmYgPSB0cnVlO1xuICAgIGlmICh2b2lkIDAgPT09IGV4cGVjdGVkICYmIHZvaWQgMCA9PT0gX2FjdHVhbCkgc2hvd0RpZmYgPSBmYWxzZTtcbiAgICBpZiAodHJ1ZSAhPT0gY29uZmlnLnNob3dEaWZmKSBzaG93RGlmZiA9IGZhbHNlO1xuICAgIGlmICghb2spIHtcbiAgICAgIG1zZyA9IGdldE1lc3NhZ2UyKHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICBjb25zdCBhY3R1YWwgPSBnZXRBY3R1YWwodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIGNvbnN0IGFzc2VydGlvbkVycm9yT2JqZWN0UHJvcGVydGllcyA9IHtcbiAgICAgICAgYWN0dWFsLFxuICAgICAgICBleHBlY3RlZCxcbiAgICAgICAgc2hvd0RpZmZcbiAgICAgIH07XG4gICAgICBjb25zdCBvcGVyYXRvciA9IGdldE9wZXJhdG9yKHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICBpZiAob3BlcmF0b3IpIHtcbiAgICAgICAgYXNzZXJ0aW9uRXJyb3JPYmplY3RQcm9wZXJ0aWVzLm9wZXJhdG9yID0gb3BlcmF0b3I7XG4gICAgICB9XG4gICAgICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IoXG4gICAgICAgIG1zZyxcbiAgICAgICAgYXNzZXJ0aW9uRXJyb3JPYmplY3RQcm9wZXJ0aWVzLFxuICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIE5vdCBzdXJlIHdoYXQgdG8gZG8gYWJvdXQgdGhlc2UgdHlwZXMgeWV0XG4gICAgICAgIGNvbmZpZy5pbmNsdWRlU3RhY2sgPyB0aGlzLmFzc2VydCA6IGZsYWcodGhpcywgXCJzc2ZpXCIpXG4gICAgICApO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogUXVpY2sgcmVmZXJlbmNlIHRvIHN0b3JlZCBgYWN0dWFsYCB2YWx1ZSBmb3IgcGx1Z2luIGRldmVsb3BlcnMuXG4gICAqXG4gICAqIEByZXR1cm5zIHt1bmtub3dufVxuICAgKi9cbiAgZ2V0IF9vYmooKSB7XG4gICAgcmV0dXJuIGZsYWcodGhpcywgXCJvYmplY3RcIik7XG4gIH1cbiAgLyoqXG4gICAqIFF1aWNrIHJlZmVyZW5jZSB0byBzdG9yZWQgYGFjdHVhbGAgdmFsdWUgZm9yIHBsdWdpbiBkZXZlbG9wZXJzLlxuICAgKlxuICAgKiBAcGFyYW0ge3Vua25vd259IHZhbFxuICAgKi9cbiAgc2V0IF9vYmoodmFsKSB7XG4gICAgZmxhZyh0aGlzLCBcIm9iamVjdFwiLCB2YWwpO1xuICB9XG59O1xuXG4vLyBsaWIvY2hhaS91dGlscy9pc1Byb3h5RW5hYmxlZC5qc1xuZnVuY3Rpb24gaXNQcm94eUVuYWJsZWQoKSB7XG4gIHJldHVybiBjb25maWcudXNlUHJveHkgJiYgdHlwZW9mIFByb3h5ICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiBSZWZsZWN0ICE9PSBcInVuZGVmaW5lZFwiO1xufVxuX19uYW1lKGlzUHJveHlFbmFibGVkLCBcImlzUHJveHlFbmFibGVkXCIpO1xuXG4vLyBsaWIvY2hhaS91dGlscy9hZGRQcm9wZXJ0eS5qc1xuZnVuY3Rpb24gYWRkUHJvcGVydHkoY3R4LCBuYW1lLCBnZXR0ZXIpIHtcbiAgZ2V0dGVyID0gZ2V0dGVyID09PSB2b2lkIDAgPyBmdW5jdGlvbigpIHtcbiAgfSA6IGdldHRlcjtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN0eCwgbmFtZSwge1xuICAgIGdldDogLyogQF9fUFVSRV9fICovIF9fbmFtZShmdW5jdGlvbiBwcm9wZXJ0eUdldHRlcigpIHtcbiAgICAgIGlmICghaXNQcm94eUVuYWJsZWQoKSAmJiAhZmxhZyh0aGlzLCBcImxvY2tTc2ZpXCIpKSB7XG4gICAgICAgIGZsYWcodGhpcywgXCJzc2ZpXCIsIHByb3BlcnR5R2V0dGVyKTtcbiAgICAgIH1cbiAgICAgIGxldCByZXN1bHQgPSBnZXR0ZXIuY2FsbCh0aGlzKTtcbiAgICAgIGlmIChyZXN1bHQgIT09IHZvaWQgMCkgcmV0dXJuIHJlc3VsdDtcbiAgICAgIGxldCBuZXdBc3NlcnRpb24gPSBuZXcgQXNzZXJ0aW9uKCk7XG4gICAgICB0cmFuc2ZlckZsYWdzKHRoaXMsIG5ld0Fzc2VydGlvbik7XG4gICAgICByZXR1cm4gbmV3QXNzZXJ0aW9uO1xuICAgIH0sIFwicHJvcGVydHlHZXR0ZXJcIiksXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xufVxuX19uYW1lKGFkZFByb3BlcnR5LCBcImFkZFByb3BlcnR5XCIpO1xuXG4vLyBsaWIvY2hhaS91dGlscy9hZGRMZW5ndGhHdWFyZC5qc1xudmFyIGZuTGVuZ3RoRGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZnVuY3Rpb24oKSB7XG59LCBcImxlbmd0aFwiKTtcbmZ1bmN0aW9uIGFkZExlbmd0aEd1YXJkKGZuLCBhc3NlcnRpb25OYW1lLCBpc0NoYWluYWJsZSkge1xuICBpZiAoIWZuTGVuZ3RoRGVzYy5jb25maWd1cmFibGUpIHJldHVybiBmbjtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBcImxlbmd0aFwiLCB7XG4gICAgZ2V0OiAvKiBAX19QVVJFX18gKi8gX19uYW1lKGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGlzQ2hhaW5hYmxlKSB7XG4gICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgIFwiSW52YWxpZCBDaGFpIHByb3BlcnR5OiBcIiArIGFzc2VydGlvbk5hbWUgKyAnLmxlbmd0aC4gRHVlIHRvIGEgY29tcGF0aWJpbGl0eSBpc3N1ZSwgXCJsZW5ndGhcIiBjYW5ub3QgZGlyZWN0bHkgZm9sbG93IFwiJyArIGFzc2VydGlvbk5hbWUgKyAnXCIuIFVzZSBcIicgKyBhc3NlcnRpb25OYW1lICsgJy5sZW5ndGhPZlwiIGluc3RlYWQuJ1xuICAgICAgICApO1xuICAgICAgfVxuICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgIFwiSW52YWxpZCBDaGFpIHByb3BlcnR5OiBcIiArIGFzc2VydGlvbk5hbWUgKyAnLmxlbmd0aC4gU2VlIGRvY3MgZm9yIHByb3BlciB1c2FnZSBvZiBcIicgKyBhc3NlcnRpb25OYW1lICsgJ1wiLidcbiAgICAgICk7XG4gICAgfSwgXCJnZXRcIilcbiAgfSk7XG4gIHJldHVybiBmbjtcbn1cbl9fbmFtZShhZGRMZW5ndGhHdWFyZCwgXCJhZGRMZW5ndGhHdWFyZFwiKTtcblxuLy8gbGliL2NoYWkvdXRpbHMvZ2V0UHJvcGVydGllcy5qc1xuZnVuY3Rpb24gZ2V0UHJvcGVydGllcyhvYmplY3QpIHtcbiAgbGV0IHJlc3VsdCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iamVjdCk7XG4gIGZ1bmN0aW9uIGFkZFByb3BlcnR5Mihwcm9wZXJ0eSkge1xuICAgIGlmIChyZXN1bHQuaW5kZXhPZihwcm9wZXJ0eSkgPT09IC0xKSB7XG4gICAgICByZXN1bHQucHVzaChwcm9wZXJ0eSk7XG4gICAgfVxuICB9XG4gIF9fbmFtZShhZGRQcm9wZXJ0eTIsIFwiYWRkUHJvcGVydHlcIik7XG4gIGxldCBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpO1xuICB3aGlsZSAocHJvdG8gIT09IG51bGwpIHtcbiAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhwcm90bykuZm9yRWFjaChhZGRQcm9wZXJ0eTIpO1xuICAgIHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHByb3RvKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuX19uYW1lKGdldFByb3BlcnRpZXMsIFwiZ2V0UHJvcGVydGllc1wiKTtcblxuLy8gbGliL2NoYWkvdXRpbHMvcHJveGlmeS5qc1xudmFyIGJ1aWx0aW5zID0gW1wiX19mbGFnc1wiLCBcIl9fbWV0aG9kc1wiLCBcIl9vYmpcIiwgXCJhc3NlcnRcIl07XG5mdW5jdGlvbiBwcm94aWZ5KG9iaiwgbm9uQ2hhaW5hYmxlTWV0aG9kTmFtZSkge1xuICBpZiAoIWlzUHJveHlFbmFibGVkKCkpIHJldHVybiBvYmo7XG4gIHJldHVybiBuZXcgUHJveHkob2JqLCB7XG4gICAgZ2V0OiAvKiBAX19QVVJFX18gKi8gX19uYW1lKGZ1bmN0aW9uIHByb3h5R2V0dGVyKHRhcmdldCwgcHJvcGVydHkpIHtcbiAgICAgIGlmICh0eXBlb2YgcHJvcGVydHkgPT09IFwic3RyaW5nXCIgJiYgY29uZmlnLnByb3h5RXhjbHVkZWRLZXlzLmluZGV4T2YocHJvcGVydHkpID09PSAtMSAmJiAhUmVmbGVjdC5oYXModGFyZ2V0LCBwcm9wZXJ0eSkpIHtcbiAgICAgICAgaWYgKG5vbkNoYWluYWJsZU1ldGhvZE5hbWUpIHtcbiAgICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICAgIFwiSW52YWxpZCBDaGFpIHByb3BlcnR5OiBcIiArIG5vbkNoYWluYWJsZU1ldGhvZE5hbWUgKyBcIi5cIiArIHByb3BlcnR5ICsgJy4gU2VlIGRvY3MgZm9yIHByb3BlciB1c2FnZSBvZiBcIicgKyBub25DaGFpbmFibGVNZXRob2ROYW1lICsgJ1wiLidcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzdWdnZXN0aW9uID0gbnVsbDtcbiAgICAgICAgbGV0IHN1Z2dlc3Rpb25EaXN0YW5jZSA9IDQ7XG4gICAgICAgIGdldFByb3BlcnRpZXModGFyZ2V0KS5mb3JFYWNoKGZ1bmN0aW9uKHByb3ApIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAvLyB3ZSBhY3R1YWxseSBtZWFuIHRvIGNoZWNrIGBPYmplY3QucHJvdG90eXBlYCBoZXJlXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG4gICAgICAgICAgICAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eShwcm9wKSAmJiBidWlsdGlucy5pbmRleE9mKHByb3ApID09PSAtMVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgbGV0IGRpc3QgPSBzdHJpbmdEaXN0YW5jZUNhcHBlZChwcm9wZXJ0eSwgcHJvcCwgc3VnZ2VzdGlvbkRpc3RhbmNlKTtcbiAgICAgICAgICAgIGlmIChkaXN0IDwgc3VnZ2VzdGlvbkRpc3RhbmNlKSB7XG4gICAgICAgICAgICAgIHN1Z2dlc3Rpb24gPSBwcm9wO1xuICAgICAgICAgICAgICBzdWdnZXN0aW9uRGlzdGFuY2UgPSBkaXN0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChzdWdnZXN0aW9uICE9PSBudWxsKSB7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgICBcIkludmFsaWQgQ2hhaSBwcm9wZXJ0eTogXCIgKyBwcm9wZXJ0eSArICcuIERpZCB5b3UgbWVhbiBcIicgKyBzdWdnZXN0aW9uICsgJ1wiPydcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IEVycm9yKFwiSW52YWxpZCBDaGFpIHByb3BlcnR5OiBcIiArIHByb3BlcnR5KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGJ1aWx0aW5zLmluZGV4T2YocHJvcGVydHkpID09PSAtMSAmJiAhZmxhZyh0YXJnZXQsIFwibG9ja1NzZmlcIikpIHtcbiAgICAgICAgZmxhZyh0YXJnZXQsIFwic3NmaVwiLCBwcm94eUdldHRlcik7XG4gICAgICB9XG4gICAgICByZXR1cm4gUmVmbGVjdC5nZXQodGFyZ2V0LCBwcm9wZXJ0eSk7XG4gICAgfSwgXCJwcm94eUdldHRlclwiKVxuICB9KTtcbn1cbl9fbmFtZShwcm94aWZ5LCBcInByb3hpZnlcIik7XG5mdW5jdGlvbiBzdHJpbmdEaXN0YW5jZUNhcHBlZChzdHJBLCBzdHJCLCBjYXApIHtcbiAgaWYgKE1hdGguYWJzKHN0ckEubGVuZ3RoIC0gc3RyQi5sZW5ndGgpID49IGNhcCkge1xuICAgIHJldHVybiBjYXA7XG4gIH1cbiAgbGV0IG1lbW8gPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPD0gc3RyQS5sZW5ndGg7IGkrKykge1xuICAgIG1lbW9baV0gPSBBcnJheShzdHJCLmxlbmd0aCArIDEpLmZpbGwoMCk7XG4gICAgbWVtb1tpXVswXSA9IGk7XG4gIH1cbiAgZm9yIChsZXQgaiA9IDA7IGogPCBzdHJCLmxlbmd0aDsgaisrKSB7XG4gICAgbWVtb1swXVtqXSA9IGo7XG4gIH1cbiAgZm9yIChsZXQgaSA9IDE7IGkgPD0gc3RyQS5sZW5ndGg7IGkrKykge1xuICAgIGxldCBjaCA9IHN0ckEuY2hhckNvZGVBdChpIC0gMSk7XG4gICAgZm9yIChsZXQgaiA9IDE7IGogPD0gc3RyQi5sZW5ndGg7IGorKykge1xuICAgICAgaWYgKE1hdGguYWJzKGkgLSBqKSA+PSBjYXApIHtcbiAgICAgICAgbWVtb1tpXVtqXSA9IGNhcDtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBtZW1vW2ldW2pdID0gTWF0aC5taW4oXG4gICAgICAgIG1lbW9baSAtIDFdW2pdICsgMSxcbiAgICAgICAgbWVtb1tpXVtqIC0gMV0gKyAxLFxuICAgICAgICBtZW1vW2kgLSAxXVtqIC0gMV0gKyAoY2ggPT09IHN0ckIuY2hhckNvZGVBdChqIC0gMSkgPyAwIDogMSlcbiAgICAgICk7XG4gICAgfVxuICB9XG4gIHJldHVybiBtZW1vW3N0ckEubGVuZ3RoXVtzdHJCLmxlbmd0aF07XG59XG5fX25hbWUoc3RyaW5nRGlzdGFuY2VDYXBwZWQsIFwic3RyaW5nRGlzdGFuY2VDYXBwZWRcIik7XG5cbi8vIGxpYi9jaGFpL3V0aWxzL2FkZE1ldGhvZC5qc1xuZnVuY3Rpb24gYWRkTWV0aG9kKGN0eCwgbmFtZSwgbWV0aG9kKSB7XG4gIGxldCBtZXRob2RXcmFwcGVyID0gLyogQF9fUFVSRV9fICovIF9fbmFtZShmdW5jdGlvbigpIHtcbiAgICBpZiAoIWZsYWcodGhpcywgXCJsb2NrU3NmaVwiKSkge1xuICAgICAgZmxhZyh0aGlzLCBcInNzZmlcIiwgbWV0aG9kV3JhcHBlcik7XG4gICAgfVxuICAgIGxldCByZXN1bHQgPSBtZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAocmVzdWx0ICE9PSB2b2lkIDApIHJldHVybiByZXN1bHQ7XG4gICAgbGV0IG5ld0Fzc2VydGlvbiA9IG5ldyBBc3NlcnRpb24oKTtcbiAgICB0cmFuc2ZlckZsYWdzKHRoaXMsIG5ld0Fzc2VydGlvbik7XG4gICAgcmV0dXJuIG5ld0Fzc2VydGlvbjtcbiAgfSwgXCJtZXRob2RXcmFwcGVyXCIpO1xuICBhZGRMZW5ndGhHdWFyZChtZXRob2RXcmFwcGVyLCBuYW1lLCBmYWxzZSk7XG4gIGN0eFtuYW1lXSA9IHByb3hpZnkobWV0aG9kV3JhcHBlciwgbmFtZSk7XG59XG5fX25hbWUoYWRkTWV0aG9kLCBcImFkZE1ldGhvZFwiKTtcblxuLy8gbGliL2NoYWkvdXRpbHMvb3ZlcndyaXRlUHJvcGVydHkuanNcbmZ1bmN0aW9uIG92ZXJ3cml0ZVByb3BlcnR5KGN0eCwgbmFtZSwgZ2V0dGVyKSB7XG4gIGxldCBfZ2V0ID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihjdHgsIG5hbWUpLCBfc3VwZXIgPSAvKiBAX19QVVJFX18gKi8gX19uYW1lKGZ1bmN0aW9uKCkge1xuICB9LCBcIl9zdXBlclwiKTtcbiAgaWYgKF9nZXQgJiYgXCJmdW5jdGlvblwiID09PSB0eXBlb2YgX2dldC5nZXQpIF9zdXBlciA9IF9nZXQuZ2V0O1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3R4LCBuYW1lLCB7XG4gICAgZ2V0OiAvKiBAX19QVVJFX18gKi8gX19uYW1lKGZ1bmN0aW9uIG92ZXJ3cml0aW5nUHJvcGVydHlHZXR0ZXIoKSB7XG4gICAgICBpZiAoIWlzUHJveHlFbmFibGVkKCkgJiYgIWZsYWcodGhpcywgXCJsb2NrU3NmaVwiKSkge1xuICAgICAgICBmbGFnKHRoaXMsIFwic3NmaVwiLCBvdmVyd3JpdGluZ1Byb3BlcnR5R2V0dGVyKTtcbiAgICAgIH1cbiAgICAgIGxldCBvcmlnTG9ja1NzZmkgPSBmbGFnKHRoaXMsIFwibG9ja1NzZmlcIik7XG4gICAgICBmbGFnKHRoaXMsIFwibG9ja1NzZmlcIiwgdHJ1ZSk7XG4gICAgICBsZXQgcmVzdWx0ID0gZ2V0dGVyKF9zdXBlcikuY2FsbCh0aGlzKTtcbiAgICAgIGZsYWcodGhpcywgXCJsb2NrU3NmaVwiLCBvcmlnTG9ja1NzZmkpO1xuICAgICAgaWYgKHJlc3VsdCAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgICBsZXQgbmV3QXNzZXJ0aW9uID0gbmV3IEFzc2VydGlvbigpO1xuICAgICAgdHJhbnNmZXJGbGFncyh0aGlzLCBuZXdBc3NlcnRpb24pO1xuICAgICAgcmV0dXJuIG5ld0Fzc2VydGlvbjtcbiAgICB9LCBcIm92ZXJ3cml0aW5nUHJvcGVydHlHZXR0ZXJcIiksXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xufVxuX19uYW1lKG92ZXJ3cml0ZVByb3BlcnR5LCBcIm92ZXJ3cml0ZVByb3BlcnR5XCIpO1xuXG4vLyBsaWIvY2hhaS91dGlscy9vdmVyd3JpdGVNZXRob2QuanNcbmZ1bmN0aW9uIG92ZXJ3cml0ZU1ldGhvZChjdHgsIG5hbWUsIG1ldGhvZCkge1xuICBsZXQgX21ldGhvZCA9IGN0eFtuYW1lXSwgX3N1cGVyID0gLyogQF9fUFVSRV9fICovIF9fbmFtZShmdW5jdGlvbigpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IobmFtZSArIFwiIGlzIG5vdCBhIGZ1bmN0aW9uXCIpO1xuICB9LCBcIl9zdXBlclwiKTtcbiAgaWYgKF9tZXRob2QgJiYgXCJmdW5jdGlvblwiID09PSB0eXBlb2YgX21ldGhvZCkgX3N1cGVyID0gX21ldGhvZDtcbiAgbGV0IG92ZXJ3cml0aW5nTWV0aG9kV3JhcHBlciA9IC8qIEBfX1BVUkVfXyAqLyBfX25hbWUoZnVuY3Rpb24oKSB7XG4gICAgaWYgKCFmbGFnKHRoaXMsIFwibG9ja1NzZmlcIikpIHtcbiAgICAgIGZsYWcodGhpcywgXCJzc2ZpXCIsIG92ZXJ3cml0aW5nTWV0aG9kV3JhcHBlcik7XG4gICAgfVxuICAgIGxldCBvcmlnTG9ja1NzZmkgPSBmbGFnKHRoaXMsIFwibG9ja1NzZmlcIik7XG4gICAgZmxhZyh0aGlzLCBcImxvY2tTc2ZpXCIsIHRydWUpO1xuICAgIGxldCByZXN1bHQgPSBtZXRob2QoX3N1cGVyKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGZsYWcodGhpcywgXCJsb2NrU3NmaVwiLCBvcmlnTG9ja1NzZmkpO1xuICAgIGlmIChyZXN1bHQgIT09IHZvaWQgMCkge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgbGV0IG5ld0Fzc2VydGlvbiA9IG5ldyBBc3NlcnRpb24oKTtcbiAgICB0cmFuc2ZlckZsYWdzKHRoaXMsIG5ld0Fzc2VydGlvbik7XG4gICAgcmV0dXJuIG5ld0Fzc2VydGlvbjtcbiAgfSwgXCJvdmVyd3JpdGluZ01ldGhvZFdyYXBwZXJcIik7XG4gIGFkZExlbmd0aEd1YXJkKG92ZXJ3cml0aW5nTWV0aG9kV3JhcHBlciwgbmFtZSwgZmFsc2UpO1xuICBjdHhbbmFtZV0gPSBwcm94aWZ5KG92ZXJ3cml0aW5nTWV0aG9kV3JhcHBlciwgbmFtZSk7XG59XG5fX25hbWUob3ZlcndyaXRlTWV0aG9kLCBcIm92ZXJ3cml0ZU1ldGhvZFwiKTtcblxuLy8gbGliL2NoYWkvdXRpbHMvYWRkQ2hhaW5hYmxlTWV0aG9kLmpzXG52YXIgY2FuU2V0UHJvdG90eXBlID0gdHlwZW9mIE9iamVjdC5zZXRQcm90b3R5cGVPZiA9PT0gXCJmdW5jdGlvblwiO1xudmFyIHRlc3RGbiA9IC8qIEBfX1BVUkVfXyAqLyBfX25hbWUoZnVuY3Rpb24oKSB7XG59LCBcInRlc3RGblwiKTtcbnZhciBleGNsdWRlTmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0Rm4pLmZpbHRlcihmdW5jdGlvbihuYW1lKSB7XG4gIGxldCBwcm9wRGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGVzdEZuLCBuYW1lKTtcbiAgaWYgKHR5cGVvZiBwcm9wRGVzYyAhPT0gXCJvYmplY3RcIikgcmV0dXJuIHRydWU7XG4gIHJldHVybiAhcHJvcERlc2MuY29uZmlndXJhYmxlO1xufSk7XG52YXIgY2FsbCA9IEZ1bmN0aW9uLnByb3RvdHlwZS5jYWxsO1xudmFyIGFwcGx5ID0gRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5O1xuZnVuY3Rpb24gYWRkQ2hhaW5hYmxlTWV0aG9kKGN0eCwgbmFtZSwgbWV0aG9kLCBjaGFpbmluZ0JlaGF2aW9yKSB7XG4gIGlmICh0eXBlb2YgY2hhaW5pbmdCZWhhdmlvciAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgY2hhaW5pbmdCZWhhdmlvciA9IC8qIEBfX1BVUkVfXyAqLyBfX25hbWUoZnVuY3Rpb24oKSB7XG4gICAgfSwgXCJjaGFpbmluZ0JlaGF2aW9yXCIpO1xuICB9XG4gIGxldCBjaGFpbmFibGVCZWhhdmlvciA9IHtcbiAgICBtZXRob2QsXG4gICAgY2hhaW5pbmdCZWhhdmlvclxuICB9O1xuICBpZiAoIWN0eC5fX21ldGhvZHMpIHtcbiAgICBjdHguX19tZXRob2RzID0ge307XG4gIH1cbiAgY3R4Ll9fbWV0aG9kc1tuYW1lXSA9IGNoYWluYWJsZUJlaGF2aW9yO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3R4LCBuYW1lLCB7XG4gICAgZ2V0OiAvKiBAX19QVVJFX18gKi8gX19uYW1lKGZ1bmN0aW9uIGNoYWluYWJsZU1ldGhvZEdldHRlcigpIHtcbiAgICAgIGNoYWluYWJsZUJlaGF2aW9yLmNoYWluaW5nQmVoYXZpb3IuY2FsbCh0aGlzKTtcbiAgICAgIGxldCBjaGFpbmFibGVNZXRob2RXcmFwcGVyID0gLyogQF9fUFVSRV9fICovIF9fbmFtZShmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCFmbGFnKHRoaXMsIFwibG9ja1NzZmlcIikpIHtcbiAgICAgICAgICBmbGFnKHRoaXMsIFwic3NmaVwiLCBjaGFpbmFibGVNZXRob2RXcmFwcGVyKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVzdWx0ID0gY2hhaW5hYmxlQmVoYXZpb3IubWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIGlmIChyZXN1bHQgIT09IHZvaWQgMCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG5ld0Fzc2VydGlvbiA9IG5ldyBBc3NlcnRpb24oKTtcbiAgICAgICAgdHJhbnNmZXJGbGFncyh0aGlzLCBuZXdBc3NlcnRpb24pO1xuICAgICAgICByZXR1cm4gbmV3QXNzZXJ0aW9uO1xuICAgICAgfSwgXCJjaGFpbmFibGVNZXRob2RXcmFwcGVyXCIpO1xuICAgICAgYWRkTGVuZ3RoR3VhcmQoY2hhaW5hYmxlTWV0aG9kV3JhcHBlciwgbmFtZSwgdHJ1ZSk7XG4gICAgICBpZiAoY2FuU2V0UHJvdG90eXBlKSB7XG4gICAgICAgIGxldCBwcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHRoaXMpO1xuICAgICAgICBwcm90b3R5cGUuY2FsbCA9IGNhbGw7XG4gICAgICAgIHByb3RvdHlwZS5hcHBseSA9IGFwcGx5O1xuICAgICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoY2hhaW5hYmxlTWV0aG9kV3JhcHBlciwgcHJvdG90eXBlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBhc3NlcnRlck5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoY3R4KTtcbiAgICAgICAgYXNzZXJ0ZXJOYW1lcy5mb3JFYWNoKGZ1bmN0aW9uKGFzc2VydGVyTmFtZSkge1xuICAgICAgICAgIGlmIChleGNsdWRlTmFtZXMuaW5kZXhPZihhc3NlcnRlck5hbWUpICE9PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsZXQgcGQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGN0eCwgYXNzZXJ0ZXJOYW1lKTtcbiAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY2hhaW5hYmxlTWV0aG9kV3JhcHBlciwgYXNzZXJ0ZXJOYW1lLCBwZCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgdHJhbnNmZXJGbGFncyh0aGlzLCBjaGFpbmFibGVNZXRob2RXcmFwcGVyKTtcbiAgICAgIHJldHVybiBwcm94aWZ5KGNoYWluYWJsZU1ldGhvZFdyYXBwZXIpO1xuICAgIH0sIFwiY2hhaW5hYmxlTWV0aG9kR2V0dGVyXCIpLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KTtcbn1cbl9fbmFtZShhZGRDaGFpbmFibGVNZXRob2QsIFwiYWRkQ2hhaW5hYmxlTWV0aG9kXCIpO1xuXG4vLyBsaWIvY2hhaS91dGlscy9vdmVyd3JpdGVDaGFpbmFibGVNZXRob2QuanNcbmZ1bmN0aW9uIG92ZXJ3cml0ZUNoYWluYWJsZU1ldGhvZChjdHgsIG5hbWUsIG1ldGhvZCwgY2hhaW5pbmdCZWhhdmlvcikge1xuICBsZXQgY2hhaW5hYmxlQmVoYXZpb3IgPSBjdHguX19tZXRob2RzW25hbWVdO1xuICBsZXQgX2NoYWluaW5nQmVoYXZpb3IgPSBjaGFpbmFibGVCZWhhdmlvci5jaGFpbmluZ0JlaGF2aW9yO1xuICBjaGFpbmFibGVCZWhhdmlvci5jaGFpbmluZ0JlaGF2aW9yID0gLyogQF9fUFVSRV9fICovIF9fbmFtZShmdW5jdGlvbiBvdmVyd3JpdGluZ0NoYWluYWJsZU1ldGhvZEdldHRlcigpIHtcbiAgICBsZXQgcmVzdWx0ID0gY2hhaW5pbmdCZWhhdmlvcihfY2hhaW5pbmdCZWhhdmlvcikuY2FsbCh0aGlzKTtcbiAgICBpZiAocmVzdWx0ICE9PSB2b2lkIDApIHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGxldCBuZXdBc3NlcnRpb24gPSBuZXcgQXNzZXJ0aW9uKCk7XG4gICAgdHJhbnNmZXJGbGFncyh0aGlzLCBuZXdBc3NlcnRpb24pO1xuICAgIHJldHVybiBuZXdBc3NlcnRpb247XG4gIH0sIFwib3ZlcndyaXRpbmdDaGFpbmFibGVNZXRob2RHZXR0ZXJcIik7XG4gIGxldCBfbWV0aG9kID0gY2hhaW5hYmxlQmVoYXZpb3IubWV0aG9kO1xuICBjaGFpbmFibGVCZWhhdmlvci5tZXRob2QgPSAvKiBAX19QVVJFX18gKi8gX19uYW1lKGZ1bmN0aW9uIG92ZXJ3cml0aW5nQ2hhaW5hYmxlTWV0aG9kV3JhcHBlcigpIHtcbiAgICBsZXQgcmVzdWx0ID0gbWV0aG9kKF9tZXRob2QpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKHJlc3VsdCAhPT0gdm9pZCAwKSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBsZXQgbmV3QXNzZXJ0aW9uID0gbmV3IEFzc2VydGlvbigpO1xuICAgIHRyYW5zZmVyRmxhZ3ModGhpcywgbmV3QXNzZXJ0aW9uKTtcbiAgICByZXR1cm4gbmV3QXNzZXJ0aW9uO1xuICB9LCBcIm92ZXJ3cml0aW5nQ2hhaW5hYmxlTWV0aG9kV3JhcHBlclwiKTtcbn1cbl9fbmFtZShvdmVyd3JpdGVDaGFpbmFibGVNZXRob2QsIFwib3ZlcndyaXRlQ2hhaW5hYmxlTWV0aG9kXCIpO1xuXG4vLyBsaWIvY2hhaS91dGlscy9jb21wYXJlQnlJbnNwZWN0LmpzXG5mdW5jdGlvbiBjb21wYXJlQnlJbnNwZWN0KGEsIGIpIHtcbiAgcmV0dXJuIGluc3BlY3QyKGEpIDwgaW5zcGVjdDIoYikgPyAtMSA6IDE7XG59XG5fX25hbWUoY29tcGFyZUJ5SW5zcGVjdCwgXCJjb21wYXJlQnlJbnNwZWN0XCIpO1xuXG4vLyBsaWIvY2hhaS91dGlscy9nZXRPd25FbnVtZXJhYmxlUHJvcGVydHlTeW1ib2xzLmpzXG5mdW5jdGlvbiBnZXRPd25FbnVtZXJhYmxlUHJvcGVydHlTeW1ib2xzKG9iaikge1xuICBpZiAodHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgIT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFtdO1xuICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhvYmopLmZpbHRlcihmdW5jdGlvbihzeW0pIHtcbiAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIHN5bSkuZW51bWVyYWJsZTtcbiAgfSk7XG59XG5fX25hbWUoZ2V0T3duRW51bWVyYWJsZVByb3BlcnR5U3ltYm9scywgXCJnZXRPd25FbnVtZXJhYmxlUHJvcGVydHlTeW1ib2xzXCIpO1xuXG4vLyBsaWIvY2hhaS91dGlscy9nZXRPd25FbnVtZXJhYmxlUHJvcGVydGllcy5qc1xuZnVuY3Rpb24gZ2V0T3duRW51bWVyYWJsZVByb3BlcnRpZXMob2JqKSB7XG4gIHJldHVybiBPYmplY3Qua2V5cyhvYmopLmNvbmNhdChnZXRPd25FbnVtZXJhYmxlUHJvcGVydHlTeW1ib2xzKG9iaikpO1xufVxuX19uYW1lKGdldE93bkVudW1lcmFibGVQcm9wZXJ0aWVzLCBcImdldE93bkVudW1lcmFibGVQcm9wZXJ0aWVzXCIpO1xuXG4vLyBsaWIvY2hhaS91dGlscy9pc05hTi5qc1xudmFyIGlzTmFOMiA9IE51bWJlci5pc05hTjtcblxuLy8gbGliL2NoYWkvdXRpbHMvZ2V0T3BlcmF0b3IuanNcbmZ1bmN0aW9uIGlzT2JqZWN0VHlwZShvYmopIHtcbiAgbGV0IG9iamVjdFR5cGUgPSB0eXBlKG9iaik7XG4gIGxldCBvYmplY3RUeXBlcyA9IFtcIkFycmF5XCIsIFwiT2JqZWN0XCIsIFwiRnVuY3Rpb25cIl07XG4gIHJldHVybiBvYmplY3RUeXBlcy5pbmRleE9mKG9iamVjdFR5cGUpICE9PSAtMTtcbn1cbl9fbmFtZShpc09iamVjdFR5cGUsIFwiaXNPYmplY3RUeXBlXCIpO1xuZnVuY3Rpb24gZ2V0T3BlcmF0b3Iob2JqLCBhcmdzKSB7XG4gIGxldCBvcGVyYXRvciA9IGZsYWcob2JqLCBcIm9wZXJhdG9yXCIpO1xuICBsZXQgbmVnYXRlID0gZmxhZyhvYmosIFwibmVnYXRlXCIpO1xuICBsZXQgZXhwZWN0ZWQgPSBhcmdzWzNdO1xuICBsZXQgbXNnID0gbmVnYXRlID8gYXJnc1syXSA6IGFyZ3NbMV07XG4gIGlmIChvcGVyYXRvcikge1xuICAgIHJldHVybiBvcGVyYXRvcjtcbiAgfVxuICBpZiAodHlwZW9mIG1zZyA9PT0gXCJmdW5jdGlvblwiKSBtc2cgPSBtc2coKTtcbiAgbXNnID0gbXNnIHx8IFwiXCI7XG4gIGlmICghbXNnKSB7XG4gICAgcmV0dXJuIHZvaWQgMDtcbiAgfVxuICBpZiAoL1xcc2hhdmVcXHMvLnRlc3QobXNnKSkge1xuICAgIHJldHVybiB2b2lkIDA7XG4gIH1cbiAgbGV0IGlzT2JqZWN0ID0gaXNPYmplY3RUeXBlKGV4cGVjdGVkKTtcbiAgaWYgKC9cXHNub3RcXHMvLnRlc3QobXNnKSkge1xuICAgIHJldHVybiBpc09iamVjdCA/IFwibm90RGVlcFN0cmljdEVxdWFsXCIgOiBcIm5vdFN0cmljdEVxdWFsXCI7XG4gIH1cbiAgcmV0dXJuIGlzT2JqZWN0ID8gXCJkZWVwU3RyaWN0RXF1YWxcIiA6IFwic3RyaWN0RXF1YWxcIjtcbn1cbl9fbmFtZShnZXRPcGVyYXRvciwgXCJnZXRPcGVyYXRvclwiKTtcblxuLy8gbGliL2NoYWkvdXRpbHMvaW5kZXguanNcbmZ1bmN0aW9uIGdldE5hbWUoZm4pIHtcbiAgcmV0dXJuIGZuLm5hbWU7XG59XG5fX25hbWUoZ2V0TmFtZSwgXCJnZXROYW1lXCIpO1xuZnVuY3Rpb24gaXNSZWdFeHAyKG9iaikge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09IFwiW29iamVjdCBSZWdFeHBdXCI7XG59XG5fX25hbWUoaXNSZWdFeHAyLCBcImlzUmVnRXhwXCIpO1xuZnVuY3Rpb24gaXNOdW1lcmljKG9iaikge1xuICByZXR1cm4gW1wiTnVtYmVyXCIsIFwiQmlnSW50XCJdLmluY2x1ZGVzKHR5cGUob2JqKSk7XG59XG5fX25hbWUoaXNOdW1lcmljLCBcImlzTnVtZXJpY1wiKTtcblxuLy8gbGliL2NoYWkvY29yZS9hc3NlcnRpb25zLmpzXG52YXIgeyBmbGFnOiBmbGFnMiB9ID0gdXRpbHNfZXhwb3J0cztcbltcbiAgXCJ0b1wiLFxuICBcImJlXCIsXG4gIFwiYmVlblwiLFxuICBcImlzXCIsXG4gIFwiYW5kXCIsXG4gIFwiaGFzXCIsXG4gIFwiaGF2ZVwiLFxuICBcIndpdGhcIixcbiAgXCJ0aGF0XCIsXG4gIFwid2hpY2hcIixcbiAgXCJhdFwiLFxuICBcIm9mXCIsXG4gIFwic2FtZVwiLFxuICBcImJ1dFwiLFxuICBcImRvZXNcIixcbiAgXCJzdGlsbFwiLFxuICBcImFsc29cIlxuXS5mb3JFYWNoKGZ1bmN0aW9uKGNoYWluKSB7XG4gIEFzc2VydGlvbi5hZGRQcm9wZXJ0eShjaGFpbik7XG59KTtcbkFzc2VydGlvbi5hZGRQcm9wZXJ0eShcIm5vdFwiLCBmdW5jdGlvbigpIHtcbiAgZmxhZzIodGhpcywgXCJuZWdhdGVcIiwgdHJ1ZSk7XG59KTtcbkFzc2VydGlvbi5hZGRQcm9wZXJ0eShcImRlZXBcIiwgZnVuY3Rpb24oKSB7XG4gIGZsYWcyKHRoaXMsIFwiZGVlcFwiLCB0cnVlKTtcbn0pO1xuQXNzZXJ0aW9uLmFkZFByb3BlcnR5KFwibmVzdGVkXCIsIGZ1bmN0aW9uKCkge1xuICBmbGFnMih0aGlzLCBcIm5lc3RlZFwiLCB0cnVlKTtcbn0pO1xuQXNzZXJ0aW9uLmFkZFByb3BlcnR5KFwib3duXCIsIGZ1bmN0aW9uKCkge1xuICBmbGFnMih0aGlzLCBcIm93blwiLCB0cnVlKTtcbn0pO1xuQXNzZXJ0aW9uLmFkZFByb3BlcnR5KFwib3JkZXJlZFwiLCBmdW5jdGlvbigpIHtcbiAgZmxhZzIodGhpcywgXCJvcmRlcmVkXCIsIHRydWUpO1xufSk7XG5Bc3NlcnRpb24uYWRkUHJvcGVydHkoXCJhbnlcIiwgZnVuY3Rpb24oKSB7XG4gIGZsYWcyKHRoaXMsIFwiYW55XCIsIHRydWUpO1xuICBmbGFnMih0aGlzLCBcImFsbFwiLCBmYWxzZSk7XG59KTtcbkFzc2VydGlvbi5hZGRQcm9wZXJ0eShcImFsbFwiLCBmdW5jdGlvbigpIHtcbiAgZmxhZzIodGhpcywgXCJhbGxcIiwgdHJ1ZSk7XG4gIGZsYWcyKHRoaXMsIFwiYW55XCIsIGZhbHNlKTtcbn0pO1xudmFyIGZ1bmN0aW9uVHlwZXMgPSB7XG4gIGZ1bmN0aW9uOiBbXG4gICAgXCJmdW5jdGlvblwiLFxuICAgIFwiYXN5bmNmdW5jdGlvblwiLFxuICAgIFwiZ2VuZXJhdG9yZnVuY3Rpb25cIixcbiAgICBcImFzeW5jZ2VuZXJhdG9yZnVuY3Rpb25cIlxuICBdLFxuICBhc3luY2Z1bmN0aW9uOiBbXCJhc3luY2Z1bmN0aW9uXCIsIFwiYXN5bmNnZW5lcmF0b3JmdW5jdGlvblwiXSxcbiAgZ2VuZXJhdG9yZnVuY3Rpb246IFtcImdlbmVyYXRvcmZ1bmN0aW9uXCIsIFwiYXN5bmNnZW5lcmF0b3JmdW5jdGlvblwiXSxcbiAgYXN5bmNnZW5lcmF0b3JmdW5jdGlvbjogW1wiYXN5bmNnZW5lcmF0b3JmdW5jdGlvblwiXVxufTtcbmZ1bmN0aW9uIGFuKHR5cGUzLCBtc2cpIHtcbiAgaWYgKG1zZykgZmxhZzIodGhpcywgXCJtZXNzYWdlXCIsIG1zZyk7XG4gIHR5cGUzID0gdHlwZTMudG9Mb3dlckNhc2UoKTtcbiAgbGV0IG9iaiA9IGZsYWcyKHRoaXMsIFwib2JqZWN0XCIpLCBhcnRpY2xlID0gfltcImFcIiwgXCJlXCIsIFwiaVwiLCBcIm9cIiwgXCJ1XCJdLmluZGV4T2YodHlwZTMuY2hhckF0KDApKSA/IFwiYW4gXCIgOiBcImEgXCI7XG4gIGNvbnN0IGRldGVjdGVkVHlwZSA9IHR5cGUob2JqKS50b0xvd2VyQ2FzZSgpO1xuICBpZiAoZnVuY3Rpb25UeXBlc1tcImZ1bmN0aW9uXCJdLmluY2x1ZGVzKHR5cGUzKSkge1xuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgZnVuY3Rpb25UeXBlc1t0eXBlM10uaW5jbHVkZXMoZGV0ZWN0ZWRUeXBlKSxcbiAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBcIiArIGFydGljbGUgKyB0eXBlMyxcbiAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSBub3QgdG8gYmUgXCIgKyBhcnRpY2xlICsgdHlwZTNcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgdHlwZTMgPT09IGRldGVjdGVkVHlwZSxcbiAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBcIiArIGFydGljbGUgKyB0eXBlMyxcbiAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSBub3QgdG8gYmUgXCIgKyBhcnRpY2xlICsgdHlwZTNcbiAgICApO1xuICB9XG59XG5fX25hbWUoYW4sIFwiYW5cIik7XG5Bc3NlcnRpb24uYWRkQ2hhaW5hYmxlTWV0aG9kKFwiYW5cIiwgYW4pO1xuQXNzZXJ0aW9uLmFkZENoYWluYWJsZU1ldGhvZChcImFcIiwgYW4pO1xuZnVuY3Rpb24gU2FtZVZhbHVlWmVybyhhLCBiKSB7XG4gIHJldHVybiBpc05hTjIoYSkgJiYgaXNOYU4yKGIpIHx8IGEgPT09IGI7XG59XG5fX25hbWUoU2FtZVZhbHVlWmVybywgXCJTYW1lVmFsdWVaZXJvXCIpO1xuZnVuY3Rpb24gaW5jbHVkZUNoYWluaW5nQmVoYXZpb3IoKSB7XG4gIGZsYWcyKHRoaXMsIFwiY29udGFpbnNcIiwgdHJ1ZSk7XG59XG5fX25hbWUoaW5jbHVkZUNoYWluaW5nQmVoYXZpb3IsIFwiaW5jbHVkZUNoYWluaW5nQmVoYXZpb3JcIik7XG5mdW5jdGlvbiBpbmNsdWRlKHZhbCwgbXNnKSB7XG4gIGlmIChtc2cpIGZsYWcyKHRoaXMsIFwibWVzc2FnZVwiLCBtc2cpO1xuICBsZXQgb2JqID0gZmxhZzIodGhpcywgXCJvYmplY3RcIiksIG9ialR5cGUgPSB0eXBlKG9iaikudG9Mb3dlckNhc2UoKSwgZmxhZ01zZyA9IGZsYWcyKHRoaXMsIFwibWVzc2FnZVwiKSwgbmVnYXRlID0gZmxhZzIodGhpcywgXCJuZWdhdGVcIiksIHNzZmkgPSBmbGFnMih0aGlzLCBcInNzZmlcIiksIGlzRGVlcCA9IGZsYWcyKHRoaXMsIFwiZGVlcFwiKSwgZGVzY3JpcHRvciA9IGlzRGVlcCA/IFwiZGVlcCBcIiA6IFwiXCIsIGlzRXFsID0gaXNEZWVwID8gZmxhZzIodGhpcywgXCJlcWxcIikgOiBTYW1lVmFsdWVaZXJvO1xuICBmbGFnTXNnID0gZmxhZ01zZyA/IGZsYWdNc2cgKyBcIjogXCIgOiBcIlwiO1xuICBsZXQgaW5jbHVkZWQgPSBmYWxzZTtcbiAgc3dpdGNoIChvYmpUeXBlKSB7XG4gICAgY2FzZSBcInN0cmluZ1wiOlxuICAgICAgaW5jbHVkZWQgPSBvYmouaW5kZXhPZih2YWwpICE9PSAtMTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJ3ZWFrc2V0XCI6XG4gICAgICBpZiAoaXNEZWVwKSB7XG4gICAgICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihcbiAgICAgICAgICBmbGFnTXNnICsgXCJ1bmFibGUgdG8gdXNlIC5kZWVwLmluY2x1ZGUgd2l0aCBXZWFrU2V0XCIsXG4gICAgICAgICAgdm9pZCAwLFxuICAgICAgICAgIHNzZmlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGluY2x1ZGVkID0gb2JqLmhhcyh2YWwpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIm1hcFwiOlxuICAgICAgb2JqLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICBpbmNsdWRlZCA9IGluY2x1ZGVkIHx8IGlzRXFsKGl0ZW0sIHZhbCk7XG4gICAgICB9KTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJzZXRcIjpcbiAgICAgIGlmIChpc0RlZXApIHtcbiAgICAgICAgb2JqLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgIGluY2x1ZGVkID0gaW5jbHVkZWQgfHwgaXNFcWwoaXRlbSwgdmFsKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbmNsdWRlZCA9IG9iai5oYXModmFsKTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJhcnJheVwiOlxuICAgICAgaWYgKGlzRGVlcCkge1xuICAgICAgICBpbmNsdWRlZCA9IG9iai5zb21lKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICByZXR1cm4gaXNFcWwoaXRlbSwgdmFsKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbmNsdWRlZCA9IG9iai5pbmRleE9mKHZhbCkgIT09IC0xO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDoge1xuICAgICAgaWYgKHZhbCAhPT0gT2JqZWN0KHZhbCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEFzc2VydGlvbkVycm9yKFxuICAgICAgICAgIGZsYWdNc2cgKyBcInRoZSBnaXZlbiBjb21iaW5hdGlvbiBvZiBhcmd1bWVudHMgKFwiICsgb2JqVHlwZSArIFwiIGFuZCBcIiArIHR5cGUodmFsKS50b0xvd2VyQ2FzZSgpICsgXCIpIGlzIGludmFsaWQgZm9yIHRoaXMgYXNzZXJ0aW9uLiBZb3UgY2FuIHVzZSBhbiBhcnJheSwgYSBtYXAsIGFuIG9iamVjdCwgYSBzZXQsIGEgc3RyaW5nLCBvciBhIHdlYWtzZXQgaW5zdGVhZCBvZiBhIFwiICsgdHlwZSh2YWwpLnRvTG93ZXJDYXNlKCksXG4gICAgICAgICAgdm9pZCAwLFxuICAgICAgICAgIHNzZmlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGxldCBwcm9wcyA9IE9iamVjdC5rZXlzKHZhbCk7XG4gICAgICBsZXQgZmlyc3RFcnIgPSBudWxsO1xuICAgICAgbGV0IG51bUVycnMgPSAwO1xuICAgICAgcHJvcHMuZm9yRWFjaChmdW5jdGlvbihwcm9wKSB7XG4gICAgICAgIGxldCBwcm9wQXNzZXJ0aW9uID0gbmV3IEFzc2VydGlvbihvYmopO1xuICAgICAgICB0cmFuc2ZlckZsYWdzKHRoaXMsIHByb3BBc3NlcnRpb24sIHRydWUpO1xuICAgICAgICBmbGFnMihwcm9wQXNzZXJ0aW9uLCBcImxvY2tTc2ZpXCIsIHRydWUpO1xuICAgICAgICBpZiAoIW5lZ2F0ZSB8fCBwcm9wcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICBwcm9wQXNzZXJ0aW9uLnByb3BlcnR5KHByb3AsIHZhbFtwcm9wXSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcHJvcEFzc2VydGlvbi5wcm9wZXJ0eShwcm9wLCB2YWxbcHJvcF0pO1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBpZiAoIWNoZWNrX2Vycm9yX2V4cG9ydHMuY29tcGF0aWJsZUNvbnN0cnVjdG9yKGVyciwgQXNzZXJ0aW9uRXJyb3IpKSB7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChmaXJzdEVyciA9PT0gbnVsbCkgZmlyc3RFcnIgPSBlcnI7XG4gICAgICAgICAgbnVtRXJycysrO1xuICAgICAgICB9XG4gICAgICB9LCB0aGlzKTtcbiAgICAgIGlmIChuZWdhdGUgJiYgcHJvcHMubGVuZ3RoID4gMSAmJiBudW1FcnJzID09PSBwcm9wcy5sZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgZmlyc3RFcnI7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG4gIHRoaXMuYXNzZXJ0KFxuICAgIGluY2x1ZGVkLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBcIiArIGRlc2NyaXB0b3IgKyBcImluY2x1ZGUgXCIgKyBpbnNwZWN0Mih2YWwpLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgXCIgKyBkZXNjcmlwdG9yICsgXCJpbmNsdWRlIFwiICsgaW5zcGVjdDIodmFsKVxuICApO1xufVxuX19uYW1lKGluY2x1ZGUsIFwiaW5jbHVkZVwiKTtcbkFzc2VydGlvbi5hZGRDaGFpbmFibGVNZXRob2QoXCJpbmNsdWRlXCIsIGluY2x1ZGUsIGluY2x1ZGVDaGFpbmluZ0JlaGF2aW9yKTtcbkFzc2VydGlvbi5hZGRDaGFpbmFibGVNZXRob2QoXCJjb250YWluXCIsIGluY2x1ZGUsIGluY2x1ZGVDaGFpbmluZ0JlaGF2aW9yKTtcbkFzc2VydGlvbi5hZGRDaGFpbmFibGVNZXRob2QoXCJjb250YWluc1wiLCBpbmNsdWRlLCBpbmNsdWRlQ2hhaW5pbmdCZWhhdmlvcik7XG5Bc3NlcnRpb24uYWRkQ2hhaW5hYmxlTWV0aG9kKFwiaW5jbHVkZXNcIiwgaW5jbHVkZSwgaW5jbHVkZUNoYWluaW5nQmVoYXZpb3IpO1xuQXNzZXJ0aW9uLmFkZFByb3BlcnR5KFwib2tcIiwgZnVuY3Rpb24oKSB7XG4gIHRoaXMuYXNzZXJ0KFxuICAgIGZsYWcyKHRoaXMsIFwib2JqZWN0XCIpLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSB0cnV0aHlcIixcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gYmUgZmFsc3lcIlxuICApO1xufSk7XG5Bc3NlcnRpb24uYWRkUHJvcGVydHkoXCJ0cnVlXCIsIGZ1bmN0aW9uKCkge1xuICB0aGlzLmFzc2VydChcbiAgICB0cnVlID09PSBmbGFnMih0aGlzLCBcIm9iamVjdFwiKSxcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gYmUgdHJ1ZVwiLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBmYWxzZVwiLFxuICAgIGZsYWcyKHRoaXMsIFwibmVnYXRlXCIpID8gZmFsc2UgOiB0cnVlXG4gICk7XG59KTtcbkFzc2VydGlvbi5hZGRQcm9wZXJ0eShcIm51bWVyaWNcIiwgZnVuY3Rpb24oKSB7XG4gIGNvbnN0IG9iamVjdCA9IGZsYWcyKHRoaXMsIFwib2JqZWN0XCIpO1xuICB0aGlzLmFzc2VydChcbiAgICBbXCJOdW1iZXJcIiwgXCJCaWdJbnRcIl0uaW5jbHVkZXModHlwZShvYmplY3QpKSxcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gYmUgbnVtZXJpY1wiLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgYmUgbnVtZXJpY1wiLFxuICAgIGZsYWcyKHRoaXMsIFwibmVnYXRlXCIpID8gZmFsc2UgOiB0cnVlXG4gICk7XG59KTtcbkFzc2VydGlvbi5hZGRQcm9wZXJ0eShcImNhbGxhYmxlXCIsIGZ1bmN0aW9uKCkge1xuICBjb25zdCB2YWwgPSBmbGFnMih0aGlzLCBcIm9iamVjdFwiKTtcbiAgY29uc3Qgc3NmaSA9IGZsYWcyKHRoaXMsIFwic3NmaVwiKTtcbiAgY29uc3QgbWVzc2FnZSA9IGZsYWcyKHRoaXMsIFwibWVzc2FnZVwiKTtcbiAgY29uc3QgbXNnID0gbWVzc2FnZSA/IGAke21lc3NhZ2V9OiBgIDogXCJcIjtcbiAgY29uc3QgbmVnYXRlID0gZmxhZzIodGhpcywgXCJuZWdhdGVcIik7XG4gIGNvbnN0IGFzc2VydGlvbk1lc3NhZ2UgPSBuZWdhdGUgPyBgJHttc2d9ZXhwZWN0ZWQgJHtpbnNwZWN0Mih2YWwpfSBub3QgdG8gYmUgYSBjYWxsYWJsZSBmdW5jdGlvbmAgOiBgJHttc2d9ZXhwZWN0ZWQgJHtpbnNwZWN0Mih2YWwpfSB0byBiZSBhIGNhbGxhYmxlIGZ1bmN0aW9uYDtcbiAgY29uc3QgaXNDYWxsYWJsZSA9IFtcbiAgICBcIkZ1bmN0aW9uXCIsXG4gICAgXCJBc3luY0Z1bmN0aW9uXCIsXG4gICAgXCJHZW5lcmF0b3JGdW5jdGlvblwiLFxuICAgIFwiQXN5bmNHZW5lcmF0b3JGdW5jdGlvblwiXG4gIF0uaW5jbHVkZXModHlwZSh2YWwpKTtcbiAgaWYgKGlzQ2FsbGFibGUgJiYgbmVnYXRlIHx8ICFpc0NhbGxhYmxlICYmICFuZWdhdGUpIHtcbiAgICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IoYXNzZXJ0aW9uTWVzc2FnZSwgdm9pZCAwLCBzc2ZpKTtcbiAgfVxufSk7XG5Bc3NlcnRpb24uYWRkUHJvcGVydHkoXCJmYWxzZVwiLCBmdW5jdGlvbigpIHtcbiAgdGhpcy5hc3NlcnQoXG4gICAgZmFsc2UgPT09IGZsYWcyKHRoaXMsIFwib2JqZWN0XCIpLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBmYWxzZVwiLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSB0cnVlXCIsXG4gICAgZmxhZzIodGhpcywgXCJuZWdhdGVcIikgPyB0cnVlIDogZmFsc2VcbiAgKTtcbn0pO1xuQXNzZXJ0aW9uLmFkZFByb3BlcnR5KFwibnVsbFwiLCBmdW5jdGlvbigpIHtcbiAgdGhpcy5hc3NlcnQoXG4gICAgbnVsbCA9PT0gZmxhZzIodGhpcywgXCJvYmplY3RcIiksXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGJlIG51bGxcIixcbiAgICBcImV4cGVjdGVkICN7dGhpc30gbm90IHRvIGJlIG51bGxcIlxuICApO1xufSk7XG5Bc3NlcnRpb24uYWRkUHJvcGVydHkoXCJ1bmRlZmluZWRcIiwgZnVuY3Rpb24oKSB7XG4gIHRoaXMuYXNzZXJ0KFxuICAgIHZvaWQgMCA9PT0gZmxhZzIodGhpcywgXCJvYmplY3RcIiksXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGJlIHVuZGVmaW5lZFwiLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSBub3QgdG8gYmUgdW5kZWZpbmVkXCJcbiAgKTtcbn0pO1xuQXNzZXJ0aW9uLmFkZFByb3BlcnR5KFwiTmFOXCIsIGZ1bmN0aW9uKCkge1xuICB0aGlzLmFzc2VydChcbiAgICBpc05hTjIoZmxhZzIodGhpcywgXCJvYmplY3RcIikpLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBOYU5cIixcbiAgICBcImV4cGVjdGVkICN7dGhpc30gbm90IHRvIGJlIE5hTlwiXG4gICk7XG59KTtcbmZ1bmN0aW9uIGFzc2VydEV4aXN0KCkge1xuICBsZXQgdmFsID0gZmxhZzIodGhpcywgXCJvYmplY3RcIik7XG4gIHRoaXMuYXNzZXJ0KFxuICAgIHZhbCAhPT0gbnVsbCAmJiB2YWwgIT09IHZvaWQgMCxcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gZXhpc3RcIixcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gbm90IGV4aXN0XCJcbiAgKTtcbn1cbl9fbmFtZShhc3NlcnRFeGlzdCwgXCJhc3NlcnRFeGlzdFwiKTtcbkFzc2VydGlvbi5hZGRQcm9wZXJ0eShcImV4aXN0XCIsIGFzc2VydEV4aXN0KTtcbkFzc2VydGlvbi5hZGRQcm9wZXJ0eShcImV4aXN0c1wiLCBhc3NlcnRFeGlzdCk7XG5Bc3NlcnRpb24uYWRkUHJvcGVydHkoXCJlbXB0eVwiLCBmdW5jdGlvbigpIHtcbiAgbGV0IHZhbCA9IGZsYWcyKHRoaXMsIFwib2JqZWN0XCIpLCBzc2ZpID0gZmxhZzIodGhpcywgXCJzc2ZpXCIpLCBmbGFnTXNnID0gZmxhZzIodGhpcywgXCJtZXNzYWdlXCIpLCBpdGVtc0NvdW50O1xuICBmbGFnTXNnID0gZmxhZ01zZyA/IGZsYWdNc2cgKyBcIjogXCIgOiBcIlwiO1xuICBzd2l0Y2ggKHR5cGUodmFsKS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2FzZSBcImFycmF5XCI6XG4gICAgY2FzZSBcInN0cmluZ1wiOlxuICAgICAgaXRlbXNDb3VudCA9IHZhbC5sZW5ndGg7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwibWFwXCI6XG4gICAgY2FzZSBcInNldFwiOlxuICAgICAgaXRlbXNDb3VudCA9IHZhbC5zaXplO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIndlYWttYXBcIjpcbiAgICBjYXNlIFwid2Vha3NldFwiOlxuICAgICAgdGhyb3cgbmV3IEFzc2VydGlvbkVycm9yKFxuICAgICAgICBmbGFnTXNnICsgXCIuZW1wdHkgd2FzIHBhc3NlZCBhIHdlYWsgY29sbGVjdGlvblwiLFxuICAgICAgICB2b2lkIDAsXG4gICAgICAgIHNzZmlcbiAgICAgICk7XG4gICAgY2FzZSBcImZ1bmN0aW9uXCI6IHtcbiAgICAgIGNvbnN0IG1zZyA9IGZsYWdNc2cgKyBcIi5lbXB0eSB3YXMgcGFzc2VkIGEgZnVuY3Rpb24gXCIgKyBnZXROYW1lKHZhbCk7XG4gICAgICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IobXNnLnRyaW0oKSwgdm9pZCAwLCBzc2ZpKTtcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIGlmICh2YWwgIT09IE9iamVjdCh2YWwpKSB7XG4gICAgICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihcbiAgICAgICAgICBmbGFnTXNnICsgXCIuZW1wdHkgd2FzIHBhc3NlZCBub24tc3RyaW5nIHByaW1pdGl2ZSBcIiArIGluc3BlY3QyKHZhbCksXG4gICAgICAgICAgdm9pZCAwLFxuICAgICAgICAgIHNzZmlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGl0ZW1zQ291bnQgPSBPYmplY3Qua2V5cyh2YWwpLmxlbmd0aDtcbiAgfVxuICB0aGlzLmFzc2VydChcbiAgICAwID09PSBpdGVtc0NvdW50LFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBlbXB0eVwiLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSBub3QgdG8gYmUgZW1wdHlcIlxuICApO1xufSk7XG5mdW5jdGlvbiBjaGVja0FyZ3VtZW50cygpIHtcbiAgbGV0IG9iaiA9IGZsYWcyKHRoaXMsIFwib2JqZWN0XCIpLCB0eXBlMyA9IHR5cGUob2JqKTtcbiAgdGhpcy5hc3NlcnQoXG4gICAgXCJBcmd1bWVudHNcIiA9PT0gdHlwZTMsXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGJlIGFyZ3VtZW50cyBidXQgZ290IFwiICsgdHlwZTMsXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBiZSBhcmd1bWVudHNcIlxuICApO1xufVxuX19uYW1lKGNoZWNrQXJndW1lbnRzLCBcImNoZWNrQXJndW1lbnRzXCIpO1xuQXNzZXJ0aW9uLmFkZFByb3BlcnR5KFwiYXJndW1lbnRzXCIsIGNoZWNrQXJndW1lbnRzKTtcbkFzc2VydGlvbi5hZGRQcm9wZXJ0eShcIkFyZ3VtZW50c1wiLCBjaGVja0FyZ3VtZW50cyk7XG5mdW5jdGlvbiBhc3NlcnRFcXVhbCh2YWwsIG1zZykge1xuICBpZiAobXNnKSBmbGFnMih0aGlzLCBcIm1lc3NhZ2VcIiwgbXNnKTtcbiAgbGV0IG9iaiA9IGZsYWcyKHRoaXMsIFwib2JqZWN0XCIpO1xuICBpZiAoZmxhZzIodGhpcywgXCJkZWVwXCIpKSB7XG4gICAgbGV0IHByZXZMb2NrU3NmaSA9IGZsYWcyKHRoaXMsIFwibG9ja1NzZmlcIik7XG4gICAgZmxhZzIodGhpcywgXCJsb2NrU3NmaVwiLCB0cnVlKTtcbiAgICB0aGlzLmVxbCh2YWwpO1xuICAgIGZsYWcyKHRoaXMsIFwibG9ja1NzZmlcIiwgcHJldkxvY2tTc2ZpKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmFzc2VydChcbiAgICAgIHZhbCA9PT0gb2JqLFxuICAgICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGVxdWFsICN7ZXhwfVwiLFxuICAgICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBlcXVhbCAje2V4cH1cIixcbiAgICAgIHZhbCxcbiAgICAgIHRoaXMuX29iaixcbiAgICAgIHRydWVcbiAgICApO1xuICB9XG59XG5fX25hbWUoYXNzZXJ0RXF1YWwsIFwiYXNzZXJ0RXF1YWxcIik7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwiZXF1YWxcIiwgYXNzZXJ0RXF1YWwpO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcImVxdWFsc1wiLCBhc3NlcnRFcXVhbCk7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwiZXFcIiwgYXNzZXJ0RXF1YWwpO1xuZnVuY3Rpb24gYXNzZXJ0RXFsKG9iaiwgbXNnKSB7XG4gIGlmIChtc2cpIGZsYWcyKHRoaXMsIFwibWVzc2FnZVwiLCBtc2cpO1xuICBsZXQgZXFsID0gZmxhZzIodGhpcywgXCJlcWxcIik7XG4gIHRoaXMuYXNzZXJ0KFxuICAgIGVxbChvYmosIGZsYWcyKHRoaXMsIFwib2JqZWN0XCIpKSxcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gZGVlcGx5IGVxdWFsICN7ZXhwfVwiLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgZGVlcGx5IGVxdWFsICN7ZXhwfVwiLFxuICAgIG9iaixcbiAgICB0aGlzLl9vYmosXG4gICAgdHJ1ZVxuICApO1xufVxuX19uYW1lKGFzc2VydEVxbCwgXCJhc3NlcnRFcWxcIik7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwiZXFsXCIsIGFzc2VydEVxbCk7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwiZXFsc1wiLCBhc3NlcnRFcWwpO1xuZnVuY3Rpb24gYXNzZXJ0QWJvdmUobiwgbXNnKSB7XG4gIGlmIChtc2cpIGZsYWcyKHRoaXMsIFwibWVzc2FnZVwiLCBtc2cpO1xuICBsZXQgb2JqID0gZmxhZzIodGhpcywgXCJvYmplY3RcIiksIGRvTGVuZ3RoID0gZmxhZzIodGhpcywgXCJkb0xlbmd0aFwiKSwgZmxhZ01zZyA9IGZsYWcyKHRoaXMsIFwibWVzc2FnZVwiKSwgbXNnUHJlZml4ID0gZmxhZ01zZyA/IGZsYWdNc2cgKyBcIjogXCIgOiBcIlwiLCBzc2ZpID0gZmxhZzIodGhpcywgXCJzc2ZpXCIpLCBvYmpUeXBlID0gdHlwZShvYmopLnRvTG93ZXJDYXNlKCksIG5UeXBlID0gdHlwZShuKS50b0xvd2VyQ2FzZSgpO1xuICBpZiAoZG9MZW5ndGggJiYgb2JqVHlwZSAhPT0gXCJtYXBcIiAmJiBvYmpUeXBlICE9PSBcInNldFwiKSB7XG4gICAgbmV3IEFzc2VydGlvbihvYmosIGZsYWdNc2csIHNzZmksIHRydWUpLnRvLmhhdmUucHJvcGVydHkoXCJsZW5ndGhcIik7XG4gIH1cbiAgaWYgKCFkb0xlbmd0aCAmJiBvYmpUeXBlID09PSBcImRhdGVcIiAmJiBuVHlwZSAhPT0gXCJkYXRlXCIpIHtcbiAgICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IoXG4gICAgICBtc2dQcmVmaXggKyBcInRoZSBhcmd1bWVudCB0byBhYm92ZSBtdXN0IGJlIGEgZGF0ZVwiLFxuICAgICAgdm9pZCAwLFxuICAgICAgc3NmaVxuICAgICk7XG4gIH0gZWxzZSBpZiAoIWlzTnVtZXJpYyhuKSAmJiAoZG9MZW5ndGggfHwgaXNOdW1lcmljKG9iaikpKSB7XG4gICAgdGhyb3cgbmV3IEFzc2VydGlvbkVycm9yKFxuICAgICAgbXNnUHJlZml4ICsgXCJ0aGUgYXJndW1lbnQgdG8gYWJvdmUgbXVzdCBiZSBhIG51bWJlclwiLFxuICAgICAgdm9pZCAwLFxuICAgICAgc3NmaVxuICAgICk7XG4gIH0gZWxzZSBpZiAoIWRvTGVuZ3RoICYmIG9ialR5cGUgIT09IFwiZGF0ZVwiICYmICFpc051bWVyaWMob2JqKSkge1xuICAgIGxldCBwcmludE9iaiA9IG9ialR5cGUgPT09IFwic3RyaW5nXCIgPyBcIidcIiArIG9iaiArIFwiJ1wiIDogb2JqO1xuICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihcbiAgICAgIG1zZ1ByZWZpeCArIFwiZXhwZWN0ZWQgXCIgKyBwcmludE9iaiArIFwiIHRvIGJlIGEgbnVtYmVyIG9yIGEgZGF0ZVwiLFxuICAgICAgdm9pZCAwLFxuICAgICAgc3NmaVxuICAgICk7XG4gIH1cbiAgaWYgKGRvTGVuZ3RoKSB7XG4gICAgbGV0IGRlc2NyaXB0b3IgPSBcImxlbmd0aFwiLCBpdGVtc0NvdW50O1xuICAgIGlmIChvYmpUeXBlID09PSBcIm1hcFwiIHx8IG9ialR5cGUgPT09IFwic2V0XCIpIHtcbiAgICAgIGRlc2NyaXB0b3IgPSBcInNpemVcIjtcbiAgICAgIGl0ZW1zQ291bnQgPSBvYmouc2l6ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaXRlbXNDb3VudCA9IG9iai5sZW5ndGg7XG4gICAgfVxuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgaXRlbXNDb3VudCA+IG4sXG4gICAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gaGF2ZSBhIFwiICsgZGVzY3JpcHRvciArIFwiIGFib3ZlICN7ZXhwfSBidXQgZ290ICN7YWN0fVwiLFxuICAgICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBoYXZlIGEgXCIgKyBkZXNjcmlwdG9yICsgXCIgYWJvdmUgI3tleHB9XCIsXG4gICAgICBuLFxuICAgICAgaXRlbXNDb3VudFxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICBvYmogPiBuLFxuICAgICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGJlIGFib3ZlICN7ZXhwfVwiLFxuICAgICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGJlIGF0IG1vc3QgI3tleHB9XCIsXG4gICAgICBuXG4gICAgKTtcbiAgfVxufVxuX19uYW1lKGFzc2VydEFib3ZlLCBcImFzc2VydEFib3ZlXCIpO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcImFib3ZlXCIsIGFzc2VydEFib3ZlKTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJndFwiLCBhc3NlcnRBYm92ZSk7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwiZ3JlYXRlclRoYW5cIiwgYXNzZXJ0QWJvdmUpO1xuZnVuY3Rpb24gYXNzZXJ0TGVhc3QobiwgbXNnKSB7XG4gIGlmIChtc2cpIGZsYWcyKHRoaXMsIFwibWVzc2FnZVwiLCBtc2cpO1xuICBsZXQgb2JqID0gZmxhZzIodGhpcywgXCJvYmplY3RcIiksIGRvTGVuZ3RoID0gZmxhZzIodGhpcywgXCJkb0xlbmd0aFwiKSwgZmxhZ01zZyA9IGZsYWcyKHRoaXMsIFwibWVzc2FnZVwiKSwgbXNnUHJlZml4ID0gZmxhZ01zZyA/IGZsYWdNc2cgKyBcIjogXCIgOiBcIlwiLCBzc2ZpID0gZmxhZzIodGhpcywgXCJzc2ZpXCIpLCBvYmpUeXBlID0gdHlwZShvYmopLnRvTG93ZXJDYXNlKCksIG5UeXBlID0gdHlwZShuKS50b0xvd2VyQ2FzZSgpLCBlcnJvck1lc3NhZ2UsIHNob3VsZFRocm93ID0gdHJ1ZTtcbiAgaWYgKGRvTGVuZ3RoICYmIG9ialR5cGUgIT09IFwibWFwXCIgJiYgb2JqVHlwZSAhPT0gXCJzZXRcIikge1xuICAgIG5ldyBBc3NlcnRpb24ob2JqLCBmbGFnTXNnLCBzc2ZpLCB0cnVlKS50by5oYXZlLnByb3BlcnR5KFwibGVuZ3RoXCIpO1xuICB9XG4gIGlmICghZG9MZW5ndGggJiYgb2JqVHlwZSA9PT0gXCJkYXRlXCIgJiYgblR5cGUgIT09IFwiZGF0ZVwiKSB7XG4gICAgZXJyb3JNZXNzYWdlID0gbXNnUHJlZml4ICsgXCJ0aGUgYXJndW1lbnQgdG8gbGVhc3QgbXVzdCBiZSBhIGRhdGVcIjtcbiAgfSBlbHNlIGlmICghaXNOdW1lcmljKG4pICYmIChkb0xlbmd0aCB8fCBpc051bWVyaWMob2JqKSkpIHtcbiAgICBlcnJvck1lc3NhZ2UgPSBtc2dQcmVmaXggKyBcInRoZSBhcmd1bWVudCB0byBsZWFzdCBtdXN0IGJlIGEgbnVtYmVyXCI7XG4gIH0gZWxzZSBpZiAoIWRvTGVuZ3RoICYmIG9ialR5cGUgIT09IFwiZGF0ZVwiICYmICFpc051bWVyaWMob2JqKSkge1xuICAgIGxldCBwcmludE9iaiA9IG9ialR5cGUgPT09IFwic3RyaW5nXCIgPyBcIidcIiArIG9iaiArIFwiJ1wiIDogb2JqO1xuICAgIGVycm9yTWVzc2FnZSA9IG1zZ1ByZWZpeCArIFwiZXhwZWN0ZWQgXCIgKyBwcmludE9iaiArIFwiIHRvIGJlIGEgbnVtYmVyIG9yIGEgZGF0ZVwiO1xuICB9IGVsc2Uge1xuICAgIHNob3VsZFRocm93ID0gZmFsc2U7XG4gIH1cbiAgaWYgKHNob3VsZFRocm93KSB7XG4gICAgdGhyb3cgbmV3IEFzc2VydGlvbkVycm9yKGVycm9yTWVzc2FnZSwgdm9pZCAwLCBzc2ZpKTtcbiAgfVxuICBpZiAoZG9MZW5ndGgpIHtcbiAgICBsZXQgZGVzY3JpcHRvciA9IFwibGVuZ3RoXCIsIGl0ZW1zQ291bnQ7XG4gICAgaWYgKG9ialR5cGUgPT09IFwibWFwXCIgfHwgb2JqVHlwZSA9PT0gXCJzZXRcIikge1xuICAgICAgZGVzY3JpcHRvciA9IFwic2l6ZVwiO1xuICAgICAgaXRlbXNDb3VudCA9IG9iai5zaXplO1xuICAgIH0gZWxzZSB7XG4gICAgICBpdGVtc0NvdW50ID0gb2JqLmxlbmd0aDtcbiAgICB9XG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICBpdGVtc0NvdW50ID49IG4sXG4gICAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gaGF2ZSBhIFwiICsgZGVzY3JpcHRvciArIFwiIGF0IGxlYXN0ICN7ZXhwfSBidXQgZ290ICN7YWN0fVwiLFxuICAgICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGhhdmUgYSBcIiArIGRlc2NyaXB0b3IgKyBcIiBiZWxvdyAje2V4cH1cIixcbiAgICAgIG4sXG4gICAgICBpdGVtc0NvdW50XG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmFzc2VydChcbiAgICAgIG9iaiA+PSBuLFxuICAgICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGJlIGF0IGxlYXN0ICN7ZXhwfVwiLFxuICAgICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGJlIGJlbG93ICN7ZXhwfVwiLFxuICAgICAgblxuICAgICk7XG4gIH1cbn1cbl9fbmFtZShhc3NlcnRMZWFzdCwgXCJhc3NlcnRMZWFzdFwiKTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJsZWFzdFwiLCBhc3NlcnRMZWFzdCk7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwiZ3RlXCIsIGFzc2VydExlYXN0KTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJncmVhdGVyVGhhbk9yRXF1YWxcIiwgYXNzZXJ0TGVhc3QpO1xuZnVuY3Rpb24gYXNzZXJ0QmVsb3cobiwgbXNnKSB7XG4gIGlmIChtc2cpIGZsYWcyKHRoaXMsIFwibWVzc2FnZVwiLCBtc2cpO1xuICBsZXQgb2JqID0gZmxhZzIodGhpcywgXCJvYmplY3RcIiksIGRvTGVuZ3RoID0gZmxhZzIodGhpcywgXCJkb0xlbmd0aFwiKSwgZmxhZ01zZyA9IGZsYWcyKHRoaXMsIFwibWVzc2FnZVwiKSwgbXNnUHJlZml4ID0gZmxhZ01zZyA/IGZsYWdNc2cgKyBcIjogXCIgOiBcIlwiLCBzc2ZpID0gZmxhZzIodGhpcywgXCJzc2ZpXCIpLCBvYmpUeXBlID0gdHlwZShvYmopLnRvTG93ZXJDYXNlKCksIG5UeXBlID0gdHlwZShuKS50b0xvd2VyQ2FzZSgpLCBlcnJvck1lc3NhZ2UsIHNob3VsZFRocm93ID0gdHJ1ZTtcbiAgaWYgKGRvTGVuZ3RoICYmIG9ialR5cGUgIT09IFwibWFwXCIgJiYgb2JqVHlwZSAhPT0gXCJzZXRcIikge1xuICAgIG5ldyBBc3NlcnRpb24ob2JqLCBmbGFnTXNnLCBzc2ZpLCB0cnVlKS50by5oYXZlLnByb3BlcnR5KFwibGVuZ3RoXCIpO1xuICB9XG4gIGlmICghZG9MZW5ndGggJiYgb2JqVHlwZSA9PT0gXCJkYXRlXCIgJiYgblR5cGUgIT09IFwiZGF0ZVwiKSB7XG4gICAgZXJyb3JNZXNzYWdlID0gbXNnUHJlZml4ICsgXCJ0aGUgYXJndW1lbnQgdG8gYmVsb3cgbXVzdCBiZSBhIGRhdGVcIjtcbiAgfSBlbHNlIGlmICghaXNOdW1lcmljKG4pICYmIChkb0xlbmd0aCB8fCBpc051bWVyaWMob2JqKSkpIHtcbiAgICBlcnJvck1lc3NhZ2UgPSBtc2dQcmVmaXggKyBcInRoZSBhcmd1bWVudCB0byBiZWxvdyBtdXN0IGJlIGEgbnVtYmVyXCI7XG4gIH0gZWxzZSBpZiAoIWRvTGVuZ3RoICYmIG9ialR5cGUgIT09IFwiZGF0ZVwiICYmICFpc051bWVyaWMob2JqKSkge1xuICAgIGxldCBwcmludE9iaiA9IG9ialR5cGUgPT09IFwic3RyaW5nXCIgPyBcIidcIiArIG9iaiArIFwiJ1wiIDogb2JqO1xuICAgIGVycm9yTWVzc2FnZSA9IG1zZ1ByZWZpeCArIFwiZXhwZWN0ZWQgXCIgKyBwcmludE9iaiArIFwiIHRvIGJlIGEgbnVtYmVyIG9yIGEgZGF0ZVwiO1xuICB9IGVsc2Uge1xuICAgIHNob3VsZFRocm93ID0gZmFsc2U7XG4gIH1cbiAgaWYgKHNob3VsZFRocm93KSB7XG4gICAgdGhyb3cgbmV3IEFzc2VydGlvbkVycm9yKGVycm9yTWVzc2FnZSwgdm9pZCAwLCBzc2ZpKTtcbiAgfVxuICBpZiAoZG9MZW5ndGgpIHtcbiAgICBsZXQgZGVzY3JpcHRvciA9IFwibGVuZ3RoXCIsIGl0ZW1zQ291bnQ7XG4gICAgaWYgKG9ialR5cGUgPT09IFwibWFwXCIgfHwgb2JqVHlwZSA9PT0gXCJzZXRcIikge1xuICAgICAgZGVzY3JpcHRvciA9IFwic2l6ZVwiO1xuICAgICAgaXRlbXNDb3VudCA9IG9iai5zaXplO1xuICAgIH0gZWxzZSB7XG4gICAgICBpdGVtc0NvdW50ID0gb2JqLmxlbmd0aDtcbiAgICB9XG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICBpdGVtc0NvdW50IDwgbixcbiAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBoYXZlIGEgXCIgKyBkZXNjcmlwdG9yICsgXCIgYmVsb3cgI3tleHB9IGJ1dCBnb3QgI3thY3R9XCIsXG4gICAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gbm90IGhhdmUgYSBcIiArIGRlc2NyaXB0b3IgKyBcIiBiZWxvdyAje2V4cH1cIixcbiAgICAgIG4sXG4gICAgICBpdGVtc0NvdW50XG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmFzc2VydChcbiAgICAgIG9iaiA8IG4sXG4gICAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gYmUgYmVsb3cgI3tleHB9XCIsXG4gICAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gYmUgYXQgbGVhc3QgI3tleHB9XCIsXG4gICAgICBuXG4gICAgKTtcbiAgfVxufVxuX19uYW1lKGFzc2VydEJlbG93LCBcImFzc2VydEJlbG93XCIpO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcImJlbG93XCIsIGFzc2VydEJlbG93KTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJsdFwiLCBhc3NlcnRCZWxvdyk7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwibGVzc1RoYW5cIiwgYXNzZXJ0QmVsb3cpO1xuZnVuY3Rpb24gYXNzZXJ0TW9zdChuLCBtc2cpIHtcbiAgaWYgKG1zZykgZmxhZzIodGhpcywgXCJtZXNzYWdlXCIsIG1zZyk7XG4gIGxldCBvYmogPSBmbGFnMih0aGlzLCBcIm9iamVjdFwiKSwgZG9MZW5ndGggPSBmbGFnMih0aGlzLCBcImRvTGVuZ3RoXCIpLCBmbGFnTXNnID0gZmxhZzIodGhpcywgXCJtZXNzYWdlXCIpLCBtc2dQcmVmaXggPSBmbGFnTXNnID8gZmxhZ01zZyArIFwiOiBcIiA6IFwiXCIsIHNzZmkgPSBmbGFnMih0aGlzLCBcInNzZmlcIiksIG9ialR5cGUgPSB0eXBlKG9iaikudG9Mb3dlckNhc2UoKSwgblR5cGUgPSB0eXBlKG4pLnRvTG93ZXJDYXNlKCksIGVycm9yTWVzc2FnZSwgc2hvdWxkVGhyb3cgPSB0cnVlO1xuICBpZiAoZG9MZW5ndGggJiYgb2JqVHlwZSAhPT0gXCJtYXBcIiAmJiBvYmpUeXBlICE9PSBcInNldFwiKSB7XG4gICAgbmV3IEFzc2VydGlvbihvYmosIGZsYWdNc2csIHNzZmksIHRydWUpLnRvLmhhdmUucHJvcGVydHkoXCJsZW5ndGhcIik7XG4gIH1cbiAgaWYgKCFkb0xlbmd0aCAmJiBvYmpUeXBlID09PSBcImRhdGVcIiAmJiBuVHlwZSAhPT0gXCJkYXRlXCIpIHtcbiAgICBlcnJvck1lc3NhZ2UgPSBtc2dQcmVmaXggKyBcInRoZSBhcmd1bWVudCB0byBtb3N0IG11c3QgYmUgYSBkYXRlXCI7XG4gIH0gZWxzZSBpZiAoIWlzTnVtZXJpYyhuKSAmJiAoZG9MZW5ndGggfHwgaXNOdW1lcmljKG9iaikpKSB7XG4gICAgZXJyb3JNZXNzYWdlID0gbXNnUHJlZml4ICsgXCJ0aGUgYXJndW1lbnQgdG8gbW9zdCBtdXN0IGJlIGEgbnVtYmVyXCI7XG4gIH0gZWxzZSBpZiAoIWRvTGVuZ3RoICYmIG9ialR5cGUgIT09IFwiZGF0ZVwiICYmICFpc051bWVyaWMob2JqKSkge1xuICAgIGxldCBwcmludE9iaiA9IG9ialR5cGUgPT09IFwic3RyaW5nXCIgPyBcIidcIiArIG9iaiArIFwiJ1wiIDogb2JqO1xuICAgIGVycm9yTWVzc2FnZSA9IG1zZ1ByZWZpeCArIFwiZXhwZWN0ZWQgXCIgKyBwcmludE9iaiArIFwiIHRvIGJlIGEgbnVtYmVyIG9yIGEgZGF0ZVwiO1xuICB9IGVsc2Uge1xuICAgIHNob3VsZFRocm93ID0gZmFsc2U7XG4gIH1cbiAgaWYgKHNob3VsZFRocm93KSB7XG4gICAgdGhyb3cgbmV3IEFzc2VydGlvbkVycm9yKGVycm9yTWVzc2FnZSwgdm9pZCAwLCBzc2ZpKTtcbiAgfVxuICBpZiAoZG9MZW5ndGgpIHtcbiAgICBsZXQgZGVzY3JpcHRvciA9IFwibGVuZ3RoXCIsIGl0ZW1zQ291bnQ7XG4gICAgaWYgKG9ialR5cGUgPT09IFwibWFwXCIgfHwgb2JqVHlwZSA9PT0gXCJzZXRcIikge1xuICAgICAgZGVzY3JpcHRvciA9IFwic2l6ZVwiO1xuICAgICAgaXRlbXNDb3VudCA9IG9iai5zaXplO1xuICAgIH0gZWxzZSB7XG4gICAgICBpdGVtc0NvdW50ID0gb2JqLmxlbmd0aDtcbiAgICB9XG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICBpdGVtc0NvdW50IDw9IG4sXG4gICAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gaGF2ZSBhIFwiICsgZGVzY3JpcHRvciArIFwiIGF0IG1vc3QgI3tleHB9IGJ1dCBnb3QgI3thY3R9XCIsXG4gICAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gaGF2ZSBhIFwiICsgZGVzY3JpcHRvciArIFwiIGFib3ZlICN7ZXhwfVwiLFxuICAgICAgbixcbiAgICAgIGl0ZW1zQ291bnRcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgb2JqIDw9IG4sXG4gICAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gYmUgYXQgbW9zdCAje2V4cH1cIixcbiAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBhYm92ZSAje2V4cH1cIixcbiAgICAgIG5cbiAgICApO1xuICB9XG59XG5fX25hbWUoYXNzZXJ0TW9zdCwgXCJhc3NlcnRNb3N0XCIpO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcIm1vc3RcIiwgYXNzZXJ0TW9zdCk7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwibHRlXCIsIGFzc2VydE1vc3QpO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcImxlc3NUaGFuT3JFcXVhbFwiLCBhc3NlcnRNb3N0KTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJ3aXRoaW5cIiwgZnVuY3Rpb24oc3RhcnQsIGZpbmlzaCwgbXNnKSB7XG4gIGlmIChtc2cpIGZsYWcyKHRoaXMsIFwibWVzc2FnZVwiLCBtc2cpO1xuICBsZXQgb2JqID0gZmxhZzIodGhpcywgXCJvYmplY3RcIiksIGRvTGVuZ3RoID0gZmxhZzIodGhpcywgXCJkb0xlbmd0aFwiKSwgZmxhZ01zZyA9IGZsYWcyKHRoaXMsIFwibWVzc2FnZVwiKSwgbXNnUHJlZml4ID0gZmxhZ01zZyA/IGZsYWdNc2cgKyBcIjogXCIgOiBcIlwiLCBzc2ZpID0gZmxhZzIodGhpcywgXCJzc2ZpXCIpLCBvYmpUeXBlID0gdHlwZShvYmopLnRvTG93ZXJDYXNlKCksIHN0YXJ0VHlwZSA9IHR5cGUoc3RhcnQpLnRvTG93ZXJDYXNlKCksIGZpbmlzaFR5cGUgPSB0eXBlKGZpbmlzaCkudG9Mb3dlckNhc2UoKSwgZXJyb3JNZXNzYWdlLCBzaG91bGRUaHJvdyA9IHRydWUsIHJhbmdlID0gc3RhcnRUeXBlID09PSBcImRhdGVcIiAmJiBmaW5pc2hUeXBlID09PSBcImRhdGVcIiA/IHN0YXJ0LnRvSVNPU3RyaW5nKCkgKyBcIi4uXCIgKyBmaW5pc2gudG9JU09TdHJpbmcoKSA6IHN0YXJ0ICsgXCIuLlwiICsgZmluaXNoO1xuICBpZiAoZG9MZW5ndGggJiYgb2JqVHlwZSAhPT0gXCJtYXBcIiAmJiBvYmpUeXBlICE9PSBcInNldFwiKSB7XG4gICAgbmV3IEFzc2VydGlvbihvYmosIGZsYWdNc2csIHNzZmksIHRydWUpLnRvLmhhdmUucHJvcGVydHkoXCJsZW5ndGhcIik7XG4gIH1cbiAgaWYgKCFkb0xlbmd0aCAmJiBvYmpUeXBlID09PSBcImRhdGVcIiAmJiAoc3RhcnRUeXBlICE9PSBcImRhdGVcIiB8fCBmaW5pc2hUeXBlICE9PSBcImRhdGVcIikpIHtcbiAgICBlcnJvck1lc3NhZ2UgPSBtc2dQcmVmaXggKyBcInRoZSBhcmd1bWVudHMgdG8gd2l0aGluIG11c3QgYmUgZGF0ZXNcIjtcbiAgfSBlbHNlIGlmICgoIWlzTnVtZXJpYyhzdGFydCkgfHwgIWlzTnVtZXJpYyhmaW5pc2gpKSAmJiAoZG9MZW5ndGggfHwgaXNOdW1lcmljKG9iaikpKSB7XG4gICAgZXJyb3JNZXNzYWdlID0gbXNnUHJlZml4ICsgXCJ0aGUgYXJndW1lbnRzIHRvIHdpdGhpbiBtdXN0IGJlIG51bWJlcnNcIjtcbiAgfSBlbHNlIGlmICghZG9MZW5ndGggJiYgb2JqVHlwZSAhPT0gXCJkYXRlXCIgJiYgIWlzTnVtZXJpYyhvYmopKSB7XG4gICAgbGV0IHByaW50T2JqID0gb2JqVHlwZSA9PT0gXCJzdHJpbmdcIiA/IFwiJ1wiICsgb2JqICsgXCInXCIgOiBvYmo7XG4gICAgZXJyb3JNZXNzYWdlID0gbXNnUHJlZml4ICsgXCJleHBlY3RlZCBcIiArIHByaW50T2JqICsgXCIgdG8gYmUgYSBudW1iZXIgb3IgYSBkYXRlXCI7XG4gIH0gZWxzZSB7XG4gICAgc2hvdWxkVGhyb3cgPSBmYWxzZTtcbiAgfVxuICBpZiAoc2hvdWxkVGhyb3cpIHtcbiAgICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IoZXJyb3JNZXNzYWdlLCB2b2lkIDAsIHNzZmkpO1xuICB9XG4gIGlmIChkb0xlbmd0aCkge1xuICAgIGxldCBkZXNjcmlwdG9yID0gXCJsZW5ndGhcIiwgaXRlbXNDb3VudDtcbiAgICBpZiAob2JqVHlwZSA9PT0gXCJtYXBcIiB8fCBvYmpUeXBlID09PSBcInNldFwiKSB7XG4gICAgICBkZXNjcmlwdG9yID0gXCJzaXplXCI7XG4gICAgICBpdGVtc0NvdW50ID0gb2JqLnNpemU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGl0ZW1zQ291bnQgPSBvYmoubGVuZ3RoO1xuICAgIH1cbiAgICB0aGlzLmFzc2VydChcbiAgICAgIGl0ZW1zQ291bnQgPj0gc3RhcnQgJiYgaXRlbXNDb3VudCA8PSBmaW5pc2gsXG4gICAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gaGF2ZSBhIFwiICsgZGVzY3JpcHRvciArIFwiIHdpdGhpbiBcIiArIHJhbmdlLFxuICAgICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBoYXZlIGEgXCIgKyBkZXNjcmlwdG9yICsgXCIgd2l0aGluIFwiICsgcmFuZ2VcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgb2JqID49IHN0YXJ0ICYmIG9iaiA8PSBmaW5pc2gsXG4gICAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gYmUgd2l0aGluIFwiICsgcmFuZ2UsXG4gICAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gbm90IGJlIHdpdGhpbiBcIiArIHJhbmdlXG4gICAgKTtcbiAgfVxufSk7XG5mdW5jdGlvbiBhc3NlcnRJbnN0YW5jZU9mKGNvbnN0cnVjdG9yLCBtc2cpIHtcbiAgaWYgKG1zZykgZmxhZzIodGhpcywgXCJtZXNzYWdlXCIsIG1zZyk7XG4gIGxldCB0YXJnZXQgPSBmbGFnMih0aGlzLCBcIm9iamVjdFwiKTtcbiAgbGV0IHNzZmkgPSBmbGFnMih0aGlzLCBcInNzZmlcIik7XG4gIGxldCBmbGFnTXNnID0gZmxhZzIodGhpcywgXCJtZXNzYWdlXCIpO1xuICBsZXQgaXNJbnN0YW5jZU9mO1xuICB0cnkge1xuICAgIGlzSW5zdGFuY2VPZiA9IHRhcmdldCBpbnN0YW5jZW9mIGNvbnN0cnVjdG9yO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBpZiAoZXJyIGluc3RhbmNlb2YgVHlwZUVycm9yKSB7XG4gICAgICBmbGFnTXNnID0gZmxhZ01zZyA/IGZsYWdNc2cgKyBcIjogXCIgOiBcIlwiO1xuICAgICAgdGhyb3cgbmV3IEFzc2VydGlvbkVycm9yKFxuICAgICAgICBmbGFnTXNnICsgXCJUaGUgaW5zdGFuY2VvZiBhc3NlcnRpb24gbmVlZHMgYSBjb25zdHJ1Y3RvciBidXQgXCIgKyB0eXBlKGNvbnN0cnVjdG9yKSArIFwiIHdhcyBnaXZlbi5cIixcbiAgICAgICAgdm9pZCAwLFxuICAgICAgICBzc2ZpXG4gICAgICApO1xuICAgIH1cbiAgICB0aHJvdyBlcnI7XG4gIH1cbiAgbGV0IG5hbWUgPSBnZXROYW1lKGNvbnN0cnVjdG9yKTtcbiAgaWYgKG5hbWUgPT0gbnVsbCkge1xuICAgIG5hbWUgPSBcImFuIHVubmFtZWQgY29uc3RydWN0b3JcIjtcbiAgfVxuICB0aGlzLmFzc2VydChcbiAgICBpc0luc3RhbmNlT2YsXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGJlIGFuIGluc3RhbmNlIG9mIFwiICsgbmFtZSxcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gbm90IGJlIGFuIGluc3RhbmNlIG9mIFwiICsgbmFtZVxuICApO1xufVxuX19uYW1lKGFzc2VydEluc3RhbmNlT2YsIFwiYXNzZXJ0SW5zdGFuY2VPZlwiKTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJpbnN0YW5jZW9mXCIsIGFzc2VydEluc3RhbmNlT2YpO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcImluc3RhbmNlT2ZcIiwgYXNzZXJ0SW5zdGFuY2VPZik7XG5mdW5jdGlvbiBhc3NlcnRQcm9wZXJ0eShuYW1lLCB2YWwsIG1zZykge1xuICBpZiAobXNnKSBmbGFnMih0aGlzLCBcIm1lc3NhZ2VcIiwgbXNnKTtcbiAgbGV0IGlzTmVzdGVkID0gZmxhZzIodGhpcywgXCJuZXN0ZWRcIiksIGlzT3duID0gZmxhZzIodGhpcywgXCJvd25cIiksIGZsYWdNc2cgPSBmbGFnMih0aGlzLCBcIm1lc3NhZ2VcIiksIG9iaiA9IGZsYWcyKHRoaXMsIFwib2JqZWN0XCIpLCBzc2ZpID0gZmxhZzIodGhpcywgXCJzc2ZpXCIpLCBuYW1lVHlwZSA9IHR5cGVvZiBuYW1lO1xuICBmbGFnTXNnID0gZmxhZ01zZyA/IGZsYWdNc2cgKyBcIjogXCIgOiBcIlwiO1xuICBpZiAoaXNOZXN0ZWQpIHtcbiAgICBpZiAobmFtZVR5cGUgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihcbiAgICAgICAgZmxhZ01zZyArIFwidGhlIGFyZ3VtZW50IHRvIHByb3BlcnR5IG11c3QgYmUgYSBzdHJpbmcgd2hlbiB1c2luZyBuZXN0ZWQgc3ludGF4XCIsXG4gICAgICAgIHZvaWQgMCxcbiAgICAgICAgc3NmaVxuICAgICAgKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKG5hbWVUeXBlICE9PSBcInN0cmluZ1wiICYmIG5hbWVUeXBlICE9PSBcIm51bWJlclwiICYmIG5hbWVUeXBlICE9PSBcInN5bWJvbFwiKSB7XG4gICAgICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IoXG4gICAgICAgIGZsYWdNc2cgKyBcInRoZSBhcmd1bWVudCB0byBwcm9wZXJ0eSBtdXN0IGJlIGEgc3RyaW5nLCBudW1iZXIsIG9yIHN5bWJvbFwiLFxuICAgICAgICB2b2lkIDAsXG4gICAgICAgIHNzZmlcbiAgICAgICk7XG4gICAgfVxuICB9XG4gIGlmIChpc05lc3RlZCAmJiBpc093bikge1xuICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihcbiAgICAgIGZsYWdNc2cgKyAnVGhlIFwibmVzdGVkXCIgYW5kIFwib3duXCIgZmxhZ3MgY2Fubm90IGJlIGNvbWJpbmVkLicsXG4gICAgICB2b2lkIDAsXG4gICAgICBzc2ZpXG4gICAgKTtcbiAgfVxuICBpZiAob2JqID09PSBudWxsIHx8IG9iaiA9PT0gdm9pZCAwKSB7XG4gICAgdGhyb3cgbmV3IEFzc2VydGlvbkVycm9yKFxuICAgICAgZmxhZ01zZyArIFwiVGFyZ2V0IGNhbm5vdCBiZSBudWxsIG9yIHVuZGVmaW5lZC5cIixcbiAgICAgIHZvaWQgMCxcbiAgICAgIHNzZmlcbiAgICApO1xuICB9XG4gIGxldCBpc0RlZXAgPSBmbGFnMih0aGlzLCBcImRlZXBcIiksIG5lZ2F0ZSA9IGZsYWcyKHRoaXMsIFwibmVnYXRlXCIpLCBwYXRoSW5mbyA9IGlzTmVzdGVkID8gZ2V0UGF0aEluZm8ob2JqLCBuYW1lKSA6IG51bGwsIHZhbHVlID0gaXNOZXN0ZWQgPyBwYXRoSW5mby52YWx1ZSA6IG9ialtuYW1lXSwgaXNFcWwgPSBpc0RlZXAgPyBmbGFnMih0aGlzLCBcImVxbFwiKSA6ICh2YWwxLCB2YWwyKSA9PiB2YWwxID09PSB2YWwyO1xuICBsZXQgZGVzY3JpcHRvciA9IFwiXCI7XG4gIGlmIChpc0RlZXApIGRlc2NyaXB0b3IgKz0gXCJkZWVwIFwiO1xuICBpZiAoaXNPd24pIGRlc2NyaXB0b3IgKz0gXCJvd24gXCI7XG4gIGlmIChpc05lc3RlZCkgZGVzY3JpcHRvciArPSBcIm5lc3RlZCBcIjtcbiAgZGVzY3JpcHRvciArPSBcInByb3BlcnR5IFwiO1xuICBsZXQgaGFzUHJvcGVydHkyO1xuICBpZiAoaXNPd24pIGhhc1Byb3BlcnR5MiA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIG5hbWUpO1xuICBlbHNlIGlmIChpc05lc3RlZCkgaGFzUHJvcGVydHkyID0gcGF0aEluZm8uZXhpc3RzO1xuICBlbHNlIGhhc1Byb3BlcnR5MiA9IGhhc1Byb3BlcnR5KG9iaiwgbmFtZSk7XG4gIGlmICghbmVnYXRlIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICB0aGlzLmFzc2VydChcbiAgICAgIGhhc1Byb3BlcnR5MixcbiAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBoYXZlIFwiICsgZGVzY3JpcHRvciArIGluc3BlY3QyKG5hbWUpLFxuICAgICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBoYXZlIFwiICsgZGVzY3JpcHRvciArIGluc3BlY3QyKG5hbWUpXG4gICAgKTtcbiAgfVxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICB0aGlzLmFzc2VydChcbiAgICAgIGhhc1Byb3BlcnR5MiAmJiBpc0VxbCh2YWwsIHZhbHVlKSxcbiAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBoYXZlIFwiICsgZGVzY3JpcHRvciArIGluc3BlY3QyKG5hbWUpICsgXCIgb2YgI3tleHB9LCBidXQgZ290ICN7YWN0fVwiLFxuICAgICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBoYXZlIFwiICsgZGVzY3JpcHRvciArIGluc3BlY3QyKG5hbWUpICsgXCIgb2YgI3thY3R9XCIsXG4gICAgICB2YWwsXG4gICAgICB2YWx1ZVxuICAgICk7XG4gIH1cbiAgZmxhZzIodGhpcywgXCJvYmplY3RcIiwgdmFsdWUpO1xufVxuX19uYW1lKGFzc2VydFByb3BlcnR5LCBcImFzc2VydFByb3BlcnR5XCIpO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcInByb3BlcnR5XCIsIGFzc2VydFByb3BlcnR5KTtcbmZ1bmN0aW9uIGFzc2VydE93blByb3BlcnR5KF9uYW1lLCBfdmFsdWUsIF9tc2cpIHtcbiAgZmxhZzIodGhpcywgXCJvd25cIiwgdHJ1ZSk7XG4gIGFzc2VydFByb3BlcnR5LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59XG5fX25hbWUoYXNzZXJ0T3duUHJvcGVydHksIFwiYXNzZXJ0T3duUHJvcGVydHlcIik7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwib3duUHJvcGVydHlcIiwgYXNzZXJ0T3duUHJvcGVydHkpO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcImhhdmVPd25Qcm9wZXJ0eVwiLCBhc3NlcnRPd25Qcm9wZXJ0eSk7XG5mdW5jdGlvbiBhc3NlcnRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobmFtZSwgZGVzY3JpcHRvciwgbXNnKSB7XG4gIGlmICh0eXBlb2YgZGVzY3JpcHRvciA9PT0gXCJzdHJpbmdcIikge1xuICAgIG1zZyA9IGRlc2NyaXB0b3I7XG4gICAgZGVzY3JpcHRvciA9IG51bGw7XG4gIH1cbiAgaWYgKG1zZykgZmxhZzIodGhpcywgXCJtZXNzYWdlXCIsIG1zZyk7XG4gIGxldCBvYmogPSBmbGFnMih0aGlzLCBcIm9iamVjdFwiKTtcbiAgbGV0IGFjdHVhbERlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE9iamVjdChvYmopLCBuYW1lKTtcbiAgbGV0IGVxbCA9IGZsYWcyKHRoaXMsIFwiZXFsXCIpO1xuICBpZiAoYWN0dWFsRGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yKSB7XG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICBlcWwoZGVzY3JpcHRvciwgYWN0dWFsRGVzY3JpcHRvciksXG4gICAgICBcImV4cGVjdGVkIHRoZSBvd24gcHJvcGVydHkgZGVzY3JpcHRvciBmb3IgXCIgKyBpbnNwZWN0MihuYW1lKSArIFwiIG9uICN7dGhpc30gdG8gbWF0Y2ggXCIgKyBpbnNwZWN0MihkZXNjcmlwdG9yKSArIFwiLCBnb3QgXCIgKyBpbnNwZWN0MihhY3R1YWxEZXNjcmlwdG9yKSxcbiAgICAgIFwiZXhwZWN0ZWQgdGhlIG93biBwcm9wZXJ0eSBkZXNjcmlwdG9yIGZvciBcIiArIGluc3BlY3QyKG5hbWUpICsgXCIgb24gI3t0aGlzfSB0byBub3QgbWF0Y2ggXCIgKyBpbnNwZWN0MihkZXNjcmlwdG9yKSxcbiAgICAgIGRlc2NyaXB0b3IsXG4gICAgICBhY3R1YWxEZXNjcmlwdG9yLFxuICAgICAgdHJ1ZVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICBhY3R1YWxEZXNjcmlwdG9yLFxuICAgICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGhhdmUgYW4gb3duIHByb3BlcnR5IGRlc2NyaXB0b3IgZm9yIFwiICsgaW5zcGVjdDIobmFtZSksXG4gICAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gbm90IGhhdmUgYW4gb3duIHByb3BlcnR5IGRlc2NyaXB0b3IgZm9yIFwiICsgaW5zcGVjdDIobmFtZSlcbiAgICApO1xuICB9XG4gIGZsYWcyKHRoaXMsIFwib2JqZWN0XCIsIGFjdHVhbERlc2NyaXB0b3IpO1xufVxuX19uYW1lKGFzc2VydE93blByb3BlcnR5RGVzY3JpcHRvciwgXCJhc3NlcnRPd25Qcm9wZXJ0eURlc2NyaXB0b3JcIik7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwib3duUHJvcGVydHlEZXNjcmlwdG9yXCIsIGFzc2VydE93blByb3BlcnR5RGVzY3JpcHRvcik7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwiaGF2ZU93blByb3BlcnR5RGVzY3JpcHRvclwiLCBhc3NlcnRPd25Qcm9wZXJ0eURlc2NyaXB0b3IpO1xuZnVuY3Rpb24gYXNzZXJ0TGVuZ3RoQ2hhaW4oKSB7XG4gIGZsYWcyKHRoaXMsIFwiZG9MZW5ndGhcIiwgdHJ1ZSk7XG59XG5fX25hbWUoYXNzZXJ0TGVuZ3RoQ2hhaW4sIFwiYXNzZXJ0TGVuZ3RoQ2hhaW5cIik7XG5mdW5jdGlvbiBhc3NlcnRMZW5ndGgobiwgbXNnKSB7XG4gIGlmIChtc2cpIGZsYWcyKHRoaXMsIFwibWVzc2FnZVwiLCBtc2cpO1xuICBsZXQgb2JqID0gZmxhZzIodGhpcywgXCJvYmplY3RcIiksIG9ialR5cGUgPSB0eXBlKG9iaikudG9Mb3dlckNhc2UoKSwgZmxhZ01zZyA9IGZsYWcyKHRoaXMsIFwibWVzc2FnZVwiKSwgc3NmaSA9IGZsYWcyKHRoaXMsIFwic3NmaVwiKSwgZGVzY3JpcHRvciA9IFwibGVuZ3RoXCIsIGl0ZW1zQ291bnQ7XG4gIHN3aXRjaCAob2JqVHlwZSkge1xuICAgIGNhc2UgXCJtYXBcIjpcbiAgICBjYXNlIFwic2V0XCI6XG4gICAgICBkZXNjcmlwdG9yID0gXCJzaXplXCI7XG4gICAgICBpdGVtc0NvdW50ID0gb2JqLnNpemU7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgbmV3IEFzc2VydGlvbihvYmosIGZsYWdNc2csIHNzZmksIHRydWUpLnRvLmhhdmUucHJvcGVydHkoXCJsZW5ndGhcIik7XG4gICAgICBpdGVtc0NvdW50ID0gb2JqLmxlbmd0aDtcbiAgfVxuICB0aGlzLmFzc2VydChcbiAgICBpdGVtc0NvdW50ID09IG4sXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGhhdmUgYSBcIiArIGRlc2NyaXB0b3IgKyBcIiBvZiAje2V4cH0gYnV0IGdvdCAje2FjdH1cIixcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gbm90IGhhdmUgYSBcIiArIGRlc2NyaXB0b3IgKyBcIiBvZiAje2FjdH1cIixcbiAgICBuLFxuICAgIGl0ZW1zQ291bnRcbiAgKTtcbn1cbl9fbmFtZShhc3NlcnRMZW5ndGgsIFwiYXNzZXJ0TGVuZ3RoXCIpO1xuQXNzZXJ0aW9uLmFkZENoYWluYWJsZU1ldGhvZChcImxlbmd0aFwiLCBhc3NlcnRMZW5ndGgsIGFzc2VydExlbmd0aENoYWluKTtcbkFzc2VydGlvbi5hZGRDaGFpbmFibGVNZXRob2QoXCJsZW5ndGhPZlwiLCBhc3NlcnRMZW5ndGgsIGFzc2VydExlbmd0aENoYWluKTtcbmZ1bmN0aW9uIGFzc2VydE1hdGNoKHJlLCBtc2cpIHtcbiAgaWYgKG1zZykgZmxhZzIodGhpcywgXCJtZXNzYWdlXCIsIG1zZyk7XG4gIGxldCBvYmogPSBmbGFnMih0aGlzLCBcIm9iamVjdFwiKTtcbiAgdGhpcy5hc3NlcnQoXG4gICAgcmUuZXhlYyhvYmopLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBtYXRjaCBcIiArIHJlLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSBub3QgdG8gbWF0Y2ggXCIgKyByZVxuICApO1xufVxuX19uYW1lKGFzc2VydE1hdGNoLCBcImFzc2VydE1hdGNoXCIpO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcIm1hdGNoXCIsIGFzc2VydE1hdGNoKTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJtYXRjaGVzXCIsIGFzc2VydE1hdGNoKTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJzdHJpbmdcIiwgZnVuY3Rpb24oc3RyLCBtc2cpIHtcbiAgaWYgKG1zZykgZmxhZzIodGhpcywgXCJtZXNzYWdlXCIsIG1zZyk7XG4gIGxldCBvYmogPSBmbGFnMih0aGlzLCBcIm9iamVjdFwiKSwgZmxhZ01zZyA9IGZsYWcyKHRoaXMsIFwibWVzc2FnZVwiKSwgc3NmaSA9IGZsYWcyKHRoaXMsIFwic3NmaVwiKTtcbiAgbmV3IEFzc2VydGlvbihvYmosIGZsYWdNc2csIHNzZmksIHRydWUpLmlzLmEoXCJzdHJpbmdcIik7XG4gIHRoaXMuYXNzZXJ0KFxuICAgIH5vYmouaW5kZXhPZihzdHIpLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBjb250YWluIFwiICsgaW5zcGVjdDIoc3RyKSxcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gbm90IGNvbnRhaW4gXCIgKyBpbnNwZWN0MihzdHIpXG4gICk7XG59KTtcbmZ1bmN0aW9uIGFzc2VydEtleXMoa2V5cykge1xuICBsZXQgb2JqID0gZmxhZzIodGhpcywgXCJvYmplY3RcIiksIG9ialR5cGUgPSB0eXBlKG9iaiksIGtleXNUeXBlID0gdHlwZShrZXlzKSwgc3NmaSA9IGZsYWcyKHRoaXMsIFwic3NmaVwiKSwgaXNEZWVwID0gZmxhZzIodGhpcywgXCJkZWVwXCIpLCBzdHIsIGRlZXBTdHIgPSBcIlwiLCBhY3R1YWwsIG9rID0gdHJ1ZSwgZmxhZ01zZyA9IGZsYWcyKHRoaXMsIFwibWVzc2FnZVwiKTtcbiAgZmxhZ01zZyA9IGZsYWdNc2cgPyBmbGFnTXNnICsgXCI6IFwiIDogXCJcIjtcbiAgbGV0IG1peGVkQXJnc01zZyA9IGZsYWdNc2cgKyBcIndoZW4gdGVzdGluZyBrZXlzIGFnYWluc3QgYW4gb2JqZWN0IG9yIGFuIGFycmF5IHlvdSBtdXN0IGdpdmUgYSBzaW5nbGUgQXJyYXl8T2JqZWN0fFN0cmluZyBhcmd1bWVudCBvciBtdWx0aXBsZSBTdHJpbmcgYXJndW1lbnRzXCI7XG4gIGlmIChvYmpUeXBlID09PSBcIk1hcFwiIHx8IG9ialR5cGUgPT09IFwiU2V0XCIpIHtcbiAgICBkZWVwU3RyID0gaXNEZWVwID8gXCJkZWVwbHkgXCIgOiBcIlwiO1xuICAgIGFjdHVhbCA9IFtdO1xuICAgIG9iai5mb3JFYWNoKGZ1bmN0aW9uKHZhbCwga2V5KSB7XG4gICAgICBhY3R1YWwucHVzaChrZXkpO1xuICAgIH0pO1xuICAgIGlmIChrZXlzVHlwZSAhPT0gXCJBcnJheVwiKSB7XG4gICAgICBrZXlzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgYWN0dWFsID0gZ2V0T3duRW51bWVyYWJsZVByb3BlcnRpZXMob2JqKTtcbiAgICBzd2l0Y2ggKGtleXNUeXBlKSB7XG4gICAgICBjYXNlIFwiQXJyYXlcIjpcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEFzc2VydGlvbkVycm9yKG1peGVkQXJnc01zZywgdm9pZCAwLCBzc2ZpKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJPYmplY3RcIjpcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEFzc2VydGlvbkVycm9yKG1peGVkQXJnc01zZywgdm9pZCAwLCBzc2ZpKTtcbiAgICAgICAgfVxuICAgICAgICBrZXlzID0gT2JqZWN0LmtleXMoa2V5cyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAga2V5cyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgfVxuICAgIGtleXMgPSBrZXlzLm1hcChmdW5jdGlvbih2YWwpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgdmFsID09PSBcInN5bWJvbFwiID8gdmFsIDogU3RyaW5nKHZhbCk7XG4gICAgfSk7XG4gIH1cbiAgaWYgKCFrZXlzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihmbGFnTXNnICsgXCJrZXlzIHJlcXVpcmVkXCIsIHZvaWQgMCwgc3NmaSk7XG4gIH1cbiAgbGV0IGxlbiA9IGtleXMubGVuZ3RoLCBhbnkgPSBmbGFnMih0aGlzLCBcImFueVwiKSwgYWxsID0gZmxhZzIodGhpcywgXCJhbGxcIiksIGV4cGVjdGVkID0ga2V5cywgaXNFcWwgPSBpc0RlZXAgPyBmbGFnMih0aGlzLCBcImVxbFwiKSA6ICh2YWwxLCB2YWwyKSA9PiB2YWwxID09PSB2YWwyO1xuICBpZiAoIWFueSAmJiAhYWxsKSB7XG4gICAgYWxsID0gdHJ1ZTtcbiAgfVxuICBpZiAoYW55KSB7XG4gICAgb2sgPSBleHBlY3RlZC5zb21lKGZ1bmN0aW9uKGV4cGVjdGVkS2V5KSB7XG4gICAgICByZXR1cm4gYWN0dWFsLnNvbWUoZnVuY3Rpb24oYWN0dWFsS2V5KSB7XG4gICAgICAgIHJldHVybiBpc0VxbChleHBlY3RlZEtleSwgYWN0dWFsS2V5KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIGlmIChhbGwpIHtcbiAgICBvayA9IGV4cGVjdGVkLmV2ZXJ5KGZ1bmN0aW9uKGV4cGVjdGVkS2V5KSB7XG4gICAgICByZXR1cm4gYWN0dWFsLnNvbWUoZnVuY3Rpb24oYWN0dWFsS2V5KSB7XG4gICAgICAgIHJldHVybiBpc0VxbChleHBlY3RlZEtleSwgYWN0dWFsS2V5KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGlmICghZmxhZzIodGhpcywgXCJjb250YWluc1wiKSkge1xuICAgICAgb2sgPSBvayAmJiBrZXlzLmxlbmd0aCA9PSBhY3R1YWwubGVuZ3RoO1xuICAgIH1cbiAgfVxuICBpZiAobGVuID4gMSkge1xuICAgIGtleXMgPSBrZXlzLm1hcChmdW5jdGlvbihrZXkpIHtcbiAgICAgIHJldHVybiBpbnNwZWN0MihrZXkpO1xuICAgIH0pO1xuICAgIGxldCBsYXN0ID0ga2V5cy5wb3AoKTtcbiAgICBpZiAoYWxsKSB7XG4gICAgICBzdHIgPSBrZXlzLmpvaW4oXCIsIFwiKSArIFwiLCBhbmQgXCIgKyBsYXN0O1xuICAgIH1cbiAgICBpZiAoYW55KSB7XG4gICAgICBzdHIgPSBrZXlzLmpvaW4oXCIsIFwiKSArIFwiLCBvciBcIiArIGxhc3Q7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHN0ciA9IGluc3BlY3QyKGtleXNbMF0pO1xuICB9XG4gIHN0ciA9IChsZW4gPiAxID8gXCJrZXlzIFwiIDogXCJrZXkgXCIpICsgc3RyO1xuICBzdHIgPSAoZmxhZzIodGhpcywgXCJjb250YWluc1wiKSA/IFwiY29udGFpbiBcIiA6IFwiaGF2ZSBcIikgKyBzdHI7XG4gIHRoaXMuYXNzZXJ0KFxuICAgIG9rLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBcIiArIGRlZXBTdHIgKyBzdHIsXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBcIiArIGRlZXBTdHIgKyBzdHIsXG4gICAgZXhwZWN0ZWQuc2xpY2UoMCkuc29ydChjb21wYXJlQnlJbnNwZWN0KSxcbiAgICBhY3R1YWwuc29ydChjb21wYXJlQnlJbnNwZWN0KSxcbiAgICB0cnVlXG4gICk7XG59XG5fX25hbWUoYXNzZXJ0S2V5cywgXCJhc3NlcnRLZXlzXCIpO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcImtleXNcIiwgYXNzZXJ0S2V5cyk7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwia2V5XCIsIGFzc2VydEtleXMpO1xuZnVuY3Rpb24gYXNzZXJ0VGhyb3dzKGVycm9yTGlrZSwgZXJyTXNnTWF0Y2hlciwgbXNnKSB7XG4gIGlmIChtc2cpIGZsYWcyKHRoaXMsIFwibWVzc2FnZVwiLCBtc2cpO1xuICBsZXQgb2JqID0gZmxhZzIodGhpcywgXCJvYmplY3RcIiksIHNzZmkgPSBmbGFnMih0aGlzLCBcInNzZmlcIiksIGZsYWdNc2cgPSBmbGFnMih0aGlzLCBcIm1lc3NhZ2VcIiksIG5lZ2F0ZSA9IGZsYWcyKHRoaXMsIFwibmVnYXRlXCIpIHx8IGZhbHNlO1xuICBuZXcgQXNzZXJ0aW9uKG9iaiwgZmxhZ01zZywgc3NmaSwgdHJ1ZSkuaXMuYShcImZ1bmN0aW9uXCIpO1xuICBpZiAoaXNSZWdFeHAyKGVycm9yTGlrZSkgfHwgdHlwZW9mIGVycm9yTGlrZSA9PT0gXCJzdHJpbmdcIikge1xuICAgIGVyck1zZ01hdGNoZXIgPSBlcnJvckxpa2U7XG4gICAgZXJyb3JMaWtlID0gbnVsbDtcbiAgfVxuICBsZXQgY2F1Z2h0RXJyO1xuICBsZXQgZXJyb3JXYXNUaHJvd24gPSBmYWxzZTtcbiAgdHJ5IHtcbiAgICBvYmooKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgZXJyb3JXYXNUaHJvd24gPSB0cnVlO1xuICAgIGNhdWdodEVyciA9IGVycjtcbiAgfVxuICBsZXQgZXZlcnlBcmdJc1VuZGVmaW5lZCA9IGVycm9yTGlrZSA9PT0gdm9pZCAwICYmIGVyck1zZ01hdGNoZXIgPT09IHZvaWQgMDtcbiAgbGV0IGV2ZXJ5QXJnSXNEZWZpbmVkID0gQm9vbGVhbihlcnJvckxpa2UgJiYgZXJyTXNnTWF0Y2hlcik7XG4gIGxldCBlcnJvckxpa2VGYWlsID0gZmFsc2U7XG4gIGxldCBlcnJNc2dNYXRjaGVyRmFpbCA9IGZhbHNlO1xuICBpZiAoZXZlcnlBcmdJc1VuZGVmaW5lZCB8fCAhZXZlcnlBcmdJc1VuZGVmaW5lZCAmJiAhbmVnYXRlKSB7XG4gICAgbGV0IGVycm9yTGlrZVN0cmluZyA9IFwiYW4gZXJyb3JcIjtcbiAgICBpZiAoZXJyb3JMaWtlIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIGVycm9yTGlrZVN0cmluZyA9IFwiI3tleHB9XCI7XG4gICAgfSBlbHNlIGlmIChlcnJvckxpa2UpIHtcbiAgICAgIGVycm9yTGlrZVN0cmluZyA9IGNoZWNrX2Vycm9yX2V4cG9ydHMuZ2V0Q29uc3RydWN0b3JOYW1lKGVycm9yTGlrZSk7XG4gICAgfVxuICAgIGxldCBhY3R1YWwgPSBjYXVnaHRFcnI7XG4gICAgaWYgKGNhdWdodEVyciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICBhY3R1YWwgPSBjYXVnaHRFcnIudG9TdHJpbmcoKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBjYXVnaHRFcnIgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIGFjdHVhbCA9IGNhdWdodEVycjtcbiAgICB9IGVsc2UgaWYgKGNhdWdodEVyciAmJiAodHlwZW9mIGNhdWdodEVyciA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2F1Z2h0RXJyID09PSBcImZ1bmN0aW9uXCIpKSB7XG4gICAgICB0cnkge1xuICAgICAgICBhY3R1YWwgPSBjaGVja19lcnJvcl9leHBvcnRzLmdldENvbnN0cnVjdG9yTmFtZShjYXVnaHRFcnIpO1xuICAgICAgfSBjYXRjaCAoX2Vycikge1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmFzc2VydChcbiAgICAgIGVycm9yV2FzVGhyb3duLFxuICAgICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIHRocm93IFwiICsgZXJyb3JMaWtlU3RyaW5nLFxuICAgICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIG5vdCB0aHJvdyBhbiBlcnJvciBidXQgI3thY3R9IHdhcyB0aHJvd25cIixcbiAgICAgIGVycm9yTGlrZSAmJiBlcnJvckxpa2UudG9TdHJpbmcoKSxcbiAgICAgIGFjdHVhbFxuICAgICk7XG4gIH1cbiAgaWYgKGVycm9yTGlrZSAmJiBjYXVnaHRFcnIpIHtcbiAgICBpZiAoZXJyb3JMaWtlIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIGxldCBpc0NvbXBhdGlibGVJbnN0YW5jZSA9IGNoZWNrX2Vycm9yX2V4cG9ydHMuY29tcGF0aWJsZUluc3RhbmNlKFxuICAgICAgICBjYXVnaHRFcnIsXG4gICAgICAgIGVycm9yTGlrZVxuICAgICAgKTtcbiAgICAgIGlmIChpc0NvbXBhdGlibGVJbnN0YW5jZSA9PT0gbmVnYXRlKSB7XG4gICAgICAgIGlmIChldmVyeUFyZ0lzRGVmaW5lZCAmJiBuZWdhdGUpIHtcbiAgICAgICAgICBlcnJvckxpa2VGYWlsID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmFzc2VydChcbiAgICAgICAgICAgIG5lZ2F0ZSxcbiAgICAgICAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byB0aHJvdyAje2V4cH0gYnV0ICN7YWN0fSB3YXMgdGhyb3duXCIsXG4gICAgICAgICAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gbm90IHRocm93ICN7ZXhwfVwiICsgKGNhdWdodEVyciAmJiAhbmVnYXRlID8gXCIgYnV0ICN7YWN0fSB3YXMgdGhyb3duXCIgOiBcIlwiKSxcbiAgICAgICAgICAgIGVycm9yTGlrZS50b1N0cmluZygpLFxuICAgICAgICAgICAgY2F1Z2h0RXJyLnRvU3RyaW5nKClcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGxldCBpc0NvbXBhdGlibGVDb25zdHJ1Y3RvciA9IGNoZWNrX2Vycm9yX2V4cG9ydHMuY29tcGF0aWJsZUNvbnN0cnVjdG9yKFxuICAgICAgY2F1Z2h0RXJyLFxuICAgICAgZXJyb3JMaWtlXG4gICAgKTtcbiAgICBpZiAoaXNDb21wYXRpYmxlQ29uc3RydWN0b3IgPT09IG5lZ2F0ZSkge1xuICAgICAgaWYgKGV2ZXJ5QXJnSXNEZWZpbmVkICYmIG5lZ2F0ZSkge1xuICAgICAgICBlcnJvckxpa2VGYWlsID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICAgIG5lZ2F0ZSxcbiAgICAgICAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gdGhyb3cgI3tleHB9IGJ1dCAje2FjdH0gd2FzIHRocm93blwiLFxuICAgICAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgdGhyb3cgI3tleHB9XCIgKyAoY2F1Z2h0RXJyID8gXCIgYnV0ICN7YWN0fSB3YXMgdGhyb3duXCIgOiBcIlwiKSxcbiAgICAgICAgICBlcnJvckxpa2UgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yTGlrZS50b1N0cmluZygpIDogZXJyb3JMaWtlICYmIGNoZWNrX2Vycm9yX2V4cG9ydHMuZ2V0Q29uc3RydWN0b3JOYW1lKGVycm9yTGlrZSksXG4gICAgICAgICAgY2F1Z2h0RXJyIGluc3RhbmNlb2YgRXJyb3IgPyBjYXVnaHRFcnIudG9TdHJpbmcoKSA6IGNhdWdodEVyciAmJiBjaGVja19lcnJvcl9leHBvcnRzLmdldENvbnN0cnVjdG9yTmFtZShjYXVnaHRFcnIpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmIChjYXVnaHRFcnIgJiYgZXJyTXNnTWF0Y2hlciAhPT0gdm9pZCAwICYmIGVyck1zZ01hdGNoZXIgIT09IG51bGwpIHtcbiAgICBsZXQgcGxhY2Vob2xkZXIgPSBcImluY2x1ZGluZ1wiO1xuICAgIGlmIChpc1JlZ0V4cDIoZXJyTXNnTWF0Y2hlcikpIHtcbiAgICAgIHBsYWNlaG9sZGVyID0gXCJtYXRjaGluZ1wiO1xuICAgIH1cbiAgICBsZXQgaXNDb21wYXRpYmxlTWVzc2FnZSA9IGNoZWNrX2Vycm9yX2V4cG9ydHMuY29tcGF0aWJsZU1lc3NhZ2UoXG4gICAgICBjYXVnaHRFcnIsXG4gICAgICBlcnJNc2dNYXRjaGVyXG4gICAgKTtcbiAgICBpZiAoaXNDb21wYXRpYmxlTWVzc2FnZSA9PT0gbmVnYXRlKSB7XG4gICAgICBpZiAoZXZlcnlBcmdJc0RlZmluZWQgJiYgbmVnYXRlKSB7XG4gICAgICAgIGVyck1zZ01hdGNoZXJGYWlsID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICAgIG5lZ2F0ZSxcbiAgICAgICAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gdGhyb3cgZXJyb3IgXCIgKyBwbGFjZWhvbGRlciArIFwiICN7ZXhwfSBidXQgZ290ICN7YWN0fVwiLFxuICAgICAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byB0aHJvdyBlcnJvciBub3QgXCIgKyBwbGFjZWhvbGRlciArIFwiICN7ZXhwfVwiLFxuICAgICAgICAgIGVyck1zZ01hdGNoZXIsXG4gICAgICAgICAgY2hlY2tfZXJyb3JfZXhwb3J0cy5nZXRNZXNzYWdlKGNhdWdodEVycilcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKGVycm9yTGlrZUZhaWwgJiYgZXJyTXNnTWF0Y2hlckZhaWwpIHtcbiAgICB0aGlzLmFzc2VydChcbiAgICAgIG5lZ2F0ZSxcbiAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byB0aHJvdyAje2V4cH0gYnV0ICN7YWN0fSB3YXMgdGhyb3duXCIsXG4gICAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gbm90IHRocm93ICN7ZXhwfVwiICsgKGNhdWdodEVyciA/IFwiIGJ1dCAje2FjdH0gd2FzIHRocm93blwiIDogXCJcIiksXG4gICAgICBlcnJvckxpa2UgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yTGlrZS50b1N0cmluZygpIDogZXJyb3JMaWtlICYmIGNoZWNrX2Vycm9yX2V4cG9ydHMuZ2V0Q29uc3RydWN0b3JOYW1lKGVycm9yTGlrZSksXG4gICAgICBjYXVnaHRFcnIgaW5zdGFuY2VvZiBFcnJvciA/IGNhdWdodEVyci50b1N0cmluZygpIDogY2F1Z2h0RXJyICYmIGNoZWNrX2Vycm9yX2V4cG9ydHMuZ2V0Q29uc3RydWN0b3JOYW1lKGNhdWdodEVycilcbiAgICApO1xuICB9XG4gIGZsYWcyKHRoaXMsIFwib2JqZWN0XCIsIGNhdWdodEVycik7XG59XG5fX25hbWUoYXNzZXJ0VGhyb3dzLCBcImFzc2VydFRocm93c1wiKTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJ0aHJvd1wiLCBhc3NlcnRUaHJvd3MpO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcInRocm93c1wiLCBhc3NlcnRUaHJvd3MpO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcIlRocm93XCIsIGFzc2VydFRocm93cyk7XG5mdW5jdGlvbiByZXNwb25kVG8obWV0aG9kLCBtc2cpIHtcbiAgaWYgKG1zZykgZmxhZzIodGhpcywgXCJtZXNzYWdlXCIsIG1zZyk7XG4gIGxldCBvYmogPSBmbGFnMih0aGlzLCBcIm9iamVjdFwiKSwgaXRzZWxmID0gZmxhZzIodGhpcywgXCJpdHNlbGZcIiksIGNvbnRleHQgPSBcImZ1bmN0aW9uXCIgPT09IHR5cGVvZiBvYmogJiYgIWl0c2VsZiA/IG9iai5wcm90b3R5cGVbbWV0aG9kXSA6IG9ialttZXRob2RdO1xuICB0aGlzLmFzc2VydChcbiAgICBcImZ1bmN0aW9uXCIgPT09IHR5cGVvZiBjb250ZXh0LFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byByZXNwb25kIHRvIFwiICsgaW5zcGVjdDIobWV0aG9kKSxcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gbm90IHJlc3BvbmQgdG8gXCIgKyBpbnNwZWN0MihtZXRob2QpXG4gICk7XG59XG5fX25hbWUocmVzcG9uZFRvLCBcInJlc3BvbmRUb1wiKTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJyZXNwb25kVG9cIiwgcmVzcG9uZFRvKTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJyZXNwb25kc1RvXCIsIHJlc3BvbmRUbyk7XG5Bc3NlcnRpb24uYWRkUHJvcGVydHkoXCJpdHNlbGZcIiwgZnVuY3Rpb24oKSB7XG4gIGZsYWcyKHRoaXMsIFwiaXRzZWxmXCIsIHRydWUpO1xufSk7XG5mdW5jdGlvbiBzYXRpc2Z5KG1hdGNoZXIsIG1zZykge1xuICBpZiAobXNnKSBmbGFnMih0aGlzLCBcIm1lc3NhZ2VcIiwgbXNnKTtcbiAgbGV0IG9iaiA9IGZsYWcyKHRoaXMsIFwib2JqZWN0XCIpO1xuICBsZXQgcmVzdWx0ID0gbWF0Y2hlcihvYmopO1xuICB0aGlzLmFzc2VydChcbiAgICByZXN1bHQsXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIHNhdGlzZnkgXCIgKyBvYmpEaXNwbGF5KG1hdGNoZXIpLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBub3Qgc2F0aXNmeVwiICsgb2JqRGlzcGxheShtYXRjaGVyKSxcbiAgICBmbGFnMih0aGlzLCBcIm5lZ2F0ZVwiKSA/IGZhbHNlIDogdHJ1ZSxcbiAgICByZXN1bHRcbiAgKTtcbn1cbl9fbmFtZShzYXRpc2Z5LCBcInNhdGlzZnlcIik7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwic2F0aXNmeVwiLCBzYXRpc2Z5KTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJzYXRpc2ZpZXNcIiwgc2F0aXNmeSk7XG5mdW5jdGlvbiBjbG9zZVRvKGV4cGVjdGVkLCBkZWx0YSwgbXNnKSB7XG4gIGlmIChtc2cpIGZsYWcyKHRoaXMsIFwibWVzc2FnZVwiLCBtc2cpO1xuICBsZXQgb2JqID0gZmxhZzIodGhpcywgXCJvYmplY3RcIiksIGZsYWdNc2cgPSBmbGFnMih0aGlzLCBcIm1lc3NhZ2VcIiksIHNzZmkgPSBmbGFnMih0aGlzLCBcInNzZmlcIik7XG4gIG5ldyBBc3NlcnRpb24ob2JqLCBmbGFnTXNnLCBzc2ZpLCB0cnVlKS5pcy5udW1lcmljO1xuICBsZXQgbWVzc2FnZSA9IFwiQSBgZGVsdGFgIHZhbHVlIGlzIHJlcXVpcmVkIGZvciBgY2xvc2VUb2BcIjtcbiAgaWYgKGRlbHRhID09IHZvaWQgMCkge1xuICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihcbiAgICAgIGZsYWdNc2cgPyBgJHtmbGFnTXNnfTogJHttZXNzYWdlfWAgOiBtZXNzYWdlLFxuICAgICAgdm9pZCAwLFxuICAgICAgc3NmaVxuICAgICk7XG4gIH1cbiAgbmV3IEFzc2VydGlvbihkZWx0YSwgZmxhZ01zZywgc3NmaSwgdHJ1ZSkuaXMubnVtZXJpYztcbiAgbWVzc2FnZSA9IFwiQSBgZXhwZWN0ZWRgIHZhbHVlIGlzIHJlcXVpcmVkIGZvciBgY2xvc2VUb2BcIjtcbiAgaWYgKGV4cGVjdGVkID09IHZvaWQgMCkge1xuICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihcbiAgICAgIGZsYWdNc2cgPyBgJHtmbGFnTXNnfTogJHttZXNzYWdlfWAgOiBtZXNzYWdlLFxuICAgICAgdm9pZCAwLFxuICAgICAgc3NmaVxuICAgICk7XG4gIH1cbiAgbmV3IEFzc2VydGlvbihleHBlY3RlZCwgZmxhZ01zZywgc3NmaSwgdHJ1ZSkuaXMubnVtZXJpYztcbiAgY29uc3QgYWJzID0gLyogQF9fUFVSRV9fICovIF9fbmFtZSgoeCkgPT4geCA8IDBuID8gLXggOiB4LCBcImFic1wiKTtcbiAgY29uc3Qgc3RyaXAgPSAvKiBAX19QVVJFX18gKi8gX19uYW1lKChudW1iZXIpID0+IHBhcnNlRmxvYXQocGFyc2VGbG9hdChudW1iZXIpLnRvUHJlY2lzaW9uKDEyKSksIFwic3RyaXBcIik7XG4gIHRoaXMuYXNzZXJ0KFxuICAgIHN0cmlwKGFicyhvYmogLSBleHBlY3RlZCkpIDw9IGRlbHRhLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBjbG9zZSB0byBcIiArIGV4cGVjdGVkICsgXCIgKy8tIFwiICsgZGVsdGEsXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IG5vdCB0byBiZSBjbG9zZSB0byBcIiArIGV4cGVjdGVkICsgXCIgKy8tIFwiICsgZGVsdGFcbiAgKTtcbn1cbl9fbmFtZShjbG9zZVRvLCBcImNsb3NlVG9cIik7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwiY2xvc2VUb1wiLCBjbG9zZVRvKTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJhcHByb3hpbWF0ZWx5XCIsIGNsb3NlVG8pO1xuZnVuY3Rpb24gaXNTdWJzZXRPZihfc3Vic2V0LCBfc3VwZXJzZXQsIGNtcCwgY29udGFpbnMsIG9yZGVyZWQpIHtcbiAgbGV0IHN1cGVyc2V0ID0gQXJyYXkuZnJvbShfc3VwZXJzZXQpO1xuICBsZXQgc3Vic2V0ID0gQXJyYXkuZnJvbShfc3Vic2V0KTtcbiAgaWYgKCFjb250YWlucykge1xuICAgIGlmIChzdWJzZXQubGVuZ3RoICE9PSBzdXBlcnNldC5sZW5ndGgpIHJldHVybiBmYWxzZTtcbiAgICBzdXBlcnNldCA9IHN1cGVyc2V0LnNsaWNlKCk7XG4gIH1cbiAgcmV0dXJuIHN1YnNldC5ldmVyeShmdW5jdGlvbihlbGVtLCBpZHgpIHtcbiAgICBpZiAob3JkZXJlZCkgcmV0dXJuIGNtcCA/IGNtcChlbGVtLCBzdXBlcnNldFtpZHhdKSA6IGVsZW0gPT09IHN1cGVyc2V0W2lkeF07XG4gICAgaWYgKCFjbXApIHtcbiAgICAgIGxldCBtYXRjaElkeCA9IHN1cGVyc2V0LmluZGV4T2YoZWxlbSk7XG4gICAgICBpZiAobWF0Y2hJZHggPT09IC0xKSByZXR1cm4gZmFsc2U7XG4gICAgICBpZiAoIWNvbnRhaW5zKSBzdXBlcnNldC5zcGxpY2UobWF0Y2hJZHgsIDEpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBzdXBlcnNldC5zb21lKGZ1bmN0aW9uKGVsZW0yLCBtYXRjaElkeCkge1xuICAgICAgaWYgKCFjbXAoZWxlbSwgZWxlbTIpKSByZXR1cm4gZmFsc2U7XG4gICAgICBpZiAoIWNvbnRhaW5zKSBzdXBlcnNldC5zcGxpY2UobWF0Y2hJZHgsIDEpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG4gIH0pO1xufVxuX19uYW1lKGlzU3Vic2V0T2YsIFwiaXNTdWJzZXRPZlwiKTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJtZW1iZXJzXCIsIGZ1bmN0aW9uKHN1YnNldCwgbXNnKSB7XG4gIGlmIChtc2cpIGZsYWcyKHRoaXMsIFwibWVzc2FnZVwiLCBtc2cpO1xuICBsZXQgb2JqID0gZmxhZzIodGhpcywgXCJvYmplY3RcIiksIGZsYWdNc2cgPSBmbGFnMih0aGlzLCBcIm1lc3NhZ2VcIiksIHNzZmkgPSBmbGFnMih0aGlzLCBcInNzZmlcIik7XG4gIG5ldyBBc3NlcnRpb24ob2JqLCBmbGFnTXNnLCBzc2ZpLCB0cnVlKS50by5iZS5pdGVyYWJsZTtcbiAgbmV3IEFzc2VydGlvbihzdWJzZXQsIGZsYWdNc2csIHNzZmksIHRydWUpLnRvLmJlLml0ZXJhYmxlO1xuICBsZXQgY29udGFpbnMgPSBmbGFnMih0aGlzLCBcImNvbnRhaW5zXCIpO1xuICBsZXQgb3JkZXJlZCA9IGZsYWcyKHRoaXMsIFwib3JkZXJlZFwiKTtcbiAgbGV0IHN1YmplY3QsIGZhaWxNc2csIGZhaWxOZWdhdGVNc2c7XG4gIGlmIChjb250YWlucykge1xuICAgIHN1YmplY3QgPSBvcmRlcmVkID8gXCJhbiBvcmRlcmVkIHN1cGVyc2V0XCIgOiBcImEgc3VwZXJzZXRcIjtcbiAgICBmYWlsTXNnID0gXCJleHBlY3RlZCAje3RoaXN9IHRvIGJlIFwiICsgc3ViamVjdCArIFwiIG9mICN7ZXhwfVwiO1xuICAgIGZhaWxOZWdhdGVNc2cgPSBcImV4cGVjdGVkICN7dGhpc30gdG8gbm90IGJlIFwiICsgc3ViamVjdCArIFwiIG9mICN7ZXhwfVwiO1xuICB9IGVsc2Uge1xuICAgIHN1YmplY3QgPSBvcmRlcmVkID8gXCJvcmRlcmVkIG1lbWJlcnNcIiA6IFwibWVtYmVyc1wiO1xuICAgIGZhaWxNc2cgPSBcImV4cGVjdGVkICN7dGhpc30gdG8gaGF2ZSB0aGUgc2FtZSBcIiArIHN1YmplY3QgKyBcIiBhcyAje2V4cH1cIjtcbiAgICBmYWlsTmVnYXRlTXNnID0gXCJleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBoYXZlIHRoZSBzYW1lIFwiICsgc3ViamVjdCArIFwiIGFzICN7ZXhwfVwiO1xuICB9XG4gIGxldCBjbXAgPSBmbGFnMih0aGlzLCBcImRlZXBcIikgPyBmbGFnMih0aGlzLCBcImVxbFwiKSA6IHZvaWQgMDtcbiAgdGhpcy5hc3NlcnQoXG4gICAgaXNTdWJzZXRPZihzdWJzZXQsIG9iaiwgY21wLCBjb250YWlucywgb3JkZXJlZCksXG4gICAgZmFpbE1zZyxcbiAgICBmYWlsTmVnYXRlTXNnLFxuICAgIHN1YnNldCxcbiAgICBvYmosXG4gICAgdHJ1ZVxuICApO1xufSk7XG5Bc3NlcnRpb24uYWRkUHJvcGVydHkoXCJpdGVyYWJsZVwiLCBmdW5jdGlvbihtc2cpIHtcbiAgaWYgKG1zZykgZmxhZzIodGhpcywgXCJtZXNzYWdlXCIsIG1zZyk7XG4gIGxldCBvYmogPSBmbGFnMih0aGlzLCBcIm9iamVjdFwiKTtcbiAgdGhpcy5hc3NlcnQoXG4gICAgb2JqICE9IHZvaWQgMCAmJiBvYmpbU3ltYm9sLml0ZXJhdG9yXSxcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gYmUgYW4gaXRlcmFibGVcIixcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gbm90IGJlIGFuIGl0ZXJhYmxlXCIsXG4gICAgb2JqXG4gICk7XG59KTtcbmZ1bmN0aW9uIG9uZU9mKGxpc3QsIG1zZykge1xuICBpZiAobXNnKSBmbGFnMih0aGlzLCBcIm1lc3NhZ2VcIiwgbXNnKTtcbiAgbGV0IGV4cGVjdGVkID0gZmxhZzIodGhpcywgXCJvYmplY3RcIiksIGZsYWdNc2cgPSBmbGFnMih0aGlzLCBcIm1lc3NhZ2VcIiksIHNzZmkgPSBmbGFnMih0aGlzLCBcInNzZmlcIiksIGNvbnRhaW5zID0gZmxhZzIodGhpcywgXCJjb250YWluc1wiKSwgaXNEZWVwID0gZmxhZzIodGhpcywgXCJkZWVwXCIpLCBlcWwgPSBmbGFnMih0aGlzLCBcImVxbFwiKTtcbiAgbmV3IEFzc2VydGlvbihsaXN0LCBmbGFnTXNnLCBzc2ZpLCB0cnVlKS50by5iZS5hbihcImFycmF5XCIpO1xuICBpZiAoY29udGFpbnMpIHtcbiAgICB0aGlzLmFzc2VydChcbiAgICAgIGxpc3Quc29tZShmdW5jdGlvbihwb3NzaWJpbGl0eSkge1xuICAgICAgICByZXR1cm4gZXhwZWN0ZWQuaW5kZXhPZihwb3NzaWJpbGl0eSkgPiAtMTtcbiAgICAgIH0pLFxuICAgICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGNvbnRhaW4gb25lIG9mICN7ZXhwfVwiLFxuICAgICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBjb250YWluIG9uZSBvZiAje2V4cH1cIixcbiAgICAgIGxpc3QsXG4gICAgICBleHBlY3RlZFxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKGlzRGVlcCkge1xuICAgICAgdGhpcy5hc3NlcnQoXG4gICAgICAgIGxpc3Quc29tZShmdW5jdGlvbihwb3NzaWJpbGl0eSkge1xuICAgICAgICAgIHJldHVybiBlcWwoZXhwZWN0ZWQsIHBvc3NpYmlsaXR5KTtcbiAgICAgICAgfSksXG4gICAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBkZWVwbHkgZXF1YWwgb25lIG9mICN7ZXhwfVwiLFxuICAgICAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gZGVlcGx5IGVxdWFsIG9uZSBvZiAje2V4cH1cIixcbiAgICAgICAgbGlzdCxcbiAgICAgICAgZXhwZWN0ZWRcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICBsaXN0LmluZGV4T2YoZXhwZWN0ZWQpID4gLTEsXG4gICAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBvbmUgb2YgI3tleHB9XCIsXG4gICAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgYmUgb25lIG9mICN7ZXhwfVwiLFxuICAgICAgICBsaXN0LFxuICAgICAgICBleHBlY3RlZFxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cbl9fbmFtZShvbmVPZiwgXCJvbmVPZlwiKTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJvbmVPZlwiLCBvbmVPZik7XG5mdW5jdGlvbiBhc3NlcnRDaGFuZ2VzKHN1YmplY3QsIHByb3AsIG1zZykge1xuICBpZiAobXNnKSBmbGFnMih0aGlzLCBcIm1lc3NhZ2VcIiwgbXNnKTtcbiAgbGV0IGZuID0gZmxhZzIodGhpcywgXCJvYmplY3RcIiksIGZsYWdNc2cgPSBmbGFnMih0aGlzLCBcIm1lc3NhZ2VcIiksIHNzZmkgPSBmbGFnMih0aGlzLCBcInNzZmlcIik7XG4gIG5ldyBBc3NlcnRpb24oZm4sIGZsYWdNc2csIHNzZmksIHRydWUpLmlzLmEoXCJmdW5jdGlvblwiKTtcbiAgbGV0IGluaXRpYWw7XG4gIGlmICghcHJvcCkge1xuICAgIG5ldyBBc3NlcnRpb24oc3ViamVjdCwgZmxhZ01zZywgc3NmaSwgdHJ1ZSkuaXMuYShcImZ1bmN0aW9uXCIpO1xuICAgIGluaXRpYWwgPSBzdWJqZWN0KCk7XG4gIH0gZWxzZSB7XG4gICAgbmV3IEFzc2VydGlvbihzdWJqZWN0LCBmbGFnTXNnLCBzc2ZpLCB0cnVlKS50by5oYXZlLnByb3BlcnR5KHByb3ApO1xuICAgIGluaXRpYWwgPSBzdWJqZWN0W3Byb3BdO1xuICB9XG4gIGZuKCk7XG4gIGxldCBmaW5hbCA9IHByb3AgPT09IHZvaWQgMCB8fCBwcm9wID09PSBudWxsID8gc3ViamVjdCgpIDogc3ViamVjdFtwcm9wXTtcbiAgbGV0IG1zZ09iaiA9IHByb3AgPT09IHZvaWQgMCB8fCBwcm9wID09PSBudWxsID8gaW5pdGlhbCA6IFwiLlwiICsgcHJvcDtcbiAgZmxhZzIodGhpcywgXCJkZWx0YU1zZ09ialwiLCBtc2dPYmopO1xuICBmbGFnMih0aGlzLCBcImluaXRpYWxEZWx0YVZhbHVlXCIsIGluaXRpYWwpO1xuICBmbGFnMih0aGlzLCBcImZpbmFsRGVsdGFWYWx1ZVwiLCBmaW5hbCk7XG4gIGZsYWcyKHRoaXMsIFwiZGVsdGFCZWhhdmlvclwiLCBcImNoYW5nZVwiKTtcbiAgZmxhZzIodGhpcywgXCJyZWFsRGVsdGFcIiwgZmluYWwgIT09IGluaXRpYWwpO1xuICB0aGlzLmFzc2VydChcbiAgICBpbml0aWFsICE9PSBmaW5hbCxcbiAgICBcImV4cGVjdGVkIFwiICsgbXNnT2JqICsgXCIgdG8gY2hhbmdlXCIsXG4gICAgXCJleHBlY3RlZCBcIiArIG1zZ09iaiArIFwiIHRvIG5vdCBjaGFuZ2VcIlxuICApO1xufVxuX19uYW1lKGFzc2VydENoYW5nZXMsIFwiYXNzZXJ0Q2hhbmdlc1wiKTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJjaGFuZ2VcIiwgYXNzZXJ0Q2hhbmdlcyk7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwiY2hhbmdlc1wiLCBhc3NlcnRDaGFuZ2VzKTtcbmZ1bmN0aW9uIGFzc2VydEluY3JlYXNlcyhzdWJqZWN0LCBwcm9wLCBtc2cpIHtcbiAgaWYgKG1zZykgZmxhZzIodGhpcywgXCJtZXNzYWdlXCIsIG1zZyk7XG4gIGxldCBmbiA9IGZsYWcyKHRoaXMsIFwib2JqZWN0XCIpLCBmbGFnTXNnID0gZmxhZzIodGhpcywgXCJtZXNzYWdlXCIpLCBzc2ZpID0gZmxhZzIodGhpcywgXCJzc2ZpXCIpO1xuICBuZXcgQXNzZXJ0aW9uKGZuLCBmbGFnTXNnLCBzc2ZpLCB0cnVlKS5pcy5hKFwiZnVuY3Rpb25cIik7XG4gIGxldCBpbml0aWFsO1xuICBpZiAoIXByb3ApIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHN1YmplY3QsIGZsYWdNc2csIHNzZmksIHRydWUpLmlzLmEoXCJmdW5jdGlvblwiKTtcbiAgICBpbml0aWFsID0gc3ViamVjdCgpO1xuICB9IGVsc2Uge1xuICAgIG5ldyBBc3NlcnRpb24oc3ViamVjdCwgZmxhZ01zZywgc3NmaSwgdHJ1ZSkudG8uaGF2ZS5wcm9wZXJ0eShwcm9wKTtcbiAgICBpbml0aWFsID0gc3ViamVjdFtwcm9wXTtcbiAgfVxuICBuZXcgQXNzZXJ0aW9uKGluaXRpYWwsIGZsYWdNc2csIHNzZmksIHRydWUpLmlzLmEoXCJudW1iZXJcIik7XG4gIGZuKCk7XG4gIGxldCBmaW5hbCA9IHByb3AgPT09IHZvaWQgMCB8fCBwcm9wID09PSBudWxsID8gc3ViamVjdCgpIDogc3ViamVjdFtwcm9wXTtcbiAgbGV0IG1zZ09iaiA9IHByb3AgPT09IHZvaWQgMCB8fCBwcm9wID09PSBudWxsID8gaW5pdGlhbCA6IFwiLlwiICsgcHJvcDtcbiAgZmxhZzIodGhpcywgXCJkZWx0YU1zZ09ialwiLCBtc2dPYmopO1xuICBmbGFnMih0aGlzLCBcImluaXRpYWxEZWx0YVZhbHVlXCIsIGluaXRpYWwpO1xuICBmbGFnMih0aGlzLCBcImZpbmFsRGVsdGFWYWx1ZVwiLCBmaW5hbCk7XG4gIGZsYWcyKHRoaXMsIFwiZGVsdGFCZWhhdmlvclwiLCBcImluY3JlYXNlXCIpO1xuICBmbGFnMih0aGlzLCBcInJlYWxEZWx0YVwiLCBmaW5hbCAtIGluaXRpYWwpO1xuICB0aGlzLmFzc2VydChcbiAgICBmaW5hbCAtIGluaXRpYWwgPiAwLFxuICAgIFwiZXhwZWN0ZWQgXCIgKyBtc2dPYmogKyBcIiB0byBpbmNyZWFzZVwiLFxuICAgIFwiZXhwZWN0ZWQgXCIgKyBtc2dPYmogKyBcIiB0byBub3QgaW5jcmVhc2VcIlxuICApO1xufVxuX19uYW1lKGFzc2VydEluY3JlYXNlcywgXCJhc3NlcnRJbmNyZWFzZXNcIik7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwiaW5jcmVhc2VcIiwgYXNzZXJ0SW5jcmVhc2VzKTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJpbmNyZWFzZXNcIiwgYXNzZXJ0SW5jcmVhc2VzKTtcbmZ1bmN0aW9uIGFzc2VydERlY3JlYXNlcyhzdWJqZWN0LCBwcm9wLCBtc2cpIHtcbiAgaWYgKG1zZykgZmxhZzIodGhpcywgXCJtZXNzYWdlXCIsIG1zZyk7XG4gIGxldCBmbiA9IGZsYWcyKHRoaXMsIFwib2JqZWN0XCIpLCBmbGFnTXNnID0gZmxhZzIodGhpcywgXCJtZXNzYWdlXCIpLCBzc2ZpID0gZmxhZzIodGhpcywgXCJzc2ZpXCIpO1xuICBuZXcgQXNzZXJ0aW9uKGZuLCBmbGFnTXNnLCBzc2ZpLCB0cnVlKS5pcy5hKFwiZnVuY3Rpb25cIik7XG4gIGxldCBpbml0aWFsO1xuICBpZiAoIXByb3ApIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHN1YmplY3QsIGZsYWdNc2csIHNzZmksIHRydWUpLmlzLmEoXCJmdW5jdGlvblwiKTtcbiAgICBpbml0aWFsID0gc3ViamVjdCgpO1xuICB9IGVsc2Uge1xuICAgIG5ldyBBc3NlcnRpb24oc3ViamVjdCwgZmxhZ01zZywgc3NmaSwgdHJ1ZSkudG8uaGF2ZS5wcm9wZXJ0eShwcm9wKTtcbiAgICBpbml0aWFsID0gc3ViamVjdFtwcm9wXTtcbiAgfVxuICBuZXcgQXNzZXJ0aW9uKGluaXRpYWwsIGZsYWdNc2csIHNzZmksIHRydWUpLmlzLmEoXCJudW1iZXJcIik7XG4gIGZuKCk7XG4gIGxldCBmaW5hbCA9IHByb3AgPT09IHZvaWQgMCB8fCBwcm9wID09PSBudWxsID8gc3ViamVjdCgpIDogc3ViamVjdFtwcm9wXTtcbiAgbGV0IG1zZ09iaiA9IHByb3AgPT09IHZvaWQgMCB8fCBwcm9wID09PSBudWxsID8gaW5pdGlhbCA6IFwiLlwiICsgcHJvcDtcbiAgZmxhZzIodGhpcywgXCJkZWx0YU1zZ09ialwiLCBtc2dPYmopO1xuICBmbGFnMih0aGlzLCBcImluaXRpYWxEZWx0YVZhbHVlXCIsIGluaXRpYWwpO1xuICBmbGFnMih0aGlzLCBcImZpbmFsRGVsdGFWYWx1ZVwiLCBmaW5hbCk7XG4gIGZsYWcyKHRoaXMsIFwiZGVsdGFCZWhhdmlvclwiLCBcImRlY3JlYXNlXCIpO1xuICBmbGFnMih0aGlzLCBcInJlYWxEZWx0YVwiLCBpbml0aWFsIC0gZmluYWwpO1xuICB0aGlzLmFzc2VydChcbiAgICBmaW5hbCAtIGluaXRpYWwgPCAwLFxuICAgIFwiZXhwZWN0ZWQgXCIgKyBtc2dPYmogKyBcIiB0byBkZWNyZWFzZVwiLFxuICAgIFwiZXhwZWN0ZWQgXCIgKyBtc2dPYmogKyBcIiB0byBub3QgZGVjcmVhc2VcIlxuICApO1xufVxuX19uYW1lKGFzc2VydERlY3JlYXNlcywgXCJhc3NlcnREZWNyZWFzZXNcIik7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwiZGVjcmVhc2VcIiwgYXNzZXJ0RGVjcmVhc2VzKTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJkZWNyZWFzZXNcIiwgYXNzZXJ0RGVjcmVhc2VzKTtcbmZ1bmN0aW9uIGFzc2VydERlbHRhKGRlbHRhLCBtc2cpIHtcbiAgaWYgKG1zZykgZmxhZzIodGhpcywgXCJtZXNzYWdlXCIsIG1zZyk7XG4gIGxldCBtc2dPYmogPSBmbGFnMih0aGlzLCBcImRlbHRhTXNnT2JqXCIpO1xuICBsZXQgaW5pdGlhbCA9IGZsYWcyKHRoaXMsIFwiaW5pdGlhbERlbHRhVmFsdWVcIik7XG4gIGxldCBmaW5hbCA9IGZsYWcyKHRoaXMsIFwiZmluYWxEZWx0YVZhbHVlXCIpO1xuICBsZXQgYmVoYXZpb3IgPSBmbGFnMih0aGlzLCBcImRlbHRhQmVoYXZpb3JcIik7XG4gIGxldCByZWFsRGVsdGEgPSBmbGFnMih0aGlzLCBcInJlYWxEZWx0YVwiKTtcbiAgbGV0IGV4cHJlc3Npb247XG4gIGlmIChiZWhhdmlvciA9PT0gXCJjaGFuZ2VcIikge1xuICAgIGV4cHJlc3Npb24gPSBNYXRoLmFicyhmaW5hbCAtIGluaXRpYWwpID09PSBNYXRoLmFicyhkZWx0YSk7XG4gIH0gZWxzZSB7XG4gICAgZXhwcmVzc2lvbiA9IHJlYWxEZWx0YSA9PT0gTWF0aC5hYnMoZGVsdGEpO1xuICB9XG4gIHRoaXMuYXNzZXJ0KFxuICAgIGV4cHJlc3Npb24sXG4gICAgXCJleHBlY3RlZCBcIiArIG1zZ09iaiArIFwiIHRvIFwiICsgYmVoYXZpb3IgKyBcIiBieSBcIiArIGRlbHRhLFxuICAgIFwiZXhwZWN0ZWQgXCIgKyBtc2dPYmogKyBcIiB0byBub3QgXCIgKyBiZWhhdmlvciArIFwiIGJ5IFwiICsgZGVsdGFcbiAgKTtcbn1cbl9fbmFtZShhc3NlcnREZWx0YSwgXCJhc3NlcnREZWx0YVwiKTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJieVwiLCBhc3NlcnREZWx0YSk7XG5Bc3NlcnRpb24uYWRkUHJvcGVydHkoXCJleHRlbnNpYmxlXCIsIGZ1bmN0aW9uKCkge1xuICBsZXQgb2JqID0gZmxhZzIodGhpcywgXCJvYmplY3RcIik7XG4gIGxldCBpc0V4dGVuc2libGUgPSBvYmogPT09IE9iamVjdChvYmopICYmIE9iamVjdC5pc0V4dGVuc2libGUob2JqKTtcbiAgdGhpcy5hc3NlcnQoXG4gICAgaXNFeHRlbnNpYmxlLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBleHRlbnNpYmxlXCIsXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBiZSBleHRlbnNpYmxlXCJcbiAgKTtcbn0pO1xuQXNzZXJ0aW9uLmFkZFByb3BlcnR5KFwic2VhbGVkXCIsIGZ1bmN0aW9uKCkge1xuICBsZXQgb2JqID0gZmxhZzIodGhpcywgXCJvYmplY3RcIik7XG4gIGxldCBpc1NlYWxlZCA9IG9iaiA9PT0gT2JqZWN0KG9iaikgPyBPYmplY3QuaXNTZWFsZWQob2JqKSA6IHRydWU7XG4gIHRoaXMuYXNzZXJ0KFxuICAgIGlzU2VhbGVkLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBzZWFsZWRcIixcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gbm90IGJlIHNlYWxlZFwiXG4gICk7XG59KTtcbkFzc2VydGlvbi5hZGRQcm9wZXJ0eShcImZyb3plblwiLCBmdW5jdGlvbigpIHtcbiAgbGV0IG9iaiA9IGZsYWcyKHRoaXMsIFwib2JqZWN0XCIpO1xuICBsZXQgaXNGcm96ZW4gPSBvYmogPT09IE9iamVjdChvYmopID8gT2JqZWN0LmlzRnJvemVuKG9iaikgOiB0cnVlO1xuICB0aGlzLmFzc2VydChcbiAgICBpc0Zyb3plbixcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gYmUgZnJvemVuXCIsXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBiZSBmcm96ZW5cIlxuICApO1xufSk7XG5Bc3NlcnRpb24uYWRkUHJvcGVydHkoXCJmaW5pdGVcIiwgZnVuY3Rpb24oX21zZykge1xuICBsZXQgb2JqID0gZmxhZzIodGhpcywgXCJvYmplY3RcIik7XG4gIHRoaXMuYXNzZXJ0KFxuICAgIHR5cGVvZiBvYmogPT09IFwibnVtYmVyXCIgJiYgaXNGaW5pdGUob2JqKSxcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gYmUgYSBmaW5pdGUgbnVtYmVyXCIsXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBiZSBhIGZpbml0ZSBudW1iZXJcIlxuICApO1xufSk7XG5mdW5jdGlvbiBjb21wYXJlU3Vic2V0KGV4cGVjdGVkLCBhY3R1YWwpIHtcbiAgaWYgKGV4cGVjdGVkID09PSBhY3R1YWwpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAodHlwZW9mIGFjdHVhbCAhPT0gdHlwZW9mIGV4cGVjdGVkKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICh0eXBlb2YgZXhwZWN0ZWQgIT09IFwib2JqZWN0XCIgfHwgZXhwZWN0ZWQgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZXhwZWN0ZWQgPT09IGFjdHVhbDtcbiAgfVxuICBpZiAoIWFjdHVhbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoQXJyYXkuaXNBcnJheShleHBlY3RlZCkpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYWN0dWFsKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gZXhwZWN0ZWQuZXZlcnkoZnVuY3Rpb24oZXhwKSB7XG4gICAgICByZXR1cm4gYWN0dWFsLnNvbWUoZnVuY3Rpb24oYWN0KSB7XG4gICAgICAgIHJldHVybiBjb21wYXJlU3Vic2V0KGV4cCwgYWN0KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIGlmIChleHBlY3RlZCBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICBpZiAoYWN0dWFsIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgcmV0dXJuIGV4cGVjdGVkLmdldFRpbWUoKSA9PT0gYWN0dWFsLmdldFRpbWUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gT2JqZWN0LmtleXMoZXhwZWN0ZWQpLmV2ZXJ5KGZ1bmN0aW9uKGtleSkge1xuICAgIGxldCBleHBlY3RlZFZhbHVlID0gZXhwZWN0ZWRba2V5XTtcbiAgICBsZXQgYWN0dWFsVmFsdWUgPSBhY3R1YWxba2V5XTtcbiAgICBpZiAodHlwZW9mIGV4cGVjdGVkVmFsdWUgPT09IFwib2JqZWN0XCIgJiYgZXhwZWN0ZWRWYWx1ZSAhPT0gbnVsbCAmJiBhY3R1YWxWYWx1ZSAhPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGNvbXBhcmVTdWJzZXQoZXhwZWN0ZWRWYWx1ZSwgYWN0dWFsVmFsdWUpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGV4cGVjdGVkVmFsdWUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgcmV0dXJuIGV4cGVjdGVkVmFsdWUoYWN0dWFsVmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gYWN0dWFsVmFsdWUgPT09IGV4cGVjdGVkVmFsdWU7XG4gIH0pO1xufVxuX19uYW1lKGNvbXBhcmVTdWJzZXQsIFwiY29tcGFyZVN1YnNldFwiKTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJjb250YWluU3Vic2V0XCIsIGZ1bmN0aW9uKGV4cGVjdGVkKSB7XG4gIGNvbnN0IGFjdHVhbCA9IGZsYWcodGhpcywgXCJvYmplY3RcIik7XG4gIGNvbnN0IHNob3dEaWZmID0gY29uZmlnLnNob3dEaWZmO1xuICB0aGlzLmFzc2VydChcbiAgICBjb21wYXJlU3Vic2V0KGV4cGVjdGVkLCBhY3R1YWwpLFxuICAgIFwiZXhwZWN0ZWQgI3thY3R9IHRvIGNvbnRhaW4gc3Vic2V0ICN7ZXhwfVwiLFxuICAgIFwiZXhwZWN0ZWQgI3thY3R9IHRvIG5vdCBjb250YWluIHN1YnNldCAje2V4cH1cIixcbiAgICBleHBlY3RlZCxcbiAgICBhY3R1YWwsXG4gICAgc2hvd0RpZmZcbiAgKTtcbn0pO1xuXG4vLyBsaWIvY2hhaS9pbnRlcmZhY2UvZXhwZWN0LmpzXG5mdW5jdGlvbiBleHBlY3QodmFsLCBtZXNzYWdlKSB7XG4gIHJldHVybiBuZXcgQXNzZXJ0aW9uKHZhbCwgbWVzc2FnZSk7XG59XG5fX25hbWUoZXhwZWN0LCBcImV4cGVjdFwiKTtcbmV4cGVjdC5mYWlsID0gZnVuY3Rpb24oYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSwgb3BlcmF0b3IpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgbWVzc2FnZSA9IGFjdHVhbDtcbiAgICBhY3R1YWwgPSB2b2lkIDA7XG4gIH1cbiAgbWVzc2FnZSA9IG1lc3NhZ2UgfHwgXCJleHBlY3QuZmFpbCgpXCI7XG4gIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihcbiAgICBtZXNzYWdlLFxuICAgIHtcbiAgICAgIGFjdHVhbCxcbiAgICAgIGV4cGVjdGVkLFxuICAgICAgb3BlcmF0b3JcbiAgICB9LFxuICAgIGV4cGVjdC5mYWlsXG4gICk7XG59O1xuXG4vLyBsaWIvY2hhaS9pbnRlcmZhY2Uvc2hvdWxkLmpzXG52YXIgc2hvdWxkX2V4cG9ydHMgPSB7fTtcbl9fZXhwb3J0KHNob3VsZF9leHBvcnRzLCB7XG4gIFNob3VsZDogKCkgPT4gU2hvdWxkLFxuICBzaG91bGQ6ICgpID0+IHNob3VsZFxufSk7XG5mdW5jdGlvbiBsb2FkU2hvdWxkKCkge1xuICBmdW5jdGlvbiBzaG91bGRHZXR0ZXIoKSB7XG4gICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBTdHJpbmcgfHwgdGhpcyBpbnN0YW5jZW9mIE51bWJlciB8fCB0aGlzIGluc3RhbmNlb2YgQm9vbGVhbiB8fCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdGhpcyBpbnN0YW5jZW9mIFN5bWJvbCB8fCB0eXBlb2YgQmlnSW50ID09PSBcImZ1bmN0aW9uXCIgJiYgdGhpcyBpbnN0YW5jZW9mIEJpZ0ludCkge1xuICAgICAgcmV0dXJuIG5ldyBBc3NlcnRpb24odGhpcy52YWx1ZU9mKCksIG51bGwsIHNob3VsZEdldHRlcik7XG4gICAgfVxuICAgIHJldHVybiBuZXcgQXNzZXJ0aW9uKHRoaXMsIG51bGwsIHNob3VsZEdldHRlcik7XG4gIH1cbiAgX19uYW1lKHNob3VsZEdldHRlciwgXCJzaG91bGRHZXR0ZXJcIik7XG4gIGZ1bmN0aW9uIHNob3VsZFNldHRlcih2YWx1ZSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcInNob3VsZFwiLCB7XG4gICAgICB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9XG4gIF9fbmFtZShzaG91bGRTZXR0ZXIsIFwic2hvdWxkU2V0dGVyXCIpO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoT2JqZWN0LnByb3RvdHlwZSwgXCJzaG91bGRcIiwge1xuICAgIHNldDogc2hvdWxkU2V0dGVyLFxuICAgIGdldDogc2hvdWxkR2V0dGVyLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KTtcbiAgbGV0IHNob3VsZDIgPSB7fTtcbiAgc2hvdWxkMi5mYWlsID0gZnVuY3Rpb24oYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSwgb3BlcmF0b3IpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICAgIG1lc3NhZ2UgPSBhY3R1YWw7XG4gICAgICBhY3R1YWwgPSB2b2lkIDA7XG4gICAgfVxuICAgIG1lc3NhZ2UgPSBtZXNzYWdlIHx8IFwic2hvdWxkLmZhaWwoKVwiO1xuICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihcbiAgICAgIG1lc3NhZ2UsXG4gICAgICB7XG4gICAgICAgIGFjdHVhbCxcbiAgICAgICAgZXhwZWN0ZWQsXG4gICAgICAgIG9wZXJhdG9yXG4gICAgICB9LFxuICAgICAgc2hvdWxkMi5mYWlsXG4gICAgKTtcbiAgfTtcbiAgc2hvdWxkMi5lcXVhbCA9IGZ1bmN0aW9uKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKGFjdHVhbCwgbWVzc2FnZSkudG8uZXF1YWwoZXhwZWN0ZWQpO1xuICB9O1xuICBzaG91bGQyLlRocm93ID0gZnVuY3Rpb24oZm4sIGVycnQsIGVycnMsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24oZm4sIG1zZykudG8uVGhyb3coZXJydCwgZXJycyk7XG4gIH07XG4gIHNob3VsZDIuZXhpc3QgPSBmdW5jdGlvbih2YWwsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24odmFsLCBtc2cpLnRvLmV4aXN0O1xuICB9O1xuICBzaG91bGQyLm5vdCA9IHt9O1xuICBzaG91bGQyLm5vdC5lcXVhbCA9IGZ1bmN0aW9uKGFjdHVhbCwgZXhwZWN0ZWQsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24oYWN0dWFsLCBtc2cpLnRvLm5vdC5lcXVhbChleHBlY3RlZCk7XG4gIH07XG4gIHNob3VsZDIubm90LlRocm93ID0gZnVuY3Rpb24oZm4sIGVycnQsIGVycnMsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24oZm4sIG1zZykudG8ubm90LlRocm93KGVycnQsIGVycnMpO1xuICB9O1xuICBzaG91bGQyLm5vdC5leGlzdCA9IGZ1bmN0aW9uKHZhbCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbih2YWwsIG1zZykudG8ubm90LmV4aXN0O1xuICB9O1xuICBzaG91bGQyW1widGhyb3dcIl0gPSBzaG91bGQyW1wiVGhyb3dcIl07XG4gIHNob3VsZDIubm90W1widGhyb3dcIl0gPSBzaG91bGQyLm5vdFtcIlRocm93XCJdO1xuICByZXR1cm4gc2hvdWxkMjtcbn1cbl9fbmFtZShsb2FkU2hvdWxkLCBcImxvYWRTaG91bGRcIik7XG52YXIgc2hvdWxkID0gbG9hZFNob3VsZDtcbnZhciBTaG91bGQgPSBsb2FkU2hvdWxkO1xuXG4vLyBsaWIvY2hhaS9pbnRlcmZhY2UvYXNzZXJ0LmpzXG5mdW5jdGlvbiBhc3NlcnQoZXhwcmVzcywgZXJybXNnKSB7XG4gIGxldCB0ZXN0MiA9IG5ldyBBc3NlcnRpb24obnVsbCwgbnVsbCwgYXNzZXJ0LCB0cnVlKTtcbiAgdGVzdDIuYXNzZXJ0KGV4cHJlc3MsIGVycm1zZywgXCJbIG5lZ2F0aW9uIG1lc3NhZ2UgdW5hdmFpbGFibGUgXVwiKTtcbn1cbl9fbmFtZShhc3NlcnQsIFwiYXNzZXJ0XCIpO1xuYXNzZXJ0LmZhaWwgPSBmdW5jdGlvbihhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCBvcGVyYXRvcikge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICBtZXNzYWdlID0gYWN0dWFsO1xuICAgIGFjdHVhbCA9IHZvaWQgMDtcbiAgfVxuICBtZXNzYWdlID0gbWVzc2FnZSB8fCBcImFzc2VydC5mYWlsKClcIjtcbiAgdGhyb3cgbmV3IEFzc2VydGlvbkVycm9yKFxuICAgIG1lc3NhZ2UsXG4gICAge1xuICAgICAgYWN0dWFsLFxuICAgICAgZXhwZWN0ZWQsXG4gICAgICBvcGVyYXRvclxuICAgIH0sXG4gICAgYXNzZXJ0LmZhaWxcbiAgKTtcbn07XG5hc3NlcnQuaXNPayA9IGZ1bmN0aW9uKHZhbCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc09rLCB0cnVlKS5pcy5vaztcbn07XG5hc3NlcnQuaXNOb3RPayA9IGZ1bmN0aW9uKHZhbCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc05vdE9rLCB0cnVlKS5pcy5ub3Qub2s7XG59O1xuYXNzZXJ0LmVxdWFsID0gZnVuY3Rpb24oYWN0LCBleHAsIG1zZykge1xuICBsZXQgdGVzdDIgPSBuZXcgQXNzZXJ0aW9uKGFjdCwgbXNnLCBhc3NlcnQuZXF1YWwsIHRydWUpO1xuICB0ZXN0Mi5hc3NlcnQoXG4gICAgZXhwID09IGZsYWcodGVzdDIsIFwib2JqZWN0XCIpLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBlcXVhbCAje2V4cH1cIixcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gbm90IGVxdWFsICN7YWN0fVwiLFxuICAgIGV4cCxcbiAgICBhY3QsXG4gICAgdHJ1ZVxuICApO1xufTtcbmFzc2VydC5ub3RFcXVhbCA9IGZ1bmN0aW9uKGFjdCwgZXhwLCBtc2cpIHtcbiAgbGV0IHRlc3QyID0gbmV3IEFzc2VydGlvbihhY3QsIG1zZywgYXNzZXJ0Lm5vdEVxdWFsLCB0cnVlKTtcbiAgdGVzdDIuYXNzZXJ0KFxuICAgIGV4cCAhPSBmbGFnKHRlc3QyLCBcIm9iamVjdFwiKSxcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gbm90IGVxdWFsICN7ZXhwfVwiLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBlcXVhbCAje2FjdH1cIixcbiAgICBleHAsXG4gICAgYWN0LFxuICAgIHRydWVcbiAgKTtcbn07XG5hc3NlcnQuc3RyaWN0RXF1YWwgPSBmdW5jdGlvbihhY3QsIGV4cCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oYWN0LCBtc2csIGFzc2VydC5zdHJpY3RFcXVhbCwgdHJ1ZSkudG8uZXF1YWwoZXhwKTtcbn07XG5hc3NlcnQubm90U3RyaWN0RXF1YWwgPSBmdW5jdGlvbihhY3QsIGV4cCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oYWN0LCBtc2csIGFzc2VydC5ub3RTdHJpY3RFcXVhbCwgdHJ1ZSkudG8ubm90LmVxdWFsKGV4cCk7XG59O1xuYXNzZXJ0LmRlZXBFcXVhbCA9IGFzc2VydC5kZWVwU3RyaWN0RXF1YWwgPSBmdW5jdGlvbihhY3QsIGV4cCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oYWN0LCBtc2csIGFzc2VydC5kZWVwRXF1YWwsIHRydWUpLnRvLmVxbChleHApO1xufTtcbmFzc2VydC5ub3REZWVwRXF1YWwgPSBmdW5jdGlvbihhY3QsIGV4cCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oYWN0LCBtc2csIGFzc2VydC5ub3REZWVwRXF1YWwsIHRydWUpLnRvLm5vdC5lcWwoZXhwKTtcbn07XG5hc3NlcnQuaXNBYm92ZSA9IGZ1bmN0aW9uKHZhbCwgYWJ2LCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmlzQWJvdmUsIHRydWUpLnRvLmJlLmFib3ZlKGFidik7XG59O1xuYXNzZXJ0LmlzQXRMZWFzdCA9IGZ1bmN0aW9uKHZhbCwgYXRsc3QsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNBdExlYXN0LCB0cnVlKS50by5iZS5sZWFzdChhdGxzdCk7XG59O1xuYXNzZXJ0LmlzQmVsb3cgPSBmdW5jdGlvbih2YWwsIGJsdywgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc0JlbG93LCB0cnVlKS50by5iZS5iZWxvdyhibHcpO1xufTtcbmFzc2VydC5pc0F0TW9zdCA9IGZ1bmN0aW9uKHZhbCwgYXRtc3QsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNBdE1vc3QsIHRydWUpLnRvLmJlLm1vc3QoYXRtc3QpO1xufTtcbmFzc2VydC5pc1RydWUgPSBmdW5jdGlvbih2YWwsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNUcnVlLCB0cnVlKS5pc1tcInRydWVcIl07XG59O1xuYXNzZXJ0LmlzTm90VHJ1ZSA9IGZ1bmN0aW9uKHZhbCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc05vdFRydWUsIHRydWUpLnRvLm5vdC5lcXVhbCh0cnVlKTtcbn07XG5hc3NlcnQuaXNGYWxzZSA9IGZ1bmN0aW9uKHZhbCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc0ZhbHNlLCB0cnVlKS5pc1tcImZhbHNlXCJdO1xufTtcbmFzc2VydC5pc05vdEZhbHNlID0gZnVuY3Rpb24odmFsLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmlzTm90RmFsc2UsIHRydWUpLnRvLm5vdC5lcXVhbChmYWxzZSk7XG59O1xuYXNzZXJ0LmlzTnVsbCA9IGZ1bmN0aW9uKHZhbCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc051bGwsIHRydWUpLnRvLmVxdWFsKG51bGwpO1xufTtcbmFzc2VydC5pc05vdE51bGwgPSBmdW5jdGlvbih2YWwsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNOb3ROdWxsLCB0cnVlKS50by5ub3QuZXF1YWwobnVsbCk7XG59O1xuYXNzZXJ0LmlzTmFOID0gZnVuY3Rpb24odmFsLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmlzTmFOLCB0cnVlKS50by5iZS5OYU47XG59O1xuYXNzZXJ0LmlzTm90TmFOID0gZnVuY3Rpb24odmFsdWUsIG1lc3NhZ2UpIHtcbiAgbmV3IEFzc2VydGlvbih2YWx1ZSwgbWVzc2FnZSwgYXNzZXJ0LmlzTm90TmFOLCB0cnVlKS5ub3QudG8uYmUuTmFOO1xufTtcbmFzc2VydC5leGlzdHMgPSBmdW5jdGlvbih2YWwsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuZXhpc3RzLCB0cnVlKS50by5leGlzdDtcbn07XG5hc3NlcnQubm90RXhpc3RzID0gZnVuY3Rpb24odmFsLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0Lm5vdEV4aXN0cywgdHJ1ZSkudG8ubm90LmV4aXN0O1xufTtcbmFzc2VydC5pc1VuZGVmaW5lZCA9IGZ1bmN0aW9uKHZhbCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc1VuZGVmaW5lZCwgdHJ1ZSkudG8uZXF1YWwodm9pZCAwKTtcbn07XG5hc3NlcnQuaXNEZWZpbmVkID0gZnVuY3Rpb24odmFsLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmlzRGVmaW5lZCwgdHJ1ZSkudG8ubm90LmVxdWFsKHZvaWQgMCk7XG59O1xuYXNzZXJ0LmlzQ2FsbGFibGUgPSBmdW5jdGlvbih2YWx1ZSwgbWVzc2FnZSkge1xuICBuZXcgQXNzZXJ0aW9uKHZhbHVlLCBtZXNzYWdlLCBhc3NlcnQuaXNDYWxsYWJsZSwgdHJ1ZSkuaXMuY2FsbGFibGU7XG59O1xuYXNzZXJ0LmlzTm90Q2FsbGFibGUgPSBmdW5jdGlvbih2YWx1ZSwgbWVzc2FnZSkge1xuICBuZXcgQXNzZXJ0aW9uKHZhbHVlLCBtZXNzYWdlLCBhc3NlcnQuaXNOb3RDYWxsYWJsZSwgdHJ1ZSkuaXMubm90LmNhbGxhYmxlO1xufTtcbmFzc2VydC5pc09iamVjdCA9IGZ1bmN0aW9uKHZhbCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc09iamVjdCwgdHJ1ZSkudG8uYmUuYShcIm9iamVjdFwiKTtcbn07XG5hc3NlcnQuaXNOb3RPYmplY3QgPSBmdW5jdGlvbih2YWwsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNOb3RPYmplY3QsIHRydWUpLnRvLm5vdC5iZS5hKFwib2JqZWN0XCIpO1xufTtcbmFzc2VydC5pc0FycmF5ID0gZnVuY3Rpb24odmFsLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmlzQXJyYXksIHRydWUpLnRvLmJlLmFuKFwiYXJyYXlcIik7XG59O1xuYXNzZXJ0LmlzTm90QXJyYXkgPSBmdW5jdGlvbih2YWwsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNOb3RBcnJheSwgdHJ1ZSkudG8ubm90LmJlLmFuKFwiYXJyYXlcIik7XG59O1xuYXNzZXJ0LmlzU3RyaW5nID0gZnVuY3Rpb24odmFsLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmlzU3RyaW5nLCB0cnVlKS50by5iZS5hKFwic3RyaW5nXCIpO1xufTtcbmFzc2VydC5pc05vdFN0cmluZyA9IGZ1bmN0aW9uKHZhbCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc05vdFN0cmluZywgdHJ1ZSkudG8ubm90LmJlLmEoXCJzdHJpbmdcIik7XG59O1xuYXNzZXJ0LmlzTnVtYmVyID0gZnVuY3Rpb24odmFsLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmlzTnVtYmVyLCB0cnVlKS50by5iZS5hKFwibnVtYmVyXCIpO1xufTtcbmFzc2VydC5pc05vdE51bWJlciA9IGZ1bmN0aW9uKHZhbCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc05vdE51bWJlciwgdHJ1ZSkudG8ubm90LmJlLmEoXCJudW1iZXJcIik7XG59O1xuYXNzZXJ0LmlzTnVtZXJpYyA9IGZ1bmN0aW9uKHZhbCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc051bWVyaWMsIHRydWUpLmlzLm51bWVyaWM7XG59O1xuYXNzZXJ0LmlzTm90TnVtZXJpYyA9IGZ1bmN0aW9uKHZhbCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc05vdE51bWVyaWMsIHRydWUpLmlzLm5vdC5udW1lcmljO1xufTtcbmFzc2VydC5pc0Zpbml0ZSA9IGZ1bmN0aW9uKHZhbCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc0Zpbml0ZSwgdHJ1ZSkudG8uYmUuZmluaXRlO1xufTtcbmFzc2VydC5pc0Jvb2xlYW4gPSBmdW5jdGlvbih2YWwsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNCb29sZWFuLCB0cnVlKS50by5iZS5hKFwiYm9vbGVhblwiKTtcbn07XG5hc3NlcnQuaXNOb3RCb29sZWFuID0gZnVuY3Rpb24odmFsLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmlzTm90Qm9vbGVhbiwgdHJ1ZSkudG8ubm90LmJlLmEoXCJib29sZWFuXCIpO1xufTtcbmFzc2VydC50eXBlT2YgPSBmdW5jdGlvbih2YWwsIHR5cGUzLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LnR5cGVPZiwgdHJ1ZSkudG8uYmUuYSh0eXBlMyk7XG59O1xuYXNzZXJ0Lm5vdFR5cGVPZiA9IGZ1bmN0aW9uKHZhbHVlLCB0eXBlMywgbWVzc2FnZSkge1xuICBuZXcgQXNzZXJ0aW9uKHZhbHVlLCBtZXNzYWdlLCBhc3NlcnQubm90VHlwZU9mLCB0cnVlKS50by5ub3QuYmUuYSh0eXBlMyk7XG59O1xuYXNzZXJ0Lmluc3RhbmNlT2YgPSBmdW5jdGlvbih2YWwsIHR5cGUzLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0Lmluc3RhbmNlT2YsIHRydWUpLnRvLmJlLmluc3RhbmNlT2YodHlwZTMpO1xufTtcbmFzc2VydC5ub3RJbnN0YW5jZU9mID0gZnVuY3Rpb24odmFsLCB0eXBlMywgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5ub3RJbnN0YW5jZU9mLCB0cnVlKS50by5ub3QuYmUuaW5zdGFuY2VPZihcbiAgICB0eXBlM1xuICApO1xufTtcbmFzc2VydC5pbmNsdWRlID0gZnVuY3Rpb24oZXhwLCBpbmMsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKGV4cCwgbXNnLCBhc3NlcnQuaW5jbHVkZSwgdHJ1ZSkuaW5jbHVkZShpbmMpO1xufTtcbmFzc2VydC5ub3RJbmNsdWRlID0gZnVuY3Rpb24oZXhwLCBpbmMsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKGV4cCwgbXNnLCBhc3NlcnQubm90SW5jbHVkZSwgdHJ1ZSkubm90LmluY2x1ZGUoaW5jKTtcbn07XG5hc3NlcnQuZGVlcEluY2x1ZGUgPSBmdW5jdGlvbihleHAsIGluYywgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oZXhwLCBtc2csIGFzc2VydC5kZWVwSW5jbHVkZSwgdHJ1ZSkuZGVlcC5pbmNsdWRlKGluYyk7XG59O1xuYXNzZXJ0Lm5vdERlZXBJbmNsdWRlID0gZnVuY3Rpb24oZXhwLCBpbmMsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKGV4cCwgbXNnLCBhc3NlcnQubm90RGVlcEluY2x1ZGUsIHRydWUpLm5vdC5kZWVwLmluY2x1ZGUoaW5jKTtcbn07XG5hc3NlcnQubmVzdGVkSW5jbHVkZSA9IGZ1bmN0aW9uKGV4cCwgaW5jLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihleHAsIG1zZywgYXNzZXJ0Lm5lc3RlZEluY2x1ZGUsIHRydWUpLm5lc3RlZC5pbmNsdWRlKGluYyk7XG59O1xuYXNzZXJ0Lm5vdE5lc3RlZEluY2x1ZGUgPSBmdW5jdGlvbihleHAsIGluYywgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oZXhwLCBtc2csIGFzc2VydC5ub3ROZXN0ZWRJbmNsdWRlLCB0cnVlKS5ub3QubmVzdGVkLmluY2x1ZGUoXG4gICAgaW5jXG4gICk7XG59O1xuYXNzZXJ0LmRlZXBOZXN0ZWRJbmNsdWRlID0gZnVuY3Rpb24oZXhwLCBpbmMsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKGV4cCwgbXNnLCBhc3NlcnQuZGVlcE5lc3RlZEluY2x1ZGUsIHRydWUpLmRlZXAubmVzdGVkLmluY2x1ZGUoXG4gICAgaW5jXG4gICk7XG59O1xuYXNzZXJ0Lm5vdERlZXBOZXN0ZWRJbmNsdWRlID0gZnVuY3Rpb24oZXhwLCBpbmMsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKFxuICAgIGV4cCxcbiAgICBtc2csXG4gICAgYXNzZXJ0Lm5vdERlZXBOZXN0ZWRJbmNsdWRlLFxuICAgIHRydWVcbiAgKS5ub3QuZGVlcC5uZXN0ZWQuaW5jbHVkZShpbmMpO1xufTtcbmFzc2VydC5vd25JbmNsdWRlID0gZnVuY3Rpb24oZXhwLCBpbmMsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKGV4cCwgbXNnLCBhc3NlcnQub3duSW5jbHVkZSwgdHJ1ZSkub3duLmluY2x1ZGUoaW5jKTtcbn07XG5hc3NlcnQubm90T3duSW5jbHVkZSA9IGZ1bmN0aW9uKGV4cCwgaW5jLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihleHAsIG1zZywgYXNzZXJ0Lm5vdE93bkluY2x1ZGUsIHRydWUpLm5vdC5vd24uaW5jbHVkZShpbmMpO1xufTtcbmFzc2VydC5kZWVwT3duSW5jbHVkZSA9IGZ1bmN0aW9uKGV4cCwgaW5jLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihleHAsIG1zZywgYXNzZXJ0LmRlZXBPd25JbmNsdWRlLCB0cnVlKS5kZWVwLm93bi5pbmNsdWRlKGluYyk7XG59O1xuYXNzZXJ0Lm5vdERlZXBPd25JbmNsdWRlID0gZnVuY3Rpb24oZXhwLCBpbmMsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKGV4cCwgbXNnLCBhc3NlcnQubm90RGVlcE93bkluY2x1ZGUsIHRydWUpLm5vdC5kZWVwLm93bi5pbmNsdWRlKFxuICAgIGluY1xuICApO1xufTtcbmFzc2VydC5tYXRjaCA9IGZ1bmN0aW9uKGV4cCwgcmUsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKGV4cCwgbXNnLCBhc3NlcnQubWF0Y2gsIHRydWUpLnRvLm1hdGNoKHJlKTtcbn07XG5hc3NlcnQubm90TWF0Y2ggPSBmdW5jdGlvbihleHAsIHJlLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihleHAsIG1zZywgYXNzZXJ0Lm5vdE1hdGNoLCB0cnVlKS50by5ub3QubWF0Y2gocmUpO1xufTtcbmFzc2VydC5wcm9wZXJ0eSA9IGZ1bmN0aW9uKG9iaiwgcHJvcCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24ob2JqLCBtc2csIGFzc2VydC5wcm9wZXJ0eSwgdHJ1ZSkudG8uaGF2ZS5wcm9wZXJ0eShwcm9wKTtcbn07XG5hc3NlcnQubm90UHJvcGVydHkgPSBmdW5jdGlvbihvYmosIHByb3AsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnLCBhc3NlcnQubm90UHJvcGVydHksIHRydWUpLnRvLm5vdC5oYXZlLnByb3BlcnR5KHByb3ApO1xufTtcbmFzc2VydC5wcm9wZXJ0eVZhbCA9IGZ1bmN0aW9uKG9iaiwgcHJvcCwgdmFsLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihvYmosIG1zZywgYXNzZXJ0LnByb3BlcnR5VmFsLCB0cnVlKS50by5oYXZlLnByb3BlcnR5KHByb3AsIHZhbCk7XG59O1xuYXNzZXJ0Lm5vdFByb3BlcnR5VmFsID0gZnVuY3Rpb24ob2JqLCBwcm9wLCB2YWwsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnLCBhc3NlcnQubm90UHJvcGVydHlWYWwsIHRydWUpLnRvLm5vdC5oYXZlLnByb3BlcnR5KFxuICAgIHByb3AsXG4gICAgdmFsXG4gICk7XG59O1xuYXNzZXJ0LmRlZXBQcm9wZXJ0eVZhbCA9IGZ1bmN0aW9uKG9iaiwgcHJvcCwgdmFsLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihvYmosIG1zZywgYXNzZXJ0LmRlZXBQcm9wZXJ0eVZhbCwgdHJ1ZSkudG8uaGF2ZS5kZWVwLnByb3BlcnR5KFxuICAgIHByb3AsXG4gICAgdmFsXG4gICk7XG59O1xuYXNzZXJ0Lm5vdERlZXBQcm9wZXJ0eVZhbCA9IGZ1bmN0aW9uKG9iaiwgcHJvcCwgdmFsLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihcbiAgICBvYmosXG4gICAgbXNnLFxuICAgIGFzc2VydC5ub3REZWVwUHJvcGVydHlWYWwsXG4gICAgdHJ1ZVxuICApLnRvLm5vdC5oYXZlLmRlZXAucHJvcGVydHkocHJvcCwgdmFsKTtcbn07XG5hc3NlcnQub3duUHJvcGVydHkgPSBmdW5jdGlvbihvYmosIHByb3AsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnLCBhc3NlcnQub3duUHJvcGVydHksIHRydWUpLnRvLmhhdmUub3duLnByb3BlcnR5KHByb3ApO1xufTtcbmFzc2VydC5ub3RPd25Qcm9wZXJ0eSA9IGZ1bmN0aW9uKG9iaiwgcHJvcCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24ob2JqLCBtc2csIGFzc2VydC5ub3RPd25Qcm9wZXJ0eSwgdHJ1ZSkudG8ubm90LmhhdmUub3duLnByb3BlcnR5KFxuICAgIHByb3BcbiAgKTtcbn07XG5hc3NlcnQub3duUHJvcGVydHlWYWwgPSBmdW5jdGlvbihvYmosIHByb3AsIHZhbHVlLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihvYmosIG1zZywgYXNzZXJ0Lm93blByb3BlcnR5VmFsLCB0cnVlKS50by5oYXZlLm93bi5wcm9wZXJ0eShcbiAgICBwcm9wLFxuICAgIHZhbHVlXG4gICk7XG59O1xuYXNzZXJ0Lm5vdE93blByb3BlcnR5VmFsID0gZnVuY3Rpb24ob2JqLCBwcm9wLCB2YWx1ZSwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oXG4gICAgb2JqLFxuICAgIG1zZyxcbiAgICBhc3NlcnQubm90T3duUHJvcGVydHlWYWwsXG4gICAgdHJ1ZVxuICApLnRvLm5vdC5oYXZlLm93bi5wcm9wZXJ0eShwcm9wLCB2YWx1ZSk7XG59O1xuYXNzZXJ0LmRlZXBPd25Qcm9wZXJ0eVZhbCA9IGZ1bmN0aW9uKG9iaiwgcHJvcCwgdmFsdWUsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKFxuICAgIG9iaixcbiAgICBtc2csXG4gICAgYXNzZXJ0LmRlZXBPd25Qcm9wZXJ0eVZhbCxcbiAgICB0cnVlXG4gICkudG8uaGF2ZS5kZWVwLm93bi5wcm9wZXJ0eShwcm9wLCB2YWx1ZSk7XG59O1xuYXNzZXJ0Lm5vdERlZXBPd25Qcm9wZXJ0eVZhbCA9IGZ1bmN0aW9uKG9iaiwgcHJvcCwgdmFsdWUsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKFxuICAgIG9iaixcbiAgICBtc2csXG4gICAgYXNzZXJ0Lm5vdERlZXBPd25Qcm9wZXJ0eVZhbCxcbiAgICB0cnVlXG4gICkudG8ubm90LmhhdmUuZGVlcC5vd24ucHJvcGVydHkocHJvcCwgdmFsdWUpO1xufTtcbmFzc2VydC5uZXN0ZWRQcm9wZXJ0eSA9IGZ1bmN0aW9uKG9iaiwgcHJvcCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24ob2JqLCBtc2csIGFzc2VydC5uZXN0ZWRQcm9wZXJ0eSwgdHJ1ZSkudG8uaGF2ZS5uZXN0ZWQucHJvcGVydHkoXG4gICAgcHJvcFxuICApO1xufTtcbmFzc2VydC5ub3ROZXN0ZWRQcm9wZXJ0eSA9IGZ1bmN0aW9uKG9iaiwgcHJvcCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oXG4gICAgb2JqLFxuICAgIG1zZyxcbiAgICBhc3NlcnQubm90TmVzdGVkUHJvcGVydHksXG4gICAgdHJ1ZVxuICApLnRvLm5vdC5oYXZlLm5lc3RlZC5wcm9wZXJ0eShwcm9wKTtcbn07XG5hc3NlcnQubmVzdGVkUHJvcGVydHlWYWwgPSBmdW5jdGlvbihvYmosIHByb3AsIHZhbCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oXG4gICAgb2JqLFxuICAgIG1zZyxcbiAgICBhc3NlcnQubmVzdGVkUHJvcGVydHlWYWwsXG4gICAgdHJ1ZVxuICApLnRvLmhhdmUubmVzdGVkLnByb3BlcnR5KHByb3AsIHZhbCk7XG59O1xuYXNzZXJ0Lm5vdE5lc3RlZFByb3BlcnR5VmFsID0gZnVuY3Rpb24ob2JqLCBwcm9wLCB2YWwsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKFxuICAgIG9iaixcbiAgICBtc2csXG4gICAgYXNzZXJ0Lm5vdE5lc3RlZFByb3BlcnR5VmFsLFxuICAgIHRydWVcbiAgKS50by5ub3QuaGF2ZS5uZXN0ZWQucHJvcGVydHkocHJvcCwgdmFsKTtcbn07XG5hc3NlcnQuZGVlcE5lc3RlZFByb3BlcnR5VmFsID0gZnVuY3Rpb24ob2JqLCBwcm9wLCB2YWwsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKFxuICAgIG9iaixcbiAgICBtc2csXG4gICAgYXNzZXJ0LmRlZXBOZXN0ZWRQcm9wZXJ0eVZhbCxcbiAgICB0cnVlXG4gICkudG8uaGF2ZS5kZWVwLm5lc3RlZC5wcm9wZXJ0eShwcm9wLCB2YWwpO1xufTtcbmFzc2VydC5ub3REZWVwTmVzdGVkUHJvcGVydHlWYWwgPSBmdW5jdGlvbihvYmosIHByb3AsIHZhbCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oXG4gICAgb2JqLFxuICAgIG1zZyxcbiAgICBhc3NlcnQubm90RGVlcE5lc3RlZFByb3BlcnR5VmFsLFxuICAgIHRydWVcbiAgKS50by5ub3QuaGF2ZS5kZWVwLm5lc3RlZC5wcm9wZXJ0eShwcm9wLCB2YWwpO1xufTtcbmFzc2VydC5sZW5ndGhPZiA9IGZ1bmN0aW9uKGV4cCwgbGVuLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihleHAsIG1zZywgYXNzZXJ0Lmxlbmd0aE9mLCB0cnVlKS50by5oYXZlLmxlbmd0aE9mKGxlbik7XG59O1xuYXNzZXJ0Lmhhc0FueUtleXMgPSBmdW5jdGlvbihvYmosIGtleXMsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnLCBhc3NlcnQuaGFzQW55S2V5cywgdHJ1ZSkudG8uaGF2ZS5hbnkua2V5cyhrZXlzKTtcbn07XG5hc3NlcnQuaGFzQWxsS2V5cyA9IGZ1bmN0aW9uKG9iaiwga2V5cywgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24ob2JqLCBtc2csIGFzc2VydC5oYXNBbGxLZXlzLCB0cnVlKS50by5oYXZlLmFsbC5rZXlzKGtleXMpO1xufTtcbmFzc2VydC5jb250YWluc0FsbEtleXMgPSBmdW5jdGlvbihvYmosIGtleXMsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnLCBhc3NlcnQuY29udGFpbnNBbGxLZXlzLCB0cnVlKS50by5jb250YWluLmFsbC5rZXlzKFxuICAgIGtleXNcbiAgKTtcbn07XG5hc3NlcnQuZG9lc05vdEhhdmVBbnlLZXlzID0gZnVuY3Rpb24ob2JqLCBrZXlzLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihvYmosIG1zZywgYXNzZXJ0LmRvZXNOb3RIYXZlQW55S2V5cywgdHJ1ZSkudG8ubm90LmhhdmUuYW55LmtleXMoXG4gICAga2V5c1xuICApO1xufTtcbmFzc2VydC5kb2VzTm90SGF2ZUFsbEtleXMgPSBmdW5jdGlvbihvYmosIGtleXMsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnLCBhc3NlcnQuZG9lc05vdEhhdmVBbGxLZXlzLCB0cnVlKS50by5ub3QuaGF2ZS5hbGwua2V5cyhcbiAgICBrZXlzXG4gICk7XG59O1xuYXNzZXJ0Lmhhc0FueURlZXBLZXlzID0gZnVuY3Rpb24ob2JqLCBrZXlzLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihvYmosIG1zZywgYXNzZXJ0Lmhhc0FueURlZXBLZXlzLCB0cnVlKS50by5oYXZlLmFueS5kZWVwLmtleXMoXG4gICAga2V5c1xuICApO1xufTtcbmFzc2VydC5oYXNBbGxEZWVwS2V5cyA9IGZ1bmN0aW9uKG9iaiwga2V5cywgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24ob2JqLCBtc2csIGFzc2VydC5oYXNBbGxEZWVwS2V5cywgdHJ1ZSkudG8uaGF2ZS5hbGwuZGVlcC5rZXlzKFxuICAgIGtleXNcbiAgKTtcbn07XG5hc3NlcnQuY29udGFpbnNBbGxEZWVwS2V5cyA9IGZ1bmN0aW9uKG9iaiwga2V5cywgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oXG4gICAgb2JqLFxuICAgIG1zZyxcbiAgICBhc3NlcnQuY29udGFpbnNBbGxEZWVwS2V5cyxcbiAgICB0cnVlXG4gICkudG8uY29udGFpbi5hbGwuZGVlcC5rZXlzKGtleXMpO1xufTtcbmFzc2VydC5kb2VzTm90SGF2ZUFueURlZXBLZXlzID0gZnVuY3Rpb24ob2JqLCBrZXlzLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihcbiAgICBvYmosXG4gICAgbXNnLFxuICAgIGFzc2VydC5kb2VzTm90SGF2ZUFueURlZXBLZXlzLFxuICAgIHRydWVcbiAgKS50by5ub3QuaGF2ZS5hbnkuZGVlcC5rZXlzKGtleXMpO1xufTtcbmFzc2VydC5kb2VzTm90SGF2ZUFsbERlZXBLZXlzID0gZnVuY3Rpb24ob2JqLCBrZXlzLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihcbiAgICBvYmosXG4gICAgbXNnLFxuICAgIGFzc2VydC5kb2VzTm90SGF2ZUFsbERlZXBLZXlzLFxuICAgIHRydWVcbiAgKS50by5ub3QuaGF2ZS5hbGwuZGVlcC5rZXlzKGtleXMpO1xufTtcbmFzc2VydC50aHJvd3MgPSBmdW5jdGlvbihmbiwgZXJyb3JMaWtlLCBlcnJNc2dNYXRjaGVyLCBtc2cpIHtcbiAgaWYgKFwic3RyaW5nXCIgPT09IHR5cGVvZiBlcnJvckxpa2UgfHwgZXJyb3JMaWtlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgZXJyTXNnTWF0Y2hlciA9IGVycm9yTGlrZTtcbiAgICBlcnJvckxpa2UgPSBudWxsO1xuICB9XG4gIGxldCBhc3NlcnRFcnIgPSBuZXcgQXNzZXJ0aW9uKGZuLCBtc2csIGFzc2VydC50aHJvd3MsIHRydWUpLnRvLnRocm93KFxuICAgIGVycm9yTGlrZSxcbiAgICBlcnJNc2dNYXRjaGVyXG4gICk7XG4gIHJldHVybiBmbGFnKGFzc2VydEVyciwgXCJvYmplY3RcIik7XG59O1xuYXNzZXJ0LmRvZXNOb3RUaHJvdyA9IGZ1bmN0aW9uKGZuLCBlcnJvckxpa2UsIGVyck1zZ01hdGNoZXIsIG1lc3NhZ2UpIHtcbiAgaWYgKFwic3RyaW5nXCIgPT09IHR5cGVvZiBlcnJvckxpa2UgfHwgZXJyb3JMaWtlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgZXJyTXNnTWF0Y2hlciA9IGVycm9yTGlrZTtcbiAgICBlcnJvckxpa2UgPSBudWxsO1xuICB9XG4gIG5ldyBBc3NlcnRpb24oZm4sIG1lc3NhZ2UsIGFzc2VydC5kb2VzTm90VGhyb3csIHRydWUpLnRvLm5vdC50aHJvdyhcbiAgICBlcnJvckxpa2UsXG4gICAgZXJyTXNnTWF0Y2hlclxuICApO1xufTtcbmFzc2VydC5vcGVyYXRvciA9IGZ1bmN0aW9uKHZhbCwgb3BlcmF0b3IsIHZhbDIsIG1zZykge1xuICBsZXQgb2s7XG4gIHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgICBjYXNlIFwiPT1cIjpcbiAgICAgIG9rID0gdmFsID09IHZhbDI7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiPT09XCI6XG4gICAgICBvayA9IHZhbCA9PT0gdmFsMjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCI+XCI6XG4gICAgICBvayA9IHZhbCA+IHZhbDI7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiPj1cIjpcbiAgICAgIG9rID0gdmFsID49IHZhbDI7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiPFwiOlxuICAgICAgb2sgPSB2YWwgPCB2YWwyO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIjw9XCI6XG4gICAgICBvayA9IHZhbCA8PSB2YWwyO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIiE9XCI6XG4gICAgICBvayA9IHZhbCAhPSB2YWwyO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIiE9PVwiOlxuICAgICAgb2sgPSB2YWwgIT09IHZhbDI7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgbXNnID0gbXNnID8gbXNnICsgXCI6IFwiIDogbXNnO1xuICAgICAgdGhyb3cgbmV3IEFzc2VydGlvbkVycm9yKFxuICAgICAgICBtc2cgKyAnSW52YWxpZCBvcGVyYXRvciBcIicgKyBvcGVyYXRvciArICdcIicsXG4gICAgICAgIHZvaWQgMCxcbiAgICAgICAgYXNzZXJ0Lm9wZXJhdG9yXG4gICAgICApO1xuICB9XG4gIGxldCB0ZXN0MiA9IG5ldyBBc3NlcnRpb24ob2ssIG1zZywgYXNzZXJ0Lm9wZXJhdG9yLCB0cnVlKTtcbiAgdGVzdDIuYXNzZXJ0KFxuICAgIHRydWUgPT09IGZsYWcodGVzdDIsIFwib2JqZWN0XCIpLFxuICAgIFwiZXhwZWN0ZWQgXCIgKyBpbnNwZWN0Mih2YWwpICsgXCIgdG8gYmUgXCIgKyBvcGVyYXRvciArIFwiIFwiICsgaW5zcGVjdDIodmFsMiksXG4gICAgXCJleHBlY3RlZCBcIiArIGluc3BlY3QyKHZhbCkgKyBcIiB0byBub3QgYmUgXCIgKyBvcGVyYXRvciArIFwiIFwiICsgaW5zcGVjdDIodmFsMilcbiAgKTtcbn07XG5hc3NlcnQuY2xvc2VUbyA9IGZ1bmN0aW9uKGFjdCwgZXhwLCBkZWx0YSwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oYWN0LCBtc2csIGFzc2VydC5jbG9zZVRvLCB0cnVlKS50by5iZS5jbG9zZVRvKGV4cCwgZGVsdGEpO1xufTtcbmFzc2VydC5hcHByb3hpbWF0ZWx5ID0gZnVuY3Rpb24oYWN0LCBleHAsIGRlbHRhLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihhY3QsIG1zZywgYXNzZXJ0LmFwcHJveGltYXRlbHksIHRydWUpLnRvLmJlLmFwcHJveGltYXRlbHkoXG4gICAgZXhwLFxuICAgIGRlbHRhXG4gICk7XG59O1xuYXNzZXJ0LnNhbWVNZW1iZXJzID0gZnVuY3Rpb24oc2V0MSwgc2V0MiwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oc2V0MSwgbXNnLCBhc3NlcnQuc2FtZU1lbWJlcnMsIHRydWUpLnRvLmhhdmUuc2FtZS5tZW1iZXJzKHNldDIpO1xufTtcbmFzc2VydC5ub3RTYW1lTWVtYmVycyA9IGZ1bmN0aW9uKHNldDEsIHNldDIsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKFxuICAgIHNldDEsXG4gICAgbXNnLFxuICAgIGFzc2VydC5ub3RTYW1lTWVtYmVycyxcbiAgICB0cnVlXG4gICkudG8ubm90LmhhdmUuc2FtZS5tZW1iZXJzKHNldDIpO1xufTtcbmFzc2VydC5zYW1lRGVlcE1lbWJlcnMgPSBmdW5jdGlvbihzZXQxLCBzZXQyLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihcbiAgICBzZXQxLFxuICAgIG1zZyxcbiAgICBhc3NlcnQuc2FtZURlZXBNZW1iZXJzLFxuICAgIHRydWVcbiAgKS50by5oYXZlLnNhbWUuZGVlcC5tZW1iZXJzKHNldDIpO1xufTtcbmFzc2VydC5ub3RTYW1lRGVlcE1lbWJlcnMgPSBmdW5jdGlvbihzZXQxLCBzZXQyLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihcbiAgICBzZXQxLFxuICAgIG1zZyxcbiAgICBhc3NlcnQubm90U2FtZURlZXBNZW1iZXJzLFxuICAgIHRydWVcbiAgKS50by5ub3QuaGF2ZS5zYW1lLmRlZXAubWVtYmVycyhzZXQyKTtcbn07XG5hc3NlcnQuc2FtZU9yZGVyZWRNZW1iZXJzID0gZnVuY3Rpb24oc2V0MSwgc2V0MiwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oXG4gICAgc2V0MSxcbiAgICBtc2csXG4gICAgYXNzZXJ0LnNhbWVPcmRlcmVkTWVtYmVycyxcbiAgICB0cnVlXG4gICkudG8uaGF2ZS5zYW1lLm9yZGVyZWQubWVtYmVycyhzZXQyKTtcbn07XG5hc3NlcnQubm90U2FtZU9yZGVyZWRNZW1iZXJzID0gZnVuY3Rpb24oc2V0MSwgc2V0MiwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oXG4gICAgc2V0MSxcbiAgICBtc2csXG4gICAgYXNzZXJ0Lm5vdFNhbWVPcmRlcmVkTWVtYmVycyxcbiAgICB0cnVlXG4gICkudG8ubm90LmhhdmUuc2FtZS5vcmRlcmVkLm1lbWJlcnMoc2V0Mik7XG59O1xuYXNzZXJ0LnNhbWVEZWVwT3JkZXJlZE1lbWJlcnMgPSBmdW5jdGlvbihzZXQxLCBzZXQyLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihcbiAgICBzZXQxLFxuICAgIG1zZyxcbiAgICBhc3NlcnQuc2FtZURlZXBPcmRlcmVkTWVtYmVycyxcbiAgICB0cnVlXG4gICkudG8uaGF2ZS5zYW1lLmRlZXAub3JkZXJlZC5tZW1iZXJzKHNldDIpO1xufTtcbmFzc2VydC5ub3RTYW1lRGVlcE9yZGVyZWRNZW1iZXJzID0gZnVuY3Rpb24oc2V0MSwgc2V0MiwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oXG4gICAgc2V0MSxcbiAgICBtc2csXG4gICAgYXNzZXJ0Lm5vdFNhbWVEZWVwT3JkZXJlZE1lbWJlcnMsXG4gICAgdHJ1ZVxuICApLnRvLm5vdC5oYXZlLnNhbWUuZGVlcC5vcmRlcmVkLm1lbWJlcnMoc2V0Mik7XG59O1xuYXNzZXJ0LmluY2x1ZGVNZW1iZXJzID0gZnVuY3Rpb24oc3VwZXJzZXQsIHN1YnNldCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oc3VwZXJzZXQsIG1zZywgYXNzZXJ0LmluY2x1ZGVNZW1iZXJzLCB0cnVlKS50by5pbmNsdWRlLm1lbWJlcnMoXG4gICAgc3Vic2V0XG4gICk7XG59O1xuYXNzZXJ0Lm5vdEluY2x1ZGVNZW1iZXJzID0gZnVuY3Rpb24oc3VwZXJzZXQsIHN1YnNldCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oXG4gICAgc3VwZXJzZXQsXG4gICAgbXNnLFxuICAgIGFzc2VydC5ub3RJbmNsdWRlTWVtYmVycyxcbiAgICB0cnVlXG4gICkudG8ubm90LmluY2x1ZGUubWVtYmVycyhzdWJzZXQpO1xufTtcbmFzc2VydC5pbmNsdWRlRGVlcE1lbWJlcnMgPSBmdW5jdGlvbihzdXBlcnNldCwgc3Vic2V0LCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihcbiAgICBzdXBlcnNldCxcbiAgICBtc2csXG4gICAgYXNzZXJ0LmluY2x1ZGVEZWVwTWVtYmVycyxcbiAgICB0cnVlXG4gICkudG8uaW5jbHVkZS5kZWVwLm1lbWJlcnMoc3Vic2V0KTtcbn07XG5hc3NlcnQubm90SW5jbHVkZURlZXBNZW1iZXJzID0gZnVuY3Rpb24oc3VwZXJzZXQsIHN1YnNldCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oXG4gICAgc3VwZXJzZXQsXG4gICAgbXNnLFxuICAgIGFzc2VydC5ub3RJbmNsdWRlRGVlcE1lbWJlcnMsXG4gICAgdHJ1ZVxuICApLnRvLm5vdC5pbmNsdWRlLmRlZXAubWVtYmVycyhzdWJzZXQpO1xufTtcbmFzc2VydC5pbmNsdWRlT3JkZXJlZE1lbWJlcnMgPSBmdW5jdGlvbihzdXBlcnNldCwgc3Vic2V0LCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihcbiAgICBzdXBlcnNldCxcbiAgICBtc2csXG4gICAgYXNzZXJ0LmluY2x1ZGVPcmRlcmVkTWVtYmVycyxcbiAgICB0cnVlXG4gICkudG8uaW5jbHVkZS5vcmRlcmVkLm1lbWJlcnMoc3Vic2V0KTtcbn07XG5hc3NlcnQubm90SW5jbHVkZU9yZGVyZWRNZW1iZXJzID0gZnVuY3Rpb24oc3VwZXJzZXQsIHN1YnNldCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oXG4gICAgc3VwZXJzZXQsXG4gICAgbXNnLFxuICAgIGFzc2VydC5ub3RJbmNsdWRlT3JkZXJlZE1lbWJlcnMsXG4gICAgdHJ1ZVxuICApLnRvLm5vdC5pbmNsdWRlLm9yZGVyZWQubWVtYmVycyhzdWJzZXQpO1xufTtcbmFzc2VydC5pbmNsdWRlRGVlcE9yZGVyZWRNZW1iZXJzID0gZnVuY3Rpb24oc3VwZXJzZXQsIHN1YnNldCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oXG4gICAgc3VwZXJzZXQsXG4gICAgbXNnLFxuICAgIGFzc2VydC5pbmNsdWRlRGVlcE9yZGVyZWRNZW1iZXJzLFxuICAgIHRydWVcbiAgKS50by5pbmNsdWRlLmRlZXAub3JkZXJlZC5tZW1iZXJzKHN1YnNldCk7XG59O1xuYXNzZXJ0Lm5vdEluY2x1ZGVEZWVwT3JkZXJlZE1lbWJlcnMgPSBmdW5jdGlvbihzdXBlcnNldCwgc3Vic2V0LCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihcbiAgICBzdXBlcnNldCxcbiAgICBtc2csXG4gICAgYXNzZXJ0Lm5vdEluY2x1ZGVEZWVwT3JkZXJlZE1lbWJlcnMsXG4gICAgdHJ1ZVxuICApLnRvLm5vdC5pbmNsdWRlLmRlZXAub3JkZXJlZC5tZW1iZXJzKHN1YnNldCk7XG59O1xuYXNzZXJ0Lm9uZU9mID0gZnVuY3Rpb24oaW5MaXN0LCBsaXN0LCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihpbkxpc3QsIG1zZywgYXNzZXJ0Lm9uZU9mLCB0cnVlKS50by5iZS5vbmVPZihsaXN0KTtcbn07XG5hc3NlcnQuaXNJdGVyYWJsZSA9IGZ1bmN0aW9uKG9iaiwgbXNnKSB7XG4gIGlmIChvYmogPT0gdm9pZCAwIHx8ICFvYmpbU3ltYm9sLml0ZXJhdG9yXSkge1xuICAgIG1zZyA9IG1zZyA/IGAke21zZ30gZXhwZWN0ZWQgJHtpbnNwZWN0MihvYmopfSB0byBiZSBhbiBpdGVyYWJsZWAgOiBgZXhwZWN0ZWQgJHtpbnNwZWN0MihvYmopfSB0byBiZSBhbiBpdGVyYWJsZWA7XG4gICAgdGhyb3cgbmV3IEFzc2VydGlvbkVycm9yKG1zZywgdm9pZCAwLCBhc3NlcnQuaXNJdGVyYWJsZSk7XG4gIH1cbn07XG5hc3NlcnQuY2hhbmdlcyA9IGZ1bmN0aW9uKGZuLCBvYmosIHByb3AsIG1zZykge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMyAmJiB0eXBlb2Ygb2JqID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBtc2cgPSBwcm9wO1xuICAgIHByb3AgPSBudWxsO1xuICB9XG4gIG5ldyBBc3NlcnRpb24oZm4sIG1zZywgYXNzZXJ0LmNoYW5nZXMsIHRydWUpLnRvLmNoYW5nZShvYmosIHByb3ApO1xufTtcbmFzc2VydC5jaGFuZ2VzQnkgPSBmdW5jdGlvbihmbiwgb2JqLCBwcm9wLCBkZWx0YSwgbXNnKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSA0ICYmIHR5cGVvZiBvYmogPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGxldCB0bXBNc2cgPSBkZWx0YTtcbiAgICBkZWx0YSA9IHByb3A7XG4gICAgbXNnID0gdG1wTXNnO1xuICB9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMpIHtcbiAgICBkZWx0YSA9IHByb3A7XG4gICAgcHJvcCA9IG51bGw7XG4gIH1cbiAgbmV3IEFzc2VydGlvbihmbiwgbXNnLCBhc3NlcnQuY2hhbmdlc0J5LCB0cnVlKS50by5jaGFuZ2Uob2JqLCBwcm9wKS5ieShkZWx0YSk7XG59O1xuYXNzZXJ0LmRvZXNOb3RDaGFuZ2UgPSBmdW5jdGlvbihmbiwgb2JqLCBwcm9wLCBtc2cpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMgJiYgdHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgbXNnID0gcHJvcDtcbiAgICBwcm9wID0gbnVsbDtcbiAgfVxuICByZXR1cm4gbmV3IEFzc2VydGlvbihmbiwgbXNnLCBhc3NlcnQuZG9lc05vdENoYW5nZSwgdHJ1ZSkudG8ubm90LmNoYW5nZShcbiAgICBvYmosXG4gICAgcHJvcFxuICApO1xufTtcbmFzc2VydC5jaGFuZ2VzQnV0Tm90QnkgPSBmdW5jdGlvbihmbiwgb2JqLCBwcm9wLCBkZWx0YSwgbXNnKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSA0ICYmIHR5cGVvZiBvYmogPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGxldCB0bXBNc2cgPSBkZWx0YTtcbiAgICBkZWx0YSA9IHByb3A7XG4gICAgbXNnID0gdG1wTXNnO1xuICB9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMpIHtcbiAgICBkZWx0YSA9IHByb3A7XG4gICAgcHJvcCA9IG51bGw7XG4gIH1cbiAgbmV3IEFzc2VydGlvbihmbiwgbXNnLCBhc3NlcnQuY2hhbmdlc0J1dE5vdEJ5LCB0cnVlKS50by5jaGFuZ2Uob2JqLCBwcm9wKS5idXQubm90LmJ5KGRlbHRhKTtcbn07XG5hc3NlcnQuaW5jcmVhc2VzID0gZnVuY3Rpb24oZm4sIG9iaiwgcHJvcCwgbXNnKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzICYmIHR5cGVvZiBvYmogPT09IFwiZnVuY3Rpb25cIikge1xuICAgIG1zZyA9IHByb3A7XG4gICAgcHJvcCA9IG51bGw7XG4gIH1cbiAgcmV0dXJuIG5ldyBBc3NlcnRpb24oZm4sIG1zZywgYXNzZXJ0LmluY3JlYXNlcywgdHJ1ZSkudG8uaW5jcmVhc2Uob2JqLCBwcm9wKTtcbn07XG5hc3NlcnQuaW5jcmVhc2VzQnkgPSBmdW5jdGlvbihmbiwgb2JqLCBwcm9wLCBkZWx0YSwgbXNnKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSA0ICYmIHR5cGVvZiBvYmogPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGxldCB0bXBNc2cgPSBkZWx0YTtcbiAgICBkZWx0YSA9IHByb3A7XG4gICAgbXNnID0gdG1wTXNnO1xuICB9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMpIHtcbiAgICBkZWx0YSA9IHByb3A7XG4gICAgcHJvcCA9IG51bGw7XG4gIH1cbiAgbmV3IEFzc2VydGlvbihmbiwgbXNnLCBhc3NlcnQuaW5jcmVhc2VzQnksIHRydWUpLnRvLmluY3JlYXNlKG9iaiwgcHJvcCkuYnkoZGVsdGEpO1xufTtcbmFzc2VydC5kb2VzTm90SW5jcmVhc2UgPSBmdW5jdGlvbihmbiwgb2JqLCBwcm9wLCBtc2cpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMgJiYgdHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgbXNnID0gcHJvcDtcbiAgICBwcm9wID0gbnVsbDtcbiAgfVxuICByZXR1cm4gbmV3IEFzc2VydGlvbihmbiwgbXNnLCBhc3NlcnQuZG9lc05vdEluY3JlYXNlLCB0cnVlKS50by5ub3QuaW5jcmVhc2UoXG4gICAgb2JqLFxuICAgIHByb3BcbiAgKTtcbn07XG5hc3NlcnQuaW5jcmVhc2VzQnV0Tm90QnkgPSBmdW5jdGlvbihmbiwgb2JqLCBwcm9wLCBkZWx0YSwgbXNnKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSA0ICYmIHR5cGVvZiBvYmogPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGxldCB0bXBNc2cgPSBkZWx0YTtcbiAgICBkZWx0YSA9IHByb3A7XG4gICAgbXNnID0gdG1wTXNnO1xuICB9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMpIHtcbiAgICBkZWx0YSA9IHByb3A7XG4gICAgcHJvcCA9IG51bGw7XG4gIH1cbiAgbmV3IEFzc2VydGlvbihmbiwgbXNnLCBhc3NlcnQuaW5jcmVhc2VzQnV0Tm90QnksIHRydWUpLnRvLmluY3JlYXNlKG9iaiwgcHJvcCkuYnV0Lm5vdC5ieShkZWx0YSk7XG59O1xuYXNzZXJ0LmRlY3JlYXNlcyA9IGZ1bmN0aW9uKGZuLCBvYmosIHByb3AsIG1zZykge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMyAmJiB0eXBlb2Ygb2JqID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBtc2cgPSBwcm9wO1xuICAgIHByb3AgPSBudWxsO1xuICB9XG4gIHJldHVybiBuZXcgQXNzZXJ0aW9uKGZuLCBtc2csIGFzc2VydC5kZWNyZWFzZXMsIHRydWUpLnRvLmRlY3JlYXNlKG9iaiwgcHJvcCk7XG59O1xuYXNzZXJ0LmRlY3JlYXNlc0J5ID0gZnVuY3Rpb24oZm4sIG9iaiwgcHJvcCwgZGVsdGEsIG1zZykge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gNCAmJiB0eXBlb2Ygb2JqID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBsZXQgdG1wTXNnID0gZGVsdGE7XG4gICAgZGVsdGEgPSBwcm9wO1xuICAgIG1zZyA9IHRtcE1zZztcbiAgfSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzKSB7XG4gICAgZGVsdGEgPSBwcm9wO1xuICAgIHByb3AgPSBudWxsO1xuICB9XG4gIG5ldyBBc3NlcnRpb24oZm4sIG1zZywgYXNzZXJ0LmRlY3JlYXNlc0J5LCB0cnVlKS50by5kZWNyZWFzZShvYmosIHByb3ApLmJ5KGRlbHRhKTtcbn07XG5hc3NlcnQuZG9lc05vdERlY3JlYXNlID0gZnVuY3Rpb24oZm4sIG9iaiwgcHJvcCwgbXNnKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzICYmIHR5cGVvZiBvYmogPT09IFwiZnVuY3Rpb25cIikge1xuICAgIG1zZyA9IHByb3A7XG4gICAgcHJvcCA9IG51bGw7XG4gIH1cbiAgcmV0dXJuIG5ldyBBc3NlcnRpb24oZm4sIG1zZywgYXNzZXJ0LmRvZXNOb3REZWNyZWFzZSwgdHJ1ZSkudG8ubm90LmRlY3JlYXNlKFxuICAgIG9iaixcbiAgICBwcm9wXG4gICk7XG59O1xuYXNzZXJ0LmRvZXNOb3REZWNyZWFzZUJ5ID0gZnVuY3Rpb24oZm4sIG9iaiwgcHJvcCwgZGVsdGEsIG1zZykge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gNCAmJiB0eXBlb2Ygb2JqID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBsZXQgdG1wTXNnID0gZGVsdGE7XG4gICAgZGVsdGEgPSBwcm9wO1xuICAgIG1zZyA9IHRtcE1zZztcbiAgfSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzKSB7XG4gICAgZGVsdGEgPSBwcm9wO1xuICAgIHByb3AgPSBudWxsO1xuICB9XG4gIHJldHVybiBuZXcgQXNzZXJ0aW9uKGZuLCBtc2csIGFzc2VydC5kb2VzTm90RGVjcmVhc2VCeSwgdHJ1ZSkudG8ubm90LmRlY3JlYXNlKG9iaiwgcHJvcCkuYnkoZGVsdGEpO1xufTtcbmFzc2VydC5kZWNyZWFzZXNCdXROb3RCeSA9IGZ1bmN0aW9uKGZuLCBvYmosIHByb3AsIGRlbHRhLCBtc2cpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDQgJiYgdHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgbGV0IHRtcE1zZyA9IGRlbHRhO1xuICAgIGRlbHRhID0gcHJvcDtcbiAgICBtc2cgPSB0bXBNc2c7XG4gIH0gZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMykge1xuICAgIGRlbHRhID0gcHJvcDtcbiAgICBwcm9wID0gbnVsbDtcbiAgfVxuICBuZXcgQXNzZXJ0aW9uKGZuLCBtc2csIGFzc2VydC5kZWNyZWFzZXNCdXROb3RCeSwgdHJ1ZSkudG8uZGVjcmVhc2Uob2JqLCBwcm9wKS5idXQubm90LmJ5KGRlbHRhKTtcbn07XG5hc3NlcnQuaWZFcnJvciA9IGZ1bmN0aW9uKHZhbCkge1xuICBpZiAodmFsKSB7XG4gICAgdGhyb3cgdmFsO1xuICB9XG59O1xuYXNzZXJ0LmlzRXh0ZW5zaWJsZSA9IGZ1bmN0aW9uKG9iaiwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24ob2JqLCBtc2csIGFzc2VydC5pc0V4dGVuc2libGUsIHRydWUpLnRvLmJlLmV4dGVuc2libGU7XG59O1xuYXNzZXJ0LmlzTm90RXh0ZW5zaWJsZSA9IGZ1bmN0aW9uKG9iaiwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24ob2JqLCBtc2csIGFzc2VydC5pc05vdEV4dGVuc2libGUsIHRydWUpLnRvLm5vdC5iZS5leHRlbnNpYmxlO1xufTtcbmFzc2VydC5pc1NlYWxlZCA9IGZ1bmN0aW9uKG9iaiwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24ob2JqLCBtc2csIGFzc2VydC5pc1NlYWxlZCwgdHJ1ZSkudG8uYmUuc2VhbGVkO1xufTtcbmFzc2VydC5pc05vdFNlYWxlZCA9IGZ1bmN0aW9uKG9iaiwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24ob2JqLCBtc2csIGFzc2VydC5pc05vdFNlYWxlZCwgdHJ1ZSkudG8ubm90LmJlLnNlYWxlZDtcbn07XG5hc3NlcnQuaXNGcm96ZW4gPSBmdW5jdGlvbihvYmosIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnLCBhc3NlcnQuaXNGcm96ZW4sIHRydWUpLnRvLmJlLmZyb3plbjtcbn07XG5hc3NlcnQuaXNOb3RGcm96ZW4gPSBmdW5jdGlvbihvYmosIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnLCBhc3NlcnQuaXNOb3RGcm96ZW4sIHRydWUpLnRvLm5vdC5iZS5mcm96ZW47XG59O1xuYXNzZXJ0LmlzRW1wdHkgPSBmdW5jdGlvbih2YWwsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNFbXB0eSwgdHJ1ZSkudG8uYmUuZW1wdHk7XG59O1xuYXNzZXJ0LmlzTm90RW1wdHkgPSBmdW5jdGlvbih2YWwsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNOb3RFbXB0eSwgdHJ1ZSkudG8ubm90LmJlLmVtcHR5O1xufTtcbmFzc2VydC5jb250YWluc1N1YnNldCA9IGZ1bmN0aW9uKHZhbCwgZXhwLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbih2YWwsIG1zZykudG8uY29udGFpblN1YnNldChleHApO1xufTtcbmFzc2VydC5kb2VzTm90Q29udGFpblN1YnNldCA9IGZ1bmN0aW9uKHZhbCwgZXhwLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbih2YWwsIG1zZykudG8ubm90LmNvbnRhaW5TdWJzZXQoZXhwKTtcbn07XG52YXIgYWxpYXNlcyA9IFtcbiAgW1wiaXNPa1wiLCBcIm9rXCJdLFxuICBbXCJpc05vdE9rXCIsIFwibm90T2tcIl0sXG4gIFtcInRocm93c1wiLCBcInRocm93XCJdLFxuICBbXCJ0aHJvd3NcIiwgXCJUaHJvd1wiXSxcbiAgW1wiaXNFeHRlbnNpYmxlXCIsIFwiZXh0ZW5zaWJsZVwiXSxcbiAgW1wiaXNOb3RFeHRlbnNpYmxlXCIsIFwibm90RXh0ZW5zaWJsZVwiXSxcbiAgW1wiaXNTZWFsZWRcIiwgXCJzZWFsZWRcIl0sXG4gIFtcImlzTm90U2VhbGVkXCIsIFwibm90U2VhbGVkXCJdLFxuICBbXCJpc0Zyb3plblwiLCBcImZyb3plblwiXSxcbiAgW1wiaXNOb3RGcm96ZW5cIiwgXCJub3RGcm96ZW5cIl0sXG4gIFtcImlzRW1wdHlcIiwgXCJlbXB0eVwiXSxcbiAgW1wiaXNOb3RFbXB0eVwiLCBcIm5vdEVtcHR5XCJdLFxuICBbXCJpc0NhbGxhYmxlXCIsIFwiaXNGdW5jdGlvblwiXSxcbiAgW1wiaXNOb3RDYWxsYWJsZVwiLCBcImlzTm90RnVuY3Rpb25cIl0sXG4gIFtcImNvbnRhaW5zU3Vic2V0XCIsIFwiY29udGFpblN1YnNldFwiXVxuXTtcbmZvciAoY29uc3QgW25hbWUsIGFzXSBvZiBhbGlhc2VzKSB7XG4gIGFzc2VydFthc10gPSBhc3NlcnRbbmFtZV07XG59XG5cbi8vIGxpYi9jaGFpLmpzXG52YXIgdXNlZCA9IFtdO1xuZnVuY3Rpb24gdXNlKGZuKSB7XG4gIGNvbnN0IGV4cG9ydHMgPSB7XG4gICAgdXNlLFxuICAgIEFzc2VydGlvbkVycm9yLFxuICAgIHV0aWw6IHV0aWxzX2V4cG9ydHMsXG4gICAgY29uZmlnLFxuICAgIGV4cGVjdCxcbiAgICBhc3NlcnQsXG4gICAgQXNzZXJ0aW9uLFxuICAgIC4uLnNob3VsZF9leHBvcnRzXG4gIH07XG4gIGlmICghfnVzZWQuaW5kZXhPZihmbikpIHtcbiAgICBmbihleHBvcnRzLCB1dGlsc19leHBvcnRzKTtcbiAgICB1c2VkLnB1c2goZm4pO1xuICB9XG4gIHJldHVybiBleHBvcnRzO1xufVxuX19uYW1lKHVzZSwgXCJ1c2VcIik7XG5leHBvcnQge1xuICBBc3NlcnRpb24sXG4gIEFzc2VydGlvbkVycm9yLFxuICBTaG91bGQsXG4gIGFzc2VydCxcbiAgY29uZmlnLFxuICBleHBlY3QsXG4gIHNob3VsZCxcbiAgdXNlLFxuICB1dGlsc19leHBvcnRzIGFzIHV0aWxcbn07XG4vKiFcbiAqIENoYWkgLSBmbGFnIHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuLyohXG4gKiBDaGFpIC0gdGVzdCB1dGlsaXR5XG4gKiBDb3B5cmlnaHQoYykgMjAxMi0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cbi8qIVxuICogQ2hhaSAtIGV4cGVjdFR5cGVzIHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuLyohXG4gKiBDaGFpIC0gZ2V0QWN0dWFsIHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuLyohXG4gKiBDaGFpIC0gbWVzc2FnZSBjb21wb3NpdGlvbiB1dGlsaXR5XG4gKiBDb3B5cmlnaHQoYykgMjAxMi0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cbi8qIVxuICogQ2hhaSAtIHRyYW5zZmVyRmxhZ3MgdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG4vKiFcbiAqIGNoYWlcbiAqIGh0dHA6Ly9jaGFpanMuY29tXG4gKiBDb3B5cmlnaHQoYykgMjAxMS0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cbi8qIVxuICogQ2hhaSAtIGlzUHJveHlFbmFibGVkIGhlbHBlclxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG4vKiFcbiAqIENoYWkgLSBhZGRQcm9wZXJ0eSB1dGlsaXR5XG4gKiBDb3B5cmlnaHQoYykgMjAxMi0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cbi8qIVxuICogQ2hhaSAtIGFkZExlbmd0aEd1YXJkIHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuLyohXG4gKiBDaGFpIC0gZ2V0UHJvcGVydGllcyB1dGlsaXR5XG4gKiBDb3B5cmlnaHQoYykgMjAxMi0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cbi8qIVxuICogQ2hhaSAtIHByb3hpZnkgdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG4vKiFcbiAqIENoYWkgLSBhZGRNZXRob2QgdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG4vKiFcbiAqIENoYWkgLSBvdmVyd3JpdGVQcm9wZXJ0eSB1dGlsaXR5XG4gKiBDb3B5cmlnaHQoYykgMjAxMi0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cbi8qIVxuICogQ2hhaSAtIG92ZXJ3cml0ZU1ldGhvZCB1dGlsaXR5XG4gKiBDb3B5cmlnaHQoYykgMjAxMi0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cbi8qIVxuICogQ2hhaSAtIGFkZENoYWluaW5nTWV0aG9kIHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuLyohXG4gKiBDaGFpIC0gb3ZlcndyaXRlQ2hhaW5hYmxlTWV0aG9kIHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuLyohXG4gKiBDaGFpIC0gY29tcGFyZUJ5SW5zcGVjdCB1dGlsaXR5XG4gKiBDb3B5cmlnaHQoYykgMjAxMS0yMDE2IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cbi8qIVxuICogQ2hhaSAtIGdldE93bkVudW1lcmFibGVQcm9wZXJ0eVN5bWJvbHMgdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTEtMjAxNiBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG4vKiFcbiAqIENoYWkgLSBnZXRPd25FbnVtZXJhYmxlUHJvcGVydGllcyB1dGlsaXR5XG4gKiBDb3B5cmlnaHQoYykgMjAxMS0yMDE2IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cbi8qIVxuICogQ2hhaSAtIGlzTmFOIHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTUgU2FrdGhpcHJpeWFuIFZhaXJhbWFuaSA8dGhlY2hhcmdpbmd2b2xjYW5vQGdtYWlsLmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG4vKiFcbiAqIGNoYWlcbiAqIENvcHlyaWdodChjKSAyMDExIEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cbi8qIVxuICogY2hhaVxuICogQ29weXJpZ2h0KGMpIDIwMTEtMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG4vKiEgQnVuZGxlZCBsaWNlbnNlIGluZm9ybWF0aW9uOlxuXG5kZWVwLWVxbC9pbmRleC5qczpcbiAgKCohXG4gICAqIGRlZXAtZXFsXG4gICAqIENvcHlyaWdodChjKSAyMDEzIEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICAgKiBNSVQgTGljZW5zZWRcbiAgICopXG4gICgqIVxuICAgKiBDaGVjayB0byBzZWUgaWYgdGhlIE1lbW9pemVNYXAgaGFzIHJlY29yZGVkIGEgcmVzdWx0IG9mIHRoZSB0d28gb3BlcmFuZHNcbiAgICpcbiAgICogQHBhcmFtIHtNaXhlZH0gbGVmdEhhbmRPcGVyYW5kXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHJpZ2h0SGFuZE9wZXJhbmRcbiAgICogQHBhcmFtIHtNZW1vaXplTWFwfSBtZW1vaXplTWFwXG4gICAqIEByZXR1cm5zIHtCb29sZWFufG51bGx9IHJlc3VsdFxuICAqKVxuICAoKiFcbiAgICogU2V0IHRoZSByZXN1bHQgb2YgdGhlIGVxdWFsaXR5IGludG8gdGhlIE1lbW9pemVNYXBcbiAgICpcbiAgICogQHBhcmFtIHtNaXhlZH0gbGVmdEhhbmRPcGVyYW5kXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHJpZ2h0SGFuZE9wZXJhbmRcbiAgICogQHBhcmFtIHtNZW1vaXplTWFwfSBtZW1vaXplTWFwXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gcmVzdWx0XG4gICopXG4gICgqIVxuICAgKiBQcmltYXJ5IEV4cG9ydFxuICAgKilcbiAgKCohXG4gICAqIFRoZSBtYWluIGxvZ2ljIG9mIHRoZSBgZGVlcEVxdWFsYCBmdW5jdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtNaXhlZH0gbGVmdEhhbmRPcGVyYW5kXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHJpZ2h0SGFuZE9wZXJhbmRcbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAob3B0aW9uYWwpIEFkZGl0aW9uYWwgb3B0aW9uc1xuICAgKiBAcGFyYW0ge0FycmF5fSBbb3B0aW9ucy5jb21wYXJhdG9yXSAob3B0aW9uYWwpIE92ZXJyaWRlIGRlZmF1bHQgYWxnb3JpdGhtLCBkZXRlcm1pbmluZyBjdXN0b20gZXF1YWxpdHkuXG4gICAqIEBwYXJhbSB7QXJyYXl9IFtvcHRpb25zLm1lbW9pemVdIChvcHRpb25hbCkgUHJvdmlkZSBhIGN1c3RvbSBtZW1vaXphdGlvbiBvYmplY3Qgd2hpY2ggd2lsbCBjYWNoZSB0aGUgcmVzdWx0cyBvZlxuICAgICAgY29tcGxleCBvYmplY3RzIGZvciBhIHNwZWVkIGJvb3N0LiBCeSBwYXNzaW5nIGBmYWxzZWAgeW91IGNhbiBkaXNhYmxlIG1lbW9pemF0aW9uLCBidXQgdGhpcyB3aWxsIGNhdXNlIGNpcmN1bGFyXG4gICAgICByZWZlcmVuY2VzIHRvIGJsb3cgdGhlIHN0YWNrLlxuICAgKiBAcmV0dXJuIHtCb29sZWFufSBlcXVhbCBtYXRjaFxuICAqKVxuICAoKiFcbiAgICogQ29tcGFyZSB0d28gUmVndWxhciBFeHByZXNzaW9ucyBmb3IgZXF1YWxpdHkuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVnRXhwfSBsZWZ0SGFuZE9wZXJhbmRcbiAgICogQHBhcmFtIHtSZWdFeHB9IHJpZ2h0SGFuZE9wZXJhbmRcbiAgICogQHJldHVybiB7Qm9vbGVhbn0gcmVzdWx0XG4gICAqKVxuICAoKiFcbiAgICogQ29tcGFyZSB0d28gU2V0cy9NYXBzIGZvciBlcXVhbGl0eS4gRmFzdGVyIHRoYW4gb3RoZXIgZXF1YWxpdHkgZnVuY3Rpb25zLlxuICAgKlxuICAgKiBAcGFyYW0ge1NldH0gbGVmdEhhbmRPcGVyYW5kXG4gICAqIEBwYXJhbSB7U2V0fSByaWdodEhhbmRPcGVyYW5kXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gKE9wdGlvbmFsKVxuICAgKiBAcmV0dXJuIHtCb29sZWFufSByZXN1bHRcbiAgICopXG4gICgqIVxuICAgKiBTaW1wbGUgZXF1YWxpdHkgZm9yIGZsYXQgaXRlcmFibGUgb2JqZWN0cyBzdWNoIGFzIEFycmF5cywgVHlwZWRBcnJheXMgb3IgTm9kZS5qcyBidWZmZXJzLlxuICAgKlxuICAgKiBAcGFyYW0ge0l0ZXJhYmxlfSBsZWZ0SGFuZE9wZXJhbmRcbiAgICogQHBhcmFtIHtJdGVyYWJsZX0gcmlnaHRIYW5kT3BlcmFuZFxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIChPcHRpb25hbClcbiAgICogQHJldHVybiB7Qm9vbGVhbn0gcmVzdWx0XG4gICAqKVxuICAoKiFcbiAgICogU2ltcGxlIGVxdWFsaXR5IGZvciBnZW5lcmF0b3Igb2JqZWN0cyBzdWNoIGFzIHRob3NlIHJldHVybmVkIGJ5IGdlbmVyYXRvciBmdW5jdGlvbnMuXG4gICAqXG4gICAqIEBwYXJhbSB7SXRlcmFibGV9IGxlZnRIYW5kT3BlcmFuZFxuICAgKiBAcGFyYW0ge0l0ZXJhYmxlfSByaWdodEhhbmRPcGVyYW5kXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gKE9wdGlvbmFsKVxuICAgKiBAcmV0dXJuIHtCb29sZWFufSByZXN1bHRcbiAgICopXG4gICgqIVxuICAgKiBEZXRlcm1pbmUgaWYgdGhlIGdpdmVuIG9iamVjdCBoYXMgYW4gQEBpdGVyYXRvciBmdW5jdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHRhcmdldFxuICAgKiBAcmV0dXJuIHtCb29sZWFufSBgdHJ1ZWAgaWYgdGhlIG9iamVjdCBoYXMgYW4gQEBpdGVyYXRvciBmdW5jdGlvbi5cbiAgICopXG4gICgqIVxuICAgKiBHZXRzIGFsbCBpdGVyYXRvciBlbnRyaWVzIGZyb20gdGhlIGdpdmVuIE9iamVjdC4gSWYgdGhlIE9iamVjdCBoYXMgbm8gQEBpdGVyYXRvciBmdW5jdGlvbiwgcmV0dXJucyBhbiBlbXB0eSBhcnJheS5cbiAgICogVGhpcyB3aWxsIGNvbnN1bWUgdGhlIGl0ZXJhdG9yIC0gd2hpY2ggY291bGQgaGF2ZSBzaWRlIGVmZmVjdHMgZGVwZW5kaW5nIG9uIHRoZSBAQGl0ZXJhdG9yIGltcGxlbWVudGF0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XG4gICAqIEByZXR1cm5zIHtBcnJheX0gYW4gYXJyYXkgb2YgZW50cmllcyBmcm9tIHRoZSBAQGl0ZXJhdG9yIGZ1bmN0aW9uXG4gICAqKVxuICAoKiFcbiAgICogR2V0cyBhbGwgZW50cmllcyBmcm9tIGEgR2VuZXJhdG9yLiBUaGlzIHdpbGwgY29uc3VtZSB0aGUgZ2VuZXJhdG9yIC0gd2hpY2ggY291bGQgaGF2ZSBzaWRlIGVmZmVjdHMuXG4gICAqXG4gICAqIEBwYXJhbSB7R2VuZXJhdG9yfSB0YXJnZXRcbiAgICogQHJldHVybnMge0FycmF5fSBhbiBhcnJheSBvZiBlbnRyaWVzIGZyb20gdGhlIEdlbmVyYXRvci5cbiAgICopXG4gICgqIVxuICAgKiBHZXRzIGFsbCBvd24gYW5kIGluaGVyaXRlZCBlbnVtZXJhYmxlIGtleXMgZnJvbSBhIHRhcmdldC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHRhcmdldFxuICAgKiBAcmV0dXJucyB7QXJyYXl9IGFuIGFycmF5IG9mIG93biBhbmQgaW5oZXJpdGVkIGVudW1lcmFibGUga2V5cyBmcm9tIHRoZSB0YXJnZXQuXG4gICAqKVxuICAoKiFcbiAgICogRGV0ZXJtaW5lcyBpZiB0d28gb2JqZWN0cyBoYXZlIG1hdGNoaW5nIHZhbHVlcywgZ2l2ZW4gYSBzZXQgb2Yga2V5cy4gRGVmZXJzIHRvIGRlZXBFcXVhbCBmb3IgdGhlIGVxdWFsaXR5IGNoZWNrIG9mXG4gICAqIGVhY2gga2V5LiBJZiBhbnkgdmFsdWUgb2YgdGhlIGdpdmVuIGtleSBpcyBub3QgZXF1YWwsIHRoZSBmdW5jdGlvbiB3aWxsIHJldHVybiBmYWxzZSAoZWFybHkpLlxuICAgKlxuICAgKiBAcGFyYW0ge01peGVkfSBsZWZ0SGFuZE9wZXJhbmRcbiAgICogQHBhcmFtIHtNaXhlZH0gcmlnaHRIYW5kT3BlcmFuZFxuICAgKiBAcGFyYW0ge0FycmF5fSBrZXlzIEFuIGFycmF5IG9mIGtleXMgdG8gY29tcGFyZSB0aGUgdmFsdWVzIG9mIGxlZnRIYW5kT3BlcmFuZCBhbmQgcmlnaHRIYW5kT3BlcmFuZCBhZ2FpbnN0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gKE9wdGlvbmFsKVxuICAgKiBAcmV0dXJuIHtCb29sZWFufSByZXN1bHRcbiAgICopXG4gICgqIVxuICAgKiBSZWN1cnNpdmVseSBjaGVjayB0aGUgZXF1YWxpdHkgb2YgdHdvIE9iamVjdHMuIE9uY2UgYmFzaWMgc2FtZW5lc3MgaGFzIGJlZW4gZXN0YWJsaXNoZWQgaXQgd2lsbCBkZWZlciB0byBgZGVlcEVxdWFsYFxuICAgKiBmb3IgZWFjaCBlbnVtZXJhYmxlIGtleSBpbiB0aGUgb2JqZWN0LlxuICAgKlxuICAgKiBAcGFyYW0ge01peGVkfSBsZWZ0SGFuZE9wZXJhbmRcbiAgICogQHBhcmFtIHtNaXhlZH0gcmlnaHRIYW5kT3BlcmFuZFxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIChPcHRpb25hbClcbiAgICogQHJldHVybiB7Qm9vbGVhbn0gcmVzdWx0XG4gICAqKVxuICAoKiFcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBhcmd1bWVudCBpcyBhIHByaW1pdGl2ZS5cbiAgICpcbiAgICogVGhpcyBpbnRlbnRpb25hbGx5IHJldHVybnMgdHJ1ZSBmb3IgYWxsIG9iamVjdHMgdGhhdCBjYW4gYmUgY29tcGFyZWQgYnkgcmVmZXJlbmNlLFxuICAgKiBpbmNsdWRpbmcgZnVuY3Rpb25zIGFuZCBzeW1ib2xzLlxuICAgKlxuICAgKiBAcGFyYW0ge01peGVkfSB2YWx1ZVxuICAgKiBAcmV0dXJuIHtCb29sZWFufSByZXN1bHRcbiAgICopXG4qL1xuIiwgImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUNoYXB0ZXIuanMubWFwIiwgImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUNoYXB0ZXJEZXRhaWxzLmpzLm1hcCIsICJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Db29raWUuanMubWFwIiwgImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPURpc2NvdmVyU2VjdGlvbkl0ZW0uanMubWFwIiwgImV4cG9ydCBlbnVtIERpc2NvdmVyU2VjdGlvblR5cGUge1xuICBmZWF0dXJlZCA9IDAsXG4gIHNpbXBsZUNhcm91c2VsID0gMSxcbiAgcHJvbWluZW50Q2Fyb3VzZWwgPSAyLFxuICBjaGFwdGVyVXBkYXRlcyA9IDMsXG4gIGdlbnJlcyA9IDQsXG59XG4iLCAiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9SG9tZVNlY3Rpb24uanMubWFwIiwgImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU1hbmdhSW5mby5qcy5tYXAiLCAiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9TWFuZ2FQcm9ncmVzcy5qcy5tYXAiLCAiZXhwb3J0IGludGVyZmFjZSBQYWdlZFJlc3VsdHM8VD4ge1xuICBpdGVtczogVFtdXG4gIC8vLyBTZXQgdGhpcyB0byB1bmRlZmluZWQgdG8gdGVsbCB0aGUgYXBwIHRoYXQgdGhlcmUgYXJlIG5vIG1vcmUgaXRlbXNcbiAgbWV0YWRhdGE/OiB1bmtub3duXG59XG5cbmV4cG9ydCBjb25zdCBFbmRPZlBhZ2VSZXN1bHRzOiBQYWdlZFJlc3VsdHM8bmV2ZXI+ID0gT2JqZWN0LmZyZWV6ZSh7XG4gIGl0ZW1zOiBbXSxcbiAgbWV0YWRhdGE6IHVuZGVmaW5lZCxcbn0pXG4iLCAiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UEJDYW52YXMuanMubWFwIiwgImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVBCSW1hZ2UuanMubWFwIiwgImltcG9ydCB7IHR5cGUgUmVzcG9uc2UgfSBmcm9tICcuL1Jlc3BvbnNlLmpzJ1xuXG5leHBvcnQgdHlwZSBSZXF1ZXN0ID0ge1xuICB1cmw6IHN0cmluZ1xuICBtZXRob2Q6IHN0cmluZ1xuICBoZWFkZXJzPzogUmVjb3JkPHN0cmluZywgc3RyaW5nPlxuICBib2R5PzogQXJyYXlCdWZmZXIgfCBvYmplY3QgfCBzdHJpbmdcbiAgY29va2llcz86IFJlY29yZDxzdHJpbmcsIHN0cmluZz5cbn1cblxuZXhwb3J0IHR5cGUgUmVxdWVzdEludGVyY2VwdG9yID0gKHJlcXVlc3Q6IFJlcXVlc3QpID0+IFByb21pc2U8UmVxdWVzdD5cblxuLyoqXG4gKiBAcGFyYW0gcHJvcG9zZWRSZXF1ZXN0IFRoZSBgUmVxdWVzdGAgdG8gdGhlIG5ldyBsb2NhdGlvbiBzcGVjaWZpZWQgYnkgdGhlIHJlZGlyZWN0IHJlc3BvbnNlLlxuICogQHBhcmFtIHJlZGlyZWN0ZWRSZXNwb25zZSBUaGUgYFJlc3BvbnNlYCBjb250YWluaW5nIHRoZSBzZXJ2ZXIncyByZXNwb25zZSB0byB0aGUgb3JpZ2luYWwgcmVxdWVzdC5cbiAqIEByZXR1cm5zIFJldHVybiB0aGUgcHJvcG9zZWQgcmVxdWVzdCBvciBhIG1vZGlmaWVkIHJlcXVlc3QgdG8gZm9sbG93IHRoZSByZWRpcmVjdCwgb3IgdW5kZWZpbmVkIHRvIGNhbmNlbCB0aGUgcmVkaXJlY3RcbiAqL1xuZXhwb3J0IHR5cGUgUmVkaXJlY3RIYW5kbGVyID0gKFxuICBwcm9wb3NlZFJlcXVlc3Q6IFJlcXVlc3QsXG4gIHJlZGlyZWN0ZWRSZXNwb25zZTogUmVzcG9uc2VcbikgPT4gUHJvbWlzZTxSZXF1ZXN0IHwgdW5kZWZpbmVkPlxuIiwgImltcG9ydCB7IHR5cGUgUmVxdWVzdCB9IGZyb20gJy4vUmVxdWVzdC5qcydcbmltcG9ydCB7IHR5cGUgQ29va2llIH0gZnJvbSAnLi9Db29raWUuanMnXG5cbmV4cG9ydCB0eXBlIFJlc3BvbnNlID0ge1xuICByZWFkb25seSB1cmw6IHN0cmluZ1xuICByZWFkb25seSBoZWFkZXJzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+XG4gIHJlYWRvbmx5IHN0YXR1czogbnVtYmVyXG4gIHJlYWRvbmx5IG1pbWVUeXBlPzogc3RyaW5nXG5cbiAgLy8vIFRoaXMgaXMgb25seSB0aGUgbmV3IGNvb2tpZXMgc2V0IHZpYSB0aGUgU2V0LUNvb2tpZSBoZWFkZXJcbiAgcmVhZG9ubHkgY29va2llczogQ29va2llW11cbn1cblxuZXhwb3J0IHR5cGUgUmVzcG9uc2VJbnRlcmNlcHRvciA9IChcbiAgcmVxdWVzdDogUmVxdWVzdCxcbiAgcmVzcG9uc2U6IFJlc3BvbnNlLFxuICBkYXRhOiBBcnJheUJ1ZmZlclxuKSA9PiBQcm9taXNlPEFycmF5QnVmZmVyPlxuIiwgImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVNlYXJjaEZpbHRlci5qcy5tYXAiLCAiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U2VhcmNoUXVlcnkuanMubWFwIiwgImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVNlYXJjaFJlc3VsdEl0ZW0uanMubWFwIiwgImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVNvdXJjZU1hbmdhLmpzLm1hcCIsICJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1UYWcuanMubWFwIiwgImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVRhZ1NlY3Rpb24uanMubWFwIiwgImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVRyYWNrZWRNYW5nYUNoYXB0ZXJSZWFkQWN0aW9uLmpzLm1hcCIsICJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Tb3J0aW5nT3B0aW9uLmpzLm1hcCIsICIvKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogR1BMLTMuMC1vci1sYXRlciAqL1xyXG4vKiBDb3B5cmlnaHQgXHUwMEE5IDIwMjUgSW5rZGV4ICovXHJcblxyXG5pbXBvcnQgeyBGb3JtLCBTZWN0aW9uLCB0eXBlIEZvcm1TZWN0aW9uRWxlbWVudCB9IGZyb20gXCJAcGFwZXJiYWNrL3R5cGVzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2V0dGluZ3NGb3JtIGV4dGVuZHMgRm9ybSB7XHJcbiAgb3ZlcnJpZGUgZ2V0U2VjdGlvbnMoKTogRm9ybVNlY3Rpb25FbGVtZW50W10ge1xyXG4gICAgcmV0dXJuIFtcclxuICAgICAgU2VjdGlvbihcImluZm9cIiwgW1xyXG4gICAgICAgIC8vIEFkZCBzZXR0aW5ncyByb3dzIGhlcmUgaWYgbmVlZGVkXHJcbiAgICAgIF0pLFxyXG4gICAgXTtcclxuICB9XHJcbn1cclxuIiwgIi8qIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBHUEwtMy4wLW9yLWxhdGVyICovXHJcbi8qIENvcHlyaWdodCBcdTAwQTkgMjAyNSBJbmtkZXggKi9cclxuXHJcbmltcG9ydCB7IFBhcGVyYmFja0ludGVyY2VwdG9yLCB0eXBlIFJlcXVlc3QsIHR5cGUgUmVzcG9uc2UgfSBmcm9tIFwiQHBhcGVyYmFjay90eXBlc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1haW5JbnRlcmNlcHRvciBleHRlbmRzIFBhcGVyYmFja0ludGVyY2VwdG9yIHtcclxuICBvdmVycmlkZSBhc3luYyBpbnRlcmNlcHRSZXF1ZXN0KHJlcXVlc3Q6IFJlcXVlc3QpOiBQcm9taXNlPFJlcXVlc3Q+IHtcclxuICAgIHJlcXVlc3QuaGVhZGVycyA9IHtcclxuICAgICAgLi4ucmVxdWVzdC5oZWFkZXJzLFxyXG4gICAgICBcIlVzZXItQWdlbnRcIjpcclxuICAgICAgICBcIk1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS8xMjAuMC4wLjAgU2FmYXJpLzUzNy4zNlwiLFxyXG4gICAgICBSZWZlcmVyOiBcImh0dHBzOi8vY29taXgudG8vXCIsXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHJlcXVlc3Q7XHJcbiAgfVxyXG5cclxuICBvdmVycmlkZSBhc3luYyBpbnRlcmNlcHRSZXNwb25zZShcclxuICAgIHJlcXVlc3Q6IFJlcXVlc3QsXHJcbiAgICByZXNwb25zZTogUmVzcG9uc2UsXHJcbiAgICBkYXRhOiBBcnJheUJ1ZmZlcixcclxuICApOiBQcm9taXNlPEFycmF5QnVmZmVyPiB7XHJcbiAgICByZXR1cm4gZGF0YTtcclxuICB9XHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQSxjQUFRLGFBQWE7QUFDckIsY0FBUSxjQUFjO0FBQ3RCLGNBQVEsZ0JBQWdCO0FBRXhCLFVBQUksU0FBUyxDQUFDO0FBQ2QsVUFBSSxZQUFZLENBQUM7QUFDakIsVUFBSSxNQUFNLE9BQU8sZUFBZSxjQUFjLGFBQWE7QUFFM0QsVUFBSSxPQUFPO0FBQ1gsV0FBUyxJQUFJLEdBQUcsTUFBTSxLQUFLLFFBQVEsSUFBSSxLQUFLLEVBQUUsR0FBRztBQUMvQyxlQUFPLENBQUMsSUFBSSxLQUFLLENBQUM7QUFD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LEdBQUcsR0FBRztBQUMvQixrQkFBTSxLQUFLLEdBQUc7QUFBQSxVQUNoQjtBQUFBLFFBQ0YsQ0FBQztBQUVELGVBQU87QUFBQSxVQUNMO0FBQUEsVUFDQTtBQUFBLFFBQ0Y7QUFBQSxNQUNGLFNBQVMsT0FBTztBQUNkLGdCQUFRLE1BQU0sc0NBQXNDLFNBQVMsS0FBSyxLQUFLO0FBQ3ZFLGNBQU07QUFBQSxNQUNSO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7IiwKICAibmFtZXMiOiBbImxlbiIsICJpIiwgImxlbjIiLCAiQnVmZmVyIiwgInRvU3RyaW5nIiwgImluc3BlY3QiLCAiaSIsICJieXRlTGVuZ3RoIiwgImdldE1lc3NhZ2UiLCAidHlwZSIsICJCdWZmZXIiLCAiTm9kZUJ1ZmZlciIsICJzZWNvbmRzU2luY2VMYXN0UmVzZXQiLCAiU291cmNlSW50ZW50cyIsICJDb250ZW50UmF0aW5nIiwgIl9fZGVmUHJvcCIsICJfX2V4cG9ydCIsICJpc05hTjIiLCAiQnVmZmVyIiwgImlzTmFOIiwgIl9hIiwgIkRpc2NvdmVyU2VjdGlvblR5cGUiLCAidXJsIl0KfQo=
