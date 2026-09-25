import React, { useState } from 'react'
import { Shield, Lock, User, ArrowRight, AlertTriangle, Key, Eye, EyeOff } from 'lucide-react'
import { authService } from '../services/authService'
import { ParticleCanvas } from './ParticleCanvas'

export interface LoginProps {
  onLogin: () => void
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('investigator')
  const [password, setPassword] = useState('demo123')
  const [role, setRole] = useState('Lead Investigator')
  const [showPassword, setShowPassword] = useState(false)
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
    <main className="min-h-screen sm:h-screen bg-black text-white flex flex-col justify-between px-4 py-3 sm:px-8 sm:py-5 relative select-none overflow-y-auto sm:overflow-hidden">
      {/* Background Particle Network */}
      <ParticleCanvas />

      {/* Top Header */}
      <header className="relative z-10 flex items-center justify-between border-b border-neutral-800/80 pb-3 sm:pb-3.5">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-white/10 border border-white/15 p-2 text-white font-bold shadow-md shadow-white/5 flex items-center justify-center">
            <Shield size={20} strokeWidth={2.2} />
          </div>
          <div>
            <div className="flex items-center">
              <span className="text-lg sm:text-xl font-black tracking-widest uppercase text-white leading-none">
                LinkTracer
              </span>
              <span className="text-neutral-400 text-[11px] sm:text-xs ml-2.5 font-mono px-2 py-0.5 rounded border border-neutral-800 bg-neutral-900/80 font-medium">
                v1.0.4
              </span>
            </div>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs sm:text-sm font-mono text-neutral-400 uppercase tracking-wider">
          <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
          Team ID : 155592
        </div>
      </header>

      {/* Center Auth Container */}
      <div className="relative z-10 flex-1 flex items-center justify-center py-2 sm:py-4">
        <div className="relative w-full max-w-sm">
          {/* Ambient white glow & shadow emanating from background of the central container */}
          <div
            className="absolute -inset-1.5 sm:-inset-2 rounded-2xl bg-white/20 blur-xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -inset-6 sm:-inset-10 rounded-full bg-white/10 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          {/* Central Login Card */}
          <div className="relative w-full border border-white/20 bg-[#09090b]/95 backdrop-blur-md rounded-2xl p-6 sm:p-7 shadow-[0_0_50px_rgba(255,255,255,0.18),0_0_100px_rgba(255,255,255,0.08),0_20px_40px_rgba(0,0,0,0.9)] ring-1 ring-white/15">
            <div className="text-center mb-4 sm:mb-5">
              <div className="inline-flex p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white mb-2 shadow-inner">
                <Lock size={20} className="text-white" />
              </div>
              <h1 className="text-base sm:text-lg font-bold text-white tracking-wide uppercase">
                Investigator Login
              </h1>
              <p className="text-[11px] sm:text-xs text-neutral-400 mt-0.5">
                Restricted Law Enforcement Intelligence Console
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-3 sm:space-y-3.5">
              <div>
                <label className="block text-[10px] uppercase font-bold text-neutral-400 tracking-wider mb-1">
                  User ID
                </label>
                <div className="relative flex items-center">
                  <User size={15} className="absolute left-3 text-neutral-400 pointer-events-none" />
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
                <div className="relative flex items-center">
                  <Key size={15} className="absolute left-3 text-neutral-400 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="intel-input pl-9 pr-10"
                    placeholder="Enter Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute right-3 p-1 text-neutral-400 hover:text-white transition-colors focus:outline-none cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
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
                <div className="rounded border border-neutral-700 bg-neutral-800 p-2.5 text-xs text-neutral-300 flex items-center gap-2">
                  <AlertTriangle size={15} className="text-amber-400 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#00629B] hover:bg-[#0077bd] text-white font-bold py-2.5 rounded-lg text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-sm hover:shadow-[0_0_15px_rgba(0,119,189,0.5)] active:scale-[0.99] cursor-pointer mt-1"
              >
                <span>Login</span>
                <ArrowRight size={15} />
              </button>
            </form>

            <div className="mt-4 border-t border-neutral-800/80 pt-3 text-[11px] text-neutral-400">
              <div className="font-semibold text-neutral-300 mb-1">Demo Access Credentials:</div>
              <div className="flex justify-between font-mono text-[10px] bg-black/80 p-2 rounded border border-neutral-800">
                <span>User ID: <strong className="text-white">investigator</strong></span>
                <span>Pass: <strong className="text-white">demo123</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-neutral-800/80 pt-3 pb-1 flex items-center justify-center text-center">
        <p className="text-center font-mono font-medium tracking-wide text-xs sm:text-[13px] text-neutral-400">
          SIH26189 CRIMINAL NETWORK INTELLIGENCE PLATFORM • PROTOTYPE DEMONSTRATION
        </p>
      </footer>
    </main>
  )
}
