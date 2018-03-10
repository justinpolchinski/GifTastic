console.log("linking...");
//SFU1k0pkoRGT6u6Q2TYGEgfldbBvS7W2
var outdoors = ["Mountain","Tree","Alligator","River","Ski","Rocks","Volcano"];
var searching;
var $input = $("#searchInput");
var imgTagStill;
var imgTagMotion;
var $buttons = $("#buttons");
var $submit = $("#submit");
var $img = $("<img>");
var newURL;
var imgRating;
var i;
var a;
// initial buttons__________________________________
for ( a = 0; a<outdoors.length; a++){
$buttons.append("<button class='buttonSearch'>"+ outdoors[a]+"</button>");
}
//create images and stop start___________________________________________________
function functionSearch(searching){
  queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searching + "&rating&limit=20&api_key=SFU1k0pkoRGT6u6Q2TYGEgfldbBvS7W2";
  console.log($input);
  $(".imgClass").html('');
  $.ajax({
    url: queryURL,
    method: 'GET'
    }).then(function (response) {
    
    for (i = 0; i<10; i++ ){
      imgTagStill=response.data[i].images.downsized_still.url;    
      imgTagMotion = response.data[i].images.downsized.url;
      imgRating = response.data[i].rating;
  
    $(".imgClass").append(`<div><h1>Rating: ${imgRating} </h1><img src="${response.data[i].images.downsized_still.url}"data-still="${response.data[i].images.downsized_still.url}" data-animate="${response.data[i].images.downsized.url}" data-state="still" class="gif" id="img${i}"></div>`);

}  
$(".gif").on("click", function() {
 
  var state = $(this).attr("data-state");
  console.log(state);
  console.log("here");
  if (state == "still") {

    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
    console.log("if");

  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
    console.log("else");
  }
});
});

 
}
//submit button creates new buttons and runs functionSearch()____________________
$submit.on("click", function(){
  $buttons.html('');
  outdoors.push($input.val());
  console.log(outdoors);
  functionSearch($input.val(''));
  for ( a = 0; a<outdoors.length; a++){
    $buttons.append("<button class='buttonSearch'>"+ outdoors[a]+"</button>");
    }
    $(".buttonSearch").on("click", function(){
      var choice = ($(this).text());
      functionSearch(choice);
    })
    $input.val("");
})  
//button that checks button text and runs functionSearch______________________
$(".buttonSearch").on("click", function(){
  var choice = ($(this).text());
  functionSearch(choice);
})

$input.keyup(function() {
  console.log($input.val());
  event.preventDefault();
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    console.log("hot Damn");
    $buttons.html('');
    outdoors.push($input.val());
    console.log(outdoors);
    functionSearch($input.val());
    
    for ( a = 0; a<outdoors.length; a++){
      $buttons.append("<button class='buttonSearch'>"+ outdoors[a]+"</button>");
      }
      $(".buttonSearch").on("click", function(){
        var choice = ($(this).text());
        functionSearch(choice);
      })
      $input.val('');
  }
  });
 


