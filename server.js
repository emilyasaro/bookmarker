const { Bookmark, Category, syncAndSeed } = require('./db.js');

const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan("dev"));


app.get('/categories', async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    res.send(categories);
  }
  catch (error) {
    next(error);
  }
})






const PORT = 3000;

const init = async () => {
  try {
    await syncAndSeed();
    app.listen(PORT, () => {console.log(`app listening on port ${PORT}`)})
  }
  catch (error) {
    console.log(error)
  }
}

init()
