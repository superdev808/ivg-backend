const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/user');
const UserAdditional = require('../models/user-additional');
const { validateRegisterInput, validateLoginInput, validateEmail } = require('../utils/validation');
const response = require('../utils/response');

const {sendVerificationEmail} = require('../utils/emailService');

exports.checkEmail = async (req, res) => {
	const data = req.body;
	const { errors, isValid } = validateEmail(data);
	if (!isValid) {
		return response.validationError(res, errors.email);
	}
	try {
		const user = await User.findOne({ email: data.email });

		if (user) {
			return response.conflict(res, {available: false, message: 'Email already exists'});
		} else {
			return response.success(res, { message: 'Email is available.', available: true });
		}
	} catch (error) {
		return response.serverError(res, error.message);
	}
};

exports.registerUser = async (req, res) => {
	// Function to hash password
	async function hashPassword(password) {
		try {
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(password, salt);
			return hash;
		} catch (err) {
			throw err;
		}
	}

	// Validate body
	const { errors, isValid } = validateRegisterInput(req.body);
	console.log('###', req.body);
	if (!isValid) {
		return response.validationError(res, errors);
	}

	// Check if email already exists
	const user = await User.findOne({ email: req.body.email });
	if (user) {
		return response.conflict(res, { message: 'Email already exists' });
	}
	// Create new user
	const newUser = new User({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		phone: req.body.phone,
		password: req.body.password,
		verified: false,
		role: 'User',
	});
	// Create new user additional data
	const newUserAdditional = new UserAdditional({
		organizationName: req.body.organizationName,
		organizationRole: req.body.organizationRole,
		organizationRoleOther: req.body.organizationRoleOther || '',
		dentalPracticeRole: req.body.dentalPracticeRole || '',
		organizationState: req.body.organizationState,
		organizationNumber: req.body.organizationNumber,
		referralSource: req.body.referralSource,
		referralSourceOther: req.body.referralSourceOther || '',
	});

	// Save user
	try {
		newUser.password = await hashPassword(newUser.password);
		const savedUser = await newUser.save();
		newUserAdditional.userId = savedUser._id;
		await newUserAdditional.save();

        // Generate a token for email verification
        const verificationToken = jwt.sign(
            { userId: newUser._id },
            keys.secretOrKey,
            { expiresIn: '1d' } // expires in 1 day
        );

        // Send verification email with the token
        await sendVerificationEmail(savedUser, verificationToken);


		return response.success(res, { message: 'User registered, please check your email to verify your account.', userId: savedUser.Id });

        
	} catch (err) {
		return response.serverError(res, err.message);
	}
};

exports.loginUser = (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}
	const email = req.body.email;
	const password = req.body.password;
	User.findOne({ email }).then((user) => {
		if (!user) {
			return res.status(404).json({ message: 'Email not found' });
		}
        if (!user.verified) {
            return res.status(401).json({ message: 'Account not verified. Please check your email to verify your account.' });
        }
		bcrypt.compare(password, user.password).then((isMatch) => {
			if (isMatch) {
				const payload = {
					id: user.id,
					name: user.name,
				};
				jwt.sign(
					payload,
					keys.secretOrKey,
					{
						expiresIn: 31556926,
					},
					(err, token) => {
						res.json({
							success: true,
							token: token,
							user: {
								email: user.email,
								firstName: user.firstName,
								lastName: user.lastName,
								role: user.role,
							},
						});
					}
				);
			} else {
				return res.status(400).json({ message: 'Password incorrect' });
			}
		});
	});
};

exports.getUserInfo = (req, res) => {
	const email = req.body.email;
	User.findOne({ email }).then((user) => {
		if (!user) {
			return res.status(404).json({ message: 'No user found' });
		} else {
			return res.json({
				success: true,
				user: {
					email: user.email,
					firstName: user.firstName,
					lastName: user.lastName,
					role: user.role,
				},
			});
		}
	});
};

exports.getAllUsers = (req, res) => {
	if (req.params.role === 'Client') {
		return res.status(500).send({ message: "Client can't access to the user list" });
	}
	User.find({})
		.then((result) => {
			return res.json(result);
		})
		.catch((err) => {
			console.log(err);
			return res.status(500).send({ message: err.message || 'Error occurred while reading the users.' });
		});
};

exports.deleteUser = (req, res) => {
	if (!req.params.id) {
		console.log('400 response');
		return res.status(400).send({
			message: 'Invalid Request',
		});
	}

	const { email, firstName, lastName } = req.body;
	const userName = firstName + ' ' + lastName;

	User.findByIdAndRemove(req.params.id)
		.then(() => {
			return res.json(req.body);
		})
		.catch((err) => {
			if (err.kind === 'ObjectId') {
				return res.status(404).send({
					message: 'Not found with id ' + req.params.id,
				});
			}
			return res.status(500).send({
				message: 'Error deleting user with id ' + req.params.id,
			});
		});
};

exports.updateUser = (req, res) => {
	if (!req.params.id) {
		console.log('400 response');
		return res.status(400).send({
			message: 'Invalid Request',
		});
	}

	const newUser = new User({
		...req.body,
	});

	bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(newUser.password, salt, (err, hash) => {
			if (err) throw err;
			newUser.password = hash;
			User.findByIdAndUpdate(req.params.id, newUser, { new: true })
				.then((user) => {
					if (!user) {
						return res.status(404).send({
							message: 'Not found with id ' + req.params.id,
						});
					}
					res.send(user);
				})
				.catch((err) => {
					if (err.kind === 'ObjectId') {
						return res.status(404).send({
							message: 'Not found with id ' + req.params.id,
						});
					}
					return res.status(500).send({
						message: 'Error updating user with id ' + req.params.id,
					});
				});
		});
	});
};



exports.verifyUser = async (req, res) => {
	const { token } = req.query;

	try {
		const { userId } = jwt.verify(token, keys.secretOrKey);
		const user = await User.findById(userId);

		if (!user) {
            return response.badRequest(res, { message: 'Invalid token.' });
		}

		user.verified = true;
		await user.save();

        return response.success(res, { message: 'Account verified successfully.' });
	} catch (error) {
		if (error instanceof jwt.TokenExpiredError) {
            return response.badRequest(res, { message: 'Token has expired. Please request a new verification link.' });
		} else {
            return response.serverError(res, { message: error });
		}
	}
};
