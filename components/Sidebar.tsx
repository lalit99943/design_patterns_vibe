import React, { useState } from 'react';
import { DesignPattern, PatternCategory } from '../types';
import { ChevronDownIcon } from './icons/Icons';

interface SidebarProps {
  isOpen: boolean;
  patterns: DesignPattern[];
  onSelectPattern: (pattern: DesignPattern) => void;
  onGoToDashboard: () => void;
  selectedPatternId?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, patterns, onSelectPattern, onGoToDashboard, selectedPatternId }) => {
  const categories: PatternCategory[] = ['Creational', 'Structural', 'Behavioral'];
  
  const [expandedCategories, setExpandedCategories] = useState<Record<PatternCategory, boolean>>({
    Creational: false,
    Structural: false,
    Behavioral: false,
  });

  const toggleCategory = (category: PatternCategory) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const groupedPatterns = categories.reduce((acc, category) => {
    acc[category] = patterns.filter(p => p.category === category);
    return acc;
  }, {} as Record<PatternCategory, DesignPattern[]>);

  return (
    <aside className={`flex-shrink-0 bg-brand-primary border-r border-brand-border transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-0'} overflow-hidden`}>
      <div className="h-full flex flex-col p-4">
        <h2 className="text-2xl font-bold mb-4 text-brand-text whitespace-nowrap">Patterns</h2>
        <nav className="flex-1 overflow-y-auto">
          <ul>
            <li className="mb-2">
                <button
                    onClick={onGoToDashboard}
                    className={`w-full text-left p-2 rounded-md font-semibold transition-colors ${!selectedPatternId ? 'bg-brand-accent text-white' : 'hover:bg-brand-secondary'}`}
                >
                    Dashboard
                </button>
            </li>
            {categories.map(category => (
              <li key={category} className="mb-2">
                <button 
                  onClick={() => toggleCategory(category)}
                  className="w-full flex items-center justify-between p-2 rounded-md hover:bg-brand-secondary transition-colors"
                  aria-expanded={expandedCategories[category]}
                >
                  <h3 className="text-sm font-bold text-brand-text-secondary uppercase tracking-wider whitespace-nowrap">{category}</h3>
                  <ChevronDownIcon className={`w-5 h-5 text-brand-text-secondary transition-transform duration-200 ${expandedCategories[category] ? '' : '-rotate-90'}`} />
                </button>
                {expandedCategories[category] && (
                  <ul className="pl-3 mt-2 ml-2 border-l border-brand-border space-y-1">
                    {groupedPatterns[category].map(pattern => (
                      <li key={pattern.id}>
                        <button 
                          onClick={() => onSelectPattern(pattern)}
                          className={`w-full text-left p-2 text-sm rounded-md transition-colors text-brand-text whitespace-nowrap ${selectedPatternId === pattern.id ? 'bg-brand-accent/20 text-brand-accent' : 'hover:bg-brand-secondary'}`}
                        >
                          {pattern.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;