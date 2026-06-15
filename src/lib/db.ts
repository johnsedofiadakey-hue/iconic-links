import './firebase/client';
export * from './dataconnect';
import { createAuditLog } from './dataconnect';

export async function logAudit(data: {
  action: string;
  userId: string;
  orderId?: string;
  previousValue?: any;
  newValue?: any;
  notes?: string;
}) {
  try {
    return await createAuditLog({
      action: data.action,
      userId: data.userId,
      orderId: data.orderId || null,
      previousValue: data.previousValue ? JSON.stringify(data.previousValue) : null,
      newValue: data.newValue ? JSON.stringify(data.newValue) : null,
      notes: data.notes || null,
    });
  } catch (error) {
    console.error('Failed to log audit event', error);
  }
}
