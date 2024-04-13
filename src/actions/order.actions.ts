"use server";
import { connectToDb } from "@/database";
import { Order } from "@/database/models/order.model";
import { handleError } from "@/lib/utils";
import { CheckoutOrderParams, CreateOrderParams } from "@/types";
import { redirect } from "next/navigation";
import Stripe from "stripe";

export const checkoutOrder = async (order: CheckoutOrderParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const price = order.isFree ? 0 : Number(order.price) * 100;
  let session = null;
  try {
    // Create Checkout Sessions from body params.
    session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "inr",
            unit_amount: price,
            product_data: {
              name: order.eventTitle,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        eventId: order.eventId,
        buyerId: order.buyer,
      },
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });

    // console.log("session", session.url);
  } catch (error) {
    handleError(error);
  } finally {
    if (session) {
      redirect(session.url!);
    } else {
      console.log("Error in creating session");
    }
  }
};

export const createOrder = async (order: CreateOrderParams) => {
  try {
    await connectToDb();

    const newOrder = await Order.create(order);

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleError(error);
  }
};
