'use client';
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, MessageSquare, Users, Award, TrendingUp, LogOut, Send, PlusCircle, LayoutDashboard, Trophy, ThumbsUp, Zap, Sparkles, Terminal, Filter, ShieldCheck, UserPlus, KeyRound, Mail, User, GraduationCap, X, Link as LinkIcon } from 'lucide-react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

// ==========================================
// 1. DATA INFRASTRUCTURE (40+ COMPLETE PROFILES)
// ==========================================
const SEED_USERS = [
  { id: 'u1', name: 'Aniket Chaudhary', email: 'aniket@niet.co.in', erpId: '0221BCA089', branch: 'BCA', year: 3, bio: 'Building vibe-coded multi-agent AI systems, IoT mesh architectures, and backend automation engines.', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Aniket', collabs: 94, reputation: 1250, skills: [{ name: 'Python', level: 'Advanced' }, { name: 'Development', level: 'Advanced' }, { name: 'React', level: 'Advanced' }] },
  { id: 'u2', name: 'Riya Sharma', email: 'riya.s@niet.co.in', erpId: '0221CSE045', branch: 'CSE', year: 4, bio: 'UI/UX enthusiast and Frontend Engineer. Fine-tuning system design tokens and custom design specs.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Riya', collabs: 88, reputation: 980, skills: [{ name: 'Development', level: 'Advanced' }, { name: 'Painting', level: 'Advanced' }, { name: 'Figma', level: 'Advanced' }] },
  { id: 'u3', name: 'Aman Verma', email: 'aman.v@niet.co.in', erpId: '0221AI012', branch: 'CSE (AI/ML)', year: 2, bio: 'Data cruncher training custom layers by day, configuring network firewalls by night.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aman', collabs: 72, reputation: 640, skills: [{ name: 'Python', level: 'Advanced' }, { name: 'C++', level: 'Intermediate' }] },
  { id: 'u4', name: 'Sneha Reddy', email: 'sneha.r@niet.co.in', erpId: '0221CS098', branch: 'CSE', year: 3, bio: 'Full-stack software developer who loves creative arts, stage acting, and building server edge functions.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha', collabs: 69, reputation: 810, skills: [{ name: 'Development', level: 'Advanced' }, { name: 'Acting', level: 'Advanced' }, { name: 'Java', level: 'Intermediate' }] },
  { id: 'u5', name: 'Vikram Malhotra', email: 'vikram.m@niet.co.in', erpId: '0221CY022', branch: 'Cybersecurity', year: 4, bio: 'Penetration tester focused on core runtime systems. Managing local tech startup initiatives.', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Vikram', collabs: 66, reputation: 1120, skills: [{ name: 'Entrepreneurship', level: 'Advanced' }, { name: 'Python', level: 'Advanced' }] },
  { id: 'u6', name: 'Divya Teja', email: 'divya.t@niet.co.in', erpId: '0221EC078', branch: 'Electronics', year: 3, bio: 'Embedded system firmware designer. Classical dancer and video choreographer outside labs.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Divya', collabs: 51, reputation: 590, skills: [{ name: 'Dancing', level: 'Advanced' }, { name: 'C++', level: 'Advanced' }] },
  { id: 'u7', name: 'Aditya Joshi', email: 'aditya.j@niet.co.in', erpId: '0221DS034', branch: 'Data Science', year: 2, bio: 'Analyzing statistical arrays. Hobbyist canvas painter working with oil medium textures.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aditya', collabs: 48, reputation: 480, skills: [{ name: 'Painting', level: 'Advanced' }, { name: 'Python', level: 'Intermediate' }] },
  { id: 'u8', name: 'Ishita Kapoor', email: 'ishita.k@niet.co.in', erpId: '0221CSE091', branch: 'CSE', year: 3, bio: 'Western dance coordinator and interface developer creating modular style primitives.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ishita', collabs: 45, reputation: 920, skills: [{ name: 'Dancing', level: 'Advanced' }, { name: 'Development', level: 'Intermediate' }] },
  { id: 'u9', name: 'Arjun Mehta', email: 'arjun.m@niet.co.in', erpId: '0221BCA054', branch: 'BCA', year: 4, bio: 'SaaS framework developer specialized in high-performance Java enterprise applications.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun', collabs: 42, reputation: 1180, skills: [{ name: 'Java', level: 'Advanced' }, { name: 'Development', level: 'Advanced' }, { name: 'Entrepreneurship', level: 'Advanced' }] },
  { id: 'u10', name: 'Kriti Singhal', email: 'kriti.s@niet.co.in', erpId: '0221DS011', branch: 'Data Science', year: 4, bio: 'Theater artist, public orator, and analytical database layout developer.', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kriti', collabs: 39, reputation: 1040, skills: [{ name: 'Acting', level: 'Advanced' }, { name: 'Python', level: 'Advanced' }] }
];

const SKILL_POOL = ['Painting', 'Dancing', 'Acting', 'C++', 'Java', 'Python', 'Development', 'Entrepreneurship'];
const FIRST_NAMES = ['Yash', 'Siddharth', 'Gaurav', 'Ayush', 'Ritik', 'Karan', 'Pooja', 'Anjali', 'Swati', 'Preeti', 'Simran', 'Rohan', 'Kabir', 'Tanvi', 'Mehak'];
const LAST_NAMES = ['Verma', 'Singh', 'Kumar', 'Mishra', 'Yadav', 'Sharma', 'Choudhary', 'Patel', 'Reddy', 'Gupta'];
const BRANCHES = ['CSE', 'BCA', 'CSE (AI/ML)', 'Cybersecurity', 'Data Science', 'Electronics'];

for (let i = 11; i <= 42; i++) {
  const sk1 = SKILL_POOL[i % SKILL_POOL.length];
  const sk2 = SKILL_POOL[(i + 4) % SKILL_POOL.length];
  const fn = FIRST_NAMES[i % FIRST_NAMES.length];
  const ln = LAST_NAMES[i % LAST_NAMES.length];
  
  SEED_USERS.push({
    id: `u${i}`,
    name: `${fn} ${ln}`,
    email: `${fn.toLowerCase()}.${ln.toLowerCase()}@niet.co.in`,
    erpId: `0221CS${250 + i}`,
    branch: BRANCHES[i % BRANCHES.length],
    year: (i % 4) + 1,
    bio: `Verified institutional profile node specialized in technical production loops and active workspace operations.`,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${fn}${i}`,
    collabs: i + 2, 
    reputation: 200 + (i * 20),
    skills: [{ name: sk1, level: 'Advanced' }, { name: sk2, level: 'Intermediate' }]
  });
}

const INITIAL_COLLAB_POSTS = [
  { id: 'p1', title: 'Hackathon Partner Needed for Smart Campus System', creatorName: 'Riya Sharma', tag: 'Hackathon', desc: 'Looking for a solid Python developer to integrate core data assets into our application layers.', skills: ['Python', 'Development'], likes: 24, applied: false },
  { id: 'p2', title: 'E-Commerce UI Revamp & Creative Arts Portal', creatorName: 'Aniket Chaudhary', tag: 'Project', desc: 'Need a creative profile to deploy custom presentation pages for college art societies.', skills: ['Painting', 'Development'], likes: 42, applied: false }
];

// ==========================================
// 2. RUNTIME CORE SYSTEM ENGINE
// ==========================================
export default function SkillSphere() {
  const [view, setView] = useState<'auth' | 'dashboard'>('auth');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  
  const [networkUsers, setNetworkUsers] = useState(SEED_USERS);
  const [user, setUser] = useState<typeof SEED_USERS[0] | null>(null);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<typeof SEED_USERS[0] | null>(null);
  
  const [signUpData, setSignUpData] = useState({
    name: '', email: '', erpId: '', branch: 'CSE', year: '1', bio: '', skills: ''
  });

  const [collabPosts, setCollabPosts] = useState(INITIAL_COLLAB_POSTS);
  const [modalOpen, setModalOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', desc: '', tag: 'Project', skills: '' });
  
  const [activeChatIdx, setActiveChatIdx] = useState(0);
  const [chatInput, setChatInput] = useState('');
  const [chatChannels, setChatChannels] = useState([
    { name: 'Riya Sharma', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Riya', msgs: [{ s: 'them', t: 'Hey Aniket, did you see the new painting profiles added to the registry?' }, { s: 'you', t: 'Yeah, just updated the layout matrix filters to rank them.' }] },
    { name: 'Aman Verma', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aman', msgs: [{ s: 'them', t: 'Can we test out the new C++ structural components tomorrow?' }] }
  ]);

  const handleLogin = (email: string) => {
    if (!email.toLowerCase().endsWith('@niet.co.in')) {
      alert("Access Denied: Node restricted to verified @niet.co.in credentials.");
      return;
    }
    const matchedProfile = networkUsers.find(u => u.email.toLowerCase() === email.toLowerCase()) || networkUsers[0];
    setUser(matchedProfile);
    setView('dashboard');
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpData.name || !signUpData.email || !signUpData.erpId) return;
    
    const skillsArr = signUpData.skills.split(',').map(s => s.trim()).filter(Boolean).map(s => ({ name: s, level: 'Advanced' as const }));
    const created = {
      id: `u_${Date.now()}`,
      name: signUpData.name,
      email: signUpData.email.toLowerCase(),
      erpId: signUpData.erpId,
      branch: signUpData.branch,
      year: parseInt(signUpData.year),
      bio: signUpData.bio || "Verified member of the NIET platform matrix hub.",
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${signUpData.name.replace(/\s+/g, '')}`,
      collabs: 0,
      reputation: 120,
      skills: skillsArr.length ? skillsArr : [{ name: 'Development', level: 'Advanced' as const }]
    };

    setNetworkUsers([created, ...networkUsers]);
    setUser(created);
    setView('dashboard');
  };

  // STRICT SEARCH FILTER WITH DESCENDING VALUE ORDERING (STAR ORDER MATRIX)
  const reactiveSearchMatrix = useMemo(() => {
    const term = search.toLowerCase().trim();
    return networkUsers.filter(u => {
      return (
        u.name.toLowerCase().includes(term) ||
        u.branch.toLowerCase().includes(term) ||
        u.skills.some(s => s.name.toLowerCase().includes(term))
      );
    }).sort((a, b) => b.collabs - a.collabs);
  }, [search, networkUsers]);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 selection:bg-indigo-500/30 font-sans antialiased overflow-x-hidden">
      <AnimatePresence mode="wait">
        
        {/* PHASE: DUAL-MODE LOGGING PORTAL */}
        {view === 'auth' && (
          <div className="min-h-screen flex items-center justify-center p-4 max-w-lg mx-auto">
            <div className="w-full p-8 md:p-10 rounded-3xl bg-zinc-900/40 border border-zinc-800/60 backdrop-blur-3xl shadow-2xl space-y-8">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg"><Sparkles className="text-white" size={24}/></div>
                <h1 className="text-3xl font-black tracking-tight text-white">SkillSphere Gateway</h1>
                <p className="text-xs text-zinc-500 max-w-xs font-medium">Verify campus profile credentials to interface with the network matrix.</p>
              </div>

              <div className="flex bg-black p-1 rounded-xl border border-zinc-900">
                <button type="button" onClick={() => setAuthMode('login')} className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${authMode === 'login' ? 'bg-zinc-900 text-indigo-400 border border-zinc-800' : 'text-zinc-500'}`}>Node Log In</button>
                <button type="button" onClick={() => setAuthMode('signup')} className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-all ${authMode === 'signup' ? 'bg-zinc-900 text-indigo-400 border border-zinc-800' : 'text-zinc-500'}`}>Create Account</button>
              </div>

              {authMode === 'login' ? (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">College Email Endpoint</label>
                    <input type="email" id="logEmail" placeholder="your.name@niet.co.in" className="w-full h-12 px-4 bg-black border border-zinc-800 rounded-xl focus:border-indigo-500 outline-none text-white text-sm font-medium" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Access Password</label>
                    <input type="password" placeholder="Any passphrase accepted for presentation flow..." className="w-full h-12 px-4 bg-black border border-zinc-800 rounded-xl focus:border-indigo-500 outline-none text-white text-sm font-medium" onKeyDown={e=>e.key==='Enter'&&handleLogin((document.getElementById('logEmail') as HTMLInputElement)?.value||'aniket@niet.co.in')} />
                  </div>
                  <button type="button" onClick={() => handleLogin((document.getElementById('logEmail') as HTMLInputElement)?.value || 'aniket@niet.co.in')} className="w-full h-12 bg-indigo-600 font-black text-sm rounded-xl text-white shadow-lg">Authorize Node Profile</button>
                </div>
              ) : (
                <form onSubmit={handleSignupSubmit} className="space-y-4 max-h-[380px] overflow-y-auto pr-1">
                  <input type="text" required placeholder="Full Name..." className="w-full h-11 px-4 bg-black border border-zinc-800 rounded-xl text-xs text-white outline-none" value={signUpData.name} onChange={e=>setSignUpData({...signUpData, name: e.target.value})} />
                  <input type="email" required placeholder="name@niet.co.in" className="w-full h-11 px-4 bg-black border border-zinc-800 rounded-xl text-xs text-white outline-none" value={signUpData.email} onChange={e=>setSignUpData({...signUpData, email: e.target.value})} />
                  <input type="text" required placeholder="ERP ID (e.g., 0221BCA089)" className="w-full h-11 px-4 bg-black border border-zinc-800 rounded-xl text-xs text-white outline-none" value={signUpData.erpId} onChange={e=>setSignUpData({...signUpData, erpId: e.target.value})} />
                  <div className="grid grid-cols-2 gap-3">
                    <select className="w-full h-11 px-3 bg-black border border-zinc-800 rounded-xl text-xs text-zinc-400 outline-none" value={signUpData.branch} onChange={e=>setSignUpData({...signUpData, branch: e.target.value})}>
                      {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                    <select className="w-full h-11 px-3 bg-black border border-zinc-800 rounded-xl text-xs text-zinc-400 outline-none" value={signUpData.year} onChange={e=>setSignUpData({...signUpData, year: e.target.value})}>
                      {['1','2','3','4'].map(y => <option key={y} value={y}>Year {y}</option>)}
                    </select>
                  </div>
                  <input type="text" placeholder="Skills (e.g. Painting, C++, Java, Development)" className="w-full h-11 px-4 bg-black border border-zinc-800 rounded-xl text-xs text-white outline-none" value={signUpData.skills} onChange={e=>setSignUpData({...signUpData, skills: e.target.value})} />
                  <textarea placeholder="Brief presentation bio..." rows={2} className="w-full p-3 bg-black border border-zinc-800 rounded-xl text-xs text-white outline-none resize-none" value={signUpData.bio} onChange={e=>setSignUpData({...signUpData, bio: e.target.value})} />
                  <button type="submit" className="w-full h-11 bg-indigo-600 font-black text-xs rounded-xl text-white uppercase tracking-wider">Initialize Onboarding Vector</button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* PHASE: CORE DASHBOARD WINDOW CORE */}
        {view === 'dashboard' && (
          <div className="flex min-h-screen flex-col md:flex-row">
            
            {/* Nav Menu Drawer */}
            <nav className="w-full md:w-72 border-r border-zinc-900 p-8 flex flex-col justify-between bg-zinc-950/40 backdrop-blur-xl shrink-0">
              <div className="space-y-12">
                <div className="flex items-center gap-3 font-black text-2xl tracking-tighter cursor-pointer" onClick={() => { setActiveTab('Dashboard'); setSearch(''); }}>
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg"><Zap size={20} className="fill-white text-white"/></div>
                  <span className="bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">Sphere</span>
                </div>
                <div className="space-y-2">
                  {['Dashboard', 'Network Explore', 'Squad Board', 'Peer Chat', 'Leaderboard'].map(label => (
                    <button key={label} onClick={() => { setActiveTab(label); }} className={`w-full text-left px-5 py-4 rounded-2xl text-sm font-bold transition-all ${activeTab === label ? 'bg-zinc-900 text-indigo-400 border border-zinc-800 shadow-inner' : 'text-zinc-500 hover:text-white hover:bg-zinc-900/50'}`}>{label}</button>
                  ))}
                </div>
              </div>
              <div className="pt-8 border-t border-zinc-900 flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <img src={user?.avatar} className="w-10 h-10 rounded-full border border-zinc-800 shrink-0" alt="" />
                  <div className="min-w-0">
                    <p className="text-xs font-black text-white truncate">{user?.name}</p>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase truncate">{user?.branch} Dept</p>
                  </div>
                </div>
                <button type="button" onClick={() => setView('auth')} className="p-2 text-zinc-600 hover:text-rose-500 transition-colors shrink-0"><LogOut size={18}/></button>
              </div>
            </nav>

            {/* Display Window */}
            <main className="flex-1 p-6 md:p-12 overflow-y-auto max-w-7xl mx-auto w-full">
              <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                <div>
                  <h2 className="text-3xl font-black tracking-tight text-white mb-1">{search ? 'Search Stream Results' : activeTab}</h2>
                  <p className="text-xs text-zinc-500 font-medium tracking-wide flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" /> Verified Campus Identity Framework Live Sandbox.</p>
                </div>
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18}/>
                  <input type="text" placeholder="Filter e.g. Painting, C++, Java, CSE..." className="w-full md:w-85 h-12 pl-12 pr-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl text-sm text-indigo-400 font-mono uppercase focus:outline-none focus:border-indigo-500 transition-all" value={search} onChange={e=>setSearch(e.target.value)} />
                </div>
              </header>

              <div className="h-full">
                {search.trim() !== '' ? (
                  <div className="space-y-6">
                    <p className="text-xs font-bold text-zinc-500 uppercase">Query Matches ({reactiveSearchMatrix.length} Profiles Found Ranked By Star Count)</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {reactiveSearchMatrix.map(u => (
                        <div key={u.id} onClick={() => setSelectedStudent(u)} className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800 hover:border-indigo-500/40 cursor-pointer transition-all flex flex-col justify-between h-60 shadow-xl group">
                          <div>
                            <div className="flex items-start justify-between mb-4 gap-2">
                              <div className="flex items-center gap-3 min-w-0">
                                <img src={u.avatar} className="w-11 h-11 rounded-xl bg-zinc-950 p-1 border border-zinc-800 shrink-0" alt="" />
                                <div className="min-w-0"><h4 className="font-black text-sm text-white group-hover:text-indigo-400 transition-colors truncate">{u.name}</h4><p className="text-[10px] text-zinc-500 font-bold uppercase truncate">{u.branch} • Year {u.year}</p></div>
                              </div>
                              <div className="px-2.5 py-1 bg-black rounded-xl border border-zinc-800 text-[10px] font-black text-yellow-500 flex items-center gap-1 shrink-0"><Star size={10} className="fill-yellow-500"/> {u.collabs} Stars</div>
                            </div>
                            <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed font-normal">{u.bio}</p>
                          </div>
                          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-900/60">
                            {u.skills.map(s => <span key={s.name} className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-zinc-950 text-zinc-400 border border-zinc-800">{s.name}</span>)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    {activeTab === 'Dashboard' && (
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        <div className="lg:col-span-2 space-y-10">
                          <section className="space-y-6">
                            <h3 className="text-base font-black uppercase text-zinc-400 flex items-center gap-2"><Award size={18} className="text-indigo-400"/> Network Profiles (Star Count Ranked)</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {reactiveSearchMatrix.slice(0, 4).map(u => (
                                <div key={u.id} onClick={() => setSelectedStudent(u)} className="p-6 rounded-3xl bg-zinc-900/30 border border-zinc-800 hover:border-indigo-500/40 transition-all cursor-pointer group flex flex-col justify-between h-56 shadow-md">
                                  <div>
                                    <div className="flex items-center justify-between mb-4 gap-2">
                                      <img src={u.avatar} className="w-12 h-12 rounded-2xl bg-zinc-950 p-1 border border-zinc-800 shrink-0" alt="" />
                                      <div className="px-2.5 py-1 bg-black rounded-xl border border-zinc-800 text-[10px] font-black text-yellow-500 flex items-center gap-1"><Star size={10} className="fill-yellow-500"/> {u.collabs} Stars</div>
                                    </div>
                                    <h4 className="font-black text-base text-white group-hover:text-indigo-400 transition-colors truncate">{u.name}</h4>
                                    <p className="text-xs text-zinc-500 font-bold uppercase mt-0.5">{u.branch} Dept • Year {u.year}</p>
                                    <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed font-normal">{u.bio}</p>
                                  </div>
                                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-900/60 mt-2">
                                    {u.skills.slice(0,3).map(s => <span key={s.name} className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-zinc-950 text-zinc-500">{s.name}</span>)}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </section>
                          
                          <section className="p-8 rounded-3xl bg-zinc-900/20 border border-zinc-900 backdrop-blur-md">
                            <h3 className="text-base font-black mb-8 uppercase text-zinc-400 flex items-center gap-2"><TrendingUp size={18} className="text-indigo-500"/> Ecosystem Telemetry Logs</h3>
                            <div className="h-64 w-full">
                              <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={[{n:'Jan', v:400},{n:'Feb', v:720},{n:'Mar', v:610},{n:'Apr', v:940},{n:'May', v:1350}]} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                  <XAxis dataKey="n" stroke="#27272a" fontSize={10} tickLine={false} />
                                  <Tooltip contentStyle={{background:'#09090b', borderColor:'#18181b', borderRadius:'12px'}} />
                                  <Area type="monotone" dataKey="v" stroke="#6366f1" strokeWidth={3} fillOpacity={0.1} fill="#6366f1" />
                                </AreaChart>
                              </ResponsiveContainer>
                            </div>
                          </section>
                        </div>
                        <div className="space-y-8">
                          <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-950/30 to-transparent border border-indigo-500/20 text-center shadow-2xl">
                            <Sparkles className="mx-auto mb-4 text-indigo-400" size={28} />
                            <h4 className="text-lg font-black text-white mb-2 tracking-tight">Need a Squad Node?</h4>
                            <p className="text-xs text-zinc-500 font-medium mb-6">Broadcast layout parameters onto the global community telemetry stream.</p>
                            <button type="button" onClick={() => setActiveTab('Squad Board')} className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-2xl text-xs uppercase tracking-wider">Open Squad Post</button>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'Network Explore' && (
                      <div className="space-y-6">
                        <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                          <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Active Network Directory Index ({reactiveSearchMatrix.length} Star-Sorted Nodes)</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {reactiveSearchMatrix.map(u => (
                            <div key={u.id} onClick={() => setSelectedStudent(u)} className="p-6 rounded-3xl bg-zinc-900/20 border border-zinc-900 hover:border-zinc-800 transition-all flex flex-col justify-between h-60 shadow-md cursor-pointer group">
                              <div>
                                <div className="flex items-start justify-between mb-4 gap-2">
                                  <div className="flex items-center gap-3 min-w-0">
                                    <img src={u.avatar} className="w-11 h-11 rounded-xl bg-zinc-950 p-1 border border-zinc-800 shrink-0" alt="" />
                                    <div className="min-w-0">
                                      <h4 className="font-black text-sm text-white group-hover:text-indigo-400 transition-colors truncate">{u.name}</h4>
                                      <p className="text-[10px] text-zinc-500 font-bold uppercase truncate">{u.branch} • Yr {u.year}</p>
                                    </div>
                                  </div>
                                  <div className="px-2.5 py-1 bg-black rounded-xl border border-zinc-800 text-[10px] font-black text-yellow-500 flex items-center gap-1 shrink-0 whitespace-nowrap"><Star size={10} className="fill-yellow-500"/> {u.collabs} Stars</div>
                                </div>
                                <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed font-normal">{u.bio}</p>
                              </div>
                              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-900/60">
                                {u.skills.map(s => <span key={s.name} className="text-[9px] font-black uppercase px-2.5 py-0.5 rounded bg-zinc-950 border border-zinc-900 text-zinc-400">{s.name}</span>)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 'Squad Board' && (
                      <div className="max-w-3xl mx-auto space-y-6">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Active System Pipeline Formations</p>
                          <button type="button" onClick={() => setModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-white text-black font-black text-xs rounded-xl shadow-md"><PlusCircle size={14}/> Create Post</button>
                        </div>
                        <div className="space-y-4">
                          {collabPosts.map(post => (
                            <div key={post.id} className="p-6 rounded-3xl bg-zinc-900/30 border border-zinc-900 space-y-4">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-black text-zinc-300">{post.creatorName}</span>
                                <span className="text-[9px] font-black tracking-widest uppercase bg-indigo-500/10 px-2.5 py-1 border border-indigo-500/20 rounded-md text-indigo-400">{post.tag}</span>
                              </div>
                              <div>
                                <h4 className="text-base font-black text-white tracking-tight mb-1">{post.title}</h4>
                                <p className="text-xs text-zinc-400 leading-relaxed font-normal">{post.desc}</p>
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {post.skills.map(sk => <span key={sk} className="text-[9px] font-black uppercase px-2 py-0.5 bg-black rounded border border-zinc-800 text-zinc-500">{sk}</span>)}
                              </div>
                              <div className="pt-4 border-t border-zinc-900/60 flex items-center justify-between">
                                <button type="button" onClick={() => setCollabPosts(prev => prev.map(p => p.id === post.id ? { ...p, likes: p.likes + 1 } : p))} className="flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-zinc-300"><ThumbsUp size={12}/> {post.likes} Upvotes</button>
                                <button type="button" onClick={() => setCollabPosts(prev => prev.map(p => p.id === post.id ? { ...p, applied: true } : p))} className={`px-4 py-1.5 rounded-xl text-xs font-black border transition-all ${post.applied ? 'bg-zinc-950 text-emerald-500 border-transparent' : 'bg-zinc-900 border-zinc-800 text-zinc-200'}`}>{post.applied ? 'Linked' : 'Apply Node'}</button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 'Peer Chat' && (
                      <div className="h-[calc(100vh-240px)] border border-zinc-900 rounded-3xl overflow-hidden bg-zinc-950/20 backdrop-blur-md flex">
                        <div className="w-80 border-r border-zinc-900 flex flex-col bg-zinc-950/40">
                          {chatChannels.map((ch, idx) => (
                            <div key={idx} onClick={() => setActiveChatIdx(idx)} className={`p-4 flex items-center gap-3 cursor-pointer transition-colors ${idx === activeChatIdx ? 'bg-zinc-900' : 'hover:bg-zinc-900/30'}`}>
                              <img src={ch.avatar} className="w-9 h-9 rounded-full bg-zinc-800" alt="" />
                              <div className="min-w-0"><p className="text-xs font-black text-white truncate">{ch.name}</p><p className="text-[10px] text-zinc-500 truncate font-normal">{ch.msgs[ch.msgs.length - 1]?.t}</p></div>
                            </div>
                          ))}
                        </div>
                        <div className="flex-1 flex flex-col justify-between bg-black/10">
                          <div className="p-4 bg-zinc-950/40 border-b border-zinc-900 text-xs font-black text-zinc-300 uppercase flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Channel Session: {chatChannels[activeChatIdx].name}</div>
                          <div className="flex-1 p-6 overflow-y-auto space-y-4">
                            {chatChannels[activeChatIdx].msgs.map((m, i) => (
                              <div key={i} className={`flex ${m.s === 'you' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-xs p-3.5 rounded-2xl text-xs font-medium ${m.s === 'you' ? 'bg-zinc-900 text-white border border-zinc-800 rounded-br-none' : 'bg-black border border-zinc-900 text-zinc-300 rounded-bl-none'}`}>{m.t}</div>
                              </div>
                            ))}
                          </div>
                          <form onSubmit={e => {
                            e.preventDefault(); if(!chatInput.trim()) return;
                            const copy = [...chatChannels]; copy[activeChatIdx].msgs.push({ s: 'you', t: chatInput.trim() });
                            setChatChannels(copy); setChatInput('');
                            setTimeout(() => { copy[activeChatIdx].msgs.push({ s: 'them', t: 'Institutional pipeline acknowledgement bit mapped.' }); setChatChannels([...copy]); }, 800);
                          }} className="p-4 border-t border-zinc-900 flex gap-3 bg-zinc-950/40">
                            <input type="text" placeholder="Type data stream payload text blocks..." className="flex-1 bg-black border border-zinc-800 h-11 px-4 rounded-xl text-xs text-white outline-none" value={chatInput} onChange={e=>setChatInput(e.target.value)} />
                            <button type="submit" className="w-11 h-11 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-center text-white"><Send size={14}/></button>
                          </form>
                        </div>
                      </div>
                    )}

                    {activeTab === 'Leaderboard' && (
                      <div className="max-w-2xl mx-auto space-y-4">
                        <div className="p-4 bg-zinc-900/40 border border-zinc-800/80 rounded-2xl text-xs font-bold text-zinc-400 flex items-center gap-3"><ShieldCheck className="text-indigo-400" size={16}/> <span>Rank metrics mapped from core active reputation parameters.</span></div>
                        <div className="border border-zinc-900 rounded-2xl overflow-hidden bg-zinc-950/20">
                          {networkRankedLeaderboard.map((u, i) => (
                            <div key={u.id} className="p-4 flex items-center justify-between border-b border-zinc-900/60 last:border-b-0 hover:bg-zinc-900/20 transition-all">
                              <div className="flex items-center gap-4 min-w-0">
                                <span className={`w-6 h-6 rounded font-mono text-xs font-black flex items-center justify-center ${i === 0 ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-zinc-950 text-zinc-500'}`}>{i + 1}</span>
                                <img src={u.avatar} className="w-9 h-9 rounded-full bg-zinc-800" alt="" />
                                <div className="min-w-0"><h4 className="text-xs font-black text-white truncate">{u.name}</h4><p className="text-[10px] text-zinc-500 font-bold uppercase truncate">{u.branch} • Yr {u.year}</p></div>
                              </div>
                              <span className="font-mono text-xs font-black text-indigo-400 bg-indigo-500/5 px-2.5 py-1 rounded-md border border-indigo-500/10 shrink-0">{u.reputation} XP</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </main>

            {/* DYNAMIC CARD SELECTION METRIC MODAL INFRASTRUCTURE */}
            <AnimatePresence>
              {selectedStudent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedStudent(null)} />
                  <motion.div initial={{ opacity: 0, scale: 0.95, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 15 }} className="bg-[#0e0e11] border border-zinc-800/80 w-full max-w-lg rounded-3xl p-6 md:p-8 relative z-10 shadow-2xl">
                    <button type="button" onClick={() => setSelectedStudent(null)} className="absolute top-5 right-5 p-2 hover:bg-zinc-900 text-zinc-400 hover:text-white rounded-full transition-colors"><X size={18} /></button>
                    
                    <div className="flex flex-col items-center text-center mb-6">
                      <img src={selectedStudent.avatar} className="w-20 h-20 bg-zinc-950 rounded-2xl p-2 border border-indigo-500/20 mb-3" alt="" />
                      <h3 className="text-2xl font-black text-white tracking-tight">{selectedStudent.name}</h3>
                      <p className="text-xs font-bold text-indigo-400 uppercase tracking-wide mt-0.5">{selectedStudent.branch} Engineering Network Node • Year {selectedStudent.year}</p>
                    </div>

                    <div className="space-y-3.5">
                      <div className="p-4 bg-black rounded-xl border border-zinc-900 flex items-center gap-4">
                        <Mail className="text-zinc-500 shrink-0" size={18} />
                        <div className="min-w-0"><p className="text-[9px] font-black uppercase tracking-widest text-zinc-500 leading-none mb-1">Institutional Email ID</p><p className="text-xs font-mono font-medium text-zinc-300 select-all truncate">{selectedStudent.email}</p></div>
                      </div>

                      <div className="p-4 bg-black rounded-xl border border-zinc-900 flex items-center gap-4">
                        <User className="text-zinc-500 shrink-0" size={18} />
                        <div className="min-w-0"><p className="text-[9px] font-black uppercase tracking-widest text-zinc-500 leading-none mb-1">Institutional ERP ID</p><p className="text-xs font-mono font-bold tracking-wider text-zinc-300 select-all">{selectedStudent.erpId}</p></div>
                      </div>

                      <div className="p-4 bg-black rounded-xl border border-zinc-900 flex items-center gap-4">
                        <GraduationCap className="text-zinc-500 shrink-0" size={18} />
                        <div className="min-w-0"><p className="text-[9px] font-black uppercase tracking-widest text-zinc-500 leading-none mb-1">Core Department Node</p><p className="text-xs font-bold text-zinc-300">{selectedStudent.branch} Division Cluster</p></div>
                      </div>

                      <div className="p-4 bg-black rounded-xl border border-zinc-900">
                        <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500 leading-none mb-2">Capabilities / Focus Area</p>
                        <p className="text-xs text-zinc-400 font-medium leading-relaxed mb-3">{selectedStudent.bio}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedStudent.skills.map(s => <span key={s.name} className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">{s.name}</span>)}
                        </div>
                      </div>
                    </div>

                    <button type="button" onClick={() => { alert(`Connection transmission request initialized for ${selectedStudent.name}. Handshake handshake protocol logged to institutional cluster nodes.`); setSelectedStudent(null); }} className="w-full mt-6 h-12 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2">
                      <LinkIcon size={14} /> Connect on NIET Matrix
                    </button>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
