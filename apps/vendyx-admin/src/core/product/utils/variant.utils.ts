import { type DeepPartial } from 'react-hook-form';

import { type ProductDetailsFormInput } from '../components/product-details/use-product-details-form';
import { type VariantContext } from '../contexts/variant.context';

/**
 * Generate all possible variants based on the provided options.
 *
 * @description
 * Generate in a recursive way all possible variants based on the provided options.
 * the action property is used to determine if the variant should be created or updated or none.
 *
 * If none, it means that the variant generated already exists.
 * If create, it means that the variant generated does not exist int he existing variants and should be created.
 * If update, it means that the variant generated does exist in the existing variants and just need to be updated.
 *
 * This is useful to keep a persistance of the variants that are already created.
 *
 * @example
 * const options = [
 *  { name: 'Color', values: ['Red', 'Blue'] },
 * { name: 'Size', values: ['S', 'M', 'L'] }
 * ];
 *
 * const variants = generateVariants(options);
 *
 * // values:
 * // [
 * //   { values: ['Red', 'S'], price: 0, stock: 0 },
 * //   { values: ['Red', 'M'], price: 0, stock: 0 },
 * //   { values: ['Red', 'L'], price: 0, stock: 0 },
 * //   { values: ['Blue', 'S'], price: 0, stock: 0 },
 * //   { values: ['Blue', 'M'], price: 0, stock: 0 },
 * //   { values: ['Blue', 'L'], price: 0, stock: 0 }
 * // ]
 */
export const generateVariants = (
  options: VariantContext['options'],
  existingVariants: VariantContext['variants'],
  formValues?: DeepPartial<ProductDetailsFormInput>
): GenerateVariantsReturn => {
  if (!options.length) return [];

  const [firstOption, ...restOptions] = options;

  return (
    firstOption.values
      .flatMap(value => {
        const variantAlreadyExists = existingVariants.find(variant =>
          variant.values.map(v => v.name).includes(value.name)
        );

        // This is the result when there are only one option
        if (!restOptions.length) {
          return [
            {
              id: variantAlreadyExists ? variantAlreadyExists.id : Math.random().toString(),
              values: [value],
              price: variantAlreadyExists ? variantAlreadyExists.price : (formValues?.price ?? '0'),
              stock: variantAlreadyExists
                ? variantAlreadyExists.stock
                : (Number(formValues?.stock) ?? 0),
              comparisonPrice: variantAlreadyExists
                ? variantAlreadyExists.comparisonPrice
                : (formValues?.comparisonPrice ?? '0'),
              sku: variantAlreadyExists ? variantAlreadyExists.sku : (formValues?.sku ?? ''),
              requiresShipping: variantAlreadyExists
                ? variantAlreadyExists.requiresShipping
                : (formValues?.requiresShipping ?? false),
              image: variantAlreadyExists ? variantAlreadyExists.image : undefined,
              selected: false,
              action: (variantAlreadyExists ? 'none' : 'create') as 'create' | 'update' | 'none'
            }
          ];
        }

        const variants = generateVariants(restOptions, existingVariants);

        // This is used to keep track of the variants generated
        const set = new Set();

        return variants.map(variant => {
          const newValues = [value, ...variant.values];
          const valueInString = newValues.map(v => v.name).join();

          // The base of the variant is the values without the last one
          // ej: ['Red', 'S'] => 'Red'
          // This is used to check if the base of the variant already exists in the set
          const base = newValues
            .map(v => v.name)
            .slice(0, -1)
            .join();

          // Check if the variant generated already exists in the existing variants by checking if the values are the same
          // If so, the action should be none, the variant already exists
          // If not, the action goes to be determined by the base of the variant (keep reading)
          const variantAlreadyExists = existingVariants.find(variant =>
            variant.values
              .map(v => v.name)
              .join()
              .includes(valueInString)
          );

          // Check if the base of the variant already exists in the set
          // This is useful when the existing variants are not complete due to the user removing some variants manually
          const baseExists = existingVariants.find(variant =>
            variant.values
              .map(v => v.name)
              .join()
              .includes(base)
          );

          // The persisted variant could be
          // A variant that already exists in the existing variants,
          // A variant that only need to be updated not create
          const persistedVariant =
            // If the variant already exists, the persisted variant is the current
            variantAlreadyExists ??
            // If the variant only needs to be updated, the persisted variant is the current
            (getActionForVariantGenerated(
              Boolean(variantAlreadyExists),
              Boolean(baseExists),
              set,
              base
            ) === 'update'
              ? (baseExists ?? null)
              : // If the variant is not in the existing variants and does not need to be updated,
                // then is a new variant that need to be created and for this iteration, there is no data to persist
                // we use the default values
                null);

          const variantToCreate = {
            id: persistedVariant?.id ?? Math.random().toString(),
            values: [value, ...variant.values],
            price: persistedVariant?.price ?? formValues?.price ?? '0',
            stock: persistedVariant?.stock ?? Number(formValues?.stock) ?? 0,
            comparisonPrice:
              persistedVariant?.comparisonPrice ?? formValues?.comparisonPrice ?? '0',
            sku: persistedVariant?.sku ?? formValues?.sku ?? '',
            requiresShipping:
              persistedVariant?.requiresShipping ?? formValues?.requiresShipping ?? false,
            image: persistedVariant?.image ?? undefined,
            selected: false,
            action: getActionForVariantGenerated(
              Boolean(variantAlreadyExists),
              Boolean(baseExists),
              set,
              base
            )
          };

          set.add(base);

          return variantToCreate;
        });
      })
      // Filter out variants with empty values (this is not allowed)
      .filter(variant => variant.values.filter(v => v.name).length > 0)
  );
};
type GenerateVariantsReturn = (VariantContext['variants'][0] & {
  action: 'create' | 'update' | 'none';
})[];

