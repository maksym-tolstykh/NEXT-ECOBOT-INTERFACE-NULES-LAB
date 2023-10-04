import { Pool } from "pg";

export const dbPoolConnectorWithQuery = async (
  parsedJWT: any,
  queryString: string
) => {
  const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
    database: process.env.DB_DATABASE,
    user: parsedJWT?.data?.username,
    password: parsedJWT?.data?.password,
  });

  const responseData = await pool.query(queryString);

  return responseData;
};
