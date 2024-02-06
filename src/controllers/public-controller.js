const response = require('../utils/response');
const axios = require('axios');
const { sendContactNotification } = require('../utils/emailService');
const { validateContactForm } = require('../utils/validation');

exports.submitContactForm = async (req, res) => {
	try {
		const { errors, isValid } = validateContactForm(req.body);
		if (!isValid) {
			return response.validationError(res, errors);
		}
		const { name, email, phone, zip, role, message, token } = req.body;

		const secret = process.env.RECAPTCHA_SECRET_KEY || '';

		const googleResponse = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`);
		const { success } = googleResponse.data;

		if (!success) {
			return response.validationError(res, { token: 'Invalid captcha' });
		}

		sendContactNotification(name, email, phone, zip, role, message);
		return response.success(res, { message: 'Message successfully sent.' });
	} catch (error) {
		return response.serverError(res, error.message);
	}
};
