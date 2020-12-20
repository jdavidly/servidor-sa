const mysql = require('mysql');

const conn = mysql.createPool({
    host: 'us-cdbr-east-02.cleardb.com',
    user: 'baa4e1dd95ab72',
    password: '71bcc7d1',
    database: 'heroku_6d4806f4a1447f9'
});

module.exports = conn;