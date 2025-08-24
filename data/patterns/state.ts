
import { DesignPattern } from '../../types';

export const statePattern: DesignPattern = {
    id: 'state',
    name: 'State',
    category: 'Behavioral',
    description: 'Allow an object to alter its behavior when its internal state changes. The object will appear to change its class.',
    whenToUse: [
        'When an object\'s behavior depends on its state and it must change its behavior at runtime depending on that state.',
        'When you have a large conditional statement (if/else or switch) that depends on the object\'s state.',
        'To model objects that represent states in a finite state machine.'
    ],
    whenNotToUse: [
        'If an object has very few states or the state rarely changes, the pattern can be overkill.',
        'The pattern can increase the number of classes in the system, one for each state.'
    ],
    comparison: `
**State vs. Strategy:** Both patterns have a similar structure, with a Context class delegating work to a separate object. However, their intents are different. The Strategy pattern is about providing different ways to do the same thing, and the strategy is typically set by the client. The State pattern is about managing an object's behavior as its internal state changes. The state transitions are usually managed internally by the Context or the State objects themselves.

**State vs. Bridge:** The Bridge pattern is a structural pattern focused on decoupling an abstraction from its implementation. The State pattern is a behavioral pattern focused on managing an object\'s behavior based on its state.
    `,
    diagram: {
        viewBox: "0 0 600 450",
        components: [
            { id: 'context', type: 'class', label: 'Document', x: 200, y: 20, width: 200, height: 80, code: { 
                java: `
// The Context maintains an instance of a ConcreteState subclass
// that defines the current state.
public class Document {
    private State state;
    
    public Document() {
        // Initial state
        this.state = new DraftState(this);
    }

    public void changeState(State state) {
        this.state = state;
    }
    
    public void publish() {
        state.publish();
    }
}
            `,
                python: `
# The Context maintains an instance of a ConcreteState.
class Document:
    def __init__(self):
        # Initial state
        self._state = DraftState(self)

    def change_state(self, state: 'State'):
        self._state = state
    
    def publish(self):
        self._state.publish()
            `,
                javascript: `
import { DraftState } from './DraftState.js';
// The Context maintains an instance of a ConcreteState.
export class Document {
    constructor() {
        // Initial state is set by the state class itself
        this.state = new DraftState(this);
    }

    changeState(state) {
        this.state = state;
    }

    publish() {
        this.state.publish();
    }
}
            `}},
            { id: 'state-interface', type: 'interface', label: 'State', x: 200, y: 320, width: 200, height: 60, code: { 
                java: `
// The State interface defines a common interface for all
// concrete states.
public interface State {
    void publish();
}
            `,
                python: `
from abc import ABC, abstractmethod

# The State interface
class State(ABC):
    def __init__(self, document: 'Document'):
        self._document = document

    @abstractmethod
    def publish(self):
        pass
            `,
                javascript: `
// The State interface (simulated)
export class State {
    constructor(document) {
        if (this.constructor === State) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.document = document;
    }
    
    publish() {
        throw new Error("Method 'publish()' must be implemented.");
    }
}
            `}},
            { id: 'state-1', type: 'class', label: 'DraftState', x: 20, y: 180, width: 160, height: 80, code: { 
                java: `
// A Concrete State
public class DraftState implements State {
    private Document document;
    public DraftState(Document doc) { this.document = doc; }
    
    @Override
    public void publish() {
        System.out.println("Moving from Draft to Moderation...");
        document.changeState(new ModerationState(document));
    }
}
            `,
                python: `
# A Concrete State
class DraftState(State):
    def publish(self):
        print("Moving from Draft to Moderation...")
        self._document.change_state(ModerationState(self._document))
            `,
                javascript: `
import { State } from './State.js';
import { ModerationState } from './ModerationState.js';

// A Concrete State
export class DraftState extends State {
    publish() {
        console.log("Moving from Draft to Moderation...");
        this.document.changeState(new ModerationState(this.document));
    }
}
            `}},
            { id: 'state-2', type: 'class', label: 'ModerationState', x: 220, y: 180, width: 160, height: 80, code: { 
                java: `
// Another Concrete State
public class ModerationState implements State {
    private Document document;
    public ModerationState(Document doc) { this.document = doc; }

    @Override
    public void publish() {
        System.out.println("Document approved. Moving to Published state.");
        document.changeState(new PublishedState(document));
    }
}
            `,
                python: `
# Another Concrete State
class ModerationState(State):
    def publish(self):
        print("Document approved. Moving to Published state.")
        self._document.change_state(PublishedState(self._document))
            `,
                javascript: `
import { State } from './State.js';
import { PublishedState } from './PublishedState.js';

// Another Concrete State
export class ModerationState extends State {
    publish() {
        console.log("Document approved. Moving to Published state.");
        this.document.changeState(new PublishedState(this.document));
    }
}
            `}},
            { id: 'state-3', type: 'class', label: 'PublishedState', x: 420, y: 180, width: 160, height: 80, code: { 
                java: `
// Another Concrete State
public class PublishedState implements State {
    private Document document;
    public PublishedState(Document doc) { this.document = doc; }
    
    @Override
    public void publish() {
        System.out.println("Document is already published.");
    }
}
            `,
                python: `
# Another Concrete State
class PublishedState(State):
    def publish(self):
        print("Document is already published.")
            `,
                javascript: `
import { State } from './State.js';

// Another Concrete State
export class PublishedState extends State {
    publish() {
        console.log("Document is already published.");
    }
}
            `}},
            { id: 'arrow-context-uses', type: 'arrow', label: 'holds', x: 300, y: 200, arrowType: 'dependency', points: '300,100 V 320', code: { java: 'The Context holds a reference to the current State object.'}},
            { id: 'arrow-state-impl-1', type: 'arrow', label: '', arrowType: 'implementation', x: 190, y: 300, points: '100,260 V 320 H 300', code: { java: 'Concrete states implement the State interface.'}},
            { id: 'arrow-state-impl-2', type: 'arrow', label: '', arrowType: 'implementation', x: 300, y: 300, points: '300,260 V 320', code: { java: 'Concrete states implement the State interface.'}},
            { id: 'arrow-state-impl-3', type: 'arrow', label: '', arrowType: 'implementation', x: 410, y: 300, points: '500,260 V 320 H 300', code: { java: 'Concrete states implement the State interface.'}},
            { id: 'arrow-state-transition-1', type: 'arrow', label: 'creates', x: 200, y: 220, arrowType: 'dependency', points: '180,220 H 220', code: { java: 'DraftState transitions to ModerationState.'}},
            { id: 'arrow-state-transition-2', type: 'arrow', label: 'creates', x: 400, y: 220, arrowType: 'dependency', points: '380,220 H 420', code: { java: 'ModerationState transitions to PublishedState.'}},
            { id: 'arrow-state-knows-context1', type: 'arrow', label: 'uses', x: 150, y: 125, arrowType: 'dependency', points: '100,180 V 100 H 200', code: { java: 'States hold a reference to the Context to perform transitions.'}},
            { id: 'arrow-state-knows-context2', type: 'arrow', label: 'uses', x: 300, y: 125, arrowType: 'dependency', points: '300,180 V 100', code: { java: 'States hold a reference to the Context to perform transitions.'}},
            { id: 'arrow-state-knows-context3', type: 'arrow', label: 'uses', x: 450, y: 125, arrowType: 'dependency', points: '500,180 V 100 H 400', code: { java: 'States hold a reference to the Context to perform transitions.'}}
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
  <rect x="70" y="60" width="10" height="260" class="activation" />

  <text x="250" y="30" class="lifeline-label" text-anchor="middle">:Context</text>
  <line x1="250" y1="40" x2="250" y2="380" class="lifeline" />
  <rect x="245" y="80" width="10" height="220" class="activation" />
  
  <text x="425" y="30" class="lifeline-label" text-anchor="middle">:DraftState</text>
  <line x1="425" y1="40" x2="425" y2="380" class="lifeline" />
  <rect x="420" y="120" width="10" height="120" class="activation" />
  
  <text x="575" y="30" class="lifeline-label" text-anchor="middle">:ModerationState</text>
  <line x1="575" y1="40" x2="575" y2="380" class="lifeline" />
  <rect x="570" y="200" width="10" height="20" class="activation" />

  <line x1="75" y1="80" x2="250" y2="80" class="message" />
  <text x="162.5" y="75" class="message-label" text-anchor="middle">1: publish()</text>
  
  <line x1="250" y1="120" x2="425" y2="120" class="message" />
  <text x="337.5" y="115" class="message-label" text-anchor="middle">2: publish()</text>
  
  <line x1="425" y1="180" x2="250" y2="180" class="message" />
  <text x="337.5" y="175" class="message-label" text-anchor="middle">3: changeState(newState)</text>
  
  <line x1="425" y1="200" x2="575" y2="200" class="message" />
  <text x="500" y="195" class="message-label" text-anchor="middle">4: new()</text>
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
  <text x="70" y="250" class="label">System</text>

  <ellipse cx="280" cy="150" rx="150" ry="40" class="use-case" />
  <text x="280" y="155" class="label">Transition Between States</text>
  
  <line x1="105" y1="150" x2="130" y2="150" class="connector" />
</svg>
    `
};
