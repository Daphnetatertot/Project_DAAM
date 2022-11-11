//get zip code from button
var zipInput = $("input");
console.log(zipInput)
var zipSearch = function (event) {
    event.preventDefault();
    var zipResult = zipInput.val();
    console.log("button click")
    console.log(zipResult);
    if (zipResult) {
        getLatLong(zipResult);
    }
}

//results message variable
var resultsMessage = '';


//revent brewery variable
var savedBreweries = {};
var breweryInfoObject = {}; 


//get lat long from zip
var getLatLong = function (zipcode) {
    var getLatLongApiUrl = 'http://api.zippopotam.us/us/' + zipcode;
    fetch(getLatLongApiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data.places[0].latitude);
                    var latResult = data.places[0].latitude;
                    var longResult = data.places[0].longitude;
                    getBreweryByLatLong(latResult, longResult);
                })
            }
        })
}

//get breweries based on lat long
var getBreweryByLatLong = function (lat, long) {
    console.log(lat, long);
    var latLongBrewerySearchApiUrl = 'https://api.openbrewerydb.org/breweries?by_dist=' + lat + ',' + long + '&per_page=10';
    console.log(latLongBrewerySearchApiUrl);
    fetch(latLongBrewerySearchApiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data[0]);
                    displayBreweries(data);
                })
                
            }
        })
}



//var breweryResults = $("#brewery-results").append("<div>");

//display brewery results
var displayBreweries = function (brewData) {
    console.log(brewData);

for (
    var i=0; i<brewData.length; i++) {
        var resultsBox = $('#brewery-result-'+[i]);
        var breweryNameResult = $("<h3>");
        var breweryAddressResult = $("<div>");
        var breweryWebsiteResult = $("<div>");
        var breweryPhoneResult = $("<div>");
        var saveButton = $('<button class="button" id = "save-button">Save</button>');
    
        resultsBox.append(breweryNameResult);
        resultsBox.append(breweryAddressResult);
        resultsBox.append(breweryWebsiteResult);
        resultsBox.append(breweryPhoneResult);
        resultsBox.append(saveButton);
    
        breweryNameResult.html('<b>' + brewData[i].name + '</b>');
        console.log(brewData[i].name);
        if (brewData[i].street == null) {
            breweryAddressResult.html('<b>Address: </b> Not available');
        } else {
            breweryAddressResult.html('<b>Address: </b>' + brewData[i].street + '. ' + brewData[i].city + ', ' + brewData[i].state + ' ' + brewData[i].postal_code);
        }
        
        if (brewData[i].website_url == null) {
            breweryWebsiteResult.html('<b>Website: </b>Not available');
        } else {
            breweryWebsiteResult.html('<b>Website: </b><a href="' + brewData[i].website_url + '">' + brewData[i].website_url + '</a>');
        }
        
        if (brewData[i].phone == null) {
            breweryPhoneResult.html('<b>Phone: </b>Not available');
        } else {
            breweryPhoneResult.html('<b>Phone: </b>' + brewData[i].phone);
        }
        
        resultsBox.attr("data-brewName", brewData[i].name);
        resultsBox.attr("data-brewUrl", brewData[i].website_url);
        resultsBox.attr("data-brewPhone", brewData[i].phone);
        breweryInfoObject = {
            breweryName: brewData[i].name,
            breweryUrl: brewData[i].website_url,
            breweryPhone: brewData[i].phone
        }
        //click event for save button
        $("#save-button").on('click', function() {
        localStorage.setItem("savedBreweries", JSON.stringify(breweryInfoObject));
        })
    }
   

}



//save recent brewery
var saveBrewery = function (breweryObject) {
    localStorage.setItem("savedBreweries", JSON.stringify(breweryObject));
}




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
