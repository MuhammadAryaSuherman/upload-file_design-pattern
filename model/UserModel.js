const pool = require('../config/database');

class User {
    constructor(email, gender, password, role) {
        this.email = email;
        this.gender = gender;
        this.password = password;
        this.role = role;
    }

    static async create(data) {
        const { email, gender, password, role } = data;
        const result = await pool.query('INSERT INTO users (email, gender, password, role) VALUES ($1, $2, $3, $4) RETURNING *', [email, gender, password, role]);
        return new User(result.rows[0]);
    }

    static async read() {
        const result = await pool.query('SELECT * FROM users');
        return result.rows.map(row => new User(row));
    }

    static async update(id, data) {
        const { email, gender, password, role } = data;
        const result = await pool.query('UPDATE users SET email = $1, gender = $2, password = $3, role = $4 WHERE id = $5 RETURNING *', [email, gender, password, role, id]);
        return new User(result.rows[0]);
    }

    static async delete(id) {
        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
        return new User(result.rows[0]);
    }
}


module.exports = User;
