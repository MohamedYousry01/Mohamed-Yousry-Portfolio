export const profile = {
  name: 'Mohamed Yousry',
  title: 'Embedded Software & Cybersecurity Engineer',
  linkedin: 'https://www.linkedin.com/in/yousry01',
  github: 'https://github.com/MohamedYousry01',
  email: 'moh.yousry01@gmail.com',
  whatsapp: 'https://wa.me/201121670202',
  phone: '+20 112 167 0202',
  resume: 'resume.pdf', // Original user-supplied resume; replace this file to update it.
  resumeDownloadName: 'Mohamed Yousry Resume.pdf',
  description: 'Embedded software engineer specializing in medical device firmware, real-time control systems, hardware-backed cybersecurity, and secure firmware architecture.',
};
export const href = (path = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
export const skills = [
  { title: 'Firmware & platforms', items: ['Embedded C', 'NXP Power Architecture', 'STM32', 'Real-time scheduling', 'Embedded architecture', 'CAN · SPI · UART · I2C'] },
  { title: 'Hardware-backed security', items: ['HSM / SHE', 'Key management & provisioning', 'AES-128 CBC · AES-CMAC', 'SHA-256', 'ECC P-256 · ECDH · ECDSA', 'wolfCrypt'] },
  { title: 'Control & sensing', items: ['PID & PI', 'ADRC', 'Cascade control', 'Pressure & flow regulation', 'Brushless DC (BLDC) motor control', 'Signal filtering', 'Anti-windup'] },
  { title: 'Quality & lifecycle', items: ['VectorCAST · Unity', 'Unit & integration testing', 'MISRA C', 'Requirements traceability', 'Process & procedure development', 'IEC 62304 · IEC 81001-5-1', 'IEC 60601 · ISO 13485'] },
];
export const expertise = [
  { icon: 'cpu', title: 'Embedded software', description: 'Firmware built around deterministic behavior, clear interfaces, and hardware constraints.', tags: 'Embedded C · NXP Power Architecture · STM32' },
  { icon: 'shield', title: 'Embedded cybersecurity', description: 'Hardware-backed trust, cryptographic services, and protected key lifecycles.', tags: 'HSM / SHE · wolfCrypt · ECC' },
  { icon: 'activity', title: 'Medical device firmware', description: 'Safety-conscious development for demanding medical-device environments.', tags: 'Ventilator firmware · IEC 62304' },
  { icon: 'sliders', title: 'Real-time control', description: 'Closed-loop pressure, flow, and brushless DC motor control with practical embedded execution.', tags: 'PID · PI · ADRC · BLDC' },
  { icon: 'lock', title: 'Secure boot & updates', description: 'Firmware authentication and validation before handing control to an application.', tags: 'Bootloaders · Flash · Integrity' },
  { icon: 'check', title: 'Verification & validation', description: 'Traceable requirements, meaningful tests, and reviewable engineering evidence.', tags: 'VectorCAST · Unity · MISRA C' },
  { icon: 'check', title: 'Medical device compliance', description: 'Creating processes, procedures, and controlled documentation that support medical-device compliance.', tags: 'IEC 62304 · IEC 81001-5-1 · ISO 13485', link: 'projects/medical-device-compliance/' },
];
