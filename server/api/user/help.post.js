import { helpUser } from "@/server/services/user";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const help = await helpUser(body);
    return {
        help
    };
});
