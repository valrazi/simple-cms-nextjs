"use client"
import { SidebarItem as SidebarItemType } from "@/types"
import { HStack, Icon, Text, VStack } from "@chakra-ui/react"
import SidebarItem from "./SidebarItem"
import { FaArrowRightToBracket } from "react-icons/fa6"
import { useRouter } from "next/navigation"
import useUserStore from "@/app/store/useUserStore"
import { useState } from "react"
import axios from "axios"
import { Toaster, toaster } from "../toaster"
import CustomButton from "../atomics/CustomButton"

export default function SidebarDesktop({ sidebarItems }: Readonly<{ sidebarItems: SidebarItemType[] }>) {
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
        <VStack width={'15%'} paddingY={'4'} paddingX={'2'} minHeight={'dvh'} gap={'4'} backgroundColor={'white'}>
            <Toaster/>
            <SidebarItem sidebarItems={sidebarItems} key={'sidebar-item-component'} />
            <CustomButton width={'full'} backgroundColor={'red.500'} color={'white'}  _hover={{ backgroundColor: 'red.600' }} onClick={isLoading ? () => { } : onSignOut}>
                <HStack fontSize={'10px'}>
                    <Icon size={'xs'}>
                        <FaArrowRightToBracket />
                    </Icon>
                    <Text>Sign Out</Text>
                </HStack>
            </CustomButton>
        </VStack>
    )
}