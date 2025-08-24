
import React, { useState, useCallback, useRef } from 'react';
import { DesignPattern, DiagramComponent } from '../types';
import InteractiveDiagram from './InteractiveDiagram';
import CodePane from './CodePane';
import PatternDetails from './PatternDetails';
import DiagramModal from './DiagramModal';
import AllCodeModal from './AllCodeModal';
import { FullScreenIcon, ExitFullScreenIcon, SequenceDiagramIcon, UseCaseDiagramIcon, CodeIcon } from './icons/Icons';

interface PatternViewerProps {
  pattern: DesignPattern;
}

const PatternViewer: React.FC<PatternViewerProps> = ({ pattern }) => {
  const [hoveredComponent, setHoveredComponent] = useState<DiagramComponent | null>(null);
  const [pinnedComponent, setPinnedComponent] = useState<DiagramComponent | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [activeModal, setActiveModal] = useState<'sequence' | 'use-case' | null>(null);
  const [isAllCodeModalOpen, setIsAllCodeModalOpen] = useState(false);
  
  const hoverTimeoutRef = useRef<number | null>(null);

  const clearHoverTimeout = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  }, []);

  const handleHoverComponent = useCallback((component: DiagramComponent | null) => {
    clearHoverTimeout();
    if (component) {
      setHoveredComponent(component);
    } else {
      hoverTimeoutRef.current = window.setTimeout(() => {
        setHoveredComponent(null);
      }, 200); // 200ms delay to prevent flickering
    }
  }, [clearHoverTimeout]);

  const handlePinComponent = useCallback((component: DiagramComponent) => {
    clearHoverTimeout(); // Also clear timeout on pin
    setPinnedComponent(prev => (prev?.id === component.id ? null : component));
  }, [clearHoverTimeout]);

  const handleClosePane = useCallback(() => {
    setPinnedComponent(null);
  }, []);

  const toggleFullScreen = () => {
    setIsFullScreen(prev => !prev);
  };
  
  const componentToShow = pinnedComponent || hoveredComponent;

  return (
    <>
      <div className={`w-full h-full flex flex-col transition-all duration-300 ${isFullScreen ? 'fixed inset-0 bg-brand-secondary z-50 p-0' : 'relative p-4 md:p-8'}`}>
        <div className={`flex-shrink-0 mb-6 ${isFullScreen ? 'hidden' : ''}`}>
          <h1 className="text-4xl font-bold text-brand-text">{pattern.name}</h1>
          <p className="text-brand-text-secondary mt-2 max-w-4xl">{pattern.description}</p>
        </div>

        <div className={`flex-1 flex overflow-hidden ${isFullScreen ? 'flex-row' : 'flex-col md:flex-row gap-8'}`}>
          <div className={`flex flex-col bg-brand-primary relative ${isFullScreen ? 'w-2/5 h-full rounded-none border-y-0 border-l-0 border-r border-brand-border' : 'md:w-2/5 border border-brand-border rounded-lg'}`}>
            <div className="flex items-center justify-between p-3 border-b border-brand-border">
              <h3 className="text-lg font-semibold text-brand-text">Class Diagram</h3>
              <div className="flex items-center gap-2">
                <button onClick={() => setIsAllCodeModalOpen(true)} className="text-brand-text-secondary hover:text-brand-text" title="View All Code">
                  <CodeIcon />
                </button>
                {pattern.useCaseDiagram && (
                  <button onClick={() => setActiveModal('use-case')} className="text-brand-text-secondary hover:text-brand-text" title="View Use Case Diagram">
                    <UseCaseDiagramIcon />
                  </button>
                )}
                {pattern.sequenceDiagram && (
                  <button onClick={() => setActiveModal('sequence')} className="text-brand-text-secondary hover:text-brand-text" title="View Sequence Diagram">
                    <SequenceDiagramIcon />
                  </button>
                )}
                <button onClick={toggleFullScreen} className="text-brand-text-secondary hover:text-brand-text" title={isFullScreen ? 'Exit Full Screen' : 'Full Screen'}>
                    {isFullScreen ? <ExitFullScreenIcon /> : <FullScreenIcon />}
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              <InteractiveDiagram 
                diagram={pattern.diagram} 
                onHoverComponent={handleHoverComponent}
                onPinComponent={handlePinComponent}
                hoveredComponentId={hoveredComponent?.id}
                pinnedComponentId={pinnedComponent?.id}
              />
            </div>
          </div>
          
          <div className={`relative ${isFullScreen ? 'w-3/5' : 'flex-1'}`}>
              {componentToShow ? (
                  <div
                    onMouseEnter={clearHoverTimeout}
                    onMouseLeave={() => handleHoverComponent(null)}
                  >
                    <CodePane
                        component={componentToShow}
                        onClose={handleClosePane}
                        isOverlay={false}
                        isPinned={!!pinnedComponent && componentToShow.id === pinnedComponent.id}
                    />
                  </div>
              ) : (
                  <div className="hidden md:flex flex-col h-full">
                      <PatternDetails pattern={pattern} />
                  </div>
              )}
          </div>
        </div>
      </div>
      {isAllCodeModalOpen && (
        <AllCodeModal
          pattern={pattern}
          onClose={() => setIsAllCodeModalOpen(false)}
        />
      )}
      {activeModal && (
        <DiagramModal
          title={activeModal === 'sequence' ? 'Sequence Diagram' : 'Use Case Diagram'}
          svgContent={activeModal === 'sequence' ? pattern.sequenceDiagram! : pattern.useCaseDiagram!}
          onClose={() => setActiveModal(null)}
        />
      )}
    </>
  );
};

export default PatternViewer;
