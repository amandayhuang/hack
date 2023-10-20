import { Handler } from "@netlify/functions";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface MatchEntry {
  passage_id: string;
}

const handler: Handler = async (event, context) => {
  if (event.body) {
    const body = JSON.parse(event.body);
    const profile = JSON.parse(body.data) as MatchEntry;

    const profileDb = await prisma.profile.findFirst({
      where: { passage_id: profile.passage_id },
    });

    if (!profileDb) {
      return {
        statusCode: 200,
        body: JSON.stringify(null, (_key, value) =>
          // need to add a custom serializer because CockroachDB IDs map to
          // JavaScript BigInts, which JSON.stringify has trouble serializing.
          typeof value === "bigint" ? value.toString() : value
        ),
      };
    }

    // check for existing match
    const existingMatch = await prisma.match.findFirst({
      where: {
        OR: [
          {
            volunteer_passage_id: profileDb.passage_id,
          },
          {
            participant_passage_id: profileDb.passage_id,
          },
        ],
        AND: [
          {
            status: "ACTIVE",
          },
        ],
      },
    });

    if (existingMatch) {
      return {
        statusCode: 200,
        body: JSON.stringify(null, (_key, value) =>
          // need to add a custom serializer because CockroachDB IDs map to
          // JavaScript BigInts, which JSON.stringify has trouble serializing.
          typeof value === "bigint" ? value.toString() : value
        ),
      };
    }

    // find new match
    const newMatch: Record<string, any>[] = await prisma.$queryRaw`
    SELECT p.*
    FROM "Profile" p
    LEFT JOIN "Match" m on m.volunteer_passage_id = p.passage_id AND m.status = 'ACTIVE'
    LEFT JOIN "Match" m2 on m2.participant_passage_id = p.passage_id AND m2.status = 'ACTIVE'
    WHERE p.role != ${profileDb.role}
    AND m.id is NULL AND m2.id is NULL
    AND p.environ = ${profileDb.environ}
    LIMIT 1
    `;

    // little sleep to seem like we're doing something
    await new Promise((resolve) => setTimeout(resolve, 3000));

    if (newMatch.length === 0) {
      return {
        statusCode: 200,
        body: JSON.stringify(null, (_key, value) =>
          // need to add a custom serializer because CockroachDB IDs map to
          // JavaScript BigInts, which JSON.stringify has trouble serializing.
          typeof value === "bigint" ? value.toString() : value
        ),
      };
    }

    const matchProfile = await prisma.profile.findFirst({
      where: { passage_id: newMatch[0].passage_id },
    });

    // create match row
    let match;

    if (profileDb.role === "VOLUNTEER") {
      match = await prisma.match.create({
        data: {
          volunteer_passage_id: profileDb.passage_id,
          participant_passage_id: newMatch[0].passage_id,
          status: "ACTIVE",
        },
      });
    } else {
      match = await prisma.match.create({
        data: {
          volunteer_passage_id: newMatch[0].passage_id,
          participant_passage_id: profileDb.passage_id,
          status: "ACTIVE",
        },
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          ...match,
          first_name: matchProfile?.first_name,
          last_name: matchProfile?.last_name,
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
