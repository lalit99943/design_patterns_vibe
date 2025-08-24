import { DesignPattern } from '../../types';

export const flyweightPattern: DesignPattern = {
    id: 'flyweight',
    name: 'Flyweight',
    category: 'Structural',
    description: 'Use sharing to support large numbers of fine-grained objects efficiently. A flyweight is a shared object that can be used in multiple contexts simultaneously.',
    whenToUse: [
      'When an application uses a large number of objects.',
      'When most of an object\'s state can be made extrinsic (stored outside the object).',
      'When many groups of objects may be replaced by relatively few shared objects once extrinsic state is removed.',
      'When the application doesn\'t depend on object identity.'
    ],
    whenNotToUse: [
      'When objects are not numerous enough to cause memory issues.',
      'If the objects have a lot of intrinsic (unique) state that cannot be shared.',
      'The pattern introduces complexity by splitting an object\'s state, which can make the code harder to understand.'
    ],
    comparison: `
**Flyweight vs. Singleton:** The Singleton pattern ensures there is only one instance of a class. The Flyweight pattern allows for multiple instances of a class, but these instances are shared among multiple clients. You can think of the flyweight factory as a manager of a pool of singletons, one for each type of flyweight.

**Flyweight vs. Composite:** Flyweights can be used to implement the leaf nodes of a Composite tree, especially when you have many identical leaves. For example, every character in a text editor could be a flyweight.
    `,
    diagram: {
      viewBox: "0 0 600 450",
      components: [
        { id: 'factory', type: 'class', label: 'TreeTypeFactory', x: 200, y: 20, width: 200, height: 80, code: { 
            java: `
import java.util.HashMap;
import java.util.Map;

// The Flyweight Factory creates and manages flyweight objects.
public class TreeTypeFactory {
    static Map<String, TreeType> treeTypes = new HashMap<>();

    public static TreeType getTreeType(String name, String color) {
        String key = name + "-" + color;
        TreeType result = treeTypes.get(key);
        if (result == null) {
            result = new TreeType(name, color); // Create new flyweight
            treeTypes.put(key, result);
            System.out.println("Creating new flyweight for: " + key);
        }
        return result;
    }
}
        `,
            python: `
from typing import Dict

# The Flyweight Factory creates and manages flyweight objects.
class TreeTypeFactory:
    _tree_types: Dict[str, 'TreeType'] = {}

    @classmethod
    def get_tree_type(cls, name: str, color: str) -> 'TreeType':
        key = f"{name}-{color}"
        if key not in cls._tree_types:
            print(f"Creating new flyweight for: {key}")
            cls._tree_types[key] = TreeType(name, color)
        
        return cls._tree_types[key]
        `,
            javascript: `
// The Flyweight Factory creates and manages flyweight objects.
export class TreeTypeFactory {
    static treeTypes = {};

    static getTreeType(name, color) {
        const key = \`\${name}-\${color}\`;
        if (!(key in this.treeTypes)) {
            console.log(\`Creating new flyweight for: \${key}\`);
            this.treeTypes[key] = new TreeType(name, color);
        }
        return this.treeTypes[key];
    }
}
        `}},
        { id: 'flyweight', type: 'class', label: 'TreeType', x: 20, y: 180, width: 200, height: 80, code: { 
            java: `
// The Flyweight class. Contains the intrinsic state, which is shared.
public class TreeType {
    private final String name; // Intrinsic state
    private final String color; // Intrinsic state
    
    public TreeType(String name, String color) {
        this.name = name;
        this.color = color;
    }
    
    public void draw(int x, int y) { // Accepts extrinsic state
        System.out.println("Drawing a " + name + " tree in " + color + " at (" + x + ", " + y + ")");
    }
}
        `,
            python: `
# The Flyweight class. Contains the intrinsic state, which is shared.
class TreeType:
    def __init__(self, name: str, color: str):
        self._name = name    # Intrinsic state
        self._color = color  # Intrinsic state

    def draw(self, x: int, y: int):  # Accepts extrinsic state
        print(f"Drawing a {self._name} tree in {self._color} at ({x}, {y})")
        `,
            javascript: `
// The Flyweight class. Contains the intrinsic state, which is shared.
export class TreeType {
    constructor(name, color) {
        this.name = name;   // Intrinsic state
        this.color = color; // Intrinsic state
    }

    draw(x, y) { // Accepts extrinsic state
        console.log(\`Drawing a \${this.name} tree in \${this.color} at (\${x}, \${y})\`);
    }
}
        `}},
        { id: 'context', type: 'class', label: 'Tree', x: 380, y: 180, width: 200, height: 80, code: { 
            java: `
// The Context (or client) class. Contains the extrinsic state,
// which is unique for each object.
public class Tree {
    private int x; // Extrinsic state
    private int y; // Extrinsic state
    private TreeType type; // Reference to the flyweight

    public Tree(int x, int y, TreeType type) {
        this.x = x;
        this.y = y;
        this.type = type;
    }

    public void draw() {
        type.draw(x, y);
    }
}
        `,
            python: `
# The Context class. Contains the extrinsic state.
class Tree:
    def __init__(self, x: int, y: int, tree_type: 'TreeType'):
        self._x = x             # Extrinsic state
        self._y = y             # Extrinsic state
        self._type = tree_type  # Reference to the flyweight

    def draw(self):
        self._type.draw(self._x, self._y)
        `,
            javascript: `
// The Context class. Contains the extrinsic state.
export class Tree {
    constructor(x, y, type) {
        this.x = x;       // Extrinsic state
        this.y = y;       // Extrinsic state
        this.type = type; // Reference to the flyweight
    }

    draw() {
        this.type.draw(this.x, this.y);
    }
}
        `}},
        { id: 'arrow-factory-manages', type: 'arrow', x: 210, y: 140, arrowType: 'dependency', points: '300,100 V 150 H 120 V 180', label: 'manages', code: { 
            java: 'The factory creates and manages a pool of flyweight objects.',
            python: 'The factory creates and manages a pool of flyweight objects.',
            javascript: 'The factory creates and manages a pool of flyweight objects.',
        } },
        { id: 'arrow-context-uses', type: 'arrow', x: 300, y: 220, arrowType: 'dependency', points: '380,220 H 220', label: 'uses', code: { 
            java: 'The context object holds a reference to a flyweight.',
            python: 'The context object holds a reference to a flyweight.',
            javascript: 'The context object holds a reference to a flyweight.',
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

  <text x="275" y="30" class="lifeline-label" text-anchor="middle">:FlyweightFactory</text>
  <line x1="275" y1="40" x2="275" y2="380" class="lifeline" />
  <rect x="270" y="80" width="10" height="80" class="activation" />
  
  <text x="475" y="30" class="lifeline-label" text-anchor="middle">:Flyweight</text>
  <line x1="475" y1="40" x2="475" y2="380" class="lifeline" />
  <rect x="470" y="200" width="10" height="40" class="activation" />

  <line x1="75" y1="80" x2="275" y2="80" class="message" />
  <text x="175" y="75" class="message-label" text-anchor="middle">1: getFlyweight("Oak")</text>
  
  <line x1="275" y1="140" x2="75" y2="140" class="message" stroke-dasharray="4" />
  <text x="175" y="135" class="message-label" text-anchor="middle">2: returns shared instance</text>
  
  <line x1="75" y1="200" x2="475" y2="200" class="message" />
  <text x="275" y="195" class="message-label" text-anchor="middle">3: operation(extrinsicState)</text>
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
  <text x="70" y="250" class="label">Game Engine</text>

  <ellipse cx="280" cy="150" rx="150" ry="40" class="use-case" />
  <text x="280" y="155" class="label">Render Massive Number of Objects</text>
  
  <line x1="105" y1="150" x2="130" y2="150" class="connector" />
</svg>
    `
  };