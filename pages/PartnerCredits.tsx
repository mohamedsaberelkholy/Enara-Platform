import React from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  ArrowUpRight, 
  History,
  AlertTriangle,
  CheckCircle2,
  Clock
} from 'lucide-react';

const PARTNER_CREDITS_DATA = [
  { id: 1, name: 'Global Tech Institute', total: '500,000', used: '420,000', remaining: '80,000', status: 'Warning', lastTopUp: '2026-02-15', usageTrend: '+12%' },
  { id: 2, name: 'Future Academy', total: '1,000,000', used: '150,000', remaining: '850,000', status: 'Healthy', lastTopUp: '2026-03-01', usageTrend: '+5%' },
  { id: 3, name: 'Stellar University', total: '250,000', used: '245,000', remaining: '5,000', status: 'Critical', lastTopUp: '2026-01-10', usageTrend: '+28%' },
  { id: 4, name: 'Horizon Learning', total: '750,000', used: '300,000', remaining: '450,000', status: 'Healthy', lastTopUp: '2026-02-28', usageTrend: '+8%' },
  { id: 5, name: 'Apex Business School', total: '100,000', used: '85,000', remaining: '15,000', status: 'Warning', lastTopUp: '2026-03-05', usageTrend: '+15%' },
];

const RECENT_TRANSACTIONS = [
  { id: 1, partner: 'Future Academy', amount: '+500,000', date: '2026-03-01', type: 'Top-up', status: 'Completed' },
  { id: 2, partner: 'Horizon Learning', amount: '+250,000', date: '2026-02-28', type: 'Top-up', status: 'Completed' },
  { id: 3, partner: 'Global Tech Institute', amount: '+100,000', date: '2026-02-15', type: 'Top-up', status: 'Completed' },
  { id: 4, partner: 'Stellar University', amount: '+50,000', date: '2026-01-10', type: 'Top-up', status: 'Completed' },
];

export const PartnerCredits: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50/50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Partner Credit Management</h1>
            <p className="text-sm text-slate-500 mt-1">Oversee and manage AI credit allocations across all partner institutions.</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 font-bold text-sm rounded-xl hover:bg-slate-50 transition-all shadow-sm">
              <Download size={16} />
              <span className="hidden sm:inline">Export Report</span><span className="sm:hidden">Export</span>
            </button>
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white font-bold text-sm rounded-xl hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100">
              <Plus size={16} />
              <span className="hidden sm:inline">Bulk Allocation</span><span className="sm:hidden">Allocate</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[
            { label: 'Total Allocated', value: '2.6M', sub: 'Across 12 Partners', icon: Zap, color: 'text-indigo-600', bg: 'bg-indigo-50' },
            { label: 'Total Used', value: '1.2M', sub: '46% Utilization', icon: ArrowUpRight, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Remaining', value: '1.4M', sub: 'Global Balance', icon: CheckCircle2, color: 'text-blue-600', bg: 'bg-blue-50' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2.5 ${stat.bg} rounded-2xl`}>
                  <stat.icon size={20} className={stat.color} />
                </div>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
              <p className="text-xs text-slate-500 mt-1">{stat.sub}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Table */}
          <div className="xl:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="font-bold text-slate-900">Partner Allocations</h3>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1 sm:flex-none">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input 
                      type="text" 
                      placeholder="Search..." 
                      className="pl-9 pr-4 py-2 bg-slate-50 border-none rounded-xl text-xs focus:ring-2 focus:ring-indigo-500 w-full sm:w-48 transition-all"
                    />
                  </div>
                  <button className="p-2 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 transition-all">
                    <Filter size={14} />
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Partner</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Remaining</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Usage</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {PARTNER_CREDITS_DATA.map((partner) => {
                      const usedNum = parseFloat(partner.used.replace(/,/g, ''));
                      const totalNum = parseFloat(partner.total.replace(/,/g, ''));
                      const usagePct = (usedNum / totalNum) * 100;

                      return (
                        <tr key={partner.id} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-6 py-4">
                            <p className="text-sm font-bold text-slate-900">{partner.name}</p>
                            <p className="text-[10px] text-slate-400">Last top-up: {partner.lastTopUp}</p>
                          </td>
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
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                              partner.status === 'Healthy' ? 'bg-emerald-50 text-emerald-600' :
                              partner.status === 'Warning' ? 'bg-amber-50 text-amber-600' :
                              'bg-rose-50 text-rose-600'
                            }`}>
                              {partner.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-lg hover:bg-indigo-100 transition-all opacity-0 group-hover:opacity-100">
                              Top Up
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <History size={18} className="text-indigo-600" />
                <h3 className="font-bold text-slate-900">Recent Activity</h3>
              </div>
              <div className="space-y-4">
                {RECENT_TRANSACTIONS.map((tx) => (
                  <div key={tx.id} className="flex items-start gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-all cursor-pointer">
                    <div className="p-2 bg-indigo-50 rounded-xl">
                      <Plus size={14} className="text-indigo-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">{tx.partner}</p>
                      <p className="text-[10px] text-slate-500">{tx.type} • {tx.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-emerald-600">{tx.amount}</p>
                      <p className="text-[10px] text-slate-400">{tx.status}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-all">
                View All Transactions
              </button>
            </div>

            <div className="bg-indigo-900 p-6 rounded-3xl text-white shadow-lg shadow-indigo-200 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all" />
              <div className="relative z-10">
                <div className="p-2 bg-white/10 rounded-xl w-fit mb-4">
                  <Clock size={18} className="text-indigo-200" />
                </div>
                <h4 className="font-bold mb-1">Auto-Refill Settings</h4>
                <p className="text-xs text-indigo-200 mb-4">3 partners have auto-refill enabled for next billing cycle.</p>
                <button className="w-full py-2 bg-white text-indigo-900 text-[10px] font-bold rounded-xl hover:bg-indigo-50 transition-all uppercase tracking-widest">
                  Configure Rules
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
