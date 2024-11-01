
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status]);

  if (status === "loading") return <p>Cargando...</p>;

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Bienvenido, {session.user.name}</h1>
      <div className="mb-4">
        <p>Email: {session.user.email}</p>
        <p>Rol: {session.user.role}</p>
        <p>Plan de Membresía: Básico (ejemplo)</p>
        <p>Fecha de Inscripción: 01/01/2023 (ejemplo)</p>
      </div>
      <div className="flex space-x-4">
        <button onClick={() => router.push("/products")} className="bg-yellow-400 text-black p-2 rounded">
          Ver Productos
        </button>
        <button onClick={() => router.push("/schedule")} className="bg-yellow-400 text-black p-2 rounded">
          Ver Horario de Clases
        </button>
      </div>
    </div>
  );
}
