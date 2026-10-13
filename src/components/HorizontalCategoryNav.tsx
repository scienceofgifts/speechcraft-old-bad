import React, { useRef, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

export interface CategoryNavItem {
  id: string;
  label: string;
  badge?: string;
  tag?: string;
  isCompleted?: boolean;
  disabled?: boolean;
}

interface HorizontalCategoryNavProps {
  items: CategoryNavItem[];
  selectedId: string;
  onSelect: (id: string) => void;
  ariaLabel?: string;
  className?: string;
}

export const HorizontalCategoryNav: React.FC<HorizontalCategoryNavProps> = ({
  items,
  selectedId,
  onSelect,
  ariaLabel = 'Category Navigation',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const activeBtn = itemRefs.current[selectedId];
    const container = containerRef.current;
    if (activeBtn && container) {
      const containerWidth = container.clientWidth;
      const activeLeft = activeBtn.offsetLeft;
      const activeWidth = activeBtn.clientWidth;
      const targetLeft = activeLeft - containerWidth / 2 + activeWidth / 2;

      container.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: 'smooth',
      });
    }
  }, [selectedId]);

  return (
    <nav className={`w-full max-w-full min-w-0 ${className}`} aria-label={ariaLabel}>
      <div
        ref={containerRef}
        className="flex items-center gap-2 overflow-x-auto pb-2 pt-0.5 min-w-0 w-full max-w-full scrollbar-none touch-pan-x px-0.5 scroll-smooth whitespace-nowrap flex-nowrap"
      >
        {items.map((item) => {
          const isSelected = item.id === selectedId;
          return (
            <button
              key={item.id}
              ref={(el) => {
                itemRefs.current[item.id] = el;
              }}
              onClick={() => onSelect(item.id)}
              disabled={item.disabled}
              className={`px-4 py-2.5 rounded-2xl text-xs font-semibold shrink-0 whitespace-nowrap border transition-all flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
                isSelected
                  ? 'bg-teal-500/20 border-teal-500 text-teal-300 shadow-md ring-1 ring-teal-500/50'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              } ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {item.isCompleted && (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              )}
              {item.tag && (
                <span className="text-[10px] uppercase font-mono text-slate-500 mr-1">
                  {item.tag}
                </span>
              )}
              <span className="whitespace-nowrap">{item.label}</span>
              {item.badge && (
                <span className="font-mono text-[10px] text-teal-400/90 bg-slate-950 px-2 py-0.5 rounded-full border border-teal-500/20 shrink-0">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
        {/* Trailing spacer */}
        <div className="w-3 shrink-0" aria-hidden="true" />
      </div>
    </nav>
  );
};
