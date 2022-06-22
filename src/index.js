import NewsPixabayService from './/js//pixabay-service';
import ".///sass///_example.scss"
import { Notify } from 'notiflix/build/notiflix-notify-aio';




const form = document.querySelector('.search-form')
const gallery = document.querySelector('.gallery')
const button = document.querySelector('.load-more')



const newsPixabayService = new NewsPixabayService()
console.log(newsPixabayService)



PIXABAY_KEY = '28190532-07c65b576fc64781f10f94256'
BASE_URL = 'https://pixabay.com/api/'


form.addEventListener('submit', formSubmit)
button.addEventListener('click', onLoadMore)

function formSubmit(event){
    event.preventDefault()

    clearGallery()

    newsPixabayService.query = event.target.elements.searchQuery.value
    newsPixabayService.resetPage()

    if(newsPixabayService.query === ''){
      return Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    }

    async function getPixabay(){
      try {
          const response = await newsPixabayService.getPixabay()
          console.log(response)
          renderPixabay(response)
      }
      catch(error){
        console.log(error)
      }
  }
  getPixabay()
}


function onLoadMore(){
  newsPixabayService.getPixabay()
  if(newsPixabayService.page > 40){
    return Notify.failure("We're sorry, but you've reached the end of search results.")
  }
}

function renderPixabay(response){
  const murkup = response.map(card =>{
    return `
    <div class='photo-card'>
    <img src='${card.webformatURL}' alt='${card.tags}' width = 360, height = 300 loading="lazy"/>
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