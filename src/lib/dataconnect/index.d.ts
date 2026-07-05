import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AuditLog_Key {
  id: UUIDString;
  __typename?: 'AuditLog_Key';
}

export interface Branch_Key {
  id: UUIDString;
  __typename?: 'Branch_Key';
}

export interface Category_Key {
  id: UUIDString;
  __typename?: 'Category_Key';
}

export interface CreateAuditLogData {
  auditLog_insert: AuditLog_Key;
}

export interface CreateAuditLogVariables {
  action: string;
  userId: string;
  orderId?: string | null;
  previousValue?: unknown | null;
  newValue?: unknown | null;
  notes?: string | null;
}

export interface CreateCategoryData {
  category_insert: Category_Key;
}

export interface CreateCategoryVariables {
  name: string;
}

export interface CreateCustomerProfileData {
  customerProfile_insert: CustomerProfile_Key;
}

export interface CreateCustomerProfileVariables {
  userId: UUIDString;
}

export interface CreateDeliveryData {
  delivery_insert: Delivery_Key;
}

export interface CreateDeliveryVariables {
  orderId: UUIDString;
  address: string;
  status: string;
}

export interface CreateInventoryItemData {
  inventoryItem_insert: InventoryItem_Key;
}

export interface CreateInventoryItemVariables {
  name: string;
  unitType: string;
  quantity: number;
}

export interface CreateOrderData {
  order_insert: Order_Key;
}

export interface CreateOrderItemData {
  orderItem_insert: OrderItem_Key;
}

export interface CreateOrderItemVariables {
  orderId: UUIDString;
  serviceId: UUIDString;
  quantity: number;
  price: number;
  specs?: unknown | null;
}

export interface CreateOrderVariables {
  userId: UUIDString;
  orderNumber: string;
  totalAmount: number;
}

export interface CreateOrganizationData {
  organization_insert: Organization_Key;
}

export interface CreateOrganizationVariables {
  name: string;
}

export interface CreatePaymentData {
  payment_insert: Payment_Key;
}

export interface CreatePaymentVariables {
  orderId: UUIDString;
  amount: number;
  reference: string;
}

export interface CreateProofData {
  proof_insert: Proof_Key;
}

export interface CreateProofVariables {
  orderId: UUIDString;
  fileUrl: string;
  version: number;
  status: string;
}

export interface CreateServiceData {
  service_insert: Service_Key;
}

export interface CreateServiceVariables {
  categoryId: UUIDString;
  name: string;
  pricingType: string;
  basePrice?: number | null;
}

export interface CreateStaffProfileData {
  staffProfile_insert: StaffProfile_Key;
}

export interface CreateStaffProfileVariables {
  userId: UUIDString;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  phone?: string | null;
  email?: string | null;
  name?: string | null;
  role: string;
}

export interface CustomerProfile_Key {
  id: UUIDString;
  __typename?: 'CustomerProfile_Key';
}

export interface Delivery_Key {
  id: UUIDString;
  __typename?: 'Delivery_Key';
}

export interface File_Key {
  id: UUIDString;
  __typename?: 'File_Key';
}

export interface GetCategoryServicesData {
  services: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    pricingType: string;
    basePrice?: number | null;
    imageUrl?: string | null;
  } & Service_Key)[];
}

export interface GetCategoryServicesVariables {
  categoryId: UUIDString;
}

export interface GetDeliveryData {
  delivery?: {
    id: UUIDString;
    orderId: UUIDString;
    status: string;
    address: string;
    driverId?: UUIDString | null;
  } & Delivery_Key;
}

export interface GetDeliveryVariables {
  id: UUIDString;
}

export interface GetInventoryItemData {
  inventoryItem?: {
    id: UUIDString;
    quantity: number;
  } & InventoryItem_Key;
}

export interface GetInventoryItemVariables {
  id: UUIDString;
}

export interface GetOrderData {
  order?: {
    id: UUIDString;
    orderNumber: string;
    status: string;
    totalAmount: number;
    user: {
      id: UUIDString;
      name?: string | null;
      phone?: string | null;
      email?: string | null;
    } & User_Key;
  } & Order_Key;
}

export interface GetOrderProofsData {
  order?: {
    id: UUIDString;
    proofs_on_order: ({
      id: UUIDString;
      version: number;
      status: string;
    } & Proof_Key)[];
  } & Order_Key;
}

export interface GetOrderProofsVariables {
  id: UUIDString;
}

export interface GetOrderVariables {
  id: UUIDString;
}

export interface GetOrderWithDetailsData {
  order?: {
    id: UUIDString;
    orderNumber: string;
    status: string;
    totalAmount: number;
    user: {
      name?: string | null;
      phone?: string | null;
      email?: string | null;
    };
    orderItems_on_order: ({
      id: UUIDString;
      quantity: number;
      price: number;
      specs?: unknown | null;
      service: {
        name: string;
      };
    } & OrderItem_Key)[];
    proofs_on_order: ({
      id: UUIDString;
      version: number;
      status: string;
      fileUrl: string;
    } & Proof_Key)[];
    payments_on_order: ({
      id: UUIDString;
      amount: number;
      status: string;
    } & Payment_Key)[];
  } & Order_Key;
}

