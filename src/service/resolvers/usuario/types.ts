import { gql } from "apollo-server";

const usuarioType = gql`
  #--------------------------Usuario-----------------------
  type Usuario @key(fields: "id") @shareable {
    # ID
    id: ID!

    # String
    email: String!
    role: String!
    contrasena: String!
    pacienteId: String

    # Relationships
    paciente: Paciente
    session: [Session]
  }

  type ResponseUsuario {
    data: [Usuario]
    count: Int
    status: Int
    error: String
  }

  input UsuarioCreateInput {
    # String
    email: String!
    role: String!
    contrasena: String!
    pacienteId: String
  }

  input UsuarioWhereUniqueInput {
    id: String!
  }

  input UsuarioUpdateInput {
    # String
    email: String
    role: String
    contrasena: String
    pacienteId: String
  }

  input UsuarioWhereFilterInput {
    AND: [UsuarioWhereFilterInput]
    OR: [UsuarioWhereFilterInput]
    NOT: [UsuarioWhereFilterInput]

    # String filters
    id: StringFilter
    email: StringFilter
    role: StringFilter
    contrasena: StringFilter
    pacienteId: StringFilter

    # Object filters
    paciente: ConnectPacienteFilter
    session: ConnectSessionFilter
  }

 

  input ConnectSessionFilter {
    every: SessionWhereFilterInput
    some: SessionWhereFilterInput
    none: SessionWhereFilterInput
  }

  input OrderByInputUsuario {
    field: UsuarioOrderByField
    value: OrderByDirection
    paciente: OrderByInputPaciente
    session: OrderByInputSession
  }

  enum UsuarioOrderByField {
    # String fields
    id
    email
    role
    contrasena
    pacienteId
  }
`;

export { usuarioType };
