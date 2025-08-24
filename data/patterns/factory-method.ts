import { DesignPattern } from '../../types';

export const factoryMethodPattern: DesignPattern = {
    id: 'factory-method',
    name: 'Factory Method',
    category: 'Creational',
    description: 'Defines an interface for creating an object, but let subclasses decide which class to instantiate. Factory Method lets a class defer instantiation to subclasses.',
    whenToUse: [
      'When a class cannot anticipate the class of objects it must create.',
      'When a class wants its subclasses to specify the objects it creates.',
      'To provide users of a library or framework a way to extend its internal components.',
      'To decouple client code from the concrete classes it needs to instantiate.'
    ],
    whenNotToUse: [
        'When the object creation is simple and not expected to change. The pattern can introduce unnecessary complexity.',
        'If you only have one concrete creator, it might be an over-engineering.',
        'The pattern forces you to subclass the creator class just to change the product type, which can lead to a parallel class hierarchy.'
    ],
    comparison: `
**Factory Method vs. Abstract Factory:** The Factory Method pattern uses inheritance to delegate object creation to subclasses, focusing on creating a *single* product object. In contrast, the Abstract Factory pattern uses object composition to create *families* of related or dependent objects. You often see Factory Methods used to implement the methods of an Abstract Factory.

**Factory Method vs. Simple Factory:** A Simple Factory is not an official GoF pattern. It's typically a single class with a method that returns different types of objects based on input parameters. It centralizes creation but is not as extensible as the Factory Method, which uses subclasses to introduce new product types without modifying the creator's core logic.
    `,
    diagram: {
        viewBox: "0 0 600 400",
        components: [
            { id: 'creator-interface', type: 'interface', label: 'NotificationSender', x: 200, y: 20, width: 200, height: 60, code: { 
                java: `
// The Creator interface declares the factory method.
public interface NotificationSender {
    // This is the Factory Method.
    Notification createNotification();

    default void send() {
        Notification notification = createNotification();
        notification.send();
    }
}
            `,
                python: `
from abc import ABC, abstractmethod

# The Creator ABC declares the factory method.
class NotificationSender(ABC):
    @abstractmethod
    def create_notification(self) -> 'Notification':
        # This is the Factory Method.
        pass

    def send(self):
        notification = self.create_notification()
        notification.send()
            `,
                javascript: `
// The Creator class declares the factory method.
export class NotificationSender {
    // This is the Factory Method.
    createNotification() {
        throw new Error("createNotification() must be implemented by subclasses");
    }

    send() {
        const notification = this.createNotification();
        notification.send();
    }
}
            `}},
            { id: 'product-interface', type: 'interface', label: 'Notification', x: 200, y: 280, width: 200, height: 60, code: { 
                java: `
// The Product interface defines the common interface
// for objects the factory method creates.
public interface Notification {
    void send();
}
            `,
                python: `
from abc import ABC, abstractmethod

# The Product interface.
class Notification(ABC):
    @abstractmethod
    def send(self):
        pass
            `,
                javascript: `
// The Product interface (simulated as a class).
export class Notification {
    send() {
        throw new Error("Method 'send()' must be implemented.");
    }
}
            `}},
            { id: 'concrete-creator-email', type: 'class', label: 'EmailSender', x: 50, y: 150, width: 200, height: 60, code: { 
                java: `
import org.springframework.stereotype.Component;

// A Concrete Creator
@Component("emailSender")
public class EmailSender implements NotificationSender {
    @Override
    public Notification createNotification() {
        // Returns a specific Concrete Product
        return new EmailNotification();
    }
}
            `,
                python: `
# A Concrete Creator
class EmailSender(NotificationSender):
    def create_notification(self) -> 'Notification':
        # Returns a specific Concrete Product
        return EmailNotification()
            `,
                javascript: `
import { EmailNotification } from './EmailNotification.js';

// A Concrete Creator
export class EmailSender extends NotificationSender {
    createNotification() {
        // Returns a specific Concrete Product
        return new EmailNotification();
    }
}
            `}},
            { id: 'concrete-creator-sms', type: 'class', label: 'SmsSender', x: 350, y: 150, width: 200, height: 60, code: { 
                java: `
import org.springframework.stereotype.Component;

// Another Concrete Creator
@Component("smsSender")
public class SmsSender implements NotificationSender {
    @Override
    public Notification createNotification() {
        // Returns another specific Concrete Product
        return new SmsNotification();
    }
}
            `,
                python: `
# Another Concrete Creator
class SmsSender(NotificationSender):
    def create_notification(self) -> 'Notification':
        # Returns another specific Concrete Product
        return SmsNotification()
            `,
                javascript: `
import { SmsNotification } from './SmsNotification.js';

// Another Concrete Creator
export class SmsSender extends NotificationSender {
    createNotification() {
        // Returns another specific Concrete Product
        return new SmsNotification();
    }
}
            `}},
            { id: 'concrete-product-email', type: 'class', label: 'EmailNotification', x: 50, y: 350, width: 200, height: 50, code: { 
                java: `
// A Concrete Product
public class EmailNotification implements Notification {
    @Override
    public void send() {
        System.out.println("Sending an Email notification...");
    }
}
            `,
                python: `
# A Concrete Product
class EmailNotification(Notification):
    def send(self):
        print("Sending an Email notification...")
            `,
                javascript: `
// A Concrete Product
export class EmailNotification extends Notification {
    send() {
        console.log("Sending an Email notification...");
    }
}
            `}},
            { id: 'concrete-product-sms', type: 'class', label: 'SmsNotification', x: 350, y: 350, width: 200, height: 50, code: { 
                java: `
// Another Concrete Product
public class SmsNotification implements Notification {
    @Override
    public void send() {
        System.out.println("Sending an SMS notification...");
    }
}
            `,
                python: `
# Another Concrete Product
class SmsNotification(Notification):
    def send(self):
        print("Sending an SMS notification...")
            `,
                javascript: `
// Another Concrete Product
export class SmsNotification extends Notification {
    send() {
        console.log("Sending an SMS notification...");
    }
}
            `}},
            { id: 'arrow-creator-impl-1', type: 'arrow', label: '', arrowType: 'implementation', x: 225, y: 115, points: "150,150 V 80 H 300", code: { 
                java: "EmailSender implements the NotificationSender interface.",
                python: "EmailSender inherits from the NotificationSender ABC.",
                javascript: "EmailSender extends the NotificationSender class.",
            } },
            { id: 'arrow-creator-impl-2', type: 'arrow', label: '', arrowType: 'implementation', x: 375, y: 115, points: "450,150 V 80 H 300", code: { 
                java: "SmsSender implements the NotificationSender interface.",
                python: "SmsSender inherits from the NotificationSender ABC.",
                javascript: "SmsSender extends the NotificationSender class.",
            } },
            { id: 'arrow-product-impl-1', type: 'arrow', label: '', arrowType: 'implementation', x: 225, y: 345, points: "150,350 V 340 H 300", code: { 
                java: "EmailNotification implements the Notification interface.",
                python: "EmailNotification inherits from the Notification ABC.",
                javascript: "EmailNotification extends the Notification class.",
            } },
            { id: 'arrow-product-impl-2', type: 'arrow', label: '', arrowType: 'implementation', x: 375, y: 345, points: "450,350 V 340 H 300", code: { 
                java: "SmsNotification implements the Notification interface.",
                python: "SmsNotification inherits from the Notification ABC.",
                javascript: "SmsNotification extends the Notification class.",
            } },
            { id: 'arrow-create-1', type: 'arrow', label: 'creates', arrowType: 'dependency', x: 150, y: 280, points: "150,210 V 350", code: { 
                java: "EmailSender's createNotification() method instantiates an EmailNotification object.",
                python: "EmailSender's create_notification() method instantiates an EmailNotification object.",
                javascript: "EmailSender's createNotification() method instantiates an EmailNotification object.",
            } },
            { id: 'arrow-create-2', type: 'arrow', label: 'creates', arrowType: 'dependency', x: 450, y: 280, points: "450,210 V 350", code: { 
                java: "SmsSender's createNotification() method instantiates an SmsNotification object.",
                python: "SmsSender's create_notification() method instantiates an SmsNotification object.",
                javascript: "SmsSender's createNotification() method instantiates an SmsNotification object.",
            } },
        ]
    },
    sequenceDiagram: `
<svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg" font-family="monospace">
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
  <line x1="75" y1="40" x2="75" y2="380" class="lifeline" />
  <rect x="70" y="60" width="10" height="200" class="activation" />

  <text x="250" y="30" class="lifeline-label" text-anchor="middle">:EmailSender</text>
  <line x1="250" y1="40" x2="250" y2="380" class="lifeline" />
  <rect x="245" y="80" width="10" height="160" class="activation" />
  
  <text x="425" y="30" class="lifeline-label" text-anchor="middle">:EmailNotification</text>
  <line x1="425" y1="40" x2="425" y2="380" class="lifeline" />
  <rect x="420" y="140" width="10" height="40" class="activation" />

  <!-- Messages -->
  <line x1="75" y1="80" x2="250" y2="80" class="message" />
  <text x="162.5" y="75" class="message-label" text-anchor="middle">1: send()</text>
  
  <path d="M 250 110 C 300 110, 300 130, 250 130" stroke="#C9D1D9" stroke-width="1" fill="none" marker-end="url(#seq-arrow)" />
  <text x="310" y="125" class="message-label" text-anchor="middle">2: createNotification()</text>

  <line x1="250" y1="140" x2="425" y2="140" class="message" />
  <text x="337.5" y="135" class="message-label" text-anchor="middle">3: new()</text>
  
  <line x1="425" y1="160" x2="250" y2="160" class="message" stroke-dasharray="4" />
  <text x="337.5" y="155" class="message-label" text-anchor="middle">4: returns product</text>
  
  <line x1="250" y1="200" x2="425" y2="200" class="message" />
  <text x="337.5" y="195" class="message-label" text-anchor="middle">5: send()</text>
</svg>
    `,
    useCaseDiagram: `
<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
  <style>
    .actor { stroke: #C9D1D9; stroke-width: 2; }
    .use-case { stroke: #58A6FF; stroke-width: 2; fill: none; }
    .label { fill: #C9D1D9; font-size: 14px; text-anchor: middle; }
    .connector { stroke: #C9D1D9; stroke-width: 1; }
    .boundary { stroke: #8B949E; stroke-width: 1; fill: none; stroke-dasharray: 4; }
  </style>

  <!-- System Boundary -->
  <rect x="150" y="50" width="220" height="200" class="boundary" />
  <text x="260" y="40" class="label">Notification System</text>

  <!-- Actor -->
  <circle cx="70" cy="110" r="20" fill="none" class="actor" />
  <line x1="70" y1="130" x2="70" y2="180" class="actor" />
  <line x1="40" y1="150" x2="100" y2="150" class="actor" />
  <line x1="70" y1="180" x2="50" y2="230" class="actor" />
  <line x1="70" y1="180" x2="90" y2="230" class="actor" />
  <text x="70" y="250" class="label">Client Code</text>

  <!-- Use Case -->
  <ellipse cx="260" cy="150" rx="100" ry="40" class="use-case" />
  <text x="260" y="155" class="label">Send Notification</text>
  
  <!-- Connection -->
  <line x1="105" y1="150" x2="160" y2="150" class="connector" />
</svg>
    `
  };