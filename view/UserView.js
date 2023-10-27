class UserView {
    static display(user, res) {
        res.json(user);
    }
}
module.exports = UserView;
