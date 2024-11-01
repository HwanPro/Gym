import { NextResponse } from "next/server";
import db from "@/libs/db";

export async function GET() {
  const products = await db.product.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      discount: true,
      stock: true,
    },
  });
  return NextResponse.json(products);
}
