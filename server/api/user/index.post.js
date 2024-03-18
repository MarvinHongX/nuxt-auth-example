import { signInUser } from "@/server/services/user";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const user = await signInUser(body);
    const token = await createToken(user);
    const isAdmin = (user.userFg == '9');
    setCookie(event, "__session", token);
    
    return {
        user,
        token,
        isAdmin
    };
});
