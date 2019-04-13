const $ = require('jquery');
//Modules link with api
const {getMovies} = require('./api.js');


$('.buttons').prop('disabled', true);
disPlayMovies();

function disPlayMovies() {

//Add disable attribute to html and remove them after getMovies().then... Just for container


    getMovies().then((movies) => {

        $('.buttons').prop('disabled', false);

        $('.container').html("");
        movies.forEach(({title, rating, id, genre, details}) => {
            console.log(`id#${id} - ${title} - rating: ${rating} - genre: ${genre} - ${details} `);


            $('.container').append("<div id='" + id + "'>" +
                'id: ' + id + ', ' +
                'title: ' + title + ', ' +
                'rating: ' + rating + ', ' +
                'genre: ' + genre + ', ' +
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

                    $('.buttons').prop('disabled', true);

                    console.log('/api/movies/' + id);
                    const url = '/api/movies/' + id;
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

                    $('.buttons').prop('disabled', true);


                    const detailsInput = {
                        details: $('#details').val(),
                        title: $('#title').val(),
                        genre: $('#genre').val(),
                        rating: $('#rating').val()
                    };
                    const url = '/api/movies/' + id;
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

        $('#sortTitle').off().click(function () {


            getMovies().then((movies) => {

                $('.container').html("");




                var tempArray = [movies.length];
                var alphabeticalCharacter;
                var lowestChar = 100;
                var lowestNumberIndex;
                var finalArray = [];
                var originalArrayObjectsLength = movies.length;
                var count = 0;
                var finalArrayObjectPush;

                console.log(movies);


                for(var i = 0; i < movies.length; i++){

                    tempArray[i] = movies[i];
                }

                do {



                    for(var i = 0; i < tempArray.length; i++){


                        var firstLetter = tempArray[i].title.substring(0, 1);

                        alphabeticalCharacter = firstLetter.charCodeAt((0));



                        if(alphabeticalCharacter < lowestChar){

                            lowestChar = alphabeticalCharacter;

                            lowestNumberIndex = i;

                            finalArrayObjectPush = tempArray[i];


                        }

                    }

                    console.log(lowestNumberIndex);
                    tempArray.splice(lowestNumberIndex,1);
                    console.log(tempArray);
                    finalArray.push(finalArrayObjectPush);
                    lowestChar = 100;
                    count++;


                }while(count < originalArrayObjectsLength);

                console.log(tempArray)
                console.log(finalArray);

                finalArray.forEach(({title, rating, id, genre, details}) => {


                        $('.container').append("<div id='" + id + "'>" +
                            'id: ' + id + ', ' +
                            'title: ' + title + ', ' +
                            'rating: ' + rating + ', ' +
                            'genre: ' + genre + ', ' +
                            'details: ' + details +
                            '</div>');

                });


            }).catch((error) => {
                alert('Oh no! Something went wrong.\nCheck the console for details.')
                console.log(error);
            });

        });


    }).catch((error) => {
        alert('Oh no! Something went wrong.\nCheck the console for details.')
        console.log(error);
    });


}

function addMovie() {


    const movieTitleRatingsDetails = {
        title: $('#title').val(),
        rating: $('#rating').val(),
        genre: $('#genre').val(),
        details: $('#details').val()
    };
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

            console.log(response)
        })
        .catch(error => console.log(error));

    $('.container').html("");
    $('.container').append("<div class='loading'>" +
        '</div>');
    disPlayMovies();

}


$('#submit').click(function () {


    $('.buttons').prop('disabled', true);
    return addMovie();
});