export interface GetOrderWithDetailsVariables {
  id: UUIDString;
}

export interface GetPaymentByReferenceData {
  payments: ({
    id: UUIDString;
    orderId: UUIDString;
    amount: number;
    status: string;
    order: {
      status: string;
      userId: UUIDString;
    };
  } & Payment_Key)[];
}

export interface GetPaymentByReferenceVariables {
  reference: string;
}

export interface GetProofData {
  proof?: {
    id: UUIDString;
    orderId: UUIDString;
  } & Proof_Key;
}

export interface GetProofVariables {
  id: UUIDString;
}

export interface GetServiceData {
  service?: {
    id: UUIDString;
    name: string;
    description?: string | null;
    pricingType: string;
    basePrice?: number | null;
    imageUrl?: string | null;
    category: {
      name: string;
    };
  } & Service_Key;
}

export interface GetServiceVariables {
  id: UUIDString;
}

export interface GetUserByIdData {
  user?: {
    id: UUIDString;
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    role: string;
    organization?: {
      id: UUIDString;
      name: string;
    } & Organization_Key;
  } & User_Key;
}

export interface GetUserByIdVariables {
  id: UUIDString;
}

export interface GetUserByIdentifierData {
  users: ({
    id: UUIDString;
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    role: string;
  } & User_Key)[];
}

export interface GetUserByIdentifierVariables {
  identifier: string;
}

export interface GetWorkerJobData {
  order?: {
    id: UUIDString;
    orderNumber: string;
    status: string;
    orderItems_on_order: ({
      id: UUIDString;
      quantity: number;
      specs?: unknown | null;
      service: {
        name: string;
      };
    } & OrderItem_Key)[];
  } & Order_Key;
}

export interface GetWorkerJobVariables {
  id: UUIDString;
}

export interface InventoryItem_Key {
  id: UUIDString;
  __typename?: 'InventoryItem_Key';
}

export interface ListActiveDeliveriesData {
  deliveries: ({
    id: UUIDString;
    address: string;
    status: string;
    order: {
      orderNumber: string;
      user: {
        name?: string | null;
        phone?: string | null;
      };
    };
  } & Delivery_Key)[];
}

export interface ListAllOrdersForIntelligenceData {
  orders: ({
    id: UUIDString;
    status: string;
    totalAmount: number;
    createdAt: TimestampString;
    user: {
      id: UUIDString;
      name?: string | null;
      phone?: string | null;
    } & User_Key;
    materialConsumptions_on_order: ({
      workerId?: UUIDString | null;
    })[];
  } & Order_Key)[];
}

export interface ListAllUsersData {
  users: ({
    id: UUIDString;
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    role: string;
  } & User_Key)[];
}

export interface ListCategoriesData {
  categories: ({
    id: UUIDString;
    name: string;
    imageUrl?: string | null;
    services_on_category: ({
      id: UUIDString;
      name: string;
      pricingType: string;
      basePrice?: number | null;
    } & Service_Key)[];
  } & Category_Key)[];
}

export interface ListInventoryItemsData {
  inventoryItems: ({
    id: UUIDString;
    name: string;
    unitType: string;
    quantity: number;
  } & InventoryItem_Key)[];
}

export interface ListOrdersByUserData {
  orders: ({
    id: UUIDString;
    orderNumber: string;
    status: string;
    totalAmount: number;
    createdAt: TimestampString;
  } & Order_Key)[];
}

export interface ListOrdersByUserVariables {
  userId: UUIDString;
}

export interface ListOrdersByUserWithDetailsData {
  orders: ({
    id: UUIDString;
    orderNumber: string;
    status: string;
    totalAmount: number;
    createdAt: TimestampString;
    orderItems_on_order: ({
      id: UUIDString;
      service: {
        name: string;
      };
    } & OrderItem_Key)[];
    payments_on_order: ({
      id: UUIDString;
      status: string;
    } & Payment_Key)[];
    proofs_on_order: ({
      id: UUIDString;
      version: number;
      status: string;
      fileUrl: string;
      comments?: string | null;
    } & Proof_Key)[];
  } & Order_Key)[];
}

export interface ListOrdersByUserWithDetailsVariables {
  userId: UUIDString;
}

export interface ListOrdersForQcData {
  orders: ({
    id: UUIDString;
    orderNumber: string;
    status: string;
    user: {
      name?: string | null;
      phone?: string | null;
    };
    orderItems_on_order: ({
      id: UUIDString;
      quantity: number;
      service: {
        name: string;
      };
    } & OrderItem_Key)[];
  } & Order_Key)[];
}

export interface ListOrganizationsWithUsersData {
  organizations: ({
    id: UUIDString;
    name: string;
    users_on_organization: ({
      id: UUIDString;
      name?: string | null;
      phone?: string | null;
      email?: string | null;
    } & User_Key)[];
  } & Organization_Key)[];
}

