/**
 * Service for Bank Account table operations
 */

/**
 * Fetch all bank accounts
 * @param {Object} filterParams - Optional filter parameters
 * @returns {Promise<Array>} - Promise resolving to array of bank accounts
 */
export const fetchBankAccounts = async (filterParams = {}) => {
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
        { Field: { Name: "bank_name" } },
        { Field: { Name: "account_type" } },
        { Field: { Name: "account_number" } },
        { Field: { Name: "balance" } },
        { Field: { Name: "logo" } },
        { Field: { Name: "color" } }
      ],
      orderBy: [
        { field: "balance", direction: "desc" }
      ],
      pagingInfo: {
        limit: filterParams.limit || 10,
        offset: filterParams.offset || 0
      }
    };
    
    // Add any additional filters if provided
    if (filterParams.accountType) {
      params.where = [
        {
          fieldName: "account_type",
          Operator: "ExactMatch",
          values: [filterParams.accountType]
        }
      ];
    }
    
    const response = await apperClient.fetchRecords('bank_account', params);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching bank accounts:", error);
    throw error;
  }
};

/**
 * Create a new bank account
 * @param {Object} bankAccountData - Bank account data to create
 * @returns {Promise<Object>} - Created bank account
 */
export const createBankAccount = async (bankAccountData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const response = await apperClient.createRecord('bank_account', {
      records: [bankAccountData]
    });
    
    if (response && response.success && response.results && response.results.length > 0) {
      return response.results[0].data;
    }
    throw new Error('Failed to create bank account');
  } catch (error) {
    console.error("Error creating bank account:", error);
    throw error;
  }
};

/**
 * Get bank account by ID
 * @param {Number} id - Bank account ID
 * @returns {Promise<Object>} - Bank account data
 */
export const getBankAccountById = async (id) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const response = await apperClient.getRecordById('bank_account', id);
    return response.data;
  } catch (error) {
    console.error(`Error fetching bank account with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Update a bank account
 * @param {Object} bankAccountData - Bank account data with Id
 * @returns {Promise<Object>} - Updated bank account
 */
export const updateBankAccount = async (bankAccountData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const response = await apperClient.updateRecord('bank_account', {
      records: [bankAccountData]
    });
    
    if (response && response.success && response.results && response.results.length > 0) {
      return response.results[0].data;
    }
    throw new Error('Failed to update bank account');
  } catch (error) {
    console.error("Error updating bank account:", error);
    throw error;
  }
};

/**
 * Delete a bank account by ID
 * @param {Number} id - Bank account ID
 * @returns {Promise<Boolean>} - Success status
 */
export const deleteBankAccount = async (id) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const response = await apperClient.deleteRecord('bank_account', {
      RecordIds: [id]
    });
    
    return response && response.success;
  } catch (error) {
    console.error(`Error deleting bank account with ID ${id}:`, error);
    throw error;
  }
};