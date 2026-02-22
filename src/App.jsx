import React, { useState } from 'react';
import { Map, GitBranch, LayoutDashboard, Target, Brain } from 'lucide-react';
import UserJourneyMaps from './components/UserJourneyMaps';
import SystemArchitecture from './components/SystemArchitecture';
import FeatureBreakdown from './components/FeatureBreakdown';
import JobsToBeDone from './components/JobsToBeDone';

export default function App() {
  const [activeView, setActiveView] = useState('journey');

  const views = [
    { id: 'journey', label: 'User Journeys', icon: Map, component: UserJourneyMaps },
    { id: 'architecture', label: 'System Architecture', icon: GitBranch, component: SystemArchitecture },
    { id: 'features', label: 'Feature Breakdown', icon: LayoutDashboard, component: FeatureBreakdown },
    { id: 'jtbd', label: 'Jobs To Be Done', icon: Target, component: JobsToBeDone },
  ];

  const ActiveComponent = views.find(v => v.id === activeView)?.component || UserJourneyMaps;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-teal-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-slate-800 text-lg leading-tight">AI Triage Service</h1>
                <p className="text-xs text-slate-500">Product Overview</p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1">
              {views.map((view) => {
                const Icon = view.icon;
                return (
                  <button
                    key={view.id}
                    onClick={() => setActiveView(view.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeView === view.id
                        ? 'bg-teal-50 text-teal-700'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                    }`}
                  >
                    <Icon size={18} />
                    {view.label}
                  </button>
                );
              })}
            </div>

            {/* Status Badge */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Seed Round</span>
              <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                $3.5M
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <ActiveComponent />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-slate-500">
            Confidential — For Internal Use Only
          </p>
        </div>
      </footer>
    </div>
  );
}