export interface ListRecentOrdersData {
  orders: ({
    id: UUIDString;
    orderNumber: string;
    status: string;
    totalAmount: number;
    createdAt: TimestampString;
    user: {
      id: UUIDString;
      email?: string | null;
      phone?: string | null;
    } & User_Key;
    orderItems_on_order: ({
      id: UUIDString;
      quantity: number;
      price: number;
      service: {
        name: string;
      };
    } & OrderItem_Key)[];
  } & Order_Key)[];
}

export interface ListUsersByRoleData {
  users: ({
    id: UUIDString;
    name?: string | null;
    email?: string | null;
  } & User_Key)[];
}

export interface ListUsersByRoleVariables {
  role: string;
}

export interface ListWastedConsumptionsData {
  materialConsumptions: ({
    id: UUIDString;
    wastage: number;
    inventoryItem: {
      name: string;
    };
  } & MaterialConsumption_Key)[];
}

export interface LogMaterialConsumptionData {
  materialConsumption_insert: MaterialConsumption_Key;
}

export interface LogMaterialConsumptionVariables {
  inventoryItemId: UUIDString;
  orderId: UUIDString;
  quantityUsed: number;
  wastage: number;
}

export interface MaterialConsumption_Key {
  id: UUIDString;
  __typename?: 'MaterialConsumption_Key';
}

export interface OrderItem_Key {
  id: UUIDString;
  __typename?: 'OrderItem_Key';
}

export interface Order_Key {
  id: UUIDString;
  __typename?: 'Order_Key';
}

export interface Organization_Key {
  id: UUIDString;
  __typename?: 'Organization_Key';
}

export interface Payment_Key {
  id: UUIDString;
  __typename?: 'Payment_Key';
}

export interface Proof_Key {
  id: UUIDString;
  __typename?: 'Proof_Key';
}

export interface Service_Key {
  id: UUIDString;
  __typename?: 'Service_Key';
}

export interface SetOrderQuoteData {
  order_update?: Order_Key | null;
}

export interface SetOrderQuoteVariables {
  id: UUIDString;
  totalAmount: number;
  status: string;
}

export interface StaffProfile_Key {
  id: UUIDString;
  __typename?: 'StaffProfile_Key';
}

export interface UpdateDeliveryData {
  delivery_update?: Delivery_Key | null;
}

export interface UpdateDeliveryVariables {
  id: UUIDString;
  driverId?: UUIDString | null;
  status?: string | null;
}

export interface UpdateInventoryQuantityData {
  inventoryItem_update?: InventoryItem_Key | null;
}

export interface UpdateInventoryQuantityVariables {
  id: UUIDString;
  quantity: number;
}

export interface UpdateOrderItemPriceData {
  orderItem_update?: OrderItem_Key | null;
}

export interface UpdateOrderItemPriceVariables {
  id: UUIDString;
  price: number;
}

export interface UpdateOrderStatusData {
  order_update?: Order_Key | null;
}

export interface UpdateOrderStatusVariables {
  id: UUIDString;
  status: string;
}

export interface UpdatePaymentStatusData {
  payment_update?: Payment_Key | null;
}

export interface UpdatePaymentStatusVariables {
  id: UUIDString;
  status: string;
  paystackRef?: string | null;
}

export interface UpdateProofData {
  proof_update?: Proof_Key | null;
}

export interface UpdateProofVariables {
  id: UUIDString;
  status: string;
  approvedBy?: string | null;
  comments?: string | null;
}

export interface UpdateUserOrganizationData {
  user_update?: User_Key | null;
}

export interface UpdateUserOrganizationVariables {
  id: UUIDString;
  organizationId: UUIDString;
}

export interface UpdateUserRoleData {
  user_update?: User_Key | null;
}

export interface UpdateUserRoleVariables {
  id: UUIDString;
  role: string;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateOrderRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateOrderVariables): MutationRef<CreateOrderData, CreateOrderVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateOrderVariables): MutationRef<CreateOrderData, CreateOrderVariables>;
  operationName: string;
}
export const createOrderRef: CreateOrderRef;

export function createOrder(vars: CreateOrderVariables): MutationPromise<CreateOrderData, CreateOrderVariables>;
export function createOrder(dc: DataConnect, vars: CreateOrderVariables): MutationPromise<CreateOrderData, CreateOrderVariables>;

interface UpdateOrderStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateOrderStatusVariables): MutationRef<UpdateOrderStatusData, UpdateOrderStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateOrderStatusVariables): MutationRef<UpdateOrderStatusData, UpdateOrderStatusVariables>;
  operationName: string;
}
export const updateOrderStatusRef: UpdateOrderStatusRef;

export function updateOrderStatus(vars: UpdateOrderStatusVariables): MutationPromise<UpdateOrderStatusData, UpdateOrderStatusVariables>;
export function updateOrderStatus(dc: DataConnect, vars: UpdateOrderStatusVariables): MutationPromise<UpdateOrderStatusData, UpdateOrderStatusVariables>;

interface SetOrderQuoteRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SetOrderQuoteVariables): MutationRef<SetOrderQuoteData, SetOrderQuoteVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SetOrderQuoteVariables): MutationRef<SetOrderQuoteData, SetOrderQuoteVariables>;
  operationName: string;
}
export const setOrderQuoteRef: SetOrderQuoteRef;

