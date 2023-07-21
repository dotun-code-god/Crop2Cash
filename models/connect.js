const mysql = require('mysql');
const util = require('util');
require('dotenv').config();

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME
});

const query = util.promisify(con.query).bind(con);
con.connect(err => {
    if (err) throw err;
    // console.log("DB Connected!");
})

module.exports = { con, query }