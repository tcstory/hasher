/**
 * Created by tcstory on 9/16/15.
 */
"use strict";
var Hasher = (function () {
    /**
     *
     * @param auto 是否在hash改变时,自动更新
     */
    function Hasher(auto) {
        if (auto === void 0) { auto = false; }
        this._hasher = {};
        if (auto) {
            this._autoFresh();
        }
        this._parse();
    }
    /**
     *
     * 在hash中添加新的参数,同名的参数会被替换掉
     * @param key {string}
     * @param value {string}
     */
    Hasher.prototype.add = function (key, value) {
        var _key = encodeURIComponent(key);
        this._hasher[_key] = encodeURIComponent(value);
        this._reProductHash();
    };
    /**
     * 删除hash中指定的参数
     * @param key
     */
    Hasher.prototype.remove = function (key) {
        if (key === void 0) { key = ''; }
        if (delete this._hasher[key]) {
            this._reProductHash();
        }
        else {
            throw new Error('删除参数失败');
        }
    };
    /**
     * 把hash解析为对象
     * @returns {boolean}
     * @private
     */
    Hasher.prototype._parse = function () {
        var _this = this;
        this._hasher = {};
        var _hash = decodeURIComponent(location.hash).substr(2); // 假定hash以 "#!"开头
        if (_hash === '') {
            return false;
        }
        var _properties = _hash.split('&');
        _properties.forEach(function (item, index, array) {
            var _pairs = item.split('=');
            _this._hasher[_pairs[0]] = _pairs[1];
        });
        return true;
    };
    /**
     *
     * 为hashchange事件添加事件处理程序
     * @private
     */
    Hasher.prototype._autoFresh = function () {
        var _this = this;
        window.onhashchange = function (e) {
            _this._parse();
        };
    };
    /**
     * 重新生成hash
     * @private
     */
    Hasher.prototype._reProductHash = function () {
        var _this = this;
        var hash_str = '#!';
        var len = Object.keys(this._hasher).length - 1;
        Object.keys(this._hasher).forEach(function (item, index, array) {
            var pair_str = item + '=' + _this._hasher[item];
            if (index === len) {
                hash_str = hash_str + pair_str;
            }
            else {
                hash_str = hash_str + pair_str + '&';
            }
        });
        location.hash = hash_str;
    };
    return Hasher;
})();
//# sourceMappingURL=Hasher.js.map