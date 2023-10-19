const contentful = require("contentful-management");

const client = contentful.createClient({
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN_MANAGEMENT,
});

export const uploadImage = async (image: any, passage_id: string) => {
  const space = await client.getSpace("po2c06fb2ov2");
  const environ = await space.getEnvironment("master");
  const asset = await environ.createAssetFromFiles({
    fields: {
      title: {
        "en-US": passage_id,
      },
      description: {
        "en-US": "profile photo",
      },
      file: {
        "en-US": {
          contentType: "image/svg+xml",
          fileName: passage_id,
          file: image,
        },
      },
    },
  });

  const proccessed = await asset.processForAllLocales();
  const published = await proccessed.publish();
  return published;
};
