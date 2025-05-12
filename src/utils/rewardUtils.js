/**
 * Utility functions for handling rewards in the PayWave app
 */

// Reward rate as a percentage of transaction amount
export const REWARD_RATE = 0.05; // 5% reward rate

/**
 * Calculate reward points based on transfer amount
 * @param {number} amount - The transfer amount
 * @returns {number} - The calculated reward points
 */
export function calculateRewards(amount) {
  const numericAmount = parseFloat(amount) || 0;
  const rewardPoints = Math.floor(numericAmount * REWARD_RATE * 100); // Convert to points (100 points per dollar)
  return rewardPoints > 0 ? rewardPoints : 0;
}
