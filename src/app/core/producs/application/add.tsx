// pages/products/add.tsx
"use client";
import { useState } from "react";

export default function AddProductPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState("0%");
  const [stock, setStock] = useState(0);
  const [image, setImage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/products/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description, price, discount, stock, image }),
    });

    if (res.ok) {
      alert("Producto agregado exitosamente");
    } else {
      alert("Error al agregar el producto");
    }
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Agregar Producto</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <input
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="border p-2 w-full mb-4"
        />
        <input
          type="text"
          placeholder="Descuento"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
          className="border p-2 w-full mb-4"
        />
        <input
          type="text"
          placeholder="Imagen"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <button type="submit" className="bg-yellow-500 text-black p-2 rounded w-full">
          Agregar Producto
        </button>
      </form>
    </div>
  );
}
