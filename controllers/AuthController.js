const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const User = require('../entities/User');
const AuthMiddleware = require('../middleware/AuthMiddleware');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');

router.post('/register', (req, res) => {

    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create({
            email : req.body.email,
            password : hashedPassword,
            phone: req.body.phone,
            fullName: req.body.fullName
        }, (err, user) => {
            if (err) {
                res.status(500).send({
                    error: 'There was a problem registering the user.'
                })
            } else {
            const token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: config.tokenExpiresIn
            });
            res.status(200).send({data: { auth: true, token: token }});
        }
        });
});

router.get('/me', AuthMiddleware, (req, res, next) => {
    User.findById(req.userId, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");

        res.status(200).send(user);
    });
});

router.use((user, req, res, next) => {
    res.status(200).send(user);
});

router.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }).select('+password').exec((err, user) => {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        const token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: config.tokenExpiresIn
        });
        res.status(200).send({ auth: true, token: token });
    });
});

router.get('/logout', (req, res) => {
    res.status(200).send({ auth: false, token: null });
});

module.exports = router;

