"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { toast, ToastContainer } from 'react-toastify'; // Asegúrate de tener importado toast
import 'react-toastify/dist/ReactToastify.css'; // Importa los estilos de toastify


export default function Products() {
  const [products, setProducts] = useState([
    {
      id: "1",
      name: "Optimum Nutrition Gold Standard Whey",
      description: "Proteína en polvo con 24g de proteína por porción.",
      price: 148,
      discount: "20%",
      stock: 10, // Campo de stock
      image: "/images/protein1.png",
    },
    {
      id: "2",
      name: "MyProtein Impact Whey",
      description: "Proteína de alta calidad, 21g de proteína por porción.",
      price: 92,
      discount: "30%",
      stock: 5, // Campo de stock
      image: "/images/protein2.png",
    },
  ]);

  // Función para manejar la compra
// Función para manejar la compra
const handlePurchase = async (productId: string) => {
  const product = products.find((p) => p.id === productId);

  if (!product) {
    toast.error("Producto no encontrado");
    return;
  }

  if (product.stock > 0) {
    try {
      const res = await fetch("/api/products/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      if (res.ok) {
        // Actualiza el stock localmente al restar 1
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.id === productId ? { ...p, stock: p.stock - 1 } : p
          )
        );

        toast.success("Compra realizada exitosamente!");
      } else {
        toast.error("Error al realizar la compra");
      }
    } catch (error) {
      toast.error("Error en el servidor");
    }
  } else {
    toast.error("Stock insuficiente");
  }
};

const router = useRouter();
const [error, setError] = useState(null);
  return (
    <div className="container mx-auto py-12">
      <ToastContainer /> {/* Contenedor para mostrar las notificaciones */}
      <h1 className="text-3xl font-bold text-center mb-8">Nuestros Productos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={128} // Especifica el ancho
              height={128} // Especifica la altura
              className="w-32 h-32 object-cover mb-4"
            />

            <h2 className="text-xl font-semibold mb-2 text-black">
              {product.name}
            </h2>
            <p className="text-gray-500 mb-2">{product.description}</p>
            <p className="text-yellow-600 font-bold">S/ {product.price}</p>
            <p className="text-green-500">{product.discount} de Descuento</p>
            <p className="text-red-500">Stock: {product.stock}</p>
            <button
              className="mt-4 bg-yellow-500 text-black p-2 rounded"
              onClick={() => handlePurchase(product.id)}
              disabled={product.stock === 0}
            >
              {product.stock > 0 ? "Comprar" : "Agotado"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
