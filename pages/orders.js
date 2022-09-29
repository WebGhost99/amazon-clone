import moment from "moment/moment";
import { getSession, useSession } from "next-auth/react";
import Header from "../components/Header"
import Order from "../components/Order";
import db from "../firebase";


function Orders({orders}) {
    const {data:session} = useSession();
  return (
    <div>
        <Header />
        <main className="max-w-screen-lg mx-auto p-10">
            <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">Your Orders</h1>
            {session ? (
                <h2>{orders.length} Orders</h2>
            ):(
                <h2>Please sign in to see your orders</h2>
            )}

            <div className="mt-5 space-y-4" >
                {orders?.map(({id, images , timestamp , amount, items, amount_shipping}) => (
                    <Order
                    id = {id}
                    images = {images}
                    timestamp = {timestamp}
                    amount = {amount}
                    items = {items}
                    amount_shipping = {amount_shipping}
                     />
                ))}
            </div>
        </main>
    </div>
  )
}

export default Orders

export async function getServerSideProps(context){
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

    //get the user logged in credentials
    const session = await getSession(context);

    if(!session){
        return {
            props : {}
        }
    }

    // get info from database
    const stripeOrders = await  db.collection("users").doc(session.user.email)
    .collection("orders").orderBy('timestamp','desc')
    .get();

    // Stripe order
    const orders = await Promise.all(
        stripeOrders.docs.map(async (order)=> ({
            id : order.id,
            amount :order.data().amount,
            amount_shipping : order.data().amount_shipping,
            images : order.data().images,
            timestamp :moment(order.data().timestamp.toDate()).unix(),
        }))
    )


    return {
        props : {
            orders,
            session
        }
    }
} 