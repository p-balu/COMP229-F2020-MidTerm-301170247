/* book.js
Balachander Rao Palepu, 301170247, 07-02-2021
*/

let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// create a reference to the model
let Book = require("../models/book");

module.exports.displayBookList = (req, res, next) => {
  Book.find((err, bookList) => {
    if (err) {
      return console.error(err);
    } else {
      //console.log(BookList);

      res.render("book/list", { title: "Books", BookList: bookList });
    }
  });
};

module.exports.displayAddPage = (req, res, next) => {
  res.render("book/add", { title: "Add Book" });
};

module.exports.processAddPage = (req, res, next) => {
  console.log("test process add entered");
  let newBook = Book({
    name: req.body.name,
    author: req.body.author,
    published: req.body.published,
    description: req.body.description,
    price: req.body.price,
  });

  Book.create(newBook, (err, Book) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the book list
      res.redirect("/book-list");
    }
  });
};
/*
Add your code here to display EDIT
*/
module.exports.displayEditPage = (req, res, next) => {
  let id = req.params.id;

  Book.findById(id, (err, BookToEdit) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //show the edit view
      res.render("book/edit", {
        title: "Edit Book",
        book: BookToEdit,
      });
    }
  });
};

/*
Add your code here to process EDIT
*/
module.exports.processEditPage = (req, res, next) => {
  console.log("update entered");

  let id = req.params.id;
  console.log(id);
  let editBook = Book({
    _id: req.params.id,
    name: req.body.name,
    author: req.body.author,
    published: req.body.published,
    description: req.body.description,
    price: req.body.price,
  });

  Book.updateOne({ _id: id }, editBook, (err) => {
    console.log("test loop", id);
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      console.log("success");
      // refresh the Book List
      res.redirect("/book-list");
    }
  });
};

/*
Add your code here to perform DELETE operation
*/

module.exports.processDeletePage = (req, res, next) => {
  console.log("delete entered");
  let id = req.params.id;
  Book.deleteOne({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the Book List
      res.redirect("/book-list");
    }
  });
};
