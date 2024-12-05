import React, { useRef, useEffect } from "react";
import Contacts from "../components/home/Contacts";
import EventsNearYou from "../components/home/EventsNearYou";
import JobsNearYou from "../components/home/JobsNearYou";
import SuggestedAlbums from "../components/home/SuggestedAlbums";
import SuggestedContacts from "../components/home/SuggestedContacts";
import { useGetPosts } from "../_api/@react-client-query/query";
import PostCard from "../components/cards/PostCard";
import AelineCard from "../components/cards/AelineCard";
import PostCardLoading from "../components/cards/loaders/PostCardLoading";
import { NavLink, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { BounceLoader } from "react-spinners";
import AlbumCard from "../components/cards/AlbumCard";

const Home = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } = useGetPosts(10);
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
      <Spinner isLoading={isFetching} />
      <div className="hidden md:flex w-[200px] xl:w-[250px] bg-red-50 fixed left-0 top-[100px] bottom-0">Left</div>

      <div className="flex flex-col w-full md:pl-[150px] md:w-[calc(100%)] xl:w-[650px] xl:pl-0 mx-auto gap-10">
        {data?.pages[0].posts.length === 0 && <h1>No posts available.</h1>}

        {data?.pages.map((page) => {
          const groupedByAlbum = page.posts.reduce((groups, post) => {
            const key = post.albumId || "no-album";
            if (!groups[key]) groups[key] = [];
            groups[key].push(post);
            return groups;
          }, {});

          return Object.entries(groupedByAlbum).map(([albumId, posts]) => {
            if (albumId !== "no-album") {
              return <AlbumCard key={albumId} albumId={albumId} albumTitle={posts[0]?.albumTitle || "Unnamed Album"} posts={posts} />;
            }

            return posts.map((post) => (
              <React.Fragment key={post.postID}>
                {post.postMedia && post.postMedia.length > 0 ? (
                  <PostCard caption={post.caption} createdAt={post.createdAt} postID={post.postID} images={post.postMedia} userID={post.userID} />
                ) : (
                  <AelineCard caption={post.caption} createdAt={post.createdAt} postID={post.postID} userID={post.userID} />
                )}
              </React.Fragment>
            ));
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
