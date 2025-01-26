"use client";
import React from "react";
import { useChat } from "ai/react";
import MessageList from "./MessageList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Message } from "ai";
import { MultimodalInput } from './multimodal-input';
import useSWR, { useSWRConfig } from 'swr';

type Props = { chatId: string };

const ChatComponent = ({ chatId }: Props) => {
  const { mutate } = useSWRConfig();
/*
  const { data, isLoading } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const response = await axios.post<Message[]>("/api/get-messages", {
        chatId,
      });
      return response.data;
    },
  });*/

  const {
    messages,
    setMessages,
    handleSubmit,
    input,
    setInput,
    append,
    stop,
    isLoading
  } = useChat({
    body: {chatId},
    initialMessages: [],
    experimental_throttle: 100,
    onFinish: () => {
      mutate('/api/history');
    },
  });

  React.useEffect(() => {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);
  
  return (
    <div
      className="relative max-h-screen overflow-scroll"
      id="message-container"
    >
      {/* header */}
      <div className="sticky top-0 inset-x-0 p-2 bg-gray h-fit">
        <h3 className="text-xl font-bold">聊天模式</h3>
      </div>
      {/*<summuraymessage context = {}>*/}
      {/* <MessageList messages={messages} isLoading={isLoading} /> */}
     
      <form className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">       
            <MultimodalInput
              chatId={chatId}
              input={input}
              setInput={setInput}
              handleSubmit={handleSubmit}
              stop={stop}
              messages={messages}
              setMessages={setMessages}
              isLoading = {isLoading}
            />
        </form>
    </div> 
  );
};

export default ChatComponent;