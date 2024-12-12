import React from "react";
import { useParams } from "react-router-dom";
import { useGetUserInterestedEvents } from "../../_api/@react-client-query/query";
import EventCard from "../../components/cards/EventCard";
import PostCardLoading from "../../components/cards/loaders/PostCardLoading";

const UserInteresetedEvents = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetUserInterestedEvents(id);

  if (isLoading) return <PostCardLoading />;

  const interestedEvents = (data || []).sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));

  return (
    <div className="max-w-[1200px] mx-auto mt-20">
      {interestedEvents.length == 0 ? (
        <div className="flex flex-col w-full justify-center items-center gap-5">
          <h1 className="font-bold">No post available!</h1>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center max-w-[550px] mx-auto gap-2">
          {interestedEvents.map((event, index) => (
            <EventCard
            key={index}
            title={event.title}
            description={event.description}
            eventDateTime={event.eventDateTime}
            location={event.location}
            eventType={event.eventType}
            createdOn={event.createdOn}
            createdBy={event.createdBy}
            imageUrl={event.imageUrl}
            eventID={event.eventID}
          />))}
        </div>
      )}
    </div>
  );
};

export default UserInteresetedEvents;
