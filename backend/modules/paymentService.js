const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Load your Stripe secret key from environment variables

/**
 * Creates a payment intent for a given amount.
 * @param {number} amount - The amount to charge in cents.
 * @param {string} currency - The currency code (e.g., 'usd').
 * @param {string} receipt_email - The email to send the receipt to.
 * @returns {Promise<object>} - The payment intent object from Stripe.
 */
async function createPaymentIntent(amount, currency = 'usd', receipt_email = '') {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            receipt_email,
            // Optionally, you can include other parameters such as metadata
        });
        return paymentIntent;
    } catch (error) {
        console.error('Error creating payment intent:', error);
        throw error;
    }
}

/**
 * Confirms a payment intent using a payment method ID.
 * @param {string} paymentIntentId - The ID of the payment intent to confirm.
 * @param {string} paymentMethodId - The ID of the payment method to use.
 * @returns {Promise<object>} - The confirmed payment intent object from Stripe.
 */
async function confirmPaymentIntent(paymentIntentId, paymentMethodId) {
    try {
        const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
            payment_method: paymentMethodId,
        });
        return paymentIntent;
    } catch (error) {
        console.error('Error confirming payment intent:', error);
        throw error;
    }
}

module.exports = {
    createPaymentIntent,
    confirmPaymentIntent,
};