export function setOrderQuote(vars: SetOrderQuoteVariables): MutationPromise<SetOrderQuoteData, SetOrderQuoteVariables>;
export function setOrderQuote(dc: DataConnect, vars: SetOrderQuoteVariables): MutationPromise<SetOrderQuoteData, SetOrderQuoteVariables>;

interface UpdateOrderItemPriceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateOrderItemPriceVariables): MutationRef<UpdateOrderItemPriceData, UpdateOrderItemPriceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateOrderItemPriceVariables): MutationRef<UpdateOrderItemPriceData, UpdateOrderItemPriceVariables>;
  operationName: string;
}
export const updateOrderItemPriceRef: UpdateOrderItemPriceRef;

export function updateOrderItemPrice(vars: UpdateOrderItemPriceVariables): MutationPromise<UpdateOrderItemPriceData, UpdateOrderItemPriceVariables>;
export function updateOrderItemPrice(dc: DataConnect, vars: UpdateOrderItemPriceVariables): MutationPromise<UpdateOrderItemPriceData, UpdateOrderItemPriceVariables>;

interface CreateCategoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateCategoryVariables): MutationRef<CreateCategoryData, CreateCategoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateCategoryVariables): MutationRef<CreateCategoryData, CreateCategoryVariables>;
  operationName: string;
}
export const createCategoryRef: CreateCategoryRef;

export function createCategory(vars: CreateCategoryVariables): MutationPromise<CreateCategoryData, CreateCategoryVariables>;
export function createCategory(dc: DataConnect, vars: CreateCategoryVariables): MutationPromise<CreateCategoryData, CreateCategoryVariables>;

interface CreateServiceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateServiceVariables): MutationRef<CreateServiceData, CreateServiceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateServiceVariables): MutationRef<CreateServiceData, CreateServiceVariables>;
  operationName: string;
}
export const createServiceRef: CreateServiceRef;

export function createService(vars: CreateServiceVariables): MutationPromise<CreateServiceData, CreateServiceVariables>;
export function createService(dc: DataConnect, vars: CreateServiceVariables): MutationPromise<CreateServiceData, CreateServiceVariables>;

interface UpdateInventoryQuantityRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateInventoryQuantityVariables): MutationRef<UpdateInventoryQuantityData, UpdateInventoryQuantityVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateInventoryQuantityVariables): MutationRef<UpdateInventoryQuantityData, UpdateInventoryQuantityVariables>;
  operationName: string;
}
export const updateInventoryQuantityRef: UpdateInventoryQuantityRef;

export function updateInventoryQuantity(vars: UpdateInventoryQuantityVariables): MutationPromise<UpdateInventoryQuantityData, UpdateInventoryQuantityVariables>;
export function updateInventoryQuantity(dc: DataConnect, vars: UpdateInventoryQuantityVariables): MutationPromise<UpdateInventoryQuantityData, UpdateInventoryQuantityVariables>;

interface CreateInventoryItemRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateInventoryItemVariables): MutationRef<CreateInventoryItemData, CreateInventoryItemVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateInventoryItemVariables): MutationRef<CreateInventoryItemData, CreateInventoryItemVariables>;
  operationName: string;
}
export const createInventoryItemRef: CreateInventoryItemRef;

export function createInventoryItem(vars: CreateInventoryItemVariables): MutationPromise<CreateInventoryItemData, CreateInventoryItemVariables>;
export function createInventoryItem(dc: DataConnect, vars: CreateInventoryItemVariables): MutationPromise<CreateInventoryItemData, CreateInventoryItemVariables>;

interface LogMaterialConsumptionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: LogMaterialConsumptionVariables): MutationRef<LogMaterialConsumptionData, LogMaterialConsumptionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: LogMaterialConsumptionVariables): MutationRef<LogMaterialConsumptionData, LogMaterialConsumptionVariables>;
  operationName: string;
}
export const logMaterialConsumptionRef: LogMaterialConsumptionRef;

export function logMaterialConsumption(vars: LogMaterialConsumptionVariables): MutationPromise<LogMaterialConsumptionData, LogMaterialConsumptionVariables>;
export function logMaterialConsumption(dc: DataConnect, vars: LogMaterialConsumptionVariables): MutationPromise<LogMaterialConsumptionData, LogMaterialConsumptionVariables>;

interface CreateOrderItemRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateOrderItemVariables): MutationRef<CreateOrderItemData, CreateOrderItemVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateOrderItemVariables): MutationRef<CreateOrderItemData, CreateOrderItemVariables>;
  operationName: string;
}
export const createOrderItemRef: CreateOrderItemRef;

export function createOrderItem(vars: CreateOrderItemVariables): MutationPromise<CreateOrderItemData, CreateOrderItemVariables>;
export function createOrderItem(dc: DataConnect, vars: CreateOrderItemVariables): MutationPromise<CreateOrderItemData, CreateOrderItemVariables>;

interface CreateDeliveryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateDeliveryVariables): MutationRef<CreateDeliveryData, CreateDeliveryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateDeliveryVariables): MutationRef<CreateDeliveryData, CreateDeliveryVariables>;
  operationName: string;
}
export const createDeliveryRef: CreateDeliveryRef;

