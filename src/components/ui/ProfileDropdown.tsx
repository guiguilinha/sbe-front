"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, History, LogOut, ChevronDown, ChevronUp, User } from "lucide-react";
import { useAuth } from "@/auth/SimpleUseAuth";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProfileDropdownProps {
  /**
   * Nome do usuário para exibir no dropdown
   */
  userName?: string;
  /**
   * Email do usuário para exibir no dropdown
   */
  userEmail?: string;
  /**
   * URL da imagem do avatar (opcional)
   */
  avatarUrl?: string;
  /**
   * Nível do usuário para exibir como fallback do avatar
   */
  userLevel?: string;
}

/**
 * Componente de dropdown de perfil do usuário
 * Mostra avatar, nome, email e links de navegação
 * Apenas exibido quando o usuário está logado
 */
export function ProfileDropdown({
  userName,
  userEmail,
  avatarUrl,
  userLevel,
}: ProfileDropdownProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Estado para controlar se o dropdown está aberto
  const [open, setOpen] = useState(false);

  // Usar dados do hook se não fornecidos via props
  const displayName = userName || user?.name || "Usuário";
  const displayEmail = userEmail || user?.email || "";
  
  // Extrair primeiro nome
  const getFirstName = (name: string) => {
    const parts = name.trim().split(" ");
    return parts[0] || name;
  };

  const firstName = getFirstName(displayName);

  const handleLogout = () => {
    logout();
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="flex items-center gap-2 h-auto py-2 px-3 hover:bg-gray-100"
        >
          <span className="text-sm font-normal text-gray-700">Olá, </span>
          <span className="text-sm font-medium text-gray-700">{firstName}</span>
          <Avatar className="h-8 w-8">
            {avatarUrl ? (
              <AvatarImage alt={displayName} src={avatarUrl} />
            ) : null}
            <AvatarFallback className="text-xs bg-gray-100 flex items-center justify-center">
              <User className="h-4 w-4 text-gray-600" />
            </AvatarFallback>
          </Avatar>
          {open ? (
            <ChevronUp className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="font-medium text-sm leading-none">{displayName}</p>
            {displayEmail && (
              <p className="text-muted-foreground text-xs leading-none">
                {displayEmail}
              </p>
            )}
            {userLevel && (
              <p className="text-muted-foreground text-xs leading-none">
                {userLevel}
              </p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleNavigate("/dashboard")}>
          <LayoutDashboard className="mr-2 h-4 w-4" />
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleNavigate("/historico")}>
          <History className="mr-2 h-4 w-4" />
          Histórico
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleLogout}
          variant="destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

