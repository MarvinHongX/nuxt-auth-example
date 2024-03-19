export const useAuth = () => {
    const authUser = useState('authUser', () => null);
    const userAdmin = useState('userAdmin', () => false);

    const setUser = (user) => {
        authUser.value = user;
    };

    const signUp = async (user) => {
        try {
            const data = await $fetch('/api/user/signup', {
                method: 'POST',
                body: user
            });
            if (data.isAdmin) {
                userAdmin.value = true;
            } else {
                userAdmin.value = false;
            }
            setUser(data.user);
            return data;
        } catch (err) {
            return null;
        }
    };

    const signUpAgree = async (agrees) => {
        try {
            const data = await $fetch('/api/user/signupagree', {
                method: 'POST',
                body: agrees
            });
            return data;
        } catch (err) {
            return null;
        }
    };

    const signUpAgreed = async (token) => {
        try {
            const data = await $fetch('/api/user/signupagreed', {
                method: 'POST',
                body: token,
                headers: {
                    'Content-Type': 'text/plain'
                }
            });
            return data.agreed || false;
        } catch (err) {
            return false;
        }
    };

    const signIn = async (user) => {
        try {
            const data = await $fetch('/api/user', {
                method: 'POST',
                body: user
            });
            if (data.isAdmin) {
                userAdmin.value = true;
            } else {
                userAdmin.value = false;
            }
            setUser(data.user);
            return data;
        } catch (err) {
            return null;
        }
    };

    const userLoggedIn = async () => {
        if (!authUser.value) {
            const data = await $fetch('/api/user/token', {
                headers: useRequestHeaders(['cookie'])
            });
            if (data.isAdmin) {
                userAdmin.value = true;
            } else {
                userAdmin.value = false;
            }
            setUser(data.user);
            return data;
        }
    };

    const help = async (user) => {
        try {
            const data = await $fetch('/api/user/help', {
                method: 'POST',
                body: user
            });
            return data;
        } catch (err) {
            return null;
        }
    };

    const helpCode = async (user) => {
        try {
            const data = await $fetch('/api/user/helpCode', {
                method: 'POST',
                body: user
            });
            return data;
        } catch (err) {
            return null;
        }
    };

    const signOut = async () => {
        try {
            const data = await $fetch('/api/user/signout');
            if (data.signOut) {
                userAdmin.value = false;
                setUser(null);
                return true;
            }
            return false;
        } catch (err) {
            return false;
        };
    };

    const updateName = async (name) => {
        try {
            const data = await $fetch('/api/user/updatename', {
                method: 'POST',
                body: name,
                headers: {
                    'Content-Type': 'text/plain'
                }
            });
            if (data.isAdmin) {
                userAdmin.value = true;
            } else {
                userAdmin.value = false;
            }
            setUser(data.user);
            return data;
        } catch (err) {
            return null;
        }
    };

    const updatePassword = async (currentPassword, newPassword) => {
        try {
            const data = await $fetch('/api/user/updatepassword', {
                method: 'POST',
                body: {
                    currentPassword,
                    newPassword
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return data;
        } catch (err) {
            return null;
        }
    };

    return {
        signUp,
        signUpAgree,
        signUpAgreed,
        help,
        helpCode,
        signIn,
        userLoggedIn,
        userAdmin,
        signOut,
        authUser,
        updateName,
        updatePassword,
    };
};
