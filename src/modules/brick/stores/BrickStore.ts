import { action, makeObservable, observable } from 'mobx';
import { CategoryType } from '../types/CategoryType';
import CategoryService from '../services/CategoryService';

export class BrickStore {
  // region ATTRIBUTES
  categories: CategoryType[] = [];
  gettingCategories = false;
  failedToGetCategories = false;
  // endregion
  private CategoryService: CategoryService;

  constructor() {
    makeObservable<BrickStore>(this, {
      categories: observable,
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
  setCategories = (categories: CategoryType[]) => {
    this.categories = categories;
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
  // endregion

  // region EVENTS
  onGetCategories = async () => {
    try {
      this.setGettingCategories(true);
      const response = await this.CategoryService.getCategories();
      const categories = await response.json();
      console.log(categories);
    } catch (e) {
      this.setFailedToGetCategories(true);
      console.log(e);
    } finally {
      this.setGettingCategories(false);
    }
  };
  // endregion
}
