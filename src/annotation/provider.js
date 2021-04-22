"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provider = void 0;
const inversify_1 = require("../declarations/inversify");
function Provider() {
    return function decorator(Target) {
        inversify_1.loadInContainer(inversify_1.providerContainer, Target);
    };
}
exports.Provider = Provider;
//# sourceMappingURL=provider.js.map