"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aopService = void 0;
function aopService(config = {}) {
    return function decorator(Target) {
        Object.assign(Target, { config: { ...config } });
    };
}
exports.aopService = aopService;
//# sourceMappingURL=a-o-p-service.js.map