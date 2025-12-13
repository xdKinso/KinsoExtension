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

  // src/ContentTemplate/main.ts
  var main_exports = {};
  __export(main_exports, {
    ContentTemplate: () => ContentTemplate,
    ContentTemplateExtension: () => ContentTemplateExtension
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
  function LabelRow(id, props) {
    return { ...props, id, type: "labelRow", isHidden: props.isHidden ?? false };
  }
  function InputRow(id, props) {
    return { ...props, id, type: "inputRow", isHidden: props.isHidden ?? false };
  }
  function ToggleRow(id, props) {
    return { ...props, id, type: "toggleRow", isHidden: props.isHidden ?? false };
  }
  function ButtonRow(id, props) {
    return { ...props, id, type: "buttonRow", isHidden: props.isHidden ?? false };
  }
  function NavigationRow(id, props) {
    return {
      ...props,
      id,
      type: "navigationRow",
      isHidden: props.isHidden ?? false
    };
  }

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

  // src/ContentTemplate/content.json
  var content_default = [
    {
      titleId: "1",
      primaryTitle: "\u307E\u3060\u307E\u3060\u9060\u3044",
      secondaryTitles: ["Still a long way to go"],
      url: "https://x.com/Dsymobile4999/status/1848129570622275753",
      thumbnailUrl: "https://pbs.twimg.com/media/GaXR8OhaoAAubuJ?format=jpg&name=large",
      synopsis: "Source: https://x.com/Dsymobile4999/status/1848129570622275753",
      contentRating: "EVERYONE",
      status: "Finished",
      author: "\u305F\u3073\u306F\u3071\u306E\u3089\u307E",
      rating: 1,
      genres: ["Art"],
      tags: ["Anime/Manga Style", "Colored", "AI"],
      chapters: [
        {
          chapterId: "1",
          languageCode: "JP",
          chapterNumber: 1,
          volumeNumber: 1,
          pages: ["https://pbs.twimg.com/media/GaXR8OhaoAAubuJ?format=jpg&name=large"]
        }
      ]
    },
    {
      titleId: "2",
      primaryTitle: "\u660E\u65E5\u304C\u4E0D\u5B89",
      secondaryTitles: ["I'm worried about tomorrow"],
      url: "https://x.com/Dsymobile4999/status/1847963474426728804",
      thumbnailUrl: "https://pbs.twimg.com/media/GaSMt0hakAAqdeQ?format=jpg&name=large",
      synopsis: "Source: https://x.com/Dsymobile4999/status/1847963474426728804",
      contentRating: "EVERYONE",
      status: "Finished",
      author: "\u305F\u3073\u306F\u3071\u306E\u3089\u307E",
      rating: 1,
      genres: ["Art"],
      tags: ["Anime/Manga Style", "Colored", "AI"],
      chapters: [
        {
          chapterId: "1",
          languageCode: "JP",
          chapterNumber: 1,
          volumeNumber: 1,
          pages: ["https://pbs.twimg.com/media/GaSMt0hakAAqdeQ?format=jpg&name=large"]
        }
      ]
    },
    {
      titleId: "3",
      primaryTitle: "\u4E18\u306E\u4E0A\u306B\u5BC4\u308A\u9053",
      url: "https://x.com/Dsymobile4999/status/1847903076671508757",
      secondaryTitles: ["Detour to the top of the hill"],
      thumbnailUrl: "https://pbs.twimg.com/media/GaSMk7LbUAAG8sF?format=jpg&name=large",
      synopsis: "Source: https://x.com/Dsymobile4999/status/1847903076671508757",
      contentRating: "EVERYONE",
      status: "Finished",
      author: "\u305F\u3073\u306F\u3071\u306E\u3089\u307E",
      rating: 1,
      genres: ["Art"],
      tags: ["Anime/Manga Style", "Colored", "AI"],
      chapters: [
        {
          chapterId: "1",
          languageCode: "JP",
          chapterNumber: 1,
          volumeNumber: 1,
          pages: ["https://pbs.twimg.com/media/GaSMk7LbUAAG8sF?format=jpg&name=large"]
        }
      ]
    },
    {
      titleId: "4",
      primaryTitle: "\u6797\u6A8E\u306E\u5B63\u7BC0",
      secondaryTitles: ["Apple Season"],
      url: "https://x.com/Dsymobile4999/status/1847827578427445464",
      thumbnailUrl: "https://pbs.twimg.com/media/GaSONzVbUAEohKw?format=jpg&name=large",
      synopsis: "Source: https://x.com/Dsymobile4999/status/1847827578427445464",
      contentRating: "EVERYONE",
      status: "Finished",
      author: "\u305F\u3073\u306F\u3071\u306E\u3089\u307E",
      rating: 1,
      genres: ["Art"],
      tags: ["Anime/Manga Style", "Colored", "AI"],
      chapters: [
        {
          chapterId: "1",
          languageCode: "JP",
          chapterNumber: 1,
          volumeNumber: 1,
          pages: ["https://pbs.twimg.com/media/GaSONzVbUAEohKw?format=jpg&name=large"]
        }
      ]
    },
    {
      titleId: "5",
      primaryTitle: "\u4ECA\u65E5\u306F\u6D1E\u7A9F\u63A2\u691C\u3060",
      secondaryTitles: ["Today we're exploring caves"],
      url: "https://x.com/Dsymobile4999/status/1847767180580180139/photo/1",
      thumbnailUrl: "https://pbs.twimg.com/media/GaSNaI7bcAAPIIP?format=jpg&name=large",
      synopsis: "Source: https://x.com/Dsymobile4999/status/1847767180580180139/photo/1",
      contentRating: "EVERYONE",
      status: "Finished",
      author: "\u305F\u3073\u306F\u3071\u306E\u3089\u307E",
      rating: 1,
      genres: ["Art"],
      tags: ["Anime/Manga Style", "Colored", "AI"],
      chapters: [
        {
          chapterId: "1",
          languageCode: "JP",
          chapterNumber: 1,
          volumeNumber: 1,
          pages: ["https://pbs.twimg.com/media/GaSNaI7bcAAPIIP?format=jpg&name=large"]
        }
      ]
    },
    {
      titleId: "6",
      primaryTitle: "\u30A2\u30DD\u30AF\u30EA\u30D5\u30A1",
      secondaryTitles: ["Apocrypha"],
      url: "https://x.com/Dsymobile4999/status/1847601088234737836",
      thumbnailUrl: "https://pbs.twimg.com/media/GaNGkYsbUAEofEf?format=jpg&name=large",
      synopsis: "Source: https://x.com/Dsymobile4999/status/1847601088234737836",
      contentRating: "EVERYONE",
      status: "Finished",
      author: "\u305F\u3073\u306F\u3071\u306E\u3089\u307E",
      rating: 1,
      genres: ["Art"],
      tags: ["Anime/Manga Style", "Colored", "AI"],
      chapters: [
        {
          chapterId: "1",
          languageCode: "JP",
          chapterNumber: 1,
          volumeNumber: 1,
          pages: ["https://pbs.twimg.com/media/GaNGkYsbUAEofEf?format=jpg&name=large"]
        }
      ]
    },
    {
      titleId: "7",
      primaryTitle: "\u5915\u65E5\u306E\u4E2D\u306E\u5E30\u308A\u9053",
      secondaryTitles: ["On the way home in the sunset"],
      url: "https://x.com/Dsymobile4999/status/1847540689074004141",
      thumbnailUrl: "https://pbs.twimg.com/media/GaNHWwfbUAMbUO2?format=jpg&name=large",
      synopsis: "Source: https://x.com/Dsymobile4999/status/1847540689074004141",
      contentRating: "EVERYONE",
      status: "Finished",
      author: "\u305F\u3073\u306F\u3071\u306E\u3089\u307E",
      rating: 1,
      genres: ["Art"],
      tags: ["Anime/Manga Style", "Colored", "AI"],
      chapters: [
        {
          chapterId: "1",
          languageCode: "JP",
          chapterNumber: 1,
          volumeNumber: 1,
          pages: ["https://pbs.twimg.com/media/GaNHWwfbUAMbUO2?format=jpg&name=large"]
        }
      ]
    },
    {
      titleId: "8",
      primaryTitle: "\u6E2F\u8857\u306E\u5348\u5F8C",
      secondaryTitles: ["Afternoon in the Port City"],
      url: "https://x.com/Dsymobile4999/status/1847465191837225181/photo/1",
      thumbnailUrl: "https://pbs.twimg.com/media/GaNHJmFbUAEWKNr?format=jpg&name=large",
      synopsis: "Source: https://x.com/Dsymobile4999/status/1847465191837225181/photo/1",
      contentRating: "EVERYONE",
      status: "Finished",
      author: "\u305F\u3073\u306F\u3071\u306E\u3089\u307E",
      rating: 1,
      genres: ["Art"],
      tags: ["Anime/Manga Style", "Colored", "AI"],
      chapters: [
        {
          chapterId: "1",
          languageCode: "JP",
          chapterNumber: 1,
          volumeNumber: 1,
          pages: ["https://pbs.twimg.com/media/GaNHJmFbUAEWKNr?format=jpg&name=large"]
        }
      ]
    },
    {
      titleId: "9",
      primaryTitle: "\u732B\u3068\u306E\u4F11\u65E5",
      secondaryTitles: ["Holiday with cats"],
      url: "https://x.com/Dsymobile4999/status/1847404792550998148",
      thumbnailUrl: "https://pbs.twimg.com/media/GaNG3tIbsAALJoF?format=jpg&name=large",
      synopsis: "Source: https://x.com/Dsymobile4999/status/1847404792550998148",
      contentRating: "EVERYONE",
      status: "Finished",
      author: "\u305F\u3073\u306F\u3071\u306E\u3089\u307E",
      rating: 1,
      genres: ["Art"],
      tags: ["Anime/Manga Style", "Colored", "AI"],
      chapters: [
        {
          chapterId: "1",
          languageCode: "JP",
          chapterNumber: 1,
          volumeNumber: 1,
          pages: ["https://pbs.twimg.com/media/GaNG3tIbsAALJoF?format=jpg&name=large"]
        }
      ]
    },
    {
      titleId: "10",
      primaryTitle: "\u591C\u306E\u4E0B\u753A",
      secondaryTitles: ["Downtown at night"],
      url: "https://x.com/Dsymobile4999/status/1847238700855710173",
      thumbnailUrl: "https://pbs.twimg.com/media/GaIG4xSaAAAa681?format=jpg&name=large",
      synopsis: "Source: https://x.com/Dsymobile4999/status/1847238700855710173",
      contentRating: "EVERYONE",
      status: "Finished",
      author: "\u305F\u3073\u306F\u3071\u306E\u3089\u307E",
      rating: 1,
      genres: ["Art"],
      tags: ["Anime/Manga Style", "Colored", "AI"],
      chapters: [
        {
          chapterId: "1",
          languageCode: "JP",
          chapterNumber: 1,
          volumeNumber: 1,
          pages: ["https://pbs.twimg.com/media/GaIG4xSaAAAa681?format=jpg&name=large"]
        }
      ]
    }
  ];

  // src/ContentTemplate/forms.ts
  init_buffer();
  var SettingsForm = class extends Form {
    getSections() {
      return [
        Section("playground", [
          NavigationRow("playground", {
            title: "SourceUI Playground",
            form: new SourceUIPlaygroundForm()
          })
        ])
      ];
    }
  };
  var State = class {
    constructor(form, value) {
      this.form = form;
      __publicField(this, "_value");
      this._value = value;
    }
    get value() {
      return this._value;
    }
    get selector() {
      return Application.Selector(this, "updateValue");
    }
    async updateValue(value) {
      this._value = value;
      this.form.reloadForm();
    }
  };
  var SourceUIPlaygroundForm = class extends Form {
    constructor() {
      super(...arguments);
      __publicField(this, "inputValue", new State(this, ""));
      __publicField(this, "rowsVisible", new State(this, false));
      __publicField(this, "items", []);
    }
    getSections() {
      return [
        Section("hideStuff", [
          ToggleRow("toggle", {
            title: "Toggles can hide rows",
            value: this.rowsVisible.value,
            onValueChange: this.rowsVisible.selector
          })
        ]),
        ...(() => this.rowsVisible.value ? [
          Section("hiddenSection", [
            InputRow("input", {
              title: "Dynamic Input",
              value: this.inputValue.value,
              onValueChange: this.inputValue.selector
            }),
            LabelRow("boundLabel", {
              title: "Bound label to input",
              subtitle: "This label updates with the input",
              value: this.inputValue.value
            })
          ]),
          Section("items", [
            ...this.items.map(
              (item) => LabelRow(item, {
                title: item
              })
            ),
            ButtonRow("addNewItem", {
              title: "Add New Item",
              onSelect: Application.Selector(this, "addNewItem")
            })
          ])
        ] : [])()
      ];
    }
    async addNewItem() {
      this.items.push("Item " + (this.items.length + 1));
      this.reloadForm();
    }
  };

  // src/ContentTemplate/network.ts
  init_buffer();
  var MainInterceptor = class extends PaperbackInterceptor {
    async interceptRequest(request) {
      return request;
    }
    async interceptResponse(request, response, data) {
      void request;
      void response;
      return data;
    }
  };

  // src/ContentTemplate/main.ts
  var ContentTemplateExtension = class {
    constructor() {
      // Implementation of the main rate limiter
      __publicField(this, "mainRateLimiter", new BasicRateLimiter("main", {
        numberOfRequests: 15,
        bufferInterval: 10,
        ignoreImages: true
      }));
      // Implementation of the main interceptor
      __publicField(this, "mainInterceptor", new MainInterceptor("main"));
    }
    // Method from the Extension interface which we implement, initializes the rate limiter, interceptor, discover sections and search filters
    async initialise() {
      this.mainRateLimiter.registerInterceptor();
      this.mainInterceptor.registerInterceptor();
    }
    // Implements the settings form, check SettingsForm.ts for more info
    async getSettingsForm() {
      return new SettingsForm();
    }
    async getDiscoverSections() {
      const discover_section_template1 = {
        id: "discover-section-template1",
        title: "Discover Section Template 1",
        subtitle: "This is a template",
        type: DiscoverSectionType.featured
      };
      const discover_section_template2 = {
        id: "discover-section-template2",
        title: "Discover Section Template 2",
        subtitle: "This is another template",
        type: DiscoverSectionType.prominentCarousel
      };
      const discover_section_template3 = {
        id: "discover-section-template3",
        title: "Discover Section Template 3",
        subtitle: "This is yet another template",
        type: DiscoverSectionType.simpleCarousel
      };
      return [discover_section_template1, discover_section_template2, discover_section_template3];
    }
    // Populates both the discover sections
    async getDiscoverSectionItems(section, metadata) {
      void metadata;
      let i = 0;
      let j = 1;
      let type3;
      switch (section.id) {
        case "discover-section-template1":
          j = 2;
          type3 = "featuredCarouselItem";
          break;
        case "discover-section-template2":
          i = content_default.length / 2;
          j = 2;
          type3 = "prominentCarouselItem";
          break;
        case "discover-section-template3":
          type3 = "simpleCarouselItem";
          break;
      }
      return {
        items: Array.from(Array(content_default.length / j)).map(() => {
          const result = {
            mangaId: content_default[i]?.titleId,
            title: content_default[i]?.primaryTitle ? content_default[i]?.primaryTitle : "Unknown Title",
            subtitle: content_default[i]?.secondaryTitles[0],
            imageUrl: content_default[i]?.thumbnailUrl ? content_default[i]?.thumbnailUrl : "",
            type: type3
          };
          ++i;
          return result;
        })
      };
    }
    // Populate search filters
    async getSearchFilters() {
      return [
        {
          id: "search-filter-template",
          type: "dropdown",
          options: [
            { id: "include", value: "include" },
            { id: "exclude", value: "exclude" }
          ],
          value: "Exclude",
          title: "Search Filter Template"
        }
      ];
    }
    // Populates search
    async getSearchResults(query, metadata) {
      void metadata;
      const results = { items: [] };
      for (let i = 0; i < content_default.length; i++) {
        const manga = content_default[i];
        if (!manga) continue;
        if (manga.primaryTitle.toLowerCase().indexOf(query.title.toLowerCase()) != -1 && query.filters[0]?.value == "include" || manga.primaryTitle.toLowerCase().indexOf(query.title.toLowerCase()) == -1 && query.filters[0]?.value == "exclude") {
          if (manga.titleId) {
            const result = {
              mangaId: manga.titleId,
              title: manga.primaryTitle ? manga.primaryTitle : "Unknown Title",
              subtitle: manga.secondaryTitles[0] ?? "",
              imageUrl: manga.thumbnailUrl ? manga.thumbnailUrl : ""
            };
            results.items.push(result);
          }
        } else {
          for (let j = 0; j < manga.secondaryTitles.length; j++) {
            const secondaryTitles = manga.secondaryTitles[j];
            if (!secondaryTitles) continue;
            if (secondaryTitles.toLowerCase().indexOf(query.title.toLowerCase()) != -1 && query.filters[0]?.value == "include" || secondaryTitles.toLowerCase().indexOf(query.title.toLowerCase()) == -1 && query.filters[0]?.value == "exclude") {
              if (manga.titleId) {
                const result = {
                  mangaId: manga.titleId,
                  title: manga.primaryTitle ? manga.primaryTitle : "Unknown Title",
                  subtitle: manga.secondaryTitles[0] ?? "",
                  imageUrl: manga.thumbnailUrl ? manga.thumbnailUrl : ""
                };
                results.items.push(result);
              }
              break;
            }
          }
        }
      }
      return results;
    }
    // Populates the title details
    async getMangaDetails(mangaId) {
      for (let i = 0; i < content_default.length; i++) {
        const manga = content_default[i];
        if (!manga) continue;
        if (mangaId == manga.titleId) {
          let contentRating;
          switch (manga.contentRating) {
            case "ADULT":
              contentRating = ContentRating.ADULT;
              break;
            case "MATURE":
              contentRating = ContentRating.MATURE;
              break;
            default:
              contentRating = ContentRating.EVERYONE;
              break;
          }
          const genres = {
            id: "genres",
            title: "Genres",
            tags: []
          };
          for (let j = 0; j < manga.genres.length; j++) {
            const genre = manga.genres[j];
            if (!genre) continue;
            const tagItem = {
              id: genre.toLowerCase().replace(" ", "-"),
              title: genre
            };
            genres.tags.push(tagItem);
          }
          const tags = {
            id: "tags",
            title: "Tags",
            tags: []
          };
          for (let j = 0; j < manga.tags.length; j++) {
            const tag = manga.tags[j];
            if (!tag) continue;
            const tagItem = {
              id: tag.toLowerCase().replace(" ", "-"),
              title: tag
            };
            tags.tags.push(tagItem);
          }
          return {
            mangaId,
            mangaInfo: {
              thumbnailUrl: manga.thumbnailUrl ? manga.thumbnailUrl : "",
              synopsis: manga.synopsis ? manga.synopsis : "No synopsis.",
              primaryTitle: manga.primaryTitle ? manga.primaryTitle : "Unknown Title",
              secondaryTitles: manga.secondaryTitles ? manga.secondaryTitles : [],
              contentRating,
              status: manga.status,
              author: manga.author,
              rating: manga.rating,
              tagGroups: [genres, tags],
              artworkUrls: [manga.thumbnailUrl],
              shareUrl: manga.url
            }
          };
        }
      }
      throw new Error("No title with this id exists");
    }
    // Populates the chapter list
    async getChapters(sourceManga, sinceDate) {
      void sinceDate;
      for (let i = 0; i < content_default.length; i++) {
        const manga = content_default[i];
        if (!manga) continue;
        if (sourceManga.mangaId == manga.titleId) {
          const chapters = [];
          for (let j = 0; j < manga.chapters.length; j++) {
            const chaptersData = manga.chapters[j];
            if (!chaptersData) continue;
            if (chaptersData.chapterId) {
              const chapter = {
                chapterId: chaptersData.chapterId,
                sourceManga,
                langCode: chaptersData.languageCode ? chaptersData.languageCode : "EN",
                chapNum: chaptersData.chapterNumber ? chaptersData.chapterNumber : j + 1,
                title: manga.primaryTitle,
                volume: chaptersData.volumeNumber
              };
              chapters.push(chapter);
            }
          }
          return chapters;
        }
      }
      throw new Error("No title with this id exists");
    }
    // Populates a chapter with images
    async getChapterDetails(chapter) {
      for (let i = 0; i < content_default.length; i++) {
        const manga = content_default[i];
        if (!manga) continue;
        if (chapter.sourceManga.mangaId == manga.titleId) {
          for (let j = 0; j < manga.chapters.length; j++) {
            const chapterData = manga.chapters[j];
            if (!chapterData) continue;
            if (chapter.chapterId == chapterData.chapterId) {
              const chapterDetails = {
                id: chapter.chapterId,
                mangaId: chapter.sourceManga.mangaId,
                pages: chapterData.pages
              };
              return chapterDetails;
            }
          }
          throw new Error("No chapter with this id exists");
        }
      }
      throw new Error("No title with this id exists");
    }
  };
  var ContentTemplate = new ContentTemplateExtension();
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9pbmRleC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvaWVlZTc1NC9pbmRleC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3Rvb2xjaGFpbi9saWIvc2hpbXMvYnVmZmVyLmpzIiwgIi4uLy4uL3NyYy9Db250ZW50VGVtcGxhdGUvbWFpbi50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9zcmMvaW5kZXgudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BwYXBlcmJhY2svdHlwZXMvc3JjL2ltcGwvaW5kZXgudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BwYXBlcmJhY2svdHlwZXMvc3JjL2ltcGwvU2V0dGluZ3NVSS9pbmRleC50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9zcmMvaW1wbC9TZXR0aW5nc1VJL0Zvcm0udHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BwYXBlcmJhY2svdHlwZXMvc3JjL2ltcGwvU2V0dGluZ3NVSS9Gb3JtSXRlbUVsZW1lbnQudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BwYXBlcmJhY2svdHlwZXMvc3JjL2ltcGwvU2V0dGluZ3NVSS9Gb3JtU2VjdGlvbi50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9zcmMvaW1wbC9pbnRlcmZhY2VzL2luZGV4LnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3R5cGVzL3NyYy9pbXBsL2ludGVyZmFjZXMvQ2hhcHRlclByb3ZpZGluZy50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9saWIvaW1wbC9pbnRlcmZhY2VzL0Nsb3VkZmxhcmVCeXBhc3NSZXF1ZXN0UHJvdmlkaW5nLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3R5cGVzL2xpYi9pbXBsL2ludGVyZmFjZXMvRGlzY292ZXJTZWN0aW9uUHJvdmlkaW5nLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3R5cGVzL2xpYi9pbXBsL2ludGVyZmFjZXMvTWFuYWdlZENvbGxlY3Rpb25Qcm92aWRpbmcuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BwYXBlcmJhY2svdHlwZXMvc3JjL2ltcGwvaW50ZXJmYWNlcy9NYW5nYVByb2dyZXNzUHJvdmlkaW5nLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3R5cGVzL2xpYi9pbXBsL2ludGVyZmFjZXMvTWFuZ2FQcm92aWRpbmcuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BwYXBlcmJhY2svdHlwZXMvc3JjL2ltcGwvaW50ZXJmYWNlcy9TZWFyY2hSZXN1bHRzUHJvdmlkaW5nLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3R5cGVzL2xpYi9pbXBsL2ludGVyZmFjZXMvU2V0dGluZ3NGb3JtUHJvdmlkaW5nLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3R5cGVzL2xpYi9pbXBsL0FwcGxpY2F0aW9uLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3R5cGVzL3NyYy9pbXBsL1BhcGVyYmFja0ludGVyY2VwdG9yLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3R5cGVzL2xpYi9pbXBsL1NlbGVjdG9yLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3R5cGVzL2xpYi9pbXBsL0V4dGVuc2lvbi5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9zcmMvaW1wbC9CYXNpY1JhdGVMaW1pdGVyLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3R5cGVzL3NyYy9pbXBsL0xvY2sudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BwYXBlcmJhY2svdHlwZXMvc3JjL2ltcGwvQ2xvdWRmbGFyZUVycm9yLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3R5cGVzL3NyYy9pbXBsL0Nvb2tpZVN0b3JhZ2VJbnRlcmNlcHRvci50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9zcmMvaW1wbC9VUkwudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BwYXBlcmJhY2svdHlwZXMvc3JjL2ltcGwvVGVzdERlZmluaXRpb24udHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BwYXBlcmJhY2svdHlwZXMvc3JjL2ltcGwvU291cmNlSW5mby50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvY2hhaS9pbmRleC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9saWIvQ2hhcHRlci5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9saWIvQ2hhcHRlckRldGFpbHMuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BwYXBlcmJhY2svdHlwZXMvbGliL0Nvb2tpZS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9saWIvRGlzY292ZXJTZWN0aW9uSXRlbS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9zcmMvRGlzY292ZXJTZWN0aW9uVHlwZS50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9saWIvSG9tZVNlY3Rpb24uanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BwYXBlcmJhY2svdHlwZXMvbGliL01hbmdhSW5mby5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9saWIvTWFuZ2FQcm9ncmVzcy5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9zcmMvUGFnZWRSZXN1bHRzLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3R5cGVzL2xpYi9QQkNhbnZhcy5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9saWIvUEJJbWFnZS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9zcmMvUmVxdWVzdC50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9zcmMvUmVzcG9uc2UudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BwYXBlcmJhY2svdHlwZXMvbGliL1NlYXJjaEZpbHRlci5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9saWIvU2VhcmNoUXVlcnkuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BwYXBlcmJhY2svdHlwZXMvbGliL1NlYXJjaFJlc3VsdEl0ZW0uanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BwYXBlcmJhY2svdHlwZXMvbGliL1NvdXJjZU1hbmdhLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3R5cGVzL2xpYi9UYWcuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BwYXBlcmJhY2svdHlwZXMvbGliL1RhZ1NlY3Rpb24uanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BwYXBlcmJhY2svdHlwZXMvbGliL1RyYWNrZWRNYW5nYUNoYXB0ZXJSZWFkQWN0aW9uLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3R5cGVzL2xpYi9Tb3J0aW5nT3B0aW9uLmpzIiwgIi4uLy4uL3NyYy9Db250ZW50VGVtcGxhdGUvY29udGVudC5qc29uIiwgIi4uLy4uL3NyYy9Db250ZW50VGVtcGxhdGUvZm9ybXMudHMiLCAiLi4vLi4vc3JjL0NvbnRlbnRUZW1wbGF0ZS9uZXR3b3JrLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIndXNlIHN0cmljdCdcblxuZXhwb3J0cy5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuZXhwb3J0cy50b0J5dGVBcnJheSA9IHRvQnl0ZUFycmF5XG5leHBvcnRzLmZyb21CeXRlQXJyYXkgPSBmcm9tQnl0ZUFycmF5XG5cbnZhciBsb29rdXAgPSBbXVxudmFyIHJldkxvb2t1cCA9IFtdXG52YXIgQXJyID0gdHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnID8gVWludDhBcnJheSA6IEFycmF5XG5cbnZhciBjb2RlID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nXG5mb3IgKHZhciBpID0gMCwgbGVuID0gY29kZS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICBsb29rdXBbaV0gPSBjb2RlW2ldXG4gIHJldkxvb2t1cFtjb2RlLmNoYXJDb2RlQXQoaSldID0gaVxufVxuXG4vLyBTdXBwb3J0IGRlY29kaW5nIFVSTC1zYWZlIGJhc2U2NCBzdHJpbmdzLCBhcyBOb2RlLmpzIGRvZXMuXG4vLyBTZWU6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Jhc2U2NCNVUkxfYXBwbGljYXRpb25zXG5yZXZMb29rdXBbJy0nLmNoYXJDb2RlQXQoMCldID0gNjJcbnJldkxvb2t1cFsnXycuY2hhckNvZGVBdCgwKV0gPSA2M1xuXG5mdW5jdGlvbiBnZXRMZW5zIChiNjQpIHtcbiAgdmFyIGxlbiA9IGI2NC5sZW5ndGhcblxuICBpZiAobGVuICUgNCA+IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3RyaW5nLiBMZW5ndGggbXVzdCBiZSBhIG11bHRpcGxlIG9mIDQnKVxuICB9XG5cbiAgLy8gVHJpbSBvZmYgZXh0cmEgYnl0ZXMgYWZ0ZXIgcGxhY2Vob2xkZXIgYnl0ZXMgYXJlIGZvdW5kXG4gIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2JlYXRnYW1taXQvYmFzZTY0LWpzL2lzc3Vlcy80MlxuICB2YXIgdmFsaWRMZW4gPSBiNjQuaW5kZXhPZignPScpXG4gIGlmICh2YWxpZExlbiA9PT0gLTEpIHZhbGlkTGVuID0gbGVuXG5cbiAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IHZhbGlkTGVuID09PSBsZW5cbiAgICA/IDBcbiAgICA6IDQgLSAodmFsaWRMZW4gJSA0KVxuXG4gIHJldHVybiBbdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbl1cbn1cblxuLy8gYmFzZTY0IGlzIDQvMyArIHVwIHRvIHR3byBjaGFyYWN0ZXJzIG9mIHRoZSBvcmlnaW5hbCBkYXRhXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChiNjQpIHtcbiAgdmFyIGxlbnMgPSBnZXRMZW5zKGI2NClcbiAgdmFyIHZhbGlkTGVuID0gbGVuc1swXVxuICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gbGVuc1sxXVxuICByZXR1cm4gKCh2YWxpZExlbiArIHBsYWNlSG9sZGVyc0xlbikgKiAzIC8gNCkgLSBwbGFjZUhvbGRlcnNMZW5cbn1cblxuZnVuY3Rpb24gX2J5dGVMZW5ndGggKGI2NCwgdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbikge1xuICByZXR1cm4gKCh2YWxpZExlbiArIHBsYWNlSG9sZGVyc0xlbikgKiAzIC8gNCkgLSBwbGFjZUhvbGRlcnNMZW5cbn1cblxuZnVuY3Rpb24gdG9CeXRlQXJyYXkgKGI2NCkge1xuICB2YXIgdG1wXG4gIHZhciBsZW5zID0gZ2V0TGVucyhiNjQpXG4gIHZhciB2YWxpZExlbiA9IGxlbnNbMF1cbiAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IGxlbnNbMV1cblxuICB2YXIgYXJyID0gbmV3IEFycihfYnl0ZUxlbmd0aChiNjQsIHZhbGlkTGVuLCBwbGFjZUhvbGRlcnNMZW4pKVxuXG4gIHZhciBjdXJCeXRlID0gMFxuXG4gIC8vIGlmIHRoZXJlIGFyZSBwbGFjZWhvbGRlcnMsIG9ubHkgZ2V0IHVwIHRvIHRoZSBsYXN0IGNvbXBsZXRlIDQgY2hhcnNcbiAgdmFyIGxlbiA9IHBsYWNlSG9sZGVyc0xlbiA+IDBcbiAgICA/IHZhbGlkTGVuIC0gNFxuICAgIDogdmFsaWRMZW5cblxuICB2YXIgaVxuICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpICs9IDQpIHtcbiAgICB0bXAgPVxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMTgpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCAxMikgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildIDw8IDYpIHxcbiAgICAgIHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMyldXG4gICAgYXJyW2N1ckJ5dGUrK10gPSAodG1wID4+IDE2KSAmIDB4RkZcbiAgICBhcnJbY3VyQnl0ZSsrXSA9ICh0bXAgPj4gOCkgJiAweEZGXG4gICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICBpZiAocGxhY2VIb2xkZXJzTGVuID09PSAyKSB7XG4gICAgdG1wID1cbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDIpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA+PiA0KVxuICAgIGFycltjdXJCeXRlKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgaWYgKHBsYWNlSG9sZGVyc0xlbiA9PT0gMSkge1xuICAgIHRtcCA9XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAxMCkgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDQpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDIpXSA+PiAyKVxuICAgIGFycltjdXJCeXRlKytdID0gKHRtcCA+PiA4KSAmIDB4RkZcbiAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBhcnJcbn1cblxuZnVuY3Rpb24gdHJpcGxldFRvQmFzZTY0IChudW0pIHtcbiAgcmV0dXJuIGxvb2t1cFtudW0gPj4gMTggJiAweDNGXSArXG4gICAgbG9va3VwW251bSA+PiAxMiAmIDB4M0ZdICtcbiAgICBsb29rdXBbbnVtID4+IDYgJiAweDNGXSArXG4gICAgbG9va3VwW251bSAmIDB4M0ZdXG59XG5cbmZ1bmN0aW9uIGVuY29kZUNodW5rICh1aW50OCwgc3RhcnQsIGVuZCkge1xuICB2YXIgdG1wXG4gIHZhciBvdXRwdXQgPSBbXVxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkgKz0gMykge1xuICAgIHRtcCA9XG4gICAgICAoKHVpbnQ4W2ldIDw8IDE2KSAmIDB4RkYwMDAwKSArXG4gICAgICAoKHVpbnQ4W2kgKyAxXSA8PCA4KSAmIDB4RkYwMCkgK1xuICAgICAgKHVpbnQ4W2kgKyAyXSAmIDB4RkYpXG4gICAgb3V0cHV0LnB1c2godHJpcGxldFRvQmFzZTY0KHRtcCkpXG4gIH1cbiAgcmV0dXJuIG91dHB1dC5qb2luKCcnKVxufVxuXG5mdW5jdGlvbiBmcm9tQnl0ZUFycmF5ICh1aW50OCkge1xuICB2YXIgdG1wXG4gIHZhciBsZW4gPSB1aW50OC5sZW5ndGhcbiAgdmFyIGV4dHJhQnl0ZXMgPSBsZW4gJSAzIC8vIGlmIHdlIGhhdmUgMSBieXRlIGxlZnQsIHBhZCAyIGJ5dGVzXG4gIHZhciBwYXJ0cyA9IFtdXG4gIHZhciBtYXhDaHVua0xlbmd0aCA9IDE2MzgzIC8vIG11c3QgYmUgbXVsdGlwbGUgb2YgM1xuXG4gIC8vIGdvIHRocm91Z2ggdGhlIGFycmF5IGV2ZXJ5IHRocmVlIGJ5dGVzLCB3ZSdsbCBkZWFsIHdpdGggdHJhaWxpbmcgc3R1ZmYgbGF0ZXJcbiAgZm9yICh2YXIgaSA9IDAsIGxlbjIgPSBsZW4gLSBleHRyYUJ5dGVzOyBpIDwgbGVuMjsgaSArPSBtYXhDaHVua0xlbmd0aCkge1xuICAgIHBhcnRzLnB1c2goZW5jb2RlQ2h1bmsodWludDgsIGksIChpICsgbWF4Q2h1bmtMZW5ndGgpID4gbGVuMiA/IGxlbjIgOiAoaSArIG1heENodW5rTGVuZ3RoKSkpXG4gIH1cblxuICAvLyBwYWQgdGhlIGVuZCB3aXRoIHplcm9zLCBidXQgbWFrZSBzdXJlIHRvIG5vdCBmb3JnZXQgdGhlIGV4dHJhIGJ5dGVzXG4gIGlmIChleHRyYUJ5dGVzID09PSAxKSB7XG4gICAgdG1wID0gdWludDhbbGVuIC0gMV1cbiAgICBwYXJ0cy5wdXNoKFxuICAgICAgbG9va3VwW3RtcCA+PiAyXSArXG4gICAgICBsb29rdXBbKHRtcCA8PCA0KSAmIDB4M0ZdICtcbiAgICAgICc9PSdcbiAgICApXG4gIH0gZWxzZSBpZiAoZXh0cmFCeXRlcyA9PT0gMikge1xuICAgIHRtcCA9ICh1aW50OFtsZW4gLSAyXSA8PCA4KSArIHVpbnQ4W2xlbiAtIDFdXG4gICAgcGFydHMucHVzaChcbiAgICAgIGxvb2t1cFt0bXAgPj4gMTBdICtcbiAgICAgIGxvb2t1cFsodG1wID4+IDQpICYgMHgzRl0gK1xuICAgICAgbG9va3VwWyh0bXAgPDwgMikgJiAweDNGXSArXG4gICAgICAnPSdcbiAgICApXG4gIH1cblxuICByZXR1cm4gcGFydHMuam9pbignJylcbn1cbiIsICIvKiEgaWVlZTc1NC4gQlNELTMtQ2xhdXNlIExpY2Vuc2UuIEZlcm9zcyBBYm91a2hhZGlqZWggPGh0dHBzOi8vZmVyb3NzLm9yZy9vcGVuc291cmNlPiAqL1xuZXhwb3J0cy5yZWFkID0gZnVuY3Rpb24gKGJ1ZmZlciwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG1cbiAgdmFyIGVMZW4gPSAobkJ5dGVzICogOCkgLSBtTGVuIC0gMVxuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMVxuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDFcbiAgdmFyIG5CaXRzID0gLTdcbiAgdmFyIGkgPSBpc0xFID8gKG5CeXRlcyAtIDEpIDogMFxuICB2YXIgZCA9IGlzTEUgPyAtMSA6IDFcbiAgdmFyIHMgPSBidWZmZXJbb2Zmc2V0ICsgaV1cblxuICBpICs9IGRcblxuICBlID0gcyAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBzID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBlTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IGUgPSAoZSAqIDI1NikgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBtID0gZSAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBlID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBtTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IG0gPSAobSAqIDI1NikgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBpZiAoZSA9PT0gMCkge1xuICAgIGUgPSAxIC0gZUJpYXNcbiAgfSBlbHNlIGlmIChlID09PSBlTWF4KSB7XG4gICAgcmV0dXJuIG0gPyBOYU4gOiAoKHMgPyAtMSA6IDEpICogSW5maW5pdHkpXG4gIH0gZWxzZSB7XG4gICAgbSA9IG0gKyBNYXRoLnBvdygyLCBtTGVuKVxuICAgIGUgPSBlIC0gZUJpYXNcbiAgfVxuICByZXR1cm4gKHMgPyAtMSA6IDEpICogbSAqIE1hdGgucG93KDIsIGUgLSBtTGVuKVxufVxuXG5leHBvcnRzLndyaXRlID0gZnVuY3Rpb24gKGJ1ZmZlciwgdmFsdWUsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtLCBjXG4gIHZhciBlTGVuID0gKG5CeXRlcyAqIDgpIC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBydCA9IChtTGVuID09PSAyMyA/IE1hdGgucG93KDIsIC0yNCkgLSBNYXRoLnBvdygyLCAtNzcpIDogMClcbiAgdmFyIGkgPSBpc0xFID8gMCA6IChuQnl0ZXMgLSAxKVxuICB2YXIgZCA9IGlzTEUgPyAxIDogLTFcbiAgdmFyIHMgPSB2YWx1ZSA8IDAgfHwgKHZhbHVlID09PSAwICYmIDEgLyB2YWx1ZSA8IDApID8gMSA6IDBcblxuICB2YWx1ZSA9IE1hdGguYWJzKHZhbHVlKVxuXG4gIGlmIChpc05hTih2YWx1ZSkgfHwgdmFsdWUgPT09IEluZmluaXR5KSB7XG4gICAgbSA9IGlzTmFOKHZhbHVlKSA/IDEgOiAwXG4gICAgZSA9IGVNYXhcbiAgfSBlbHNlIHtcbiAgICBlID0gTWF0aC5mbG9vcihNYXRoLmxvZyh2YWx1ZSkgLyBNYXRoLkxOMilcbiAgICBpZiAodmFsdWUgKiAoYyA9IE1hdGgucG93KDIsIC1lKSkgPCAxKSB7XG4gICAgICBlLS1cbiAgICAgIGMgKj0gMlxuICAgIH1cbiAgICBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIHZhbHVlICs9IHJ0IC8gY1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSArPSBydCAqIE1hdGgucG93KDIsIDEgLSBlQmlhcylcbiAgICB9XG4gICAgaWYgKHZhbHVlICogYyA+PSAyKSB7XG4gICAgICBlKytcbiAgICAgIGMgLz0gMlxuICAgIH1cblxuICAgIGlmIChlICsgZUJpYXMgPj0gZU1heCkge1xuICAgICAgbSA9IDBcbiAgICAgIGUgPSBlTWF4XG4gICAgfSBlbHNlIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgbSA9ICgodmFsdWUgKiBjKSAtIDEpICogTWF0aC5wb3coMiwgbUxlbilcbiAgICAgIGUgPSBlICsgZUJpYXNcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IHZhbHVlICogTWF0aC5wb3coMiwgZUJpYXMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pXG4gICAgICBlID0gMFxuICAgIH1cbiAgfVxuXG4gIGZvciAoOyBtTGVuID49IDg7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IG0gJiAweGZmLCBpICs9IGQsIG0gLz0gMjU2LCBtTGVuIC09IDgpIHt9XG5cbiAgZSA9IChlIDw8IG1MZW4pIHwgbVxuICBlTGVuICs9IG1MZW5cbiAgZm9yICg7IGVMZW4gPiAwOyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBlICYgMHhmZiwgaSArPSBkLCBlIC89IDI1NiwgZUxlbiAtPSA4KSB7fVxuXG4gIGJ1ZmZlcltvZmZzZXQgKyBpIC0gZF0gfD0gcyAqIDEyOFxufVxuIiwgIi8qIVxuICogVGhlIGJ1ZmZlciBtb2R1bGUgZnJvbSBub2RlLmpzLCBmb3IgdGhlIGJyb3dzZXIuXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGh0dHBzOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cblxuJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGJhc2U2NCA9IHJlcXVpcmUoJ2Jhc2U2NC1qcycpXG5jb25zdCBpZWVlNzU0ID0gcmVxdWlyZSgnaWVlZTc1NCcpXG5jb25zdCBjdXN0b21JbnNwZWN0U3ltYm9sID1cbiAgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFN5bWJvbFsnZm9yJ10gPT09ICdmdW5jdGlvbicpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZG90LW5vdGF0aW9uXG4gICAgPyBTeW1ib2xbJ2ZvciddKCdub2RlanMudXRpbC5pbnNwZWN0LmN1c3RvbScpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZG90LW5vdGF0aW9uXG4gICAgOiBudWxsXG5cbmV4cG9ydHMuQnVmZmVyID0gQnVmZmVyXG5leHBvcnRzLlNsb3dCdWZmZXIgPSBTbG93QnVmZmVyXG5leHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTID0gNTBcblxuY29uc3QgS19NQVhfTEVOR1RIID0gMHg3ZmZmZmZmZlxuZXhwb3J0cy5rTWF4TGVuZ3RoID0gS19NQVhfTEVOR1RIXG5cbi8qKlxuICogSWYgYEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUYDpcbiAqICAgPT09IHRydWUgICAgVXNlIFVpbnQ4QXJyYXkgaW1wbGVtZW50YXRpb24gKGZhc3Rlc3QpXG4gKiAgID09PSBmYWxzZSAgIFByaW50IHdhcm5pbmcgYW5kIHJlY29tbWVuZCB1c2luZyBgYnVmZmVyYCB2NC54IHdoaWNoIGhhcyBhbiBPYmplY3RcbiAqICAgICAgICAgICAgICAgaW1wbGVtZW50YXRpb24gKG1vc3QgY29tcGF0aWJsZSwgZXZlbiBJRTYpXG4gKlxuICogQnJvd3NlcnMgdGhhdCBzdXBwb3J0IHR5cGVkIGFycmF5cyBhcmUgSUUgMTArLCBGaXJlZm94IDQrLCBDaHJvbWUgNyssIFNhZmFyaSA1LjErLFxuICogT3BlcmEgMTEuNissIGlPUyA0LjIrLlxuICpcbiAqIFdlIHJlcG9ydCB0aGF0IHRoZSBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdHlwZWQgYXJyYXlzIGlmIHRoZSBhcmUgbm90IHN1YmNsYXNzYWJsZVxuICogdXNpbmcgX19wcm90b19fLiBGaXJlZm94IDQtMjkgbGFja3Mgc3VwcG9ydCBmb3IgYWRkaW5nIG5ldyBwcm9wZXJ0aWVzIHRvIGBVaW50OEFycmF5YFxuICogKFNlZTogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9Njk1NDM4KS4gSUUgMTAgbGFja3Mgc3VwcG9ydFxuICogZm9yIF9fcHJvdG9fXyBhbmQgaGFzIGEgYnVnZ3kgdHlwZWQgYXJyYXkgaW1wbGVtZW50YXRpb24uXG4gKi9cbkJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUID0gdHlwZWRBcnJheVN1cHBvcnQoKVxuXG5pZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHR5cGVvZiBjb25zb2xlLmVycm9yID09PSAnZnVuY3Rpb24nKSB7XG4gIGNvbnNvbGUuZXJyb3IoXG4gICAgJ1RoaXMgYnJvd3NlciBsYWNrcyB0eXBlZCBhcnJheSAoVWludDhBcnJheSkgc3VwcG9ydCB3aGljaCBpcyByZXF1aXJlZCBieSAnICtcbiAgICAnYGJ1ZmZlcmAgdjUueC4gVXNlIGBidWZmZXJgIHY0LnggaWYgeW91IHJlcXVpcmUgb2xkIGJyb3dzZXIgc3VwcG9ydC4nXG4gIClcbn1cblxuZnVuY3Rpb24gdHlwZWRBcnJheVN1cHBvcnQgKCkge1xuICAvLyBDYW4gdHlwZWQgYXJyYXkgaW5zdGFuY2VzIGNhbiBiZSBhdWdtZW50ZWQ/XG4gIHRyeSB7XG4gICAgY29uc3QgYXJyID0gbmV3IFVpbnQ4QXJyYXkoMSlcbiAgICBjb25zdCBwcm90byA9IHsgZm9vOiBmdW5jdGlvbiAoKSB7IHJldHVybiA0MiB9IH1cbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YocHJvdG8sIFVpbnQ4QXJyYXkucHJvdG90eXBlKVxuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihhcnIsIHByb3RvKVxuICAgIHJldHVybiBhcnIuZm9vKCkgPT09IDQyXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoQnVmZmVyLnByb3RvdHlwZSwgJ3BhcmVudCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFCdWZmZXIuaXNCdWZmZXIodGhpcykpIHJldHVybiB1bmRlZmluZWRcbiAgICByZXR1cm4gdGhpcy5idWZmZXJcbiAgfVxufSlcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1ZmZlci5wcm90b3R5cGUsICdvZmZzZXQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIGlmICghQnVmZmVyLmlzQnVmZmVyKHRoaXMpKSByZXR1cm4gdW5kZWZpbmVkXG4gICAgcmV0dXJuIHRoaXMuYnl0ZU9mZnNldFxuICB9XG59KVxuXG5mdW5jdGlvbiBjcmVhdGVCdWZmZXIgKGxlbmd0aCkge1xuICBpZiAobGVuZ3RoID4gS19NQVhfTEVOR1RIKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBcIicgKyBsZW5ndGggKyAnXCIgaXMgaW52YWxpZCBmb3Igb3B0aW9uIFwic2l6ZVwiJylcbiAgfVxuICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZVxuICBjb25zdCBidWYgPSBuZXcgVWludDhBcnJheShsZW5ndGgpXG4gIE9iamVjdC5zZXRQcm90b3R5cGVPZihidWYsIEJ1ZmZlci5wcm90b3R5cGUpXG4gIHJldHVybiBidWZcbn1cblxuLyoqXG4gKiBUaGUgQnVmZmVyIGNvbnN0cnVjdG9yIHJldHVybnMgaW5zdGFuY2VzIG9mIGBVaW50OEFycmF5YCB0aGF0IGhhdmUgdGhlaXJcbiAqIHByb3RvdHlwZSBjaGFuZ2VkIHRvIGBCdWZmZXIucHJvdG90eXBlYC4gRnVydGhlcm1vcmUsIGBCdWZmZXJgIGlzIGEgc3ViY2xhc3Mgb2ZcbiAqIGBVaW50OEFycmF5YCwgc28gdGhlIHJldHVybmVkIGluc3RhbmNlcyB3aWxsIGhhdmUgYWxsIHRoZSBub2RlIGBCdWZmZXJgIG1ldGhvZHNcbiAqIGFuZCB0aGUgYFVpbnQ4QXJyYXlgIG1ldGhvZHMuIFNxdWFyZSBicmFja2V0IG5vdGF0aW9uIHdvcmtzIGFzIGV4cGVjdGVkIC0tIGl0XG4gKiByZXR1cm5zIGEgc2luZ2xlIG9jdGV0LlxuICpcbiAqIFRoZSBgVWludDhBcnJheWAgcHJvdG90eXBlIHJlbWFpbnMgdW5tb2RpZmllZC5cbiAqL1xuXG5mdW5jdGlvbiBCdWZmZXIgKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIC8vIENvbW1vbiBjYXNlLlxuICBpZiAodHlwZW9mIGFyZyA9PT0gJ251bWJlcicpIHtcbiAgICBpZiAodHlwZW9mIGVuY29kaW5nT3JPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAnVGhlIFwic3RyaW5nXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIHN0cmluZy4gUmVjZWl2ZWQgdHlwZSBudW1iZXInXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBhbGxvY1Vuc2FmZShhcmcpXG4gIH1cbiAgcmV0dXJuIGZyb20oYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cbkJ1ZmZlci5wb29sU2l6ZSA9IDgxOTIgLy8gbm90IHVzZWQgYnkgdGhpcyBpbXBsZW1lbnRhdGlvblxuXG5mdW5jdGlvbiBmcm9tICh2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGZyb21TdHJpbmcodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQpXG4gIH1cblxuICBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KHZhbHVlKSkge1xuICAgIHJldHVybiBmcm9tQXJyYXlWaWV3KHZhbHVlKVxuICB9XG5cbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgJ1RoZSBmaXJzdCBhcmd1bWVudCBtdXN0IGJlIG9uZSBvZiB0eXBlIHN0cmluZywgQnVmZmVyLCBBcnJheUJ1ZmZlciwgQXJyYXksICcgK1xuICAgICAgJ29yIEFycmF5LWxpa2UgT2JqZWN0LiBSZWNlaXZlZCB0eXBlICcgKyAodHlwZW9mIHZhbHVlKVxuICAgIClcbiAgfVxuXG4gIGlmIChpc0luc3RhbmNlKHZhbHVlLCBBcnJheUJ1ZmZlcikgfHxcbiAgICAgICh2YWx1ZSAmJiBpc0luc3RhbmNlKHZhbHVlLmJ1ZmZlciwgQXJyYXlCdWZmZXIpKSkge1xuICAgIHJldHVybiBmcm9tQXJyYXlCdWZmZXIodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIGlmICh0eXBlb2YgU2hhcmVkQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAoaXNJbnN0YW5jZSh2YWx1ZSwgU2hhcmVkQXJyYXlCdWZmZXIpIHx8XG4gICAgICAodmFsdWUgJiYgaXNJbnN0YW5jZSh2YWx1ZS5idWZmZXIsIFNoYXJlZEFycmF5QnVmZmVyKSkpKSB7XG4gICAgcmV0dXJuIGZyb21BcnJheUJ1ZmZlcih2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgJ1RoZSBcInZhbHVlXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgb2YgdHlwZSBudW1iZXIuIFJlY2VpdmVkIHR5cGUgbnVtYmVyJ1xuICAgIClcbiAgfVxuXG4gIGNvbnN0IHZhbHVlT2YgPSB2YWx1ZS52YWx1ZU9mICYmIHZhbHVlLnZhbHVlT2YoKVxuICBpZiAodmFsdWVPZiAhPSBudWxsICYmIHZhbHVlT2YgIT09IHZhbHVlKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5mcm9tKHZhbHVlT2YsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIGNvbnN0IGIgPSBmcm9tT2JqZWN0KHZhbHVlKVxuICBpZiAoYikgcmV0dXJuIGJcblxuICBpZiAodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvUHJpbWl0aXZlICE9IG51bGwgJiZcbiAgICAgIHR5cGVvZiB2YWx1ZVtTeW1ib2wudG9QcmltaXRpdmVdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5mcm9tKHZhbHVlW1N5bWJvbC50b1ByaW1pdGl2ZV0oJ3N0cmluZycpLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICdUaGUgZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBvbmUgb2YgdHlwZSBzdHJpbmcsIEJ1ZmZlciwgQXJyYXlCdWZmZXIsIEFycmF5LCAnICtcbiAgICAnb3IgQXJyYXktbGlrZSBPYmplY3QuIFJlY2VpdmVkIHR5cGUgJyArICh0eXBlb2YgdmFsdWUpXG4gIClcbn1cblxuLyoqXG4gKiBGdW5jdGlvbmFsbHkgZXF1aXZhbGVudCB0byBCdWZmZXIoYXJnLCBlbmNvZGluZykgYnV0IHRocm93cyBhIFR5cGVFcnJvclxuICogaWYgdmFsdWUgaXMgYSBudW1iZXIuXG4gKiBCdWZmZXIuZnJvbShzdHJbLCBlbmNvZGluZ10pXG4gKiBCdWZmZXIuZnJvbShhcnJheSlcbiAqIEJ1ZmZlci5mcm9tKGJ1ZmZlcilcbiAqIEJ1ZmZlci5mcm9tKGFycmF5QnVmZmVyWywgYnl0ZU9mZnNldFssIGxlbmd0aF1dKVxuICoqL1xuQnVmZmVyLmZyb20gPSBmdW5jdGlvbiAodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gZnJvbSh2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxufVxuXG4vLyBOb3RlOiBDaGFuZ2UgcHJvdG90eXBlICphZnRlciogQnVmZmVyLmZyb20gaXMgZGVmaW5lZCB0byB3b3JrYXJvdW5kIENocm9tZSBidWc6XG4vLyBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2J1ZmZlci9wdWxsLzE0OFxuT2JqZWN0LnNldFByb3RvdHlwZU9mKEJ1ZmZlci5wcm90b3R5cGUsIFVpbnQ4QXJyYXkucHJvdG90eXBlKVxuT2JqZWN0LnNldFByb3RvdHlwZU9mKEJ1ZmZlciwgVWludDhBcnJheSlcblxuZnVuY3Rpb24gYXNzZXJ0U2l6ZSAoc2l6ZSkge1xuICBpZiAodHlwZW9mIHNpemUgIT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJzaXplXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIG51bWJlcicpXG4gIH0gZWxzZSBpZiAoc2l6ZSA8IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIFwiJyArIHNpemUgKyAnXCIgaXMgaW52YWxpZCBmb3Igb3B0aW9uIFwic2l6ZVwiJylcbiAgfVxufVxuXG5mdW5jdGlvbiBhbGxvYyAoc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgYXNzZXJ0U2l6ZShzaXplKVxuICBpZiAoc2l6ZSA8PSAwKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcihzaXplKVxuICB9XG4gIGlmIChmaWxsICE9PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPbmx5IHBheSBhdHRlbnRpb24gdG8gZW5jb2RpbmcgaWYgaXQncyBhIHN0cmluZy4gVGhpc1xuICAgIC8vIHByZXZlbnRzIGFjY2lkZW50YWxseSBzZW5kaW5nIGluIGEgbnVtYmVyIHRoYXQgd291bGRcbiAgICAvLyBiZSBpbnRlcnByZXRlZCBhcyBhIHN0YXJ0IG9mZnNldC5cbiAgICByZXR1cm4gdHlwZW9mIGVuY29kaW5nID09PSAnc3RyaW5nJ1xuICAgICAgPyBjcmVhdGVCdWZmZXIoc2l6ZSkuZmlsbChmaWxsLCBlbmNvZGluZylcbiAgICAgIDogY3JlYXRlQnVmZmVyKHNpemUpLmZpbGwoZmlsbClcbiAgfVxuICByZXR1cm4gY3JlYXRlQnVmZmVyKHNpemUpXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBmaWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICogYWxsb2Moc2l6ZVssIGZpbGxbLCBlbmNvZGluZ11dKVxuICoqL1xuQnVmZmVyLmFsbG9jID0gZnVuY3Rpb24gKHNpemUsIGZpbGwsIGVuY29kaW5nKSB7XG4gIHJldHVybiBhbGxvYyhzaXplLCBmaWxsLCBlbmNvZGluZylcbn1cblxuZnVuY3Rpb24gYWxsb2NVbnNhZmUgKHNpemUpIHtcbiAgYXNzZXJ0U2l6ZShzaXplKVxuICByZXR1cm4gY3JlYXRlQnVmZmVyKHNpemUgPCAwID8gMCA6IGNoZWNrZWQoc2l6ZSkgfCAwKVxufVxuXG4vKipcbiAqIEVxdWl2YWxlbnQgdG8gQnVmZmVyKG51bSksIGJ5IGRlZmF1bHQgY3JlYXRlcyBhIG5vbi16ZXJvLWZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKiAqL1xuQnVmZmVyLmFsbG9jVW5zYWZlID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgcmV0dXJuIGFsbG9jVW5zYWZlKHNpemUpXG59XG4vKipcbiAqIEVxdWl2YWxlbnQgdG8gU2xvd0J1ZmZlcihudW0pLCBieSBkZWZhdWx0IGNyZWF0ZXMgYSBub24temVyby1maWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICovXG5CdWZmZXIuYWxsb2NVbnNhZmVTbG93ID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgcmV0dXJuIGFsbG9jVW5zYWZlKHNpemUpXG59XG5cbmZ1bmN0aW9uIGZyb21TdHJpbmcgKHN0cmluZywgZW5jb2RpbmcpIHtcbiAgaWYgKHR5cGVvZiBlbmNvZGluZyAhPT0gJ3N0cmluZycgfHwgZW5jb2RpbmcgPT09ICcnKSB7XG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgfVxuXG4gIGlmICghQnVmZmVyLmlzRW5jb2RpbmcoZW5jb2RpbmcpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICB9XG5cbiAgY29uc3QgbGVuZ3RoID0gYnl0ZUxlbmd0aChzdHJpbmcsIGVuY29kaW5nKSB8IDBcbiAgbGV0IGJ1ZiA9IGNyZWF0ZUJ1ZmZlcihsZW5ndGgpXG5cbiAgY29uc3QgYWN0dWFsID0gYnVmLndyaXRlKHN0cmluZywgZW5jb2RpbmcpXG5cbiAgaWYgKGFjdHVhbCAhPT0gbGVuZ3RoKSB7XG4gICAgLy8gV3JpdGluZyBhIGhleCBzdHJpbmcsIGZvciBleGFtcGxlLCB0aGF0IGNvbnRhaW5zIGludmFsaWQgY2hhcmFjdGVycyB3aWxsXG4gICAgLy8gY2F1c2UgZXZlcnl0aGluZyBhZnRlciB0aGUgZmlyc3QgaW52YWxpZCBjaGFyYWN0ZXIgdG8gYmUgaWdub3JlZC4gKGUuZy5cbiAgICAvLyAnYWJ4eGNkJyB3aWxsIGJlIHRyZWF0ZWQgYXMgJ2FiJylcbiAgICBidWYgPSBidWYuc2xpY2UoMCwgYWN0dWFsKVxuICB9XG5cbiAgcmV0dXJuIGJ1ZlxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlMaWtlIChhcnJheSkge1xuICBjb25zdCBsZW5ndGggPSBhcnJheS5sZW5ndGggPCAwID8gMCA6IGNoZWNrZWQoYXJyYXkubGVuZ3RoKSB8IDBcbiAgY29uc3QgYnVmID0gY3JlYXRlQnVmZmVyKGxlbmd0aClcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgIGJ1ZltpXSA9IGFycmF5W2ldICYgMjU1XG4gIH1cbiAgcmV0dXJuIGJ1ZlxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlWaWV3IChhcnJheVZpZXcpIHtcbiAgaWYgKGlzSW5zdGFuY2UoYXJyYXlWaWV3LCBVaW50OEFycmF5KSkge1xuICAgIGNvbnN0IGNvcHkgPSBuZXcgVWludDhBcnJheShhcnJheVZpZXcpXG4gICAgcmV0dXJuIGZyb21BcnJheUJ1ZmZlcihjb3B5LmJ1ZmZlciwgY29weS5ieXRlT2Zmc2V0LCBjb3B5LmJ5dGVMZW5ndGgpXG4gIH1cbiAgcmV0dXJuIGZyb21BcnJheUxpa2UoYXJyYXlWaWV3KVxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlCdWZmZXIgKGFycmF5LCBieXRlT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKGJ5dGVPZmZzZXQgPCAwIHx8IGFycmF5LmJ5dGVMZW5ndGggPCBieXRlT2Zmc2V0KSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1wib2Zmc2V0XCIgaXMgb3V0c2lkZSBvZiBidWZmZXIgYm91bmRzJylcbiAgfVxuXG4gIGlmIChhcnJheS5ieXRlTGVuZ3RoIDwgYnl0ZU9mZnNldCArIChsZW5ndGggfHwgMCkpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXCJsZW5ndGhcIiBpcyBvdXRzaWRlIG9mIGJ1ZmZlciBib3VuZHMnKVxuICB9XG5cbiAgbGV0IGJ1ZlxuICBpZiAoYnl0ZU9mZnNldCA9PT0gdW5kZWZpbmVkICYmIGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYnVmID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXkpXG4gIH0gZWxzZSBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBidWYgPSBuZXcgVWludDhBcnJheShhcnJheSwgYnl0ZU9mZnNldClcbiAgfSBlbHNlIHtcbiAgICBidWYgPSBuZXcgVWludDhBcnJheShhcnJheSwgYnl0ZU9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgLy8gUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2VcbiAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGJ1ZiwgQnVmZmVyLnByb3RvdHlwZSlcblxuICByZXR1cm4gYnVmXG59XG5cbmZ1bmN0aW9uIGZyb21PYmplY3QgKG9iaikge1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKG9iaikpIHtcbiAgICBjb25zdCBsZW4gPSBjaGVja2VkKG9iai5sZW5ndGgpIHwgMFxuICAgIGNvbnN0IGJ1ZiA9IGNyZWF0ZUJ1ZmZlcihsZW4pXG5cbiAgICBpZiAoYnVmLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGJ1ZlxuICAgIH1cblxuICAgIG9iai5jb3B5KGJ1ZiwgMCwgMCwgbGVuKVxuICAgIHJldHVybiBidWZcbiAgfVxuXG4gIGlmIChvYmoubGVuZ3RoICE9PSB1bmRlZmluZWQpIHtcbiAgICBpZiAodHlwZW9mIG9iai5sZW5ndGggIT09ICdudW1iZXInIHx8IG51bWJlcklzTmFOKG9iai5sZW5ndGgpKSB7XG4gICAgICByZXR1cm4gY3JlYXRlQnVmZmVyKDApXG4gICAgfVxuICAgIHJldHVybiBmcm9tQXJyYXlMaWtlKG9iailcbiAgfVxuXG4gIGlmIChvYmoudHlwZSA9PT0gJ0J1ZmZlcicgJiYgQXJyYXkuaXNBcnJheShvYmouZGF0YSkpIHtcbiAgICByZXR1cm4gZnJvbUFycmF5TGlrZShvYmouZGF0YSlcbiAgfVxufVxuXG5mdW5jdGlvbiBjaGVja2VkIChsZW5ndGgpIHtcbiAgLy8gTm90ZTogY2Fubm90IHVzZSBgbGVuZ3RoIDwgS19NQVhfTEVOR1RIYCBoZXJlIGJlY2F1c2UgdGhhdCBmYWlscyB3aGVuXG4gIC8vIGxlbmd0aCBpcyBOYU4gKHdoaWNoIGlzIG90aGVyd2lzZSBjb2VyY2VkIHRvIHplcm8uKVxuICBpZiAobGVuZ3RoID49IEtfTUFYX0xFTkdUSCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdBdHRlbXB0IHRvIGFsbG9jYXRlIEJ1ZmZlciBsYXJnZXIgdGhhbiBtYXhpbXVtICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICdzaXplOiAweCcgKyBLX01BWF9MRU5HVEgudG9TdHJpbmcoMTYpICsgJyBieXRlcycpXG4gIH1cbiAgcmV0dXJuIGxlbmd0aCB8IDBcbn1cblxuZnVuY3Rpb24gU2xvd0J1ZmZlciAobGVuZ3RoKSB7XG4gIGlmICgrbGVuZ3RoICE9IGxlbmd0aCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGVxZXFlcVxuICAgIGxlbmd0aCA9IDBcbiAgfVxuICByZXR1cm4gQnVmZmVyLmFsbG9jKCtsZW5ndGgpXG59XG5cbkJ1ZmZlci5pc0J1ZmZlciA9IGZ1bmN0aW9uIGlzQnVmZmVyIChiKSB7XG4gIHJldHVybiBiICE9IG51bGwgJiYgYi5faXNCdWZmZXIgPT09IHRydWUgJiZcbiAgICBiICE9PSBCdWZmZXIucHJvdG90eXBlIC8vIHNvIEJ1ZmZlci5pc0J1ZmZlcihCdWZmZXIucHJvdG90eXBlKSB3aWxsIGJlIGZhbHNlXG59XG5cbkJ1ZmZlci5jb21wYXJlID0gZnVuY3Rpb24gY29tcGFyZSAoYSwgYikge1xuICBpZiAoaXNJbnN0YW5jZShhLCBVaW50OEFycmF5KSkgYSA9IEJ1ZmZlci5mcm9tKGEsIGEub2Zmc2V0LCBhLmJ5dGVMZW5ndGgpXG4gIGlmIChpc0luc3RhbmNlKGIsIFVpbnQ4QXJyYXkpKSBiID0gQnVmZmVyLmZyb20oYiwgYi5vZmZzZXQsIGIuYnl0ZUxlbmd0aClcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYSkgfHwgIUJ1ZmZlci5pc0J1ZmZlcihiKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAnVGhlIFwiYnVmMVwiLCBcImJ1ZjJcIiBhcmd1bWVudHMgbXVzdCBiZSBvbmUgb2YgdHlwZSBCdWZmZXIgb3IgVWludDhBcnJheSdcbiAgICApXG4gIH1cblxuICBpZiAoYSA9PT0gYikgcmV0dXJuIDBcblxuICBsZXQgeCA9IGEubGVuZ3RoXG4gIGxldCB5ID0gYi5sZW5ndGhcblxuICBmb3IgKGxldCBpID0gMCwgbGVuID0gTWF0aC5taW4oeCwgeSk7IGkgPCBsZW47ICsraSkge1xuICAgIGlmIChhW2ldICE9PSBiW2ldKSB7XG4gICAgICB4ID0gYVtpXVxuICAgICAgeSA9IGJbaV1cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgaWYgKHggPCB5KSByZXR1cm4gLTFcbiAgaWYgKHkgPCB4KSByZXR1cm4gMVxuICByZXR1cm4gMFxufVxuXG5CdWZmZXIuaXNFbmNvZGluZyA9IGZ1bmN0aW9uIGlzRW5jb2RpbmcgKGVuY29kaW5nKSB7XG4gIHN3aXRjaCAoU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgY2FzZSAnYXNjaWknOlxuICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5CdWZmZXIuY29uY2F0ID0gZnVuY3Rpb24gY29uY2F0IChsaXN0LCBsZW5ndGgpIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KGxpc3QpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0XCIgYXJndW1lbnQgbXVzdCBiZSBhbiBBcnJheSBvZiBCdWZmZXJzJylcbiAgfVxuXG4gIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBCdWZmZXIuYWxsb2MoMClcbiAgfVxuXG4gIGxldCBpXG4gIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGxlbmd0aCA9IDBcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7ICsraSkge1xuICAgICAgbGVuZ3RoICs9IGxpc3RbaV0ubGVuZ3RoXG4gICAgfVxuICB9XG5cbiAgY29uc3QgYnVmZmVyID0gQnVmZmVyLmFsbG9jVW5zYWZlKGxlbmd0aClcbiAgbGV0IHBvcyA9IDBcbiAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICBsZXQgYnVmID0gbGlzdFtpXVxuICAgIGlmIChpc0luc3RhbmNlKGJ1ZiwgVWludDhBcnJheSkpIHtcbiAgICAgIGlmIChwb3MgKyBidWYubGVuZ3RoID4gYnVmZmVyLmxlbmd0aCkge1xuICAgICAgICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSBidWYgPSBCdWZmZXIuZnJvbShidWYpXG4gICAgICAgIGJ1Zi5jb3B5KGJ1ZmZlciwgcG9zKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgVWludDhBcnJheS5wcm90b3R5cGUuc2V0LmNhbGwoXG4gICAgICAgICAgYnVmZmVyLFxuICAgICAgICAgIGJ1ZixcbiAgICAgICAgICBwb3NcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RcIiBhcmd1bWVudCBtdXN0IGJlIGFuIEFycmF5IG9mIEJ1ZmZlcnMnKVxuICAgIH0gZWxzZSB7XG4gICAgICBidWYuY29weShidWZmZXIsIHBvcylcbiAgICB9XG4gICAgcG9zICs9IGJ1Zi5sZW5ndGhcbiAgfVxuICByZXR1cm4gYnVmZmVyXG59XG5cbmZ1bmN0aW9uIGJ5dGVMZW5ndGggKHN0cmluZywgZW5jb2RpbmcpIHtcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihzdHJpbmcpKSB7XG4gICAgcmV0dXJuIHN0cmluZy5sZW5ndGhcbiAgfVxuICBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KHN0cmluZykgfHwgaXNJbnN0YW5jZShzdHJpbmcsIEFycmF5QnVmZmVyKSkge1xuICAgIHJldHVybiBzdHJpbmcuYnl0ZUxlbmd0aFxuICB9XG4gIGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAnVGhlIFwic3RyaW5nXCIgYXJndW1lbnQgbXVzdCBiZSBvbmUgb2YgdHlwZSBzdHJpbmcsIEJ1ZmZlciwgb3IgQXJyYXlCdWZmZXIuICcgK1xuICAgICAgJ1JlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBzdHJpbmdcbiAgICApXG4gIH1cblxuICBjb25zdCBsZW4gPSBzdHJpbmcubGVuZ3RoXG4gIGNvbnN0IG11c3RNYXRjaCA9IChhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gPT09IHRydWUpXG4gIGlmICghbXVzdE1hdGNoICYmIGxlbiA9PT0gMCkgcmV0dXJuIDBcblxuICAvLyBVc2UgYSBmb3IgbG9vcCB0byBhdm9pZCByZWN1cnNpb25cbiAgbGV0IGxvd2VyZWRDYXNlID0gZmFsc2VcbiAgZm9yICg7Oykge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGVuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuIHV0ZjhUb0J5dGVzKHN0cmluZykubGVuZ3RoXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gbGVuICogMlxuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGxlbiA+Pj4gMVxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgcmV0dXJuIGJhc2U2NFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGhcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkge1xuICAgICAgICAgIHJldHVybiBtdXN0TWF0Y2ggPyAtMSA6IHV0ZjhUb0J5dGVzKHN0cmluZykubGVuZ3RoIC8vIGFzc3VtZSB1dGY4XG4gICAgICAgIH1cbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cbkJ1ZmZlci5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuXG5mdW5jdGlvbiBzbG93VG9TdHJpbmcgKGVuY29kaW5nLCBzdGFydCwgZW5kKSB7XG4gIGxldCBsb3dlcmVkQ2FzZSA9IGZhbHNlXG5cbiAgLy8gTm8gbmVlZCB0byB2ZXJpZnkgdGhhdCBcInRoaXMubGVuZ3RoIDw9IE1BWF9VSU5UMzJcIiBzaW5jZSBpdCdzIGEgcmVhZC1vbmx5XG4gIC8vIHByb3BlcnR5IG9mIGEgdHlwZWQgYXJyYXkuXG5cbiAgLy8gVGhpcyBiZWhhdmVzIG5laXRoZXIgbGlrZSBTdHJpbmcgbm9yIFVpbnQ4QXJyYXkgaW4gdGhhdCB3ZSBzZXQgc3RhcnQvZW5kXG4gIC8vIHRvIHRoZWlyIHVwcGVyL2xvd2VyIGJvdW5kcyBpZiB0aGUgdmFsdWUgcGFzc2VkIGlzIG91dCBvZiByYW5nZS5cbiAgLy8gdW5kZWZpbmVkIGlzIGhhbmRsZWQgc3BlY2lhbGx5IGFzIHBlciBFQ01BLTI2MiA2dGggRWRpdGlvbixcbiAgLy8gU2VjdGlvbiAxMy4zLjMuNyBSdW50aW1lIFNlbWFudGljczogS2V5ZWRCaW5kaW5nSW5pdGlhbGl6YXRpb24uXG4gIGlmIChzdGFydCA9PT0gdW5kZWZpbmVkIHx8IHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ID0gMFxuICB9XG4gIC8vIFJldHVybiBlYXJseSBpZiBzdGFydCA+IHRoaXMubGVuZ3RoLiBEb25lIGhlcmUgdG8gcHJldmVudCBwb3RlbnRpYWwgdWludDMyXG4gIC8vIGNvZXJjaW9uIGZhaWwgYmVsb3cuXG4gIGlmIChzdGFydCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICBpZiAoZW5kID09PSB1bmRlZmluZWQgfHwgZW5kID4gdGhpcy5sZW5ndGgpIHtcbiAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICB9XG5cbiAgaWYgKGVuZCA8PSAwKSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICAvLyBGb3JjZSBjb2VyY2lvbiB0byB1aW50MzIuIFRoaXMgd2lsbCBhbHNvIGNvZXJjZSBmYWxzZXkvTmFOIHZhbHVlcyB0byAwLlxuICBlbmQgPj4+PSAwXG4gIHN0YXJ0ID4+Pj0gMFxuXG4gIGlmIChlbmQgPD0gc3RhcnQpIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIGlmICghZW5jb2RpbmcpIGVuY29kaW5nID0gJ3V0ZjgnXG5cbiAgd2hpbGUgKHRydWUpIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gaGV4U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICAgIHJldHVybiB1dGY4U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgICByZXR1cm4gYXNjaWlTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxhdGluMVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIHJldHVybiBiYXNlNjRTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gdXRmMTZsZVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgICAgICBlbmNvZGluZyA9IChlbmNvZGluZyArICcnKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuXG4vLyBUaGlzIHByb3BlcnR5IGlzIHVzZWQgYnkgYEJ1ZmZlci5pc0J1ZmZlcmAgKGFuZCB0aGUgYGlzLWJ1ZmZlcmAgbnBtIHBhY2thZ2UpXG4vLyB0byBkZXRlY3QgYSBCdWZmZXIgaW5zdGFuY2UuIEl0J3Mgbm90IHBvc3NpYmxlIHRvIHVzZSBgaW5zdGFuY2VvZiBCdWZmZXJgXG4vLyByZWxpYWJseSBpbiBhIGJyb3dzZXJpZnkgY29udGV4dCBiZWNhdXNlIHRoZXJlIGNvdWxkIGJlIG11bHRpcGxlIGRpZmZlcmVudFxuLy8gY29waWVzIG9mIHRoZSAnYnVmZmVyJyBwYWNrYWdlIGluIHVzZS4gVGhpcyBtZXRob2Qgd29ya3MgZXZlbiBmb3IgQnVmZmVyXG4vLyBpbnN0YW5jZXMgdGhhdCB3ZXJlIGNyZWF0ZWQgZnJvbSBhbm90aGVyIGNvcHkgb2YgdGhlIGBidWZmZXJgIHBhY2thZ2UuXG4vLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mZXJvc3MvYnVmZmVyL2lzc3Vlcy8xNTRcbkJ1ZmZlci5wcm90b3R5cGUuX2lzQnVmZmVyID0gdHJ1ZVxuXG5mdW5jdGlvbiBzd2FwIChiLCBuLCBtKSB7XG4gIGNvbnN0IGkgPSBiW25dXG4gIGJbbl0gPSBiW21dXG4gIGJbbV0gPSBpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDE2ID0gZnVuY3Rpb24gc3dhcDE2ICgpIHtcbiAgY29uc3QgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDIgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDE2LWJpdHMnKVxuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpICs9IDIpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyAxKVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDMyID0gZnVuY3Rpb24gc3dhcDMyICgpIHtcbiAgY29uc3QgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDQgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDMyLWJpdHMnKVxuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpICs9IDQpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyAzKVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyAyKVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDY0ID0gZnVuY3Rpb24gc3dhcDY0ICgpIHtcbiAgY29uc3QgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDggIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDY0LWJpdHMnKVxuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpICs9IDgpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyA3KVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyA2KVxuICAgIHN3YXAodGhpcywgaSArIDIsIGkgKyA1KVxuICAgIHN3YXAodGhpcywgaSArIDMsIGkgKyA0KVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyAoKSB7XG4gIGNvbnN0IGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW5ndGggPT09IDApIHJldHVybiAnJ1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHV0ZjhTbGljZSh0aGlzLCAwLCBsZW5ndGgpXG4gIHJldHVybiBzbG93VG9TdHJpbmcuYXBwbHkodGhpcywgYXJndW1lbnRzKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvTG9jYWxlU3RyaW5nID0gQnVmZmVyLnByb3RvdHlwZS50b1N0cmluZ1xuXG5CdWZmZXIucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIGVxdWFscyAoYikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlcicpXG4gIGlmICh0aGlzID09PSBiKSByZXR1cm4gdHJ1ZVxuICByZXR1cm4gQnVmZmVyLmNvbXBhcmUodGhpcywgYikgPT09IDBcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbnNwZWN0ID0gZnVuY3Rpb24gaW5zcGVjdCAoKSB7XG4gIGxldCBzdHIgPSAnJ1xuICBjb25zdCBtYXggPSBleHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTXG4gIHN0ciA9IHRoaXMudG9TdHJpbmcoJ2hleCcsIDAsIG1heCkucmVwbGFjZSgvKC57Mn0pL2csICckMSAnKS50cmltKClcbiAgaWYgKHRoaXMubGVuZ3RoID4gbWF4KSBzdHIgKz0gJyAuLi4gJ1xuICByZXR1cm4gJzxCdWZmZXIgJyArIHN0ciArICc+J1xufVxuaWYgKGN1c3RvbUluc3BlY3RTeW1ib2wpIHtcbiAgQnVmZmVyLnByb3RvdHlwZVtjdXN0b21JbnNwZWN0U3ltYm9sXSA9IEJ1ZmZlci5wcm90b3R5cGUuaW5zcGVjdFxufVxuXG5CdWZmZXIucHJvdG90eXBlLmNvbXBhcmUgPSBmdW5jdGlvbiBjb21wYXJlICh0YXJnZXQsIHN0YXJ0LCBlbmQsIHRoaXNTdGFydCwgdGhpc0VuZCkge1xuICBpZiAoaXNJbnN0YW5jZSh0YXJnZXQsIFVpbnQ4QXJyYXkpKSB7XG4gICAgdGFyZ2V0ID0gQnVmZmVyLmZyb20odGFyZ2V0LCB0YXJnZXQub2Zmc2V0LCB0YXJnZXQuYnl0ZUxlbmd0aClcbiAgfVxuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcih0YXJnZXQpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICdUaGUgXCJ0YXJnZXRcIiBhcmd1bWVudCBtdXN0IGJlIG9uZSBvZiB0eXBlIEJ1ZmZlciBvciBVaW50OEFycmF5LiAnICtcbiAgICAgICdSZWNlaXZlZCB0eXBlICcgKyAodHlwZW9mIHRhcmdldClcbiAgICApXG4gIH1cblxuICBpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCkge1xuICAgIHN0YXJ0ID0gMFxuICB9XG4gIGlmIChlbmQgPT09IHVuZGVmaW5lZCkge1xuICAgIGVuZCA9IHRhcmdldCA/IHRhcmdldC5sZW5ndGggOiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpc1N0YXJ0ID0gMFxuICB9XG4gIGlmICh0aGlzRW5kID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzRW5kID0gdGhpcy5sZW5ndGhcbiAgfVxuXG4gIGlmIChzdGFydCA8IDAgfHwgZW5kID4gdGFyZ2V0Lmxlbmd0aCB8fCB0aGlzU3RhcnQgPCAwIHx8IHRoaXNFbmQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdvdXQgb2YgcmFuZ2UgaW5kZXgnKVxuICB9XG5cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kICYmIHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kKSB7XG4gICAgcmV0dXJuIC0xXG4gIH1cbiAgaWYgKHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAxXG4gIH1cblxuICBzdGFydCA+Pj49IDBcbiAgZW5kID4+Pj0gMFxuICB0aGlzU3RhcnQgPj4+PSAwXG4gIHRoaXNFbmQgPj4+PSAwXG5cbiAgaWYgKHRoaXMgPT09IHRhcmdldCkgcmV0dXJuIDBcblxuICBsZXQgeCA9IHRoaXNFbmQgLSB0aGlzU3RhcnRcbiAgbGV0IHkgPSBlbmQgLSBzdGFydFxuICBjb25zdCBsZW4gPSBNYXRoLm1pbih4LCB5KVxuXG4gIGNvbnN0IHRoaXNDb3B5ID0gdGhpcy5zbGljZSh0aGlzU3RhcnQsIHRoaXNFbmQpXG4gIGNvbnN0IHRhcmdldENvcHkgPSB0YXJnZXQuc2xpY2Uoc3RhcnQsIGVuZClcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKHRoaXNDb3B5W2ldICE9PSB0YXJnZXRDb3B5W2ldKSB7XG4gICAgICB4ID0gdGhpc0NvcHlbaV1cbiAgICAgIHkgPSB0YXJnZXRDb3B5W2ldXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGlmICh4IDwgeSkgcmV0dXJuIC0xXG4gIGlmICh5IDwgeCkgcmV0dXJuIDFcbiAgcmV0dXJuIDBcbn1cblxuLy8gRmluZHMgZWl0aGVyIHRoZSBmaXJzdCBpbmRleCBvZiBgdmFsYCBpbiBgYnVmZmVyYCBhdCBvZmZzZXQgPj0gYGJ5dGVPZmZzZXRgLFxuLy8gT1IgdGhlIGxhc3QgaW5kZXggb2YgYHZhbGAgaW4gYGJ1ZmZlcmAgYXQgb2Zmc2V0IDw9IGBieXRlT2Zmc2V0YC5cbi8vXG4vLyBBcmd1bWVudHM6XG4vLyAtIGJ1ZmZlciAtIGEgQnVmZmVyIHRvIHNlYXJjaFxuLy8gLSB2YWwgLSBhIHN0cmluZywgQnVmZmVyLCBvciBudW1iZXJcbi8vIC0gYnl0ZU9mZnNldCAtIGFuIGluZGV4IGludG8gYGJ1ZmZlcmA7IHdpbGwgYmUgY2xhbXBlZCB0byBhbiBpbnQzMlxuLy8gLSBlbmNvZGluZyAtIGFuIG9wdGlvbmFsIGVuY29kaW5nLCByZWxldmFudCBpcyB2YWwgaXMgYSBzdHJpbmdcbi8vIC0gZGlyIC0gdHJ1ZSBmb3IgaW5kZXhPZiwgZmFsc2UgZm9yIGxhc3RJbmRleE9mXG5mdW5jdGlvbiBiaWRpcmVjdGlvbmFsSW5kZXhPZiAoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpIHtcbiAgLy8gRW1wdHkgYnVmZmVyIG1lYW5zIG5vIG1hdGNoXG4gIGlmIChidWZmZXIubGVuZ3RoID09PSAwKSByZXR1cm4gLTFcblxuICAvLyBOb3JtYWxpemUgYnl0ZU9mZnNldFxuICBpZiAodHlwZW9mIGJ5dGVPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgZW5jb2RpbmcgPSBieXRlT2Zmc2V0XG4gICAgYnl0ZU9mZnNldCA9IDBcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0ID4gMHg3ZmZmZmZmZikge1xuICAgIGJ5dGVPZmZzZXQgPSAweDdmZmZmZmZmXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA8IC0weDgwMDAwMDAwKSB7XG4gICAgYnl0ZU9mZnNldCA9IC0weDgwMDAwMDAwXG4gIH1cbiAgYnl0ZU9mZnNldCA9ICtieXRlT2Zmc2V0IC8vIENvZXJjZSB0byBOdW1iZXIuXG4gIGlmIChudW1iZXJJc05hTihieXRlT2Zmc2V0KSkge1xuICAgIC8vIGJ5dGVPZmZzZXQ6IGl0IGl0J3MgdW5kZWZpbmVkLCBudWxsLCBOYU4sIFwiZm9vXCIsIGV0Yywgc2VhcmNoIHdob2xlIGJ1ZmZlclxuICAgIGJ5dGVPZmZzZXQgPSBkaXIgPyAwIDogKGJ1ZmZlci5sZW5ndGggLSAxKVxuICB9XG5cbiAgLy8gTm9ybWFsaXplIGJ5dGVPZmZzZXQ6IG5lZ2F0aXZlIG9mZnNldHMgc3RhcnQgZnJvbSB0aGUgZW5kIG9mIHRoZSBidWZmZXJcbiAgaWYgKGJ5dGVPZmZzZXQgPCAwKSBieXRlT2Zmc2V0ID0gYnVmZmVyLmxlbmd0aCArIGJ5dGVPZmZzZXRcbiAgaWYgKGJ5dGVPZmZzZXQgPj0gYnVmZmVyLmxlbmd0aCkge1xuICAgIGlmIChkaXIpIHJldHVybiAtMVxuICAgIGVsc2UgYnl0ZU9mZnNldCA9IGJ1ZmZlci5sZW5ndGggLSAxXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA8IDApIHtcbiAgICBpZiAoZGlyKSBieXRlT2Zmc2V0ID0gMFxuICAgIGVsc2UgcmV0dXJuIC0xXG4gIH1cblxuICAvLyBOb3JtYWxpemUgdmFsXG4gIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgIHZhbCA9IEJ1ZmZlci5mcm9tKHZhbCwgZW5jb2RpbmcpXG4gIH1cblxuICAvLyBGaW5hbGx5LCBzZWFyY2ggZWl0aGVyIGluZGV4T2YgKGlmIGRpciBpcyB0cnVlKSBvciBsYXN0SW5kZXhPZlxuICBpZiAoQnVmZmVyLmlzQnVmZmVyKHZhbCkpIHtcbiAgICAvLyBTcGVjaWFsIGNhc2U6IGxvb2tpbmcgZm9yIGVtcHR5IHN0cmluZy9idWZmZXIgYWx3YXlzIGZhaWxzXG4gICAgaWYgKHZhbC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiAtMVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXlJbmRleE9mKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgdmFsID0gdmFsICYgMHhGRiAvLyBTZWFyY2ggZm9yIGEgYnl0ZSB2YWx1ZSBbMC0yNTVdXG4gICAgaWYgKHR5cGVvZiBVaW50OEFycmF5LnByb3RvdHlwZS5pbmRleE9mID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBpZiAoZGlyKSB7XG4gICAgICAgIHJldHVybiBVaW50OEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gVWludDhBcnJheS5wcm90b3R5cGUubGFzdEluZGV4T2YuY2FsbChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFycmF5SW5kZXhPZihidWZmZXIsIFt2YWxdLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKVxuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcigndmFsIG11c3QgYmUgc3RyaW5nLCBudW1iZXIgb3IgQnVmZmVyJylcbn1cblxuZnVuY3Rpb24gYXJyYXlJbmRleE9mIChhcnIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcikge1xuICBsZXQgaW5kZXhTaXplID0gMVxuICBsZXQgYXJyTGVuZ3RoID0gYXJyLmxlbmd0aFxuICBsZXQgdmFsTGVuZ3RoID0gdmFsLmxlbmd0aFxuXG4gIGlmIChlbmNvZGluZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZW5jb2RpbmcgPSBTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICBpZiAoZW5jb2RpbmcgPT09ICd1Y3MyJyB8fCBlbmNvZGluZyA9PT0gJ3Vjcy0yJyB8fFxuICAgICAgICBlbmNvZGluZyA9PT0gJ3V0ZjE2bGUnIHx8IGVuY29kaW5nID09PSAndXRmLTE2bGUnKSB7XG4gICAgICBpZiAoYXJyLmxlbmd0aCA8IDIgfHwgdmFsLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgcmV0dXJuIC0xXG4gICAgICB9XG4gICAgICBpbmRleFNpemUgPSAyXG4gICAgICBhcnJMZW5ndGggLz0gMlxuICAgICAgdmFsTGVuZ3RoIC89IDJcbiAgICAgIGJ5dGVPZmZzZXQgLz0gMlxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWQgKGJ1ZiwgaSkge1xuICAgIGlmIChpbmRleFNpemUgPT09IDEpIHtcbiAgICAgIHJldHVybiBidWZbaV1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGJ1Zi5yZWFkVUludDE2QkUoaSAqIGluZGV4U2l6ZSlcbiAgICB9XG4gIH1cblxuICBsZXQgaVxuICBpZiAoZGlyKSB7XG4gICAgbGV0IGZvdW5kSW5kZXggPSAtMVxuICAgIGZvciAoaSA9IGJ5dGVPZmZzZXQ7IGkgPCBhcnJMZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHJlYWQoYXJyLCBpKSA9PT0gcmVhZCh2YWwsIGZvdW5kSW5kZXggPT09IC0xID8gMCA6IGkgLSBmb3VuZEluZGV4KSkge1xuICAgICAgICBpZiAoZm91bmRJbmRleCA9PT0gLTEpIGZvdW5kSW5kZXggPSBpXG4gICAgICAgIGlmIChpIC0gZm91bmRJbmRleCArIDEgPT09IHZhbExlbmd0aCkgcmV0dXJuIGZvdW5kSW5kZXggKiBpbmRleFNpemVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChmb3VuZEluZGV4ICE9PSAtMSkgaSAtPSBpIC0gZm91bmRJbmRleFxuICAgICAgICBmb3VuZEluZGV4ID0gLTFcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGJ5dGVPZmZzZXQgKyB2YWxMZW5ndGggPiBhcnJMZW5ndGgpIGJ5dGVPZmZzZXQgPSBhcnJMZW5ndGggLSB2YWxMZW5ndGhcbiAgICBmb3IgKGkgPSBieXRlT2Zmc2V0OyBpID49IDA7IGktLSkge1xuICAgICAgbGV0IGZvdW5kID0gdHJ1ZVxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB2YWxMZW5ndGg7IGorKykge1xuICAgICAgICBpZiAocmVhZChhcnIsIGkgKyBqKSAhPT0gcmVhZCh2YWwsIGopKSB7XG4gICAgICAgICAgZm91bmQgPSBmYWxzZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gLTFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbmNsdWRlcyA9IGZ1bmN0aW9uIGluY2x1ZGVzICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiB0aGlzLmluZGV4T2YodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykgIT09IC0xXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uIGluZGV4T2YgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGJpZGlyZWN0aW9uYWxJbmRleE9mKHRoaXMsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIHRydWUpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUubGFzdEluZGV4T2YgPSBmdW5jdGlvbiBsYXN0SW5kZXhPZiAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gYmlkaXJlY3Rpb25hbEluZGV4T2YodGhpcywgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZmFsc2UpXG59XG5cbmZ1bmN0aW9uIGhleFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgb2Zmc2V0ID0gTnVtYmVyKG9mZnNldCkgfHwgMFxuICBjb25zdCByZW1haW5pbmcgPSBidWYubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gIH0gZWxzZSB7XG4gICAgbGVuZ3RoID0gTnVtYmVyKGxlbmd0aClcbiAgICBpZiAobGVuZ3RoID4gcmVtYWluaW5nKSB7XG4gICAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgICB9XG4gIH1cblxuICBjb25zdCBzdHJMZW4gPSBzdHJpbmcubGVuZ3RoXG5cbiAgaWYgKGxlbmd0aCA+IHN0ckxlbiAvIDIpIHtcbiAgICBsZW5ndGggPSBzdHJMZW4gLyAyXG4gIH1cbiAgbGV0IGlcbiAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgY29uc3QgcGFyc2VkID0gcGFyc2VJbnQoc3RyaW5nLnN1YnN0cihpICogMiwgMiksIDE2KVxuICAgIGlmIChudW1iZXJJc05hTihwYXJzZWQpKSByZXR1cm4gaVxuICAgIGJ1ZltvZmZzZXQgKyBpXSA9IHBhcnNlZFxuICB9XG4gIHJldHVybiBpXG59XG5cbmZ1bmN0aW9uIHV0ZjhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKHV0ZjhUb0J5dGVzKHN0cmluZywgYnVmLmxlbmd0aCAtIG9mZnNldCksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGFzY2lpV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcihhc2NpaVRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gYmFzZTY0V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcihiYXNlNjRUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIHVjczJXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKHV0ZjE2bGVUb0J5dGVzKHN0cmluZywgYnVmLmxlbmd0aCAtIG9mZnNldCksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiB3cml0ZSAoc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCwgZW5jb2RpbmcpIHtcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZylcbiAgaWYgKG9mZnNldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgICBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICAgIG9mZnNldCA9IDBcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZywgZW5jb2RpbmcpXG4gIH0gZWxzZSBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQgJiYgdHlwZW9mIG9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICBlbmNvZGluZyA9IG9mZnNldFxuICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gICAgb2Zmc2V0ID0gMFxuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nLCBvZmZzZXRbLCBsZW5ndGhdWywgZW5jb2RpbmddKVxuICB9IGVsc2UgaWYgKGlzRmluaXRlKG9mZnNldCkpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgICBpZiAoaXNGaW5pdGUobGVuZ3RoKSkge1xuICAgICAgbGVuZ3RoID0gbGVuZ3RoID4+PiAwXG4gICAgICBpZiAoZW5jb2RpbmcgPT09IHVuZGVmaW5lZCkgZW5jb2RpbmcgPSAndXRmOCdcbiAgICB9IGVsc2Uge1xuICAgICAgZW5jb2RpbmcgPSBsZW5ndGhcbiAgICAgIGxlbmd0aCA9IHVuZGVmaW5lZFxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnQnVmZmVyLndyaXRlKHN0cmluZywgZW5jb2RpbmcsIG9mZnNldFssIGxlbmd0aF0pIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQnXG4gICAgKVxuICB9XG5cbiAgY29uc3QgcmVtYWluaW5nID0gdGhpcy5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkIHx8IGxlbmd0aCA+IHJlbWFpbmluZykgbGVuZ3RoID0gcmVtYWluaW5nXG5cbiAgaWYgKChzdHJpbmcubGVuZ3RoID4gMCAmJiAobGVuZ3RoIDwgMCB8fCBvZmZzZXQgPCAwKSkgfHwgb2Zmc2V0ID4gdGhpcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQXR0ZW1wdCB0byB3cml0ZSBvdXRzaWRlIGJ1ZmZlciBib3VuZHMnKVxuICB9XG5cbiAgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSAndXRmOCdcblxuICBsZXQgbG93ZXJlZENhc2UgPSBmYWxzZVxuICBmb3IgKDs7KSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGhleFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgICByZXR1cm4gdXRmOFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gYXNjaWlXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICAvLyBXYXJuaW5nOiBtYXhMZW5ndGggbm90IHRha2VuIGludG8gYWNjb3VudCBpbiBiYXNlNjRXcml0ZVxuICAgICAgICByZXR1cm4gYmFzZTY0V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIHVjczJXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04gKCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdCdWZmZXInLFxuICAgIGRhdGE6IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuX2FyciB8fCB0aGlzLCAwKVxuICB9XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKHN0YXJ0ID09PSAwICYmIGVuZCA9PT0gYnVmLmxlbmd0aCkge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1Zi5zbGljZShzdGFydCwgZW5kKSlcbiAgfVxufVxuXG5mdW5jdGlvbiB1dGY4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG4gIGNvbnN0IHJlcyA9IFtdXG5cbiAgbGV0IGkgPSBzdGFydFxuICB3aGlsZSAoaSA8IGVuZCkge1xuICAgIGNvbnN0IGZpcnN0Qnl0ZSA9IGJ1ZltpXVxuICAgIGxldCBjb2RlUG9pbnQgPSBudWxsXG4gICAgbGV0IGJ5dGVzUGVyU2VxdWVuY2UgPSAoZmlyc3RCeXRlID4gMHhFRilcbiAgICAgID8gNFxuICAgICAgOiAoZmlyc3RCeXRlID4gMHhERilcbiAgICAgICAgICA/IDNcbiAgICAgICAgICA6IChmaXJzdEJ5dGUgPiAweEJGKVxuICAgICAgICAgICAgICA/IDJcbiAgICAgICAgICAgICAgOiAxXG5cbiAgICBpZiAoaSArIGJ5dGVzUGVyU2VxdWVuY2UgPD0gZW5kKSB7XG4gICAgICBsZXQgc2Vjb25kQnl0ZSwgdGhpcmRCeXRlLCBmb3VydGhCeXRlLCB0ZW1wQ29kZVBvaW50XG5cbiAgICAgIHN3aXRjaCAoYnl0ZXNQZXJTZXF1ZW5jZSkge1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgaWYgKGZpcnN0Qnl0ZSA8IDB4ODApIHtcbiAgICAgICAgICAgIGNvZGVQb2ludCA9IGZpcnN0Qnl0ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweDFGKSA8PCAweDYgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4N0YpIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICB0aGlyZEJ5dGUgPSBidWZbaSArIDJdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKHRoaXJkQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4RikgPDwgMHhDIHwgKHNlY29uZEJ5dGUgJiAweDNGKSA8PCAweDYgfCAodGhpcmRCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHg3RkYgJiYgKHRlbXBDb2RlUG9pbnQgPCAweEQ4MDAgfHwgdGVtcENvZGVQb2ludCA+IDB4REZGRikpIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICB0aGlyZEJ5dGUgPSBidWZbaSArIDJdXG4gICAgICAgICAgZm91cnRoQnl0ZSA9IGJ1ZltpICsgM11cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAodGhpcmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKGZvdXJ0aEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweEYpIDw8IDB4MTIgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpIDw8IDB4QyB8ICh0aGlyZEJ5dGUgJiAweDNGKSA8PCAweDYgfCAoZm91cnRoQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4RkZGRiAmJiB0ZW1wQ29kZVBvaW50IDwgMHgxMTAwMDApIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29kZVBvaW50ID09PSBudWxsKSB7XG4gICAgICAvLyB3ZSBkaWQgbm90IGdlbmVyYXRlIGEgdmFsaWQgY29kZVBvaW50IHNvIGluc2VydCBhXG4gICAgICAvLyByZXBsYWNlbWVudCBjaGFyIChVK0ZGRkQpIGFuZCBhZHZhbmNlIG9ubHkgMSBieXRlXG4gICAgICBjb2RlUG9pbnQgPSAweEZGRkRcbiAgICAgIGJ5dGVzUGVyU2VxdWVuY2UgPSAxXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPiAweEZGRkYpIHtcbiAgICAgIC8vIGVuY29kZSB0byB1dGYxNiAoc3Vycm9nYXRlIHBhaXIgZGFuY2UpXG4gICAgICBjb2RlUG9pbnQgLT0gMHgxMDAwMFxuICAgICAgcmVzLnB1c2goY29kZVBvaW50ID4+PiAxMCAmIDB4M0ZGIHwgMHhEODAwKVxuICAgICAgY29kZVBvaW50ID0gMHhEQzAwIHwgY29kZVBvaW50ICYgMHgzRkZcbiAgICB9XG5cbiAgICByZXMucHVzaChjb2RlUG9pbnQpXG4gICAgaSArPSBieXRlc1BlclNlcXVlbmNlXG4gIH1cblxuICByZXR1cm4gZGVjb2RlQ29kZVBvaW50c0FycmF5KHJlcylcbn1cblxuLy8gQmFzZWQgb24gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjI3NDcyNzIvNjgwNzQyLCB0aGUgYnJvd3NlciB3aXRoXG4vLyB0aGUgbG93ZXN0IGxpbWl0IGlzIENocm9tZSwgd2l0aCAweDEwMDAwIGFyZ3MuXG4vLyBXZSBnbyAxIG1hZ25pdHVkZSBsZXNzLCBmb3Igc2FmZXR5XG5jb25zdCBNQVhfQVJHVU1FTlRTX0xFTkdUSCA9IDB4MTAwMFxuXG5mdW5jdGlvbiBkZWNvZGVDb2RlUG9pbnRzQXJyYXkgKGNvZGVQb2ludHMpIHtcbiAgY29uc3QgbGVuID0gY29kZVBvaW50cy5sZW5ndGhcbiAgaWYgKGxlbiA8PSBNQVhfQVJHVU1FTlRTX0xFTkdUSCkge1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgY29kZVBvaW50cykgLy8gYXZvaWQgZXh0cmEgc2xpY2UoKVxuICB9XG5cbiAgLy8gRGVjb2RlIGluIGNodW5rcyB0byBhdm9pZCBcImNhbGwgc3RhY2sgc2l6ZSBleGNlZWRlZFwiLlxuICBsZXQgcmVzID0gJydcbiAgbGV0IGkgPSAwXG4gIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoXG4gICAgICBTdHJpbmcsXG4gICAgICBjb2RlUG9pbnRzLnNsaWNlKGksIGkgKz0gTUFYX0FSR1VNRU5UU19MRU5HVEgpXG4gICAgKVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuZnVuY3Rpb24gYXNjaWlTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGxldCByZXQgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0gJiAweDdGKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gbGF0aW4xU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBsZXQgcmV0ID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gaGV4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBjb25zdCBsZW4gPSBidWYubGVuZ3RoXG5cbiAgaWYgKCFzdGFydCB8fCBzdGFydCA8IDApIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCB8fCBlbmQgPCAwIHx8IGVuZCA+IGxlbikgZW5kID0gbGVuXG5cbiAgbGV0IG91dCA9ICcnXG4gIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgb3V0ICs9IGhleFNsaWNlTG9va3VwVGFibGVbYnVmW2ldXVxuICB9XG4gIHJldHVybiBvdXRcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgY29uc3QgYnl0ZXMgPSBidWYuc2xpY2Uoc3RhcnQsIGVuZClcbiAgbGV0IHJlcyA9ICcnXG4gIC8vIElmIGJ5dGVzLmxlbmd0aCBpcyBvZGQsIHRoZSBsYXN0IDggYml0cyBtdXN0IGJlIGlnbm9yZWQgKHNhbWUgYXMgbm9kZS5qcylcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGggLSAxOyBpICs9IDIpIHtcbiAgICByZXMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShieXRlc1tpXSArIChieXRlc1tpICsgMV0gKiAyNTYpKVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zbGljZSA9IGZ1bmN0aW9uIHNsaWNlIChzdGFydCwgZW5kKSB7XG4gIGNvbnN0IGxlbiA9IHRoaXMubGVuZ3RoXG4gIHN0YXJ0ID0gfn5zdGFydFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IGxlbiA6IH5+ZW5kXG5cbiAgaWYgKHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ICs9IGxlblxuICAgIGlmIChzdGFydCA8IDApIHN0YXJ0ID0gMFxuICB9IGVsc2UgaWYgKHN0YXJ0ID4gbGVuKSB7XG4gICAgc3RhcnQgPSBsZW5cbiAgfVxuXG4gIGlmIChlbmQgPCAwKSB7XG4gICAgZW5kICs9IGxlblxuICAgIGlmIChlbmQgPCAwKSBlbmQgPSAwXG4gIH0gZWxzZSBpZiAoZW5kID4gbGVuKSB7XG4gICAgZW5kID0gbGVuXG4gIH1cblxuICBpZiAoZW5kIDwgc3RhcnQpIGVuZCA9IHN0YXJ0XG5cbiAgY29uc3QgbmV3QnVmID0gdGhpcy5zdWJhcnJheShzdGFydCwgZW5kKVxuICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZVxuICBPYmplY3Quc2V0UHJvdG90eXBlT2YobmV3QnVmLCBCdWZmZXIucHJvdG90eXBlKVxuXG4gIHJldHVybiBuZXdCdWZcbn1cblxuLypcbiAqIE5lZWQgdG8gbWFrZSBzdXJlIHRoYXQgYnVmZmVyIGlzbid0IHRyeWluZyB0byB3cml0ZSBvdXQgb2YgYm91bmRzLlxuICovXG5mdW5jdGlvbiBjaGVja09mZnNldCAob2Zmc2V0LCBleHQsIGxlbmd0aCkge1xuICBpZiAoKG9mZnNldCAlIDEpICE9PSAwIHx8IG9mZnNldCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdvZmZzZXQgaXMgbm90IHVpbnQnKVxuICBpZiAob2Zmc2V0ICsgZXh0ID4gbGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVHJ5aW5nIHRvIGFjY2VzcyBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVpbnRMRSA9XG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50TEUgPSBmdW5jdGlvbiByZWFkVUludExFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIGxldCB2YWwgPSB0aGlzW29mZnNldF1cbiAgbGV0IG11bCA9IDFcbiAgbGV0IGkgPSAwXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgaV0gKiBtdWxcbiAgfVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVWludEJFID1cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnRCRSA9IGZ1bmN0aW9uIHJlYWRVSW50QkUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuICB9XG5cbiAgbGV0IHZhbCA9IHRoaXNbb2Zmc2V0ICsgLS1ieXRlTGVuZ3RoXVxuICBsZXQgbXVsID0gMVxuICB3aGlsZSAoYnl0ZUxlbmd0aCA+IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyAtLWJ5dGVMZW5ndGhdICogbXVsXG4gIH1cblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVpbnQ4ID1cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQ4ID0gZnVuY3Rpb24gcmVhZFVJbnQ4IChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDEsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVpbnQxNkxFID1cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkxFID0gZnVuY3Rpb24gcmVhZFVJbnQxNkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdIHwgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVWludDE2QkUgPVxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2QkUgPSBmdW5jdGlvbiByZWFkVUludDE2QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDgpIHwgdGhpc1tvZmZzZXQgKyAxXVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVaW50MzJMRSA9XG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJMRSA9IGZ1bmN0aW9uIHJlYWRVSW50MzJMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKCh0aGlzW29mZnNldF0pIHxcbiAgICAgICh0aGlzW29mZnNldCArIDFdIDw8IDgpIHxcbiAgICAgICh0aGlzW29mZnNldCArIDJdIDw8IDE2KSkgK1xuICAgICAgKHRoaXNbb2Zmc2V0ICsgM10gKiAweDEwMDAwMDApXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVpbnQzMkJFID1cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkJFID0gZnVuY3Rpb24gcmVhZFVJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdICogMHgxMDAwMDAwKSArXG4gICAgKCh0aGlzW29mZnNldCArIDFdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgOCkgfFxuICAgIHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEJpZ1VJbnQ2NExFID0gZGVmaW5lQmlnSW50TWV0aG9kKGZ1bmN0aW9uIHJlYWRCaWdVSW50NjRMRSAob2Zmc2V0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICB2YWxpZGF0ZU51bWJlcihvZmZzZXQsICdvZmZzZXQnKVxuICBjb25zdCBmaXJzdCA9IHRoaXNbb2Zmc2V0XVxuICBjb25zdCBsYXN0ID0gdGhpc1tvZmZzZXQgKyA3XVxuICBpZiAoZmlyc3QgPT09IHVuZGVmaW5lZCB8fCBsYXN0ID09PSB1bmRlZmluZWQpIHtcbiAgICBib3VuZHNFcnJvcihvZmZzZXQsIHRoaXMubGVuZ3RoIC0gOClcbiAgfVxuXG4gIGNvbnN0IGxvID0gZmlyc3QgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiA4ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMTYgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiAyNFxuXG4gIGNvbnN0IGhpID0gdGhpc1srK29mZnNldF0gK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiA4ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMTYgK1xuICAgIGxhc3QgKiAyICoqIDI0XG5cbiAgcmV0dXJuIEJpZ0ludChsbykgKyAoQmlnSW50KGhpKSA8PCBCaWdJbnQoMzIpKVxufSlcblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkQmlnVUludDY0QkUgPSBkZWZpbmVCaWdJbnRNZXRob2QoZnVuY3Rpb24gcmVhZEJpZ1VJbnQ2NEJFIChvZmZzZXQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIHZhbGlkYXRlTnVtYmVyKG9mZnNldCwgJ29mZnNldCcpXG4gIGNvbnN0IGZpcnN0ID0gdGhpc1tvZmZzZXRdXG4gIGNvbnN0IGxhc3QgPSB0aGlzW29mZnNldCArIDddXG4gIGlmIChmaXJzdCA9PT0gdW5kZWZpbmVkIHx8IGxhc3QgPT09IHVuZGVmaW5lZCkge1xuICAgIGJvdW5kc0Vycm9yKG9mZnNldCwgdGhpcy5sZW5ndGggLSA4KVxuICB9XG5cbiAgY29uc3QgaGkgPSBmaXJzdCAqIDIgKiogMjQgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiAxNiArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDggK1xuICAgIHRoaXNbKytvZmZzZXRdXG5cbiAgY29uc3QgbG8gPSB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMjQgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiAxNiArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDggK1xuICAgIGxhc3RcblxuICByZXR1cm4gKEJpZ0ludChoaSkgPDwgQmlnSW50KDMyKSkgKyBCaWdJbnQobG8pXG59KVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnRMRSA9IGZ1bmN0aW9uIHJlYWRJbnRMRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICBsZXQgdmFsID0gdGhpc1tvZmZzZXRdXG4gIGxldCBtdWwgPSAxXG4gIGxldCBpID0gMFxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIGldICogbXVsXG4gIH1cbiAgbXVsICo9IDB4ODBcblxuICBpZiAodmFsID49IG11bCkgdmFsIC09IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50QkUgPSBmdW5jdGlvbiByZWFkSW50QkUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgbGV0IGkgPSBieXRlTGVuZ3RoXG4gIGxldCBtdWwgPSAxXG4gIGxldCB2YWwgPSB0aGlzW29mZnNldCArIC0taV1cbiAgd2hpbGUgKGkgPiAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgLS1pXSAqIG11bFxuICB9XG4gIG11bCAqPSAweDgwXG5cbiAgaWYgKHZhbCA+PSBtdWwpIHZhbCAtPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aClcblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDggPSBmdW5jdGlvbiByZWFkSW50OCAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAxLCB0aGlzLmxlbmd0aClcbiAgaWYgKCEodGhpc1tvZmZzZXRdICYgMHg4MCkpIHJldHVybiAodGhpc1tvZmZzZXRdKVxuICByZXR1cm4gKCgweGZmIC0gdGhpc1tvZmZzZXRdICsgMSkgKiAtMSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZMRSA9IGZ1bmN0aW9uIHJlYWRJbnQxNkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICBjb25zdCB2YWwgPSB0aGlzW29mZnNldF0gfCAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KVxuICByZXR1cm4gKHZhbCAmIDB4ODAwMCkgPyB2YWwgfCAweEZGRkYwMDAwIDogdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2QkUgPSBmdW5jdGlvbiByZWFkSW50MTZCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgY29uc3QgdmFsID0gdGhpc1tvZmZzZXQgKyAxXSB8ICh0aGlzW29mZnNldF0gPDwgOClcbiAgcmV0dXJuICh2YWwgJiAweDgwMDApID8gdmFsIHwgMHhGRkZGMDAwMCA6IHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkxFID0gZnVuY3Rpb24gcmVhZEludDMyTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0pIHxcbiAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAzXSA8PCAyNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJCRSA9IGZ1bmN0aW9uIHJlYWRJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDI0KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEJpZ0ludDY0TEUgPSBkZWZpbmVCaWdJbnRNZXRob2QoZnVuY3Rpb24gcmVhZEJpZ0ludDY0TEUgKG9mZnNldCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgdmFsaWRhdGVOdW1iZXIob2Zmc2V0LCAnb2Zmc2V0JylcbiAgY29uc3QgZmlyc3QgPSB0aGlzW29mZnNldF1cbiAgY29uc3QgbGFzdCA9IHRoaXNbb2Zmc2V0ICsgN11cbiAgaWYgKGZpcnN0ID09PSB1bmRlZmluZWQgfHwgbGFzdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYm91bmRzRXJyb3Iob2Zmc2V0LCB0aGlzLmxlbmd0aCAtIDgpXG4gIH1cblxuICBjb25zdCB2YWwgPSB0aGlzW29mZnNldCArIDRdICtcbiAgICB0aGlzW29mZnNldCArIDVdICogMiAqKiA4ICtcbiAgICB0aGlzW29mZnNldCArIDZdICogMiAqKiAxNiArXG4gICAgKGxhc3QgPDwgMjQpIC8vIE92ZXJmbG93XG5cbiAgcmV0dXJuIChCaWdJbnQodmFsKSA8PCBCaWdJbnQoMzIpKSArXG4gICAgQmlnSW50KGZpcnN0ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogOCArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDE2ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMjQpXG59KVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRCaWdJbnQ2NEJFID0gZGVmaW5lQmlnSW50TWV0aG9kKGZ1bmN0aW9uIHJlYWRCaWdJbnQ2NEJFIChvZmZzZXQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIHZhbGlkYXRlTnVtYmVyKG9mZnNldCwgJ29mZnNldCcpXG4gIGNvbnN0IGZpcnN0ID0gdGhpc1tvZmZzZXRdXG4gIGNvbnN0IGxhc3QgPSB0aGlzW29mZnNldCArIDddXG4gIGlmIChmaXJzdCA9PT0gdW5kZWZpbmVkIHx8IGxhc3QgPT09IHVuZGVmaW5lZCkge1xuICAgIGJvdW5kc0Vycm9yKG9mZnNldCwgdGhpcy5sZW5ndGggLSA4KVxuICB9XG5cbiAgY29uc3QgdmFsID0gKGZpcnN0IDw8IDI0KSArIC8vIE92ZXJmbG93XG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDE2ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogOCArXG4gICAgdGhpc1srK29mZnNldF1cblxuICByZXR1cm4gKEJpZ0ludCh2YWwpIDw8IEJpZ0ludCgzMikpICtcbiAgICBCaWdJbnQodGhpc1srK29mZnNldF0gKiAyICoqIDI0ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMTYgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiA4ICtcbiAgICBsYXN0KVxufSlcblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRMRSA9IGZ1bmN0aW9uIHJlYWRGbG9hdExFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgdHJ1ZSwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0QkUgPSBmdW5jdGlvbiByZWFkRmxvYXRCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIGZhbHNlLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlTEUgPSBmdW5jdGlvbiByZWFkRG91YmxlTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgOCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCB0cnVlLCA1MiwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlQkUgPSBmdW5jdGlvbiByZWFkRG91YmxlQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgOCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCBmYWxzZSwgNTIsIDgpXG59XG5cbmZ1bmN0aW9uIGNoZWNrSW50IChidWYsIHZhbHVlLCBvZmZzZXQsIGV4dCwgbWF4LCBtaW4pIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYnVmKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJidWZmZXJcIiBhcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyIGluc3RhbmNlJylcbiAgaWYgKHZhbHVlID4gbWF4IHx8IHZhbHVlIDwgbWluKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXCJ2YWx1ZVwiIGFyZ3VtZW50IGlzIG91dCBvZiBib3VuZHMnKVxuICBpZiAob2Zmc2V0ICsgZXh0ID4gYnVmLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVaW50TEUgPVxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnRMRSA9IGZ1bmN0aW9uIHdyaXRlVUludExFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNvbnN0IG1heEJ5dGVzID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpIC0gMVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG1heEJ5dGVzLCAwKVxuICB9XG5cbiAgbGV0IG11bCA9IDFcbiAgbGV0IGkgPSAwXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAodmFsdWUgLyBtdWwpICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVpbnRCRSA9XG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludEJFID0gZnVuY3Rpb24gd3JpdGVVSW50QkUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY29uc3QgbWF4Qnl0ZXMgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCkgLSAxXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbWF4Qnl0ZXMsIDApXG4gIH1cblxuICBsZXQgaSA9IGJ5dGVMZW5ndGggLSAxXG4gIGxldCBtdWwgPSAxXG4gIHRoaXNbb2Zmc2V0ICsgaV0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKC0taSA+PSAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICh2YWx1ZSAvIG11bCkgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVWludDggPVxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQ4ID0gZnVuY3Rpb24gd3JpdGVVSW50OCAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDEsIDB4ZmYsIDApXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyAxXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVaW50MTZMRSA9XG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2TEUgPSBmdW5jdGlvbiB3cml0ZVVJbnQxNkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHhmZmZmLCAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVWludDE2QkUgPVxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkJFID0gZnVuY3Rpb24gd3JpdGVVSW50MTZCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4ZmZmZiwgMClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiA4KVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVpbnQzMkxFID1cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJMRSA9IGZ1bmN0aW9uIHdyaXRlVUludDMyTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweGZmZmZmZmZmLCAwKVxuICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlID4+PiAyNClcbiAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVaW50MzJCRSA9XG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyQkUgPSBmdW5jdGlvbiB3cml0ZVVJbnQzMkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHhmZmZmZmZmZiwgMClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiAyNClcbiAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDgpXG4gIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5mdW5jdGlvbiB3cnRCaWdVSW50NjRMRSAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBtaW4sIG1heCkge1xuICBjaGVja0ludEJJKHZhbHVlLCBtaW4sIG1heCwgYnVmLCBvZmZzZXQsIDcpXG5cbiAgbGV0IGxvID0gTnVtYmVyKHZhbHVlICYgQmlnSW50KDB4ZmZmZmZmZmYpKVxuICBidWZbb2Zmc2V0KytdID0gbG9cbiAgbG8gPSBsbyA+PiA4XG4gIGJ1ZltvZmZzZXQrK10gPSBsb1xuICBsbyA9IGxvID4+IDhcbiAgYnVmW29mZnNldCsrXSA9IGxvXG4gIGxvID0gbG8gPj4gOFxuICBidWZbb2Zmc2V0KytdID0gbG9cbiAgbGV0IGhpID0gTnVtYmVyKHZhbHVlID4+IEJpZ0ludCgzMikgJiBCaWdJbnQoMHhmZmZmZmZmZikpXG4gIGJ1ZltvZmZzZXQrK10gPSBoaVxuICBoaSA9IGhpID4+IDhcbiAgYnVmW29mZnNldCsrXSA9IGhpXG4gIGhpID0gaGkgPj4gOFxuICBidWZbb2Zmc2V0KytdID0gaGlcbiAgaGkgPSBoaSA+PiA4XG4gIGJ1ZltvZmZzZXQrK10gPSBoaVxuICByZXR1cm4gb2Zmc2V0XG59XG5cbmZ1bmN0aW9uIHdydEJpZ1VJbnQ2NEJFIChidWYsIHZhbHVlLCBvZmZzZXQsIG1pbiwgbWF4KSB7XG4gIGNoZWNrSW50QkkodmFsdWUsIG1pbiwgbWF4LCBidWYsIG9mZnNldCwgNylcblxuICBsZXQgbG8gPSBOdW1iZXIodmFsdWUgJiBCaWdJbnQoMHhmZmZmZmZmZikpXG4gIGJ1ZltvZmZzZXQgKyA3XSA9IGxvXG4gIGxvID0gbG8gPj4gOFxuICBidWZbb2Zmc2V0ICsgNl0gPSBsb1xuICBsbyA9IGxvID4+IDhcbiAgYnVmW29mZnNldCArIDVdID0gbG9cbiAgbG8gPSBsbyA+PiA4XG4gIGJ1ZltvZmZzZXQgKyA0XSA9IGxvXG4gIGxldCBoaSA9IE51bWJlcih2YWx1ZSA+PiBCaWdJbnQoMzIpICYgQmlnSW50KDB4ZmZmZmZmZmYpKVxuICBidWZbb2Zmc2V0ICsgM10gPSBoaVxuICBoaSA9IGhpID4+IDhcbiAgYnVmW29mZnNldCArIDJdID0gaGlcbiAgaGkgPSBoaSA+PiA4XG4gIGJ1ZltvZmZzZXQgKyAxXSA9IGhpXG4gIGhpID0gaGkgPj4gOFxuICBidWZbb2Zmc2V0XSA9IGhpXG4gIHJldHVybiBvZmZzZXQgKyA4XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVCaWdVSW50NjRMRSA9IGRlZmluZUJpZ0ludE1ldGhvZChmdW5jdGlvbiB3cml0ZUJpZ1VJbnQ2NExFICh2YWx1ZSwgb2Zmc2V0ID0gMCkge1xuICByZXR1cm4gd3J0QmlnVUludDY0TEUodGhpcywgdmFsdWUsIG9mZnNldCwgQmlnSW50KDApLCBCaWdJbnQoJzB4ZmZmZmZmZmZmZmZmZmZmZicpKVxufSlcblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUJpZ1VJbnQ2NEJFID0gZGVmaW5lQmlnSW50TWV0aG9kKGZ1bmN0aW9uIHdyaXRlQmlnVUludDY0QkUgKHZhbHVlLCBvZmZzZXQgPSAwKSB7XG4gIHJldHVybiB3cnRCaWdVSW50NjRCRSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBCaWdJbnQoMCksIEJpZ0ludCgnMHhmZmZmZmZmZmZmZmZmZmZmJykpXG59KVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50TEUgPSBmdW5jdGlvbiB3cml0ZUludExFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNvbnN0IGxpbWl0ID0gTWF0aC5wb3coMiwgKDggKiBieXRlTGVuZ3RoKSAtIDEpXG5cbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBsaW1pdCAtIDEsIC1saW1pdClcbiAgfVxuXG4gIGxldCBpID0gMFxuICBsZXQgbXVsID0gMVxuICBsZXQgc3ViID0gMFxuICB0aGlzW29mZnNldF0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICBpZiAodmFsdWUgPCAwICYmIHN1YiA9PT0gMCAmJiB0aGlzW29mZnNldCArIGkgLSAxXSAhPT0gMCkge1xuICAgICAgc3ViID0gMVxuICAgIH1cbiAgICB0aGlzW29mZnNldCArIGldID0gKCh2YWx1ZSAvIG11bCkgPj4gMCkgLSBzdWIgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50QkUgPSBmdW5jdGlvbiB3cml0ZUludEJFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNvbnN0IGxpbWl0ID0gTWF0aC5wb3coMiwgKDggKiBieXRlTGVuZ3RoKSAtIDEpXG5cbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBsaW1pdCAtIDEsIC1saW1pdClcbiAgfVxuXG4gIGxldCBpID0gYnl0ZUxlbmd0aCAtIDFcbiAgbGV0IG11bCA9IDFcbiAgbGV0IHN1YiA9IDBcbiAgdGhpc1tvZmZzZXQgKyBpXSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoLS1pID49IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICBpZiAodmFsdWUgPCAwICYmIHN1YiA9PT0gMCAmJiB0aGlzW29mZnNldCArIGkgKyAxXSAhPT0gMCkge1xuICAgICAgc3ViID0gMVxuICAgIH1cbiAgICB0aGlzW29mZnNldCArIGldID0gKCh2YWx1ZSAvIG11bCkgPj4gMCkgLSBzdWIgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50OCA9IGZ1bmN0aW9uIHdyaXRlSW50OCAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDEsIDB4N2YsIC0weDgwKVxuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmYgKyB2YWx1ZSArIDFcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2TEUgPSBmdW5jdGlvbiB3cml0ZUludDE2TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweDdmZmYsIC0weDgwMDApXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkJFID0gZnVuY3Rpb24gd3JpdGVJbnQxNkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHg3ZmZmLCAtMHg4MDAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDgpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJMRSA9IGZ1bmN0aW9uIHdyaXRlSW50MzJMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiAxNilcbiAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSA+Pj4gMjQpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkJFID0gZnVuY3Rpb24gd3JpdGVJbnQzMkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmZmZmZiArIHZhbHVlICsgMVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDI0KVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiAxNilcbiAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gOClcbiAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVCaWdJbnQ2NExFID0gZGVmaW5lQmlnSW50TWV0aG9kKGZ1bmN0aW9uIHdyaXRlQmlnSW50NjRMRSAodmFsdWUsIG9mZnNldCA9IDApIHtcbiAgcmV0dXJuIHdydEJpZ1VJbnQ2NExFKHRoaXMsIHZhbHVlLCBvZmZzZXQsIC1CaWdJbnQoJzB4ODAwMDAwMDAwMDAwMDAwMCcpLCBCaWdJbnQoJzB4N2ZmZmZmZmZmZmZmZmZmZicpKVxufSlcblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUJpZ0ludDY0QkUgPSBkZWZpbmVCaWdJbnRNZXRob2QoZnVuY3Rpb24gd3JpdGVCaWdJbnQ2NEJFICh2YWx1ZSwgb2Zmc2V0ID0gMCkge1xuICByZXR1cm4gd3J0QmlnVUludDY0QkUodGhpcywgdmFsdWUsIG9mZnNldCwgLUJpZ0ludCgnMHg4MDAwMDAwMDAwMDAwMDAwJyksIEJpZ0ludCgnMHg3ZmZmZmZmZmZmZmZmZmZmJykpXG59KVxuXG5mdW5jdGlvbiBjaGVja0lFRUU3NTQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgZXh0LCBtYXgsIG1pbikge1xuICBpZiAob2Zmc2V0ICsgZXh0ID4gYnVmLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG4gIGlmIChvZmZzZXQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbn1cblxuZnVuY3Rpb24gd3JpdGVGbG9hdCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tJRUVFNzU0KGJ1ZiwgdmFsdWUsIG9mZnNldCwgNCwgMy40MDI4MjM0NjYzODUyODg2ZSszOCwgLTMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgpXG4gIH1cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgMjMsIDQpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdExFID0gZnVuY3Rpb24gd3JpdGVGbG9hdExFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0QkUgPSBmdW5jdGlvbiB3cml0ZUZsb2F0QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gd3JpdGVEb3VibGUgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrSUVFRTc1NChidWYsIHZhbHVlLCBvZmZzZXQsIDgsIDEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4LCAtMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgpXG4gIH1cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgNTIsIDgpXG4gIHJldHVybiBvZmZzZXQgKyA4XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVMRSA9IGZ1bmN0aW9uIHdyaXRlRG91YmxlTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUJFID0gZnVuY3Rpb24gd3JpdGVEb3VibGVCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuLy8gY29weSh0YXJnZXRCdWZmZXIsIHRhcmdldFN0YXJ0PTAsIHNvdXJjZVN0YXJ0PTAsIHNvdXJjZUVuZD1idWZmZXIubGVuZ3RoKVxuQnVmZmVyLnByb3RvdHlwZS5jb3B5ID0gZnVuY3Rpb24gY29weSAodGFyZ2V0LCB0YXJnZXRTdGFydCwgc3RhcnQsIGVuZCkge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcih0YXJnZXQpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdhcmd1bWVudCBzaG91bGQgYmUgYSBCdWZmZXInKVxuICBpZiAoIXN0YXJ0KSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgJiYgZW5kICE9PSAwKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0U3RhcnQgPj0gdGFyZ2V0Lmxlbmd0aCkgdGFyZ2V0U3RhcnQgPSB0YXJnZXQubGVuZ3RoXG4gIGlmICghdGFyZ2V0U3RhcnQpIHRhcmdldFN0YXJ0ID0gMFxuICBpZiAoZW5kID4gMCAmJiBlbmQgPCBzdGFydCkgZW5kID0gc3RhcnRcblxuICAvLyBDb3B5IDAgYnl0ZXM7IHdlJ3JlIGRvbmVcbiAgaWYgKGVuZCA9PT0gc3RhcnQpIHJldHVybiAwXG4gIGlmICh0YXJnZXQubGVuZ3RoID09PSAwIHx8IHRoaXMubGVuZ3RoID09PSAwKSByZXR1cm4gMFxuXG4gIC8vIEZhdGFsIGVycm9yIGNvbmRpdGlvbnNcbiAgaWYgKHRhcmdldFN0YXJ0IDwgMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCd0YXJnZXRTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgfVxuICBpZiAoc3RhcnQgPCAwIHx8IHN0YXJ0ID49IHRoaXMubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbiAgaWYgKGVuZCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdzb3VyY2VFbmQgb3V0IG9mIGJvdW5kcycpXG5cbiAgLy8gQXJlIHdlIG9vYj9cbiAgaWYgKGVuZCA+IHRoaXMubGVuZ3RoKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0Lmxlbmd0aCAtIHRhcmdldFN0YXJ0IDwgZW5kIC0gc3RhcnQpIHtcbiAgICBlbmQgPSB0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0U3RhcnQgKyBzdGFydFxuICB9XG5cbiAgY29uc3QgbGVuID0gZW5kIC0gc3RhcnRcblxuICBpZiAodGhpcyA9PT0gdGFyZ2V0ICYmIHR5cGVvZiBVaW50OEFycmF5LnByb3RvdHlwZS5jb3B5V2l0aGluID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gVXNlIGJ1aWx0LWluIHdoZW4gYXZhaWxhYmxlLCBtaXNzaW5nIGZyb20gSUUxMVxuICAgIHRoaXMuY29weVdpdGhpbih0YXJnZXRTdGFydCwgc3RhcnQsIGVuZClcbiAgfSBlbHNlIHtcbiAgICBVaW50OEFycmF5LnByb3RvdHlwZS5zZXQuY2FsbChcbiAgICAgIHRhcmdldCxcbiAgICAgIHRoaXMuc3ViYXJyYXkoc3RhcnQsIGVuZCksXG4gICAgICB0YXJnZXRTdGFydFxuICAgIClcbiAgfVxuXG4gIHJldHVybiBsZW5cbn1cblxuLy8gVXNhZ2U6XG4vLyAgICBidWZmZXIuZmlsbChudW1iZXJbLCBvZmZzZXRbLCBlbmRdXSlcbi8vICAgIGJ1ZmZlci5maWxsKGJ1ZmZlclssIG9mZnNldFssIGVuZF1dKVxuLy8gICAgYnVmZmVyLmZpbGwoc3RyaW5nWywgb2Zmc2V0WywgZW5kXV1bLCBlbmNvZGluZ10pXG5CdWZmZXIucHJvdG90eXBlLmZpbGwgPSBmdW5jdGlvbiBmaWxsICh2YWwsIHN0YXJ0LCBlbmQsIGVuY29kaW5nKSB7XG4gIC8vIEhhbmRsZSBzdHJpbmcgY2FzZXM6XG4gIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgIGlmICh0eXBlb2Ygc3RhcnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbmNvZGluZyA9IHN0YXJ0XG4gICAgICBzdGFydCA9IDBcbiAgICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZW5kID09PSAnc3RyaW5nJykge1xuICAgICAgZW5jb2RpbmcgPSBlbmRcbiAgICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gICAgfVxuICAgIGlmIChlbmNvZGluZyAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBlbmNvZGluZyAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2VuY29kaW5nIG11c3QgYmUgYSBzdHJpbmcnKVxuICAgIH1cbiAgICBpZiAodHlwZW9mIGVuY29kaW5nID09PSAnc3RyaW5nJyAmJiAhQnVmZmVyLmlzRW5jb2RpbmcoZW5jb2RpbmcpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgfVxuICAgIGlmICh2YWwubGVuZ3RoID09PSAxKSB7XG4gICAgICBjb25zdCBjb2RlID0gdmFsLmNoYXJDb2RlQXQoMClcbiAgICAgIGlmICgoZW5jb2RpbmcgPT09ICd1dGY4JyAmJiBjb2RlIDwgMTI4KSB8fFxuICAgICAgICAgIGVuY29kaW5nID09PSAnbGF0aW4xJykge1xuICAgICAgICAvLyBGYXN0IHBhdGg6IElmIGB2YWxgIGZpdHMgaW50byBhIHNpbmdsZSBieXRlLCB1c2UgdGhhdCBudW1lcmljIHZhbHVlLlxuICAgICAgICB2YWwgPSBjb2RlXG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgdmFsID0gdmFsICYgMjU1XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgdmFsID0gTnVtYmVyKHZhbClcbiAgfVxuXG4gIC8vIEludmFsaWQgcmFuZ2VzIGFyZSBub3Qgc2V0IHRvIGEgZGVmYXVsdCwgc28gY2FuIHJhbmdlIGNoZWNrIGVhcmx5LlxuICBpZiAoc3RhcnQgPCAwIHx8IHRoaXMubGVuZ3RoIDwgc3RhcnQgfHwgdGhpcy5sZW5ndGggPCBlbmQpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignT3V0IG9mIHJhbmdlIGluZGV4JylcbiAgfVxuXG4gIGlmIChlbmQgPD0gc3RhcnQpIHtcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgc3RhcnQgPSBzdGFydCA+Pj4gMFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IHRoaXMubGVuZ3RoIDogZW5kID4+PiAwXG5cbiAgaWYgKCF2YWwpIHZhbCA9IDBcblxuICBsZXQgaVxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgICB0aGlzW2ldID0gdmFsXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNvbnN0IGJ5dGVzID0gQnVmZmVyLmlzQnVmZmVyKHZhbClcbiAgICAgID8gdmFsXG4gICAgICA6IEJ1ZmZlci5mcm9tKHZhbCwgZW5jb2RpbmcpXG4gICAgY29uc3QgbGVuID0gYnl0ZXMubGVuZ3RoXG4gICAgaWYgKGxlbiA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIHZhbHVlIFwiJyArIHZhbCArXG4gICAgICAgICdcIiBpcyBpbnZhbGlkIGZvciBhcmd1bWVudCBcInZhbHVlXCInKVxuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgZW5kIC0gc3RhcnQ7ICsraSkge1xuICAgICAgdGhpc1tpICsgc3RhcnRdID0gYnl0ZXNbaSAlIGxlbl1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpc1xufVxuXG4vLyBDVVNUT00gRVJST1JTXG4vLyA9PT09PT09PT09PT09XG5cbi8vIFNpbXBsaWZpZWQgdmVyc2lvbnMgZnJvbSBOb2RlLCBjaGFuZ2VkIGZvciBCdWZmZXItb25seSB1c2FnZVxuY29uc3QgZXJyb3JzID0ge31cbmZ1bmN0aW9uIEUgKHN5bSwgZ2V0TWVzc2FnZSwgQmFzZSkge1xuICBlcnJvcnNbc3ltXSA9IGNsYXNzIE5vZGVFcnJvciBleHRlbmRzIEJhc2Uge1xuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgIHN1cGVyKClcblxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdtZXNzYWdlJywge1xuICAgICAgICB2YWx1ZTogZ2V0TWVzc2FnZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICB9KVxuXG4gICAgICAvLyBBZGQgdGhlIGVycm9yIGNvZGUgdG8gdGhlIG5hbWUgdG8gaW5jbHVkZSBpdCBpbiB0aGUgc3RhY2sgdHJhY2UuXG4gICAgICB0aGlzLm5hbWUgPSBgJHt0aGlzLm5hbWV9IFske3N5bX1dYFxuICAgICAgLy8gQWNjZXNzIHRoZSBzdGFjayB0byBnZW5lcmF0ZSB0aGUgZXJyb3IgbWVzc2FnZSBpbmNsdWRpbmcgdGhlIGVycm9yIGNvZGVcbiAgICAgIC8vIGZyb20gdGhlIG5hbWUuXG4gICAgICB0aGlzLnN0YWNrIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLWV4cHJlc3Npb25zXG4gICAgICAvLyBSZXNldCB0aGUgbmFtZSB0byB0aGUgYWN0dWFsIG5hbWUuXG4gICAgICBkZWxldGUgdGhpcy5uYW1lXG4gICAgfVxuXG4gICAgZ2V0IGNvZGUgKCkge1xuICAgICAgcmV0dXJuIHN5bVxuICAgIH1cblxuICAgIHNldCBjb2RlICh2YWx1ZSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdjb2RlJywge1xuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgICAgfSlcbiAgICB9XG5cbiAgICB0b1N0cmluZyAoKSB7XG4gICAgICByZXR1cm4gYCR7dGhpcy5uYW1lfSBbJHtzeW19XTogJHt0aGlzLm1lc3NhZ2V9YFxuICAgIH1cbiAgfVxufVxuXG5FKCdFUlJfQlVGRkVSX09VVF9PRl9CT1VORFMnLFxuICBmdW5jdGlvbiAobmFtZSkge1xuICAgIGlmIChuYW1lKSB7XG4gICAgICByZXR1cm4gYCR7bmFtZX0gaXMgb3V0c2lkZSBvZiBidWZmZXIgYm91bmRzYFxuICAgIH1cblxuICAgIHJldHVybiAnQXR0ZW1wdCB0byBhY2Nlc3MgbWVtb3J5IG91dHNpZGUgYnVmZmVyIGJvdW5kcydcbiAgfSwgUmFuZ2VFcnJvcilcbkUoJ0VSUl9JTlZBTElEX0FSR19UWVBFJyxcbiAgZnVuY3Rpb24gKG5hbWUsIGFjdHVhbCkge1xuICAgIHJldHVybiBgVGhlIFwiJHtuYW1lfVwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBudW1iZXIuIFJlY2VpdmVkIHR5cGUgJHt0eXBlb2YgYWN0dWFsfWBcbiAgfSwgVHlwZUVycm9yKVxuRSgnRVJSX09VVF9PRl9SQU5HRScsXG4gIGZ1bmN0aW9uIChzdHIsIHJhbmdlLCBpbnB1dCkge1xuICAgIGxldCBtc2cgPSBgVGhlIHZhbHVlIG9mIFwiJHtzdHJ9XCIgaXMgb3V0IG9mIHJhbmdlLmBcbiAgICBsZXQgcmVjZWl2ZWQgPSBpbnB1dFxuICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKGlucHV0KSAmJiBNYXRoLmFicyhpbnB1dCkgPiAyICoqIDMyKSB7XG4gICAgICByZWNlaXZlZCA9IGFkZE51bWVyaWNhbFNlcGFyYXRvcihTdHJpbmcoaW5wdXQpKVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGlucHV0ID09PSAnYmlnaW50Jykge1xuICAgICAgcmVjZWl2ZWQgPSBTdHJpbmcoaW5wdXQpXG4gICAgICBpZiAoaW5wdXQgPiBCaWdJbnQoMikgKiogQmlnSW50KDMyKSB8fCBpbnB1dCA8IC0oQmlnSW50KDIpICoqIEJpZ0ludCgzMikpKSB7XG4gICAgICAgIHJlY2VpdmVkID0gYWRkTnVtZXJpY2FsU2VwYXJhdG9yKHJlY2VpdmVkKVxuICAgICAgfVxuICAgICAgcmVjZWl2ZWQgKz0gJ24nXG4gICAgfVxuICAgIG1zZyArPSBgIEl0IG11c3QgYmUgJHtyYW5nZX0uIFJlY2VpdmVkICR7cmVjZWl2ZWR9YFxuICAgIHJldHVybiBtc2dcbiAgfSwgUmFuZ2VFcnJvcilcblxuZnVuY3Rpb24gYWRkTnVtZXJpY2FsU2VwYXJhdG9yICh2YWwpIHtcbiAgbGV0IHJlcyA9ICcnXG4gIGxldCBpID0gdmFsLmxlbmd0aFxuICBjb25zdCBzdGFydCA9IHZhbFswXSA9PT0gJy0nID8gMSA6IDBcbiAgZm9yICg7IGkgPj0gc3RhcnQgKyA0OyBpIC09IDMpIHtcbiAgICByZXMgPSBgXyR7dmFsLnNsaWNlKGkgLSAzLCBpKX0ke3Jlc31gXG4gIH1cbiAgcmV0dXJuIGAke3ZhbC5zbGljZSgwLCBpKX0ke3Jlc31gXG59XG5cbi8vIENIRUNLIEZVTkNUSU9OU1xuLy8gPT09PT09PT09PT09PT09XG5cbmZ1bmN0aW9uIGNoZWNrQm91bmRzIChidWYsIG9mZnNldCwgYnl0ZUxlbmd0aCkge1xuICB2YWxpZGF0ZU51bWJlcihvZmZzZXQsICdvZmZzZXQnKVxuICBpZiAoYnVmW29mZnNldF0gPT09IHVuZGVmaW5lZCB8fCBidWZbb2Zmc2V0ICsgYnl0ZUxlbmd0aF0gPT09IHVuZGVmaW5lZCkge1xuICAgIGJvdW5kc0Vycm9yKG9mZnNldCwgYnVmLmxlbmd0aCAtIChieXRlTGVuZ3RoICsgMSkpXG4gIH1cbn1cblxuZnVuY3Rpb24gY2hlY2tJbnRCSSAodmFsdWUsIG1pbiwgbWF4LCBidWYsIG9mZnNldCwgYnl0ZUxlbmd0aCkge1xuICBpZiAodmFsdWUgPiBtYXggfHwgdmFsdWUgPCBtaW4pIHtcbiAgICBjb25zdCBuID0gdHlwZW9mIG1pbiA9PT0gJ2JpZ2ludCcgPyAnbicgOiAnJ1xuICAgIGxldCByYW5nZVxuICAgIGlmIChieXRlTGVuZ3RoID4gMykge1xuICAgICAgaWYgKG1pbiA9PT0gMCB8fCBtaW4gPT09IEJpZ0ludCgwKSkge1xuICAgICAgICByYW5nZSA9IGA+PSAwJHtufSBhbmQgPCAyJHtufSAqKiAkeyhieXRlTGVuZ3RoICsgMSkgKiA4fSR7bn1gXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByYW5nZSA9IGA+PSAtKDIke259ICoqICR7KGJ5dGVMZW5ndGggKyAxKSAqIDggLSAxfSR7bn0pIGFuZCA8IDIgKiogYCArXG4gICAgICAgICAgICAgICAgYCR7KGJ5dGVMZW5ndGggKyAxKSAqIDggLSAxfSR7bn1gXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJhbmdlID0gYD49ICR7bWlufSR7bn0gYW5kIDw9ICR7bWF4fSR7bn1gXG4gICAgfVxuICAgIHRocm93IG5ldyBlcnJvcnMuRVJSX09VVF9PRl9SQU5HRSgndmFsdWUnLCByYW5nZSwgdmFsdWUpXG4gIH1cbiAgY2hlY2tCb3VuZHMoYnVmLCBvZmZzZXQsIGJ5dGVMZW5ndGgpXG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlTnVtYmVyICh2YWx1ZSwgbmFtZSkge1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBlcnJvcnMuRVJSX0lOVkFMSURfQVJHX1RZUEUobmFtZSwgJ251bWJlcicsIHZhbHVlKVxuICB9XG59XG5cbmZ1bmN0aW9uIGJvdW5kc0Vycm9yICh2YWx1ZSwgbGVuZ3RoLCB0eXBlKSB7XG4gIGlmIChNYXRoLmZsb29yKHZhbHVlKSAhPT0gdmFsdWUpIHtcbiAgICB2YWxpZGF0ZU51bWJlcih2YWx1ZSwgdHlwZSlcbiAgICB0aHJvdyBuZXcgZXJyb3JzLkVSUl9PVVRfT0ZfUkFOR0UodHlwZSB8fCAnb2Zmc2V0JywgJ2FuIGludGVnZXInLCB2YWx1ZSlcbiAgfVxuXG4gIGlmIChsZW5ndGggPCAwKSB7XG4gICAgdGhyb3cgbmV3IGVycm9ycy5FUlJfQlVGRkVSX09VVF9PRl9CT1VORFMoKVxuICB9XG5cbiAgdGhyb3cgbmV3IGVycm9ycy5FUlJfT1VUX09GX1JBTkdFKHR5cGUgfHwgJ29mZnNldCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgPj0gJHt0eXBlID8gMSA6IDB9IGFuZCA8PSAke2xlbmd0aH1gLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUpXG59XG5cbi8vIEhFTFBFUiBGVU5DVElPTlNcbi8vID09PT09PT09PT09PT09PT1cblxuY29uc3QgSU5WQUxJRF9CQVNFNjRfUkUgPSAvW14rLzAtOUEtWmEtei1fXS9nXG5cbmZ1bmN0aW9uIGJhc2U2NGNsZWFuIChzdHIpIHtcbiAgLy8gTm9kZSB0YWtlcyBlcXVhbCBzaWducyBhcyBlbmQgb2YgdGhlIEJhc2U2NCBlbmNvZGluZ1xuICBzdHIgPSBzdHIuc3BsaXQoJz0nKVswXVxuICAvLyBOb2RlIHN0cmlwcyBvdXQgaW52YWxpZCBjaGFyYWN0ZXJzIGxpa2UgXFxuIGFuZCBcXHQgZnJvbSB0aGUgc3RyaW5nLCBiYXNlNjQtanMgZG9lcyBub3RcbiAgc3RyID0gc3RyLnRyaW0oKS5yZXBsYWNlKElOVkFMSURfQkFTRTY0X1JFLCAnJylcbiAgLy8gTm9kZSBjb252ZXJ0cyBzdHJpbmdzIHdpdGggbGVuZ3RoIDwgMiB0byAnJ1xuICBpZiAoc3RyLmxlbmd0aCA8IDIpIHJldHVybiAnJ1xuICAvLyBOb2RlIGFsbG93cyBmb3Igbm9uLXBhZGRlZCBiYXNlNjQgc3RyaW5ncyAobWlzc2luZyB0cmFpbGluZyA9PT0pLCBiYXNlNjQtanMgZG9lcyBub3RcbiAgd2hpbGUgKHN0ci5sZW5ndGggJSA0ICE9PSAwKSB7XG4gICAgc3RyID0gc3RyICsgJz0nXG4gIH1cbiAgcmV0dXJuIHN0clxufVxuXG5mdW5jdGlvbiB1dGY4VG9CeXRlcyAoc3RyaW5nLCB1bml0cykge1xuICB1bml0cyA9IHVuaXRzIHx8IEluZmluaXR5XG4gIGxldCBjb2RlUG9pbnRcbiAgY29uc3QgbGVuZ3RoID0gc3RyaW5nLmxlbmd0aFxuICBsZXQgbGVhZFN1cnJvZ2F0ZSA9IG51bGxcbiAgY29uc3QgYnl0ZXMgPSBbXVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBjb2RlUG9pbnQgPSBzdHJpbmcuY2hhckNvZGVBdChpKVxuXG4gICAgLy8gaXMgc3Vycm9nYXRlIGNvbXBvbmVudFxuICAgIGlmIChjb2RlUG9pbnQgPiAweEQ3RkYgJiYgY29kZVBvaW50IDwgMHhFMDAwKSB7XG4gICAgICAvLyBsYXN0IGNoYXIgd2FzIGEgbGVhZFxuICAgICAgaWYgKCFsZWFkU3Vycm9nYXRlKSB7XG4gICAgICAgIC8vIG5vIGxlYWQgeWV0XG4gICAgICAgIGlmIChjb2RlUG9pbnQgPiAweERCRkYpIHtcbiAgICAgICAgICAvLyB1bmV4cGVjdGVkIHRyYWlsXG4gICAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfSBlbHNlIGlmIChpICsgMSA9PT0gbGVuZ3RoKSB7XG4gICAgICAgICAgLy8gdW5wYWlyZWQgbGVhZFxuICAgICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICAvLyB2YWxpZCBsZWFkXG4gICAgICAgIGxlYWRTdXJyb2dhdGUgPSBjb2RlUG9pbnRcblxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICAvLyAyIGxlYWRzIGluIGEgcm93XG4gICAgICBpZiAoY29kZVBvaW50IDwgMHhEQzAwKSB7XG4gICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICBsZWFkU3Vycm9nYXRlID0gY29kZVBvaW50XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8vIHZhbGlkIHN1cnJvZ2F0ZSBwYWlyXG4gICAgICBjb2RlUG9pbnQgPSAobGVhZFN1cnJvZ2F0ZSAtIDB4RDgwMCA8PCAxMCB8IGNvZGVQb2ludCAtIDB4REMwMCkgKyAweDEwMDAwXG4gICAgfSBlbHNlIGlmIChsZWFkU3Vycm9nYXRlKSB7XG4gICAgICAvLyB2YWxpZCBibXAgY2hhciwgYnV0IGxhc3QgY2hhciB3YXMgYSBsZWFkXG4gICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICB9XG5cbiAgICBsZWFkU3Vycm9nYXRlID0gbnVsbFxuXG4gICAgLy8gZW5jb2RlIHV0ZjhcbiAgICBpZiAoY29kZVBvaW50IDwgMHg4MCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAxKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKGNvZGVQb2ludClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4ODAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDIpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgfCAweEMwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHgxMDAwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAzKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHhDIHwgMHhFMCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHgxMTAwMDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gNCkgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4MTIgfCAweEYwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHhDICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNvZGUgcG9pbnQnKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBieXRlc1xufVxuXG5mdW5jdGlvbiBhc2NpaVRvQnl0ZXMgKHN0cikge1xuICBjb25zdCBieXRlQXJyYXkgPSBbXVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIC8vIE5vZGUncyBjb2RlIHNlZW1zIHRvIGJlIGRvaW5nIHRoaXMgYW5kIG5vdCAmIDB4N0YuLlxuICAgIGJ5dGVBcnJheS5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpICYgMHhGRilcbiAgfVxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVUb0J5dGVzIChzdHIsIHVuaXRzKSB7XG4gIGxldCBjLCBoaSwgbG9cbiAgY29uc3QgYnl0ZUFycmF5ID0gW11cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKHVuaXRzIC09IDIpIDwgMCkgYnJlYWtcblxuICAgIGMgPSBzdHIuY2hhckNvZGVBdChpKVxuICAgIGhpID0gYyA+PiA4XG4gICAgbG8gPSBjICUgMjU2XG4gICAgYnl0ZUFycmF5LnB1c2gobG8pXG4gICAgYnl0ZUFycmF5LnB1c2goaGkpXG4gIH1cblxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFRvQnl0ZXMgKHN0cikge1xuICByZXR1cm4gYmFzZTY0LnRvQnl0ZUFycmF5KGJhc2U2NGNsZWFuKHN0cikpXG59XG5cbmZ1bmN0aW9uIGJsaXRCdWZmZXIgKHNyYywgZHN0LCBvZmZzZXQsIGxlbmd0aCkge1xuICBsZXQgaVxuICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKGkgKyBvZmZzZXQgPj0gZHN0Lmxlbmd0aCkgfHwgKGkgPj0gc3JjLmxlbmd0aCkpIGJyZWFrXG4gICAgZHN0W2kgKyBvZmZzZXRdID0gc3JjW2ldXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuLy8gQXJyYXlCdWZmZXIgb3IgVWludDhBcnJheSBvYmplY3RzIGZyb20gb3RoZXIgY29udGV4dHMgKGkuZS4gaWZyYW1lcykgZG8gbm90IHBhc3Ncbi8vIHRoZSBgaW5zdGFuY2VvZmAgY2hlY2sgYnV0IHRoZXkgc2hvdWxkIGJlIHRyZWF0ZWQgYXMgb2YgdGhhdCB0eXBlLlxuLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2J1ZmZlci9pc3N1ZXMvMTY2XG5mdW5jdGlvbiBpc0luc3RhbmNlIChvYmosIHR5cGUpIHtcbiAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIHR5cGUgfHxcbiAgICAob2JqICE9IG51bGwgJiYgb2JqLmNvbnN0cnVjdG9yICE9IG51bGwgJiYgb2JqLmNvbnN0cnVjdG9yLm5hbWUgIT0gbnVsbCAmJlxuICAgICAgb2JqLmNvbnN0cnVjdG9yLm5hbWUgPT09IHR5cGUubmFtZSlcbn1cbmZ1bmN0aW9uIG51bWJlcklzTmFOIChvYmopIHtcbiAgLy8gRm9yIElFMTEgc3VwcG9ydFxuICByZXR1cm4gb2JqICE9PSBvYmogLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zZWxmLWNvbXBhcmVcbn1cblxuLy8gQ3JlYXRlIGxvb2t1cCB0YWJsZSBmb3IgYHRvU3RyaW5nKCdoZXgnKWBcbi8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9idWZmZXIvaXNzdWVzLzIxOVxuY29uc3QgaGV4U2xpY2VMb29rdXBUYWJsZSA9IChmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGFscGhhYmV0ID0gJzAxMjM0NTY3ODlhYmNkZWYnXG4gIGNvbnN0IHRhYmxlID0gbmV3IEFycmF5KDI1NilcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNjsgKytpKSB7XG4gICAgY29uc3QgaTE2ID0gaSAqIDE2XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxNjsgKytqKSB7XG4gICAgICB0YWJsZVtpMTYgKyBqXSA9IGFscGhhYmV0W2ldICsgYWxwaGFiZXRbal1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRhYmxlXG59KSgpXG5cbi8vIFJldHVybiBub3QgZnVuY3Rpb24gd2l0aCBFcnJvciBpZiBCaWdJbnQgbm90IHN1cHBvcnRlZFxuZnVuY3Rpb24gZGVmaW5lQmlnSW50TWV0aG9kIChmbikge1xuICByZXR1cm4gdHlwZW9mIEJpZ0ludCA9PT0gJ3VuZGVmaW5lZCcgPyBCdWZmZXJCaWdJbnROb3REZWZpbmVkIDogZm5cbn1cblxuZnVuY3Rpb24gQnVmZmVyQmlnSW50Tm90RGVmaW5lZCAoKSB7XG4gIHRocm93IG5ldyBFcnJvcignQmlnSW50IG5vdCBzdXBwb3J0ZWQnKVxufVxuIiwgImltcG9ydCB7IEJ1ZmZlciBhcyBOb2RlQnVmZmVyIH0gZnJvbSAnYnVmZmVyJ1xuZXhwb3J0IGNvbnN0IEJ1ZmZlciA9IE5vZGVCdWZmZXJcbiIsICIvKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogR1BMLTMuMC1vci1sYXRlciAqL1xyXG4vKiBDb3B5cmlnaHQgXHUwMEE5IDIwMjUgSW5rZGV4ICovXHJcblxyXG4vLyBUT0RPOlxyXG4vLyAtIEZpeCBleGNsdWRlIHNlYXJjaFxyXG4vLyAtIEFkZCB0aGUgRW5nbGlzaCBuYW1lIHRvIHRoZSB0aXRsZSB2aWV3XHJcbi8vIC0gQWRkIGFkZGl0aW9uYWwgaW5mbyB0byB0aGUgdGl0bGUgdmlld1xyXG4vLyAtIE1ha2UgZ2V0Q2hhcHRlckRldGFpbHMgb25seSByZXR1cm4gbmV3IGNoYXB0ZXJzXHJcbi8vIC0gQWRkIGNvbnRlbnQgc2V0dGluZ3Mgc3VwcG9ydCB0byBzZWFyY2hcclxuLy8gLSBSZW1vdmUgdGhlIGNvbnRlbnQuanNvbiBmaWxlIGFuZCBzd2l0Y2ggdG8gY2hlZXJpb1xyXG5cclxuaW1wb3J0IHtcclxuICBCYXNpY1JhdGVMaW1pdGVyLFxyXG4gIENvbnRlbnRSYXRpbmcsXHJcbiAgRGlzY292ZXJTZWN0aW9uVHlwZSxcclxuICBGb3JtLFxyXG4gIHR5cGUgQ2hhcHRlcixcclxuICB0eXBlIENoYXB0ZXJEZXRhaWxzLFxyXG4gIHR5cGUgQ2hhcHRlclByb3ZpZGluZyxcclxuICB0eXBlIERpc2NvdmVyU2VjdGlvbixcclxuICB0eXBlIERpc2NvdmVyU2VjdGlvbkl0ZW0sXHJcbiAgdHlwZSBEaXNjb3ZlclNlY3Rpb25Qcm92aWRpbmcsXHJcbiAgdHlwZSBFeHRlbnNpb24sXHJcbiAgdHlwZSBNYW5nYVByb3ZpZGluZyxcclxuICB0eXBlIFBhZ2VkUmVzdWx0cyxcclxuICB0eXBlIFNlYXJjaEZpbHRlcixcclxuICB0eXBlIFNlYXJjaFF1ZXJ5LFxyXG4gIHR5cGUgU2VhcmNoUmVzdWx0SXRlbSxcclxuICB0eXBlIFNlYXJjaFJlc3VsdHNQcm92aWRpbmcsXHJcbiAgdHlwZSBTZXR0aW5nc0Zvcm1Qcm92aWRpbmcsXHJcbiAgdHlwZSBTb3VyY2VNYW5nYSxcclxuICB0eXBlIFRhZyxcclxuICB0eXBlIFRhZ1NlY3Rpb24sXHJcbn0gZnJvbSBcIkBwYXBlcmJhY2svdHlwZXNcIjtcclxuLy8gVGVtcGxhdGUgY29udGVudCBmaWxlXHJcbmltcG9ydCBjb250ZW50IGZyb20gXCIuL2NvbnRlbnQuanNvblwiO1xyXG4vLyBFeHRlbnNpb24gZm9ybXMgZmlsZVxyXG5pbXBvcnQgeyBTZXR0aW5nc0Zvcm0gfSBmcm9tIFwiLi9mb3Jtc1wiO1xyXG4vLyBFeHRlbnNpb24gbmV0d29yayBmaWxlXHJcbmltcG9ydCB7IE1haW5JbnRlcmNlcHRvciB9IGZyb20gXCIuL25ldHdvcmtcIjtcclxuXHJcbi8vIFNob3VsZCBtYXRjaCB0aGUgY2FwYWJpbGl0aWVzIHdoaWNoIHlvdSBkZWZpbmVkIGluIHBiY29uZmlnLnRzXHJcbnR5cGUgQ29udGVudFRlbXBsYXRlSW1wbGVtZW50YXRpb24gPSBTZXR0aW5nc0Zvcm1Qcm92aWRpbmcgJlxyXG4gIEV4dGVuc2lvbiAmXHJcbiAgRGlzY292ZXJTZWN0aW9uUHJvdmlkaW5nICZcclxuICBTZWFyY2hSZXN1bHRzUHJvdmlkaW5nICZcclxuICBNYW5nYVByb3ZpZGluZyAmXHJcbiAgQ2hhcHRlclByb3ZpZGluZztcclxuXHJcbi8vIE1haW4gZXh0ZW5zaW9uIGNsYXNzXHJcbmV4cG9ydCBjbGFzcyBDb250ZW50VGVtcGxhdGVFeHRlbnNpb24gaW1wbGVtZW50cyBDb250ZW50VGVtcGxhdGVJbXBsZW1lbnRhdGlvbiB7XHJcbiAgLy8gSW1wbGVtZW50YXRpb24gb2YgdGhlIG1haW4gcmF0ZSBsaW1pdGVyXHJcbiAgbWFpblJhdGVMaW1pdGVyID0gbmV3IEJhc2ljUmF0ZUxpbWl0ZXIoXCJtYWluXCIsIHtcclxuICAgIG51bWJlck9mUmVxdWVzdHM6IDE1LFxyXG4gICAgYnVmZmVySW50ZXJ2YWw6IDEwLFxyXG4gICAgaWdub3JlSW1hZ2VzOiB0cnVlLFxyXG4gIH0pO1xyXG5cclxuICAvLyBJbXBsZW1lbnRhdGlvbiBvZiB0aGUgbWFpbiBpbnRlcmNlcHRvclxyXG4gIG1haW5JbnRlcmNlcHRvciA9IG5ldyBNYWluSW50ZXJjZXB0b3IoXCJtYWluXCIpO1xyXG5cclxuICAvLyBNZXRob2QgZnJvbSB0aGUgRXh0ZW5zaW9uIGludGVyZmFjZSB3aGljaCB3ZSBpbXBsZW1lbnQsIGluaXRpYWxpemVzIHRoZSByYXRlIGxpbWl0ZXIsIGludGVyY2VwdG9yLCBkaXNjb3ZlciBzZWN0aW9ucyBhbmQgc2VhcmNoIGZpbHRlcnNcclxuICBhc3luYyBpbml0aWFsaXNlKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgdGhpcy5tYWluUmF0ZUxpbWl0ZXIucmVnaXN0ZXJJbnRlcmNlcHRvcigpO1xyXG4gICAgdGhpcy5tYWluSW50ZXJjZXB0b3IucmVnaXN0ZXJJbnRlcmNlcHRvcigpO1xyXG4gIH1cclxuXHJcbiAgLy8gSW1wbGVtZW50cyB0aGUgc2V0dGluZ3MgZm9ybSwgY2hlY2sgU2V0dGluZ3NGb3JtLnRzIGZvciBtb3JlIGluZm9cclxuICBhc3luYyBnZXRTZXR0aW5nc0Zvcm0oKTogUHJvbWlzZTxGb3JtPiB7XHJcbiAgICByZXR1cm4gbmV3IFNldHRpbmdzRm9ybSgpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0RGlzY292ZXJTZWN0aW9ucygpOiBQcm9taXNlPERpc2NvdmVyU2VjdGlvbltdPiB7XHJcbiAgICAvLyBGaXJzdCB0ZW1wbGF0ZSBkaXNjb3ZlciBzZWN0aW9uLCBnZXRzIHBvcHVsYXRlZCBieSB0aGUgZ2V0RGlzY292ZXJTZWN0aW9uSXRlbXMgbWV0aG9kXHJcbiAgICBjb25zdCBkaXNjb3Zlcl9zZWN0aW9uX3RlbXBsYXRlMTogRGlzY292ZXJTZWN0aW9uID0ge1xyXG4gICAgICBpZDogXCJkaXNjb3Zlci1zZWN0aW9uLXRlbXBsYXRlMVwiLFxyXG4gICAgICB0aXRsZTogXCJEaXNjb3ZlciBTZWN0aW9uIFRlbXBsYXRlIDFcIixcclxuICAgICAgc3VidGl0bGU6IFwiVGhpcyBpcyBhIHRlbXBsYXRlXCIsXHJcbiAgICAgIHR5cGU6IERpc2NvdmVyU2VjdGlvblR5cGUuZmVhdHVyZWQsXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIFNlY29uZCB0ZW1wbGF0ZSBkaXNjb3ZlciBzZWN0aW9uLCBnZXRzIHBvcHVsYXRlZCBieSB0aGUgZ2V0RGlzY292ZXJTZWN0aW9uSXRlbXMgbWV0aG9kXHJcbiAgICBjb25zdCBkaXNjb3Zlcl9zZWN0aW9uX3RlbXBsYXRlMjogRGlzY292ZXJTZWN0aW9uID0ge1xyXG4gICAgICBpZDogXCJkaXNjb3Zlci1zZWN0aW9uLXRlbXBsYXRlMlwiLFxyXG4gICAgICB0aXRsZTogXCJEaXNjb3ZlciBTZWN0aW9uIFRlbXBsYXRlIDJcIixcclxuICAgICAgc3VidGl0bGU6IFwiVGhpcyBpcyBhbm90aGVyIHRlbXBsYXRlXCIsXHJcbiAgICAgIHR5cGU6IERpc2NvdmVyU2VjdGlvblR5cGUucHJvbWluZW50Q2Fyb3VzZWwsXHJcbiAgICB9O1xyXG5cclxuICAgIC8vIFNlY29uZCB0ZW1wbGF0ZSBkaXNjb3ZlciBzZWN0aW9uLCBnZXRzIHBvcHVsYXRlZCBieSB0aGUgZ2V0RGlzY292ZXJTZWN0aW9uSXRlbXMgbWV0aG9kXHJcbiAgICBjb25zdCBkaXNjb3Zlcl9zZWN0aW9uX3RlbXBsYXRlMzogRGlzY292ZXJTZWN0aW9uID0ge1xyXG4gICAgICBpZDogXCJkaXNjb3Zlci1zZWN0aW9uLXRlbXBsYXRlM1wiLFxyXG4gICAgICB0aXRsZTogXCJEaXNjb3ZlciBTZWN0aW9uIFRlbXBsYXRlIDNcIixcclxuICAgICAgc3VidGl0bGU6IFwiVGhpcyBpcyB5ZXQgYW5vdGhlciB0ZW1wbGF0ZVwiLFxyXG4gICAgICB0eXBlOiBEaXNjb3ZlclNlY3Rpb25UeXBlLnNpbXBsZUNhcm91c2VsLFxyXG4gICAgfTtcclxuXHJcbiAgICByZXR1cm4gW2Rpc2NvdmVyX3NlY3Rpb25fdGVtcGxhdGUxLCBkaXNjb3Zlcl9zZWN0aW9uX3RlbXBsYXRlMiwgZGlzY292ZXJfc2VjdGlvbl90ZW1wbGF0ZTNdO1xyXG4gIH1cclxuXHJcbiAgLy8gUG9wdWxhdGVzIGJvdGggdGhlIGRpc2NvdmVyIHNlY3Rpb25zXHJcbiAgYXN5bmMgZ2V0RGlzY292ZXJTZWN0aW9uSXRlbXMoXHJcbiAgICBzZWN0aW9uOiBEaXNjb3ZlclNlY3Rpb24sXHJcbiAgICBtZXRhZGF0YTogbnVtYmVyIHwgdW5kZWZpbmVkLFxyXG4gICk6IFByb21pc2U8UGFnZWRSZXN1bHRzPERpc2NvdmVyU2VjdGlvbkl0ZW0+PiB7XHJcbiAgICB2b2lkIG1ldGFkYXRhO1xyXG5cclxuICAgIGxldCBpOiBudW1iZXIgPSAwO1xyXG4gICAgbGV0IGo6IG51bWJlciA9IDE7XHJcbiAgICBsZXQgdHlwZTpcclxuICAgICAgfCBcImZlYXR1cmVkQ2Fyb3VzZWxJdGVtXCJcclxuICAgICAgfCBcInNpbXBsZUNhcm91c2VsSXRlbVwiXHJcbiAgICAgIHwgXCJwcm9taW5lbnRDYXJvdXNlbEl0ZW1cIlxyXG4gICAgICB8IFwiY2hhcHRlclVwZGF0ZXNDYXJvdXNlbEl0ZW1cIlxyXG4gICAgICB8IFwiZ2VucmVzQ2Fyb3VzZWxJdGVtXCI7XHJcbiAgICBzd2l0Y2ggKHNlY3Rpb24uaWQpIHtcclxuICAgICAgY2FzZSBcImRpc2NvdmVyLXNlY3Rpb24tdGVtcGxhdGUxXCI6XHJcbiAgICAgICAgaiA9IDI7XHJcbiAgICAgICAgdHlwZSA9IFwiZmVhdHVyZWRDYXJvdXNlbEl0ZW1cIjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcImRpc2NvdmVyLXNlY3Rpb24tdGVtcGxhdGUyXCI6XHJcbiAgICAgICAgaSA9IGNvbnRlbnQubGVuZ3RoIC8gMjtcclxuICAgICAgICBqID0gMjtcclxuICAgICAgICB0eXBlID0gXCJwcm9taW5lbnRDYXJvdXNlbEl0ZW1cIjtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcImRpc2NvdmVyLXNlY3Rpb24tdGVtcGxhdGUzXCI6XHJcbiAgICAgICAgdHlwZSA9IFwic2ltcGxlQ2Fyb3VzZWxJdGVtXCI7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgaXRlbXM6IEFycmF5LmZyb20oQXJyYXkoY29udGVudC5sZW5ndGggLyBqKSkubWFwKCgpID0+IHtcclxuICAgICAgICBjb25zdCByZXN1bHQgPSB7XHJcbiAgICAgICAgICBtYW5nYUlkOiBjb250ZW50W2ldPy50aXRsZUlkLFxyXG4gICAgICAgICAgdGl0bGU6IGNvbnRlbnRbaV0/LnByaW1hcnlUaXRsZSA/IGNvbnRlbnRbaV0/LnByaW1hcnlUaXRsZSA6IFwiVW5rbm93biBUaXRsZVwiLFxyXG4gICAgICAgICAgc3VidGl0bGU6IGNvbnRlbnRbaV0/LnNlY29uZGFyeVRpdGxlc1swXSxcclxuICAgICAgICAgIGltYWdlVXJsOiBjb250ZW50W2ldPy50aHVtYm5haWxVcmwgPyBjb250ZW50W2ldPy50aHVtYm5haWxVcmwgOiBcIlwiLFxyXG4gICAgICAgICAgdHlwZTogdHlwZSxcclxuICAgICAgICB9IGFzIERpc2NvdmVyU2VjdGlvbkl0ZW07XHJcbiAgICAgICAgKytpO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgIH0pLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8vIFBvcHVsYXRlIHNlYXJjaCBmaWx0ZXJzXHJcbiAgYXN5bmMgZ2V0U2VhcmNoRmlsdGVycygpOiBQcm9taXNlPFNlYXJjaEZpbHRlcltdPiB7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6IFwic2VhcmNoLWZpbHRlci10ZW1wbGF0ZVwiLFxyXG4gICAgICAgIHR5cGU6IFwiZHJvcGRvd25cIixcclxuICAgICAgICBvcHRpb25zOiBbXHJcbiAgICAgICAgICB7IGlkOiBcImluY2x1ZGVcIiwgdmFsdWU6IFwiaW5jbHVkZVwiIH0sXHJcbiAgICAgICAgICB7IGlkOiBcImV4Y2x1ZGVcIiwgdmFsdWU6IFwiZXhjbHVkZVwiIH0sXHJcbiAgICAgICAgXSxcclxuICAgICAgICB2YWx1ZTogXCJFeGNsdWRlXCIsXHJcbiAgICAgICAgdGl0bGU6IFwiU2VhcmNoIEZpbHRlciBUZW1wbGF0ZVwiLFxyXG4gICAgICB9LFxyXG4gICAgXTtcclxuICB9XHJcblxyXG4gIC8vIFBvcHVsYXRlcyBzZWFyY2hcclxuICBhc3luYyBnZXRTZWFyY2hSZXN1bHRzKFxyXG4gICAgcXVlcnk6IFNlYXJjaFF1ZXJ5LFxyXG4gICAgbWV0YWRhdGE/OiBudW1iZXIsXHJcbiAgKTogUHJvbWlzZTxQYWdlZFJlc3VsdHM8U2VhcmNoUmVzdWx0SXRlbT4+IHtcclxuICAgIHZvaWQgbWV0YWRhdGE7XHJcblxyXG4gICAgY29uc3QgcmVzdWx0czogUGFnZWRSZXN1bHRzPFNlYXJjaFJlc3VsdEl0ZW0+ID0geyBpdGVtczogW10gfTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbnRlbnQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgY29uc3QgbWFuZ2EgPSBjb250ZW50W2ldO1xyXG4gICAgICBpZiAoIW1hbmdhKSBjb250aW51ZTtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIChtYW5nYS5wcmltYXJ5VGl0bGUudG9Mb3dlckNhc2UoKS5pbmRleE9mKHF1ZXJ5LnRpdGxlLnRvTG93ZXJDYXNlKCkpICE9IC0xICYmXHJcbiAgICAgICAgICBxdWVyeS5maWx0ZXJzWzBdPy52YWx1ZSA9PSBcImluY2x1ZGVcIikgfHxcclxuICAgICAgICAobWFuZ2EucHJpbWFyeVRpdGxlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihxdWVyeS50aXRsZS50b0xvd2VyQ2FzZSgpKSA9PSAtMSAmJlxyXG4gICAgICAgICAgcXVlcnkuZmlsdGVyc1swXT8udmFsdWUgPT0gXCJleGNsdWRlXCIpXHJcbiAgICAgICkge1xyXG4gICAgICAgIGlmIChtYW5nYS50aXRsZUlkKSB7XHJcbiAgICAgICAgICBjb25zdCByZXN1bHQ6IFNlYXJjaFJlc3VsdEl0ZW0gPSB7XHJcbiAgICAgICAgICAgIG1hbmdhSWQ6IG1hbmdhLnRpdGxlSWQsXHJcbiAgICAgICAgICAgIHRpdGxlOiBtYW5nYS5wcmltYXJ5VGl0bGUgPyBtYW5nYS5wcmltYXJ5VGl0bGUgOiBcIlVua25vd24gVGl0bGVcIixcclxuICAgICAgICAgICAgc3VidGl0bGU6IG1hbmdhLnNlY29uZGFyeVRpdGxlc1swXSA/PyBcIlwiLFxyXG4gICAgICAgICAgICBpbWFnZVVybDogbWFuZ2EudGh1bWJuYWlsVXJsID8gbWFuZ2EudGh1bWJuYWlsVXJsIDogXCJcIixcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICByZXN1bHRzLml0ZW1zLnB1c2gocmVzdWx0KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBtYW5nYS5zZWNvbmRhcnlUaXRsZXMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgIGNvbnN0IHNlY29uZGFyeVRpdGxlcyA9IG1hbmdhLnNlY29uZGFyeVRpdGxlc1tqXTtcclxuICAgICAgICAgIGlmICghc2Vjb25kYXJ5VGl0bGVzKSBjb250aW51ZTtcclxuICAgICAgICAgIGlmIChcclxuICAgICAgICAgICAgKHNlY29uZGFyeVRpdGxlcy50b0xvd2VyQ2FzZSgpLmluZGV4T2YocXVlcnkudGl0bGUudG9Mb3dlckNhc2UoKSkgIT0gLTEgJiZcclxuICAgICAgICAgICAgICBxdWVyeS5maWx0ZXJzWzBdPy52YWx1ZSA9PSBcImluY2x1ZGVcIikgfHxcclxuICAgICAgICAgICAgKHNlY29uZGFyeVRpdGxlcy50b0xvd2VyQ2FzZSgpLmluZGV4T2YocXVlcnkudGl0bGUudG9Mb3dlckNhc2UoKSkgPT0gLTEgJiZcclxuICAgICAgICAgICAgICBxdWVyeS5maWx0ZXJzWzBdPy52YWx1ZSA9PSBcImV4Y2x1ZGVcIilcclxuICAgICAgICAgICkge1xyXG4gICAgICAgICAgICBpZiAobWFuZ2EudGl0bGVJZCkge1xyXG4gICAgICAgICAgICAgIGNvbnN0IHJlc3VsdDogU2VhcmNoUmVzdWx0SXRlbSA9IHtcclxuICAgICAgICAgICAgICAgIG1hbmdhSWQ6IG1hbmdhLnRpdGxlSWQsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogbWFuZ2EucHJpbWFyeVRpdGxlID8gbWFuZ2EucHJpbWFyeVRpdGxlIDogXCJVbmtub3duIFRpdGxlXCIsXHJcbiAgICAgICAgICAgICAgICBzdWJ0aXRsZTogbWFuZ2Euc2Vjb25kYXJ5VGl0bGVzWzBdID8/IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBpbWFnZVVybDogbWFuZ2EudGh1bWJuYWlsVXJsID8gbWFuZ2EudGh1bWJuYWlsVXJsIDogXCJcIixcclxuICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgIHJlc3VsdHMuaXRlbXMucHVzaChyZXN1bHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdHM7XHJcbiAgfVxyXG5cclxuICAvLyBQb3B1bGF0ZXMgdGhlIHRpdGxlIGRldGFpbHNcclxuICBhc3luYyBnZXRNYW5nYURldGFpbHMobWFuZ2FJZDogc3RyaW5nKTogUHJvbWlzZTxTb3VyY2VNYW5nYT4ge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb250ZW50Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IG1hbmdhID0gY29udGVudFtpXTtcclxuICAgICAgaWYgKCFtYW5nYSkgY29udGludWU7XHJcbiAgICAgIGlmIChtYW5nYUlkID09IG1hbmdhLnRpdGxlSWQpIHtcclxuICAgICAgICBsZXQgY29udGVudFJhdGluZzogQ29udGVudFJhdGluZztcclxuICAgICAgICBzd2l0Y2ggKG1hbmdhLmNvbnRlbnRSYXRpbmcpIHtcclxuICAgICAgICAgIGNhc2UgXCJBRFVMVFwiOlxyXG4gICAgICAgICAgICBjb250ZW50UmF0aW5nID0gQ29udGVudFJhdGluZy5BRFVMVDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlIFwiTUFUVVJFXCI6XHJcbiAgICAgICAgICAgIGNvbnRlbnRSYXRpbmcgPSBDb250ZW50UmF0aW5nLk1BVFVSRTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBjb250ZW50UmF0aW5nID0gQ29udGVudFJhdGluZy5FVkVSWU9ORTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBnZW5yZXM6IFRhZ1NlY3Rpb24gPSB7XHJcbiAgICAgICAgICBpZDogXCJnZW5yZXNcIixcclxuICAgICAgICAgIHRpdGxlOiBcIkdlbnJlc1wiLFxyXG4gICAgICAgICAgdGFnczogW10sXHJcbiAgICAgICAgfTtcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG1hbmdhLmdlbnJlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgY29uc3QgZ2VucmUgPSBtYW5nYS5nZW5yZXNbal07XHJcbiAgICAgICAgICBpZiAoIWdlbnJlKSBjb250aW51ZTtcclxuICAgICAgICAgIGNvbnN0IHRhZ0l0ZW06IFRhZyA9IHtcclxuICAgICAgICAgICAgaWQ6IGdlbnJlLnRvTG93ZXJDYXNlKCkucmVwbGFjZShcIiBcIiwgXCItXCIpLFxyXG4gICAgICAgICAgICB0aXRsZTogZ2VucmUsXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgZ2VucmVzLnRhZ3MucHVzaCh0YWdJdGVtKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHRhZ3M6IFRhZ1NlY3Rpb24gPSB7XHJcbiAgICAgICAgICBpZDogXCJ0YWdzXCIsXHJcbiAgICAgICAgICB0aXRsZTogXCJUYWdzXCIsXHJcbiAgICAgICAgICB0YWdzOiBbXSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbWFuZ2EudGFncy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgY29uc3QgdGFnID0gbWFuZ2EudGFnc1tqXTtcclxuICAgICAgICAgIGlmICghdGFnKSBjb250aW51ZTtcclxuICAgICAgICAgIGNvbnN0IHRhZ0l0ZW06IFRhZyA9IHtcclxuICAgICAgICAgICAgaWQ6IHRhZy50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoXCIgXCIsIFwiLVwiKSxcclxuICAgICAgICAgICAgdGl0bGU6IHRhZyxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgICB0YWdzLnRhZ3MucHVzaCh0YWdJdGVtKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBtYW5nYUlkLFxyXG4gICAgICAgICAgbWFuZ2FJbmZvOiB7XHJcbiAgICAgICAgICAgIHRodW1ibmFpbFVybDogbWFuZ2EudGh1bWJuYWlsVXJsID8gbWFuZ2EudGh1bWJuYWlsVXJsIDogXCJcIixcclxuICAgICAgICAgICAgc3lub3BzaXM6IG1hbmdhLnN5bm9wc2lzID8gbWFuZ2Euc3lub3BzaXMgOiBcIk5vIHN5bm9wc2lzLlwiLFxyXG4gICAgICAgICAgICBwcmltYXJ5VGl0bGU6IG1hbmdhLnByaW1hcnlUaXRsZSA/IG1hbmdhLnByaW1hcnlUaXRsZSA6IFwiVW5rbm93biBUaXRsZVwiLFxyXG4gICAgICAgICAgICBzZWNvbmRhcnlUaXRsZXM6IG1hbmdhLnNlY29uZGFyeVRpdGxlcyA/IG1hbmdhLnNlY29uZGFyeVRpdGxlcyA6IFtdLFxyXG4gICAgICAgICAgICBjb250ZW50UmF0aW5nLFxyXG4gICAgICAgICAgICBzdGF0dXM6IG1hbmdhLnN0YXR1cyxcclxuICAgICAgICAgICAgYXV0aG9yOiBtYW5nYS5hdXRob3IsXHJcbiAgICAgICAgICAgIHJhdGluZzogbWFuZ2EucmF0aW5nLFxyXG4gICAgICAgICAgICB0YWdHcm91cHM6IFtnZW5yZXMsIHRhZ3NdLFxyXG4gICAgICAgICAgICBhcnR3b3JrVXJsczogW21hbmdhLnRodW1ibmFpbFVybF0sXHJcbiAgICAgICAgICAgIHNoYXJlVXJsOiBtYW5nYS51cmwsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHRpdGxlIHdpdGggdGhpcyBpZCBleGlzdHNcIik7XHJcbiAgfVxyXG5cclxuICAvLyBQb3B1bGF0ZXMgdGhlIGNoYXB0ZXIgbGlzdFxyXG4gIGFzeW5jIGdldENoYXB0ZXJzKHNvdXJjZU1hbmdhOiBTb3VyY2VNYW5nYSwgc2luY2VEYXRlPzogRGF0ZSk6IFByb21pc2U8Q2hhcHRlcltdPiB7XHJcbiAgICAvLyBDYW4gYmUgdXNlZCB0byBvbmx5IHJldHVybiBuZXcgY2hhcHRlcnMuIE5vdCB1c2VkIGhlcmUsIGluc3RlYWQgdGhlIHdob2xlIGNoYXB0ZXIgbGlzdCBnZXRzIHJldHVybmVkXHJcbiAgICB2b2lkIHNpbmNlRGF0ZTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbnRlbnQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgY29uc3QgbWFuZ2EgPSBjb250ZW50W2ldO1xyXG4gICAgICBpZiAoIW1hbmdhKSBjb250aW51ZTtcclxuICAgICAgaWYgKHNvdXJjZU1hbmdhLm1hbmdhSWQgPT0gbWFuZ2EudGl0bGVJZCkge1xyXG4gICAgICAgIGNvbnN0IGNoYXB0ZXJzOiBDaGFwdGVyW10gPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBtYW5nYS5jaGFwdGVycy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgY29uc3QgY2hhcHRlcnNEYXRhID0gbWFuZ2EuY2hhcHRlcnNbal07XHJcbiAgICAgICAgICBpZiAoIWNoYXB0ZXJzRGF0YSkgY29udGludWU7XHJcbiAgICAgICAgICBpZiAoY2hhcHRlcnNEYXRhLmNoYXB0ZXJJZCkge1xyXG4gICAgICAgICAgICBjb25zdCBjaGFwdGVyOiBDaGFwdGVyID0ge1xyXG4gICAgICAgICAgICAgIGNoYXB0ZXJJZDogY2hhcHRlcnNEYXRhLmNoYXB0ZXJJZCxcclxuICAgICAgICAgICAgICBzb3VyY2VNYW5nYSxcclxuICAgICAgICAgICAgICBsYW5nQ29kZTogY2hhcHRlcnNEYXRhLmxhbmd1YWdlQ29kZSA/IGNoYXB0ZXJzRGF0YS5sYW5ndWFnZUNvZGUgOiBcIkVOXCIsXHJcbiAgICAgICAgICAgICAgY2hhcE51bTogY2hhcHRlcnNEYXRhLmNoYXB0ZXJOdW1iZXIgPyBjaGFwdGVyc0RhdGEuY2hhcHRlck51bWJlciA6IGogKyAxLFxyXG4gICAgICAgICAgICAgIHRpdGxlOiBtYW5nYS5wcmltYXJ5VGl0bGUsXHJcbiAgICAgICAgICAgICAgdm9sdW1lOiBjaGFwdGVyc0RhdGEudm9sdW1lTnVtYmVyLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBjaGFwdGVycy5wdXNoKGNoYXB0ZXIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2hhcHRlcnM7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHRpdGxlIHdpdGggdGhpcyBpZCBleGlzdHNcIik7XHJcbiAgfVxyXG5cclxuICAvLyBQb3B1bGF0ZXMgYSBjaGFwdGVyIHdpdGggaW1hZ2VzXHJcbiAgYXN5bmMgZ2V0Q2hhcHRlckRldGFpbHMoY2hhcHRlcjogQ2hhcHRlcik6IFByb21pc2U8Q2hhcHRlckRldGFpbHM+IHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29udGVudC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCBtYW5nYSA9IGNvbnRlbnRbaV07XHJcbiAgICAgIGlmICghbWFuZ2EpIGNvbnRpbnVlO1xyXG4gICAgICBpZiAoY2hhcHRlci5zb3VyY2VNYW5nYS5tYW5nYUlkID09IG1hbmdhLnRpdGxlSWQpIHtcclxuICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG1hbmdhLmNoYXB0ZXJzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICBjb25zdCBjaGFwdGVyRGF0YSA9IG1hbmdhLmNoYXB0ZXJzW2pdO1xyXG4gICAgICAgICAgaWYgKCFjaGFwdGVyRGF0YSkgY29udGludWU7XHJcbiAgICAgICAgICBpZiAoY2hhcHRlci5jaGFwdGVySWQgPT0gY2hhcHRlckRhdGEuY2hhcHRlcklkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoYXB0ZXJEZXRhaWxzOiBDaGFwdGVyRGV0YWlscyA9IHtcclxuICAgICAgICAgICAgICBpZDogY2hhcHRlci5jaGFwdGVySWQsXHJcbiAgICAgICAgICAgICAgbWFuZ2FJZDogY2hhcHRlci5zb3VyY2VNYW5nYS5tYW5nYUlkLFxyXG4gICAgICAgICAgICAgIHBhZ2VzOiBjaGFwdGVyRGF0YS5wYWdlcyxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmV0dXJuIGNoYXB0ZXJEZXRhaWxzO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBjaGFwdGVyIHdpdGggdGhpcyBpZCBleGlzdHNcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRocm93IG5ldyBFcnJvcihcIk5vIHRpdGxlIHdpdGggdGhpcyBpZCBleGlzdHNcIik7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgQ29udGVudFRlbXBsYXRlID0gbmV3IENvbnRlbnRUZW1wbGF0ZUV4dGVuc2lvbigpO1xyXG4iLCAiZXhwb3J0ICogZnJvbSAnLi9pbXBsL2luZGV4LmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9DaGFwdGVyLmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9DaGFwdGVyRGV0YWlscy5qcydcbmV4cG9ydCAqIGZyb20gJy4vQ29va2llLmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9EaXNjb3ZlclNlY3Rpb25JdGVtLmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9EaXNjb3ZlclNlY3Rpb25UeXBlLmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9Ib21lU2VjdGlvbi5qcydcbmV4cG9ydCAqIGZyb20gJy4vaW5kZXguanMnXG5leHBvcnQgKiBmcm9tICcuL01hbmdhSW5mby5qcydcbmV4cG9ydCAqIGZyb20gJy4vTWFuZ2FQcm9ncmVzcy5qcydcbmV4cG9ydCAqIGZyb20gJy4vUGFnZWRSZXN1bHRzLmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9QQkNhbnZhcy5qcydcbmV4cG9ydCAqIGZyb20gJy4vUEJJbWFnZS5qcydcbmV4cG9ydCAqIGZyb20gJy4vUmVxdWVzdC5qcydcbmV4cG9ydCAqIGZyb20gJy4vUmVzcG9uc2UuanMnXG5leHBvcnQgKiBmcm9tICcuL1NlYXJjaEZpbHRlci5qcydcbmV4cG9ydCAqIGZyb20gJy4vU2VhcmNoUXVlcnkuanMnXG5leHBvcnQgKiBmcm9tICcuL1NlYXJjaFJlc3VsdEl0ZW0uanMnXG5leHBvcnQgKiBmcm9tICcuL1NvdXJjZU1hbmdhLmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9UYWcuanMnXG5leHBvcnQgKiBmcm9tICcuL1RhZ1NlY3Rpb24uanMnXG5leHBvcnQgKiBmcm9tICcuL1RyYWNrZWRNYW5nYUNoYXB0ZXJSZWFkQWN0aW9uLmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9Tb3J0aW5nT3B0aW9uLmpzJ1xuIiwgImV4cG9ydCAqIGZyb20gJy4vU2V0dGluZ3NVSS9pbmRleC5qcydcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlcy9pbmRleC5qcydcblxuZXhwb3J0ICogZnJvbSAnLi9BcHBsaWNhdGlvbi5qcydcbmV4cG9ydCAqIGZyb20gJy4vUGFwZXJiYWNrSW50ZXJjZXB0b3IuanMnXG5leHBvcnQgKiBmcm9tICcuL1NlbGVjdG9yLmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9FeHRlbnNpb24uanMnXG5leHBvcnQgKiBmcm9tICcuL0Jhc2ljUmF0ZUxpbWl0ZXIuanMnXG5leHBvcnQgKiBmcm9tICcuL0Nsb3VkZmxhcmVFcnJvci5qcydcbmV4cG9ydCAqIGZyb20gJy4vQ29va2llU3RvcmFnZUludGVyY2VwdG9yLmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9VUkwuanMnXG5leHBvcnQgKiBmcm9tICcuL1Rlc3REZWZpbml0aW9uLmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9Tb3VyY2VJbmZvLmpzJ1xuIiwgImV4cG9ydCAqIGZyb20gJy4vRm9ybS5qcydcbmV4cG9ydCAqIGZyb20gJy4vRm9ybUl0ZW1FbGVtZW50LmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9Gb3JtU2VjdGlvbi5qcydcbiIsICJpbXBvcnQgdHlwZSB7IEZvcm1TZWN0aW9uRWxlbWVudCB9IGZyb20gJy4vRm9ybVNlY3Rpb24uanMnXG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBGb3JtIHtcbiAgcmVsb2FkRm9ybSgpIHtcbiAgICAvLyBAdHMtZXhwZWN0LWVycm9yIGhpZGRlbiBmaWVsZFxuICAgIGNvbnN0IGZvcm1JZCA9IHRoaXNbJ19fdW5kZXJseWluZ19mb3JtSWQnXSBhcyBzdHJpbmcgfCB1bmRlZmluZWRcblxuICAgIGlmICghZm9ybUlkKSByZXR1cm5cblxuICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgaGlkZGVuIGZ1bmN0aW9uXG4gICAgQXBwbGljYXRpb24uZm9ybURpZENoYW5nZShmb3JtSWQpXG4gIH1cblxuICBhYnN0cmFjdCBnZXRTZWN0aW9ucygpOiBGb3JtU2VjdGlvbkVsZW1lbnRbXVxuXG4gIC8qIExpZmUgY3ljbGUgbWV0aG9kcywgYWx3YXlzIGNhbGxlZCwgZXJyb3JzIGxvZ2dlZCBidXQgaWdub3JlZCAqL1xuICBmb3JtV2lsbEFwcGVhcj8oKTogdm9pZFxuICBmb3JtRGlkQXBwZWFyPygpOiB2b2lkXG4gIGZvcm1XaWxsRGlzYXBwZWFyPygpOiB2b2lkXG4gIGZvcm1EaWREaXNhcHBlYXI/KCk6IHZvaWRcblxuICAvLyBJZiB0aGlzIHJldHVybnMgdHJ1ZSwgdGhlIGFwcCB3aWxsIGRpc3BsYXkgYFN1Ym1pdGAgYW5kIGBDYW5jZWxgIGJ1dHRvbnNcbiAgLy8gYW5kIGNhbGwgdGhlIHJlbGV2YW50IG1ldGhvZHMgd2hlbiB0aGV5IGFyZSBwcmVzc2VkXG4gIGdldCByZXF1aXJlc0V4cGxpY2l0U3VibWlzc2lvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIC8vIFRoZSBhcHAgY2FsbHMgdGhpcyBtZXRob2Qgd2hlbiB0aGUgdXNlciBwcmVzc2VzIGBTdWJtaXRgXG4gIC8vIFRocm93IGFuIGVycm9yIGhlcmUgdG8gaGFsdCB0aGUgZGlzbWlzc2FsIGFuZCBkaXNwbGF5IGFuIGFsZXJ0IHBvcHVwXG4gIGZvcm1EaWRTdWJtaXQ/KCk6IFByb21pc2U8dm9pZD5cblxuICAvLyBUaGUgYXBwIGNhbGxzIHRoaXMgbWV0aG9kIHdoZW4gdGhlIHVzZXIgcHJlc3NlcyBgQ2FuY2VsYFxuICAvLyBBbnkgZXJyb3JzIHRocm93biBmcm9tIGhlcmUgYXJlIGlnbm9yZWQgYW5kIHRoZSBkaXNtaXNzYWwgaXMgbm90IGJsb2NrZWRcbiAgZm9ybURpZENhbmNlbD8oKTogdm9pZFxufVxuIiwgImltcG9ydCB0eXBlIHsgQ29va2llIH0gZnJvbSAnLi4vLi4vQ29va2llLmpzJ1xuaW1wb3J0IHR5cGUgeyBSZXF1ZXN0IH0gZnJvbSAnLi4vLi4vUmVxdWVzdC5qcydcbmltcG9ydCB0eXBlIHsgU2VsZWN0b3JJRCB9IGZyb20gJy4uL1NlbGVjdG9yLmpzJ1xuaW1wb3J0IHsgRm9ybSB9IGZyb20gJy4vRm9ybS5qcydcblxuZXhwb3J0IGludGVyZmFjZSBGb3JtSXRlbUVsZW1lbnQ8VD4ge1xuICBpZDogc3RyaW5nXG4gIHR5cGU6IFRcbiAgaXNIaWRkZW46IGJvb2xlYW5cbn1cblxudHlwZSBUeXBlZFJvd0VsZW1lbnQ8VCwgUD4gPSBGb3JtSXRlbUVsZW1lbnQ8VD4gJiBQXG5cbnR5cGUgTGFiZWxSb3dFbGVtZW50ID0gVHlwZWRSb3dFbGVtZW50PCdsYWJlbFJvdycsIExhYmVsUm93UHJvcHM+XG50eXBlIE9BdXRoQnV0dG9uUm93RWxlbWVudCA9IFR5cGVkUm93RWxlbWVudDxcbiAgJ29hdXRoQnV0dG9uUm93JyxcbiAgT0F1dGhCdXR0b25Sb3dQcm9wc1xuPlxudHlwZSBOYXZpZ2F0aW9uUm93RWxlbWVudCA9IFR5cGVkUm93RWxlbWVudDwnbmF2aWdhdGlvblJvdycsIE5hdmlnYXRpb25Sb3dQcm9wcz5cbnR5cGUgQnV0dG9uUm93RWxlbWVudCA9IFR5cGVkUm93RWxlbWVudDwnYnV0dG9uUm93JywgQnV0dG9uUm93UHJvcHM+XG50eXBlIFNlbGVjdFJvd0VsZW1lbnQgPSBUeXBlZFJvd0VsZW1lbnQ8J3NlbGVjdFJvdycsIFNlbGVjdFJvd1Byb3BzPlxudHlwZSBUb2dnbGVSb3dFbGVtZW50ID0gVHlwZWRSb3dFbGVtZW50PCd0b2dnbGVSb3cnLCBUb2dnbGVSb3dQcm9wcz5cbnR5cGUgSW5wdXRSb3dFbGVtZW50ID0gVHlwZWRSb3dFbGVtZW50PCdpbnB1dFJvdycsIElucHV0Um93UHJvcHM+XG50eXBlIFN0ZXBwZXJSb3dFbGVtZW50ID0gVHlwZWRSb3dFbGVtZW50PCdzdGVwcGVyUm93JywgU3RlcHBlclJvd1Byb3BzPlxudHlwZSBXZWJWaWV3Um93RWxlbWVudCA9IFR5cGVkUm93RWxlbWVudDwnd2ViVmlld1JvdycsIFdlYlZpZXdSb3dQcm9wcz5cblxuZXhwb3J0IHR5cGUgTGFiZWxSb3dQcm9wcyA9IHtcbiAgdGl0bGU6IHN0cmluZ1xuICBzdWJ0aXRsZT86IHN0cmluZ1xuICB2YWx1ZT86IHN0cmluZ1xuICBpc0hpZGRlbj86IGJvb2xlYW5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIExhYmVsUm93KGlkOiBzdHJpbmcsIHByb3BzOiBMYWJlbFJvd1Byb3BzKTogTGFiZWxSb3dFbGVtZW50IHtcbiAgcmV0dXJuIHsgLi4ucHJvcHMsIGlkLCB0eXBlOiAnbGFiZWxSb3cnLCBpc0hpZGRlbjogcHJvcHMuaXNIaWRkZW4gPz8gZmFsc2UgfVxufVxuXG5leHBvcnQgdHlwZSBJbnB1dFJvd1Byb3BzID0ge1xuICB0aXRsZTogc3RyaW5nXG4gIHZhbHVlOiBzdHJpbmdcbiAgaXNIaWRkZW4/OiBib29sZWFuXG4gIG9uVmFsdWVDaGFuZ2U6IFNlbGVjdG9ySUQ8KHZhbHVlOiBzdHJpbmcpID0+IFByb21pc2U8dm9pZD4+XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBJbnB1dFJvdyhpZDogc3RyaW5nLCBwcm9wczogSW5wdXRSb3dQcm9wcyk6IElucHV0Um93RWxlbWVudCB7XG4gIHJldHVybiB7IC4uLnByb3BzLCBpZCwgdHlwZTogJ2lucHV0Um93JywgaXNIaWRkZW46IHByb3BzLmlzSGlkZGVuID8/IGZhbHNlIH1cbn1cblxuZXhwb3J0IHR5cGUgU3RlcHBlclJvd1Byb3BzID0ge1xuICB0aXRsZTogc3RyaW5nXG4gIHN1YnRpdGxlPzogc3RyaW5nXG5cbiAgdmFsdWU6IG51bWJlclxuXG4gIG1pblZhbHVlOiBudW1iZXJcbiAgbWF4VmFsdWU6IG51bWJlclxuICBzdGVwVmFsdWU6IG51bWJlclxuICBsb29wT3ZlcjogYm9vbGVhblxuXG4gIGlzSGlkZGVuPzogYm9vbGVhblxuXG4gIG9uVmFsdWVDaGFuZ2U6IFNlbGVjdG9ySUQ8KHZhbHVlOiBudW1iZXIpID0+IFByb21pc2U8dm9pZD4+XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTdGVwcGVyUm93KFxuICBpZDogc3RyaW5nLFxuICBwcm9wczogU3RlcHBlclJvd1Byb3BzXG4pOiBTdGVwcGVyUm93RWxlbWVudCB7XG4gIHJldHVybiB7XG4gICAgLi4ucHJvcHMsXG4gICAgaWQsXG4gICAgdHlwZTogJ3N0ZXBwZXJSb3cnLFxuICAgIGlzSGlkZGVuOiBwcm9wcy5pc0hpZGRlbiA/PyBmYWxzZSxcbiAgfVxufVxuXG5leHBvcnQgdHlwZSBUb2dnbGVSb3dQcm9wcyA9IHtcbiAgdGl0bGU6IHN0cmluZ1xuICBzdWJ0aXRsZT86IHN0cmluZ1xuICB2YWx1ZTogYm9vbGVhblxuICBpc0hpZGRlbj86IGJvb2xlYW5cbiAgb25WYWx1ZUNoYW5nZTogU2VsZWN0b3JJRDwodmFsdWU6IGJvb2xlYW4pID0+IFByb21pc2U8dm9pZD4+XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBUb2dnbGVSb3coaWQ6IHN0cmluZywgcHJvcHM6IFRvZ2dsZVJvd1Byb3BzKTogVG9nZ2xlUm93RWxlbWVudCB7XG4gIHJldHVybiB7IC4uLnByb3BzLCBpZCwgdHlwZTogJ3RvZ2dsZVJvdycsIGlzSGlkZGVuOiBwcm9wcy5pc0hpZGRlbiA/PyBmYWxzZSB9XG59XG5cbmV4cG9ydCB0eXBlIFNlbGVjdFJvd1Byb3BzID0ge1xuICB0aXRsZTogc3RyaW5nXG4gIHN1YnRpdGxlPzogc3RyaW5nXG4gIHZhbHVlOiBzdHJpbmdbXVxuICBtaW5JdGVtQ291bnQ6IG51bWJlclxuICBtYXhJdGVtQ291bnQ6IG51bWJlclxuICBvcHRpb25zOiB7IGlkOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmcgfVtdXG4gIGlzSGlkZGVuPzogYm9vbGVhblxuICBvblZhbHVlQ2hhbmdlOiBTZWxlY3RvcklEPCh2YWx1ZTogc3RyaW5nW10pID0+IFByb21pc2U8dm9pZD4+XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTZWxlY3RSb3coaWQ6IHN0cmluZywgcHJvcHM6IFNlbGVjdFJvd1Byb3BzKTogU2VsZWN0Um93RWxlbWVudCB7XG4gIHJldHVybiB7IC4uLnByb3BzLCBpZCwgdHlwZTogJ3NlbGVjdFJvdycsIGlzSGlkZGVuOiBwcm9wcy5pc0hpZGRlbiA/PyBmYWxzZSB9XG59XG5cbmV4cG9ydCB0eXBlIEJ1dHRvblJvd1Byb3BzID0ge1xuICB0aXRsZTogc3RyaW5nXG4gIGlzSGlkZGVuPzogYm9vbGVhblxuICBvblNlbGVjdDogU2VsZWN0b3JJRDwoKSA9PiBQcm9taXNlPHZvaWQ+PlxufVxuXG5leHBvcnQgZnVuY3Rpb24gQnV0dG9uUm93KGlkOiBzdHJpbmcsIHByb3BzOiBCdXR0b25Sb3dQcm9wcyk6IEJ1dHRvblJvd0VsZW1lbnQge1xuICByZXR1cm4geyAuLi5wcm9wcywgaWQsIHR5cGU6ICdidXR0b25Sb3cnLCBpc0hpZGRlbjogcHJvcHMuaXNIaWRkZW4gPz8gZmFsc2UgfVxufVxuXG5leHBvcnQgdHlwZSBXZWJWaWV3Um93UHJvcHMgPSB7XG4gIHRpdGxlOiBzdHJpbmdcbiAgcmVxdWVzdDogUmVxdWVzdFxuICBpc0hpZGRlbj86IGJvb2xlYW5cbiAgb25Db21wbGV0ZTogU2VsZWN0b3JJRDwoY29va2llczogQ29va2llW10pID0+IFByb21pc2U8dm9pZD4+XG4gIG9uQ2FuY2VsOiBTZWxlY3RvcklEPCgpID0+IFByb21pc2U8dm9pZD4+XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBXZWJWaWV3Um93KFxuICBpZDogc3RyaW5nLFxuICBwcm9wczogV2ViVmlld1Jvd1Byb3BzXG4pOiBXZWJWaWV3Um93RWxlbWVudCB7XG4gIHJldHVybiB7XG4gICAgLi4ucHJvcHMsXG4gICAgaWQsXG4gICAgdHlwZTogJ3dlYlZpZXdSb3cnLFxuICAgIGlzSGlkZGVuOiBwcm9wcy5pc0hpZGRlbiA/PyBmYWxzZSxcbiAgfVxufVxuXG5leHBvcnQgdHlwZSBOYXZpZ2F0aW9uUm93UHJvcHMgPSB7XG4gIHRpdGxlOiBzdHJpbmdcbiAgc3VidGl0bGU/OiBzdHJpbmdcbiAgdmFsdWU/OiBzdHJpbmdcbiAgaXNIaWRkZW4/OiBib29sZWFuXG4gIGZvcm06IEZvcm1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE5hdmlnYXRpb25Sb3coXG4gIGlkOiBzdHJpbmcsXG4gIHByb3BzOiBOYXZpZ2F0aW9uUm93UHJvcHNcbik6IE5hdmlnYXRpb25Sb3dFbGVtZW50IHtcbiAgcmV0dXJuIHtcbiAgICAuLi5wcm9wcyxcbiAgICBpZCxcbiAgICB0eXBlOiAnbmF2aWdhdGlvblJvdycsXG4gICAgaXNIaWRkZW46IHByb3BzLmlzSGlkZGVuID8/IGZhbHNlLFxuICB9XG59XG5cbmV4cG9ydCB0eXBlIE9BdXRoQnV0dG9uUm93UHJvcHMgPSB7XG4gIHRpdGxlOiBzdHJpbmdcbiAgc3VidGl0bGU/OiBzdHJpbmdcblxuICBvblN1Y2Nlc3M6IFNlbGVjdG9ySUQ8XG4gICAgKHJlZnJlc2hUb2tlbjogc3RyaW5nLCBhY2Nlc3NUb2tlbjogc3RyaW5nKSA9PiBQcm9taXNlPHZvaWQ+XG4gID5cbiAgYXV0aG9yaXplRW5kcG9pbnQ6IHN0cmluZ1xuICByZXNwb25zZVR5cGU6XG4gICAgfCB7XG4gICAgICAgIHR5cGU6ICd0b2tlbidcbiAgICAgIH1cbiAgICB8IHtcbiAgICAgICAgdHlwZTogJ2NvZGUnXG4gICAgICAgIHRva2VuRW5kcG9pbnQ6IHN0cmluZ1xuICAgICAgfVxuICAgIHwge1xuICAgICAgICB0eXBlOiAncGtjZSdcbiAgICAgICAgdG9rZW5FbmRwb2ludDogc3RyaW5nXG4gICAgICAgIHBrY2VDb2RlTGVuZ3RoOiBudW1iZXJcbiAgICAgICAgcGtjZUNvZGVNZXRob2Q6ICdTMjU2JyB8ICdwbGFpbidcbiAgICAgICAgZm9ybUVuY29kZUdyYW50OiBib29sZWFuXG4gICAgICB9XG4gIGNsaWVudElkPzogc3RyaW5nXG4gIHJlZGlyZWN0VXJpPzogc3RyaW5nXG4gIHNjb3Blcz86IHN0cmluZ1tdXG5cbiAgaXNIaWRkZW4/OiBib29sZWFuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBPQXV0aEJ1dHRvblJvdyhcbiAgaWQ6IHN0cmluZyxcbiAgcHJvcHM6IE9BdXRoQnV0dG9uUm93UHJvcHNcbik6IE9BdXRoQnV0dG9uUm93RWxlbWVudCB7XG4gIHJldHVybiB7XG4gICAgLi4ucHJvcHMsXG4gICAgaWQsXG4gICAgdHlwZTogJ29hdXRoQnV0dG9uUm93JyxcbiAgICBpc0hpZGRlbjogcHJvcHMuaXNIaWRkZW4gPz8gZmFsc2UsXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIERlZmVycmVkSXRlbTxWLCBUIGV4dGVuZHMgRm9ybUl0ZW1FbGVtZW50PFY+Pih3b3JrOiAoKSA9PiBUKTogVFxuZXhwb3J0IGZ1bmN0aW9uIERlZmVycmVkSXRlbTxWLCBUIGV4dGVuZHMgRm9ybUl0ZW1FbGVtZW50PFY+PihcbiAgd29yazogKCkgPT4gVCB8IHVuZGVmaW5lZFxuKTogVCB8IHVuZGVmaW5lZCB7XG4gIHJldHVybiB3b3JrKClcbn1cbiIsICJpbXBvcnQgdHlwZSB7IEZvcm1JdGVtRWxlbWVudCB9IGZyb20gJy4vRm9ybUl0ZW1FbGVtZW50LmpzJ1xuXG5leHBvcnQgaW50ZXJmYWNlIEZvcm1TZWN0aW9uRWxlbWVudCB7XG4gIGlkOiBzdHJpbmdcbiAgaGVhZGVyPzogc3RyaW5nXG4gIGZvb3Rlcj86IHN0cmluZ1xuICBpdGVtczogRm9ybUl0ZW1FbGVtZW50PHVua25vd24+W11cbn1cblxuZXhwb3J0IHR5cGUgU2VjdGlvbkluZm8gPSB7XG4gIGlkOiBzdHJpbmdcbiAgaGVhZGVyPzogc3RyaW5nXG4gIGZvb3Rlcj86IHN0cmluZ1xufVxuXG5leHBvcnQgZnVuY3Rpb24gU2VjdGlvbihcbiAgcGFyYW1zOiBzdHJpbmcgfCBTZWN0aW9uSW5mbyxcbiAgaXRlbXM6IChGb3JtSXRlbUVsZW1lbnQ8dW5rbm93bj4gfCB1bmRlZmluZWQpW11cbik6IEZvcm1TZWN0aW9uRWxlbWVudCB7XG4gIGxldCBpbmZvOiBTZWN0aW9uSW5mb1xuICBpZiAodHlwZW9mIHBhcmFtcyA9PT0gJ3N0cmluZycpIHtcbiAgICBpbmZvID0geyBpZDogcGFyYW1zIH1cbiAgfSBlbHNlIHtcbiAgICBpbmZvID0gcGFyYW1zXG4gIH1cblxuICByZXR1cm4ge1xuICAgIC4uLmluZm8sXG4gICAgaXRlbXM6IGl0ZW1zLmZpbHRlcigoeCkgPT4geCkgYXMgRm9ybUl0ZW1FbGVtZW50PHVua25vd24+W10sXG4gIH1cbn1cblxuLy8gdHlwZSBMaXN0U2VjdGlvblByb3BzID0ge1xuLy8gICBpdGVtczogdW5rbm93blxuLy8gICBhbGxvd0RlbGV0aW9uOiBib29sZWFuXG4vLyAgIG9uUmVtb3ZlOiBTZWxlY3RvcklEPCgpID0+IFByb21pc2U8dm9pZD4+XG4vLyAgIGFsbG93QWRkaXRpb246IGJvb2xlYW5cbi8vICAgb25BZGQ6IFNlbGVjdG9ySUQ8KCkgPT4gUHJvbWlzZTx2b2lkPj5cbi8vICAgcm93QnVpbGRlcjogKGl0ZW06IHVua25vd24pID0+IEZvcm1JdGVtRWxlbWVudDx1bmtub3duPlxuLy8gfVxuXG4vLyBmdW5jdGlvbiBMaXN0U2VjdGlvbihpZDogc3RyaW5nLCBwcm9wczogTGlzdFNlY3Rpb25Qcm9wcykge1xuLy8gVE9ET1xuLy8gTGlzdFNlY3Rpb24oJ215U2VjdGlvbicsIHtcbi8vICAgICBpdGVtczogW3sgdmFsdWU6ICdoZWxsbycsIGlkOiAnd29ybGQnIH1dLFxuLy8gICAgIGFsbG93RGVsZXRpb246IHRydWUsXG4vLyAgICAgb25SZW1vdmU6IEFwcGxpY2F0aW9uLnNlbGVjdG9yKHRoaXMsICdteUl0ZW1EaWRSZW1vdmUnKSxcbi8vICAgICBhbGxvd0FkZGl0aW9uOiB0cnVlLFxuLy8gICAgIG9uQWRkOiBBcHBsaWNhdGlvbi5zZWxlY3Rvcih0aGlzLCAnbXlJdGVtRGlkQWRkJyksXG4vLyAgICAgcm93QnVpbGRlcjogKGVsZW1lbnQpID0+IElucHV0Um93KCdteVJvdycsIHtcbi8vICAgICAgICAgaWQ6IGVsZW1lbnQuaWQsXG4vLyAgICAgICAgIHZhbHVlOiBlbGVtZW50LnZhbHVlLFxuLy8gICAgICAgICBwbGFjZWhvbGRlcjogJ0Zvbydcbi8vICAgICB9KVxuLy8gfSlcbi8vIH1cbiIsICJleHBvcnQgKiBmcm9tICcuL0NoYXB0ZXJQcm92aWRpbmcuanMnXG5leHBvcnQgKiBmcm9tICcuL0Nsb3VkZmxhcmVCeXBhc3NSZXF1ZXN0UHJvdmlkaW5nLmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9EaXNjb3ZlclNlY3Rpb25Qcm92aWRpbmcuanMnXG5leHBvcnQgKiBmcm9tICcuL01hbmFnZWRDb2xsZWN0aW9uUHJvdmlkaW5nLmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9NYW5nYVByb2dyZXNzUHJvdmlkaW5nLmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9NYW5nYVByb3ZpZGluZy5qcydcbmV4cG9ydCAqIGZyb20gJy4vU2VhcmNoUmVzdWx0c1Byb3ZpZGluZy5qcydcbmV4cG9ydCAqIGZyb20gJy4vU2V0dGluZ3NGb3JtUHJvdmlkaW5nLmpzJ1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuZXhwb3J0IGZ1bmN0aW9uIGhhc1Byb3BlcnRpZXNPZjxUPihwcm9wZXJ0aWVzOiAoa2V5b2YgVClbXSwgb2JqOiBhbnkpOiBvYmogaXMgVCB7XG4gIHJldHVybiBwcm9wZXJ0aWVzLmV2ZXJ5KChrKSA9PiBrIGluIG9iailcbn0iLCAiaW1wb3J0IHR5cGUgeyBDaGFwdGVyIH0gZnJvbSAnLi4vLi4vQ2hhcHRlci5qcydcbmltcG9ydCB0eXBlIHsgQ2hhcHRlckRldGFpbHMgfSBmcm9tICcuLi8uLi9DaGFwdGVyRGV0YWlscy5qcydcbmltcG9ydCB0eXBlIHsgU291cmNlTWFuZ2EgfSBmcm9tICcuLi8uLi9Tb3VyY2VNYW5nYS5qcydcbmltcG9ydCB7IGhhc1Byb3BlcnRpZXNPZiB9IGZyb20gJy4vaW5kZXguanMnXG5pbXBvcnQgdHlwZSB7IE1hbmdhUHJvdmlkaW5nIH0gZnJvbSAnLi9NYW5nYVByb3ZpZGluZy5qcydcblxuZXhwb3J0IGludGVyZmFjZSBDaGFwdGVyUHJvdmlkaW5nIGV4dGVuZHMgTWFuZ2FQcm92aWRpbmcge1xuICAvKipcbiAgICogQHBhcmFtIHNvdXJjZU1hbmdhIFRoZSBzb3VyY2VNYW5nYSBmb3Igd2hpY2ggdGhlIGNoYXB0ZXJzIHNob3VsZCBiZSBmZXRjaGVkXG4gICAqL1xuICBnZXRDaGFwdGVycyhzb3VyY2VNYW5nYTogU291cmNlTWFuZ2EsIHNpbmNlRGF0ZT86IERhdGUpOiBQcm9taXNlPENoYXB0ZXJbXT5cblxuICAvKipcbiAgICogQHBhcmFtIGNoYXB0ZXIgVGhlIGNoYXB0ZXIgbGlzdGluZyBmb3Igd2hpY2ggdGhlIGRldGFpbHMgc2hvdWxkIGJlIGZldGNoZWRcbiAgICovXG4gIGdldENoYXB0ZXJEZXRhaWxzKGNoYXB0ZXI6IENoYXB0ZXIpOiBQcm9taXNlPENoYXB0ZXJEZXRhaWxzPlxuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnQgdGhpcyBPTkxZIGlmIHRoZSBzb3VyY2UgY2FuIGRldGVybWluZSwgaW4gYnVsaywgd2hpY2ggdGl0bGUgaGFzIGJlZW4gdXBkYXRlZFxuICAgKiBZb3UgY2FuIGFsc28gdXNlIHRoaXMgdG8gc2tpcCB0aGUgYXBwIGNhbGxpbmcge0BsaW5rIGdldE5ld0NoYXB0ZXJzfSBlbnRpcmVseSBhbmQgcHJvdmlkZSBuZXdcbiAgICogY2hhcHRlciBpbiBoZXJlXG4gICAqIEBwYXJhbSB1cGRhdGVNYW5hZ2VyIHRoZSB1cGRhdGUgbWFuYWdlciB3aGljaCB3aWxsIGJlIHJlc3BvbnNpYmxlIGZvciBmZXRjaGluZyB1cGRhdGVzLCBETyBOT1QgU1RPUkUgVEhJU1xuICAgKiBAcGFyYW0gbGFzdFVwZGF0ZURhdGUgbGFzdCB0aW1lIHRoZSBhcHAgc3VjY2Vzc2Z1bGx5IGZldGNoZWQgdXBkYXRlc1xuICAgKiBcbiAgICogTm90ZXM6XG4gICAqIC0gSWYgeW91ciBzb3VyY2UgbmVlZHMgY2xvdWRmbGFyZSBieXBhc3MgdGhyb3cgYSB7QGxpbmsgQ2xvdWRmbGFyZUVycm9yfSBoZXJlXG4gICAqL1xuICBwcm9jZXNzVGl0bGVzRm9yVXBkYXRlcz8oXG4gICAgdXBkYXRlTWFuYWdlcjogVXBkYXRlTWFuYWdlcixcbiAgICBsYXN0VXBkYXRlRGF0ZT86IERhdGVcbiAgKTogUHJvbWlzZTx2b2lkPlxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFVwZGF0ZU1hbmFnZXIge1xuICBnZXRRdWV1ZWRJdGVtcygpOiBTb3VyY2VNYW5nYVtdXG5cbiAgc2V0VXBkYXRlUHJpb3JpdHkoXG4gICAgbWFuZ2FJZDogc3RyaW5nLFxuICAgIHVwZGF0ZVByaW9yaXR5OiAnaGlnaCcgfCAnbG93JyB8ICdza2lwJ1xuICApOiBQcm9taXNlPHZvaWQ+XG5cbiAgZ2V0TnVtYmVyT2ZDaGFwdGVycyhtYW5nYUlkOiBzdHJpbmcpOiBQcm9taXNlPG51bWJlcj5cblxuICAvKipcbiAgICogR2V0IGFsbCBjaGFwdGVycyBmb3IgYSB0aXRsZSBmcm9tIGFwcCBkYlxuICAgKiBcbiAgICogVGhpcyBjYW4gcG90ZW50aWFsbHkgYmUgYSByZWFsbHkgZXhwZW5zaXZlIGNhbGwsIG9ubHkgcGVyZm9ybSB0aGlzIHdoZW4geW91IGtub3cgeW91J2xsIGJlIHNhdmluZyBtYW55IHJlcXVlc3RzLlxuICAgKlxuICAgKiBJbiBnZW5lcmFsLCBhdm9pZCBkb2luZyBkaWZmaW5nIGluIHRoZSBzb3VyY2UgYW5kIGxldCB0aGUgYXBwIGhhbmRsZSBtZXJnaW5nIGNoYXB0ZXJzLlxuICAgKlxuICAgKiBBIHBvdGVudGlhbCB1c2UtY2FzZSBmb3IgdGhpcyBtZXRob2QgaXMgZGV0ZXJtaW5pbmcgd2hhdCB0aGUgc29ydC1pbmRleCBpcyBmb3IgdGhlIG5ldyBjaGFwdGVyc1xuICAgKi9cbiAgZ2V0Q2hhcHRlcnMobWFuZ2FJZDogc3RyaW5nKTogUHJvbWlzZTxDaGFwdGVyW10+XG5cbiAgLyoqXG4gICAqIFByb3ZpZGUgbmV3IGNoYXB0ZXJzIGZvciB0aGUgZ2l2ZW4gbWFuZ2EgdXBmcm9udCwgc2tpcHBpbmcgaXRzIGBnZXRDaGFwdGVyc2AgY2FsbC5cbiAgICpcbiAgICogTm90ZTpcbiAgICogLSBpZiBzb3VyY2Ugc2V0cyBgc29ydGluZ0luZGV4YCwgbWFrZSBzdXJlIGl0IGlzIHNldCBjb3JyZWN0bHkgZm9yIHRoZSBuZXcgY2hhcHRlcnMuXG4gICAqIC0gT25seSB1c2UgdGhpcyBpZiBpdCdzIGEgbW9yZSBlZmZpY2llbnQgY2FsbCB0aGFuIGBDaGFwdGVyUHJvdmlkaW5nLmdldENoYXB0ZXJzYFxuICAgKi9cbiAgc2V0TmV3Q2hhcHRlcnMoXG4gICAgbWFuZ2FJZDogc3RyaW5nLFxuICAgIGNoYXB0ZXJzOiBDaGFwdGVyW10gfCB1bmRlZmluZWRcbiAgKTogUHJvbWlzZTx2b2lkPlxufVxuXG5leHBvcnQgZnVuY3Rpb24gaW1wbGVtZW50c0NoYXB0ZXJQcm92aWRpbmcoXG4gIGV4dGVuc2lvbjogTWFuZ2FQcm92aWRpbmdcbik6IGV4dGVuc2lvbiBpcyBDaGFwdGVyUHJvdmlkaW5nIHtcbiAgcmV0dXJuIGhhc1Byb3BlcnRpZXNPZjxDaGFwdGVyUHJvdmlkaW5nPihcbiAgICBbJ2dldENoYXB0ZXJzJywgJ2dldE1hbmdhRGV0YWlscyddLFxuICAgIGV4dGVuc2lvblxuICApXG59XG4iLCAiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Q2xvdWRmbGFyZUJ5cGFzc1JlcXVlc3RQcm92aWRpbmcuanMubWFwIiwgImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPURpc2NvdmVyU2VjdGlvblByb3ZpZGluZy5qcy5tYXAiLCAiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9TWFuYWdlZENvbGxlY3Rpb25Qcm92aWRpbmcuanMubWFwIiwgImltcG9ydCB0eXBlIHsgTWFuZ2FQcm9ncmVzcyB9IGZyb20gJy4uLy4uL01hbmdhUHJvZ3Jlc3MuanMnXG5pbXBvcnQgdHlwZSB7IFNvdXJjZU1hbmdhIH0gZnJvbSAnLi4vLi4vU291cmNlTWFuZ2EuanMnXG5pbXBvcnQgdHlwZSB7IFRyYWNrZWRNYW5nYUNoYXB0ZXJSZWFkQWN0aW9uIH0gZnJvbSAnLi4vLi4vVHJhY2tlZE1hbmdhQ2hhcHRlclJlYWRBY3Rpb24uanMnXG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi4vU2V0dGluZ3NVSS9Gb3JtLmpzJ1xuXG5leHBvcnQgdHlwZSBDaGFwdGVyUmVhZEFjdGlvblF1ZXVlUHJvY2Vzc2luZ1Jlc3VsdCA9IHtcbiAgc3VjY2Vzc2Z1bEl0ZW1zOiBzdHJpbmdbXVxuICBmYWlsZWRJdGVtczogc3RyaW5nW11cbn1cblxuZXhwb3J0IGludGVyZmFjZSBNYW5nYVByb2dyZXNzUHJvdmlkaW5nIHtcbiAgZ2V0TWFuZ2FQcm9ncmVzc01hbmFnZW1lbnRGb3JtKHNvdXJjZU1hbmdhOiBTb3VyY2VNYW5nYSk6IFByb21pc2U8Rm9ybT5cbiAgZ2V0TWFuZ2FQcm9ncmVzcyhzb3VyY2VNYW5nYTogU291cmNlTWFuZ2EpOiBQcm9taXNlPE1hbmdhUHJvZ3Jlc3MgfCB1bmRlZmluZWQ+XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudGF0aW9uIE5vdGVzOlxuICAgKiAgIC0gSGFuZGxlIGFsbCBlcnJvcnMsIHRocm93aW5nIGNhbiBjYXVzZSBpc3N1ZXNcbiAgICogICAtIElmIGEgY2hhcHRlciBhY3Rpb24gaXMgcHVzaGVkLCBpdCBzaG91bGQgYmUgaW4gZWl0aGVyIGBzdWNjZXNzZnVsSXRlbXNgIG9yIGBmYWlsZWRJdGVtc2BcbiAgICogICAtIEl0ZW1zIG5vdCBpbiBlaXRoZXIgYENoYXB0ZXJSZWFkQWN0aW9uUXVldWVQcm9jZXNzaW5nUmVzdWx0YCBmaWVsZHMgd2lsbCBiZSBzZWVuIGFzIFwibm90IGF0dGVtcHRlZFwiXG4gICAqL1xuICBwcm9jZXNzQ2hhcHRlclJlYWRBY3Rpb25RdWV1ZShcbiAgICBhY3Rpb25zOiBUcmFja2VkTWFuZ2FDaGFwdGVyUmVhZEFjdGlvbltdXG4gICk6IFByb21pc2U8Q2hhcHRlclJlYWRBY3Rpb25RdWV1ZVByb2Nlc3NpbmdSZXN1bHQ+XG59XG4iLCAiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9TWFuZ2FQcm92aWRpbmcuanMubWFwIiwgImltcG9ydCB0eXBlIHsgUGFnZWRSZXN1bHRzIH0gZnJvbSAnLi4vLi4vUGFnZWRSZXN1bHRzLmpzJ1xuaW1wb3J0IHR5cGUgeyBTZWFyY2hGaWx0ZXIgfSBmcm9tICcuLi8uLi9TZWFyY2hGaWx0ZXIuanMnXG5pbXBvcnQgdHlwZSB7IFNlYXJjaFF1ZXJ5IH0gZnJvbSAnLi4vLi4vU2VhcmNoUXVlcnkuanMnXG5pbXBvcnQgdHlwZSB7IFNlYXJjaFJlc3VsdEl0ZW0gfSBmcm9tICcuLi8uLi9TZWFyY2hSZXN1bHRJdGVtLmpzJ1xuaW1wb3J0IHR5cGUgeyBTb3J0aW5nT3B0aW9uIH0gZnJvbSAnLi4vLi4vU29ydGluZ09wdGlvbi5qcydcbmltcG9ydCB7IGhhc1Byb3BlcnRpZXNPZiB9IGZyb20gJy4vaW5kZXguanMnXG5pbXBvcnQgdHlwZSB7IE1hbmdhUHJvdmlkaW5nIH0gZnJvbSAnLi9NYW5nYVByb3ZpZGluZy5qcydcblxuLyoqXG4gKiBAZGVwcmVjYXRlZCBVc2Uge0BsaW5rIFNlYXJjaFJlc3VsdHNQcm92aWRpbmd9XG4gKi9cbmV4cG9ydCB0eXBlIFNlYXJjaGFibGUgPSBTZWFyY2hSZXN1bHRzUHJvdmlkaW5nXG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VhcmNoUmVzdWx0c1Byb3ZpZGluZyBleHRlbmRzIE1hbmdhUHJvdmlkaW5nIHtcbiAgZ2V0U2VhcmNoRmlsdGVycygpOiBQcm9taXNlPFNlYXJjaEZpbHRlcltdPlxuXG4gIGdldFNlYXJjaFJlc3VsdHMoXG4gICAgcXVlcnk6IFNlYXJjaFF1ZXJ5LFxuICAgIG1ldGFkYXRhOiB1bmtub3duIHwgdW5kZWZpbmVkLFxuICAgIHNvcnRpbmdPcHRpb246IFNvcnRpbmdPcHRpb24gfCB1bmRlZmluZWRcbiAgKTogUHJvbWlzZTxQYWdlZFJlc3VsdHM8U2VhcmNoUmVzdWx0SXRlbT4+XG5cbiAgZ2V0U29ydGluZ09wdGlvbnM/KHF1ZXJ5OiBTZWFyY2hRdWVyeSk6IFByb21pc2U8U29ydGluZ09wdGlvbltdPlxufVxuXG5leHBvcnQgZnVuY3Rpb24gaW1wbGVtZW50c1NlYXJjaFJlc3VsdHNQcm92aWRpbmcoXG4gIGV4dGVuc2lvbjogTWFuZ2FQcm92aWRpbmdcbik6IGV4dGVuc2lvbiBpcyBTZWFyY2hSZXN1bHRzUHJvdmlkaW5nIHtcbiAgcmV0dXJuIGhhc1Byb3BlcnRpZXNPZjxTZWFyY2hSZXN1bHRzUHJvdmlkaW5nPihcbiAgICBbJ2dldFNlYXJjaEZpbHRlcnMnLCAnZ2V0U2VhcmNoUmVzdWx0cyddLFxuICAgIGV4dGVuc2lvblxuICApXG59XG4iLCAiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U2V0dGluZ3NGb3JtUHJvdmlkaW5nLmpzLm1hcCIsICJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1BcHBsaWNhdGlvbi5qcy5tYXAiLCAiaW1wb3J0IHR5cGUgeyBSZXF1ZXN0IH0gZnJvbSAnLi4vUmVxdWVzdC5qcydcbmltcG9ydCB0eXBlIHsgUmVzcG9uc2UgfSBmcm9tICcuLi9SZXNwb25zZS5qcydcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFBhcGVyYmFja0ludGVyY2VwdG9yIHtcbiAgY29uc3RydWN0b3IocHVibGljIGlkOiBzdHJpbmcpIHt9XG5cbiAgYWJzdHJhY3QgaW50ZXJjZXB0UmVxdWVzdChyZXF1ZXN0OiBSZXF1ZXN0KTogUHJvbWlzZTxSZXF1ZXN0PlxuICBhYnN0cmFjdCBpbnRlcmNlcHRSZXNwb25zZShcbiAgICByZXF1ZXN0OiBSZXF1ZXN0LFxuICAgIHJlc3BvbnNlOiBSZXNwb25zZSxcbiAgICBkYXRhOiBBcnJheUJ1ZmZlclxuICApOiBQcm9taXNlPEFycmF5QnVmZmVyPlxuXG4gIHJlZ2lzdGVySW50ZXJjZXB0b3IoKSB7XG4gICAgQXBwbGljYXRpb24ucmVnaXN0ZXJJbnRlcmNlcHRvcihcbiAgICAgIHRoaXMuaWQsXG4gICAgICBBcHBsaWNhdGlvbi5TZWxlY3Rvcih0aGlzIGFzIFBhcGVyYmFja0ludGVyY2VwdG9yLCAnaW50ZXJjZXB0UmVxdWVzdCcpLFxuICAgICAgQXBwbGljYXRpb24uU2VsZWN0b3IodGhpcyBhcyBQYXBlcmJhY2tJbnRlcmNlcHRvciwgJ2ludGVyY2VwdFJlc3BvbnNlJylcbiAgICApXG4gIH1cblxuICB1bnJlZ2lzdGVySW50ZXJjZXB0b3IoKSB7XG4gICAgQXBwbGljYXRpb24udW5yZWdpc3RlckludGVyY2VwdG9yKHRoaXMuaWQpXG4gIH1cbn1cbiIsICJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TZWxlY3Rvci5qcy5tYXAiLCAiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RXh0ZW5zaW9uLmpzLm1hcCIsICJpbXBvcnQgeyBsb2NrLCB1bmxvY2sgfSBmcm9tICcuL0xvY2suanMnXG5pbXBvcnQgeyBQYXBlcmJhY2tJbnRlcmNlcHRvciB9IGZyb20gJy4vUGFwZXJiYWNrSW50ZXJjZXB0b3IuanMnXG5pbXBvcnQgdHlwZSB7IFJlcXVlc3QgfSBmcm9tICcuLi9SZXF1ZXN0LmpzJ1xuaW1wb3J0IHR5cGUgeyBSZXNwb25zZSB9IGZyb20gJy4uL1Jlc3BvbnNlLmpzJ1xuXG5leHBvcnQgdHlwZSBCYXNpY1JhdGVMaW1pdGVyT3B0aW9ucyA9IHtcbiAgbnVtYmVyT2ZSZXF1ZXN0czogbnVtYmVyXG4gIGJ1ZmZlckludGVydmFsOiBudW1iZXJcbiAgaWdub3JlSW1hZ2VzOiBib29sZWFuXG59XG5cbmV4cG9ydCBjbGFzcyBCYXNpY1JhdGVMaW1pdGVyIGV4dGVuZHMgUGFwZXJiYWNrSW50ZXJjZXB0b3Ige1xuICBwcml2YXRlIHByb21pc2U/OiBQcm9taXNlPHZvaWQ+XG4gIHByaXZhdGUgY3VycmVudFJlcXVlc3RzTWFkZTogbnVtYmVyID0gMFxuICBwcml2YXRlIGxhc3RSZXNldDogbnVtYmVyID0gRGF0ZS5ub3coKVxuICBwcml2YXRlIHJlYWRvbmx5IGltYWdlUmVnZXggPSBuZXcgUmVnRXhwKC9cXC4ocG5nfGdpZnxqcGVnfGpwZ3x3ZWJwKShcXD98JCkvaSlcblxuICBjb25zdHJ1Y3RvcihcbiAgICBpZDogc3RyaW5nLFxuICAgIHJlYWRvbmx5IG9wdGlvbnM6IEJhc2ljUmF0ZUxpbWl0ZXJPcHRpb25zXG4gICkge1xuICAgIHN1cGVyKGlkKVxuICB9XG5cbiAgYXN5bmMgaW50ZXJjZXB0UmVxdWVzdChyZXF1ZXN0OiBSZXF1ZXN0KTogUHJvbWlzZTxSZXF1ZXN0PiB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5pZ25vcmVJbWFnZXMgJiYgdGhpcy5pbWFnZVJlZ2V4LnRlc3QocmVxdWVzdC51cmwpKSB7XG4gICAgICByZXR1cm4gcmVxdWVzdFxuICAgIH1cblxuICAgIGF3YWl0IGxvY2sodGhpcy5pZClcbiAgICBhd2FpdCB0aGlzLmluY3JlbWVudFJlcXVlc3RDb3VudCgpXG4gICAgdW5sb2NrKHRoaXMuaWQpXG4gICAgcmV0dXJuIHJlcXVlc3RcbiAgfVxuXG4gIGFzeW5jIGludGVyY2VwdFJlc3BvbnNlKFxuICAgIHJlcXVlc3Q6IFJlcXVlc3QsXG4gICAgcmVzcG9uc2U6IFJlc3BvbnNlLFxuICAgIGRhdGE6IEFycmF5QnVmZmVyXG4gICk6IFByb21pc2U8QXJyYXlCdWZmZXI+IHtcbiAgICByZXR1cm4gZGF0YVxuICB9XG5cbiAgYXN5bmMgaW5jcmVtZW50UmVxdWVzdENvdW50KCkge1xuICAgIGF3YWl0IHRoaXMucHJvbWlzZVxuXG4gICAgY29uc3Qgc2Vjb25kc1NpbmNlTGFzdFJlc2V0ID0gKERhdGUubm93KCkgLSB0aGlzLmxhc3RSZXNldCkgLyAxMDAwXG4gICAgaWYgKHNlY29uZHNTaW5jZUxhc3RSZXNldCA+IHRoaXMub3B0aW9ucy5idWZmZXJJbnRlcnZhbCkge1xuICAgICAgdGhpcy5jdXJyZW50UmVxdWVzdHNNYWRlID0gMFxuICAgICAgdGhpcy5sYXN0UmVzZXQgPSBEYXRlLm5vdygpXG4gICAgfVxuXG4gICAgdGhpcy5jdXJyZW50UmVxdWVzdHNNYWRlICs9IDFcblxuICAgIGlmICh0aGlzLmN1cnJlbnRSZXF1ZXN0c01hZGUgPj0gdGhpcy5vcHRpb25zLm51bWJlck9mUmVxdWVzdHMpIHtcbiAgICAgIGNvbnN0IHNlY29uZHNTaW5jZUxhc3RSZXNldCA9IChEYXRlLm5vdygpIC0gdGhpcy5sYXN0UmVzZXQpIC8gMTAwMFxuICAgICAgaWYgKHNlY29uZHNTaW5jZUxhc3RSZXNldCA8PSB0aGlzLm9wdGlvbnMuYnVmZmVySW50ZXJ2YWwpIHtcbiAgICAgICAgY29uc3Qgc2xlZXBUaW1lID0gdGhpcy5vcHRpb25zLmJ1ZmZlckludGVydmFsIC0gc2Vjb25kc1NpbmNlTGFzdFJlc2V0XG4gICAgICAgIGNvbnNvbGUubG9nKFxuICAgICAgICAgIGBbQmFzaWNSYXRlTGltaXRlcl0gcmF0ZSBsaW1pdCBoaXQsIHNsZWVwaW5nIGZvciAke3NsZWVwVGltZX1gXG4gICAgICAgIClcbiAgICAgICAgdGhpcy5wcm9taXNlID0gQXBwbGljYXRpb24uc2xlZXAoc2xlZXBUaW1lKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwgIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1keW5hbWljLWRlbGV0ZSAqL1xuY29uc3QgcHJvbWlzZXM6IFJlY29yZDxzdHJpbmcsIFByb21pc2U8dm9pZD4gfCB1bmRlZmluZWQ+ID0ge30sXG4gIHJlc29sdmVyczogUmVjb3JkPHN0cmluZywgKCgpID0+IHZvaWQpIHwgdW5kZWZpbmVkPiA9IHt9XG4vLyB1aWQgc2hvdWxkIGJlIHVuaXF1ZSBwZXIgY29kZSB5b3UgcHJvdGVjdCwgZS5nLiB0aGUgbWV0aG9kIHNpZ25hdHVyZVxuZXhwb3J0IGNvbnN0IGxvY2sgPSBhc3luYyAodWlkOiBzdHJpbmcpID0+IHtcbiAgaWYgKHByb21pc2VzW3VpZF0pIHtcbiAgICAvLyBjaGVjayBpZiBsb2NrIGV4aXN0c1xuICAgIGF3YWl0IHByb21pc2VzW3VpZF0gLy8gd2FpdCBvbiBsb2NrIHByb21pc2VcbiAgICBhd2FpdCBsb2NrKHVpZCkgLy8gc3RhY2sgbG9jayBjaGVjayBhZnRlciBwcm9taXNlIHJlc29sdmVzXG4gICAgcmV0dXJuIC8vIHByZXYgbWV0aG9kcyBkbyBub3RoaW5nXG4gIH1cbiAgLy8gdGhlcmUgaXMgbm8gbG9jaywgc28gd2UnbGwgXCJhY3F1aXJlXCIgaXQgaGVyZVxuICBwcm9taXNlc1t1aWRdID0gbmV3IFByb21pc2UoXG4gICAgKHJlc29sdmUpID0+XG4gICAgICAocmVzb2x2ZXJzW3VpZF0gPSAoKSA9PiB7XG4gICAgICAgIGRlbGV0ZSBwcm9taXNlc1t1aWRdIC8vIHJlbGVhc2VcbiAgICAgICAgcmVzb2x2ZSgpIC8vIHJlc29sdmVcbiAgICAgIH0pXG4gIClcbn1cbmV4cG9ydCBjb25zdCB1bmxvY2sgPSAodWlkOiBzdHJpbmcpID0+IHtcbiAgaWYgKHJlc29sdmVyc1t1aWRdKSB7XG4gICAgcmVzb2x2ZXJzW3VpZF0hKClcbiAgfVxufVxuIiwgImltcG9ydCB0eXBlIHsgUmVxdWVzdCB9IGZyb20gJy4uL1JlcXVlc3QuanMnXG5cbmV4cG9ydCBjbGFzcyBDbG91ZGZsYXJlRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gJ2Nsb3VkZmxhcmVFcnJvcidcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgcmVhZG9ubHkgcmVzb2x1dGlvblJlcXVlc3Q6IFJlcXVlc3QsXG4gICAgbWVzc2FnZTogc3RyaW5nID0gJ0Nsb3VkZmxhcmUgYnlwYXNzIGlzIHJlcXVpcmVkJ1xuICApIHtcbiAgICBzdXBlcihtZXNzYWdlKVxuICB9XG59XG4iLCAiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWR5bmFtaWMtZGVsZXRlICovXG5pbXBvcnQgdHlwZSB7IENvb2tpZSB9IGZyb20gJy4uL0Nvb2tpZS5qcydcbmltcG9ydCB7IFBhcGVyYmFja0ludGVyY2VwdG9yIH0gZnJvbSAnLi9QYXBlcmJhY2tJbnRlcmNlcHRvci5qcydcbmltcG9ydCB0eXBlIHsgUmVxdWVzdCB9IGZyb20gJy4uL1JlcXVlc3QuanMnXG5pbXBvcnQgdHlwZSB7IFJlc3BvbnNlIH0gZnJvbSAnLi4vUmVzcG9uc2UuanMnXG5pbXBvcnQgeyBVUkwgfSBmcm9tICcuL1VSTC5qcydcblxudHlwZSBDb29raWVTdG9yYWdlT3B0aW9ucyA9IHtcbiAgc3RvcmFnZTogJ3N0YXRlTWFuYWdlcicgfCAnbWVtb3J5J1xufVxuXG5jb25zdCBjb29raWVTdGF0ZUtleSA9ICdjb29raWVfc3RvcmVfY29va2llcydcblxuZXhwb3J0IGNsYXNzIENvb2tpZVN0b3JhZ2VJbnRlcmNlcHRvciBleHRlbmRzIFBhcGVyYmFja0ludGVyY2VwdG9yIHtcbiAgcHJpdmF0ZSBfY29va2llczogUmVjb3JkPHN0cmluZywgQ29va2llPiA9IHt9XG5cbiAgZ2V0IGNvb2tpZXMoKTogUmVhZG9ubHk8Q29va2llW10+IHtcbiAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZShPYmplY3QudmFsdWVzKHRoaXMuX2Nvb2tpZXMpKVxuICB9XG5cbiAgc2V0IGNvb2tpZXMobmV3VmFsdWU6IENvb2tpZVtdKSB7XG4gICAgY29uc3QgY29va2llczogUmVjb3JkPHN0cmluZywgQ29va2llPiA9IHt9XG4gICAgZm9yIChjb25zdCBjb29raWUgb2YgbmV3VmFsdWUpIHtcbiAgICAgIC8vIElmIHRoZSBjb29raWUgaXMgYWxyZWFkeSBleHBpcmVkLCBza2lwXG4gICAgICBpZiAodGhpcy5pc0Nvb2tpZUV4cGlyZWQoY29va2llKSkge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICBjb29raWVzW3RoaXMuY29va2llSWRlbnRpZmllcihjb29raWUpXSA9IGNvb2tpZVxuICAgIH1cblxuICAgIHRoaXMuX2Nvb2tpZXMgPSBjb29raWVzXG4gICAgdGhpcy5zYXZlQ29va2llc1RvU3RvcmFnZSgpXG4gIH1cblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgb3B0aW9uczogQ29va2llU3RvcmFnZU9wdGlvbnMpIHtcbiAgICBzdXBlcignY29va2llX3N0b3JlJylcbiAgICB0aGlzLmxvYWRDb29raWVzRnJvbVN0b3JhZ2UoKVxuICB9XG5cbiAgYXN5bmMgaW50ZXJjZXB0UmVxdWVzdChyZXF1ZXN0OiBSZXF1ZXN0KTogUHJvbWlzZTxSZXF1ZXN0PiB7XG4gICAgcmVxdWVzdC5jb29raWVzID0ge1xuICAgICAgLy8gQWxyZWFkeSBzZXQgY29va2llc1xuICAgICAgLi4uKHJlcXVlc3QuY29va2llcyA/PyB7fSksXG5cbiAgICAgIC8vIEluamVjdCBhbGwgdGhlIGNvb2tpZXMgYXMgeyBuYW1lOiB2YWx1ZSB9XG4gICAgICAuLi50aGlzLmNvb2tpZXNGb3JVcmwocmVxdWVzdC51cmwpLnJlZHVjZShcbiAgICAgICAgKHYsIGMpID0+IHtcbiAgICAgICAgICB2W2MubmFtZV0gPSBjLnZhbHVlXG4gICAgICAgICAgcmV0dXJuIHZcbiAgICAgICAgfSxcbiAgICAgICAge30gYXMgUmVjb3JkPHN0cmluZywgc3RyaW5nPlxuICAgICAgKSxcbiAgICB9XG5cbiAgICByZXR1cm4gcmVxdWVzdFxuICB9XG5cbiAgYXN5bmMgaW50ZXJjZXB0UmVzcG9uc2UoXG4gICAgcmVxdWVzdDogUmVxdWVzdCxcbiAgICByZXNwb25zZTogUmVzcG9uc2UsXG4gICAgZGF0YTogQXJyYXlCdWZmZXJcbiAgKTogUHJvbWlzZTxBcnJheUJ1ZmZlcj4ge1xuICAgIGNvbnN0IGNvb2tpZXM6IFJlY29yZDxzdHJpbmcsIENvb2tpZT4gPSB0aGlzLl9jb29raWVzXG5cbiAgICBmb3IgKGNvbnN0IGNvb2tpZSBvZiByZXNwb25zZS5jb29raWVzKSB7XG4gICAgICBjb25zdCBpZGVudGlmaWVyID0gdGhpcy5jb29raWVJZGVudGlmaWVyKGNvb2tpZSlcblxuICAgICAgLy8gSWYgdGhlIGNvb2tpZSBpcyBhbHJlYWR5IGV4cGlyZWQsIGRlbGV0ZSBpdFxuICAgICAgLy8gVXN1YWxseSBiYWNrZW5kcyBcImRlbGV0ZVwiIGEgY29va2llIGJ5IHNldHRpbmcgaXRzXG4gICAgICAvLyBleHBpcnkgaW4gdGhlIHBhc3RcbiAgICAgIGlmICh0aGlzLmlzQ29va2llRXhwaXJlZChjb29raWUpKSB7XG4gICAgICAgIGRlbGV0ZSBjb29raWVzW2lkZW50aWZpZXJdXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIGNvb2tpZXNbaWRlbnRpZmllcl0gPSBjb29raWVcbiAgICB9XG5cbiAgICB0aGlzLl9jb29raWVzID0gY29va2llc1xuICAgIHRoaXMuc2F2ZUNvb2tpZXNUb1N0b3JhZ2UoKVxuXG4gICAgcmV0dXJuIGRhdGFcbiAgfVxuXG4gIHNldENvb2tpZShjb29raWU6IENvb2tpZSkge1xuICAgIC8vIElmIHRoZSBjb29raWUgaXMgYWxyZWFkeSBleHBpcmVkLCBza2lwXG4gICAgaWYgKHRoaXMuaXNDb29raWVFeHBpcmVkKGNvb2tpZSkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRoaXMuX2Nvb2tpZXNbdGhpcy5jb29raWVJZGVudGlmaWVyKGNvb2tpZSldID0gY29va2llXG4gICAgdGhpcy5zYXZlQ29va2llc1RvU3RvcmFnZSgpXG4gIH1cblxuICBkZWxldGVDb29raWUoY29va2llOiBDb29raWUpIHtcbiAgICBkZWxldGUgdGhpcy5fY29va2llc1t0aGlzLmNvb2tpZUlkZW50aWZpZXIoY29va2llKV1cbiAgfVxuXG4gIGNvb2tpZXNGb3JVcmwodXJsU3RyaW5nOiBzdHJpbmcpOiBDb29raWVbXSB7XG4gICAgY29uc29sZS5sb2coJ1tDT01QQVRdIENPT0tJRVMgRk9SIFVSTCcpXG4gICAgY29uc3QgdXJsID0gbmV3IFVSTCh1cmxTdHJpbmcpXG4gICAgY29uc3QgaG9zdG5hbWUgPSB1cmwuaG9zdG5hbWVcblxuICAgIGlmICghaG9zdG5hbWUpIHtcbiAgICAgIHJldHVybiBbXVxuICAgIH1cblxuICAgIGNvbnN0IG1hdGNoZWRDb29raWVzOiBSZWNvcmQ8XG4gICAgICBzdHJpbmcsXG4gICAgICB7IGNvb2tpZTogQ29va2llOyBwYXRoTWF0Y2hlczogbnVtYmVyIH1cbiAgICA+ID0ge31cblxuICAgIGNvbnN0IHBhdGhuYW1lID0gdXJsLnBhdGguc3RhcnRzV2l0aCgnLycpID8gdXJsLnBhdGggOiBgLyR7dXJsLnBhdGh9YFxuXG4gICAgY29uc3Qgc3BsaXRIb3N0bmFtZSA9IGhvc3RuYW1lLnNwbGl0KCcuJylcbiAgICBjb25zdCBzcGxpdFVybFBhdGggPSBwYXRobmFtZS5zcGxpdCgnLycpXG4gICAgc3BsaXRVcmxQYXRoLnNoaWZ0KClcblxuICAgIGNvbnN0IGNvb2tpZXMgPSB0aGlzLmNvb2tpZXNcbiAgICBmb3IgKGNvbnN0IGNvb2tpZSBvZiBjb29raWVzKSB7XG4gICAgICBpZiAodGhpcy5pc0Nvb2tpZUV4cGlyZWQoY29va2llKSkge1xuICAgICAgICBkZWxldGUgdGhpcy5fY29va2llc1t0aGlzLmNvb2tpZUlkZW50aWZpZXIoY29va2llKV1cbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgY29uc3QgY29va2llRG9tYWluID0gdGhpcy5jb29raWVTYW5pdGl6ZWREb21haW4oY29va2llKVxuICAgICAgY29uc3Qgc3BsaXRDb29raWVEb21haW4gPSBjb29raWVEb21haW4uc3BsaXQoJy4nKVxuICAgICAgaWYgKFxuICAgICAgICBzcGxpdEhvc3RuYW1lLmxlbmd0aCA8IHNwbGl0Q29va2llRG9tYWluLmxlbmd0aCB8fFxuICAgICAgICBzcGxpdENvb2tpZURvbWFpbi5sZW5ndGggPT0gMFxuICAgICAgKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIGxldCBjb29raWVEb21haW5NYXRjaGVzID0gdHJ1ZVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzcGxpdENvb2tpZURvbWFpbi5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBzcGxpdENvb2tpZUluZGV4ID0gc3BsaXRDb29raWVEb21haW4ubGVuZ3RoIC0gMSAtIGlcbiAgICAgICAgY29uc3Qgc3BsaXRIb3N0bmFtZUluZGV4ID0gc3BsaXRIb3N0bmFtZS5sZW5ndGggLSAxIC0gaVxuICAgICAgICBpZiAoXG4gICAgICAgICAgc3BsaXRDb29raWVEb21haW5bc3BsaXRDb29raWVJbmRleF0gIT1cbiAgICAgICAgICBzcGxpdEhvc3RuYW1lW3NwbGl0SG9zdG5hbWVJbmRleF1cbiAgICAgICAgKSB7XG4gICAgICAgICAgY29va2llRG9tYWluTWF0Y2hlcyA9IGZhbHNlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIWNvb2tpZURvbWFpbk1hdGNoZXMpIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgY29uc3QgY29va2llUGF0aCA9IHRoaXMuY29va2llU2FuaXRpemVkUGF0aChjb29raWUpXG4gICAgICBjb25zdCBzcGxpdENvb2tpZVBhdGggPSBjb29raWVQYXRoLnNwbGl0KCcvJylcbiAgICAgIHNwbGl0Q29va2llUGF0aC5zaGlmdCgpXG5cbiAgICAgIGxldCBwYXRoTWF0Y2hlcyA9IDBcbiAgICAgIGlmIChwYXRobmFtZSA9PT0gY29va2llUGF0aCkge1xuICAgICAgICBwYXRoTWF0Y2hlcyA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSXG4gICAgICB9IGVsc2UgaWYgKHNwbGl0Q29va2llUGF0aC5sZW5ndGggPT09IDAgfHwgY29va2llUGF0aCA9PT0gJy8nKSB7XG4gICAgICAgIHBhdGhNYXRjaGVzID0gMVxuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgcGF0aG5hbWUuc3RhcnRzV2l0aChjb29raWVQYXRoKSAmJlxuICAgICAgICBzcGxpdFVybFBhdGgubGVuZ3RoID49IHNwbGl0Q29va2llUGF0aC5sZW5ndGhcbiAgICAgICkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNwbGl0Q29va2llUGF0aC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChzcGxpdENvb2tpZVBhdGhbaV0gPT09IHNwbGl0VXJsUGF0aFtpXSkge1xuICAgICAgICAgICAgcGF0aE1hdGNoZXMgKz0gMVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAocGF0aE1hdGNoZXMgPD0gMCkge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICBpZiAoKG1hdGNoZWRDb29raWVzW2Nvb2tpZS5uYW1lXT8ucGF0aE1hdGNoZXMgPz8gMCkgPCBwYXRoTWF0Y2hlcykge1xuICAgICAgICBtYXRjaGVkQ29va2llc1tjb29raWUubmFtZV0gPSB7IGNvb2tpZSwgcGF0aE1hdGNoZXMgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBPYmplY3QudmFsdWVzKG1hdGNoZWRDb29raWVzKS5tYXAoKHgpID0+IHguY29va2llKVxuICB9XG5cbiAgcHJpdmF0ZSBjb29raWVJZGVudGlmaWVyKGNvb2tpZTogQ29va2llKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7Y29va2llLm5hbWV9LSR7dGhpcy5jb29raWVTYW5pdGl6ZWREb21haW4oXG4gICAgICBjb29raWVcbiAgICApfS0ke3RoaXMuY29va2llU2FuaXRpemVkUGF0aChjb29raWUpfWBcbiAgfVxuXG4gIHByaXZhdGUgY29va2llU2FuaXRpemVkUGF0aChjb29raWU6IENvb2tpZSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGNvb2tpZS5wYXRoPy5zdGFydHNXaXRoKCcvJylcbiAgICAgID8gY29va2llLnBhdGhcbiAgICAgIDogJy8nICsgKGNvb2tpZS5wYXRoID8/ICcnKVxuICB9XG5cbiAgcHJpdmF0ZSBjb29raWVTYW5pdGl6ZWREb21haW4oY29va2llOiBDb29raWUpOiBzdHJpbmcge1xuICAgIHJldHVybiBjb29raWUuZG9tYWluLnJlcGxhY2UoL14od3d3KT9cXC4/L2dpLCAnJykudG9Mb3dlckNhc2UoKVxuICB9XG5cbiAgcHJpdmF0ZSBpc0Nvb2tpZUV4cGlyZWQoY29va2llOiBDb29raWUpOiBib29sZWFuIHtcbiAgICBpZiAoY29va2llLmV4cGlyZXMgJiYgY29va2llLmV4cGlyZXMuZ2V0VGltZSgpIDw9IERhdGUubm93KCkpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbG9hZENvb2tpZXNGcm9tU3RvcmFnZSgpIHtcbiAgICAvLyBJZiB0aGlzIHN0b3JlcyBpbiBtZW1vcnksIHdlIHByb2JhYmx5IGFscmVhZHkgaGF2ZSB0aGUgbGF0ZXN0IGNvb2tpZXNcbiAgICBpZiAodGhpcy5vcHRpb25zLnN0b3JhZ2UgPT0gJ21lbW9yeScpIHJldHVyblxuXG4gICAgY29uc3QgY29va2llRGF0YSA9IEFwcGxpY2F0aW9uLmdldFN0YXRlKGNvb2tpZVN0YXRlS2V5KSBhc1xuICAgICAgfCBDb29raWVbXVxuICAgICAgfCB1bmRlZmluZWRcbiAgICBpZiAoIWNvb2tpZURhdGEpIHtcbiAgICAgIHRoaXMuX2Nvb2tpZXMgPSB7fVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgY29va2llczogUmVjb3JkPHN0cmluZywgQ29va2llPiA9IHt9XG4gICAgZm9yIChjb25zdCBjb29raWUgb2YgY29va2llRGF0YSkge1xuICAgICAgLy8gaWdub3JlIHNlc3Npb24gY29va2llcyBhbmQgZXhwaXJlZCBjb29raWVzXG4gICAgICBpZiAoIWNvb2tpZS5leHBpcmVzIHx8IHRoaXMuaXNDb29raWVFeHBpcmVkKGNvb2tpZSkpIGNvbnRpbnVlXG5cbiAgICAgIGNvb2tpZXNbdGhpcy5jb29raWVJZGVudGlmaWVyKGNvb2tpZSldID0gY29va2llXG4gICAgfVxuXG4gICAgdGhpcy5fY29va2llcyA9IGNvb2tpZXNcbiAgfVxuXG4gIHByaXZhdGUgc2F2ZUNvb2tpZXNUb1N0b3JhZ2UoKSB7XG4gICAgLy8gSWYgdGhpcyBzdG9yZXMgaW4gbWVtb3J5LCB3ZSBwcm9iYWJseSBhbHJlYWR5IGhhdmUgdGhlIGxhdGVzdCBjb29raWVzXG4gICAgaWYgKHRoaXMub3B0aW9ucy5zdG9yYWdlID09ICdtZW1vcnknKSByZXR1cm5cblxuICAgIC8vIFRPRE86IGhhbmRsZSBzZWN1cmUgY29va2llcyBkaWZmZXJlbnRseSBtYXliZT9cbiAgICBBcHBsaWNhdGlvbi5zZXRTdGF0ZShcbiAgICAgIHRoaXMuY29va2llcy5maWx0ZXIoKHgpID0+IHguZXhwaXJlcyksXG4gICAgICBjb29raWVTdGF0ZUtleVxuICAgIClcbiAgfVxufVxuXG4vKipcbiAqIFxuICogIFRlc3QgY2FzZXMgZm9yIHRlc3RpbmcgY29va2llcyBhcmUgYmVoYXZpbmcgYXMgZXhwZWN0ZWRcbiAqIFxuXG5mdW5jdGlvbiBhc3NlcnQoYTogYm9vbGVhbiwgbXNnOiBzdHJpbmcpIHtcbiAgICBpZighYSkge1xuICAgICAgICB0aHJvdyBtc2dcbiAgICB9XG59XG5cbihmdW5jdGlvbiBydW5UZXN0cygpIHtcbiAgY29uc3QgY29va2llU3RvcmFnZSA9IG5ldyBDb29raWVTdG9yYWdlSW50ZXJjZXB0b3IoKTtcbiAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcblxuICAvLyBUZXN0IDE6IEJhc2ljIHNldCBhbmQgcmV0cmlldmFsXG4gIGNvbnN0IGNvb2tpZTE6IENvb2tpZSA9IHtcbiAgICBuYW1lOiBcInNlc3Npb25JZFwiLFxuICAgIHZhbHVlOiBcImFiYzEyM1wiLFxuICAgIGRvbWFpbjogXCJleGFtcGxlLmNvbVwiLFxuICAgIHBhdGg6IFwiL1wiLFxuICAgIGV4cGlyZXM6IG5ldyBEYXRlKG5vdyArIDEwMDAwKSAvLyBleHBpcmVzIGluIDEwIHNlY29uZHNcbiAgfTtcbiAgY29va2llU3RvcmFnZS5zZXRDb29raWUoY29va2llMSk7XG4gIGxldCBjb29raWVzID0gY29va2llU3RvcmFnZS5jb29raWVzRm9yVXJsKFwiaHR0cDovL2V4YW1wbGUuY29tL1wiKTtcbiAgYXNzZXJ0KGNvb2tpZXMubGVuZ3RoID09PSAxLCBcIlNob3VsZCByZXRyaWV2ZSBvbmUgY29va2llIGZvciBleGFtcGxlLmNvbSByb290XCIpO1xuXG4gIC8vIFRlc3QgMjogRG9tYWluIG1hdGNoaW5nIHdpdGggc3ViZG9tYWluIChSRkMgNjI2NTogZG9tYWluLW1hdGNoKVxuICBjb25zdCBjb29raWUyOiBDb29raWUgPSB7XG4gICAgbmFtZTogXCJ1c2VyXCIsXG4gICAgdmFsdWU6IFwiam9oblwiLFxuICAgIGRvbWFpbjogXCJleGFtcGxlLmNvbVwiLFxuICAgIHBhdGg6IFwiL1wiLFxuICAgIGV4cGlyZXM6IG5ldyBEYXRlKG5vdyArIDEwMDAwKVxuICB9O1xuICBjb29raWVTdG9yYWdlLnNldENvb2tpZShjb29raWUyKTtcbiAgY29va2llcyA9IGNvb2tpZVN0b3JhZ2UuY29va2llc0ZvclVybChcImh0dHA6Ly93d3cuZXhhbXBsZS5jb20vXCIpO1xuICBhc3NlcnQoXG4gICAgY29va2llcy5zb21lKGMgPT4gYy5uYW1lID09PSBcInVzZXJcIiksXG4gICAgXCJDb29raWUgd2l0aCBkb21haW4gZXhhbXBsZS5jb20gc2hvdWxkIG1hdGNoIHd3dy5leGFtcGxlLmNvbVwiXG4gICk7XG5cbiAgLy8gVGVzdCAzOiBQYXRoIG1hdGNoaW5nXG4gIGNvbnN0IGNvb2tpZTM6IENvb2tpZSA9IHtcbiAgICBuYW1lOiBcInByZWZcIixcbiAgICB2YWx1ZTogXCJkYXJrXCIsXG4gICAgZG9tYWluOiBcImV4YW1wbGUuY29tXCIsXG4gICAgcGF0aDogXCIvZG9jc1wiLFxuICAgIGV4cGlyZXM6IG5ldyBEYXRlKG5vdyArIDEwMDAwKVxuICB9O1xuICBjb29raWVTdG9yYWdlLnNldENvb2tpZShjb29raWUzKTtcbiAgY29va2llcyA9IGNvb2tpZVN0b3JhZ2UuY29va2llc0ZvclVybChcImh0dHA6Ly9leGFtcGxlLmNvbS9kb2NzL2luZGV4Lmh0bWxcIik7XG4gIGFzc2VydChcbiAgICBjb29raWVzLnNvbWUoYyA9PiBjLm5hbWUgPT09IFwicHJlZlwiKSxcbiAgICBcIkNvb2tpZSB3aXRoIHBhdGggL2RvY3Mgc2hvdWxkIG1hdGNoIC9kb2NzL2luZGV4Lmh0bWxcIlxuICApO1xuICBjb29raWVzID0gY29va2llU3RvcmFnZS5jb29raWVzRm9yVXJsKFwiaHR0cDovL2V4YW1wbGUuY29tL2Fib3V0XCIpO1xuICBhc3NlcnQoXG4gICAgIWNvb2tpZXMuc29tZShjID0+IGMubmFtZSA9PT0gXCJwcmVmXCIpLFxuICAgIFwiQ29va2llIHdpdGggcGF0aCAvZG9jcyBzaG91bGQgbm90IG1hdGNoIC9hYm91dFwiXG4gICk7XG5cbiAgLy8gVGVzdCA0OiBFeHBpcmVkIGNvb2tpZSBzaG91bGQgbm90IGJlIHN0b3JlZCBvciByZXR1cm5lZFxuICBjb25zdCBjb29raWU0OiBDb29raWUgPSB7XG4gICAgbmFtZTogXCJleHBpcmVkXCIsXG4gICAgdmFsdWU6IFwib2xkXCIsXG4gICAgZG9tYWluOiBcImV4YW1wbGUuY29tXCIsXG4gICAgcGF0aDogXCIvXCIsXG4gICAgZXhwaXJlczogbmV3IERhdGUobm93IC0gMTAwMDApIC8vIGV4cGlyZWQgMTAgc2Vjb25kcyBhZ29cbiAgfTtcbiAgY29va2llU3RvcmFnZS5zZXRDb29raWUoY29va2llNCk7XG4gIGNvb2tpZXMgPSBjb29raWVTdG9yYWdlLmNvb2tpZXNGb3JVcmwoXCJodHRwOi8vZXhhbXBsZS5jb20vXCIpO1xuICBhc3NlcnQoXG4gICAgIWNvb2tpZXMuc29tZShjID0+IGMubmFtZSA9PT0gXCJleHBpcmVkXCIpLFxuICAgIFwiRXhwaXJlZCBjb29raWUgc2hvdWxkIG5vdCBiZSByZXR1cm5lZFwiXG4gICk7XG5cbiAgLy8gVGVzdCA1OiBDb29raWUgb3ZlcndyaXRpbmcgYmFzZWQgb24gcGF0aCBzcGVjaWZpY2l0eVxuICAvLyBDb29raWUgd2l0aCBuYW1lIFwiaWRcIiBhbmQgcGF0aCBcIi9cIiAobGVzcyBzcGVjaWZpYylcbiAgY29uc3QgY29va2llQTogQ29va2llID0ge1xuICAgIG5hbWU6IFwiaWRcIixcbiAgICB2YWx1ZTogXCJBXCIsXG4gICAgZG9tYWluOiBcImV4YW1wbGUuY29tXCIsXG4gICAgcGF0aDogXCIvXCIsXG4gICAgZXhwaXJlczogbmV3IERhdGUobm93ICsgMTAwMDApXG4gIH07XG4gIC8vIENvb2tpZSB3aXRoIHRoZSBzYW1lIG5hbWUgYnV0IGEgbW9yZSBzcGVjaWZpYyBwYXRoIFwiL2RvY3NcIlxuICBjb25zdCBjb29raWVCOiBDb29raWUgPSB7XG4gICAgbmFtZTogXCJpZFwiLFxuICAgIHZhbHVlOiBcIkJcIixcbiAgICBkb21haW46IFwiZXhhbXBsZS5jb21cIixcbiAgICBwYXRoOiBcIi9kb2NzXCIsXG4gICAgZXhwaXJlczogbmV3IERhdGUobm93ICsgMTAwMDApXG4gIH07XG4gIGNvb2tpZVN0b3JhZ2Uuc2V0Q29va2llKGNvb2tpZUEpO1xuICBjb29raWVTdG9yYWdlLnNldENvb2tpZShjb29raWVCKTtcbiAgY29va2llcyA9IGNvb2tpZVN0b3JhZ2UuY29va2llc0ZvclVybChcImh0dHA6Ly9leGFtcGxlLmNvbS9kb2NzXCIpO1xuICBjb25zdCBjb29raWVJZCA9IGNvb2tpZXMuZmluZChjID0+IGMubmFtZSA9PT0gXCJpZFwiKTtcbiAgYXNzZXJ0KFxuICAgIGNvb2tpZUlkPy52YWx1ZSA9PT0gXCJCXCIsXG4gICAgXCJNb3JlIHNwZWNpZmljIGNvb2tpZSBzaG91bGQgYmUgcmV0dXJuZWQgZm9yIFVSTCAvZG9jc1wiXG4gICk7XG5cbiAgLy8gVGVzdCA2OiBEZWxldGluZyBhIGNvb2tpZVxuICBjb29raWVTdG9yYWdlLmRlbGV0ZUNvb2tpZShjb29raWVCKTtcbiAgY29va2llcyA9IGNvb2tpZVN0b3JhZ2UuY29va2llc0ZvclVybChcImh0dHA6Ly9leGFtcGxlLmNvbS9kb2NzXCIpO1xuICBjb25zdCBjb29raWVJZEFmdGVyRGVsZXRlID0gY29va2llcy5maW5kKGMgPT4gYy5uYW1lID09PSBcImlkXCIpO1xuICBhc3NlcnQoXG4gICAgY29va2llSWRBZnRlckRlbGV0ZT8udmFsdWUgPT09IFwiQVwiLFxuICAgIFwiQWZ0ZXIgZGVsZXRpb24gb2YgdGhlIHNwZWNpZmljIGNvb2tpZSwgdGhlIGxlc3Mgc3BlY2lmaWMgY29va2llIHNob3VsZCBiZSByZXR1cm5lZFwiXG4gICk7XG5cbiAgLy8gVGVzdCA3OiBVc2luZyB0aGUgY29va2llcyBzZXR0ZXIgKGV4cGlyZWQgY29va2llcyBmaWx0ZXJlZCBvdXQpXG4gIGNvb2tpZVN0b3JhZ2UuY29va2llcyA9IFtjb29raWUxLCBjb29raWU0XTsgLy8gY29va2llNCBpcyBleHBpcmVkXG4gIGNvbnN0IHN0b3JlZENvb2tpZXMgPSBjb29raWVTdG9yYWdlLmNvb2tpZXM7XG4gIGFzc2VydChcbiAgICBzdG9yZWRDb29raWVzLnNvbWUoYyA9PiBjLm5hbWUgPT09IFwic2Vzc2lvbklkXCIpLFxuICAgIFwic2Vzc2lvbklkIGNvb2tpZSBzaG91bGQgYmUgc3RvcmVkIHZpYSBzZXR0ZXJcIlxuICApO1xuICBhc3NlcnQoXG4gICAgIXN0b3JlZENvb2tpZXMuc29tZShjID0+IGMubmFtZSA9PT0gXCJleHBpcmVkXCIpLFxuICAgIFwiRXhwaXJlZCBjb29raWUgc2hvdWxkIGJlIGZpbHRlcmVkIG91dCBpbiB0aGUgc2V0dGVyXCJcbiAgKTtcblxuICBjb25zb2xlLmxvZyhcIkFsbCB0ZXN0cyBwYXNzZWQgc3VjY2Vzc2Z1bGx5LlwiKTtcbn0pKCk7XG4gKi9cbiIsICIvKipcbiAqIEludGVybmFsIG1ldGhvZCB0byBwYXJzZSBhIFVSTCBzdHJpbmcgYW5kIHVwZGF0ZSB0aGUgY3VycmVudCBjb21wb25lbnRzLlxuICpcbiAqIEBwYXJhbSB1cmwgLSBUaGUgVVJMIHN0cmluZyB0byBwYXJzZS5cbiAqIEBwYXJhbSBwYXJ0aWFsIC0gSWYgdHJ1ZSwgb25seSB1cGRhdGUgY29tcG9uZW50cyBwcmVzZW50IGluIHRoZSBpbnB1dC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVVJMKHVybDogc3RyaW5nKTogVVJMQ29tcG9uZW50cyB7XG4gIGNvbnN0IGNvbXBvbmVudHM6IFVSTENvbXBvbmVudHMgPSB7fVxuXG4gIC8vIFJlZ3VsYXIgZXhwcmVzc2lvbiB1c2luZyBudW1iZXJlZCBjYXB0dXJlIGdyb3Vwcy5cbiAgLy8gQ2FwdHVyZSBncm91cHM6XG4gIC8vICAgMTogcHJvdG9jb2wsIDI6IGF1dGhvcml0eSwgMzogcGF0aG5hbWUsIDQ6IHF1ZXJ5LCA1OiBoYXNoLlxuICBjb25zdCByZWdleCA9XG4gICAgL14oPzooW2EtekEtWl1bYS16QS1aXFxkK1xcLS5dKik6KT8oPzpcXC9cXC8oW14vPyNdKikpPyhbXj8jXSopKD86XFw/KFteI10qKSk/KD86IyguKikpPyQvXG4gIGNvbnN0IG1hdGNoID0gdXJsLm1hdGNoKHJlZ2V4KVxuICBpZiAoIW1hdGNoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIFVSTCBzdHJpbmcgcHJvdmlkZWQuJylcbiAgfVxuXG4gIC8vIE9ubHkgdXBkYXRlIGEgY29tcG9uZW50IGlmIHRoZSBjYXB0dXJlIGdyb3VwIGlzIGRlZmluZWQgYW5kIChmb3Igc29tZSBjb21wb25lbnRzKSBub24tZW1wdHkuXG4gIGlmIChtYXRjaFsxXSAhPT0gdW5kZWZpbmVkICYmIG1hdGNoWzFdICE9PSAnJykge1xuICAgIGNvbXBvbmVudHMucHJvdG9jb2wgPSBtYXRjaFsxXVxuICB9XG5cbiAgaWYgKG1hdGNoWzJdICE9PSB1bmRlZmluZWQgJiYgbWF0Y2hbMl0gIT09ICcnKSB7XG4gICAgLy8gUGFyc2UgYXV0aG9yaXR5IGludG8gdXNlcm5hbWUsIHBhc3N3b3JkLCBob3N0bmFtZSwgYW5kIHBvcnQuXG4gICAgY29uc3QgYXV0aG9yaXR5ID0gbWF0Y2hbMl1cbiAgICBsZXQgdXNlckluZm8gPSAnJ1xuICAgIGxldCBob3N0UG9ydCA9ICcnXG4gICAgY29uc3QgYXRJbmRleCA9IGF1dGhvcml0eS5pbmRleE9mKCdAJylcbiAgICBpZiAoYXRJbmRleCAhPT0gLTEpIHtcbiAgICAgIHVzZXJJbmZvID0gYXV0aG9yaXR5LnN1YnN0cmluZygwLCBhdEluZGV4KVxuICAgICAgaG9zdFBvcnQgPSBhdXRob3JpdHkuc3Vic3RyaW5nKGF0SW5kZXggKyAxKVxuICAgICAgaWYgKHVzZXJJbmZvICE9PSAnJykge1xuICAgICAgICBjb25zdCBjb2xvbkluZGV4ID0gdXNlckluZm8uaW5kZXhPZignOicpXG4gICAgICAgIGlmIChjb2xvbkluZGV4ICE9PSAtMSkge1xuICAgICAgICAgIGNvbXBvbmVudHMudXNlcm5hbWUgPSB1c2VySW5mby5zdWJzdHJpbmcoMCwgY29sb25JbmRleClcbiAgICAgICAgICBjb21wb25lbnRzLnBhc3N3b3JkID0gdXNlckluZm8uc3Vic3RyaW5nKGNvbG9uSW5kZXggKyAxKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbXBvbmVudHMudXNlcm5hbWUgPSB1c2VySW5mb1xuICAgICAgICAgIGNvbXBvbmVudHMucGFzc3dvcmQgPSAnJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGhvc3RQb3J0ID0gYXV0aG9yaXR5XG4gICAgfVxuXG4gICAgaWYgKGhvc3RQb3J0ICE9PSAnJykge1xuICAgICAgaWYgKGhvc3RQb3J0LnN0YXJ0c1dpdGgoJ1snKSkge1xuICAgICAgICBjb25zdCBjbG9zaW5nQnJhY2tldEluZGV4ID0gaG9zdFBvcnQuaW5kZXhPZignXScpXG4gICAgICAgIGlmIChjbG9zaW5nQnJhY2tldEluZGV4ID09PSAtMSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBJUHY2IGFkZHJlc3MgaW4gVVJMIHVwZGF0ZS4nKVxuICAgICAgICB9XG4gICAgICAgIGNvbXBvbmVudHMuaG9zdG5hbWUgPSBob3N0UG9ydC5zdWJzdHJpbmcoMCwgY2xvc2luZ0JyYWNrZXRJbmRleCArIDEpXG4gICAgICAgIGNvbnN0IHBvcnRQYXJ0ID0gaG9zdFBvcnQuc3Vic3RyaW5nKGNsb3NpbmdCcmFja2V0SW5kZXggKyAxKVxuICAgICAgICBpZiAocG9ydFBhcnQuc3RhcnRzV2l0aCgnOicpKSB7XG4gICAgICAgICAgY29tcG9uZW50cy5wb3J0ID0gcG9ydFBhcnQuc3Vic3RyaW5nKDEpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGNvbG9uSW5kZXggPSBob3N0UG9ydC5sYXN0SW5kZXhPZignOicpXG4gICAgICAgIGlmIChjb2xvbkluZGV4ICE9PSAtMSAmJiBob3N0UG9ydC5pbmRleE9mKCc6JykgPT09IGNvbG9uSW5kZXgpIHtcbiAgICAgICAgICBjb21wb25lbnRzLmhvc3RuYW1lID0gaG9zdFBvcnQuc3Vic3RyaW5nKDAsIGNvbG9uSW5kZXgpXG4gICAgICAgICAgY29tcG9uZW50cy5wb3J0ID0gaG9zdFBvcnQuc3Vic3RyaW5nKGNvbG9uSW5kZXggKyAxKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbXBvbmVudHMuaG9zdG5hbWUgPSBob3N0UG9ydFxuICAgICAgICAgIGNvbXBvbmVudHMucG9ydCA9ICcnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBQYXRobmFtZS5cbiAgaWYgKG1hdGNoWzNdICE9PSB1bmRlZmluZWQgJiYgbWF0Y2hbM10gIT09ICcnKSB7XG4gICAgY29tcG9uZW50cy5wYXRoID0gbWF0Y2hbM10uc3RhcnRzV2l0aCgnLycpID8gbWF0Y2hbM10gOiBgLyR7bWF0Y2hbM119YFxuICB9XG5cbiAgLy8gUXVlcnkuXG4gIGlmIChtYXRjaFs0XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgY29uc3QgcXVlcnk6IFJlY29yZDxzdHJpbmcsIHN0cmluZyB8IHN0cmluZ1tdPiA9IHt9XG4gICAgY29uc3QgcGFpcnMgPSBtYXRjaFs0XS5zcGxpdCgnJicpXG4gICAgZm9yIChjb25zdCBwYWlyIG9mIHBhaXJzKSB7XG4gICAgICBpZiAoIXBhaXIpIGNvbnRpbnVlXG4gICAgICBjb25zdCBbcmF3S2V5LCByYXdWYWx1ZSA9ICcnXSA9IHBhaXIuc3BsaXQoJz0nKVxuICAgICAgaWYgKHJhd0tleSA9PT0gdW5kZWZpbmVkKSBjb250aW51ZSAvLyBTa2lwIGlmIG5vIGtleSBmb3VuZFxuICAgICAgY29uc3Qga2V5ID0gZGVjb2RlVVJJQ29tcG9uZW50KHJhd0tleSlcbiAgICAgIGNvbnN0IHZhbHVlID0gZGVjb2RlVVJJQ29tcG9uZW50KHJhd1ZhbHVlKVxuICAgICAgaWYgKGtleSBpbiBxdWVyeSkge1xuICAgICAgICBjb25zdCBleGlzdGluZyA9IHF1ZXJ5W2tleV0hIC8vIE5vbi1udWxsIGFzc2VydGlvbiBzaW5jZSB3ZSBrbm93IGtleSBleGlzdHNcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZXhpc3RpbmcpKSB7XG4gICAgICAgICAgZXhpc3RpbmcucHVzaCh2YWx1ZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBxdWVyeVtrZXldID0gW2V4aXN0aW5nLCB2YWx1ZV1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcXVlcnlba2V5XSA9IHZhbHVlXG4gICAgICB9XG4gICAgfVxuICAgIGNvbXBvbmVudHMucXVlcnlJdGVtcyA9IHF1ZXJ5XG4gIH1cblxuICAvLyBIYXNoLlxuICBpZiAobWF0Y2hbNV0gIT09IHVuZGVmaW5lZCkge1xuICAgIGNvbXBvbmVudHMuZnJhZ21lbnQgPSBtYXRjaFs1XVxuICB9XG5cbiAgcmV0dXJuIGNvbXBvbmVudHNcbn1cblxuLyoqXG4gKiBBbiBpbnRlcmZhY2UgcmVwcmVzZW50aW5nIHRoZSBjb21wb25lbnRzIG9mIGEgVVJMLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFVSTENvbXBvbmVudHMge1xuICBwcm90b2NvbD86IHN0cmluZyAvLyBlLmcuLCBcImh0dHBzOlwiXG4gIHVzZXJuYW1lPzogc3RyaW5nXG4gIHBhc3N3b3JkPzogc3RyaW5nXG4gIGhvc3RuYW1lPzogc3RyaW5nXG4gIHBvcnQ/OiBzdHJpbmdcbiAgcGF0aD86IHN0cmluZ1xuICBxdWVyeUl0ZW1zPzogUmVjb3JkPHN0cmluZywgc3RyaW5nIHwgc3RyaW5nW10+XG4gIGZyYWdtZW50Pzogc3RyaW5nIC8vIGUuZy4sIFwiI3NlY3Rpb25cIlxufVxuXG4vKipcbiAqIEEgY2xhc3MgZm9yIHBhcnNpbmcsIHVwZGF0aW5nLCBhbmQgYnVpbGRpbmcgVVJMcy5cbiAqXG4gKiBUaGUgY2xhc3MgZG9lcyBub3QgdXNlIHRoZSBidWlsdFx1MjAxMWluIFVSTCBjbGFzcyBvciBuYW1lZCByZWdleCBjYXB0dXJlIGdyb3Vwcy5cbiAqL1xuZXhwb3J0IGNsYXNzIFVSTCB7XG4gIHByb3RvY29sOiBzdHJpbmdcbiAgaG9zdG5hbWU6IHN0cmluZ1xuICBwYXRoOiBzdHJpbmdcblxuICB1c2VybmFtZT86IHN0cmluZ1xuICBwYXNzd29yZD86IHN0cmluZ1xuICBwb3J0Pzogc3RyaW5nXG4gIHF1ZXJ5SXRlbXM/OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmcgfCBzdHJpbmdbXT4gfCB1bmRlZmluZWRcbiAgZnJhZ21lbnQ/OiBzdHJpbmdcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBTaW1wbGVVUkwgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSB1cmwgLSAoT3B0aW9uYWwpIEEgVVJMIHN0cmluZyB0byBpbml0aWFsaXplIHRoZSBpbnN0YW5jZS5cbiAgICovXG4gIGNvbnN0cnVjdG9yKHVybDogc3RyaW5nKSB7XG4gICAgY29uc3QgY29tcG9uZW50cyA9IHBhcnNlVVJMKHVybClcblxuICAgIGlmICghY29tcG9uZW50cy5ob3N0bmFtZSB8fCAhY29tcG9uZW50cy5wcm90b2NvbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVUkwgSG9zdG5hbWUgYW5kIFByb3RvY29sIGFyZSByZXF1aXJlZCcpXG4gICAgfVxuXG4gICAgdGhpcy5ob3N0bmFtZSA9IGNvbXBvbmVudHMuaG9zdG5hbWVcbiAgICB0aGlzLnByb3RvY29sID0gY29tcG9uZW50cy5wcm90b2NvbFxuICAgIHRoaXMucGF0aCA9IGNvbXBvbmVudHMucGF0aCA/PyAnJ1xuICAgIHRoaXMudXNlcm5hbWUgPSBjb21wb25lbnRzLnVzZXJuYW1lXG4gICAgdGhpcy5wYXNzd29yZCA9IGNvbXBvbmVudHMucGFzc3dvcmRcbiAgICB0aGlzLnBvcnQgPSBjb21wb25lbnRzLnBvcnRcbiAgICB0aGlzLnF1ZXJ5SXRlbXMgPSBjb21wb25lbnRzLnF1ZXJ5SXRlbXNcbiAgICB0aGlzLmZyYWdtZW50ID0gY29tcG9uZW50cy5mcmFnbWVudFxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGZ1bGwgVVJMIHN0cmluZyBidWlsdCBmcm9tIHRoZSBjdXJyZW50IGNvbXBvbmVudHMuXG4gICAqL1xuICB0b1N0cmluZygpOiBzdHJpbmcge1xuICAgIGxldCB1cmwgPSBgJHt0aGlzLnByb3RvY29sfTovL2BcblxuICAgIC8vIEFwcGVuZCB1c2VyIGluZm8gaWYgYXZhaWxhYmxlLlxuICAgIGlmICh0aGlzLnVzZXJuYW1lICE9PSB1bmRlZmluZWQgJiYgdGhpcy51c2VybmFtZSAhPT0gJycpIHtcbiAgICAgIHVybCArPSB0aGlzLnVzZXJuYW1lXG4gICAgICBpZiAodGhpcy5wYXNzd29yZCAhPT0gdW5kZWZpbmVkICYmIHRoaXMucGFzc3dvcmQgIT09ICcnKSB7XG4gICAgICAgIHVybCArPSBgOiR7dGhpcy5wYXNzd29yZH1gXG4gICAgICB9XG4gICAgICB1cmwgKz0gJ0AnXG4gICAgfVxuXG4gICAgdXJsICs9IHRoaXMuaG9zdG5hbWVcblxuICAgIGlmICh0aGlzLnBvcnQgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnBvcnQgIT09ICcnKSB7XG4gICAgICB1cmwgKz0gYDoke3RoaXMucG9ydH1gXG4gICAgfVxuXG4gICAgLy8gUGF0aG5hbWUuXG4gICAgaWYgKHRoaXMucGF0aCAhPT0gJycpIHtcbiAgICAgIHVybCArPSB0aGlzLnBhdGguc3RhcnRzV2l0aCgnLycpID8gdGhpcy5wYXRoIDogYC8ke3RoaXMucGF0aH1gXG4gICAgfVxuXG4gICAgaWYgKHRoaXMucXVlcnlJdGVtcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBRdWVyeSBzdHJpbmcuXG4gICAgICBjb25zdCBxdWVyeUtleXMgPSBPYmplY3Qua2V5cyh0aGlzLnF1ZXJ5SXRlbXMpXG4gICAgICBjb25zdCBwYXJhbXM6IHN0cmluZ1tdID0gW11cbiAgICAgIGlmIChxdWVyeUtleXMubGVuZ3RoID4gMCkge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBxdWVyeUtleXMpIHtcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IHRoaXMucXVlcnlJdGVtc1trZXldXG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHYgb2YgdmFsdWUpIHtcbiAgICAgICAgICAgICAgcGFyYW1zLnB1c2goYCR7ZW5jb2RlVVJJQ29tcG9uZW50KGtleSl9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHYpfWApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBwYXJhbXMucHVzaChcbiAgICAgICAgICAgICAgYCR7ZW5jb2RlVVJJQ29tcG9uZW50KGtleSl9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKX1gXG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB1cmwgKz0gYD8ke3BhcmFtcy5qb2luKCcmJyl9YFxuICAgIH1cblxuICAgIC8vIEhhc2ggKGZyYWdtZW50KS5cbiAgICBpZiAodGhpcy5mcmFnbWVudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB1cmwgKz0gYCMke3RoaXMuZnJhZ21lbnR9YFxuICAgIH1cblxuICAgIHJldHVybiB1cmxcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZW5pZW5jZSBtZXRob2QgdG8gdXBkYXRlIHRoZSBwcm90b2NvbC5cbiAgICovXG4gIHNldFByb3RvY29sKG5ld1Byb3RvY29sOiBzdHJpbmcpOiB0aGlzIHtcbiAgICBpZiAobmV3UHJvdG9jb2wgPT09ICcnKSB0aHJvdyBuZXcgRXJyb3IoJ1Byb3RvY29sIGlzIHJlcXVpcmVkJylcblxuICAgIHRoaXMucHJvdG9jb2wgPSBuZXdQcm90b2NvbFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogQ29udmVuaWVuY2UgbWV0aG9kIHRvIHVwZGF0ZSB0aGUgdXNlcm5hbWUuXG4gICAqL1xuICBzZXRVc2VybmFtZShuZXdVc2VybmFtZT86IHN0cmluZyk6IHRoaXMge1xuICAgIGlmIChuZXdVc2VybmFtZSA9PT0gJycpIHRoaXMudXNlcm5hbWUgPSB1bmRlZmluZWRcbiAgICBlbHNlIHRoaXMudXNlcm5hbWUgPSBuZXdVc2VybmFtZVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogQ29udmVuaWVuY2UgbWV0aG9kIHRvIHVwZGF0ZSB0aGUgcGFzc3dvcmQuXG4gICAqL1xuICBzZXRQYXNzd29yZChuZXdQYXNzd29yZD86IHN0cmluZyk6IHRoaXMge1xuICAgIGlmIChuZXdQYXNzd29yZCA9PT0gJycpIHRoaXMucGFzc3dvcmQgPSB1bmRlZmluZWRcbiAgICBlbHNlIHRoaXMucGFzc3dvcmQgPSBuZXdQYXNzd29yZFxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZW5pZW5jZSBtZXRob2QgdG8gdXBkYXRlIHRoZSBob3N0bmFtZS5cbiAgICovXG4gIHNldEhvc3RuYW1lKG5ld0hvc3RuYW1lOiBzdHJpbmcpOiB0aGlzIHtcbiAgICBpZiAobmV3SG9zdG5hbWUgPT09ICcnKSB0aHJvdyBuZXcgRXJyb3IoJ0hvc3RuYW1lIGlzIHJlcXVpcmVkJylcblxuICAgIHRoaXMuaG9zdG5hbWUgPSBuZXdIb3N0bmFtZVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogQ29udmVuaWVuY2UgbWV0aG9kIHRvIHVwZGF0ZSB0aGUgcG9ydC5cbiAgICovXG4gIHNldFBvcnQobmV3UG9ydD86IHN0cmluZyk6IHRoaXMge1xuICAgIGlmIChuZXdQb3J0ID09PSAnJykgdGhpcy5wb3J0ID0gdW5kZWZpbmVkXG4gICAgZWxzZSB0aGlzLnBvcnQgPSBuZXdQb3J0XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZW5pZW5jZSBtZXRob2QgdG8gdXBkYXRlIHRoZSBwYXRobmFtZS5cbiAgICovXG4gIHNldFBhdGgobmV3UGF0aG5hbWU6IHN0cmluZyk6IHRoaXMge1xuICAgIHRoaXMucGF0aCA9IG5ld1BhdGhuYW1lLnN0YXJ0c1dpdGgoJy8nKSA/IG5ld1BhdGhuYW1lIDogYC8ke25ld1BhdGhuYW1lfWBcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgYWRkUGF0aENvbXBvbmVudChjb21wb25lbnQ6IHN0cmluZyk6IHRoaXMge1xuICAgIHRoaXMucGF0aCA9XG4gICAgICAodGhpcy5wYXRoID8/ICcnKSArXG4gICAgICAoY29tcG9uZW50LnN0YXJ0c1dpdGgoJy8nKSA/IGNvbXBvbmVudCA6IGAvJHtjb21wb25lbnR9YClcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcGxhY2UgdGhlIGVudGlyZSBxdWVyeSBvYmplY3QuXG4gICAqL1xuICBzZXRRdWVyeUl0ZW1zKG5ld1F1ZXJ5PzogUmVjb3JkPHN0cmluZywgc3RyaW5nIHwgc3RyaW5nW10+KTogdGhpcyB7XG4gICAgdGhpcy5xdWVyeUl0ZW1zID0gbmV3UXVlcnlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBvciBhZGQgYSBzaW5nbGUgcXVlcnkgcGFyYW1ldGVyLlxuICAgKi9cbiAgc2V0UXVlcnlJdGVtKGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nIHwgc3RyaW5nW10pOiB0aGlzIHtcbiAgICBpZiAodGhpcy5xdWVyeUl0ZW1zID09PSB1bmRlZmluZWQpIHRoaXMucXVlcnlJdGVtcyA9IHt9XG5cbiAgICB0aGlzLnF1ZXJ5SXRlbXNba2V5XSA9IHZhbHVlXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgYSBxdWVyeSBwYXJhbWV0ZXIuXG4gICAqL1xuICByZW1vdmVRdWVyeUl0ZW0oa2V5OiBzdHJpbmcpOiB0aGlzIHtcbiAgICBkZWxldGUgdGhpcy5xdWVyeUl0ZW1zPy5ba2V5XVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogQ29udmVuaWVuY2UgbWV0aG9kIHRvIHVwZGF0ZSB0aGUgaGFzaCAoZnJhZ21lbnQpLlxuICAgKi9cbiAgc2V0RnJhZ21lbnQobmV3SGFzaDogc3RyaW5nKTogdGhpcyB7XG4gICAgdGhpcy5mcmFnbWVudCA9IG5ld0hhc2hcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgY3VycmVudCBVUkwgY29tcG9uZW50cy5cbiAgICpcbiAgICogQWNjZXB0cyBlaXRoZXI6XG4gICAqIC0gQSBVUkwgc3RyaW5nLCB3aGljaCBtYXkgYmUgYSBmdWxsIFVSTCAoZS5nLiwgXCJodHRwczovL2V4YW1wbGUuY29tL3BhdGg/Zm9vPWJhclwiKVxuICAgKiAgIG9yIGEgcGFydGlhbCBVUkwgKGUuZy4sIFwiL25ldy9wYXRoP2Zvbz1iYXIjc2VjdGlvblwiKS4gSW4gdGhpcyBjYXNlLCBvbmx5IHRoZSBjb21wb25lbnRzXG4gICAqICAgcHJlc2VudCBpbiB0aGUgc3RyaW5nIHdpbGwgYmUgdXBkYXRlZC5cbiAgICogLSBBIHBhcnRpYWwgVXJsQ29tcG9uZW50cyBvYmplY3QuXG4gICAqXG4gICAqIEBwYXJhbSBpbnB1dCAtIEEgVVJMIHN0cmluZyBvciBhIHBhcnRpYWwgVXJsQ29tcG9uZW50cyBvYmplY3QuXG4gICAqL1xuICB1cGRhdGUoaW5wdXQ6IHN0cmluZyB8IFBhcnRpYWw8VVJMQ29tcG9uZW50cz4pOiB0aGlzIHtcbiAgICBsZXQgY29tcG9uZW50czogVVJMQ29tcG9uZW50c1xuXG4gICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIElmIGlucHV0IGlzIGEgc3RyaW5nLCBwYXJzZSBhbmQgdXBkYXRlIG9ubHkgdGhlIHByb3ZpZGVkIGNvbXBvbmVudHMuXG4gICAgICBjb21wb25lbnRzID0gcGFyc2VVUkwoaW5wdXQpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbXBvbmVudHMgPSBpbnB1dFxuICAgIH1cblxuICAgIC8vIE90aGVyd2lzZSwgdXBkYXRlIHByb3ZpZGVkIGZpZWxkcy5cbiAgICBpZiAoY29tcG9uZW50cy5wcm90b2NvbCAhPT0gdW5kZWZpbmVkKSB0aGlzLnNldFByb3RvY29sKGNvbXBvbmVudHMucHJvdG9jb2wpXG4gICAgaWYgKGNvbXBvbmVudHMudXNlcm5hbWUgIT09IHVuZGVmaW5lZCkgdGhpcy5zZXRVc2VybmFtZShjb21wb25lbnRzLnVzZXJuYW1lKVxuICAgIGlmIChjb21wb25lbnRzLnBhc3N3b3JkICE9PSB1bmRlZmluZWQpIHRoaXMuc2V0UGFzc3dvcmQoY29tcG9uZW50cy5wYXNzd29yZClcbiAgICBpZiAoY29tcG9uZW50cy5ob3N0bmFtZSAhPT0gdW5kZWZpbmVkKSB0aGlzLnNldEhvc3RuYW1lKGNvbXBvbmVudHMuaG9zdG5hbWUpXG4gICAgaWYgKGNvbXBvbmVudHMucG9ydCAhPT0gdW5kZWZpbmVkKSB0aGlzLnNldFBvcnQoY29tcG9uZW50cy5wb3J0KVxuICAgIGlmIChjb21wb25lbnRzLnBhdGggIT09IHVuZGVmaW5lZCkgdGhpcy5zZXRQYXRoKGNvbXBvbmVudHMucGF0aClcbiAgICBpZiAoY29tcG9uZW50cy5xdWVyeUl0ZW1zICE9PSB1bmRlZmluZWQpXG4gICAgICB0aGlzLnNldFF1ZXJ5SXRlbXMoY29tcG9uZW50cy5xdWVyeUl0ZW1zKVxuICAgIGlmIChjb21wb25lbnRzLmZyYWdtZW50ICE9PSB1bmRlZmluZWQpIHRoaXMuc2V0RnJhZ21lbnQoY29tcG9uZW50cy5mcmFnbWVudClcblxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLWV4cHJlc3Npb25zICovXG5pbXBvcnQgdHlwZSB7IENoYXB0ZXIgfSBmcm9tICcuLi9DaGFwdGVyLmpzJ1xuaW1wb3J0IHsgU291cmNlSW50ZW50cywgdHlwZSBFeHRlbnNpb25JbmZvIH0gZnJvbSAnLi4vaW1wbC9Tb3VyY2VJbmZvLmpzJ1xuaW1wb3J0IHR5cGUgeyBQYWdlZFJlc3VsdHMgfSBmcm9tICcuLi9QYWdlZFJlc3VsdHMuanMnXG5pbXBvcnQgdHlwZSB7IFNlYXJjaEZpbHRlciB9IGZyb20gJy4uL1NlYXJjaEZpbHRlci5qcydcbmltcG9ydCB0eXBlIHsgU2VhcmNoUXVlcnkgfSBmcm9tICcuLi9TZWFyY2hRdWVyeS5qcydcbmltcG9ydCB0eXBlIHsgU2VhcmNoUmVzdWx0SXRlbSB9IGZyb20gJy4uL1NlYXJjaFJlc3VsdEl0ZW0uanMnXG5pbXBvcnQgdHlwZSB7IFNvcnRpbmdPcHRpb24gfSBmcm9tICcuLi9Tb3J0aW5nT3B0aW9uLmpzJ1xuaW1wb3J0IHR5cGUgeyBTb3VyY2VNYW5nYSB9IGZyb20gJy4uL1NvdXJjZU1hbmdhLmpzJ1xuaW1wb3J0IHR5cGUgeyBFeHRlbnNpb24gfSBmcm9tICcuL0V4dGVuc2lvbi5qcydcbmltcG9ydCB7IGltcGxlbWVudHNDaGFwdGVyUHJvdmlkaW5nLCB0eXBlIENoYXB0ZXJQcm92aWRpbmcgfSBmcm9tICcuL2ludGVyZmFjZXMvQ2hhcHRlclByb3ZpZGluZy5qcydcbmltcG9ydCB0eXBlIHsgTWFuZ2FQcm92aWRpbmcgfSBmcm9tICcuL2ludGVyZmFjZXMvTWFuZ2FQcm92aWRpbmcuanMnXG5pbXBvcnQge1xuICBpbXBsZW1lbnRzU2VhcmNoUmVzdWx0c1Byb3ZpZGluZyxcbiAgdHlwZSBTZWFyY2hSZXN1bHRzUHJvdmlkaW5nLFxufSBmcm9tICcuL2ludGVyZmFjZXMvU2VhcmNoUmVzdWx0c1Byb3ZpZGluZy5qcydcbmltcG9ydCB7IGV4cGVjdCB9IGZyb20gJ2NoYWknXG5cbi8vIFR5cGVzIGZvciB0ZXN0IGNhc2VzIGFuZCByZXN1bHRzXG50eXBlIFRlc3RDYXNlID0ge1xuICBuYW1lOiBzdHJpbmdcbiAgZm46ICgpID0+IFByb21pc2U8dW5rbm93bj5cbn1cblxudHlwZSBUZXN0UmVzdWx0ID0ge1xuICBuYW1lOiBzdHJpbmdcbiAgcGFzc2VkOiBib29sZWFuXG4gIGVycm9yPzogRXJyb3JcbiAgZHVyYXRpb246IG51bWJlclxuICByZXR1cm5WYWx1ZT86IHVua25vd25cbn1cblxudHlwZSBTdWl0ZVJlc3VsdCA9IHtcbiAgc3VpdGVOYW1lOiBzdHJpbmdcbiAgcGFzc2VkOiBudW1iZXJcbiAgZmFpbGVkOiBudW1iZXJcbiAgdG90YWw6IG51bWJlclxuICBkdXJhdGlvbjogbnVtYmVyXG4gIHRlc3RSZXN1bHRzOiBUZXN0UmVzdWx0W11cbn1cblxuLy8gVGVzdCBTdWl0ZSBjbGFzc1xuZXhwb3J0IGNsYXNzIFRlc3RTdWl0ZSB7XG4gIHJlYWRvbmx5IHN0YXRlOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA9IHt9XG4gIHByaXZhdGUgdGVzdENhc2VzOiBUZXN0Q2FzZVtdID0gW11cbiAgcHJpdmF0ZSBzdWl0ZU5hbWU6IHN0cmluZ1xuXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xuICAgIHRoaXMuc3VpdGVOYW1lID0gbmFtZVxuICB9XG5cbiAgLy8gUmVnaXN0ZXIgYSB0ZXN0IGNhc2VcbiAgdGVzdChuYW1lOiBzdHJpbmcsIGZuOiAoKSA9PiBQcm9taXNlPHZvaWQ+KTogdm9pZCB7XG4gICAgdGhpcy50ZXN0Q2FzZXMucHVzaCh7IG5hbWUsIGZuIH0pXG4gIH1cblxuICAvLyBSdW4gYWxsIHRlc3QgY2FzZXMgc2VxdWVudGlhbGx5XG4gIGFzeW5jIHJ1bigpOiBQcm9taXNlPFN1aXRlUmVzdWx0PiB7XG4gICAgY29uc29sZS5sb2coYFxcblx1RDgzRVx1RERFQSBSdW5uaW5nIHRlc3Qgc3VpdGU6ICR7dGhpcy5zdWl0ZU5hbWV9YClcbiAgICBjb25zb2xlLmxvZygnPScucmVwZWF0KDUwKSlcblxuICAgIGNvbnN0IHN0YXJ0VGltZSA9IERhdGUubm93KClcbiAgICBjb25zdCB0ZXN0UmVzdWx0czogVGVzdFJlc3VsdFtdID0gW11cbiAgICBsZXQgcGFzc2VkID0gMFxuICAgIGxldCBmYWlsZWQgPSAwXG5cbiAgICBmb3IgKGNvbnN0IHRlc3RDYXNlIG9mIHRoaXMudGVzdENhc2VzKSB7XG4gICAgICBjb25zdCB0ZXN0U3RhcnRUaW1lID0gRGF0ZS5ub3coKVxuICAgICAgbGV0IHRlc3RSZXN1bHQ6IFRlc3RSZXN1bHRcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmV0dXJuVmFsdWUgPSBhd2FpdCB0ZXN0Q2FzZS5mbigpXG4gICAgICAgIGNvbnN0IGR1cmF0aW9uID0gRGF0ZS5ub3coKSAtIHRlc3RTdGFydFRpbWVcbiAgICAgICAgdGVzdFJlc3VsdCA9IHtcbiAgICAgICAgICBuYW1lOiB0ZXN0Q2FzZS5uYW1lLFxuICAgICAgICAgIHBhc3NlZDogdHJ1ZSxcbiAgICAgICAgICBkdXJhdGlvbixcbiAgICAgICAgICByZXR1cm5WYWx1ZSxcbiAgICAgICAgfVxuICAgICAgICBwYXNzZWQrK1xuICAgICAgICBjb25zb2xlLmxvZyhgXHUyNzA1ICR7dGVzdENhc2UubmFtZX0gKCR7ZHVyYXRpb259bXMpYClcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnN0IGR1cmF0aW9uID0gRGF0ZS5ub3coKSAtIHRlc3RTdGFydFRpbWVcbiAgICAgICAgdGVzdFJlc3VsdCA9IHtcbiAgICAgICAgICBuYW1lOiB0ZXN0Q2FzZS5uYW1lLFxuICAgICAgICAgIHBhc3NlZDogZmFsc2UsXG4gICAgICAgICAgZXJyb3I6IGVycm9yIGFzIEVycm9yLFxuICAgICAgICAgIGR1cmF0aW9uLFxuICAgICAgICB9XG4gICAgICAgIGZhaWxlZCsrXG4gICAgICAgIGNvbnNvbGUubG9nKGBcdTI3NEMgJHt0ZXN0Q2FzZS5uYW1lfSAoJHtkdXJhdGlvbn1tcylgKVxuICAgICAgICBjb25zb2xlLmxvZyhgICAgRXJyb3I6ICR7KGVycm9yIGFzIEVycm9yKS5tZXNzYWdlfWApXG4gICAgICB9XG5cbiAgICAgIHRlc3RSZXN1bHRzLnB1c2godGVzdFJlc3VsdClcbiAgICB9XG5cbiAgICBjb25zdCB0b3RhbER1cmF0aW9uID0gRGF0ZS5ub3coKSAtIHN0YXJ0VGltZVxuICAgIGNvbnN0IHN1aXRlUmVzdWx0OiBTdWl0ZVJlc3VsdCA9IHtcbiAgICAgIHN1aXRlTmFtZTogdGhpcy5zdWl0ZU5hbWUsXG4gICAgICBwYXNzZWQsXG4gICAgICBmYWlsZWQsXG4gICAgICB0b3RhbDogdGhpcy50ZXN0Q2FzZXMubGVuZ3RoLFxuICAgICAgZHVyYXRpb246IHRvdGFsRHVyYXRpb24sXG4gICAgICB0ZXN0UmVzdWx0cyxcbiAgICB9XG5cbiAgICB0aGlzLnByaW50U3VtbWFyeShzdWl0ZVJlc3VsdClcbiAgICByZXR1cm4gc3VpdGVSZXN1bHRcbiAgfVxuXG4gIHByaXZhdGUgcHJpbnRTdW1tYXJ5KHJlc3VsdDogU3VpdGVSZXN1bHQpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZygnXFxuXHVEODNEXHVEQ0NBIFRlc3QgU3VtbWFyeTonKVxuICAgIGNvbnNvbGUubG9nKGAgICBUb3RhbDogJHtyZXN1bHQudG90YWx9YClcbiAgICBjb25zb2xlLmxvZyhgICAgUGFzc2VkOiAke3Jlc3VsdC5wYXNzZWR9YClcbiAgICBjb25zb2xlLmxvZyhgICAgRmFpbGVkOiAke3Jlc3VsdC5mYWlsZWR9YClcbiAgICBjb25zb2xlLmxvZyhgICAgRHVyYXRpb246ICR7cmVzdWx0LmR1cmF0aW9ufW1zYClcblxuICAgIGlmIChyZXN1bHQuZmFpbGVkID4gMCkge1xuICAgICAgY29uc29sZS5sb2coYFxcblx1Mjc0QyBTdWl0ZSBcIiR7cmVzdWx0LnN1aXRlTmFtZX1cIiBmYWlsZWRgKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmxvZyhgXFxuXHUyNzA1IFN1aXRlIFwiJHtyZXN1bHQuc3VpdGVOYW1lfVwiIHBhc3NlZGApXG4gICAgfVxuICB9XG59XG5cbnR5cGUgRXh0ZW5zaW9uVGVzdERhdGEgPSB7XG4gIHNlYXJjaFJlc3VsdHNQcm92aWRpbmc/OiB7XG4gICAgZ2V0U2VhcmNoUmVzdWx0czogUGFyYW1ldGVyczxTZWFyY2hSZXN1bHRzUHJvdmlkaW5nWydnZXRTZWFyY2hSZXN1bHRzJ10+XG4gICAgZ2V0U29ydGluZ09wdGlvbnM/OiBQYXJhbWV0ZXJzPFxuICAgICAgRXhjbHVkZTxTZWFyY2hSZXN1bHRzUHJvdmlkaW5nWydnZXRTb3J0aW5nT3B0aW9ucyddLCB1bmRlZmluZWQ+XG4gICAgPlxuICB9XG4gIG1hbmdhUHJvdmlkaW5nPzoge1xuICAgIGdldE1hbmdhRGV0YWlsczogUGFyYW1ldGVyczxNYW5nYVByb3ZpZGluZ1snZ2V0TWFuZ2FEZXRhaWxzJ10+XG4gIH1cbiAgY2hhcHRlclByb3ZpZGluZz86IHtcbiAgICBnZXRDaGFwdGVyczogUGFyYW1ldGVyczxDaGFwdGVyUHJvdmlkaW5nWydnZXRDaGFwdGVycyddPlxuICAgIGdldENoYXB0ZXJEZXRhaWxzOiBQYXJhbWV0ZXJzPENoYXB0ZXJQcm92aWRpbmdbJ2dldENoYXB0ZXJEZXRhaWxzJ10+XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHJlZ2lzdGVyRGVmYXVsdFRlc3RzID0gZnVuY3Rpb24gKFxuICBzdWl0ZTogVGVzdFN1aXRlLFxuICBleHRlbnNpb246IEV4dGVuc2lvbixcbiAgZXh0ZW5zaW9uSW5mbzogRXh0ZW5zaW9uSW5mbyxcbiAgdGVzdERhdGE6IEV4dGVuc2lvblRlc3REYXRhID0ge31cbikge1xuICByZWdpc3RlckRlZmF1bHRJbml0aWFsaXNhdGlvblRlc3RzKHN1aXRlLCBleHRlbnNpb24pXG5cbiAgbGV0IHNvdXJjZUNhcGFiaWxpdGllczogU291cmNlSW50ZW50cyA9IDBcbiAgaWYgKEFycmF5LmlzQXJyYXkoZXh0ZW5zaW9uSW5mby5jYXBhYmlsaXRpZXMpKSB7XG4gICAgc291cmNlQ2FwYWJpbGl0aWVzID0gZXh0ZW5zaW9uSW5mby5jYXBhYmlsaXRpZXMucmVkdWNlKFxuICAgICAgKGEsIGIpID0+IGEgfCBiLFxuICAgICAgc291cmNlQ2FwYWJpbGl0aWVzXG4gICAgKVxuICB9IGVsc2Uge1xuICAgIHNvdXJjZUNhcGFiaWxpdGllcyA9IGV4dGVuc2lvbkluZm8uY2FwYWJpbGl0aWVzXG4gIH1cblxuICBpZiAoc291cmNlQ2FwYWJpbGl0aWVzICYgU291cmNlSW50ZW50cy5TRUFSQ0hfUkVTVUxUU19QUk9WSURJTkcpIHtcbiAgICBpZiAoaW1wbGVtZW50c1NlYXJjaFJlc3VsdHNQcm92aWRpbmcoZXh0ZW5zaW9uKSkge1xuICAgICAgcmVnaXN0ZXJEZWZhdWx0U2VhcmNoUmVzdWx0c1Byb3ZpZGluZ1NvdXJjZVRlc3RzKFxuICAgICAgICBzdWl0ZSxcbiAgICAgICAgZXh0ZW5zaW9uLFxuICAgICAgICB0ZXN0RGF0YVxuICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBleHRlbnNpb24gZG9lcyBub3QgaW1wbGVtZW50ICdTZWFyY2hSZXN1bHRzUHJvdmlkaW5nJyBidXQgaGFzIHRoZSAnU0VBUkNIX1JFU1VMVFNfUFJPVklESU5HJyBjYXBhYmlsaXR5YFxuICAgICAgKVxuICAgIH1cbiAgfVxuXG5cbiAgcmVnaXN0ZXJEZWZhdWx0TWFuZ2FQcm92aWRpbmdTb3VyY2VUZXN0cyhzdWl0ZSwgZXh0ZW5zaW9uLCB0ZXN0RGF0YSlcblxuICBpZiAoc291cmNlQ2FwYWJpbGl0aWVzICYgU291cmNlSW50ZW50cy5DSEFQVEVSX1BST1ZJRElORykge1xuICAgIGlmIChpbXBsZW1lbnRzQ2hhcHRlclByb3ZpZGluZyhleHRlbnNpb24pKSB7XG4gICAgICByZWdpc3RlckRlZmF1bHRDaGFwdGVyUHJvdmlkaW5nU291cmNlVGVzdHMoXG4gICAgICAgIHN1aXRlLFxuICAgICAgICBleHRlbnNpb24sXG4gICAgICAgIHRlc3REYXRhXG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYGV4dGVuc2lvbiBkb2VzIG5vdCBpbXBsZW1lbnQgJ0NoYXB0ZXJQcm92aWRpbmcnIGJ1dCBoYXMgdGhlICdDSEFQVEVSX1BST1ZJRElORycgY2FwYWJpbGl0eWBcbiAgICAgIClcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHJlZ2lzdGVyRGVmYXVsdEluaXRpYWxpc2F0aW9uVGVzdHMgPSBmdW5jdGlvbiAoXG4gIHN1aXRlOiBUZXN0U3VpdGUsXG4gIGV4dGVuc2lvbjogRXh0ZW5zaW9uXG4pIHtcbiAgc3VpdGUudGVzdCgnaW5pdGlhbGlzYXRpb24nLCBhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgZXh0ZW5zaW9uLmluaXRpYWxpc2UoKVxuICB9KVxufVxuXG5jb25zdCBTVEFURV9LRVkgPSB7XG4gIFNlYXJjaFJlc3VsdHNQcm92aWRpbmc6IHtcbiAgICBnZXRTZWFyY2hGaWx0ZXJzOiAnU2VhcmNoUmVzdWx0c1Byb3ZpZGluZy5nZXRTZWFyY2hGaWx0ZXJzJyxcbiAgICBnZXRTZWFyY2hSZXN1bHRzOiAnU2VhcmNoUmVzdWx0c1Byb3ZpZGluZy5nZXRTZWFyY2hSZXN1bHRzJyxcbiAgICBnZXRTb3J0aW5nT3B0aW9uczogJ1NlYXJjaFJlc3VsdHNQcm92aWRpbmcuZ2V0U29ydGluZ09wdGlvbnMnLFxuICB9LFxuICBNYW5nYVByb3ZpZGluZzoge1xuICAgIGdldE1hbmdhRGV0YWlsczogJ01hbmdhUHJvdmlkaW5nLmdldE1hbmdhRGV0YWlscycsXG4gIH0sXG4gIENoYXB0ZXJQcm92aWRpbmc6IHtcbiAgICBnZXRDaGFwdGVyczogJ0NoYXB0ZXJQcm92aWRpbmcuZ2V0Q2hhcHRlcnMnLFxuICAgIGdldENoYXB0ZXJEZXRhaWxzOiAnQ2hhcHRlclByb3ZpZGluZy5nZXRDaGFwdGVyRGV0YWlscycsXG4gIH0sXG59XG5cbmV4cG9ydCBjb25zdCByZWdpc3RlckRlZmF1bHRTZWFyY2hSZXN1bHRzUHJvdmlkaW5nU291cmNlVGVzdHMgPSBmdW5jdGlvbiAoXG4gIHN1aXRlOiBUZXN0U3VpdGUsXG4gIGV4dGVuc2lvbjogRXh0ZW5zaW9uICYgU2VhcmNoUmVzdWx0c1Byb3ZpZGluZyxcbiAge1xuICAgIHNlYXJjaFJlc3VsdHNQcm92aWRpbmc6IHRlc3REYXRhLFxuICB9OiBQaWNrPEV4dGVuc2lvblRlc3REYXRhLCAnc2VhcmNoUmVzdWx0c1Byb3ZpZGluZyc+XG4pIHtcbiAgc3VpdGUudGVzdCgnZ2V0U2VhcmNoRmlsdGVycycsIGFzeW5jICgpID0+IHtcbiAgICBleHBlY3QoZXh0ZW5zaW9uKS50by5oYXZlLnByb3BlcnR5KCdnZXRTZWFyY2hGaWx0ZXJzJylcblxuICAgIGNvbnN0IHNlYXJjaEZpbHRlcnMgPSBhd2FpdCBleHRlbnNpb24uZ2V0U2VhcmNoRmlsdGVycygpXG5cbiAgICBleHBlY3Qoc2VhcmNoRmlsdGVycykudG8ubm90LmJlLnVuZGVmaW5lZFxuICAgIHN1aXRlLnN0YXRlW1NUQVRFX0tFWS5TZWFyY2hSZXN1bHRzUHJvdmlkaW5nLmdldFNlYXJjaEZpbHRlcnNdID1cbiAgICAgIHNlYXJjaEZpbHRlcnNcbiAgfSlcblxuICBpZiAoJ2dldFNvcnRpbmdPcHRpb25zJyBpbiBleHRlbnNpb24pIHtcbiAgICBzdWl0ZS50ZXN0KCdnZXRTb3J0aW5nT3B0aW9ucycsIGFzeW5jICgpID0+IHtcbiAgICAgIGxldCBwYXJhbXMgPSB0ZXN0RGF0YT8uZ2V0U29ydGluZ09wdGlvbnNcbiAgICAgIGlmICghcGFyYW1zKSB7XG4gICAgICAgIGNvbnN0IHNlYXJjaEZpbHRlcnMgPSBzdWl0ZS5zdGF0ZVtcbiAgICAgICAgICBTVEFURV9LRVkuU2VhcmNoUmVzdWx0c1Byb3ZpZGluZy5nZXRTZWFyY2hGaWx0ZXJzXG4gICAgICAgIF0gYXMgU2VhcmNoRmlsdGVyW10gfCB1bmRlZmluZWRcbiAgICAgICAgcGFyYW1zID0gW3sgdGl0bGU6ICcnLCBmaWx0ZXJzOiBzZWFyY2hGaWx0ZXJzID8/IFtdIH1dXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNvcnRpbmdPcHRpb25zID0gYXdhaXQgZXh0ZW5zaW9uLmdldFNvcnRpbmdPcHRpb25zISguLi5wYXJhbXMpXG4gICAgICBleHBlY3Qoc29ydGluZ09wdGlvbnMpLm5vdC5lbXB0eVxuXG4gICAgICBzdWl0ZS5zdGF0ZVtTVEFURV9LRVkuU2VhcmNoUmVzdWx0c1Byb3ZpZGluZy5nZXRTb3J0aW5nT3B0aW9uc10gPVxuICAgICAgICBzb3J0aW5nT3B0aW9uc1xuICAgIH0pXG4gIH1cblxuICBzdWl0ZS50ZXN0KCdnZXRTZWFyY2hSZXN1bHRzJywgYXN5bmMgKCkgPT4ge1xuICAgIGV4cGVjdChleHRlbnNpb24pLnRvLmhhdmUucHJvcGVydHkoJ2dldFNlYXJjaFJlc3VsdHMnKVxuXG4gICAgbGV0IHBhcmFtcyA9IHRlc3REYXRhPy5nZXRTZWFyY2hSZXN1bHRzXG4gICAgaWYgKCFwYXJhbXMpIHtcbiAgICAgIGNvbnN0IHNlYXJjaEZpbHRlcnMgPSBzdWl0ZS5zdGF0ZVtcbiAgICAgICAgU1RBVEVfS0VZLlNlYXJjaFJlc3VsdHNQcm92aWRpbmcuZ2V0U2VhcmNoRmlsdGVyc1xuICAgICAgXSBhcyBTZWFyY2hGaWx0ZXJbXSB8IHVuZGVmaW5lZFxuICAgICAgY29uc3Qgc29ydGluZ09wdGlvbnMgPSBzdWl0ZS5zdGF0ZVtcbiAgICAgICAgU1RBVEVfS0VZLlNlYXJjaFJlc3VsdHNQcm92aWRpbmcuZ2V0U29ydGluZ09wdGlvbnNcbiAgICAgIF0gYXMgU29ydGluZ09wdGlvbltdIHwgdW5kZWZpbmVkXG4gICAgICBwYXJhbXMgPSBbXG4gICAgICAgIHsgdGl0bGU6ICcnLCBmaWx0ZXJzOiBzZWFyY2hGaWx0ZXJzID8/IFtdIH0sXG4gICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgc29ydGluZ09wdGlvbnM/LlswXSxcbiAgICAgIF1cbiAgICB9XG5cbiAgICBjb25zdCBzZWFyY2hSZXN1bHRzID0gYXdhaXQgZXh0ZW5zaW9uLmdldFNlYXJjaFJlc3VsdHMoLi4ucGFyYW1zKVxuICAgIGV4cGVjdChzZWFyY2hSZXN1bHRzKS5ub3QuZW1wdHlcbiAgICBleHBlY3Qoc2VhcmNoUmVzdWx0cy5pdGVtcykubm90LmJlLmVtcHR5XG5cbiAgICBzdWl0ZS5zdGF0ZVtTVEFURV9LRVkuU2VhcmNoUmVzdWx0c1Byb3ZpZGluZy5nZXRTZWFyY2hSZXN1bHRzXSA9XG4gICAgICBzZWFyY2hSZXN1bHRzXG4gIH0pXG59XG5cbmV4cG9ydCBjb25zdCByZWdpc3RlckRlZmF1bHRNYW5nYVByb3ZpZGluZ1NvdXJjZVRlc3RzID0gZnVuY3Rpb24gKFxuICBzdWl0ZTogVGVzdFN1aXRlLFxuICBleHRlbnNpb246IEV4dGVuc2lvbixcbiAgeyBtYW5nYVByb3ZpZGluZzogdGVzdERhdGEgfTogUGljazxFeHRlbnNpb25UZXN0RGF0YSwgJ21hbmdhUHJvdmlkaW5nJz5cbikge1xuICBzdWl0ZS50ZXN0KCdnZXRNYW5nYURldGFpbHMnLCBhc3luYyAoKSA9PiB7XG4gICAgZXhwZWN0KGV4dGVuc2lvbikudG8uaGF2ZS5wcm9wZXJ0eSgnZ2V0TWFuZ2FEZXRhaWxzJylcblxuICAgIGxldCBwYXJhbXMgPSB0ZXN0RGF0YT8uZ2V0TWFuZ2FEZXRhaWxzXG4gICAgaWYgKCFwYXJhbXMpIHtcbiAgICAgIGNvbnN0IHNlYXJjaFJlc3VsdHMgPSBzdWl0ZS5zdGF0ZVtcbiAgICAgICAgU1RBVEVfS0VZLlNlYXJjaFJlc3VsdHNQcm92aWRpbmcuZ2V0U2VhcmNoUmVzdWx0c1xuICAgICAgXSBhcyBQYWdlZFJlc3VsdHM8U2VhcmNoUmVzdWx0SXRlbT4gfCB1bmRlZmluZWRcbiAgICAgIGlmIChzZWFyY2hSZXN1bHRzPy5pdGVtc1swXT8ubWFuZ2FJZCkge1xuICAgICAgICBwYXJhbXMgPSBbc2VhcmNoUmVzdWx0cy5pdGVtc1swXS5tYW5nYUlkXVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdObyBgbWFuZ2FJZGAgcHJvdmlkZWQgaW4gdGVzdCBkYXRhLiBVbmFibGUgdG8gaW5mZXIgZnJvbSBgU2VhcmNoUmVzdWx0c1Byb3ZpZGluZy5nZXRTZWFyY2hSZXN1bHRzYCdcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IG1hbmdhRGV0YWlscyA9IGF3YWl0IGV4dGVuc2lvbi5nZXRNYW5nYURldGFpbHMoLi4ucGFyYW1zKVxuICAgIGV4cGVjdChtYW5nYURldGFpbHMpLnRvLm5vdC5iZS51bmRlZmluZWRcbiAgICBleHBlY3QobWFuZ2FEZXRhaWxzLm1hbmdhSW5mbykudG8ubm90LmJlLnVuZGVmaW5lZFxuXG4gICAgc3VpdGUuc3RhdGVbU1RBVEVfS0VZLk1hbmdhUHJvdmlkaW5nLmdldE1hbmdhRGV0YWlsc10gPSBtYW5nYURldGFpbHNcbiAgfSlcbn1cblxuZXhwb3J0IGNvbnN0IHJlZ2lzdGVyRGVmYXVsdENoYXB0ZXJQcm92aWRpbmdTb3VyY2VUZXN0cyA9IGZ1bmN0aW9uIChcbiAgc3VpdGU6IFRlc3RTdWl0ZSxcbiAgZXh0ZW5zaW9uOiBFeHRlbnNpb24gJiBDaGFwdGVyUHJvdmlkaW5nLFxuICB7IGNoYXB0ZXJQcm92aWRpbmc6IHRlc3REYXRhIH06IFBpY2s8RXh0ZW5zaW9uVGVzdERhdGEsICdjaGFwdGVyUHJvdmlkaW5nJz5cbikge1xuICBzdWl0ZS50ZXN0KCdnZXRDaGFwdGVycycsIGFzeW5jICgpID0+IHtcbiAgICBleHBlY3QoZXh0ZW5zaW9uKS50by5oYXZlLnByb3BlcnR5KCdnZXRDaGFwdGVycycpXG5cbiAgICBsZXQgcGFyYW1zID0gdGVzdERhdGE/LmdldENoYXB0ZXJzXG4gICAgaWYgKCFwYXJhbXMpIHtcbiAgICAgIGNvbnN0IHNvdXJjZU1hbmdhID0gc3VpdGUuc3RhdGVbXG4gICAgICAgIFNUQVRFX0tFWS5NYW5nYVByb3ZpZGluZy5nZXRNYW5nYURldGFpbHNcbiAgICAgIF0gYXMgU291cmNlTWFuZ2EgfCB1bmRlZmluZWRcblxuICAgICAgaWYgKHNvdXJjZU1hbmdhKSB7XG4gICAgICAgIHBhcmFtcyA9IFtzb3VyY2VNYW5nYV1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnTm8gYHNvdXJjZU1hbmdhYCBwcm92aWRlZCBpbiB0ZXN0IGRhdGEuIFVuYWJsZSB0byBpbmZlciBmcm9tIGBNYW5nYVByb3ZpZGluZy5nZXRNYW5nYURldGFpbHNgJ1xuICAgICAgICApXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY2hhcHRlcnMgPSBhd2FpdCBleHRlbnNpb24uZ2V0Q2hhcHRlcnMoLi4ucGFyYW1zKVxuICAgIGV4cGVjdChjaGFwdGVycykudG8ubm90LmJlLmVtcHR5XG5cbiAgICBzdWl0ZS5zdGF0ZVtTVEFURV9LRVkuQ2hhcHRlclByb3ZpZGluZy5nZXRDaGFwdGVyc10gPSBjaGFwdGVyc1xuICB9KVxuXG4gIHN1aXRlLnRlc3QoJ2dldENoYXB0ZXJEZXRhaWxzJywgYXN5bmMgKCkgPT4ge1xuICAgIGV4cGVjdChleHRlbnNpb24pLnRvLmhhdmUucHJvcGVydHkoJ2dldENoYXB0ZXJEZXRhaWxzJylcblxuICAgIGxldCBwYXJhbXMgPSB0ZXN0RGF0YT8uZ2V0Q2hhcHRlckRldGFpbHNcbiAgICBpZiAoIXBhcmFtcykge1xuICAgICAgY29uc3QgY2hhcHRlcnMgPSBzdWl0ZS5zdGF0ZVtTVEFURV9LRVkuQ2hhcHRlclByb3ZpZGluZy5nZXRDaGFwdGVyc10gYXNcbiAgICAgICAgfCBDaGFwdGVyW11cbiAgICAgICAgfCB1bmRlZmluZWRcblxuICAgICAgaWYgKGNoYXB0ZXJzPy5bMF0pIHtcbiAgICAgICAgcGFyYW1zID0gW2NoYXB0ZXJzWzBdXVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdObyBgc291cmNlTWFuZ2FgIHByb3ZpZGVkIGluIHRlc3QgZGF0YS4gVW5hYmxlIHRvIGluZmVyIGZyb20gYE1hbmdhUHJvdmlkaW5nLmdldE1hbmdhRGV0YWlsc2AnXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjaGFwdGVyRGV0YWlscyA9IGF3YWl0IGV4dGVuc2lvbi5nZXRDaGFwdGVyRGV0YWlscyguLi5wYXJhbXMpXG4gICAgZXhwZWN0KGNoYXB0ZXJEZXRhaWxzKS50by5ub3QuYmUudW5kZWZpbmVkXG5cbiAgICBzdWl0ZS5zdGF0ZVtTVEFURV9LRVkuQ2hhcHRlclByb3ZpZGluZy5nZXRDaGFwdGVyRGV0YWlsc10gPSBjaGFwdGVyRGV0YWlsc1xuICB9KVxufVxuIiwgIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9wcmVmZXItbGl0ZXJhbC1lbnVtLW1lbWJlciAqL1xuZXhwb3J0IGVudW0gU291cmNlSW50ZW50cyB7XG4gIE5PTkUgPSAwLFxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCB1c2Uge0BsaW5rIENIQVBURVJfUFJPVklESU5HfVxuICAgKi9cbiAgTUFOR0FfQ0hBUFRFUlMgPSAxIDw8IDAsXG4gIENIQVBURVJfUFJPVklESU5HID0gMSA8PCAwLFxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCB1c2Uge0BsaW5rIE1BTkdBX1BST0dSRVNTX1BST1ZJRElOR31cbiAgICovXG4gIE1BTkdBX1BST0dSRVNTID0gMSA8PCAxLFxuICBNQU5HQV9QUk9HUkVTU19QUk9WSURJTkcgPSAxIDw8IDEsXG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIHVzZSB7QGxpbmsgRElTQ09WRVJfU0VDSU9OU19QUk9WSURJTkd9XG4gICAqL1xuICBESVNDT1ZFUl9TRUNJT05TID0gMSA8PCAyLFxuICBESVNDT1ZFUl9TRUNJT05TX1BST1ZJRElORyA9IDEgPDwgMixcblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgdXNlIHtAbGluayBNQU5BR0VEX0NPTExFQ1RJT05fUFJPVklESU5HfVxuICAgKi9cbiAgQ09MTEVDVElPTl9NQU5BR0VNRU5UID0gMSA8PCAzLFxuICBNQU5BR0VEX0NPTExFQ1RJT05fUFJPVklESU5HID0gMSA8PCAzLFxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCB1c2Uge0BsaW5rIENMT1VERkxBUkVfQllQQVNTX1BST1ZJRElOR31cbiAgICovXG4gIENMT1VERkxBUkVfQllQQVNTX1JFUVVJUkVEID0gMSA8PCA0LFxuICBDTE9VREZMQVJFX0JZUEFTU19QUk9WSURJTkcgPSAxIDw8IDQsXG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIHVzZSB7QGxpbmsgU0VUVElOR1NfRk9STV9QUk9WSURJTkd9XG4gICAqL1xuICBTRVRUSU5HU19VSSA9IDEgPDwgNSxcbiAgU0VUVElOR1NfRk9STV9QUk9WSURJTkcgPSAxIDw8IDUsXG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIHVzZSB7QGxpbmsgU0VBUkNIX1JFU1VMVFNfUFJPVklESU5HfVxuICAgKi9cbiAgTUFOR0FfU0VBUkNIID0gMSA8PCA2LFxuICBTRUFSQ0hfUkVTVUxUU19QUk9WSURJTkcgPSAxIDw8IDYsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU291cmNlRGV2ZWxvcGVyIHtcbiAgcmVhZG9ubHkgbmFtZTogc3RyaW5nXG4gIHJlYWRvbmx5IHdlYnNpdGU/OiBzdHJpbmdcbiAgcmVhZG9ubHkgZ2l0aHViPzogc3RyaW5nXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU291cmNlQmFkZ2Uge1xuICByZWFkb25seSBsYWJlbDogc3RyaW5nXG4gIHJlYWRvbmx5IHRleHRDb2xvcjogc3RyaW5nXG4gIHJlYWRvbmx5IGJhY2tncm91bmRDb2xvcjogc3RyaW5nXG59XG5cbi8qKlxuICogQSBjb250ZW50IHJhdGluZyB0byBiZSBhdHRyaWJ1dGVkIHRvIGVhY2ggc291cmNlLlxuICovXG5leHBvcnQgZW51bSBDb250ZW50UmF0aW5nIHtcbiAgRVZFUllPTkUgPSAnU0FGRScsXG4gIE1BVFVSRSA9ICdNQVRVUkUnLFxuICBBRFVMVCA9ICdBRFVMVCcsXG59XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgdXNlIHtAbGluayBFeHRlbnNpb25JbmZvfVxuICovXG5leHBvcnQgdHlwZSBTb3VyY2VJbmZvID0gRXh0ZW5zaW9uSW5mb1xuXG5leHBvcnQgaW50ZXJmYWNlIEV4dGVuc2lvbkluZm8ge1xuICAvKipcbiAgICogUmVxdWlyZWQgY2xhc3MgdmFyaWFibGUgd2hpY2ggZGVub3RlcyB0aGUgY3VycmVudCB2ZXJzaW9uIG9mIHRoZSBhcHBsaWNhdGlvbi5cbiAgICogVGhpcyBpcyB3aGF0IHRoZSBhcHBsaWNhdGlvbiB1c2VzIHRvIGRldGVybWluZSB3aGV0aGVyIGl0IG5lZWRzIHRvIHVwZGF0ZSBpdCdzIGxvY2FsXG4gICAqIHZlcnNpb24gb2YgdGhlIHNvdXJjZSwgdG8gYSBuZXcgdmVyc2lvbiBvbiB0aGUgcmVwb3NpdG9yeVxuICAgKi9cbiAgcmVhZG9ubHkgdmVyc2lvbjogc3RyaW5nXG5cbiAgLyoqXG4gICAqIFRoZSB0aXRsZSBvZiB0aGlzIHNvdXJjZSwgdGhpcyBpcyB3aGF0IHdpbGwgc2hvdyB1cCBpbiB0aGUgYXBwbGljYXRpb25cbiAgICogdG8gaWRlbnRpZnkgd2hhdCBNYW5nYSBsb2NhdGlvbiBpcyBiZWluZyB0YXJnZXRlZFxuICAgKi9cbiAgcmVhZG9ubHkgbmFtZTogc3RyaW5nXG5cbiAgLyoqXG4gICAqIEFuIElOVEVSTkFMIHJlZmVyZW5jZSB0byBhbiBpY29uIHdoaWNoIGlzIGFzc29jaWF0ZWQgd2l0aCB0aGlzIHNvdXJjZS5cbiAgICogVGhpcyBJY29uIHNob3VsZCBpZGVhbGx5IGJlIGEgbWF0Y2hpbmcgYXNwZWN0IHJhdGlvIChhIGN1YmUpXG4gICAqIFRoZSBsb2NhdGlvbiBvZiB0aGlzIHNob3VsZCBiZSBpbiBhbiBpbmNsdWRlcyBkaXJlY3RvcnkgbmV4dCB0byB5b3VyIHNvdXJjZS5cbiAgICogRm9yIGV4YW1wbGUsIHRoZSBQYXBlcmJhY2sgbGluayBzaXRzIGF0OiBzb3VyY2VzL1BhcGVyYmFjay9zdGF0aWMvaWNvbi5wbmdcbiAgICogVGhpcyB7QGxpbmsgU291cmNlLmljb259IGZpZWxkIHdvdWxkIHRoZW4gYmUgc2ltcGx5IHJlZmVyZW5jZWQgYXMgJ2ljb24ucG5nJyBhbmRcbiAgICogdGhlIHBhdGggd2lsbCB0aGVuIHJlc29sdmUgY29ycmVjdGx5IGludGVybmFsbHlcbiAgICovXG4gIHJlYWRvbmx5IGljb246IHN0cmluZ1xuXG4gIC8qKlxuICAgKiBBIGJyaWVmIGRlc2NyaXB0aW9uIG9mIHdoYXQgdGhpcyBzb3VyY2UgdGFyZ2V0cy4gVGhpcyBpcyBhZGRpdGlvbmFsIGNvbnRlbnQgZGlzcGxheWVkIHRvIHRoZSB1c2VyIHdoZW5cbiAgICogYnJvd3Npbmcgc291cmNlcy5cbiAgICogV2hhdCB3ZWJzaXRlIGRvZXMgaXQgdGFyZ2V0PyBXaGF0IGZlYXR1cmVzIGFyZSB3b3JraW5nPyBFdGMuXG4gICAqL1xuICByZWFkb25seSBkZXNjcmlwdGlvbjogc3RyaW5nXG5cbiAgLyoqXG4gICAqIEEgY29udGVudCByYXRpbmcgYXR0cmlidXRlZCB0byBlYWNoIHNvdXJjZS4gVGhpcyBjYW4gYmUgb25lIG9mIHRocmVlIHZhbHVlcywgYW5kIHNob3VsZCBiZSBzZXQgYXBwcm9wcmlhdGVseS5cbiAgICogRXZlcnlvbmU6IFRoaXMgc291cmNlIGRvZXMgbm90IGhhdmUgYW55IHNvcnQgb2YgYWR1bHQgY29udGVudCBhdmFpbGFibGUuIEVhY2ggdGl0bGUgd2l0aGluIGlzIGFzc3VtZWQgc2FmZSBmb3IgYWxsIGF1ZGllbmNlc1xuICAgKiBNYXR1cmU6IFRoaXMgc291cmNlIE1BWSBoYXZlIG1hdHVyZSBjb250ZW50IGluc2lkZSBvZiBpdC4gRXZlbiBpZiBtb3N0IGNvbnRlbnQgaXMgc2FmZSwgbWF0dXJlIHNob3VsZCBiZSBzZWxlY3RlZCBldmVuIGlmIGEgc21hbGwgc3Vic2V0IGFwcGxpZXNcbiAgICogQWR1bHQ6IFRoaXMgc291cmNlIHByb2JhYmx5IGhhcyBzdHJhaWdodCB1cCBwb3Jub2dyYXBoeSBhdmFpbGFibGUuXG4gICAqXG4gICAqIFRoaXMgcmF0aW5nIGhlbHBzIHVzIGZpbHRlciB5b3VyIHNvdXJjZSB0byB1c2VycyB3aG8gaGF2ZSB0aGUgbmVjZXNzYXJ5IHZpc2liaWxpdHkgcnVsZXMgdG9nZ2xlZCBmb3IgdGhlaXIgcHJvZmlsZS5cbiAgICogTmF0dXJhbGx5LCBvbmx5ICdFdmVyeW9uZScgc291cmNlcyB3aWxsIHNob3cgdXAgZm9yIHVzZXJzIHdpdGhvdXQgYW4gYWNjb3VudCwgb3Igd2l0aG91dCBhbnkgbW9kZSB0b2dnbGVzIGNoYW5nZWQuXG4gICAqL1xuICByZWFkb25seSBjb250ZW50UmF0aW5nOiBDb250ZW50UmF0aW5nXG5cbiAgLyoqXG4gICAqIFRoZSBhdXRob3Igb2YgdGhpcyBzb3VyY2UuIFRoZSBzdHJpbmcgaGVyZSB3aWxsIGJlIHNob3duIG9mZiB0byB0aGUgcHVibGljIG9uIHRoZSBhcHBsaWNhdGlvblxuICAgKiBpbnRlcmZhY2UsIHNvIG9ubHkgd3JpdGUgd2hhdCB5b3UncmUgY29tZm9ydGFibGUgd2l0aCBzaG93aW5nXG4gICAqL1xuICByZWFkb25seSBkZXZlbG9wZXJzOiBTb3VyY2VEZXZlbG9wZXJbXVxuXG4gIC8qKlxuICAgKiBBbiBvcHRpb25hbCBmaWVsZCB0aGF0IGRlZmluZXMgdGhlIGxhbmd1YWdlIG9mIHRoZSBleHRlbnNpb24ncyBzb3VyY2VcbiAgICovXG4gIHJlYWRvbmx5IGxhbmd1YWdlPzogc3RyaW5nXG5cbiAgLyoqXG4gICAqIExpdHRsZSBiaXRzIG9mIG1ldGFkYXRhIHdoaWNoIGlzIHJlbmRlcmVkIG9uIHRoZSB3ZWJzaXRlXG4gICAqIHVuZGVyIHlvdXIgcmVwb3NpdG9yaWVzIHNlY3Rpb25cbiAgICovXG4gIHJlYWRvbmx5IGJhZGdlczogU291cmNlQmFkZ2VbXVxuXG4gIHJlYWRvbmx5IGNhcGFiaWxpdGllczogU291cmNlSW50ZW50c1tdIHwgU291cmNlSW50ZW50c1xufVxuIiwgInZhciBfX2RlZlByb3AgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG52YXIgX19uYW1lID0gKHRhcmdldCwgdmFsdWUpID0+IF9fZGVmUHJvcCh0YXJnZXQsIFwibmFtZVwiLCB7IHZhbHVlLCBjb25maWd1cmFibGU6IHRydWUgfSk7XG52YXIgX19leHBvcnQgPSAodGFyZ2V0LCBhbGwpID0+IHtcbiAgZm9yICh2YXIgbmFtZSBpbiBhbGwpXG4gICAgX19kZWZQcm9wKHRhcmdldCwgbmFtZSwgeyBnZXQ6IGFsbFtuYW1lXSwgZW51bWVyYWJsZTogdHJ1ZSB9KTtcbn07XG5cbi8vIGxpYi9jaGFpL3V0aWxzL2luZGV4LmpzXG52YXIgdXRpbHNfZXhwb3J0cyA9IHt9O1xuX19leHBvcnQodXRpbHNfZXhwb3J0cywge1xuICBhZGRDaGFpbmFibGVNZXRob2Q6ICgpID0+IGFkZENoYWluYWJsZU1ldGhvZCxcbiAgYWRkTGVuZ3RoR3VhcmQ6ICgpID0+IGFkZExlbmd0aEd1YXJkLFxuICBhZGRNZXRob2Q6ICgpID0+IGFkZE1ldGhvZCxcbiAgYWRkUHJvcGVydHk6ICgpID0+IGFkZFByb3BlcnR5LFxuICBjaGVja0Vycm9yOiAoKSA9PiBjaGVja19lcnJvcl9leHBvcnRzLFxuICBjb21wYXJlQnlJbnNwZWN0OiAoKSA9PiBjb21wYXJlQnlJbnNwZWN0LFxuICBlcWw6ICgpID0+IGRlZXBfZXFsX2RlZmF1bHQsXG4gIGV4cGVjdFR5cGVzOiAoKSA9PiBleHBlY3RUeXBlcyxcbiAgZmxhZzogKCkgPT4gZmxhZyxcbiAgZ2V0QWN0dWFsOiAoKSA9PiBnZXRBY3R1YWwsXG4gIGdldE1lc3NhZ2U6ICgpID0+IGdldE1lc3NhZ2UyLFxuICBnZXROYW1lOiAoKSA9PiBnZXROYW1lLFxuICBnZXRPcGVyYXRvcjogKCkgPT4gZ2V0T3BlcmF0b3IsXG4gIGdldE93bkVudW1lcmFibGVQcm9wZXJ0aWVzOiAoKSA9PiBnZXRPd25FbnVtZXJhYmxlUHJvcGVydGllcyxcbiAgZ2V0T3duRW51bWVyYWJsZVByb3BlcnR5U3ltYm9sczogKCkgPT4gZ2V0T3duRW51bWVyYWJsZVByb3BlcnR5U3ltYm9scyxcbiAgZ2V0UGF0aEluZm86ICgpID0+IGdldFBhdGhJbmZvLFxuICBoYXNQcm9wZXJ0eTogKCkgPT4gaGFzUHJvcGVydHksXG4gIGluc3BlY3Q6ICgpID0+IGluc3BlY3QyLFxuICBpc05hTjogKCkgPT4gaXNOYU4yLFxuICBpc051bWVyaWM6ICgpID0+IGlzTnVtZXJpYyxcbiAgaXNQcm94eUVuYWJsZWQ6ICgpID0+IGlzUHJveHlFbmFibGVkLFxuICBpc1JlZ0V4cDogKCkgPT4gaXNSZWdFeHAyLFxuICBvYmpEaXNwbGF5OiAoKSA9PiBvYmpEaXNwbGF5LFxuICBvdmVyd3JpdGVDaGFpbmFibGVNZXRob2Q6ICgpID0+IG92ZXJ3cml0ZUNoYWluYWJsZU1ldGhvZCxcbiAgb3ZlcndyaXRlTWV0aG9kOiAoKSA9PiBvdmVyd3JpdGVNZXRob2QsXG4gIG92ZXJ3cml0ZVByb3BlcnR5OiAoKSA9PiBvdmVyd3JpdGVQcm9wZXJ0eSxcbiAgcHJveGlmeTogKCkgPT4gcHJveGlmeSxcbiAgdGVzdDogKCkgPT4gdGVzdCxcbiAgdHJhbnNmZXJGbGFnczogKCkgPT4gdHJhbnNmZXJGbGFncyxcbiAgdHlwZTogKCkgPT4gdHlwZVxufSk7XG5cbi8vIG5vZGVfbW9kdWxlcy9jaGVjay1lcnJvci9pbmRleC5qc1xudmFyIGNoZWNrX2Vycm9yX2V4cG9ydHMgPSB7fTtcbl9fZXhwb3J0KGNoZWNrX2Vycm9yX2V4cG9ydHMsIHtcbiAgY29tcGF0aWJsZUNvbnN0cnVjdG9yOiAoKSA9PiBjb21wYXRpYmxlQ29uc3RydWN0b3IsXG4gIGNvbXBhdGlibGVJbnN0YW5jZTogKCkgPT4gY29tcGF0aWJsZUluc3RhbmNlLFxuICBjb21wYXRpYmxlTWVzc2FnZTogKCkgPT4gY29tcGF0aWJsZU1lc3NhZ2UsXG4gIGdldENvbnN0cnVjdG9yTmFtZTogKCkgPT4gZ2V0Q29uc3RydWN0b3JOYW1lLFxuICBnZXRNZXNzYWdlOiAoKSA9PiBnZXRNZXNzYWdlXG59KTtcbmZ1bmN0aW9uIGlzRXJyb3JJbnN0YW5jZShvYmopIHtcbiAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIEVycm9yIHx8IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSBcIltvYmplY3QgRXJyb3JdXCI7XG59XG5fX25hbWUoaXNFcnJvckluc3RhbmNlLCBcImlzRXJyb3JJbnN0YW5jZVwiKTtcbmZ1bmN0aW9uIGlzUmVnRXhwKG9iaikge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09IFwiW29iamVjdCBSZWdFeHBdXCI7XG59XG5fX25hbWUoaXNSZWdFeHAsIFwiaXNSZWdFeHBcIik7XG5mdW5jdGlvbiBjb21wYXRpYmxlSW5zdGFuY2UodGhyb3duLCBlcnJvckxpa2UpIHtcbiAgcmV0dXJuIGlzRXJyb3JJbnN0YW5jZShlcnJvckxpa2UpICYmIHRocm93biA9PT0gZXJyb3JMaWtlO1xufVxuX19uYW1lKGNvbXBhdGlibGVJbnN0YW5jZSwgXCJjb21wYXRpYmxlSW5zdGFuY2VcIik7XG5mdW5jdGlvbiBjb21wYXRpYmxlQ29uc3RydWN0b3IodGhyb3duLCBlcnJvckxpa2UpIHtcbiAgaWYgKGlzRXJyb3JJbnN0YW5jZShlcnJvckxpa2UpKSB7XG4gICAgcmV0dXJuIHRocm93bi5jb25zdHJ1Y3RvciA9PT0gZXJyb3JMaWtlLmNvbnN0cnVjdG9yIHx8IHRocm93biBpbnN0YW5jZW9mIGVycm9yTGlrZS5jb25zdHJ1Y3RvcjtcbiAgfSBlbHNlIGlmICgodHlwZW9mIGVycm9yTGlrZSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgZXJyb3JMaWtlID09PSBcImZ1bmN0aW9uXCIpICYmIGVycm9yTGlrZS5wcm90b3R5cGUpIHtcbiAgICByZXR1cm4gdGhyb3duLmNvbnN0cnVjdG9yID09PSBlcnJvckxpa2UgfHwgdGhyb3duIGluc3RhbmNlb2YgZXJyb3JMaWtlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cbl9fbmFtZShjb21wYXRpYmxlQ29uc3RydWN0b3IsIFwiY29tcGF0aWJsZUNvbnN0cnVjdG9yXCIpO1xuZnVuY3Rpb24gY29tcGF0aWJsZU1lc3NhZ2UodGhyb3duLCBlcnJNYXRjaGVyKSB7XG4gIGNvbnN0IGNvbXBhcmlzb25TdHJpbmcgPSB0eXBlb2YgdGhyb3duID09PSBcInN0cmluZ1wiID8gdGhyb3duIDogdGhyb3duLm1lc3NhZ2U7XG4gIGlmIChpc1JlZ0V4cChlcnJNYXRjaGVyKSkge1xuICAgIHJldHVybiBlcnJNYXRjaGVyLnRlc3QoY29tcGFyaXNvblN0cmluZyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGVyck1hdGNoZXIgPT09IFwic3RyaW5nXCIpIHtcbiAgICByZXR1cm4gY29tcGFyaXNvblN0cmluZy5pbmRleE9mKGVyck1hdGNoZXIpICE9PSAtMTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5fX25hbWUoY29tcGF0aWJsZU1lc3NhZ2UsIFwiY29tcGF0aWJsZU1lc3NhZ2VcIik7XG5mdW5jdGlvbiBnZXRDb25zdHJ1Y3Rvck5hbWUoZXJyb3JMaWtlKSB7XG4gIGxldCBjb25zdHJ1Y3Rvck5hbWUgPSBlcnJvckxpa2U7XG4gIGlmIChpc0Vycm9ySW5zdGFuY2UoZXJyb3JMaWtlKSkge1xuICAgIGNvbnN0cnVjdG9yTmFtZSA9IGVycm9yTGlrZS5jb25zdHJ1Y3Rvci5uYW1lO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBlcnJvckxpa2UgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGNvbnN0cnVjdG9yTmFtZSA9IGVycm9yTGlrZS5uYW1lO1xuICAgIGlmIChjb25zdHJ1Y3Rvck5hbWUgPT09IFwiXCIpIHtcbiAgICAgIGNvbnN0IG5ld0NvbnN0cnVjdG9yTmFtZSA9IG5ldyBlcnJvckxpa2UoKS5uYW1lO1xuICAgICAgY29uc3RydWN0b3JOYW1lID0gbmV3Q29uc3RydWN0b3JOYW1lIHx8IGNvbnN0cnVjdG9yTmFtZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvbnN0cnVjdG9yTmFtZTtcbn1cbl9fbmFtZShnZXRDb25zdHJ1Y3Rvck5hbWUsIFwiZ2V0Q29uc3RydWN0b3JOYW1lXCIpO1xuZnVuY3Rpb24gZ2V0TWVzc2FnZShlcnJvckxpa2UpIHtcbiAgbGV0IG1zZyA9IFwiXCI7XG4gIGlmIChlcnJvckxpa2UgJiYgZXJyb3JMaWtlLm1lc3NhZ2UpIHtcbiAgICBtc2cgPSBlcnJvckxpa2UubWVzc2FnZTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZXJyb3JMaWtlID09PSBcInN0cmluZ1wiKSB7XG4gICAgbXNnID0gZXJyb3JMaWtlO1xuICB9XG4gIHJldHVybiBtc2c7XG59XG5fX25hbWUoZ2V0TWVzc2FnZSwgXCJnZXRNZXNzYWdlXCIpO1xuXG4vLyBsaWIvY2hhaS91dGlscy9mbGFnLmpzXG5mdW5jdGlvbiBmbGFnKG9iaiwga2V5LCB2YWx1ZSkge1xuICBsZXQgZmxhZ3MgPSBvYmouX19mbGFncyB8fCAob2JqLl9fZmxhZ3MgPSAvKiBAX19QVVJFX18gKi8gT2JqZWN0LmNyZWF0ZShudWxsKSk7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzKSB7XG4gICAgZmxhZ3Nba2V5XSA9IHZhbHVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmbGFnc1trZXldO1xuICB9XG59XG5fX25hbWUoZmxhZywgXCJmbGFnXCIpO1xuXG4vLyBsaWIvY2hhaS91dGlscy90ZXN0LmpzXG5mdW5jdGlvbiB0ZXN0KG9iaiwgYXJncykge1xuICBsZXQgbmVnYXRlID0gZmxhZyhvYmosIFwibmVnYXRlXCIpLCBleHByID0gYXJnc1swXTtcbiAgcmV0dXJuIG5lZ2F0ZSA/ICFleHByIDogZXhwcjtcbn1cbl9fbmFtZSh0ZXN0LCBcInRlc3RcIik7XG5cbi8vIGxpYi9jaGFpL3V0aWxzL3R5cGUtZGV0ZWN0LmpzXG5mdW5jdGlvbiB0eXBlKG9iaikge1xuICBpZiAodHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiBcInVuZGVmaW5lZFwiO1xuICB9XG4gIGlmIChvYmogPT09IG51bGwpIHtcbiAgICByZXR1cm4gXCJudWxsXCI7XG4gIH1cbiAgY29uc3Qgc3RyaW5nVGFnID0gb2JqW1N5bWJvbC50b1N0cmluZ1RhZ107XG4gIGlmICh0eXBlb2Ygc3RyaW5nVGFnID09PSBcInN0cmluZ1wiKSB7XG4gICAgcmV0dXJuIHN0cmluZ1RhZztcbiAgfVxuICBjb25zdCB0eXBlMyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopLnNsaWNlKDgsIC0xKTtcbiAgcmV0dXJuIHR5cGUzO1xufVxuX19uYW1lKHR5cGUsIFwidHlwZVwiKTtcblxuLy8gbm9kZV9tb2R1bGVzL2Fzc2VydGlvbi1lcnJvci9pbmRleC5qc1xudmFyIGNhbkVsaWRlRnJhbWVzID0gXCJjYXB0dXJlU3RhY2tUcmFjZVwiIGluIEVycm9yO1xudmFyIEFzc2VydGlvbkVycm9yID0gY2xhc3MgX0Fzc2VydGlvbkVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBzdGF0aWMge1xuICAgIF9fbmFtZSh0aGlzLCBcIkFzc2VydGlvbkVycm9yXCIpO1xuICB9XG4gIG1lc3NhZ2U7XG4gIGdldCBuYW1lKCkge1xuICAgIHJldHVybiBcIkFzc2VydGlvbkVycm9yXCI7XG4gIH1cbiAgZ2V0IG9rKCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBjb25zdHJ1Y3RvcihtZXNzYWdlID0gXCJVbnNwZWNpZmllZCBBc3NlcnRpb25FcnJvclwiLCBwcm9wcywgc3NmKSB7XG4gICAgc3VwZXIobWVzc2FnZSk7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICBpZiAoY2FuRWxpZGVGcmFtZXMpIHtcbiAgICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHNzZiB8fCBfQXNzZXJ0aW9uRXJyb3IpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBwcm9wcykge1xuICAgICAgaWYgKCEoa2V5IGluIHRoaXMpKSB7XG4gICAgICAgIHRoaXNba2V5XSA9IHByb3BzW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHRvSlNPTihzdGFjaykge1xuICAgIHJldHVybiB7XG4gICAgICAuLi50aGlzLFxuICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgbWVzc2FnZTogdGhpcy5tZXNzYWdlLFxuICAgICAgb2s6IGZhbHNlLFxuICAgICAgc3RhY2s6IHN0YWNrICE9PSBmYWxzZSA/IHRoaXMuc3RhY2sgOiB2b2lkIDBcbiAgICB9O1xuICB9XG59O1xuXG4vLyBsaWIvY2hhaS91dGlscy9leHBlY3RUeXBlcy5qc1xuZnVuY3Rpb24gZXhwZWN0VHlwZXMob2JqLCB0eXBlcykge1xuICBsZXQgZmxhZ01zZyA9IGZsYWcob2JqLCBcIm1lc3NhZ2VcIik7XG4gIGxldCBzc2ZpID0gZmxhZyhvYmosIFwic3NmaVwiKTtcbiAgZmxhZ01zZyA9IGZsYWdNc2cgPyBmbGFnTXNnICsgXCI6IFwiIDogXCJcIjtcbiAgb2JqID0gZmxhZyhvYmosIFwib2JqZWN0XCIpO1xuICB0eXBlcyA9IHR5cGVzLm1hcChmdW5jdGlvbih0KSB7XG4gICAgcmV0dXJuIHQudG9Mb3dlckNhc2UoKTtcbiAgfSk7XG4gIHR5cGVzLnNvcnQoKTtcbiAgbGV0IHN0ciA9IHR5cGVzLm1hcChmdW5jdGlvbih0LCBpbmRleCkge1xuICAgIGxldCBhcnQgPSB+W1wiYVwiLCBcImVcIiwgXCJpXCIsIFwib1wiLCBcInVcIl0uaW5kZXhPZih0LmNoYXJBdCgwKSkgPyBcImFuXCIgOiBcImFcIjtcbiAgICBsZXQgb3IgPSB0eXBlcy5sZW5ndGggPiAxICYmIGluZGV4ID09PSB0eXBlcy5sZW5ndGggLSAxID8gXCJvciBcIiA6IFwiXCI7XG4gICAgcmV0dXJuIG9yICsgYXJ0ICsgXCIgXCIgKyB0O1xuICB9KS5qb2luKFwiLCBcIik7XG4gIGxldCBvYmpUeXBlID0gdHlwZShvYmopLnRvTG93ZXJDYXNlKCk7XG4gIGlmICghdHlwZXMuc29tZShmdW5jdGlvbihleHBlY3RlZCkge1xuICAgIHJldHVybiBvYmpUeXBlID09PSBleHBlY3RlZDtcbiAgfSkpIHtcbiAgICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IoXG4gICAgICBmbGFnTXNnICsgXCJvYmplY3QgdGVzdGVkIG11c3QgYmUgXCIgKyBzdHIgKyBcIiwgYnV0IFwiICsgb2JqVHlwZSArIFwiIGdpdmVuXCIsXG4gICAgICB2b2lkIDAsXG4gICAgICBzc2ZpXG4gICAgKTtcbiAgfVxufVxuX19uYW1lKGV4cGVjdFR5cGVzLCBcImV4cGVjdFR5cGVzXCIpO1xuXG4vLyBsaWIvY2hhaS91dGlscy9nZXRBY3R1YWwuanNcbmZ1bmN0aW9uIGdldEFjdHVhbChvYmosIGFyZ3MpIHtcbiAgcmV0dXJuIGFyZ3MubGVuZ3RoID4gNCA/IGFyZ3NbNF0gOiBvYmouX29iajtcbn1cbl9fbmFtZShnZXRBY3R1YWwsIFwiZ2V0QWN0dWFsXCIpO1xuXG4vLyBub2RlX21vZHVsZXMvbG91cGUvbGliL2hlbHBlcnMuanNcbnZhciBhbnNpQ29sb3JzID0ge1xuICBib2xkOiBbXCIxXCIsIFwiMjJcIl0sXG4gIGRpbTogW1wiMlwiLCBcIjIyXCJdLFxuICBpdGFsaWM6IFtcIjNcIiwgXCIyM1wiXSxcbiAgdW5kZXJsaW5lOiBbXCI0XCIsIFwiMjRcIl0sXG4gIC8vIDUgJiA2IGFyZSBibGlua2luZ1xuICBpbnZlcnNlOiBbXCI3XCIsIFwiMjdcIl0sXG4gIGhpZGRlbjogW1wiOFwiLCBcIjI4XCJdLFxuICBzdHJpa2U6IFtcIjlcIiwgXCIyOVwiXSxcbiAgLy8gMTAtMjAgYXJlIGZvbnRzXG4gIC8vIDIxLTI5IGFyZSByZXNldHMgZm9yIDEtOVxuICBibGFjazogW1wiMzBcIiwgXCIzOVwiXSxcbiAgcmVkOiBbXCIzMVwiLCBcIjM5XCJdLFxuICBncmVlbjogW1wiMzJcIiwgXCIzOVwiXSxcbiAgeWVsbG93OiBbXCIzM1wiLCBcIjM5XCJdLFxuICBibHVlOiBbXCIzNFwiLCBcIjM5XCJdLFxuICBtYWdlbnRhOiBbXCIzNVwiLCBcIjM5XCJdLFxuICBjeWFuOiBbXCIzNlwiLCBcIjM5XCJdLFxuICB3aGl0ZTogW1wiMzdcIiwgXCIzOVwiXSxcbiAgYnJpZ2h0YmxhY2s6IFtcIjMwOzFcIiwgXCIzOVwiXSxcbiAgYnJpZ2h0cmVkOiBbXCIzMTsxXCIsIFwiMzlcIl0sXG4gIGJyaWdodGdyZWVuOiBbXCIzMjsxXCIsIFwiMzlcIl0sXG4gIGJyaWdodHllbGxvdzogW1wiMzM7MVwiLCBcIjM5XCJdLFxuICBicmlnaHRibHVlOiBbXCIzNDsxXCIsIFwiMzlcIl0sXG4gIGJyaWdodG1hZ2VudGE6IFtcIjM1OzFcIiwgXCIzOVwiXSxcbiAgYnJpZ2h0Y3lhbjogW1wiMzY7MVwiLCBcIjM5XCJdLFxuICBicmlnaHR3aGl0ZTogW1wiMzc7MVwiLCBcIjM5XCJdLFxuICBncmV5OiBbXCI5MFwiLCBcIjM5XCJdXG59O1xudmFyIHN0eWxlcyA9IHtcbiAgc3BlY2lhbDogXCJjeWFuXCIsXG4gIG51bWJlcjogXCJ5ZWxsb3dcIixcbiAgYmlnaW50OiBcInllbGxvd1wiLFxuICBib29sZWFuOiBcInllbGxvd1wiLFxuICB1bmRlZmluZWQ6IFwiZ3JleVwiLFxuICBudWxsOiBcImJvbGRcIixcbiAgc3RyaW5nOiBcImdyZWVuXCIsXG4gIHN5bWJvbDogXCJncmVlblwiLFxuICBkYXRlOiBcIm1hZ2VudGFcIixcbiAgcmVnZXhwOiBcInJlZFwiXG59O1xudmFyIHRydW5jYXRvciA9IFwiXFx1MjAyNlwiO1xuZnVuY3Rpb24gY29sb3Jpc2UodmFsdWUsIHN0eWxlVHlwZSkge1xuICBjb25zdCBjb2xvciA9IGFuc2lDb2xvcnNbc3R5bGVzW3N0eWxlVHlwZV1dIHx8IGFuc2lDb2xvcnNbc3R5bGVUeXBlXSB8fCBcIlwiO1xuICBpZiAoIWNvbG9yKSB7XG4gICAgcmV0dXJuIFN0cmluZyh2YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIGBcXHgxQlske2NvbG9yWzBdfW0ke1N0cmluZyh2YWx1ZSl9XFx4MUJbJHtjb2xvclsxXX1tYDtcbn1cbl9fbmFtZShjb2xvcmlzZSwgXCJjb2xvcmlzZVwiKTtcbmZ1bmN0aW9uIG5vcm1hbGlzZU9wdGlvbnMoe1xuICBzaG93SGlkZGVuID0gZmFsc2UsXG4gIGRlcHRoID0gMixcbiAgY29sb3JzID0gZmFsc2UsXG4gIGN1c3RvbUluc3BlY3QgPSB0cnVlLFxuICBzaG93UHJveHkgPSBmYWxzZSxcbiAgbWF4QXJyYXlMZW5ndGggPSBJbmZpbml0eSxcbiAgYnJlYWtMZW5ndGggPSBJbmZpbml0eSxcbiAgc2VlbiA9IFtdLFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2hhZG93XG4gIHRydW5jYXRlOiB0cnVuY2F0ZTIgPSBJbmZpbml0eSxcbiAgc3R5bGl6ZSA9IFN0cmluZ1xufSA9IHt9LCBpbnNwZWN0Mykge1xuICBjb25zdCBvcHRpb25zID0ge1xuICAgIHNob3dIaWRkZW46IEJvb2xlYW4oc2hvd0hpZGRlbiksXG4gICAgZGVwdGg6IE51bWJlcihkZXB0aCksXG4gICAgY29sb3JzOiBCb29sZWFuKGNvbG9ycyksXG4gICAgY3VzdG9tSW5zcGVjdDogQm9vbGVhbihjdXN0b21JbnNwZWN0KSxcbiAgICBzaG93UHJveHk6IEJvb2xlYW4oc2hvd1Byb3h5KSxcbiAgICBtYXhBcnJheUxlbmd0aDogTnVtYmVyKG1heEFycmF5TGVuZ3RoKSxcbiAgICBicmVha0xlbmd0aDogTnVtYmVyKGJyZWFrTGVuZ3RoKSxcbiAgICB0cnVuY2F0ZTogTnVtYmVyKHRydW5jYXRlMiksXG4gICAgc2VlbixcbiAgICBpbnNwZWN0OiBpbnNwZWN0MyxcbiAgICBzdHlsaXplXG4gIH07XG4gIGlmIChvcHRpb25zLmNvbG9ycykge1xuICAgIG9wdGlvbnMuc3R5bGl6ZSA9IGNvbG9yaXNlO1xuICB9XG4gIHJldHVybiBvcHRpb25zO1xufVxuX19uYW1lKG5vcm1hbGlzZU9wdGlvbnMsIFwibm9ybWFsaXNlT3B0aW9uc1wiKTtcbmZ1bmN0aW9uIGlzSGlnaFN1cnJvZ2F0ZShjaGFyKSB7XG4gIHJldHVybiBjaGFyID49IFwiXFx1RDgwMFwiICYmIGNoYXIgPD0gXCJcXHVEQkZGXCI7XG59XG5fX25hbWUoaXNIaWdoU3Vycm9nYXRlLCBcImlzSGlnaFN1cnJvZ2F0ZVwiKTtcbmZ1bmN0aW9uIHRydW5jYXRlKHN0cmluZywgbGVuZ3RoLCB0YWlsID0gdHJ1bmNhdG9yKSB7XG4gIHN0cmluZyA9IFN0cmluZyhzdHJpbmcpO1xuICBjb25zdCB0YWlsTGVuZ3RoID0gdGFpbC5sZW5ndGg7XG4gIGNvbnN0IHN0cmluZ0xlbmd0aCA9IHN0cmluZy5sZW5ndGg7XG4gIGlmICh0YWlsTGVuZ3RoID4gbGVuZ3RoICYmIHN0cmluZ0xlbmd0aCA+IHRhaWxMZW5ndGgpIHtcbiAgICByZXR1cm4gdGFpbDtcbiAgfVxuICBpZiAoc3RyaW5nTGVuZ3RoID4gbGVuZ3RoICYmIHN0cmluZ0xlbmd0aCA+IHRhaWxMZW5ndGgpIHtcbiAgICBsZXQgZW5kID0gbGVuZ3RoIC0gdGFpbExlbmd0aDtcbiAgICBpZiAoZW5kID4gMCAmJiBpc0hpZ2hTdXJyb2dhdGUoc3RyaW5nW2VuZCAtIDFdKSkge1xuICAgICAgZW5kID0gZW5kIC0gMTtcbiAgICB9XG4gICAgcmV0dXJuIGAke3N0cmluZy5zbGljZSgwLCBlbmQpfSR7dGFpbH1gO1xuICB9XG4gIHJldHVybiBzdHJpbmc7XG59XG5fX25hbWUodHJ1bmNhdGUsIFwidHJ1bmNhdGVcIik7XG5mdW5jdGlvbiBpbnNwZWN0TGlzdChsaXN0LCBvcHRpb25zLCBpbnNwZWN0SXRlbSwgc2VwYXJhdG9yID0gXCIsIFwiKSB7XG4gIGluc3BlY3RJdGVtID0gaW5zcGVjdEl0ZW0gfHwgb3B0aW9ucy5pbnNwZWN0O1xuICBjb25zdCBzaXplID0gbGlzdC5sZW5ndGg7XG4gIGlmIChzaXplID09PSAwKVxuICAgIHJldHVybiBcIlwiO1xuICBjb25zdCBvcmlnaW5hbExlbmd0aCA9IG9wdGlvbnMudHJ1bmNhdGU7XG4gIGxldCBvdXRwdXQgPSBcIlwiO1xuICBsZXQgcGVlayA9IFwiXCI7XG4gIGxldCB0cnVuY2F0ZWQgPSBcIlwiO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkgKz0gMSkge1xuICAgIGNvbnN0IGxhc3QgPSBpICsgMSA9PT0gbGlzdC5sZW5ndGg7XG4gICAgY29uc3Qgc2Vjb25kVG9MYXN0ID0gaSArIDIgPT09IGxpc3QubGVuZ3RoO1xuICAgIHRydW5jYXRlZCA9IGAke3RydW5jYXRvcn0oJHtsaXN0Lmxlbmd0aCAtIGl9KWA7XG4gICAgY29uc3QgdmFsdWUgPSBsaXN0W2ldO1xuICAgIG9wdGlvbnMudHJ1bmNhdGUgPSBvcmlnaW5hbExlbmd0aCAtIG91dHB1dC5sZW5ndGggLSAobGFzdCA/IDAgOiBzZXBhcmF0b3IubGVuZ3RoKTtcbiAgICBjb25zdCBzdHJpbmcgPSBwZWVrIHx8IGluc3BlY3RJdGVtKHZhbHVlLCBvcHRpb25zKSArIChsYXN0ID8gXCJcIiA6IHNlcGFyYXRvcik7XG4gICAgY29uc3QgbmV4dExlbmd0aCA9IG91dHB1dC5sZW5ndGggKyBzdHJpbmcubGVuZ3RoO1xuICAgIGNvbnN0IHRydW5jYXRlZExlbmd0aCA9IG5leHRMZW5ndGggKyB0cnVuY2F0ZWQubGVuZ3RoO1xuICAgIGlmIChsYXN0ICYmIG5leHRMZW5ndGggPiBvcmlnaW5hbExlbmd0aCAmJiBvdXRwdXQubGVuZ3RoICsgdHJ1bmNhdGVkLmxlbmd0aCA8PSBvcmlnaW5hbExlbmd0aCkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmICghbGFzdCAmJiAhc2Vjb25kVG9MYXN0ICYmIHRydW5jYXRlZExlbmd0aCA+IG9yaWdpbmFsTGVuZ3RoKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgcGVlayA9IGxhc3QgPyBcIlwiIDogaW5zcGVjdEl0ZW0obGlzdFtpICsgMV0sIG9wdGlvbnMpICsgKHNlY29uZFRvTGFzdCA/IFwiXCIgOiBzZXBhcmF0b3IpO1xuICAgIGlmICghbGFzdCAmJiBzZWNvbmRUb0xhc3QgJiYgdHJ1bmNhdGVkTGVuZ3RoID4gb3JpZ2luYWxMZW5ndGggJiYgbmV4dExlbmd0aCArIHBlZWsubGVuZ3RoID4gb3JpZ2luYWxMZW5ndGgpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBvdXRwdXQgKz0gc3RyaW5nO1xuICAgIGlmICghbGFzdCAmJiAhc2Vjb25kVG9MYXN0ICYmIG5leHRMZW5ndGggKyBwZWVrLmxlbmd0aCA+PSBvcmlnaW5hbExlbmd0aCkge1xuICAgICAgdHJ1bmNhdGVkID0gYCR7dHJ1bmNhdG9yfSgke2xpc3QubGVuZ3RoIC0gaSAtIDF9KWA7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgdHJ1bmNhdGVkID0gXCJcIjtcbiAgfVxuICByZXR1cm4gYCR7b3V0cHV0fSR7dHJ1bmNhdGVkfWA7XG59XG5fX25hbWUoaW5zcGVjdExpc3QsIFwiaW5zcGVjdExpc3RcIik7XG5mdW5jdGlvbiBxdW90ZUNvbXBsZXhLZXkoa2V5KSB7XG4gIGlmIChrZXkubWF0Y2goL15bYS16QS1aX11bYS16QS1aXzAtOV0qJC8pKSB7XG4gICAgcmV0dXJuIGtleTtcbiAgfVxuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoa2V5KS5yZXBsYWNlKC8nL2csIFwiXFxcXCdcIikucmVwbGFjZSgvXFxcXFwiL2csICdcIicpLnJlcGxhY2UoLyheXCJ8XCIkKS9nLCBcIidcIik7XG59XG5fX25hbWUocXVvdGVDb21wbGV4S2V5LCBcInF1b3RlQ29tcGxleEtleVwiKTtcbmZ1bmN0aW9uIGluc3BlY3RQcm9wZXJ0eShba2V5LCB2YWx1ZV0sIG9wdGlvbnMpIHtcbiAgb3B0aW9ucy50cnVuY2F0ZSAtPSAyO1xuICBpZiAodHlwZW9mIGtleSA9PT0gXCJzdHJpbmdcIikge1xuICAgIGtleSA9IHF1b3RlQ29tcGxleEtleShrZXkpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBrZXkgIT09IFwibnVtYmVyXCIpIHtcbiAgICBrZXkgPSBgWyR7b3B0aW9ucy5pbnNwZWN0KGtleSwgb3B0aW9ucyl9XWA7XG4gIH1cbiAgb3B0aW9ucy50cnVuY2F0ZSAtPSBrZXkubGVuZ3RoO1xuICB2YWx1ZSA9IG9wdGlvbnMuaW5zcGVjdCh2YWx1ZSwgb3B0aW9ucyk7XG4gIHJldHVybiBgJHtrZXl9OiAke3ZhbHVlfWA7XG59XG5fX25hbWUoaW5zcGVjdFByb3BlcnR5LCBcImluc3BlY3RQcm9wZXJ0eVwiKTtcblxuLy8gbm9kZV9tb2R1bGVzL2xvdXBlL2xpYi9hcnJheS5qc1xuZnVuY3Rpb24gaW5zcGVjdEFycmF5KGFycmF5LCBvcHRpb25zKSB7XG4gIGNvbnN0IG5vbkluZGV4UHJvcGVydGllcyA9IE9iamVjdC5rZXlzKGFycmF5KS5zbGljZShhcnJheS5sZW5ndGgpO1xuICBpZiAoIWFycmF5Lmxlbmd0aCAmJiAhbm9uSW5kZXhQcm9wZXJ0aWVzLmxlbmd0aClcbiAgICByZXR1cm4gXCJbXVwiO1xuICBvcHRpb25zLnRydW5jYXRlIC09IDQ7XG4gIGNvbnN0IGxpc3RDb250ZW50cyA9IGluc3BlY3RMaXN0KGFycmF5LCBvcHRpb25zKTtcbiAgb3B0aW9ucy50cnVuY2F0ZSAtPSBsaXN0Q29udGVudHMubGVuZ3RoO1xuICBsZXQgcHJvcGVydHlDb250ZW50cyA9IFwiXCI7XG4gIGlmIChub25JbmRleFByb3BlcnRpZXMubGVuZ3RoKSB7XG4gICAgcHJvcGVydHlDb250ZW50cyA9IGluc3BlY3RMaXN0KG5vbkluZGV4UHJvcGVydGllcy5tYXAoKGtleSkgPT4gW2tleSwgYXJyYXlba2V5XV0pLCBvcHRpb25zLCBpbnNwZWN0UHJvcGVydHkpO1xuICB9XG4gIHJldHVybiBgWyAke2xpc3RDb250ZW50c30ke3Byb3BlcnR5Q29udGVudHMgPyBgLCAke3Byb3BlcnR5Q29udGVudHN9YCA6IFwiXCJ9IF1gO1xufVxuX19uYW1lKGluc3BlY3RBcnJheSwgXCJpbnNwZWN0QXJyYXlcIik7XG5cbi8vIG5vZGVfbW9kdWxlcy9sb3VwZS9saWIvdHlwZWRhcnJheS5qc1xudmFyIGdldEFycmF5TmFtZSA9IC8qIEBfX1BVUkVfXyAqLyBfX25hbWUoKGFycmF5KSA9PiB7XG4gIGlmICh0eXBlb2YgQnVmZmVyID09PSBcImZ1bmN0aW9uXCIgJiYgYXJyYXkgaW5zdGFuY2VvZiBCdWZmZXIpIHtcbiAgICByZXR1cm4gXCJCdWZmZXJcIjtcbiAgfVxuICBpZiAoYXJyYXlbU3ltYm9sLnRvU3RyaW5nVGFnXSkge1xuICAgIHJldHVybiBhcnJheVtTeW1ib2wudG9TdHJpbmdUYWddO1xuICB9XG4gIHJldHVybiBhcnJheS5jb25zdHJ1Y3Rvci5uYW1lO1xufSwgXCJnZXRBcnJheU5hbWVcIik7XG5mdW5jdGlvbiBpbnNwZWN0VHlwZWRBcnJheShhcnJheSwgb3B0aW9ucykge1xuICBjb25zdCBuYW1lID0gZ2V0QXJyYXlOYW1lKGFycmF5KTtcbiAgb3B0aW9ucy50cnVuY2F0ZSAtPSBuYW1lLmxlbmd0aCArIDQ7XG4gIGNvbnN0IG5vbkluZGV4UHJvcGVydGllcyA9IE9iamVjdC5rZXlzKGFycmF5KS5zbGljZShhcnJheS5sZW5ndGgpO1xuICBpZiAoIWFycmF5Lmxlbmd0aCAmJiAhbm9uSW5kZXhQcm9wZXJ0aWVzLmxlbmd0aClcbiAgICByZXR1cm4gYCR7bmFtZX1bXWA7XG4gIGxldCBvdXRwdXQgPSBcIlwiO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3Qgc3RyaW5nID0gYCR7b3B0aW9ucy5zdHlsaXplKHRydW5jYXRlKGFycmF5W2ldLCBvcHRpb25zLnRydW5jYXRlKSwgXCJudW1iZXJcIil9JHtpID09PSBhcnJheS5sZW5ndGggLSAxID8gXCJcIiA6IFwiLCBcIn1gO1xuICAgIG9wdGlvbnMudHJ1bmNhdGUgLT0gc3RyaW5nLmxlbmd0aDtcbiAgICBpZiAoYXJyYXlbaV0gIT09IGFycmF5Lmxlbmd0aCAmJiBvcHRpb25zLnRydW5jYXRlIDw9IDMpIHtcbiAgICAgIG91dHB1dCArPSBgJHt0cnVuY2F0b3J9KCR7YXJyYXkubGVuZ3RoIC0gYXJyYXlbaV0gKyAxfSlgO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIG91dHB1dCArPSBzdHJpbmc7XG4gIH1cbiAgbGV0IHByb3BlcnR5Q29udGVudHMgPSBcIlwiO1xuICBpZiAobm9uSW5kZXhQcm9wZXJ0aWVzLmxlbmd0aCkge1xuICAgIHByb3BlcnR5Q29udGVudHMgPSBpbnNwZWN0TGlzdChub25JbmRleFByb3BlcnRpZXMubWFwKChrZXkpID0+IFtrZXksIGFycmF5W2tleV1dKSwgb3B0aW9ucywgaW5zcGVjdFByb3BlcnR5KTtcbiAgfVxuICByZXR1cm4gYCR7bmFtZX1bICR7b3V0cHV0fSR7cHJvcGVydHlDb250ZW50cyA/IGAsICR7cHJvcGVydHlDb250ZW50c31gIDogXCJcIn0gXWA7XG59XG5fX25hbWUoaW5zcGVjdFR5cGVkQXJyYXksIFwiaW5zcGVjdFR5cGVkQXJyYXlcIik7XG5cbi8vIG5vZGVfbW9kdWxlcy9sb3VwZS9saWIvZGF0ZS5qc1xuZnVuY3Rpb24gaW5zcGVjdERhdGUoZGF0ZU9iamVjdCwgb3B0aW9ucykge1xuICBjb25zdCBzdHJpbmdSZXByZXNlbnRhdGlvbiA9IGRhdGVPYmplY3QudG9KU09OKCk7XG4gIGlmIChzdHJpbmdSZXByZXNlbnRhdGlvbiA9PT0gbnVsbCkge1xuICAgIHJldHVybiBcIkludmFsaWQgRGF0ZVwiO1xuICB9XG4gIGNvbnN0IHNwbGl0ID0gc3RyaW5nUmVwcmVzZW50YXRpb24uc3BsaXQoXCJUXCIpO1xuICBjb25zdCBkYXRlID0gc3BsaXRbMF07XG4gIHJldHVybiBvcHRpb25zLnN0eWxpemUoYCR7ZGF0ZX1UJHt0cnVuY2F0ZShzcGxpdFsxXSwgb3B0aW9ucy50cnVuY2F0ZSAtIGRhdGUubGVuZ3RoIC0gMSl9YCwgXCJkYXRlXCIpO1xufVxuX19uYW1lKGluc3BlY3REYXRlLCBcImluc3BlY3REYXRlXCIpO1xuXG4vLyBub2RlX21vZHVsZXMvbG91cGUvbGliL2Z1bmN0aW9uLmpzXG5mdW5jdGlvbiBpbnNwZWN0RnVuY3Rpb24oZnVuYywgb3B0aW9ucykge1xuICBjb25zdCBmdW5jdGlvblR5cGUgPSBmdW5jW1N5bWJvbC50b1N0cmluZ1RhZ10gfHwgXCJGdW5jdGlvblwiO1xuICBjb25zdCBuYW1lID0gZnVuYy5uYW1lO1xuICBpZiAoIW5hbWUpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5zdHlsaXplKGBbJHtmdW5jdGlvblR5cGV9XWAsIFwic3BlY2lhbFwiKTtcbiAgfVxuICByZXR1cm4gb3B0aW9ucy5zdHlsaXplKGBbJHtmdW5jdGlvblR5cGV9ICR7dHJ1bmNhdGUobmFtZSwgb3B0aW9ucy50cnVuY2F0ZSAtIDExKX1dYCwgXCJzcGVjaWFsXCIpO1xufVxuX19uYW1lKGluc3BlY3RGdW5jdGlvbiwgXCJpbnNwZWN0RnVuY3Rpb25cIik7XG5cbi8vIG5vZGVfbW9kdWxlcy9sb3VwZS9saWIvbWFwLmpzXG5mdW5jdGlvbiBpbnNwZWN0TWFwRW50cnkoW2tleSwgdmFsdWVdLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMudHJ1bmNhdGUgLT0gNDtcbiAga2V5ID0gb3B0aW9ucy5pbnNwZWN0KGtleSwgb3B0aW9ucyk7XG4gIG9wdGlvbnMudHJ1bmNhdGUgLT0ga2V5Lmxlbmd0aDtcbiAgdmFsdWUgPSBvcHRpb25zLmluc3BlY3QodmFsdWUsIG9wdGlvbnMpO1xuICByZXR1cm4gYCR7a2V5fSA9PiAke3ZhbHVlfWA7XG59XG5fX25hbWUoaW5zcGVjdE1hcEVudHJ5LCBcImluc3BlY3RNYXBFbnRyeVwiKTtcbmZ1bmN0aW9uIG1hcFRvRW50cmllcyhtYXApIHtcbiAgY29uc3QgZW50cmllcyA9IFtdO1xuICBtYXAuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgIGVudHJpZXMucHVzaChba2V5LCB2YWx1ZV0pO1xuICB9KTtcbiAgcmV0dXJuIGVudHJpZXM7XG59XG5fX25hbWUobWFwVG9FbnRyaWVzLCBcIm1hcFRvRW50cmllc1wiKTtcbmZ1bmN0aW9uIGluc3BlY3RNYXAobWFwLCBvcHRpb25zKSB7XG4gIGlmIChtYXAuc2l6ZSA9PT0gMClcbiAgICByZXR1cm4gXCJNYXB7fVwiO1xuICBvcHRpb25zLnRydW5jYXRlIC09IDc7XG4gIHJldHVybiBgTWFweyAke2luc3BlY3RMaXN0KG1hcFRvRW50cmllcyhtYXApLCBvcHRpb25zLCBpbnNwZWN0TWFwRW50cnkpfSB9YDtcbn1cbl9fbmFtZShpbnNwZWN0TWFwLCBcImluc3BlY3RNYXBcIik7XG5cbi8vIG5vZGVfbW9kdWxlcy9sb3VwZS9saWIvbnVtYmVyLmpzXG52YXIgaXNOYU4gPSBOdW1iZXIuaXNOYU4gfHwgKChpKSA9PiBpICE9PSBpKTtcbmZ1bmN0aW9uIGluc3BlY3ROdW1iZXIobnVtYmVyLCBvcHRpb25zKSB7XG4gIGlmIChpc05hTihudW1iZXIpKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMuc3R5bGl6ZShcIk5hTlwiLCBcIm51bWJlclwiKTtcbiAgfVxuICBpZiAobnVtYmVyID09PSBJbmZpbml0eSkge1xuICAgIHJldHVybiBvcHRpb25zLnN0eWxpemUoXCJJbmZpbml0eVwiLCBcIm51bWJlclwiKTtcbiAgfVxuICBpZiAobnVtYmVyID09PSAtSW5maW5pdHkpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5zdHlsaXplKFwiLUluZmluaXR5XCIsIFwibnVtYmVyXCIpO1xuICB9XG4gIGlmIChudW1iZXIgPT09IDApIHtcbiAgICByZXR1cm4gb3B0aW9ucy5zdHlsaXplKDEgLyBudW1iZXIgPT09IEluZmluaXR5ID8gXCIrMFwiIDogXCItMFwiLCBcIm51bWJlclwiKTtcbiAgfVxuICByZXR1cm4gb3B0aW9ucy5zdHlsaXplKHRydW5jYXRlKFN0cmluZyhudW1iZXIpLCBvcHRpb25zLnRydW5jYXRlKSwgXCJudW1iZXJcIik7XG59XG5fX25hbWUoaW5zcGVjdE51bWJlciwgXCJpbnNwZWN0TnVtYmVyXCIpO1xuXG4vLyBub2RlX21vZHVsZXMvbG91cGUvbGliL2JpZ2ludC5qc1xuZnVuY3Rpb24gaW5zcGVjdEJpZ0ludChudW1iZXIsIG9wdGlvbnMpIHtcbiAgbGV0IG51bXMgPSB0cnVuY2F0ZShudW1iZXIudG9TdHJpbmcoKSwgb3B0aW9ucy50cnVuY2F0ZSAtIDEpO1xuICBpZiAobnVtcyAhPT0gdHJ1bmNhdG9yKVxuICAgIG51bXMgKz0gXCJuXCI7XG4gIHJldHVybiBvcHRpb25zLnN0eWxpemUobnVtcywgXCJiaWdpbnRcIik7XG59XG5fX25hbWUoaW5zcGVjdEJpZ0ludCwgXCJpbnNwZWN0QmlnSW50XCIpO1xuXG4vLyBub2RlX21vZHVsZXMvbG91cGUvbGliL3JlZ2V4cC5qc1xuZnVuY3Rpb24gaW5zcGVjdFJlZ0V4cCh2YWx1ZSwgb3B0aW9ucykge1xuICBjb25zdCBmbGFncyA9IHZhbHVlLnRvU3RyaW5nKCkuc3BsaXQoXCIvXCIpWzJdO1xuICBjb25zdCBzb3VyY2VMZW5ndGggPSBvcHRpb25zLnRydW5jYXRlIC0gKDIgKyBmbGFncy5sZW5ndGgpO1xuICBjb25zdCBzb3VyY2UgPSB2YWx1ZS5zb3VyY2U7XG4gIHJldHVybiBvcHRpb25zLnN0eWxpemUoYC8ke3RydW5jYXRlKHNvdXJjZSwgc291cmNlTGVuZ3RoKX0vJHtmbGFnc31gLCBcInJlZ2V4cFwiKTtcbn1cbl9fbmFtZShpbnNwZWN0UmVnRXhwLCBcImluc3BlY3RSZWdFeHBcIik7XG5cbi8vIG5vZGVfbW9kdWxlcy9sb3VwZS9saWIvc2V0LmpzXG5mdW5jdGlvbiBhcnJheUZyb21TZXQoc2V0Mikge1xuICBjb25zdCB2YWx1ZXMgPSBbXTtcbiAgc2V0Mi5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuICAgIHZhbHVlcy5wdXNoKHZhbHVlKTtcbiAgfSk7XG4gIHJldHVybiB2YWx1ZXM7XG59XG5fX25hbWUoYXJyYXlGcm9tU2V0LCBcImFycmF5RnJvbVNldFwiKTtcbmZ1bmN0aW9uIGluc3BlY3RTZXQoc2V0Miwgb3B0aW9ucykge1xuICBpZiAoc2V0Mi5zaXplID09PSAwKVxuICAgIHJldHVybiBcIlNldHt9XCI7XG4gIG9wdGlvbnMudHJ1bmNhdGUgLT0gNztcbiAgcmV0dXJuIGBTZXR7ICR7aW5zcGVjdExpc3QoYXJyYXlGcm9tU2V0KHNldDIpLCBvcHRpb25zKX0gfWA7XG59XG5fX25hbWUoaW5zcGVjdFNldCwgXCJpbnNwZWN0U2V0XCIpO1xuXG4vLyBub2RlX21vZHVsZXMvbG91cGUvbGliL3N0cmluZy5qc1xudmFyIHN0cmluZ0VzY2FwZUNoYXJzID0gbmV3IFJlZ0V4cChcIlsnXFxcXHUwMDAwLVxcXFx1MDAxZlxcXFx1MDA3Zi1cXFxcdTAwOWZcXFxcdTAwYWRcXFxcdTA2MDAtXFxcXHUwNjA0XFxcXHUwNzBmXFxcXHUxN2I0XFxcXHUxN2I1XFxcXHUyMDBjLVxcXFx1MjAwZlxcXFx1MjAyOC1cXFxcdTIwMmZcXFxcdTIwNjAtXFxcXHUyMDZmXFxcXHVmZWZmXFxcXHVmZmYwLVxcXFx1ZmZmZl1cIiwgXCJnXCIpO1xudmFyIGVzY2FwZUNoYXJhY3RlcnMgPSB7XG4gIFwiXFxiXCI6IFwiXFxcXGJcIixcbiAgXCJcdFwiOiBcIlxcXFx0XCIsXG4gIFwiXFxuXCI6IFwiXFxcXG5cIixcbiAgXCJcXGZcIjogXCJcXFxcZlwiLFxuICBcIlxcclwiOiBcIlxcXFxyXCIsXG4gIFwiJ1wiOiBcIlxcXFwnXCIsXG4gIFwiXFxcXFwiOiBcIlxcXFxcXFxcXCJcbn07XG52YXIgaGV4ID0gMTY7XG52YXIgdW5pY29kZUxlbmd0aCA9IDQ7XG5mdW5jdGlvbiBlc2NhcGUoY2hhcikge1xuICByZXR1cm4gZXNjYXBlQ2hhcmFjdGVyc1tjaGFyXSB8fCBgXFxcXHUke2AwMDAwJHtjaGFyLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoaGV4KX1gLnNsaWNlKC11bmljb2RlTGVuZ3RoKX1gO1xufVxuX19uYW1lKGVzY2FwZSwgXCJlc2NhcGVcIik7XG5mdW5jdGlvbiBpbnNwZWN0U3RyaW5nKHN0cmluZywgb3B0aW9ucykge1xuICBpZiAoc3RyaW5nRXNjYXBlQ2hhcnMudGVzdChzdHJpbmcpKSB7XG4gICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2Uoc3RyaW5nRXNjYXBlQ2hhcnMsIGVzY2FwZSk7XG4gIH1cbiAgcmV0dXJuIG9wdGlvbnMuc3R5bGl6ZShgJyR7dHJ1bmNhdGUoc3RyaW5nLCBvcHRpb25zLnRydW5jYXRlIC0gMil9J2AsIFwic3RyaW5nXCIpO1xufVxuX19uYW1lKGluc3BlY3RTdHJpbmcsIFwiaW5zcGVjdFN0cmluZ1wiKTtcblxuLy8gbm9kZV9tb2R1bGVzL2xvdXBlL2xpYi9zeW1ib2wuanNcbmZ1bmN0aW9uIGluc3BlY3RTeW1ib2wodmFsdWUpIHtcbiAgaWYgKFwiZGVzY3JpcHRpb25cIiBpbiBTeW1ib2wucHJvdG90eXBlKSB7XG4gICAgcmV0dXJuIHZhbHVlLmRlc2NyaXB0aW9uID8gYFN5bWJvbCgke3ZhbHVlLmRlc2NyaXB0aW9ufSlgIDogXCJTeW1ib2woKVwiO1xuICB9XG4gIHJldHVybiB2YWx1ZS50b1N0cmluZygpO1xufVxuX19uYW1lKGluc3BlY3RTeW1ib2wsIFwiaW5zcGVjdFN5bWJvbFwiKTtcblxuLy8gbm9kZV9tb2R1bGVzL2xvdXBlL2xpYi9wcm9taXNlLmpzXG52YXIgZ2V0UHJvbWlzZVZhbHVlID0gLyogQF9fUFVSRV9fICovIF9fbmFtZSgoKSA9PiBcIlByb21pc2V7XFx1MjAyNn1cIiwgXCJnZXRQcm9taXNlVmFsdWVcIik7XG52YXIgcHJvbWlzZV9kZWZhdWx0ID0gZ2V0UHJvbWlzZVZhbHVlO1xuXG4vLyBub2RlX21vZHVsZXMvbG91cGUvbGliL29iamVjdC5qc1xuZnVuY3Rpb24gaW5zcGVjdE9iamVjdChvYmplY3QsIG9wdGlvbnMpIHtcbiAgY29uc3QgcHJvcGVydGllcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iamVjdCk7XG4gIGNvbnN0IHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID8gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhvYmplY3QpIDogW107XG4gIGlmIChwcm9wZXJ0aWVzLmxlbmd0aCA9PT0gMCAmJiBzeW1ib2xzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBcInt9XCI7XG4gIH1cbiAgb3B0aW9ucy50cnVuY2F0ZSAtPSA0O1xuICBvcHRpb25zLnNlZW4gPSBvcHRpb25zLnNlZW4gfHwgW107XG4gIGlmIChvcHRpb25zLnNlZW4uaW5jbHVkZXMob2JqZWN0KSkge1xuICAgIHJldHVybiBcIltDaXJjdWxhcl1cIjtcbiAgfVxuICBvcHRpb25zLnNlZW4ucHVzaChvYmplY3QpO1xuICBjb25zdCBwcm9wZXJ0eUNvbnRlbnRzID0gaW5zcGVjdExpc3QocHJvcGVydGllcy5tYXAoKGtleSkgPT4gW2tleSwgb2JqZWN0W2tleV1dKSwgb3B0aW9ucywgaW5zcGVjdFByb3BlcnR5KTtcbiAgY29uc3Qgc3ltYm9sQ29udGVudHMgPSBpbnNwZWN0TGlzdChzeW1ib2xzLm1hcCgoa2V5KSA9PiBba2V5LCBvYmplY3Rba2V5XV0pLCBvcHRpb25zLCBpbnNwZWN0UHJvcGVydHkpO1xuICBvcHRpb25zLnNlZW4ucG9wKCk7XG4gIGxldCBzZXAgPSBcIlwiO1xuICBpZiAocHJvcGVydHlDb250ZW50cyAmJiBzeW1ib2xDb250ZW50cykge1xuICAgIHNlcCA9IFwiLCBcIjtcbiAgfVxuICByZXR1cm4gYHsgJHtwcm9wZXJ0eUNvbnRlbnRzfSR7c2VwfSR7c3ltYm9sQ29udGVudHN9IH1gO1xufVxuX19uYW1lKGluc3BlY3RPYmplY3QsIFwiaW5zcGVjdE9iamVjdFwiKTtcblxuLy8gbm9kZV9tb2R1bGVzL2xvdXBlL2xpYi9jbGFzcy5qc1xudmFyIHRvU3RyaW5nVGFnID0gdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBTeW1ib2wudG9TdHJpbmdUYWcgPyBTeW1ib2wudG9TdHJpbmdUYWcgOiBmYWxzZTtcbmZ1bmN0aW9uIGluc3BlY3RDbGFzcyh2YWx1ZSwgb3B0aW9ucykge1xuICBsZXQgbmFtZSA9IFwiXCI7XG4gIGlmICh0b1N0cmluZ1RhZyAmJiB0b1N0cmluZ1RhZyBpbiB2YWx1ZSkge1xuICAgIG5hbWUgPSB2YWx1ZVt0b1N0cmluZ1RhZ107XG4gIH1cbiAgbmFtZSA9IG5hbWUgfHwgdmFsdWUuY29uc3RydWN0b3IubmFtZTtcbiAgaWYgKCFuYW1lIHx8IG5hbWUgPT09IFwiX2NsYXNzXCIpIHtcbiAgICBuYW1lID0gXCI8QW5vbnltb3VzIENsYXNzPlwiO1xuICB9XG4gIG9wdGlvbnMudHJ1bmNhdGUgLT0gbmFtZS5sZW5ndGg7XG4gIHJldHVybiBgJHtuYW1lfSR7aW5zcGVjdE9iamVjdCh2YWx1ZSwgb3B0aW9ucyl9YDtcbn1cbl9fbmFtZShpbnNwZWN0Q2xhc3MsIFwiaW5zcGVjdENsYXNzXCIpO1xuXG4vLyBub2RlX21vZHVsZXMvbG91cGUvbGliL2FyZ3VtZW50cy5qc1xuZnVuY3Rpb24gaW5zcGVjdEFyZ3VtZW50cyhhcmdzLCBvcHRpb25zKSB7XG4gIGlmIChhcmdzLmxlbmd0aCA9PT0gMClcbiAgICByZXR1cm4gXCJBcmd1bWVudHNbXVwiO1xuICBvcHRpb25zLnRydW5jYXRlIC09IDEzO1xuICByZXR1cm4gYEFyZ3VtZW50c1sgJHtpbnNwZWN0TGlzdChhcmdzLCBvcHRpb25zKX0gXWA7XG59XG5fX25hbWUoaW5zcGVjdEFyZ3VtZW50cywgXCJpbnNwZWN0QXJndW1lbnRzXCIpO1xuXG4vLyBub2RlX21vZHVsZXMvbG91cGUvbGliL2Vycm9yLmpzXG52YXIgZXJyb3JLZXlzID0gW1xuICBcInN0YWNrXCIsXG4gIFwibGluZVwiLFxuICBcImNvbHVtblwiLFxuICBcIm5hbWVcIixcbiAgXCJtZXNzYWdlXCIsXG4gIFwiZmlsZU5hbWVcIixcbiAgXCJsaW5lTnVtYmVyXCIsXG4gIFwiY29sdW1uTnVtYmVyXCIsXG4gIFwibnVtYmVyXCIsXG4gIFwiZGVzY3JpcHRpb25cIixcbiAgXCJjYXVzZVwiXG5dO1xuZnVuY3Rpb24gaW5zcGVjdE9iamVjdDIoZXJyb3IsIG9wdGlvbnMpIHtcbiAgY29uc3QgcHJvcGVydGllcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGVycm9yKS5maWx0ZXIoKGtleSkgPT4gZXJyb3JLZXlzLmluZGV4T2Yoa2V5KSA9PT0gLTEpO1xuICBjb25zdCBuYW1lID0gZXJyb3IubmFtZTtcbiAgb3B0aW9ucy50cnVuY2F0ZSAtPSBuYW1lLmxlbmd0aDtcbiAgbGV0IG1lc3NhZ2UgPSBcIlwiO1xuICBpZiAodHlwZW9mIGVycm9yLm1lc3NhZ2UgPT09IFwic3RyaW5nXCIpIHtcbiAgICBtZXNzYWdlID0gdHJ1bmNhdGUoZXJyb3IubWVzc2FnZSwgb3B0aW9ucy50cnVuY2F0ZSk7XG4gIH0gZWxzZSB7XG4gICAgcHJvcGVydGllcy51bnNoaWZ0KFwibWVzc2FnZVwiKTtcbiAgfVxuICBtZXNzYWdlID0gbWVzc2FnZSA/IGA6ICR7bWVzc2FnZX1gIDogXCJcIjtcbiAgb3B0aW9ucy50cnVuY2F0ZSAtPSBtZXNzYWdlLmxlbmd0aCArIDU7XG4gIG9wdGlvbnMuc2VlbiA9IG9wdGlvbnMuc2VlbiB8fCBbXTtcbiAgaWYgKG9wdGlvbnMuc2Vlbi5pbmNsdWRlcyhlcnJvcikpIHtcbiAgICByZXR1cm4gXCJbQ2lyY3VsYXJdXCI7XG4gIH1cbiAgb3B0aW9ucy5zZWVuLnB1c2goZXJyb3IpO1xuICBjb25zdCBwcm9wZXJ0eUNvbnRlbnRzID0gaW5zcGVjdExpc3QocHJvcGVydGllcy5tYXAoKGtleSkgPT4gW2tleSwgZXJyb3Jba2V5XV0pLCBvcHRpb25zLCBpbnNwZWN0UHJvcGVydHkpO1xuICByZXR1cm4gYCR7bmFtZX0ke21lc3NhZ2V9JHtwcm9wZXJ0eUNvbnRlbnRzID8gYCB7ICR7cHJvcGVydHlDb250ZW50c30gfWAgOiBcIlwifWA7XG59XG5fX25hbWUoaW5zcGVjdE9iamVjdDIsIFwiaW5zcGVjdE9iamVjdFwiKTtcblxuLy8gbm9kZV9tb2R1bGVzL2xvdXBlL2xpYi9odG1sLmpzXG5mdW5jdGlvbiBpbnNwZWN0QXR0cmlidXRlKFtrZXksIHZhbHVlXSwgb3B0aW9ucykge1xuICBvcHRpb25zLnRydW5jYXRlIC09IDM7XG4gIGlmICghdmFsdWUpIHtcbiAgICByZXR1cm4gYCR7b3B0aW9ucy5zdHlsaXplKFN0cmluZyhrZXkpLCBcInllbGxvd1wiKX1gO1xuICB9XG4gIHJldHVybiBgJHtvcHRpb25zLnN0eWxpemUoU3RyaW5nKGtleSksIFwieWVsbG93XCIpfT0ke29wdGlvbnMuc3R5bGl6ZShgXCIke3ZhbHVlfVwiYCwgXCJzdHJpbmdcIil9YDtcbn1cbl9fbmFtZShpbnNwZWN0QXR0cmlidXRlLCBcImluc3BlY3RBdHRyaWJ1dGVcIik7XG5mdW5jdGlvbiBpbnNwZWN0Tm9kZUNvbGxlY3Rpb24oY29sbGVjdGlvbiwgb3B0aW9ucykge1xuICByZXR1cm4gaW5zcGVjdExpc3QoY29sbGVjdGlvbiwgb3B0aW9ucywgaW5zcGVjdE5vZGUsIFwiXFxuXCIpO1xufVxuX19uYW1lKGluc3BlY3ROb2RlQ29sbGVjdGlvbiwgXCJpbnNwZWN0Tm9kZUNvbGxlY3Rpb25cIik7XG5mdW5jdGlvbiBpbnNwZWN0Tm9kZShub2RlLCBvcHRpb25zKSB7XG4gIHN3aXRjaCAobm9kZS5ub2RlVHlwZSkge1xuICAgIGNhc2UgMTpcbiAgICAgIHJldHVybiBpbnNwZWN0SFRNTChub2RlLCBvcHRpb25zKTtcbiAgICBjYXNlIDM6XG4gICAgICByZXR1cm4gb3B0aW9ucy5pbnNwZWN0KG5vZGUuZGF0YSwgb3B0aW9ucyk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBvcHRpb25zLmluc3BlY3Qobm9kZSwgb3B0aW9ucyk7XG4gIH1cbn1cbl9fbmFtZShpbnNwZWN0Tm9kZSwgXCJpbnNwZWN0Tm9kZVwiKTtcbmZ1bmN0aW9uIGluc3BlY3RIVE1MKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgY29uc3QgcHJvcGVydGllcyA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlTmFtZXMoKTtcbiAgY29uc3QgbmFtZSA9IGVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xuICBjb25zdCBoZWFkID0gb3B0aW9ucy5zdHlsaXplKGA8JHtuYW1lfWAsIFwic3BlY2lhbFwiKTtcbiAgY29uc3QgaGVhZENsb3NlID0gb3B0aW9ucy5zdHlsaXplKGA+YCwgXCJzcGVjaWFsXCIpO1xuICBjb25zdCB0YWlsID0gb3B0aW9ucy5zdHlsaXplKGA8LyR7bmFtZX0+YCwgXCJzcGVjaWFsXCIpO1xuICBvcHRpb25zLnRydW5jYXRlIC09IG5hbWUubGVuZ3RoICogMiArIDU7XG4gIGxldCBwcm9wZXJ0eUNvbnRlbnRzID0gXCJcIjtcbiAgaWYgKHByb3BlcnRpZXMubGVuZ3RoID4gMCkge1xuICAgIHByb3BlcnR5Q29udGVudHMgKz0gXCIgXCI7XG4gICAgcHJvcGVydHlDb250ZW50cyArPSBpbnNwZWN0TGlzdChwcm9wZXJ0aWVzLm1hcCgoa2V5KSA9PiBba2V5LCBlbGVtZW50LmdldEF0dHJpYnV0ZShrZXkpXSksIG9wdGlvbnMsIGluc3BlY3RBdHRyaWJ1dGUsIFwiIFwiKTtcbiAgfVxuICBvcHRpb25zLnRydW5jYXRlIC09IHByb3BlcnR5Q29udGVudHMubGVuZ3RoO1xuICBjb25zdCB0cnVuY2F0ZTIgPSBvcHRpb25zLnRydW5jYXRlO1xuICBsZXQgY2hpbGRyZW4gPSBpbnNwZWN0Tm9kZUNvbGxlY3Rpb24oZWxlbWVudC5jaGlsZHJlbiwgb3B0aW9ucyk7XG4gIGlmIChjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGggPiB0cnVuY2F0ZTIpIHtcbiAgICBjaGlsZHJlbiA9IGAke3RydW5jYXRvcn0oJHtlbGVtZW50LmNoaWxkcmVuLmxlbmd0aH0pYDtcbiAgfVxuICByZXR1cm4gYCR7aGVhZH0ke3Byb3BlcnR5Q29udGVudHN9JHtoZWFkQ2xvc2V9JHtjaGlsZHJlbn0ke3RhaWx9YDtcbn1cbl9fbmFtZShpbnNwZWN0SFRNTCwgXCJpbnNwZWN0SFRNTFwiKTtcblxuLy8gbm9kZV9tb2R1bGVzL2xvdXBlL2xpYi9pbmRleC5qc1xudmFyIHN5bWJvbHNTdXBwb3J0ZWQgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5mb3IgPT09IFwiZnVuY3Rpb25cIjtcbnZhciBjaGFpSW5zcGVjdCA9IHN5bWJvbHNTdXBwb3J0ZWQgPyBTeW1ib2wuZm9yKFwiY2hhaS9pbnNwZWN0XCIpIDogXCJAQGNoYWkvaW5zcGVjdFwiO1xudmFyIG5vZGVJbnNwZWN0ID0gU3ltYm9sLmZvcihcIm5vZGVqcy51dGlsLmluc3BlY3QuY3VzdG9tXCIpO1xudmFyIGNvbnN0cnVjdG9yTWFwID0gLyogQF9fUFVSRV9fICovIG5ldyBXZWFrTWFwKCk7XG52YXIgc3RyaW5nVGFnTWFwID0ge307XG52YXIgYmFzZVR5cGVzTWFwID0ge1xuICB1bmRlZmluZWQ6IC8qIEBfX1BVUkVfXyAqLyBfX25hbWUoKHZhbHVlLCBvcHRpb25zKSA9PiBvcHRpb25zLnN0eWxpemUoXCJ1bmRlZmluZWRcIiwgXCJ1bmRlZmluZWRcIiksIFwidW5kZWZpbmVkXCIpLFxuICBudWxsOiAvKiBAX19QVVJFX18gKi8gX19uYW1lKCh2YWx1ZSwgb3B0aW9ucykgPT4gb3B0aW9ucy5zdHlsaXplKFwibnVsbFwiLCBcIm51bGxcIiksIFwibnVsbFwiKSxcbiAgYm9vbGVhbjogLyogQF9fUFVSRV9fICovIF9fbmFtZSgodmFsdWUsIG9wdGlvbnMpID0+IG9wdGlvbnMuc3R5bGl6ZShTdHJpbmcodmFsdWUpLCBcImJvb2xlYW5cIiksIFwiYm9vbGVhblwiKSxcbiAgQm9vbGVhbjogLyogQF9fUFVSRV9fICovIF9fbmFtZSgodmFsdWUsIG9wdGlvbnMpID0+IG9wdGlvbnMuc3R5bGl6ZShTdHJpbmcodmFsdWUpLCBcImJvb2xlYW5cIiksIFwiQm9vbGVhblwiKSxcbiAgbnVtYmVyOiBpbnNwZWN0TnVtYmVyLFxuICBOdW1iZXI6IGluc3BlY3ROdW1iZXIsXG4gIGJpZ2ludDogaW5zcGVjdEJpZ0ludCxcbiAgQmlnSW50OiBpbnNwZWN0QmlnSW50LFxuICBzdHJpbmc6IGluc3BlY3RTdHJpbmcsXG4gIFN0cmluZzogaW5zcGVjdFN0cmluZyxcbiAgZnVuY3Rpb246IGluc3BlY3RGdW5jdGlvbixcbiAgRnVuY3Rpb246IGluc3BlY3RGdW5jdGlvbixcbiAgc3ltYm9sOiBpbnNwZWN0U3ltYm9sLFxuICAvLyBBIFN5bWJvbCBwb2x5ZmlsbCB3aWxsIHJldHVybiBgU3ltYm9sYCBub3QgYHN5bWJvbGAgZnJvbSB0eXBlZGV0ZWN0XG4gIFN5bWJvbDogaW5zcGVjdFN5bWJvbCxcbiAgQXJyYXk6IGluc3BlY3RBcnJheSxcbiAgRGF0ZTogaW5zcGVjdERhdGUsXG4gIE1hcDogaW5zcGVjdE1hcCxcbiAgU2V0OiBpbnNwZWN0U2V0LFxuICBSZWdFeHA6IGluc3BlY3RSZWdFeHAsXG4gIFByb21pc2U6IHByb21pc2VfZGVmYXVsdCxcbiAgLy8gV2Vha1NldCwgV2Vha01hcCBhcmUgdG90YWxseSBvcGFxdWUgdG8gdXNcbiAgV2Vha1NldDogLyogQF9fUFVSRV9fICovIF9fbmFtZSgodmFsdWUsIG9wdGlvbnMpID0+IG9wdGlvbnMuc3R5bGl6ZShcIldlYWtTZXR7XFx1MjAyNn1cIiwgXCJzcGVjaWFsXCIpLCBcIldlYWtTZXRcIiksXG4gIFdlYWtNYXA6IC8qIEBfX1BVUkVfXyAqLyBfX25hbWUoKHZhbHVlLCBvcHRpb25zKSA9PiBvcHRpb25zLnN0eWxpemUoXCJXZWFrTWFwe1xcdTIwMjZ9XCIsIFwic3BlY2lhbFwiKSwgXCJXZWFrTWFwXCIpLFxuICBBcmd1bWVudHM6IGluc3BlY3RBcmd1bWVudHMsXG4gIEludDhBcnJheTogaW5zcGVjdFR5cGVkQXJyYXksXG4gIFVpbnQ4QXJyYXk6IGluc3BlY3RUeXBlZEFycmF5LFxuICBVaW50OENsYW1wZWRBcnJheTogaW5zcGVjdFR5cGVkQXJyYXksXG4gIEludDE2QXJyYXk6IGluc3BlY3RUeXBlZEFycmF5LFxuICBVaW50MTZBcnJheTogaW5zcGVjdFR5cGVkQXJyYXksXG4gIEludDMyQXJyYXk6IGluc3BlY3RUeXBlZEFycmF5LFxuICBVaW50MzJBcnJheTogaW5zcGVjdFR5cGVkQXJyYXksXG4gIEZsb2F0MzJBcnJheTogaW5zcGVjdFR5cGVkQXJyYXksXG4gIEZsb2F0NjRBcnJheTogaW5zcGVjdFR5cGVkQXJyYXksXG4gIEdlbmVyYXRvcjogLyogQF9fUFVSRV9fICovIF9fbmFtZSgoKSA9PiBcIlwiLCBcIkdlbmVyYXRvclwiKSxcbiAgRGF0YVZpZXc6IC8qIEBfX1BVUkVfXyAqLyBfX25hbWUoKCkgPT4gXCJcIiwgXCJEYXRhVmlld1wiKSxcbiAgQXJyYXlCdWZmZXI6IC8qIEBfX1BVUkVfXyAqLyBfX25hbWUoKCkgPT4gXCJcIiwgXCJBcnJheUJ1ZmZlclwiKSxcbiAgRXJyb3I6IGluc3BlY3RPYmplY3QyLFxuICBIVE1MQ29sbGVjdGlvbjogaW5zcGVjdE5vZGVDb2xsZWN0aW9uLFxuICBOb2RlTGlzdDogaW5zcGVjdE5vZGVDb2xsZWN0aW9uXG59O1xudmFyIGluc3BlY3RDdXN0b20gPSAvKiBAX19QVVJFX18gKi8gX19uYW1lKCh2YWx1ZSwgb3B0aW9ucywgdHlwZTMpID0+IHtcbiAgaWYgKGNoYWlJbnNwZWN0IGluIHZhbHVlICYmIHR5cGVvZiB2YWx1ZVtjaGFpSW5zcGVjdF0gPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiB2YWx1ZVtjaGFpSW5zcGVjdF0ob3B0aW9ucyk7XG4gIH1cbiAgaWYgKG5vZGVJbnNwZWN0IGluIHZhbHVlICYmIHR5cGVvZiB2YWx1ZVtub2RlSW5zcGVjdF0gPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiB2YWx1ZVtub2RlSW5zcGVjdF0ob3B0aW9ucy5kZXB0aCwgb3B0aW9ucyk7XG4gIH1cbiAgaWYgKFwiaW5zcGVjdFwiIGluIHZhbHVlICYmIHR5cGVvZiB2YWx1ZS5pbnNwZWN0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICByZXR1cm4gdmFsdWUuaW5zcGVjdChvcHRpb25zLmRlcHRoLCBvcHRpb25zKTtcbiAgfVxuICBpZiAoXCJjb25zdHJ1Y3RvclwiIGluIHZhbHVlICYmIGNvbnN0cnVjdG9yTWFwLmhhcyh2YWx1ZS5jb25zdHJ1Y3RvcikpIHtcbiAgICByZXR1cm4gY29uc3RydWN0b3JNYXAuZ2V0KHZhbHVlLmNvbnN0cnVjdG9yKSh2YWx1ZSwgb3B0aW9ucyk7XG4gIH1cbiAgaWYgKHN0cmluZ1RhZ01hcFt0eXBlM10pIHtcbiAgICByZXR1cm4gc3RyaW5nVGFnTWFwW3R5cGUzXSh2YWx1ZSwgb3B0aW9ucyk7XG4gIH1cbiAgcmV0dXJuIFwiXCI7XG59LCBcImluc3BlY3RDdXN0b21cIik7XG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuZnVuY3Rpb24gaW5zcGVjdCh2YWx1ZSwgb3B0cyA9IHt9KSB7XG4gIGNvbnN0IG9wdGlvbnMgPSBub3JtYWxpc2VPcHRpb25zKG9wdHMsIGluc3BlY3QpO1xuICBjb25zdCB7IGN1c3RvbUluc3BlY3QgfSA9IG9wdGlvbnM7XG4gIGxldCB0eXBlMyA9IHZhbHVlID09PSBudWxsID8gXCJudWxsXCIgOiB0eXBlb2YgdmFsdWU7XG4gIGlmICh0eXBlMyA9PT0gXCJvYmplY3RcIikge1xuICAgIHR5cGUzID0gdG9TdHJpbmcuY2FsbCh2YWx1ZSkuc2xpY2UoOCwgLTEpO1xuICB9XG4gIGlmICh0eXBlMyBpbiBiYXNlVHlwZXNNYXApIHtcbiAgICByZXR1cm4gYmFzZVR5cGVzTWFwW3R5cGUzXSh2YWx1ZSwgb3B0aW9ucyk7XG4gIH1cbiAgaWYgKGN1c3RvbUluc3BlY3QgJiYgdmFsdWUpIHtcbiAgICBjb25zdCBvdXRwdXQgPSBpbnNwZWN0Q3VzdG9tKHZhbHVlLCBvcHRpb25zLCB0eXBlMyk7XG4gICAgaWYgKG91dHB1dCkge1xuICAgICAgaWYgKHR5cGVvZiBvdXRwdXQgPT09IFwic3RyaW5nXCIpXG4gICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgICByZXR1cm4gaW5zcGVjdChvdXRwdXQsIG9wdGlvbnMpO1xuICAgIH1cbiAgfVxuICBjb25zdCBwcm90byA9IHZhbHVlID8gT2JqZWN0LmdldFByb3RvdHlwZU9mKHZhbHVlKSA6IGZhbHNlO1xuICBpZiAocHJvdG8gPT09IE9iamVjdC5wcm90b3R5cGUgfHwgcHJvdG8gPT09IG51bGwpIHtcbiAgICByZXR1cm4gaW5zcGVjdE9iamVjdCh2YWx1ZSwgb3B0aW9ucyk7XG4gIH1cbiAgaWYgKHZhbHVlICYmIHR5cGVvZiBIVE1MRWxlbWVudCA9PT0gXCJmdW5jdGlvblwiICYmIHZhbHVlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICByZXR1cm4gaW5zcGVjdEhUTUwodmFsdWUsIG9wdGlvbnMpO1xuICB9XG4gIGlmIChcImNvbnN0cnVjdG9yXCIgaW4gdmFsdWUpIHtcbiAgICBpZiAodmFsdWUuY29uc3RydWN0b3IgIT09IE9iamVjdCkge1xuICAgICAgcmV0dXJuIGluc3BlY3RDbGFzcyh2YWx1ZSwgb3B0aW9ucyk7XG4gICAgfVxuICAgIHJldHVybiBpbnNwZWN0T2JqZWN0KHZhbHVlLCBvcHRpb25zKTtcbiAgfVxuICBpZiAodmFsdWUgPT09IE9iamVjdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gaW5zcGVjdE9iamVjdCh2YWx1ZSwgb3B0aW9ucyk7XG4gIH1cbiAgcmV0dXJuIG9wdGlvbnMuc3R5bGl6ZShTdHJpbmcodmFsdWUpLCB0eXBlMyk7XG59XG5fX25hbWUoaW5zcGVjdCwgXCJpbnNwZWN0XCIpO1xuXG4vLyBsaWIvY2hhaS9jb25maWcuanNcbnZhciBjb25maWcgPSB7XG4gIC8qKlxuICAgKiAjIyMgY29uZmlnLmluY2x1ZGVTdGFja1xuICAgKlxuICAgKiBVc2VyIGNvbmZpZ3VyYWJsZSBwcm9wZXJ0eSwgaW5mbHVlbmNlcyB3aGV0aGVyIHN0YWNrIHRyYWNlXG4gICAqIGlzIGluY2x1ZGVkIGluIEFzc2VydGlvbiBlcnJvciBtZXNzYWdlLiBEZWZhdWx0IG9mIGZhbHNlXG4gICAqIHN1cHByZXNzZXMgc3RhY2sgdHJhY2UgaW4gdGhlIGVycm9yIG1lc3NhZ2UuXG4gICAqXG4gICAqICAgICBjaGFpLmNvbmZpZy5pbmNsdWRlU3RhY2sgPSB0cnVlOyAgLy8gZW5hYmxlIHN0YWNrIG9uIGVycm9yXG4gICAqXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn1cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgaW5jbHVkZVN0YWNrOiBmYWxzZSxcbiAgLyoqXG4gICAqICMjIyBjb25maWcuc2hvd0RpZmZcbiAgICpcbiAgICogVXNlciBjb25maWd1cmFibGUgcHJvcGVydHksIGluZmx1ZW5jZXMgd2hldGhlciBvciBub3RcbiAgICogdGhlIGBzaG93RGlmZmAgZmxhZyBzaG91bGQgYmUgaW5jbHVkZWQgaW4gdGhlIHRocm93blxuICAgKiBBc3NlcnRpb25FcnJvcnMuIGBmYWxzZWAgd2lsbCBhbHdheXMgYmUgYGZhbHNlYDsgYHRydWVgXG4gICAqIHdpbGwgYmUgdHJ1ZSB3aGVuIHRoZSBhc3NlcnRpb24gaGFzIHJlcXVlc3RlZCBhIGRpZmZcbiAgICogYmUgc2hvd24uXG4gICAqXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn1cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgc2hvd0RpZmY6IHRydWUsXG4gIC8qKlxuICAgKiAjIyMgY29uZmlnLnRydW5jYXRlVGhyZXNob2xkXG4gICAqXG4gICAqIFVzZXIgY29uZmlndXJhYmxlIHByb3BlcnR5LCBzZXRzIGxlbmd0aCB0aHJlc2hvbGQgZm9yIGFjdHVhbCBhbmRcbiAgICogZXhwZWN0ZWQgdmFsdWVzIGluIGFzc2VydGlvbiBlcnJvcnMuIElmIHRoaXMgdGhyZXNob2xkIGlzIGV4Y2VlZGVkLCBmb3JcbiAgICogZXhhbXBsZSBmb3IgbGFyZ2UgZGF0YSBzdHJ1Y3R1cmVzLCB0aGUgdmFsdWUgaXMgcmVwbGFjZWQgd2l0aCBzb21ldGhpbmdcbiAgICogbGlrZSBgWyBBcnJheSgzKSBdYCBvciBgeyBPYmplY3QgKHByb3AxLCBwcm9wMikgfWAuXG4gICAqXG4gICAqIFNldCBpdCB0byB6ZXJvIGlmIHlvdSB3YW50IHRvIGRpc2FibGUgdHJ1bmNhdGluZyBhbHRvZ2V0aGVyLlxuICAgKlxuICAgKiBUaGlzIGlzIGVzcGVjaWFsbHkgdXNlcmZ1bCB3aGVuIGRvaW5nIGFzc2VydGlvbnMgb24gYXJyYXlzOiBoYXZpbmcgdGhpc1xuICAgKiBzZXQgdG8gYSByZWFzb25hYmxlIGxhcmdlIHZhbHVlIG1ha2VzIHRoZSBmYWlsdXJlIG1lc3NhZ2VzIHJlYWRpbHlcbiAgICogaW5zcGVjdGFibGUuXG4gICAqXG4gICAqICAgICBjaGFpLmNvbmZpZy50cnVuY2F0ZVRocmVzaG9sZCA9IDA7ICAvLyBkaXNhYmxlIHRydW5jYXRpbmdcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9XG4gICAqIEBwdWJsaWNcbiAgICovXG4gIHRydW5jYXRlVGhyZXNob2xkOiA0MCxcbiAgLyoqXG4gICAqICMjIyBjb25maWcudXNlUHJveHlcbiAgICpcbiAgICogVXNlciBjb25maWd1cmFibGUgcHJvcGVydHksIGRlZmluZXMgaWYgY2hhaSB3aWxsIHVzZSBhIFByb3h5IHRvIHRocm93XG4gICAqIGFuIGVycm9yIHdoZW4gYSBub24tZXhpc3RlbnQgcHJvcGVydHkgaXMgcmVhZCwgd2hpY2ggcHJvdGVjdHMgdXNlcnNcbiAgICogZnJvbSB0eXBvcyB3aGVuIHVzaW5nIHByb3BlcnR5LWJhc2VkIGFzc2VydGlvbnMuXG4gICAqXG4gICAqIFNldCBpdCB0byBmYWxzZSBpZiB5b3Ugd2FudCB0byBkaXNhYmxlIHRoaXMgZmVhdHVyZS5cbiAgICpcbiAgICogICAgIGNoYWkuY29uZmlnLnVzZVByb3h5ID0gZmFsc2U7ICAvLyBkaXNhYmxlIHVzZSBvZiBQcm94eVxuICAgKlxuICAgKiBUaGlzIGZlYXR1cmUgaXMgYXV0b21hdGljYWxseSBkaXNhYmxlZCByZWdhcmRsZXNzIG9mIHRoaXMgY29uZmlnIHZhbHVlXG4gICAqIGluIGVudmlyb25tZW50cyB0aGF0IGRvbid0IHN1cHBvcnQgcHJveGllcy5cbiAgICpcbiAgICogQHBhcmFtIHtib29sZWFufVxuICAgKiBAcHVibGljXG4gICAqL1xuICB1c2VQcm94eTogdHJ1ZSxcbiAgLyoqXG4gICAqICMjIyBjb25maWcucHJveHlFeGNsdWRlZEtleXNcbiAgICpcbiAgICogVXNlciBjb25maWd1cmFibGUgcHJvcGVydHksIGRlZmluZXMgd2hpY2ggcHJvcGVydGllcyBzaG91bGQgYmUgaWdub3JlZFxuICAgKiBpbnN0ZWFkIG9mIHRocm93aW5nIGFuIGVycm9yIGlmIHRoZXkgZG8gbm90IGV4aXN0IG9uIHRoZSBhc3NlcnRpb24uXG4gICAqIFRoaXMgaXMgb25seSBhcHBsaWVkIGlmIHRoZSBlbnZpcm9ubWVudCBDaGFpIGlzIHJ1bm5pbmcgaW4gc3VwcG9ydHMgcHJveGllcyBhbmRcbiAgICogaWYgdGhlIGB1c2VQcm94eWAgY29uZmlndXJhdGlvbiBzZXR0aW5nIGlzIGVuYWJsZWQuXG4gICAqIEJ5IGRlZmF1bHQsIGB0aGVuYCBhbmQgYGluc3BlY3RgIHdpbGwgbm90IHRocm93IGFuIGVycm9yIGlmIHRoZXkgZG8gbm90IGV4aXN0IG9uIHRoZVxuICAgKiBhc3NlcnRpb24gb2JqZWN0IGJlY2F1c2UgdGhlIGAuaW5zcGVjdGAgcHJvcGVydHkgaXMgcmVhZCBieSBgdXRpbC5pbnNwZWN0YCAoZm9yIGV4YW1wbGUsIHdoZW5cbiAgICogdXNpbmcgYGNvbnNvbGUubG9nYCBvbiB0aGUgYXNzZXJ0aW9uIG9iamVjdCkgYW5kIGAudGhlbmAgaXMgbmVjZXNzYXJ5IGZvciBwcm9taXNlIHR5cGUtY2hlY2tpbmcuXG4gICAqXG4gICAqICAgICAvLyBCeSBkZWZhdWx0IHRoZXNlIGtleXMgd2lsbCBub3QgdGhyb3cgYW4gZXJyb3IgaWYgdGhleSBkbyBub3QgZXhpc3Qgb24gdGhlIGFzc2VydGlvbiBvYmplY3RcbiAgICogICAgIGNoYWkuY29uZmlnLnByb3h5RXhjbHVkZWRLZXlzID0gWyd0aGVuJywgJ2luc3BlY3QnXTtcbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX1cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgcHJveHlFeGNsdWRlZEtleXM6IFtcInRoZW5cIiwgXCJjYXRjaFwiLCBcImluc3BlY3RcIiwgXCJ0b0pTT05cIl0sXG4gIC8qKlxuICAgKiAjIyMgY29uZmlnLmRlZXBFcXVhbFxuICAgKlxuICAgKiBVc2VyIGNvbmZpZ3VyYWJsZSBwcm9wZXJ0eSwgZGVmaW5lcyB3aGljaCBhIGN1c3RvbSBmdW5jdGlvbiB0byB1c2UgZm9yIGRlZXBFcXVhbFxuICAgKiBjb21wYXJpc29ucy5cbiAgICogQnkgZGVmYXVsdCwgdGhlIGZ1bmN0aW9uIHVzZWQgaXMgdGhlIG9uZSBmcm9tIHRoZSBgZGVlcC1lcWxgIHBhY2thZ2Ugd2l0aG91dCBjdXN0b20gY29tcGFyYXRvci5cbiAgICpcbiAgICogICAgIC8vIHVzZSBhIGN1c3RvbSBjb21wYXJhdG9yXG4gICAqICAgICBjaGFpLmNvbmZpZy5kZWVwRXF1YWwgPSAoZXhwZWN0ZWQsIGFjdHVhbCkgPT4ge1xuICAgKiAgICAgICAgIHJldHVybiBjaGFpLnV0aWwuZXFsKGV4cGVjdGVkLCBhY3R1YWwsIHtcbiAgICogICAgICAgICAgICAgY29tcGFyYXRvcjogKGV4cGVjdGVkLCBhY3R1YWwpID0+IHtcbiAgICogICAgICAgICAgICAgICAgIC8vIGZvciBub24gbnVtYmVyIGNvbXBhcmlzb24sIHVzZSB0aGUgZGVmYXVsdCBiZWhhdmlvclxuICAgKiAgICAgICAgICAgICAgICAgaWYodHlwZW9mIGV4cGVjdGVkICE9PSAnbnVtYmVyJykgcmV0dXJuIG51bGw7XG4gICAqICAgICAgICAgICAgICAgICAvLyBhbGxvdyBhIGRpZmZlcmVuY2Ugb2YgMTAgYmV0d2VlbiBjb21wYXJlZCBudW1iZXJzXG4gICAqICAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIGFjdHVhbCA9PT0gJ251bWJlcicgJiYgTWF0aC5hYnMoYWN0dWFsIC0gZXhwZWN0ZWQpIDwgMTBcbiAgICogICAgICAgICAgICAgfVxuICAgKiAgICAgICAgIH0pXG4gICAqICAgICB9O1xuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufVxuICAgKiBAcHVibGljXG4gICAqL1xuICBkZWVwRXF1YWw6IG51bGxcbn07XG5cbi8vIGxpYi9jaGFpL3V0aWxzL2luc3BlY3QuanNcbmZ1bmN0aW9uIGluc3BlY3QyKG9iaiwgc2hvd0hpZGRlbiwgZGVwdGgsIGNvbG9ycykge1xuICBsZXQgb3B0aW9ucyA9IHtcbiAgICBjb2xvcnMsXG4gICAgZGVwdGg6IHR5cGVvZiBkZXB0aCA9PT0gXCJ1bmRlZmluZWRcIiA/IDIgOiBkZXB0aCxcbiAgICBzaG93SGlkZGVuLFxuICAgIHRydW5jYXRlOiBjb25maWcudHJ1bmNhdGVUaHJlc2hvbGQgPyBjb25maWcudHJ1bmNhdGVUaHJlc2hvbGQgOiBJbmZpbml0eVxuICB9O1xuICByZXR1cm4gaW5zcGVjdChvYmosIG9wdGlvbnMpO1xufVxuX19uYW1lKGluc3BlY3QyLCBcImluc3BlY3RcIik7XG5cbi8vIGxpYi9jaGFpL3V0aWxzL29iakRpc3BsYXkuanNcbmZ1bmN0aW9uIG9iakRpc3BsYXkob2JqKSB7XG4gIGxldCBzdHIgPSBpbnNwZWN0MihvYmopLCB0eXBlMyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopO1xuICBpZiAoY29uZmlnLnRydW5jYXRlVGhyZXNob2xkICYmIHN0ci5sZW5ndGggPj0gY29uZmlnLnRydW5jYXRlVGhyZXNob2xkKSB7XG4gICAgaWYgKHR5cGUzID09PSBcIltvYmplY3QgRnVuY3Rpb25dXCIpIHtcbiAgICAgIHJldHVybiAhb2JqLm5hbWUgfHwgb2JqLm5hbWUgPT09IFwiXCIgPyBcIltGdW5jdGlvbl1cIiA6IFwiW0Z1bmN0aW9uOiBcIiArIG9iai5uYW1lICsgXCJdXCI7XG4gICAgfSBlbHNlIGlmICh0eXBlMyA9PT0gXCJbb2JqZWN0IEFycmF5XVwiKSB7XG4gICAgICByZXR1cm4gXCJbIEFycmF5KFwiICsgb2JqLmxlbmd0aCArIFwiKSBdXCI7XG4gICAgfSBlbHNlIGlmICh0eXBlMyA9PT0gXCJbb2JqZWN0IE9iamVjdF1cIikge1xuICAgICAgbGV0IGtleXMgPSBPYmplY3Qua2V5cyhvYmopLCBrc3RyID0ga2V5cy5sZW5ndGggPiAyID8ga2V5cy5zcGxpY2UoMCwgMikuam9pbihcIiwgXCIpICsgXCIsIC4uLlwiIDoga2V5cy5qb2luKFwiLCBcIik7XG4gICAgICByZXR1cm4gXCJ7IE9iamVjdCAoXCIgKyBrc3RyICsgXCIpIH1cIjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHN0cjtcbiAgfVxufVxuX19uYW1lKG9iakRpc3BsYXksIFwib2JqRGlzcGxheVwiKTtcblxuLy8gbGliL2NoYWkvdXRpbHMvZ2V0TWVzc2FnZS5qc1xuZnVuY3Rpb24gZ2V0TWVzc2FnZTIob2JqLCBhcmdzKSB7XG4gIGxldCBuZWdhdGUgPSBmbGFnKG9iaiwgXCJuZWdhdGVcIik7XG4gIGxldCB2YWwgPSBmbGFnKG9iaiwgXCJvYmplY3RcIik7XG4gIGxldCBleHBlY3RlZCA9IGFyZ3NbM107XG4gIGxldCBhY3R1YWwgPSBnZXRBY3R1YWwob2JqLCBhcmdzKTtcbiAgbGV0IG1zZyA9IG5lZ2F0ZSA/IGFyZ3NbMl0gOiBhcmdzWzFdO1xuICBsZXQgZmxhZ01zZyA9IGZsYWcob2JqLCBcIm1lc3NhZ2VcIik7XG4gIGlmICh0eXBlb2YgbXNnID09PSBcImZ1bmN0aW9uXCIpIG1zZyA9IG1zZygpO1xuICBtc2cgPSBtc2cgfHwgXCJcIjtcbiAgbXNnID0gbXNnLnJlcGxhY2UoLyNcXHt0aGlzXFx9L2csIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBvYmpEaXNwbGF5KHZhbCk7XG4gIH0pLnJlcGxhY2UoLyNcXHthY3RcXH0vZywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG9iakRpc3BsYXkoYWN0dWFsKTtcbiAgfSkucmVwbGFjZSgvI1xce2V4cFxcfS9nLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gb2JqRGlzcGxheShleHBlY3RlZCk7XG4gIH0pO1xuICByZXR1cm4gZmxhZ01zZyA/IGZsYWdNc2cgKyBcIjogXCIgKyBtc2cgOiBtc2c7XG59XG5fX25hbWUoZ2V0TWVzc2FnZTIsIFwiZ2V0TWVzc2FnZVwiKTtcblxuLy8gbGliL2NoYWkvdXRpbHMvdHJhbnNmZXJGbGFncy5qc1xuZnVuY3Rpb24gdHJhbnNmZXJGbGFncyhhc3NlcnRpb24sIG9iamVjdCwgaW5jbHVkZUFsbCkge1xuICBsZXQgZmxhZ3MgPSBhc3NlcnRpb24uX19mbGFncyB8fCAoYXNzZXJ0aW9uLl9fZmxhZ3MgPSAvKiBAX19QVVJFX18gKi8gT2JqZWN0LmNyZWF0ZShudWxsKSk7XG4gIGlmICghb2JqZWN0Ll9fZmxhZ3MpIHtcbiAgICBvYmplY3QuX19mbGFncyA9IC8qIEBfX1BVUkVfXyAqLyBPYmplY3QuY3JlYXRlKG51bGwpO1xuICB9XG4gIGluY2x1ZGVBbGwgPSBhcmd1bWVudHMubGVuZ3RoID09PSAzID8gaW5jbHVkZUFsbCA6IHRydWU7XG4gIGZvciAobGV0IGZsYWczIGluIGZsYWdzKSB7XG4gICAgaWYgKGluY2x1ZGVBbGwgfHwgZmxhZzMgIT09IFwib2JqZWN0XCIgJiYgZmxhZzMgIT09IFwic3NmaVwiICYmIGZsYWczICE9PSBcImxvY2tTc2ZpXCIgJiYgZmxhZzMgIT0gXCJtZXNzYWdlXCIpIHtcbiAgICAgIG9iamVjdC5fX2ZsYWdzW2ZsYWczXSA9IGZsYWdzW2ZsYWczXTtcbiAgICB9XG4gIH1cbn1cbl9fbmFtZSh0cmFuc2ZlckZsYWdzLCBcInRyYW5zZmVyRmxhZ3NcIik7XG5cbi8vIG5vZGVfbW9kdWxlcy9kZWVwLWVxbC9pbmRleC5qc1xuZnVuY3Rpb24gdHlwZTIob2JqKSB7XG4gIGlmICh0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIFwidW5kZWZpbmVkXCI7XG4gIH1cbiAgaWYgKG9iaiA9PT0gbnVsbCkge1xuICAgIHJldHVybiBcIm51bGxcIjtcbiAgfVxuICBjb25zdCBzdHJpbmdUYWcgPSBvYmpbU3ltYm9sLnRvU3RyaW5nVGFnXTtcbiAgaWYgKHR5cGVvZiBzdHJpbmdUYWcgPT09IFwic3RyaW5nXCIpIHtcbiAgICByZXR1cm4gc3RyaW5nVGFnO1xuICB9XG4gIGNvbnN0IHNsaWNlU3RhcnQgPSA4O1xuICBjb25zdCBzbGljZUVuZCA9IC0xO1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikuc2xpY2Uoc2xpY2VTdGFydCwgc2xpY2VFbmQpO1xufVxuX19uYW1lKHR5cGUyLCBcInR5cGVcIik7XG5mdW5jdGlvbiBGYWtlTWFwKCkge1xuICB0aGlzLl9rZXkgPSBcImNoYWkvZGVlcC1lcWxfX1wiICsgTWF0aC5yYW5kb20oKSArIERhdGUubm93KCk7XG59XG5fX25hbWUoRmFrZU1hcCwgXCJGYWtlTWFwXCIpO1xuRmFrZU1hcC5wcm90b3R5cGUgPSB7XG4gIGdldDogLyogQF9fUFVSRV9fICovIF9fbmFtZShmdW5jdGlvbiBnZXQoa2V5KSB7XG4gICAgcmV0dXJuIGtleVt0aGlzLl9rZXldO1xuICB9LCBcImdldFwiKSxcbiAgc2V0OiAvKiBAX19QVVJFX18gKi8gX19uYW1lKGZ1bmN0aW9uIHNldChrZXksIHZhbHVlKSB7XG4gICAgaWYgKE9iamVjdC5pc0V4dGVuc2libGUoa2V5KSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGtleSwgdGhpcy5fa2V5LCB7XG4gICAgICAgIHZhbHVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgIH0pO1xuICAgIH1cbiAgfSwgXCJzZXRcIilcbn07XG52YXIgTWVtb2l6ZU1hcCA9IHR5cGVvZiBXZWFrTWFwID09PSBcImZ1bmN0aW9uXCIgPyBXZWFrTWFwIDogRmFrZU1hcDtcbmZ1bmN0aW9uIG1lbW9pemVDb21wYXJlKGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCwgbWVtb2l6ZU1hcCkge1xuICBpZiAoIW1lbW9pemVNYXAgfHwgaXNQcmltaXRpdmUobGVmdEhhbmRPcGVyYW5kKSB8fCBpc1ByaW1pdGl2ZShyaWdodEhhbmRPcGVyYW5kKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZhciBsZWZ0SGFuZE1hcCA9IG1lbW9pemVNYXAuZ2V0KGxlZnRIYW5kT3BlcmFuZCk7XG4gIGlmIChsZWZ0SGFuZE1hcCkge1xuICAgIHZhciByZXN1bHQgPSBsZWZ0SGFuZE1hcC5nZXQocmlnaHRIYW5kT3BlcmFuZCk7XG4gICAgaWYgKHR5cGVvZiByZXN1bHQgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cbl9fbmFtZShtZW1vaXplQ29tcGFyZSwgXCJtZW1vaXplQ29tcGFyZVwiKTtcbmZ1bmN0aW9uIG1lbW9pemVTZXQobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kLCBtZW1vaXplTWFwLCByZXN1bHQpIHtcbiAgaWYgKCFtZW1vaXplTWFwIHx8IGlzUHJpbWl0aXZlKGxlZnRIYW5kT3BlcmFuZCkgfHwgaXNQcmltaXRpdmUocmlnaHRIYW5kT3BlcmFuZCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGxlZnRIYW5kTWFwID0gbWVtb2l6ZU1hcC5nZXQobGVmdEhhbmRPcGVyYW5kKTtcbiAgaWYgKGxlZnRIYW5kTWFwKSB7XG4gICAgbGVmdEhhbmRNYXAuc2V0KHJpZ2h0SGFuZE9wZXJhbmQsIHJlc3VsdCk7XG4gIH0gZWxzZSB7XG4gICAgbGVmdEhhbmRNYXAgPSBuZXcgTWVtb2l6ZU1hcCgpO1xuICAgIGxlZnRIYW5kTWFwLnNldChyaWdodEhhbmRPcGVyYW5kLCByZXN1bHQpO1xuICAgIG1lbW9pemVNYXAuc2V0KGxlZnRIYW5kT3BlcmFuZCwgbGVmdEhhbmRNYXApO1xuICB9XG59XG5fX25hbWUobWVtb2l6ZVNldCwgXCJtZW1vaXplU2V0XCIpO1xudmFyIGRlZXBfZXFsX2RlZmF1bHQgPSBkZWVwRXF1YWw7XG5mdW5jdGlvbiBkZWVwRXF1YWwobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kLCBvcHRpb25zKSB7XG4gIGlmIChvcHRpb25zICYmIG9wdGlvbnMuY29tcGFyYXRvcikge1xuICAgIHJldHVybiBleHRlbnNpdmVEZWVwRXF1YWwobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kLCBvcHRpb25zKTtcbiAgfVxuICB2YXIgc2ltcGxlUmVzdWx0ID0gc2ltcGxlRXF1YWwobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kKTtcbiAgaWYgKHNpbXBsZVJlc3VsdCAhPT0gbnVsbCkge1xuICAgIHJldHVybiBzaW1wbGVSZXN1bHQ7XG4gIH1cbiAgcmV0dXJuIGV4dGVuc2l2ZURlZXBFcXVhbChsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQsIG9wdGlvbnMpO1xufVxuX19uYW1lKGRlZXBFcXVhbCwgXCJkZWVwRXF1YWxcIik7XG5mdW5jdGlvbiBzaW1wbGVFcXVhbChsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQpIHtcbiAgaWYgKGxlZnRIYW5kT3BlcmFuZCA9PT0gcmlnaHRIYW5kT3BlcmFuZCkge1xuICAgIHJldHVybiBsZWZ0SGFuZE9wZXJhbmQgIT09IDAgfHwgMSAvIGxlZnRIYW5kT3BlcmFuZCA9PT0gMSAvIHJpZ2h0SGFuZE9wZXJhbmQ7XG4gIH1cbiAgaWYgKGxlZnRIYW5kT3BlcmFuZCAhPT0gbGVmdEhhbmRPcGVyYW5kICYmIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gIHJpZ2h0SGFuZE9wZXJhbmQgIT09IHJpZ2h0SGFuZE9wZXJhbmQpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoaXNQcmltaXRpdmUobGVmdEhhbmRPcGVyYW5kKSB8fCBpc1ByaW1pdGl2ZShyaWdodEhhbmRPcGVyYW5kKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cbl9fbmFtZShzaW1wbGVFcXVhbCwgXCJzaW1wbGVFcXVhbFwiKTtcbmZ1bmN0aW9uIGV4dGVuc2l2ZURlZXBFcXVhbChsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIG9wdGlvbnMubWVtb2l6ZSA9IG9wdGlvbnMubWVtb2l6ZSA9PT0gZmFsc2UgPyBmYWxzZSA6IG9wdGlvbnMubWVtb2l6ZSB8fCBuZXcgTWVtb2l6ZU1hcCgpO1xuICB2YXIgY29tcGFyYXRvciA9IG9wdGlvbnMgJiYgb3B0aW9ucy5jb21wYXJhdG9yO1xuICB2YXIgbWVtb2l6ZVJlc3VsdExlZnQgPSBtZW1vaXplQ29tcGFyZShsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQsIG9wdGlvbnMubWVtb2l6ZSk7XG4gIGlmIChtZW1vaXplUmVzdWx0TGVmdCAhPT0gbnVsbCkge1xuICAgIHJldHVybiBtZW1vaXplUmVzdWx0TGVmdDtcbiAgfVxuICB2YXIgbWVtb2l6ZVJlc3VsdFJpZ2h0ID0gbWVtb2l6ZUNvbXBhcmUocmlnaHRIYW5kT3BlcmFuZCwgbGVmdEhhbmRPcGVyYW5kLCBvcHRpb25zLm1lbW9pemUpO1xuICBpZiAobWVtb2l6ZVJlc3VsdFJpZ2h0ICE9PSBudWxsKSB7XG4gICAgcmV0dXJuIG1lbW9pemVSZXN1bHRSaWdodDtcbiAgfVxuICBpZiAoY29tcGFyYXRvcikge1xuICAgIHZhciBjb21wYXJhdG9yUmVzdWx0ID0gY29tcGFyYXRvcihsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQpO1xuICAgIGlmIChjb21wYXJhdG9yUmVzdWx0ID09PSBmYWxzZSB8fCBjb21wYXJhdG9yUmVzdWx0ID09PSB0cnVlKSB7XG4gICAgICBtZW1vaXplU2V0KGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCwgb3B0aW9ucy5tZW1vaXplLCBjb21wYXJhdG9yUmVzdWx0KTtcbiAgICAgIHJldHVybiBjb21wYXJhdG9yUmVzdWx0O1xuICAgIH1cbiAgICB2YXIgc2ltcGxlUmVzdWx0ID0gc2ltcGxlRXF1YWwobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kKTtcbiAgICBpZiAoc2ltcGxlUmVzdWx0ICE9PSBudWxsKSB7XG4gICAgICByZXR1cm4gc2ltcGxlUmVzdWx0O1xuICAgIH1cbiAgfVxuICB2YXIgbGVmdEhhbmRUeXBlID0gdHlwZTIobGVmdEhhbmRPcGVyYW5kKTtcbiAgaWYgKGxlZnRIYW5kVHlwZSAhPT0gdHlwZTIocmlnaHRIYW5kT3BlcmFuZCkpIHtcbiAgICBtZW1vaXplU2V0KGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCwgb3B0aW9ucy5tZW1vaXplLCBmYWxzZSk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIG1lbW9pemVTZXQobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kLCBvcHRpb25zLm1lbW9pemUsIHRydWUpO1xuICB2YXIgcmVzdWx0ID0gZXh0ZW5zaXZlRGVlcEVxdWFsQnlUeXBlKGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCwgbGVmdEhhbmRUeXBlLCBvcHRpb25zKTtcbiAgbWVtb2l6ZVNldChsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQsIG9wdGlvbnMubWVtb2l6ZSwgcmVzdWx0KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cbl9fbmFtZShleHRlbnNpdmVEZWVwRXF1YWwsIFwiZXh0ZW5zaXZlRGVlcEVxdWFsXCIpO1xuZnVuY3Rpb24gZXh0ZW5zaXZlRGVlcEVxdWFsQnlUeXBlKGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCwgbGVmdEhhbmRUeXBlLCBvcHRpb25zKSB7XG4gIHN3aXRjaCAobGVmdEhhbmRUeXBlKSB7XG4gICAgY2FzZSBcIlN0cmluZ1wiOlxuICAgIGNhc2UgXCJOdW1iZXJcIjpcbiAgICBjYXNlIFwiQm9vbGVhblwiOlxuICAgIGNhc2UgXCJEYXRlXCI6XG4gICAgICByZXR1cm4gZGVlcEVxdWFsKGxlZnRIYW5kT3BlcmFuZC52YWx1ZU9mKCksIHJpZ2h0SGFuZE9wZXJhbmQudmFsdWVPZigpKTtcbiAgICBjYXNlIFwiUHJvbWlzZVwiOlxuICAgIGNhc2UgXCJTeW1ib2xcIjpcbiAgICBjYXNlIFwiZnVuY3Rpb25cIjpcbiAgICBjYXNlIFwiV2Vha01hcFwiOlxuICAgIGNhc2UgXCJXZWFrU2V0XCI6XG4gICAgICByZXR1cm4gbGVmdEhhbmRPcGVyYW5kID09PSByaWdodEhhbmRPcGVyYW5kO1xuICAgIGNhc2UgXCJFcnJvclwiOlxuICAgICAgcmV0dXJuIGtleXNFcXVhbChsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQsIFtcIm5hbWVcIiwgXCJtZXNzYWdlXCIsIFwiY29kZVwiXSwgb3B0aW9ucyk7XG4gICAgY2FzZSBcIkFyZ3VtZW50c1wiOlxuICAgIGNhc2UgXCJJbnQ4QXJyYXlcIjpcbiAgICBjYXNlIFwiVWludDhBcnJheVwiOlxuICAgIGNhc2UgXCJVaW50OENsYW1wZWRBcnJheVwiOlxuICAgIGNhc2UgXCJJbnQxNkFycmF5XCI6XG4gICAgY2FzZSBcIlVpbnQxNkFycmF5XCI6XG4gICAgY2FzZSBcIkludDMyQXJyYXlcIjpcbiAgICBjYXNlIFwiVWludDMyQXJyYXlcIjpcbiAgICBjYXNlIFwiRmxvYXQzMkFycmF5XCI6XG4gICAgY2FzZSBcIkZsb2F0NjRBcnJheVwiOlxuICAgIGNhc2UgXCJBcnJheVwiOlxuICAgICAgcmV0dXJuIGl0ZXJhYmxlRXF1YWwobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kLCBvcHRpb25zKTtcbiAgICBjYXNlIFwiUmVnRXhwXCI6XG4gICAgICByZXR1cm4gcmVnZXhwRXF1YWwobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kKTtcbiAgICBjYXNlIFwiR2VuZXJhdG9yXCI6XG4gICAgICByZXR1cm4gZ2VuZXJhdG9yRXF1YWwobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kLCBvcHRpb25zKTtcbiAgICBjYXNlIFwiRGF0YVZpZXdcIjpcbiAgICAgIHJldHVybiBpdGVyYWJsZUVxdWFsKG5ldyBVaW50OEFycmF5KGxlZnRIYW5kT3BlcmFuZC5idWZmZXIpLCBuZXcgVWludDhBcnJheShyaWdodEhhbmRPcGVyYW5kLmJ1ZmZlciksIG9wdGlvbnMpO1xuICAgIGNhc2UgXCJBcnJheUJ1ZmZlclwiOlxuICAgICAgcmV0dXJuIGl0ZXJhYmxlRXF1YWwobmV3IFVpbnQ4QXJyYXkobGVmdEhhbmRPcGVyYW5kKSwgbmV3IFVpbnQ4QXJyYXkocmlnaHRIYW5kT3BlcmFuZCksIG9wdGlvbnMpO1xuICAgIGNhc2UgXCJTZXRcIjpcbiAgICAgIHJldHVybiBlbnRyaWVzRXF1YWwobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kLCBvcHRpb25zKTtcbiAgICBjYXNlIFwiTWFwXCI6XG4gICAgICByZXR1cm4gZW50cmllc0VxdWFsKGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCwgb3B0aW9ucyk7XG4gICAgY2FzZSBcIlRlbXBvcmFsLlBsYWluRGF0ZVwiOlxuICAgIGNhc2UgXCJUZW1wb3JhbC5QbGFpblRpbWVcIjpcbiAgICBjYXNlIFwiVGVtcG9yYWwuUGxhaW5EYXRlVGltZVwiOlxuICAgIGNhc2UgXCJUZW1wb3JhbC5JbnN0YW50XCI6XG4gICAgY2FzZSBcIlRlbXBvcmFsLlpvbmVkRGF0ZVRpbWVcIjpcbiAgICBjYXNlIFwiVGVtcG9yYWwuUGxhaW5ZZWFyTW9udGhcIjpcbiAgICBjYXNlIFwiVGVtcG9yYWwuUGxhaW5Nb250aERheVwiOlxuICAgICAgcmV0dXJuIGxlZnRIYW5kT3BlcmFuZC5lcXVhbHMocmlnaHRIYW5kT3BlcmFuZCk7XG4gICAgY2FzZSBcIlRlbXBvcmFsLkR1cmF0aW9uXCI6XG4gICAgICByZXR1cm4gbGVmdEhhbmRPcGVyYW5kLnRvdGFsKFwibmFub3NlY29uZHNcIikgPT09IHJpZ2h0SGFuZE9wZXJhbmQudG90YWwoXCJuYW5vc2Vjb25kc1wiKTtcbiAgICBjYXNlIFwiVGVtcG9yYWwuVGltZVpvbmVcIjpcbiAgICBjYXNlIFwiVGVtcG9yYWwuQ2FsZW5kYXJcIjpcbiAgICAgIHJldHVybiBsZWZ0SGFuZE9wZXJhbmQudG9TdHJpbmcoKSA9PT0gcmlnaHRIYW5kT3BlcmFuZC50b1N0cmluZygpO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gb2JqZWN0RXF1YWwobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kLCBvcHRpb25zKTtcbiAgfVxufVxuX19uYW1lKGV4dGVuc2l2ZURlZXBFcXVhbEJ5VHlwZSwgXCJleHRlbnNpdmVEZWVwRXF1YWxCeVR5cGVcIik7XG5mdW5jdGlvbiByZWdleHBFcXVhbChsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQpIHtcbiAgcmV0dXJuIGxlZnRIYW5kT3BlcmFuZC50b1N0cmluZygpID09PSByaWdodEhhbmRPcGVyYW5kLnRvU3RyaW5nKCk7XG59XG5fX25hbWUocmVnZXhwRXF1YWwsIFwicmVnZXhwRXF1YWxcIik7XG5mdW5jdGlvbiBlbnRyaWVzRXF1YWwobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kLCBvcHRpb25zKSB7XG4gIHRyeSB7XG4gICAgaWYgKGxlZnRIYW5kT3BlcmFuZC5zaXplICE9PSByaWdodEhhbmRPcGVyYW5kLnNpemUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGxlZnRIYW5kT3BlcmFuZC5zaXplID09PSAwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH0gY2F0Y2ggKHNpemVFcnJvcikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgbGVmdEhhbmRJdGVtcyA9IFtdO1xuICB2YXIgcmlnaHRIYW5kSXRlbXMgPSBbXTtcbiAgbGVmdEhhbmRPcGVyYW5kLmZvckVhY2goLyogQF9fUFVSRV9fICovIF9fbmFtZShmdW5jdGlvbiBnYXRoZXJFbnRyaWVzKGtleSwgdmFsdWUpIHtcbiAgICBsZWZ0SGFuZEl0ZW1zLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgfSwgXCJnYXRoZXJFbnRyaWVzXCIpKTtcbiAgcmlnaHRIYW5kT3BlcmFuZC5mb3JFYWNoKC8qIEBfX1BVUkVfXyAqLyBfX25hbWUoZnVuY3Rpb24gZ2F0aGVyRW50cmllcyhrZXksIHZhbHVlKSB7XG4gICAgcmlnaHRIYW5kSXRlbXMucHVzaChba2V5LCB2YWx1ZV0pO1xuICB9LCBcImdhdGhlckVudHJpZXNcIikpO1xuICByZXR1cm4gaXRlcmFibGVFcXVhbChsZWZ0SGFuZEl0ZW1zLnNvcnQoKSwgcmlnaHRIYW5kSXRlbXMuc29ydCgpLCBvcHRpb25zKTtcbn1cbl9fbmFtZShlbnRyaWVzRXF1YWwsIFwiZW50cmllc0VxdWFsXCIpO1xuZnVuY3Rpb24gaXRlcmFibGVFcXVhbChsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQsIG9wdGlvbnMpIHtcbiAgdmFyIGxlbmd0aCA9IGxlZnRIYW5kT3BlcmFuZC5sZW5ndGg7XG4gIGlmIChsZW5ndGggIT09IHJpZ2h0SGFuZE9wZXJhbmQubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChsZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICB2YXIgaW5kZXggPSAtMTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAoZGVlcEVxdWFsKGxlZnRIYW5kT3BlcmFuZFtpbmRleF0sIHJpZ2h0SGFuZE9wZXJhbmRbaW5kZXhdLCBvcHRpb25zKSA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5fX25hbWUoaXRlcmFibGVFcXVhbCwgXCJpdGVyYWJsZUVxdWFsXCIpO1xuZnVuY3Rpb24gZ2VuZXJhdG9yRXF1YWwobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kLCBvcHRpb25zKSB7XG4gIHJldHVybiBpdGVyYWJsZUVxdWFsKGdldEdlbmVyYXRvckVudHJpZXMobGVmdEhhbmRPcGVyYW5kKSwgZ2V0R2VuZXJhdG9yRW50cmllcyhyaWdodEhhbmRPcGVyYW5kKSwgb3B0aW9ucyk7XG59XG5fX25hbWUoZ2VuZXJhdG9yRXF1YWwsIFwiZ2VuZXJhdG9yRXF1YWxcIik7XG5mdW5jdGlvbiBoYXNJdGVyYXRvckZ1bmN0aW9uKHRhcmdldCkge1xuICByZXR1cm4gdHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgdGFyZ2V0ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIHRhcmdldFtTeW1ib2wuaXRlcmF0b3JdID09PSBcImZ1bmN0aW9uXCI7XG59XG5fX25hbWUoaGFzSXRlcmF0b3JGdW5jdGlvbiwgXCJoYXNJdGVyYXRvckZ1bmN0aW9uXCIpO1xuZnVuY3Rpb24gZ2V0SXRlcmF0b3JFbnRyaWVzKHRhcmdldCkge1xuICBpZiAoaGFzSXRlcmF0b3JGdW5jdGlvbih0YXJnZXQpKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBnZXRHZW5lcmF0b3JFbnRyaWVzKHRhcmdldFtTeW1ib2wuaXRlcmF0b3JdKCkpO1xuICAgIH0gY2F0Y2ggKGl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIFtdO1xufVxuX19uYW1lKGdldEl0ZXJhdG9yRW50cmllcywgXCJnZXRJdGVyYXRvckVudHJpZXNcIik7XG5mdW5jdGlvbiBnZXRHZW5lcmF0b3JFbnRyaWVzKGdlbmVyYXRvcikge1xuICB2YXIgZ2VuZXJhdG9yUmVzdWx0ID0gZ2VuZXJhdG9yLm5leHQoKTtcbiAgdmFyIGFjY3VtdWxhdG9yID0gW2dlbmVyYXRvclJlc3VsdC52YWx1ZV07XG4gIHdoaWxlIChnZW5lcmF0b3JSZXN1bHQuZG9uZSA9PT0gZmFsc2UpIHtcbiAgICBnZW5lcmF0b3JSZXN1bHQgPSBnZW5lcmF0b3IubmV4dCgpO1xuICAgIGFjY3VtdWxhdG9yLnB1c2goZ2VuZXJhdG9yUmVzdWx0LnZhbHVlKTtcbiAgfVxuICByZXR1cm4gYWNjdW11bGF0b3I7XG59XG5fX25hbWUoZ2V0R2VuZXJhdG9yRW50cmllcywgXCJnZXRHZW5lcmF0b3JFbnRyaWVzXCIpO1xuZnVuY3Rpb24gZ2V0RW51bWVyYWJsZUtleXModGFyZ2V0KSB7XG4gIHZhciBrZXlzID0gW107XG4gIGZvciAodmFyIGtleSBpbiB0YXJnZXQpIHtcbiAgICBrZXlzLnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4ga2V5cztcbn1cbl9fbmFtZShnZXRFbnVtZXJhYmxlS2V5cywgXCJnZXRFbnVtZXJhYmxlS2V5c1wiKTtcbmZ1bmN0aW9uIGdldEVudW1lcmFibGVTeW1ib2xzKHRhcmdldCkge1xuICB2YXIga2V5cyA9IFtdO1xuICB2YXIgYWxsS2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHModGFyZ2V0KTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBhbGxLZXlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgdmFyIGtleSA9IGFsbEtleXNbaV07XG4gICAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpLmVudW1lcmFibGUpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4ga2V5cztcbn1cbl9fbmFtZShnZXRFbnVtZXJhYmxlU3ltYm9scywgXCJnZXRFbnVtZXJhYmxlU3ltYm9sc1wiKTtcbmZ1bmN0aW9uIGtleXNFcXVhbChsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQsIGtleXMsIG9wdGlvbnMpIHtcbiAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICBpZiAobGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgIGlmIChkZWVwRXF1YWwobGVmdEhhbmRPcGVyYW5kW2tleXNbaV1dLCByaWdodEhhbmRPcGVyYW5kW2tleXNbaV1dLCBvcHRpb25zKSA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5fX25hbWUoa2V5c0VxdWFsLCBcImtleXNFcXVhbFwiKTtcbmZ1bmN0aW9uIG9iamVjdEVxdWFsKGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCwgb3B0aW9ucykge1xuICB2YXIgbGVmdEhhbmRLZXlzID0gZ2V0RW51bWVyYWJsZUtleXMobGVmdEhhbmRPcGVyYW5kKTtcbiAgdmFyIHJpZ2h0SGFuZEtleXMgPSBnZXRFbnVtZXJhYmxlS2V5cyhyaWdodEhhbmRPcGVyYW5kKTtcbiAgdmFyIGxlZnRIYW5kU3ltYm9scyA9IGdldEVudW1lcmFibGVTeW1ib2xzKGxlZnRIYW5kT3BlcmFuZCk7XG4gIHZhciByaWdodEhhbmRTeW1ib2xzID0gZ2V0RW51bWVyYWJsZVN5bWJvbHMocmlnaHRIYW5kT3BlcmFuZCk7XG4gIGxlZnRIYW5kS2V5cyA9IGxlZnRIYW5kS2V5cy5jb25jYXQobGVmdEhhbmRTeW1ib2xzKTtcbiAgcmlnaHRIYW5kS2V5cyA9IHJpZ2h0SGFuZEtleXMuY29uY2F0KHJpZ2h0SGFuZFN5bWJvbHMpO1xuICBpZiAobGVmdEhhbmRLZXlzLmxlbmd0aCAmJiBsZWZ0SGFuZEtleXMubGVuZ3RoID09PSByaWdodEhhbmRLZXlzLmxlbmd0aCkge1xuICAgIGlmIChpdGVyYWJsZUVxdWFsKG1hcFN5bWJvbHMobGVmdEhhbmRLZXlzKS5zb3J0KCksIG1hcFN5bWJvbHMocmlnaHRIYW5kS2V5cykuc29ydCgpKSA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGtleXNFcXVhbChsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQsIGxlZnRIYW5kS2V5cywgb3B0aW9ucyk7XG4gIH1cbiAgdmFyIGxlZnRIYW5kRW50cmllcyA9IGdldEl0ZXJhdG9yRW50cmllcyhsZWZ0SGFuZE9wZXJhbmQpO1xuICB2YXIgcmlnaHRIYW5kRW50cmllcyA9IGdldEl0ZXJhdG9yRW50cmllcyhyaWdodEhhbmRPcGVyYW5kKTtcbiAgaWYgKGxlZnRIYW5kRW50cmllcy5sZW5ndGggJiYgbGVmdEhhbmRFbnRyaWVzLmxlbmd0aCA9PT0gcmlnaHRIYW5kRW50cmllcy5sZW5ndGgpIHtcbiAgICBsZWZ0SGFuZEVudHJpZXMuc29ydCgpO1xuICAgIHJpZ2h0SGFuZEVudHJpZXMuc29ydCgpO1xuICAgIHJldHVybiBpdGVyYWJsZUVxdWFsKGxlZnRIYW5kRW50cmllcywgcmlnaHRIYW5kRW50cmllcywgb3B0aW9ucyk7XG4gIH1cbiAgaWYgKGxlZnRIYW5kS2V5cy5sZW5ndGggPT09IDAgJiYgbGVmdEhhbmRFbnRyaWVzLmxlbmd0aCA9PT0gMCAmJiByaWdodEhhbmRLZXlzLmxlbmd0aCA9PT0gMCAmJiByaWdodEhhbmRFbnRyaWVzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cbl9fbmFtZShvYmplY3RFcXVhbCwgXCJvYmplY3RFcXVhbFwiKTtcbmZ1bmN0aW9uIGlzUHJpbWl0aXZlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCI7XG59XG5fX25hbWUoaXNQcmltaXRpdmUsIFwiaXNQcmltaXRpdmVcIik7XG5mdW5jdGlvbiBtYXBTeW1ib2xzKGFycikge1xuICByZXR1cm4gYXJyLm1hcCgvKiBAX19QVVJFX18gKi8gX19uYW1lKGZ1bmN0aW9uIG1hcFN5bWJvbChlbnRyeSkge1xuICAgIGlmICh0eXBlb2YgZW50cnkgPT09IFwic3ltYm9sXCIpIHtcbiAgICAgIHJldHVybiBlbnRyeS50b1N0cmluZygpO1xuICAgIH1cbiAgICByZXR1cm4gZW50cnk7XG4gIH0sIFwibWFwU3ltYm9sXCIpKTtcbn1cbl9fbmFtZShtYXBTeW1ib2xzLCBcIm1hcFN5bWJvbHNcIik7XG5cbi8vIG5vZGVfbW9kdWxlcy9wYXRodmFsL2luZGV4LmpzXG5mdW5jdGlvbiBoYXNQcm9wZXJ0eShvYmosIG5hbWUpIHtcbiAgaWYgKHR5cGVvZiBvYmogPT09IFwidW5kZWZpbmVkXCIgfHwgb2JqID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiBuYW1lIGluIE9iamVjdChvYmopO1xufVxuX19uYW1lKGhhc1Byb3BlcnR5LCBcImhhc1Byb3BlcnR5XCIpO1xuZnVuY3Rpb24gcGFyc2VQYXRoKHBhdGgpIHtcbiAgY29uc3Qgc3RyID0gcGF0aC5yZXBsYWNlKC8oW15cXFxcXSlcXFsvZywgXCIkMS5bXCIpO1xuICBjb25zdCBwYXJ0cyA9IHN0ci5tYXRjaCgvKFxcXFxcXC58W14uXSs/KSsvZyk7XG4gIHJldHVybiBwYXJ0cy5tYXAoKHZhbHVlKSA9PiB7XG4gICAgaWYgKHZhbHVlID09PSBcImNvbnN0cnVjdG9yXCIgfHwgdmFsdWUgPT09IFwiX19wcm90b19fXCIgfHwgdmFsdWUgPT09IFwicHJvdG90eXBlXCIpIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gICAgY29uc3QgcmVnZXhwID0gL15cXFsoXFxkKylcXF0kLztcbiAgICBjb25zdCBtQXJyID0gcmVnZXhwLmV4ZWModmFsdWUpO1xuICAgIGxldCBwYXJzZWQgPSBudWxsO1xuICAgIGlmIChtQXJyKSB7XG4gICAgICBwYXJzZWQgPSB7IGk6IHBhcnNlRmxvYXQobUFyclsxXSkgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFyc2VkID0geyBwOiB2YWx1ZS5yZXBsYWNlKC9cXFxcKFsuW1xcXV0pL2csIFwiJDFcIikgfTtcbiAgICB9XG4gICAgcmV0dXJuIHBhcnNlZDtcbiAgfSk7XG59XG5fX25hbWUocGFyc2VQYXRoLCBcInBhcnNlUGF0aFwiKTtcbmZ1bmN0aW9uIGludGVybmFsR2V0UGF0aFZhbHVlKG9iaiwgcGFyc2VkLCBwYXRoRGVwdGgpIHtcbiAgbGV0IHRlbXBvcmFyeVZhbHVlID0gb2JqO1xuICBsZXQgcmVzID0gbnVsbDtcbiAgcGF0aERlcHRoID0gdHlwZW9mIHBhdGhEZXB0aCA9PT0gXCJ1bmRlZmluZWRcIiA/IHBhcnNlZC5sZW5ndGggOiBwYXRoRGVwdGg7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcGF0aERlcHRoOyBpKyspIHtcbiAgICBjb25zdCBwYXJ0ID0gcGFyc2VkW2ldO1xuICAgIGlmICh0ZW1wb3JhcnlWYWx1ZSkge1xuICAgICAgaWYgKHR5cGVvZiBwYXJ0LnAgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgdGVtcG9yYXJ5VmFsdWUgPSB0ZW1wb3JhcnlWYWx1ZVtwYXJ0LmldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGVtcG9yYXJ5VmFsdWUgPSB0ZW1wb3JhcnlWYWx1ZVtwYXJ0LnBdO1xuICAgICAgfVxuICAgICAgaWYgKGkgPT09IHBhdGhEZXB0aCAtIDEpIHtcbiAgICAgICAgcmVzID0gdGVtcG9yYXJ5VmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiByZXM7XG59XG5fX25hbWUoaW50ZXJuYWxHZXRQYXRoVmFsdWUsIFwiaW50ZXJuYWxHZXRQYXRoVmFsdWVcIik7XG5mdW5jdGlvbiBnZXRQYXRoSW5mbyhvYmosIHBhdGgpIHtcbiAgY29uc3QgcGFyc2VkID0gcGFyc2VQYXRoKHBhdGgpO1xuICBjb25zdCBsYXN0ID0gcGFyc2VkW3BhcnNlZC5sZW5ndGggLSAxXTtcbiAgY29uc3QgaW5mbyA9IHtcbiAgICBwYXJlbnQ6IHBhcnNlZC5sZW5ndGggPiAxID8gaW50ZXJuYWxHZXRQYXRoVmFsdWUob2JqLCBwYXJzZWQsIHBhcnNlZC5sZW5ndGggLSAxKSA6IG9iaixcbiAgICBuYW1lOiBsYXN0LnAgfHwgbGFzdC5pLFxuICAgIHZhbHVlOiBpbnRlcm5hbEdldFBhdGhWYWx1ZShvYmosIHBhcnNlZClcbiAgfTtcbiAgaW5mby5leGlzdHMgPSBoYXNQcm9wZXJ0eShpbmZvLnBhcmVudCwgaW5mby5uYW1lKTtcbiAgcmV0dXJuIGluZm87XG59XG5fX25hbWUoZ2V0UGF0aEluZm8sIFwiZ2V0UGF0aEluZm9cIik7XG5cbi8vIGxpYi9jaGFpL2Fzc2VydGlvbi5qc1xudmFyIEFzc2VydGlvbiA9IGNsYXNzIF9Bc3NlcnRpb24ge1xuICBzdGF0aWMge1xuICAgIF9fbmFtZSh0aGlzLCBcIkFzc2VydGlvblwiKTtcbiAgfVxuICAvKiogQHR5cGUge3t9fSAqL1xuICBfX2ZsYWdzID0ge307XG4gIC8qKlxuICAgKiBDcmVhdGVzIG9iamVjdCBmb3IgY2hhaW5pbmcuXG4gICAqIGBBc3NlcnRpb25gIG9iamVjdHMgY29udGFpbiBtZXRhZGF0YSBpbiB0aGUgZm9ybSBvZiBmbGFncy4gVGhyZWUgZmxhZ3MgY2FuXG4gICAqIGJlIGFzc2lnbmVkIGR1cmluZyBpbnN0YW50aWF0aW9uIGJ5IHBhc3NpbmcgYXJndW1lbnRzIHRvIHRoaXMgY29uc3RydWN0b3I6XG4gICAqXG4gICAqIC0gYG9iamVjdGA6IFRoaXMgZmxhZyBjb250YWlucyB0aGUgdGFyZ2V0IG9mIHRoZSBhc3NlcnRpb24uIEZvciBleGFtcGxlLCBpblxuICAgKiB0aGUgYXNzZXJ0aW9uIGBleHBlY3QobnVtS2l0dGVucykudG8uZXF1YWwoNyk7YCwgdGhlIGBvYmplY3RgIGZsYWcgd2lsbFxuICAgKiBjb250YWluIGBudW1LaXR0ZW5zYCBzbyB0aGF0IHRoZSBgZXF1YWxgIGFzc2VydGlvbiBjYW4gcmVmZXJlbmNlIGl0IHdoZW5cbiAgICogbmVlZGVkLlxuICAgKlxuICAgKiAtIGBtZXNzYWdlYDogVGhpcyBmbGFnIGNvbnRhaW5zIGFuIG9wdGlvbmFsIGN1c3RvbSBlcnJvciBtZXNzYWdlIHRvIGJlXG4gICAqIHByZXBlbmRlZCB0byB0aGUgZXJyb3IgbWVzc2FnZSB0aGF0J3MgZ2VuZXJhdGVkIGJ5IHRoZSBhc3NlcnRpb24gd2hlbiBpdFxuICAgKiBmYWlscy5cbiAgICpcbiAgICogLSBgc3NmaWA6IFRoaXMgZmxhZyBzdGFuZHMgZm9yIFwic3RhcnQgc3RhY2sgZnVuY3Rpb24gaW5kaWNhdG9yXCIuIEl0XG4gICAqIGNvbnRhaW5zIGEgZnVuY3Rpb24gcmVmZXJlbmNlIHRoYXQgc2VydmVzIGFzIHRoZSBzdGFydGluZyBwb2ludCBmb3JcbiAgICogcmVtb3ZpbmcgZnJhbWVzIGZyb20gdGhlIHN0YWNrIHRyYWNlIG9mIHRoZSBlcnJvciB0aGF0J3MgY3JlYXRlZCBieSB0aGVcbiAgICogYXNzZXJ0aW9uIHdoZW4gaXQgZmFpbHMuIFRoZSBnb2FsIGlzIHRvIHByb3ZpZGUgYSBjbGVhbmVyIHN0YWNrIHRyYWNlIHRvXG4gICAqIGVuZCB1c2VycyBieSByZW1vdmluZyBDaGFpJ3MgaW50ZXJuYWwgZnVuY3Rpb25zLiBOb3RlIHRoYXQgaXQgb25seSB3b3Jrc1xuICAgKiBpbiBlbnZpcm9ubWVudHMgdGhhdCBzdXBwb3J0IGBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZWAsIGFuZCBvbmx5IHdoZW5cbiAgICogYENoYWkuY29uZmlnLmluY2x1ZGVTdGFja2AgaGFzbid0IGJlZW4gc2V0IHRvIGBmYWxzZWAuXG4gICAqXG4gICAqIC0gYGxvY2tTc2ZpYDogVGhpcyBmbGFnIGNvbnRyb2xzIHdoZXRoZXIgb3Igbm90IHRoZSBnaXZlbiBgc3NmaWAgZmxhZ1xuICAgKiBzaG91bGQgcmV0YWluIGl0cyBjdXJyZW50IHZhbHVlLCBldmVuIGFzIGFzc2VydGlvbnMgYXJlIGNoYWluZWQgb2ZmIG9mXG4gICAqIHRoaXMgb2JqZWN0LiBUaGlzIGlzIHVzdWFsbHkgc2V0IHRvIGB0cnVlYCB3aGVuIGNyZWF0aW5nIGEgbmV3IGFzc2VydGlvblxuICAgKiBmcm9tIHdpdGhpbiBhbm90aGVyIGFzc2VydGlvbi4gSXQncyBhbHNvIHRlbXBvcmFyaWx5IHNldCB0byBgdHJ1ZWAgYmVmb3JlXG4gICAqIGFuIG92ZXJ3cml0dGVuIGFzc2VydGlvbiBnZXRzIGNhbGxlZCBieSB0aGUgb3ZlcndyaXRpbmcgYXNzZXJ0aW9uLlxuICAgKlxuICAgKiAtIGBlcWxgOiBUaGlzIGZsYWcgY29udGFpbnMgdGhlIGRlZXBFcXVhbCBmdW5jdGlvbiB0byBiZSB1c2VkIGJ5IHRoZSBhc3NlcnRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7dW5rbm93bn0gb2JqIHRhcmdldCBvZiB0aGUgYXNzZXJ0aW9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbbXNnXSAob3B0aW9uYWwpIGN1c3RvbSBlcnJvciBtZXNzYWdlXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtzc2ZpXSAob3B0aW9uYWwpIHN0YXJ0aW5nIHBvaW50IGZvciByZW1vdmluZyBzdGFjayBmcmFtZXNcbiAgICogQHBhcmFtIHtib29sZWFufSBbbG9ja1NzZmldIChvcHRpb25hbCkgd2hldGhlciBvciBub3QgdGhlIHNzZmkgZmxhZyBpcyBsb2NrZWRcbiAgICovXG4gIGNvbnN0cnVjdG9yKG9iaiwgbXNnLCBzc2ZpLCBsb2NrU3NmaSkge1xuICAgIGZsYWcodGhpcywgXCJzc2ZpXCIsIHNzZmkgfHwgX0Fzc2VydGlvbik7XG4gICAgZmxhZyh0aGlzLCBcImxvY2tTc2ZpXCIsIGxvY2tTc2ZpKTtcbiAgICBmbGFnKHRoaXMsIFwib2JqZWN0XCIsIG9iaik7XG4gICAgZmxhZyh0aGlzLCBcIm1lc3NhZ2VcIiwgbXNnKTtcbiAgICBmbGFnKHRoaXMsIFwiZXFsXCIsIGNvbmZpZy5kZWVwRXF1YWwgfHwgZGVlcF9lcWxfZGVmYXVsdCk7XG4gICAgcmV0dXJuIHByb3hpZnkodGhpcyk7XG4gIH1cbiAgLyoqIEByZXR1cm5zIHtib29sZWFufSAqL1xuICBzdGF0aWMgZ2V0IGluY2x1ZGVTdGFjaygpIHtcbiAgICBjb25zb2xlLndhcm4oXG4gICAgICBcIkFzc2VydGlvbi5pbmNsdWRlU3RhY2sgaXMgZGVwcmVjYXRlZCwgdXNlIGNoYWkuY29uZmlnLmluY2x1ZGVTdGFjayBpbnN0ZWFkLlwiXG4gICAgKTtcbiAgICByZXR1cm4gY29uZmlnLmluY2x1ZGVTdGFjaztcbiAgfVxuICAvKiogQHBhcmFtIHtib29sZWFufSB2YWx1ZSAqL1xuICBzdGF0aWMgc2V0IGluY2x1ZGVTdGFjayh2YWx1ZSkge1xuICAgIGNvbnNvbGUud2FybihcbiAgICAgIFwiQXNzZXJ0aW9uLmluY2x1ZGVTdGFjayBpcyBkZXByZWNhdGVkLCB1c2UgY2hhaS5jb25maWcuaW5jbHVkZVN0YWNrIGluc3RlYWQuXCJcbiAgICApO1xuICAgIGNvbmZpZy5pbmNsdWRlU3RhY2sgPSB2YWx1ZTtcbiAgfVxuICAvKiogQHJldHVybnMge2Jvb2xlYW59ICovXG4gIHN0YXRpYyBnZXQgc2hvd0RpZmYoKSB7XG4gICAgY29uc29sZS53YXJuKFxuICAgICAgXCJBc3NlcnRpb24uc2hvd0RpZmYgaXMgZGVwcmVjYXRlZCwgdXNlIGNoYWkuY29uZmlnLnNob3dEaWZmIGluc3RlYWQuXCJcbiAgICApO1xuICAgIHJldHVybiBjb25maWcuc2hvd0RpZmY7XG4gIH1cbiAgLyoqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsdWUgKi9cbiAgc3RhdGljIHNldCBzaG93RGlmZih2YWx1ZSkge1xuICAgIGNvbnNvbGUud2FybihcbiAgICAgIFwiQXNzZXJ0aW9uLnNob3dEaWZmIGlzIGRlcHJlY2F0ZWQsIHVzZSBjaGFpLmNvbmZpZy5zaG93RGlmZiBpbnN0ZWFkLlwiXG4gICAgKTtcbiAgICBjb25maWcuc2hvd0RpZmYgPSB2YWx1ZTtcbiAgfVxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICovXG4gIHN0YXRpYyBhZGRQcm9wZXJ0eShuYW1lLCBmbikge1xuICAgIGFkZFByb3BlcnR5KHRoaXMucHJvdG90eXBlLCBuYW1lLCBmbik7XG4gIH1cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAqL1xuICBzdGF0aWMgYWRkTWV0aG9kKG5hbWUsIGZuKSB7XG4gICAgYWRkTWV0aG9kKHRoaXMucHJvdG90eXBlLCBuYW1lLCBmbik7XG4gIH1cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNoYWluaW5nQmVoYXZpb3JcbiAgICovXG4gIHN0YXRpYyBhZGRDaGFpbmFibGVNZXRob2QobmFtZSwgZm4sIGNoYWluaW5nQmVoYXZpb3IpIHtcbiAgICBhZGRDaGFpbmFibGVNZXRob2QodGhpcy5wcm90b3R5cGUsIG5hbWUsIGZuLCBjaGFpbmluZ0JlaGF2aW9yKTtcbiAgfVxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICovXG4gIHN0YXRpYyBvdmVyd3JpdGVQcm9wZXJ0eShuYW1lLCBmbikge1xuICAgIG92ZXJ3cml0ZVByb3BlcnR5KHRoaXMucHJvdG90eXBlLCBuYW1lLCBmbik7XG4gIH1cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAqL1xuICBzdGF0aWMgb3ZlcndyaXRlTWV0aG9kKG5hbWUsIGZuKSB7XG4gICAgb3ZlcndyaXRlTWV0aG9kKHRoaXMucHJvdG90eXBlLCBuYW1lLCBmbik7XG4gIH1cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGNoYWluaW5nQmVoYXZpb3JcbiAgICovXG4gIHN0YXRpYyBvdmVyd3JpdGVDaGFpbmFibGVNZXRob2QobmFtZSwgZm4sIGNoYWluaW5nQmVoYXZpb3IpIHtcbiAgICBvdmVyd3JpdGVDaGFpbmFibGVNZXRob2QodGhpcy5wcm90b3R5cGUsIG5hbWUsIGZuLCBjaGFpbmluZ0JlaGF2aW9yKTtcbiAgfVxuICAvKipcbiAgICogIyMjIC5hc3NlcnQoZXhwcmVzc2lvbiwgbWVzc2FnZSwgbmVnYXRlTWVzc2FnZSwgZXhwZWN0ZWQsIGFjdHVhbCwgc2hvd0RpZmYpXG4gICAqXG4gICAqIEV4ZWN1dGVzIGFuIGV4cHJlc3Npb24gYW5kIGNoZWNrIGV4cGVjdGF0aW9ucy4gVGhyb3dzIEFzc2VydGlvbkVycm9yIGZvciByZXBvcnRpbmcgaWYgdGVzdCBkb2Vzbid0IHBhc3MuXG4gICAqXG4gICAqIEBuYW1lIGFzc2VydFxuICAgKiBAcGFyYW0ge3Vua25vd259IF9leHByIHRvIGJlIHRlc3RlZFxuICAgKiBAcGFyYW0ge3N0cmluZyB8IEZ1bmN0aW9ufSBtc2cgb3IgZnVuY3Rpb24gdGhhdCByZXR1cm5zIG1lc3NhZ2UgdG8gZGlzcGxheSBpZiBleHByZXNzaW9uIGZhaWxzXG4gICAqIEBwYXJhbSB7c3RyaW5nIHwgRnVuY3Rpb259IF9uZWdhdGVNc2cgb3IgZnVuY3Rpb24gdGhhdCByZXR1cm5zIG5lZ2F0ZWRNZXNzYWdlIHRvIGRpc3BsYXkgaWYgbmVnYXRlZCBleHByZXNzaW9uIGZhaWxzXG4gICAqIEBwYXJhbSB7dW5rbm93bn0gZXhwZWN0ZWQgdmFsdWUgKHJlbWVtYmVyIHRvIGNoZWNrIGZvciBuZWdhdGlvbilcbiAgICogQHBhcmFtIHt1bmtub3dufSBfYWN0dWFsIChvcHRpb25hbCkgd2lsbCBkZWZhdWx0IHRvIGB0aGlzLm9iamBcbiAgICogQHBhcmFtIHtib29sZWFufSBzaG93RGlmZiAob3B0aW9uYWwpIHdoZW4gc2V0IHRvIGB0cnVlYCwgYXNzZXJ0IHdpbGwgZGlzcGxheSBhIGRpZmYgaW4gYWRkaXRpb24gdG8gdGhlIG1lc3NhZ2UgaWYgZXhwcmVzc2lvbiBmYWlsc1xuICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICovXG4gIGFzc2VydChfZXhwciwgbXNnLCBfbmVnYXRlTXNnLCBleHBlY3RlZCwgX2FjdHVhbCwgc2hvd0RpZmYpIHtcbiAgICBjb25zdCBvayA9IHRlc3QodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoZmFsc2UgIT09IHNob3dEaWZmKSBzaG93RGlmZiA9IHRydWU7XG4gICAgaWYgKHZvaWQgMCA9PT0gZXhwZWN0ZWQgJiYgdm9pZCAwID09PSBfYWN0dWFsKSBzaG93RGlmZiA9IGZhbHNlO1xuICAgIGlmICh0cnVlICE9PSBjb25maWcuc2hvd0RpZmYpIHNob3dEaWZmID0gZmFsc2U7XG4gICAgaWYgKCFvaykge1xuICAgICAgbXNnID0gZ2V0TWVzc2FnZTIodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIGNvbnN0IGFjdHVhbCA9IGdldEFjdHVhbCh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgY29uc3QgYXNzZXJ0aW9uRXJyb3JPYmplY3RQcm9wZXJ0aWVzID0ge1xuICAgICAgICBhY3R1YWwsXG4gICAgICAgIGV4cGVjdGVkLFxuICAgICAgICBzaG93RGlmZlxuICAgICAgfTtcbiAgICAgIGNvbnN0IG9wZXJhdG9yID0gZ2V0T3BlcmF0b3IodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIGlmIChvcGVyYXRvcikge1xuICAgICAgICBhc3NlcnRpb25FcnJvck9iamVjdFByb3BlcnRpZXMub3BlcmF0b3IgPSBvcGVyYXRvcjtcbiAgICAgIH1cbiAgICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihcbiAgICAgICAgbXNnLFxuICAgICAgICBhc3NlcnRpb25FcnJvck9iamVjdFByb3BlcnRpZXMsXG4gICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgTm90IHN1cmUgd2hhdCB0byBkbyBhYm91dCB0aGVzZSB0eXBlcyB5ZXRcbiAgICAgICAgY29uZmlnLmluY2x1ZGVTdGFjayA/IHRoaXMuYXNzZXJ0IDogZmxhZyh0aGlzLCBcInNzZmlcIilcbiAgICAgICk7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBRdWljayByZWZlcmVuY2UgdG8gc3RvcmVkIGBhY3R1YWxgIHZhbHVlIGZvciBwbHVnaW4gZGV2ZWxvcGVycy5cbiAgICpcbiAgICogQHJldHVybnMge3Vua25vd259XG4gICAqL1xuICBnZXQgX29iaigpIHtcbiAgICByZXR1cm4gZmxhZyh0aGlzLCBcIm9iamVjdFwiKTtcbiAgfVxuICAvKipcbiAgICogUXVpY2sgcmVmZXJlbmNlIHRvIHN0b3JlZCBgYWN0dWFsYCB2YWx1ZSBmb3IgcGx1Z2luIGRldmVsb3BlcnMuXG4gICAqXG4gICAqIEBwYXJhbSB7dW5rbm93bn0gdmFsXG4gICAqL1xuICBzZXQgX29iaih2YWwpIHtcbiAgICBmbGFnKHRoaXMsIFwib2JqZWN0XCIsIHZhbCk7XG4gIH1cbn07XG5cbi8vIGxpYi9jaGFpL3V0aWxzL2lzUHJveHlFbmFibGVkLmpzXG5mdW5jdGlvbiBpc1Byb3h5RW5hYmxlZCgpIHtcbiAgcmV0dXJuIGNvbmZpZy51c2VQcm94eSAmJiB0eXBlb2YgUHJveHkgIT09IFwidW5kZWZpbmVkXCIgJiYgdHlwZW9mIFJlZmxlY3QgIT09IFwidW5kZWZpbmVkXCI7XG59XG5fX25hbWUoaXNQcm94eUVuYWJsZWQsIFwiaXNQcm94eUVuYWJsZWRcIik7XG5cbi8vIGxpYi9jaGFpL3V0aWxzL2FkZFByb3BlcnR5LmpzXG5mdW5jdGlvbiBhZGRQcm9wZXJ0eShjdHgsIG5hbWUsIGdldHRlcikge1xuICBnZXR0ZXIgPSBnZXR0ZXIgPT09IHZvaWQgMCA/IGZ1bmN0aW9uKCkge1xuICB9IDogZ2V0dGVyO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3R4LCBuYW1lLCB7XG4gICAgZ2V0OiAvKiBAX19QVVJFX18gKi8gX19uYW1lKGZ1bmN0aW9uIHByb3BlcnR5R2V0dGVyKCkge1xuICAgICAgaWYgKCFpc1Byb3h5RW5hYmxlZCgpICYmICFmbGFnKHRoaXMsIFwibG9ja1NzZmlcIikpIHtcbiAgICAgICAgZmxhZyh0aGlzLCBcInNzZmlcIiwgcHJvcGVydHlHZXR0ZXIpO1xuICAgICAgfVxuICAgICAgbGV0IHJlc3VsdCA9IGdldHRlci5jYWxsKHRoaXMpO1xuICAgICAgaWYgKHJlc3VsdCAhPT0gdm9pZCAwKSByZXR1cm4gcmVzdWx0O1xuICAgICAgbGV0IG5ld0Fzc2VydGlvbiA9IG5ldyBBc3NlcnRpb24oKTtcbiAgICAgIHRyYW5zZmVyRmxhZ3ModGhpcywgbmV3QXNzZXJ0aW9uKTtcbiAgICAgIHJldHVybiBuZXdBc3NlcnRpb247XG4gICAgfSwgXCJwcm9wZXJ0eUdldHRlclwiKSxcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSk7XG59XG5fX25hbWUoYWRkUHJvcGVydHksIFwiYWRkUHJvcGVydHlcIik7XG5cbi8vIGxpYi9jaGFpL3V0aWxzL2FkZExlbmd0aEd1YXJkLmpzXG52YXIgZm5MZW5ndGhEZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihmdW5jdGlvbigpIHtcbn0sIFwibGVuZ3RoXCIpO1xuZnVuY3Rpb24gYWRkTGVuZ3RoR3VhcmQoZm4sIGFzc2VydGlvbk5hbWUsIGlzQ2hhaW5hYmxlKSB7XG4gIGlmICghZm5MZW5ndGhEZXNjLmNvbmZpZ3VyYWJsZSkgcmV0dXJuIGZuO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIFwibGVuZ3RoXCIsIHtcbiAgICBnZXQ6IC8qIEBfX1BVUkVfXyAqLyBfX25hbWUoZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoaXNDaGFpbmFibGUpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgXCJJbnZhbGlkIENoYWkgcHJvcGVydHk6IFwiICsgYXNzZXJ0aW9uTmFtZSArICcubGVuZ3RoLiBEdWUgdG8gYSBjb21wYXRpYmlsaXR5IGlzc3VlLCBcImxlbmd0aFwiIGNhbm5vdCBkaXJlY3RseSBmb2xsb3cgXCInICsgYXNzZXJ0aW9uTmFtZSArICdcIi4gVXNlIFwiJyArIGFzc2VydGlvbk5hbWUgKyAnLmxlbmd0aE9mXCIgaW5zdGVhZC4nXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgXCJJbnZhbGlkIENoYWkgcHJvcGVydHk6IFwiICsgYXNzZXJ0aW9uTmFtZSArICcubGVuZ3RoLiBTZWUgZG9jcyBmb3IgcHJvcGVyIHVzYWdlIG9mIFwiJyArIGFzc2VydGlvbk5hbWUgKyAnXCIuJ1xuICAgICAgKTtcbiAgICB9LCBcImdldFwiKVxuICB9KTtcbiAgcmV0dXJuIGZuO1xufVxuX19uYW1lKGFkZExlbmd0aEd1YXJkLCBcImFkZExlbmd0aEd1YXJkXCIpO1xuXG4vLyBsaWIvY2hhaS91dGlscy9nZXRQcm9wZXJ0aWVzLmpzXG5mdW5jdGlvbiBnZXRQcm9wZXJ0aWVzKG9iamVjdCkge1xuICBsZXQgcmVzdWx0ID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqZWN0KTtcbiAgZnVuY3Rpb24gYWRkUHJvcGVydHkyKHByb3BlcnR5KSB7XG4gICAgaWYgKHJlc3VsdC5pbmRleE9mKHByb3BlcnR5KSA9PT0gLTEpIHtcbiAgICAgIHJlc3VsdC5wdXNoKHByb3BlcnR5KTtcbiAgICB9XG4gIH1cbiAgX19uYW1lKGFkZFByb3BlcnR5MiwgXCJhZGRQcm9wZXJ0eVwiKTtcbiAgbGV0IHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7XG4gIHdoaWxlIChwcm90byAhPT0gbnVsbCkge1xuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHByb3RvKS5mb3JFYWNoKGFkZFByb3BlcnR5Mik7XG4gICAgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YocHJvdG8pO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5fX25hbWUoZ2V0UHJvcGVydGllcywgXCJnZXRQcm9wZXJ0aWVzXCIpO1xuXG4vLyBsaWIvY2hhaS91dGlscy9wcm94aWZ5LmpzXG52YXIgYnVpbHRpbnMgPSBbXCJfX2ZsYWdzXCIsIFwiX19tZXRob2RzXCIsIFwiX29ialwiLCBcImFzc2VydFwiXTtcbmZ1bmN0aW9uIHByb3hpZnkob2JqLCBub25DaGFpbmFibGVNZXRob2ROYW1lKSB7XG4gIGlmICghaXNQcm94eUVuYWJsZWQoKSkgcmV0dXJuIG9iajtcbiAgcmV0dXJuIG5ldyBQcm94eShvYmosIHtcbiAgICBnZXQ6IC8qIEBfX1BVUkVfXyAqLyBfX25hbWUoZnVuY3Rpb24gcHJveHlHZXR0ZXIodGFyZ2V0LCBwcm9wZXJ0eSkge1xuICAgICAgaWYgKHR5cGVvZiBwcm9wZXJ0eSA9PT0gXCJzdHJpbmdcIiAmJiBjb25maWcucHJveHlFeGNsdWRlZEtleXMuaW5kZXhPZihwcm9wZXJ0eSkgPT09IC0xICYmICFSZWZsZWN0Lmhhcyh0YXJnZXQsIHByb3BlcnR5KSkge1xuICAgICAgICBpZiAobm9uQ2hhaW5hYmxlTWV0aG9kTmFtZSkge1xuICAgICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgICAgXCJJbnZhbGlkIENoYWkgcHJvcGVydHk6IFwiICsgbm9uQ2hhaW5hYmxlTWV0aG9kTmFtZSArIFwiLlwiICsgcHJvcGVydHkgKyAnLiBTZWUgZG9jcyBmb3IgcHJvcGVyIHVzYWdlIG9mIFwiJyArIG5vbkNoYWluYWJsZU1ldGhvZE5hbWUgKyAnXCIuJ1xuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHN1Z2dlc3Rpb24gPSBudWxsO1xuICAgICAgICBsZXQgc3VnZ2VzdGlvbkRpc3RhbmNlID0gNDtcbiAgICAgICAgZ2V0UHJvcGVydGllcyh0YXJnZXQpLmZvckVhY2goZnVuY3Rpb24ocHJvcCkge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIC8vIHdlIGFjdHVhbGx5IG1lYW4gdG8gY2hlY2sgYE9iamVjdC5wcm90b3R5cGVgIGhlcmVcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbiAgICAgICAgICAgICFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5KHByb3ApICYmIGJ1aWx0aW5zLmluZGV4T2YocHJvcCkgPT09IC0xXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBsZXQgZGlzdCA9IHN0cmluZ0Rpc3RhbmNlQ2FwcGVkKHByb3BlcnR5LCBwcm9wLCBzdWdnZXN0aW9uRGlzdGFuY2UpO1xuICAgICAgICAgICAgaWYgKGRpc3QgPCBzdWdnZXN0aW9uRGlzdGFuY2UpIHtcbiAgICAgICAgICAgICAgc3VnZ2VzdGlvbiA9IHByb3A7XG4gICAgICAgICAgICAgIHN1Z2dlc3Rpb25EaXN0YW5jZSA9IGRpc3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHN1Z2dlc3Rpb24gIT09IG51bGwpIHtcbiAgICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICAgIFwiSW52YWxpZCBDaGFpIHByb3BlcnR5OiBcIiArIHByb3BlcnR5ICsgJy4gRGlkIHlvdSBtZWFuIFwiJyArIHN1Z2dlc3Rpb24gKyAnXCI/J1xuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoXCJJbnZhbGlkIENoYWkgcHJvcGVydHk6IFwiICsgcHJvcGVydHkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoYnVpbHRpbnMuaW5kZXhPZihwcm9wZXJ0eSkgPT09IC0xICYmICFmbGFnKHRhcmdldCwgXCJsb2NrU3NmaVwiKSkge1xuICAgICAgICBmbGFnKHRhcmdldCwgXCJzc2ZpXCIsIHByb3h5R2V0dGVyKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBSZWZsZWN0LmdldCh0YXJnZXQsIHByb3BlcnR5KTtcbiAgICB9LCBcInByb3h5R2V0dGVyXCIpXG4gIH0pO1xufVxuX19uYW1lKHByb3hpZnksIFwicHJveGlmeVwiKTtcbmZ1bmN0aW9uIHN0cmluZ0Rpc3RhbmNlQ2FwcGVkKHN0ckEsIHN0ckIsIGNhcCkge1xuICBpZiAoTWF0aC5hYnMoc3RyQS5sZW5ndGggLSBzdHJCLmxlbmd0aCkgPj0gY2FwKSB7XG4gICAgcmV0dXJuIGNhcDtcbiAgfVxuICBsZXQgbWVtbyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8PSBzdHJBLmxlbmd0aDsgaSsrKSB7XG4gICAgbWVtb1tpXSA9IEFycmF5KHN0ckIubGVuZ3RoICsgMSkuZmlsbCgwKTtcbiAgICBtZW1vW2ldWzBdID0gaTtcbiAgfVxuICBmb3IgKGxldCBqID0gMDsgaiA8IHN0ckIubGVuZ3RoOyBqKyspIHtcbiAgICBtZW1vWzBdW2pdID0gajtcbiAgfVxuICBmb3IgKGxldCBpID0gMTsgaSA8PSBzdHJBLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IGNoID0gc3RyQS5jaGFyQ29kZUF0KGkgLSAxKTtcbiAgICBmb3IgKGxldCBqID0gMTsgaiA8PSBzdHJCLmxlbmd0aDsgaisrKSB7XG4gICAgICBpZiAoTWF0aC5hYnMoaSAtIGopID49IGNhcCkge1xuICAgICAgICBtZW1vW2ldW2pdID0gY2FwO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIG1lbW9baV1bal0gPSBNYXRoLm1pbihcbiAgICAgICAgbWVtb1tpIC0gMV1bal0gKyAxLFxuICAgICAgICBtZW1vW2ldW2ogLSAxXSArIDEsXG4gICAgICAgIG1lbW9baSAtIDFdW2ogLSAxXSArIChjaCA9PT0gc3RyQi5jaGFyQ29kZUF0KGogLSAxKSA/IDAgOiAxKVxuICAgICAgKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG1lbW9bc3RyQS5sZW5ndGhdW3N0ckIubGVuZ3RoXTtcbn1cbl9fbmFtZShzdHJpbmdEaXN0YW5jZUNhcHBlZCwgXCJzdHJpbmdEaXN0YW5jZUNhcHBlZFwiKTtcblxuLy8gbGliL2NoYWkvdXRpbHMvYWRkTWV0aG9kLmpzXG5mdW5jdGlvbiBhZGRNZXRob2QoY3R4LCBuYW1lLCBtZXRob2QpIHtcbiAgbGV0IG1ldGhvZFdyYXBwZXIgPSAvKiBAX19QVVJFX18gKi8gX19uYW1lKGZ1bmN0aW9uKCkge1xuICAgIGlmICghZmxhZyh0aGlzLCBcImxvY2tTc2ZpXCIpKSB7XG4gICAgICBmbGFnKHRoaXMsIFwic3NmaVwiLCBtZXRob2RXcmFwcGVyKTtcbiAgICB9XG4gICAgbGV0IHJlc3VsdCA9IG1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmIChyZXN1bHQgIT09IHZvaWQgMCkgcmV0dXJuIHJlc3VsdDtcbiAgICBsZXQgbmV3QXNzZXJ0aW9uID0gbmV3IEFzc2VydGlvbigpO1xuICAgIHRyYW5zZmVyRmxhZ3ModGhpcywgbmV3QXNzZXJ0aW9uKTtcbiAgICByZXR1cm4gbmV3QXNzZXJ0aW9uO1xuICB9LCBcIm1ldGhvZFdyYXBwZXJcIik7XG4gIGFkZExlbmd0aEd1YXJkKG1ldGhvZFdyYXBwZXIsIG5hbWUsIGZhbHNlKTtcbiAgY3R4W25hbWVdID0gcHJveGlmeShtZXRob2RXcmFwcGVyLCBuYW1lKTtcbn1cbl9fbmFtZShhZGRNZXRob2QsIFwiYWRkTWV0aG9kXCIpO1xuXG4vLyBsaWIvY2hhaS91dGlscy9vdmVyd3JpdGVQcm9wZXJ0eS5qc1xuZnVuY3Rpb24gb3ZlcndyaXRlUHJvcGVydHkoY3R4LCBuYW1lLCBnZXR0ZXIpIHtcbiAgbGV0IF9nZXQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGN0eCwgbmFtZSksIF9zdXBlciA9IC8qIEBfX1BVUkVfXyAqLyBfX25hbWUoZnVuY3Rpb24oKSB7XG4gIH0sIFwiX3N1cGVyXCIpO1xuICBpZiAoX2dldCAmJiBcImZ1bmN0aW9uXCIgPT09IHR5cGVvZiBfZ2V0LmdldCkgX3N1cGVyID0gX2dldC5nZXQ7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdHgsIG5hbWUsIHtcbiAgICBnZXQ6IC8qIEBfX1BVUkVfXyAqLyBfX25hbWUoZnVuY3Rpb24gb3ZlcndyaXRpbmdQcm9wZXJ0eUdldHRlcigpIHtcbiAgICAgIGlmICghaXNQcm94eUVuYWJsZWQoKSAmJiAhZmxhZyh0aGlzLCBcImxvY2tTc2ZpXCIpKSB7XG4gICAgICAgIGZsYWcodGhpcywgXCJzc2ZpXCIsIG92ZXJ3cml0aW5nUHJvcGVydHlHZXR0ZXIpO1xuICAgICAgfVxuICAgICAgbGV0IG9yaWdMb2NrU3NmaSA9IGZsYWcodGhpcywgXCJsb2NrU3NmaVwiKTtcbiAgICAgIGZsYWcodGhpcywgXCJsb2NrU3NmaVwiLCB0cnVlKTtcbiAgICAgIGxldCByZXN1bHQgPSBnZXR0ZXIoX3N1cGVyKS5jYWxsKHRoaXMpO1xuICAgICAgZmxhZyh0aGlzLCBcImxvY2tTc2ZpXCIsIG9yaWdMb2NrU3NmaSk7XG4gICAgICBpZiAocmVzdWx0ICE9PSB2b2lkIDApIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICAgIGxldCBuZXdBc3NlcnRpb24gPSBuZXcgQXNzZXJ0aW9uKCk7XG4gICAgICB0cmFuc2ZlckZsYWdzKHRoaXMsIG5ld0Fzc2VydGlvbik7XG4gICAgICByZXR1cm4gbmV3QXNzZXJ0aW9uO1xuICAgIH0sIFwib3ZlcndyaXRpbmdQcm9wZXJ0eUdldHRlclwiKSxcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSk7XG59XG5fX25hbWUob3ZlcndyaXRlUHJvcGVydHksIFwib3ZlcndyaXRlUHJvcGVydHlcIik7XG5cbi8vIGxpYi9jaGFpL3V0aWxzL292ZXJ3cml0ZU1ldGhvZC5qc1xuZnVuY3Rpb24gb3ZlcndyaXRlTWV0aG9kKGN0eCwgbmFtZSwgbWV0aG9kKSB7XG4gIGxldCBfbWV0aG9kID0gY3R4W25hbWVdLCBfc3VwZXIgPSAvKiBAX19QVVJFX18gKi8gX19uYW1lKGZ1bmN0aW9uKCkge1xuICAgIHRocm93IG5ldyBFcnJvcihuYW1lICsgXCIgaXMgbm90IGEgZnVuY3Rpb25cIik7XG4gIH0sIFwiX3N1cGVyXCIpO1xuICBpZiAoX21ldGhvZCAmJiBcImZ1bmN0aW9uXCIgPT09IHR5cGVvZiBfbWV0aG9kKSBfc3VwZXIgPSBfbWV0aG9kO1xuICBsZXQgb3ZlcndyaXRpbmdNZXRob2RXcmFwcGVyID0gLyogQF9fUFVSRV9fICovIF9fbmFtZShmdW5jdGlvbigpIHtcbiAgICBpZiAoIWZsYWcodGhpcywgXCJsb2NrU3NmaVwiKSkge1xuICAgICAgZmxhZyh0aGlzLCBcInNzZmlcIiwgb3ZlcndyaXRpbmdNZXRob2RXcmFwcGVyKTtcbiAgICB9XG4gICAgbGV0IG9yaWdMb2NrU3NmaSA9IGZsYWcodGhpcywgXCJsb2NrU3NmaVwiKTtcbiAgICBmbGFnKHRoaXMsIFwibG9ja1NzZmlcIiwgdHJ1ZSk7XG4gICAgbGV0IHJlc3VsdCA9IG1ldGhvZChfc3VwZXIpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgZmxhZyh0aGlzLCBcImxvY2tTc2ZpXCIsIG9yaWdMb2NrU3NmaSk7XG4gICAgaWYgKHJlc3VsdCAhPT0gdm9pZCAwKSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBsZXQgbmV3QXNzZXJ0aW9uID0gbmV3IEFzc2VydGlvbigpO1xuICAgIHRyYW5zZmVyRmxhZ3ModGhpcywgbmV3QXNzZXJ0aW9uKTtcbiAgICByZXR1cm4gbmV3QXNzZXJ0aW9uO1xuICB9LCBcIm92ZXJ3cml0aW5nTWV0aG9kV3JhcHBlclwiKTtcbiAgYWRkTGVuZ3RoR3VhcmQob3ZlcndyaXRpbmdNZXRob2RXcmFwcGVyLCBuYW1lLCBmYWxzZSk7XG4gIGN0eFtuYW1lXSA9IHByb3hpZnkob3ZlcndyaXRpbmdNZXRob2RXcmFwcGVyLCBuYW1lKTtcbn1cbl9fbmFtZShvdmVyd3JpdGVNZXRob2QsIFwib3ZlcndyaXRlTWV0aG9kXCIpO1xuXG4vLyBsaWIvY2hhaS91dGlscy9hZGRDaGFpbmFibGVNZXRob2QuanNcbnZhciBjYW5TZXRQcm90b3R5cGUgPSB0eXBlb2YgT2JqZWN0LnNldFByb3RvdHlwZU9mID09PSBcImZ1bmN0aW9uXCI7XG52YXIgdGVzdEZuID0gLyogQF9fUFVSRV9fICovIF9fbmFtZShmdW5jdGlvbigpIHtcbn0sIFwidGVzdEZuXCIpO1xudmFyIGV4Y2x1ZGVOYW1lcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3RGbikuZmlsdGVyKGZ1bmN0aW9uKG5hbWUpIHtcbiAgbGV0IHByb3BEZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0ZXN0Rm4sIG5hbWUpO1xuICBpZiAodHlwZW9mIHByb3BEZXNjICE9PSBcIm9iamVjdFwiKSByZXR1cm4gdHJ1ZTtcbiAgcmV0dXJuICFwcm9wRGVzYy5jb25maWd1cmFibGU7XG59KTtcbnZhciBjYWxsID0gRnVuY3Rpb24ucHJvdG90eXBlLmNhbGw7XG52YXIgYXBwbHkgPSBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHk7XG5mdW5jdGlvbiBhZGRDaGFpbmFibGVNZXRob2QoY3R4LCBuYW1lLCBtZXRob2QsIGNoYWluaW5nQmVoYXZpb3IpIHtcbiAgaWYgKHR5cGVvZiBjaGFpbmluZ0JlaGF2aW9yICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBjaGFpbmluZ0JlaGF2aW9yID0gLyogQF9fUFVSRV9fICovIF9fbmFtZShmdW5jdGlvbigpIHtcbiAgICB9LCBcImNoYWluaW5nQmVoYXZpb3JcIik7XG4gIH1cbiAgbGV0IGNoYWluYWJsZUJlaGF2aW9yID0ge1xuICAgIG1ldGhvZCxcbiAgICBjaGFpbmluZ0JlaGF2aW9yXG4gIH07XG4gIGlmICghY3R4Ll9fbWV0aG9kcykge1xuICAgIGN0eC5fX21ldGhvZHMgPSB7fTtcbiAgfVxuICBjdHguX19tZXRob2RzW25hbWVdID0gY2hhaW5hYmxlQmVoYXZpb3I7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdHgsIG5hbWUsIHtcbiAgICBnZXQ6IC8qIEBfX1BVUkVfXyAqLyBfX25hbWUoZnVuY3Rpb24gY2hhaW5hYmxlTWV0aG9kR2V0dGVyKCkge1xuICAgICAgY2hhaW5hYmxlQmVoYXZpb3IuY2hhaW5pbmdCZWhhdmlvci5jYWxsKHRoaXMpO1xuICAgICAgbGV0IGNoYWluYWJsZU1ldGhvZFdyYXBwZXIgPSAvKiBAX19QVVJFX18gKi8gX19uYW1lKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIWZsYWcodGhpcywgXCJsb2NrU3NmaVwiKSkge1xuICAgICAgICAgIGZsYWcodGhpcywgXCJzc2ZpXCIsIGNoYWluYWJsZU1ldGhvZFdyYXBwZXIpO1xuICAgICAgICB9XG4gICAgICAgIGxldCByZXN1bHQgPSBjaGFpbmFibGVCZWhhdmlvci5tZXRob2QuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgaWYgKHJlc3VsdCAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbmV3QXNzZXJ0aW9uID0gbmV3IEFzc2VydGlvbigpO1xuICAgICAgICB0cmFuc2ZlckZsYWdzKHRoaXMsIG5ld0Fzc2VydGlvbik7XG4gICAgICAgIHJldHVybiBuZXdBc3NlcnRpb247XG4gICAgICB9LCBcImNoYWluYWJsZU1ldGhvZFdyYXBwZXJcIik7XG4gICAgICBhZGRMZW5ndGhHdWFyZChjaGFpbmFibGVNZXRob2RXcmFwcGVyLCBuYW1lLCB0cnVlKTtcbiAgICAgIGlmIChjYW5TZXRQcm90b3R5cGUpIHtcbiAgICAgICAgbGV0IHByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUodGhpcyk7XG4gICAgICAgIHByb3RvdHlwZS5jYWxsID0gY2FsbDtcbiAgICAgICAgcHJvdG90eXBlLmFwcGx5ID0gYXBwbHk7XG4gICAgICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihjaGFpbmFibGVNZXRob2RXcmFwcGVyLCBwcm90b3R5cGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGFzc2VydGVyTmFtZXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhjdHgpO1xuICAgICAgICBhc3NlcnRlck5hbWVzLmZvckVhY2goZnVuY3Rpb24oYXNzZXJ0ZXJOYW1lKSB7XG4gICAgICAgICAgaWYgKGV4Y2x1ZGVOYW1lcy5pbmRleE9mKGFzc2VydGVyTmFtZSkgIT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGxldCBwZCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY3R4LCBhc3NlcnRlck5hbWUpO1xuICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjaGFpbmFibGVNZXRob2RXcmFwcGVyLCBhc3NlcnRlck5hbWUsIHBkKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICB0cmFuc2ZlckZsYWdzKHRoaXMsIGNoYWluYWJsZU1ldGhvZFdyYXBwZXIpO1xuICAgICAgcmV0dXJuIHByb3hpZnkoY2hhaW5hYmxlTWV0aG9kV3JhcHBlcik7XG4gICAgfSwgXCJjaGFpbmFibGVNZXRob2RHZXR0ZXJcIiksXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xufVxuX19uYW1lKGFkZENoYWluYWJsZU1ldGhvZCwgXCJhZGRDaGFpbmFibGVNZXRob2RcIik7XG5cbi8vIGxpYi9jaGFpL3V0aWxzL292ZXJ3cml0ZUNoYWluYWJsZU1ldGhvZC5qc1xuZnVuY3Rpb24gb3ZlcndyaXRlQ2hhaW5hYmxlTWV0aG9kKGN0eCwgbmFtZSwgbWV0aG9kLCBjaGFpbmluZ0JlaGF2aW9yKSB7XG4gIGxldCBjaGFpbmFibGVCZWhhdmlvciA9IGN0eC5fX21ldGhvZHNbbmFtZV07XG4gIGxldCBfY2hhaW5pbmdCZWhhdmlvciA9IGNoYWluYWJsZUJlaGF2aW9yLmNoYWluaW5nQmVoYXZpb3I7XG4gIGNoYWluYWJsZUJlaGF2aW9yLmNoYWluaW5nQmVoYXZpb3IgPSAvKiBAX19QVVJFX18gKi8gX19uYW1lKGZ1bmN0aW9uIG92ZXJ3cml0aW5nQ2hhaW5hYmxlTWV0aG9kR2V0dGVyKCkge1xuICAgIGxldCByZXN1bHQgPSBjaGFpbmluZ0JlaGF2aW9yKF9jaGFpbmluZ0JlaGF2aW9yKS5jYWxsKHRoaXMpO1xuICAgIGlmIChyZXN1bHQgIT09IHZvaWQgMCkge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgbGV0IG5ld0Fzc2VydGlvbiA9IG5ldyBBc3NlcnRpb24oKTtcbiAgICB0cmFuc2ZlckZsYWdzKHRoaXMsIG5ld0Fzc2VydGlvbik7XG4gICAgcmV0dXJuIG5ld0Fzc2VydGlvbjtcbiAgfSwgXCJvdmVyd3JpdGluZ0NoYWluYWJsZU1ldGhvZEdldHRlclwiKTtcbiAgbGV0IF9tZXRob2QgPSBjaGFpbmFibGVCZWhhdmlvci5tZXRob2Q7XG4gIGNoYWluYWJsZUJlaGF2aW9yLm1ldGhvZCA9IC8qIEBfX1BVUkVfXyAqLyBfX25hbWUoZnVuY3Rpb24gb3ZlcndyaXRpbmdDaGFpbmFibGVNZXRob2RXcmFwcGVyKCkge1xuICAgIGxldCByZXN1bHQgPSBtZXRob2QoX21ldGhvZCkuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAocmVzdWx0ICE9PSB2b2lkIDApIHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGxldCBuZXdBc3NlcnRpb24gPSBuZXcgQXNzZXJ0aW9uKCk7XG4gICAgdHJhbnNmZXJGbGFncyh0aGlzLCBuZXdBc3NlcnRpb24pO1xuICAgIHJldHVybiBuZXdBc3NlcnRpb247XG4gIH0sIFwib3ZlcndyaXRpbmdDaGFpbmFibGVNZXRob2RXcmFwcGVyXCIpO1xufVxuX19uYW1lKG92ZXJ3cml0ZUNoYWluYWJsZU1ldGhvZCwgXCJvdmVyd3JpdGVDaGFpbmFibGVNZXRob2RcIik7XG5cbi8vIGxpYi9jaGFpL3V0aWxzL2NvbXBhcmVCeUluc3BlY3QuanNcbmZ1bmN0aW9uIGNvbXBhcmVCeUluc3BlY3QoYSwgYikge1xuICByZXR1cm4gaW5zcGVjdDIoYSkgPCBpbnNwZWN0MihiKSA/IC0xIDogMTtcbn1cbl9fbmFtZShjb21wYXJlQnlJbnNwZWN0LCBcImNvbXBhcmVCeUluc3BlY3RcIik7XG5cbi8vIGxpYi9jaGFpL3V0aWxzL2dldE93bkVudW1lcmFibGVQcm9wZXJ0eVN5bWJvbHMuanNcbmZ1bmN0aW9uIGdldE93bkVudW1lcmFibGVQcm9wZXJ0eVN5bWJvbHMob2JqKSB7XG4gIGlmICh0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyAhPT0gXCJmdW5jdGlvblwiKSByZXR1cm4gW107XG4gIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iaikuZmlsdGVyKGZ1bmN0aW9uKHN5bSkge1xuICAgIHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwgc3ltKS5lbnVtZXJhYmxlO1xuICB9KTtcbn1cbl9fbmFtZShnZXRPd25FbnVtZXJhYmxlUHJvcGVydHlTeW1ib2xzLCBcImdldE93bkVudW1lcmFibGVQcm9wZXJ0eVN5bWJvbHNcIik7XG5cbi8vIGxpYi9jaGFpL3V0aWxzL2dldE93bkVudW1lcmFibGVQcm9wZXJ0aWVzLmpzXG5mdW5jdGlvbiBnZXRPd25FbnVtZXJhYmxlUHJvcGVydGllcyhvYmopIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikuY29uY2F0KGdldE93bkVudW1lcmFibGVQcm9wZXJ0eVN5bWJvbHMob2JqKSk7XG59XG5fX25hbWUoZ2V0T3duRW51bWVyYWJsZVByb3BlcnRpZXMsIFwiZ2V0T3duRW51bWVyYWJsZVByb3BlcnRpZXNcIik7XG5cbi8vIGxpYi9jaGFpL3V0aWxzL2lzTmFOLmpzXG52YXIgaXNOYU4yID0gTnVtYmVyLmlzTmFOO1xuXG4vLyBsaWIvY2hhaS91dGlscy9nZXRPcGVyYXRvci5qc1xuZnVuY3Rpb24gaXNPYmplY3RUeXBlKG9iaikge1xuICBsZXQgb2JqZWN0VHlwZSA9IHR5cGUob2JqKTtcbiAgbGV0IG9iamVjdFR5cGVzID0gW1wiQXJyYXlcIiwgXCJPYmplY3RcIiwgXCJGdW5jdGlvblwiXTtcbiAgcmV0dXJuIG9iamVjdFR5cGVzLmluZGV4T2Yob2JqZWN0VHlwZSkgIT09IC0xO1xufVxuX19uYW1lKGlzT2JqZWN0VHlwZSwgXCJpc09iamVjdFR5cGVcIik7XG5mdW5jdGlvbiBnZXRPcGVyYXRvcihvYmosIGFyZ3MpIHtcbiAgbGV0IG9wZXJhdG9yID0gZmxhZyhvYmosIFwib3BlcmF0b3JcIik7XG4gIGxldCBuZWdhdGUgPSBmbGFnKG9iaiwgXCJuZWdhdGVcIik7XG4gIGxldCBleHBlY3RlZCA9IGFyZ3NbM107XG4gIGxldCBtc2cgPSBuZWdhdGUgPyBhcmdzWzJdIDogYXJnc1sxXTtcbiAgaWYgKG9wZXJhdG9yKSB7XG4gICAgcmV0dXJuIG9wZXJhdG9yO1xuICB9XG4gIGlmICh0eXBlb2YgbXNnID09PSBcImZ1bmN0aW9uXCIpIG1zZyA9IG1zZygpO1xuICBtc2cgPSBtc2cgfHwgXCJcIjtcbiAgaWYgKCFtc2cpIHtcbiAgICByZXR1cm4gdm9pZCAwO1xuICB9XG4gIGlmICgvXFxzaGF2ZVxccy8udGVzdChtc2cpKSB7XG4gICAgcmV0dXJuIHZvaWQgMDtcbiAgfVxuICBsZXQgaXNPYmplY3QgPSBpc09iamVjdFR5cGUoZXhwZWN0ZWQpO1xuICBpZiAoL1xcc25vdFxccy8udGVzdChtc2cpKSB7XG4gICAgcmV0dXJuIGlzT2JqZWN0ID8gXCJub3REZWVwU3RyaWN0RXF1YWxcIiA6IFwibm90U3RyaWN0RXF1YWxcIjtcbiAgfVxuICByZXR1cm4gaXNPYmplY3QgPyBcImRlZXBTdHJpY3RFcXVhbFwiIDogXCJzdHJpY3RFcXVhbFwiO1xufVxuX19uYW1lKGdldE9wZXJhdG9yLCBcImdldE9wZXJhdG9yXCIpO1xuXG4vLyBsaWIvY2hhaS91dGlscy9pbmRleC5qc1xuZnVuY3Rpb24gZ2V0TmFtZShmbikge1xuICByZXR1cm4gZm4ubmFtZTtcbn1cbl9fbmFtZShnZXROYW1lLCBcImdldE5hbWVcIik7XG5mdW5jdGlvbiBpc1JlZ0V4cDIob2JqKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gXCJbb2JqZWN0IFJlZ0V4cF1cIjtcbn1cbl9fbmFtZShpc1JlZ0V4cDIsIFwiaXNSZWdFeHBcIik7XG5mdW5jdGlvbiBpc051bWVyaWMob2JqKSB7XG4gIHJldHVybiBbXCJOdW1iZXJcIiwgXCJCaWdJbnRcIl0uaW5jbHVkZXModHlwZShvYmopKTtcbn1cbl9fbmFtZShpc051bWVyaWMsIFwiaXNOdW1lcmljXCIpO1xuXG4vLyBsaWIvY2hhaS9jb3JlL2Fzc2VydGlvbnMuanNcbnZhciB7IGZsYWc6IGZsYWcyIH0gPSB1dGlsc19leHBvcnRzO1xuW1xuICBcInRvXCIsXG4gIFwiYmVcIixcbiAgXCJiZWVuXCIsXG4gIFwiaXNcIixcbiAgXCJhbmRcIixcbiAgXCJoYXNcIixcbiAgXCJoYXZlXCIsXG4gIFwid2l0aFwiLFxuICBcInRoYXRcIixcbiAgXCJ3aGljaFwiLFxuICBcImF0XCIsXG4gIFwib2ZcIixcbiAgXCJzYW1lXCIsXG4gIFwiYnV0XCIsXG4gIFwiZG9lc1wiLFxuICBcInN0aWxsXCIsXG4gIFwiYWxzb1wiXG5dLmZvckVhY2goZnVuY3Rpb24oY2hhaW4pIHtcbiAgQXNzZXJ0aW9uLmFkZFByb3BlcnR5KGNoYWluKTtcbn0pO1xuQXNzZXJ0aW9uLmFkZFByb3BlcnR5KFwibm90XCIsIGZ1bmN0aW9uKCkge1xuICBmbGFnMih0aGlzLCBcIm5lZ2F0ZVwiLCB0cnVlKTtcbn0pO1xuQXNzZXJ0aW9uLmFkZFByb3BlcnR5KFwiZGVlcFwiLCBmdW5jdGlvbigpIHtcbiAgZmxhZzIodGhpcywgXCJkZWVwXCIsIHRydWUpO1xufSk7XG5Bc3NlcnRpb24uYWRkUHJvcGVydHkoXCJuZXN0ZWRcIiwgZnVuY3Rpb24oKSB7XG4gIGZsYWcyKHRoaXMsIFwibmVzdGVkXCIsIHRydWUpO1xufSk7XG5Bc3NlcnRpb24uYWRkUHJvcGVydHkoXCJvd25cIiwgZnVuY3Rpb24oKSB7XG4gIGZsYWcyKHRoaXMsIFwib3duXCIsIHRydWUpO1xufSk7XG5Bc3NlcnRpb24uYWRkUHJvcGVydHkoXCJvcmRlcmVkXCIsIGZ1bmN0aW9uKCkge1xuICBmbGFnMih0aGlzLCBcIm9yZGVyZWRcIiwgdHJ1ZSk7XG59KTtcbkFzc2VydGlvbi5hZGRQcm9wZXJ0eShcImFueVwiLCBmdW5jdGlvbigpIHtcbiAgZmxhZzIodGhpcywgXCJhbnlcIiwgdHJ1ZSk7XG4gIGZsYWcyKHRoaXMsIFwiYWxsXCIsIGZhbHNlKTtcbn0pO1xuQXNzZXJ0aW9uLmFkZFByb3BlcnR5KFwiYWxsXCIsIGZ1bmN0aW9uKCkge1xuICBmbGFnMih0aGlzLCBcImFsbFwiLCB0cnVlKTtcbiAgZmxhZzIodGhpcywgXCJhbnlcIiwgZmFsc2UpO1xufSk7XG52YXIgZnVuY3Rpb25UeXBlcyA9IHtcbiAgZnVuY3Rpb246IFtcbiAgICBcImZ1bmN0aW9uXCIsXG4gICAgXCJhc3luY2Z1bmN0aW9uXCIsXG4gICAgXCJnZW5lcmF0b3JmdW5jdGlvblwiLFxuICAgIFwiYXN5bmNnZW5lcmF0b3JmdW5jdGlvblwiXG4gIF0sXG4gIGFzeW5jZnVuY3Rpb246IFtcImFzeW5jZnVuY3Rpb25cIiwgXCJhc3luY2dlbmVyYXRvcmZ1bmN0aW9uXCJdLFxuICBnZW5lcmF0b3JmdW5jdGlvbjogW1wiZ2VuZXJhdG9yZnVuY3Rpb25cIiwgXCJhc3luY2dlbmVyYXRvcmZ1bmN0aW9uXCJdLFxuICBhc3luY2dlbmVyYXRvcmZ1bmN0aW9uOiBbXCJhc3luY2dlbmVyYXRvcmZ1bmN0aW9uXCJdXG59O1xuZnVuY3Rpb24gYW4odHlwZTMsIG1zZykge1xuICBpZiAobXNnKSBmbGFnMih0aGlzLCBcIm1lc3NhZ2VcIiwgbXNnKTtcbiAgdHlwZTMgPSB0eXBlMy50b0xvd2VyQ2FzZSgpO1xuICBsZXQgb2JqID0gZmxhZzIodGhpcywgXCJvYmplY3RcIiksIGFydGljbGUgPSB+W1wiYVwiLCBcImVcIiwgXCJpXCIsIFwib1wiLCBcInVcIl0uaW5kZXhPZih0eXBlMy5jaGFyQXQoMCkpID8gXCJhbiBcIiA6IFwiYSBcIjtcbiAgY29uc3QgZGV0ZWN0ZWRUeXBlID0gdHlwZShvYmopLnRvTG93ZXJDYXNlKCk7XG4gIGlmIChmdW5jdGlvblR5cGVzW1wiZnVuY3Rpb25cIl0uaW5jbHVkZXModHlwZTMpKSB7XG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICBmdW5jdGlvblR5cGVzW3R5cGUzXS5pbmNsdWRlcyhkZXRlY3RlZFR5cGUpLFxuICAgICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGJlIFwiICsgYXJ0aWNsZSArIHR5cGUzLFxuICAgICAgXCJleHBlY3RlZCAje3RoaXN9IG5vdCB0byBiZSBcIiArIGFydGljbGUgKyB0eXBlM1xuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICB0eXBlMyA9PT0gZGV0ZWN0ZWRUeXBlLFxuICAgICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGJlIFwiICsgYXJ0aWNsZSArIHR5cGUzLFxuICAgICAgXCJleHBlY3RlZCAje3RoaXN9IG5vdCB0byBiZSBcIiArIGFydGljbGUgKyB0eXBlM1xuICAgICk7XG4gIH1cbn1cbl9fbmFtZShhbiwgXCJhblwiKTtcbkFzc2VydGlvbi5hZGRDaGFpbmFibGVNZXRob2QoXCJhblwiLCBhbik7XG5Bc3NlcnRpb24uYWRkQ2hhaW5hYmxlTWV0aG9kKFwiYVwiLCBhbik7XG5mdW5jdGlvbiBTYW1lVmFsdWVaZXJvKGEsIGIpIHtcbiAgcmV0dXJuIGlzTmFOMihhKSAmJiBpc05hTjIoYikgfHwgYSA9PT0gYjtcbn1cbl9fbmFtZShTYW1lVmFsdWVaZXJvLCBcIlNhbWVWYWx1ZVplcm9cIik7XG5mdW5jdGlvbiBpbmNsdWRlQ2hhaW5pbmdCZWhhdmlvcigpIHtcbiAgZmxhZzIodGhpcywgXCJjb250YWluc1wiLCB0cnVlKTtcbn1cbl9fbmFtZShpbmNsdWRlQ2hhaW5pbmdCZWhhdmlvciwgXCJpbmNsdWRlQ2hhaW5pbmdCZWhhdmlvclwiKTtcbmZ1bmN0aW9uIGluY2x1ZGUodmFsLCBtc2cpIHtcbiAgaWYgKG1zZykgZmxhZzIodGhpcywgXCJtZXNzYWdlXCIsIG1zZyk7XG4gIGxldCBvYmogPSBmbGFnMih0aGlzLCBcIm9iamVjdFwiKSwgb2JqVHlwZSA9IHR5cGUob2JqKS50b0xvd2VyQ2FzZSgpLCBmbGFnTXNnID0gZmxhZzIodGhpcywgXCJtZXNzYWdlXCIpLCBuZWdhdGUgPSBmbGFnMih0aGlzLCBcIm5lZ2F0ZVwiKSwgc3NmaSA9IGZsYWcyKHRoaXMsIFwic3NmaVwiKSwgaXNEZWVwID0gZmxhZzIodGhpcywgXCJkZWVwXCIpLCBkZXNjcmlwdG9yID0gaXNEZWVwID8gXCJkZWVwIFwiIDogXCJcIiwgaXNFcWwgPSBpc0RlZXAgPyBmbGFnMih0aGlzLCBcImVxbFwiKSA6IFNhbWVWYWx1ZVplcm87XG4gIGZsYWdNc2cgPSBmbGFnTXNnID8gZmxhZ01zZyArIFwiOiBcIiA6IFwiXCI7XG4gIGxldCBpbmNsdWRlZCA9IGZhbHNlO1xuICBzd2l0Y2ggKG9ialR5cGUpIHtcbiAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgICBpbmNsdWRlZCA9IG9iai5pbmRleE9mKHZhbCkgIT09IC0xO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIndlYWtzZXRcIjpcbiAgICAgIGlmIChpc0RlZXApIHtcbiAgICAgICAgdGhyb3cgbmV3IEFzc2VydGlvbkVycm9yKFxuICAgICAgICAgIGZsYWdNc2cgKyBcInVuYWJsZSB0byB1c2UgLmRlZXAuaW5jbHVkZSB3aXRoIFdlYWtTZXRcIixcbiAgICAgICAgICB2b2lkIDAsXG4gICAgICAgICAgc3NmaVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaW5jbHVkZWQgPSBvYmouaGFzKHZhbCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwibWFwXCI6XG4gICAgICBvYmouZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIGluY2x1ZGVkID0gaW5jbHVkZWQgfHwgaXNFcWwoaXRlbSwgdmFsKTtcbiAgICAgIH0pO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcInNldFwiOlxuICAgICAgaWYgKGlzRGVlcCkge1xuICAgICAgICBvYmouZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgaW5jbHVkZWQgPSBpbmNsdWRlZCB8fCBpc0VxbChpdGVtLCB2YWwpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluY2x1ZGVkID0gb2JqLmhhcyh2YWwpO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImFycmF5XCI6XG4gICAgICBpZiAoaXNEZWVwKSB7XG4gICAgICAgIGluY2x1ZGVkID0gb2JqLnNvbWUoZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgIHJldHVybiBpc0VxbChpdGVtLCB2YWwpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluY2x1ZGVkID0gb2JqLmluZGV4T2YodmFsKSAhPT0gLTE7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OiB7XG4gICAgICBpZiAodmFsICE9PSBPYmplY3QodmFsKSkge1xuICAgICAgICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IoXG4gICAgICAgICAgZmxhZ01zZyArIFwidGhlIGdpdmVuIGNvbWJpbmF0aW9uIG9mIGFyZ3VtZW50cyAoXCIgKyBvYmpUeXBlICsgXCIgYW5kIFwiICsgdHlwZSh2YWwpLnRvTG93ZXJDYXNlKCkgKyBcIikgaXMgaW52YWxpZCBmb3IgdGhpcyBhc3NlcnRpb24uIFlvdSBjYW4gdXNlIGFuIGFycmF5LCBhIG1hcCwgYW4gb2JqZWN0LCBhIHNldCwgYSBzdHJpbmcsIG9yIGEgd2Vha3NldCBpbnN0ZWFkIG9mIGEgXCIgKyB0eXBlKHZhbCkudG9Mb3dlckNhc2UoKSxcbiAgICAgICAgICB2b2lkIDAsXG4gICAgICAgICAgc3NmaVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgbGV0IHByb3BzID0gT2JqZWN0LmtleXModmFsKTtcbiAgICAgIGxldCBmaXJzdEVyciA9IG51bGw7XG4gICAgICBsZXQgbnVtRXJycyA9IDA7XG4gICAgICBwcm9wcy5mb3JFYWNoKGZ1bmN0aW9uKHByb3ApIHtcbiAgICAgICAgbGV0IHByb3BBc3NlcnRpb24gPSBuZXcgQXNzZXJ0aW9uKG9iaik7XG4gICAgICAgIHRyYW5zZmVyRmxhZ3ModGhpcywgcHJvcEFzc2VydGlvbiwgdHJ1ZSk7XG4gICAgICAgIGZsYWcyKHByb3BBc3NlcnRpb24sIFwibG9ja1NzZmlcIiwgdHJ1ZSk7XG4gICAgICAgIGlmICghbmVnYXRlIHx8IHByb3BzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIHByb3BBc3NlcnRpb24ucHJvcGVydHkocHJvcCwgdmFsW3Byb3BdKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBwcm9wQXNzZXJ0aW9uLnByb3BlcnR5KHByb3AsIHZhbFtwcm9wXSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIGlmICghY2hlY2tfZXJyb3JfZXhwb3J0cy5jb21wYXRpYmxlQ29uc3RydWN0b3IoZXJyLCBBc3NlcnRpb25FcnJvcikpIHtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGZpcnN0RXJyID09PSBudWxsKSBmaXJzdEVyciA9IGVycjtcbiAgICAgICAgICBudW1FcnJzKys7XG4gICAgICAgIH1cbiAgICAgIH0sIHRoaXMpO1xuICAgICAgaWYgKG5lZ2F0ZSAmJiBwcm9wcy5sZW5ndGggPiAxICYmIG51bUVycnMgPT09IHByb3BzLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBmaXJzdEVycjtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cbiAgdGhpcy5hc3NlcnQoXG4gICAgaW5jbHVkZWQsXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIFwiICsgZGVzY3JpcHRvciArIFwiaW5jbHVkZSBcIiArIGluc3BlY3QyKHZhbCksXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBcIiArIGRlc2NyaXB0b3IgKyBcImluY2x1ZGUgXCIgKyBpbnNwZWN0Mih2YWwpXG4gICk7XG59XG5fX25hbWUoaW5jbHVkZSwgXCJpbmNsdWRlXCIpO1xuQXNzZXJ0aW9uLmFkZENoYWluYWJsZU1ldGhvZChcImluY2x1ZGVcIiwgaW5jbHVkZSwgaW5jbHVkZUNoYWluaW5nQmVoYXZpb3IpO1xuQXNzZXJ0aW9uLmFkZENoYWluYWJsZU1ldGhvZChcImNvbnRhaW5cIiwgaW5jbHVkZSwgaW5jbHVkZUNoYWluaW5nQmVoYXZpb3IpO1xuQXNzZXJ0aW9uLmFkZENoYWluYWJsZU1ldGhvZChcImNvbnRhaW5zXCIsIGluY2x1ZGUsIGluY2x1ZGVDaGFpbmluZ0JlaGF2aW9yKTtcbkFzc2VydGlvbi5hZGRDaGFpbmFibGVNZXRob2QoXCJpbmNsdWRlc1wiLCBpbmNsdWRlLCBpbmNsdWRlQ2hhaW5pbmdCZWhhdmlvcik7XG5Bc3NlcnRpb24uYWRkUHJvcGVydHkoXCJva1wiLCBmdW5jdGlvbigpIHtcbiAgdGhpcy5hc3NlcnQoXG4gICAgZmxhZzIodGhpcywgXCJvYmplY3RcIiksXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGJlIHRydXRoeVwiLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBmYWxzeVwiXG4gICk7XG59KTtcbkFzc2VydGlvbi5hZGRQcm9wZXJ0eShcInRydWVcIiwgZnVuY3Rpb24oKSB7XG4gIHRoaXMuYXNzZXJ0KFxuICAgIHRydWUgPT09IGZsYWcyKHRoaXMsIFwib2JqZWN0XCIpLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSB0cnVlXCIsXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGJlIGZhbHNlXCIsXG4gICAgZmxhZzIodGhpcywgXCJuZWdhdGVcIikgPyBmYWxzZSA6IHRydWVcbiAgKTtcbn0pO1xuQXNzZXJ0aW9uLmFkZFByb3BlcnR5KFwibnVtZXJpY1wiLCBmdW5jdGlvbigpIHtcbiAgY29uc3Qgb2JqZWN0ID0gZmxhZzIodGhpcywgXCJvYmplY3RcIik7XG4gIHRoaXMuYXNzZXJ0KFxuICAgIFtcIk51bWJlclwiLCBcIkJpZ0ludFwiXS5pbmNsdWRlcyh0eXBlKG9iamVjdCkpLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBudW1lcmljXCIsXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBiZSBudW1lcmljXCIsXG4gICAgZmxhZzIodGhpcywgXCJuZWdhdGVcIikgPyBmYWxzZSA6IHRydWVcbiAgKTtcbn0pO1xuQXNzZXJ0aW9uLmFkZFByb3BlcnR5KFwiY2FsbGFibGVcIiwgZnVuY3Rpb24oKSB7XG4gIGNvbnN0IHZhbCA9IGZsYWcyKHRoaXMsIFwib2JqZWN0XCIpO1xuICBjb25zdCBzc2ZpID0gZmxhZzIodGhpcywgXCJzc2ZpXCIpO1xuICBjb25zdCBtZXNzYWdlID0gZmxhZzIodGhpcywgXCJtZXNzYWdlXCIpO1xuICBjb25zdCBtc2cgPSBtZXNzYWdlID8gYCR7bWVzc2FnZX06IGAgOiBcIlwiO1xuICBjb25zdCBuZWdhdGUgPSBmbGFnMih0aGlzLCBcIm5lZ2F0ZVwiKTtcbiAgY29uc3QgYXNzZXJ0aW9uTWVzc2FnZSA9IG5lZ2F0ZSA/IGAke21zZ31leHBlY3RlZCAke2luc3BlY3QyKHZhbCl9IG5vdCB0byBiZSBhIGNhbGxhYmxlIGZ1bmN0aW9uYCA6IGAke21zZ31leHBlY3RlZCAke2luc3BlY3QyKHZhbCl9IHRvIGJlIGEgY2FsbGFibGUgZnVuY3Rpb25gO1xuICBjb25zdCBpc0NhbGxhYmxlID0gW1xuICAgIFwiRnVuY3Rpb25cIixcbiAgICBcIkFzeW5jRnVuY3Rpb25cIixcbiAgICBcIkdlbmVyYXRvckZ1bmN0aW9uXCIsXG4gICAgXCJBc3luY0dlbmVyYXRvckZ1bmN0aW9uXCJcbiAgXS5pbmNsdWRlcyh0eXBlKHZhbCkpO1xuICBpZiAoaXNDYWxsYWJsZSAmJiBuZWdhdGUgfHwgIWlzQ2FsbGFibGUgJiYgIW5lZ2F0ZSkge1xuICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihhc3NlcnRpb25NZXNzYWdlLCB2b2lkIDAsIHNzZmkpO1xuICB9XG59KTtcbkFzc2VydGlvbi5hZGRQcm9wZXJ0eShcImZhbHNlXCIsIGZ1bmN0aW9uKCkge1xuICB0aGlzLmFzc2VydChcbiAgICBmYWxzZSA9PT0gZmxhZzIodGhpcywgXCJvYmplY3RcIiksXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGJlIGZhbHNlXCIsXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGJlIHRydWVcIixcbiAgICBmbGFnMih0aGlzLCBcIm5lZ2F0ZVwiKSA/IHRydWUgOiBmYWxzZVxuICApO1xufSk7XG5Bc3NlcnRpb24uYWRkUHJvcGVydHkoXCJudWxsXCIsIGZ1bmN0aW9uKCkge1xuICB0aGlzLmFzc2VydChcbiAgICBudWxsID09PSBmbGFnMih0aGlzLCBcIm9iamVjdFwiKSxcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gYmUgbnVsbFwiLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSBub3QgdG8gYmUgbnVsbFwiXG4gICk7XG59KTtcbkFzc2VydGlvbi5hZGRQcm9wZXJ0eShcInVuZGVmaW5lZFwiLCBmdW5jdGlvbigpIHtcbiAgdGhpcy5hc3NlcnQoXG4gICAgdm9pZCAwID09PSBmbGFnMih0aGlzLCBcIm9iamVjdFwiKSxcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gYmUgdW5kZWZpbmVkXCIsXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IG5vdCB0byBiZSB1bmRlZmluZWRcIlxuICApO1xufSk7XG5Bc3NlcnRpb24uYWRkUHJvcGVydHkoXCJOYU5cIiwgZnVuY3Rpb24oKSB7XG4gIHRoaXMuYXNzZXJ0KFxuICAgIGlzTmFOMihmbGFnMih0aGlzLCBcIm9iamVjdFwiKSksXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGJlIE5hTlwiLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSBub3QgdG8gYmUgTmFOXCJcbiAgKTtcbn0pO1xuZnVuY3Rpb24gYXNzZXJ0RXhpc3QoKSB7XG4gIGxldCB2YWwgPSBmbGFnMih0aGlzLCBcIm9iamVjdFwiKTtcbiAgdGhpcy5hc3NlcnQoXG4gICAgdmFsICE9PSBudWxsICYmIHZhbCAhPT0gdm9pZCAwLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBleGlzdFwiLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgZXhpc3RcIlxuICApO1xufVxuX19uYW1lKGFzc2VydEV4aXN0LCBcImFzc2VydEV4aXN0XCIpO1xuQXNzZXJ0aW9uLmFkZFByb3BlcnR5KFwiZXhpc3RcIiwgYXNzZXJ0RXhpc3QpO1xuQXNzZXJ0aW9uLmFkZFByb3BlcnR5KFwiZXhpc3RzXCIsIGFzc2VydEV4aXN0KTtcbkFzc2VydGlvbi5hZGRQcm9wZXJ0eShcImVtcHR5XCIsIGZ1bmN0aW9uKCkge1xuICBsZXQgdmFsID0gZmxhZzIodGhpcywgXCJvYmplY3RcIiksIHNzZmkgPSBmbGFnMih0aGlzLCBcInNzZmlcIiksIGZsYWdNc2cgPSBmbGFnMih0aGlzLCBcIm1lc3NhZ2VcIiksIGl0ZW1zQ291bnQ7XG4gIGZsYWdNc2cgPSBmbGFnTXNnID8gZmxhZ01zZyArIFwiOiBcIiA6IFwiXCI7XG4gIHN3aXRjaCAodHlwZSh2YWwpLnRvTG93ZXJDYXNlKCkpIHtcbiAgICBjYXNlIFwiYXJyYXlcIjpcbiAgICBjYXNlIFwic3RyaW5nXCI6XG4gICAgICBpdGVtc0NvdW50ID0gdmFsLmxlbmd0aDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJtYXBcIjpcbiAgICBjYXNlIFwic2V0XCI6XG4gICAgICBpdGVtc0NvdW50ID0gdmFsLnNpemU7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwid2Vha21hcFwiOlxuICAgIGNhc2UgXCJ3ZWFrc2V0XCI6XG4gICAgICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IoXG4gICAgICAgIGZsYWdNc2cgKyBcIi5lbXB0eSB3YXMgcGFzc2VkIGEgd2VhayBjb2xsZWN0aW9uXCIsXG4gICAgICAgIHZvaWQgMCxcbiAgICAgICAgc3NmaVxuICAgICAgKTtcbiAgICBjYXNlIFwiZnVuY3Rpb25cIjoge1xuICAgICAgY29uc3QgbXNnID0gZmxhZ01zZyArIFwiLmVtcHR5IHdhcyBwYXNzZWQgYSBmdW5jdGlvbiBcIiArIGdldE5hbWUodmFsKTtcbiAgICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihtc2cudHJpbSgpLCB2b2lkIDAsIHNzZmkpO1xuICAgIH1cbiAgICBkZWZhdWx0OlxuICAgICAgaWYgKHZhbCAhPT0gT2JqZWN0KHZhbCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEFzc2VydGlvbkVycm9yKFxuICAgICAgICAgIGZsYWdNc2cgKyBcIi5lbXB0eSB3YXMgcGFzc2VkIG5vbi1zdHJpbmcgcHJpbWl0aXZlIFwiICsgaW5zcGVjdDIodmFsKSxcbiAgICAgICAgICB2b2lkIDAsXG4gICAgICAgICAgc3NmaVxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaXRlbXNDb3VudCA9IE9iamVjdC5rZXlzKHZhbCkubGVuZ3RoO1xuICB9XG4gIHRoaXMuYXNzZXJ0KFxuICAgIDAgPT09IGl0ZW1zQ291bnQsXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGJlIGVtcHR5XCIsXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IG5vdCB0byBiZSBlbXB0eVwiXG4gICk7XG59KTtcbmZ1bmN0aW9uIGNoZWNrQXJndW1lbnRzKCkge1xuICBsZXQgb2JqID0gZmxhZzIodGhpcywgXCJvYmplY3RcIiksIHR5cGUzID0gdHlwZShvYmopO1xuICB0aGlzLmFzc2VydChcbiAgICBcIkFyZ3VtZW50c1wiID09PSB0eXBlMyxcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gYmUgYXJndW1lbnRzIGJ1dCBnb3QgXCIgKyB0eXBlMyxcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gbm90IGJlIGFyZ3VtZW50c1wiXG4gICk7XG59XG5fX25hbWUoY2hlY2tBcmd1bWVudHMsIFwiY2hlY2tBcmd1bWVudHNcIik7XG5Bc3NlcnRpb24uYWRkUHJvcGVydHkoXCJhcmd1bWVudHNcIiwgY2hlY2tBcmd1bWVudHMpO1xuQXNzZXJ0aW9uLmFkZFByb3BlcnR5KFwiQXJndW1lbnRzXCIsIGNoZWNrQXJndW1lbnRzKTtcbmZ1bmN0aW9uIGFzc2VydEVxdWFsKHZhbCwgbXNnKSB7XG4gIGlmIChtc2cpIGZsYWcyKHRoaXMsIFwibWVzc2FnZVwiLCBtc2cpO1xuICBsZXQgb2JqID0gZmxhZzIodGhpcywgXCJvYmplY3RcIik7XG4gIGlmIChmbGFnMih0aGlzLCBcImRlZXBcIikpIHtcbiAgICBsZXQgcHJldkxvY2tTc2ZpID0gZmxhZzIodGhpcywgXCJsb2NrU3NmaVwiKTtcbiAgICBmbGFnMih0aGlzLCBcImxvY2tTc2ZpXCIsIHRydWUpO1xuICAgIHRoaXMuZXFsKHZhbCk7XG4gICAgZmxhZzIodGhpcywgXCJsb2NrU3NmaVwiLCBwcmV2TG9ja1NzZmkpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgdmFsID09PSBvYmosXG4gICAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gZXF1YWwgI3tleHB9XCIsXG4gICAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gbm90IGVxdWFsICN7ZXhwfVwiLFxuICAgICAgdmFsLFxuICAgICAgdGhpcy5fb2JqLFxuICAgICAgdHJ1ZVxuICAgICk7XG4gIH1cbn1cbl9fbmFtZShhc3NlcnRFcXVhbCwgXCJhc3NlcnRFcXVhbFwiKTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJlcXVhbFwiLCBhc3NlcnRFcXVhbCk7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwiZXF1YWxzXCIsIGFzc2VydEVxdWFsKTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJlcVwiLCBhc3NlcnRFcXVhbCk7XG5mdW5jdGlvbiBhc3NlcnRFcWwob2JqLCBtc2cpIHtcbiAgaWYgKG1zZykgZmxhZzIodGhpcywgXCJtZXNzYWdlXCIsIG1zZyk7XG4gIGxldCBlcWwgPSBmbGFnMih0aGlzLCBcImVxbFwiKTtcbiAgdGhpcy5hc3NlcnQoXG4gICAgZXFsKG9iaiwgZmxhZzIodGhpcywgXCJvYmplY3RcIikpLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBkZWVwbHkgZXF1YWwgI3tleHB9XCIsXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBkZWVwbHkgZXF1YWwgI3tleHB9XCIsXG4gICAgb2JqLFxuICAgIHRoaXMuX29iaixcbiAgICB0cnVlXG4gICk7XG59XG5fX25hbWUoYXNzZXJ0RXFsLCBcImFzc2VydEVxbFwiKTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJlcWxcIiwgYXNzZXJ0RXFsKTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJlcWxzXCIsIGFzc2VydEVxbCk7XG5mdW5jdGlvbiBhc3NlcnRBYm92ZShuLCBtc2cpIHtcbiAgaWYgKG1zZykgZmxhZzIodGhpcywgXCJtZXNzYWdlXCIsIG1zZyk7XG4gIGxldCBvYmogPSBmbGFnMih0aGlzLCBcIm9iamVjdFwiKSwgZG9MZW5ndGggPSBmbGFnMih0aGlzLCBcImRvTGVuZ3RoXCIpLCBmbGFnTXNnID0gZmxhZzIodGhpcywgXCJtZXNzYWdlXCIpLCBtc2dQcmVmaXggPSBmbGFnTXNnID8gZmxhZ01zZyArIFwiOiBcIiA6IFwiXCIsIHNzZmkgPSBmbGFnMih0aGlzLCBcInNzZmlcIiksIG9ialR5cGUgPSB0eXBlKG9iaikudG9Mb3dlckNhc2UoKSwgblR5cGUgPSB0eXBlKG4pLnRvTG93ZXJDYXNlKCk7XG4gIGlmIChkb0xlbmd0aCAmJiBvYmpUeXBlICE9PSBcIm1hcFwiICYmIG9ialR5cGUgIT09IFwic2V0XCIpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKG9iaiwgZmxhZ01zZywgc3NmaSwgdHJ1ZSkudG8uaGF2ZS5wcm9wZXJ0eShcImxlbmd0aFwiKTtcbiAgfVxuICBpZiAoIWRvTGVuZ3RoICYmIG9ialR5cGUgPT09IFwiZGF0ZVwiICYmIG5UeXBlICE9PSBcImRhdGVcIikge1xuICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihcbiAgICAgIG1zZ1ByZWZpeCArIFwidGhlIGFyZ3VtZW50IHRvIGFib3ZlIG11c3QgYmUgYSBkYXRlXCIsXG4gICAgICB2b2lkIDAsXG4gICAgICBzc2ZpXG4gICAgKTtcbiAgfSBlbHNlIGlmICghaXNOdW1lcmljKG4pICYmIChkb0xlbmd0aCB8fCBpc051bWVyaWMob2JqKSkpIHtcbiAgICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IoXG4gICAgICBtc2dQcmVmaXggKyBcInRoZSBhcmd1bWVudCB0byBhYm92ZSBtdXN0IGJlIGEgbnVtYmVyXCIsXG4gICAgICB2b2lkIDAsXG4gICAgICBzc2ZpXG4gICAgKTtcbiAgfSBlbHNlIGlmICghZG9MZW5ndGggJiYgb2JqVHlwZSAhPT0gXCJkYXRlXCIgJiYgIWlzTnVtZXJpYyhvYmopKSB7XG4gICAgbGV0IHByaW50T2JqID0gb2JqVHlwZSA9PT0gXCJzdHJpbmdcIiA/IFwiJ1wiICsgb2JqICsgXCInXCIgOiBvYmo7XG4gICAgdGhyb3cgbmV3IEFzc2VydGlvbkVycm9yKFxuICAgICAgbXNnUHJlZml4ICsgXCJleHBlY3RlZCBcIiArIHByaW50T2JqICsgXCIgdG8gYmUgYSBudW1iZXIgb3IgYSBkYXRlXCIsXG4gICAgICB2b2lkIDAsXG4gICAgICBzc2ZpXG4gICAgKTtcbiAgfVxuICBpZiAoZG9MZW5ndGgpIHtcbiAgICBsZXQgZGVzY3JpcHRvciA9IFwibGVuZ3RoXCIsIGl0ZW1zQ291bnQ7XG4gICAgaWYgKG9ialR5cGUgPT09IFwibWFwXCIgfHwgb2JqVHlwZSA9PT0gXCJzZXRcIikge1xuICAgICAgZGVzY3JpcHRvciA9IFwic2l6ZVwiO1xuICAgICAgaXRlbXNDb3VudCA9IG9iai5zaXplO1xuICAgIH0gZWxzZSB7XG4gICAgICBpdGVtc0NvdW50ID0gb2JqLmxlbmd0aDtcbiAgICB9XG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICBpdGVtc0NvdW50ID4gbixcbiAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBoYXZlIGEgXCIgKyBkZXNjcmlwdG9yICsgXCIgYWJvdmUgI3tleHB9IGJ1dCBnb3QgI3thY3R9XCIsXG4gICAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gbm90IGhhdmUgYSBcIiArIGRlc2NyaXB0b3IgKyBcIiBhYm92ZSAje2V4cH1cIixcbiAgICAgIG4sXG4gICAgICBpdGVtc0NvdW50XG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmFzc2VydChcbiAgICAgIG9iaiA+IG4sXG4gICAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gYmUgYWJvdmUgI3tleHB9XCIsXG4gICAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gYmUgYXQgbW9zdCAje2V4cH1cIixcbiAgICAgIG5cbiAgICApO1xuICB9XG59XG5fX25hbWUoYXNzZXJ0QWJvdmUsIFwiYXNzZXJ0QWJvdmVcIik7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwiYWJvdmVcIiwgYXNzZXJ0QWJvdmUpO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcImd0XCIsIGFzc2VydEFib3ZlKTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJncmVhdGVyVGhhblwiLCBhc3NlcnRBYm92ZSk7XG5mdW5jdGlvbiBhc3NlcnRMZWFzdChuLCBtc2cpIHtcbiAgaWYgKG1zZykgZmxhZzIodGhpcywgXCJtZXNzYWdlXCIsIG1zZyk7XG4gIGxldCBvYmogPSBmbGFnMih0aGlzLCBcIm9iamVjdFwiKSwgZG9MZW5ndGggPSBmbGFnMih0aGlzLCBcImRvTGVuZ3RoXCIpLCBmbGFnTXNnID0gZmxhZzIodGhpcywgXCJtZXNzYWdlXCIpLCBtc2dQcmVmaXggPSBmbGFnTXNnID8gZmxhZ01zZyArIFwiOiBcIiA6IFwiXCIsIHNzZmkgPSBmbGFnMih0aGlzLCBcInNzZmlcIiksIG9ialR5cGUgPSB0eXBlKG9iaikudG9Mb3dlckNhc2UoKSwgblR5cGUgPSB0eXBlKG4pLnRvTG93ZXJDYXNlKCksIGVycm9yTWVzc2FnZSwgc2hvdWxkVGhyb3cgPSB0cnVlO1xuICBpZiAoZG9MZW5ndGggJiYgb2JqVHlwZSAhPT0gXCJtYXBcIiAmJiBvYmpUeXBlICE9PSBcInNldFwiKSB7XG4gICAgbmV3IEFzc2VydGlvbihvYmosIGZsYWdNc2csIHNzZmksIHRydWUpLnRvLmhhdmUucHJvcGVydHkoXCJsZW5ndGhcIik7XG4gIH1cbiAgaWYgKCFkb0xlbmd0aCAmJiBvYmpUeXBlID09PSBcImRhdGVcIiAmJiBuVHlwZSAhPT0gXCJkYXRlXCIpIHtcbiAgICBlcnJvck1lc3NhZ2UgPSBtc2dQcmVmaXggKyBcInRoZSBhcmd1bWVudCB0byBsZWFzdCBtdXN0IGJlIGEgZGF0ZVwiO1xuICB9IGVsc2UgaWYgKCFpc051bWVyaWMobikgJiYgKGRvTGVuZ3RoIHx8IGlzTnVtZXJpYyhvYmopKSkge1xuICAgIGVycm9yTWVzc2FnZSA9IG1zZ1ByZWZpeCArIFwidGhlIGFyZ3VtZW50IHRvIGxlYXN0IG11c3QgYmUgYSBudW1iZXJcIjtcbiAgfSBlbHNlIGlmICghZG9MZW5ndGggJiYgb2JqVHlwZSAhPT0gXCJkYXRlXCIgJiYgIWlzTnVtZXJpYyhvYmopKSB7XG4gICAgbGV0IHByaW50T2JqID0gb2JqVHlwZSA9PT0gXCJzdHJpbmdcIiA/IFwiJ1wiICsgb2JqICsgXCInXCIgOiBvYmo7XG4gICAgZXJyb3JNZXNzYWdlID0gbXNnUHJlZml4ICsgXCJleHBlY3RlZCBcIiArIHByaW50T2JqICsgXCIgdG8gYmUgYSBudW1iZXIgb3IgYSBkYXRlXCI7XG4gIH0gZWxzZSB7XG4gICAgc2hvdWxkVGhyb3cgPSBmYWxzZTtcbiAgfVxuICBpZiAoc2hvdWxkVGhyb3cpIHtcbiAgICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IoZXJyb3JNZXNzYWdlLCB2b2lkIDAsIHNzZmkpO1xuICB9XG4gIGlmIChkb0xlbmd0aCkge1xuICAgIGxldCBkZXNjcmlwdG9yID0gXCJsZW5ndGhcIiwgaXRlbXNDb3VudDtcbiAgICBpZiAob2JqVHlwZSA9PT0gXCJtYXBcIiB8fCBvYmpUeXBlID09PSBcInNldFwiKSB7XG4gICAgICBkZXNjcmlwdG9yID0gXCJzaXplXCI7XG4gICAgICBpdGVtc0NvdW50ID0gb2JqLnNpemU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGl0ZW1zQ291bnQgPSBvYmoubGVuZ3RoO1xuICAgIH1cbiAgICB0aGlzLmFzc2VydChcbiAgICAgIGl0ZW1zQ291bnQgPj0gbixcbiAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBoYXZlIGEgXCIgKyBkZXNjcmlwdG9yICsgXCIgYXQgbGVhc3QgI3tleHB9IGJ1dCBnb3QgI3thY3R9XCIsXG4gICAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gaGF2ZSBhIFwiICsgZGVzY3JpcHRvciArIFwiIGJlbG93ICN7ZXhwfVwiLFxuICAgICAgbixcbiAgICAgIGl0ZW1zQ291bnRcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgb2JqID49IG4sXG4gICAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gYmUgYXQgbGVhc3QgI3tleHB9XCIsXG4gICAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gYmUgYmVsb3cgI3tleHB9XCIsXG4gICAgICBuXG4gICAgKTtcbiAgfVxufVxuX19uYW1lKGFzc2VydExlYXN0LCBcImFzc2VydExlYXN0XCIpO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcImxlYXN0XCIsIGFzc2VydExlYXN0KTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJndGVcIiwgYXNzZXJ0TGVhc3QpO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcImdyZWF0ZXJUaGFuT3JFcXVhbFwiLCBhc3NlcnRMZWFzdCk7XG5mdW5jdGlvbiBhc3NlcnRCZWxvdyhuLCBtc2cpIHtcbiAgaWYgKG1zZykgZmxhZzIodGhpcywgXCJtZXNzYWdlXCIsIG1zZyk7XG4gIGxldCBvYmogPSBmbGFnMih0aGlzLCBcIm9iamVjdFwiKSwgZG9MZW5ndGggPSBmbGFnMih0aGlzLCBcImRvTGVuZ3RoXCIpLCBmbGFnTXNnID0gZmxhZzIodGhpcywgXCJtZXNzYWdlXCIpLCBtc2dQcmVmaXggPSBmbGFnTXNnID8gZmxhZ01zZyArIFwiOiBcIiA6IFwiXCIsIHNzZmkgPSBmbGFnMih0aGlzLCBcInNzZmlcIiksIG9ialR5cGUgPSB0eXBlKG9iaikudG9Mb3dlckNhc2UoKSwgblR5cGUgPSB0eXBlKG4pLnRvTG93ZXJDYXNlKCksIGVycm9yTWVzc2FnZSwgc2hvdWxkVGhyb3cgPSB0cnVlO1xuICBpZiAoZG9MZW5ndGggJiYgb2JqVHlwZSAhPT0gXCJtYXBcIiAmJiBvYmpUeXBlICE9PSBcInNldFwiKSB7XG4gICAgbmV3IEFzc2VydGlvbihvYmosIGZsYWdNc2csIHNzZmksIHRydWUpLnRvLmhhdmUucHJvcGVydHkoXCJsZW5ndGhcIik7XG4gIH1cbiAgaWYgKCFkb0xlbmd0aCAmJiBvYmpUeXBlID09PSBcImRhdGVcIiAmJiBuVHlwZSAhPT0gXCJkYXRlXCIpIHtcbiAgICBlcnJvck1lc3NhZ2UgPSBtc2dQcmVmaXggKyBcInRoZSBhcmd1bWVudCB0byBiZWxvdyBtdXN0IGJlIGEgZGF0ZVwiO1xuICB9IGVsc2UgaWYgKCFpc051bWVyaWMobikgJiYgKGRvTGVuZ3RoIHx8IGlzTnVtZXJpYyhvYmopKSkge1xuICAgIGVycm9yTWVzc2FnZSA9IG1zZ1ByZWZpeCArIFwidGhlIGFyZ3VtZW50IHRvIGJlbG93IG11c3QgYmUgYSBudW1iZXJcIjtcbiAgfSBlbHNlIGlmICghZG9MZW5ndGggJiYgb2JqVHlwZSAhPT0gXCJkYXRlXCIgJiYgIWlzTnVtZXJpYyhvYmopKSB7XG4gICAgbGV0IHByaW50T2JqID0gb2JqVHlwZSA9PT0gXCJzdHJpbmdcIiA/IFwiJ1wiICsgb2JqICsgXCInXCIgOiBvYmo7XG4gICAgZXJyb3JNZXNzYWdlID0gbXNnUHJlZml4ICsgXCJleHBlY3RlZCBcIiArIHByaW50T2JqICsgXCIgdG8gYmUgYSBudW1iZXIgb3IgYSBkYXRlXCI7XG4gIH0gZWxzZSB7XG4gICAgc2hvdWxkVGhyb3cgPSBmYWxzZTtcbiAgfVxuICBpZiAoc2hvdWxkVGhyb3cpIHtcbiAgICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IoZXJyb3JNZXNzYWdlLCB2b2lkIDAsIHNzZmkpO1xuICB9XG4gIGlmIChkb0xlbmd0aCkge1xuICAgIGxldCBkZXNjcmlwdG9yID0gXCJsZW5ndGhcIiwgaXRlbXNDb3VudDtcbiAgICBpZiAob2JqVHlwZSA9PT0gXCJtYXBcIiB8fCBvYmpUeXBlID09PSBcInNldFwiKSB7XG4gICAgICBkZXNjcmlwdG9yID0gXCJzaXplXCI7XG4gICAgICBpdGVtc0NvdW50ID0gb2JqLnNpemU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGl0ZW1zQ291bnQgPSBvYmoubGVuZ3RoO1xuICAgIH1cbiAgICB0aGlzLmFzc2VydChcbiAgICAgIGl0ZW1zQ291bnQgPCBuLFxuICAgICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGhhdmUgYSBcIiArIGRlc2NyaXB0b3IgKyBcIiBiZWxvdyAje2V4cH0gYnV0IGdvdCAje2FjdH1cIixcbiAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgaGF2ZSBhIFwiICsgZGVzY3JpcHRvciArIFwiIGJlbG93ICN7ZXhwfVwiLFxuICAgICAgbixcbiAgICAgIGl0ZW1zQ291bnRcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgb2JqIDwgbixcbiAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBiZWxvdyAje2V4cH1cIixcbiAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBhdCBsZWFzdCAje2V4cH1cIixcbiAgICAgIG5cbiAgICApO1xuICB9XG59XG5fX25hbWUoYXNzZXJ0QmVsb3csIFwiYXNzZXJ0QmVsb3dcIik7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwiYmVsb3dcIiwgYXNzZXJ0QmVsb3cpO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcImx0XCIsIGFzc2VydEJlbG93KTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJsZXNzVGhhblwiLCBhc3NlcnRCZWxvdyk7XG5mdW5jdGlvbiBhc3NlcnRNb3N0KG4sIG1zZykge1xuICBpZiAobXNnKSBmbGFnMih0aGlzLCBcIm1lc3NhZ2VcIiwgbXNnKTtcbiAgbGV0IG9iaiA9IGZsYWcyKHRoaXMsIFwib2JqZWN0XCIpLCBkb0xlbmd0aCA9IGZsYWcyKHRoaXMsIFwiZG9MZW5ndGhcIiksIGZsYWdNc2cgPSBmbGFnMih0aGlzLCBcIm1lc3NhZ2VcIiksIG1zZ1ByZWZpeCA9IGZsYWdNc2cgPyBmbGFnTXNnICsgXCI6IFwiIDogXCJcIiwgc3NmaSA9IGZsYWcyKHRoaXMsIFwic3NmaVwiKSwgb2JqVHlwZSA9IHR5cGUob2JqKS50b0xvd2VyQ2FzZSgpLCBuVHlwZSA9IHR5cGUobikudG9Mb3dlckNhc2UoKSwgZXJyb3JNZXNzYWdlLCBzaG91bGRUaHJvdyA9IHRydWU7XG4gIGlmIChkb0xlbmd0aCAmJiBvYmpUeXBlICE9PSBcIm1hcFwiICYmIG9ialR5cGUgIT09IFwic2V0XCIpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKG9iaiwgZmxhZ01zZywgc3NmaSwgdHJ1ZSkudG8uaGF2ZS5wcm9wZXJ0eShcImxlbmd0aFwiKTtcbiAgfVxuICBpZiAoIWRvTGVuZ3RoICYmIG9ialR5cGUgPT09IFwiZGF0ZVwiICYmIG5UeXBlICE9PSBcImRhdGVcIikge1xuICAgIGVycm9yTWVzc2FnZSA9IG1zZ1ByZWZpeCArIFwidGhlIGFyZ3VtZW50IHRvIG1vc3QgbXVzdCBiZSBhIGRhdGVcIjtcbiAgfSBlbHNlIGlmICghaXNOdW1lcmljKG4pICYmIChkb0xlbmd0aCB8fCBpc051bWVyaWMob2JqKSkpIHtcbiAgICBlcnJvck1lc3NhZ2UgPSBtc2dQcmVmaXggKyBcInRoZSBhcmd1bWVudCB0byBtb3N0IG11c3QgYmUgYSBudW1iZXJcIjtcbiAgfSBlbHNlIGlmICghZG9MZW5ndGggJiYgb2JqVHlwZSAhPT0gXCJkYXRlXCIgJiYgIWlzTnVtZXJpYyhvYmopKSB7XG4gICAgbGV0IHByaW50T2JqID0gb2JqVHlwZSA9PT0gXCJzdHJpbmdcIiA/IFwiJ1wiICsgb2JqICsgXCInXCIgOiBvYmo7XG4gICAgZXJyb3JNZXNzYWdlID0gbXNnUHJlZml4ICsgXCJleHBlY3RlZCBcIiArIHByaW50T2JqICsgXCIgdG8gYmUgYSBudW1iZXIgb3IgYSBkYXRlXCI7XG4gIH0gZWxzZSB7XG4gICAgc2hvdWxkVGhyb3cgPSBmYWxzZTtcbiAgfVxuICBpZiAoc2hvdWxkVGhyb3cpIHtcbiAgICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IoZXJyb3JNZXNzYWdlLCB2b2lkIDAsIHNzZmkpO1xuICB9XG4gIGlmIChkb0xlbmd0aCkge1xuICAgIGxldCBkZXNjcmlwdG9yID0gXCJsZW5ndGhcIiwgaXRlbXNDb3VudDtcbiAgICBpZiAob2JqVHlwZSA9PT0gXCJtYXBcIiB8fCBvYmpUeXBlID09PSBcInNldFwiKSB7XG4gICAgICBkZXNjcmlwdG9yID0gXCJzaXplXCI7XG4gICAgICBpdGVtc0NvdW50ID0gb2JqLnNpemU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGl0ZW1zQ291bnQgPSBvYmoubGVuZ3RoO1xuICAgIH1cbiAgICB0aGlzLmFzc2VydChcbiAgICAgIGl0ZW1zQ291bnQgPD0gbixcbiAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBoYXZlIGEgXCIgKyBkZXNjcmlwdG9yICsgXCIgYXQgbW9zdCAje2V4cH0gYnV0IGdvdCAje2FjdH1cIixcbiAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBoYXZlIGEgXCIgKyBkZXNjcmlwdG9yICsgXCIgYWJvdmUgI3tleHB9XCIsXG4gICAgICBuLFxuICAgICAgaXRlbXNDb3VudFxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICBvYmogPD0gbixcbiAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBhdCBtb3N0ICN7ZXhwfVwiLFxuICAgICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGJlIGFib3ZlICN7ZXhwfVwiLFxuICAgICAgblxuICAgICk7XG4gIH1cbn1cbl9fbmFtZShhc3NlcnRNb3N0LCBcImFzc2VydE1vc3RcIik7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwibW9zdFwiLCBhc3NlcnRNb3N0KTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJsdGVcIiwgYXNzZXJ0TW9zdCk7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwibGVzc1RoYW5PckVxdWFsXCIsIGFzc2VydE1vc3QpO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcIndpdGhpblwiLCBmdW5jdGlvbihzdGFydCwgZmluaXNoLCBtc2cpIHtcbiAgaWYgKG1zZykgZmxhZzIodGhpcywgXCJtZXNzYWdlXCIsIG1zZyk7XG4gIGxldCBvYmogPSBmbGFnMih0aGlzLCBcIm9iamVjdFwiKSwgZG9MZW5ndGggPSBmbGFnMih0aGlzLCBcImRvTGVuZ3RoXCIpLCBmbGFnTXNnID0gZmxhZzIodGhpcywgXCJtZXNzYWdlXCIpLCBtc2dQcmVmaXggPSBmbGFnTXNnID8gZmxhZ01zZyArIFwiOiBcIiA6IFwiXCIsIHNzZmkgPSBmbGFnMih0aGlzLCBcInNzZmlcIiksIG9ialR5cGUgPSB0eXBlKG9iaikudG9Mb3dlckNhc2UoKSwgc3RhcnRUeXBlID0gdHlwZShzdGFydCkudG9Mb3dlckNhc2UoKSwgZmluaXNoVHlwZSA9IHR5cGUoZmluaXNoKS50b0xvd2VyQ2FzZSgpLCBlcnJvck1lc3NhZ2UsIHNob3VsZFRocm93ID0gdHJ1ZSwgcmFuZ2UgPSBzdGFydFR5cGUgPT09IFwiZGF0ZVwiICYmIGZpbmlzaFR5cGUgPT09IFwiZGF0ZVwiID8gc3RhcnQudG9JU09TdHJpbmcoKSArIFwiLi5cIiArIGZpbmlzaC50b0lTT1N0cmluZygpIDogc3RhcnQgKyBcIi4uXCIgKyBmaW5pc2g7XG4gIGlmIChkb0xlbmd0aCAmJiBvYmpUeXBlICE9PSBcIm1hcFwiICYmIG9ialR5cGUgIT09IFwic2V0XCIpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKG9iaiwgZmxhZ01zZywgc3NmaSwgdHJ1ZSkudG8uaGF2ZS5wcm9wZXJ0eShcImxlbmd0aFwiKTtcbiAgfVxuICBpZiAoIWRvTGVuZ3RoICYmIG9ialR5cGUgPT09IFwiZGF0ZVwiICYmIChzdGFydFR5cGUgIT09IFwiZGF0ZVwiIHx8IGZpbmlzaFR5cGUgIT09IFwiZGF0ZVwiKSkge1xuICAgIGVycm9yTWVzc2FnZSA9IG1zZ1ByZWZpeCArIFwidGhlIGFyZ3VtZW50cyB0byB3aXRoaW4gbXVzdCBiZSBkYXRlc1wiO1xuICB9IGVsc2UgaWYgKCghaXNOdW1lcmljKHN0YXJ0KSB8fCAhaXNOdW1lcmljKGZpbmlzaCkpICYmIChkb0xlbmd0aCB8fCBpc051bWVyaWMob2JqKSkpIHtcbiAgICBlcnJvck1lc3NhZ2UgPSBtc2dQcmVmaXggKyBcInRoZSBhcmd1bWVudHMgdG8gd2l0aGluIG11c3QgYmUgbnVtYmVyc1wiO1xuICB9IGVsc2UgaWYgKCFkb0xlbmd0aCAmJiBvYmpUeXBlICE9PSBcImRhdGVcIiAmJiAhaXNOdW1lcmljKG9iaikpIHtcbiAgICBsZXQgcHJpbnRPYmogPSBvYmpUeXBlID09PSBcInN0cmluZ1wiID8gXCInXCIgKyBvYmogKyBcIidcIiA6IG9iajtcbiAgICBlcnJvck1lc3NhZ2UgPSBtc2dQcmVmaXggKyBcImV4cGVjdGVkIFwiICsgcHJpbnRPYmogKyBcIiB0byBiZSBhIG51bWJlciBvciBhIGRhdGVcIjtcbiAgfSBlbHNlIHtcbiAgICBzaG91bGRUaHJvdyA9IGZhbHNlO1xuICB9XG4gIGlmIChzaG91bGRUaHJvdykge1xuICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihlcnJvck1lc3NhZ2UsIHZvaWQgMCwgc3NmaSk7XG4gIH1cbiAgaWYgKGRvTGVuZ3RoKSB7XG4gICAgbGV0IGRlc2NyaXB0b3IgPSBcImxlbmd0aFwiLCBpdGVtc0NvdW50O1xuICAgIGlmIChvYmpUeXBlID09PSBcIm1hcFwiIHx8IG9ialR5cGUgPT09IFwic2V0XCIpIHtcbiAgICAgIGRlc2NyaXB0b3IgPSBcInNpemVcIjtcbiAgICAgIGl0ZW1zQ291bnQgPSBvYmouc2l6ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaXRlbXNDb3VudCA9IG9iai5sZW5ndGg7XG4gICAgfVxuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgaXRlbXNDb3VudCA+PSBzdGFydCAmJiBpdGVtc0NvdW50IDw9IGZpbmlzaCxcbiAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBoYXZlIGEgXCIgKyBkZXNjcmlwdG9yICsgXCIgd2l0aGluIFwiICsgcmFuZ2UsXG4gICAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gbm90IGhhdmUgYSBcIiArIGRlc2NyaXB0b3IgKyBcIiB3aXRoaW4gXCIgKyByYW5nZVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICBvYmogPj0gc3RhcnQgJiYgb2JqIDw9IGZpbmlzaCxcbiAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSB3aXRoaW4gXCIgKyByYW5nZSxcbiAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgYmUgd2l0aGluIFwiICsgcmFuZ2VcbiAgICApO1xuICB9XG59KTtcbmZ1bmN0aW9uIGFzc2VydEluc3RhbmNlT2YoY29uc3RydWN0b3IsIG1zZykge1xuICBpZiAobXNnKSBmbGFnMih0aGlzLCBcIm1lc3NhZ2VcIiwgbXNnKTtcbiAgbGV0IHRhcmdldCA9IGZsYWcyKHRoaXMsIFwib2JqZWN0XCIpO1xuICBsZXQgc3NmaSA9IGZsYWcyKHRoaXMsIFwic3NmaVwiKTtcbiAgbGV0IGZsYWdNc2cgPSBmbGFnMih0aGlzLCBcIm1lc3NhZ2VcIik7XG4gIGxldCBpc0luc3RhbmNlT2Y7XG4gIHRyeSB7XG4gICAgaXNJbnN0YW5jZU9mID0gdGFyZ2V0IGluc3RhbmNlb2YgY29uc3RydWN0b3I7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGlmIChlcnIgaW5zdGFuY2VvZiBUeXBlRXJyb3IpIHtcbiAgICAgIGZsYWdNc2cgPSBmbGFnTXNnID8gZmxhZ01zZyArIFwiOiBcIiA6IFwiXCI7XG4gICAgICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IoXG4gICAgICAgIGZsYWdNc2cgKyBcIlRoZSBpbnN0YW5jZW9mIGFzc2VydGlvbiBuZWVkcyBhIGNvbnN0cnVjdG9yIGJ1dCBcIiArIHR5cGUoY29uc3RydWN0b3IpICsgXCIgd2FzIGdpdmVuLlwiLFxuICAgICAgICB2b2lkIDAsXG4gICAgICAgIHNzZmlcbiAgICAgICk7XG4gICAgfVxuICAgIHRocm93IGVycjtcbiAgfVxuICBsZXQgbmFtZSA9IGdldE5hbWUoY29uc3RydWN0b3IpO1xuICBpZiAobmFtZSA9PSBudWxsKSB7XG4gICAgbmFtZSA9IFwiYW4gdW5uYW1lZCBjb25zdHJ1Y3RvclwiO1xuICB9XG4gIHRoaXMuYXNzZXJ0KFxuICAgIGlzSW5zdGFuY2VPZixcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gYmUgYW4gaW5zdGFuY2Ugb2YgXCIgKyBuYW1lLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgYmUgYW4gaW5zdGFuY2Ugb2YgXCIgKyBuYW1lXG4gICk7XG59XG5fX25hbWUoYXNzZXJ0SW5zdGFuY2VPZiwgXCJhc3NlcnRJbnN0YW5jZU9mXCIpO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcImluc3RhbmNlb2ZcIiwgYXNzZXJ0SW5zdGFuY2VPZik7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwiaW5zdGFuY2VPZlwiLCBhc3NlcnRJbnN0YW5jZU9mKTtcbmZ1bmN0aW9uIGFzc2VydFByb3BlcnR5KG5hbWUsIHZhbCwgbXNnKSB7XG4gIGlmIChtc2cpIGZsYWcyKHRoaXMsIFwibWVzc2FnZVwiLCBtc2cpO1xuICBsZXQgaXNOZXN0ZWQgPSBmbGFnMih0aGlzLCBcIm5lc3RlZFwiKSwgaXNPd24gPSBmbGFnMih0aGlzLCBcIm93blwiKSwgZmxhZ01zZyA9IGZsYWcyKHRoaXMsIFwibWVzc2FnZVwiKSwgb2JqID0gZmxhZzIodGhpcywgXCJvYmplY3RcIiksIHNzZmkgPSBmbGFnMih0aGlzLCBcInNzZmlcIiksIG5hbWVUeXBlID0gdHlwZW9mIG5hbWU7XG4gIGZsYWdNc2cgPSBmbGFnTXNnID8gZmxhZ01zZyArIFwiOiBcIiA6IFwiXCI7XG4gIGlmIChpc05lc3RlZCkge1xuICAgIGlmIChuYW1lVHlwZSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgdGhyb3cgbmV3IEFzc2VydGlvbkVycm9yKFxuICAgICAgICBmbGFnTXNnICsgXCJ0aGUgYXJndW1lbnQgdG8gcHJvcGVydHkgbXVzdCBiZSBhIHN0cmluZyB3aGVuIHVzaW5nIG5lc3RlZCBzeW50YXhcIixcbiAgICAgICAgdm9pZCAwLFxuICAgICAgICBzc2ZpXG4gICAgICApO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAobmFtZVR5cGUgIT09IFwic3RyaW5nXCIgJiYgbmFtZVR5cGUgIT09IFwibnVtYmVyXCIgJiYgbmFtZVR5cGUgIT09IFwic3ltYm9sXCIpIHtcbiAgICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihcbiAgICAgICAgZmxhZ01zZyArIFwidGhlIGFyZ3VtZW50IHRvIHByb3BlcnR5IG11c3QgYmUgYSBzdHJpbmcsIG51bWJlciwgb3Igc3ltYm9sXCIsXG4gICAgICAgIHZvaWQgMCxcbiAgICAgICAgc3NmaVxuICAgICAgKTtcbiAgICB9XG4gIH1cbiAgaWYgKGlzTmVzdGVkICYmIGlzT3duKSB7XG4gICAgdGhyb3cgbmV3IEFzc2VydGlvbkVycm9yKFxuICAgICAgZmxhZ01zZyArICdUaGUgXCJuZXN0ZWRcIiBhbmQgXCJvd25cIiBmbGFncyBjYW5ub3QgYmUgY29tYmluZWQuJyxcbiAgICAgIHZvaWQgMCxcbiAgICAgIHNzZmlcbiAgICApO1xuICB9XG4gIGlmIChvYmogPT09IG51bGwgfHwgb2JqID09PSB2b2lkIDApIHtcbiAgICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IoXG4gICAgICBmbGFnTXNnICsgXCJUYXJnZXQgY2Fubm90IGJlIG51bGwgb3IgdW5kZWZpbmVkLlwiLFxuICAgICAgdm9pZCAwLFxuICAgICAgc3NmaVxuICAgICk7XG4gIH1cbiAgbGV0IGlzRGVlcCA9IGZsYWcyKHRoaXMsIFwiZGVlcFwiKSwgbmVnYXRlID0gZmxhZzIodGhpcywgXCJuZWdhdGVcIiksIHBhdGhJbmZvID0gaXNOZXN0ZWQgPyBnZXRQYXRoSW5mbyhvYmosIG5hbWUpIDogbnVsbCwgdmFsdWUgPSBpc05lc3RlZCA/IHBhdGhJbmZvLnZhbHVlIDogb2JqW25hbWVdLCBpc0VxbCA9IGlzRGVlcCA/IGZsYWcyKHRoaXMsIFwiZXFsXCIpIDogKHZhbDEsIHZhbDIpID0+IHZhbDEgPT09IHZhbDI7XG4gIGxldCBkZXNjcmlwdG9yID0gXCJcIjtcbiAgaWYgKGlzRGVlcCkgZGVzY3JpcHRvciArPSBcImRlZXAgXCI7XG4gIGlmIChpc093bikgZGVzY3JpcHRvciArPSBcIm93biBcIjtcbiAgaWYgKGlzTmVzdGVkKSBkZXNjcmlwdG9yICs9IFwibmVzdGVkIFwiO1xuICBkZXNjcmlwdG9yICs9IFwicHJvcGVydHkgXCI7XG4gIGxldCBoYXNQcm9wZXJ0eTI7XG4gIGlmIChpc093bikgaGFzUHJvcGVydHkyID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgbmFtZSk7XG4gIGVsc2UgaWYgKGlzTmVzdGVkKSBoYXNQcm9wZXJ0eTIgPSBwYXRoSW5mby5leGlzdHM7XG4gIGVsc2UgaGFzUHJvcGVydHkyID0gaGFzUHJvcGVydHkob2JqLCBuYW1lKTtcbiAgaWYgKCFuZWdhdGUgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgaGFzUHJvcGVydHkyLFxuICAgICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGhhdmUgXCIgKyBkZXNjcmlwdG9yICsgaW5zcGVjdDIobmFtZSksXG4gICAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gbm90IGhhdmUgXCIgKyBkZXNjcmlwdG9yICsgaW5zcGVjdDIobmFtZSlcbiAgICApO1xuICB9XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgaGFzUHJvcGVydHkyICYmIGlzRXFsKHZhbCwgdmFsdWUpLFxuICAgICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGhhdmUgXCIgKyBkZXNjcmlwdG9yICsgaW5zcGVjdDIobmFtZSkgKyBcIiBvZiAje2V4cH0sIGJ1dCBnb3QgI3thY3R9XCIsXG4gICAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gbm90IGhhdmUgXCIgKyBkZXNjcmlwdG9yICsgaW5zcGVjdDIobmFtZSkgKyBcIiBvZiAje2FjdH1cIixcbiAgICAgIHZhbCxcbiAgICAgIHZhbHVlXG4gICAgKTtcbiAgfVxuICBmbGFnMih0aGlzLCBcIm9iamVjdFwiLCB2YWx1ZSk7XG59XG5fX25hbWUoYXNzZXJ0UHJvcGVydHksIFwiYXNzZXJ0UHJvcGVydHlcIik7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwicHJvcGVydHlcIiwgYXNzZXJ0UHJvcGVydHkpO1xuZnVuY3Rpb24gYXNzZXJ0T3duUHJvcGVydHkoX25hbWUsIF92YWx1ZSwgX21zZykge1xuICBmbGFnMih0aGlzLCBcIm93blwiLCB0cnVlKTtcbiAgYXNzZXJ0UHJvcGVydHkuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cbl9fbmFtZShhc3NlcnRPd25Qcm9wZXJ0eSwgXCJhc3NlcnRPd25Qcm9wZXJ0eVwiKTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJvd25Qcm9wZXJ0eVwiLCBhc3NlcnRPd25Qcm9wZXJ0eSk7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwiaGF2ZU93blByb3BlcnR5XCIsIGFzc2VydE93blByb3BlcnR5KTtcbmZ1bmN0aW9uIGFzc2VydE93blByb3BlcnR5RGVzY3JpcHRvcihuYW1lLCBkZXNjcmlwdG9yLCBtc2cpIHtcbiAgaWYgKHR5cGVvZiBkZXNjcmlwdG9yID09PSBcInN0cmluZ1wiKSB7XG4gICAgbXNnID0gZGVzY3JpcHRvcjtcbiAgICBkZXNjcmlwdG9yID0gbnVsbDtcbiAgfVxuICBpZiAobXNnKSBmbGFnMih0aGlzLCBcIm1lc3NhZ2VcIiwgbXNnKTtcbiAgbGV0IG9iaiA9IGZsYWcyKHRoaXMsIFwib2JqZWN0XCIpO1xuICBsZXQgYWN0dWFsRGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoT2JqZWN0KG9iaiksIG5hbWUpO1xuICBsZXQgZXFsID0gZmxhZzIodGhpcywgXCJlcWxcIik7XG4gIGlmIChhY3R1YWxEZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IpIHtcbiAgICB0aGlzLmFzc2VydChcbiAgICAgIGVxbChkZXNjcmlwdG9yLCBhY3R1YWxEZXNjcmlwdG9yKSxcbiAgICAgIFwiZXhwZWN0ZWQgdGhlIG93biBwcm9wZXJ0eSBkZXNjcmlwdG9yIGZvciBcIiArIGluc3BlY3QyKG5hbWUpICsgXCIgb24gI3t0aGlzfSB0byBtYXRjaCBcIiArIGluc3BlY3QyKGRlc2NyaXB0b3IpICsgXCIsIGdvdCBcIiArIGluc3BlY3QyKGFjdHVhbERlc2NyaXB0b3IpLFxuICAgICAgXCJleHBlY3RlZCB0aGUgb3duIHByb3BlcnR5IGRlc2NyaXB0b3IgZm9yIFwiICsgaW5zcGVjdDIobmFtZSkgKyBcIiBvbiAje3RoaXN9IHRvIG5vdCBtYXRjaCBcIiArIGluc3BlY3QyKGRlc2NyaXB0b3IpLFxuICAgICAgZGVzY3JpcHRvcixcbiAgICAgIGFjdHVhbERlc2NyaXB0b3IsXG4gICAgICB0cnVlXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmFzc2VydChcbiAgICAgIGFjdHVhbERlc2NyaXB0b3IsXG4gICAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gaGF2ZSBhbiBvd24gcHJvcGVydHkgZGVzY3JpcHRvciBmb3IgXCIgKyBpbnNwZWN0MihuYW1lKSxcbiAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgaGF2ZSBhbiBvd24gcHJvcGVydHkgZGVzY3JpcHRvciBmb3IgXCIgKyBpbnNwZWN0MihuYW1lKVxuICAgICk7XG4gIH1cbiAgZmxhZzIodGhpcywgXCJvYmplY3RcIiwgYWN0dWFsRGVzY3JpcHRvcik7XG59XG5fX25hbWUoYXNzZXJ0T3duUHJvcGVydHlEZXNjcmlwdG9yLCBcImFzc2VydE93blByb3BlcnR5RGVzY3JpcHRvclwiKTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJvd25Qcm9wZXJ0eURlc2NyaXB0b3JcIiwgYXNzZXJ0T3duUHJvcGVydHlEZXNjcmlwdG9yKTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJoYXZlT3duUHJvcGVydHlEZXNjcmlwdG9yXCIsIGFzc2VydE93blByb3BlcnR5RGVzY3JpcHRvcik7XG5mdW5jdGlvbiBhc3NlcnRMZW5ndGhDaGFpbigpIHtcbiAgZmxhZzIodGhpcywgXCJkb0xlbmd0aFwiLCB0cnVlKTtcbn1cbl9fbmFtZShhc3NlcnRMZW5ndGhDaGFpbiwgXCJhc3NlcnRMZW5ndGhDaGFpblwiKTtcbmZ1bmN0aW9uIGFzc2VydExlbmd0aChuLCBtc2cpIHtcbiAgaWYgKG1zZykgZmxhZzIodGhpcywgXCJtZXNzYWdlXCIsIG1zZyk7XG4gIGxldCBvYmogPSBmbGFnMih0aGlzLCBcIm9iamVjdFwiKSwgb2JqVHlwZSA9IHR5cGUob2JqKS50b0xvd2VyQ2FzZSgpLCBmbGFnTXNnID0gZmxhZzIodGhpcywgXCJtZXNzYWdlXCIpLCBzc2ZpID0gZmxhZzIodGhpcywgXCJzc2ZpXCIpLCBkZXNjcmlwdG9yID0gXCJsZW5ndGhcIiwgaXRlbXNDb3VudDtcbiAgc3dpdGNoIChvYmpUeXBlKSB7XG4gICAgY2FzZSBcIm1hcFwiOlxuICAgIGNhc2UgXCJzZXRcIjpcbiAgICAgIGRlc2NyaXB0b3IgPSBcInNpemVcIjtcbiAgICAgIGl0ZW1zQ291bnQgPSBvYmouc2l6ZTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBuZXcgQXNzZXJ0aW9uKG9iaiwgZmxhZ01zZywgc3NmaSwgdHJ1ZSkudG8uaGF2ZS5wcm9wZXJ0eShcImxlbmd0aFwiKTtcbiAgICAgIGl0ZW1zQ291bnQgPSBvYmoubGVuZ3RoO1xuICB9XG4gIHRoaXMuYXNzZXJ0KFxuICAgIGl0ZW1zQ291bnQgPT0gbixcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gaGF2ZSBhIFwiICsgZGVzY3JpcHRvciArIFwiIG9mICN7ZXhwfSBidXQgZ290ICN7YWN0fVwiLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgaGF2ZSBhIFwiICsgZGVzY3JpcHRvciArIFwiIG9mICN7YWN0fVwiLFxuICAgIG4sXG4gICAgaXRlbXNDb3VudFxuICApO1xufVxuX19uYW1lKGFzc2VydExlbmd0aCwgXCJhc3NlcnRMZW5ndGhcIik7XG5Bc3NlcnRpb24uYWRkQ2hhaW5hYmxlTWV0aG9kKFwibGVuZ3RoXCIsIGFzc2VydExlbmd0aCwgYXNzZXJ0TGVuZ3RoQ2hhaW4pO1xuQXNzZXJ0aW9uLmFkZENoYWluYWJsZU1ldGhvZChcImxlbmd0aE9mXCIsIGFzc2VydExlbmd0aCwgYXNzZXJ0TGVuZ3RoQ2hhaW4pO1xuZnVuY3Rpb24gYXNzZXJ0TWF0Y2gocmUsIG1zZykge1xuICBpZiAobXNnKSBmbGFnMih0aGlzLCBcIm1lc3NhZ2VcIiwgbXNnKTtcbiAgbGV0IG9iaiA9IGZsYWcyKHRoaXMsIFwib2JqZWN0XCIpO1xuICB0aGlzLmFzc2VydChcbiAgICByZS5leGVjKG9iaiksXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIG1hdGNoIFwiICsgcmUsXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IG5vdCB0byBtYXRjaCBcIiArIHJlXG4gICk7XG59XG5fX25hbWUoYXNzZXJ0TWF0Y2gsIFwiYXNzZXJ0TWF0Y2hcIik7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwibWF0Y2hcIiwgYXNzZXJ0TWF0Y2gpO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcIm1hdGNoZXNcIiwgYXNzZXJ0TWF0Y2gpO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcInN0cmluZ1wiLCBmdW5jdGlvbihzdHIsIG1zZykge1xuICBpZiAobXNnKSBmbGFnMih0aGlzLCBcIm1lc3NhZ2VcIiwgbXNnKTtcbiAgbGV0IG9iaiA9IGZsYWcyKHRoaXMsIFwib2JqZWN0XCIpLCBmbGFnTXNnID0gZmxhZzIodGhpcywgXCJtZXNzYWdlXCIpLCBzc2ZpID0gZmxhZzIodGhpcywgXCJzc2ZpXCIpO1xuICBuZXcgQXNzZXJ0aW9uKG9iaiwgZmxhZ01zZywgc3NmaSwgdHJ1ZSkuaXMuYShcInN0cmluZ1wiKTtcbiAgdGhpcy5hc3NlcnQoXG4gICAgfm9iai5pbmRleE9mKHN0ciksXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGNvbnRhaW4gXCIgKyBpbnNwZWN0MihzdHIpLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgY29udGFpbiBcIiArIGluc3BlY3QyKHN0cilcbiAgKTtcbn0pO1xuZnVuY3Rpb24gYXNzZXJ0S2V5cyhrZXlzKSB7XG4gIGxldCBvYmogPSBmbGFnMih0aGlzLCBcIm9iamVjdFwiKSwgb2JqVHlwZSA9IHR5cGUob2JqKSwga2V5c1R5cGUgPSB0eXBlKGtleXMpLCBzc2ZpID0gZmxhZzIodGhpcywgXCJzc2ZpXCIpLCBpc0RlZXAgPSBmbGFnMih0aGlzLCBcImRlZXBcIiksIHN0ciwgZGVlcFN0ciA9IFwiXCIsIGFjdHVhbCwgb2sgPSB0cnVlLCBmbGFnTXNnID0gZmxhZzIodGhpcywgXCJtZXNzYWdlXCIpO1xuICBmbGFnTXNnID0gZmxhZ01zZyA/IGZsYWdNc2cgKyBcIjogXCIgOiBcIlwiO1xuICBsZXQgbWl4ZWRBcmdzTXNnID0gZmxhZ01zZyArIFwid2hlbiB0ZXN0aW5nIGtleXMgYWdhaW5zdCBhbiBvYmplY3Qgb3IgYW4gYXJyYXkgeW91IG11c3QgZ2l2ZSBhIHNpbmdsZSBBcnJheXxPYmplY3R8U3RyaW5nIGFyZ3VtZW50IG9yIG11bHRpcGxlIFN0cmluZyBhcmd1bWVudHNcIjtcbiAgaWYgKG9ialR5cGUgPT09IFwiTWFwXCIgfHwgb2JqVHlwZSA9PT0gXCJTZXRcIikge1xuICAgIGRlZXBTdHIgPSBpc0RlZXAgPyBcImRlZXBseSBcIiA6IFwiXCI7XG4gICAgYWN0dWFsID0gW107XG4gICAgb2JqLmZvckVhY2goZnVuY3Rpb24odmFsLCBrZXkpIHtcbiAgICAgIGFjdHVhbC5wdXNoKGtleSk7XG4gICAgfSk7XG4gICAgaWYgKGtleXNUeXBlICE9PSBcIkFycmF5XCIpIHtcbiAgICAgIGtleXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBhY3R1YWwgPSBnZXRPd25FbnVtZXJhYmxlUHJvcGVydGllcyhvYmopO1xuICAgIHN3aXRjaCAoa2V5c1R5cGUpIHtcbiAgICAgIGNhc2UgXCJBcnJheVwiOlxuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IobWl4ZWRBcmdzTXNnLCB2b2lkIDAsIHNzZmkpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIk9iamVjdFwiOlxuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IobWl4ZWRBcmdzTXNnLCB2b2lkIDAsIHNzZmkpO1xuICAgICAgICB9XG4gICAgICAgIGtleXMgPSBPYmplY3Qua2V5cyhrZXlzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBrZXlzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICB9XG4gICAga2V5cyA9IGtleXMubWFwKGZ1bmN0aW9uKHZhbCkge1xuICAgICAgcmV0dXJuIHR5cGVvZiB2YWwgPT09IFwic3ltYm9sXCIgPyB2YWwgOiBTdHJpbmcodmFsKTtcbiAgICB9KTtcbiAgfVxuICBpZiAoIWtleXMubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IEFzc2VydGlvbkVycm9yKGZsYWdNc2cgKyBcImtleXMgcmVxdWlyZWRcIiwgdm9pZCAwLCBzc2ZpKTtcbiAgfVxuICBsZXQgbGVuID0ga2V5cy5sZW5ndGgsIGFueSA9IGZsYWcyKHRoaXMsIFwiYW55XCIpLCBhbGwgPSBmbGFnMih0aGlzLCBcImFsbFwiKSwgZXhwZWN0ZWQgPSBrZXlzLCBpc0VxbCA9IGlzRGVlcCA/IGZsYWcyKHRoaXMsIFwiZXFsXCIpIDogKHZhbDEsIHZhbDIpID0+IHZhbDEgPT09IHZhbDI7XG4gIGlmICghYW55ICYmICFhbGwpIHtcbiAgICBhbGwgPSB0cnVlO1xuICB9XG4gIGlmIChhbnkpIHtcbiAgICBvayA9IGV4cGVjdGVkLnNvbWUoZnVuY3Rpb24oZXhwZWN0ZWRLZXkpIHtcbiAgICAgIHJldHVybiBhY3R1YWwuc29tZShmdW5jdGlvbihhY3R1YWxLZXkpIHtcbiAgICAgICAgcmV0dXJuIGlzRXFsKGV4cGVjdGVkS2V5LCBhY3R1YWxLZXkpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgaWYgKGFsbCkge1xuICAgIG9rID0gZXhwZWN0ZWQuZXZlcnkoZnVuY3Rpb24oZXhwZWN0ZWRLZXkpIHtcbiAgICAgIHJldHVybiBhY3R1YWwuc29tZShmdW5jdGlvbihhY3R1YWxLZXkpIHtcbiAgICAgICAgcmV0dXJuIGlzRXFsKGV4cGVjdGVkS2V5LCBhY3R1YWxLZXkpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgaWYgKCFmbGFnMih0aGlzLCBcImNvbnRhaW5zXCIpKSB7XG4gICAgICBvayA9IG9rICYmIGtleXMubGVuZ3RoID09IGFjdHVhbC5sZW5ndGg7XG4gICAgfVxuICB9XG4gIGlmIChsZW4gPiAxKSB7XG4gICAga2V5cyA9IGtleXMubWFwKGZ1bmN0aW9uKGtleSkge1xuICAgICAgcmV0dXJuIGluc3BlY3QyKGtleSk7XG4gICAgfSk7XG4gICAgbGV0IGxhc3QgPSBrZXlzLnBvcCgpO1xuICAgIGlmIChhbGwpIHtcbiAgICAgIHN0ciA9IGtleXMuam9pbihcIiwgXCIpICsgXCIsIGFuZCBcIiArIGxhc3Q7XG4gICAgfVxuICAgIGlmIChhbnkpIHtcbiAgICAgIHN0ciA9IGtleXMuam9pbihcIiwgXCIpICsgXCIsIG9yIFwiICsgbGFzdDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgc3RyID0gaW5zcGVjdDIoa2V5c1swXSk7XG4gIH1cbiAgc3RyID0gKGxlbiA+IDEgPyBcImtleXMgXCIgOiBcImtleSBcIikgKyBzdHI7XG4gIHN0ciA9IChmbGFnMih0aGlzLCBcImNvbnRhaW5zXCIpID8gXCJjb250YWluIFwiIDogXCJoYXZlIFwiKSArIHN0cjtcbiAgdGhpcy5hc3NlcnQoXG4gICAgb2ssXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIFwiICsgZGVlcFN0ciArIHN0cixcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gbm90IFwiICsgZGVlcFN0ciArIHN0cixcbiAgICBleHBlY3RlZC5zbGljZSgwKS5zb3J0KGNvbXBhcmVCeUluc3BlY3QpLFxuICAgIGFjdHVhbC5zb3J0KGNvbXBhcmVCeUluc3BlY3QpLFxuICAgIHRydWVcbiAgKTtcbn1cbl9fbmFtZShhc3NlcnRLZXlzLCBcImFzc2VydEtleXNcIik7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwia2V5c1wiLCBhc3NlcnRLZXlzKTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJrZXlcIiwgYXNzZXJ0S2V5cyk7XG5mdW5jdGlvbiBhc3NlcnRUaHJvd3MoZXJyb3JMaWtlLCBlcnJNc2dNYXRjaGVyLCBtc2cpIHtcbiAgaWYgKG1zZykgZmxhZzIodGhpcywgXCJtZXNzYWdlXCIsIG1zZyk7XG4gIGxldCBvYmogPSBmbGFnMih0aGlzLCBcIm9iamVjdFwiKSwgc3NmaSA9IGZsYWcyKHRoaXMsIFwic3NmaVwiKSwgZmxhZ01zZyA9IGZsYWcyKHRoaXMsIFwibWVzc2FnZVwiKSwgbmVnYXRlID0gZmxhZzIodGhpcywgXCJuZWdhdGVcIikgfHwgZmFsc2U7XG4gIG5ldyBBc3NlcnRpb24ob2JqLCBmbGFnTXNnLCBzc2ZpLCB0cnVlKS5pcy5hKFwiZnVuY3Rpb25cIik7XG4gIGlmIChpc1JlZ0V4cDIoZXJyb3JMaWtlKSB8fCB0eXBlb2YgZXJyb3JMaWtlID09PSBcInN0cmluZ1wiKSB7XG4gICAgZXJyTXNnTWF0Y2hlciA9IGVycm9yTGlrZTtcbiAgICBlcnJvckxpa2UgPSBudWxsO1xuICB9XG4gIGxldCBjYXVnaHRFcnI7XG4gIGxldCBlcnJvcldhc1Rocm93biA9IGZhbHNlO1xuICB0cnkge1xuICAgIG9iaigpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBlcnJvcldhc1Rocm93biA9IHRydWU7XG4gICAgY2F1Z2h0RXJyID0gZXJyO1xuICB9XG4gIGxldCBldmVyeUFyZ0lzVW5kZWZpbmVkID0gZXJyb3JMaWtlID09PSB2b2lkIDAgJiYgZXJyTXNnTWF0Y2hlciA9PT0gdm9pZCAwO1xuICBsZXQgZXZlcnlBcmdJc0RlZmluZWQgPSBCb29sZWFuKGVycm9yTGlrZSAmJiBlcnJNc2dNYXRjaGVyKTtcbiAgbGV0IGVycm9yTGlrZUZhaWwgPSBmYWxzZTtcbiAgbGV0IGVyck1zZ01hdGNoZXJGYWlsID0gZmFsc2U7XG4gIGlmIChldmVyeUFyZ0lzVW5kZWZpbmVkIHx8ICFldmVyeUFyZ0lzVW5kZWZpbmVkICYmICFuZWdhdGUpIHtcbiAgICBsZXQgZXJyb3JMaWtlU3RyaW5nID0gXCJhbiBlcnJvclwiO1xuICAgIGlmIChlcnJvckxpa2UgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgZXJyb3JMaWtlU3RyaW5nID0gXCIje2V4cH1cIjtcbiAgICB9IGVsc2UgaWYgKGVycm9yTGlrZSkge1xuICAgICAgZXJyb3JMaWtlU3RyaW5nID0gY2hlY2tfZXJyb3JfZXhwb3J0cy5nZXRDb25zdHJ1Y3Rvck5hbWUoZXJyb3JMaWtlKTtcbiAgICB9XG4gICAgbGV0IGFjdHVhbCA9IGNhdWdodEVycjtcbiAgICBpZiAoY2F1Z2h0RXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgIGFjdHVhbCA9IGNhdWdodEVyci50b1N0cmluZygpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGNhdWdodEVyciA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgYWN0dWFsID0gY2F1Z2h0RXJyO1xuICAgIH0gZWxzZSBpZiAoY2F1Z2h0RXJyICYmICh0eXBlb2YgY2F1Z2h0RXJyID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYXVnaHRFcnIgPT09IFwiZnVuY3Rpb25cIikpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGFjdHVhbCA9IGNoZWNrX2Vycm9yX2V4cG9ydHMuZ2V0Q29uc3RydWN0b3JOYW1lKGNhdWdodEVycik7XG4gICAgICB9IGNhdGNoIChfZXJyKSB7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgZXJyb3JXYXNUaHJvd24sXG4gICAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gdGhyb3cgXCIgKyBlcnJvckxpa2VTdHJpbmcsXG4gICAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gbm90IHRocm93IGFuIGVycm9yIGJ1dCAje2FjdH0gd2FzIHRocm93blwiLFxuICAgICAgZXJyb3JMaWtlICYmIGVycm9yTGlrZS50b1N0cmluZygpLFxuICAgICAgYWN0dWFsXG4gICAgKTtcbiAgfVxuICBpZiAoZXJyb3JMaWtlICYmIGNhdWdodEVycikge1xuICAgIGlmIChlcnJvckxpa2UgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgbGV0IGlzQ29tcGF0aWJsZUluc3RhbmNlID0gY2hlY2tfZXJyb3JfZXhwb3J0cy5jb21wYXRpYmxlSW5zdGFuY2UoXG4gICAgICAgIGNhdWdodEVycixcbiAgICAgICAgZXJyb3JMaWtlXG4gICAgICApO1xuICAgICAgaWYgKGlzQ29tcGF0aWJsZUluc3RhbmNlID09PSBuZWdhdGUpIHtcbiAgICAgICAgaWYgKGV2ZXJ5QXJnSXNEZWZpbmVkICYmIG5lZ2F0ZSkge1xuICAgICAgICAgIGVycm9yTGlrZUZhaWwgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICAgICAgbmVnYXRlLFxuICAgICAgICAgICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIHRocm93ICN7ZXhwfSBidXQgI3thY3R9IHdhcyB0aHJvd25cIixcbiAgICAgICAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgdGhyb3cgI3tleHB9XCIgKyAoY2F1Z2h0RXJyICYmICFuZWdhdGUgPyBcIiBidXQgI3thY3R9IHdhcyB0aHJvd25cIiA6IFwiXCIpLFxuICAgICAgICAgICAgZXJyb3JMaWtlLnRvU3RyaW5nKCksXG4gICAgICAgICAgICBjYXVnaHRFcnIudG9TdHJpbmcoKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgbGV0IGlzQ29tcGF0aWJsZUNvbnN0cnVjdG9yID0gY2hlY2tfZXJyb3JfZXhwb3J0cy5jb21wYXRpYmxlQ29uc3RydWN0b3IoXG4gICAgICBjYXVnaHRFcnIsXG4gICAgICBlcnJvckxpa2VcbiAgICApO1xuICAgIGlmIChpc0NvbXBhdGlibGVDb25zdHJ1Y3RvciA9PT0gbmVnYXRlKSB7XG4gICAgICBpZiAoZXZlcnlBcmdJc0RlZmluZWQgJiYgbmVnYXRlKSB7XG4gICAgICAgIGVycm9yTGlrZUZhaWwgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hc3NlcnQoXG4gICAgICAgICAgbmVnYXRlLFxuICAgICAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byB0aHJvdyAje2V4cH0gYnV0ICN7YWN0fSB3YXMgdGhyb3duXCIsXG4gICAgICAgICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIG5vdCB0aHJvdyAje2V4cH1cIiArIChjYXVnaHRFcnIgPyBcIiBidXQgI3thY3R9IHdhcyB0aHJvd25cIiA6IFwiXCIpLFxuICAgICAgICAgIGVycm9yTGlrZSBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3JMaWtlLnRvU3RyaW5nKCkgOiBlcnJvckxpa2UgJiYgY2hlY2tfZXJyb3JfZXhwb3J0cy5nZXRDb25zdHJ1Y3Rvck5hbWUoZXJyb3JMaWtlKSxcbiAgICAgICAgICBjYXVnaHRFcnIgaW5zdGFuY2VvZiBFcnJvciA/IGNhdWdodEVyci50b1N0cmluZygpIDogY2F1Z2h0RXJyICYmIGNoZWNrX2Vycm9yX2V4cG9ydHMuZ2V0Q29uc3RydWN0b3JOYW1lKGNhdWdodEVycilcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKGNhdWdodEVyciAmJiBlcnJNc2dNYXRjaGVyICE9PSB2b2lkIDAgJiYgZXJyTXNnTWF0Y2hlciAhPT0gbnVsbCkge1xuICAgIGxldCBwbGFjZWhvbGRlciA9IFwiaW5jbHVkaW5nXCI7XG4gICAgaWYgKGlzUmVnRXhwMihlcnJNc2dNYXRjaGVyKSkge1xuICAgICAgcGxhY2Vob2xkZXIgPSBcIm1hdGNoaW5nXCI7XG4gICAgfVxuICAgIGxldCBpc0NvbXBhdGlibGVNZXNzYWdlID0gY2hlY2tfZXJyb3JfZXhwb3J0cy5jb21wYXRpYmxlTWVzc2FnZShcbiAgICAgIGNhdWdodEVycixcbiAgICAgIGVyck1zZ01hdGNoZXJcbiAgICApO1xuICAgIGlmIChpc0NvbXBhdGlibGVNZXNzYWdlID09PSBuZWdhdGUpIHtcbiAgICAgIGlmIChldmVyeUFyZ0lzRGVmaW5lZCAmJiBuZWdhdGUpIHtcbiAgICAgICAgZXJyTXNnTWF0Y2hlckZhaWwgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hc3NlcnQoXG4gICAgICAgICAgbmVnYXRlLFxuICAgICAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byB0aHJvdyBlcnJvciBcIiArIHBsYWNlaG9sZGVyICsgXCIgI3tleHB9IGJ1dCBnb3QgI3thY3R9XCIsXG4gICAgICAgICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIHRocm93IGVycm9yIG5vdCBcIiArIHBsYWNlaG9sZGVyICsgXCIgI3tleHB9XCIsXG4gICAgICAgICAgZXJyTXNnTWF0Y2hlcixcbiAgICAgICAgICBjaGVja19lcnJvcl9leHBvcnRzLmdldE1lc3NhZ2UoY2F1Z2h0RXJyKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAoZXJyb3JMaWtlRmFpbCAmJiBlcnJNc2dNYXRjaGVyRmFpbCkge1xuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgbmVnYXRlLFxuICAgICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIHRocm93ICN7ZXhwfSBidXQgI3thY3R9IHdhcyB0aHJvd25cIixcbiAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgdGhyb3cgI3tleHB9XCIgKyAoY2F1Z2h0RXJyID8gXCIgYnV0ICN7YWN0fSB3YXMgdGhyb3duXCIgOiBcIlwiKSxcbiAgICAgIGVycm9yTGlrZSBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3JMaWtlLnRvU3RyaW5nKCkgOiBlcnJvckxpa2UgJiYgY2hlY2tfZXJyb3JfZXhwb3J0cy5nZXRDb25zdHJ1Y3Rvck5hbWUoZXJyb3JMaWtlKSxcbiAgICAgIGNhdWdodEVyciBpbnN0YW5jZW9mIEVycm9yID8gY2F1Z2h0RXJyLnRvU3RyaW5nKCkgOiBjYXVnaHRFcnIgJiYgY2hlY2tfZXJyb3JfZXhwb3J0cy5nZXRDb25zdHJ1Y3Rvck5hbWUoY2F1Z2h0RXJyKVxuICAgICk7XG4gIH1cbiAgZmxhZzIodGhpcywgXCJvYmplY3RcIiwgY2F1Z2h0RXJyKTtcbn1cbl9fbmFtZShhc3NlcnRUaHJvd3MsIFwiYXNzZXJ0VGhyb3dzXCIpO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcInRocm93XCIsIGFzc2VydFRocm93cyk7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwidGhyb3dzXCIsIGFzc2VydFRocm93cyk7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwiVGhyb3dcIiwgYXNzZXJ0VGhyb3dzKTtcbmZ1bmN0aW9uIHJlc3BvbmRUbyhtZXRob2QsIG1zZykge1xuICBpZiAobXNnKSBmbGFnMih0aGlzLCBcIm1lc3NhZ2VcIiwgbXNnKTtcbiAgbGV0IG9iaiA9IGZsYWcyKHRoaXMsIFwib2JqZWN0XCIpLCBpdHNlbGYgPSBmbGFnMih0aGlzLCBcIml0c2VsZlwiKSwgY29udGV4dCA9IFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIG9iaiAmJiAhaXRzZWxmID8gb2JqLnByb3RvdHlwZVttZXRob2RdIDogb2JqW21ldGhvZF07XG4gIHRoaXMuYXNzZXJ0KFxuICAgIFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIGNvbnRleHQsXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIHJlc3BvbmQgdG8gXCIgKyBpbnNwZWN0MihtZXRob2QpLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgcmVzcG9uZCB0byBcIiArIGluc3BlY3QyKG1ldGhvZClcbiAgKTtcbn1cbl9fbmFtZShyZXNwb25kVG8sIFwicmVzcG9uZFRvXCIpO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcInJlc3BvbmRUb1wiLCByZXNwb25kVG8pO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcInJlc3BvbmRzVG9cIiwgcmVzcG9uZFRvKTtcbkFzc2VydGlvbi5hZGRQcm9wZXJ0eShcIml0c2VsZlwiLCBmdW5jdGlvbigpIHtcbiAgZmxhZzIodGhpcywgXCJpdHNlbGZcIiwgdHJ1ZSk7XG59KTtcbmZ1bmN0aW9uIHNhdGlzZnkobWF0Y2hlciwgbXNnKSB7XG4gIGlmIChtc2cpIGZsYWcyKHRoaXMsIFwibWVzc2FnZVwiLCBtc2cpO1xuICBsZXQgb2JqID0gZmxhZzIodGhpcywgXCJvYmplY3RcIik7XG4gIGxldCByZXN1bHQgPSBtYXRjaGVyKG9iaik7XG4gIHRoaXMuYXNzZXJ0KFxuICAgIHJlc3VsdCxcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gc2F0aXNmeSBcIiArIG9iakRpc3BsYXkobWF0Y2hlciksXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBzYXRpc2Z5XCIgKyBvYmpEaXNwbGF5KG1hdGNoZXIpLFxuICAgIGZsYWcyKHRoaXMsIFwibmVnYXRlXCIpID8gZmFsc2UgOiB0cnVlLFxuICAgIHJlc3VsdFxuICApO1xufVxuX19uYW1lKHNhdGlzZnksIFwic2F0aXNmeVwiKTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJzYXRpc2Z5XCIsIHNhdGlzZnkpO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcInNhdGlzZmllc1wiLCBzYXRpc2Z5KTtcbmZ1bmN0aW9uIGNsb3NlVG8oZXhwZWN0ZWQsIGRlbHRhLCBtc2cpIHtcbiAgaWYgKG1zZykgZmxhZzIodGhpcywgXCJtZXNzYWdlXCIsIG1zZyk7XG4gIGxldCBvYmogPSBmbGFnMih0aGlzLCBcIm9iamVjdFwiKSwgZmxhZ01zZyA9IGZsYWcyKHRoaXMsIFwibWVzc2FnZVwiKSwgc3NmaSA9IGZsYWcyKHRoaXMsIFwic3NmaVwiKTtcbiAgbmV3IEFzc2VydGlvbihvYmosIGZsYWdNc2csIHNzZmksIHRydWUpLmlzLm51bWVyaWM7XG4gIGxldCBtZXNzYWdlID0gXCJBIGBkZWx0YWAgdmFsdWUgaXMgcmVxdWlyZWQgZm9yIGBjbG9zZVRvYFwiO1xuICBpZiAoZGVsdGEgPT0gdm9pZCAwKSB7XG4gICAgdGhyb3cgbmV3IEFzc2VydGlvbkVycm9yKFxuICAgICAgZmxhZ01zZyA/IGAke2ZsYWdNc2d9OiAke21lc3NhZ2V9YCA6IG1lc3NhZ2UsXG4gICAgICB2b2lkIDAsXG4gICAgICBzc2ZpXG4gICAgKTtcbiAgfVxuICBuZXcgQXNzZXJ0aW9uKGRlbHRhLCBmbGFnTXNnLCBzc2ZpLCB0cnVlKS5pcy5udW1lcmljO1xuICBtZXNzYWdlID0gXCJBIGBleHBlY3RlZGAgdmFsdWUgaXMgcmVxdWlyZWQgZm9yIGBjbG9zZVRvYFwiO1xuICBpZiAoZXhwZWN0ZWQgPT0gdm9pZCAwKSB7XG4gICAgdGhyb3cgbmV3IEFzc2VydGlvbkVycm9yKFxuICAgICAgZmxhZ01zZyA/IGAke2ZsYWdNc2d9OiAke21lc3NhZ2V9YCA6IG1lc3NhZ2UsXG4gICAgICB2b2lkIDAsXG4gICAgICBzc2ZpXG4gICAgKTtcbiAgfVxuICBuZXcgQXNzZXJ0aW9uKGV4cGVjdGVkLCBmbGFnTXNnLCBzc2ZpLCB0cnVlKS5pcy5udW1lcmljO1xuICBjb25zdCBhYnMgPSAvKiBAX19QVVJFX18gKi8gX19uYW1lKCh4KSA9PiB4IDwgMG4gPyAteCA6IHgsIFwiYWJzXCIpO1xuICBjb25zdCBzdHJpcCA9IC8qIEBfX1BVUkVfXyAqLyBfX25hbWUoKG51bWJlcikgPT4gcGFyc2VGbG9hdChwYXJzZUZsb2F0KG51bWJlcikudG9QcmVjaXNpb24oMTIpKSwgXCJzdHJpcFwiKTtcbiAgdGhpcy5hc3NlcnQoXG4gICAgc3RyaXAoYWJzKG9iaiAtIGV4cGVjdGVkKSkgPD0gZGVsdGEsXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGJlIGNsb3NlIHRvIFwiICsgZXhwZWN0ZWQgKyBcIiArLy0gXCIgKyBkZWx0YSxcbiAgICBcImV4cGVjdGVkICN7dGhpc30gbm90IHRvIGJlIGNsb3NlIHRvIFwiICsgZXhwZWN0ZWQgKyBcIiArLy0gXCIgKyBkZWx0YVxuICApO1xufVxuX19uYW1lKGNsb3NlVG8sIFwiY2xvc2VUb1wiKTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJjbG9zZVRvXCIsIGNsb3NlVG8pO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcImFwcHJveGltYXRlbHlcIiwgY2xvc2VUbyk7XG5mdW5jdGlvbiBpc1N1YnNldE9mKF9zdWJzZXQsIF9zdXBlcnNldCwgY21wLCBjb250YWlucywgb3JkZXJlZCkge1xuICBsZXQgc3VwZXJzZXQgPSBBcnJheS5mcm9tKF9zdXBlcnNldCk7XG4gIGxldCBzdWJzZXQgPSBBcnJheS5mcm9tKF9zdWJzZXQpO1xuICBpZiAoIWNvbnRhaW5zKSB7XG4gICAgaWYgKHN1YnNldC5sZW5ndGggIT09IHN1cGVyc2V0Lmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICAgIHN1cGVyc2V0ID0gc3VwZXJzZXQuc2xpY2UoKTtcbiAgfVxuICByZXR1cm4gc3Vic2V0LmV2ZXJ5KGZ1bmN0aW9uKGVsZW0sIGlkeCkge1xuICAgIGlmIChvcmRlcmVkKSByZXR1cm4gY21wID8gY21wKGVsZW0sIHN1cGVyc2V0W2lkeF0pIDogZWxlbSA9PT0gc3VwZXJzZXRbaWR4XTtcbiAgICBpZiAoIWNtcCkge1xuICAgICAgbGV0IG1hdGNoSWR4ID0gc3VwZXJzZXQuaW5kZXhPZihlbGVtKTtcbiAgICAgIGlmIChtYXRjaElkeCA9PT0gLTEpIHJldHVybiBmYWxzZTtcbiAgICAgIGlmICghY29udGFpbnMpIHN1cGVyc2V0LnNwbGljZShtYXRjaElkeCwgMSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHN1cGVyc2V0LnNvbWUoZnVuY3Rpb24oZWxlbTIsIG1hdGNoSWR4KSB7XG4gICAgICBpZiAoIWNtcChlbGVtLCBlbGVtMikpIHJldHVybiBmYWxzZTtcbiAgICAgIGlmICghY29udGFpbnMpIHN1cGVyc2V0LnNwbGljZShtYXRjaElkeCwgMSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcbiAgfSk7XG59XG5fX25hbWUoaXNTdWJzZXRPZiwgXCJpc1N1YnNldE9mXCIpO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcIm1lbWJlcnNcIiwgZnVuY3Rpb24oc3Vic2V0LCBtc2cpIHtcbiAgaWYgKG1zZykgZmxhZzIodGhpcywgXCJtZXNzYWdlXCIsIG1zZyk7XG4gIGxldCBvYmogPSBmbGFnMih0aGlzLCBcIm9iamVjdFwiKSwgZmxhZ01zZyA9IGZsYWcyKHRoaXMsIFwibWVzc2FnZVwiKSwgc3NmaSA9IGZsYWcyKHRoaXMsIFwic3NmaVwiKTtcbiAgbmV3IEFzc2VydGlvbihvYmosIGZsYWdNc2csIHNzZmksIHRydWUpLnRvLmJlLml0ZXJhYmxlO1xuICBuZXcgQXNzZXJ0aW9uKHN1YnNldCwgZmxhZ01zZywgc3NmaSwgdHJ1ZSkudG8uYmUuaXRlcmFibGU7XG4gIGxldCBjb250YWlucyA9IGZsYWcyKHRoaXMsIFwiY29udGFpbnNcIik7XG4gIGxldCBvcmRlcmVkID0gZmxhZzIodGhpcywgXCJvcmRlcmVkXCIpO1xuICBsZXQgc3ViamVjdCwgZmFpbE1zZywgZmFpbE5lZ2F0ZU1zZztcbiAgaWYgKGNvbnRhaW5zKSB7XG4gICAgc3ViamVjdCA9IG9yZGVyZWQgPyBcImFuIG9yZGVyZWQgc3VwZXJzZXRcIiA6IFwiYSBzdXBlcnNldFwiO1xuICAgIGZhaWxNc2cgPSBcImV4cGVjdGVkICN7dGhpc30gdG8gYmUgXCIgKyBzdWJqZWN0ICsgXCIgb2YgI3tleHB9XCI7XG4gICAgZmFpbE5lZ2F0ZU1zZyA9IFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgYmUgXCIgKyBzdWJqZWN0ICsgXCIgb2YgI3tleHB9XCI7XG4gIH0gZWxzZSB7XG4gICAgc3ViamVjdCA9IG9yZGVyZWQgPyBcIm9yZGVyZWQgbWVtYmVyc1wiIDogXCJtZW1iZXJzXCI7XG4gICAgZmFpbE1zZyA9IFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBoYXZlIHRoZSBzYW1lIFwiICsgc3ViamVjdCArIFwiIGFzICN7ZXhwfVwiO1xuICAgIGZhaWxOZWdhdGVNc2cgPSBcImV4cGVjdGVkICN7dGhpc30gdG8gbm90IGhhdmUgdGhlIHNhbWUgXCIgKyBzdWJqZWN0ICsgXCIgYXMgI3tleHB9XCI7XG4gIH1cbiAgbGV0IGNtcCA9IGZsYWcyKHRoaXMsIFwiZGVlcFwiKSA/IGZsYWcyKHRoaXMsIFwiZXFsXCIpIDogdm9pZCAwO1xuICB0aGlzLmFzc2VydChcbiAgICBpc1N1YnNldE9mKHN1YnNldCwgb2JqLCBjbXAsIGNvbnRhaW5zLCBvcmRlcmVkKSxcbiAgICBmYWlsTXNnLFxuICAgIGZhaWxOZWdhdGVNc2csXG4gICAgc3Vic2V0LFxuICAgIG9iaixcbiAgICB0cnVlXG4gICk7XG59KTtcbkFzc2VydGlvbi5hZGRQcm9wZXJ0eShcIml0ZXJhYmxlXCIsIGZ1bmN0aW9uKG1zZykge1xuICBpZiAobXNnKSBmbGFnMih0aGlzLCBcIm1lc3NhZ2VcIiwgbXNnKTtcbiAgbGV0IG9iaiA9IGZsYWcyKHRoaXMsIFwib2JqZWN0XCIpO1xuICB0aGlzLmFzc2VydChcbiAgICBvYmogIT0gdm9pZCAwICYmIG9ialtTeW1ib2wuaXRlcmF0b3JdLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBhbiBpdGVyYWJsZVwiLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgYmUgYW4gaXRlcmFibGVcIixcbiAgICBvYmpcbiAgKTtcbn0pO1xuZnVuY3Rpb24gb25lT2YobGlzdCwgbXNnKSB7XG4gIGlmIChtc2cpIGZsYWcyKHRoaXMsIFwibWVzc2FnZVwiLCBtc2cpO1xuICBsZXQgZXhwZWN0ZWQgPSBmbGFnMih0aGlzLCBcIm9iamVjdFwiKSwgZmxhZ01zZyA9IGZsYWcyKHRoaXMsIFwibWVzc2FnZVwiKSwgc3NmaSA9IGZsYWcyKHRoaXMsIFwic3NmaVwiKSwgY29udGFpbnMgPSBmbGFnMih0aGlzLCBcImNvbnRhaW5zXCIpLCBpc0RlZXAgPSBmbGFnMih0aGlzLCBcImRlZXBcIiksIGVxbCA9IGZsYWcyKHRoaXMsIFwiZXFsXCIpO1xuICBuZXcgQXNzZXJ0aW9uKGxpc3QsIGZsYWdNc2csIHNzZmksIHRydWUpLnRvLmJlLmFuKFwiYXJyYXlcIik7XG4gIGlmIChjb250YWlucykge1xuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgbGlzdC5zb21lKGZ1bmN0aW9uKHBvc3NpYmlsaXR5KSB7XG4gICAgICAgIHJldHVybiBleHBlY3RlZC5pbmRleE9mKHBvc3NpYmlsaXR5KSA+IC0xO1xuICAgICAgfSksXG4gICAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gY29udGFpbiBvbmUgb2YgI3tleHB9XCIsXG4gICAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gbm90IGNvbnRhaW4gb25lIG9mICN7ZXhwfVwiLFxuICAgICAgbGlzdCxcbiAgICAgIGV4cGVjdGVkXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoaXNEZWVwKSB7XG4gICAgICB0aGlzLmFzc2VydChcbiAgICAgICAgbGlzdC5zb21lKGZ1bmN0aW9uKHBvc3NpYmlsaXR5KSB7XG4gICAgICAgICAgcmV0dXJuIGVxbChleHBlY3RlZCwgcG9zc2liaWxpdHkpO1xuICAgICAgICB9KSxcbiAgICAgICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGRlZXBseSBlcXVhbCBvbmUgb2YgI3tleHB9XCIsXG4gICAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBkZWVwbHkgZXF1YWwgb25lIG9mICN7ZXhwfVwiLFxuICAgICAgICBsaXN0LFxuICAgICAgICBleHBlY3RlZFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hc3NlcnQoXG4gICAgICAgIGxpc3QuaW5kZXhPZihleHBlY3RlZCkgPiAtMSxcbiAgICAgICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGJlIG9uZSBvZiAje2V4cH1cIixcbiAgICAgICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBiZSBvbmUgb2YgI3tleHB9XCIsXG4gICAgICAgIGxpc3QsXG4gICAgICAgIGV4cGVjdGVkXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuX19uYW1lKG9uZU9mLCBcIm9uZU9mXCIpO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcIm9uZU9mXCIsIG9uZU9mKTtcbmZ1bmN0aW9uIGFzc2VydENoYW5nZXMoc3ViamVjdCwgcHJvcCwgbXNnKSB7XG4gIGlmIChtc2cpIGZsYWcyKHRoaXMsIFwibWVzc2FnZVwiLCBtc2cpO1xuICBsZXQgZm4gPSBmbGFnMih0aGlzLCBcIm9iamVjdFwiKSwgZmxhZ01zZyA9IGZsYWcyKHRoaXMsIFwibWVzc2FnZVwiKSwgc3NmaSA9IGZsYWcyKHRoaXMsIFwic3NmaVwiKTtcbiAgbmV3IEFzc2VydGlvbihmbiwgZmxhZ01zZywgc3NmaSwgdHJ1ZSkuaXMuYShcImZ1bmN0aW9uXCIpO1xuICBsZXQgaW5pdGlhbDtcbiAgaWYgKCFwcm9wKSB7XG4gICAgbmV3IEFzc2VydGlvbihzdWJqZWN0LCBmbGFnTXNnLCBzc2ZpLCB0cnVlKS5pcy5hKFwiZnVuY3Rpb25cIik7XG4gICAgaW5pdGlhbCA9IHN1YmplY3QoKTtcbiAgfSBlbHNlIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHN1YmplY3QsIGZsYWdNc2csIHNzZmksIHRydWUpLnRvLmhhdmUucHJvcGVydHkocHJvcCk7XG4gICAgaW5pdGlhbCA9IHN1YmplY3RbcHJvcF07XG4gIH1cbiAgZm4oKTtcbiAgbGV0IGZpbmFsID0gcHJvcCA9PT0gdm9pZCAwIHx8IHByb3AgPT09IG51bGwgPyBzdWJqZWN0KCkgOiBzdWJqZWN0W3Byb3BdO1xuICBsZXQgbXNnT2JqID0gcHJvcCA9PT0gdm9pZCAwIHx8IHByb3AgPT09IG51bGwgPyBpbml0aWFsIDogXCIuXCIgKyBwcm9wO1xuICBmbGFnMih0aGlzLCBcImRlbHRhTXNnT2JqXCIsIG1zZ09iaik7XG4gIGZsYWcyKHRoaXMsIFwiaW5pdGlhbERlbHRhVmFsdWVcIiwgaW5pdGlhbCk7XG4gIGZsYWcyKHRoaXMsIFwiZmluYWxEZWx0YVZhbHVlXCIsIGZpbmFsKTtcbiAgZmxhZzIodGhpcywgXCJkZWx0YUJlaGF2aW9yXCIsIFwiY2hhbmdlXCIpO1xuICBmbGFnMih0aGlzLCBcInJlYWxEZWx0YVwiLCBmaW5hbCAhPT0gaW5pdGlhbCk7XG4gIHRoaXMuYXNzZXJ0KFxuICAgIGluaXRpYWwgIT09IGZpbmFsLFxuICAgIFwiZXhwZWN0ZWQgXCIgKyBtc2dPYmogKyBcIiB0byBjaGFuZ2VcIixcbiAgICBcImV4cGVjdGVkIFwiICsgbXNnT2JqICsgXCIgdG8gbm90IGNoYW5nZVwiXG4gICk7XG59XG5fX25hbWUoYXNzZXJ0Q2hhbmdlcywgXCJhc3NlcnRDaGFuZ2VzXCIpO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcImNoYW5nZVwiLCBhc3NlcnRDaGFuZ2VzKTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJjaGFuZ2VzXCIsIGFzc2VydENoYW5nZXMpO1xuZnVuY3Rpb24gYXNzZXJ0SW5jcmVhc2VzKHN1YmplY3QsIHByb3AsIG1zZykge1xuICBpZiAobXNnKSBmbGFnMih0aGlzLCBcIm1lc3NhZ2VcIiwgbXNnKTtcbiAgbGV0IGZuID0gZmxhZzIodGhpcywgXCJvYmplY3RcIiksIGZsYWdNc2cgPSBmbGFnMih0aGlzLCBcIm1lc3NhZ2VcIiksIHNzZmkgPSBmbGFnMih0aGlzLCBcInNzZmlcIik7XG4gIG5ldyBBc3NlcnRpb24oZm4sIGZsYWdNc2csIHNzZmksIHRydWUpLmlzLmEoXCJmdW5jdGlvblwiKTtcbiAgbGV0IGluaXRpYWw7XG4gIGlmICghcHJvcCkge1xuICAgIG5ldyBBc3NlcnRpb24oc3ViamVjdCwgZmxhZ01zZywgc3NmaSwgdHJ1ZSkuaXMuYShcImZ1bmN0aW9uXCIpO1xuICAgIGluaXRpYWwgPSBzdWJqZWN0KCk7XG4gIH0gZWxzZSB7XG4gICAgbmV3IEFzc2VydGlvbihzdWJqZWN0LCBmbGFnTXNnLCBzc2ZpLCB0cnVlKS50by5oYXZlLnByb3BlcnR5KHByb3ApO1xuICAgIGluaXRpYWwgPSBzdWJqZWN0W3Byb3BdO1xuICB9XG4gIG5ldyBBc3NlcnRpb24oaW5pdGlhbCwgZmxhZ01zZywgc3NmaSwgdHJ1ZSkuaXMuYShcIm51bWJlclwiKTtcbiAgZm4oKTtcbiAgbGV0IGZpbmFsID0gcHJvcCA9PT0gdm9pZCAwIHx8IHByb3AgPT09IG51bGwgPyBzdWJqZWN0KCkgOiBzdWJqZWN0W3Byb3BdO1xuICBsZXQgbXNnT2JqID0gcHJvcCA9PT0gdm9pZCAwIHx8IHByb3AgPT09IG51bGwgPyBpbml0aWFsIDogXCIuXCIgKyBwcm9wO1xuICBmbGFnMih0aGlzLCBcImRlbHRhTXNnT2JqXCIsIG1zZ09iaik7XG4gIGZsYWcyKHRoaXMsIFwiaW5pdGlhbERlbHRhVmFsdWVcIiwgaW5pdGlhbCk7XG4gIGZsYWcyKHRoaXMsIFwiZmluYWxEZWx0YVZhbHVlXCIsIGZpbmFsKTtcbiAgZmxhZzIodGhpcywgXCJkZWx0YUJlaGF2aW9yXCIsIFwiaW5jcmVhc2VcIik7XG4gIGZsYWcyKHRoaXMsIFwicmVhbERlbHRhXCIsIGZpbmFsIC0gaW5pdGlhbCk7XG4gIHRoaXMuYXNzZXJ0KFxuICAgIGZpbmFsIC0gaW5pdGlhbCA+IDAsXG4gICAgXCJleHBlY3RlZCBcIiArIG1zZ09iaiArIFwiIHRvIGluY3JlYXNlXCIsXG4gICAgXCJleHBlY3RlZCBcIiArIG1zZ09iaiArIFwiIHRvIG5vdCBpbmNyZWFzZVwiXG4gICk7XG59XG5fX25hbWUoYXNzZXJ0SW5jcmVhc2VzLCBcImFzc2VydEluY3JlYXNlc1wiKTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJpbmNyZWFzZVwiLCBhc3NlcnRJbmNyZWFzZXMpO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcImluY3JlYXNlc1wiLCBhc3NlcnRJbmNyZWFzZXMpO1xuZnVuY3Rpb24gYXNzZXJ0RGVjcmVhc2VzKHN1YmplY3QsIHByb3AsIG1zZykge1xuICBpZiAobXNnKSBmbGFnMih0aGlzLCBcIm1lc3NhZ2VcIiwgbXNnKTtcbiAgbGV0IGZuID0gZmxhZzIodGhpcywgXCJvYmplY3RcIiksIGZsYWdNc2cgPSBmbGFnMih0aGlzLCBcIm1lc3NhZ2VcIiksIHNzZmkgPSBmbGFnMih0aGlzLCBcInNzZmlcIik7XG4gIG5ldyBBc3NlcnRpb24oZm4sIGZsYWdNc2csIHNzZmksIHRydWUpLmlzLmEoXCJmdW5jdGlvblwiKTtcbiAgbGV0IGluaXRpYWw7XG4gIGlmICghcHJvcCkge1xuICAgIG5ldyBBc3NlcnRpb24oc3ViamVjdCwgZmxhZ01zZywgc3NmaSwgdHJ1ZSkuaXMuYShcImZ1bmN0aW9uXCIpO1xuICAgIGluaXRpYWwgPSBzdWJqZWN0KCk7XG4gIH0gZWxzZSB7XG4gICAgbmV3IEFzc2VydGlvbihzdWJqZWN0LCBmbGFnTXNnLCBzc2ZpLCB0cnVlKS50by5oYXZlLnByb3BlcnR5KHByb3ApO1xuICAgIGluaXRpYWwgPSBzdWJqZWN0W3Byb3BdO1xuICB9XG4gIG5ldyBBc3NlcnRpb24oaW5pdGlhbCwgZmxhZ01zZywgc3NmaSwgdHJ1ZSkuaXMuYShcIm51bWJlclwiKTtcbiAgZm4oKTtcbiAgbGV0IGZpbmFsID0gcHJvcCA9PT0gdm9pZCAwIHx8IHByb3AgPT09IG51bGwgPyBzdWJqZWN0KCkgOiBzdWJqZWN0W3Byb3BdO1xuICBsZXQgbXNnT2JqID0gcHJvcCA9PT0gdm9pZCAwIHx8IHByb3AgPT09IG51bGwgPyBpbml0aWFsIDogXCIuXCIgKyBwcm9wO1xuICBmbGFnMih0aGlzLCBcImRlbHRhTXNnT2JqXCIsIG1zZ09iaik7XG4gIGZsYWcyKHRoaXMsIFwiaW5pdGlhbERlbHRhVmFsdWVcIiwgaW5pdGlhbCk7XG4gIGZsYWcyKHRoaXMsIFwiZmluYWxEZWx0YVZhbHVlXCIsIGZpbmFsKTtcbiAgZmxhZzIodGhpcywgXCJkZWx0YUJlaGF2aW9yXCIsIFwiZGVjcmVhc2VcIik7XG4gIGZsYWcyKHRoaXMsIFwicmVhbERlbHRhXCIsIGluaXRpYWwgLSBmaW5hbCk7XG4gIHRoaXMuYXNzZXJ0KFxuICAgIGZpbmFsIC0gaW5pdGlhbCA8IDAsXG4gICAgXCJleHBlY3RlZCBcIiArIG1zZ09iaiArIFwiIHRvIGRlY3JlYXNlXCIsXG4gICAgXCJleHBlY3RlZCBcIiArIG1zZ09iaiArIFwiIHRvIG5vdCBkZWNyZWFzZVwiXG4gICk7XG59XG5fX25hbWUoYXNzZXJ0RGVjcmVhc2VzLCBcImFzc2VydERlY3JlYXNlc1wiKTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJkZWNyZWFzZVwiLCBhc3NlcnREZWNyZWFzZXMpO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcImRlY3JlYXNlc1wiLCBhc3NlcnREZWNyZWFzZXMpO1xuZnVuY3Rpb24gYXNzZXJ0RGVsdGEoZGVsdGEsIG1zZykge1xuICBpZiAobXNnKSBmbGFnMih0aGlzLCBcIm1lc3NhZ2VcIiwgbXNnKTtcbiAgbGV0IG1zZ09iaiA9IGZsYWcyKHRoaXMsIFwiZGVsdGFNc2dPYmpcIik7XG4gIGxldCBpbml0aWFsID0gZmxhZzIodGhpcywgXCJpbml0aWFsRGVsdGFWYWx1ZVwiKTtcbiAgbGV0IGZpbmFsID0gZmxhZzIodGhpcywgXCJmaW5hbERlbHRhVmFsdWVcIik7XG4gIGxldCBiZWhhdmlvciA9IGZsYWcyKHRoaXMsIFwiZGVsdGFCZWhhdmlvclwiKTtcbiAgbGV0IHJlYWxEZWx0YSA9IGZsYWcyKHRoaXMsIFwicmVhbERlbHRhXCIpO1xuICBsZXQgZXhwcmVzc2lvbjtcbiAgaWYgKGJlaGF2aW9yID09PSBcImNoYW5nZVwiKSB7XG4gICAgZXhwcmVzc2lvbiA9IE1hdGguYWJzKGZpbmFsIC0gaW5pdGlhbCkgPT09IE1hdGguYWJzKGRlbHRhKTtcbiAgfSBlbHNlIHtcbiAgICBleHByZXNzaW9uID0gcmVhbERlbHRhID09PSBNYXRoLmFicyhkZWx0YSk7XG4gIH1cbiAgdGhpcy5hc3NlcnQoXG4gICAgZXhwcmVzc2lvbixcbiAgICBcImV4cGVjdGVkIFwiICsgbXNnT2JqICsgXCIgdG8gXCIgKyBiZWhhdmlvciArIFwiIGJ5IFwiICsgZGVsdGEsXG4gICAgXCJleHBlY3RlZCBcIiArIG1zZ09iaiArIFwiIHRvIG5vdCBcIiArIGJlaGF2aW9yICsgXCIgYnkgXCIgKyBkZWx0YVxuICApO1xufVxuX19uYW1lKGFzc2VydERlbHRhLCBcImFzc2VydERlbHRhXCIpO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcImJ5XCIsIGFzc2VydERlbHRhKTtcbkFzc2VydGlvbi5hZGRQcm9wZXJ0eShcImV4dGVuc2libGVcIiwgZnVuY3Rpb24oKSB7XG4gIGxldCBvYmogPSBmbGFnMih0aGlzLCBcIm9iamVjdFwiKTtcbiAgbGV0IGlzRXh0ZW5zaWJsZSA9IG9iaiA9PT0gT2JqZWN0KG9iaikgJiYgT2JqZWN0LmlzRXh0ZW5zaWJsZShvYmopO1xuICB0aGlzLmFzc2VydChcbiAgICBpc0V4dGVuc2libGUsXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGJlIGV4dGVuc2libGVcIixcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gbm90IGJlIGV4dGVuc2libGVcIlxuICApO1xufSk7XG5Bc3NlcnRpb24uYWRkUHJvcGVydHkoXCJzZWFsZWRcIiwgZnVuY3Rpb24oKSB7XG4gIGxldCBvYmogPSBmbGFnMih0aGlzLCBcIm9iamVjdFwiKTtcbiAgbGV0IGlzU2VhbGVkID0gb2JqID09PSBPYmplY3Qob2JqKSA/IE9iamVjdC5pc1NlYWxlZChvYmopIDogdHJ1ZTtcbiAgdGhpcy5hc3NlcnQoXG4gICAgaXNTZWFsZWQsXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGJlIHNlYWxlZFwiLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgYmUgc2VhbGVkXCJcbiAgKTtcbn0pO1xuQXNzZXJ0aW9uLmFkZFByb3BlcnR5KFwiZnJvemVuXCIsIGZ1bmN0aW9uKCkge1xuICBsZXQgb2JqID0gZmxhZzIodGhpcywgXCJvYmplY3RcIik7XG4gIGxldCBpc0Zyb3plbiA9IG9iaiA9PT0gT2JqZWN0KG9iaikgPyBPYmplY3QuaXNGcm96ZW4ob2JqKSA6IHRydWU7XG4gIHRoaXMuYXNzZXJ0KFxuICAgIGlzRnJvemVuLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBmcm96ZW5cIixcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gbm90IGJlIGZyb3plblwiXG4gICk7XG59KTtcbkFzc2VydGlvbi5hZGRQcm9wZXJ0eShcImZpbml0ZVwiLCBmdW5jdGlvbihfbXNnKSB7XG4gIGxldCBvYmogPSBmbGFnMih0aGlzLCBcIm9iamVjdFwiKTtcbiAgdGhpcy5hc3NlcnQoXG4gICAgdHlwZW9mIG9iaiA9PT0gXCJudW1iZXJcIiAmJiBpc0Zpbml0ZShvYmopLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBhIGZpbml0ZSBudW1iZXJcIixcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gbm90IGJlIGEgZmluaXRlIG51bWJlclwiXG4gICk7XG59KTtcbmZ1bmN0aW9uIGNvbXBhcmVTdWJzZXQoZXhwZWN0ZWQsIGFjdHVhbCkge1xuICBpZiAoZXhwZWN0ZWQgPT09IGFjdHVhbCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmICh0eXBlb2YgYWN0dWFsICE9PSB0eXBlb2YgZXhwZWN0ZWQpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHR5cGVvZiBleHBlY3RlZCAhPT0gXCJvYmplY3RcIiB8fCBleHBlY3RlZCA9PT0gbnVsbCkge1xuICAgIHJldHVybiBleHBlY3RlZCA9PT0gYWN0dWFsO1xuICB9XG4gIGlmICghYWN0dWFsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChBcnJheS5pc0FycmF5KGV4cGVjdGVkKSkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhY3R1YWwpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBleHBlY3RlZC5ldmVyeShmdW5jdGlvbihleHApIHtcbiAgICAgIHJldHVybiBhY3R1YWwuc29tZShmdW5jdGlvbihhY3QpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBhcmVTdWJzZXQoZXhwLCBhY3QpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgaWYgKGV4cGVjdGVkIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgIGlmIChhY3R1YWwgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICByZXR1cm4gZXhwZWN0ZWQuZ2V0VGltZSgpID09PSBhY3R1YWwuZ2V0VGltZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiBPYmplY3Qua2V5cyhleHBlY3RlZCkuZXZlcnkoZnVuY3Rpb24oa2V5KSB7XG4gICAgbGV0IGV4cGVjdGVkVmFsdWUgPSBleHBlY3RlZFtrZXldO1xuICAgIGxldCBhY3R1YWxWYWx1ZSA9IGFjdHVhbFtrZXldO1xuICAgIGlmICh0eXBlb2YgZXhwZWN0ZWRWYWx1ZSA9PT0gXCJvYmplY3RcIiAmJiBleHBlY3RlZFZhbHVlICE9PSBudWxsICYmIGFjdHVhbFZhbHVlICE9PSBudWxsKSB7XG4gICAgICByZXR1cm4gY29tcGFyZVN1YnNldChleHBlY3RlZFZhbHVlLCBhY3R1YWxWYWx1ZSk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgZXhwZWN0ZWRWYWx1ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICByZXR1cm4gZXhwZWN0ZWRWYWx1ZShhY3R1YWxWYWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiBhY3R1YWxWYWx1ZSA9PT0gZXhwZWN0ZWRWYWx1ZTtcbiAgfSk7XG59XG5fX25hbWUoY29tcGFyZVN1YnNldCwgXCJjb21wYXJlU3Vic2V0XCIpO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcImNvbnRhaW5TdWJzZXRcIiwgZnVuY3Rpb24oZXhwZWN0ZWQpIHtcbiAgY29uc3QgYWN0dWFsID0gZmxhZyh0aGlzLCBcIm9iamVjdFwiKTtcbiAgY29uc3Qgc2hvd0RpZmYgPSBjb25maWcuc2hvd0RpZmY7XG4gIHRoaXMuYXNzZXJ0KFxuICAgIGNvbXBhcmVTdWJzZXQoZXhwZWN0ZWQsIGFjdHVhbCksXG4gICAgXCJleHBlY3RlZCAje2FjdH0gdG8gY29udGFpbiBzdWJzZXQgI3tleHB9XCIsXG4gICAgXCJleHBlY3RlZCAje2FjdH0gdG8gbm90IGNvbnRhaW4gc3Vic2V0ICN7ZXhwfVwiLFxuICAgIGV4cGVjdGVkLFxuICAgIGFjdHVhbCxcbiAgICBzaG93RGlmZlxuICApO1xufSk7XG5cbi8vIGxpYi9jaGFpL2ludGVyZmFjZS9leHBlY3QuanNcbmZ1bmN0aW9uIGV4cGVjdCh2YWwsIG1lc3NhZ2UpIHtcbiAgcmV0dXJuIG5ldyBBc3NlcnRpb24odmFsLCBtZXNzYWdlKTtcbn1cbl9fbmFtZShleHBlY3QsIFwiZXhwZWN0XCIpO1xuZXhwZWN0LmZhaWwgPSBmdW5jdGlvbihhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCBvcGVyYXRvcikge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICBtZXNzYWdlID0gYWN0dWFsO1xuICAgIGFjdHVhbCA9IHZvaWQgMDtcbiAgfVxuICBtZXNzYWdlID0gbWVzc2FnZSB8fCBcImV4cGVjdC5mYWlsKClcIjtcbiAgdGhyb3cgbmV3IEFzc2VydGlvbkVycm9yKFxuICAgIG1lc3NhZ2UsXG4gICAge1xuICAgICAgYWN0dWFsLFxuICAgICAgZXhwZWN0ZWQsXG4gICAgICBvcGVyYXRvclxuICAgIH0sXG4gICAgZXhwZWN0LmZhaWxcbiAgKTtcbn07XG5cbi8vIGxpYi9jaGFpL2ludGVyZmFjZS9zaG91bGQuanNcbnZhciBzaG91bGRfZXhwb3J0cyA9IHt9O1xuX19leHBvcnQoc2hvdWxkX2V4cG9ydHMsIHtcbiAgU2hvdWxkOiAoKSA9PiBTaG91bGQsXG4gIHNob3VsZDogKCkgPT4gc2hvdWxkXG59KTtcbmZ1bmN0aW9uIGxvYWRTaG91bGQoKSB7XG4gIGZ1bmN0aW9uIHNob3VsZEdldHRlcigpIHtcbiAgICBpZiAodGhpcyBpbnN0YW5jZW9mIFN0cmluZyB8fCB0aGlzIGluc3RhbmNlb2YgTnVtYmVyIHx8IHRoaXMgaW5zdGFuY2VvZiBCb29sZWFuIHx8IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0aGlzIGluc3RhbmNlb2YgU3ltYm9sIHx8IHR5cGVvZiBCaWdJbnQgPT09IFwiZnVuY3Rpb25cIiAmJiB0aGlzIGluc3RhbmNlb2YgQmlnSW50KSB7XG4gICAgICByZXR1cm4gbmV3IEFzc2VydGlvbih0aGlzLnZhbHVlT2YoKSwgbnVsbCwgc2hvdWxkR2V0dGVyKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBBc3NlcnRpb24odGhpcywgbnVsbCwgc2hvdWxkR2V0dGVyKTtcbiAgfVxuICBfX25hbWUoc2hvdWxkR2V0dGVyLCBcInNob3VsZEdldHRlclwiKTtcbiAgZnVuY3Rpb24gc2hvdWxkU2V0dGVyKHZhbHVlKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwic2hvdWxkXCIsIHtcbiAgICAgIHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH1cbiAgX19uYW1lKHNob3VsZFNldHRlciwgXCJzaG91bGRTZXR0ZXJcIik7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPYmplY3QucHJvdG90eXBlLCBcInNob3VsZFwiLCB7XG4gICAgc2V0OiBzaG91bGRTZXR0ZXIsXG4gICAgZ2V0OiBzaG91bGRHZXR0ZXIsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xuICBsZXQgc2hvdWxkMiA9IHt9O1xuICBzaG91bGQyLmZhaWwgPSBmdW5jdGlvbihhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCBvcGVyYXRvcikge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgICAgbWVzc2FnZSA9IGFjdHVhbDtcbiAgICAgIGFjdHVhbCA9IHZvaWQgMDtcbiAgICB9XG4gICAgbWVzc2FnZSA9IG1lc3NhZ2UgfHwgXCJzaG91bGQuZmFpbCgpXCI7XG4gICAgdGhyb3cgbmV3IEFzc2VydGlvbkVycm9yKFxuICAgICAgbWVzc2FnZSxcbiAgICAgIHtcbiAgICAgICAgYWN0dWFsLFxuICAgICAgICBleHBlY3RlZCxcbiAgICAgICAgb3BlcmF0b3JcbiAgICAgIH0sXG4gICAgICBzaG91bGQyLmZhaWxcbiAgICApO1xuICB9O1xuICBzaG91bGQyLmVxdWFsID0gZnVuY3Rpb24oYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICAgIG5ldyBBc3NlcnRpb24oYWN0dWFsLCBtZXNzYWdlKS50by5lcXVhbChleHBlY3RlZCk7XG4gIH07XG4gIHNob3VsZDIuVGhyb3cgPSBmdW5jdGlvbihmbiwgZXJydCwgZXJycywgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihmbiwgbXNnKS50by5UaHJvdyhlcnJ0LCBlcnJzKTtcbiAgfTtcbiAgc2hvdWxkMi5leGlzdCA9IGZ1bmN0aW9uKHZhbCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbih2YWwsIG1zZykudG8uZXhpc3Q7XG4gIH07XG4gIHNob3VsZDIubm90ID0ge307XG4gIHNob3VsZDIubm90LmVxdWFsID0gZnVuY3Rpb24oYWN0dWFsLCBleHBlY3RlZCwgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihhY3R1YWwsIG1zZykudG8ubm90LmVxdWFsKGV4cGVjdGVkKTtcbiAgfTtcbiAgc2hvdWxkMi5ub3QuVGhyb3cgPSBmdW5jdGlvbihmbiwgZXJydCwgZXJycywgbXNnKSB7XG4gICAgbmV3IEFzc2VydGlvbihmbiwgbXNnKS50by5ub3QuVGhyb3coZXJydCwgZXJycyk7XG4gIH07XG4gIHNob3VsZDIubm90LmV4aXN0ID0gZnVuY3Rpb24odmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnKS50by5ub3QuZXhpc3Q7XG4gIH07XG4gIHNob3VsZDJbXCJ0aHJvd1wiXSA9IHNob3VsZDJbXCJUaHJvd1wiXTtcbiAgc2hvdWxkMi5ub3RbXCJ0aHJvd1wiXSA9IHNob3VsZDIubm90W1wiVGhyb3dcIl07XG4gIHJldHVybiBzaG91bGQyO1xufVxuX19uYW1lKGxvYWRTaG91bGQsIFwibG9hZFNob3VsZFwiKTtcbnZhciBzaG91bGQgPSBsb2FkU2hvdWxkO1xudmFyIFNob3VsZCA9IGxvYWRTaG91bGQ7XG5cbi8vIGxpYi9jaGFpL2ludGVyZmFjZS9hc3NlcnQuanNcbmZ1bmN0aW9uIGFzc2VydChleHByZXNzLCBlcnJtc2cpIHtcbiAgbGV0IHRlc3QyID0gbmV3IEFzc2VydGlvbihudWxsLCBudWxsLCBhc3NlcnQsIHRydWUpO1xuICB0ZXN0Mi5hc3NlcnQoZXhwcmVzcywgZXJybXNnLCBcIlsgbmVnYXRpb24gbWVzc2FnZSB1bmF2YWlsYWJsZSBdXCIpO1xufVxuX19uYW1lKGFzc2VydCwgXCJhc3NlcnRcIik7XG5hc3NlcnQuZmFpbCA9IGZ1bmN0aW9uKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsIG9wZXJhdG9yKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIG1lc3NhZ2UgPSBhY3R1YWw7XG4gICAgYWN0dWFsID0gdm9pZCAwO1xuICB9XG4gIG1lc3NhZ2UgPSBtZXNzYWdlIHx8IFwiYXNzZXJ0LmZhaWwoKVwiO1xuICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IoXG4gICAgbWVzc2FnZSxcbiAgICB7XG4gICAgICBhY3R1YWwsXG4gICAgICBleHBlY3RlZCxcbiAgICAgIG9wZXJhdG9yXG4gICAgfSxcbiAgICBhc3NlcnQuZmFpbFxuICApO1xufTtcbmFzc2VydC5pc09rID0gZnVuY3Rpb24odmFsLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmlzT2ssIHRydWUpLmlzLm9rO1xufTtcbmFzc2VydC5pc05vdE9rID0gZnVuY3Rpb24odmFsLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmlzTm90T2ssIHRydWUpLmlzLm5vdC5vaztcbn07XG5hc3NlcnQuZXF1YWwgPSBmdW5jdGlvbihhY3QsIGV4cCwgbXNnKSB7XG4gIGxldCB0ZXN0MiA9IG5ldyBBc3NlcnRpb24oYWN0LCBtc2csIGFzc2VydC5lcXVhbCwgdHJ1ZSk7XG4gIHRlc3QyLmFzc2VydChcbiAgICBleHAgPT0gZmxhZyh0ZXN0MiwgXCJvYmplY3RcIiksXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGVxdWFsICN7ZXhwfVwiLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgZXF1YWwgI3thY3R9XCIsXG4gICAgZXhwLFxuICAgIGFjdCxcbiAgICB0cnVlXG4gICk7XG59O1xuYXNzZXJ0Lm5vdEVxdWFsID0gZnVuY3Rpb24oYWN0LCBleHAsIG1zZykge1xuICBsZXQgdGVzdDIgPSBuZXcgQXNzZXJ0aW9uKGFjdCwgbXNnLCBhc3NlcnQubm90RXF1YWwsIHRydWUpO1xuICB0ZXN0Mi5hc3NlcnQoXG4gICAgZXhwICE9IGZsYWcodGVzdDIsIFwib2JqZWN0XCIpLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgZXF1YWwgI3tleHB9XCIsXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGVxdWFsICN7YWN0fVwiLFxuICAgIGV4cCxcbiAgICBhY3QsXG4gICAgdHJ1ZVxuICApO1xufTtcbmFzc2VydC5zdHJpY3RFcXVhbCA9IGZ1bmN0aW9uKGFjdCwgZXhwLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihhY3QsIG1zZywgYXNzZXJ0LnN0cmljdEVxdWFsLCB0cnVlKS50by5lcXVhbChleHApO1xufTtcbmFzc2VydC5ub3RTdHJpY3RFcXVhbCA9IGZ1bmN0aW9uKGFjdCwgZXhwLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihhY3QsIG1zZywgYXNzZXJ0Lm5vdFN0cmljdEVxdWFsLCB0cnVlKS50by5ub3QuZXF1YWwoZXhwKTtcbn07XG5hc3NlcnQuZGVlcEVxdWFsID0gYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbCA9IGZ1bmN0aW9uKGFjdCwgZXhwLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihhY3QsIG1zZywgYXNzZXJ0LmRlZXBFcXVhbCwgdHJ1ZSkudG8uZXFsKGV4cCk7XG59O1xuYXNzZXJ0Lm5vdERlZXBFcXVhbCA9IGZ1bmN0aW9uKGFjdCwgZXhwLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihhY3QsIG1zZywgYXNzZXJ0Lm5vdERlZXBFcXVhbCwgdHJ1ZSkudG8ubm90LmVxbChleHApO1xufTtcbmFzc2VydC5pc0Fib3ZlID0gZnVuY3Rpb24odmFsLCBhYnYsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNBYm92ZSwgdHJ1ZSkudG8uYmUuYWJvdmUoYWJ2KTtcbn07XG5hc3NlcnQuaXNBdExlYXN0ID0gZnVuY3Rpb24odmFsLCBhdGxzdCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc0F0TGVhc3QsIHRydWUpLnRvLmJlLmxlYXN0KGF0bHN0KTtcbn07XG5hc3NlcnQuaXNCZWxvdyA9IGZ1bmN0aW9uKHZhbCwgYmx3LCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmlzQmVsb3csIHRydWUpLnRvLmJlLmJlbG93KGJsdyk7XG59O1xuYXNzZXJ0LmlzQXRNb3N0ID0gZnVuY3Rpb24odmFsLCBhdG1zdCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc0F0TW9zdCwgdHJ1ZSkudG8uYmUubW9zdChhdG1zdCk7XG59O1xuYXNzZXJ0LmlzVHJ1ZSA9IGZ1bmN0aW9uKHZhbCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc1RydWUsIHRydWUpLmlzW1widHJ1ZVwiXTtcbn07XG5hc3NlcnQuaXNOb3RUcnVlID0gZnVuY3Rpb24odmFsLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmlzTm90VHJ1ZSwgdHJ1ZSkudG8ubm90LmVxdWFsKHRydWUpO1xufTtcbmFzc2VydC5pc0ZhbHNlID0gZnVuY3Rpb24odmFsLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmlzRmFsc2UsIHRydWUpLmlzW1wiZmFsc2VcIl07XG59O1xuYXNzZXJ0LmlzTm90RmFsc2UgPSBmdW5jdGlvbih2YWwsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNOb3RGYWxzZSwgdHJ1ZSkudG8ubm90LmVxdWFsKGZhbHNlKTtcbn07XG5hc3NlcnQuaXNOdWxsID0gZnVuY3Rpb24odmFsLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmlzTnVsbCwgdHJ1ZSkudG8uZXF1YWwobnVsbCk7XG59O1xuYXNzZXJ0LmlzTm90TnVsbCA9IGZ1bmN0aW9uKHZhbCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc05vdE51bGwsIHRydWUpLnRvLm5vdC5lcXVhbChudWxsKTtcbn07XG5hc3NlcnQuaXNOYU4gPSBmdW5jdGlvbih2YWwsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNOYU4sIHRydWUpLnRvLmJlLk5hTjtcbn07XG5hc3NlcnQuaXNOb3ROYU4gPSBmdW5jdGlvbih2YWx1ZSwgbWVzc2FnZSkge1xuICBuZXcgQXNzZXJ0aW9uKHZhbHVlLCBtZXNzYWdlLCBhc3NlcnQuaXNOb3ROYU4sIHRydWUpLm5vdC50by5iZS5OYU47XG59O1xuYXNzZXJ0LmV4aXN0cyA9IGZ1bmN0aW9uKHZhbCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5leGlzdHMsIHRydWUpLnRvLmV4aXN0O1xufTtcbmFzc2VydC5ub3RFeGlzdHMgPSBmdW5jdGlvbih2YWwsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQubm90RXhpc3RzLCB0cnVlKS50by5ub3QuZXhpc3Q7XG59O1xuYXNzZXJ0LmlzVW5kZWZpbmVkID0gZnVuY3Rpb24odmFsLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmlzVW5kZWZpbmVkLCB0cnVlKS50by5lcXVhbCh2b2lkIDApO1xufTtcbmFzc2VydC5pc0RlZmluZWQgPSBmdW5jdGlvbih2YWwsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNEZWZpbmVkLCB0cnVlKS50by5ub3QuZXF1YWwodm9pZCAwKTtcbn07XG5hc3NlcnQuaXNDYWxsYWJsZSA9IGZ1bmN0aW9uKHZhbHVlLCBtZXNzYWdlKSB7XG4gIG5ldyBBc3NlcnRpb24odmFsdWUsIG1lc3NhZ2UsIGFzc2VydC5pc0NhbGxhYmxlLCB0cnVlKS5pcy5jYWxsYWJsZTtcbn07XG5hc3NlcnQuaXNOb3RDYWxsYWJsZSA9IGZ1bmN0aW9uKHZhbHVlLCBtZXNzYWdlKSB7XG4gIG5ldyBBc3NlcnRpb24odmFsdWUsIG1lc3NhZ2UsIGFzc2VydC5pc05vdENhbGxhYmxlLCB0cnVlKS5pcy5ub3QuY2FsbGFibGU7XG59O1xuYXNzZXJ0LmlzT2JqZWN0ID0gZnVuY3Rpb24odmFsLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmlzT2JqZWN0LCB0cnVlKS50by5iZS5hKFwib2JqZWN0XCIpO1xufTtcbmFzc2VydC5pc05vdE9iamVjdCA9IGZ1bmN0aW9uKHZhbCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc05vdE9iamVjdCwgdHJ1ZSkudG8ubm90LmJlLmEoXCJvYmplY3RcIik7XG59O1xuYXNzZXJ0LmlzQXJyYXkgPSBmdW5jdGlvbih2YWwsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNBcnJheSwgdHJ1ZSkudG8uYmUuYW4oXCJhcnJheVwiKTtcbn07XG5hc3NlcnQuaXNOb3RBcnJheSA9IGZ1bmN0aW9uKHZhbCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc05vdEFycmF5LCB0cnVlKS50by5ub3QuYmUuYW4oXCJhcnJheVwiKTtcbn07XG5hc3NlcnQuaXNTdHJpbmcgPSBmdW5jdGlvbih2YWwsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNTdHJpbmcsIHRydWUpLnRvLmJlLmEoXCJzdHJpbmdcIik7XG59O1xuYXNzZXJ0LmlzTm90U3RyaW5nID0gZnVuY3Rpb24odmFsLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmlzTm90U3RyaW5nLCB0cnVlKS50by5ub3QuYmUuYShcInN0cmluZ1wiKTtcbn07XG5hc3NlcnQuaXNOdW1iZXIgPSBmdW5jdGlvbih2YWwsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNOdW1iZXIsIHRydWUpLnRvLmJlLmEoXCJudW1iZXJcIik7XG59O1xuYXNzZXJ0LmlzTm90TnVtYmVyID0gZnVuY3Rpb24odmFsLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmlzTm90TnVtYmVyLCB0cnVlKS50by5ub3QuYmUuYShcIm51bWJlclwiKTtcbn07XG5hc3NlcnQuaXNOdW1lcmljID0gZnVuY3Rpb24odmFsLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmlzTnVtZXJpYywgdHJ1ZSkuaXMubnVtZXJpYztcbn07XG5hc3NlcnQuaXNOb3ROdW1lcmljID0gZnVuY3Rpb24odmFsLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmlzTm90TnVtZXJpYywgdHJ1ZSkuaXMubm90Lm51bWVyaWM7XG59O1xuYXNzZXJ0LmlzRmluaXRlID0gZnVuY3Rpb24odmFsLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmlzRmluaXRlLCB0cnVlKS50by5iZS5maW5pdGU7XG59O1xuYXNzZXJ0LmlzQm9vbGVhbiA9IGZ1bmN0aW9uKHZhbCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc0Jvb2xlYW4sIHRydWUpLnRvLmJlLmEoXCJib29sZWFuXCIpO1xufTtcbmFzc2VydC5pc05vdEJvb2xlYW4gPSBmdW5jdGlvbih2YWwsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNOb3RCb29sZWFuLCB0cnVlKS50by5ub3QuYmUuYShcImJvb2xlYW5cIik7XG59O1xuYXNzZXJ0LnR5cGVPZiA9IGZ1bmN0aW9uKHZhbCwgdHlwZTMsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQudHlwZU9mLCB0cnVlKS50by5iZS5hKHR5cGUzKTtcbn07XG5hc3NlcnQubm90VHlwZU9mID0gZnVuY3Rpb24odmFsdWUsIHR5cGUzLCBtZXNzYWdlKSB7XG4gIG5ldyBBc3NlcnRpb24odmFsdWUsIG1lc3NhZ2UsIGFzc2VydC5ub3RUeXBlT2YsIHRydWUpLnRvLm5vdC5iZS5hKHR5cGUzKTtcbn07XG5hc3NlcnQuaW5zdGFuY2VPZiA9IGZ1bmN0aW9uKHZhbCwgdHlwZTMsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaW5zdGFuY2VPZiwgdHJ1ZSkudG8uYmUuaW5zdGFuY2VPZih0eXBlMyk7XG59O1xuYXNzZXJ0Lm5vdEluc3RhbmNlT2YgPSBmdW5jdGlvbih2YWwsIHR5cGUzLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0Lm5vdEluc3RhbmNlT2YsIHRydWUpLnRvLm5vdC5iZS5pbnN0YW5jZU9mKFxuICAgIHR5cGUzXG4gICk7XG59O1xuYXNzZXJ0LmluY2x1ZGUgPSBmdW5jdGlvbihleHAsIGluYywgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oZXhwLCBtc2csIGFzc2VydC5pbmNsdWRlLCB0cnVlKS5pbmNsdWRlKGluYyk7XG59O1xuYXNzZXJ0Lm5vdEluY2x1ZGUgPSBmdW5jdGlvbihleHAsIGluYywgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oZXhwLCBtc2csIGFzc2VydC5ub3RJbmNsdWRlLCB0cnVlKS5ub3QuaW5jbHVkZShpbmMpO1xufTtcbmFzc2VydC5kZWVwSW5jbHVkZSA9IGZ1bmN0aW9uKGV4cCwgaW5jLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihleHAsIG1zZywgYXNzZXJ0LmRlZXBJbmNsdWRlLCB0cnVlKS5kZWVwLmluY2x1ZGUoaW5jKTtcbn07XG5hc3NlcnQubm90RGVlcEluY2x1ZGUgPSBmdW5jdGlvbihleHAsIGluYywgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oZXhwLCBtc2csIGFzc2VydC5ub3REZWVwSW5jbHVkZSwgdHJ1ZSkubm90LmRlZXAuaW5jbHVkZShpbmMpO1xufTtcbmFzc2VydC5uZXN0ZWRJbmNsdWRlID0gZnVuY3Rpb24oZXhwLCBpbmMsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKGV4cCwgbXNnLCBhc3NlcnQubmVzdGVkSW5jbHVkZSwgdHJ1ZSkubmVzdGVkLmluY2x1ZGUoaW5jKTtcbn07XG5hc3NlcnQubm90TmVzdGVkSW5jbHVkZSA9IGZ1bmN0aW9uKGV4cCwgaW5jLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihleHAsIG1zZywgYXNzZXJ0Lm5vdE5lc3RlZEluY2x1ZGUsIHRydWUpLm5vdC5uZXN0ZWQuaW5jbHVkZShcbiAgICBpbmNcbiAgKTtcbn07XG5hc3NlcnQuZGVlcE5lc3RlZEluY2x1ZGUgPSBmdW5jdGlvbihleHAsIGluYywgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oZXhwLCBtc2csIGFzc2VydC5kZWVwTmVzdGVkSW5jbHVkZSwgdHJ1ZSkuZGVlcC5uZXN0ZWQuaW5jbHVkZShcbiAgICBpbmNcbiAgKTtcbn07XG5hc3NlcnQubm90RGVlcE5lc3RlZEluY2x1ZGUgPSBmdW5jdGlvbihleHAsIGluYywgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oXG4gICAgZXhwLFxuICAgIG1zZyxcbiAgICBhc3NlcnQubm90RGVlcE5lc3RlZEluY2x1ZGUsXG4gICAgdHJ1ZVxuICApLm5vdC5kZWVwLm5lc3RlZC5pbmNsdWRlKGluYyk7XG59O1xuYXNzZXJ0Lm93bkluY2x1ZGUgPSBmdW5jdGlvbihleHAsIGluYywgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oZXhwLCBtc2csIGFzc2VydC5vd25JbmNsdWRlLCB0cnVlKS5vd24uaW5jbHVkZShpbmMpO1xufTtcbmFzc2VydC5ub3RPd25JbmNsdWRlID0gZnVuY3Rpb24oZXhwLCBpbmMsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKGV4cCwgbXNnLCBhc3NlcnQubm90T3duSW5jbHVkZSwgdHJ1ZSkubm90Lm93bi5pbmNsdWRlKGluYyk7XG59O1xuYXNzZXJ0LmRlZXBPd25JbmNsdWRlID0gZnVuY3Rpb24oZXhwLCBpbmMsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKGV4cCwgbXNnLCBhc3NlcnQuZGVlcE93bkluY2x1ZGUsIHRydWUpLmRlZXAub3duLmluY2x1ZGUoaW5jKTtcbn07XG5hc3NlcnQubm90RGVlcE93bkluY2x1ZGUgPSBmdW5jdGlvbihleHAsIGluYywgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oZXhwLCBtc2csIGFzc2VydC5ub3REZWVwT3duSW5jbHVkZSwgdHJ1ZSkubm90LmRlZXAub3duLmluY2x1ZGUoXG4gICAgaW5jXG4gICk7XG59O1xuYXNzZXJ0Lm1hdGNoID0gZnVuY3Rpb24oZXhwLCByZSwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oZXhwLCBtc2csIGFzc2VydC5tYXRjaCwgdHJ1ZSkudG8ubWF0Y2gocmUpO1xufTtcbmFzc2VydC5ub3RNYXRjaCA9IGZ1bmN0aW9uKGV4cCwgcmUsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKGV4cCwgbXNnLCBhc3NlcnQubm90TWF0Y2gsIHRydWUpLnRvLm5vdC5tYXRjaChyZSk7XG59O1xuYXNzZXJ0LnByb3BlcnR5ID0gZnVuY3Rpb24ob2JqLCBwcm9wLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihvYmosIG1zZywgYXNzZXJ0LnByb3BlcnR5LCB0cnVlKS50by5oYXZlLnByb3BlcnR5KHByb3ApO1xufTtcbmFzc2VydC5ub3RQcm9wZXJ0eSA9IGZ1bmN0aW9uKG9iaiwgcHJvcCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24ob2JqLCBtc2csIGFzc2VydC5ub3RQcm9wZXJ0eSwgdHJ1ZSkudG8ubm90LmhhdmUucHJvcGVydHkocHJvcCk7XG59O1xuYXNzZXJ0LnByb3BlcnR5VmFsID0gZnVuY3Rpb24ob2JqLCBwcm9wLCB2YWwsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnLCBhc3NlcnQucHJvcGVydHlWYWwsIHRydWUpLnRvLmhhdmUucHJvcGVydHkocHJvcCwgdmFsKTtcbn07XG5hc3NlcnQubm90UHJvcGVydHlWYWwgPSBmdW5jdGlvbihvYmosIHByb3AsIHZhbCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24ob2JqLCBtc2csIGFzc2VydC5ub3RQcm9wZXJ0eVZhbCwgdHJ1ZSkudG8ubm90LmhhdmUucHJvcGVydHkoXG4gICAgcHJvcCxcbiAgICB2YWxcbiAgKTtcbn07XG5hc3NlcnQuZGVlcFByb3BlcnR5VmFsID0gZnVuY3Rpb24ob2JqLCBwcm9wLCB2YWwsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnLCBhc3NlcnQuZGVlcFByb3BlcnR5VmFsLCB0cnVlKS50by5oYXZlLmRlZXAucHJvcGVydHkoXG4gICAgcHJvcCxcbiAgICB2YWxcbiAgKTtcbn07XG5hc3NlcnQubm90RGVlcFByb3BlcnR5VmFsID0gZnVuY3Rpb24ob2JqLCBwcm9wLCB2YWwsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKFxuICAgIG9iaixcbiAgICBtc2csXG4gICAgYXNzZXJ0Lm5vdERlZXBQcm9wZXJ0eVZhbCxcbiAgICB0cnVlXG4gICkudG8ubm90LmhhdmUuZGVlcC5wcm9wZXJ0eShwcm9wLCB2YWwpO1xufTtcbmFzc2VydC5vd25Qcm9wZXJ0eSA9IGZ1bmN0aW9uKG9iaiwgcHJvcCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24ob2JqLCBtc2csIGFzc2VydC5vd25Qcm9wZXJ0eSwgdHJ1ZSkudG8uaGF2ZS5vd24ucHJvcGVydHkocHJvcCk7XG59O1xuYXNzZXJ0Lm5vdE93blByb3BlcnR5ID0gZnVuY3Rpb24ob2JqLCBwcm9wLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihvYmosIG1zZywgYXNzZXJ0Lm5vdE93blByb3BlcnR5LCB0cnVlKS50by5ub3QuaGF2ZS5vd24ucHJvcGVydHkoXG4gICAgcHJvcFxuICApO1xufTtcbmFzc2VydC5vd25Qcm9wZXJ0eVZhbCA9IGZ1bmN0aW9uKG9iaiwgcHJvcCwgdmFsdWUsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnLCBhc3NlcnQub3duUHJvcGVydHlWYWwsIHRydWUpLnRvLmhhdmUub3duLnByb3BlcnR5KFxuICAgIHByb3AsXG4gICAgdmFsdWVcbiAgKTtcbn07XG5hc3NlcnQubm90T3duUHJvcGVydHlWYWwgPSBmdW5jdGlvbihvYmosIHByb3AsIHZhbHVlLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihcbiAgICBvYmosXG4gICAgbXNnLFxuICAgIGFzc2VydC5ub3RPd25Qcm9wZXJ0eVZhbCxcbiAgICB0cnVlXG4gICkudG8ubm90LmhhdmUub3duLnByb3BlcnR5KHByb3AsIHZhbHVlKTtcbn07XG5hc3NlcnQuZGVlcE93blByb3BlcnR5VmFsID0gZnVuY3Rpb24ob2JqLCBwcm9wLCB2YWx1ZSwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oXG4gICAgb2JqLFxuICAgIG1zZyxcbiAgICBhc3NlcnQuZGVlcE93blByb3BlcnR5VmFsLFxuICAgIHRydWVcbiAgKS50by5oYXZlLmRlZXAub3duLnByb3BlcnR5KHByb3AsIHZhbHVlKTtcbn07XG5hc3NlcnQubm90RGVlcE93blByb3BlcnR5VmFsID0gZnVuY3Rpb24ob2JqLCBwcm9wLCB2YWx1ZSwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oXG4gICAgb2JqLFxuICAgIG1zZyxcbiAgICBhc3NlcnQubm90RGVlcE93blByb3BlcnR5VmFsLFxuICAgIHRydWVcbiAgKS50by5ub3QuaGF2ZS5kZWVwLm93bi5wcm9wZXJ0eShwcm9wLCB2YWx1ZSk7XG59O1xuYXNzZXJ0Lm5lc3RlZFByb3BlcnR5ID0gZnVuY3Rpb24ob2JqLCBwcm9wLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihvYmosIG1zZywgYXNzZXJ0Lm5lc3RlZFByb3BlcnR5LCB0cnVlKS50by5oYXZlLm5lc3RlZC5wcm9wZXJ0eShcbiAgICBwcm9wXG4gICk7XG59O1xuYXNzZXJ0Lm5vdE5lc3RlZFByb3BlcnR5ID0gZnVuY3Rpb24ob2JqLCBwcm9wLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihcbiAgICBvYmosXG4gICAgbXNnLFxuICAgIGFzc2VydC5ub3ROZXN0ZWRQcm9wZXJ0eSxcbiAgICB0cnVlXG4gICkudG8ubm90LmhhdmUubmVzdGVkLnByb3BlcnR5KHByb3ApO1xufTtcbmFzc2VydC5uZXN0ZWRQcm9wZXJ0eVZhbCA9IGZ1bmN0aW9uKG9iaiwgcHJvcCwgdmFsLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihcbiAgICBvYmosXG4gICAgbXNnLFxuICAgIGFzc2VydC5uZXN0ZWRQcm9wZXJ0eVZhbCxcbiAgICB0cnVlXG4gICkudG8uaGF2ZS5uZXN0ZWQucHJvcGVydHkocHJvcCwgdmFsKTtcbn07XG5hc3NlcnQubm90TmVzdGVkUHJvcGVydHlWYWwgPSBmdW5jdGlvbihvYmosIHByb3AsIHZhbCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oXG4gICAgb2JqLFxuICAgIG1zZyxcbiAgICBhc3NlcnQubm90TmVzdGVkUHJvcGVydHlWYWwsXG4gICAgdHJ1ZVxuICApLnRvLm5vdC5oYXZlLm5lc3RlZC5wcm9wZXJ0eShwcm9wLCB2YWwpO1xufTtcbmFzc2VydC5kZWVwTmVzdGVkUHJvcGVydHlWYWwgPSBmdW5jdGlvbihvYmosIHByb3AsIHZhbCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oXG4gICAgb2JqLFxuICAgIG1zZyxcbiAgICBhc3NlcnQuZGVlcE5lc3RlZFByb3BlcnR5VmFsLFxuICAgIHRydWVcbiAgKS50by5oYXZlLmRlZXAubmVzdGVkLnByb3BlcnR5KHByb3AsIHZhbCk7XG59O1xuYXNzZXJ0Lm5vdERlZXBOZXN0ZWRQcm9wZXJ0eVZhbCA9IGZ1bmN0aW9uKG9iaiwgcHJvcCwgdmFsLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihcbiAgICBvYmosXG4gICAgbXNnLFxuICAgIGFzc2VydC5ub3REZWVwTmVzdGVkUHJvcGVydHlWYWwsXG4gICAgdHJ1ZVxuICApLnRvLm5vdC5oYXZlLmRlZXAubmVzdGVkLnByb3BlcnR5KHByb3AsIHZhbCk7XG59O1xuYXNzZXJ0Lmxlbmd0aE9mID0gZnVuY3Rpb24oZXhwLCBsZW4sIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKGV4cCwgbXNnLCBhc3NlcnQubGVuZ3RoT2YsIHRydWUpLnRvLmhhdmUubGVuZ3RoT2YobGVuKTtcbn07XG5hc3NlcnQuaGFzQW55S2V5cyA9IGZ1bmN0aW9uKG9iaiwga2V5cywgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24ob2JqLCBtc2csIGFzc2VydC5oYXNBbnlLZXlzLCB0cnVlKS50by5oYXZlLmFueS5rZXlzKGtleXMpO1xufTtcbmFzc2VydC5oYXNBbGxLZXlzID0gZnVuY3Rpb24ob2JqLCBrZXlzLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihvYmosIG1zZywgYXNzZXJ0Lmhhc0FsbEtleXMsIHRydWUpLnRvLmhhdmUuYWxsLmtleXMoa2V5cyk7XG59O1xuYXNzZXJ0LmNvbnRhaW5zQWxsS2V5cyA9IGZ1bmN0aW9uKG9iaiwga2V5cywgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24ob2JqLCBtc2csIGFzc2VydC5jb250YWluc0FsbEtleXMsIHRydWUpLnRvLmNvbnRhaW4uYWxsLmtleXMoXG4gICAga2V5c1xuICApO1xufTtcbmFzc2VydC5kb2VzTm90SGF2ZUFueUtleXMgPSBmdW5jdGlvbihvYmosIGtleXMsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnLCBhc3NlcnQuZG9lc05vdEhhdmVBbnlLZXlzLCB0cnVlKS50by5ub3QuaGF2ZS5hbnkua2V5cyhcbiAgICBrZXlzXG4gICk7XG59O1xuYXNzZXJ0LmRvZXNOb3RIYXZlQWxsS2V5cyA9IGZ1bmN0aW9uKG9iaiwga2V5cywgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24ob2JqLCBtc2csIGFzc2VydC5kb2VzTm90SGF2ZUFsbEtleXMsIHRydWUpLnRvLm5vdC5oYXZlLmFsbC5rZXlzKFxuICAgIGtleXNcbiAgKTtcbn07XG5hc3NlcnQuaGFzQW55RGVlcEtleXMgPSBmdW5jdGlvbihvYmosIGtleXMsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnLCBhc3NlcnQuaGFzQW55RGVlcEtleXMsIHRydWUpLnRvLmhhdmUuYW55LmRlZXAua2V5cyhcbiAgICBrZXlzXG4gICk7XG59O1xuYXNzZXJ0Lmhhc0FsbERlZXBLZXlzID0gZnVuY3Rpb24ob2JqLCBrZXlzLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihvYmosIG1zZywgYXNzZXJ0Lmhhc0FsbERlZXBLZXlzLCB0cnVlKS50by5oYXZlLmFsbC5kZWVwLmtleXMoXG4gICAga2V5c1xuICApO1xufTtcbmFzc2VydC5jb250YWluc0FsbERlZXBLZXlzID0gZnVuY3Rpb24ob2JqLCBrZXlzLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihcbiAgICBvYmosXG4gICAgbXNnLFxuICAgIGFzc2VydC5jb250YWluc0FsbERlZXBLZXlzLFxuICAgIHRydWVcbiAgKS50by5jb250YWluLmFsbC5kZWVwLmtleXMoa2V5cyk7XG59O1xuYXNzZXJ0LmRvZXNOb3RIYXZlQW55RGVlcEtleXMgPSBmdW5jdGlvbihvYmosIGtleXMsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKFxuICAgIG9iaixcbiAgICBtc2csXG4gICAgYXNzZXJ0LmRvZXNOb3RIYXZlQW55RGVlcEtleXMsXG4gICAgdHJ1ZVxuICApLnRvLm5vdC5oYXZlLmFueS5kZWVwLmtleXMoa2V5cyk7XG59O1xuYXNzZXJ0LmRvZXNOb3RIYXZlQWxsRGVlcEtleXMgPSBmdW5jdGlvbihvYmosIGtleXMsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKFxuICAgIG9iaixcbiAgICBtc2csXG4gICAgYXNzZXJ0LmRvZXNOb3RIYXZlQWxsRGVlcEtleXMsXG4gICAgdHJ1ZVxuICApLnRvLm5vdC5oYXZlLmFsbC5kZWVwLmtleXMoa2V5cyk7XG59O1xuYXNzZXJ0LnRocm93cyA9IGZ1bmN0aW9uKGZuLCBlcnJvckxpa2UsIGVyck1zZ01hdGNoZXIsIG1zZykge1xuICBpZiAoXCJzdHJpbmdcIiA9PT0gdHlwZW9mIGVycm9yTGlrZSB8fCBlcnJvckxpa2UgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICBlcnJNc2dNYXRjaGVyID0gZXJyb3JMaWtlO1xuICAgIGVycm9yTGlrZSA9IG51bGw7XG4gIH1cbiAgbGV0IGFzc2VydEVyciA9IG5ldyBBc3NlcnRpb24oZm4sIG1zZywgYXNzZXJ0LnRocm93cywgdHJ1ZSkudG8udGhyb3coXG4gICAgZXJyb3JMaWtlLFxuICAgIGVyck1zZ01hdGNoZXJcbiAgKTtcbiAgcmV0dXJuIGZsYWcoYXNzZXJ0RXJyLCBcIm9iamVjdFwiKTtcbn07XG5hc3NlcnQuZG9lc05vdFRocm93ID0gZnVuY3Rpb24oZm4sIGVycm9yTGlrZSwgZXJyTXNnTWF0Y2hlciwgbWVzc2FnZSkge1xuICBpZiAoXCJzdHJpbmdcIiA9PT0gdHlwZW9mIGVycm9yTGlrZSB8fCBlcnJvckxpa2UgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICBlcnJNc2dNYXRjaGVyID0gZXJyb3JMaWtlO1xuICAgIGVycm9yTGlrZSA9IG51bGw7XG4gIH1cbiAgbmV3IEFzc2VydGlvbihmbiwgbWVzc2FnZSwgYXNzZXJ0LmRvZXNOb3RUaHJvdywgdHJ1ZSkudG8ubm90LnRocm93KFxuICAgIGVycm9yTGlrZSxcbiAgICBlcnJNc2dNYXRjaGVyXG4gICk7XG59O1xuYXNzZXJ0Lm9wZXJhdG9yID0gZnVuY3Rpb24odmFsLCBvcGVyYXRvciwgdmFsMiwgbXNnKSB7XG4gIGxldCBvaztcbiAgc3dpdGNoIChvcGVyYXRvcikge1xuICAgIGNhc2UgXCI9PVwiOlxuICAgICAgb2sgPSB2YWwgPT0gdmFsMjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCI9PT1cIjpcbiAgICAgIG9rID0gdmFsID09PSB2YWwyO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIj5cIjpcbiAgICAgIG9rID0gdmFsID4gdmFsMjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCI+PVwiOlxuICAgICAgb2sgPSB2YWwgPj0gdmFsMjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCI8XCI6XG4gICAgICBvayA9IHZhbCA8IHZhbDI7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiPD1cIjpcbiAgICAgIG9rID0gdmFsIDw9IHZhbDI7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiIT1cIjpcbiAgICAgIG9rID0gdmFsICE9IHZhbDI7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiIT09XCI6XG4gICAgICBvayA9IHZhbCAhPT0gdmFsMjtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBtc2cgPSBtc2cgPyBtc2cgKyBcIjogXCIgOiBtc2c7XG4gICAgICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IoXG4gICAgICAgIG1zZyArICdJbnZhbGlkIG9wZXJhdG9yIFwiJyArIG9wZXJhdG9yICsgJ1wiJyxcbiAgICAgICAgdm9pZCAwLFxuICAgICAgICBhc3NlcnQub3BlcmF0b3JcbiAgICAgICk7XG4gIH1cbiAgbGV0IHRlc3QyID0gbmV3IEFzc2VydGlvbihvaywgbXNnLCBhc3NlcnQub3BlcmF0b3IsIHRydWUpO1xuICB0ZXN0Mi5hc3NlcnQoXG4gICAgdHJ1ZSA9PT0gZmxhZyh0ZXN0MiwgXCJvYmplY3RcIiksXG4gICAgXCJleHBlY3RlZCBcIiArIGluc3BlY3QyKHZhbCkgKyBcIiB0byBiZSBcIiArIG9wZXJhdG9yICsgXCIgXCIgKyBpbnNwZWN0Mih2YWwyKSxcbiAgICBcImV4cGVjdGVkIFwiICsgaW5zcGVjdDIodmFsKSArIFwiIHRvIG5vdCBiZSBcIiArIG9wZXJhdG9yICsgXCIgXCIgKyBpbnNwZWN0Mih2YWwyKVxuICApO1xufTtcbmFzc2VydC5jbG9zZVRvID0gZnVuY3Rpb24oYWN0LCBleHAsIGRlbHRhLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihhY3QsIG1zZywgYXNzZXJ0LmNsb3NlVG8sIHRydWUpLnRvLmJlLmNsb3NlVG8oZXhwLCBkZWx0YSk7XG59O1xuYXNzZXJ0LmFwcHJveGltYXRlbHkgPSBmdW5jdGlvbihhY3QsIGV4cCwgZGVsdGEsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKGFjdCwgbXNnLCBhc3NlcnQuYXBwcm94aW1hdGVseSwgdHJ1ZSkudG8uYmUuYXBwcm94aW1hdGVseShcbiAgICBleHAsXG4gICAgZGVsdGFcbiAgKTtcbn07XG5hc3NlcnQuc2FtZU1lbWJlcnMgPSBmdW5jdGlvbihzZXQxLCBzZXQyLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihzZXQxLCBtc2csIGFzc2VydC5zYW1lTWVtYmVycywgdHJ1ZSkudG8uaGF2ZS5zYW1lLm1lbWJlcnMoc2V0Mik7XG59O1xuYXNzZXJ0Lm5vdFNhbWVNZW1iZXJzID0gZnVuY3Rpb24oc2V0MSwgc2V0MiwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oXG4gICAgc2V0MSxcbiAgICBtc2csXG4gICAgYXNzZXJ0Lm5vdFNhbWVNZW1iZXJzLFxuICAgIHRydWVcbiAgKS50by5ub3QuaGF2ZS5zYW1lLm1lbWJlcnMoc2V0Mik7XG59O1xuYXNzZXJ0LnNhbWVEZWVwTWVtYmVycyA9IGZ1bmN0aW9uKHNldDEsIHNldDIsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKFxuICAgIHNldDEsXG4gICAgbXNnLFxuICAgIGFzc2VydC5zYW1lRGVlcE1lbWJlcnMsXG4gICAgdHJ1ZVxuICApLnRvLmhhdmUuc2FtZS5kZWVwLm1lbWJlcnMoc2V0Mik7XG59O1xuYXNzZXJ0Lm5vdFNhbWVEZWVwTWVtYmVycyA9IGZ1bmN0aW9uKHNldDEsIHNldDIsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKFxuICAgIHNldDEsXG4gICAgbXNnLFxuICAgIGFzc2VydC5ub3RTYW1lRGVlcE1lbWJlcnMsXG4gICAgdHJ1ZVxuICApLnRvLm5vdC5oYXZlLnNhbWUuZGVlcC5tZW1iZXJzKHNldDIpO1xufTtcbmFzc2VydC5zYW1lT3JkZXJlZE1lbWJlcnMgPSBmdW5jdGlvbihzZXQxLCBzZXQyLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihcbiAgICBzZXQxLFxuICAgIG1zZyxcbiAgICBhc3NlcnQuc2FtZU9yZGVyZWRNZW1iZXJzLFxuICAgIHRydWVcbiAgKS50by5oYXZlLnNhbWUub3JkZXJlZC5tZW1iZXJzKHNldDIpO1xufTtcbmFzc2VydC5ub3RTYW1lT3JkZXJlZE1lbWJlcnMgPSBmdW5jdGlvbihzZXQxLCBzZXQyLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihcbiAgICBzZXQxLFxuICAgIG1zZyxcbiAgICBhc3NlcnQubm90U2FtZU9yZGVyZWRNZW1iZXJzLFxuICAgIHRydWVcbiAgKS50by5ub3QuaGF2ZS5zYW1lLm9yZGVyZWQubWVtYmVycyhzZXQyKTtcbn07XG5hc3NlcnQuc2FtZURlZXBPcmRlcmVkTWVtYmVycyA9IGZ1bmN0aW9uKHNldDEsIHNldDIsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKFxuICAgIHNldDEsXG4gICAgbXNnLFxuICAgIGFzc2VydC5zYW1lRGVlcE9yZGVyZWRNZW1iZXJzLFxuICAgIHRydWVcbiAgKS50by5oYXZlLnNhbWUuZGVlcC5vcmRlcmVkLm1lbWJlcnMoc2V0Mik7XG59O1xuYXNzZXJ0Lm5vdFNhbWVEZWVwT3JkZXJlZE1lbWJlcnMgPSBmdW5jdGlvbihzZXQxLCBzZXQyLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihcbiAgICBzZXQxLFxuICAgIG1zZyxcbiAgICBhc3NlcnQubm90U2FtZURlZXBPcmRlcmVkTWVtYmVycyxcbiAgICB0cnVlXG4gICkudG8ubm90LmhhdmUuc2FtZS5kZWVwLm9yZGVyZWQubWVtYmVycyhzZXQyKTtcbn07XG5hc3NlcnQuaW5jbHVkZU1lbWJlcnMgPSBmdW5jdGlvbihzdXBlcnNldCwgc3Vic2V0LCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihzdXBlcnNldCwgbXNnLCBhc3NlcnQuaW5jbHVkZU1lbWJlcnMsIHRydWUpLnRvLmluY2x1ZGUubWVtYmVycyhcbiAgICBzdWJzZXRcbiAgKTtcbn07XG5hc3NlcnQubm90SW5jbHVkZU1lbWJlcnMgPSBmdW5jdGlvbihzdXBlcnNldCwgc3Vic2V0LCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihcbiAgICBzdXBlcnNldCxcbiAgICBtc2csXG4gICAgYXNzZXJ0Lm5vdEluY2x1ZGVNZW1iZXJzLFxuICAgIHRydWVcbiAgKS50by5ub3QuaW5jbHVkZS5tZW1iZXJzKHN1YnNldCk7XG59O1xuYXNzZXJ0LmluY2x1ZGVEZWVwTWVtYmVycyA9IGZ1bmN0aW9uKHN1cGVyc2V0LCBzdWJzZXQsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKFxuICAgIHN1cGVyc2V0LFxuICAgIG1zZyxcbiAgICBhc3NlcnQuaW5jbHVkZURlZXBNZW1iZXJzLFxuICAgIHRydWVcbiAgKS50by5pbmNsdWRlLmRlZXAubWVtYmVycyhzdWJzZXQpO1xufTtcbmFzc2VydC5ub3RJbmNsdWRlRGVlcE1lbWJlcnMgPSBmdW5jdGlvbihzdXBlcnNldCwgc3Vic2V0LCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihcbiAgICBzdXBlcnNldCxcbiAgICBtc2csXG4gICAgYXNzZXJ0Lm5vdEluY2x1ZGVEZWVwTWVtYmVycyxcbiAgICB0cnVlXG4gICkudG8ubm90LmluY2x1ZGUuZGVlcC5tZW1iZXJzKHN1YnNldCk7XG59O1xuYXNzZXJ0LmluY2x1ZGVPcmRlcmVkTWVtYmVycyA9IGZ1bmN0aW9uKHN1cGVyc2V0LCBzdWJzZXQsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKFxuICAgIHN1cGVyc2V0LFxuICAgIG1zZyxcbiAgICBhc3NlcnQuaW5jbHVkZU9yZGVyZWRNZW1iZXJzLFxuICAgIHRydWVcbiAgKS50by5pbmNsdWRlLm9yZGVyZWQubWVtYmVycyhzdWJzZXQpO1xufTtcbmFzc2VydC5ub3RJbmNsdWRlT3JkZXJlZE1lbWJlcnMgPSBmdW5jdGlvbihzdXBlcnNldCwgc3Vic2V0LCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihcbiAgICBzdXBlcnNldCxcbiAgICBtc2csXG4gICAgYXNzZXJ0Lm5vdEluY2x1ZGVPcmRlcmVkTWVtYmVycyxcbiAgICB0cnVlXG4gICkudG8ubm90LmluY2x1ZGUub3JkZXJlZC5tZW1iZXJzKHN1YnNldCk7XG59O1xuYXNzZXJ0LmluY2x1ZGVEZWVwT3JkZXJlZE1lbWJlcnMgPSBmdW5jdGlvbihzdXBlcnNldCwgc3Vic2V0LCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihcbiAgICBzdXBlcnNldCxcbiAgICBtc2csXG4gICAgYXNzZXJ0LmluY2x1ZGVEZWVwT3JkZXJlZE1lbWJlcnMsXG4gICAgdHJ1ZVxuICApLnRvLmluY2x1ZGUuZGVlcC5vcmRlcmVkLm1lbWJlcnMoc3Vic2V0KTtcbn07XG5hc3NlcnQubm90SW5jbHVkZURlZXBPcmRlcmVkTWVtYmVycyA9IGZ1bmN0aW9uKHN1cGVyc2V0LCBzdWJzZXQsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKFxuICAgIHN1cGVyc2V0LFxuICAgIG1zZyxcbiAgICBhc3NlcnQubm90SW5jbHVkZURlZXBPcmRlcmVkTWVtYmVycyxcbiAgICB0cnVlXG4gICkudG8ubm90LmluY2x1ZGUuZGVlcC5vcmRlcmVkLm1lbWJlcnMoc3Vic2V0KTtcbn07XG5hc3NlcnQub25lT2YgPSBmdW5jdGlvbihpbkxpc3QsIGxpc3QsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKGluTGlzdCwgbXNnLCBhc3NlcnQub25lT2YsIHRydWUpLnRvLmJlLm9uZU9mKGxpc3QpO1xufTtcbmFzc2VydC5pc0l0ZXJhYmxlID0gZnVuY3Rpb24ob2JqLCBtc2cpIHtcbiAgaWYgKG9iaiA9PSB2b2lkIDAgfHwgIW9ialtTeW1ib2wuaXRlcmF0b3JdKSB7XG4gICAgbXNnID0gbXNnID8gYCR7bXNnfSBleHBlY3RlZCAke2luc3BlY3QyKG9iail9IHRvIGJlIGFuIGl0ZXJhYmxlYCA6IGBleHBlY3RlZCAke2luc3BlY3QyKG9iail9IHRvIGJlIGFuIGl0ZXJhYmxlYDtcbiAgICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IobXNnLCB2b2lkIDAsIGFzc2VydC5pc0l0ZXJhYmxlKTtcbiAgfVxufTtcbmFzc2VydC5jaGFuZ2VzID0gZnVuY3Rpb24oZm4sIG9iaiwgcHJvcCwgbXNnKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzICYmIHR5cGVvZiBvYmogPT09IFwiZnVuY3Rpb25cIikge1xuICAgIG1zZyA9IHByb3A7XG4gICAgcHJvcCA9IG51bGw7XG4gIH1cbiAgbmV3IEFzc2VydGlvbihmbiwgbXNnLCBhc3NlcnQuY2hhbmdlcywgdHJ1ZSkudG8uY2hhbmdlKG9iaiwgcHJvcCk7XG59O1xuYXNzZXJ0LmNoYW5nZXNCeSA9IGZ1bmN0aW9uKGZuLCBvYmosIHByb3AsIGRlbHRhLCBtc2cpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDQgJiYgdHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgbGV0IHRtcE1zZyA9IGRlbHRhO1xuICAgIGRlbHRhID0gcHJvcDtcbiAgICBtc2cgPSB0bXBNc2c7XG4gIH0gZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMykge1xuICAgIGRlbHRhID0gcHJvcDtcbiAgICBwcm9wID0gbnVsbDtcbiAgfVxuICBuZXcgQXNzZXJ0aW9uKGZuLCBtc2csIGFzc2VydC5jaGFuZ2VzQnksIHRydWUpLnRvLmNoYW5nZShvYmosIHByb3ApLmJ5KGRlbHRhKTtcbn07XG5hc3NlcnQuZG9lc05vdENoYW5nZSA9IGZ1bmN0aW9uKGZuLCBvYmosIHByb3AsIG1zZykge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMyAmJiB0eXBlb2Ygb2JqID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBtc2cgPSBwcm9wO1xuICAgIHByb3AgPSBudWxsO1xuICB9XG4gIHJldHVybiBuZXcgQXNzZXJ0aW9uKGZuLCBtc2csIGFzc2VydC5kb2VzTm90Q2hhbmdlLCB0cnVlKS50by5ub3QuY2hhbmdlKFxuICAgIG9iaixcbiAgICBwcm9wXG4gICk7XG59O1xuYXNzZXJ0LmNoYW5nZXNCdXROb3RCeSA9IGZ1bmN0aW9uKGZuLCBvYmosIHByb3AsIGRlbHRhLCBtc2cpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDQgJiYgdHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgbGV0IHRtcE1zZyA9IGRlbHRhO1xuICAgIGRlbHRhID0gcHJvcDtcbiAgICBtc2cgPSB0bXBNc2c7XG4gIH0gZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMykge1xuICAgIGRlbHRhID0gcHJvcDtcbiAgICBwcm9wID0gbnVsbDtcbiAgfVxuICBuZXcgQXNzZXJ0aW9uKGZuLCBtc2csIGFzc2VydC5jaGFuZ2VzQnV0Tm90QnksIHRydWUpLnRvLmNoYW5nZShvYmosIHByb3ApLmJ1dC5ub3QuYnkoZGVsdGEpO1xufTtcbmFzc2VydC5pbmNyZWFzZXMgPSBmdW5jdGlvbihmbiwgb2JqLCBwcm9wLCBtc2cpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMgJiYgdHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgbXNnID0gcHJvcDtcbiAgICBwcm9wID0gbnVsbDtcbiAgfVxuICByZXR1cm4gbmV3IEFzc2VydGlvbihmbiwgbXNnLCBhc3NlcnQuaW5jcmVhc2VzLCB0cnVlKS50by5pbmNyZWFzZShvYmosIHByb3ApO1xufTtcbmFzc2VydC5pbmNyZWFzZXNCeSA9IGZ1bmN0aW9uKGZuLCBvYmosIHByb3AsIGRlbHRhLCBtc2cpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDQgJiYgdHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgbGV0IHRtcE1zZyA9IGRlbHRhO1xuICAgIGRlbHRhID0gcHJvcDtcbiAgICBtc2cgPSB0bXBNc2c7XG4gIH0gZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMykge1xuICAgIGRlbHRhID0gcHJvcDtcbiAgICBwcm9wID0gbnVsbDtcbiAgfVxuICBuZXcgQXNzZXJ0aW9uKGZuLCBtc2csIGFzc2VydC5pbmNyZWFzZXNCeSwgdHJ1ZSkudG8uaW5jcmVhc2Uob2JqLCBwcm9wKS5ieShkZWx0YSk7XG59O1xuYXNzZXJ0LmRvZXNOb3RJbmNyZWFzZSA9IGZ1bmN0aW9uKGZuLCBvYmosIHByb3AsIG1zZykge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMyAmJiB0eXBlb2Ygb2JqID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBtc2cgPSBwcm9wO1xuICAgIHByb3AgPSBudWxsO1xuICB9XG4gIHJldHVybiBuZXcgQXNzZXJ0aW9uKGZuLCBtc2csIGFzc2VydC5kb2VzTm90SW5jcmVhc2UsIHRydWUpLnRvLm5vdC5pbmNyZWFzZShcbiAgICBvYmosXG4gICAgcHJvcFxuICApO1xufTtcbmFzc2VydC5pbmNyZWFzZXNCdXROb3RCeSA9IGZ1bmN0aW9uKGZuLCBvYmosIHByb3AsIGRlbHRhLCBtc2cpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDQgJiYgdHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgbGV0IHRtcE1zZyA9IGRlbHRhO1xuICAgIGRlbHRhID0gcHJvcDtcbiAgICBtc2cgPSB0bXBNc2c7XG4gIH0gZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMykge1xuICAgIGRlbHRhID0gcHJvcDtcbiAgICBwcm9wID0gbnVsbDtcbiAgfVxuICBuZXcgQXNzZXJ0aW9uKGZuLCBtc2csIGFzc2VydC5pbmNyZWFzZXNCdXROb3RCeSwgdHJ1ZSkudG8uaW5jcmVhc2Uob2JqLCBwcm9wKS5idXQubm90LmJ5KGRlbHRhKTtcbn07XG5hc3NlcnQuZGVjcmVhc2VzID0gZnVuY3Rpb24oZm4sIG9iaiwgcHJvcCwgbXNnKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzICYmIHR5cGVvZiBvYmogPT09IFwiZnVuY3Rpb25cIikge1xuICAgIG1zZyA9IHByb3A7XG4gICAgcHJvcCA9IG51bGw7XG4gIH1cbiAgcmV0dXJuIG5ldyBBc3NlcnRpb24oZm4sIG1zZywgYXNzZXJ0LmRlY3JlYXNlcywgdHJ1ZSkudG8uZGVjcmVhc2Uob2JqLCBwcm9wKTtcbn07XG5hc3NlcnQuZGVjcmVhc2VzQnkgPSBmdW5jdGlvbihmbiwgb2JqLCBwcm9wLCBkZWx0YSwgbXNnKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSA0ICYmIHR5cGVvZiBvYmogPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGxldCB0bXBNc2cgPSBkZWx0YTtcbiAgICBkZWx0YSA9IHByb3A7XG4gICAgbXNnID0gdG1wTXNnO1xuICB9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMpIHtcbiAgICBkZWx0YSA9IHByb3A7XG4gICAgcHJvcCA9IG51bGw7XG4gIH1cbiAgbmV3IEFzc2VydGlvbihmbiwgbXNnLCBhc3NlcnQuZGVjcmVhc2VzQnksIHRydWUpLnRvLmRlY3JlYXNlKG9iaiwgcHJvcCkuYnkoZGVsdGEpO1xufTtcbmFzc2VydC5kb2VzTm90RGVjcmVhc2UgPSBmdW5jdGlvbihmbiwgb2JqLCBwcm9wLCBtc2cpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMgJiYgdHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgbXNnID0gcHJvcDtcbiAgICBwcm9wID0gbnVsbDtcbiAgfVxuICByZXR1cm4gbmV3IEFzc2VydGlvbihmbiwgbXNnLCBhc3NlcnQuZG9lc05vdERlY3JlYXNlLCB0cnVlKS50by5ub3QuZGVjcmVhc2UoXG4gICAgb2JqLFxuICAgIHByb3BcbiAgKTtcbn07XG5hc3NlcnQuZG9lc05vdERlY3JlYXNlQnkgPSBmdW5jdGlvbihmbiwgb2JqLCBwcm9wLCBkZWx0YSwgbXNnKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSA0ICYmIHR5cGVvZiBvYmogPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGxldCB0bXBNc2cgPSBkZWx0YTtcbiAgICBkZWx0YSA9IHByb3A7XG4gICAgbXNnID0gdG1wTXNnO1xuICB9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMpIHtcbiAgICBkZWx0YSA9IHByb3A7XG4gICAgcHJvcCA9IG51bGw7XG4gIH1cbiAgcmV0dXJuIG5ldyBBc3NlcnRpb24oZm4sIG1zZywgYXNzZXJ0LmRvZXNOb3REZWNyZWFzZUJ5LCB0cnVlKS50by5ub3QuZGVjcmVhc2Uob2JqLCBwcm9wKS5ieShkZWx0YSk7XG59O1xuYXNzZXJ0LmRlY3JlYXNlc0J1dE5vdEJ5ID0gZnVuY3Rpb24oZm4sIG9iaiwgcHJvcCwgZGVsdGEsIG1zZykge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gNCAmJiB0eXBlb2Ygb2JqID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBsZXQgdG1wTXNnID0gZGVsdGE7XG4gICAgZGVsdGEgPSBwcm9wO1xuICAgIG1zZyA9IHRtcE1zZztcbiAgfSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzKSB7XG4gICAgZGVsdGEgPSBwcm9wO1xuICAgIHByb3AgPSBudWxsO1xuICB9XG4gIG5ldyBBc3NlcnRpb24oZm4sIG1zZywgYXNzZXJ0LmRlY3JlYXNlc0J1dE5vdEJ5LCB0cnVlKS50by5kZWNyZWFzZShvYmosIHByb3ApLmJ1dC5ub3QuYnkoZGVsdGEpO1xufTtcbmFzc2VydC5pZkVycm9yID0gZnVuY3Rpb24odmFsKSB7XG4gIGlmICh2YWwpIHtcbiAgICB0aHJvdyB2YWw7XG4gIH1cbn07XG5hc3NlcnQuaXNFeHRlbnNpYmxlID0gZnVuY3Rpb24ob2JqLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihvYmosIG1zZywgYXNzZXJ0LmlzRXh0ZW5zaWJsZSwgdHJ1ZSkudG8uYmUuZXh0ZW5zaWJsZTtcbn07XG5hc3NlcnQuaXNOb3RFeHRlbnNpYmxlID0gZnVuY3Rpb24ob2JqLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihvYmosIG1zZywgYXNzZXJ0LmlzTm90RXh0ZW5zaWJsZSwgdHJ1ZSkudG8ubm90LmJlLmV4dGVuc2libGU7XG59O1xuYXNzZXJ0LmlzU2VhbGVkID0gZnVuY3Rpb24ob2JqLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihvYmosIG1zZywgYXNzZXJ0LmlzU2VhbGVkLCB0cnVlKS50by5iZS5zZWFsZWQ7XG59O1xuYXNzZXJ0LmlzTm90U2VhbGVkID0gZnVuY3Rpb24ob2JqLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihvYmosIG1zZywgYXNzZXJ0LmlzTm90U2VhbGVkLCB0cnVlKS50by5ub3QuYmUuc2VhbGVkO1xufTtcbmFzc2VydC5pc0Zyb3plbiA9IGZ1bmN0aW9uKG9iaiwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24ob2JqLCBtc2csIGFzc2VydC5pc0Zyb3plbiwgdHJ1ZSkudG8uYmUuZnJvemVuO1xufTtcbmFzc2VydC5pc05vdEZyb3plbiA9IGZ1bmN0aW9uKG9iaiwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24ob2JqLCBtc2csIGFzc2VydC5pc05vdEZyb3plbiwgdHJ1ZSkudG8ubm90LmJlLmZyb3plbjtcbn07XG5hc3NlcnQuaXNFbXB0eSA9IGZ1bmN0aW9uKHZhbCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc0VtcHR5LCB0cnVlKS50by5iZS5lbXB0eTtcbn07XG5hc3NlcnQuaXNOb3RFbXB0eSA9IGZ1bmN0aW9uKHZhbCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc05vdEVtcHR5LCB0cnVlKS50by5ub3QuYmUuZW1wdHk7XG59O1xuYXNzZXJ0LmNvbnRhaW5zU3Vic2V0ID0gZnVuY3Rpb24odmFsLCBleHAsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnKS50by5jb250YWluU3Vic2V0KGV4cCk7XG59O1xuYXNzZXJ0LmRvZXNOb3RDb250YWluU3Vic2V0ID0gZnVuY3Rpb24odmFsLCBleHAsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnKS50by5ub3QuY29udGFpblN1YnNldChleHApO1xufTtcbnZhciBhbGlhc2VzID0gW1xuICBbXCJpc09rXCIsIFwib2tcIl0sXG4gIFtcImlzTm90T2tcIiwgXCJub3RPa1wiXSxcbiAgW1widGhyb3dzXCIsIFwidGhyb3dcIl0sXG4gIFtcInRocm93c1wiLCBcIlRocm93XCJdLFxuICBbXCJpc0V4dGVuc2libGVcIiwgXCJleHRlbnNpYmxlXCJdLFxuICBbXCJpc05vdEV4dGVuc2libGVcIiwgXCJub3RFeHRlbnNpYmxlXCJdLFxuICBbXCJpc1NlYWxlZFwiLCBcInNlYWxlZFwiXSxcbiAgW1wiaXNOb3RTZWFsZWRcIiwgXCJub3RTZWFsZWRcIl0sXG4gIFtcImlzRnJvemVuXCIsIFwiZnJvemVuXCJdLFxuICBbXCJpc05vdEZyb3plblwiLCBcIm5vdEZyb3plblwiXSxcbiAgW1wiaXNFbXB0eVwiLCBcImVtcHR5XCJdLFxuICBbXCJpc05vdEVtcHR5XCIsIFwibm90RW1wdHlcIl0sXG4gIFtcImlzQ2FsbGFibGVcIiwgXCJpc0Z1bmN0aW9uXCJdLFxuICBbXCJpc05vdENhbGxhYmxlXCIsIFwiaXNOb3RGdW5jdGlvblwiXSxcbiAgW1wiY29udGFpbnNTdWJzZXRcIiwgXCJjb250YWluU3Vic2V0XCJdXG5dO1xuZm9yIChjb25zdCBbbmFtZSwgYXNdIG9mIGFsaWFzZXMpIHtcbiAgYXNzZXJ0W2FzXSA9IGFzc2VydFtuYW1lXTtcbn1cblxuLy8gbGliL2NoYWkuanNcbnZhciB1c2VkID0gW107XG5mdW5jdGlvbiB1c2UoZm4pIHtcbiAgY29uc3QgZXhwb3J0cyA9IHtcbiAgICB1c2UsXG4gICAgQXNzZXJ0aW9uRXJyb3IsXG4gICAgdXRpbDogdXRpbHNfZXhwb3J0cyxcbiAgICBjb25maWcsXG4gICAgZXhwZWN0LFxuICAgIGFzc2VydCxcbiAgICBBc3NlcnRpb24sXG4gICAgLi4uc2hvdWxkX2V4cG9ydHNcbiAgfTtcbiAgaWYgKCF+dXNlZC5pbmRleE9mKGZuKSkge1xuICAgIGZuKGV4cG9ydHMsIHV0aWxzX2V4cG9ydHMpO1xuICAgIHVzZWQucHVzaChmbik7XG4gIH1cbiAgcmV0dXJuIGV4cG9ydHM7XG59XG5fX25hbWUodXNlLCBcInVzZVwiKTtcbmV4cG9ydCB7XG4gIEFzc2VydGlvbixcbiAgQXNzZXJ0aW9uRXJyb3IsXG4gIFNob3VsZCxcbiAgYXNzZXJ0LFxuICBjb25maWcsXG4gIGV4cGVjdCxcbiAgc2hvdWxkLFxuICB1c2UsXG4gIHV0aWxzX2V4cG9ydHMgYXMgdXRpbFxufTtcbi8qIVxuICogQ2hhaSAtIGZsYWcgdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG4vKiFcbiAqIENoYWkgLSB0ZXN0IHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuLyohXG4gKiBDaGFpIC0gZXhwZWN0VHlwZXMgdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG4vKiFcbiAqIENoYWkgLSBnZXRBY3R1YWwgdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG4vKiFcbiAqIENoYWkgLSBtZXNzYWdlIGNvbXBvc2l0aW9uIHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuLyohXG4gKiBDaGFpIC0gdHJhbnNmZXJGbGFncyB1dGlsaXR5XG4gKiBDb3B5cmlnaHQoYykgMjAxMi0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cbi8qIVxuICogY2hhaVxuICogaHR0cDovL2NoYWlqcy5jb21cbiAqIENvcHlyaWdodChjKSAyMDExLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuLyohXG4gKiBDaGFpIC0gaXNQcm94eUVuYWJsZWQgaGVscGVyXG4gKiBDb3B5cmlnaHQoYykgMjAxMi0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cbi8qIVxuICogQ2hhaSAtIGFkZFByb3BlcnR5IHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuLyohXG4gKiBDaGFpIC0gYWRkTGVuZ3RoR3VhcmQgdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG4vKiFcbiAqIENoYWkgLSBnZXRQcm9wZXJ0aWVzIHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuLyohXG4gKiBDaGFpIC0gcHJveGlmeSB1dGlsaXR5XG4gKiBDb3B5cmlnaHQoYykgMjAxMi0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cbi8qIVxuICogQ2hhaSAtIGFkZE1ldGhvZCB1dGlsaXR5XG4gKiBDb3B5cmlnaHQoYykgMjAxMi0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cbi8qIVxuICogQ2hhaSAtIG92ZXJ3cml0ZVByb3BlcnR5IHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuLyohXG4gKiBDaGFpIC0gb3ZlcndyaXRlTWV0aG9kIHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuLyohXG4gKiBDaGFpIC0gYWRkQ2hhaW5pbmdNZXRob2QgdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG4vKiFcbiAqIENoYWkgLSBvdmVyd3JpdGVDaGFpbmFibGVNZXRob2QgdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG4vKiFcbiAqIENoYWkgLSBjb21wYXJlQnlJbnNwZWN0IHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDExLTIwMTYgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuLyohXG4gKiBDaGFpIC0gZ2V0T3duRW51bWVyYWJsZVByb3BlcnR5U3ltYm9scyB1dGlsaXR5XG4gKiBDb3B5cmlnaHQoYykgMjAxMS0yMDE2IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cbi8qIVxuICogQ2hhaSAtIGdldE93bkVudW1lcmFibGVQcm9wZXJ0aWVzIHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDExLTIwMTYgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuLyohXG4gKiBDaGFpIC0gaXNOYU4gdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNSBTYWt0aGlwcml5YW4gVmFpcmFtYW5pIDx0aGVjaGFyZ2luZ3ZvbGNhbm9AZ21haWwuY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cbi8qIVxuICogY2hhaVxuICogQ29weXJpZ2h0KGMpIDIwMTEgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuLyohXG4gKiBjaGFpXG4gKiBDb3B5cmlnaHQoYykgMjAxMS0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cbi8qISBCdW5kbGVkIGxpY2Vuc2UgaW5mb3JtYXRpb246XG5cbmRlZXAtZXFsL2luZGV4LmpzOlxuICAoKiFcbiAgICogZGVlcC1lcWxcbiAgICogQ29weXJpZ2h0KGMpIDIwMTMgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gICAqIE1JVCBMaWNlbnNlZFxuICAgKilcbiAgKCohXG4gICAqIENoZWNrIHRvIHNlZSBpZiB0aGUgTWVtb2l6ZU1hcCBoYXMgcmVjb3JkZWQgYSByZXN1bHQgb2YgdGhlIHR3byBvcGVyYW5kc1xuICAgKlxuICAgKiBAcGFyYW0ge01peGVkfSBsZWZ0SGFuZE9wZXJhbmRcbiAgICogQHBhcmFtIHtNaXhlZH0gcmlnaHRIYW5kT3BlcmFuZFxuICAgKiBAcGFyYW0ge01lbW9pemVNYXB9IG1lbW9pemVNYXBcbiAgICogQHJldHVybnMge0Jvb2xlYW58bnVsbH0gcmVzdWx0XG4gICopXG4gICgqIVxuICAgKiBTZXQgdGhlIHJlc3VsdCBvZiB0aGUgZXF1YWxpdHkgaW50byB0aGUgTWVtb2l6ZU1hcFxuICAgKlxuICAgKiBAcGFyYW0ge01peGVkfSBsZWZ0SGFuZE9wZXJhbmRcbiAgICogQHBhcmFtIHtNaXhlZH0gcmlnaHRIYW5kT3BlcmFuZFxuICAgKiBAcGFyYW0ge01lbW9pemVNYXB9IG1lbW9pemVNYXBcbiAgICogQHBhcmFtIHtCb29sZWFufSByZXN1bHRcbiAgKilcbiAgKCohXG4gICAqIFByaW1hcnkgRXhwb3J0XG4gICAqKVxuICAoKiFcbiAgICogVGhlIG1haW4gbG9naWMgb2YgdGhlIGBkZWVwRXF1YWxgIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge01peGVkfSBsZWZ0SGFuZE9wZXJhbmRcbiAgICogQHBhcmFtIHtNaXhlZH0gcmlnaHRIYW5kT3BlcmFuZFxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIChvcHRpb25hbCkgQWRkaXRpb25hbCBvcHRpb25zXG4gICAqIEBwYXJhbSB7QXJyYXl9IFtvcHRpb25zLmNvbXBhcmF0b3JdIChvcHRpb25hbCkgT3ZlcnJpZGUgZGVmYXVsdCBhbGdvcml0aG0sIGRldGVybWluaW5nIGN1c3RvbSBlcXVhbGl0eS5cbiAgICogQHBhcmFtIHtBcnJheX0gW29wdGlvbnMubWVtb2l6ZV0gKG9wdGlvbmFsKSBQcm92aWRlIGEgY3VzdG9tIG1lbW9pemF0aW9uIG9iamVjdCB3aGljaCB3aWxsIGNhY2hlIHRoZSByZXN1bHRzIG9mXG4gICAgICBjb21wbGV4IG9iamVjdHMgZm9yIGEgc3BlZWQgYm9vc3QuIEJ5IHBhc3NpbmcgYGZhbHNlYCB5b3UgY2FuIGRpc2FibGUgbWVtb2l6YXRpb24sIGJ1dCB0aGlzIHdpbGwgY2F1c2UgY2lyY3VsYXJcbiAgICAgIHJlZmVyZW5jZXMgdG8gYmxvdyB0aGUgc3RhY2suXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59IGVxdWFsIG1hdGNoXG4gICopXG4gICgqIVxuICAgKiBDb21wYXJlIHR3byBSZWd1bGFyIEV4cHJlc3Npb25zIGZvciBlcXVhbGl0eS5cbiAgICpcbiAgICogQHBhcmFtIHtSZWdFeHB9IGxlZnRIYW5kT3BlcmFuZFxuICAgKiBAcGFyYW0ge1JlZ0V4cH0gcmlnaHRIYW5kT3BlcmFuZFxuICAgKiBAcmV0dXJuIHtCb29sZWFufSByZXN1bHRcbiAgICopXG4gICgqIVxuICAgKiBDb21wYXJlIHR3byBTZXRzL01hcHMgZm9yIGVxdWFsaXR5LiBGYXN0ZXIgdGhhbiBvdGhlciBlcXVhbGl0eSBmdW5jdGlvbnMuXG4gICAqXG4gICAqIEBwYXJhbSB7U2V0fSBsZWZ0SGFuZE9wZXJhbmRcbiAgICogQHBhcmFtIHtTZXR9IHJpZ2h0SGFuZE9wZXJhbmRcbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAoT3B0aW9uYWwpXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59IHJlc3VsdFxuICAgKilcbiAgKCohXG4gICAqIFNpbXBsZSBlcXVhbGl0eSBmb3IgZmxhdCBpdGVyYWJsZSBvYmplY3RzIHN1Y2ggYXMgQXJyYXlzLCBUeXBlZEFycmF5cyBvciBOb2RlLmpzIGJ1ZmZlcnMuXG4gICAqXG4gICAqIEBwYXJhbSB7SXRlcmFibGV9IGxlZnRIYW5kT3BlcmFuZFxuICAgKiBAcGFyYW0ge0l0ZXJhYmxlfSByaWdodEhhbmRPcGVyYW5kXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gKE9wdGlvbmFsKVxuICAgKiBAcmV0dXJuIHtCb29sZWFufSByZXN1bHRcbiAgICopXG4gICgqIVxuICAgKiBTaW1wbGUgZXF1YWxpdHkgZm9yIGdlbmVyYXRvciBvYmplY3RzIHN1Y2ggYXMgdGhvc2UgcmV0dXJuZWQgYnkgZ2VuZXJhdG9yIGZ1bmN0aW9ucy5cbiAgICpcbiAgICogQHBhcmFtIHtJdGVyYWJsZX0gbGVmdEhhbmRPcGVyYW5kXG4gICAqIEBwYXJhbSB7SXRlcmFibGV9IHJpZ2h0SGFuZE9wZXJhbmRcbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAoT3B0aW9uYWwpXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59IHJlc3VsdFxuICAgKilcbiAgKCohXG4gICAqIERldGVybWluZSBpZiB0aGUgZ2l2ZW4gb2JqZWN0IGhhcyBhbiBAQGl0ZXJhdG9yIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XG4gICAqIEByZXR1cm4ge0Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgb2JqZWN0IGhhcyBhbiBAQGl0ZXJhdG9yIGZ1bmN0aW9uLlxuICAgKilcbiAgKCohXG4gICAqIEdldHMgYWxsIGl0ZXJhdG9yIGVudHJpZXMgZnJvbSB0aGUgZ2l2ZW4gT2JqZWN0LiBJZiB0aGUgT2JqZWN0IGhhcyBubyBAQGl0ZXJhdG9yIGZ1bmN0aW9uLCByZXR1cm5zIGFuIGVtcHR5IGFycmF5LlxuICAgKiBUaGlzIHdpbGwgY29uc3VtZSB0aGUgaXRlcmF0b3IgLSB3aGljaCBjb3VsZCBoYXZlIHNpZGUgZWZmZWN0cyBkZXBlbmRpbmcgb24gdGhlIEBAaXRlcmF0b3IgaW1wbGVtZW50YXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRcbiAgICogQHJldHVybnMge0FycmF5fSBhbiBhcnJheSBvZiBlbnRyaWVzIGZyb20gdGhlIEBAaXRlcmF0b3IgZnVuY3Rpb25cbiAgICopXG4gICgqIVxuICAgKiBHZXRzIGFsbCBlbnRyaWVzIGZyb20gYSBHZW5lcmF0b3IuIFRoaXMgd2lsbCBjb25zdW1lIHRoZSBnZW5lcmF0b3IgLSB3aGljaCBjb3VsZCBoYXZlIHNpZGUgZWZmZWN0cy5cbiAgICpcbiAgICogQHBhcmFtIHtHZW5lcmF0b3J9IHRhcmdldFxuICAgKiBAcmV0dXJucyB7QXJyYXl9IGFuIGFycmF5IG9mIGVudHJpZXMgZnJvbSB0aGUgR2VuZXJhdG9yLlxuICAgKilcbiAgKCohXG4gICAqIEdldHMgYWxsIG93biBhbmQgaW5oZXJpdGVkIGVudW1lcmFibGUga2V5cyBmcm9tIGEgdGFyZ2V0LlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XG4gICAqIEByZXR1cm5zIHtBcnJheX0gYW4gYXJyYXkgb2Ygb3duIGFuZCBpbmhlcml0ZWQgZW51bWVyYWJsZSBrZXlzIGZyb20gdGhlIHRhcmdldC5cbiAgICopXG4gICgqIVxuICAgKiBEZXRlcm1pbmVzIGlmIHR3byBvYmplY3RzIGhhdmUgbWF0Y2hpbmcgdmFsdWVzLCBnaXZlbiBhIHNldCBvZiBrZXlzLiBEZWZlcnMgdG8gZGVlcEVxdWFsIGZvciB0aGUgZXF1YWxpdHkgY2hlY2sgb2ZcbiAgICogZWFjaCBrZXkuIElmIGFueSB2YWx1ZSBvZiB0aGUgZ2l2ZW4ga2V5IGlzIG5vdCBlcXVhbCwgdGhlIGZ1bmN0aW9uIHdpbGwgcmV0dXJuIGZhbHNlIChlYXJseSkuXG4gICAqXG4gICAqIEBwYXJhbSB7TWl4ZWR9IGxlZnRIYW5kT3BlcmFuZFxuICAgKiBAcGFyYW0ge01peGVkfSByaWdodEhhbmRPcGVyYW5kXG4gICAqIEBwYXJhbSB7QXJyYXl9IGtleXMgQW4gYXJyYXkgb2Yga2V5cyB0byBjb21wYXJlIHRoZSB2YWx1ZXMgb2YgbGVmdEhhbmRPcGVyYW5kIGFuZCByaWdodEhhbmRPcGVyYW5kIGFnYWluc3RcbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAoT3B0aW9uYWwpXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59IHJlc3VsdFxuICAgKilcbiAgKCohXG4gICAqIFJlY3Vyc2l2ZWx5IGNoZWNrIHRoZSBlcXVhbGl0eSBvZiB0d28gT2JqZWN0cy4gT25jZSBiYXNpYyBzYW1lbmVzcyBoYXMgYmVlbiBlc3RhYmxpc2hlZCBpdCB3aWxsIGRlZmVyIHRvIGBkZWVwRXF1YWxgXG4gICAqIGZvciBlYWNoIGVudW1lcmFibGUga2V5IGluIHRoZSBvYmplY3QuXG4gICAqXG4gICAqIEBwYXJhbSB7TWl4ZWR9IGxlZnRIYW5kT3BlcmFuZFxuICAgKiBAcGFyYW0ge01peGVkfSByaWdodEhhbmRPcGVyYW5kXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gKE9wdGlvbmFsKVxuICAgKiBAcmV0dXJuIHtCb29sZWFufSByZXN1bHRcbiAgICopXG4gICgqIVxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGFyZ3VtZW50IGlzIGEgcHJpbWl0aXZlLlxuICAgKlxuICAgKiBUaGlzIGludGVudGlvbmFsbHkgcmV0dXJucyB0cnVlIGZvciBhbGwgb2JqZWN0cyB0aGF0IGNhbiBiZSBjb21wYXJlZCBieSByZWZlcmVuY2UsXG4gICAqIGluY2x1ZGluZyBmdW5jdGlvbnMgYW5kIHN5bWJvbHMuXG4gICAqXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59IHJlc3VsdFxuICAgKilcbiovXG4iLCAiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Q2hhcHRlci5qcy5tYXAiLCAiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Q2hhcHRlckRldGFpbHMuanMubWFwIiwgImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUNvb2tpZS5qcy5tYXAiLCAiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RGlzY292ZXJTZWN0aW9uSXRlbS5qcy5tYXAiLCAiZXhwb3J0IGVudW0gRGlzY292ZXJTZWN0aW9uVHlwZSB7XG4gIGZlYXR1cmVkID0gMCxcbiAgc2ltcGxlQ2Fyb3VzZWwgPSAxLFxuICBwcm9taW5lbnRDYXJvdXNlbCA9IDIsXG4gIGNoYXB0ZXJVcGRhdGVzID0gMyxcbiAgZ2VucmVzID0gNCxcbn1cbiIsICJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Ib21lU2VjdGlvbi5qcy5tYXAiLCAiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9TWFuZ2FJbmZvLmpzLm1hcCIsICJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1NYW5nYVByb2dyZXNzLmpzLm1hcCIsICJleHBvcnQgaW50ZXJmYWNlIFBhZ2VkUmVzdWx0czxUPiB7XG4gIGl0ZW1zOiBUW11cbiAgLy8vIFNldCB0aGlzIHRvIHVuZGVmaW5lZCB0byB0ZWxsIHRoZSBhcHAgdGhhdCB0aGVyZSBhcmUgbm8gbW9yZSBpdGVtc1xuICBtZXRhZGF0YT86IHVua25vd25cbn1cblxuZXhwb3J0IGNvbnN0IEVuZE9mUGFnZVJlc3VsdHM6IFBhZ2VkUmVzdWx0czxuZXZlcj4gPSBPYmplY3QuZnJlZXplKHtcbiAgaXRlbXM6IFtdLFxuICBtZXRhZGF0YTogdW5kZWZpbmVkLFxufSlcbiIsICJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1QQkNhbnZhcy5qcy5tYXAiLCAiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UEJJbWFnZS5qcy5tYXAiLCAiaW1wb3J0IHsgdHlwZSBSZXNwb25zZSB9IGZyb20gJy4vUmVzcG9uc2UuanMnXG5cbmV4cG9ydCB0eXBlIFJlcXVlc3QgPSB7XG4gIHVybDogc3RyaW5nXG4gIG1ldGhvZDogc3RyaW5nXG4gIGhlYWRlcnM/OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+XG4gIGJvZHk/OiBBcnJheUJ1ZmZlciB8IG9iamVjdCB8IHN0cmluZ1xuICBjb29raWVzPzogUmVjb3JkPHN0cmluZywgc3RyaW5nPlxufVxuXG5leHBvcnQgdHlwZSBSZXF1ZXN0SW50ZXJjZXB0b3IgPSAocmVxdWVzdDogUmVxdWVzdCkgPT4gUHJvbWlzZTxSZXF1ZXN0PlxuXG4vKipcbiAqIEBwYXJhbSBwcm9wb3NlZFJlcXVlc3QgVGhlIGBSZXF1ZXN0YCB0byB0aGUgbmV3IGxvY2F0aW9uIHNwZWNpZmllZCBieSB0aGUgcmVkaXJlY3QgcmVzcG9uc2UuXG4gKiBAcGFyYW0gcmVkaXJlY3RlZFJlc3BvbnNlIFRoZSBgUmVzcG9uc2VgIGNvbnRhaW5pbmcgdGhlIHNlcnZlcidzIHJlc3BvbnNlIHRvIHRoZSBvcmlnaW5hbCByZXF1ZXN0LlxuICogQHJldHVybnMgUmV0dXJuIHRoZSBwcm9wb3NlZCByZXF1ZXN0IG9yIGEgbW9kaWZpZWQgcmVxdWVzdCB0byBmb2xsb3cgdGhlIHJlZGlyZWN0LCBvciB1bmRlZmluZWQgdG8gY2FuY2VsIHRoZSByZWRpcmVjdFxuICovXG5leHBvcnQgdHlwZSBSZWRpcmVjdEhhbmRsZXIgPSAoXG4gIHByb3Bvc2VkUmVxdWVzdDogUmVxdWVzdCxcbiAgcmVkaXJlY3RlZFJlc3BvbnNlOiBSZXNwb25zZVxuKSA9PiBQcm9taXNlPFJlcXVlc3QgfCB1bmRlZmluZWQ+XG4iLCAiaW1wb3J0IHsgdHlwZSBSZXF1ZXN0IH0gZnJvbSAnLi9SZXF1ZXN0LmpzJ1xuaW1wb3J0IHsgdHlwZSBDb29raWUgfSBmcm9tICcuL0Nvb2tpZS5qcydcblxuZXhwb3J0IHR5cGUgUmVzcG9uc2UgPSB7XG4gIHJlYWRvbmx5IHVybDogc3RyaW5nXG4gIHJlYWRvbmx5IGhlYWRlcnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz5cbiAgcmVhZG9ubHkgc3RhdHVzOiBudW1iZXJcbiAgcmVhZG9ubHkgbWltZVR5cGU/OiBzdHJpbmdcblxuICAvLy8gVGhpcyBpcyBvbmx5IHRoZSBuZXcgY29va2llcyBzZXQgdmlhIHRoZSBTZXQtQ29va2llIGhlYWRlclxuICByZWFkb25seSBjb29raWVzOiBDb29raWVbXVxufVxuXG5leHBvcnQgdHlwZSBSZXNwb25zZUludGVyY2VwdG9yID0gKFxuICByZXF1ZXN0OiBSZXF1ZXN0LFxuICByZXNwb25zZTogUmVzcG9uc2UsXG4gIGRhdGE6IEFycmF5QnVmZmVyXG4pID0+IFByb21pc2U8QXJyYXlCdWZmZXI+XG4iLCAiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U2VhcmNoRmlsdGVyLmpzLm1hcCIsICJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TZWFyY2hRdWVyeS5qcy5tYXAiLCAiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U2VhcmNoUmVzdWx0SXRlbS5qcy5tYXAiLCAiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U291cmNlTWFuZ2EuanMubWFwIiwgImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVRhZy5qcy5tYXAiLCAiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VGFnU2VjdGlvbi5qcy5tYXAiLCAiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VHJhY2tlZE1hbmdhQ2hhcHRlclJlYWRBY3Rpb24uanMubWFwIiwgImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVNvcnRpbmdPcHRpb24uanMubWFwIiwgIltcclxuICB7XHJcbiAgICBcInRpdGxlSWRcIjogXCIxXCIsXHJcbiAgICBcInByaW1hcnlUaXRsZVwiOiBcIlx1MzA3RVx1MzA2MFx1MzA3RVx1MzA2MFx1OTA2MFx1MzA0NFwiLFxyXG4gICAgXCJzZWNvbmRhcnlUaXRsZXNcIjogW1wiU3RpbGwgYSBsb25nIHdheSB0byBnb1wiXSxcclxuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly94LmNvbS9Ec3ltb2JpbGU0OTk5L3N0YXR1cy8xODQ4MTI5NTcwNjIyMjc1NzUzXCIsXHJcbiAgICBcInRodW1ibmFpbFVybFwiOiBcImh0dHBzOi8vcGJzLnR3aW1nLmNvbS9tZWRpYS9HYVhSOE9oYW9BQXVidUo/Zm9ybWF0PWpwZyZuYW1lPWxhcmdlXCIsXHJcbiAgICBcInN5bm9wc2lzXCI6IFwiU291cmNlOiBodHRwczovL3guY29tL0RzeW1vYmlsZTQ5OTkvc3RhdHVzLzE4NDgxMjk1NzA2MjIyNzU3NTNcIixcclxuICAgIFwiY29udGVudFJhdGluZ1wiOiBcIkVWRVJZT05FXCIsXHJcbiAgICBcInN0YXR1c1wiOiBcIkZpbmlzaGVkXCIsXHJcbiAgICBcImF1dGhvclwiOiBcIlx1MzA1Rlx1MzA3M1x1MzA2Rlx1MzA3MVx1MzA2RVx1MzA4OVx1MzA3RVwiLFxyXG4gICAgXCJyYXRpbmdcIjogMSxcclxuICAgIFwiZ2VucmVzXCI6IFtcIkFydFwiXSxcclxuICAgIFwidGFnc1wiOiBbXCJBbmltZS9NYW5nYSBTdHlsZVwiLCBcIkNvbG9yZWRcIiwgXCJBSVwiXSxcclxuICAgIFwiY2hhcHRlcnNcIjogW1xyXG4gICAgICB7XHJcbiAgICAgICAgXCJjaGFwdGVySWRcIjogXCIxXCIsXHJcbiAgICAgICAgXCJsYW5ndWFnZUNvZGVcIjogXCJKUFwiLFxyXG4gICAgICAgIFwiY2hhcHRlck51bWJlclwiOiAxLFxyXG4gICAgICAgIFwidm9sdW1lTnVtYmVyXCI6IDEsXHJcbiAgICAgICAgXCJwYWdlc1wiOiBbXCJodHRwczovL3Bicy50d2ltZy5jb20vbWVkaWEvR2FYUjhPaGFvQUF1YnVKP2Zvcm1hdD1qcGcmbmFtZT1sYXJnZVwiXVxyXG4gICAgICB9XHJcbiAgICBdXHJcbiAgfSxcclxuICB7XHJcbiAgICBcInRpdGxlSWRcIjogXCIyXCIsXHJcbiAgICBcInByaW1hcnlUaXRsZVwiOiBcIlx1NjYwRVx1NjVFNVx1MzA0Q1x1NEUwRFx1NUI4OVwiLFxyXG4gICAgXCJzZWNvbmRhcnlUaXRsZXNcIjogW1wiSSdtIHdvcnJpZWQgYWJvdXQgdG9tb3Jyb3dcIl0sXHJcbiAgICBcInVybFwiOiBcImh0dHBzOi8veC5jb20vRHN5bW9iaWxlNDk5OS9zdGF0dXMvMTg0Nzk2MzQ3NDQyNjcyODgwNFwiLFxyXG4gICAgXCJ0aHVtYm5haWxVcmxcIjogXCJodHRwczovL3Bicy50d2ltZy5jb20vbWVkaWEvR2FTTXQwaGFrQUFxZGVRP2Zvcm1hdD1qcGcmbmFtZT1sYXJnZVwiLFxyXG4gICAgXCJzeW5vcHNpc1wiOiBcIlNvdXJjZTogaHR0cHM6Ly94LmNvbS9Ec3ltb2JpbGU0OTk5L3N0YXR1cy8xODQ3OTYzNDc0NDI2NzI4ODA0XCIsXHJcbiAgICBcImNvbnRlbnRSYXRpbmdcIjogXCJFVkVSWU9ORVwiLFxyXG4gICAgXCJzdGF0dXNcIjogXCJGaW5pc2hlZFwiLFxyXG4gICAgXCJhdXRob3JcIjogXCJcdTMwNUZcdTMwNzNcdTMwNkZcdTMwNzFcdTMwNkVcdTMwODlcdTMwN0VcIixcclxuICAgIFwicmF0aW5nXCI6IDEsXHJcbiAgICBcImdlbnJlc1wiOiBbXCJBcnRcIl0sXHJcbiAgICBcInRhZ3NcIjogW1wiQW5pbWUvTWFuZ2EgU3R5bGVcIiwgXCJDb2xvcmVkXCIsIFwiQUlcIl0sXHJcbiAgICBcImNoYXB0ZXJzXCI6IFtcclxuICAgICAge1xyXG4gICAgICAgIFwiY2hhcHRlcklkXCI6IFwiMVwiLFxyXG4gICAgICAgIFwibGFuZ3VhZ2VDb2RlXCI6IFwiSlBcIixcclxuICAgICAgICBcImNoYXB0ZXJOdW1iZXJcIjogMSxcclxuICAgICAgICBcInZvbHVtZU51bWJlclwiOiAxLFxyXG4gICAgICAgIFwicGFnZXNcIjogW1wiaHR0cHM6Ly9wYnMudHdpbWcuY29tL21lZGlhL0dhU010MGhha0FBcWRlUT9mb3JtYXQ9anBnJm5hbWU9bGFyZ2VcIl1cclxuICAgICAgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJ0aXRsZUlkXCI6IFwiM1wiLFxyXG4gICAgXCJwcmltYXJ5VGl0bGVcIjogXCJcdTRFMThcdTMwNkVcdTRFMEFcdTMwNkJcdTVCQzRcdTMwOEFcdTkwNTNcIixcclxuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly94LmNvbS9Ec3ltb2JpbGU0OTk5L3N0YXR1cy8xODQ3OTAzMDc2NjcxNTA4NzU3XCIsXHJcbiAgICBcInNlY29uZGFyeVRpdGxlc1wiOiBbXCJEZXRvdXIgdG8gdGhlIHRvcCBvZiB0aGUgaGlsbFwiXSxcclxuICAgIFwidGh1bWJuYWlsVXJsXCI6IFwiaHR0cHM6Ly9wYnMudHdpbWcuY29tL21lZGlhL0dhU01rN0xiVUFBRzhzRj9mb3JtYXQ9anBnJm5hbWU9bGFyZ2VcIixcclxuICAgIFwic3lub3BzaXNcIjogXCJTb3VyY2U6IGh0dHBzOi8veC5jb20vRHN5bW9iaWxlNDk5OS9zdGF0dXMvMTg0NzkwMzA3NjY3MTUwODc1N1wiLFxyXG4gICAgXCJjb250ZW50UmF0aW5nXCI6IFwiRVZFUllPTkVcIixcclxuICAgIFwic3RhdHVzXCI6IFwiRmluaXNoZWRcIixcclxuICAgIFwiYXV0aG9yXCI6IFwiXHUzMDVGXHUzMDczXHUzMDZGXHUzMDcxXHUzMDZFXHUzMDg5XHUzMDdFXCIsXHJcbiAgICBcInJhdGluZ1wiOiAxLFxyXG4gICAgXCJnZW5yZXNcIjogW1wiQXJ0XCJdLFxyXG4gICAgXCJ0YWdzXCI6IFtcIkFuaW1lL01hbmdhIFN0eWxlXCIsIFwiQ29sb3JlZFwiLCBcIkFJXCJdLFxyXG4gICAgXCJjaGFwdGVyc1wiOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBcImNoYXB0ZXJJZFwiOiBcIjFcIixcclxuICAgICAgICBcImxhbmd1YWdlQ29kZVwiOiBcIkpQXCIsXHJcbiAgICAgICAgXCJjaGFwdGVyTnVtYmVyXCI6IDEsXHJcbiAgICAgICAgXCJ2b2x1bWVOdW1iZXJcIjogMSxcclxuICAgICAgICBcInBhZ2VzXCI6IFtcImh0dHBzOi8vcGJzLnR3aW1nLmNvbS9tZWRpYS9HYVNNazdMYlVBQUc4c0Y/Zm9ybWF0PWpwZyZuYW1lPWxhcmdlXCJdXHJcbiAgICAgIH1cclxuICAgIF1cclxuICB9LFxyXG4gIHtcclxuICAgIFwidGl0bGVJZFwiOiBcIjRcIixcclxuICAgIFwicHJpbWFyeVRpdGxlXCI6IFwiXHU2Nzk3XHU2QThFXHUzMDZFXHU1QjYzXHU3QkMwXCIsXHJcbiAgICBcInNlY29uZGFyeVRpdGxlc1wiOiBbXCJBcHBsZSBTZWFzb25cIl0sXHJcbiAgICBcInVybFwiOiBcImh0dHBzOi8veC5jb20vRHN5bW9iaWxlNDk5OS9zdGF0dXMvMTg0NzgyNzU3ODQyNzQ0NTQ2NFwiLFxyXG4gICAgXCJ0aHVtYm5haWxVcmxcIjogXCJodHRwczovL3Bicy50d2ltZy5jb20vbWVkaWEvR2FTT056VmJVQUVvaEt3P2Zvcm1hdD1qcGcmbmFtZT1sYXJnZVwiLFxyXG4gICAgXCJzeW5vcHNpc1wiOiBcIlNvdXJjZTogaHR0cHM6Ly94LmNvbS9Ec3ltb2JpbGU0OTk5L3N0YXR1cy8xODQ3ODI3NTc4NDI3NDQ1NDY0XCIsXHJcbiAgICBcImNvbnRlbnRSYXRpbmdcIjogXCJFVkVSWU9ORVwiLFxyXG4gICAgXCJzdGF0dXNcIjogXCJGaW5pc2hlZFwiLFxyXG4gICAgXCJhdXRob3JcIjogXCJcdTMwNUZcdTMwNzNcdTMwNkZcdTMwNzFcdTMwNkVcdTMwODlcdTMwN0VcIixcclxuICAgIFwicmF0aW5nXCI6IDEsXHJcbiAgICBcImdlbnJlc1wiOiBbXCJBcnRcIl0sXHJcbiAgICBcInRhZ3NcIjogW1wiQW5pbWUvTWFuZ2EgU3R5bGVcIiwgXCJDb2xvcmVkXCIsIFwiQUlcIl0sXHJcbiAgICBcImNoYXB0ZXJzXCI6IFtcclxuICAgICAge1xyXG4gICAgICAgIFwiY2hhcHRlcklkXCI6IFwiMVwiLFxyXG4gICAgICAgIFwibGFuZ3VhZ2VDb2RlXCI6IFwiSlBcIixcclxuICAgICAgICBcImNoYXB0ZXJOdW1iZXJcIjogMSxcclxuICAgICAgICBcInZvbHVtZU51bWJlclwiOiAxLFxyXG4gICAgICAgIFwicGFnZXNcIjogW1wiaHR0cHM6Ly9wYnMudHdpbWcuY29tL21lZGlhL0dhU09OelZiVUFFb2hLdz9mb3JtYXQ9anBnJm5hbWU9bGFyZ2VcIl1cclxuICAgICAgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJ0aXRsZUlkXCI6IFwiNVwiLFxyXG4gICAgXCJwcmltYXJ5VGl0bGVcIjogXCJcdTRFQ0FcdTY1RTVcdTMwNkZcdTZEMUVcdTdBOUZcdTYzQTJcdTY5MUNcdTMwNjBcIixcclxuICAgIFwic2Vjb25kYXJ5VGl0bGVzXCI6IFtcIlRvZGF5IHdlJ3JlIGV4cGxvcmluZyBjYXZlc1wiXSxcclxuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly94LmNvbS9Ec3ltb2JpbGU0OTk5L3N0YXR1cy8xODQ3NzY3MTgwNTgwMTgwMTM5L3Bob3RvLzFcIixcclxuICAgIFwidGh1bWJuYWlsVXJsXCI6IFwiaHR0cHM6Ly9wYnMudHdpbWcuY29tL21lZGlhL0dhU05hSTdiY0FBUElJUD9mb3JtYXQ9anBnJm5hbWU9bGFyZ2VcIixcclxuICAgIFwic3lub3BzaXNcIjogXCJTb3VyY2U6IGh0dHBzOi8veC5jb20vRHN5bW9iaWxlNDk5OS9zdGF0dXMvMTg0Nzc2NzE4MDU4MDE4MDEzOS9waG90by8xXCIsXHJcbiAgICBcImNvbnRlbnRSYXRpbmdcIjogXCJFVkVSWU9ORVwiLFxyXG4gICAgXCJzdGF0dXNcIjogXCJGaW5pc2hlZFwiLFxyXG4gICAgXCJhdXRob3JcIjogXCJcdTMwNUZcdTMwNzNcdTMwNkZcdTMwNzFcdTMwNkVcdTMwODlcdTMwN0VcIixcclxuICAgIFwicmF0aW5nXCI6IDEsXHJcbiAgICBcImdlbnJlc1wiOiBbXCJBcnRcIl0sXHJcbiAgICBcInRhZ3NcIjogW1wiQW5pbWUvTWFuZ2EgU3R5bGVcIiwgXCJDb2xvcmVkXCIsIFwiQUlcIl0sXHJcbiAgICBcImNoYXB0ZXJzXCI6IFtcclxuICAgICAge1xyXG4gICAgICAgIFwiY2hhcHRlcklkXCI6IFwiMVwiLFxyXG4gICAgICAgIFwibGFuZ3VhZ2VDb2RlXCI6IFwiSlBcIixcclxuICAgICAgICBcImNoYXB0ZXJOdW1iZXJcIjogMSxcclxuICAgICAgICBcInZvbHVtZU51bWJlclwiOiAxLFxyXG4gICAgICAgIFwicGFnZXNcIjogW1wiaHR0cHM6Ly9wYnMudHdpbWcuY29tL21lZGlhL0dhU05hSTdiY0FBUElJUD9mb3JtYXQ9anBnJm5hbWU9bGFyZ2VcIl1cclxuICAgICAgfVxyXG4gICAgXVxyXG4gIH0sXHJcblxyXG4gIHtcclxuICAgIFwidGl0bGVJZFwiOiBcIjZcIixcclxuICAgIFwicHJpbWFyeVRpdGxlXCI6IFwiXHUzMEEyXHUzMEREXHUzMEFGXHUzMEVBXHUzMEQ1XHUzMEExXCIsXHJcbiAgICBcInNlY29uZGFyeVRpdGxlc1wiOiBbXCJBcG9jcnlwaGFcIl0sXHJcbiAgICBcInVybFwiOiBcImh0dHBzOi8veC5jb20vRHN5bW9iaWxlNDk5OS9zdGF0dXMvMTg0NzYwMTA4ODIzNDczNzgzNlwiLFxyXG4gICAgXCJ0aHVtYm5haWxVcmxcIjogXCJodHRwczovL3Bicy50d2ltZy5jb20vbWVkaWEvR2FOR2tZc2JVQUVvZkVmP2Zvcm1hdD1qcGcmbmFtZT1sYXJnZVwiLFxyXG4gICAgXCJzeW5vcHNpc1wiOiBcIlNvdXJjZTogaHR0cHM6Ly94LmNvbS9Ec3ltb2JpbGU0OTk5L3N0YXR1cy8xODQ3NjAxMDg4MjM0NzM3ODM2XCIsXHJcbiAgICBcImNvbnRlbnRSYXRpbmdcIjogXCJFVkVSWU9ORVwiLFxyXG4gICAgXCJzdGF0dXNcIjogXCJGaW5pc2hlZFwiLFxyXG4gICAgXCJhdXRob3JcIjogXCJcdTMwNUZcdTMwNzNcdTMwNkZcdTMwNzFcdTMwNkVcdTMwODlcdTMwN0VcIixcclxuICAgIFwicmF0aW5nXCI6IDEsXHJcbiAgICBcImdlbnJlc1wiOiBbXCJBcnRcIl0sXHJcbiAgICBcInRhZ3NcIjogW1wiQW5pbWUvTWFuZ2EgU3R5bGVcIiwgXCJDb2xvcmVkXCIsIFwiQUlcIl0sXHJcbiAgICBcImNoYXB0ZXJzXCI6IFtcclxuICAgICAge1xyXG4gICAgICAgIFwiY2hhcHRlcklkXCI6IFwiMVwiLFxyXG4gICAgICAgIFwibGFuZ3VhZ2VDb2RlXCI6IFwiSlBcIixcclxuICAgICAgICBcImNoYXB0ZXJOdW1iZXJcIjogMSxcclxuICAgICAgICBcInZvbHVtZU51bWJlclwiOiAxLFxyXG4gICAgICAgIFwicGFnZXNcIjogW1wiaHR0cHM6Ly9wYnMudHdpbWcuY29tL21lZGlhL0dhTkdrWXNiVUFFb2ZFZj9mb3JtYXQ9anBnJm5hbWU9bGFyZ2VcIl1cclxuICAgICAgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJ0aXRsZUlkXCI6IFwiN1wiLFxyXG4gICAgXCJwcmltYXJ5VGl0bGVcIjogXCJcdTU5MTVcdTY1RTVcdTMwNkVcdTRFMkRcdTMwNkVcdTVFMzBcdTMwOEFcdTkwNTNcIixcclxuICAgIFwic2Vjb25kYXJ5VGl0bGVzXCI6IFtcIk9uIHRoZSB3YXkgaG9tZSBpbiB0aGUgc3Vuc2V0XCJdLFxyXG4gICAgXCJ1cmxcIjogXCJodHRwczovL3guY29tL0RzeW1vYmlsZTQ5OTkvc3RhdHVzLzE4NDc1NDA2ODkwNzQwMDQxNDFcIixcclxuICAgIFwidGh1bWJuYWlsVXJsXCI6IFwiaHR0cHM6Ly9wYnMudHdpbWcuY29tL21lZGlhL0dhTkhXd2ZiVUFNYlVPMj9mb3JtYXQ9anBnJm5hbWU9bGFyZ2VcIixcclxuICAgIFwic3lub3BzaXNcIjogXCJTb3VyY2U6IGh0dHBzOi8veC5jb20vRHN5bW9iaWxlNDk5OS9zdGF0dXMvMTg0NzU0MDY4OTA3NDAwNDE0MVwiLFxyXG4gICAgXCJjb250ZW50UmF0aW5nXCI6IFwiRVZFUllPTkVcIixcclxuICAgIFwic3RhdHVzXCI6IFwiRmluaXNoZWRcIixcclxuICAgIFwiYXV0aG9yXCI6IFwiXHUzMDVGXHUzMDczXHUzMDZGXHUzMDcxXHUzMDZFXHUzMDg5XHUzMDdFXCIsXHJcbiAgICBcInJhdGluZ1wiOiAxLFxyXG4gICAgXCJnZW5yZXNcIjogW1wiQXJ0XCJdLFxyXG4gICAgXCJ0YWdzXCI6IFtcIkFuaW1lL01hbmdhIFN0eWxlXCIsIFwiQ29sb3JlZFwiLCBcIkFJXCJdLFxyXG4gICAgXCJjaGFwdGVyc1wiOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBcImNoYXB0ZXJJZFwiOiBcIjFcIixcclxuICAgICAgICBcImxhbmd1YWdlQ29kZVwiOiBcIkpQXCIsXHJcbiAgICAgICAgXCJjaGFwdGVyTnVtYmVyXCI6IDEsXHJcbiAgICAgICAgXCJ2b2x1bWVOdW1iZXJcIjogMSxcclxuICAgICAgICBcInBhZ2VzXCI6IFtcImh0dHBzOi8vcGJzLnR3aW1nLmNvbS9tZWRpYS9HYU5IV3dmYlVBTWJVTzI/Zm9ybWF0PWpwZyZuYW1lPWxhcmdlXCJdXHJcbiAgICAgIH1cclxuICAgIF1cclxuICB9LFxyXG4gIHtcclxuICAgIFwidGl0bGVJZFwiOiBcIjhcIixcclxuICAgIFwicHJpbWFyeVRpdGxlXCI6IFwiXHU2RTJGXHU4ODU3XHUzMDZFXHU1MzQ4XHU1RjhDXCIsXHJcbiAgICBcInNlY29uZGFyeVRpdGxlc1wiOiBbXCJBZnRlcm5vb24gaW4gdGhlIFBvcnQgQ2l0eVwiXSxcclxuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly94LmNvbS9Ec3ltb2JpbGU0OTk5L3N0YXR1cy8xODQ3NDY1MTkxODM3MjI1MTgxL3Bob3RvLzFcIixcclxuICAgIFwidGh1bWJuYWlsVXJsXCI6IFwiaHR0cHM6Ly9wYnMudHdpbWcuY29tL21lZGlhL0dhTkhKbUZiVUFFV0tOcj9mb3JtYXQ9anBnJm5hbWU9bGFyZ2VcIixcclxuICAgIFwic3lub3BzaXNcIjogXCJTb3VyY2U6IGh0dHBzOi8veC5jb20vRHN5bW9iaWxlNDk5OS9zdGF0dXMvMTg0NzQ2NTE5MTgzNzIyNTE4MS9waG90by8xXCIsXHJcbiAgICBcImNvbnRlbnRSYXRpbmdcIjogXCJFVkVSWU9ORVwiLFxyXG4gICAgXCJzdGF0dXNcIjogXCJGaW5pc2hlZFwiLFxyXG4gICAgXCJhdXRob3JcIjogXCJcdTMwNUZcdTMwNzNcdTMwNkZcdTMwNzFcdTMwNkVcdTMwODlcdTMwN0VcIixcclxuICAgIFwicmF0aW5nXCI6IDEsXHJcbiAgICBcImdlbnJlc1wiOiBbXCJBcnRcIl0sXHJcbiAgICBcInRhZ3NcIjogW1wiQW5pbWUvTWFuZ2EgU3R5bGVcIiwgXCJDb2xvcmVkXCIsIFwiQUlcIl0sXHJcbiAgICBcImNoYXB0ZXJzXCI6IFtcclxuICAgICAge1xyXG4gICAgICAgIFwiY2hhcHRlcklkXCI6IFwiMVwiLFxyXG4gICAgICAgIFwibGFuZ3VhZ2VDb2RlXCI6IFwiSlBcIixcclxuICAgICAgICBcImNoYXB0ZXJOdW1iZXJcIjogMSxcclxuICAgICAgICBcInZvbHVtZU51bWJlclwiOiAxLFxyXG4gICAgICAgIFwicGFnZXNcIjogW1wiaHR0cHM6Ly9wYnMudHdpbWcuY29tL21lZGlhL0dhTkhKbUZiVUFFV0tOcj9mb3JtYXQ9anBnJm5hbWU9bGFyZ2VcIl1cclxuICAgICAgfVxyXG4gICAgXVxyXG4gIH0sXHJcbiAge1xyXG4gICAgXCJ0aXRsZUlkXCI6IFwiOVwiLFxyXG4gICAgXCJwcmltYXJ5VGl0bGVcIjogXCJcdTczMkJcdTMwNjhcdTMwNkVcdTRGMTFcdTY1RTVcIixcclxuICAgIFwic2Vjb25kYXJ5VGl0bGVzXCI6IFtcIkhvbGlkYXkgd2l0aCBjYXRzXCJdLFxyXG4gICAgXCJ1cmxcIjogXCJodHRwczovL3guY29tL0RzeW1vYmlsZTQ5OTkvc3RhdHVzLzE4NDc0MDQ3OTI1NTA5OTgxNDhcIixcclxuICAgIFwidGh1bWJuYWlsVXJsXCI6IFwiaHR0cHM6Ly9wYnMudHdpbWcuY29tL21lZGlhL0dhTkczdElic0FBTEpvRj9mb3JtYXQ9anBnJm5hbWU9bGFyZ2VcIixcclxuICAgIFwic3lub3BzaXNcIjogXCJTb3VyY2U6IGh0dHBzOi8veC5jb20vRHN5bW9iaWxlNDk5OS9zdGF0dXMvMTg0NzQwNDc5MjU1MDk5ODE0OFwiLFxyXG4gICAgXCJjb250ZW50UmF0aW5nXCI6IFwiRVZFUllPTkVcIixcclxuICAgIFwic3RhdHVzXCI6IFwiRmluaXNoZWRcIixcclxuICAgIFwiYXV0aG9yXCI6IFwiXHUzMDVGXHUzMDczXHUzMDZGXHUzMDcxXHUzMDZFXHUzMDg5XHUzMDdFXCIsXHJcbiAgICBcInJhdGluZ1wiOiAxLFxyXG4gICAgXCJnZW5yZXNcIjogW1wiQXJ0XCJdLFxyXG4gICAgXCJ0YWdzXCI6IFtcIkFuaW1lL01hbmdhIFN0eWxlXCIsIFwiQ29sb3JlZFwiLCBcIkFJXCJdLFxyXG4gICAgXCJjaGFwdGVyc1wiOiBbXHJcbiAgICAgIHtcclxuICAgICAgICBcImNoYXB0ZXJJZFwiOiBcIjFcIixcclxuICAgICAgICBcImxhbmd1YWdlQ29kZVwiOiBcIkpQXCIsXHJcbiAgICAgICAgXCJjaGFwdGVyTnVtYmVyXCI6IDEsXHJcbiAgICAgICAgXCJ2b2x1bWVOdW1iZXJcIjogMSxcclxuICAgICAgICBcInBhZ2VzXCI6IFtcImh0dHBzOi8vcGJzLnR3aW1nLmNvbS9tZWRpYS9HYU5HM3RJYnNBQUxKb0Y/Zm9ybWF0PWpwZyZuYW1lPWxhcmdlXCJdXHJcbiAgICAgIH1cclxuICAgIF1cclxuICB9LFxyXG4gIHtcclxuICAgIFwidGl0bGVJZFwiOiBcIjEwXCIsXHJcbiAgICBcInByaW1hcnlUaXRsZVwiOiBcIlx1NTkxQ1x1MzA2RVx1NEUwQlx1NzUzQVwiLFxyXG4gICAgXCJzZWNvbmRhcnlUaXRsZXNcIjogW1wiRG93bnRvd24gYXQgbmlnaHRcIl0sXHJcbiAgICBcInVybFwiOiBcImh0dHBzOi8veC5jb20vRHN5bW9iaWxlNDk5OS9zdGF0dXMvMTg0NzIzODcwMDg1NTcxMDE3M1wiLFxyXG4gICAgXCJ0aHVtYm5haWxVcmxcIjogXCJodHRwczovL3Bicy50d2ltZy5jb20vbWVkaWEvR2FJRzR4U2FBQUFhNjgxP2Zvcm1hdD1qcGcmbmFtZT1sYXJnZVwiLFxyXG4gICAgXCJzeW5vcHNpc1wiOiBcIlNvdXJjZTogaHR0cHM6Ly94LmNvbS9Ec3ltb2JpbGU0OTk5L3N0YXR1cy8xODQ3MjM4NzAwODU1NzEwMTczXCIsXHJcbiAgICBcImNvbnRlbnRSYXRpbmdcIjogXCJFVkVSWU9ORVwiLFxyXG4gICAgXCJzdGF0dXNcIjogXCJGaW5pc2hlZFwiLFxyXG4gICAgXCJhdXRob3JcIjogXCJcdTMwNUZcdTMwNzNcdTMwNkZcdTMwNzFcdTMwNkVcdTMwODlcdTMwN0VcIixcclxuICAgIFwicmF0aW5nXCI6IDEsXHJcbiAgICBcImdlbnJlc1wiOiBbXCJBcnRcIl0sXHJcbiAgICBcInRhZ3NcIjogW1wiQW5pbWUvTWFuZ2EgU3R5bGVcIiwgXCJDb2xvcmVkXCIsIFwiQUlcIl0sXHJcbiAgICBcImNoYXB0ZXJzXCI6IFtcclxuICAgICAge1xyXG4gICAgICAgIFwiY2hhcHRlcklkXCI6IFwiMVwiLFxyXG4gICAgICAgIFwibGFuZ3VhZ2VDb2RlXCI6IFwiSlBcIixcclxuICAgICAgICBcImNoYXB0ZXJOdW1iZXJcIjogMSxcclxuICAgICAgICBcInZvbHVtZU51bWJlclwiOiAxLFxyXG4gICAgICAgIFwicGFnZXNcIjogW1wiaHR0cHM6Ly9wYnMudHdpbWcuY29tL21lZGlhL0dhSUc0eFNhQUFBYTY4MT9mb3JtYXQ9anBnJm5hbWU9bGFyZ2VcIl1cclxuICAgICAgfVxyXG4gICAgXVxyXG4gIH1cclxuXVxyXG4iLCAiLyogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEdQTC0zLjAtb3ItbGF0ZXIgKi9cclxuLyogQ29weXJpZ2h0IFx1MDBBOSAyMDI1IElua2RleCAqL1xyXG5cclxuLy8gVE9ETzpcclxuLy8gLSBSZW1vdmUgdGhlIFN0YXRlIGNsYXNzXHJcbi8vIC0gQWRkIGV4dGVuc2lvbiBzcGVjaWZpYyBzZXR0aW5nc1xyXG5cclxuaW1wb3J0IHtcclxuICBCdXR0b25Sb3csXHJcbiAgRm9ybSxcclxuICBJbnB1dFJvdyxcclxuICBMYWJlbFJvdyxcclxuICBOYXZpZ2F0aW9uUm93LFxyXG4gIFNlY3Rpb24sXHJcbiAgVG9nZ2xlUm93LFxyXG4gIHR5cGUgRm9ybVNlY3Rpb25FbGVtZW50LFxyXG4gIHR5cGUgU2VsZWN0b3JJRCxcclxufSBmcm9tIFwiQHBhcGVyYmFjay90eXBlc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNldHRpbmdzRm9ybSBleHRlbmRzIEZvcm0ge1xyXG4gIG92ZXJyaWRlIGdldFNlY3Rpb25zKCk6IEZvcm1TZWN0aW9uRWxlbWVudFtdIHtcclxuICAgIHJldHVybiBbXHJcbiAgICAgIFNlY3Rpb24oXCJwbGF5Z3JvdW5kXCIsIFtcclxuICAgICAgICBOYXZpZ2F0aW9uUm93KFwicGxheWdyb3VuZFwiLCB7XHJcbiAgICAgICAgICB0aXRsZTogXCJTb3VyY2VVSSBQbGF5Z3JvdW5kXCIsXHJcbiAgICAgICAgICBmb3JtOiBuZXcgU291cmNlVUlQbGF5Z3JvdW5kRm9ybSgpLFxyXG4gICAgICAgIH0pLFxyXG4gICAgICBdKSxcclxuICAgIF07XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBTdGF0ZTxUPiB7XHJcbiAgcHJpdmF0ZSBfdmFsdWU6IFQ7XHJcbiAgcHVibGljIGdldCB2YWx1ZSgpOiBUIHtcclxuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgc2VsZWN0b3IoKTogU2VsZWN0b3JJRDwodmFsdWU6IFQpID0+IFByb21pc2U8dm9pZD4+IHtcclxuICAgIHJldHVybiBBcHBsaWNhdGlvbi5TZWxlY3Rvcih0aGlzIGFzIFN0YXRlPFQ+LCBcInVwZGF0ZVZhbHVlXCIpO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGZvcm06IEZvcm0sXHJcbiAgICB2YWx1ZTogVCxcclxuICApIHtcclxuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgYXN5bmMgdXBkYXRlVmFsdWUodmFsdWU6IFQpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XHJcbiAgICB0aGlzLmZvcm0ucmVsb2FkRm9ybSgpO1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgU291cmNlVUlQbGF5Z3JvdW5kRm9ybSBleHRlbmRzIEZvcm0ge1xyXG4gIGlucHV0VmFsdWUgPSBuZXcgU3RhdGUodGhpcywgXCJcIik7XHJcbiAgcm93c1Zpc2libGUgPSBuZXcgU3RhdGUodGhpcywgZmFsc2UpO1xyXG4gIGl0ZW1zOiBzdHJpbmdbXSA9IFtdO1xyXG5cclxuICBvdmVycmlkZSBnZXRTZWN0aW9ucygpOiBGb3JtU2VjdGlvbkVsZW1lbnRbXSB7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICBTZWN0aW9uKFwiaGlkZVN0dWZmXCIsIFtcclxuICAgICAgICBUb2dnbGVSb3coXCJ0b2dnbGVcIiwge1xyXG4gICAgICAgICAgdGl0bGU6IFwiVG9nZ2xlcyBjYW4gaGlkZSByb3dzXCIsXHJcbiAgICAgICAgICB2YWx1ZTogdGhpcy5yb3dzVmlzaWJsZS52YWx1ZSxcclxuICAgICAgICAgIG9uVmFsdWVDaGFuZ2U6IHRoaXMucm93c1Zpc2libGUuc2VsZWN0b3IsXHJcbiAgICAgICAgfSksXHJcbiAgICAgIF0pLFxyXG5cclxuICAgICAgLi4uKCgpID0+XHJcbiAgICAgICAgdGhpcy5yb3dzVmlzaWJsZS52YWx1ZVxyXG4gICAgICAgICAgPyBbXHJcbiAgICAgICAgICAgICAgU2VjdGlvbihcImhpZGRlblNlY3Rpb25cIiwgW1xyXG4gICAgICAgICAgICAgICAgSW5wdXRSb3coXCJpbnB1dFwiLCB7XHJcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkR5bmFtaWMgSW5wdXRcIixcclxuICAgICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMuaW5wdXRWYWx1ZS52YWx1ZSxcclxuICAgICAgICAgICAgICAgICAgb25WYWx1ZUNoYW5nZTogdGhpcy5pbnB1dFZhbHVlLnNlbGVjdG9yLFxyXG4gICAgICAgICAgICAgICAgfSksXHJcblxyXG4gICAgICAgICAgICAgICAgTGFiZWxSb3coXCJib3VuZExhYmVsXCIsIHtcclxuICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiQm91bmQgbGFiZWwgdG8gaW5wdXRcIixcclxuICAgICAgICAgICAgICAgICAgc3VidGl0bGU6IFwiVGhpcyBsYWJlbCB1cGRhdGVzIHdpdGggdGhlIGlucHV0XCIsXHJcbiAgICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLmlucHV0VmFsdWUudmFsdWUsXHJcbiAgICAgICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgICBdKSxcclxuXHJcbiAgICAgICAgICAgICAgU2VjdGlvbihcIml0ZW1zXCIsIFtcclxuICAgICAgICAgICAgICAgIC4uLnRoaXMuaXRlbXMubWFwKChpdGVtKSA9PlxyXG4gICAgICAgICAgICAgICAgICBMYWJlbFJvdyhpdGVtLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IGl0ZW0sXHJcbiAgICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgICAgKSxcclxuXHJcbiAgICAgICAgICAgICAgICBCdXR0b25Sb3coXCJhZGROZXdJdGVtXCIsIHtcclxuICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiQWRkIE5ldyBJdGVtXCIsXHJcbiAgICAgICAgICAgICAgICAgIG9uU2VsZWN0OiBBcHBsaWNhdGlvbi5TZWxlY3Rvcih0aGlzIGFzIFNvdXJjZVVJUGxheWdyb3VuZEZvcm0sIFwiYWRkTmV3SXRlbVwiKSxcclxuICAgICAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICAgIF0pLFxyXG4gICAgICAgICAgICBdXHJcbiAgICAgICAgICA6IFtdKSgpLFxyXG4gICAgXTtcclxuICB9XHJcblxyXG4gIGFzeW5jIGFkZE5ld0l0ZW0oKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICB0aGlzLml0ZW1zLnB1c2goXCJJdGVtIFwiICsgKHRoaXMuaXRlbXMubGVuZ3RoICsgMSkpO1xyXG4gICAgdGhpcy5yZWxvYWRGb3JtKCk7XHJcbiAgfVxyXG59XHJcbiIsICIvKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogR1BMLTMuMC1vci1sYXRlciAqL1xyXG4vKiBDb3B5cmlnaHQgXHUwMEE5IDIwMjUgSW5rZGV4ICovXHJcblxyXG5pbXBvcnQgeyBQYXBlcmJhY2tJbnRlcmNlcHRvciwgdHlwZSBSZXF1ZXN0LCB0eXBlIFJlc3BvbnNlIH0gZnJvbSBcIkBwYXBlcmJhY2svdHlwZXNcIjtcclxuXHJcbi8vIEludGVyY2VwdHMgYWxsIHRoZSByZXF1ZXN0cyBhbmQgcmVzcG9uc2VzIGFuZCBhbGxvd3MgeW91IHRvIG1ha2UgY2hhbmdlcyB0byB0aGVtXHJcbmV4cG9ydCBjbGFzcyBNYWluSW50ZXJjZXB0b3IgZXh0ZW5kcyBQYXBlcmJhY2tJbnRlcmNlcHRvciB7XHJcbiAgb3ZlcnJpZGUgYXN5bmMgaW50ZXJjZXB0UmVxdWVzdChyZXF1ZXN0OiBSZXF1ZXN0KTogUHJvbWlzZTxSZXF1ZXN0PiB7XHJcbiAgICByZXR1cm4gcmVxdWVzdDtcclxuICB9XHJcblxyXG4gIG92ZXJyaWRlIGFzeW5jIGludGVyY2VwdFJlc3BvbnNlKFxyXG4gICAgcmVxdWVzdDogUmVxdWVzdCxcclxuICAgIHJlc3BvbnNlOiBSZXNwb25zZSxcclxuICAgIGRhdGE6IEFycmF5QnVmZmVyLFxyXG4gICk6IFByb21pc2U8QXJyYXlCdWZmZXI+IHtcclxuICAgIHZvaWQgcmVxdWVzdDtcclxuICAgIHZvaWQgcmVzcG9uc2U7XHJcblxyXG4gICAgcmV0dXJuIGRhdGE7XHJcbiAgfVxyXG59XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUEsY0FBUSxhQUFhO0FBQ3JCLGNBQVEsY0FBYztBQUN0QixjQUFRLGdCQUFnQjtBQUV4QixVQUFJLFNBQVMsQ0FBQztBQUNkLFVBQUksWUFBWSxDQUFDO0FBQ2pCLFVBQUksTUFBTSxPQUFPLGVBQWUsY0FBYyxhQUFhO0FBRTNELFVBQUksT0FBTztBQUNYLFdBQVMsSUFBSSxHQUFHLE1BQU0sS0FBSyxRQUFRLElBQUksS0FBSyxFQUFFLEdBQUc7QUFDL0MsZUFBTyxDQUFDLElBQUksS0FBSyxDQUFDO0FBQ2xCLGtCQUFVLEtBQUssV0FBVyxDQUFDLENBQUMsSUFBSTtBQUFBLE1BQ2xDO0FBSFM7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QU0saUJBQWlDO0FBQUEsZ0JBQ3JDLElBQUksUUFBUTtBQUFBLGdCQUNaLFNBQVMsUUFBUSxZQUFZO0FBQUEsZ0JBQzdCLE9BQU8sWUFBWTtBQUFBLGNBQ3JCO0FBQ0EscUJBQU87QUFBQSxZQUNUO0FBQUEsVUFDRjtBQUNBLGdCQUFNLElBQUksTUFBTSxnQ0FBZ0M7QUFBQSxRQUNsRDtBQUFBLE1BQ0Y7QUFDQSxZQUFNLElBQUksTUFBTSw4QkFBOEI7QUFBQSxJQUNoRDtBQUFBLEVBQ0Y7QUFFTyxNQUFNLGtCQUFrQixJQUFJLHlCQUF5QjsiLAogICJuYW1lcyI6IFsibGVuIiwgImkiLCAibGVuMiIsICJCdWZmZXIiLCAidG9TdHJpbmciLCAiaW5zcGVjdCIsICJpIiwgImJ5dGVMZW5ndGgiLCAiZ2V0TWVzc2FnZSIsICJ0eXBlIiwgIkJ1ZmZlciIsICJOb2RlQnVmZmVyIiwgInNlY29uZHNTaW5jZUxhc3RSZXNldCIsICJTb3VyY2VJbnRlbnRzIiwgIkNvbnRlbnRSYXRpbmciLCAiX19kZWZQcm9wIiwgIl9fZXhwb3J0IiwgImlzTmFOMiIsICJCdWZmZXIiLCAiaXNOYU4iLCAiX2EiLCAiRGlzY292ZXJTZWN0aW9uVHlwZSIsICJ0eXBlIl0KfQo=
