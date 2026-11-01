import test from 'node:test';
import assert from 'node:assert/strict';
import { defaultControlParameters as defaults, simulateControl, filterCoefficient, iirStep } from '../src/data/control-simulation.ts';

test('IIR bypass and step response obey the stated recurrence and time constant', () => {
  assert.equal(filterCoefficient(0), 1);
  assert.equal(iirStep(.2,.7,0), .7);
  let value=0;
  for(let k=0;k<10;k++) value=iirStep(value,1,.1);
  assert.ok(Math.abs(value-(1-Math.pow(1-filterCoefficient(.1),10)))<1e-12);
  assert.ok(value>.60 && value<.65);
});
test('zero gain produces no command, and PID integration removes P-only offset', () => {
  const base={...defaults,noise:false,disturbance:false};
  assert.ok(simulateControl({...base,kc:0}).samples.every(s=>s.output===0&&s.process===0));
  const proportional=simulateControl({...base,ti:0,td:0});
  assert.ok(Math.abs(proportional.finalError-1/3)<.001);
  assert.ok(Math.abs(simulateControl(base).finalError)<.002);
});
test('load is rejected by integral action and derivative has no setpoint kick', () => {
  const result=simulateControl({...defaults,noise:false});
  assert.ok(result.samples[650].process<result.samples[599].process);
  assert.ok(Math.abs(result.finalError)<.01);
  assert.equal(Math.abs(result.samples[50].d),0);
  assert.equal(result.samples[49].reference,0);
  assert.equal(result.samples[50].reference,1);
});
test('IIR attenuates a high-frequency sensor signal', () => {
  let filtered=0,rawEnergy=0,filteredEnergy=0;
  for(let k=0;k<1000;k++) {
    const raw=Math.sin(2*Math.PI*20*k*.01);filtered=iirStep(filtered,raw,.1);
    if(k>100){rawEnergy+=raw*raw;filteredEnergy+=filtered*filtered;}
  }
  assert.ok(filteredEnergy<rawEnergy*.02);
});
test('extreme UI settings remain finite, bounded, and reproducible', () => {
  for(const kc of [0,2,8]) for(const ti of [0,.05,5]) for(const td of [0,.6]) for(const tau of [0,1]) {
    const result=simulateControl({...defaults,kc,ti,td,tau});
    assert.ok(result.samples.every(s=>Object.values(s).every(v=>typeof v!=='number'||Number.isFinite(v))&&s.output>=0&&s.output<=3));
  }
  assert.deepEqual(simulateControl(defaults),simulateControl(defaults));
});
