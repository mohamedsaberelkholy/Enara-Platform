
import React from 'react';
import { 
  Users, 
  BookOpen, 
  MessageSquare, 
  Clock, 
  AlertCircle, 
  TrendingUp, 
  Search, 
  Filter, 
  ChevronRight, 
  Zap,
  Activity,
  Calendar,
  Monitor,
  Video,
  FileText,
  MousePointer2,
  Play,
  SkipForward,
  RotateCcw,
  BarChart3
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie,
  LineChart,
  Line,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';

const TELEMETRY_DATA = [
  { chapter: 'Ch 1: Algebra', watchTime: 45, skips: 2, visits: 5, scroll: 92, chatBefore: true },
  { chapter: 'Ch 2: Quadratics', watchTime: 120, skips: 12, visits: 18, scroll: 45, chatBefore: false },
  { chapter: 'Ch 3: Formula', watchTime: 85, skips: 5, visits: 12, scroll: 78, chatBefore: true },
  { chapter: 'Ch 4: Factoring', watchTime: 30, skips: 1, visits: 3, scroll: 95, chatBefore: true },
];

const SESSION_DISTRIBUTION = [
  { name: 'Long Sessions (>30m)', value: 12, color: '#0A5F6D' },
  { name: 'Short Sessions (<10m)', value: 48, color: '#94e2e2' },
];

const LANGUAGE_DIST = [
  { name: 'Arabic', value: 35, color: '#6366f1' },
  { name: 'English', value: 65, color: '#10b981' },
];

export const StudentDeepAnalytics: React.FC<{ studentId?: string }> = ({ studentId }) => {
  const [viewMode, setViewMode] = React.useState<'classes' | 'students'>('students');

  return (
    <div className="space-y-8 p-8 max-w-[1600px] mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Student Telemetry & Deep Analytics</h1>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex p-1 bg-slate-100 rounded-xl">
              <button 
                onClick={() => setViewMode('classes')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${viewMode === 'classes' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Classes
              </button>
              <button 
                onClick={() => setViewMode('students')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${viewMode === 'students' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Students
              </button>
            </div>
            <span className="text-slate-400 font-medium">•</span>
            <p className="text-slate-500 text-sm">
              {viewMode === 'students' ? 'Detailed behavioral insights for Sarah Ahmed • STU001' : 'Aggregate cohort behavioral telemetry'}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
            Export Telemetry Log
          </button>
        </div>
      </div>

      {/* Behavioral Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{viewMode === 'students' ? 'Total Sessions' : 'Avg Sessions / Student'}</p>
          <h3 className="text-2xl font-black text-slate-900">{viewMode === 'students' ? '60' : '42.5'}</h3>
          <p className="text-xs text-slate-500 font-medium mt-1">80% short bursts</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Avg Satisfaction</p>
          <h3 className="text-2xl font-black text-slate-900">4.8 / 5</h3>
          <p className="text-xs text-emerald-600 font-bold mt-1">High sentiment</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{viewMode === 'students' ? 'Untouched Chapters' : 'Low Engagement Chapters'}</p>
          <h3 className="text-2xl font-black text-slate-900">{viewMode === 'students' ? '3' : '12%'}</h3>
          <p className="text-xs text-rose-600 font-bold mt-1">Action required</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Time to First Chat</p>
          <h3 className="text-2xl font-black text-slate-900">4.2 min</h3>
          <p className="text-xs text-indigo-600 font-bold mt-1">Fast engagement</p>
        </div>
      </div>

      {viewMode === 'students' ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Telemetry Heatmap Table */}
            <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Chapter Telemetry Insights</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-slate-400 text-[10px] font-bold uppercase tracking-widest border-b border-slate-100">
                      <th className="pb-4">Chapter</th>
                      <th className="pb-4 text-center">Watch Time</th>
                      <th className="pb-4 text-center">Skips</th>
                      <th className="pb-4 text-center">Visits</th>
                      <th className="pb-4 text-center">Scroll Depth</th>
                      <th className="pb-4 text-center">Chat First?</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {TELEMETRY_DATA.map((t, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 text-sm font-bold text-slate-900">{t.chapter}</td>
                        <td className="py-4 text-center text-sm font-medium text-slate-600">{t.watchTime}m</td>
                        <td className="py-4 text-center">
                          <span className={`px-2 py-1 rounded-lg text-[10px] font-bold ${t.skips > 10 ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-400'}`}>
                            {t.skips} skips
                          </span>
                        </td>
                        <td className="py-4 text-center text-sm font-bold text-slate-700">{t.visits}x</td>
                        <td className="py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className={`h-full ${t.scroll > 80 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${t.scroll}%` }}></div>
                            </div>
                            <span className="text-[10px] font-bold text-slate-500">{t.scroll}%</span>
                          </div>
                        </td>
                        <td className="py-4 text-center">
                          {t.chatBefore ? (
                            <div className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-bold">
                              <MessageSquare size={10} /> YES
                            </div>
                          ) : (
                            <div className="inline-flex items-center gap-1 px-2 py-1 bg-slate-50 text-slate-400 rounded-lg text-[10px] font-bold">
                              <Video size={10} /> NO
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Session & Language Distribution */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Session Patterns</h3>
                <div className="space-y-4">
                  {SESSION_DISTRIBUTION.map((item, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-700">{item.name}</span>
                        <span className="text-xs font-black text-slate-900">{item.value} sessions</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full" style={{ backgroundColor: item.color, width: `${(item.value / 60) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Language Preference</h3>
                <div className="flex items-center gap-8">
                  <div className="flex-1 space-y-4">
                    {LANGUAGE_DIST.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-xs font-bold text-slate-700">{item.name} ({item.value}%)</span>
                      </div>
                    ))}
                  </div>
                  <div className="w-24 h-24 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={LANGUAGE_DIST}
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={45}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {LANGUAGE_DIST.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Telemetry Heatmap */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Video Interaction Heatmap</h3>
                <p className="text-sm text-slate-500">Correlation between rewinds, skips, and chat engagement.</p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Rewinds</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-indigo-500" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Skips</span>
                </div>
              </div>
            </div>
            <div className="h-64 w-full bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 flex flex-wrap gap-1 p-4">
                {Array.from({ length: 200 }).map((_, i) => (
                  <div key={i} className={`w-4 h-4 rounded-sm ${Math.random() > 0.7 ? 'bg-rose-500' : Math.random() > 0.5 ? 'bg-indigo-500' : 'bg-slate-200'}`} />
                ))}
              </div>
              <div className="relative z-10 text-center">
                <BarChart3 size={48} className="text-slate-300 mx-auto mb-4" />
                <p className="text-sm font-bold text-slate-500">Interactive Heatmap Visualization</p>
                <p className="text-xs text-slate-400">Showing Sarah's interaction patterns across "Quadratic Formula" video (12:45 total)</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Cohort Engagement Distribution</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { range: '0-10m', count: 45 },
                  { range: '10-20m', count: 120 },
                  { range: '20-30m', count: 85 },
                  { range: '30-40m', count: 40 },
                  { range: '40m+', count: 15 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="count" fill="#0A5F6D" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-slate-500 mt-4 text-center font-medium">Distribution of student session lengths across the cohort</p>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Chapter Difficulty Correlation</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis type="number" dataKey="visits" name="Visits" unit="x" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <YAxis type="number" dataKey="skips" name="Skips" unit="s" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <ZAxis type="number" dataKey="scroll" range={[50, 400]} name="Scroll" unit="%" />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Scatter name="Chapters" data={TELEMETRY_DATA} fill="#0d9488" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-slate-500 mt-4 text-center font-medium">Correlation between chapter visits and skips (Bubble size = Scroll depth)</p>
          </div>

          <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Cohort Telemetry Matrix</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-slate-400 text-[10px] font-bold uppercase tracking-widest border-b border-slate-100">
                    <th className="pb-4">Chapter</th>
                    <th className="pb-4 text-center">Avg Watch Time</th>
                    <th className="pb-4 text-center">Avg Skips</th>
                    <th className="pb-4 text-center">Avg Visits</th>
                    <th className="pb-4 text-center">Avg Scroll Depth</th>
                    <th className="pb-4 text-center">Chat Engagement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {TELEMETRY_DATA.map((t, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 text-sm font-bold text-slate-900">{t.chapter}</td>
                      <td className="py-4 text-center text-sm font-medium text-slate-600">{(t.watchTime * 1.2).toFixed(1)}m</td>
                      <td className="py-4 text-center text-sm font-medium text-slate-600">{(t.skips * 0.8).toFixed(1)}</td>
                      <td className="py-4 text-center text-sm font-bold text-slate-700">{(t.visits * 1.1).toFixed(1)}x</td>
                      <td className="py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full bg-teal-500`} style={{ width: `${t.scroll - 5}%` }}></div>
                          </div>
                          <span className="text-[10px] font-bold text-slate-500">{t.scroll - 5}%</span>
                        </div>
                      </td>
                      <td className="py-4 text-center">
                        <div className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-bold">
                          {(Math.random() * 40 + 40).toFixed(0)}% Active
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
