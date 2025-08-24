import { DesignPattern } from '../../types';

export const builderPattern: DesignPattern = {
    id: 'builder',
    name: 'Builder',
    category: 'Creational',
    description: 'Separates the construction of a complex object from its representation, allowing the same construction process to create various representations.',
    whenToUse: [
      'When you want to create a complex object with many parts or configuration options.',
      'To create an object that needs to be constructed in multiple steps (e.g., setting various fields).',
      'When you need to create different representations of an object using the same construction logic.',
      'To avoid a "telescoping constructor" (a constructor with a long list of optional parameters).'
    ],
    whenNotToUse: [
      'For simple objects with few attributes, the pattern adds unnecessary complexity.',
      'If the object is immutable and all its attributes are required, a regular constructor is often clearer.',
      'The pattern requires creating a separate Builder class, which increases the number of classes in the project.'
    ],
    comparison: `
**Builder vs. Abstract Factory:** The Builder pattern focuses on constructing a single, complex object step-by-step. The Abstract Factory pattern focuses on creating families of related, simple objects in one go. Builder returns the product as a final step, whereas Abstract Factory returns products immediately.

**Builder vs. Telescoping Constructor:** Instead of having multiple constructors with different parameter lists (e.g., \`new House(walls)\`, \`new House(walls, doors)\`, \`new House(walls, doors, windows)\`), the Builder pattern provides a fluent API for setting only the required parts (e.g., \`new HouseBuilder().withWalls().withWindows().build()\`). This greatly improves readability and maintainability. In modern Java, this is often handled by libraries like Lombok with the \`@Builder\` annotation.
    `,
    diagram: {
      viewBox: "0 0 600 400",
      components: [
        { id: 'product', type: 'class', label: 'EmailMessage', x: 200, y: 20, width: 200, height: 60, code: { 
            java: `
// The Product - a complex object. Often made immutable by hiding the constructor.
// Using Lombok's @Builder is a common, modern approach in Java.
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Builder
@Getter
@ToString
public class EmailMessage {
    private final String from;
    private final String to;
    private final String subject;
    private final String content;
    // ... other optional fields like cc, bcc, attachments ...
}
        `,
            python: `
# The Product - a complex object.
# dataclasses can simplify this, but a manual implementation is shown for clarity.
class EmailMessage:
    def __init__(self, builder):
        self.from_addr = builder.from_addr
        self.to_addr = builder.to_addr
        self.subject = builder.subject
        self.content = builder.content
        # ... other fields

    def __str__(self):
        return f"From: {self.from_addr}, To: {self.to_addr}, Subject: {self.subject}"
        `,
            javascript: `
// The Product - a complex object.
export class EmailMessage {
    constructor(builder) {
        this.from = builder.from;
        this.to = builder.to;
        this.subject = builder.subject;
        this.content = builder.content;
        // ... other fields
    }

    toString() {
        return \`From: \${this.from}, To: \${this.to}, Subject: \${this.subject}\`;
    }
}
        `}},
        { id: 'builder-interface', type: 'class', label: 'EmailMessage.Builder', x: 200, y: 150, width: 200, height: 100, code: { 
            java: `
// The Builder is often a static nested class of the Product.
// This is done automatically by Lombok's @Builder annotation.
// Manually, it would look like this:

public static class EmailMessageBuilder {
    private String from;
    private String to;
    // ... fields ...

    public EmailMessageBuilder from(String from) { this.from = from; return this; }
    public EmailMessageBuilder to(String to) { this.to = to; return this; }
    // ... other fluent setters ...
    
    public EmailMessage build() {
        // Can add validation here before creating the object.
        return new EmailMessage(this);
    }
}
        `,
            python: `
# The Builder. In Python, it's a separate class.
class EmailMessageBuilder:
    def __init__(self):
        self.from_addr = None
        self.to_addr = None
        self.subject = None
        self.content = None

    def set_from(self, from_addr: str):
        self.from_addr = from_addr
        return self

    def set_to(self, to_addr: str):
        self.to_addr = to_addr
        return self
    
    def set_subject(self, subject: str):
        self.subject = subject
        return self

    def set_content(self, content: str):
        self.content = content
        return self

    def build(self) -> 'EmailMessage':
        if not self.to_addr or not self.from_addr:
            raise ValueError("From and To addresses are required")
        return EmailMessage(self)
        `,
            javascript: `
// The Builder.
export class EmailMessageBuilder {
    constructor() {
        this.from = null;
        this.to = null;
        this.subject = '';
        this.content = '';
    }

    setFrom(from) {
        this.from = from;
        return this;
    }

    setTo(to) {
        this.to = to;
        return this;
    }
    
    setSubject(subject) {
        this.subject = subject;
        return this;
    }

    setContent(content) {
        this.content = content;
        return this;
    }

    build() {
        if (!this.to || !this.from) {
            throw new Error("From and To addresses are required");
        }
        return new EmailMessage(this);
    }
}
        `}},
        { id: 'client', type: 'class', label: 'Client', x: 200, y: 320, width: 200, height: 60, code: { 
            java: `
// The Director/Client which uses the builder.
public class MailClient {
    public void sendWelcomeEmail(String toAddress) {
        EmailMessage message = EmailMessage.builder()
            .from("noreply@example.com")
            .to(toAddress)
            .subject("Welcome!")
            .content("Thank you for signing up.")
            .build();
        
        System.out.println("Sending email: " + message);
        // ... logic to send the message ...
    }
}
        `,
            python: `
# The Director/Client which uses the builder.
class MailClient:
    def send_welcome_email(self, to_address: str):
        message = (EmailMessageBuilder()
            .set_from("noreply@example.com")
            .set_to(to_address)
            .set_subject("Welcome!")
            .set_content("Thank you for signing up.")
            .build())
            
        print(f"Sending email: {message}")
        # ... logic to send the message ...
        `,
            javascript: `
// The Director/Client which uses the builder.
export class MailClient {
    sendWelcomeEmail(toAddress) {
        const message = new EmailMessageBuilder()
            .setFrom("noreply@example.com")
            .setTo(toAddress)
            .setSubject("Welcome!")
            .setContent("Thank you for signing up.")
            .build();
            
        console.log(\`Sending email: \${message.toString()}\`);
        // ... logic to send the message ...
    }
}
        `}},
        { id: 'arrow-builds', type: 'arrow', label: 'builds', arrowType: 'dependency', x: 300, y: 115, points: "300,150 V 80", code: { 
            java: "The Builder's build() method creates and returns the final Product object.",
            python: "The Builder's build() method creates and returns the final Product object.",
            javascript: "The Builder's build() method creates and returns the final Product object.",
        } },
        { id: 'arrow-uses', type: 'arrow', label: 'uses', arrowType: 'dependency', x: 300, y: 285, points: "300,320 V 250", code: { 
            java: "The Client uses the Builder to construct the Product.",
            python: "The Client uses the Builder to construct the Product.",
            javascript: "The Client uses the Builder to construct the Product.",
        } },
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
  <rect x="70" y="60" width="10" height="320" class="activation" />

  <text x="275" y="30" class="lifeline-label" text-anchor="middle">:EmailBuilder</text>
  <line x1="275" y1="40" x2="275" y2="430" class="lifeline" />
  <rect x="270" y="80" width="10" height="280" class="activation" />
  
  <text x="475" y="30" class="lifeline-label" text-anchor="middle">:EmailMessage</text>
  <line x1="475" y1="40" x2="475" y2="430" class="lifeline" />
  <rect x="470" y="300" width="10" height="40" class="activation" />

  <!-- Messages -->
  <line x1="75" y1="80" x2="275" y2="80" class="message" />
  <text x="175" y="75" class="message-label" text-anchor="middle">1: new()</text>
  
  <line x1="75" y1="120" x2="275" y2="120" class="message" />
  <text x="175" y="115" class="message-label" text-anchor="middle">2: from(...)</text>
  
  <line x1="75" y1="160" x2="275" y2="160" class="message" />
  <text x="175" y="155" class="message-label" text-anchor="middle">3: to(...)</text>
  
  <line x1="75" y1="200" x2="275" y2="200" class="message" />
  <text x="175" y="195" class="message-label" text-anchor="middle">4: subject(...)</text>
  
  <line x1="75" y1="240" x2="275" y2="240" class="message" />
  <text x="175" y="235" class="message-label" text-anchor="middle">5: content(...)</text>
  
  <line x1="75" y1="280" x2="275" y2="280" class="message" />
  <text x="175" y="275" class="message-label" text-anchor="middle">6: build()</text>

  <line x1="275" y1="300" x2="475" y2="300" class="message" />
  <text x="375" y="295" class="message-label" text-anchor="middle">7: new(builder)</text>
  
  <line x1="275" y1="340" x2="75" y2="340" class="message" stroke-dasharray="4" />
  <text x="175" y="335" class="message-label" text-anchor="middle">8: returns message</text>
</svg>
    `,
    useCaseDiagram: `
<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">
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
  <text x="70" y="250" class="label">Client</text>

  <!-- Use Case -->
  <ellipse cx="270" cy="150" rx="110" ry="40" class="use-case" />
  <text x="270" y="155" class="label">Construct Complex Object</text>
  
  <!-- Connection -->
  <line x1="105" y1="150" x2="160" y2="150" class="connector" />
</svg>
    `
  };