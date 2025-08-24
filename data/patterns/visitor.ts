
import { DesignPattern } from '../../types';

export const visitorPattern: DesignPattern = {
    id: 'visitor',
    name: 'Visitor',
    category: 'Behavioral',
    description: 'Represent an operation to be performed on the elements of an object structure. Visitor lets you define a new operation without changing the classes of the elements on which it operates.',
    whenToUse: [
        'When you have an object structure and you want to perform many different and unrelated operations on its elements.',
        'When the classes in the object structure are stable, but you need to add new operations frequently.',
        'To avoid polluting your element classes with logic that is not their core responsibility.'
    ],
    whenNotToUse: [
        'If the hierarchy of element classes is not stable and new classes are added frequently. Every new element class requires updating the visitor interface and all concrete visitors.',
        'If the operations are tightly coupled with the element classes.',
        'Visitors often need to break the encapsulation of the element classes to get the data they need for their operations.'
    ],
    comparison: `
**Visitor vs. Iterator:** An Iterator is for traversing an object structure. A Visitor is for performing an operation on the elements of that structure. You can use an Iterator to traverse the structure and then pass each element to a Visitor to perform an operation.

**Visitor vs. Command:** A Command object encapsulates a single action. A Visitor encapsulates a set of related operations, one for each type of element in an object structure.
    `,
    diagram: {
        viewBox: "0 0 600 450",
        components: [
            { id: 'visitor-interface', type: 'interface', label: 'DocumentVisitor', x: 380, y: 20, width: 200, height: 80, code: { 
                java: `
// The Visitor interface declares a set of visiting methods that
// can take concrete elements of an object structure as arguments.
public interface DocumentVisitor {
    void visit(HeadingElement heading);
    void visit(ParagraphElement paragraph);
}
            `,
                python: `
from abc import ABC, abstractmethod

# The Visitor interface
class DocumentVisitor(ABC):
    @abstractmethod
    def visit_heading(self, heading: 'HeadingElement'):
        pass
    
    @abstractmethod
    def visit_paragraph(self, paragraph: 'ParagraphElement'):
        pass
            `,
                javascript: `
// The Visitor interface (simulated)
export class DocumentVisitor {
    visitHeading(heading) {
        throw new Error("Method 'visitHeading()' must be implemented.");
    }
    visitParagraph(paragraph) {
        throw new Error("Method 'visitParagraph()' must be implemented.");
    }
}
            `}},
            { id: 'concrete-visitor', type: 'class', label: 'HtmlExporterVisitor', x: 380, y: 150, width: 200, height: 80, code: { 
                java: `
// A Concrete Visitor implements several versions of the same
// behavior, tailored for different element classes.
public class HtmlExporterVisitor implements DocumentVisitor {
    @Override
    public void visit(HeadingElement heading) {
        System.out.println("Exporting heading to HTML...");
    }
    
    @Override
    public void visit(ParagraphElement paragraph) {
        System.out.println("Exporting paragraph to HTML...");
    }
}
            `,
                python: `
# A Concrete Visitor
class HtmlExporterVisitor(DocumentVisitor):
    def visit_heading(self, heading: 'HeadingElement'):
        print("Exporting heading to HTML...")

    def visit_paragraph(self, paragraph: 'ParagraphElement'):
        print("Exporting paragraph to HTML...")
            `,
                javascript: `
import { DocumentVisitor } from './DocumentVisitor.js';
// A Concrete Visitor
export class HtmlExporterVisitor extends DocumentVisitor {
    visitHeading(heading) {
        console.log("Exporting heading to HTML...");
    }
    
    visitParagraph(paragraph) {
        console.log("Exporting paragraph to HTML...");
    }
}
            `}},
            { id: 'element-interface', type: 'interface', label: 'DocumentElement', x: 20, y: 20, width: 200, height: 60, code: { 
                java: `
// The Element interface declares an 'accept' method that takes
// a visitor as an argument.
public interface DocumentElement {
    void accept(DocumentVisitor visitor);
}
            `,
                python: `
from abc import ABC, abstractmethod

# The Element interface
class DocumentElement(ABC):
    @abstractmethod
    def accept(self, visitor: 'DocumentVisitor'):
        pass
            `,
                javascript: `
// The Element interface (simulated)
export class DocumentElement {
    accept(visitor) {
        throw new Error("Method 'accept()' must be implemented.");
    }
}
            `}},
            { id: 'element-1', type: 'class', label: 'HeadingElement', x: 20, y: 150, width: 200, height: 60, code: { 
                java: `
// A Concrete Element must implement the 'accept' method.
public class HeadingElement implements DocumentElement {
    @Override
    public void accept(DocumentVisitor visitor) {
        visitor.visit(this); // Double dispatch
    }
}
            `,
                python: `
# A Concrete Element
class HeadingElement(DocumentElement):
    def accept(self, visitor: 'DocumentVisitor'):
        visitor.visit_heading(self) # Double dispatch
            `,
                javascript: `
import { DocumentElement } from './DocumentElement.js';
// A Concrete Element
export class HeadingElement extends DocumentElement {
    accept(visitor) {
        visitor.visitHeading(this); // Double dispatch
    }
}
            `}},
            { id: 'element-2', type: 'class', label: 'ParagraphElement', x: 20, y: 250, width: 200, height: 60, code: { 
                java: `
// Another Concrete Element
public class ParagraphElement implements DocumentElement {
    @Override
    public void accept(DocumentVisitor visitor) {
        visitor.visit(this); // Double dispatch
    }
}
            `,
                python: `
# Another Concrete Element
class ParagraphElement(DocumentElement):
    def accept(self, visitor: 'DocumentVisitor'):
        visitor.visit_paragraph(self) # Double dispatch
            `,
                javascript: `
import { DocumentElement } from './DocumentElement.js';
// Another Concrete Element
export class ParagraphElement extends DocumentElement {
    accept(visitor) {
        visitor.visitParagraph(this); // Double dispatch
    }
}
            `}},
            { id: 'arrow-visitor-impl', type: 'arrow', label: '', arrowType: 'implementation', x: 480, y: 125, points: '480,150 V 100', code: { java: 'Concrete visitor implements the visitor interface.'}},
            { id: 'arrow-element-impl-1', type: 'arrow', label: '', arrowType: 'implementation', x: 120, y: 115, points: '120,150 V 80', code: { java: 'Concrete elements implement the element interface.'}},
            { id: 'arrow-element-impl-2', type: 'arrow', label: '', arrowType: 'implementation', x: 120, y: 215, points: '120,250 V 80', code: { java: 'Concrete elements implement the element interface.'}},
            { id: 'arrow-accepts', type: 'arrow', label: 'accepts', x: 300, y: 50, arrowType: 'dependency', points: '220,50 H 380', code: { java: 'The Element interface has a dependency on the Visitor interface.'}},
            { id: 'arrow-visits1', type: 'arrow', label: 'visits', x: 300, y: 140, arrowType: 'dependency', points: '380, 190 C 300,190 300,190 220,180', code: { java: 'The Visitor knows about the concrete Elements it can visit.'}},
            { id: 'arrow-visits2', type: 'arrow', label: 'visits', x: 300, y: 240, arrowType: 'dependency', points: '380, 190 C 300,230 300,230 220,280', code: { java: 'The Visitor knows about the concrete Elements it can visit.'}}
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

  <text x="275" y="30" class="lifeline-label" text-anchor="middle">:ElementA</text>
  <line x1="275" y1="40" x2="275" y2="380" class="lifeline" />
  <rect x="270" y="80" width="10" height="160" class="activation" />
  
  <text x="475" y="30" class="lifeline-label" text-anchor="middle">:Visitor</text>
  <line x1="475" y1="40" x2="475" y2="380" class="lifeline" />
  <rect x="470" y="160" width="10" height="40" class="activation" />

  <line x1="75" y1="80" x2="275" y2="80" class="message" />
  <text x="175" y="75" class="message-label" text-anchor="middle">1: accept(visitor)</text>
  
  <line x1="275" y1="160" x2="475" y2="160" class="message" />
  <text x="375" y="155" class="message-label" text-anchor="middle">2: visit(this)</text>
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
  <text x="280" y="155" class="label">Add New Operation to Elements</text>
  
  <line x1="105" y1="150" x2="130" y2="150" class="connector" />
</svg>
    `
  };
