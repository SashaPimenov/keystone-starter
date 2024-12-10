import { getContext } from "@keystone-6/core/context";
import config from "../../keystone";
import * as PrismaModule from "myprisma";

export const keystoneContext =
  globalThis.keystoneContext || getContext(config, PrismaModule);

if (process.env.NODE_ENV !== "production")
  globalThis.keystoneContext = keystoneContext;
