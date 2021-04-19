"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Factory = void 0;
const inversify_1 = require("inversify");
const inversify_2 = require("../declarations/inversify");
function Factory() {
    return function decorator(target) {
        inversify_1.injectable()(target);
        inversify_2.factoryContainer.bind(target).to(target).inSingletonScope();
    };
}
exports.Factory = Factory;
//# sourceMappingURL=factory.js.map