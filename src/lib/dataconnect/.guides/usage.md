# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createUser, createOrder, updateOrderStatus, setOrderQuote, updateOrderItemPrice, createCategory, createService, updateInventoryQuantity, createInventoryItem, logMaterialConsumption } from '@iconic-links/dataconnect';


// Operation CreateUser:  For variables, look at type CreateUserVars in ../index.d.ts
const { data } = await CreateUser(dataConnect, createUserVars);

// Operation CreateOrder:  For variables, look at type CreateOrderVars in ../index.d.ts
const { data } = await CreateOrder(dataConnect, createOrderVars);

// Operation UpdateOrderStatus:  For variables, look at type UpdateOrderStatusVars in ../index.d.ts
const { data } = await UpdateOrderStatus(dataConnect, updateOrderStatusVars);

// Operation SetOrderQuote:  For variables, look at type SetOrderQuoteVars in ../index.d.ts
const { data } = await SetOrderQuote(dataConnect, setOrderQuoteVars);

// Operation UpdateOrderItemPrice:  For variables, look at type UpdateOrderItemPriceVars in ../index.d.ts
const { data } = await UpdateOrderItemPrice(dataConnect, updateOrderItemPriceVars);

// Operation CreateCategory:  For variables, look at type CreateCategoryVars in ../index.d.ts
const { data } = await CreateCategory(dataConnect, createCategoryVars);

// Operation CreateService:  For variables, look at type CreateServiceVars in ../index.d.ts
const { data } = await CreateService(dataConnect, createServiceVars);

// Operation UpdateInventoryQuantity:  For variables, look at type UpdateInventoryQuantityVars in ../index.d.ts
const { data } = await UpdateInventoryQuantity(dataConnect, updateInventoryQuantityVars);

// Operation CreateInventoryItem:  For variables, look at type CreateInventoryItemVars in ../index.d.ts
const { data } = await CreateInventoryItem(dataConnect, createInventoryItemVars);

// Operation LogMaterialConsumption:  For variables, look at type LogMaterialConsumptionVars in ../index.d.ts
const { data } = await LogMaterialConsumption(dataConnect, logMaterialConsumptionVars);


```