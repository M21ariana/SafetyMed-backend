import { gql } from "apollo-server";

const generalTypes = gql`
  extend schema
    @link(
      url: "https://specs.apollo.dev/federation/v2.0"
      import: ["@key", "@shareable"]
    )

  scalar Date
  scalar JSON

  input IntFilter {
    equals: Int
    lt: Int
    lte: Int
    gt: Int
    gte: Int
  }

  input JSONFilter {
    array_contains: JSON
    array_ends_with: String
    array_starts_with: String
    equals: JSON
    string_contains: String
    string_ends_with: String
    string_starts_with: String
    not: JSON
  }

  input StringFilter {
    equals: String
    contains: String
    in: [String!]
    notIn: [String!]
    lt: String
    lte: String
    gt: String
    gte: String
    startsWith: String
    endsWith: String
    mode: String
  }

  type Project @key(fields: "id", resolvable: false) {
    id: ID!
  }

  input DateFilter {
    equals: String
    lt: String
    lte: String
    gt: String
    gte: String
    not: String
  }

  input SearchInput {
    value: String
    columns: JSON
  }

  enum OrderByDirection {
    asc
    desc
  }

  type Mutation {
    # Paciente
    createPaciente(data: PacienteCreateInput): Paciente
    updatePaciente(
      where: PacienteWhereUniqueInput!
      data: PacienteUpdateInput
    ): Paciente
    upsertPaciente(
      where: PacienteWhereUniqueInput!
      data: PacienteCreateInput
    ): Paciente
    deletePaciente(where: PacienteWhereUniqueInput!): Paciente

    # Medico
    createMedico(data: MedicoCreateInput): Medico
    updateMedico(
      where: MedicoWhereUniqueInput!
      data: MedicoUpdateInput
    ): Medico
    upsertMedico(
      where: MedicoWhereUniqueInput!
      data: MedicoCreateInput
    ): Medico
    deleteMedico(where: MedicoWhereUniqueInput!): Medico

    # Consulta
    createConsulta(data: ConsultaCreateInput): Consulta
    updateConsulta(
      where: ConsultaWhereUniqueInput!
      data: ConsultaUpdateInput
    ): Consulta
    upsertConsulta(
      where: ConsultaWhereUniqueInput!
      data: ConsultaCreateInput
    ): Consulta
    deleteConsulta(where: ConsultaWhereUniqueInput!): Consulta

    # HistorialMedico
    createHistorialMedico(data: HistorialMedicoCreateInput): HistorialMedico
    updateHistorialMedico(
      where: HistorialMedicoWhereUniqueInput!
      data: HistorialMedicoUpdateInput
    ): HistorialMedico
    upsertHistorialMedico(
      where: HistorialMedicoWhereUniqueInput!
      data: HistorialMedicoCreateInput
    ): HistorialMedico
    deleteHistorialMedico(
      where: HistorialMedicoWhereUniqueInput!
    ): HistorialMedico

    # Cita
    createCita(data: CitaCreateInput): Cita
    updateCita(where: CitaWhereUniqueInput!, data: CitaUpdateInput): Cita
    upsertCita(where: CitaWhereUniqueInput!, data: CitaCreateInput): Cita
    deleteCita(where: CitaWhereUniqueInput!): Cita

    # Usuario
    createUsuario(data: UsuarioCreateInput): Usuario
    updateUsuario(
      where: UsuarioWhereUniqueInput!
      data: UsuarioUpdateInput
    ): Usuario
    upsertUsuario(
      where: UsuarioWhereUniqueInput!
      data: UsuarioCreateInput
    ): Usuario
    deleteUsuario(where: UsuarioWhereUniqueInput!): Usuario

    # Session
    createSession(data: SessionCreateInput): Session
    updateSession(
      where: SessionWhereUniqueInput!
      data: SessionUpdateInput
    ): Session
    upsertSession(
      where: SessionWhereUniqueInput!
      data: SessionCreateInput
    ): Session
    deleteSession(where: SessionWhereUniqueInput!): Session
  }

  type Query {
    # Paciente
    pacientes(
      where: PacienteWhereInput
      search: SearchInput
      take: Int
      skip: Int
      orderBy: [PacienteOrderByInput]
    ): ResponsePaciente
    paciente(id: String!): Paciente

    # Medico
    medicos(
      where: MedicoWhereInput
      search: SearchInput
      take: Int
      skip: Int
      orderBy: [MedicoOrderByInput]
    ): ResponseMedico
    medico(id: String!): Medico

    # Consulta
    consultas(
      where: ConsultaWhereInput
      search: SearchInput
      take: Int
      skip: Int
      orderBy: [ConsultaOrderByInput]
    ): ResponseConsulta
    consulta(id: String!): Consulta

    # HistorialMedico
    historialMedicos(
      where: HistorialMedicoWhereInput
      search: SearchInput
      take: Int
      skip: Int
      orderBy: [HistorialMedicoOrderByInput]
    ): ResponseHistorialMedico
    historialMedico(id: String!): HistorialMedico

    # Cita
    citas(
      where: CitaWhereInput
      search: SearchInput
      take: Int
      skip: Int
      orderBy: [CitaOrderByInput]
    ): ResponseCita
    cita(id: String!): Cita

    # Usuario
    usuarios(
      where: UsuarioWhereInput
      search: SearchInput
      take: Int
      skip: Int
      orderBy: [UsuarioOrderByInput]
    ): ResponseUsuario
    usuario(id: String!): Usuario

    # Session
    sessions(
      where: SessionWhereInput
      search: SearchInput
      take: Int
      skip: Int
      orderBy: [SessionOrderByInput]
    ): ResponseSession
    session(id: String!): Session
  }
`;

export { generalTypes };
