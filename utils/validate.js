export const validateUserId = (userId) => {
    // Allow only 4 to 20 characters of lowercase letters, numbers, and special characters (_), (-)
    const userIdRegex = /^[a-z0-9_-]{4,20}$/;
    return userIdRegex.test(userId);
}

export const validatePassword = (password) => {
    // Require 8 to 16 characters of letters, numbers, and special characters
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

    return passwordRegex.test(password);
}

export const validatePhoneNumber = (phoneNumber) => {
    // Allow only 10 or 11 digits
    const phoneRegex = /^\d{10,11}$/;
    return phoneRegex.test(phoneNumber);
}

export const existUserById = async (userId) => {
    return await existUser(userId, null);
}

export const existUserByPhone = async (phone) => {
    return await existUser(null, phone);
}


export const existUser = async (userId, phone) => {
    try {
        const response = await $fetch('/api/user/exist', {
            method: 'POST',
            body: { userId: userId, phone: phone }
        });
        if (response.exist) {
            return true
        }
    } catch (error) {
        console.error('Error existUser:', error);
        return true;
    }
    return false;
}


export const errorsHelp = (editing, userId, country, phoneNumber, errors) => {
    if (editing.value && userId.value == '') {
        errors.value.help = 'Username: Required field.';
        return
    } 
    
    if (editing.value && (phoneNumber.value == '' || country.value.code == '')) {
        errors.value.help = 'Phone Number: Required field.';
        return
    } 
    
    if (phoneNumber.value !== '' && !validatePhoneNumber(phoneNumber.value)) {
        errors.value.help = 'Phone Number: Only 10~11 digits are allowed.';
        return
    }

    errors.value.help = '';
}

export const errorsSignIn = (editing, userId, password, errors) => {
    if (editing.value && (userId.value == '' && password.value == '')) {
        errors.value.signIn = 'Username, Password: Required fields.';
        return
    } 
    if (editing.value && userId.value == '') {
        errors.value.signIn = 'Username: Required field.';
        return
    } 
    if (editing.value && password.value == '') {
        errors.value.signIn = 'Password: Required field.';
        return
    } 
    errors.value.signIn = '';
}

export const errorsUserId = async (editing, userId, errors) => {
    if (editing.value && userId.value == '') {
        errors.value.userId = 'Username: Required field.';
        return
    } 

    if (userId.value !== '' && !validateUserId(userId.value)) {
        errors.value.userId = 'Username: 4-20 characters, lowercase, numbers, \'_\', \'-\' only.';
        return
    }

    try {
        const exists = await existUserById(userId.value);
        if (userId.value !== '' && exists) {
            errors.value.userId = 'Username: This username is not available.';
            return;
        }
    } catch (error) {
        console.error(error);
        return;
    }

    errors.value.userId = '';
}

export const errorsPassword = (editing, password, confirmPassword, errors) => {
    if (editing.value && (password.value == '' || password.value == '')) {
        errors.value.password = 'Password: Required field.';
        return
    } 

    if (password.value !== '' && !validatePassword(password.value)) {
        errors.value.password = 'Password: 8-16 characters with letters, numbers, and special characters.';
        return
    }

    if (password.value !== '' && confirmPassword.value !== '' && validatePassword(password.value) && password.value !== confirmPassword.value) {
        errors.value.password = 'Password: Passwords do not match.';
        return
    }

    errors.value.password = '';
}

export const errorsName = (editing, name, errors) => {
    if (editing.value && (name.value == '')) {
        errors.value.name = 'Name: Required field.';
        return
    } 

    errors.value.name = '';
}

export const errorsPhone = async (editing, country, phoneNumber, errors) => {
    if (editing.value && (phoneNumber.value == '' || country.value.code == '')) {
        errors.value.phone = 'Phone Number: Required field.';
        return
    } 
    
    if (phoneNumber.value !== '' && !validatePhoneNumber(phoneNumber.value)) {
        errors.value.phone = 'Phone Number: Only 10~11 digits are allowed.';
        return
    }

    try {
        const phone = {
            country: country.value.code,
            number: phoneNumber.value,
        }
        const exists = await existUserByPhone(phone);
        if (phoneNumber.value !== '' && exists) {
            errors.value.phone = 'Phone Number: This phone number is not available.';
            return;
        }
    } catch (error) {
        console.error(error);
        return;
    }

    errors.value.phone = '';
}