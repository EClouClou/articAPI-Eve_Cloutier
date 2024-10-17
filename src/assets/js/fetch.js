import '../css/style.css';

const inputQueryHtml = document.querySelector('#input-query');
const btnSearchHtml = document.querySelector('.btn-search');
const cardsWrapperHtml = document.querySelector('.cards-wrapper');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal--close');
let searchWords = JSON.parse(localStorage.getItem('search-words') ?? '[]');

modalClose.addEventListener('click', () => {
    modal.innerHTML = '';
    overlay.classList.add('hidden');
})
let currentQuery = '';

function performSearch(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            cardsWrapperHtml.innerHTML = '';

            data.data.forEach(result => {

                cardsWrapperHtml.classList.add('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-6', 'px-6', 'md:px-20');
                const card = document.createElement('div');
                card.classList.add('card', 'border', 'border-black', 'p-4', 'bg-white', 'flex', 'flex-col', 'justify-between', 'gap-3');
                
                const img = document.createElement('img');
                img.src = `https://www.artic.edu/iiif/2/${result.image_id}/full/843,/0/default.jpg`;
                img.alt = result.title;
                img.classList.add('h-40', 'w-full', 'object-cover', 'mb-3');
                card.appendChild(img);
                
                const title = document.createElement('h3');
                title.textContent = `${result.title}`;
                title.classList.add('text-xl', 'font-bold',);
                card.appendChild(title);

                const button = document.createElement('button');
                button.textContent = 'Voir les détails';
                button.type = button;
                button.classList.add('btn-details', 'bg-red', 'text-offWhite', 'font-semibold', 'p-3', 'uppercase');
                button.setAttribute('data-id', result.id);
                button.addEventListener('click', () => {
                    overlay.classList.remove('hidden');
                    fetch(result.api_link)
                    .then(response => response.json())
                    .then(data => {

                        const formattedTerms = Array.isArray(data.data.term_titles) ? data.data.term_titles.join(', ').replace(/,/g, ', ') : '';
                        const formattedMaterial = Array.isArray(data.data.material_titles) ? data.data.material_titles.join(', ').replace(/,/g, ', ') : 'Non disponible';
                        const description = data.data.description ? data.data.description : 'S.O.';

                        modal.innerHTML = `
                        <div class="grid gap-3">
                            <div class="flex flex-col gap-3">
                                <div class="flex flex-col md:flex-row gap-3">
                                    <img src="https://www.artic.edu/iiif/2/${data.data.image_id}/full/843,/0/default.jpg" class="w-[100%] max-w-[100%] md:max-w-[50%] h-[300px] object-contain bg-grey-dark" alt="alt_text">
                                    <div class="flex flex-col">
                                        <h3 class="text-xl font-bold ">Titre : ${data.data.title}</h3>
                                        <p><span class="font-semibold">Artiste :</span> ${data.data.artist_title}</p>
                                        <p><span class="font-semibold">Date de création :</span> ${data.data.date_display}</p>
                                        <p><span class="font-semibold">Termes de description :</span> ${formattedTerms}</p>
                                        <p class="pb-4 text-wrap"><span class="font-semibold">Matériel utilisé :</span> ${formattedMaterial}</p>
                                    </div>
                                </div>
                                    <div class="flex flex-col"><p><span class="font-semibold">Description :</span> ${description}</p>
                                    </div>
                            </div>
                        </div>
                        `
                    })
                })

                card.appendChild(button);
            
                cardsWrapperHtml.appendChild(card);
            });
        });
}

btnSearchHtml.addEventListener('click', (e) => {
    e.preventDefault();
    currentQuery = inputQueryHtml.value.trim();
    if (!currentQuery) {
        alert('Veuillez entrer un mot-clé dans le champ de recherche.');        return;
    }


    searchWords.push(currentQuery);

    localStorage.setItem('search-words', JSON.stringify(searchWords));

    const liHtml = document.createElement('li');

    for (let i = start; i < searchWords.length; i++) {
        addListContent(searchWords[i]);
    }

    searchWords.textContent 
    const searchUrl = `https://api.artic.edu/api/v1/artworks/search?q=${currentQuery}&fields=id,title,image_id,artist_display,date_display,api_link`;
    performSearch(searchUrl);
});