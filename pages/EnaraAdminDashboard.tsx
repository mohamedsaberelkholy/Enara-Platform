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
  PlusCircle,
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
  Monitor,
  LayoutDashboard,
  BarChart3,
  ShieldCheck,
  Activity,
  DollarSign,
  PieChart as PieChartIcon,
  Briefcase,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  SearchCheck,
  Cpu,
  MousePointer2,
  History,
  ChevronDown,
  Bell,
  X,
  Settings,
  CreditCard,
  Ban,
  RotateCcw
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
  Legend,
  ComposedChart,
  Scatter
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';

// --- Mock Data ---

const EXECUTIVE_KPIS = [
  { id: 'institutions', label: 'Partner Institutions', value: '482', change: '+12', status: 'success', trend: [400, 410, 425, 440, 460, 482] },
  { id: 'students', label: 'Enrolled Students', value: '1.2M', change: '+8.1%', status: 'success', trend: [1.0, 1.05, 1.1, 1.12, 1.15, 1.2] },
  { id: 'mau', label: 'Monthly Active Students', value: '842k', change: '+12.4%', status: 'success', trend: [700, 720, 750, 780, 810, 842] },
  { id: 'completion', label: 'Course Completion', value: '78.5%', change: '-1.2%', status: 'warning', trend: [80, 79.5, 79, 78.8, 78.6, 78.5] },
  { id: 'engagement', label: 'Avg Engagement Score', value: '8.4', change: '+0.2', status: 'success', trend: [8.0, 8.1, 8.2, 8.2, 8.3, 8.4] },
  { id: 'at_risk', label: 'At-Risk Students', value: '12,492', change: '+420', status: 'danger', trend: [10000, 10500, 11000, 11500, 12000, 12492] },
  { id: 'interventions', label: 'Open Interventions', value: '842', change: '-12%', status: 'success', trend: [1000, 950, 920, 890, 860, 842] },
  { id: 'ai_sessions', label: 'Active AI Sessions', value: '42.1k', change: '+24%', status: 'success', trend: [30, 32, 35, 38, 40, 42.1] },
  { id: 'uptime', label: 'Platform Uptime', value: '99.98%', change: 'Stable', status: 'success', trend: [99.9, 99.95, 99.98, 99.98, 99.98, 99.98] },
  { id: 'partner_credits', label: 'Total Partner Credits', value: '2.4M', change: '+120k', status: 'success', trend: [2.0, 2.1, 2.2, 2.3, 2.35, 2.4] },
];

const GROWTH_DATA = [
  { name: 'Sep', students: 0.9, institutions: 380, mau: 650, churn: 0.8, retention: 92 },
  { name: 'Oct', students: 0.95, institutions: 405, mau: 680, churn: 0.7, retention: 93 },
  { name: 'Nov', students: 1.02, institutions: 420, mau: 720, churn: 0.6, retention: 93.5 },
  { name: 'Dec', students: 1.05, institutions: 435, mau: 700, churn: 0.9, retention: 92.8 },
  { name: 'Jan', students: 1.12, institutions: 455, mau: 790, churn: 0.5, retention: 94 },
  { name: 'Feb', students: 1.18, institutions: 470, mau: 820, churn: 0.4, retention: 94.2 },
  { name: 'Mar', students: 1.2, institutions: 482, mau: 842, churn: 0.4, retention: 94.2 },
];

