import React, { useState } from "react";

const PostCardCarousel = ({ posts, setPosts, currentIndex, setCurrentIndex }) => {
  const nextPost = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length);
  };

  const prevPost = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + posts.length) % posts.length);
  };

  const goToPost = (index) => {
    setCurrentIndex(index);
  };

  const removeImage = () => {
    const updatedPosts = posts.filter((_, index) => index !== currentIndex);
    setPosts(updatedPosts);

    if (updatedPosts.length === 0) {
      setCurrentIndex(0);
    } else if (currentIndex === updatedPosts.length) {
      setCurrentIndex(updatedPosts.length - 1);
    }
  };

  return (
    <div className="relative w-full h-full  max-w-3xl mx-auto overflow-hidden">
      <button
        className="flex items-center justify-center w-6 h-6 absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-lg bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 focus:outline-none z-10"
        onClick={prevPost}
      >
        &#10094;
      </button>
      <div className="relative w-full h-full">
        <div className="w-full h-full flex justify-center items-center">
          <img className="max-w-full max-h-full" src={posts[currentIndex]} alt={`Post ${currentIndex}`} />
        </div>

        <button
          className="absolute top-2 right-2 text-white text-sm bg-red-900 bg-opacity-50 w-5 h-5 rounded-full hover:bg-opacity-75 focus:outline-none z-10"
          onClick={removeImage}
        >
          &#10005;
        </button>
      </div>

      <button
        className="flex items-center justify-center w-6 h-6 absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-lg bg-black bg-opacity-50  rounded-full hover:bg-opacity-75 focus:outline-none z-10"
        onClick={nextPost}
      >
        &#10095;
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {posts.map((_, index) => (
          <span
            key={index}
            className={`border-[1px] w-2 h-2 rounded-full cursor-pointer ${index === currentIndex ? "bg-primary_blue" : "bg-white bg-opacity-50"}`}
            onClick={() => goToPost(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default PostCardCarousel;
