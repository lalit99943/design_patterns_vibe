
import { DesignPattern } from '../types';
import { singletonPattern } from './patterns/singleton';
import { factoryMethodPattern } from './patterns/factory-method';
import { abstractFactoryPattern } from './patterns/abstract-factory';
import { builderPattern } from './patterns/builder';
import { prototypePattern } from './patterns/prototype';
import { adapterPattern } from './patterns/adapter';
import { bridgePattern } from './patterns/bridge';
import { compositePattern } from './patterns/composite';
import { decoratorPattern } from './patterns/decorator';
import { facadePattern } from './patterns/facade';
import { flyweightPattern } from './patterns/flyweight';
import { proxyPattern } from './patterns/proxy';
import { observerPattern } from './patterns/observer';
import { chainOfResponsibilityPattern } from './patterns/chain-of-responsibility';
import { commandPattern } from './patterns/command';
import { iteratorPattern } from './patterns/iterator';
import { mediatorPattern } from './patterns/mediator';
import { mementoPattern } from './patterns/memento';
import { statePattern } from './patterns/state';
import { strategyPattern } from './patterns/strategy';
import { templateMethodPattern } from './patterns/template-method';
import { visitorPattern } from './patterns/visitor';


export const designPatterns: DesignPattern[] = [
  singletonPattern,
  factoryMethodPattern,
  abstractFactoryPattern,
  builderPattern,
  prototypePattern,
  adapterPattern,
  bridgePattern,
  compositePattern,
  decoratorPattern,
  facadePattern,
  flyweightPattern,
  proxyPattern,
  observerPattern,
  chainOfResponsibilityPattern,
  commandPattern,
  iteratorPattern,
  mediatorPattern,
  mementoPattern,
  statePattern,
  strategyPattern,
  templateMethodPattern,
  visitorPattern,
];
