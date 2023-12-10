const validator = require('validator');
const { register, login } = require('../services/userService');
const { parseError } = require('../util/parser');

const authController = require('express').Router();

authController.get('/register', (req, res) => {
    //TODO replace with actual view 
    res.render('register', {
        title: 'Register Page'
    });
});

authController.post('/register',async (req, res) => {
    try {
        if (req.body.email == '' || req.body.password == '' || req.body.description == '') {
            throw new Error('All fields are required')
        };
        
        if (validator.default.isEmail(req.body.email) == false) {
            throw new Error('Invalid email');
        }


        if (req.body.password.length < 5) {
            throw new Error('The password should be at least 5 characters long');
        };

        if (req.body.password != req.body.repass) {
            throw new Error('Password don/t match');
        };

        if (req.body.description.length > 40) {
            throw new Error('The description of skills should be a maximum of 40 characters long');
        };

        const token = await register(req.body.email, req.body.password, req.body.description);

    //TODO check assignment to see if register creates session
        res.cookie('token', token);
    
        res.redirect('/');
        
    } catch (error) {
        const errors = parseError(error);
        //TODO add error displa to actual template
        res.render('register', {
            title: 'Register Page',
            errors,
            body: {
                email: req.body.email,
                description: req.body.description,
            }
        })
    }
});

authController.get('/login', (req, res) => {
    res.render('login',{ 
    title: 'Login page'})
});

authController.post('/login',async (req, res) => {
    try {
       const token = await login(req.body.email, req.body.password);

       res.cookie('token', token);
       res.redirect('/');
    } catch (error) {
        const errors = parseError(error);
        res.render('login',{ 
            title: 'Login page',
            errors,
            body: {
                email: req.body.email
            }
        })
    }
});

authController.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
})

module.exports = authController;