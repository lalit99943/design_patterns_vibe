import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { DiagramComponent } from '../types';
import { CloseIcon, PinIcon } from './icons/Icons';

interface CodePaneProps {
  component: DiagramComponent;
  onClose: () => void;
  isOverlay: boolean;
  isPinned: boolean;
}

const CodePane: React.FC<CodePaneProps> = ({ component, onClose, isOverlay, isPinned }) => {
  const availableLanguages = Object.keys(component.code);
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
  
  const hasCode = availableLanguages.length > 0 && selectedLanguage;

  return (
    <div className={`flex flex-col h-full bg-brand-primary border border-brand-border rounded-lg overflow-hidden ${isOverlay ? 'shadow-2xl' : ''}`}>
      <div className="flex justify-between items-center p-3 border-b border-brand-border flex-shrink-0">
        <div className="flex items-center gap-2">
            {isPinned && <PinIcon />}
            <h3 className="text-lg font-semibold text-brand-text">{component.label}</h3>
        </div>
        <button onClick={onClose} className="text-brand-text-secondary hover:text-brand-text">
          <CloseIcon />
        </button>
      </div>

      {hasCode && (
         <div className="flex-shrink-0 px-4 border-b border-brand-border">
            <div className="flex items-center -mb-px">
              {availableLanguages.map((lang) => (
                  <button
                      key={lang}
                      onClick={() => setSelectedLanguage(lang)}
                      className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                          selectedLanguage === lang
                          ? 'text-brand-accent border-brand-accent'
                          : 'text-brand-text-secondary border-transparent hover:text-brand-text'
                      }`}
                  >
                      {languageMap[lang] || lang}
                  </button>
              ))}
            </div>
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto text-sm">
        {hasCode ? (
            <SyntaxHighlighter
            language={highlighterLanguageMap[selectedLanguage]}
            style={vscDarkPlus}
            showLineNumbers
            wrapLines={true}
            customStyle={{
                background: 'transparent',
                width: '100%',
                height: '100%',
                padding: '1rem 0',
                fontSize: '14px',
                fontFamily: 'monospace',
            }}
            codeTagProps={{
                style: {
                    fontFamily: 'inherit'
                }
            }}
            lineNumberStyle={{
                minWidth: '2.25em',
                paddingRight: '1rem',
                textAlign: 'right',
                color: '#8B949E',
                userSelect: 'none',
            }}
            >
            {component.code[selectedLanguage]?.trim() ?? `// Code for ${languageMap[selectedLanguage]} not available.`}
            </SyntaxHighlighter>
        ) : (
            <div className="p-4 text-brand-text-secondary">
                No code snippet available for this component.
            </div>
        )}
      </div>
    </div>
  );
};

export default CodePane;