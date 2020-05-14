require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const usersRepo = require('./repositories/users');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	cookieSession({
		keys: [ process.env.COOKIE_KEY ]
	})
);

app.get('/signup', (req, res) => {
	res.send(`
    <div>
        Your Id is: ${req.session.userId}
        <form action="" method="POST">
            <input type="text" name="email" placeholder="email">
            <input type="password" name="password" placeholder="password">
            <input type="password" name="passwordConfirmation" placeholder="passwordConfirmation">
            <input type="submit">
        </form>
    </div>
    `);
});

app.post('/signup', async (req, res) => {
	const { email, password, passwordConfirmation } = req.body;

	const existingUser = await usersRepo.getOneBy({ email });
	if (existingUser) {
		return res.send('Email in use');
	}

	if (password !== passwordConfirmation) {
		return res.send('passwords must match');
	}

	const user = await usersRepo.create({ email, password });

	req.session.userId = user.id;

	res.send('Account created');
});

app.get('/signin', (req, res) => {
	res.send(`
    <div>
        <form action="" method="POST">
            <input type="text" name="email" placeholder="email">
            <input type="password" name="password" placeholder="password">
            <input type="submit">
        </form>
    </div>
    `);
});

app.post('/signin', async (req, res) => {
	const { email, password } = req.body;

	const user = await usersRepo.getOneBy({ email });

	if (!user) {
		return res.send('Email not found');
	}

	const validPassword = await usersRepo.comparePasswords(user.password, password);
	if (!validPassword) {
		return res.send('Invalid password');
	}

	req.session.userId = user.id;

	res.send('You have signed in');
});

app.get('/signout', (req, res) => {
	req.session = null;
	res.send('You have been logged out');
});

app.listen(3000, () => {
	console.log('app listening on port 3000');
});
