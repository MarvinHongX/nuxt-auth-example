export default defineNuxtPlugin(async () => {
    const { userLoggedIn } = await useAuth();
    await userLoggedIn();
});
