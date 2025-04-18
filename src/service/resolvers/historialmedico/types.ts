import { gql } from "apollo-server";

const historialmedicoType = gql`
  #--------------------------HistorialMedico-----------------------
  type HistorialMedico @key(fields: "id") @shareable {
    # ID
    id: ID!

    # String
    antecedentes: String!
    alergias: String!
    medicamentos: String!
    pacienteId: String!

    # Relationships
    consultas: [Consulta]
    paciente: Paciente!
    updatedBy: [Medico]
  }

  type ResponseHistorialMedico {
    data: [HistorialMedico]
    count: Int
    status: Int
    error: String
  }

  input HistorialMedicoCreateInput {
    # String
    antecedentes: String!
    alergias: String!
    medicamentos: String!
    pacienteId: String!
  }

  input HistorialMedicoWhereUniqueInput {
    id: String!
  }

  input HistorialMedicoUpdateInput {
    # String
    antecedentes: String
    alergias: String
    medicamentos: String
    pacienteId: String
  }

  input HistorialMedicoWhereFilterInput {
    AND: [HistorialMedicoWhereFilterInput]
    OR: [HistorialMedicoWhereFilterInput]
    NOT: [HistorialMedicoWhereFilterInput]

    # String filters
    id: StringFilter
    antecedentes: StringFilter
    alergias: StringFilter
    medicamentos: StringFilter
    pacienteId: StringFilter

    # Object filters
    consultas: ConnectConsultaFilter
    paciente: ConnectPacienteFilter
    updatedBy: ConnectMedicoFilter
  }

  input ConnectConsultaFilter {
    every: ConsultaWhereFilterInput
    some: ConsultaWhereFilterInput
    none: ConsultaWhereFilterInput
  }



  input ConnectMedicoFilter {
    every: MedicoWhereFilterInput
    some: MedicoWhereFilterInput
    none: MedicoWhereFilterInput
  }

  input OrderByInputHistorialMedico {
    field: HistorialMedicoOrderByField
    value: OrderByDirection
    consultas: OrderByInputConsulta
    paciente: OrderByInputPaciente
    updatedBy: OrderByInputMedico
  }

  enum HistorialMedicoOrderByField {
    # String fields
    id
    antecedentes
    alergias
    medicamentos
    pacienteId
  }
`;

export { historialmedicoType };
