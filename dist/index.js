module.exports =
/******/ (function(modules, runtime) { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	__webpack_require__.ab = __dirname + "/";
/******/
/******/ 	// the startup function
/******/ 	function startup() {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(325);
/******/ 	};
/******/ 	// initialize runtime
/******/ 	runtime(__webpack_require__);
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 34:
/***/ (function(module) {

module.exports = function (str) {
    var bytes = [];
    for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        if (c >= 0xd800 && c <= 0xdbff && i + 1 < str.length) {
            var cn = str.charCodeAt(i + 1);
            if (cn >= 0xdc00 && cn <= 0xdfff) {
                var pt = (c - 0xd800) * 0x400 + cn - 0xdc00 + 0x10000;
                
                bytes.push(
                    0xf0 + Math.floor(pt / 64 / 64 / 64),
                    0x80 + Math.floor(pt / 64 / 64) % 64,
                    0x80 + Math.floor(pt / 64) % 64,
                    0x80 + pt % 64
                );
                i += 1;
                continue;
            }
        }
        if (c >= 2048) {
            bytes.push(
                0xe0 + Math.floor(c / 64 / 64),
                0x80 + Math.floor(c / 64) % 64,
                0x80 + c % 64
            );
        }
        else if (c >= 128) {
            bytes.push(0xc0 + Math.floor(c / 64), 0x80 + c % 64);
        }
        else bytes.push(c);
    }
    return bytes;
};


/***/ }),

/***/ 102:
/***/ (function(__unusedmodule, exports) {

Object.defineProperty(exports, "__esModule", { value: true });
const modules = [];
const buffer = new Uint8Array([0,97,115,109,1,0,0,0,1,30,6,96,0,0,96,0,1,127,96,1,127,1,127,96,3,127,127,127,0,96,1,126,1,126,96,2,126,127,1,126,3,7,6,1,2,3,5,4,0,5,3,1,0,1,6,36,7,127,1,65,0,11,127,1,65,0,11,127,1,65,0,11,127,1,65,0,11,127,1,65,0,11,127,1,65,0,11,127,1,65,0,11,7,39,3,6,109,101,109,111,114,121,2,0,17,116,101,115,116,95,103,101,116,77,97,120,77,101,109,111,114,121,0,0,6,112,97,114,115,101,114,0,4,8,1,5,10,144,2,6,4,0,35,6,11,112,1,4,127,32,0,69,4,64,0,11,32,0,35,3,75,4,64,0,11,35,2,32,0,65,8,32,0,65,8,75,27,35,6,34,0,106,106,35,2,65,127,115,113,34,1,63,0,34,2,65,16,116,75,4,64,32,2,32,1,32,0,107,65,255,255,3,106,65,128,128,124,113,65,16,117,34,3,34,4,32,2,32,4,75,27,64,0,65,0,73,4,64,32,3,64,0,65,0,73,4,64,0,11,11,11,32,1,36,6,32,0,11,40,0,32,0,32,2,106,33,2,3,64,32,0,32,2,70,69,4,64,32,0,32,1,45,0,0,58,0,0,32,0,65,1,106,33,0,12,1,11,11,11,50,2,1,127,1,126,65,12,16,1,34,2,65,0,65,12,16,2,32,2,173,66,128,128,128,128,240,2,132,34,3,167,32,0,55,3,0,32,3,167,65,8,106,32,1,54,2,0,32,3,11,8,0,32,0,65,0,16,3,11,51,0,65,3,36,0,65,1,35,0,116,36,1,35,1,65,1,107,36,2,65,128,128,128,128,4,36,3,65,128,128,4,36,4,35,4,35,2,106,35,2,65,127,115,113,36,5,35,5,36,6,11,11,55,4,0,65,16,11,11,8,0,0,0,116,0,114,0,117,0,101,0,65,29,11,13,10,0,0,0,102,0,97,0,108,0,115,0,101,0,65,44,11,5,2,0,0,0,48,0,65,51,11,5,2,0,0,0,48])

exports.default = async function() {
  let instance = null;

  const getInstance = () => instance;

  let injectedModules = {};

  modules.forEach($ => {
    const generatedModule = $(getInstance);

    if (generatedModule) {
      injectedModules = { ...injectedModules, ...generatedModule };
    }
  });

  const compiled = await WebAssembly.compile(buffer);

  instance = new WebAssembly.Instance(compiled, injectedModules);

  return instance;
}
  

/***/ }),

/***/ 325:
/***/ (function(__unusedmodule, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keccakHash", function() { return keccakHash; });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const getBytes = __webpack_require__(34);
const wasmModule = __webpack_require__(102);
function readBytes(dv, offset) {
    const ret = [];
    readBytesToRef(dv, offset, ret);
    return ret;
}
function readBytesToRef(dv, offset, ref) {
    let len = dv.getUint32(offset, true);
    if (len == 0)
        return;
    let currentOffset = 4;
    let currentIndex = 0;
    len += 4;
    while (currentOffset < len) {
        const r = dv.getUint8(offset + currentOffset);
        ref[currentIndex] = r;
        currentOffset += 1;
        currentIndex += 1;
    }
}
function keccakHash() {
    return __awaiter(this, void 0, void 0, function* () {
        const instance = yield wasmModule.default();
        const dataView = new DataView(instance.exports.memory.buffer);
        function digest(hexResult = true) {
            const retAddress = instance.exports.digest();
            if (hexResult) {
                const ret = readBytes(dataView, retAddress)
                    .map($ => ("00" + $.toString(16)).substr(-2))
                    .join("");
                instance.exports.reset();
                return ret;
            }
            else {
                const ret = new Uint8Array(32);
                readBytesToRef(dataView, retAddress, ret);
                instance.exports.reset();
                return ret;
            }
        }
        function update(data) {
            const safeOffset = instance.exports.topMemory(0);
            if (typeof data === "string") {
                const bytes = getBytes(data);
                bytes.forEach((value, ix) => {
                    dataView.setUint8(safeOffset + ix, value);
                });
                instance.exports.update(safeOffset, bytes.length);
                return;
            }
            else if (data instanceof Uint8Array) {
                data.forEach((value, ix) => {
                    dataView.setUint8(safeOffset + ix, value);
                });
                instance.exports.update(safeOffset, data.length);
                return;
            }
            else if (data instanceof Array) {
                data.forEach((value, ix) => {
                    dataView.setUint8(safeOffset + ix, value);
                });
                instance.exports.update(safeOffset, data.length);
                return;
            }
            throw new Error("update(data): Only Array<Number> UInt8Array and UTF-8 strings are allowed");
        }
        return {
            update,
            digest
        };
    });
}
/* harmony default export */ __webpack_exports__["default"] = (keccakHash);


/***/ })

/******/ },
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ 	"use strict";
/******/ 
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getter */
/******/ 	!function() {
/******/ 		// define getter function for harmony exports
/******/ 		var hasOwnProperty = Object.prototype.hasOwnProperty;
/******/ 		__webpack_require__.d = function(exports, name, getter) {
/******/ 			if(!hasOwnProperty.call(exports, name)) {
/******/ 				Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ }
);