
import React, { useState, useMemo, useEffect } from 'react';
import { DesignPattern } from '../types';
import { CloseIcon } from './icons/Icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface AllCodeModalProps {
  pattern: DesignPattern;
  onClose: () => void;
}

const AllCodeModal: React.FC<AllCodeModalProps> = ({ pattern, onClose }) => {
  const availableLanguages = useMemo(() => {
    const langSet = new Set<string>();
    pattern.diagram.components.forEach(c => {
      if (c.code) {
        Object.keys(c.code).forEach(lang => langSet.add(lang));
      }
    });
    return Array.from(langSet).sort();
  }, [pattern]);

  const [selectedLanguage, setSelectedLanguage] = useState(availableLanguages.includes('java') ? 'java' : availableLanguages[0] || '');

  const languageMap: { [key: string]: string } = {
    java: 'Java',
    python: 'Python',
    javascript: 'JavaScript',
  };
  
  const highlighterLanguageMap: { [key: string]: string } = {
    java: 'java',
    python: 'python',
    javascript: 'javascript',
  };

  const codeSnippets = useMemo(() => {
    return pattern.diagram.components
      .filter(c => c.code && c.code[selectedLanguage])
      .map(c => ({
        id: c.id,
        label: c.label,
        code: c.code[selectedLanguage],
      }));
  }, [pattern, selectedLanguage]);

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
      role="dialog"
      aria-modal="true"
      aria-labelledby="all-code-modal-title"
    >
      <div 
        className="bg-brand-secondary border border-brand-border rounded-lg shadow-2xl w-full max-w-6xl h-full max-h-[90vh] flex flex-col animate-fade-in"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-brand-border flex-shrink-0">
          <h2 id="all-code-modal-title" className="text-xl font-semibold text-brand-text">{pattern.name} - All Code Snippets</h2>
          <button onClick={onClose} className="text-brand-text-secondary hover:text-brand-text" aria-label="Close">
            <CloseIcon />
          </button>
        </div>
        
        <div className="flex-shrink-0 px-4 pt-2 border-b border-brand-border">
            <div className="flex items-center" role="tablist" aria-label="Select a language">
              {availableLanguages.map((lang) => (
                  <button
                      key={lang}
                      onClick={() => setSelectedLanguage(lang)}
                      className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                          selectedLanguage === lang
                          ? 'text-brand-accent border-brand-accent'
                          : 'text-brand-text-secondary border-transparent hover:text-brand-text'
                      }`}
                      role="tab"
                      aria-selected={selectedLanguage === lang}
                  >
                      {languageMap[lang] || lang}
                  </button>
              ))}
            </div>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-6" role="tabpanel">
          {codeSnippets.length > 0 ? (
            codeSnippets.map(snippet => (
                <div key={snippet.id} className="bg-brand-primary border border-brand-border rounded-lg overflow-hidden">
                <h3 className="text-md font-semibold text-brand-text bg-brand-secondary px-4 py-2 border-b border-brand-border">{snippet.label}</h3>
                <SyntaxHighlighter
                    language={highlighterLanguageMap[selectedLanguage]}
                    style={vscDarkPlus}
                    showLineNumbers
                    wrapLines={true}
                    customStyle={{
                        background: 'transparent',
                        width: '100%',
                        margin: '0',
                        padding: '1rem 0',
                        fontSize: '14px',
                        fontFamily: 'monospace',
                    }}
                    codeTagProps={{
                        style: { fontFamily: 'inherit' }
                    }}
                    lineNumberStyle={{
                        minWidth: '2.25em',
                        paddingRight: '1rem',
                        textAlign: 'right',
                        color: '#8B949E',
                        userSelect: 'none',
                    }}
                >
                    {snippet.code?.trim() ?? ''}
                </SyntaxHighlighter>
                </div>
            ))
          ) : (
            <div className="p-4 text-brand-text-secondary">
                No code snippets available for this language.
            </div>
          )}
        </div>
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

export default AllCodeModal;
