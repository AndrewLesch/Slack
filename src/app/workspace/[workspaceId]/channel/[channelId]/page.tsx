"use client"

import { useChannelId } from "@/hooks/use-channel-id";
import { useLogout } from "@/context/logout-context";
import MainContent from "./main-content";

const ChannelIdPage = () => {
  const channelId = useChannelId()
  const { isLoggingOut } = useLogout();

  return (
    <>
    {!isLoggingOut && (
      <MainContent 
        channelId={channelId}
      />
    )}
    </>
  );
}
 
export default ChannelIdPage;