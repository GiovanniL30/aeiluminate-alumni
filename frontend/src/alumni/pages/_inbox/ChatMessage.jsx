import React, { useState, useRef, useEffect } from "react";
import Message from "../../components/_inbox/Message";
import Button from "../../components/Button";
import { NavLink, useParams } from "react-router-dom";
import { useAddMessage, useConversationMessages, useGetUser } from "../../_api/@react-client-query/query";
import { useAuthContext } from "../../context/AuthContext";
import { timeAgo } from "../../../utils";
import io from "socket.io-client";

import default_img from "../../../assets/default-img.png";

const ChatMessage = () => {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);
  const addMessageQuery = useAddMessage();
  const [isOnline, setIsOnline] = useState(false);
  const { receiverId } = useParams();
  const { user } = useAuthContext();

  const convesationQuery = useConversationMessages(receiverId);
  const receiverUser = useGetUser(receiverId);
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io(import.meta.env.VITE_API_BASE_URL);

    socket.current.emit("register", user.userID);

    socket.current.on("receiveMessage", (newMessage) => {
      convesationQuery.refetch();
    });

    socket.current.on("onlineUsers", (users) => {
      setIsOnline(users.includes(receiverId));
    });

    return () => {
      if (socket.current) {
        socket.current.emit("unregister", user.userID);
        socket.current.disconnect();
      }
    };
  }, [user]);

  useEffect(() => {
    if (convesationQuery.isFetched && !convesationQuery.isError) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [convesationQuery.data?.messages]);

  const handleSubmit = () => {
    addMessageQuery.mutate(
      { receiverId, conversationID: convesationQuery.data.conversationId, content: message },
      {
        onSuccess: () => {
          setMessage("");
          socket.current.emit("sendMessage", {
            receiverId,
            conversationID: convesationQuery.data.conversationId,
            content: message,
          });
        },
      }
    );
  };

  if (convesationQuery.isLoading || receiverUser.isLoading) return <h1>Loading Conversation....</h1>;

  return (
    <div className="border-[2px] rounded-md w-full p-4 h-full flex flex-col justify-between">
      <div className="flex items-center gap-3 bg-white z-40 pb-2">
        <img
          className={`w-12 h-12 md:w-14 md:h-14 rounded-full object-cover ${isOnline && "border-[4px] border-green-500"}`}
          src={receiverUser.data.user.profile_picture ? receiverUser.data.user.profile_picture : default_img}
          alt=""
        />
        <p className="text-lg md:text-xl mb-2">{receiverUser.data.user.username}</p>
      </div>

      <div>
        <div className="max-h-[600px] overflow-y-auto p-4">
          <div className="flex flex-col items-center mt-[100px]">
            <img
              className={`w-20  h-20 md:w-32 md:h-32 rounded-full object-cover`}
              src={receiverUser.data.user.profile_picture ? receiverUser.data.user.profile_picture : default_img}
              alt=""
            />
            <p className="text-xl md:text-2xl">{receiverUser.data.user.username}</p>
            <p className="text-light_text">
              {receiverUser.data.user.firstName} {receiverUser.data.user.lastName}
            </p>
            <NavLink to={`/user/${receiverId}`}>
              <Button text="View Profile" />
            </NavLink>
          </div>

          <div className="flex flex-col pt-[100px] gap-2">
            {convesationQuery.data.messages.map((message, index) => {
              const fromMe = message.senderID === user.userID;

              return (
                <Message
                  key={index}
                  fromMe={fromMe}
                  content={message.content}
                  date={timeAgo(message.messageTimestamp)}
                  image={user.userID === receiverId ? message.receiverProfilePicture : message.senderProfilePicture}
                />
              );
            })}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row gap-2 pt-5">
        <textarea
          value={message}
          onChange={(e) => {
            const value = e.target.value;

            if (value.trim() !== "") {
              setMessage(value);
            } else {
              setMessage("");
            }
          }}
          disabled={addMessageQuery.isPending}
          placeholder={addMessageQuery.isPending ? "Sending Message" : "Message"}
          className="resize-none w-full border-[1px] border-slate-50 text-light_text rounded-sm focus:outline-primary_blue p-2 h-12"
        />
        <Button
          disabled={message.length === 0 || addMessageQuery.isPending}
          text={addMessageQuery.isPending ? "Sending Message..." : "Send"}
          otherStyle="w-full md:w-[20%] md:max-[200px]"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ChatMessage;
