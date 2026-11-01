export const engineeringAreas = [
  { id: 'firmware', label: 'Firmware' },
  { id: 'security', label: 'Security' },
  { id: 'secure-boot', label: 'Secure boot' },
  { id: 'quality', label: 'Quality management' },
  { id: 'verification', label: 'Verification' },
] as const;
export type EngineeringArea = typeof engineeringAreas[number]['id'];
export const engineeringOrder: Record<EngineeringArea, number> = { firmware: 0, security: 1, 'secure-boot': 2, quality: 3, verification: 4 };
