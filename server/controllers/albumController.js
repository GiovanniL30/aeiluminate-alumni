import crypto from "crypto";
import { getAlbumInformation, getPostsByAlbumId } from "../mysqlQueries/readQueries.js";
import { addNewMedia, addNewPost } from "../mysqlQueries/addQueries.js";
import { getAlbums } from "../mysqlQueries/readQueries.js";

/**
 *
 * Get list of post of an album
 *
 * @method GET
 * @route /api/album/:id
 */
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

/**
 *
 * Get album information
 *
 * @method GET
 * @route /api/album/information/:id
 */
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

/**
 *
 * Add a new post on the album
 *
 * @method POST
 * @route /api/album/add
 */
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

/**
 *
 * Get all albums
 *
 * @method GET
 * @route /api/album/all
 */
export const getAlbumsController = async (req, res, next) => {
  try {
    const { page, length } = req.query;

    const offset = (page - 1) * length;
    const { albums, total } = await getAlbums(parseInt(offset), parseInt(length));

    const updatedAlbums = albums.map((album) => ({
      albumId: album.albumId,
      albumTitle: album.albumTitle,
      albumIdOwner: album.albumIdOwner,
      latestPostID: album.latestPostID,
      latestPostCaption: album.latestPostCaption,
      latestPostCreatedAt: album.latestPostCreatedAt,
    }));

    const totalPage = Math.ceil(total / length);

    res.status(200).json({
      albums: updatedAlbums,
      totalAlbums: total,
      totalPage,
    });
  } catch (error) {
    console.error("Error in getting albums with latest posts:", error);
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};
