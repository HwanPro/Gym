// src/components/UserProfile.js
"use client";
import { useSession } from "next-auth/react";

export default function UserProfile() {
  const { data: session } = useSession();

  if (!session) {
    return <p>No hay sesión activa.</p>;
  }

  return (
    <div>
      <h2>Bienvenido, {session.user.name}</h2>
      <img src={session.user.image} alt="Foto de perfil" />
      <p>Email: {session.user.email}</p>
    </div>
  );
}
