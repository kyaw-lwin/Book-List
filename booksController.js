const createError = require('http-errors')

let library = []
let idno = 0

exports.index = function (req,res) {
    res.send(library)
}

exports.create = function(req,res, next) {
    if(!req.body.title) {
        return(next(createError(400,"name is required")))
    }
    library.push({id: idno, title: req.body.title, author: req.body.author, read: req.body.read, type: req.body.type})
    res.send({result:true})
    idno++
}

exports.delete =function (req, res, next) {
    const book = library.find((bookapp) => bookapp.id == req.params.id)
    if(!book){
        return(next(createError(404, "no bookapp with that id")))
    }
    library = library.filter((bookapp) => bookapp.id != req.params.id)
    res.send({result: true})
}

exports.update = function (req, res, next) {
    const book = library.find((bookapp) => bookapp.id == req.params.id)
    if (!req.body.title) {
        return (next(createError(400, "Title is required")))
    }
    if (!book) {
        return (next(createError(404, "no bookapp with that id")))
    }
    library = library.map((bookapp) => {
        if (bookapp.id == req.params.id) {
            bookapp.title = req.body.title
            bookapp.author = req.body.author
            bookapp.read = req.body.read
            bookapp.type = req.body.type
        }
        return bookapp 
    })
    res.send({ result:true})
}

exports.show = function (req, res, next) {
    const book = library.find((bookapp) => bookapp.id == req.params.id)
    if(!book) {
        return(next(createError(404, "no book with that id")))
    }
    res.send(book)
}

exports.sort = function (req, res, next) {
    const book = library.filter((bookapp) => bookapp.type == req.params.type)
    if(!book) {
        return(next(createError(404, "no books of that type")))
    }
    res.send(book)
}