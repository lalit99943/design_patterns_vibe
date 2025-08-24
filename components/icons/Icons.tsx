
import React from 'react';

const iconProps = {
  className: "w-6 h-6",
  strokeWidth: 1.5,
  stroke: "currentColor",
  fill: "none",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const MenuIcon: React.FC = () => (
  <svg {...iconProps} viewBox="0 0 24 24">
    <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

export const CloseIcon: React.FC = () => (
  <svg {...iconProps} viewBox="0 0 24 24">
    <path d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const FullScreenIcon: React.FC = () => (
    <svg {...iconProps} viewBox="0 0 24 24">
        <path d="M3 8V4m0 0h4M3 4l4 4m8 0l4-4m0 0h-4m4 0v4m-4 8l-4 4m0 0v-4m0 4h4" />
    </svg>
);

export const ExitFullScreenIcon: React.FC = () => (
    <svg {...iconProps} viewBox="0 0 24 24">
        <path d="M4 14h4v4m-4-4l4 4m12-4h-4v4m4-4l-4 4M4 10V6h4M4 6l4 4m12-4v4h-4m4-4l-4 4" />
    </svg>
);

export const PinIcon: React.FC = () => (
  <svg {...iconProps} className="w-5 h-5 text-brand-accent" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C9.243 2 7 4.243 7 7c0 1.742.859 3.284 2.148 4.243L7.2 18H7a1 1 0 000 2h10a1 1 0 000-2h-.2l-1.948-6.757C16.141 10.284 17 8.742 17 7c0-2.757-2.243-5-5-5z" />
  </svg>
);

export const SequenceDiagramIcon: React.FC = () => (
    <svg {...iconProps} viewBox="0 0 24 24">
      <path d="M9 4v16m6-16v16M5 8h8m-4 4h8" />
    </svg>
);

export const UseCaseDiagramIcon: React.FC = () => (
    <svg {...iconProps} viewBox="0 0 24 24">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
);

export const CodeIcon: React.FC = () => (
  <svg {...iconProps} viewBox="0 0 24 24">
    <path d="M7 8l-4 4 4 4m10 0l4-4-4-4M14 4l-4 16" />
  </svg>
);

export const ChevronDownIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg {...iconProps} className={className || iconProps.className} viewBox="0 0 24 24">
      <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
);
