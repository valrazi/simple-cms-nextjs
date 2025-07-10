import z from "zod";

export const FormMenuGroupSchema = z.object({
    name: z.string().min(1, 'Name Required')
})

export type MenuGroupType = {
    id: string;
    name: string;
    createdBy: string;
    createdAt: Date
}