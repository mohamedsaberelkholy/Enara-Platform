
import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  AlertTriangle, 
  Clock, 
  TrendingDown, 
  Search, 
  Filter,
  ArrowRight,
  LifeBuoy,
  Plus,
  Info,
  Mail,
  Phone,
  User,
  X,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

const INSTITUTIONS = [
  { 
    id: '1', 
    name: 'Global Tech Academy', 
    students: 42500, 
    active: 38200, 
    status: 'Healthy', 
    credits: 842000, 
    limit: 1000000, 
    lastActive: '2m ago', 
    tickets: 5, 
    resolution: '2.4h', 
    onboarding: '14d',
    director: 'Dr. Sarah Ahmed',
    email: 's.ahmed@globaltech.edu',
    phone: '+20 100 123 4567',
    lms: 'Canvas'
  },
  { 
    id: '2', 
    name: 'Future Skills Inst.', 
    students: 28400, 
    active: 24100, 
    status: 'Warning', 
    credits: 124000, 
    limit: 150000, 
    lastActive: '15m ago', 
    tickets: 12, 
    resolution: '4.8h', 
    onboarding: '22d',
    director: 'Eng. Omar Hassan',
    email: 'o.hassan@futureskills.org',
    phone: '+20 111 987 6543',
    lms: 'Moodle'
  },
  { 
    id: '3', 
    name: 'Elite Learning Corp', 
    students: 18200, 
    active: 16800, 
    status: 'Healthy', 
    credits: 450000, 
    limit: 500000, 
    lastActive: '5m ago', 
    tickets: 2, 
    resolution: '1.2h', 
    onboarding: '10d',
    director: 'Prof. Nadia Zaki',
    email: 'n.zaki@elitelearning.com',
    phone: '+20 122 333 4444',
    lms: 'Blackboard'
  },
  { 
    id: '4', 
    name: 'Standard University', 
    students: 32100, 
    active: 22400, 
    status: 'At Risk', 
    credits: 12000, 
    limit: 100000, 
    lastActive: '1h ago', 
    tickets: 28, 
    resolution: '12.5h', 
    onboarding: '35d',
    director: 'Dr. Khaled Mansour',
    email: 'k.mansour@standard.edu.eg',
    phone: '+20 155 777 8888',
    lms: 'Canvas'
  },
  { 
    id: '5', 
    name: 'Cairo Central School', 
    students: 5000, 
    active: 0, 
    status: 'Churn Risk', 
    credits: 50000, 
    limit: 50000, 
    lastActive: '32d ago', 
    tickets: 0, 
    resolution: '0h', 
    onboarding: '45d',
    director: 'Mrs. Laila Fouad',
    email: 'l.fouad@cairocentral.sch.eg',
    phone: '+20 100 000 1111',
    lms: 'Google Classroom'
  },
];

interface InstitutionCRMProps {
  onNavigate?: (tab: string) => void;
}

