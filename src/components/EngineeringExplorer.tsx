import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, Pause, Play, RotateCcw, Cpu, ShieldCheck, LockKeyhole, ClipboardCheck, FileCheck2 } from 'lucide-react';
import { engineeringAreas } from '../data/engineering';
import { architectureScenes } from '../data/architecture-scenes';
import AnimatedArchitecture from './AnimatedArchitecture';

const icons = [Cpu, ShieldCheck, LockKeyhole, FileCheck2, ClipboardCheck];
export default function EngineeringExplorer() {
  const [active, setActive] = useState(0);
  const [phase, setPhase] = useState(0);
  const [paused, setPaused] = useState(false);
  const [fault, setFault] = useState(false);
  const [visible, setVisible] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(true);
  const root = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const reduced = mounted && prefersReducedMotion;
  const scene = architectureScenes[active];
  const currentStep = scene.steps[phase];
  const running = !paused && !reduced && visible && documentVisible;
  useEffect(() => {
    setMounted(true);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .15 });
    if (root.current) observer.observe(root.current);
    const onVisibility = () => setDocumentVisible(!document.hidden);
    onVisibility();
    document.addEventListener('visibilitychange', onVisibility);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', onVisibility); };
  }, []);
  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => setPhase(previous => (previous + 1) % 4), 3200);
    return () => window.clearInterval(timer);
  }, [running, active]);
  function chooseScene(index: number, focus = false) {
    const next = (index + engineeringAreas.length) % engineeringAreas.length;
    setActive(next); setPhase(0); setFault(false);
    if (focus) tabs.current[next]?.focus();
  }
  function chooseStep(index: number) { setPhase((index + 4) % 4); setPaused(true); }
  const rejected = fault && phase >= 2 && scene.id === 'secure-boot';
  const failed = fault && phase >= 2 && scene.id === 'verification';
  const status = rejected ? 'Altered image rejected · no handoff' : failed ? 'Demonstration failure · review required' : currentStep.status;
  return <div ref={root} className={`explorer explorer-v2 ${running ? 'demo-playing' : 'motion-paused'}`}>
    <div className="scene-selector" role="tablist" aria-label="Engineering areas">
      {engineeringAreas.map((area, i) => { const Icon = icons[i]; return <button ref={element => { tabs.current[i] = element; }} key={area.id} id={`system-tab-${area.id}`} role="tab" type="button" aria-selected={i === active} aria-controls="system-scene-panel" tabIndex={i === active ? 0 : -1} onClick={() => chooseScene(i)} onKeyDown={event => {
        if (['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) {
          event.preventDefault(); chooseScene(event.key === 'Home' ? 0 : event.key === 'End' ? 4 : i + (event.key === 'ArrowRight' ? 1 : -1), true);
        }
      }}><span className="scene-num">0{i+1}</span><Icon size={20} aria-hidden="true"/><span>{area.label}</span></button>; })}
    </div>
    <section className="explorer-body" id="system-scene-panel" role="tabpanel" aria-labelledby={`system-tab-${scene.id}`}>
      <div className="scene-copy"><span className="eyebrow">{engineeringAreas[active].label.toUpperCase()} / 0{active+1}</span><h3>{scene.title}</h3><p>{scene.description}</p><div className="tags">{scene.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        {(scene.id === 'secure-boot' || scene.id === 'verification') && <fieldset className="scenario-controls"><legend>Illustrative scenario</legend><button type="button" aria-pressed={!fault} onClick={() => { setFault(false); setPhase(0); }}>{scene.id === 'secure-boot' ? 'Valid image' : 'Passing tests'}</button><button type="button" aria-pressed={fault} onClick={() => { setFault(true); setPhase(0); }}>{scene.id === 'secure-boot' ? 'Altered image' : 'Failing test'}</button></fieldset>}
        <div className={`phase-explanation ${rejected || failed ? 'explanation-danger' : ''}`} aria-live={running ? 'off' : 'polite'}><span className="eyebrow">STEP {phase+1} / 4</span><h4>{currentStep.label}</h4><p>{currentStep.description}</p>{(rejected || failed) && <p className="scenario-result">{rejected ? 'This altered example cannot reach application execution.' : 'The failed example stays visible as an open verification issue.'}</p>}</div>
      </div>
      <div className="scene-art"><div className="architecture-status"><span className={rejected || failed ? 'status-danger' : ''}><span className="status-dot"/>{status}</span><span className="architecture-demo-label">ILLUSTRATIVE</span></div>
        <AnimatePresence mode="wait" initial={false}><motion.div key={scene.id} initial={{ opacity: 0, y: reduced ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .22 }}><AnimatedArchitecture area={scene.id} phase={phase} fault={fault}/></motion.div></AnimatePresence>
        <div className="architecture-steps" aria-label={`${engineeringAreas[active].label} sequence steps`}>{scene.steps.map((step, i) => <button key={step.label} type="button" aria-current={i === phase ? 'step' : undefined} onClick={() => chooseStep(i)}><span className="step-index">{i+1}</span><span>{step.label}</span>{i === phase && <span className="step-timer" key={`${active}-${phase}-${paused}`} aria-hidden="true"/>}</button>)}</div>
      </div>
    </section>
    <div className="explorer-footer"><span><span className="status-dot"/>Conceptual sequences · no production data</span><div className="scene-controls"><button type="button" onClick={() => setPaused(!paused)} aria-pressed={paused} aria-label={paused ? 'Enable diagram motion' : 'Pause diagram motion'} disabled={!!reduced}>{paused || reduced ? <Play size={15}/> : <Pause size={15}/>}<span>{reduced ? 'Reduced motion' : paused ? 'Play animation' : 'Pause animation'}</span></button><button type="button" onClick={() => { setPhase(0); setPaused(false); }} aria-label="Replay current scene"><RotateCcw size={16}/></button><button type="button" onClick={() => chooseScene(active-1)} aria-label="Previous scene"><ArrowLeft size={18}/></button><span className="counter" aria-label={`Scene ${active+1} of 5`}>{String(active+1).padStart(2,'0')} / 05</span><button type="button" onClick={() => chooseScene(active+1)} aria-label="Next scene"><ArrowRight size={18}/></button></div></div>
    {reduced && <p className="reduced-motion-note">Automatic motion is disabled. Select any of the four steps to inspect its diagram and explanation.</p>}
  </div>;
}
