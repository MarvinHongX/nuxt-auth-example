import { getTokenUser } from "@/server/services/user"

export default defineEventHandler(async (event) => {
    const user = await getTokenUser(event);
    
    if (user) {
        event.context.user = user;
    } else {
        event.context.user = null;
    }
});
