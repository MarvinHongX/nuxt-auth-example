import { signUpUser } from "@/server/services/user";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const body = await readBody(event);
    const user = await signUpUser(body);
    const token = await createToken(user);
    const isAdmin = (user.userFg == '9');
    setCookie(event, config.session, token);
    return {
        user,
        token,
        isAdmin
    };
});
