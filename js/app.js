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