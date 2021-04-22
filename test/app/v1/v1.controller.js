"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.V1Controller = void 0;
const src_1 = require("../../../src");
const sub_module_one_controller_1 = require("./sub-module-one/sub-module-one.controller");
const sub_module_two_controller_1 = require("./sub-module-two/sub-module-two.controller");
let V1Controller = class V1Controller extends src_1.AOPController {
};
V1Controller = __decorate([
    src_1.Controller({
        routes: [
            { path: '/one', child: sub_module_one_controller_1.SubModuleOneController },
            { path: '/two', child: sub_module_two_controller_1.SubModuleTwoController },
        ],
    })
], V1Controller);
exports.V1Controller = V1Controller;
//# sourceMappingURL=v1.controller.js.map