import { Container } from 'inversify';

const modelContainer = new Container({});
const serviceContainer = new Container({});
const controllerContainer = new Container({});
const factoryContainer = new Container({});
const middlewareContainer = new Container({});

export { modelContainer, serviceContainer, controllerContainer, factoryContainer, middlewareContainer };
