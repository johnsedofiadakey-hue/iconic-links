export const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  MANAGER: 'MANAGER',
  CUSTOMER_SERVICE: 'CUSTOMER_SERVICE',
  PRODUCTION_WORKER: 'PRODUCTION_WORKER',
  QC_OFFICER: 'QC_OFFICER',
  DELIVERY_DRIVER: 'DELIVERY_DRIVER',
  CUSTOMER: 'CUSTOMER',
} as const;

export type Role = keyof typeof ROLES;

export const ROLE_PERMISSIONS = {
  INTELLIGENCE: [ROLES.SUPER_ADMIN, ROLES.MANAGER],
  ORGANIZATIONS: [ROLES.SUPER_ADMIN],
  QC: [ROLES.SUPER_ADMIN, ROLES.MANAGER, ROLES.QC_OFFICER],
  DELIVERY: [ROLES.SUPER_ADMIN, ROLES.MANAGER, ROLES.DELIVERY_DRIVER],
  INVENTORY: [ROLES.SUPER_ADMIN, ROLES.MANAGER, ROLES.PRODUCTION_WORKER],
  SERVICES: [ROLES.SUPER_ADMIN, ROLES.MANAGER],
} as const;

/**
 * Validates if a user has the required permission for a specific module
 */
export function hasPermission(userRole: string, module: keyof typeof ROLE_PERMISSIONS): boolean {
  if (!userRole) return false;
  
  const allowedRoles = ROLE_PERMISSIONS[module] as readonly string[];
  return allowedRoles.includes(userRole);
}
