const { userCollection } = require("../models/users");

const validateApiKey = async (req, res, next) => {
  try {
    const { apiKey } = req.body; // Tomamos el API Key del body

    if (!apiKey) {
      return res.status(401).json({ message: "API Key es requerida" });
    }

    // Buscar usuario con ese API Key en Firestore
    const userSnapshot = await userCollection.where("apiKey", "==", apiKey).get();

    if (userSnapshot.empty) {
      return res.status(403).json({ message: "API Key inválida" });
    }

    // Si existe, guardamos los datos del usuario en la request
    req.user = userSnapshot.docs[0].data();
    
    next(); // Permitir la ejecución del siguiente middleware/controlador
  } catch (error) {
    return res.status(500).json({ message: "Error al validar API Key", error: error.message });
  }
};

module.exports = validateApiKey;
