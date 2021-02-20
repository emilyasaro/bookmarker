const { Sequelize, DataTypes, Model } = require("sequelize");

const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/bookmarker"
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
    db.sync({ force: true });
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
  } catch (error) {
    console.log(error);
  }
};
