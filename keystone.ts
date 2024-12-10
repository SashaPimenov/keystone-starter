import { lists } from "./src/keystone/schema";
import { config } from "@keystone-6/core";
import * as dotenv from "dotenv";

dotenv.config();
const DATABASE_URL = process.env.DATABASE_URL;

export default config({
  db: {
    provider: "postgresql",
    url: DATABASE_URL || `postgresql://postgres:postgres@127.0.0.1:25432/main`,
  },
  lists,
});
