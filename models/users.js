// models/publicationModel.js
const { db } = require("../config/database.config.js");

// Definición de la colección "publications" en Firebase
const userCollection = db.collection("users");

// Definición de la colección "publications" en Firebase
const counterCollection = db.collection("counter");

module.exports = { userCollection, counterCollection };
