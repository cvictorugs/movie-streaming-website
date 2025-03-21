function searchMovies() {
    const searchTextElement = document.getElementById('searchText');
    const searchText = searchTextElement.value.trim();
    const resultContainer = document.getElementById('result');

    if (!searchText) {
        alert("Please enter a movie name.");
        return;
    }

    const apiKey = '5657bf65'; 
    const searchUrl = `http://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchText)}`;
     
    axios.get(searchUrl)
        .then(function(response) {
            if (response.data.Response === "False") {
                resultContainer.innerHTML = `<p>${response.data.Error}</p>`;
                return;
            }

            const movies = response.data.Search;
            resultContainer.innerHTML = "";    

            let html = '';
            movies.forEach(movie => {
                html += `
                    <div class="movie" onclick="goToMovieDetails('${movie.imdbID}')">
                        <img src="${movie.Poster}" alt="Poster for ${movie.Title}" onerror="this.style.display='none'"/>
                        <div class="movie-details">
                            <h2>${movie.Title} (${movie.Year})</h2>
                        </div>
                    </div>
                `;
            });

            resultContainer.innerHTML = html;
            searchTextElement.value = ""; // Clear search input
        })
        .catch(function(error) {
            console.error("Error fetching search results:", error);
            resultContainer.innerHTML = `<p>Error fetching data. Please try again later.</p>`;
        });
}

// Function to navigate to movie details page
function goToMovieDetails(movieID) {
    window.location.href = `moviedetails.html?id=${movieID}`;
}

// Hide results when clicking outside the search area
document.body.addEventListener("click", function(event) {
    const resultContainer = document.getElementById('result');
    const searchBox = document.getElementById('searchText');

    if (!searchBox.contains(event.target) && !resultContainer.contains(event.target)) {
        resultContainer.innerHTML = ""; 
    }
});

// Hide results when clicking the back button
window.onpopstate = function() {
    document.getElementById('result').innerHTML = "";
};

  
  // let openbar = document.getElementById("opennav");
  // let closebar = document.getElementById("closenav");
  // let container = document.getElementById("navcontent");
  
  // openbar.addEventListener("click", function() {
  //     container.style.display = "block";
  //     container.style.transition = "5s";
  // });
  // closebar.addEventListener("click", function() {
  //     container.style.display = "none";
  // });
  
  
  let images = [`/assets/images/discover-movies-images/darkphoenix.png`, `/assets/images/discover-movies-images/differentman.jpg`, `/assets/images/discover-movies-images/thingsdifferent.png`, `/assets/images/discover-movies-images/alladin.jpg`, `/assets/images/discover-movies-images/starwars_uusi_vaaka.jpg`];
  let texts = [
    `<div class="themovie">
            <p>Movie</p>
      </div>
      <div class="writeup">
        <h2>Dark Phoenix</h2>
        <p class="p1">June 4, 2019</p>
        <p class="p2">Jean Grey (Sophie Turner) absorbs a powerful cosmic 
        force during a rescue mission in space, which enhances her abilities 
        but also makes her unstable. As she struggles to control her newfound 
        powers, she becomes a threat to both her allies and the world. Meanwhile, 
        an alien race led by Vuk (Jessica Chastain) seeks to manipulate Jean for their own purposes
        </p>
     </div>
     <div class="btnall">
      <button class="btn3">
        <i class="fa-solid fa-circle-play"></i>
        <p>Watch Trailer</p>
      </button>
      <button class="btn4">
        <i class="fa-regular fa-bookmark"></i>
        <p>Add Watchlist</p>
      </button>
    </div>
    <div class="empty">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>`,
    `<div class="themovie">
            <p>Movie</p>
      </div>
      <div class="writeup">
        <h2>A Different Man</h2>
        <p class="p1">A24, September 20, 2024</p>
        <p class="p2">he film follows Edward (Sebastian Stan), an aspiring 
        actor with neurofibromatosis, a condition that causes facial tumors. 
        He undergoes a radical medical procedure to transform his appearance, 
        hoping for a fresh start in life and his career.
        </p>
     </div>
     <div class="btnall">
      <button class="btn3">
        <i class="fa-solid fa-circle-play"></i>
        <p>Watch Trailer</p>
      </button>
      <button class="btn4">
        <i class="fa-regular fa-bookmark"></i>
        <p>Add Watchlist</p>
      </button>
    </div>
    <div class="empty">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>`,
    `<div class="themovie">
            <p>Movie</p>
      </div>
      <div class="writeup">
        <h2>Things will be different</h2>
        <p class="p1">October 4, 2024.</p>
        <p class="p2">This film follows two estranged siblings, Joseph ("Joe") and Sidney ("Sid"),
        portrayed by Adam David Thompson and Riley Dandy, respectively. After a robbery, 
        they seek refuge in a metaphysical farmhouse that transports them to a different time, 
        where they encounter mysterious forces challenging their familial bonds.
        </p>
     </div>
    <div class="btnall">
      <button class="btn3">
        <i class="fa-solid fa-circle-play"></i>
        <p>Watch Trailer</p>
      </button>
      <button class="btn4">
        <i class="fa-regular fa-bookmark"></i>
        <p>Add Watchlist</p>
      </button>
    </div>
    <div class="empty">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>`,
    `<div class="themovie">
        <p>Movie</p>
      </div>
      <div class="writeup">
        <h2>Alladin</h2>
        <p class="p1">May 24, 2019</p>
        <p class="p2">a street thief who discovers a magical lamp containing 
        a powerful Genie. With the Genies help, Aladdin disguises himself as 
        a prince to win the heart of Princess Jasmine, while facing the evil 
        sorcerer Jafar, who seeks ultimate power.
        </p>
     </div>
     <div class="btnall">
      <button class="btn3">
        <i class="fa-solid fa-circle-play"></i>
        <p>Watch Trailer</p>
      </button>
      <button class="btn4">
        <i class="fa-regular fa-bookmark"></i>
        <p>Add Watchlist</p>
      </button>
    </div>
    <div class="empty">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>`,
    `<div class="themovie">
      <p>Movie</p>
     </div>
      <div class="writeup">
        <h2>Star Wars: The force Awaken</h2>
        <p class="p1">2n4()m - 2002 . February . Augusr6</p>
        <p class="p2">The third season of the American television series The Mandarian
          stars pedro Parcel as the tase character in bounty hunter bringing to 
          Mandacro to random hin best trarepression with his adopted son Grogu
          and bnrg aided on their journey by bedcew Mandacrism Bo.Katen Krpze
        </p>
      </div>
      <div class="btnall">
        <button class="btn3">
          <i class="fa-solid fa-circle-play"></i>
          <p>Watch Trailer</p>
        </button>
        <button class="btn4">
          <i class="fa-regular fa-bookmark"></i>
          <p>Add Watchlist</p>
        </button>
      </div>
      <div class="empty">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    `
  ]
  let currentIndex = 0;
  
  function changeDivBackground() {
  currentIndex = (currentIndex + 1) % images.length;
  document.getElementById('backgroundDiv').style.backgroundImage = `url('${images[currentIndex]}')`;
  document.getElementById('backgroundDiv').style.backgroundSize = `cover`;
  document.getElementById('backgroundDiv').style.backgroundPosition = `center`;
  document.getElementById('toChange').innerHTML = texts[currentIndex];
  }
  setInterval(changeDivBackground, 20000);