import { gql } from "apollo-server";

const sessionType = gql`
  #--------------------------Session-----------------------
  type Session @key(fields: "id") @shareable {
    # ID
    id: ID!

    # String
    sessionToken: String!
    userId: String!

    # Date
    expires: Date!

    # Relationships
    user: Usuario!
  }

  type ResponseSession {
    data: [Session]
    count: Int
    status: Int
    error: String
  }

  input SessionCreateInput {
    # String
    sessionToken: String!
    userId: String!

    # Date
    expires: Date!
  }

  input SessionWhereUniqueInput {
    id: String!
  }

  input SessionUpdateInput {
    # String
    sessionToken: String
    userId: String

    # Date
    expires: Date
  }

  input SessionWhereFilterInput {
    AND: [SessionWhereFilterInput]
    OR: [SessionWhereFilterInput]
    NOT: [SessionWhereFilterInput]

    # String filters
    id: StringFilter
    sessionToken: StringFilter
    userId: StringFilter

    # Date filters
    expires: DateFilter

    # Object filters
    user: ConnectUsuarioFilter
  }

  input ConnectUsuarioFilter {
    every: UsuarioWhereFilterInput
    some: UsuarioWhereFilterInput
    none: UsuarioWhereFilterInput
  }

  input OrderByInputSession {
    field: SessionOrderByField
    value: OrderByDirection
    user: OrderByInputUsuario
  }

  enum SessionOrderByField {
    # String fields
    id
    sessionToken
    userId

    # Date fields
    expires
  }
`;

export { sessionType };
