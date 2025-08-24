import { DesignPattern } from '../../types';

export const chainOfResponsibilityPattern: DesignPattern = {
    id: 'chain-of-responsibility',
    name: 'Chain of Responsibility',
    category: 'Behavioral',
    description: 'Avoid coupling the sender of a request to its receiver by giving more than one object a chance to handle the request. Chain the receiving objects and pass the request along the chain until an object handles it.',
    whenToUse: [
        'When you want to decouple a request\'s sender and receiver.',
        'When more than one object can handle a request, and the handler isn\'t known beforehand.',
        'When the set of objects that can handle a request should be specified dynamically.',
        'For creating processing pipelines, such as middleware in web frameworks (e.g., logging, authentication, caching).'
    ],
    whenNotToUse: [
        'If the request must be handled by a specific object. The pattern is designed for when the handler is not known.',
        'A request might not be handled at all if it reaches the end of the chain without a match.',
        'Can be difficult to debug if the chain becomes very long or complex.',
        'Can negatively impact performance due to the request traversing multiple handlers.'
    ],
    comparison: `
**Chain of Responsibility vs. Command:** The Command pattern encapsulates an action as an object, which can then be passed around. Chain of Responsibility is about finding the right object to execute a command. You can use them together: a client creates a Command object and passes it to the head of a chain of handlers.

**Chain of Responsibility vs. Decorator:** While both can involve a linked sequence of objects, their intent is different. A Decorator adds responsibilities to an object, and all decorators in the chain are usually executed. In Chain of Responsibility, the goal is for only *one* handler in the chain to process the request, and the chain is typically broken once that happens.
    `,
    diagram: {
        viewBox: "0 0 600 450",
        components: [
            { id: 'handler-interface', type: 'interface', label: 'RequestHandler', x: 200, y: 20, width: 200, height: 70, code: { 
                java: `
// The Handler interface declares a method for handling requests
// and an optional method for setting the next handler in the chain.
public interface RequestHandler {
    void setNext(RequestHandler next);
    boolean handle(Request request);
}
            `,
                python: `
from abc import ABC, abstractmethod

# The Handler interface.
class RequestHandler(ABC):
    @abstractmethod
    def set_next(self, handler: 'RequestHandler') -> 'RequestHandler':
        pass

    @abstractmethod
    def handle(self, request: dict) -> bool:
        pass
            `,
                javascript: `
// The Handler interface (simulated with a class).
export class RequestHandler {
    setNext(handler) {
        throw new Error("Method 'setNext()' must be implemented.");
    }
    
    handle(request) {
        throw new Error("Method 'handle()' must be implemented.");
    }
}
            `}},
            { id: 'base-handler', type: 'class', label: 'AbstractRequestHandler', x: 200, y: 120, width: 200, height: 80, code: { 
                java: `
// An optional abstract base class for handlers to implement the chaining behavior.
public abstract class AbstractRequestHandler implements RequestHandler {
    private RequestHandler next;
    
    @Override
    public void setNext(RequestHandler next) {
        this.next = next;
    }

    protected boolean handleNext(Request request) {
        if (next != null) {
            return next.handle(request);
        }
        return true; // Or false if unhandled requests are an error
    }
}
            `,
                python: `
from abc import ABC, abstractmethod

# An optional abstract base class for handlers.
class AbstractRequestHandler(RequestHandler):
    _next_handler: RequestHandler = None

    def set_next(self, handler: RequestHandler) -> RequestHandler:
        self._next_handler = handler
        return handler

    @abstractmethod
    def handle(self, request: dict) -> bool:
        if self._next_handler:
            return self._next_handler.handle(request)
        return True
            `,
                javascript: `
// An optional abstract base class for handlers.
export class AbstractRequestHandler extends RequestHandler {
    constructor() {
        super();
        this.nextHandler = null;
    }

    setNext(handler) {
        this.nextHandler = handler;
        return handler;
    }

    handle(request) {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }
        return true;
    }
}
            `}},
            { id: 'handler-1', type: 'class', label: 'AuthHandler', x: 20, y: 250, width: 160, height: 60, code: { 
                java: `
// A Concrete Handler
public class AuthHandler extends AbstractRequestHandler {
    @Override
    public boolean handle(Request request) {
        System.out.println("Checking authentication...");
        if (!request.isAuthenticated()) {
            return false; // Stop chain
        }
        return handleNext(request);
    }
}
            `,
                python: `
# A Concrete Handler
class AuthHandler(AbstractRequestHandler):
    def handle(self, request: dict) -> bool:
        print("Checking authentication...")
        if not request.get("isAuthenticated"):
            print("Auth failed!")
            return False  # Stop chain
        return super().handle(request)
            `,
                javascript: `
// A Concrete Handler
export class AuthHandler extends AbstractRequestHandler {
    handle(request) {
        console.log("Checking authentication...");
        if (!request.isAuthenticated) {
            console.log("Auth failed!");
            return false; // Stop chain
        }
        return super.handle(request);
    }
}
            `}},
            { id: 'handler-2', type: 'class', label: 'ValidationHandler', x: 220, y: 250, width: 160, height: 60, code: { 
                java: `
// Another Concrete Handler
public class ValidationHandler extends AbstractRequestHandler {
    @Override
    public boolean handle(Request request) {
        System.out.println("Validating request...");
        // ... validation logic ...
        return handleNext(request);
    }
}
            `,
                python: `
# Another Concrete Handler
class ValidationHandler(AbstractRequestHandler):
    def handle(self, request: dict) -> bool:
        print("Validating request...")
        # ... validation logic ...
        return super().handle(request)
            `,
                javascript: `
// Another Concrete Handler
export class ValidationHandler extends AbstractRequestHandler {
    handle(request) {
        console.log("Validating request...");
        // ... validation logic ...
        return super.handle(request);
    }
}
            `}},
            { id: 'handler-3', type: 'class', label: 'CacheHandler', x: 420, y: 250, width: 160, height: 60, code: { 
                java: `
// Another Concrete Handler
public class CacheHandler extends AbstractRequestHandler {
    @Override
    public boolean handle(Request request) {
        System.out.println("Checking cache...");
        // ... caching logic ...
        return handleNext(request);
    }
}
            `,
                python: `
# Another Concrete Handler
class CacheHandler(AbstractRequestHandler):
    def handle(self, request: dict) -> bool:
        print("Checking cache...")
        # ... caching logic ...
        return super().handle(request)
            `,
                javascript: `
// Another Concrete Handler
export class CacheHandler extends AbstractRequestHandler {
    handle(request) {
        console.log("Checking cache...");
        // ... caching logic ...
        return super.handle(request);
    }
}
            `}},
            { id: 'arrow-impl', type: 'arrow', label: '', arrowType: 'implementation', x: 300, y: 105, points: '300,120 V 90', code: { 
                java: 'Base handler implements the Handler interface.',
                python: 'Base handler implements the Handler ABC.',
                javascript: 'Base handler implements the Handler interface.',
            }},
            { id: 'arrow-extends-1', type: 'arrow', label: '', arrowType: 'implementation', x: 200, y: 225, points: '100,250 V 200 H 300', code: { 
                java: 'Concrete handlers extend the base handler.',
                python: 'Concrete handlers extend the base handler.',
                javascript: 'Concrete handlers extend the base handler.',
            }},
            { id: 'arrow-extends-2', type: 'arrow', label: '', arrowType: 'implementation', x: 300, y: 225, points: '300,250 V 200', code: { 
                java: 'Concrete handlers extend the base handler.',
                python: 'Concrete handlers extend the base handler.',
                javascript: 'Concrete handlers extend the base handler.',
            }},
            { id: 'arrow-extends-3', type: 'arrow', label: '', arrowType: 'implementation', x: 400, y: 225, points: '500,250 V 200 H 300', code: { 
                java: 'Concrete handlers extend the base handler.',
                python: 'Concrete handlers extend the base handler.',
                javascript: 'Concrete handlers extend the base handler.',
            }},
            { id: 'arrow-chain-1', type: 'arrow', label: 'next', arrowType: 'dependency', x: 200, y: 280, points: '180,280 H 220', code: { 
                java: 'Handlers are chained together.',
                python: 'Handlers are chained together.',
                javascript: 'Handlers are chained together.',
            }},
            { id: 'arrow-chain-2', type: 'arrow', label: 'next', arrowType: 'dependency', x: 400, y: 280, points: '380,280 H 420', code: { 
                java: 'Handlers are chained together.',
                python: 'Handlers are chained together.',
                javascript: 'Handlers are chained together.',
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
  <rect x="70" y="60" width="10" height="260" class="activation" />

  <text x="250" y="30" class="lifeline-label" text-anchor="middle">:AuthHandler</text>
  <line x1="250" y1="40" x2="250" y2="380" class="lifeline" />
  <rect x="245" y="80" width="10" height="220" class="activation" />
  
  <text x="425" y="30" class="lifeline-label" text-anchor="middle">:ValidationHandler</text>
  <line x1="425" y1="40" x2="425" y2="380" class="lifeline" />
  <rect x="420" y="140" width="10" height="140" class="activation" />
  
  <text x="575" y="30" class="lifeline-label" text-anchor="middle">:CacheHandler</text>
  <line x1="575" y1="40" x2="575" y2="380" class="lifeline" />
  <rect x="570" y="200" width="10" height="60" class="activation" />

  <line x1="75" y1="80" x2="250" y2="80" class="message" />
  <text x="162.5" y="75" class="message-label" text-anchor="middle">1: handle(request)</text>
  
  <line x1="250" y1="140" x2="425" y2="140" class="message" />
  <text x="337.5" y="135" class="message-label" text-anchor="middle">2: handleNext(request)</text>
  
  <line x1="425" y1="200" x2="575" y2="200" class="message" />
  <text x="500" y="195" class="message-label" text-anchor="middle">3: handleNext(request)</text>
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
  <text x="70" y="250" class="label">Client</text>

  <ellipse cx="280" cy="150" rx="150" ry="40" class="use-case" />
  <text x="280" y="155" class="label">Process Request via Pipeline</text>
  
  <line x1="105" y1="150" x2="130" y2="150" class="connector" />
</svg>
    `
  };