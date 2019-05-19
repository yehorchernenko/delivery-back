const express = require('express');
const router = express.Router();
const mysql      = require('mysql');
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'user',
    password : 'qwerty',
    database : 'cities'
});

//connection.connect();

router.get('/all', (req, res) => {
    connection.query('SELECT * from _cities', function (error, results, fields) {
        if (error) return res.status(500).send(error);

        res.status(200).send(results[0]);
    });
});


//connection.end();

module.exports = router;