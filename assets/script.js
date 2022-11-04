//get zip code from button
var zipInput = $("input");

var zipSearch = function (event) {
    event.preventDefault();
    var zipResult = zipInput.val();
    console.log(zipResult);
    if (zipResult) {
        getBreweries(zipResult);
    }
}

//get breweries function
var getBreweries = function (zipcode){
    console.log(zipcode);
    var zipBrewerySearchApiUrl = 'https://api.openbrewerydb.org/breweries?by_postal=' + zipcode;
    fetch(zipBrewerySearchApiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data){
                    console.log(data);
                    console.log(data.length);
                    if (data.length == 0){
                        getZipInfo(zipcode);
                    }
                    //console.log(data[0].name);
                    displayBreweries(data[0]);
                    getZipInfo(zipcode);
                });
            }
        })
}

var getBreweryByState = function (state) {
    console.log(state);
    var stateBrewerySearchApiUrl = 'https://api.openbrewerydb.org/breweries?by_state=' + state;
    fetch(stateBrewerySearchApiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data[0]);
                    displayBreweries(data[0]);
                })
            }
        })
}


var breweryResults = $("body").append("<div>");

//display brewery results
var displayBreweries = function (brewData) {
    var breweryName = $("<div>");
    breweryResults.append(breweryName);
    breweryName.html(brewData.name);
}

//get state from IP
var getZipInfo = function (zipcode) {
    var getZipApiUrl = 'http://api.zippopotam.us/us/' + zipcode;
    fetch(getZipApiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data.places[0].state);
                    var stateResult = data.places[0].state;
                    getBreweryByState(stateResult);
                })
            }
        })
}



$("#zip-button").on('click', zipSearch);