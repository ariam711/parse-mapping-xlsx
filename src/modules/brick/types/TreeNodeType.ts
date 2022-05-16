export type TreeNodeType = {
  key: string;
  label: string;
  url: string;
  level: number;
  data: string;
  enabled: boolean;
  icon?: string;
  children: TreeNodeType[];
};
