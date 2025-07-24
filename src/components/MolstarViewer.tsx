import { useEffect, useRef } from 'react';

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

  useEffect(() => {
    if (!containerRef.current) return;

    // For now, we'll create a simple placeholder that shows protein structure info
    // This will be replaced with actual Molstar integration once the library is properly configured
    const container = containerRef.current;
    
    // Create a simple 3D-like visualization placeholder
    container.innerHTML = `
      <div class="flex items-center justify-center h-full bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg">
        <div class="text-center space-y-4">
          <div class="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center animate-pulse">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
            </svg>
          </div>
          <div class="space-y-2">
            <h3 class="text-lg font-semibold text-foreground">Protein Structure ${pdbId}</h3>
            <p class="text-sm text-muted-foreground">3D Molecular Visualization</p>
            ${autoRotate ? '<p class="text-xs text-primary">🔄 Auto-rotating</p>' : ''}
          </div>
        </div>
      </div>
    `;

    // Add hover effect
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      const inner = container.querySelector('div > div') as HTMLElement;
      if (inner) {
        inner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
    };

    const handleMouseLeave = () => {
      const inner = container.querySelector('div > div') as HTMLElement;
      if (inner) {
        inner.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [pdbId, autoRotate]);

  return (
    <div className={`${className} bg-gradient-to-br from-background to-muted/30 rounded-lg overflow-hidden border border-border/50 shadow-card`}>
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
};

export default MolstarViewer;