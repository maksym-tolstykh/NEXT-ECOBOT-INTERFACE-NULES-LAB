import { NextResponse } from "next/server";
import { Pool } from "pg";
import jwt from "jsonwebtoken";

export const POST = async (req: Request, res: Response) => {
  const body = await req.json();

  try {
    const pool = new Pool({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
      database: process.env.DB_DATABASE,
      user: body.username,
      password: body.password,
    });
    const token = jwt.sign(
      {
        data: body,
      },
      process.env.SECRET as string,
      { expiresIn: 30 * 24 * 60 * 60 }
    );
    await pool.query("SELECT NOW()");
    return NextResponse.json(
      { message: "OK", token, status: 200 },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Неправильно введені дані", status: 401, error },
      {
        status: 401,
      }
    );
  }
};
