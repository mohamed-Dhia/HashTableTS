'use strict';
var __spreadArrays =
    (this && this.__spreadArrays) ||
    function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
        return r;
    };
exports.__esModule = true;
var HashTable = /** @class */ (function () {
    function HashTable(_size) {
        var _this = this;
        this.createEmptyStorage = function () {
            return Array.from({ length: _this._size }, function () {
                return [];
            });
        };
        this.hashStringToInt = function (key) {
            var hash = 37;
            for (var i = 0; i < key.length; i++) {
                hash = 19 * hash * key.charCodeAt(i);
            }
            return hash % _this._size;
        };
        this.setItem = function (key, value, resize) {
            if (resize === void 0) {
                resize = true;
            }
            var index = _this.hashStringToInt(key);
            var newbucket = __spreadArrays(
                _this._storage[index].filter(function (tuple) {
                    return tuple[0] !== key;
                }),
                [[key, value]],
            );
            newbucket.length > _this._storage[index].length && _this._numberOfElement++;
            _this._storage[index] = newbucket;
            resize &&
                ((_this._numberOfElement >= (_this._size * 3) / 4 && _this.resize(_this._size * 2)) ||
                    (_this.numberOfElement <= _this._size / 4 && _this.resize(_this._size / 2)));
        };
        this.getItem = function (key) {
            var _a;
            var index = _this.hashStringToInt(key);
            return (
                ((_a = _this._storage[index].find(function (tuple) {
                    return tuple[0] === key;
                })) === null || _a === void 0
                    ? void 0
                    : _a[1]) || null
            );
        };
        this.removeItem = function (key) {
            var index = _this.hashStringToInt(key);
            var newBucket = _this._storage[index].filter(function (tuple) {
                return tuple[0] !== key;
            });
            newBucket.length - _this._storage[index].length &&
                (_this._storage[index] = newBucket) &&
                _this._numberOfElement--;
        };
        this.resize = function (newSize) {
            var allItems = [];
            _this.each(function (tuple) {
                allItems.push(tuple);
            });
            _this._size = newSize;
            _this._numberOfElement = 0;
            _this._storage = _this.createEmptyStorage();
            allItems.forEach(function (tuple) {
                _this.setItem(tuple[0], tuple[1], false);
            });
        };
        this.each = function (cb) {
            _this._storage.forEach(function (bucket) {
                bucket.forEach(function (tuple) {
                    tuple.length && cb(tuple);
                });
            });
        };
        this._size = _size;
        this._numberOfElement = 0;
        this._storage = this.createEmptyStorage();
    }
    Object.defineProperty(HashTable.prototype, 'size', {
        get: function () {
            return this._size;
        },
        enumerable: false,
        configurable: true,
    });
    Object.defineProperty(HashTable.prototype, 'numberOfElement', {
        get: function () {
            return this._numberOfElement;
        },
        enumerable: false,
        configurable: true,
    });
    return HashTable;
})();
exports['default'] = HashTable;
