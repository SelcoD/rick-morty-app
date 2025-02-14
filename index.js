import createCharacterCard from "./components/card/card.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 1;
let page = 1;
let searchQuery = "";

fetchCharacters();

async function fetchCharacters() {
  try {
    const url = `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`;
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      maxPage = data.info.pages;
      pagination.textContent = `${page}/${maxPage}`;
      cardContainer.innerHTML = "";
      data.results.forEach((character) => {
        const newCard = createCharacterCard(character);
        cardContainer.append(newCard);
      });
    } else {
      console.log("Bad Response");
    }
  } catch (error) {
    console.error("An Error occured");
  }
}
prevButton.addEventListener("click", () => {
  if (page > 1) {
    page--;
    pagination.textContent = `${page}/${maxPage}`;
    fetchCharacters();
  }
});
nextButton.addEventListener("click", () => {
  if (page < maxPage) {
    page++;
    fetchCharacters();
  }
});

searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  searchQuery = event.target.elements.query.value;
  page = 1;
  fetchCharacters();
});
