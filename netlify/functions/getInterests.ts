import { Handler } from "@netlify/functions";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ProfileEntry {
  passage_id: string;
}

const handler: Handler = async (event, context) => {
  if (event.body) {
    const body = JSON.parse(event.body);
    const profile = JSON.parse(body.data) as ProfileEntry;

    const profileDb = await prisma.profile.findFirst({
      where: { passage_id: profile.passage_id },
      include: { Profile_Interest: true },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          ...profileDb,
        },
        (_key, value) =>
          // need to add a custom serializer because CockroachDB IDs map to
          // JavaScript BigInts, which JSON.stringify has trouble serializing.
          typeof value === "bigint" ? value.toString() : value
      ),
    };
  }

  return {
    statusCode: 500,
  };
};

export { handler };
