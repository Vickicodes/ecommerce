const express = require('express');
const cartsRepo = require('../repositories/carts');
const productsRepo = require('../repositories/products');
const cartShowTemplate = require('../views/carts/show');

const router = express.Router();

// ==== Add an item to a cart ====
router.post('/cart/products/:id', async (req, res) => {
	// get or create a cart
	let cart;
	if (!req.session.cartId) {
		cart = await cartsRepo.create({ items: [] });
		req.session.cartId = cart.id;
	} else {
		cart = await cartsRepo.getOne(req.session.cartId);
	}
	// add a new product to the cart or increase quantity of the item
	const existingItem = cart.items.find((item) => item.id === req.params.id);
	if (existingItem) {
		existingItem.quantity++;
	} else {
		cart.items.push({ id: req.params.id, quantity: 1 });
	}

	await cartsRepo.update(cart.id, { items: cart.items });

	res.redirect('/cart');
});

// ==== show all items in the cart ===
router.get('/cart', async (req, res) => {
	if (!req.session.cartId) {
		return res.redirect('/');
	}
	const cart = await cartsRepo.getOne(req.session.cartId);

	for (let item of cart.items) {
		const product = await productsRepo.getOne(item.id);

		item.product = product;
	}
	res.send(cartShowTemplate({ items: cart.items }));
});

// ==== delete an item from the cart
router.delete('/cart/product/:id', async (req, res) => {
	const cart = await cartsRepo.getOne(req.session.cartId);

	const items = cart.items.filter((item) => item.id !== req.params.id);

	await cartsRepo.update(req.session.cartId, { items });
	res.redirect('/cart');
});

module.exports = router;
