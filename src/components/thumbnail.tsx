import Image from "next/image"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog"

interface ThumbnailProps {
  url: string | null | undefined,
}

export const Thumbnail = ({url}: ThumbnailProps) => {
  if(!url) return null 
  
  return (
    <Dialog>
      <DialogTrigger>
        <div className="relative overflow-hidden max-w-[300px] border rounded-lg my-2 cursor-zoom-in">
          <Image
            src={url}
            alt="Message img"
            className="rounded-md object-cover size-full"
          />
        </div>
      </DialogTrigger>
      <DialogContent className="flex items-center max-w-[550px] border-none bg-transparent p-0 shadow-none">
        <DialogTitle />
        <Image
            src={url}
            alt="Message img"
            className="rounded-md object-cover size-full"
        />
      </DialogContent>
    </Dialog>
  )
}