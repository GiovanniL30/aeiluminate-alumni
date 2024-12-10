import React, { useState } from "react";
import { useAddImageAlbum, useAlbumInformation } from "../_api/@react-client-query/query";
import { NavLink, useNavigate, useParams } from "react-router-dom";

import { useAuthContext } from "../context/AuthContext";
import Button from "../components/Button";
import no_post from "../../assets/no_post.png";
import back from "../../assets/back-arrow.png";
import ToastNotification from "../constants/toastNotification";

const AlbumContribute = () => {
  const { user } = useAuthContext();
  const { albumId } = useParams();
  const [images, setImages] = useState([]);
  const albumInfo = useAlbumInformation(albumId);
  const addImage = useAddImageAlbum();
  const maxImage = 4;
  const navigate = useNavigate();

  if (albumInfo.isLoading) return <h1>Loading...</h1>;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      ToastNotification.error(`${file.name} exceeds the 5MB size limit and was not added.`);
      return;
    }

    setImages((prev) => [...prev, file]);
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    addImage.mutate(
      { albumTitle: albumInfo.data.albumTitle, images, albumId },
      {
        onSuccess: () => {
          setImages([]);
          navigate(`/album/${albumId}`);
          ToastNotification.success("Added Images");
        },
      }
    );
  };

  return (
    <div className="p-2 flex flex-col gap-10 w-full">
      <div className="flex justify-center flex-col items-center gap-2">
        <h1 className="text-3xl font-bold">
          {albumInfo.data.userId === user.userID ? "Your album" : `${albumInfo.data.firstName} ${albumInfo.data.lastName}`}
        </h1>
        <h1 className="text-xl font-bold text-light_text">{albumInfo.data.albumTitle}</h1>
      </div>

      <NavLink to={`/album/${albumId}`}>
        <div className="flex items-cnter gap-2 hover-opacity">
          <img className="w-5" src={back} alt="" />
          <p>Return</p>
        </div>
      </NavLink>

      <div className="flex justify-between w-full">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-semibold ">Album Contribute</h1>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleUpload}
            text={addImage.isPending ? "Adding Images" : "Contribute"}
            disabled={images.length == 0 || addImage.isPending}
          />
        </div>
      </div>

      <label
        htmlFor="file-upload"
        className={`w-fit hover-opacity text-sm cursor-pointer bg-blue-500 text-white py-2 px-10 rounded-md mt-4 ${
          maxImage === images.length || addImage.isPending ? "pointer-events-none opacity-50" : ""
        }`}
      >
        <span className="inline-block mr-2">Add Picture</span>
      </label>

      <input
        disabled={maxImage === images.length || addImage.isPending}
        id="file-upload"
        type="file"
        accept=".jpg, .jpeg, .png"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img src={URL.createObjectURL(image)} alt="Image preview" className="w-full h-[300px] object-cover rounded-md border-[1px]" />

            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="hover-opacity absolute -top-2 -right-2 text-white bg-red-700 rounded-full w-6 h-6 text-sm"
            >
              &#10005;
            </button>
          </div>
        ))}
      </div>

      {images.length == 0 && (
        <div className="flex flex-col gap-5 items-center justify-center border-[1px] p-10 rounded-md">
          <img src={no_post} alt="No Post" />
          <div className="flex flex-col items-center text-sm text-light_text">
            <p>No images selected</p>
            <p>
              <span className="font-bold">Limit: </span> 5MB
            </p>
          </div>
        </div>
      )}
      {images.length === maxImage && <p className="text-red-600 text-sm mt-2">You can only upload a maximum of {maxImage} photos.</p>}
    </div>
  );
};

export default AlbumContribute;
