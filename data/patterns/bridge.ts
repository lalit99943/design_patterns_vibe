import { DesignPattern } from '../../types';

export const bridgePattern: DesignPattern = {
    id: 'bridge',
    name: 'Bridge',
    category: 'Structural',
    description: 'Decouples an abstraction from its implementation so that the two can vary independently. This allows you to combine different abstractions and implementations and vary them independently.',
    whenToUse: [
      'When you want to avoid a permanent binding between an abstraction and its implementation.',
      'When both the abstractions and their implementations can have their own independent extension hierarchies.',
      'When changes in the implementation of an abstraction should have no impact on the clients.',
      'In systems that need to support multiple platforms (e.g., UI frameworks, device drivers).'
    ],
    whenNotToUse: [
      'For simple systems with a single, stable implementation. The pattern adds complexity.',
      'When the abstraction and implementation are tightly coupled and are not expected to change independently.',
      'If the design is not planned upfront, applying the Bridge pattern to an existing system can be a major refactoring effort.'
    ],
    comparison: `
**Bridge vs. Adapter:** The Bridge pattern is a design decision made *upfront* to decouple parts of a system that are expected to evolve independently. The Adapter pattern is used *after the fact* to make existing, incompatible classes work together.

**Bridge vs. Strategy:** Both patterns decouple an object from some behavior. However, the Strategy pattern is typically focused on swapping entire algorithms (behavioral). The Bridge pattern is focused on decoupling the structure of a class from its implementation, allowing both to be subclassed independently (structural).
    `,
    diagram: {
      viewBox: "0 0 600 450",
      components: [
        { id: 'abstraction', type: 'class', label: 'Message', x: 20, y: 180, width: 220, height: 60, code: { 
            java: `
// The Abstraction. It contains a reference to the Implementor.
public abstract class Message {
    protected MessageSender messageSender;

    public Message(MessageSender sender) {
        this.messageSender = sender;
    }

    public abstract void send(String subject, String body);
}
        `,
            python: `
from abc import ABC, abstractmethod

# The Abstraction. It contains a reference to the Implementor.
class Message(ABC):
    def __init__(self, sender: 'MessageSender'):
        self._sender = sender

    @abstractmethod
    def send(self, subject: str, body: str):
        pass
        `,
            javascript: `
// The Abstraction. It contains a reference to the Implementor.
export class Message {
    constructor(sender) {
        if (this.constructor === Message) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.sender = sender;
    }

    send(subject, body) {
        throw new Error("Method 'send()' must be implemented.");
    }
}
        `}},
        { id: 'refined-abstraction', type: 'class', label: 'TextMessage', x: 20, y: 320, width: 220, height: 60, code: { 
            java: `
// A Refined Abstraction.
public class TextMessage extends Message {
    public TextMessage(MessageSender sender) {
        super(sender);
    }
    
    @Override
    public void send(String subject, String body) {
        System.out.println("Sending Text Message...");
        messageSender.sendMessage(subject, body);
    }
}
        `,
            python: `
# A Refined Abstraction.
class TextMessage(Message):
    def send(self, subject: str, body: str):
        print("Sending Text Message...")
        self._sender.send_message(subject, body)
        `,
            javascript: `
// A Refined Abstraction.
export class TextMessage extends Message {
    send(subject, body) {
        console.log("Sending Text Message...");
        this.sender.sendMessage(subject, body);
    }
}
        `}},
        { id: 'implementor', type: 'interface', label: 'MessageSender', x: 360, y: 20, width: 220, height: 60, code: { 
            java: `
// The Implementor interface defines the interface for implementation classes.
public interface MessageSender {
    void sendMessage(String subject, String body);
}
        `,
            python: `
from abc import ABC, abstractmethod

# The Implementor interface defines the interface for implementation classes.
class MessageSender(ABC):
    @abstractmethod
    def send_message(self, subject: str, body: str):
        pass
        `,
            javascript: `
// The Implementor interface defines the interface for implementation classes.
export class MessageSender {
    sendMessage(subject, body) {
        throw new Error("Method 'sendMessage()' must be implemented.");
    }
}
        `}},
        { id: 'concrete-implementor-1', type: 'class', label: 'EmailMessageSender', x: 360, y: 150, width: 220, height: 60, code: { 
            java: `
import org.springframework.stereotype.Component;

// A Concrete Implementor
@Component("emailSenderImpl")
public class EmailMessageSender implements MessageSender {
    @Override
    public void sendMessage(String subject, String body) {
        System.out.println("Sending Email: [" + subject + "] " + body);
    }
}
        `,
            python: `
# A Concrete Implementor
# In FastAPI, this might be a dependency that gets injected.
class EmailMessageSender(MessageSender):
    def send_message(self, subject: str, body: str):
        print(f"Sending Email: [{subject}] {body}")
        `,
            javascript: `
// A Concrete Implementor
// In NestJS, this would be an injectable provider.
export class EmailMessageSender extends MessageSender {
    sendMessage(subject, body) {
        console.log(\`Sending Email: [\${subject}] \${body}\`);
    }
}
        `}},
        { id: 'concrete-implementor-2', type: 'class', label: 'SmsMessageSender', x: 360, y: 250, width: 220, height: 60, code: { 
            java: `
import org.springframework.stereotype.Component;

// Another Concrete Implementor
@Component("smsSenderImpl")
public class SmsMessageSender implements MessageSender {
    @Override
    public void sendMessage(String subject, String body) {
        System.out.println("Sending SMS: " + body);
    }
}
        `,
            python: `
# Another Concrete Implementor
class SmsMessageSender(MessageSender):
    def send_message(self, subject: str, body: str):
        print(f"Sending SMS: {body}")
        `,
            javascript: `
// Another Concrete Implementor
export class SmsMessageSender extends MessageSender {
    sendMessage(subject, body) {
        console.log(\`Sending SMS: \${body}\`);
    }
}
        `}},
        { id: 'arrow-bridge', type: 'arrow', x: 350, y: 145, arrowType: 'dependency', points: '240,210 H 300 C 320,210 470,210 470,80', label: 'bridges to', code: { 
            java: 'The Abstraction holds a reference to the Implementor, forming the "bridge".',
            python: 'The Abstraction holds a reference to the Implementor, forming the "bridge".',
            javascript: 'The Abstraction holds a reference to the Implementor, forming the "bridge".',
         } },
        { id: 'arrow-extends', type: 'arrow', label: '', x: 130, y: 280, arrowType: 'implementation', points: '130,320 V 240', code: { 
            java: 'Refined Abstractions extend the base Abstraction.',
            python: 'Refined Abstractions inherit from the base Abstraction.',
            javascript: 'Refined Abstractions extend the base Abstraction.',
        } },
        { id: 'arrow-impl-1', type: 'arrow', label: '', x: 470, y: 115, arrowType: 'implementation', points: '470,150 V 80', code: { 
            java: 'Concrete Implementors implement the Implementor interface.',
            python: 'Concrete Implementors inherit from the Implementor ABC.',
            javascript: 'Concrete Implementors extend the Implementor class.',
        } },
        { id: 'arrow-impl-2', type: 'arrow', label: '', x: 470, y: 215, arrowType: 'implementation', points: '470,250 V 80', code: { 
            java: 'Concrete Implementors implement the Implementor interface.',
            python: 'Concrete Implementors inherit from the Implementor ABC.',
            javascript: 'Concrete Implementors extend the Implementor class.',
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
  <rect x="70" y="60" width="10" height="120" class="activation" />

  <text x="275" y="30" class="lifeline-label" text-anchor="middle">:TextMessage</text>
  <line x1="275" y1="40" x2="275" y2="380" class="lifeline" />
  <rect x="270" y="80" width="10" height="80" class="activation" />
  
  <text x="475" y="30" class="lifeline-label" text-anchor="middle">:EmailSender</text>
  <line x1="475" y1="40" x2="475" y2="380" class="lifeline" />
  <rect x="470" y="120" width="10" height="20" class="activation" />

  <line x1="75" y1="80" x2="275" y2="80" class="message" />
  <text x="175" y="75" class="message-label" text-anchor="middle">1: send(msg)</text>

  <line x1="275" y1="120" x2="475" y2="120" class="message" />
  <text x="375" y="115" class="message-label" text-anchor="middle">2: sendMessage(msg)</text>
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
  <text x="70" y="250" class="label">Client App</text>

  <ellipse cx="280" cy="150" rx="150" ry="40" class="use-case" />
  <text x="280" y="155" class="label">Send Notification Cross-Platform</text>
  
  <line x1="105" y1="150" x2="130" y2="150" class="connector" />
</svg>
    `
  };