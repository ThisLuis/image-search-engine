const results = document.querySelector('#results');
const form = document.querySelector('#form');
const pagination = document.querySelector('#pagination')

const resultsPerPage = 40;
let totalPages;
let iterator;
let actualPage = 1;

window.onload = () => {
    form.addEventListener('submit', validateForm );
}

function validateForm( e ) {
    e.preventDefault();

    const txtSearch = document.querySelector('#txtSearch').value;

    if( txtSearch === '' ) {
        showAlert('Add search term');;
        return;
    }

    searchImages();
}

function searchImages() {

    const searchTerm = document.querySelector('#txtSearch').value;
    const apikey = '18728587-0d3aabaa665486f32883962f6';
    const url = `https://pixabay.com/api/?key=${ apikey }&q=${ searchTerm }&per_page=${ resultsPerPage }&page=${ actualPage }`;
    
    fetch( url )
        .then( resp => resp.json())
        .then( result => {
            totalPages = calculatePages( result.totalHits )
            console.log( totalPages)
            showImages( result );
        })
}

function *createPager( total ) {
    for( let i = 1  ; i <= total; i++ ) {
        yield i;
    }
}

function calculatePages( total ) {
    return parseInt(Math.ceil( total / resultsPerPage ));
}

function showImages( { hits } ) {
    console.log( hits );

    while( results.firstChild ) {
        results.removeChild(results.firstChild);
    }

    hits.forEach( image => {
        const { previewURL, likes, views, largeImageURL } = image;
        results.innerHTML += `
        <div class="content">

            <div class="image">
                <img class="" src="${ previewURL }" />
            </div>
            <div class="info">

                <p>
                    <span class="like material-symbols-outlined">
                        thumb_up
                   </span>
                </p>
                <p>${ likes }</p>

                <p>
                    <span class="view material-symbols-outlined">
                        visibility
                    </span>
                </p>
                <p>${ views}</p>

            </div>
            <a href="${ largeImageURL }" target="_blank" >
                <span class="material-symbols-outlined">fullscreen</span>
                View image full
            </a>

           
        </div>
        `;
    });

    // Limpiar paginador previo
    while( pagination.firstChild) {
        pagination.removeChild(pagination.firstChild)
    }

    // Generamos el paginador
    showPager();
    
}

function showPager() {
    iterator = createPager( totalPages );

    while( true ) {
        const { value, done } = iterator.next();
        if( done ) return;

        const button = document.createElement('a');
        button.href = "#";
        button.dataset.page = value;
        button.textContent = value;
        button.classList.add('pagination');

        button.onclick = () => {
            actualPage = value;      
            searchImages();  
        }

        pagination.appendChild( button );
    }
}

function showAlert( message ) {

    const existsAlert = document.querySelector('.error');
    if( !existsAlert ) {
        const alert = document.createElement('p');
        alert.classList.add('error');

        alert.innerHTML = `
            <strong>Error!</strong>
            <span>${ message }</span>
            
        `;

        form.appendChild( alert );

        setTimeout(() => {
            alert.remove();
        }, 2000);
    }
}