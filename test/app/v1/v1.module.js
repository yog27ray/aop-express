"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.V1Module = void 0;
const src_1 = require("../../../src");
const sub_module_one_module_1 = require("./sub-module-one/sub-module-one.module");
const sub_module_two_module_1 = require("./sub-module-two/sub-module-two.module");
const v1_controller_1 = require("./v1.controller");
let V1Module = class V1Module extends src_1.AOPModule {
};
V1Module = __decorate([
    src_1.Module({
        modules: [sub_module_one_module_1.SubModuleOneModule, sub_module_two_module_1.SubModuleTwoModule],
        controller: v1_controller_1.V1Controller,
    })
], V1Module);
exports.V1Module = V1Module;
//# sourceMappingURL=v1.module.js.map