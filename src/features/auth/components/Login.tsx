import React, { useState } from 'react'
import { Shield, Lock, User, ArrowRight, AlertTriangle, Key } from 'lucide-react'
import { authService } from '../services/authService'

export interface LoginProps {
  onLogin: () => void
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('investigator')
  const [password, setPassword] = useState('demo123')
  const [role, setRole] = useState('Lead Investigator')
  const [error, setError] = useState('')

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault()
    const success = authService.login(username, password)
    if (success) {
      localStorage.setItem('sih-role', role)
      onLogin()
    } else {
      setError('Invalid credentials. Access Denied. Use: investigator / demo123')
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col justify-between p-6 sm:p-12 relative select-none">
      {/* Top Header */}
      <header className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="rounded bg-white/5 p-2 text-white font-bold">
            <Shield size={18} />
          </div>
          <div>
            <span className="text-sm font-black tracking-widest uppercase">LinkTracer</span>
            <span className="text-neutral-500 text-xs ml-2 font-mono">v1.0.4</span>
            <div className="text-[10px] text-neutral-400 font-mono tracking-wider">
              INTELLIGENCE & INVESTIGATION PLATFORM
            </div>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
          <span className="h-1.5 w-1.5 rounded-full bg-neutral-800 animate-pulse" />
          SECURE TERMINAL • NODE 01
        </div>
      </header>

      {/* Center Auth Container */}
      <div className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-sm border border-neutral-800 bg-[#09090B] rounded p-8 shadow-2xl">
          <div className="text-center mb-6">
            <div className="inline-flex p-2.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 mb-3">
              <Lock size={20} className="text-white" />
            </div>
            <h1 className="text-lg font-bold text-white tracking-wide uppercase">
              Operator Authentication
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Restricted Law Enforcement Intelligence Console
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase font-bold text-neutral-400 tracking-wider mb-1">
                User ID
              </label>
              <div className="relative">
                <User size={14} className="absolute left-3 top-2.5 text-neutral-500" />
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="intel-input pl-9"
                  placeholder="Enter User ID"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-neutral-400 tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <Key size={14} className="absolute left-3 top-2.5 text-neutral-500" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="intel-input pl-9"
                  placeholder="Enter Password"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-neutral-400 tracking-wider mb-1">
                Operational Role
              </label>
              <select
                value={role}
                onChange={e => setRole(e.target.value)}
                className="intel-select w-full"
              >
                <option value="Lead Investigator">Lead Investigator (Field & Dossier)</option>
                <option value="Intelligence Analyst">Intelligence Analyst (Graph & Centrality)</option>
                <option value="Forensic Officer">Forensic Officer (Telecom & CDR)</option>
                <option value="Supervisory Special Agent">Supervisory Special Agent (Command)</option>
              </select>
            </div>

            {error && (
              <div className="rounded border border-neutral-700 bg-neutral-800 p-2.5 text-xs text-neutral-400 flex items-center gap-2">
                <AlertTriangle size={14} />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-white/5 hover:bg-[#0077bd] text-white font-bold py-2 rounded text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-sm active:scale-[0.99]"
            >
              <span>Login</span>
              <ArrowRight size={14} />
            </button>
          </form>

          <div className="mt-6 border-t border-neutral-800 pt-4 text-[11px] text-neutral-400">
            <div className="font-semibold text-neutral-300 mb-1">Demo Access Credentials:</div>
            <div className="flex justify-between font-mono text-[10px] bg-black p-2 rounded border border-neutral-800">
              <span>User ID: <strong className="text-white">investigator</strong></span>
              <span>Pass: <strong className="text-white">demo123</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-800 pt-4 flex flex-wrap items-center justify-between text-[10px] text-neutral-500 font-mono">
        <div>SIH26189 CRIMINAL NETWORK INTELLIGENCE PLATFORM • PROTOTYPE DEMONSTRATION</div>
        <div>ALL DATA SYNTHETIC • NO REAL PERSONS OR RECORDS INVOLVED</div>
      </footer>
    </main>
  )
}
