import { buffer } from "micro"
import * as admin from "firebase-admin"

//Secure Connx To The Firebase
const serviceAccount = require('../../permission.json');

const app = !admin.apps.length ? admin.initializeApp({
    credential : admin.credential.cert(serviceAccount),
}) : admin.app();

//Establish conx to stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//Get the endpoint 
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
    console.log(`full filling order`, session)
    return app
           .firestore()
           .collection("users")
           .doc(session.metadata.email)
           .collection("orders")
           .doc(session.id)
           .set({
            amount : session.amount_total /100,
            amount_shipping :session.total_details.amount_shipping/100,
            images : JSON.parse(session.metadata.images),
            timestamp : admin.firestore.FieldValue.serverTimestamp(),
           }).then(()=> {
                console.log(`Order ${session.id} has been added to the database `)
           })
}

export default async (req,res) => {
    if(req.method === "POST") {
        //Generate The certificate using buffer 
        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString();
        const sig = req.headers['stripe-signature'];

        let event;
        //verify that the event came from stripe
    try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    }
    catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

    //handle the event
    if(event.type === "checkout.session.completed"){
        const session = event.data.object;

        //Fulfill the order
        return fulfillOrder(session)
        .then(() => res.status(200))
        .catch((err) => res.status(400).send(`Webhook Error : ${err.message}`));
    }

    // Return a response to acknowledge receipt of the event
    res.json({received: true});

    }
};

export const config = {
    api: {
        bodyParser: false,
        externalResolver : true,  //if send request it will be resolved by stripe
    }
}