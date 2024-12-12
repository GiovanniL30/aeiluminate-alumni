import React, { useEffect, useRef } from "react";
import { useGetAlbums } from "../../_api/@react-client-query/query";
import AlbumCard from "../../components/cards/AlbumCard";
import PostCardLoading from "../../components/cards/loaders/PostCardLoading";
import Spinner from "../../components/Spinner.jsx";

const BrowseAlbums = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } = useGetAlbums(4);
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
      <Spinner isLoading={isFetching} />
      {data?.pages[0].albums.length === 0 && <h1>No albums available.</h1>}

      {data?.pages?.map((page, pageIndex) =>
        page.albums?.map((album, albumIndex) => (
          <AlbumCard key={`${pageIndex}-${albumIndex}`} albumId={album.albumId} albumTitle={album.albumTitle} />
        ))
      )}

      <div ref={observerRef} className="observer-trigger" style={{ visibility: hasNextPage ? "visible" : "hidden" }}>
        {isFetchingNextPage && <PostCardLoading />}
      </div>
    </div>
  );
};

export default BrowseAlbums;
