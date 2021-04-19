"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aopFactoryConstant = exports.aopFactory = void 0;
const inversify_1 = require("inversify");
const inversify_2 = require("../declarations/inversify");
function aopFactory() {
    return function decorator(target) {
        inversify_1.injectable()(target);
        inversify_2.factoryContainer.bind(target).to(target).inSingletonScope();
    };
}
exports.aopFactory = aopFactory;
function aopFactoryConstant(bind) {
    return function decorator(target) {
        inversify_2.factoryContainer.bind(bind).toConstantValue(target);
    };
}
exports.aopFactoryConstant = aopFactoryConstant;
//# sourceMappingURL=a-o-p-factory.js.map