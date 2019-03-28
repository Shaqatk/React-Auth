import React from 'react'
import $ from 'jquery'
import getmovies from '../movie'

export default function Member() {

  return (
      <body>
          
      
      <div>
    <div className="container">
      <div className="jumbotron">
      <h3 className="text-center text-dark">Search for any movie</h3>
      <form id="searchform">
      <input type="text" className="form-control" id="searchtext" placeholder="Search A Movie..."/>
      </form>
      </div>
    </div>
    <div className="container">
        <div id="movies" className="row">
        <h1>sa</h1>
        </div>
        </div>
    </div>

    <script>    
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
    })
})
    </script>
    </body>
  )
}
