/* book.js
Balachander Rao Palepu, 301170247, 07-02-2021
*/

let mongoose = require('mongoose');

// create a model class

/**
 * add your code to 
 * create your model here
 * 
 */
let bookModel = mongoose.Schema(
    {
      name: String,
      author: String,
      description: String,
      price: Number,
      published: Number,
    },
    {
      collection: "books",
    }
  );

module.exports = mongoose.model('Book', bookModel);