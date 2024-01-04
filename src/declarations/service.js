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
exports.Service = void 0;
const inversify_1 = require("inversify");
const base_1 = require("./base");
const class_config_1 = require("./class-config");
const inversify_2 = require("./inversify");
let Service = class Service extends base_1.Base {
    constructor() {
        super();
        const serviceConfig = (0, class_config_1.getConfig)(this.constructor.aopId);
        if (serviceConfig === null || serviceConfig === void 0 ? void 0 : serviceConfig.model) {
            this._model = inversify_2.modelContainer.get(serviceConfig.model);
        }
    }
    getFactory(table) {
        return inversify_2.factoryContainer.get(table);
    }
    getService(table) {
        return (0, class_config_1.getConfig)(this.constructor.aopId).container.get(table);
    }
    getProvider(table) {
        return inversify_2.providerContainer.get(table);
    }
    get Model() {
        return this._model;
    }
};
exports.Service = Service;
exports.Service = Service = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], Service);
//# sourceMappingURL=service.js.map