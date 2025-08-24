
import { DesignPattern } from '../../types';

export const adapterPattern: DesignPattern = {
    id: 'adapter',
    name: 'Adapter',
    category: 'Structural',
    description: 'Converts the interface of a class into another interface clients expect. Adapter lets classes work together that couldn\'t otherwise because of incompatible interfaces.',
    whenToUse: [
      'When you want to use an existing class, but its interface does not match the one you need.',
      'When you want to create a reusable class that cooperates with unrelated or unforeseen classes.',
      'When you need to use several existing subclasses, but it\'s impractical to adapt their interface by subclassing every one.'
    ],
    whenNotToUse: [
      'When the interfaces are already compatible. The pattern adds an unnecessary layer of indirection.',
      'If you can modify the source code of the adaptee to match the target interface, that is often a simpler solution.',
      'If the adaptation logic is very complex, it might be a sign of a deeper architectural mismatch.'
    ],
    comparison: `
**Adapter vs. Decorator:** An Adapter changes the interface of an existing object, while a Decorator enhances an object's responsibilities without changing its interface. You use an Adapter when you *have* an object but it has the *wrong* interface. You use a Decorator when you want to add functionality to an object.

**Adapter vs. Proxy:** A Proxy provides the *same* interface as its subject, but the proxy can add special behavior like access control or lazy loading. An Adapter provides a *different* interface and is used to make incompatible objects work together.
    `,
    diagram: {
      viewBox: "0 0 600 400",
      components: [
        { id: 'target', type: 'interface', label: 'LegacyDataProcessor', x: 200, y: 20, width: 220, height: 60, code: {
            java: `
// The Target interface that the client code uses.
// It expects to work with data in a modern format (e.g., a Map).
public interface LegacyDataProcessor {
    void process(Map<String, String> data);
}
`,
            python: `
from abc import ABC, abstractmethod
from typing import Dict

# The Target interface that the client code uses.
# It expects to work with data in a modern format (e.g., a dict).
class LegacyDataProcessor(ABC):
    @abstractmethod
    def process(self, data: Dict[str, str]):
        pass
`,
            javascript: `
// The Target interface (simulated with a class) that the client code uses.
// It expects to work with data in a modern format (e.g., an Object).
export class LegacyDataProcessor {
    process(data) {
        throw new Error("process() must be implemented by subclasses");
    }
}
`
        }},
        { id: 'client', type: 'class', label: 'ModernAppService', x: 200, y: 300, width: 220, height: 60, code: {
            java: `
import org.springframework.stereotype.Service;
import java.util.Map;

@Service
public class ModernAppService {
    // The service is coupled to the target interface.
    private final LegacyDataProcessor processor;
    
    // In Spring, the correct adapter implementation can be injected.
    public ModernAppService(LegacyDataProcessor processor) {
        this.processor = processor;
    }
    
    public void handleData(Map<String, String> modernData) {
        System.out.println("ModernAppService is processing data.");
        processor.process(modernData);
    }
}
`,
            python: `
from typing import Dict

# The client, which is coupled to the target interface.
class ModernAppService:
    def __init__(self, processor: 'LegacyDataProcessor'):
        self._processor = processor
        
    def handle_data(self, modern_data: Dict[str, str]):
        print("ModernAppService is processing data.")
        self._processor.process(modern_data)
`,
            javascript: `
// The client, which is coupled to the target interface.
// In a framework like NestJS, the processor would be injected.
export class ModernAppService {
    constructor(processor) {
        this.processor = processor;
    }

    handleData(modernData) {
        console.log("ModernAppService is processing data.");
        this.processor.process(modernData);
    }
}
`
        }},
        { id: 'adapter', type: 'class', label: 'XmlAdapter', x: 20, y: 150, width: 220, height: 80, code: {
            java: `
import org.springframework.stereotype.Component;
import java.util.Map;

// The Adapter makes the Adaptee's interface compatible with the Target's interface.
@Component
public class XmlAdapter implements LegacyDataProcessor {
    private final XmlDataSource xmlDataSource; // The Adaptee

    public XmlAdapter(XmlDataSource xmlDataSource) {
        this.xmlDataSource = xmlDataSource;
    }

    @Override
    public void process(Map<String, String> data) {
        // Conversion logic: Map -> XML
        System.out.println("Adapter converting modern Map data to legacy XML format.");
        String xml = convertMapToXml(data);
        xmlDataSource.processXml(xml);
    }

    private String convertMapToXml(Map<String, String> data) {
        // Dummy conversion for demonstration
        StringBuilder xmlBuilder = new StringBuilder("<data>");
        for (Map.Entry<String, String> entry : data.entrySet()) {
            xmlBuilder.append("<").append(entry.getKey()).append(">");
            xmlBuilder.append(entry.getValue());
            xmlBuilder.append("</").append(entry.getKey()).append(">");
        }
        xmlBuilder.append("</data>");
        return xmlBuilder.toString();
    }
}
`,
            python: `
from typing import Dict

# The Adapter makes the Adaptee's interface compatible with the Target's interface.
class XmlAdapter(LegacyDataProcessor):
    def __init__(self, xml_source: 'XmlDataSource'):
        self._xml_source = xml_source

    def process(self, data: Dict[str, str]):
        # Conversion logic: dict -> XML
        print("Adapter converting modern dict data to legacy XML format.")
        xml = self._convert_dict_to_xml(data)
        self._xml_source.process_xml(xml)
        
    def _convert_dict_to_xml(self, data: Dict[str, str]) -> str:
        # Dummy conversion for demonstration
        xml_parts = ["<data>"]
        for key, value in data.items():
            xml_parts.append(f"<{key}>{value}</{key}>")
        xml_parts.append("</data>")
        return "".join(xml_parts)
`,
            javascript: `
import { LegacyDataProcessor } from './LegacyDataProcessor.js';

// The Adapter makes the Adaptee's interface compatible with the Target's interface.
export class XmlAdapter extends LegacyDataProcessor {
    constructor(xmlDataSource) {
        super();
        this.xmlDataSource = xmlDataSource;
    }

    process(data) {
        // Conversion logic: Object -> XML
        console.log("Adapter converting modern Object data to legacy XML format.");
        const xml = this._convertObjectToXml(data);
        this.xmlDataSource.processXml(xml);
    }
    
    _convertObjectToXml(data) {
        // Dummy conversion for demonstration
        let xml = '<data>';
        for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
                xml += '<' + key + '>' + data[key] + '</' + key + '>';
            }
        }
        xml += '</data>';
        return xml;
    }
}
`
        }},
        { id: 'adaptee', type: 'class', label: 'XmlDataSource', x: 360, y: 150, width: 220, height: 60, code: {
            java: `
import org.springframework.stereotype.Component;

// The Adaptee - an existing class with an incompatible interface.
// It processes data in an XML format.
@Component
public class XmlDataSource {
    public void processXml(String xmlData) {
        System.out.println("Processing data in XML format: " + xmlData);
    }
}
`,
            python: `
# The Adaptee - an existing class with an incompatible interface.
# It processes data in an XML format.
class XmlDataSource:
    def process_xml(self, xml_data: str):
        print(f"Processing data in XML format: {xml_data}")
`,
            javascript: `
// The Adaptee - an existing class with an incompatible interface.
// It processes data in an XML format.
export class XmlDataSource {
    processXml(xmlData) {
        console.log(\`Processing data in XML format: \${xmlData}\`);
    }
}
`
        }},
        { id: 'arrow-impl', type: 'arrow', label: '', x: 220, y: 115, arrowType: 'implementation', points: "130,150 V 80 H 310", code: { 
            java: 'The Adapter implements the Target interface.',
            python: 'The Adapter inherits from the Target abstract base class.',
            javascript: 'The Adapter extends the Target class.',
        }},
        { id: 'arrow-uses', type: 'arrow', label: 'uses', x: 310, y: 300, arrowType: 'dependency', points: "310,300 V 80", code: {
            java: 'The Client works with objects that implement the Target interface.',
            python: 'The Client works with objects that implement the Target interface.',
            javascript: 'The Client works with objects that implement the Target interface.',
        }},
        { id: 'arrow-wraps', type: 'arrow', label: 'wraps', x: 300, y: 180, arrowType: 'dependency', points: "240,190 H 360", code: {
            java: 'The Adapter holds a reference to the Adaptee.',
            python: 'The Adapter holds a reference to the Adaptee.',
            javascript: 'The Adapter holds a reference to the Adaptee.',
        }}
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

  <text x="275" y="30" class="lifeline-label" text-anchor="middle">:Adapter</text>
  <line x1="275" y1="40" x2="275" y2="380" class="lifeline" />
  <rect x="270" y="80" width="10" height="160" class="activation" />
  
  <text x="475" y="30" class="lifeline-label" text-anchor="middle">:Adaptee</text>
  <line x1="475" y1="40" x2="475" y2="380" class="lifeline" />
  <rect x="470" y="160" width="10" height="40" class="activation" />

  <line x1="75" y1="80" x2="275" y2="80" class="message" />
  <text x="175" y="75" class="message-label" text-anchor="middle">1: request(data)</text>
  
  <line x1="275" y1="160" x2="475" y2="160" class="message" />
  <text x="375" y="155" class="message-label" text-anchor="middle">2: specificRequest(convertedData)</text>
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
  <text x="280" y="155" class="label">Integrate with Legacy System</text>
  
  <line x1="105" y1="150" x2="130" y2="150" class="connector" />
</svg>
    `
  };
