"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provider = void 0;
const base_1 = require("./base");
const inversify_1 = require("./inversify");
class Provider extends base_1.Base {
    getFactory(table) {
        return inversify_1.factoryContainer.get(table);
    }
    getProvider(table) {
        return inversify_1.providerContainer.get(table);
    }
}
exports.Provider = Provider;
//# sourceMappingURL=provider.js.map