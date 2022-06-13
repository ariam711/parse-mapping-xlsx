import randomstring from 'randomstring';
import slugify from 'slugify';

export function generateUrlKey(value: string, addRandomString = true, keepSlashes = false): string {
  const options: any = { lower: true };
  if (keepSlashes) options.remove = /[^\w\s$*_+~.()'"!\-:@/]+/g;
  const slug = slugify(value, options);
  let randomString = '';
  if (addRandomString) {
    randomString = randomstring.generate({ length: 5, capitalization: 'lowercase' });
  }
  return `${slug.replace(/[.]/gi, '-')}${randomString}`;
}
