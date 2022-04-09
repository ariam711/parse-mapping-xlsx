import { Values } from '../../../types/ValuesType';

export const AttributesSet = {
  DEFAULT: 'Default',
  RUGS: 'Rugs',
  RUGPADS: 'Rug Pads',
  MONARCH: 'Monarch',
  MATTRESS: 'Mattress',
  LINON: 'Linon',
  JEWELRY: 'jewelry',
  FURNITURE: 'Furniture',
  SOUTHBAY: 'South Bay'
} as const;

export type AttributeSetType = Values<typeof AttributesSet>;
