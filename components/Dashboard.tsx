
import React from 'react';
import { DesignPattern } from '../types';

interface DashboardProps {
  patterns: DesignPattern[];
  onSelectPattern: (pattern: DesignPattern) => void;
}

const ProgressTracker: React.FC = () => (
    <div className="bg-brand-primary p-6 rounded-lg border border-brand-border mb-8">
        <h2 className="text-2xl font-semibold text-brand-text mb-4">Your Progress</h2>
        <div className="w-full bg-brand-border rounded-full h-4">
            <div className="bg-brand-accent h-4 rounded-full" style={{ width: '15%' }}></div>
        </div>
        <p className="text-brand-text-secondary mt-2">3 of 23 patterns completed. Keep going!</p>
    </div>
);

const PatternCard: React.FC<{pattern: DesignPattern; onClick: () => void}> = ({ pattern, onClick }) => (
    <div 
        onClick={onClick}
        className="bg-brand-primary border border-brand-border rounded-lg p-4 cursor-pointer hover:border-brand-accent transition-all duration-200 transform hover:-translate-y-1"
    >
        <span className={`text-xs font-semibold py-1 px-2 rounded-full ${
            pattern.category === 'Creational' ? 'bg-blue-900 text-blue-300' :
            pattern.category === 'Structural' ? 'bg-green-900 text-green-300' :
            'bg-purple-900 text-purple-300'
        }`}>{pattern.category}</span>
        <h3 className="text-lg font-bold text-brand-text mt-2">{pattern.name}</h3>
        <p className="text-sm text-brand-text-secondary mt-1 h-10 overflow-hidden">{pattern.description}</p>
    </div>
);


const Dashboard: React.FC<DashboardProps> = ({ patterns, onSelectPattern }) => {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-brand-text mb-2">Welcome, Developer.</h1>
      <p className="text-lg text-brand-text-secondary mb-8">Ready to master enterprise-level design patterns in Java?</p>

      <ProgressTracker />

      <div>
        <h2 className="text-2xl font-semibold text-brand-text mb-4">Explore Patterns</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {patterns.map(pattern => (
                <PatternCard key={pattern.id} pattern={pattern} onClick={() => onSelectPattern(pattern)} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
