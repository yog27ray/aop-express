"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
function Service(config = {}) {
    return function decorator(Target) {
        Object.assign(Target, { config: { ...config } });
    };
}
exports.Service = Service;
//# sourceMappingURL=service.js.map