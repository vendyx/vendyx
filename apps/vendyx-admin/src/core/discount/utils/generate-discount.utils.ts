import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('123456789ABCDEFGHJKLMNPQRSTUVWXYZ', 12);

/**
 * @description
 * Generate a random discount code
 */
export function generateDiscountCode(): string {
  return nanoid();
}
