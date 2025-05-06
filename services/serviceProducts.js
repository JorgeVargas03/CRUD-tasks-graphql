// services/publicationService.js
const { userCollection, counterCollection } = require("../models/users");

// Obtener todos los productos del usuario
exports.getProductsByApiKey = async (apiKey) => {
  try {
    // Buscar al usuario por su api-key
    const userDoc = await userCollection.where("apiKey", "==", apiKey).get();

    // Verificar si el usuario existe
    if (userDoc.empty) {
      throw new Error("Usuario no encontrado o API Key incorrecta");
    }

    // Obtener los datos del usuario
    const user = userDoc.docs[0].data();

    // Devolver los productos del usuario
    return user.products || []; // Si no tiene productos, retorna un arreglo vacío
  } catch (error) {
    throw new Error(`Error al obtener los productos: ${error.message}`);
  }
};

// Obtener un producto por id
exports.getProductById = async (apiKey, productId) => {
  try {
    // Buscar al usuario por su api-key
    const userDoc = await userCollection.where("apiKey", "==", apiKey).get();

    // Verificar si el usuario existe
    if (userDoc.empty) {
      throw new Error("Usuario no encontrado o API Key incorrecta");
    }

    // Obtener los datos del usuario
    const user = userDoc.docs[0].data();

    // Castear productId a entero antes de buscarlo
    const productIdInt = parseInt(productId, 10);

    // Buscar el producto por su ID en el arreglo de productos del usuario
    const product = user.products.find((p) => p._id === productIdInt);

    if (!product) {
      throw new Error("Producto no encontrado");
    }

    return product;
  } catch (error) {
    throw new Error(`Error al obtener el producto: ${error.message}`);
  }
};

// Agregar un nuevo producto
exports.addProductToUser = async (apiKey, product) => {
  try {
    const userSnapshot = await userCollection
      .where("apiKey", "==", apiKey)
      .get(); // Buscar usuario por API Key

    if (userSnapshot.empty) {
      throw new Error("Usuario no encontrado.");
    }

    const userDoc = userSnapshot.docs[0];
    const userRef = userCollection.doc(userDoc.id); // Referencia al usuario

    // Obtener productos existentes o inicializar un arreglo vacío
    const userData = userDoc.data();
    const products = userData.products || [];

    // Obtener el siguiente ID secuencial para este usuario
    const nextProductId =
      products.length > 0 ? Math.max(...products.map((p) => p._id)) + 1 : 1;

    // Agregar el nuevo producto
    products.push({
      ...product,
      _id: nextProductId, // ID secuencial único por usuario
      created_at: new Date().toISOString(),
    });

    // Actualizar productos del usuario
    await userRef.update({ products });

    return {
      message: "Producto agregado correctamente.",
      productId: nextProductId,
    };
  } catch (error) {
    throw new Error(`Error al agregar el producto: ${error.message}`);
  }
};

// Servicio para actualizar un producto
exports.updateProduct = async (apiKey, productId, updatedProductData) => {
  try {
    // Buscar al usuario por su apiKey
    const userDoc = await userCollection.where("apiKey", "==", apiKey).get();

    // Verificar si el usuario existe
    if (userDoc.empty) {
      return {
        success: false,
        message: "Usuario no encontrado o API Key incorrecta",
      };
    }

    const user = userDoc.docs[0];
    const products = user.data().products;

    // Castear productId a entero antes de buscarlo
    const productIdInt = parseInt(productId, 10);

    // Buscar el producto en la lista de productos del usuario
    const productIndex = products.findIndex(
      (product) => product._id === productIdInt
    );

    if (productIndex === -1) {
      return { success: false, message: "Producto no encontrado" };
    }

    // Actualizar el producto con los nuevos datos
    products[productIndex] = {
      ...products[productIndex],
      ...updatedProductData,
    };

    // Actualizar los productos en la base de datos
    await user.ref.update({ products });

    return { success: true, product: products[productIndex] };
  } catch (error) {
    return {
      success: false,
      message: `Error al actualizar el producto: ${error.message}`,
    };
  }
};

// Servicio para eliminar un producto
exports.deleteProduct = async (apiKey, productId) => {
  try {
    // Buscar al usuario por su apiKey
    const userDoc = await userCollection.where("apiKey", "==", apiKey).get();

    // Verificar si el usuario existe
    if (userDoc.empty) {
      return {
        success: false,
        message: "Usuario no encontrado o API Key incorrecta",
      };
    }

    const user = userDoc.docs[0];
    const products = user.data().products;

    // Castear productId a entero antes de buscarlo
    const productIdInt = parseInt(productId, 10);

    // Buscar el producto en la lista de productos del usuario
    const productIndex = products.findIndex(
      (product) => product._id === productIdInt
    );

    if (productIndex === -1) {
      return { success: false, message: "Producto no encontrado" };
    }

    // Eliminar el producto de la lista
    products.splice(productIndex, 1);

    // Actualizar los productos en la base de datos
    await user.ref.update({ products });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: `Error al eliminar el producto: ${error.message}`,
    };
  }
};
