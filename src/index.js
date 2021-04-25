"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middleware = exports.Base = exports.Controller = exports.Provider = exports.Module = exports.Service = exports.Application = exports.DELETE = exports.provider = exports.POST = exports.PUT = exports.GET = exports.module = exports.middleware = exports.controller = exports.application = exports.service = void 0;
const annotation_1 = require("./annotation");
Object.defineProperty(exports, "application", { enumerable: true, get: function () { return annotation_1.application; } });
Object.defineProperty(exports, "controller", { enumerable: true, get: function () { return annotation_1.controller; } });
Object.defineProperty(exports, "DELETE", { enumerable: true, get: function () { return annotation_1.DELETE; } });
Object.defineProperty(exports, "GET", { enumerable: true, get: function () { return annotation_1.GET; } });
Object.defineProperty(exports, "middleware", { enumerable: true, get: function () { return annotation_1.middleware; } });
Object.defineProperty(exports, "module", { enumerable: true, get: function () { return annotation_1.module; } });
Object.defineProperty(exports, "POST", { enumerable: true, get: function () { return annotation_1.POST; } });
Object.defineProperty(exports, "provider", { enumerable: true, get: function () { return annotation_1.provider; } });
Object.defineProperty(exports, "PUT", { enumerable: true, get: function () { return annotation_1.PUT; } });
Object.defineProperty(exports, "service", { enumerable: true, get: function () { return annotation_1.service; } });
const declarations_1 = require("./declarations");
Object.defineProperty(exports, "Application", { enumerable: true, get: function () { return declarations_1.Application; } });
Object.defineProperty(exports, "Controller", { enumerable: true, get: function () { return declarations_1.Controller; } });
Object.defineProperty(exports, "Middleware", { enumerable: true, get: function () { return declarations_1.Middleware; } });
Object.defineProperty(exports, "Module", { enumerable: true, get: function () { return declarations_1.Module; } });
Object.defineProperty(exports, "Provider", { enumerable: true, get: function () { return declarations_1.Provider; } });
Object.defineProperty(exports, "Service", { enumerable: true, get: function () { return declarations_1.Service; } });
Object.defineProperty(exports, "Base", { enumerable: true, get: function () { return declarations_1.Base; } });
//# sourceMappingURL=index.js.map