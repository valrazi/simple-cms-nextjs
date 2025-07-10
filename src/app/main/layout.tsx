import Drawer from "@/components/ui/organisms/Drawer";
import Navbar from "@/components/ui/organisms/Navbar";
import { Box, Flex } from "@chakra-ui/react";
import React from "react";

export default function MainLayout({ children }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <Flex direction={'column'} width={'full'} backgroundColor={'white'} minHeight={'dvh'}>
            <Navbar/>
            <Flex minHeight={'dvh'}>
                <Drawer/>
                <Box width={'full'} padding={'8'} backgroundColor={'gray.100'} rounded={'xl'} xl={{margin: '4'}}>
                    {children}
                </Box>
            </Flex>
        </Flex>
    )
}