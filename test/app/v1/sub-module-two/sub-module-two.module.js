"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubModuleTwoModule = void 0;
const src_1 = require("../../../../src");
const sub_module_two_controller_1 = require("./sub-module-two.controller");
const sub_module_two_model_1 = require("./sub-module-two.model");
const sub_module_two_service_1 = require("./sub-module-two.service");
let SubModuleTwoModule = class SubModuleTwoModule extends src_1.AOPModule {
};
SubModuleTwoModule = __decorate([
    src_1.Module({
        controller: sub_module_two_controller_1.SubModuleTwoController,
        service: sub_module_two_service_1.SubModuleTwoService,
        model: sub_module_two_model_1.SubModuleTwoModel,
    })
], SubModuleTwoModule);
exports.SubModuleTwoModule = SubModuleTwoModule;
//# sourceMappingURL=sub-module-two.module.js.map