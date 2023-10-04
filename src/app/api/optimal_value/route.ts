import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { dbPoolConnectorWithQuery } from "@/lib/dbConnector";

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
        { status: 401 }
      );
    }

    const { rows } = await dbPoolConnectorWithQuery(
      parsedJWT,
      `SELECT 
      C.Designation,
      MU.Title,
      OV.Bottom_Border,
      OV.Upper_Border
  FROM Optimal_Value OV
  JOIN Measured_Unit MU ON OV.ID_Measured_Unit = MU.ID_Measured_Unit
  JOIN Category C ON OV.ID_Category = C.ID_Category
  ORDER BY  MU.Title, C.Designation
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
