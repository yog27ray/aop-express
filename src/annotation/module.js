"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = void 0;
// tslint:disable-next-line:no-import-side-effect
require("reflect-metadata");
const inversify_1 = require("../declarations/inversify");
function Module(config = {}) {
    function loadContainer() {
        if (this.config.modules) {
            this.config.modules.forEach((each) => each.loadContainer());
        }
        inversify_1.loadInContainer(inversify_1.controllerContainer, this.config.controller);
        inversify_1.loadInContainer(inversify_1.serviceContainer, this.config.service);
        inversify_1.loadInConstantContainer(inversify_1.modelContainer, this.config.model);
        if (this.config.controller && this.config.service) {
            this.config.controller.config.service = this.config.service;
            if (this.config.model) {
                this.config.controller.config.service.config.model = this.config.model;
            }
        }
    }
    return function decorator(Target) {
        Object.assign(Target, { config: { ...config }, loadContainer });
    };
}
exports.Module = Module;
//# sourceMappingURL=module.js.map