export function createDelivery(vars: CreateDeliveryVariables): MutationPromise<CreateDeliveryData, CreateDeliveryVariables>;
export function createDelivery(dc: DataConnect, vars: CreateDeliveryVariables): MutationPromise<CreateDeliveryData, CreateDeliveryVariables>;

interface UpdateDeliveryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateDeliveryVariables): MutationRef<UpdateDeliveryData, UpdateDeliveryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateDeliveryVariables): MutationRef<UpdateDeliveryData, UpdateDeliveryVariables>;
  operationName: string;
}
export const updateDeliveryRef: UpdateDeliveryRef;

export function updateDelivery(vars: UpdateDeliveryVariables): MutationPromise<UpdateDeliveryData, UpdateDeliveryVariables>;
export function updateDelivery(dc: DataConnect, vars: UpdateDeliveryVariables): MutationPromise<UpdateDeliveryData, UpdateDeliveryVariables>;

interface CreateOrganizationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateOrganizationVariables): MutationRef<CreateOrganizationData, CreateOrganizationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateOrganizationVariables): MutationRef<CreateOrganizationData, CreateOrganizationVariables>;
  operationName: string;
}
export const createOrganizationRef: CreateOrganizationRef;

export function createOrganization(vars: CreateOrganizationVariables): MutationPromise<CreateOrganizationData, CreateOrganizationVariables>;
export function createOrganization(dc: DataConnect, vars: CreateOrganizationVariables): MutationPromise<CreateOrganizationData, CreateOrganizationVariables>;

interface UpdateUserOrganizationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserOrganizationVariables): MutationRef<UpdateUserOrganizationData, UpdateUserOrganizationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateUserOrganizationVariables): MutationRef<UpdateUserOrganizationData, UpdateUserOrganizationVariables>;
  operationName: string;
}
export const updateUserOrganizationRef: UpdateUserOrganizationRef;

export function updateUserOrganization(vars: UpdateUserOrganizationVariables): MutationPromise<UpdateUserOrganizationData, UpdateUserOrganizationVariables>;
export function updateUserOrganization(dc: DataConnect, vars: UpdateUserOrganizationVariables): MutationPromise<UpdateUserOrganizationData, UpdateUserOrganizationVariables>;

interface UpdateUserRoleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserRoleVariables): MutationRef<UpdateUserRoleData, UpdateUserRoleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateUserRoleVariables): MutationRef<UpdateUserRoleData, UpdateUserRoleVariables>;
  operationName: string;
}
export const updateUserRoleRef: UpdateUserRoleRef;

export function updateUserRole(vars: UpdateUserRoleVariables): MutationPromise<UpdateUserRoleData, UpdateUserRoleVariables>;
export function updateUserRole(dc: DataConnect, vars: UpdateUserRoleVariables): MutationPromise<UpdateUserRoleData, UpdateUserRoleVariables>;

interface CreateProofRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProofVariables): MutationRef<CreateProofData, CreateProofVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateProofVariables): MutationRef<CreateProofData, CreateProofVariables>;
  operationName: string;
}
export const createProofRef: CreateProofRef;

export function createProof(vars: CreateProofVariables): MutationPromise<CreateProofData, CreateProofVariables>;
export function createProof(dc: DataConnect, vars: CreateProofVariables): MutationPromise<CreateProofData, CreateProofVariables>;

interface UpdateProofRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProofVariables): MutationRef<UpdateProofData, UpdateProofVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateProofVariables): MutationRef<UpdateProofData, UpdateProofVariables>;
  operationName: string;
}
export const updateProofRef: UpdateProofRef;

export function updateProof(vars: UpdateProofVariables): MutationPromise<UpdateProofData, UpdateProofVariables>;
export function updateProof(dc: DataConnect, vars: UpdateProofVariables): MutationPromise<UpdateProofData, UpdateProofVariables>;

interface CreateStaffProfileRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateStaffProfileVariables): MutationRef<CreateStaffProfileData, CreateStaffProfileVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateStaffProfileVariables): MutationRef<CreateStaffProfileData, CreateStaffProfileVariables>;
  operationName: string;
}
export const createStaffProfileRef: CreateStaffProfileRef;

export function createStaffProfile(vars: CreateStaffProfileVariables): MutationPromise<CreateStaffProfileData, CreateStaffProfileVariables>;
export function createStaffProfile(dc: DataConnect, vars: CreateStaffProfileVariables): MutationPromise<CreateStaffProfileData, CreateStaffProfileVariables>;

interface CreateCustomerProfileRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateCustomerProfileVariables): MutationRef<CreateCustomerProfileData, CreateCustomerProfileVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateCustomerProfileVariables): MutationRef<CreateCustomerProfileData, CreateCustomerProfileVariables>;
  operationName: string;
}
export const createCustomerProfileRef: CreateCustomerProfileRef;

export function createCustomerProfile(vars: CreateCustomerProfileVariables): MutationPromise<CreateCustomerProfileData, CreateCustomerProfileVariables>;
export function createCustomerProfile(dc: DataConnect, vars: CreateCustomerProfileVariables): MutationPromise<CreateCustomerProfileData, CreateCustomerProfileVariables>;

