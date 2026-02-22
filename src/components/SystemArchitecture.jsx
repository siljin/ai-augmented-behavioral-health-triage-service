import React, { useState } from 'react';

export default function SystemArchitecture() {
  const [activeLayer, setActiveLayer] = useState(null);
  const [hoveredComponent, setHoveredComponent] = useState(null);

  const componentDetails = {
    // Data Sources
    'chatbot': {
      title: '24/7 Crisis Chatbot',
      layer: 'input',
      description: 'Always-on patient support capturing behavioral signals',
      dataPoints: ['Response latency (2min → 45min = red flag)', 'Message sentiment (-1 to +1 scale)', 'Usage frequency & patterns', 'Keyword detection ("hopeless", "give up")', 'Time-of-day activity shifts'],
      techStack: 'NLP pipeline, sentiment analysis, keyword extraction',
      frequency: 'Real-time, aggregated daily'
    },
    'sessions': {
      title: 'Session Capture',
      layer: 'input',
      description: 'Audio biomarkers from therapy sessions (with consent)',
      dataPoints: ['Speech rate (words/min)', 'Pause frequency & duration', 'Emotional valence (tone analysis)', 'Topic modeling (themes discussed)', 'Engagement markers'],
      techStack: 'Audio processing, speech-to-text, acoustic analysis',
      frequency: 'Per session, processed within 24h'
    },
    'screeners': {
      title: 'Clinical Screeners',
      layer: 'input',
      description: 'Validated assessment instruments',
      dataPoints: ['PHQ-9 scores (depression, 0-27)', 'GAD-7 scores (anxiety, 0-21)', 'Custom intake questions', 'Demographic risk factors', 'No-show history'],
      techStack: 'Form engine with branching logic',
      frequency: 'Intake + periodic reassessment'
    },
    'ehr': {
      title: 'EHR Integration',
      layer: 'input',
      description: 'Existing clinical data from partner systems',
      dataPoints: ['Appointment history', 'Medication records', 'Prior diagnoses', 'Treatment notes', 'Insurance/payer data'],
      techStack: 'HL7 FHIR APIs, secure data sync',
      frequency: 'Nightly batch + real-time for appointments'
    },
    // Processing Layer
    'normalization': {
      title: 'Data Normalization',
      layer: 'processing',
      description: 'Standardizes inputs from disparate sources',
      dataPoints: ['Schema mapping across sources', 'Missing data imputation', 'Outlier detection & handling', 'Time-series alignment', 'PHI tokenization'],
      techStack: 'ETL pipelines, data quality checks',
      frequency: 'Continuous as data arrives'
    },
    'features': {
      title: 'Feature Engineering',
      layer: 'processing',
      description: 'Transforms raw data into predictive signals',
      dataPoints: ['Δ response latency (7-day trend)', 'Sentiment velocity (rate of change)', 'Engagement decay curves', 'Cross-signal correlations', 'Temporal pattern extraction'],
      techStack: 'Feature store, time-series processing',
      frequency: 'Daily feature refresh'
    },
    'risk-engine': {
      title: 'Risk Scoring Engine',
      layer: 'processing',
      description: 'Transparent weighted scoring (not black-box ML)',
      dataPoints: ['Daily score: 0-100', 'Top 3 contributing factors', 'Score delta vs. yesterday', 'Confidence interval', '5-7 day prediction window'],
      techStack: 'Weighted ensemble, explainable AI, clinician-tunable weights',
      frequency: 'Daily score generation'
    },
    'alerts': {
      title: 'Alert Engine',
      layer: 'processing',
      description: 'Triggers proactive interventions based on thresholds',
      dataPoints: ['"Act Now" threshold (score >80)', '"Watch" threshold (score 60-80)', 'Velocity alerts (>15pt spike)', 'Pattern-based triggers', 'Escalation rules'],
      techStack: 'Rules engine, notification service',
      frequency: 'Real-time monitoring'
    },
    // Output Layer
    'worklist': {
      title: 'Risk-Prioritized Worklist',
      layer: 'output',
      description: 'Clinician\'s daily triage dashboard',
      dataPoints: ['Patients ranked by risk score', 'Trend arrows (↑↓→)', '"Why this patient?" explanations', 'One-click patient context', 'Action recommendations'],
      techStack: 'React dashboard, real-time updates',
      users: 'Clinicians (daily morning triage)'
    },
    'patient-profile': {
      title: 'Longitudinal Patient Profile',
      layer: 'output',
      description: 'Unified view of patient health trajectory',
      dataPoints: ['PHQ-9/GAD-7 trend graphs', 'Chatbot interaction timeline', 'Session summaries', 'Risk score history', 'Intervention log'],
      techStack: 'Data visualization, timeline UI',
      users: 'Clinicians (session prep)'
    },
    'notifications': {
      title: 'Push Notifications',
      layer: 'output',
      description: 'Real-time alerts to clinicians',
      dataPoints: ['"Act Now" alerts with context', 'Daily digest summaries', 'No-show risk warnings', 'New high-risk intake alerts', 'Escalation notifications'],
      techStack: 'Push service, mobile + web',
      users: 'Clinicians (real-time)'
    },
    'analytics': {
      title: 'Outcomes Analytics',
      layer: 'output',
      description: 'ROI proof for payers and clinic leadership',
      dataPoints: ['No-show rate trends', 'Crises averted count', 'Time-to-intervention metrics', 'Panel health scores', 'Clinician utilization'],
      techStack: 'BI dashboard, automated reports',
      users: 'Clinic admins, payers (weekly/monthly)'
    }
  };

  const layers = {
    input: { label: 'Data Sources', color: '#3B82F6', bg: '#EFF6FF' },
    processing: { label: 'Intelligence Layer', color: '#8B5CF6', bg: '#F5F3FF' },
    output: { label: 'Clinician Interfaces', color: '#10B981', bg: '#ECFDF5' }
  };

  const ComponentBox = ({ id, className = '' }) => {
    const comp = componentDetails[id];
    const layer = layers[comp.layer];
    const isActive = hoveredComponent === id || activeLayer === comp.layer;
    
    return (
      <div
        className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${className}`}
        style={{
          borderColor: isActive ? layer.color : '#E2E8F0',
          backgroundColor: isActive ? layer.bg : 'white',
          transform: isActive ? 'scale(1.02)' : 'scale(1)',
          boxShadow: isActive ? `0 8px 24px ${layer.color}20` : '0 2px 8px rgba(0,0,0,0.05)'
        }}
        onMouseEnter={() => setHoveredComponent(id)}
        onMouseLeave={() => setHoveredComponent(null)}
      >
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-slate-800 text-sm">{comp.title}</h3>
          <span 
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ backgroundColor: layer.color, color: 'white' }}
          >
            {comp.layer === 'input' ? 'IN' : comp.layer === 'processing' ? 'PROC' : 'OUT'}
          </span>
        </div>
        <p className="text-xs text-slate-500 mb-3">{comp.description}</p>
        
        {isActive && (
          <div className="space-y-2 animate-fadeIn">
            <div>
              <p className="text-xs font-semibold text-slate-600 mb-1">Key Data Points:</p>
              <ul className="text-xs text-slate-500 space-y-0.5">
                {comp.dataPoints.slice(0, 3).map((point, i) => (
                  <li key={i} className="flex items-start gap-1">
                    <span style={{ color: layer.color }}>•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-2 border-t border-slate-200">
              <p className="text-xs text-slate-400">
                {comp.techStack && <><span className="font-medium">Tech:</span> {comp.techStack}</>}
                {comp.frequency && <><span className="font-medium">Freq:</span> {comp.frequency}</>}
                {comp.users && <><span className="font-medium">Users:</span> {comp.users}</>}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  const Arrow = ({ direction = 'right', label = '' }) => {
    const isVertical = direction === 'down';
    return (
      <div className={`flex ${isVertical ? 'flex-col' : 'flex-row'} items-center justify-center ${isVertical ? 'h-12' : 'w-8'}`}>
        {label && <span className="text-xs text-slate-400 mb-1">{label}</span>}
        <svg 
          width={isVertical ? 24 : 32} 
          height={isVertical ? 32 : 24} 
          viewBox={isVertical ? "0 0 24 32" : "0 0 32 24"}
          className="text-slate-300"
        >
          {isVertical ? (
            <path d="M12 0 L12 24 M6 18 L12 26 L18 18" stroke="currentColor" strokeWidth="2" fill="none"/>
          ) : (
            <path d="M0 12 L24 12 M18 6 L26 12 L18 18" stroke="currentColor" strokeWidth="2" fill="none"/>
          )}
        </svg>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        @keyframes flowPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        .flow-line { animation: flowPulse 2s ease-in-out infinite; }
      `}</style>
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">System Architecture</h1>
          <p className="text-slate-600">Data flow from patient inputs through the risk engine to clinician outputs</p>
        </div>

        {/* Layer Filter */}
        <div className="flex justify-center gap-3 mb-8">
          <button
            onClick={() => setActiveLayer(activeLayer === null ? null : null)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeLayer === null ? 'bg-slate-800 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            All Layers
          </button>
          {Object.entries(layers).map(([key, layer]) => (
            <button
              key={key}
              onClick={() => setActiveLayer(activeLayer === key ? null : key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2`}
              style={{
                backgroundColor: activeLayer === key ? layer.color : 'white',
                color: activeLayer === key ? 'white' : layer.color,
                border: `2px solid ${layer.color}`
              }}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeLayer === key ? 'white' : layer.color }} />
              {layer.label}
            </button>
          ))}
        </div>

        {/* Main Architecture Diagram */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-12 gap-4">
            
            {/* INPUT LAYER */}
            <div className="col-span-3 space-y-4">
              <div 
                className="text-center py-2 rounded-lg mb-4"
                style={{ backgroundColor: layers.input.bg }}
              >
                <span className="text-sm font-semibold" style={{ color: layers.input.color }}>
                  📥 DATA SOURCES
                </span>
              </div>
              <ComponentBox id="chatbot" />
              <ComponentBox id="sessions" />
              <ComponentBox id="screeners" />
              <ComponentBox id="ehr" />
            </div>

            {/* Arrow Column */}
            <div className="col-span-1 flex flex-col items-center justify-center">
              <div className="h-full flex flex-col items-center justify-center gap-8">
                <Arrow direction="right" />
                <Arrow direction="right" />
                <Arrow direction="right" />
                <Arrow direction="right" />
              </div>
            </div>

            {/* PROCESSING LAYER */}
            <div className="col-span-4 space-y-4">
              <div 
                className="text-center py-2 rounded-lg mb-4"
                style={{ backgroundColor: layers.processing.bg }}
              >
                <span className="text-sm font-semibold" style={{ color: layers.processing.color }}>
                  🧠 INTELLIGENCE LAYER
                </span>
              </div>
              
              {/* Processing Pipeline */}
              <div className="space-y-3">
                <ComponentBox id="normalization" />
                <div className="flex justify-center">
                  <Arrow direction="down" />
                </div>
                <ComponentBox id="features" />
                <div className="flex justify-center">
                  <Arrow direction="down" />
                </div>
                <ComponentBox id="risk-engine" />
                <div className="flex justify-center">
                  <Arrow direction="down" />
                </div>
                <ComponentBox id="alerts" />
              </div>
            </div>

            {/* Arrow Column */}
            <div className="col-span-1 flex flex-col items-center justify-center">
              <div className="h-full flex flex-col items-center justify-center gap-8">
                <Arrow direction="right" />
                <Arrow direction="right" />
                <Arrow direction="right" />
                <Arrow direction="right" />
              </div>
            </div>

            {/* OUTPUT LAYER */}
            <div className="col-span-3 space-y-4">
              <div 
                className="text-center py-2 rounded-lg mb-4"
                style={{ backgroundColor: layers.output.bg }}
              >
                <span className="text-sm font-semibold" style={{ color: layers.output.color }}>
                  👩‍⚕️ CLINICIAN INTERFACES
                </span>
              </div>
              <ComponentBox id="worklist" />
              <ComponentBox id="patient-profile" />
              <ComponentBox id="notifications" />
              <ComponentBox id="analytics" />
            </div>
          </div>
        </div>

        {/* Key Insight: The Risk Score Formula */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-6 text-white mb-8">
          <h3 className="font-semibold text-lg mb-3">🔬 Inside the Risk Engine: Transparent Weighted Scoring</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-purple-100 text-sm mb-4">
                Unlike black-box ML models, the risk engine uses explainable weighted scoring. Each signal contributes a known amount to the final score, enabling clinician trust and override.
              </p>
              <div className="bg-white/10 rounded-lg p-4 font-mono text-sm">
                <p className="text-purple-200 mb-2">// Simplified scoring logic</p>
                <p>risk_score = </p>
                <p className="pl-4">phq9_weight × normalize(phq9) +</p>
                <p className="pl-4">sentiment_weight × sentiment_delta +</p>
                <p className="pl-4">latency_weight × latency_zscore +</p>
                <p className="pl-4">noshow_weight × noshow_probability +</p>
                <p className="pl-4">...</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-purple-200 mb-2">Why This Matters:</p>
              <ul className="text-purple-100 text-sm space-y-2">
                <li>✓ <strong>Explainability:</strong> "Top 3 drivers" shown for every score</li>
                <li>✓ <strong>Clinician Override:</strong> Doctors can adjust if they disagree</li>
                <li>✓ <strong>Regulatory Safety:</strong> Not classified as diagnostic AI</li>
                <li>✓ <strong>Continuous Tuning:</strong> Weights refined based on outcomes</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Data Flow Timeline */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="font-semibold text-slate-800 mb-4">⏱️ Data Flow Timeline: From Signal to Action</h3>
          <div className="flex items-center justify-between overflow-x-auto pb-4">
            {[
              { time: 'Real-time', event: 'Patient messages chatbot', color: '#3B82F6' },
              { time: '+30s', event: 'Sentiment & latency captured', color: '#3B82F6' },
              { time: '+1h', event: 'Patterns aggregated', color: '#8B5CF6' },
              { time: '+24h', event: 'Daily risk score generated', color: '#8B5CF6' },
              { time: '+24h', event: 'Worklist re-prioritized', color: '#10B981' },
              { time: 'If >80', event: '"Act Now" alert fires', color: '#EF4444' }
            ].map((step, i) => (
              <div key={i} className="flex items-center">
                <div className="flex flex-col items-center min-w-max px-4">
                  <div 
                    className="w-4 h-4 rounded-full mb-2"
                    style={{ backgroundColor: step.color }}
                  />
                  <p className="text-xs font-semibold text-slate-600">{step.time}</p>
                  <p className="text-xs text-slate-500 text-center max-w-24">{step.event}</p>
                </div>
                {i < 5 && (
                  <div className="w-12 h-0.5 bg-slate-200 flow-line" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
