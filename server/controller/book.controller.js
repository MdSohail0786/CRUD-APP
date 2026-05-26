const { Book } = require("../models/book.model");

const handleBookStoreController = async (req, res) => {
  try {
    const body = req.body;

    if (
      !body.BookName ||
      !body.BookTitle ||
      !body.Author ||
      !body.SellingPrice
    ) {
      return res
        .status(400)
        .json({ Message: "All field's are required", Success: false });
    }

    const bookAdd = await Book.insertOne(body);

    if (bookAdd) {
      return res.status(201).json({
        Message: "Data created Succesfully !",
        Success: true,
        Id: bookAdd?._id,
      });
    }
    console.log("bookAdd", bookAdd);
  } catch (error) {
    return res.status(500).json({ Message: error.message, Success: false });
  }
};

const handleBookListController = async (req, res) => {
  try {
    const bookList = await Book.find({});
    return res.status(200).json({
      Message: "All books fetched  successful",
      Success: true,
      totalCount: bookList.length,
      BookList: bookList,
    });
  } catch (error) {
    return res.status(400).json({ Message: error.message, Success: false });
  }
};

const handleBookDeleteController = async (req, res) => {
  const body = req.body;
  try {
    const deleted = await Book.deleteOne({ _id: body.Id });

    if (deleted.acknowledged) {
      return res.json({
        Message: "Book deleted successful",
        Success: true,
      });
    }
  } catch (error) {
    return res.status(400).json({ Message: error.message, Success: false });
  }
};
const handleBookUpdateController = async (req, res) => {
  const body = req.body;
  try {
    const updating = await Book.updateOne({ _id: body?.Id }, { $set: body });
    console.log("updating", updating);
    if (updating.acknowledged) {
      return res.json({
        Message: "Book updated successful",
        Success: true,
      });
    }
  } catch (error) {
    return res.status(400).json({ Message: error.message, Success: false });
  }
};

module.exports = {
  handleBookStoreController,
  handleBookListController,
  handleBookDeleteController,
  handleBookUpdateController,
};
