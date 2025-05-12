/**
 * Service for Wallet table operations
 */

/**
 * Fetch user wallet
 * @returns {Promise<Object>} - Promise resolving to wallet data
 */
export const fetchWallet = async () => {
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
        { Field: { Name: "balance" } },
        { Field: { Name: "Owner" } }
      ],
      pagingInfo: {
        limit: 1,
        offset: 0
      }
    };
    
    const response = await apperClient.fetchRecords('wallet', params);
    if (response.data && response.data.length > 0) {
      return response.data[0];
    }
    return null;
  } catch (error) {
    console.error("Error fetching wallet:", error);
    throw error;
  }
};

/**
 * Create a new wallet
 * @param {Object} walletData - Wallet data to create
 * @returns {Promise<Object>} - Created wallet
 */
export const createWallet = async (walletData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const response = await apperClient.createRecord('wallet', {
      records: [walletData]
    });
    
    if (response && response.success && response.results && response.results.length > 0) {
      return response.results[0].data;
    }
    throw new Error('Failed to create wallet');
  } catch (error) {
    console.error("Error creating wallet:", error);
    throw error;
  }
};

/**
 * Update wallet balance
 * @param {Object} walletData - Wallet data with Id and updated balance
 * @returns {Promise<Object>} - Updated wallet
 */
export const updateWalletBalance = async (walletData) => {
  try {
    const { ApperClient } = window.ApperSDK;
    const apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
    
    const response = await apperClient.updateRecord('wallet', {
      records: [walletData]
    });
    
    if (response && response.success && response.results && response.results.length > 0) {
      return response.results[0].data;
    }
    throw new Error('Failed to update wallet balance');
  } catch (error) {
    console.error("Error updating wallet balance:", error);
    throw error;
  }
};