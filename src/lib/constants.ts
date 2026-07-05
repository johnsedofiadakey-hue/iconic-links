/**
 * Unified status constants.
 * These values MUST match the strings stored in the database schema.
 */
export const ORDER_STATUS = {
  AWAITING_QUOTATION: 'AWAITING_QUOTATION',
  AWAITING_PAYMENT: 'AWAITING_PAYMENT',
  PREFLIGHT: 'PREFLIGHT',
  DESIGN_IN_PROGRESS: 'DESIGN_IN_PROGRESS',
  AWAITING_APPROVAL: 'AWAITING_APPROVAL',
  PRINTING: 'PRINTING',
  FINISHING: 'FINISHING',
  QC_REJECTED: 'QC_REJECTED',
  READY_FOR_PICKUP: 'READY_FOR_PICKUP',
  OUT_FOR_DELIVERY: 'OUT_FOR_DELIVERY',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
} as const;

export type OrderStatus = typeof ORDER_STATUS[keyof typeof ORDER_STATUS];

export const DELIVERY_STATUS = {
  PENDING: 'PENDING',
  DISPATCHED: 'DISPATCHED',
  DELIVERED: 'DELIVERED',
  FAILED: 'FAILED',
} as const;

export const PROOF_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
} as const;

/** Human-readable labels for order statuses */
export const STATUS_LABELS: Record<string, string> = {
  AWAITING_QUOTATION: 'Awaiting Quote',
  AWAITING_PAYMENT: 'Awaiting Payment',
  PREFLIGHT: 'Preflight Check',
  DESIGN_IN_PROGRESS: 'Design In Progress',
  AWAITING_APPROVAL: 'Awaiting Approval',
  PRINTING: 'Printing',
  FINISHING: 'Finishing',
  QC_REJECTED: 'QC Rejected',
  READY_FOR_PICKUP: 'Ready for Pickup',
  OUT_FOR_DELIVERY: 'Out for Delivery',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
};

/** Color classes for status badges */
export const STATUS_COLORS: Record<string, string> = {
  AWAITING_QUOTATION: 'bg-orange-100 text-orange-800',
  AWAITING_PAYMENT: 'bg-red-100 text-red-800',
  PREFLIGHT: 'bg-sky-100 text-sky-800',
  DESIGN_IN_PROGRESS: 'bg-purple-100 text-purple-800',
  AWAITING_APPROVAL: 'bg-amber-100 text-amber-800',
  PRINTING: 'bg-blue-100 text-blue-800',
  FINISHING: 'bg-indigo-100 text-indigo-800',
  QC_REJECTED: 'bg-red-100 text-red-800',
  READY_FOR_PICKUP: 'bg-emerald-100 text-emerald-800',
  OUT_FOR_DELIVERY: 'bg-teal-100 text-teal-800',
  COMPLETED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-gray-100 text-gray-600',
};
