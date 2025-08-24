import { DesignPattern } from '../../types';

export const prototypePattern: DesignPattern = {
    id: 'prototype',
    name: 'Prototype',
    category: 'Creational',
    description: 'Specifies the kinds of objects to create using a prototypical instance, and creates new objects by copying (cloning) this prototype.',
    whenToUse: [
      'When creating an object is expensive (e.g., requires a database call or complex computation).',
      'When you want to avoid a class hierarchy of factories that parallels the product class hierarchy.',
      'When instances of a class can have one of a few different states. It can be more convenient to pre-configure prototypes and clone them.',
      'To reduce the number of subclasses by letting a client specify new objects by varying their structure or state.'
    ],
    whenNotToUse: [
      'For simple objects that don\'t have a complex state or expensive construction logic.',
      'When an object contains circular references, as cloning can become very tricky to implement correctly.',
      'The pattern hides the concrete product classes from the client. While this promotes loose coupling, it can reduce clarity in some cases.',
      'Implementing `clone` can be difficult, especially when dealing with a mix of shallow and deep copying requirements.'
    ],
    comparison: `
**Prototype vs. Factory Method:** With Factory Method, you create an object through subclassing the creator. With Prototype, you create an object by cloning an existing instance. The Prototype pattern doesn't require subclasses for each new product; you just need a new prototype instance.

**Prototype vs. Singleton:** These are opposites in intent. The Singleton pattern ensures you have *only one* instance of a class. The Prototype pattern is all about creating *many new instances* by copying an original one.
    `,
    diagram: {
      viewBox: "0 0 500 400",
      components: [
        { id: 'prototype-interface', type: 'interface', label: 'Shape', x: 150, y: 20, width: 200, height: 60, code: { 
            java: `
// The Prototype Interface
// Requires a 'clone' method.
// In Java, this is often done by implementing the Cloneable marker interface.
public interface Shape extends Cloneable {
    Shape clone();
    void draw();
}
        `,
            python: `
from abc import ABC, abstractmethod
import copy

# The Prototype Interface (ABC)
class Shape(ABC):
    @abstractmethod
    def clone(self) -> 'Shape':
        pass
        
    @abstractmethod
    def draw(self):
        pass
        `,
            javascript: `
// The Prototype Interface (simulated as a class)
export class Shape {
    clone() {
        throw new Error("Method 'clone()' must be implemented.");
    }
    
    draw() {
        throw new Error("Method 'draw()' must be implemented.");
    }
}
        `}},
        { id: 'concrete-prototype-1', type: 'class', label: 'Circle', x: 20, y: 150, width: 200, height: 80, code: { 
            java: `
// A Concrete Prototype
public class Circle implements Shape {
    private int radius;
    
    public Circle(int radius) { this.radius = radius; }
    
    @Override
    public Shape clone() {
        try {
            return (Shape) super.clone(); // Shallow copy
        } catch (CloneNotSupportedException e) {
            return null;
        }
    }

    @Override
    public void draw() { /* ... */ }
}
        `,
            python: `
# A Concrete Prototype
class Circle(Shape):
    def __init__(self, radius: int):
        self.radius = radius
        
    def clone(self) -> 'Shape':
        # Use Python's copy module for shallow copy
        return copy.copy(self)
        
    def draw(self):
        print(f"Drawing a circle with radius {self.radius}")
        `,
            javascript: `
// A Concrete Prototype
export class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }

    clone() {
        // Shallow copy is often sufficient for simple objects
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }
    
    draw() {
        console.log(\`Drawing a circle with radius \${this.radius}\`);
    }
}
        `}},
        { id: 'concrete-prototype-2', type: 'class', label: 'Rectangle', x: 280, y: 150, width: 200, height: 80, code: { 
            java: `
// Another Concrete Prototype
public class Rectangle implements Shape {
    private int width, height;

    public Rectangle(int w, int h) { this.width = w; this.height = h; }

    @Override
    public Shape clone() {
        try {
            return (Shape) super.clone(); // Shallow copy
        } catch (CloneNotSupportedException e) {
            return null;
        }
    }
    
    @Override
    public void draw() { /* ... */ }
}
        `,
            python: `
# Another Concrete Prototype
class Rectangle(Shape):
    def __init__(self, width: int, height: int):
        self.width = width
        self.height = height

    def clone(self) -> 'Shape':
        return copy.copy(self)

    def draw(self):
        print(f"Drawing a {self.width}x{self.height} rectangle")
        `,
            javascript: `
// Another Concrete Prototype
export class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    clone() {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }
    
    draw() {
        console.log(\`Drawing a \${this.width}x\${this.height} rectangle\`);
    }
}
        `}},
        { id: 'registry', type: 'class', label: 'ShapeRegistry', x: 150, y: 300, width: 200, height: 80, code: { 
            java: `
import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Component;

// A registry to store and retrieve prototypes.
@Component
public class ShapeRegistry {
    private Map<String, Shape> cache = new HashMap<>();

    public ShapeRegistry() {
        // Pre-configure and store prototypes
        cache.put("Big Red Circle", new Circle(100));
        cache.put("Small Blue Rectangle", new Rectangle(20, 40));
    }

    public Shape get(String key) {
        Shape cachedShape = cache.get(key);
        // Return a clone, not the original instance
        return cachedShape.clone();
    }
}
        `,
            python: `
# A registry to store and retrieve prototypes.
class ShapeRegistry:
    def __init__(self):
        self._cache = {}
        self._load_cache()

    def _load_cache(self):
        self._cache["Big Red Circle"] = Circle(100)
        self._cache["Small Blue Rectangle"] = Rectangle(20, 40)
    
    def get(self, key: str) -> 'Shape':
        cached_shape = self._cache.get(key)
        # Return a clone, not the original instance
        return cached_shape.clone()
        `,
            javascript: `
// A registry to store and retrieve prototypes.
export class ShapeRegistry {
    constructor() {
        this.cache = {};
        this.loadCache();
    }

    loadCache() {
        this.cache["Big Red Circle"] = new Circle(100);
        this.cache["Small Blue Rectangle"] = new Rectangle(20, 40);
    }

    get(key) {
        const cachedShape = this.cache[key];
        // Return a clone, not the original instance
        return cachedShape ? cachedShape.clone() : null;
    }
}
        `}},
        { id: 'arrow-impl-1', type: 'arrow', label: '', arrowType: 'implementation', x: 185, y: 115, points: "120,150 V 80 H 250", code: { java: "Circle implements the Shape interface." } },
        { id: 'arrow-impl-2', type: 'arrow', label: '', arrowType: 'implementation', x: 315, y: 115, points: "380,150 V 80 H 250", code: { java: "Rectangle implements the Shape interface." } },
        { id: 'arrow-uses-1', type: 'arrow', label: 'uses', arrowType: 'dependency', x: 180, y: 240, points: "250,300 V 230 C 250,150 120,150 120,150", code: { java: "The registry holds prototype instances of concrete shapes." } },
        { id: 'arrow-uses-2', type: 'arrow', label: 'uses', arrowType: 'dependency', x: 310, y: 240, points: "250,300 V 230 C 250,150 380,150 380,150", code: { java: "The registry holds prototype instances of concrete shapes." } }
      ]
    },
    sequenceDiagram: `
<svg viewBox="0 0 600 450" xmlns="http://www.w3.org/2000/svg" font-family="monospace">
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

  <!-- Lifelines -->
  <text x="75" y="30" class="lifeline-label" text-anchor="middle">:Client</text>
  <line x1="75" y1="40" x2="75" y2="430" class="lifeline" />
  <rect x="70" y="60" width="10" height="200" class="activation" />

  <text x="275" y="30" class="lifeline-label" text-anchor="middle">:ShapeRegistry</text>
  <line x1="275" y1="40" x2="275" y2="430" class="lifeline" />
  <rect x="270" y="80" width="10" height="160" class="activation" />
  
  <text x="475" y="30" class="lifeline-label" text-anchor="middle">:CirclePrototype</text>
  <line x1="475" y1="40" x2="475" y2="430" class="lifeline" />
  <rect x="470" y="140" width="10" height="40" class="activation" />

  <!-- Messages -->
  <line x1="75" y1="80" x2="275" y2="80" class="message" />
  <text x="175" y="75" class="message-label" text-anchor="middle">1: get("Big Circle")</text>
  
  <line x1="275" y1="140" x2="475" y2="140" class="message" />
  <text x="375" y="135" class="message-label" text-anchor="middle">2: clone()</text>
  
  <line x1="475" y1="160" x2="275" y2="160" class="message" stroke-dasharray="4" />
  <text x="375" y="155" class="message-label" text-anchor="middle">3: returns new Circle()</text>
  
  <line x1="275" y1="220" x2="75" y2="220" class="message" stroke-dasharray="4" />
  <text x="175" y="215" class="message-label" text-anchor="middle">4: returns cloned circle</text>
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

  <!-- Actor -->
  <circle cx="70" cy="110" r="20" fill="none" class="actor" />
  <line x1="70" y1="130" x2="70" y2="180" class="actor" />
  <line x1="40" y1="150" x2="100" y2="150" class="actor" />
  <line x1="70" y1="180" x2="50" y2="230" class="actor" />
  <line x1="70" y1="180" x2="90" y2="230" class="actor" />
  <text x="70" y="250" class="label">Game Engine</text>

  <!-- Use Case -->
  <ellipse cx="300" cy="150" rx="150" ry="40" class="use-case" />
  <text x="300" y="155" class="label">Clone Pre-configured Game Objects</text>
  
  <!-- Connection -->
  <line x1="105" y1="150" x2="150" y2="150" class="connector" />
</svg>
    `
  };