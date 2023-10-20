import { Handler } from "@netlify/functions";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface MatchNoteEntry {
  match_id: string;
  note: string;
}

const handler: Handler = async (event, context) => {
  if (event.body) {
    const body = JSON.parse(event.body);
    const matchInput = JSON.parse(body.data) as MatchNoteEntry;

    const match = await prisma.match.findUnique({
      where: { id: BigInt(matchInput.match_id) },
    });

    if (!match) {
      return {
        statusCode: 200,
        body: JSON.stringify(null, (_key, value) =>
          // need to add a custom serializer because CockroachDB IDs map to
          // JavaScript BigInts, which JSON.stringify has trouble serializing.
          typeof value === "bigint" ? value.toString() : value
        ),
      };
    }

    const matchNote = await prisma.match_Note.create({
      data: { match_id: match.id, note: matchInput.note },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          ...matchNote,
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
