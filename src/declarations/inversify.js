"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewareContainer = exports.factoryContainer = exports.controllerContainer = exports.serviceContainer = exports.loadInContainer = void 0;
const inversify_1 = require("inversify");
const serviceContainer = new inversify_1.Container({});
exports.serviceContainer = serviceContainer;
const controllerContainer = new inversify_1.Container({});
exports.controllerContainer = controllerContainer;
const factoryContainer = new inversify_1.Container({});
exports.factoryContainer = factoryContainer;
const middlewareContainer = new inversify_1.Container({});
exports.middlewareContainer = middlewareContainer;
function loadInContainer(container, target) {
    if (!target) {
        return;
    }
    inversify_1.injectable()(target);
    container.bind(target).to(target).inSingletonScope();
}
exports.loadInContainer = loadInContainer;
//# sourceMappingURL=inversify.js.map