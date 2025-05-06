const express = require("express");
const router = express.Router();
const controllerPubs = require("../controllers/productsController");
const validateApiKey = require("../middleware/validateApiKey"); // Importamos el middleware

router.get("/product", validateApiKey, controllerPubs.getProducts);
router.get("/product/:id", validateApiKey, controllerPubs.getProductById);
router.post("/product", validateApiKey, controllerPubs.addProduct);
router.put("/product/:id", validateApiKey, controllerPubs.updateProduct);
router.delete("/product/:id",validateApiKey, controllerPubs.deleteProduct);

module.exports = router;
