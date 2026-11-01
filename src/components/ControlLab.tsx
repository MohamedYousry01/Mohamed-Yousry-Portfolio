import { useId, useMemo, useState } from 'react';
import { defaultControlParameters, filterCoefficient, sampleTime, simulateControl } from '../data/control-simulation';

const controls = [
  { key: 'kc', label: 'Kc · Controller gain', min: 0, max: 8, step: .1, unit: '', help: 'Scales proportional, integral, and derivative action.' },
  { key: 'ti', label: 'Ti · Integral time', min: 0, max: 5, step: .05, unit: 's', help: 'Smaller Ti strengthens integration. Zero disables it.' },
  { key: 'td', label: 'Td · Derivative time', min: 0, max: .6, step: .01, unit: 's', help: 'Acts on measured feedback; zero disables derivative action.' },
  { key: 'tau', label: 'τf · IIR filter time constant', min: 0, max: 1, step: .01, unit: 's', help: 'Larger τf smooths noise and adds feedback lag. Zero bypasses the filter.' },
] as const;
export default function ControlLab() {
  const uid = useId();
  const [parameters, setParameters] = useState({...defaultControlParameters});
  const { samples, overshoot, finalError, saturation } = useMemo(() => simulateControl(parameters), [parameters]);
  const alpha = filterCoefficient(parameters.tau);
  const low = Math.min(-.1, Math.floor(Math.min(...samples.map(s=>Math.min(s.raw,s.filtered))) * 10) / 10);
  const high = Math.max(1.4, Math.ceil(Math.max(...samples.map(s=>Math.max(s.raw,s.filtered))) * 10) / 10);
  const x = (t: number) => 62 + t * 52;
  const y = (v: number) => 238 - (v-low)/(high-low)*202;
  const path = (key: 'reference'|'raw'|'filtered'|'output', effort=false) => samples.map((s,i)=>`${i?'L':'M'}${x(s.t).toFixed(2)},${(effort ? 382-s.output/3*78 : y(s[key])).toFixed(2)}`).join(' ');
  return <div className="control-lab pid-lab">
    <div className="lab-header"><div><span className="eyebrow">INTERACTIVE / PID + IIR FILTER</span><h3>Explore PID control and signal filtering.</h3></div><span className="pill">Simulated data</span></div>
    <p>Adjust Kc, Ti, Td, and the IIR filter time constant. Compare noisy sensor measurements with filtered feedback, and see the control output applied to a normalized simulated plant.</p>
    <div className="pid-loop" aria-label="Feedback loop"><span>Reference</span><b aria-hidden="true">→</b><span>PID · Kc / Ti / Td</span><b aria-hidden="true">→</b><span>Output · Plant</span><b aria-hidden="true">→</b><span>Sensor + noise</span><b aria-hidden="true">→</b><span>IIR · τf</span><span className="pid-loop-return">↳ Filtered measurement returns to the PID controller</span></div>
    <div className="lab-layout"><div className="lab-inputs">
      {controls.map(c=><div className="pid-parameter" key={c.key}><label htmlFor={`${uid}-${c.key}`}>{c.label}<output htmlFor={`${uid}-${c.key}`}>{parameters[c.key].toFixed(2)} {c.unit}</output></label><input id={`${uid}-${c.key}`} type="range" min={c.min} max={c.max} step={c.step} value={parameters[c.key]} aria-describedby={`${uid}-${c.key}-help`} onChange={e=>setParameters(p=>({...p,[c.key]:Number(e.target.value)}))}/><p id={`${uid}-${c.key}-help`}>{c.help}</p></div>)}
      <label className="checkbox"><input type="checkbox" checked={parameters.noise} onChange={e=>setParameters(p=>({...p,noise:e.target.checked}))}/>Sensor noise</label>
      <label className="checkbox"><input type="checkbox" checked={parameters.disturbance} onChange={e=>setParameters(p=>({...p,disturbance:e.target.checked}))}/>Load disturbance at 6 s</label>
      <button className="pid-reset" type="button" onClick={()=>setParameters({...defaultControlParameters})}>Reset parameters</button>
      <div className="pid-filter-info"><span>FIRST-ORDER IIR</span><strong>α = {alpha.toFixed(4)}</strong><p>Sample period Ts = 0.01 s (100 Hz)<br/>{parameters.tau===0?'Filter bypassed · feedback = raw signal':`τf = ${parameters.tau.toFixed(2)} s · nominal fc = ${(1/(2*Math.PI*parameters.tau)).toFixed(2)} Hz`}</p></div>
    </div><div className="pid-results">
      <div className="pid-chart" role="region" aria-label="PID response charts; scroll horizontally on small screens" tabIndex={0}><svg viewBox="0 0 720 430" role="img" aria-labelledby={`${uid}-title ${uid}-desc`} className="control-plot"><title id={`${uid}-title`}>PID response, IIR filtered feedback, and actuator output</title><desc id={`${uid}-desc`}>Reference steps to one at 0.5 seconds. Gray is the raw measurement, teal is filtered feedback, and blue is the reference. The lower plot is actual simulated PID output, limited between zero and three. Simulated process overshoot: {overshoot.toFixed(1)} percent.</desc>
        <defs><clipPath id={`${uid}-clip`}><rect x="62" y="36" width="624" height="202"/></clipPath></defs>
        <text x="62" y="18">Normalized response · auto-scaled</text>
        {[0,.25,.5,.75,1].map(f=>{const v=low+f*(high-low);return <g key={f}><path d={`M62 ${y(v)}H686`} stroke="#e2e8f0"/><text x="49" y={y(v)+4} textAnchor="end">{v.toFixed(2)}</text></g>})}
        {[0,2,4,6,8,10,12].map(t=><g key={t}><path d={`M${x(t)} 36V238`} stroke="#edf1f6"/><text x={x(t)} y="260" textAnchor="middle">{t}s</text></g>)}
        <g clipPath={`url(#${uid}-clip)`}><path data-trace="raw" d={path('raw')} stroke="#7b8798" strokeWidth="1.2" fill="none"/><path data-trace="reference" d={path('reference')} stroke="#2563eb" strokeWidth="1.7" strokeDasharray="6 5" fill="none"/><path data-trace="filtered" d={path('filtered')} stroke="#087f75" strokeWidth="2.2" fill="none"/></g>
        {parameters.disturbance&&<><path d={`M${x(6)} 36V238`} stroke="#a9632d" strokeDasharray="3 5"/><text x={x(6)+7} y="51">Load −0.30</text></>}
        <text x="62" y="289">Control output u · limited to 0–3</text>{[0,1.5,3].map(v=><g key={v}><path d={`M62 ${382-v/3*78}H686`} stroke="#e2e8f0"/><text x="49" y={386-v/3*78} textAnchor="end">{v}</text></g>)}<path data-trace="output" d={path('output',true)} stroke="#5266b9" strokeWidth="1.5" fill="none"/>{[0,2,4,6,8,10,12].map(t=><text key={t} x={x(t)} y="403" textAnchor="middle">{t}s</text>)}
      </svg></div>
      <div className="pid-legend"><span className="legend-reference">Reference</span><span className="legend-raw">Raw measurement</span><span className="legend-filtered">IIR feedback</span><span className="legend-output">Control output</span></div>
      <div className="pid-metrics" aria-live="polite"><p className="lab-result">Process peak overshoot<strong>{overshoot.toFixed(1)}%</strong></p><p>Final process error<strong>{finalError.toFixed(3)}</strong></p><p>Time at output limits<strong>{saturation.toFixed(1)}%</strong></p></div>
      <p className="pid-note">More filtering reduces sensor noise but delays feedback. Strong gains, short integral time, or derivative action on noisy feedback can cause oscillation or output saturation.</p>
    </div></div>
    <details><summary>Inspect the model and accessible data</summary><div className="pid-model"><p>Ideal-form PID with derivative on measurement: <code>e[k] = r[k] − yf[k]</code>, <code>P = Kc·e</code>, <code>ΔI = (Kc/Ti)·Ts·e</code>, <code>D = −Kc·Td·(yf[k]−yf[k−1])/Ts</code>, <code>u = clamp(P + I + D, 0, 3)</code>. Ti = 0 disables integration; Td = 0 disables differentiation. Conditional integration freezes increments that would drive further into an output limit. No separate derivative filter is used.</p><p>First-order IIR measurement filter (backward Euler): <code>α = Ts/(τf + Ts)</code>, <code>yf[k] = yf[k−1] + α·(raw[k]−yf[k−1])</code>. τf = 0 gives α = 1 (bypass). The displayed cutoff <code>fc = 1/(2πτf)</code> is the nominal continuous-time equivalent.</p><p>The normalized plant is <code>G(s) = 1/[(0.2s + 1)(0.8s + 1)]</code>, integrated by forward Euler at Ts = {sampleTime} s. The reference changes from 0 to 1 at 0.5 s; the optional sustained input load is −0.30 at 6 s. Reproducible sensor noise combines 11 Hz and 23 Hz sine waves. Overshoot and final error use the noise-free process state; limit time uses post-step controller samples. This is an independent educational model, with no production device data.</p><p>Formulation reference: <a href="https://www.mathworks.com/help/control/ug/discrete-time-proportional-integral-derivative-pid-controller.html" target="_blank" rel="noreferrer">MathWorks: discrete-time PID controllers ↗</a></p></div><div className="pid-table"><table><caption>Selected simulated samples (normalized values)</caption><thead><tr><th scope="col">Time (s)</th><th scope="col">Reference</th><th scope="col">Process</th><th scope="col">Raw sensor</th><th scope="col">IIR feedback</th><th scope="col">Control output</th></tr></thead><tbody>{samples.filter((_,i)=>i%100===0).map(s=><tr key={s.t}><th scope="row">{s.t.toFixed(0)}</th><td>{s.reference.toFixed(3)}</td><td>{s.process.toFixed(3)}</td><td>{s.raw.toFixed(3)}</td><td>{s.filtered.toFixed(3)}</td><td>{s.output.toFixed(3)}</td></tr>)}</tbody></table></div></details>
  </div>;
}
