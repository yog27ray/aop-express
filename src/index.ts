import {
  application,
  controller,
  DELETE,
  factory,
  GET,
  middleware,
  module,
  POST,
  provider,
  PUT,
  service,
} from './annotation';
import { Application, Base, Controller, Factory, Middleware, Module, Provider, Service } from './declarations';
import { RouteRequest, RouteResponse } from './typings/request-response-type';

export {
  RouteRequest, RouteResponse, Application,
  application,
  Base,
  Controller, controller, DELETE, factory, Factory, GET,
  Middleware, middleware,
  Module, module, POST, Provider, provider, PUT, Service, service,
};
