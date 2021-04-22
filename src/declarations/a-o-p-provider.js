"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AOPProvider = void 0;
const base_1 = require("./base");
const inversify_1 = require("./inversify");
class AOPProvider extends base_1.Base {
    getProvider(table) {
        return inversify_1.providerContainer.get(table);
    }
}
exports.AOPProvider = AOPProvider;
//# sourceMappingURL=a-o-p-provider.js.map