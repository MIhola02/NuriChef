const express = require("express");
const router = express.Router();

const createUser = require("../abl/user/createAbl");
const deleteUser = require("../abl/user/deleteAbl");
const getUser = require("../abl/user/getAbl");
const listUsers = require("../abl/user/listAbl");
const updateUser = require("../abl/user/updateAbl");

// User routes
router.get("/list", listUsers);
router.get("/get", getUser);
router.post("/create", createUser);
router.post("/update/", updateUser);
router.post("/delete", deleteUser);

module.exports = router;
