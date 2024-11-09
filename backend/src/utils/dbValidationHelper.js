const validExists = async (model, column, value) => {
    return await model.findOne({
        where: { [column]: value }
    });
};

module.exports = validExists;
