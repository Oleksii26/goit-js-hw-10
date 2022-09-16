import './css/styles.css';
import {fetchCountries} from '../fetchCountries'
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const ref = {
    input: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    info: document.querySelector('.country-info')
}

const DEBOUNCE_DELAY = 300;

ref.input.addEventListener('input', debounce(onSearchCoutry, DEBOUNCE_DELAY))


function onSearchCoutry(e) {
    const countryName = e.target.value.trim()
    if(!countryName) {
        clearData()
        return
    }

fetchCountries(countryName).then(i => {
    if(i.length > 10) {
        suitableName()
        clearData()
        return
    }
    renderData(i)
}).catch(error => {
    clearData()
    notSuitableName()
})
}

function renderData(el) {
    let data = ''
    let refsData = ''
    clearData()

    if(el.length === 1) {
        data = createItem(el)
        refsData = ref.info
    } else {
        data = createList(el)
        refsData = ref.list
    }
}

createTempate(refsData, data) 

function createItem(el) {
    return el.map(({name, capital, population, flags, languages}) => 
    ` <img
    src="${flags.svg}" 
    alt="${name.official}" 
    width="120">
  <h2 class="country__title">${name.official}</h2>
  <ul class="country__list">
      <li class="country__item">
      <span>Capital:</span>
    ${capital}
      </li>
      <li class="country__item">
      <span>Population:</span>
      ${population}
      </li>
      <li class="country__item">
      <span>Lenguages:</span>
      ${Object.values(languages)}
      </li>
  </ul>`
  )
}

function createList(el) {
    return el.map(({ name, flags}) => 
    `<li class="country__item">
    <img class="country__img" 
      src="${flags.svg}" 
      alt="${name.official}" 
      width="60">
    ${name.official}
  </li>`).join('')
}

function suitableName() {
  Notiflix.Notify.success("Too many matches found. Please enter a more specific name.")

}

function notSuitableName() {
    Notiflix.Notify.failure("Oops, there is no country with that name")
  }
  
 function createTempate(ref, markup)  {
    ref.innerHTML = markup
 }

function clearData() {
    ref.list.innerHTML = ''
    ref.info.innerHTML = ''
}