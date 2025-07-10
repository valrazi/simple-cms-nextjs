import { ReactNode } from "react";

export type DropdownListItem = {
    href: string;
    title: string
}

export type SidebarItem = {
    href: string;
    title: string;
    icon: ReactNode,
    dropdownList: DropdownListItem[]
}