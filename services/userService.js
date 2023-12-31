const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User')

const JWT_SECRET = 'sgvzseorigszo;ierhjiosetjhiozesajdhiaei';

async function register(email, password, description) {
    const existing = await User.findOne({email})
                                .collation({locale: 'en', strength: 2});

    if(existing) {
        throw new Error('email is taken');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        hashedPassword,
        description,
    });

    //TODO see if user is create session and autimatically login
    const token = createSession(user);

    return token;
}

async function login(email, password) {
    const user = await User.findOne({email}).collation({locale: 'en', strength: 2})
    if (!user) {
        throw new Error('Incorect email or password')
    }

    const hasMatch = await bcrypt.compare(password, user.hashedPassword);

    if (hasMatch == false) {
        throw new Error('Incorect email or password');
    }

    const token = createSession(user);

    return token;

}

function createSession({_id, email}) {
    const payload = {
        _id,
        email
    };

    const token = jwt.sign(payload, JWT_SECRET);
    return token;
}

function verifyToken(token) {
    return jwt.verify(token, JWT_SECRET);
}

module.exports = {
    register,
    login,
    verifyToken,
}