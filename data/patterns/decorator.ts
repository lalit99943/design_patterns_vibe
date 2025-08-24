import { DesignPattern } from '../../types';

export const decoratorPattern: DesignPattern = {
    id: 'decorator',
    name: 'Decorator',
    category: 'Structural',
    description: 'Attach additional responsibilities to an object dynamically. Decorators provide a flexible, runtime alternative to subclassing for extending functionality.',
    whenToUse: [
      'To add responsibilities to individual objects dynamically and transparently, without affecting other objects.',
      'When extension by subclassing is impractical due to a large number of independent extensions.',
      'When you want to avoid feature-laden classes high up in the hierarchy.'
    ],
    whenNotToUse: [
      'If you only need to add a small amount of functionality, a simple wrapper class might be sufficient.',
      'The pattern can result in a large number of small objects, which can be hard to configure and debug.',
      'Decorators can complicate the object instantiation process, as you have to wrap the object with multiple decorators.'
    ],
    comparison: `
**Decorator vs. Inheritance:** Decorators offer a more flexible way to add functionality at runtime. With inheritance, an object's behavior is fixed at compile time. A single decorator can be used to add functionality to many different types of objects, as long as they share a common interface.

**Decorator vs. Proxy:** Both patterns wrap another object. However, a Proxy's main purpose is to control access to an object (e.g., lazy loading, security), while a Decorator's purpose is to add or alter its behavior. A Proxy might hide the fact that it's not the real object, whereas a Decorator is transparent.
    `,
    diagram: {
      viewBox: "0 0 700 450",
      components: [
        { id: 'component', type: 'interface', label: 'Coffee', x: 250, y: 20, width: 200, height: 60, code: { 
            java: `
// The Component interface defines the interface for objects that
// can have responsibilities added to them dynamically.
public interface Coffee {
    double getCost();
    String getIngredients();
}
        `,
            python: `
from abc import ABC, abstractmethod

# The Component interface
class Coffee(ABC):
    @abstractmethod
    def get_cost(self) -> float:
        pass

    @abstractmethod
    def get_ingredients(self) -> str:
        pass
        `,
            javascript: `
// The Component interface (simulated as a class)
export class Coffee {
    getCost() {
        throw new Error("Method 'getCost()' must be implemented.");
    }
    getIngredients() {
        throw new Error("Method 'getIngredients()' must be implemented.");
    }
}
        `}},
        { id: 'concrete-component', type: 'class', label: 'SimpleCoffee', x: 20, y: 150, width: 200, height: 60, code: { 
            java: `
// The Concrete Component - a class to be decorated.
public class SimpleCoffee implements Coffee {
    @Override
    public double getCost() { return 1.0; }
    
    @Override
    public String getIngredients() { return "Coffee"; }
}
        `,
            python: `
# The Concrete Component - a class to be decorated.
class SimpleCoffee(Coffee):
    def get_cost(self) -> float:
        return 1.0
        
    def get_ingredients(self) -> str:
        return "Coffee"
        `,
            javascript: `
// The Concrete Component - a class to be decorated.
export class SimpleCoffee extends Coffee {
    getCost() {
        return 1.0;
    }
    
    getIngredients() {
        return "Coffee";
    }
}
        `}},
        { id: 'decorator', type: 'class', label: 'CoffeeDecorator', x: 480, y: 150, width: 200, height: 80, code: { 
            java: `
// The abstract Decorator class. It holds a reference to a
// Component object and conforms to the Component interface.
public abstract class CoffeeDecorator implements Coffee {
    protected final Coffee decoratedCoffee;

    public CoffeeDecorator(Coffee coffee) {
        this.decoratedCoffee = coffee;
    }

    public double getCost() { // Delegation
        return decoratedCoffee.getCost();
    }
    
    public String getIngredients() { // Delegation
        return decoratedCoffee.getIngredients();
    }
}
        `,
            python: `
# The abstract Decorator class.
class CoffeeDecorator(Coffee):
    def __init__(self, coffee: Coffee):
        self._decorated_coffee = coffee

    def get_cost(self) -> float:
        return self._decorated_coffee.get_cost()

    def get_ingredients(self) -> str:
        return self._decorated_coffee.get_ingredients()
        `,
            javascript: `
// The abstract Decorator class.
export class CoffeeDecorator extends Coffee {
    constructor(coffee) {
        super();
        this.decoratedCoffee = coffee;
    }

    getCost() {
        return this.decoratedCoffee.getCost();
    }

    getIngredients() {
        return this.decoratedCoffee.getIngredients();
    }
}
        `}},
        { id: 'concrete-decorator-1', type: 'class', label: 'WithMilk', x: 280, y: 320, width: 200, height: 80, code: { 
            java: `
// A Concrete Decorator. Adds milk to the coffee.
public class WithMilk extends CoffeeDecorator {
    public WithMilk(Coffee c) { super(c); }

    @Override
    public double getCost() {
        return super.getCost() + 0.5;
    }
    
    @Override
    public String getIngredients() {
        return super.getIngredients() + ", Milk";
    }
}
        `,
            python: `
# A Concrete Decorator. Adds milk.
class WithMilk(CoffeeDecorator):
    def get_cost(self) -> float:
        return super().get_cost() + 0.5

    def get_ingredients(self) -> str:
        return super().get_ingredients() + ", Milk"
        `,
            javascript: `
// A Concrete Decorator. Adds milk.
export class WithMilk extends CoffeeDecorator {
    getCost() {
        return super.getCost() + 0.5;
    }

    getIngredients() {
        return super.getIngredients() + ", Milk";
    }
}
        `}},
        { id: 'concrete-decorator-2', type: 'class', label: 'WithSugar', x: 500, y: 320, width: 200, height: 80, code: { 
            java: `
// Another Concrete Decorator. Adds sugar.
public class WithSugar extends CoffeeDecorator {
    public WithSugar(Coffee c) { super(c); }
    
    @Override
    public double getCost() {
        return super.getCost() + 0.2;
    }
    
    @Override
    public String getIngredients() {
        return super.getIngredients() + ", Sugar";
    }
}
        `,
            python: `
# Another Concrete Decorator. Adds sugar.
class WithSugar(CoffeeDecorator):
    def get_cost(self) -> float:
        return super().get_cost() + 0.2

    def get_ingredients(self) -> str:
        return super().get_ingredients() + ", Sugar"
        `,
            javascript: `
// Another Concrete Decorator. Adds sugar.
export class WithSugar extends CoffeeDecorator {
    getCost() {
        return super.getCost() + 0.2;
    }

    getIngredients() {
        return super.getIngredients() + ", Sugar";
    }
}
        `}},
        { id: 'arrow-impl-comp', type: 'arrow', label: '', x: 235, y: 115, arrowType: 'implementation', points: '120,150 V 80 H 350', code: { 
            java: 'Concrete Component implements Component.',
            python: 'Concrete Component implements Component.',
            javascript: 'Concrete Component extends Component.',
        }},
        { id: 'arrow-impl-deco', type: 'arrow', label: '', x: 465, y: 115, arrowType: 'implementation', points: '580,150 V 80 H 350', code: { 
            java: 'Decorator implements Component.',
            python: 'Decorator implements Component.',
            javascript: 'Decorator extends Component.',
        } },
        { id: 'arrow-aggreg', type: 'arrow', x: 460, y: 120, arrowType: 'dependency', points: '480,190 H 450 V 80', label: 'wraps', code: { 
            java: 'Decorator holds a reference to a Component.',
            python: 'Decorator holds a reference to a Component.',
            javascript: 'Decorator holds a reference to a Component.',
        } },
        { id: 'arrow-extends-1', type: 'arrow', label: '', x: 480, y: 275, arrowType: 'implementation', points: '380,320 V 230 H 580', code: { 
            java: 'Concrete Decorators extend the base Decorator.',
            python: 'Concrete Decorators extend the base Decorator.',
            javascript: 'Concrete Decorators extend the base Decorator.',
        } },
        { id: 'arrow-extends-2', type: 'arrow', label: '', x: 590, y: 275, arrowType: 'implementation', points: '600,320 V 230 H 580', code: { 
            java: 'Concrete Decorators extend the base Decorator.',
            python: 'Concrete Decorators extend the base Decorator.',
            javascript: 'Concrete Decorators extend the base Decorator.',
        } }
      ]
    },
    sequenceDiagram: `
<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" font-family="monospace">
  <defs>
    <marker id="seq-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#C9D1D9" />
    </marker>
  </defs>
  <style>
    .lifeline { stroke: #C9D1D9; stroke-width: 1; }
    .activation { fill: #58A6FF; stroke: #C9D1D9; stroke-width: 1; }
    .message { stroke: #C9D1D9; stroke-width: 1; marker-end: url(#seq-arrow); }
    .message-label { fill: #C9D1D9; font-size: 14px; }
    .lifeline-label { fill: #C9D1D9; font-size: 16px; font-weight: bold; }
  </style>

  <text x="75" y="30" class="lifeline-label" text-anchor="middle">:Client</text>
  <line x1="75" y1="40" x2="75" y2="380" class="lifeline" />
  <rect x="70" y="60" width="10" height="200" class="activation" />

  <text x="250" y="30" class="lifeline-label" text-anchor="middle">:WithMilk</text>
  <line x1="250" y1="40" x2="250" y2="380" class="lifeline" />
  <rect x="245" y="80" width="10" height="160" class="activation" />
  
  <text x="425" y="30" class="lifeline-label" text-anchor="middle">:SimpleCoffee</text>
  <line x1="425" y1="40" x2="425" y2="380" class="lifeline" />
  <rect x="420" y="120" width="10" height="40" class="activation" />

  <line x1="75" y1="80" x2="250" y2="80" class="message" />
  <text x="162.5" y="75" class="message-label" text-anchor="middle">1: getCost()</text>

  <line x1="250" y1="120" x2="425" y2="120" class="message" />
  <text x="337.5" y="115" class="message-label" text-anchor="middle">2: getCost()</text>
  
  <line x1="425" y1="140" x2="250" y2="140" class="message" stroke-dasharray="4" />
  <text x="337.5" y="135" class="message-label" text-anchor="middle">3: returns 1.0</text>
  
  <line x1="250" y1="220" x2="75" y2="220" class="message" stroke-dasharray="4" />
  <text x="162.5" y="215" class="message-label" text-anchor="middle">4: returns 1.5</text>
</svg>
    `,
    useCaseDiagram: `
<svg viewBox="0 0 450 300" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <style>
    .actor { stroke: #C9D1D9; stroke-width: 2; }
    .use-case { stroke: #58A6FF; stroke-width: 2; fill: none; }
    .label { fill: #C9D1D9; font-size: 14px; text-anchor: middle; }
    .connector { stroke: #C9D1D9; stroke-width: 1; }
  </style>

  <circle cx="70" cy="110" r="20" fill="none" class="actor" />
  <line x1="70" y1="130" x2="70" y2="180" class="actor" />
  <line x1="40" y1="150" x2="100" y2="150" class="actor" />
  <line x1="70" y1="180" x2="50" y2="230" class="actor" />
  <line x1="70" y1="180" x2="90" y2="230" class="actor" />
  <text x="70" y="250" class="label">Client</text>

  <ellipse cx="280" cy="150" rx="130" ry="40" class="use-case" />
  <text x="280" y="155" class="label">Dynamically Add Features</text>
  
  <line x1="105" y1="150" x2="150" y2="150" class="connector" />
</svg>
    `
  };