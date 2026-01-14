import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;
const MONGODB_USER = process.env.MONGODB_USER;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const MONGODB_DB = process.env.MONGODB_DB;

if (!MONGODB_URI) {
  throw new Error(
    "MONGODB_URI is not defined. Please create an env file (see env.sample)."
  );
}

type ConnectionCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalWithMongoose = globalThis as typeof globalThis & {
  __mongooseCache?: ConnectionCache;
};

export async function connectToDatabase() {
  let reconstructedUri: string | null = null;
  // Quick validation to catch common mistakes with credentials (unencoded special chars)
  try {
    const schemeIdx = MONGODB_URI.indexOf("//");
    if (schemeIdx !== -1) {
      const rest = MONGODB_URI.substring(schemeIdx + 2);
      // authority is up to the first '/' or '?' or end
      const endIdx = Math.min(
        ...[rest.indexOf("/"), rest.indexOf("?")]
          .filter((i) => i !== -1)
          .concat(rest.length)
      );
      const authority = rest.slice(0, endIdx);
      // if there are multiple '@' signs in the authority, it's likely the password contains '@' (must be percent-encoded)
      const atCount = (authority.match(/@/g) || []).length;
      if (atCount > 1) {
        // If the user supplied MONGODB_USER & MONGODB_PASSWORD, prefer to rebuild the
        // connection string using percent-encoded credentials to avoid this issue.
        if (MONGODB_USER && MONGODB_PASSWORD) {
          const lastAt = rest.lastIndexOf("@");
          if (lastAt === -1) {
            throw new Error("Unexpected MongoDB URI format when attempting to rebuild credentials.");
          }
          const hostAndRest = rest.slice(lastAt + 1);
          // Build a safe URI using encoded user/password
          const safeCreds = `${encodeURIComponent(MONGODB_USER)}:${encodeURIComponent(
            MONGODB_PASSWORD
          )}`;
          // Construct new connection string by preserving scheme and host/path
          const newUri = `${MONGODB_URI.slice(0, schemeIdx + 2)}${safeCreds}@${hostAndRest}`;
          console.warn(
            "Detected possible unencoded credentials in MONGODB_URI. Rebuilding connection URI from MONGODB_USER/MONGODB_PASSWORD with percent-encoding. New URI will be used for the connection."
          );
          // Replace connection string for use below
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          reconstructedUri = newUri;
        } else {
          throw new Error(
            "Detected more than one '@' character in your MongoDB connection authority. This usually means your username/password contains special characters (for example '@') that must be URL-encoded. Either percent-encode special characters in credentials (e.g. '@' => '%40'), or set MONGODB_USER and MONGODB_PASSWORD as separate environment variables so the app can build a safe connection string."
          );
        }
      }
    }
  } catch (err) {
    // surface a clear error early
    console.error("MongoDB URI validation failed:", (err as Error).message);
    throw err;
  }
  const cache =
    globalWithMongoose.__mongooseCache ??
    (globalWithMongoose.__mongooseCache = { conn: null, promise: null });

  if (cache.conn) {
    return cache.conn;
  }

  if (!cache.promise) {
    // Start connection and capture errors so we can give a helpful message
    cache.promise = (async () => {
      try {
        // if we reconstructed the URI above use it, otherwise use the configured MONGODB_URI
        const connectionUri = reconstructedUri || MONGODB_URI;
        const mongooseInstance = await mongoose.connect(connectionUri as string, {
          dbName: MONGODB_DB || "CollabX",
        });
        return mongooseInstance;
      } catch (err) {
        // Reset promise so a subsequent call can retry and avoid a permanently rejected promise
        cache.promise = null;
        console.error("Failed to connect to MongoDB:", (err as Error).message);
        // Re-throw with clearer message for callers
        throw new Error(
          `Unable to connect to MongoDB. Check MONGODB_URI and network access. Error: ${(err as Error).message}`
        );
      }
    })();
  }

  cache.conn = await cache.promise;
  return cache.conn;
}

