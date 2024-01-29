const { checkAccessToken } = require('../middlewares/check-token-permission');
const {
	registerUser,
	loginUser,
	getUserInfo,
	getAllUsers,
	deleteUser,
	// updateUser,
	checkEmail,
	verifyUser,
    requestPasswordReset,
	validateResetToken,
	resetPassword,
	userInfo,
	updateUserInfo,
	sendResetPassword
} = require('../controllers/user-controller');
const bodyParser = require('body-parser');

class UserRoutes {
	static getRoutes(app, router) {
		router.post('/register', bodyParser.json(), registerUser);
		router.post('/login', bodyParser.json(), loginUser);
		router.post('/getUserInfo', bodyParser.json(), getUserInfo);
		router.get('/allUsers/:role', getAllUsers);
		router.post('/create', checkAccessToken, registerUser);
		router.delete('/delete/:id', checkAccessToken, deleteUser);
		// router.put('/update/:id', checkAccessToken, updateUser);
		router.post('/check-email', bodyParser.json(), checkEmail);
		router.get('/verify-user', verifyUser);
		router.post('/request-password-reset', checkAccessToken, bodyParser.json(), requestPasswordReset);
		router.post('/reset-password', bodyParser.json(), resetPassword);
		router.post('/send-reset-password', bodyParser.json(), sendResetPassword);
		router.post('/validate-reset-token', bodyParser.json(), validateResetToken);
		router.get('/user-info', checkAccessToken, userInfo);
		router.put('/update-user-info', checkAccessToken, bodyParser.json(), updateUserInfo);
	}
}

module.exports = UserRoutes;
