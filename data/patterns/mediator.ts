import { DesignPattern } from '../../types';

export const mediatorPattern: DesignPattern = {
    id: 'mediator',
    name: 'Mediator',
    category: 'Behavioral',
    description: 'Define an object that encapsulates how a set of objects interact. Mediator promotes loose coupling by keeping objects from referring to each other explicitly, and it lets you vary their interaction independently.',
    whenToUse: [
        'When a set of objects communicate in complex ways, resulting in a tangled web of dependencies.',
        'To centralize complex communication logic in one place, making it easier to understand and maintain.',
        'When you want to reuse individual components, but they are too tightly coupled with other components.'
    ],
    whenNotToUse: [
        'For simple interactions between a few objects, the pattern can add unnecessary complexity.',
        'The mediator can become a "god object" if it takes on too many responsibilities, becoming a bottleneck and difficult to maintain.'
    ],
    comparison: `
**Mediator vs. Observer:** The Observer pattern establishes a one-way communication flow from subject to observers. The Mediator pattern establishes a two-way communication flow between multiple colleague objects. The communication is centralized and can be more complex than a simple notification.

**Mediator vs. Facade:** A Facade exposes a simplified interface to a whole subsystem, but it doesn't add new functionality; it's a one-way communication where the client talks to the facade. A Mediator centralizes communication between objects within a system; the communication is multi-directional, with colleagues talking to the mediator and the mediator talking back to them.
    `,
    diagram: {
        viewBox: "0 0 600, 450",
        components: [
            { id: 'mediator-interface', type: 'interface', label: 'ChatMediator', x: 200, y: 20, width: 220, height: 70, code: { 
                java: `
// The Mediator interface defines a method used by Colleagues
// to notify the mediator about events.
public interface ChatMediator {
    void sendMessage(String msg, User user);
    void addUser(User user);
}
            `,
                python: `
from abc import ABC, abstractmethod

# The Mediator interface
class ChatMediator(ABC):
    @abstractmethod
    def send_message(self, msg: str, user: 'User'):
        pass

    @abstractmethod
    def add_user(self, user: 'User'):
        pass
            `,
                javascript: `
// The Mediator interface (simulated)
export class ChatMediator {
    sendMessage(msg, user) {
        throw new Error("Method 'sendMessage()' must be implemented.");
    }
    addUser(user) {
        throw new Error("Method 'addUser()' must be implemented.");
    }
}
            `}},
            { id: 'concrete-mediator', type: 'class', label: 'ChatRoom', x: 200, y: 120, width: 220, height: 80, code: { 
                java: `
import java.util.ArrayList;
import java.util.List;

// The Concrete Mediator implements the cooperative behavior by
// coordinating the Colleague objects.
public class ChatRoom implements ChatMediator {
    private List<User> users;
    public ChatRoom() { this.users = new ArrayList<>(); }
    
    @Override
    public void addUser(User user) { this.users.add(user); }
    
    @Override
    public void sendMessage(String msg, User user) {
        for(User u : this.users) {
            // Don't send the message to the user who sent it
            if(u != user) {
                u.receive(msg);
            }
        }
    }
}
            `,
                python: `
# The Concrete Mediator
class ChatRoom(ChatMediator):
    def __init__(self):
        self._users = []

    def add_user(self, user: 'User'):
        self._users.append(user)

    def send_message(self, msg: str, user: 'User'):
        for u in self._users:
            # Don't send the message to the user who sent it
            if u is not user:
                u.receive(msg)
            `,
                javascript: `
// The Concrete Mediator
export class ChatRoom extends ChatMediator {
    constructor() {
        super();
        this.users = [];
    }

    addUser(user) {
        this.users.push(user);
    }

    sendMessage(msg, sender) {
        for (const user of this.users) {
            if (user !== sender) {
                user.receive(msg);
            }
        }
    }
}
            `}},
            { id: 'colleague-abstract', type: 'class', label: 'User', x: 20, y: 250, width: 220, height: 80, code: { 
                java: `
// The abstract Colleague class. It holds a reference to the Mediator.
public abstract class User {
    protected ChatMediator mediator;
    protected String name;

    public User(ChatMediator med, String name) {
        this.mediator = med;
        this.name = name;
    }
    
    public abstract void send(String msg);
    public abstract void receive(String msg);
}
            `,
                python: `
from abc import ABC, abstractmethod

# The abstract Colleague class
class User(ABC):
    def __init__(self, mediator: 'ChatMediator', name: str):
        self._mediator = mediator
        self._name = name

    @abstractmethod
    def send(self, msg: str):
        pass

    @abstractmethod
    def receive(self, msg: str):
        pass
            `,
                javascript: `
// The abstract Colleague class
export class User {
    constructor(mediator, name) {
        if (this.constructor === User) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.mediator = mediator;
        this.name = name;
    }
    
    send(msg) {
        throw new Error("Method 'send()' must be implemented.");
    }

    receive(msg) {
        throw new Error("Method 'receive()' must be implemented.");
    }
}
            `}},
             { id: 'colleague-concrete', type: 'class', label: 'UserImpl', x: 360, y: 250, width: 220, height: 100, code: { 
                 java: `
// The Concrete Colleague communicates with the Mediator
// whenever it needs to communicate with another colleague.
public class UserImpl extends User {
    public UserImpl(ChatMediator med, String name) {
        super(med, name);
    }
    
    @Override
    public void send(String msg) {
        System.out.println(this.name + ": Sending Message=" + msg);
        mediator.sendMessage(msg, this);
    }
    
    @Override
    public void receive(String msg) {
        System.out.println(this.name + ": Received Message:" + msg);
    }
}
            `,
                 python: `
# The Concrete Colleague
class UserImpl(User):
    def send(self, msg: str):
        print(f"{self._name}: Sending Message='{msg}'")
        self._mediator.send_message(msg, self)

    def receive(self, msg: str):
        print(f"{self._name}: Received Message: '{msg}'")
            `,
                 javascript: `
// The Concrete Colleague
export class UserImpl extends User {
    send(msg) {
        console.log(\`\${this.name}: Sending Message='\${msg}'\`);
        this.mediator.sendMessage(msg, this);
    }
    
    receive(msg) {
        console.log(\`\${this.name}: Received Message: '\${msg}'\`);
    }
}
            `}},
            { id: 'arrow-impl-mediator', type: 'arrow', label: '', x: 310, y: 105, arrowType: 'implementation', points: '310,120 V 90', code: { 
                java: 'ChatRoom implements the ChatMediator interface.',
                python: 'ChatRoom implements the ChatMediator interface.',
                javascript: 'ChatRoom extends the ChatMediator class.',
            }},
            { id: 'arrow-impl-colleague', type: 'arrow', label: '', x: 350, y: 290, arrowType: 'implementation', points: '470,250 V 300 H 240', code: { 
                java: 'UserImpl extends the abstract User class.',
                python: 'UserImpl extends the abstract User class.',
                javascript: 'UserImpl extends the abstract User class.',
            }},
            { id: 'arrow-mediator-holds', type: 'arrow', label: 'holds list of', x: 205, y: 225, arrowType: 'dependency', points: '250,200 V 250 H 130', code: { 
                java: 'The Mediator holds references to its colleagues.',
                python: 'The Mediator holds references to its colleagues.',
                javascript: 'The Mediator holds references to its colleagues.',
            }},
            { id: 'arrow-colleague-uses', type: 'arrow', label: 'communicates via', x: 190, y: 170, arrowType: 'dependency', points: '130,250 V 100 H 200', code: { 
                java: 'Colleagues hold a reference to the Mediator to communicate.',
                python: 'Colleagues hold a reference to the Mediator to communicate.',
                javascript: 'Colleagues hold a reference to the Mediator to communicate.',
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

  <text x="75" y="30" class="lifeline-label" text-anchor="middle">:User1</text>
  <line x1="75" y1="40" x2="75" y2="380" class="lifeline" />
  <rect x="70" y="60" width="10" height="260" class="activation" />

  <text x="275" y="30" class="lifeline-label" text-anchor="middle">:Mediator</text>
  <line x1="275" y1="40" x2="275" y2="380" class="lifeline" />
  <rect x="270" y="100" width="10" height="200" class="activation" />
  
  <text x="475" y="30" class="lifeline-label" text-anchor="middle">:User2</text>
  <line x1="475" y1="40" x2="475" y2="380" class="lifeline" />
  <rect x="470" y="160" width="10" height="20" class="activation" />

  <line x1="75" y1="100" x2="275" y2="100" class="message" />
  <text x="175" y="95" class="message-label" text-anchor="middle">1: sendMessage("Hi")</text>
  
  <line x1="275" y1="160" x2="475" y2="160" class="message" />
  <text x="375" y="155" class="message-label" text-anchor="middle">2: receive("Hi")</text>
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
  <text x="70" y="250" class="label">Component</text>

  <ellipse cx="280" cy="150" rx="150" ry="40" class="use-case" />
  <text x="280" y="155" class="label">Decouple Complex Interactions</text>
  
  <line x1="105" y1="150" x2="130" y2="150" class="connector" />
</svg>
    `
  };