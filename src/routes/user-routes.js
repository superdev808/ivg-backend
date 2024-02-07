const { checkAccessToken } = require('../middlewares/check-token-permission');
const {
	registerUser,
	loginUser,
	getAllUsers,
	deleteUser,
	checkEmail,
	verifyUser,
	requestPasswordReset,
	validateResetToken,
	resetPassword,
	getUserInfo,
	updateUserInfo,
	updateUser,
	sendResetPassword,
	uploadLogo,
	sendVerification,
	deactivateUser,
	verifyToken,
} = require('../controllers/user-controller');
const bodyParser = require('body-parser');

class UserRoutes {
	static getRoutes(app, router) {
		router.post('/register', bodyParser.json(), registerUser);
		router.post('/login', bodyParser.json(), loginUser);

		router.post('/create', checkAccessToken, registerUser);
		router.delete('/delete/:id', checkAccessToken, deleteUser);
		router.post('/deactivate-user', checkAccessToken, bodyParser.json(), deactivateUser);
		router.get('/users-list', checkAccessToken, getAllUsers);
		router.get('/user-info', checkAccessToken, getUserInfo);
		router.put('/update-user', checkAccessToken, bodyParser.json(), updateUser);
		router.put('/update-user-info', checkAccessToken, bodyParser.json(), updateUserInfo);
		router.post('/upload-logo', checkAccessToken, bodyParser.json(), uploadLogo);
		router.post('/check-email', bodyParser.json(), checkEmail);
		router.get('/verify-user', verifyUser);
		router.post('/request-password-reset', bodyParser.json(), requestPasswordReset);
		router.post('/reset-password', bodyParser.json(), resetPassword);
		router.post('/send-reset-password', checkAccessToken, bodyParser.json(), sendResetPassword);
		router.post('/validate-reset-token', bodyParser.json(), validateResetToken);
		router.post('/send-verification-email', checkAccessToken, bodyParser.json(), sendVerification);
		router.post('/verify-token', checkAccessToken, verifyToken);
	}
}

module.exports = UserRoutes;
