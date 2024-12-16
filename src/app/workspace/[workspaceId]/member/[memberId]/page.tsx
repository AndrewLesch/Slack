"use client"

import { useCreateOrGetConveration } from "@/features/conversations/api/use-create-or-get-conversation";
import { useMemberId } from "@/hooks/use-member-id";
import { useWorkspaceId } from "@/hooks/use-workspace-id";
import { Loader, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { toast } from "sonner";
import { Conversation } from "./conversation";

const MemberIdPage = () => {
  const memberId = useMemberId()
  const workspaceId = useWorkspaceId()

  const [conversationId, setConversationId] = useState<Id<"conversations"> | null>(null)

  const { mutate, isPending } = useCreateOrGetConveration()

  useEffect(() => {
    mutate({
      workspaceId,
      memberId
    }, {
      onSucces(data) {
        setConversationId(data)
      },
      onError() {
        toast.error("Failed")
      }
    })
  }, [memberId, mutate, workspaceId])

  if(isPending) {
    return(
      <div className="h-full flex-1 flex items-center justify-center">
        <Loader className="animate-spin size-5 text-muted-foreground" />
      </div>
    )
  }

  if(!conversationId) {
    return(
      <div className="h-full flex-1 flex flex-col gap-y-2 items-center justify-center">
        <TriangleAlert className="animate-bounce size-5 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Conversation not found</span>
      </div>
    )
  }

  return <Conversation id={conversationId} />;
}
 
export default MemberIdPage;