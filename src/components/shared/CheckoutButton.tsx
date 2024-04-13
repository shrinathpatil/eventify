"use client";

import { IEvent } from "@/database/models/event.model";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../ui/button";
import Checkout from "./Checkout";

type Props = {
  event: IEvent;
  db_userId: string;
};

const CheckoutButton = ({ event, db_userId }: Props) => {
  const hasEventFinished = new Date(event.endDateTime) < new Date();

  return (
    <div className="flex items-center gap-3">
      {hasEventFinished ? (
        <p className="p-2 text-red-400">
          Sorry, tickets are no longer available
        </p>
      ) : (
        <>
          <SignedOut>
            <Button asChild className="button rounded-full" size={"lg"}>
              <Link href="/sign-in">Get Tickets</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <Checkout event={event} db_userId={db_userId} />
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
