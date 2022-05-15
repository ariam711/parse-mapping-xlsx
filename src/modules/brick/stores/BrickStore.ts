import { action, makeObservable, observable, toJS } from 'mobx';
import { CategoryTreeType } from '../types/CategoryTreeType';
import CategoryService from '../services/CategoryService';
import { TreeNodeType } from '../types/TreeNodeType';
import { findNodeByIdAndDelete, findNodeByIdAndUpdate } from '../utils/tree';

export class BrickStore {
  // region ATTRIBUTES
  categoryTree: TreeNodeType[] = [];
  gettingCategories = false;
  failedToGetCategories = false;
  editingLabel: string | null = null;
  editingId: string | null = null;
  // endregion
  private CategoryService: CategoryService;

  constructor() {
    makeObservable<BrickStore>(this, {
      categoryTree: observable,
      gettingCategories: observable,
      failedToGetCategories: observable,
      editingLabel: observable,
      editingId: observable,

      setCategories: action,
      setGettingCategories: action,
      setFailedToGetCategories: action,
      setEditingLabel: action,
      setEditingId: action
    });
    this.CategoryService = new CategoryService();
    void this.init();
  }

  // region SETTERS
  setCategories = (categories: TreeNodeType[]) => {
    this.categoryTree = categories;
  };

  setGettingCategories = (state: boolean) => {
    this.gettingCategories = state;
  };

  setFailedToGetCategories = (state: boolean) => {
    this.failedToGetCategories = state;
  };

  setEditingLabel = (label: string | null) => {
    this.editingLabel = label;
  };

  setEditingId = (id: string | null) => {
    this.editingId = id;
  };
  // endregion

  // region METHODS
  private init = () => {
    void this.getCategories();
  };

  private convertCategoryTreeToTreeNode = (category: CategoryTreeType): TreeNodeType => {
    const treeNode: TreeNodeType = {
      key: category.id.toString(),
      label: category.name,
      url: category.url,
      data: category.id.toString(),
      enabled: true,
      children: []
    };

    if (category.children_data.length > 0) {
      category.children_data.forEach((child: CategoryTreeType) =>
        treeNode.children.push(this.convertCategoryTreeToTreeNode(child))
      );
    }

    return treeNode;
  };

  private getCategories = async () => {
    try {
      this.setGettingCategories(true);
      const response = await this.CategoryService.getCategories();
      const categoryTree: CategoryTreeType = await response.json();
      const treeNode = this.convertCategoryTreeToTreeNode(categoryTree);
      this.setCategories(treeNode.children);
    } catch (e) {
      this.setFailedToGetCategories(true);
      console.log(e);
    } finally {
      this.setFailedToGetCategories(false);
      this.setGettingCategories(false);
    }
  };
  // endregion

  // region EVENTS
  onGetCategories = () => {
    void this.getCategories();
  };

  onToggleCategory = (id: string) => {
    let categoryTreeCopy = toJS(this.categoryTree);
    let enabled: boolean;
    const toggleCategory = (node: TreeNodeType) => {
      enabled = !node.enabled;
      return { ...node, enabled };
    };
    const toggleChildren = (node: TreeNodeType) => ({ ...node, enabled });
    categoryTreeCopy = findNodeByIdAndUpdate(categoryTreeCopy, id, toggleCategory, toggleChildren);
    this.setCategories(categoryTreeCopy);
  };

  onSetCategoryLabel = (id: string, label: string) => {
    let categoryTreeCopy = toJS(this.categoryTree);
    categoryTreeCopy = findNodeByIdAndUpdate(categoryTreeCopy, id, node => ({ ...node, label }));
    this.setCategories(categoryTreeCopy);
    this.setEditingLabel(null);
    this.setEditingId(null);
  };

  onDeleteCategory = (id: string) => {
    let categoryTreeCopy = toJS(this.categoryTree);
    categoryTreeCopy = findNodeByIdAndDelete(categoryTreeCopy, id);
    this.setCategories(categoryTreeCopy);
  };
  // endregion
}
