export default defineNuxtRouteMiddleware(async () => {
    const { userAdmin } = useAuth();

    if (!userAdmin.value) {
        return await navigateTo({ path: '/' })
    }
});