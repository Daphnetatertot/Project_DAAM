/// <reference path="../@types/jquery" />
$(window).on("load", () => {

    //get zip code from button
    
    
    const zipSearch = (event) => {
        console.log("zip search event", event)
        event.preventDefault();
     
        console.log("button click")
        const zipValue = $("#zip-code").val()
        console.log(zipValue);
        if (zipValue) {
            getBreweries(zipValue);
        }
    
    }
    
    $("#zip-button").click(zipSearch)
    
    // enterInput.addEventListener("keypress", function(event) {
    // console.log(event)
    // if (event.key === "Enter") {
    
    //     event.preventDefault();
    
    //   document.getElementById("enterInput").click();
    //   console.log()
    // }
    
    // })
    
    
    var getBreweries = function (zipcode){
        console.log(zipcode);
        var zipBrewerySearchApiUrl = 'https://api.openbrewerydb.org/breweries?by_postal=' + zipcode;
        fetch(zipBrewerySearchApiUrl)
            .then(function (response) {
                if (response.ok) {
                   return response.json()
                    
                }
            }).then(function (data){
                console.log(data);
                console.log(data.length);
                if (data.length == 0){
                    getZipInfo(zipcode);
                }
                else {
                    displayBreweries(data[0]); 
                }


                //console.log(data[0].name);
                
            });
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
    
    
    var breweryResults = $("#brewery-results").append("<div>");
    
    //display brewery results
    var displayBreweries = function (brewData) {
        var breweryName = $("<div>");
        breweryResults.empty();
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
      
    
    

})

