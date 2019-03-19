const $ = require('jquery');
//Modules link with api
const {getMovies} = require('./api.js');

//-----------------------------------------------------------------------------------------------------Add Movie--------------------------------------------------------------------------//
function addMovie(){


  const movieTitleRatings = {title: $('#title').val(), rating: $('#rating').val()};
  const url = '/api/movies';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movieTitleRatings),
  };
  fetch(url, options)
      .then(response => console.log(response))
      .catch(error =>console.log(error));

}

function deleteMovie(id){


  const options = {
    method: 'DELETE',

  };
  fetch('/api/movies/', options)
      .then(response => console.log(response))
      .catch(error =>console.log(error));

}

//-------------------------------------------------------------------------------------------------Displaying Movie------------------------------------------------------------------------//

getMovies().then((movies) => {

  movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);



    $('.loading').remove();
    $('.container').append("<div id='"+id+"'>" +
        'id: ' + id + ', ' +
        'title: ' + title + ', ' +
        'rating: ' + rating +
        '</div>');



    $('#'+id).click(function(){
      console.log(id);
      $('#delete').click(function(){
        console.log(id);
        deleteMovie(id);

      })
    })

  });




}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});


//------------------------------------------------------------------------------------------------Buttons--------------------------------------------------------------------------------//

$('#submit').click(function(){

  return addMovie();
});




















