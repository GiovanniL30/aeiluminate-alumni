import React, { useEffect, useRef } from "react";
import PostCardLoading from "../../components/cards/loaders/PostCardLoading";
import { useGetJobListings } from "../../_api/@react-client-query/query";
import JobCard from "../../components/cards/JobCard";
import Spinner from "../../components/Spinner.jsx";

/**
 *
 *
 * @author Giovanni Leo, Jhea Jhana Prudencio
 */
const BrowseJobs = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } = useGetJobListings(4);
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
      {data?.pages[0].jobs.length === 0 && <h1>No Job Listing available.</h1>}
      <Spinner isLoading={isFetching} />

      {data?.pages?.map((page, pageIndex) =>
        page.jobs?.map((job, index) => (
          <JobCard
            key={index}
            workType={job.workType}
            url={job.url}
            salary={job.salary}
            jobTitle={job.jobTitle}
            jobID={job.jobID}
            experienceRequired={job.experienceRequired}
            description={job.description}
            createdOn={job.description}
            createdBy={job.createdBy}
            company={job.company}
          />
        ))
      )}

      <div ref={observerRef} className="observer-trigger" style={{ visibility: hasNextPage ? "visible" : "hidden" }}>
        {isFetchingNextPage && <PostCardLoading />}
      </div>
    </div>
  );
};

export default BrowseJobs;
