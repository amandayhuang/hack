import { Handler } from "@netlify/functions";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface GetMatchEntry {
  match_id: number;
}

const handler: Handler = async (event, context) => {
  if (event.body) {
    const body = JSON.parse(event.body);
    const match = JSON.parse(body.data) as GetMatchEntry;

    const notes = await prisma.match_Note.findMany({
      where: { match_id: BigInt(match.match_id) },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          notes,
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
