"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
// tslint:disable-next-line:no-import-side-effect
require("reflect-metadata");
const src_1 = require("../src");
const main_module_1 = require("./app/main.module");
let App = class App extends src_1.AOPApplication {
};
App = __decorate([
    src_1.Application({
        module: main_module_1.MainModule,
        port: 3001,
        ip: '0.0.0.0',
        pathPrefix: '/api',
    })
], App);
const { app } = App;
exports.app = app;
//# sourceMappingURL=app.js.map