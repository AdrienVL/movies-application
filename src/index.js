const $ = require('jquery');




const {getMovies} = require('./api.js');



getMovies().then((movies) => {
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);



    $('.loading').remove();
    $('.container').append('<div>' + title + '</div>');


  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});




//Loading functionality- Display loading function at the start on HTML. Remove class when the page has loaded