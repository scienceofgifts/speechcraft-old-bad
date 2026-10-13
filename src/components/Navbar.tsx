import React, { useState, useRef, useEffect } from 'react';
import {
  Mic,
  Volume2,
  Activity,
  Zap,
  BookOpen,
  MessageSquare,
  TrendingUp,
  Settings as SettingsIcon,
  Menu,
  X,
  Radio,
  Brain,
  ChevronDown,
  Heart,
} from 'lucide-react';

export type NavTab =
  | 'dashboard'
  | 'analysis'
  | 'pronunciation'
  | 'delivery'
  | 'fluency'
  | 'vocabulary'
  | 'vocab-builder'
  | 'conversation'
  | 'flirting'
  | 'progress'
  | 'settings';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  streakDays?: number;
  onOpenSessionModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  streakDays,
  onOpenSessionModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const primaryNavItems: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'analysis', label: 'Speech Analysis', icon: <Mic className="w-3.5 h-3.5 shrink-0" /> },
    { id: 'pronunciation', label: 'Pronunciation Lab', icon: <Volume2 className="w-3.5 h-3.5 shrink-0" /> },
    { id: 'delivery', label: 'Voice & Delivery', icon: <Activity className="w-3.5 h-3.5 shrink-0" /> },
    { id: 'fluency', label: 'Fluency Gym', icon: <Zap className="w-3.5 h-3.5 shrink-0" /> },
    { id: 'conversation', label: 'Conversation', icon: <MessageSquare className="w-3.5 h-3.5 shrink-0" /> },
    { id: 'progress', label: 'Progress', icon: <TrendingUp className="w-3.5 h-3.5 shrink-0" /> },
  ];

  const secondaryNavItems: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'flirting', label: 'Flirting & Intimate Studio', icon: <Heart className="w-3.5 h-3.5 shrink-0 text-rose-400" /> },
    { id: 'vocabulary', label: 'American Idioms', icon: <BookOpen className="w-3.5 h-3.5 shrink-0" /> },
    { id: 'vocab-builder', label: 'Vocabulary Builder', icon: <Brain className="w-3.5 h-3.5 shrink-0" /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon className="w-3.5 h-3.5 shrink-0" /> },
  ];

  const allNavItems = [...primaryNavItems, ...secondaryNavItems];

  const handleSelect = (tab: NavTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
  };

  const isSecondaryActive = secondaryNavItems.some((item) => item.id === currentTab);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand identity */}
        <div
          className="flex items-center gap-2.5 cursor-pointer shrink-0 select-none group"
          onClick={() => handleSelect('dashboard')}
          role="button"
          tabIndex={0}
          title="Go to Dashboard"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-500 to-sky-500 flex items-center justify-center text-slate-950 shadow-md shadow-teal-950/30 group-hover:brightness-110 transition-all shrink-0">
            <Radio className="w-5 h-5 text-slate-950" />
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-bold tracking-tight text-slate-100 flex items-center gap-1.5 whitespace-nowrap">
              SpeechCraft <span className="text-teal-400 font-medium">Studio</span>
            </div>
            <div className="text-[10px] text-slate-400 tracking-wider uppercase font-mono whitespace-nowrap">
              General American Speech
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links - Responsive with "More" dropdown for secondary items */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 min-w-0 py-1">
          {primaryNavItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-800 text-teal-300 shadow-sm border border-slate-700/70 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                {item.icon}
                <span className="whitespace-nowrap">{item.label}</span>
              </button>
            );
          })}

          {/* More Dropdown Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                isSecondaryActive
                  ? 'bg-slate-800 text-teal-300 shadow-sm border border-slate-700/70 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <span>More Modules</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {moreDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl py-2 z-50 animate-fadeIn">
                {secondaryNavItems.map((item) => {
                  const isActive = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item.id)}
                      className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium transition-colors text-left ${
                        isActive
                          ? 'bg-teal-500/10 text-teal-300 font-semibold border-l-2 border-teal-500'
                          : 'text-slate-300 hover:bg-slate-800/80 hover:text-slate-100'
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {onOpenSessionModal && (
            <button
              onClick={onOpenSessionModal}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-teal-950/30 whitespace-nowrap cursor-pointer active:scale-95"
            >
              <Zap className="w-3.5 h-3.5 fill-slate-950" />
              <span>Start Session</span>
            </button>
          )}

          {/* Mobile / Tablet menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950/95 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-fadeIn">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {allNavItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-slate-800 text-teal-300 border border-slate-700 font-semibold'
                      : 'text-slate-300 hover:text-slate-100 hover:bg-slate-900'
                  }`}
                >
                  {item.icon}
                  <span className="whitespace-nowrap">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
