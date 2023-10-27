const UserModel = require('../model/UserModel');
const UserView = require('../view/UserView');

class UserController {
    static async create(req, res) {
        const user = await UserModel.create(req.body);
        UserView.display(user, res);
    }

    static async read(req, res) {
        const users = await UserModel.read();
        UserView.display(users, res);
    }

    static async update(req, res) {
        const user = await UserModel.update(req.params.id, req.body);
        UserView.display(user, res);
    }

    static async delete(req, res) {
        const user = await UserModel.delete(req.params.id);
        UserView.display(user, res);
    }
}

module.exports = UserController;

