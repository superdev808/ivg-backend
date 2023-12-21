const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/user');
const { validateRegisterInput, validateLoginInput } = require('../utils/validation');
const { last } = require('lodash');

exports.registerUser = (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);
    console.log("###", req.body);
    if (!isValid) {
        return res.status(400).json({ message: 'Valdiation Error' });
    }
    User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            return res.status(400).json({ message: 'Email already exists' });
        } else {
            const newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role,
            });
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then((user) => res.json(user))
                        .catch((err) => console.log(err));
                });
            });
        }
    });
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
