const { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'iconic-links-db',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

const createUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser', inputVars);
}
createUserRef.operationName = 'CreateUser';
exports.createUserRef = createUserRef;

exports.createUser = function createUser(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createUserRef(dcInstance, inputVars));
}
;

const createOrderRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateOrder', inputVars);
}
createOrderRef.operationName = 'CreateOrder';
exports.createOrderRef = createOrderRef;

exports.createOrder = function createOrder(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createOrderRef(dcInstance, inputVars));
}
;

const updateOrderStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateOrderStatus', inputVars);
}
updateOrderStatusRef.operationName = 'UpdateOrderStatus';
exports.updateOrderStatusRef = updateOrderStatusRef;

exports.updateOrderStatus = function updateOrderStatus(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateOrderStatusRef(dcInstance, inputVars));
}
;

const setOrderQuoteRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SetOrderQuote', inputVars);
}
setOrderQuoteRef.operationName = 'SetOrderQuote';
exports.setOrderQuoteRef = setOrderQuoteRef;

exports.setOrderQuote = function setOrderQuote(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(setOrderQuoteRef(dcInstance, inputVars));
}
;

const updateOrderItemPriceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateOrderItemPrice', inputVars);
}
updateOrderItemPriceRef.operationName = 'UpdateOrderItemPrice';
exports.updateOrderItemPriceRef = updateOrderItemPriceRef;

exports.updateOrderItemPrice = function updateOrderItemPrice(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateOrderItemPriceRef(dcInstance, inputVars));
}
;

const createCategoryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateCategory', inputVars);
}
createCategoryRef.operationName = 'CreateCategory';
exports.createCategoryRef = createCategoryRef;

exports.createCategory = function createCategory(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createCategoryRef(dcInstance, inputVars));
}
;

const createServiceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateService', inputVars);
}
createServiceRef.operationName = 'CreateService';
exports.createServiceRef = createServiceRef;

exports.createService = function createService(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createServiceRef(dcInstance, inputVars));
}
;

const updateInventoryQuantityRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateInventoryQuantity', inputVars);
}
updateInventoryQuantityRef.operationName = 'UpdateInventoryQuantity';
exports.updateInventoryQuantityRef = updateInventoryQuantityRef;

exports.updateInventoryQuantity = function updateInventoryQuantity(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateInventoryQuantityRef(dcInstance, inputVars));
}
;

const createInventoryItemRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateInventoryItem', inputVars);
}
createInventoryItemRef.operationName = 'CreateInventoryItem';
exports.createInventoryItemRef = createInventoryItemRef;

exports.createInventoryItem = function createInventoryItem(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createInventoryItemRef(dcInstance, inputVars));
}
;

const logMaterialConsumptionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'LogMaterialConsumption', inputVars);
}
logMaterialConsumptionRef.operationName = 'LogMaterialConsumption';
exports.logMaterialConsumptionRef = logMaterialConsumptionRef;

exports.logMaterialConsumption = function logMaterialConsumption(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(logMaterialConsumptionRef(dcInstance, inputVars));
}
;

const createOrderItemRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateOrderItem', inputVars);
}
createOrderItemRef.operationName = 'CreateOrderItem';
exports.createOrderItemRef = createOrderItemRef;

exports.createOrderItem = function createOrderItem(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createOrderItemRef(dcInstance, inputVars));
}
;

const createDeliveryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateDelivery', inputVars);
}
createDeliveryRef.operationName = 'CreateDelivery';
exports.createDeliveryRef = createDeliveryRef;

exports.createDelivery = function createDelivery(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createDeliveryRef(dcInstance, inputVars));
}
;

const updateDeliveryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateDelivery', inputVars);
}
updateDeliveryRef.operationName = 'UpdateDelivery';
exports.updateDeliveryRef = updateDeliveryRef;

exports.updateDelivery = function updateDelivery(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateDeliveryRef(dcInstance, inputVars));
}
;

const createOrganizationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateOrganization', inputVars);
}
createOrganizationRef.operationName = 'CreateOrganization';
exports.createOrganizationRef = createOrganizationRef;

exports.createOrganization = function createOrganization(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createOrganizationRef(dcInstance, inputVars));
}
;

const updateUserOrganizationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateUserOrganization', inputVars);
}
updateUserOrganizationRef.operationName = 'UpdateUserOrganization';
exports.updateUserOrganizationRef = updateUserOrganizationRef;

exports.updateUserOrganization = function updateUserOrganization(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateUserOrganizationRef(dcInstance, inputVars));
}
;

const createProofRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateProof', inputVars);
}
createProofRef.operationName = 'CreateProof';
exports.createProofRef = createProofRef;

exports.createProof = function createProof(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createProofRef(dcInstance, inputVars));
}
;

const updateProofRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateProof', inputVars);
}
updateProofRef.operationName = 'UpdateProof';
exports.updateProofRef = updateProofRef;

exports.updateProof = function updateProof(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateProofRef(dcInstance, inputVars));
}
;

const createStaffProfileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateStaffProfile', inputVars);
}
createStaffProfileRef.operationName = 'CreateStaffProfile';
exports.createStaffProfileRef = createStaffProfileRef;

exports.createStaffProfile = function createStaffProfile(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createStaffProfileRef(dcInstance, inputVars));
}
;

const createCustomerProfileRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateCustomerProfile', inputVars);
}
createCustomerProfileRef.operationName = 'CreateCustomerProfile';
exports.createCustomerProfileRef = createCustomerProfileRef;

exports.createCustomerProfile = function createCustomerProfile(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createCustomerProfileRef(dcInstance, inputVars));
}
;

const createPaymentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreatePayment', inputVars);
}
createPaymentRef.operationName = 'CreatePayment';
exports.createPaymentRef = createPaymentRef;

exports.createPayment = function createPayment(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createPaymentRef(dcInstance, inputVars));
}
;

const updatePaymentStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdatePaymentStatus', inputVars);
}
updatePaymentStatusRef.operationName = 'UpdatePaymentStatus';
exports.updatePaymentStatusRef = updatePaymentStatusRef;

exports.updatePaymentStatus = function updatePaymentStatus(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updatePaymentStatusRef(dcInstance, inputVars));
}
;

const createAuditLogRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateAuditLog', inputVars);
}
createAuditLogRef.operationName = 'CreateAuditLog';
exports.createAuditLogRef = createAuditLogRef;

exports.createAuditLog = function createAuditLog(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createAuditLogRef(dcInstance, inputVars));
}
;

const getUserByIdRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserById', inputVars);
}
getUserByIdRef.operationName = 'GetUserById';
exports.getUserByIdRef = getUserByIdRef;

exports.getUserById = function getUserById(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getUserByIdRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const listCategoriesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListCategories');
}
listCategoriesRef.operationName = 'ListCategories';
exports.listCategoriesRef = listCategoriesRef;

exports.listCategories = function listCategories(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listCategoriesRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getCategoryServicesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCategoryServices', inputVars);
}
getCategoryServicesRef.operationName = 'GetCategoryServices';
exports.getCategoryServicesRef = getCategoryServicesRef;

exports.getCategoryServices = function getCategoryServices(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getCategoryServicesRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getOrderRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetOrder', inputVars);
}
getOrderRef.operationName = 'GetOrder';
exports.getOrderRef = getOrderRef;

exports.getOrder = function getOrder(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getOrderRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const listOrdersByUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListOrdersByUser', inputVars);
}
listOrdersByUserRef.operationName = 'ListOrdersByUser';
exports.listOrdersByUserRef = listOrdersByUserRef;

exports.listOrdersByUser = function listOrdersByUser(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listOrdersByUserRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const listInventoryItemsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListInventoryItems');
}
listInventoryItemsRef.operationName = 'ListInventoryItems';
exports.listInventoryItemsRef = listInventoryItemsRef;

exports.listInventoryItems = function listInventoryItems(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listInventoryItemsRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getInventoryItemRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetInventoryItem', inputVars);
}
getInventoryItemRef.operationName = 'GetInventoryItem';
exports.getInventoryItemRef = getInventoryItemRef;

exports.getInventoryItem = function getInventoryItem(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getInventoryItemRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getUserByIdentifierRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserByIdentifier', inputVars);
}
getUserByIdentifierRef.operationName = 'GetUserByIdentifier';
exports.getUserByIdentifierRef = getUserByIdentifierRef;

exports.getUserByIdentifier = function getUserByIdentifier(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getUserByIdentifierRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getDeliveryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetDelivery', inputVars);
}
getDeliveryRef.operationName = 'GetDelivery';
exports.getDeliveryRef = getDeliveryRef;

