'use client';
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, MessageSquare, Code, Users, Award, TrendingUp, BarChart3, LogOut, Send, CheckCircle, PlusCircle, LayoutDashboard, Trophy, ThumbsUp, AlertCircle, Briefcase, Github, Linkedin, Zap, Sparkles, Terminal } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const MOCK_USERS = [
  { id: 'u1', name: 'Aniket', email: 'aniket@niet.co.in', erpId: '0221BCA089', branch: 'BCA', year: 3, bio: 'Building vibe-coded multi-agent AI systems, IoT mesh architectures, and real-time automation tools.', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Aniket', rating: 4.9, reviews: 42, reputation: 1250, skills: [{ name: 'React', level: 'Advanced' }, { name: 'AI/ML', level: 'Advanced' }, { name: 'Python', level: 'Advanced' }], links: { github: '#' } },
  { id: 'u2', name: 'Riya Sharma', email: 'riya.s@niet.co.in', erpId: '0221CSE045', branch: 'CSE', year: 4, bio: 'UI/UX enthusiast and Frontend Engineer. Obsessed with clean micro-interactions and sleek aesthetics.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Riya', rating: 4.8, reviews: 31, reputation: 980, skills: [{ name: 'UI/UX', level: 'Advanced' }, { name: 'Figma', level: 'Advanced' }], links: { linkedin: '#' } },
  { id: 'u3', name: 'Aman Verma', email: 'aman.v@niet.co.in', erpId: '0221AI012', branch: 'CSE (AI/ML)', year: 2, bio: 'Data cruncher and algorithm builder. Training models by day, hacking systems by night.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aman', rating: 4.6, reviews: 19, reputation: 640, skills: [{ name: 'AI/ML', level: 'Advanced' }, { name: 'Python', level: 'Advanced' }], links: { github: '#' } }
];

export default function SkillSphere() {
  const [view, setView] = useState('landing');
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [search, setSearch] = useState('');

  const handleLogin = (email) => {
    if (email.endsWith('@niet.co.in')) {
      setUser(MOCK_USERS[0]);
      setView('dashboard');
    } else {
      alert("Verification Failed: Access restricted to @niet.co.in nodes.");
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 selection:bg-indigo-500/30 font-sans">
      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
            <div className="w-20 h-20 mb-8 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-indigo-500/20">
               <Sparkles className="text-white" size={40} />
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-gradient-to-r from-white via-zinc-400 to-zinc-800 bg-clip-text text-transparent">SkillSphere</h1>
            <p className="text-zinc-400 max-w-xl text-lg md:text-xl mb-12 font-medium">The high-rep networking node for NIET engineers, builders, and designers.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => setView('login')} className="px-10 py-5 bg-white text-black font-black rounded-2xl hover:scale-105 transition-all shadow-xl">Initialize Connection</button>
              <button className="px-10 py-5 bg-zinc-900 text-white font-bold rounded-2xl border border-zinc-800 hover:bg-zinc-800 transition-all">View Ecosystem</button>
            </div>
          </motion.div>
        )}

        {view === 'login' && (
          <motion.div key="login" className="flex items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-md p-10 rounded-3xl bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-3xl shadow-2xl">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Identity Node</h2>
                <p className="text-zinc-500 text-sm">Access keys required for institution validation.</p>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2 block">Institutional Email</label>
                  <input 
                    type="email" 
                    placeholder="name@niet.co.in" 
                    className="w-full h-14 px-5 bg-black border border-zinc-800 rounded-2xl focus:border-indigo-500 outline-none transition-all text-white font-medium"
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin(e.currentTarget.value)}
                  />
                </div>
                <button onClick={() => handleLogin('aniket@niet.co.in')} className="w-full h-14 bg-indigo-600 font-black rounded-2xl hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 transition-all">Authorize Profile</button>
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-[10px] text-zinc-500 leading-relaxed italic">
                  Note: Any input ending with @niet.co.in will pass for this demo version.
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {view === 'dashboard' && (
          <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex min-h-screen flex-col md:flex-row">
            <nav className="w-full md:w-72 border-r border-zinc-900 p-8 flex flex-col justify-between bg-zinc-950/50 backdrop-blur-xl">
              <div className="space-y-12">
                <div className="flex items-center gap-3 font-black text-2xl tracking-tighter cursor-pointer" onClick={() => setView('landing')}>
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20"><Zap size={20} className="fill-white"/></div>
                  Sphere
                </div>
                <div className="space-y-2">
                  {['Dashboard', 'Network Explore', 'Squad Board', 'Peer Chat', 'Leaderboard'].map(item => (
                    <button 
                      key={item} 
                      onClick={() => setActiveTab(item)}
                      className={`w-full text-left px-5 py-4 rounded-2xl transition-all text-sm font-bold ${activeTab === item ? 'bg-zinc-900 text-indigo-400 border border-zinc-800 shadow-inner' : 'text-zinc-500 hover:text-white hover:bg-zinc-900/50'}`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              <div className="pt-8 border-t border-zinc-900 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={user?.avatar} className="w-10 h-10 rounded-full border border-zinc-800" />
                  <div>
                    <p className="text-xs font-black text-white">{user?.name}</p>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase">{user?.branch} Node</p>
                  </div>
                </div>
                <button onClick={() => setView('landing')} className="p-2 text-zinc-600 hover:text-rose-500 transition-colors"><LogOut size={18}/></button>
              </div>
            </nav>

            <main className="flex-1 p-6 md:p-12 overflow-y-auto max-w-7xl mx-auto w-full">
              <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                <div>
                  <h2 className="text-3xl font-black tracking-tight text-white mb-1">Ecosystem Status</h2>
                  <p className="text-sm text-zinc-500 font-medium tracking-wide flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"/> Node operational across institutional network.</p>
                </div>
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-indigo-500 transition-colors" size={18}/>
                  <input 
                    type="text" 
                    placeholder="Query skills, branches, or names..." 
                    className="w-full md:w-80 h-12 pl-12 pr-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl focus:border-indigo-500 outline-none transition-all text-sm font-medium"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </header>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-10">
                  <section className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-black tracking-tight flex items-center gap-2 uppercase"><Trophy size={18} className="text-yellow-500"/> Verified Contributors</h3>
                      <button className="text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-indigo-400 transition-colors">Scan All Nodes</button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {MOCK_USERS.map(u => (
                        <motion.div 
                          whileHover={{ y: -5 }}
                          key={u.id} 
                          className="p-6 rounded-3xl bg-zinc-900/30 border border-zinc-900 hover:border-zinc-800 transition-all cursor-pointer group"
                        >
                          <div className="flex items-center justify-between mb-6">
                            <img src={u.avatar} className="w-12 h-12 rounded-2xl bg-zinc-950 border border-zinc-800 p-1" />
                            <div className="px-3 py-1 bg-black rounded-xl border border-zinc-900 text-[10px] font-black text-indigo-400 flex items-center gap-1.5 shadow-inner">
                              <Star size={10} className="fill-indigo-400"/> {u.rating}
                            </div>
                          </div>
                          <div className="mb-4">
                            <h4 className="font-black text-lg text-white group-hover:text-indigo-400 transition-colors">{u.name}</h4>
                            <p className="text-xs text-zinc-500 font-bold tracking-wide uppercase">{u.branch} Department • Year {u.year}</p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {u.skills.map(sk => (
                              <span key={sk.name} className="text-[9px] font-black uppercase px-2.5 py-1 rounded-md bg-zinc-950 border border-zinc-900 text-zinc-500 group-hover:text-zinc-300 transition-colors">{sk.name}</span>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </section>

                  <section className="p-8 rounded-3xl bg-zinc-900/20 border border-zinc-900 backdrop-blur-md">
                    <h3 className="text-lg font-black tracking-tight mb-8 flex items-center gap-2 uppercase"><TrendingUp size={18} className="text-indigo-500"/> Skill Saturation Graph</h3>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={[{n:'Jan', v:400},{n:'Feb', v:700},{n:'Mar', v:500},{n:'Apr', v:900},{n:'May', v:1200}]}>
                          <defs>
                            <linearGradient id="colorV" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="n" stroke="#27272a" fontSize={10} tickLine={false} axisLine={false} />
                          <Tooltip contentStyle={{background:'#09090b', border:'#18181b', borderRadius:'12px'}} />
                          <Area type="monotone" dataKey="v" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorV)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </section>
                </div>

                <div className="space-y-8">
                   <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-950/30 to-transparent border border-indigo-500/20 text-center shadow-2xl shadow-indigo-500/5">
                      <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-indigo-400">
                        <Sparkles size={24} />
                      </div>
                      <h4 className="text-xl font-black text-white mb-3 tracking-tight">Deploy Squad Opening</h4>
                      <p className="text-xs text-zinc-500 font-medium leading-relaxed mb-8">Initialize a team formation request for hackathons or research project nodes instantly.</p>
                      <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl transition-all shadow-lg shadow-indigo-600/10">Initialize Requirement</button>
                   </div>

                   <div className="p-8 rounded-3xl bg-zinc-900/30 border border-zinc-900 space-y-6">
                      <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500">Node Alerts</h4>
                      <div className="space-y-4">
                        <div className="flex gap-3 p-3 rounded-xl bg-black border border-zinc-900">
                          <div className="w-2 h-2 rounded-full bg-indigo-500 shrink-0 mt-1.5 animate-pulse" />
                          <p className="text-[10px] text-zinc-400 font-medium leading-relaxed">System identified 4 new <span className="text-white font-bold">React</span> specialists in CSE department.</p>
                        </div>
                        <div className="flex gap-3 p-3 rounded-xl bg-black border border-zinc-900">
                          <div className="w-2 h-2 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                          <p className="text-[10px] text-zinc-400 font-medium leading-relaxed">Upcoming <span className="text-white font-bold">HackNIET</span> project phase starts in 48 hours.</p>
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
