import { Values } from '../../../types/ValuesType';

export const StoreTypes = {
  EBOOHOME: 'Eboohome',
  BYMILA: 'ByMila'
} as const;

export type StoreTypesType = Values<typeof StoreTypes>;
