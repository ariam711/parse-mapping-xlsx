import { action, makeObservable, observable } from 'mobx';
import { CategoryType } from '../types/CategoryType';
import CategoryService from '../services/CategoryService';

export class BrickStore {
  // region ATTRIBUTES
  categories: CategoryType[] = [];
  // endregion
  private CategoryService: CategoryService;

  constructor() {
    makeObservable<BrickStore>(this, {
      categories: observable,

      setCategories: action
    });
    this.CategoryService = new CategoryService();
    this.init();
  }

  // region SETTERS
  setCategories = (categories: CategoryType[]) => {
    this.categories = categories;
  };
  // endregion

  // region METHODS
  init = () => {
    // get default categories
  };

  onGetCategories = async () => {
    const response = await this.CategoryService.getCategories();
    const categories = await response.json();
    console.log(categories);
  };
  // endregion
}
