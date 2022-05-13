export type TreeNodeType = {
  key: string;
  label: string;
  url: string;
  data: string;
  icon?: string;
  children: TreeNodeType[];
};
