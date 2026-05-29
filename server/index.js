const express = require("express");

const databaseConnection = require("./database");

const bookRouter = require("./routes/book.routes");
const cors = require("cors");
/// database conection
databaseConnection();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello world");
});
app.use("/book", bookRouter);

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Port listening on ${PORT}`);
});
