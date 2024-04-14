const express = require("express");
const cors = require("cors");
const recipeController = require("./controller/recipeController");
const userController = require("./controller/userController");
const app = express();

const path = require("path");
const photoFolderPath = path.join(__dirname, "DAO", "storage", "photoUploads");

app.use(cors());

app.use(express.json());

// Recipes routes
app.use("/api/recipe", recipeController);

// User routes
app.use("/api/user", userController);

// Photos route
app.use("/api/photos", express.static(path.join(photoFolderPath)));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
