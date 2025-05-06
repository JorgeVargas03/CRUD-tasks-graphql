const authPubs = require("../services/serviceProducts");

// Obtener todos los productos de un usuario usando la api-key
exports.getProducts = async (req, res) => {
  try {
    const { apiKey } = req.body; // Obtén la api-key desde el cuerpo de la solicitud

    // Validar que la api-key esté presente
    if (!apiKey) {
      return res.status(400).json({ message: "La api-key es obligatoria" });
    }

    // Llamar a la función del servicio para obtener los productos
    const products = await authPubs.getProductsByApiKey(apiKey);

    // Si no se encuentran productos, responde con un arreglo vacío
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No se encontraron productos" });
    }

    // Responder con los productos del usuario
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener los productos",
      error: error.message,
    });
  }
};

// Obtener un producto por ID
exports.getProductById = async (req, res) => {
  try {
    const { apiKey } = req.body;
    const { id } = req.params;

    // Validar que la api-key y el id estén presentes
    if (!apiKey || !id) {
      return res.status(400).json({ message: "La api-key y el id son obligatorios" });
    }

    // Llamar a la función del servicio para obtener el producto por ID
    const product = await authPubs.getProductById(apiKey, id);

    // Responder con el producto encontrado
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener el producto",
      error: error.message,
    });
  }
};

// Agregar un producto al usuario
exports.addProduct = async (req, res) => {
  try {
    const { apiKey, product } = req.body;

    // Validar que apiKey y product estén presentes
    if (!apiKey || !product) {
      return res.status(400).json({
        message: "La api-key y el producto son obligatorios.",
      });
    }

    // Llamar al servicio para agregar el producto
    const newProduct = await authPubs.addProductToUser(apiKey, product);

    res.status(200).json(newProduct);
  } catch (error) {
    res.status(500).json({
      message: "Error al agregar el producto.",
      error: error.message,
    });
  }
};

// Controlador para actualizar un producto
exports.updateProduct = async (req, res) => {
  try {
    const { apiKey, updatedProductData } = req.body;
    const { id } = req.params;

    // Validar que apiKey, id y los datos del producto estén presentes
    if (!apiKey || !id || !updatedProductData) {
      return res.status(400).json({
        message: "apiKey, id y los datos del producto son obligatorios.",
      });
    }

    // Llamar al servicio para actualizar el producto
    const updatedProduct = await authPubs.updateProduct(apiKey, id, updatedProductData);

    if (updatedProduct.success) {
      return res.status(200).json({
        message: "Producto actualizado correctamente.",
        product: updatedProduct.product,
      });
    } else {
      return res.status(404).json({
        message: updatedProduct.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error inesperado al actualizar el producto.",
      error: error.message,
    });
  }
};

// Controlador para eliminar un producto
exports.deleteProduct = async (req, res) => {
  try {
    const { apiKey } = req.body;
    const { id } = req.params;

    // Validar que apiKey y id estén presentes
    if (!apiKey || !id) {
      return res.status(400).json({
        message: "apiKey y id son obligatorios.",
      });
    }

    // Llamar al servicio para eliminar el producto
    const result = await authPubs.deleteProduct(apiKey, id);

    if (result.success) {
      return res.status(200).json({
        message: "Producto eliminado correctamente.",
      });
    } else {
      return res.status(404).json({
        message: result.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error inesperado al eliminar el producto.",
      error: error.message,
    });
  }
};
