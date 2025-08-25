import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Inserindo dados fictícios...");

  await prisma.progress.deleteMany();
  await prisma.process.deleteMany();

  await prisma.process.create({
    data: {
      number: "0001-2025",
      openingdate: new Date("2025-01-10"),
      description: "Ação de Cobrança",
      customer: "João Silva",
      advocate: "Dr. Roberto Silva Advocacia",
      uf: "SP",
      progress: {
        create: [
          {
            data: new Date("2025-02-10"),
            description: "Petição inicial protocolada",
          },
          { data: new Date("2025-02-01"), description: "Citação do réu" },
        ],
      },
    },
  });

  await prisma.process.create({
    data: {
      number: "0002-2025",
      openingdate: new Date("2025-02-05"),
      description: "Ação Trabalhista",
      customer: "Empresa XYZ Ltda.",
      advocate: "Carlos Souza",
      uf: "RJ",
      progress: {
        create: [
          { data: new Date("2025-02-10"), description: "Audiência inicial" },
          {
            data: new Date("2025-03-01"),
            description: "Depoimento de testemunhas",
          },
        ],
      },
    },
  });

  await prisma.process.create({
    data: {
      number: "0003-2025",
      openingdate: new Date("2025-01-10"),
      description: "Ação de Cobrança",
      customer: "Carlos Eduardo Oliveira",
      advocate: "Dra. Ana Paula Advocacia",
      uf: "MG",
      progress: {
        create: [
          {
            data: new Date("2025-01-15"),
            description: "Petição inicial protocolada",
          },
          { data: new Date("2025-02-01"), description: "Citação do réu" },
        ],
      },
    },
  });
}

main()
  .then(() => console.log("✅ Seed finalizado!"))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
