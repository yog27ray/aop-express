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
exports.MainController = void 0;
const src_1 = require("../../src");
const v1_controller_1 = require("./v1/v1.controller");
let MainController = class MainController extends src_1.AOPController {
    getMainController() {
        return Promise.resolve({ response: {} });
    }
};
__decorate([
    src_1.GET('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MainController.prototype, "getMainController", null);
MainController = __decorate([
    src_1.Controller({
        routes: [
            { path: '/api', child: v1_controller_1.V1Controller },
        ],
    })
], MainController);
exports.MainController = MainController;
//# sourceMappingURL=main.controller.js.map