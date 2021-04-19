"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
function Controller(config = {}) {
    return function decorator(Target) {
        Object.assign(Target, { config: { ...config } });
    };
}
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map