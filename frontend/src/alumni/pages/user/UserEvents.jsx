import React from "react";

const UserEvents = () => {
  // return <div className="max-w-[1200px] mx-auto mt-20">UserEvents</div>;
  return (
    <div className="max-w-[1200px] mx-auto mt-20">
      {lines.length == 0 ? (
        <div className="flex flex-col w-full justify-center items-center gap-5">
          <h1 className="font-bold">No post available!</h1>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center max-w-[550px] mx-auto gap-2">
          {lines.map((post, index) => (
            <AelineCard key={index} postID={post.postID} caption={post.caption} userID={id} createdAt={post.createdAt} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserEvents;