interface CreatePaymentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreatePaymentVariables): MutationRef<CreatePaymentData, CreatePaymentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreatePaymentVariables): MutationRef<CreatePaymentData, CreatePaymentVariables>;
  operationName: string;
}
export const createPaymentRef: CreatePaymentRef;

export function createPayment(vars: CreatePaymentVariables): MutationPromise<CreatePaymentData, CreatePaymentVariables>;
export function createPayment(dc: DataConnect, vars: CreatePaymentVariables): MutationPromise<CreatePaymentData, CreatePaymentVariables>;

interface UpdatePaymentStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdatePaymentStatusVariables): MutationRef<UpdatePaymentStatusData, UpdatePaymentStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdatePaymentStatusVariables): MutationRef<UpdatePaymentStatusData, UpdatePaymentStatusVariables>;
  operationName: string;
}
export const updatePaymentStatusRef: UpdatePaymentStatusRef;

export function updatePaymentStatus(vars: UpdatePaymentStatusVariables): MutationPromise<UpdatePaymentStatusData, UpdatePaymentStatusVariables>;
export function updatePaymentStatus(dc: DataConnect, vars: UpdatePaymentStatusVariables): MutationPromise<UpdatePaymentStatusData, UpdatePaymentStatusVariables>;

interface CreateAuditLogRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAuditLogVariables): MutationRef<CreateAuditLogData, CreateAuditLogVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateAuditLogVariables): MutationRef<CreateAuditLogData, CreateAuditLogVariables>;
  operationName: string;
}
export const createAuditLogRef: CreateAuditLogRef;

export function createAuditLog(vars: CreateAuditLogVariables): MutationPromise<CreateAuditLogData, CreateAuditLogVariables>;
export function createAuditLog(dc: DataConnect, vars: CreateAuditLogVariables): MutationPromise<CreateAuditLogData, CreateAuditLogVariables>;

interface GetUserByIdRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserByIdVariables): QueryRef<GetUserByIdData, GetUserByIdVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserByIdVariables): QueryRef<GetUserByIdData, GetUserByIdVariables>;
  operationName: string;
}
export const getUserByIdRef: GetUserByIdRef;

export function getUserById(vars: GetUserByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserByIdData, GetUserByIdVariables>;
export function getUserById(dc: DataConnect, vars: GetUserByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserByIdData, GetUserByIdVariables>;

interface ListCategoriesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListCategoriesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListCategoriesData, undefined>;
  operationName: string;
}
export const listCategoriesRef: ListCategoriesRef;

export function listCategories(options?: ExecuteQueryOptions): QueryPromise<ListCategoriesData, undefined>;
export function listCategories(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListCategoriesData, undefined>;

interface GetCategoryServicesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCategoryServicesVariables): QueryRef<GetCategoryServicesData, GetCategoryServicesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetCategoryServicesVariables): QueryRef<GetCategoryServicesData, GetCategoryServicesVariables>;
  operationName: string;
}
export const getCategoryServicesRef: GetCategoryServicesRef;

export function getCategoryServices(vars: GetCategoryServicesVariables, options?: ExecuteQueryOptions): QueryPromise<GetCategoryServicesData, GetCategoryServicesVariables>;
export function getCategoryServices(dc: DataConnect, vars: GetCategoryServicesVariables, options?: ExecuteQueryOptions): QueryPromise<GetCategoryServicesData, GetCategoryServicesVariables>;

interface GetOrderRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOrderVariables): QueryRef<GetOrderData, GetOrderVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetOrderVariables): QueryRef<GetOrderData, GetOrderVariables>;
  operationName: string;
}
export const getOrderRef: GetOrderRef;

export function getOrder(vars: GetOrderVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrderData, GetOrderVariables>;
export function getOrder(dc: DataConnect, vars: GetOrderVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrderData, GetOrderVariables>;

interface ListOrdersByUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListOrdersByUserVariables): QueryRef<ListOrdersByUserData, ListOrdersByUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListOrdersByUserVariables): QueryRef<ListOrdersByUserData, ListOrdersByUserVariables>;
  operationName: string;
}
export const listOrdersByUserRef: ListOrdersByUserRef;

export function listOrdersByUser(vars: ListOrdersByUserVariables, options?: ExecuteQueryOptions): QueryPromise<ListOrdersByUserData, ListOrdersByUserVariables>;
export function listOrdersByUser(dc: DataConnect, vars: ListOrdersByUserVariables, options?: ExecuteQueryOptions): QueryPromise<ListOrdersByUserData, ListOrdersByUserVariables>;

interface ListInventoryItemsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListInventoryItemsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListInventoryItemsData, undefined>;
  operationName: string;
}
export const listInventoryItemsRef: ListInventoryItemsRef;

