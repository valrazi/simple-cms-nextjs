import z from "zod";

export const UserLoginSchema = z.object({
    email: z.string().min(1, 'Email Required').email(),
    password: z.string().min(1, 'Pasword Required')
})

export type UserType = {
    email: string;
    password: string;
    name: string
}

export type UserSigninResponse = {
    token: string;
    user: UserType
}