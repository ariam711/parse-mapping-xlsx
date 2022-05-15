export type TreeNodeType = {
  key: string;
  label: string;
  url: string;
  data: string;
  enabled: boolean;
  icon?: string;
  children: TreeNodeType[];
};
