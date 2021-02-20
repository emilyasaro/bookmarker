const { Sequelize, DataTypes, Model } = require("sequelize");

const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/bookmarker",
  { logging: false }
);

class Bookmark extends Model {}

Bookmark.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
  },
  { sequelize: db, modelName: "bookmarks" }
);

class Category extends Model {}

Category.init(
  {
    title: {
      type: DataTypes.STRING,
    },
  },
  { sequelize: db, modelName: "categories" }
);

Bookmark.belongsTo(Category);
Category.hasMany(Bookmark);

const syncAndSeed = async () => {
  try {
    await db.sync({ force: true });
    const [shop, search, entertainment] = await Promise.all(
      ["shop", "search", "entertainment"].map((title) =>
        Category.create({ title })
      )
    );
    const [Etsy, Amazon, Chewy] = await Promise.all(
      ["Etsy", "Amazon", "Chewy"].map((name) =>
        Bookmark.create({ name, url: `${name}.com`, categoryId: shop.id })
      )
    );
    const [Google, Bing, Wikipedia] = await Promise.all(
      ["Google", "Bing", "Wikipedia"].map((name) =>
        Bookmark.create({ name, url: `${name}.com`, categoryId: search.id })
      )
    );
    const [Netflix, Jackbox, Hulu] = await Promise.all(
      ["Netflix", "Jackbox", "Hulu"].map((name) =>
        Bookmark.create({
          name,
          url: `${name}.com`,
          categoryId: entertainment.id,
        })
      )
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  Bookmark,
  Category,
  syncAndSeed,
};
