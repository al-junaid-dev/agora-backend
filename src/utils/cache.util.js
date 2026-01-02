const cache = new Map();
const TTL = 60 * 1000; // 1 minute

export const getCache = (key) => {
  const cached = cache.get(key);
  if (!cached) return null;

  if (Date.now() > cached.expiry) {
    cache.delete(key);
    return null;
  }

  return cached.data;
};

export const setCache = (key, data) => {
  cache.set(key, {
    data,
    expiry: Date.now() + TTL,
  });
};
