import { NextResponse } from "next/server";
import db from "@/libs/db"; // Asegúrate de que esté conectado correctamente
import multer from "multer";
import path from "path";
import fs from "fs";

// Configura Multer para manejar el almacenamiento de imágenes
const upload = multer({ dest: "public/images/" });

export const config = {
  api: {
    bodyParser: false, // Desactiva el parser de cuerpo por defecto para manejar FormData
  },
};

export async function POST(request) {
  try {
    const formData = await new Promise((resolve, reject) => {
      upload.single("image")(request, {}, function (err) {
        if (err) {
          return reject(err);
        }
        resolve(request);
      });
    });

    const { name, description, price, discount, stock } = formData.body;
    const imagePath = path.join("/images", formData.file.filename); // Ruta de la imagen

    // Guardar el producto en la base de datos
    const newProduct = await db.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        discount: parseFloat(discount),
        stock: parseInt(stock),
        imageUrl: imagePath, // Almacena la ruta de la imagen
      },
    });

    return NextResponse.json(newProduct);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error al agregar el producto: " + error.message,
      },
      {
        status: 500,
      }
    );
  }
}
