export default defineEventHandler((event) => {
    const userWithPassword = event.context.user;
    if (!userWithPassword) {
        return {
            user: null,
            isAdmin: false
        };
    }
    const { password: _password, ...userWithoutPassword } = userWithPassword;
    return {
        user: userWithoutPassword,
        isAdmin: (userWithoutPassword?.userFg )== '9',
    };
});
