"use client";
import { checkoutOrder } from "@/actions/order.actions";
import { IEvent } from "@/database/models/event.model";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { Button } from "../ui/button";
type Props = {
  event: IEvent;
  db_userId: string;
};

loadStripe(process.env.NEXT_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({ db_userId, event }: Props) => {
  const onCheckout = async () => {
    const order = {
      eventTitle: event.title,
      eventId: event._id,
      price: event.price || "",
      isFree: event.isFree,
      buyer: db_userId,
    };

    await checkoutOrder(order);
  };

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  return (
    <form action={onCheckout} method="post">
      <Button type="submit" role="link" size={"lg"} className="button sm:w-fit">
        {event.isFree ? "Get Tickets" : "Buy Tickets"}
      </Button>
    </form>
  );
};

export default Checkout;