export function listInventoryItems(options?: ExecuteQueryOptions): QueryPromise<ListInventoryItemsData, undefined>;
export function listInventoryItems(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListInventoryItemsData, undefined>;

interface GetInventoryItemRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetInventoryItemVariables): QueryRef<GetInventoryItemData, GetInventoryItemVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetInventoryItemVariables): QueryRef<GetInventoryItemData, GetInventoryItemVariables>;
  operationName: string;
}
export const getInventoryItemRef: GetInventoryItemRef;

export function getInventoryItem(vars: GetInventoryItemVariables, options?: ExecuteQueryOptions): QueryPromise<GetInventoryItemData, GetInventoryItemVariables>;
export function getInventoryItem(dc: DataConnect, vars: GetInventoryItemVariables, options?: ExecuteQueryOptions): QueryPromise<GetInventoryItemData, GetInventoryItemVariables>;

interface GetUserByIdentifierRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserByIdentifierVariables): QueryRef<GetUserByIdentifierData, GetUserByIdentifierVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserByIdentifierVariables): QueryRef<GetUserByIdentifierData, GetUserByIdentifierVariables>;
  operationName: string;
}
export const getUserByIdentifierRef: GetUserByIdentifierRef;

export function getUserByIdentifier(vars: GetUserByIdentifierVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserByIdentifierData, GetUserByIdentifierVariables>;
export function getUserByIdentifier(dc: DataConnect, vars: GetUserByIdentifierVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserByIdentifierData, GetUserByIdentifierVariables>;

interface GetDeliveryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetDeliveryVariables): QueryRef<GetDeliveryData, GetDeliveryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetDeliveryVariables): QueryRef<GetDeliveryData, GetDeliveryVariables>;
  operationName: string;
}
export const getDeliveryRef: GetDeliveryRef;

export function getDelivery(vars: GetDeliveryVariables, options?: ExecuteQueryOptions): QueryPromise<GetDeliveryData, GetDeliveryVariables>;
export function getDelivery(dc: DataConnect, vars: GetDeliveryVariables, options?: ExecuteQueryOptions): QueryPromise<GetDeliveryData, GetDeliveryVariables>;

interface GetOrderProofsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOrderProofsVariables): QueryRef<GetOrderProofsData, GetOrderProofsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetOrderProofsVariables): QueryRef<GetOrderProofsData, GetOrderProofsVariables>;
  operationName: string;
}
export const getOrderProofsRef: GetOrderProofsRef;

export function getOrderProofs(vars: GetOrderProofsVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrderProofsData, GetOrderProofsVariables>;
export function getOrderProofs(dc: DataConnect, vars: GetOrderProofsVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrderProofsData, GetOrderProofsVariables>;

interface GetProofRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetProofVariables): QueryRef<GetProofData, GetProofVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetProofVariables): QueryRef<GetProofData, GetProofVariables>;
  operationName: string;
}
export const getProofRef: GetProofRef;

export function getProof(vars: GetProofVariables, options?: ExecuteQueryOptions): QueryPromise<GetProofData, GetProofVariables>;
export function getProof(dc: DataConnect, vars: GetProofVariables, options?: ExecuteQueryOptions): QueryPromise<GetProofData, GetProofVariables>;

interface ListRecentOrdersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListRecentOrdersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListRecentOrdersData, undefined>;
  operationName: string;
}
export const listRecentOrdersRef: ListRecentOrdersRef;

export function listRecentOrders(options?: ExecuteQueryOptions): QueryPromise<ListRecentOrdersData, undefined>;
export function listRecentOrders(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListRecentOrdersData, undefined>;

interface ListActiveDeliveriesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListActiveDeliveriesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListActiveDeliveriesData, undefined>;
  operationName: string;
}
export const listActiveDeliveriesRef: ListActiveDeliveriesRef;

export function listActiveDeliveries(options?: ExecuteQueryOptions): QueryPromise<ListActiveDeliveriesData, undefined>;
export function listActiveDeliveries(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListActiveDeliveriesData, undefined>;

interface ListUsersByRoleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListUsersByRoleVariables): QueryRef<ListUsersByRoleData, ListUsersByRoleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListUsersByRoleVariables): QueryRef<ListUsersByRoleData, ListUsersByRoleVariables>;
  operationName: string;
}
export const listUsersByRoleRef: ListUsersByRoleRef;

export function listUsersByRole(vars: ListUsersByRoleVariables, options?: ExecuteQueryOptions): QueryPromise<ListUsersByRoleData, ListUsersByRoleVariables>;
export function listUsersByRole(dc: DataConnect, vars: ListUsersByRoleVariables, options?: ExecuteQueryOptions): QueryPromise<ListUsersByRoleData, ListUsersByRoleVariables>;

interface ListAllUsersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllUsersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAllUsersData, undefined>;
  operationName: string;
}
export const listAllUsersRef: ListAllUsersRef;

export function listAllUsers(options?: ExecuteQueryOptions): QueryPromise<ListAllUsersData, undefined>;
export function listAllUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAllUsersData, undefined>;

interface ListAllOrdersForIntelligenceRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllOrdersForIntelligenceData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAllOrdersForIntelligenceData, undefined>;
  operationName: string;
}
export const listAllOrdersForIntelligenceRef: ListAllOrdersForIntelligenceRef;

