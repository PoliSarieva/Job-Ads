
const {Schema, model, Types}= require('mongoose');

//TODO add USer properties and validation to assignment
const adSchema = new Schema({
    headline: {
        type: String,
        required: true,
        unique: true,
    },
    location: {
        type: String,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    companyDescription: {
        type: String,
        required: true, 
    },
    owner: {
        type: Types.ObjectId,
        ref: 'User',
    },
    usersApplied: {
        type: [Types.ObjectId],
        ref: 'User',
        default: [],
    },
});

adSchema.index({headline: 1}, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const Ad = model('Ad', adSchema);

module.exports = Ad;