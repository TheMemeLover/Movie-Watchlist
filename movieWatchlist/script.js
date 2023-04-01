const results = document.querySelector(".results")


function search() {
  results.classList.remove("column")
  results.innerHTML = '<div class="loader"></div>'
  const inputValue = document.getElementById("searchInput").value
  fetch(`https://www.omdbapi.com/?s=${inputValue}&apikey=2197e5bd`)
      .then(res => res.json())
      .then(data => {
        results.innerHTML = ''
        if (data.Response == "False") {
          return results.innerHTML = "<h1 id='errorMSG'>Oops, it seems like that movie doesn't exist</h1>"
        }
        for (let i of data.Search){
          fetch(`https://www.omdbapi.com/?t=${i.Title}&apikey=2197e5bd&plot=short`)
            .then(res => res.json())
            .then(data => {
              results.innerHTML += `
                <div class="movieComponent flex">
                  <img src=${data.Poster} class="movieIMG" width="100px">
                  <div class="infoContainer flex column">
                    <div class="head flex"><h1>${data.Title}</h1><h3><img src="img/star.png">${data.imdbRating}</h3></div>
                    <div class="categories flex"><span>${data.Runtime}</span><span>${data.Genre}</span><span class="flex addWatchlist" onclick="addMovie('${data.Title}')"><img src="img/plus.png">Watchlist</span></div>
                    <p class="plot">${data.Plot}</p>
                  </div>
                </div>
              `
            })
        }
        
      })
  
}
function addMovie(title) {
  const movies = JSON.parse(localStorage.getItem("movies")) || []
  movies.push(title)
  const newSet = new Set(movies)
  const newArray = [...newSet]
  localStorage.setItem("movies", JSON.stringify(newArray))
}
function handle(event) {
  event.preventDefault()
  search()
  form.reset()
}
