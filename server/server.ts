import "dotenv/config";
import { GraphQL } from "./src";
import { connectToDB } from "./src/database";
import { configurePassport } from "./src/config/passport.config";

const port = process.env.PORT || 7000;

async function startServer() {
  configurePassport();
  const app = await GraphQL();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  await connectToDB();
}

startServer();
