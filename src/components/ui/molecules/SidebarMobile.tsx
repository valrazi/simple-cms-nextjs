"use client"
import { SidebarItem as SidebarItemType } from "@/types"
import { Drawer, Flex, HStack, Icon, Portal, Text } from "@chakra-ui/react"
import SidebarItem from "./SidebarItem"
import useUIStore from "@/app/store/useUIStore"
import CustomButton from "../atomics/CustomButton"
import { FaArrowRightToBracket } from "react-icons/fa6"
import { useRouter } from "next/navigation"
import useUserStore from "@/app/store/useUserStore"
import { useState } from "react"
import axios from "axios"
import { Toaster, toaster } from "../toaster"

export default function SidebarMobile({ sidebarItems }: Readonly<{ sidebarItems: SidebarItemType[] }>) {
    const { drawerOpen, toggleDrawer } = useUIStore()
    const router = useRouter()
    const { signOut } = useUserStore()
    const [isLoading, setIsLoading] = useState(false)

    const onSignOut = async () => {
        try {
            setIsLoading(true)
            await axios.post('/api/auth/sign-out')
            toaster.create({
                title: 'Signout Success',
                type: 'success'
            })
            signOut()
            router.push('/auth/sign-in')
        } catch (error) {
            toaster.create({
                title: 'Signout Failed',
                description: error,
                type: 'error'
            })
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <Drawer.Root placement={'start'} open={drawerOpen} onOpenChange={() => toggleDrawer()}>
            <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                    <Drawer.Content>
                        <Drawer.Body >
                            <Flex direction={'column'} gap={'4'} paddingY={'4'}>
                                <Toaster/>
                                <SidebarItem sidebarItems={sidebarItems} key={'sidebar-item-component'} />
                                <CustomButton width={'full'} backgroundColor={'red.500'} color={'white'} _hover={{ backgroundColor: 'red.600' }} onClick={isLoading ? () => { } : onSignOut}>
                                    <HStack fontSize={'10px'}>
                                        <Icon size={'xs'}>
                                            <FaArrowRightToBracket />
                                        </Icon>
                                        <Text>Sign Out</Text>
                                    </HStack>
                                </CustomButton>
                            </Flex>
                        </Drawer.Body>
                    </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
    )
}