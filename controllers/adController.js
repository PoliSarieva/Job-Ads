const { getAll, create, getById, getByIdAuthor, deleteById, edit } = require('../services/adService');
const { parseError } = require('../util/parser');

const adController = require('express').Router();

adController.get('/create', async (req, res) => {
    res.render('create', {
        title: 'Create Ad'
    });
});

adController.post('/create', async (req, res) => {
    const ad = {
        headline: req.body.headline,
        location: req.body.location,
        companyName: req.body.companyName,
        companyDescription: req.body.companyDescription,
        owner:req.user._id,
    }


    try {
        if (req.body.headline.length < 4) {
            throw new Error('The Headline should be a minimum of 4 characters long');
        };

        if (req.body.location.length < 8) {
            throw new Error('The Location should be a minimum of 8 ');
        };

        if (req.body.companyName.length < 3) {
            throw new Error('The Company name should be at least 3 characters');
        };

        if (req.body.companyDescription.length > 40) {
            throw new Error('The Company description should be a maximum of 40 characters long');
        };

        await create(ad);
        res.redirect('/ads/catalog');
    } catch (error) {
        res.render('create', {
            title: 'Create Ad',
            errors: parseError(error),
            ad,
        });
    }
 });

 adController.get('/catalog', async (req, res) => {
   const ads = await getAll();

    res.render('catalog', {
        title: 'All ads',
        ads
    });
 });

adController.get('/:id/details', async (req, res) => {
    const id = req.params.id;
   const ad = await getById(id);
   const authorPath = await getByIdAuthor(id);
   const author = authorPath.owner.email;
   const isOwner = '';
    let isAuthor = false;
    if(author == req.email?.email) {
        isAuthor = true;
    }
   

    res.render('details', {
        title: 'Details Ad',
        headline: ad.headline,
        location: ad.location,
        companyName: ad.companyName,
        companyDescription: ad.companyDescription,
        id: ad._id,
        author,
        isAuthor,
    });
});

adController.get('/:id/delete', async (req, res) => {
    const id = req.params.id;
    const ad = await getById(id);

    await deleteById(id);
    res.redirect('/ads/catalog');
});

adController.get('/:id/edit', async (req, res) => {
    const id = req.params.id;
    const ad = await getById(id);

    res.render('edit', {
        title: 'Edit Ad',
        ad,
    })
    
});

adController.post('/:id/edit', async (req, res) => {
    const id = req.params.id;
    const ad = await getById(id);
    const edited = {
        headline: req.body.headline,
        location: req.body.location,
        companyName: req.body.companyName,
        companyDescription: req.body.companyDescription,
    }

    await edit(id, edited)
    res.redirect(`/ads/${req.params.id}/details`);
});

module.exports = adController;