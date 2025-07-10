"use client"
import InputStyle from "@/app/styles/input-styles";
import CustomButton from "@/components/ui/atomics/CustomButton";
import { PasswordInput } from "@/components/ui/password-input";
import { UserLoginSchema, UserSigninResponse } from "@/types";
import { Field, Flex, Heading, Input, Stack } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import z from "zod";
import {Toaster, toaster} from '@/components/ui/toaster'
import { useState } from "react";
import axios, {isAxiosError} from "axios";
import useUserStore from "@/app/store/useUserStore";
import { useRouter } from "next/navigation";
type FormValue = z.infer<typeof UserLoginSchema>

export default function SigninPage() {
    const {signIn} = useUserStore()
    const {register, handleSubmit, formState: {errors}} = useForm<FormValue>({
        resolver: zodResolver(UserLoginSchema)
    })
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsLoading(true)
            const response = await axios.post('/api/auth/sign-in', {
                ...data
            })
            const responseData = response.data.data as UserSigninResponse
            const {user} = responseData
            signIn(user)
            toaster.create({
                title: 'Success Login',
                type:'success'
            })
            router.push('/main')
        } catch (error) {
            let msgError = 'Unexpected Error'
            if(isAxiosError(error)) {
                msgError = error.response?.data.error
            }
            toaster.create({
                title:'Error Login',
                description: msgError,
                type: 'error'
            })
        }finally {
            setIsLoading(false)
        }
    })

    const inputStyle = InputStyle()
    return (
        <Flex width={'full'} height={'dvh'} backgroundColor={'gray.100'}>
            <Toaster/>
            <Flex margin={'auto'} xl={{width: '1/3'}}>
                <Flex  xl={{width: 'full'}} paddingX={'8'} paddingY={'4'} justify={'center'} backgroundColor={'white'} rounded={'xl'} color={'gray.700'} direction={'column'}>
                    <Image src={'/img/cms-logo.png'} alt="CMS Logo" width={48} height={40} style={{marginBottom: '16px'}}/>

                    <Heading fontSize={'xl'} fontWeight={'bold'} marginBottom={'2'}>Welcome Back! 👋</Heading>   

                    <form onSubmit={isLoading ? () => {} : onSubmit}>
                        <Stack gap={'4'} align={'flex-start'}>
                            <Field.Root invalid={!!errors.email} width={'full'}>
                                <Field.Label>Email</Field.Label>
                                <Input {...register('email')} {...inputStyle}/>
                                <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
                            </Field.Root>

                             <Field.Root invalid={!!errors.password} width={'full'}>
                                <Field.Label>Password</Field.Label>
                                <PasswordInput {...register('password')} {...inputStyle}/>
                                <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
                            </Field.Root>

                            <CustomButton loading={isLoading} type="submit" backgroundColor={'gray.800'} color={'gray.100'} _hover={{backgroundColor: 'gray.700'}}>Sign In</CustomButton>
                        </Stack>
                    </form>
                </Flex>
            </Flex>
        </Flex>
    )
}