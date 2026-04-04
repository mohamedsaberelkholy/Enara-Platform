
import React from 'react';
import { 
  DollarSign, 
  Zap, 
  TrendingUp, 
  Calendar, 
  PieChart as PieChartIcon,
  ArrowUpRight,
  ArrowDownRight,
  Clock
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

const FINANCIAL_DATA = [
  { name: 'Global Tech', used: 358000, remaining: 842000, depletion: '2026-11-12', costPerStudent: 9.88, costPerQuestion: 0.12 },
  { name: 'Future Skills', used: 376000, remaining: 124000, depletion: '2026-05-15', costPerStudent: 11.42, costPerQuestion: 0.15 },
  { name: 'Elite Learning', used: 350000, remaining: 450000, depletion: '2026-08-20', costPerStudent: 10.55, costPerQuestion: 0.14 },
  { name: 'Standard Uni', used: 188000, remaining: 12000, depletion: '2026-04-15', costPerStudent: 14.20, costPerQuestion: 0.22 },
];

const COURSE_BURN = [
  { name: 'Adv Math', burn: 124000 },
  { name: 'Physics', burn: 98000 },
  { name: 'CS', burn: 85000 },
  { name: 'English', burn: 42000 },
  { name: 'Ethics', burn: 31000 },
];

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

export const Financials: React.FC = () => {
  const totalUsed = FINANCIAL_DATA.reduce((acc, curr) => acc + curr.used, 0);
  const totalRemaining = FINANCIAL_DATA.reduce((acc, curr) => acc + curr.remaining, 0);

  const pieData = [
    { name: 'Used', value: totalUsed },
    { name: 'Remaining', value: totalRemaining },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Cost per Student / mo</p>
          <h3 className="text-2xl font-black text-slate-900">$10.82</h3>
          <p className="text-xs text-emerald-600 font-bold mt-1">-2.4% efficiency</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Cost per Resolved Q</p>
          <h3 className="text-2xl font-black text-slate-900">$0.14</h3>
          <p className="text-xs text-emerald-600 font-bold mt-1">Stable</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Credits Used</p>
          <h3 className="text-2xl font-black text-slate-900">{(totalUsed / 1000000).toFixed(2)}M</h3>
          <p className="text-xs text-slate-500 font-medium mt-1">Across all orgs</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Credits Rem.</p>
          <h3 className="text-2xl font-black text-slate-900">{(totalRemaining / 1000000).toFixed(2)}M</h3>
          <p className="text-xs text-rose-600 font-bold mt-1">4 orgs low balance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <h3 className="text-lg font-black text-slate-900 mb-6">Credit Distribution (Used vs Remaining)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill="#6366f1" />
                  <Cell fill="#e0e7ff" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-8 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-indigo-500" />
              <span className="text-xs font-bold text-slate-600">Used ({(totalUsed / (totalUsed + totalRemaining) * 100).toFixed(1)}%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-indigo-100" />
              <span className="text-xs font-bold text-slate-600">Remaining ({(totalRemaining / (totalUsed + totalRemaining) * 100).toFixed(1)}%)</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <h3 className="text-lg font-black text-slate-900 mb-6">Credits Burned per Course</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={COURSE_BURN}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                <Tooltip />
                <Bar dataKey="burn" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100">
          <h3 className="text-lg font-black text-slate-900">Financial Projections per Institution</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Institution</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cost / Student</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cost / Question</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Burn Rate</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Projected Depletion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {FINANCIAL_DATA.map((data, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900 text-sm">{data.name}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">${data.costPerStudent.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-700">${data.costPerQuestion.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500" style={{ width: `${(data.used / (data.used + data.remaining)) * 100}%` }} />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">{Math.round((data.used / (data.used + data.remaining)) * 100)}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-rose-600 font-bold text-sm">
                      <Clock size={14} /> {data.depletion}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
