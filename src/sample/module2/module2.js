"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module2 = void 0;
var module1_1 = require("sample/module1/module1");
var Module2 = /** @class */ (function () {
    function Module2() {
        this.module1 = new module1_1.Module1();
    }
    Module2.prototype.getValue = function () {
        return "module2-value-".concat(this.module1.getValue());
    };
    return Module2;
}());
exports.Module2 = Module2;
