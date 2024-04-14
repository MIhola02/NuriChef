const recipeDao = require("../../DAO/recipe-dao");

async function ListAbl(req, res) {
  try {
    const recipeList = recipeDao.list();
    res.json(recipeList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;
