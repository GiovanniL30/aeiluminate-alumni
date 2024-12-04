import React, { useRef, useEffect } from "react";
import Contacts from "../components/_home/Contacts";
import EventsNearYou from "../components/_home/EventsNearYou";
import JobsNearYou from "../components/_home/JobsNearYou";
import SuggestedAlbums from "../components/_home/SuggestedAlbums";
import SuggestedContacts from "../components/_home/SuggestedContacts";
import { useGetPosts } from "../_api/@react-client-query/query";
import PostCard from "../components/_cards/PostCard";
import AelineCard from "../components/_cards/AelineCard";
import PostCardLoading from "../components/_cards/loaders/PostCardLoading";
import { NavLink, useNavigate } from "react-router-dom";

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
    <div className="max-container flex flex-col md:flex-row justify-between gap-5 w-full p-2">
      <div className="hidden md:flex w-[200px] xl:w-[250px] bg-red-50 fixed left-0 top-[100px] bottom-0">Left</div>

      <div className="flex flex-col w-full md:pl-[150px] md:w-[calc(100%)] xl:w-[650px] xl:pl-0 mx-auto gap-10  =">
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
          {isFetchingNextPage && <PostCardLoading />}
        </div>

        <h1 className="text-center font-bold text-light_text flex justify-center gap-2">
          <p>You have reached the end of posts</p>
          <a className="underline" href=".">
            Refresh
          </a>
        </h1>
      </div>

      <div className="hidden xl:flex w-[250px] bg-red-200 fixed right-0 top-[100px] bottom-0">Right</div>
    </div>
  );
};

export default Home;
