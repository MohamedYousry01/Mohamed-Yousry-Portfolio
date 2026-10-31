import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, Pause, Play, Cpu, ShieldCheck, Activity, LockKeyhole, ClipboardCheck } from 'lucide-react';
import Diagram, { sceneNames } from './Diagram';
const scenes = [
  { label: 'Firmware', icon: Cpu, title: 'Where software meets the silicon.', text: 'Real-time Embedded C firmware connects processing, memory, and peripheral interfaces on NXP Power Architecture and STM32 platforms.', tags: ['Embedded C', 'NXP Power Architecture', 'STM32', 'Real-time firmware'] },
  { label: 'Control', icon: Activity, title: 'A carefully controlled feedback loop.', text: 'A conceptual ventilator loop links pressure sensing, control decisions, and actuator control for brushless DC (BLDC) motors, blowers, and valves. The waveform is an illustration, not clinical performance data.', tags: ['Pressure regulation', 'PID & ADRC', 'BLDC & valve control', 'Signal filtering', 'Alarm monitoring'] },
  { label: 'Security', icon: ShieldCheck, title: 'Trust starts below the application.', text: 'Cryptographic services create an explicit boundary between application requests, hardware-backed operations, and protected keys. Algorithm support varies by platform.', tags: ['Authentication', 'Integrity', 'HSM / SHE', 'Key management'] },
  { label: 'Secure boot', icon: LockKeyhole, title: 'Authenticate before execution.', text: 'An image follows the validated path only after authentication. Failed validation leads to rejection, with no normal application handoff.', tags: ['Bootloader', 'Firmware authentication', 'Failure handling', 'Flash updates'] },
  { label: 'Verification', icon: ClipboardCheck, title: 'Make behavior traceable to evidence.', text: 'Requirements, design, implementation, and tests form a reviewable chain. Coverage helps inspect test completeness without replacing requirement-based verification.', tags: ['VectorCAST', 'Unity', 'MISRA C', 'IEC 62304'] },
];
export default function EngineeringExplorer() {
  const [active,setActive]=useState(0);
  const [paused,setPaused]=useState(false);
  const reduced=useReducedMotion();
  const current=scenes[active];
  const step=(delta:number)=>setActive((active+delta+scenes.length)%scenes.length);
  return <div className={`explorer ${paused||reduced?'motion-paused':''}`}>
    <div className="scene-selector" aria-label="Engineering scenes">
      {scenes.map((scene,i)=>{const Icon=scene.icon;return <button key={scene.label} type="button" aria-pressed={i===active} aria-controls="scene-content" onClick={()=>setActive(i)}><span className="scene-num">0{i+1}</span><Icon size={19} aria-hidden="true"/><span>{scene.label}</span></button>})}
    </div>
    <div className="explorer-body">
      <div className="scene-copy"><span className="eyebrow">SYSTEM / 0{active+1}</span><h3>{current.title}</h3><p>{current.text}</p><div className="tags">{current.tags.map(tag=><span key={tag}>{tag}</span>)}</div></div>
      <div className="scene-art" id="scene-content" aria-live="polite" aria-atomic="true">
        <AnimatePresence mode="wait" initial={false}><motion.div key={active} initial={{opacity:0,y:reduced?0:10}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:reduced?0:.2}}><Diagram scene={active} id={`explorer-${active}`}/></motion.div></AnimatePresence>
      </div>
    </div>
    <div className="explorer-footer"><span><span className="status-dot"/>Conceptual engineering illustration</span><div className="scene-controls"><button onClick={()=>setPaused(!paused)} aria-pressed={paused} aria-label={paused?'Enable diagram motion':'Pause diagram motion'} disabled={!!reduced}>{paused||reduced?<Play size={15}/>:<Pause size={15}/>}<span>{reduced?'Reduced motion':paused?'Motion paused':'Pause motion'}</span></button><button onClick={()=>step(-1)} aria-label="Previous scene"><ArrowLeft size={18}/></button><span className="counter" aria-label={`Scene ${active+1} of 5`}>{String(active+1).padStart(2,'0')} / 05</span><button onClick={()=>step(1)} aria-label="Next scene"><ArrowRight size={18}/></button></div></div>
    <span className="sr-only">Current scene: {sceneNames[active]}</span>
  </div>;
}
