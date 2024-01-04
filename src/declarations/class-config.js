"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = exports.setConfig = void 0;
const uuid_1 = require("uuid");
const classConfig = {};
function setConfig(config) {
    const id = (0, uuid_1.v4)();
    classConfig[id] = { ...config };
    return id;
}
exports.setConfig = setConfig;
function getConfig(id) {
    return classConfig[id];
}
exports.getConfig = getConfig;
//# sourceMappingURL=class-config.js.map