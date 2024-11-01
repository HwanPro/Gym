// src/app/api/auth/register/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/libs/db";

export async function POST(request) {
  try {
    const data = await request.json();

    // Buscar por email
    const userFound = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userFound) {
      return NextResponse.json(
        {
          message: "El correo ya está registrado",
        },
        {
          status: 400,
        }
      );
    }

    // Buscar por nombre de usuario
    const usernameFound = await db.user.findUnique({
      where: {
        username: data.username, // Este campo ya debe estar marcado como @unique en el esquema Prisma
      },
    });

    if (usernameFound) {
      return NextResponse.json(
        {
          message: "El nombre de usuario ya está en uso",
        },
        {
          status: 400,
        }
      );
    }

    // Crear el nuevo usuario con contraseña encriptada
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await db.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
      },
    });

    // Excluir la contraseña del objeto usuario al devolverlo
    const { password: _, ...user } = newUser;

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
