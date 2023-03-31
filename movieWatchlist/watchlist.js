

function loadMovies(){
  
  const addedMovies = document.querySelector(".addedMovies")
  const movies = JSON.parse(localStorage.getItem("movies")) || []
  let movieList = ''
  if (movies != []){
    for (let movie of movies) {
      fetch(`https://www.omdbapi.com/?t=${movie}&apikey=2197e5bd`)
        .then(res => res.json())
        .then(data => {
          movieList += `
            <div class="movieComponent flex">
              <img src=${data.Poster} class="movieIMG" width="100px">
              <div class="infoContainer flex column">
                <div class="head flex"><h1>${data.Title}</h1><h3><img src="img/star.png">${data.imdbRating}</h3></div>
                <div class="categories flex"><span>${data.Runtime}</span><span>${data.Genre}</span><span class="flex addWatchlist" onclick="removeMovie('${data.Title}')"><img src="img/minus.png" height="20px" width="26px">Remove</span></div>
                <p class="plot">${data.Plot}</p>
              </div>
            </div>
          `
          addedMovies.innerHTML = movieList
        })
    }
  }
}

function removeMovie(title) {
  const movies = JSON.parse(localStorage.getItem("movies")) || []
  const indexNumber = movies.indexOf(title)
  
  movies.splice(indexNumber, 1)
  const newSet = new Set(movies)
  const newArray = [...newSet]
  localStorage.setItem("movies", JSON.stringify(newArray))
  loadMovies()
  if (newArray.length == 0) {
    document.querySelector(".addedMovies").classList.add("column")
    document.querySelector(".addedMovies").innerHTML = `<h2 class="startExploring">Your watchlist is looking a little empty...</h2>
    <a class="addLink" href="index.html"><img class="star" src="img/plus.png">Let’s add some movies!</a>`
  }
}