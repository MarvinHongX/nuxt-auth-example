export default defineNuxtRouteMiddleware(async () => {
    const { authUser } = useAuth();
    if (!authUser?.value || authUser?.value?.userId == '') {
        return await navigateTo({ path: '/signin' })
    }
});