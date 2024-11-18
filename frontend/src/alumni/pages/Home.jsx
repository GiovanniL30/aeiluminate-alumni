import React, { useRef, useEffect } from "react";
import Contacts from "../components/_home/Contacts";
import EventsNearYou from "../components/_home/EventsNearYou";
import JobsNearYou from "../components/_home/JobsNearYou";
import SuggestedAlbums from "../components/_home/SuggestedAlbums";
import SuggestedContacts from "../components/_home/SuggestedContacts";
import { useGetPosts } from "../_api/@react-client-query/query";
import PostCard from "../components/_cards/PostCard";
import AelineCard from "../components/_cards/AelineCard";

const Home = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetPosts(5);

  console.log(data);

  if (data?.pages[0].posts.length === 0) {
    return <h1>No posts available.</h1>;
  }

  return (
    <div className="max-container flex justify-between gap-20">
      <div className="hidden w-[50%] lg:flex bg-red-50">Left</div>
      <div className="flex w-full justify-center flex-col gap-10 ">
        {data?.pages[0].posts.map((post) => {
          return (
            <>
              {post.postMedia.length > 0 ? (
                <PostCard
                  key={post.postID}
                  caption={post.caption}
                  createdAt={post.createdAt}
                  postID={post.postID}
                  images={post.postMedia}
                  userID={post.userID}
                />
              ) : (
                <AelineCard key={post.postID} caption={post.caption} createdAt={post.createdAt} postID={post.postID} userID={post.userID} />
              )}
            </>
          );
        })}

        {hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="py-2 px-4 mt-4 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
        )}
      </div>

      <div className="hidden w-[50%] md:flex bg-red-200">Right</div>
    </div>
  );
};

export default Home;
