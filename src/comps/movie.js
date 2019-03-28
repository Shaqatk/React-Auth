import $ from 'jquery'
import axios from 'axios'

// to get well everything is loaded
$(document).ready(() => {
    //listen for a for submit
    $('#searchform').on('submit', (e) => {
        e.preventDefault();
        //gets inputted text
        let searchtext = $('#searchtext').val()

        //change page title to seachtext
        document.title = searchtext.toUpperCase();

        //call funtion getmovies
        getmovies(searchtext);
    });
});

//search funtion
function getmovies(searchtext) {
    //makes http request to get api
    axios.get('http://www.omdbapi.com/?s=' + searchtext + '&apikey=ebb039e2')
        //beacuse is a promise/uses response from request
        .then((response) => {
            //go into data.search array of the response
            let movies = response.data.Search;
            console.log(movies);
            //somewehre to output
            let output = "";
            //loop trough each array index
            $.each(movies, (i, movie) => {
                // what to output from movie
                output += `<div class=" card col-md-4">
<div class="well text-center">
<img class="p-2" src="${movie.Poster}">
<h5>${movie.Title}</h5>
<a onclick="movieselected('${movie.imdbID}')" class="btn btn-primary" href="">Movie Details</a>
</div>
</div>`;

            });
            //output in movie div
            $('#movies').html(output);

        })
        .catch((err) => {
            console.log(err);
        });

}
export default getmovies;

function movieselected(id) {

    var moviee = "movieId";
    //session storage similar to local storaage but clears out when browser closes
    sessionStorage.setItem(moviee, id);
    //go to movie.html
    window.location = "../../public/movie.html";
    return false;

}


function getmovie() {

    var movieId = sessionStorage.getItem('movieId');

    //makes http request to get api
    axios.get('http://www.omdbapi.com/?i=' + movieId + '&apikey=ebb039e2')
        //beacuse is a promise/uses response from request
        .then((response) => {
            let movie = response.data;
            let output = `<div class="row">
        <div class="col-md-4">
            <img src="${movie.Poster}" class=" ml-2 mt-2 img-thumbnail">
        </div>
        <div class="col-md-8">
            <h2 id="title">${movie.Title}</h2>
            <ul class="list-group">
                <li class="list-group-item"><strong>Genre:</strong>${movie.Genre}</li>
                <li class="list-group-item"><strong>Released:</strong>${movie.Released}</li>
                <li class="list-group-item"><strong>Rating:</strong>${movie.Rated}</li>
                <li class="list-group-item"><strong>IMBD rating:</strong>${movie.imbdRating}</li>
                <li class="list-group-item"><strong>Director:</strong>${movie.Director}</li>
                <li class="list-group-item"><strong>Writer:</strong>${movie.Writer}</li>
                <li class="list-group-item"><strong>Actors:</strong>${movie.Actors}</li>
            </ul>
        </div>
    </div>
    <div class="row">
        <div class="well ml-4 mt-3">
            <h3 id="title">Plot</h3>
            ${movie.Plot}
            <hr>
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary mb-2">View IMDB</a>
            <a href="index.html" class="btn btn-danger mb-2">Search another movie</a>
        </div>
    </div>`;

            $('#movie').html(output);

        })
        .catch((err) => {
            console.log(err);
        });
}