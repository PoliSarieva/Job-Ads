const {Schema, model}= require('mongoose');

//TODO add USer properties and validation to assignment
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    hashedPassword: {
        type: String,
        minlength:[5, 'The password should be at least 5 characters long'],
        required: true,
    },
    description: {
        type: String,
        maxlength:[40, 'The description of skills should be a maximum of 40 characters long'],
        required: true,
    },
    // myAds: {
    //     type: [],
    //     ref: 'Ad'
    // }
});

userSchema.index({email: 1}, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

// userSchema.index({description: 1}, {
//     collation: {
//         locale: 'en',
//         strength: 2
//     }
// });



const User = model('User', userSchema);

module.exports = User;