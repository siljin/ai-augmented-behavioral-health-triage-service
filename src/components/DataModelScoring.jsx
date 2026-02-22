import React, { useState, useMemo } from 'react';
import { 
  Database,
  Brain,
  MessageSquare,
  Mic,
  FileText,
  Activity,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
  Sliders,
  Info,
  ChevronRight,
  BarChart3,
  Zap,
  Shield,
  Clock,
  RefreshCw
} from 'lucide-react';

export default function DataModelScoring() {
  const [activeTab, setActiveTab] = useState('signals');
  const [selectedSignal, setSelectedSignal] = useState(null);
  const [simulatedWeights, setSimulatedWeights] = useState({
    phq9: 25,
    gad7: 15,
    sentiment: 20,
    latency: 15,
    engagement: 10,
    keywords: 10,
    noShow: 5
  });

  // Signal Categories
  const signalCategories = {
    clinical: {
      name: 'Clinical Assessments',
      icon: FileText,
      color: '#3B82F6',
      description: 'Validated screening instruments administered at intake and periodically',
      signals: [
        {
          id: 'phq9',
          name: 'PHQ-9 Score',
          description: 'Patient Health Questionnaire for depression screening',
          range: '0-27',
          frequency: 'Intake + every 2 weeks',
          normalization: 'score / 27 × 100',
          riskMapping: [
            { range: '0-4', level: 'Minimal', contribution: '0-15' },
            { range: '5-9', level: 'Mild', contribution: '15-35' },
            { range: '10-14', level: 'Moderate', contribution: '35-55' },
            { range: '15-19', level: 'Moderately Severe', contribution: '55-75' },
            { range: '20-27', level: 'Severe', contribution: '75-100' }
          ],
          example: 'PHQ-9 = 18 → normalized = 67 → weighted contribution = 67 × 0.25 = 16.75 pts'
        },
        {
          id: 'gad7',
          name: 'GAD-7 Score',
          description: 'Generalized Anxiety Disorder 7-item scale',
          range: '0-21',
          frequency: 'Intake + every 2 weeks',
          normalization: 'score / 21 × 100',
          riskMapping: [
            { range: '0-4', level: 'Minimal', contribution: '0-19' },
            { range: '5-9', level: 'Mild', contribution: '19-43' },
            { range: '10-14', level: 'Moderate', contribution: '43-67' },
            { range: '15-21', level: 'Severe', contribution: '67-100' }
          ],
          example: 'GAD-7 = 12 → normalized = 57 → weighted contribution = 57 × 0.15 = 8.55 pts'
        }
      ]
    },
    behavioral: {
      name: 'Behavioral Signals',
      icon: Activity,
      color: '#8B5CF6',
      description: 'Passive signals captured from chatbot interactions',
      signals: [
        {
          id: 'sentiment',
          name: 'Sentiment Velocity',
          description: 'Rate of change in message sentiment over 7 days',
          range: '-1 to +1 (velocity)',
          frequency: 'Calculated daily',
          normalization: '(velocity + 1) / 2 × 100, inverted',
          riskMapping: [
            { range: '+0.3 to +1', level: 'Improving', contribution: '0-20' },
            { range: '-0.3 to +0.3', level: 'Stable', contribution: '20-50' },
            { range: '-0.7 to -0.3', level: 'Declining', contribution: '50-75' },
            { range: '-1 to -0.7', level: 'Rapid Decline', contribution: '75-100' }
          ],
          example: 'Sentiment dropped from +0.4 to -0.2 in 7 days → velocity = -0.086/day → contribution = 62 × 0.20 = 12.4 pts'
        },
        {
          id: 'latency',
          name: 'Response Latency Z-Score',
          description: 'How much slower patient responds vs. their baseline',
          range: 'Z-score (-3 to +3)',
          frequency: 'Per message, aggregated daily',
          normalization: 'z-score capped at ±3, mapped to 0-100',
          riskMapping: [
            { range: 'z < 0', level: 'Faster than usual', contribution: '0-20' },
            { range: 'z = 0-1', level: 'Normal', contribution: '20-40' },
            { range: 'z = 1-2', level: 'Slower', contribution: '40-70' },
            { range: 'z > 2', level: 'Much slower', contribution: '70-100' }
          ],
          example: 'Baseline response: 3 min. Now: 45 min. Z-score = 2.4 → contribution = 80 × 0.15 = 12 pts'
        },
        {
          id: 'engagement',
          name: 'Engagement Decay',
          description: 'Drop in chatbot usage vs. 14-day rolling average',
          range: '0-100% decline',
          frequency: 'Calculated daily',
          normalization: 'Decay percentage directly',
          riskMapping: [
            { range: '0-20%', level: 'Normal variation', contribution: '0-25' },
            { range: '20-40%', level: 'Mild decline', contribution: '25-50' },
            { range: '40-60%', level: 'Significant decline', contribution: '50-75' },
            { range: '60-100%', level: 'Disengagement', contribution: '75-100' }
          ],
          example: 'Was chatting 5x/day, now 1x/day → 80% decay → contribution = 90 × 0.10 = 9 pts'
        },
        {
          id: 'keywords',
          name: 'Risk Keyword Detection',
          description: 'Presence and frequency of concerning language',
          range: '0-100 (keyword risk score)',
          frequency: 'Real-time per message',
          normalization: 'Weighted keyword count, capped at 100',
          riskMapping: [
            { range: 'No keywords', level: 'None detected', contribution: '0' },
            { range: 'Low-risk terms', level: 'Mild concern', contribution: '20-40' },
            { range: 'Medium-risk terms', level: 'Elevated concern', contribution: '40-70' },
            { range: 'High-risk terms', level: 'Immediate flag', contribution: '70-100' }
          ],
          example: '"Hopeless" detected 3x + "give up" 1x → keyword score = 65 → contribution = 65 × 0.10 = 6.5 pts',
          keywords: {
            high: ['suicide', 'kill myself', 'end it', 'no reason to live', 'better off dead'],
            medium: ['hopeless', 'worthless', 'give up', 'can\'t go on', 'nobody cares'],
            low: ['exhausted', 'overwhelmed', 'anxious', 'scared', 'alone']
          }
        }
      ]
    },
    operational: {
      name: 'Operational Signals',
      icon: Clock,
      color: '#F59E0B',
      description: 'Appointment and engagement patterns',
      signals: [
        {
          id: 'noShow',
          name: 'No-Show Probability',
          description: 'Predicted likelihood of missing next appointment',
          range: '0-100%',
          frequency: 'Updated daily',
          normalization: 'Probability directly',
          riskMapping: [
            { range: '0-15%', level: 'Likely to attend', contribution: '0-25' },
            { range: '15-30%', level: 'Some risk', contribution: '25-50' },
            { range: '30-50%', level: 'Elevated risk', contribution: '50-75' },
            { range: '50-100%', level: 'High risk', contribution: '75-100' }
          ],
          example: '2 prior no-shows + declining engagement → P(no-show) = 42% → contribution = 42 × 0.05 = 2.1 pts'
        }
      ]
    }
  };

  // Example patient for simulation
  const [examplePatient, setExamplePatient] = useState({
    phq9: 18,
    gad7: 12,
    sentiment: -0.4,
    latency: 2.1,
    engagement: 55,
    keywords: 45,
    noShow: 35
  });

  // Calculate risk score
  const calculateRiskScore = useMemo(() => {
    const normalize = {
      phq9: (examplePatient.phq9 / 27) * 100,
      gad7: (examplePatient.gad7 / 21) * 100,
      sentiment: ((examplePatient.sentiment * -1) + 1) / 2 * 100, // Invert: negative sentiment = higher risk
      latency: Math.min(100, (examplePatient.latency / 3) * 100),
      engagement: examplePatient.engagement,
      keywords: examplePatient.keywords,
      noShow: examplePatient.noShow
    };

    const contributions = {
      phq9: (normalize.phq9 * simulatedWeights.phq9) / 100,
      gad7: (normalize.gad7 * simulatedWeights.gad7) / 100,
      sentiment: (normalize.sentiment * simulatedWeights.sentiment) / 100,
      latency: (normalize.latency * simulatedWeights.latency) / 100,
      engagement: (normalize.engagement * simulatedWeights.engagement) / 100,
      keywords: (normalize.keywords * simulatedWeights.keywords) / 100,
      noShow: (normalize.noShow * simulatedWeights.noShow) / 100
    };

    const totalScore = Object.values(contributions).reduce((a, b) => a + b, 0);

    return { normalize, contributions, totalScore: Math.round(totalScore) };
  }, [examplePatient, simulatedWeights]);

  // Get top 3 drivers
  const topDrivers = useMemo(() => {
    return Object.entries(calculateRiskScore.contributions)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([key, value]) => ({
        signal: key,
        contribution: value,
        percentage: Math.round((value / calculateRiskScore.totalScore) * 100)
      }));
  }, [calculateRiskScore]);

  const signalLabels = {
    phq9: 'PHQ-9',
    gad7: 'GAD-7',
    sentiment: 'Sentiment',
    latency: 'Response Latency',
    engagement: 'Engagement Decay',
    keywords: 'Risk Keywords',
    noShow: 'No-Show Risk'
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Data Model & Scoring Logic</h1>
          <p className="text-slate-600">How behavioral signals become a 0-100 risk score</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-2 mb-8">
          {[
            { id: 'signals', label: 'Signal Taxonomy', icon: Database },
            { id: 'formula', label: 'Scoring Formula', icon: Brain },
            { id: 'simulator', label: 'Live Simulator', icon: Sliders }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-teal-600 text-white shadow-lg'
                    : 'bg-white text-slate-600 hover:bg-slate-50 shadow-sm'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Signal Taxonomy Tab */}
        {activeTab === 'signals' && (
          <div className="space-y-8">
            {Object.entries(signalCategories).map(([catKey, category]) => {
              const CatIcon = category.icon;
              return (
                <div key={catKey} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  {/* Category Header */}
                  <div 
                    className="p-6 text-white"
                    style={{ backgroundColor: category.color }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <CatIcon size={24} />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">{category.name}</h2>
                        <p className="text-white/80 text-sm">{category.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Signals */}
                  <div className="p-6">
                    <div className="grid gap-4">
                      {category.signals.map((signal) => (
                        <div 
                          key={signal.id}
                          className={`border rounded-xl p-5 cursor-pointer transition-all ${
                            selectedSignal === signal.id 
                              ? 'border-2 shadow-md' 
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                          style={{ borderColor: selectedSignal === signal.id ? category.color : undefined }}
                          onClick={() => setSelectedSignal(selectedSignal === signal.id ? null : signal.id)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-slate-800">{signal.name}</h3>
                                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                                  {signal.range}
                                </span>
                              </div>
                              <p className="text-sm text-slate-600">{signal.description}</p>
                            </div>
                            <ChevronRight 
                              size={20} 
                              className={`text-slate-400 transition-transform ${selectedSignal === signal.id ? 'rotate-90' : ''}`}
                            />
                          </div>

                          {selectedSignal === signal.id && (
                            <div className="mt-4 pt-4 border-t border-slate-100 space-y-4">
                              {/* Metadata */}
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-xs font-semibold text-slate-500 mb-1">FREQUENCY</p>
                                  <p className="text-sm text-slate-700">{signal.frequency}</p>
                                </div>
                                <div>
                                  <p className="text-xs font-semibold text-slate-500 mb-1">NORMALIZATION</p>
                                  <code className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-700">
                                    {signal.normalization}
                                  </code>
                                </div>
                              </div>

                              {/* Risk Mapping Table */}
                              <div>
                                <p className="text-xs font-semibold text-slate-500 mb-2">RISK MAPPING</p>
                                <div className="grid grid-cols-4 gap-2">
                                  {signal.riskMapping.map((mapping, i) => (
                                    <div 
                                      key={i}
                                      className="text-center p-2 rounded-lg"
                                      style={{ 
                                        backgroundColor: `${category.color}${15 + i * 10}`,
                                      }}
                                    >
                                      <p className="text-xs font-medium text-slate-700">{mapping.range}</p>
                                      <p className="text-xs text-slate-500">{mapping.level}</p>
                                      <p className="text-xs font-semibold mt-1" style={{ color: category.color }}>
                                        → {mapping.contribution}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Example */}
                              <div className="bg-amber-50 rounded-lg p-3">
                                <p className="text-xs font-semibold text-amber-700 mb-1">💡 EXAMPLE</p>
                                <p className="text-sm text-amber-800">{signal.example}</p>
                              </div>

                              {/* Keywords list if applicable */}
                              {signal.keywords && (
                                <div>
                                  <p className="text-xs font-semibold text-slate-500 mb-2">KEYWORD TIERS</p>
                                  <div className="space-y-2">
                                    <div className="flex items-start gap-2">
                                      <span className="text-xs px-2 py-0.5 rounded bg-red-100 text-red-700">HIGH</span>
                                      <p className="text-xs text-slate-600">{signal.keywords.high.join(', ')}</p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                      <span className="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-700">MED</span>
                                      <p className="text-xs text-slate-600">{signal.keywords.medium.join(', ')}</p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                      <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-700">LOW</span>
                                      <p className="text-xs text-slate-600">{signal.keywords.low.join(', ')}</p>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Scoring Formula Tab */}
        {activeTab === 'formula' && (
          <div className="space-y-6">
            {/* Formula Overview */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl p-6 text-white">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Brain size={24} />
                Transparent Weighted Scoring
              </h2>
              <p className="text-purple-100 mb-6">
                Unlike black-box ML models, our risk engine uses explainable weighted scoring. 
                Each signal contributes a known amount to the final score.
              </p>
              
              {/* Formula */}
              <div className="bg-white/10 rounded-xl p-6 font-mono text-sm">
                <p className="text-purple-200 mb-3">// Master Risk Score Formula</p>
                <p className="text-white">
                  risk_score = Σ (normalized_signal<sub>i</sub> × weight<sub>i</sub>)
                </p>
                <div className="mt-4 pt-4 border-t border-white/20 space-y-2">
                  <p className="text-purple-200">// Expanded:</p>
                  <p className="text-white leading-relaxed">
                    risk_score = <br />
                    <span className="ml-4">phq9_norm × 0.25 +</span><br />
                    <span className="ml-4">gad7_norm × 0.15 +</span><br />
                    <span className="ml-4">sentiment_velocity × 0.20 +</span><br />
                    <span className="ml-4">latency_zscore × 0.15 +</span><br />
                    <span className="ml-4">engagement_decay × 0.10 +</span><br />
                    <span className="ml-4">keyword_score × 0.10 +</span><br />
                    <span className="ml-4">noshow_prob × 0.05</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Weight Breakdown */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Default Weight Distribution</h3>
              <div className="space-y-3">
                {[
                  { signal: 'PHQ-9 Score', weight: 25, color: '#3B82F6', rationale: 'Validated clinical measure, strong predictor' },
                  { signal: 'Sentiment Velocity', weight: 20, color: '#8B5CF6', rationale: 'Early warning of deterioration' },
                  { signal: 'GAD-7 Score', weight: 15, color: '#3B82F6', rationale: 'Anxiety comorbidity indicator' },
                  { signal: 'Response Latency', weight: 15, color: '#8B5CF6', rationale: 'Behavioral withdrawal signal' },
                  { signal: 'Engagement Decay', weight: 10, color: '#8B5CF6', rationale: 'Dropout risk predictor' },
                  { signal: 'Risk Keywords', weight: 10, color: '#8B5CF6', rationale: 'Explicit crisis indicators' },
                  { signal: 'No-Show Probability', weight: 5, color: '#F59E0B', rationale: 'Treatment disengagement' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-32 text-sm font-medium text-slate-700">{item.signal}</div>
                    <div className="flex-1">
                      <div className="h-6 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full flex items-center justify-end pr-2"
                          style={{ width: `${item.weight * 4}%`, backgroundColor: item.color }}
                        >
                          <span className="text-xs font-bold text-white">{item.weight}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-48 text-xs text-slate-500">{item.rationale}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Normalization Process */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Normalization Pipeline</h3>
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { step: 1, title: 'Raw Input', desc: 'PHQ-9 = 18', icon: Database },
                  { step: 2, title: 'Scale to 0-100', desc: '18/27 × 100 = 66.7', icon: RefreshCw },
                  { step: 3, title: 'Apply Weight', desc: '66.7 × 0.25 = 16.7', icon: Sliders },
                  { step: 4, title: 'Contribution', desc: '+16.7 pts to score', icon: TrendingUp }
                ].map((step) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.step} className="text-center p-4 bg-slate-50 rounded-xl">
                      <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Icon size={20} className="text-teal-600" />
                      </div>
                      <p className="text-xs text-slate-500 mb-1">Step {step.step}</p>
                      <p className="font-semibold text-slate-800 text-sm">{step.title}</p>
                      <code className="text-xs text-teal-600">{step.desc}</code>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Thresholds & Alerts */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Alert Thresholds</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="border-2 border-red-200 bg-red-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="text-red-600" size={20} />
                    <span className="font-bold text-red-700">ACT NOW</span>
                  </div>
                  <p className="text-3xl font-bold text-red-600 mb-1">≥ 80</p>
                  <p className="text-sm text-red-700">Immediate clinician alert</p>
                  <p className="text-xs text-red-600 mt-2">Push notification + SMS</p>
                </div>
                <div className="border-2 border-amber-200 bg-amber-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="text-amber-600" size={20} />
                    <span className="font-bold text-amber-700">WATCH</span>
                  </div>
                  <p className="text-3xl font-bold text-amber-600 mb-1">60-79</p>
                  <p className="text-sm text-amber-700">Elevated monitoring</p>
                  <p className="text-xs text-amber-600 mt-2">Dashboard priority + daily digest</p>
                </div>
                <div className="border-2 border-green-200 bg-green-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="text-green-600" size={20} />
                    <span className="font-bold text-green-700">STABLE</span>
                  </div>
                  <p className="text-3xl font-bold text-green-600 mb-1">&lt; 60</p>
                  <p className="text-sm text-green-700">Routine monitoring</p>
                  <p className="text-xs text-green-600 mt-2">Standard worklist position</p>
                </div>
              </div>

              {/* Velocity Alert */}
              <div className="mt-4 p-4 bg-purple-50 border-2 border-purple-200 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="text-purple-600" size={20} />
                  <span className="font-bold text-purple-700">VELOCITY ALERT</span>
                </div>
                <p className="text-sm text-purple-700">
                  Triggered when score increases <strong>&gt;15 points in 24 hours</strong>, regardless of absolute level.
                </p>
                <p className="text-xs text-purple-600 mt-1">
                  Example: Score 45 → 62 = velocity alert even though still in "Watch" range
                </p>
              </div>
            </div>

            {/* Clinician Override */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Clinician Override Protocol</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-slate-600 text-sm mb-4">
                    Clinicians can adjust any patient's risk score up or down with documented reasoning. 
                    This maintains clinical authority while training the model.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="text-red-500" size={16} />
                      <span className="text-slate-700"><strong>Increase:</strong> "Patient reported SI in session not captured by chatbot"</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingDown className="text-green-500" size={16} />
                      <span className="text-slate-700"><strong>Decrease:</strong> "Low latency due to vacation, not withdrawal"</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Minus className="text-slate-500" size={16} />
                      <span className="text-slate-700"><strong>Lock:</strong> "Maintain current score for 7 days"</span>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-xl p-4">
                  <p className="text-xs font-semibold text-slate-500 mb-2">OVERRIDE AUDIT TRAIL</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Overrides logged</span>
                      <span className="text-slate-800 font-medium">100%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Avg. overrides/clinician/week</span>
                      <span className="text-slate-800 font-medium">2.3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Overrides that improved prediction</span>
                      <span className="text-slate-800 font-medium">67%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Fed back to model training</span>
                      <span className="text-teal-600 font-medium">Yes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Live Simulator Tab */}
        {activeTab === 'simulator' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Risk Score Simulator</h3>
              <p className="text-slate-600 text-sm mb-6">
                Adjust patient signals to see how the risk score changes in real-time
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Input Sliders */}
                <div className="space-y-5">
                  <h4 className="font-semibold text-slate-700 text-sm uppercase tracking-wide">Patient Signals</h4>
                  
                  {/* PHQ-9 */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-sm font-medium text-slate-700">PHQ-9 Score</label>
                      <span className="text-sm font-bold text-blue-600">{examplePatient.phq9}/27</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="27"
                      value={examplePatient.phq9}
                      onChange={(e) => setExamplePatient({...examplePatient, phq9: parseInt(e.target.value)})}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                      <span>Minimal</span>
                      <span>Severe</span>
                    </div>
                  </div>

                  {/* GAD-7 */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-sm font-medium text-slate-700">GAD-7 Score</label>
                      <span className="text-sm font-bold text-blue-600">{examplePatient.gad7}/21</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="21"
                      value={examplePatient.gad7}
                      onChange={(e) => setExamplePatient({...examplePatient, gad7: parseInt(e.target.value)})}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>

                  {/* Sentiment */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-sm font-medium text-slate-700">Sentiment Velocity (7-day)</label>
                      <span className="text-sm font-bold text-purple-600">{examplePatient.sentiment.toFixed(2)}</span>
                    </div>
                    <input
                      type="range"
                      min="-100"
                      max="100"
                      value={examplePatient.sentiment * 100}
                      onChange={(e) => setExamplePatient({...examplePatient, sentiment: parseInt(e.target.value) / 100})}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                      <span>Declining ↓</span>
                      <span>Stable</span>
                      <span>Improving ↑</span>
                    </div>
                  </div>

                  {/* Latency */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-sm font-medium text-slate-700">Response Latency Z-Score</label>
                      <span className="text-sm font-bold text-purple-600">{examplePatient.latency.toFixed(1)}σ</span>
                    </div>
                    <input
                      type="range"
                      min="-30"
                      max="30"
                      value={examplePatient.latency * 10}
                      onChange={(e) => setExamplePatient({...examplePatient, latency: parseInt(e.target.value) / 10})}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                  </div>

                  {/* Engagement */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-sm font-medium text-slate-700">Engagement Decay</label>
                      <span className="text-sm font-bold text-purple-600">{examplePatient.engagement}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={examplePatient.engagement}
                      onChange={(e) => setExamplePatient({...examplePatient, engagement: parseInt(e.target.value)})}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                  </div>

                  {/* Keywords */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-sm font-medium text-slate-700">Keyword Risk Score</label>
                      <span className="text-sm font-bold text-purple-600">{examplePatient.keywords}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={examplePatient.keywords}
                      onChange={(e) => setExamplePatient({...examplePatient, keywords: parseInt(e.target.value)})}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                  </div>

                  {/* No-Show */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <label className="text-sm font-medium text-slate-700">No-Show Probability</label>
                      <span className="text-sm font-bold text-amber-600">{examplePatient.noShow}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={examplePatient.noShow}
                      onChange={(e) => setExamplePatient({...examplePatient, noShow: parseInt(e.target.value)})}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                    />
                  </div>
                </div>

                {/* Output */}
                <div>
                  {/* Risk Score Display */}
                  <div 
                    className={`rounded-2xl p-6 text-white mb-6 ${
                      calculateRiskScore.totalScore >= 80 ? 'bg-gradient-to-r from-red-500 to-red-600' :
                      calculateRiskScore.totalScore >= 60 ? 'bg-gradient-to-r from-amber-500 to-amber-600' :
                      'bg-gradient-to-r from-green-500 to-green-600'
                    }`}
                  >
                    <p className="text-white/80 text-sm mb-1">Calculated Risk Score</p>
                    <p className="text-6xl font-bold mb-2">{calculateRiskScore.totalScore}</p>
                    <p className="text-white/90 font-medium">
                      {calculateRiskScore.totalScore >= 80 ? '🚨 ACT NOW' :
                       calculateRiskScore.totalScore >= 60 ? '⚠️ WATCH' :
                       '✓ STABLE'}
                    </p>
                  </div>

                  {/* Top 3 Drivers */}
                  <div className="bg-slate-50 rounded-xl p-4 mb-6">
                    <p className="text-xs font-semibold text-slate-500 mb-3">TOP 3 RISK DRIVERS</p>
                    <div className="space-y-2">
                      {topDrivers.map((driver, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <span className="w-5 h-5 rounded-full bg-teal-600 text-white text-xs flex items-center justify-center font-bold">
                            {i + 1}
                          </span>
                          <span className="text-sm text-slate-700 flex-1">{signalLabels[driver.signal]}</span>
                          <span className="text-sm font-semibold text-slate-800">
                            +{driver.contribution.toFixed(1)} pts
                          </span>
                          <span className="text-xs text-slate-500">
                            ({driver.percentage}%)
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contribution Breakdown */}
                  <div className="bg-white border border-slate-200 rounded-xl p-4">
                    <p className="text-xs font-semibold text-slate-500 mb-3">FULL CONTRIBUTION BREAKDOWN</p>
                    <div className="space-y-2">
                      {Object.entries(calculateRiskScore.contributions).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-2">
                          <span className="text-xs text-slate-600 w-28">{signalLabels[key]}</span>
                          <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-teal-500 rounded-full"
                              style={{ width: `${(value / calculateRiskScore.totalScore) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-slate-700 w-12 text-right">
                            {value.toFixed(1)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Weight Tuning */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Weight Configuration</h3>
              <p className="text-slate-600 text-sm mb-4">
                Adjust signal weights (must sum to 100%). In production, weights are tuned per-clinic based on outcomes.
              </p>
              <div className="grid grid-cols-7 gap-4">
                {Object.entries(simulatedWeights).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <label className="text-xs text-slate-600 block mb-2">{signalLabels[key]}</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={value}
                      onChange={(e) => setSimulatedWeights({...simulatedWeights, [key]: parseInt(e.target.value) || 0})}
                      className="w-full text-center border border-slate-200 rounded-lg p-2 text-sm"
                    />
                    <span className="text-xs text-slate-400">%</span>
                  </div>
                ))}
              </div>
              <p className={`text-sm mt-4 ${
                Object.values(simulatedWeights).reduce((a, b) => a + b, 0) === 100 
                  ? 'text-green-600' 
                  : 'text-red-600'
              }`}>
                Total: {Object.values(simulatedWeights).reduce((a, b) => a + b, 0)}% 
                {Object.values(simulatedWeights).reduce((a, b) => a + b, 0) !== 100 && ' (must equal 100%)'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
