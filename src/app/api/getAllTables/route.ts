import { NextResponse } from "next/server";
import { Pool } from "pg";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

export const GET = async (req: Request, res: Response) => {
  const cookieStore = cookies();
  const userJWT = cookieStore.get("userData");

  //Якщо немає в кукі файлах JWT, то видаємо помилку
  if (!userJWT) {
    // Handle the case where the cookie is missing
    return NextResponse.json(
      { message: "Cookie not found", status: 400 },
      {
        status: 400,
      }
    );
  }

  try {
    const parsedJWT: JwtPayload | string = jwt.verify(
      userJWT?.value,
      process.env.SECRET as string
    );

    if (typeof parsedJWT === "string") {
      // Handle the case where parsedJWT is a string (e.g., an error message)
      return NextResponse.json(
        { message: "Invalid JWT", status: 401 },
        {
          status: 401,
        }
      );
    }

    const pool = new Pool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
      database: process.env.DB_DATABASE,
      user: parsedJWT?.data?.username,
      password: parsedJWT?.data?.password,
    });
    const responseData = await pool.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_catalog = 'StationsDB';"
    );
    const tableNames = responseData.rows;
    return NextResponse.json(
      { message: "OK", tableNames, status: 200 },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Сталася помилка", status: 401, error },
      {
        status: 401,
      }
    );
  }
};
