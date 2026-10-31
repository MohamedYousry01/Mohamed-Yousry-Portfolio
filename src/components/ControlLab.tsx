import { useId, useMemo, useState } from 'react';
export default function ControlLab() {
  const uid=useId();
  const [damping,setDamping]=useState(.55);
  const [speed,setSpeed]=useState(2.2);
  const [disturbance,setDisturbance]=useState(true);
  const data=useMemo(()=>Array.from({length:241},(_,i)=>{
    const t=i/24;
    const wd=speed*Math.sqrt(1-damping*damping);
    const response=1-Math.exp(-damping*speed*t)*(Math.cos(wd*t)+damping/Math.sqrt(1-damping*damping)*Math.sin(wd*t));
    const dt=t-5;
    const disturbanceResponse=disturbance&&dt>=0?-.28*Math.exp(-damping*speed*dt)*Math.sin(wd*dt):0;
    return {t,y:response+disturbanceResponse};
  }),[damping,speed,disturbance]);
  const line=data.map((p,i)=>`${i?'L':'M'}${(62+p.t*62).toFixed(2)} ${(250-p.y*150).toFixed(2)}`).join(' ');
  const effort=data.map((p,i)=>{const previous=data[Math.max(0,i-1)];return `${i?'L':'M'}${(62+p.t*62).toFixed(2)} ${(326-Math.min(4,Math.max(-2,(p.y-previous.y)*24))*14).toFixed(2)}`}).join(' ');
  const overshoot=Math.max(0,...data.map(p=>p.y-1))*100;
  return <div className="control-lab">
    <div className="lab-header"><div><span className="eyebrow">INTERACTIVE / INDEPENDENT DEMONSTRATION</span><h3>Explore a feedback response.</h3></div><span className="pill">Simulated data</span></div>
    <p>A normalized second-order model illustrates tracking, overshoot, settling, and disturbance rejection. It does not reproduce a production PID or ADRC controller, patient behavior, or medical-device performance.</p>
    <div className="lab-layout"><div className="lab-inputs"><label htmlFor={`${uid}-damping`}>Damping <output>{damping.toFixed(2)}</output></label><input id={`${uid}-damping`} type="range" min="0.2" max="0.95" step="0.05" value={damping} onChange={e=>setDamping(+e.target.value)}/><label htmlFor={`${uid}-speed`}>Response frequency <output>{speed.toFixed(1)} rad/s</output></label><input id={`${uid}-speed`} type="range" min="1" max="4" step="0.1" value={speed} onChange={e=>setSpeed(+e.target.value)}/><label className="checkbox"><input type="checkbox" checked={disturbance} onChange={e=>setDisturbance(e.target.checked)}/>Disturbance at 5 s</label><p className="lab-result" aria-live="polite">Simulated peak overshoot <strong>{overshoot.toFixed(1)}%</strong></p><p className="small muted">Lower damping tends to increase overshoot. Higher frequency accelerates this illustrative response.</p></div>
    <div><svg viewBox="0 0 720 390" role="img" aria-labelledby={`${uid}-title ${uid}-desc`} className="control-plot"><title id={`${uid}-title`}>Simulated normalized pressure and response-rate plots</title><desc id={`${uid}-desc`}>Blue is the unit reference. Teal is the simulated measured response. Simulated overshoot is {overshoot.toFixed(1)} percent. The lower trace shows response rate, a qualitative control-response indicator, not actuator effort.</desc>{[0,.5,1,1.5].map(v=><g key={v}><path d={`M62 ${250-v*150}H682`} stroke="#e2e8f0"/><text x="48" y={255-v*150} textAnchor="end">{v.toFixed(1)}</text></g>)}{[0,2,4,6,8,10].map(t=><g key={t}><path d={`M${62+t*62} 25V250`} stroke="#edf1f6"/><text x={62+t*62} y="276" textAnchor="middle">{t}s</text></g>)}<path d="M62 250V100H682" stroke="#2563eb" strokeWidth="2" strokeDasharray="6 5" fill="none"/><path d={line} stroke="#0d9488" strokeWidth="2.5" fill="none"/>{disturbance&&<><path d="M372 30V250" stroke="#b98755" strokeDasharray="3 5"/><text x="380" y="43">Disturbance</text></>}<text x="62" y="16">Normalized pressure</text><text x="62" y="304">Response rate (qualitative indicator)</text><path d="M62 326H682" stroke="#e2e8f0"/><path d={effort} stroke="#64748b" strokeWidth="1.7" fill="none"/><text x="62" y="377" fill="#2563eb">— — Reference</text><text x="230" y="377" fill="#0d9488">— Simulated measurement</text></svg></div></div>
    <details><summary>Inspect the model and accessible data</summary><p>The reference is 1. The plant is a normalized underdamped second-order step response with damping ζ and natural frequency ω. The optional transient is −0.28 exp(−ζωτ) sin(ω√(1−ζ²)τ), where τ = t − 5 s. The lower trace is the finite-difference response rate. This is educational data, not controller tuning guidance.</p><table><caption>Selected simulated samples</caption><thead><tr><th scope="col">Time (s)</th><th scope="col">Reference</th><th scope="col">Simulated measurement</th></tr></thead><tbody>{data.filter((_,i)=>i%24===0).map(p=><tr key={p.t}><th scope="row">{p.t}</th><td>1.000</td><td>{p.y.toFixed(3)}</td></tr>)}</tbody></table></details>
  </div>;
}
