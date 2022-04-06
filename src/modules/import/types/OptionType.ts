export type OptionType<T = string | number, D = any> = {
  head: string;
  map: T;
  data?: D;
};
