import { signUpAgree } from "@/server/services/user";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const token = await signUpAgree(body);
    return {
        token
    };
});
