import React, { useState } from "react";
import PostCardCarousel from "./PostCardCarousel.jsx";
import no_post from "../../../assets/no_post.png";

const FileUploader = ({ images, setImages, uploading = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const filePreview = URL.createObjectURL(file);

    if (file.size > 5 * 1024 * 1024) {
      alert(`${file.name} exceeds the 5MB size limit and was not added.`);
      return;
    }

    setImages((prev) => [...prev, { file, filePreview }]);
    setCurrentIndex(images.length);
  };

  return (
    <div className="border-[1px] h-[600px] w-full flex flex-col items-center justify-center p-4">
      {images && images.length > 0 ? (
        <PostCardCarousel
          posts={images}
          setPosts={(updatedPosts) => {
            setImages(updatedPosts);
          }}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      ) : (
        <div className="flex flex-col gap-5 items-center justify-center">
          <img className="w-20 h-20 md:w-auto md:h-auto" src={no_post} alt="No Post" />
          <div className="flex flex-col items-center text-sm text-light_text">
            <p>No images selected</p>
            <p>
              <span className="font-bold">Limit: </span> 5MB
            </p>
          </div>
        </div>
      )}

      <label
        htmlFor="file-upload"
        className={`text-sm hover-opacity cursor-pointer bg-primary_blue text-white py-2 px-10 rounded-md mt-4 ${
          uploading && "pointer-events-none opacity-50"
        }`}
      >
        Select from computer
      </label>
      <input disabled={uploading} id="file-upload" type="file" accept=".jpg, .jpeg, .png" className="hidden" onChange={handleFileChange} />
    </div>
  );
};

export default FileUploader;
