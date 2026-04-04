
import React from 'react';
import { 
  FileText, 
  Calendar, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  RefreshCw,
  Tag
} from 'lucide-react';

const CONTRACTS = [
  { id: '1', institution: 'Global Tech Academy', start: '2025-09-01', expiry: '2026-09-01', value: 5040000, credits: 1200000, pricePerCredit: 4.2, tier: 'Enterprise', discount: 10, autoRenewal: true, status: 'Active' },
  { id: '2', institution: 'Future Skills Inst.', start: '2025-10-05', expiry: '2026-10-05', value: 3420000, credits: 500000, pricePerCredit: 6.84, tier: 'Custom', discount: 5, autoRenewal: true, status: 'Active' },
  { id: '3', institution: 'Elite Learning Corp', start: '2025-11-20', expiry: '2026-11-20', value: 2304000, credits: 800000, pricePerCredit: 2.88, tier: 'Enterprise', discount: 15, autoRenewal: false, status: 'Active' },
  { id: '4', institution: 'Standard University', start: '2025-08-15', expiry: '2026-08-15', value: 3720000, credits: 200000, pricePerCredit: 18.6, tier: 'Standard', discount: 0, autoRenewal: false, status: 'Pending Renewal' },
];

export const ContractManagement: React.FC = () => {
  const getDaysUntilExpiry = (expiry: string) => {
    const today = new Date();
    const expiryDate = new Date(expiry);
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Avg Contract Value</p>
          <h3 className="text-2xl font-black text-slate-900">$3.62M</h3>
          <p className="text-xs text-emerald-600 font-bold mt-1">+5.2% YoY</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Active Contracts</p>
          <h3 className="text-2xl font-black text-slate-900">{CONTRACTS.length}</h3>
          <p className="text-xs text-slate-500 font-medium mt-1">4 pending renewal</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Renewal Rate</p>
          <h3 className="text-2xl font-black text-slate-900">94.2%</h3>
          <p className="text-xs text-emerald-600 font-bold mt-1">Target: 95%</p>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-black text-slate-900">Renewal Calendar & Contract Management</h3>
          <button className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 transition-all">
            New Contract
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Institution</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tier</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Contract Value</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Expiry</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Auto-Renew</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {CONTRACTS.map((contract) => {
                const days = getDaysUntilExpiry(contract.expiry);
                return (
                  <tr key={contract.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-slate-900">{contract.institution}</p>
                      <p className="text-[10px] text-slate-400">Started {contract.start}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                        contract.tier === 'Enterprise' ? 'bg-indigo-50 text-indigo-600' :
                        contract.tier === 'Custom' ? 'bg-blue-50 text-blue-600' :
                        'bg-slate-50 text-slate-600'
                      }`}>
                        {contract.tier}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-700">${(contract.value / 1000000).toFixed(2)}M</span>
                        <span className="text-[10px] text-slate-400">{contract.credits.toLocaleString()} credits @ ${contract.pricePerCredit}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className={`text-sm font-bold ${days < 30 ? 'text-rose-600' : 'text-slate-700'}`}>{days} days left</span>
                        <span className="text-[10px] text-slate-400">{contract.expiry}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {contract.autoRenewal ? (
                        <RefreshCw size={16} className="text-emerald-500" />
                      ) : (
                        <Clock size={16} className="text-slate-300" />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                        contract.status === 'Active' ? 'bg-emerald-50 text-emerald-600' :
                        'bg-amber-50 text-amber-600'
                      }`}>
                        {contract.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
