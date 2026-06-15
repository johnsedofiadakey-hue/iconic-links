import { describe, it, expect } from 'vitest';
import { hasPermission, ROLE_PERMISSIONS, ROLES } from '@/lib/rbac';

describe('RBAC - Role-Based Access Control', () => {
  describe('hasPermission', () => {
    it('should allow SUPER_ADMIN to access all modules', () => {
      expect(hasPermission(ROLES.SUPER_ADMIN, 'INTELLIGENCE')).toBe(true);
      expect(hasPermission(ROLES.SUPER_ADMIN, 'ORGANIZATIONS')).toBe(true);
      expect(hasPermission(ROLES.SUPER_ADMIN, 'DELIVERY')).toBe(true);
      expect(hasPermission(ROLES.SUPER_ADMIN, 'INVENTORY')).toBe(true);
      expect(hasPermission(ROLES.SUPER_ADMIN, 'QC')).toBe(true);
      expect(hasPermission(ROLES.SUPER_ADMIN, 'SERVICES')).toBe(true);
    });

    it('should allow MANAGER to access management modules', () => {
      expect(hasPermission(ROLES.MANAGER, 'INTELLIGENCE')).toBe(true);
      expect(hasPermission(ROLES.MANAGER, 'QC')).toBe(true);
      expect(hasPermission(ROLES.MANAGER, 'SERVICES')).toBe(true);
    });

    it('should not allow MANAGER to access ORGANIZATIONS', () => {
      expect(hasPermission(ROLES.MANAGER, 'ORGANIZATIONS')).toBe(false);
    });

    it('should allow QC_OFFICER to access QC module only', () => {
      expect(hasPermission(ROLES.QC_OFFICER, 'QC')).toBe(true);
      expect(hasPermission(ROLES.QC_OFFICER, 'INVENTORY')).toBe(false);
      expect(hasPermission(ROLES.QC_OFFICER, 'INTELLIGENCE')).toBe(false);
    });

    it('should allow PRODUCTION_WORKER to access INVENTORY only', () => {
      expect(hasPermission(ROLES.PRODUCTION_WORKER, 'INVENTORY')).toBe(true);
      expect(hasPermission(ROLES.PRODUCTION_WORKER, 'QC')).toBe(false);
      expect(hasPermission(ROLES.PRODUCTION_WORKER, 'ORGANIZATIONS')).toBe(false);
    });

    it('should allow DELIVERY_DRIVER to access DELIVERY only', () => {
      expect(hasPermission(ROLES.DELIVERY_DRIVER, 'DELIVERY')).toBe(true);
      expect(hasPermission(ROLES.DELIVERY_DRIVER, 'INVENTORY')).toBe(false);
      expect(hasPermission(ROLES.DELIVERY_DRIVER, 'QC')).toBe(false);
    });

    it('should reject CUSTOMER from all modules', () => {
      expect(hasPermission(ROLES.CUSTOMER, 'INTELLIGENCE')).toBe(false);
      expect(hasPermission(ROLES.CUSTOMER, 'ORGANIZATIONS')).toBe(false);
      expect(hasPermission(ROLES.CUSTOMER, 'DELIVERY')).toBe(false);
      expect(hasPermission(ROLES.CUSTOMER, 'INVENTORY')).toBe(false);
      expect(hasPermission(ROLES.CUSTOMER, 'QC')).toBe(false);
      expect(hasPermission(ROLES.CUSTOMER, 'SERVICES')).toBe(false);
    });

    it('should handle empty/undefined role', () => {
      expect(hasPermission('', 'INTELLIGENCE')).toBe(false);
      expect(hasPermission(undefined as any, 'ORGANIZATIONS')).toBe(false);
      expect(hasPermission(null as any, 'DELIVERY')).toBe(false);
    });

    it('should handle invalid role gracefully', () => {
      expect(hasPermission('INVALID_ROLE', 'INTELLIGENCE')).toBe(false);
    });
  });

  describe('ROLE_PERMISSIONS', () => {
    it('should define permissions for all modules', () => {
      expect(ROLE_PERMISSIONS.INTELLIGENCE).toBeDefined();
      expect(ROLE_PERMISSIONS.ORGANIZATIONS).toBeDefined();
      expect(ROLE_PERMISSIONS.QC).toBeDefined();
      expect(ROLE_PERMISSIONS.DELIVERY).toBeDefined();
      expect(ROLE_PERMISSIONS.INVENTORY).toBeDefined();
      expect(ROLE_PERMISSIONS.SERVICES).toBeDefined();
    });

    it('should have ORGANIZATIONS permission for SUPER_ADMIN only', () => {
      expect(ROLE_PERMISSIONS.ORGANIZATIONS).toEqual([ROLES.SUPER_ADMIN]);
    });

    it('should have correct QC permissions', () => {
      expect(ROLE_PERMISSIONS.QC).toContain(ROLES.SUPER_ADMIN);
      expect(ROLE_PERMISSIONS.QC).toContain(ROLES.MANAGER);
      expect(ROLE_PERMISSIONS.QC).toContain(ROLES.QC_OFFICER);
      expect(ROLE_PERMISSIONS.QC).not.toContain(ROLES.CUSTOMER);
    });

    it('should have correct DELIVERY permissions', () => {
      expect(ROLE_PERMISSIONS.DELIVERY).toContain(ROLES.SUPER_ADMIN);
      expect(ROLE_PERMISSIONS.DELIVERY).toContain(ROLES.MANAGER);
      expect(ROLE_PERMISSIONS.DELIVERY).toContain(ROLES.DELIVERY_DRIVER);
      expect(ROLE_PERMISSIONS.DELIVERY).not.toContain(ROLES.QC_OFFICER);
    });

    it('should have correct INVENTORY permissions', () => {
      expect(ROLE_PERMISSIONS.INVENTORY).toContain(ROLES.SUPER_ADMIN);
      expect(ROLE_PERMISSIONS.INVENTORY).toContain(ROLES.MANAGER);
      expect(ROLE_PERMISSIONS.INVENTORY).toContain(ROLES.PRODUCTION_WORKER);
      expect(ROLE_PERMISSIONS.INVENTORY).not.toContain(ROLES.CUSTOMER);
    });
  });
});
