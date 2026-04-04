
import React from 'react';
import { 
  Activity, 
  SearchCheck, 
  AlertCircle, 
  Clock, 
  Zap, 
  Monitor,
  Cpu,
  BarChart3
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

const HEALTH_DATA = [
  { time: '00:00', latency: 380, confidence: 94, requests: 120, users: 4200 },
  { time: '04:00', latency: 350, confidence: 95, requests: 80, users: 2100 },
  { time: '08:00', latency: 420, confidence: 92, requests: 450, users: 12500 },
  { time: '12:00', latency: 480, confidence: 91, requests: 820, users: 24100 },
  { time: '16:00', latency: 450, confidence: 93, requests: 680, users: 18400 },
  { time: '20:00', latency: 410, confidence: 94, requests: 320, users: 9200 },
];

export const PlatformHealth: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Avg RAG Confidence</p>
          <h3 className="text-2xl font-black text-slate-900">93.4%</h3>
          <p className="text-xs text-emerald-600 font-bold mt-1">Stable</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Out-of-Scope Rate</p>
          <h3 className="text-2xl font-black text-slate-900">4.2%</h3>
          <p className="text-xs text-rose-600 font-bold mt-1">+0.5% spike</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Avg Latency</p>
          <h3 className="text-2xl font-black text-slate-900">420ms</h3>
          <p className="text-xs text-emerald-600 font-bold mt-1">-15ms improvement</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Requests / Sec</p>
          <h3 className="text-2xl font-black text-slate-900">820</h3>
          <p className="text-xs text-slate-500 font-medium mt-1">Peak: 1,240 rps</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <h3 className="text-lg font-black text-slate-900 mb-6">Latency & Confidence Trends</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={HEALTH_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip />
                <Line type="monotone" dataKey="latency" stroke="#6366f1" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="confidence" stroke="#10b981" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <h3 className="text-lg font-black text-slate-900 mb-6">Concurrent Users (Peak: 24.1k)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={HEALTH_DATA}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip />
                <Area type="monotone" dataKey="users" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
