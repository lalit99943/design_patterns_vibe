import { DesignPattern } from '../../types';

export const iteratorPattern: DesignPattern = {
    id: 'iterator',
    name: 'Iterator',
    category: 'Behavioral',
    description: 'Provide a way to access the elements of an aggregate object sequentially without exposing its underlying representation.',
    whenToUse: [
        'When you want to traverse a collection without exposing its internal structure (e.g., array, list, tree).',
        'To support multiple, concurrent traversals of a collection.',
        'To provide a uniform interface for traversing different collection structures.',
        'In Java, this is built-in with the `java.util.Iterator` interface and the for-each loop.'
    ],
    whenNotToUse: [
        'For simple collections where a basic loop is sufficient and there is no need to hide the internal structure.',
        'If the traversal algorithm is very complex, a more specialized class might be better than a generic iterator.'
    ],
    comparison: `
**Iterator vs. Composite:** The Iterator pattern can be used to traverse a Composite tree. You can define an iterator that knows how to traverse the tree structure (e.g., depth-first or breadth-first).

**Iterator vs. Factory Method:** A Factory Method can be used within an aggregate class to create and return the appropriate type of iterator for that collection, hiding the concrete iterator classes from the client.
    `,
    diagram: {
        viewBox: "0 0 600 400",
        components: [
            { id: 'aggregate-interface', type: 'interface', label: 'IterableCollection', x: 20, y: 20, width: 220, height: 60, code: { 
                java: `
// The Aggregate interface. In Java, this is typically java.lang.Iterable.
public interface IterableCollection<T> {
    Iterator<T> createIterator();
}
            `,
                python: `
from abc import ABC, abstractmethod
from typing import Iterator

# The Aggregate ABC. In Python, this is collections.abc.Iterable.
class IterableCollection(ABC):
    @abstractmethod
    def __iter__(self) -> Iterator:
        pass
            `,
                javascript: `
// The Aggregate interface (simulated).
// In JS, this is handled by the iterable protocol (Symbol.iterator).
export class IterableCollection {
    createIterator() {
        throw new Error("Method 'createIterator()' must be implemented.");
    }
}
            `}},
            { id: 'iterator-interface', type: 'interface', label: 'Iterator', x: 360, y: 20, width: 220, height: 60, code: { 
                java: `
// The Iterator interface. In Java, this is java.util.Iterator.
public interface Iterator<T> {
    boolean hasNext();
    T next();
}
            `,
                python: `
from typing import Iterator

# The Iterator interface. In Python, this is collections.abc.Iterator.
# A class implementing __iter__ and __next__ conforms to this.
class PyIterator(Iterator):
    pass
            `,
                javascript: `
// The Iterator interface (simulated).
// In JS, this is an object with a next() method.
export class Iterator {
    hasNext() {
        throw new Error("Method 'hasNext()' must be implemented.");
    }
    next() {
        throw new Error("Method 'next()' must be implemented.");
    }
}
            `}},
            { id: 'concrete-aggregate', type: 'class', label: 'BookCollection', x: 20, y: 200, width: 220, height: 80, code: { 
                java: `
import java.util.List;
import java.util.ArrayList;

// A Concrete Aggregate
public class BookCollection implements IterableCollection<Book> {
    private List<Book> books = new ArrayList<>();
    
    public void addBook(Book book) { books.add(book); }
    
    @Override
    public Iterator<Book> createIterator() {
        return new BookIterator(this.books);
    }
}
            `,
                python: `
# A Concrete Aggregate
class BookCollection:
    def __init__(self):
        self._books = []

    def add_book(self, book):
        self._books.append(book)

    def __iter__(self):
        return BookIterator(self._books)
            `,
                javascript: `
// A Concrete Aggregate using the iterable protocol.
export class BookCollection {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    // This makes the class directly usable in for...of loops
    [Symbol.iterator]() {
        return new BookIterator(this.books);
    }
}
            `}},
            { id: 'concrete-iterator', type: 'class', label: 'BookIterator', x: 360, y: 200, width: 220, height: 80, code: { 
                java: `
import java.util.List;

// A Concrete Iterator
public class BookIterator implements Iterator<Book> {
    private final List<Book> books;
    private int position = 0;
    
    public BookIterator(List<Book> books) { this.books = books; }
    
    @Override
    public boolean hasNext() {
        return position < books.size();
    }

    @Override
    public Book next() {
        return books.get(position++);
    }
}
            `,
                python: `
from typing import List

# A Concrete Iterator
class BookIterator:
    def __init__(self, books: List):
        self._books = books
        self._position = 0

    def __next__(self):
        if self._position < len(self._books):
            book = self._books[self._position]
            self._position += 1
            return book
        else:
            raise StopIteration()
            `,
                javascript: `
// A Concrete Iterator
export class BookIterator {
    constructor(books) {
        this.books = books;
        this.position = 0;
    }

    next() {
        if (this.position < this.books.length) {
            return { value: this.books[this.position++], done: false };
        } else {
            return { done: true };
        }
    }
}
            `}},
            { id: 'arrow-agg-impl', type: 'arrow', label: '', x: 130, y: 140, arrowType: 'implementation', points: '130,200 V 80', code: { 
                java: 'Concrete aggregate implements the aggregate interface.',
                python: 'Concrete aggregate implements the aggregate interface.',
                javascript: 'Concrete aggregate implements the aggregate interface.',
            }},
            { id: 'arrow-iter-impl', type: 'arrow', label: '', x: 470, y: 140, arrowType: 'implementation', points: '470,200 V 80', code: { 
                java: 'Concrete iterator implements the iterator interface.',
                python: 'Concrete iterator implements the iterator interface.',
                javascript: 'Concrete iterator implements the iterator interface.',
            }},
            { id: 'arrow-creates', type: 'arrow', label: 'creates', x: 300, y: 240, arrowType: 'dependency', points: '240,240 H 360', code: { 
                java: 'The concrete aggregate creates the concrete iterator.',
                python: 'The concrete aggregate creates the concrete iterator.',
                javascript: 'The concrete aggregate creates the concrete iterator.',
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
  <rect x="70" y="60" width="10" height="240" class="activation" />

  <text x="275" y="30" class="lifeline-label" text-anchor="middle">:Collection</text>
  <line x1="275" y1="40" x2="275" y2="380" class="lifeline" />
  <rect x="270" y="80" width="10" height="40" class="activation" />
  
  <text x="475" y="30" class="lifeline-label" text-anchor="middle">:Iterator</text>
  <line x1="475" y1="40" x2="475" y2="380" class="lifeline" />
  <rect x="470" y="100" width="10" height="180" class="activation" />

  <line x1="75" y1="80" x2="275" y2="80" class="message" />
  <text x="175" y="75" class="message-label" text-anchor="middle">1: createIterator()</text>
  
  <line x1="275" y1="100" x2="475" y2="100" class="message" />
  <text x="375" y="95" class="message-label" text-anchor="middle">2: new(collection)</text>

  <line x1="75" y1="160" x2="475" y2="160" class="message" />
  <text x="275" y="155" class="message-label" text-anchor="middle">3: hasNext()</text>
  
  <line x1="75" y1="220" x2="475" y2="220" class="message" />
  <text x="275" y="215" class="message-label" text-anchor="middle">4: next()</text>
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
  <text x="280" y="155" class="label">Traverse Collection Uniformly</text>
  
  <line x1="105" y1="150" x2="130" y2="150" class="connector" />
</svg>
    `
  };