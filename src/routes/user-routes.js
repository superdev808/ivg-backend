const { checkAccessToken } = require("../middlewares/check-token-permission");
const { registerUser, loginUser, getUserInfo, getAllUsers, deleteUser, updateUser } = require('../controllers/user-controller');
const bodyParser = require('body-parser');

class UserRoutes {
    static getRoutes(app, router) {
        router.post("/register", bodyParser.json(), registerUser);
        router.post('/login',bodyParser.json(), loginUser);
        router.post('/getUserInfo',bodyParser.json(), getUserInfo);
        router.get('/allUsers/:role', getAllUsers);
        router.post('/create', checkAccessToken, registerUser);
        router.delete('/delete/:id', checkAccessToken, deleteUser);
        router.put('/update/:id', checkAccessToken, updateUser);
    }
}

module.exports = UserRoutes;
