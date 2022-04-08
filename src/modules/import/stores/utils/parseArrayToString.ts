export function parseArrayToString(obj: Record<string, any>, key: string) {
  let value = obj[key];
  if (value && Array.isArray(value)) {
    value = value.join(',');
    if (key === 'video_url') {
      value = value.replace(/\/watch\?v=/gi, '/embed/');
    }
    obj[key] = value;
  }
}