exports.getDelivery = function getDelivery(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getDeliveryRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getOrderProofsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetOrderProofs', inputVars);
}
getOrderProofsRef.operationName = 'GetOrderProofs';
exports.getOrderProofsRef = getOrderProofsRef;

exports.getOrderProofs = function getOrderProofs(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getOrderProofsRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getProofRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetProof', inputVars);
}
getProofRef.operationName = 'GetProof';
exports.getProofRef = getProofRef;

exports.getProof = function getProof(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getProofRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const listRecentOrdersRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListRecentOrders');
}
listRecentOrdersRef.operationName = 'ListRecentOrders';
exports.listRecentOrdersRef = listRecentOrdersRef;

exports.listRecentOrders = function listRecentOrders(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listRecentOrdersRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const listActiveDeliveriesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListActiveDeliveries');
}
listActiveDeliveriesRef.operationName = 'ListActiveDeliveries';
exports.listActiveDeliveriesRef = listActiveDeliveriesRef;

exports.listActiveDeliveries = function listActiveDeliveries(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listActiveDeliveriesRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const listUsersByRoleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListUsersByRole', inputVars);
}
listUsersByRoleRef.operationName = 'ListUsersByRole';
exports.listUsersByRoleRef = listUsersByRoleRef;

exports.listUsersByRole = function listUsersByRole(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listUsersByRoleRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const listAllOrdersForIntelligenceRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAllOrdersForIntelligence');
}
listAllOrdersForIntelligenceRef.operationName = 'ListAllOrdersForIntelligence';
exports.listAllOrdersForIntelligenceRef = listAllOrdersForIntelligenceRef;

exports.listAllOrdersForIntelligence = function listAllOrdersForIntelligence(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listAllOrdersForIntelligenceRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const listWastedConsumptionsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListWastedConsumptions');
}
listWastedConsumptionsRef.operationName = 'ListWastedConsumptions';
exports.listWastedConsumptionsRef = listWastedConsumptionsRef;

exports.listWastedConsumptions = function listWastedConsumptions(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listWastedConsumptionsRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getOrderWithDetailsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetOrderWithDetails', inputVars);
}
getOrderWithDetailsRef.operationName = 'GetOrderWithDetails';
exports.getOrderWithDetailsRef = getOrderWithDetailsRef;

exports.getOrderWithDetails = function getOrderWithDetails(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getOrderWithDetailsRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const listOrdersForQcRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListOrdersForQC');
}
listOrdersForQcRef.operationName = 'ListOrdersForQC';
exports.listOrdersForQcRef = listOrdersForQcRef;

exports.listOrdersForQc = function listOrdersForQc(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listOrdersForQcRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const listOrdersByUserWithDetailsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListOrdersByUserWithDetails', inputVars);
}
listOrdersByUserWithDetailsRef.operationName = 'ListOrdersByUserWithDetails';
exports.listOrdersByUserWithDetailsRef = listOrdersByUserWithDetailsRef;

exports.listOrdersByUserWithDetails = function listOrdersByUserWithDetails(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(listOrdersByUserWithDetailsRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getWorkerJobRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetWorkerJob', inputVars);
}
getWorkerJobRef.operationName = 'GetWorkerJob';
exports.getWorkerJobRef = getWorkerJobRef;

exports.getWorkerJob = function getWorkerJob(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getWorkerJobRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const listOrganizationsWithUsersRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListOrganizationsWithUsers');
}
listOrganizationsWithUsersRef.operationName = 'ListOrganizationsWithUsers';
exports.listOrganizationsWithUsersRef = listOrganizationsWithUsersRef;

exports.listOrganizationsWithUsers = function listOrganizationsWithUsers(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listOrganizationsWithUsersRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getServiceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetService', inputVars);
}
getServiceRef.operationName = 'GetService';
exports.getServiceRef = getServiceRef;

exports.getService = function getService(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getServiceRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getPaymentByReferenceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetPaymentByReference', inputVars);
}
getPaymentByReferenceRef.operationName = 'GetPaymentByReference';
exports.getPaymentByReferenceRef = getPaymentByReferenceRef;

exports.getPaymentByReference = function getPaymentByReference(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getPaymentByReferenceRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;
