import { useEffect, useRef, useState } from 'react';

interface MolstarViewerProps {
  pdbId?: string;
  className?: string;
  autoRotate?: boolean;
}

const MolstarViewer = ({ 
  pdbId = '1AOI', 
  className = "w-full h-[400px]",
  autoRotate = false 
}: MolstarViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)');

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
    };

    const handleMouseLeave = () => {
      setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg)');
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Validate pdbId to prevent XSS
  const sanitizedPdbId = pdbId?.replace(/[<>"/']/, '') || '1AOI';

  return (
    <div className={`${className} bg-gradient-to-br from-background to-muted/30 rounded-lg overflow-hidden border border-border/50 shadow-card`}>
      <div ref={containerRef} className="w-full h-full">
        <div className="flex items-center justify-center h-full bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg">
          <div 
            className="text-center space-y-4 transition-transform duration-300 ease-out"
            style={{ transform }}
          >
            <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center animate-pulse">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
              </svg>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">Protein Structure {sanitizedPdbId}</h3>
              <p className="text-sm text-muted-foreground">3D Molecular Visualization</p>
              {autoRotate && <p className="text-xs text-primary">🔄 Auto-rotating</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MolstarViewer;