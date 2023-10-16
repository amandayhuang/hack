const handler = async (event, context) => {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify({ foo: "bar" }),
    };
  } catch (e) {
    console.error(e);
    return {
      statusCode: 500,
    };
  }
};

export { handler };
