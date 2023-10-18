import { Handler } from "@netlify/functions";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface InterestEntry {
  passage_id: string;
  interests: number[];
}

const handler: Handler = async (event, context) => {
  if (event.body) {
    const body = JSON.parse(event.body);
    const input = JSON.parse(body.data) as InterestEntry;
    console.log("INPUT", input);

    // remove old entries
    await prisma.profile_Interest.deleteMany({
      where: {
        passage_id: input.passage_id,
      },
    });

    // insert new entries
    await prisma.profile_Interest.createMany({
      data: input.interests.map((i) => {
        return { passage_id: input.passage_id, interest_id: i };
      }),
      skipDuplicates: true, // Skip 'Bobo'
    });

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          passage_id: input.passage_id,
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
