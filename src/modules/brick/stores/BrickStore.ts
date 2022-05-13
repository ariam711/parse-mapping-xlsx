import { action, makeObservable, observable } from 'mobx';
import { CategoryTreeType } from '../types/CategoryTreeType';
import CategoryService from '../services/CategoryService';
import { TreeNodeType } from '../types/TreeNodeType';

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
    this.init();
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
  init = () => {
    // get default categories
  };

  convertCategoryTreeToTreeNode = (category: CategoryTreeType): TreeNodeType => {
    const treeNode: TreeNodeType = {
      key: category.id.toString(),
      label: category.name,
      url: category.url,
      data: category.id.toString(),
      icon: '',
      children: []
    };

    if (category.children_data.length > 0) {
      category.children_data.forEach((child: CategoryTreeType) => {
        return treeNode.children.push(this.convertCategoryTreeToTreeNode(child));
      });
    }

    return treeNode;
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
      this.setGettingCategories(false);
    }
  };
  // endregion
}
