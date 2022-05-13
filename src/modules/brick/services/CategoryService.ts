const baseUrl = 'https://mcstaging.eboohome.com/rest/V1/categories';

class CategoryService {
  async getCategories() {
    return await fetch(`${baseUrl}`);
  }
}

export default CategoryService;
