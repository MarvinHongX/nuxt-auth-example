import { getUserById, getUserByPhone, createUser, getUsers, updateUserName, updateUserPassword } from "@/server/models/user";
import { hashPassword, verifyPassword } from "@/server/utils/password";
import { createAgreeToken, verifyAgreeToken, verifyToken } from "@/server/utils/session"

const signUpAgree = async (body) => {
    const agreeAll = body.agrees?.includes("agree1") && body.agrees?.includes("agree2");
    if (!agreeAll) return null;

    const token = await createAgreeToken(body.agrees);
    return token;
};

const signUpAgreed = async (token) => {
    if (!token) return false;
    const agreed = await verifyAgreeToken(token);
    return agreed || false;
};

const signUpUser = async (user) => {
    const hashedPassword = await hashPassword(user.password);
    const newUser = await createUser({
        userId: user.userId,
        name: user.name,
        password: hashedPassword,
        phone: {
            country: user.phone.country,
            number: user.phone.number,
        },
    });

    const { userId, name, userFg, phone } = newUser;
    return { userId, name, userFg, phone };
};

const signInUser = async (user) => {
    const checkUser = await getUserById(user.userId);
    if (!checkUser) {
        throw new Error("User not found");
    }
    const checkPassword = await verifyPassword(user.password, checkUser.password);
    if (!checkPassword) {
        throw new Error("Password is incorrect");
    }

    const { userId, name, userFg, phone } = checkUser;
    return { userId, name, userFg, phone };
};

const existUser = async (user) => {
    if (user) {
        if (user.userId) {
            const checkUser = await getUserById(user.userId);
            if (checkUser) {
                return true;
            }
        }
        if (user.phone) {
            const checkPhone = await getUserByPhone(user.phone);
            if (checkPhone) {
                return true;
            }
        }
    }

    return false;
};

const helpUser = async (user) => {
    if (user) {
        if (user.userId) {
            const checkUser = await getUserById(user.userId);
            if (checkUser && (checkUser.phone.country == user.phone.country) && (checkUser.phone.number == user.phone.number)) {
                // send auth-code
                return true;
            }
        }
    }

    return false;
};

const helpCodeUser = async (user) => {
    if (user) {
        if (user.userId) {
            const checkUser = await getUserById(user.userId);
            if (checkUser && (checkUser.phone.country == user.phone.country) && (checkUser.phone.number == user.phone.number)) {
                // send auth-code
                return true;
            }
        }
    }

    return false;
};


const getTokenUser = async (event) => {
    const config = useRuntimeConfig();
    const cookie = getCookie(event, config.session);
    if (!cookie) {
        return null;
    }
    const token = await verifyToken(cookie);
    if (!token) {
        return null; 
    }
    const checkUser = await getUserById(token.userId);
    if (!checkUser) {
        return null;
    }
    const { userId, name, userFg, phone } = checkUser;
    return { userId, name, userFg, phone };
};



const allUsers = async (event) => {
    const config = useRuntimeConfig();
    const cookie = getCookie(event, config.session);
    if (!cookie) {
        return null;
    }
    const token = await verifyToken(cookie);
    if (!token) {
        return null; 
    }
    const checkUser = await getUserById(token.userId);
    if (!checkUser) {
        return null;
    }
    if (checkUser.userFg !== '9') {
        return null;
    }
    return await getUsers();
};

const updateName = async (userId, name) => {
    if (!userId || userId == '') return null;
    if (!name || name == '') return null;

    const user = await updateUserName(userId, name);
    return user || null;
};

const updatePassword = async (userId, body) => {
    if (!userId || userId == '') return null;
    if (!body.currentPassword || body.currentPassword == '') return null;
    if (!body.newPassword || body.newPassword == '') return null;

    const { currentPassword, newPassword } = body;
    const checkUser = await getUserById(userId);
    if (!checkUser) {
        throw new Error("User not found");
    }
    const checkPassword = await verifyPassword(currentPassword, checkUser.password);
    if (!checkPassword) {
        throw new Error("Password is incorrect");
    }
    const hashedNewPassword = await hashPassword(newPassword);
    const user = await updateUserPassword(userId, hashedNewPassword);
    return user || null;
};

export { signUpAgree, signUpAgreed, signUpUser, signInUser, existUser, helpUser, helpCodeUser, getTokenUser, allUsers, updateName, updatePassword }
