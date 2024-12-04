import { checkIfConversationAvailable, getAllUserConversations, getConversationMessages } from "../mysqlQueries/readQueries.js";
import { addNewMessage, createConverstaion } from "../mysqlQueries/addQueries.js";

import crypto from "crypto";

export const getMessagesController = async (req, res) => {
  const { userId } = req;
  const { receiverId } = req.query;

  try {
    const conversation = await checkIfConversationAvailable(userId, receiverId);

    //If there is no conversation yet, create a new one
    if (!conversation) {
      const convoId = crypto.randomUUID();
      const newConversation = await createConverstaion(convoId, userId, receiverId);
      if (!newConversation) throw new Error("Failed to create new conversation");
      return res.status(200).json({ messages: [], conversationID: convoId });
    }

    const conversationMessages = await getConversationMessages(conversation.conversationID);
    if (!conversationMessages) throw new Error("Failed to get conversation messages");

    return res.status(200).json({ messages: conversationMessages, conversationId: conversation.conversationID });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export const conversationListController = async (req, res) => {
  const { userId } = req;

  try {
    const conversations = await getAllUserConversations(userId);
    if (!conversations) throw new Error("Failed to get Conversation lists");

    return res.status(200).json({ conversations });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

export const addNewMessageController = async (req, res) => {
  const { userId: senderID } = req;
  const { receiverId, conversationID, content } = req.body;

  try {
    const newMessage = await addNewMessage(crypto.randomUUID(), conversationID, senderID, receiverId, content);

    if (!newMessage) throw new Error("Failed to send message");
    return res.status(200).json({ message: "Sent" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
