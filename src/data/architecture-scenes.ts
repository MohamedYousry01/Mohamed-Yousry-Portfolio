import type { EngineeringArea } from './engineering';
export interface ArchitectureStep { label: string; description: string; status: string }
export interface ArchitectureScene { id: EngineeringArea; title: string; description: string; tags: string[]; steps: ArchitectureStep[] }
export const architectureScenes: ArchitectureScene[] = [
  { id: 'firmware', title: 'From sensor input to actuator output', description: 'Follow one conceptual real-time cycle: acquire measurements, run firmware and control logic, update actuators, and monitor communication and alarm conditions.', tags: ['Embedded C', 'NXP Power Architecture / STM32', 'PID / ADRC', 'BLDC · Blower · Valves'], steps: [
    { label: 'Read inputs', description: 'ADC and serial interfaces deliver sensor measurements. The highlighted trace shows data entering the microcontroller.', status: 'Acquiring measurements' },
    { label: 'Run control logic', description: 'Scheduled firmware filters measurements and evaluates control logic against a reference. The waveform is illustrative, not clinical data.', status: 'Processing feedback' },
    { label: 'Update actuators', description: 'PWM and actuator interfaces drive a BLDC motor, blower, or valves. The motion illustrates actuation rather than production timing.', status: 'Applying control output' },
    { label: 'Monitor & report', description: 'Monitoring checks signals and alarm conditions while the communication interface reports state. Another acquisition starts the next cycle.', status: 'Monitoring system state' },
  ] },
  { id: 'security', title: 'Cryptographic requests and protected keys', description: 'Trace a request through application firmware, cryptographic services, and a hardware protection boundary. Key material stays inside its conceptual protection boundary.', tags: ['HSM / SHE', 'AES-128 · AES-CMAC', 'SHA-256', 'ECC P-256 · ECDH · ECDSA'], steps: [
    { label: 'Request a service', description: 'Application firmware submits data and a requested operation through a defined service interface.', status: 'Service request received' },
    { label: 'Use protected keys', description: 'The service invokes a supported hardware-backed key operation. Software and hardware algorithm capabilities vary by platform.', status: 'Protected operation' },
    { label: 'Check integrity', description: 'Authentication and integrity checks produce a decision. The message symbols are independent examples, not real keys or protocols.', status: 'Checking authentication' },
    { label: 'Return the result', description: 'The application receives a status and permitted result. It must handle authentication failures explicitly.', status: 'Returning verified status' },
  ] },
  { id: 'secure-boot', title: 'Authenticate an image before handoff', description: 'Follow reset, image inspection, authentication, and execution. Switch between valid and altered illustrative images to see rejection prevent application handoff.', tags: ['Bootloader', 'Image authentication', 'Flash validation', 'Failure handling'], steps: [
    { label: 'Reset & initialize', description: 'Power-on enters the bootloader and establishes the state needed to inspect a candidate application image.', status: 'Bootloader initialization' },
    { label: 'Read the image', description: 'Inspect the candidate firmware and its authentication information. No production addresses or image format are represented.', status: 'Inspecting candidate image' },
    { label: 'Authenticate', description: 'A conceptual verification service checks authenticity and integrity before the image can become executable.', status: 'Verifying image authenticity' },
    { label: 'Decide execution', description: 'A validated image can reach execution. An altered image follows the rejection path and receives no normal application handoff.', status: 'Application handoff decision' },
  ] },
  { id: 'quality', title: 'From requirements to controlled procedures', description: 'See applicable standards become defined processes, reviewed procedures, and controlled records. This illustrates process engineering rather than certification or regulatory approval.', tags: ['IEC 62304', 'IEC 81001-5-1', 'ISO 13485', 'SOPs · Change control'], steps: [
    { label: 'Map requirements', description: 'Map software lifecycle, cybersecurity, and quality-management requirements to process activities and responsibilities.', status: 'Defining process scope' },
    { label: 'Draft procedures', description: 'Document inputs, activities, responsibilities, review points, and expected records. The document is an illustrative SOP.', status: 'Documenting the procedure' },
    { label: 'Review & approve', description: 'Review the procedure and record approval through the defined organizational process. The review marks are workflow demonstrations.', status: 'Reviewing controlled content' },
    { label: 'Release & maintain', description: 'Retain the procedure and records in controlled use. Changes return through review and version control.', status: 'Maintaining controlled records' },
  ] },
  { id: 'verification', title: 'Connect requirements to test evidence', description: 'Follow a demonstration requirement through implementation and test execution to evidence review. Switch outcomes to see a failed example remain an open issue.', tags: ['VectorCAST', 'Unity', 'MISRA C', 'Requirements traceability'], steps: [
    { label: 'Define test intent', description: 'Link a demonstration requirement to observable expected behavior and test conditions.', status: 'Linking requirements' },
    { label: 'Trace implementation', description: 'Design and implementation references connect the requirement to the software under test.', status: 'Following traceability' },
    { label: 'Execute tests', description: 'Illustrative nominal, boundary, and error-path tests run. These are examples, not production reports or coverage results.', status: 'Running demonstration tests' },
    { label: 'Review evidence', description: 'Review results and traceability together. Failed examples stay flagged for investigation; structural coverage does not replace requirement-based testing.', status: 'Reviewing test evidence' },
  ] },
];
