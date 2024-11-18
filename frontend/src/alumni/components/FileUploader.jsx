import React, { useState } from "react";
import PostCardCarousel from "./PostCardCarousel";
import no_post from "../../assets/no_post.png";

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

  return (
    <div className="border-[1px] h-[600px] w-full flex flex-col items-center justify-center p-4">
      {images && images.length > 0 ? (
        <PostCardCarousel posts={images} setPosts={setImages} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
      ) : (
        <div className="flex flex-col gap-5 items-center justify-center">
          <img src={no_post} alt="image" />
          <div className="flex flex-col items-center text-sm text-light_text">
            <p>No images selected</p>
            <p>
              <span className="font-bold">Limit: </span> 5mb
            </p>
          </div>
        </div>
      )}

      <label htmlFor="file-upload" className="text-sm hover-opacity cursor-pointer bg-primary_blue text-white  py-2 px-10 rounded-md mt-4">
        Select from computer
      </label>
      <input id="file-upload" type="file" accept=".jpg, .jpeg, .png" className="hidden" onChange={handleFileChange} />
    </div>
  );
};

export default FileUploader;
