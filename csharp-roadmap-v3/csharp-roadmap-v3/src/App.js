
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const modules = [
  { id: 'beginner', title: 'Beginner', subtitle: '#1-#20', color: 'from-cyan-400 to-blue-500', lessons: Array.from({length:20}, (_,i)=>({id:i+1,title:`Lesson ${i+1}`,time:'0:00'})) },
  { id: 'core', title: 'Core', subtitle: '#21-#30', color: 'from-violet-400 to-pink-500', lessons: Array.from({length:10}, (_,i)=>({id:21+i,title:`Lesson ${21+i}`,time:'1:00'})) }
];

export default function App(){
  const [selectedModule, setSelectedModule] = useState(modules[0]);
  const [completed, setCompleted] = useState(new Set());
  const [modal, setModal] = useState(null);

  useEffect(()=>{
    try{ const raw = localStorage.getItem('csharp_completed_v3'); if(raw) setCompleted(new Set(JSON.parse(raw))); }catch(e){}
  },[]);

  useEffect(()=>{
    localStorage.setItem('csharp_completed_v3', JSON.stringify(Array.from(completed)));
  },[completed]);

  const toggleComplete = id => { const s=new Set(completed); if(s.has(id)) s.delete(id); else s.add(id); setCompleted(s); };

  const openVideo = () => window.open('https://youtu.be/wxznTygnRfQ?si=M5CvsXArHgfbEnQ_','_blank');

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-zinc-900 text-slate-100 p-6">
      <header className="max-w-6xl mx-auto mb-6">
        <motion.h1 initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} transition={{duration:0.5}} className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-cyan-300">C# Roadmap — Neon (v3)</motion.h1>
        <p className="text-slate-400">Animated cards & modals • Dark neon theme</p>
      </header>

      <main className="max-w-6xl mx-auto">
        <motion.div className="flex gap-6 overflow-x-auto pb-6" initial="hidden" animate="show" variants={{show:{transition:{staggerChildren:0.06}}}}>
          {modules.map(mod=>(
            <motion.div key={mod.id} className="min-w-[320px] flex-shrink-0" variants={{hidden:{opacity:0,y:6}, show:{opacity:1,y:0}}}>
              <motion.div whileHover={{scale:1.03}} className={`p-4 rounded-2xl shadow-lg border border-slate-800`}>
                <div className={`p-1 rounded-lg bg-gradient-to-br ${mod.color}`}>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-black/30 via-black/40 to-black/50">
                    <h2 className="text-xl font-bold">{mod.title}</h2>
                    <p className="text-slate-300 text-sm">{mod.subtitle}</p>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="text-xs text-slate-300">Lessons: {mod.lessons.length}</div>
                      <button onClick={()=>setSelectedModule(mod)} className="ml-auto bg-slate-700/70 hover:bg-slate-700 text-sm px-3 py-1 rounded-md">Open</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <section className="mt-8 p-6 rounded-2xl bg-slate-800/40 border border-slate-700">
          <div className="flex gap-6">
            <div className="w-2/3">
              <h3 className="text-2xl font-bold mb-2">{selectedModule.title} — Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedModule.lessons.map(lesson=>(
                  <motion.article key={lesson.id} className="p-3 bg-slate-900/40 rounded-lg border border-slate-700" whileHover={{scale:1.01}} layout>
                    <div className="flex items-start gap-3">
                      <div>
                        <div className="text-sm text-slate-400">#{lesson.id}</div>
                        <div className="font-semibold">{lesson.title}</div>
                        <div className="text-xs text-slate-400">Video @ {lesson.time}</div>
                      </div>
                      <div className="ml-auto flex flex-col gap-2">
                        <div className="flex gap-2">
                          <button onClick={()=>toggleComplete(lesson.id)} className={`px-3 py-1 rounded ${Array.from(completed).includes(lesson.id)?'bg-green-500 text-black':'bg-slate-700 text-slate-200'}`}>{Array.from(completed).includes(lesson.id)?'Completed':'Mark'}</button>
                          <button onClick={()=>openVideo()} className="px-3 py-1 rounded bg-indigo-600 text-black">▶ Video</button>
                        </div>
                        <div className="flex gap-2">
                          <button className="px-2 py-1 rounded bg-green-600 text-black text-xs">🟢 Easy</button>
                          <button className="px-2 py-1 rounded bg-yellow-600 text-black text-xs">🟠 Medium</button>
                          <button className="px-2 py-1 rounded bg-red-600 text-black text-xs">🔴 Hard</button>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
            <aside className="w-1/3">
              <div className="p-4 rounded-lg bg-slate-900/30 border border-slate-700">
                <h4 className="font-bold">Module Summary</h4>
                <p className="text-slate-300 text-sm mt-2">Lessons: {selectedModule.lessons.length}</p>
                <p className="text-slate-300 text-sm mt-1">Completed total: {Array.from(completed).length}</p>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}
