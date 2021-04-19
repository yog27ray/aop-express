"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aopMiddleware = void 0;
const inversify_1 = require("inversify");
const inversify_2 = require("../declarations/inversify");
function aopMiddleware() {
    return function decorator(target) {
        inversify_1.injectable()(target);
        inversify_2.middlewareContainer.bind(target).to(target).inSingletonScope();
    };
}
exports.aopMiddleware = aopMiddleware;
//# sourceMappingURL=a-o-p-middleware.js.map