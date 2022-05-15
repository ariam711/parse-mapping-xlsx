import { action, makeObservable, observable, toJS } from 'mobx';
import { CategoryTreeType } from '../types/CategoryTreeType';
import CategoryService from '../services/CategoryService';
import { TreeNodeType } from '../types/TreeNodeType';
import { findNodeByIdAndUpdate } from '../utils/tree';

export class BrickStore {
  // region ATTRIBUTES
  categoryTree: TreeNodeType[] = [];
  gettingCategories = false;
  failedToGetCategories = false;
  // endregion
  private CategoryService: CategoryService;

  constructor() {
    makeObservable<BrickStore>(this, {
      categoryTree: observable,
      gettingCategories: observable,
      failedToGetCategories: observable,

      setCategories: action,
      setGettingCategories: action,
      setFailedToGetCategories: action
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
  // endregion

  // region METHODS
  private init = async () => {
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

  private toggleCategory = (id: string) => {
    let categoryTreeCopy = toJS(this.categoryTree);
    categoryTreeCopy = findNodeByIdAndUpdate(categoryTreeCopy, id, node => ({ ...node, enabled: !node.enabled }));
    this.setCategories(categoryTreeCopy);
  };
  // endregion

  // region EVENTS
  onGetCategories = async () => {
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

  onToggleCategory = (id: string) => {
    this.toggleCategory(id);
  };
  // endregion
}
