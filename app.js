const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const dbURI =
	'mongodb+srv://mzwallow:1234@cluster0.xwcz4.mongodb.net/mvc?retryWrites=true&w=majority';
mongoose
	.connect(dbURI)
	.then((res) =>
		app.listen(3000, () => {
			console.log('Running on port 3000');
		})
	)
	.catch((err) => console.log(err));

app.set('view engine', 'ejs');
app.set('views', 'views');

const routes = require('./routes/router');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);
