import { action, computed, makeObservable, observable, toJS } from 'mobx';
import { CategoryTreeType } from '../types/CategoryTreeType';
import CategoryService from '../services/CategoryService';
import { TreeNodeType } from '../types/TreeNodeType';
import { findNodeByIdAndDelete, findNodeByIdAndInsert, findNodeByIdAndUpdate } from '../../../utils/tree';
import { generateUrlKey } from '../../../utils/generateUrlKey';
import randomstring from 'randomstring';
import brickTemplate from '../templates/brickTemplate';

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
      brick: computed,

      setCategories: action,
      setGettingCategories: action,
      setFailedToGetCategories: action,
      setEditingLabel: action,
      setEditingId: action
    });
    this.CategoryService = new CategoryService();
    void this.init();
  }

  // region GETTERS
  get brick() {
    const rootCategory: TreeNodeType = {
      key: 'root',
      label: 'Root',
      url: '',
      level: 0,
      data: '',
      enabled: true,
      icon: '',
      children: toJS(this.categoryTree)
    };
    return this.generateTemplate(rootCategory, brickTemplate);
  }
  // endregion

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

  // TODO: optimize this method
  private convertCategoryTreeToTreeNode = (category: CategoryTreeType, parentUrl?: string): TreeNodeType => {
    let url = parentUrl ? `${parentUrl}/${category.name}` : category.name;
    url = generateUrlKey(url, false, true).replace('default-category/', '');
    const treeNode: TreeNodeType = {
      key: category.id.toString(),
      label: category.name,
      level: category.level - 1,
      url,
      data: category.id.toString(),
      enabled: true,
      children: []
    };

    if (category.children_data.length > 0) {
      category.children_data.forEach((child: CategoryTreeType) =>
        treeNode.children.push(this.convertCategoryTreeToTreeNode(child, url))
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

  private generateTemplate = (
    { level, url, label, children, enabled }: TreeNodeType,
    accumulatedTemplate = ''
  ): string => {
    if (!enabled) return accumulatedTemplate;
    let template = '';
    switch (level) {
      case 0:
        template = accumulatedTemplate;
        break;
      case 1:
        template = `
<div class='menu-item has-submenu'>
  <div class='menu-title'><a>${label}</a></div>
  ${
    children?.length
      ? `
  <div class='menu-content-wrap'> 
    <div class='menu-content'>
      {{category2}}
    </div>
    <div class='menu-bottom-content'>
        <div class='menu-bottom-item'><a href="{{store url='${url}'}}">Shop All ${label}</a></div>
      </div>
  </div>`
      : ''
  }
</div>`;
        break;
      case 2:
        template = `
<div class='menu-content-item has-modile-submenu'>
  <div class='menu-content-item-header'>${label}</div>
    ${
      children?.length
        ? `
    <div class='menu-content-item-submenu'>
      <div class='submenu-item'>
        <ol>
          {{category3}}
        </ol>
      </div>
    </div>`
        : ''
    }
</div>`;
        break;
      case 3:
        template = `
          <li><a href="{{store url='${url}'}}">${label}</a>
            ${children?.length ? `<ol>{{category4}}</ol>` : ''} 
          </li>`;
        break;
      case 4:
        template = `
          <li><a href="{{store url='${url}'}}">${label}</a></li>`;
        break;
      default:
        break;
    }

    template = accumulatedTemplate.replace(`{{category${level}}}`, `${template}{{category${level}}}`);

    if (children?.length) {
      children.forEach(child => {
        template = `${this.generateTemplate(child, template)}`;
      });
      template.replace(`{{category${level}}}`, '');
    }

    return template.replace(`{{category${level + 1}}}`, '');
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

  onAddCategory = (id: string) => {
    let categoryTreeCopy = toJS(this.categoryTree);
    const newNode: TreeNodeType = {
      key: randomstring.generate({ length: 5, capitalization: 'lowercase' }),
      label: 'New Category',
      level: 0,
      url: '',
      data: 'New Category',
      enabled: true,
      children: []
    };
    categoryTreeCopy = findNodeByIdAndInsert(categoryTreeCopy, id, newNode);
    this.setCategories(categoryTreeCopy);
  };
  // endregion
}
