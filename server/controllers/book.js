/* book.js
Balachander Rao Palepu, 301170247, 07-02-2021
*/
//book controller
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// create a reference to the model
let Book = require("../models/book");

//display book list
module.exports.displayBookList = (req, res, next) => {
  Book.find({})
    .sort("name")
    .exec(function (err, bookList) {
      if (err) {
        return console.error(err);
      } else {
        //console.log(BookList);

        res.render("book/list", { title: "Books", BookList: bookList });
      }
    });
};

//display Add Page
module.exports.displayAddPage = (req, res, next) => {
  res.render("book/add", { title: "Add Book" });
};

//process Add Page
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
//display Edit page
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
//process Edit Page
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
//preocess delete Page
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