/**
 * Get all variants grouped by the provided option.
 */
export const getVariantsGroupedByOption = (
  option: VariantContext['options'][0],
  variants: VariantContext['variants']
) => {
  const groups: Record<string, VariantContext['variants'][0][]> = {};

  option?.values
    ?.filter(v => v.name)
    .forEach(v => {
      const variantsWithCurrentValue = variants.filter(variant =>
        variant.values?.map(v => v.id).includes(v.id)
      );

      groups[v.name] = variantsWithCurrentValue;
    });

  return groups;
};

/**
 * Get all option values that are not used in any variant.
 */
export const getUnusedOptionValues = (
  option: VariantContext['options'],
  variants: VariantContext['variants']
) => {
  const usedValues = variants.flatMap(v => v.values.map(v => v.id));
  const unusedValues = option.flatMap(o => o.values).filter(v => !usedValues.includes(v.id));

  return unusedValues;
};

const getActionForVariantGenerated = (
  variantAlreadyExists: boolean,
  baseExists: boolean,
  set: Set<unknown>,
  base: string
): 'create' | 'update' | 'none' => {
  // If the variant already exists, the action should be none, the variant already exists
  if (variantAlreadyExists) {
    return 'none';
  }

  // If the base of the variant does not exist in the existing variants,
  // (This means some variants were removed manually by the user)
  // the action should be create
  if (!baseExists) {
    return 'create';
  }

  // If the base of the variant already exists in the set
  // (This means the variant was already generated and this new one is being generated with the same base but different value)
  // ej:
  // ['Red', 'S'] => 'Red', Red is not in the set, so the action is update
  // ['Red', 'M'] => 'Red', Red is in the set, so the action is create
  if (set.has(base)) {
    return 'create';
  }

  // If the base of the variant does not exist in the set
  // (The variant was not generated yet)
  // Why update? Because the first variant generated is the same as the existing one, and to persist the variant, the action should be update
  // ej:
  // We got two variants ['S', 'M']
  // and and option is added with values ['Red', 'Blue']
  // The first variant generated is ['S', 'Red'], ['S'] is a variant that already exists, so, to keep the values of that variant we only update it with the new value
  // The second variant is ['S', 'Blue'], A variant with base S, was already generated and persisted, so the action should be create, there are no more data to persist
  return 'update';
};
