
var characters = ["Michael Scott", "Dwight Schrute", "Jim Halpert", "Andy Bernard"];

function displayCharacters(){

  var character = $(this).attr("data-name");
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + character + "&api_key=e8f35bfbec3442258243d81385cce5ae&limit=10";


  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response){

    var characterDiv = $("<div class='character-data'>");

    for(i = 0; i < response.data.length; i++){
    var image = response.data[i].images.downsized.url;
    var newImage = $("<img width='250px' height='225px' class='position'>").attr("src", image);
    characterDiv.append(newImage);

    var rating = response.data[i].rating;
    var newRating = $("<p class='rating'>").text("Rating:" + " " + rating);
    characterDiv.append(newRating);
  }
    $("#characters").html(characterDiv);

    console.log(response);

  });

}

function renderButtons(){
  $("#buttons").empty();

for (var i = 0; i < characters.length; i++) {

  var a = $("<button>");

  a.addClass("office");

  a.attr("data-name", characters[i]);

  a.text(characters[i]);

  $("#buttons").append(a);
}
}

$("#addCharacter").on("click", function(event){
  event.preventDefault();

  var character = $("#office-input").val().trim();

  characters.push(character);

  renderButtons();

  $('#office-form').trigger("reset");
});

$(document).on("click", ".office", displayCharacters);

renderButtons();