const INSTITUTION_PERFORMANCE = [
  { name: 'Global Tech Academy', students: '42.5k', active: '38.2k', retention: '96.4%', completion: '82.1%', engagement: 8.8, risk: 'Low', credits: '842k', hoursSaved: '12,450', status: 'Healthy', lastActive: '2m ago' },
  { name: 'Future Skills Inst.', students: '28.4k', active: '24.1k', retention: '92.1%', completion: '74.5%', engagement: 7.9, risk: 'Medium', credits: '124k', hoursSaved: '8,210', status: 'Warning', lastActive: '15m ago' },
  { name: 'Elite Learning Corp', students: '18.2k', active: '16.8k', retention: '98.2%', completion: '88.4%', engagement: 9.2, risk: 'Low', credits: '450k', hoursSaved: '6,840', status: 'Healthy', lastActive: '5m ago' },
  { name: 'Standard University', students: '32.1k', active: '22.4k', retention: '84.5%', completion: '62.8%', engagement: 6.4, risk: 'High', credits: '12k', hoursSaved: '4,120', status: 'At Risk', lastActive: '1h ago' },
  { name: 'Creative Arts Hub', students: '12.4k', active: '10.2k', retention: '91.2%', completion: '76.2%', engagement: 8.1, risk: 'Low', credits: '210k', hoursSaved: '3,950', status: 'Healthy', lastActive: '12m ago' },
];

const BRANCH_PERFORMANCE = [
  { name: 'Cairo Central', institution: 'Global Tech', health: 94, trend: 'up', students: 4200 },
  { name: 'Dubai North', institution: 'Elite Learning', health: 92, trend: 'up', students: 2800 },
  { name: 'Riyadh East', institution: 'Future Skills', health: 72, trend: 'down', students: 3100 },
  { name: 'London West', institution: 'Standard Uni', health: 58, trend: 'down', students: 1200 },
  { name: 'Amman South', institution: 'Global Tech', health: 88, trend: 'stable', students: 1500 },
];

const RISK_CATEGORIES = [
  { name: 'High Risk', value: 2492, color: '#ef4444' },
  { name: 'Medium Risk', value: 4200, color: '#f59e0b' },
  { name: 'Low Risk', value: 5800, color: '#10b981' },
];

const AI_ANALYTICS = [
  { name: 'AI Tutor Sessions', value: '428k', trend: '+18%' },
  { name: 'Avg Session Duration', value: '14.2m', trend: '+4%' },
  { name: 'Daily Active Usage', value: '84%', trend: '+2%' },
  { name: 'Response Satisfaction', value: '4.8/5', trend: '+0.1' },
];

const SALES_PIPELINE = [
  { label: 'New Leads', value: '42', change: '+8' },
  { label: 'In Pilot', value: '18', change: '+3' },
  { label: 'Pilot Conversion', value: '64%', change: '+5%' },
];

const PARTNER_CREDITS_MANAGEMENT = [
  { id: 'gt-01', name: 'Global Tech Academy', total: '1.2M', used: '358k', remaining: '842k', status: 'Healthy', lastTopUp: '12 days ago', plan: 'Enterprise', nextRenewal: '2026-05-15' },
  { id: 'fs-01', name: 'Future Skills Inst.', total: '500k', used: '376k', remaining: '124k', status: 'Warning', lastTopUp: '45 days ago', plan: 'Pro', nextRenewal: '2026-04-20' },
  { id: 'el-01', name: 'Elite Learning Corp', total: '800k', used: '350k', remaining: '450k', status: 'Healthy', lastTopUp: '5 days ago', plan: 'Enterprise', nextRenewal: '2026-06-01' },
  { id: 'su-01', name: 'Standard University', total: '200k', used: '188k', remaining: '12k', status: 'Critical', lastTopUp: '60 days ago', plan: 'Basic', nextRenewal: '2026-04-10' },
  { id: 'ca-01', name: 'Creative Arts Hub', total: '300k', used: '90k', remaining: '210k', status: 'Healthy', lastTopUp: '20 days ago', plan: 'Pro', nextRenewal: '2026-05-01' },
];

const ALERTS = [
  { id: 2, type: 'warning', title: 'Product Issue', message: 'AI Latency spike in EMEA region (>800ms)', time: '45m ago' },
  { id: 3, type: 'info', title: 'Pilot Deadline', message: 'Future Skills pilot ends in 3 days', time: '2h ago' },
  { id: 4, type: 'success', title: 'Expansion', message: 'Global Tech Academy added 5,000 seats', time: '4h ago' },
  { id: 5, type: 'danger', title: 'Critical Drop', message: 'Riyadh East branch attendance drop (-22%)', time: '6h ago' },
];

// --- Components ---

