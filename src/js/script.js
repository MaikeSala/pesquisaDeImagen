//senha de acesso API
const accessKey = "-dX0qaaYuik4bBVLiOD7Joo8nTPoROzxoFBlMfbreIQ"

//elementos html
const fromEl = document.querySelector("form")
const inputEl = document.getElementById("search-input")
const searchResults = document.querySelector(".search-results")
const showMore = document.getElementById("shou-more-button")

let inputData = ""
let page = 1;

//Função de pesquisa de imagem na api
async function searchImages() {
    inputData = inputEl.value;
    //url dinamica com a pagina, pesquisa e chave de acesso
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`
    
    //função fetch para fazer a requisição a API
    const response = await fetch(url)
    const data = await response.json()

    const results = data.results

    if(page === 1){
        searchResults.innerHTML = ""
    }
    //função map para criar e preencher os elementos do container com os dados da API
    results.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });
    page++
    if(page > 1){
        showMore.style.display = "block"
    }
}

fromEl.addEventListener('submit', (event) => {
    event.preventDefault()
    page = 1
    searchImages()
});

showMore.addEventListener('click',() => {
    searchImages()
});