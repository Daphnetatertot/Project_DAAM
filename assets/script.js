//get zip code from button
var zipInput = $("input");
console.log(zipInput)
var zipSearch = function (event) {
    event.preventDefault();
    var zipResult = zipInput.val();
    console.log("button click")
    console.log(zipResult);
    if (zipResult) {
        getBreweries(zipResult);
    }
}

//results message variable
var resultsMessage = '';

//revent brewery variable
var recentBreweries = '';

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
                    var brewNum = data.length
                    if (data.length == 0){
                        getZipInfo(zipcode);
                        resultsMessage = 'No results in ' + zipcode + ', returning results by state';
                    } else {
                        resultsMessage = 'Found ' + brewNum + 'in ' + zipcode;
                        displayBreweries(data[0]);
                    }
                    //console.log(data[0].name);
                    
                });
            }
        })
}

//if zip code has no results, lookup by state name
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


var breweryResults = $("#brewery-results").append("<div>");

//display brewery results
var displayBreweries = function (brewData) {
    console.log(brewData);
    var breweryNameResult = $("<h3>");
    var breweryWebsiteResult = $("<div>");
    var breweryPhoneResult = $("<div>");

    breweryResults.append(breweryNameResult);
    breweryResults.append(breweryWebsiteResult);
    breweryResults.append(breweryPhoneResult);

    breweryNameResult.html(brewData.name);
    console.log(brewData.name);
    breweryWebsiteResult.html('<a href="' + brewData.website_url + '">Link to website</a>');
    breweryPhoneResult.html('<b>Phone: </b>' + brewData.phone);

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

//save recent brewery
var saveBrewery = function (breweryArray) {
    localStorage.setItem("recentBreweries", JSON.stringify(breweryArray));
}

//check storage on page load
function setRecentBreweries () {
    var storedBreweries = JSON.parse(localStorage.getItem("recentBreweries"));

    if (storedBreweries !== null) {
        recentBreweries = storedBreweries;
    }
    console.log(recentBreweries);
    //will create display recent here
}


$("#zip-button").on('click', zipSearch);

setRecentBreweries ();
