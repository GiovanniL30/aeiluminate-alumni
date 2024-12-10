import crypto from "crypto";
import { getAlbumInformation, getPostsByAlbumId } from "../mysqlQueries/readQueries.js";
import { addNewMedia, addNewPost } from "../mysqlQueries/addQueries.js";

export const getAlbumController = async (req, res) => {
  const albumId = req.params.id;

  try {
    const posts = await getPostsByAlbumId(albumId);
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts for album:", error);
    res.status(500).json({ message: "Failed to retrieve posts for album" });
  }
};

export const getAlbumInformationController = async (req, res) => {
  const albumId = req.params.id;

  try {
    const albumInfo = await getAlbumInformation(albumId);
    res.json(albumInfo);
  } catch (error) {
    console.error("Error fetching album information or posts:", error);
    res.status(500).json({ message: "Failed to retrieve album information or posts" });
  }
};

export const addNewPostOnAlbumController = async (req, res) => {
  try {
    const { userId, mediaInfo } = req;
    const { caption, albumId } = req.body;
    const postId = crypto.randomUUID();

    const postResult = await addNewPost(postId, userId, caption, new Date(), albumId);
    if (!postResult) throw new Error("Failed to add new post");

    for (const media of mediaInfo) {
      const newMedia = await addNewMedia(media.mediaID, media.mediaType, media.mediaURL, new Date(), postId);
      if (!newMedia) throw new Error("Failed to add new media");
    }

    return res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    console.error("Error in uploadPostController:", error);
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};
