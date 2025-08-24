
import React, { useState } from 'react';
import { DesignPattern } from '../types';

interface PatternDetailsProps {
  pattern: DesignPattern;
}

type ActiveTab = 'use' | 'avoid' | 'compare';

const PatternDetails: React.FC<PatternDetailsProps> = ({ pattern }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('use');

  const getTabClass = (tabName: ActiveTab) => {
    return `px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
      activeTab === tabName
        ? 'bg-brand-accent text-white'
        : 'text-brand-text-secondary hover:bg-brand-secondary'
    }`;
  };
  
  const renderContent = () => {
    switch (activeTab) {
      case 'use':
        return (
          <ul className="list-disc list-inside space-y-2 text-brand-text">
            {pattern.whenToUse.map((item, index) => <li key={index}>{item}</li>)}
          </ul>
        );
      case 'avoid':
        return (
            <ul className="list-disc list-inside space-y-2 text-brand-text">
              {pattern.whenNotToUse.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          );
      case 'compare':
        return (
            <div className="prose prose-invert max-w-none text-brand-text whitespace-pre-wrap space-y-4">
                {pattern.comparison.trim().split('\n\n').map((paragraph, pIndex) => (
                    <p key={pIndex}>
                        {paragraph.split(/(\*\*.*?\*\*)/g).map((part, partIndex) => 
                            part.startsWith('**') && part.endsWith('**') ? 
                            <strong key={partIndex} className="text-brand-accent font-semibold">{part.slice(2, -2)}</strong> : 
                            part
                        )}
                    </p>
                ))}
            </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full bg-brand-primary border border-brand-border rounded-lg overflow-hidden">
      <div className="p-3 border-b border-brand-border">
        <h3 className="text-lg font-semibold text-brand-text">Pattern Deep Dive</h3>
      </div>
      <div className="p-4 border-b border-brand-border flex items-center gap-2 flex-wrap">
        <button className={getTabClass('use')} onClick={() => setActiveTab('use')}>
          When to Use
        </button>
        <button className={getTabClass('avoid')} onClick={() => setActiveTab('avoid')}>
          When to Avoid
        </button>
        <button className={getTabClass('compare')} onClick={() => setActiveTab('compare')}>
          Compare
        </button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default PatternDetails;
