export type CategoryType = {
  title: string;
  url: string;
  level: number;
  children?: CategoryType[];
};
