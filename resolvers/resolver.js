const { taskCollection } = require('../models/tasks');

const resolvers = {
    Query: {
        obtenerTareas: async () => {
            const snapshot = await taskCollection.get();
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        },
        obtenerTarea: async (_, { id }) => {
            const doc = await taskCollection.doc(id).get();
            if (!doc.exists) return null;
            return { id: doc.id, ...doc.data() };
        },
    },
    Mutation: {
        crearTarea: async (_, { titulo }) => {
            const nuevaTarea = { titulo, completada: false };
            const docRef = await taskCollection.add(nuevaTarea);
            return { id: docRef.id, ...nuevaTarea };
        },
        actualizarTarea: async (_, { id, titulo, completada }) => {
            const tareaRef = taskCollection.doc(id);
            const updates = {};
            if (titulo !== undefined) updates.titulo = titulo;
            if (completada !== undefined) updates.completada = completada;
            await tareaRef.update(updates);
            const updatedDoc = await tareaRef.get();
            return { id: updatedDoc.id, ...updatedDoc.data() };
        },
        eliminarTarea: async (_, { id }) => {
            await taskCollection.doc(id).delete();
            return `Tarea con ID ${id} eliminada exitosamente.`;
        },
    },
};

module.exports = resolvers;
