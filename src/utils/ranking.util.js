export const rankProducts = (products) => {
  if (!products.length) return [];

  // ✅ If only one product, give high confidence score
  if (products.length === 1) {
    return [
      {
        ...products[0],
        score: 95,
      },
    ];
  }

  const maxPrice = Math.max(...products.map(p => p.price));
  const maxDistance = Math.max(...products.map(p => p.distance));

  return products
    .map(product => {
      const normalizedPrice =
        maxPrice === 0 ? 0 : product.price / maxPrice;
      const normalizedDistance =
        maxDistance === 0 ? 0 : product.distance / maxDistance;

      let score =
        100 - ((0.6 * normalizedPrice + 0.4 * normalizedDistance) * 100);

      // ✅ Clamp score (never negative)
      score = Math.max(30, Math.round(score));

      return {
        ...product,
        score,
      };
    })
    .sort((a, b) => b.score - a.score);
};
