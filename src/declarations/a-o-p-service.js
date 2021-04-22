"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AOPService = void 0;
const inversify_1 = require("inversify");
const base_1 = require("./base");
const inversify_2 = require("./inversify");
let AOPService = class AOPService extends base_1.Base {
    constructor() {
        var _a, _b;
        super();
        const ConstructorClass = this.constructor;
        if ((_a = ConstructorClass.config) === null || _a === void 0 ? void 0 : _a.model) {
            this._model = inversify_2.modelContainer.get((_b = ConstructorClass.config) === null || _b === void 0 ? void 0 : _b.model);
        }
    }
    getService(table) {
        return inversify_2.serviceContainer.get(table);
    }
    getProvider(table) {
        return inversify_2.providerContainer.get(table);
    }
    get Model() {
        return this._model;
    }
};
AOPService = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], AOPService);
exports.AOPService = AOPService;
//# sourceMappingURL=a-o-p-service.js.map