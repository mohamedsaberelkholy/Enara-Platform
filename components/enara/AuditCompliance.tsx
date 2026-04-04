
import React from 'react';
import { 
  ShieldCheck, 
  History, 
  Lock, 
  UserCheck, 
  FileSignature, 
  Activity, 
  AlertCircle,
  Download,
  Search,
  Filter
} from 'lucide-react';

const AUDIT_LOGS = [
  { id: '1', timestamp: '2026-04-02 12:45:22', actor: 'Director Khalid', role: 'Admin', action: 'Access Grant', category: 'Access', details: 'Granted "Teacher" role to Sarah Ahmed', ip: '192.168.1.42', signature: 'sha256:8f3e...' },
  { id: '2', timestamp: '2026-04-02 12:30:15', actor: 'System', role: 'System', action: 'Failed Login Threshold', category: 'Security', details: 'User STU-882 exceeded failed login attempts (5)', ip: '45.12.33.1', signature: 'sha256:c9d8...' },
  { id: '3', timestamp: '2026-04-02 11:15:00', actor: 'Enara Executive', role: 'Enara Admin', action: 'Credit Allocation', category: 'Configuration', details: 'Allocated 500,000 credits to Global Tech Academy', ip: '10.0.0.5', signature: 'sha256:a2b1...' },
  { id: '4', timestamp: '2026-04-02 10:05:42', actor: 'Admin Sarah', role: 'Admin', action: 'Data Export Signature', category: 'Data', details: 'Exported "Student Performance Report" for Grade 10', ip: '172.16.0.12', signature: 'sha256:f4e3...' },
  { id: '5', timestamp: '2026-04-02 09:30:12', actor: 'System', role: 'System', action: 'System-Level Change Log', category: 'System', details: 'Updated RAG model version to v2.4.1', ip: 'internal', signature: 'sha256:d5c2...' },
  { id: '6', timestamp: '2026-04-02 08:45:00', actor: 'Director Khalid', role: 'Admin', action: 'PII Access Log', category: 'Security', details: 'Viewed sensitive student records for "At Risk" intervention', ip: '192.168.1.42', signature: 'sha256:b1a0...' },
];

export const AuditCompliance: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
            <ShieldCheck size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">SOC2 Status</p>
            <h3 className="text-lg font-black text-slate-900">Compliant</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
            <FileSignature size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Signed Logs</p>
            <h3 className="text-lg font-black text-slate-900">124,842</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl">
            <AlertCircle size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Security Alerts</p>
            <h3 className="text-lg font-black text-slate-900">2 Active</h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-black text-slate-900">Immutable Audit Ledger</h3>
            <p className="text-sm text-slate-500">Cryptographically signed logs for all privileged actions.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
              <Download size={14} /> Export for Audit
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
              Verify Integrity
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Timestamp</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Actor</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Action / Category</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Details</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Signature</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {AUDIT_LOGS.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-xs font-medium text-slate-500 whitespace-nowrap">{log.timestamp}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900">{log.actor}</span>
                      <span className="text-[10px] text-slate-400">{log.role}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-700">{log.action}</span>
                      <span className="text-[10px] text-indigo-500 font-bold uppercase tracking-widest">{log.category}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-600 max-w-xs">{log.details}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 px-2 py-1 bg-slate-50 rounded-lg border border-slate-100">
                      <Lock size={10} className="text-slate-400" />
                      <span className="text-[10px] font-mono text-slate-400 truncate w-20">{log.signature}</span>
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
