const Ajv = require("ajv");
const ajv = new Ajv();
const validateDateTime = require("../../helpers/validate-date-time.js");

ajv.addFormat("date-time", { validate: validateDateTime });

const recipeDao = require("../../DAO/recipe-dao.js");

const schema = {
  type: "object",
  properties: {
    date: { type: "string", format: "date-time" },
    name: { type: "string" },
    desc: { type: "string" },
    ingredients: {
      type: "array",
      items: { type: "string", pattern: "^(?!\\s*$).+" },
      minItems: 1,
    },
    ownerID: { type: "string" },
    photoFilename: { type: "string" },
  },
  required: ["date", "name"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    // JSON string under 'recipe' ky
    let recipe = JSON.parse(req.body.recipe);

    // File informatio in req.file
    if (req.file) {
      console.log("Uploaded file:", req.file);
      recipe.photoFilename = req.file.filename;
    }

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

    recipe = await recipeDao.create(recipe); // Ensure this is awaited or handled correctly
    res.json(recipe);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;
