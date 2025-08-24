import React, { useState, useRef, MouseEvent } from 'react';
import { DiagramComponent, DesignPattern } from '../types';

interface InteractiveDiagramProps {
  diagram: DesignPattern['diagram'];
  onHoverComponent: (component: DiagramComponent | null) => void;
  onPinComponent: (component: DiagramComponent) => void;
  hoveredComponentId?: string;
  pinnedComponentId?: string;
}

const InteractiveDiagram: React.FC<InteractiveDiagramProps> = ({ diagram, onHoverComponent, onPinComponent, hoveredComponentId, pinnedComponentId }) => {
  const [transform, setTransform] = useState({ x: 0, y: 0, k: 1 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  const handleMouseDown = (e: MouseEvent<SVGSVGElement>) => {
    if (e.target === svgRef.current || (e.target as SVGElement).classList.contains('diagram-bg')) {
        setIsPanning(true);
        setStartPoint({ x: e.clientX - transform.x, y: e.clientY - transform.y });
    }
  };

  const handleMouseMove = (e: MouseEvent<SVGSVGElement>) => {
    if (!isPanning) return;
    e.preventDefault();
    setTransform(t => ({ ...t, x: e.clientX - startPoint.x, y: e.clientY - startPoint.y }));
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };
  
  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    const scaleAmount = 0.1;
    const svg = svgRef.current;
    if (!svg) return;

    const rect = svg.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const newScale = transform.k * (1 - Math.sign(e.deltaY) * scaleAmount);
    const minScale = 0.5;
    const maxScale = 3;

    if (newScale < minScale || newScale > maxScale) {
        return;
    }

    const worldX = (mouseX - transform.x) / transform.k;
    const worldY = (mouseY - transform.y) / transform.k;
    
    const newX = mouseX - worldX * newScale;
    const newY = mouseY - worldY * newScale;

    setTransform({ x: newX, y: newY, k: newScale });
  };

  return (
    <div className="w-full h-full bg-brand-primary overflow-hidden cursor-grab active:cursor-grabbing">
      <svg
        ref={svgRef}
        viewBox={diagram.viewBox}
        className="w-full h-full diagram-bg"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#30363D" strokeWidth="0.5"/>
          </pattern>
          {diagram.components
            .filter(c => c.type === 'arrow')
            .map(component => (
              <React.Fragment key={`defs-${component.id}`}>
                <marker
                    id={`arrowhead-dep-${component.id}`}
                    viewBox="0 0 10 10" refX="8" refY="5"
                    markerWidth="8" markerHeight="8"
                    orient="auto-start-reverse"
                >
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
                </marker>
                <marker
                    id={`arrowhead-impl-${component.id}`}
                    viewBox="0 0 10 10" refX="0" refY="5"
                    markerWidth="10" markerHeight="10"
                    orient="auto-start-reverse"
                >
                    <path d="M 10 0 L 0 5 L 10 10 z" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </marker>
              </React.Fragment>
            ))
          }
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" className="diagram-bg" />
        <g transform={`translate(${transform.x} ${transform.y}) scale(${transform.k})`}>
          {diagram.components.map((component) => {
            const isHovered = hoveredComponentId === component.id;
            const isPinned = pinnedComponentId === component.id;

            if (component.type === 'class' || component.type === 'interface') {
              const isActive = isHovered || isPinned;
              const fillColor = component.type === 'interface' ? 'fill-brand-primary' : 'fill-brand-secondary';
              return (
                <g 
                  key={component.id} 
                  onMouseEnter={() => onHoverComponent(component)}
                  onMouseLeave={() => onHoverComponent(null)}
                  onClick={() => onPinComponent(component)}
                  className="cursor-pointer"
                >
                  <rect
                    x={component.x}
                    y={component.y}
                    width={component.width}
                    height={component.height}
                    className={`transition-all ${fillColor} ${isActive ? 'stroke-brand-accent' : 'stroke-brand-border'}`}
                    strokeWidth={isActive ? 2 : 1.5}
                    rx={4}
                  />
                  {component.type === 'interface' && (
                    <text x={component.x + (component.width ?? 0) / 2} y={component.y + 20} textAnchor="middle" className={`text-xs italic select-none transition-colors ${isActive ? 'fill-brand-accent' : 'fill-brand-text-secondary'}`}>{`<<interface>>`}</text>
                  )}
                  <text
                    x={component.x + (component.width ?? 0) / 2}
                    y={component.y + (component.type === 'interface' ? 38 : 25)}
                    textAnchor="middle"
                    className={`font-semibold text-sm select-none transition-colors ${isActive ? 'fill-brand-accent' : 'fill-brand-text'}`}
                  >
                    {component.label}
                  </text>
                </g>
              );
            }

            if (component.type === 'arrow' && component.points) {
                const isDependency = component.arrowType === 'dependency';
                const relatedComponent = diagram.components.find(c => c.id === hoveredComponentId || c.id === pinnedComponentId);
                const isRelated = relatedComponent?.type === 'arrow' && relatedComponent.id === component.id;
                
                const isActive = isHovered || isPinned || isRelated;
                const arrowColor = isActive ? '#58A6FF' : '#8B949E';

                return (
                    <g 
                      key={component.id} 
                      className={`cursor-pointer transition-colors duration-200`}
                      style={{ color: arrowColor }}
                      onMouseEnter={() => onHoverComponent(component)}
                      onMouseLeave={() => onHoverComponent(null)}
                      onClick={() => onPinComponent(component)}
                    >
                      <path
                        d={component.points}
                        strokeDasharray={isDependency ? "5,5" : "none"}
                        stroke="currentColor"
                        strokeWidth={isActive ? 2.5 : 2}
                        fill="none"
                        markerEnd={component.arrowType === 'implementation' ? `url(#arrowhead-impl-${component.id})` : `url(#arrowhead-dep-${component.id})`}
                      />
                      {component.label && (
                        <text
                          x={component.x}
                          y={component.y}
                          textAnchor="middle"
                          style={{ fill: arrowColor }}
                          className="text-xs select-none font-medium transition-colors duration-200"
                          paintOrder="stroke"
                          stroke="#0D1117"
                          strokeWidth="4px"
                          strokeLinecap="butt"
                          strokeLinejoin="round"
                        >
                          {component.label}
                        </text>
                      )}
                    </g>
                );
            }
            return null;
          })}
        </g>
      </svg>
    </div>
  );
};

export default InteractiveDiagram;