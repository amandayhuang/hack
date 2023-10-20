import { Handler } from "@netlify/functions";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface GetMatchEntry {
  passage_id: string;
}

const handler: Handler = async (event, context) => {
  if (event.body) {
    const body = JSON.parse(event.body);
    const profile = JSON.parse(body.data) as GetMatchEntry;

    const myMatch = await prisma.match.findFirst({
      where: {
        OR: [
          {
            volunteer_passage_id: profile.passage_id,
          },
          {
            participant_passage_id: profile.passage_id,
          },
        ],
        AND: [
          {
            status: "ACTIVE",
          },
        ],
      },
    });

    if (!myMatch) {
      return {
        statusCode: 200,
        body: JSON.stringify(null, (_key, value) =>
          // need to add a custom serializer because CockroachDB IDs map to
          // JavaScript BigInts, which JSON.stringify has trouble serializing.
          typeof value === "bigint" ? value.toString() : value
        ),
      };
    }

    const myMatchPassageId =
      myMatch.volunteer_passage_id === profile.passage_id
        ? myMatch.participant_passage_id
        : myMatch.volunteer_passage_id;

    const matchProfile = await prisma.profile.findFirst({
      where: { passage_id: myMatchPassageId },
      include: { Profile_Interest: true },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          ...matchProfile,
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
