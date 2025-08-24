
import { DesignPattern } from '../../types';

export const facadePattern: DesignPattern = {
    id: 'facade',
    name: 'Facade',
    category: 'Structural',
    description: 'Provide a unified interface to a set of interfaces in a subsystem. Facade defines a higher-level interface that makes the subsystem easier to use.',
    whenToUse: [
      'When you want to provide a simple interface to a complex subsystem.',
      'When there are many dependencies between clients and the implementation classes of an abstraction.',
      'When you want to layer your subsystems. Use a facade to define an entry point to each subsystem level.'
    ],
    whenNotToUse: [
      'For very simple subsystems, a facade can add unnecessary complexity.',
      'If clients need direct access to the underlying subsystem components, the facade can be restrictive.',
      'A facade can become a "god object" if it takes on too many responsibilities from the subsystem.'
    ],
    comparison: `
**Facade vs. Adapter:** A Facade defines a *new*, simplified interface for a system, whereas an Adapter *reuses* an existing interface and adapts an incompatible class to it. Facades are for simplifying, Adapters are for adapting.

**Facade vs. Abstract Factory:** A Facade's purpose is to hide complexity, while an Abstract Factory's purpose is to create families of related objects. A facade often manages existing objects, while an abstract factory creates new ones.
    `,
    diagram: {
      viewBox: "0 0 600 400",
      components: [
        { id: 'facade', type: 'class', label: 'OrderFulfillmentFacade', x: 200, y: 20, width: 200, height: 80, code: { 
            java: `
import org.springframework.stereotype.Service;

// The Facade class provides a simple interface to the complex subsystem.
@Service
public class OrderFulfillmentFacade {
    private final InventoryService inventory;
    private final PaymentService payment;
    private final ShippingService shipping;

    // In Spring, dependencies are injected.
    public OrderFulfillmentFacade(InventoryService i, PaymentService p, ShippingService s) {
        this.inventory = i;
        this.payment = p;
        this.shipping = s;
    }

    public boolean placeOrder(String productId, int amount) {
        if (!inventory.isAvailable(productId)) return false;
        
        payment.processPayment(amount);
        shipping.shipProduct(productId);
        
        return true;
    }
}
        `,
            python: `
# The Facade class provides a simple interface to the complex subsystem.
class OrderFulfillmentFacade:
    def __init__(self, inventory: 'InventoryService', payment: 'PaymentService', shipping: 'ShippingService'):
        self._inventory = inventory
        self._payment = payment
        self._shipping = shipping

    def place_order(self, product_id: str, amount: int) -> bool:
        if not self._inventory.is_available(product_id):
            return False
        
        self._payment.process_payment(amount)
        self._shipping.ship_product(product_id)
        
        return True
        `,
            javascript: `
// The Facade class provides a simple interface to the complex subsystem.
export class OrderFulfillmentFacade {
    constructor(inventory, payment, shipping) {
        this.inventory = inventory;
        this.payment = payment;
        this.shipping = shipping;
    }

    placeOrder(productId, amount) {
        if (!this.inventory.isAvailable(productId)) {
            return false;
        }
        
        this.payment.processPayment(amount);
        this.shipping.shipProduct(productId);
        
        return true;
    }
}
        `}},
        { id: 'subsystem-1', type: 'class', label: 'InventoryService', x: 20, y: 250, width: 160, height: 60, code: { 
            java: `
@Service
public class InventoryService {
    public boolean isAvailable(String productId) {
        System.out.println("Checking inventory for " + productId);
        return true;
    }
}
        `,
            python: `
class InventoryService:
    def is_available(self, product_id: str) -> bool:
        print(f"Checking inventory for {product_id}")
        return True
        `,
            javascript: `
export class InventoryService {
    isAvailable(productId) {
        console.log(\`Checking inventory for \${productId}\`);
        return true;
    }
}
        `}},
        { id: 'subsystem-2', type: 'class', label: 'PaymentService', x: 220, y: 250, width: 160, height: 60, code: { 
            java: `
@Service
public class PaymentService {
    public void processPayment(int amount) {
        System.out.println("Processing payment of $" + amount);
    }
}
        `,
            python: `
class PaymentService:
    def process_payment(self, amount: int) -> None:
        print(f"Processing payment of {amount}")
        `,
            javascript: `
export class PaymentService {
    processPayment(amount) {
        console.log(\`Processing payment of $\${amount}\`);
    }
}
        `}},
        { id: 'subsystem-3', type: 'class', label: 'ShippingService', x: 420, y: 250, width: 160, height: 60, code: { 
            java: `
@Service
public class ShippingService {
    public void shipProduct(String productId) {
        System.out.println("Shipping product " + productId);
    }
}
        `,
            python: `
class ShippingService:
    def ship_product(self, product_id: str) -> None:
        print(f"Shipping product {product_id}")
        `,
            javascript: `
export class ShippingService {
    shipProduct(productId) {
        console.log(\`Shipping product \${productId}\`);
    }
}
        `}},
        { id: 'arrow-1', type: 'arrow', x: 200, y: 175, arrowType: 'dependency', points: '300,100 V 200 H 100 V 250', label: 'uses', code: { 
            java: 'Facade delegates client requests to appropriate subsystem objects.',
            python: 'Facade delegates client requests to appropriate subsystem objects.',
            javascript: 'Facade delegates client requests to appropriate subsystem objects.',
        }},
        { id: 'arrow-2', type: 'arrow', x: 300, y: 175, arrowType: 'dependency', points: '300,100 V 250', label: 'uses', code: { 
            java: 'Facade delegates client requests to appropriate subsystem objects.',
            python: 'Facade delegates client requests to appropriate subsystem objects.',
            javascript: 'Facade delegates client requests to appropriate subsystem objects.',
        }},
        { id: 'arrow-3', type: 'arrow', x: 400, y: 175, arrowType: 'dependency', points: '300,100 V 200 H 500 V 250', label: 'uses', code: { 
            java: 'Facade delegates client requests to appropriate subsystem objects.',
            python: 'Facade delegates client requests to appropriate subsystem objects.',
            javascript: 'Facade delegates client requests to appropriate subsystem objects.',
        }}
      ]
    },
    sequenceDiagram: `
<svg viewBox="0 0 650 400" xmlns="http://www.w3.org/2000/svg" font-family="monospace">
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
  <rect x="70" y="60" width="10" height="240" class="activation" />

  <text x="250" y="30" class="lifeline-label" text-anchor="middle">:Facade</text>
  <line x1="250" y1="40" x2="250" y2="380" class="lifeline" />
  <rect x="245" y="80" width="10" height="200" class="activation" />
  
  <text x="400" y="30" class="lifeline-label" text-anchor="middle">:Inventory</text>
  <line x1="400" y1="40" x2="400" y2="380" class="lifeline" />
  <rect x="395" y="100" width="10" height="20" class="activation" />
  
  <text x="500" y="30" class="lifeline-label" text-anchor="middle">:Payment</text>
  <line x1="500" y1="40" x2="500" y2="380" class="lifeline" />
  <rect x="495" y="160" width="10" height="20" class="activation" />
  
  <text x="600" y="30" class="lifeline-label" text-anchor="middle">:Shipping</text>
  <line x1="600" y1="40" x2="600" y2="380" class="lifeline" />
  <rect x="595" y="220" width="10" height="20" class="activation" />

  <line x1="75" y1="80" x2="250" y2="80" class="message" />
  <text x="162.5" y="75" class="message-label" text-anchor="middle">1: placeOrder()</text>
  
  <line x1="250" y1="100" x2="400" y2="100" class="message" />
  <text x="325" y="95" class="message-label" text-anchor="middle">2: isAvailable()</text>
  
  <line x1="250" y1="160" x2="500" y2="160" class="message" />
  <text x="375" y="155" class="message-label" text-anchor="middle">3: processPayment()</text>
  
  <line x1="250" y1="220" x2="600" y2="220" class="message" />
  <text x="425" y="215" class="message-label" text-anchor="middle">4: shipProduct()</text>
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
  <text x="280" y="155" class="label">Simplify Access to Subsystem</text>
  
  <line x1="105" y1="150" x2="130" y2="150" class="connector" />
</svg>
    `
  };