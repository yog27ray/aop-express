"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AOPModule = void 0;
const base_1 = require("./base");
const inversify_1 = require("./inversify");
class AOPModule extends base_1.Base {
    getFactory(table) {
        return inversify_1.factoryContainer.get(table);
    }
}
exports.AOPModule = AOPModule;
//# sourceMappingURL=a-o-p-module.js.map