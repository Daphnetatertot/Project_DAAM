//get zip code from button
var zipInput = $("input");

var zipSearch = function (event) {
    event.preventDefault();
    var zipResult = zipInput.val();
    if (zipResult) {
        getBreweries()
    }
}

//get breweries function
var getBreweries = function (zipcode){
    var zipBrewerySearchApiUrl = 'https://api.openbrewerydb.org/breweries?by_postal=' + zipcode + '&per_page=3';
    fetch(zipBrewerySearchApiUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
            }
        })
}

$("button").on('click', getBreweries);