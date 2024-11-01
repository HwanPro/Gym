import { NextResponse } from "next/server";
import db from "@/libs/db"; // Asegúrate de tener configurada tu conexión a la base de datos aquí
import { v4 as uuidv4 } from "uuid";
import { promises as fs } from "fs";
import path from "path";

// Configuración para desactivar el parser automático de body
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  try {
    // Lee el cuerpo de la solicitud como un Buffer
    const chunks = [];
    for await (const chunk of req.body as any) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    // Aquí deberías parsear los datos que recibes en el buffer
    // Se recomienda usar `Content-Type` multipart/form-data para enviar archivos
    const name = "nombre del producto"; // Ejemplo de campo
    const description = "descripción"; // Ejemplo de campo
    const price = 3.0; // Ejemplo de campo
    const discount = 0.05; // Ejemplo de campo
    const stock = 20; // Ejemplo de campo
    const filename = uuidv4() + ".jpg"; // O el nombre que le estés dando al archivo

    // Guarda el archivo en /public/images
    const savePath = path.join(process.cwd(), "public", "images", filename);
    await fs.writeFile(savePath, buffer);

    // Guarda los datos en la base de datos
    const newProduct = await db.product.create({
      data: {
        id: uuidv4(),
        name,
        description,
        price,
        discount,
        stock,
        imageUrl: `/images/${filename}`,
      },
    });

    return NextResponse.json({ product: newProduct });
  } catch (error) {
    console.error("Error al agregar producto:", error);
    return NextResponse.json(
      { message: "Error en el servidor" },
      { status: 500 }
    );
  }
}
