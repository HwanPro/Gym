"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddProductPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState<File | null>(null);
  
  const router = useRouter(); // Inicializamos el hook useRouter correctamente

  const handleGoHome = () => {
    router.push("/"); // Redirigir a la página de inicio
  };

  const handleAddProduct = async () => {
    if (!name || !description || !price || !discount || !stock || !image) {
      toast.error("Por favor, completa todos los campos.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("discount", discount);
    formData.append("stock", stock);
    formData.append("image", image);

    try {
      const res = await fetch("/api/products/add", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        toast.success("Producto agregado exitosamente!");
        setName("");
        setDescription("");
        setPrice("");
        setDiscount("");
        setStock("");
        setImage(null);
      } else {
        toast.error("Error al agregar el producto");
      }
    } catch (error) {
      toast.error("Error en el servidor");
    }
  };

  return (
    <div className="container mx-auto py-12">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6">Agregar Producto</h1>

      <input
        type="text"
        placeholder="Nombre del producto"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 w-full text-black mb-4"
      />
      <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full text-black mb-4"
      />
      <input
        type="number"
        placeholder="Precio"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border p-2 w-full text-black mb-4"
      />
      <input
        type="number"
        placeholder="Descuento"
        value={discount}
        onChange={(e) => setDiscount(e.target.value)}
        className="border p-2 w-full text-black mb-4"
      />
      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        className="border p-2 w-full text-black mb-4"
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
        className="border p-2 w-full text-white mb-4"
      />
      
      <div className="flex space-x-4">
        <button
          onClick={handleAddProduct}
          className="bg-yellow-500 text-white p-2 rounded"
        >
          Agregar Producto
        </button>

        <button
          onClick={handleGoHome}
          className="bg-yellow-500 text-white p-2 rounded"
        >
          Volver a inicio
        </button>
      </div>
    </div>
  );
}
