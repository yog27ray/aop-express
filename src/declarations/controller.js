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
exports.Controller = void 0;
const inversify_1 = require("inversify");
const base_1 = require("./base");
const class_config_1 = require("./class-config");
const inversify_2 = require("./inversify");
let Controller = class Controller extends base_1.Base {
    constructor() {
        super();
        const moduleConfig = class_config_1.getConfig(this.constructor.aopId);
        if (moduleConfig.service) {
            this._service = inversify_2.serviceContainer.get(moduleConfig.service);
        }
    }
    get service() {
        return this._service;
    }
};
Controller = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], Controller);
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map