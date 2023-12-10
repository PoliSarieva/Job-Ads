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

async function deleteById(id) {
    return await Ad.findByIdAndDelete(id);
}

async function edit(id, ad) {
    const existing = await Ad.findById(id)
    
        existing.headline =ad.headline;
        existing.location =ad.location;
        existing.companyName =ad.companyName;
        existing.companyDescription =ad.companyDescription;

        existing.save();
}

module.exports = {
    create,
    getAll,
    getById,
    getByIdAuthor,
    deleteById,
    edit
}