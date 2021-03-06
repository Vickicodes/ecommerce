const { check, validationResult } = require('express-validator');
const usersRepo = require('../../repositories/users');

module.exports = {
	requireTitle: check('title')
		.trim()
		.isLength({ min: 1, max: 40 })
		.withMessage('Please include a title, max characters 40'),

	requirePrice: check('price').trim().toFloat().isFloat({ min: 0.01 }).withMessage('must be a number'),

	requireEmail: check('email')
		.trim()
		.normalizeEmail()
		.isEmail()
		.withMessage('must be a valid email')
		.custom(async (email) => {
			const existingUser = await usersRepo.getOneBy({ email });
			if (existingUser) {
				throw new Error('Email in use');
			}
		}),

	requirePassword: check('password')
		.trim()
		.isLength({ min: 4, max: 20 })
		.withMessage('must be between 4 and 20 characters'),

	requirePasswordConfirmation: check('passwordConfirmation')
		.trim()
		.isLength({ min: 4, max: 20 })
		.withMessage('must be between 4 and 20 characters')
		.custom((passwordConfirmation, { req }) => {
			if (passwordConfirmation !== req.password) {
				throw new Error('passwords must match');
			}
		}),

	requireEmailExists: check('email')
		.trim()
		.normalizeEmail()
		.isEmail()
		.withMessage('must be a valid email')
		.custom(async (email) => {
			const user = await usersRepo.getOneBy({ email });
			if (!user) {
				throw new Error('Email not found');
			}
		}),

	requireValidPasswordForUser: check('password').trim().custom(async (password, { req }) => {
		const user = await usersRepo.getOneBy({ email: req.body.email });
		if (!user) {
			throw new Error('Invalid password');
		}
		const validPassword = await usersRepo.comparePasswords(user.password, password);
		if (!validPassword) {
			throw new Error('Invalid password');
		}
	})
};
