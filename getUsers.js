// Importa el SDK de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Configura Firebase con tu configuración
// Configura Firebase con tu configuración
const firebaseConfig = {
    apiKey: "AIzaSyDoXozxj33zhYZOktH-VIPxbPIhrT7Ow60",
    authDomain: "api-key-d7cc5.firebaseapp.com",
    projectId: "api-key-d7cc5",
    storageBucket: "api-key-d7cc5.firebasestorage.app",
    messagingSenderId: "382297673044",
    appId: "1:382297673044:web:db5c9d91b707fe4ae10cc1",
    measurementId: "G-ZJETSDWE7S"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Función para obtener todos los usuarios
async function getAllUsers() {
  try {
    // Obtén una referencia a la colección "users"
    const usersCollection = collection(db, "users");

    // Obtén todos los documentos de la colección
    const querySnapshot = await getDocs(usersCollection);

    // Recorre los documentos y muestra los datos
    querySnapshot.forEach((doc) => {
      console.log("ID del usuario:", doc.id); // ID del documento
      console.log("Datos del usuario:", doc.data()); // Datos del usuario
      console.log("-----------------------------");
    });
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
  }
}

// Llama a la función para obtener los usuarios
getAllUsers();