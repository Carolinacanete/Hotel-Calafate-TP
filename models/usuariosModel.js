const pool = require('./bd');
const md5 = require("md5");

const getByUsernameAndPassword = async (user, password) => {
    try {
        var query = 'SELECT * FROM usuarios WHERE usuario = ? AND password = ? LIMIT 1';
        var rows = await pool.query(query, [user, md5(password)]);
        return rows[0];
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getByUsernameAndPassword
};