const MovieModel = require('../model/MovieModel');
const MovieView = require('../view/MovieView');

class MovieController {
    static async create(req, res) {
        try {
            const movieData = {
                ...req.body,
                photo: req.file.path
            };
            const movie = await MovieModel.create(movieData);
            MovieView.display(movie, res);
        } catch (error) {
            res.status(400).send({
                status: false,
                message: error.message,
            });
        }
    }

    static async read(req, res) {
        const movies = await MovieModel.read();
        MovieView.display(movies, res);
    }

    static async update(req, res) {
        const movie = await MovieModel.update(req.params.id, req.body);
        MovieView.display(movie, res);
    }

    static async delete(req, res) {
        const movie = await MovieModel.delete(req.params.id);
        MovieView.display(movie, res);
    }

}

module.exports = MovieController;