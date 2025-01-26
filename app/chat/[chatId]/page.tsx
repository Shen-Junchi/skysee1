import ChatComponent from "@/component/Chatcomponent";
import ChatSideBar from "@/component/ChatSideBar";
import PDFViewer from "@/component/PDFViewer";
//import { chat } from "@/lib/db/schema";
//import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import {getChatsByUserId} from '@/lib/db/quries';

type Props = {
  params: Promise<{
    chatId: string;
  }>;
};

const ChatPage = async (props: Props) => {
  const params = await props.params;

  const {
    chatId
  } = params;

  const { userId }: { userId: string | null } = await auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  const _chats = await getChatsByUserId({id:userId});

  if (!_chats) {
    return redirect("/");
  }
  if (!_chats.find((chat) => chat.id === chatId)) {
    return redirect("/");
  }

  const currentChat = _chats.find((chat) => chat.id === chatId);
  //const isPro = await checkSubscription();

  return (
      <div className="flex h-screen overflow-hidden"> {/* 添加 h-screen 和 overflow-hidden */}
        <div className="flex w-full h-screen"> {/* 添加 h-screen */}
          {/* chat sidebar */}
          <div className="flex-[1] max-w-xs">
            <ChatSideBar userId = {userId}/>
          </div>
          <div className="h-screen p-4 overflow-auto flex-[5]"> {/* 修改为 overflow-auto */}
            <PDFViewer pdf_url={currentChat?.pdfUrl || ""}/>
          </div>
          {/* chat component */}
          <div className="flex-[3] border-l-4 border-l-slate-200">
            <ChatComponent chatId={chatId}/>
          </div>
        </div>
      </div>

  );
};

export default ChatPage;