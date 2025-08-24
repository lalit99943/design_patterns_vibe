import { DesignPattern } from '../../types';

export const commandPattern: DesignPattern = {
    id: 'command',
    name: 'Command',
    category: 'Behavioral',
    description: 'Encapsulate a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations.',
    whenToUse: [
        'To parameterize objects with an action to perform, such as a menu item or a button.',
        'To specify, queue, and execute requests at different times.',
        'To support undo/redo functionality by storing a history of commands.',
        'To model a transaction, where a set of operations are applied as a single command.'
    ],
    whenNotToUse: [
        'For simple, direct actions where the sender and receiver are tightly coupled and no extra features like undo or queueing are needed.',
        'The pattern can introduce a lot of small classes (one for each command), which can increase complexity.'
    ],
    comparison: `
**Command vs. Strategy:** Both patterns encapsulate some logic in an object. However, a Strategy defines *how* an object does something (e.g., how a character moves), while a Command defines *what* an object should do (e.g., that a character should move). A strategy object is often passed in the constructor of the context class, while commands are typically passed to the invoker's action methods.

**Command vs. Observer:** A Command object is passed to an invoker, which decides when to execute it. An Observer, on the other hand, is executed automatically whenever the subject's state changes.
    `,
    diagram: {
        viewBox: "0 0 600 400",
        components: [
            { id: 'command-interface', type: 'interface', label: 'Command', x: 200, y: 20, width: 200, height: 60, code: { 
                java: `
// The Command interface declares a single execution method.
public interface Command {
    void execute();
}
            `,
                python: `
from abc import ABC, abstractmethod

# The Command interface declares a single execution method.
class Command(ABC):
    @abstractmethod
    def execute(self) -> None:
        pass
            `,
                javascript: `
// The Command interface declares a single execution method.
export class Command {
    execute() {
        throw new Error("Method 'execute()' must be implemented.");
    }
}
            `}},
            { id: 'concrete-command', type: 'class', label: 'StartEngineCommand', x: 20, y: 150, width: 200, height: 80, code: { 
                java: `
// A Concrete Command. It holds a reference to the Receiver
// and calls a specific method on it.
public class StartEngineCommand implements Command {
    private final Engine engine; // The Receiver

    public StartEngineCommand(Engine engine) {
        this.engine = engine;
    }

    @Override
    public void execute() {
        engine.start();
    }
}
            `,
                python: `
# A Concrete Command. It holds a reference to the Receiver
# and calls a specific method on it.
class StartEngineCommand(Command):
    def __init__(self, engine: 'Engine'):
        self._engine = engine

    def execute(self) -> None:
        self._engine.start()
            `,
                javascript: `
// A Concrete Command. It holds a reference to the Receiver
// and calls a specific method on it.
export class StartEngineCommand extends Command {
    constructor(engine) {
        super();
        this.engine = engine;
    }

    execute() {
        this.engine.start();
    }
}
            `}},
            { id: 'receiver', type: 'class', label: 'Engine', x: 20, y: 300, width: 200, height: 60, code: { 
                java: `
// The Receiver contains the actual business logic. It knows how to
// perform the operations associated with carrying out a request.
public class Engine {
    public void start() {
        System.out.println("Engine is starting.");
    }
    public void stop() {
        System.out.println("Engine is stopping.");
    }
}
            `,
                python: `
# The Receiver contains the actual business logic. It knows how to
# perform the operations associated with carrying out a request.
class Engine:
    def start(self) -> None:
        print("Engine is starting.")

    def stop(self) -> None:
        print("Engine is stopping.")
            `,
                javascript: `
// The Receiver contains the actual business logic. It knows how to
// perform the operations associated with carrying out a request.
export class Engine {
    start() {
        console.log("Engine is starting.");
    }

    stop() {
        console.log("Engine is stopping.");
    }
}
            `}},
            { id: 'invoker', type: 'class', label: 'RemoteControl', x: 380, y: 150, width: 200, height: 80, code: { 
                java: `
// The Invoker holds a command and asks it to carry out the request.
// It is decoupled from the Receiver.
public class RemoteControl {
    private Command command;

    public void setCommand(Command command) {
        this.command = command;
    }

    public void pressButton() {
        command.execute();
    }
}
            `,
                python: `
# The Invoker holds a command and asks it to carry out the request.
# It is decoupled from the Receiver.
class RemoteControl:
    def __init__(self):
        self._command: Command = None

    def set_command(self, command: Command) -> None:
        self._command = command

    def press_button(self) -> None:
        if self._command:
            self._command.execute()
            `,
                javascript: `
// The Invoker holds a command and asks it to carry out the request.
// It is decoupled from the Receiver.
export class RemoteControl {
    constructor() {
        this.command = null;
    }

    setCommand(command) {
        this.command = command;
    }

    pressButton() {
        if (this.command) {
            this.command.execute();
        }
    }
}
            `}},
            { id: 'arrow-impl', type: 'arrow', label: '', x: 210, y: 115, arrowType: 'implementation', points: '120,150 V 80 H 300', code: { 
                java: 'Concrete commands implement the Command interface.',
                python: 'Concrete commands implement the Command interface.',
                javascript: 'Concrete commands extend the Command class.',
            }},
            { id: 'arrow-invokes', type: 'arrow', label: 'invokes', x: 340, y: 120, arrowType: 'dependency', points: '380,190 H 300 V 80', code: { 
                java: 'The Invoker calls execute() on the Command.',
                python: 'The Invoker calls execute() on the Command.',
                javascript: 'The Invoker calls execute() on the Command.',
            }},
            { id: 'arrow-action', type: 'arrow', label: 'acts on', x: 120, y: 265, arrowType: 'dependency', points: '120,230 V 300', code: { 
                java: 'The Command carries out its action on the Receiver.',
                python: 'The Command carries out its action on the Receiver.',
                javascript: 'The Command carries out its action on the Receiver.',
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
  <rect x="70" y="60" width="10" height="200" class="activation" />

  <text x="250" y="30" class="lifeline-label" text-anchor="middle">:Invoker</text>
  <line x1="250" y1="40" x2="250" y2="380" class="lifeline" />
  <rect x="245" y="80" width="10" height="160" class="activation" />
  
  <text x="425" y="30" class="lifeline-label" text-anchor="middle">:Command</text>
  <line x1="425" y1="40" x2="425" y2="380" class="lifeline" />
  <rect x="420" y="120" width="10" height="100" class="activation" />
  
  <text x="575" y="30" class="lifeline-label" text-anchor="middle">:Receiver</text>
  <line x1="575" y1="40" x2="575" y2="380" class="lifeline" />
  <rect x="570" y="180" width="10" height="20" class="activation" />

  <line x1="75" y1="80" x2="250" y2="80" class="message" />
  <text x="162.5" y="75" class="message-label" text-anchor="middle">1: pressButton()</text>
  
  <line x1="250" y1="120" x2="425" y2="120" class="message" />
  <text x="337.5" y="115" class="message-label" text-anchor="middle">2: execute()</text>
  
  <line x1="425" y1="180" x2="575" y2="180" class="message" />
  <text x="500" y="175" class="message-label" text-anchor="middle">3: action()</text>
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
  <text x="280" y="155" class="label">Queue/Undo/Redo Operations</text>
  
  <line x1="105" y1="150" x2="130" y2="150" class="connector" />
</svg>
    `
  };