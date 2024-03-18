export const shortenStr = (str, prefixLength = 7, suffixLength = 7) => {
    if (!str || typeof str !== 'string') {
        return '';
    }

    const maxLength = prefixLength + suffixLength + 3; // 3 is for '...'
    if (str.length <= maxLength) {
        return str; // No need to shorten
    }

    const prefix = str.slice(0, prefixLength);
    const suffix = str.slice(-suffixLength);

    return `${prefix}...${suffix}`;
}

export const getUserFgName = (userFg) => {
    switch (userFg) {
        case '1':
            return 'Associate Member';
        case '2':
            return 'Full Member';
        case '6':
            return 'Admin'
        case '9':
            return 'Developer';
        default:
            return '';
    }
};

export const getFormattedPhoneNumber = (phone) => {
    const { country, number } = phone;
    const firstGroupLength = 3;
    return `${country} ${number.slice(0, firstGroupLength)}-${number.slice(firstGroupLength, firstGroupLength + 4)}-${number.slice(firstGroupLength + 4, firstGroupLength + 8)}-${number.slice(firstGroupLength + 8)}`.replace(/[-]+$/, '');
};




export const getCountryCodeByPhoneCode = (phoneCode) => {
    const jsonData = [
        {"name": "Korea, Republic of", "code": "KR", "dialingCode": "+82"},
        {"name": "United States", "code": "US", "dialingCode": "+1"},
        {"name": "China", "code": "CN", "dialingCode": "+86"},
        {"name": "Japan", "code": "JP", "dialingCode": "+81"},
        {"name": "Viet Nam", "code": "VN", "dialingCode": "+84"},
        {"name": "Philippines", "code": "PH", "dialingCode": "+63"},
        {"name": "Thailand", "code": "TH", "dialingCode": "+66"},
    ]

    const foundCountry = jsonData.find(country => country.dialingCode === phoneCode);

    return foundCountry ? foundCountry.code.toLowerCase() : null;

}