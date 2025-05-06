const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Tarea {
    id: ID!
    titulo: String!
    completada: Boolean!
  }

  type Query {
    obtenerTareas: [Tarea]
    obtenerTarea(id: ID!): Tarea
  }

  type Mutation {
    crearTarea(titulo: String!): Tarea
    actualizarTarea(id: ID!, titulo: String, completada: Boolean): Tarea
    eliminarTarea(id: ID!): String
  }
`;

module.exports = typeDefs;
