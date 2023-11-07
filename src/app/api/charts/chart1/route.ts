import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { dbPoolConnectorWithQuery } from "@/lib/dbConnector";

export const POST = async (req: Request, res: Response) => {
  const body = await req.json();
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
        { status: 401 }
      );
    }

    const { rows } = await dbPoolConnectorWithQuery(
      parsedJWT,
      `SELECT
      s.City AS Region,
      MAX(CASE WHEN mu.Title = 'PM2.5' THEN m.Value END) AS Max_PM2_5,
      MAX(CASE WHEN mu.Title = 'PM10' THEN m.Value END) AS Max_PM10
  FROM
      Station s
      INNER JOIN Measurement m ON s.ID_Station = m.ID_Station
      INNER JOIN Measured_Unit mu ON m.ID_Measured_Unit = mu.ID_Measured_Unit
  WHERE
      m.Time >='${body?.startTime}' AND m.Time <= '${body?.endTime}'
  GROUP BY
      s.City
  `
    );

    return NextResponse.json(
      { message: "OK", rows, status: 200 },
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
