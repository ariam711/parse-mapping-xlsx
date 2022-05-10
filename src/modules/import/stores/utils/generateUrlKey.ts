import randomstring from 'randomstring';
import slugify from 'slugify';

export function generateUrlKey(value: string): string {
  const slug = slugify(value, { lower: true });
  const id = randomstring.generate({ length: 5, capitalization: 'lowercase' });
  return `${slug.replace(/[.]/gi, '-')}-${id}`;
}
