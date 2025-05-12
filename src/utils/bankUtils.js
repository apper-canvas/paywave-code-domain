/**
 * Utility functions for bank operations
 */

/**
 * Fetch bank account balances
 * @param {number} userId - The user ID
 * @returns {Promise<Array>} - Promise resolving to array of bank accounts
 */
export const fetchBankBalances = (userId) => {
  // This would normally be an API call to a backend service
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      resolve([
        { 
          id: 1, 
          bankName: 'First National Bank', 
          accountType: 'Checking', 
          accountNumber: '****4567',
          balance: 3245.67,
          logo: 'https://source.unsplash.com/100x100/?bank,logo,1'
        },
        { 
          id: 2, 
          bankName: 'City Credit Union', 
          accountType: 'Savings', 
          accountNumber: '****1234',
          balance: 12750.42,
          logo: 'https://source.unsplash.com/100x100/?bank,logo,2'
        },
        { 
          id: 3, 
          bankName: 'Global Investment Bank', 
          accountType: 'Investment', 
          accountNumber: '****7890',
          balance: 45689.23,
          logo: 'https://source.unsplash.com/100x100/?bank,logo,3'
        }
      ]);
    }, 1000);
  });
};

/**
 * Fetch bank transactions for an account
 * @param {number} accountId - The bank account ID
 * @returns {Promise<Array>} - Promise resolving to array of transactions
 */
export const fetchBankTransactions = (accountId) => {
  // This would normally be an API call to a backend service
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      // Different transactions based on account ID to simulate real data
      if (accountId === 1) {
        resolve([
          { id: 101, merchant: 'Grocery Store', amount: 78.35, type: 'debit', date: 'Aug 12, 2023' },
          { id: 102, merchant: 'Gas Station', amount: 45.00, type: 'debit', date: 'Aug 10, 2023' },
          { id: 103, merchant: 'Salary Deposit', amount: 2500.00, type: 'credit', date: 'Aug 1, 2023' },
          { id: 104, merchant: 'Restaurant', amount: 65.23, type: 'debit', date: 'Jul 28, 2023' }
        ]);
      } else if (accountId === 2) {
        resolve([
          { id: 201, merchant: 'Interest Payment', amount: 12.45, type: 'credit', date: 'Aug 15, 2023' },
          { id: 202, merchant: 'Transfer to Checking', amount: 500.00, type: 'debit', date: 'Aug 5, 2023' },
          { id: 203, merchant: 'Deposit', amount: 1000.00, type: 'credit', date: 'Jul 20, 2023' }
        ]);
      } else if (accountId === 3) {
        resolve([
          { id: 301, merchant: 'Dividend Payment', amount: 345.67, type: 'credit', date: 'Aug 17, 2023' },
          { id: 302, merchant: 'Stock Purchase', amount: 1500.00, type: 'debit', date: 'Aug 10, 2023' },
          { id: 303, merchant: 'Broker Fee', amount: 25.00, type: 'debit', date: 'Aug 10, 2023' },
          { id: 304, merchant: 'Stock Sale', amount: 2700.00, type: 'credit', date: 'Jul 25, 2023' }
        ]);
      } else {
        resolve([]);
      }
    }, 800);
  });
};

/**
 * Format currency with locale and options
 * @param {number} amount - The amount to format
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (amount) => {
  return amount.toLocaleString('en-US', { 
    style: 'currency', 
    currency: 'USD',
    minimumFractionDigits: 2
  });
};