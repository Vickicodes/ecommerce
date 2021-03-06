require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const methodOverride = require('method-override');

const authRouter = require('./routes/admin/auth');
const adminProductsRouter = require('./routes/admin/products');
const landingRouter = require('./routes/landing');
const cartsRouter = require('./routes/carts');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	cookieSession({
		keys: [ process.env.COOKIE_KEY ]
	})
);
app.use(methodOverride('_method'));

app.use(authRouter);
app.use(adminProductsRouter);
app.use(landingRouter);
app.use(cartsRouter);

app.listen(3000, () => {
	console.log('app listening on port 3000');
});
