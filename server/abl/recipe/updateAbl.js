const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const recipeDao = require("../../DAO/recipe-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    date: { type: "string", format: "date-time" },
    name: { type: "string" },
    desc: { type: "string" },
    ingredients: {
      type: "array",
      items: { type: "string", pattern: "^(?!\\s*$).+" },
      minItems: 1,
    },
  },
  required: ["id"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    let recipe = req.body;

    // validate input
    const valid = ajv.validate(schema, recipe);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const updatedrecipe = recipeDao.update(recipe);
    if (!updatedrecipe) {
      res.status(404).json({
        code: "recipeNotFound",
        message: `recipe ${recipe.id} not found`,
      });
      return;
    }

    res.json(updatedrecipe);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;
