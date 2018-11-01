// create a function upon the page loading
$(function() {

    populateButtons(srchArr, 'searchButton', '#BtnArea');
    console.log("page loaded");
})

// Create a function that will populate the btnArea with button

// 1st Create an initial button variable 

var srchArr = ['Adam Sandler','Wesley Snipes', 'Arnold Schwarzenegger'];

// 
function populateButtons(srchArr, classToAdd, areaToAddTo) {
    // need to empty out the buttons area everytime we add a new button
    $(areaToAddTo).empty();
    for(var i=0; i<srchArr.length; i++) {
        //
        var a = $('<button>');
        a.addClass(classToAdd);
        // adding in a type of data that is = to items in array
        a.attr('data-type',srchArr[i]);
        // the text of the button is going to be = to whats entered into search
        a.text(srchArr[i]);
        $(areaToAddTo).append(a);
    }
}

$(document).on('click', '.searchButton' ,function() {
    var type= $(this).data('type');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
             type + "&api_key=vwG8pCwU6gRWLOOesOGH7OMkNazoi8hz&limit=10";
             $.ajax({
                 url: queryURL,
                 method: "GET"
             })
             .done(function(response) {
                for (var i = 0; i < response.data.length; i++){
                    var searchDiv = $('<div class="search-item">');
                    var rating = response.data[i].rating;
                    var p = $('<p>').text('Rating' +rating);
                    var animated = response.data[i].images.fixed_height.url;
                    var still = response.data[i].images.fixed_height_still.url; 
                    var image = $('<img>');
                        image.attr('src',still); 
                        image.attr('data-still', still);
                        image.attr('data-animated', animated);
                        image.attr('data-state','still');
                        image.addClass('searchImage');
                        searchDiv.append(p);
                        searchDiv.append(image);
                        $('#searches').append(searchDiv);
                }
             })
    
})

$(document).on('click', '.searchImage', function() {
    
    var state = $(this).data('state');
    if(state == 'still') {
        $(this).attr('src',$(this).data('animated'));
        $(this).attr('data-state', 'animated');
    } else {
        $(this).attr('src',$(this).data('still'));
        $(this).attr('data-state', 'still');
    }
})

// get the text box to add new buttons
$('#submit').on('click', function (e) {
    e.preventDefault();
    var newSearch = $('input').eq(0).val();
   
    srchArr.push(newSearch);
    populateButtons(srchArr, 'searchButton', '#BtnArea');
    return false;
})



