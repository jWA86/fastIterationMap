"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
//trick to extends Array in typescript based on http://jqfaq.com/how-to-extend-native-javascipt-object-in-typescript/
var XArray = (function () {
    function XArray() {
        Array.apply(this, arguments);
        return new Array();
    }
    XArray.prototype.pop = function () { return ""; };
    ;
    XArray.prototype.push = function (val) { return 0; };
    ;
    return XArray;
}());
//Adding Arrray to XArray prototype chain.
XArray["prototype"] = new Array();
var FastIteMap = (function (_super) {
    __extends(FastIteMap, _super);
    // protected _values: V[];
    function FastIteMap() {
        var _this = _super.call(this) || this;
        //cannot overwrite parent's method
        //have to use proprety instead
        _this.clear = function () {
        };
        _this.keys = function () {
            return this._keys;
        };
        _this.push = function (key, value) {
            if (value === undefined) {
                return;
            }
            arguments[0] = value;
            arguments.length = 1;
            var l = Array.prototype.push.apply(this, arguments);
            this._keys.set(key, l - 1);
            return this.length;
        };
        _this.set = function (key, value) {
            this.push(key, value);
            return this.length;
        };
        _this._keys = new Map();
        return _this;
    }
    FastIteMap.prototype.delete = function (key) {
    };
    FastIteMap.prototype.forEach = function (callBack) {
    };
    FastIteMap.prototype.get = function (key) {
    };
    FastIteMap.prototype.has = function (key) {
    };
    FastIteMap.prototype.insertAfter = function (key, value, keyRef) {
    };
    FastIteMap.prototype.insertBefore = function (key, value, keyRef) {
    };
    FastIteMap.prototype.sort = function () {
    };
    return FastIteMap;
}(Array));
exports.FastIteMap = FastIteMap;
