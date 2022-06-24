const axios = require('axios');
const PIXABAY_KEY = '28190532-07c65b576fc64781f10f94256';
const BASE_URL = 'https://pixabay.com/api/';
const options = {
  headers: {
    Authorization: PIXABAY_KEY,
  },
};

export default class NewsPixabayService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40
  }

  async getPixabay() {
    try {
      const url = `${BASE_URL}?key=${PIXABAY_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
      const response = await axios.get(url);
      console.log(response);
      // const {hits,totalHits} = response.data
      this.page += 1;
      return response;
    } catch (error) {
      console.error(error);
    }
  }
  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
