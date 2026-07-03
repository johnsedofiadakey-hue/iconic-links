import { z } from 'zod';

export const createOrderSchema = z.object({
  serviceId: z.string().min(1, 'Service ID is required'),
  quantity: z.number().int().positive('Quantity must be greater than zero'),
  specs: z.any().optional(),
  isInstant: z.boolean(),
  basePrice: z.number().nullable(),
});

export const addInventoryItemSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  unitType: z.string().min(1, 'Unit type is required'),
  initialQuantity: z.number().min(0, 'Initial quantity cannot be negative'),
});

export const logConsumptionSchema = z.object({
  orderId: z.string().min(1, 'Order ID is required'),
  inventoryItemId: z.string().min(1, 'Inventory Item ID is required'),
  quantityUsed: z.number().positive('Quantity used must be greater than zero'),
  wastage: z.number().min(0, 'Wastage cannot be negative'),
  workerId: z.string().min(1, 'Worker ID is required'),
});

export const createDeliverySchema = z.object({
  orderId: z.string().min(1, 'Order ID is required'),
  address: z.string().min(5, 'Delivery address must be at least 5 characters'),
});

export const setQuoteSchema = z.object({
  orderId: z.string().min(1, 'Order ID is required'),
  items: z.array(z.object({
    orderItemId: z.string().min(1, 'Order item ID is required'),
    price: z.number().positive('Price must be greater than zero').max(1000000, 'Price exceeds allowed maximum'),
  })).min(1, 'At least one item price is required'),
});
