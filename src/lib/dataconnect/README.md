# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `default`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetUserById*](#getuserbyid)
  - [*ListCategories*](#listcategories)
  - [*GetCategoryServices*](#getcategoryservices)
  - [*GetOrder*](#getorder)
  - [*ListOrdersByUser*](#listordersbyuser)
  - [*ListInventoryItems*](#listinventoryitems)
  - [*GetInventoryItem*](#getinventoryitem)
  - [*GetUserByIdentifier*](#getuserbyidentifier)
  - [*GetDelivery*](#getdelivery)
  - [*GetOrderProofs*](#getorderproofs)
  - [*GetProof*](#getproof)
  - [*ListRecentOrders*](#listrecentorders)
  - [*ListActiveDeliveries*](#listactivedeliveries)
  - [*ListUsersByRole*](#listusersbyrole)
  - [*ListAllOrdersForIntelligence*](#listallordersforintelligence)
  - [*ListWastedConsumptions*](#listwastedconsumptions)
  - [*GetOrderWithDetails*](#getorderwithdetails)
  - [*ListOrdersForQC*](#listordersforqc)
  - [*ListOrdersByUserWithDetails*](#listordersbyuserwithdetails)
  - [*GetWorkerJob*](#getworkerjob)
  - [*ListOrganizationsWithUsers*](#listorganizationswithusers)
  - [*GetService*](#getservice)
  - [*GetPaymentByReference*](#getpaymentbyreference)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*CreateOrder*](#createorder)
  - [*UpdateOrderStatus*](#updateorderstatus)
  - [*CreateCategory*](#createcategory)
  - [*CreateService*](#createservice)
  - [*UpdateInventoryQuantity*](#updateinventoryquantity)
  - [*CreateInventoryItem*](#createinventoryitem)
  - [*LogMaterialConsumption*](#logmaterialconsumption)
  - [*CreateOrderItem*](#createorderitem)
  - [*CreateDelivery*](#createdelivery)
  - [*UpdateDelivery*](#updatedelivery)
  - [*CreateOrganization*](#createorganization)
  - [*UpdateUserOrganization*](#updateuserorganization)
  - [*CreateProof*](#createproof)
  - [*UpdateProof*](#updateproof)
  - [*CreateStaffProfile*](#createstaffprofile)
  - [*CreateCustomerProfile*](#createcustomerprofile)
  - [*CreatePayment*](#createpayment)
  - [*UpdatePaymentStatus*](#updatepaymentstatus)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `default`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@iconic-links/dataconnect` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@iconic-links/dataconnect';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@iconic-links/dataconnect';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetUserById
You can execute the `GetUserById` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getUserById(vars: GetUserByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserByIdData, GetUserByIdVariables>;

interface GetUserByIdRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserByIdVariables): QueryRef<GetUserByIdData, GetUserByIdVariables>;
}
export const getUserByIdRef: GetUserByIdRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserById(dc: DataConnect, vars: GetUserByIdVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserByIdData, GetUserByIdVariables>;

interface GetUserByIdRef {
  ...
  (dc: DataConnect, vars: GetUserByIdVariables): QueryRef<GetUserByIdData, GetUserByIdVariables>;
}
export const getUserByIdRef: GetUserByIdRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserByIdRef:
```typescript
const name = getUserByIdRef.operationName;
console.log(name);
```

### Variables
The `GetUserById` query requires an argument of type `GetUserByIdVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserByIdVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetUserById` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserByIdData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetUserById`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserById, GetUserByIdVariables } from '@iconic-links/dataconnect';

// The `GetUserById` query requires an argument of type `GetUserByIdVariables`:
const getUserByIdVars: GetUserByIdVariables = {
  id: ..., 
};

// Call the `getUserById()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserById(getUserByIdVars);
// Variables can be defined inline as well.
const { data } = await getUserById({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserById(dataConnect, getUserByIdVars);

console.log(data.user);

// Or, you can use the `Promise` API.
getUserById(getUserByIdVars).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetUserById`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserByIdRef, GetUserByIdVariables } from '@iconic-links/dataconnect';

// The `GetUserById` query requires an argument of type `GetUserByIdVariables`:
const getUserByIdVars: GetUserByIdVariables = {
  id: ..., 
};

// Call the `getUserByIdRef()` function to get a reference to the query.
const ref = getUserByIdRef(getUserByIdVars);
// Variables can be defined inline as well.
const ref = getUserByIdRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserByIdRef(dataConnect, getUserByIdVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## ListCategories
You can execute the `ListCategories` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
listCategories(options?: ExecuteQueryOptions): QueryPromise<ListCategoriesData, undefined>;

interface ListCategoriesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListCategoriesData, undefined>;
}
export const listCategoriesRef: ListCategoriesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listCategories(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListCategoriesData, undefined>;

interface ListCategoriesRef {
  ...
  (dc: DataConnect): QueryRef<ListCategoriesData, undefined>;
}
export const listCategoriesRef: ListCategoriesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listCategoriesRef:
```typescript
const name = listCategoriesRef.operationName;
console.log(name);
```

### Variables
The `ListCategories` query has no variables.
### Return Type
Recall that executing the `ListCategories` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListCategoriesData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListCategories`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listCategories } from '@iconic-links/dataconnect';


// Call the `listCategories()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listCategories();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listCategories(dataConnect);

console.log(data.categories);

// Or, you can use the `Promise` API.
listCategories().then((response) => {
  const data = response.data;
  console.log(data.categories);
});
```

### Using `ListCategories`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listCategoriesRef } from '@iconic-links/dataconnect';


// Call the `listCategoriesRef()` function to get a reference to the query.
const ref = listCategoriesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listCategoriesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.categories);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.categories);
});
```

## GetCategoryServices
You can execute the `GetCategoryServices` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getCategoryServices(vars: GetCategoryServicesVariables, options?: ExecuteQueryOptions): QueryPromise<GetCategoryServicesData, GetCategoryServicesVariables>;

interface GetCategoryServicesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCategoryServicesVariables): QueryRef<GetCategoryServicesData, GetCategoryServicesVariables>;
}
export const getCategoryServicesRef: GetCategoryServicesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCategoryServices(dc: DataConnect, vars: GetCategoryServicesVariables, options?: ExecuteQueryOptions): QueryPromise<GetCategoryServicesData, GetCategoryServicesVariables>;

interface GetCategoryServicesRef {
  ...
  (dc: DataConnect, vars: GetCategoryServicesVariables): QueryRef<GetCategoryServicesData, GetCategoryServicesVariables>;
}
export const getCategoryServicesRef: GetCategoryServicesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCategoryServicesRef:
```typescript
const name = getCategoryServicesRef.operationName;
console.log(name);
```

### Variables
The `GetCategoryServices` query requires an argument of type `GetCategoryServicesVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetCategoryServicesVariables {
  categoryId: UUIDString;
}
```
### Return Type
Recall that executing the `GetCategoryServices` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCategoryServicesData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetCategoryServices`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCategoryServices, GetCategoryServicesVariables } from '@iconic-links/dataconnect';

// The `GetCategoryServices` query requires an argument of type `GetCategoryServicesVariables`:
const getCategoryServicesVars: GetCategoryServicesVariables = {
  categoryId: ..., 
};

// Call the `getCategoryServices()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCategoryServices(getCategoryServicesVars);
// Variables can be defined inline as well.
const { data } = await getCategoryServices({ categoryId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCategoryServices(dataConnect, getCategoryServicesVars);

console.log(data.services);

// Or, you can use the `Promise` API.
getCategoryServices(getCategoryServicesVars).then((response) => {
  const data = response.data;
  console.log(data.services);
});
```

### Using `GetCategoryServices`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCategoryServicesRef, GetCategoryServicesVariables } from '@iconic-links/dataconnect';

// The `GetCategoryServices` query requires an argument of type `GetCategoryServicesVariables`:
const getCategoryServicesVars: GetCategoryServicesVariables = {
  categoryId: ..., 
};

// Call the `getCategoryServicesRef()` function to get a reference to the query.
const ref = getCategoryServicesRef(getCategoryServicesVars);
// Variables can be defined inline as well.
const ref = getCategoryServicesRef({ categoryId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCategoryServicesRef(dataConnect, getCategoryServicesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.services);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.services);
});
```

## GetOrder
You can execute the `GetOrder` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getOrder(vars: GetOrderVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrderData, GetOrderVariables>;

interface GetOrderRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOrderVariables): QueryRef<GetOrderData, GetOrderVariables>;
}
export const getOrderRef: GetOrderRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getOrder(dc: DataConnect, vars: GetOrderVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrderData, GetOrderVariables>;

interface GetOrderRef {
  ...
  (dc: DataConnect, vars: GetOrderVariables): QueryRef<GetOrderData, GetOrderVariables>;
}
export const getOrderRef: GetOrderRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getOrderRef:
```typescript
const name = getOrderRef.operationName;
console.log(name);
```

### Variables
The `GetOrder` query requires an argument of type `GetOrderVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetOrderVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetOrder` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetOrderData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
    } & User_Key;
  } & Order_Key;
}
```
### Using `GetOrder`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getOrder, GetOrderVariables } from '@iconic-links/dataconnect';

// The `GetOrder` query requires an argument of type `GetOrderVariables`:
const getOrderVars: GetOrderVariables = {
  id: ..., 
};

// Call the `getOrder()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getOrder(getOrderVars);
// Variables can be defined inline as well.
const { data } = await getOrder({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getOrder(dataConnect, getOrderVars);

console.log(data.order);

// Or, you can use the `Promise` API.
getOrder(getOrderVars).then((response) => {
  const data = response.data;
  console.log(data.order);
});
```

### Using `GetOrder`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getOrderRef, GetOrderVariables } from '@iconic-links/dataconnect';

// The `GetOrder` query requires an argument of type `GetOrderVariables`:
const getOrderVars: GetOrderVariables = {
  id: ..., 
};

// Call the `getOrderRef()` function to get a reference to the query.
const ref = getOrderRef(getOrderVars);
// Variables can be defined inline as well.
const ref = getOrderRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getOrderRef(dataConnect, getOrderVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.order);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.order);
});
```

## ListOrdersByUser
You can execute the `ListOrdersByUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
listOrdersByUser(vars: ListOrdersByUserVariables, options?: ExecuteQueryOptions): QueryPromise<ListOrdersByUserData, ListOrdersByUserVariables>;

interface ListOrdersByUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListOrdersByUserVariables): QueryRef<ListOrdersByUserData, ListOrdersByUserVariables>;
}
export const listOrdersByUserRef: ListOrdersByUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listOrdersByUser(dc: DataConnect, vars: ListOrdersByUserVariables, options?: ExecuteQueryOptions): QueryPromise<ListOrdersByUserData, ListOrdersByUserVariables>;

interface ListOrdersByUserRef {
  ...
  (dc: DataConnect, vars: ListOrdersByUserVariables): QueryRef<ListOrdersByUserData, ListOrdersByUserVariables>;
}
export const listOrdersByUserRef: ListOrdersByUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listOrdersByUserRef:
```typescript
const name = listOrdersByUserRef.operationName;
console.log(name);
```

### Variables
The `ListOrdersByUser` query requires an argument of type `ListOrdersByUserVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListOrdersByUserVariables {
  userId: UUIDString;
}
```
### Return Type
Recall that executing the `ListOrdersByUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListOrdersByUserData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListOrdersByUserData {
  orders: ({
    id: UUIDString;
    orderNumber: string;
    status: string;
    totalAmount: number;
    createdAt: TimestampString;
  } & Order_Key)[];
}
```
### Using `ListOrdersByUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listOrdersByUser, ListOrdersByUserVariables } from '@iconic-links/dataconnect';

// The `ListOrdersByUser` query requires an argument of type `ListOrdersByUserVariables`:
const listOrdersByUserVars: ListOrdersByUserVariables = {
  userId: ..., 
};

// Call the `listOrdersByUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listOrdersByUser(listOrdersByUserVars);
// Variables can be defined inline as well.
const { data } = await listOrdersByUser({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listOrdersByUser(dataConnect, listOrdersByUserVars);

console.log(data.orders);

// Or, you can use the `Promise` API.
listOrdersByUser(listOrdersByUserVars).then((response) => {
  const data = response.data;
  console.log(data.orders);
});
```

### Using `ListOrdersByUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listOrdersByUserRef, ListOrdersByUserVariables } from '@iconic-links/dataconnect';

// The `ListOrdersByUser` query requires an argument of type `ListOrdersByUserVariables`:
const listOrdersByUserVars: ListOrdersByUserVariables = {
  userId: ..., 
};

// Call the `listOrdersByUserRef()` function to get a reference to the query.
const ref = listOrdersByUserRef(listOrdersByUserVars);
// Variables can be defined inline as well.
const ref = listOrdersByUserRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listOrdersByUserRef(dataConnect, listOrdersByUserVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.orders);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.orders);
});
```

## ListInventoryItems
You can execute the `ListInventoryItems` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
listInventoryItems(options?: ExecuteQueryOptions): QueryPromise<ListInventoryItemsData, undefined>;

interface ListInventoryItemsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListInventoryItemsData, undefined>;
}
export const listInventoryItemsRef: ListInventoryItemsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listInventoryItems(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListInventoryItemsData, undefined>;

interface ListInventoryItemsRef {
  ...
  (dc: DataConnect): QueryRef<ListInventoryItemsData, undefined>;
}
export const listInventoryItemsRef: ListInventoryItemsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listInventoryItemsRef:
```typescript
const name = listInventoryItemsRef.operationName;
console.log(name);
```

### Variables
The `ListInventoryItems` query has no variables.
### Return Type
Recall that executing the `ListInventoryItems` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListInventoryItemsData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListInventoryItemsData {
  inventoryItems: ({
    id: UUIDString;
    name: string;
    unitType: string;
    quantity: number;
  } & InventoryItem_Key)[];
}
```
### Using `ListInventoryItems`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listInventoryItems } from '@iconic-links/dataconnect';


// Call the `listInventoryItems()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listInventoryItems();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listInventoryItems(dataConnect);

console.log(data.inventoryItems);

// Or, you can use the `Promise` API.
listInventoryItems().then((response) => {
  const data = response.data;
  console.log(data.inventoryItems);
});
```

### Using `ListInventoryItems`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listInventoryItemsRef } from '@iconic-links/dataconnect';


// Call the `listInventoryItemsRef()` function to get a reference to the query.
const ref = listInventoryItemsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listInventoryItemsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.inventoryItems);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.inventoryItems);
});
```

## GetInventoryItem
You can execute the `GetInventoryItem` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getInventoryItem(vars: GetInventoryItemVariables, options?: ExecuteQueryOptions): QueryPromise<GetInventoryItemData, GetInventoryItemVariables>;

interface GetInventoryItemRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetInventoryItemVariables): QueryRef<GetInventoryItemData, GetInventoryItemVariables>;
}
export const getInventoryItemRef: GetInventoryItemRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getInventoryItem(dc: DataConnect, vars: GetInventoryItemVariables, options?: ExecuteQueryOptions): QueryPromise<GetInventoryItemData, GetInventoryItemVariables>;

interface GetInventoryItemRef {
  ...
  (dc: DataConnect, vars: GetInventoryItemVariables): QueryRef<GetInventoryItemData, GetInventoryItemVariables>;
}
export const getInventoryItemRef: GetInventoryItemRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getInventoryItemRef:
```typescript
const name = getInventoryItemRef.operationName;
console.log(name);
```

### Variables
The `GetInventoryItem` query requires an argument of type `GetInventoryItemVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetInventoryItemVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetInventoryItem` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetInventoryItemData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetInventoryItemData {
  inventoryItem?: {
    id: UUIDString;
    quantity: number;
  } & InventoryItem_Key;
}
```
### Using `GetInventoryItem`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getInventoryItem, GetInventoryItemVariables } from '@iconic-links/dataconnect';

// The `GetInventoryItem` query requires an argument of type `GetInventoryItemVariables`:
const getInventoryItemVars: GetInventoryItemVariables = {
  id: ..., 
};

// Call the `getInventoryItem()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getInventoryItem(getInventoryItemVars);
// Variables can be defined inline as well.
const { data } = await getInventoryItem({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getInventoryItem(dataConnect, getInventoryItemVars);

console.log(data.inventoryItem);

// Or, you can use the `Promise` API.
getInventoryItem(getInventoryItemVars).then((response) => {
  const data = response.data;
  console.log(data.inventoryItem);
});
```

### Using `GetInventoryItem`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getInventoryItemRef, GetInventoryItemVariables } from '@iconic-links/dataconnect';

// The `GetInventoryItem` query requires an argument of type `GetInventoryItemVariables`:
const getInventoryItemVars: GetInventoryItemVariables = {
  id: ..., 
};

// Call the `getInventoryItemRef()` function to get a reference to the query.
const ref = getInventoryItemRef(getInventoryItemVars);
// Variables can be defined inline as well.
const ref = getInventoryItemRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getInventoryItemRef(dataConnect, getInventoryItemVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.inventoryItem);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.inventoryItem);
});
```

## GetUserByIdentifier
You can execute the `GetUserByIdentifier` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getUserByIdentifier(vars: GetUserByIdentifierVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserByIdentifierData, GetUserByIdentifierVariables>;

interface GetUserByIdentifierRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserByIdentifierVariables): QueryRef<GetUserByIdentifierData, GetUserByIdentifierVariables>;
}
export const getUserByIdentifierRef: GetUserByIdentifierRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserByIdentifier(dc: DataConnect, vars: GetUserByIdentifierVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserByIdentifierData, GetUserByIdentifierVariables>;

interface GetUserByIdentifierRef {
  ...
  (dc: DataConnect, vars: GetUserByIdentifierVariables): QueryRef<GetUserByIdentifierData, GetUserByIdentifierVariables>;
}
export const getUserByIdentifierRef: GetUserByIdentifierRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserByIdentifierRef:
```typescript
const name = getUserByIdentifierRef.operationName;
console.log(name);
```

### Variables
The `GetUserByIdentifier` query requires an argument of type `GetUserByIdentifierVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserByIdentifierVariables {
  identifier: string;
}
```
### Return Type
Recall that executing the `GetUserByIdentifier` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserByIdentifierData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserByIdentifierData {
  users: ({
    id: UUIDString;
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    role: string;
  } & User_Key)[];
}
```
### Using `GetUserByIdentifier`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserByIdentifier, GetUserByIdentifierVariables } from '@iconic-links/dataconnect';

// The `GetUserByIdentifier` query requires an argument of type `GetUserByIdentifierVariables`:
const getUserByIdentifierVars: GetUserByIdentifierVariables = {
  identifier: ..., 
};

// Call the `getUserByIdentifier()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserByIdentifier(getUserByIdentifierVars);
// Variables can be defined inline as well.
const { data } = await getUserByIdentifier({ identifier: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserByIdentifier(dataConnect, getUserByIdentifierVars);

console.log(data.users);

// Or, you can use the `Promise` API.
getUserByIdentifier(getUserByIdentifierVars).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `GetUserByIdentifier`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserByIdentifierRef, GetUserByIdentifierVariables } from '@iconic-links/dataconnect';

// The `GetUserByIdentifier` query requires an argument of type `GetUserByIdentifierVariables`:
const getUserByIdentifierVars: GetUserByIdentifierVariables = {
  identifier: ..., 
};

// Call the `getUserByIdentifierRef()` function to get a reference to the query.
const ref = getUserByIdentifierRef(getUserByIdentifierVars);
// Variables can be defined inline as well.
const ref = getUserByIdentifierRef({ identifier: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserByIdentifierRef(dataConnect, getUserByIdentifierVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## GetDelivery
You can execute the `GetDelivery` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getDelivery(vars: GetDeliveryVariables, options?: ExecuteQueryOptions): QueryPromise<GetDeliveryData, GetDeliveryVariables>;

interface GetDeliveryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetDeliveryVariables): QueryRef<GetDeliveryData, GetDeliveryVariables>;
}
export const getDeliveryRef: GetDeliveryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getDelivery(dc: DataConnect, vars: GetDeliveryVariables, options?: ExecuteQueryOptions): QueryPromise<GetDeliveryData, GetDeliveryVariables>;

interface GetDeliveryRef {
  ...
  (dc: DataConnect, vars: GetDeliveryVariables): QueryRef<GetDeliveryData, GetDeliveryVariables>;
}
export const getDeliveryRef: GetDeliveryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getDeliveryRef:
```typescript
const name = getDeliveryRef.operationName;
console.log(name);
```

### Variables
The `GetDelivery` query requires an argument of type `GetDeliveryVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetDeliveryVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetDelivery` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetDeliveryData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetDeliveryData {
  delivery?: {
    id: UUIDString;
    orderId: UUIDString;
    status: string;
    address: string;
    driverId?: UUIDString | null;
  } & Delivery_Key;
}
```
### Using `GetDelivery`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getDelivery, GetDeliveryVariables } from '@iconic-links/dataconnect';

// The `GetDelivery` query requires an argument of type `GetDeliveryVariables`:
const getDeliveryVars: GetDeliveryVariables = {
  id: ..., 
};

// Call the `getDelivery()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getDelivery(getDeliveryVars);
// Variables can be defined inline as well.
const { data } = await getDelivery({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getDelivery(dataConnect, getDeliveryVars);

console.log(data.delivery);

// Or, you can use the `Promise` API.
getDelivery(getDeliveryVars).then((response) => {
  const data = response.data;
  console.log(data.delivery);
});
```

### Using `GetDelivery`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getDeliveryRef, GetDeliveryVariables } from '@iconic-links/dataconnect';

// The `GetDelivery` query requires an argument of type `GetDeliveryVariables`:
const getDeliveryVars: GetDeliveryVariables = {
  id: ..., 
};

// Call the `getDeliveryRef()` function to get a reference to the query.
const ref = getDeliveryRef(getDeliveryVars);
// Variables can be defined inline as well.
const ref = getDeliveryRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getDeliveryRef(dataConnect, getDeliveryVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.delivery);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.delivery);
});
```

## GetOrderProofs
You can execute the `GetOrderProofs` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getOrderProofs(vars: GetOrderProofsVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrderProofsData, GetOrderProofsVariables>;

interface GetOrderProofsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOrderProofsVariables): QueryRef<GetOrderProofsData, GetOrderProofsVariables>;
}
export const getOrderProofsRef: GetOrderProofsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getOrderProofs(dc: DataConnect, vars: GetOrderProofsVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrderProofsData, GetOrderProofsVariables>;

interface GetOrderProofsRef {
  ...
  (dc: DataConnect, vars: GetOrderProofsVariables): QueryRef<GetOrderProofsData, GetOrderProofsVariables>;
}
export const getOrderProofsRef: GetOrderProofsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getOrderProofsRef:
```typescript
const name = getOrderProofsRef.operationName;
console.log(name);
```

### Variables
The `GetOrderProofs` query requires an argument of type `GetOrderProofsVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetOrderProofsVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetOrderProofs` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetOrderProofsData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetOrderProofs`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getOrderProofs, GetOrderProofsVariables } from '@iconic-links/dataconnect';

// The `GetOrderProofs` query requires an argument of type `GetOrderProofsVariables`:
const getOrderProofsVars: GetOrderProofsVariables = {
  id: ..., 
};

// Call the `getOrderProofs()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getOrderProofs(getOrderProofsVars);
// Variables can be defined inline as well.
const { data } = await getOrderProofs({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getOrderProofs(dataConnect, getOrderProofsVars);

console.log(data.order);

// Or, you can use the `Promise` API.
getOrderProofs(getOrderProofsVars).then((response) => {
  const data = response.data;
  console.log(data.order);
});
```

### Using `GetOrderProofs`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getOrderProofsRef, GetOrderProofsVariables } from '@iconic-links/dataconnect';

// The `GetOrderProofs` query requires an argument of type `GetOrderProofsVariables`:
const getOrderProofsVars: GetOrderProofsVariables = {
  id: ..., 
};

// Call the `getOrderProofsRef()` function to get a reference to the query.
const ref = getOrderProofsRef(getOrderProofsVars);
// Variables can be defined inline as well.
const ref = getOrderProofsRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getOrderProofsRef(dataConnect, getOrderProofsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.order);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.order);
});
```

## GetProof
You can execute the `GetProof` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getProof(vars: GetProofVariables, options?: ExecuteQueryOptions): QueryPromise<GetProofData, GetProofVariables>;

interface GetProofRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetProofVariables): QueryRef<GetProofData, GetProofVariables>;
}
export const getProofRef: GetProofRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getProof(dc: DataConnect, vars: GetProofVariables, options?: ExecuteQueryOptions): QueryPromise<GetProofData, GetProofVariables>;

interface GetProofRef {
  ...
  (dc: DataConnect, vars: GetProofVariables): QueryRef<GetProofData, GetProofVariables>;
}
export const getProofRef: GetProofRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getProofRef:
```typescript
const name = getProofRef.operationName;
console.log(name);
```

### Variables
The `GetProof` query requires an argument of type `GetProofVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetProofVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetProof` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetProofData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetProofData {
  proof?: {
    id: UUIDString;
    orderId: UUIDString;
  } & Proof_Key;
}
```
### Using `GetProof`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getProof, GetProofVariables } from '@iconic-links/dataconnect';

// The `GetProof` query requires an argument of type `GetProofVariables`:
const getProofVars: GetProofVariables = {
  id: ..., 
};

// Call the `getProof()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getProof(getProofVars);
// Variables can be defined inline as well.
const { data } = await getProof({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getProof(dataConnect, getProofVars);

console.log(data.proof);

// Or, you can use the `Promise` API.
getProof(getProofVars).then((response) => {
  const data = response.data;
  console.log(data.proof);
});
```

### Using `GetProof`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getProofRef, GetProofVariables } from '@iconic-links/dataconnect';

// The `GetProof` query requires an argument of type `GetProofVariables`:
const getProofVars: GetProofVariables = {
  id: ..., 
};

// Call the `getProofRef()` function to get a reference to the query.
const ref = getProofRef(getProofVars);
// Variables can be defined inline as well.
const ref = getProofRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getProofRef(dataConnect, getProofVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.proof);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.proof);
});
```

## ListRecentOrders
You can execute the `ListRecentOrders` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
listRecentOrders(options?: ExecuteQueryOptions): QueryPromise<ListRecentOrdersData, undefined>;

interface ListRecentOrdersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListRecentOrdersData, undefined>;
}
export const listRecentOrdersRef: ListRecentOrdersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listRecentOrders(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListRecentOrdersData, undefined>;

interface ListRecentOrdersRef {
  ...
  (dc: DataConnect): QueryRef<ListRecentOrdersData, undefined>;
}
export const listRecentOrdersRef: ListRecentOrdersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listRecentOrdersRef:
```typescript
const name = listRecentOrdersRef.operationName;
console.log(name);
```

### Variables
The `ListRecentOrders` query has no variables.
### Return Type
Recall that executing the `ListRecentOrders` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListRecentOrdersData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListRecentOrders`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listRecentOrders } from '@iconic-links/dataconnect';


// Call the `listRecentOrders()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listRecentOrders();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listRecentOrders(dataConnect);

console.log(data.orders);

// Or, you can use the `Promise` API.
listRecentOrders().then((response) => {
  const data = response.data;
  console.log(data.orders);
});
```

### Using `ListRecentOrders`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listRecentOrdersRef } from '@iconic-links/dataconnect';


// Call the `listRecentOrdersRef()` function to get a reference to the query.
const ref = listRecentOrdersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listRecentOrdersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.orders);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.orders);
});
```

## ListActiveDeliveries
You can execute the `ListActiveDeliveries` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
listActiveDeliveries(options?: ExecuteQueryOptions): QueryPromise<ListActiveDeliveriesData, undefined>;

interface ListActiveDeliveriesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListActiveDeliveriesData, undefined>;
}
export const listActiveDeliveriesRef: ListActiveDeliveriesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listActiveDeliveries(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListActiveDeliveriesData, undefined>;

interface ListActiveDeliveriesRef {
  ...
  (dc: DataConnect): QueryRef<ListActiveDeliveriesData, undefined>;
}
export const listActiveDeliveriesRef: ListActiveDeliveriesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listActiveDeliveriesRef:
```typescript
const name = listActiveDeliveriesRef.operationName;
console.log(name);
```

### Variables
The `ListActiveDeliveries` query has no variables.
### Return Type
Recall that executing the `ListActiveDeliveries` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListActiveDeliveriesData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListActiveDeliveries`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listActiveDeliveries } from '@iconic-links/dataconnect';


// Call the `listActiveDeliveries()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listActiveDeliveries();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listActiveDeliveries(dataConnect);

console.log(data.deliveries);

// Or, you can use the `Promise` API.
listActiveDeliveries().then((response) => {
  const data = response.data;
  console.log(data.deliveries);
});
```

### Using `ListActiveDeliveries`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listActiveDeliveriesRef } from '@iconic-links/dataconnect';


// Call the `listActiveDeliveriesRef()` function to get a reference to the query.
const ref = listActiveDeliveriesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listActiveDeliveriesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.deliveries);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.deliveries);
});
```

## ListUsersByRole
You can execute the `ListUsersByRole` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
listUsersByRole(vars: ListUsersByRoleVariables, options?: ExecuteQueryOptions): QueryPromise<ListUsersByRoleData, ListUsersByRoleVariables>;

interface ListUsersByRoleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListUsersByRoleVariables): QueryRef<ListUsersByRoleData, ListUsersByRoleVariables>;
}
export const listUsersByRoleRef: ListUsersByRoleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUsersByRole(dc: DataConnect, vars: ListUsersByRoleVariables, options?: ExecuteQueryOptions): QueryPromise<ListUsersByRoleData, ListUsersByRoleVariables>;

interface ListUsersByRoleRef {
  ...
  (dc: DataConnect, vars: ListUsersByRoleVariables): QueryRef<ListUsersByRoleData, ListUsersByRoleVariables>;
}
export const listUsersByRoleRef: ListUsersByRoleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUsersByRoleRef:
```typescript
const name = listUsersByRoleRef.operationName;
console.log(name);
```

### Variables
The `ListUsersByRole` query requires an argument of type `ListUsersByRoleVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListUsersByRoleVariables {
  role: string;
}
```
### Return Type
Recall that executing the `ListUsersByRole` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUsersByRoleData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListUsersByRoleData {
  users: ({
    id: UUIDString;
    name?: string | null;
    email?: string | null;
  } & User_Key)[];
}
```
### Using `ListUsersByRole`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUsersByRole, ListUsersByRoleVariables } from '@iconic-links/dataconnect';

// The `ListUsersByRole` query requires an argument of type `ListUsersByRoleVariables`:
const listUsersByRoleVars: ListUsersByRoleVariables = {
  role: ..., 
};

// Call the `listUsersByRole()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUsersByRole(listUsersByRoleVars);
// Variables can be defined inline as well.
const { data } = await listUsersByRole({ role: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUsersByRole(dataConnect, listUsersByRoleVars);

console.log(data.users);

// Or, you can use the `Promise` API.
listUsersByRole(listUsersByRoleVars).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `ListUsersByRole`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUsersByRoleRef, ListUsersByRoleVariables } from '@iconic-links/dataconnect';

// The `ListUsersByRole` query requires an argument of type `ListUsersByRoleVariables`:
const listUsersByRoleVars: ListUsersByRoleVariables = {
  role: ..., 
};

// Call the `listUsersByRoleRef()` function to get a reference to the query.
const ref = listUsersByRoleRef(listUsersByRoleVars);
// Variables can be defined inline as well.
const ref = listUsersByRoleRef({ role: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUsersByRoleRef(dataConnect, listUsersByRoleVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## ListAllOrdersForIntelligence
You can execute the `ListAllOrdersForIntelligence` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
listAllOrdersForIntelligence(options?: ExecuteQueryOptions): QueryPromise<ListAllOrdersForIntelligenceData, undefined>;

interface ListAllOrdersForIntelligenceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllOrdersForIntelligenceData, undefined>;
}
export const listAllOrdersForIntelligenceRef: ListAllOrdersForIntelligenceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAllOrdersForIntelligence(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAllOrdersForIntelligenceData, undefined>;

interface ListAllOrdersForIntelligenceRef {
  ...
  (dc: DataConnect): QueryRef<ListAllOrdersForIntelligenceData, undefined>;
}
export const listAllOrdersForIntelligenceRef: ListAllOrdersForIntelligenceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAllOrdersForIntelligenceRef:
```typescript
const name = listAllOrdersForIntelligenceRef.operationName;
console.log(name);
```

### Variables
The `ListAllOrdersForIntelligence` query has no variables.
### Return Type
Recall that executing the `ListAllOrdersForIntelligence` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAllOrdersForIntelligenceData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListAllOrdersForIntelligence`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAllOrdersForIntelligence } from '@iconic-links/dataconnect';


// Call the `listAllOrdersForIntelligence()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAllOrdersForIntelligence();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAllOrdersForIntelligence(dataConnect);

console.log(data.orders);

// Or, you can use the `Promise` API.
listAllOrdersForIntelligence().then((response) => {
  const data = response.data;
  console.log(data.orders);
});
```

### Using `ListAllOrdersForIntelligence`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAllOrdersForIntelligenceRef } from '@iconic-links/dataconnect';


// Call the `listAllOrdersForIntelligenceRef()` function to get a reference to the query.
const ref = listAllOrdersForIntelligenceRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAllOrdersForIntelligenceRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.orders);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.orders);
});
```

## ListWastedConsumptions
You can execute the `ListWastedConsumptions` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
listWastedConsumptions(options?: ExecuteQueryOptions): QueryPromise<ListWastedConsumptionsData, undefined>;

interface ListWastedConsumptionsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListWastedConsumptionsData, undefined>;
}
export const listWastedConsumptionsRef: ListWastedConsumptionsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listWastedConsumptions(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListWastedConsumptionsData, undefined>;

interface ListWastedConsumptionsRef {
  ...
  (dc: DataConnect): QueryRef<ListWastedConsumptionsData, undefined>;
}
export const listWastedConsumptionsRef: ListWastedConsumptionsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listWastedConsumptionsRef:
```typescript
const name = listWastedConsumptionsRef.operationName;
console.log(name);
```

### Variables
The `ListWastedConsumptions` query has no variables.
### Return Type
Recall that executing the `ListWastedConsumptions` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListWastedConsumptionsData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListWastedConsumptionsData {
  materialConsumptions: ({
    id: UUIDString;
    wastage: number;
    inventoryItem: {
      name: string;
    };
  } & MaterialConsumption_Key)[];
}
```
### Using `ListWastedConsumptions`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listWastedConsumptions } from '@iconic-links/dataconnect';


// Call the `listWastedConsumptions()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listWastedConsumptions();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listWastedConsumptions(dataConnect);

console.log(data.materialConsumptions);

// Or, you can use the `Promise` API.
listWastedConsumptions().then((response) => {
  const data = response.data;
  console.log(data.materialConsumptions);
});
```

### Using `ListWastedConsumptions`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listWastedConsumptionsRef } from '@iconic-links/dataconnect';


// Call the `listWastedConsumptionsRef()` function to get a reference to the query.
const ref = listWastedConsumptionsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listWastedConsumptionsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.materialConsumptions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.materialConsumptions);
});
```

## GetOrderWithDetails
You can execute the `GetOrderWithDetails` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getOrderWithDetails(vars: GetOrderWithDetailsVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrderWithDetailsData, GetOrderWithDetailsVariables>;

interface GetOrderWithDetailsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOrderWithDetailsVariables): QueryRef<GetOrderWithDetailsData, GetOrderWithDetailsVariables>;
}
export const getOrderWithDetailsRef: GetOrderWithDetailsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getOrderWithDetails(dc: DataConnect, vars: GetOrderWithDetailsVariables, options?: ExecuteQueryOptions): QueryPromise<GetOrderWithDetailsData, GetOrderWithDetailsVariables>;

interface GetOrderWithDetailsRef {
  ...
  (dc: DataConnect, vars: GetOrderWithDetailsVariables): QueryRef<GetOrderWithDetailsData, GetOrderWithDetailsVariables>;
}
export const getOrderWithDetailsRef: GetOrderWithDetailsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getOrderWithDetailsRef:
```typescript
const name = getOrderWithDetailsRef.operationName;
console.log(name);
```

### Variables
The `GetOrderWithDetails` query requires an argument of type `GetOrderWithDetailsVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetOrderWithDetailsVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetOrderWithDetails` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetOrderWithDetailsData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetOrderWithDetails`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getOrderWithDetails, GetOrderWithDetailsVariables } from '@iconic-links/dataconnect';

// The `GetOrderWithDetails` query requires an argument of type `GetOrderWithDetailsVariables`:
const getOrderWithDetailsVars: GetOrderWithDetailsVariables = {
  id: ..., 
};

// Call the `getOrderWithDetails()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getOrderWithDetails(getOrderWithDetailsVars);
// Variables can be defined inline as well.
const { data } = await getOrderWithDetails({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getOrderWithDetails(dataConnect, getOrderWithDetailsVars);

console.log(data.order);

// Or, you can use the `Promise` API.
getOrderWithDetails(getOrderWithDetailsVars).then((response) => {
  const data = response.data;
  console.log(data.order);
});
```

### Using `GetOrderWithDetails`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getOrderWithDetailsRef, GetOrderWithDetailsVariables } from '@iconic-links/dataconnect';

// The `GetOrderWithDetails` query requires an argument of type `GetOrderWithDetailsVariables`:
const getOrderWithDetailsVars: GetOrderWithDetailsVariables = {
  id: ..., 
};

// Call the `getOrderWithDetailsRef()` function to get a reference to the query.
const ref = getOrderWithDetailsRef(getOrderWithDetailsVars);
// Variables can be defined inline as well.
const ref = getOrderWithDetailsRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getOrderWithDetailsRef(dataConnect, getOrderWithDetailsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.order);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.order);
});
```

## ListOrdersForQC
You can execute the `ListOrdersForQC` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
listOrdersForQc(options?: ExecuteQueryOptions): QueryPromise<ListOrdersForQcData, undefined>;

interface ListOrdersForQcRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListOrdersForQcData, undefined>;
}
export const listOrdersForQcRef: ListOrdersForQcRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listOrdersForQc(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListOrdersForQcData, undefined>;

interface ListOrdersForQcRef {
  ...
  (dc: DataConnect): QueryRef<ListOrdersForQcData, undefined>;
}
export const listOrdersForQcRef: ListOrdersForQcRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listOrdersForQcRef:
```typescript
const name = listOrdersForQcRef.operationName;
console.log(name);
```

### Variables
The `ListOrdersForQC` query has no variables.
### Return Type
Recall that executing the `ListOrdersForQC` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListOrdersForQcData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListOrdersForQC`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listOrdersForQc } from '@iconic-links/dataconnect';


// Call the `listOrdersForQc()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listOrdersForQc();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listOrdersForQc(dataConnect);

console.log(data.orders);

// Or, you can use the `Promise` API.
listOrdersForQc().then((response) => {
  const data = response.data;
  console.log(data.orders);
});
```

### Using `ListOrdersForQC`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listOrdersForQcRef } from '@iconic-links/dataconnect';


// Call the `listOrdersForQcRef()` function to get a reference to the query.
const ref = listOrdersForQcRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listOrdersForQcRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.orders);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.orders);
});
```

## ListOrdersByUserWithDetails
You can execute the `ListOrdersByUserWithDetails` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
listOrdersByUserWithDetails(vars: ListOrdersByUserWithDetailsVariables, options?: ExecuteQueryOptions): QueryPromise<ListOrdersByUserWithDetailsData, ListOrdersByUserWithDetailsVariables>;

interface ListOrdersByUserWithDetailsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ListOrdersByUserWithDetailsVariables): QueryRef<ListOrdersByUserWithDetailsData, ListOrdersByUserWithDetailsVariables>;
}
export const listOrdersByUserWithDetailsRef: ListOrdersByUserWithDetailsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listOrdersByUserWithDetails(dc: DataConnect, vars: ListOrdersByUserWithDetailsVariables, options?: ExecuteQueryOptions): QueryPromise<ListOrdersByUserWithDetailsData, ListOrdersByUserWithDetailsVariables>;

interface ListOrdersByUserWithDetailsRef {
  ...
  (dc: DataConnect, vars: ListOrdersByUserWithDetailsVariables): QueryRef<ListOrdersByUserWithDetailsData, ListOrdersByUserWithDetailsVariables>;
}
export const listOrdersByUserWithDetailsRef: ListOrdersByUserWithDetailsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listOrdersByUserWithDetailsRef:
```typescript
const name = listOrdersByUserWithDetailsRef.operationName;
console.log(name);
```

### Variables
The `ListOrdersByUserWithDetails` query requires an argument of type `ListOrdersByUserWithDetailsVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ListOrdersByUserWithDetailsVariables {
  userId: UUIDString;
}
```
### Return Type
Recall that executing the `ListOrdersByUserWithDetails` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListOrdersByUserWithDetailsData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListOrdersByUserWithDetails`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listOrdersByUserWithDetails, ListOrdersByUserWithDetailsVariables } from '@iconic-links/dataconnect';

// The `ListOrdersByUserWithDetails` query requires an argument of type `ListOrdersByUserWithDetailsVariables`:
const listOrdersByUserWithDetailsVars: ListOrdersByUserWithDetailsVariables = {
  userId: ..., 
};

// Call the `listOrdersByUserWithDetails()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listOrdersByUserWithDetails(listOrdersByUserWithDetailsVars);
// Variables can be defined inline as well.
const { data } = await listOrdersByUserWithDetails({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listOrdersByUserWithDetails(dataConnect, listOrdersByUserWithDetailsVars);

console.log(data.orders);

// Or, you can use the `Promise` API.
listOrdersByUserWithDetails(listOrdersByUserWithDetailsVars).then((response) => {
  const data = response.data;
  console.log(data.orders);
});
```

### Using `ListOrdersByUserWithDetails`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listOrdersByUserWithDetailsRef, ListOrdersByUserWithDetailsVariables } from '@iconic-links/dataconnect';

// The `ListOrdersByUserWithDetails` query requires an argument of type `ListOrdersByUserWithDetailsVariables`:
const listOrdersByUserWithDetailsVars: ListOrdersByUserWithDetailsVariables = {
  userId: ..., 
};

// Call the `listOrdersByUserWithDetailsRef()` function to get a reference to the query.
const ref = listOrdersByUserWithDetailsRef(listOrdersByUserWithDetailsVars);
// Variables can be defined inline as well.
const ref = listOrdersByUserWithDetailsRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listOrdersByUserWithDetailsRef(dataConnect, listOrdersByUserWithDetailsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.orders);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.orders);
});
```

## GetWorkerJob
You can execute the `GetWorkerJob` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getWorkerJob(vars: GetWorkerJobVariables, options?: ExecuteQueryOptions): QueryPromise<GetWorkerJobData, GetWorkerJobVariables>;

interface GetWorkerJobRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetWorkerJobVariables): QueryRef<GetWorkerJobData, GetWorkerJobVariables>;
}
export const getWorkerJobRef: GetWorkerJobRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getWorkerJob(dc: DataConnect, vars: GetWorkerJobVariables, options?: ExecuteQueryOptions): QueryPromise<GetWorkerJobData, GetWorkerJobVariables>;

interface GetWorkerJobRef {
  ...
  (dc: DataConnect, vars: GetWorkerJobVariables): QueryRef<GetWorkerJobData, GetWorkerJobVariables>;
}
export const getWorkerJobRef: GetWorkerJobRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getWorkerJobRef:
```typescript
const name = getWorkerJobRef.operationName;
console.log(name);
```

### Variables
The `GetWorkerJob` query requires an argument of type `GetWorkerJobVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetWorkerJobVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetWorkerJob` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetWorkerJobData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetWorkerJob`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getWorkerJob, GetWorkerJobVariables } from '@iconic-links/dataconnect';

// The `GetWorkerJob` query requires an argument of type `GetWorkerJobVariables`:
const getWorkerJobVars: GetWorkerJobVariables = {
  id: ..., 
};

// Call the `getWorkerJob()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getWorkerJob(getWorkerJobVars);
// Variables can be defined inline as well.
const { data } = await getWorkerJob({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getWorkerJob(dataConnect, getWorkerJobVars);

console.log(data.order);

// Or, you can use the `Promise` API.
getWorkerJob(getWorkerJobVars).then((response) => {
  const data = response.data;
  console.log(data.order);
});
```

### Using `GetWorkerJob`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getWorkerJobRef, GetWorkerJobVariables } from '@iconic-links/dataconnect';

// The `GetWorkerJob` query requires an argument of type `GetWorkerJobVariables`:
const getWorkerJobVars: GetWorkerJobVariables = {
  id: ..., 
};

// Call the `getWorkerJobRef()` function to get a reference to the query.
const ref = getWorkerJobRef(getWorkerJobVars);
// Variables can be defined inline as well.
const ref = getWorkerJobRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getWorkerJobRef(dataConnect, getWorkerJobVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.order);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.order);
});
```

## ListOrganizationsWithUsers
You can execute the `ListOrganizationsWithUsers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
listOrganizationsWithUsers(options?: ExecuteQueryOptions): QueryPromise<ListOrganizationsWithUsersData, undefined>;

interface ListOrganizationsWithUsersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListOrganizationsWithUsersData, undefined>;
}
export const listOrganizationsWithUsersRef: ListOrganizationsWithUsersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listOrganizationsWithUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListOrganizationsWithUsersData, undefined>;

interface ListOrganizationsWithUsersRef {
  ...
  (dc: DataConnect): QueryRef<ListOrganizationsWithUsersData, undefined>;
}
export const listOrganizationsWithUsersRef: ListOrganizationsWithUsersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listOrganizationsWithUsersRef:
```typescript
const name = listOrganizationsWithUsersRef.operationName;
console.log(name);
```

### Variables
The `ListOrganizationsWithUsers` query has no variables.
### Return Type
Recall that executing the `ListOrganizationsWithUsers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListOrganizationsWithUsersData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListOrganizationsWithUsers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listOrganizationsWithUsers } from '@iconic-links/dataconnect';


// Call the `listOrganizationsWithUsers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listOrganizationsWithUsers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listOrganizationsWithUsers(dataConnect);

console.log(data.organizations);

// Or, you can use the `Promise` API.
listOrganizationsWithUsers().then((response) => {
  const data = response.data;
  console.log(data.organizations);
});
```

### Using `ListOrganizationsWithUsers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listOrganizationsWithUsersRef } from '@iconic-links/dataconnect';


// Call the `listOrganizationsWithUsersRef()` function to get a reference to the query.
const ref = listOrganizationsWithUsersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listOrganizationsWithUsersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.organizations);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.organizations);
});
```

## GetService
You can execute the `GetService` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getService(vars: GetServiceVariables, options?: ExecuteQueryOptions): QueryPromise<GetServiceData, GetServiceVariables>;

interface GetServiceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetServiceVariables): QueryRef<GetServiceData, GetServiceVariables>;
}
export const getServiceRef: GetServiceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getService(dc: DataConnect, vars: GetServiceVariables, options?: ExecuteQueryOptions): QueryPromise<GetServiceData, GetServiceVariables>;

interface GetServiceRef {
  ...
  (dc: DataConnect, vars: GetServiceVariables): QueryRef<GetServiceData, GetServiceVariables>;
}
export const getServiceRef: GetServiceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getServiceRef:
```typescript
const name = getServiceRef.operationName;
console.log(name);
```

### Variables
The `GetService` query requires an argument of type `GetServiceVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetServiceVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetService` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetServiceData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetService`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getService, GetServiceVariables } from '@iconic-links/dataconnect';

// The `GetService` query requires an argument of type `GetServiceVariables`:
const getServiceVars: GetServiceVariables = {
  id: ..., 
};

// Call the `getService()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getService(getServiceVars);
// Variables can be defined inline as well.
const { data } = await getService({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getService(dataConnect, getServiceVars);

console.log(data.service);

// Or, you can use the `Promise` API.
getService(getServiceVars).then((response) => {
  const data = response.data;
  console.log(data.service);
});
```

### Using `GetService`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getServiceRef, GetServiceVariables } from '@iconic-links/dataconnect';

// The `GetService` query requires an argument of type `GetServiceVariables`:
const getServiceVars: GetServiceVariables = {
  id: ..., 
};

// Call the `getServiceRef()` function to get a reference to the query.
const ref = getServiceRef(getServiceVars);
// Variables can be defined inline as well.
const ref = getServiceRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getServiceRef(dataConnect, getServiceVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.service);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.service);
});
```

## GetPaymentByReference
You can execute the `GetPaymentByReference` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getPaymentByReference(vars: GetPaymentByReferenceVariables, options?: ExecuteQueryOptions): QueryPromise<GetPaymentByReferenceData, GetPaymentByReferenceVariables>;

interface GetPaymentByReferenceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetPaymentByReferenceVariables): QueryRef<GetPaymentByReferenceData, GetPaymentByReferenceVariables>;
}
export const getPaymentByReferenceRef: GetPaymentByReferenceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getPaymentByReference(dc: DataConnect, vars: GetPaymentByReferenceVariables, options?: ExecuteQueryOptions): QueryPromise<GetPaymentByReferenceData, GetPaymentByReferenceVariables>;

interface GetPaymentByReferenceRef {
  ...
  (dc: DataConnect, vars: GetPaymentByReferenceVariables): QueryRef<GetPaymentByReferenceData, GetPaymentByReferenceVariables>;
}
export const getPaymentByReferenceRef: GetPaymentByReferenceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getPaymentByReferenceRef:
```typescript
const name = getPaymentByReferenceRef.operationName;
console.log(name);
```

### Variables
The `GetPaymentByReference` query requires an argument of type `GetPaymentByReferenceVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetPaymentByReferenceVariables {
  reference: string;
}
```
### Return Type
Recall that executing the `GetPaymentByReference` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetPaymentByReferenceData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetPaymentByReferenceData {
  payments: ({
    id: UUIDString;
    orderId: UUIDString;
    amount: number;
    status: string;
    order: {
      status: string;
    };
  } & Payment_Key)[];
}
```
### Using `GetPaymentByReference`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getPaymentByReference, GetPaymentByReferenceVariables } from '@iconic-links/dataconnect';

// The `GetPaymentByReference` query requires an argument of type `GetPaymentByReferenceVariables`:
const getPaymentByReferenceVars: GetPaymentByReferenceVariables = {
  reference: ..., 
};

// Call the `getPaymentByReference()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getPaymentByReference(getPaymentByReferenceVars);
// Variables can be defined inline as well.
const { data } = await getPaymentByReference({ reference: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getPaymentByReference(dataConnect, getPaymentByReferenceVars);

console.log(data.payments);

// Or, you can use the `Promise` API.
getPaymentByReference(getPaymentByReferenceVars).then((response) => {
  const data = response.data;
  console.log(data.payments);
});
```

### Using `GetPaymentByReference`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getPaymentByReferenceRef, GetPaymentByReferenceVariables } from '@iconic-links/dataconnect';

// The `GetPaymentByReference` query requires an argument of type `GetPaymentByReferenceVariables`:
const getPaymentByReferenceVars: GetPaymentByReferenceVariables = {
  reference: ..., 
};

// Call the `getPaymentByReferenceRef()` function to get a reference to the query.
const ref = getPaymentByReferenceRef(getPaymentByReferenceVars);
// Variables can be defined inline as well.
const ref = getPaymentByReferenceRef({ reference: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getPaymentByReferenceRef(dataConnect, getPaymentByReferenceVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.payments);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.payments);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `default` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createUser(vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect, vars: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  (dc: DataConnect, vars: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation requires an argument of type `CreateUserVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateUserVariables {
  phone?: string | null;
  email?: string | null;
  name?: string | null;
  role: string;
}
```
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser, CreateUserVariables } from '@iconic-links/dataconnect';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  phone: ..., // optional
  email: ..., // optional
  name: ..., // optional
  role: ..., 
};

// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser(createUserVars);
// Variables can be defined inline as well.
const { data } = await createUser({ phone: ..., email: ..., name: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect, createUserVars);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser(createUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef, CreateUserVariables } from '@iconic-links/dataconnect';

// The `CreateUser` mutation requires an argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  phone: ..., // optional
  email: ..., // optional
  name: ..., // optional
  role: ..., 
};

// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef(createUserVars);
// Variables can be defined inline as well.
const ref = createUserRef({ phone: ..., email: ..., name: ..., role: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect, createUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## CreateOrder
You can execute the `CreateOrder` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createOrder(vars: CreateOrderVariables): MutationPromise<CreateOrderData, CreateOrderVariables>;

interface CreateOrderRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateOrderVariables): MutationRef<CreateOrderData, CreateOrderVariables>;
}
export const createOrderRef: CreateOrderRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createOrder(dc: DataConnect, vars: CreateOrderVariables): MutationPromise<CreateOrderData, CreateOrderVariables>;

interface CreateOrderRef {
  ...
  (dc: DataConnect, vars: CreateOrderVariables): MutationRef<CreateOrderData, CreateOrderVariables>;
}
export const createOrderRef: CreateOrderRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createOrderRef:
```typescript
const name = createOrderRef.operationName;
console.log(name);
```

### Variables
The `CreateOrder` mutation requires an argument of type `CreateOrderVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateOrderVariables {
  userId: UUIDString;
  orderNumber: string;
  totalAmount: number;
}
```
### Return Type
Recall that executing the `CreateOrder` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateOrderData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateOrderData {
  order_insert: Order_Key;
}
```
### Using `CreateOrder`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createOrder, CreateOrderVariables } from '@iconic-links/dataconnect';

// The `CreateOrder` mutation requires an argument of type `CreateOrderVariables`:
const createOrderVars: CreateOrderVariables = {
  userId: ..., 
  orderNumber: ..., 
  totalAmount: ..., 
};

// Call the `createOrder()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createOrder(createOrderVars);
// Variables can be defined inline as well.
const { data } = await createOrder({ userId: ..., orderNumber: ..., totalAmount: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createOrder(dataConnect, createOrderVars);

console.log(data.order_insert);

// Or, you can use the `Promise` API.
createOrder(createOrderVars).then((response) => {
  const data = response.data;
  console.log(data.order_insert);
});
```

### Using `CreateOrder`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createOrderRef, CreateOrderVariables } from '@iconic-links/dataconnect';

// The `CreateOrder` mutation requires an argument of type `CreateOrderVariables`:
const createOrderVars: CreateOrderVariables = {
  userId: ..., 
  orderNumber: ..., 
  totalAmount: ..., 
};

// Call the `createOrderRef()` function to get a reference to the mutation.
const ref = createOrderRef(createOrderVars);
// Variables can be defined inline as well.
const ref = createOrderRef({ userId: ..., orderNumber: ..., totalAmount: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createOrderRef(dataConnect, createOrderVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.order_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.order_insert);
});
```

## UpdateOrderStatus
You can execute the `UpdateOrderStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
updateOrderStatus(vars: UpdateOrderStatusVariables): MutationPromise<UpdateOrderStatusData, UpdateOrderStatusVariables>;

interface UpdateOrderStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateOrderStatusVariables): MutationRef<UpdateOrderStatusData, UpdateOrderStatusVariables>;
}
export const updateOrderStatusRef: UpdateOrderStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateOrderStatus(dc: DataConnect, vars: UpdateOrderStatusVariables): MutationPromise<UpdateOrderStatusData, UpdateOrderStatusVariables>;

interface UpdateOrderStatusRef {
  ...
  (dc: DataConnect, vars: UpdateOrderStatusVariables): MutationRef<UpdateOrderStatusData, UpdateOrderStatusVariables>;
}
export const updateOrderStatusRef: UpdateOrderStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateOrderStatusRef:
```typescript
const name = updateOrderStatusRef.operationName;
console.log(name);
```

### Variables
The `UpdateOrderStatus` mutation requires an argument of type `UpdateOrderStatusVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateOrderStatusVariables {
  id: UUIDString;
  status: string;
}
```
### Return Type
Recall that executing the `UpdateOrderStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateOrderStatusData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateOrderStatusData {
  order_update?: Order_Key | null;
}
```
### Using `UpdateOrderStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateOrderStatus, UpdateOrderStatusVariables } from '@iconic-links/dataconnect';

// The `UpdateOrderStatus` mutation requires an argument of type `UpdateOrderStatusVariables`:
const updateOrderStatusVars: UpdateOrderStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateOrderStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateOrderStatus(updateOrderStatusVars);
// Variables can be defined inline as well.
const { data } = await updateOrderStatus({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateOrderStatus(dataConnect, updateOrderStatusVars);

console.log(data.order_update);

// Or, you can use the `Promise` API.
updateOrderStatus(updateOrderStatusVars).then((response) => {
  const data = response.data;
  console.log(data.order_update);
});
```

### Using `UpdateOrderStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateOrderStatusRef, UpdateOrderStatusVariables } from '@iconic-links/dataconnect';

// The `UpdateOrderStatus` mutation requires an argument of type `UpdateOrderStatusVariables`:
const updateOrderStatusVars: UpdateOrderStatusVariables = {
  id: ..., 
  status: ..., 
};

// Call the `updateOrderStatusRef()` function to get a reference to the mutation.
const ref = updateOrderStatusRef(updateOrderStatusVars);
// Variables can be defined inline as well.
const ref = updateOrderStatusRef({ id: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateOrderStatusRef(dataConnect, updateOrderStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.order_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.order_update);
});
```

## CreateCategory
You can execute the `CreateCategory` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createCategory(vars: CreateCategoryVariables): MutationPromise<CreateCategoryData, CreateCategoryVariables>;

interface CreateCategoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateCategoryVariables): MutationRef<CreateCategoryData, CreateCategoryVariables>;
}
export const createCategoryRef: CreateCategoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createCategory(dc: DataConnect, vars: CreateCategoryVariables): MutationPromise<CreateCategoryData, CreateCategoryVariables>;

interface CreateCategoryRef {
  ...
  (dc: DataConnect, vars: CreateCategoryVariables): MutationRef<CreateCategoryData, CreateCategoryVariables>;
}
export const createCategoryRef: CreateCategoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createCategoryRef:
```typescript
const name = createCategoryRef.operationName;
console.log(name);
```

### Variables
The `CreateCategory` mutation requires an argument of type `CreateCategoryVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateCategoryVariables {
  name: string;
}
```
### Return Type
Recall that executing the `CreateCategory` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateCategoryData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateCategoryData {
  category_insert: Category_Key;
}
```
### Using `CreateCategory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createCategory, CreateCategoryVariables } from '@iconic-links/dataconnect';

// The `CreateCategory` mutation requires an argument of type `CreateCategoryVariables`:
const createCategoryVars: CreateCategoryVariables = {
  name: ..., 
};

// Call the `createCategory()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createCategory(createCategoryVars);
// Variables can be defined inline as well.
const { data } = await createCategory({ name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createCategory(dataConnect, createCategoryVars);

console.log(data.category_insert);

// Or, you can use the `Promise` API.
createCategory(createCategoryVars).then((response) => {
  const data = response.data;
  console.log(data.category_insert);
});
```

### Using `CreateCategory`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createCategoryRef, CreateCategoryVariables } from '@iconic-links/dataconnect';

// The `CreateCategory` mutation requires an argument of type `CreateCategoryVariables`:
const createCategoryVars: CreateCategoryVariables = {
  name: ..., 
};

// Call the `createCategoryRef()` function to get a reference to the mutation.
const ref = createCategoryRef(createCategoryVars);
// Variables can be defined inline as well.
const ref = createCategoryRef({ name: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createCategoryRef(dataConnect, createCategoryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.category_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.category_insert);
});
```

## CreateService
You can execute the `CreateService` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createService(vars: CreateServiceVariables): MutationPromise<CreateServiceData, CreateServiceVariables>;

interface CreateServiceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateServiceVariables): MutationRef<CreateServiceData, CreateServiceVariables>;
}
export const createServiceRef: CreateServiceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createService(dc: DataConnect, vars: CreateServiceVariables): MutationPromise<CreateServiceData, CreateServiceVariables>;

interface CreateServiceRef {
  ...
  (dc: DataConnect, vars: CreateServiceVariables): MutationRef<CreateServiceData, CreateServiceVariables>;
}
export const createServiceRef: CreateServiceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createServiceRef:
```typescript
const name = createServiceRef.operationName;
console.log(name);
```

### Variables
The `CreateService` mutation requires an argument of type `CreateServiceVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateServiceVariables {
  categoryId: UUIDString;
  name: string;
  pricingType: string;
  basePrice?: number | null;
}
```
### Return Type
Recall that executing the `CreateService` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateServiceData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateServiceData {
  service_insert: Service_Key;
}
```
### Using `CreateService`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createService, CreateServiceVariables } from '@iconic-links/dataconnect';

// The `CreateService` mutation requires an argument of type `CreateServiceVariables`:
const createServiceVars: CreateServiceVariables = {
  categoryId: ..., 
  name: ..., 
  pricingType: ..., 
  basePrice: ..., // optional
};

// Call the `createService()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createService(createServiceVars);
// Variables can be defined inline as well.
const { data } = await createService({ categoryId: ..., name: ..., pricingType: ..., basePrice: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createService(dataConnect, createServiceVars);

console.log(data.service_insert);

// Or, you can use the `Promise` API.
createService(createServiceVars).then((response) => {
  const data = response.data;
  console.log(data.service_insert);
});
```

### Using `CreateService`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createServiceRef, CreateServiceVariables } from '@iconic-links/dataconnect';

// The `CreateService` mutation requires an argument of type `CreateServiceVariables`:
const createServiceVars: CreateServiceVariables = {
  categoryId: ..., 
  name: ..., 
  pricingType: ..., 
  basePrice: ..., // optional
};

// Call the `createServiceRef()` function to get a reference to the mutation.
const ref = createServiceRef(createServiceVars);
// Variables can be defined inline as well.
const ref = createServiceRef({ categoryId: ..., name: ..., pricingType: ..., basePrice: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createServiceRef(dataConnect, createServiceVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.service_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.service_insert);
});
```

## UpdateInventoryQuantity
You can execute the `UpdateInventoryQuantity` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
updateInventoryQuantity(vars: UpdateInventoryQuantityVariables): MutationPromise<UpdateInventoryQuantityData, UpdateInventoryQuantityVariables>;

interface UpdateInventoryQuantityRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateInventoryQuantityVariables): MutationRef<UpdateInventoryQuantityData, UpdateInventoryQuantityVariables>;
}
export const updateInventoryQuantityRef: UpdateInventoryQuantityRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateInventoryQuantity(dc: DataConnect, vars: UpdateInventoryQuantityVariables): MutationPromise<UpdateInventoryQuantityData, UpdateInventoryQuantityVariables>;

interface UpdateInventoryQuantityRef {
  ...
  (dc: DataConnect, vars: UpdateInventoryQuantityVariables): MutationRef<UpdateInventoryQuantityData, UpdateInventoryQuantityVariables>;
}
export const updateInventoryQuantityRef: UpdateInventoryQuantityRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateInventoryQuantityRef:
```typescript
const name = updateInventoryQuantityRef.operationName;
console.log(name);
```

### Variables
The `UpdateInventoryQuantity` mutation requires an argument of type `UpdateInventoryQuantityVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateInventoryQuantityVariables {
  id: UUIDString;
  quantity: number;
}
```
### Return Type
Recall that executing the `UpdateInventoryQuantity` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateInventoryQuantityData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateInventoryQuantityData {
  inventoryItem_update?: InventoryItem_Key | null;
}
```
### Using `UpdateInventoryQuantity`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateInventoryQuantity, UpdateInventoryQuantityVariables } from '@iconic-links/dataconnect';

// The `UpdateInventoryQuantity` mutation requires an argument of type `UpdateInventoryQuantityVariables`:
const updateInventoryQuantityVars: UpdateInventoryQuantityVariables = {
  id: ..., 
  quantity: ..., 
};

// Call the `updateInventoryQuantity()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateInventoryQuantity(updateInventoryQuantityVars);
// Variables can be defined inline as well.
const { data } = await updateInventoryQuantity({ id: ..., quantity: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateInventoryQuantity(dataConnect, updateInventoryQuantityVars);

console.log(data.inventoryItem_update);

// Or, you can use the `Promise` API.
updateInventoryQuantity(updateInventoryQuantityVars).then((response) => {
  const data = response.data;
  console.log(data.inventoryItem_update);
});
```

### Using `UpdateInventoryQuantity`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateInventoryQuantityRef, UpdateInventoryQuantityVariables } from '@iconic-links/dataconnect';

// The `UpdateInventoryQuantity` mutation requires an argument of type `UpdateInventoryQuantityVariables`:
const updateInventoryQuantityVars: UpdateInventoryQuantityVariables = {
  id: ..., 
  quantity: ..., 
};

// Call the `updateInventoryQuantityRef()` function to get a reference to the mutation.
const ref = updateInventoryQuantityRef(updateInventoryQuantityVars);
// Variables can be defined inline as well.
const ref = updateInventoryQuantityRef({ id: ..., quantity: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateInventoryQuantityRef(dataConnect, updateInventoryQuantityVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.inventoryItem_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.inventoryItem_update);
});
```

## CreateInventoryItem
You can execute the `CreateInventoryItem` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createInventoryItem(vars: CreateInventoryItemVariables): MutationPromise<CreateInventoryItemData, CreateInventoryItemVariables>;

interface CreateInventoryItemRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateInventoryItemVariables): MutationRef<CreateInventoryItemData, CreateInventoryItemVariables>;
}
export const createInventoryItemRef: CreateInventoryItemRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createInventoryItem(dc: DataConnect, vars: CreateInventoryItemVariables): MutationPromise<CreateInventoryItemData, CreateInventoryItemVariables>;

interface CreateInventoryItemRef {
  ...
  (dc: DataConnect, vars: CreateInventoryItemVariables): MutationRef<CreateInventoryItemData, CreateInventoryItemVariables>;
}
export const createInventoryItemRef: CreateInventoryItemRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createInventoryItemRef:
```typescript
const name = createInventoryItemRef.operationName;
console.log(name);
```

### Variables
The `CreateInventoryItem` mutation requires an argument of type `CreateInventoryItemVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateInventoryItemVariables {
  name: string;
  unitType: string;
  quantity: number;
}
```
### Return Type
Recall that executing the `CreateInventoryItem` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateInventoryItemData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateInventoryItemData {
  inventoryItem_insert: InventoryItem_Key;
}
```
### Using `CreateInventoryItem`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createInventoryItem, CreateInventoryItemVariables } from '@iconic-links/dataconnect';

// The `CreateInventoryItem` mutation requires an argument of type `CreateInventoryItemVariables`:
const createInventoryItemVars: CreateInventoryItemVariables = {
  name: ..., 
  unitType: ..., 
  quantity: ..., 
};

// Call the `createInventoryItem()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createInventoryItem(createInventoryItemVars);
// Variables can be defined inline as well.
const { data } = await createInventoryItem({ name: ..., unitType: ..., quantity: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createInventoryItem(dataConnect, createInventoryItemVars);

console.log(data.inventoryItem_insert);

// Or, you can use the `Promise` API.
createInventoryItem(createInventoryItemVars).then((response) => {
  const data = response.data;
  console.log(data.inventoryItem_insert);
});
```

### Using `CreateInventoryItem`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createInventoryItemRef, CreateInventoryItemVariables } from '@iconic-links/dataconnect';

// The `CreateInventoryItem` mutation requires an argument of type `CreateInventoryItemVariables`:
const createInventoryItemVars: CreateInventoryItemVariables = {
  name: ..., 
  unitType: ..., 
  quantity: ..., 
};

// Call the `createInventoryItemRef()` function to get a reference to the mutation.
const ref = createInventoryItemRef(createInventoryItemVars);
// Variables can be defined inline as well.
const ref = createInventoryItemRef({ name: ..., unitType: ..., quantity: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createInventoryItemRef(dataConnect, createInventoryItemVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.inventoryItem_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.inventoryItem_insert);
});
```

## LogMaterialConsumption
You can execute the `LogMaterialConsumption` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
logMaterialConsumption(vars: LogMaterialConsumptionVariables): MutationPromise<LogMaterialConsumptionData, LogMaterialConsumptionVariables>;

interface LogMaterialConsumptionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: LogMaterialConsumptionVariables): MutationRef<LogMaterialConsumptionData, LogMaterialConsumptionVariables>;
}
export const logMaterialConsumptionRef: LogMaterialConsumptionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
logMaterialConsumption(dc: DataConnect, vars: LogMaterialConsumptionVariables): MutationPromise<LogMaterialConsumptionData, LogMaterialConsumptionVariables>;

interface LogMaterialConsumptionRef {
  ...
  (dc: DataConnect, vars: LogMaterialConsumptionVariables): MutationRef<LogMaterialConsumptionData, LogMaterialConsumptionVariables>;
}
export const logMaterialConsumptionRef: LogMaterialConsumptionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the logMaterialConsumptionRef:
```typescript
const name = logMaterialConsumptionRef.operationName;
console.log(name);
```

### Variables
The `LogMaterialConsumption` mutation requires an argument of type `LogMaterialConsumptionVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface LogMaterialConsumptionVariables {
  inventoryItemId: UUIDString;
  orderId: UUIDString;
  quantityUsed: number;
  wastage: number;
}
```
### Return Type
Recall that executing the `LogMaterialConsumption` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `LogMaterialConsumptionData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface LogMaterialConsumptionData {
  materialConsumption_insert: MaterialConsumption_Key;
}
```
### Using `LogMaterialConsumption`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, logMaterialConsumption, LogMaterialConsumptionVariables } from '@iconic-links/dataconnect';

// The `LogMaterialConsumption` mutation requires an argument of type `LogMaterialConsumptionVariables`:
const logMaterialConsumptionVars: LogMaterialConsumptionVariables = {
  inventoryItemId: ..., 
  orderId: ..., 
  quantityUsed: ..., 
  wastage: ..., 
};

// Call the `logMaterialConsumption()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await logMaterialConsumption(logMaterialConsumptionVars);
// Variables can be defined inline as well.
const { data } = await logMaterialConsumption({ inventoryItemId: ..., orderId: ..., quantityUsed: ..., wastage: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await logMaterialConsumption(dataConnect, logMaterialConsumptionVars);

console.log(data.materialConsumption_insert);

// Or, you can use the `Promise` API.
logMaterialConsumption(logMaterialConsumptionVars).then((response) => {
  const data = response.data;
  console.log(data.materialConsumption_insert);
});
```

### Using `LogMaterialConsumption`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, logMaterialConsumptionRef, LogMaterialConsumptionVariables } from '@iconic-links/dataconnect';

// The `LogMaterialConsumption` mutation requires an argument of type `LogMaterialConsumptionVariables`:
const logMaterialConsumptionVars: LogMaterialConsumptionVariables = {
  inventoryItemId: ..., 
  orderId: ..., 
  quantityUsed: ..., 
  wastage: ..., 
};

// Call the `logMaterialConsumptionRef()` function to get a reference to the mutation.
const ref = logMaterialConsumptionRef(logMaterialConsumptionVars);
// Variables can be defined inline as well.
const ref = logMaterialConsumptionRef({ inventoryItemId: ..., orderId: ..., quantityUsed: ..., wastage: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = logMaterialConsumptionRef(dataConnect, logMaterialConsumptionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.materialConsumption_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.materialConsumption_insert);
});
```

## CreateOrderItem
You can execute the `CreateOrderItem` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createOrderItem(vars: CreateOrderItemVariables): MutationPromise<CreateOrderItemData, CreateOrderItemVariables>;

interface CreateOrderItemRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateOrderItemVariables): MutationRef<CreateOrderItemData, CreateOrderItemVariables>;
}
export const createOrderItemRef: CreateOrderItemRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createOrderItem(dc: DataConnect, vars: CreateOrderItemVariables): MutationPromise<CreateOrderItemData, CreateOrderItemVariables>;

interface CreateOrderItemRef {
  ...
  (dc: DataConnect, vars: CreateOrderItemVariables): MutationRef<CreateOrderItemData, CreateOrderItemVariables>;
}
export const createOrderItemRef: CreateOrderItemRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createOrderItemRef:
```typescript
const name = createOrderItemRef.operationName;
console.log(name);
```

### Variables
The `CreateOrderItem` mutation requires an argument of type `CreateOrderItemVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateOrderItemVariables {
  orderId: UUIDString;
  serviceId: UUIDString;
  quantity: number;
  price: number;
  specs?: unknown | null;
}
```
### Return Type
Recall that executing the `CreateOrderItem` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateOrderItemData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateOrderItemData {
  orderItem_insert: OrderItem_Key;
}
```
### Using `CreateOrderItem`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createOrderItem, CreateOrderItemVariables } from '@iconic-links/dataconnect';

// The `CreateOrderItem` mutation requires an argument of type `CreateOrderItemVariables`:
const createOrderItemVars: CreateOrderItemVariables = {
  orderId: ..., 
  serviceId: ..., 
  quantity: ..., 
  price: ..., 
  specs: ..., // optional
};

// Call the `createOrderItem()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createOrderItem(createOrderItemVars);
// Variables can be defined inline as well.
const { data } = await createOrderItem({ orderId: ..., serviceId: ..., quantity: ..., price: ..., specs: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createOrderItem(dataConnect, createOrderItemVars);

console.log(data.orderItem_insert);

// Or, you can use the `Promise` API.
createOrderItem(createOrderItemVars).then((response) => {
  const data = response.data;
  console.log(data.orderItem_insert);
});
```

### Using `CreateOrderItem`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createOrderItemRef, CreateOrderItemVariables } from '@iconic-links/dataconnect';

// The `CreateOrderItem` mutation requires an argument of type `CreateOrderItemVariables`:
const createOrderItemVars: CreateOrderItemVariables = {
  orderId: ..., 
  serviceId: ..., 
  quantity: ..., 
  price: ..., 
  specs: ..., // optional
};

// Call the `createOrderItemRef()` function to get a reference to the mutation.
const ref = createOrderItemRef(createOrderItemVars);
// Variables can be defined inline as well.
const ref = createOrderItemRef({ orderId: ..., serviceId: ..., quantity: ..., price: ..., specs: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createOrderItemRef(dataConnect, createOrderItemVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.orderItem_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.orderItem_insert);
});
```

## CreateDelivery
You can execute the `CreateDelivery` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createDelivery(vars: CreateDeliveryVariables): MutationPromise<CreateDeliveryData, CreateDeliveryVariables>;

interface CreateDeliveryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateDeliveryVariables): MutationRef<CreateDeliveryData, CreateDeliveryVariables>;
}
export const createDeliveryRef: CreateDeliveryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createDelivery(dc: DataConnect, vars: CreateDeliveryVariables): MutationPromise<CreateDeliveryData, CreateDeliveryVariables>;

interface CreateDeliveryRef {
  ...
  (dc: DataConnect, vars: CreateDeliveryVariables): MutationRef<CreateDeliveryData, CreateDeliveryVariables>;
}
export const createDeliveryRef: CreateDeliveryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createDeliveryRef:
```typescript
const name = createDeliveryRef.operationName;
console.log(name);
```

### Variables
The `CreateDelivery` mutation requires an argument of type `CreateDeliveryVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateDeliveryVariables {
  orderId: UUIDString;
  address: string;
  status: string;
}
```
### Return Type
Recall that executing the `CreateDelivery` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateDeliveryData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateDeliveryData {
  delivery_insert: Delivery_Key;
}
```
### Using `CreateDelivery`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createDelivery, CreateDeliveryVariables } from '@iconic-links/dataconnect';

// The `CreateDelivery` mutation requires an argument of type `CreateDeliveryVariables`:
const createDeliveryVars: CreateDeliveryVariables = {
  orderId: ..., 
  address: ..., 
  status: ..., 
};

// Call the `createDelivery()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createDelivery(createDeliveryVars);
// Variables can be defined inline as well.
const { data } = await createDelivery({ orderId: ..., address: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createDelivery(dataConnect, createDeliveryVars);

console.log(data.delivery_insert);

// Or, you can use the `Promise` API.
createDelivery(createDeliveryVars).then((response) => {
  const data = response.data;
  console.log(data.delivery_insert);
});
```

### Using `CreateDelivery`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createDeliveryRef, CreateDeliveryVariables } from '@iconic-links/dataconnect';

// The `CreateDelivery` mutation requires an argument of type `CreateDeliveryVariables`:
const createDeliveryVars: CreateDeliveryVariables = {
  orderId: ..., 
  address: ..., 
  status: ..., 
};

// Call the `createDeliveryRef()` function to get a reference to the mutation.
const ref = createDeliveryRef(createDeliveryVars);
// Variables can be defined inline as well.
const ref = createDeliveryRef({ orderId: ..., address: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createDeliveryRef(dataConnect, createDeliveryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.delivery_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.delivery_insert);
});
```

## UpdateDelivery
You can execute the `UpdateDelivery` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
updateDelivery(vars: UpdateDeliveryVariables): MutationPromise<UpdateDeliveryData, UpdateDeliveryVariables>;

interface UpdateDeliveryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateDeliveryVariables): MutationRef<UpdateDeliveryData, UpdateDeliveryVariables>;
}
export const updateDeliveryRef: UpdateDeliveryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateDelivery(dc: DataConnect, vars: UpdateDeliveryVariables): MutationPromise<UpdateDeliveryData, UpdateDeliveryVariables>;

interface UpdateDeliveryRef {
  ...
  (dc: DataConnect, vars: UpdateDeliveryVariables): MutationRef<UpdateDeliveryData, UpdateDeliveryVariables>;
}
export const updateDeliveryRef: UpdateDeliveryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateDeliveryRef:
```typescript
const name = updateDeliveryRef.operationName;
console.log(name);
```

### Variables
The `UpdateDelivery` mutation requires an argument of type `UpdateDeliveryVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateDeliveryVariables {
  id: UUIDString;
  driverId?: UUIDString | null;
  status?: string | null;
}
```
### Return Type
Recall that executing the `UpdateDelivery` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateDeliveryData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateDeliveryData {
  delivery_update?: Delivery_Key | null;
}
```
### Using `UpdateDelivery`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateDelivery, UpdateDeliveryVariables } from '@iconic-links/dataconnect';

// The `UpdateDelivery` mutation requires an argument of type `UpdateDeliveryVariables`:
const updateDeliveryVars: UpdateDeliveryVariables = {
  id: ..., 
  driverId: ..., // optional
  status: ..., // optional
};

// Call the `updateDelivery()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateDelivery(updateDeliveryVars);
// Variables can be defined inline as well.
const { data } = await updateDelivery({ id: ..., driverId: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateDelivery(dataConnect, updateDeliveryVars);

console.log(data.delivery_update);

// Or, you can use the `Promise` API.
updateDelivery(updateDeliveryVars).then((response) => {
  const data = response.data;
  console.log(data.delivery_update);
});
```

### Using `UpdateDelivery`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateDeliveryRef, UpdateDeliveryVariables } from '@iconic-links/dataconnect';

// The `UpdateDelivery` mutation requires an argument of type `UpdateDeliveryVariables`:
const updateDeliveryVars: UpdateDeliveryVariables = {
  id: ..., 
  driverId: ..., // optional
  status: ..., // optional
};

// Call the `updateDeliveryRef()` function to get a reference to the mutation.
const ref = updateDeliveryRef(updateDeliveryVars);
// Variables can be defined inline as well.
const ref = updateDeliveryRef({ id: ..., driverId: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateDeliveryRef(dataConnect, updateDeliveryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.delivery_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.delivery_update);
});
```

## CreateOrganization
You can execute the `CreateOrganization` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createOrganization(vars: CreateOrganizationVariables): MutationPromise<CreateOrganizationData, CreateOrganizationVariables>;

interface CreateOrganizationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateOrganizationVariables): MutationRef<CreateOrganizationData, CreateOrganizationVariables>;
}
export const createOrganizationRef: CreateOrganizationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createOrganization(dc: DataConnect, vars: CreateOrganizationVariables): MutationPromise<CreateOrganizationData, CreateOrganizationVariables>;

interface CreateOrganizationRef {
  ...
  (dc: DataConnect, vars: CreateOrganizationVariables): MutationRef<CreateOrganizationData, CreateOrganizationVariables>;
}
export const createOrganizationRef: CreateOrganizationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createOrganizationRef:
```typescript
const name = createOrganizationRef.operationName;
console.log(name);
```

### Variables
The `CreateOrganization` mutation requires an argument of type `CreateOrganizationVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateOrganizationVariables {
  name: string;
}
```
### Return Type
Recall that executing the `CreateOrganization` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateOrganizationData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateOrganizationData {
  organization_insert: Organization_Key;
}
```
### Using `CreateOrganization`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createOrganization, CreateOrganizationVariables } from '@iconic-links/dataconnect';

// The `CreateOrganization` mutation requires an argument of type `CreateOrganizationVariables`:
const createOrganizationVars: CreateOrganizationVariables = {
  name: ..., 
};

// Call the `createOrganization()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createOrganization(createOrganizationVars);
// Variables can be defined inline as well.
const { data } = await createOrganization({ name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createOrganization(dataConnect, createOrganizationVars);

console.log(data.organization_insert);

// Or, you can use the `Promise` API.
createOrganization(createOrganizationVars).then((response) => {
  const data = response.data;
  console.log(data.organization_insert);
});
```

### Using `CreateOrganization`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createOrganizationRef, CreateOrganizationVariables } from '@iconic-links/dataconnect';

// The `CreateOrganization` mutation requires an argument of type `CreateOrganizationVariables`:
const createOrganizationVars: CreateOrganizationVariables = {
  name: ..., 
};

// Call the `createOrganizationRef()` function to get a reference to the mutation.
const ref = createOrganizationRef(createOrganizationVars);
// Variables can be defined inline as well.
const ref = createOrganizationRef({ name: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createOrganizationRef(dataConnect, createOrganizationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.organization_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.organization_insert);
});
```

## UpdateUserOrganization
You can execute the `UpdateUserOrganization` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
updateUserOrganization(vars: UpdateUserOrganizationVariables): MutationPromise<UpdateUserOrganizationData, UpdateUserOrganizationVariables>;

interface UpdateUserOrganizationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateUserOrganizationVariables): MutationRef<UpdateUserOrganizationData, UpdateUserOrganizationVariables>;
}
export const updateUserOrganizationRef: UpdateUserOrganizationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateUserOrganization(dc: DataConnect, vars: UpdateUserOrganizationVariables): MutationPromise<UpdateUserOrganizationData, UpdateUserOrganizationVariables>;

interface UpdateUserOrganizationRef {
  ...
  (dc: DataConnect, vars: UpdateUserOrganizationVariables): MutationRef<UpdateUserOrganizationData, UpdateUserOrganizationVariables>;
}
export const updateUserOrganizationRef: UpdateUserOrganizationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateUserOrganizationRef:
```typescript
const name = updateUserOrganizationRef.operationName;
console.log(name);
```

### Variables
The `UpdateUserOrganization` mutation requires an argument of type `UpdateUserOrganizationVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateUserOrganizationVariables {
  id: UUIDString;
  organizationId: UUIDString;
}
```
### Return Type
Recall that executing the `UpdateUserOrganization` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateUserOrganizationData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateUserOrganizationData {
  user_update?: User_Key | null;
}
```
### Using `UpdateUserOrganization`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateUserOrganization, UpdateUserOrganizationVariables } from '@iconic-links/dataconnect';

// The `UpdateUserOrganization` mutation requires an argument of type `UpdateUserOrganizationVariables`:
const updateUserOrganizationVars: UpdateUserOrganizationVariables = {
  id: ..., 
  organizationId: ..., 
};

// Call the `updateUserOrganization()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateUserOrganization(updateUserOrganizationVars);
// Variables can be defined inline as well.
const { data } = await updateUserOrganization({ id: ..., organizationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateUserOrganization(dataConnect, updateUserOrganizationVars);

console.log(data.user_update);

// Or, you can use the `Promise` API.
updateUserOrganization(updateUserOrganizationVars).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `UpdateUserOrganization`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateUserOrganizationRef, UpdateUserOrganizationVariables } from '@iconic-links/dataconnect';

// The `UpdateUserOrganization` mutation requires an argument of type `UpdateUserOrganizationVariables`:
const updateUserOrganizationVars: UpdateUserOrganizationVariables = {
  id: ..., 
  organizationId: ..., 
};

// Call the `updateUserOrganizationRef()` function to get a reference to the mutation.
const ref = updateUserOrganizationRef(updateUserOrganizationVars);
// Variables can be defined inline as well.
const ref = updateUserOrganizationRef({ id: ..., organizationId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateUserOrganizationRef(dataConnect, updateUserOrganizationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

## CreateProof
You can execute the `CreateProof` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createProof(vars: CreateProofVariables): MutationPromise<CreateProofData, CreateProofVariables>;

interface CreateProofRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateProofVariables): MutationRef<CreateProofData, CreateProofVariables>;
}
export const createProofRef: CreateProofRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createProof(dc: DataConnect, vars: CreateProofVariables): MutationPromise<CreateProofData, CreateProofVariables>;

interface CreateProofRef {
  ...
  (dc: DataConnect, vars: CreateProofVariables): MutationRef<CreateProofData, CreateProofVariables>;
}
export const createProofRef: CreateProofRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createProofRef:
```typescript
const name = createProofRef.operationName;
console.log(name);
```

### Variables
The `CreateProof` mutation requires an argument of type `CreateProofVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateProofVariables {
  orderId: UUIDString;
  fileUrl: string;
  version: number;
  status: string;
}
```
### Return Type
Recall that executing the `CreateProof` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateProofData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateProofData {
  proof_insert: Proof_Key;
}
```
### Using `CreateProof`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createProof, CreateProofVariables } from '@iconic-links/dataconnect';

// The `CreateProof` mutation requires an argument of type `CreateProofVariables`:
const createProofVars: CreateProofVariables = {
  orderId: ..., 
  fileUrl: ..., 
  version: ..., 
  status: ..., 
};

// Call the `createProof()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createProof(createProofVars);
// Variables can be defined inline as well.
const { data } = await createProof({ orderId: ..., fileUrl: ..., version: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createProof(dataConnect, createProofVars);

console.log(data.proof_insert);

// Or, you can use the `Promise` API.
createProof(createProofVars).then((response) => {
  const data = response.data;
  console.log(data.proof_insert);
});
```

### Using `CreateProof`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createProofRef, CreateProofVariables } from '@iconic-links/dataconnect';

// The `CreateProof` mutation requires an argument of type `CreateProofVariables`:
const createProofVars: CreateProofVariables = {
  orderId: ..., 
  fileUrl: ..., 
  version: ..., 
  status: ..., 
};

// Call the `createProofRef()` function to get a reference to the mutation.
const ref = createProofRef(createProofVars);
// Variables can be defined inline as well.
const ref = createProofRef({ orderId: ..., fileUrl: ..., version: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createProofRef(dataConnect, createProofVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.proof_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.proof_insert);
});
```

## UpdateProof
You can execute the `UpdateProof` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
updateProof(vars: UpdateProofVariables): MutationPromise<UpdateProofData, UpdateProofVariables>;

interface UpdateProofRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProofVariables): MutationRef<UpdateProofData, UpdateProofVariables>;
}
export const updateProofRef: UpdateProofRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateProof(dc: DataConnect, vars: UpdateProofVariables): MutationPromise<UpdateProofData, UpdateProofVariables>;

interface UpdateProofRef {
  ...
  (dc: DataConnect, vars: UpdateProofVariables): MutationRef<UpdateProofData, UpdateProofVariables>;
}
export const updateProofRef: UpdateProofRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateProofRef:
```typescript
const name = updateProofRef.operationName;
console.log(name);
```

### Variables
The `UpdateProof` mutation requires an argument of type `UpdateProofVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateProofVariables {
  id: UUIDString;
  status: string;
  approvedBy?: string | null;
  comments?: string | null;
}
```
### Return Type
Recall that executing the `UpdateProof` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateProofData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateProofData {
  proof_update?: Proof_Key | null;
}
```
### Using `UpdateProof`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateProof, UpdateProofVariables } from '@iconic-links/dataconnect';

// The `UpdateProof` mutation requires an argument of type `UpdateProofVariables`:
const updateProofVars: UpdateProofVariables = {
  id: ..., 
  status: ..., 
  approvedBy: ..., // optional
  comments: ..., // optional
};

// Call the `updateProof()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateProof(updateProofVars);
// Variables can be defined inline as well.
const { data } = await updateProof({ id: ..., status: ..., approvedBy: ..., comments: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateProof(dataConnect, updateProofVars);

console.log(data.proof_update);

// Or, you can use the `Promise` API.
updateProof(updateProofVars).then((response) => {
  const data = response.data;
  console.log(data.proof_update);
});
```

### Using `UpdateProof`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateProofRef, UpdateProofVariables } from '@iconic-links/dataconnect';

// The `UpdateProof` mutation requires an argument of type `UpdateProofVariables`:
const updateProofVars: UpdateProofVariables = {
  id: ..., 
  status: ..., 
  approvedBy: ..., // optional
  comments: ..., // optional
};

// Call the `updateProofRef()` function to get a reference to the mutation.
const ref = updateProofRef(updateProofVars);
// Variables can be defined inline as well.
const ref = updateProofRef({ id: ..., status: ..., approvedBy: ..., comments: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateProofRef(dataConnect, updateProofVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.proof_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.proof_update);
});
```

## CreateStaffProfile
You can execute the `CreateStaffProfile` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createStaffProfile(vars: CreateStaffProfileVariables): MutationPromise<CreateStaffProfileData, CreateStaffProfileVariables>;

interface CreateStaffProfileRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateStaffProfileVariables): MutationRef<CreateStaffProfileData, CreateStaffProfileVariables>;
}
export const createStaffProfileRef: CreateStaffProfileRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createStaffProfile(dc: DataConnect, vars: CreateStaffProfileVariables): MutationPromise<CreateStaffProfileData, CreateStaffProfileVariables>;

interface CreateStaffProfileRef {
  ...
  (dc: DataConnect, vars: CreateStaffProfileVariables): MutationRef<CreateStaffProfileData, CreateStaffProfileVariables>;
}
export const createStaffProfileRef: CreateStaffProfileRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createStaffProfileRef:
```typescript
const name = createStaffProfileRef.operationName;
console.log(name);
```

### Variables
The `CreateStaffProfile` mutation requires an argument of type `CreateStaffProfileVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateStaffProfileVariables {
  userId: UUIDString;
}
```
### Return Type
Recall that executing the `CreateStaffProfile` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateStaffProfileData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateStaffProfileData {
  staffProfile_insert: StaffProfile_Key;
}
```
### Using `CreateStaffProfile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createStaffProfile, CreateStaffProfileVariables } from '@iconic-links/dataconnect';

// The `CreateStaffProfile` mutation requires an argument of type `CreateStaffProfileVariables`:
const createStaffProfileVars: CreateStaffProfileVariables = {
  userId: ..., 
};

// Call the `createStaffProfile()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createStaffProfile(createStaffProfileVars);
// Variables can be defined inline as well.
const { data } = await createStaffProfile({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createStaffProfile(dataConnect, createStaffProfileVars);

console.log(data.staffProfile_insert);

// Or, you can use the `Promise` API.
createStaffProfile(createStaffProfileVars).then((response) => {
  const data = response.data;
  console.log(data.staffProfile_insert);
});
```

### Using `CreateStaffProfile`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createStaffProfileRef, CreateStaffProfileVariables } from '@iconic-links/dataconnect';

// The `CreateStaffProfile` mutation requires an argument of type `CreateStaffProfileVariables`:
const createStaffProfileVars: CreateStaffProfileVariables = {
  userId: ..., 
};

// Call the `createStaffProfileRef()` function to get a reference to the mutation.
const ref = createStaffProfileRef(createStaffProfileVars);
// Variables can be defined inline as well.
const ref = createStaffProfileRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createStaffProfileRef(dataConnect, createStaffProfileVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.staffProfile_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.staffProfile_insert);
});
```

## CreateCustomerProfile
You can execute the `CreateCustomerProfile` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createCustomerProfile(vars: CreateCustomerProfileVariables): MutationPromise<CreateCustomerProfileData, CreateCustomerProfileVariables>;

interface CreateCustomerProfileRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateCustomerProfileVariables): MutationRef<CreateCustomerProfileData, CreateCustomerProfileVariables>;
}
export const createCustomerProfileRef: CreateCustomerProfileRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createCustomerProfile(dc: DataConnect, vars: CreateCustomerProfileVariables): MutationPromise<CreateCustomerProfileData, CreateCustomerProfileVariables>;

interface CreateCustomerProfileRef {
  ...
  (dc: DataConnect, vars: CreateCustomerProfileVariables): MutationRef<CreateCustomerProfileData, CreateCustomerProfileVariables>;
}
export const createCustomerProfileRef: CreateCustomerProfileRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createCustomerProfileRef:
```typescript
const name = createCustomerProfileRef.operationName;
console.log(name);
```

### Variables
The `CreateCustomerProfile` mutation requires an argument of type `CreateCustomerProfileVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateCustomerProfileVariables {
  userId: UUIDString;
}
```
### Return Type
Recall that executing the `CreateCustomerProfile` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateCustomerProfileData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateCustomerProfileData {
  customerProfile_insert: CustomerProfile_Key;
}
```
### Using `CreateCustomerProfile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createCustomerProfile, CreateCustomerProfileVariables } from '@iconic-links/dataconnect';

// The `CreateCustomerProfile` mutation requires an argument of type `CreateCustomerProfileVariables`:
const createCustomerProfileVars: CreateCustomerProfileVariables = {
  userId: ..., 
};

// Call the `createCustomerProfile()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createCustomerProfile(createCustomerProfileVars);
// Variables can be defined inline as well.
const { data } = await createCustomerProfile({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createCustomerProfile(dataConnect, createCustomerProfileVars);

console.log(data.customerProfile_insert);

// Or, you can use the `Promise` API.
createCustomerProfile(createCustomerProfileVars).then((response) => {
  const data = response.data;
  console.log(data.customerProfile_insert);
});
```

### Using `CreateCustomerProfile`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createCustomerProfileRef, CreateCustomerProfileVariables } from '@iconic-links/dataconnect';

// The `CreateCustomerProfile` mutation requires an argument of type `CreateCustomerProfileVariables`:
const createCustomerProfileVars: CreateCustomerProfileVariables = {
  userId: ..., 
};

// Call the `createCustomerProfileRef()` function to get a reference to the mutation.
const ref = createCustomerProfileRef(createCustomerProfileVars);
// Variables can be defined inline as well.
const ref = createCustomerProfileRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createCustomerProfileRef(dataConnect, createCustomerProfileVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.customerProfile_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.customerProfile_insert);
});
```

## CreatePayment
You can execute the `CreatePayment` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createPayment(vars: CreatePaymentVariables): MutationPromise<CreatePaymentData, CreatePaymentVariables>;

interface CreatePaymentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreatePaymentVariables): MutationRef<CreatePaymentData, CreatePaymentVariables>;
}
export const createPaymentRef: CreatePaymentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createPayment(dc: DataConnect, vars: CreatePaymentVariables): MutationPromise<CreatePaymentData, CreatePaymentVariables>;

interface CreatePaymentRef {
  ...
  (dc: DataConnect, vars: CreatePaymentVariables): MutationRef<CreatePaymentData, CreatePaymentVariables>;
}
export const createPaymentRef: CreatePaymentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createPaymentRef:
```typescript
const name = createPaymentRef.operationName;
console.log(name);
```

### Variables
The `CreatePayment` mutation requires an argument of type `CreatePaymentVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreatePaymentVariables {
  orderId: UUIDString;
  amount: number;
  reference: string;
}
```
### Return Type
Recall that executing the `CreatePayment` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreatePaymentData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreatePaymentData {
  payment_insert: Payment_Key;
}
```
### Using `CreatePayment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createPayment, CreatePaymentVariables } from '@iconic-links/dataconnect';

// The `CreatePayment` mutation requires an argument of type `CreatePaymentVariables`:
const createPaymentVars: CreatePaymentVariables = {
  orderId: ..., 
  amount: ..., 
  reference: ..., 
};

// Call the `createPayment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createPayment(createPaymentVars);
// Variables can be defined inline as well.
const { data } = await createPayment({ orderId: ..., amount: ..., reference: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createPayment(dataConnect, createPaymentVars);

console.log(data.payment_insert);

// Or, you can use the `Promise` API.
createPayment(createPaymentVars).then((response) => {
  const data = response.data;
  console.log(data.payment_insert);
});
```

### Using `CreatePayment`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createPaymentRef, CreatePaymentVariables } from '@iconic-links/dataconnect';

// The `CreatePayment` mutation requires an argument of type `CreatePaymentVariables`:
const createPaymentVars: CreatePaymentVariables = {
  orderId: ..., 
  amount: ..., 
  reference: ..., 
};

// Call the `createPaymentRef()` function to get a reference to the mutation.
const ref = createPaymentRef(createPaymentVars);
// Variables can be defined inline as well.
const ref = createPaymentRef({ orderId: ..., amount: ..., reference: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createPaymentRef(dataConnect, createPaymentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.payment_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.payment_insert);
});
```

## UpdatePaymentStatus
You can execute the `UpdatePaymentStatus` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
updatePaymentStatus(vars: UpdatePaymentStatusVariables): MutationPromise<UpdatePaymentStatusData, UpdatePaymentStatusVariables>;

interface UpdatePaymentStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdatePaymentStatusVariables): MutationRef<UpdatePaymentStatusData, UpdatePaymentStatusVariables>;
}
export const updatePaymentStatusRef: UpdatePaymentStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updatePaymentStatus(dc: DataConnect, vars: UpdatePaymentStatusVariables): MutationPromise<UpdatePaymentStatusData, UpdatePaymentStatusVariables>;

interface UpdatePaymentStatusRef {
  ...
  (dc: DataConnect, vars: UpdatePaymentStatusVariables): MutationRef<UpdatePaymentStatusData, UpdatePaymentStatusVariables>;
}
export const updatePaymentStatusRef: UpdatePaymentStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updatePaymentStatusRef:
```typescript
const name = updatePaymentStatusRef.operationName;
console.log(name);
```

### Variables
The `UpdatePaymentStatus` mutation requires an argument of type `UpdatePaymentStatusVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdatePaymentStatusVariables {
  id: UUIDString;
  status: string;
  paystackRef?: string | null;
}
```
### Return Type
Recall that executing the `UpdatePaymentStatus` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdatePaymentStatusData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdatePaymentStatusData {
  payment_update?: Payment_Key | null;
}
```
### Using `UpdatePaymentStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updatePaymentStatus, UpdatePaymentStatusVariables } from '@iconic-links/dataconnect';

// The `UpdatePaymentStatus` mutation requires an argument of type `UpdatePaymentStatusVariables`:
const updatePaymentStatusVars: UpdatePaymentStatusVariables = {
  id: ..., 
  status: ..., 
  paystackRef: ..., // optional
};

// Call the `updatePaymentStatus()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updatePaymentStatus(updatePaymentStatusVars);
// Variables can be defined inline as well.
const { data } = await updatePaymentStatus({ id: ..., status: ..., paystackRef: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updatePaymentStatus(dataConnect, updatePaymentStatusVars);

console.log(data.payment_update);

// Or, you can use the `Promise` API.
updatePaymentStatus(updatePaymentStatusVars).then((response) => {
  const data = response.data;
  console.log(data.payment_update);
});
```

### Using `UpdatePaymentStatus`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updatePaymentStatusRef, UpdatePaymentStatusVariables } from '@iconic-links/dataconnect';

// The `UpdatePaymentStatus` mutation requires an argument of type `UpdatePaymentStatusVariables`:
const updatePaymentStatusVars: UpdatePaymentStatusVariables = {
  id: ..., 
  status: ..., 
  paystackRef: ..., // optional
};

// Call the `updatePaymentStatusRef()` function to get a reference to the mutation.
const ref = updatePaymentStatusRef(updatePaymentStatusVars);
// Variables can be defined inline as well.
const ref = updatePaymentStatusRef({ id: ..., status: ..., paystackRef: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updatePaymentStatusRef(dataConnect, updatePaymentStatusVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.payment_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.payment_update);
});
```

