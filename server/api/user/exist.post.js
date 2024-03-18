import { existUser } from "@/server/services/user";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const exist = await existUser(body);
    return {
        exist
    };
});
