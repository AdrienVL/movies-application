const $ = require('jquery');
//Modules link with api
const {getMovies} = require('./api.js');

function disPlayMovies(){


    $('.container').html("");
    getMovies().then((movies) => {



        movies.forEach(({title, rating, id, details}) => {
            console.log(`id#${id} - ${title} - rating: ${rating}- ${details}`);


            $('.loading').remove();
            $('.container').append("<div id='" + id + "'>" +
                'id: ' + id + ', ' +
                'title: ' + title + ', ' +
                'rating: ' + rating + ', ' +
                'details: ' + details +
                '</div>');


//Store the id of the movie to be deleted. Click on the delete button to get rid of movie from display.
            $('#' + id).click(function () {
                console.log(id);
                $('#delete').click(function () {

                    console.log('/api/movies/' + id);
                    const options = {
                        method: 'DELETE',

                    };
                    fetch('/api/movies/' + id, options)
                        .then(response => console.log(response))
                        .catch(error => console.log(error));

                    disPlayMovies();

                })

                $('#edit').click(function () {

                    console.log('/api/movies/');
                    const detailsInput = {details: $('#details').val()};
                    const options = {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(detailsInput),

                    };
                    fetch('/api/movies/'+id, options)
                        .then(response => console.log(response))
                        .catch(error => console.log(error));

                    disPlayMovies();

                });
            })

        });


    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.')
        console.log(error);
    });

    // Infinity Loop
    // disPlayMovies();

}

//-----------------------------------------------------------------------------------------------------Add Movie--------------------------------------------------------------------------//
function addMovie() {



    const movieTitleRatingsDetails = {title: $('#title').val(), rating: $('#rating').val(), details: $('#details').val()};
    const url = '/api/movies';
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieTitleRatingsDetails),
    };
    fetch(url, options)
        .then(response => {
            $('#title').val("");
            $('#rating').val("");
            $('#details').val("");

            console.log(response)
        })
        .catch(error => console.log(error));



    disPlayMovies();

}


//-------------------------------------------------------------------------------------------------Displaying Movie------------------------------------------------------------------------//


disPlayMovies();



//------------------------------------------------------------------------------------------------Buttons--------------------------------------------------------------------------------//

$('#submit').click(function () {


    return addMovie();
});




















