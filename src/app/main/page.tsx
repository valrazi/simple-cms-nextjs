"use client"
import { Flex, Heading } from "@chakra-ui/react";
import useUserStore from "../store/useUserStore";

export default function MainPage(){
    const {user} = useUserStore()
    return (
        <Flex rounded={'xl'}>
            <Heading fontSize={'xl'} fontWeight={'bold'}>Welcome Back, {user?.name} 👋</Heading>
        </Flex>
    )
}