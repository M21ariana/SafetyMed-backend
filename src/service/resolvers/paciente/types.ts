import { gql } from "apollo-server";

const pacienteType = gql`
  #--------------------------Paciente-----------------------
  type Paciente @key(fields: "id") @shareable {
    # ID
    id: ID!

    # String
    nombre: String!
    apellido: String!
    genero: String!
    direccion: String!
    telefono: String!
    email: String!

    # Date
    fechaNacimiento: Date!

    # Relationships
    consultas: [Consulta]
    citas: [Cita]
    historialMedico: HistorialMedico
    usuario: Usuario
  }

  type ResponsePaciente {
    data: [Paciente]
    count: Int
    status: Int
    error: String
  }

  input PacienteCreateInput {
    # String
    nombre: String!
    apellido: String!
    genero: String!
    direccion: String!
    telefono: String!
    email: String!

    # Date
    fechaNacimiento: Date!
  }

  input PacienteWhereUniqueInput {
    # String
    id: String!
  }
    
  input PacienteUpdateInput {
    # String
    nombre: String
    apellido: String
    genero: String
    direccion: String
    telefono: String
    email: String

    # Date
    fechaNacimiento: Date
  }

  input PacienteUpsertInput {
    # String
    nombre: String!
    apellido: String!
    genero: String!
    direccion: String!
    telefono: String!
    email: String!

    # Date
    fechaNacimiento: Date!
  }

  input PacienteDeleteInput {
    # String
    id: String!
  }

  input PacienteWhereFilterInput {
    AND: [PacienteWhereFilterInput]
    OR: [PacienteWhereFilterInput]
    NOT: [PacienteWhereFilterInput]

    # String filters
    id: StringFilter
    nombre: StringFilter
    apellido: StringFilter
    genero: StringFilter
    direccion: StringFilter
    telefono: StringFilter
    email: StringFilter

    # Date filters
    fechaNacimiento: DateFilter

    # Object filters
    consultas: ConnectConsultaFilter
    citas: ConnectCitaFilter
    historialMedico: ConnectHistorialMedicoFilter
    usuario: ConnectUsuarioFilter
  }

  input ConnectUsuarioFilter {
    every: UsuarioWhereFilterInput
    some: UsuarioWhereFilterInput
    none: UsuarioWhereFilterInput
  }

  input OrderByInputPaciente {
    field: PacienteOrderByField
    value: OrderByDirection
    consultas: OrderByInputConsulta
    citas: OrderByInputCita
    historialMedico: OrderByInputHistorialMedico
    usuario: OrderByInputUsuario
  }

  enum PacienteOrderByField {
    # String fields
    id
    nombre
    apellido
    genero
    direccion
    telefono
    email

    # Date fields
    fechaNacimiento
  }
`;

export { pacienteType };
