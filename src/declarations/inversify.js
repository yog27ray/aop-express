"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewareContainer = exports.factoryContainer = exports.controllerContainer = exports.serviceContainer = exports.modelContainer = void 0;
const inversify_1 = require("inversify");
const modelContainer = new inversify_1.Container({});
exports.modelContainer = modelContainer;
const serviceContainer = new inversify_1.Container({});
exports.serviceContainer = serviceContainer;
const controllerContainer = new inversify_1.Container({});
exports.controllerContainer = controllerContainer;
const factoryContainer = new inversify_1.Container({});
exports.factoryContainer = factoryContainer;
const middlewareContainer = new inversify_1.Container({});
exports.middlewareContainer = middlewareContainer;
//# sourceMappingURL=inversify.js.map