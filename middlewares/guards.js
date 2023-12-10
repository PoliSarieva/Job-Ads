function hasUser() {
    return (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.redirect('/auth/login');
        }
    };
}

function isGuests() {
    return (req, res, next) => {
        if (req.user) {
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