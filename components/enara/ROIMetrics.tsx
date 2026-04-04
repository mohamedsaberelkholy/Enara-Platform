
import React from 'react';
import { 
  Target, 
  Users, 
  Award, 
  Clock, 
  MessageSquare, 
  TrendingUp, 
  AlertTriangle,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const COURSE_HEALTH = [
  { name: 'Advanced Mathematics', engagement: 92, confidence: 94, struggle: 12, institution: 'Global Tech' },
  { name: 'Intro to Physics', engagement: 84, confidence: 91, struggle: 18, institution: 'Future Skills' },
  { name: 'Business Ethics', engagement: 78, confidence: 82, struggle: 24, institution: 'Elite Learning' },
  { name: 'English Literature', engagement: 95, confidence: 96, struggle: 8, institution: 'Standard Uni' },
  { name: 'Computer Science', engagement: 88, confidence: 85, struggle: 22, institution: 'Cairo Central' },
];

export const ROIMetrics: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Adoption Rate</p>
          <h3 className="text-2xl font-black text-slate-900">84.2%</h3>
          <p className="text-xs text-emerald-600 font-bold mt-1">Active / Enrolled</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">AI Self-Service</p>
          <h3 className="text-2xl font-black text-slate-900">94.1%</h3>
          <p className="text-xs text-indigo-600 font-bold mt-1">Handled by AI</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Teacher Hours Saved</p>
          <h3 className="text-2xl font-black text-slate-900">12,482h</h3>
          <p className="text-xs text-emerald-600 font-bold mt-1">Across all orgs</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Avg Exam Score</p>
          <h3 className="text-2xl font-black text-slate-900">+18.5%</h3>
          <p className="text-xs text-emerald-600 font-bold mt-1">Improvement YoY</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <h3 className="text-lg font-black text-slate-900 mb-6">Course Engagement Ranking</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={COURSE_HEALTH} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} width={120} />
                <Tooltip />
                <Bar dataKey="engagement" fill="#6366f1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <h3 className="text-lg font-black text-slate-900 mb-6">Course Health Overview</h3>
          <div className="space-y-4">
            {COURSE_HEALTH.map((course, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-900">{course.name}</p>
                  <p className="text-[10px] text-slate-400">{course.institution}</p>
                </div>
                <div className="flex gap-4">
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">RAG Conf.</p>
                    <p className={`text-xs font-black ${course.confidence < 85 ? 'text-rose-600' : 'text-emerald-600'}`}>{course.confidence}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Struggle</p>
                    <p className={`text-xs font-black ${course.struggle > 20 ? 'text-rose-600' : 'text-slate-700'}`}>{course.struggle}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
