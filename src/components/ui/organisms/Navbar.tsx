"use client"
import useUIStore from "@/app/store/useUIStore";
import useUserStore from "@/app/store/useUserStore";
import { Avatar,  Flex, HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { FaBars, FaXmark } from 'react-icons/fa6'
export default function Navbar() {
    const { toggleDrawer, drawerOpen } = useUIStore()
    const {user} = useUserStore()
    
    return (
        <Flex as={'nav'} justify={'space-between'} gapX={'4'} gapY={'2'} backgroundColor={'white'} paddingX={'4'} paddingY={'2'} >
            <HStack gap={'4'} align={'center'}>
                <IconButton onClick={toggleDrawer}>
                    {
                        drawerOpen
                            ?
                            (
                                <FaXmark />
                            )
                            :
                            (
                                <FaBars />
                            )
                    }
                </IconButton>
                <Image src={'/img/cms-logo.png'} alt="CMS Logo" width={48} height={40} />
            </HStack>

            <HStack align={'center'}>
                <Avatar.Root variant={'solid'}>
                    <Avatar.Fallback name={user?.name} fontSize={'12px'} />
                </Avatar.Root>
                <VStack>
                    <Text fontSize={'12px'}>{user?.name}</Text>
                </VStack>
            </HStack>
        </Flex>
    )
}