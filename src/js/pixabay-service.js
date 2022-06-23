const axios = require('axios');
export default class NewsPixabayService {
    constructor(){
        this.searchQuery = ''
        this.page = 1
    }

    
    async getPixabay(){
        try {
            console.log(this)
            const url = `${BASE_URL}?key=${PIXABAY_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
            const response = await axios.get(url);
            const {hits,totalHits} = response.data
            this.page+=1
            console.log(response);
            return {hits,totalHits}
          } catch (error) {
            console.error(error);
          }
    }
    resetPage(){
        this.page = 1
    }

    get query(){
        return this.searchQuery
    }

    set query(newQuery){
        this.searchQuery = newQuery
    }
}
