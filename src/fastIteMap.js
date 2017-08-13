"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FastIteMap = (function () {
    function FastIteMap() {
        this._keys = new Map();
        this._values = [];
    }
    FastIteMap.prototype.clear = function () {
        this._keys.clear();
        this._values = [];
    };
    FastIteMap.prototype.delete = function (key) {
        var i = this._keys.get(key);
        var r = this._keys.delete(key);
        this.offsetIndexInKeys(i, -1);
        var r2 = this._values.splice(i, 1);
        if (r2.length > 0 && r) {
            return true;
        }
        else {
            return false;
        }
    };
    FastIteMap.prototype.get = function (key) {
        return this._values[this._keys.get(key)];
    };
    FastIteMap.prototype.has = function (key) {
        return this._keys.has(key);
    };
    FastIteMap.prototype.insertValue = function (key, value, index) {
        return this._values.splice(index, 0, value);
    };
    FastIteMap.prototype.offsetIndexInKeys = function (after, offsetVal) {
        var mapIter = this._keys.entries();
        var l = this._keys.size;
        for (var i = 0; i < l; ++i) {
            var e = mapIter.next().value;
            if (e[1] > after) {
                this._keys.set(e[0], e[1] += offsetVal);
            }
        }
    };
    FastIteMap.prototype.insertAfter = function (key, value, keyRef) {
        var i = this._keys.get(keyRef);
        this.insertValue(key, value, i + 1);
        if (i === undefined) {
            return false;
        }
        else {
            this.offsetIndexInKeys(i, 1);
            this._keys.set(key, i + 1);
            return true;
        }
    };
    FastIteMap.prototype.insertBefore = function (key, value, keyRef) {
        var i = this._keys.get(keyRef);
        this.insertValue(key, value, i);
        if (i === undefined) {
            return false;
        }
        else {
            this.offsetIndexInKeys(i - 1, 1);
            this._keys.set(key, i);
            return true;
        }
    };
    Object.defineProperty(FastIteMap.prototype, "length", {
        get: function () {
            return this._values.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FastIteMap.prototype, "keys", {
        get: function () {
            return this._keys;
        },
        enumerable: true,
        configurable: true
    });
    FastIteMap.prototype.push = function (key, value) {
        var e = this._keys.get(key);
        if (e === undefined) {
            var l = this._values.push(value);
            this._keys.set(key, l - 1);
        }
        else {
            this._values[e] = value;
        }
        return this._values.length;
    };
    FastIteMap.prototype.set = function (key, value) {
        return this.push(key, value);
    };
    FastIteMap.prototype.sort = function (compare) {
        this.values.sort(compare);
    };
    Object.defineProperty(FastIteMap.prototype, "size", {
        get: function () {
            return this._values.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FastIteMap.prototype, "values", {
        get: function () {
            return this._values;
        },
        enumerable: true,
        configurable: true
    });
    return FastIteMap;
}());
exports.FastIteMap = FastIteMap;
