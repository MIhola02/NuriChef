const Ajv = require("ajv");
const ajv = new Ajv();
const recipeDao = require("../../DAO/recipe-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function GetAbl(req, res) {
  try {
    // get request query or body
    const reqParams = req.query?.id ? req.query : req.body;

    // validate input
    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // read recipe by given id
    const recipe = recipeDao.get(reqParams.id);
    if (!recipe) {
      res.status(404).json({
        code: "recipeNotFound",
        message: `recipe ${reqParams.id} not found`,
      });
      return;
    }
    res.json(recipe);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetAbl;
