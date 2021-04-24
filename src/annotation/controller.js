"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const class_config_1 = require("../declarations/class-config");
function Controller(config = {}) {
    return function decorator(Target) {
        Object.assign(Target, { aopId: class_config_1.setConfig(config) });
    };
}
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map