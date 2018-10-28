// Create an initial newPerson variable
//var newPersonCount = 0;

// Event listner on all button elements
$("button").on('click', function () {

    //get the placeholder "value" from the textbox and store it as a variable
    var input = function () {
        $("#exampleFormControlInput1").val().trim();

        // creat a new variable that will hold the placeholder "value" as a button
        var inputName = $("<button>");
        // Then give it a data-person
        inputName.attr("id", "item-" + data - person);
        inputName.text(input);
    };



    input();
    console.log(input);
    //  debugger;
    // the This refers to the button that was clicked
    var person = $(this).attr("data-person");
    // constructing a url to search Giphy for the name of the person who said the quote
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=vwG8pCwU6gRWLOOesOGH7OMkNazoi8hz&limit=10";

    // Performing the AJAX GET request

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After the data comes back from the API

        .then(function (response) {
            // Storing the array of results in the results variable


            var results = response.data;
            console.log(response);
            // Looping over every result item

            for (var i = 0; i < results.length; i++) {

                // only taking action if the photo has an appropriate rating
                console.log("for loop is running");
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    console.log("inside if statement");
                    // Creating a div for the gif
                    var gifDiv = $("<div>");

                    // Storing the results in item's rating

                    var rating = results[i].rating;

                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + rating);

                    // Creating an image tag
                    var personImage = $("<img>");

                    // Giving the iamge tag a src attribute of a propert pulled off the result item
                    personImage.attr("src", results[i].images.fixed_height.url);

                    // Appending the paragraph and personImage we created to the "gifDiv" div we created 
                    gifDiv.append(p);
                    gifDiv.append(personImage);
                    // Prepending the gifDiv to the "#gifs-appear-hear" div in the HTML
                    $("#gifs-appear-here").prepend(gifDiv);
                }
            }
        });
});


 // Event listener on the submit button


