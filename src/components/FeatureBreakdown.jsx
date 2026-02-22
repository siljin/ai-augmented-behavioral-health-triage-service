import React, { useState } from 'react';
import { 
  MessageSquare, 
  Activity, 
  Brain, 
  LayoutDashboard, 
  Bell, 
  BarChart3,
  ChevronRight,
  Check,
  X,
  Clock,
  Users,
  Shield,
  Zap,
  Database,
  Lock
} from 'lucide-react';

export default function FeatureBreakdown() {
  const [activeFeature, setActiveFeature] = useState('chatbot');

  const features = {
    chatbot: {
      id: 'chatbot',
      name: '24/7 Crisis Chatbot',
      icon: MessageSquare,
      color: '#3B82F6',
      tagline: 'Always-on patient support that captures behavioral signals',
      description: 'A patient-facing conversational interface available around the clock for mood logging, coping exercises, and crisis de-escalation. Every interaction generates behavioral data that feeds the risk engine.',
      userStories: [
        'As a patient, I want to log my mood at 2am when I can\'t sleep so I feel heard between appointments',
        'As a patient in distress, I want immediate de-escalation support so I can stabilize before reaching crisis',
        'As a clinician, I want to see what my patient discussed with the chatbot so I can prepare for our session'
      ],
      capabilities: [
        { name: 'Mood logging prompts', included: true, detail: 'Daily check-ins with validated scales' },
        { name: 'Coping exercise library', included: true, detail: 'CBT, DBT, mindfulness techniques' },
        { name: 'Crisis de-escalation protocols', included: true, detail: 'Safety planning, grounding exercises' },
        { name: 'Auto-escalation to human', included: true, detail: 'Triggers when risk keywords detected' },
        { name: 'Appointment scheduling', included: true, detail: 'Book/reschedule directly in chat' },
        { name: 'Medication reminders', included: false, detail: 'Phase 2 roadmap' }
      ],
      dataOutputs: [
        { metric: 'Response latency', description: 'Time between bot message and patient reply', signal: 'Increased latency = potential withdrawal' },
        { metric: 'Sentiment score', description: '-1 to +1 scale per message', signal: 'Negative trend = deterioration' },
        { metric: 'Usage frequency', description: 'Sessions per day/week', signal: 'Drop-off = disengagement risk' },
        { metric: 'Keyword flags', description: 'Detection of risk terms', signal: '"hopeless", "give up" = immediate alert' }
      ],
      techSpecs: {
        stack: 'NLP pipeline (sentiment analysis, entity extraction, keyword detection)',
        latency: '<500ms response time',
        availability: '99.9% uptime SLA',
        compliance: 'HIPAA-compliant, SOC 2 Type II'
      },
      metrics: {
        engagement: '73% daily active rate',
        satisfaction: '4.2/5 patient rating',
        escalations: '12% auto-escalate to human'
      }
    },
    behavioral: {
      id: 'behavioral',
      name: 'Passive Behavioral Tracking',
      icon: Activity,
      color: '#8B5CF6',
      tagline: 'Continuous monitoring without patient burden',
      description: 'Captures behavioral signals passively from chatbot interactions and (with consent) therapy sessions. Patients don\'t fill out extra forms — the system learns from natural interactions.',
      userStories: [
        'As a clinician, I want to see behavioral trends between sessions so I\'m not flying blind',
        'As a patient, I don\'t want to fill out more surveys — just help me naturally',
        'As a clinic admin, I want passive data collection that doesn\'t add friction to patient experience'
      ],
      capabilities: [
        { name: 'Chat pattern analysis', included: true, detail: 'Message length, timing, emoji usage' },
        { name: 'Response latency tracking', included: true, detail: 'Millisecond-level precision' },
        { name: 'Sentiment velocity', included: true, detail: 'Rate of mood change over time' },
        { name: 'Session audio analysis', included: true, detail: 'Speech rate, pauses, tone (with consent)' },
        { name: 'Wearable integration', included: false, detail: 'Phase 3 roadmap (sleep, HRV)' },
        { name: 'Social media signals', included: false, detail: 'Not planned (privacy concerns)' }
      ],
      dataOutputs: [
        { metric: 'Engagement decay curve', description: 'Pattern of decreasing interaction', signal: 'Steep decay = dropout risk' },
        { metric: 'Circadian patterns', description: 'Time-of-day activity shifts', signal: 'Late night activity = sleep disruption' },
        { metric: 'Speech biomarkers', description: 'Acoustic features from sessions', signal: 'Flat affect, slow speech = depression markers' },
        { metric: 'Interaction density', description: 'Messages per session over time', signal: 'Declining density = withdrawal' }
      ],
      techSpecs: {
        stack: 'Time-series processing, acoustic analysis, feature store',
        latency: 'Batch processing every 6 hours',
        availability: 'Async pipeline, no patient-facing latency',
        compliance: 'Session-by-session consent for audio'
      },
      metrics: {
        dataPoints: '47 signals per patient per day',
        accuracy: '84% correlation with PHQ-9 trends',
        consent: '68% opt-in rate for audio analysis'
      }
    },
    riskEngine: {
      id: 'riskEngine',
      name: 'Risk Scoring Engine',
      icon: Brain,
      color: '#10B981',
      tagline: 'Transparent, explainable risk prediction',
      description: 'Combines all data sources into a daily 0-100 risk score with full transparency. No black-box ML — clinicians can see exactly why each patient is flagged and override if they disagree.',
      userStories: [
        'As a clinician, I want to understand WHY a patient is flagged so I can trust the system',
        'As a clinician, I want to override the AI when my clinical judgment differs',
        'As a clinic admin, I want defensible risk scoring for payer reporting'
      ],
      capabilities: [
        { name: 'Daily risk score (0-100)', included: true, detail: 'Refreshed every 24 hours' },
        { name: 'Top 3 risk drivers', included: true, detail: 'Explainable contributing factors' },
        { name: '5-7 day prediction window', included: true, detail: 'Early warning before crisis' },
        { name: 'Clinician override', included: true, detail: 'Adjust score with documented reason' },
        { name: 'Confidence intervals', included: true, detail: 'Uncertainty quantification' },
        { name: 'Custom threshold tuning', included: false, detail: 'Phase 2 (per-clinic calibration)' }
      ],
      dataOutputs: [
        { metric: 'Risk score', description: '0-100 composite score', signal: '>80 = "Act Now", 60-80 = "Watch"' },
        { metric: 'Score delta', description: 'Change from yesterday', signal: '>15pt spike = velocity alert' },
        { metric: 'Driver weights', description: 'Contribution of each signal', signal: 'Transparency for clinician trust' },
        { metric: 'Historical trend', description: '30-day score trajectory', signal: 'Pattern recognition' }
      ],
      techSpecs: {
        stack: 'Weighted ensemble model, explainable AI (SHAP values)',
        latency: 'Daily batch scoring at 4am local',
        availability: 'Scores ready by 6am for morning triage',
        compliance: 'Decision-support only (not diagnostic)'
      },
      metrics: {
        accuracy: '78% sensitivity at 80+ threshold',
        falsePositive: '15% false positive rate',
        leadTime: '5.2 days average early warning'
      }
    },
    dashboard: {
      id: 'dashboard',
      name: 'Triage Dashboard',
      icon: LayoutDashboard,
      color: '#F59E0B',
      tagline: 'Risk-prioritized worklist for proactive care',
      description: 'Replaces the chaotic shared inbox with an intelligent worklist. Clinicians start each day knowing exactly which patients need attention, ranked by risk with full context one click away.',
      userStories: [
        'As a clinician, I want to see my highest-risk patients first so I can prioritize my limited time',
        'As a clinician, I want one-click access to patient context so I don\'t waste time hunting through charts',
        'As a clinic admin, I want visibility into panel health across all clinicians'
      ],
      capabilities: [
        { name: 'Risk-sorted worklist', included: true, detail: 'Highest risk at top, not FCFS' },
        { name: '"Why this patient?" cards', included: true, detail: 'Top 3 risk drivers shown' },
        { name: 'One-click patient context', included: true, detail: 'Longitudinal profile expands inline' },
        { name: 'Bulk actions', included: true, detail: 'Mark reviewed, schedule follow-up' },
        { name: 'Panel overview', included: true, detail: 'Risk distribution across caseload' },
        { name: 'Cross-clinician view', included: false, detail: 'Admin-only, Phase 2' }
      ],
      dataOutputs: [
        { metric: 'Worklist position', description: 'Rank among clinician\'s panel', signal: 'Drives daily triage order' },
        { metric: 'Time since last contact', description: 'Days since session or outreach', signal: 'Overdue = escalation risk' },
        { metric: 'Action recommendations', description: 'Suggested next step', signal: '"Schedule check-in", "Review chatbot logs"' },
        { metric: 'Resolution tracking', description: 'Outcome of each intervention', signal: 'Feeds model improvement' }
      ],
      techSpecs: {
        stack: 'React dashboard, real-time WebSocket updates',
        latency: '<2s page load, <500ms interactions',
        availability: 'Web + mobile responsive',
        compliance: 'Role-based access control'
      },
      metrics: {
        adoption: '91% daily clinician login rate',
        timeToAction: '3.2 hours avg from alert to intervention',
        satisfaction: '4.5/5 clinician rating'
      }
    },
    alerts: {
      id: 'alerts',
      name: 'Alert System',
      icon: Bell,
      color: '#EF4444',
      tagline: 'Proactive notifications that prevent crises',
      description: 'Pushes real-time alerts when patients cross risk thresholds. Clinicians receive notifications with full context and can act immediately — no detective work required.',
      userStories: [
        'As a clinician, I want to be notified immediately when a patient\'s risk spikes',
        'As a clinician, I want the alert to include context so I can act without research',
        'As a patient, I want my clinician to reach out proactively when I\'m struggling'
      ],
      capabilities: [
        { name: '"Act Now" alerts (score >80)', included: true, detail: 'Immediate push notification' },
        { name: 'Velocity alerts (>15pt spike)', included: true, detail: 'Rapid deterioration detection' },
        { name: 'Context card with alert', included: true, detail: 'Top drivers + patient contact info' },
        { name: 'One-click intervention logging', included: true, detail: 'Document action taken' },
        { name: 'Escalation chains', included: true, detail: 'Auto-escalate if no response in 4h' },
        { name: 'Custom alert thresholds', included: false, detail: 'Phase 2 (per-clinician tuning)' }
      ],
      dataOutputs: [
        { metric: 'Alert type', description: 'Threshold vs. velocity vs. keyword', signal: 'Categorizes urgency source' },
        { metric: 'Response time', description: 'Minutes from alert to action', signal: 'Tracked for quality metrics' },
        { metric: 'Intervention outcome', description: 'Result of clinician action', signal: 'Crisis averted / escalated / false alarm' },
        { metric: 'Alert fatigue score', description: 'Alerts per clinician per day', signal: 'Monitor for burnout risk' }
      ],
      techSpecs: {
        stack: 'Push notification service (FCM/APNS), SMS fallback',
        latency: '<30 seconds from trigger to delivery',
        availability: 'Multi-channel (app, SMS, email)',
        compliance: 'PHI-minimal in notification preview'
      },
      metrics: {
        responseRate: '94% responded within 4 hours',
        crisesAverted: '3.2 per clinic per month',
        falseAlarmRate: '18% marked "not actionable"'
      }
    },
    analytics: {
      id: 'analytics',
      name: 'Outcomes Analytics',
      icon: BarChart3,
      color: '#6366F1',
      tagline: 'ROI proof for payers and leadership',
      description: 'Dashboards and reports that prove the value of proactive care. Track no-show rates, crises averted, time-to-intervention, and more — data that wins and renews payer contracts.',
      userStories: [
        'As a clinic admin, I want to show payers our improved outcomes to negotiate better rates',
        'As a clinic admin, I want to identify which clinicians need support with high-risk panels',
        'As a clinician, I want to see my personal impact metrics for professional development'
      ],
      capabilities: [
        { name: 'No-show rate tracking', included: true, detail: 'By clinician, panel, time period' },
        { name: 'Crises averted count', included: true, detail: 'Documented interventions' },
        { name: 'Time-to-intervention metrics', included: true, detail: 'Alert to action latency' },
        { name: 'Panel health scores', included: true, detail: 'Aggregate risk distribution' },
        { name: 'Payer-ready reports', included: true, detail: 'Exportable PDF/CSV' },
        { name: 'Predictive capacity planning', included: false, detail: 'Phase 3 roadmap' }
      ],
      dataOutputs: [
        { metric: 'No-show rate', description: 'Missed appointments / scheduled', signal: 'Target: <20% (vs. 30% industry)' },
        { metric: 'Crisis intervention rate', description: 'Proactive outreach / total crises', signal: 'Higher = more prevention' },
        { metric: 'Avg. risk score trend', description: 'Panel-wide trajectory', signal: 'Declining = treatment working' },
        { metric: 'Clinician utilization', description: 'Scheduled vs. capacity', signal: 'Optimize caseload distribution' }
      ],
      techSpecs: {
        stack: 'BI dashboard (Metabase), automated report generation',
        latency: 'Daily refresh, real-time for key metrics',
        availability: 'Web dashboard + scheduled email reports',
        compliance: 'Aggregate data only (no PHI in exports)'
      },
      metrics: {
        reportFrequency: 'Weekly digest, monthly deep-dive',
        payerAdoption: '4 payer integrations live',
        roiProof: '$127K avg. annual savings per 100-provider clinic'
      }
    }
  };

  const activeFeatureData = features[activeFeature];
  const FeatureIcon = activeFeatureData.icon;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Feature Breakdown</h1>
          <p className="text-slate-600">Detailed specifications for each product component</p>
        </div>

        <div className="flex gap-6">
          {/* Feature Navigation */}
          <div className="w-72 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-4 sticky top-24">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Components</h2>
              <nav className="space-y-1">
                {Object.values(features).map((feature) => {
                  const Icon = feature.icon;
                  const isActive = activeFeature === feature.id;
                  return (
                    <button
                      key={feature.id}
                      onClick={() => setActiveFeature(feature.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                        isActive 
                          ? 'bg-slate-100 text-slate-900' 
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                      }`}
                    >
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ 
                          backgroundColor: isActive ? feature.color : `${feature.color}15`,
                          color: isActive ? 'white' : feature.color
                        }}
                      >
                        <Icon size={18} />
                      </div>
                      <span className="text-sm font-medium">{feature.name}</span>
                      {isActive && <ChevronRight size={16} className="ml-auto text-slate-400" />}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Feature Detail */}
          <div className="flex-1 space-y-6">
            {/* Hero Card */}
            <div 
              className="rounded-2xl p-6 text-white"
              style={{ backgroundColor: activeFeatureData.color }}
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                  <FeatureIcon size={28} />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-1">{activeFeatureData.name}</h2>
                  <p className="text-white/80 text-lg">{activeFeatureData.tagline}</p>
                </div>
              </div>
              <p className="mt-4 text-white/90">{activeFeatureData.description}</p>
            </div>

            {/* User Stories */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Users size={20} className="text-slate-400" />
                User Stories
              </h3>
              <div className="space-y-3">
                {activeFeatureData.userStories.map((story, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-400 font-mono text-sm">#{i + 1}</span>
                    <p className="text-slate-700 text-sm italic">"{story}"</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Capabilities */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Zap size={20} className="text-slate-400" />
                Capabilities
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {activeFeatureData.capabilities.map((cap, i) => (
                  <div 
                    key={i} 
                    className={`p-4 rounded-lg border ${
                      cap.included 
                        ? 'border-green-200 bg-green-50' 
                        : 'border-slate-200 bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {cap.included ? (
                        <Check size={16} className="text-green-600" />
                      ) : (
                        <Clock size={16} className="text-slate-400" />
                      )}
                      <span className={`font-medium text-sm ${
                        cap.included ? 'text-green-800' : 'text-slate-500'
                      }`}>
                        {cap.name}
                      </span>
                    </div>
                    <p className={`text-xs ml-6 ${
                      cap.included ? 'text-green-700' : 'text-slate-400'
                    }`}>
                      {cap.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Outputs */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Database size={20} className="text-slate-400" />
                Data Outputs
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-2 px-3 text-sm font-semibold text-slate-600">Metric</th>
                      <th className="text-left py-2 px-3 text-sm font-semibold text-slate-600">Description</th>
                      <th className="text-left py-2 px-3 text-sm font-semibold text-slate-600">Signal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeFeatureData.dataOutputs.map((output, i) => (
                      <tr key={i} className="border-b border-slate-100 last:border-0">
                        <td className="py-3 px-3">
                          <span className="font-medium text-slate-800 text-sm">{output.metric}</span>
                        </td>
                        <td className="py-3 px-3 text-slate-600 text-sm">{output.description}</td>
                        <td className="py-3 px-3">
                          <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                            {output.signal}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tech Specs & Metrics */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Tech Specs */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <Shield size={20} className="text-slate-400" />
                  Technical Specs
                </h3>
                <div className="space-y-3">
                  {Object.entries(activeFeatureData.techSpecs).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-start">
                      <span className="text-sm text-slate-500 capitalize">{key}</span>
                      <span className="text-sm text-slate-800 text-right max-w-48">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Metrics */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                  <BarChart3 size={20} className="text-slate-400" />
                  Key Metrics
                </h3>
                <div className="space-y-3">
                  {Object.entries(activeFeatureData.metrics).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-sm text-slate-500 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span 
                        className="text-sm font-semibold px-2 py-1 rounded"
                        style={{ 
                          backgroundColor: `${activeFeatureData.color}15`,
                          color: activeFeatureData.color
                        }}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
