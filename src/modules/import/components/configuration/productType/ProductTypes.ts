import { Values } from '../../../types/ValuesType';

export const ProductTypes = {
  SIMPLE: 'simple',
  GROUPED: 'grouped',
  BUNDLE: 'bundle'
} as const;

export type ProductTypesType = Values<typeof ProductTypes>;
