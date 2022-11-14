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


//revent brewery variable
var savedBreweries = []; 


//get lat long from zip
var getLatLong = function (zipcode) {
    var getLatLongApiUrl = 'https://api.zippopotam.us/us/' + zipcode;
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

//brewery info variables
var breweryName = '';
var breweryAddress = '';
var breweryWebsite = '';
var breweryPhone = '';



//display brewery results
var displayBreweries = function (brewData) {
    console.log(brewData);

for (
    var i=0; i<brewData.length; i++) {
        var resultsBox = $('#brewery-result-'+[i]);
        var breweryNameResult = resultsBox.children("#brewName");
        var breweryAddressResult = resultsBox.children("#brewAddress");
        var breweryWebsiteResult = resultsBox.children("#brewWebsite");
        var breweryPhoneResult = resultsBox.children("#brewPhone");
        var saveButton = resultsBox.children("#save");
        $(".column-right").removeClass("is-hidden")
        
        breweryName = brewData[i].name
        breweryNameResult.html('<b>' + breweryName + '</b>');
        console.log(breweryName);
        if (brewData[i].street == null) {
            breweryAddress = 'Not Available';
        } else {
            breweryAddress = brewData[i].street + '. ' + brewData[i].city + ', ' + brewData[i].state + ' ' + brewData[i].postal_code;
        }
        breweryAddressResult.html('<b>Address: </b>' + breweryAddress);
        
        if (brewData[i].website_url == null) {
            breweryWebsite = 'Not Available';
            breweryWebsiteResult.html('<b>Website: </b>' + breweryWebsite);
        } else {
            breweryWebsite = brewData[i].website_url;
            breweryWebsiteResult.html('<b>Website: </b><a href="' + breweryWebsite + '">' + breweryWebsite + '</a>');
        }
        
        if (brewData[i].phone == null) {
            breweryPhone = 'Not Available'
        } else {
            breweryPhone = brewData[i].phone;
            
        }
        breweryPhoneResult.html('<b>Phone: </b>' + breweryPhone);

        saveButton.html('<button class="button" id = "save-button">Save</button>');
        
        saveButton.attr("data-brewname", breweryName);
        saveButton.attr("data-brewaddress", breweryAddress);
        saveButton.attr("data-brewurl", breweryWebsite);
        saveButton.attr("data-brewphone", breweryPhone);
    }
    
}


//save recent brewery
var saveBrewery = function (event) {
    event.preventDefault();
    
    if ($(event.target).is("button")) {
        var brewname = $(event.target).parent().data('brewname');
        console.log($(event.target));
        var brewaddress = $(event.target).parent().data('brewaddress');
        var brewurl = $(event.target).parent().data('brewurl');
        var brewphone = $(event.target).parent().data('brewphone');

        var breweryInfoObject = {
            savedBreweryName: brewname,
            savedBreweryAddress: brewaddress,
            savedBreweryUrl: brewurl,
            savedBreweryPhone: brewphone
        };
        console.log(breweryInfoObject);
        savedBreweries.unshift(breweryInfoObject);
        //limiting saved breweries to 5 
        if (savedBreweries.length < 5) {
            localStorage.setItem("savedBreweries", JSON.stringify(savedBreweries));
            displaySavedBreweries(savedBreweries);
        } else {
            savedBreweries.length = 5;
            localStorage.setItem("savedBreweries", JSON.stringify(savedBreweries));
            displaySavedBreweries(savedBreweries);
        }
        
    } 
    
}

//click event for save button
$(".column-right").on('click', saveBrewery);


//check storage on page load
function setSavedBreweries () {
    var storedBreweries = JSON.parse(localStorage.getItem("savedBreweries"));

    if (storedBreweries !== null) {
        savedBreweries = storedBreweries;
    }
    console.log(savedBreweries);
    //will create display recent here
    displaySavedBreweries(savedBreweries);
}

//display saved breweries
var displaySavedBreweries = function (savedBrews) {
    if (savedBrews) {
        for (var i = 0; i < savedBrews.length; i ++) {
            var savedBreweriesSection = $("#saved-box-" + [i]);
            var savedBreweryInfo = savedBreweriesSection.children("#saved-brew-info");
            savedBreweriesSection.attr('class', 'box');
            savedBreweryInfo.html('<b>See on Google Maps: </b><a href="https://maps.google.com/#!q=' + savedBrews[i].savedBreweryName + savedBrews[i].savedBreweryAddress + '">' + savedBrews[i].savedBreweryName + '</a>');

            console.log(savedBrews[i].savedBreweryName);
        }
        

    }
}

$("#zip-button").on('click', zipSearch);



setSavedBreweries ();


