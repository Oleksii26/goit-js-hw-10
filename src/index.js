import './css/styles.css';
import {fetchCountries} from '../fetchCountries'
import debounce from 'lodash.debounce';

const ref = {
    input: document.querySelector('#search-box'),
    list: document.querySelector('.country-list'),
    info: document.querySelector('.country-info')
}

const DEBOUNCE_DELAY = 300;

ref.input.addEventListener('input', debounce(onSearchCoutry, DEBOUNCE_DELAY))


function onSearchCoutry(e) {
    console.log(e.target.value)
    ref.info.textContent = e.target.value.trim()
}