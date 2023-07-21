const mysql = require('mysql');
const util = require('util');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crop2cash'
});

const query = util.promisify(con.query).bind(con);
con.connect(err => {
    if (err) throw err;
    // console.log("Database Connected!");
})

module.exports = {con, query}