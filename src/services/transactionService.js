/**
 * Service for Transaction table operations
 */

/**
 * Fetch all transactions
 * @param {Object} filterParams - Optional filter parameters
 * @returns {Promise<Array>} - Promise resolving to array of transactions
 */
export const fetchTransactions = async (filterParams = {}) => {
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
        { Field: { Name: "amount" } },
        { Field: { Name: "date" } },
        { Field: { Name: "type" } },
        { Field: { Name: "avatar" } }
      ],
      orderBy: [
        { field: "date", direction: "desc" }
      ],
      pagingInfo: {
        limit: filterParams.limit || 10,
        offset: filterParams.offset || 0
      }
    };
    
    // Add any additional filters if provided
    if (filterParams.type) {
      params.where = [
        {
          fieldName: "type",
          Operator: "ExactMatch",
          values: [filterParams.type]
        }
      ];
    }
    
    const response = await apperClient.fetchRecords('transaction', params);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

/**
 * Create a new transaction
 * @param {Object} transactionData - Transaction data to create 
 * @returns {Promise<Object>} - Created transaction
 */
export const createTransaction = async (transactionData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const response = await apperClient.createRecord('transaction', {
      records: [transactionData]
    });
    
    if (response && response.success && response.results && response.results.length > 0) {
      return response.results[0].data;
    }
    throw new Error('Failed to create transaction');
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw error;
  }
};

/**
 * Get transaction by ID
 * @param {Number} id - Transaction ID
 * @returns {Promise<Object>} - Transaction data
 */
export const getTransactionById = async (id) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const response = await apperClient.getRecordById('transaction', id);
    return response.data;
  } catch (error) {
    console.error(`Error fetching transaction with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Update a transaction
 * @param {Object} transactionData - Transaction data with Id
 * @returns {Promise<Object>} - Updated transaction
 */
export const updateTransaction = async (transactionData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const response = await apperClient.updateRecord('transaction', {
      records: [transactionData]
    });
    
    if (response && response.success && response.results && response.results.length > 0) {
      return response.results[0].data;
    }
    throw new Error('Failed to update transaction');
  } catch (error) {
    console.error("Error updating transaction:", error);
    throw error;
  }
};

/**
 * Delete a transaction by ID
 * @param {Number} id - Transaction ID
 * @returns {Promise<Boolean>} - Success status
 */
export const deleteTransaction = async (id) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const response = await apperClient.deleteRecord('transaction', {
      RecordIds: [id]
    });
    
    return response && response.success;
  } catch (error) {
    console.error(`Error deleting transaction with ID ${id}:`, error);
    throw error;
  }
};