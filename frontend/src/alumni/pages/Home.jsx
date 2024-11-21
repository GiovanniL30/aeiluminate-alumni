import React, { useRef, useEffect } from "react";
import Contacts from "../components/_home/Contacts";
import EventsNearYou from "../components/_home/EventsNearYou";
import JobsNearYou from "../components/_home/JobsNearYou";
import SuggestedAlbums from "../components/_home/SuggestedAlbums";
import SuggestedContacts from "../components/_home/SuggestedContacts";
import { useGetPosts } from "../_api/@react-client-query/query";
import PostCard from "../components/_cards/PostCard";
import AelineCard from "../components/_cards/AelineCard";
import PostCardLoading from "../components/_cards/PostCardLoading";

const Home = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetPosts(2);
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
    <div className="max-container flex justify-between gap-20">
      <div className="fixed left-0 hidden w-[300px] md:flex bg-red-50">Left</div>
      <div className="flex w-full justify-center flex-col gap-10  md:ml-[250px] xl:mx-auto max-w-[600px]">
        {data?.pages[0].posts.length === 0 && <h1>No posts available.</h1>}

        {data?.pages.map((page) => {
          return page.posts.map((post) => {
            return (
              <React.Fragment key={post.postID}>
                {post.postMedia.length > 0 ? (
                  <PostCard caption={post.caption} createdAt={post.createdAt} postID={post.postID} images={post.postMedia} userID={post.userID} />
                ) : (
                  <AelineCard caption={post.caption} createdAt={post.createdAt} postID={post.postID} userID={post.userID} />
                )}
              </React.Fragment>
            );
          });
        })}
        <div ref={observerRef} className="observer-trigger" style={{ visibility: hasNextPage ? "visible" : "hidden" }}>
          {isFetchingNextPage && (
            <>
              <PostCardLoading />
            </>
          )}
        </div>
      </div>
      <div className="fixed right-0 hidden xl:w-[300px] xl:flex bg-red-200">Right</div>
    </div>
  );
};

export default Home;
