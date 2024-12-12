import React, { useEffect, useRef, useState } from "react";
import { useGetUsers } from "../_api/@react-client-query/query";
import UserCard from "../components/cards/UserCard";
import PostCardLoading from "../components/cards/loaders/PostCardLoading";
import { useAuthContext } from "../context/AuthContext";
import search from "../../assets/search.svg";
import Button from "../components/Button";

const BrowseUsers = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } = useGetUsers(20);
  const observerRef = useRef(null);
  const { user: me } = useAuthContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setIsSearching(false);
    }, 1000);

    setIsSearching(true);
    return () => clearTimeout(handler);
  }, [searchQuery]);

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

  const filteredUsers = data?.pages.flatMap((page) =>
    page.users.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName} ${user.username}`.toLowerCase();
      return (
        fullName.includes(debouncedSearch.toLowerCase()) ||
        user.email.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        user.username.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        user.role.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    })
  );

  return (
    <div className="flex flex-col w-full">
      <div className="p-2">
        <div className="relative flex gap-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 pl-10 border-[1px] w-full max-w-[700px] focus:outline-primary_blue rounded-md"
            placeholder="Search users..."
          />
          <img className="w-7 h-8 absolute top-[7px] -translate-x-1/2 left-5" src={search} alt="search" />
        </div>
        {isSearching && <p className="mt-2 text-gray-500">Searching...</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-center gap-4 mx-auto p-2 h-fit w-full">
        {filteredUsers?.length === 0 && <h1>No users found.</h1>}

        {filteredUsers?.map((user, index) => {
          if (me.userID !== user.userID) {
            return <UserCard key={index} userID={user.userID} />;
          }
          return null;
        })}

        <div ref={observerRef} className="observer-trigger" style={{ visibility: hasNextPage ? "visible" : "hidden" }}>
          {isFetchingNextPage && <PostCardLoading />}
        </div>
      </div>
    </div>
  );
};

export default BrowseUsers;
