import { gql } from "apollo-server";

const medicoType = gql`
  #--------------------------Medico-----------------------
  type Medico @key(fields: "id") @shareable {
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
    historialesActualizados: [HistorialMedico]
  }

  type ResponseMedico {
    data: [Medico]
    count: Int
    status: Int
    error: String
  }

  input MedicoCreateInput {
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

  input MedicoWhereUniqueInput {
    # String
    id: String!
  }

  input MedicoUpdateInput {
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

  input MedicoUpsertInput {
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

  input MedicoDeleteInput {
    # String
    id: String!
  }

  input MedicoWhereFilterInput {
    AND: [MedicoWhereFilterInput]
    OR: [MedicoWhereFilterInput]
    NOT: [MedicoWhereFilterInput]

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
    historialesActualizados: ConnectHistorialMedicoFilter
  }



  input ConnectCitaFilter {
    every: CitaWhereFilterInput
    some: CitaWhereFilterInput
    none: CitaWhereFilterInput
  }

  input OrderByInputMedico {
    field: MedicoOrderByField
    value: OrderByDirection
    consultas: OrderByInputConsulta
    citas: OrderByInputCita
    historialesActualizados: OrderByInputHistorialMedico
  }

  enum MedicoOrderByField {
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

export { medicoType };
