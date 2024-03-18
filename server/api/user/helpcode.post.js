import { helpCodeUser } from "@/server/services/user";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const verified = await helpCodeUser(body);
    return {
        verified
    };
});
