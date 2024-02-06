const Mailjet = require('node-mailjet');
const fs = require('fs').promises;
const path = require('path');

const mailjet = new Mailjet({
	apiKey: process.env.MJ_APIKEY_PUBLIC || '',
	apiSecret: process.env.MJ_APIKEY_PRIVATE || '',
});

const sendVerificationEmail = async (user, verificationToken) => {
	const templatePath = path.join(__dirname, '..','templates', 'verification-email.html');
	let htmlTemplate = await fs.readFile(templatePath, 'utf8');
	htmlTemplate = htmlTemplate.replace(/{{FIRST_NAME}}/g, user.firstName);
	htmlTemplate = htmlTemplate.replace(/{{FRONTEND_URL}}/g, process.env.FRONTEND_URL);
	htmlTemplate = htmlTemplate.replace(/{{VERIFICATION_TOKEN}}/g, verificationToken);

	const request = mailjet.post('send', { version: 'v3.1' }).request({
		Messages: [
			{
				From: {
					Email: process.env.EMAIL_USER || '',
					Name: 'Ivory Guide',
				},
				To: [
					{
						Email: user.email,
						Name: `${user.firstName} ${user.lastName}`,
					},
				],
				Subject: 'Verify Your Email',
				TextPart: `Confirm your email address to activate your Ivory Guide account by clicking this line: ${process.env.FRONTEND_URL}/verify?token=${verificationToken}`,
				HTMLPart: htmlTemplate,
			},
		],
	});

	request
		.then((result) => {
			return result;
		})
		.catch((err) => {
			throw new Error(err.message);
		});
};

const sendResetPasswordEmail = async (user, token) => {
	const templatePath = path.join(__dirname, '..','templates', 'reset-password-email.html');
	let htmlTemplate = await fs.readFile(templatePath, 'utf8');

	htmlTemplate = htmlTemplate.replace(/{{FIRST_NAME}}/g, user.firstName);
	htmlTemplate = htmlTemplate.replace(/{{FRONTEND_URL}}/g, process.env.FRONTEND_URL);
	htmlTemplate = htmlTemplate.replace(/{{TOKEN}}/g, token);

	const request = mailjet.post('send', { version: 'v3.1' }).request({
		Messages: [
			{
				From: {
					Email: process.env.EMAIL_USER || '',
					Name: 'Ivory Guide',
				},
				To: [
					{
						Email: user.email,
						Name: `${user.firstName} ${user.lastName}`,
					},
				],
				Subject: 'Verify Your Email',
				TextPart: `Reset your Ivory Guide account password by clicking this line: ${process.env.FRONTEND_URL}/reset-password?token=${token}`,
				HTMLPart: htmlTemplate,
			},
		],
	});

	request
		.then((result) => {
			return result;
		})
		.catch((err) => {
			throw new Error(err.message);
		});
};

const sendContactNotification = async (name, email, phone, zip, role, message) => {
	const templatePath = path.join(__dirname, '..','templates', 'contact-notification.html');
	let htmlTemplate = await fs.readFile(templatePath, 'utf8');

	htmlTemplate = htmlTemplate.replace(/{{name}}/g, name);
	htmlTemplate = htmlTemplate.replace(/{{email}}/g, email);
	htmlTemplate = htmlTemplate.replace(/{{phone}}/g, phone);
	htmlTemplate = htmlTemplate.replace(/{{zip}}/g, zip);
	htmlTemplate = htmlTemplate.replace(/{{role}}/g, role);
	htmlTemplate = htmlTemplate.replace(/{{message}}/g, message);
	

	const request = mailjet.post('send', { version: 'v3.1' }).request({
		Messages: [
			{
				From: {
					Email: process.env.EMAIL_USER || '',
					Name: 'Ivory Guide',
				},
				To: [
					{
						Email: 'kenethhu.dev@gmail.com' || '',
						Name: 'Ivory Guide',
					},
				],
				Subject: `[Contact Us] New Message from ${name}`,
				TextPart: `Hello Team, We've received a new message. Here are the details of the submission for your review and action:
				Name: {{name}} |
				Email: {{email}} |
				Phone: {{phone}} |
				Zip Code: {{zip}} |
				Role: {{role}} |
				Message: {{message}}`,
				HTMLPart: htmlTemplate,
			},
		],
	});

	request
		.then((result) => {
			return result;
		})
		.catch((err) => {
			throw new Error(err.message);
		});
};


module.exports = { sendVerificationEmail, sendResetPasswordEmail, sendContactNotification };
