const contentful = require("contentful");

const client = contentful.createClient({
  space: "po2c06fb2ov2",
  environment: "master", // defaults to 'master' if not set
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN || "",
});

export const getProducts = async () => {
  const products = await client.getEntries({
    content_type: "product",
    "fields.isLive": true,
    order: "fields.displayOrder",
  });
  return products.items;
};

export const getPlayers = async () => {
  const players = await client.getEntries({
    content_type: "player",
    order: "fields.postDate",
  });
  return players.items;
};

export const getTrivia = async () => {
  const trivia = await client.getEntries({
    content_type: "trivia",
  });
  return trivia.items;
};
