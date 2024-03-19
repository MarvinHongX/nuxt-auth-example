import { updateName } from "@/server/services/user";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const userWithPassword = event.context.user;
    if (!userWithPassword) {
        return {
            user: null,
        };
    }

    const user = await updateName(userWithPassword.userId, body);
    return {
        user
    };
});
