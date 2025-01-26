'use client';
import React from 'react';
import type {Chat} from '@/lib/db/schema'
import useSWR from 'swr';
import { memo, useEffect, useState } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar';
import type { User } from 'next-auth';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "./ui/downdrop"

import { fetches } from '@/lib/utils';
import Link from "next/link";
import {
  MoreHorizontalIcon,
  TrashIcon
} from './icons';

const PureChatItem = ({
    chat,
    isActive,
    onDelete,
  }: {
    chat: Chat;
    isActive: boolean;
    onDelete: (chatId: string) => void;
  }) => {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={isActive}>
          <Link href={`/chat/${chat.id}`} >
            <span>{chat.pdfName}</span>
          </Link>
        </SidebarMenuButton>
  
        <DropdownMenu modal={true}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuAction
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground mr-0.5"
              showOnHover={!isActive}
            >
              <MoreHorizontalIcon />

            </SidebarMenuAction>
          </DropdownMenuTrigger>

          <DropdownMenuContent side="bottom" align="end">
            <DropdownMenuItem
              className="cursor-pointer text-destructive focus:bg-destructive/15 focus:text-destructive dark:text-red-500"
              onSelect={() => onDelete(chat.id)}
            >
              <TrashIcon />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    );
  };
  
  export const ChatItem = memo(PureChatItem, (prevProps, nextProps) => {
    if (prevProps.isActive !== nextProps.isActive) return false;
    return true;
    });

  export function SidebarHistory({ userId }: { userId: string | null }) {
    const { id } = useParams();
    const pathname = usePathname();
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    type history= {
      id: string;
      pdfName: string;
      pdfUrl: string;
      createdAt: Date;
      userId: string;
      fileKey: string;
  }[] | undefined
    const {
      data: history,
      isLoading,
      mutate,
    } = useSWR<Array<Chat>>(userId ? '/api/history' : null, fetches, {
      fallbackData: [],
    });

    const router = useRouter();
    useEffect(() => {
      mutate();
    }, [pathname, mutate]);

    const deletchat = async() => {

    }

    if (!userId) {
      return (
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="px-2 text-zinc-500 w-full flex flex-row justify-center items-center text-sm gap-2">
              Login to save and revisit previous chats!
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      );
    }

    if (isLoading) {
      return (
        <SidebarGroup>
          <div className="px-2 py-1 text-xs text-sidebar-foreground/50">
            Today
          </div>
          <SidebarGroupContent>
            <div className="flex flex-col">
              {[44, 32, 28, 64, 52].map((item) => (
                <div
                  key={item}
                  className="rounded-md h-8 flex gap-2 px-2 items-center"
                >
                  <div
                    className="h-4 rounded-md flex-1 max-w-[--skeleton-width] bg-sidebar-accent-foreground/10"
                    style={
                      {
                        '--skeleton-width': `${item}%`,
                      } as React.CSSProperties
                    }
                  />
                </div>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      );
    }

    if (history?.length === 0) {
      return (
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="px-2 text-zinc-500 w-full flex flex-row justify-center items-center text-sm gap-2">
              Your conversations will appear here once you start chatting!
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      );
    }

    return (
      <>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {history?.map((chat) => (
                  <ChatItem
                    key={chat.id}
                    chat={chat}
                    isActive={chat.id === id}
                    onDelete={(chatId) => {
                        setDeleteId(chatId);
                        setShowDeleteDialog(true);
                    }}
                   />
              ))}
            </SidebarMenu>

          </SidebarGroupContent>
        </SidebarGroup>
      </>
    )

  }