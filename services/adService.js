const Ad = require("../models/Ad");

async function getAll() {
    return await Ad.find({}).lean();
}

async function getById(id) {
    return await Ad.findById(id).lean();
}

async function getByIdAuthor(id) {
    return await Ad.findById(id).populate('owner', 'email');
}

async function create(ad) {
   return await Ad.create(ad);
}

module.exports = {
    create,
    getAll,
    getById,
    getByIdAuthor
}