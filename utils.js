var validCollection = (type) => {
    const validType = ['doctors', 'users', 'hospitals'];

    if (!validType.includes(type)) {
        return false;
    }

    return true;
};

module.exports = validCollection;