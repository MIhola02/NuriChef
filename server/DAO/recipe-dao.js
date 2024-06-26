const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const recipeFolderPath = path.join(__dirname, "storage", "recipeList");

// Method to read an recipe from a file
function get(recipeId) {
  try {
    const filePath = path.join(recipeFolderPath, `${recipeId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadrecipe", recipe: error.recipe };
  }
}

// Method to write an recipe to a file
function create(recipe) {
  try {
    recipe.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(recipeFolderPath, `${recipe.id}.json`);
    const fileData = JSON.stringify(recipe);
    fs.writeFileSync(filePath, fileData, "utf8");
    return recipe;
  } catch (error) {
    throw { code: "failedToCreaterecipe", recipe: error.recipe };
  }
}

// Method to update recipe in a file
function update(recipe) {
  try {
    const currentrecipe = get(recipe.id);
    if (!currentrecipe) return null;
    const newrecipe = { ...currentrecipe, ...recipe };
    const filePath = path.join(recipeFolderPath, `${recipe.id}.json`);
    const fileData = JSON.stringify(newrecipe);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newrecipe;
  } catch (error) {
    throw { code: "failedToUpdaterecipe", recipe: error.recipe };
  }
}

// Method to remove an recipe from a file
function remove(recipeId) {
  try {
    const filePath = path.join(recipeFolderPath, `${recipeId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoverecipe", recipe: error.recipe };
  }
}

// Method to list recipes in a folder
function list() {
  try {
    const files = fs.readdirSync(recipeFolderPath);
    const recipeList = files.map((file) => {
      const fileData = fs.readFileSync(
        path.join(recipeFolderPath, file),
        "utf8"
      );
      return JSON.parse(fileData);
    });
    return recipeList;
  } catch (error) {
    throw { code: "failedToListrecipes", recipe: error.recipe };
  }
}

function listByOwner(ownerID) {
  console.log("filtering...");
  try {
    const files = fs.readdirSync(recipeFolderPath);
    const recipeList = files
      .map((file) => {
        const fileData = fs.readFileSync(
          path.join(recipeFolderPath, file),
          "utf8"
        );
        const recipe = JSON.parse(fileData);
        return recipe;
      })
      .filter((recipe) => recipe.ownerID === ownerID); // Filter recipes by ownerID
    return recipeList; // Return the filtered list
  } catch (error) {
    throw { code: "failedToListRecipes", message: error.message };
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
  listByOwner,
};
