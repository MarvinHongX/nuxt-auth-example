import jwt from "jsonwebtoken"

const createAgreeToken = async (agrees) => {
    const config = useRuntimeConfig();
    return await jwt.sign(
        {
            agrees: agrees,
        },
        config.tokenSecret,
        {
            expiresIn: config.tokenExpiration
        }
    );
};

const verifyAgreeToken = async (token) => {
    try {
        const config = useRuntimeConfig();
        return await jwt.verify(token, config.tokenSecret);
    } catch (err) {
        return null;
    }
};


const createToken = async (user) => {
    const config = useRuntimeConfig();
    return await jwt.sign(
        {
            userId: user.userId,
        },
        config.tokenSecret,
        {
            expiresIn: config.tokenExpiration
        }
    );
};

const verifyToken = async (token) => {
    try {
        const config = useRuntimeConfig();
        return await jwt.verify(token, config.tokenSecret);
    } catch (err) {
        return null;
    }
};

export { createAgreeToken, verifyAgreeToken, createToken, verifyToken }
