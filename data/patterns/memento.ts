import { DesignPattern } from '../../types';

export const mementoPattern: DesignPattern = {
    id: 'memento',
    name: 'Memento',
    category: 'Behavioral',
    description: 'Without violating encapsulation, capture and externalize an object\'s internal state so that the object can be restored to this state later. This is used to implement undo mechanisms.',
    whenToUse: [
        'To implement undo/redo functionality.',
        'To create snapshots of an object\'s state for later restoration, such as in database transactions or stateful workflows.',
        'When direct access to an object\'s fields would expose its implementation details, but you still need a way to save its state.'
    ],
    whenNotToUse: [
        'If the object\'s state is very large, creating mementos can be memory-intensive.',
        'If the client that manages the mementos (the Caretaker) has a simple lifecycle, the complexity might be unnecessary.',
        'In languages that don\'t support nested classes or strong encapsulation, it can be hard to guarantee that only the originator can access the memento\'s state.'
    ],
    comparison: `
**Memento vs. Command:** The Memento pattern is about saving and restoring state. The Command pattern is about encapsulating an action. They can be used together to create a robust undo/redo system. A command object can store a memento of the receiver's state before it executes its action. To undo, the command restores the receiver's state from the memento.

**Memento vs. Serialization:** Serialization is a general mechanism for saving an object's state to storage. The Memento pattern is a more specific design for capturing state for in-memory restoration, with a key focus on preserving the encapsulation of the original object (the Originator).
    `,
    diagram: {
        viewBox: "0 0 600 400",
        components: [
            { id: 'originator', type: 'class', label: 'Editor', x: 200, y: 20, width: 200, height: 80, code: { 
                java: `
// The Originator creates a memento containing a snapshot of its
// current internal state.
public class Editor {
    private String content;

    public Memento save() {
        return new Memento(this.content);
    }
    
    public void restore(Memento memento) {
        this.content = memento.getSavedContent();
    }
    
    // ... setters and getters for content ...
    public void setContent(String content) { this.content = content; }
    public String getContent() { return content; }
}
            `,
                python: `
# The Originator creates a memento.
class Editor:
    def __init__(self):
        self._content = ""

    def set_content(self, content: str):
        self._content = content

    def get_content(self) -> str:
        return self._content

    def save(self) -> 'Memento':
        return Memento(self._content)

    def restore(self, memento: 'Memento'):
        self._content = memento.get_saved_content()
            `,
                javascript: `
// The Originator creates a memento.
export class Editor {
    constructor() {
        this.content = "";
    }

    setContent(content) {
        this.content = content;
    }

    getContent() {
        return this.content;
    }

    save() {
        return new Memento(this.content);
    }

    restore(memento) {
        this.content = memento.getSavedContent();
    }
}
            `}},
            { id: 'memento', type: 'class', label: 'Memento', x: 200, y: 150, width: 200, height: 80, code: { 
                java: `
// The Memento stores the internal state of the Originator object.
// It should be immutable and its state should only be accessible
// by the Originator. This is often achieved by making Memento a
// static nested class of Originator.
public class Memento {
    private final String savedContent;

    public Memento(String content) {
        this.savedContent = content;
    }
    
    // This getter should ideally only be accessible to the Originator.
    public String getSavedContent() {
        return savedContent;
    }
}
            `,
                python: `
# The Memento stores the internal state of the Originator.
class Memento:
    def __init__(self, content: str):
        # In Python, use '_' to indicate "private" state.
        self._saved_content = content

    def get_saved_content(self) -> str:
        return self._saved_content
            `,
                javascript: `
// The Memento stores the internal state of the Originator.
// True privacy can be achieved with closures or #private fields.
export class Memento {
    #savedContent;

    constructor(content) {
        this.#savedContent = content;
    }

    // This getter is accessible, but the field is private.
    getSavedContent() {
        return this.#savedContent;
    }
}
            `}},
            { id: 'caretaker', type: 'class', label: 'History', x: 200, y: 300, width: 200, height: 80, code: { 
                java: `
import java.util.Stack;

// The Caretaker is responsible for the memento's safekeeping
// but never operates on or examines its contents.
public class History {
    private Stack<Memento> mementos = new Stack<>();
    
    public void push(Memento memento) {
        mementos.push(memento);
    }
    
    public Memento pop() {
        return mementos.pop();
    }
}
            `,
                python: `
# The Caretaker is responsible for the memento's safekeeping.
class History:
    def __init__(self):
        self._mementos = []

    def push(self, memento: 'Memento'):
        self._mementos.append(memento)

    def pop(self) -> 'Memento':
        return self._mementos.pop()
            `,
                javascript: `
// The Caretaker is responsible for the memento's safekeeping.
export class History {
    constructor() {
        this.mementos = [];
    }

    push(memento) {
        this.mementos.push(memento);
    }

    pop() {
        return this.mementos.pop();
    }
}
            `}},
            { id: 'arrow-creates', type: 'arrow', label: 'creates/restores', x: 300, y: 125, arrowType: 'dependency', points: '300,100 V 150', code: { 
                java: 'The Originator creates and uses Mementos.',
                python: 'The Originator creates and uses Mementos.',
                javascript: 'The Originator creates and uses Mementos.',
            }},
            { id: 'arrow-holds', type: 'arrow', label: 'holds', x: 300, y: 265, arrowType: 'dependency', points: '300,300 V 230', code: { 
                java: 'The Caretaker holds a history of Mementos.',
                python: 'The Caretaker holds a history of Mementos.',
                javascript: 'The Caretaker holds a history of Mementos.',
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

  <text x="75" y="30" class="lifeline-label" text-anchor="middle">:Caretaker</text>
  <line x1="75" y1="40" x2="75" y2="380" class="lifeline" />
  <rect x="70" y="60" width="10" height="260" class="activation" />

  <text x="275" y="30" class="lifeline-label" text-anchor="middle">:Originator</text>
  <line x1="275" y1="40" x2="275" y2="380" class="lifeline" />
  <rect x="270" y="100" width="10" height="180" class="activation" />
  
  <text x="475" y="30" class="lifeline-label" text-anchor="middle">:Memento</text>
  <line x1="475" y1="40" x2="475" y2="380" class="lifeline" />
  <rect x="470" y="120" width="10" height="20" class="activation" />

  <line x1="75" y1="100" x2="275" y2="100" class="message" />
  <text x="175" y="95" class="message-label" text-anchor="middle">1: save()</text>
  
  <line x1="275" y1="120" x2="475" y2="120" class="message" />
  <text x="375" y="115" class="message-label" text-anchor="middle">2: new(state)</text>

  <line x1="275" y1="140" x2="75" y2="140" class="message" stroke-dasharray="4" />
  <text x="175" y="135" class="message-label" text-anchor="middle">3: returns memento</text>
  
  <line x1="75" y1="200" x2="275" y2="200" class="message" />
  <text x="175" y="195" class="message-label" text-anchor="middle">4: restore(memento)</text>
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
  <text x="70" y="250" class="label">User</text>

  <ellipse cx="280" cy="150" rx="150" ry="40" class="use-case" />
  <text x="280" y="155" class="label">Implement Undo/Redo</text>
  
  <line x1="105" y1="150" x2="130" y2="150" class="connector" />
</svg>
    `
  };