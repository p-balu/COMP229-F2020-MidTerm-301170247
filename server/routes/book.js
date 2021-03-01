/* book.js
Balachander Rao Palepu, 301170247, 07-02-2021
*/

let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// connect to our Book Model
let Book = require("../models/book");

let bookController = require("../controllers/book");

/* GET Route for the Book List page - READ Operation */
router.get("/", bookController.displayBookList);

/* GET Route for displaying the Add page - CREATE Operation */
router.get("/add", bookController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post("/add", bookController.processAddPage);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get("/edit/:id", bookController.displayEditPage);

/*
 * add your code to
 * POST Route for processing the Edit page - UPDATE Operation
 */

//post method for edit operation
router.post("/edit/:id", bookController.processEditPage);

/* add your code to
 *  GET to perform  Deletion - DELETE Operation
 */
//handle delete
router.get("/delete/:id", bookController.processDeletePage);

module.exports = router;
