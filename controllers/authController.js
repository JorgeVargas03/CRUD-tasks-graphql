const authPubs = require("../services/authProducts");

// Crear un nuevo usuario
exports.addOneUser = async (req, res) => {
  try {
    const { username, password } = req.body; // Obtén el username y password desde el cuerpo de la solicitud

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username y password son obligatorios" });
    }

    // Pasa los datos a la función addUser
    const pub = await authPubs.addUser(username, password);

    if (pub) {
      res.status(200).json(pub);
    } else {
      res
        .status(400)
        .json({ message: "No se pudo crear al usuario, intente de nuevo" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el usuario", error: error.message });
  }
};

// Consultar la API Key
exports.getApiKey = async (req, res) => {
  try {
    const { username, password } = req.body; // Obtén el username y password desde el cuerpo de la solicitud

    // Validación de los parámetros requeridos
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username y password son obligatorios" });
    }

    // Llamar a la función getApiKey del servicio
    const apiKey = await authPubs.getApiKey(username, password);

    // Si no se obtiene una API key o no contiene la propiedad 'api-key', retorna un error
    if (!apiKey || !apiKey["api-key"]) {
      return res
        .status(404)
        .json({ message: "Usuario no encontrado o contraseña incorrecta" });
    }

    // Si la API key es válida, devolverla en la respuesta
    res.status(200).json({
      usuario: apiKey.usuario,
      "api-key": apiKey["api-key"], // Respuesta solo con usuario y api-key
    });
  } catch (error) {
    console.error("Error al obtener la API key:", error.message); // Solo mostrar el mensaje de error
    if (error.message === "Usuario o contraseña incorrecta") {
      // No generamos un error 500, solo se maneja el error de usuario incorrecto
      return res
        .status(404)
        .json({ message: "Usuario no encontrado o contraseña incorrecta" });
    }
    // Si es otro tipo de error, generamos un error 500
    res
      .status(500)
      .json({ message: "Error al obtener el api key", error: error.message });
  }
};
