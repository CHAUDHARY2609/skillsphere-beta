"use client";
import React, { useState } from 'react';
import { Search, Star, Mail, User, GraduationCap, X, Link as LinkIcon } from 'lucide-react';

const students = [
  { id: 1, name: "Aniket Chaudhary", branch: "BCA", year: "YR 3", stars: 94, bio: "Building vibe-coded multi-agent AI systems, IoT mesh architectures, and backend automation engines.", tags: ["PYTHON", "DEVELOPMENT", "REACT"], email: "aniket.22bca100@niet.co.in", erp: "2201330100000" },
  { id: 2, name: "Riya Sharma", branch: "CSE", year: "YR 4", stars: 88, bio: "UI/UX enthusiast and Frontend Engineer. Fine-tuning system design tokens and custom design specs.", tags: ["DEVELOPMENT", "PAINTING", "FIGMA"], email: "riya.21cse200@niet.co.in", erp: "2101330100200" },
  { id: 3, name: "Aman Verma", branch: "CSE (AI/ML)", year: "YR 2", stars: 72, bio: "Data cruncher training custom layers by day, configuring network firewalls by night.", tags: ["PYTHON", "C++"], email: "aman.23aiml300@niet.co.in", erp: "2301330100300" },
  // ... more students
];

export default function NetworkExplore() {
  const [selectedStudent, setSelectedStudent] = useState(null);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Network Explore</h1>
          <p className="text-emerald-400 flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            NIET Verified Identity Sandbox Framework Active.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student) => (
            <div 
              key={student.id}
              onClick={() => setSelectedStudent(student)}
              className="bg-[#141414] border border-white/5 p-6 rounded-2xl hover:border-emerald-500/50 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[#1A1A1A] rounded-xl flex items-center justify-center text-2xl">
                    {student.name[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{student.name}</h3>
                    <p className="text-xs text-gray-500">{student.branch} - {student.year}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-yellow-500 text-sm">
                  <Star size={14} fill="currentColor" />
                  <span>{student.stars} Stars</span>
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-6 line-clamp-2">{student.bio}</p>
              <div className="flex gap-2">
                {student.tags.map(tag => (
                  <span key={tag} className="text-[10px] bg-white/5 px-2 py-1 rounded-md text-gray-400">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* DETAILS MODAL */}
        {selectedStudent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedStudent(null)}></div>
            <div className="bg-[#141414] border border-white/10 w-full max-w-lg rounded-3xl p-8 relative z-10 animate-in fade-in zoom-in duration-200">
              <button 
                onClick={() => setSelectedStudent(null)}
                className="absolute top-6 right-6 p-2 hover:bg-white/5 rounded-full"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col items-center mb-8">
                <div className="w-24 h-24 bg-[#1A1A1A] rounded-3xl flex items-center justify-center text-4xl mb-4 border border-emerald-500/20">
                  {selectedStudent.name[0]}
                </div>
                <h2 className="text-2xl font-bold">{selectedStudent.name}</h2>
                <p className="text-emerald-400 font-medium">{selectedStudent.branch} • {selectedStudent.year}</p>
              </div>

              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-2xl flex items-center gap-4">
                  <Mail className="text-gray-500" size={20} />
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">College Email</p>
                    <p className="text-sm">{selectedStudent.email}</p>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl flex items-center gap-4">
                  <User className="text-gray-500" size={20} />
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">ERP ID</p>
                    <p className="text-sm font-mono tracking-tighter">{selectedStudent.erp}</p>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-2xl flex items-center gap-4">
                  <GraduationCap className="text-gray-500" size={20} />
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Department Branch</p>
                    <p className="text-sm">{selectedStudent.branch} Engineering</p>
                  </div>
                </div>
              </div>

              <button className="w-full mt-8 bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2">
                <LinkIcon size={18} />
                Connect on NIET Matrix
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
