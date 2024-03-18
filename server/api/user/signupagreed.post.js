import { signUpAgreed } from "@/server/services/user";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const agreed = await signUpAgreed(body);
    return {
        agreed
    };
});
