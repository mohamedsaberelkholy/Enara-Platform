
import React, { useState } from 'react';
import { 
  Key, 
  ShieldCheck, 
  ShieldAlert, 
  Database, 
  User, 
  Building2, 
  CheckCircle2, 
  XCircle, 
  Loader2,
  ExternalLink,
  Lock,
  Zap,
  RefreshCw,
  PlusCircle,
  Phone,
  Mail,
  UserPlus,
  Copy,
  Check,
  ChevronDown
} from 'lucide-react';
import { validateAdminApiKey, createInstitutionWithApiKey } from '@/services/authService';
import { ApiKeyValidationResponse, InstitutionCreationResponse } from '@/types';

export const Integrations: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'validate' | 'add'>('validate');
  
  // Validation State
  const [apiKey, setApiKey] = useState('');
  const [adminId, setAdminId] = useState('');
  const [institutionId, setInstitutionId] = useState('');
  const [lmsId, setLmsId] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [result, setResult] = useState<ApiKeyValidationResponse | null>(null);

  // Creation State
  const [newInstName, setNewInstName] = useState('');
  const [newLmsSystem, setNewLmsSystem] = useState('');
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPhone, setNewAdminPhone] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [creationResult, setCreationResult] = useState<InstitutionCreationResponse | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsValidating(true);
    setResult(null);
    
    try {
      const response = await validateAdminApiKey({
        apiKey,
        adminIdentifier: adminId,
        institutionIdentifier: institutionId,
        lmsSystemId: lmsId || undefined
      });
      setResult(response);
    } catch (error) {
      console.error('Validation failed:', error);
    } finally {
      setIsValidating(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    setCreationResult(null);

    try {
      const response = await createInstitutionWithApiKey({
        institutionName: newInstName,
        lmsSystem: newLmsSystem,
        adminName: newAdminName,
        adminEmail: newAdminEmail,
        adminPhone: newAdminPhone
      });
      setCreationResult(response);
    } catch (error) {
      console.error('Creation failed:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const resetForm = () => {
    setApiKey('');
    setAdminId('');
    setInstitutionId('');
    setLmsId('');
    setResult(null);
    
    setNewInstName('');
    setNewLmsSystem('');
    setNewAdminName('');
    setNewAdminEmail('');
    setNewAdminPhone('');
    setCreationResult(null);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto animate-slide-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-crimson">Partner Integrations</h1>
          <p className="text-slate-500 mt-1">Manage, validate, and onboard partner institutions and LMS systems.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all flex items-center gap-2">
            <Database size={18} />
            API Documentation
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-slate-100 rounded-2xl w-fit mb-8">
        <button 
          onClick={() => setActiveTab('validate')}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'validate' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <ShieldCheck size={18} />
          Validate Key
        </button>
        <button 
          onClick={() => setActiveTab('add')}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'add' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <PlusCircle size={18} />
          Add Institution
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'validate' ? (
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">API Key Validator</h2>
                  <p className="text-sm text-slate-500">Verify administrator access and permissions.</p>
                </div>
              </div>

              <form onSubmit={handleValidate} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                      <Key size={14} className="text-slate-400" />
                      API Key (Bearer Token)
                    </label>
                    <input 
                      type="password" 
                      required
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="enara_live_..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-mono text-sm"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                        <User size={14} className="text-slate-400" />
                        Admin Identifier
                      </label>
                      <input 
                        type="text" 
                        required
                        value={adminId}
                        onChange={(e) => setAdminId(e.target.value)}
                        placeholder="Email or Admin ID"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 outline-none transition-all text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                        <Building2 size={14} className="text-slate-400" />
                        Institution Identifier
                      </label>
                      <input 
                        type="text" 
                        required
                        value={institutionId}
                        onChange={(e) => setInstitutionId(e.target.value)}
                        placeholder="Name or Org ID"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 outline-none transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                      <Zap size={14} className="text-slate-400" />
                      LMS System ID (Optional)
                    </label>
                    <input 
                      type="text" 
                      value={lmsId}
                      onChange={(e) => setLmsId(e.target.value)}
                      placeholder="e.g. canvas-lms-01"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-teal-500/10 outline-none transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="submit"
                    disabled={isValidating}
                    className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isValidating ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Validating...
                      </>
                    ) : (
                      <>
                        <ShieldCheck size={20} />
                        Validate Access
                      </>
                    )}
                  </button>
                  <button 
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-4 bg-slate-50 text-slate-600 rounded-2xl font-bold hover:bg-slate-100 transition-all"
                  >
                    <RefreshCw size={20} />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 sm:p-10 shadow-sm animate-slide-in">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shadow-inner">
                  <UserPlus size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight font-crimson">Add New Institution</h2>
                  <p className="text-sm text-slate-500 font-medium">Onboard a new partner and generate secure credentials.</p>
                </div>
              </div>

              <form onSubmit={handleCreate} className="space-y-8">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      Institution Name
                    </label>
                    <div className="relative group">
                      <Building2 size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                      <input 
                        type="text" 
                        required
                        value={newInstName}
                        onChange={(e) => setNewInstName(e.target.value)}
                        placeholder="e.g. Global Tech Institute"
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-medium"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      LMS System
                    </label>
                    <div className="relative group">
                      <Zap size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                      <select 
                        required
                        value={newLmsSystem}
                        onChange={(e) => setNewLmsSystem(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-medium appearance-none"
                      >
                        <option value="">Select LMS</option>
                        <option value="canvas">Canvas LMS</option>
                        <option value="moodle">Moodle</option>
                        <option value="blackboard">Blackboard</option>
                        <option value="google-classroom">Google Classroom</option>
                        <option value="custom">Custom Integration</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="h-px flex-1 bg-slate-100"></div>
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-4">Admin Contact Details</h3>
                    <div className="h-px flex-1 bg-slate-100"></div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                        Admin Full Name
                      </label>
                      <div className="relative group">
                        <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                        <input 
                          type="text" 
                          required
                          value={newAdminName}
                          onChange={(e) => setNewAdminName(e.target.value)}
                          placeholder="John Doe"
                          className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-medium"
                        />
                      </div>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                          Email Address
                        </label>
                        <div className="relative group">
                          <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                          <input 
                            type="email" 
                            required
                            value={newAdminEmail}
                            onChange={(e) => setNewAdminEmail(e.target.value)}
                            placeholder="admin@institution.edu"
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-medium"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                          Phone Number
                        </label>
                        <div className="relative group">
                          <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                          <input 
                            type="tel" 
                            required
                            value={newAdminPhone}
                            onChange={(e) => setNewAdminPhone(e.target.value)}
                            placeholder="+1 (555) 000-0000"
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm font-medium"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 flex gap-4">
                  <button 
                    type="submit"
                    disabled={isCreating}
                    className="flex-1 py-4.5 bg-indigo-600 text-white rounded-2xl font-black text-sm hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 flex items-center justify-center gap-3 disabled:opacity-50 active:scale-[0.98]"
                  >
                    {isCreating ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Generating Credentials...
                      </>
                    ) : (
                      <>
                        <Key size={20} />
                        Onboard & Generate API Key
                      </>
                    )}
                  </button>
                  <button 
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-4.5 bg-slate-50 text-slate-600 rounded-2xl font-bold hover:bg-slate-100 transition-all active:scale-[0.98]"
                  >
                    <RefreshCw size={20} />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Validation Results */}
          {activeTab === 'validate' && result && (
            <div className={`bg-white border rounded-[2.5rem] p-8 shadow-sm animate-slide-in ${
              result.isValid ? 'border-emerald-200' : 'border-red-200'
            }`}>
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    result.isValid ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                  }`}>
                    {result.isValid ? <CheckCircle2 size={24} /> : <ShieldAlert size={24} />}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Validation Result</h3>
                    <p className={`text-sm font-medium ${
                      result.isValid ? 'text-emerald-600' : 'text-red-600'
                    }`}>{result.message}</p>
                  </div>
                </div>
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  result.isValid ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                }`}>
                  {result.isValid ? 'Authorized' : 'Denied'}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Security Checks</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Key Status</span>
                      <span className={`font-bold capitalize ${
                        result.details?.apiKeyStatus === 'active' ? 'text-emerald-600' : 'text-red-600'
                      }`}>{result.details?.apiKeyStatus.replace('_', ' ')}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Admin Identity</span>
                      <span className={`font-bold ${
                        result.details?.adminMatch ? 'text-emerald-600' : 'text-red-600'
                      }`}>{result.details?.adminMatch ? 'Verified' : 'Mismatch'}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Institution Scope</span>
                      <span className={`font-bold ${
                        result.details?.institutionMatch ? 'text-emerald-600' : 'text-red-600'
                      }`}>{result.details?.institutionMatch ? 'Verified' : 'Mismatch'}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">LMS Integration</span>
                      <span className={`font-bold ${
                        result.details?.lmsMatch ? 'text-emerald-600' : 'text-red-600'
                      }`}>{result.details?.lmsMatch ? 'Verified' : 'Mismatch'}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Permissions Granted</h4>
                  <div className="flex flex-wrap gap-2">
                    {result.details?.permissions.length ? (
                      result.details.permissions.map((perm, i) => (
                        <span key={i} className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-lg border border-slate-200">
                          {perm}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-400 italic">No permissions found</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Creation Results */}
          {activeTab === 'add' && creationResult && (
            <div className="bg-white border border-indigo-200 rounded-[2.5rem] p-8 shadow-sm animate-slide-in">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Institution Onboarded</h3>
                  <p className="text-sm font-medium text-indigo-600">{creationResult.message}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Login Credentials</h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Username</p>
                      <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl">
                        <span className="text-sm font-mono">{creationResult.credentials?.username}</span>
                        <button 
                          onClick={() => copyToClipboard(creationResult.credentials?.username || '', 'user')}
                          className="text-slate-400 hover:text-indigo-600 transition-colors"
                        >
                          {copiedField === 'user' ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Password</p>
                      <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl">
                        <span className="text-sm font-mono">{creationResult.credentials?.password}</span>
                        <button 
                          onClick={() => copyToClipboard(creationResult.credentials?.password || '', 'pass')}
                          className="text-slate-400 hover:text-indigo-600 transition-colors"
                        >
                          {copiedField === 'pass' ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-indigo-900 text-white rounded-3xl shadow-lg shadow-indigo-200">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xs font-black text-indigo-300 uppercase tracking-widest">Unique API Key</h4>
                    <span className="px-2 py-0.5 bg-emerald-500 text-[8px] font-black uppercase rounded-md">Live</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/10 border border-white/10 rounded-2xl backdrop-blur-sm">
                    <span className="text-sm font-mono truncate mr-4">{creationResult.apiKey}</span>
                    <button 
                      onClick={() => copyToClipboard(creationResult.apiKey || '', 'key')}
                      className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-all"
                    >
                      {copiedField === 'key' ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                  <p className="text-[10px] text-indigo-300 mt-4 italic">
                    * This key is now associated with {newInstName} and can be used for all Enara API endpoints.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-900/20">
            <Lock className="text-teal-400 mb-6" size={32} />
            <h3 className="text-xl font-bold mb-2">Security Best Practices</h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              API keys should be treated with the same sensitivity as passwords. Never share them in plain text or commit them to public repositories.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <div className="w-5 h-5 rounded-full bg-teal-400/20 text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={12} />
                </div>
                <span className="text-slate-300">Rotate keys every 90 days</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <div className="w-5 h-5 rounded-full bg-teal-400/20 text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={12} />
                </div>
                <span className="text-slate-300">Use environment variables for storage</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <div className="w-5 h-5 rounded-full bg-teal-400/20 text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={12} />
                </div>
                <span className="text-slate-300">Restrict keys to specific IP ranges</span>
              </li>
            </ul>
          </div>

          <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Links</h3>
            <div className="space-y-3">
              <button className="w-full p-4 bg-slate-50 hover:bg-teal-50 text-slate-600 hover:text-teal-600 rounded-2xl text-sm font-bold transition-all flex items-center justify-between group">
                LMS Setup Guide
                <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button className="w-full p-4 bg-slate-50 hover:bg-teal-50 text-slate-600 hover:text-teal-600 rounded-2xl text-sm font-bold transition-all flex items-center justify-between group">
                Webhooks Config
                <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button className="w-full p-4 bg-slate-50 hover:bg-teal-50 text-slate-600 hover:text-teal-600 rounded-2xl text-sm font-bold transition-all flex items-center justify-between group">
                Developer Portal
                <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
