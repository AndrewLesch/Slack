"use client"

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Sidebar } from "./sidebar";
import { Toolbar } from "./toolbar";
import { WorkspaceSidebar } from "./workspace-sidebar";
import { usePanel } from "@/hooks/use-panel";
import { Loader } from "lucide-react";
import { Id } from "../../../../convex/_generated/dataModel";
import { Thread } from "@/features/messages/components/thread";

interface WorkSpaceIdLayoutProps {
  children: React.ReactNode;
}

const WorkSpaceIdLayout = ({children} : WorkSpaceIdLayoutProps) => {
  const {parentMessageId, onClose} = usePanel()

  const showPanel = !!parentMessageId

  return (
    <div className="h-full">
      <Toolbar />
      <div className="flex h-[calc(100vh-40px)]">
        <Sidebar />
        <ResizablePanelGroup direction="horizontal" autoSaveId="workspace">
          <ResizablePanel defaultSize={15} minSize={15} className="bg-[#5E2C5F]">
            <WorkspaceSidebar />  
          </ResizablePanel>
          <ResizableHandle withHandle/>
          <ResizablePanel minSize={20} defaultSize={20}>
            {children}
          </ResizablePanel>
          {showPanel && (
            <>
              <ResizableHandle withHandle />
              <ResizablePanel minSize={20} defaultSize={29}>
                {parentMessageId ? (
                    <div className="h-full">
                      <Thread 
                        messageId={parentMessageId as Id<"messages">}
                        onClose={onClose}
                      />
                    </div>
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Loader className="size-5 animate-spin text-muted-foreground" />
                    </div>
                  )
                }
              </ResizablePanel>
            </>
          )}
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
 
export default WorkSpaceIdLayout;