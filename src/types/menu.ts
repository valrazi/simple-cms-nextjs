import z from "zod";

export const FormMenuSchema = z.object({
    name: z.string().min(1, 'Name Required'),
    menuGroup: z.string().min(1, 'Menu Group Required')
})

export type MenuType = {
    id: string;
    name: string;
    menuGroup: string;
    createdBy: string;
    createdAt: Date
}