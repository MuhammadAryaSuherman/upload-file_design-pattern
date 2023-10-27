const pool = require('../config/database');

class Movie {
    constructor(title, genres, year, photo) {
        this.title = title;
        this.genres = genres;
        this.year = year;
        this.photo = photo;
    }

    static async create(data) {
        if (!data) {
            throw new Error('No data provided');
        }

        const { title, genres, year, photo } = data;
        if (!title || !genres || !year || !photo) {
            throw new Error('Missing required fields: title, genres, year, photo');
        }
        const result = await pool.query('INSERT INTO movies (title, genres, year, photo) VALUES ($1, $2, $3, $4) RETURNING *', [title, genres, year, photo]);
        return new Movie(result.rows[0]);
    }


    static async read() {
        const result = await pool.query('SELECT * FROM movies');
        return result.rows.map(row => new Movie(row));
    }

    static async update(id, data) {
        const { title, genres, year, photo} = data;
        const result = await pool.query('UPDATE movies SET title = $1, genres = $2, year = $3, photo = $4 WHERE id = $5 RETURNING *', [title, genres, year, photo, id]);
        return new Movie(result.rows[0]);
    }

    static async delete(id) {
        const result = await pool.query('DELETE FROM movies WHERE id = $1 RETURNING *', [id]);
        return new Movie(result.rows[0]);
    }
}

module.exports = Movie;