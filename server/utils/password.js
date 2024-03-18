import bcrypt from "bcryptjs"

export const verifyPassword = async (password, hash) => {
    const compare = await bcrypt.compare(password, hash);
    if (!compare) {
        throw new Error('Password does not match.');
    }
    return compare;
};


export const hashPassword = async (password) => {
    try {
        const config = useRuntimeConfig();
        const hashedPassword = await bcrypt.hash(password, config.saltRounds);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error encountered during password hashing.');
    }
};