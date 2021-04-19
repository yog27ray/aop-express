"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aopController = void 0;
function aopController(config = {}) {
    return function decorator(Target) {
        Object.assign(Target, { config: { ...config } });
    };
}
exports.aopController = aopController;
//# sourceMappingURL=a-o-p-controller.js.map