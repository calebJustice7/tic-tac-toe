import { z } from "zod";

export const getRoomValidator = z.object({
    params: z.object({
        id: z.string(),
    }),
});
