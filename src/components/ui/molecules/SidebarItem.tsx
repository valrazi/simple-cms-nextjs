"use client"
import { SidebarItem as SidebarItemType } from "@/types";
import { Accordion, Button, Flex, Icon, Text } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";

export default function SidebarItem({ sidebarItems }: Readonly<{ sidebarItems: SidebarItemType[] }>) {
    const pathName = usePathname()
    const router = useRouter()
    return (
        sidebarItems.map((i, idx) => {
            if (!i.dropdownList.length) {
                return (
                    <Button onClick={() => router.push(`${i.href}`)} key={idx} width={'full'} backgroundColor={pathName == i.href ? 'black' : 'white'} padding={'2'} rounded={'lg'}>
                        <Flex gap={'2'} align={'start'}  width={'full'}>
                            <Icon size={'sm'} color={pathName == i.href ? 'white' : 'black'}>
                                {i.icon}
                            </Icon>
                            <Text fontSize={'12px'} fontWeight={'bold'} color={pathName == i.href ? 'white' : 'black'}>{i.title}</Text>
                        </Flex>
                    </Button>
                )
            } else {
                return (
                    <Accordion.Root key={idx} collapsible={pathName.startsWith(i.href) ? false : true} >
                        <Accordion.Item key={idx} value={i.title}>
                            <Accordion.ItemTrigger paddingX={'2'}>
                                <Flex gap={'2'} align={'start'} width={'full'}>
                                    <Icon size={'sm'} color={pathName == i.href ? 'white' : 'black'}>
                                        {i.icon}
                                    </Icon>
                                    <Text fontSize={'12px'} fontWeight={'bold'} color={pathName == i.href ? 'white' : 'black'}>{i.title}</Text>
                                </Flex>
                                <Accordion.ItemIndicator />
                            </Accordion.ItemTrigger>
                            <Accordion.ItemContent>
                                <Accordion.ItemBody>
                                    <Flex direction={'column'} paddingX={'4'} width={'full'}>
                                        {
                                            i.dropdownList.map((item, idxD) => (
                                                <Button onClick={() => router.push(`/main${item.href}`)} key={idxD} width={'full'} backgroundColor={pathName == `/main${item.href}` ? 'black' : 'white'} padding={'2'} rounded={'lg'}>
                                                    <Flex gap={'2'} align={'start'} justify={'start'} width={'full'}>
                                                        <Text fontSize={'12px'} fontWeight={'bold'} color={pathName == `/main${item.href}` ? 'white' : 'black'}>{item.title}</Text>
                                                    </Flex>
                                                </Button>
                                            ))
                                        }
                                    </Flex>
                                </Accordion.ItemBody>
                            </Accordion.ItemContent>
                        </Accordion.Item>
                    </Accordion.Root>
                )
            }
        })
    )
}