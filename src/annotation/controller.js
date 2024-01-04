"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
const class_config_1 = require("../declarations/class-config");
function controller(config = {}) {
    return function decorator(Target) {
        Object.assign(Target, { aopId: (0, class_config_1.setConfig)(config) });
    };
}
exports.controller = controller;
//# sourceMappingURL=controller.js.map