// init

//add event listener on document ready
document.addEventListener('DOMContentLoaded', function fetchData() {
    fetch('https://frozen-tundra-81760.herokuapp.com/')
        .then(response => response.json())
        .then(data => {
        //    create a card for each item
            parentElement = '#featured-div';
            data.forEach(item => {
                createCard(item, parentElement);
            });
        })
        .catch(error => console.log(error));
});


function createCard(item) {
    const ul = document.createElement('ul');
    ul.classList.add("collection");
    ul.innerHTML = `
    <li class="collection-header">
        <h6>${item.name}</h6>
    </li>
    <li class="collection-city">
        <div class="city-box">
            <p><i class="material-icons">location_city</i>City</p>
            <p>${item.city}</p>
        </div>
    </li>
    <li class="collection-kifleketema">
        <div class="kifleketema-box">
            <p>Kifleketema</p>
            <p>${item.kifle_ketema}</p>
        </div>
    <li class="collection-direction">
        <div class="direction-box">
            <p><i class="material-icons">directions</i>Direction</p>
            <p>${item.direction}</p>
        </div>
    </li>
    <li class="collection-branch">
    <div class="branch-box">
        <p><i class="material-icons">local_phone</i>Phone</p>
            <p>${item.phone}</p>
        </div>
    </li>
    </li>`;

    //add the card to the DOM
    document.querySelector('.result-content').appendChild(ul);
}

//add event for the search button
document.querySelector('#q').addEventListener('keyup', function (e) {
    //get the value of the search input
    e.preventDefault();
    const searchValue = document.querySelector('#q').value;
    //fetch the data from the server
    parentElement = '.result-content';
    fetch('https://frozen-tundra-81760.herokuapp.com/contacts/search?q=' + searchValue)
        .then(response => response.json())
        .then(data => {
            //clear the featured div
            document.querySelector('.result-content').innerHTML = '';
            console.log(data.message);  
            console.log(typeof(data));
            //create a card for each item
            if (data.success === false) {
                document.querySelector('.result-content').innerHTML = `<h6>No results found</h6>`;
            }else{
                data.data.forEach(item => {
                createCard(item);
            });
            }      
        }).catch(error => console.log(error));
});


