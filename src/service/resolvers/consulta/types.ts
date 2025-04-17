import { gql } from "apollo-server";

const consultaType = gql`
  #--------------------------Consulta-----------------------
  type Consulta @key(fields: "id") @shareable {
    # ID
    id: ID!

    # String
    diagnostico: String!
    tratamiento: String!

    # Date
    fecha: Date!
    hora: Date!

    # Relationships
    pacienteId: String!
    medicoId: String!
    historialMedicoId: String!
    paciente: Paciente!
    medico: Medico!
    historialMedico: HistorialMedico!
  }

  type ResponseConsulta {
    data: [Consulta]
    count: Int
    status: Int
    error: String
  }

  input ConsultaCreateInput {
    # String
    diagnostico: String!
    tratamiento: String!

    # Date
    fecha: Date!
    hora: Date!

    # Relationships
    pacienteId: String!
    medicoId: String!
    historialMedicoId: String!
  }

  input ConsultaWhereUniqueInput {
    id: String!
  }

  input ConsultaUpdateInput {
    # String
    diagnostico: String
    tratamiento: String

    # Date
    fecha: Date
    hora: Date

    # Relationships
    pacienteId: String
    medicoId: String
    historialMedicoId: String
  }

  input ConsultaWhereFilterInput {
    AND: [ConsultaWhereFilterInput]
    OR: [ConsultaWhereFilterInput]
    NOT: [ConsultaWhereFilterInput]

    # String filters
    id: StringFilter
    diagnostico: StringFilter
    tratamiento: StringFilter
    pacienteId: StringFilter
    medicoId: StringFilter
    historialMedicoId: StringFilter

    # Date filters
    fecha: DateFilter
    hora: DateFilter

    # Object filters
    paciente: ConnectPacienteFilter
    medico: ConnectMedicoFilter
    historialMedico: ConnectHistorialMedicoFilter
  }

  input ConnectPacienteFilter {
    every: PacienteWhereFilterInput
    some: PacienteWhereFilterInput
    none: PacienteWhereFilterInput
  }

  input ConnectMedicoFilter {
    every: MedicoWhereFilterInput
    some: MedicoWhereFilterInput
    none: MedicoWhereFilterInput
  }

  input ConnectHistorialMedicoFilter {
    every: HistorialMedicoWhereFilterInput
    some: HistorialMedicoWhereFilterInput
    none: HistorialMedicoWhereFilterInput
  }

  input OrderByInputConsulta {
    field: ConsultaOrderByField
    value: OrderByDirection
    paciente: OrderByInputPaciente
    medico: OrderByInputMedico
    historialMedico: OrderByInputHistorialMedico
  }

  enum ConsultaOrderByField {
    # String fields
    id
    diagnostico
    tratamiento
    pacienteId
    medicoId
    historialMedicoId

    # Date fields
    fecha
    hora
  }
`;

export { consultaType };
