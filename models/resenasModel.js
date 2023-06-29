const pool = require('./bd');

async function getResenas() {
    let query = "SELECT * FROM resenas ORDER BY id desc";
    let rows = await pool.query(query);
    return rows;
}

async function createResena(obj) {
    try {
        let query = "INSERT INTO resenas SET ?";
        let rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function updateResenaById(obj, id) {
    try {
        let query = "UPDATE resenas SET ? WHERE id = ?";
        let rows = await pool.query(query, [obj, id]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function deleteResenaById(id) {
    try {
        let query = "DELETE FROM resenas WHERE id = ?";
        let rows = await pool.query(query, [id]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    getResenas,
    createResena,
    updateResenaById,
    deleteResenaById
}