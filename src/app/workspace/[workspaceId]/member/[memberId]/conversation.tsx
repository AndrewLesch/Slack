import { useMemberId } from "@/hooks/use-member-id";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { useGetMember } from "@/features/members/api/use-get-member";
import { useGetMessages } from "@/features/messages/api/use-get-messages";
import { Loader } from "lucide-react";
import { Header } from "./header";
import { ChatInput } from "./chat-input";
import { MessageList } from "@/components/message-list";

interface ConversatationProps {
  id: Id<"conversations">
}

export const Conversation = ({id} : ConversatationProps) => {
  const memberId = useMemberId()

  const {data: member, isLoading: memberLoading} = useGetMember({id: memberId})
  const { results, status, loadMore } = useGetMessages({
    conversationId: id,
  })

  console.log(member)

  if(memberLoading || status === "LoadingFirstPage") {
    return(
      <div className="h-full flex-1 flex items-center justify-center">
        <Loader className="animate-spin size-5 text-muted-foreground" />
      </div>
    )
  }
  return (
    <div className="flex flex-col h-full">
      <Header
        memberName={member?.user.name}
        memberImage={member?.user.image}
        onClick={() => {}}
      />
      <MessageList 
        data={results}
        variant="conversation"
        memberImage={member?.user.image}
        memberName={member?.user.name}
        loadMore={loadMore}
        isLoadingMore={status === "LoadingMore"}
        canLoadMore={status === "CanLoadMore"}
      />
      <ChatInput 
        placeholder={`Message to ${member?.user.name}`}
        conversationId={id}
      />
    </div>
  )
}