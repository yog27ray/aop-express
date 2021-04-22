"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainModule = void 0;
const src_1 = require("../../src");
const main_controller_1 = require("./main.controller");
const main_service_1 = require("./main.service");
const v1_module_1 = require("./v1/v1.module");
let MainModule = class MainModule extends src_1.AOPModule {
};
MainModule = __decorate([
    src_1.Module({
        modules: [v1_module_1.V1Module],
        controller: main_controller_1.MainController,
        service: main_service_1.MainService,
    })
], MainModule);
exports.MainModule = MainModule;
//# sourceMappingURL=main.module.js.map