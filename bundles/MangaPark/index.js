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

  // src/MangaPark/main.ts
  var main_exports = {};
  __export(main_exports, {
    MangaParkExtension: () => MangaParkExtension
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

  // src/MangaPark/forms.ts
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

  // src/MangaPark/network.ts
  init_buffer();
  var MainInterceptor = class extends PaperbackInterceptor {
    async interceptRequest(request) {
      request.headers = {
        ...request.headers,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Referer: "https://mangapark.net/"
      };
      return request;
    }
    async interceptResponse(request, response, data) {
      return data;
    }
  };

  // src/MangaPark/main.ts
  var MANGAPARK_DOMAIN = "https://mangapark.net";
  var MangaParkExtension = class {
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
      const url = `${MANGAPARK_DOMAIN}/${sectionId === "popular" ? "popular" : "latest"}?page=${page}`;
      try {
        const request = new Request(url);
        const response = await request.send();
        const $ = Application.Cheerio.load(response.data);
        const items = [];
        return {
          items,
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
      const url = `${MANGAPARK_DOMAIN}/search?q=${encodeURIComponent(searchTerm)}&page=${page}`;
      try {
        const request = new Request(url);
        const response = await request.send();
        const $ = Application.Cheerio.load(response.data);
        const results = [];
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
      const url = `${MANGAPARK_DOMAIN}/title/${mangaId}`;
      try {
        const request = new Request(url);
        const response = await request.send();
        const $ = Application.Cheerio.load(response.data);
        return {
          mangaId,
          titles: ["Title"],
          coverUrl: "",
          author: "",
          artist: "",
          synopsis: "",
          status: "Unknown",
          contentRating: ContentRating.EVERYONE,
          tags: []
        };
      } catch (error) {
        console.error(`Error fetching manga details for ${mangaId}:`, error);
        throw error;
      }
    }
    async getChapters(mangaId) {
      const url = `${MANGAPARK_DOMAIN}/title/${mangaId}`;
      try {
        const request = new Request(url);
        const response = await request.send();
        const $ = Application.Cheerio.load(response.data);
        const chapters = [];
        return chapters;
      } catch (error) {
        console.error(`Error fetching chapters for ${mangaId}:`, error);
        return [];
      }
    }
    async getChapterDetails(chapterId) {
      const url = `${MANGAPARK_DOMAIN}/chapter/${chapterId}`;
      try {
        const request = new Request(url);
        const response = await request.send();
        const $ = Application.Cheerio.load(response.data);
        const pages = [];
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9pbmRleC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvaWVlZTc1NC9pbmRleC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3Rvb2xjaGFpbi9saWIvc2hpbXMvYnVmZmVyLmpzIiwgIi4uLy4uL3NyYy9NYW5nYVBhcmsvbWFpbi50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9zcmMvaW5kZXgudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BwYXBlcmJhY2svdHlwZXMvc3JjL2ltcGwvaW5kZXgudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BwYXBlcmJhY2svdHlwZXMvc3JjL2ltcGwvU2V0dGluZ3NVSS9pbmRleC50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9zcmMvaW1wbC9TZXR0aW5nc1VJL0Zvcm0udHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BwYXBlcmJhY2svdHlwZXMvc3JjL2ltcGwvU2V0dGluZ3NVSS9Gb3JtSXRlbUVsZW1lbnQudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BwYXBlcmJhY2svdHlwZXMvc3JjL2ltcGwvU2V0dGluZ3NVSS9Gb3JtU2VjdGlvbi50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9zcmMvaW1wbC9pbnRlcmZhY2VzL2luZGV4LnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3R5cGVzL3NyYy9pbXBsL2ludGVyZmFjZXMvQ2hhcHRlclByb3ZpZGluZy50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9saWIvaW1wbC9pbnRlcmZhY2VzL0Nsb3VkZmxhcmVCeXBhc3NSZXF1ZXN0UHJvdmlkaW5nLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3R5cGVzL2xpYi9pbXBsL2ludGVyZmFjZXMvRGlzY292ZXJTZWN0aW9uUHJvdmlkaW5nLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3R5cGVzL2xpYi9pbXBsL2ludGVyZmFjZXMvTWFuYWdlZENvbGxlY3Rpb25Qcm92aWRpbmcuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BwYXBlcmJhY2svdHlwZXMvc3JjL2ltcGwvaW50ZXJmYWNlcy9NYW5nYVByb2dyZXNzUHJvdmlkaW5nLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3R5cGVzL2xpYi9pbXBsL2ludGVyZmFjZXMvTWFuZ2FQcm92aWRpbmcuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BwYXBlcmJhY2svdHlwZXMvc3JjL2ltcGwvaW50ZXJmYWNlcy9TZWFyY2hSZXN1bHRzUHJvdmlkaW5nLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3R5cGVzL2xpYi9pbXBsL2ludGVyZmFjZXMvU2V0dGluZ3NGb3JtUHJvdmlkaW5nLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3R5cGVzL2xpYi9pbXBsL0FwcGxpY2F0aW9uLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3R5cGVzL3NyYy9pbXBsL1BhcGVyYmFja0ludGVyY2VwdG9yLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3R5cGVzL2xpYi9pbXBsL1NlbGVjdG9yLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3R5cGVzL2xpYi9pbXBsL0V4dGVuc2lvbi5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9zcmMvaW1wbC9CYXNpY1JhdGVMaW1pdGVyLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3R5cGVzL3NyYy9pbXBsL0xvY2sudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BwYXBlcmJhY2svdHlwZXMvc3JjL2ltcGwvQ2xvdWRmbGFyZUVycm9yLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3R5cGVzL3NyYy9pbXBsL0Nvb2tpZVN0b3JhZ2VJbnRlcmNlcHRvci50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9zcmMvaW1wbC9VUkwudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BwYXBlcmJhY2svdHlwZXMvc3JjL2ltcGwvVGVzdERlZmluaXRpb24udHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BwYXBlcmJhY2svdHlwZXMvc3JjL2ltcGwvU291cmNlSW5mby50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvY2hhaS9pbmRleC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9saWIvQ2hhcHRlci5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9saWIvQ2hhcHRlckRldGFpbHMuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BwYXBlcmJhY2svdHlwZXMvbGliL0Nvb2tpZS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9saWIvRGlzY292ZXJTZWN0aW9uSXRlbS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9zcmMvRGlzY292ZXJTZWN0aW9uVHlwZS50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9saWIvSG9tZVNlY3Rpb24uanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BwYXBlcmJhY2svdHlwZXMvbGliL01hbmdhSW5mby5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9saWIvTWFuZ2FQcm9ncmVzcy5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9zcmMvUGFnZWRSZXN1bHRzLnRzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3R5cGVzL2xpYi9QQkNhbnZhcy5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9saWIvUEJJbWFnZS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9zcmMvUmVxdWVzdC50cyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9zcmMvUmVzcG9uc2UudHMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BwYXBlcmJhY2svdHlwZXMvbGliL1NlYXJjaEZpbHRlci5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHBhcGVyYmFjay90eXBlcy9saWIvU2VhcmNoUXVlcnkuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BwYXBlcmJhY2svdHlwZXMvbGliL1NlYXJjaFJlc3VsdEl0ZW0uanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BwYXBlcmJhY2svdHlwZXMvbGliL1NvdXJjZU1hbmdhLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3R5cGVzL2xpYi9UYWcuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BwYXBlcmJhY2svdHlwZXMvbGliL1RhZ1NlY3Rpb24uanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL0BwYXBlcmJhY2svdHlwZXMvbGliL1RyYWNrZWRNYW5nYUNoYXB0ZXJSZWFkQWN0aW9uLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9AcGFwZXJiYWNrL3R5cGVzL2xpYi9Tb3J0aW5nT3B0aW9uLmpzIiwgIi4uLy4uL3NyYy9NYW5nYVBhcmsvZm9ybXMudHMiLCAiLi4vLi4vc3JjL01hbmdhUGFyay9uZXR3b3JrLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIndXNlIHN0cmljdCdcblxuZXhwb3J0cy5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuZXhwb3J0cy50b0J5dGVBcnJheSA9IHRvQnl0ZUFycmF5XG5leHBvcnRzLmZyb21CeXRlQXJyYXkgPSBmcm9tQnl0ZUFycmF5XG5cbnZhciBsb29rdXAgPSBbXVxudmFyIHJldkxvb2t1cCA9IFtdXG52YXIgQXJyID0gdHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnID8gVWludDhBcnJheSA6IEFycmF5XG5cbnZhciBjb2RlID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nXG5mb3IgKHZhciBpID0gMCwgbGVuID0gY29kZS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICBsb29rdXBbaV0gPSBjb2RlW2ldXG4gIHJldkxvb2t1cFtjb2RlLmNoYXJDb2RlQXQoaSldID0gaVxufVxuXG4vLyBTdXBwb3J0IGRlY29kaW5nIFVSTC1zYWZlIGJhc2U2NCBzdHJpbmdzLCBhcyBOb2RlLmpzIGRvZXMuXG4vLyBTZWU6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Jhc2U2NCNVUkxfYXBwbGljYXRpb25zXG5yZXZMb29rdXBbJy0nLmNoYXJDb2RlQXQoMCldID0gNjJcbnJldkxvb2t1cFsnXycuY2hhckNvZGVBdCgwKV0gPSA2M1xuXG5mdW5jdGlvbiBnZXRMZW5zIChiNjQpIHtcbiAgdmFyIGxlbiA9IGI2NC5sZW5ndGhcblxuICBpZiAobGVuICUgNCA+IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3RyaW5nLiBMZW5ndGggbXVzdCBiZSBhIG11bHRpcGxlIG9mIDQnKVxuICB9XG5cbiAgLy8gVHJpbSBvZmYgZXh0cmEgYnl0ZXMgYWZ0ZXIgcGxhY2Vob2xkZXIgYnl0ZXMgYXJlIGZvdW5kXG4gIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2JlYXRnYW1taXQvYmFzZTY0LWpzL2lzc3Vlcy80MlxuICB2YXIgdmFsaWRMZW4gPSBiNjQuaW5kZXhPZignPScpXG4gIGlmICh2YWxpZExlbiA9PT0gLTEpIHZhbGlkTGVuID0gbGVuXG5cbiAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IHZhbGlkTGVuID09PSBsZW5cbiAgICA/IDBcbiAgICA6IDQgLSAodmFsaWRMZW4gJSA0KVxuXG4gIHJldHVybiBbdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbl1cbn1cblxuLy8gYmFzZTY0IGlzIDQvMyArIHVwIHRvIHR3byBjaGFyYWN0ZXJzIG9mIHRoZSBvcmlnaW5hbCBkYXRhXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChiNjQpIHtcbiAgdmFyIGxlbnMgPSBnZXRMZW5zKGI2NClcbiAgdmFyIHZhbGlkTGVuID0gbGVuc1swXVxuICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gbGVuc1sxXVxuICByZXR1cm4gKCh2YWxpZExlbiArIHBsYWNlSG9sZGVyc0xlbikgKiAzIC8gNCkgLSBwbGFjZUhvbGRlcnNMZW5cbn1cblxuZnVuY3Rpb24gX2J5dGVMZW5ndGggKGI2NCwgdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbikge1xuICByZXR1cm4gKCh2YWxpZExlbiArIHBsYWNlSG9sZGVyc0xlbikgKiAzIC8gNCkgLSBwbGFjZUhvbGRlcnNMZW5cbn1cblxuZnVuY3Rpb24gdG9CeXRlQXJyYXkgKGI2NCkge1xuICB2YXIgdG1wXG4gIHZhciBsZW5zID0gZ2V0TGVucyhiNjQpXG4gIHZhciB2YWxpZExlbiA9IGxlbnNbMF1cbiAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IGxlbnNbMV1cblxuICB2YXIgYXJyID0gbmV3IEFycihfYnl0ZUxlbmd0aChiNjQsIHZhbGlkTGVuLCBwbGFjZUhvbGRlcnNMZW4pKVxuXG4gIHZhciBjdXJCeXRlID0gMFxuXG4gIC8vIGlmIHRoZXJlIGFyZSBwbGFjZWhvbGRlcnMsIG9ubHkgZ2V0IHVwIHRvIHRoZSBsYXN0IGNvbXBsZXRlIDQgY2hhcnNcbiAgdmFyIGxlbiA9IHBsYWNlSG9sZGVyc0xlbiA+IDBcbiAgICA/IHZhbGlkTGVuIC0gNFxuICAgIDogdmFsaWRMZW5cblxuICB2YXIgaVxuICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpICs9IDQpIHtcbiAgICB0bXAgPVxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMTgpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCAxMikgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildIDw8IDYpIHxcbiAgICAgIHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMyldXG4gICAgYXJyW2N1ckJ5dGUrK10gPSAodG1wID4+IDE2KSAmIDB4RkZcbiAgICBhcnJbY3VyQnl0ZSsrXSA9ICh0bXAgPj4gOCkgJiAweEZGXG4gICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICBpZiAocGxhY2VIb2xkZXJzTGVuID09PSAyKSB7XG4gICAgdG1wID1cbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDIpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA+PiA0KVxuICAgIGFycltjdXJCeXRlKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgaWYgKHBsYWNlSG9sZGVyc0xlbiA9PT0gMSkge1xuICAgIHRtcCA9XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAxMCkgfFxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDQpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDIpXSA+PiAyKVxuICAgIGFycltjdXJCeXRlKytdID0gKHRtcCA+PiA4KSAmIDB4RkZcbiAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBhcnJcbn1cblxuZnVuY3Rpb24gdHJpcGxldFRvQmFzZTY0IChudW0pIHtcbiAgcmV0dXJuIGxvb2t1cFtudW0gPj4gMTggJiAweDNGXSArXG4gICAgbG9va3VwW251bSA+PiAxMiAmIDB4M0ZdICtcbiAgICBsb29rdXBbbnVtID4+IDYgJiAweDNGXSArXG4gICAgbG9va3VwW251bSAmIDB4M0ZdXG59XG5cbmZ1bmN0aW9uIGVuY29kZUNodW5rICh1aW50OCwgc3RhcnQsIGVuZCkge1xuICB2YXIgdG1wXG4gIHZhciBvdXRwdXQgPSBbXVxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkgKz0gMykge1xuICAgIHRtcCA9XG4gICAgICAoKHVpbnQ4W2ldIDw8IDE2KSAmIDB4RkYwMDAwKSArXG4gICAgICAoKHVpbnQ4W2kgKyAxXSA8PCA4KSAmIDB4RkYwMCkgK1xuICAgICAgKHVpbnQ4W2kgKyAyXSAmIDB4RkYpXG4gICAgb3V0cHV0LnB1c2godHJpcGxldFRvQmFzZTY0KHRtcCkpXG4gIH1cbiAgcmV0dXJuIG91dHB1dC5qb2luKCcnKVxufVxuXG5mdW5jdGlvbiBmcm9tQnl0ZUFycmF5ICh1aW50OCkge1xuICB2YXIgdG1wXG4gIHZhciBsZW4gPSB1aW50OC5sZW5ndGhcbiAgdmFyIGV4dHJhQnl0ZXMgPSBsZW4gJSAzIC8vIGlmIHdlIGhhdmUgMSBieXRlIGxlZnQsIHBhZCAyIGJ5dGVzXG4gIHZhciBwYXJ0cyA9IFtdXG4gIHZhciBtYXhDaHVua0xlbmd0aCA9IDE2MzgzIC8vIG11c3QgYmUgbXVsdGlwbGUgb2YgM1xuXG4gIC8vIGdvIHRocm91Z2ggdGhlIGFycmF5IGV2ZXJ5IHRocmVlIGJ5dGVzLCB3ZSdsbCBkZWFsIHdpdGggdHJhaWxpbmcgc3R1ZmYgbGF0ZXJcbiAgZm9yICh2YXIgaSA9IDAsIGxlbjIgPSBsZW4gLSBleHRyYUJ5dGVzOyBpIDwgbGVuMjsgaSArPSBtYXhDaHVua0xlbmd0aCkge1xuICAgIHBhcnRzLnB1c2goZW5jb2RlQ2h1bmsodWludDgsIGksIChpICsgbWF4Q2h1bmtMZW5ndGgpID4gbGVuMiA/IGxlbjIgOiAoaSArIG1heENodW5rTGVuZ3RoKSkpXG4gIH1cblxuICAvLyBwYWQgdGhlIGVuZCB3aXRoIHplcm9zLCBidXQgbWFrZSBzdXJlIHRvIG5vdCBmb3JnZXQgdGhlIGV4dHJhIGJ5dGVzXG4gIGlmIChleHRyYUJ5dGVzID09PSAxKSB7XG4gICAgdG1wID0gdWludDhbbGVuIC0gMV1cbiAgICBwYXJ0cy5wdXNoKFxuICAgICAgbG9va3VwW3RtcCA+PiAyXSArXG4gICAgICBsb29rdXBbKHRtcCA8PCA0KSAmIDB4M0ZdICtcbiAgICAgICc9PSdcbiAgICApXG4gIH0gZWxzZSBpZiAoZXh0cmFCeXRlcyA9PT0gMikge1xuICAgIHRtcCA9ICh1aW50OFtsZW4gLSAyXSA8PCA4KSArIHVpbnQ4W2xlbiAtIDFdXG4gICAgcGFydHMucHVzaChcbiAgICAgIGxvb2t1cFt0bXAgPj4gMTBdICtcbiAgICAgIGxvb2t1cFsodG1wID4+IDQpICYgMHgzRl0gK1xuICAgICAgbG9va3VwWyh0bXAgPDwgMikgJiAweDNGXSArXG4gICAgICAnPSdcbiAgICApXG4gIH1cblxuICByZXR1cm4gcGFydHMuam9pbignJylcbn1cbiIsICIvKiEgaWVlZTc1NC4gQlNELTMtQ2xhdXNlIExpY2Vuc2UuIEZlcm9zcyBBYm91a2hhZGlqZWggPGh0dHBzOi8vZmVyb3NzLm9yZy9vcGVuc291cmNlPiAqL1xuZXhwb3J0cy5yZWFkID0gZnVuY3Rpb24gKGJ1ZmZlciwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG1cbiAgdmFyIGVMZW4gPSAobkJ5dGVzICogOCkgLSBtTGVuIC0gMVxuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMVxuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDFcbiAgdmFyIG5CaXRzID0gLTdcbiAgdmFyIGkgPSBpc0xFID8gKG5CeXRlcyAtIDEpIDogMFxuICB2YXIgZCA9IGlzTEUgPyAtMSA6IDFcbiAgdmFyIHMgPSBidWZmZXJbb2Zmc2V0ICsgaV1cblxuICBpICs9IGRcblxuICBlID0gcyAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBzID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBlTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IGUgPSAoZSAqIDI1NikgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBtID0gZSAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBlID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBtTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IG0gPSAobSAqIDI1NikgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBpZiAoZSA9PT0gMCkge1xuICAgIGUgPSAxIC0gZUJpYXNcbiAgfSBlbHNlIGlmIChlID09PSBlTWF4KSB7XG4gICAgcmV0dXJuIG0gPyBOYU4gOiAoKHMgPyAtMSA6IDEpICogSW5maW5pdHkpXG4gIH0gZWxzZSB7XG4gICAgbSA9IG0gKyBNYXRoLnBvdygyLCBtTGVuKVxuICAgIGUgPSBlIC0gZUJpYXNcbiAgfVxuICByZXR1cm4gKHMgPyAtMSA6IDEpICogbSAqIE1hdGgucG93KDIsIGUgLSBtTGVuKVxufVxuXG5leHBvcnRzLndyaXRlID0gZnVuY3Rpb24gKGJ1ZmZlciwgdmFsdWUsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtLCBjXG4gIHZhciBlTGVuID0gKG5CeXRlcyAqIDgpIC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBydCA9IChtTGVuID09PSAyMyA/IE1hdGgucG93KDIsIC0yNCkgLSBNYXRoLnBvdygyLCAtNzcpIDogMClcbiAgdmFyIGkgPSBpc0xFID8gMCA6IChuQnl0ZXMgLSAxKVxuICB2YXIgZCA9IGlzTEUgPyAxIDogLTFcbiAgdmFyIHMgPSB2YWx1ZSA8IDAgfHwgKHZhbHVlID09PSAwICYmIDEgLyB2YWx1ZSA8IDApID8gMSA6IDBcblxuICB2YWx1ZSA9IE1hdGguYWJzKHZhbHVlKVxuXG4gIGlmIChpc05hTih2YWx1ZSkgfHwgdmFsdWUgPT09IEluZmluaXR5KSB7XG4gICAgbSA9IGlzTmFOKHZhbHVlKSA/IDEgOiAwXG4gICAgZSA9IGVNYXhcbiAgfSBlbHNlIHtcbiAgICBlID0gTWF0aC5mbG9vcihNYXRoLmxvZyh2YWx1ZSkgLyBNYXRoLkxOMilcbiAgICBpZiAodmFsdWUgKiAoYyA9IE1hdGgucG93KDIsIC1lKSkgPCAxKSB7XG4gICAgICBlLS1cbiAgICAgIGMgKj0gMlxuICAgIH1cbiAgICBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIHZhbHVlICs9IHJ0IC8gY1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSArPSBydCAqIE1hdGgucG93KDIsIDEgLSBlQmlhcylcbiAgICB9XG4gICAgaWYgKHZhbHVlICogYyA+PSAyKSB7XG4gICAgICBlKytcbiAgICAgIGMgLz0gMlxuICAgIH1cblxuICAgIGlmIChlICsgZUJpYXMgPj0gZU1heCkge1xuICAgICAgbSA9IDBcbiAgICAgIGUgPSBlTWF4XG4gICAgfSBlbHNlIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgbSA9ICgodmFsdWUgKiBjKSAtIDEpICogTWF0aC5wb3coMiwgbUxlbilcbiAgICAgIGUgPSBlICsgZUJpYXNcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IHZhbHVlICogTWF0aC5wb3coMiwgZUJpYXMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pXG4gICAgICBlID0gMFxuICAgIH1cbiAgfVxuXG4gIGZvciAoOyBtTGVuID49IDg7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IG0gJiAweGZmLCBpICs9IGQsIG0gLz0gMjU2LCBtTGVuIC09IDgpIHt9XG5cbiAgZSA9IChlIDw8IG1MZW4pIHwgbVxuICBlTGVuICs9IG1MZW5cbiAgZm9yICg7IGVMZW4gPiAwOyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBlICYgMHhmZiwgaSArPSBkLCBlIC89IDI1NiwgZUxlbiAtPSA4KSB7fVxuXG4gIGJ1ZmZlcltvZmZzZXQgKyBpIC0gZF0gfD0gcyAqIDEyOFxufVxuIiwgIi8qIVxuICogVGhlIGJ1ZmZlciBtb2R1bGUgZnJvbSBub2RlLmpzLCBmb3IgdGhlIGJyb3dzZXIuXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGh0dHBzOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cblxuJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGJhc2U2NCA9IHJlcXVpcmUoJ2Jhc2U2NC1qcycpXG5jb25zdCBpZWVlNzU0ID0gcmVxdWlyZSgnaWVlZTc1NCcpXG5jb25zdCBjdXN0b21JbnNwZWN0U3ltYm9sID1cbiAgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIFN5bWJvbFsnZm9yJ10gPT09ICdmdW5jdGlvbicpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZG90LW5vdGF0aW9uXG4gICAgPyBTeW1ib2xbJ2ZvciddKCdub2RlanMudXRpbC5pbnNwZWN0LmN1c3RvbScpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZG90LW5vdGF0aW9uXG4gICAgOiBudWxsXG5cbmV4cG9ydHMuQnVmZmVyID0gQnVmZmVyXG5leHBvcnRzLlNsb3dCdWZmZXIgPSBTbG93QnVmZmVyXG5leHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTID0gNTBcblxuY29uc3QgS19NQVhfTEVOR1RIID0gMHg3ZmZmZmZmZlxuZXhwb3J0cy5rTWF4TGVuZ3RoID0gS19NQVhfTEVOR1RIXG5cbi8qKlxuICogSWYgYEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUYDpcbiAqICAgPT09IHRydWUgICAgVXNlIFVpbnQ4QXJyYXkgaW1wbGVtZW50YXRpb24gKGZhc3Rlc3QpXG4gKiAgID09PSBmYWxzZSAgIFByaW50IHdhcm5pbmcgYW5kIHJlY29tbWVuZCB1c2luZyBgYnVmZmVyYCB2NC54IHdoaWNoIGhhcyBhbiBPYmplY3RcbiAqICAgICAgICAgICAgICAgaW1wbGVtZW50YXRpb24gKG1vc3QgY29tcGF0aWJsZSwgZXZlbiBJRTYpXG4gKlxuICogQnJvd3NlcnMgdGhhdCBzdXBwb3J0IHR5cGVkIGFycmF5cyBhcmUgSUUgMTArLCBGaXJlZm94IDQrLCBDaHJvbWUgNyssIFNhZmFyaSA1LjErLFxuICogT3BlcmEgMTEuNissIGlPUyA0LjIrLlxuICpcbiAqIFdlIHJlcG9ydCB0aGF0IHRoZSBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgdHlwZWQgYXJyYXlzIGlmIHRoZSBhcmUgbm90IHN1YmNsYXNzYWJsZVxuICogdXNpbmcgX19wcm90b19fLiBGaXJlZm94IDQtMjkgbGFja3Mgc3VwcG9ydCBmb3IgYWRkaW5nIG5ldyBwcm9wZXJ0aWVzIHRvIGBVaW50OEFycmF5YFxuICogKFNlZTogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9Njk1NDM4KS4gSUUgMTAgbGFja3Mgc3VwcG9ydFxuICogZm9yIF9fcHJvdG9fXyBhbmQgaGFzIGEgYnVnZ3kgdHlwZWQgYXJyYXkgaW1wbGVtZW50YXRpb24uXG4gKi9cbkJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUID0gdHlwZWRBcnJheVN1cHBvcnQoKVxuXG5pZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHR5cGVvZiBjb25zb2xlLmVycm9yID09PSAnZnVuY3Rpb24nKSB7XG4gIGNvbnNvbGUuZXJyb3IoXG4gICAgJ1RoaXMgYnJvd3NlciBsYWNrcyB0eXBlZCBhcnJheSAoVWludDhBcnJheSkgc3VwcG9ydCB3aGljaCBpcyByZXF1aXJlZCBieSAnICtcbiAgICAnYGJ1ZmZlcmAgdjUueC4gVXNlIGBidWZmZXJgIHY0LnggaWYgeW91IHJlcXVpcmUgb2xkIGJyb3dzZXIgc3VwcG9ydC4nXG4gIClcbn1cblxuZnVuY3Rpb24gdHlwZWRBcnJheVN1cHBvcnQgKCkge1xuICAvLyBDYW4gdHlwZWQgYXJyYXkgaW5zdGFuY2VzIGNhbiBiZSBhdWdtZW50ZWQ/XG4gIHRyeSB7XG4gICAgY29uc3QgYXJyID0gbmV3IFVpbnQ4QXJyYXkoMSlcbiAgICBjb25zdCBwcm90byA9IHsgZm9vOiBmdW5jdGlvbiAoKSB7IHJldHVybiA0MiB9IH1cbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YocHJvdG8sIFVpbnQ4QXJyYXkucHJvdG90eXBlKVxuICAgIE9iamVjdC5zZXRQcm90b3R5cGVPZihhcnIsIHByb3RvKVxuICAgIHJldHVybiBhcnIuZm9vKCkgPT09IDQyXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoQnVmZmVyLnByb3RvdHlwZSwgJ3BhcmVudCcsIHtcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFCdWZmZXIuaXNCdWZmZXIodGhpcykpIHJldHVybiB1bmRlZmluZWRcbiAgICByZXR1cm4gdGhpcy5idWZmZXJcbiAgfVxufSlcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1ZmZlci5wcm90b3R5cGUsICdvZmZzZXQnLCB7XG4gIGVudW1lcmFibGU6IHRydWUsXG4gIGdldDogZnVuY3Rpb24gKCkge1xuICAgIGlmICghQnVmZmVyLmlzQnVmZmVyKHRoaXMpKSByZXR1cm4gdW5kZWZpbmVkXG4gICAgcmV0dXJuIHRoaXMuYnl0ZU9mZnNldFxuICB9XG59KVxuXG5mdW5jdGlvbiBjcmVhdGVCdWZmZXIgKGxlbmd0aCkge1xuICBpZiAobGVuZ3RoID4gS19NQVhfTEVOR1RIKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZSB2YWx1ZSBcIicgKyBsZW5ndGggKyAnXCIgaXMgaW52YWxpZCBmb3Igb3B0aW9uIFwic2l6ZVwiJylcbiAgfVxuICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZVxuICBjb25zdCBidWYgPSBuZXcgVWludDhBcnJheShsZW5ndGgpXG4gIE9iamVjdC5zZXRQcm90b3R5cGVPZihidWYsIEJ1ZmZlci5wcm90b3R5cGUpXG4gIHJldHVybiBidWZcbn1cblxuLyoqXG4gKiBUaGUgQnVmZmVyIGNvbnN0cnVjdG9yIHJldHVybnMgaW5zdGFuY2VzIG9mIGBVaW50OEFycmF5YCB0aGF0IGhhdmUgdGhlaXJcbiAqIHByb3RvdHlwZSBjaGFuZ2VkIHRvIGBCdWZmZXIucHJvdG90eXBlYC4gRnVydGhlcm1vcmUsIGBCdWZmZXJgIGlzIGEgc3ViY2xhc3Mgb2ZcbiAqIGBVaW50OEFycmF5YCwgc28gdGhlIHJldHVybmVkIGluc3RhbmNlcyB3aWxsIGhhdmUgYWxsIHRoZSBub2RlIGBCdWZmZXJgIG1ldGhvZHNcbiAqIGFuZCB0aGUgYFVpbnQ4QXJyYXlgIG1ldGhvZHMuIFNxdWFyZSBicmFja2V0IG5vdGF0aW9uIHdvcmtzIGFzIGV4cGVjdGVkIC0tIGl0XG4gKiByZXR1cm5zIGEgc2luZ2xlIG9jdGV0LlxuICpcbiAqIFRoZSBgVWludDhBcnJheWAgcHJvdG90eXBlIHJlbWFpbnMgdW5tb2RpZmllZC5cbiAqL1xuXG5mdW5jdGlvbiBCdWZmZXIgKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIC8vIENvbW1vbiBjYXNlLlxuICBpZiAodHlwZW9mIGFyZyA9PT0gJ251bWJlcicpIHtcbiAgICBpZiAodHlwZW9mIGVuY29kaW5nT3JPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgICAnVGhlIFwic3RyaW5nXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIHN0cmluZy4gUmVjZWl2ZWQgdHlwZSBudW1iZXInXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBhbGxvY1Vuc2FmZShhcmcpXG4gIH1cbiAgcmV0dXJuIGZyb20oYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cbkJ1ZmZlci5wb29sU2l6ZSA9IDgxOTIgLy8gbm90IHVzZWQgYnkgdGhpcyBpbXBsZW1lbnRhdGlvblxuXG5mdW5jdGlvbiBmcm9tICh2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGZyb21TdHJpbmcodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQpXG4gIH1cblxuICBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KHZhbHVlKSkge1xuICAgIHJldHVybiBmcm9tQXJyYXlWaWV3KHZhbHVlKVxuICB9XG5cbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgJ1RoZSBmaXJzdCBhcmd1bWVudCBtdXN0IGJlIG9uZSBvZiB0eXBlIHN0cmluZywgQnVmZmVyLCBBcnJheUJ1ZmZlciwgQXJyYXksICcgK1xuICAgICAgJ29yIEFycmF5LWxpa2UgT2JqZWN0LiBSZWNlaXZlZCB0eXBlICcgKyAodHlwZW9mIHZhbHVlKVxuICAgIClcbiAgfVxuXG4gIGlmIChpc0luc3RhbmNlKHZhbHVlLCBBcnJheUJ1ZmZlcikgfHxcbiAgICAgICh2YWx1ZSAmJiBpc0luc3RhbmNlKHZhbHVlLmJ1ZmZlciwgQXJyYXlCdWZmZXIpKSkge1xuICAgIHJldHVybiBmcm9tQXJyYXlCdWZmZXIodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIGlmICh0eXBlb2YgU2hhcmVkQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAoaXNJbnN0YW5jZSh2YWx1ZSwgU2hhcmVkQXJyYXlCdWZmZXIpIHx8XG4gICAgICAodmFsdWUgJiYgaXNJbnN0YW5jZSh2YWx1ZS5idWZmZXIsIFNoYXJlZEFycmF5QnVmZmVyKSkpKSB7XG4gICAgcmV0dXJuIGZyb21BcnJheUJ1ZmZlcih2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgJ1RoZSBcInZhbHVlXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgb2YgdHlwZSBudW1iZXIuIFJlY2VpdmVkIHR5cGUgbnVtYmVyJ1xuICAgIClcbiAgfVxuXG4gIGNvbnN0IHZhbHVlT2YgPSB2YWx1ZS52YWx1ZU9mICYmIHZhbHVlLnZhbHVlT2YoKVxuICBpZiAodmFsdWVPZiAhPSBudWxsICYmIHZhbHVlT2YgIT09IHZhbHVlKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5mcm9tKHZhbHVlT2YsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIGNvbnN0IGIgPSBmcm9tT2JqZWN0KHZhbHVlKVxuICBpZiAoYikgcmV0dXJuIGJcblxuICBpZiAodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvUHJpbWl0aXZlICE9IG51bGwgJiZcbiAgICAgIHR5cGVvZiB2YWx1ZVtTeW1ib2wudG9QcmltaXRpdmVdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5mcm9tKHZhbHVlW1N5bWJvbC50b1ByaW1pdGl2ZV0oJ3N0cmluZycpLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICdUaGUgZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBvbmUgb2YgdHlwZSBzdHJpbmcsIEJ1ZmZlciwgQXJyYXlCdWZmZXIsIEFycmF5LCAnICtcbiAgICAnb3IgQXJyYXktbGlrZSBPYmplY3QuIFJlY2VpdmVkIHR5cGUgJyArICh0eXBlb2YgdmFsdWUpXG4gIClcbn1cblxuLyoqXG4gKiBGdW5jdGlvbmFsbHkgZXF1aXZhbGVudCB0byBCdWZmZXIoYXJnLCBlbmNvZGluZykgYnV0IHRocm93cyBhIFR5cGVFcnJvclxuICogaWYgdmFsdWUgaXMgYSBudW1iZXIuXG4gKiBCdWZmZXIuZnJvbShzdHJbLCBlbmNvZGluZ10pXG4gKiBCdWZmZXIuZnJvbShhcnJheSlcbiAqIEJ1ZmZlci5mcm9tKGJ1ZmZlcilcbiAqIEJ1ZmZlci5mcm9tKGFycmF5QnVmZmVyWywgYnl0ZU9mZnNldFssIGxlbmd0aF1dKVxuICoqL1xuQnVmZmVyLmZyb20gPSBmdW5jdGlvbiAodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gZnJvbSh2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxufVxuXG4vLyBOb3RlOiBDaGFuZ2UgcHJvdG90eXBlICphZnRlciogQnVmZmVyLmZyb20gaXMgZGVmaW5lZCB0byB3b3JrYXJvdW5kIENocm9tZSBidWc6XG4vLyBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2J1ZmZlci9wdWxsLzE0OFxuT2JqZWN0LnNldFByb3RvdHlwZU9mKEJ1ZmZlci5wcm90b3R5cGUsIFVpbnQ4QXJyYXkucHJvdG90eXBlKVxuT2JqZWN0LnNldFByb3RvdHlwZU9mKEJ1ZmZlciwgVWludDhBcnJheSlcblxuZnVuY3Rpb24gYXNzZXJ0U2l6ZSAoc2l6ZSkge1xuICBpZiAodHlwZW9mIHNpemUgIT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJzaXplXCIgYXJndW1lbnQgbXVzdCBiZSBvZiB0eXBlIG51bWJlcicpXG4gIH0gZWxzZSBpZiAoc2l6ZSA8IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlIHZhbHVlIFwiJyArIHNpemUgKyAnXCIgaXMgaW52YWxpZCBmb3Igb3B0aW9uIFwic2l6ZVwiJylcbiAgfVxufVxuXG5mdW5jdGlvbiBhbGxvYyAoc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgYXNzZXJ0U2l6ZShzaXplKVxuICBpZiAoc2l6ZSA8PSAwKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcihzaXplKVxuICB9XG4gIGlmIChmaWxsICE9PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPbmx5IHBheSBhdHRlbnRpb24gdG8gZW5jb2RpbmcgaWYgaXQncyBhIHN0cmluZy4gVGhpc1xuICAgIC8vIHByZXZlbnRzIGFjY2lkZW50YWxseSBzZW5kaW5nIGluIGEgbnVtYmVyIHRoYXQgd291bGRcbiAgICAvLyBiZSBpbnRlcnByZXRlZCBhcyBhIHN0YXJ0IG9mZnNldC5cbiAgICByZXR1cm4gdHlwZW9mIGVuY29kaW5nID09PSAnc3RyaW5nJ1xuICAgICAgPyBjcmVhdGVCdWZmZXIoc2l6ZSkuZmlsbChmaWxsLCBlbmNvZGluZylcbiAgICAgIDogY3JlYXRlQnVmZmVyKHNpemUpLmZpbGwoZmlsbClcbiAgfVxuICByZXR1cm4gY3JlYXRlQnVmZmVyKHNpemUpXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBmaWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICogYWxsb2Moc2l6ZVssIGZpbGxbLCBlbmNvZGluZ11dKVxuICoqL1xuQnVmZmVyLmFsbG9jID0gZnVuY3Rpb24gKHNpemUsIGZpbGwsIGVuY29kaW5nKSB7XG4gIHJldHVybiBhbGxvYyhzaXplLCBmaWxsLCBlbmNvZGluZylcbn1cblxuZnVuY3Rpb24gYWxsb2NVbnNhZmUgKHNpemUpIHtcbiAgYXNzZXJ0U2l6ZShzaXplKVxuICByZXR1cm4gY3JlYXRlQnVmZmVyKHNpemUgPCAwID8gMCA6IGNoZWNrZWQoc2l6ZSkgfCAwKVxufVxuXG4vKipcbiAqIEVxdWl2YWxlbnQgdG8gQnVmZmVyKG51bSksIGJ5IGRlZmF1bHQgY3JlYXRlcyBhIG5vbi16ZXJvLWZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKiAqL1xuQnVmZmVyLmFsbG9jVW5zYWZlID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgcmV0dXJuIGFsbG9jVW5zYWZlKHNpemUpXG59XG4vKipcbiAqIEVxdWl2YWxlbnQgdG8gU2xvd0J1ZmZlcihudW0pLCBieSBkZWZhdWx0IGNyZWF0ZXMgYSBub24temVyby1maWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICovXG5CdWZmZXIuYWxsb2NVbnNhZmVTbG93ID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgcmV0dXJuIGFsbG9jVW5zYWZlKHNpemUpXG59XG5cbmZ1bmN0aW9uIGZyb21TdHJpbmcgKHN0cmluZywgZW5jb2RpbmcpIHtcbiAgaWYgKHR5cGVvZiBlbmNvZGluZyAhPT0gJ3N0cmluZycgfHwgZW5jb2RpbmcgPT09ICcnKSB7XG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgfVxuXG4gIGlmICghQnVmZmVyLmlzRW5jb2RpbmcoZW5jb2RpbmcpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICB9XG5cbiAgY29uc3QgbGVuZ3RoID0gYnl0ZUxlbmd0aChzdHJpbmcsIGVuY29kaW5nKSB8IDBcbiAgbGV0IGJ1ZiA9IGNyZWF0ZUJ1ZmZlcihsZW5ndGgpXG5cbiAgY29uc3QgYWN0dWFsID0gYnVmLndyaXRlKHN0cmluZywgZW5jb2RpbmcpXG5cbiAgaWYgKGFjdHVhbCAhPT0gbGVuZ3RoKSB7XG4gICAgLy8gV3JpdGluZyBhIGhleCBzdHJpbmcsIGZvciBleGFtcGxlLCB0aGF0IGNvbnRhaW5zIGludmFsaWQgY2hhcmFjdGVycyB3aWxsXG4gICAgLy8gY2F1c2UgZXZlcnl0aGluZyBhZnRlciB0aGUgZmlyc3QgaW52YWxpZCBjaGFyYWN0ZXIgdG8gYmUgaWdub3JlZC4gKGUuZy5cbiAgICAvLyAnYWJ4eGNkJyB3aWxsIGJlIHRyZWF0ZWQgYXMgJ2FiJylcbiAgICBidWYgPSBidWYuc2xpY2UoMCwgYWN0dWFsKVxuICB9XG5cbiAgcmV0dXJuIGJ1ZlxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlMaWtlIChhcnJheSkge1xuICBjb25zdCBsZW5ndGggPSBhcnJheS5sZW5ndGggPCAwID8gMCA6IGNoZWNrZWQoYXJyYXkubGVuZ3RoKSB8IDBcbiAgY29uc3QgYnVmID0gY3JlYXRlQnVmZmVyKGxlbmd0aClcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgIGJ1ZltpXSA9IGFycmF5W2ldICYgMjU1XG4gIH1cbiAgcmV0dXJuIGJ1ZlxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlWaWV3IChhcnJheVZpZXcpIHtcbiAgaWYgKGlzSW5zdGFuY2UoYXJyYXlWaWV3LCBVaW50OEFycmF5KSkge1xuICAgIGNvbnN0IGNvcHkgPSBuZXcgVWludDhBcnJheShhcnJheVZpZXcpXG4gICAgcmV0dXJuIGZyb21BcnJheUJ1ZmZlcihjb3B5LmJ1ZmZlciwgY29weS5ieXRlT2Zmc2V0LCBjb3B5LmJ5dGVMZW5ndGgpXG4gIH1cbiAgcmV0dXJuIGZyb21BcnJheUxpa2UoYXJyYXlWaWV3KVxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlCdWZmZXIgKGFycmF5LCBieXRlT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKGJ5dGVPZmZzZXQgPCAwIHx8IGFycmF5LmJ5dGVMZW5ndGggPCBieXRlT2Zmc2V0KSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1wib2Zmc2V0XCIgaXMgb3V0c2lkZSBvZiBidWZmZXIgYm91bmRzJylcbiAgfVxuXG4gIGlmIChhcnJheS5ieXRlTGVuZ3RoIDwgYnl0ZU9mZnNldCArIChsZW5ndGggfHwgMCkpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXCJsZW5ndGhcIiBpcyBvdXRzaWRlIG9mIGJ1ZmZlciBib3VuZHMnKVxuICB9XG5cbiAgbGV0IGJ1ZlxuICBpZiAoYnl0ZU9mZnNldCA9PT0gdW5kZWZpbmVkICYmIGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYnVmID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXkpXG4gIH0gZWxzZSBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBidWYgPSBuZXcgVWludDhBcnJheShhcnJheSwgYnl0ZU9mZnNldClcbiAgfSBlbHNlIHtcbiAgICBidWYgPSBuZXcgVWludDhBcnJheShhcnJheSwgYnl0ZU9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgLy8gUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2VcbiAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGJ1ZiwgQnVmZmVyLnByb3RvdHlwZSlcblxuICByZXR1cm4gYnVmXG59XG5cbmZ1bmN0aW9uIGZyb21PYmplY3QgKG9iaikge1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKG9iaikpIHtcbiAgICBjb25zdCBsZW4gPSBjaGVja2VkKG9iai5sZW5ndGgpIHwgMFxuICAgIGNvbnN0IGJ1ZiA9IGNyZWF0ZUJ1ZmZlcihsZW4pXG5cbiAgICBpZiAoYnVmLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGJ1ZlxuICAgIH1cblxuICAgIG9iai5jb3B5KGJ1ZiwgMCwgMCwgbGVuKVxuICAgIHJldHVybiBidWZcbiAgfVxuXG4gIGlmIChvYmoubGVuZ3RoICE9PSB1bmRlZmluZWQpIHtcbiAgICBpZiAodHlwZW9mIG9iai5sZW5ndGggIT09ICdudW1iZXInIHx8IG51bWJlcklzTmFOKG9iai5sZW5ndGgpKSB7XG4gICAgICByZXR1cm4gY3JlYXRlQnVmZmVyKDApXG4gICAgfVxuICAgIHJldHVybiBmcm9tQXJyYXlMaWtlKG9iailcbiAgfVxuXG4gIGlmIChvYmoudHlwZSA9PT0gJ0J1ZmZlcicgJiYgQXJyYXkuaXNBcnJheShvYmouZGF0YSkpIHtcbiAgICByZXR1cm4gZnJvbUFycmF5TGlrZShvYmouZGF0YSlcbiAgfVxufVxuXG5mdW5jdGlvbiBjaGVja2VkIChsZW5ndGgpIHtcbiAgLy8gTm90ZTogY2Fubm90IHVzZSBgbGVuZ3RoIDwgS19NQVhfTEVOR1RIYCBoZXJlIGJlY2F1c2UgdGhhdCBmYWlscyB3aGVuXG4gIC8vIGxlbmd0aCBpcyBOYU4gKHdoaWNoIGlzIG90aGVyd2lzZSBjb2VyY2VkIHRvIHplcm8uKVxuICBpZiAobGVuZ3RoID49IEtfTUFYX0xFTkdUSCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdBdHRlbXB0IHRvIGFsbG9jYXRlIEJ1ZmZlciBsYXJnZXIgdGhhbiBtYXhpbXVtICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICdzaXplOiAweCcgKyBLX01BWF9MRU5HVEgudG9TdHJpbmcoMTYpICsgJyBieXRlcycpXG4gIH1cbiAgcmV0dXJuIGxlbmd0aCB8IDBcbn1cblxuZnVuY3Rpb24gU2xvd0J1ZmZlciAobGVuZ3RoKSB7XG4gIGlmICgrbGVuZ3RoICE9IGxlbmd0aCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGVxZXFlcVxuICAgIGxlbmd0aCA9IDBcbiAgfVxuICByZXR1cm4gQnVmZmVyLmFsbG9jKCtsZW5ndGgpXG59XG5cbkJ1ZmZlci5pc0J1ZmZlciA9IGZ1bmN0aW9uIGlzQnVmZmVyIChiKSB7XG4gIHJldHVybiBiICE9IG51bGwgJiYgYi5faXNCdWZmZXIgPT09IHRydWUgJiZcbiAgICBiICE9PSBCdWZmZXIucHJvdG90eXBlIC8vIHNvIEJ1ZmZlci5pc0J1ZmZlcihCdWZmZXIucHJvdG90eXBlKSB3aWxsIGJlIGZhbHNlXG59XG5cbkJ1ZmZlci5jb21wYXJlID0gZnVuY3Rpb24gY29tcGFyZSAoYSwgYikge1xuICBpZiAoaXNJbnN0YW5jZShhLCBVaW50OEFycmF5KSkgYSA9IEJ1ZmZlci5mcm9tKGEsIGEub2Zmc2V0LCBhLmJ5dGVMZW5ndGgpXG4gIGlmIChpc0luc3RhbmNlKGIsIFVpbnQ4QXJyYXkpKSBiID0gQnVmZmVyLmZyb20oYiwgYi5vZmZzZXQsIGIuYnl0ZUxlbmd0aClcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYSkgfHwgIUJ1ZmZlci5pc0J1ZmZlcihiKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAnVGhlIFwiYnVmMVwiLCBcImJ1ZjJcIiBhcmd1bWVudHMgbXVzdCBiZSBvbmUgb2YgdHlwZSBCdWZmZXIgb3IgVWludDhBcnJheSdcbiAgICApXG4gIH1cblxuICBpZiAoYSA9PT0gYikgcmV0dXJuIDBcblxuICBsZXQgeCA9IGEubGVuZ3RoXG4gIGxldCB5ID0gYi5sZW5ndGhcblxuICBmb3IgKGxldCBpID0gMCwgbGVuID0gTWF0aC5taW4oeCwgeSk7IGkgPCBsZW47ICsraSkge1xuICAgIGlmIChhW2ldICE9PSBiW2ldKSB7XG4gICAgICB4ID0gYVtpXVxuICAgICAgeSA9IGJbaV1cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgaWYgKHggPCB5KSByZXR1cm4gLTFcbiAgaWYgKHkgPCB4KSByZXR1cm4gMVxuICByZXR1cm4gMFxufVxuXG5CdWZmZXIuaXNFbmNvZGluZyA9IGZ1bmN0aW9uIGlzRW5jb2RpbmcgKGVuY29kaW5nKSB7XG4gIHN3aXRjaCAoU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgY2FzZSAnYXNjaWknOlxuICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5CdWZmZXIuY29uY2F0ID0gZnVuY3Rpb24gY29uY2F0IChsaXN0LCBsZW5ndGgpIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KGxpc3QpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0XCIgYXJndW1lbnQgbXVzdCBiZSBhbiBBcnJheSBvZiBCdWZmZXJzJylcbiAgfVxuXG4gIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBCdWZmZXIuYWxsb2MoMClcbiAgfVxuXG4gIGxldCBpXG4gIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGxlbmd0aCA9IDBcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7ICsraSkge1xuICAgICAgbGVuZ3RoICs9IGxpc3RbaV0ubGVuZ3RoXG4gICAgfVxuICB9XG5cbiAgY29uc3QgYnVmZmVyID0gQnVmZmVyLmFsbG9jVW5zYWZlKGxlbmd0aClcbiAgbGV0IHBvcyA9IDBcbiAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICBsZXQgYnVmID0gbGlzdFtpXVxuICAgIGlmIChpc0luc3RhbmNlKGJ1ZiwgVWludDhBcnJheSkpIHtcbiAgICAgIGlmIChwb3MgKyBidWYubGVuZ3RoID4gYnVmZmVyLmxlbmd0aCkge1xuICAgICAgICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSBidWYgPSBCdWZmZXIuZnJvbShidWYpXG4gICAgICAgIGJ1Zi5jb3B5KGJ1ZmZlciwgcG9zKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgVWludDhBcnJheS5wcm90b3R5cGUuc2V0LmNhbGwoXG4gICAgICAgICAgYnVmZmVyLFxuICAgICAgICAgIGJ1ZixcbiAgICAgICAgICBwb3NcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RcIiBhcmd1bWVudCBtdXN0IGJlIGFuIEFycmF5IG9mIEJ1ZmZlcnMnKVxuICAgIH0gZWxzZSB7XG4gICAgICBidWYuY29weShidWZmZXIsIHBvcylcbiAgICB9XG4gICAgcG9zICs9IGJ1Zi5sZW5ndGhcbiAgfVxuICByZXR1cm4gYnVmZmVyXG59XG5cbmZ1bmN0aW9uIGJ5dGVMZW5ndGggKHN0cmluZywgZW5jb2RpbmcpIHtcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihzdHJpbmcpKSB7XG4gICAgcmV0dXJuIHN0cmluZy5sZW5ndGhcbiAgfVxuICBpZiAoQXJyYXlCdWZmZXIuaXNWaWV3KHN0cmluZykgfHwgaXNJbnN0YW5jZShzdHJpbmcsIEFycmF5QnVmZmVyKSkge1xuICAgIHJldHVybiBzdHJpbmcuYnl0ZUxlbmd0aFxuICB9XG4gIGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAnVGhlIFwic3RyaW5nXCIgYXJndW1lbnQgbXVzdCBiZSBvbmUgb2YgdHlwZSBzdHJpbmcsIEJ1ZmZlciwgb3IgQXJyYXlCdWZmZXIuICcgK1xuICAgICAgJ1JlY2VpdmVkIHR5cGUgJyArIHR5cGVvZiBzdHJpbmdcbiAgICApXG4gIH1cblxuICBjb25zdCBsZW4gPSBzdHJpbmcubGVuZ3RoXG4gIGNvbnN0IG11c3RNYXRjaCA9IChhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gPT09IHRydWUpXG4gIGlmICghbXVzdE1hdGNoICYmIGxlbiA9PT0gMCkgcmV0dXJuIDBcblxuICAvLyBVc2UgYSBmb3IgbG9vcCB0byBhdm9pZCByZWN1cnNpb25cbiAgbGV0IGxvd2VyZWRDYXNlID0gZmFsc2VcbiAgZm9yICg7Oykge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGVuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuIHV0ZjhUb0J5dGVzKHN0cmluZykubGVuZ3RoXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gbGVuICogMlxuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGxlbiA+Pj4gMVxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgcmV0dXJuIGJhc2U2NFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGhcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkge1xuICAgICAgICAgIHJldHVybiBtdXN0TWF0Y2ggPyAtMSA6IHV0ZjhUb0J5dGVzKHN0cmluZykubGVuZ3RoIC8vIGFzc3VtZSB1dGY4XG4gICAgICAgIH1cbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cbkJ1ZmZlci5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuXG5mdW5jdGlvbiBzbG93VG9TdHJpbmcgKGVuY29kaW5nLCBzdGFydCwgZW5kKSB7XG4gIGxldCBsb3dlcmVkQ2FzZSA9IGZhbHNlXG5cbiAgLy8gTm8gbmVlZCB0byB2ZXJpZnkgdGhhdCBcInRoaXMubGVuZ3RoIDw9IE1BWF9VSU5UMzJcIiBzaW5jZSBpdCdzIGEgcmVhZC1vbmx5XG4gIC8vIHByb3BlcnR5IG9mIGEgdHlwZWQgYXJyYXkuXG5cbiAgLy8gVGhpcyBiZWhhdmVzIG5laXRoZXIgbGlrZSBTdHJpbmcgbm9yIFVpbnQ4QXJyYXkgaW4gdGhhdCB3ZSBzZXQgc3RhcnQvZW5kXG4gIC8vIHRvIHRoZWlyIHVwcGVyL2xvd2VyIGJvdW5kcyBpZiB0aGUgdmFsdWUgcGFzc2VkIGlzIG91dCBvZiByYW5nZS5cbiAgLy8gdW5kZWZpbmVkIGlzIGhhbmRsZWQgc3BlY2lhbGx5IGFzIHBlciBFQ01BLTI2MiA2dGggRWRpdGlvbixcbiAgLy8gU2VjdGlvbiAxMy4zLjMuNyBSdW50aW1lIFNlbWFudGljczogS2V5ZWRCaW5kaW5nSW5pdGlhbGl6YXRpb24uXG4gIGlmIChzdGFydCA9PT0gdW5kZWZpbmVkIHx8IHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ID0gMFxuICB9XG4gIC8vIFJldHVybiBlYXJseSBpZiBzdGFydCA+IHRoaXMubGVuZ3RoLiBEb25lIGhlcmUgdG8gcHJldmVudCBwb3RlbnRpYWwgdWludDMyXG4gIC8vIGNvZXJjaW9uIGZhaWwgYmVsb3cuXG4gIGlmIChzdGFydCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICBpZiAoZW5kID09PSB1bmRlZmluZWQgfHwgZW5kID4gdGhpcy5sZW5ndGgpIHtcbiAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICB9XG5cbiAgaWYgKGVuZCA8PSAwKSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICAvLyBGb3JjZSBjb2VyY2lvbiB0byB1aW50MzIuIFRoaXMgd2lsbCBhbHNvIGNvZXJjZSBmYWxzZXkvTmFOIHZhbHVlcyB0byAwLlxuICBlbmQgPj4+PSAwXG4gIHN0YXJ0ID4+Pj0gMFxuXG4gIGlmIChlbmQgPD0gc3RhcnQpIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIGlmICghZW5jb2RpbmcpIGVuY29kaW5nID0gJ3V0ZjgnXG5cbiAgd2hpbGUgKHRydWUpIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gaGV4U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICAgIHJldHVybiB1dGY4U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgICByZXR1cm4gYXNjaWlTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxhdGluMVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIHJldHVybiBiYXNlNjRTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gdXRmMTZsZVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgICAgICBlbmNvZGluZyA9IChlbmNvZGluZyArICcnKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuXG4vLyBUaGlzIHByb3BlcnR5IGlzIHVzZWQgYnkgYEJ1ZmZlci5pc0J1ZmZlcmAgKGFuZCB0aGUgYGlzLWJ1ZmZlcmAgbnBtIHBhY2thZ2UpXG4vLyB0byBkZXRlY3QgYSBCdWZmZXIgaW5zdGFuY2UuIEl0J3Mgbm90IHBvc3NpYmxlIHRvIHVzZSBgaW5zdGFuY2VvZiBCdWZmZXJgXG4vLyByZWxpYWJseSBpbiBhIGJyb3dzZXJpZnkgY29udGV4dCBiZWNhdXNlIHRoZXJlIGNvdWxkIGJlIG11bHRpcGxlIGRpZmZlcmVudFxuLy8gY29waWVzIG9mIHRoZSAnYnVmZmVyJyBwYWNrYWdlIGluIHVzZS4gVGhpcyBtZXRob2Qgd29ya3MgZXZlbiBmb3IgQnVmZmVyXG4vLyBpbnN0YW5jZXMgdGhhdCB3ZXJlIGNyZWF0ZWQgZnJvbSBhbm90aGVyIGNvcHkgb2YgdGhlIGBidWZmZXJgIHBhY2thZ2UuXG4vLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mZXJvc3MvYnVmZmVyL2lzc3Vlcy8xNTRcbkJ1ZmZlci5wcm90b3R5cGUuX2lzQnVmZmVyID0gdHJ1ZVxuXG5mdW5jdGlvbiBzd2FwIChiLCBuLCBtKSB7XG4gIGNvbnN0IGkgPSBiW25dXG4gIGJbbl0gPSBiW21dXG4gIGJbbV0gPSBpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDE2ID0gZnVuY3Rpb24gc3dhcDE2ICgpIHtcbiAgY29uc3QgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDIgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDE2LWJpdHMnKVxuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpICs9IDIpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyAxKVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDMyID0gZnVuY3Rpb24gc3dhcDMyICgpIHtcbiAgY29uc3QgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDQgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDMyLWJpdHMnKVxuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpICs9IDQpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyAzKVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyAyKVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDY0ID0gZnVuY3Rpb24gc3dhcDY0ICgpIHtcbiAgY29uc3QgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDggIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDY0LWJpdHMnKVxuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpICs9IDgpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyA3KVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyA2KVxuICAgIHN3YXAodGhpcywgaSArIDIsIGkgKyA1KVxuICAgIHN3YXAodGhpcywgaSArIDMsIGkgKyA0KVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyAoKSB7XG4gIGNvbnN0IGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW5ndGggPT09IDApIHJldHVybiAnJ1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHV0ZjhTbGljZSh0aGlzLCAwLCBsZW5ndGgpXG4gIHJldHVybiBzbG93VG9TdHJpbmcuYXBwbHkodGhpcywgYXJndW1lbnRzKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvTG9jYWxlU3RyaW5nID0gQnVmZmVyLnByb3RvdHlwZS50b1N0cmluZ1xuXG5CdWZmZXIucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIGVxdWFscyAoYikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlcicpXG4gIGlmICh0aGlzID09PSBiKSByZXR1cm4gdHJ1ZVxuICByZXR1cm4gQnVmZmVyLmNvbXBhcmUodGhpcywgYikgPT09IDBcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbnNwZWN0ID0gZnVuY3Rpb24gaW5zcGVjdCAoKSB7XG4gIGxldCBzdHIgPSAnJ1xuICBjb25zdCBtYXggPSBleHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTXG4gIHN0ciA9IHRoaXMudG9TdHJpbmcoJ2hleCcsIDAsIG1heCkucmVwbGFjZSgvKC57Mn0pL2csICckMSAnKS50cmltKClcbiAgaWYgKHRoaXMubGVuZ3RoID4gbWF4KSBzdHIgKz0gJyAuLi4gJ1xuICByZXR1cm4gJzxCdWZmZXIgJyArIHN0ciArICc+J1xufVxuaWYgKGN1c3RvbUluc3BlY3RTeW1ib2wpIHtcbiAgQnVmZmVyLnByb3RvdHlwZVtjdXN0b21JbnNwZWN0U3ltYm9sXSA9IEJ1ZmZlci5wcm90b3R5cGUuaW5zcGVjdFxufVxuXG5CdWZmZXIucHJvdG90eXBlLmNvbXBhcmUgPSBmdW5jdGlvbiBjb21wYXJlICh0YXJnZXQsIHN0YXJ0LCBlbmQsIHRoaXNTdGFydCwgdGhpc0VuZCkge1xuICBpZiAoaXNJbnN0YW5jZSh0YXJnZXQsIFVpbnQ4QXJyYXkpKSB7XG4gICAgdGFyZ2V0ID0gQnVmZmVyLmZyb20odGFyZ2V0LCB0YXJnZXQub2Zmc2V0LCB0YXJnZXQuYnl0ZUxlbmd0aClcbiAgfVxuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcih0YXJnZXQpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICdUaGUgXCJ0YXJnZXRcIiBhcmd1bWVudCBtdXN0IGJlIG9uZSBvZiB0eXBlIEJ1ZmZlciBvciBVaW50OEFycmF5LiAnICtcbiAgICAgICdSZWNlaXZlZCB0eXBlICcgKyAodHlwZW9mIHRhcmdldClcbiAgICApXG4gIH1cblxuICBpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCkge1xuICAgIHN0YXJ0ID0gMFxuICB9XG4gIGlmIChlbmQgPT09IHVuZGVmaW5lZCkge1xuICAgIGVuZCA9IHRhcmdldCA/IHRhcmdldC5sZW5ndGggOiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpc1N0YXJ0ID0gMFxuICB9XG4gIGlmICh0aGlzRW5kID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzRW5kID0gdGhpcy5sZW5ndGhcbiAgfVxuXG4gIGlmIChzdGFydCA8IDAgfHwgZW5kID4gdGFyZ2V0Lmxlbmd0aCB8fCB0aGlzU3RhcnQgPCAwIHx8IHRoaXNFbmQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdvdXQgb2YgcmFuZ2UgaW5kZXgnKVxuICB9XG5cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kICYmIHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kKSB7XG4gICAgcmV0dXJuIC0xXG4gIH1cbiAgaWYgKHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAxXG4gIH1cblxuICBzdGFydCA+Pj49IDBcbiAgZW5kID4+Pj0gMFxuICB0aGlzU3RhcnQgPj4+PSAwXG4gIHRoaXNFbmQgPj4+PSAwXG5cbiAgaWYgKHRoaXMgPT09IHRhcmdldCkgcmV0dXJuIDBcblxuICBsZXQgeCA9IHRoaXNFbmQgLSB0aGlzU3RhcnRcbiAgbGV0IHkgPSBlbmQgLSBzdGFydFxuICBjb25zdCBsZW4gPSBNYXRoLm1pbih4LCB5KVxuXG4gIGNvbnN0IHRoaXNDb3B5ID0gdGhpcy5zbGljZSh0aGlzU3RhcnQsIHRoaXNFbmQpXG4gIGNvbnN0IHRhcmdldENvcHkgPSB0YXJnZXQuc2xpY2Uoc3RhcnQsIGVuZClcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKHRoaXNDb3B5W2ldICE9PSB0YXJnZXRDb3B5W2ldKSB7XG4gICAgICB4ID0gdGhpc0NvcHlbaV1cbiAgICAgIHkgPSB0YXJnZXRDb3B5W2ldXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGlmICh4IDwgeSkgcmV0dXJuIC0xXG4gIGlmICh5IDwgeCkgcmV0dXJuIDFcbiAgcmV0dXJuIDBcbn1cblxuLy8gRmluZHMgZWl0aGVyIHRoZSBmaXJzdCBpbmRleCBvZiBgdmFsYCBpbiBgYnVmZmVyYCBhdCBvZmZzZXQgPj0gYGJ5dGVPZmZzZXRgLFxuLy8gT1IgdGhlIGxhc3QgaW5kZXggb2YgYHZhbGAgaW4gYGJ1ZmZlcmAgYXQgb2Zmc2V0IDw9IGBieXRlT2Zmc2V0YC5cbi8vXG4vLyBBcmd1bWVudHM6XG4vLyAtIGJ1ZmZlciAtIGEgQnVmZmVyIHRvIHNlYXJjaFxuLy8gLSB2YWwgLSBhIHN0cmluZywgQnVmZmVyLCBvciBudW1iZXJcbi8vIC0gYnl0ZU9mZnNldCAtIGFuIGluZGV4IGludG8gYGJ1ZmZlcmA7IHdpbGwgYmUgY2xhbXBlZCB0byBhbiBpbnQzMlxuLy8gLSBlbmNvZGluZyAtIGFuIG9wdGlvbmFsIGVuY29kaW5nLCByZWxldmFudCBpcyB2YWwgaXMgYSBzdHJpbmdcbi8vIC0gZGlyIC0gdHJ1ZSBmb3IgaW5kZXhPZiwgZmFsc2UgZm9yIGxhc3RJbmRleE9mXG5mdW5jdGlvbiBiaWRpcmVjdGlvbmFsSW5kZXhPZiAoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpIHtcbiAgLy8gRW1wdHkgYnVmZmVyIG1lYW5zIG5vIG1hdGNoXG4gIGlmIChidWZmZXIubGVuZ3RoID09PSAwKSByZXR1cm4gLTFcblxuICAvLyBOb3JtYWxpemUgYnl0ZU9mZnNldFxuICBpZiAodHlwZW9mIGJ5dGVPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgZW5jb2RpbmcgPSBieXRlT2Zmc2V0XG4gICAgYnl0ZU9mZnNldCA9IDBcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0ID4gMHg3ZmZmZmZmZikge1xuICAgIGJ5dGVPZmZzZXQgPSAweDdmZmZmZmZmXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA8IC0weDgwMDAwMDAwKSB7XG4gICAgYnl0ZU9mZnNldCA9IC0weDgwMDAwMDAwXG4gIH1cbiAgYnl0ZU9mZnNldCA9ICtieXRlT2Zmc2V0IC8vIENvZXJjZSB0byBOdW1iZXIuXG4gIGlmIChudW1iZXJJc05hTihieXRlT2Zmc2V0KSkge1xuICAgIC8vIGJ5dGVPZmZzZXQ6IGl0IGl0J3MgdW5kZWZpbmVkLCBudWxsLCBOYU4sIFwiZm9vXCIsIGV0Yywgc2VhcmNoIHdob2xlIGJ1ZmZlclxuICAgIGJ5dGVPZmZzZXQgPSBkaXIgPyAwIDogKGJ1ZmZlci5sZW5ndGggLSAxKVxuICB9XG5cbiAgLy8gTm9ybWFsaXplIGJ5dGVPZmZzZXQ6IG5lZ2F0aXZlIG9mZnNldHMgc3RhcnQgZnJvbSB0aGUgZW5kIG9mIHRoZSBidWZmZXJcbiAgaWYgKGJ5dGVPZmZzZXQgPCAwKSBieXRlT2Zmc2V0ID0gYnVmZmVyLmxlbmd0aCArIGJ5dGVPZmZzZXRcbiAgaWYgKGJ5dGVPZmZzZXQgPj0gYnVmZmVyLmxlbmd0aCkge1xuICAgIGlmIChkaXIpIHJldHVybiAtMVxuICAgIGVsc2UgYnl0ZU9mZnNldCA9IGJ1ZmZlci5sZW5ndGggLSAxXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA8IDApIHtcbiAgICBpZiAoZGlyKSBieXRlT2Zmc2V0ID0gMFxuICAgIGVsc2UgcmV0dXJuIC0xXG4gIH1cblxuICAvLyBOb3JtYWxpemUgdmFsXG4gIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgIHZhbCA9IEJ1ZmZlci5mcm9tKHZhbCwgZW5jb2RpbmcpXG4gIH1cblxuICAvLyBGaW5hbGx5LCBzZWFyY2ggZWl0aGVyIGluZGV4T2YgKGlmIGRpciBpcyB0cnVlKSBvciBsYXN0SW5kZXhPZlxuICBpZiAoQnVmZmVyLmlzQnVmZmVyKHZhbCkpIHtcbiAgICAvLyBTcGVjaWFsIGNhc2U6IGxvb2tpbmcgZm9yIGVtcHR5IHN0cmluZy9idWZmZXIgYWx3YXlzIGZhaWxzXG4gICAgaWYgKHZhbC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiAtMVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXlJbmRleE9mKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgdmFsID0gdmFsICYgMHhGRiAvLyBTZWFyY2ggZm9yIGEgYnl0ZSB2YWx1ZSBbMC0yNTVdXG4gICAgaWYgKHR5cGVvZiBVaW50OEFycmF5LnByb3RvdHlwZS5pbmRleE9mID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBpZiAoZGlyKSB7XG4gICAgICAgIHJldHVybiBVaW50OEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gVWludDhBcnJheS5wcm90b3R5cGUubGFzdEluZGV4T2YuY2FsbChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFycmF5SW5kZXhPZihidWZmZXIsIFt2YWxdLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKVxuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcigndmFsIG11c3QgYmUgc3RyaW5nLCBudW1iZXIgb3IgQnVmZmVyJylcbn1cblxuZnVuY3Rpb24gYXJyYXlJbmRleE9mIChhcnIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcikge1xuICBsZXQgaW5kZXhTaXplID0gMVxuICBsZXQgYXJyTGVuZ3RoID0gYXJyLmxlbmd0aFxuICBsZXQgdmFsTGVuZ3RoID0gdmFsLmxlbmd0aFxuXG4gIGlmIChlbmNvZGluZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZW5jb2RpbmcgPSBTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICBpZiAoZW5jb2RpbmcgPT09ICd1Y3MyJyB8fCBlbmNvZGluZyA9PT0gJ3Vjcy0yJyB8fFxuICAgICAgICBlbmNvZGluZyA9PT0gJ3V0ZjE2bGUnIHx8IGVuY29kaW5nID09PSAndXRmLTE2bGUnKSB7XG4gICAgICBpZiAoYXJyLmxlbmd0aCA8IDIgfHwgdmFsLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgcmV0dXJuIC0xXG4gICAgICB9XG4gICAgICBpbmRleFNpemUgPSAyXG4gICAgICBhcnJMZW5ndGggLz0gMlxuICAgICAgdmFsTGVuZ3RoIC89IDJcbiAgICAgIGJ5dGVPZmZzZXQgLz0gMlxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWQgKGJ1ZiwgaSkge1xuICAgIGlmIChpbmRleFNpemUgPT09IDEpIHtcbiAgICAgIHJldHVybiBidWZbaV1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGJ1Zi5yZWFkVUludDE2QkUoaSAqIGluZGV4U2l6ZSlcbiAgICB9XG4gIH1cblxuICBsZXQgaVxuICBpZiAoZGlyKSB7XG4gICAgbGV0IGZvdW5kSW5kZXggPSAtMVxuICAgIGZvciAoaSA9IGJ5dGVPZmZzZXQ7IGkgPCBhcnJMZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHJlYWQoYXJyLCBpKSA9PT0gcmVhZCh2YWwsIGZvdW5kSW5kZXggPT09IC0xID8gMCA6IGkgLSBmb3VuZEluZGV4KSkge1xuICAgICAgICBpZiAoZm91bmRJbmRleCA9PT0gLTEpIGZvdW5kSW5kZXggPSBpXG4gICAgICAgIGlmIChpIC0gZm91bmRJbmRleCArIDEgPT09IHZhbExlbmd0aCkgcmV0dXJuIGZvdW5kSW5kZXggKiBpbmRleFNpemVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChmb3VuZEluZGV4ICE9PSAtMSkgaSAtPSBpIC0gZm91bmRJbmRleFxuICAgICAgICBmb3VuZEluZGV4ID0gLTFcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGJ5dGVPZmZzZXQgKyB2YWxMZW5ndGggPiBhcnJMZW5ndGgpIGJ5dGVPZmZzZXQgPSBhcnJMZW5ndGggLSB2YWxMZW5ndGhcbiAgICBmb3IgKGkgPSBieXRlT2Zmc2V0OyBpID49IDA7IGktLSkge1xuICAgICAgbGV0IGZvdW5kID0gdHJ1ZVxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB2YWxMZW5ndGg7IGorKykge1xuICAgICAgICBpZiAocmVhZChhcnIsIGkgKyBqKSAhPT0gcmVhZCh2YWwsIGopKSB7XG4gICAgICAgICAgZm91bmQgPSBmYWxzZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gLTFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbmNsdWRlcyA9IGZ1bmN0aW9uIGluY2x1ZGVzICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiB0aGlzLmluZGV4T2YodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykgIT09IC0xXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uIGluZGV4T2YgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGJpZGlyZWN0aW9uYWxJbmRleE9mKHRoaXMsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIHRydWUpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUubGFzdEluZGV4T2YgPSBmdW5jdGlvbiBsYXN0SW5kZXhPZiAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gYmlkaXJlY3Rpb25hbEluZGV4T2YodGhpcywgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZmFsc2UpXG59XG5cbmZ1bmN0aW9uIGhleFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgb2Zmc2V0ID0gTnVtYmVyKG9mZnNldCkgfHwgMFxuICBjb25zdCByZW1haW5pbmcgPSBidWYubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gIH0gZWxzZSB7XG4gICAgbGVuZ3RoID0gTnVtYmVyKGxlbmd0aClcbiAgICBpZiAobGVuZ3RoID4gcmVtYWluaW5nKSB7XG4gICAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgICB9XG4gIH1cblxuICBjb25zdCBzdHJMZW4gPSBzdHJpbmcubGVuZ3RoXG5cbiAgaWYgKGxlbmd0aCA+IHN0ckxlbiAvIDIpIHtcbiAgICBsZW5ndGggPSBzdHJMZW4gLyAyXG4gIH1cbiAgbGV0IGlcbiAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgY29uc3QgcGFyc2VkID0gcGFyc2VJbnQoc3RyaW5nLnN1YnN0cihpICogMiwgMiksIDE2KVxuICAgIGlmIChudW1iZXJJc05hTihwYXJzZWQpKSByZXR1cm4gaVxuICAgIGJ1ZltvZmZzZXQgKyBpXSA9IHBhcnNlZFxuICB9XG4gIHJldHVybiBpXG59XG5cbmZ1bmN0aW9uIHV0ZjhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKHV0ZjhUb0J5dGVzKHN0cmluZywgYnVmLmxlbmd0aCAtIG9mZnNldCksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGFzY2lpV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcihhc2NpaVRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gYmFzZTY0V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcihiYXNlNjRUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIHVjczJXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKHV0ZjE2bGVUb0J5dGVzKHN0cmluZywgYnVmLmxlbmd0aCAtIG9mZnNldCksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiB3cml0ZSAoc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCwgZW5jb2RpbmcpIHtcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZylcbiAgaWYgKG9mZnNldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgICBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICAgIG9mZnNldCA9IDBcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZywgZW5jb2RpbmcpXG4gIH0gZWxzZSBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQgJiYgdHlwZW9mIG9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICBlbmNvZGluZyA9IG9mZnNldFxuICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gICAgb2Zmc2V0ID0gMFxuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nLCBvZmZzZXRbLCBsZW5ndGhdWywgZW5jb2RpbmddKVxuICB9IGVsc2UgaWYgKGlzRmluaXRlKG9mZnNldCkpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgICBpZiAoaXNGaW5pdGUobGVuZ3RoKSkge1xuICAgICAgbGVuZ3RoID0gbGVuZ3RoID4+PiAwXG4gICAgICBpZiAoZW5jb2RpbmcgPT09IHVuZGVmaW5lZCkgZW5jb2RpbmcgPSAndXRmOCdcbiAgICB9IGVsc2Uge1xuICAgICAgZW5jb2RpbmcgPSBsZW5ndGhcbiAgICAgIGxlbmd0aCA9IHVuZGVmaW5lZFxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnQnVmZmVyLndyaXRlKHN0cmluZywgZW5jb2RpbmcsIG9mZnNldFssIGxlbmd0aF0pIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQnXG4gICAgKVxuICB9XG5cbiAgY29uc3QgcmVtYWluaW5nID0gdGhpcy5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkIHx8IGxlbmd0aCA+IHJlbWFpbmluZykgbGVuZ3RoID0gcmVtYWluaW5nXG5cbiAgaWYgKChzdHJpbmcubGVuZ3RoID4gMCAmJiAobGVuZ3RoIDwgMCB8fCBvZmZzZXQgPCAwKSkgfHwgb2Zmc2V0ID4gdGhpcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQXR0ZW1wdCB0byB3cml0ZSBvdXRzaWRlIGJ1ZmZlciBib3VuZHMnKVxuICB9XG5cbiAgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSAndXRmOCdcblxuICBsZXQgbG93ZXJlZENhc2UgPSBmYWxzZVxuICBmb3IgKDs7KSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGhleFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgICByZXR1cm4gdXRmOFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gYXNjaWlXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICAvLyBXYXJuaW5nOiBtYXhMZW5ndGggbm90IHRha2VuIGludG8gYWNjb3VudCBpbiBiYXNlNjRXcml0ZVxuICAgICAgICByZXR1cm4gYmFzZTY0V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIHVjczJXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04gKCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdCdWZmZXInLFxuICAgIGRhdGE6IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuX2FyciB8fCB0aGlzLCAwKVxuICB9XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKHN0YXJ0ID09PSAwICYmIGVuZCA9PT0gYnVmLmxlbmd0aCkge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1Zi5zbGljZShzdGFydCwgZW5kKSlcbiAgfVxufVxuXG5mdW5jdGlvbiB1dGY4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG4gIGNvbnN0IHJlcyA9IFtdXG5cbiAgbGV0IGkgPSBzdGFydFxuICB3aGlsZSAoaSA8IGVuZCkge1xuICAgIGNvbnN0IGZpcnN0Qnl0ZSA9IGJ1ZltpXVxuICAgIGxldCBjb2RlUG9pbnQgPSBudWxsXG4gICAgbGV0IGJ5dGVzUGVyU2VxdWVuY2UgPSAoZmlyc3RCeXRlID4gMHhFRilcbiAgICAgID8gNFxuICAgICAgOiAoZmlyc3RCeXRlID4gMHhERilcbiAgICAgICAgICA/IDNcbiAgICAgICAgICA6IChmaXJzdEJ5dGUgPiAweEJGKVxuICAgICAgICAgICAgICA/IDJcbiAgICAgICAgICAgICAgOiAxXG5cbiAgICBpZiAoaSArIGJ5dGVzUGVyU2VxdWVuY2UgPD0gZW5kKSB7XG4gICAgICBsZXQgc2Vjb25kQnl0ZSwgdGhpcmRCeXRlLCBmb3VydGhCeXRlLCB0ZW1wQ29kZVBvaW50XG5cbiAgICAgIHN3aXRjaCAoYnl0ZXNQZXJTZXF1ZW5jZSkge1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgaWYgKGZpcnN0Qnl0ZSA8IDB4ODApIHtcbiAgICAgICAgICAgIGNvZGVQb2ludCA9IGZpcnN0Qnl0ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweDFGKSA8PCAweDYgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4N0YpIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICB0aGlyZEJ5dGUgPSBidWZbaSArIDJdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKHRoaXJkQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4RikgPDwgMHhDIHwgKHNlY29uZEJ5dGUgJiAweDNGKSA8PCAweDYgfCAodGhpcmRCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHg3RkYgJiYgKHRlbXBDb2RlUG9pbnQgPCAweEQ4MDAgfHwgdGVtcENvZGVQb2ludCA+IDB4REZGRikpIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICB0aGlyZEJ5dGUgPSBidWZbaSArIDJdXG4gICAgICAgICAgZm91cnRoQnl0ZSA9IGJ1ZltpICsgM11cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAodGhpcmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKGZvdXJ0aEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweEYpIDw8IDB4MTIgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpIDw8IDB4QyB8ICh0aGlyZEJ5dGUgJiAweDNGKSA8PCAweDYgfCAoZm91cnRoQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4RkZGRiAmJiB0ZW1wQ29kZVBvaW50IDwgMHgxMTAwMDApIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29kZVBvaW50ID09PSBudWxsKSB7XG4gICAgICAvLyB3ZSBkaWQgbm90IGdlbmVyYXRlIGEgdmFsaWQgY29kZVBvaW50IHNvIGluc2VydCBhXG4gICAgICAvLyByZXBsYWNlbWVudCBjaGFyIChVK0ZGRkQpIGFuZCBhZHZhbmNlIG9ubHkgMSBieXRlXG4gICAgICBjb2RlUG9pbnQgPSAweEZGRkRcbiAgICAgIGJ5dGVzUGVyU2VxdWVuY2UgPSAxXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPiAweEZGRkYpIHtcbiAgICAgIC8vIGVuY29kZSB0byB1dGYxNiAoc3Vycm9nYXRlIHBhaXIgZGFuY2UpXG4gICAgICBjb2RlUG9pbnQgLT0gMHgxMDAwMFxuICAgICAgcmVzLnB1c2goY29kZVBvaW50ID4+PiAxMCAmIDB4M0ZGIHwgMHhEODAwKVxuICAgICAgY29kZVBvaW50ID0gMHhEQzAwIHwgY29kZVBvaW50ICYgMHgzRkZcbiAgICB9XG5cbiAgICByZXMucHVzaChjb2RlUG9pbnQpXG4gICAgaSArPSBieXRlc1BlclNlcXVlbmNlXG4gIH1cblxuICByZXR1cm4gZGVjb2RlQ29kZVBvaW50c0FycmF5KHJlcylcbn1cblxuLy8gQmFzZWQgb24gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjI3NDcyNzIvNjgwNzQyLCB0aGUgYnJvd3NlciB3aXRoXG4vLyB0aGUgbG93ZXN0IGxpbWl0IGlzIENocm9tZSwgd2l0aCAweDEwMDAwIGFyZ3MuXG4vLyBXZSBnbyAxIG1hZ25pdHVkZSBsZXNzLCBmb3Igc2FmZXR5XG5jb25zdCBNQVhfQVJHVU1FTlRTX0xFTkdUSCA9IDB4MTAwMFxuXG5mdW5jdGlvbiBkZWNvZGVDb2RlUG9pbnRzQXJyYXkgKGNvZGVQb2ludHMpIHtcbiAgY29uc3QgbGVuID0gY29kZVBvaW50cy5sZW5ndGhcbiAgaWYgKGxlbiA8PSBNQVhfQVJHVU1FTlRTX0xFTkdUSCkge1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgY29kZVBvaW50cykgLy8gYXZvaWQgZXh0cmEgc2xpY2UoKVxuICB9XG5cbiAgLy8gRGVjb2RlIGluIGNodW5rcyB0byBhdm9pZCBcImNhbGwgc3RhY2sgc2l6ZSBleGNlZWRlZFwiLlxuICBsZXQgcmVzID0gJydcbiAgbGV0IGkgPSAwXG4gIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoXG4gICAgICBTdHJpbmcsXG4gICAgICBjb2RlUG9pbnRzLnNsaWNlKGksIGkgKz0gTUFYX0FSR1VNRU5UU19MRU5HVEgpXG4gICAgKVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuZnVuY3Rpb24gYXNjaWlTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGxldCByZXQgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0gJiAweDdGKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gbGF0aW4xU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBsZXQgcmV0ID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gaGV4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBjb25zdCBsZW4gPSBidWYubGVuZ3RoXG5cbiAgaWYgKCFzdGFydCB8fCBzdGFydCA8IDApIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCB8fCBlbmQgPCAwIHx8IGVuZCA+IGxlbikgZW5kID0gbGVuXG5cbiAgbGV0IG91dCA9ICcnXG4gIGZvciAobGV0IGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgb3V0ICs9IGhleFNsaWNlTG9va3VwVGFibGVbYnVmW2ldXVxuICB9XG4gIHJldHVybiBvdXRcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgY29uc3QgYnl0ZXMgPSBidWYuc2xpY2Uoc3RhcnQsIGVuZClcbiAgbGV0IHJlcyA9ICcnXG4gIC8vIElmIGJ5dGVzLmxlbmd0aCBpcyBvZGQsIHRoZSBsYXN0IDggYml0cyBtdXN0IGJlIGlnbm9yZWQgKHNhbWUgYXMgbm9kZS5qcylcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGggLSAxOyBpICs9IDIpIHtcbiAgICByZXMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShieXRlc1tpXSArIChieXRlc1tpICsgMV0gKiAyNTYpKVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zbGljZSA9IGZ1bmN0aW9uIHNsaWNlIChzdGFydCwgZW5kKSB7XG4gIGNvbnN0IGxlbiA9IHRoaXMubGVuZ3RoXG4gIHN0YXJ0ID0gfn5zdGFydFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IGxlbiA6IH5+ZW5kXG5cbiAgaWYgKHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ICs9IGxlblxuICAgIGlmIChzdGFydCA8IDApIHN0YXJ0ID0gMFxuICB9IGVsc2UgaWYgKHN0YXJ0ID4gbGVuKSB7XG4gICAgc3RhcnQgPSBsZW5cbiAgfVxuXG4gIGlmIChlbmQgPCAwKSB7XG4gICAgZW5kICs9IGxlblxuICAgIGlmIChlbmQgPCAwKSBlbmQgPSAwXG4gIH0gZWxzZSBpZiAoZW5kID4gbGVuKSB7XG4gICAgZW5kID0gbGVuXG4gIH1cblxuICBpZiAoZW5kIDwgc3RhcnQpIGVuZCA9IHN0YXJ0XG5cbiAgY29uc3QgbmV3QnVmID0gdGhpcy5zdWJhcnJheShzdGFydCwgZW5kKVxuICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZVxuICBPYmplY3Quc2V0UHJvdG90eXBlT2YobmV3QnVmLCBCdWZmZXIucHJvdG90eXBlKVxuXG4gIHJldHVybiBuZXdCdWZcbn1cblxuLypcbiAqIE5lZWQgdG8gbWFrZSBzdXJlIHRoYXQgYnVmZmVyIGlzbid0IHRyeWluZyB0byB3cml0ZSBvdXQgb2YgYm91bmRzLlxuICovXG5mdW5jdGlvbiBjaGVja09mZnNldCAob2Zmc2V0LCBleHQsIGxlbmd0aCkge1xuICBpZiAoKG9mZnNldCAlIDEpICE9PSAwIHx8IG9mZnNldCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdvZmZzZXQgaXMgbm90IHVpbnQnKVxuICBpZiAob2Zmc2V0ICsgZXh0ID4gbGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVHJ5aW5nIHRvIGFjY2VzcyBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVpbnRMRSA9XG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50TEUgPSBmdW5jdGlvbiByZWFkVUludExFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIGxldCB2YWwgPSB0aGlzW29mZnNldF1cbiAgbGV0IG11bCA9IDFcbiAgbGV0IGkgPSAwXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgaV0gKiBtdWxcbiAgfVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVWludEJFID1cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnRCRSA9IGZ1bmN0aW9uIHJlYWRVSW50QkUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuICB9XG5cbiAgbGV0IHZhbCA9IHRoaXNbb2Zmc2V0ICsgLS1ieXRlTGVuZ3RoXVxuICBsZXQgbXVsID0gMVxuICB3aGlsZSAoYnl0ZUxlbmd0aCA+IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyAtLWJ5dGVMZW5ndGhdICogbXVsXG4gIH1cblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVpbnQ4ID1cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQ4ID0gZnVuY3Rpb24gcmVhZFVJbnQ4IChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDEsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVpbnQxNkxFID1cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkxFID0gZnVuY3Rpb24gcmVhZFVJbnQxNkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdIHwgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVWludDE2QkUgPVxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2QkUgPSBmdW5jdGlvbiByZWFkVUludDE2QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDgpIHwgdGhpc1tvZmZzZXQgKyAxXVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVaW50MzJMRSA9XG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJMRSA9IGZ1bmN0aW9uIHJlYWRVSW50MzJMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKCh0aGlzW29mZnNldF0pIHxcbiAgICAgICh0aGlzW29mZnNldCArIDFdIDw8IDgpIHxcbiAgICAgICh0aGlzW29mZnNldCArIDJdIDw8IDE2KSkgK1xuICAgICAgKHRoaXNbb2Zmc2V0ICsgM10gKiAweDEwMDAwMDApXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVpbnQzMkJFID1cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkJFID0gZnVuY3Rpb24gcmVhZFVJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdICogMHgxMDAwMDAwKSArXG4gICAgKCh0aGlzW29mZnNldCArIDFdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgOCkgfFxuICAgIHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEJpZ1VJbnQ2NExFID0gZGVmaW5lQmlnSW50TWV0aG9kKGZ1bmN0aW9uIHJlYWRCaWdVSW50NjRMRSAob2Zmc2V0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICB2YWxpZGF0ZU51bWJlcihvZmZzZXQsICdvZmZzZXQnKVxuICBjb25zdCBmaXJzdCA9IHRoaXNbb2Zmc2V0XVxuICBjb25zdCBsYXN0ID0gdGhpc1tvZmZzZXQgKyA3XVxuICBpZiAoZmlyc3QgPT09IHVuZGVmaW5lZCB8fCBsYXN0ID09PSB1bmRlZmluZWQpIHtcbiAgICBib3VuZHNFcnJvcihvZmZzZXQsIHRoaXMubGVuZ3RoIC0gOClcbiAgfVxuXG4gIGNvbnN0IGxvID0gZmlyc3QgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiA4ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMTYgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiAyNFxuXG4gIGNvbnN0IGhpID0gdGhpc1srK29mZnNldF0gK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiA4ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMTYgK1xuICAgIGxhc3QgKiAyICoqIDI0XG5cbiAgcmV0dXJuIEJpZ0ludChsbykgKyAoQmlnSW50KGhpKSA8PCBCaWdJbnQoMzIpKVxufSlcblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkQmlnVUludDY0QkUgPSBkZWZpbmVCaWdJbnRNZXRob2QoZnVuY3Rpb24gcmVhZEJpZ1VJbnQ2NEJFIChvZmZzZXQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIHZhbGlkYXRlTnVtYmVyKG9mZnNldCwgJ29mZnNldCcpXG4gIGNvbnN0IGZpcnN0ID0gdGhpc1tvZmZzZXRdXG4gIGNvbnN0IGxhc3QgPSB0aGlzW29mZnNldCArIDddXG4gIGlmIChmaXJzdCA9PT0gdW5kZWZpbmVkIHx8IGxhc3QgPT09IHVuZGVmaW5lZCkge1xuICAgIGJvdW5kc0Vycm9yKG9mZnNldCwgdGhpcy5sZW5ndGggLSA4KVxuICB9XG5cbiAgY29uc3QgaGkgPSBmaXJzdCAqIDIgKiogMjQgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiAxNiArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDggK1xuICAgIHRoaXNbKytvZmZzZXRdXG5cbiAgY29uc3QgbG8gPSB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMjQgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiAxNiArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDggK1xuICAgIGxhc3RcblxuICByZXR1cm4gKEJpZ0ludChoaSkgPDwgQmlnSW50KDMyKSkgKyBCaWdJbnQobG8pXG59KVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnRMRSA9IGZ1bmN0aW9uIHJlYWRJbnRMRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICBsZXQgdmFsID0gdGhpc1tvZmZzZXRdXG4gIGxldCBtdWwgPSAxXG4gIGxldCBpID0gMFxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIGldICogbXVsXG4gIH1cbiAgbXVsICo9IDB4ODBcblxuICBpZiAodmFsID49IG11bCkgdmFsIC09IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50QkUgPSBmdW5jdGlvbiByZWFkSW50QkUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgbGV0IGkgPSBieXRlTGVuZ3RoXG4gIGxldCBtdWwgPSAxXG4gIGxldCB2YWwgPSB0aGlzW29mZnNldCArIC0taV1cbiAgd2hpbGUgKGkgPiAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgLS1pXSAqIG11bFxuICB9XG4gIG11bCAqPSAweDgwXG5cbiAgaWYgKHZhbCA+PSBtdWwpIHZhbCAtPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aClcblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDggPSBmdW5jdGlvbiByZWFkSW50OCAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAxLCB0aGlzLmxlbmd0aClcbiAgaWYgKCEodGhpc1tvZmZzZXRdICYgMHg4MCkpIHJldHVybiAodGhpc1tvZmZzZXRdKVxuICByZXR1cm4gKCgweGZmIC0gdGhpc1tvZmZzZXRdICsgMSkgKiAtMSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZMRSA9IGZ1bmN0aW9uIHJlYWRJbnQxNkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICBjb25zdCB2YWwgPSB0aGlzW29mZnNldF0gfCAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KVxuICByZXR1cm4gKHZhbCAmIDB4ODAwMCkgPyB2YWwgfCAweEZGRkYwMDAwIDogdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2QkUgPSBmdW5jdGlvbiByZWFkSW50MTZCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgY29uc3QgdmFsID0gdGhpc1tvZmZzZXQgKyAxXSB8ICh0aGlzW29mZnNldF0gPDwgOClcbiAgcmV0dXJuICh2YWwgJiAweDgwMDApID8gdmFsIHwgMHhGRkZGMDAwMCA6IHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkxFID0gZnVuY3Rpb24gcmVhZEludDMyTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0pIHxcbiAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAzXSA8PCAyNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJCRSA9IGZ1bmN0aW9uIHJlYWRJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDI0KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEJpZ0ludDY0TEUgPSBkZWZpbmVCaWdJbnRNZXRob2QoZnVuY3Rpb24gcmVhZEJpZ0ludDY0TEUgKG9mZnNldCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgdmFsaWRhdGVOdW1iZXIob2Zmc2V0LCAnb2Zmc2V0JylcbiAgY29uc3QgZmlyc3QgPSB0aGlzW29mZnNldF1cbiAgY29uc3QgbGFzdCA9IHRoaXNbb2Zmc2V0ICsgN11cbiAgaWYgKGZpcnN0ID09PSB1bmRlZmluZWQgfHwgbGFzdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYm91bmRzRXJyb3Iob2Zmc2V0LCB0aGlzLmxlbmd0aCAtIDgpXG4gIH1cblxuICBjb25zdCB2YWwgPSB0aGlzW29mZnNldCArIDRdICtcbiAgICB0aGlzW29mZnNldCArIDVdICogMiAqKiA4ICtcbiAgICB0aGlzW29mZnNldCArIDZdICogMiAqKiAxNiArXG4gICAgKGxhc3QgPDwgMjQpIC8vIE92ZXJmbG93XG5cbiAgcmV0dXJuIChCaWdJbnQodmFsKSA8PCBCaWdJbnQoMzIpKSArXG4gICAgQmlnSW50KGZpcnN0ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogOCArXG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDE2ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMjQpXG59KVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRCaWdJbnQ2NEJFID0gZGVmaW5lQmlnSW50TWV0aG9kKGZ1bmN0aW9uIHJlYWRCaWdJbnQ2NEJFIChvZmZzZXQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIHZhbGlkYXRlTnVtYmVyKG9mZnNldCwgJ29mZnNldCcpXG4gIGNvbnN0IGZpcnN0ID0gdGhpc1tvZmZzZXRdXG4gIGNvbnN0IGxhc3QgPSB0aGlzW29mZnNldCArIDddXG4gIGlmIChmaXJzdCA9PT0gdW5kZWZpbmVkIHx8IGxhc3QgPT09IHVuZGVmaW5lZCkge1xuICAgIGJvdW5kc0Vycm9yKG9mZnNldCwgdGhpcy5sZW5ndGggLSA4KVxuICB9XG5cbiAgY29uc3QgdmFsID0gKGZpcnN0IDw8IDI0KSArIC8vIE92ZXJmbG93XG4gICAgdGhpc1srK29mZnNldF0gKiAyICoqIDE2ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogOCArXG4gICAgdGhpc1srK29mZnNldF1cblxuICByZXR1cm4gKEJpZ0ludCh2YWwpIDw8IEJpZ0ludCgzMikpICtcbiAgICBCaWdJbnQodGhpc1srK29mZnNldF0gKiAyICoqIDI0ICtcbiAgICB0aGlzWysrb2Zmc2V0XSAqIDIgKiogMTYgK1xuICAgIHRoaXNbKytvZmZzZXRdICogMiAqKiA4ICtcbiAgICBsYXN0KVxufSlcblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRMRSA9IGZ1bmN0aW9uIHJlYWRGbG9hdExFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgdHJ1ZSwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0QkUgPSBmdW5jdGlvbiByZWFkRmxvYXRCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIGZhbHNlLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlTEUgPSBmdW5jdGlvbiByZWFkRG91YmxlTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgOCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCB0cnVlLCA1MiwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlQkUgPSBmdW5jdGlvbiByZWFkRG91YmxlQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgOCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCBmYWxzZSwgNTIsIDgpXG59XG5cbmZ1bmN0aW9uIGNoZWNrSW50IChidWYsIHZhbHVlLCBvZmZzZXQsIGV4dCwgbWF4LCBtaW4pIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYnVmKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJidWZmZXJcIiBhcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyIGluc3RhbmNlJylcbiAgaWYgKHZhbHVlID4gbWF4IHx8IHZhbHVlIDwgbWluKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXCJ2YWx1ZVwiIGFyZ3VtZW50IGlzIG91dCBvZiBib3VuZHMnKVxuICBpZiAob2Zmc2V0ICsgZXh0ID4gYnVmLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVaW50TEUgPVxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnRMRSA9IGZ1bmN0aW9uIHdyaXRlVUludExFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNvbnN0IG1heEJ5dGVzID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpIC0gMVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG1heEJ5dGVzLCAwKVxuICB9XG5cbiAgbGV0IG11bCA9IDFcbiAgbGV0IGkgPSAwXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAodmFsdWUgLyBtdWwpICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVpbnRCRSA9XG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludEJFID0gZnVuY3Rpb24gd3JpdGVVSW50QkUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY29uc3QgbWF4Qnl0ZXMgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCkgLSAxXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbWF4Qnl0ZXMsIDApXG4gIH1cblxuICBsZXQgaSA9IGJ5dGVMZW5ndGggLSAxXG4gIGxldCBtdWwgPSAxXG4gIHRoaXNbb2Zmc2V0ICsgaV0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKC0taSA+PSAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICh2YWx1ZSAvIG11bCkgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVWludDggPVxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQ4ID0gZnVuY3Rpb24gd3JpdGVVSW50OCAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDEsIDB4ZmYsIDApXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyAxXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVaW50MTZMRSA9XG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2TEUgPSBmdW5jdGlvbiB3cml0ZVVJbnQxNkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHhmZmZmLCAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVWludDE2QkUgPVxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkJFID0gZnVuY3Rpb24gd3JpdGVVSW50MTZCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4ZmZmZiwgMClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiA4KVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVpbnQzMkxFID1cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJMRSA9IGZ1bmN0aW9uIHdyaXRlVUludDMyTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweGZmZmZmZmZmLCAwKVxuICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlID4+PiAyNClcbiAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVaW50MzJCRSA9XG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyQkUgPSBmdW5jdGlvbiB3cml0ZVVJbnQzMkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHhmZmZmZmZmZiwgMClcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiAyNClcbiAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDgpXG4gIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5mdW5jdGlvbiB3cnRCaWdVSW50NjRMRSAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBtaW4sIG1heCkge1xuICBjaGVja0ludEJJKHZhbHVlLCBtaW4sIG1heCwgYnVmLCBvZmZzZXQsIDcpXG5cbiAgbGV0IGxvID0gTnVtYmVyKHZhbHVlICYgQmlnSW50KDB4ZmZmZmZmZmYpKVxuICBidWZbb2Zmc2V0KytdID0gbG9cbiAgbG8gPSBsbyA+PiA4XG4gIGJ1ZltvZmZzZXQrK10gPSBsb1xuICBsbyA9IGxvID4+IDhcbiAgYnVmW29mZnNldCsrXSA9IGxvXG4gIGxvID0gbG8gPj4gOFxuICBidWZbb2Zmc2V0KytdID0gbG9cbiAgbGV0IGhpID0gTnVtYmVyKHZhbHVlID4+IEJpZ0ludCgzMikgJiBCaWdJbnQoMHhmZmZmZmZmZikpXG4gIGJ1ZltvZmZzZXQrK10gPSBoaVxuICBoaSA9IGhpID4+IDhcbiAgYnVmW29mZnNldCsrXSA9IGhpXG4gIGhpID0gaGkgPj4gOFxuICBidWZbb2Zmc2V0KytdID0gaGlcbiAgaGkgPSBoaSA+PiA4XG4gIGJ1ZltvZmZzZXQrK10gPSBoaVxuICByZXR1cm4gb2Zmc2V0XG59XG5cbmZ1bmN0aW9uIHdydEJpZ1VJbnQ2NEJFIChidWYsIHZhbHVlLCBvZmZzZXQsIG1pbiwgbWF4KSB7XG4gIGNoZWNrSW50QkkodmFsdWUsIG1pbiwgbWF4LCBidWYsIG9mZnNldCwgNylcblxuICBsZXQgbG8gPSBOdW1iZXIodmFsdWUgJiBCaWdJbnQoMHhmZmZmZmZmZikpXG4gIGJ1ZltvZmZzZXQgKyA3XSA9IGxvXG4gIGxvID0gbG8gPj4gOFxuICBidWZbb2Zmc2V0ICsgNl0gPSBsb1xuICBsbyA9IGxvID4+IDhcbiAgYnVmW29mZnNldCArIDVdID0gbG9cbiAgbG8gPSBsbyA+PiA4XG4gIGJ1ZltvZmZzZXQgKyA0XSA9IGxvXG4gIGxldCBoaSA9IE51bWJlcih2YWx1ZSA+PiBCaWdJbnQoMzIpICYgQmlnSW50KDB4ZmZmZmZmZmYpKVxuICBidWZbb2Zmc2V0ICsgM10gPSBoaVxuICBoaSA9IGhpID4+IDhcbiAgYnVmW29mZnNldCArIDJdID0gaGlcbiAgaGkgPSBoaSA+PiA4XG4gIGJ1ZltvZmZzZXQgKyAxXSA9IGhpXG4gIGhpID0gaGkgPj4gOFxuICBidWZbb2Zmc2V0XSA9IGhpXG4gIHJldHVybiBvZmZzZXQgKyA4XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVCaWdVSW50NjRMRSA9IGRlZmluZUJpZ0ludE1ldGhvZChmdW5jdGlvbiB3cml0ZUJpZ1VJbnQ2NExFICh2YWx1ZSwgb2Zmc2V0ID0gMCkge1xuICByZXR1cm4gd3J0QmlnVUludDY0TEUodGhpcywgdmFsdWUsIG9mZnNldCwgQmlnSW50KDApLCBCaWdJbnQoJzB4ZmZmZmZmZmZmZmZmZmZmZicpKVxufSlcblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUJpZ1VJbnQ2NEJFID0gZGVmaW5lQmlnSW50TWV0aG9kKGZ1bmN0aW9uIHdyaXRlQmlnVUludDY0QkUgKHZhbHVlLCBvZmZzZXQgPSAwKSB7XG4gIHJldHVybiB3cnRCaWdVSW50NjRCRSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBCaWdJbnQoMCksIEJpZ0ludCgnMHhmZmZmZmZmZmZmZmZmZmZmJykpXG59KVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50TEUgPSBmdW5jdGlvbiB3cml0ZUludExFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNvbnN0IGxpbWl0ID0gTWF0aC5wb3coMiwgKDggKiBieXRlTGVuZ3RoKSAtIDEpXG5cbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBsaW1pdCAtIDEsIC1saW1pdClcbiAgfVxuXG4gIGxldCBpID0gMFxuICBsZXQgbXVsID0gMVxuICBsZXQgc3ViID0gMFxuICB0aGlzW29mZnNldF0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICBpZiAodmFsdWUgPCAwICYmIHN1YiA9PT0gMCAmJiB0aGlzW29mZnNldCArIGkgLSAxXSAhPT0gMCkge1xuICAgICAgc3ViID0gMVxuICAgIH1cbiAgICB0aGlzW29mZnNldCArIGldID0gKCh2YWx1ZSAvIG11bCkgPj4gMCkgLSBzdWIgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50QkUgPSBmdW5jdGlvbiB3cml0ZUludEJFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNvbnN0IGxpbWl0ID0gTWF0aC5wb3coMiwgKDggKiBieXRlTGVuZ3RoKSAtIDEpXG5cbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBsaW1pdCAtIDEsIC1saW1pdClcbiAgfVxuXG4gIGxldCBpID0gYnl0ZUxlbmd0aCAtIDFcbiAgbGV0IG11bCA9IDFcbiAgbGV0IHN1YiA9IDBcbiAgdGhpc1tvZmZzZXQgKyBpXSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoLS1pID49IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICBpZiAodmFsdWUgPCAwICYmIHN1YiA9PT0gMCAmJiB0aGlzW29mZnNldCArIGkgKyAxXSAhPT0gMCkge1xuICAgICAgc3ViID0gMVxuICAgIH1cbiAgICB0aGlzW29mZnNldCArIGldID0gKCh2YWx1ZSAvIG11bCkgPj4gMCkgLSBzdWIgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50OCA9IGZ1bmN0aW9uIHdyaXRlSW50OCAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDEsIDB4N2YsIC0weDgwKVxuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmYgKyB2YWx1ZSArIDFcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2TEUgPSBmdW5jdGlvbiB3cml0ZUludDE2TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweDdmZmYsIC0weDgwMDApXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkJFID0gZnVuY3Rpb24gd3JpdGVJbnQxNkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHg3ZmZmLCAtMHg4MDAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDgpXG4gIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJMRSA9IGZ1bmN0aW9uIHdyaXRlSW50MzJMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0ID4+PiAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiAxNilcbiAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSA+Pj4gMjQpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkJFID0gZnVuY3Rpb24gd3JpdGVJbnQzMkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmZmZmZiArIHZhbHVlICsgMVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDI0KVxuICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiAxNilcbiAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gOClcbiAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVCaWdJbnQ2NExFID0gZGVmaW5lQmlnSW50TWV0aG9kKGZ1bmN0aW9uIHdyaXRlQmlnSW50NjRMRSAodmFsdWUsIG9mZnNldCA9IDApIHtcbiAgcmV0dXJuIHdydEJpZ1VJbnQ2NExFKHRoaXMsIHZhbHVlLCBvZmZzZXQsIC1CaWdJbnQoJzB4ODAwMDAwMDAwMDAwMDAwMCcpLCBCaWdJbnQoJzB4N2ZmZmZmZmZmZmZmZmZmZicpKVxufSlcblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUJpZ0ludDY0QkUgPSBkZWZpbmVCaWdJbnRNZXRob2QoZnVuY3Rpb24gd3JpdGVCaWdJbnQ2NEJFICh2YWx1ZSwgb2Zmc2V0ID0gMCkge1xuICByZXR1cm4gd3J0QmlnVUludDY0QkUodGhpcywgdmFsdWUsIG9mZnNldCwgLUJpZ0ludCgnMHg4MDAwMDAwMDAwMDAwMDAwJyksIEJpZ0ludCgnMHg3ZmZmZmZmZmZmZmZmZmZmJykpXG59KVxuXG5mdW5jdGlvbiBjaGVja0lFRUU3NTQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgZXh0LCBtYXgsIG1pbikge1xuICBpZiAob2Zmc2V0ICsgZXh0ID4gYnVmLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG4gIGlmIChvZmZzZXQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbn1cblxuZnVuY3Rpb24gd3JpdGVGbG9hdCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCA+Pj4gMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tJRUVFNzU0KGJ1ZiwgdmFsdWUsIG9mZnNldCwgNCwgMy40MDI4MjM0NjYzODUyODg2ZSszOCwgLTMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgpXG4gIH1cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgMjMsIDQpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdExFID0gZnVuY3Rpb24gd3JpdGVGbG9hdExFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0QkUgPSBmdW5jdGlvbiB3cml0ZUZsb2F0QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gd3JpdGVEb3VibGUgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgPj4+IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrSUVFRTc1NChidWYsIHZhbHVlLCBvZmZzZXQsIDgsIDEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4LCAtMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgpXG4gIH1cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgNTIsIDgpXG4gIHJldHVybiBvZmZzZXQgKyA4XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVMRSA9IGZ1bmN0aW9uIHdyaXRlRG91YmxlTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUJFID0gZnVuY3Rpb24gd3JpdGVEb3VibGVCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuLy8gY29weSh0YXJnZXRCdWZmZXIsIHRhcmdldFN0YXJ0PTAsIHNvdXJjZVN0YXJ0PTAsIHNvdXJjZUVuZD1idWZmZXIubGVuZ3RoKVxuQnVmZmVyLnByb3RvdHlwZS5jb3B5ID0gZnVuY3Rpb24gY29weSAodGFyZ2V0LCB0YXJnZXRTdGFydCwgc3RhcnQsIGVuZCkge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcih0YXJnZXQpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdhcmd1bWVudCBzaG91bGQgYmUgYSBCdWZmZXInKVxuICBpZiAoIXN0YXJ0KSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgJiYgZW5kICE9PSAwKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0U3RhcnQgPj0gdGFyZ2V0Lmxlbmd0aCkgdGFyZ2V0U3RhcnQgPSB0YXJnZXQubGVuZ3RoXG4gIGlmICghdGFyZ2V0U3RhcnQpIHRhcmdldFN0YXJ0ID0gMFxuICBpZiAoZW5kID4gMCAmJiBlbmQgPCBzdGFydCkgZW5kID0gc3RhcnRcblxuICAvLyBDb3B5IDAgYnl0ZXM7IHdlJ3JlIGRvbmVcbiAgaWYgKGVuZCA9PT0gc3RhcnQpIHJldHVybiAwXG4gIGlmICh0YXJnZXQubGVuZ3RoID09PSAwIHx8IHRoaXMubGVuZ3RoID09PSAwKSByZXR1cm4gMFxuXG4gIC8vIEZhdGFsIGVycm9yIGNvbmRpdGlvbnNcbiAgaWYgKHRhcmdldFN0YXJ0IDwgMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCd0YXJnZXRTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgfVxuICBpZiAoc3RhcnQgPCAwIHx8IHN0YXJ0ID49IHRoaXMubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbiAgaWYgKGVuZCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdzb3VyY2VFbmQgb3V0IG9mIGJvdW5kcycpXG5cbiAgLy8gQXJlIHdlIG9vYj9cbiAgaWYgKGVuZCA+IHRoaXMubGVuZ3RoKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0Lmxlbmd0aCAtIHRhcmdldFN0YXJ0IDwgZW5kIC0gc3RhcnQpIHtcbiAgICBlbmQgPSB0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0U3RhcnQgKyBzdGFydFxuICB9XG5cbiAgY29uc3QgbGVuID0gZW5kIC0gc3RhcnRcblxuICBpZiAodGhpcyA9PT0gdGFyZ2V0ICYmIHR5cGVvZiBVaW50OEFycmF5LnByb3RvdHlwZS5jb3B5V2l0aGluID09PSAnZnVuY3Rpb24nKSB7XG4gICAgLy8gVXNlIGJ1aWx0LWluIHdoZW4gYXZhaWxhYmxlLCBtaXNzaW5nIGZyb20gSUUxMVxuICAgIHRoaXMuY29weVdpdGhpbih0YXJnZXRTdGFydCwgc3RhcnQsIGVuZClcbiAgfSBlbHNlIHtcbiAgICBVaW50OEFycmF5LnByb3RvdHlwZS5zZXQuY2FsbChcbiAgICAgIHRhcmdldCxcbiAgICAgIHRoaXMuc3ViYXJyYXkoc3RhcnQsIGVuZCksXG4gICAgICB0YXJnZXRTdGFydFxuICAgIClcbiAgfVxuXG4gIHJldHVybiBsZW5cbn1cblxuLy8gVXNhZ2U6XG4vLyAgICBidWZmZXIuZmlsbChudW1iZXJbLCBvZmZzZXRbLCBlbmRdXSlcbi8vICAgIGJ1ZmZlci5maWxsKGJ1ZmZlclssIG9mZnNldFssIGVuZF1dKVxuLy8gICAgYnVmZmVyLmZpbGwoc3RyaW5nWywgb2Zmc2V0WywgZW5kXV1bLCBlbmNvZGluZ10pXG5CdWZmZXIucHJvdG90eXBlLmZpbGwgPSBmdW5jdGlvbiBmaWxsICh2YWwsIHN0YXJ0LCBlbmQsIGVuY29kaW5nKSB7XG4gIC8vIEhhbmRsZSBzdHJpbmcgY2FzZXM6XG4gIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgIGlmICh0eXBlb2Ygc3RhcnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbmNvZGluZyA9IHN0YXJ0XG4gICAgICBzdGFydCA9IDBcbiAgICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZW5kID09PSAnc3RyaW5nJykge1xuICAgICAgZW5jb2RpbmcgPSBlbmRcbiAgICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gICAgfVxuICAgIGlmIChlbmNvZGluZyAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBlbmNvZGluZyAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2VuY29kaW5nIG11c3QgYmUgYSBzdHJpbmcnKVxuICAgIH1cbiAgICBpZiAodHlwZW9mIGVuY29kaW5nID09PSAnc3RyaW5nJyAmJiAhQnVmZmVyLmlzRW5jb2RpbmcoZW5jb2RpbmcpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgfVxuICAgIGlmICh2YWwubGVuZ3RoID09PSAxKSB7XG4gICAgICBjb25zdCBjb2RlID0gdmFsLmNoYXJDb2RlQXQoMClcbiAgICAgIGlmICgoZW5jb2RpbmcgPT09ICd1dGY4JyAmJiBjb2RlIDwgMTI4KSB8fFxuICAgICAgICAgIGVuY29kaW5nID09PSAnbGF0aW4xJykge1xuICAgICAgICAvLyBGYXN0IHBhdGg6IElmIGB2YWxgIGZpdHMgaW50byBhIHNpbmdsZSBieXRlLCB1c2UgdGhhdCBudW1lcmljIHZhbHVlLlxuICAgICAgICB2YWwgPSBjb2RlXG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgdmFsID0gdmFsICYgMjU1XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgdmFsID0gTnVtYmVyKHZhbClcbiAgfVxuXG4gIC8vIEludmFsaWQgcmFuZ2VzIGFyZSBub3Qgc2V0IHRvIGEgZGVmYXVsdCwgc28gY2FuIHJhbmdlIGNoZWNrIGVhcmx5LlxuICBpZiAoc3RhcnQgPCAwIHx8IHRoaXMubGVuZ3RoIDwgc3RhcnQgfHwgdGhpcy5sZW5ndGggPCBlbmQpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignT3V0IG9mIHJhbmdlIGluZGV4JylcbiAgfVxuXG4gIGlmIChlbmQgPD0gc3RhcnQpIHtcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgc3RhcnQgPSBzdGFydCA+Pj4gMFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IHRoaXMubGVuZ3RoIDogZW5kID4+PiAwXG5cbiAgaWYgKCF2YWwpIHZhbCA9IDBcblxuICBsZXQgaVxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgICB0aGlzW2ldID0gdmFsXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNvbnN0IGJ5dGVzID0gQnVmZmVyLmlzQnVmZmVyKHZhbClcbiAgICAgID8gdmFsXG4gICAgICA6IEJ1ZmZlci5mcm9tKHZhbCwgZW5jb2RpbmcpXG4gICAgY29uc3QgbGVuID0gYnl0ZXMubGVuZ3RoXG4gICAgaWYgKGxlbiA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIHZhbHVlIFwiJyArIHZhbCArXG4gICAgICAgICdcIiBpcyBpbnZhbGlkIGZvciBhcmd1bWVudCBcInZhbHVlXCInKVxuICAgIH1cbiAgICBmb3IgKGkgPSAwOyBpIDwgZW5kIC0gc3RhcnQ7ICsraSkge1xuICAgICAgdGhpc1tpICsgc3RhcnRdID0gYnl0ZXNbaSAlIGxlbl1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpc1xufVxuXG4vLyBDVVNUT00gRVJST1JTXG4vLyA9PT09PT09PT09PT09XG5cbi8vIFNpbXBsaWZpZWQgdmVyc2lvbnMgZnJvbSBOb2RlLCBjaGFuZ2VkIGZvciBCdWZmZXItb25seSB1c2FnZVxuY29uc3QgZXJyb3JzID0ge31cbmZ1bmN0aW9uIEUgKHN5bSwgZ2V0TWVzc2FnZSwgQmFzZSkge1xuICBlcnJvcnNbc3ltXSA9IGNsYXNzIE5vZGVFcnJvciBleHRlbmRzIEJhc2Uge1xuICAgIGNvbnN0cnVjdG9yICgpIHtcbiAgICAgIHN1cGVyKClcblxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdtZXNzYWdlJywge1xuICAgICAgICB2YWx1ZTogZ2V0TWVzc2FnZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICB9KVxuXG4gICAgICAvLyBBZGQgdGhlIGVycm9yIGNvZGUgdG8gdGhlIG5hbWUgdG8gaW5jbHVkZSBpdCBpbiB0aGUgc3RhY2sgdHJhY2UuXG4gICAgICB0aGlzLm5hbWUgPSBgJHt0aGlzLm5hbWV9IFske3N5bX1dYFxuICAgICAgLy8gQWNjZXNzIHRoZSBzdGFjayB0byBnZW5lcmF0ZSB0aGUgZXJyb3IgbWVzc2FnZSBpbmNsdWRpbmcgdGhlIGVycm9yIGNvZGVcbiAgICAgIC8vIGZyb20gdGhlIG5hbWUuXG4gICAgICB0aGlzLnN0YWNrIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLWV4cHJlc3Npb25zXG4gICAgICAvLyBSZXNldCB0aGUgbmFtZSB0byB0aGUgYWN0dWFsIG5hbWUuXG4gICAgICBkZWxldGUgdGhpcy5uYW1lXG4gICAgfVxuXG4gICAgZ2V0IGNvZGUgKCkge1xuICAgICAgcmV0dXJuIHN5bVxuICAgIH1cblxuICAgIHNldCBjb2RlICh2YWx1ZSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdjb2RlJywge1xuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgICAgfSlcbiAgICB9XG5cbiAgICB0b1N0cmluZyAoKSB7XG4gICAgICByZXR1cm4gYCR7dGhpcy5uYW1lfSBbJHtzeW19XTogJHt0aGlzLm1lc3NhZ2V9YFxuICAgIH1cbiAgfVxufVxuXG5FKCdFUlJfQlVGRkVSX09VVF9PRl9CT1VORFMnLFxuICBmdW5jdGlvbiAobmFtZSkge1xuICAgIGlmIChuYW1lKSB7XG4gICAgICByZXR1cm4gYCR7bmFtZX0gaXMgb3V0c2lkZSBvZiBidWZmZXIgYm91bmRzYFxuICAgIH1cblxuICAgIHJldHVybiAnQXR0ZW1wdCB0byBhY2Nlc3MgbWVtb3J5IG91dHNpZGUgYnVmZmVyIGJvdW5kcydcbiAgfSwgUmFuZ2VFcnJvcilcbkUoJ0VSUl9JTlZBTElEX0FSR19UWVBFJyxcbiAgZnVuY3Rpb24gKG5hbWUsIGFjdHVhbCkge1xuICAgIHJldHVybiBgVGhlIFwiJHtuYW1lfVwiIGFyZ3VtZW50IG11c3QgYmUgb2YgdHlwZSBudW1iZXIuIFJlY2VpdmVkIHR5cGUgJHt0eXBlb2YgYWN0dWFsfWBcbiAgfSwgVHlwZUVycm9yKVxuRSgnRVJSX09VVF9PRl9SQU5HRScsXG4gIGZ1bmN0aW9uIChzdHIsIHJhbmdlLCBpbnB1dCkge1xuICAgIGxldCBtc2cgPSBgVGhlIHZhbHVlIG9mIFwiJHtzdHJ9XCIgaXMgb3V0IG9mIHJhbmdlLmBcbiAgICBsZXQgcmVjZWl2ZWQgPSBpbnB1dFxuICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKGlucHV0KSAmJiBNYXRoLmFicyhpbnB1dCkgPiAyICoqIDMyKSB7XG4gICAgICByZWNlaXZlZCA9IGFkZE51bWVyaWNhbFNlcGFyYXRvcihTdHJpbmcoaW5wdXQpKVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGlucHV0ID09PSAnYmlnaW50Jykge1xuICAgICAgcmVjZWl2ZWQgPSBTdHJpbmcoaW5wdXQpXG4gICAgICBpZiAoaW5wdXQgPiBCaWdJbnQoMikgKiogQmlnSW50KDMyKSB8fCBpbnB1dCA8IC0oQmlnSW50KDIpICoqIEJpZ0ludCgzMikpKSB7XG4gICAgICAgIHJlY2VpdmVkID0gYWRkTnVtZXJpY2FsU2VwYXJhdG9yKHJlY2VpdmVkKVxuICAgICAgfVxuICAgICAgcmVjZWl2ZWQgKz0gJ24nXG4gICAgfVxuICAgIG1zZyArPSBgIEl0IG11c3QgYmUgJHtyYW5nZX0uIFJlY2VpdmVkICR7cmVjZWl2ZWR9YFxuICAgIHJldHVybiBtc2dcbiAgfSwgUmFuZ2VFcnJvcilcblxuZnVuY3Rpb24gYWRkTnVtZXJpY2FsU2VwYXJhdG9yICh2YWwpIHtcbiAgbGV0IHJlcyA9ICcnXG4gIGxldCBpID0gdmFsLmxlbmd0aFxuICBjb25zdCBzdGFydCA9IHZhbFswXSA9PT0gJy0nID8gMSA6IDBcbiAgZm9yICg7IGkgPj0gc3RhcnQgKyA0OyBpIC09IDMpIHtcbiAgICByZXMgPSBgXyR7dmFsLnNsaWNlKGkgLSAzLCBpKX0ke3Jlc31gXG4gIH1cbiAgcmV0dXJuIGAke3ZhbC5zbGljZSgwLCBpKX0ke3Jlc31gXG59XG5cbi8vIENIRUNLIEZVTkNUSU9OU1xuLy8gPT09PT09PT09PT09PT09XG5cbmZ1bmN0aW9uIGNoZWNrQm91bmRzIChidWYsIG9mZnNldCwgYnl0ZUxlbmd0aCkge1xuICB2YWxpZGF0ZU51bWJlcihvZmZzZXQsICdvZmZzZXQnKVxuICBpZiAoYnVmW29mZnNldF0gPT09IHVuZGVmaW5lZCB8fCBidWZbb2Zmc2V0ICsgYnl0ZUxlbmd0aF0gPT09IHVuZGVmaW5lZCkge1xuICAgIGJvdW5kc0Vycm9yKG9mZnNldCwgYnVmLmxlbmd0aCAtIChieXRlTGVuZ3RoICsgMSkpXG4gIH1cbn1cblxuZnVuY3Rpb24gY2hlY2tJbnRCSSAodmFsdWUsIG1pbiwgbWF4LCBidWYsIG9mZnNldCwgYnl0ZUxlbmd0aCkge1xuICBpZiAodmFsdWUgPiBtYXggfHwgdmFsdWUgPCBtaW4pIHtcbiAgICBjb25zdCBuID0gdHlwZW9mIG1pbiA9PT0gJ2JpZ2ludCcgPyAnbicgOiAnJ1xuICAgIGxldCByYW5nZVxuICAgIGlmIChieXRlTGVuZ3RoID4gMykge1xuICAgICAgaWYgKG1pbiA9PT0gMCB8fCBtaW4gPT09IEJpZ0ludCgwKSkge1xuICAgICAgICByYW5nZSA9IGA+PSAwJHtufSBhbmQgPCAyJHtufSAqKiAkeyhieXRlTGVuZ3RoICsgMSkgKiA4fSR7bn1gXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByYW5nZSA9IGA+PSAtKDIke259ICoqICR7KGJ5dGVMZW5ndGggKyAxKSAqIDggLSAxfSR7bn0pIGFuZCA8IDIgKiogYCArXG4gICAgICAgICAgICAgICAgYCR7KGJ5dGVMZW5ndGggKyAxKSAqIDggLSAxfSR7bn1gXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJhbmdlID0gYD49ICR7bWlufSR7bn0gYW5kIDw9ICR7bWF4fSR7bn1gXG4gICAgfVxuICAgIHRocm93IG5ldyBlcnJvcnMuRVJSX09VVF9PRl9SQU5HRSgndmFsdWUnLCByYW5nZSwgdmFsdWUpXG4gIH1cbiAgY2hlY2tCb3VuZHMoYnVmLCBvZmZzZXQsIGJ5dGVMZW5ndGgpXG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlTnVtYmVyICh2YWx1ZSwgbmFtZSkge1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBlcnJvcnMuRVJSX0lOVkFMSURfQVJHX1RZUEUobmFtZSwgJ251bWJlcicsIHZhbHVlKVxuICB9XG59XG5cbmZ1bmN0aW9uIGJvdW5kc0Vycm9yICh2YWx1ZSwgbGVuZ3RoLCB0eXBlKSB7XG4gIGlmIChNYXRoLmZsb29yKHZhbHVlKSAhPT0gdmFsdWUpIHtcbiAgICB2YWxpZGF0ZU51bWJlcih2YWx1ZSwgdHlwZSlcbiAgICB0aHJvdyBuZXcgZXJyb3JzLkVSUl9PVVRfT0ZfUkFOR0UodHlwZSB8fCAnb2Zmc2V0JywgJ2FuIGludGVnZXInLCB2YWx1ZSlcbiAgfVxuXG4gIGlmIChsZW5ndGggPCAwKSB7XG4gICAgdGhyb3cgbmV3IGVycm9ycy5FUlJfQlVGRkVSX09VVF9PRl9CT1VORFMoKVxuICB9XG5cbiAgdGhyb3cgbmV3IGVycm9ycy5FUlJfT1VUX09GX1JBTkdFKHR5cGUgfHwgJ29mZnNldCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgPj0gJHt0eXBlID8gMSA6IDB9IGFuZCA8PSAke2xlbmd0aH1gLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUpXG59XG5cbi8vIEhFTFBFUiBGVU5DVElPTlNcbi8vID09PT09PT09PT09PT09PT1cblxuY29uc3QgSU5WQUxJRF9CQVNFNjRfUkUgPSAvW14rLzAtOUEtWmEtei1fXS9nXG5cbmZ1bmN0aW9uIGJhc2U2NGNsZWFuIChzdHIpIHtcbiAgLy8gTm9kZSB0YWtlcyBlcXVhbCBzaWducyBhcyBlbmQgb2YgdGhlIEJhc2U2NCBlbmNvZGluZ1xuICBzdHIgPSBzdHIuc3BsaXQoJz0nKVswXVxuICAvLyBOb2RlIHN0cmlwcyBvdXQgaW52YWxpZCBjaGFyYWN0ZXJzIGxpa2UgXFxuIGFuZCBcXHQgZnJvbSB0aGUgc3RyaW5nLCBiYXNlNjQtanMgZG9lcyBub3RcbiAgc3RyID0gc3RyLnRyaW0oKS5yZXBsYWNlKElOVkFMSURfQkFTRTY0X1JFLCAnJylcbiAgLy8gTm9kZSBjb252ZXJ0cyBzdHJpbmdzIHdpdGggbGVuZ3RoIDwgMiB0byAnJ1xuICBpZiAoc3RyLmxlbmd0aCA8IDIpIHJldHVybiAnJ1xuICAvLyBOb2RlIGFsbG93cyBmb3Igbm9uLXBhZGRlZCBiYXNlNjQgc3RyaW5ncyAobWlzc2luZyB0cmFpbGluZyA9PT0pLCBiYXNlNjQtanMgZG9lcyBub3RcbiAgd2hpbGUgKHN0ci5sZW5ndGggJSA0ICE9PSAwKSB7XG4gICAgc3RyID0gc3RyICsgJz0nXG4gIH1cbiAgcmV0dXJuIHN0clxufVxuXG5mdW5jdGlvbiB1dGY4VG9CeXRlcyAoc3RyaW5nLCB1bml0cykge1xuICB1bml0cyA9IHVuaXRzIHx8IEluZmluaXR5XG4gIGxldCBjb2RlUG9pbnRcbiAgY29uc3QgbGVuZ3RoID0gc3RyaW5nLmxlbmd0aFxuICBsZXQgbGVhZFN1cnJvZ2F0ZSA9IG51bGxcbiAgY29uc3QgYnl0ZXMgPSBbXVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBjb2RlUG9pbnQgPSBzdHJpbmcuY2hhckNvZGVBdChpKVxuXG4gICAgLy8gaXMgc3Vycm9nYXRlIGNvbXBvbmVudFxuICAgIGlmIChjb2RlUG9pbnQgPiAweEQ3RkYgJiYgY29kZVBvaW50IDwgMHhFMDAwKSB7XG4gICAgICAvLyBsYXN0IGNoYXIgd2FzIGEgbGVhZFxuICAgICAgaWYgKCFsZWFkU3Vycm9nYXRlKSB7XG4gICAgICAgIC8vIG5vIGxlYWQgeWV0XG4gICAgICAgIGlmIChjb2RlUG9pbnQgPiAweERCRkYpIHtcbiAgICAgICAgICAvLyB1bmV4cGVjdGVkIHRyYWlsXG4gICAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfSBlbHNlIGlmIChpICsgMSA9PT0gbGVuZ3RoKSB7XG4gICAgICAgICAgLy8gdW5wYWlyZWQgbGVhZFxuICAgICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICAvLyB2YWxpZCBsZWFkXG4gICAgICAgIGxlYWRTdXJyb2dhdGUgPSBjb2RlUG9pbnRcblxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICAvLyAyIGxlYWRzIGluIGEgcm93XG4gICAgICBpZiAoY29kZVBvaW50IDwgMHhEQzAwKSB7XG4gICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICBsZWFkU3Vycm9nYXRlID0gY29kZVBvaW50XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8vIHZhbGlkIHN1cnJvZ2F0ZSBwYWlyXG4gICAgICBjb2RlUG9pbnQgPSAobGVhZFN1cnJvZ2F0ZSAtIDB4RDgwMCA8PCAxMCB8IGNvZGVQb2ludCAtIDB4REMwMCkgKyAweDEwMDAwXG4gICAgfSBlbHNlIGlmIChsZWFkU3Vycm9nYXRlKSB7XG4gICAgICAvLyB2YWxpZCBibXAgY2hhciwgYnV0IGxhc3QgY2hhciB3YXMgYSBsZWFkXG4gICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICB9XG5cbiAgICBsZWFkU3Vycm9nYXRlID0gbnVsbFxuXG4gICAgLy8gZW5jb2RlIHV0ZjhcbiAgICBpZiAoY29kZVBvaW50IDwgMHg4MCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAxKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKGNvZGVQb2ludClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4ODAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDIpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgfCAweEMwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHgxMDAwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAzKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHhDIHwgMHhFMCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHgxMTAwMDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gNCkgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4MTIgfCAweEYwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHhDICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNvZGUgcG9pbnQnKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBieXRlc1xufVxuXG5mdW5jdGlvbiBhc2NpaVRvQnl0ZXMgKHN0cikge1xuICBjb25zdCBieXRlQXJyYXkgPSBbXVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIC8vIE5vZGUncyBjb2RlIHNlZW1zIHRvIGJlIGRvaW5nIHRoaXMgYW5kIG5vdCAmIDB4N0YuLlxuICAgIGJ5dGVBcnJheS5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpICYgMHhGRilcbiAgfVxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVUb0J5dGVzIChzdHIsIHVuaXRzKSB7XG4gIGxldCBjLCBoaSwgbG9cbiAgY29uc3QgYnl0ZUFycmF5ID0gW11cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKHVuaXRzIC09IDIpIDwgMCkgYnJlYWtcblxuICAgIGMgPSBzdHIuY2hhckNvZGVBdChpKVxuICAgIGhpID0gYyA+PiA4XG4gICAgbG8gPSBjICUgMjU2XG4gICAgYnl0ZUFycmF5LnB1c2gobG8pXG4gICAgYnl0ZUFycmF5LnB1c2goaGkpXG4gIH1cblxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFRvQnl0ZXMgKHN0cikge1xuICByZXR1cm4gYmFzZTY0LnRvQnl0ZUFycmF5KGJhc2U2NGNsZWFuKHN0cikpXG59XG5cbmZ1bmN0aW9uIGJsaXRCdWZmZXIgKHNyYywgZHN0LCBvZmZzZXQsIGxlbmd0aCkge1xuICBsZXQgaVxuICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKGkgKyBvZmZzZXQgPj0gZHN0Lmxlbmd0aCkgfHwgKGkgPj0gc3JjLmxlbmd0aCkpIGJyZWFrXG4gICAgZHN0W2kgKyBvZmZzZXRdID0gc3JjW2ldXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuLy8gQXJyYXlCdWZmZXIgb3IgVWludDhBcnJheSBvYmplY3RzIGZyb20gb3RoZXIgY29udGV4dHMgKGkuZS4gaWZyYW1lcykgZG8gbm90IHBhc3Ncbi8vIHRoZSBgaW5zdGFuY2VvZmAgY2hlY2sgYnV0IHRoZXkgc2hvdWxkIGJlIHRyZWF0ZWQgYXMgb2YgdGhhdCB0eXBlLlxuLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2J1ZmZlci9pc3N1ZXMvMTY2XG5mdW5jdGlvbiBpc0luc3RhbmNlIChvYmosIHR5cGUpIHtcbiAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIHR5cGUgfHxcbiAgICAob2JqICE9IG51bGwgJiYgb2JqLmNvbnN0cnVjdG9yICE9IG51bGwgJiYgb2JqLmNvbnN0cnVjdG9yLm5hbWUgIT0gbnVsbCAmJlxuICAgICAgb2JqLmNvbnN0cnVjdG9yLm5hbWUgPT09IHR5cGUubmFtZSlcbn1cbmZ1bmN0aW9uIG51bWJlcklzTmFOIChvYmopIHtcbiAgLy8gRm9yIElFMTEgc3VwcG9ydFxuICByZXR1cm4gb2JqICE9PSBvYmogLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zZWxmLWNvbXBhcmVcbn1cblxuLy8gQ3JlYXRlIGxvb2t1cCB0YWJsZSBmb3IgYHRvU3RyaW5nKCdoZXgnKWBcbi8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9idWZmZXIvaXNzdWVzLzIxOVxuY29uc3QgaGV4U2xpY2VMb29rdXBUYWJsZSA9IChmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGFscGhhYmV0ID0gJzAxMjM0NTY3ODlhYmNkZWYnXG4gIGNvbnN0IHRhYmxlID0gbmV3IEFycmF5KDI1NilcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNjsgKytpKSB7XG4gICAgY29uc3QgaTE2ID0gaSAqIDE2XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxNjsgKytqKSB7XG4gICAgICB0YWJsZVtpMTYgKyBqXSA9IGFscGhhYmV0W2ldICsgYWxwaGFiZXRbal1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRhYmxlXG59KSgpXG5cbi8vIFJldHVybiBub3QgZnVuY3Rpb24gd2l0aCBFcnJvciBpZiBCaWdJbnQgbm90IHN1cHBvcnRlZFxuZnVuY3Rpb24gZGVmaW5lQmlnSW50TWV0aG9kIChmbikge1xuICByZXR1cm4gdHlwZW9mIEJpZ0ludCA9PT0gJ3VuZGVmaW5lZCcgPyBCdWZmZXJCaWdJbnROb3REZWZpbmVkIDogZm5cbn1cblxuZnVuY3Rpb24gQnVmZmVyQmlnSW50Tm90RGVmaW5lZCAoKSB7XG4gIHRocm93IG5ldyBFcnJvcignQmlnSW50IG5vdCBzdXBwb3J0ZWQnKVxufVxuIiwgImltcG9ydCB7IEJ1ZmZlciBhcyBOb2RlQnVmZmVyIH0gZnJvbSAnYnVmZmVyJ1xuZXhwb3J0IGNvbnN0IEJ1ZmZlciA9IE5vZGVCdWZmZXJcbiIsICIvKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogR1BMLTMuMC1vci1sYXRlciAqL1xyXG4vKiBDb3B5cmlnaHQgXHUwMEE5IDIwMjUgSW5rZGV4ICovXHJcblxyXG5pbXBvcnQge1xyXG4gIEJhc2ljUmF0ZUxpbWl0ZXIsXHJcbiAgQ29udGVudFJhdGluZyxcclxuICBEaXNjb3ZlclNlY3Rpb25UeXBlLFxyXG4gIEZvcm0sXHJcbiAgdHlwZSBDaGFwdGVyLFxyXG4gIHR5cGUgQ2hhcHRlckRldGFpbHMsXHJcbiAgdHlwZSBDaGFwdGVyUHJvdmlkaW5nLFxyXG4gIHR5cGUgRGlzY292ZXJTZWN0aW9uLFxyXG4gIHR5cGUgRGlzY292ZXJTZWN0aW9uSXRlbSxcclxuICB0eXBlIERpc2NvdmVyU2VjdGlvblByb3ZpZGluZyxcclxuICB0eXBlIEV4dGVuc2lvbixcclxuICB0eXBlIE1hbmdhUHJvdmlkaW5nLFxyXG4gIHR5cGUgUGFnZWRSZXN1bHRzLFxyXG4gIHR5cGUgU2VhcmNoRmlsdGVyLFxyXG4gIHR5cGUgU2VhcmNoUXVlcnksXHJcbiAgdHlwZSBTZWFyY2hSZXN1bHRJdGVtLFxyXG4gIHR5cGUgU2VhcmNoUmVzdWx0c1Byb3ZpZGluZyxcclxuICB0eXBlIFNldHRpbmdzRm9ybVByb3ZpZGluZyxcclxuICB0eXBlIFNvdXJjZU1hbmdhLFxyXG4gIHR5cGUgVGFnLFxyXG59IGZyb20gXCJAcGFwZXJiYWNrL3R5cGVzXCI7XHJcblxyXG5pbXBvcnQgeyBTZXR0aW5nc0Zvcm0gfSBmcm9tIFwiLi9mb3Jtc1wiO1xyXG5pbXBvcnQgeyBNYWluSW50ZXJjZXB0b3IgfSBmcm9tIFwiLi9uZXR3b3JrXCI7XHJcblxyXG5jb25zdCBNQU5HQVBBUktfRE9NQUlOID0gXCJodHRwczovL21hbmdhcGFyay5uZXRcIjtcclxuXHJcbnR5cGUgTWFuZ2FQYXJrSW1wbGVtZW50YXRpb24gPSBTZXR0aW5nc0Zvcm1Qcm92aWRpbmcgJlxyXG4gIEV4dGVuc2lvbiAmXHJcbiAgRGlzY292ZXJTZWN0aW9uUHJvdmlkaW5nICZcclxuICBTZWFyY2hSZXN1bHRzUHJvdmlkaW5nICZcclxuICBNYW5nYVByb3ZpZGluZyAmXHJcbiAgQ2hhcHRlclByb3ZpZGluZztcclxuXHJcbmV4cG9ydCBjbGFzcyBNYW5nYVBhcmtFeHRlbnNpb24gaW1wbGVtZW50cyBNYW5nYVBhcmtJbXBsZW1lbnRhdGlvbiB7XHJcbiAgbWFpblJhdGVMaW1pdGVyID0gbmV3IEJhc2ljUmF0ZUxpbWl0ZXIoXCJtYWluXCIsIHtcclxuICAgIG51bWJlck9mUmVxdWVzdHM6IDQsXHJcbiAgICBidWZmZXJJbnRlcnZhbDogMSxcclxuICAgIGlnbm9yZUltYWdlczogdHJ1ZSxcclxuICB9KTtcclxuXHJcbiAgbWFpbkludGVyY2VwdG9yID0gbmV3IE1haW5JbnRlcmNlcHRvcihcIm1haW5cIik7XHJcblxyXG4gIGFzeW5jIGluaXRpYWxpc2UoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICB0aGlzLm1haW5SYXRlTGltaXRlci5yZWdpc3RlckludGVyY2VwdG9yKCk7XHJcbiAgICB0aGlzLm1haW5JbnRlcmNlcHRvci5yZWdpc3RlckludGVyY2VwdG9yKCk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRTZXR0aW5nc0Zvcm0oKTogUHJvbWlzZTxGb3JtPiB7XHJcbiAgICByZXR1cm4gbmV3IFNldHRpbmdzRm9ybSgpO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0RGlzY292ZXJTZWN0aW9ucygpOiBQcm9taXNlPERpc2NvdmVyU2VjdGlvbltdPiB7XHJcbiAgICByZXR1cm4gW1xyXG4gICAgICB7XHJcbiAgICAgICAgaWQ6IFwibGF0ZXN0LXVwZGF0ZXNcIixcclxuICAgICAgICB0aXRsZTogXCJMYXRlc3QgVXBkYXRlc1wiLFxyXG4gICAgICAgIHR5cGU6IERpc2NvdmVyU2VjdGlvblR5cGUuc2ltcGxlQ2Fyb3VzZWwsXHJcbiAgICAgIH0sXHJcbiAgICAgIHtcclxuICAgICAgICBpZDogXCJwb3B1bGFyXCIsXHJcbiAgICAgICAgdGl0bGU6IFwiUG9wdWxhclwiLFxyXG4gICAgICAgIHR5cGU6IERpc2NvdmVyU2VjdGlvblR5cGUuc2ltcGxlQ2Fyb3VzZWwsXHJcbiAgICAgIH0sXHJcbiAgICBdO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0RGlzY292ZXJTZWN0aW9uSXRlbXMoXHJcbiAgICBzZWN0aW9uSWQ6IHN0cmluZyxcclxuICAgIG1ldGFkYXRhOiB1bmtub3duLFxyXG4gICk6IFByb21pc2U8UGFnZWRSZXN1bHRzPERpc2NvdmVyU2VjdGlvbkl0ZW0+PiB7XHJcbiAgICBjb25zdCBwYWdlID0gKG1ldGFkYXRhIGFzIHsgcGFnZT86IG51bWJlciB9KT8ucGFnZSA/PyAxO1xyXG4gICAgXHJcbiAgICAvLyBUT0RPOiBJbXBsZW1lbnQgYWN0dWFsIHNjcmFwaW5nIGxvZ2ljIGZvciBtYW5nYXBhcmsubmV0XHJcbiAgICBjb25zdCB1cmwgPSBgJHtNQU5HQVBBUktfRE9NQUlOfS8ke3NlY3Rpb25JZCA9PT0gXCJwb3B1bGFyXCIgPyBcInBvcHVsYXJcIiA6IFwibGF0ZXN0XCJ9P3BhZ2U9JHtwYWdlfWA7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KHVybCk7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgcmVxdWVzdC5zZW5kKCk7XHJcbiAgICAgIGNvbnN0ICQgPSBBcHBsaWNhdGlvbi5DaGVlcmlvLmxvYWQocmVzcG9uc2UuZGF0YSk7XHJcblxyXG4gICAgICBjb25zdCBpdGVtczogRGlzY292ZXJTZWN0aW9uSXRlbVtdID0gW107XHJcbiAgICAgIFxyXG4gICAgICAvLyBUT0RPOiBQYXJzZSB0aGUgSFRNTCBhbmQgZXh0cmFjdCBtYW5nYSBpdGVtc1xyXG4gICAgICAvLyBUaGlzIGlzIGEgcGxhY2Vob2xkZXIgc3RydWN0dXJlXHJcbiAgICAgIFxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGl0ZW1zLFxyXG4gICAgICAgIG1ldGFkYXRhOiB7IHBhZ2U6IHBhZ2UgKyAxIH0sXHJcbiAgICAgIH07XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBmZXRjaGluZyBkaXNjb3ZlciBzZWN0aW9uICR7c2VjdGlvbklkfTpgLCBlcnJvcik7XHJcbiAgICAgIHJldHVybiB7IGl0ZW1zOiBbXSwgbWV0YWRhdGEgfTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIGdldFNlYXJjaEZpbHRlcnMoKTogUHJvbWlzZTxTZWFyY2hGaWx0ZXJbXT4ge1xyXG4gICAgcmV0dXJuIFtdO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0U2VhcmNoUmVzdWx0cyhcclxuICAgIHF1ZXJ5OiBTZWFyY2hRdWVyeSxcclxuICAgIG1ldGFkYXRhOiB1bmtub3duLFxyXG4gICk6IFByb21pc2U8UGFnZWRSZXN1bHRzPFNlYXJjaFJlc3VsdEl0ZW0+PiB7XHJcbiAgICBjb25zdCBwYWdlID0gKG1ldGFkYXRhIGFzIHsgcGFnZT86IG51bWJlciB9KT8ucGFnZSA/PyAxO1xyXG4gICAgY29uc3Qgc2VhcmNoVGVybSA9IHF1ZXJ5LnRpdGxlID8/IFwiXCI7XHJcblxyXG4gICAgLy8gVE9ETzogSW1wbGVtZW50IHNlYXJjaCBmdW5jdGlvbmFsaXR5XHJcbiAgICBjb25zdCB1cmwgPSBgJHtNQU5HQVBBUktfRE9NQUlOfS9zZWFyY2g/cT0ke2VuY29kZVVSSUNvbXBvbmVudChzZWFyY2hUZXJtKX0mcGFnZT0ke3BhZ2V9YDtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXF1ZXN0ID0gbmV3IFJlcXVlc3QodXJsKTtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCByZXF1ZXN0LnNlbmQoKTtcclxuICAgICAgY29uc3QgJCA9IEFwcGxpY2F0aW9uLkNoZWVyaW8ubG9hZChyZXNwb25zZS5kYXRhKTtcclxuXHJcbiAgICAgIGNvbnN0IHJlc3VsdHM6IFNlYXJjaFJlc3VsdEl0ZW1bXSA9IFtdO1xyXG4gICAgICBcclxuICAgICAgLy8gVE9ETzogUGFyc2Ugc2VhcmNoIHJlc3VsdHNcclxuICAgICAgXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgaXRlbXM6IHJlc3VsdHMsXHJcbiAgICAgICAgbWV0YWRhdGE6IHsgcGFnZTogcGFnZSArIDEgfSxcclxuICAgICAgfTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBkdXJpbmcgc2VhcmNoOlwiLCBlcnJvcik7XHJcbiAgICAgIHJldHVybiB7IGl0ZW1zOiBbXSwgbWV0YWRhdGEgfTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIGdldE1hbmdhRGV0YWlscyhtYW5nYUlkOiBzdHJpbmcpOiBQcm9taXNlPFNvdXJjZU1hbmdhPiB7XHJcbiAgICBjb25zdCB1cmwgPSBgJHtNQU5HQVBBUktfRE9NQUlOfS90aXRsZS8ke21hbmdhSWR9YDtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXF1ZXN0ID0gbmV3IFJlcXVlc3QodXJsKTtcclxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCByZXF1ZXN0LnNlbmQoKTtcclxuICAgICAgY29uc3QgJCA9IEFwcGxpY2F0aW9uLkNoZWVyaW8ubG9hZChyZXNwb25zZS5kYXRhKTtcclxuXHJcbiAgICAgIC8vIFRPRE86IFBhcnNlIG1hbmdhIGRldGFpbHMgZnJvbSB0aGUgcGFnZVxyXG4gICAgICBcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBtYW5nYUlkLFxyXG4gICAgICAgIHRpdGxlczogW1wiVGl0bGVcIl0sXHJcbiAgICAgICAgY292ZXJVcmw6IFwiXCIsXHJcbiAgICAgICAgYXV0aG9yOiBcIlwiLFxyXG4gICAgICAgIGFydGlzdDogXCJcIixcclxuICAgICAgICBzeW5vcHNpczogXCJcIixcclxuICAgICAgICBzdGF0dXM6IFwiVW5rbm93blwiLFxyXG4gICAgICAgIGNvbnRlbnRSYXRpbmc6IENvbnRlbnRSYXRpbmcuRVZFUllPTkUsXHJcbiAgICAgICAgdGFnczogW10sXHJcbiAgICAgIH07XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBmZXRjaGluZyBtYW5nYSBkZXRhaWxzIGZvciAke21hbmdhSWR9OmAsIGVycm9yKTtcclxuICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRDaGFwdGVycyhtYW5nYUlkOiBzdHJpbmcpOiBQcm9taXNlPENoYXB0ZXJbXT4ge1xyXG4gICAgY29uc3QgdXJsID0gYCR7TUFOR0FQQVJLX0RPTUFJTn0vdGl0bGUvJHttYW5nYUlkfWA7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KHVybCk7XHJcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgcmVxdWVzdC5zZW5kKCk7XHJcbiAgICAgIGNvbnN0ICQgPSBBcHBsaWNhdGlvbi5DaGVlcmlvLmxvYWQocmVzcG9uc2UuZGF0YSk7XHJcblxyXG4gICAgICBjb25zdCBjaGFwdGVyczogQ2hhcHRlcltdID0gW107XHJcbiAgICAgIFxyXG4gICAgICAvLyBUT0RPOiBQYXJzZSBjaGFwdGVycyBmcm9tIHRoZSBwYWdlXHJcbiAgICAgIFxyXG4gICAgICByZXR1cm4gY2hhcHRlcnM7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKGBFcnJvciBmZXRjaGluZyBjaGFwdGVycyBmb3IgJHttYW5nYUlkfTpgLCBlcnJvcik7XHJcbiAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIGdldENoYXB0ZXJEZXRhaWxzKGNoYXB0ZXJJZDogc3RyaW5nKTogUHJvbWlzZTxDaGFwdGVyRGV0YWlscz4ge1xyXG4gICAgY29uc3QgdXJsID0gYCR7TUFOR0FQQVJLX0RPTUFJTn0vY2hhcHRlci8ke2NoYXB0ZXJJZH1gO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgUmVxdWVzdCh1cmwpO1xyXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHJlcXVlc3Quc2VuZCgpO1xyXG4gICAgICBjb25zdCAkID0gQXBwbGljYXRpb24uQ2hlZXJpby5sb2FkKHJlc3BvbnNlLmRhdGEpO1xyXG5cclxuICAgICAgY29uc3QgcGFnZXM6IHN0cmluZ1tdID0gW107XHJcbiAgICAgIFxyXG4gICAgICAvLyBUT0RPOiBQYXJzZSBjaGFwdGVyIHBhZ2VzXHJcbiAgICAgIFxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGNoYXB0ZXJJZCxcclxuICAgICAgICBwYWdlcyxcclxuICAgICAgfTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIGZldGNoaW5nIGNoYXB0ZXIgZGV0YWlscyBmb3IgJHtjaGFwdGVySWR9OmAsIGVycm9yKTtcclxuICAgICAgdGhyb3cgZXJyb3I7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsICJleHBvcnQgKiBmcm9tICcuL2ltcGwvaW5kZXguanMnXG5leHBvcnQgKiBmcm9tICcuL0NoYXB0ZXIuanMnXG5leHBvcnQgKiBmcm9tICcuL0NoYXB0ZXJEZXRhaWxzLmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9Db29raWUuanMnXG5leHBvcnQgKiBmcm9tICcuL0Rpc2NvdmVyU2VjdGlvbkl0ZW0uanMnXG5leHBvcnQgKiBmcm9tICcuL0Rpc2NvdmVyU2VjdGlvblR5cGUuanMnXG5leHBvcnQgKiBmcm9tICcuL0hvbWVTZWN0aW9uLmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9pbmRleC5qcydcbmV4cG9ydCAqIGZyb20gJy4vTWFuZ2FJbmZvLmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9NYW5nYVByb2dyZXNzLmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9QYWdlZFJlc3VsdHMuanMnXG5leHBvcnQgKiBmcm9tICcuL1BCQ2FudmFzLmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9QQkltYWdlLmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9SZXF1ZXN0LmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9SZXNwb25zZS5qcydcbmV4cG9ydCAqIGZyb20gJy4vU2VhcmNoRmlsdGVyLmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9TZWFyY2hRdWVyeS5qcydcbmV4cG9ydCAqIGZyb20gJy4vU2VhcmNoUmVzdWx0SXRlbS5qcydcbmV4cG9ydCAqIGZyb20gJy4vU291cmNlTWFuZ2EuanMnXG5leHBvcnQgKiBmcm9tICcuL1RhZy5qcydcbmV4cG9ydCAqIGZyb20gJy4vVGFnU2VjdGlvbi5qcydcbmV4cG9ydCAqIGZyb20gJy4vVHJhY2tlZE1hbmdhQ2hhcHRlclJlYWRBY3Rpb24uanMnXG5leHBvcnQgKiBmcm9tICcuL1NvcnRpbmdPcHRpb24uanMnXG4iLCAiZXhwb3J0ICogZnJvbSAnLi9TZXR0aW5nc1VJL2luZGV4LmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2VzL2luZGV4LmpzJ1xuXG5leHBvcnQgKiBmcm9tICcuL0FwcGxpY2F0aW9uLmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9QYXBlcmJhY2tJbnRlcmNlcHRvci5qcydcbmV4cG9ydCAqIGZyb20gJy4vU2VsZWN0b3IuanMnXG5leHBvcnQgKiBmcm9tICcuL0V4dGVuc2lvbi5qcydcbmV4cG9ydCAqIGZyb20gJy4vQmFzaWNSYXRlTGltaXRlci5qcydcbmV4cG9ydCAqIGZyb20gJy4vQ2xvdWRmbGFyZUVycm9yLmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9Db29raWVTdG9yYWdlSW50ZXJjZXB0b3IuanMnXG5leHBvcnQgKiBmcm9tICcuL1VSTC5qcydcbmV4cG9ydCAqIGZyb20gJy4vVGVzdERlZmluaXRpb24uanMnXG5leHBvcnQgKiBmcm9tICcuL1NvdXJjZUluZm8uanMnXG4iLCAiZXhwb3J0ICogZnJvbSAnLi9Gb3JtLmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9Gb3JtSXRlbUVsZW1lbnQuanMnXG5leHBvcnQgKiBmcm9tICcuL0Zvcm1TZWN0aW9uLmpzJ1xuIiwgImltcG9ydCB0eXBlIHsgRm9ybVNlY3Rpb25FbGVtZW50IH0gZnJvbSAnLi9Gb3JtU2VjdGlvbi5qcydcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEZvcm0ge1xuICByZWxvYWRGb3JtKCkge1xuICAgIC8vIEB0cy1leHBlY3QtZXJyb3IgaGlkZGVuIGZpZWxkXG4gICAgY29uc3QgZm9ybUlkID0gdGhpc1snX191bmRlcmx5aW5nX2Zvcm1JZCddIGFzIHN0cmluZyB8IHVuZGVmaW5lZFxuXG4gICAgaWYgKCFmb3JtSWQpIHJldHVyblxuXG4gICAgLy8gQHRzLWV4cGVjdC1lcnJvciBoaWRkZW4gZnVuY3Rpb25cbiAgICBBcHBsaWNhdGlvbi5mb3JtRGlkQ2hhbmdlKGZvcm1JZClcbiAgfVxuXG4gIGFic3RyYWN0IGdldFNlY3Rpb25zKCk6IEZvcm1TZWN0aW9uRWxlbWVudFtdXG5cbiAgLyogTGlmZSBjeWNsZSBtZXRob2RzLCBhbHdheXMgY2FsbGVkLCBlcnJvcnMgbG9nZ2VkIGJ1dCBpZ25vcmVkICovXG4gIGZvcm1XaWxsQXBwZWFyPygpOiB2b2lkXG4gIGZvcm1EaWRBcHBlYXI/KCk6IHZvaWRcbiAgZm9ybVdpbGxEaXNhcHBlYXI/KCk6IHZvaWRcbiAgZm9ybURpZERpc2FwcGVhcj8oKTogdm9pZFxuXG4gIC8vIElmIHRoaXMgcmV0dXJucyB0cnVlLCB0aGUgYXBwIHdpbGwgZGlzcGxheSBgU3VibWl0YCBhbmQgYENhbmNlbGAgYnV0dG9uc1xuICAvLyBhbmQgY2FsbCB0aGUgcmVsZXZhbnQgbWV0aG9kcyB3aGVuIHRoZXkgYXJlIHByZXNzZWRcbiAgZ2V0IHJlcXVpcmVzRXhwbGljaXRTdWJtaXNzaW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgLy8gVGhlIGFwcCBjYWxscyB0aGlzIG1ldGhvZCB3aGVuIHRoZSB1c2VyIHByZXNzZXMgYFN1Ym1pdGBcbiAgLy8gVGhyb3cgYW4gZXJyb3IgaGVyZSB0byBoYWx0IHRoZSBkaXNtaXNzYWwgYW5kIGRpc3BsYXkgYW4gYWxlcnQgcG9wdXBcbiAgZm9ybURpZFN1Ym1pdD8oKTogUHJvbWlzZTx2b2lkPlxuXG4gIC8vIFRoZSBhcHAgY2FsbHMgdGhpcyBtZXRob2Qgd2hlbiB0aGUgdXNlciBwcmVzc2VzIGBDYW5jZWxgXG4gIC8vIEFueSBlcnJvcnMgdGhyb3duIGZyb20gaGVyZSBhcmUgaWdub3JlZCBhbmQgdGhlIGRpc21pc3NhbCBpcyBub3QgYmxvY2tlZFxuICBmb3JtRGlkQ2FuY2VsPygpOiB2b2lkXG59XG4iLCAiaW1wb3J0IHR5cGUgeyBDb29raWUgfSBmcm9tICcuLi8uLi9Db29raWUuanMnXG5pbXBvcnQgdHlwZSB7IFJlcXVlc3QgfSBmcm9tICcuLi8uLi9SZXF1ZXN0LmpzJ1xuaW1wb3J0IHR5cGUgeyBTZWxlY3RvcklEIH0gZnJvbSAnLi4vU2VsZWN0b3IuanMnXG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi9Gb3JtLmpzJ1xuXG5leHBvcnQgaW50ZXJmYWNlIEZvcm1JdGVtRWxlbWVudDxUPiB7XG4gIGlkOiBzdHJpbmdcbiAgdHlwZTogVFxuICBpc0hpZGRlbjogYm9vbGVhblxufVxuXG50eXBlIFR5cGVkUm93RWxlbWVudDxULCBQPiA9IEZvcm1JdGVtRWxlbWVudDxUPiAmIFBcblxudHlwZSBMYWJlbFJvd0VsZW1lbnQgPSBUeXBlZFJvd0VsZW1lbnQ8J2xhYmVsUm93JywgTGFiZWxSb3dQcm9wcz5cbnR5cGUgT0F1dGhCdXR0b25Sb3dFbGVtZW50ID0gVHlwZWRSb3dFbGVtZW50PFxuICAnb2F1dGhCdXR0b25Sb3cnLFxuICBPQXV0aEJ1dHRvblJvd1Byb3BzXG4+XG50eXBlIE5hdmlnYXRpb25Sb3dFbGVtZW50ID0gVHlwZWRSb3dFbGVtZW50PCduYXZpZ2F0aW9uUm93JywgTmF2aWdhdGlvblJvd1Byb3BzPlxudHlwZSBCdXR0b25Sb3dFbGVtZW50ID0gVHlwZWRSb3dFbGVtZW50PCdidXR0b25Sb3cnLCBCdXR0b25Sb3dQcm9wcz5cbnR5cGUgU2VsZWN0Um93RWxlbWVudCA9IFR5cGVkUm93RWxlbWVudDwnc2VsZWN0Um93JywgU2VsZWN0Um93UHJvcHM+XG50eXBlIFRvZ2dsZVJvd0VsZW1lbnQgPSBUeXBlZFJvd0VsZW1lbnQ8J3RvZ2dsZVJvdycsIFRvZ2dsZVJvd1Byb3BzPlxudHlwZSBJbnB1dFJvd0VsZW1lbnQgPSBUeXBlZFJvd0VsZW1lbnQ8J2lucHV0Um93JywgSW5wdXRSb3dQcm9wcz5cbnR5cGUgU3RlcHBlclJvd0VsZW1lbnQgPSBUeXBlZFJvd0VsZW1lbnQ8J3N0ZXBwZXJSb3cnLCBTdGVwcGVyUm93UHJvcHM+XG50eXBlIFdlYlZpZXdSb3dFbGVtZW50ID0gVHlwZWRSb3dFbGVtZW50PCd3ZWJWaWV3Um93JywgV2ViVmlld1Jvd1Byb3BzPlxuXG5leHBvcnQgdHlwZSBMYWJlbFJvd1Byb3BzID0ge1xuICB0aXRsZTogc3RyaW5nXG4gIHN1YnRpdGxlPzogc3RyaW5nXG4gIHZhbHVlPzogc3RyaW5nXG4gIGlzSGlkZGVuPzogYm9vbGVhblxufVxuXG5leHBvcnQgZnVuY3Rpb24gTGFiZWxSb3coaWQ6IHN0cmluZywgcHJvcHM6IExhYmVsUm93UHJvcHMpOiBMYWJlbFJvd0VsZW1lbnQge1xuICByZXR1cm4geyAuLi5wcm9wcywgaWQsIHR5cGU6ICdsYWJlbFJvdycsIGlzSGlkZGVuOiBwcm9wcy5pc0hpZGRlbiA/PyBmYWxzZSB9XG59XG5cbmV4cG9ydCB0eXBlIElucHV0Um93UHJvcHMgPSB7XG4gIHRpdGxlOiBzdHJpbmdcbiAgdmFsdWU6IHN0cmluZ1xuICBpc0hpZGRlbj86IGJvb2xlYW5cbiAgb25WYWx1ZUNoYW5nZTogU2VsZWN0b3JJRDwodmFsdWU6IHN0cmluZykgPT4gUHJvbWlzZTx2b2lkPj5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIElucHV0Um93KGlkOiBzdHJpbmcsIHByb3BzOiBJbnB1dFJvd1Byb3BzKTogSW5wdXRSb3dFbGVtZW50IHtcbiAgcmV0dXJuIHsgLi4ucHJvcHMsIGlkLCB0eXBlOiAnaW5wdXRSb3cnLCBpc0hpZGRlbjogcHJvcHMuaXNIaWRkZW4gPz8gZmFsc2UgfVxufVxuXG5leHBvcnQgdHlwZSBTdGVwcGVyUm93UHJvcHMgPSB7XG4gIHRpdGxlOiBzdHJpbmdcbiAgc3VidGl0bGU/OiBzdHJpbmdcblxuICB2YWx1ZTogbnVtYmVyXG5cbiAgbWluVmFsdWU6IG51bWJlclxuICBtYXhWYWx1ZTogbnVtYmVyXG4gIHN0ZXBWYWx1ZTogbnVtYmVyXG4gIGxvb3BPdmVyOiBib29sZWFuXG5cbiAgaXNIaWRkZW4/OiBib29sZWFuXG5cbiAgb25WYWx1ZUNoYW5nZTogU2VsZWN0b3JJRDwodmFsdWU6IG51bWJlcikgPT4gUHJvbWlzZTx2b2lkPj5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFN0ZXBwZXJSb3coXG4gIGlkOiBzdHJpbmcsXG4gIHByb3BzOiBTdGVwcGVyUm93UHJvcHNcbik6IFN0ZXBwZXJSb3dFbGVtZW50IHtcbiAgcmV0dXJuIHtcbiAgICAuLi5wcm9wcyxcbiAgICBpZCxcbiAgICB0eXBlOiAnc3RlcHBlclJvdycsXG4gICAgaXNIaWRkZW46IHByb3BzLmlzSGlkZGVuID8/IGZhbHNlLFxuICB9XG59XG5cbmV4cG9ydCB0eXBlIFRvZ2dsZVJvd1Byb3BzID0ge1xuICB0aXRsZTogc3RyaW5nXG4gIHN1YnRpdGxlPzogc3RyaW5nXG4gIHZhbHVlOiBib29sZWFuXG4gIGlzSGlkZGVuPzogYm9vbGVhblxuICBvblZhbHVlQ2hhbmdlOiBTZWxlY3RvcklEPCh2YWx1ZTogYm9vbGVhbikgPT4gUHJvbWlzZTx2b2lkPj5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFRvZ2dsZVJvdyhpZDogc3RyaW5nLCBwcm9wczogVG9nZ2xlUm93UHJvcHMpOiBUb2dnbGVSb3dFbGVtZW50IHtcbiAgcmV0dXJuIHsgLi4ucHJvcHMsIGlkLCB0eXBlOiAndG9nZ2xlUm93JywgaXNIaWRkZW46IHByb3BzLmlzSGlkZGVuID8/IGZhbHNlIH1cbn1cblxuZXhwb3J0IHR5cGUgU2VsZWN0Um93UHJvcHMgPSB7XG4gIHRpdGxlOiBzdHJpbmdcbiAgc3VidGl0bGU/OiBzdHJpbmdcbiAgdmFsdWU6IHN0cmluZ1tdXG4gIG1pbkl0ZW1Db3VudDogbnVtYmVyXG4gIG1heEl0ZW1Db3VudDogbnVtYmVyXG4gIG9wdGlvbnM6IHsgaWQ6IHN0cmluZzsgdGl0bGU6IHN0cmluZyB9W11cbiAgaXNIaWRkZW4/OiBib29sZWFuXG4gIG9uVmFsdWVDaGFuZ2U6IFNlbGVjdG9ySUQ8KHZhbHVlOiBzdHJpbmdbXSkgPT4gUHJvbWlzZTx2b2lkPj5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNlbGVjdFJvdyhpZDogc3RyaW5nLCBwcm9wczogU2VsZWN0Um93UHJvcHMpOiBTZWxlY3RSb3dFbGVtZW50IHtcbiAgcmV0dXJuIHsgLi4ucHJvcHMsIGlkLCB0eXBlOiAnc2VsZWN0Um93JywgaXNIaWRkZW46IHByb3BzLmlzSGlkZGVuID8/IGZhbHNlIH1cbn1cblxuZXhwb3J0IHR5cGUgQnV0dG9uUm93UHJvcHMgPSB7XG4gIHRpdGxlOiBzdHJpbmdcbiAgaXNIaWRkZW4/OiBib29sZWFuXG4gIG9uU2VsZWN0OiBTZWxlY3RvcklEPCgpID0+IFByb21pc2U8dm9pZD4+XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBCdXR0b25Sb3coaWQ6IHN0cmluZywgcHJvcHM6IEJ1dHRvblJvd1Byb3BzKTogQnV0dG9uUm93RWxlbWVudCB7XG4gIHJldHVybiB7IC4uLnByb3BzLCBpZCwgdHlwZTogJ2J1dHRvblJvdycsIGlzSGlkZGVuOiBwcm9wcy5pc0hpZGRlbiA/PyBmYWxzZSB9XG59XG5cbmV4cG9ydCB0eXBlIFdlYlZpZXdSb3dQcm9wcyA9IHtcbiAgdGl0bGU6IHN0cmluZ1xuICByZXF1ZXN0OiBSZXF1ZXN0XG4gIGlzSGlkZGVuPzogYm9vbGVhblxuICBvbkNvbXBsZXRlOiBTZWxlY3RvcklEPChjb29raWVzOiBDb29raWVbXSkgPT4gUHJvbWlzZTx2b2lkPj5cbiAgb25DYW5jZWw6IFNlbGVjdG9ySUQ8KCkgPT4gUHJvbWlzZTx2b2lkPj5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFdlYlZpZXdSb3coXG4gIGlkOiBzdHJpbmcsXG4gIHByb3BzOiBXZWJWaWV3Um93UHJvcHNcbik6IFdlYlZpZXdSb3dFbGVtZW50IHtcbiAgcmV0dXJuIHtcbiAgICAuLi5wcm9wcyxcbiAgICBpZCxcbiAgICB0eXBlOiAnd2ViVmlld1JvdycsXG4gICAgaXNIaWRkZW46IHByb3BzLmlzSGlkZGVuID8/IGZhbHNlLFxuICB9XG59XG5cbmV4cG9ydCB0eXBlIE5hdmlnYXRpb25Sb3dQcm9wcyA9IHtcbiAgdGl0bGU6IHN0cmluZ1xuICBzdWJ0aXRsZT86IHN0cmluZ1xuICB2YWx1ZT86IHN0cmluZ1xuICBpc0hpZGRlbj86IGJvb2xlYW5cbiAgZm9ybTogRm9ybVxufVxuXG5leHBvcnQgZnVuY3Rpb24gTmF2aWdhdGlvblJvdyhcbiAgaWQ6IHN0cmluZyxcbiAgcHJvcHM6IE5hdmlnYXRpb25Sb3dQcm9wc1xuKTogTmF2aWdhdGlvblJvd0VsZW1lbnQge1xuICByZXR1cm4ge1xuICAgIC4uLnByb3BzLFxuICAgIGlkLFxuICAgIHR5cGU6ICduYXZpZ2F0aW9uUm93JyxcbiAgICBpc0hpZGRlbjogcHJvcHMuaXNIaWRkZW4gPz8gZmFsc2UsXG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgT0F1dGhCdXR0b25Sb3dQcm9wcyA9IHtcbiAgdGl0bGU6IHN0cmluZ1xuICBzdWJ0aXRsZT86IHN0cmluZ1xuXG4gIG9uU3VjY2VzczogU2VsZWN0b3JJRDxcbiAgICAocmVmcmVzaFRva2VuOiBzdHJpbmcsIGFjY2Vzc1Rva2VuOiBzdHJpbmcpID0+IFByb21pc2U8dm9pZD5cbiAgPlxuICBhdXRob3JpemVFbmRwb2ludDogc3RyaW5nXG4gIHJlc3BvbnNlVHlwZTpcbiAgICB8IHtcbiAgICAgICAgdHlwZTogJ3Rva2VuJ1xuICAgICAgfVxuICAgIHwge1xuICAgICAgICB0eXBlOiAnY29kZSdcbiAgICAgICAgdG9rZW5FbmRwb2ludDogc3RyaW5nXG4gICAgICB9XG4gICAgfCB7XG4gICAgICAgIHR5cGU6ICdwa2NlJ1xuICAgICAgICB0b2tlbkVuZHBvaW50OiBzdHJpbmdcbiAgICAgICAgcGtjZUNvZGVMZW5ndGg6IG51bWJlclxuICAgICAgICBwa2NlQ29kZU1ldGhvZDogJ1MyNTYnIHwgJ3BsYWluJ1xuICAgICAgICBmb3JtRW5jb2RlR3JhbnQ6IGJvb2xlYW5cbiAgICAgIH1cbiAgY2xpZW50SWQ/OiBzdHJpbmdcbiAgcmVkaXJlY3RVcmk/OiBzdHJpbmdcbiAgc2NvcGVzPzogc3RyaW5nW11cblxuICBpc0hpZGRlbj86IGJvb2xlYW5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE9BdXRoQnV0dG9uUm93KFxuICBpZDogc3RyaW5nLFxuICBwcm9wczogT0F1dGhCdXR0b25Sb3dQcm9wc1xuKTogT0F1dGhCdXR0b25Sb3dFbGVtZW50IHtcbiAgcmV0dXJuIHtcbiAgICAuLi5wcm9wcyxcbiAgICBpZCxcbiAgICB0eXBlOiAnb2F1dGhCdXR0b25Sb3cnLFxuICAgIGlzSGlkZGVuOiBwcm9wcy5pc0hpZGRlbiA/PyBmYWxzZSxcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gRGVmZXJyZWRJdGVtPFYsIFQgZXh0ZW5kcyBGb3JtSXRlbUVsZW1lbnQ8Vj4+KHdvcms6ICgpID0+IFQpOiBUXG5leHBvcnQgZnVuY3Rpb24gRGVmZXJyZWRJdGVtPFYsIFQgZXh0ZW5kcyBGb3JtSXRlbUVsZW1lbnQ8Vj4+KFxuICB3b3JrOiAoKSA9PiBUIHwgdW5kZWZpbmVkXG4pOiBUIHwgdW5kZWZpbmVkIHtcbiAgcmV0dXJuIHdvcmsoKVxufVxuIiwgImltcG9ydCB0eXBlIHsgRm9ybUl0ZW1FbGVtZW50IH0gZnJvbSAnLi9Gb3JtSXRlbUVsZW1lbnQuanMnXG5cbmV4cG9ydCBpbnRlcmZhY2UgRm9ybVNlY3Rpb25FbGVtZW50IHtcbiAgaWQ6IHN0cmluZ1xuICBoZWFkZXI/OiBzdHJpbmdcbiAgZm9vdGVyPzogc3RyaW5nXG4gIGl0ZW1zOiBGb3JtSXRlbUVsZW1lbnQ8dW5rbm93bj5bXVxufVxuXG5leHBvcnQgdHlwZSBTZWN0aW9uSW5mbyA9IHtcbiAgaWQ6IHN0cmluZ1xuICBoZWFkZXI/OiBzdHJpbmdcbiAgZm9vdGVyPzogc3RyaW5nXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTZWN0aW9uKFxuICBwYXJhbXM6IHN0cmluZyB8IFNlY3Rpb25JbmZvLFxuICBpdGVtczogKEZvcm1JdGVtRWxlbWVudDx1bmtub3duPiB8IHVuZGVmaW5lZClbXVxuKTogRm9ybVNlY3Rpb25FbGVtZW50IHtcbiAgbGV0IGluZm86IFNlY3Rpb25JbmZvXG4gIGlmICh0eXBlb2YgcGFyYW1zID09PSAnc3RyaW5nJykge1xuICAgIGluZm8gPSB7IGlkOiBwYXJhbXMgfVxuICB9IGVsc2Uge1xuICAgIGluZm8gPSBwYXJhbXNcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgLi4uaW5mbyxcbiAgICBpdGVtczogaXRlbXMuZmlsdGVyKCh4KSA9PiB4KSBhcyBGb3JtSXRlbUVsZW1lbnQ8dW5rbm93bj5bXSxcbiAgfVxufVxuXG4vLyB0eXBlIExpc3RTZWN0aW9uUHJvcHMgPSB7XG4vLyAgIGl0ZW1zOiB1bmtub3duXG4vLyAgIGFsbG93RGVsZXRpb246IGJvb2xlYW5cbi8vICAgb25SZW1vdmU6IFNlbGVjdG9ySUQ8KCkgPT4gUHJvbWlzZTx2b2lkPj5cbi8vICAgYWxsb3dBZGRpdGlvbjogYm9vbGVhblxuLy8gICBvbkFkZDogU2VsZWN0b3JJRDwoKSA9PiBQcm9taXNlPHZvaWQ+PlxuLy8gICByb3dCdWlsZGVyOiAoaXRlbTogdW5rbm93bikgPT4gRm9ybUl0ZW1FbGVtZW50PHVua25vd24+XG4vLyB9XG5cbi8vIGZ1bmN0aW9uIExpc3RTZWN0aW9uKGlkOiBzdHJpbmcsIHByb3BzOiBMaXN0U2VjdGlvblByb3BzKSB7XG4vLyBUT0RPXG4vLyBMaXN0U2VjdGlvbignbXlTZWN0aW9uJywge1xuLy8gICAgIGl0ZW1zOiBbeyB2YWx1ZTogJ2hlbGxvJywgaWQ6ICd3b3JsZCcgfV0sXG4vLyAgICAgYWxsb3dEZWxldGlvbjogdHJ1ZSxcbi8vICAgICBvblJlbW92ZTogQXBwbGljYXRpb24uc2VsZWN0b3IodGhpcywgJ215SXRlbURpZFJlbW92ZScpLFxuLy8gICAgIGFsbG93QWRkaXRpb246IHRydWUsXG4vLyAgICAgb25BZGQ6IEFwcGxpY2F0aW9uLnNlbGVjdG9yKHRoaXMsICdteUl0ZW1EaWRBZGQnKSxcbi8vICAgICByb3dCdWlsZGVyOiAoZWxlbWVudCkgPT4gSW5wdXRSb3coJ215Um93Jywge1xuLy8gICAgICAgICBpZDogZWxlbWVudC5pZCxcbi8vICAgICAgICAgdmFsdWU6IGVsZW1lbnQudmFsdWUsXG4vLyAgICAgICAgIHBsYWNlaG9sZGVyOiAnRm9vJ1xuLy8gICAgIH0pXG4vLyB9KVxuLy8gfVxuIiwgImV4cG9ydCAqIGZyb20gJy4vQ2hhcHRlclByb3ZpZGluZy5qcydcbmV4cG9ydCAqIGZyb20gJy4vQ2xvdWRmbGFyZUJ5cGFzc1JlcXVlc3RQcm92aWRpbmcuanMnXG5leHBvcnQgKiBmcm9tICcuL0Rpc2NvdmVyU2VjdGlvblByb3ZpZGluZy5qcydcbmV4cG9ydCAqIGZyb20gJy4vTWFuYWdlZENvbGxlY3Rpb25Qcm92aWRpbmcuanMnXG5leHBvcnQgKiBmcm9tICcuL01hbmdhUHJvZ3Jlc3NQcm92aWRpbmcuanMnXG5leHBvcnQgKiBmcm9tICcuL01hbmdhUHJvdmlkaW5nLmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9TZWFyY2hSZXN1bHRzUHJvdmlkaW5nLmpzJ1xuZXhwb3J0ICogZnJvbSAnLi9TZXR0aW5nc0Zvcm1Qcm92aWRpbmcuanMnXG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5leHBvcnQgZnVuY3Rpb24gaGFzUHJvcGVydGllc09mPFQ+KHByb3BlcnRpZXM6IChrZXlvZiBUKVtdLCBvYmo6IGFueSk6IG9iaiBpcyBUIHtcbiAgcmV0dXJuIHByb3BlcnRpZXMuZXZlcnkoKGspID0+IGsgaW4gb2JqKVxufSIsICJpbXBvcnQgdHlwZSB7IENoYXB0ZXIgfSBmcm9tICcuLi8uLi9DaGFwdGVyLmpzJ1xuaW1wb3J0IHR5cGUgeyBDaGFwdGVyRGV0YWlscyB9IGZyb20gJy4uLy4uL0NoYXB0ZXJEZXRhaWxzLmpzJ1xuaW1wb3J0IHR5cGUgeyBTb3VyY2VNYW5nYSB9IGZyb20gJy4uLy4uL1NvdXJjZU1hbmdhLmpzJ1xuaW1wb3J0IHsgaGFzUHJvcGVydGllc09mIH0gZnJvbSAnLi9pbmRleC5qcydcbmltcG9ydCB0eXBlIHsgTWFuZ2FQcm92aWRpbmcgfSBmcm9tICcuL01hbmdhUHJvdmlkaW5nLmpzJ1xuXG5leHBvcnQgaW50ZXJmYWNlIENoYXB0ZXJQcm92aWRpbmcgZXh0ZW5kcyBNYW5nYVByb3ZpZGluZyB7XG4gIC8qKlxuICAgKiBAcGFyYW0gc291cmNlTWFuZ2EgVGhlIHNvdXJjZU1hbmdhIGZvciB3aGljaCB0aGUgY2hhcHRlcnMgc2hvdWxkIGJlIGZldGNoZWRcbiAgICovXG4gIGdldENoYXB0ZXJzKHNvdXJjZU1hbmdhOiBTb3VyY2VNYW5nYSwgc2luY2VEYXRlPzogRGF0ZSk6IFByb21pc2U8Q2hhcHRlcltdPlxuXG4gIC8qKlxuICAgKiBAcGFyYW0gY2hhcHRlciBUaGUgY2hhcHRlciBsaXN0aW5nIGZvciB3aGljaCB0aGUgZGV0YWlscyBzaG91bGQgYmUgZmV0Y2hlZFxuICAgKi9cbiAgZ2V0Q2hhcHRlckRldGFpbHMoY2hhcHRlcjogQ2hhcHRlcik6IFByb21pc2U8Q2hhcHRlckRldGFpbHM+XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudCB0aGlzIE9OTFkgaWYgdGhlIHNvdXJjZSBjYW4gZGV0ZXJtaW5lLCBpbiBidWxrLCB3aGljaCB0aXRsZSBoYXMgYmVlbiB1cGRhdGVkXG4gICAqIFlvdSBjYW4gYWxzbyB1c2UgdGhpcyB0byBza2lwIHRoZSBhcHAgY2FsbGluZyB7QGxpbmsgZ2V0TmV3Q2hhcHRlcnN9IGVudGlyZWx5IGFuZCBwcm92aWRlIG5ld1xuICAgKiBjaGFwdGVyIGluIGhlcmVcbiAgICogQHBhcmFtIHVwZGF0ZU1hbmFnZXIgdGhlIHVwZGF0ZSBtYW5hZ2VyIHdoaWNoIHdpbGwgYmUgcmVzcG9uc2libGUgZm9yIGZldGNoaW5nIHVwZGF0ZXMsIERPIE5PVCBTVE9SRSBUSElTXG4gICAqIEBwYXJhbSBsYXN0VXBkYXRlRGF0ZSBsYXN0IHRpbWUgdGhlIGFwcCBzdWNjZXNzZnVsbHkgZmV0Y2hlZCB1cGRhdGVzXG4gICAqIFxuICAgKiBOb3RlczpcbiAgICogLSBJZiB5b3VyIHNvdXJjZSBuZWVkcyBjbG91ZGZsYXJlIGJ5cGFzcyB0aHJvdyBhIHtAbGluayBDbG91ZGZsYXJlRXJyb3J9IGhlcmVcbiAgICovXG4gIHByb2Nlc3NUaXRsZXNGb3JVcGRhdGVzPyhcbiAgICB1cGRhdGVNYW5hZ2VyOiBVcGRhdGVNYW5hZ2VyLFxuICAgIGxhc3RVcGRhdGVEYXRlPzogRGF0ZVxuICApOiBQcm9taXNlPHZvaWQ+XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXBkYXRlTWFuYWdlciB7XG4gIGdldFF1ZXVlZEl0ZW1zKCk6IFNvdXJjZU1hbmdhW11cblxuICBzZXRVcGRhdGVQcmlvcml0eShcbiAgICBtYW5nYUlkOiBzdHJpbmcsXG4gICAgdXBkYXRlUHJpb3JpdHk6ICdoaWdoJyB8ICdsb3cnIHwgJ3NraXAnXG4gICk6IFByb21pc2U8dm9pZD5cblxuICBnZXROdW1iZXJPZkNoYXB0ZXJzKG1hbmdhSWQ6IHN0cmluZyk6IFByb21pc2U8bnVtYmVyPlxuXG4gIC8qKlxuICAgKiBHZXQgYWxsIGNoYXB0ZXJzIGZvciBhIHRpdGxlIGZyb20gYXBwIGRiXG4gICAqIFxuICAgKiBUaGlzIGNhbiBwb3RlbnRpYWxseSBiZSBhIHJlYWxseSBleHBlbnNpdmUgY2FsbCwgb25seSBwZXJmb3JtIHRoaXMgd2hlbiB5b3Uga25vdyB5b3UnbGwgYmUgc2F2aW5nIG1hbnkgcmVxdWVzdHMuXG4gICAqXG4gICAqIEluIGdlbmVyYWwsIGF2b2lkIGRvaW5nIGRpZmZpbmcgaW4gdGhlIHNvdXJjZSBhbmQgbGV0IHRoZSBhcHAgaGFuZGxlIG1lcmdpbmcgY2hhcHRlcnMuXG4gICAqXG4gICAqIEEgcG90ZW50aWFsIHVzZS1jYXNlIGZvciB0aGlzIG1ldGhvZCBpcyBkZXRlcm1pbmluZyB3aGF0IHRoZSBzb3J0LWluZGV4IGlzIGZvciB0aGUgbmV3IGNoYXB0ZXJzXG4gICAqL1xuICBnZXRDaGFwdGVycyhtYW5nYUlkOiBzdHJpbmcpOiBQcm9taXNlPENoYXB0ZXJbXT5cblxuICAvKipcbiAgICogUHJvdmlkZSBuZXcgY2hhcHRlcnMgZm9yIHRoZSBnaXZlbiBtYW5nYSB1cGZyb250LCBza2lwcGluZyBpdHMgYGdldENoYXB0ZXJzYCBjYWxsLlxuICAgKlxuICAgKiBOb3RlOlxuICAgKiAtIGlmIHNvdXJjZSBzZXRzIGBzb3J0aW5nSW5kZXhgLCBtYWtlIHN1cmUgaXQgaXMgc2V0IGNvcnJlY3RseSBmb3IgdGhlIG5ldyBjaGFwdGVycy5cbiAgICogLSBPbmx5IHVzZSB0aGlzIGlmIGl0J3MgYSBtb3JlIGVmZmljaWVudCBjYWxsIHRoYW4gYENoYXB0ZXJQcm92aWRpbmcuZ2V0Q2hhcHRlcnNgXG4gICAqL1xuICBzZXROZXdDaGFwdGVycyhcbiAgICBtYW5nYUlkOiBzdHJpbmcsXG4gICAgY2hhcHRlcnM6IENoYXB0ZXJbXSB8IHVuZGVmaW5lZFxuICApOiBQcm9taXNlPHZvaWQ+XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbXBsZW1lbnRzQ2hhcHRlclByb3ZpZGluZyhcbiAgZXh0ZW5zaW9uOiBNYW5nYVByb3ZpZGluZ1xuKTogZXh0ZW5zaW9uIGlzIENoYXB0ZXJQcm92aWRpbmcge1xuICByZXR1cm4gaGFzUHJvcGVydGllc09mPENoYXB0ZXJQcm92aWRpbmc+KFxuICAgIFsnZ2V0Q2hhcHRlcnMnLCAnZ2V0TWFuZ2FEZXRhaWxzJ10sXG4gICAgZXh0ZW5zaW9uXG4gIClcbn1cbiIsICJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1DbG91ZGZsYXJlQnlwYXNzUmVxdWVzdFByb3ZpZGluZy5qcy5tYXAiLCAiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RGlzY292ZXJTZWN0aW9uUHJvdmlkaW5nLmpzLm1hcCIsICJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1NYW5hZ2VkQ29sbGVjdGlvblByb3ZpZGluZy5qcy5tYXAiLCAiaW1wb3J0IHR5cGUgeyBNYW5nYVByb2dyZXNzIH0gZnJvbSAnLi4vLi4vTWFuZ2FQcm9ncmVzcy5qcydcbmltcG9ydCB0eXBlIHsgU291cmNlTWFuZ2EgfSBmcm9tICcuLi8uLi9Tb3VyY2VNYW5nYS5qcydcbmltcG9ydCB0eXBlIHsgVHJhY2tlZE1hbmdhQ2hhcHRlclJlYWRBY3Rpb24gfSBmcm9tICcuLi8uLi9UcmFja2VkTWFuZ2FDaGFwdGVyUmVhZEFjdGlvbi5qcydcbmltcG9ydCB7IEZvcm0gfSBmcm9tICcuLi9TZXR0aW5nc1VJL0Zvcm0uanMnXG5cbmV4cG9ydCB0eXBlIENoYXB0ZXJSZWFkQWN0aW9uUXVldWVQcm9jZXNzaW5nUmVzdWx0ID0ge1xuICBzdWNjZXNzZnVsSXRlbXM6IHN0cmluZ1tdXG4gIGZhaWxlZEl0ZW1zOiBzdHJpbmdbXVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1hbmdhUHJvZ3Jlc3NQcm92aWRpbmcge1xuICBnZXRNYW5nYVByb2dyZXNzTWFuYWdlbWVudEZvcm0oc291cmNlTWFuZ2E6IFNvdXJjZU1hbmdhKTogUHJvbWlzZTxGb3JtPlxuICBnZXRNYW5nYVByb2dyZXNzKHNvdXJjZU1hbmdhOiBTb3VyY2VNYW5nYSk6IFByb21pc2U8TWFuZ2FQcm9ncmVzcyB8IHVuZGVmaW5lZD5cblxuICAvKipcbiAgICogSW1wbGVtZW50YXRpb24gTm90ZXM6XG4gICAqICAgLSBIYW5kbGUgYWxsIGVycm9ycywgdGhyb3dpbmcgY2FuIGNhdXNlIGlzc3Vlc1xuICAgKiAgIC0gSWYgYSBjaGFwdGVyIGFjdGlvbiBpcyBwdXNoZWQsIGl0IHNob3VsZCBiZSBpbiBlaXRoZXIgYHN1Y2Nlc3NmdWxJdGVtc2Agb3IgYGZhaWxlZEl0ZW1zYFxuICAgKiAgIC0gSXRlbXMgbm90IGluIGVpdGhlciBgQ2hhcHRlclJlYWRBY3Rpb25RdWV1ZVByb2Nlc3NpbmdSZXN1bHRgIGZpZWxkcyB3aWxsIGJlIHNlZW4gYXMgXCJub3QgYXR0ZW1wdGVkXCJcbiAgICovXG4gIHByb2Nlc3NDaGFwdGVyUmVhZEFjdGlvblF1ZXVlKFxuICAgIGFjdGlvbnM6IFRyYWNrZWRNYW5nYUNoYXB0ZXJSZWFkQWN0aW9uW11cbiAgKTogUHJvbWlzZTxDaGFwdGVyUmVhZEFjdGlvblF1ZXVlUHJvY2Vzc2luZ1Jlc3VsdD5cbn1cbiIsICJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1NYW5nYVByb3ZpZGluZy5qcy5tYXAiLCAiaW1wb3J0IHR5cGUgeyBQYWdlZFJlc3VsdHMgfSBmcm9tICcuLi8uLi9QYWdlZFJlc3VsdHMuanMnXG5pbXBvcnQgdHlwZSB7IFNlYXJjaEZpbHRlciB9IGZyb20gJy4uLy4uL1NlYXJjaEZpbHRlci5qcydcbmltcG9ydCB0eXBlIHsgU2VhcmNoUXVlcnkgfSBmcm9tICcuLi8uLi9TZWFyY2hRdWVyeS5qcydcbmltcG9ydCB0eXBlIHsgU2VhcmNoUmVzdWx0SXRlbSB9IGZyb20gJy4uLy4uL1NlYXJjaFJlc3VsdEl0ZW0uanMnXG5pbXBvcnQgdHlwZSB7IFNvcnRpbmdPcHRpb24gfSBmcm9tICcuLi8uLi9Tb3J0aW5nT3B0aW9uLmpzJ1xuaW1wb3J0IHsgaGFzUHJvcGVydGllc09mIH0gZnJvbSAnLi9pbmRleC5qcydcbmltcG9ydCB0eXBlIHsgTWFuZ2FQcm92aWRpbmcgfSBmcm9tICcuL01hbmdhUHJvdmlkaW5nLmpzJ1xuXG4vKipcbiAqIEBkZXByZWNhdGVkIFVzZSB7QGxpbmsgU2VhcmNoUmVzdWx0c1Byb3ZpZGluZ31cbiAqL1xuZXhwb3J0IHR5cGUgU2VhcmNoYWJsZSA9IFNlYXJjaFJlc3VsdHNQcm92aWRpbmdcblxuZXhwb3J0IGludGVyZmFjZSBTZWFyY2hSZXN1bHRzUHJvdmlkaW5nIGV4dGVuZHMgTWFuZ2FQcm92aWRpbmcge1xuICBnZXRTZWFyY2hGaWx0ZXJzKCk6IFByb21pc2U8U2VhcmNoRmlsdGVyW10+XG5cbiAgZ2V0U2VhcmNoUmVzdWx0cyhcbiAgICBxdWVyeTogU2VhcmNoUXVlcnksXG4gICAgbWV0YWRhdGE6IHVua25vd24gfCB1bmRlZmluZWQsXG4gICAgc29ydGluZ09wdGlvbjogU29ydGluZ09wdGlvbiB8IHVuZGVmaW5lZFxuICApOiBQcm9taXNlPFBhZ2VkUmVzdWx0czxTZWFyY2hSZXN1bHRJdGVtPj5cblxuICBnZXRTb3J0aW5nT3B0aW9ucz8ocXVlcnk6IFNlYXJjaFF1ZXJ5KTogUHJvbWlzZTxTb3J0aW5nT3B0aW9uW10+XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbXBsZW1lbnRzU2VhcmNoUmVzdWx0c1Byb3ZpZGluZyhcbiAgZXh0ZW5zaW9uOiBNYW5nYVByb3ZpZGluZ1xuKTogZXh0ZW5zaW9uIGlzIFNlYXJjaFJlc3VsdHNQcm92aWRpbmcge1xuICByZXR1cm4gaGFzUHJvcGVydGllc09mPFNlYXJjaFJlc3VsdHNQcm92aWRpbmc+KFxuICAgIFsnZ2V0U2VhcmNoRmlsdGVycycsICdnZXRTZWFyY2hSZXN1bHRzJ10sXG4gICAgZXh0ZW5zaW9uXG4gIClcbn1cbiIsICJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TZXR0aW5nc0Zvcm1Qcm92aWRpbmcuanMubWFwIiwgImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUFwcGxpY2F0aW9uLmpzLm1hcCIsICJpbXBvcnQgdHlwZSB7IFJlcXVlc3QgfSBmcm9tICcuLi9SZXF1ZXN0LmpzJ1xuaW1wb3J0IHR5cGUgeyBSZXNwb25zZSB9IGZyb20gJy4uL1Jlc3BvbnNlLmpzJ1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgUGFwZXJiYWNrSW50ZXJjZXB0b3Ige1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgaWQ6IHN0cmluZykge31cblxuICBhYnN0cmFjdCBpbnRlcmNlcHRSZXF1ZXN0KHJlcXVlc3Q6IFJlcXVlc3QpOiBQcm9taXNlPFJlcXVlc3Q+XG4gIGFic3RyYWN0IGludGVyY2VwdFJlc3BvbnNlKFxuICAgIHJlcXVlc3Q6IFJlcXVlc3QsXG4gICAgcmVzcG9uc2U6IFJlc3BvbnNlLFxuICAgIGRhdGE6IEFycmF5QnVmZmVyXG4gICk6IFByb21pc2U8QXJyYXlCdWZmZXI+XG5cbiAgcmVnaXN0ZXJJbnRlcmNlcHRvcigpIHtcbiAgICBBcHBsaWNhdGlvbi5yZWdpc3RlckludGVyY2VwdG9yKFxuICAgICAgdGhpcy5pZCxcbiAgICAgIEFwcGxpY2F0aW9uLlNlbGVjdG9yKHRoaXMgYXMgUGFwZXJiYWNrSW50ZXJjZXB0b3IsICdpbnRlcmNlcHRSZXF1ZXN0JyksXG4gICAgICBBcHBsaWNhdGlvbi5TZWxlY3Rvcih0aGlzIGFzIFBhcGVyYmFja0ludGVyY2VwdG9yLCAnaW50ZXJjZXB0UmVzcG9uc2UnKVxuICAgIClcbiAgfVxuXG4gIHVucmVnaXN0ZXJJbnRlcmNlcHRvcigpIHtcbiAgICBBcHBsaWNhdGlvbi51bnJlZ2lzdGVySW50ZXJjZXB0b3IodGhpcy5pZClcbiAgfVxufVxuIiwgImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVNlbGVjdG9yLmpzLm1hcCIsICJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1FeHRlbnNpb24uanMubWFwIiwgImltcG9ydCB7IGxvY2ssIHVubG9jayB9IGZyb20gJy4vTG9jay5qcydcbmltcG9ydCB7IFBhcGVyYmFja0ludGVyY2VwdG9yIH0gZnJvbSAnLi9QYXBlcmJhY2tJbnRlcmNlcHRvci5qcydcbmltcG9ydCB0eXBlIHsgUmVxdWVzdCB9IGZyb20gJy4uL1JlcXVlc3QuanMnXG5pbXBvcnQgdHlwZSB7IFJlc3BvbnNlIH0gZnJvbSAnLi4vUmVzcG9uc2UuanMnXG5cbmV4cG9ydCB0eXBlIEJhc2ljUmF0ZUxpbWl0ZXJPcHRpb25zID0ge1xuICBudW1iZXJPZlJlcXVlc3RzOiBudW1iZXJcbiAgYnVmZmVySW50ZXJ2YWw6IG51bWJlclxuICBpZ25vcmVJbWFnZXM6IGJvb2xlYW5cbn1cblxuZXhwb3J0IGNsYXNzIEJhc2ljUmF0ZUxpbWl0ZXIgZXh0ZW5kcyBQYXBlcmJhY2tJbnRlcmNlcHRvciB7XG4gIHByaXZhdGUgcHJvbWlzZT86IFByb21pc2U8dm9pZD5cbiAgcHJpdmF0ZSBjdXJyZW50UmVxdWVzdHNNYWRlOiBudW1iZXIgPSAwXG4gIHByaXZhdGUgbGFzdFJlc2V0OiBudW1iZXIgPSBEYXRlLm5vdygpXG4gIHByaXZhdGUgcmVhZG9ubHkgaW1hZ2VSZWdleCA9IG5ldyBSZWdFeHAoL1xcLihwbmd8Z2lmfGpwZWd8anBnfHdlYnApKFxcP3wkKS9pKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGlkOiBzdHJpbmcsXG4gICAgcmVhZG9ubHkgb3B0aW9uczogQmFzaWNSYXRlTGltaXRlck9wdGlvbnNcbiAgKSB7XG4gICAgc3VwZXIoaWQpXG4gIH1cblxuICBhc3luYyBpbnRlcmNlcHRSZXF1ZXN0KHJlcXVlc3Q6IFJlcXVlc3QpOiBQcm9taXNlPFJlcXVlc3Q+IHtcbiAgICBpZiAodGhpcy5vcHRpb25zLmlnbm9yZUltYWdlcyAmJiB0aGlzLmltYWdlUmVnZXgudGVzdChyZXF1ZXN0LnVybCkpIHtcbiAgICAgIHJldHVybiByZXF1ZXN0XG4gICAgfVxuXG4gICAgYXdhaXQgbG9jayh0aGlzLmlkKVxuICAgIGF3YWl0IHRoaXMuaW5jcmVtZW50UmVxdWVzdENvdW50KClcbiAgICB1bmxvY2sodGhpcy5pZClcbiAgICByZXR1cm4gcmVxdWVzdFxuICB9XG5cbiAgYXN5bmMgaW50ZXJjZXB0UmVzcG9uc2UoXG4gICAgcmVxdWVzdDogUmVxdWVzdCxcbiAgICByZXNwb25zZTogUmVzcG9uc2UsXG4gICAgZGF0YTogQXJyYXlCdWZmZXJcbiAgKTogUHJvbWlzZTxBcnJheUJ1ZmZlcj4ge1xuICAgIHJldHVybiBkYXRhXG4gIH1cblxuICBhc3luYyBpbmNyZW1lbnRSZXF1ZXN0Q291bnQoKSB7XG4gICAgYXdhaXQgdGhpcy5wcm9taXNlXG5cbiAgICBjb25zdCBzZWNvbmRzU2luY2VMYXN0UmVzZXQgPSAoRGF0ZS5ub3coKSAtIHRoaXMubGFzdFJlc2V0KSAvIDEwMDBcbiAgICBpZiAoc2Vjb25kc1NpbmNlTGFzdFJlc2V0ID4gdGhpcy5vcHRpb25zLmJ1ZmZlckludGVydmFsKSB7XG4gICAgICB0aGlzLmN1cnJlbnRSZXF1ZXN0c01hZGUgPSAwXG4gICAgICB0aGlzLmxhc3RSZXNldCA9IERhdGUubm93KClcbiAgICB9XG5cbiAgICB0aGlzLmN1cnJlbnRSZXF1ZXN0c01hZGUgKz0gMVxuXG4gICAgaWYgKHRoaXMuY3VycmVudFJlcXVlc3RzTWFkZSA+PSB0aGlzLm9wdGlvbnMubnVtYmVyT2ZSZXF1ZXN0cykge1xuICAgICAgY29uc3Qgc2Vjb25kc1NpbmNlTGFzdFJlc2V0ID0gKERhdGUubm93KCkgLSB0aGlzLmxhc3RSZXNldCkgLyAxMDAwXG4gICAgICBpZiAoc2Vjb25kc1NpbmNlTGFzdFJlc2V0IDw9IHRoaXMub3B0aW9ucy5idWZmZXJJbnRlcnZhbCkge1xuICAgICAgICBjb25zdCBzbGVlcFRpbWUgPSB0aGlzLm9wdGlvbnMuYnVmZmVySW50ZXJ2YWwgLSBzZWNvbmRzU2luY2VMYXN0UmVzZXRcbiAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgYFtCYXNpY1JhdGVMaW1pdGVyXSByYXRlIGxpbWl0IGhpdCwgc2xlZXBpbmcgZm9yICR7c2xlZXBUaW1lfWBcbiAgICAgICAgKVxuICAgICAgICB0aGlzLnByb21pc2UgPSBBcHBsaWNhdGlvbi5zbGVlcChzbGVlcFRpbWUpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCAiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWR5bmFtaWMtZGVsZXRlICovXG5jb25zdCBwcm9taXNlczogUmVjb3JkPHN0cmluZywgUHJvbWlzZTx2b2lkPiB8IHVuZGVmaW5lZD4gPSB7fSxcbiAgcmVzb2x2ZXJzOiBSZWNvcmQ8c3RyaW5nLCAoKCkgPT4gdm9pZCkgfCB1bmRlZmluZWQ+ID0ge31cbi8vIHVpZCBzaG91bGQgYmUgdW5pcXVlIHBlciBjb2RlIHlvdSBwcm90ZWN0LCBlLmcuIHRoZSBtZXRob2Qgc2lnbmF0dXJlXG5leHBvcnQgY29uc3QgbG9jayA9IGFzeW5jICh1aWQ6IHN0cmluZykgPT4ge1xuICBpZiAocHJvbWlzZXNbdWlkXSkge1xuICAgIC8vIGNoZWNrIGlmIGxvY2sgZXhpc3RzXG4gICAgYXdhaXQgcHJvbWlzZXNbdWlkXSAvLyB3YWl0IG9uIGxvY2sgcHJvbWlzZVxuICAgIGF3YWl0IGxvY2sodWlkKSAvLyBzdGFjayBsb2NrIGNoZWNrIGFmdGVyIHByb21pc2UgcmVzb2x2ZXNcbiAgICByZXR1cm4gLy8gcHJldiBtZXRob2RzIGRvIG5vdGhpbmdcbiAgfVxuICAvLyB0aGVyZSBpcyBubyBsb2NrLCBzbyB3ZSdsbCBcImFjcXVpcmVcIiBpdCBoZXJlXG4gIHByb21pc2VzW3VpZF0gPSBuZXcgUHJvbWlzZShcbiAgICAocmVzb2x2ZSkgPT5cbiAgICAgIChyZXNvbHZlcnNbdWlkXSA9ICgpID0+IHtcbiAgICAgICAgZGVsZXRlIHByb21pc2VzW3VpZF0gLy8gcmVsZWFzZVxuICAgICAgICByZXNvbHZlKCkgLy8gcmVzb2x2ZVxuICAgICAgfSlcbiAgKVxufVxuZXhwb3J0IGNvbnN0IHVubG9jayA9ICh1aWQ6IHN0cmluZykgPT4ge1xuICBpZiAocmVzb2x2ZXJzW3VpZF0pIHtcbiAgICByZXNvbHZlcnNbdWlkXSEoKVxuICB9XG59XG4iLCAiaW1wb3J0IHR5cGUgeyBSZXF1ZXN0IH0gZnJvbSAnLi4vUmVxdWVzdC5qcydcblxuZXhwb3J0IGNsYXNzIENsb3VkZmxhcmVFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSAnY2xvdWRmbGFyZUVycm9yJ1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyByZWFkb25seSByZXNvbHV0aW9uUmVxdWVzdDogUmVxdWVzdCxcbiAgICBtZXNzYWdlOiBzdHJpbmcgPSAnQ2xvdWRmbGFyZSBieXBhc3MgaXMgcmVxdWlyZWQnXG4gICkge1xuICAgIHN1cGVyKG1lc3NhZ2UpXG4gIH1cbn1cbiIsICIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZHluYW1pYy1kZWxldGUgKi9cbmltcG9ydCB0eXBlIHsgQ29va2llIH0gZnJvbSAnLi4vQ29va2llLmpzJ1xuaW1wb3J0IHsgUGFwZXJiYWNrSW50ZXJjZXB0b3IgfSBmcm9tICcuL1BhcGVyYmFja0ludGVyY2VwdG9yLmpzJ1xuaW1wb3J0IHR5cGUgeyBSZXF1ZXN0IH0gZnJvbSAnLi4vUmVxdWVzdC5qcydcbmltcG9ydCB0eXBlIHsgUmVzcG9uc2UgfSBmcm9tICcuLi9SZXNwb25zZS5qcydcbmltcG9ydCB7IFVSTCB9IGZyb20gJy4vVVJMLmpzJ1xuXG50eXBlIENvb2tpZVN0b3JhZ2VPcHRpb25zID0ge1xuICBzdG9yYWdlOiAnc3RhdGVNYW5hZ2VyJyB8ICdtZW1vcnknXG59XG5cbmNvbnN0IGNvb2tpZVN0YXRlS2V5ID0gJ2Nvb2tpZV9zdG9yZV9jb29raWVzJ1xuXG5leHBvcnQgY2xhc3MgQ29va2llU3RvcmFnZUludGVyY2VwdG9yIGV4dGVuZHMgUGFwZXJiYWNrSW50ZXJjZXB0b3Ige1xuICBwcml2YXRlIF9jb29raWVzOiBSZWNvcmQ8c3RyaW5nLCBDb29raWU+ID0ge31cblxuICBnZXQgY29va2llcygpOiBSZWFkb25seTxDb29raWVbXT4ge1xuICAgIHJldHVybiBPYmplY3QuZnJlZXplKE9iamVjdC52YWx1ZXModGhpcy5fY29va2llcykpXG4gIH1cblxuICBzZXQgY29va2llcyhuZXdWYWx1ZTogQ29va2llW10pIHtcbiAgICBjb25zdCBjb29raWVzOiBSZWNvcmQ8c3RyaW5nLCBDb29raWU+ID0ge31cbiAgICBmb3IgKGNvbnN0IGNvb2tpZSBvZiBuZXdWYWx1ZSkge1xuICAgICAgLy8gSWYgdGhlIGNvb2tpZSBpcyBhbHJlYWR5IGV4cGlyZWQsIHNraXBcbiAgICAgIGlmICh0aGlzLmlzQ29va2llRXhwaXJlZChjb29raWUpKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIGNvb2tpZXNbdGhpcy5jb29raWVJZGVudGlmaWVyKGNvb2tpZSldID0gY29va2llXG4gICAgfVxuXG4gICAgdGhpcy5fY29va2llcyA9IGNvb2tpZXNcbiAgICB0aGlzLnNhdmVDb29raWVzVG9TdG9yYWdlKClcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBvcHRpb25zOiBDb29raWVTdG9yYWdlT3B0aW9ucykge1xuICAgIHN1cGVyKCdjb29raWVfc3RvcmUnKVxuICAgIHRoaXMubG9hZENvb2tpZXNGcm9tU3RvcmFnZSgpXG4gIH1cblxuICBhc3luYyBpbnRlcmNlcHRSZXF1ZXN0KHJlcXVlc3Q6IFJlcXVlc3QpOiBQcm9taXNlPFJlcXVlc3Q+IHtcbiAgICByZXF1ZXN0LmNvb2tpZXMgPSB7XG4gICAgICAvLyBBbHJlYWR5IHNldCBjb29raWVzXG4gICAgICAuLi4ocmVxdWVzdC5jb29raWVzID8/IHt9KSxcblxuICAgICAgLy8gSW5qZWN0IGFsbCB0aGUgY29va2llcyBhcyB7IG5hbWU6IHZhbHVlIH1cbiAgICAgIC4uLnRoaXMuY29va2llc0ZvclVybChyZXF1ZXN0LnVybCkucmVkdWNlKFxuICAgICAgICAodiwgYykgPT4ge1xuICAgICAgICAgIHZbYy5uYW1lXSA9IGMudmFsdWVcbiAgICAgICAgICByZXR1cm4gdlxuICAgICAgICB9LFxuICAgICAgICB7fSBhcyBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+XG4gICAgICApLFxuICAgIH1cblxuICAgIHJldHVybiByZXF1ZXN0XG4gIH1cblxuICBhc3luYyBpbnRlcmNlcHRSZXNwb25zZShcbiAgICByZXF1ZXN0OiBSZXF1ZXN0LFxuICAgIHJlc3BvbnNlOiBSZXNwb25zZSxcbiAgICBkYXRhOiBBcnJheUJ1ZmZlclxuICApOiBQcm9taXNlPEFycmF5QnVmZmVyPiB7XG4gICAgY29uc3QgY29va2llczogUmVjb3JkPHN0cmluZywgQ29va2llPiA9IHRoaXMuX2Nvb2tpZXNcblxuICAgIGZvciAoY29uc3QgY29va2llIG9mIHJlc3BvbnNlLmNvb2tpZXMpIHtcbiAgICAgIGNvbnN0IGlkZW50aWZpZXIgPSB0aGlzLmNvb2tpZUlkZW50aWZpZXIoY29va2llKVxuXG4gICAgICAvLyBJZiB0aGUgY29va2llIGlzIGFscmVhZHkgZXhwaXJlZCwgZGVsZXRlIGl0XG4gICAgICAvLyBVc3VhbGx5IGJhY2tlbmRzIFwiZGVsZXRlXCIgYSBjb29raWUgYnkgc2V0dGluZyBpdHNcbiAgICAgIC8vIGV4cGlyeSBpbiB0aGUgcGFzdFxuICAgICAgaWYgKHRoaXMuaXNDb29raWVFeHBpcmVkKGNvb2tpZSkpIHtcbiAgICAgICAgZGVsZXRlIGNvb2tpZXNbaWRlbnRpZmllcl1cbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgY29va2llc1tpZGVudGlmaWVyXSA9IGNvb2tpZVxuICAgIH1cblxuICAgIHRoaXMuX2Nvb2tpZXMgPSBjb29raWVzXG4gICAgdGhpcy5zYXZlQ29va2llc1RvU3RvcmFnZSgpXG5cbiAgICByZXR1cm4gZGF0YVxuICB9XG5cbiAgc2V0Q29va2llKGNvb2tpZTogQ29va2llKSB7XG4gICAgLy8gSWYgdGhlIGNvb2tpZSBpcyBhbHJlYWR5IGV4cGlyZWQsIHNraXBcbiAgICBpZiAodGhpcy5pc0Nvb2tpZUV4cGlyZWQoY29va2llKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgdGhpcy5fY29va2llc1t0aGlzLmNvb2tpZUlkZW50aWZpZXIoY29va2llKV0gPSBjb29raWVcbiAgICB0aGlzLnNhdmVDb29raWVzVG9TdG9yYWdlKClcbiAgfVxuXG4gIGRlbGV0ZUNvb2tpZShjb29raWU6IENvb2tpZSkge1xuICAgIGRlbGV0ZSB0aGlzLl9jb29raWVzW3RoaXMuY29va2llSWRlbnRpZmllcihjb29raWUpXVxuICB9XG5cbiAgY29va2llc0ZvclVybCh1cmxTdHJpbmc6IHN0cmluZyk6IENvb2tpZVtdIHtcbiAgICBjb25zb2xlLmxvZygnW0NPTVBBVF0gQ09PS0lFUyBGT1IgVVJMJylcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHVybFN0cmluZylcbiAgICBjb25zdCBob3N0bmFtZSA9IHVybC5ob3N0bmFtZVxuXG4gICAgaWYgKCFob3N0bmFtZSkge1xuICAgICAgcmV0dXJuIFtdXG4gICAgfVxuXG4gICAgY29uc3QgbWF0Y2hlZENvb2tpZXM6IFJlY29yZDxcbiAgICAgIHN0cmluZyxcbiAgICAgIHsgY29va2llOiBDb29raWU7IHBhdGhNYXRjaGVzOiBudW1iZXIgfVxuICAgID4gPSB7fVxuXG4gICAgY29uc3QgcGF0aG5hbWUgPSB1cmwucGF0aC5zdGFydHNXaXRoKCcvJykgPyB1cmwucGF0aCA6IGAvJHt1cmwucGF0aH1gXG5cbiAgICBjb25zdCBzcGxpdEhvc3RuYW1lID0gaG9zdG5hbWUuc3BsaXQoJy4nKVxuICAgIGNvbnN0IHNwbGl0VXJsUGF0aCA9IHBhdGhuYW1lLnNwbGl0KCcvJylcbiAgICBzcGxpdFVybFBhdGguc2hpZnQoKVxuXG4gICAgY29uc3QgY29va2llcyA9IHRoaXMuY29va2llc1xuICAgIGZvciAoY29uc3QgY29va2llIG9mIGNvb2tpZXMpIHtcbiAgICAgIGlmICh0aGlzLmlzQ29va2llRXhwaXJlZChjb29raWUpKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLl9jb29raWVzW3RoaXMuY29va2llSWRlbnRpZmllcihjb29raWUpXVxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICBjb25zdCBjb29raWVEb21haW4gPSB0aGlzLmNvb2tpZVNhbml0aXplZERvbWFpbihjb29raWUpXG4gICAgICBjb25zdCBzcGxpdENvb2tpZURvbWFpbiA9IGNvb2tpZURvbWFpbi5zcGxpdCgnLicpXG4gICAgICBpZiAoXG4gICAgICAgIHNwbGl0SG9zdG5hbWUubGVuZ3RoIDwgc3BsaXRDb29raWVEb21haW4ubGVuZ3RoIHx8XG4gICAgICAgIHNwbGl0Q29va2llRG9tYWluLmxlbmd0aCA9PSAwXG4gICAgICApIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgbGV0IGNvb2tpZURvbWFpbk1hdGNoZXMgPSB0cnVlXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNwbGl0Q29va2llRG9tYWluLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHNwbGl0Q29va2llSW5kZXggPSBzcGxpdENvb2tpZURvbWFpbi5sZW5ndGggLSAxIC0gaVxuICAgICAgICBjb25zdCBzcGxpdEhvc3RuYW1lSW5kZXggPSBzcGxpdEhvc3RuYW1lLmxlbmd0aCAtIDEgLSBpXG4gICAgICAgIGlmIChcbiAgICAgICAgICBzcGxpdENvb2tpZURvbWFpbltzcGxpdENvb2tpZUluZGV4XSAhPVxuICAgICAgICAgIHNwbGl0SG9zdG5hbWVbc3BsaXRIb3N0bmFtZUluZGV4XVxuICAgICAgICApIHtcbiAgICAgICAgICBjb29raWVEb21haW5NYXRjaGVzID0gZmFsc2VcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghY29va2llRG9tYWluTWF0Y2hlcykge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICBjb25zdCBjb29raWVQYXRoID0gdGhpcy5jb29raWVTYW5pdGl6ZWRQYXRoKGNvb2tpZSlcbiAgICAgIGNvbnN0IHNwbGl0Q29va2llUGF0aCA9IGNvb2tpZVBhdGguc3BsaXQoJy8nKVxuICAgICAgc3BsaXRDb29raWVQYXRoLnNoaWZ0KClcblxuICAgICAgbGV0IHBhdGhNYXRjaGVzID0gMFxuICAgICAgaWYgKHBhdGhuYW1lID09PSBjb29raWVQYXRoKSB7XG4gICAgICAgIHBhdGhNYXRjaGVzID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJcbiAgICAgIH0gZWxzZSBpZiAoc3BsaXRDb29raWVQYXRoLmxlbmd0aCA9PT0gMCB8fCBjb29raWVQYXRoID09PSAnLycpIHtcbiAgICAgICAgcGF0aE1hdGNoZXMgPSAxXG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBwYXRobmFtZS5zdGFydHNXaXRoKGNvb2tpZVBhdGgpICYmXG4gICAgICAgIHNwbGl0VXJsUGF0aC5sZW5ndGggPj0gc3BsaXRDb29raWVQYXRoLmxlbmd0aFxuICAgICAgKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3BsaXRDb29raWVQYXRoLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHNwbGl0Q29va2llUGF0aFtpXSA9PT0gc3BsaXRVcmxQYXRoW2ldKSB7XG4gICAgICAgICAgICBwYXRoTWF0Y2hlcyArPSAxXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXRoTWF0Y2hlcyA8PSAwKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIGlmICgobWF0Y2hlZENvb2tpZXNbY29va2llLm5hbWVdPy5wYXRoTWF0Y2hlcyA/PyAwKSA8IHBhdGhNYXRjaGVzKSB7XG4gICAgICAgIG1hdGNoZWRDb29raWVzW2Nvb2tpZS5uYW1lXSA9IHsgY29va2llLCBwYXRoTWF0Y2hlcyB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIE9iamVjdC52YWx1ZXMobWF0Y2hlZENvb2tpZXMpLm1hcCgoeCkgPT4geC5jb29raWUpXG4gIH1cblxuICBwcml2YXRlIGNvb2tpZUlkZW50aWZpZXIoY29va2llOiBDb29raWUpOiBzdHJpbmcge1xuICAgIHJldHVybiBgJHtjb29raWUubmFtZX0tJHt0aGlzLmNvb2tpZVNhbml0aXplZERvbWFpbihcbiAgICAgIGNvb2tpZVxuICAgICl9LSR7dGhpcy5jb29raWVTYW5pdGl6ZWRQYXRoKGNvb2tpZSl9YFxuICB9XG5cbiAgcHJpdmF0ZSBjb29raWVTYW5pdGl6ZWRQYXRoKGNvb2tpZTogQ29va2llKTogc3RyaW5nIHtcbiAgICByZXR1cm4gY29va2llLnBhdGg/LnN0YXJ0c1dpdGgoJy8nKVxuICAgICAgPyBjb29raWUucGF0aFxuICAgICAgOiAnLycgKyAoY29va2llLnBhdGggPz8gJycpXG4gIH1cblxuICBwcml2YXRlIGNvb2tpZVNhbml0aXplZERvbWFpbihjb29raWU6IENvb2tpZSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGNvb2tpZS5kb21haW4ucmVwbGFjZSgvXih3d3cpP1xcLj8vZ2ksICcnKS50b0xvd2VyQ2FzZSgpXG4gIH1cblxuICBwcml2YXRlIGlzQ29va2llRXhwaXJlZChjb29raWU6IENvb2tpZSk6IGJvb2xlYW4ge1xuICAgIGlmIChjb29raWUuZXhwaXJlcyAmJiBjb29raWUuZXhwaXJlcy5nZXRUaW1lKCkgPD0gRGF0ZS5ub3coKSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBsb2FkQ29va2llc0Zyb21TdG9yYWdlKCkge1xuICAgIC8vIElmIHRoaXMgc3RvcmVzIGluIG1lbW9yeSwgd2UgcHJvYmFibHkgYWxyZWFkeSBoYXZlIHRoZSBsYXRlc3QgY29va2llc1xuICAgIGlmICh0aGlzLm9wdGlvbnMuc3RvcmFnZSA9PSAnbWVtb3J5JykgcmV0dXJuXG5cbiAgICBjb25zdCBjb29raWVEYXRhID0gQXBwbGljYXRpb24uZ2V0U3RhdGUoY29va2llU3RhdGVLZXkpIGFzXG4gICAgICB8IENvb2tpZVtdXG4gICAgICB8IHVuZGVmaW5lZFxuICAgIGlmICghY29va2llRGF0YSkge1xuICAgICAgdGhpcy5fY29va2llcyA9IHt9XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBjb29raWVzOiBSZWNvcmQ8c3RyaW5nLCBDb29raWU+ID0ge31cbiAgICBmb3IgKGNvbnN0IGNvb2tpZSBvZiBjb29raWVEYXRhKSB7XG4gICAgICAvLyBpZ25vcmUgc2Vzc2lvbiBjb29raWVzIGFuZCBleHBpcmVkIGNvb2tpZXNcbiAgICAgIGlmICghY29va2llLmV4cGlyZXMgfHwgdGhpcy5pc0Nvb2tpZUV4cGlyZWQoY29va2llKSkgY29udGludWVcblxuICAgICAgY29va2llc1t0aGlzLmNvb2tpZUlkZW50aWZpZXIoY29va2llKV0gPSBjb29raWVcbiAgICB9XG5cbiAgICB0aGlzLl9jb29raWVzID0gY29va2llc1xuICB9XG5cbiAgcHJpdmF0ZSBzYXZlQ29va2llc1RvU3RvcmFnZSgpIHtcbiAgICAvLyBJZiB0aGlzIHN0b3JlcyBpbiBtZW1vcnksIHdlIHByb2JhYmx5IGFscmVhZHkgaGF2ZSB0aGUgbGF0ZXN0IGNvb2tpZXNcbiAgICBpZiAodGhpcy5vcHRpb25zLnN0b3JhZ2UgPT0gJ21lbW9yeScpIHJldHVyblxuXG4gICAgLy8gVE9ETzogaGFuZGxlIHNlY3VyZSBjb29raWVzIGRpZmZlcmVudGx5IG1heWJlP1xuICAgIEFwcGxpY2F0aW9uLnNldFN0YXRlKFxuICAgICAgdGhpcy5jb29raWVzLmZpbHRlcigoeCkgPT4geC5leHBpcmVzKSxcbiAgICAgIGNvb2tpZVN0YXRlS2V5XG4gICAgKVxuICB9XG59XG5cbi8qKlxuICogXG4gKiAgVGVzdCBjYXNlcyBmb3IgdGVzdGluZyBjb29raWVzIGFyZSBiZWhhdmluZyBhcyBleHBlY3RlZFxuICogXG5cbmZ1bmN0aW9uIGFzc2VydChhOiBib29sZWFuLCBtc2c6IHN0cmluZykge1xuICAgIGlmKCFhKSB7XG4gICAgICAgIHRocm93IG1zZ1xuICAgIH1cbn1cblxuKGZ1bmN0aW9uIHJ1blRlc3RzKCkge1xuICBjb25zdCBjb29raWVTdG9yYWdlID0gbmV3IENvb2tpZVN0b3JhZ2VJbnRlcmNlcHRvcigpO1xuICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuXG4gIC8vIFRlc3QgMTogQmFzaWMgc2V0IGFuZCByZXRyaWV2YWxcbiAgY29uc3QgY29va2llMTogQ29va2llID0ge1xuICAgIG5hbWU6IFwic2Vzc2lvbklkXCIsXG4gICAgdmFsdWU6IFwiYWJjMTIzXCIsXG4gICAgZG9tYWluOiBcImV4YW1wbGUuY29tXCIsXG4gICAgcGF0aDogXCIvXCIsXG4gICAgZXhwaXJlczogbmV3IERhdGUobm93ICsgMTAwMDApIC8vIGV4cGlyZXMgaW4gMTAgc2Vjb25kc1xuICB9O1xuICBjb29raWVTdG9yYWdlLnNldENvb2tpZShjb29raWUxKTtcbiAgbGV0IGNvb2tpZXMgPSBjb29raWVTdG9yYWdlLmNvb2tpZXNGb3JVcmwoXCJodHRwOi8vZXhhbXBsZS5jb20vXCIpO1xuICBhc3NlcnQoY29va2llcy5sZW5ndGggPT09IDEsIFwiU2hvdWxkIHJldHJpZXZlIG9uZSBjb29raWUgZm9yIGV4YW1wbGUuY29tIHJvb3RcIik7XG5cbiAgLy8gVGVzdCAyOiBEb21haW4gbWF0Y2hpbmcgd2l0aCBzdWJkb21haW4gKFJGQyA2MjY1OiBkb21haW4tbWF0Y2gpXG4gIGNvbnN0IGNvb2tpZTI6IENvb2tpZSA9IHtcbiAgICBuYW1lOiBcInVzZXJcIixcbiAgICB2YWx1ZTogXCJqb2huXCIsXG4gICAgZG9tYWluOiBcImV4YW1wbGUuY29tXCIsXG4gICAgcGF0aDogXCIvXCIsXG4gICAgZXhwaXJlczogbmV3IERhdGUobm93ICsgMTAwMDApXG4gIH07XG4gIGNvb2tpZVN0b3JhZ2Uuc2V0Q29va2llKGNvb2tpZTIpO1xuICBjb29raWVzID0gY29va2llU3RvcmFnZS5jb29raWVzRm9yVXJsKFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbS9cIik7XG4gIGFzc2VydChcbiAgICBjb29raWVzLnNvbWUoYyA9PiBjLm5hbWUgPT09IFwidXNlclwiKSxcbiAgICBcIkNvb2tpZSB3aXRoIGRvbWFpbiBleGFtcGxlLmNvbSBzaG91bGQgbWF0Y2ggd3d3LmV4YW1wbGUuY29tXCJcbiAgKTtcblxuICAvLyBUZXN0IDM6IFBhdGggbWF0Y2hpbmdcbiAgY29uc3QgY29va2llMzogQ29va2llID0ge1xuICAgIG5hbWU6IFwicHJlZlwiLFxuICAgIHZhbHVlOiBcImRhcmtcIixcbiAgICBkb21haW46IFwiZXhhbXBsZS5jb21cIixcbiAgICBwYXRoOiBcIi9kb2NzXCIsXG4gICAgZXhwaXJlczogbmV3IERhdGUobm93ICsgMTAwMDApXG4gIH07XG4gIGNvb2tpZVN0b3JhZ2Uuc2V0Q29va2llKGNvb2tpZTMpO1xuICBjb29raWVzID0gY29va2llU3RvcmFnZS5jb29raWVzRm9yVXJsKFwiaHR0cDovL2V4YW1wbGUuY29tL2RvY3MvaW5kZXguaHRtbFwiKTtcbiAgYXNzZXJ0KFxuICAgIGNvb2tpZXMuc29tZShjID0+IGMubmFtZSA9PT0gXCJwcmVmXCIpLFxuICAgIFwiQ29va2llIHdpdGggcGF0aCAvZG9jcyBzaG91bGQgbWF0Y2ggL2RvY3MvaW5kZXguaHRtbFwiXG4gICk7XG4gIGNvb2tpZXMgPSBjb29raWVTdG9yYWdlLmNvb2tpZXNGb3JVcmwoXCJodHRwOi8vZXhhbXBsZS5jb20vYWJvdXRcIik7XG4gIGFzc2VydChcbiAgICAhY29va2llcy5zb21lKGMgPT4gYy5uYW1lID09PSBcInByZWZcIiksXG4gICAgXCJDb29raWUgd2l0aCBwYXRoIC9kb2NzIHNob3VsZCBub3QgbWF0Y2ggL2Fib3V0XCJcbiAgKTtcblxuICAvLyBUZXN0IDQ6IEV4cGlyZWQgY29va2llIHNob3VsZCBub3QgYmUgc3RvcmVkIG9yIHJldHVybmVkXG4gIGNvbnN0IGNvb2tpZTQ6IENvb2tpZSA9IHtcbiAgICBuYW1lOiBcImV4cGlyZWRcIixcbiAgICB2YWx1ZTogXCJvbGRcIixcbiAgICBkb21haW46IFwiZXhhbXBsZS5jb21cIixcbiAgICBwYXRoOiBcIi9cIixcbiAgICBleHBpcmVzOiBuZXcgRGF0ZShub3cgLSAxMDAwMCkgLy8gZXhwaXJlZCAxMCBzZWNvbmRzIGFnb1xuICB9O1xuICBjb29raWVTdG9yYWdlLnNldENvb2tpZShjb29raWU0KTtcbiAgY29va2llcyA9IGNvb2tpZVN0b3JhZ2UuY29va2llc0ZvclVybChcImh0dHA6Ly9leGFtcGxlLmNvbS9cIik7XG4gIGFzc2VydChcbiAgICAhY29va2llcy5zb21lKGMgPT4gYy5uYW1lID09PSBcImV4cGlyZWRcIiksXG4gICAgXCJFeHBpcmVkIGNvb2tpZSBzaG91bGQgbm90IGJlIHJldHVybmVkXCJcbiAgKTtcblxuICAvLyBUZXN0IDU6IENvb2tpZSBvdmVyd3JpdGluZyBiYXNlZCBvbiBwYXRoIHNwZWNpZmljaXR5XG4gIC8vIENvb2tpZSB3aXRoIG5hbWUgXCJpZFwiIGFuZCBwYXRoIFwiL1wiIChsZXNzIHNwZWNpZmljKVxuICBjb25zdCBjb29raWVBOiBDb29raWUgPSB7XG4gICAgbmFtZTogXCJpZFwiLFxuICAgIHZhbHVlOiBcIkFcIixcbiAgICBkb21haW46IFwiZXhhbXBsZS5jb21cIixcbiAgICBwYXRoOiBcIi9cIixcbiAgICBleHBpcmVzOiBuZXcgRGF0ZShub3cgKyAxMDAwMClcbiAgfTtcbiAgLy8gQ29va2llIHdpdGggdGhlIHNhbWUgbmFtZSBidXQgYSBtb3JlIHNwZWNpZmljIHBhdGggXCIvZG9jc1wiXG4gIGNvbnN0IGNvb2tpZUI6IENvb2tpZSA9IHtcbiAgICBuYW1lOiBcImlkXCIsXG4gICAgdmFsdWU6IFwiQlwiLFxuICAgIGRvbWFpbjogXCJleGFtcGxlLmNvbVwiLFxuICAgIHBhdGg6IFwiL2RvY3NcIixcbiAgICBleHBpcmVzOiBuZXcgRGF0ZShub3cgKyAxMDAwMClcbiAgfTtcbiAgY29va2llU3RvcmFnZS5zZXRDb29raWUoY29va2llQSk7XG4gIGNvb2tpZVN0b3JhZ2Uuc2V0Q29va2llKGNvb2tpZUIpO1xuICBjb29raWVzID0gY29va2llU3RvcmFnZS5jb29raWVzRm9yVXJsKFwiaHR0cDovL2V4YW1wbGUuY29tL2RvY3NcIik7XG4gIGNvbnN0IGNvb2tpZUlkID0gY29va2llcy5maW5kKGMgPT4gYy5uYW1lID09PSBcImlkXCIpO1xuICBhc3NlcnQoXG4gICAgY29va2llSWQ/LnZhbHVlID09PSBcIkJcIixcbiAgICBcIk1vcmUgc3BlY2lmaWMgY29va2llIHNob3VsZCBiZSByZXR1cm5lZCBmb3IgVVJMIC9kb2NzXCJcbiAgKTtcblxuICAvLyBUZXN0IDY6IERlbGV0aW5nIGEgY29va2llXG4gIGNvb2tpZVN0b3JhZ2UuZGVsZXRlQ29va2llKGNvb2tpZUIpO1xuICBjb29raWVzID0gY29va2llU3RvcmFnZS5jb29raWVzRm9yVXJsKFwiaHR0cDovL2V4YW1wbGUuY29tL2RvY3NcIik7XG4gIGNvbnN0IGNvb2tpZUlkQWZ0ZXJEZWxldGUgPSBjb29raWVzLmZpbmQoYyA9PiBjLm5hbWUgPT09IFwiaWRcIik7XG4gIGFzc2VydChcbiAgICBjb29raWVJZEFmdGVyRGVsZXRlPy52YWx1ZSA9PT0gXCJBXCIsXG4gICAgXCJBZnRlciBkZWxldGlvbiBvZiB0aGUgc3BlY2lmaWMgY29va2llLCB0aGUgbGVzcyBzcGVjaWZpYyBjb29raWUgc2hvdWxkIGJlIHJldHVybmVkXCJcbiAgKTtcblxuICAvLyBUZXN0IDc6IFVzaW5nIHRoZSBjb29raWVzIHNldHRlciAoZXhwaXJlZCBjb29raWVzIGZpbHRlcmVkIG91dClcbiAgY29va2llU3RvcmFnZS5jb29raWVzID0gW2Nvb2tpZTEsIGNvb2tpZTRdOyAvLyBjb29raWU0IGlzIGV4cGlyZWRcbiAgY29uc3Qgc3RvcmVkQ29va2llcyA9IGNvb2tpZVN0b3JhZ2UuY29va2llcztcbiAgYXNzZXJ0KFxuICAgIHN0b3JlZENvb2tpZXMuc29tZShjID0+IGMubmFtZSA9PT0gXCJzZXNzaW9uSWRcIiksXG4gICAgXCJzZXNzaW9uSWQgY29va2llIHNob3VsZCBiZSBzdG9yZWQgdmlhIHNldHRlclwiXG4gICk7XG4gIGFzc2VydChcbiAgICAhc3RvcmVkQ29va2llcy5zb21lKGMgPT4gYy5uYW1lID09PSBcImV4cGlyZWRcIiksXG4gICAgXCJFeHBpcmVkIGNvb2tpZSBzaG91bGQgYmUgZmlsdGVyZWQgb3V0IGluIHRoZSBzZXR0ZXJcIlxuICApO1xuXG4gIGNvbnNvbGUubG9nKFwiQWxsIHRlc3RzIHBhc3NlZCBzdWNjZXNzZnVsbHkuXCIpO1xufSkoKTtcbiAqL1xuIiwgIi8qKlxuICogSW50ZXJuYWwgbWV0aG9kIHRvIHBhcnNlIGEgVVJMIHN0cmluZyBhbmQgdXBkYXRlIHRoZSBjdXJyZW50IGNvbXBvbmVudHMuXG4gKlxuICogQHBhcmFtIHVybCAtIFRoZSBVUkwgc3RyaW5nIHRvIHBhcnNlLlxuICogQHBhcmFtIHBhcnRpYWwgLSBJZiB0cnVlLCBvbmx5IHVwZGF0ZSBjb21wb25lbnRzIHByZXNlbnQgaW4gdGhlIGlucHV0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VVUkwodXJsOiBzdHJpbmcpOiBVUkxDb21wb25lbnRzIHtcbiAgY29uc3QgY29tcG9uZW50czogVVJMQ29tcG9uZW50cyA9IHt9XG5cbiAgLy8gUmVndWxhciBleHByZXNzaW9uIHVzaW5nIG51bWJlcmVkIGNhcHR1cmUgZ3JvdXBzLlxuICAvLyBDYXB0dXJlIGdyb3VwczpcbiAgLy8gICAxOiBwcm90b2NvbCwgMjogYXV0aG9yaXR5LCAzOiBwYXRobmFtZSwgNDogcXVlcnksIDU6IGhhc2guXG4gIGNvbnN0IHJlZ2V4ID1cbiAgICAvXig/OihbYS16QS1aXVthLXpBLVpcXGQrXFwtLl0qKTopPyg/OlxcL1xcLyhbXi8/I10qKSk/KFtePyNdKikoPzpcXD8oW14jXSopKT8oPzojKC4qKSk/JC9cbiAgY29uc3QgbWF0Y2ggPSB1cmwubWF0Y2gocmVnZXgpXG4gIGlmICghbWF0Y2gpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgVVJMIHN0cmluZyBwcm92aWRlZC4nKVxuICB9XG5cbiAgLy8gT25seSB1cGRhdGUgYSBjb21wb25lbnQgaWYgdGhlIGNhcHR1cmUgZ3JvdXAgaXMgZGVmaW5lZCBhbmQgKGZvciBzb21lIGNvbXBvbmVudHMpIG5vbi1lbXB0eS5cbiAgaWYgKG1hdGNoWzFdICE9PSB1bmRlZmluZWQgJiYgbWF0Y2hbMV0gIT09ICcnKSB7XG4gICAgY29tcG9uZW50cy5wcm90b2NvbCA9IG1hdGNoWzFdXG4gIH1cblxuICBpZiAobWF0Y2hbMl0gIT09IHVuZGVmaW5lZCAmJiBtYXRjaFsyXSAhPT0gJycpIHtcbiAgICAvLyBQYXJzZSBhdXRob3JpdHkgaW50byB1c2VybmFtZSwgcGFzc3dvcmQsIGhvc3RuYW1lLCBhbmQgcG9ydC5cbiAgICBjb25zdCBhdXRob3JpdHkgPSBtYXRjaFsyXVxuICAgIGxldCB1c2VySW5mbyA9ICcnXG4gICAgbGV0IGhvc3RQb3J0ID0gJydcbiAgICBjb25zdCBhdEluZGV4ID0gYXV0aG9yaXR5LmluZGV4T2YoJ0AnKVxuICAgIGlmIChhdEluZGV4ICE9PSAtMSkge1xuICAgICAgdXNlckluZm8gPSBhdXRob3JpdHkuc3Vic3RyaW5nKDAsIGF0SW5kZXgpXG4gICAgICBob3N0UG9ydCA9IGF1dGhvcml0eS5zdWJzdHJpbmcoYXRJbmRleCArIDEpXG4gICAgICBpZiAodXNlckluZm8gIT09ICcnKSB7XG4gICAgICAgIGNvbnN0IGNvbG9uSW5kZXggPSB1c2VySW5mby5pbmRleE9mKCc6JylcbiAgICAgICAgaWYgKGNvbG9uSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgY29tcG9uZW50cy51c2VybmFtZSA9IHVzZXJJbmZvLnN1YnN0cmluZygwLCBjb2xvbkluZGV4KVxuICAgICAgICAgIGNvbXBvbmVudHMucGFzc3dvcmQgPSB1c2VySW5mby5zdWJzdHJpbmcoY29sb25JbmRleCArIDEpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29tcG9uZW50cy51c2VybmFtZSA9IHVzZXJJbmZvXG4gICAgICAgICAgY29tcG9uZW50cy5wYXNzd29yZCA9ICcnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaG9zdFBvcnQgPSBhdXRob3JpdHlcbiAgICB9XG5cbiAgICBpZiAoaG9zdFBvcnQgIT09ICcnKSB7XG4gICAgICBpZiAoaG9zdFBvcnQuc3RhcnRzV2l0aCgnWycpKSB7XG4gICAgICAgIGNvbnN0IGNsb3NpbmdCcmFja2V0SW5kZXggPSBob3N0UG9ydC5pbmRleE9mKCddJylcbiAgICAgICAgaWYgKGNsb3NpbmdCcmFja2V0SW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIElQdjYgYWRkcmVzcyBpbiBVUkwgdXBkYXRlLicpXG4gICAgICAgIH1cbiAgICAgICAgY29tcG9uZW50cy5ob3N0bmFtZSA9IGhvc3RQb3J0LnN1YnN0cmluZygwLCBjbG9zaW5nQnJhY2tldEluZGV4ICsgMSlcbiAgICAgICAgY29uc3QgcG9ydFBhcnQgPSBob3N0UG9ydC5zdWJzdHJpbmcoY2xvc2luZ0JyYWNrZXRJbmRleCArIDEpXG4gICAgICAgIGlmIChwb3J0UGFydC5zdGFydHNXaXRoKCc6JykpIHtcbiAgICAgICAgICBjb21wb25lbnRzLnBvcnQgPSBwb3J0UGFydC5zdWJzdHJpbmcoMSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgY29sb25JbmRleCA9IGhvc3RQb3J0Lmxhc3RJbmRleE9mKCc6JylcbiAgICAgICAgaWYgKGNvbG9uSW5kZXggIT09IC0xICYmIGhvc3RQb3J0LmluZGV4T2YoJzonKSA9PT0gY29sb25JbmRleCkge1xuICAgICAgICAgIGNvbXBvbmVudHMuaG9zdG5hbWUgPSBob3N0UG9ydC5zdWJzdHJpbmcoMCwgY29sb25JbmRleClcbiAgICAgICAgICBjb21wb25lbnRzLnBvcnQgPSBob3N0UG9ydC5zdWJzdHJpbmcoY29sb25JbmRleCArIDEpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29tcG9uZW50cy5ob3N0bmFtZSA9IGhvc3RQb3J0XG4gICAgICAgICAgY29tcG9uZW50cy5wb3J0ID0gJydcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIFBhdGhuYW1lLlxuICBpZiAobWF0Y2hbM10gIT09IHVuZGVmaW5lZCAmJiBtYXRjaFszXSAhPT0gJycpIHtcbiAgICBjb21wb25lbnRzLnBhdGggPSBtYXRjaFszXS5zdGFydHNXaXRoKCcvJykgPyBtYXRjaFszXSA6IGAvJHttYXRjaFszXX1gXG4gIH1cblxuICAvLyBRdWVyeS5cbiAgaWYgKG1hdGNoWzRdICE9PSB1bmRlZmluZWQpIHtcbiAgICBjb25zdCBxdWVyeTogUmVjb3JkPHN0cmluZywgc3RyaW5nIHwgc3RyaW5nW10+ID0ge31cbiAgICBjb25zdCBwYWlycyA9IG1hdGNoWzRdLnNwbGl0KCcmJylcbiAgICBmb3IgKGNvbnN0IHBhaXIgb2YgcGFpcnMpIHtcbiAgICAgIGlmICghcGFpcikgY29udGludWVcbiAgICAgIGNvbnN0IFtyYXdLZXksIHJhd1ZhbHVlID0gJyddID0gcGFpci5zcGxpdCgnPScpXG4gICAgICBpZiAocmF3S2V5ID09PSB1bmRlZmluZWQpIGNvbnRpbnVlIC8vIFNraXAgaWYgbm8ga2V5IGZvdW5kXG4gICAgICBjb25zdCBrZXkgPSBkZWNvZGVVUklDb21wb25lbnQocmF3S2V5KVxuICAgICAgY29uc3QgdmFsdWUgPSBkZWNvZGVVUklDb21wb25lbnQocmF3VmFsdWUpXG4gICAgICBpZiAoa2V5IGluIHF1ZXJ5KSB7XG4gICAgICAgIGNvbnN0IGV4aXN0aW5nID0gcXVlcnlba2V5XSEgLy8gTm9uLW51bGwgYXNzZXJ0aW9uIHNpbmNlIHdlIGtub3cga2V5IGV4aXN0c1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShleGlzdGluZykpIHtcbiAgICAgICAgICBleGlzdGluZy5wdXNoKHZhbHVlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHF1ZXJ5W2tleV0gPSBbZXhpc3RpbmcsIHZhbHVlXVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBxdWVyeVtrZXldID0gdmFsdWVcbiAgICAgIH1cbiAgICB9XG4gICAgY29tcG9uZW50cy5xdWVyeUl0ZW1zID0gcXVlcnlcbiAgfVxuXG4gIC8vIEhhc2guXG4gIGlmIChtYXRjaFs1XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgY29tcG9uZW50cy5mcmFnbWVudCA9IG1hdGNoWzVdXG4gIH1cblxuICByZXR1cm4gY29tcG9uZW50c1xufVxuXG4vKipcbiAqIEFuIGludGVyZmFjZSByZXByZXNlbnRpbmcgdGhlIGNvbXBvbmVudHMgb2YgYSBVUkwuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVVJMQ29tcG9uZW50cyB7XG4gIHByb3RvY29sPzogc3RyaW5nIC8vIGUuZy4sIFwiaHR0cHM6XCJcbiAgdXNlcm5hbWU/OiBzdHJpbmdcbiAgcGFzc3dvcmQ/OiBzdHJpbmdcbiAgaG9zdG5hbWU/OiBzdHJpbmdcbiAgcG9ydD86IHN0cmluZ1xuICBwYXRoPzogc3RyaW5nXG4gIHF1ZXJ5SXRlbXM/OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmcgfCBzdHJpbmdbXT5cbiAgZnJhZ21lbnQ/OiBzdHJpbmcgLy8gZS5nLiwgXCIjc2VjdGlvblwiXG59XG5cbi8qKlxuICogQSBjbGFzcyBmb3IgcGFyc2luZywgdXBkYXRpbmcsIGFuZCBidWlsZGluZyBVUkxzLlxuICpcbiAqIFRoZSBjbGFzcyBkb2VzIG5vdCB1c2UgdGhlIGJ1aWx0XHUyMDExaW4gVVJMIGNsYXNzIG9yIG5hbWVkIHJlZ2V4IGNhcHR1cmUgZ3JvdXBzLlxuICovXG5leHBvcnQgY2xhc3MgVVJMIHtcbiAgcHJvdG9jb2w6IHN0cmluZ1xuICBob3N0bmFtZTogc3RyaW5nXG4gIHBhdGg6IHN0cmluZ1xuXG4gIHVzZXJuYW1lPzogc3RyaW5nXG4gIHBhc3N3b3JkPzogc3RyaW5nXG4gIHBvcnQ/OiBzdHJpbmdcbiAgcXVlcnlJdGVtcz86IFJlY29yZDxzdHJpbmcsIHN0cmluZyB8IHN0cmluZ1tdPiB8IHVuZGVmaW5lZFxuICBmcmFnbWVudD86IHN0cmluZ1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IFNpbXBsZVVSTCBpbnN0YW5jZS5cbiAgICogQHBhcmFtIHVybCAtIChPcHRpb25hbCkgQSBVUkwgc3RyaW5nIHRvIGluaXRpYWxpemUgdGhlIGluc3RhbmNlLlxuICAgKi9cbiAgY29uc3RydWN0b3IodXJsOiBzdHJpbmcpIHtcbiAgICBjb25zdCBjb21wb25lbnRzID0gcGFyc2VVUkwodXJsKVxuXG4gICAgaWYgKCFjb21wb25lbnRzLmhvc3RuYW1lIHx8ICFjb21wb25lbnRzLnByb3RvY29sKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VSTCBIb3N0bmFtZSBhbmQgUHJvdG9jb2wgYXJlIHJlcXVpcmVkJylcbiAgICB9XG5cbiAgICB0aGlzLmhvc3RuYW1lID0gY29tcG9uZW50cy5ob3N0bmFtZVxuICAgIHRoaXMucHJvdG9jb2wgPSBjb21wb25lbnRzLnByb3RvY29sXG4gICAgdGhpcy5wYXRoID0gY29tcG9uZW50cy5wYXRoID8/ICcnXG4gICAgdGhpcy51c2VybmFtZSA9IGNvbXBvbmVudHMudXNlcm5hbWVcbiAgICB0aGlzLnBhc3N3b3JkID0gY29tcG9uZW50cy5wYXNzd29yZFxuICAgIHRoaXMucG9ydCA9IGNvbXBvbmVudHMucG9ydFxuICAgIHRoaXMucXVlcnlJdGVtcyA9IGNvbXBvbmVudHMucXVlcnlJdGVtc1xuICAgIHRoaXMuZnJhZ21lbnQgPSBjb21wb25lbnRzLmZyYWdtZW50XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZnVsbCBVUkwgc3RyaW5nIGJ1aWx0IGZyb20gdGhlIGN1cnJlbnQgY29tcG9uZW50cy5cbiAgICovXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgbGV0IHVybCA9IGAke3RoaXMucHJvdG9jb2x9Oi8vYFxuXG4gICAgLy8gQXBwZW5kIHVzZXIgaW5mbyBpZiBhdmFpbGFibGUuXG4gICAgaWYgKHRoaXMudXNlcm5hbWUgIT09IHVuZGVmaW5lZCAmJiB0aGlzLnVzZXJuYW1lICE9PSAnJykge1xuICAgICAgdXJsICs9IHRoaXMudXNlcm5hbWVcbiAgICAgIGlmICh0aGlzLnBhc3N3b3JkICE9PSB1bmRlZmluZWQgJiYgdGhpcy5wYXNzd29yZCAhPT0gJycpIHtcbiAgICAgICAgdXJsICs9IGA6JHt0aGlzLnBhc3N3b3JkfWBcbiAgICAgIH1cbiAgICAgIHVybCArPSAnQCdcbiAgICB9XG5cbiAgICB1cmwgKz0gdGhpcy5ob3N0bmFtZVxuXG4gICAgaWYgKHRoaXMucG9ydCAhPT0gdW5kZWZpbmVkICYmIHRoaXMucG9ydCAhPT0gJycpIHtcbiAgICAgIHVybCArPSBgOiR7dGhpcy5wb3J0fWBcbiAgICB9XG5cbiAgICAvLyBQYXRobmFtZS5cbiAgICBpZiAodGhpcy5wYXRoICE9PSAnJykge1xuICAgICAgdXJsICs9IHRoaXMucGF0aC5zdGFydHNXaXRoKCcvJykgPyB0aGlzLnBhdGggOiBgLyR7dGhpcy5wYXRofWBcbiAgICB9XG5cbiAgICBpZiAodGhpcy5xdWVyeUl0ZW1zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIFF1ZXJ5IHN0cmluZy5cbiAgICAgIGNvbnN0IHF1ZXJ5S2V5cyA9IE9iamVjdC5rZXlzKHRoaXMucXVlcnlJdGVtcylcbiAgICAgIGNvbnN0IHBhcmFtczogc3RyaW5nW10gPSBbXVxuICAgICAgaWYgKHF1ZXJ5S2V5cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIHF1ZXJ5S2V5cykge1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5xdWVyeUl0ZW1zW2tleV1cbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdiBvZiB2YWx1ZSkge1xuICAgICAgICAgICAgICBwYXJhbXMucHVzaChgJHtlbmNvZGVVUklDb21wb25lbnQoa2V5KX09JHtlbmNvZGVVUklDb21wb25lbnQodil9YClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHBhcmFtcy5wdXNoKFxuICAgICAgICAgICAgICBgJHtlbmNvZGVVUklDb21wb25lbnQoa2V5KX09JHtlbmNvZGVVUklDb21wb25lbnQodmFsdWUpfWBcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHVybCArPSBgPyR7cGFyYW1zLmpvaW4oJyYnKX1gXG4gICAgfVxuXG4gICAgLy8gSGFzaCAoZnJhZ21lbnQpLlxuICAgIGlmICh0aGlzLmZyYWdtZW50ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHVybCArPSBgIyR7dGhpcy5mcmFnbWVudH1gXG4gICAgfVxuXG4gICAgcmV0dXJuIHVybFxuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlbmllbmNlIG1ldGhvZCB0byB1cGRhdGUgdGhlIHByb3RvY29sLlxuICAgKi9cbiAgc2V0UHJvdG9jb2wobmV3UHJvdG9jb2w6IHN0cmluZyk6IHRoaXMge1xuICAgIGlmIChuZXdQcm90b2NvbCA9PT0gJycpIHRocm93IG5ldyBFcnJvcignUHJvdG9jb2wgaXMgcmVxdWlyZWQnKVxuXG4gICAgdGhpcy5wcm90b2NvbCA9IG5ld1Byb3RvY29sXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZW5pZW5jZSBtZXRob2QgdG8gdXBkYXRlIHRoZSB1c2VybmFtZS5cbiAgICovXG4gIHNldFVzZXJuYW1lKG5ld1VzZXJuYW1lPzogc3RyaW5nKTogdGhpcyB7XG4gICAgaWYgKG5ld1VzZXJuYW1lID09PSAnJykgdGhpcy51c2VybmFtZSA9IHVuZGVmaW5lZFxuICAgIGVsc2UgdGhpcy51c2VybmFtZSA9IG5ld1VzZXJuYW1lXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZW5pZW5jZSBtZXRob2QgdG8gdXBkYXRlIHRoZSBwYXNzd29yZC5cbiAgICovXG4gIHNldFBhc3N3b3JkKG5ld1Bhc3N3b3JkPzogc3RyaW5nKTogdGhpcyB7XG4gICAgaWYgKG5ld1Bhc3N3b3JkID09PSAnJykgdGhpcy5wYXNzd29yZCA9IHVuZGVmaW5lZFxuICAgIGVsc2UgdGhpcy5wYXNzd29yZCA9IG5ld1Bhc3N3b3JkXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlbmllbmNlIG1ldGhvZCB0byB1cGRhdGUgdGhlIGhvc3RuYW1lLlxuICAgKi9cbiAgc2V0SG9zdG5hbWUobmV3SG9zdG5hbWU6IHN0cmluZyk6IHRoaXMge1xuICAgIGlmIChuZXdIb3N0bmFtZSA9PT0gJycpIHRocm93IG5ldyBFcnJvcignSG9zdG5hbWUgaXMgcmVxdWlyZWQnKVxuXG4gICAgdGhpcy5ob3N0bmFtZSA9IG5ld0hvc3RuYW1lXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZW5pZW5jZSBtZXRob2QgdG8gdXBkYXRlIHRoZSBwb3J0LlxuICAgKi9cbiAgc2V0UG9ydChuZXdQb3J0Pzogc3RyaW5nKTogdGhpcyB7XG4gICAgaWYgKG5ld1BvcnQgPT09ICcnKSB0aGlzLnBvcnQgPSB1bmRlZmluZWRcbiAgICBlbHNlIHRoaXMucG9ydCA9IG5ld1BvcnRcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlbmllbmNlIG1ldGhvZCB0byB1cGRhdGUgdGhlIHBhdGhuYW1lLlxuICAgKi9cbiAgc2V0UGF0aChuZXdQYXRobmFtZTogc3RyaW5nKTogdGhpcyB7XG4gICAgdGhpcy5wYXRoID0gbmV3UGF0aG5hbWUuc3RhcnRzV2l0aCgnLycpID8gbmV3UGF0aG5hbWUgOiBgLyR7bmV3UGF0aG5hbWV9YFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBhZGRQYXRoQ29tcG9uZW50KGNvbXBvbmVudDogc3RyaW5nKTogdGhpcyB7XG4gICAgdGhpcy5wYXRoID1cbiAgICAgICh0aGlzLnBhdGggPz8gJycpICtcbiAgICAgIChjb21wb25lbnQuc3RhcnRzV2l0aCgnLycpID8gY29tcG9uZW50IDogYC8ke2NvbXBvbmVudH1gKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogUmVwbGFjZSB0aGUgZW50aXJlIHF1ZXJ5IG9iamVjdC5cbiAgICovXG4gIHNldFF1ZXJ5SXRlbXMobmV3UXVlcnk/OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmcgfCBzdHJpbmdbXT4pOiB0aGlzIHtcbiAgICB0aGlzLnF1ZXJ5SXRlbXMgPSBuZXdRdWVyeVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIG9yIGFkZCBhIHNpbmdsZSBxdWVyeSBwYXJhbWV0ZXIuXG4gICAqL1xuICBzZXRRdWVyeUl0ZW0oa2V5OiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXSk6IHRoaXMge1xuICAgIGlmICh0aGlzLnF1ZXJ5SXRlbXMgPT09IHVuZGVmaW5lZCkgdGhpcy5xdWVyeUl0ZW1zID0ge31cblxuICAgIHRoaXMucXVlcnlJdGVtc1trZXldID0gdmFsdWVcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBhIHF1ZXJ5IHBhcmFtZXRlci5cbiAgICovXG4gIHJlbW92ZVF1ZXJ5SXRlbShrZXk6IHN0cmluZyk6IHRoaXMge1xuICAgIGRlbGV0ZSB0aGlzLnF1ZXJ5SXRlbXM/LltrZXldXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZW5pZW5jZSBtZXRob2QgdG8gdXBkYXRlIHRoZSBoYXNoIChmcmFnbWVudCkuXG4gICAqL1xuICBzZXRGcmFnbWVudChuZXdIYXNoOiBzdHJpbmcpOiB0aGlzIHtcbiAgICB0aGlzLmZyYWdtZW50ID0gbmV3SGFzaFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBjdXJyZW50IFVSTCBjb21wb25lbnRzLlxuICAgKlxuICAgKiBBY2NlcHRzIGVpdGhlcjpcbiAgICogLSBBIFVSTCBzdHJpbmcsIHdoaWNoIG1heSBiZSBhIGZ1bGwgVVJMIChlLmcuLCBcImh0dHBzOi8vZXhhbXBsZS5jb20vcGF0aD9mb289YmFyXCIpXG4gICAqICAgb3IgYSBwYXJ0aWFsIFVSTCAoZS5nLiwgXCIvbmV3L3BhdGg/Zm9vPWJhciNzZWN0aW9uXCIpLiBJbiB0aGlzIGNhc2UsIG9ubHkgdGhlIGNvbXBvbmVudHNcbiAgICogICBwcmVzZW50IGluIHRoZSBzdHJpbmcgd2lsbCBiZSB1cGRhdGVkLlxuICAgKiAtIEEgcGFydGlhbCBVcmxDb21wb25lbnRzIG9iamVjdC5cbiAgICpcbiAgICogQHBhcmFtIGlucHV0IC0gQSBVUkwgc3RyaW5nIG9yIGEgcGFydGlhbCBVcmxDb21wb25lbnRzIG9iamVjdC5cbiAgICovXG4gIHVwZGF0ZShpbnB1dDogc3RyaW5nIHwgUGFydGlhbDxVUkxDb21wb25lbnRzPik6IHRoaXMge1xuICAgIGxldCBjb21wb25lbnRzOiBVUkxDb21wb25lbnRzXG5cbiAgICBpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xuICAgICAgLy8gSWYgaW5wdXQgaXMgYSBzdHJpbmcsIHBhcnNlIGFuZCB1cGRhdGUgb25seSB0aGUgcHJvdmlkZWQgY29tcG9uZW50cy5cbiAgICAgIGNvbXBvbmVudHMgPSBwYXJzZVVSTChpbnB1dClcbiAgICB9IGVsc2Uge1xuICAgICAgY29tcG9uZW50cyA9IGlucHV0XG4gICAgfVxuXG4gICAgLy8gT3RoZXJ3aXNlLCB1cGRhdGUgcHJvdmlkZWQgZmllbGRzLlxuICAgIGlmIChjb21wb25lbnRzLnByb3RvY29sICE9PSB1bmRlZmluZWQpIHRoaXMuc2V0UHJvdG9jb2woY29tcG9uZW50cy5wcm90b2NvbClcbiAgICBpZiAoY29tcG9uZW50cy51c2VybmFtZSAhPT0gdW5kZWZpbmVkKSB0aGlzLnNldFVzZXJuYW1lKGNvbXBvbmVudHMudXNlcm5hbWUpXG4gICAgaWYgKGNvbXBvbmVudHMucGFzc3dvcmQgIT09IHVuZGVmaW5lZCkgdGhpcy5zZXRQYXNzd29yZChjb21wb25lbnRzLnBhc3N3b3JkKVxuICAgIGlmIChjb21wb25lbnRzLmhvc3RuYW1lICE9PSB1bmRlZmluZWQpIHRoaXMuc2V0SG9zdG5hbWUoY29tcG9uZW50cy5ob3N0bmFtZSlcbiAgICBpZiAoY29tcG9uZW50cy5wb3J0ICE9PSB1bmRlZmluZWQpIHRoaXMuc2V0UG9ydChjb21wb25lbnRzLnBvcnQpXG4gICAgaWYgKGNvbXBvbmVudHMucGF0aCAhPT0gdW5kZWZpbmVkKSB0aGlzLnNldFBhdGgoY29tcG9uZW50cy5wYXRoKVxuICAgIGlmIChjb21wb25lbnRzLnF1ZXJ5SXRlbXMgIT09IHVuZGVmaW5lZClcbiAgICAgIHRoaXMuc2V0UXVlcnlJdGVtcyhjb21wb25lbnRzLnF1ZXJ5SXRlbXMpXG4gICAgaWYgKGNvbXBvbmVudHMuZnJhZ21lbnQgIT09IHVuZGVmaW5lZCkgdGhpcy5zZXRGcmFnbWVudChjb21wb25lbnRzLmZyYWdtZW50KVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxufVxuIiwgIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtZXhwcmVzc2lvbnMgKi9cbmltcG9ydCB0eXBlIHsgQ2hhcHRlciB9IGZyb20gJy4uL0NoYXB0ZXIuanMnXG5pbXBvcnQgeyBTb3VyY2VJbnRlbnRzLCB0eXBlIEV4dGVuc2lvbkluZm8gfSBmcm9tICcuLi9pbXBsL1NvdXJjZUluZm8uanMnXG5pbXBvcnQgdHlwZSB7IFBhZ2VkUmVzdWx0cyB9IGZyb20gJy4uL1BhZ2VkUmVzdWx0cy5qcydcbmltcG9ydCB0eXBlIHsgU2VhcmNoRmlsdGVyIH0gZnJvbSAnLi4vU2VhcmNoRmlsdGVyLmpzJ1xuaW1wb3J0IHR5cGUgeyBTZWFyY2hRdWVyeSB9IGZyb20gJy4uL1NlYXJjaFF1ZXJ5LmpzJ1xuaW1wb3J0IHR5cGUgeyBTZWFyY2hSZXN1bHRJdGVtIH0gZnJvbSAnLi4vU2VhcmNoUmVzdWx0SXRlbS5qcydcbmltcG9ydCB0eXBlIHsgU29ydGluZ09wdGlvbiB9IGZyb20gJy4uL1NvcnRpbmdPcHRpb24uanMnXG5pbXBvcnQgdHlwZSB7IFNvdXJjZU1hbmdhIH0gZnJvbSAnLi4vU291cmNlTWFuZ2EuanMnXG5pbXBvcnQgdHlwZSB7IEV4dGVuc2lvbiB9IGZyb20gJy4vRXh0ZW5zaW9uLmpzJ1xuaW1wb3J0IHsgaW1wbGVtZW50c0NoYXB0ZXJQcm92aWRpbmcsIHR5cGUgQ2hhcHRlclByb3ZpZGluZyB9IGZyb20gJy4vaW50ZXJmYWNlcy9DaGFwdGVyUHJvdmlkaW5nLmpzJ1xuaW1wb3J0IHR5cGUgeyBNYW5nYVByb3ZpZGluZyB9IGZyb20gJy4vaW50ZXJmYWNlcy9NYW5nYVByb3ZpZGluZy5qcydcbmltcG9ydCB7XG4gIGltcGxlbWVudHNTZWFyY2hSZXN1bHRzUHJvdmlkaW5nLFxuICB0eXBlIFNlYXJjaFJlc3VsdHNQcm92aWRpbmcsXG59IGZyb20gJy4vaW50ZXJmYWNlcy9TZWFyY2hSZXN1bHRzUHJvdmlkaW5nLmpzJ1xuaW1wb3J0IHsgZXhwZWN0IH0gZnJvbSAnY2hhaSdcblxuLy8gVHlwZXMgZm9yIHRlc3QgY2FzZXMgYW5kIHJlc3VsdHNcbnR5cGUgVGVzdENhc2UgPSB7XG4gIG5hbWU6IHN0cmluZ1xuICBmbjogKCkgPT4gUHJvbWlzZTx1bmtub3duPlxufVxuXG50eXBlIFRlc3RSZXN1bHQgPSB7XG4gIG5hbWU6IHN0cmluZ1xuICBwYXNzZWQ6IGJvb2xlYW5cbiAgZXJyb3I/OiBFcnJvclxuICBkdXJhdGlvbjogbnVtYmVyXG4gIHJldHVyblZhbHVlPzogdW5rbm93blxufVxuXG50eXBlIFN1aXRlUmVzdWx0ID0ge1xuICBzdWl0ZU5hbWU6IHN0cmluZ1xuICBwYXNzZWQ6IG51bWJlclxuICBmYWlsZWQ6IG51bWJlclxuICB0b3RhbDogbnVtYmVyXG4gIGR1cmF0aW9uOiBudW1iZXJcbiAgdGVzdFJlc3VsdHM6IFRlc3RSZXN1bHRbXVxufVxuXG4vLyBUZXN0IFN1aXRlIGNsYXNzXG5leHBvcnQgY2xhc3MgVGVzdFN1aXRlIHtcbiAgcmVhZG9ubHkgc3RhdGU6IFJlY29yZDxzdHJpbmcsIHVua25vd24+ID0ge31cbiAgcHJpdmF0ZSB0ZXN0Q2FzZXM6IFRlc3RDYXNlW10gPSBbXVxuICBwcml2YXRlIHN1aXRlTmFtZTogc3RyaW5nXG5cbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XG4gICAgdGhpcy5zdWl0ZU5hbWUgPSBuYW1lXG4gIH1cblxuICAvLyBSZWdpc3RlciBhIHRlc3QgY2FzZVxuICB0ZXN0KG5hbWU6IHN0cmluZywgZm46ICgpID0+IFByb21pc2U8dm9pZD4pOiB2b2lkIHtcbiAgICB0aGlzLnRlc3RDYXNlcy5wdXNoKHsgbmFtZSwgZm4gfSlcbiAgfVxuXG4gIC8vIFJ1biBhbGwgdGVzdCBjYXNlcyBzZXF1ZW50aWFsbHlcbiAgYXN5bmMgcnVuKCk6IFByb21pc2U8U3VpdGVSZXN1bHQ+IHtcbiAgICBjb25zb2xlLmxvZyhgXFxuXHVEODNFXHVEREVBIFJ1bm5pbmcgdGVzdCBzdWl0ZTogJHt0aGlzLnN1aXRlTmFtZX1gKVxuICAgIGNvbnNvbGUubG9nKCc9Jy5yZXBlYXQoNTApKVxuXG4gICAgY29uc3Qgc3RhcnRUaW1lID0gRGF0ZS5ub3coKVxuICAgIGNvbnN0IHRlc3RSZXN1bHRzOiBUZXN0UmVzdWx0W10gPSBbXVxuICAgIGxldCBwYXNzZWQgPSAwXG4gICAgbGV0IGZhaWxlZCA9IDBcblxuICAgIGZvciAoY29uc3QgdGVzdENhc2Ugb2YgdGhpcy50ZXN0Q2FzZXMpIHtcbiAgICAgIGNvbnN0IHRlc3RTdGFydFRpbWUgPSBEYXRlLm5vdygpXG4gICAgICBsZXQgdGVzdFJlc3VsdDogVGVzdFJlc3VsdFxuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCByZXR1cm5WYWx1ZSA9IGF3YWl0IHRlc3RDYXNlLmZuKClcbiAgICAgICAgY29uc3QgZHVyYXRpb24gPSBEYXRlLm5vdygpIC0gdGVzdFN0YXJ0VGltZVxuICAgICAgICB0ZXN0UmVzdWx0ID0ge1xuICAgICAgICAgIG5hbWU6IHRlc3RDYXNlLm5hbWUsXG4gICAgICAgICAgcGFzc2VkOiB0cnVlLFxuICAgICAgICAgIGR1cmF0aW9uLFxuICAgICAgICAgIHJldHVyblZhbHVlLFxuICAgICAgICB9XG4gICAgICAgIHBhc3NlZCsrXG4gICAgICAgIGNvbnNvbGUubG9nKGBcdTI3MDUgJHt0ZXN0Q2FzZS5uYW1lfSAoJHtkdXJhdGlvbn1tcylgKVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc3QgZHVyYXRpb24gPSBEYXRlLm5vdygpIC0gdGVzdFN0YXJ0VGltZVxuICAgICAgICB0ZXN0UmVzdWx0ID0ge1xuICAgICAgICAgIG5hbWU6IHRlc3RDYXNlLm5hbWUsXG4gICAgICAgICAgcGFzc2VkOiBmYWxzZSxcbiAgICAgICAgICBlcnJvcjogZXJyb3IgYXMgRXJyb3IsXG4gICAgICAgICAgZHVyYXRpb24sXG4gICAgICAgIH1cbiAgICAgICAgZmFpbGVkKytcbiAgICAgICAgY29uc29sZS5sb2coYFx1Mjc0QyAke3Rlc3RDYXNlLm5hbWV9ICgke2R1cmF0aW9ufW1zKWApXG4gICAgICAgIGNvbnNvbGUubG9nKGAgICBFcnJvcjogJHsoZXJyb3IgYXMgRXJyb3IpLm1lc3NhZ2V9YClcbiAgICAgIH1cblxuICAgICAgdGVzdFJlc3VsdHMucHVzaCh0ZXN0UmVzdWx0KVxuICAgIH1cblxuICAgIGNvbnN0IHRvdGFsRHVyYXRpb24gPSBEYXRlLm5vdygpIC0gc3RhcnRUaW1lXG4gICAgY29uc3Qgc3VpdGVSZXN1bHQ6IFN1aXRlUmVzdWx0ID0ge1xuICAgICAgc3VpdGVOYW1lOiB0aGlzLnN1aXRlTmFtZSxcbiAgICAgIHBhc3NlZCxcbiAgICAgIGZhaWxlZCxcbiAgICAgIHRvdGFsOiB0aGlzLnRlc3RDYXNlcy5sZW5ndGgsXG4gICAgICBkdXJhdGlvbjogdG90YWxEdXJhdGlvbixcbiAgICAgIHRlc3RSZXN1bHRzLFxuICAgIH1cblxuICAgIHRoaXMucHJpbnRTdW1tYXJ5KHN1aXRlUmVzdWx0KVxuICAgIHJldHVybiBzdWl0ZVJlc3VsdFxuICB9XG5cbiAgcHJpdmF0ZSBwcmludFN1bW1hcnkocmVzdWx0OiBTdWl0ZVJlc3VsdCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKCdcXG5cdUQ4M0RcdURDQ0EgVGVzdCBTdW1tYXJ5OicpXG4gICAgY29uc29sZS5sb2coYCAgIFRvdGFsOiAke3Jlc3VsdC50b3RhbH1gKVxuICAgIGNvbnNvbGUubG9nKGAgICBQYXNzZWQ6ICR7cmVzdWx0LnBhc3NlZH1gKVxuICAgIGNvbnNvbGUubG9nKGAgICBGYWlsZWQ6ICR7cmVzdWx0LmZhaWxlZH1gKVxuICAgIGNvbnNvbGUubG9nKGAgICBEdXJhdGlvbjogJHtyZXN1bHQuZHVyYXRpb259bXNgKVxuXG4gICAgaWYgKHJlc3VsdC5mYWlsZWQgPiAwKSB7XG4gICAgICBjb25zb2xlLmxvZyhgXFxuXHUyNzRDIFN1aXRlIFwiJHtyZXN1bHQuc3VpdGVOYW1lfVwiIGZhaWxlZGApXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKGBcXG5cdTI3MDUgU3VpdGUgXCIke3Jlc3VsdC5zdWl0ZU5hbWV9XCIgcGFzc2VkYClcbiAgICB9XG4gIH1cbn1cblxudHlwZSBFeHRlbnNpb25UZXN0RGF0YSA9IHtcbiAgc2VhcmNoUmVzdWx0c1Byb3ZpZGluZz86IHtcbiAgICBnZXRTZWFyY2hSZXN1bHRzOiBQYXJhbWV0ZXJzPFNlYXJjaFJlc3VsdHNQcm92aWRpbmdbJ2dldFNlYXJjaFJlc3VsdHMnXT5cbiAgICBnZXRTb3J0aW5nT3B0aW9ucz86IFBhcmFtZXRlcnM8XG4gICAgICBFeGNsdWRlPFNlYXJjaFJlc3VsdHNQcm92aWRpbmdbJ2dldFNvcnRpbmdPcHRpb25zJ10sIHVuZGVmaW5lZD5cbiAgICA+XG4gIH1cbiAgbWFuZ2FQcm92aWRpbmc/OiB7XG4gICAgZ2V0TWFuZ2FEZXRhaWxzOiBQYXJhbWV0ZXJzPE1hbmdhUHJvdmlkaW5nWydnZXRNYW5nYURldGFpbHMnXT5cbiAgfVxuICBjaGFwdGVyUHJvdmlkaW5nPzoge1xuICAgIGdldENoYXB0ZXJzOiBQYXJhbWV0ZXJzPENoYXB0ZXJQcm92aWRpbmdbJ2dldENoYXB0ZXJzJ10+XG4gICAgZ2V0Q2hhcHRlckRldGFpbHM6IFBhcmFtZXRlcnM8Q2hhcHRlclByb3ZpZGluZ1snZ2V0Q2hhcHRlckRldGFpbHMnXT5cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgcmVnaXN0ZXJEZWZhdWx0VGVzdHMgPSBmdW5jdGlvbiAoXG4gIHN1aXRlOiBUZXN0U3VpdGUsXG4gIGV4dGVuc2lvbjogRXh0ZW5zaW9uLFxuICBleHRlbnNpb25JbmZvOiBFeHRlbnNpb25JbmZvLFxuICB0ZXN0RGF0YTogRXh0ZW5zaW9uVGVzdERhdGEgPSB7fVxuKSB7XG4gIHJlZ2lzdGVyRGVmYXVsdEluaXRpYWxpc2F0aW9uVGVzdHMoc3VpdGUsIGV4dGVuc2lvbilcblxuICBsZXQgc291cmNlQ2FwYWJpbGl0aWVzOiBTb3VyY2VJbnRlbnRzID0gMFxuICBpZiAoQXJyYXkuaXNBcnJheShleHRlbnNpb25JbmZvLmNhcGFiaWxpdGllcykpIHtcbiAgICBzb3VyY2VDYXBhYmlsaXRpZXMgPSBleHRlbnNpb25JbmZvLmNhcGFiaWxpdGllcy5yZWR1Y2UoXG4gICAgICAoYSwgYikgPT4gYSB8IGIsXG4gICAgICBzb3VyY2VDYXBhYmlsaXRpZXNcbiAgICApXG4gIH0gZWxzZSB7XG4gICAgc291cmNlQ2FwYWJpbGl0aWVzID0gZXh0ZW5zaW9uSW5mby5jYXBhYmlsaXRpZXNcbiAgfVxuXG4gIGlmIChzb3VyY2VDYXBhYmlsaXRpZXMgJiBTb3VyY2VJbnRlbnRzLlNFQVJDSF9SRVNVTFRTX1BST1ZJRElORykge1xuICAgIGlmIChpbXBsZW1lbnRzU2VhcmNoUmVzdWx0c1Byb3ZpZGluZyhleHRlbnNpb24pKSB7XG4gICAgICByZWdpc3RlckRlZmF1bHRTZWFyY2hSZXN1bHRzUHJvdmlkaW5nU291cmNlVGVzdHMoXG4gICAgICAgIHN1aXRlLFxuICAgICAgICBleHRlbnNpb24sXG4gICAgICAgIHRlc3REYXRhXG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYGV4dGVuc2lvbiBkb2VzIG5vdCBpbXBsZW1lbnQgJ1NlYXJjaFJlc3VsdHNQcm92aWRpbmcnIGJ1dCBoYXMgdGhlICdTRUFSQ0hfUkVTVUxUU19QUk9WSURJTkcnIGNhcGFiaWxpdHlgXG4gICAgICApXG4gICAgfVxuICB9XG5cblxuICByZWdpc3RlckRlZmF1bHRNYW5nYVByb3ZpZGluZ1NvdXJjZVRlc3RzKHN1aXRlLCBleHRlbnNpb24sIHRlc3REYXRhKVxuXG4gIGlmIChzb3VyY2VDYXBhYmlsaXRpZXMgJiBTb3VyY2VJbnRlbnRzLkNIQVBURVJfUFJPVklESU5HKSB7XG4gICAgaWYgKGltcGxlbWVudHNDaGFwdGVyUHJvdmlkaW5nKGV4dGVuc2lvbikpIHtcbiAgICAgIHJlZ2lzdGVyRGVmYXVsdENoYXB0ZXJQcm92aWRpbmdTb3VyY2VUZXN0cyhcbiAgICAgICAgc3VpdGUsXG4gICAgICAgIGV4dGVuc2lvbixcbiAgICAgICAgdGVzdERhdGFcbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgZXh0ZW5zaW9uIGRvZXMgbm90IGltcGxlbWVudCAnQ2hhcHRlclByb3ZpZGluZycgYnV0IGhhcyB0aGUgJ0NIQVBURVJfUFJPVklESU5HJyBjYXBhYmlsaXR5YFxuICAgICAgKVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgcmVnaXN0ZXJEZWZhdWx0SW5pdGlhbGlzYXRpb25UZXN0cyA9IGZ1bmN0aW9uIChcbiAgc3VpdGU6IFRlc3RTdWl0ZSxcbiAgZXh0ZW5zaW9uOiBFeHRlbnNpb25cbikge1xuICBzdWl0ZS50ZXN0KCdpbml0aWFsaXNhdGlvbicsIGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBleHRlbnNpb24uaW5pdGlhbGlzZSgpXG4gIH0pXG59XG5cbmNvbnN0IFNUQVRFX0tFWSA9IHtcbiAgU2VhcmNoUmVzdWx0c1Byb3ZpZGluZzoge1xuICAgIGdldFNlYXJjaEZpbHRlcnM6ICdTZWFyY2hSZXN1bHRzUHJvdmlkaW5nLmdldFNlYXJjaEZpbHRlcnMnLFxuICAgIGdldFNlYXJjaFJlc3VsdHM6ICdTZWFyY2hSZXN1bHRzUHJvdmlkaW5nLmdldFNlYXJjaFJlc3VsdHMnLFxuICAgIGdldFNvcnRpbmdPcHRpb25zOiAnU2VhcmNoUmVzdWx0c1Byb3ZpZGluZy5nZXRTb3J0aW5nT3B0aW9ucycsXG4gIH0sXG4gIE1hbmdhUHJvdmlkaW5nOiB7XG4gICAgZ2V0TWFuZ2FEZXRhaWxzOiAnTWFuZ2FQcm92aWRpbmcuZ2V0TWFuZ2FEZXRhaWxzJyxcbiAgfSxcbiAgQ2hhcHRlclByb3ZpZGluZzoge1xuICAgIGdldENoYXB0ZXJzOiAnQ2hhcHRlclByb3ZpZGluZy5nZXRDaGFwdGVycycsXG4gICAgZ2V0Q2hhcHRlckRldGFpbHM6ICdDaGFwdGVyUHJvdmlkaW5nLmdldENoYXB0ZXJEZXRhaWxzJyxcbiAgfSxcbn1cblxuZXhwb3J0IGNvbnN0IHJlZ2lzdGVyRGVmYXVsdFNlYXJjaFJlc3VsdHNQcm92aWRpbmdTb3VyY2VUZXN0cyA9IGZ1bmN0aW9uIChcbiAgc3VpdGU6IFRlc3RTdWl0ZSxcbiAgZXh0ZW5zaW9uOiBFeHRlbnNpb24gJiBTZWFyY2hSZXN1bHRzUHJvdmlkaW5nLFxuICB7XG4gICAgc2VhcmNoUmVzdWx0c1Byb3ZpZGluZzogdGVzdERhdGEsXG4gIH06IFBpY2s8RXh0ZW5zaW9uVGVzdERhdGEsICdzZWFyY2hSZXN1bHRzUHJvdmlkaW5nJz5cbikge1xuICBzdWl0ZS50ZXN0KCdnZXRTZWFyY2hGaWx0ZXJzJywgYXN5bmMgKCkgPT4ge1xuICAgIGV4cGVjdChleHRlbnNpb24pLnRvLmhhdmUucHJvcGVydHkoJ2dldFNlYXJjaEZpbHRlcnMnKVxuXG4gICAgY29uc3Qgc2VhcmNoRmlsdGVycyA9IGF3YWl0IGV4dGVuc2lvbi5nZXRTZWFyY2hGaWx0ZXJzKClcblxuICAgIGV4cGVjdChzZWFyY2hGaWx0ZXJzKS50by5ub3QuYmUudW5kZWZpbmVkXG4gICAgc3VpdGUuc3RhdGVbU1RBVEVfS0VZLlNlYXJjaFJlc3VsdHNQcm92aWRpbmcuZ2V0U2VhcmNoRmlsdGVyc10gPVxuICAgICAgc2VhcmNoRmlsdGVyc1xuICB9KVxuXG4gIGlmICgnZ2V0U29ydGluZ09wdGlvbnMnIGluIGV4dGVuc2lvbikge1xuICAgIHN1aXRlLnRlc3QoJ2dldFNvcnRpbmdPcHRpb25zJywgYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IHBhcmFtcyA9IHRlc3REYXRhPy5nZXRTb3J0aW5nT3B0aW9uc1xuICAgICAgaWYgKCFwYXJhbXMpIHtcbiAgICAgICAgY29uc3Qgc2VhcmNoRmlsdGVycyA9IHN1aXRlLnN0YXRlW1xuICAgICAgICAgIFNUQVRFX0tFWS5TZWFyY2hSZXN1bHRzUHJvdmlkaW5nLmdldFNlYXJjaEZpbHRlcnNcbiAgICAgICAgXSBhcyBTZWFyY2hGaWx0ZXJbXSB8IHVuZGVmaW5lZFxuICAgICAgICBwYXJhbXMgPSBbeyB0aXRsZTogJycsIGZpbHRlcnM6IHNlYXJjaEZpbHRlcnMgPz8gW10gfV1cbiAgICAgIH1cblxuICAgICAgY29uc3Qgc29ydGluZ09wdGlvbnMgPSBhd2FpdCBleHRlbnNpb24uZ2V0U29ydGluZ09wdGlvbnMhKC4uLnBhcmFtcylcbiAgICAgIGV4cGVjdChzb3J0aW5nT3B0aW9ucykubm90LmVtcHR5XG5cbiAgICAgIHN1aXRlLnN0YXRlW1NUQVRFX0tFWS5TZWFyY2hSZXN1bHRzUHJvdmlkaW5nLmdldFNvcnRpbmdPcHRpb25zXSA9XG4gICAgICAgIHNvcnRpbmdPcHRpb25zXG4gICAgfSlcbiAgfVxuXG4gIHN1aXRlLnRlc3QoJ2dldFNlYXJjaFJlc3VsdHMnLCBhc3luYyAoKSA9PiB7XG4gICAgZXhwZWN0KGV4dGVuc2lvbikudG8uaGF2ZS5wcm9wZXJ0eSgnZ2V0U2VhcmNoUmVzdWx0cycpXG5cbiAgICBsZXQgcGFyYW1zID0gdGVzdERhdGE/LmdldFNlYXJjaFJlc3VsdHNcbiAgICBpZiAoIXBhcmFtcykge1xuICAgICAgY29uc3Qgc2VhcmNoRmlsdGVycyA9IHN1aXRlLnN0YXRlW1xuICAgICAgICBTVEFURV9LRVkuU2VhcmNoUmVzdWx0c1Byb3ZpZGluZy5nZXRTZWFyY2hGaWx0ZXJzXG4gICAgICBdIGFzIFNlYXJjaEZpbHRlcltdIHwgdW5kZWZpbmVkXG4gICAgICBjb25zdCBzb3J0aW5nT3B0aW9ucyA9IHN1aXRlLnN0YXRlW1xuICAgICAgICBTVEFURV9LRVkuU2VhcmNoUmVzdWx0c1Byb3ZpZGluZy5nZXRTb3J0aW5nT3B0aW9uc1xuICAgICAgXSBhcyBTb3J0aW5nT3B0aW9uW10gfCB1bmRlZmluZWRcbiAgICAgIHBhcmFtcyA9IFtcbiAgICAgICAgeyB0aXRsZTogJycsIGZpbHRlcnM6IHNlYXJjaEZpbHRlcnMgPz8gW10gfSxcbiAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICBzb3J0aW5nT3B0aW9ucz8uWzBdLFxuICAgICAgXVxuICAgIH1cblxuICAgIGNvbnN0IHNlYXJjaFJlc3VsdHMgPSBhd2FpdCBleHRlbnNpb24uZ2V0U2VhcmNoUmVzdWx0cyguLi5wYXJhbXMpXG4gICAgZXhwZWN0KHNlYXJjaFJlc3VsdHMpLm5vdC5lbXB0eVxuICAgIGV4cGVjdChzZWFyY2hSZXN1bHRzLml0ZW1zKS5ub3QuYmUuZW1wdHlcblxuICAgIHN1aXRlLnN0YXRlW1NUQVRFX0tFWS5TZWFyY2hSZXN1bHRzUHJvdmlkaW5nLmdldFNlYXJjaFJlc3VsdHNdID1cbiAgICAgIHNlYXJjaFJlc3VsdHNcbiAgfSlcbn1cblxuZXhwb3J0IGNvbnN0IHJlZ2lzdGVyRGVmYXVsdE1hbmdhUHJvdmlkaW5nU291cmNlVGVzdHMgPSBmdW5jdGlvbiAoXG4gIHN1aXRlOiBUZXN0U3VpdGUsXG4gIGV4dGVuc2lvbjogRXh0ZW5zaW9uLFxuICB7IG1hbmdhUHJvdmlkaW5nOiB0ZXN0RGF0YSB9OiBQaWNrPEV4dGVuc2lvblRlc3REYXRhLCAnbWFuZ2FQcm92aWRpbmcnPlxuKSB7XG4gIHN1aXRlLnRlc3QoJ2dldE1hbmdhRGV0YWlscycsIGFzeW5jICgpID0+IHtcbiAgICBleHBlY3QoZXh0ZW5zaW9uKS50by5oYXZlLnByb3BlcnR5KCdnZXRNYW5nYURldGFpbHMnKVxuXG4gICAgbGV0IHBhcmFtcyA9IHRlc3REYXRhPy5nZXRNYW5nYURldGFpbHNcbiAgICBpZiAoIXBhcmFtcykge1xuICAgICAgY29uc3Qgc2VhcmNoUmVzdWx0cyA9IHN1aXRlLnN0YXRlW1xuICAgICAgICBTVEFURV9LRVkuU2VhcmNoUmVzdWx0c1Byb3ZpZGluZy5nZXRTZWFyY2hSZXN1bHRzXG4gICAgICBdIGFzIFBhZ2VkUmVzdWx0czxTZWFyY2hSZXN1bHRJdGVtPiB8IHVuZGVmaW5lZFxuICAgICAgaWYgKHNlYXJjaFJlc3VsdHM/Lml0ZW1zWzBdPy5tYW5nYUlkKSB7XG4gICAgICAgIHBhcmFtcyA9IFtzZWFyY2hSZXN1bHRzLml0ZW1zWzBdLm1hbmdhSWRdXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ05vIGBtYW5nYUlkYCBwcm92aWRlZCBpbiB0ZXN0IGRhdGEuIFVuYWJsZSB0byBpbmZlciBmcm9tIGBTZWFyY2hSZXN1bHRzUHJvdmlkaW5nLmdldFNlYXJjaFJlc3VsdHNgJ1xuICAgICAgICApXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgbWFuZ2FEZXRhaWxzID0gYXdhaXQgZXh0ZW5zaW9uLmdldE1hbmdhRGV0YWlscyguLi5wYXJhbXMpXG4gICAgZXhwZWN0KG1hbmdhRGV0YWlscykudG8ubm90LmJlLnVuZGVmaW5lZFxuICAgIGV4cGVjdChtYW5nYURldGFpbHMubWFuZ2FJbmZvKS50by5ub3QuYmUudW5kZWZpbmVkXG5cbiAgICBzdWl0ZS5zdGF0ZVtTVEFURV9LRVkuTWFuZ2FQcm92aWRpbmcuZ2V0TWFuZ2FEZXRhaWxzXSA9IG1hbmdhRGV0YWlsc1xuICB9KVxufVxuXG5leHBvcnQgY29uc3QgcmVnaXN0ZXJEZWZhdWx0Q2hhcHRlclByb3ZpZGluZ1NvdXJjZVRlc3RzID0gZnVuY3Rpb24gKFxuICBzdWl0ZTogVGVzdFN1aXRlLFxuICBleHRlbnNpb246IEV4dGVuc2lvbiAmIENoYXB0ZXJQcm92aWRpbmcsXG4gIHsgY2hhcHRlclByb3ZpZGluZzogdGVzdERhdGEgfTogUGljazxFeHRlbnNpb25UZXN0RGF0YSwgJ2NoYXB0ZXJQcm92aWRpbmcnPlxuKSB7XG4gIHN1aXRlLnRlc3QoJ2dldENoYXB0ZXJzJywgYXN5bmMgKCkgPT4ge1xuICAgIGV4cGVjdChleHRlbnNpb24pLnRvLmhhdmUucHJvcGVydHkoJ2dldENoYXB0ZXJzJylcblxuICAgIGxldCBwYXJhbXMgPSB0ZXN0RGF0YT8uZ2V0Q2hhcHRlcnNcbiAgICBpZiAoIXBhcmFtcykge1xuICAgICAgY29uc3Qgc291cmNlTWFuZ2EgPSBzdWl0ZS5zdGF0ZVtcbiAgICAgICAgU1RBVEVfS0VZLk1hbmdhUHJvdmlkaW5nLmdldE1hbmdhRGV0YWlsc1xuICAgICAgXSBhcyBTb3VyY2VNYW5nYSB8IHVuZGVmaW5lZFxuXG4gICAgICBpZiAoc291cmNlTWFuZ2EpIHtcbiAgICAgICAgcGFyYW1zID0gW3NvdXJjZU1hbmdhXVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdObyBgc291cmNlTWFuZ2FgIHByb3ZpZGVkIGluIHRlc3QgZGF0YS4gVW5hYmxlIHRvIGluZmVyIGZyb20gYE1hbmdhUHJvdmlkaW5nLmdldE1hbmdhRGV0YWlsc2AnXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjaGFwdGVycyA9IGF3YWl0IGV4dGVuc2lvbi5nZXRDaGFwdGVycyguLi5wYXJhbXMpXG4gICAgZXhwZWN0KGNoYXB0ZXJzKS50by5ub3QuYmUuZW1wdHlcblxuICAgIHN1aXRlLnN0YXRlW1NUQVRFX0tFWS5DaGFwdGVyUHJvdmlkaW5nLmdldENoYXB0ZXJzXSA9IGNoYXB0ZXJzXG4gIH0pXG5cbiAgc3VpdGUudGVzdCgnZ2V0Q2hhcHRlckRldGFpbHMnLCBhc3luYyAoKSA9PiB7XG4gICAgZXhwZWN0KGV4dGVuc2lvbikudG8uaGF2ZS5wcm9wZXJ0eSgnZ2V0Q2hhcHRlckRldGFpbHMnKVxuXG4gICAgbGV0IHBhcmFtcyA9IHRlc3REYXRhPy5nZXRDaGFwdGVyRGV0YWlsc1xuICAgIGlmICghcGFyYW1zKSB7XG4gICAgICBjb25zdCBjaGFwdGVycyA9IHN1aXRlLnN0YXRlW1NUQVRFX0tFWS5DaGFwdGVyUHJvdmlkaW5nLmdldENoYXB0ZXJzXSBhc1xuICAgICAgICB8IENoYXB0ZXJbXVxuICAgICAgICB8IHVuZGVmaW5lZFxuXG4gICAgICBpZiAoY2hhcHRlcnM/LlswXSkge1xuICAgICAgICBwYXJhbXMgPSBbY2hhcHRlcnNbMF1dXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ05vIGBzb3VyY2VNYW5nYWAgcHJvdmlkZWQgaW4gdGVzdCBkYXRhLiBVbmFibGUgdG8gaW5mZXIgZnJvbSBgTWFuZ2FQcm92aWRpbmcuZ2V0TWFuZ2FEZXRhaWxzYCdcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGNoYXB0ZXJEZXRhaWxzID0gYXdhaXQgZXh0ZW5zaW9uLmdldENoYXB0ZXJEZXRhaWxzKC4uLnBhcmFtcylcbiAgICBleHBlY3QoY2hhcHRlckRldGFpbHMpLnRvLm5vdC5iZS51bmRlZmluZWRcblxuICAgIHN1aXRlLnN0YXRlW1NUQVRFX0tFWS5DaGFwdGVyUHJvdmlkaW5nLmdldENoYXB0ZXJEZXRhaWxzXSA9IGNoYXB0ZXJEZXRhaWxzXG4gIH0pXG59XG4iLCAiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L3ByZWZlci1saXRlcmFsLWVudW0tbWVtYmVyICovXG5leHBvcnQgZW51bSBTb3VyY2VJbnRlbnRzIHtcbiAgTk9ORSA9IDAsXG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIHVzZSB7QGxpbmsgQ0hBUFRFUl9QUk9WSURJTkd9XG4gICAqL1xuICBNQU5HQV9DSEFQVEVSUyA9IDEgPDwgMCxcbiAgQ0hBUFRFUl9QUk9WSURJTkcgPSAxIDw8IDAsXG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIHVzZSB7QGxpbmsgTUFOR0FfUFJPR1JFU1NfUFJPVklESU5HfVxuICAgKi9cbiAgTUFOR0FfUFJPR1JFU1MgPSAxIDw8IDEsXG4gIE1BTkdBX1BST0dSRVNTX1BST1ZJRElORyA9IDEgPDwgMSxcblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgdXNlIHtAbGluayBESVNDT1ZFUl9TRUNJT05TX1BST1ZJRElOR31cbiAgICovXG4gIERJU0NPVkVSX1NFQ0lPTlMgPSAxIDw8IDIsXG4gIERJU0NPVkVSX1NFQ0lPTlNfUFJPVklESU5HID0gMSA8PCAyLFxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCB1c2Uge0BsaW5rIE1BTkFHRURfQ09MTEVDVElPTl9QUk9WSURJTkd9XG4gICAqL1xuICBDT0xMRUNUSU9OX01BTkFHRU1FTlQgPSAxIDw8IDMsXG4gIE1BTkFHRURfQ09MTEVDVElPTl9QUk9WSURJTkcgPSAxIDw8IDMsXG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIHVzZSB7QGxpbmsgQ0xPVURGTEFSRV9CWVBBU1NfUFJPVklESU5HfVxuICAgKi9cbiAgQ0xPVURGTEFSRV9CWVBBU1NfUkVRVUlSRUQgPSAxIDw8IDQsXG4gIENMT1VERkxBUkVfQllQQVNTX1BST1ZJRElORyA9IDEgPDwgNCxcblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgdXNlIHtAbGluayBTRVRUSU5HU19GT1JNX1BST1ZJRElOR31cbiAgICovXG4gIFNFVFRJTkdTX1VJID0gMSA8PCA1LFxuICBTRVRUSU5HU19GT1JNX1BST1ZJRElORyA9IDEgPDwgNSxcblxuICAvKipcbiAgICogQGRlcHJlY2F0ZWQgdXNlIHtAbGluayBTRUFSQ0hfUkVTVUxUU19QUk9WSURJTkd9XG4gICAqL1xuICBNQU5HQV9TRUFSQ0ggPSAxIDw8IDYsXG4gIFNFQVJDSF9SRVNVTFRTX1BST1ZJRElORyA9IDEgPDwgNixcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTb3VyY2VEZXZlbG9wZXIge1xuICByZWFkb25seSBuYW1lOiBzdHJpbmdcbiAgcmVhZG9ubHkgd2Vic2l0ZT86IHN0cmluZ1xuICByZWFkb25seSBnaXRodWI/OiBzdHJpbmdcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTb3VyY2VCYWRnZSB7XG4gIHJlYWRvbmx5IGxhYmVsOiBzdHJpbmdcbiAgcmVhZG9ubHkgdGV4dENvbG9yOiBzdHJpbmdcbiAgcmVhZG9ubHkgYmFja2dyb3VuZENvbG9yOiBzdHJpbmdcbn1cblxuLyoqXG4gKiBBIGNvbnRlbnQgcmF0aW5nIHRvIGJlIGF0dHJpYnV0ZWQgdG8gZWFjaCBzb3VyY2UuXG4gKi9cbmV4cG9ydCBlbnVtIENvbnRlbnRSYXRpbmcge1xuICBFVkVSWU9ORSA9ICdTQUZFJyxcbiAgTUFUVVJFID0gJ01BVFVSRScsXG4gIEFEVUxUID0gJ0FEVUxUJyxcbn1cblxuLyoqXG4gKiBAZGVwcmVjYXRlZCB1c2Uge0BsaW5rIEV4dGVuc2lvbkluZm99XG4gKi9cbmV4cG9ydCB0eXBlIFNvdXJjZUluZm8gPSBFeHRlbnNpb25JbmZvXG5cbmV4cG9ydCBpbnRlcmZhY2UgRXh0ZW5zaW9uSW5mbyB7XG4gIC8qKlxuICAgKiBSZXF1aXJlZCBjbGFzcyB2YXJpYWJsZSB3aGljaCBkZW5vdGVzIHRoZSBjdXJyZW50IHZlcnNpb24gb2YgdGhlIGFwcGxpY2F0aW9uLlxuICAgKiBUaGlzIGlzIHdoYXQgdGhlIGFwcGxpY2F0aW9uIHVzZXMgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgaXQgbmVlZHMgdG8gdXBkYXRlIGl0J3MgbG9jYWxcbiAgICogdmVyc2lvbiBvZiB0aGUgc291cmNlLCB0byBhIG5ldyB2ZXJzaW9uIG9uIHRoZSByZXBvc2l0b3J5XG4gICAqL1xuICByZWFkb25seSB2ZXJzaW9uOiBzdHJpbmdcblxuICAvKipcbiAgICogVGhlIHRpdGxlIG9mIHRoaXMgc291cmNlLCB0aGlzIGlzIHdoYXQgd2lsbCBzaG93IHVwIGluIHRoZSBhcHBsaWNhdGlvblxuICAgKiB0byBpZGVudGlmeSB3aGF0IE1hbmdhIGxvY2F0aW9uIGlzIGJlaW5nIHRhcmdldGVkXG4gICAqL1xuICByZWFkb25seSBuYW1lOiBzdHJpbmdcblxuICAvKipcbiAgICogQW4gSU5URVJOQUwgcmVmZXJlbmNlIHRvIGFuIGljb24gd2hpY2ggaXMgYXNzb2NpYXRlZCB3aXRoIHRoaXMgc291cmNlLlxuICAgKiBUaGlzIEljb24gc2hvdWxkIGlkZWFsbHkgYmUgYSBtYXRjaGluZyBhc3BlY3QgcmF0aW8gKGEgY3ViZSlcbiAgICogVGhlIGxvY2F0aW9uIG9mIHRoaXMgc2hvdWxkIGJlIGluIGFuIGluY2x1ZGVzIGRpcmVjdG9yeSBuZXh0IHRvIHlvdXIgc291cmNlLlxuICAgKiBGb3IgZXhhbXBsZSwgdGhlIFBhcGVyYmFjayBsaW5rIHNpdHMgYXQ6IHNvdXJjZXMvUGFwZXJiYWNrL3N0YXRpYy9pY29uLnBuZ1xuICAgKiBUaGlzIHtAbGluayBTb3VyY2UuaWNvbn0gZmllbGQgd291bGQgdGhlbiBiZSBzaW1wbHkgcmVmZXJlbmNlZCBhcyAnaWNvbi5wbmcnIGFuZFxuICAgKiB0aGUgcGF0aCB3aWxsIHRoZW4gcmVzb2x2ZSBjb3JyZWN0bHkgaW50ZXJuYWxseVxuICAgKi9cbiAgcmVhZG9ubHkgaWNvbjogc3RyaW5nXG5cbiAgLyoqXG4gICAqIEEgYnJpZWYgZGVzY3JpcHRpb24gb2Ygd2hhdCB0aGlzIHNvdXJjZSB0YXJnZXRzLiBUaGlzIGlzIGFkZGl0aW9uYWwgY29udGVudCBkaXNwbGF5ZWQgdG8gdGhlIHVzZXIgd2hlblxuICAgKiBicm93c2luZyBzb3VyY2VzLlxuICAgKiBXaGF0IHdlYnNpdGUgZG9lcyBpdCB0YXJnZXQ/IFdoYXQgZmVhdHVyZXMgYXJlIHdvcmtpbmc/IEV0Yy5cbiAgICovXG4gIHJlYWRvbmx5IGRlc2NyaXB0aW9uOiBzdHJpbmdcblxuICAvKipcbiAgICogQSBjb250ZW50IHJhdGluZyBhdHRyaWJ1dGVkIHRvIGVhY2ggc291cmNlLiBUaGlzIGNhbiBiZSBvbmUgb2YgdGhyZWUgdmFsdWVzLCBhbmQgc2hvdWxkIGJlIHNldCBhcHByb3ByaWF0ZWx5LlxuICAgKiBFdmVyeW9uZTogVGhpcyBzb3VyY2UgZG9lcyBub3QgaGF2ZSBhbnkgc29ydCBvZiBhZHVsdCBjb250ZW50IGF2YWlsYWJsZS4gRWFjaCB0aXRsZSB3aXRoaW4gaXMgYXNzdW1lZCBzYWZlIGZvciBhbGwgYXVkaWVuY2VzXG4gICAqIE1hdHVyZTogVGhpcyBzb3VyY2UgTUFZIGhhdmUgbWF0dXJlIGNvbnRlbnQgaW5zaWRlIG9mIGl0LiBFdmVuIGlmIG1vc3QgY29udGVudCBpcyBzYWZlLCBtYXR1cmUgc2hvdWxkIGJlIHNlbGVjdGVkIGV2ZW4gaWYgYSBzbWFsbCBzdWJzZXQgYXBwbGllc1xuICAgKiBBZHVsdDogVGhpcyBzb3VyY2UgcHJvYmFibHkgaGFzIHN0cmFpZ2h0IHVwIHBvcm5vZ3JhcGh5IGF2YWlsYWJsZS5cbiAgICpcbiAgICogVGhpcyByYXRpbmcgaGVscHMgdXMgZmlsdGVyIHlvdXIgc291cmNlIHRvIHVzZXJzIHdobyBoYXZlIHRoZSBuZWNlc3NhcnkgdmlzaWJpbGl0eSBydWxlcyB0b2dnbGVkIGZvciB0aGVpciBwcm9maWxlLlxuICAgKiBOYXR1cmFsbHksIG9ubHkgJ0V2ZXJ5b25lJyBzb3VyY2VzIHdpbGwgc2hvdyB1cCBmb3IgdXNlcnMgd2l0aG91dCBhbiBhY2NvdW50LCBvciB3aXRob3V0IGFueSBtb2RlIHRvZ2dsZXMgY2hhbmdlZC5cbiAgICovXG4gIHJlYWRvbmx5IGNvbnRlbnRSYXRpbmc6IENvbnRlbnRSYXRpbmdcblxuICAvKipcbiAgICogVGhlIGF1dGhvciBvZiB0aGlzIHNvdXJjZS4gVGhlIHN0cmluZyBoZXJlIHdpbGwgYmUgc2hvd24gb2ZmIHRvIHRoZSBwdWJsaWMgb24gdGhlIGFwcGxpY2F0aW9uXG4gICAqIGludGVyZmFjZSwgc28gb25seSB3cml0ZSB3aGF0IHlvdSdyZSBjb21mb3J0YWJsZSB3aXRoIHNob3dpbmdcbiAgICovXG4gIHJlYWRvbmx5IGRldmVsb3BlcnM6IFNvdXJjZURldmVsb3BlcltdXG5cbiAgLyoqXG4gICAqIEFuIG9wdGlvbmFsIGZpZWxkIHRoYXQgZGVmaW5lcyB0aGUgbGFuZ3VhZ2Ugb2YgdGhlIGV4dGVuc2lvbidzIHNvdXJjZVxuICAgKi9cbiAgcmVhZG9ubHkgbGFuZ3VhZ2U/OiBzdHJpbmdcblxuICAvKipcbiAgICogTGl0dGxlIGJpdHMgb2YgbWV0YWRhdGEgd2hpY2ggaXMgcmVuZGVyZWQgb24gdGhlIHdlYnNpdGVcbiAgICogdW5kZXIgeW91ciByZXBvc2l0b3JpZXMgc2VjdGlvblxuICAgKi9cbiAgcmVhZG9ubHkgYmFkZ2VzOiBTb3VyY2VCYWRnZVtdXG5cbiAgcmVhZG9ubHkgY2FwYWJpbGl0aWVzOiBTb3VyY2VJbnRlbnRzW10gfCBTb3VyY2VJbnRlbnRzXG59XG4iLCAidmFyIF9fZGVmUHJvcCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbnZhciBfX25hbWUgPSAodGFyZ2V0LCB2YWx1ZSkgPT4gX19kZWZQcm9wKHRhcmdldCwgXCJuYW1lXCIsIHsgdmFsdWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9KTtcbnZhciBfX2V4cG9ydCA9ICh0YXJnZXQsIGFsbCkgPT4ge1xuICBmb3IgKHZhciBuYW1lIGluIGFsbClcbiAgICBfX2RlZlByb3AodGFyZ2V0LCBuYW1lLCB7IGdldDogYWxsW25hbWVdLCBlbnVtZXJhYmxlOiB0cnVlIH0pO1xufTtcblxuLy8gbGliL2NoYWkvdXRpbHMvaW5kZXguanNcbnZhciB1dGlsc19leHBvcnRzID0ge307XG5fX2V4cG9ydCh1dGlsc19leHBvcnRzLCB7XG4gIGFkZENoYWluYWJsZU1ldGhvZDogKCkgPT4gYWRkQ2hhaW5hYmxlTWV0aG9kLFxuICBhZGRMZW5ndGhHdWFyZDogKCkgPT4gYWRkTGVuZ3RoR3VhcmQsXG4gIGFkZE1ldGhvZDogKCkgPT4gYWRkTWV0aG9kLFxuICBhZGRQcm9wZXJ0eTogKCkgPT4gYWRkUHJvcGVydHksXG4gIGNoZWNrRXJyb3I6ICgpID0+IGNoZWNrX2Vycm9yX2V4cG9ydHMsXG4gIGNvbXBhcmVCeUluc3BlY3Q6ICgpID0+IGNvbXBhcmVCeUluc3BlY3QsXG4gIGVxbDogKCkgPT4gZGVlcF9lcWxfZGVmYXVsdCxcbiAgZXhwZWN0VHlwZXM6ICgpID0+IGV4cGVjdFR5cGVzLFxuICBmbGFnOiAoKSA9PiBmbGFnLFxuICBnZXRBY3R1YWw6ICgpID0+IGdldEFjdHVhbCxcbiAgZ2V0TWVzc2FnZTogKCkgPT4gZ2V0TWVzc2FnZTIsXG4gIGdldE5hbWU6ICgpID0+IGdldE5hbWUsXG4gIGdldE9wZXJhdG9yOiAoKSA9PiBnZXRPcGVyYXRvcixcbiAgZ2V0T3duRW51bWVyYWJsZVByb3BlcnRpZXM6ICgpID0+IGdldE93bkVudW1lcmFibGVQcm9wZXJ0aWVzLFxuICBnZXRPd25FbnVtZXJhYmxlUHJvcGVydHlTeW1ib2xzOiAoKSA9PiBnZXRPd25FbnVtZXJhYmxlUHJvcGVydHlTeW1ib2xzLFxuICBnZXRQYXRoSW5mbzogKCkgPT4gZ2V0UGF0aEluZm8sXG4gIGhhc1Byb3BlcnR5OiAoKSA9PiBoYXNQcm9wZXJ0eSxcbiAgaW5zcGVjdDogKCkgPT4gaW5zcGVjdDIsXG4gIGlzTmFOOiAoKSA9PiBpc05hTjIsXG4gIGlzTnVtZXJpYzogKCkgPT4gaXNOdW1lcmljLFxuICBpc1Byb3h5RW5hYmxlZDogKCkgPT4gaXNQcm94eUVuYWJsZWQsXG4gIGlzUmVnRXhwOiAoKSA9PiBpc1JlZ0V4cDIsXG4gIG9iakRpc3BsYXk6ICgpID0+IG9iakRpc3BsYXksXG4gIG92ZXJ3cml0ZUNoYWluYWJsZU1ldGhvZDogKCkgPT4gb3ZlcndyaXRlQ2hhaW5hYmxlTWV0aG9kLFxuICBvdmVyd3JpdGVNZXRob2Q6ICgpID0+IG92ZXJ3cml0ZU1ldGhvZCxcbiAgb3ZlcndyaXRlUHJvcGVydHk6ICgpID0+IG92ZXJ3cml0ZVByb3BlcnR5LFxuICBwcm94aWZ5OiAoKSA9PiBwcm94aWZ5LFxuICB0ZXN0OiAoKSA9PiB0ZXN0LFxuICB0cmFuc2ZlckZsYWdzOiAoKSA9PiB0cmFuc2ZlckZsYWdzLFxuICB0eXBlOiAoKSA9PiB0eXBlXG59KTtcblxuLy8gbm9kZV9tb2R1bGVzL2NoZWNrLWVycm9yL2luZGV4LmpzXG52YXIgY2hlY2tfZXJyb3JfZXhwb3J0cyA9IHt9O1xuX19leHBvcnQoY2hlY2tfZXJyb3JfZXhwb3J0cywge1xuICBjb21wYXRpYmxlQ29uc3RydWN0b3I6ICgpID0+IGNvbXBhdGlibGVDb25zdHJ1Y3RvcixcbiAgY29tcGF0aWJsZUluc3RhbmNlOiAoKSA9PiBjb21wYXRpYmxlSW5zdGFuY2UsXG4gIGNvbXBhdGlibGVNZXNzYWdlOiAoKSA9PiBjb21wYXRpYmxlTWVzc2FnZSxcbiAgZ2V0Q29uc3RydWN0b3JOYW1lOiAoKSA9PiBnZXRDb25zdHJ1Y3Rvck5hbWUsXG4gIGdldE1lc3NhZ2U6ICgpID0+IGdldE1lc3NhZ2Vcbn0pO1xuZnVuY3Rpb24gaXNFcnJvckluc3RhbmNlKG9iaikge1xuICByZXR1cm4gb2JqIGluc3RhbmNlb2YgRXJyb3IgfHwgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09IFwiW29iamVjdCBFcnJvcl1cIjtcbn1cbl9fbmFtZShpc0Vycm9ySW5zdGFuY2UsIFwiaXNFcnJvckluc3RhbmNlXCIpO1xuZnVuY3Rpb24gaXNSZWdFeHAob2JqKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gXCJbb2JqZWN0IFJlZ0V4cF1cIjtcbn1cbl9fbmFtZShpc1JlZ0V4cCwgXCJpc1JlZ0V4cFwiKTtcbmZ1bmN0aW9uIGNvbXBhdGlibGVJbnN0YW5jZSh0aHJvd24sIGVycm9yTGlrZSkge1xuICByZXR1cm4gaXNFcnJvckluc3RhbmNlKGVycm9yTGlrZSkgJiYgdGhyb3duID09PSBlcnJvckxpa2U7XG59XG5fX25hbWUoY29tcGF0aWJsZUluc3RhbmNlLCBcImNvbXBhdGlibGVJbnN0YW5jZVwiKTtcbmZ1bmN0aW9uIGNvbXBhdGlibGVDb25zdHJ1Y3Rvcih0aHJvd24sIGVycm9yTGlrZSkge1xuICBpZiAoaXNFcnJvckluc3RhbmNlKGVycm9yTGlrZSkpIHtcbiAgICByZXR1cm4gdGhyb3duLmNvbnN0cnVjdG9yID09PSBlcnJvckxpa2UuY29uc3RydWN0b3IgfHwgdGhyb3duIGluc3RhbmNlb2YgZXJyb3JMaWtlLmNvbnN0cnVjdG9yO1xuICB9IGVsc2UgaWYgKCh0eXBlb2YgZXJyb3JMaWtlID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBlcnJvckxpa2UgPT09IFwiZnVuY3Rpb25cIikgJiYgZXJyb3JMaWtlLnByb3RvdHlwZSkge1xuICAgIHJldHVybiB0aHJvd24uY29uc3RydWN0b3IgPT09IGVycm9yTGlrZSB8fCB0aHJvd24gaW5zdGFuY2VvZiBlcnJvckxpa2U7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuX19uYW1lKGNvbXBhdGlibGVDb25zdHJ1Y3RvciwgXCJjb21wYXRpYmxlQ29uc3RydWN0b3JcIik7XG5mdW5jdGlvbiBjb21wYXRpYmxlTWVzc2FnZSh0aHJvd24sIGVyck1hdGNoZXIpIHtcbiAgY29uc3QgY29tcGFyaXNvblN0cmluZyA9IHR5cGVvZiB0aHJvd24gPT09IFwic3RyaW5nXCIgPyB0aHJvd24gOiB0aHJvd24ubWVzc2FnZTtcbiAgaWYgKGlzUmVnRXhwKGVyck1hdGNoZXIpKSB7XG4gICAgcmV0dXJuIGVyck1hdGNoZXIudGVzdChjb21wYXJpc29uU3RyaW5nKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZXJyTWF0Y2hlciA9PT0gXCJzdHJpbmdcIikge1xuICAgIHJldHVybiBjb21wYXJpc29uU3RyaW5nLmluZGV4T2YoZXJyTWF0Y2hlcikgIT09IC0xO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cbl9fbmFtZShjb21wYXRpYmxlTWVzc2FnZSwgXCJjb21wYXRpYmxlTWVzc2FnZVwiKTtcbmZ1bmN0aW9uIGdldENvbnN0cnVjdG9yTmFtZShlcnJvckxpa2UpIHtcbiAgbGV0IGNvbnN0cnVjdG9yTmFtZSA9IGVycm9yTGlrZTtcbiAgaWYgKGlzRXJyb3JJbnN0YW5jZShlcnJvckxpa2UpKSB7XG4gICAgY29uc3RydWN0b3JOYW1lID0gZXJyb3JMaWtlLmNvbnN0cnVjdG9yLm5hbWU7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGVycm9yTGlrZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgY29uc3RydWN0b3JOYW1lID0gZXJyb3JMaWtlLm5hbWU7XG4gICAgaWYgKGNvbnN0cnVjdG9yTmFtZSA9PT0gXCJcIikge1xuICAgICAgY29uc3QgbmV3Q29uc3RydWN0b3JOYW1lID0gbmV3IGVycm9yTGlrZSgpLm5hbWU7XG4gICAgICBjb25zdHJ1Y3Rvck5hbWUgPSBuZXdDb25zdHJ1Y3Rvck5hbWUgfHwgY29uc3RydWN0b3JOYW1lO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY29uc3RydWN0b3JOYW1lO1xufVxuX19uYW1lKGdldENvbnN0cnVjdG9yTmFtZSwgXCJnZXRDb25zdHJ1Y3Rvck5hbWVcIik7XG5mdW5jdGlvbiBnZXRNZXNzYWdlKGVycm9yTGlrZSkge1xuICBsZXQgbXNnID0gXCJcIjtcbiAgaWYgKGVycm9yTGlrZSAmJiBlcnJvckxpa2UubWVzc2FnZSkge1xuICAgIG1zZyA9IGVycm9yTGlrZS5tZXNzYWdlO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBlcnJvckxpa2UgPT09IFwic3RyaW5nXCIpIHtcbiAgICBtc2cgPSBlcnJvckxpa2U7XG4gIH1cbiAgcmV0dXJuIG1zZztcbn1cbl9fbmFtZShnZXRNZXNzYWdlLCBcImdldE1lc3NhZ2VcIik7XG5cbi8vIGxpYi9jaGFpL3V0aWxzL2ZsYWcuanNcbmZ1bmN0aW9uIGZsYWcob2JqLCBrZXksIHZhbHVlKSB7XG4gIGxldCBmbGFncyA9IG9iai5fX2ZsYWdzIHx8IChvYmouX19mbGFncyA9IC8qIEBfX1BVUkVfXyAqLyBPYmplY3QuY3JlYXRlKG51bGwpKTtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMpIHtcbiAgICBmbGFnc1trZXldID0gdmFsdWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZsYWdzW2tleV07XG4gIH1cbn1cbl9fbmFtZShmbGFnLCBcImZsYWdcIik7XG5cbi8vIGxpYi9jaGFpL3V0aWxzL3Rlc3QuanNcbmZ1bmN0aW9uIHRlc3Qob2JqLCBhcmdzKSB7XG4gIGxldCBuZWdhdGUgPSBmbGFnKG9iaiwgXCJuZWdhdGVcIiksIGV4cHIgPSBhcmdzWzBdO1xuICByZXR1cm4gbmVnYXRlID8gIWV4cHIgOiBleHByO1xufVxuX19uYW1lKHRlc3QsIFwidGVzdFwiKTtcblxuLy8gbGliL2NoYWkvdXRpbHMvdHlwZS1kZXRlY3QuanNcbmZ1bmN0aW9uIHR5cGUob2JqKSB7XG4gIGlmICh0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIFwidW5kZWZpbmVkXCI7XG4gIH1cbiAgaWYgKG9iaiA9PT0gbnVsbCkge1xuICAgIHJldHVybiBcIm51bGxcIjtcbiAgfVxuICBjb25zdCBzdHJpbmdUYWcgPSBvYmpbU3ltYm9sLnRvU3RyaW5nVGFnXTtcbiAgaWYgKHR5cGVvZiBzdHJpbmdUYWcgPT09IFwic3RyaW5nXCIpIHtcbiAgICByZXR1cm4gc3RyaW5nVGFnO1xuICB9XG4gIGNvbnN0IHR5cGUzID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikuc2xpY2UoOCwgLTEpO1xuICByZXR1cm4gdHlwZTM7XG59XG5fX25hbWUodHlwZSwgXCJ0eXBlXCIpO1xuXG4vLyBub2RlX21vZHVsZXMvYXNzZXJ0aW9uLWVycm9yL2luZGV4LmpzXG52YXIgY2FuRWxpZGVGcmFtZXMgPSBcImNhcHR1cmVTdGFja1RyYWNlXCIgaW4gRXJyb3I7XG52YXIgQXNzZXJ0aW9uRXJyb3IgPSBjbGFzcyBfQXNzZXJ0aW9uRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIHN0YXRpYyB7XG4gICAgX19uYW1lKHRoaXMsIFwiQXNzZXJ0aW9uRXJyb3JcIik7XG4gIH1cbiAgbWVzc2FnZTtcbiAgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuIFwiQXNzZXJ0aW9uRXJyb3JcIjtcbiAgfVxuICBnZXQgb2soKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2UgPSBcIlVuc3BlY2lmaWVkIEFzc2VydGlvbkVycm9yXCIsIHByb3BzLCBzc2YpIHtcbiAgICBzdXBlcihtZXNzYWdlKTtcbiAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIGlmIChjYW5FbGlkZUZyYW1lcykge1xuICAgICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgc3NmIHx8IF9Bc3NlcnRpb25FcnJvcik7XG4gICAgfVxuICAgIGZvciAoY29uc3Qga2V5IGluIHByb3BzKSB7XG4gICAgICBpZiAoIShrZXkgaW4gdGhpcykpIHtcbiAgICAgICAgdGhpc1trZXldID0gcHJvcHNba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgdG9KU09OKHN0YWNrKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnRoaXMsXG4gICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG4gICAgICBvazogZmFsc2UsXG4gICAgICBzdGFjazogc3RhY2sgIT09IGZhbHNlID8gdGhpcy5zdGFjayA6IHZvaWQgMFxuICAgIH07XG4gIH1cbn07XG5cbi8vIGxpYi9jaGFpL3V0aWxzL2V4cGVjdFR5cGVzLmpzXG5mdW5jdGlvbiBleHBlY3RUeXBlcyhvYmosIHR5cGVzKSB7XG4gIGxldCBmbGFnTXNnID0gZmxhZyhvYmosIFwibWVzc2FnZVwiKTtcbiAgbGV0IHNzZmkgPSBmbGFnKG9iaiwgXCJzc2ZpXCIpO1xuICBmbGFnTXNnID0gZmxhZ01zZyA/IGZsYWdNc2cgKyBcIjogXCIgOiBcIlwiO1xuICBvYmogPSBmbGFnKG9iaiwgXCJvYmplY3RcIik7XG4gIHR5cGVzID0gdHlwZXMubWFwKGZ1bmN0aW9uKHQpIHtcbiAgICByZXR1cm4gdC50b0xvd2VyQ2FzZSgpO1xuICB9KTtcbiAgdHlwZXMuc29ydCgpO1xuICBsZXQgc3RyID0gdHlwZXMubWFwKGZ1bmN0aW9uKHQsIGluZGV4KSB7XG4gICAgbGV0IGFydCA9IH5bXCJhXCIsIFwiZVwiLCBcImlcIiwgXCJvXCIsIFwidVwiXS5pbmRleE9mKHQuY2hhckF0KDApKSA/IFwiYW5cIiA6IFwiYVwiO1xuICAgIGxldCBvciA9IHR5cGVzLmxlbmd0aCA+IDEgJiYgaW5kZXggPT09IHR5cGVzLmxlbmd0aCAtIDEgPyBcIm9yIFwiIDogXCJcIjtcbiAgICByZXR1cm4gb3IgKyBhcnQgKyBcIiBcIiArIHQ7XG4gIH0pLmpvaW4oXCIsIFwiKTtcbiAgbGV0IG9ialR5cGUgPSB0eXBlKG9iaikudG9Mb3dlckNhc2UoKTtcbiAgaWYgKCF0eXBlcy5zb21lKGZ1bmN0aW9uKGV4cGVjdGVkKSB7XG4gICAgcmV0dXJuIG9ialR5cGUgPT09IGV4cGVjdGVkO1xuICB9KSkge1xuICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihcbiAgICAgIGZsYWdNc2cgKyBcIm9iamVjdCB0ZXN0ZWQgbXVzdCBiZSBcIiArIHN0ciArIFwiLCBidXQgXCIgKyBvYmpUeXBlICsgXCIgZ2l2ZW5cIixcbiAgICAgIHZvaWQgMCxcbiAgICAgIHNzZmlcbiAgICApO1xuICB9XG59XG5fX25hbWUoZXhwZWN0VHlwZXMsIFwiZXhwZWN0VHlwZXNcIik7XG5cbi8vIGxpYi9jaGFpL3V0aWxzL2dldEFjdHVhbC5qc1xuZnVuY3Rpb24gZ2V0QWN0dWFsKG9iaiwgYXJncykge1xuICByZXR1cm4gYXJncy5sZW5ndGggPiA0ID8gYXJnc1s0XSA6IG9iai5fb2JqO1xufVxuX19uYW1lKGdldEFjdHVhbCwgXCJnZXRBY3R1YWxcIik7XG5cbi8vIG5vZGVfbW9kdWxlcy9sb3VwZS9saWIvaGVscGVycy5qc1xudmFyIGFuc2lDb2xvcnMgPSB7XG4gIGJvbGQ6IFtcIjFcIiwgXCIyMlwiXSxcbiAgZGltOiBbXCIyXCIsIFwiMjJcIl0sXG4gIGl0YWxpYzogW1wiM1wiLCBcIjIzXCJdLFxuICB1bmRlcmxpbmU6IFtcIjRcIiwgXCIyNFwiXSxcbiAgLy8gNSAmIDYgYXJlIGJsaW5raW5nXG4gIGludmVyc2U6IFtcIjdcIiwgXCIyN1wiXSxcbiAgaGlkZGVuOiBbXCI4XCIsIFwiMjhcIl0sXG4gIHN0cmlrZTogW1wiOVwiLCBcIjI5XCJdLFxuICAvLyAxMC0yMCBhcmUgZm9udHNcbiAgLy8gMjEtMjkgYXJlIHJlc2V0cyBmb3IgMS05XG4gIGJsYWNrOiBbXCIzMFwiLCBcIjM5XCJdLFxuICByZWQ6IFtcIjMxXCIsIFwiMzlcIl0sXG4gIGdyZWVuOiBbXCIzMlwiLCBcIjM5XCJdLFxuICB5ZWxsb3c6IFtcIjMzXCIsIFwiMzlcIl0sXG4gIGJsdWU6IFtcIjM0XCIsIFwiMzlcIl0sXG4gIG1hZ2VudGE6IFtcIjM1XCIsIFwiMzlcIl0sXG4gIGN5YW46IFtcIjM2XCIsIFwiMzlcIl0sXG4gIHdoaXRlOiBbXCIzN1wiLCBcIjM5XCJdLFxuICBicmlnaHRibGFjazogW1wiMzA7MVwiLCBcIjM5XCJdLFxuICBicmlnaHRyZWQ6IFtcIjMxOzFcIiwgXCIzOVwiXSxcbiAgYnJpZ2h0Z3JlZW46IFtcIjMyOzFcIiwgXCIzOVwiXSxcbiAgYnJpZ2h0eWVsbG93OiBbXCIzMzsxXCIsIFwiMzlcIl0sXG4gIGJyaWdodGJsdWU6IFtcIjM0OzFcIiwgXCIzOVwiXSxcbiAgYnJpZ2h0bWFnZW50YTogW1wiMzU7MVwiLCBcIjM5XCJdLFxuICBicmlnaHRjeWFuOiBbXCIzNjsxXCIsIFwiMzlcIl0sXG4gIGJyaWdodHdoaXRlOiBbXCIzNzsxXCIsIFwiMzlcIl0sXG4gIGdyZXk6IFtcIjkwXCIsIFwiMzlcIl1cbn07XG52YXIgc3R5bGVzID0ge1xuICBzcGVjaWFsOiBcImN5YW5cIixcbiAgbnVtYmVyOiBcInllbGxvd1wiLFxuICBiaWdpbnQ6IFwieWVsbG93XCIsXG4gIGJvb2xlYW46IFwieWVsbG93XCIsXG4gIHVuZGVmaW5lZDogXCJncmV5XCIsXG4gIG51bGw6IFwiYm9sZFwiLFxuICBzdHJpbmc6IFwiZ3JlZW5cIixcbiAgc3ltYm9sOiBcImdyZWVuXCIsXG4gIGRhdGU6IFwibWFnZW50YVwiLFxuICByZWdleHA6IFwicmVkXCJcbn07XG52YXIgdHJ1bmNhdG9yID0gXCJcXHUyMDI2XCI7XG5mdW5jdGlvbiBjb2xvcmlzZSh2YWx1ZSwgc3R5bGVUeXBlKSB7XG4gIGNvbnN0IGNvbG9yID0gYW5zaUNvbG9yc1tzdHlsZXNbc3R5bGVUeXBlXV0gfHwgYW5zaUNvbG9yc1tzdHlsZVR5cGVdIHx8IFwiXCI7XG4gIGlmICghY29sb3IpIHtcbiAgICByZXR1cm4gU3RyaW5nKHZhbHVlKTtcbiAgfVxuICByZXR1cm4gYFxceDFCWyR7Y29sb3JbMF19bSR7U3RyaW5nKHZhbHVlKX1cXHgxQlske2NvbG9yWzFdfW1gO1xufVxuX19uYW1lKGNvbG9yaXNlLCBcImNvbG9yaXNlXCIpO1xuZnVuY3Rpb24gbm9ybWFsaXNlT3B0aW9ucyh7XG4gIHNob3dIaWRkZW4gPSBmYWxzZSxcbiAgZGVwdGggPSAyLFxuICBjb2xvcnMgPSBmYWxzZSxcbiAgY3VzdG9tSW5zcGVjdCA9IHRydWUsXG4gIHNob3dQcm94eSA9IGZhbHNlLFxuICBtYXhBcnJheUxlbmd0aCA9IEluZmluaXR5LFxuICBicmVha0xlbmd0aCA9IEluZmluaXR5LFxuICBzZWVuID0gW10sXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zaGFkb3dcbiAgdHJ1bmNhdGU6IHRydW5jYXRlMiA9IEluZmluaXR5LFxuICBzdHlsaXplID0gU3RyaW5nXG59ID0ge30sIGluc3BlY3QzKSB7XG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgc2hvd0hpZGRlbjogQm9vbGVhbihzaG93SGlkZGVuKSxcbiAgICBkZXB0aDogTnVtYmVyKGRlcHRoKSxcbiAgICBjb2xvcnM6IEJvb2xlYW4oY29sb3JzKSxcbiAgICBjdXN0b21JbnNwZWN0OiBCb29sZWFuKGN1c3RvbUluc3BlY3QpLFxuICAgIHNob3dQcm94eTogQm9vbGVhbihzaG93UHJveHkpLFxuICAgIG1heEFycmF5TGVuZ3RoOiBOdW1iZXIobWF4QXJyYXlMZW5ndGgpLFxuICAgIGJyZWFrTGVuZ3RoOiBOdW1iZXIoYnJlYWtMZW5ndGgpLFxuICAgIHRydW5jYXRlOiBOdW1iZXIodHJ1bmNhdGUyKSxcbiAgICBzZWVuLFxuICAgIGluc3BlY3Q6IGluc3BlY3QzLFxuICAgIHN0eWxpemVcbiAgfTtcbiAgaWYgKG9wdGlvbnMuY29sb3JzKSB7XG4gICAgb3B0aW9ucy5zdHlsaXplID0gY29sb3Jpc2U7XG4gIH1cbiAgcmV0dXJuIG9wdGlvbnM7XG59XG5fX25hbWUobm9ybWFsaXNlT3B0aW9ucywgXCJub3JtYWxpc2VPcHRpb25zXCIpO1xuZnVuY3Rpb24gaXNIaWdoU3Vycm9nYXRlKGNoYXIpIHtcbiAgcmV0dXJuIGNoYXIgPj0gXCJcXHVEODAwXCIgJiYgY2hhciA8PSBcIlxcdURCRkZcIjtcbn1cbl9fbmFtZShpc0hpZ2hTdXJyb2dhdGUsIFwiaXNIaWdoU3Vycm9nYXRlXCIpO1xuZnVuY3Rpb24gdHJ1bmNhdGUoc3RyaW5nLCBsZW5ndGgsIHRhaWwgPSB0cnVuY2F0b3IpIHtcbiAgc3RyaW5nID0gU3RyaW5nKHN0cmluZyk7XG4gIGNvbnN0IHRhaWxMZW5ndGggPSB0YWlsLmxlbmd0aDtcbiAgY29uc3Qgc3RyaW5nTGVuZ3RoID0gc3RyaW5nLmxlbmd0aDtcbiAgaWYgKHRhaWxMZW5ndGggPiBsZW5ndGggJiYgc3RyaW5nTGVuZ3RoID4gdGFpbExlbmd0aCkge1xuICAgIHJldHVybiB0YWlsO1xuICB9XG4gIGlmIChzdHJpbmdMZW5ndGggPiBsZW5ndGggJiYgc3RyaW5nTGVuZ3RoID4gdGFpbExlbmd0aCkge1xuICAgIGxldCBlbmQgPSBsZW5ndGggLSB0YWlsTGVuZ3RoO1xuICAgIGlmIChlbmQgPiAwICYmIGlzSGlnaFN1cnJvZ2F0ZShzdHJpbmdbZW5kIC0gMV0pKSB7XG4gICAgICBlbmQgPSBlbmQgLSAxO1xuICAgIH1cbiAgICByZXR1cm4gYCR7c3RyaW5nLnNsaWNlKDAsIGVuZCl9JHt0YWlsfWA7XG4gIH1cbiAgcmV0dXJuIHN0cmluZztcbn1cbl9fbmFtZSh0cnVuY2F0ZSwgXCJ0cnVuY2F0ZVwiKTtcbmZ1bmN0aW9uIGluc3BlY3RMaXN0KGxpc3QsIG9wdGlvbnMsIGluc3BlY3RJdGVtLCBzZXBhcmF0b3IgPSBcIiwgXCIpIHtcbiAgaW5zcGVjdEl0ZW0gPSBpbnNwZWN0SXRlbSB8fCBvcHRpb25zLmluc3BlY3Q7XG4gIGNvbnN0IHNpemUgPSBsaXN0Lmxlbmd0aDtcbiAgaWYgKHNpemUgPT09IDApXG4gICAgcmV0dXJuIFwiXCI7XG4gIGNvbnN0IG9yaWdpbmFsTGVuZ3RoID0gb3B0aW9ucy50cnVuY2F0ZTtcbiAgbGV0IG91dHB1dCA9IFwiXCI7XG4gIGxldCBwZWVrID0gXCJcIjtcbiAgbGV0IHRydW5jYXRlZCA9IFwiXCI7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSArPSAxKSB7XG4gICAgY29uc3QgbGFzdCA9IGkgKyAxID09PSBsaXN0Lmxlbmd0aDtcbiAgICBjb25zdCBzZWNvbmRUb0xhc3QgPSBpICsgMiA9PT0gbGlzdC5sZW5ndGg7XG4gICAgdHJ1bmNhdGVkID0gYCR7dHJ1bmNhdG9yfSgke2xpc3QubGVuZ3RoIC0gaX0pYDtcbiAgICBjb25zdCB2YWx1ZSA9IGxpc3RbaV07XG4gICAgb3B0aW9ucy50cnVuY2F0ZSA9IG9yaWdpbmFsTGVuZ3RoIC0gb3V0cHV0Lmxlbmd0aCAtIChsYXN0ID8gMCA6IHNlcGFyYXRvci5sZW5ndGgpO1xuICAgIGNvbnN0IHN0cmluZyA9IHBlZWsgfHwgaW5zcGVjdEl0ZW0odmFsdWUsIG9wdGlvbnMpICsgKGxhc3QgPyBcIlwiIDogc2VwYXJhdG9yKTtcbiAgICBjb25zdCBuZXh0TGVuZ3RoID0gb3V0cHV0Lmxlbmd0aCArIHN0cmluZy5sZW5ndGg7XG4gICAgY29uc3QgdHJ1bmNhdGVkTGVuZ3RoID0gbmV4dExlbmd0aCArIHRydW5jYXRlZC5sZW5ndGg7XG4gICAgaWYgKGxhc3QgJiYgbmV4dExlbmd0aCA+IG9yaWdpbmFsTGVuZ3RoICYmIG91dHB1dC5sZW5ndGggKyB0cnVuY2F0ZWQubGVuZ3RoIDw9IG9yaWdpbmFsTGVuZ3RoKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgaWYgKCFsYXN0ICYmICFzZWNvbmRUb0xhc3QgJiYgdHJ1bmNhdGVkTGVuZ3RoID4gb3JpZ2luYWxMZW5ndGgpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBwZWVrID0gbGFzdCA/IFwiXCIgOiBpbnNwZWN0SXRlbShsaXN0W2kgKyAxXSwgb3B0aW9ucykgKyAoc2Vjb25kVG9MYXN0ID8gXCJcIiA6IHNlcGFyYXRvcik7XG4gICAgaWYgKCFsYXN0ICYmIHNlY29uZFRvTGFzdCAmJiB0cnVuY2F0ZWRMZW5ndGggPiBvcmlnaW5hbExlbmd0aCAmJiBuZXh0TGVuZ3RoICsgcGVlay5sZW5ndGggPiBvcmlnaW5hbExlbmd0aCkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIG91dHB1dCArPSBzdHJpbmc7XG4gICAgaWYgKCFsYXN0ICYmICFzZWNvbmRUb0xhc3QgJiYgbmV4dExlbmd0aCArIHBlZWsubGVuZ3RoID49IG9yaWdpbmFsTGVuZ3RoKSB7XG4gICAgICB0cnVuY2F0ZWQgPSBgJHt0cnVuY2F0b3J9KCR7bGlzdC5sZW5ndGggLSBpIC0gMX0pYDtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICB0cnVuY2F0ZWQgPSBcIlwiO1xuICB9XG4gIHJldHVybiBgJHtvdXRwdXR9JHt0cnVuY2F0ZWR9YDtcbn1cbl9fbmFtZShpbnNwZWN0TGlzdCwgXCJpbnNwZWN0TGlzdFwiKTtcbmZ1bmN0aW9uIHF1b3RlQ29tcGxleEtleShrZXkpIHtcbiAgaWYgKGtleS5tYXRjaCgvXlthLXpBLVpfXVthLXpBLVpfMC05XSokLykpIHtcbiAgICByZXR1cm4ga2V5O1xuICB9XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShrZXkpLnJlcGxhY2UoLycvZywgXCJcXFxcJ1wiKS5yZXBsYWNlKC9cXFxcXCIvZywgJ1wiJykucmVwbGFjZSgvKF5cInxcIiQpL2csIFwiJ1wiKTtcbn1cbl9fbmFtZShxdW90ZUNvbXBsZXhLZXksIFwicXVvdGVDb21wbGV4S2V5XCIpO1xuZnVuY3Rpb24gaW5zcGVjdFByb3BlcnR5KFtrZXksIHZhbHVlXSwgb3B0aW9ucykge1xuICBvcHRpb25zLnRydW5jYXRlIC09IDI7XG4gIGlmICh0eXBlb2Yga2V5ID09PSBcInN0cmluZ1wiKSB7XG4gICAga2V5ID0gcXVvdGVDb21wbGV4S2V5KGtleSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGtleSAhPT0gXCJudW1iZXJcIikge1xuICAgIGtleSA9IGBbJHtvcHRpb25zLmluc3BlY3Qoa2V5LCBvcHRpb25zKX1dYDtcbiAgfVxuICBvcHRpb25zLnRydW5jYXRlIC09IGtleS5sZW5ndGg7XG4gIHZhbHVlID0gb3B0aW9ucy5pbnNwZWN0KHZhbHVlLCBvcHRpb25zKTtcbiAgcmV0dXJuIGAke2tleX06ICR7dmFsdWV9YDtcbn1cbl9fbmFtZShpbnNwZWN0UHJvcGVydHksIFwiaW5zcGVjdFByb3BlcnR5XCIpO1xuXG4vLyBub2RlX21vZHVsZXMvbG91cGUvbGliL2FycmF5LmpzXG5mdW5jdGlvbiBpbnNwZWN0QXJyYXkoYXJyYXksIG9wdGlvbnMpIHtcbiAgY29uc3Qgbm9uSW5kZXhQcm9wZXJ0aWVzID0gT2JqZWN0LmtleXMoYXJyYXkpLnNsaWNlKGFycmF5Lmxlbmd0aCk7XG4gIGlmICghYXJyYXkubGVuZ3RoICYmICFub25JbmRleFByb3BlcnRpZXMubGVuZ3RoKVxuICAgIHJldHVybiBcIltdXCI7XG4gIG9wdGlvbnMudHJ1bmNhdGUgLT0gNDtcbiAgY29uc3QgbGlzdENvbnRlbnRzID0gaW5zcGVjdExpc3QoYXJyYXksIG9wdGlvbnMpO1xuICBvcHRpb25zLnRydW5jYXRlIC09IGxpc3RDb250ZW50cy5sZW5ndGg7XG4gIGxldCBwcm9wZXJ0eUNvbnRlbnRzID0gXCJcIjtcbiAgaWYgKG5vbkluZGV4UHJvcGVydGllcy5sZW5ndGgpIHtcbiAgICBwcm9wZXJ0eUNvbnRlbnRzID0gaW5zcGVjdExpc3Qobm9uSW5kZXhQcm9wZXJ0aWVzLm1hcCgoa2V5KSA9PiBba2V5LCBhcnJheVtrZXldXSksIG9wdGlvbnMsIGluc3BlY3RQcm9wZXJ0eSk7XG4gIH1cbiAgcmV0dXJuIGBbICR7bGlzdENvbnRlbnRzfSR7cHJvcGVydHlDb250ZW50cyA/IGAsICR7cHJvcGVydHlDb250ZW50c31gIDogXCJcIn0gXWA7XG59XG5fX25hbWUoaW5zcGVjdEFycmF5LCBcImluc3BlY3RBcnJheVwiKTtcblxuLy8gbm9kZV9tb2R1bGVzL2xvdXBlL2xpYi90eXBlZGFycmF5LmpzXG52YXIgZ2V0QXJyYXlOYW1lID0gLyogQF9fUFVSRV9fICovIF9fbmFtZSgoYXJyYXkpID0+IHtcbiAgaWYgKHR5cGVvZiBCdWZmZXIgPT09IFwiZnVuY3Rpb25cIiAmJiBhcnJheSBpbnN0YW5jZW9mIEJ1ZmZlcikge1xuICAgIHJldHVybiBcIkJ1ZmZlclwiO1xuICB9XG4gIGlmIChhcnJheVtTeW1ib2wudG9TdHJpbmdUYWddKSB7XG4gICAgcmV0dXJuIGFycmF5W1N5bWJvbC50b1N0cmluZ1RhZ107XG4gIH1cbiAgcmV0dXJuIGFycmF5LmNvbnN0cnVjdG9yLm5hbWU7XG59LCBcImdldEFycmF5TmFtZVwiKTtcbmZ1bmN0aW9uIGluc3BlY3RUeXBlZEFycmF5KGFycmF5LCBvcHRpb25zKSB7XG4gIGNvbnN0IG5hbWUgPSBnZXRBcnJheU5hbWUoYXJyYXkpO1xuICBvcHRpb25zLnRydW5jYXRlIC09IG5hbWUubGVuZ3RoICsgNDtcbiAgY29uc3Qgbm9uSW5kZXhQcm9wZXJ0aWVzID0gT2JqZWN0LmtleXMoYXJyYXkpLnNsaWNlKGFycmF5Lmxlbmd0aCk7XG4gIGlmICghYXJyYXkubGVuZ3RoICYmICFub25JbmRleFByb3BlcnRpZXMubGVuZ3RoKVxuICAgIHJldHVybiBgJHtuYW1lfVtdYDtcbiAgbGV0IG91dHB1dCA9IFwiXCI7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBzdHJpbmcgPSBgJHtvcHRpb25zLnN0eWxpemUodHJ1bmNhdGUoYXJyYXlbaV0sIG9wdGlvbnMudHJ1bmNhdGUpLCBcIm51bWJlclwiKX0ke2kgPT09IGFycmF5Lmxlbmd0aCAtIDEgPyBcIlwiIDogXCIsIFwifWA7XG4gICAgb3B0aW9ucy50cnVuY2F0ZSAtPSBzdHJpbmcubGVuZ3RoO1xuICAgIGlmIChhcnJheVtpXSAhPT0gYXJyYXkubGVuZ3RoICYmIG9wdGlvbnMudHJ1bmNhdGUgPD0gMykge1xuICAgICAgb3V0cHV0ICs9IGAke3RydW5jYXRvcn0oJHthcnJheS5sZW5ndGggLSBhcnJheVtpXSArIDF9KWA7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgb3V0cHV0ICs9IHN0cmluZztcbiAgfVxuICBsZXQgcHJvcGVydHlDb250ZW50cyA9IFwiXCI7XG4gIGlmIChub25JbmRleFByb3BlcnRpZXMubGVuZ3RoKSB7XG4gICAgcHJvcGVydHlDb250ZW50cyA9IGluc3BlY3RMaXN0KG5vbkluZGV4UHJvcGVydGllcy5tYXAoKGtleSkgPT4gW2tleSwgYXJyYXlba2V5XV0pLCBvcHRpb25zLCBpbnNwZWN0UHJvcGVydHkpO1xuICB9XG4gIHJldHVybiBgJHtuYW1lfVsgJHtvdXRwdXR9JHtwcm9wZXJ0eUNvbnRlbnRzID8gYCwgJHtwcm9wZXJ0eUNvbnRlbnRzfWAgOiBcIlwifSBdYDtcbn1cbl9fbmFtZShpbnNwZWN0VHlwZWRBcnJheSwgXCJpbnNwZWN0VHlwZWRBcnJheVwiKTtcblxuLy8gbm9kZV9tb2R1bGVzL2xvdXBlL2xpYi9kYXRlLmpzXG5mdW5jdGlvbiBpbnNwZWN0RGF0ZShkYXRlT2JqZWN0LCBvcHRpb25zKSB7XG4gIGNvbnN0IHN0cmluZ1JlcHJlc2VudGF0aW9uID0gZGF0ZU9iamVjdC50b0pTT04oKTtcbiAgaWYgKHN0cmluZ1JlcHJlc2VudGF0aW9uID09PSBudWxsKSB7XG4gICAgcmV0dXJuIFwiSW52YWxpZCBEYXRlXCI7XG4gIH1cbiAgY29uc3Qgc3BsaXQgPSBzdHJpbmdSZXByZXNlbnRhdGlvbi5zcGxpdChcIlRcIik7XG4gIGNvbnN0IGRhdGUgPSBzcGxpdFswXTtcbiAgcmV0dXJuIG9wdGlvbnMuc3R5bGl6ZShgJHtkYXRlfVQke3RydW5jYXRlKHNwbGl0WzFdLCBvcHRpb25zLnRydW5jYXRlIC0gZGF0ZS5sZW5ndGggLSAxKX1gLCBcImRhdGVcIik7XG59XG5fX25hbWUoaW5zcGVjdERhdGUsIFwiaW5zcGVjdERhdGVcIik7XG5cbi8vIG5vZGVfbW9kdWxlcy9sb3VwZS9saWIvZnVuY3Rpb24uanNcbmZ1bmN0aW9uIGluc3BlY3RGdW5jdGlvbihmdW5jLCBvcHRpb25zKSB7XG4gIGNvbnN0IGZ1bmN0aW9uVHlwZSA9IGZ1bmNbU3ltYm9sLnRvU3RyaW5nVGFnXSB8fCBcIkZ1bmN0aW9uXCI7XG4gIGNvbnN0IG5hbWUgPSBmdW5jLm5hbWU7XG4gIGlmICghbmFtZSkge1xuICAgIHJldHVybiBvcHRpb25zLnN0eWxpemUoYFske2Z1bmN0aW9uVHlwZX1dYCwgXCJzcGVjaWFsXCIpO1xuICB9XG4gIHJldHVybiBvcHRpb25zLnN0eWxpemUoYFske2Z1bmN0aW9uVHlwZX0gJHt0cnVuY2F0ZShuYW1lLCBvcHRpb25zLnRydW5jYXRlIC0gMTEpfV1gLCBcInNwZWNpYWxcIik7XG59XG5fX25hbWUoaW5zcGVjdEZ1bmN0aW9uLCBcImluc3BlY3RGdW5jdGlvblwiKTtcblxuLy8gbm9kZV9tb2R1bGVzL2xvdXBlL2xpYi9tYXAuanNcbmZ1bmN0aW9uIGluc3BlY3RNYXBFbnRyeShba2V5LCB2YWx1ZV0sIG9wdGlvbnMpIHtcbiAgb3B0aW9ucy50cnVuY2F0ZSAtPSA0O1xuICBrZXkgPSBvcHRpb25zLmluc3BlY3Qoa2V5LCBvcHRpb25zKTtcbiAgb3B0aW9ucy50cnVuY2F0ZSAtPSBrZXkubGVuZ3RoO1xuICB2YWx1ZSA9IG9wdGlvbnMuaW5zcGVjdCh2YWx1ZSwgb3B0aW9ucyk7XG4gIHJldHVybiBgJHtrZXl9ID0+ICR7dmFsdWV9YDtcbn1cbl9fbmFtZShpbnNwZWN0TWFwRW50cnksIFwiaW5zcGVjdE1hcEVudHJ5XCIpO1xuZnVuY3Rpb24gbWFwVG9FbnRyaWVzKG1hcCkge1xuICBjb25zdCBlbnRyaWVzID0gW107XG4gIG1hcC5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgZW50cmllcy5wdXNoKFtrZXksIHZhbHVlXSk7XG4gIH0pO1xuICByZXR1cm4gZW50cmllcztcbn1cbl9fbmFtZShtYXBUb0VudHJpZXMsIFwibWFwVG9FbnRyaWVzXCIpO1xuZnVuY3Rpb24gaW5zcGVjdE1hcChtYXAsIG9wdGlvbnMpIHtcbiAgaWYgKG1hcC5zaXplID09PSAwKVxuICAgIHJldHVybiBcIk1hcHt9XCI7XG4gIG9wdGlvbnMudHJ1bmNhdGUgLT0gNztcbiAgcmV0dXJuIGBNYXB7ICR7aW5zcGVjdExpc3QobWFwVG9FbnRyaWVzKG1hcCksIG9wdGlvbnMsIGluc3BlY3RNYXBFbnRyeSl9IH1gO1xufVxuX19uYW1lKGluc3BlY3RNYXAsIFwiaW5zcGVjdE1hcFwiKTtcblxuLy8gbm9kZV9tb2R1bGVzL2xvdXBlL2xpYi9udW1iZXIuanNcbnZhciBpc05hTiA9IE51bWJlci5pc05hTiB8fCAoKGkpID0+IGkgIT09IGkpO1xuZnVuY3Rpb24gaW5zcGVjdE51bWJlcihudW1iZXIsIG9wdGlvbnMpIHtcbiAgaWYgKGlzTmFOKG51bWJlcikpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5zdHlsaXplKFwiTmFOXCIsIFwibnVtYmVyXCIpO1xuICB9XG4gIGlmIChudW1iZXIgPT09IEluZmluaXR5KSB7XG4gICAgcmV0dXJuIG9wdGlvbnMuc3R5bGl6ZShcIkluZmluaXR5XCIsIFwibnVtYmVyXCIpO1xuICB9XG4gIGlmIChudW1iZXIgPT09IC1JbmZpbml0eSkge1xuICAgIHJldHVybiBvcHRpb25zLnN0eWxpemUoXCItSW5maW5pdHlcIiwgXCJudW1iZXJcIik7XG4gIH1cbiAgaWYgKG51bWJlciA9PT0gMCkge1xuICAgIHJldHVybiBvcHRpb25zLnN0eWxpemUoMSAvIG51bWJlciA9PT0gSW5maW5pdHkgPyBcIiswXCIgOiBcIi0wXCIsIFwibnVtYmVyXCIpO1xuICB9XG4gIHJldHVybiBvcHRpb25zLnN0eWxpemUodHJ1bmNhdGUoU3RyaW5nKG51bWJlciksIG9wdGlvbnMudHJ1bmNhdGUpLCBcIm51bWJlclwiKTtcbn1cbl9fbmFtZShpbnNwZWN0TnVtYmVyLCBcImluc3BlY3ROdW1iZXJcIik7XG5cbi8vIG5vZGVfbW9kdWxlcy9sb3VwZS9saWIvYmlnaW50LmpzXG5mdW5jdGlvbiBpbnNwZWN0QmlnSW50KG51bWJlciwgb3B0aW9ucykge1xuICBsZXQgbnVtcyA9IHRydW5jYXRlKG51bWJlci50b1N0cmluZygpLCBvcHRpb25zLnRydW5jYXRlIC0gMSk7XG4gIGlmIChudW1zICE9PSB0cnVuY2F0b3IpXG4gICAgbnVtcyArPSBcIm5cIjtcbiAgcmV0dXJuIG9wdGlvbnMuc3R5bGl6ZShudW1zLCBcImJpZ2ludFwiKTtcbn1cbl9fbmFtZShpbnNwZWN0QmlnSW50LCBcImluc3BlY3RCaWdJbnRcIik7XG5cbi8vIG5vZGVfbW9kdWxlcy9sb3VwZS9saWIvcmVnZXhwLmpzXG5mdW5jdGlvbiBpbnNwZWN0UmVnRXhwKHZhbHVlLCBvcHRpb25zKSB7XG4gIGNvbnN0IGZsYWdzID0gdmFsdWUudG9TdHJpbmcoKS5zcGxpdChcIi9cIilbMl07XG4gIGNvbnN0IHNvdXJjZUxlbmd0aCA9IG9wdGlvbnMudHJ1bmNhdGUgLSAoMiArIGZsYWdzLmxlbmd0aCk7XG4gIGNvbnN0IHNvdXJjZSA9IHZhbHVlLnNvdXJjZTtcbiAgcmV0dXJuIG9wdGlvbnMuc3R5bGl6ZShgLyR7dHJ1bmNhdGUoc291cmNlLCBzb3VyY2VMZW5ndGgpfS8ke2ZsYWdzfWAsIFwicmVnZXhwXCIpO1xufVxuX19uYW1lKGluc3BlY3RSZWdFeHAsIFwiaW5zcGVjdFJlZ0V4cFwiKTtcblxuLy8gbm9kZV9tb2R1bGVzL2xvdXBlL2xpYi9zZXQuanNcbmZ1bmN0aW9uIGFycmF5RnJvbVNldChzZXQyKSB7XG4gIGNvbnN0IHZhbHVlcyA9IFtdO1xuICBzZXQyLmZvckVhY2goKHZhbHVlKSA9PiB7XG4gICAgdmFsdWVzLnB1c2godmFsdWUpO1xuICB9KTtcbiAgcmV0dXJuIHZhbHVlcztcbn1cbl9fbmFtZShhcnJheUZyb21TZXQsIFwiYXJyYXlGcm9tU2V0XCIpO1xuZnVuY3Rpb24gaW5zcGVjdFNldChzZXQyLCBvcHRpb25zKSB7XG4gIGlmIChzZXQyLnNpemUgPT09IDApXG4gICAgcmV0dXJuIFwiU2V0e31cIjtcbiAgb3B0aW9ucy50cnVuY2F0ZSAtPSA3O1xuICByZXR1cm4gYFNldHsgJHtpbnNwZWN0TGlzdChhcnJheUZyb21TZXQoc2V0MiksIG9wdGlvbnMpfSB9YDtcbn1cbl9fbmFtZShpbnNwZWN0U2V0LCBcImluc3BlY3RTZXRcIik7XG5cbi8vIG5vZGVfbW9kdWxlcy9sb3VwZS9saWIvc3RyaW5nLmpzXG52YXIgc3RyaW5nRXNjYXBlQ2hhcnMgPSBuZXcgUmVnRXhwKFwiWydcXFxcdTAwMDAtXFxcXHUwMDFmXFxcXHUwMDdmLVxcXFx1MDA5ZlxcXFx1MDBhZFxcXFx1MDYwMC1cXFxcdTA2MDRcXFxcdTA3MGZcXFxcdTE3YjRcXFxcdTE3YjVcXFxcdTIwMGMtXFxcXHUyMDBmXFxcXHUyMDI4LVxcXFx1MjAyZlxcXFx1MjA2MC1cXFxcdTIwNmZcXFxcdWZlZmZcXFxcdWZmZjAtXFxcXHVmZmZmXVwiLCBcImdcIik7XG52YXIgZXNjYXBlQ2hhcmFjdGVycyA9IHtcbiAgXCJcXGJcIjogXCJcXFxcYlwiLFxuICBcIlx0XCI6IFwiXFxcXHRcIixcbiAgXCJcXG5cIjogXCJcXFxcblwiLFxuICBcIlxcZlwiOiBcIlxcXFxmXCIsXG4gIFwiXFxyXCI6IFwiXFxcXHJcIixcbiAgXCInXCI6IFwiXFxcXCdcIixcbiAgXCJcXFxcXCI6IFwiXFxcXFxcXFxcIlxufTtcbnZhciBoZXggPSAxNjtcbnZhciB1bmljb2RlTGVuZ3RoID0gNDtcbmZ1bmN0aW9uIGVzY2FwZShjaGFyKSB7XG4gIHJldHVybiBlc2NhcGVDaGFyYWN0ZXJzW2NoYXJdIHx8IGBcXFxcdSR7YDAwMDAke2NoYXIuY2hhckNvZGVBdCgwKS50b1N0cmluZyhoZXgpfWAuc2xpY2UoLXVuaWNvZGVMZW5ndGgpfWA7XG59XG5fX25hbWUoZXNjYXBlLCBcImVzY2FwZVwiKTtcbmZ1bmN0aW9uIGluc3BlY3RTdHJpbmcoc3RyaW5nLCBvcHRpb25zKSB7XG4gIGlmIChzdHJpbmdFc2NhcGVDaGFycy50ZXN0KHN0cmluZykpIHtcbiAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShzdHJpbmdFc2NhcGVDaGFycywgZXNjYXBlKTtcbiAgfVxuICByZXR1cm4gb3B0aW9ucy5zdHlsaXplKGAnJHt0cnVuY2F0ZShzdHJpbmcsIG9wdGlvbnMudHJ1bmNhdGUgLSAyKX0nYCwgXCJzdHJpbmdcIik7XG59XG5fX25hbWUoaW5zcGVjdFN0cmluZywgXCJpbnNwZWN0U3RyaW5nXCIpO1xuXG4vLyBub2RlX21vZHVsZXMvbG91cGUvbGliL3N5bWJvbC5qc1xuZnVuY3Rpb24gaW5zcGVjdFN5bWJvbCh2YWx1ZSkge1xuICBpZiAoXCJkZXNjcmlwdGlvblwiIGluIFN5bWJvbC5wcm90b3R5cGUpIHtcbiAgICByZXR1cm4gdmFsdWUuZGVzY3JpcHRpb24gPyBgU3ltYm9sKCR7dmFsdWUuZGVzY3JpcHRpb259KWAgOiBcIlN5bWJvbCgpXCI7XG4gIH1cbiAgcmV0dXJuIHZhbHVlLnRvU3RyaW5nKCk7XG59XG5fX25hbWUoaW5zcGVjdFN5bWJvbCwgXCJpbnNwZWN0U3ltYm9sXCIpO1xuXG4vLyBub2RlX21vZHVsZXMvbG91cGUvbGliL3Byb21pc2UuanNcbnZhciBnZXRQcm9taXNlVmFsdWUgPSAvKiBAX19QVVJFX18gKi8gX19uYW1lKCgpID0+IFwiUHJvbWlzZXtcXHUyMDI2fVwiLCBcImdldFByb21pc2VWYWx1ZVwiKTtcbnZhciBwcm9taXNlX2RlZmF1bHQgPSBnZXRQcm9taXNlVmFsdWU7XG5cbi8vIG5vZGVfbW9kdWxlcy9sb3VwZS9saWIvb2JqZWN0LmpzXG5mdW5jdGlvbiBpbnNwZWN0T2JqZWN0KG9iamVjdCwgb3B0aW9ucykge1xuICBjb25zdCBwcm9wZXJ0aWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqZWN0KTtcbiAgY29uc3Qgc3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKG9iamVjdCkgOiBbXTtcbiAgaWYgKHByb3BlcnRpZXMubGVuZ3RoID09PSAwICYmIHN5bWJvbHMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIFwie31cIjtcbiAgfVxuICBvcHRpb25zLnRydW5jYXRlIC09IDQ7XG4gIG9wdGlvbnMuc2VlbiA9IG9wdGlvbnMuc2VlbiB8fCBbXTtcbiAgaWYgKG9wdGlvbnMuc2Vlbi5pbmNsdWRlcyhvYmplY3QpKSB7XG4gICAgcmV0dXJuIFwiW0NpcmN1bGFyXVwiO1xuICB9XG4gIG9wdGlvbnMuc2Vlbi5wdXNoKG9iamVjdCk7XG4gIGNvbnN0IHByb3BlcnR5Q29udGVudHMgPSBpbnNwZWN0TGlzdChwcm9wZXJ0aWVzLm1hcCgoa2V5KSA9PiBba2V5LCBvYmplY3Rba2V5XV0pLCBvcHRpb25zLCBpbnNwZWN0UHJvcGVydHkpO1xuICBjb25zdCBzeW1ib2xDb250ZW50cyA9IGluc3BlY3RMaXN0KHN5bWJvbHMubWFwKChrZXkpID0+IFtrZXksIG9iamVjdFtrZXldXSksIG9wdGlvbnMsIGluc3BlY3RQcm9wZXJ0eSk7XG4gIG9wdGlvbnMuc2Vlbi5wb3AoKTtcbiAgbGV0IHNlcCA9IFwiXCI7XG4gIGlmIChwcm9wZXJ0eUNvbnRlbnRzICYmIHN5bWJvbENvbnRlbnRzKSB7XG4gICAgc2VwID0gXCIsIFwiO1xuICB9XG4gIHJldHVybiBgeyAke3Byb3BlcnR5Q29udGVudHN9JHtzZXB9JHtzeW1ib2xDb250ZW50c30gfWA7XG59XG5fX25hbWUoaW5zcGVjdE9iamVjdCwgXCJpbnNwZWN0T2JqZWN0XCIpO1xuXG4vLyBub2RlX21vZHVsZXMvbG91cGUvbGliL2NsYXNzLmpzXG52YXIgdG9TdHJpbmdUYWcgPSB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIFN5bWJvbC50b1N0cmluZ1RhZyA/IFN5bWJvbC50b1N0cmluZ1RhZyA6IGZhbHNlO1xuZnVuY3Rpb24gaW5zcGVjdENsYXNzKHZhbHVlLCBvcHRpb25zKSB7XG4gIGxldCBuYW1lID0gXCJcIjtcbiAgaWYgKHRvU3RyaW5nVGFnICYmIHRvU3RyaW5nVGFnIGluIHZhbHVlKSB7XG4gICAgbmFtZSA9IHZhbHVlW3RvU3RyaW5nVGFnXTtcbiAgfVxuICBuYW1lID0gbmFtZSB8fCB2YWx1ZS5jb25zdHJ1Y3Rvci5uYW1lO1xuICBpZiAoIW5hbWUgfHwgbmFtZSA9PT0gXCJfY2xhc3NcIikge1xuICAgIG5hbWUgPSBcIjxBbm9ueW1vdXMgQ2xhc3M+XCI7XG4gIH1cbiAgb3B0aW9ucy50cnVuY2F0ZSAtPSBuYW1lLmxlbmd0aDtcbiAgcmV0dXJuIGAke25hbWV9JHtpbnNwZWN0T2JqZWN0KHZhbHVlLCBvcHRpb25zKX1gO1xufVxuX19uYW1lKGluc3BlY3RDbGFzcywgXCJpbnNwZWN0Q2xhc3NcIik7XG5cbi8vIG5vZGVfbW9kdWxlcy9sb3VwZS9saWIvYXJndW1lbnRzLmpzXG5mdW5jdGlvbiBpbnNwZWN0QXJndW1lbnRzKGFyZ3MsIG9wdGlvbnMpIHtcbiAgaWYgKGFyZ3MubGVuZ3RoID09PSAwKVxuICAgIHJldHVybiBcIkFyZ3VtZW50c1tdXCI7XG4gIG9wdGlvbnMudHJ1bmNhdGUgLT0gMTM7XG4gIHJldHVybiBgQXJndW1lbnRzWyAke2luc3BlY3RMaXN0KGFyZ3MsIG9wdGlvbnMpfSBdYDtcbn1cbl9fbmFtZShpbnNwZWN0QXJndW1lbnRzLCBcImluc3BlY3RBcmd1bWVudHNcIik7XG5cbi8vIG5vZGVfbW9kdWxlcy9sb3VwZS9saWIvZXJyb3IuanNcbnZhciBlcnJvcktleXMgPSBbXG4gIFwic3RhY2tcIixcbiAgXCJsaW5lXCIsXG4gIFwiY29sdW1uXCIsXG4gIFwibmFtZVwiLFxuICBcIm1lc3NhZ2VcIixcbiAgXCJmaWxlTmFtZVwiLFxuICBcImxpbmVOdW1iZXJcIixcbiAgXCJjb2x1bW5OdW1iZXJcIixcbiAgXCJudW1iZXJcIixcbiAgXCJkZXNjcmlwdGlvblwiLFxuICBcImNhdXNlXCJcbl07XG5mdW5jdGlvbiBpbnNwZWN0T2JqZWN0MihlcnJvciwgb3B0aW9ucykge1xuICBjb25zdCBwcm9wZXJ0aWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZXJyb3IpLmZpbHRlcigoa2V5KSA9PiBlcnJvcktleXMuaW5kZXhPZihrZXkpID09PSAtMSk7XG4gIGNvbnN0IG5hbWUgPSBlcnJvci5uYW1lO1xuICBvcHRpb25zLnRydW5jYXRlIC09IG5hbWUubGVuZ3RoO1xuICBsZXQgbWVzc2FnZSA9IFwiXCI7XG4gIGlmICh0eXBlb2YgZXJyb3IubWVzc2FnZSA9PT0gXCJzdHJpbmdcIikge1xuICAgIG1lc3NhZ2UgPSB0cnVuY2F0ZShlcnJvci5tZXNzYWdlLCBvcHRpb25zLnRydW5jYXRlKTtcbiAgfSBlbHNlIHtcbiAgICBwcm9wZXJ0aWVzLnVuc2hpZnQoXCJtZXNzYWdlXCIpO1xuICB9XG4gIG1lc3NhZ2UgPSBtZXNzYWdlID8gYDogJHttZXNzYWdlfWAgOiBcIlwiO1xuICBvcHRpb25zLnRydW5jYXRlIC09IG1lc3NhZ2UubGVuZ3RoICsgNTtcbiAgb3B0aW9ucy5zZWVuID0gb3B0aW9ucy5zZWVuIHx8IFtdO1xuICBpZiAob3B0aW9ucy5zZWVuLmluY2x1ZGVzKGVycm9yKSkge1xuICAgIHJldHVybiBcIltDaXJjdWxhcl1cIjtcbiAgfVxuICBvcHRpb25zLnNlZW4ucHVzaChlcnJvcik7XG4gIGNvbnN0IHByb3BlcnR5Q29udGVudHMgPSBpbnNwZWN0TGlzdChwcm9wZXJ0aWVzLm1hcCgoa2V5KSA9PiBba2V5LCBlcnJvcltrZXldXSksIG9wdGlvbnMsIGluc3BlY3RQcm9wZXJ0eSk7XG4gIHJldHVybiBgJHtuYW1lfSR7bWVzc2FnZX0ke3Byb3BlcnR5Q29udGVudHMgPyBgIHsgJHtwcm9wZXJ0eUNvbnRlbnRzfSB9YCA6IFwiXCJ9YDtcbn1cbl9fbmFtZShpbnNwZWN0T2JqZWN0MiwgXCJpbnNwZWN0T2JqZWN0XCIpO1xuXG4vLyBub2RlX21vZHVsZXMvbG91cGUvbGliL2h0bWwuanNcbmZ1bmN0aW9uIGluc3BlY3RBdHRyaWJ1dGUoW2tleSwgdmFsdWVdLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMudHJ1bmNhdGUgLT0gMztcbiAgaWYgKCF2YWx1ZSkge1xuICAgIHJldHVybiBgJHtvcHRpb25zLnN0eWxpemUoU3RyaW5nKGtleSksIFwieWVsbG93XCIpfWA7XG4gIH1cbiAgcmV0dXJuIGAke29wdGlvbnMuc3R5bGl6ZShTdHJpbmcoa2V5KSwgXCJ5ZWxsb3dcIil9PSR7b3B0aW9ucy5zdHlsaXplKGBcIiR7dmFsdWV9XCJgLCBcInN0cmluZ1wiKX1gO1xufVxuX19uYW1lKGluc3BlY3RBdHRyaWJ1dGUsIFwiaW5zcGVjdEF0dHJpYnV0ZVwiKTtcbmZ1bmN0aW9uIGluc3BlY3ROb2RlQ29sbGVjdGlvbihjb2xsZWN0aW9uLCBvcHRpb25zKSB7XG4gIHJldHVybiBpbnNwZWN0TGlzdChjb2xsZWN0aW9uLCBvcHRpb25zLCBpbnNwZWN0Tm9kZSwgXCJcXG5cIik7XG59XG5fX25hbWUoaW5zcGVjdE5vZGVDb2xsZWN0aW9uLCBcImluc3BlY3ROb2RlQ29sbGVjdGlvblwiKTtcbmZ1bmN0aW9uIGluc3BlY3ROb2RlKG5vZGUsIG9wdGlvbnMpIHtcbiAgc3dpdGNoIChub2RlLm5vZGVUeXBlKSB7XG4gICAgY2FzZSAxOlxuICAgICAgcmV0dXJuIGluc3BlY3RIVE1MKG5vZGUsIG9wdGlvbnMpO1xuICAgIGNhc2UgMzpcbiAgICAgIHJldHVybiBvcHRpb25zLmluc3BlY3Qobm9kZS5kYXRhLCBvcHRpb25zKTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIG9wdGlvbnMuaW5zcGVjdChub2RlLCBvcHRpb25zKTtcbiAgfVxufVxuX19uYW1lKGluc3BlY3ROb2RlLCBcImluc3BlY3ROb2RlXCIpO1xuZnVuY3Rpb24gaW5zcGVjdEhUTUwoZWxlbWVudCwgb3B0aW9ucykge1xuICBjb25zdCBwcm9wZXJ0aWVzID0gZWxlbWVudC5nZXRBdHRyaWJ1dGVOYW1lcygpO1xuICBjb25zdCBuYW1lID0gZWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG4gIGNvbnN0IGhlYWQgPSBvcHRpb25zLnN0eWxpemUoYDwke25hbWV9YCwgXCJzcGVjaWFsXCIpO1xuICBjb25zdCBoZWFkQ2xvc2UgPSBvcHRpb25zLnN0eWxpemUoYD5gLCBcInNwZWNpYWxcIik7XG4gIGNvbnN0IHRhaWwgPSBvcHRpb25zLnN0eWxpemUoYDwvJHtuYW1lfT5gLCBcInNwZWNpYWxcIik7XG4gIG9wdGlvbnMudHJ1bmNhdGUgLT0gbmFtZS5sZW5ndGggKiAyICsgNTtcbiAgbGV0IHByb3BlcnR5Q29udGVudHMgPSBcIlwiO1xuICBpZiAocHJvcGVydGllcy5sZW5ndGggPiAwKSB7XG4gICAgcHJvcGVydHlDb250ZW50cyArPSBcIiBcIjtcbiAgICBwcm9wZXJ0eUNvbnRlbnRzICs9IGluc3BlY3RMaXN0KHByb3BlcnRpZXMubWFwKChrZXkpID0+IFtrZXksIGVsZW1lbnQuZ2V0QXR0cmlidXRlKGtleSldKSwgb3B0aW9ucywgaW5zcGVjdEF0dHJpYnV0ZSwgXCIgXCIpO1xuICB9XG4gIG9wdGlvbnMudHJ1bmNhdGUgLT0gcHJvcGVydHlDb250ZW50cy5sZW5ndGg7XG4gIGNvbnN0IHRydW5jYXRlMiA9IG9wdGlvbnMudHJ1bmNhdGU7XG4gIGxldCBjaGlsZHJlbiA9IGluc3BlY3ROb2RlQ29sbGVjdGlvbihlbGVtZW50LmNoaWxkcmVuLCBvcHRpb25zKTtcbiAgaWYgKGNoaWxkcmVuICYmIGNoaWxkcmVuLmxlbmd0aCA+IHRydW5jYXRlMikge1xuICAgIGNoaWxkcmVuID0gYCR7dHJ1bmNhdG9yfSgke2VsZW1lbnQuY2hpbGRyZW4ubGVuZ3RofSlgO1xuICB9XG4gIHJldHVybiBgJHtoZWFkfSR7cHJvcGVydHlDb250ZW50c30ke2hlYWRDbG9zZX0ke2NoaWxkcmVufSR7dGFpbH1gO1xufVxuX19uYW1lKGluc3BlY3RIVE1MLCBcImluc3BlY3RIVE1MXCIpO1xuXG4vLyBub2RlX21vZHVsZXMvbG91cGUvbGliL2luZGV4LmpzXG52YXIgc3ltYm9sc1N1cHBvcnRlZCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLmZvciA9PT0gXCJmdW5jdGlvblwiO1xudmFyIGNoYWlJbnNwZWN0ID0gc3ltYm9sc1N1cHBvcnRlZCA/IFN5bWJvbC5mb3IoXCJjaGFpL2luc3BlY3RcIikgOiBcIkBAY2hhaS9pbnNwZWN0XCI7XG52YXIgbm9kZUluc3BlY3QgPSBTeW1ib2wuZm9yKFwibm9kZWpzLnV0aWwuaW5zcGVjdC5jdXN0b21cIik7XG52YXIgY29uc3RydWN0b3JNYXAgPSAvKiBAX19QVVJFX18gKi8gbmV3IFdlYWtNYXAoKTtcbnZhciBzdHJpbmdUYWdNYXAgPSB7fTtcbnZhciBiYXNlVHlwZXNNYXAgPSB7XG4gIHVuZGVmaW5lZDogLyogQF9fUFVSRV9fICovIF9fbmFtZSgodmFsdWUsIG9wdGlvbnMpID0+IG9wdGlvbnMuc3R5bGl6ZShcInVuZGVmaW5lZFwiLCBcInVuZGVmaW5lZFwiKSwgXCJ1bmRlZmluZWRcIiksXG4gIG51bGw6IC8qIEBfX1BVUkVfXyAqLyBfX25hbWUoKHZhbHVlLCBvcHRpb25zKSA9PiBvcHRpb25zLnN0eWxpemUoXCJudWxsXCIsIFwibnVsbFwiKSwgXCJudWxsXCIpLFxuICBib29sZWFuOiAvKiBAX19QVVJFX18gKi8gX19uYW1lKCh2YWx1ZSwgb3B0aW9ucykgPT4gb3B0aW9ucy5zdHlsaXplKFN0cmluZyh2YWx1ZSksIFwiYm9vbGVhblwiKSwgXCJib29sZWFuXCIpLFxuICBCb29sZWFuOiAvKiBAX19QVVJFX18gKi8gX19uYW1lKCh2YWx1ZSwgb3B0aW9ucykgPT4gb3B0aW9ucy5zdHlsaXplKFN0cmluZyh2YWx1ZSksIFwiYm9vbGVhblwiKSwgXCJCb29sZWFuXCIpLFxuICBudW1iZXI6IGluc3BlY3ROdW1iZXIsXG4gIE51bWJlcjogaW5zcGVjdE51bWJlcixcbiAgYmlnaW50OiBpbnNwZWN0QmlnSW50LFxuICBCaWdJbnQ6IGluc3BlY3RCaWdJbnQsXG4gIHN0cmluZzogaW5zcGVjdFN0cmluZyxcbiAgU3RyaW5nOiBpbnNwZWN0U3RyaW5nLFxuICBmdW5jdGlvbjogaW5zcGVjdEZ1bmN0aW9uLFxuICBGdW5jdGlvbjogaW5zcGVjdEZ1bmN0aW9uLFxuICBzeW1ib2w6IGluc3BlY3RTeW1ib2wsXG4gIC8vIEEgU3ltYm9sIHBvbHlmaWxsIHdpbGwgcmV0dXJuIGBTeW1ib2xgIG5vdCBgc3ltYm9sYCBmcm9tIHR5cGVkZXRlY3RcbiAgU3ltYm9sOiBpbnNwZWN0U3ltYm9sLFxuICBBcnJheTogaW5zcGVjdEFycmF5LFxuICBEYXRlOiBpbnNwZWN0RGF0ZSxcbiAgTWFwOiBpbnNwZWN0TWFwLFxuICBTZXQ6IGluc3BlY3RTZXQsXG4gIFJlZ0V4cDogaW5zcGVjdFJlZ0V4cCxcbiAgUHJvbWlzZTogcHJvbWlzZV9kZWZhdWx0LFxuICAvLyBXZWFrU2V0LCBXZWFrTWFwIGFyZSB0b3RhbGx5IG9wYXF1ZSB0byB1c1xuICBXZWFrU2V0OiAvKiBAX19QVVJFX18gKi8gX19uYW1lKCh2YWx1ZSwgb3B0aW9ucykgPT4gb3B0aW9ucy5zdHlsaXplKFwiV2Vha1NldHtcXHUyMDI2fVwiLCBcInNwZWNpYWxcIiksIFwiV2Vha1NldFwiKSxcbiAgV2Vha01hcDogLyogQF9fUFVSRV9fICovIF9fbmFtZSgodmFsdWUsIG9wdGlvbnMpID0+IG9wdGlvbnMuc3R5bGl6ZShcIldlYWtNYXB7XFx1MjAyNn1cIiwgXCJzcGVjaWFsXCIpLCBcIldlYWtNYXBcIiksXG4gIEFyZ3VtZW50czogaW5zcGVjdEFyZ3VtZW50cyxcbiAgSW50OEFycmF5OiBpbnNwZWN0VHlwZWRBcnJheSxcbiAgVWludDhBcnJheTogaW5zcGVjdFR5cGVkQXJyYXksXG4gIFVpbnQ4Q2xhbXBlZEFycmF5OiBpbnNwZWN0VHlwZWRBcnJheSxcbiAgSW50MTZBcnJheTogaW5zcGVjdFR5cGVkQXJyYXksXG4gIFVpbnQxNkFycmF5OiBpbnNwZWN0VHlwZWRBcnJheSxcbiAgSW50MzJBcnJheTogaW5zcGVjdFR5cGVkQXJyYXksXG4gIFVpbnQzMkFycmF5OiBpbnNwZWN0VHlwZWRBcnJheSxcbiAgRmxvYXQzMkFycmF5OiBpbnNwZWN0VHlwZWRBcnJheSxcbiAgRmxvYXQ2NEFycmF5OiBpbnNwZWN0VHlwZWRBcnJheSxcbiAgR2VuZXJhdG9yOiAvKiBAX19QVVJFX18gKi8gX19uYW1lKCgpID0+IFwiXCIsIFwiR2VuZXJhdG9yXCIpLFxuICBEYXRhVmlldzogLyogQF9fUFVSRV9fICovIF9fbmFtZSgoKSA9PiBcIlwiLCBcIkRhdGFWaWV3XCIpLFxuICBBcnJheUJ1ZmZlcjogLyogQF9fUFVSRV9fICovIF9fbmFtZSgoKSA9PiBcIlwiLCBcIkFycmF5QnVmZmVyXCIpLFxuICBFcnJvcjogaW5zcGVjdE9iamVjdDIsXG4gIEhUTUxDb2xsZWN0aW9uOiBpbnNwZWN0Tm9kZUNvbGxlY3Rpb24sXG4gIE5vZGVMaXN0OiBpbnNwZWN0Tm9kZUNvbGxlY3Rpb25cbn07XG52YXIgaW5zcGVjdEN1c3RvbSA9IC8qIEBfX1BVUkVfXyAqLyBfX25hbWUoKHZhbHVlLCBvcHRpb25zLCB0eXBlMykgPT4ge1xuICBpZiAoY2hhaUluc3BlY3QgaW4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlW2NoYWlJbnNwZWN0XSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgcmV0dXJuIHZhbHVlW2NoYWlJbnNwZWN0XShvcHRpb25zKTtcbiAgfVxuICBpZiAobm9kZUluc3BlY3QgaW4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlW25vZGVJbnNwZWN0XSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgcmV0dXJuIHZhbHVlW25vZGVJbnNwZWN0XShvcHRpb25zLmRlcHRoLCBvcHRpb25zKTtcbiAgfVxuICBpZiAoXCJpbnNwZWN0XCIgaW4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlLmluc3BlY3QgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiB2YWx1ZS5pbnNwZWN0KG9wdGlvbnMuZGVwdGgsIG9wdGlvbnMpO1xuICB9XG4gIGlmIChcImNvbnN0cnVjdG9yXCIgaW4gdmFsdWUgJiYgY29uc3RydWN0b3JNYXAuaGFzKHZhbHVlLmNvbnN0cnVjdG9yKSkge1xuICAgIHJldHVybiBjb25zdHJ1Y3Rvck1hcC5nZXQodmFsdWUuY29uc3RydWN0b3IpKHZhbHVlLCBvcHRpb25zKTtcbiAgfVxuICBpZiAoc3RyaW5nVGFnTWFwW3R5cGUzXSkge1xuICAgIHJldHVybiBzdHJpbmdUYWdNYXBbdHlwZTNdKHZhbHVlLCBvcHRpb25zKTtcbiAgfVxuICByZXR1cm4gXCJcIjtcbn0sIFwiaW5zcGVjdEN1c3RvbVwiKTtcbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5mdW5jdGlvbiBpbnNwZWN0KHZhbHVlLCBvcHRzID0ge30pIHtcbiAgY29uc3Qgb3B0aW9ucyA9IG5vcm1hbGlzZU9wdGlvbnMob3B0cywgaW5zcGVjdCk7XG4gIGNvbnN0IHsgY3VzdG9tSW5zcGVjdCB9ID0gb3B0aW9ucztcbiAgbGV0IHR5cGUzID0gdmFsdWUgPT09IG51bGwgPyBcIm51bGxcIiA6IHR5cGVvZiB2YWx1ZTtcbiAgaWYgKHR5cGUzID09PSBcIm9iamVjdFwiKSB7XG4gICAgdHlwZTMgPSB0b1N0cmluZy5jYWxsKHZhbHVlKS5zbGljZSg4LCAtMSk7XG4gIH1cbiAgaWYgKHR5cGUzIGluIGJhc2VUeXBlc01hcCkge1xuICAgIHJldHVybiBiYXNlVHlwZXNNYXBbdHlwZTNdKHZhbHVlLCBvcHRpb25zKTtcbiAgfVxuICBpZiAoY3VzdG9tSW5zcGVjdCAmJiB2YWx1ZSkge1xuICAgIGNvbnN0IG91dHB1dCA9IGluc3BlY3RDdXN0b20odmFsdWUsIG9wdGlvbnMsIHR5cGUzKTtcbiAgICBpZiAob3V0cHV0KSB7XG4gICAgICBpZiAodHlwZW9mIG91dHB1dCA9PT0gXCJzdHJpbmdcIilcbiAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICAgIHJldHVybiBpbnNwZWN0KG91dHB1dCwgb3B0aW9ucyk7XG4gICAgfVxuICB9XG4gIGNvbnN0IHByb3RvID0gdmFsdWUgPyBPYmplY3QuZ2V0UHJvdG90eXBlT2YodmFsdWUpIDogZmFsc2U7XG4gIGlmIChwcm90byA9PT0gT2JqZWN0LnByb3RvdHlwZSB8fCBwcm90byA9PT0gbnVsbCkge1xuICAgIHJldHVybiBpbnNwZWN0T2JqZWN0KHZhbHVlLCBvcHRpb25zKTtcbiAgfVxuICBpZiAodmFsdWUgJiYgdHlwZW9mIEhUTUxFbGVtZW50ID09PSBcImZ1bmN0aW9uXCIgJiYgdmFsdWUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgIHJldHVybiBpbnNwZWN0SFRNTCh2YWx1ZSwgb3B0aW9ucyk7XG4gIH1cbiAgaWYgKFwiY29uc3RydWN0b3JcIiBpbiB2YWx1ZSkge1xuICAgIGlmICh2YWx1ZS5jb25zdHJ1Y3RvciAhPT0gT2JqZWN0KSB7XG4gICAgICByZXR1cm4gaW5zcGVjdENsYXNzKHZhbHVlLCBvcHRpb25zKTtcbiAgICB9XG4gICAgcmV0dXJuIGluc3BlY3RPYmplY3QodmFsdWUsIG9wdGlvbnMpO1xuICB9XG4gIGlmICh2YWx1ZSA9PT0gT2JqZWN0KHZhbHVlKSkge1xuICAgIHJldHVybiBpbnNwZWN0T2JqZWN0KHZhbHVlLCBvcHRpb25zKTtcbiAgfVxuICByZXR1cm4gb3B0aW9ucy5zdHlsaXplKFN0cmluZyh2YWx1ZSksIHR5cGUzKTtcbn1cbl9fbmFtZShpbnNwZWN0LCBcImluc3BlY3RcIik7XG5cbi8vIGxpYi9jaGFpL2NvbmZpZy5qc1xudmFyIGNvbmZpZyA9IHtcbiAgLyoqXG4gICAqICMjIyBjb25maWcuaW5jbHVkZVN0YWNrXG4gICAqXG4gICAqIFVzZXIgY29uZmlndXJhYmxlIHByb3BlcnR5LCBpbmZsdWVuY2VzIHdoZXRoZXIgc3RhY2sgdHJhY2VcbiAgICogaXMgaW5jbHVkZWQgaW4gQXNzZXJ0aW9uIGVycm9yIG1lc3NhZ2UuIERlZmF1bHQgb2YgZmFsc2VcbiAgICogc3VwcHJlc3NlcyBzdGFjayB0cmFjZSBpbiB0aGUgZXJyb3IgbWVzc2FnZS5cbiAgICpcbiAgICogICAgIGNoYWkuY29uZmlnLmluY2x1ZGVTdGFjayA9IHRydWU7ICAvLyBlbmFibGUgc3RhY2sgb24gZXJyb3JcbiAgICpcbiAgICogQHBhcmFtIHtib29sZWFufVxuICAgKiBAcHVibGljXG4gICAqL1xuICBpbmNsdWRlU3RhY2s6IGZhbHNlLFxuICAvKipcbiAgICogIyMjIGNvbmZpZy5zaG93RGlmZlxuICAgKlxuICAgKiBVc2VyIGNvbmZpZ3VyYWJsZSBwcm9wZXJ0eSwgaW5mbHVlbmNlcyB3aGV0aGVyIG9yIG5vdFxuICAgKiB0aGUgYHNob3dEaWZmYCBmbGFnIHNob3VsZCBiZSBpbmNsdWRlZCBpbiB0aGUgdGhyb3duXG4gICAqIEFzc2VydGlvbkVycm9ycy4gYGZhbHNlYCB3aWxsIGFsd2F5cyBiZSBgZmFsc2VgOyBgdHJ1ZWBcbiAgICogd2lsbCBiZSB0cnVlIHdoZW4gdGhlIGFzc2VydGlvbiBoYXMgcmVxdWVzdGVkIGEgZGlmZlxuICAgKiBiZSBzaG93bi5cbiAgICpcbiAgICogQHBhcmFtIHtib29sZWFufVxuICAgKiBAcHVibGljXG4gICAqL1xuICBzaG93RGlmZjogdHJ1ZSxcbiAgLyoqXG4gICAqICMjIyBjb25maWcudHJ1bmNhdGVUaHJlc2hvbGRcbiAgICpcbiAgICogVXNlciBjb25maWd1cmFibGUgcHJvcGVydHksIHNldHMgbGVuZ3RoIHRocmVzaG9sZCBmb3IgYWN0dWFsIGFuZFxuICAgKiBleHBlY3RlZCB2YWx1ZXMgaW4gYXNzZXJ0aW9uIGVycm9ycy4gSWYgdGhpcyB0aHJlc2hvbGQgaXMgZXhjZWVkZWQsIGZvclxuICAgKiBleGFtcGxlIGZvciBsYXJnZSBkYXRhIHN0cnVjdHVyZXMsIHRoZSB2YWx1ZSBpcyByZXBsYWNlZCB3aXRoIHNvbWV0aGluZ1xuICAgKiBsaWtlIGBbIEFycmF5KDMpIF1gIG9yIGB7IE9iamVjdCAocHJvcDEsIHByb3AyKSB9YC5cbiAgICpcbiAgICogU2V0IGl0IHRvIHplcm8gaWYgeW91IHdhbnQgdG8gZGlzYWJsZSB0cnVuY2F0aW5nIGFsdG9nZXRoZXIuXG4gICAqXG4gICAqIFRoaXMgaXMgZXNwZWNpYWxseSB1c2VyZnVsIHdoZW4gZG9pbmcgYXNzZXJ0aW9ucyBvbiBhcnJheXM6IGhhdmluZyB0aGlzXG4gICAqIHNldCB0byBhIHJlYXNvbmFibGUgbGFyZ2UgdmFsdWUgbWFrZXMgdGhlIGZhaWx1cmUgbWVzc2FnZXMgcmVhZGlseVxuICAgKiBpbnNwZWN0YWJsZS5cbiAgICpcbiAgICogICAgIGNoYWkuY29uZmlnLnRydW5jYXRlVGhyZXNob2xkID0gMDsgIC8vIGRpc2FibGUgdHJ1bmNhdGluZ1xuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn1cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgdHJ1bmNhdGVUaHJlc2hvbGQ6IDQwLFxuICAvKipcbiAgICogIyMjIGNvbmZpZy51c2VQcm94eVxuICAgKlxuICAgKiBVc2VyIGNvbmZpZ3VyYWJsZSBwcm9wZXJ0eSwgZGVmaW5lcyBpZiBjaGFpIHdpbGwgdXNlIGEgUHJveHkgdG8gdGhyb3dcbiAgICogYW4gZXJyb3Igd2hlbiBhIG5vbi1leGlzdGVudCBwcm9wZXJ0eSBpcyByZWFkLCB3aGljaCBwcm90ZWN0cyB1c2Vyc1xuICAgKiBmcm9tIHR5cG9zIHdoZW4gdXNpbmcgcHJvcGVydHktYmFzZWQgYXNzZXJ0aW9ucy5cbiAgICpcbiAgICogU2V0IGl0IHRvIGZhbHNlIGlmIHlvdSB3YW50IHRvIGRpc2FibGUgdGhpcyBmZWF0dXJlLlxuICAgKlxuICAgKiAgICAgY2hhaS5jb25maWcudXNlUHJveHkgPSBmYWxzZTsgIC8vIGRpc2FibGUgdXNlIG9mIFByb3h5XG4gICAqXG4gICAqIFRoaXMgZmVhdHVyZSBpcyBhdXRvbWF0aWNhbGx5IGRpc2FibGVkIHJlZ2FyZGxlc3Mgb2YgdGhpcyBjb25maWcgdmFsdWVcbiAgICogaW4gZW52aXJvbm1lbnRzIHRoYXQgZG9uJ3Qgc3VwcG9ydCBwcm94aWVzLlxuICAgKlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59XG4gICAqIEBwdWJsaWNcbiAgICovXG4gIHVzZVByb3h5OiB0cnVlLFxuICAvKipcbiAgICogIyMjIGNvbmZpZy5wcm94eUV4Y2x1ZGVkS2V5c1xuICAgKlxuICAgKiBVc2VyIGNvbmZpZ3VyYWJsZSBwcm9wZXJ0eSwgZGVmaW5lcyB3aGljaCBwcm9wZXJ0aWVzIHNob3VsZCBiZSBpZ25vcmVkXG4gICAqIGluc3RlYWQgb2YgdGhyb3dpbmcgYW4gZXJyb3IgaWYgdGhleSBkbyBub3QgZXhpc3Qgb24gdGhlIGFzc2VydGlvbi5cbiAgICogVGhpcyBpcyBvbmx5IGFwcGxpZWQgaWYgdGhlIGVudmlyb25tZW50IENoYWkgaXMgcnVubmluZyBpbiBzdXBwb3J0cyBwcm94aWVzIGFuZFxuICAgKiBpZiB0aGUgYHVzZVByb3h5YCBjb25maWd1cmF0aW9uIHNldHRpbmcgaXMgZW5hYmxlZC5cbiAgICogQnkgZGVmYXVsdCwgYHRoZW5gIGFuZCBgaW5zcGVjdGAgd2lsbCBub3QgdGhyb3cgYW4gZXJyb3IgaWYgdGhleSBkbyBub3QgZXhpc3Qgb24gdGhlXG4gICAqIGFzc2VydGlvbiBvYmplY3QgYmVjYXVzZSB0aGUgYC5pbnNwZWN0YCBwcm9wZXJ0eSBpcyByZWFkIGJ5IGB1dGlsLmluc3BlY3RgIChmb3IgZXhhbXBsZSwgd2hlblxuICAgKiB1c2luZyBgY29uc29sZS5sb2dgIG9uIHRoZSBhc3NlcnRpb24gb2JqZWN0KSBhbmQgYC50aGVuYCBpcyBuZWNlc3NhcnkgZm9yIHByb21pc2UgdHlwZS1jaGVja2luZy5cbiAgICpcbiAgICogICAgIC8vIEJ5IGRlZmF1bHQgdGhlc2Uga2V5cyB3aWxsIG5vdCB0aHJvdyBhbiBlcnJvciBpZiB0aGV5IGRvIG5vdCBleGlzdCBvbiB0aGUgYXNzZXJ0aW9uIG9iamVjdFxuICAgKiAgICAgY2hhaS5jb25maWcucHJveHlFeGNsdWRlZEtleXMgPSBbJ3RoZW4nLCAnaW5zcGVjdCddO1xuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fVxuICAgKiBAcHVibGljXG4gICAqL1xuICBwcm94eUV4Y2x1ZGVkS2V5czogW1widGhlblwiLCBcImNhdGNoXCIsIFwiaW5zcGVjdFwiLCBcInRvSlNPTlwiXSxcbiAgLyoqXG4gICAqICMjIyBjb25maWcuZGVlcEVxdWFsXG4gICAqXG4gICAqIFVzZXIgY29uZmlndXJhYmxlIHByb3BlcnR5LCBkZWZpbmVzIHdoaWNoIGEgY3VzdG9tIGZ1bmN0aW9uIHRvIHVzZSBmb3IgZGVlcEVxdWFsXG4gICAqIGNvbXBhcmlzb25zLlxuICAgKiBCeSBkZWZhdWx0LCB0aGUgZnVuY3Rpb24gdXNlZCBpcyB0aGUgb25lIGZyb20gdGhlIGBkZWVwLWVxbGAgcGFja2FnZSB3aXRob3V0IGN1c3RvbSBjb21wYXJhdG9yLlxuICAgKlxuICAgKiAgICAgLy8gdXNlIGEgY3VzdG9tIGNvbXBhcmF0b3JcbiAgICogICAgIGNoYWkuY29uZmlnLmRlZXBFcXVhbCA9IChleHBlY3RlZCwgYWN0dWFsKSA9PiB7XG4gICAqICAgICAgICAgcmV0dXJuIGNoYWkudXRpbC5lcWwoZXhwZWN0ZWQsIGFjdHVhbCwge1xuICAgKiAgICAgICAgICAgICBjb21wYXJhdG9yOiAoZXhwZWN0ZWQsIGFjdHVhbCkgPT4ge1xuICAgKiAgICAgICAgICAgICAgICAgLy8gZm9yIG5vbiBudW1iZXIgY29tcGFyaXNvbiwgdXNlIHRoZSBkZWZhdWx0IGJlaGF2aW9yXG4gICAqICAgICAgICAgICAgICAgICBpZih0eXBlb2YgZXhwZWN0ZWQgIT09ICdudW1iZXInKSByZXR1cm4gbnVsbDtcbiAgICogICAgICAgICAgICAgICAgIC8vIGFsbG93IGEgZGlmZmVyZW5jZSBvZiAxMCBiZXR3ZWVuIGNvbXBhcmVkIG51bWJlcnNcbiAgICogICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2YgYWN0dWFsID09PSAnbnVtYmVyJyAmJiBNYXRoLmFicyhhY3R1YWwgLSBleHBlY3RlZCkgPCAxMFxuICAgKiAgICAgICAgICAgICB9XG4gICAqICAgICAgICAgfSlcbiAgICogICAgIH07XG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259XG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGRlZXBFcXVhbDogbnVsbFxufTtcblxuLy8gbGliL2NoYWkvdXRpbHMvaW5zcGVjdC5qc1xuZnVuY3Rpb24gaW5zcGVjdDIob2JqLCBzaG93SGlkZGVuLCBkZXB0aCwgY29sb3JzKSB7XG4gIGxldCBvcHRpb25zID0ge1xuICAgIGNvbG9ycyxcbiAgICBkZXB0aDogdHlwZW9mIGRlcHRoID09PSBcInVuZGVmaW5lZFwiID8gMiA6IGRlcHRoLFxuICAgIHNob3dIaWRkZW4sXG4gICAgdHJ1bmNhdGU6IGNvbmZpZy50cnVuY2F0ZVRocmVzaG9sZCA/IGNvbmZpZy50cnVuY2F0ZVRocmVzaG9sZCA6IEluZmluaXR5XG4gIH07XG4gIHJldHVybiBpbnNwZWN0KG9iaiwgb3B0aW9ucyk7XG59XG5fX25hbWUoaW5zcGVjdDIsIFwiaW5zcGVjdFwiKTtcblxuLy8gbGliL2NoYWkvdXRpbHMvb2JqRGlzcGxheS5qc1xuZnVuY3Rpb24gb2JqRGlzcGxheShvYmopIHtcbiAgbGV0IHN0ciA9IGluc3BlY3QyKG9iaiksIHR5cGUzID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaik7XG4gIGlmIChjb25maWcudHJ1bmNhdGVUaHJlc2hvbGQgJiYgc3RyLmxlbmd0aCA+PSBjb25maWcudHJ1bmNhdGVUaHJlc2hvbGQpIHtcbiAgICBpZiAodHlwZTMgPT09IFwiW29iamVjdCBGdW5jdGlvbl1cIikge1xuICAgICAgcmV0dXJuICFvYmoubmFtZSB8fCBvYmoubmFtZSA9PT0gXCJcIiA/IFwiW0Z1bmN0aW9uXVwiIDogXCJbRnVuY3Rpb246IFwiICsgb2JqLm5hbWUgKyBcIl1cIjtcbiAgICB9IGVsc2UgaWYgKHR5cGUzID09PSBcIltvYmplY3QgQXJyYXldXCIpIHtcbiAgICAgIHJldHVybiBcIlsgQXJyYXkoXCIgKyBvYmoubGVuZ3RoICsgXCIpIF1cIjtcbiAgICB9IGVsc2UgaWYgKHR5cGUzID09PSBcIltvYmplY3QgT2JqZWN0XVwiKSB7XG4gICAgICBsZXQga2V5cyA9IE9iamVjdC5rZXlzKG9iaiksIGtzdHIgPSBrZXlzLmxlbmd0aCA+IDIgPyBrZXlzLnNwbGljZSgwLCAyKS5qb2luKFwiLCBcIikgKyBcIiwgLi4uXCIgOiBrZXlzLmpvaW4oXCIsIFwiKTtcbiAgICAgIHJldHVybiBcInsgT2JqZWN0IChcIiArIGtzdHIgKyBcIikgfVwiO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gc3RyO1xuICB9XG59XG5fX25hbWUob2JqRGlzcGxheSwgXCJvYmpEaXNwbGF5XCIpO1xuXG4vLyBsaWIvY2hhaS91dGlscy9nZXRNZXNzYWdlLmpzXG5mdW5jdGlvbiBnZXRNZXNzYWdlMihvYmosIGFyZ3MpIHtcbiAgbGV0IG5lZ2F0ZSA9IGZsYWcob2JqLCBcIm5lZ2F0ZVwiKTtcbiAgbGV0IHZhbCA9IGZsYWcob2JqLCBcIm9iamVjdFwiKTtcbiAgbGV0IGV4cGVjdGVkID0gYXJnc1szXTtcbiAgbGV0IGFjdHVhbCA9IGdldEFjdHVhbChvYmosIGFyZ3MpO1xuICBsZXQgbXNnID0gbmVnYXRlID8gYXJnc1syXSA6IGFyZ3NbMV07XG4gIGxldCBmbGFnTXNnID0gZmxhZyhvYmosIFwibWVzc2FnZVwiKTtcbiAgaWYgKHR5cGVvZiBtc2cgPT09IFwiZnVuY3Rpb25cIikgbXNnID0gbXNnKCk7XG4gIG1zZyA9IG1zZyB8fCBcIlwiO1xuICBtc2cgPSBtc2cucmVwbGFjZSgvI1xce3RoaXNcXH0vZywgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG9iakRpc3BsYXkodmFsKTtcbiAgfSkucmVwbGFjZSgvI1xce2FjdFxcfS9nLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gb2JqRGlzcGxheShhY3R1YWwpO1xuICB9KS5yZXBsYWNlKC8jXFx7ZXhwXFx9L2csIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBvYmpEaXNwbGF5KGV4cGVjdGVkKTtcbiAgfSk7XG4gIHJldHVybiBmbGFnTXNnID8gZmxhZ01zZyArIFwiOiBcIiArIG1zZyA6IG1zZztcbn1cbl9fbmFtZShnZXRNZXNzYWdlMiwgXCJnZXRNZXNzYWdlXCIpO1xuXG4vLyBsaWIvY2hhaS91dGlscy90cmFuc2ZlckZsYWdzLmpzXG5mdW5jdGlvbiB0cmFuc2ZlckZsYWdzKGFzc2VydGlvbiwgb2JqZWN0LCBpbmNsdWRlQWxsKSB7XG4gIGxldCBmbGFncyA9IGFzc2VydGlvbi5fX2ZsYWdzIHx8IChhc3NlcnRpb24uX19mbGFncyA9IC8qIEBfX1BVUkVfXyAqLyBPYmplY3QuY3JlYXRlKG51bGwpKTtcbiAgaWYgKCFvYmplY3QuX19mbGFncykge1xuICAgIG9iamVjdC5fX2ZsYWdzID0gLyogQF9fUFVSRV9fICovIE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIH1cbiAgaW5jbHVkZUFsbCA9IGFyZ3VtZW50cy5sZW5ndGggPT09IDMgPyBpbmNsdWRlQWxsIDogdHJ1ZTtcbiAgZm9yIChsZXQgZmxhZzMgaW4gZmxhZ3MpIHtcbiAgICBpZiAoaW5jbHVkZUFsbCB8fCBmbGFnMyAhPT0gXCJvYmplY3RcIiAmJiBmbGFnMyAhPT0gXCJzc2ZpXCIgJiYgZmxhZzMgIT09IFwibG9ja1NzZmlcIiAmJiBmbGFnMyAhPSBcIm1lc3NhZ2VcIikge1xuICAgICAgb2JqZWN0Ll9fZmxhZ3NbZmxhZzNdID0gZmxhZ3NbZmxhZzNdO1xuICAgIH1cbiAgfVxufVxuX19uYW1lKHRyYW5zZmVyRmxhZ3MsIFwidHJhbnNmZXJGbGFnc1wiKTtcblxuLy8gbm9kZV9tb2R1bGVzL2RlZXAtZXFsL2luZGV4LmpzXG5mdW5jdGlvbiB0eXBlMihvYmopIHtcbiAgaWYgKHR5cGVvZiBvYmogPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4gXCJ1bmRlZmluZWRcIjtcbiAgfVxuICBpZiAob2JqID09PSBudWxsKSB7XG4gICAgcmV0dXJuIFwibnVsbFwiO1xuICB9XG4gIGNvbnN0IHN0cmluZ1RhZyA9IG9ialtTeW1ib2wudG9TdHJpbmdUYWddO1xuICBpZiAodHlwZW9mIHN0cmluZ1RhZyA9PT0gXCJzdHJpbmdcIikge1xuICAgIHJldHVybiBzdHJpbmdUYWc7XG4gIH1cbiAgY29uc3Qgc2xpY2VTdGFydCA9IDg7XG4gIGNvbnN0IHNsaWNlRW5kID0gLTE7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKS5zbGljZShzbGljZVN0YXJ0LCBzbGljZUVuZCk7XG59XG5fX25hbWUodHlwZTIsIFwidHlwZVwiKTtcbmZ1bmN0aW9uIEZha2VNYXAoKSB7XG4gIHRoaXMuX2tleSA9IFwiY2hhaS9kZWVwLWVxbF9fXCIgKyBNYXRoLnJhbmRvbSgpICsgRGF0ZS5ub3coKTtcbn1cbl9fbmFtZShGYWtlTWFwLCBcIkZha2VNYXBcIik7XG5GYWtlTWFwLnByb3RvdHlwZSA9IHtcbiAgZ2V0OiAvKiBAX19QVVJFX18gKi8gX19uYW1lKGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICByZXR1cm4ga2V5W3RoaXMuX2tleV07XG4gIH0sIFwiZ2V0XCIpLFxuICBzZXQ6IC8qIEBfX1BVUkVfXyAqLyBfX25hbWUoZnVuY3Rpb24gc2V0KGtleSwgdmFsdWUpIHtcbiAgICBpZiAoT2JqZWN0LmlzRXh0ZW5zaWJsZShrZXkpKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoa2V5LCB0aGlzLl9rZXksIHtcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgfVxuICB9LCBcInNldFwiKVxufTtcbnZhciBNZW1vaXplTWFwID0gdHlwZW9mIFdlYWtNYXAgPT09IFwiZnVuY3Rpb25cIiA/IFdlYWtNYXAgOiBGYWtlTWFwO1xuZnVuY3Rpb24gbWVtb2l6ZUNvbXBhcmUobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kLCBtZW1vaXplTWFwKSB7XG4gIGlmICghbWVtb2l6ZU1hcCB8fCBpc1ByaW1pdGl2ZShsZWZ0SGFuZE9wZXJhbmQpIHx8IGlzUHJpbWl0aXZlKHJpZ2h0SGFuZE9wZXJhbmQpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgdmFyIGxlZnRIYW5kTWFwID0gbWVtb2l6ZU1hcC5nZXQobGVmdEhhbmRPcGVyYW5kKTtcbiAgaWYgKGxlZnRIYW5kTWFwKSB7XG4gICAgdmFyIHJlc3VsdCA9IGxlZnRIYW5kTWFwLmdldChyaWdodEhhbmRPcGVyYW5kKTtcbiAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gXCJib29sZWFuXCIpIHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuX19uYW1lKG1lbW9pemVDb21wYXJlLCBcIm1lbW9pemVDb21wYXJlXCIpO1xuZnVuY3Rpb24gbWVtb2l6ZVNldChsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQsIG1lbW9pemVNYXAsIHJlc3VsdCkge1xuICBpZiAoIW1lbW9pemVNYXAgfHwgaXNQcmltaXRpdmUobGVmdEhhbmRPcGVyYW5kKSB8fCBpc1ByaW1pdGl2ZShyaWdodEhhbmRPcGVyYW5kKSkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbGVmdEhhbmRNYXAgPSBtZW1vaXplTWFwLmdldChsZWZ0SGFuZE9wZXJhbmQpO1xuICBpZiAobGVmdEhhbmRNYXApIHtcbiAgICBsZWZ0SGFuZE1hcC5zZXQocmlnaHRIYW5kT3BlcmFuZCwgcmVzdWx0KTtcbiAgfSBlbHNlIHtcbiAgICBsZWZ0SGFuZE1hcCA9IG5ldyBNZW1vaXplTWFwKCk7XG4gICAgbGVmdEhhbmRNYXAuc2V0KHJpZ2h0SGFuZE9wZXJhbmQsIHJlc3VsdCk7XG4gICAgbWVtb2l6ZU1hcC5zZXQobGVmdEhhbmRPcGVyYW5kLCBsZWZ0SGFuZE1hcCk7XG4gIH1cbn1cbl9fbmFtZShtZW1vaXplU2V0LCBcIm1lbW9pemVTZXRcIik7XG52YXIgZGVlcF9lcWxfZGVmYXVsdCA9IGRlZXBFcXVhbDtcbmZ1bmN0aW9uIGRlZXBFcXVhbChsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQsIG9wdGlvbnMpIHtcbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5jb21wYXJhdG9yKSB7XG4gICAgcmV0dXJuIGV4dGVuc2l2ZURlZXBFcXVhbChsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQsIG9wdGlvbnMpO1xuICB9XG4gIHZhciBzaW1wbGVSZXN1bHQgPSBzaW1wbGVFcXVhbChsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQpO1xuICBpZiAoc2ltcGxlUmVzdWx0ICE9PSBudWxsKSB7XG4gICAgcmV0dXJuIHNpbXBsZVJlc3VsdDtcbiAgfVxuICByZXR1cm4gZXh0ZW5zaXZlRGVlcEVxdWFsKGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCwgb3B0aW9ucyk7XG59XG5fX25hbWUoZGVlcEVxdWFsLCBcImRlZXBFcXVhbFwiKTtcbmZ1bmN0aW9uIHNpbXBsZUVxdWFsKGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCkge1xuICBpZiAobGVmdEhhbmRPcGVyYW5kID09PSByaWdodEhhbmRPcGVyYW5kKSB7XG4gICAgcmV0dXJuIGxlZnRIYW5kT3BlcmFuZCAhPT0gMCB8fCAxIC8gbGVmdEhhbmRPcGVyYW5kID09PSAxIC8gcmlnaHRIYW5kT3BlcmFuZDtcbiAgfVxuICBpZiAobGVmdEhhbmRPcGVyYW5kICE9PSBsZWZ0SGFuZE9wZXJhbmQgJiYgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgcmlnaHRIYW5kT3BlcmFuZCAhPT0gcmlnaHRIYW5kT3BlcmFuZCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChpc1ByaW1pdGl2ZShsZWZ0SGFuZE9wZXJhbmQpIHx8IGlzUHJpbWl0aXZlKHJpZ2h0SGFuZE9wZXJhbmQpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiBudWxsO1xufVxuX19uYW1lKHNpbXBsZUVxdWFsLCBcInNpbXBsZUVxdWFsXCIpO1xuZnVuY3Rpb24gZXh0ZW5zaXZlRGVlcEVxdWFsKGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgb3B0aW9ucy5tZW1vaXplID0gb3B0aW9ucy5tZW1vaXplID09PSBmYWxzZSA/IGZhbHNlIDogb3B0aW9ucy5tZW1vaXplIHx8IG5ldyBNZW1vaXplTWFwKCk7XG4gIHZhciBjb21wYXJhdG9yID0gb3B0aW9ucyAmJiBvcHRpb25zLmNvbXBhcmF0b3I7XG4gIHZhciBtZW1vaXplUmVzdWx0TGVmdCA9IG1lbW9pemVDb21wYXJlKGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCwgb3B0aW9ucy5tZW1vaXplKTtcbiAgaWYgKG1lbW9pemVSZXN1bHRMZWZ0ICE9PSBudWxsKSB7XG4gICAgcmV0dXJuIG1lbW9pemVSZXN1bHRMZWZ0O1xuICB9XG4gIHZhciBtZW1vaXplUmVzdWx0UmlnaHQgPSBtZW1vaXplQ29tcGFyZShyaWdodEhhbmRPcGVyYW5kLCBsZWZ0SGFuZE9wZXJhbmQsIG9wdGlvbnMubWVtb2l6ZSk7XG4gIGlmIChtZW1vaXplUmVzdWx0UmlnaHQgIT09IG51bGwpIHtcbiAgICByZXR1cm4gbWVtb2l6ZVJlc3VsdFJpZ2h0O1xuICB9XG4gIGlmIChjb21wYXJhdG9yKSB7XG4gICAgdmFyIGNvbXBhcmF0b3JSZXN1bHQgPSBjb21wYXJhdG9yKGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCk7XG4gICAgaWYgKGNvbXBhcmF0b3JSZXN1bHQgPT09IGZhbHNlIHx8IGNvbXBhcmF0b3JSZXN1bHQgPT09IHRydWUpIHtcbiAgICAgIG1lbW9pemVTZXQobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kLCBvcHRpb25zLm1lbW9pemUsIGNvbXBhcmF0b3JSZXN1bHQpO1xuICAgICAgcmV0dXJuIGNvbXBhcmF0b3JSZXN1bHQ7XG4gICAgfVxuICAgIHZhciBzaW1wbGVSZXN1bHQgPSBzaW1wbGVFcXVhbChsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQpO1xuICAgIGlmIChzaW1wbGVSZXN1bHQgIT09IG51bGwpIHtcbiAgICAgIHJldHVybiBzaW1wbGVSZXN1bHQ7XG4gICAgfVxuICB9XG4gIHZhciBsZWZ0SGFuZFR5cGUgPSB0eXBlMihsZWZ0SGFuZE9wZXJhbmQpO1xuICBpZiAobGVmdEhhbmRUeXBlICE9PSB0eXBlMihyaWdodEhhbmRPcGVyYW5kKSkge1xuICAgIG1lbW9pemVTZXQobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kLCBvcHRpb25zLm1lbW9pemUsIGZhbHNlKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgbWVtb2l6ZVNldChsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQsIG9wdGlvbnMubWVtb2l6ZSwgdHJ1ZSk7XG4gIHZhciByZXN1bHQgPSBleHRlbnNpdmVEZWVwRXF1YWxCeVR5cGUobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kLCBsZWZ0SGFuZFR5cGUsIG9wdGlvbnMpO1xuICBtZW1vaXplU2V0KGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCwgb3B0aW9ucy5tZW1vaXplLCByZXN1bHQpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuX19uYW1lKGV4dGVuc2l2ZURlZXBFcXVhbCwgXCJleHRlbnNpdmVEZWVwRXF1YWxcIik7XG5mdW5jdGlvbiBleHRlbnNpdmVEZWVwRXF1YWxCeVR5cGUobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kLCBsZWZ0SGFuZFR5cGUsIG9wdGlvbnMpIHtcbiAgc3dpdGNoIChsZWZ0SGFuZFR5cGUpIHtcbiAgICBjYXNlIFwiU3RyaW5nXCI6XG4gICAgY2FzZSBcIk51bWJlclwiOlxuICAgIGNhc2UgXCJCb29sZWFuXCI6XG4gICAgY2FzZSBcIkRhdGVcIjpcbiAgICAgIHJldHVybiBkZWVwRXF1YWwobGVmdEhhbmRPcGVyYW5kLnZhbHVlT2YoKSwgcmlnaHRIYW5kT3BlcmFuZC52YWx1ZU9mKCkpO1xuICAgIGNhc2UgXCJQcm9taXNlXCI6XG4gICAgY2FzZSBcIlN5bWJvbFwiOlxuICAgIGNhc2UgXCJmdW5jdGlvblwiOlxuICAgIGNhc2UgXCJXZWFrTWFwXCI6XG4gICAgY2FzZSBcIldlYWtTZXRcIjpcbiAgICAgIHJldHVybiBsZWZ0SGFuZE9wZXJhbmQgPT09IHJpZ2h0SGFuZE9wZXJhbmQ7XG4gICAgY2FzZSBcIkVycm9yXCI6XG4gICAgICByZXR1cm4ga2V5c0VxdWFsKGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCwgW1wibmFtZVwiLCBcIm1lc3NhZ2VcIiwgXCJjb2RlXCJdLCBvcHRpb25zKTtcbiAgICBjYXNlIFwiQXJndW1lbnRzXCI6XG4gICAgY2FzZSBcIkludDhBcnJheVwiOlxuICAgIGNhc2UgXCJVaW50OEFycmF5XCI6XG4gICAgY2FzZSBcIlVpbnQ4Q2xhbXBlZEFycmF5XCI6XG4gICAgY2FzZSBcIkludDE2QXJyYXlcIjpcbiAgICBjYXNlIFwiVWludDE2QXJyYXlcIjpcbiAgICBjYXNlIFwiSW50MzJBcnJheVwiOlxuICAgIGNhc2UgXCJVaW50MzJBcnJheVwiOlxuICAgIGNhc2UgXCJGbG9hdDMyQXJyYXlcIjpcbiAgICBjYXNlIFwiRmxvYXQ2NEFycmF5XCI6XG4gICAgY2FzZSBcIkFycmF5XCI6XG4gICAgICByZXR1cm4gaXRlcmFibGVFcXVhbChsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQsIG9wdGlvbnMpO1xuICAgIGNhc2UgXCJSZWdFeHBcIjpcbiAgICAgIHJldHVybiByZWdleHBFcXVhbChsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQpO1xuICAgIGNhc2UgXCJHZW5lcmF0b3JcIjpcbiAgICAgIHJldHVybiBnZW5lcmF0b3JFcXVhbChsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQsIG9wdGlvbnMpO1xuICAgIGNhc2UgXCJEYXRhVmlld1wiOlxuICAgICAgcmV0dXJuIGl0ZXJhYmxlRXF1YWwobmV3IFVpbnQ4QXJyYXkobGVmdEhhbmRPcGVyYW5kLmJ1ZmZlciksIG5ldyBVaW50OEFycmF5KHJpZ2h0SGFuZE9wZXJhbmQuYnVmZmVyKSwgb3B0aW9ucyk7XG4gICAgY2FzZSBcIkFycmF5QnVmZmVyXCI6XG4gICAgICByZXR1cm4gaXRlcmFibGVFcXVhbChuZXcgVWludDhBcnJheShsZWZ0SGFuZE9wZXJhbmQpLCBuZXcgVWludDhBcnJheShyaWdodEhhbmRPcGVyYW5kKSwgb3B0aW9ucyk7XG4gICAgY2FzZSBcIlNldFwiOlxuICAgICAgcmV0dXJuIGVudHJpZXNFcXVhbChsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQsIG9wdGlvbnMpO1xuICAgIGNhc2UgXCJNYXBcIjpcbiAgICAgIHJldHVybiBlbnRyaWVzRXF1YWwobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kLCBvcHRpb25zKTtcbiAgICBjYXNlIFwiVGVtcG9yYWwuUGxhaW5EYXRlXCI6XG4gICAgY2FzZSBcIlRlbXBvcmFsLlBsYWluVGltZVwiOlxuICAgIGNhc2UgXCJUZW1wb3JhbC5QbGFpbkRhdGVUaW1lXCI6XG4gICAgY2FzZSBcIlRlbXBvcmFsLkluc3RhbnRcIjpcbiAgICBjYXNlIFwiVGVtcG9yYWwuWm9uZWREYXRlVGltZVwiOlxuICAgIGNhc2UgXCJUZW1wb3JhbC5QbGFpblllYXJNb250aFwiOlxuICAgIGNhc2UgXCJUZW1wb3JhbC5QbGFpbk1vbnRoRGF5XCI6XG4gICAgICByZXR1cm4gbGVmdEhhbmRPcGVyYW5kLmVxdWFscyhyaWdodEhhbmRPcGVyYW5kKTtcbiAgICBjYXNlIFwiVGVtcG9yYWwuRHVyYXRpb25cIjpcbiAgICAgIHJldHVybiBsZWZ0SGFuZE9wZXJhbmQudG90YWwoXCJuYW5vc2Vjb25kc1wiKSA9PT0gcmlnaHRIYW5kT3BlcmFuZC50b3RhbChcIm5hbm9zZWNvbmRzXCIpO1xuICAgIGNhc2UgXCJUZW1wb3JhbC5UaW1lWm9uZVwiOlxuICAgIGNhc2UgXCJUZW1wb3JhbC5DYWxlbmRhclwiOlxuICAgICAgcmV0dXJuIGxlZnRIYW5kT3BlcmFuZC50b1N0cmluZygpID09PSByaWdodEhhbmRPcGVyYW5kLnRvU3RyaW5nKCk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBvYmplY3RFcXVhbChsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQsIG9wdGlvbnMpO1xuICB9XG59XG5fX25hbWUoZXh0ZW5zaXZlRGVlcEVxdWFsQnlUeXBlLCBcImV4dGVuc2l2ZURlZXBFcXVhbEJ5VHlwZVwiKTtcbmZ1bmN0aW9uIHJlZ2V4cEVxdWFsKGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCkge1xuICByZXR1cm4gbGVmdEhhbmRPcGVyYW5kLnRvU3RyaW5nKCkgPT09IHJpZ2h0SGFuZE9wZXJhbmQudG9TdHJpbmcoKTtcbn1cbl9fbmFtZShyZWdleHBFcXVhbCwgXCJyZWdleHBFcXVhbFwiKTtcbmZ1bmN0aW9uIGVudHJpZXNFcXVhbChsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQsIG9wdGlvbnMpIHtcbiAgdHJ5IHtcbiAgICBpZiAobGVmdEhhbmRPcGVyYW5kLnNpemUgIT09IHJpZ2h0SGFuZE9wZXJhbmQuc2l6ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAobGVmdEhhbmRPcGVyYW5kLnNpemUgPT09IDApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfSBjYXRjaCAoc2l6ZUVycm9yKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBsZWZ0SGFuZEl0ZW1zID0gW107XG4gIHZhciByaWdodEhhbmRJdGVtcyA9IFtdO1xuICBsZWZ0SGFuZE9wZXJhbmQuZm9yRWFjaCgvKiBAX19QVVJFX18gKi8gX19uYW1lKGZ1bmN0aW9uIGdhdGhlckVudHJpZXMoa2V5LCB2YWx1ZSkge1xuICAgIGxlZnRIYW5kSXRlbXMucHVzaChba2V5LCB2YWx1ZV0pO1xuICB9LCBcImdhdGhlckVudHJpZXNcIikpO1xuICByaWdodEhhbmRPcGVyYW5kLmZvckVhY2goLyogQF9fUFVSRV9fICovIF9fbmFtZShmdW5jdGlvbiBnYXRoZXJFbnRyaWVzKGtleSwgdmFsdWUpIHtcbiAgICByaWdodEhhbmRJdGVtcy5wdXNoKFtrZXksIHZhbHVlXSk7XG4gIH0sIFwiZ2F0aGVyRW50cmllc1wiKSk7XG4gIHJldHVybiBpdGVyYWJsZUVxdWFsKGxlZnRIYW5kSXRlbXMuc29ydCgpLCByaWdodEhhbmRJdGVtcy5zb3J0KCksIG9wdGlvbnMpO1xufVxuX19uYW1lKGVudHJpZXNFcXVhbCwgXCJlbnRyaWVzRXF1YWxcIik7XG5mdW5jdGlvbiBpdGVyYWJsZUVxdWFsKGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCwgb3B0aW9ucykge1xuICB2YXIgbGVuZ3RoID0gbGVmdEhhbmRPcGVyYW5kLmxlbmd0aDtcbiAgaWYgKGxlbmd0aCAhPT0gcmlnaHRIYW5kT3BlcmFuZC5sZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKGxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHZhciBpbmRleCA9IC0xO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChkZWVwRXF1YWwobGVmdEhhbmRPcGVyYW5kW2luZGV4XSwgcmlnaHRIYW5kT3BlcmFuZFtpbmRleF0sIG9wdGlvbnMpID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cbl9fbmFtZShpdGVyYWJsZUVxdWFsLCBcIml0ZXJhYmxlRXF1YWxcIik7XG5mdW5jdGlvbiBnZW5lcmF0b3JFcXVhbChsZWZ0SGFuZE9wZXJhbmQsIHJpZ2h0SGFuZE9wZXJhbmQsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIGl0ZXJhYmxlRXF1YWwoZ2V0R2VuZXJhdG9yRW50cmllcyhsZWZ0SGFuZE9wZXJhbmQpLCBnZXRHZW5lcmF0b3JFbnRyaWVzKHJpZ2h0SGFuZE9wZXJhbmQpLCBvcHRpb25zKTtcbn1cbl9fbmFtZShnZW5lcmF0b3JFcXVhbCwgXCJnZW5lcmF0b3JFcXVhbFwiKTtcbmZ1bmN0aW9uIGhhc0l0ZXJhdG9yRnVuY3Rpb24odGFyZ2V0KSB7XG4gIHJldHVybiB0eXBlb2YgU3ltYm9sICE9PSBcInVuZGVmaW5lZFwiICYmIHR5cGVvZiB0YXJnZXQgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgdGFyZ2V0W1N5bWJvbC5pdGVyYXRvcl0gPT09IFwiZnVuY3Rpb25cIjtcbn1cbl9fbmFtZShoYXNJdGVyYXRvckZ1bmN0aW9uLCBcImhhc0l0ZXJhdG9yRnVuY3Rpb25cIik7XG5mdW5jdGlvbiBnZXRJdGVyYXRvckVudHJpZXModGFyZ2V0KSB7XG4gIGlmIChoYXNJdGVyYXRvckZ1bmN0aW9uKHRhcmdldCkpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGdldEdlbmVyYXRvckVudHJpZXModGFyZ2V0W1N5bWJvbC5pdGVyYXRvcl0oKSk7XG4gICAgfSBjYXRjaCAoaXRlcmF0b3JFcnJvcikge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgfVxuICByZXR1cm4gW107XG59XG5fX25hbWUoZ2V0SXRlcmF0b3JFbnRyaWVzLCBcImdldEl0ZXJhdG9yRW50cmllc1wiKTtcbmZ1bmN0aW9uIGdldEdlbmVyYXRvckVudHJpZXMoZ2VuZXJhdG9yKSB7XG4gIHZhciBnZW5lcmF0b3JSZXN1bHQgPSBnZW5lcmF0b3IubmV4dCgpO1xuICB2YXIgYWNjdW11bGF0b3IgPSBbZ2VuZXJhdG9yUmVzdWx0LnZhbHVlXTtcbiAgd2hpbGUgKGdlbmVyYXRvclJlc3VsdC5kb25lID09PSBmYWxzZSkge1xuICAgIGdlbmVyYXRvclJlc3VsdCA9IGdlbmVyYXRvci5uZXh0KCk7XG4gICAgYWNjdW11bGF0b3IucHVzaChnZW5lcmF0b3JSZXN1bHQudmFsdWUpO1xuICB9XG4gIHJldHVybiBhY2N1bXVsYXRvcjtcbn1cbl9fbmFtZShnZXRHZW5lcmF0b3JFbnRyaWVzLCBcImdldEdlbmVyYXRvckVudHJpZXNcIik7XG5mdW5jdGlvbiBnZXRFbnVtZXJhYmxlS2V5cyh0YXJnZXQpIHtcbiAgdmFyIGtleXMgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIHRhcmdldCkge1xuICAgIGtleXMucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiBrZXlzO1xufVxuX19uYW1lKGdldEVudW1lcmFibGVLZXlzLCBcImdldEVudW1lcmFibGVLZXlzXCIpO1xuZnVuY3Rpb24gZ2V0RW51bWVyYWJsZVN5bWJvbHModGFyZ2V0KSB7XG4gIHZhciBrZXlzID0gW107XG4gIHZhciBhbGxLZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyh0YXJnZXQpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGFsbEtleXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICB2YXIga2V5ID0gYWxsS2V5c1tpXTtcbiAgICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkuZW51bWVyYWJsZSkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBrZXlzO1xufVxuX19uYW1lKGdldEVudW1lcmFibGVTeW1ib2xzLCBcImdldEVudW1lcmFibGVTeW1ib2xzXCIpO1xuZnVuY3Rpb24ga2V5c0VxdWFsKGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCwga2V5cywgb3B0aW9ucykge1xuICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gIGlmIChsZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgaWYgKGRlZXBFcXVhbChsZWZ0SGFuZE9wZXJhbmRba2V5c1tpXV0sIHJpZ2h0SGFuZE9wZXJhbmRba2V5c1tpXV0sIG9wdGlvbnMpID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cbl9fbmFtZShrZXlzRXF1YWwsIFwia2V5c0VxdWFsXCIpO1xuZnVuY3Rpb24gb2JqZWN0RXF1YWwobGVmdEhhbmRPcGVyYW5kLCByaWdodEhhbmRPcGVyYW5kLCBvcHRpb25zKSB7XG4gIHZhciBsZWZ0SGFuZEtleXMgPSBnZXRFbnVtZXJhYmxlS2V5cyhsZWZ0SGFuZE9wZXJhbmQpO1xuICB2YXIgcmlnaHRIYW5kS2V5cyA9IGdldEVudW1lcmFibGVLZXlzKHJpZ2h0SGFuZE9wZXJhbmQpO1xuICB2YXIgbGVmdEhhbmRTeW1ib2xzID0gZ2V0RW51bWVyYWJsZVN5bWJvbHMobGVmdEhhbmRPcGVyYW5kKTtcbiAgdmFyIHJpZ2h0SGFuZFN5bWJvbHMgPSBnZXRFbnVtZXJhYmxlU3ltYm9scyhyaWdodEhhbmRPcGVyYW5kKTtcbiAgbGVmdEhhbmRLZXlzID0gbGVmdEhhbmRLZXlzLmNvbmNhdChsZWZ0SGFuZFN5bWJvbHMpO1xuICByaWdodEhhbmRLZXlzID0gcmlnaHRIYW5kS2V5cy5jb25jYXQocmlnaHRIYW5kU3ltYm9scyk7XG4gIGlmIChsZWZ0SGFuZEtleXMubGVuZ3RoICYmIGxlZnRIYW5kS2V5cy5sZW5ndGggPT09IHJpZ2h0SGFuZEtleXMubGVuZ3RoKSB7XG4gICAgaWYgKGl0ZXJhYmxlRXF1YWwobWFwU3ltYm9scyhsZWZ0SGFuZEtleXMpLnNvcnQoKSwgbWFwU3ltYm9scyhyaWdodEhhbmRLZXlzKS5zb3J0KCkpID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4ga2V5c0VxdWFsKGxlZnRIYW5kT3BlcmFuZCwgcmlnaHRIYW5kT3BlcmFuZCwgbGVmdEhhbmRLZXlzLCBvcHRpb25zKTtcbiAgfVxuICB2YXIgbGVmdEhhbmRFbnRyaWVzID0gZ2V0SXRlcmF0b3JFbnRyaWVzKGxlZnRIYW5kT3BlcmFuZCk7XG4gIHZhciByaWdodEhhbmRFbnRyaWVzID0gZ2V0SXRlcmF0b3JFbnRyaWVzKHJpZ2h0SGFuZE9wZXJhbmQpO1xuICBpZiAobGVmdEhhbmRFbnRyaWVzLmxlbmd0aCAmJiBsZWZ0SGFuZEVudHJpZXMubGVuZ3RoID09PSByaWdodEhhbmRFbnRyaWVzLmxlbmd0aCkge1xuICAgIGxlZnRIYW5kRW50cmllcy5zb3J0KCk7XG4gICAgcmlnaHRIYW5kRW50cmllcy5zb3J0KCk7XG4gICAgcmV0dXJuIGl0ZXJhYmxlRXF1YWwobGVmdEhhbmRFbnRyaWVzLCByaWdodEhhbmRFbnRyaWVzLCBvcHRpb25zKTtcbiAgfVxuICBpZiAobGVmdEhhbmRLZXlzLmxlbmd0aCA9PT0gMCAmJiBsZWZ0SGFuZEVudHJpZXMubGVuZ3RoID09PSAwICYmIHJpZ2h0SGFuZEtleXMubGVuZ3RoID09PSAwICYmIHJpZ2h0SGFuZEVudHJpZXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuX19uYW1lKG9iamVjdEVxdWFsLCBcIm9iamVjdEVxdWFsXCIpO1xuZnVuY3Rpb24gaXNQcmltaXRpdmUodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID09PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIjtcbn1cbl9fbmFtZShpc1ByaW1pdGl2ZSwgXCJpc1ByaW1pdGl2ZVwiKTtcbmZ1bmN0aW9uIG1hcFN5bWJvbHMoYXJyKSB7XG4gIHJldHVybiBhcnIubWFwKC8qIEBfX1BVUkVfXyAqLyBfX25hbWUoZnVuY3Rpb24gbWFwU3ltYm9sKGVudHJ5KSB7XG4gICAgaWYgKHR5cGVvZiBlbnRyeSA9PT0gXCJzeW1ib2xcIikge1xuICAgICAgcmV0dXJuIGVudHJ5LnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIHJldHVybiBlbnRyeTtcbiAgfSwgXCJtYXBTeW1ib2xcIikpO1xufVxuX19uYW1lKG1hcFN5bWJvbHMsIFwibWFwU3ltYm9sc1wiKTtcblxuLy8gbm9kZV9tb2R1bGVzL3BhdGh2YWwvaW5kZXguanNcbmZ1bmN0aW9uIGhhc1Byb3BlcnR5KG9iaiwgbmFtZSkge1xuICBpZiAodHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIiB8fCBvYmogPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIG5hbWUgaW4gT2JqZWN0KG9iaik7XG59XG5fX25hbWUoaGFzUHJvcGVydHksIFwiaGFzUHJvcGVydHlcIik7XG5mdW5jdGlvbiBwYXJzZVBhdGgocGF0aCkge1xuICBjb25zdCBzdHIgPSBwYXRoLnJlcGxhY2UoLyhbXlxcXFxdKVxcWy9nLCBcIiQxLltcIik7XG4gIGNvbnN0IHBhcnRzID0gc3RyLm1hdGNoKC8oXFxcXFxcLnxbXi5dKz8pKy9nKTtcbiAgcmV0dXJuIHBhcnRzLm1hcCgodmFsdWUpID0+IHtcbiAgICBpZiAodmFsdWUgPT09IFwiY29uc3RydWN0b3JcIiB8fCB2YWx1ZSA9PT0gXCJfX3Byb3RvX19cIiB8fCB2YWx1ZSA9PT0gXCJwcm90b3R5cGVcIikge1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgICBjb25zdCByZWdleHAgPSAvXlxcWyhcXGQrKVxcXSQvO1xuICAgIGNvbnN0IG1BcnIgPSByZWdleHAuZXhlYyh2YWx1ZSk7XG4gICAgbGV0IHBhcnNlZCA9IG51bGw7XG4gICAgaWYgKG1BcnIpIHtcbiAgICAgIHBhcnNlZCA9IHsgaTogcGFyc2VGbG9hdChtQXJyWzFdKSB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJzZWQgPSB7IHA6IHZhbHVlLnJlcGxhY2UoL1xcXFwoWy5bXFxdXSkvZywgXCIkMVwiKSB9O1xuICAgIH1cbiAgICByZXR1cm4gcGFyc2VkO1xuICB9KTtcbn1cbl9fbmFtZShwYXJzZVBhdGgsIFwicGFyc2VQYXRoXCIpO1xuZnVuY3Rpb24gaW50ZXJuYWxHZXRQYXRoVmFsdWUob2JqLCBwYXJzZWQsIHBhdGhEZXB0aCkge1xuICBsZXQgdGVtcG9yYXJ5VmFsdWUgPSBvYmo7XG4gIGxldCByZXMgPSBudWxsO1xuICBwYXRoRGVwdGggPSB0eXBlb2YgcGF0aERlcHRoID09PSBcInVuZGVmaW5lZFwiID8gcGFyc2VkLmxlbmd0aCA6IHBhdGhEZXB0aDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXRoRGVwdGg7IGkrKykge1xuICAgIGNvbnN0IHBhcnQgPSBwYXJzZWRbaV07XG4gICAgaWYgKHRlbXBvcmFyeVZhbHVlKSB7XG4gICAgICBpZiAodHlwZW9mIHBhcnQucCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICB0ZW1wb3JhcnlWYWx1ZSA9IHRlbXBvcmFyeVZhbHVlW3BhcnQuaV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0ZW1wb3JhcnlWYWx1ZSA9IHRlbXBvcmFyeVZhbHVlW3BhcnQucF07XG4gICAgICB9XG4gICAgICBpZiAoaSA9PT0gcGF0aERlcHRoIC0gMSkge1xuICAgICAgICByZXMgPSB0ZW1wb3JhcnlWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cbl9fbmFtZShpbnRlcm5hbEdldFBhdGhWYWx1ZSwgXCJpbnRlcm5hbEdldFBhdGhWYWx1ZVwiKTtcbmZ1bmN0aW9uIGdldFBhdGhJbmZvKG9iaiwgcGF0aCkge1xuICBjb25zdCBwYXJzZWQgPSBwYXJzZVBhdGgocGF0aCk7XG4gIGNvbnN0IGxhc3QgPSBwYXJzZWRbcGFyc2VkLmxlbmd0aCAtIDFdO1xuICBjb25zdCBpbmZvID0ge1xuICAgIHBhcmVudDogcGFyc2VkLmxlbmd0aCA+IDEgPyBpbnRlcm5hbEdldFBhdGhWYWx1ZShvYmosIHBhcnNlZCwgcGFyc2VkLmxlbmd0aCAtIDEpIDogb2JqLFxuICAgIG5hbWU6IGxhc3QucCB8fCBsYXN0LmksXG4gICAgdmFsdWU6IGludGVybmFsR2V0UGF0aFZhbHVlKG9iaiwgcGFyc2VkKVxuICB9O1xuICBpbmZvLmV4aXN0cyA9IGhhc1Byb3BlcnR5KGluZm8ucGFyZW50LCBpbmZvLm5hbWUpO1xuICByZXR1cm4gaW5mbztcbn1cbl9fbmFtZShnZXRQYXRoSW5mbywgXCJnZXRQYXRoSW5mb1wiKTtcblxuLy8gbGliL2NoYWkvYXNzZXJ0aW9uLmpzXG52YXIgQXNzZXJ0aW9uID0gY2xhc3MgX0Fzc2VydGlvbiB7XG4gIHN0YXRpYyB7XG4gICAgX19uYW1lKHRoaXMsIFwiQXNzZXJ0aW9uXCIpO1xuICB9XG4gIC8qKiBAdHlwZSB7e319ICovXG4gIF9fZmxhZ3MgPSB7fTtcbiAgLyoqXG4gICAqIENyZWF0ZXMgb2JqZWN0IGZvciBjaGFpbmluZy5cbiAgICogYEFzc2VydGlvbmAgb2JqZWN0cyBjb250YWluIG1ldGFkYXRhIGluIHRoZSBmb3JtIG9mIGZsYWdzLiBUaHJlZSBmbGFncyBjYW5cbiAgICogYmUgYXNzaWduZWQgZHVyaW5nIGluc3RhbnRpYXRpb24gYnkgcGFzc2luZyBhcmd1bWVudHMgdG8gdGhpcyBjb25zdHJ1Y3RvcjpcbiAgICpcbiAgICogLSBgb2JqZWN0YDogVGhpcyBmbGFnIGNvbnRhaW5zIHRoZSB0YXJnZXQgb2YgdGhlIGFzc2VydGlvbi4gRm9yIGV4YW1wbGUsIGluXG4gICAqIHRoZSBhc3NlcnRpb24gYGV4cGVjdChudW1LaXR0ZW5zKS50by5lcXVhbCg3KTtgLCB0aGUgYG9iamVjdGAgZmxhZyB3aWxsXG4gICAqIGNvbnRhaW4gYG51bUtpdHRlbnNgIHNvIHRoYXQgdGhlIGBlcXVhbGAgYXNzZXJ0aW9uIGNhbiByZWZlcmVuY2UgaXQgd2hlblxuICAgKiBuZWVkZWQuXG4gICAqXG4gICAqIC0gYG1lc3NhZ2VgOiBUaGlzIGZsYWcgY29udGFpbnMgYW4gb3B0aW9uYWwgY3VzdG9tIGVycm9yIG1lc3NhZ2UgdG8gYmVcbiAgICogcHJlcGVuZGVkIHRvIHRoZSBlcnJvciBtZXNzYWdlIHRoYXQncyBnZW5lcmF0ZWQgYnkgdGhlIGFzc2VydGlvbiB3aGVuIGl0XG4gICAqIGZhaWxzLlxuICAgKlxuICAgKiAtIGBzc2ZpYDogVGhpcyBmbGFnIHN0YW5kcyBmb3IgXCJzdGFydCBzdGFjayBmdW5jdGlvbiBpbmRpY2F0b3JcIi4gSXRcbiAgICogY29udGFpbnMgYSBmdW5jdGlvbiByZWZlcmVuY2UgdGhhdCBzZXJ2ZXMgYXMgdGhlIHN0YXJ0aW5nIHBvaW50IGZvclxuICAgKiByZW1vdmluZyBmcmFtZXMgZnJvbSB0aGUgc3RhY2sgdHJhY2Ugb2YgdGhlIGVycm9yIHRoYXQncyBjcmVhdGVkIGJ5IHRoZVxuICAgKiBhc3NlcnRpb24gd2hlbiBpdCBmYWlscy4gVGhlIGdvYWwgaXMgdG8gcHJvdmlkZSBhIGNsZWFuZXIgc3RhY2sgdHJhY2UgdG9cbiAgICogZW5kIHVzZXJzIGJ5IHJlbW92aW5nIENoYWkncyBpbnRlcm5hbCBmdW5jdGlvbnMuIE5vdGUgdGhhdCBpdCBvbmx5IHdvcmtzXG4gICAqIGluIGVudmlyb25tZW50cyB0aGF0IHN1cHBvcnQgYEVycm9yLmNhcHR1cmVTdGFja1RyYWNlYCwgYW5kIG9ubHkgd2hlblxuICAgKiBgQ2hhaS5jb25maWcuaW5jbHVkZVN0YWNrYCBoYXNuJ3QgYmVlbiBzZXQgdG8gYGZhbHNlYC5cbiAgICpcbiAgICogLSBgbG9ja1NzZmlgOiBUaGlzIGZsYWcgY29udHJvbHMgd2hldGhlciBvciBub3QgdGhlIGdpdmVuIGBzc2ZpYCBmbGFnXG4gICAqIHNob3VsZCByZXRhaW4gaXRzIGN1cnJlbnQgdmFsdWUsIGV2ZW4gYXMgYXNzZXJ0aW9ucyBhcmUgY2hhaW5lZCBvZmYgb2ZcbiAgICogdGhpcyBvYmplY3QuIFRoaXMgaXMgdXN1YWxseSBzZXQgdG8gYHRydWVgIHdoZW4gY3JlYXRpbmcgYSBuZXcgYXNzZXJ0aW9uXG4gICAqIGZyb20gd2l0aGluIGFub3RoZXIgYXNzZXJ0aW9uLiBJdCdzIGFsc28gdGVtcG9yYXJpbHkgc2V0IHRvIGB0cnVlYCBiZWZvcmVcbiAgICogYW4gb3ZlcndyaXR0ZW4gYXNzZXJ0aW9uIGdldHMgY2FsbGVkIGJ5IHRoZSBvdmVyd3JpdGluZyBhc3NlcnRpb24uXG4gICAqXG4gICAqIC0gYGVxbGA6IFRoaXMgZmxhZyBjb250YWlucyB0aGUgZGVlcEVxdWFsIGZ1bmN0aW9uIHRvIGJlIHVzZWQgYnkgdGhlIGFzc2VydGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHt1bmtub3dufSBvYmogdGFyZ2V0IG9mIHRoZSBhc3NlcnRpb25cbiAgICogQHBhcmFtIHtzdHJpbmd9IFttc2ddIChvcHRpb25hbCkgY3VzdG9tIGVycm9yIG1lc3NhZ2VcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW3NzZmldIChvcHRpb25hbCkgc3RhcnRpbmcgcG9pbnQgZm9yIHJlbW92aW5nIHN0YWNrIGZyYW1lc1xuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtsb2NrU3NmaV0gKG9wdGlvbmFsKSB3aGV0aGVyIG9yIG5vdCB0aGUgc3NmaSBmbGFnIGlzIGxvY2tlZFxuICAgKi9cbiAgY29uc3RydWN0b3Iob2JqLCBtc2csIHNzZmksIGxvY2tTc2ZpKSB7XG4gICAgZmxhZyh0aGlzLCBcInNzZmlcIiwgc3NmaSB8fCBfQXNzZXJ0aW9uKTtcbiAgICBmbGFnKHRoaXMsIFwibG9ja1NzZmlcIiwgbG9ja1NzZmkpO1xuICAgIGZsYWcodGhpcywgXCJvYmplY3RcIiwgb2JqKTtcbiAgICBmbGFnKHRoaXMsIFwibWVzc2FnZVwiLCBtc2cpO1xuICAgIGZsYWcodGhpcywgXCJlcWxcIiwgY29uZmlnLmRlZXBFcXVhbCB8fCBkZWVwX2VxbF9kZWZhdWx0KTtcbiAgICByZXR1cm4gcHJveGlmeSh0aGlzKTtcbiAgfVxuICAvKiogQHJldHVybnMge2Jvb2xlYW59ICovXG4gIHN0YXRpYyBnZXQgaW5jbHVkZVN0YWNrKCkge1xuICAgIGNvbnNvbGUud2FybihcbiAgICAgIFwiQXNzZXJ0aW9uLmluY2x1ZGVTdGFjayBpcyBkZXByZWNhdGVkLCB1c2UgY2hhaS5jb25maWcuaW5jbHVkZVN0YWNrIGluc3RlYWQuXCJcbiAgICApO1xuICAgIHJldHVybiBjb25maWcuaW5jbHVkZVN0YWNrO1xuICB9XG4gIC8qKiBAcGFyYW0ge2Jvb2xlYW59IHZhbHVlICovXG4gIHN0YXRpYyBzZXQgaW5jbHVkZVN0YWNrKHZhbHVlKSB7XG4gICAgY29uc29sZS53YXJuKFxuICAgICAgXCJBc3NlcnRpb24uaW5jbHVkZVN0YWNrIGlzIGRlcHJlY2F0ZWQsIHVzZSBjaGFpLmNvbmZpZy5pbmNsdWRlU3RhY2sgaW5zdGVhZC5cIlxuICAgICk7XG4gICAgY29uZmlnLmluY2x1ZGVTdGFjayA9IHZhbHVlO1xuICB9XG4gIC8qKiBAcmV0dXJucyB7Ym9vbGVhbn0gKi9cbiAgc3RhdGljIGdldCBzaG93RGlmZigpIHtcbiAgICBjb25zb2xlLndhcm4oXG4gICAgICBcIkFzc2VydGlvbi5zaG93RGlmZiBpcyBkZXByZWNhdGVkLCB1c2UgY2hhaS5jb25maWcuc2hvd0RpZmYgaW5zdGVhZC5cIlxuICAgICk7XG4gICAgcmV0dXJuIGNvbmZpZy5zaG93RGlmZjtcbiAgfVxuICAvKiogQHBhcmFtIHtib29sZWFufSB2YWx1ZSAqL1xuICBzdGF0aWMgc2V0IHNob3dEaWZmKHZhbHVlKSB7XG4gICAgY29uc29sZS53YXJuKFxuICAgICAgXCJBc3NlcnRpb24uc2hvd0RpZmYgaXMgZGVwcmVjYXRlZCwgdXNlIGNoYWkuY29uZmlnLnNob3dEaWZmIGluc3RlYWQuXCJcbiAgICApO1xuICAgIGNvbmZpZy5zaG93RGlmZiA9IHZhbHVlO1xuICB9XG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgKi9cbiAgc3RhdGljIGFkZFByb3BlcnR5KG5hbWUsIGZuKSB7XG4gICAgYWRkUHJvcGVydHkodGhpcy5wcm90b3R5cGUsIG5hbWUsIGZuKTtcbiAgfVxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICovXG4gIHN0YXRpYyBhZGRNZXRob2QobmFtZSwgZm4pIHtcbiAgICBhZGRNZXRob2QodGhpcy5wcm90b3R5cGUsIG5hbWUsIGZuKTtcbiAgfVxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2hhaW5pbmdCZWhhdmlvclxuICAgKi9cbiAgc3RhdGljIGFkZENoYWluYWJsZU1ldGhvZChuYW1lLCBmbiwgY2hhaW5pbmdCZWhhdmlvcikge1xuICAgIGFkZENoYWluYWJsZU1ldGhvZCh0aGlzLnByb3RvdHlwZSwgbmFtZSwgZm4sIGNoYWluaW5nQmVoYXZpb3IpO1xuICB9XG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgKi9cbiAgc3RhdGljIG92ZXJ3cml0ZVByb3BlcnR5KG5hbWUsIGZuKSB7XG4gICAgb3ZlcndyaXRlUHJvcGVydHkodGhpcy5wcm90b3R5cGUsIG5hbWUsIGZuKTtcbiAgfVxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICovXG4gIHN0YXRpYyBvdmVyd3JpdGVNZXRob2QobmFtZSwgZm4pIHtcbiAgICBvdmVyd3JpdGVNZXRob2QodGhpcy5wcm90b3R5cGUsIG5hbWUsIGZuKTtcbiAgfVxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2hhaW5pbmdCZWhhdmlvclxuICAgKi9cbiAgc3RhdGljIG92ZXJ3cml0ZUNoYWluYWJsZU1ldGhvZChuYW1lLCBmbiwgY2hhaW5pbmdCZWhhdmlvcikge1xuICAgIG92ZXJ3cml0ZUNoYWluYWJsZU1ldGhvZCh0aGlzLnByb3RvdHlwZSwgbmFtZSwgZm4sIGNoYWluaW5nQmVoYXZpb3IpO1xuICB9XG4gIC8qKlxuICAgKiAjIyMgLmFzc2VydChleHByZXNzaW9uLCBtZXNzYWdlLCBuZWdhdGVNZXNzYWdlLCBleHBlY3RlZCwgYWN0dWFsLCBzaG93RGlmZilcbiAgICpcbiAgICogRXhlY3V0ZXMgYW4gZXhwcmVzc2lvbiBhbmQgY2hlY2sgZXhwZWN0YXRpb25zLiBUaHJvd3MgQXNzZXJ0aW9uRXJyb3IgZm9yIHJlcG9ydGluZyBpZiB0ZXN0IGRvZXNuJ3QgcGFzcy5cbiAgICpcbiAgICogQG5hbWUgYXNzZXJ0XG4gICAqIEBwYXJhbSB7dW5rbm93bn0gX2V4cHIgdG8gYmUgdGVzdGVkXG4gICAqIEBwYXJhbSB7c3RyaW5nIHwgRnVuY3Rpb259IG1zZyBvciBmdW5jdGlvbiB0aGF0IHJldHVybnMgbWVzc2FnZSB0byBkaXNwbGF5IGlmIGV4cHJlc3Npb24gZmFpbHNcbiAgICogQHBhcmFtIHtzdHJpbmcgfCBGdW5jdGlvbn0gX25lZ2F0ZU1zZyBvciBmdW5jdGlvbiB0aGF0IHJldHVybnMgbmVnYXRlZE1lc3NhZ2UgdG8gZGlzcGxheSBpZiBuZWdhdGVkIGV4cHJlc3Npb24gZmFpbHNcbiAgICogQHBhcmFtIHt1bmtub3dufSBleHBlY3RlZCB2YWx1ZSAocmVtZW1iZXIgdG8gY2hlY2sgZm9yIG5lZ2F0aW9uKVxuICAgKiBAcGFyYW0ge3Vua25vd259IF9hY3R1YWwgKG9wdGlvbmFsKSB3aWxsIGRlZmF1bHQgdG8gYHRoaXMub2JqYFxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHNob3dEaWZmIChvcHRpb25hbCkgd2hlbiBzZXQgdG8gYHRydWVgLCBhc3NlcnQgd2lsbCBkaXNwbGF5IGEgZGlmZiBpbiBhZGRpdGlvbiB0byB0aGUgbWVzc2FnZSBpZiBleHByZXNzaW9uIGZhaWxzXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cbiAgYXNzZXJ0KF9leHByLCBtc2csIF9uZWdhdGVNc2csIGV4cGVjdGVkLCBfYWN0dWFsLCBzaG93RGlmZikge1xuICAgIGNvbnN0IG9rID0gdGVzdCh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmIChmYWxzZSAhPT0gc2hvd0RpZmYpIHNob3dEaWZmID0gdHJ1ZTtcbiAgICBpZiAodm9pZCAwID09PSBleHBlY3RlZCAmJiB2b2lkIDAgPT09IF9hY3R1YWwpIHNob3dEaWZmID0gZmFsc2U7XG4gICAgaWYgKHRydWUgIT09IGNvbmZpZy5zaG93RGlmZikgc2hvd0RpZmYgPSBmYWxzZTtcbiAgICBpZiAoIW9rKSB7XG4gICAgICBtc2cgPSBnZXRNZXNzYWdlMih0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgY29uc3QgYWN0dWFsID0gZ2V0QWN0dWFsKHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICBjb25zdCBhc3NlcnRpb25FcnJvck9iamVjdFByb3BlcnRpZXMgPSB7XG4gICAgICAgIGFjdHVhbCxcbiAgICAgICAgZXhwZWN0ZWQsXG4gICAgICAgIHNob3dEaWZmXG4gICAgICB9O1xuICAgICAgY29uc3Qgb3BlcmF0b3IgPSBnZXRPcGVyYXRvcih0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgaWYgKG9wZXJhdG9yKSB7XG4gICAgICAgIGFzc2VydGlvbkVycm9yT2JqZWN0UHJvcGVydGllcy5vcGVyYXRvciA9IG9wZXJhdG9yO1xuICAgICAgfVxuICAgICAgdGhyb3cgbmV3IEFzc2VydGlvbkVycm9yKFxuICAgICAgICBtc2csXG4gICAgICAgIGFzc2VydGlvbkVycm9yT2JqZWN0UHJvcGVydGllcyxcbiAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciBOb3Qgc3VyZSB3aGF0IHRvIGRvIGFib3V0IHRoZXNlIHR5cGVzIHlldFxuICAgICAgICBjb25maWcuaW5jbHVkZVN0YWNrID8gdGhpcy5hc3NlcnQgOiBmbGFnKHRoaXMsIFwic3NmaVwiKVxuICAgICAgKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIFF1aWNrIHJlZmVyZW5jZSB0byBzdG9yZWQgYGFjdHVhbGAgdmFsdWUgZm9yIHBsdWdpbiBkZXZlbG9wZXJzLlxuICAgKlxuICAgKiBAcmV0dXJucyB7dW5rbm93bn1cbiAgICovXG4gIGdldCBfb2JqKCkge1xuICAgIHJldHVybiBmbGFnKHRoaXMsIFwib2JqZWN0XCIpO1xuICB9XG4gIC8qKlxuICAgKiBRdWljayByZWZlcmVuY2UgdG8gc3RvcmVkIGBhY3R1YWxgIHZhbHVlIGZvciBwbHVnaW4gZGV2ZWxvcGVycy5cbiAgICpcbiAgICogQHBhcmFtIHt1bmtub3dufSB2YWxcbiAgICovXG4gIHNldCBfb2JqKHZhbCkge1xuICAgIGZsYWcodGhpcywgXCJvYmplY3RcIiwgdmFsKTtcbiAgfVxufTtcblxuLy8gbGliL2NoYWkvdXRpbHMvaXNQcm94eUVuYWJsZWQuanNcbmZ1bmN0aW9uIGlzUHJveHlFbmFibGVkKCkge1xuICByZXR1cm4gY29uZmlnLnVzZVByb3h5ICYmIHR5cGVvZiBQcm94eSAhPT0gXCJ1bmRlZmluZWRcIiAmJiB0eXBlb2YgUmVmbGVjdCAhPT0gXCJ1bmRlZmluZWRcIjtcbn1cbl9fbmFtZShpc1Byb3h5RW5hYmxlZCwgXCJpc1Byb3h5RW5hYmxlZFwiKTtcblxuLy8gbGliL2NoYWkvdXRpbHMvYWRkUHJvcGVydHkuanNcbmZ1bmN0aW9uIGFkZFByb3BlcnR5KGN0eCwgbmFtZSwgZ2V0dGVyKSB7XG4gIGdldHRlciA9IGdldHRlciA9PT0gdm9pZCAwID8gZnVuY3Rpb24oKSB7XG4gIH0gOiBnZXR0ZXI7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjdHgsIG5hbWUsIHtcbiAgICBnZXQ6IC8qIEBfX1BVUkVfXyAqLyBfX25hbWUoZnVuY3Rpb24gcHJvcGVydHlHZXR0ZXIoKSB7XG4gICAgICBpZiAoIWlzUHJveHlFbmFibGVkKCkgJiYgIWZsYWcodGhpcywgXCJsb2NrU3NmaVwiKSkge1xuICAgICAgICBmbGFnKHRoaXMsIFwic3NmaVwiLCBwcm9wZXJ0eUdldHRlcik7XG4gICAgICB9XG4gICAgICBsZXQgcmVzdWx0ID0gZ2V0dGVyLmNhbGwodGhpcyk7XG4gICAgICBpZiAocmVzdWx0ICE9PSB2b2lkIDApIHJldHVybiByZXN1bHQ7XG4gICAgICBsZXQgbmV3QXNzZXJ0aW9uID0gbmV3IEFzc2VydGlvbigpO1xuICAgICAgdHJhbnNmZXJGbGFncyh0aGlzLCBuZXdBc3NlcnRpb24pO1xuICAgICAgcmV0dXJuIG5ld0Fzc2VydGlvbjtcbiAgICB9LCBcInByb3BlcnR5R2V0dGVyXCIpLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KTtcbn1cbl9fbmFtZShhZGRQcm9wZXJ0eSwgXCJhZGRQcm9wZXJ0eVwiKTtcblxuLy8gbGliL2NoYWkvdXRpbHMvYWRkTGVuZ3RoR3VhcmQuanNcbnZhciBmbkxlbmd0aERlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGZ1bmN0aW9uKCkge1xufSwgXCJsZW5ndGhcIik7XG5mdW5jdGlvbiBhZGRMZW5ndGhHdWFyZChmbiwgYXNzZXJ0aW9uTmFtZSwgaXNDaGFpbmFibGUpIHtcbiAgaWYgKCFmbkxlbmd0aERlc2MuY29uZmlndXJhYmxlKSByZXR1cm4gZm47XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgXCJsZW5ndGhcIiwge1xuICAgIGdldDogLyogQF9fUFVSRV9fICovIF9fbmFtZShmdW5jdGlvbigpIHtcbiAgICAgIGlmIChpc0NoYWluYWJsZSkge1xuICAgICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgICBcIkludmFsaWQgQ2hhaSBwcm9wZXJ0eTogXCIgKyBhc3NlcnRpb25OYW1lICsgJy5sZW5ndGguIER1ZSB0byBhIGNvbXBhdGliaWxpdHkgaXNzdWUsIFwibGVuZ3RoXCIgY2Fubm90IGRpcmVjdGx5IGZvbGxvdyBcIicgKyBhc3NlcnRpb25OYW1lICsgJ1wiLiBVc2UgXCInICsgYXNzZXJ0aW9uTmFtZSArICcubGVuZ3RoT2ZcIiBpbnN0ZWFkLidcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHRocm93IEVycm9yKFxuICAgICAgICBcIkludmFsaWQgQ2hhaSBwcm9wZXJ0eTogXCIgKyBhc3NlcnRpb25OYW1lICsgJy5sZW5ndGguIFNlZSBkb2NzIGZvciBwcm9wZXIgdXNhZ2Ugb2YgXCInICsgYXNzZXJ0aW9uTmFtZSArICdcIi4nXG4gICAgICApO1xuICAgIH0sIFwiZ2V0XCIpXG4gIH0pO1xuICByZXR1cm4gZm47XG59XG5fX25hbWUoYWRkTGVuZ3RoR3VhcmQsIFwiYWRkTGVuZ3RoR3VhcmRcIik7XG5cbi8vIGxpYi9jaGFpL3V0aWxzL2dldFByb3BlcnRpZXMuanNcbmZ1bmN0aW9uIGdldFByb3BlcnRpZXMob2JqZWN0KSB7XG4gIGxldCByZXN1bHQgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmplY3QpO1xuICBmdW5jdGlvbiBhZGRQcm9wZXJ0eTIocHJvcGVydHkpIHtcbiAgICBpZiAocmVzdWx0LmluZGV4T2YocHJvcGVydHkpID09PSAtMSkge1xuICAgICAgcmVzdWx0LnB1c2gocHJvcGVydHkpO1xuICAgIH1cbiAgfVxuICBfX25hbWUoYWRkUHJvcGVydHkyLCBcImFkZFByb3BlcnR5XCIpO1xuICBsZXQgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTtcbiAgd2hpbGUgKHByb3RvICE9PSBudWxsKSB7XG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMocHJvdG8pLmZvckVhY2goYWRkUHJvcGVydHkyKTtcbiAgICBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihwcm90byk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbl9fbmFtZShnZXRQcm9wZXJ0aWVzLCBcImdldFByb3BlcnRpZXNcIik7XG5cbi8vIGxpYi9jaGFpL3V0aWxzL3Byb3hpZnkuanNcbnZhciBidWlsdGlucyA9IFtcIl9fZmxhZ3NcIiwgXCJfX21ldGhvZHNcIiwgXCJfb2JqXCIsIFwiYXNzZXJ0XCJdO1xuZnVuY3Rpb24gcHJveGlmeShvYmosIG5vbkNoYWluYWJsZU1ldGhvZE5hbWUpIHtcbiAgaWYgKCFpc1Byb3h5RW5hYmxlZCgpKSByZXR1cm4gb2JqO1xuICByZXR1cm4gbmV3IFByb3h5KG9iaiwge1xuICAgIGdldDogLyogQF9fUFVSRV9fICovIF9fbmFtZShmdW5jdGlvbiBwcm94eUdldHRlcih0YXJnZXQsIHByb3BlcnR5KSB7XG4gICAgICBpZiAodHlwZW9mIHByb3BlcnR5ID09PSBcInN0cmluZ1wiICYmIGNvbmZpZy5wcm94eUV4Y2x1ZGVkS2V5cy5pbmRleE9mKHByb3BlcnR5KSA9PT0gLTEgJiYgIVJlZmxlY3QuaGFzKHRhcmdldCwgcHJvcGVydHkpKSB7XG4gICAgICAgIGlmIChub25DaGFpbmFibGVNZXRob2ROYW1lKSB7XG4gICAgICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgICAgICBcIkludmFsaWQgQ2hhaSBwcm9wZXJ0eTogXCIgKyBub25DaGFpbmFibGVNZXRob2ROYW1lICsgXCIuXCIgKyBwcm9wZXJ0eSArICcuIFNlZSBkb2NzIGZvciBwcm9wZXIgdXNhZ2Ugb2YgXCInICsgbm9uQ2hhaW5hYmxlTWV0aG9kTmFtZSArICdcIi4nXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc3VnZ2VzdGlvbiA9IG51bGw7XG4gICAgICAgIGxldCBzdWdnZXN0aW9uRGlzdGFuY2UgPSA0O1xuICAgICAgICBnZXRQcm9wZXJ0aWVzKHRhcmdldCkuZm9yRWFjaChmdW5jdGlvbihwcm9wKSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgLy8gd2UgYWN0dWFsbHkgbWVhbiB0byBjaGVjayBgT2JqZWN0LnByb3RvdHlwZWAgaGVyZVxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuICAgICAgICAgICAgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkocHJvcCkgJiYgYnVpbHRpbnMuaW5kZXhPZihwcm9wKSA9PT0gLTFcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGxldCBkaXN0ID0gc3RyaW5nRGlzdGFuY2VDYXBwZWQocHJvcGVydHksIHByb3AsIHN1Z2dlc3Rpb25EaXN0YW5jZSk7XG4gICAgICAgICAgICBpZiAoZGlzdCA8IHN1Z2dlc3Rpb25EaXN0YW5jZSkge1xuICAgICAgICAgICAgICBzdWdnZXN0aW9uID0gcHJvcDtcbiAgICAgICAgICAgICAgc3VnZ2VzdGlvbkRpc3RhbmNlID0gZGlzdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoc3VnZ2VzdGlvbiAhPT0gbnVsbCkge1xuICAgICAgICAgIHRocm93IEVycm9yKFxuICAgICAgICAgICAgXCJJbnZhbGlkIENoYWkgcHJvcGVydHk6IFwiICsgcHJvcGVydHkgKyAnLiBEaWQgeW91IG1lYW4gXCInICsgc3VnZ2VzdGlvbiArICdcIj8nXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBFcnJvcihcIkludmFsaWQgQ2hhaSBwcm9wZXJ0eTogXCIgKyBwcm9wZXJ0eSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChidWlsdGlucy5pbmRleE9mKHByb3BlcnR5KSA9PT0gLTEgJiYgIWZsYWcodGFyZ2V0LCBcImxvY2tTc2ZpXCIpKSB7XG4gICAgICAgIGZsYWcodGFyZ2V0LCBcInNzZmlcIiwgcHJveHlHZXR0ZXIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFJlZmxlY3QuZ2V0KHRhcmdldCwgcHJvcGVydHkpO1xuICAgIH0sIFwicHJveHlHZXR0ZXJcIilcbiAgfSk7XG59XG5fX25hbWUocHJveGlmeSwgXCJwcm94aWZ5XCIpO1xuZnVuY3Rpb24gc3RyaW5nRGlzdGFuY2VDYXBwZWQoc3RyQSwgc3RyQiwgY2FwKSB7XG4gIGlmIChNYXRoLmFicyhzdHJBLmxlbmd0aCAtIHN0ckIubGVuZ3RoKSA+PSBjYXApIHtcbiAgICByZXR1cm4gY2FwO1xuICB9XG4gIGxldCBtZW1vID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDw9IHN0ckEubGVuZ3RoOyBpKyspIHtcbiAgICBtZW1vW2ldID0gQXJyYXkoc3RyQi5sZW5ndGggKyAxKS5maWxsKDApO1xuICAgIG1lbW9baV1bMF0gPSBpO1xuICB9XG4gIGZvciAobGV0IGogPSAwOyBqIDwgc3RyQi5sZW5ndGg7IGorKykge1xuICAgIG1lbW9bMF1bal0gPSBqO1xuICB9XG4gIGZvciAobGV0IGkgPSAxOyBpIDw9IHN0ckEubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgY2ggPSBzdHJBLmNoYXJDb2RlQXQoaSAtIDEpO1xuICAgIGZvciAobGV0IGogPSAxOyBqIDw9IHN0ckIubGVuZ3RoOyBqKyspIHtcbiAgICAgIGlmIChNYXRoLmFicyhpIC0gaikgPj0gY2FwKSB7XG4gICAgICAgIG1lbW9baV1bal0gPSBjYXA7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgbWVtb1tpXVtqXSA9IE1hdGgubWluKFxuICAgICAgICBtZW1vW2kgLSAxXVtqXSArIDEsXG4gICAgICAgIG1lbW9baV1baiAtIDFdICsgMSxcbiAgICAgICAgbWVtb1tpIC0gMV1baiAtIDFdICsgKGNoID09PSBzdHJCLmNoYXJDb2RlQXQoaiAtIDEpID8gMCA6IDEpXG4gICAgICApO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbWVtb1tzdHJBLmxlbmd0aF1bc3RyQi5sZW5ndGhdO1xufVxuX19uYW1lKHN0cmluZ0Rpc3RhbmNlQ2FwcGVkLCBcInN0cmluZ0Rpc3RhbmNlQ2FwcGVkXCIpO1xuXG4vLyBsaWIvY2hhaS91dGlscy9hZGRNZXRob2QuanNcbmZ1bmN0aW9uIGFkZE1ldGhvZChjdHgsIG5hbWUsIG1ldGhvZCkge1xuICBsZXQgbWV0aG9kV3JhcHBlciA9IC8qIEBfX1BVUkVfXyAqLyBfX25hbWUoZnVuY3Rpb24oKSB7XG4gICAgaWYgKCFmbGFnKHRoaXMsIFwibG9ja1NzZmlcIikpIHtcbiAgICAgIGZsYWcodGhpcywgXCJzc2ZpXCIsIG1ldGhvZFdyYXBwZXIpO1xuICAgIH1cbiAgICBsZXQgcmVzdWx0ID0gbWV0aG9kLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKHJlc3VsdCAhPT0gdm9pZCAwKSByZXR1cm4gcmVzdWx0O1xuICAgIGxldCBuZXdBc3NlcnRpb24gPSBuZXcgQXNzZXJ0aW9uKCk7XG4gICAgdHJhbnNmZXJGbGFncyh0aGlzLCBuZXdBc3NlcnRpb24pO1xuICAgIHJldHVybiBuZXdBc3NlcnRpb247XG4gIH0sIFwibWV0aG9kV3JhcHBlclwiKTtcbiAgYWRkTGVuZ3RoR3VhcmQobWV0aG9kV3JhcHBlciwgbmFtZSwgZmFsc2UpO1xuICBjdHhbbmFtZV0gPSBwcm94aWZ5KG1ldGhvZFdyYXBwZXIsIG5hbWUpO1xufVxuX19uYW1lKGFkZE1ldGhvZCwgXCJhZGRNZXRob2RcIik7XG5cbi8vIGxpYi9jaGFpL3V0aWxzL292ZXJ3cml0ZVByb3BlcnR5LmpzXG5mdW5jdGlvbiBvdmVyd3JpdGVQcm9wZXJ0eShjdHgsIG5hbWUsIGdldHRlcikge1xuICBsZXQgX2dldCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY3R4LCBuYW1lKSwgX3N1cGVyID0gLyogQF9fUFVSRV9fICovIF9fbmFtZShmdW5jdGlvbigpIHtcbiAgfSwgXCJfc3VwZXJcIik7XG4gIGlmIChfZ2V0ICYmIFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIF9nZXQuZ2V0KSBfc3VwZXIgPSBfZ2V0LmdldDtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN0eCwgbmFtZSwge1xuICAgIGdldDogLyogQF9fUFVSRV9fICovIF9fbmFtZShmdW5jdGlvbiBvdmVyd3JpdGluZ1Byb3BlcnR5R2V0dGVyKCkge1xuICAgICAgaWYgKCFpc1Byb3h5RW5hYmxlZCgpICYmICFmbGFnKHRoaXMsIFwibG9ja1NzZmlcIikpIHtcbiAgICAgICAgZmxhZyh0aGlzLCBcInNzZmlcIiwgb3ZlcndyaXRpbmdQcm9wZXJ0eUdldHRlcik7XG4gICAgICB9XG4gICAgICBsZXQgb3JpZ0xvY2tTc2ZpID0gZmxhZyh0aGlzLCBcImxvY2tTc2ZpXCIpO1xuICAgICAgZmxhZyh0aGlzLCBcImxvY2tTc2ZpXCIsIHRydWUpO1xuICAgICAgbGV0IHJlc3VsdCA9IGdldHRlcihfc3VwZXIpLmNhbGwodGhpcyk7XG4gICAgICBmbGFnKHRoaXMsIFwibG9ja1NzZmlcIiwgb3JpZ0xvY2tTc2ZpKTtcbiAgICAgIGlmIChyZXN1bHQgIT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgICAgbGV0IG5ld0Fzc2VydGlvbiA9IG5ldyBBc3NlcnRpb24oKTtcbiAgICAgIHRyYW5zZmVyRmxhZ3ModGhpcywgbmV3QXNzZXJ0aW9uKTtcbiAgICAgIHJldHVybiBuZXdBc3NlcnRpb247XG4gICAgfSwgXCJvdmVyd3JpdGluZ1Byb3BlcnR5R2V0dGVyXCIpLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KTtcbn1cbl9fbmFtZShvdmVyd3JpdGVQcm9wZXJ0eSwgXCJvdmVyd3JpdGVQcm9wZXJ0eVwiKTtcblxuLy8gbGliL2NoYWkvdXRpbHMvb3ZlcndyaXRlTWV0aG9kLmpzXG5mdW5jdGlvbiBvdmVyd3JpdGVNZXRob2QoY3R4LCBuYW1lLCBtZXRob2QpIHtcbiAgbGV0IF9tZXRob2QgPSBjdHhbbmFtZV0sIF9zdXBlciA9IC8qIEBfX1BVUkVfXyAqLyBfX25hbWUoZnVuY3Rpb24oKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKG5hbWUgKyBcIiBpcyBub3QgYSBmdW5jdGlvblwiKTtcbiAgfSwgXCJfc3VwZXJcIik7XG4gIGlmIChfbWV0aG9kICYmIFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIF9tZXRob2QpIF9zdXBlciA9IF9tZXRob2Q7XG4gIGxldCBvdmVyd3JpdGluZ01ldGhvZFdyYXBwZXIgPSAvKiBAX19QVVJFX18gKi8gX19uYW1lKGZ1bmN0aW9uKCkge1xuICAgIGlmICghZmxhZyh0aGlzLCBcImxvY2tTc2ZpXCIpKSB7XG4gICAgICBmbGFnKHRoaXMsIFwic3NmaVwiLCBvdmVyd3JpdGluZ01ldGhvZFdyYXBwZXIpO1xuICAgIH1cbiAgICBsZXQgb3JpZ0xvY2tTc2ZpID0gZmxhZyh0aGlzLCBcImxvY2tTc2ZpXCIpO1xuICAgIGZsYWcodGhpcywgXCJsb2NrU3NmaVwiLCB0cnVlKTtcbiAgICBsZXQgcmVzdWx0ID0gbWV0aG9kKF9zdXBlcikuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBmbGFnKHRoaXMsIFwibG9ja1NzZmlcIiwgb3JpZ0xvY2tTc2ZpKTtcbiAgICBpZiAocmVzdWx0ICE9PSB2b2lkIDApIHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIGxldCBuZXdBc3NlcnRpb24gPSBuZXcgQXNzZXJ0aW9uKCk7XG4gICAgdHJhbnNmZXJGbGFncyh0aGlzLCBuZXdBc3NlcnRpb24pO1xuICAgIHJldHVybiBuZXdBc3NlcnRpb247XG4gIH0sIFwib3ZlcndyaXRpbmdNZXRob2RXcmFwcGVyXCIpO1xuICBhZGRMZW5ndGhHdWFyZChvdmVyd3JpdGluZ01ldGhvZFdyYXBwZXIsIG5hbWUsIGZhbHNlKTtcbiAgY3R4W25hbWVdID0gcHJveGlmeShvdmVyd3JpdGluZ01ldGhvZFdyYXBwZXIsIG5hbWUpO1xufVxuX19uYW1lKG92ZXJ3cml0ZU1ldGhvZCwgXCJvdmVyd3JpdGVNZXRob2RcIik7XG5cbi8vIGxpYi9jaGFpL3V0aWxzL2FkZENoYWluYWJsZU1ldGhvZC5qc1xudmFyIGNhblNldFByb3RvdHlwZSA9IHR5cGVvZiBPYmplY3Quc2V0UHJvdG90eXBlT2YgPT09IFwiZnVuY3Rpb25cIjtcbnZhciB0ZXN0Rm4gPSAvKiBAX19QVVJFX18gKi8gX19uYW1lKGZ1bmN0aW9uKCkge1xufSwgXCJ0ZXN0Rm5cIik7XG52YXIgZXhjbHVkZU5hbWVzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdEZuKS5maWx0ZXIoZnVuY3Rpb24obmFtZSkge1xuICBsZXQgcHJvcERlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRlc3RGbiwgbmFtZSk7XG4gIGlmICh0eXBlb2YgcHJvcERlc2MgIT09IFwib2JqZWN0XCIpIHJldHVybiB0cnVlO1xuICByZXR1cm4gIXByb3BEZXNjLmNvbmZpZ3VyYWJsZTtcbn0pO1xudmFyIGNhbGwgPSBGdW5jdGlvbi5wcm90b3R5cGUuY2FsbDtcbnZhciBhcHBseSA9IEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseTtcbmZ1bmN0aW9uIGFkZENoYWluYWJsZU1ldGhvZChjdHgsIG5hbWUsIG1ldGhvZCwgY2hhaW5pbmdCZWhhdmlvcikge1xuICBpZiAodHlwZW9mIGNoYWluaW5nQmVoYXZpb3IgIT09IFwiZnVuY3Rpb25cIikge1xuICAgIGNoYWluaW5nQmVoYXZpb3IgPSAvKiBAX19QVVJFX18gKi8gX19uYW1lKGZ1bmN0aW9uKCkge1xuICAgIH0sIFwiY2hhaW5pbmdCZWhhdmlvclwiKTtcbiAgfVxuICBsZXQgY2hhaW5hYmxlQmVoYXZpb3IgPSB7XG4gICAgbWV0aG9kLFxuICAgIGNoYWluaW5nQmVoYXZpb3JcbiAgfTtcbiAgaWYgKCFjdHguX19tZXRob2RzKSB7XG4gICAgY3R4Ll9fbWV0aG9kcyA9IHt9O1xuICB9XG4gIGN0eC5fX21ldGhvZHNbbmFtZV0gPSBjaGFpbmFibGVCZWhhdmlvcjtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGN0eCwgbmFtZSwge1xuICAgIGdldDogLyogQF9fUFVSRV9fICovIF9fbmFtZShmdW5jdGlvbiBjaGFpbmFibGVNZXRob2RHZXR0ZXIoKSB7XG4gICAgICBjaGFpbmFibGVCZWhhdmlvci5jaGFpbmluZ0JlaGF2aW9yLmNhbGwodGhpcyk7XG4gICAgICBsZXQgY2hhaW5hYmxlTWV0aG9kV3JhcHBlciA9IC8qIEBfX1BVUkVfXyAqLyBfX25hbWUoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghZmxhZyh0aGlzLCBcImxvY2tTc2ZpXCIpKSB7XG4gICAgICAgICAgZmxhZyh0aGlzLCBcInNzZmlcIiwgY2hhaW5hYmxlTWV0aG9kV3JhcHBlcik7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlc3VsdCA9IGNoYWluYWJsZUJlaGF2aW9yLm1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICBpZiAocmVzdWx0ICE9PSB2b2lkIDApIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIGxldCBuZXdBc3NlcnRpb24gPSBuZXcgQXNzZXJ0aW9uKCk7XG4gICAgICAgIHRyYW5zZmVyRmxhZ3ModGhpcywgbmV3QXNzZXJ0aW9uKTtcbiAgICAgICAgcmV0dXJuIG5ld0Fzc2VydGlvbjtcbiAgICAgIH0sIFwiY2hhaW5hYmxlTWV0aG9kV3JhcHBlclwiKTtcbiAgICAgIGFkZExlbmd0aEd1YXJkKGNoYWluYWJsZU1ldGhvZFdyYXBwZXIsIG5hbWUsIHRydWUpO1xuICAgICAgaWYgKGNhblNldFByb3RvdHlwZSkge1xuICAgICAgICBsZXQgcHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSh0aGlzKTtcbiAgICAgICAgcHJvdG90eXBlLmNhbGwgPSBjYWxsO1xuICAgICAgICBwcm90b3R5cGUuYXBwbHkgPSBhcHBseTtcbiAgICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGNoYWluYWJsZU1ldGhvZFdyYXBwZXIsIHByb3RvdHlwZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgYXNzZXJ0ZXJOYW1lcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGN0eCk7XG4gICAgICAgIGFzc2VydGVyTmFtZXMuZm9yRWFjaChmdW5jdGlvbihhc3NlcnRlck5hbWUpIHtcbiAgICAgICAgICBpZiAoZXhjbHVkZU5hbWVzLmluZGV4T2YoYXNzZXJ0ZXJOYW1lKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgbGV0IHBkID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihjdHgsIGFzc2VydGVyTmFtZSk7XG4gICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNoYWluYWJsZU1ldGhvZFdyYXBwZXIsIGFzc2VydGVyTmFtZSwgcGQpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHRyYW5zZmVyRmxhZ3ModGhpcywgY2hhaW5hYmxlTWV0aG9kV3JhcHBlcik7XG4gICAgICByZXR1cm4gcHJveGlmeShjaGFpbmFibGVNZXRob2RXcmFwcGVyKTtcbiAgICB9LCBcImNoYWluYWJsZU1ldGhvZEdldHRlclwiKSxcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSk7XG59XG5fX25hbWUoYWRkQ2hhaW5hYmxlTWV0aG9kLCBcImFkZENoYWluYWJsZU1ldGhvZFwiKTtcblxuLy8gbGliL2NoYWkvdXRpbHMvb3ZlcndyaXRlQ2hhaW5hYmxlTWV0aG9kLmpzXG5mdW5jdGlvbiBvdmVyd3JpdGVDaGFpbmFibGVNZXRob2QoY3R4LCBuYW1lLCBtZXRob2QsIGNoYWluaW5nQmVoYXZpb3IpIHtcbiAgbGV0IGNoYWluYWJsZUJlaGF2aW9yID0gY3R4Ll9fbWV0aG9kc1tuYW1lXTtcbiAgbGV0IF9jaGFpbmluZ0JlaGF2aW9yID0gY2hhaW5hYmxlQmVoYXZpb3IuY2hhaW5pbmdCZWhhdmlvcjtcbiAgY2hhaW5hYmxlQmVoYXZpb3IuY2hhaW5pbmdCZWhhdmlvciA9IC8qIEBfX1BVUkVfXyAqLyBfX25hbWUoZnVuY3Rpb24gb3ZlcndyaXRpbmdDaGFpbmFibGVNZXRob2RHZXR0ZXIoKSB7XG4gICAgbGV0IHJlc3VsdCA9IGNoYWluaW5nQmVoYXZpb3IoX2NoYWluaW5nQmVoYXZpb3IpLmNhbGwodGhpcyk7XG4gICAgaWYgKHJlc3VsdCAhPT0gdm9pZCAwKSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBsZXQgbmV3QXNzZXJ0aW9uID0gbmV3IEFzc2VydGlvbigpO1xuICAgIHRyYW5zZmVyRmxhZ3ModGhpcywgbmV3QXNzZXJ0aW9uKTtcbiAgICByZXR1cm4gbmV3QXNzZXJ0aW9uO1xuICB9LCBcIm92ZXJ3cml0aW5nQ2hhaW5hYmxlTWV0aG9kR2V0dGVyXCIpO1xuICBsZXQgX21ldGhvZCA9IGNoYWluYWJsZUJlaGF2aW9yLm1ldGhvZDtcbiAgY2hhaW5hYmxlQmVoYXZpb3IubWV0aG9kID0gLyogQF9fUFVSRV9fICovIF9fbmFtZShmdW5jdGlvbiBvdmVyd3JpdGluZ0NoYWluYWJsZU1ldGhvZFdyYXBwZXIoKSB7XG4gICAgbGV0IHJlc3VsdCA9IG1ldGhvZChfbWV0aG9kKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmIChyZXN1bHQgIT09IHZvaWQgMCkge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgbGV0IG5ld0Fzc2VydGlvbiA9IG5ldyBBc3NlcnRpb24oKTtcbiAgICB0cmFuc2ZlckZsYWdzKHRoaXMsIG5ld0Fzc2VydGlvbik7XG4gICAgcmV0dXJuIG5ld0Fzc2VydGlvbjtcbiAgfSwgXCJvdmVyd3JpdGluZ0NoYWluYWJsZU1ldGhvZFdyYXBwZXJcIik7XG59XG5fX25hbWUob3ZlcndyaXRlQ2hhaW5hYmxlTWV0aG9kLCBcIm92ZXJ3cml0ZUNoYWluYWJsZU1ldGhvZFwiKTtcblxuLy8gbGliL2NoYWkvdXRpbHMvY29tcGFyZUJ5SW5zcGVjdC5qc1xuZnVuY3Rpb24gY29tcGFyZUJ5SW5zcGVjdChhLCBiKSB7XG4gIHJldHVybiBpbnNwZWN0MihhKSA8IGluc3BlY3QyKGIpID8gLTEgOiAxO1xufVxuX19uYW1lKGNvbXBhcmVCeUluc3BlY3QsIFwiY29tcGFyZUJ5SW5zcGVjdFwiKTtcblxuLy8gbGliL2NoYWkvdXRpbHMvZ2V0T3duRW51bWVyYWJsZVByb3BlcnR5U3ltYm9scy5qc1xuZnVuY3Rpb24gZ2V0T3duRW51bWVyYWJsZVByb3BlcnR5U3ltYm9scyhvYmopIHtcbiAgaWYgKHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBbXTtcbiAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMob2JqKS5maWx0ZXIoZnVuY3Rpb24oc3ltKSB7XG4gICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBzeW0pLmVudW1lcmFibGU7XG4gIH0pO1xufVxuX19uYW1lKGdldE93bkVudW1lcmFibGVQcm9wZXJ0eVN5bWJvbHMsIFwiZ2V0T3duRW51bWVyYWJsZVByb3BlcnR5U3ltYm9sc1wiKTtcblxuLy8gbGliL2NoYWkvdXRpbHMvZ2V0T3duRW51bWVyYWJsZVByb3BlcnRpZXMuanNcbmZ1bmN0aW9uIGdldE93bkVudW1lcmFibGVQcm9wZXJ0aWVzKG9iaikge1xuICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5jb25jYXQoZ2V0T3duRW51bWVyYWJsZVByb3BlcnR5U3ltYm9scyhvYmopKTtcbn1cbl9fbmFtZShnZXRPd25FbnVtZXJhYmxlUHJvcGVydGllcywgXCJnZXRPd25FbnVtZXJhYmxlUHJvcGVydGllc1wiKTtcblxuLy8gbGliL2NoYWkvdXRpbHMvaXNOYU4uanNcbnZhciBpc05hTjIgPSBOdW1iZXIuaXNOYU47XG5cbi8vIGxpYi9jaGFpL3V0aWxzL2dldE9wZXJhdG9yLmpzXG5mdW5jdGlvbiBpc09iamVjdFR5cGUob2JqKSB7XG4gIGxldCBvYmplY3RUeXBlID0gdHlwZShvYmopO1xuICBsZXQgb2JqZWN0VHlwZXMgPSBbXCJBcnJheVwiLCBcIk9iamVjdFwiLCBcIkZ1bmN0aW9uXCJdO1xuICByZXR1cm4gb2JqZWN0VHlwZXMuaW5kZXhPZihvYmplY3RUeXBlKSAhPT0gLTE7XG59XG5fX25hbWUoaXNPYmplY3RUeXBlLCBcImlzT2JqZWN0VHlwZVwiKTtcbmZ1bmN0aW9uIGdldE9wZXJhdG9yKG9iaiwgYXJncykge1xuICBsZXQgb3BlcmF0b3IgPSBmbGFnKG9iaiwgXCJvcGVyYXRvclwiKTtcbiAgbGV0IG5lZ2F0ZSA9IGZsYWcob2JqLCBcIm5lZ2F0ZVwiKTtcbiAgbGV0IGV4cGVjdGVkID0gYXJnc1szXTtcbiAgbGV0IG1zZyA9IG5lZ2F0ZSA/IGFyZ3NbMl0gOiBhcmdzWzFdO1xuICBpZiAob3BlcmF0b3IpIHtcbiAgICByZXR1cm4gb3BlcmF0b3I7XG4gIH1cbiAgaWYgKHR5cGVvZiBtc2cgPT09IFwiZnVuY3Rpb25cIikgbXNnID0gbXNnKCk7XG4gIG1zZyA9IG1zZyB8fCBcIlwiO1xuICBpZiAoIW1zZykge1xuICAgIHJldHVybiB2b2lkIDA7XG4gIH1cbiAgaWYgKC9cXHNoYXZlXFxzLy50ZXN0KG1zZykpIHtcbiAgICByZXR1cm4gdm9pZCAwO1xuICB9XG4gIGxldCBpc09iamVjdCA9IGlzT2JqZWN0VHlwZShleHBlY3RlZCk7XG4gIGlmICgvXFxzbm90XFxzLy50ZXN0KG1zZykpIHtcbiAgICByZXR1cm4gaXNPYmplY3QgPyBcIm5vdERlZXBTdHJpY3RFcXVhbFwiIDogXCJub3RTdHJpY3RFcXVhbFwiO1xuICB9XG4gIHJldHVybiBpc09iamVjdCA/IFwiZGVlcFN0cmljdEVxdWFsXCIgOiBcInN0cmljdEVxdWFsXCI7XG59XG5fX25hbWUoZ2V0T3BlcmF0b3IsIFwiZ2V0T3BlcmF0b3JcIik7XG5cbi8vIGxpYi9jaGFpL3V0aWxzL2luZGV4LmpzXG5mdW5jdGlvbiBnZXROYW1lKGZuKSB7XG4gIHJldHVybiBmbi5uYW1lO1xufVxuX19uYW1lKGdldE5hbWUsIFwiZ2V0TmFtZVwiKTtcbmZ1bmN0aW9uIGlzUmVnRXhwMihvYmopIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSBcIltvYmplY3QgUmVnRXhwXVwiO1xufVxuX19uYW1lKGlzUmVnRXhwMiwgXCJpc1JlZ0V4cFwiKTtcbmZ1bmN0aW9uIGlzTnVtZXJpYyhvYmopIHtcbiAgcmV0dXJuIFtcIk51bWJlclwiLCBcIkJpZ0ludFwiXS5pbmNsdWRlcyh0eXBlKG9iaikpO1xufVxuX19uYW1lKGlzTnVtZXJpYywgXCJpc051bWVyaWNcIik7XG5cbi8vIGxpYi9jaGFpL2NvcmUvYXNzZXJ0aW9ucy5qc1xudmFyIHsgZmxhZzogZmxhZzIgfSA9IHV0aWxzX2V4cG9ydHM7XG5bXG4gIFwidG9cIixcbiAgXCJiZVwiLFxuICBcImJlZW5cIixcbiAgXCJpc1wiLFxuICBcImFuZFwiLFxuICBcImhhc1wiLFxuICBcImhhdmVcIixcbiAgXCJ3aXRoXCIsXG4gIFwidGhhdFwiLFxuICBcIndoaWNoXCIsXG4gIFwiYXRcIixcbiAgXCJvZlwiLFxuICBcInNhbWVcIixcbiAgXCJidXRcIixcbiAgXCJkb2VzXCIsXG4gIFwic3RpbGxcIixcbiAgXCJhbHNvXCJcbl0uZm9yRWFjaChmdW5jdGlvbihjaGFpbikge1xuICBBc3NlcnRpb24uYWRkUHJvcGVydHkoY2hhaW4pO1xufSk7XG5Bc3NlcnRpb24uYWRkUHJvcGVydHkoXCJub3RcIiwgZnVuY3Rpb24oKSB7XG4gIGZsYWcyKHRoaXMsIFwibmVnYXRlXCIsIHRydWUpO1xufSk7XG5Bc3NlcnRpb24uYWRkUHJvcGVydHkoXCJkZWVwXCIsIGZ1bmN0aW9uKCkge1xuICBmbGFnMih0aGlzLCBcImRlZXBcIiwgdHJ1ZSk7XG59KTtcbkFzc2VydGlvbi5hZGRQcm9wZXJ0eShcIm5lc3RlZFwiLCBmdW5jdGlvbigpIHtcbiAgZmxhZzIodGhpcywgXCJuZXN0ZWRcIiwgdHJ1ZSk7XG59KTtcbkFzc2VydGlvbi5hZGRQcm9wZXJ0eShcIm93blwiLCBmdW5jdGlvbigpIHtcbiAgZmxhZzIodGhpcywgXCJvd25cIiwgdHJ1ZSk7XG59KTtcbkFzc2VydGlvbi5hZGRQcm9wZXJ0eShcIm9yZGVyZWRcIiwgZnVuY3Rpb24oKSB7XG4gIGZsYWcyKHRoaXMsIFwib3JkZXJlZFwiLCB0cnVlKTtcbn0pO1xuQXNzZXJ0aW9uLmFkZFByb3BlcnR5KFwiYW55XCIsIGZ1bmN0aW9uKCkge1xuICBmbGFnMih0aGlzLCBcImFueVwiLCB0cnVlKTtcbiAgZmxhZzIodGhpcywgXCJhbGxcIiwgZmFsc2UpO1xufSk7XG5Bc3NlcnRpb24uYWRkUHJvcGVydHkoXCJhbGxcIiwgZnVuY3Rpb24oKSB7XG4gIGZsYWcyKHRoaXMsIFwiYWxsXCIsIHRydWUpO1xuICBmbGFnMih0aGlzLCBcImFueVwiLCBmYWxzZSk7XG59KTtcbnZhciBmdW5jdGlvblR5cGVzID0ge1xuICBmdW5jdGlvbjogW1xuICAgIFwiZnVuY3Rpb25cIixcbiAgICBcImFzeW5jZnVuY3Rpb25cIixcbiAgICBcImdlbmVyYXRvcmZ1bmN0aW9uXCIsXG4gICAgXCJhc3luY2dlbmVyYXRvcmZ1bmN0aW9uXCJcbiAgXSxcbiAgYXN5bmNmdW5jdGlvbjogW1wiYXN5bmNmdW5jdGlvblwiLCBcImFzeW5jZ2VuZXJhdG9yZnVuY3Rpb25cIl0sXG4gIGdlbmVyYXRvcmZ1bmN0aW9uOiBbXCJnZW5lcmF0b3JmdW5jdGlvblwiLCBcImFzeW5jZ2VuZXJhdG9yZnVuY3Rpb25cIl0sXG4gIGFzeW5jZ2VuZXJhdG9yZnVuY3Rpb246IFtcImFzeW5jZ2VuZXJhdG9yZnVuY3Rpb25cIl1cbn07XG5mdW5jdGlvbiBhbih0eXBlMywgbXNnKSB7XG4gIGlmIChtc2cpIGZsYWcyKHRoaXMsIFwibWVzc2FnZVwiLCBtc2cpO1xuICB0eXBlMyA9IHR5cGUzLnRvTG93ZXJDYXNlKCk7XG4gIGxldCBvYmogPSBmbGFnMih0aGlzLCBcIm9iamVjdFwiKSwgYXJ0aWNsZSA9IH5bXCJhXCIsIFwiZVwiLCBcImlcIiwgXCJvXCIsIFwidVwiXS5pbmRleE9mKHR5cGUzLmNoYXJBdCgwKSkgPyBcImFuIFwiIDogXCJhIFwiO1xuICBjb25zdCBkZXRlY3RlZFR5cGUgPSB0eXBlKG9iaikudG9Mb3dlckNhc2UoKTtcbiAgaWYgKGZ1bmN0aW9uVHlwZXNbXCJmdW5jdGlvblwiXS5pbmNsdWRlcyh0eXBlMykpIHtcbiAgICB0aGlzLmFzc2VydChcbiAgICAgIGZ1bmN0aW9uVHlwZXNbdHlwZTNdLmluY2x1ZGVzKGRldGVjdGVkVHlwZSksXG4gICAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gYmUgXCIgKyBhcnRpY2xlICsgdHlwZTMsXG4gICAgICBcImV4cGVjdGVkICN7dGhpc30gbm90IHRvIGJlIFwiICsgYXJ0aWNsZSArIHR5cGUzXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmFzc2VydChcbiAgICAgIHR5cGUzID09PSBkZXRlY3RlZFR5cGUsXG4gICAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gYmUgXCIgKyBhcnRpY2xlICsgdHlwZTMsXG4gICAgICBcImV4cGVjdGVkICN7dGhpc30gbm90IHRvIGJlIFwiICsgYXJ0aWNsZSArIHR5cGUzXG4gICAgKTtcbiAgfVxufVxuX19uYW1lKGFuLCBcImFuXCIpO1xuQXNzZXJ0aW9uLmFkZENoYWluYWJsZU1ldGhvZChcImFuXCIsIGFuKTtcbkFzc2VydGlvbi5hZGRDaGFpbmFibGVNZXRob2QoXCJhXCIsIGFuKTtcbmZ1bmN0aW9uIFNhbWVWYWx1ZVplcm8oYSwgYikge1xuICByZXR1cm4gaXNOYU4yKGEpICYmIGlzTmFOMihiKSB8fCBhID09PSBiO1xufVxuX19uYW1lKFNhbWVWYWx1ZVplcm8sIFwiU2FtZVZhbHVlWmVyb1wiKTtcbmZ1bmN0aW9uIGluY2x1ZGVDaGFpbmluZ0JlaGF2aW9yKCkge1xuICBmbGFnMih0aGlzLCBcImNvbnRhaW5zXCIsIHRydWUpO1xufVxuX19uYW1lKGluY2x1ZGVDaGFpbmluZ0JlaGF2aW9yLCBcImluY2x1ZGVDaGFpbmluZ0JlaGF2aW9yXCIpO1xuZnVuY3Rpb24gaW5jbHVkZSh2YWwsIG1zZykge1xuICBpZiAobXNnKSBmbGFnMih0aGlzLCBcIm1lc3NhZ2VcIiwgbXNnKTtcbiAgbGV0IG9iaiA9IGZsYWcyKHRoaXMsIFwib2JqZWN0XCIpLCBvYmpUeXBlID0gdHlwZShvYmopLnRvTG93ZXJDYXNlKCksIGZsYWdNc2cgPSBmbGFnMih0aGlzLCBcIm1lc3NhZ2VcIiksIG5lZ2F0ZSA9IGZsYWcyKHRoaXMsIFwibmVnYXRlXCIpLCBzc2ZpID0gZmxhZzIodGhpcywgXCJzc2ZpXCIpLCBpc0RlZXAgPSBmbGFnMih0aGlzLCBcImRlZXBcIiksIGRlc2NyaXB0b3IgPSBpc0RlZXAgPyBcImRlZXAgXCIgOiBcIlwiLCBpc0VxbCA9IGlzRGVlcCA/IGZsYWcyKHRoaXMsIFwiZXFsXCIpIDogU2FtZVZhbHVlWmVybztcbiAgZmxhZ01zZyA9IGZsYWdNc2cgPyBmbGFnTXNnICsgXCI6IFwiIDogXCJcIjtcbiAgbGV0IGluY2x1ZGVkID0gZmFsc2U7XG4gIHN3aXRjaCAob2JqVHlwZSkge1xuICAgIGNhc2UgXCJzdHJpbmdcIjpcbiAgICAgIGluY2x1ZGVkID0gb2JqLmluZGV4T2YodmFsKSAhPT0gLTE7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwid2Vha3NldFwiOlxuICAgICAgaWYgKGlzRGVlcCkge1xuICAgICAgICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IoXG4gICAgICAgICAgZmxhZ01zZyArIFwidW5hYmxlIHRvIHVzZSAuZGVlcC5pbmNsdWRlIHdpdGggV2Vha1NldFwiLFxuICAgICAgICAgIHZvaWQgMCxcbiAgICAgICAgICBzc2ZpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpbmNsdWRlZCA9IG9iai5oYXModmFsKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJtYXBcIjpcbiAgICAgIG9iai5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgaW5jbHVkZWQgPSBpbmNsdWRlZCB8fCBpc0VxbChpdGVtLCB2YWwpO1xuICAgICAgfSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwic2V0XCI6XG4gICAgICBpZiAoaXNEZWVwKSB7XG4gICAgICAgIG9iai5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICBpbmNsdWRlZCA9IGluY2x1ZGVkIHx8IGlzRXFsKGl0ZW0sIHZhbCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5jbHVkZWQgPSBvYmouaGFzKHZhbCk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiYXJyYXlcIjpcbiAgICAgIGlmIChpc0RlZXApIHtcbiAgICAgICAgaW5jbHVkZWQgPSBvYmouc29tZShmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgcmV0dXJuIGlzRXFsKGl0ZW0sIHZhbCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5jbHVkZWQgPSBvYmouaW5kZXhPZih2YWwpICE9PSAtMTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6IHtcbiAgICAgIGlmICh2YWwgIT09IE9iamVjdCh2YWwpKSB7XG4gICAgICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihcbiAgICAgICAgICBmbGFnTXNnICsgXCJ0aGUgZ2l2ZW4gY29tYmluYXRpb24gb2YgYXJndW1lbnRzIChcIiArIG9ialR5cGUgKyBcIiBhbmQgXCIgKyB0eXBlKHZhbCkudG9Mb3dlckNhc2UoKSArIFwiKSBpcyBpbnZhbGlkIGZvciB0aGlzIGFzc2VydGlvbi4gWW91IGNhbiB1c2UgYW4gYXJyYXksIGEgbWFwLCBhbiBvYmplY3QsIGEgc2V0LCBhIHN0cmluZywgb3IgYSB3ZWFrc2V0IGluc3RlYWQgb2YgYSBcIiArIHR5cGUodmFsKS50b0xvd2VyQ2FzZSgpLFxuICAgICAgICAgIHZvaWQgMCxcbiAgICAgICAgICBzc2ZpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBsZXQgcHJvcHMgPSBPYmplY3Qua2V5cyh2YWwpO1xuICAgICAgbGV0IGZpcnN0RXJyID0gbnVsbDtcbiAgICAgIGxldCBudW1FcnJzID0gMDtcbiAgICAgIHByb3BzLmZvckVhY2goZnVuY3Rpb24ocHJvcCkge1xuICAgICAgICBsZXQgcHJvcEFzc2VydGlvbiA9IG5ldyBBc3NlcnRpb24ob2JqKTtcbiAgICAgICAgdHJhbnNmZXJGbGFncyh0aGlzLCBwcm9wQXNzZXJ0aW9uLCB0cnVlKTtcbiAgICAgICAgZmxhZzIocHJvcEFzc2VydGlvbiwgXCJsb2NrU3NmaVwiLCB0cnVlKTtcbiAgICAgICAgaWYgKCFuZWdhdGUgfHwgcHJvcHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgcHJvcEFzc2VydGlvbi5wcm9wZXJ0eShwcm9wLCB2YWxbcHJvcF0pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgIHByb3BBc3NlcnRpb24ucHJvcGVydHkocHJvcCwgdmFsW3Byb3BdKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgaWYgKCFjaGVja19lcnJvcl9leHBvcnRzLmNvbXBhdGlibGVDb25zdHJ1Y3RvcihlcnIsIEFzc2VydGlvbkVycm9yKSkge1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZmlyc3RFcnIgPT09IG51bGwpIGZpcnN0RXJyID0gZXJyO1xuICAgICAgICAgIG51bUVycnMrKztcbiAgICAgICAgfVxuICAgICAgfSwgdGhpcyk7XG4gICAgICBpZiAobmVnYXRlICYmIHByb3BzLmxlbmd0aCA+IDEgJiYgbnVtRXJycyA9PT0gcHJvcHMubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IGZpcnN0RXJyO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuICB0aGlzLmFzc2VydChcbiAgICBpbmNsdWRlZCxcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gXCIgKyBkZXNjcmlwdG9yICsgXCJpbmNsdWRlIFwiICsgaW5zcGVjdDIodmFsKSxcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gbm90IFwiICsgZGVzY3JpcHRvciArIFwiaW5jbHVkZSBcIiArIGluc3BlY3QyKHZhbClcbiAgKTtcbn1cbl9fbmFtZShpbmNsdWRlLCBcImluY2x1ZGVcIik7XG5Bc3NlcnRpb24uYWRkQ2hhaW5hYmxlTWV0aG9kKFwiaW5jbHVkZVwiLCBpbmNsdWRlLCBpbmNsdWRlQ2hhaW5pbmdCZWhhdmlvcik7XG5Bc3NlcnRpb24uYWRkQ2hhaW5hYmxlTWV0aG9kKFwiY29udGFpblwiLCBpbmNsdWRlLCBpbmNsdWRlQ2hhaW5pbmdCZWhhdmlvcik7XG5Bc3NlcnRpb24uYWRkQ2hhaW5hYmxlTWV0aG9kKFwiY29udGFpbnNcIiwgaW5jbHVkZSwgaW5jbHVkZUNoYWluaW5nQmVoYXZpb3IpO1xuQXNzZXJ0aW9uLmFkZENoYWluYWJsZU1ldGhvZChcImluY2x1ZGVzXCIsIGluY2x1ZGUsIGluY2x1ZGVDaGFpbmluZ0JlaGF2aW9yKTtcbkFzc2VydGlvbi5hZGRQcm9wZXJ0eShcIm9rXCIsIGZ1bmN0aW9uKCkge1xuICB0aGlzLmFzc2VydChcbiAgICBmbGFnMih0aGlzLCBcIm9iamVjdFwiKSxcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gYmUgdHJ1dGh5XCIsXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGJlIGZhbHN5XCJcbiAgKTtcbn0pO1xuQXNzZXJ0aW9uLmFkZFByb3BlcnR5KFwidHJ1ZVwiLCBmdW5jdGlvbigpIHtcbiAgdGhpcy5hc3NlcnQoXG4gICAgdHJ1ZSA9PT0gZmxhZzIodGhpcywgXCJvYmplY3RcIiksXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGJlIHRydWVcIixcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gYmUgZmFsc2VcIixcbiAgICBmbGFnMih0aGlzLCBcIm5lZ2F0ZVwiKSA/IGZhbHNlIDogdHJ1ZVxuICApO1xufSk7XG5Bc3NlcnRpb24uYWRkUHJvcGVydHkoXCJudW1lcmljXCIsIGZ1bmN0aW9uKCkge1xuICBjb25zdCBvYmplY3QgPSBmbGFnMih0aGlzLCBcIm9iamVjdFwiKTtcbiAgdGhpcy5hc3NlcnQoXG4gICAgW1wiTnVtYmVyXCIsIFwiQmlnSW50XCJdLmluY2x1ZGVzKHR5cGUob2JqZWN0KSksXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGJlIG51bWVyaWNcIixcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gbm90IGJlIG51bWVyaWNcIixcbiAgICBmbGFnMih0aGlzLCBcIm5lZ2F0ZVwiKSA/IGZhbHNlIDogdHJ1ZVxuICApO1xufSk7XG5Bc3NlcnRpb24uYWRkUHJvcGVydHkoXCJjYWxsYWJsZVwiLCBmdW5jdGlvbigpIHtcbiAgY29uc3QgdmFsID0gZmxhZzIodGhpcywgXCJvYmplY3RcIik7XG4gIGNvbnN0IHNzZmkgPSBmbGFnMih0aGlzLCBcInNzZmlcIik7XG4gIGNvbnN0IG1lc3NhZ2UgPSBmbGFnMih0aGlzLCBcIm1lc3NhZ2VcIik7XG4gIGNvbnN0IG1zZyA9IG1lc3NhZ2UgPyBgJHttZXNzYWdlfTogYCA6IFwiXCI7XG4gIGNvbnN0IG5lZ2F0ZSA9IGZsYWcyKHRoaXMsIFwibmVnYXRlXCIpO1xuICBjb25zdCBhc3NlcnRpb25NZXNzYWdlID0gbmVnYXRlID8gYCR7bXNnfWV4cGVjdGVkICR7aW5zcGVjdDIodmFsKX0gbm90IHRvIGJlIGEgY2FsbGFibGUgZnVuY3Rpb25gIDogYCR7bXNnfWV4cGVjdGVkICR7aW5zcGVjdDIodmFsKX0gdG8gYmUgYSBjYWxsYWJsZSBmdW5jdGlvbmA7XG4gIGNvbnN0IGlzQ2FsbGFibGUgPSBbXG4gICAgXCJGdW5jdGlvblwiLFxuICAgIFwiQXN5bmNGdW5jdGlvblwiLFxuICAgIFwiR2VuZXJhdG9yRnVuY3Rpb25cIixcbiAgICBcIkFzeW5jR2VuZXJhdG9yRnVuY3Rpb25cIlxuICBdLmluY2x1ZGVzKHR5cGUodmFsKSk7XG4gIGlmIChpc0NhbGxhYmxlICYmIG5lZ2F0ZSB8fCAhaXNDYWxsYWJsZSAmJiAhbmVnYXRlKSB7XG4gICAgdGhyb3cgbmV3IEFzc2VydGlvbkVycm9yKGFzc2VydGlvbk1lc3NhZ2UsIHZvaWQgMCwgc3NmaSk7XG4gIH1cbn0pO1xuQXNzZXJ0aW9uLmFkZFByb3BlcnR5KFwiZmFsc2VcIiwgZnVuY3Rpb24oKSB7XG4gIHRoaXMuYXNzZXJ0KFxuICAgIGZhbHNlID09PSBmbGFnMih0aGlzLCBcIm9iamVjdFwiKSxcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gYmUgZmFsc2VcIixcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gYmUgdHJ1ZVwiLFxuICAgIGZsYWcyKHRoaXMsIFwibmVnYXRlXCIpID8gdHJ1ZSA6IGZhbHNlXG4gICk7XG59KTtcbkFzc2VydGlvbi5hZGRQcm9wZXJ0eShcIm51bGxcIiwgZnVuY3Rpb24oKSB7XG4gIHRoaXMuYXNzZXJ0KFxuICAgIG51bGwgPT09IGZsYWcyKHRoaXMsIFwib2JqZWN0XCIpLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBudWxsXCIsXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IG5vdCB0byBiZSBudWxsXCJcbiAgKTtcbn0pO1xuQXNzZXJ0aW9uLmFkZFByb3BlcnR5KFwidW5kZWZpbmVkXCIsIGZ1bmN0aW9uKCkge1xuICB0aGlzLmFzc2VydChcbiAgICB2b2lkIDAgPT09IGZsYWcyKHRoaXMsIFwib2JqZWN0XCIpLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSB1bmRlZmluZWRcIixcbiAgICBcImV4cGVjdGVkICN7dGhpc30gbm90IHRvIGJlIHVuZGVmaW5lZFwiXG4gICk7XG59KTtcbkFzc2VydGlvbi5hZGRQcm9wZXJ0eShcIk5hTlwiLCBmdW5jdGlvbigpIHtcbiAgdGhpcy5hc3NlcnQoXG4gICAgaXNOYU4yKGZsYWcyKHRoaXMsIFwib2JqZWN0XCIpKSxcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gYmUgTmFOXCIsXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IG5vdCB0byBiZSBOYU5cIlxuICApO1xufSk7XG5mdW5jdGlvbiBhc3NlcnRFeGlzdCgpIHtcbiAgbGV0IHZhbCA9IGZsYWcyKHRoaXMsIFwib2JqZWN0XCIpO1xuICB0aGlzLmFzc2VydChcbiAgICB2YWwgIT09IG51bGwgJiYgdmFsICE9PSB2b2lkIDAsXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGV4aXN0XCIsXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBleGlzdFwiXG4gICk7XG59XG5fX25hbWUoYXNzZXJ0RXhpc3QsIFwiYXNzZXJ0RXhpc3RcIik7XG5Bc3NlcnRpb24uYWRkUHJvcGVydHkoXCJleGlzdFwiLCBhc3NlcnRFeGlzdCk7XG5Bc3NlcnRpb24uYWRkUHJvcGVydHkoXCJleGlzdHNcIiwgYXNzZXJ0RXhpc3QpO1xuQXNzZXJ0aW9uLmFkZFByb3BlcnR5KFwiZW1wdHlcIiwgZnVuY3Rpb24oKSB7XG4gIGxldCB2YWwgPSBmbGFnMih0aGlzLCBcIm9iamVjdFwiKSwgc3NmaSA9IGZsYWcyKHRoaXMsIFwic3NmaVwiKSwgZmxhZ01zZyA9IGZsYWcyKHRoaXMsIFwibWVzc2FnZVwiKSwgaXRlbXNDb3VudDtcbiAgZmxhZ01zZyA9IGZsYWdNc2cgPyBmbGFnTXNnICsgXCI6IFwiIDogXCJcIjtcbiAgc3dpdGNoICh0eXBlKHZhbCkudG9Mb3dlckNhc2UoKSkge1xuICAgIGNhc2UgXCJhcnJheVwiOlxuICAgIGNhc2UgXCJzdHJpbmdcIjpcbiAgICAgIGl0ZW1zQ291bnQgPSB2YWwubGVuZ3RoO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIm1hcFwiOlxuICAgIGNhc2UgXCJzZXRcIjpcbiAgICAgIGl0ZW1zQ291bnQgPSB2YWwuc2l6ZTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJ3ZWFrbWFwXCI6XG4gICAgY2FzZSBcIndlYWtzZXRcIjpcbiAgICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihcbiAgICAgICAgZmxhZ01zZyArIFwiLmVtcHR5IHdhcyBwYXNzZWQgYSB3ZWFrIGNvbGxlY3Rpb25cIixcbiAgICAgICAgdm9pZCAwLFxuICAgICAgICBzc2ZpXG4gICAgICApO1xuICAgIGNhc2UgXCJmdW5jdGlvblwiOiB7XG4gICAgICBjb25zdCBtc2cgPSBmbGFnTXNnICsgXCIuZW1wdHkgd2FzIHBhc3NlZCBhIGZ1bmN0aW9uIFwiICsgZ2V0TmFtZSh2YWwpO1xuICAgICAgdGhyb3cgbmV3IEFzc2VydGlvbkVycm9yKG1zZy50cmltKCksIHZvaWQgMCwgc3NmaSk7XG4gICAgfVxuICAgIGRlZmF1bHQ6XG4gICAgICBpZiAodmFsICE9PSBPYmplY3QodmFsKSkge1xuICAgICAgICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IoXG4gICAgICAgICAgZmxhZ01zZyArIFwiLmVtcHR5IHdhcyBwYXNzZWQgbm9uLXN0cmluZyBwcmltaXRpdmUgXCIgKyBpbnNwZWN0Mih2YWwpLFxuICAgICAgICAgIHZvaWQgMCxcbiAgICAgICAgICBzc2ZpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpdGVtc0NvdW50ID0gT2JqZWN0LmtleXModmFsKS5sZW5ndGg7XG4gIH1cbiAgdGhpcy5hc3NlcnQoXG4gICAgMCA9PT0gaXRlbXNDb3VudCxcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gYmUgZW1wdHlcIixcbiAgICBcImV4cGVjdGVkICN7dGhpc30gbm90IHRvIGJlIGVtcHR5XCJcbiAgKTtcbn0pO1xuZnVuY3Rpb24gY2hlY2tBcmd1bWVudHMoKSB7XG4gIGxldCBvYmogPSBmbGFnMih0aGlzLCBcIm9iamVjdFwiKSwgdHlwZTMgPSB0eXBlKG9iaik7XG4gIHRoaXMuYXNzZXJ0KFxuICAgIFwiQXJndW1lbnRzXCIgPT09IHR5cGUzLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBhcmd1bWVudHMgYnV0IGdvdCBcIiArIHR5cGUzLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgYmUgYXJndW1lbnRzXCJcbiAgKTtcbn1cbl9fbmFtZShjaGVja0FyZ3VtZW50cywgXCJjaGVja0FyZ3VtZW50c1wiKTtcbkFzc2VydGlvbi5hZGRQcm9wZXJ0eShcImFyZ3VtZW50c1wiLCBjaGVja0FyZ3VtZW50cyk7XG5Bc3NlcnRpb24uYWRkUHJvcGVydHkoXCJBcmd1bWVudHNcIiwgY2hlY2tBcmd1bWVudHMpO1xuZnVuY3Rpb24gYXNzZXJ0RXF1YWwodmFsLCBtc2cpIHtcbiAgaWYgKG1zZykgZmxhZzIodGhpcywgXCJtZXNzYWdlXCIsIG1zZyk7XG4gIGxldCBvYmogPSBmbGFnMih0aGlzLCBcIm9iamVjdFwiKTtcbiAgaWYgKGZsYWcyKHRoaXMsIFwiZGVlcFwiKSkge1xuICAgIGxldCBwcmV2TG9ja1NzZmkgPSBmbGFnMih0aGlzLCBcImxvY2tTc2ZpXCIpO1xuICAgIGZsYWcyKHRoaXMsIFwibG9ja1NzZmlcIiwgdHJ1ZSk7XG4gICAgdGhpcy5lcWwodmFsKTtcbiAgICBmbGFnMih0aGlzLCBcImxvY2tTc2ZpXCIsIHByZXZMb2NrU3NmaSk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICB2YWwgPT09IG9iaixcbiAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBlcXVhbCAje2V4cH1cIixcbiAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgZXF1YWwgI3tleHB9XCIsXG4gICAgICB2YWwsXG4gICAgICB0aGlzLl9vYmosXG4gICAgICB0cnVlXG4gICAgKTtcbiAgfVxufVxuX19uYW1lKGFzc2VydEVxdWFsLCBcImFzc2VydEVxdWFsXCIpO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcImVxdWFsXCIsIGFzc2VydEVxdWFsKTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJlcXVhbHNcIiwgYXNzZXJ0RXF1YWwpO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcImVxXCIsIGFzc2VydEVxdWFsKTtcbmZ1bmN0aW9uIGFzc2VydEVxbChvYmosIG1zZykge1xuICBpZiAobXNnKSBmbGFnMih0aGlzLCBcIm1lc3NhZ2VcIiwgbXNnKTtcbiAgbGV0IGVxbCA9IGZsYWcyKHRoaXMsIFwiZXFsXCIpO1xuICB0aGlzLmFzc2VydChcbiAgICBlcWwob2JqLCBmbGFnMih0aGlzLCBcIm9iamVjdFwiKSksXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGRlZXBseSBlcXVhbCAje2V4cH1cIixcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gbm90IGRlZXBseSBlcXVhbCAje2V4cH1cIixcbiAgICBvYmosXG4gICAgdGhpcy5fb2JqLFxuICAgIHRydWVcbiAgKTtcbn1cbl9fbmFtZShhc3NlcnRFcWwsIFwiYXNzZXJ0RXFsXCIpO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcImVxbFwiLCBhc3NlcnRFcWwpO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcImVxbHNcIiwgYXNzZXJ0RXFsKTtcbmZ1bmN0aW9uIGFzc2VydEFib3ZlKG4sIG1zZykge1xuICBpZiAobXNnKSBmbGFnMih0aGlzLCBcIm1lc3NhZ2VcIiwgbXNnKTtcbiAgbGV0IG9iaiA9IGZsYWcyKHRoaXMsIFwib2JqZWN0XCIpLCBkb0xlbmd0aCA9IGZsYWcyKHRoaXMsIFwiZG9MZW5ndGhcIiksIGZsYWdNc2cgPSBmbGFnMih0aGlzLCBcIm1lc3NhZ2VcIiksIG1zZ1ByZWZpeCA9IGZsYWdNc2cgPyBmbGFnTXNnICsgXCI6IFwiIDogXCJcIiwgc3NmaSA9IGZsYWcyKHRoaXMsIFwic3NmaVwiKSwgb2JqVHlwZSA9IHR5cGUob2JqKS50b0xvd2VyQ2FzZSgpLCBuVHlwZSA9IHR5cGUobikudG9Mb3dlckNhc2UoKTtcbiAgaWYgKGRvTGVuZ3RoICYmIG9ialR5cGUgIT09IFwibWFwXCIgJiYgb2JqVHlwZSAhPT0gXCJzZXRcIikge1xuICAgIG5ldyBBc3NlcnRpb24ob2JqLCBmbGFnTXNnLCBzc2ZpLCB0cnVlKS50by5oYXZlLnByb3BlcnR5KFwibGVuZ3RoXCIpO1xuICB9XG4gIGlmICghZG9MZW5ndGggJiYgb2JqVHlwZSA9PT0gXCJkYXRlXCIgJiYgblR5cGUgIT09IFwiZGF0ZVwiKSB7XG4gICAgdGhyb3cgbmV3IEFzc2VydGlvbkVycm9yKFxuICAgICAgbXNnUHJlZml4ICsgXCJ0aGUgYXJndW1lbnQgdG8gYWJvdmUgbXVzdCBiZSBhIGRhdGVcIixcbiAgICAgIHZvaWQgMCxcbiAgICAgIHNzZmlcbiAgICApO1xuICB9IGVsc2UgaWYgKCFpc051bWVyaWMobikgJiYgKGRvTGVuZ3RoIHx8IGlzTnVtZXJpYyhvYmopKSkge1xuICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihcbiAgICAgIG1zZ1ByZWZpeCArIFwidGhlIGFyZ3VtZW50IHRvIGFib3ZlIG11c3QgYmUgYSBudW1iZXJcIixcbiAgICAgIHZvaWQgMCxcbiAgICAgIHNzZmlcbiAgICApO1xuICB9IGVsc2UgaWYgKCFkb0xlbmd0aCAmJiBvYmpUeXBlICE9PSBcImRhdGVcIiAmJiAhaXNOdW1lcmljKG9iaikpIHtcbiAgICBsZXQgcHJpbnRPYmogPSBvYmpUeXBlID09PSBcInN0cmluZ1wiID8gXCInXCIgKyBvYmogKyBcIidcIiA6IG9iajtcbiAgICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IoXG4gICAgICBtc2dQcmVmaXggKyBcImV4cGVjdGVkIFwiICsgcHJpbnRPYmogKyBcIiB0byBiZSBhIG51bWJlciBvciBhIGRhdGVcIixcbiAgICAgIHZvaWQgMCxcbiAgICAgIHNzZmlcbiAgICApO1xuICB9XG4gIGlmIChkb0xlbmd0aCkge1xuICAgIGxldCBkZXNjcmlwdG9yID0gXCJsZW5ndGhcIiwgaXRlbXNDb3VudDtcbiAgICBpZiAob2JqVHlwZSA9PT0gXCJtYXBcIiB8fCBvYmpUeXBlID09PSBcInNldFwiKSB7XG4gICAgICBkZXNjcmlwdG9yID0gXCJzaXplXCI7XG4gICAgICBpdGVtc0NvdW50ID0gb2JqLnNpemU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGl0ZW1zQ291bnQgPSBvYmoubGVuZ3RoO1xuICAgIH1cbiAgICB0aGlzLmFzc2VydChcbiAgICAgIGl0ZW1zQ291bnQgPiBuLFxuICAgICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGhhdmUgYSBcIiArIGRlc2NyaXB0b3IgKyBcIiBhYm92ZSAje2V4cH0gYnV0IGdvdCAje2FjdH1cIixcbiAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgaGF2ZSBhIFwiICsgZGVzY3JpcHRvciArIFwiIGFib3ZlICN7ZXhwfVwiLFxuICAgICAgbixcbiAgICAgIGl0ZW1zQ291bnRcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgb2JqID4gbixcbiAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBhYm92ZSAje2V4cH1cIixcbiAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBhdCBtb3N0ICN7ZXhwfVwiLFxuICAgICAgblxuICAgICk7XG4gIH1cbn1cbl9fbmFtZShhc3NlcnRBYm92ZSwgXCJhc3NlcnRBYm92ZVwiKTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJhYm92ZVwiLCBhc3NlcnRBYm92ZSk7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwiZ3RcIiwgYXNzZXJ0QWJvdmUpO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcImdyZWF0ZXJUaGFuXCIsIGFzc2VydEFib3ZlKTtcbmZ1bmN0aW9uIGFzc2VydExlYXN0KG4sIG1zZykge1xuICBpZiAobXNnKSBmbGFnMih0aGlzLCBcIm1lc3NhZ2VcIiwgbXNnKTtcbiAgbGV0IG9iaiA9IGZsYWcyKHRoaXMsIFwib2JqZWN0XCIpLCBkb0xlbmd0aCA9IGZsYWcyKHRoaXMsIFwiZG9MZW5ndGhcIiksIGZsYWdNc2cgPSBmbGFnMih0aGlzLCBcIm1lc3NhZ2VcIiksIG1zZ1ByZWZpeCA9IGZsYWdNc2cgPyBmbGFnTXNnICsgXCI6IFwiIDogXCJcIiwgc3NmaSA9IGZsYWcyKHRoaXMsIFwic3NmaVwiKSwgb2JqVHlwZSA9IHR5cGUob2JqKS50b0xvd2VyQ2FzZSgpLCBuVHlwZSA9IHR5cGUobikudG9Mb3dlckNhc2UoKSwgZXJyb3JNZXNzYWdlLCBzaG91bGRUaHJvdyA9IHRydWU7XG4gIGlmIChkb0xlbmd0aCAmJiBvYmpUeXBlICE9PSBcIm1hcFwiICYmIG9ialR5cGUgIT09IFwic2V0XCIpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKG9iaiwgZmxhZ01zZywgc3NmaSwgdHJ1ZSkudG8uaGF2ZS5wcm9wZXJ0eShcImxlbmd0aFwiKTtcbiAgfVxuICBpZiAoIWRvTGVuZ3RoICYmIG9ialR5cGUgPT09IFwiZGF0ZVwiICYmIG5UeXBlICE9PSBcImRhdGVcIikge1xuICAgIGVycm9yTWVzc2FnZSA9IG1zZ1ByZWZpeCArIFwidGhlIGFyZ3VtZW50IHRvIGxlYXN0IG11c3QgYmUgYSBkYXRlXCI7XG4gIH0gZWxzZSBpZiAoIWlzTnVtZXJpYyhuKSAmJiAoZG9MZW5ndGggfHwgaXNOdW1lcmljKG9iaikpKSB7XG4gICAgZXJyb3JNZXNzYWdlID0gbXNnUHJlZml4ICsgXCJ0aGUgYXJndW1lbnQgdG8gbGVhc3QgbXVzdCBiZSBhIG51bWJlclwiO1xuICB9IGVsc2UgaWYgKCFkb0xlbmd0aCAmJiBvYmpUeXBlICE9PSBcImRhdGVcIiAmJiAhaXNOdW1lcmljKG9iaikpIHtcbiAgICBsZXQgcHJpbnRPYmogPSBvYmpUeXBlID09PSBcInN0cmluZ1wiID8gXCInXCIgKyBvYmogKyBcIidcIiA6IG9iajtcbiAgICBlcnJvck1lc3NhZ2UgPSBtc2dQcmVmaXggKyBcImV4cGVjdGVkIFwiICsgcHJpbnRPYmogKyBcIiB0byBiZSBhIG51bWJlciBvciBhIGRhdGVcIjtcbiAgfSBlbHNlIHtcbiAgICBzaG91bGRUaHJvdyA9IGZhbHNlO1xuICB9XG4gIGlmIChzaG91bGRUaHJvdykge1xuICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihlcnJvck1lc3NhZ2UsIHZvaWQgMCwgc3NmaSk7XG4gIH1cbiAgaWYgKGRvTGVuZ3RoKSB7XG4gICAgbGV0IGRlc2NyaXB0b3IgPSBcImxlbmd0aFwiLCBpdGVtc0NvdW50O1xuICAgIGlmIChvYmpUeXBlID09PSBcIm1hcFwiIHx8IG9ialR5cGUgPT09IFwic2V0XCIpIHtcbiAgICAgIGRlc2NyaXB0b3IgPSBcInNpemVcIjtcbiAgICAgIGl0ZW1zQ291bnQgPSBvYmouc2l6ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaXRlbXNDb3VudCA9IG9iai5sZW5ndGg7XG4gICAgfVxuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgaXRlbXNDb3VudCA+PSBuLFxuICAgICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGhhdmUgYSBcIiArIGRlc2NyaXB0b3IgKyBcIiBhdCBsZWFzdCAje2V4cH0gYnV0IGdvdCAje2FjdH1cIixcbiAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBoYXZlIGEgXCIgKyBkZXNjcmlwdG9yICsgXCIgYmVsb3cgI3tleHB9XCIsXG4gICAgICBuLFxuICAgICAgaXRlbXNDb3VudFxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICBvYmogPj0gbixcbiAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBhdCBsZWFzdCAje2V4cH1cIixcbiAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBiZWxvdyAje2V4cH1cIixcbiAgICAgIG5cbiAgICApO1xuICB9XG59XG5fX25hbWUoYXNzZXJ0TGVhc3QsIFwiYXNzZXJ0TGVhc3RcIik7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwibGVhc3RcIiwgYXNzZXJ0TGVhc3QpO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcImd0ZVwiLCBhc3NlcnRMZWFzdCk7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwiZ3JlYXRlclRoYW5PckVxdWFsXCIsIGFzc2VydExlYXN0KTtcbmZ1bmN0aW9uIGFzc2VydEJlbG93KG4sIG1zZykge1xuICBpZiAobXNnKSBmbGFnMih0aGlzLCBcIm1lc3NhZ2VcIiwgbXNnKTtcbiAgbGV0IG9iaiA9IGZsYWcyKHRoaXMsIFwib2JqZWN0XCIpLCBkb0xlbmd0aCA9IGZsYWcyKHRoaXMsIFwiZG9MZW5ndGhcIiksIGZsYWdNc2cgPSBmbGFnMih0aGlzLCBcIm1lc3NhZ2VcIiksIG1zZ1ByZWZpeCA9IGZsYWdNc2cgPyBmbGFnTXNnICsgXCI6IFwiIDogXCJcIiwgc3NmaSA9IGZsYWcyKHRoaXMsIFwic3NmaVwiKSwgb2JqVHlwZSA9IHR5cGUob2JqKS50b0xvd2VyQ2FzZSgpLCBuVHlwZSA9IHR5cGUobikudG9Mb3dlckNhc2UoKSwgZXJyb3JNZXNzYWdlLCBzaG91bGRUaHJvdyA9IHRydWU7XG4gIGlmIChkb0xlbmd0aCAmJiBvYmpUeXBlICE9PSBcIm1hcFwiICYmIG9ialR5cGUgIT09IFwic2V0XCIpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKG9iaiwgZmxhZ01zZywgc3NmaSwgdHJ1ZSkudG8uaGF2ZS5wcm9wZXJ0eShcImxlbmd0aFwiKTtcbiAgfVxuICBpZiAoIWRvTGVuZ3RoICYmIG9ialR5cGUgPT09IFwiZGF0ZVwiICYmIG5UeXBlICE9PSBcImRhdGVcIikge1xuICAgIGVycm9yTWVzc2FnZSA9IG1zZ1ByZWZpeCArIFwidGhlIGFyZ3VtZW50IHRvIGJlbG93IG11c3QgYmUgYSBkYXRlXCI7XG4gIH0gZWxzZSBpZiAoIWlzTnVtZXJpYyhuKSAmJiAoZG9MZW5ndGggfHwgaXNOdW1lcmljKG9iaikpKSB7XG4gICAgZXJyb3JNZXNzYWdlID0gbXNnUHJlZml4ICsgXCJ0aGUgYXJndW1lbnQgdG8gYmVsb3cgbXVzdCBiZSBhIG51bWJlclwiO1xuICB9IGVsc2UgaWYgKCFkb0xlbmd0aCAmJiBvYmpUeXBlICE9PSBcImRhdGVcIiAmJiAhaXNOdW1lcmljKG9iaikpIHtcbiAgICBsZXQgcHJpbnRPYmogPSBvYmpUeXBlID09PSBcInN0cmluZ1wiID8gXCInXCIgKyBvYmogKyBcIidcIiA6IG9iajtcbiAgICBlcnJvck1lc3NhZ2UgPSBtc2dQcmVmaXggKyBcImV4cGVjdGVkIFwiICsgcHJpbnRPYmogKyBcIiB0byBiZSBhIG51bWJlciBvciBhIGRhdGVcIjtcbiAgfSBlbHNlIHtcbiAgICBzaG91bGRUaHJvdyA9IGZhbHNlO1xuICB9XG4gIGlmIChzaG91bGRUaHJvdykge1xuICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihlcnJvck1lc3NhZ2UsIHZvaWQgMCwgc3NmaSk7XG4gIH1cbiAgaWYgKGRvTGVuZ3RoKSB7XG4gICAgbGV0IGRlc2NyaXB0b3IgPSBcImxlbmd0aFwiLCBpdGVtc0NvdW50O1xuICAgIGlmIChvYmpUeXBlID09PSBcIm1hcFwiIHx8IG9ialR5cGUgPT09IFwic2V0XCIpIHtcbiAgICAgIGRlc2NyaXB0b3IgPSBcInNpemVcIjtcbiAgICAgIGl0ZW1zQ291bnQgPSBvYmouc2l6ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaXRlbXNDb3VudCA9IG9iai5sZW5ndGg7XG4gICAgfVxuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgaXRlbXNDb3VudCA8IG4sXG4gICAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gaGF2ZSBhIFwiICsgZGVzY3JpcHRvciArIFwiIGJlbG93ICN7ZXhwfSBidXQgZ290ICN7YWN0fVwiLFxuICAgICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBoYXZlIGEgXCIgKyBkZXNjcmlwdG9yICsgXCIgYmVsb3cgI3tleHB9XCIsXG4gICAgICBuLFxuICAgICAgaXRlbXNDb3VudFxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICBvYmogPCBuLFxuICAgICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGJlIGJlbG93ICN7ZXhwfVwiLFxuICAgICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGJlIGF0IGxlYXN0ICN7ZXhwfVwiLFxuICAgICAgblxuICAgICk7XG4gIH1cbn1cbl9fbmFtZShhc3NlcnRCZWxvdywgXCJhc3NlcnRCZWxvd1wiKTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJiZWxvd1wiLCBhc3NlcnRCZWxvdyk7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwibHRcIiwgYXNzZXJ0QmVsb3cpO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcImxlc3NUaGFuXCIsIGFzc2VydEJlbG93KTtcbmZ1bmN0aW9uIGFzc2VydE1vc3QobiwgbXNnKSB7XG4gIGlmIChtc2cpIGZsYWcyKHRoaXMsIFwibWVzc2FnZVwiLCBtc2cpO1xuICBsZXQgb2JqID0gZmxhZzIodGhpcywgXCJvYmplY3RcIiksIGRvTGVuZ3RoID0gZmxhZzIodGhpcywgXCJkb0xlbmd0aFwiKSwgZmxhZ01zZyA9IGZsYWcyKHRoaXMsIFwibWVzc2FnZVwiKSwgbXNnUHJlZml4ID0gZmxhZ01zZyA/IGZsYWdNc2cgKyBcIjogXCIgOiBcIlwiLCBzc2ZpID0gZmxhZzIodGhpcywgXCJzc2ZpXCIpLCBvYmpUeXBlID0gdHlwZShvYmopLnRvTG93ZXJDYXNlKCksIG5UeXBlID0gdHlwZShuKS50b0xvd2VyQ2FzZSgpLCBlcnJvck1lc3NhZ2UsIHNob3VsZFRocm93ID0gdHJ1ZTtcbiAgaWYgKGRvTGVuZ3RoICYmIG9ialR5cGUgIT09IFwibWFwXCIgJiYgb2JqVHlwZSAhPT0gXCJzZXRcIikge1xuICAgIG5ldyBBc3NlcnRpb24ob2JqLCBmbGFnTXNnLCBzc2ZpLCB0cnVlKS50by5oYXZlLnByb3BlcnR5KFwibGVuZ3RoXCIpO1xuICB9XG4gIGlmICghZG9MZW5ndGggJiYgb2JqVHlwZSA9PT0gXCJkYXRlXCIgJiYgblR5cGUgIT09IFwiZGF0ZVwiKSB7XG4gICAgZXJyb3JNZXNzYWdlID0gbXNnUHJlZml4ICsgXCJ0aGUgYXJndW1lbnQgdG8gbW9zdCBtdXN0IGJlIGEgZGF0ZVwiO1xuICB9IGVsc2UgaWYgKCFpc051bWVyaWMobikgJiYgKGRvTGVuZ3RoIHx8IGlzTnVtZXJpYyhvYmopKSkge1xuICAgIGVycm9yTWVzc2FnZSA9IG1zZ1ByZWZpeCArIFwidGhlIGFyZ3VtZW50IHRvIG1vc3QgbXVzdCBiZSBhIG51bWJlclwiO1xuICB9IGVsc2UgaWYgKCFkb0xlbmd0aCAmJiBvYmpUeXBlICE9PSBcImRhdGVcIiAmJiAhaXNOdW1lcmljKG9iaikpIHtcbiAgICBsZXQgcHJpbnRPYmogPSBvYmpUeXBlID09PSBcInN0cmluZ1wiID8gXCInXCIgKyBvYmogKyBcIidcIiA6IG9iajtcbiAgICBlcnJvck1lc3NhZ2UgPSBtc2dQcmVmaXggKyBcImV4cGVjdGVkIFwiICsgcHJpbnRPYmogKyBcIiB0byBiZSBhIG51bWJlciBvciBhIGRhdGVcIjtcbiAgfSBlbHNlIHtcbiAgICBzaG91bGRUaHJvdyA9IGZhbHNlO1xuICB9XG4gIGlmIChzaG91bGRUaHJvdykge1xuICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihlcnJvck1lc3NhZ2UsIHZvaWQgMCwgc3NmaSk7XG4gIH1cbiAgaWYgKGRvTGVuZ3RoKSB7XG4gICAgbGV0IGRlc2NyaXB0b3IgPSBcImxlbmd0aFwiLCBpdGVtc0NvdW50O1xuICAgIGlmIChvYmpUeXBlID09PSBcIm1hcFwiIHx8IG9ialR5cGUgPT09IFwic2V0XCIpIHtcbiAgICAgIGRlc2NyaXB0b3IgPSBcInNpemVcIjtcbiAgICAgIGl0ZW1zQ291bnQgPSBvYmouc2l6ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaXRlbXNDb3VudCA9IG9iai5sZW5ndGg7XG4gICAgfVxuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgaXRlbXNDb3VudCA8PSBuLFxuICAgICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGhhdmUgYSBcIiArIGRlc2NyaXB0b3IgKyBcIiBhdCBtb3N0ICN7ZXhwfSBidXQgZ290ICN7YWN0fVwiLFxuICAgICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGhhdmUgYSBcIiArIGRlc2NyaXB0b3IgKyBcIiBhYm92ZSAje2V4cH1cIixcbiAgICAgIG4sXG4gICAgICBpdGVtc0NvdW50XG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmFzc2VydChcbiAgICAgIG9iaiA8PSBuLFxuICAgICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGJlIGF0IG1vc3QgI3tleHB9XCIsXG4gICAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gYmUgYWJvdmUgI3tleHB9XCIsXG4gICAgICBuXG4gICAgKTtcbiAgfVxufVxuX19uYW1lKGFzc2VydE1vc3QsIFwiYXNzZXJ0TW9zdFwiKTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJtb3N0XCIsIGFzc2VydE1vc3QpO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcImx0ZVwiLCBhc3NlcnRNb3N0KTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJsZXNzVGhhbk9yRXF1YWxcIiwgYXNzZXJ0TW9zdCk7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwid2l0aGluXCIsIGZ1bmN0aW9uKHN0YXJ0LCBmaW5pc2gsIG1zZykge1xuICBpZiAobXNnKSBmbGFnMih0aGlzLCBcIm1lc3NhZ2VcIiwgbXNnKTtcbiAgbGV0IG9iaiA9IGZsYWcyKHRoaXMsIFwib2JqZWN0XCIpLCBkb0xlbmd0aCA9IGZsYWcyKHRoaXMsIFwiZG9MZW5ndGhcIiksIGZsYWdNc2cgPSBmbGFnMih0aGlzLCBcIm1lc3NhZ2VcIiksIG1zZ1ByZWZpeCA9IGZsYWdNc2cgPyBmbGFnTXNnICsgXCI6IFwiIDogXCJcIiwgc3NmaSA9IGZsYWcyKHRoaXMsIFwic3NmaVwiKSwgb2JqVHlwZSA9IHR5cGUob2JqKS50b0xvd2VyQ2FzZSgpLCBzdGFydFR5cGUgPSB0eXBlKHN0YXJ0KS50b0xvd2VyQ2FzZSgpLCBmaW5pc2hUeXBlID0gdHlwZShmaW5pc2gpLnRvTG93ZXJDYXNlKCksIGVycm9yTWVzc2FnZSwgc2hvdWxkVGhyb3cgPSB0cnVlLCByYW5nZSA9IHN0YXJ0VHlwZSA9PT0gXCJkYXRlXCIgJiYgZmluaXNoVHlwZSA9PT0gXCJkYXRlXCIgPyBzdGFydC50b0lTT1N0cmluZygpICsgXCIuLlwiICsgZmluaXNoLnRvSVNPU3RyaW5nKCkgOiBzdGFydCArIFwiLi5cIiArIGZpbmlzaDtcbiAgaWYgKGRvTGVuZ3RoICYmIG9ialR5cGUgIT09IFwibWFwXCIgJiYgb2JqVHlwZSAhPT0gXCJzZXRcIikge1xuICAgIG5ldyBBc3NlcnRpb24ob2JqLCBmbGFnTXNnLCBzc2ZpLCB0cnVlKS50by5oYXZlLnByb3BlcnR5KFwibGVuZ3RoXCIpO1xuICB9XG4gIGlmICghZG9MZW5ndGggJiYgb2JqVHlwZSA9PT0gXCJkYXRlXCIgJiYgKHN0YXJ0VHlwZSAhPT0gXCJkYXRlXCIgfHwgZmluaXNoVHlwZSAhPT0gXCJkYXRlXCIpKSB7XG4gICAgZXJyb3JNZXNzYWdlID0gbXNnUHJlZml4ICsgXCJ0aGUgYXJndW1lbnRzIHRvIHdpdGhpbiBtdXN0IGJlIGRhdGVzXCI7XG4gIH0gZWxzZSBpZiAoKCFpc051bWVyaWMoc3RhcnQpIHx8ICFpc051bWVyaWMoZmluaXNoKSkgJiYgKGRvTGVuZ3RoIHx8IGlzTnVtZXJpYyhvYmopKSkge1xuICAgIGVycm9yTWVzc2FnZSA9IG1zZ1ByZWZpeCArIFwidGhlIGFyZ3VtZW50cyB0byB3aXRoaW4gbXVzdCBiZSBudW1iZXJzXCI7XG4gIH0gZWxzZSBpZiAoIWRvTGVuZ3RoICYmIG9ialR5cGUgIT09IFwiZGF0ZVwiICYmICFpc051bWVyaWMob2JqKSkge1xuICAgIGxldCBwcmludE9iaiA9IG9ialR5cGUgPT09IFwic3RyaW5nXCIgPyBcIidcIiArIG9iaiArIFwiJ1wiIDogb2JqO1xuICAgIGVycm9yTWVzc2FnZSA9IG1zZ1ByZWZpeCArIFwiZXhwZWN0ZWQgXCIgKyBwcmludE9iaiArIFwiIHRvIGJlIGEgbnVtYmVyIG9yIGEgZGF0ZVwiO1xuICB9IGVsc2Uge1xuICAgIHNob3VsZFRocm93ID0gZmFsc2U7XG4gIH1cbiAgaWYgKHNob3VsZFRocm93KSB7XG4gICAgdGhyb3cgbmV3IEFzc2VydGlvbkVycm9yKGVycm9yTWVzc2FnZSwgdm9pZCAwLCBzc2ZpKTtcbiAgfVxuICBpZiAoZG9MZW5ndGgpIHtcbiAgICBsZXQgZGVzY3JpcHRvciA9IFwibGVuZ3RoXCIsIGl0ZW1zQ291bnQ7XG4gICAgaWYgKG9ialR5cGUgPT09IFwibWFwXCIgfHwgb2JqVHlwZSA9PT0gXCJzZXRcIikge1xuICAgICAgZGVzY3JpcHRvciA9IFwic2l6ZVwiO1xuICAgICAgaXRlbXNDb3VudCA9IG9iai5zaXplO1xuICAgIH0gZWxzZSB7XG4gICAgICBpdGVtc0NvdW50ID0gb2JqLmxlbmd0aDtcbiAgICB9XG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICBpdGVtc0NvdW50ID49IHN0YXJ0ICYmIGl0ZW1zQ291bnQgPD0gZmluaXNoLFxuICAgICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGhhdmUgYSBcIiArIGRlc2NyaXB0b3IgKyBcIiB3aXRoaW4gXCIgKyByYW5nZSxcbiAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgaGF2ZSBhIFwiICsgZGVzY3JpcHRvciArIFwiIHdpdGhpbiBcIiArIHJhbmdlXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmFzc2VydChcbiAgICAgIG9iaiA+PSBzdGFydCAmJiBvYmogPD0gZmluaXNoLFxuICAgICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGJlIHdpdGhpbiBcIiArIHJhbmdlLFxuICAgICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBiZSB3aXRoaW4gXCIgKyByYW5nZVxuICAgICk7XG4gIH1cbn0pO1xuZnVuY3Rpb24gYXNzZXJ0SW5zdGFuY2VPZihjb25zdHJ1Y3RvciwgbXNnKSB7XG4gIGlmIChtc2cpIGZsYWcyKHRoaXMsIFwibWVzc2FnZVwiLCBtc2cpO1xuICBsZXQgdGFyZ2V0ID0gZmxhZzIodGhpcywgXCJvYmplY3RcIik7XG4gIGxldCBzc2ZpID0gZmxhZzIodGhpcywgXCJzc2ZpXCIpO1xuICBsZXQgZmxhZ01zZyA9IGZsYWcyKHRoaXMsIFwibWVzc2FnZVwiKTtcbiAgbGV0IGlzSW5zdGFuY2VPZjtcbiAgdHJ5IHtcbiAgICBpc0luc3RhbmNlT2YgPSB0YXJnZXQgaW5zdGFuY2VvZiBjb25zdHJ1Y3RvcjtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgaWYgKGVyciBpbnN0YW5jZW9mIFR5cGVFcnJvcikge1xuICAgICAgZmxhZ01zZyA9IGZsYWdNc2cgPyBmbGFnTXNnICsgXCI6IFwiIDogXCJcIjtcbiAgICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihcbiAgICAgICAgZmxhZ01zZyArIFwiVGhlIGluc3RhbmNlb2YgYXNzZXJ0aW9uIG5lZWRzIGEgY29uc3RydWN0b3IgYnV0IFwiICsgdHlwZShjb25zdHJ1Y3RvcikgKyBcIiB3YXMgZ2l2ZW4uXCIsXG4gICAgICAgIHZvaWQgMCxcbiAgICAgICAgc3NmaVxuICAgICAgKTtcbiAgICB9XG4gICAgdGhyb3cgZXJyO1xuICB9XG4gIGxldCBuYW1lID0gZ2V0TmFtZShjb25zdHJ1Y3Rvcik7XG4gIGlmIChuYW1lID09IG51bGwpIHtcbiAgICBuYW1lID0gXCJhbiB1bm5hbWVkIGNvbnN0cnVjdG9yXCI7XG4gIH1cbiAgdGhpcy5hc3NlcnQoXG4gICAgaXNJbnN0YW5jZU9mLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBhbiBpbnN0YW5jZSBvZiBcIiArIG5hbWUsXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBiZSBhbiBpbnN0YW5jZSBvZiBcIiArIG5hbWVcbiAgKTtcbn1cbl9fbmFtZShhc3NlcnRJbnN0YW5jZU9mLCBcImFzc2VydEluc3RhbmNlT2ZcIik7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwiaW5zdGFuY2VvZlwiLCBhc3NlcnRJbnN0YW5jZU9mKTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJpbnN0YW5jZU9mXCIsIGFzc2VydEluc3RhbmNlT2YpO1xuZnVuY3Rpb24gYXNzZXJ0UHJvcGVydHkobmFtZSwgdmFsLCBtc2cpIHtcbiAgaWYgKG1zZykgZmxhZzIodGhpcywgXCJtZXNzYWdlXCIsIG1zZyk7XG4gIGxldCBpc05lc3RlZCA9IGZsYWcyKHRoaXMsIFwibmVzdGVkXCIpLCBpc093biA9IGZsYWcyKHRoaXMsIFwib3duXCIpLCBmbGFnTXNnID0gZmxhZzIodGhpcywgXCJtZXNzYWdlXCIpLCBvYmogPSBmbGFnMih0aGlzLCBcIm9iamVjdFwiKSwgc3NmaSA9IGZsYWcyKHRoaXMsIFwic3NmaVwiKSwgbmFtZVR5cGUgPSB0eXBlb2YgbmFtZTtcbiAgZmxhZ01zZyA9IGZsYWdNc2cgPyBmbGFnTXNnICsgXCI6IFwiIDogXCJcIjtcbiAgaWYgKGlzTmVzdGVkKSB7XG4gICAgaWYgKG5hbWVUeXBlICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IoXG4gICAgICAgIGZsYWdNc2cgKyBcInRoZSBhcmd1bWVudCB0byBwcm9wZXJ0eSBtdXN0IGJlIGEgc3RyaW5nIHdoZW4gdXNpbmcgbmVzdGVkIHN5bnRheFwiLFxuICAgICAgICB2b2lkIDAsXG4gICAgICAgIHNzZmlcbiAgICAgICk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChuYW1lVHlwZSAhPT0gXCJzdHJpbmdcIiAmJiBuYW1lVHlwZSAhPT0gXCJudW1iZXJcIiAmJiBuYW1lVHlwZSAhPT0gXCJzeW1ib2xcIikge1xuICAgICAgdGhyb3cgbmV3IEFzc2VydGlvbkVycm9yKFxuICAgICAgICBmbGFnTXNnICsgXCJ0aGUgYXJndW1lbnQgdG8gcHJvcGVydHkgbXVzdCBiZSBhIHN0cmluZywgbnVtYmVyLCBvciBzeW1ib2xcIixcbiAgICAgICAgdm9pZCAwLFxuICAgICAgICBzc2ZpXG4gICAgICApO1xuICAgIH1cbiAgfVxuICBpZiAoaXNOZXN0ZWQgJiYgaXNPd24pIHtcbiAgICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IoXG4gICAgICBmbGFnTXNnICsgJ1RoZSBcIm5lc3RlZFwiIGFuZCBcIm93blwiIGZsYWdzIGNhbm5vdCBiZSBjb21iaW5lZC4nLFxuICAgICAgdm9pZCAwLFxuICAgICAgc3NmaVxuICAgICk7XG4gIH1cbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCBvYmogPT09IHZvaWQgMCkge1xuICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihcbiAgICAgIGZsYWdNc2cgKyBcIlRhcmdldCBjYW5ub3QgYmUgbnVsbCBvciB1bmRlZmluZWQuXCIsXG4gICAgICB2b2lkIDAsXG4gICAgICBzc2ZpXG4gICAgKTtcbiAgfVxuICBsZXQgaXNEZWVwID0gZmxhZzIodGhpcywgXCJkZWVwXCIpLCBuZWdhdGUgPSBmbGFnMih0aGlzLCBcIm5lZ2F0ZVwiKSwgcGF0aEluZm8gPSBpc05lc3RlZCA/IGdldFBhdGhJbmZvKG9iaiwgbmFtZSkgOiBudWxsLCB2YWx1ZSA9IGlzTmVzdGVkID8gcGF0aEluZm8udmFsdWUgOiBvYmpbbmFtZV0sIGlzRXFsID0gaXNEZWVwID8gZmxhZzIodGhpcywgXCJlcWxcIikgOiAodmFsMSwgdmFsMikgPT4gdmFsMSA9PT0gdmFsMjtcbiAgbGV0IGRlc2NyaXB0b3IgPSBcIlwiO1xuICBpZiAoaXNEZWVwKSBkZXNjcmlwdG9yICs9IFwiZGVlcCBcIjtcbiAgaWYgKGlzT3duKSBkZXNjcmlwdG9yICs9IFwib3duIFwiO1xuICBpZiAoaXNOZXN0ZWQpIGRlc2NyaXB0b3IgKz0gXCJuZXN0ZWQgXCI7XG4gIGRlc2NyaXB0b3IgKz0gXCJwcm9wZXJ0eSBcIjtcbiAgbGV0IGhhc1Byb3BlcnR5MjtcbiAgaWYgKGlzT3duKSBoYXNQcm9wZXJ0eTIgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBuYW1lKTtcbiAgZWxzZSBpZiAoaXNOZXN0ZWQpIGhhc1Byb3BlcnR5MiA9IHBhdGhJbmZvLmV4aXN0cztcbiAgZWxzZSBoYXNQcm9wZXJ0eTIgPSBoYXNQcm9wZXJ0eShvYmosIG5hbWUpO1xuICBpZiAoIW5lZ2F0ZSB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICBoYXNQcm9wZXJ0eTIsXG4gICAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gaGF2ZSBcIiArIGRlc2NyaXB0b3IgKyBpbnNwZWN0MihuYW1lKSxcbiAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgaGF2ZSBcIiArIGRlc2NyaXB0b3IgKyBpbnNwZWN0MihuYW1lKVxuICAgICk7XG4gIH1cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICBoYXNQcm9wZXJ0eTIgJiYgaXNFcWwodmFsLCB2YWx1ZSksXG4gICAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gaGF2ZSBcIiArIGRlc2NyaXB0b3IgKyBpbnNwZWN0MihuYW1lKSArIFwiIG9mICN7ZXhwfSwgYnV0IGdvdCAje2FjdH1cIixcbiAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgaGF2ZSBcIiArIGRlc2NyaXB0b3IgKyBpbnNwZWN0MihuYW1lKSArIFwiIG9mICN7YWN0fVwiLFxuICAgICAgdmFsLFxuICAgICAgdmFsdWVcbiAgICApO1xuICB9XG4gIGZsYWcyKHRoaXMsIFwib2JqZWN0XCIsIHZhbHVlKTtcbn1cbl9fbmFtZShhc3NlcnRQcm9wZXJ0eSwgXCJhc3NlcnRQcm9wZXJ0eVwiKTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJwcm9wZXJ0eVwiLCBhc3NlcnRQcm9wZXJ0eSk7XG5mdW5jdGlvbiBhc3NlcnRPd25Qcm9wZXJ0eShfbmFtZSwgX3ZhbHVlLCBfbXNnKSB7XG4gIGZsYWcyKHRoaXMsIFwib3duXCIsIHRydWUpO1xuICBhc3NlcnRQcm9wZXJ0eS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuX19uYW1lKGFzc2VydE93blByb3BlcnR5LCBcImFzc2VydE93blByb3BlcnR5XCIpO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcIm93blByb3BlcnR5XCIsIGFzc2VydE93blByb3BlcnR5KTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJoYXZlT3duUHJvcGVydHlcIiwgYXNzZXJ0T3duUHJvcGVydHkpO1xuZnVuY3Rpb24gYXNzZXJ0T3duUHJvcGVydHlEZXNjcmlwdG9yKG5hbWUsIGRlc2NyaXB0b3IsIG1zZykge1xuICBpZiAodHlwZW9mIGRlc2NyaXB0b3IgPT09IFwic3RyaW5nXCIpIHtcbiAgICBtc2cgPSBkZXNjcmlwdG9yO1xuICAgIGRlc2NyaXB0b3IgPSBudWxsO1xuICB9XG4gIGlmIChtc2cpIGZsYWcyKHRoaXMsIFwibWVzc2FnZVwiLCBtc2cpO1xuICBsZXQgb2JqID0gZmxhZzIodGhpcywgXCJvYmplY3RcIik7XG4gIGxldCBhY3R1YWxEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihPYmplY3Qob2JqKSwgbmFtZSk7XG4gIGxldCBlcWwgPSBmbGFnMih0aGlzLCBcImVxbFwiKTtcbiAgaWYgKGFjdHVhbERlc2NyaXB0b3IgJiYgZGVzY3JpcHRvcikge1xuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgZXFsKGRlc2NyaXB0b3IsIGFjdHVhbERlc2NyaXB0b3IpLFxuICAgICAgXCJleHBlY3RlZCB0aGUgb3duIHByb3BlcnR5IGRlc2NyaXB0b3IgZm9yIFwiICsgaW5zcGVjdDIobmFtZSkgKyBcIiBvbiAje3RoaXN9IHRvIG1hdGNoIFwiICsgaW5zcGVjdDIoZGVzY3JpcHRvcikgKyBcIiwgZ290IFwiICsgaW5zcGVjdDIoYWN0dWFsRGVzY3JpcHRvciksXG4gICAgICBcImV4cGVjdGVkIHRoZSBvd24gcHJvcGVydHkgZGVzY3JpcHRvciBmb3IgXCIgKyBpbnNwZWN0MihuYW1lKSArIFwiIG9uICN7dGhpc30gdG8gbm90IG1hdGNoIFwiICsgaW5zcGVjdDIoZGVzY3JpcHRvciksXG4gICAgICBkZXNjcmlwdG9yLFxuICAgICAgYWN0dWFsRGVzY3JpcHRvcixcbiAgICAgIHRydWVcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgYWN0dWFsRGVzY3JpcHRvcixcbiAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBoYXZlIGFuIG93biBwcm9wZXJ0eSBkZXNjcmlwdG9yIGZvciBcIiArIGluc3BlY3QyKG5hbWUpLFxuICAgICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBoYXZlIGFuIG93biBwcm9wZXJ0eSBkZXNjcmlwdG9yIGZvciBcIiArIGluc3BlY3QyKG5hbWUpXG4gICAgKTtcbiAgfVxuICBmbGFnMih0aGlzLCBcIm9iamVjdFwiLCBhY3R1YWxEZXNjcmlwdG9yKTtcbn1cbl9fbmFtZShhc3NlcnRPd25Qcm9wZXJ0eURlc2NyaXB0b3IsIFwiYXNzZXJ0T3duUHJvcGVydHlEZXNjcmlwdG9yXCIpO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcIm93blByb3BlcnR5RGVzY3JpcHRvclwiLCBhc3NlcnRPd25Qcm9wZXJ0eURlc2NyaXB0b3IpO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcImhhdmVPd25Qcm9wZXJ0eURlc2NyaXB0b3JcIiwgYXNzZXJ0T3duUHJvcGVydHlEZXNjcmlwdG9yKTtcbmZ1bmN0aW9uIGFzc2VydExlbmd0aENoYWluKCkge1xuICBmbGFnMih0aGlzLCBcImRvTGVuZ3RoXCIsIHRydWUpO1xufVxuX19uYW1lKGFzc2VydExlbmd0aENoYWluLCBcImFzc2VydExlbmd0aENoYWluXCIpO1xuZnVuY3Rpb24gYXNzZXJ0TGVuZ3RoKG4sIG1zZykge1xuICBpZiAobXNnKSBmbGFnMih0aGlzLCBcIm1lc3NhZ2VcIiwgbXNnKTtcbiAgbGV0IG9iaiA9IGZsYWcyKHRoaXMsIFwib2JqZWN0XCIpLCBvYmpUeXBlID0gdHlwZShvYmopLnRvTG93ZXJDYXNlKCksIGZsYWdNc2cgPSBmbGFnMih0aGlzLCBcIm1lc3NhZ2VcIiksIHNzZmkgPSBmbGFnMih0aGlzLCBcInNzZmlcIiksIGRlc2NyaXB0b3IgPSBcImxlbmd0aFwiLCBpdGVtc0NvdW50O1xuICBzd2l0Y2ggKG9ialR5cGUpIHtcbiAgICBjYXNlIFwibWFwXCI6XG4gICAgY2FzZSBcInNldFwiOlxuICAgICAgZGVzY3JpcHRvciA9IFwic2l6ZVwiO1xuICAgICAgaXRlbXNDb3VudCA9IG9iai5zaXplO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIG5ldyBBc3NlcnRpb24ob2JqLCBmbGFnTXNnLCBzc2ZpLCB0cnVlKS50by5oYXZlLnByb3BlcnR5KFwibGVuZ3RoXCIpO1xuICAgICAgaXRlbXNDb3VudCA9IG9iai5sZW5ndGg7XG4gIH1cbiAgdGhpcy5hc3NlcnQoXG4gICAgaXRlbXNDb3VudCA9PSBuLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBoYXZlIGEgXCIgKyBkZXNjcmlwdG9yICsgXCIgb2YgI3tleHB9IGJ1dCBnb3QgI3thY3R9XCIsXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBoYXZlIGEgXCIgKyBkZXNjcmlwdG9yICsgXCIgb2YgI3thY3R9XCIsXG4gICAgbixcbiAgICBpdGVtc0NvdW50XG4gICk7XG59XG5fX25hbWUoYXNzZXJ0TGVuZ3RoLCBcImFzc2VydExlbmd0aFwiKTtcbkFzc2VydGlvbi5hZGRDaGFpbmFibGVNZXRob2QoXCJsZW5ndGhcIiwgYXNzZXJ0TGVuZ3RoLCBhc3NlcnRMZW5ndGhDaGFpbik7XG5Bc3NlcnRpb24uYWRkQ2hhaW5hYmxlTWV0aG9kKFwibGVuZ3RoT2ZcIiwgYXNzZXJ0TGVuZ3RoLCBhc3NlcnRMZW5ndGhDaGFpbik7XG5mdW5jdGlvbiBhc3NlcnRNYXRjaChyZSwgbXNnKSB7XG4gIGlmIChtc2cpIGZsYWcyKHRoaXMsIFwibWVzc2FnZVwiLCBtc2cpO1xuICBsZXQgb2JqID0gZmxhZzIodGhpcywgXCJvYmplY3RcIik7XG4gIHRoaXMuYXNzZXJ0KFxuICAgIHJlLmV4ZWMob2JqKSxcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gbWF0Y2ggXCIgKyByZSxcbiAgICBcImV4cGVjdGVkICN7dGhpc30gbm90IHRvIG1hdGNoIFwiICsgcmVcbiAgKTtcbn1cbl9fbmFtZShhc3NlcnRNYXRjaCwgXCJhc3NlcnRNYXRjaFwiKTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJtYXRjaFwiLCBhc3NlcnRNYXRjaCk7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwibWF0Y2hlc1wiLCBhc3NlcnRNYXRjaCk7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwic3RyaW5nXCIsIGZ1bmN0aW9uKHN0ciwgbXNnKSB7XG4gIGlmIChtc2cpIGZsYWcyKHRoaXMsIFwibWVzc2FnZVwiLCBtc2cpO1xuICBsZXQgb2JqID0gZmxhZzIodGhpcywgXCJvYmplY3RcIiksIGZsYWdNc2cgPSBmbGFnMih0aGlzLCBcIm1lc3NhZ2VcIiksIHNzZmkgPSBmbGFnMih0aGlzLCBcInNzZmlcIik7XG4gIG5ldyBBc3NlcnRpb24ob2JqLCBmbGFnTXNnLCBzc2ZpLCB0cnVlKS5pcy5hKFwic3RyaW5nXCIpO1xuICB0aGlzLmFzc2VydChcbiAgICB+b2JqLmluZGV4T2Yoc3RyKSxcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gY29udGFpbiBcIiArIGluc3BlY3QyKHN0ciksXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBjb250YWluIFwiICsgaW5zcGVjdDIoc3RyKVxuICApO1xufSk7XG5mdW5jdGlvbiBhc3NlcnRLZXlzKGtleXMpIHtcbiAgbGV0IG9iaiA9IGZsYWcyKHRoaXMsIFwib2JqZWN0XCIpLCBvYmpUeXBlID0gdHlwZShvYmopLCBrZXlzVHlwZSA9IHR5cGUoa2V5cyksIHNzZmkgPSBmbGFnMih0aGlzLCBcInNzZmlcIiksIGlzRGVlcCA9IGZsYWcyKHRoaXMsIFwiZGVlcFwiKSwgc3RyLCBkZWVwU3RyID0gXCJcIiwgYWN0dWFsLCBvayA9IHRydWUsIGZsYWdNc2cgPSBmbGFnMih0aGlzLCBcIm1lc3NhZ2VcIik7XG4gIGZsYWdNc2cgPSBmbGFnTXNnID8gZmxhZ01zZyArIFwiOiBcIiA6IFwiXCI7XG4gIGxldCBtaXhlZEFyZ3NNc2cgPSBmbGFnTXNnICsgXCJ3aGVuIHRlc3Rpbmcga2V5cyBhZ2FpbnN0IGFuIG9iamVjdCBvciBhbiBhcnJheSB5b3UgbXVzdCBnaXZlIGEgc2luZ2xlIEFycmF5fE9iamVjdHxTdHJpbmcgYXJndW1lbnQgb3IgbXVsdGlwbGUgU3RyaW5nIGFyZ3VtZW50c1wiO1xuICBpZiAob2JqVHlwZSA9PT0gXCJNYXBcIiB8fCBvYmpUeXBlID09PSBcIlNldFwiKSB7XG4gICAgZGVlcFN0ciA9IGlzRGVlcCA/IFwiZGVlcGx5IFwiIDogXCJcIjtcbiAgICBhY3R1YWwgPSBbXTtcbiAgICBvYmouZm9yRWFjaChmdW5jdGlvbih2YWwsIGtleSkge1xuICAgICAgYWN0dWFsLnB1c2goa2V5KTtcbiAgICB9KTtcbiAgICBpZiAoa2V5c1R5cGUgIT09IFwiQXJyYXlcIikge1xuICAgICAga2V5cyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGFjdHVhbCA9IGdldE93bkVudW1lcmFibGVQcm9wZXJ0aWVzKG9iaik7XG4gICAgc3dpdGNoIChrZXlzVHlwZSkge1xuICAgICAgY2FzZSBcIkFycmF5XCI6XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihtaXhlZEFyZ3NNc2csIHZvaWQgMCwgc3NmaSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiT2JqZWN0XCI6XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihtaXhlZEFyZ3NNc2csIHZvaWQgMCwgc3NmaSk7XG4gICAgICAgIH1cbiAgICAgICAga2V5cyA9IE9iamVjdC5rZXlzKGtleXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGtleXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgIH1cbiAgICBrZXlzID0ga2V5cy5tYXAoZnVuY3Rpb24odmFsKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gXCJzeW1ib2xcIiA/IHZhbCA6IFN0cmluZyh2YWwpO1xuICAgIH0pO1xuICB9XG4gIGlmICgha2V5cy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IoZmxhZ01zZyArIFwia2V5cyByZXF1aXJlZFwiLCB2b2lkIDAsIHNzZmkpO1xuICB9XG4gIGxldCBsZW4gPSBrZXlzLmxlbmd0aCwgYW55ID0gZmxhZzIodGhpcywgXCJhbnlcIiksIGFsbCA9IGZsYWcyKHRoaXMsIFwiYWxsXCIpLCBleHBlY3RlZCA9IGtleXMsIGlzRXFsID0gaXNEZWVwID8gZmxhZzIodGhpcywgXCJlcWxcIikgOiAodmFsMSwgdmFsMikgPT4gdmFsMSA9PT0gdmFsMjtcbiAgaWYgKCFhbnkgJiYgIWFsbCkge1xuICAgIGFsbCA9IHRydWU7XG4gIH1cbiAgaWYgKGFueSkge1xuICAgIG9rID0gZXhwZWN0ZWQuc29tZShmdW5jdGlvbihleHBlY3RlZEtleSkge1xuICAgICAgcmV0dXJuIGFjdHVhbC5zb21lKGZ1bmN0aW9uKGFjdHVhbEtleSkge1xuICAgICAgICByZXR1cm4gaXNFcWwoZXhwZWN0ZWRLZXksIGFjdHVhbEtleSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBpZiAoYWxsKSB7XG4gICAgb2sgPSBleHBlY3RlZC5ldmVyeShmdW5jdGlvbihleHBlY3RlZEtleSkge1xuICAgICAgcmV0dXJuIGFjdHVhbC5zb21lKGZ1bmN0aW9uKGFjdHVhbEtleSkge1xuICAgICAgICByZXR1cm4gaXNFcWwoZXhwZWN0ZWRLZXksIGFjdHVhbEtleSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBpZiAoIWZsYWcyKHRoaXMsIFwiY29udGFpbnNcIikpIHtcbiAgICAgIG9rID0gb2sgJiYga2V5cy5sZW5ndGggPT0gYWN0dWFsLmxlbmd0aDtcbiAgICB9XG4gIH1cbiAgaWYgKGxlbiA+IDEpIHtcbiAgICBrZXlzID0ga2V5cy5tYXAoZnVuY3Rpb24oa2V5KSB7XG4gICAgICByZXR1cm4gaW5zcGVjdDIoa2V5KTtcbiAgICB9KTtcbiAgICBsZXQgbGFzdCA9IGtleXMucG9wKCk7XG4gICAgaWYgKGFsbCkge1xuICAgICAgc3RyID0ga2V5cy5qb2luKFwiLCBcIikgKyBcIiwgYW5kIFwiICsgbGFzdDtcbiAgICB9XG4gICAgaWYgKGFueSkge1xuICAgICAgc3RyID0ga2V5cy5qb2luKFwiLCBcIikgKyBcIiwgb3IgXCIgKyBsYXN0O1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBzdHIgPSBpbnNwZWN0MihrZXlzWzBdKTtcbiAgfVxuICBzdHIgPSAobGVuID4gMSA/IFwia2V5cyBcIiA6IFwia2V5IFwiKSArIHN0cjtcbiAgc3RyID0gKGZsYWcyKHRoaXMsIFwiY29udGFpbnNcIikgPyBcImNvbnRhaW4gXCIgOiBcImhhdmUgXCIpICsgc3RyO1xuICB0aGlzLmFzc2VydChcbiAgICBvayxcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gXCIgKyBkZWVwU3RyICsgc3RyLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgXCIgKyBkZWVwU3RyICsgc3RyLFxuICAgIGV4cGVjdGVkLnNsaWNlKDApLnNvcnQoY29tcGFyZUJ5SW5zcGVjdCksXG4gICAgYWN0dWFsLnNvcnQoY29tcGFyZUJ5SW5zcGVjdCksXG4gICAgdHJ1ZVxuICApO1xufVxuX19uYW1lKGFzc2VydEtleXMsIFwiYXNzZXJ0S2V5c1wiKTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJrZXlzXCIsIGFzc2VydEtleXMpO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcImtleVwiLCBhc3NlcnRLZXlzKTtcbmZ1bmN0aW9uIGFzc2VydFRocm93cyhlcnJvckxpa2UsIGVyck1zZ01hdGNoZXIsIG1zZykge1xuICBpZiAobXNnKSBmbGFnMih0aGlzLCBcIm1lc3NhZ2VcIiwgbXNnKTtcbiAgbGV0IG9iaiA9IGZsYWcyKHRoaXMsIFwib2JqZWN0XCIpLCBzc2ZpID0gZmxhZzIodGhpcywgXCJzc2ZpXCIpLCBmbGFnTXNnID0gZmxhZzIodGhpcywgXCJtZXNzYWdlXCIpLCBuZWdhdGUgPSBmbGFnMih0aGlzLCBcIm5lZ2F0ZVwiKSB8fCBmYWxzZTtcbiAgbmV3IEFzc2VydGlvbihvYmosIGZsYWdNc2csIHNzZmksIHRydWUpLmlzLmEoXCJmdW5jdGlvblwiKTtcbiAgaWYgKGlzUmVnRXhwMihlcnJvckxpa2UpIHx8IHR5cGVvZiBlcnJvckxpa2UgPT09IFwic3RyaW5nXCIpIHtcbiAgICBlcnJNc2dNYXRjaGVyID0gZXJyb3JMaWtlO1xuICAgIGVycm9yTGlrZSA9IG51bGw7XG4gIH1cbiAgbGV0IGNhdWdodEVycjtcbiAgbGV0IGVycm9yV2FzVGhyb3duID0gZmFsc2U7XG4gIHRyeSB7XG4gICAgb2JqKCk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGVycm9yV2FzVGhyb3duID0gdHJ1ZTtcbiAgICBjYXVnaHRFcnIgPSBlcnI7XG4gIH1cbiAgbGV0IGV2ZXJ5QXJnSXNVbmRlZmluZWQgPSBlcnJvckxpa2UgPT09IHZvaWQgMCAmJiBlcnJNc2dNYXRjaGVyID09PSB2b2lkIDA7XG4gIGxldCBldmVyeUFyZ0lzRGVmaW5lZCA9IEJvb2xlYW4oZXJyb3JMaWtlICYmIGVyck1zZ01hdGNoZXIpO1xuICBsZXQgZXJyb3JMaWtlRmFpbCA9IGZhbHNlO1xuICBsZXQgZXJyTXNnTWF0Y2hlckZhaWwgPSBmYWxzZTtcbiAgaWYgKGV2ZXJ5QXJnSXNVbmRlZmluZWQgfHwgIWV2ZXJ5QXJnSXNVbmRlZmluZWQgJiYgIW5lZ2F0ZSkge1xuICAgIGxldCBlcnJvckxpa2VTdHJpbmcgPSBcImFuIGVycm9yXCI7XG4gICAgaWYgKGVycm9yTGlrZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICBlcnJvckxpa2VTdHJpbmcgPSBcIiN7ZXhwfVwiO1xuICAgIH0gZWxzZSBpZiAoZXJyb3JMaWtlKSB7XG4gICAgICBlcnJvckxpa2VTdHJpbmcgPSBjaGVja19lcnJvcl9leHBvcnRzLmdldENvbnN0cnVjdG9yTmFtZShlcnJvckxpa2UpO1xuICAgIH1cbiAgICBsZXQgYWN0dWFsID0gY2F1Z2h0RXJyO1xuICAgIGlmIChjYXVnaHRFcnIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgYWN0dWFsID0gY2F1Z2h0RXJyLnRvU3RyaW5nKCk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY2F1Z2h0RXJyID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBhY3R1YWwgPSBjYXVnaHRFcnI7XG4gICAgfSBlbHNlIGlmIChjYXVnaHRFcnIgJiYgKHR5cGVvZiBjYXVnaHRFcnIgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhdWdodEVyciA9PT0gXCJmdW5jdGlvblwiKSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgYWN0dWFsID0gY2hlY2tfZXJyb3JfZXhwb3J0cy5nZXRDb25zdHJ1Y3Rvck5hbWUoY2F1Z2h0RXJyKTtcbiAgICAgIH0gY2F0Y2ggKF9lcnIpIHtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICBlcnJvcldhc1Rocm93bixcbiAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byB0aHJvdyBcIiArIGVycm9yTGlrZVN0cmluZyxcbiAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgdGhyb3cgYW4gZXJyb3IgYnV0ICN7YWN0fSB3YXMgdGhyb3duXCIsXG4gICAgICBlcnJvckxpa2UgJiYgZXJyb3JMaWtlLnRvU3RyaW5nKCksXG4gICAgICBhY3R1YWxcbiAgICApO1xuICB9XG4gIGlmIChlcnJvckxpa2UgJiYgY2F1Z2h0RXJyKSB7XG4gICAgaWYgKGVycm9yTGlrZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICBsZXQgaXNDb21wYXRpYmxlSW5zdGFuY2UgPSBjaGVja19lcnJvcl9leHBvcnRzLmNvbXBhdGlibGVJbnN0YW5jZShcbiAgICAgICAgY2F1Z2h0RXJyLFxuICAgICAgICBlcnJvckxpa2VcbiAgICAgICk7XG4gICAgICBpZiAoaXNDb21wYXRpYmxlSW5zdGFuY2UgPT09IG5lZ2F0ZSkge1xuICAgICAgICBpZiAoZXZlcnlBcmdJc0RlZmluZWQgJiYgbmVnYXRlKSB7XG4gICAgICAgICAgZXJyb3JMaWtlRmFpbCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5hc3NlcnQoXG4gICAgICAgICAgICBuZWdhdGUsXG4gICAgICAgICAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gdGhyb3cgI3tleHB9IGJ1dCAje2FjdH0gd2FzIHRocm93blwiLFxuICAgICAgICAgICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIG5vdCB0aHJvdyAje2V4cH1cIiArIChjYXVnaHRFcnIgJiYgIW5lZ2F0ZSA/IFwiIGJ1dCAje2FjdH0gd2FzIHRocm93blwiIDogXCJcIiksXG4gICAgICAgICAgICBlcnJvckxpa2UudG9TdHJpbmcoKSxcbiAgICAgICAgICAgIGNhdWdodEVyci50b1N0cmluZygpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBsZXQgaXNDb21wYXRpYmxlQ29uc3RydWN0b3IgPSBjaGVja19lcnJvcl9leHBvcnRzLmNvbXBhdGlibGVDb25zdHJ1Y3RvcihcbiAgICAgIGNhdWdodEVycixcbiAgICAgIGVycm9yTGlrZVxuICAgICk7XG4gICAgaWYgKGlzQ29tcGF0aWJsZUNvbnN0cnVjdG9yID09PSBuZWdhdGUpIHtcbiAgICAgIGlmIChldmVyeUFyZ0lzRGVmaW5lZCAmJiBuZWdhdGUpIHtcbiAgICAgICAgZXJyb3JMaWtlRmFpbCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFzc2VydChcbiAgICAgICAgICBuZWdhdGUsXG4gICAgICAgICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIHRocm93ICN7ZXhwfSBidXQgI3thY3R9IHdhcyB0aHJvd25cIixcbiAgICAgICAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gbm90IHRocm93ICN7ZXhwfVwiICsgKGNhdWdodEVyciA/IFwiIGJ1dCAje2FjdH0gd2FzIHRocm93blwiIDogXCJcIiksXG4gICAgICAgICAgZXJyb3JMaWtlIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvckxpa2UudG9TdHJpbmcoKSA6IGVycm9yTGlrZSAmJiBjaGVja19lcnJvcl9leHBvcnRzLmdldENvbnN0cnVjdG9yTmFtZShlcnJvckxpa2UpLFxuICAgICAgICAgIGNhdWdodEVyciBpbnN0YW5jZW9mIEVycm9yID8gY2F1Z2h0RXJyLnRvU3RyaW5nKCkgOiBjYXVnaHRFcnIgJiYgY2hlY2tfZXJyb3JfZXhwb3J0cy5nZXRDb25zdHJ1Y3Rvck5hbWUoY2F1Z2h0RXJyKVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAoY2F1Z2h0RXJyICYmIGVyck1zZ01hdGNoZXIgIT09IHZvaWQgMCAmJiBlcnJNc2dNYXRjaGVyICE9PSBudWxsKSB7XG4gICAgbGV0IHBsYWNlaG9sZGVyID0gXCJpbmNsdWRpbmdcIjtcbiAgICBpZiAoaXNSZWdFeHAyKGVyck1zZ01hdGNoZXIpKSB7XG4gICAgICBwbGFjZWhvbGRlciA9IFwibWF0Y2hpbmdcIjtcbiAgICB9XG4gICAgbGV0IGlzQ29tcGF0aWJsZU1lc3NhZ2UgPSBjaGVja19lcnJvcl9leHBvcnRzLmNvbXBhdGlibGVNZXNzYWdlKFxuICAgICAgY2F1Z2h0RXJyLFxuICAgICAgZXJyTXNnTWF0Y2hlclxuICAgICk7XG4gICAgaWYgKGlzQ29tcGF0aWJsZU1lc3NhZ2UgPT09IG5lZ2F0ZSkge1xuICAgICAgaWYgKGV2ZXJ5QXJnSXNEZWZpbmVkICYmIG5lZ2F0ZSkge1xuICAgICAgICBlcnJNc2dNYXRjaGVyRmFpbCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmFzc2VydChcbiAgICAgICAgICBuZWdhdGUsXG4gICAgICAgICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIHRocm93IGVycm9yIFwiICsgcGxhY2Vob2xkZXIgKyBcIiAje2V4cH0gYnV0IGdvdCAje2FjdH1cIixcbiAgICAgICAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gdGhyb3cgZXJyb3Igbm90IFwiICsgcGxhY2Vob2xkZXIgKyBcIiAje2V4cH1cIixcbiAgICAgICAgICBlcnJNc2dNYXRjaGVyLFxuICAgICAgICAgIGNoZWNrX2Vycm9yX2V4cG9ydHMuZ2V0TWVzc2FnZShjYXVnaHRFcnIpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmIChlcnJvckxpa2VGYWlsICYmIGVyck1zZ01hdGNoZXJGYWlsKSB7XG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICBuZWdhdGUsXG4gICAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gdGhyb3cgI3tleHB9IGJ1dCAje2FjdH0gd2FzIHRocm93blwiLFxuICAgICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIG5vdCB0aHJvdyAje2V4cH1cIiArIChjYXVnaHRFcnIgPyBcIiBidXQgI3thY3R9IHdhcyB0aHJvd25cIiA6IFwiXCIpLFxuICAgICAgZXJyb3JMaWtlIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvckxpa2UudG9TdHJpbmcoKSA6IGVycm9yTGlrZSAmJiBjaGVja19lcnJvcl9leHBvcnRzLmdldENvbnN0cnVjdG9yTmFtZShlcnJvckxpa2UpLFxuICAgICAgY2F1Z2h0RXJyIGluc3RhbmNlb2YgRXJyb3IgPyBjYXVnaHRFcnIudG9TdHJpbmcoKSA6IGNhdWdodEVyciAmJiBjaGVja19lcnJvcl9leHBvcnRzLmdldENvbnN0cnVjdG9yTmFtZShjYXVnaHRFcnIpXG4gICAgKTtcbiAgfVxuICBmbGFnMih0aGlzLCBcIm9iamVjdFwiLCBjYXVnaHRFcnIpO1xufVxuX19uYW1lKGFzc2VydFRocm93cywgXCJhc3NlcnRUaHJvd3NcIik7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwidGhyb3dcIiwgYXNzZXJ0VGhyb3dzKTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJ0aHJvd3NcIiwgYXNzZXJ0VGhyb3dzKTtcbkFzc2VydGlvbi5hZGRNZXRob2QoXCJUaHJvd1wiLCBhc3NlcnRUaHJvd3MpO1xuZnVuY3Rpb24gcmVzcG9uZFRvKG1ldGhvZCwgbXNnKSB7XG4gIGlmIChtc2cpIGZsYWcyKHRoaXMsIFwibWVzc2FnZVwiLCBtc2cpO1xuICBsZXQgb2JqID0gZmxhZzIodGhpcywgXCJvYmplY3RcIiksIGl0c2VsZiA9IGZsYWcyKHRoaXMsIFwiaXRzZWxmXCIpLCBjb250ZXh0ID0gXCJmdW5jdGlvblwiID09PSB0eXBlb2Ygb2JqICYmICFpdHNlbGYgPyBvYmoucHJvdG90eXBlW21ldGhvZF0gOiBvYmpbbWV0aG9kXTtcbiAgdGhpcy5hc3NlcnQoXG4gICAgXCJmdW5jdGlvblwiID09PSB0eXBlb2YgY29udGV4dCxcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gcmVzcG9uZCB0byBcIiArIGluc3BlY3QyKG1ldGhvZCksXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIG5vdCByZXNwb25kIHRvIFwiICsgaW5zcGVjdDIobWV0aG9kKVxuICApO1xufVxuX19uYW1lKHJlc3BvbmRUbywgXCJyZXNwb25kVG9cIik7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwicmVzcG9uZFRvXCIsIHJlc3BvbmRUbyk7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwicmVzcG9uZHNUb1wiLCByZXNwb25kVG8pO1xuQXNzZXJ0aW9uLmFkZFByb3BlcnR5KFwiaXRzZWxmXCIsIGZ1bmN0aW9uKCkge1xuICBmbGFnMih0aGlzLCBcIml0c2VsZlwiLCB0cnVlKTtcbn0pO1xuZnVuY3Rpb24gc2F0aXNmeShtYXRjaGVyLCBtc2cpIHtcbiAgaWYgKG1zZykgZmxhZzIodGhpcywgXCJtZXNzYWdlXCIsIG1zZyk7XG4gIGxldCBvYmogPSBmbGFnMih0aGlzLCBcIm9iamVjdFwiKTtcbiAgbGV0IHJlc3VsdCA9IG1hdGNoZXIob2JqKTtcbiAgdGhpcy5hc3NlcnQoXG4gICAgcmVzdWx0LFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBzYXRpc2Z5IFwiICsgb2JqRGlzcGxheShtYXRjaGVyKSxcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gbm90IHNhdGlzZnlcIiArIG9iakRpc3BsYXkobWF0Y2hlciksXG4gICAgZmxhZzIodGhpcywgXCJuZWdhdGVcIikgPyBmYWxzZSA6IHRydWUsXG4gICAgcmVzdWx0XG4gICk7XG59XG5fX25hbWUoc2F0aXNmeSwgXCJzYXRpc2Z5XCIpO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcInNhdGlzZnlcIiwgc2F0aXNmeSk7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwic2F0aXNmaWVzXCIsIHNhdGlzZnkpO1xuZnVuY3Rpb24gY2xvc2VUbyhleHBlY3RlZCwgZGVsdGEsIG1zZykge1xuICBpZiAobXNnKSBmbGFnMih0aGlzLCBcIm1lc3NhZ2VcIiwgbXNnKTtcbiAgbGV0IG9iaiA9IGZsYWcyKHRoaXMsIFwib2JqZWN0XCIpLCBmbGFnTXNnID0gZmxhZzIodGhpcywgXCJtZXNzYWdlXCIpLCBzc2ZpID0gZmxhZzIodGhpcywgXCJzc2ZpXCIpO1xuICBuZXcgQXNzZXJ0aW9uKG9iaiwgZmxhZ01zZywgc3NmaSwgdHJ1ZSkuaXMubnVtZXJpYztcbiAgbGV0IG1lc3NhZ2UgPSBcIkEgYGRlbHRhYCB2YWx1ZSBpcyByZXF1aXJlZCBmb3IgYGNsb3NlVG9gXCI7XG4gIGlmIChkZWx0YSA9PSB2b2lkIDApIHtcbiAgICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IoXG4gICAgICBmbGFnTXNnID8gYCR7ZmxhZ01zZ306ICR7bWVzc2FnZX1gIDogbWVzc2FnZSxcbiAgICAgIHZvaWQgMCxcbiAgICAgIHNzZmlcbiAgICApO1xuICB9XG4gIG5ldyBBc3NlcnRpb24oZGVsdGEsIGZsYWdNc2csIHNzZmksIHRydWUpLmlzLm51bWVyaWM7XG4gIG1lc3NhZ2UgPSBcIkEgYGV4cGVjdGVkYCB2YWx1ZSBpcyByZXF1aXJlZCBmb3IgYGNsb3NlVG9gXCI7XG4gIGlmIChleHBlY3RlZCA9PSB2b2lkIDApIHtcbiAgICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IoXG4gICAgICBmbGFnTXNnID8gYCR7ZmxhZ01zZ306ICR7bWVzc2FnZX1gIDogbWVzc2FnZSxcbiAgICAgIHZvaWQgMCxcbiAgICAgIHNzZmlcbiAgICApO1xuICB9XG4gIG5ldyBBc3NlcnRpb24oZXhwZWN0ZWQsIGZsYWdNc2csIHNzZmksIHRydWUpLmlzLm51bWVyaWM7XG4gIGNvbnN0IGFicyA9IC8qIEBfX1BVUkVfXyAqLyBfX25hbWUoKHgpID0+IHggPCAwbiA/IC14IDogeCwgXCJhYnNcIik7XG4gIGNvbnN0IHN0cmlwID0gLyogQF9fUFVSRV9fICovIF9fbmFtZSgobnVtYmVyKSA9PiBwYXJzZUZsb2F0KHBhcnNlRmxvYXQobnVtYmVyKS50b1ByZWNpc2lvbigxMikpLCBcInN0cmlwXCIpO1xuICB0aGlzLmFzc2VydChcbiAgICBzdHJpcChhYnMob2JqIC0gZXhwZWN0ZWQpKSA8PSBkZWx0YSxcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gYmUgY2xvc2UgdG8gXCIgKyBleHBlY3RlZCArIFwiICsvLSBcIiArIGRlbHRhLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSBub3QgdG8gYmUgY2xvc2UgdG8gXCIgKyBleHBlY3RlZCArIFwiICsvLSBcIiArIGRlbHRhXG4gICk7XG59XG5fX25hbWUoY2xvc2VUbywgXCJjbG9zZVRvXCIpO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcImNsb3NlVG9cIiwgY2xvc2VUbyk7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwiYXBwcm94aW1hdGVseVwiLCBjbG9zZVRvKTtcbmZ1bmN0aW9uIGlzU3Vic2V0T2YoX3N1YnNldCwgX3N1cGVyc2V0LCBjbXAsIGNvbnRhaW5zLCBvcmRlcmVkKSB7XG4gIGxldCBzdXBlcnNldCA9IEFycmF5LmZyb20oX3N1cGVyc2V0KTtcbiAgbGV0IHN1YnNldCA9IEFycmF5LmZyb20oX3N1YnNldCk7XG4gIGlmICghY29udGFpbnMpIHtcbiAgICBpZiAoc3Vic2V0Lmxlbmd0aCAhPT0gc3VwZXJzZXQubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgc3VwZXJzZXQgPSBzdXBlcnNldC5zbGljZSgpO1xuICB9XG4gIHJldHVybiBzdWJzZXQuZXZlcnkoZnVuY3Rpb24oZWxlbSwgaWR4KSB7XG4gICAgaWYgKG9yZGVyZWQpIHJldHVybiBjbXAgPyBjbXAoZWxlbSwgc3VwZXJzZXRbaWR4XSkgOiBlbGVtID09PSBzdXBlcnNldFtpZHhdO1xuICAgIGlmICghY21wKSB7XG4gICAgICBsZXQgbWF0Y2hJZHggPSBzdXBlcnNldC5pbmRleE9mKGVsZW0pO1xuICAgICAgaWYgKG1hdGNoSWR4ID09PSAtMSkgcmV0dXJuIGZhbHNlO1xuICAgICAgaWYgKCFjb250YWlucykgc3VwZXJzZXQuc3BsaWNlKG1hdGNoSWR4LCAxKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gc3VwZXJzZXQuc29tZShmdW5jdGlvbihlbGVtMiwgbWF0Y2hJZHgpIHtcbiAgICAgIGlmICghY21wKGVsZW0sIGVsZW0yKSkgcmV0dXJuIGZhbHNlO1xuICAgICAgaWYgKCFjb250YWlucykgc3VwZXJzZXQuc3BsaWNlKG1hdGNoSWR4LCAxKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuICB9KTtcbn1cbl9fbmFtZShpc1N1YnNldE9mLCBcImlzU3Vic2V0T2ZcIik7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwibWVtYmVyc1wiLCBmdW5jdGlvbihzdWJzZXQsIG1zZykge1xuICBpZiAobXNnKSBmbGFnMih0aGlzLCBcIm1lc3NhZ2VcIiwgbXNnKTtcbiAgbGV0IG9iaiA9IGZsYWcyKHRoaXMsIFwib2JqZWN0XCIpLCBmbGFnTXNnID0gZmxhZzIodGhpcywgXCJtZXNzYWdlXCIpLCBzc2ZpID0gZmxhZzIodGhpcywgXCJzc2ZpXCIpO1xuICBuZXcgQXNzZXJ0aW9uKG9iaiwgZmxhZ01zZywgc3NmaSwgdHJ1ZSkudG8uYmUuaXRlcmFibGU7XG4gIG5ldyBBc3NlcnRpb24oc3Vic2V0LCBmbGFnTXNnLCBzc2ZpLCB0cnVlKS50by5iZS5pdGVyYWJsZTtcbiAgbGV0IGNvbnRhaW5zID0gZmxhZzIodGhpcywgXCJjb250YWluc1wiKTtcbiAgbGV0IG9yZGVyZWQgPSBmbGFnMih0aGlzLCBcIm9yZGVyZWRcIik7XG4gIGxldCBzdWJqZWN0LCBmYWlsTXNnLCBmYWlsTmVnYXRlTXNnO1xuICBpZiAoY29udGFpbnMpIHtcbiAgICBzdWJqZWN0ID0gb3JkZXJlZCA/IFwiYW4gb3JkZXJlZCBzdXBlcnNldFwiIDogXCJhIHN1cGVyc2V0XCI7XG4gICAgZmFpbE1zZyA9IFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBiZSBcIiArIHN1YmplY3QgKyBcIiBvZiAje2V4cH1cIjtcbiAgICBmYWlsTmVnYXRlTXNnID0gXCJleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBiZSBcIiArIHN1YmplY3QgKyBcIiBvZiAje2V4cH1cIjtcbiAgfSBlbHNlIHtcbiAgICBzdWJqZWN0ID0gb3JkZXJlZCA/IFwib3JkZXJlZCBtZW1iZXJzXCIgOiBcIm1lbWJlcnNcIjtcbiAgICBmYWlsTXNnID0gXCJleHBlY3RlZCAje3RoaXN9IHRvIGhhdmUgdGhlIHNhbWUgXCIgKyBzdWJqZWN0ICsgXCIgYXMgI3tleHB9XCI7XG4gICAgZmFpbE5lZ2F0ZU1zZyA9IFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgaGF2ZSB0aGUgc2FtZSBcIiArIHN1YmplY3QgKyBcIiBhcyAje2V4cH1cIjtcbiAgfVxuICBsZXQgY21wID0gZmxhZzIodGhpcywgXCJkZWVwXCIpID8gZmxhZzIodGhpcywgXCJlcWxcIikgOiB2b2lkIDA7XG4gIHRoaXMuYXNzZXJ0KFxuICAgIGlzU3Vic2V0T2Yoc3Vic2V0LCBvYmosIGNtcCwgY29udGFpbnMsIG9yZGVyZWQpLFxuICAgIGZhaWxNc2csXG4gICAgZmFpbE5lZ2F0ZU1zZyxcbiAgICBzdWJzZXQsXG4gICAgb2JqLFxuICAgIHRydWVcbiAgKTtcbn0pO1xuQXNzZXJ0aW9uLmFkZFByb3BlcnR5KFwiaXRlcmFibGVcIiwgZnVuY3Rpb24obXNnKSB7XG4gIGlmIChtc2cpIGZsYWcyKHRoaXMsIFwibWVzc2FnZVwiLCBtc2cpO1xuICBsZXQgb2JqID0gZmxhZzIodGhpcywgXCJvYmplY3RcIik7XG4gIHRoaXMuYXNzZXJ0KFxuICAgIG9iaiAhPSB2b2lkIDAgJiYgb2JqW1N5bWJvbC5pdGVyYXRvcl0sXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGJlIGFuIGl0ZXJhYmxlXCIsXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBiZSBhbiBpdGVyYWJsZVwiLFxuICAgIG9ialxuICApO1xufSk7XG5mdW5jdGlvbiBvbmVPZihsaXN0LCBtc2cpIHtcbiAgaWYgKG1zZykgZmxhZzIodGhpcywgXCJtZXNzYWdlXCIsIG1zZyk7XG4gIGxldCBleHBlY3RlZCA9IGZsYWcyKHRoaXMsIFwib2JqZWN0XCIpLCBmbGFnTXNnID0gZmxhZzIodGhpcywgXCJtZXNzYWdlXCIpLCBzc2ZpID0gZmxhZzIodGhpcywgXCJzc2ZpXCIpLCBjb250YWlucyA9IGZsYWcyKHRoaXMsIFwiY29udGFpbnNcIiksIGlzRGVlcCA9IGZsYWcyKHRoaXMsIFwiZGVlcFwiKSwgZXFsID0gZmxhZzIodGhpcywgXCJlcWxcIik7XG4gIG5ldyBBc3NlcnRpb24obGlzdCwgZmxhZ01zZywgc3NmaSwgdHJ1ZSkudG8uYmUuYW4oXCJhcnJheVwiKTtcbiAgaWYgKGNvbnRhaW5zKSB7XG4gICAgdGhpcy5hc3NlcnQoXG4gICAgICBsaXN0LnNvbWUoZnVuY3Rpb24ocG9zc2liaWxpdHkpIHtcbiAgICAgICAgcmV0dXJuIGV4cGVjdGVkLmluZGV4T2YocG9zc2liaWxpdHkpID4gLTE7XG4gICAgICB9KSxcbiAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBjb250YWluIG9uZSBvZiAje2V4cH1cIixcbiAgICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgY29udGFpbiBvbmUgb2YgI3tleHB9XCIsXG4gICAgICBsaXN0LFxuICAgICAgZXhwZWN0ZWRcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIGlmIChpc0RlZXApIHtcbiAgICAgIHRoaXMuYXNzZXJ0KFxuICAgICAgICBsaXN0LnNvbWUoZnVuY3Rpb24ocG9zc2liaWxpdHkpIHtcbiAgICAgICAgICByZXR1cm4gZXFsKGV4cGVjdGVkLCBwb3NzaWJpbGl0eSk7XG4gICAgICAgIH0pLFxuICAgICAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gZGVlcGx5IGVxdWFsIG9uZSBvZiAje2V4cH1cIixcbiAgICAgICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGRlZXBseSBlcXVhbCBvbmUgb2YgI3tleHB9XCIsXG4gICAgICAgIGxpc3QsXG4gICAgICAgIGV4cGVjdGVkXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFzc2VydChcbiAgICAgICAgbGlzdC5pbmRleE9mKGV4cGVjdGVkKSA+IC0xLFxuICAgICAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gYmUgb25lIG9mICN7ZXhwfVwiLFxuICAgICAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gbm90IGJlIG9uZSBvZiAje2V4cH1cIixcbiAgICAgICAgbGlzdCxcbiAgICAgICAgZXhwZWN0ZWRcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG5fX25hbWUob25lT2YsIFwib25lT2ZcIik7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwib25lT2ZcIiwgb25lT2YpO1xuZnVuY3Rpb24gYXNzZXJ0Q2hhbmdlcyhzdWJqZWN0LCBwcm9wLCBtc2cpIHtcbiAgaWYgKG1zZykgZmxhZzIodGhpcywgXCJtZXNzYWdlXCIsIG1zZyk7XG4gIGxldCBmbiA9IGZsYWcyKHRoaXMsIFwib2JqZWN0XCIpLCBmbGFnTXNnID0gZmxhZzIodGhpcywgXCJtZXNzYWdlXCIpLCBzc2ZpID0gZmxhZzIodGhpcywgXCJzc2ZpXCIpO1xuICBuZXcgQXNzZXJ0aW9uKGZuLCBmbGFnTXNnLCBzc2ZpLCB0cnVlKS5pcy5hKFwiZnVuY3Rpb25cIik7XG4gIGxldCBpbml0aWFsO1xuICBpZiAoIXByb3ApIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHN1YmplY3QsIGZsYWdNc2csIHNzZmksIHRydWUpLmlzLmEoXCJmdW5jdGlvblwiKTtcbiAgICBpbml0aWFsID0gc3ViamVjdCgpO1xuICB9IGVsc2Uge1xuICAgIG5ldyBBc3NlcnRpb24oc3ViamVjdCwgZmxhZ01zZywgc3NmaSwgdHJ1ZSkudG8uaGF2ZS5wcm9wZXJ0eShwcm9wKTtcbiAgICBpbml0aWFsID0gc3ViamVjdFtwcm9wXTtcbiAgfVxuICBmbigpO1xuICBsZXQgZmluYWwgPSBwcm9wID09PSB2b2lkIDAgfHwgcHJvcCA9PT0gbnVsbCA/IHN1YmplY3QoKSA6IHN1YmplY3RbcHJvcF07XG4gIGxldCBtc2dPYmogPSBwcm9wID09PSB2b2lkIDAgfHwgcHJvcCA9PT0gbnVsbCA/IGluaXRpYWwgOiBcIi5cIiArIHByb3A7XG4gIGZsYWcyKHRoaXMsIFwiZGVsdGFNc2dPYmpcIiwgbXNnT2JqKTtcbiAgZmxhZzIodGhpcywgXCJpbml0aWFsRGVsdGFWYWx1ZVwiLCBpbml0aWFsKTtcbiAgZmxhZzIodGhpcywgXCJmaW5hbERlbHRhVmFsdWVcIiwgZmluYWwpO1xuICBmbGFnMih0aGlzLCBcImRlbHRhQmVoYXZpb3JcIiwgXCJjaGFuZ2VcIik7XG4gIGZsYWcyKHRoaXMsIFwicmVhbERlbHRhXCIsIGZpbmFsICE9PSBpbml0aWFsKTtcbiAgdGhpcy5hc3NlcnQoXG4gICAgaW5pdGlhbCAhPT0gZmluYWwsXG4gICAgXCJleHBlY3RlZCBcIiArIG1zZ09iaiArIFwiIHRvIGNoYW5nZVwiLFxuICAgIFwiZXhwZWN0ZWQgXCIgKyBtc2dPYmogKyBcIiB0byBub3QgY2hhbmdlXCJcbiAgKTtcbn1cbl9fbmFtZShhc3NlcnRDaGFuZ2VzLCBcImFzc2VydENoYW5nZXNcIik7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwiY2hhbmdlXCIsIGFzc2VydENoYW5nZXMpO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcImNoYW5nZXNcIiwgYXNzZXJ0Q2hhbmdlcyk7XG5mdW5jdGlvbiBhc3NlcnRJbmNyZWFzZXMoc3ViamVjdCwgcHJvcCwgbXNnKSB7XG4gIGlmIChtc2cpIGZsYWcyKHRoaXMsIFwibWVzc2FnZVwiLCBtc2cpO1xuICBsZXQgZm4gPSBmbGFnMih0aGlzLCBcIm9iamVjdFwiKSwgZmxhZ01zZyA9IGZsYWcyKHRoaXMsIFwibWVzc2FnZVwiKSwgc3NmaSA9IGZsYWcyKHRoaXMsIFwic3NmaVwiKTtcbiAgbmV3IEFzc2VydGlvbihmbiwgZmxhZ01zZywgc3NmaSwgdHJ1ZSkuaXMuYShcImZ1bmN0aW9uXCIpO1xuICBsZXQgaW5pdGlhbDtcbiAgaWYgKCFwcm9wKSB7XG4gICAgbmV3IEFzc2VydGlvbihzdWJqZWN0LCBmbGFnTXNnLCBzc2ZpLCB0cnVlKS5pcy5hKFwiZnVuY3Rpb25cIik7XG4gICAgaW5pdGlhbCA9IHN1YmplY3QoKTtcbiAgfSBlbHNlIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHN1YmplY3QsIGZsYWdNc2csIHNzZmksIHRydWUpLnRvLmhhdmUucHJvcGVydHkocHJvcCk7XG4gICAgaW5pdGlhbCA9IHN1YmplY3RbcHJvcF07XG4gIH1cbiAgbmV3IEFzc2VydGlvbihpbml0aWFsLCBmbGFnTXNnLCBzc2ZpLCB0cnVlKS5pcy5hKFwibnVtYmVyXCIpO1xuICBmbigpO1xuICBsZXQgZmluYWwgPSBwcm9wID09PSB2b2lkIDAgfHwgcHJvcCA9PT0gbnVsbCA/IHN1YmplY3QoKSA6IHN1YmplY3RbcHJvcF07XG4gIGxldCBtc2dPYmogPSBwcm9wID09PSB2b2lkIDAgfHwgcHJvcCA9PT0gbnVsbCA/IGluaXRpYWwgOiBcIi5cIiArIHByb3A7XG4gIGZsYWcyKHRoaXMsIFwiZGVsdGFNc2dPYmpcIiwgbXNnT2JqKTtcbiAgZmxhZzIodGhpcywgXCJpbml0aWFsRGVsdGFWYWx1ZVwiLCBpbml0aWFsKTtcbiAgZmxhZzIodGhpcywgXCJmaW5hbERlbHRhVmFsdWVcIiwgZmluYWwpO1xuICBmbGFnMih0aGlzLCBcImRlbHRhQmVoYXZpb3JcIiwgXCJpbmNyZWFzZVwiKTtcbiAgZmxhZzIodGhpcywgXCJyZWFsRGVsdGFcIiwgZmluYWwgLSBpbml0aWFsKTtcbiAgdGhpcy5hc3NlcnQoXG4gICAgZmluYWwgLSBpbml0aWFsID4gMCxcbiAgICBcImV4cGVjdGVkIFwiICsgbXNnT2JqICsgXCIgdG8gaW5jcmVhc2VcIixcbiAgICBcImV4cGVjdGVkIFwiICsgbXNnT2JqICsgXCIgdG8gbm90IGluY3JlYXNlXCJcbiAgKTtcbn1cbl9fbmFtZShhc3NlcnRJbmNyZWFzZXMsIFwiYXNzZXJ0SW5jcmVhc2VzXCIpO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcImluY3JlYXNlXCIsIGFzc2VydEluY3JlYXNlcyk7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwiaW5jcmVhc2VzXCIsIGFzc2VydEluY3JlYXNlcyk7XG5mdW5jdGlvbiBhc3NlcnREZWNyZWFzZXMoc3ViamVjdCwgcHJvcCwgbXNnKSB7XG4gIGlmIChtc2cpIGZsYWcyKHRoaXMsIFwibWVzc2FnZVwiLCBtc2cpO1xuICBsZXQgZm4gPSBmbGFnMih0aGlzLCBcIm9iamVjdFwiKSwgZmxhZ01zZyA9IGZsYWcyKHRoaXMsIFwibWVzc2FnZVwiKSwgc3NmaSA9IGZsYWcyKHRoaXMsIFwic3NmaVwiKTtcbiAgbmV3IEFzc2VydGlvbihmbiwgZmxhZ01zZywgc3NmaSwgdHJ1ZSkuaXMuYShcImZ1bmN0aW9uXCIpO1xuICBsZXQgaW5pdGlhbDtcbiAgaWYgKCFwcm9wKSB7XG4gICAgbmV3IEFzc2VydGlvbihzdWJqZWN0LCBmbGFnTXNnLCBzc2ZpLCB0cnVlKS5pcy5hKFwiZnVuY3Rpb25cIik7XG4gICAgaW5pdGlhbCA9IHN1YmplY3QoKTtcbiAgfSBlbHNlIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHN1YmplY3QsIGZsYWdNc2csIHNzZmksIHRydWUpLnRvLmhhdmUucHJvcGVydHkocHJvcCk7XG4gICAgaW5pdGlhbCA9IHN1YmplY3RbcHJvcF07XG4gIH1cbiAgbmV3IEFzc2VydGlvbihpbml0aWFsLCBmbGFnTXNnLCBzc2ZpLCB0cnVlKS5pcy5hKFwibnVtYmVyXCIpO1xuICBmbigpO1xuICBsZXQgZmluYWwgPSBwcm9wID09PSB2b2lkIDAgfHwgcHJvcCA9PT0gbnVsbCA/IHN1YmplY3QoKSA6IHN1YmplY3RbcHJvcF07XG4gIGxldCBtc2dPYmogPSBwcm9wID09PSB2b2lkIDAgfHwgcHJvcCA9PT0gbnVsbCA/IGluaXRpYWwgOiBcIi5cIiArIHByb3A7XG4gIGZsYWcyKHRoaXMsIFwiZGVsdGFNc2dPYmpcIiwgbXNnT2JqKTtcbiAgZmxhZzIodGhpcywgXCJpbml0aWFsRGVsdGFWYWx1ZVwiLCBpbml0aWFsKTtcbiAgZmxhZzIodGhpcywgXCJmaW5hbERlbHRhVmFsdWVcIiwgZmluYWwpO1xuICBmbGFnMih0aGlzLCBcImRlbHRhQmVoYXZpb3JcIiwgXCJkZWNyZWFzZVwiKTtcbiAgZmxhZzIodGhpcywgXCJyZWFsRGVsdGFcIiwgaW5pdGlhbCAtIGZpbmFsKTtcbiAgdGhpcy5hc3NlcnQoXG4gICAgZmluYWwgLSBpbml0aWFsIDwgMCxcbiAgICBcImV4cGVjdGVkIFwiICsgbXNnT2JqICsgXCIgdG8gZGVjcmVhc2VcIixcbiAgICBcImV4cGVjdGVkIFwiICsgbXNnT2JqICsgXCIgdG8gbm90IGRlY3JlYXNlXCJcbiAgKTtcbn1cbl9fbmFtZShhc3NlcnREZWNyZWFzZXMsIFwiYXNzZXJ0RGVjcmVhc2VzXCIpO1xuQXNzZXJ0aW9uLmFkZE1ldGhvZChcImRlY3JlYXNlXCIsIGFzc2VydERlY3JlYXNlcyk7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwiZGVjcmVhc2VzXCIsIGFzc2VydERlY3JlYXNlcyk7XG5mdW5jdGlvbiBhc3NlcnREZWx0YShkZWx0YSwgbXNnKSB7XG4gIGlmIChtc2cpIGZsYWcyKHRoaXMsIFwibWVzc2FnZVwiLCBtc2cpO1xuICBsZXQgbXNnT2JqID0gZmxhZzIodGhpcywgXCJkZWx0YU1zZ09ialwiKTtcbiAgbGV0IGluaXRpYWwgPSBmbGFnMih0aGlzLCBcImluaXRpYWxEZWx0YVZhbHVlXCIpO1xuICBsZXQgZmluYWwgPSBmbGFnMih0aGlzLCBcImZpbmFsRGVsdGFWYWx1ZVwiKTtcbiAgbGV0IGJlaGF2aW9yID0gZmxhZzIodGhpcywgXCJkZWx0YUJlaGF2aW9yXCIpO1xuICBsZXQgcmVhbERlbHRhID0gZmxhZzIodGhpcywgXCJyZWFsRGVsdGFcIik7XG4gIGxldCBleHByZXNzaW9uO1xuICBpZiAoYmVoYXZpb3IgPT09IFwiY2hhbmdlXCIpIHtcbiAgICBleHByZXNzaW9uID0gTWF0aC5hYnMoZmluYWwgLSBpbml0aWFsKSA9PT0gTWF0aC5hYnMoZGVsdGEpO1xuICB9IGVsc2Uge1xuICAgIGV4cHJlc3Npb24gPSByZWFsRGVsdGEgPT09IE1hdGguYWJzKGRlbHRhKTtcbiAgfVxuICB0aGlzLmFzc2VydChcbiAgICBleHByZXNzaW9uLFxuICAgIFwiZXhwZWN0ZWQgXCIgKyBtc2dPYmogKyBcIiB0byBcIiArIGJlaGF2aW9yICsgXCIgYnkgXCIgKyBkZWx0YSxcbiAgICBcImV4cGVjdGVkIFwiICsgbXNnT2JqICsgXCIgdG8gbm90IFwiICsgYmVoYXZpb3IgKyBcIiBieSBcIiArIGRlbHRhXG4gICk7XG59XG5fX25hbWUoYXNzZXJ0RGVsdGEsIFwiYXNzZXJ0RGVsdGFcIik7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwiYnlcIiwgYXNzZXJ0RGVsdGEpO1xuQXNzZXJ0aW9uLmFkZFByb3BlcnR5KFwiZXh0ZW5zaWJsZVwiLCBmdW5jdGlvbigpIHtcbiAgbGV0IG9iaiA9IGZsYWcyKHRoaXMsIFwib2JqZWN0XCIpO1xuICBsZXQgaXNFeHRlbnNpYmxlID0gb2JqID09PSBPYmplY3Qob2JqKSAmJiBPYmplY3QuaXNFeHRlbnNpYmxlKG9iaik7XG4gIHRoaXMuYXNzZXJ0KFxuICAgIGlzRXh0ZW5zaWJsZSxcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gYmUgZXh0ZW5zaWJsZVwiLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgYmUgZXh0ZW5zaWJsZVwiXG4gICk7XG59KTtcbkFzc2VydGlvbi5hZGRQcm9wZXJ0eShcInNlYWxlZFwiLCBmdW5jdGlvbigpIHtcbiAgbGV0IG9iaiA9IGZsYWcyKHRoaXMsIFwib2JqZWN0XCIpO1xuICBsZXQgaXNTZWFsZWQgPSBvYmogPT09IE9iamVjdChvYmopID8gT2JqZWN0LmlzU2VhbGVkKG9iaikgOiB0cnVlO1xuICB0aGlzLmFzc2VydChcbiAgICBpc1NlYWxlZCxcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gYmUgc2VhbGVkXCIsXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBiZSBzZWFsZWRcIlxuICApO1xufSk7XG5Bc3NlcnRpb24uYWRkUHJvcGVydHkoXCJmcm96ZW5cIiwgZnVuY3Rpb24oKSB7XG4gIGxldCBvYmogPSBmbGFnMih0aGlzLCBcIm9iamVjdFwiKTtcbiAgbGV0IGlzRnJvemVuID0gb2JqID09PSBPYmplY3Qob2JqKSA/IE9iamVjdC5pc0Zyb3plbihvYmopIDogdHJ1ZTtcbiAgdGhpcy5hc3NlcnQoXG4gICAgaXNGcm96ZW4sXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGJlIGZyb3plblwiLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgYmUgZnJvemVuXCJcbiAgKTtcbn0pO1xuQXNzZXJ0aW9uLmFkZFByb3BlcnR5KFwiZmluaXRlXCIsIGZ1bmN0aW9uKF9tc2cpIHtcbiAgbGV0IG9iaiA9IGZsYWcyKHRoaXMsIFwib2JqZWN0XCIpO1xuICB0aGlzLmFzc2VydChcbiAgICB0eXBlb2Ygb2JqID09PSBcIm51bWJlclwiICYmIGlzRmluaXRlKG9iaiksXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIGJlIGEgZmluaXRlIG51bWJlclwiLFxuICAgIFwiZXhwZWN0ZWQgI3t0aGlzfSB0byBub3QgYmUgYSBmaW5pdGUgbnVtYmVyXCJcbiAgKTtcbn0pO1xuZnVuY3Rpb24gY29tcGFyZVN1YnNldChleHBlY3RlZCwgYWN0dWFsKSB7XG4gIGlmIChleHBlY3RlZCA9PT0gYWN0dWFsKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKHR5cGVvZiBhY3R1YWwgIT09IHR5cGVvZiBleHBlY3RlZCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAodHlwZW9mIGV4cGVjdGVkICE9PSBcIm9iamVjdFwiIHx8IGV4cGVjdGVkID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGV4cGVjdGVkID09PSBhY3R1YWw7XG4gIH1cbiAgaWYgKCFhY3R1YWwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKEFycmF5LmlzQXJyYXkoZXhwZWN0ZWQpKSB7XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGFjdHVhbCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGV4cGVjdGVkLmV2ZXJ5KGZ1bmN0aW9uKGV4cCkge1xuICAgICAgcmV0dXJuIGFjdHVhbC5zb21lKGZ1bmN0aW9uKGFjdCkge1xuICAgICAgICByZXR1cm4gY29tcGFyZVN1YnNldChleHAsIGFjdCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICBpZiAoZXhwZWN0ZWQgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgaWYgKGFjdHVhbCBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgIHJldHVybiBleHBlY3RlZC5nZXRUaW1lKCkgPT09IGFjdHVhbC5nZXRUaW1lKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIE9iamVjdC5rZXlzKGV4cGVjdGVkKS5ldmVyeShmdW5jdGlvbihrZXkpIHtcbiAgICBsZXQgZXhwZWN0ZWRWYWx1ZSA9IGV4cGVjdGVkW2tleV07XG4gICAgbGV0IGFjdHVhbFZhbHVlID0gYWN0dWFsW2tleV07XG4gICAgaWYgKHR5cGVvZiBleHBlY3RlZFZhbHVlID09PSBcIm9iamVjdFwiICYmIGV4cGVjdGVkVmFsdWUgIT09IG51bGwgJiYgYWN0dWFsVmFsdWUgIT09IG51bGwpIHtcbiAgICAgIHJldHVybiBjb21wYXJlU3Vic2V0KGV4cGVjdGVkVmFsdWUsIGFjdHVhbFZhbHVlKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBleHBlY3RlZFZhbHVlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHJldHVybiBleHBlY3RlZFZhbHVlKGFjdHVhbFZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIGFjdHVhbFZhbHVlID09PSBleHBlY3RlZFZhbHVlO1xuICB9KTtcbn1cbl9fbmFtZShjb21wYXJlU3Vic2V0LCBcImNvbXBhcmVTdWJzZXRcIik7XG5Bc3NlcnRpb24uYWRkTWV0aG9kKFwiY29udGFpblN1YnNldFwiLCBmdW5jdGlvbihleHBlY3RlZCkge1xuICBjb25zdCBhY3R1YWwgPSBmbGFnKHRoaXMsIFwib2JqZWN0XCIpO1xuICBjb25zdCBzaG93RGlmZiA9IGNvbmZpZy5zaG93RGlmZjtcbiAgdGhpcy5hc3NlcnQoXG4gICAgY29tcGFyZVN1YnNldChleHBlY3RlZCwgYWN0dWFsKSxcbiAgICBcImV4cGVjdGVkICN7YWN0fSB0byBjb250YWluIHN1YnNldCAje2V4cH1cIixcbiAgICBcImV4cGVjdGVkICN7YWN0fSB0byBub3QgY29udGFpbiBzdWJzZXQgI3tleHB9XCIsXG4gICAgZXhwZWN0ZWQsXG4gICAgYWN0dWFsLFxuICAgIHNob3dEaWZmXG4gICk7XG59KTtcblxuLy8gbGliL2NoYWkvaW50ZXJmYWNlL2V4cGVjdC5qc1xuZnVuY3Rpb24gZXhwZWN0KHZhbCwgbWVzc2FnZSkge1xuICByZXR1cm4gbmV3IEFzc2VydGlvbih2YWwsIG1lc3NhZ2UpO1xufVxuX19uYW1lKGV4cGVjdCwgXCJleHBlY3RcIik7XG5leHBlY3QuZmFpbCA9IGZ1bmN0aW9uKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsIG9wZXJhdG9yKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIG1lc3NhZ2UgPSBhY3R1YWw7XG4gICAgYWN0dWFsID0gdm9pZCAwO1xuICB9XG4gIG1lc3NhZ2UgPSBtZXNzYWdlIHx8IFwiZXhwZWN0LmZhaWwoKVwiO1xuICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IoXG4gICAgbWVzc2FnZSxcbiAgICB7XG4gICAgICBhY3R1YWwsXG4gICAgICBleHBlY3RlZCxcbiAgICAgIG9wZXJhdG9yXG4gICAgfSxcbiAgICBleHBlY3QuZmFpbFxuICApO1xufTtcblxuLy8gbGliL2NoYWkvaW50ZXJmYWNlL3Nob3VsZC5qc1xudmFyIHNob3VsZF9leHBvcnRzID0ge307XG5fX2V4cG9ydChzaG91bGRfZXhwb3J0cywge1xuICBTaG91bGQ6ICgpID0+IFNob3VsZCxcbiAgc2hvdWxkOiAoKSA9PiBzaG91bGRcbn0pO1xuZnVuY3Rpb24gbG9hZFNob3VsZCgpIHtcbiAgZnVuY3Rpb24gc2hvdWxkR2V0dGVyKCkge1xuICAgIGlmICh0aGlzIGluc3RhbmNlb2YgU3RyaW5nIHx8IHRoaXMgaW5zdGFuY2VvZiBOdW1iZXIgfHwgdGhpcyBpbnN0YW5jZW9mIEJvb2xlYW4gfHwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHRoaXMgaW5zdGFuY2VvZiBTeW1ib2wgfHwgdHlwZW9mIEJpZ0ludCA9PT0gXCJmdW5jdGlvblwiICYmIHRoaXMgaW5zdGFuY2VvZiBCaWdJbnQpIHtcbiAgICAgIHJldHVybiBuZXcgQXNzZXJ0aW9uKHRoaXMudmFsdWVPZigpLCBudWxsLCBzaG91bGRHZXR0ZXIpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IEFzc2VydGlvbih0aGlzLCBudWxsLCBzaG91bGRHZXR0ZXIpO1xuICB9XG4gIF9fbmFtZShzaG91bGRHZXR0ZXIsIFwic2hvdWxkR2V0dGVyXCIpO1xuICBmdW5jdGlvbiBzaG91bGRTZXR0ZXIodmFsdWUpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJzaG91bGRcIiwge1xuICAgICAgdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfVxuICBfX25hbWUoc2hvdWxkU2V0dGVyLCBcInNob3VsZFNldHRlclwiKTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE9iamVjdC5wcm90b3R5cGUsIFwic2hvdWxkXCIsIHtcbiAgICBzZXQ6IHNob3VsZFNldHRlcixcbiAgICBnZXQ6IHNob3VsZEdldHRlcixcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSk7XG4gIGxldCBzaG91bGQyID0ge307XG4gIHNob3VsZDIuZmFpbCA9IGZ1bmN0aW9uKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsIG9wZXJhdG9yKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgICBtZXNzYWdlID0gYWN0dWFsO1xuICAgICAgYWN0dWFsID0gdm9pZCAwO1xuICAgIH1cbiAgICBtZXNzYWdlID0gbWVzc2FnZSB8fCBcInNob3VsZC5mYWlsKClcIjtcbiAgICB0aHJvdyBuZXcgQXNzZXJ0aW9uRXJyb3IoXG4gICAgICBtZXNzYWdlLFxuICAgICAge1xuICAgICAgICBhY3R1YWwsXG4gICAgICAgIGV4cGVjdGVkLFxuICAgICAgICBvcGVyYXRvclxuICAgICAgfSxcbiAgICAgIHNob3VsZDIuZmFpbFxuICAgICk7XG4gIH07XG4gIHNob3VsZDIuZXF1YWwgPSBmdW5jdGlvbihhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gICAgbmV3IEFzc2VydGlvbihhY3R1YWwsIG1lc3NhZ2UpLnRvLmVxdWFsKGV4cGVjdGVkKTtcbiAgfTtcbiAgc2hvdWxkMi5UaHJvdyA9IGZ1bmN0aW9uKGZuLCBlcnJ0LCBlcnJzLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKGZuLCBtc2cpLnRvLlRocm93KGVycnQsIGVycnMpO1xuICB9O1xuICBzaG91bGQyLmV4aXN0ID0gZnVuY3Rpb24odmFsLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnKS50by5leGlzdDtcbiAgfTtcbiAgc2hvdWxkMi5ub3QgPSB7fTtcbiAgc2hvdWxkMi5ub3QuZXF1YWwgPSBmdW5jdGlvbihhY3R1YWwsIGV4cGVjdGVkLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKGFjdHVhbCwgbXNnKS50by5ub3QuZXF1YWwoZXhwZWN0ZWQpO1xuICB9O1xuICBzaG91bGQyLm5vdC5UaHJvdyA9IGZ1bmN0aW9uKGZuLCBlcnJ0LCBlcnJzLCBtc2cpIHtcbiAgICBuZXcgQXNzZXJ0aW9uKGZuLCBtc2cpLnRvLm5vdC5UaHJvdyhlcnJ0LCBlcnJzKTtcbiAgfTtcbiAgc2hvdWxkMi5ub3QuZXhpc3QgPSBmdW5jdGlvbih2YWwsIG1zZykge1xuICAgIG5ldyBBc3NlcnRpb24odmFsLCBtc2cpLnRvLm5vdC5leGlzdDtcbiAgfTtcbiAgc2hvdWxkMltcInRocm93XCJdID0gc2hvdWxkMltcIlRocm93XCJdO1xuICBzaG91bGQyLm5vdFtcInRocm93XCJdID0gc2hvdWxkMi5ub3RbXCJUaHJvd1wiXTtcbiAgcmV0dXJuIHNob3VsZDI7XG59XG5fX25hbWUobG9hZFNob3VsZCwgXCJsb2FkU2hvdWxkXCIpO1xudmFyIHNob3VsZCA9IGxvYWRTaG91bGQ7XG52YXIgU2hvdWxkID0gbG9hZFNob3VsZDtcblxuLy8gbGliL2NoYWkvaW50ZXJmYWNlL2Fzc2VydC5qc1xuZnVuY3Rpb24gYXNzZXJ0KGV4cHJlc3MsIGVycm1zZykge1xuICBsZXQgdGVzdDIgPSBuZXcgQXNzZXJ0aW9uKG51bGwsIG51bGwsIGFzc2VydCwgdHJ1ZSk7XG4gIHRlc3QyLmFzc2VydChleHByZXNzLCBlcnJtc2csIFwiWyBuZWdhdGlvbiBtZXNzYWdlIHVuYXZhaWxhYmxlIF1cIik7XG59XG5fX25hbWUoYXNzZXJ0LCBcImFzc2VydFwiKTtcbmFzc2VydC5mYWlsID0gZnVuY3Rpb24oYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSwgb3BlcmF0b3IpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgbWVzc2FnZSA9IGFjdHVhbDtcbiAgICBhY3R1YWwgPSB2b2lkIDA7XG4gIH1cbiAgbWVzc2FnZSA9IG1lc3NhZ2UgfHwgXCJhc3NlcnQuZmFpbCgpXCI7XG4gIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihcbiAgICBtZXNzYWdlLFxuICAgIHtcbiAgICAgIGFjdHVhbCxcbiAgICAgIGV4cGVjdGVkLFxuICAgICAgb3BlcmF0b3JcbiAgICB9LFxuICAgIGFzc2VydC5mYWlsXG4gICk7XG59O1xuYXNzZXJ0LmlzT2sgPSBmdW5jdGlvbih2YWwsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNPaywgdHJ1ZSkuaXMub2s7XG59O1xuYXNzZXJ0LmlzTm90T2sgPSBmdW5jdGlvbih2YWwsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNOb3RPaywgdHJ1ZSkuaXMubm90Lm9rO1xufTtcbmFzc2VydC5lcXVhbCA9IGZ1bmN0aW9uKGFjdCwgZXhwLCBtc2cpIHtcbiAgbGV0IHRlc3QyID0gbmV3IEFzc2VydGlvbihhY3QsIG1zZywgYXNzZXJ0LmVxdWFsLCB0cnVlKTtcbiAgdGVzdDIuYXNzZXJ0KFxuICAgIGV4cCA9PSBmbGFnKHRlc3QyLCBcIm9iamVjdFwiKSxcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gZXF1YWwgI3tleHB9XCIsXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBlcXVhbCAje2FjdH1cIixcbiAgICBleHAsXG4gICAgYWN0LFxuICAgIHRydWVcbiAgKTtcbn07XG5hc3NlcnQubm90RXF1YWwgPSBmdW5jdGlvbihhY3QsIGV4cCwgbXNnKSB7XG4gIGxldCB0ZXN0MiA9IG5ldyBBc3NlcnRpb24oYWN0LCBtc2csIGFzc2VydC5ub3RFcXVhbCwgdHJ1ZSk7XG4gIHRlc3QyLmFzc2VydChcbiAgICBleHAgIT0gZmxhZyh0ZXN0MiwgXCJvYmplY3RcIiksXG4gICAgXCJleHBlY3RlZCAje3RoaXN9IHRvIG5vdCBlcXVhbCAje2V4cH1cIixcbiAgICBcImV4cGVjdGVkICN7dGhpc30gdG8gZXF1YWwgI3thY3R9XCIsXG4gICAgZXhwLFxuICAgIGFjdCxcbiAgICB0cnVlXG4gICk7XG59O1xuYXNzZXJ0LnN0cmljdEVxdWFsID0gZnVuY3Rpb24oYWN0LCBleHAsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKGFjdCwgbXNnLCBhc3NlcnQuc3RyaWN0RXF1YWwsIHRydWUpLnRvLmVxdWFsKGV4cCk7XG59O1xuYXNzZXJ0Lm5vdFN0cmljdEVxdWFsID0gZnVuY3Rpb24oYWN0LCBleHAsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKGFjdCwgbXNnLCBhc3NlcnQubm90U3RyaWN0RXF1YWwsIHRydWUpLnRvLm5vdC5lcXVhbChleHApO1xufTtcbmFzc2VydC5kZWVwRXF1YWwgPSBhc3NlcnQuZGVlcFN0cmljdEVxdWFsID0gZnVuY3Rpb24oYWN0LCBleHAsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKGFjdCwgbXNnLCBhc3NlcnQuZGVlcEVxdWFsLCB0cnVlKS50by5lcWwoZXhwKTtcbn07XG5hc3NlcnQubm90RGVlcEVxdWFsID0gZnVuY3Rpb24oYWN0LCBleHAsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKGFjdCwgbXNnLCBhc3NlcnQubm90RGVlcEVxdWFsLCB0cnVlKS50by5ub3QuZXFsKGV4cCk7XG59O1xuYXNzZXJ0LmlzQWJvdmUgPSBmdW5jdGlvbih2YWwsIGFidiwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc0Fib3ZlLCB0cnVlKS50by5iZS5hYm92ZShhYnYpO1xufTtcbmFzc2VydC5pc0F0TGVhc3QgPSBmdW5jdGlvbih2YWwsIGF0bHN0LCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmlzQXRMZWFzdCwgdHJ1ZSkudG8uYmUubGVhc3QoYXRsc3QpO1xufTtcbmFzc2VydC5pc0JlbG93ID0gZnVuY3Rpb24odmFsLCBibHcsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNCZWxvdywgdHJ1ZSkudG8uYmUuYmVsb3coYmx3KTtcbn07XG5hc3NlcnQuaXNBdE1vc3QgPSBmdW5jdGlvbih2YWwsIGF0bXN0LCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmlzQXRNb3N0LCB0cnVlKS50by5iZS5tb3N0KGF0bXN0KTtcbn07XG5hc3NlcnQuaXNUcnVlID0gZnVuY3Rpb24odmFsLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmlzVHJ1ZSwgdHJ1ZSkuaXNbXCJ0cnVlXCJdO1xufTtcbmFzc2VydC5pc05vdFRydWUgPSBmdW5jdGlvbih2YWwsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNOb3RUcnVlLCB0cnVlKS50by5ub3QuZXF1YWwodHJ1ZSk7XG59O1xuYXNzZXJ0LmlzRmFsc2UgPSBmdW5jdGlvbih2YWwsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNGYWxzZSwgdHJ1ZSkuaXNbXCJmYWxzZVwiXTtcbn07XG5hc3NlcnQuaXNOb3RGYWxzZSA9IGZ1bmN0aW9uKHZhbCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc05vdEZhbHNlLCB0cnVlKS50by5ub3QuZXF1YWwoZmFsc2UpO1xufTtcbmFzc2VydC5pc051bGwgPSBmdW5jdGlvbih2YWwsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNOdWxsLCB0cnVlKS50by5lcXVhbChudWxsKTtcbn07XG5hc3NlcnQuaXNOb3ROdWxsID0gZnVuY3Rpb24odmFsLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmlzTm90TnVsbCwgdHJ1ZSkudG8ubm90LmVxdWFsKG51bGwpO1xufTtcbmFzc2VydC5pc05hTiA9IGZ1bmN0aW9uKHZhbCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc05hTiwgdHJ1ZSkudG8uYmUuTmFOO1xufTtcbmFzc2VydC5pc05vdE5hTiA9IGZ1bmN0aW9uKHZhbHVlLCBtZXNzYWdlKSB7XG4gIG5ldyBBc3NlcnRpb24odmFsdWUsIG1lc3NhZ2UsIGFzc2VydC5pc05vdE5hTiwgdHJ1ZSkubm90LnRvLmJlLk5hTjtcbn07XG5hc3NlcnQuZXhpc3RzID0gZnVuY3Rpb24odmFsLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmV4aXN0cywgdHJ1ZSkudG8uZXhpc3Q7XG59O1xuYXNzZXJ0Lm5vdEV4aXN0cyA9IGZ1bmN0aW9uKHZhbCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5ub3RFeGlzdHMsIHRydWUpLnRvLm5vdC5leGlzdDtcbn07XG5hc3NlcnQuaXNVbmRlZmluZWQgPSBmdW5jdGlvbih2YWwsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNVbmRlZmluZWQsIHRydWUpLnRvLmVxdWFsKHZvaWQgMCk7XG59O1xuYXNzZXJ0LmlzRGVmaW5lZCA9IGZ1bmN0aW9uKHZhbCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc0RlZmluZWQsIHRydWUpLnRvLm5vdC5lcXVhbCh2b2lkIDApO1xufTtcbmFzc2VydC5pc0NhbGxhYmxlID0gZnVuY3Rpb24odmFsdWUsIG1lc3NhZ2UpIHtcbiAgbmV3IEFzc2VydGlvbih2YWx1ZSwgbWVzc2FnZSwgYXNzZXJ0LmlzQ2FsbGFibGUsIHRydWUpLmlzLmNhbGxhYmxlO1xufTtcbmFzc2VydC5pc05vdENhbGxhYmxlID0gZnVuY3Rpb24odmFsdWUsIG1lc3NhZ2UpIHtcbiAgbmV3IEFzc2VydGlvbih2YWx1ZSwgbWVzc2FnZSwgYXNzZXJ0LmlzTm90Q2FsbGFibGUsIHRydWUpLmlzLm5vdC5jYWxsYWJsZTtcbn07XG5hc3NlcnQuaXNPYmplY3QgPSBmdW5jdGlvbih2YWwsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNPYmplY3QsIHRydWUpLnRvLmJlLmEoXCJvYmplY3RcIik7XG59O1xuYXNzZXJ0LmlzTm90T2JqZWN0ID0gZnVuY3Rpb24odmFsLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmlzTm90T2JqZWN0LCB0cnVlKS50by5ub3QuYmUuYShcIm9iamVjdFwiKTtcbn07XG5hc3NlcnQuaXNBcnJheSA9IGZ1bmN0aW9uKHZhbCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc0FycmF5LCB0cnVlKS50by5iZS5hbihcImFycmF5XCIpO1xufTtcbmFzc2VydC5pc05vdEFycmF5ID0gZnVuY3Rpb24odmFsLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmlzTm90QXJyYXksIHRydWUpLnRvLm5vdC5iZS5hbihcImFycmF5XCIpO1xufTtcbmFzc2VydC5pc1N0cmluZyA9IGZ1bmN0aW9uKHZhbCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc1N0cmluZywgdHJ1ZSkudG8uYmUuYShcInN0cmluZ1wiKTtcbn07XG5hc3NlcnQuaXNOb3RTdHJpbmcgPSBmdW5jdGlvbih2YWwsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNOb3RTdHJpbmcsIHRydWUpLnRvLm5vdC5iZS5hKFwic3RyaW5nXCIpO1xufTtcbmFzc2VydC5pc051bWJlciA9IGZ1bmN0aW9uKHZhbCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc051bWJlciwgdHJ1ZSkudG8uYmUuYShcIm51bWJlclwiKTtcbn07XG5hc3NlcnQuaXNOb3ROdW1iZXIgPSBmdW5jdGlvbih2YWwsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNOb3ROdW1iZXIsIHRydWUpLnRvLm5vdC5iZS5hKFwibnVtYmVyXCIpO1xufTtcbmFzc2VydC5pc051bWVyaWMgPSBmdW5jdGlvbih2YWwsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNOdW1lcmljLCB0cnVlKS5pcy5udW1lcmljO1xufTtcbmFzc2VydC5pc05vdE51bWVyaWMgPSBmdW5jdGlvbih2YWwsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNOb3ROdW1lcmljLCB0cnVlKS5pcy5ub3QubnVtZXJpYztcbn07XG5hc3NlcnQuaXNGaW5pdGUgPSBmdW5jdGlvbih2YWwsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQuaXNGaW5pdGUsIHRydWUpLnRvLmJlLmZpbml0ZTtcbn07XG5hc3NlcnQuaXNCb29sZWFuID0gZnVuY3Rpb24odmFsLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmlzQm9vbGVhbiwgdHJ1ZSkudG8uYmUuYShcImJvb2xlYW5cIik7XG59O1xuYXNzZXJ0LmlzTm90Qm9vbGVhbiA9IGZ1bmN0aW9uKHZhbCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pc05vdEJvb2xlYW4sIHRydWUpLnRvLm5vdC5iZS5hKFwiYm9vbGVhblwiKTtcbn07XG5hc3NlcnQudHlwZU9mID0gZnVuY3Rpb24odmFsLCB0eXBlMywgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC50eXBlT2YsIHRydWUpLnRvLmJlLmEodHlwZTMpO1xufTtcbmFzc2VydC5ub3RUeXBlT2YgPSBmdW5jdGlvbih2YWx1ZSwgdHlwZTMsIG1lc3NhZ2UpIHtcbiAgbmV3IEFzc2VydGlvbih2YWx1ZSwgbWVzc2FnZSwgYXNzZXJ0Lm5vdFR5cGVPZiwgdHJ1ZSkudG8ubm90LmJlLmEodHlwZTMpO1xufTtcbmFzc2VydC5pbnN0YW5jZU9mID0gZnVuY3Rpb24odmFsLCB0eXBlMywgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24odmFsLCBtc2csIGFzc2VydC5pbnN0YW5jZU9mLCB0cnVlKS50by5iZS5pbnN0YW5jZU9mKHR5cGUzKTtcbn07XG5hc3NlcnQubm90SW5zdGFuY2VPZiA9IGZ1bmN0aW9uKHZhbCwgdHlwZTMsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKHZhbCwgbXNnLCBhc3NlcnQubm90SW5zdGFuY2VPZiwgdHJ1ZSkudG8ubm90LmJlLmluc3RhbmNlT2YoXG4gICAgdHlwZTNcbiAgKTtcbn07XG5hc3NlcnQuaW5jbHVkZSA9IGZ1bmN0aW9uKGV4cCwgaW5jLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihleHAsIG1zZywgYXNzZXJ0LmluY2x1ZGUsIHRydWUpLmluY2x1ZGUoaW5jKTtcbn07XG5hc3NlcnQubm90SW5jbHVkZSA9IGZ1bmN0aW9uKGV4cCwgaW5jLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihleHAsIG1zZywgYXNzZXJ0Lm5vdEluY2x1ZGUsIHRydWUpLm5vdC5pbmNsdWRlKGluYyk7XG59O1xuYXNzZXJ0LmRlZXBJbmNsdWRlID0gZnVuY3Rpb24oZXhwLCBpbmMsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKGV4cCwgbXNnLCBhc3NlcnQuZGVlcEluY2x1ZGUsIHRydWUpLmRlZXAuaW5jbHVkZShpbmMpO1xufTtcbmFzc2VydC5ub3REZWVwSW5jbHVkZSA9IGZ1bmN0aW9uKGV4cCwgaW5jLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihleHAsIG1zZywgYXNzZXJ0Lm5vdERlZXBJbmNsdWRlLCB0cnVlKS5ub3QuZGVlcC5pbmNsdWRlKGluYyk7XG59O1xuYXNzZXJ0Lm5lc3RlZEluY2x1ZGUgPSBmdW5jdGlvbihleHAsIGluYywgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oZXhwLCBtc2csIGFzc2VydC5uZXN0ZWRJbmNsdWRlLCB0cnVlKS5uZXN0ZWQuaW5jbHVkZShpbmMpO1xufTtcbmFzc2VydC5ub3ROZXN0ZWRJbmNsdWRlID0gZnVuY3Rpb24oZXhwLCBpbmMsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKGV4cCwgbXNnLCBhc3NlcnQubm90TmVzdGVkSW5jbHVkZSwgdHJ1ZSkubm90Lm5lc3RlZC5pbmNsdWRlKFxuICAgIGluY1xuICApO1xufTtcbmFzc2VydC5kZWVwTmVzdGVkSW5jbHVkZSA9IGZ1bmN0aW9uKGV4cCwgaW5jLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihleHAsIG1zZywgYXNzZXJ0LmRlZXBOZXN0ZWRJbmNsdWRlLCB0cnVlKS5kZWVwLm5lc3RlZC5pbmNsdWRlKFxuICAgIGluY1xuICApO1xufTtcbmFzc2VydC5ub3REZWVwTmVzdGVkSW5jbHVkZSA9IGZ1bmN0aW9uKGV4cCwgaW5jLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihcbiAgICBleHAsXG4gICAgbXNnLFxuICAgIGFzc2VydC5ub3REZWVwTmVzdGVkSW5jbHVkZSxcbiAgICB0cnVlXG4gICkubm90LmRlZXAubmVzdGVkLmluY2x1ZGUoaW5jKTtcbn07XG5hc3NlcnQub3duSW5jbHVkZSA9IGZ1bmN0aW9uKGV4cCwgaW5jLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihleHAsIG1zZywgYXNzZXJ0Lm93bkluY2x1ZGUsIHRydWUpLm93bi5pbmNsdWRlKGluYyk7XG59O1xuYXNzZXJ0Lm5vdE93bkluY2x1ZGUgPSBmdW5jdGlvbihleHAsIGluYywgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oZXhwLCBtc2csIGFzc2VydC5ub3RPd25JbmNsdWRlLCB0cnVlKS5ub3Qub3duLmluY2x1ZGUoaW5jKTtcbn07XG5hc3NlcnQuZGVlcE93bkluY2x1ZGUgPSBmdW5jdGlvbihleHAsIGluYywgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oZXhwLCBtc2csIGFzc2VydC5kZWVwT3duSW5jbHVkZSwgdHJ1ZSkuZGVlcC5vd24uaW5jbHVkZShpbmMpO1xufTtcbmFzc2VydC5ub3REZWVwT3duSW5jbHVkZSA9IGZ1bmN0aW9uKGV4cCwgaW5jLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihleHAsIG1zZywgYXNzZXJ0Lm5vdERlZXBPd25JbmNsdWRlLCB0cnVlKS5ub3QuZGVlcC5vd24uaW5jbHVkZShcbiAgICBpbmNcbiAgKTtcbn07XG5hc3NlcnQubWF0Y2ggPSBmdW5jdGlvbihleHAsIHJlLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihleHAsIG1zZywgYXNzZXJ0Lm1hdGNoLCB0cnVlKS50by5tYXRjaChyZSk7XG59O1xuYXNzZXJ0Lm5vdE1hdGNoID0gZnVuY3Rpb24oZXhwLCByZSwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oZXhwLCBtc2csIGFzc2VydC5ub3RNYXRjaCwgdHJ1ZSkudG8ubm90Lm1hdGNoKHJlKTtcbn07XG5hc3NlcnQucHJvcGVydHkgPSBmdW5jdGlvbihvYmosIHByb3AsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnLCBhc3NlcnQucHJvcGVydHksIHRydWUpLnRvLmhhdmUucHJvcGVydHkocHJvcCk7XG59O1xuYXNzZXJ0Lm5vdFByb3BlcnR5ID0gZnVuY3Rpb24ob2JqLCBwcm9wLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihvYmosIG1zZywgYXNzZXJ0Lm5vdFByb3BlcnR5LCB0cnVlKS50by5ub3QuaGF2ZS5wcm9wZXJ0eShwcm9wKTtcbn07XG5hc3NlcnQucHJvcGVydHlWYWwgPSBmdW5jdGlvbihvYmosIHByb3AsIHZhbCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24ob2JqLCBtc2csIGFzc2VydC5wcm9wZXJ0eVZhbCwgdHJ1ZSkudG8uaGF2ZS5wcm9wZXJ0eShwcm9wLCB2YWwpO1xufTtcbmFzc2VydC5ub3RQcm9wZXJ0eVZhbCA9IGZ1bmN0aW9uKG9iaiwgcHJvcCwgdmFsLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihvYmosIG1zZywgYXNzZXJ0Lm5vdFByb3BlcnR5VmFsLCB0cnVlKS50by5ub3QuaGF2ZS5wcm9wZXJ0eShcbiAgICBwcm9wLFxuICAgIHZhbFxuICApO1xufTtcbmFzc2VydC5kZWVwUHJvcGVydHlWYWwgPSBmdW5jdGlvbihvYmosIHByb3AsIHZhbCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24ob2JqLCBtc2csIGFzc2VydC5kZWVwUHJvcGVydHlWYWwsIHRydWUpLnRvLmhhdmUuZGVlcC5wcm9wZXJ0eShcbiAgICBwcm9wLFxuICAgIHZhbFxuICApO1xufTtcbmFzc2VydC5ub3REZWVwUHJvcGVydHlWYWwgPSBmdW5jdGlvbihvYmosIHByb3AsIHZhbCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oXG4gICAgb2JqLFxuICAgIG1zZyxcbiAgICBhc3NlcnQubm90RGVlcFByb3BlcnR5VmFsLFxuICAgIHRydWVcbiAgKS50by5ub3QuaGF2ZS5kZWVwLnByb3BlcnR5KHByb3AsIHZhbCk7XG59O1xuYXNzZXJ0Lm93blByb3BlcnR5ID0gZnVuY3Rpb24ob2JqLCBwcm9wLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihvYmosIG1zZywgYXNzZXJ0Lm93blByb3BlcnR5LCB0cnVlKS50by5oYXZlLm93bi5wcm9wZXJ0eShwcm9wKTtcbn07XG5hc3NlcnQubm90T3duUHJvcGVydHkgPSBmdW5jdGlvbihvYmosIHByb3AsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnLCBhc3NlcnQubm90T3duUHJvcGVydHksIHRydWUpLnRvLm5vdC5oYXZlLm93bi5wcm9wZXJ0eShcbiAgICBwcm9wXG4gICk7XG59O1xuYXNzZXJ0Lm93blByb3BlcnR5VmFsID0gZnVuY3Rpb24ob2JqLCBwcm9wLCB2YWx1ZSwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24ob2JqLCBtc2csIGFzc2VydC5vd25Qcm9wZXJ0eVZhbCwgdHJ1ZSkudG8uaGF2ZS5vd24ucHJvcGVydHkoXG4gICAgcHJvcCxcbiAgICB2YWx1ZVxuICApO1xufTtcbmFzc2VydC5ub3RPd25Qcm9wZXJ0eVZhbCA9IGZ1bmN0aW9uKG9iaiwgcHJvcCwgdmFsdWUsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKFxuICAgIG9iaixcbiAgICBtc2csXG4gICAgYXNzZXJ0Lm5vdE93blByb3BlcnR5VmFsLFxuICAgIHRydWVcbiAgKS50by5ub3QuaGF2ZS5vd24ucHJvcGVydHkocHJvcCwgdmFsdWUpO1xufTtcbmFzc2VydC5kZWVwT3duUHJvcGVydHlWYWwgPSBmdW5jdGlvbihvYmosIHByb3AsIHZhbHVlLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihcbiAgICBvYmosXG4gICAgbXNnLFxuICAgIGFzc2VydC5kZWVwT3duUHJvcGVydHlWYWwsXG4gICAgdHJ1ZVxuICApLnRvLmhhdmUuZGVlcC5vd24ucHJvcGVydHkocHJvcCwgdmFsdWUpO1xufTtcbmFzc2VydC5ub3REZWVwT3duUHJvcGVydHlWYWwgPSBmdW5jdGlvbihvYmosIHByb3AsIHZhbHVlLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihcbiAgICBvYmosXG4gICAgbXNnLFxuICAgIGFzc2VydC5ub3REZWVwT3duUHJvcGVydHlWYWwsXG4gICAgdHJ1ZVxuICApLnRvLm5vdC5oYXZlLmRlZXAub3duLnByb3BlcnR5KHByb3AsIHZhbHVlKTtcbn07XG5hc3NlcnQubmVzdGVkUHJvcGVydHkgPSBmdW5jdGlvbihvYmosIHByb3AsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnLCBhc3NlcnQubmVzdGVkUHJvcGVydHksIHRydWUpLnRvLmhhdmUubmVzdGVkLnByb3BlcnR5KFxuICAgIHByb3BcbiAgKTtcbn07XG5hc3NlcnQubm90TmVzdGVkUHJvcGVydHkgPSBmdW5jdGlvbihvYmosIHByb3AsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKFxuICAgIG9iaixcbiAgICBtc2csXG4gICAgYXNzZXJ0Lm5vdE5lc3RlZFByb3BlcnR5LFxuICAgIHRydWVcbiAgKS50by5ub3QuaGF2ZS5uZXN0ZWQucHJvcGVydHkocHJvcCk7XG59O1xuYXNzZXJ0Lm5lc3RlZFByb3BlcnR5VmFsID0gZnVuY3Rpb24ob2JqLCBwcm9wLCB2YWwsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKFxuICAgIG9iaixcbiAgICBtc2csXG4gICAgYXNzZXJ0Lm5lc3RlZFByb3BlcnR5VmFsLFxuICAgIHRydWVcbiAgKS50by5oYXZlLm5lc3RlZC5wcm9wZXJ0eShwcm9wLCB2YWwpO1xufTtcbmFzc2VydC5ub3ROZXN0ZWRQcm9wZXJ0eVZhbCA9IGZ1bmN0aW9uKG9iaiwgcHJvcCwgdmFsLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihcbiAgICBvYmosXG4gICAgbXNnLFxuICAgIGFzc2VydC5ub3ROZXN0ZWRQcm9wZXJ0eVZhbCxcbiAgICB0cnVlXG4gICkudG8ubm90LmhhdmUubmVzdGVkLnByb3BlcnR5KHByb3AsIHZhbCk7XG59O1xuYXNzZXJ0LmRlZXBOZXN0ZWRQcm9wZXJ0eVZhbCA9IGZ1bmN0aW9uKG9iaiwgcHJvcCwgdmFsLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihcbiAgICBvYmosXG4gICAgbXNnLFxuICAgIGFzc2VydC5kZWVwTmVzdGVkUHJvcGVydHlWYWwsXG4gICAgdHJ1ZVxuICApLnRvLmhhdmUuZGVlcC5uZXN0ZWQucHJvcGVydHkocHJvcCwgdmFsKTtcbn07XG5hc3NlcnQubm90RGVlcE5lc3RlZFByb3BlcnR5VmFsID0gZnVuY3Rpb24ob2JqLCBwcm9wLCB2YWwsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKFxuICAgIG9iaixcbiAgICBtc2csXG4gICAgYXNzZXJ0Lm5vdERlZXBOZXN0ZWRQcm9wZXJ0eVZhbCxcbiAgICB0cnVlXG4gICkudG8ubm90LmhhdmUuZGVlcC5uZXN0ZWQucHJvcGVydHkocHJvcCwgdmFsKTtcbn07XG5hc3NlcnQubGVuZ3RoT2YgPSBmdW5jdGlvbihleHAsIGxlbiwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oZXhwLCBtc2csIGFzc2VydC5sZW5ndGhPZiwgdHJ1ZSkudG8uaGF2ZS5sZW5ndGhPZihsZW4pO1xufTtcbmFzc2VydC5oYXNBbnlLZXlzID0gZnVuY3Rpb24ob2JqLCBrZXlzLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihvYmosIG1zZywgYXNzZXJ0Lmhhc0FueUtleXMsIHRydWUpLnRvLmhhdmUuYW55LmtleXMoa2V5cyk7XG59O1xuYXNzZXJ0Lmhhc0FsbEtleXMgPSBmdW5jdGlvbihvYmosIGtleXMsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnLCBhc3NlcnQuaGFzQWxsS2V5cywgdHJ1ZSkudG8uaGF2ZS5hbGwua2V5cyhrZXlzKTtcbn07XG5hc3NlcnQuY29udGFpbnNBbGxLZXlzID0gZnVuY3Rpb24ob2JqLCBrZXlzLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihvYmosIG1zZywgYXNzZXJ0LmNvbnRhaW5zQWxsS2V5cywgdHJ1ZSkudG8uY29udGFpbi5hbGwua2V5cyhcbiAgICBrZXlzXG4gICk7XG59O1xuYXNzZXJ0LmRvZXNOb3RIYXZlQW55S2V5cyA9IGZ1bmN0aW9uKG9iaiwga2V5cywgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24ob2JqLCBtc2csIGFzc2VydC5kb2VzTm90SGF2ZUFueUtleXMsIHRydWUpLnRvLm5vdC5oYXZlLmFueS5rZXlzKFxuICAgIGtleXNcbiAgKTtcbn07XG5hc3NlcnQuZG9lc05vdEhhdmVBbGxLZXlzID0gZnVuY3Rpb24ob2JqLCBrZXlzLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihvYmosIG1zZywgYXNzZXJ0LmRvZXNOb3RIYXZlQWxsS2V5cywgdHJ1ZSkudG8ubm90LmhhdmUuYWxsLmtleXMoXG4gICAga2V5c1xuICApO1xufTtcbmFzc2VydC5oYXNBbnlEZWVwS2V5cyA9IGZ1bmN0aW9uKG9iaiwga2V5cywgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24ob2JqLCBtc2csIGFzc2VydC5oYXNBbnlEZWVwS2V5cywgdHJ1ZSkudG8uaGF2ZS5hbnkuZGVlcC5rZXlzKFxuICAgIGtleXNcbiAgKTtcbn07XG5hc3NlcnQuaGFzQWxsRGVlcEtleXMgPSBmdW5jdGlvbihvYmosIGtleXMsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnLCBhc3NlcnQuaGFzQWxsRGVlcEtleXMsIHRydWUpLnRvLmhhdmUuYWxsLmRlZXAua2V5cyhcbiAgICBrZXlzXG4gICk7XG59O1xuYXNzZXJ0LmNvbnRhaW5zQWxsRGVlcEtleXMgPSBmdW5jdGlvbihvYmosIGtleXMsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKFxuICAgIG9iaixcbiAgICBtc2csXG4gICAgYXNzZXJ0LmNvbnRhaW5zQWxsRGVlcEtleXMsXG4gICAgdHJ1ZVxuICApLnRvLmNvbnRhaW4uYWxsLmRlZXAua2V5cyhrZXlzKTtcbn07XG5hc3NlcnQuZG9lc05vdEhhdmVBbnlEZWVwS2V5cyA9IGZ1bmN0aW9uKG9iaiwga2V5cywgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oXG4gICAgb2JqLFxuICAgIG1zZyxcbiAgICBhc3NlcnQuZG9lc05vdEhhdmVBbnlEZWVwS2V5cyxcbiAgICB0cnVlXG4gICkudG8ubm90LmhhdmUuYW55LmRlZXAua2V5cyhrZXlzKTtcbn07XG5hc3NlcnQuZG9lc05vdEhhdmVBbGxEZWVwS2V5cyA9IGZ1bmN0aW9uKG9iaiwga2V5cywgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oXG4gICAgb2JqLFxuICAgIG1zZyxcbiAgICBhc3NlcnQuZG9lc05vdEhhdmVBbGxEZWVwS2V5cyxcbiAgICB0cnVlXG4gICkudG8ubm90LmhhdmUuYWxsLmRlZXAua2V5cyhrZXlzKTtcbn07XG5hc3NlcnQudGhyb3dzID0gZnVuY3Rpb24oZm4sIGVycm9yTGlrZSwgZXJyTXNnTWF0Y2hlciwgbXNnKSB7XG4gIGlmIChcInN0cmluZ1wiID09PSB0eXBlb2YgZXJyb3JMaWtlIHx8IGVycm9yTGlrZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgIGVyck1zZ01hdGNoZXIgPSBlcnJvckxpa2U7XG4gICAgZXJyb3JMaWtlID0gbnVsbDtcbiAgfVxuICBsZXQgYXNzZXJ0RXJyID0gbmV3IEFzc2VydGlvbihmbiwgbXNnLCBhc3NlcnQudGhyb3dzLCB0cnVlKS50by50aHJvdyhcbiAgICBlcnJvckxpa2UsXG4gICAgZXJyTXNnTWF0Y2hlclxuICApO1xuICByZXR1cm4gZmxhZyhhc3NlcnRFcnIsIFwib2JqZWN0XCIpO1xufTtcbmFzc2VydC5kb2VzTm90VGhyb3cgPSBmdW5jdGlvbihmbiwgZXJyb3JMaWtlLCBlcnJNc2dNYXRjaGVyLCBtZXNzYWdlKSB7XG4gIGlmIChcInN0cmluZ1wiID09PSB0eXBlb2YgZXJyb3JMaWtlIHx8IGVycm9yTGlrZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgIGVyck1zZ01hdGNoZXIgPSBlcnJvckxpa2U7XG4gICAgZXJyb3JMaWtlID0gbnVsbDtcbiAgfVxuICBuZXcgQXNzZXJ0aW9uKGZuLCBtZXNzYWdlLCBhc3NlcnQuZG9lc05vdFRocm93LCB0cnVlKS50by5ub3QudGhyb3coXG4gICAgZXJyb3JMaWtlLFxuICAgIGVyck1zZ01hdGNoZXJcbiAgKTtcbn07XG5hc3NlcnQub3BlcmF0b3IgPSBmdW5jdGlvbih2YWwsIG9wZXJhdG9yLCB2YWwyLCBtc2cpIHtcbiAgbGV0IG9rO1xuICBzd2l0Y2ggKG9wZXJhdG9yKSB7XG4gICAgY2FzZSBcIj09XCI6XG4gICAgICBvayA9IHZhbCA9PSB2YWwyO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIj09PVwiOlxuICAgICAgb2sgPSB2YWwgPT09IHZhbDI7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiPlwiOlxuICAgICAgb2sgPSB2YWwgPiB2YWwyO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIj49XCI6XG4gICAgICBvayA9IHZhbCA+PSB2YWwyO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIjxcIjpcbiAgICAgIG9rID0gdmFsIDwgdmFsMjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCI8PVwiOlxuICAgICAgb2sgPSB2YWwgPD0gdmFsMjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCIhPVwiOlxuICAgICAgb2sgPSB2YWwgIT0gdmFsMjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCIhPT1cIjpcbiAgICAgIG9rID0gdmFsICE9PSB2YWwyO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIG1zZyA9IG1zZyA/IG1zZyArIFwiOiBcIiA6IG1zZztcbiAgICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihcbiAgICAgICAgbXNnICsgJ0ludmFsaWQgb3BlcmF0b3IgXCInICsgb3BlcmF0b3IgKyAnXCInLFxuICAgICAgICB2b2lkIDAsXG4gICAgICAgIGFzc2VydC5vcGVyYXRvclxuICAgICAgKTtcbiAgfVxuICBsZXQgdGVzdDIgPSBuZXcgQXNzZXJ0aW9uKG9rLCBtc2csIGFzc2VydC5vcGVyYXRvciwgdHJ1ZSk7XG4gIHRlc3QyLmFzc2VydChcbiAgICB0cnVlID09PSBmbGFnKHRlc3QyLCBcIm9iamVjdFwiKSxcbiAgICBcImV4cGVjdGVkIFwiICsgaW5zcGVjdDIodmFsKSArIFwiIHRvIGJlIFwiICsgb3BlcmF0b3IgKyBcIiBcIiArIGluc3BlY3QyKHZhbDIpLFxuICAgIFwiZXhwZWN0ZWQgXCIgKyBpbnNwZWN0Mih2YWwpICsgXCIgdG8gbm90IGJlIFwiICsgb3BlcmF0b3IgKyBcIiBcIiArIGluc3BlY3QyKHZhbDIpXG4gICk7XG59O1xuYXNzZXJ0LmNsb3NlVG8gPSBmdW5jdGlvbihhY3QsIGV4cCwgZGVsdGEsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKGFjdCwgbXNnLCBhc3NlcnQuY2xvc2VUbywgdHJ1ZSkudG8uYmUuY2xvc2VUbyhleHAsIGRlbHRhKTtcbn07XG5hc3NlcnQuYXBwcm94aW1hdGVseSA9IGZ1bmN0aW9uKGFjdCwgZXhwLCBkZWx0YSwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oYWN0LCBtc2csIGFzc2VydC5hcHByb3hpbWF0ZWx5LCB0cnVlKS50by5iZS5hcHByb3hpbWF0ZWx5KFxuICAgIGV4cCxcbiAgICBkZWx0YVxuICApO1xufTtcbmFzc2VydC5zYW1lTWVtYmVycyA9IGZ1bmN0aW9uKHNldDEsIHNldDIsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKHNldDEsIG1zZywgYXNzZXJ0LnNhbWVNZW1iZXJzLCB0cnVlKS50by5oYXZlLnNhbWUubWVtYmVycyhzZXQyKTtcbn07XG5hc3NlcnQubm90U2FtZU1lbWJlcnMgPSBmdW5jdGlvbihzZXQxLCBzZXQyLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihcbiAgICBzZXQxLFxuICAgIG1zZyxcbiAgICBhc3NlcnQubm90U2FtZU1lbWJlcnMsXG4gICAgdHJ1ZVxuICApLnRvLm5vdC5oYXZlLnNhbWUubWVtYmVycyhzZXQyKTtcbn07XG5hc3NlcnQuc2FtZURlZXBNZW1iZXJzID0gZnVuY3Rpb24oc2V0MSwgc2V0MiwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oXG4gICAgc2V0MSxcbiAgICBtc2csXG4gICAgYXNzZXJ0LnNhbWVEZWVwTWVtYmVycyxcbiAgICB0cnVlXG4gICkudG8uaGF2ZS5zYW1lLmRlZXAubWVtYmVycyhzZXQyKTtcbn07XG5hc3NlcnQubm90U2FtZURlZXBNZW1iZXJzID0gZnVuY3Rpb24oc2V0MSwgc2V0MiwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oXG4gICAgc2V0MSxcbiAgICBtc2csXG4gICAgYXNzZXJ0Lm5vdFNhbWVEZWVwTWVtYmVycyxcbiAgICB0cnVlXG4gICkudG8ubm90LmhhdmUuc2FtZS5kZWVwLm1lbWJlcnMoc2V0Mik7XG59O1xuYXNzZXJ0LnNhbWVPcmRlcmVkTWVtYmVycyA9IGZ1bmN0aW9uKHNldDEsIHNldDIsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKFxuICAgIHNldDEsXG4gICAgbXNnLFxuICAgIGFzc2VydC5zYW1lT3JkZXJlZE1lbWJlcnMsXG4gICAgdHJ1ZVxuICApLnRvLmhhdmUuc2FtZS5vcmRlcmVkLm1lbWJlcnMoc2V0Mik7XG59O1xuYXNzZXJ0Lm5vdFNhbWVPcmRlcmVkTWVtYmVycyA9IGZ1bmN0aW9uKHNldDEsIHNldDIsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKFxuICAgIHNldDEsXG4gICAgbXNnLFxuICAgIGFzc2VydC5ub3RTYW1lT3JkZXJlZE1lbWJlcnMsXG4gICAgdHJ1ZVxuICApLnRvLm5vdC5oYXZlLnNhbWUub3JkZXJlZC5tZW1iZXJzKHNldDIpO1xufTtcbmFzc2VydC5zYW1lRGVlcE9yZGVyZWRNZW1iZXJzID0gZnVuY3Rpb24oc2V0MSwgc2V0MiwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oXG4gICAgc2V0MSxcbiAgICBtc2csXG4gICAgYXNzZXJ0LnNhbWVEZWVwT3JkZXJlZE1lbWJlcnMsXG4gICAgdHJ1ZVxuICApLnRvLmhhdmUuc2FtZS5kZWVwLm9yZGVyZWQubWVtYmVycyhzZXQyKTtcbn07XG5hc3NlcnQubm90U2FtZURlZXBPcmRlcmVkTWVtYmVycyA9IGZ1bmN0aW9uKHNldDEsIHNldDIsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKFxuICAgIHNldDEsXG4gICAgbXNnLFxuICAgIGFzc2VydC5ub3RTYW1lRGVlcE9yZGVyZWRNZW1iZXJzLFxuICAgIHRydWVcbiAgKS50by5ub3QuaGF2ZS5zYW1lLmRlZXAub3JkZXJlZC5tZW1iZXJzKHNldDIpO1xufTtcbmFzc2VydC5pbmNsdWRlTWVtYmVycyA9IGZ1bmN0aW9uKHN1cGVyc2V0LCBzdWJzZXQsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKHN1cGVyc2V0LCBtc2csIGFzc2VydC5pbmNsdWRlTWVtYmVycywgdHJ1ZSkudG8uaW5jbHVkZS5tZW1iZXJzKFxuICAgIHN1YnNldFxuICApO1xufTtcbmFzc2VydC5ub3RJbmNsdWRlTWVtYmVycyA9IGZ1bmN0aW9uKHN1cGVyc2V0LCBzdWJzZXQsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKFxuICAgIHN1cGVyc2V0LFxuICAgIG1zZyxcbiAgICBhc3NlcnQubm90SW5jbHVkZU1lbWJlcnMsXG4gICAgdHJ1ZVxuICApLnRvLm5vdC5pbmNsdWRlLm1lbWJlcnMoc3Vic2V0KTtcbn07XG5hc3NlcnQuaW5jbHVkZURlZXBNZW1iZXJzID0gZnVuY3Rpb24oc3VwZXJzZXQsIHN1YnNldCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oXG4gICAgc3VwZXJzZXQsXG4gICAgbXNnLFxuICAgIGFzc2VydC5pbmNsdWRlRGVlcE1lbWJlcnMsXG4gICAgdHJ1ZVxuICApLnRvLmluY2x1ZGUuZGVlcC5tZW1iZXJzKHN1YnNldCk7XG59O1xuYXNzZXJ0Lm5vdEluY2x1ZGVEZWVwTWVtYmVycyA9IGZ1bmN0aW9uKHN1cGVyc2V0LCBzdWJzZXQsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKFxuICAgIHN1cGVyc2V0LFxuICAgIG1zZyxcbiAgICBhc3NlcnQubm90SW5jbHVkZURlZXBNZW1iZXJzLFxuICAgIHRydWVcbiAgKS50by5ub3QuaW5jbHVkZS5kZWVwLm1lbWJlcnMoc3Vic2V0KTtcbn07XG5hc3NlcnQuaW5jbHVkZU9yZGVyZWRNZW1iZXJzID0gZnVuY3Rpb24oc3VwZXJzZXQsIHN1YnNldCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oXG4gICAgc3VwZXJzZXQsXG4gICAgbXNnLFxuICAgIGFzc2VydC5pbmNsdWRlT3JkZXJlZE1lbWJlcnMsXG4gICAgdHJ1ZVxuICApLnRvLmluY2x1ZGUub3JkZXJlZC5tZW1iZXJzKHN1YnNldCk7XG59O1xuYXNzZXJ0Lm5vdEluY2x1ZGVPcmRlcmVkTWVtYmVycyA9IGZ1bmN0aW9uKHN1cGVyc2V0LCBzdWJzZXQsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKFxuICAgIHN1cGVyc2V0LFxuICAgIG1zZyxcbiAgICBhc3NlcnQubm90SW5jbHVkZU9yZGVyZWRNZW1iZXJzLFxuICAgIHRydWVcbiAgKS50by5ub3QuaW5jbHVkZS5vcmRlcmVkLm1lbWJlcnMoc3Vic2V0KTtcbn07XG5hc3NlcnQuaW5jbHVkZURlZXBPcmRlcmVkTWVtYmVycyA9IGZ1bmN0aW9uKHN1cGVyc2V0LCBzdWJzZXQsIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKFxuICAgIHN1cGVyc2V0LFxuICAgIG1zZyxcbiAgICBhc3NlcnQuaW5jbHVkZURlZXBPcmRlcmVkTWVtYmVycyxcbiAgICB0cnVlXG4gICkudG8uaW5jbHVkZS5kZWVwLm9yZGVyZWQubWVtYmVycyhzdWJzZXQpO1xufTtcbmFzc2VydC5ub3RJbmNsdWRlRGVlcE9yZGVyZWRNZW1iZXJzID0gZnVuY3Rpb24oc3VwZXJzZXQsIHN1YnNldCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oXG4gICAgc3VwZXJzZXQsXG4gICAgbXNnLFxuICAgIGFzc2VydC5ub3RJbmNsdWRlRGVlcE9yZGVyZWRNZW1iZXJzLFxuICAgIHRydWVcbiAgKS50by5ub3QuaW5jbHVkZS5kZWVwLm9yZGVyZWQubWVtYmVycyhzdWJzZXQpO1xufTtcbmFzc2VydC5vbmVPZiA9IGZ1bmN0aW9uKGluTGlzdCwgbGlzdCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24oaW5MaXN0LCBtc2csIGFzc2VydC5vbmVPZiwgdHJ1ZSkudG8uYmUub25lT2YobGlzdCk7XG59O1xuYXNzZXJ0LmlzSXRlcmFibGUgPSBmdW5jdGlvbihvYmosIG1zZykge1xuICBpZiAob2JqID09IHZvaWQgMCB8fCAhb2JqW1N5bWJvbC5pdGVyYXRvcl0pIHtcbiAgICBtc2cgPSBtc2cgPyBgJHttc2d9IGV4cGVjdGVkICR7aW5zcGVjdDIob2JqKX0gdG8gYmUgYW4gaXRlcmFibGVgIDogYGV4cGVjdGVkICR7aW5zcGVjdDIob2JqKX0gdG8gYmUgYW4gaXRlcmFibGVgO1xuICAgIHRocm93IG5ldyBBc3NlcnRpb25FcnJvcihtc2csIHZvaWQgMCwgYXNzZXJ0LmlzSXRlcmFibGUpO1xuICB9XG59O1xuYXNzZXJ0LmNoYW5nZXMgPSBmdW5jdGlvbihmbiwgb2JqLCBwcm9wLCBtc2cpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMgJiYgdHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgbXNnID0gcHJvcDtcbiAgICBwcm9wID0gbnVsbDtcbiAgfVxuICBuZXcgQXNzZXJ0aW9uKGZuLCBtc2csIGFzc2VydC5jaGFuZ2VzLCB0cnVlKS50by5jaGFuZ2Uob2JqLCBwcm9wKTtcbn07XG5hc3NlcnQuY2hhbmdlc0J5ID0gZnVuY3Rpb24oZm4sIG9iaiwgcHJvcCwgZGVsdGEsIG1zZykge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gNCAmJiB0eXBlb2Ygb2JqID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBsZXQgdG1wTXNnID0gZGVsdGE7XG4gICAgZGVsdGEgPSBwcm9wO1xuICAgIG1zZyA9IHRtcE1zZztcbiAgfSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzKSB7XG4gICAgZGVsdGEgPSBwcm9wO1xuICAgIHByb3AgPSBudWxsO1xuICB9XG4gIG5ldyBBc3NlcnRpb24oZm4sIG1zZywgYXNzZXJ0LmNoYW5nZXNCeSwgdHJ1ZSkudG8uY2hhbmdlKG9iaiwgcHJvcCkuYnkoZGVsdGEpO1xufTtcbmFzc2VydC5kb2VzTm90Q2hhbmdlID0gZnVuY3Rpb24oZm4sIG9iaiwgcHJvcCwgbXNnKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzICYmIHR5cGVvZiBvYmogPT09IFwiZnVuY3Rpb25cIikge1xuICAgIG1zZyA9IHByb3A7XG4gICAgcHJvcCA9IG51bGw7XG4gIH1cbiAgcmV0dXJuIG5ldyBBc3NlcnRpb24oZm4sIG1zZywgYXNzZXJ0LmRvZXNOb3RDaGFuZ2UsIHRydWUpLnRvLm5vdC5jaGFuZ2UoXG4gICAgb2JqLFxuICAgIHByb3BcbiAgKTtcbn07XG5hc3NlcnQuY2hhbmdlc0J1dE5vdEJ5ID0gZnVuY3Rpb24oZm4sIG9iaiwgcHJvcCwgZGVsdGEsIG1zZykge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gNCAmJiB0eXBlb2Ygb2JqID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBsZXQgdG1wTXNnID0gZGVsdGE7XG4gICAgZGVsdGEgPSBwcm9wO1xuICAgIG1zZyA9IHRtcE1zZztcbiAgfSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzKSB7XG4gICAgZGVsdGEgPSBwcm9wO1xuICAgIHByb3AgPSBudWxsO1xuICB9XG4gIG5ldyBBc3NlcnRpb24oZm4sIG1zZywgYXNzZXJ0LmNoYW5nZXNCdXROb3RCeSwgdHJ1ZSkudG8uY2hhbmdlKG9iaiwgcHJvcCkuYnV0Lm5vdC5ieShkZWx0YSk7XG59O1xuYXNzZXJ0LmluY3JlYXNlcyA9IGZ1bmN0aW9uKGZuLCBvYmosIHByb3AsIG1zZykge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMyAmJiB0eXBlb2Ygb2JqID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBtc2cgPSBwcm9wO1xuICAgIHByb3AgPSBudWxsO1xuICB9XG4gIHJldHVybiBuZXcgQXNzZXJ0aW9uKGZuLCBtc2csIGFzc2VydC5pbmNyZWFzZXMsIHRydWUpLnRvLmluY3JlYXNlKG9iaiwgcHJvcCk7XG59O1xuYXNzZXJ0LmluY3JlYXNlc0J5ID0gZnVuY3Rpb24oZm4sIG9iaiwgcHJvcCwgZGVsdGEsIG1zZykge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gNCAmJiB0eXBlb2Ygb2JqID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBsZXQgdG1wTXNnID0gZGVsdGE7XG4gICAgZGVsdGEgPSBwcm9wO1xuICAgIG1zZyA9IHRtcE1zZztcbiAgfSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzKSB7XG4gICAgZGVsdGEgPSBwcm9wO1xuICAgIHByb3AgPSBudWxsO1xuICB9XG4gIG5ldyBBc3NlcnRpb24oZm4sIG1zZywgYXNzZXJ0LmluY3JlYXNlc0J5LCB0cnVlKS50by5pbmNyZWFzZShvYmosIHByb3ApLmJ5KGRlbHRhKTtcbn07XG5hc3NlcnQuZG9lc05vdEluY3JlYXNlID0gZnVuY3Rpb24oZm4sIG9iaiwgcHJvcCwgbXNnKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzICYmIHR5cGVvZiBvYmogPT09IFwiZnVuY3Rpb25cIikge1xuICAgIG1zZyA9IHByb3A7XG4gICAgcHJvcCA9IG51bGw7XG4gIH1cbiAgcmV0dXJuIG5ldyBBc3NlcnRpb24oZm4sIG1zZywgYXNzZXJ0LmRvZXNOb3RJbmNyZWFzZSwgdHJ1ZSkudG8ubm90LmluY3JlYXNlKFxuICAgIG9iaixcbiAgICBwcm9wXG4gICk7XG59O1xuYXNzZXJ0LmluY3JlYXNlc0J1dE5vdEJ5ID0gZnVuY3Rpb24oZm4sIG9iaiwgcHJvcCwgZGVsdGEsIG1zZykge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gNCAmJiB0eXBlb2Ygb2JqID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBsZXQgdG1wTXNnID0gZGVsdGE7XG4gICAgZGVsdGEgPSBwcm9wO1xuICAgIG1zZyA9IHRtcE1zZztcbiAgfSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzKSB7XG4gICAgZGVsdGEgPSBwcm9wO1xuICAgIHByb3AgPSBudWxsO1xuICB9XG4gIG5ldyBBc3NlcnRpb24oZm4sIG1zZywgYXNzZXJ0LmluY3JlYXNlc0J1dE5vdEJ5LCB0cnVlKS50by5pbmNyZWFzZShvYmosIHByb3ApLmJ1dC5ub3QuYnkoZGVsdGEpO1xufTtcbmFzc2VydC5kZWNyZWFzZXMgPSBmdW5jdGlvbihmbiwgb2JqLCBwcm9wLCBtc2cpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMgJiYgdHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgbXNnID0gcHJvcDtcbiAgICBwcm9wID0gbnVsbDtcbiAgfVxuICByZXR1cm4gbmV3IEFzc2VydGlvbihmbiwgbXNnLCBhc3NlcnQuZGVjcmVhc2VzLCB0cnVlKS50by5kZWNyZWFzZShvYmosIHByb3ApO1xufTtcbmFzc2VydC5kZWNyZWFzZXNCeSA9IGZ1bmN0aW9uKGZuLCBvYmosIHByb3AsIGRlbHRhLCBtc2cpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDQgJiYgdHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgbGV0IHRtcE1zZyA9IGRlbHRhO1xuICAgIGRlbHRhID0gcHJvcDtcbiAgICBtc2cgPSB0bXBNc2c7XG4gIH0gZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMykge1xuICAgIGRlbHRhID0gcHJvcDtcbiAgICBwcm9wID0gbnVsbDtcbiAgfVxuICBuZXcgQXNzZXJ0aW9uKGZuLCBtc2csIGFzc2VydC5kZWNyZWFzZXNCeSwgdHJ1ZSkudG8uZGVjcmVhc2Uob2JqLCBwcm9wKS5ieShkZWx0YSk7XG59O1xuYXNzZXJ0LmRvZXNOb3REZWNyZWFzZSA9IGZ1bmN0aW9uKGZuLCBvYmosIHByb3AsIG1zZykge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMyAmJiB0eXBlb2Ygb2JqID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBtc2cgPSBwcm9wO1xuICAgIHByb3AgPSBudWxsO1xuICB9XG4gIHJldHVybiBuZXcgQXNzZXJ0aW9uKGZuLCBtc2csIGFzc2VydC5kb2VzTm90RGVjcmVhc2UsIHRydWUpLnRvLm5vdC5kZWNyZWFzZShcbiAgICBvYmosXG4gICAgcHJvcFxuICApO1xufTtcbmFzc2VydC5kb2VzTm90RGVjcmVhc2VCeSA9IGZ1bmN0aW9uKGZuLCBvYmosIHByb3AsIGRlbHRhLCBtc2cpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDQgJiYgdHlwZW9mIG9iaiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgbGV0IHRtcE1zZyA9IGRlbHRhO1xuICAgIGRlbHRhID0gcHJvcDtcbiAgICBtc2cgPSB0bXBNc2c7XG4gIH0gZWxzZSBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMykge1xuICAgIGRlbHRhID0gcHJvcDtcbiAgICBwcm9wID0gbnVsbDtcbiAgfVxuICByZXR1cm4gbmV3IEFzc2VydGlvbihmbiwgbXNnLCBhc3NlcnQuZG9lc05vdERlY3JlYXNlQnksIHRydWUpLnRvLm5vdC5kZWNyZWFzZShvYmosIHByb3ApLmJ5KGRlbHRhKTtcbn07XG5hc3NlcnQuZGVjcmVhc2VzQnV0Tm90QnkgPSBmdW5jdGlvbihmbiwgb2JqLCBwcm9wLCBkZWx0YSwgbXNnKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSA0ICYmIHR5cGVvZiBvYmogPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGxldCB0bXBNc2cgPSBkZWx0YTtcbiAgICBkZWx0YSA9IHByb3A7XG4gICAgbXNnID0gdG1wTXNnO1xuICB9IGVsc2UgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMpIHtcbiAgICBkZWx0YSA9IHByb3A7XG4gICAgcHJvcCA9IG51bGw7XG4gIH1cbiAgbmV3IEFzc2VydGlvbihmbiwgbXNnLCBhc3NlcnQuZGVjcmVhc2VzQnV0Tm90QnksIHRydWUpLnRvLmRlY3JlYXNlKG9iaiwgcHJvcCkuYnV0Lm5vdC5ieShkZWx0YSk7XG59O1xuYXNzZXJ0LmlmRXJyb3IgPSBmdW5jdGlvbih2YWwpIHtcbiAgaWYgKHZhbCkge1xuICAgIHRocm93IHZhbDtcbiAgfVxufTtcbmFzc2VydC5pc0V4dGVuc2libGUgPSBmdW5jdGlvbihvYmosIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnLCBhc3NlcnQuaXNFeHRlbnNpYmxlLCB0cnVlKS50by5iZS5leHRlbnNpYmxlO1xufTtcbmFzc2VydC5pc05vdEV4dGVuc2libGUgPSBmdW5jdGlvbihvYmosIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnLCBhc3NlcnQuaXNOb3RFeHRlbnNpYmxlLCB0cnVlKS50by5ub3QuYmUuZXh0ZW5zaWJsZTtcbn07XG5hc3NlcnQuaXNTZWFsZWQgPSBmdW5jdGlvbihvYmosIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnLCBhc3NlcnQuaXNTZWFsZWQsIHRydWUpLnRvLmJlLnNlYWxlZDtcbn07XG5hc3NlcnQuaXNOb3RTZWFsZWQgPSBmdW5jdGlvbihvYmosIG1zZykge1xuICBuZXcgQXNzZXJ0aW9uKG9iaiwgbXNnLCBhc3NlcnQuaXNOb3RTZWFsZWQsIHRydWUpLnRvLm5vdC5iZS5zZWFsZWQ7XG59O1xuYXNzZXJ0LmlzRnJvemVuID0gZnVuY3Rpb24ob2JqLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihvYmosIG1zZywgYXNzZXJ0LmlzRnJvemVuLCB0cnVlKS50by5iZS5mcm96ZW47XG59O1xuYXNzZXJ0LmlzTm90RnJvemVuID0gZnVuY3Rpb24ob2JqLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbihvYmosIG1zZywgYXNzZXJ0LmlzTm90RnJvemVuLCB0cnVlKS50by5ub3QuYmUuZnJvemVuO1xufTtcbmFzc2VydC5pc0VtcHR5ID0gZnVuY3Rpb24odmFsLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmlzRW1wdHksIHRydWUpLnRvLmJlLmVtcHR5O1xufTtcbmFzc2VydC5pc05vdEVtcHR5ID0gZnVuY3Rpb24odmFsLCBtc2cpIHtcbiAgbmV3IEFzc2VydGlvbih2YWwsIG1zZywgYXNzZXJ0LmlzTm90RW1wdHksIHRydWUpLnRvLm5vdC5iZS5lbXB0eTtcbn07XG5hc3NlcnQuY29udGFpbnNTdWJzZXQgPSBmdW5jdGlvbih2YWwsIGV4cCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24odmFsLCBtc2cpLnRvLmNvbnRhaW5TdWJzZXQoZXhwKTtcbn07XG5hc3NlcnQuZG9lc05vdENvbnRhaW5TdWJzZXQgPSBmdW5jdGlvbih2YWwsIGV4cCwgbXNnKSB7XG4gIG5ldyBBc3NlcnRpb24odmFsLCBtc2cpLnRvLm5vdC5jb250YWluU3Vic2V0KGV4cCk7XG59O1xudmFyIGFsaWFzZXMgPSBbXG4gIFtcImlzT2tcIiwgXCJva1wiXSxcbiAgW1wiaXNOb3RPa1wiLCBcIm5vdE9rXCJdLFxuICBbXCJ0aHJvd3NcIiwgXCJ0aHJvd1wiXSxcbiAgW1widGhyb3dzXCIsIFwiVGhyb3dcIl0sXG4gIFtcImlzRXh0ZW5zaWJsZVwiLCBcImV4dGVuc2libGVcIl0sXG4gIFtcImlzTm90RXh0ZW5zaWJsZVwiLCBcIm5vdEV4dGVuc2libGVcIl0sXG4gIFtcImlzU2VhbGVkXCIsIFwic2VhbGVkXCJdLFxuICBbXCJpc05vdFNlYWxlZFwiLCBcIm5vdFNlYWxlZFwiXSxcbiAgW1wiaXNGcm96ZW5cIiwgXCJmcm96ZW5cIl0sXG4gIFtcImlzTm90RnJvemVuXCIsIFwibm90RnJvemVuXCJdLFxuICBbXCJpc0VtcHR5XCIsIFwiZW1wdHlcIl0sXG4gIFtcImlzTm90RW1wdHlcIiwgXCJub3RFbXB0eVwiXSxcbiAgW1wiaXNDYWxsYWJsZVwiLCBcImlzRnVuY3Rpb25cIl0sXG4gIFtcImlzTm90Q2FsbGFibGVcIiwgXCJpc05vdEZ1bmN0aW9uXCJdLFxuICBbXCJjb250YWluc1N1YnNldFwiLCBcImNvbnRhaW5TdWJzZXRcIl1cbl07XG5mb3IgKGNvbnN0IFtuYW1lLCBhc10gb2YgYWxpYXNlcykge1xuICBhc3NlcnRbYXNdID0gYXNzZXJ0W25hbWVdO1xufVxuXG4vLyBsaWIvY2hhaS5qc1xudmFyIHVzZWQgPSBbXTtcbmZ1bmN0aW9uIHVzZShmbikge1xuICBjb25zdCBleHBvcnRzID0ge1xuICAgIHVzZSxcbiAgICBBc3NlcnRpb25FcnJvcixcbiAgICB1dGlsOiB1dGlsc19leHBvcnRzLFxuICAgIGNvbmZpZyxcbiAgICBleHBlY3QsXG4gICAgYXNzZXJ0LFxuICAgIEFzc2VydGlvbixcbiAgICAuLi5zaG91bGRfZXhwb3J0c1xuICB9O1xuICBpZiAoIX51c2VkLmluZGV4T2YoZm4pKSB7XG4gICAgZm4oZXhwb3J0cywgdXRpbHNfZXhwb3J0cyk7XG4gICAgdXNlZC5wdXNoKGZuKTtcbiAgfVxuICByZXR1cm4gZXhwb3J0cztcbn1cbl9fbmFtZSh1c2UsIFwidXNlXCIpO1xuZXhwb3J0IHtcbiAgQXNzZXJ0aW9uLFxuICBBc3NlcnRpb25FcnJvcixcbiAgU2hvdWxkLFxuICBhc3NlcnQsXG4gIGNvbmZpZyxcbiAgZXhwZWN0LFxuICBzaG91bGQsXG4gIHVzZSxcbiAgdXRpbHNfZXhwb3J0cyBhcyB1dGlsXG59O1xuLyohXG4gKiBDaGFpIC0gZmxhZyB1dGlsaXR5XG4gKiBDb3B5cmlnaHQoYykgMjAxMi0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cbi8qIVxuICogQ2hhaSAtIHRlc3QgdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG4vKiFcbiAqIENoYWkgLSBleHBlY3RUeXBlcyB1dGlsaXR5XG4gKiBDb3B5cmlnaHQoYykgMjAxMi0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cbi8qIVxuICogQ2hhaSAtIGdldEFjdHVhbCB1dGlsaXR5XG4gKiBDb3B5cmlnaHQoYykgMjAxMi0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cbi8qIVxuICogQ2hhaSAtIG1lc3NhZ2UgY29tcG9zaXRpb24gdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG4vKiFcbiAqIENoYWkgLSB0cmFuc2ZlckZsYWdzIHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuLyohXG4gKiBjaGFpXG4gKiBodHRwOi8vY2hhaWpzLmNvbVxuICogQ29weXJpZ2h0KGMpIDIwMTEtMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG4vKiFcbiAqIENoYWkgLSBpc1Byb3h5RW5hYmxlZCBoZWxwZXJcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuLyohXG4gKiBDaGFpIC0gYWRkUHJvcGVydHkgdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG4vKiFcbiAqIENoYWkgLSBhZGRMZW5ndGhHdWFyZCB1dGlsaXR5XG4gKiBDb3B5cmlnaHQoYykgMjAxMi0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cbi8qIVxuICogQ2hhaSAtIGdldFByb3BlcnRpZXMgdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG4vKiFcbiAqIENoYWkgLSBwcm94aWZ5IHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuLyohXG4gKiBDaGFpIC0gYWRkTWV0aG9kIHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDEyLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuLyohXG4gKiBDaGFpIC0gb3ZlcndyaXRlUHJvcGVydHkgdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG4vKiFcbiAqIENoYWkgLSBvdmVyd3JpdGVNZXRob2QgdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNCBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG4vKiFcbiAqIENoYWkgLSBhZGRDaGFpbmluZ01ldGhvZCB1dGlsaXR5XG4gKiBDb3B5cmlnaHQoYykgMjAxMi0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cbi8qIVxuICogQ2hhaSAtIG92ZXJ3cml0ZUNoYWluYWJsZU1ldGhvZCB1dGlsaXR5XG4gKiBDb3B5cmlnaHQoYykgMjAxMi0yMDE0IEpha2UgTHVlciA8amFrZUBhbG9naWNhbHBhcmFkb3guY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cbi8qIVxuICogQ2hhaSAtIGNvbXBhcmVCeUluc3BlY3QgdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTEtMjAxNiBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG4vKiFcbiAqIENoYWkgLSBnZXRPd25FbnVtZXJhYmxlUHJvcGVydHlTeW1ib2xzIHV0aWxpdHlcbiAqIENvcHlyaWdodChjKSAyMDExLTIwMTYgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuLyohXG4gKiBDaGFpIC0gZ2V0T3duRW51bWVyYWJsZVByb3BlcnRpZXMgdXRpbGl0eVxuICogQ29weXJpZ2h0KGMpIDIwMTEtMjAxNiBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG4vKiFcbiAqIENoYWkgLSBpc05hTiB1dGlsaXR5XG4gKiBDb3B5cmlnaHQoYykgMjAxMi0yMDE1IFNha3RoaXByaXlhbiBWYWlyYW1hbmkgPHRoZWNoYXJnaW5ndm9sY2Fub0BnbWFpbC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuLyohXG4gKiBjaGFpXG4gKiBDb3B5cmlnaHQoYykgMjAxMSBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG4vKiFcbiAqIGNoYWlcbiAqIENvcHlyaWdodChjKSAyMDExLTIwMTQgSmFrZSBMdWVyIDxqYWtlQGFsb2dpY2FscGFyYWRveC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuLyohIEJ1bmRsZWQgbGljZW5zZSBpbmZvcm1hdGlvbjpcblxuZGVlcC1lcWwvaW5kZXguanM6XG4gICgqIVxuICAgKiBkZWVwLWVxbFxuICAgKiBDb3B5cmlnaHQoYykgMjAxMyBKYWtlIEx1ZXIgPGpha2VAYWxvZ2ljYWxwYXJhZG94LmNvbT5cbiAgICogTUlUIExpY2Vuc2VkXG4gICAqKVxuICAoKiFcbiAgICogQ2hlY2sgdG8gc2VlIGlmIHRoZSBNZW1vaXplTWFwIGhhcyByZWNvcmRlZCBhIHJlc3VsdCBvZiB0aGUgdHdvIG9wZXJhbmRzXG4gICAqXG4gICAqIEBwYXJhbSB7TWl4ZWR9IGxlZnRIYW5kT3BlcmFuZFxuICAgKiBAcGFyYW0ge01peGVkfSByaWdodEhhbmRPcGVyYW5kXG4gICAqIEBwYXJhbSB7TWVtb2l6ZU1hcH0gbWVtb2l6ZU1hcFxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbnxudWxsfSByZXN1bHRcbiAgKilcbiAgKCohXG4gICAqIFNldCB0aGUgcmVzdWx0IG9mIHRoZSBlcXVhbGl0eSBpbnRvIHRoZSBNZW1vaXplTWFwXG4gICAqXG4gICAqIEBwYXJhbSB7TWl4ZWR9IGxlZnRIYW5kT3BlcmFuZFxuICAgKiBAcGFyYW0ge01peGVkfSByaWdodEhhbmRPcGVyYW5kXG4gICAqIEBwYXJhbSB7TWVtb2l6ZU1hcH0gbWVtb2l6ZU1hcFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IHJlc3VsdFxuICAqKVxuICAoKiFcbiAgICogUHJpbWFyeSBFeHBvcnRcbiAgICopXG4gICgqIVxuICAgKiBUaGUgbWFpbiBsb2dpYyBvZiB0aGUgYGRlZXBFcXVhbGAgZnVuY3Rpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7TWl4ZWR9IGxlZnRIYW5kT3BlcmFuZFxuICAgKiBAcGFyYW0ge01peGVkfSByaWdodEhhbmRPcGVyYW5kXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gKG9wdGlvbmFsKSBBZGRpdGlvbmFsIG9wdGlvbnNcbiAgICogQHBhcmFtIHtBcnJheX0gW29wdGlvbnMuY29tcGFyYXRvcl0gKG9wdGlvbmFsKSBPdmVycmlkZSBkZWZhdWx0IGFsZ29yaXRobSwgZGV0ZXJtaW5pbmcgY3VzdG9tIGVxdWFsaXR5LlxuICAgKiBAcGFyYW0ge0FycmF5fSBbb3B0aW9ucy5tZW1vaXplXSAob3B0aW9uYWwpIFByb3ZpZGUgYSBjdXN0b20gbWVtb2l6YXRpb24gb2JqZWN0IHdoaWNoIHdpbGwgY2FjaGUgdGhlIHJlc3VsdHMgb2ZcbiAgICAgIGNvbXBsZXggb2JqZWN0cyBmb3IgYSBzcGVlZCBib29zdC4gQnkgcGFzc2luZyBgZmFsc2VgIHlvdSBjYW4gZGlzYWJsZSBtZW1vaXphdGlvbiwgYnV0IHRoaXMgd2lsbCBjYXVzZSBjaXJjdWxhclxuICAgICAgcmVmZXJlbmNlcyB0byBibG93IHRoZSBzdGFjay5cbiAgICogQHJldHVybiB7Qm9vbGVhbn0gZXF1YWwgbWF0Y2hcbiAgKilcbiAgKCohXG4gICAqIENvbXBhcmUgdHdvIFJlZ3VsYXIgRXhwcmVzc2lvbnMgZm9yIGVxdWFsaXR5LlxuICAgKlxuICAgKiBAcGFyYW0ge1JlZ0V4cH0gbGVmdEhhbmRPcGVyYW5kXG4gICAqIEBwYXJhbSB7UmVnRXhwfSByaWdodEhhbmRPcGVyYW5kXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59IHJlc3VsdFxuICAgKilcbiAgKCohXG4gICAqIENvbXBhcmUgdHdvIFNldHMvTWFwcyBmb3IgZXF1YWxpdHkuIEZhc3RlciB0aGFuIG90aGVyIGVxdWFsaXR5IGZ1bmN0aW9ucy5cbiAgICpcbiAgICogQHBhcmFtIHtTZXR9IGxlZnRIYW5kT3BlcmFuZFxuICAgKiBAcGFyYW0ge1NldH0gcmlnaHRIYW5kT3BlcmFuZFxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIChPcHRpb25hbClcbiAgICogQHJldHVybiB7Qm9vbGVhbn0gcmVzdWx0XG4gICAqKVxuICAoKiFcbiAgICogU2ltcGxlIGVxdWFsaXR5IGZvciBmbGF0IGl0ZXJhYmxlIG9iamVjdHMgc3VjaCBhcyBBcnJheXMsIFR5cGVkQXJyYXlzIG9yIE5vZGUuanMgYnVmZmVycy5cbiAgICpcbiAgICogQHBhcmFtIHtJdGVyYWJsZX0gbGVmdEhhbmRPcGVyYW5kXG4gICAqIEBwYXJhbSB7SXRlcmFibGV9IHJpZ2h0SGFuZE9wZXJhbmRcbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAoT3B0aW9uYWwpXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59IHJlc3VsdFxuICAgKilcbiAgKCohXG4gICAqIFNpbXBsZSBlcXVhbGl0eSBmb3IgZ2VuZXJhdG9yIG9iamVjdHMgc3VjaCBhcyB0aG9zZSByZXR1cm5lZCBieSBnZW5lcmF0b3IgZnVuY3Rpb25zLlxuICAgKlxuICAgKiBAcGFyYW0ge0l0ZXJhYmxlfSBsZWZ0SGFuZE9wZXJhbmRcbiAgICogQHBhcmFtIHtJdGVyYWJsZX0gcmlnaHRIYW5kT3BlcmFuZFxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIChPcHRpb25hbClcbiAgICogQHJldHVybiB7Qm9vbGVhbn0gcmVzdWx0XG4gICAqKVxuICAoKiFcbiAgICogRGV0ZXJtaW5lIGlmIHRoZSBnaXZlbiBvYmplY3QgaGFzIGFuIEBAaXRlcmF0b3IgZnVuY3Rpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRcbiAgICogQHJldHVybiB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBvYmplY3QgaGFzIGFuIEBAaXRlcmF0b3IgZnVuY3Rpb24uXG4gICAqKVxuICAoKiFcbiAgICogR2V0cyBhbGwgaXRlcmF0b3IgZW50cmllcyBmcm9tIHRoZSBnaXZlbiBPYmplY3QuIElmIHRoZSBPYmplY3QgaGFzIG5vIEBAaXRlcmF0b3IgZnVuY3Rpb24sIHJldHVybnMgYW4gZW1wdHkgYXJyYXkuXG4gICAqIFRoaXMgd2lsbCBjb25zdW1lIHRoZSBpdGVyYXRvciAtIHdoaWNoIGNvdWxkIGhhdmUgc2lkZSBlZmZlY3RzIGRlcGVuZGluZyBvbiB0aGUgQEBpdGVyYXRvciBpbXBsZW1lbnRhdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHRhcmdldFxuICAgKiBAcmV0dXJucyB7QXJyYXl9IGFuIGFycmF5IG9mIGVudHJpZXMgZnJvbSB0aGUgQEBpdGVyYXRvciBmdW5jdGlvblxuICAgKilcbiAgKCohXG4gICAqIEdldHMgYWxsIGVudHJpZXMgZnJvbSBhIEdlbmVyYXRvci4gVGhpcyB3aWxsIGNvbnN1bWUgdGhlIGdlbmVyYXRvciAtIHdoaWNoIGNvdWxkIGhhdmUgc2lkZSBlZmZlY3RzLlxuICAgKlxuICAgKiBAcGFyYW0ge0dlbmVyYXRvcn0gdGFyZ2V0XG4gICAqIEByZXR1cm5zIHtBcnJheX0gYW4gYXJyYXkgb2YgZW50cmllcyBmcm9tIHRoZSBHZW5lcmF0b3IuXG4gICAqKVxuICAoKiFcbiAgICogR2V0cyBhbGwgb3duIGFuZCBpbmhlcml0ZWQgZW51bWVyYWJsZSBrZXlzIGZyb20gYSB0YXJnZXQuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRcbiAgICogQHJldHVybnMge0FycmF5fSBhbiBhcnJheSBvZiBvd24gYW5kIGluaGVyaXRlZCBlbnVtZXJhYmxlIGtleXMgZnJvbSB0aGUgdGFyZ2V0LlxuICAgKilcbiAgKCohXG4gICAqIERldGVybWluZXMgaWYgdHdvIG9iamVjdHMgaGF2ZSBtYXRjaGluZyB2YWx1ZXMsIGdpdmVuIGEgc2V0IG9mIGtleXMuIERlZmVycyB0byBkZWVwRXF1YWwgZm9yIHRoZSBlcXVhbGl0eSBjaGVjayBvZlxuICAgKiBlYWNoIGtleS4gSWYgYW55IHZhbHVlIG9mIHRoZSBnaXZlbiBrZXkgaXMgbm90IGVxdWFsLCB0aGUgZnVuY3Rpb24gd2lsbCByZXR1cm4gZmFsc2UgKGVhcmx5KS5cbiAgICpcbiAgICogQHBhcmFtIHtNaXhlZH0gbGVmdEhhbmRPcGVyYW5kXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHJpZ2h0SGFuZE9wZXJhbmRcbiAgICogQHBhcmFtIHtBcnJheX0ga2V5cyBBbiBhcnJheSBvZiBrZXlzIHRvIGNvbXBhcmUgdGhlIHZhbHVlcyBvZiBsZWZ0SGFuZE9wZXJhbmQgYW5kIHJpZ2h0SGFuZE9wZXJhbmQgYWdhaW5zdFxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIChPcHRpb25hbClcbiAgICogQHJldHVybiB7Qm9vbGVhbn0gcmVzdWx0XG4gICAqKVxuICAoKiFcbiAgICogUmVjdXJzaXZlbHkgY2hlY2sgdGhlIGVxdWFsaXR5IG9mIHR3byBPYmplY3RzLiBPbmNlIGJhc2ljIHNhbWVuZXNzIGhhcyBiZWVuIGVzdGFibGlzaGVkIGl0IHdpbGwgZGVmZXIgdG8gYGRlZXBFcXVhbGBcbiAgICogZm9yIGVhY2ggZW51bWVyYWJsZSBrZXkgaW4gdGhlIG9iamVjdC5cbiAgICpcbiAgICogQHBhcmFtIHtNaXhlZH0gbGVmdEhhbmRPcGVyYW5kXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHJpZ2h0SGFuZE9wZXJhbmRcbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAoT3B0aW9uYWwpXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59IHJlc3VsdFxuICAgKilcbiAgKCohXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgYXJndW1lbnQgaXMgYSBwcmltaXRpdmUuXG4gICAqXG4gICAqIFRoaXMgaW50ZW50aW9uYWxseSByZXR1cm5zIHRydWUgZm9yIGFsbCBvYmplY3RzIHRoYXQgY2FuIGJlIGNvbXBhcmVkIGJ5IHJlZmVyZW5jZSxcbiAgICogaW5jbHVkaW5nIGZ1bmN0aW9ucyBhbmQgc3ltYm9scy5cbiAgICpcbiAgICogQHBhcmFtIHtNaXhlZH0gdmFsdWVcbiAgICogQHJldHVybiB7Qm9vbGVhbn0gcmVzdWx0XG4gICAqKVxuKi9cbiIsICJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1DaGFwdGVyLmpzLm1hcCIsICJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1DaGFwdGVyRGV0YWlscy5qcy5tYXAiLCAiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Q29va2llLmpzLm1hcCIsICJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1EaXNjb3ZlclNlY3Rpb25JdGVtLmpzLm1hcCIsICJleHBvcnQgZW51bSBEaXNjb3ZlclNlY3Rpb25UeXBlIHtcbiAgZmVhdHVyZWQgPSAwLFxuICBzaW1wbGVDYXJvdXNlbCA9IDEsXG4gIHByb21pbmVudENhcm91c2VsID0gMixcbiAgY2hhcHRlclVwZGF0ZXMgPSAzLFxuICBnZW5yZXMgPSA0LFxufVxuIiwgImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUhvbWVTZWN0aW9uLmpzLm1hcCIsICJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1NYW5nYUluZm8uanMubWFwIiwgImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPU1hbmdhUHJvZ3Jlc3MuanMubWFwIiwgImV4cG9ydCBpbnRlcmZhY2UgUGFnZWRSZXN1bHRzPFQ+IHtcbiAgaXRlbXM6IFRbXVxuICAvLy8gU2V0IHRoaXMgdG8gdW5kZWZpbmVkIHRvIHRlbGwgdGhlIGFwcCB0aGF0IHRoZXJlIGFyZSBubyBtb3JlIGl0ZW1zXG4gIG1ldGFkYXRhPzogdW5rbm93blxufVxuXG5leHBvcnQgY29uc3QgRW5kT2ZQYWdlUmVzdWx0czogUGFnZWRSZXN1bHRzPG5ldmVyPiA9IE9iamVjdC5mcmVlemUoe1xuICBpdGVtczogW10sXG4gIG1ldGFkYXRhOiB1bmRlZmluZWQsXG59KVxuIiwgImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVBCQ2FudmFzLmpzLm1hcCIsICJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1QQkltYWdlLmpzLm1hcCIsICJpbXBvcnQgeyB0eXBlIFJlc3BvbnNlIH0gZnJvbSAnLi9SZXNwb25zZS5qcydcblxuZXhwb3J0IHR5cGUgUmVxdWVzdCA9IHtcbiAgdXJsOiBzdHJpbmdcbiAgbWV0aG9kOiBzdHJpbmdcbiAgaGVhZGVycz86IFJlY29yZDxzdHJpbmcsIHN0cmluZz5cbiAgYm9keT86IEFycmF5QnVmZmVyIHwgb2JqZWN0IHwgc3RyaW5nXG4gIGNvb2tpZXM/OiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+XG59XG5cbmV4cG9ydCB0eXBlIFJlcXVlc3RJbnRlcmNlcHRvciA9IChyZXF1ZXN0OiBSZXF1ZXN0KSA9PiBQcm9taXNlPFJlcXVlc3Q+XG5cbi8qKlxuICogQHBhcmFtIHByb3Bvc2VkUmVxdWVzdCBUaGUgYFJlcXVlc3RgIHRvIHRoZSBuZXcgbG9jYXRpb24gc3BlY2lmaWVkIGJ5IHRoZSByZWRpcmVjdCByZXNwb25zZS5cbiAqIEBwYXJhbSByZWRpcmVjdGVkUmVzcG9uc2UgVGhlIGBSZXNwb25zZWAgY29udGFpbmluZyB0aGUgc2VydmVyJ3MgcmVzcG9uc2UgdG8gdGhlIG9yaWdpbmFsIHJlcXVlc3QuXG4gKiBAcmV0dXJucyBSZXR1cm4gdGhlIHByb3Bvc2VkIHJlcXVlc3Qgb3IgYSBtb2RpZmllZCByZXF1ZXN0IHRvIGZvbGxvdyB0aGUgcmVkaXJlY3QsIG9yIHVuZGVmaW5lZCB0byBjYW5jZWwgdGhlIHJlZGlyZWN0XG4gKi9cbmV4cG9ydCB0eXBlIFJlZGlyZWN0SGFuZGxlciA9IChcbiAgcHJvcG9zZWRSZXF1ZXN0OiBSZXF1ZXN0LFxuICByZWRpcmVjdGVkUmVzcG9uc2U6IFJlc3BvbnNlXG4pID0+IFByb21pc2U8UmVxdWVzdCB8IHVuZGVmaW5lZD5cbiIsICJpbXBvcnQgeyB0eXBlIFJlcXVlc3QgfSBmcm9tICcuL1JlcXVlc3QuanMnXG5pbXBvcnQgeyB0eXBlIENvb2tpZSB9IGZyb20gJy4vQ29va2llLmpzJ1xuXG5leHBvcnQgdHlwZSBSZXNwb25zZSA9IHtcbiAgcmVhZG9ubHkgdXJsOiBzdHJpbmdcbiAgcmVhZG9ubHkgaGVhZGVyczogUmVjb3JkPHN0cmluZywgc3RyaW5nPlxuICByZWFkb25seSBzdGF0dXM6IG51bWJlclxuICByZWFkb25seSBtaW1lVHlwZT86IHN0cmluZ1xuXG4gIC8vLyBUaGlzIGlzIG9ubHkgdGhlIG5ldyBjb29raWVzIHNldCB2aWEgdGhlIFNldC1Db29raWUgaGVhZGVyXG4gIHJlYWRvbmx5IGNvb2tpZXM6IENvb2tpZVtdXG59XG5cbmV4cG9ydCB0eXBlIFJlc3BvbnNlSW50ZXJjZXB0b3IgPSAoXG4gIHJlcXVlc3Q6IFJlcXVlc3QsXG4gIHJlc3BvbnNlOiBSZXNwb25zZSxcbiAgZGF0YTogQXJyYXlCdWZmZXJcbikgPT4gUHJvbWlzZTxBcnJheUJ1ZmZlcj5cbiIsICJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TZWFyY2hGaWx0ZXIuanMubWFwIiwgImV4cG9ydCB7fTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVNlYXJjaFF1ZXJ5LmpzLm1hcCIsICJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1TZWFyY2hSZXN1bHRJdGVtLmpzLm1hcCIsICJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Tb3VyY2VNYW5nYS5qcy5tYXAiLCAiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VGFnLmpzLm1hcCIsICJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1UYWdTZWN0aW9uLmpzLm1hcCIsICJleHBvcnQge307XG4vLyMgc291cmNlTWFwcGluZ1VSTD1UcmFja2VkTWFuZ2FDaGFwdGVyUmVhZEFjdGlvbi5qcy5tYXAiLCAiZXhwb3J0IHt9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U29ydGluZ09wdGlvbi5qcy5tYXAiLCAiLyogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEdQTC0zLjAtb3ItbGF0ZXIgKi9cclxuLyogQ29weXJpZ2h0IFx1MDBBOSAyMDI1IElua2RleCAqL1xyXG5cclxuaW1wb3J0IHsgRm9ybSwgU2VjdGlvbiwgdHlwZSBGb3JtU2VjdGlvbkVsZW1lbnQgfSBmcm9tIFwiQHBhcGVyYmFjay90eXBlc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNldHRpbmdzRm9ybSBleHRlbmRzIEZvcm0ge1xyXG4gIG92ZXJyaWRlIGdldFNlY3Rpb25zKCk6IEZvcm1TZWN0aW9uRWxlbWVudFtdIHtcclxuICAgIHJldHVybiBbXHJcbiAgICAgIFNlY3Rpb24oXCJpbmZvXCIsIFtcclxuICAgICAgICAvLyBBZGQgc2V0dGluZ3Mgcm93cyBoZXJlIGlmIG5lZWRlZFxyXG4gICAgICBdKSxcclxuICAgIF07XHJcbiAgfVxyXG59XHJcbiIsICIvKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogR1BMLTMuMC1vci1sYXRlciAqL1xyXG4vKiBDb3B5cmlnaHQgXHUwMEE5IDIwMjUgSW5rZGV4ICovXHJcblxyXG5pbXBvcnQgeyBQYXBlcmJhY2tJbnRlcmNlcHRvciwgdHlwZSBSZXF1ZXN0LCB0eXBlIFJlc3BvbnNlIH0gZnJvbSBcIkBwYXBlcmJhY2svdHlwZXNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBNYWluSW50ZXJjZXB0b3IgZXh0ZW5kcyBQYXBlcmJhY2tJbnRlcmNlcHRvciB7XHJcbiAgb3ZlcnJpZGUgYXN5bmMgaW50ZXJjZXB0UmVxdWVzdChyZXF1ZXN0OiBSZXF1ZXN0KTogUHJvbWlzZTxSZXF1ZXN0PiB7XHJcbiAgICByZXF1ZXN0LmhlYWRlcnMgPSB7XHJcbiAgICAgIC4uLnJlcXVlc3QuaGVhZGVycyxcclxuICAgICAgXCJVc2VyLUFnZW50XCI6XHJcbiAgICAgICAgXCJNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvMTIwLjAuMC4wIFNhZmFyaS81MzcuMzZcIixcclxuICAgICAgUmVmZXJlcjogXCJodHRwczovL21hbmdhcGFyay5uZXQvXCIsXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHJlcXVlc3Q7XHJcbiAgfVxyXG5cclxuICBvdmVycmlkZSBhc3luYyBpbnRlcmNlcHRSZXNwb25zZShcclxuICAgIHJlcXVlc3Q6IFJlcXVlc3QsXHJcbiAgICByZXNwb25zZTogUmVzcG9uc2UsXHJcbiAgICBkYXRhOiBBcnJheUJ1ZmZlcixcclxuICApOiBQcm9taXNlPEFycmF5QnVmZmVyPiB7XHJcbiAgICByZXR1cm4gZGF0YTtcclxuICB9XHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQSxjQUFRLGFBQWE7QUFDckIs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QSxFQUNuRTtBQUNBLFNBQU8sV0FBVyxTQUFTLEtBQUssS0FBSztBQUNuQyxRQUFJLFVBQVUsS0FBSyxLQUFLLE9BQU8sVUFBVSxJQUFJLEVBQUUsR0FBRyxHQUFHLEVBQUUsUUFBUTtBQUFBLEVBQ2pFO0FBQ0EsU0FBTyxjQUFjLFNBQVMsS0FBSyxLQUFLO0FBQ3RDLFFBQUksVUFBVSxLQUFLLEtBQUssT0FBTyxhQUFhLElBQUksRUFBRSxHQUFHLElBQUksR0FBRyxFQUFFLFFBQVE7QUFBQSxFQUN4RTtBQUNBLFNBQU8sVUFBVSxTQUFTLEtBQUssS0FBSztBQUNsQyxRQUFJLFVBQVUsS0FBSyxLQUFLLE9BQU8sU0FBUyxJQUFJLEVBQUUsR0FBRyxHQUFHLEdBQUcsT0FBTztBQUFBLEVBQ2hFO0FBQ0EsU0FBTyxhQUFhLFNBQVMsS0FBSyxLQUFLO0FBQ3JDLFFBQUksVUFBVSxLQUFLLEtBQUssT0FBTyxZQUFZLElBQUksRUFBRSxHQUFHLElBQUksR0FBRyxHQUFHLE9BQU87QUFBQSxFQUN2RTtBQUNBLFNBQU8sV0FBVyxTQUFTLEtBQUssS0FBSztBQUNuQyxRQUFJLFVBQVUsS0FBSyxLQUFLLE9BQU8sVUFBVSxJQUFJLEVBQUUsR0FBRyxHQUFHLEVBQUUsUUFBUTtBQUFBLEVBQ2pFO0FBQ0EsU0FBTyxjQUFjLFNBQVMsS0FBSyxLQUFLO0FBQ3RDLFFBQUksVUFBVSxLQUFLLEtBQUssT0FBTyxhQUFhLElBQUksRUFBRSxHQUFHLElBQUksR0FBRyxFQUFFLFFBQVE7QUFBQSxFQUN4RTtBQUNBLFNBQU8sV0FBVyxTQUFTLEtBQUssS0FBSztBQUNuQyxRQUFJLFVBQVUsS0FBSyxLQUFLLE9BQU8sVUFBVSxJQUFJLEVBQUUsR0FBRyxHQUFHLEVBQUUsUUFBUTtBQUFBLEVBQ2pFO0FBQ0EsU0FBTyxjQUFjLFNBQVMsS0FBSyxLQUFLO0FBQ3RDLFFBQUksVUFBVSxLQUFLLEtBQUssT0FBTyxhQUFhLElBQUksRUFBRSxHQUFHLElBQUksR0FBRyxFQUFFLFFBQVE7QUFBQSxFQUN4RTtBQUNBLFNBQU8sWUFBWSxT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LGdCQUFnQixZQUFZLFNBQVM7QUFFcEQsVUFBSTtBQUNGLGNBQU0sVUFBVSxJQUFJLFFBQVEsR0FBRztBQUMvQixjQUFNLFdBQVcsTUFBTSxRQUFRLEtBQUs7QUFDcEMsY0FBTSxJQUFJLFlBQVksUUFBUSxLQUFLLFNBQVMsSUFBSTtBQUVoRCxjQUFNLFFBQWtCLENBQUM7QUFJekIsZUFBTztBQUFBLFVBQ0w7QUFBQSxVQUNBO0FBQUEsUUFDRjtBQUFBLE1BQ0YsU0FBUyxPQUFPO0FBQ2QsZ0JBQVEsTUFBTSxzQ0FBc0MsU0FBUyxLQUFLLEtBQUs7QUFDdkUsY0FBTTtBQUFBLE1BQ1I7QUFBQSxJQUNGO0FBQUEsRUFDRjsiLAogICJuYW1lcyI6IFsibGVuIiwgImkiLCAibGVuMiIsICJCdWZmZXIiLCAidG9TdHJpbmciLCAiaW5zcGVjdCIsICJpIiwgImJ5dGVMZW5ndGgiLCAiZ2V0TWVzc2FnZSIsICJ0eXBlIiwgIkJ1ZmZlciIsICJOb2RlQnVmZmVyIiwgInNlY29uZHNTaW5jZUxhc3RSZXNldCIsICJTb3VyY2VJbnRlbnRzIiwgIkNvbnRlbnRSYXRpbmciLCAiX19kZWZQcm9wIiwgIl9fZXhwb3J0IiwgImlzTmFOMiIsICJCdWZmZXIiLCAiaXNOYU4iLCAiX2EiLCAiRGlzY292ZXJTZWN0aW9uVHlwZSJdCn0K
