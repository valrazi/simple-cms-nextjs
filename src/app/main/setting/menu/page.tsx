"use client"
import useMenuGroupStore from "@/app/store/useMenuGroupStore";
import useMenuStore from "@/app/store/useMenuStore";
import useUserStore from "@/app/store/useUserStore";
import InputStyle from "@/app/styles/input-styles";
import CustomButton from "@/components/ui/atomics/CustomButton";
import Empty from "@/components/ui/molecules/EmptyState";
import { Toaster, toaster } from "@/components/ui/toaster";
import { Tooltip } from "@/components/ui/tooltip";
import { FormMenuSchema, MenuType } from "@/types";
import { Box, Collapsible, Field, Flex, Heading, Icon, Input, NativeSelect, Stack, Table, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaPlus, FaRegTrashCan } from 'react-icons/fa6'
import z from "zod";
type FormValue = z.infer<typeof FormMenuSchema>
export default function Menu() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValue>({
        resolver: zodResolver(FormMenuSchema)
    })
    const { user } = useUserStore()
    const { menu, addData, deleteData } = useMenuStore()
    const { menuGroup } = useMenuGroupStore()
    const [isLoading, setIsLoading] = useState(false)
    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsLoading(true)
            const payload: MenuType = {
                id: dayjs().valueOf().toString(),
                name: data.name,
                createdAt: dayjs().toDate(),
                createdBy: user?.name ?? 'Administrator',
                menuGroup: data.menuGroup
            }
            addData(payload)
            toaster.create({
                title: 'Success Add Data',
                type: 'success'
            })
            reset({ name: '' })
        } catch (error) {
            toaster.create({
                title: 'Error Add Data',
                description: error,
                type: 'error'
            })
        } finally {
            setIsLoading(false)
        }
    })

    const onDelete = async (data: MenuType) => {
        try {
            setIsLoading(true)
            deleteData(data)
            toaster.create({
                title: 'Success Delete Data',
                type: 'success'
            })
        } catch (error) {
            toaster.create({
                title: 'Error Delete Data',
                description: error,
                type: 'error'
            })
        } finally {
            setIsLoading(false)
        }
    }

    const inputStyle = InputStyle()
    return (
        <Flex direction={'column'} width={'full'}>
            <Toaster />
            <Collapsible.Root>
                <Collapsible.Trigger paddingY="3">
                    <Flex gap={'4'} align={'center'} backgroundColor={'black'} _hover={{ opacity: '0.8' }} color={'white'} paddingX={'4'} paddingY={'2'} rounded={'lg'} fontSize={'sm'}>
                        <Icon size={'md'}>
                            <FaPlus />
                        </Icon>
                        <Text>Add Data</Text>
                    </Flex>
                </Collapsible.Trigger>
                <Collapsible.Content>
                    <Box padding="4" borderWidth="1px" xl={{ width: '1/2' }} backgroundColor={'white'} rounded={'lg'}>
                        <form onSubmit={isLoading ? () => { } : onSubmit}>
                            <Stack gap={'4'} align={'flex-start'}>
                                <Field.Root invalid={!!errors.name} width={'full'}>
                                    <Field.Label>Namexs</Field.Label>
                                    <Input {...register('name')} {...inputStyle} />
                                    <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
                                </Field.Root>

                                <Field.Root invalid={!!errors.menuGroup} width={'full'}>
                                    <Field.Label>Menu Group</Field.Label>
                                    <NativeSelect.Root>
                                        <NativeSelect.Field
                                            placeholder="Select menu group"
                                            {...register('menuGroup')}
                                            {...inputStyle}>
                                            {
                                                menuGroup.map((mg, idx) => (
                                                    <option value={mg.name} key={idx}>{mg.name}</option>
                                                ))
                                            }
                                        </NativeSelect.Field>
                                    </NativeSelect.Root>
                                    <Field.ErrorText>{errors.menuGroup?.message}</Field.ErrorText>
                                </Field.Root>


                                <CustomButton loading={isLoading} type="submit" backgroundColor={'gray.800'} color={'gray.100'} _hover={{ backgroundColor: 'gray.700' }}>Submit</CustomButton>
                            </Stack>
                        </form>
                    </Box>
                </Collapsible.Content>
            </Collapsible.Root>
            <Heading fontSize={'xl'} fontWeight={'bold'}>Menu <br></br><Text fontSize={'lg'} fontWeight={'normal'}>{menu.length} Total</Text></Heading>
            <Box overflow={'auto'} width={'full'} marginY={'4'}>
                {
                    menu.length > 0
                        ?
                        (
                            <Table.Root size={'sm'} minWidth="600px">
                                <Table.Header>
                                    <Table.Row >
                                        <Table.ColumnHeader roundedTopLeft={'lg'}>No.</Table.ColumnHeader>
                                        <Table.ColumnHeader>Name</Table.ColumnHeader>
                                        <Table.ColumnHeader>Menu Group</Table.ColumnHeader>
                                        <Table.ColumnHeader>Created At</Table.ColumnHeader>
                                        <Table.ColumnHeader roundedTopRight={'lg'}>#</Table.ColumnHeader>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {menu.map((item, idx) => (
                                        <Table.Row key={item.id} padding={'2'}>
                                            <Table.Cell roundedBottomLeft={idx == menu.length - 1 ? 'lg' : 'none'}>{idx + 1}</Table.Cell>
                                            <Table.Cell>{item.name}</Table.Cell>
                                            <Table.Cell>{item.menuGroup}</Table.Cell>
                                            <Table.Cell>{dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}</Table.Cell>
                                            <Table.Cell roundedBottomRight={idx == menu.length - 1 ? 'lg' : 'none'}>
                                                <Tooltip content="Delete Data" openDelay={0} closeDelay={0} >
                                                    <CustomButton onClick={() => onDelete(item)} backgroundColor={'red.500'} _hover={{ backgroundColor: 'red.600' }} color={'white'}>
                                                        <Flex gapX={'2'}>
                                                            <Icon size={'md'}>
                                                                <FaRegTrashCan />
                                                            </Icon>
                                                        </Flex>
                                                    </CustomButton>
                                                </Tooltip>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table.Root>
                        )
                        : (<Empty />)
                }
            </Box>
        </Flex>
    )
}