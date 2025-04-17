
import axios from "axios";
import { DBType } from "../utils/types/database";

export const getOrigin = (origin: string | undefined) => {
  if (!origin) return false;

  const allowedOrigins = ["http://localhost:3000"];

  return allowedOrigins.includes(origin);
};

interface AuthParams {
  db: DBType;
  token: string | undefined;
}

export const getAuthorizedUser = async ({ db, token }: AuthParams) => {
  if (!token) {
    return null;
  }

  try {
    if (!process.env.GQL_URL) {
      throw new Error("GQL_URL is not configured in environment variables");
    }

    const response = await axios.post(
      process.env.GQL_URL,
      {
        query: `query SessionByToken($token: String!) {
					sessionByToken(where: { sessionToken: $token }) {
						id
						sessionToken
						expires
						user {
							id
							role {
								id
								name
							}
						}
					}
				}
				`,
        variables: {
          token: token.trim(),
        },
        operationName: "SessionByToken",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Origin: process.env.GQL_URL,
          "gateway-token": token.trim(),
        },
      }
    );

    if (response.data?.errors) {
      throw new Error(response.data.errors[0].message);
    }

    if (response.data?.data?.sessionByToken?.user?.id) {
      return {
        session: true,
        user: {
          id: response.data.data.sessionByToken.user.id,
          role: response.data.data.sessionByToken.user.role,
        },
      };
    }

    return null;
  } catch (error: any) {
    return null;
  }
};

export const checkUserAndOrigin = async (
  user: { id: string } | null,
  origin: string | undefined,
  ip: string | undefined,
  db: DBType,
  action: string,
  entity: string,
  system: string
) => {
  if (!origin && process.env.ENV !== "DEV") {
    throw new Error("Permission denied - Origin");
  }
};
