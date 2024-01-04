"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = void 0;
const inversify_1 = require("inversify");
const inversify_2 = require("../declarations/inversify");
function middleware() {
    return function decorator(target) {
        (0, inversify_1.injectable)()(target);
        inversify_2.middlewareContainer.bind(target).to(target).inSingletonScope();
    };
}
exports.middleware = middleware;
//# sourceMappingURL=middleware.js.map