const { PrismaClient } = import('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        name: "Optimum Nutrition Gold Standard Whey",
        description: "Proteína en polvo con 24g de proteína por porción.",
        price: 148,
        discount: 20,
        stock: 10,
        imageUrl: "/images/protein1.png",
      },
      {
        name: "MyProtein Impact Whey",
        description: "Proteína de alta calidad, 21g de proteína por porción.",
        price: 92,
        discount: 30,
        stock: 5,
        imageUrl: "/images/protein2.png",
      }
    ]
  });
  console.log("Productos agregados");
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
