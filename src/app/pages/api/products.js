// pages/api/products.js

import db from "@/libs/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const products = await db.product.findMany();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los productos" });
    }
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}
