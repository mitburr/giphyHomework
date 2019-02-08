const videoGames = [
    "Pacman",
    "SuperMario",
    'Morrowind',
    'DarkSouls'
]
let responseObject;
videoGames.forEach(function (value, index) {
    var button = $('<button></button>')
    button.text(value);
    $("#buttons").append(button);
    button.click(function () {
        console.log(index)
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            value + "&api_key=lMaIafSLW5THosBdK6UNJ4wLSvZ09wGj&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                // Storing an array of results in the results variable
                var results = response.data;
                responseObject = response;
                // Looping over every result item
                for (var i = 0; i < results.length; i++) {

                    // Only taking action if the photo has an appropriate rating
                    if (results[i].rating !== "r") {
                        // Creating a div for the gif
                        var gifs = $("#gifs");

                        // Storing the result item's rating
                        var rating = results[i].rating;

                        // Creating a paragraph tag with the result item's rating
                        var p = $("<p>").text("Rating: " + rating);

                        // Creating an image tag
                        var gameImage = $("<img>");

                        // Giving the image tag an src attribute of a proprty pulled off the
                        // result item
                        // and a marker to indicate still or animated
                        gameImage.attr("src", results[i].images.fixed_height.url);
                        gameImage.attr("data-still", results[i].images.fixed_height_still.url);
                        gameImage.attr("data-animated", results[i].images.fixed_height.url);
                        gameImage.attr("data-state", "animate");

                        // Appending the paragraph and gameImage we created to the "gifs" div we created
                        gifs.prepend(p);
                        gifs.prepend(gameImage);

                        // Prepending the gifs to the "#gifs-appear-here" div in the HTML
                    }
                }
                $("#gifs-appear-here").prepend(gifs);
                let gif = $("img")
                gif.click(function(){
                    if(gameImage.attr("data-state") == "animate"){
                        gameImage.attr('src', gameImage.attr("data-still"));
                        gameImage.attr('data-state', "still");
                        console.log("if animated");
                    }
                    if(gameImage.attr("data-state") == "still"){
                        gameImage.attr('src', gameImage.attr("data-still"));
                        gameImage.attr('data-state', "animate");
                        console.log("if still");
                    }
            })
        })
    })
})
