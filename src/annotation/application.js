"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.application = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const class_config_1 = require("../declarations/class-config");
function application(config) {
    return function decorator(Target) {
        const app = express_1.default();
        const server = http_1.default.createServer(app);
        Object.assign(Target, { aopId: class_config_1.setConfig({ ...config, app, server }) });
        // eslint-disable-next-line no-new
        new Target();
    };
}
exports.application = application;
//# sourceMappingURL=application.js.map