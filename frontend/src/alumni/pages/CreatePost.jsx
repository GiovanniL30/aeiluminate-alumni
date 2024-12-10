import React, { useState } from "react";

import FileUploader from "../components/createPost/FileUploader.jsx";
import Button from "../components/Button";
import { useAuthContext } from "../context/AuthContext";
import create_post from "../../assets/create_post.png";
import create_line from "../../assets/create_line.png";
import create_album from "../../assets/create_album.png";
import create_event from "../../assets/create_event.png";
import create_joblisting from "../../assets/joblisting.png";
import { useNewAlbum, useUploadLine, useUploadPost } from "../_api/@react-client-query/query";
import TopPopUp from "../components/TopPopUp";

import default_img from "../../assets/default-img.png";
import { useNavigate } from "react-router-dom";
import Joblisting from "../components/createPost/Joblisting.jsx";
import EventInformation from "../components/createPost/EventInformation.jsx";
import ToastNotification from "../constants/toastNotification.js";

const CreatePost = ({ maxCaption = 225 }) => {
  const uploadQuery = useUploadPost();
  const uploadLine = useUploadLine();
  const createAlbum = useNewAlbum();

  const navigate = useNavigate();

  const [postType, setPostType] = useState({
    isPost: true,
    isLine: false,
    isEvent: false,
    isJob: false,
    isAlbum: false,
  });

  const [images, setImages] = useState([]);
  const { user } = useAuthContext();
  const [caption, setCaption] = useState("");

  const [eventInformation, setEventInformation] = useState({
    title: "",
    eventDateTime: "",
    location: "",
  });

  const handleCaptionChange = (e) => {
    const { value } = e.target;

    if (value.length > maxCaption) return;

    setCaption(value);
  };

  const handleSubmit = () => {
    const submitActions = {
      isPost: () => {
        if (images.length === 0) {
          ToastNotification.warning("Please upload at least one image.");
          return;
        }
        uploadQuery.mutate(
          { caption, images },
          {
            onSuccess: () => {
              setImages([]);
              setCaption("");
              ToastNotification.success("Post Uploaded successfully");
              navigate("/home");
            },
          }
        );
      },
      isLine: () => {
        if (caption.length === 0) {
          ToastNotification.warning("Please add content atleast 20 characters long");
          return;
        }

        uploadLine.mutate(
          { caption },
          {
            onSuccess: () => {
              setCaption("");
              ToastNotification.success("Line Uploaded successfully");
              navigate("/home");
            },
          }
        );
      },
      isEvent: () => {
        alert("posting event");
      },
      isJob: () => {
        if (!caption) {
          alert("Joblisting title cannot be empty.");
          return;
        }
      },
      isAlbum: () => {
        if (images.length === 0) {
          ToastNotification.warning("Please upload at least one image for the album.");
          return;
        }

        createAlbum.mutate(
          { albumTitle: caption, images },
          {
            onSuccess: () => {
              setImages([]);
              setCaption("");
              ToastNotification.success("Album Uploaded successfully");
              navigate("/home");
            },
          }
        );
      },
    };

    const selectedPostType = Object.keys(submitActions).find((key) => postType[key]);

    if (selectedPostType) {
      submitActions[selectedPostType]();
    } else {
      ToastNotification.error("Invalid Post Type");
    }
  };

  const switchPostType = (type) => {
    setPostType({
      isPost: type === "post",
      isLine: type === "line",
      isEvent: type === "event",
      isJob: type === "job",
      isAlbum: type === "album",
    });

    setCaption("");
    setImages([]);
  };

  return (
    <div className={`px-3 w-full flex flex-col gap-10 mt-5 max-container ${uploadQuery.isPending && "pointer-events-none"}`}>
      {uploadQuery.isError && <TopPopUp text={uploadQuery.error.message} />}

      <div className="flex items-center justify-between">
        <h1 className="font-bold text-2xl">
          {postType.isPost
            ? " Post"
            : postType.isLine
            ? " Aeline"
            : postType.isEvent
            ? " Event"
            : postType.isJob
            ? " Joblisting"
            : postType.isAlbum
            ? " Album"
            : " Unknown"}
        </h1>

        <Button
          text={uploadQuery.isPending || uploadLine.isPending || createAlbum.isPending ? "Uploading..." : "Share"}
          otherStyle="px-10"
          disabled={uploadQuery.isPending || uploadLine.isPending || createAlbum.isPending}
          onClick={handleSubmit}
        />
      </div>

      <div className="flex flex-col items-start gap-5 md:items-center text-md md:text-xl md:flex-row">
        <button
          onClick={() => switchPostType("post")}
          className={`flex items-center justify-center gap-2 hover-opacity ${
            postType.isPost ? "text-primary_blue underline font-bold" : "text-black"
          }`}
        >
          <img src={create_post} alt="post" />
          <p>Create Post</p>
        </button>
        <button
          onClick={() => switchPostType("line")}
          className={`flex items-center justify-center gap-2 hover-opacity ${
            postType.isLine ? "text-primary_blue underline font-bold" : "text-black"
          }`}
        >
          <img src={create_line} alt="line" />
          <p>Create aeline</p>
        </button>

        <button
          onClick={() => switchPostType("album")}
          className={`flex items-center justify-center gap-2 hover-opacity ${
            postType.isAlbum ? "text-primary_blue underline font-bold" : "text-black"
          }`}
        >
          <img src={create_album} alt="Album" />
          <p>Create album</p>
        </button>

        {user.role === "Admin" || user.role === "Manager" ? (
          <>
            <button
              onClick={() => switchPostType("job")}
              className={`flex items-center justify-center gap-2 hover-opacity ${
                postType.isJob ? "text-primary_blue underline font-bold" : "text-black"
              }`}
            >
              <img src={create_joblisting} alt="post" />
              <p>Create Joblisting</p>
            </button>
            <button
              onClick={() => switchPostType("event")}
              className={`flex items-center justify-center gap-2 hover-opacity ${
                postType.isEvent ? "text-primary_blue underline font-bold" : "text-black"
              }`}
            >
              <img src={create_event} alt="line" />
              <p>Create Event</p>
            </button>
          </>
        ) : null}
      </div>

      <h1 className="text-xl  mt-5">
        You are creating a new{" "}
        {postType.isPost
          ? "Post"
          : postType.isLine
          ? "Aeline"
          : postType.isEvent
          ? "Event"
          : postType.isJob
          ? "Joblisting"
          : postType.isAlbum
          ? "Album"
          : "Unknown"}
      </h1>
      <div className="flex flex-col gap-20 md:flex-row w-full">
        {(postType.isPost || postType.isEvent || postType.isAlbum || postType.isJob) && (
          <FileUploader
            maxImage={postType.isEvent ? 1 : 10}
            uploading={uploadQuery.isPending || uploadLine.isPending || createAlbum.isPending}
            images={images}
            setImages={setImages}
          />
        )}

        <div className="flex flex-col gap-5 w-full">
          <div className="flex items-center gap-2">
            <img className="w-12 h-12 rounded-full object-cover" src={user.profile_picture ? user.profile_picture : default_img} alt="profile" />
            <p>{user.username}</p>
          </div>

          <div className="relative">
            <h1 className="">
              {postType.isPost
                ? "Post caption"
                : postType.isLine
                ? "Aeline content"
                : postType.isEvent
                ? "Event title"
                : postType.isJob
                ? "Joblisting title"
                : postType.isAlbum
                ? " Album title"
                : " Unknown"}
            </h1>
            <textarea
              disabled={uploadQuery.isPending || uploadLine.isPending || createAlbum.isPending}
              autoFocus={true}
              value={caption}
              onChange={handleCaptionChange}
              className="p-2 text-light_text text-sm focus:outline-none resize-none border-b-[1px] w-full h-36"
            ></textarea>
            <p className="absolute text-sm text-light_text bottom-3 right-3">
              {caption.length}/{maxCaption}
            </p>
          </div>

          <>
            {postType.isEvent && <EventInformation />}
            {postType.isJob && <Joblisting />}
          </>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
