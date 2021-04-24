"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = void 0;
// tslint:disable-next-line:no-import-side-effect
require("reflect-metadata");
const class_config_1 = require("../declarations/class-config");
const inversify_1 = require("../declarations/inversify");
function Module(config = {}) {
    function loadContainer(ParentServiceClasses = []) {
        const CurrentModuleConfig = class_config_1.getConfig(this.aopId);
        if (CurrentModuleConfig.service) {
            ParentServiceClasses.push(CurrentModuleConfig.service);
        }
        if (CurrentModuleConfig.modules) {
            CurrentModuleConfig.modules.forEach((each) => each.loadContainer([...ParentServiceClasses]));
        }
        inversify_1.loadInContainer(inversify_1.controllerContainer, CurrentModuleConfig.controller);
        inversify_1.loadInContainer(inversify_1.serviceContainer, CurrentModuleConfig.service);
        inversify_1.loadInConstantContainer(inversify_1.modelContainer, CurrentModuleConfig.model);
        if (CurrentModuleConfig.controller && CurrentModuleConfig.service) {
            const ModuleControllerConfig = class_config_1.getConfig(CurrentModuleConfig.controller.aopId);
            ModuleControllerConfig.service = CurrentModuleConfig.service;
            const ServiceConfig = class_config_1.getConfig(ModuleControllerConfig.service.aopId);
            ParentServiceClasses.forEach((ServiceClass) => inversify_1.loadInContainer(ServiceConfig.container, ServiceClass));
            if (CurrentModuleConfig.model) {
                ServiceConfig.model = CurrentModuleConfig.model;
            }
        }
    }
    return function decorator(Target) {
        Object.assign(Target, { aopId: class_config_1.setConfig(config), loadContainer });
    };
}
exports.Module = Module;
//# sourceMappingURL=module.js.map