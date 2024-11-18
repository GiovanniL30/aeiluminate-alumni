import React, { useState } from "react";

import FileUploader from "../components/FileUploader";
import Button from "../components/Button";
import { useAuthContext } from "../context/AuthContext";

const CreatePost = ({ post = true, maxCaption = 225 }) => {
  const [images, setImages] = useState([]);
  const { user } = useAuthContext();
  const [caption, setCaption] = useState("");

  const handleCaptionChange = (e) => {
    const { value } = e.target;

    if (value.length > maxCaption) return;

    setCaption(value);
  };

  return (
    <div className="flex flex-col gap-10 mt-5">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-lg">Create new {post ? "Post" : "aeline"} </h1>
        <Button text="Share" otherStyle="px-10" />
      </div>
      <div className="flex flex-col gap-20 md:flex-row w-full">
        {post && <FileUploader images={images} setImages={setImages} />}

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
