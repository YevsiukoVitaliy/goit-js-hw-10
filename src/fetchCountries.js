const URL = "https://restcountries.com/v3.1/name";
const filter = "?fields=name,capital,population,flags,languages";
import { Notify } from "notiflix/build/notiflix-notify-aio";
export const fetchCountries = name => {
  return fetch(`${URL}/${name}${filter}`).then(responce => {
    if (responce.ok) {
      return responce.json();
    }

    Notify.failure(`Oops, there is no country with that name`, {
      clickToClose: true,
    });
    throw new Error(responce.statusText);
  });
};
