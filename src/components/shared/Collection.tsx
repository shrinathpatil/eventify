import { IEvent } from "@/database/models/event.model";
import Card from "./Card";

type Props = {
  data: IEvent[];
  emptyTitle: string;
  emptyStateSubText: string;
  collectionType: "Events_Organized" | "All_Events" | "My_Tickets";
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  userId?: string;
};

const Collection = ({
  collectionType,
  data,
  emptyStateSubText,
  emptyTitle,
  limit,
  page,
  totalPages,
  urlParamName,
  userId,
}: Props) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col gap-10 items-center">
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {data.map((event) => {
              const hasOrderLink = collectionType === "Events_Organized";
              const hidePrice = collectionType === "My_Tickets";

              return (
                <li className="" key={event._id}>
                  <Card
                    event={event}
                    hasOrderLink={hasOrderLink}
                    hidePrice={hidePrice}
                    userId={userId}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="flex-center wrapper min-h-[200px] flex-col w-full gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
          <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
          <p className="p-regular-14">{emptyStateSubText}</p>
        </div>
      )}
    </>
  );
};

export default Collection;
