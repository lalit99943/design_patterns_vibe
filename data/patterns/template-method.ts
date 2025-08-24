
import { DesignPattern } from '../../types';

export const templateMethodPattern: DesignPattern = {
    id: 'template-method',
    name: 'Template Method',
    category: 'Behavioral',
    description: 'Define the skeleton of an algorithm in an operation, deferring some steps to subclasses. Template Method lets subclasses redefine certain steps of an algorithm without changing the algorithm\'s structure.',
    whenToUse: [
        'When you want to let subclasses implement varying behavior for certain steps of a single algorithm.',
        'To avoid code duplication by pulling common behavior into a single superclass.',
        'To control subclass extensions. You can make the template method final to prevent subclasses from changing the overall algorithm structure.'
    ],
    whenNotToUse: [
        'When the algorithm\'s structure varies significantly between implementations. Strategy pattern is often a better choice.',
        'For simple algorithms where creating a class hierarchy is an overkill.',
        'If the hook operations are not well-defined, it can lead to confusion for developers subclassing your component.'
    ],
    comparison: `
**Template Method vs. Strategy:** The Template Method pattern is based on **inheritance**. It allows subclasses to override parts of an algorithm by implementing abstract methods or overriding hooks. The overall structure of the algorithm is fixed in the superclass. The Strategy pattern is based on **composition**. An object (the context) holds a reference to a strategy object, and can switch strategies at runtime. Strategy varies the entire algorithm, while Template Method varies parts of it.

**Template Method vs. Factory Method:** These patterns are often used together. The Template Method defines the skeleton of an algorithm, and it might call a Factory Method to create an object that is needed for one of its steps. The Factory Method's purpose is object creation, while the Template Method's purpose is to define an algorithm's structure.
    `,
    diagram: {
        viewBox: "0 0 500 400",
        components: [
            { id: 'abstract-class', type: 'class', label: 'DataProcessor', x: 150, y: 20, width: 200, height: 100, code: { java: `
// The Abstract Class contains the template method and abstract steps.
public abstract class DataProcessor {
    // The template method - its structure is final.
    public final void process() {
        readData();
        transformData();
        saveData();
    }

    // Abstract methods to be implemented by subclasses.
    protected abstract void readData();
    protected abstract void transformData();
    protected abstract void saveData();
}
            `}},
            { id: 'concrete-class-1', type: 'class', label: 'CsvDataProcessor', x: 20, y: 200, width: 200, height: 80, code: { java: `
// A Concrete Class providing specific implementations for the steps.
public class CsvDataProcessor extends DataProcessor {
    @Override
    protected void readData() {
        System.out.println("Reading data from CSV file.");
    }

    @Override
    protected void transformData() {
        System.out.println("Transforming CSV data.");
    }

    @Override
    protected void saveData() {
        System.out.println("Saving data to database.");
    }
}
            `}},
            { id: 'concrete-class-2', type: 'class', label: 'JsonDataProcessor', x: 280, y: 200, width: 200, height: 80, code: { java: `
// Another Concrete Class with different implementations.
public class JsonDataProcessor extends DataProcessor {
    @Override
    protected void readData() {
        System.out.println("Reading data from JSON file.");
    }

    @Override
    protected void transformData() {
        System.out.println("Transforming JSON data.");
    }

    @Override
    protected void saveData() {
        System.out.println("Saving data to a message queue.");
    }
}
            `}},
            { id: 'arrow-impl-1', type: 'arrow', label: '', arrowType: 'implementation', x: 185, y: 160, points: "120,200 V 120 H 250", code: { java: 'Subclasses extend the abstract class and provide implementations for the abstract steps.'}},
            { id: 'arrow-impl-2', type: 'arrow', label: '', arrowType: 'implementation', x: 315, y: 160, points: "380,200 V 120 H 250", code: { java: 'Subclasses extend the abstract class and provide implementations for the abstract steps.'}}
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

  <text x="75" y="30" class="lifeline-label" text-anchor="middle">:Client</text>
  <line x1="75" y1="40" x2="75" y2="380" class="lifeline" />
  <rect x="70" y="60" width="10" height="240" class="activation" />

  <text x="300" y="30" class="lifeline-label" text-anchor="middle">:ConcreteClass</text>
  <line x1="300" y1="40" x2="300" y2="380" class="lifeline" />
  <rect x="295" y="80" width="10" height="200" class="activation" />

  <line x1="75" y1="80" x2="300" y2="80" class="message" />
  <text x="187.5" y="75" class="message-label" text-anchor="middle">1: templateMethod()</text>
  
  <path d="M 300 120 C 350 120, 350 140, 300 140" stroke="#C9D1D9" stroke-width="1" fill="none" marker-end="url(#seq-arrow)" />
  <text x="360" y="135" class="message-label" text-anchor="middle">2: step1()</text>

  <path d="M 300 180 C 350 180, 350 200, 300 200" stroke="#C9D1D9" stroke-width="1" fill="none" marker-end="url(#seq-arrow)" />
  <text x="360" y="195" class="message-label" text-anchor="middle">3: step2()</text>

  <path d="M 300 240 C 350 240, 350 260, 300 260" stroke="#C9D1D9" stroke-width="1" fill="none" marker-end="url(#seq-arrow)" />
  <text x="360" y="255" class="message-label" text-anchor="middle">4: step3()</text>
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
  <text x="70" y="250" class="label">Developer</text>

  <ellipse cx="280" cy="150" rx="150" ry="40" class="use-case" />
  <text x="280" y="155" class="label">Implement Algorithm with Custom Steps</text>
  
  <line x1="105" y1="150" x2="130" y2="150" class="connector" />
</svg>
    `
  };
