import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { getDB } from "./service/db";

import { buildSubgraphSchema } from "@apollo/subgraph";
import { getAuthorizedUser } from "./service/middleware";
import { generalTypes } from "./service/resolvers/general/types";
import { citaType } from "./service/resolvers/cita/types";
import { citaResolvers } from "./service/resolvers/cita/resolvers";
import { consultaType } from "./service/resolvers/consulta/types";
import { consultaResolvers } from "./service/resolvers/consulta/resolvers";
import { historialmedicoType } from "./service/resolvers/historialmedico/types";
import { medicoType } from "./service/resolvers/medico/types";
import { medicoResolvers } from "./service/resolvers/medico/resolvers";
import { pacienteType } from "./service/resolvers/paciente/types";
import { pacienteResolvers } from "./service/resolvers/paciente/resolvers";
import { sessionType } from "./service/resolvers/session/types";
import { sessionResolvers } from "./service/resolvers/session/resolvers";
import { usuarioType } from "./service/resolvers/usuario/types";
import { usuarioResolvers } from "./service/resolvers/usuario/resolvers";
import { historialMedicoResolvers } from "./service/resolvers/historialmedico/resolvers";


const main = async () => {
  const db = await getDB();
  const server = new ApolloServer({
    schema: buildSubgraphSchema([
			{ typeDefs: generalTypes },
      { typeDefs: citaType, resolvers: citaResolvers },
      { typeDefs: consultaType, resolvers: consultaResolvers },
      { typeDefs: historialmedicoType, resolvers: historialMedicoResolvers },
      { typeDefs: medicoType, resolvers: medicoResolvers },
      { typeDefs: pacienteType, resolvers: pacienteResolvers },
      { typeDefs: sessionType, resolvers: sessionResolvers },
      { typeDefs: usuarioType, resolvers: usuarioResolvers },

    ]),
  });
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => {
      const token = Array.isArray(req?.headers["next-auth.session-token"]) 
        ? req?.headers["next-auth.session-token"][0] 
        : req?.headers["next-auth.session-token"];
      const gatewayToken = req?.headers["gateway-token"];
      const origin = req?.headers["gateway-headers"];
      const ip = req?.socket?.remoteAddress || 'unknown';
      
      const auth = await getAuthorizedUser({ db, token });
      
      return {
        db,
        token: token || gatewayToken,
        origin,
        ip,
        user: auth?.user
      };
    },
    listen: { port: Number(process.env.PORT) || 4000 },
  });
  console.log(`🚀 Server ready at ${url}`);
};

main();
