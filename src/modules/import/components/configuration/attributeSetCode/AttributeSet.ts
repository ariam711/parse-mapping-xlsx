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
  SOUTHBAY: 'South Bay',
  OLLIIX: 'Olliix',
  PDG: 'PDG',
  COASTER: 'Coaster',
  POWELL: 'Powell',
  FOA: 'FOA'
} as const;

export type AttributeSetType = Values<typeof AttributesSet>;
