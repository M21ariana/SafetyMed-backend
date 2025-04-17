import { gql } from "apollo-server";

const citaType = gql`
  #--------------------------Cita-----------------------
  type Cita @key(fields: "id") @shareable {
    # ID
    id: ID!

    # Date
    fecha: Date!
    hora: Date!

    # Relationships
    pacienteId: String!
    medicoId: String!
    paciente: Paciente!
    medico: Medico!
  }

  type ResponseCita {
    data: [Cita]
    count: Int
    status: Int
    error: String
  }

  input CitaCreateInput {
    # Date
    fecha: Date!
    hora: Date!

    # Relationships
    pacienteId: String!
    medicoId: String!
  }

  input CitaWhereUniqueInput {
    id: String!
  }

  input CitaUpdateInput {
    # Date
    fecha: Date
    hora: Date

    # Relationships
    pacienteId: String
    medicoId: String
  }

  input CitaWhereFilterInput {
    AND: [CitaWhereFilterInput]
    OR: [CitaWhereFilterInput]
    NOT: [CitaWhereFilterInput]

    # String filters
    id: StringFilter
    pacienteId: StringFilter
    medicoId: StringFilter

    # Date filters
    fecha: DateFilter
    hora: DateFilter

    # Object filters
    paciente: ConnectPacienteFilter
    medico: ConnectMedicoFilter
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

  input OrderByInputCita {
    field: CitaOrderByField
    value: OrderByDirection
    paciente: OrderByInputPaciente
    medico: OrderByInputMedico
  }

  enum CitaOrderByField {
    # String fields
    id
    pacienteId
    medicoId

    # Date fields
    fecha
    hora
  }
`;

export { citaType };
