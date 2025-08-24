import { DesignPattern } from '../../types';

export const proxyPattern: DesignPattern = {
    id: 'proxy',
    name: 'Proxy',
    category: 'Structural',
    description: 'Provide a surrogate or placeholder for another object to control access to it. This can be used for lazy initialization, access control, logging, and more.',
    whenToUse: [
      'For lazy initialization of a heavyweight object (Virtual Proxy).',
      'To add a layer of security by checking access rights before forwarding a request (Protection Proxy).',
      'To represent an object located in a remote address space (Remote Proxy).',
      'To cache results of expensive operations (Caching Proxy).'
    ],
    whenNotToUse: [
      'When the object being proxied is simple and does not require any special access control or management.',
      'The pattern adds a layer of indirection, which can slightly impact performance for performance-critical tasks.',
      'If the client needs to differentiate between the proxy and the real object, it might violate the pattern\'s transparency.'
    ],
    comparison: `
**Proxy vs. Decorator:** Both wrap another object and have a similar structure. However, their intents are different. A Decorator adds or alters the behavior of an object. A Proxy controls access to the object. A proxy may or may not change the object's behavior.

**Proxy vs. Adapter:** An Adapter provides a *different* interface to the object it wraps to make it compatible with a client. A Proxy provides the *exact same* interface, making it transparent to the client.
    `,
    diagram: {
      viewBox: "0 0 500 400",
      components: [
        { id: 'subject', type: 'interface', label: 'ReportGenerator', x: 150, y: 20, width: 200, height: 60, code: { 
            java: `
// The Subject interface declares the common interface for both the
// RealSubject and the Proxy so that a Proxy can be used anywhere a
// RealSubject is expected.
public interface ReportGenerator {
    String generateReport(String data);
}
        `,
            python: `
from abc import ABC, abstractmethod

# The Subject interface
class ReportGenerator(ABC):
    @abstractmethod
    def generate_report(self, data: str) -> str:
        pass
        `,
            javascript: `
// The Subject interface (simulated)
export class ReportGenerator {
    generateReport(data) {
        throw new Error("Method 'generateReport()' must be implemented.");
    }
}
        `}},
        { id: 'real-subject', type: 'class', label: 'RealReportGenerator', x: 20, y: 150, width: 200, height: 80, code: { 
            java: `
import org.springframework.stereotype.Component;

// The RealSubject contains the core business logic.
// This is often a heavyweight object.
@Component("realReportGenerator")
public class RealReportGenerator implements ReportGenerator {
    public RealReportGenerator() {
        // Simulate expensive initial setup
        System.out.println("RealReportGenerator instance created (expensive).");
    }
    
    @Override
    public String generateReport(String data) {
        System.out.println("Generating complex report for: " + data);
        return "Report content for " + data;
    }
}
        `,
            python: `
# The RealSubject contains the core business logic.
class RealReportGenerator(ReportGenerator):
    def __init__(self):
        # Simulate expensive initial setup
        print("RealReportGenerator instance created (expensive).")

    def generate_report(self, data: str) -> str:
        print(f"Generating complex report for: {data}")
        return f"Report content for {data}"
        `,
            javascript: `
// The RealSubject contains the core business logic.
export class RealReportGenerator extends ReportGenerator {
    constructor() {
        super();
        // Simulate expensive initial setup
        console.log("RealReportGenerator instance created (expensive).");
    }

    generateReport(data) {
        console.log(\`Generating complex report for: \${data}\`);
        return \`Report content for \${data}\`;
    }
}
        `}},
        { id: 'proxy', type: 'class', label: 'ReportGeneratorProxy', x: 280, y: 150, width: 200, height: 120, code: { 
            java: `
import org.springframework.stereotype.Component;
import org.springframework.context.annotation.Primary;
import java.util.Map;
import java.util.HashMap;

// The Proxy has an interface identical to the RealSubject.
@Component
@Primary // Ensures this proxy is injected by default
public class ReportGeneratorProxy implements ReportGenerator {
    private RealReportGenerator realGenerator; // Reference to the real subject
    private Map<String, String> cache = new HashMap<>();
    
    @Override
    public String generateReport(String data) {
        // Caching Proxy logic
        if(cache.containsKey(data)) {
            System.out.println("Returning report from cache.");
            return cache.get(data);
        }

        // Virtual Proxy logic (lazy initialization)
        if (realGenerator == null) {
            realGenerator = new RealReportGenerator();
        }
        
        String report = realGenerator.generateReport(data);
        cache.put(data, report);
        return report;
    }
}
        `,
            python: `
# The Proxy has an interface identical to the RealSubject.
class ReportGeneratorProxy(ReportGenerator):
    def __init__(self):
        self._real_generator: RealReportGenerator = None
        self._cache = {}

    def generate_report(self, data: str) -> str:
        # Caching Proxy logic
        if data in self._cache:
            print("Returning report from cache.")
            return self._cache[data]

        # Virtual Proxy logic (lazy initialization)
        if self._real_generator is None:
            self._real_generator = RealReportGenerator()
        
        report = self._real_generator.generate_report(data)
        self._cache[data] = report
        return report
        `,
            javascript: `
// The Proxy has an interface identical to the RealSubject.
export class ReportGeneratorProxy extends ReportGenerator {
    constructor() {
        super();
        this.realGenerator = null;
        this.cache = {};
    }

    generateReport(data) {
        // Caching Proxy logic
        if (this.cache[data]) {
            console.log("Returning report from cache.");
            return this.cache[data];
        }

        // Virtual Proxy logic (lazy initialization)
        if (!this.realGenerator) {
            this.realGenerator = new RealReportGenerator();
        }

        const report = this.realGenerator.generateReport(data);
        this.cache[data] = report;
        return report;
    }
}
        `}},
        { id: 'arrow-impl-1', type: 'arrow', label: '', arrowType: 'implementation', x: 185, y: 115, points: "120,150 V 80 H 250", code: { java: 'RealSubject implements the Subject interface.' } },
        { id: 'arrow-impl-2', type: 'arrow', label: '', arrowType: 'implementation', x: 315, y: 115, points: "380,150 V 80 H 250", code: { java: 'Proxy also implements the Subject interface.' } },
        { id: 'arrow-controls', type: 'arrow', x: 250, y: 195, arrowType: 'dependency', points: '280,210 H 220', label: 'controls access to', code: { java: 'The Proxy holds a reference to the RealSubject and manages its lifecycle and access.' } }
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

  <text x="275" y="30" class="lifeline-label" text-anchor="middle">:Proxy</text>
  <line x1="275" y1="40" x2="275" y2="380" class="lifeline" />
  <rect x="270" y="80" width="10" height="160" class="activation" />
  
  <text x="475" y="30" class="lifeline-label" text-anchor="middle">:RealSubject</text>
  <line x1="475" y1="40" x2="475" y2="380" class="lifeline" />
  <rect x="470" y="140" width="10" height="80" class="activation" />

  <line x1="75" y1="80" x2="275" y2="80" class="message" />
  <text x="175" y="75" class="message-label" text-anchor="middle">1: request()</text>

  <line x1="275" y1="140" x2="475" y2="140" class="message" />
  <text x="375" y="135" class="message-label" text-anchor="middle">2: new() [lazy init]</text>
  
  <line x1="275" y1="200" x2="475" y2="200" class="message" />
  <text x="375" y="195" class="message-label" text-anchor="middle">3: request()</text>
  
  <line x1="275" y1="220" x2="75" y2="220" class="message" stroke-dasharray="4" />
  <text x="175" y="215" class="message-label" text-anchor="middle">4: returns result</text>
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
  <text x="280" y="155" class="label">Control Access to Resource</text>
  
  <line x1="105" y1="150" x2="130" y2="150" class="connector" />
</svg>
    `
  };