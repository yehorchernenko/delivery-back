const express = require('express');
const router = express.Router();
const User = require('../entities/User');
const Courier = require('../entities/Courier');
const AuthMiddleware = require('../middleware/AuthMiddleware');

router.post('/add', AuthMiddleware, (req, res) => {
    User.findById(req.userId, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");

        if (user.role === 'ADMIN') {
            Courier.create({
                owner: user._id
            }, (error, courier) => {
                if (error) return res.status(500).send("There was a problem creating courier.");
                res.status(200).send(courier)
            });
        } else {
            if (!user) return res.status(400).send("Only admins can create new admin");
        }
    });
});

router.get('/all', (req, res) => {
    Courier.find({}, (err, couriers) => {
            if (err) return res.status(400).send("There was a problem finding the users.");
            res.status(200).send(couriers);
        });
});

module.exports = router;