export function listAllOrdersForIntelligence(options?: ExecuteQueryOptions): QueryPromise<ListAllOrdersForIntelligenceData, undefined>;
export function listAllOrdersForIntelligence(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAllOrdersForIntelligenceData, undefined>;

interface ListWastedConsumptionsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListWastedConsumptionsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListWastedConsumptionsData, undefined>;
  operationName: string;
}
export const listWastedConsumptionsRef: ListWastedConsumptionsRef;

export function listWastedConsumptions(options?: ExecuteQueryOptions): QueryPromise<ListWastedConsumptionsData, undefined>;
export function listWastedConsumptions(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListWastedConsumptionsData, undefined>;

interface GetOrderWithDetailsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOrderWithDetailsVariables): QueryRef<GetOrderWithDetailsData, GetOrderWithDetailsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetOrderWithDetailsVariables): QueryRef<GetOrderWithDetailsData, GetOrderWithDetailsVariables>;
  operationName: string;
}
export const getOrderWithDetailsRef: GetOrderWithDetailsRef;

export function getOrderWithDetails(vars: GetOrderWithDetailsVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrderWithDetailsData, GetOrderWithDetailsVariables>;
export function getOrderWithDetails(dc: DataConnect, vars: GetOrderWithDetailsVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrderWithDetailsData, GetOrderWithDetailsVariables>;

interface ListOrdersForQcRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListOrdersForQcData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListOrdersForQcData, undefined>;
  operationName: string;
}
export const listOrdersForQcRef: ListOrdersForQcRef;

export function listOrdersForQc(options?: ExecuteQueryOptions): QueryPromise<ListOrdersForQcData, undefined>;
export function listOrdersForQc(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListOrdersForQcData, undefined>;

interface ListOrdersByUserWithDetailsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListOrdersByUserWithDetailsVariables): QueryRef<ListOrdersByUserWithDetailsData, ListOrdersByUserWithDetailsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ListOrdersByUserWithDetailsVariables): QueryRef<ListOrdersByUserWithDetailsData, ListOrdersByUserWithDetailsVariables>;
  operationName: string;
}
export const listOrdersByUserWithDetailsRef: ListOrdersByUserWithDetailsRef;

export function listOrdersByUserWithDetails(vars: ListOrdersByUserWithDetailsVariables, options?: ExecuteQueryOptions): QueryPromise<ListOrdersByUserWithDetailsData, ListOrdersByUserWithDetailsVariables>;
export function listOrdersByUserWithDetails(dc: DataConnect, vars: ListOrdersByUserWithDetailsVariables, options?: ExecuteQueryOptions): QueryPromise<ListOrdersByUserWithDetailsData, ListOrdersByUserWithDetailsVariables>;

interface GetWorkerJobRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetWorkerJobVariables): QueryRef<GetWorkerJobData, GetWorkerJobVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetWorkerJobVariables): QueryRef<GetWorkerJobData, GetWorkerJobVariables>;
  operationName: string;
}
export const getWorkerJobRef: GetWorkerJobRef;

export function getWorkerJob(vars: GetWorkerJobVariables, options?: ExecuteQueryOptions): QueryPromise<GetWorkerJobData, GetWorkerJobVariables>;
export function getWorkerJob(dc: DataConnect, vars: GetWorkerJobVariables, options?: ExecuteQueryOptions): QueryPromise<GetWorkerJobData, GetWorkerJobVariables>;

interface ListOrganizationsWithUsersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListOrganizationsWithUsersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListOrganizationsWithUsersData, undefined>;
  operationName: string;
}
export const listOrganizationsWithUsersRef: ListOrganizationsWithUsersRef;

export function listOrganizationsWithUsers(options?: ExecuteQueryOptions): QueryPromise<ListOrganizationsWithUsersData, undefined>;
export function listOrganizationsWithUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListOrganizationsWithUsersData, undefined>;

interface GetServiceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetServiceVariables): QueryRef<GetServiceData, GetServiceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetServiceVariables): QueryRef<GetServiceData, GetServiceVariables>;
  operationName: string;
}
export const getServiceRef: GetServiceRef;

export function getService(vars: GetServiceVariables, options?: ExecuteQueryOptions): QueryPromise<GetServiceData, GetServiceVariables>;
export function getService(dc: DataConnect, vars: GetServiceVariables, options?: ExecuteQueryOptions): QueryPromise<GetServiceData, GetServiceVariables>;

interface GetPaymentByReferenceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPaymentByReferenceVariables): QueryRef<GetPaymentByReferenceData, GetPaymentByReferenceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetPaymentByReferenceVariables): QueryRef<GetPaymentByReferenceData, GetPaymentByReferenceVariables>;
  operationName: string;
}
export const getPaymentByReferenceRef: GetPaymentByReferenceRef;

export function getPaymentByReference(vars: GetPaymentByReferenceVariables, options?: ExecuteQueryOptions): QueryPromise<GetPaymentByReferenceData, GetPaymentByReferenceVariables>;
export function getPaymentByReference(dc: DataConnect, vars: GetPaymentByReferenceVariables, options?: ExecuteQueryOptions): QueryPromise<GetPaymentByReferenceData, GetPaymentByReferenceVariables>;

