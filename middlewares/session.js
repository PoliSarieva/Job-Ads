const { verify } = require("jsonwebtoken");
const { verifyToken } = require("../services/userService");


module.exports = () => (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        try {
            const userData = verifyToken(token);
            req.email = userData;
            res.locals.email = userData.email;
        } catch (error) {
            res.clearCookie('token');
            res.redirect('/auth/login');
            return;
        }
    }

    next();
}