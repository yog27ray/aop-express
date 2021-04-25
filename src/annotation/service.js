"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.service = void 0;
const inversify_1 = require("inversify");
const class_config_1 = require("../declarations/class-config");
function service(config = {}) {
    return function decorator(Target) {
        Object.assign(Target, { aopId: class_config_1.setConfig({ ...config, container: new inversify_1.Container({}) }) });
    };
}
exports.service = service;
//# sourceMappingURL=service.js.map