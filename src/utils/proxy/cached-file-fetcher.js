import cache from "memory-cache";
import yaml from "js-yaml";
import { urlReader } from "utils/fileFetcher";

export async function fetchConfig(url) {
  const cacheKey = `etag-${url}`;
  const cacheItem = cache.get(cacheKey);
  try {
    const { buffer, etag } = await urlReader.readUrl(url, {
      etag: cacheItem?.etag,
    });
    const data = await buffer().then(data => yaml.load(data));
    cache.put(cacheKey, { etag, data });
    return data;

  } catch (e) {
    if (e.name === 'NotModifiedError' && cacheItem) {
      return cacheItem.data;
    }
    throw new Error(`Failed to fetch config at ${url}`);
  }
}