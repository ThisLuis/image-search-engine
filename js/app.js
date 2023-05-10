const results = document.querySelector('#results');
const form = document.querySelector('#form');

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
            showImages( result );
            console.log(result)
        })
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