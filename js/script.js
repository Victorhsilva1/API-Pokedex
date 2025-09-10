//QuerySelector para pegar os elementos do HTML com este nome, podendo ser id ou classe
const pokemonName = document.querySelector('.pokemonName');
const pokemonNumber = document.querySelector('.pokemonNumber');
const pokemonImage = document.querySelector('.pokemonImg');

const form = document.querySelector('.form');
const input = document.querySelector('.inputSearch');

const buttonPrev = document.querySelector('.btnPrev');
const buttonNext = document.querySelector('.btnNext');

let searchPokemon = 1;



const fetchPokemon = async (pokemon) => {
    //Deverá ser assincrono por conta do fetch
    //pegando o valor do input e convertendo para minusculo
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    //Se a resposta da API for 200, ou seja, deu certo
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }

    //Se não encontrar o pokemon, retorna null
    return null;
}

//Renderizar o pokemon na tela
const renderPokemon = async (pokemon) => {

    //Colocando o texto de carregando enquanto busca o pokemon
    pokemonName.innerHTML = 'Carregando...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {

    //innerHtml para inserir o nome do pokemon no HTML
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;

    //entrando dentro do caminho https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/25.png
    //e passando os parametros para pegar a imagem animada
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

    //e limpando o input com o value vazio
    input.value = '';
    //voltando a partir do pokemon que estava 
    searchPokemon = data.id;
    } else { 
        //Se não encontrar o pokemon mostra a imagem padrão e a mensagem de erro
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not Found :(';
        pokemonNumber.innerHTML = '';
    }
}

//Adicionando o evento de submit no form
//e previnindo o comportamento padrão do form

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());

});

buttonPrev.addEventListener('click', () => {
  // Se o numero do pokemon for maior que 1
  //decrementar em 1
  // depois de decrementar passar a variavel para a função renderPokemon
    if (searchPokemon > 1) {
  searchPokemon -= 1;
  renderPokemon(searchPokemon);
    }
});
buttonNext.addEventListener('click', () => {
    //incrementar em 1
    // depois de incrementar passar a variavel para a função renderPokemon
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);