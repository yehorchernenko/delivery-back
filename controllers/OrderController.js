const express = require('express');
const router = express.Router();
const User = require('../entities/User');
const Courier = require('../entities/Courier');
const Order = require('../entities/Order');
const AuthMiddleware = require('../middleware/AuthMiddleware');

router.post('/add', AuthMiddleware, (req, res) => {
    User.findById(req.userId, function (err1, user) {
        if (err1) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");

        Courier.free().exec((err2, couriers) => {
            if (err2) return res.status(500).send("There was a problem finding free courier");

            Order.create({
                courier: couriers[0]._id,
                sender: user._id,
                receiver: req.body.receiver,
                receiverAddress: req.body.receiverAddress,
                senderAddress: req.body.senderAddress,
                info: req.body.info
            }, (err3, order) => {
                if (err3) return res.status(500).send("There was a problem with creating order" + err3);

                res.status(200).send(order);
            })
        })
    });
});

router.get('/my', AuthMiddleware, (req, res) => {
    User.findById(req.userId, function (err1, user) {
        if (err1) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");

        Order.find({$or: [{receiver: req.userId}, {sender: req.userId}]}, (err2, orders) => {
            if (err2) return res.status(400).send("There was a problem finding orders.");
            return res.status(200).send(orders);
        });
    });
});

router.get('/byID/:id', (req, res) => {
    Order.findById(req.params.id, (err, order) => {
        if (err) return res.status(400).send("There was a problem finding orders.");
        return res.status(200).send(order);
    });
});

module.exports = router;