export default defineNuxtRouteMiddleware(async (to) => {
    const { signUpAgreed } = useAuth();

    if (!to.query.agree || to.query.agree === '') {
        return await navigateTo({ path: '/agree' })
    }

    const agreed = await signUpAgreed(to.query.agree);
    if (!agreed) {
        return await navigateTo({ path: '/agree' })
    }
});