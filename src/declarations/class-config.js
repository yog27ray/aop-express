"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = exports.setConfig = void 0;
const inversify_1 = require("inversify");
const uuid_1 = require("uuid");
const classConfig = {};
function setConfig(config) {
    const id = uuid_1.v4();
    classConfig[id] = { ...config, container: new inversify_1.Container({}) };
    return id;
}
exports.setConfig = setConfig;
function getConfig(id) {
    return classConfig[id];
}
exports.getConfig = getConfig;
//# sourceMappingURL=class-config.js.map