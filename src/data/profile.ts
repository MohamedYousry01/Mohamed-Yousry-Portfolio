import { engineeringAreas, type EngineeringArea } from './engineering';
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
  description: 'Embedded software engineer working on medical-device firmware and real-time control, embedded security, secure boot, quality-management processes, and software verification.',
};
export const href = (path = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
const skillItems: Record<EngineeringArea, string[]> = {
  "firmware": [
    "Embedded C",
    "NXP Power Architecture / STM32",
    "CAN · SPI · UART · I2C",
    "Real-time scheduling",
    "PID · PI · ADRC · Cascade control",
    "BLDC motor, blower & valve control",
    "Signal filtering · Anti-windup"
  ],
  "security": [
    "HSM / SHE",
    "Key management & provisioning",
    "AES-128 CBC · AES-CMAC",
    "SHA-256",
    "ECC P-256 · ECDH · ECDSA",
    "wolfCrypt"
  ],
  "secure-boot": [
    "Bootloader architecture",
    "Image authentication & integrity",
    "Application validation",
    "Firmware update management",
    "Flash programming",
    "Failure handling"
  ],
  "quality": [
    "Process & procedure development",
    "SOPs · Document control",
    "Configuration & change control",
    "Lifecycle documentation",
    "IEC 62304 · IEC 81001-5-1",
    "ISO 13485 · IEC 60601"
  ],
  "verification": [
    "VectorCAST · Unity",
    "Unit & integration testing",
    "Requirements traceability",
    "Verification evidence",
    "Structural coverage review",
    "MISRA C"
  ]
};
export const skills = engineeringAreas.map(area => ({ title: area.label, items: skillItems[area.id] }));
const expertiseItems: Record<EngineeringArea, {icon: string; description: string; tags: string; link?: string}> = {
  "firmware": {
    "icon": "cpu",
    "description": "Embedded C firmware for medical devices, peripheral interfaces, real-time control, motors, blowers, and valves.",
    "tags": "NXP Power Architecture · STM32 · PID / ADRC"
  },
  "security": {
    "icon": "shield",
    "description": "Hardware-backed cryptographic services, authentication, and protected key lifecycles.",
    "tags": "HSM / SHE · wolfCrypt · ECC"
  },
  "secure-boot": {
    "icon": "lock",
    "description": "Firmware authentication, application validation, secure updates, and defined rejection paths.",
    "tags": "Bootloaders · Flash · Integrity"
  },
  "quality": {
    "icon": "check",
    "description": "Creating processes, procedures, and controlled records that support medical-device compliance.",
    "tags": "IEC 62304 · IEC 81001-5-1 · ISO 13485",
    "link": "projects/medical-device-compliance/"
  },
  "verification": {
    "icon": "check",
    "description": "Requirement-based testing, traceability, structural review, and retained verification evidence.",
    "tags": "VectorCAST · Unity · MISRA C"
  }
};
export const expertise = engineeringAreas.map(area => ({ title: area.label, ...expertiseItems[area.id] }));
