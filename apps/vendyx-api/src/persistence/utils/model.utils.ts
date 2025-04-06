/**
 * Returns true if model has a deletedAt property
 *
 * @description
 * In our prisma clients we add a global query modifier to filter out soft deleted records.
 * This function is used to determine if a model has a deletedAt property and should be filtered.
 */
export const modelHasDeletedAtProperty = (model: string) => {
  return (
    model !== 'VariantOptionValue' &&
    model !== 'ProductOption' &&
    model !== 'ProductAsset' &&
    model !== 'StateZone' &&
    model !== 'DiscountOrder' &&
    model !== 'ProductTag' &&
    model !== 'Tag' &&
    model !== 'Favorite'
  );
};
