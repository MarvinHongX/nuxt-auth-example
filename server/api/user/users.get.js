import { allUsers } from "@/server/services/user";

export default defineEventHandler(async (event) => {
    const users = await allUsers(event);
    return {
        users
    };
});
