const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (req , res) => {
    const {items , email } = req.body;


    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_address_collection: {
            allowed_countries: ['US', 'CA'],
          },
          shipping_options: [
         
            {
              shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {
                  amount: 1500,
                  currency: 'usd',
                },
                display_name: 'Next day air',
                delivery_estimate: {
                  minimum: {
                    unit: 'business_day',
                    value: 5,
                  },
                  maximum: {
                    unit: 'business_day',
                    value: 7,
                  },
                }
              }
            },
          ],
        line_items: items.map(item => ({
          price_data: {
            currency: 'usd',
            unit_amount: item.price * 100,
            product_data: {
              name: item.title,
              description: item.description,
              images: [item.image],
            },
          },
        quantity: 1,
    
        }
    )),
        mode: 'payment',
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/checkout`,
        metadata : {
            email,
            images : JSON.stringify(items.map(item => item.image)),
        }
    })
    console.log(session)
    res.status(200).json({ id: session.id })
};