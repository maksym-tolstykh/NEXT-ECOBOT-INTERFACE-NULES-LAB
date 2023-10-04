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
      m.id_measurement,
      M.Time,
      M.Value,
      S.Name AS Station_Name,
      MU.Title AS Measurement_Unit
  FROM Measurement M
  JOIN Station S ON M.ID_Station = S.ID_Station
  JOIN Measured_Unit MU ON M.ID_Measured_Unit = MU.ID_Measured_Unit
  ORDER BY m.time ASC
  LIMIT 20 OFFSET ${body * 20};
  `
    );
    const pageCount: any = await dbPoolConnectorWithQuery(
      parsedJWT,
      `  SELECT CEIL(COUNT(*) / 20) FROM Measurement;`
    );

    const respBody = [rows, pageCount.rows[0].ceil];
    return NextResponse.json(
      { message: "OK", respBody, status: 200 },
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
