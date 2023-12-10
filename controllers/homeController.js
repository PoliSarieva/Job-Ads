const homeCOntroller = require('express').Router();

//TODo replace with real controller 
homeCOntroller.get('/', (req, res) => {
    res.render('home', {
        title: 'Home page',
        user: req.user,
    });
});

module.exports = homeCOntroller;