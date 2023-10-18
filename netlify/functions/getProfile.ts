import { Handler } from "@netlify/functions";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface ProfileEntry {
  passage_id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
}

const handler: Handler = async (event, context) => {
  if (event.body) {
    const body = JSON.parse(event.body);
    const newProfile = JSON.parse(body.data) as ProfileEntry;

    const profile = await prisma.profile.upsert({
      where: { passage_id: newProfile.passage_id },
      create: {
        passage_id: newProfile.passage_id,
        first_name: newProfile.first_name,
        last_name: newProfile.last_name,
        phone: newProfile.phone,
        email: newProfile.email,
      },
      update: {
        first_name: newProfile.first_name,
        last_name: newProfile.last_name,
        phone: newProfile.phone,
        email: newProfile.email,
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          ...profile,
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
