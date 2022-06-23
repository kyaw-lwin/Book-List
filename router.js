const express = require('express');
const router = express.Router();
const booklist = require('./booksController')

// router.get('/', booklist.index)
router.get('/bookapp',  booklist.index) //Gets the book list 
router.post('/bookapp/create', booklist.create) // Create an individual book 
router.delete('/bookapp/:id', booklist.delete) // Remove a book by specific id 
router.put('/bookapp/:id', booklist.update) // change book information 
router.get('/bookapp/:id', booklist.show) // Show book by id 
router.get('/bookapp/type/:type', booklist.sort) //Get book by type 

module.exports = router;