const mysql = require('mysql');
const util = require('util');
require('dotenv').config();

const con = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

const query = util.promisify(con.query).bind(con);
con.connect(err => {
    if (err) throw err;
    // console.log("Database Connected!");
})

module.exports = {con, query}