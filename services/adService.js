const Ad = require("../models/Ad");

async function getAll() {
    return await Ad.find({}).lean();
}

async function getFirst() {
    return await Ad.find({}).limit(3).lean();
}

async function getSearch(search) {
    const query = {};

    if (search) {
        query.search = new RegExp(search, 'i');
        console.log(query.search);
    }
    
    return Ad.find(query).sort({ createdAt: 1 }).lean();

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
    const existing = await Ad.findById(id);
    
        existing.headline =ad.headline;
        existing.location =ad.location;
        existing.companyName =ad.companyName;
        existing.companyDescription =ad.companyDescription;

        existing.save();
};

async function applyAd(id, userId) {
    const current = await Ad.findById(id)
    current.usersApplied.push(userId);
    current.save();
}

async function appUser(id, userAppId) {
    return await Ad.findById(id).populate({path:'usersApplied', match:{_id: userAppId}}).lean();
}

module.exports = {
    create,
    getAll,
    getById,
    getByIdAuthor,
    deleteById,
    edit,
    applyAd,
    appUser,
    getFirst,
    getSearch,
}