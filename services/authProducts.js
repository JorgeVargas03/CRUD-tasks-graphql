// services/publicationService.js
const { userCollection } = require("../models/users");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// Create new one user
exports.addUser = async (username, password) => {
  try {
    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    const products = [];

    // Generar una API key aleatoria para el usuario
    const apiKey = crypto.randomBytes(16).toString("hex");

    // Crear el nuevo usuario
    const newUser = await userCollection.add({
      username,
      password: hashedPassword,
      apiKey,
      products,
    });

    return {
      username: username,
      apikey: apiKey,
    };
  } catch (error) {
    throw error;
  }
};

// services/publicationService.js
exports.getApiKey = async (username, password) => {
  try {
    // Buscar el usuario por su nombre de usuario en Firestore
    const userDoc = await userCollection
      .where("username", "==", username)
      .get();

    // Verificar si el usuario existe
    if (userDoc.empty) {
      throw new Error("Usuario o contraseña incorrecta");
    }

    // Obtener el primer documento encontrado
    const user = userDoc.docs[0].data(); // Aquí obtenemos los datos del documento

    // Verificar si la contraseña coincide
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Usuario o contraseña incorrecta");
    }

    // Devolver solo el usuario y api-key en el formato solicitado
    return {
      usuario: user.username,
      "api-key": user.apiKey,
    };
  } catch (error) {
    throw error;
  }
};
