"use client"

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Sidebar } from "./sidebar";
import { Toolbar } from "./toolbar";
import { WorkspaceSidebar } from "./workspace-sidebar";

interface WorkSpaceIdLayoutProps {
  children: React.ReactNode;
}

const WorkSpaceIdLayout = ({children} : WorkSpaceIdLayoutProps) => {
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
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
 
export default WorkSpaceIdLayout;