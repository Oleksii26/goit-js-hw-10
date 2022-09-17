import './css/styles.css';
import { fetchCountries } from './fetchCountries'
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const ref = {
    input: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    info: document.querySelector('.country-info'),
}

ref.list.style.listStyle = 'none';

const DEBOUNCE_DELAY = 300;

ref.input.addEventListener('input', debounce(onSearchCoutry, DEBOUNCE_DELAY))


function onSearchCoutry(e) {
    const countryName = e.target.value.trim()
    if (!countryName) {
        clearData()
        return
    }

    fetchCountries(countryName).then(res => {
        let data = ''
        let refsData = ''
        clearData()
        if (res.length > 10) {
            specificNameInfo()
            clearData()
        }
        else if (res.length === 1) {
            data = createItem(res)
            refsData = ref.info
        }
        else {
            data = createList(res)
            refsData = ref.list
        }
        createTempate(refsData, data)
    }).catch(error => {
        clearData()
        eroorName()
    })
}

function createItem(el) {
    return el.map(({ name, capital, population, flags, languages }) =>
        ` <img
    src="${flags.svg}" 
    alt="${name.official}" 
    width="120">
  <h2 class="country__title">${name.official}</h2>
  <ul class="country__list" style="list-style:none;">
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
    return el.map(({ name, flags }) =>
        `<li class="country__item">
    <img class="country__img" 
      src="${flags.svg}" 
      alt="${name.official}" 
      width="60">
    ${name.official}
  </li>`).join('')
}

function specificNameInfo() {
    Notify.info("Too many matches found. Please enter a more specific name.")
}

function eroorName() {
    Notify.failure("Oops, there is no country with that name")
}

function createTempate(ref, markup) {
    ref.innerHTML = markup
}

function clearData() {
    ref.list.innerHTML = ''
    ref.info.innerHTML = ''
}

