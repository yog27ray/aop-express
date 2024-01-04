"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middleware = void 0;
const inversify_1 = require("inversify");
const base_1 = require("./base");
const inversify_2 = require("./inversify");
let Middleware = class Middleware extends base_1.Base {
    getService(table) {
        return inversify_2.serviceContainer.get(table);
    }
    getProvider(table) {
        return inversify_2.providerContainer.get(table);
    }
};
exports.Middleware = Middleware;
exports.Middleware = Middleware = __decorate([
    (0, inversify_1.injectable)()
], Middleware);
//# sourceMappingURL=middleware.js.map