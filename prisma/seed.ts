import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const main = async () => {
  for (let i = 0; i < 20; i++) {
    const profile = await prisma.profile.create({
      data: {
        passage_id: faker.string.uuid(),
        image: faker.internet.avatar(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        description: `I'm a 75 year old living in Portland, Oregan with my dog Pickle. I'm a retired architect and I like coffee, mystery novels, and soccer.`,
        environ: "prod",
        role: "PARTICIPANT",
        phone: "+15035551234",
      },
    });

    await prisma.profile_Interest.createMany({
      data: [
        { passage_id: profile.passage_id, interest_id: 1 },
        { passage_id: profile.passage_id, interest_id: 4 },
        { passage_id: profile.passage_id, interest_id: 11 },
        { passage_id: profile.passage_id, interest_id: 13 },
        { passage_id: profile.passage_id, interest_id: 20 },
      ],
    });
  }
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
