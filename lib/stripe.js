import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export const formatAmountForStripe = (amount) => {
  return Math.round(amount * 100); // Convert dollars to cents
};