const contentful = require("contentful");

/**
 * Function to create the contentful client
 */
export const client = contentful.createClient({
  space: process.env.NEXT_PUBLIC_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
});
