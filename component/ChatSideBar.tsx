'use client';
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
  } from '@/component/ui/sidebar';
import { Button } from '@/component/ui/button';
import { PlusIcon } from '@/component/icons';
import type { User } from 'next-auth';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { SidebarHistory } from './sidebar-history';
import { useRouter } from 'next/navigation';
const ChatSideBar = ({ userId }: { userId: string | null }) => {
  const router = useRouter();
    return(
     <Sidebar className="group-data-[side=left]:border-r-0">
        <SidebarHeader>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                type="button"
                className="p-2 h-fit"
                onClick={() => {
                  router.push('/');
                  router.refresh();
                } } />
              <PlusIcon />
            <Button/>
          </TooltipTrigger>
          <TooltipContent align="end">New Chat</TooltipContent>
        </Tooltip>
      </SidebarHeader><SidebarContent>
          <SidebarHistory userId={userId} />
        </SidebarContent>
    </Sidebar>


    
    )

}

export default ChatSideBar;