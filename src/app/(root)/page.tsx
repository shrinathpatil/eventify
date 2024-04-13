import { getAllEvents } from "@/actions/event.actions";
import { getUserById } from "@/actions/user.actions";
import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import Search from "@/components/shared/Search";
import { Button } from "@/components/ui/button";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const HomePage = async ({ searchParams }: SearchParamProps) => {
  const { userId } = auth(); //user from clerk
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";
  const user = await getUserById(userId!); //get user from database

  //to get all events
  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6,
  });

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">
              Host, Connect, Celebrate: your Events, Our Platform
            </h1>
            <p className="p-regular-20 md:p-regular-24">
              Evently is the best platform to host, connect, and celebrate your
              events. From birthdays to weddings, we have you covered.
            </p>
            <Button size={"lg"} className="button w-full sm:w-fit">
              <Link href="#events">Explore now</Link>
            </Button>
          </div>
          <Image
            src="/assets/images/hero.png"
            width={1000}
            height={1000}
            alt="hero image"
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section>
      <section
        id="events"
        className="wrapper my-8 flex flex-col gap-8 mad:gap-12"
      >
        <h2 className="h2-bold">
          Trusted by <br />
          thousands of Events
        </h2>
        <div className="flex flex-col w-full gap-5 md:flex-row">
          <Search placeholder="Search events..." />
          <CategoryFilter />
        </div>
        <Collection
          data={events?.data}
          emptyTitle="No events found"
          emptyStateSubText="come back later"
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={events?.totalPages || 1}
          userId={user?._id}
        />
      </section>
    </>
  );
};

export default HomePage;
