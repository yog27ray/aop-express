"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AOPController = void 0;
const inversify_1 = require("inversify");
const base_1 = require("./base");
const inversify_2 = require("./inversify");
let AOPController = class AOPController extends base_1.Base {
    getFactory(table) {
        return inversify_2.factoryContainer.get(table);
    }
    getService(table) {
        return inversify_2.serviceContainer.get(table);
    }
};
AOPController = __decorate([
    inversify_1.injectable()
], AOPController);
exports.AOPController = AOPController;
//# sourceMappingURL=a-o-p-controller.js.map