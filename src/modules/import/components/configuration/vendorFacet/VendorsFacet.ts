import { Values } from '../../../types/ValuesType';

export const VendorsFacet = {
  LUXCOM: 'Luxcom',
  RICHARDCANNON: 'Richard Cannon',
  KNICKERBOCKER: 'KnickerBocker',
  ASHLEY: 'Ashley',
  SOUTHBAY: 'South Bay',
  LINON: 'Linon',
  MONARCH: 'Monarch',
  OLLIIX: 'Olliix',
  PDG: 'PDG',
  COASTER: 'Coaster',
  POWELL: 'Powell',
  FOA: 'FOA'
} as const;

export type VendorFacetType = Values<typeof VendorsFacet>;
