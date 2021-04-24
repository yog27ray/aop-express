"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const class_config_1 = require("../declarations/class-config");
function Service(config = {}) {
    return function decorator(Target) {
        Object.assign(Target, { aopId: class_config_1.setConfig(config) });
    };
}
exports.Service = Service;
//# sourceMappingURL=service.js.map