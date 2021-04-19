"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aopApplication = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const a_o_p_application_1 = require("../declarations/a-o-p-application");
function aopApplication(config) {
    return function decorator(Target_) {
        const Target = Target_;
        const app = express_1.default();
        const server = http_1.default.createServer(app);
        Object.assign(a_o_p_application_1.AOPApplication, { config, app, server });
        // eslint-disable-next-line no-new
        new Target();
    };
}
exports.aopApplication = aopApplication;
//# sourceMappingURL=a-o-p-application.js.map