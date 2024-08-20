// config/payment.js

const Stripe = require('stripe');
require('dotenv').config(); // Ensure you have access to environment variables

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = stripe;
