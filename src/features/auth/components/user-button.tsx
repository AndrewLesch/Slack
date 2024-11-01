"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useCurrentUser } from "../api/use-current-user"
import { Loader, LogOut } from "lucide-react"
import { useAuthActions } from "@convex-dev/auth/react"
import { useRouter } from "next/navigation"
import { useLogout } from "@/context/logout-context"

export const UserButton = () => {
  const { signOut } = useAuthActions()
  const { data, isLoading } = useCurrentUser()
  const router = useRouter()
  const { setIsLoggingOut } = useLogout(); // Получаем setIsLoggingOut из контекста

  if(isLoading) {
    return <Loader className="size-4 animate-spin text-muted-foreground" />
  }

  if(!data) {
    return null
  }

  const { image, name } = data;

  const avatarFallback = name!.charAt(0).toLocaleUpperCase()  

  const handleLogOut = async () => {
    console.log("User is logging out...");
    setIsLoggingOut(true); // Устанавливаем состояние выхода
    await signOut(); // Выполняем выход
    router.replace("/"); // Перенаправляем на главную страницу
  };
  

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-10 hover:opacity-75 transition">
          <AvatarImage alt={name} src={image} />
          <AvatarFallback className="bg-sky-400 text-white">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" side="right" className="w-60">
        <DropdownMenuItem className="hover:cursor-pointer h-10" onClick={() => handleLogOut()}>
          <LogOut className="size-4 mr-2" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}