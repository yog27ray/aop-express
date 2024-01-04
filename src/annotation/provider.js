"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provider = void 0;
const inversify_1 = require("../declarations/inversify");
function provider() {
    return function decorator(Target) {
        (0, inversify_1.loadInContainer)(inversify_1.providerContainer, Target);
    };
}
exports.provider = provider;
//# sourceMappingURL=provider.js.map