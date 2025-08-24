import { DesignPattern } from '../../types';

export const compositePattern: DesignPattern = {
    id: 'composite',
    name: 'Composite',
    category: 'Structural',
    description: 'Compose objects into tree structures to represent part-whole hierarchies. Composite lets clients treat individual objects (leaves) and compositions of objects (composites) uniformly.',
    whenToUse: [
      'When you want to represent part-whole hierarchies of objects.',
      'When you want clients to be able to treat individual objects and compositions of objects uniformly.',
      'For any system that needs to be organized into a tree structure, such as UI component trees, file systems, or organizational charts.'
    ],
    whenNotToUse: [
      'When the system does not naturally form a tree structure.',
      'If the hierarchy is simple and has a fixed depth, simpler solutions may suffice.',
      'The pattern can make the design overly general. It can be difficult to restrict the components of a composite.'
    ],
    comparison: `
**Composite vs. Decorator:** Both have similar structures, relying on recursive composition. However, a Decorator adds responsibilities to an object and typically has only one child. A Composite is about composing a collection of objects and does not add new behavior.

**Composite vs. Flyweight:** You can use Flyweights to implement the shared leaf nodes of a Composite tree to save memory, but the patterns have different intents. Composite is for structuring data, while Flyweight is for memory optimization.
    `,
    diagram: {
      viewBox: "0 0 500 400",
      components: [
        { id: 'component', type: 'interface', label: 'FileSystemItem', x: 150, y: 20, width: 200, height: 60, code: { 
            java: `
// The Component interface.
// Declares the interface for objects in the composition.
public interface FileSystemItem {
    String getName();
    int getSize(); // Operation
}
        `,
            python: `
from abc import ABC, abstractmethod

# The Component interface.
# Declares the interface for objects in the composition.
class FileSystemItem(ABC):
    @abstractmethod
    def get_name(self) -> str:
        pass
    
    @abstractmethod
    def get_size(self) -> int:
        pass
        `,
            javascript: `
// The Component interface (simulated as a class).
// Declares the interface for objects in the composition.
export class FileSystemItem {
    getName() {
        throw new Error("Method 'getName()' must be implemented.");
    }
    
    getSize() {
        throw new Error("Method 'getSize()' must be implemented.");
    }
}
        `}},
        { id: 'leaf', type: 'class', label: 'File', x: 20, y: 150, width: 200, height: 60, code: { 
            java: `
// The Leaf. Represents leaf objects in the composition.
// A leaf has no children.
public class File implements FileSystemItem {
    private String name;
    private int size;
    
    public File(String name, int size) {
        this.name = name;
        this.size = size;
    }
    
    @Override
    public String getName() { return name; }

    @Override
    public int getSize() { return size; }
}
        `,
            python: `
# The Leaf. Represents leaf objects in the composition.
# A leaf has no children.
class File(FileSystemItem):
    def __init__(self, name: str, size: int):
        self._name = name
        self._size = size
        
    def get_name(self) -> str:
        return self._name
        
    def get_size(self) -> int:
        return self._size
        `,
            javascript: `
// The Leaf. Represents leaf objects in the composition.
// A leaf has no children.
export class File extends FileSystemItem {
    constructor(name, size) {
        super();
        this.name = name;
        this.size = size;
    }
    
    getName() {
        return this.name;
    }
    
    getSize() {
        return this.size;
    }
}
        `}},
        { id: 'composite', type: 'class', label: 'Directory', x: 280, y: 150, width: 200, height: 100, code: { 
            java: `
import java.util.ArrayList;
import java.util.List;

// The Composite. Defines behavior for components having children.
// Stores child components.
public class Directory implements FileSystemItem {
    private String name;
    private List<FileSystemItem> children = new ArrayList<>();
    
    public Directory(String name) { this.name = name; }
    public void add(FileSystemItem item) { children.add(item); }
    
    @Override
    public String getName() { return name; }
    
    @Override
    public int getSize() {
        // Delegates the operation to its children.
        return children.stream().mapToInt(FileSystemItem::getSize).sum();
    }
}
        `,
            python: `
from typing import List

# The Composite. Defines behavior for components having children.
# Stores child components.
class Directory(FileSystemItem):
    def __init__(self, name: str):
        self._name = name
        self._children: List[FileSystemItem] = []
        
    def add(self, item: FileSystemItem):
        self._children.append(item)
        
    def get_name(self) -> str:
        return self._name
        
    def get_size(self) -> int:
        # Delegates the operation to its children.
        return sum(child.get_size() for child in self._children)
        `,
            javascript: `
// The Composite. Defines behavior for components having children.
// Stores child components.
export class Directory extends FileSystemItem {
    constructor(name) {
        super();
        this.name = name;
        this.children = [];
    }
    
    add(item) {
        this.children.push(item);
    }
    
    getName() {
        return this.name;
    }
    
    getSize() {
        // Delegates the operation to its children.
        return this.children.reduce((total, child) => total + child.getSize(), 0);
    }
}
        `}},
        { id: 'arrow-impl-1', type: 'arrow', label: '', arrowType: 'implementation', x: 185, y: 115, points: "120,150 V 80 H 250", code: { 
            java: 'The Leaf implements the Component interface.',
            python: 'The Leaf implements the Component interface.',
            javascript: 'The Leaf extends the Component class.',
        } },
        { id: 'arrow-impl-2', type: 'arrow', label: '', arrowType: 'implementation', x: 315, y: 115, points: "380,150 V 80 H 250", code: { 
            java: 'The Composite implements the Component interface.',
            python: 'The Composite implements the Component interface.',
            javascript: 'The Composite extends the Component class.',
        } },
        { id: 'arrow-composition', type: 'arrow', x: 320, y: 115, arrowType: 'dependency', points: '380,250 C 380,300 250,300 250,80', label: 'holds', code: { 
            java: 'The Composite holds a collection of Components.',
            python: 'The Composite holds a collection of Components.',
            javascript: 'The Composite holds a collection of Components.',
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
  <rect x="70" y="60" width="10" height="260" class="activation" />

  <text x="250" y="30" class="lifeline-label" text-anchor="middle">:RootDirectory</text>
  <line x1="250" y1="40" x2="250" y2="380" class="lifeline" />
  <rect x="245" y="80" width="10" height="220" class="activation" />
  
  <text x="425" y="30" class="lifeline-label" text-anchor="middle">:Subdirectory</text>
  <line x1="425" y1="40" x2="425" y2="380" class="lifeline" />
  <rect x="420" y="120" width="10" height="60" class="activation" />
  
  <text x="550" y="30" class="lifeline-label" text-anchor="middle">:File</text>
  <line x1="550" y1="40" x2="550" y2="380" class="lifeline" />
  <rect x="545" y="140" width="10" height="20" class="activation" />

  <line x1="75" y1="80" x2="250" y2="80" class="message" />
  <text x="162.5" y="75" class="message-label" text-anchor="middle">1: getSize()</text>

  <line x1="250" y1="120" x2="425" y2="120" class="message" />
  <text x="337.5" y="115" class="message-label" text-anchor="middle">2: getSize()</text>
  
  <line x1="425" y1="140" x2="550" y2="140" class="message" />
  <text x="487.5" y="135" class="message-label" text-anchor="middle">3: getSize()</text>
  
  <line x1="425" y1="160" x2="250" y2="160" class="message" stroke-dasharray="4" />
  <text x="337.5" y="155" class="message-label" text-anchor="middle">4: returns size</text>
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
  <text x="70" y="250" class="label">User</text>

  <ellipse cx="280" cy="150" rx="120" ry="40" class="use-case" />
  <text x="280" y="155" class="label">Operate on File System</text>
  
  <line x1="105" y1="150" x2="160" y2="150" class="connector" />
</svg>
    `
  };