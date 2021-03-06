const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
const search = document.getElementById('search')
let sliders = [];
 
search.addEventListener("keyup",(event)=> {
  if (event.key == 'Enter'){
    searchBtn.click()
  }
});
const KEY = '15674931-a9d714b6e9d654524df198e00&q';
const showImages = (images) => {
          imagesArea.style.display = 'block';
          gallery.innerHTML = '';
          galleryHeader.style.display = 'flex';
         images.forEach(image => {
            let div = document.createElement('div');
            div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
            div.innerHTML = ` <img title="${image.likes} likes, ${image.comments} comments" class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
            gallery.appendChild(div)           
  });
  spinner()
  if(images.length==0){
    alert(`Didn't finy any result`);
  }
}

const getImages = (query) => {
  spinner()
  fetch(`https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`)
    .then(response => response.json())
    .then(data => showImages(data.hits))
    .catch(err => console.log(err))
}
let slideIndex = 0;
const selectItem = (event, img) => {
  let element = event.target;
  element.classList.add('added');
  let item = sliders.indexOf(img);
  
  if (item === -1) {
    sliders.push(img);
  } else {
    element.classList.toggle('added');
    sliders.pop(img)
  }
}
var timer
const createSlider = () => {
  if (sliders.length < 2) {
    alert('Select at least 2 image.')
    return;
  }
  sliderContainer.innerHTML = '';
  const prevNext = document.createElement('div');
  prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
  prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;
  sliderContainer.appendChild(prevNext)
  document.querySelector('.main').style.display = 'block';
  imagesArea.style.display = 'none';
  const duration = document.getElementById('duration').value || 1000;
if(duration>0){
  timer = setInterval(function (){
    slideIndex++;
    changeSlide(slideIndex);
  }, duration);
  sliders.forEach(slide => {
    let item = document.createElement('div')
    item.className = "slider-item";
    item.innerHTML = `<img  class="w-100" src="${slide}"
    alt="">`;
    sliderContainer.appendChild(item)
  changeSlide(0)
  })
  
}
else{
  alert('Duration can not be negative or 0')
    } 
} 
const changeItem = index => {
  changeSlide(slideIndex += index);
}
const changeSlide = (index) => {
  const items = document.querySelectorAll('.slider-item');
  if (index < 0) {
    slideIndex = items.length - 1
    index = slideIndex;
  };
  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }
  items.forEach(item => {
    item.style.display = "none"
  })
  items[index].style.display = "block"
}
searchBtn.addEventListener('click', function () {
  document.querySelector('.main').style.display = 'none';
  clearInterval(timer);
  const search = document.getElementById('search');
  getImages(search.value)
  sliders.length = 0;
})
sliderBtn.addEventListener('click', function () {
  createSlider()
})
spinner=()=>{
  const spinner = document.getElementById('spinner')
  spinner.classList.toggle('d-none');
}





