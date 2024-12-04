import React from "react";

import private_img from "../../../assets/private.png";

const Private = () => {
  return (
    <div className="flex flex-col justify-center mt-10 gap-2">
      <img className="w-28 sm:w-auto mx-auto" src={private_img} alt="" />
      <p className="text-light_text text-center">This account is private. Follow to see their posts.</p>
    </div>
  );
};

export default Private;
