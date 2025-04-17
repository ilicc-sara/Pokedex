"use strict";
import "./style.css";

const typeListEl = document.querySelector(".type-list");

const pokemonListEl = document.querySelector(".pokemons-list");

const pokemonDetailsEl = document.querySelector(".pokemon-details");
const overlay = document.querySelector(".overlay");

const searchPokemonForm = document.querySelector(".search-pokemon-form");
const searchPokemonInput = document.querySelector(".search-pokemon-input");

let pokemonInput = "";

searchPokemonInput.addEventListener("input", function (e) {
  pokemonInput = e.target.value.toLowerCase();
});

function capitalizeEveryWord(str) {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("-");
}

function displayPokemonList(data, id) {
  data.pokemon.forEach((pokemon) => {
    let pokemonItem = document.createElement("li");
    pokemonItem.innerHTML = `${capitalizeEveryWord(pokemon.pokemon.name)}`;

    console.log(pokemon);
    pokemonItem.className = "pokemon-list-item";
    pokemonItem.id = id;
    pokemonItem.setAttribute("data-id", pokemon.pokemon.url);

    pokemonListEl.appendChild(pokemonItem);
  });
}

function displayPokemonDetails(data) {
  pokemonDetailsEl.classList.remove("hidden");
  overlay.classList.remove("hidden");

  let type = pokemonListEl.querySelector(".pokemon-list-item").id;

  // prettier-ignore
  pokemonDetailsEl.querySelector(".pokemon-img").src = data.sprites.front_default;
  // prettier-ignore
  pokemonDetailsEl.querySelector(".pokemon-name").textContent = capitalizeEveryWord(data.name);
  // prettier-ignore
  pokemonDetailsEl.querySelector(".pokemon-height").textContent = `${data.height} ft`;
  // prettier-ignore
  pokemonDetailsEl.querySelector(".pokemon-weight").textContent = `${data.weight} lb`;
  pokemonDetailsEl.querySelector(".pokemon-type").textContent = type;
  pokemonDetailsEl.querySelector(".pokemon-id").textContent = data.id;
}

typeListEl.addEventListener("click", function (e) {
  if (!e.target.closest(".type-item")) return;

  pokemonListEl.innerHTML = "";
  const typeId = e.target.closest(".type-item").dataset.id;

  fetch(`https://pokeapi.co/api/v2/type/${typeId}`)
    .then((response) => response.json())
    .then((data) => displayPokemonList(data, typeId))
    .catch((error) => console.error(error));
});

pokemonListEl.addEventListener("click", function (e) {
  if (!e.target.classList.contains("pokemon-list-item")) return;

  const pokemonId = e.target.dataset.id;

  fetch(pokemonId)
    .then((response) => response.json())
    .then((data) => displayPokemonDetails(data))
    .catch((error) => console.error(error));
});

overlay.addEventListener("click", function (e) {
  console.log(e.target);
  pokemonDetailsEl.classList.add("hidden");
  overlay.classList.add("hidden");
});

searchPokemonForm.addEventListener("submit", function (e) {
  e.preventDefault();

  console.log(pokemonInput);

  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonInput}`)
    .then((response) => response.json())
    .then((data) => displayPokemonDetails(data))
    .catch((error) => alert(error));

  searchPokemonInput.value = "";
});
