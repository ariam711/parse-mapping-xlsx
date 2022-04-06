type CloneDataType = Record<string, unknown>;

export function clone<T = CloneDataType>(object: T): T {
  return JSON.parse(JSON.stringify(object));
}
