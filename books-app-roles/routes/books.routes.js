const express = require('express')
const { isLoggedIn, checkRoles } = require('../middlewares/route-guard')
const router = express.Router()

const Book = require('../models/Book.model')

// books list
router.get("/listado", (req, res, next) => {

  const userRole = {
    isAdmin: req.session.currentUser?.role === 'ADMIN',
    isEditor: req.session.currentUser?.role === 'EDITOR'
  }

  Book
    .find()
    .select({ title: 1 })
    .sort({ title: 1 })
    .then(books => res.render('books/list-page', { books, userRole }))
    .catch(err => console.log(err))
})


// owned books list
router.get("/mis-libros", isLoggedIn, (req, res, next) => {

  const { _id: owner } = req.session.currentUser

  Book
    .find({ owner })
    .select({ title: 1 })
    .sort({ title: 1 })
    .then(books => res.render('books/list-page', { books }))
    .catch(err => console.log(err))

})


// book details
router.get('/detalles/:book_id', (req, res) => {

  const { book_id } = req.params

  Book
    .findById(book_id)
    .then(book => res.render('books/details-page', book))
    .catch(err => console.log(err))
})


// new book form (render) - PROTECTED
router.get("/crear", isLoggedIn, checkRoles('ADMIN', 'EDITOR'), (req, res, next) => {
  res.render("books/create-page")
})


// new book form (handler) - PROTECTED
router.post("/crear", isLoggedIn, checkRoles('ADMIN', 'EDITOR'), (req, res, next) => {

  const { title, description, author, rating } = req.body
  const { _id: owner } = req.session.currentUser       // owned content

  Book
    .create({ title, description, author, rating, owner })
    .then(newBook => res.redirect(`/libros/detalles/${newBook._id}`))
    .catch(err => console.log(err))
})


// edit book form (render) - PROTECTED
router.get("/editar/:book_id", isLoggedIn, checkRoles('ADMIN', 'EDITOR'), (req, res, next) => {

  const { book_id } = req.params

  Book
    .findById(book_id)
    .then(book => res.render("books/edit-page", book))
    .catch(err => console.log(err))
})


// edit book form (handler) - PROTECTED
router.post("/editar/:book_id", isLoggedIn, checkRoles('ADMIN', 'EDITOR'), (req, res, next) => {

  const { title, description, author, rating } = req.body
  const { book_id } = req.params      // necesitamos el ID para el método .findByIdAndUpdate()

  Book
    .findByIdAndUpdate(book_id, { title, description, author, rating })
    .then(() => res.redirect(`/libros/detalles/${book_id}`))
    .catch(err => console.log(err))
})


// delete book (de tipo POST!!!!) - PROTECTED
router.post('/eliminar/:book_id', isLoggedIn, checkRoles('ADMIN'), (req, res, next) => {

  const { book_id } = req.params

  Book
    .findByIdAndDelete(book_id)
    .then(() => res.redirect(`/libros/listado`))
    .catch(err => console.log(err))
})


module.exports = router