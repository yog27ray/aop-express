"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.factory = void 0;
const class_config_1 = require("../declarations/class-config");
const inversify_1 = require("../declarations/inversify");
function factory() {
    return function decorator(Target) {
        Object.assign(Target, { aopId: class_config_1.setConfig({}) });
        inversify_1.loadInContainer(inversify_1.factoryContainer, Target);
    };
}
exports.factory = factory;
//# sourceMappingURL=factory.js.map