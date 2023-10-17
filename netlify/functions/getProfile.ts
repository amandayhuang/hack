import { Handler } from "@netlify/functions";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ProfileEntry {
  passage_id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
}

const handler: Handler = async (event, context) => {
  if (event.body) {
    const body = JSON.parse(event.body);
    const newProfile = JSON.parse(body.data) as ProfileEntry;

    const existingProfile = await prisma.profile.findFirst({
      where: { passage_id: newProfile.passage_id },
    });

    if (existingProfile) {
      return {
        statusCode: 200,
        body: JSON.stringify(
          {
            ...existingProfile,
          },
          (_key, value) =>
            // need to add a custom serializer because CockroachDB IDs map to
            // JavaScript BigInts, which JSON.stringify has trouble serializing.
            typeof value === "bigint" ? value.toString() : value
        ),
      };
    }

    const dbProfile = await prisma.profile.create({
      data: {
        passage_id: newProfile.passage_id,
        email: newProfile.email,
        first_name: newProfile.first_name,
        last_name: newProfile.last_name,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          ...dbProfile,
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
