// modules/priceCalculator.js

/**
 * Calculates the cost of a ride based on distance and pricing parameters.
 * @param {number} distance - The distance traveled in kilometers.
 * @param {number} baseFare - The base fare for the ride.
 * @param {number} ratePerKm - The rate per kilometer.
 * @param {number} [minFare=0] - The minimum fare for the ride.
 * @returns {number} - The total ride cost.
 */
function calculateRideCost(distance, baseFare, ratePerKm, minFare = 0) {
    // Validate inputs
    if (distance < 0 || baseFare < 0 || ratePerKm < 0) {
        throw new Error('Distance, base fare, and rate per kilometer must be non-negative.');
    }

    // Calculate the cost based on distance
    const distanceCost = distance * ratePerKm;

    // Calculate the total cost
    const totalCost = baseFare + distanceCost;

    // Return the maximum of the total cost and the minimum fare
    return Math.max(totalCost, minFare);
}

module.exports = calculateRideCost;
