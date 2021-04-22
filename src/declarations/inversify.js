"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.providerContainer = exports.middlewareContainer = exports.modelContainer = exports.controllerContainer = exports.serviceContainer = exports.loadInConstantContainer = exports.loadInContainer = void 0;
const inversify_1 = require("inversify");
const serviceContainer = new inversify_1.Container({});
exports.serviceContainer = serviceContainer;
const providerContainer = new inversify_1.Container({});
exports.providerContainer = providerContainer;
const controllerContainer = new inversify_1.Container({});
exports.controllerContainer = controllerContainer;
const modelContainer = new inversify_1.Container({});
exports.modelContainer = modelContainer;
const middlewareContainer = new inversify_1.Container({});
exports.middlewareContainer = middlewareContainer;
function loadInConstantContainer(container, target) {
    if (!target) {
        return;
    }
    inversify_1.injectable()(target);
    container.bind(target).toConstantValue(target);
}
exports.loadInConstantContainer = loadInConstantContainer;
function loadInContainer(container, target) {
    if (!target) {
        return;
    }
    inversify_1.injectable()(target);
    container.bind(target).to(target).inSingletonScope();
}
exports.loadInContainer = loadInContainer;
//# sourceMappingURL=inversify.js.map