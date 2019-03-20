const $ = require('jquery');
//Modules link with api
const {getMovies} = require('./api.js');




function disPlayMovies(){



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
                $('#title').val((title));
                $('#rating').val((rating));
                $('#details').val((details));

                $('#delete').off().click(function () {

                    console.log('/api/movies/' + id);
                    const url='/api/movies/' + id;
                    const options = {
                        method: 'DELETE',

                    };
                    fetch(url, options)
                        .then(response => {
                            $('#details').val("");
                            $('#title').val("");
                            $('#rating').val("");
                            console.log(response)


                        })
                        .catch(error => console.log(error));


                    $('.container').html("Loading...");
                    disPlayMovies();

                })

                $('#edit').off().click(function () {

                    const detailsInput = {details: $('#details').val(),
                                            title: $('#title').val(),
                                            rating: $('#rating').val()};
                    const url= '/api/movies/'+id;
                    const options = {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(detailsInput),

                    };
                    fetch(url, options)
                        .then(response => {
                            $('#details').val("");
                            $('#title').val("");
                            $('#rating').val("");
                            console.log(response)
                        })
                        .catch(error => console.log(error));

                    $('.container').html("Loading...");
                    disPlayMovies();

                });
            })

        });



    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.')
        console.log(error);
    });



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
            $('.container').html("");

            console.log(response)
        })
        .catch(error => console.log(error));


$('.container').html("Loading...");
    disPlayMovies();

}


//-------------------------------------------------------------------------------------------------Displaying Movie------------------------------------------------------------------------//


disPlayMovies();



//------------------------------------------------------------------------------------------------Buttons--------------------------------------------------------------------------------//

$('#submit').click(function () {


    return addMovie();
});




















