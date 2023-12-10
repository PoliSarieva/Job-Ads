const Ad = require("../models/Ad");

async function create(ad) {
   return await Ad.create(ad);
}

module.exports = {
    create,
}