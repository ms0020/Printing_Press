
const getPagination = (query) => {
    const page = query.page ? parseInt(query.page) : 1;
    const limit = query.limit ? parseInt(query.limit) : 10;
    const skip = (page - 1) * limit;
    return { skip, limit };
};

module.exports = { getPagination };
