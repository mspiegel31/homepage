import { ConfigReader } from "@backstage/config";
import { UrlReaders } from "@backstage/backend-defaults/urlReader"
import createLogger from "utils/logger";

const logger = createLogger("configFetcher");
const config = new ConfigReader({})

export const urlReader = UrlReaders.default({ config, logger})
