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
var savedBreweries = {};

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
                        displayBreweries(data);
                    }
                        
                  console.log(data.name);
                    
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
                    displayBreweries(data);
                })
                
            }
        })
}


var breweryResults = $("#brewery-results").append("<div>");

//display brewery results
var displayBreweries = function (brewData) {
    console.log(brewData);

for (
    var i=0; i<brewData.length; i++) {
        var resultsBox = $('<div class="box" id = "brewery' + i +  '" </div>');
        var breweryNameResult = $("<h3>");
        var breweryWebsiteResult = $("<div>");
        var breweryPhoneResult = $("<div>");
        var saveButton = $('<button class="button">Save</button>');
    
        breweryResults.append(resultsBox);
        resultsBox.append(breweryNameResult);
        resultsBox.append(breweryWebsiteResult);
        resultsBox.append(breweryPhoneResult);
        resultsBox.append(saveButton);
    
        breweryNameResult.html('<b>' + brewData[i].name + '</b>');
        console.log(brewData[i].name);
        breweryWebsiteResult.html('<a href="' + brewData[i].website_url + '">Link to website</a>');
        breweryPhoneResult.html('<b>Phone: </b>' + brewData[i].phone);
        resultsBox.attr("data-brewName", brewData[i].name);
        resultsBox.attr("data-brewUrl", brewData[i].website_url);
        resultsBox.attr("data-brewPhone", brewData[i].phone);

    }
   

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
var saveBrewery = function (breweryObject) {
    localStorage.setItem("savedBreweries", JSON.stringify(breweryObject));
}

//click event for save button


//check storage on page load
function setSavedBreweries () {
    var storedBreweries = JSON.parse(localStorage.getIem("savedBreweries"));

    if (storedBreweries !== null) {
        savedBreweries = storedBreweries;
    }
    console.log(savedBreweries);
    //will create display recent here
}


$("#zip-button").on('click', zipSearch);

//setSavedBreweries ();
