import React, { useState } from 'react';
import ContentRenderer from './components/ContentRenderer';
import AiAssistant from './components/AiAssistant';
import { NAV_ITEMS } from './constants';
import { SectionId } from './types';
import { Menu } from 'lucide-react';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>(SectionId.INTRO);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-primary text-white fixed h-full z-10">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-xl font-bold tracking-tight text-accent">静压支承大师</h1>
          <p className="text-xs text-slate-400 mt-1">Hydrostatic Bearing Master</p>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left ${
                activeSection === item.id
                  ? 'bg-accent text-white shadow-lg shadow-accent/20'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-700 text-xs text-slate-500 text-center">
          © 2025 交互式教学系统
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-primary text-white z-20 flex items-center justify-between p-4 shadow-md">
        <span className="font-bold text-lg text-accent">静压支承大师</span>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-30" onClick={() => setMobileMenuOpen(false)}>
          <div className="bg-primary w-3/4 h-full p-4 pt-20 shadow-xl space-y-2" onClick={e => e.stopPropagation()}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeSection === item.id ? 'bg-accent text-white' : 'text-slate-300'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8 overflow-x-hidden">
        <div className="max-w-4xl mx-auto">
          <ContentRenderer activeSection={activeSection} />
        </div>
      </main>

      {/* AI Assistant Widget */}
      <AiAssistant />
    </div>
  );
};

export default App;