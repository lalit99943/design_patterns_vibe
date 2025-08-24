import { DesignPattern } from '../../types';

export const observerPattern: DesignPattern = {
    id: 'observer',
    name: 'Observer',
    category: 'Behavioral',
    description: 'Defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.',
    whenToUse: [
      'When changes to one object require changing others, and you don\'t know how many objects need to be changed.',
      'To implement event handling systems, like UI components reacting to model changes in MVC architecture.',
      'When objects should be loosely coupled. The subject only knows that its observers implement the Observer interface.',
      'In publish/subscribe systems where subscribers are interested in specific events from a publisher.'
    ],
    whenNotToUse: [
        'If observers are not properly managed (e.g., unregistered), it can lead to memory leaks (the "lapsed listener" problem).',
        'The order of notification to observers is not guaranteed, which can be an issue in systems that require a specific sequence of updates.',
        'Can lead to complex, cascading updates that are difficult to debug if not carefully designed.',
        'For simple cases, it might be overkill compared to direct method calls.'
    ],
    comparison: `
**Observer vs. Publisher/Subscriber (Pub/Sub):** These patterns are very similar, and the terms are often used interchangeably. The key difference is that in the classic Observer pattern, the Subject holds direct references to its Observers. In a Pub/Sub system, there is often a third component, a broker or event bus, that sits between publishers and subscribers. This decouples them even further; publishers and subscribers do not need to know about each other's existence.

**Observer vs. Chain of Responsibility:** The Observer pattern broadcasts a notification to all interested subscribers. In contrast, the Chain of Responsibility pattern passes a request along a chain of handlers until one of them handles it, at which point the chain is typically broken. Observer is a "one-to-many" broadcast, while Chain of Responsibility is a "one-to-one-of-many" delegation.
    `,
    diagram: {
        viewBox: "0 0 500 400",
        components: [
          { id: 'subject-interface', type: 'interface', label: 'Subject', x: 150, y: 20, width: 200, height: 90, code: { 
              java: `
// The Subject interface. Objects use this interface to register as
// observers and also to unregister themselves.
public interface Subject {
    void registerObserver(Observer o);
    void removeObserver(Observer o);
    void notifyObservers();
}
          `,
              python: `
from abc import ABC, abstractmethod

# The Subject interface.
class Subject(ABC):
    @abstractmethod
    def register_observer(self, observer: 'Observer'):
        pass

    @abstractmethod
    def remove_observer(self, observer: 'Observer'):
        pass

    @abstractmethod
    def notify_observers(self):
        pass
          `,
              javascript: `
// The Subject interface (simulated).
export class Subject {
    registerObserver(o) {}
    removeObserver(o) {}
    notifyObservers() {}
}
          `}},
          { id: 'observer-interface', type: 'interface', label: 'Observer', x: 150, y: 300, width: 200, height: 60, code: { 
              java: `
// The Observer interface. All potential observers need to implement
// this interface.
public interface Observer {
    void update(String stockSymbol, double price);
}
          `,
              python: `
from abc import ABC, abstractmethod

# The Observer interface.
class Observer(ABC):
    @abstractmethod
    def update(self, stock_symbol: str, price: float):
        pass
          `,
              javascript: `
// The Observer interface (simulated).
export class Observer {
    update(stockSymbol, price) {}
}
          `}},
          { id: 'concrete-subject', type: 'class', label: 'StockTicker', x: 20, y: 150, width: 200, height: 100, code: { 
              java: `
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Component;

// Concrete Subject
@Component
public class StockTicker implements Subject {
    private List<Observer> observers = new ArrayList<>();
    private String stockSymbol;
    private double price;

    @Override
    public void registerObserver(Observer o) { observers.add(o); }

    @Override
    public void removeObserver(Observer o) { observers.remove(o); }

    @Override
    public void notifyObservers() {
        for (Observer observer : observers) {
            observer.update(stockSymbol, price);
        }
    }

    public void setStockData(String symbol, double price) {
        this.stockSymbol = symbol;
        this.price = price;
        System.out.println("Stock Ticker updated: " + symbol + " is now " + price);
        notifyObservers(); // Notify observers on state change
    }
}
          `,
              python: `
# Concrete Subject
class StockTicker(Subject):
    def __init__(self):
        self._observers = []
        self._stock_symbol = ""
        self._price = 0.0

    def register_observer(self, observer: 'Observer'):
        self._observers.append(observer)

    def remove_observer(self, observer: 'Observer'):
        self._observers.remove(observer)

    def notify_observers(self):
        for observer in self._observers:
            observer.update(self._stock_symbol, self._price)

    def set_stock_data(self, symbol: str, price: float):
        self._stock_symbol = symbol
        self._price = price
        print(f"Stock Ticker updated: {symbol} is now {price}")
        self.notify_observers()
          `,
              javascript: `
// Concrete Subject
export class StockTicker extends Subject {
    constructor() {
        super();
        this.observers = [];
        this.stockSymbol = '';
        this.price = 0;
    }

    registerObserver(o) { this.observers.push(o); }
    removeObserver(o) {
        this.observers = this.observers.filter(obs => obs !== o);
    }
    notifyObservers() {
        for (const observer of this.observers) {
            observer.update(this.stockSymbol, this.price);
        }
    }

    setStockData(symbol, price) {
        this.stockSymbol = symbol;
        this.price = price;
        console.log(\`Stock Ticker updated: \${symbol} is now \${price}\`);
        this.notifyObservers();
    }
}
          `}},
          { id: 'concrete-observer', type: 'class', label: 'MobileAppDisplay', x: 280, y: 150, width: 200, height: 100, code: { 
              java: `
import org.springframework.stereotype.Component;

// Concrete Observer
@Component
public class MobileAppDisplay implements Observer {
    private String stockSymbol;
    private double price;

    @Override
    public void update(String stockSymbol, double price) {
        this.stockSymbol = stockSymbol;
        this.price = price;
        display();
    }
    
    public void display() {
        System.out.println("Mobile App: Stock " + stockSymbol + " updated to " + price);
    }
}
          `,
              python: `
# Concrete Observer
class MobileAppDisplay(Observer):
    def __init__(self):
        self._stock_symbol = ""
        self._price = 0.0

    def update(self, stock_symbol: str, price: float):
        self._stock_symbol = stock_symbol
        self._price = price
        self.display()

    def display(self):
        print(f"Mobile App: Stock {self._stock_symbol} updated to {self._price}")
          `,
              javascript: `
// Concrete Observer
export class MobileAppDisplay extends Observer {
    constructor() {
        super();
        this.stockSymbol = '';
        this.price = 0;
    }

    update(stockSymbol, price) {
        this.stockSymbol = stockSymbol;
        this.price = price;
        this.display();
    }

    display() {
        console.log(\`Mobile App: Stock \${this.stockSymbol} updated to \${this.price}\`);
    }
}
          `}},
          { id: 'arrow-subject-impl', type: 'arrow', label: '', arrowType: 'implementation', x: 185, y: 130, points: "120,150 V 110 H 250", code: { java: "StockTicker implements the Subject interface." } },
          { id: 'arrow-observer-impl', type: 'arrow', label: '', arrowType: 'implementation', x: 315, y: 275, points: "380,150 V 250 C 380,280 250,280 250,300", code: { java: "MobileAppDisplay implements the Observer interface." } },
          { id: 'arrow-dependency', type: 'arrow', label: 'holds & notifies', arrowType: 'dependency', x: 250, y: 275, points: "220,200 C 280,220 280,280 250,300", code: { java: "The Subject (StockTicker) holds a list of its Observers and notifies them when its state changes. It depends on the Observer interface, not on any concrete observer class, which promotes loose coupling." } },
        ]
    },
    sequenceDiagram: `
<svg viewBox="0 0 650 450" xmlns="http://www.w3.org/2000/svg" font-family="monospace">
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
    .loop-box { stroke: #C9D1D9; stroke-width: 1; fill: none; stroke-dasharray: 4; }
  </style>

  <!-- Lifelines -->
  <text x="75" y="30" class="lifeline-label" text-anchor="middle">:Client</text>
  <line x1="75" y1="40" x2="75" y2="430" class="lifeline" />
  <rect x="70" y="60" width="10" height="320" class="activation" />

  <text x="250" y="30" class="lifeline-label" text-anchor="middle">:StockTicker</text>
  <line x1="250" y1="40" x2="250" y2="430" class="lifeline" />
  <rect x="245" y="80" width="10" height="280" class="activation" />
  
  <text x="425" y="30" class="lifeline-label" text-anchor="middle">:Observer1</text>
  <line x1="425" y1="40" x2="425" y2="430" class="lifeline" />
  <rect x="420" y="240" width="10" height="40" class="activation" />
  
  <text x="575" y="30" class="lifeline-label" text-anchor="middle">:Observer2</text>
  <line x1="575" y1="40" x2="575" y2="430" class="lifeline" />
  <rect x="570" y="300" width="10" height="40" class="activation" />

  <!-- Messages -->
  <line x1="75" y1="80" x2="250" y2="80" class="message" />
  <text x="162.5" y="75" class="message-label" text-anchor="middle">1: setState()</text>
  
  <path d="M 250 100 C 300 100, 300 120, 250 120" stroke="#C9D1D9" stroke-width="1" fill="none" marker-end="url(#seq-arrow)" />
  <text x="310" y="115" class="message-label" text-anchor="middle">2: notifyObservers()</text>
  
  <!-- Loop -->
  <rect x="230" y="150" width="380" height="220" class="loop-box" />
  <text x="240" y="170" class="message-label">[for each observer]</text>

  <line x1="250" y1="240" x2="425" y2="240" class="message" />
  <text x="337.5" y="235" class="message-label" text-anchor="middle">3.1: update()</text>
  
  <line x1="250" y1="300" x2="575" y2="300" class="message" />
  <text x="412.5" y="295" class="message-label" text-anchor="middle">3.2: update()</text>
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

  <!-- Actor 1 -->
  <circle cx="70" cy="80" r="20" fill="none" class="actor" />
  <line x1="70" y1="100" x2="70" y2="150" class="actor" />
  <line x1="40" y1="120" x2="100" y2="120" class="actor" />
  <line x1="70" y1="150" x2="50" y2="200" class="actor" />
  <line x1="70" y1="150" x2="90" y2="200" class="actor" />
  <text x="70" y="220" class="label">Triggering System</text>

  <!-- Actor 2 -->
  <circle cx="430" cy="80" r="20" fill="none" class="actor" />
  <line x1="430" y1="100" x2="430" y2="150" class="actor" />
  <line x1="400" y1="120" x2="460" y2="120" class="actor" />
  <line x1="430" y1="150" x2="410" y2="200" class="actor" />
  <line x1="430" y1="150" x2="450" y2="200" class="actor" />
  <text x="430" y="220" class="label">Interested Party</text>

  <!-- Use Case -->
  <ellipse cx="250" cy="120" rx="110" ry="40" class="use-case" />
  <text x="250" y="125" class="label">Update on State Change</text>
  
  <!-- Connections -->
  <line x1="100" y1="120" x2="140" y2="120" class="connector" />
  <line x1="360" y1="120" x2="400" y2="120" class="connector" />
</svg>
    `
  };