const { Bookmark, Category, syncAndSeed } = require("./db.js");
const homepageHtml = require("./views/homePage");
const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "/views/homePage")));

app.get("/categories", async (req, res, next) => {
  try {
    // console.log(homepageHtml);
    const categories = await Category.findAll();
    // console.log(homepageHtml(categories));
    res.send(homepageHtml(categories));
  } catch (error) {
    next(error);
  }
});

const PORT = 3000;

const init = async () => {
  try {
    await syncAndSeed();
    app.listen(PORT, () => {
      console.log(`app listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

init();
