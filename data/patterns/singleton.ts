import { DesignPattern } from '../../types';

export const singletonPattern: DesignPattern = {
    id: 'singleton',
    name: 'Singleton',
    category: 'Creational',
    description: 'Ensures a class only has one instance, and provides a global point of access to it. It is commonly used for managing shared resources like database connections or logging services.',
    whenToUse: [
      'When exactly one instance of a class is required throughout the system.',
      'For managing a shared resource, like a database connection pool or a logging service.',
      'For a global configuration object that needs to be accessible from various parts of the application.',
      'When you need stricter control over global variables.'
    ],
    whenNotToUse: [
        'In multi-threaded applications without careful thread-safety considerations, as it can lead to race conditions.',
        'When dependency injection (DI) containers (like Spring) can manage object lifecycle, as DI is often a cleaner solution.',
        'If it hides dependencies instead of explicitly declaring them (e.g., through constructor injection).',
        'When unit testing is a high priority, as global state makes testing difficult and tests less isolated.'
    ],
    comparison: `
**Singleton vs. Dependency Injection (DI):** In modern frameworks like Spring, the DI container often acts as a sophisticated singleton manager. Instead of having a class enforce its own singleton nature, you define a component's scope (e.g., "@Scope(\\"singleton\\")"), and the framework ensures only one instance is created and injected where needed. This is generally preferred as it's more flexible and better for testing.

**Singleton vs. Static Class:** A static class provides only static methods and cannot be instantiated. While it offers a global access point, a Singleton can implement interfaces, be extended, and be initialized lazily. A Singleton is a regular object instance, giving it more flexibility than a static class.
    `,
    diagram: {
      viewBox: "0 0 400 300",
      components: [
        {
          id: 'singleton-class',
          type: 'class',
          label: 'Singleton',
          x: 100,
          y: 50,
          width: 200,
          height: 120,
          code: { 
            java: `
// In Spring, the default scope for beans is Singleton.
// We can explicitly define it for clarity.
import org.springframework.stereotype.Component;
import org.springframework.context.annotation.Scope;

@Component
@Scope("singleton")
public class AppConfig {

    private static AppConfig instance;
    private long creationTime;

    // Private constructor to prevent instantiation
    private AppConfig() {
        this.creationTime = System.currentTimeMillis();
        // Simulate loading configurations
        System.out.println("AppConfig Singleton instance created at " + creationTime);
    }
    
    // Spring manages the singleton instance, so a public getInstance() is not
    // strictly needed for dependency injection but can be implemented for legacy access.
    public static synchronized AppConfig getInstance() {
        if (instance == null) {
            instance = new AppConfig();
        }
        return instance;
    }

    public void displayConfig() {
        System.out.println("Displaying configuration from instance created at: " + creationTime);
    }
}
          `,
            python: `
import threading
import time

# A thread-safe Singleton implementation in Python using a metaclass.
class SingletonMeta(type):
    _instances = {}
    _lock: threading.Lock = threading.Lock()

    def __call__(cls, *args, **kwargs):
        with cls._lock:
            if cls not in cls._instances:
                instance = super().__call__(*args, **kwargs)
                cls._instances[cls] = instance
        return cls._instances[cls]

class AppConfig(metaclass=SingletonMeta):
    def __init__(self):
        self.creation_time = time.time()
        print(f"AppConfig Singleton instance created at {self.creation_time}")

    def display_config(self):
        print(f"Displaying config from instance created at: {self.creation_time}")
          `,
            javascript: `
// Singleton implementation using a module pattern.
// The instance is created when the module is first imported.
class AppConfig {
    constructor() {
        this.creationTime = Date.now();
        console.log(\`AppConfig Singleton instance created at \${this.creationTime}\`);
    }

    displayConfig() {
        console.log(\`Displaying config from instance created at: \${this.creationTime}\`);
    }
}

// Create and export a single instance.
const instance = new AppConfig();
Object.freeze(instance);

export default instance;
          `
        }},
        {
            id: 'self-arrow',
            type: 'arrow',
            label: 'instance',
            arrowType: 'dependency',
            x: 125, y: 100,
            points: "200,50 C 50,50 50,150 200,150",
            code: { 
                java: `
// The 'instance' field is a static reference to the single
// instance of the class. It's the core of the pattern.
private static AppConfig instance;

// The getInstance() method provides global access.
// The 'synchronized' keyword ensures thread safety during
// the first instantiation (lazy initialization).
public static synchronized AppConfig getInstance() {
    if (instance == null) {
        instance = new AppConfig();
    }
    return instance;
}
            `,
                python: `
# The metaclass handles instance management.
# A lock ensures thread-safety.
class SingletonMeta(type):
    _instances = {}
    _lock: threading.Lock = threading.Lock()

    def __call__(cls, *args, **kwargs):
        with cls._lock:
            if cls not in cls._instances:
                # Create and store the instance if it doesn't exist.
                instance = super().__call__(*args, **kwargs)
                cls._instances[cls] = instance
        return cls._instances[cls]
            `,
                javascript: `
// The module scope ensures 'instance' is created only once.
class AppConfig {
    // ...
}

const instance = new AppConfig();

// Freezing the instance prevents modification.
Object.freeze(instance);

// Exporting the instance provides the global access point.
export default instance;
            `
        }},
        {
            id: 'client-class',
            type: 'class',
            label: 'Client',
            x: 100,
            y: 220,
            width: 200,
            height: 50,
            code: { 
                java: `
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ConfigurationService {

    // Spring injects the singleton instance of AppConfig.
    @Autowired
    private AppConfig appConfig;

    public void useConfig() {
        System.out.println("ConfigurationService is using the AppConfig.");
        appConfig.displayConfig();
    }
}
            `,
                python: `
# The client gets the singleton instance.
# In a DI framework like FastAPI, this would be injected.
class ConfigurationService:
    def __init__(self):
        # Get the singleton instance directly.
        self._app_config = AppConfig()

    def use_config(self):
        print("ConfigurationService is using the AppConfig.")
        self._app_config.display_config()
            `,
                javascript: `
// The client imports the singleton instance.
import appConfig from './AppConfig.js';

export class ConfigurationService {
    useConfig() {
        console.log("ConfigurationService is using the AppConfig.");
        appConfig.displayConfig();
    }
}
            `
        }},
        {
            id: 'usage-arrow',
            type: 'arrow',
            label: 'uses',
            arrowType: 'dependency',
            x: 210, y: 195,
            points: "200,220 V 170",
            code: { 
                java: `
// The Client (in this case, ConfigurationService) doesn't
// create an instance of AppConfig. Instead, it gets the
// single shared instance, either through dependency injection
// or by calling the static getInstance() method.

// Using Spring's @Autowired for dependency injection:
@Autowired
private AppConfig appConfig;

// This decouples the client from the instantiation logic of the singleton.
            `,
                python: `
# The client gets the single, shared instance when it
# calls the class constructor, which is intercepted
# by the metaclass.

self._app_config = AppConfig()
# Any subsequent call to AppConfig() will return the exact same object.
            `,
                javascript: `
// The client gets the single shared instance by importing
// it from the module where it was created.

import appConfig from './AppConfig.js';
// The 'appConfig' variable holds the only instance.
            `
        }}
      ]
    },
    sequenceDiagram: `
<svg viewBox="0 0 500 350" xmlns="http://www.w3.org/2000/svg" font-family="monospace">
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
  <line x1="75" y1="40" x2="75" y2="330" class="lifeline" />
  <rect x="70" y="60" width="10" height="80" class="activation" />

  <text x="250" y="30" class="lifeline-label" text-anchor="middle">:Singleton</text>
  <line x1="250" y1="40" x2="250" y2="330" class="lifeline" />
  <rect x="245" y="80" width="10" height="40" class="activation" />
  
  <text x="425" y="30" class="lifeline-label" text-anchor="middle">:AppConfig</text>
  <line x1="425" y1="40" x2="425" y2="330" class="lifeline" />
  <rect x="420" y="100" width="10" height="20" class="activation" />

  <!-- Messages -->
  <line x1="75" y1="80" x2="250" y2="80" class="message" />
  <text x="162.5" y="75" class="message-label" text-anchor="middle">1: getInstance()</text>
  
  <line x1="250" y1="100" x2="425" y2="100" class="message" />
  <text x="337.5" y="95" class="message-label" text-anchor="middle">2: new()</text>
  
  <line x1="250" y1="120" x2="75" y2="120" class="message" stroke-dasharray="4" />
  <text x="162.5" y="115" class="message-label" text-anchor="middle">3: returns instance</text>
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
  <text x="70" y="250" class="label">Developer</text>

  <!-- Use Case -->
  <ellipse cx="270" cy="150" rx="100" ry="40" class="use-case" />
  <text x="270" y="155" class="label">Manage Shared Config</text>
  
  <!-- Connection -->
  <line x1="105" y1="150" x2="170" y2="150" class="connector" />
</svg>
    `
  };