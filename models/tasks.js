// models/publicationModel.js
const { db } = require("../config/database.config.js");

// Definición de la colección "publications" en Firebase
const taskCollection = db.collection("tasks");

module.exports = { taskCollection };
