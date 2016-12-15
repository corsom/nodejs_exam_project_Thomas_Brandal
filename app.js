const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

Book =require('./models/book');

// Connect to Mongoose
mongoose.connect('mongodb://localhost/bookstore');
var db = mongoose.connection;

app.get('/', (req, res) => 
{
	res.send('Please use /api/books');
});

app.get('/api/books', (req, res) => 
{
	Book.getBooks((err, books) => 
	{
		if(err){
			throw err;
		}
		res.json(books);
	});
});

app.get('/api/books/:_id', (req, res) => 
{
	Book.getBookById(req.params._id, (err, book) => 
	{
		if(err)
		{
			throw err;
		}
		res.json(book);
	});
});

app.post('/api/books', (req, res) => 
{
	var book = req.body;
	Book.addBook(book, (err, book) => 
	{
		if(err)
		{
			throw err;
		}
		res.json(book);
	});
});

app.put('/api/books/:_id', (req, res) => 
{
	var id = req.params._id;
	var book = req.body;
	Book.updateBook(id, book, {}, (err, book) => 
	{
		if(err)
		{
			throw err;
		}
		res.json(book);
	});
});

app.delete('/api/books/:_id', (req, res) => 
{
	var id = req.params._id;
	Book.removeBook(id, (err, book) => 
	{
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.listen(3000);
console.log('Running on port 3000...');
