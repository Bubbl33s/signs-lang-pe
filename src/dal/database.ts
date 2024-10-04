import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Conexión exitosa
try {
  await prisma.$connect();

  console.log("Conexión exitosa a la base de datos");
} catch (error) {
  console.error("Error al conectar a la base de datos:", error);
  process.exit(1);
}

export default prisma;
