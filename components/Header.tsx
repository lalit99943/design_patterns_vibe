
import React from 'react';
import { MenuIcon, CloseIcon } from './icons/Icons';

interface HeaderProps {
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
  isDashboard: boolean;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, sidebarOpen, isDashboard }) => {
  return (
    <header className="flex-shrink-0 bg-brand-primary border-b border-brand-border h-16 flex items-center px-6">
      <button onClick={onToggleSidebar} className="text-brand-text-secondary hover:text-brand-text transition-colors">
        {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
      </button>
      <div className="ml-4">
        <h1 className="text-xl font-semibold text-brand-text">
          {isDashboard ? 'Java Design Patterns' : 'Pattern Viewer'}
        </h1>
      </div>
    </header>
  );
};

export default Header;
