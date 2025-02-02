//src/app/auth/login/page.tsx
"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from 'next/image';



export default function AuthPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleLogin = async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res.error) {
      setError(res.error);
    } else {
      router.push('/dashboard');
      router.refresh();
    }
  };

  // Autenticación con Google
  const handleGoogleLogin = () => {
    window.location.href = "api/auth/google"; 
  };

  // Enviar el formulario
  const onSubmit = handleSubmit(handleLogin);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={onSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        {error && <p className="bg-red-500 text-white p-3 rounded mb-2">{error}</p>}

        <h2 className="text-black text-2xl font-bold text-center mb-6">
          Te damos la bienvenida de nuevo
        </h2>

        <label htmlFor="email" className="text-slate-500 mb-2 block text-sm">
          Email:
        </label>
        <input
          type="email"
          {...register("email", { required: { value: true, message: "Email es obligatorio" } })}
          className="border p-2 w-full mb-4 text-gray-800"
          placeholder="user@email.com"
        />
        {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}

        <label htmlFor="password" className="text-slate-500 mb-2 block text-sm">
          Contraseña:
        </label>
        <input
          type="password"
          {...register("password", { required: { value: true, message: "Contraseña es obligatoria" } })}
          className="border p-2 w-full mb-4 text-gray-800"
          placeholder="******"
        />
        {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}

        <button className="w-full bg-yellow-400 text-black hover:bg-yellow-500 p-2 mb-4">
          Iniciar sesión
        </button>

        <div className="text-center mb-4">
          <a href="#" className="text-black" onClick={() => router.push("/auth/register")}>
            ¿No tienes cuenta?{" "}
            <span className="text-yellow-500">Regístrate</span>
          </a>
        </div>

        <div className="flex items-center justify-center my-4">
          <hr className="w-1/5" />
          <span className="mx-2 text-gray-500">o</span>
          <hr className="w-1/5" />
        </div>

        <button
          className="w-full bg-white border border-gray-300 text-black p-2 flex justify-center items-center"
          onClick={handleGoogleLogin}
        >
          <Image
            src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
            alt="Google icon"
            width={50}
            height={50}
            className="w-5 h-5 mr-2"
          />
          Continuar con Google
        </button>
      </form>
    </div>
  );
}
