"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module2 = exports.Module1 = exports.typescriptPackageTemplateTest = void 0;
exports.typescriptPackageTemplateTest = { version: '2025-07-13' };
// Export sample modules to test absolute imports
var module1_1 = require("sample/module1/module1");
Object.defineProperty(exports, "Module1", { enumerable: true, get: function () { return module1_1.Module1; } });
var module2_1 = require("sample/module2/module2");
Object.defineProperty(exports, "Module2", { enumerable: true, get: function () { return module2_1.Module2; } });
