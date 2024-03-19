const users = [
    {
        userId: "hong",
        name: "Marvin Hong",
        password: "$2a$11$RK6oEq9ik4/Ux05tYswCAuzyRiuMQh2G0Xr4C1JgG1EQEc8DmR.ci",
        phone: {
            country: '+82',
            number: '01011112222',
        },
        userFg: '9',
    },
    {
        userId: "test",
        name: "Auth Test",
        password: "$2a$11$fQfqBp7q5n..D0Ryw4qL3uONSapqFECLhnEFkbo.2dQ9SWgkgXckq",
        phone: {
            country: '+1',
            number: '01012341234',
        },
        userFg: '2',
    }
];
  
const getUsers = async () => {
    return Promise.resolve(users.map(user => {
        const { userId, name, password, phone, userFg } = user;
        return { userId, name, password, phone, userFg };
    }));
};

const getUserById = async (userId) => {
    const foundUser = users.find(u => u.userId === userId);
    return Promise.resolve(foundUser || null);
};

const getUserByPhone = async (phone) => {
    const foundUser = users.find(u => (u.phone.country === phone.country && u.phone.number === phone.number));
    return Promise.resolve(foundUser || null);
};

const createUser = async (user) => {
    users.push({
        userId: user.userId,
        name: user.name,
        password: user.password,
        phone: {
            country: user.phone.country,
            number: user.phone.number,
        },
        userFg: '1',
    });

    const newUser = users.find(u => u.userId === user.userId);
    return Promise.resolve(newUser || null);
};

const updateUserName = async (userId, name) => {
    const userToUpdate = users.find(user => user.userId === userId);
    
    if (!userToUpdate) {
        throw new Error(`User with userId ${userId} not found`);
    }
    
    userToUpdate.name = name;
    
    return userToUpdate;
};
  
  
export { getUsers, getUserById, getUserByPhone, createUser, updateUserName }