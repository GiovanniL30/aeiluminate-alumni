import React, { useRef, useEffect } from "react";
import { useGetPosts } from "../../_api/@react-client-query/query.js";
import PostCard from "../../components/cards/PostCard.jsx";
import AelineCard from "../../components/cards/AelineCard.jsx";
import PostCardLoading from "../../components/cards/loaders/PostCardLoading.jsx";
import Spinner from "../../components/Spinner.jsx";
import AlbumCard from "../../components/cards/AlbumCard.jsx";

const BrowsePosts = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } = useGetPosts(4);
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
      {data?.pages[0].posts.length === 0 && <h1>No posts available.</h1>}
      <Spinner isLoading={isFetching} />

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
    </div>
  );
};

export default BrowsePosts;
