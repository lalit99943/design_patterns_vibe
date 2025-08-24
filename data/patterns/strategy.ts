
import { DesignPattern } from '../../types';

export const strategyPattern: DesignPattern = {
    id: 'strategy',
    name: 'Strategy',
    category: 'Behavioral',
    description: 'Define a family of algorithms, encapsulate each one, and make them interchangeable. Strategy lets the algorithm vary independently from clients that use it.',
    whenToUse: [
        'When you want to use different variants of an algorithm within an object and be able to switch from one algorithm to another during runtime.',
        'When you have a lot of similar classes that only differ in the way they execute some behavior.',
        'To isolate the business logic of a class from the implementation details of its algorithms.'
    ],
    whenNotToUse: [
        'For simple algorithms that are not expected to change, the pattern can be overkill.',
        'If you only have one algorithm, there is no need to encapsulate it in a separate class.',
        'Clients must be aware of the different strategies to be able to select one. This can add complexity to the client code.'
    ],
    comparison: `
**Strategy vs. State:** The Strategy pattern is about providing different ways to do the *same* thing, and the client usually chooses the strategy. The State pattern is about managing an object's behavior as its state changes, and the state transitions are handled internally. The UML diagrams are very similar, but the intent is different.

**Strategy vs. Template Method:** The Template Method pattern uses inheritance to vary parts of an algorithm. A subclass overrides specific steps of the algorithm defined in the superclass. The Strategy pattern uses composition to vary the entire algorithm. The context object delegates the behavior to a separate strategy object.
    `,
    diagram: {
        viewBox: "0 0 600 400",
        components: [
            { id: 'context', type: 'class', label: 'ShoppingCart', x: 200, y: 20, width: 200, height: 80, code: { 
                java: `
// The Context maintains a reference to a Strategy object.
public class ShoppingCart {
    private PaymentStrategy paymentStrategy;
    
    public void setPaymentStrategy(PaymentStrategy strategy) {
        this.paymentStrategy = strategy;
    }
    
    public void checkout(int amount) {
        // ...
        paymentStrategy.pay(amount);
    }
}
            `,
                python: `
# The Context maintains a reference to a Strategy object.
class ShoppingCart:
    def __init__(self):
        self._payment_strategy: 'PaymentStrategy' = None
    
    def set_payment_strategy(self, strategy: 'PaymentStrategy'):
        self._payment_strategy = strategy
    
    def checkout(self, amount: int):
        # ...
        if self._payment_strategy:
            self._payment_strategy.pay(amount)
        else:
            print("Please select a payment strategy.")
            `,
                javascript: `
// The Context maintains a reference to a Strategy object.
export class ShoppingCart {
    constructor() {
        this.paymentStrategy = null;
    }

    setPaymentStrategy(strategy) {
        this.paymentStrategy = strategy;
    }

    checkout(amount) {
        // ...
        if (this.paymentStrategy) {
            this.paymentStrategy.pay(amount);
        } else {
            console.log("Please select a payment strategy.");
        }
    }
}
            `}},
            { id: 'strategy-interface', type: 'interface', label: 'PaymentStrategy', x: 200, y: 300, width: 200, height: 60, code: { 
                java: `
// The Strategy interface is common to all supported algorithms.
public interface PaymentStrategy {
    void pay(int amount);
}
            `,
                python: `
from abc import ABC, abstractmethod

# The Strategy interface is common to all supported algorithms.
class PaymentStrategy(ABC):
    @abstractmethod
    def pay(self, amount: int):
        pass
            `,
                javascript: `
// The Strategy interface is common to all supported algorithms.
export class PaymentStrategy {
    pay(amount) {
        throw new Error("Method 'pay()' must be implemented.");
    }
}
            `}},
            { id: 'strategy-1', type: 'class', label: 'CreditCardStrategy', x: 20, y: 180, width: 200, height: 60, code: { 
                java: `
// A Concrete Strategy
public class CreditCardStrategy implements PaymentStrategy {
    @Override
    public void pay(int amount) {
        System.out.println("Paying " + amount + " with Credit Card.");
    }
}
            `,
                python: `
# A Concrete Strategy
class CreditCardStrategy(PaymentStrategy):
    def pay(self, amount: int):
        print(f"Paying {amount} with Credit Card.")
            `,
                javascript: `
import { PaymentStrategy } from './PaymentStrategy.js';
// A Concrete Strategy
export class CreditCardStrategy extends PaymentStrategy {
    pay(amount) {
        console.log(\`Paying \${amount} with Credit Card.\`);
    }
}
            `}},
            { id: 'strategy-2', type: 'class', label: 'PayPalStrategy', x: 380, y: 180, width: 200, height: 60, code: { 
                java: `
// Another Concrete Strategy
public class PayPalStrategy implements PaymentStrategy {
    @Override
    public void pay(int amount) {
        System.out.println("Paying " + amount + " with PayPal.");
    }
}
            `,
                python: `
# Another Concrete Strategy
class PayPalStrategy(PaymentStrategy):
    def pay(self, amount: int):
        print(f"Paying {amount} with PayPal.")
            `,
                javascript: `
import { PaymentStrategy } from './PaymentStrategy.js';
// Another Concrete Strategy
export class PayPalStrategy extends PaymentStrategy {
    pay(amount) {
        console.log(\`Paying \${amount} with PayPal.\`);
    }
}
            `}},
            { id: 'arrow-context-uses', type: 'arrow', label: 'uses', x: 300, y: 200, arrowType: 'dependency', points: '300,100 V 300', code: { java: 'The Context delegates the work to its Strategy object.'}},
            { id: 'arrow-impl-1', type: 'arrow', label: '', arrowType: 'implementation', x: 210, y: 270, points: '120,240 V 300 H 300', code: { java: 'Concrete strategies implement the strategy interface.'}},
            { id: 'arrow-impl-2', type: 'arrow', label: '', arrowType: 'implementation', x: 390, y: 270, points: '480,240 V 300 H 300', code: { java: 'Concrete strategies implement the strategy interface.'}}
        ]
    },
    sequenceDiagram: `
<svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg" font-family="monospace">
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

  <text x="250" y="30" class="lifeline-label" text-anchor="middle">:Context</text>
  <line x1="250" y1="40" x2="250" y2="380" class="lifeline" />
  <rect x="245" y="80" width="10" height="160" class="activation" />
  
  <text x="425" y="30" class="lifeline-label" text-anchor="middle">:ConcreteStrategy</text>
  <line x1="425" y1="40" x2="425" y2="380" class="lifeline" />
  <rect x="420" y="180" width="10" height="40" class="activation" />

  <line x1="75" y1="80" x2="250" y2="80" class="message" />
  <text x="162.5" y="75" class="message-label" text-anchor="middle">1: setStrategy(strategy)</text>
  
  <line x1="75" y1="140" x2="250" y2="140" class="message" />
  <text x="162.5" y="135" class="message-label" text-anchor="middle">2: contextInterface()</text>
  
  <line x1="250" y1="180" x2="425" y2="180" class="message" />
  <text x="337.5" y="175" class="message-label" text-anchor="middle">3: algorithm()</text>
</svg>
    `,
    useCaseDiagram: `
<svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
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

  <ellipse cx="280" cy="150" rx="150" ry="40" class="use-case" />
  <text x="280" y="155" class="label">Select Algorithm at Runtime</text>
  
  <line x1="105" y1="150" x2="130" y2="150" class="connector" />
</svg>
    `
  };
