import "./css/styles.css";
import debounce from "lodash.debounce";
import { fetchCountries } from "./fetchCountries";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const DEBOUNCE_DELAY = 300;
const refs = {
  searchInput: document.querySelector("#search-box"),
  countryList: document.querySelector(".country-list"),
  countryBlock: document.querySelector(".country-info"),
};

refs.searchInput.addEventListener(
  "input",
  debounce(handleSerch, DEBOUNCE_DELAY)
);

function handleSerch(e) {
  const request = e.target.value.trim();

  if (request === "") {
    deleteMarkup(refs.countryBlock);
    deleteMarkup(refs.countryList);
    return;
  }

  fetchCountries(request)
    .then(data => {
      if (data.length > 10) {
        Notify.info(
          "Too many matches found. Please enter a more specific name.",
          {
            clickToClose: true,
          }
        );
        return;
      }

      renderMarkup(data);
    })
    .catch(error => {
      deleteMarkup(refs.countryBlock);
      deleteMarkup(refs.countryList);
      console.log(error);
    });
}

function renderMarkup(countries) {
  if (countries.length > 1) {
    refs.countryList.innerHTML = makeListMarkup(countries);
    deleteMarkup(refs.countryBlock);
  } else {
    refs.countryBlock.innerHTML = makeInfoBlockMarkup(countries);
    deleteMarkup(refs.countryList);
  }
}

function makeListMarkup(countries) {
  return countries
    .map(
      ({ flags, name }) =>
        `<li><img src="${flags.svg}" alt="${name.official}" width="30" height="30"> ${name.official}</li>`
    )
    .join("");
}

function makeInfoBlockMarkup(countries) {
  return countries
    .map(
      ({ name, capital, population, flags, languages }) =>
        `<h1><img src="${flags.svg}" alt="${
          name.official
        }" width="60px" height="60px"/>${name.official}</h1>
        <ul>
          <li>Capital: ${capital}</li>
          <li>Population: ${population}</li>
          <li>Languages: ${Object.values(languages)}</li>
        </ul>`
    )
    .join("");
}

function deleteMarkup(element) {
  element.innerHTML = "";
}
