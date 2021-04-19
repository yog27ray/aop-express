"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const declarations_1 = require("../declarations");
function Application(config) {
    return function decorator(Target_) {
        const Target = Target_;
        const app = express_1.default();
        const server = http_1.default.createServer(app);
        Object.assign(declarations_1.AOPApplication, { config, app, server });
        // eslint-disable-next-line no-new
        new Target();
    };
}
exports.Application = Application;
//# sourceMappingURL=application.js.map