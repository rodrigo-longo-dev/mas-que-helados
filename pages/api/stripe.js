import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

const SANITY_ID = 'sriu7xjj'
const STRIPE_SHIPPING_OPTIONS = [
  { shipping_rate: 'shr_1LmCpsGYxWDRvVe6f4KLV98m' },
]
const STRIPE_CONFIG_CURRENCY = 'eur'



export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: STRIPE_SHIPPING_OPTIONS,
        line_items: req.body.map((item) => {
          const img = item.image[0].asset._ref;
          const newImage = img
          .replace('image-', `https://cdn.sanity.io/images/${SANITY_ID}/production/`)
          .replace('-webp', '.webp')
          .replace('-jpeg', '.jpeg')
          .replace('-jpg', '.jpg')
          .replace('-png', '.png');

          return {
            price_data: { 
              currency: STRIPE_CONFIG_CURRENCY,
              product_data: { 
                name: item.name,
                images: [newImage],
              },
              unit_amount: parseFloat((item.price * 100).toFixed(2)),
            },
            adjustable_quantity: {
              enabled:true,
              minimum: 1,
            },
            quantity: item.quantity
          }
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      }
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);

      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}