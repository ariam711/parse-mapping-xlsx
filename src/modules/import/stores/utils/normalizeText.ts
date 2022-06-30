/* eslint-disable no-control-regex */
export function normalizeText(text: string): string {
  return text
    .replace(/\x19 */gi, "'")
    .replace(/ *TBD */g, '')
    .replace(/：/gi, ': ')
    .replace(/，/gi, ', ')
    .replace(/\x14/gi, ',')
    .replace(/–/gi, '-')
    .replace(/\x1d ?/gi, '”')
    .replace(/\x13 */gi, '-')
    .replace(/\xa0 */gi, ' ')
    .replace(/\x1c */gi, '“')
    .replace(/[·]/gi, '•')
    .replace(/ *; */gi, '; ')
    .replace(/[^A-Za-zÀ-ÿ\w$*_+~.,()'"”!\-:@/•\n\t ;‘’=%&?]+/gi, '')
    .replace(/ +/gi, ' ');
}
