import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export const TokenDropdown = ({ tokens }: { tokens: string[] }) => (
  <DropdownMenu>
    <DropdownMenuTrigger>Choose a Token</DropdownMenuTrigger>
    <DropdownMenuContent>
      {tokens.map((token) => (
        <DropdownMenuItem key={token} onClick={() => console.log(`Selected: ${token}`)}>
          {token}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>
);
