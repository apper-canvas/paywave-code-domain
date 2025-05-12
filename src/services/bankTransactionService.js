/**
 * Service for Bank Transaction table operations
 */

/**
 * Fetch all bank transactions
 * @param {Object} filterParams - Optional filter parameters
 * @returns {Promise<Array>} - Promise resolving to array of bank transactions
 */
export const fetchBankTransactions = async (filterParams = {}) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const params = {
      Fields: [
        { Field: { Name: "Id" } },
        { Field: { Name: "Name" } },
        { Field: { Name: "merchant" } },
        { Field: { Name: "amount" } },
        { Field: { Name: "type" } },
        { Field: { Name: "date" } },
        { Field: { Name: "bank_account" } }
      ],
      orderBy: [
        { field: "date", direction: "desc" }
      ],
      pagingInfo: {
        limit: filterParams.limit || 10,
        offset: filterParams.offset || 0
      }
    };
    
    // Add bank account filter if provided
    if (filterParams.bankAccountId) {
      params.where = [
        {
          fieldName: "bank_account",
          Operator: "ExactMatch",
          values: [filterParams.bankAccountId]
        }
      ];
    }
    
    // Add transaction type filter if provided
    if (filterParams.type) {
      if (!params.where) {
        params.where = [];
      }
      params.where.push({
        fieldName: "type",
        Operator: "ExactMatch",
        values: [filterParams.type]
      });
    }
    
    const response = await apperClient.fetchRecords('bank_transaction', params);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching bank transactions:", error);
    throw error;
  }
};

/**
 * Create a new bank transaction
 * @param {Object} bankTransactionData - Bank transaction data to create
 * @returns {Promise<Object>} - Created bank transaction
 */
export const createBankTransaction = async (bankTransactionData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const response = await apperClient.createRecord('bank_transaction', {
      records: [bankTransactionData]
    });
    
    if (response && response.success && response.results && response.results.length > 0) {
      return response.results[0].data;
    }
    throw new Error('Failed to create bank transaction');
  } catch (error) {
    console.error("Error creating bank transaction:", error);
    throw error;
  }
};

/**
 * Get bank transaction by ID
 * @param {Number} id - Bank transaction ID
 * @returns {Promise<Object>} - Bank transaction data
 */
export const getBankTransactionById = async (id) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const response = await apperClient.getRecordById('bank_transaction', id);
    return response.data;
  } catch (error) {
    console.error(`Error fetching bank transaction with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Update a bank transaction
 * @param {Object} bankTransactionData - Bank transaction data with Id
 * @returns {Promise<Object>} - Updated bank transaction
 */
export const updateBankTransaction = async (bankTransactionData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const response = await apperClient.updateRecord('bank_transaction', {
      records: [bankTransactionData]
    });
    
    if (response && response.success && response.results && response.results.length > 0) {
      return response.results[0].data;
    }
    throw new Error('Failed to update bank transaction');
  } catch (error) {
    console.error("Error updating bank transaction:", error);
    throw error;
  }
};

/**
 * Delete a bank transaction by ID
 * @param {Number} id - Bank transaction ID
 * @returns {Promise<Boolean>} - Success status
 */
export const deleteBankTransaction = async (id) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const response = await apperClient.deleteRecord('bank_transaction', {
      RecordIds: [id]
    });
    
    return response && response.success;
  } catch (error) {
    console.error(`Error deleting bank transaction with ID ${id}:`, error);
    throw error;
  }
};