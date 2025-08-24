export type PatternCategory = 'Creational' | 'Structural' | 'Behavioral';

export interface DiagramComponent {
  id: string;
  type: 'class' | 'interface' | 'arrow' | 'note';
  label: string;
  code: Record<string, string>;
  x: number;
  y: number;
  width?: number;
  height?: number;
  points?: string; // For arrows
  arrowType?: 'implementation' | 'dependency';
}

export interface DesignPattern {
  id: string;
  name: string;
  category: PatternCategory;
  description: string;
  whenToUse: string[];
  whenNotToUse: string[];
  comparison: string;
  diagram: {
    components: DiagramComponent[];
    viewBox: string;
  };
  sequenceDiagram?: string;
  useCaseDiagram?: string;
}