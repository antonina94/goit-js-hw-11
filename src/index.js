import NewsPixabayService from './/js//pixabay-service';
import ".///sass///_example.scss"
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import LoadMoreBtn from './/js///load-more-btn'
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";



const form = document.querySelector('.search-form')
const gallery = document.querySelector('.gallery')
const button = document.querySelector('.load-more')

let per_page = 0


const loadmorebtn = new LoadMoreBtn({selector:'[type=button]',
 hidden:true})
console.log(loadmorebtn)



const newsPixabayService = new NewsPixabayService()
console.log(newsPixabayService)



PIXABAY_KEY = '28190532-07c65b576fc64781f10f94256'
BASE_URL = 'https://pixabay.com/api/'


form.addEventListener('submit', formSubmit)
loadmorebtn.refs.button.addEventListener('click', onLoadMore)

function formSubmit(event){
    event.preventDefault()
    clearGallery()
    newsPixabayService.query = event.target.elements.searchQuery.value
    loadmorebtn.show()
    newsPixabayService.resetPage()
    if(newsPixabayService.query === ''){
      loadmorebtn.hide()
     Notify.failure("Sorry, there are no images matching your search query. Please try again.")
     return
    }
  getPixabay()
  
}

async function getPixabay(){
  loadmorebtn.disable()
  try {
      const response = await newsPixabayService.getPixabay()
      const {hits,totalHits} = response

      console.log(response)
      loadmorebtn.enable()
      renderPixabay(hits)
      if(totalHits < newsPixabayService.page){
        loadmorebtn.hide()
        Notify.info("We're sorry, but you've reached the end of search results.")
      }
      
      if(hits.length === 0){
        loadmorebtn.hide()
       return Notify.failure("Sorry, there are no images matching your search query. Please try again.")
      }
      if(totalHits > newsPixabayService.page){
        Notify.info(`Hooray! We found ${response.totalHits} images.`)
      }
      lightbox()
    
  }
  catch(error){
    console.log(error)
  }
}

function onLoadMore(){
getPixabay()
}





function renderPixabay(hits){
  const murkup = hits.map(card =>{
    return `
    <div class='photo-card'>
    <a href='${card.largeImageURL}'><img
        src='${card.webformatURL}'
        alt='${card.tags}'
        loading='lazy'
      /></a>
    <div class='info'>
    <p class='info-item'>
    <b>likes: ${card.likes}</b>
    </p>
    <p class="info-item">
      <b>views: ${card.views}</b>
    </p>
    <p class="info-item">
      <b>comments: ${card.comments}</b>
    </p>
    <p class="info-item">
      <b>downloads: ${card.downloads}</b>
    </p>
    </div>
    </div>
    `
  }).join('')
  gallery.innerHTML = murkup
}

function clearGallery(){
  gallery.innerHTML = ''
}

function lightbox(){
  const lightbox = new SimpleLightbox('.gallery a', {});
}

