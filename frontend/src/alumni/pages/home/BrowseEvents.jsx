import React, { useEffect, useRef } from "react";
import { useGetEvents } from "../../_api/@react-client-query/query";
import EventCard from "../../components/cards/EventCard";
import PostCardLoading from "../../components/cards/loaders/PostCardLoading";
import Spinner from "../../components/Spinner.jsx";

const BrowseEvents = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } = useGetEvents(5);

  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col gap-2">
      {data?.pages[0].events.length === 0 && <h1>No events available.</h1>}
      <Spinner isLoading={isFetching} />
      {data?.pages?.map((page, pageIndex) =>
        page.events?.map((event, index) => (
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
          />
        ))
      )}

      <div ref={observerRef} className="observer-trigger" style={{ visibility: hasNextPage ? "visible" : "hidden" }}>
        {isFetchingNextPage && <PostCardLoading />}
      </div>
    </div>
  );
};

export default BrowseEvents;
