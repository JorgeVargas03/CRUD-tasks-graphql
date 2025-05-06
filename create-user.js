import db from "./config/firebaseConfig.js";
import { collection, addDoc } from "firebase/firestore";

// Función para agregar un usuario con productos
async function addUserWithProducts() {
  const user = {
    username: "aramisdemexico",
    password: "cerro123",
    apiKey: "1234567890ABCDEF",
    products: [
      {
        _id: "67dc3a0a05fe87f1c99c6267",
        organization: "67dc328fc3e708c2f4a1be04",
        livemode: false,
        product_key: "27111507",
        description: "Motosierra",
        price: 1000,
        created_at: "2025-03-20T15:53:46.522Z",
        tax_included: true,
        taxes: [
          {
            rate: 0.16,
            type: "IVA",
            withholding: false,
            factor: "Tasa",
            ieps_mode: "sum_before_taxes"
          }
        ],
        local_taxes: [],
        unit_key: "H87",
        sku: "ABC1234",
        unit_name: "Pieza",
        __v: 0,
        id: "67dc3a0a05fe87f1c99c6267"
      }
    ]
  };

  try {
    // Agrega el usuario a la colección "users"
    const docRef = await addDoc(collection(db, "users"), user);
    console.log("Usuario agregado con ID: ", docRef.id);
  } catch (e) {
    console.error("Error al agregar el usuario: ", e);
  }
}

// Llama a la función para agregar el usuario
addUserWithProducts();