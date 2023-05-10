const results = document.querySelector('#results');
const form = document.querySelector('#form');

const resultsPerPage = 40;
let totalPages;
let iterator;

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

    searchImages( txtSearch );
}

function searchImages( searchTerm ) {
    const apikey = '18728587-0d3aabaa665486f32883962f6';
    const url = `https://pixabay.com/api/?key=${ apikey }&q=${ searchTerm }&per_page=100`;
    
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
                <img class="grid-gallery__image" src="${ previewURL }" />
            </div>
            <div class="info">
                <p>${ likes } likes</p>
                <p>${ views} views</p>
                <a href="${ largeImageURL }" target="_blank" >View image full</a>
            </div>
           
        </div>
        `;
    });

    showPager();
    
}

function showPager() {
    iterator = createPager( totalPages );
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