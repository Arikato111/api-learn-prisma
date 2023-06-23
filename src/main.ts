import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();
import app from "./express";

async function main() {
  // port to connect api
  const port = process.env.PORT ?? 4000;
  app.listen(port, () => {
    console.log("server run at port", port);
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
