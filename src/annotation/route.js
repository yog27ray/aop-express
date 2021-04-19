"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETE = exports.PUT = exports.POST = exports.GET = exports.createMiddlewareHandler = void 0;
const inversify_1 = require("../declarations/inversify");
const ExpressFunctionPrefix = 'express_';
function addMiddlewareData(request) {
    if (!request.middlewareData) {
        request.middlewareData = {};
    }
}
function handleErrorResponse(response, error) {
    const { message } = error;
    response.status(error.code || 400).send({ message });
}
function createMiddlewareHandler(ClassMiddlewares) {
    return ClassMiddlewares.map((ClassMiddleware) => {
        const controllerClassMiddleware = inversify_1.middlewareContainer.get(ClassMiddleware);
        return async (request, response, next) => {
            try {
                addMiddlewareData(request);
                await controllerClassMiddleware.requestHandler(request);
                next();
            }
            catch (error) {
                handleErrorResponse(response, error);
            }
        };
    });
}
exports.createMiddlewareHandler = createMiddlewareHandler;
function createRequestHandler(target_, requestMethod, path, classMethod, routeConfig, propertyDescriptor) {
    const target = target_;
    const handlerMethod = `${ExpressFunctionPrefix}${classMethod}`;
    if (!target.routes) {
        target.routes = [];
    }
    target.routes.push({
        path,
        method: requestMethod,
        classMethod: handlerMethod,
        middleware: [],
        middlewareClass: (routeConfig === null || routeConfig === void 0 ? void 0 : routeConfig.middleware) || [],
    });
    Object.assign(target, {
        async [handlerMethod](request, response) {
            try {
                addMiddlewareData(request);
                const result = await this[classMethod]({
                    middlewareData: request.middlewareData,
                    query: request.query,
                    params: request.params,
                    headers: request.headers,
                    body: request.body,
                });
                response.status(result.code || 200).json(result.response);
            }
            catch (error) {
                handleErrorResponse(response, error);
            }
        },
    });
    return propertyDescriptor;
}
function GET(path, routeConfig = {}) {
    return function decorator(target, classMethod, propertyDescriptor) {
        return createRequestHandler(target, 'get', path, classMethod, routeConfig, propertyDescriptor);
    };
}
exports.GET = GET;
function POST(path, routeConfig = {}) {
    return function decorator(target, classMethod_, propertyDescriptor) {
        return createRequestHandler(target, 'post', path, classMethod_, routeConfig, propertyDescriptor);
    };
}
exports.POST = POST;
function PUT(path, routeConfig = {}) {
    return function decorator(target, classMethod_, propertyDescriptor) {
        return createRequestHandler(target, 'put', path, classMethod_, routeConfig, propertyDescriptor);
    };
}
exports.PUT = PUT;
function DELETE(path, routeConfig = {}) {
    return function decorator(target, classMethod_, propertyDescriptor) {
        return createRequestHandler(target, 'delete', path, classMethod_, routeConfig, propertyDescriptor);
    };
}
exports.DELETE = DELETE;
//# sourceMappingURL=route.js.map