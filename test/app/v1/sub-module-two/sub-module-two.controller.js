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
exports.SubModuleTwoController = void 0;
const src_1 = require("../../../../src");
let SubModuleTwoController = class SubModuleTwoController extends src_1.AOPController {
    constructor() {
        super();
        console.log('>>>>>>ServiceFunctionCall', this.service.testMethodCall());
    }
    testPutMethod() {
        this.service.testMethodCall();
        return Promise.resolve({ response: {} });
    }
};
__decorate([
    src_1.PUT('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubModuleTwoController.prototype, "testPutMethod", null);
SubModuleTwoController = __decorate([
    src_1.Controller(),
    __metadata("design:paramtypes", [])
], SubModuleTwoController);
exports.SubModuleTwoController = SubModuleTwoController;
//# sourceMappingURL=sub-module-two.controller.js.map