import NewsPixabayService from './/js//pixabay-service';
import ".///sass///_example.scss"
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import LoadMoreBtn from './/js///load-more-btn'
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";




const form = document.querySelector('.search-form')
const gallery = document.querySelector('.gallery')
const button = document.querySelector('.load-more')



const loadmorebtn = new LoadMoreBtn({selector:'[type=button]',
 hidden:true})

const newsPixabayService = new NewsPixabayService()
console.log(newsPixabayService)

let perpage = newsPixabayService.per_page
let page = newsPixabayService.page



form.addEventListener('submit', formSubmit)
loadmorebtn.refs.button.addEventListener('click', onLoadMore)

function formSubmit(event){
  event.preventDefault()
  newsPixabayService.query = event.target.elements.searchQuery.value
  newsPixabayService.resetPage()
  if(newsPixabayService.query === ''){
   Notify.failure("Sorry, there are no images matching your search query. Please try again.")
   return
  }
getPixabayApi()
clearGallery()
}

async function getPixabayApi(){
try {
    const response = await newsPixabayService.getPixabay()
    const {hits,totalHits} = response.data
    console.log(response)
    gallery.insertAdjacentHTML('beforeend', renderPixabay(hits))
    loadmorebtn.show()
    page+=1
     perpage = Math.ceil(totalHits/40)
     console.log(perpage)
    if( newsPixabayService.page > perpage && hits.length !== 0){
      loadmorebtn.hide()
      Notify.info("We're sorry, but you've reached the end of search results.")
    }
    if(hits.length === 0){
      Notify.failure("Sorry, there are no images matching your search query. Please try again.")
      loadmorebtn.hide()
      return
    }
    
    if(hits.length !== 0){
       Notify.success(`Hooray! We found ${hits.length} images.`)
    }
    lightbox()
  
}
catch(error){
  console.log(error)
}
}

function onLoadMore(){
getPixabayApi()
}


function renderPixabay( hits){
 return hits.map(
  ({
    webformatURL,
    largeImageURL,
    likes,
    views,
    comments,
    tags,
    downloads,
  }) => {
    return `<div class='photo-card'>
<a href='${largeImageURL}'><img
    src='${webformatURL}'
    alt='${tags}'
    loading='lazy'
  /></a>
<div class='info'>
  <p class='info-item'>
    <b>Likes</b>
    ${likes}
  </p>
  <p class='info-item'>
    <b>Views</b>
    ${views}
  </p>
  <p class='info-item'>
    <b>Comments</b>
    ${comments}
  </p>
  <p class='info-item'>
    <b>Downloads</b>
    ${downloads}
  </p>
</div>
</div>`;
  }
)
.join('');
}

function clearGallery(){
  gallery.innerHTML =''

}

function lightbox(){
const lightbox = new SimpleLightbox('.gallery a', {});
lightbox.refresh()
}

