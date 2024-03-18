export const goToHomePage = () => {
    navigateTo('/');
}

export const goToSignInPage = () => {
    navigateTo('/signin');
}

export const goToHelpPage = () => {
    navigateTo('/help');
}

export const goToSignUpPage = (token) => {
    navigateTo({
        path: '/signup',
        query: {
            agree: token,
        }
    });
}

export const goToNotFoundPage = () => {
    navigateTo('/notfound');
}
