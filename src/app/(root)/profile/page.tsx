import { getEventsByUser } from "@/actions/event.actions";
import { getOrdersByUser } from "@/actions/order.actions";
import { getUserById } from "@/actions/user.actions";
import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { IOrder } from "@/database/models/order.model";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const { userId } = auth(); //clerk user
  const user = await getUserById(userId!); //get db userId for the user
  const ordersPage = Number(searchParams?.ordersPage) || 1; //get orders page from query
  const eventsPage = Number(searchParams?.eventsPage) || 1; //get events page from query

  //get orders by current user
  const orders = await getOrdersByUser({
    userId: user._id,
    page: ordersPage,
  });

  // extract events from orders
  const orderedEvents = orders?.data?.map((o: IOrder) => o.event) || [];

  console.log("orderedEvents=>", orderedEvents);

  // get events organized by current user
  const organizedEvents = await getEventsByUser({
    userId: user._id,
    page: eventsPage,
  });

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
          <Button asChild size={"lg"} className="button hidden sm:flex">
            <Link href="/#events">Explore More Events</Link>
          </Button>
        </div>
      </section>
      <section className="wrapper my-8">
        <Collection
          data={orderedEvents}
          emptyTitle="No events tickets purchases yet!"
          emptyStateSubText="no problem plenty of events to explore!"
          collectionType="My_Tickets"
          limit={3}
          page={ordersPage}
          urlParamName="ordersPage"
          totalPages={orders?.totalPages || 1}
        />
      </section>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Events Organized</h3>
          <Button asChild size={"lg"} className="button hidden sm:flex">
            <Link href="/events/create">Create New Event</Link>
          </Button>
        </div>
      </section>
      <section className="wrapper my-8">
        <Collection
          data={organizedEvents?.data}
          emptyTitle="No events have been created yet!"
          emptyStateSubText="go  create some now!"
          collectionType="Events_Organized"
          limit={3}
          page={eventsPage}
          urlParamName="eventsPage"
          totalPages={organizedEvents?.totalPages || 1}
          userId={user?._id}
        />
      </section>
    </>
  );
};

export default ProfilePage;
