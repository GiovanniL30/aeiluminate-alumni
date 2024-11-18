import React, { useState } from "react";
import PostCardCarousel from "./PostCardCarousel";

const FileUploader = ({ images, setImages }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileUrls = Array.from(files).map((file) => URL.createObjectURL(file));

      setImages((prev) => [...prev, ...fileUrls]);
      setCurrentIndex(images.length);
    }
  };

  console.log(images);

  return (
    <div className="border-[1px] h-[600px] w-full flex flex-col items-center justify-center p-4">
      {images && images.length > 0 ? (
        <PostCardCarousel posts={images} setPosts={setImages} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
      ) : (
        <p className="text-gray-500">No images selected</p>
      )}

      <label htmlFor="file-upload" className="cursor-pointer text-blue-500 mt-4">
        Choose File
      </label>
      <input id="file-upload" type="file" accept=".jpg, .jpeg, .png" className="hidden" onChange={handleFileChange} />
    </div>
  );
};

export default FileUploader;
