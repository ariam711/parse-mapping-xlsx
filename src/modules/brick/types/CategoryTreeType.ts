export type CategoryTreeType = {
  id: number;
  is_active: boolean;
  level: number;
  name: string;
  url: string;
  parent_id: number;
  position: number;
  product_count: number;
  children_data: CategoryTreeType[];
};
