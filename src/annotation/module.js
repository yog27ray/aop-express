"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = void 0;
require("reflect-metadata");
const inversify_1 = require("inversify");
const inversify_2 = require("../declarations/inversify");
function Module(config) {
    function loadInContainer(container, target) {
        if (!target) {
            return;
        }
        inversify_1.injectable()(target);
        container.bind(target).to(target).inSingletonScope();
    }
    function loadContainer() {
        if (this.config.modules) {
            this.config.modules.forEach((each) => each.loadContainer());
        }
        loadInContainer(inversify_2.controllerContainer, this.config.controller);
        loadInContainer(inversify_2.serviceContainer, this.config.service);
    }
    return function decorator(Target) {
        Object.assign(Target, { config: { ...config }, loadContainer });
    };
}
exports.Module = Module;
//# sourceMappingURL=module.js.map