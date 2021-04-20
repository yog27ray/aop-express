import { Container } from 'inversify';
import { Base } from './base';
declare const serviceContainer: Container;
declare const controllerContainer: Container;
declare const factoryContainer: Container;
declare const middlewareContainer: Container;
declare function loadInContainer(container: Container, target: new () => Base): void;
export { loadInContainer, serviceContainer, controllerContainer, factoryContainer, middlewareContainer };
