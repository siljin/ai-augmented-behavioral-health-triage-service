import React, { useState } from 'react';
import { 
  User, 
  Stethoscope, 
  Building2, 
  DollarSign,
  Target,
  Zap,
  Heart,
  TrendingUp,
  Clock,
  Shield,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Lightbulb
} from 'lucide-react';

export default function JobsToBeDone() {
  const [activeStakeholder, setActiveStakeholder] = useState('patient');

  const stakeholders = {
    patient: {
      id: 'patient',
      name: 'Patient',
      icon: User,
      color: '#3B82F6',
      description: 'Individuals seeking behavioral health treatment through the virtual clinic',
      context: 'Patients interact with the system through intake forms, the 24/7 chatbot, and therapy sessions. They may not be aware of the AI risk scoring happening behind the scenes.',
      jobs: [
        {
          category: 'functional',
          title: 'Get help when I need it, not just at scheduled appointments',
          importance: 'critical',
          currentSolution: 'Call crisis hotline, wait for next appointment, or go to ER',
          ourSolution: '24/7 chatbot with coping exercises, mood logging, and auto-escalation',
          outcome: 'Feel supported between sessions, crisis de-escalation without ER visit',
          metrics: ['73% daily chatbot engagement', '12% auto-escalate to human', '0 ER visits attributed to gaps in care']
        },
        {
          category: 'functional',
          title: 'Get matched to the right therapist quickly',
          importance: 'high',
          currentSolution: 'Phone tag with intake coordinator, wait days for callback',
          ourSolution: 'Smart matching by acuity + license + specialty, self-service booking',
          outcome: 'First appointment within 48 hours with appropriate provider',
          metrics: ['2.1 days avg time-to-first-appointment', '89% first-match satisfaction']
        },
        {
          category: 'functional',
          title: 'Track my progress over time',
          importance: 'medium',
          currentSolution: 'Rely on memory, occasional PHQ-9 at appointments',
          ourSolution: 'Continuous mood logging, visible trends in patient portal',
          outcome: 'See improvement trajectory, feel motivated to continue',
          metrics: ['4.2x more data points than traditional care', '68% report feeling more in control']
        },
        {
          category: 'emotional',
          title: 'Feel cared for even when not in session',
          importance: 'critical',
          currentSolution: 'Nothing — patients are invisible between appointments',
          ourSolution: 'Proactive outreach when risk rises, chatbot check-ins',
          outcome: 'Surprised and grateful when clinician reaches out proactively',
          metrics: ['92% positive response to proactive outreach', 'NPS +47 vs. traditional care']
        },
        {
          category: 'emotional',
          title: 'Not feel like a burden when I\'m struggling',
          importance: 'high',
          currentSolution: 'Hesitate to reach out, wait until crisis',
          ourSolution: 'Chatbot normalizes check-ins, system detects struggles passively',
          outcome: 'Help arrives without patient having to ask',
          metrics: ['5.2 days early detection', '34% reduction in patient-initiated crisis calls']
        },
        {
          category: 'social',
          title: 'Keep my struggles private from family/employer',
          importance: 'high',
          currentSolution: 'Avoid care, use generic wellness apps',
          ourSolution: 'HIPAA-compliant platform, discreet notifications, private chatbot',
          outcome: 'Get real help without stigma exposure',
          metrics: ['100% HIPAA compliant', 'No employer data sharing']
        }
      ],
      gains: [
        'Faster access to care',
        'Feeling heard between sessions',
        'Visible progress tracking',
        'Proactive support during hard times'
      ],
      pains: [
        'Long waits for appointments',
        'Feeling forgotten between sessions',
        'Having to reach out when already struggling',
        'Repeating my story to every new provider'
      ]
    },
    clinician: {
      id: 'clinician',
      name: 'Clinician',
      icon: Stethoscope,
      color: '#10B981',
      description: 'Therapists, psychologists, and psychiatrists delivering care through the platform',
      context: 'Clinicians are the primary users of the dashboard, worklist, and alert system. They need to trust the AI while maintaining clinical authority.',
      jobs: [
        {
          category: 'functional',
          title: 'Know which patients need my attention today',
          importance: 'critical',
          currentSolution: 'Check shared inbox FCFS, rely on gut feeling',
          ourSolution: 'Risk-prioritized worklist with "why this patient?" explanations',
          outcome: 'Start each day with clear priorities, no patients fall through cracks',
          metrics: ['91% daily login rate', '100% high-risk patients reviewed within 24h']
        },
        {
          category: 'functional',
          title: 'Prepare for sessions without chart hunting',
          importance: 'high',
          currentSolution: 'Open 5+ tabs, search through notes, piece together history',
          ourSolution: 'One-click longitudinal profile with chatbot summary, risk drivers, trends',
          outcome: 'Walk into every session informed and prepared',
          metrics: ['3.2 min avg prep time (down from 12 min)', '94% feel "well-prepared"']
        },
        {
          category: 'functional',
          title: 'Intervene before patients reach crisis',
          importance: 'critical',
          currentSolution: 'React when patient calls in crisis or no-shows',
          ourSolution: '"Act Now" alerts with 5-7 day early warning',
          outcome: 'Prevent crises instead of managing them',
          metrics: ['5.2 days avg early warning', '3.2 crises averted per clinic per month']
        },
        {
          category: 'functional',
          title: 'Document sessions efficiently',
          importance: 'medium',
          currentSolution: 'Type notes after session, often incomplete',
          ourSolution: 'Auto-generated session summaries with key themes (with consent)',
          outcome: 'Complete, accurate notes without extra work',
          metrics: ['67% reduction in documentation time', '89% accuracy on key themes']
        },
        {
          category: 'emotional',
          title: 'Feel supported by technology, not replaced',
          importance: 'critical',
          currentSolution: 'Fear of AI taking over clinical judgment',
          ourSolution: 'Transparent scoring, clinician override, "decision support" positioning',
          outcome: 'Trust the AI as a tool that augments expertise',
          metrics: ['4.5/5 clinician satisfaction', '78% say "AI makes me more effective"']
        },
        {
          category: 'emotional',
          title: 'Reduce burnout from crisis management',
          importance: 'high',
          currentSolution: 'Constant fire drills, emotional exhaustion',
          ourSolution: 'Proactive system reduces surprise crises, manageable alert volume',
          outcome: 'More sustainable practice, better work-life balance',
          metrics: ['25% reduction in after-hours crisis calls', '18% improvement in burnout scores']
        },
        {
          category: 'social',
          title: 'Demonstrate my impact to justify my role',
          importance: 'medium',
          currentSolution: 'Anecdotal evidence, no data',
          ourSolution: 'Personal outcomes dashboard showing crises averted, improvement rates',
          outcome: 'Concrete proof of value for reviews, contracts, personal satisfaction',
          metrics: ['Per-clinician outcome tracking', 'Exportable impact reports']
        }
      ],
      gains: [
        'Clear daily priorities',
        'More time with patients, less admin',
        'Proactive instead of reactive care',
        'Proof of clinical impact'
      ],
      pains: [
        'Patients falling through the cracks',
        'Surprise crises overwhelming schedule',
        'Too much time on documentation',
        'No visibility into patient status between sessions'
      ]
    },
    admin: {
      id: 'admin',
      name: 'Clinic Admin',
      icon: Building2,
      color: '#F59E0B',
      description: 'Operations leaders, practice managers, and clinical directors running the virtual clinic',
      context: 'Admins care about operational efficiency, clinician retention, payer relationships, and overall clinic performance. They need aggregate views, not individual patient data.',
      jobs: [
        {
          category: 'functional',
          title: 'Reduce no-show rates that drain revenue',
          importance: 'critical',
          currentSolution: 'Reminder calls, overbooking, hope for the best',
          ourSolution: 'Predictive no-show risk, proactive outreach, smart rescheduling',
          outcome: '10pt reduction in no-show rate = $500K+ recovered revenue',
          metrics: ['20% no-show rate (vs. 30% industry)', '$127K avg annual savings per 100 providers']
        },
        {
          category: 'functional',
          title: 'Prove outcomes to win and renew payer contracts',
          importance: 'critical',
          currentSolution: 'Manual data pulls, incomplete metrics, anecdotes',
          ourSolution: 'Automated outcomes reports: PHQ-9 trends, crisis rates, engagement',
          outcome: 'Data-driven payer negotiations, premium rates for proven outcomes',
          metrics: ['4 payer integrations live', '12% avg rate increase in renewals']
        },
        {
          category: 'functional',
          title: 'Optimize clinician utilization and prevent burnout',
          importance: 'high',
          currentSolution: 'Equal caseloads regardless of complexity',
          ourSolution: 'Panel health scores, workload balancing by risk-adjusted caseload',
          outcome: 'Right patients to right clinicians, sustainable workloads',
          metrics: ['Risk-adjusted caseload balancing', '18% improvement in clinician retention']
        },
        {
          category: 'functional',
          title: 'Standardize triage quality across staff',
          importance: 'high',
          currentSolution: 'Variable quality depending on who answers the phone',
          ourSolution: 'Algorithmic triage with consistent acuity scoring',
          outcome: 'Every patient gets appropriate urgency assessment',
          metrics: ['94% triage consistency score', 'Zero high-risk patients mis-routed']
        },
        {
          category: 'emotional',
          title: 'Sleep at night knowing high-risk patients are visible',
          importance: 'critical',
          currentSolution: 'Worry about liability, unknown risks in the patient population',
          ourSolution: 'Real-time risk visibility, escalation protocols, audit trail',
          outcome: 'Confidence that nothing is slipping through the cracks',
          metrics: ['100% high-risk visibility', 'Complete intervention audit log']
        },
        {
          category: 'social',
          title: 'Position clinic as innovative leader to attract talent',
          importance: 'medium',
          currentSolution: 'Compete on salary alone',
          ourSolution: 'Modern tech stack, AI-augmented practice, less burnout',
          outcome: 'Attract top clinicians who want to work with best tools',
          metrics: ['2.3x increase in clinician applications', '"Best-in-class tools" cited in 67% of interviews']
        }
      ],
      gains: [
        'Recovered revenue from reduced no-shows',
        'Stronger payer relationships',
        'Lower clinician turnover',
        'Defensible risk management'
      ],
      pains: [
        '30% no-show rates eating revenue',
        'Payers demanding outcomes data we don\'t have',
        'Clinician burnout and turnover',
        'Liability exposure from missed high-risk patients'
      ]
    },
    payer: {
      id: 'payer',
      name: 'Payer',
      icon: DollarSign,
      color: '#8B5CF6',
      description: 'Insurance companies and self-insured employers covering behavioral health benefits',
      context: 'Payers want to reduce total cost of care while improving member outcomes. They\'re increasingly demanding outcomes data and value-based contracts.',
      jobs: [
        {
          category: 'functional',
          title: 'Reduce total cost of behavioral health care',
          importance: 'critical',
          currentSolution: 'Pay for volume, hope for efficiency',
          ourSolution: 'Proactive care prevents expensive crisis interventions (ER, inpatient)',
          outcome: 'Lower per-member-per-month cost with better outcomes',
          metrics: ['$1,200 avg savings per crisis averted', '23% reduction in ER utilization for BH']
        },
        {
          category: 'functional',
          title: 'Get outcomes data to justify behavioral health spend',
          importance: 'critical',
          currentSolution: 'Claims data only — no clinical outcomes visibility',
          ourSolution: 'Real-time PHQ-9/GAD-7 trends, engagement metrics, crisis rates',
          outcome: 'Prove ROI of behavioral health investment to CFO',
          metrics: ['Automated monthly outcomes reports', 'Per-cohort outcome tracking']
        },
        {
          category: 'functional',
          title: 'Identify high-risk members before they become high-cost',
          importance: 'high',
          currentSolution: 'Retrospective claims analysis, too late to intervene',
          ourSolution: 'Real-time risk scores enable proactive care management',
          outcome: 'Intervene early, prevent costly downstream events',
          metrics: ['5-7 day early warning', '34% reduction in inpatient admits']
        },
        {
          category: 'functional',
          title: 'Ensure network adequacy and access standards',
          importance: 'high',
          currentSolution: 'Track appointment availability, slow feedback loop',
          ourSolution: 'Real-time access metrics: time-to-appointment, utilization',
          outcome: 'Meet regulatory requirements, improve member satisfaction',
          metrics: ['2.1 days avg time-to-first-appointment', '98% within access standards']
        },
        {
          category: 'emotional',
          title: 'Confidence that contracted clinics deliver quality care',
          importance: 'high',
          currentSolution: 'Trust clinic self-reporting, occasional audits',
          ourSolution: 'Continuous quality metrics, standardized triage, outcome tracking',
          outcome: 'Verified quality without manual audits',
          metrics: ['Real-time quality dashboard', 'Automated compliance reporting']
        },
        {
          category: 'social',
          title: 'Offer differentiated behavioral health benefits',
          importance: 'medium',
          currentSolution: 'Same EAP/telehealth as every other payer',
          ourSolution: 'Partner with AI-augmented clinics for premium offering',
          outcome: 'Win employer contracts with better BH benefits',
          metrics: ['3 employer contracts citing AI triage as differentiator']
        }
      ],
      gains: [
        'Lower total cost of care',
        'Outcomes data for ROI proof',
        'Early identification of high-risk members',
        'Differentiated benefits offering'
      ],
      pains: [
        'Behavioral health costs rising faster than medical',
        'No visibility into clinical outcomes',
        'High-cost crisis events (ER, inpatient)',
        'Employer pressure to improve BH benefits'
      ]
    }
  };

  const activeData = stakeholders[activeStakeholder];
  const StakeholderIcon = activeData.icon;

  const categoryLabels = {
    functional: { label: 'Functional Jobs', icon: Target, description: 'Tasks they need to accomplish' },
    emotional: { label: 'Emotional Jobs', icon: Heart, description: 'How they want to feel' },
    social: { label: 'Social Jobs', icon: User, description: 'How they want to be perceived' }
  };

  const importanceColors = {
    critical: { bg: 'bg-red-100', text: 'text-red-700', label: 'Critical' },
    high: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'High' },
    medium: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Medium' }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Jobs-to-be-Done Analysis</h1>
          <p className="text-slate-600">Understanding what each stakeholder is trying to accomplish</p>
        </div>

        {/* Stakeholder Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          {Object.values(stakeholders).map((stakeholder) => {
            const Icon = stakeholder.icon;
            const isActive = activeStakeholder === stakeholder.id;
            return (
              <button
                key={stakeholder.id}
                onClick={() => setActiveStakeholder(stakeholder.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                  isActive 
                    ? 'text-white shadow-lg' 
                    : 'bg-white text-slate-600 hover:bg-slate-50 shadow-sm'
                }`}
                style={{
                  backgroundColor: isActive ? stakeholder.color : undefined
                }}
              >
                <Icon size={20} />
                {stakeholder.name}
              </button>
            );
          })}
        </div>

        {/* Stakeholder Overview */}
        <div 
          className="rounded-2xl p-6 text-white mb-8"
          style={{ backgroundColor: activeData.color }}
        >
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <StakeholderIcon size={28} />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">{activeData.name}</h2>
              <p className="text-white/80">{activeData.description}</p>
            </div>
          </div>
          <p className="mt-4 text-white/90 text-sm">{activeData.context}</p>
        </div>

        {/* Gains & Pains Summary */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-2">
              <TrendingUp size={20} />
              Gains (What they want)
            </h3>
            <ul className="space-y-2">
              {activeData.gains.map((gain, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-700">
                  <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                  {gain}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-red-700 mb-4 flex items-center gap-2">
              <AlertTriangle size={20} />
              Pains (What they avoid)
            </h3>
            <ul className="space-y-2">
              {activeData.pains.map((pain, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-700">
                  <AlertTriangle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
                  {pain}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Jobs by Category */}
        {['functional', 'emotional', 'social'].map((category) => {
          const categoryInfo = categoryLabels[category];
          const CategoryIcon = categoryInfo.icon;
          const jobsInCategory = activeData.jobs.filter(j => j.category === category);
          
          if (jobsInCategory.length === 0) return null;
          
          return (
            <div key={category} className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${activeData.color}15`, color: activeData.color }}
                >
                  <CategoryIcon size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">{categoryInfo.label}</h3>
                  <p className="text-sm text-slate-500">{categoryInfo.description}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {jobsInCategory.map((job, i) => {
                  const importance = importanceColors[job.importance];
                  return (
                    <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
                      {/* Job Header */}
                      <div className="p-5 border-b border-slate-100">
                        <div className="flex items-start justify-between gap-4">
                          <h4 className="text-lg font-semibold text-slate-800 flex-1">
                            "{job.title}"
                          </h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${importance.bg} ${importance.text}`}>
                            {importance.label}
                          </span>
                        </div>
                      </div>
                      
                      {/* Job Details */}
                      <div className="p-5">
                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Current vs Our Solution */}
                          <div className="space-y-4">
                            <div>
                              <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-2">
                                <Clock size={14} />
                                Current Solution
                              </div>
                              <p className="text-slate-600 text-sm bg-slate-50 rounded-lg p-3">
                                {job.currentSolution}
                              </p>
                            </div>
                            <div className="flex justify-center">
                              <ArrowRight size={20} className="text-slate-300" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: activeData.color }}>
                                <Zap size={14} />
                                Our Solution
                              </div>
                              <p 
                                className="text-sm rounded-lg p-3"
                                style={{ backgroundColor: `${activeData.color}10`, color: activeData.color }}
                              >
                                {job.ourSolution}
                              </p>
                            </div>
                          </div>
                          
                          {/* Outcome & Metrics */}
                          <div className="space-y-4">
                            <div>
                              <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-2">
                                <Lightbulb size={14} />
                                Desired Outcome
                              </div>
                              <p className="text-slate-700 text-sm">
                                {job.outcome}
                              </p>
                            </div>
                            <div>
                              <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-2">
                                <Shield size={14} />
                                Success Metrics
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {job.metrics.map((metric, j) => (
                                  <span 
                                    key={j} 
                                    className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-600"
                                  >
                                    {metric}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Value Proposition Summary */}
        <div 
          className="rounded-2xl p-6 text-white"
          style={{ backgroundColor: activeData.color }}
        >
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <Target size={20} />
            Value Proposition for {activeData.name}s
          </h3>
          <p className="text-white/90">
            {activeStakeholder === 'patient' && 
              'Feel supported 24/7, not just during appointments. Get matched to the right provider fast. Know that someone is watching out for you even when you can\'t ask for help.'}
            {activeStakeholder === 'clinician' && 
              'Start every day knowing exactly who needs you. Spend time on care, not chart hunting. Prevent crises instead of reacting to them. Trust the AI as a partner, not a replacement.'}
            {activeStakeholder === 'admin' && 
              'Recover $500K+ in no-show revenue. Win payer contracts with outcomes data. Reduce clinician burnout and turnover. Sleep at night knowing high-risk patients are visible.'}
            {activeStakeholder === 'payer' && 
              'Lower total cost of care through crisis prevention. Get outcomes data you\'ve never had before. Identify high-risk members before they become high-cost. Differentiate your BH benefits.'}
          </p>
        </div>
      </div>
    </div>
  );
}
