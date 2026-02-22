import React, { useState } from 'react';
import { User, Stethoscope, MessageSquare, Brain, Bell, Calendar, TrendingUp, AlertTriangle, CheckCircle, Clock, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';

export default function UserJourneyMaps() {
  const [activeView, setActiveView] = useState('patient');
  const [expandedStage, setExpandedStage] = useState(null);

  const patientJourney = [
    {
      id: 'intake',
      stage: 'Digital Intake',
      icon: User,
      timing: 'Day 0',
      touchpoints: ['Mobile-friendly intake form', 'PHQ-9 / GAD-7 screeners', 'Insurance & demographics'],
      dataCollected: ['Baseline symptom scores', 'Risk factors', 'Preferences'],
      userExperience: 'Patient completes validated screeners on their phone. Smart branching logic adapts questions based on responses.',
      emotionalState: 'Hopeful but anxious',
      systemAction: 'Initial risk score generated (0-100)',
      example: '"Over the past 2 weeks, how often have you felt down or hopeless?" → PHQ-9 score: 18 → Risk: MODERATE'
    },
    {
      id: 'match',
      stage: 'Smart Matching',
      icon: Brain,
      timing: 'Minutes later',
      touchpoints: ['Clinician recommendations shown', 'Availability slots displayed', 'Self-service booking'],
      dataCollected: ['Selected clinician', 'Appointment time', 'Communication preferences'],
      userExperience: 'Algorithm matches patient to appropriate provider based on acuity, specialty, license, and availability. Patient books directly.',
      emotionalState: 'Relieved - no phone tag',
      systemAction: 'Routing rules + license matching + calendar sync',
      example: 'PHQ-9: 18 + "suicidal thoughts: sometimes" → Routed to licensed clinical psychologist with crisis training, not LCSW'
    },
    {
      id: 'between',
      stage: 'Between Sessions',
      icon: MessageSquare,
      timing: 'Days 1-14',
      touchpoints: ['24/7 chatbot check-ins', 'Mood logging prompts', 'Crisis de-escalation'],
      dataCollected: ['Response latency', 'Sentiment shifts', 'Usage frequency', 'Keywords flagged'],
      userExperience: 'Patient interacts with chatbot for support, mood tracking, and coping exercises. Feels heard between appointments.',
      emotionalState: 'Varies - monitored continuously',
      systemAction: 'Passive behavioral signals feed risk model daily',
      example: 'Response time increased from 2min → 45min. Sentiment shifted negative. Keyword "hopeless" detected 3x → Risk score: 72 → 87'
    },
    {
      id: 'session',
      stage: 'Therapy Session',
      icon: Stethoscope,
      timing: 'Day 7, 14, 21...',
      touchpoints: ['Video session', 'In-session assessments', 'Audio analysis (with consent)'],
      dataCollected: ['Speech patterns', 'Emotional valence', 'Pause frequency', 'Topic themes'],
      userExperience: 'Patient attends scheduled session. With consent, audio biomarkers analyzed for additional signals.',
      emotionalState: 'Engaged in treatment',
      systemAction: 'Session data enriches longitudinal profile',
      example: 'Speech rate decreased 20%, longer pauses, flat affect detected → Combined with chatbot data → Risk adjustment'
    },
    {
      id: 'proactive',
      stage: 'Proactive Outreach',
      icon: Bell,
      timing: 'When risk spikes',
      touchpoints: ['Automated check-in', 'Clinician-initiated call', 'Rescheduled appointment'],
      dataCollected: ['Outreach response', 'Intervention outcome'],
      userExperience: 'If risk score spikes, patient receives proactive outreach before crisis escalates. Feels cared for.',
      emotionalState: 'Surprised but supported',
      systemAction: '"Act now" alert triggered clinician intervention',
      example: 'Risk: 87 + 40% anxiety marker increase → Clinician calls Sarah 5 days before scheduled appointment → Crisis averted'
    }
  ];

  const clinicianJourney = [
    {
      id: 'morning',
      stage: 'Morning Triage',
      icon: Clock,
      timing: '8:00 AM',
      touchpoints: ['Risk-prioritized worklist', 'New patient queue', 'Dashboard overview'],
      dataProvided: ['Top 10 high-risk patients', 'Risk scores with trend arrows', 'New intakes by acuity'],
      userExperience: 'Clinician opens dashboard and immediately sees which patients need attention today, ranked by risk score.',
      emotionalState: 'Focused, not overwhelmed',
      systemAction: 'Worklist auto-sorted by risk, not FCFS',
      example: 'Worklist: Sarah M. (87, ↑23 since yesterday), David W. (91, stable), James K. (64, ↓5) vs. old way: whoever messaged first'
    },
    {
      id: 'context',
      stage: 'Patient Context',
      icon: User,
      timing: 'Before each session',
      touchpoints: ['Longitudinal profile', '"Why this patient?" explanation', 'Session history'],
      dataProvided: ['Top 3 risk drivers', 'PHQ-9 trend graph', 'Chatbot interaction summary', 'Last session notes'],
      userExperience: 'One-click access to everything needed to prepare for session. No chart hunting.',
      emotionalState: 'Prepared, informed',
      systemAction: 'Unified patient view aggregates all data sources',
      example: '"Sarah\'s risk drivers: 1) 40% increase in anxiety keywords, 2) Response latency up 3x, 3) Missed last chatbot check-in"'
    },
    {
      id: 'session',
      stage: 'Session Delivery',
      icon: Stethoscope,
      timing: 'During appointments',
      touchpoints: ['Real-time session summary', 'Risk flag alerts', 'Suggested topics'],
      dataProvided: ['Key themes detected', 'Emotional valence tracking', 'Progress markers'],
      userExperience: 'AI assistant surfaces insights during session (optional). Clinician maintains full control.',
      emotionalState: 'Supported, not replaced',
      systemAction: 'Real-time analysis with clinician override',
      example: 'Session note auto-generated: "Patient discussed job loss, expressed hopelessness. Recommend safety planning next session."'
    },
    {
      id: 'alert',
      stage: 'Alert Response',
      icon: AlertTriangle,
      timing: 'When "Act Now" triggers',
      touchpoints: ['Push notification', 'One-click patient context', 'Intervention logging'],
      dataProvided: ['Risk spike details', 'Recommended action', 'Patient contact info'],
      userExperience: 'Clinician receives alert with full context and can act immediately. No detective work.',
      emotionalState: 'Empowered to intervene',
      systemAction: '5-7 day early warning enables proactive care',
      example: 'Alert: "Sarah M. risk 72→87. Anxiety markers +40%. Rec: Check-in call." → Clinician calls → Crisis averted'
    },
    {
      id: 'outcomes',
      stage: 'Outcomes Tracking',
      icon: TrendingUp,
      timing: 'Weekly/Monthly',
      touchpoints: ['Panel health dashboard', 'Payer reports', 'Personal metrics'],
      dataProvided: ['No-show rates', 'Risk score trends', 'Intervention success rates', 'Caseload distribution'],
      userExperience: 'Visibility into panel performance. Data for payer negotiations and personal improvement.',
      emotionalState: 'Confident in impact',
      systemAction: 'Analytics prove ROI to payers',
      example: 'Panel report: 15% no-show rate (vs. 30% industry), 3 crises averted this month, avg. risk score trending down'
    }
  ];

  const activeJourney = activeView === 'patient' ? patientJourney : clinicianJourney;

  const toggleExpand = (id) => {
    setExpandedStage(expandedStage === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">AI Triage Service — User Journey Maps</h1>
          <p className="text-slate-600">Understanding the end-to-end experience for patients and clinicians</p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-1 shadow-md inline-flex">
            <button
              onClick={() => { setActiveView('patient'); setExpandedStage(null); }}
              className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
                activeView === 'patient'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <User size={18} />
              Patient Journey
            </button>
            <button
              onClick={() => { setActiveView('clinician'); setExpandedStage(null); }}
              className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
                activeView === 'clinician'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              <Stethoscope size={18} />
              Clinician Journey
            </button>
          </div>
        </div>

        {/* Journey Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            {activeView === 'patient' ? 'Patient Flow' : 'Clinician Workflow'}
          </h2>
          <div className="flex items-center justify-between overflow-x-auto pb-2">
            {activeJourney.map((stage, index) => (
              <React.Fragment key={stage.id}>
                <div className="flex flex-col items-center min-w-max">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    expandedStage === stage.id ? 'bg-teal-600 text-white' : 'bg-teal-100 text-teal-600'
                  }`}>
                    <stage.icon size={24} />
                  </div>
                  <span className="text-xs text-slate-600 mt-2 text-center max-w-20">{stage.stage}</span>
                </div>
                {index < activeJourney.length - 1 && (
                  <ArrowRight className="text-slate-300 mx-2 flex-shrink-0" size={20} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Detailed Stages */}
        <div className="space-y-4">
          {activeJourney.map((stage) => {
            const Icon = stage.icon;
            const isExpanded = expandedStage === stage.id;
            
            return (
              <div
                key={stage.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden transition-all"
              >
                {/* Stage Header - Always Visible */}
                <button
                  onClick={() => toggleExpand(stage.id)}
                  className="w-full p-5 flex items-center justify-between hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center">
                      <Icon size={24} />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-slate-800">{stage.stage}</h3>
                      <p className="text-sm text-slate-500">{stage.timing}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      stage.emotionalState.includes('anxious') || stage.emotionalState.includes('Varies')
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {stage.emotionalState}
                    </span>
                    {isExpanded ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
                  </div>
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-slate-100">
                    <div className="grid md:grid-cols-2 gap-6 mt-5">
                      {/* Left Column */}
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <CheckCircle size={16} className="text-teal-600" />
                            Touchpoints
                          </h4>
                          <ul className="space-y-1">
                            {stage.touchpoints.map((tp, i) => (
                              <li key={i} className="text-sm text-slate-600 pl-4">• {tp}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                            <Brain size={16} className="text-teal-600" />
                            {activeView === 'patient' ? 'Data Collected' : 'Data Provided'}
                          </h4>
                          <ul className="space-y-1">
                            {(stage.dataCollected || stage.dataProvided).map((d, i) => (
                              <li key={i} className="text-sm text-slate-600 pl-4">• {d}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold text-slate-700 mb-2">User Experience</h4>
                          <p className="text-sm text-slate-600">{stage.userExperience}</p>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-slate-700 mb-2">System Action</h4>
                          <p className="text-sm text-slate-600">{stage.systemAction}</p>
                        </div>

                        <div className="bg-slate-50 rounded-lg p-4">
                          <h4 className="text-sm font-semibold text-slate-700 mb-2">💡 Example</h4>
                          <p className="text-sm text-slate-600 italic">{stage.example}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Key Insight Box */}
        <div className="mt-8 bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl p-6 text-white">
          <h3 className="font-semibold text-lg mb-2">
            {activeView === 'patient' 
              ? '🎯 Patient Journey Insight' 
              : '🎯 Clinician Workflow Insight'}
          </h3>
          <p className="text-teal-50">
            {activeView === 'patient'
              ? 'The key innovation is continuous monitoring between sessions. Traditional care only sees patients at scheduled appointments — this system captures behavioral signals 24/7, enabling 5-7 day early warning before crises emerge. Patients feel cared for even when not in session.'
              : 'The shift is from reactive to proactive care. Instead of reviewing cases FCFS from a shared inbox, clinicians start each day knowing exactly which patients need attention. The "why this patient?" explanations build trust in the AI while maintaining clinician authority.'}
          </p>
        </div>

        {/* Data Flow Callout */}
        <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-semibold text-slate-800 mb-4">How Data Flows Between Journeys</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
            <div className="bg-blue-50 rounded-lg p-4 flex-1">
              <User className="mx-auto text-blue-600 mb-2" size={24} />
              <p className="text-sm font-medium text-blue-800">Patient Inputs</p>
              <p className="text-xs text-blue-600">Screeners, chat, sessions</p>
            </div>
            <ArrowRight className="text-slate-300 rotate-90 md:rotate-0" size={24} />
            <div className="bg-purple-50 rounded-lg p-4 flex-1">
              <Brain className="mx-auto text-purple-600 mb-2" size={24} />
              <p className="text-sm font-medium text-purple-800">Risk Engine</p>
              <p className="text-xs text-purple-600">Daily 0-100 score</p>
            </div>
            <ArrowRight className="text-slate-300 rotate-90 md:rotate-0" size={24} />
            <div className="bg-green-50 rounded-lg p-4 flex-1">
              <Stethoscope className="mx-auto text-green-600 mb-2" size={24} />
              <p className="text-sm font-medium text-green-800">Clinician Action</p>
              <p className="text-xs text-green-600">Prioritized worklist</p>
            </div>
            <ArrowRight className="text-slate-300 rotate-90 md:rotate-0" size={24} />
            <div className="bg-teal-50 rounded-lg p-4 flex-1">
              <CheckCircle className="mx-auto text-teal-600 mb-2" size={24} />
              <p className="text-sm font-medium text-teal-800">Outcome</p>
              <p className="text-xs text-teal-600">Proactive intervention</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
