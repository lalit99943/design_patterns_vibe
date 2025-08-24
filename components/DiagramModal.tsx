import React, { useEffect } from 'react';
import { CloseIcon } from './icons/Icons';

interface DiagramModalProps {
  title: string;
  svgContent: string;
  onClose: () => void;
}

const DiagramModal: React.FC<DiagramModalProps> = ({ title, svgContent, onClose }) => {

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-brand-secondary border border-brand-border rounded-lg shadow-2xl w-full max-w-4xl h-full max-h-[90vh] flex flex-col animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-brand-border flex-shrink-0">
          <h2 className="text-xl font-semibold text-brand-text">{title}</h2>
          <button onClick={onClose} className="text-brand-text-secondary hover:text-brand-text">
            <CloseIcon />
          </button>
        </div>
        <div 
          className="flex-1 p-4 overflow-auto"
          dangerouslySetInnerHTML={{ __html: svgContent }}
        />
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default DiagramModal;
