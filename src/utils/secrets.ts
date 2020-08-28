export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === "production"; // Anything else is treated as 'dev'
export const MONGODB_URI = prod ? process.env["MONGODB_URI"] : process.env["MONGODB_URI_LOCAL"];
if (!MONGODB_URI) {
  if (prod) {
      console.error("No mongo connection string. Set MONGODB_URI environment variable.");
  } else {
      console.error("No mongo connection string. Set MONGODB_URI_LOCAL environment variable.");
  }
  process.exit(1);
}
