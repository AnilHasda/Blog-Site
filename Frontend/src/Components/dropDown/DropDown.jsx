
import * as React from "react";

import { Button } from "@/shadcnComponents/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shadcnComponents/ui/dropdown-menu";
import { useSelector } from "react-redux";

export function DropdownMenuCheckboxes({logout}) {
    let userName=useSelector(state=>state.reducer.userInfo?.user || "user");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{userName}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem>
          Profile
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem onClick={logout}>
        Log out
        </DropdownMenuCheckboxItem>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}