const KPICard: React.FC<{ kpi: typeof EXECUTIVE_KPIS[0] }> = ({ kpi }) => {
  const isPositive = kpi.change.startsWith('+') || kpi.change === 'Stable';
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, shadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' }}
      className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between min-w-[240px] transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{kpi.label}</span>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">{kpi.value}</h3>
        </div>
        <div className={`p-2 rounded-2xl ${
          kpi.status === 'success' ? 'bg-emerald-50 text-emerald-600' :
          kpi.status === 'warning' ? 'bg-amber-50 text-amber-600' :
          'bg-rose-50 text-rose-600'
        }`}>
          {kpi.status === 'success' ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
        </div>
      </div>
      
      <div className="flex items-center gap-2 mb-4">
        <div className={`flex items-center gap-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
          isPositive ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
        }`}>
          {isPositive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
          {kpi.change}
        </div>
        <span className="text-[10px] text-slate-400 font-medium">vs last month</span>
      </div>
      
      <div className="h-10 w-full opacity-40">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={kpi.trend.map((v, i) => ({ v, i }))}>
            <Area 
              type="monotone" 
              dataKey="v" 
              stroke={kpi.status === 'danger' ? '#ef4444' : '#6366f1'} 
              fill={kpi.status === 'danger' ? '#fee2e2' : '#e0e7ff'} 
              strokeWidth={2} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

const SectionHeader: React.FC<{ title: string; subtitle?: string; action?: React.ReactNode }> = ({ title, subtitle, action }) => (
  <div className="flex items-center justify-between mb-6">
    <div>
      <h2 className="text-lg font-black text-slate-900 tracking-tight">{title}</h2>
      {subtitle && <p className="text-sm text-slate-500 font-medium">{subtitle}</p>}
    </div>
    {action}
  </div>
);

interface EnaraAdminDashboardProps {
  onNavigate?: (tab: string) => void;
}

export const EnaraAdminDashboard: React.FC<EnaraAdminDashboardProps> = ({ onNavigate }) => {
  const [isAlertPanelOpen, setIsAlertPanelOpen] = useState(true);
  const [selectedPartnerForCredits, setSelectedPartnerForCredits] = useState<typeof PARTNER_CREDITS_MANAGEMENT[0] | null>(null);
  const [topUpAmount, setTopUpAmount] = useState('100000');

  return (
    <div className="flex h-full bg-[#F8FAFC] overflow-hidden font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar scroll-smooth">
        
        {/* Dashboard Filters & Controls */}
        <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 px-4 sm:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto no-scrollbar pb-1 md:pb-0">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-2xl border border-slate-200/60 cursor-pointer hover:bg-slate-100 transition-all group">
              <Calendar size={14} className="text-slate-400 group-hover:text-indigo-500 transition-colors" />
              <span className="text-xs font-bold text-slate-700 whitespace-nowrap">Last 30 Days</span>
              <ChevronDown size={14} className="text-slate-400" />
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-2xl border border-slate-200/60 cursor-pointer hover:bg-slate-100 transition-all group">
              <Filter size={14} className="text-slate-400 group-hover:text-indigo-500 transition-colors" />
              <span className="text-xs font-bold text-slate-700 whitespace-nowrap">All Regions</span>
              <ChevronDown size={14} className="text-slate-400" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95">
              <Download size={14} /> <span className="hidden sm:inline">Export Report</span><span className="sm:hidden">Export</span>
            </button>
            <button 
              onClick={() => onNavigate?.('integrations')}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-2xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95"
            >
              <PlusCircle size={16} /> <span className="hidden sm:inline">Add Partner</span><span className="sm:hidden">Partner</span>
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-8 space-y-8 sm:space-y-12 max-w-[1600px] mx-auto w-full">
          
          {/* Executive KPI Header */}
          <section>
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight font-crimson">Executive KPI Overview</h2>
                <p className="text-sm text-slate-500 font-medium mt-1">Real-time performance metrics across the Enara ecosystem.</p>
              </div>
              <div className="hidden md:flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <RefreshCw size={12} className="animate-spin-slow" />
                Live Updates Enabled
              </div>
            </div>
            <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
              {EXECUTIVE_KPIS.map(kpi => (
                <KPICard key={kpi.id} kpi={kpi} />
              ))}
            </div>
          </section>

          {/* Company Growth Overview */}
          <section className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="xl:col-span-2 bg-white p-6 sm:p-8 rounded-[2.5rem] border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-500"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight font-crimson">Company Growth Trends</h3>
                  <p className="text-sm text-slate-500 font-medium">Revenue and student acquisition over the last 6 months.</p>
                </div>
                <div className="flex bg-slate-100 p-1 rounded-xl">
                  <button className="px-4 py-1.5 bg-white text-indigo-600 text-[10px] font-black rounded-lg shadow-sm uppercase tracking-widest">Students</button>
                </div>
              </div>
              <div className="h-[300px] sm:h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={GROWTH_DATA}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0.01}/>
                      </linearGradient>
                      <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.01}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} 
                      dy={10} 
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} 
                    />
                    <Tooltip 
                      cursor={{ stroke: '#e2e8f0', strokeWidth: 2 }}
                      contentStyle={{ 
                        borderRadius: '20px', 
                        border: '1px solid #f1f5f9', 
                        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                        padding: '12px 16px'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="students" 
                      stroke="#10b981" 
                      strokeWidth={4} 
                      fillOpacity={1} 
                      fill="url(#colorStudents)" 
                      animationDuration={2500}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-6 sm:p-8 rounded-[2.5rem] border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-500"
            >
              <h3 className="text-xl font-black text-slate-900 tracking-tight font-crimson mb-1">Retention & Churn</h3>
              <p className="text-sm text-slate-500 font-medium mb-8">User lifecycle health metrics.</p>
              
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={GROWTH_DATA}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 600}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 600}} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="retention" fill="#e0e7ff" radius={[6, 6, 0, 0]} barSize={30} />
                    <Line type="monotone" dataKey="churn" stroke="#ef4444" strokeWidth={3} dot={{ r: 4, fill: '#ef4444', strokeWidth: 2, stroke: '#fff' }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-8 space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Net Revenue Retention</span>
                    <span className="text-sm font-black text-emerald-600">118%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-emerald-500" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Monthly Logo Churn</span>
                    <span className="text-sm font-black text-rose-600">0.4%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '4%' }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-rose-500" 
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Institution Performance Overview */}
          <section>
            <SectionHeader 
              title="Institution Performance Matrix" 
              subtitle="Ranked performance of top education providers."
              action={
                <div className="flex gap-2">
                  <div className="relative hidden sm:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input type="text" placeholder="Filter partners..." className="pl-9 pr-4 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none w-48" />
                  </div>
                </div>
              }
            />
            <div className="bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left min-w-[1000px]">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-200">
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Institution</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Students / Active</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Credits Rem.</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Hours Saved</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Engagement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {INSTITUTION_PERFORMANCE.map((inst, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
                            {inst.name[0]}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{inst.name}</p>
                            <p className="text-[10px] text-slate-400">Last active {inst.lastActive}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-700">{inst.students}</span>
                          <span className="text-[10px] text-slate-400">{inst.active} active</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <Zap size={12} className={parseInt(inst.credits) < 50 ? 'text-rose-500' : 'text-amber-500'} />
                          <span className={`text-sm font-bold ${parseInt(inst.credits) < 50 ? 'text-rose-600' : 'text-slate-700'}`}>
                            {inst.credits}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Clock size={12} className="text-teal-500" />
                          <span className="text-sm font-bold text-slate-900">{inst.hoursSaved}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500" style={{ width: `${inst.engagement * 10}%` }} />
                          </div>
                          <span className="text-xs font-bold text-slate-900">{inst.engagement}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

          {/* Student Risk & Product Usage Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Student Risk */}
            <section>
              <div className="bg-white p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-slate-200 shadow-sm h-full">
                <SectionHeader 
                  title="Student Risk Intelligence" 
                  subtitle="Predictive analysis of learner success and intervention needs." 
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
                  <div className="p-4 sm:p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total At-Risk</p>
                    <h4 className="text-2xl sm:text-3xl font-black text-slate-900">12,492</h4>
                    <p className="text-xs text-rose-600 font-bold mt-1">+420 this week</p>
                  </div>
                  <div className="p-4 sm:p-6 bg-indigo-50 rounded-3xl border border-indigo-100">
                    <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Intervention Success</p>
                    <h4 className="text-2xl sm:text-3xl font-black text-indigo-900">84.2%</h4>
                    <p className="text-xs text-indigo-600 font-bold mt-1">+2.1% efficiency</p>
                  </div>
                </div>
                
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={RISK_CATEGORIES}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {RISK_CATEGORIES.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Activity size={14} className="text-indigo-500" />
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Risk Distribution</h4>
                  </div>
                  <div className="space-y-3">
                    {RISK_CATEGORIES.map((cat, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />
                          <span className="text-xs font-medium text-slate-600">{cat.name}</span>
                        </div>
                        <span className="text-xs font-bold text-slate-900">{cat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Product Usage */}
            <section>
              <div className="bg-white p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-slate-200 shadow-sm h-full">
                <SectionHeader title="Product & AI Analytics" subtitle="System interaction volume." />
                <div className="space-y-4">
                  {AI_ANALYTICS.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.name}</p>
                        <p className="text-lg font-bold text-slate-900">{item.value}</p>
                      </div>
                      <div className="text-emerald-600 text-xs font-bold flex items-center gap-1">
                        <TrendingUp size={12} /> {item.trend}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-indigo-900 rounded-2xl text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Cpu size={16} className="text-indigo-400" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">System Health</span>
                  </div>
                  <p className="text-xs text-indigo-100/60">Avg Latency: <span className="text-white font-bold">420ms</span></p>
                  <p className="text-xs text-indigo-100/60">Curriculum Coverage: <span className="text-white font-bold">92.4%</span></p>
                </div>
              </div>
            </section>
          </div>

          {/* Deep-dive Analytics Preview */}
          <section>
            <SectionHeader title="Deep-dive Analytics" subtitle="Drill into specific operational domains." />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
              { id: 'institutions', label: 'Institution Details', icon: Building2 },
              { id: 'institutions', label: 'Branch Breakdown', icon: Layers },
              { id: 'roi', label: 'Student Risk Model', icon: SearchCheck },
              { id: 'health', label: 'Product Analytics', icon: Monitor },
              { id: 'audit', label: 'Admin Activity', icon: History },
            ].map((item, i) => (
              <button 
                key={i} 
                onClick={() => onNavigate?.(item.id)}
                className="flex flex-col items-center gap-3 p-6 bg-white rounded-2xl border border-slate-200 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-500/5 transition-all group"
              >
                  <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                    <item.icon size={20} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider text-center">{item.label}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Partner Credit Management */}
          <section>
            <SectionHeader 
              title="Partner Credit Management" 
              subtitle="Monitor and manage AI credit distribution across partner institutions."
              action={
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                  <Plus size={14} /> Bulk Top-up
                </button>
              }
            />
            <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left min-w-[1000px]">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-200">
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Partner Institution</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Credits</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Used</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Remaining</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Usage</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last Top-up</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {PARTNER_CREDITS_MANAGEMENT.map((partner, i) => {
                      const usedNum = parseFloat(partner.used);
                      const totalNum = parseFloat(partner.total);
                      const usagePct = (usedNum / totalNum) * 100;
                      
                      return (
                        <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-6 py-4">
                            <p className="text-sm font-bold text-slate-900">{partner.name}</p>
                            <p className="text-[10px] text-slate-400">{partner.plan} Plan</p>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-slate-600">{partner.total}</td>
                          <td className="px-6 py-4 text-sm font-medium text-slate-600">{partner.used}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1.5">
                              <Zap size={12} className={partner.status === 'Critical' ? 'text-rose-500' : 'text-amber-500'} />
                              <span className={`text-sm font-bold ${partner.status === 'Critical' ? 'text-rose-600' : 'text-slate-700'}`}>
                                {partner.remaining}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${usagePct > 80 ? 'bg-rose-500' : usagePct > 50 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                                  style={{ width: `${usagePct}%` }} 
                                />
                              </div>
                              <span className="text-[10px] font-bold text-slate-400">{Math.round(usagePct)}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-xs text-slate-500">
                            <div className="flex flex-col">
                              <span>{partner.lastTopUp}</span>
                              <span className="text-[10px] text-slate-400">Renews: {partner.nextRenewal}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                              partner.status === 'Healthy' ? 'bg-emerald-50 text-emerald-600' :
                              partner.status === 'Warning' ? 'bg-amber-50 text-amber-600' :
                              'bg-rose-50 text-rose-600'
                            }`}>
                              {partner.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <button 
                              onClick={() => setSelectedPartnerForCredits(partner)}
                              className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-lg hover:bg-indigo-100 transition-all flex items-center gap-1"
                            >
                              <Settings size={12} />
                              Manage
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <footer className="pt-10 pb-20 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm">
              <Sparkles size={14} className="text-indigo-600" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Intelligence you can learn from.</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-4 uppercase tracking-[0.2em]">© 2026 Enara Intelligence Layer</p>
          </footer>

        </div>
      </div>

      {/* Right-side Alerts & Action Center removed as requested */}
      {/* AI Credit Management Modal */}
      <AnimatePresence>
        {selectedPartnerForCredits && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPartnerForCredits(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200"
            >
              {/* Modal Header */}
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-200">
                    <Zap size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900 font-crimson">AI Credit Management</h3>
                    <p className="text-sm text-slate-500 font-medium">{selectedPartnerForCredits.name} • {selectedPartnerForCredits.plan} Plan</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedPartnerForCredits(null)}
                  className="p-2 hover:bg-slate-200 rounded-xl transition-colors text-slate-400"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8 space-y-8">
                {/* Current Status Grid */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Allocated</p>
                    <p className="text-xl font-black text-slate-900">{selectedPartnerForCredits.total}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Used Credits</p>
                    <p className="text-xl font-black text-slate-900">{selectedPartnerForCredits.used}</p>
                  </div>
                  <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Remaining</p>
                    <p className="text-xl font-black text-indigo-600">{selectedPartnerForCredits.remaining}</p>
                  </div>
                </div>

                {/* Usage Visualization */}
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Consumption Rate</h4>
                    <span className="text-xs font-bold text-slate-600">Next Renewal: {selectedPartnerForCredits.nextRenewal}</span>
                  </div>
                  <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex">
                    <div className="h-full bg-indigo-500" style={{ width: '30%' }} />
                    <div className="h-full bg-indigo-300" style={{ width: '15%' }} />
                    <div className="h-full bg-slate-200" style={{ width: '55%' }} />
                  </div>
                  <div className="flex gap-4 text-[10px] font-bold text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-indigo-500" />
                      <span>AI Tutoring (65%)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-indigo-300" />
                      <span>Content Gen (35%)</span>
                    </div>
                  </div>
                </div>

                {/* Management Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  <div className="space-y-3">
                    <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2">
                      <CreditCard size={18} />
                      Top Up
                    </button>
                    <div className="relative">
                      <input 
                        type="number" 
                        value={topUpAmount}
                        onChange={(e) => setTopUpAmount(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold outline-none focus:border-indigo-500 transition-all"
                        placeholder="Amount"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">Credits</span>
                    </div>
                  </div>

                  <button className="h-[52px] py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-black text-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                    <RotateCcw size={18} className="text-emerald-500" />
                    Renew Plan
                  </button>

                  <button className="h-[52px] py-4 bg-white border border-rose-200 text-rose-600 rounded-2xl font-black text-sm hover:bg-rose-50 transition-all flex items-center justify-center gap-2">
                    <Ban size={18} />
                    Stop / Cancel
                  </button>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  * Changes are applied instantly to the partner's API access.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
