import { getEventById } from "@/actions/event.actions";
import { getUserById } from "@/actions/user.actions";
import EventForm from "@/components/shared/EventForm";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";

const UpdateEvent = async ({ params: { id } }: SearchParamProps) => {
  const { userId } = auth();
  const user = await getUserById(userId!);
  const event = await getEventById(id);
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Update Event
        </h3>
      </section>
      <div className="wrapper my-8">
        <EventForm
          event={event}
          userId={userId!}
          db_userId={user._id}
          type="Update"
          eventId={id}
        />
      </div>
    </>
  );
};

export default UpdateEvent;
