import crypto from "crypto";
import { createEvent, addInterestedUser } from "../mysqlQueries/addQueries.js";
import { getEvents, getUserEvents, getUserInterestedEvents, getEventStats } from "../mysqlQueries/readQueries.js";
import { unmarkInterestedEvent } from "../mysqlQueries/deleteQueries.js";
import { checkIfUserEvent, checkInterested } from "../mysqlQueries/readQueries.js";
import { deleteEvent } from "../mysqlQueries/deleteQueries.js";

/**
 * Inserts a new Event on the Database
 *
 * @author Giovanni Leo, Eugene Kyle Patano
 */
export const uploadEventController = async (req, res) => {
  try {
    const { role } = req;
    const { userId, mediaInfo } = req;

    if (role !== "Admin" && role !== "Manager") {
      throw new Error("Only admin and Manager can upload a event");
    }

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
 * @author Giovanni Leo, Eugene Kyle Patano
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
 * @author Giovanni Leo, Eugene Kyle Patano
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
 * @author Giovanni Leo, Eugene Kyle Patano
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
 * @route /api/events/stats/:id
 * @author Giovanni Leo, Eugene Kyle Patano
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
 * @route /api/events/interested/:id
 * @author Giovanni Leo, Eugene Kyle Patano
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
 * @route /api/events/uninterested/:id
 * @author Giovanni Leo, Eugene Kyle Patano
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

/**
 *
 * Check if user is interested on the event
 *
 *
 * @method GET
 * @route /api/events/user_interested/:id
 * @author Giovanni Leo, Eugene Kyle Patano
 */
export const checkEventInterestedController = async (req, res) => {
  try {
    const { id } = req.params;
    const { userid } = req.query;
    const result = await checkInterested(id, userid);
    res.json({ isInterested: result });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

/**
 *
 * Delete a event
 *
 *
 * @method DELTE
 * @route /api/events/:id
 * @author Giovanni Leo, Eugene Kyle Patano
 */
export const deleteEventController = async (req, res) => {
  try {
    const { role, userId } = req;
    const { id } = req.params;

    const { isOwner } = await checkIfUserEvent(userId, id);

    if (!isOwner) {
      throw new Error("You cannot delete others event");
    }

    if (role !== "Admin" && role !== "Manager") {
      throw new Error("Only admin and Manager can do this operation");
    }

    const result = deleteEvent(id, userId);
    if (!result) throw new Error("Failed to delete event");

    res.json({ message: "Event Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
