"use client"
import useUIStore from "@/app/store/useUIStore";
import { FaHouse, FaGear } from 'react-icons/fa6'
import SidebarDesktop from "../molecules/SidebarDesktop";
import { useMediaQuery } from '@uidotdev/usehooks'
import SidebarMobile from "../molecules/SidebarMobile";
import { useEffect } from "react";
export default function Drawer() {
    const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)")
    const { drawerOpen, setDrawerOpen } = useUIStore()

    const sidebarItems = [
        {
            href: '/main',
            title: 'Home',
            icon: <FaHouse />,
            dropdownList: []
        },
        {
            href: '/setting',
            title: 'Setting',
            icon: <FaGear />,
            dropdownList: [
                {
                    href: '/setting/menu-group',
                    title: 'Menu Group',
                },
                {
                    href: '/setting/menu',
                    title: 'Menu',
                },
            ]
        }
    ]

    useEffect(() => {
        if(!isSmallDevice) {
            setDrawerOpen(true)
        } else {
            setDrawerOpen(false)
        }
    }, [isSmallDevice])

    if (isSmallDevice) {
        return (
            <SidebarMobile sidebarItems={sidebarItems} key={'sidebar-mobile'} />
        )
    } else {
        return (
            drawerOpen
                ? <SidebarDesktop sidebarItems={sidebarItems} />
                : null
        )
    }
}