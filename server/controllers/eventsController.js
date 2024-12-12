import { ID, InputFile } from "node-appwrite";
import crypto from "crypto";
import { storage } from "../appwriteconfig.js";
import { createEvent, addInterestedUser } from "../mysqlQueries/addQueries.js";
import { getEvents, getUserEvents, getUserInterestedEvents, getEventStats } from "../mysqlQueries/readQueries.js";
import { unlikePost, unmarkInterestedEvent } from "../mysqlQueries/deleteQueries.js";

/**
 * Inserts a new Event on the Database
 */
export const uploadEventController = async (req, res) => {
  try {
    const { userId, mediaInfo } = req;

    const { title, desc, eventDateTime, location, eventType } = req.body;
    const eventID = crypto.randomUUID();

    const image = mediaInfo[0].mediaURL || null;

    const eventResult = await createEvent(eventID, title, desc, new Date(eventDateTime), location, eventType, new Date(), userId, image);
    if (!eventResult) throw new Error("Failed to add new event");

    await addInterestedUser(eventID, userId);

    return res.status(201).json({ message: "Event created successfully" });
  } catch (error) {
    console.error("Error in uploadEventController:", error);
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

/**
 *
 * Get list of Events on the Database
 *
 * paginated list of events
 *
 * @method GET
 * @route /api/events
 */
export const getEventsController = async (req, res, next) => {
  try {
    const { userId } = req;
    const { page, length } = req.query;

    const { events, total } = await getEvents(page, length, userId);

    const totalPage = Math.ceil(total / length);

    res.status(200).json({
      events: events,
      totalEvents: total,
      totalPage,
    });
  } catch (error) {
    console.error("Error in getting events:", error);
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

/**
 *
 * Get list of Events of a user on the Database
 *
 *
 * @method GET
 * @route /api/events/:id
 */
export const getUserEventsController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const events = await getUserEvents(id);

    res.status(200).json({ events: events });
  } catch (error) {
    console.error("Error in getting user events:", error);
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

/**
 *
 * Get list of Interested Events of a user on the Database
 *
 *
 * @method GET
 * @route /api/events/interested_events/:id
 */
export const getUserInterestedEventsController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const events = await getUserInterestedEvents(id);

    res.status(200).json({ events: events });
  } catch (error) {
    console.error("Error in getting user interested events:", error);
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

/**
 *
 * Get Interested Users Count of an event
 *
 *
 * @method GET
 * @route /api/event/stats/:id
 */
export const getInterestedUsersCountController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req;

    const stats = await getEventStats(id, userId);

    if (!stats) return res.status(404).json({ message: "Event stats not found" });

    res.status(200).json(stats);
  } catch (error) {
    console.error("Error in getting interested user count:", error);
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

/**
 *
 * Mark an Event as interested
 *
 *
 * @method POST
 * @route /api/event/interested/:id
 */
export const markInterestedController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req;

    const result = await addInterestedUser(id, userId);

    if (!result) throw new Error("Failed to mark the event as interested");

    res.status(200).json(result);
  } catch (error) {
    console.error("Error in marking the event as interested:", error);
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

/**
 *
 * Unmark an Event as Interested
 *
 *
 * @method GET
 * @route /api/event/uninterested/:id
 */
export const unmarkInterestedController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req;

    console.log({ id, userId });

    const result = await unmarkInterestedEvent(id, userId);

    if (!result) throw new Error("Failed to unmark as Interested");

    res.status(200).json(result);
  } catch (error) {
    console.error("Error in unmarking the event as interested:", error);
    return res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};
