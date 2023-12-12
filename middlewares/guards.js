function hasUser() {
    return (req, res, next) => {
        if (req.email) {
            next();
        } else {
            res.redirect('/auth/login');
        }
    };
}

function isGuests() {
    return (req, res, next) => {
        if (req.email) {
            res.redirect('/');//TODO chec to correct redirect
        } else {
            next();
        }
    };
}

module.exports = {
    hasUser,
    isGuests,
}