import React, { useState } from "react";

import FileUploader from "../components/FileUploader";
import Button from "../components/Button";
import { useAuthContext } from "../context/AuthContext";
import create_post from "../../assets/create_post.png";
import create_line from "../../assets/create_line.png";

const CreatePost = ({ maxCaption = 225 }) => {
  const [isPost, setIsPost] = useState(true);
  const [images, setImages] = useState([]);
  const { user } = useAuthContext();
  const [caption, setCaption] = useState("");

  const handleCaptionChange = (e) => {
    const { value } = e.target;

    if (value.length > maxCaption) return;

    setCaption(value);
  };

  console.log(images);

  return (
    <div className="flex flex-col gap-10 mt-5">
      <div className="flex gap-5 items-center">
        <button
          onClick={() => setIsPost(true)}
          className={`flex items-center justify-center gap-2 hover-opacity ${isPost ? "text-primary_blue underline font-bold" : "text-black"}`}
        >
          <img src={create_post} alt="post" />
          <p>Create Post</p>
        </button>
        <button
          onClick={() => setIsPost(false)}
          className={`flex items-center justify-center gap-2 hover-opacity ${!isPost ? "text-primary_blue underline font-bold" : "text-black"}`}
        >
          <img src={create_line} alt="line" />
          <p>Create aeline</p>
        </button>
      </div>

      <div className="flex items-center justify-between">
        <h1 className="font-bold text-lg">Create new {isPost ? "Post" : "aeline"} </h1>
        <Button text="Share" otherStyle="px-10" />
      </div>
      <div className="flex flex-col gap-20 md:flex-row w-full">
        {isPost && <FileUploader images={images} setImages={setImages} />}

        <div className="flex flex-col gap-5 w-full">
          <div className="flex items-center gap-2">
            <img className="w-10" src={user.profile_picture} alt="profile" />
            <p>{user.username}</p>
          </div>

          <div className="relative">
            <textarea
              autoFocus={true}
              value={caption}
              onChange={handleCaptionChange}
              className="p-2 text-light_text  text-sm focus:outline-none resize-none border-b-[1px] w-full h-36"
            ></textarea>
            <p className="absolute text-sm text-light_text bottom-3 right-3">
              {caption.length}/{maxCaption}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
