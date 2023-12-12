const { getFirst, getSearch } = require('../services/adService');

const homeCOntroller = require('express').Router();

//TODo replace with real controller 
homeCOntroller.get('/',async (req, res) => {
    const ad = await getFirst();

    res.render('home', {
        title: 'Home page',
        user: req.user,
        ad
    });
});

homeCOntroller.get('/search', async (req, res) => {
    //console.log(req.query);
    await getSearch(req.query.search);
    res.render('search', {
        title: 'Search'
    });
})

module.exports = homeCOntroller;