export const InstitutionCRM: React.FC<InstitutionCRMProps> = ({ onNavigate }) => {
  const [selectedInst, setSelectedInst] = useState<typeof INSTITUTIONS[0] | null>(null);
  const upsellList = INSTITUTIONS.filter(i => (i.credits / i.limit) > 0.8);
  const churnRiskList = INSTITUTIONS.filter(i => i.active === 0 || i.status === 'Churn Risk');

  return (
    <div className="space-y-8 animate-slide-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 font-crimson">Institution Directory</h3>
                <p className="text-sm text-slate-500">Managing {INSTITUTIONS.length} active partner institutions</p>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input type="text" placeholder="Search institutions..." className="pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none w-full sm:w-48 focus:ring-4 focus:ring-indigo-500/10 transition-all" />
                </div>
                <button 
                  onClick={() => onNavigate?.('integrations')}
                  className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 whitespace-nowrap"
                >
                  <Plus size={14} /> Add Partner
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-200">
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Institution</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Students (A/E)</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Onboarding</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Support</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {INSTITUTIONS.map((inst) => (
                    <tr key={inst.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold border border-indigo-100">
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
                          <span className="text-sm font-bold text-slate-700">{Math.round((inst.active/inst.students)*100)}%</span>
                          <span className="text-[10px] text-slate-400">{inst.active.toLocaleString()} / {inst.students.toLocaleString()}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-600">{inst.onboarding}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-700">{inst.tickets} tickets</span>
                          <span className="text-[10px] text-slate-400">avg {inst.resolution}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                          inst.status === 'Healthy' ? 'bg-emerald-50 text-emerald-600' :
                          inst.status === 'Warning' ? 'bg-amber-50 text-amber-600' :
                          'bg-rose-50 text-rose-600'
                        }`}>
                          {inst.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => setSelectedInst(inst)}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                          title="View Partner Info"
                        >
                          <Info size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
                <TrendingDown size={18} />
              </div>
              <h3 className="text-lg font-black text-slate-900">Churn Risk</h3>
            </div>
            <div className="space-y-4">
              {churnRiskList.map(inst => (
                <div key={inst.id} className="p-4 bg-rose-50/50 rounded-2xl border border-rose-100 group hover:bg-rose-50 transition-all">
                  <p className="text-sm font-bold text-slate-900">{inst.name}</p>
                  <p className="text-[10px] text-rose-600 font-bold uppercase tracking-wider mt-1">0 activity in last 30 days</p>
                  <button className="mt-3 w-full py-2 bg-white text-rose-600 text-xs font-bold rounded-xl border border-rose-200 hover:shadow-sm transition-all">
                    Reach Out
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
                <AlertTriangle size={18} />
              </div>
              <h3 className="text-lg font-black text-slate-900">Proactive Upsell</h3>
            </div>
            <div className="space-y-4">
              {upsellList.map(inst => (
                <div key={inst.id} className="p-4 bg-amber-50/50 rounded-2xl border border-amber-100 group hover:bg-amber-50 transition-all">
                  <p className="text-sm font-bold text-slate-900">{inst.name}</p>
                  <p className="text-[10px] text-amber-600 font-bold uppercase tracking-wider mt-1">{Math.round((inst.credits/inst.limit)*100)}% credits consumed</p>
                  <button className="mt-3 w-full py-2 bg-white text-amber-600 text-xs font-bold rounded-xl border border-amber-200 hover:shadow-sm transition-all">
                    Send Upgrade Offer
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Partner Info Modal */}
      {selectedInst && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="relative h-32 bg-indigo-600 p-8">
              <button 
                onClick={() => setSelectedInst(null)}
                className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
              >
                <X size={20} />
              </button>
              <div className="absolute -bottom-10 left-8">
                <div className="w-20 h-20 rounded-3xl bg-white shadow-xl flex items-center justify-center text-indigo-600 text-3xl font-bold border-4 border-white">
                  {selectedInst.name[0]}
                </div>
              </div>
            </div>
            
            <div className="pt-14 p-8 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 font-crimson">{selectedInst.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-md border border-indigo-100">
                    {selectedInst.lms} Integration
                  </span>
                  <span className="text-slate-400 text-xs">•</span>
                  <span className="text-slate-400 text-xs">ID: {selectedInst.id.padStart(4, '0')}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-4">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Primary Contact (Director)</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="w-8 h-8 rounded-lg bg-white text-slate-400 flex items-center justify-center border border-slate-200">
                        <User size={16} />
                      </div>
                      <span className="text-sm font-bold text-slate-700">{selectedInst.director}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="w-8 h-8 rounded-lg bg-white text-slate-400 flex items-center justify-center border border-slate-200">
                        <Mail size={16} />
                      </div>
                      <span className="text-sm font-medium text-slate-600">{selectedInst.email}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="w-8 h-8 rounded-lg bg-white text-slate-400 flex items-center justify-center border border-slate-200">
                        <Phone size={16} />
                      </div>
                      <span className="text-sm font-medium text-slate-600">{selectedInst.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex gap-3">
                  <button className="flex-1 py-3.5 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                    <ExternalLink size={16} />
                    Open CRM Profile
                  </button>
                  <button className="px-6 py-3.5 bg-indigo-50 text-indigo-600 rounded-2xl font-bold text-sm hover:bg-indigo-100 transition-all flex items-center justify-center gap-2">
                    <ShieldCheck size={16} />
                    Manage Keys
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
