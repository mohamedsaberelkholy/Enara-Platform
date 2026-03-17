
import React, { useState } from 'react';
import { 
  Users, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Target, 
  Award, 
  Search, 
  Filter, 
  Download, 
  RefreshCw, 
  ChevronRight, 
  AlertCircle, 
  MoreHorizontal,
  Plus,
  FileText,
  Zap,
  Building2,
  CheckCircle2,
  Layers,
  Copy,
  ArrowUpRight,
  ArrowDownRight,
  Info,
  Calendar,
  Globe,
  Monitor
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';

// Mock Data
const KPI_DATA = [
  { label: 'Total Students', value: '128,492', trend: '+12.5%', isUp: true, subtext: 'vs last month', color: 'blue' },
  { label: 'Avg Score', value: '76.4%', trend: '+2.1%', isUp: true, subtext: 'vs last month', color: 'emerald' },
  { label: 'Avg Progress', value: '64.2%', trend: '-1.4%', isUp: false, subtext: 'vs last month', color: 'indigo' },
  { label: 'Study Time', value: '14.2h', trend: '+8.3%', isUp: true, subtext: 'per week avg', color: 'violet' },
  { label: 'Completion Rate', value: '89.1%', trend: '+0.5%', isUp: true, subtext: 'vs last month', color: 'amber' },
];

const ACTIVITY_DATA = [
  { name: 'Mon', active: 42000, study: 2400 },
  { name: 'Tue', active: 45000, study: 2800 },
  { name: 'Wed', active: 38000, study: 2100 },
  { name: 'Thu', active: 51000, study: 3200 },
  { name: 'Fri', active: 48000, study: 2900 },
  { name: 'Sat', active: 32000, study: 1800 },
  { name: 'Sun', active: 28000, study: 1500 },
];

const COHORT_PERFORMANCE = [
  { name: 'CS-2024-A', score: 82, progress: 75 },
  { name: 'BA-2024-B', score: 74, progress: 62 },
  { name: 'ENG-2024-C', score: 68, progress: 58 },
  { name: 'MED-2024-D', score: 88, progress: 82 },
  { name: 'LAW-2024-E', score: 71, progress: 65 },
];

const PARTNER_ENGAGEMENT = [
  { name: 'Global Tech Academy', value: 35 },
  { name: 'Future Skills Inst.', value: 25 },
  { name: 'Elite Learning Corp', value: 20 },
  { name: 'Standard University', value: 15 },
  { name: 'Others', value: 5 },
];

const COLORS = ['#0ea5e9', '#10b981', '#6366f1', '#8b5cf6', '#f59e0b'];

const RISK_STUDENTS = [
  { name: 'Alex Johnson', partner: 'Global Tech', programme: 'Data Science', progress: 12, score: 45, lastActive: '2d ago', status: 'High Risk' },
  { name: 'Maria Garcia', partner: 'Future Skills', programme: 'UX Design', progress: 24, score: 52, lastActive: '1d ago', status: 'Medium Risk' },
  { name: 'James Wilson', partner: 'Elite Learning', programme: 'Cloud Arch', progress: 8, score: 38, lastActive: '4d ago', status: 'High Risk' },
  { name: 'Sarah Chen', partner: 'Global Tech', programme: 'AI Ethics', progress: 45, score: 58, lastActive: '6h ago', status: 'Low Risk' },
];

const PARTNER_PERFORMANCE = [
  { name: 'Global Tech Academy', students: 42500, score: 78.2, progress: 68.4, studyTime: 15.2, completion: 92.4, status: 'Active' },
  { name: 'Future Skills Inst.', students: 28400, score: 74.5, progress: 62.1, studyTime: 12.8, completion: 88.2, status: 'Active' },
  { name: 'Elite Learning Corp', students: 18200, score: 81.2, progress: 72.5, studyTime: 16.4, completion: 94.1, status: 'Active' },
  { name: 'Standard University', students: 32100, score: 69.8, progress: 58.2, studyTime: 11.5, completion: 82.5, status: 'Warning' },
  { name: 'Creative Arts Hub', students: 7292, score: 76.4, progress: 64.2, studyTime: 14.2, completion: 89.1, status: 'Active' },
];

export const EnaraAdminDashboard: React.FC = () => {
  const [isAddProviderOpen, setIsAddProviderOpen] = useState(false);
  const [providerData, setProviderData] = useState({
    orgName: '',
    orgType: 'School',
    otherType: '',
    adminName: '',
    adminEmail: '',
    username: '',
    password: ''
  });
  const [showCredentials, setShowCredentials] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const generateCredentials = () => {
    const randomStr = Math.random().toString(36).substring(7);
    const username = `admin_${providerData.orgName.toLowerCase().replace(/\s+/g, '_')}_${randomStr}`;
    const password = Math.random().toString(36).substring(2, 10) + '!' + Math.floor(Math.random() * 100);
    setProviderData(prev => ({ ...prev, username, password }));
    setShowCredentials(true);
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleAddProvider = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Provider ${providerData.orgName} onboarded successfully! Credentials sent to ${providerData.adminEmail}`);
    setIsAddProviderOpen(false);
    setShowCredentials(false);
    setProviderData({
      orgName: '',
      orgType: 'School',
      otherType: '',
      adminName: '',
      adminEmail: '',
      username: '',
      password: ''
    });
  };

  return (
    <div className="p-6 lg:p-10 bg-slate-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Enara Partners Dashboard</h1>
          <p className="text-slate-500 mt-1">Strategic intelligence and operational oversight across the ecosystem.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsAddProviderOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
          >
            <Plus size={18} />
            Add Partner
          </button>
          <button className="p-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-all">
            <Download size={20} />
          </button>
        </div>
      </div>

      {/* Sticky Filter Bar */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border border-slate-200 rounded-2xl p-3 mb-8 flex flex-wrap items-center gap-3 shadow-sm">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100">
          <Calendar size={16} className="text-slate-400" />
          <select className="bg-transparent text-sm font-medium text-slate-700 outline-none">
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>Year to Date</option>
            <option>All Time</option>
          </select>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100">
          <Building2 size={16} className="text-slate-400" />
          <select className="bg-transparent text-sm font-medium text-slate-700 outline-none">
            <option>All Partners</option>
            <option>Global Tech Academy</option>
            <option>Future Skills Inst.</option>
          </select>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100">
          <Globe size={16} className="text-slate-400" />
          <select className="bg-transparent text-sm font-medium text-slate-700 outline-none">
            <option>All Regions</option>
            <option>EMEA</option>
            <option>APAC</option>
            <option>Americas</option>
          </select>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100">
          <Monitor size={16} className="text-slate-400" />
          <select className="bg-transparent text-sm font-medium text-slate-700 outline-none">
            <option>All Delivery Modes</option>
            <option>Online</option>
            <option>Blended</option>
            <option>In-Person</option>
          </select>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
            <RefreshCw size={10} />
            Updated 2m ago
          </span>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
        {KPI_DATA.map((kpi, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-2xl bg-${kpi.color}-50 flex items-center justify-center text-${kpi.color}-600 group-hover:scale-110 transition-transform`}>
                {idx === 0 && <Users size={24} />}
                {idx === 1 && <Award size={24} />}
                {idx === 2 && <Target size={24} />}
                {idx === 3 && <Clock size={24} />}
                {idx === 4 && <CheckCircle2 size={24} />}
              </div>
              <button className="text-slate-300 hover:text-slate-600 transition-colors">
                <Info size={16} />
              </button>
            </div>
            <p className="text-sm font-medium text-slate-500">{kpi.label}</p>
            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="text-2xl font-bold text-slate-900">{kpi.value}</h3>
              <span className={`text-xs font-bold flex items-center gap-0.5 ${kpi.isUp ? 'text-emerald-600' : 'text-rose-600'}`}>
                {kpi.isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {kpi.trend}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 mt-2 font-medium uppercase tracking-wider">{kpi.subtext}</p>
            
            {/* Mini Sparkline Placeholder */}
            <div className="mt-4 h-1 w-full bg-slate-50 rounded-full overflow-hidden">
              <div className={`h-full bg-${kpi.color}-500`} style={{ width: '65%' }}></div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Activity Trend */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Student Activity Trend</h3>
              <p className="text-sm text-slate-500">Daily active learners and study hours across all partners.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                <span className="text-xs font-bold text-slate-600">Active Students</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                <span className="text-xs font-bold text-slate-600">Study Hours</span>
              </div>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ACTIVITY_DATA}>
                <defs>
                  <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="active" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorActive)" />
                <Line type="monotone" dataKey="study" stroke="#6366f1" strokeWidth={3} dot={{ r: 4, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Engagement Distribution */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-1">Partner Distribution</h3>
          <p className="text-sm text-slate-500 mb-8">Engagement share by top education providers.</p>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PARTNER_ENGAGEMENT}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {PARTNER_ENGAGEMENT.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-4">
            {PARTNER_ENGAGEMENT.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx] }}></div>
                  <span className="text-xs font-medium text-slate-600">{item.name}</span>
                </div>
                <span className="text-xs font-bold text-slate-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Risk & Actionable Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Operational Intelligence</h3>
              <p className="text-sm text-slate-500">Learners requiring immediate intervention based on risk scoring.</p>
            </div>
            <button className="text-sm font-bold text-teal-600 hover:text-teal-700">View All Alerts</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-50">
                  <th className="text-left py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Student</th>
                  <th className="text-left py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Partner</th>
                  <th className="text-left py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Progress</th>
                  <th className="text-left py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Score</th>
                  <th className="text-left py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Risk</th>
                  <th className="text-right py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {RISK_STUDENTS.map((student, idx) => (
                  <tr key={idx} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{student.name}</p>
                          <p className="text-[10px] text-slate-400">{student.programme}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-slate-600">{student.partner}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${student.progress < 20 ? 'bg-rose-500' : 'bg-amber-500'}`} 
                            style={{ width: `${student.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-bold text-slate-700">{student.progress}%</span>
                      </div>
                    </td>
                    <td className="py-4 text-sm font-bold text-slate-900">{student.score}%</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                        student.status === 'High Risk' ? 'bg-rose-50 text-rose-600' : 
                        student.status === 'Medium Risk' ? 'bg-amber-50 text-amber-600' : 
                        'bg-emerald-50 text-emerald-600'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-teal-600 transition-colors">
                        <ChevronRight size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Outcomes Snapshot */}
        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Outcomes Snapshot</h3>
          <div className="space-y-6">
            <div className="p-5 bg-slate-50 rounded-3xl border border-slate-100">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active vs Inactive</span>
                <span className="text-xs font-bold text-emerald-600">+4.2%</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="text-2xl font-bold text-slate-900">84,291</p>
                  <p className="text-[10px] text-slate-400 font-medium">ACTIVE LEARNERS</p>
                </div>
                <div className="w-px h-10 bg-slate-200"></div>
                <div className="flex-1">
                  <p className="text-2xl font-bold text-slate-400">44,201</p>
                  <p className="text-[10px] text-slate-400 font-medium">INACTIVE</p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-slate-700">Completion Funnel</span>
                <span className="text-xs text-slate-400">89.1% Overall</span>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Enrolled', value: 100, color: 'bg-slate-200' },
                  { label: 'Active', value: 84, color: 'bg-teal-400' },
                  { label: 'Progressing', value: 62, color: 'bg-indigo-400' },
                  { label: 'Completed', value: 48, color: 'bg-emerald-400' },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      <span>{item.label}</span>
                      <span>{item.value}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                      <div className={`h-full ${item.color}`} style={{ width: `${item.value}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Top Performing Cohorts</h4>
              <div className="space-y-3">
                {COHORT_PERFORMANCE.slice(0, 3).map((cohort, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-emerald-50/30 rounded-2xl border border-emerald-100/50">
                    <span className="text-sm font-bold text-slate-700">{cohort.name}</span>
                    <span className="text-sm font-bold text-emerald-600">{cohort.score}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partner Performance Table */}
      <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Partner Performance Matrix</h3>
            <p className="text-sm text-slate-500">Comparative analysis of all education providers in the ecosystem.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search partners..." 
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-sm font-bold border border-slate-100">
              <Filter size={16} />
              Filter
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="text-left py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Partner Name</th>
                <th className="text-left py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Students</th>
                <th className="text-left py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Avg Score</th>
                <th className="text-left py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Progress</th>
                <th className="text-left py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Study Time</th>
                <th className="text-left py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Completion</th>
                <th className="text-left py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="text-right py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {PARTNER_PERFORMANCE.map((partner, idx) => (
                <tr key={idx} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                        <Building2 size={20} />
                      </div>
                      <span className="text-sm font-bold text-slate-900">{partner.name}</span>
                    </div>
                  </td>
                  <td className="py-5 text-sm font-medium text-slate-600">{partner.students.toLocaleString()}</td>
                  <td className="py-5">
                    <span className="text-sm font-bold text-slate-900">{partner.score}%</span>
                  </td>
                  <td className="py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500" style={{ width: `${partner.progress}%` }}></div>
                      </div>
                      <span className="text-xs font-bold text-slate-700">{partner.progress}%</span>
                    </div>
                  </td>
                  <td className="py-5 text-sm font-medium text-slate-600">{partner.studyTime}h/wk</td>
                  <td className="py-5 text-sm font-bold text-emerald-600">{partner.completion}%</td>
                  <td className="py-5">
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                      partner.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {partner.status}
                    </span>
                  </td>
                  <td className="py-5 text-right">
                    <button className="p-2 text-slate-400 hover:text-slate-600">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Add New Partner', icon: Building2, color: 'bg-blue-50 text-blue-600', action: () => setIsAddProviderOpen(true) },
          { label: 'Create Programme', icon: Layers, color: 'bg-indigo-50 text-indigo-600' },
          { label: 'Export Analytics', icon: FileText, color: 'bg-emerald-50 text-emerald-600' },
          { label: 'Manage Integrations', icon: Zap, color: 'bg-amber-50 text-amber-600' },
        ].map((action, idx) => (
          <button 
            key={idx}
            onClick={action.action}
            className="flex items-center gap-4 p-5 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all text-left group"
          >
            <div className={`w-12 h-12 rounded-2xl ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <action.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">{action.label}</p>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Quick Access</p>
            </div>
            <ChevronRight size={16} className="ml-auto text-slate-300 group-hover:text-slate-600 transition-colors" />
          </button>
        ))}
      </div>

      {/* Add Provider Modal */}
      <AnimatePresence>
        {isAddProviderOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddProviderOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 sm:p-10">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Onboard New Partner</h2>
                    <p className="text-slate-500 mt-1">Create a new education provider and generate admin credentials.</p>
                  </div>
                  <button 
                    onClick={() => setIsAddProviderOpen(false)}
                    className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <RefreshCw size={24} className="rotate-45" />
                  </button>
                </div>

                <form onSubmit={handleAddProvider} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Organization Name</label>
                      <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          required
                          type="text"
                          value={providerData.orgName}
                          onChange={(e) => setProviderData({...providerData, orgName: e.target.value})}
                          placeholder="e.g. Global Tech Academy"
                          className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Organization Type</label>
                      <select 
                        value={providerData.orgType}
                        onChange={(e) => setProviderData({...providerData, orgType: e.target.value})}
                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                      >
                        <option>School</option>
                        <option>University</option>
                        <option>Corporate</option>
                        <option>Others</option>
                      </select>
                    </div>
                  </div>

                  {providerData.orgType === 'Others' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-2"
                    >
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Specify Type</label>
                      <input 
                        type="text"
                        value={providerData.otherType}
                        onChange={(e) => setProviderData({...providerData, otherType: e.target.value})}
                        placeholder="e.g. Training Center"
                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                      />
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Admin Full Name</label>
                      <div className="relative">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          required
                          type="text"
                          value={providerData.adminName}
                          onChange={(e) => setProviderData({...providerData, adminName: e.target.value})}
                          placeholder="John Doe"
                          className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Admin Email</label>
                      <div className="relative">
                        <Zap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          required
                          type="email"
                          value={providerData.adminEmail}
                          onChange={(e) => setProviderData({...providerData, adminEmail: e.target.value})}
                          placeholder="admin@org.com"
                          className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-teal-500/20 transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {!showCredentials ? (
                    <button 
                      type="button"
                      onClick={generateCredentials}
                      disabled={!providerData.orgName || !providerData.adminEmail}
                      className="w-full py-4 bg-slate-100 text-slate-900 rounded-2xl font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Zap size={18} className="text-amber-500" />
                      Generate Login Credentials
                    </button>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-6 bg-slate-900 rounded-3xl space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Admin Credentials</span>
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                          <CheckCircle2 size={10} /> Securely Generated
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-[10px] text-slate-500 font-bold uppercase">Username</p>
                          <div className="flex items-center justify-between bg-white/5 rounded-xl px-3 py-2 border border-white/10">
                            <code className="text-xs text-white truncate mr-2">{providerData.username}</code>
                            <button 
                              type="button"
                              onClick={() => copyToClipboard(providerData.username, 'user')}
                              className="text-slate-400 hover:text-white transition-colors"
                            >
                              {copiedField === 'user' ? <CheckCircle2 size={14} className="text-emerald-400" /> : <Copy size={14} />}
                            </button>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] text-slate-500 font-bold uppercase">Password</p>
                          <div className="flex items-center justify-between bg-white/5 rounded-xl px-3 py-2 border border-white/10">
                            <code className="text-xs text-white truncate mr-2">{providerData.password}</code>
                            <button 
                              type="button"
                              onClick={() => copyToClipboard(providerData.password, 'pass')}
                              className="text-slate-400 hover:text-white transition-colors"
                            >
                              {copiedField === 'pass' ? <CheckCircle2 size={14} className="text-emerald-400" /> : <Copy size={14} />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="pt-4 flex gap-4">
                    <button 
                      type="button"
                      onClick={() => setIsAddProviderOpen(false)}
                      className="flex-1 py-4 text-slate-500 font-bold hover:text-slate-700 transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      disabled={!showCredentials}
                      className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 disabled:opacity-50"
                    >
                      Confirm & Onboard Partner
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
