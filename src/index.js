const $ = require('jquery');
//Modules link with api
const {getMovies} = require('./api.js');




function disPlayMovies(){

//Add disable attribute to html and remove them after getMovies().then... Just for container


    getMovies().then((movies) => {


        // document.getElementsByTagName('<button>').disabled = false;
        $('.container').html("");
        movies.forEach(({title, rating, id, genre, details}) => {
            console.log(`id#${id} - ${title} - rating: ${rating} - genre: ${genre} - ${details} `);




            $('.container').append("<div id='" + id + "'>" +
                'id: ' + id + ', ' +
                'title: ' + title + ', ' +
                'rating: ' + rating + ', ' +
                'genre: ' + genre + ',' +
                'details: ' + details +
                '</div>');


//Store the id of the movie to be deleted. Click on the delete button to get rid of movie from display.
            $('#' + id).click(function () {

                console.log(id);
                $('#title').val((title));
                $('#rating').val((rating));
                $('#genre').val((genre));
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
                            $('#genre').val("");
                            console.log(response)


                        })
                        .catch(error => console.log(error));


                    $('.container').html("");
                    $('.container').append("<div class='loading'>" +
                        '</div>');


                    disPlayMovies();

                })

                $('#edit').off().click(function () {

                    const detailsInput = {details: $('#details').val(),
                                            title: $('#title').val(),
                                            genre: $('#genre').val(),
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
                            $('#genre').val("");
                            $('#rating').val("");
                            console.log(response)
                        })
                        .catch(error => console.log(error));

                    $('.container').html("");
                    $('.container').append("<div class='loading'>" +
                        '</div>');
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



    const movieTitleRatingsDetails = {title: $('#title').val(), rating: $('#rating').val(), genre: $('#genre').val(), details: $('#details').val()};
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
            $('#genre').val("");
            $('#details').val("");
            $('.container').html("");

            console.log(response)
        })
        .catch(error => console.log(error));


    $('.container').append("<div class='loading'>" +
        '</div>');
    disPlayMovies();

}


//-------------------------------------------------------------------------------------------------Displaying Movie------------------------------------------------------------------------//

// document.getElementsByTagName('<button>').disabled = true;
disPlayMovies();



//------------------------------------------------------------------------------------------------Buttons--------------------------------------------------------------------------------//

$('#submit').click(function () {


    return addMovie();
});




















