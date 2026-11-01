export type ControlParameters = { kc: number; ti: number; td: number; tau: number; noise: boolean; disturbance: boolean };
export const defaultControlParameters: ControlParameters = { kc: 2, ti: .9, td: .12, tau: .06, noise: true, disturbance: true };
export const sampleTime = .01;
export function filterCoefficient(tau: number, dt = sampleTime) { return dt / (Math.max(0, tau) + dt); }
export function iirStep(previous: number, input: number, tau: number, dt = sampleTime) {
  return previous + filterCoefficient(tau, dt) * (input - previous);
}
const clamp = (value: number) => Math.max(0, Math.min(3, value));
export function simulateControl(parameters: ControlParameters) {
  const { kc, ti, td, tau, noise, disturbance } = parameters;
  let actuator = 0, process = 0, filtered = 0, previousFiltered = 0, integral = 0;
  const samples = [];
  for (let k = 0; k <= 1200; k++) {
    const t = k * sampleTime;
    const reference = k >= 50 ? 1 : 0;
    const raw = process + (noise && k >= 50 ? .025 * Math.sin(2*Math.PI*11*t) + .012 * Math.sin(2*Math.PI*23*t) : 0);
    filtered = iirStep(filtered, raw, tau);
    const error = reference - filtered;
    const p = kc * error;
    const d = -kc * td * (filtered - previousFiltered) / sampleTime;
    const deltaIntegral = ti > 0 ? kc * error * sampleTime / ti : 0;
    const candidate = p + integral + deltaIntegral + d;
    // Freeze integration only when the error drives further into saturation.
    if (!((candidate > 3 && deltaIntegral > 0) || (candidate < 0 && deltaIntegral < 0))) integral += deltaIntegral;
    const demand = p + integral + d;
    const output = clamp(demand);
    samples.push({t, reference, process, raw, filtered, output, p, i: integral, d, saturated: demand > 3 || demand < 0});
    previousFiltered = filtered;
    // Two normalized first-order lags, explicit Euler at a fixed 10 ms period.
    const load = disturbance && k >= 600 ? -.3 : 0;
    process += sampleTime * (actuator - process) / .8;
    actuator += sampleTime * (output + load - actuator) / .2;
  }
  const tracking = samples.filter(s => s.t >= .5);
  const overshoot = Math.max(0, ...tracking.map(s => s.process - 1)) * 100;
  const finalError = 1 - samples[samples.length-1].process;
  const saturation = tracking.filter(s => s.saturated).length / tracking.length * 100;
  return { samples, overshoot, finalError, saturation };
}
