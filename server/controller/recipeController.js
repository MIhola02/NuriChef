const express = require("express");
const router = express.Router();
const upload = require("../DAO/photo-dao");

const createRecipe = require("../abl/recipe/createAbl");
const deleteRecipe = require("../abl/recipe/deleteAbl");
const getRecipe = require("../abl/recipe/getAbl");
const listRecipes = require("../abl/recipe/listAbl");
const updateRecipe = require("../abl/recipe/updateAbl");

// Recipe routes
router.get("/list", listRecipes);
router.get("/get", getRecipe);
router.post("/create", upload.single("photo"), createRecipe);
router.post("/update/", updateRecipe);
router.post("/delete", deleteRecipe);

module.exports = router;