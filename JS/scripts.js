const pokemonName = document.querySelector('.pokemon_name');
const pokemonId = document.querySelector('.pokemon_id');
const pokemonImg = document.querySelector('.pokemon_img');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const btnPrev = document.querySelector('.btn_prev');
const btnNext = document.querySelector('.btn_next');

let srcPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
    }
}   

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading ...';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImg.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonId.innerHTML = data.id;
        pokemonImg.src = data['sprites'] ['versions'] ['generation-v'] ['black-white'] ['animated'] ['front_default'];

        input.value = ''; 
        srcPokemon =data.id;
    } else {
        pokemonImg.style.display = 'none';
        pokemonName.innerHTML = 'Not found :c';
        pokemonId.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {
        event.preventDefault();
        renderPokemon(input.value.toLowerCase());
});

btnPrev.addEventListener('click', () => {
    if (srcPokemon > 1) {
    srcPokemon -= 1;
    renderPokemon(srcPokemon);
    }
});

btnNext.addEventListener('click', () => {
    srcPokemon += 1;
    renderPokemon(srcPokemon);

});

renderPokemon(srcPokemon);
