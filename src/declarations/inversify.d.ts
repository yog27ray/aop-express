import { Container } from 'inversify';
import { Base } from './base';
declare const serviceContainer: Container;
declare const providerContainer: Container;
declare const controllerContainer: Container;
declare const modelContainer: Container;
declare const middlewareContainer: Container;
declare function loadInConstantContainer(container: Container, target: new () => Base): void;
declare function loadInContainer(container: Container, target: (new () => Base) & {
    aopId?: string;
}): void;
export { loadInContainer, loadInConstantContainer, serviceContainer, controllerContainer, modelContainer, middlewareContainer, providerContainer, };
