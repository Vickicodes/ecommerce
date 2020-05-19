const layout = require('../layout');
const { getError } = require('../../helpers');

module.exports = ({ errors }) => {
	return layout({
		content: `
        <form method="POST">
            <input type="text" placeholder="title" name="title">
            <input type="text" placeholder="price" name="price">
            <input type="file" name="image">
            <button class="button is-primary">Submit</button>
        </form>
        `
	});
};
