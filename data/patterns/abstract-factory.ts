
import { DesignPattern } from '../../types';

export const abstractFactoryPattern: DesignPattern = {
    id: 'abstract-factory',
    name: 'Abstract Factory',
    category: 'Creational',
    description: 'Provides an interface for creating families of related or dependent objects without specifying their concrete classes. It\'s a factory of factories.',
    whenToUse: [
      'When your system needs to be independent of how its products are created, composed, and represented.',
      'When a system needs to be configured with one of multiple families of products.',
      'When you want to provide a class library of products, and you want to reveal only their interfaces, not their implementations.',
      'To enforce constraints that items from different families should not be mixed.'
    ],
    whenNotToUse: [
      'The pattern can be complex to set up. If you only have a few product types, it might be overkill.',
      'Adding a new kind of product is difficult. It requires changing the Abstract Factory interface and all of its concrete subclasses.',
      'If the products don\'t have a common theme or family, the pattern doesn\'t provide much benefit.'
    ],
    comparison: `
**Abstract Factory vs. Factory Method:** Factory Method is a single method that creates one type of product, deferring the choice of the concrete class to its subclasses. Abstract Factory is an object that has multiple factory methods, each for creating a different product from a related family. An Abstract Factory is often implemented using several Factory Methods.

**Abstract Factory vs. Builder:** Abstract Factory focuses on creating families of related objects (e.g., a MacButton and a MacCheckbox). The Builder pattern focuses on constructing a single, complex object step-by-step (e.g., an HTTP request with headers, body, and method). Abstract Factory returns the product immediately, while Builder lets you construct the object part-by-part and only returns it on the final step.
    `,
    diagram: {
      viewBox: "0 0 700 500",
      components: [
        // Abstract Factory
        { id: 'abs-factory', type: 'interface', label: 'DataSourceFactory', x: 225, y: 20, width: 250, height: 70, code: {
java: `
// Abstract Factory Interface
// Declares methods for creating each of the abstract products.
public interface DataSourceFactory {
    Connection createConnection();
    Transaction createTransaction();
}
`,
python: `
from abc import ABC, abstractmethod

# Abstract Factory Interface
# Declares methods for creating each of the abstract products.
class DataSourceFactory(ABC):
    @abstractmethod
    def create_connection(self) -> 'Connection':
        pass

    @abstractmethod
    def create_transaction(self) -> 'Transaction':
        pass
`,
javascript: `
// Abstract Factory Interface (simulated with a class)
// Declares methods for creating each of the abstract products.
export class DataSourceFactory {
    createConnection() {
        throw new Error("createConnection() must be implemented by subclasses");
    }

    createTransaction() {
        throw new Error("createTransaction() must be implemented by subclasses");
    }
}
`
        }},
        // Concrete Factories
        { id: 'concrete-factory-db', type: 'class', label: 'DatabaseSourceFactory', x: 50, y: 120, width: 250, height: 60, code: {
java: `
import org.springframework.stereotype.Component;

// Concrete Factory for Database sources
@Component("databaseFactory")
public class DatabaseSourceFactory implements DataSourceFactory {
    @Override
    public Connection createConnection() {
        return new DatabaseConnection();
    }
    @Override
    public Transaction createTransaction() {
        return new DatabaseTransaction();
    }
}
`,
python: `
# Concrete Factory for Database sources
# In a framework like FastAPI, this might be a dependency provider.
class DatabaseSourceFactory(DataSourceFactory):
    def create_connection(self) -> 'Connection':
        return DatabaseConnection()

    def create_transaction(self) -> 'Transaction':
        return DatabaseTransaction()
`,
javascript: `
import { DatabaseConnection } from './DatabaseConnection.js';
import { DatabaseTransaction } from './DatabaseTransaction.js';

// Concrete Factory for Database sources
// In a framework like NestJS, this would be an injectable provider.
export class DatabaseSourceFactory extends DataSourceFactory {
    createConnection() {
        return new DatabaseConnection();
    }

    createTransaction() {
        return new DatabaseTransaction();
    }
}
`
        }},
        { id: 'concrete-factory-api', type: 'class', label: 'ApiSourceFactory', x: 400, y: 120, width: 250, height: 60, code: {
java: `
import org.springframework.stereotype.Component;

// Concrete Factory for API sources
@Component("apiFactory")
public class ApiSourceFactory implements DataSourceFactory {
    @Override
    public Connection createConnection() {
        return new ApiConnection();
    }
    @Override
    public Transaction createTransaction() {
        // APIs might not have transactional semantics in the same way databases do.
        // This could be a "No-Op" object or throw an UnsupportedOperationException.
        return new ApiTransaction();
    }
}
`,
python: `
# Concrete Factory for API sources
class ApiSourceFactory(DataSourceFactory):
    def create_connection(self) -> 'Connection':
        return ApiConnection()

    def create_transaction(self) -> 'Transaction':
        # APIs might not have transactional semantics in the same way.
        # This could be a "No-Op" object.
        return ApiTransaction()
`,
javascript: `
import { ApiConnection } from './ApiConnection.js';
import { ApiTransaction } from './ApiTransaction.js';

// Concrete Factory for API sources
export class ApiSourceFactory extends DataSourceFactory {
    createConnection() {
        return new ApiConnection();
    }

    createTransaction() {
        // APIs might not have transactional semantics.
        // This could be a "No-Op" object.
        return new ApiTransaction();
    }
}
`
        }},
        // Abstract Products
        { id: 'abs-product-conn', type: 'interface', label: 'Connection', x: 100, y: 300, width: 200, height: 50, code: {
java: `
// Abstract Product A
public interface Connection {
    void connect();
}
`,
python: `
from abc import ABC, abstractmethod

# Abstract Product A
class Connection(ABC):
    @abstractmethod
    def connect(self):
        pass
`,
javascript: `
// Abstract Product A
export class Connection {
    connect() {
        throw new Error("connect() must be implemented by subclasses");
    }
}
`
        }},
        { id: 'abs-product-tran', type: 'interface', label: 'Transaction', x: 400, y: 300, width: 200, height: 50, code: {
java: `
// Abstract Product B
public interface Transaction {
    void begin();
    void commit();
}
`,
python: `
from abc import ABC, abstractmethod

# Abstract Product B
class Transaction(ABC):
    @abstractmethod
    def begin(self):
        pass
    
    @abstractmethod
    def commit(self):
        pass
`,
javascript: `
// Abstract Product B
export class Transaction {
    begin() {
        throw new Error("begin() must be implemented by subclasses");
    }
    commit() {
        throw new Error("commit() must be implemented by subclasses");
    }
}
`
        }},
        // Concrete Products
        { id: 'concrete-product-db-conn', type: 'class', label: 'DatabaseConnection', x: 25, y: 400, width: 200, height: 50, code: {
java: `
// Concrete Product A1
public class DatabaseConnection implements Connection {
    @Override
    public void connect() {
        System.out.println("Connecting to Database...");
    }
}
`,
python: `
# Concrete Product A1
class DatabaseConnection(Connection):
    def connect(self):
        print("Connecting to Database...")
`,
javascript: `
// Concrete Product A1
export class DatabaseConnection extends Connection {
    connect() {
        console.log("Connecting to Database...");
    }
}
`
        }},
        { id: 'concrete-product-api-conn', type: 'class', label: 'ApiConnection', x: 250, y: 400, width: 200, height: 50, code: {
java: `
// Concrete Product A2
public class ApiConnection implements Connection {
    @Override
    public void connect() {
        System.out.println("Connecting to external API...");
    }
}
`,
python: `
# Concrete Product A2
class ApiConnection(Connection):
    def connect(self):
        print("Connecting to external API...")
`,
javascript: `
// Concrete Product A2
export class ApiConnection extends Connection {
    connect() {
        console.log("Connecting to external API...");
    }
}
`
        }},
        { id: 'concrete-product-db-tran', type: 'class', label: 'DatabaseTransaction', x: 475, y: 400, width: 200, height: 50, code: {
java: `
// Concrete Product B1
public class DatabaseTransaction implements Transaction {
    @Override
    public void begin() { /* ... */ }
    @Override
    public void commit() { /* ... */ }
}
`,
python: `
# Concrete Product B1
class DatabaseTransaction(Transaction):
    def begin(self):
        print("Beginning database transaction.")
        
    def commit(self):
        print("Committing database transaction.")
`,
javascript: `
// Concrete Product B1
export class DatabaseTransaction extends Transaction {
    begin() {
        console.log("Beginning database transaction.");
    }
    commit() {
        console.log("Committing database transaction.");
    }
}
`
        }},
         { id: 'concrete-product-api-tran', type: 'class', label: 'ApiTransaction', x: 475, y: 480, width: 200, height: 50, code: {
java: `
// Concrete Product B2
public class ApiTransaction implements Transaction {
    @Override
    public void begin() { System.out.println("API Transaction Begin (No-Op)"); }
    @Override
    public void commit() { System.out.println("API Transaction Commit (No-Op)"); }
}
`,
python: `
# Concrete Product B2
class ApiTransaction(Transaction):
    def begin(self):
        print("API Transaction Begin (No-Op)")
        
    def commit(self):
        print("API Transaction Commit (No-Op)")
`,
javascript: `
// Concrete Product B2
export class ApiTransaction extends Transaction {
    begin() {
        console.log("API Transaction Begin (No-Op)");
    }
    commit() {
        console.log("API Transaction Commit (No-Op)");
    }
}
`
        }},
        // Arrows
        { id: 'impl-factory-1', type: 'arrow', label: '', x: 262, y: 105, arrowType: 'implementation', points: '175,120 V 90 H 350', code: {
            java: 'DatabaseSourceFactory implements DataSourceFactory.',
            python: 'DatabaseSourceFactory inherits from DataSourceFactory.',
            javascript: 'DatabaseSourceFactory extends DataSourceFactory.'
        }},
        { id: 'impl-factory-2', type: 'arrow', label: '', x: 437, y: 105, arrowType: 'implementation', points: '525,120 V 90 H 350', code: {
            java: 'ApiSourceFactory implements DataSourceFactory.',
            python: 'ApiSourceFactory inherits from DataSourceFactory.',
            javascript: 'ApiSourceFactory extends DataSourceFactory.'
        }},
        { id: 'create-conn-1', type: 'arrow', x: 150, y: 290, arrowType: 'dependency', points: '175,180 V 400', label: 'creates', code: {
            java: 'DatabaseSourceFactory creates DatabaseConnection.',
            python: 'DatabaseSourceFactory creates DatabaseConnection.',
            javascript: 'DatabaseSourceFactory creates DatabaseConnection.'
        }},
        { id: 'create-conn-2', type: 'arrow', x: 437, y: 290, arrowType: 'dependency', points: '525,180 V 280 H 350 V 400', label: 'creates', code: {
            java: 'ApiSourceFactory creates ApiConnection.',
            python: 'ApiSourceFactory creates ApiConnection.',
            javascript: 'ApiSourceFactory creates ApiConnection.'
        }},
        { id: 'create-tran-1', type: 'arrow', x: 375, y: 290, arrowType: 'dependency', points: '175,180 V 280 H 575 V 400', label: 'creates', code: {
            java: 'DatabaseSourceFactory creates DatabaseTransaction.',
            python: 'DatabaseSourceFactory creates DatabaseTransaction.',
            javascript: 'DatabaseSourceFactory creates DatabaseTransaction.'
        }},
        { id: 'create-tran-2', type: 'arrow', x: 550, y: 330, arrowType: 'dependency', points: '525,180 V 480', label: 'creates', code: {
            java: 'ApiSourceFactory creates ApiTransaction.',
            python: 'ApiSourceFactory creates ApiTransaction.',
            javascript: 'ApiSourceFactory creates ApiTransaction.'
        }},

        { id: 'impl-conn-1', type: 'arrow', label: '', x: 162, y: 375, arrowType: 'implementation', points: '125,400 V 350 H 200', code: {
            java: 'DatabaseConnection implements Connection.',
            python: 'DatabaseConnection inherits from Connection.',
            javascript: 'DatabaseConnection extends Connection.'
        }},
        { id: 'impl-conn-2', type: 'arrow', label: '', x: 287, y: 375, arrowType: 'implementation', points: '350,400 V 350 H 200', code: {
            java: 'ApiConnection implements Connection.',
            python: 'ApiConnection inherits from Connection.',
            javascript: 'ApiConnection extends Connection.'
        }},
        { id: 'impl-tran-1', type: 'arrow', label: '', x: 537, y: 375, arrowType: 'implementation', points: '575,400 V 350 H 500', code: {
            java: 'DatabaseTransaction implements Transaction.',
            python: 'DatabaseTransaction inherits from Transaction.',
            javascript: 'DatabaseTransaction extends Transaction.'
        }},
        { id: 'impl-tran-2', type: 'arrow', label: '', x: 537, y: 465, arrowType: 'implementation', points: '575,480 V 350 H 500', code: {
            java: 'ApiTransaction implements Transaction.',
            python: 'ApiTransaction inherits from Transaction.',
            javascript: 'ApiTransaction extends Transaction.'
        }}
      ]
    },
    sequenceDiagram: `
<svg viewBox="0 0 650 450" xmlns="http://www.w3.org/2000/svg" font-family="monospace">
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
  <rect x="70" y="60" width="10" height="280" class="activation" />

  <text x="250" y="30" class="lifeline-label" text-anchor="middle">:DbFactory</text>
  <line x1="250" y1="40" x2="250" y2="430" class="lifeline" />
  <rect x="245" y="80" width="10" height="180" class="activation" />
  
  <text x="425" y="30" class="lifeline-label" text-anchor="middle">:DbConnection</text>
  <line x1="425" y1="40" x2="425" y2="430" class="lifeline" />
  <rect x="420" y="140" width="10" height="20" class="activation" />
  
  <text x="575" y="30" class="lifeline-label" text-anchor="middle">:DbTransaction</text>
  <line x1="575" y1="40" x2="575" y2="430" class="lifeline" />
  <rect x="570" y="220" width="10" height="20" class="activation" />

  <!-- Messages -->
  <line x1="75" y1="80" x2="250" y2="80" class="message" />
  <text x="162.5" y="75" class="message-label" text-anchor="middle">1: createConnection()</text>
  
  <line x1="250" y1="140" x2="425" y2="140" class="message" />
  <text x="337.5" y="135" class="message-label" text-anchor="middle">2: new()</text>
  
  <line x1="250" y1="160" x2="75" y2="160" class="message" stroke-dasharray="4" />
  <text x="162.5" y="155" class="message-label" text-anchor="middle">3: returns connection</text>

  <line x1="75" y1="200" x2="250" y2="200" class="message" />
  <text x="162.5" y="195" class="message-label" text-anchor="middle">4: createTransaction()</text>

  <line x1="250" y1="220" x2="575" y2="220" class="message" />
  <text x="412.5" y="215" class="message-label" text-anchor="middle">5: new()</text>
  
  <line x1="250" y1="240" x2="75" y2="240" class="message" stroke-dasharray="4" />
  <text x="162.5" y="235" class="message-label" text-anchor="middle">6: returns transaction</text>
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

  <!-- Actor -->
  <circle cx="70" cy="110" r="20" fill="none" class="actor" />
  <line x1="70" y1="130" x2="70" y2="180" class="actor" />
  <line x1="40" y1="150" x2="100" y2="150" class="actor" />
  <line x1="70" y1="180" x2="50" y2="230" class="actor" />
  <line x1="70" y1="180" x2="90" y2="230" class="actor" />
  <text x="70" y="250" class="label">Application</text>

  <!-- Use Cases -->
  <ellipse cx="300" cy="100" rx="120" ry="30" class="use-case" />
  <text x="300" y="105" class="label">Create DB Components</text>
  
  <ellipse cx="300" cy="200" rx="120" ry="30" class="use-case" />
  <text x="300" y="205" class="label">Create API Components</text>
  
  <!-- Connections -->
  <line x1="105" y1="150" x2="180" y2="150" class="connector" />
  <line x1="180" y1="150" x2="180" y2="130" class="connector" />
  <line x1="180" y1="150" x2="180" y2="170" class="connector" />
</svg>
    `
  };
