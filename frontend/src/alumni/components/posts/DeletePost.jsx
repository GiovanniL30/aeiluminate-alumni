import React from "react"

const DeletePost = ({setIsDelete}) => {

    return (
        <div>
            <h1 className="text-red">Delete Post</h1>
            <button onClick={() => setIsDelete(false)}>Cancel</button>
        </div>
    );
};

export default DeletePost;