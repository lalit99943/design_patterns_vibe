
import React, { useState, useCallback } from 'react';
import { DesignPattern } from './types';
import { designPatterns } from './data/patterns';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import PatternViewer from './components/PatternViewer';

const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedPattern, setSelectedPattern] = useState<DesignPattern | null>(null);

  const handleSelectPattern = useCallback((pattern: DesignPattern) => {
    setSelectedPattern(pattern);
  }, []);
  
  const handleGoToDashboard = useCallback(() => {
    setSelectedPattern(null);
  }, []);

  return (
    <div className="flex h-screen bg-brand-primary text-brand-text font-sans">
      <Sidebar 
        isOpen={sidebarOpen} 
        patterns={designPatterns} 
        onSelectPattern={handleSelectPattern}
        onGoToDashboard={handleGoToDashboard}
        selectedPatternId={selectedPattern?.id}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
          isDashboard={!selectedPattern}
        />
        <main className="flex-1 overflow-y-auto bg-brand-secondary">
          {selectedPattern ? (
            <PatternViewer pattern={selectedPattern} />
          ) : (
            <Dashboard patterns={designPatterns} onSelectPattern={handleSelectPattern} />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
