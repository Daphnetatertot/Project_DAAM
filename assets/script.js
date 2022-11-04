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
                    console.log(data[0].name);
                    displayBreweries(data[0]);
                });
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

//get zip from IP
//get IP
var getIp = function () {
    var getIpApiUrl = 'https://api.ipify.org?format=jsonp&callback=getIP';

};



$("#zip-button").on('click', zipSearch);
