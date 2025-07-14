"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var url_1 = require("url");
var url_2 = require("url");
var scripts_root_path_1 = require("./scripts-root-path");
var projectRootPath = path.join(scripts_root_path_1.scritpsRootPath, '../..');
function scanForBoundariesFiles(dir, srcRoot) {
    var elements = [];
    try {
        var entries = fs.readdirSync(dir, { withFileTypes: true });
        for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
            var entry = entries_1[_i];
            var fullPath = path.join(dir, entry.name);
            if (entry.isDirectory()) {
                // Recursively scan subdirectories
                elements.push.apply(elements, scanForBoundariesFiles(fullPath, srcRoot));
            }
            else if (entry.name.endsWith('.boundaries.ts')) {
                try {
                    var relativePath = path.relative(srcRoot, dir);
                    var posixPath = relativePath.split(path.sep).join('/');
                    // We'll load the config later using dynamic import
                    var configName = entry.name.replace('.boundaries.ts', '');
                    elements.push({
                        type: configName, // We'll update this with the actual name from the config
                        pattern: posixPath ? "src/".concat(posixPath) : 'src',
                        folderPath: posixPath,
                    });
                    console.log("Found boundaries file: ".concat(fullPath));
                }
                catch (error) {
                    console.error("Error processing boundaries file at ".concat(fullPath, ":"), error);
                }
            }
        }
    }
    catch (error) {
        console.error("Error scanning directory ".concat(dir, ":"), error);
    }
    return elements;
}
function loadBoundariesConfigs(srcRoot) {
    return __awaiter(this, void 0, void 0, function () {
        function scanDirectory(dir) {
            return __awaiter(this, void 0, void 0, function () {
                var entries, _i, entries_2, entry, fullPath, fileUrl, module_1, config, error_1, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 9, , 10]);
                            entries = fs.readdirSync(dir, { withFileTypes: true });
                            _i = 0, entries_2 = entries;
                            _a.label = 1;
                        case 1:
                            if (!(_i < entries_2.length)) return [3 /*break*/, 8];
                            entry = entries_2[_i];
                            fullPath = path.join(dir, entry.name);
                            if (!entry.isDirectory()) return [3 /*break*/, 3];
                            return [4 /*yield*/, scanDirectory(fullPath)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 7];
                        case 3:
                            if (!entry.name.endsWith('.boundaries.ts')) return [3 /*break*/, 7];
                            _a.label = 4;
                        case 4:
                            _a.trys.push([4, 6, , 7]);
                            fileUrl = (0, url_2.pathToFileURL)(fullPath).href;
                            return [4 /*yield*/, Promise.resolve("".concat(fileUrl)).then(function (s) { return require(s); })];
                        case 5:
                            module_1 = _a.sent();
                            config = module_1.default || module_1.boundaries;
                            if (!config || !config.name) {
                                console.error("Invalid boundaries config in ".concat(fullPath, ": missing name or default export"));
                                return [3 /*break*/, 7];
                            }
                            configs.set(config.name, config);
                            console.log("Loaded boundaries config: ".concat(config.name, " from ").concat(fullPath));
                            return [3 /*break*/, 7];
                        case 6:
                            error_1 = _a.sent();
                            console.error("Error loading boundaries.ts at ".concat(fullPath, ":"), error_1);
                            return [3 /*break*/, 7];
                        case 7:
                            _i++;
                            return [3 /*break*/, 1];
                        case 8: return [3 /*break*/, 10];
                        case 9:
                            error_2 = _a.sent();
                            console.error("Error scanning directory ".concat(dir, ":"), error_2);
                            return [3 /*break*/, 10];
                        case 10: return [2 /*return*/];
                    }
                });
            });
        }
        var configs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    configs = new Map();
                    return [4 /*yield*/, scanDirectory(srcRoot)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, configs];
            }
        });
    });
}
function generateESLintConfig() {
    return __awaiter(this, void 0, void 0, function () {
        var srcPath, elements, boundariesConfigs, _i, elements_1, element, _a, boundariesConfigs_1, _b, name_1, config, rules, externalRules, _c, elements_2, element, config, boundaryElementsSection, externalRulesSection, internalRulesSection, eslintConfig;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    srcPath = path.join(projectRootPath, 'src');
                    if (!fs.existsSync(srcPath)) {
                        console.error('src directory not found!');
                        process.exit(1);
                    }
                    elements = scanForBoundariesFiles(srcPath, srcPath);
                    // Sort elements by depth (deepest first) to ensure child configs take priority over parent configs
                    elements.sort(function (a, b) {
                        var depthA = a.folderPath.split('/').length;
                        var depthB = b.folderPath.split('/').length;
                        return depthB - depthA;
                    });
                    if (elements.length === 0) {
                        console.log('No .boundaries.ts files found. Generating empty configuration.');
                    }
                    return [4 /*yield*/, loadBoundariesConfigs(srcPath)];
                case 1:
                    boundariesConfigs = _d.sent();
                    // Update element types with actual names from configs
                    for (_i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
                        element = elements_1[_i];
                        for (_a = 0, boundariesConfigs_1 = boundariesConfigs; _a < boundariesConfigs_1.length; _a++) {
                            _b = boundariesConfigs_1[_a], name_1 = _b[0], config = _b[1];
                            if (element.folderPath === '' && name_1 === 'root') {
                                element.type = name_1;
                                break;
                            }
                            else if (element.folderPath && config.name === element.type) {
                                element.type = name_1;
                                break;
                            }
                        }
                    }
                    rules = [];
                    externalRules = [];
                    for (_c = 0, elements_2 = elements; _c < elements_2.length; _c++) {
                        element = elements_2[_c];
                        config = boundariesConfigs.get(element.type);
                        if (config) {
                            if (config.internal && config.internal.length > 0) {
                                rules.push({
                                    from: element.type,
                                    allow: config.internal,
                                });
                            }
                            if (config.external && config.external.length > 0) {
                                externalRules.push({
                                    from: element.type,
                                    allow: config.external,
                                });
                            }
                        }
                    }
                    boundaryElementsSection = "'boundaries/elements': [\n".concat(elements
                        .map(function (element) {
                        return "        { type: '".concat(element.type, "', pattern: '").concat(element.pattern, "' }");
                    })
                        .join(',\n'), "\n      ] ");
                    externalRulesSection = "'boundaries/external': [\n        2,\n        {\n          default: 'disallow',\n          rules: [\n".concat(externalRules
                        .map(function (rule) {
                        return "            { from: '".concat(rule.from, "', allow: [").concat(rule.allow
                            .map(function (a) { return "'".concat(a, "'"); })
                            .join(', '), "] }");
                    })
                        .join(',\n'), "\n          ]\n        }\n      ],");
                    internalRulesSection = "'boundaries/element-types': [\n        2,\n        {\n          default: 'disallow',\n          rules: [\n".concat(rules
                        .map(function (rule) {
                        return "            { from: '".concat(rule.from, "', allow: [").concat(rule.allow
                            .map(function (a) { return "'".concat(a, "'"); })
                            .join(', '), "] }");
                    })
                        .join(',\n'), "\n          ]\n        }\n      ]");
                    eslintConfig = "// This file is auto-generated by generate-eslint-boundaries.ts\n// Do not edit manually!\n\nimport boundaries from 'eslint-plugin-boundaries';\n\nexport default [\n  {\n    plugins: {\n      boundaries\n    },\n    settings: {\n      ".concat(boundaryElementsSection, "\n    },\n    rules: {\n      'boundaries/no-private': [2, { 'allowUncles': false }],\n      ").concat(externalRulesSection, "\n      ").concat(internalRulesSection, "\n    }\n  }\n];\n");
                    return [2 /*return*/, eslintConfig];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var config, outputPath, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Generating ESLint boundaries configuration...');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, generateESLintConfig()];
                case 2:
                    config = _a.sent();
                    outputPath = path.join(projectRootPath, 'eslint.boundaries.generated.mjs');
                    fs.writeFileSync(outputPath, config, 'utf8');
                    console.log("ESLint boundaries configuration generated: ".concat(outputPath));
                    console.log('Configuration is idempotent and will overwrite existing file.');
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    console.error('Error generating ESLint configuration:', error_3);
                    process.exit(1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
if ((0, url_1.fileURLToPath)(import.meta.url) === process.argv[1]) {
    main();
}
