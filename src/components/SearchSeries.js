const axios = require("axios");
const apiKey = "b1deafc902776a1472a7e2048f3f03e1";

class SeriesSearch extends HTMLElement {
  connectedCallback() {
    this.render();

    const searchForm = this.querySelector("#search-form");
    const searchInput = this.querySelector("#search-input");
    const seriesListElement = this.querySelector("#series-list");

    const createSeriesElement = (series) => {
      const seriesElement = document.createElement("div");
      seriesElement.innerHTML = `<div class="card">
        <img src="https://image.tmdb.org/t/p/w200${series.poster_path}" alt="${series.name}" /> &emsp; 
          <div>
            <h2>${series.name}</h2>
            <p>
              <strong>Release Date :</strong> ${series.first_air_date} <br />
              <strong>Rating :</strong> ⭐ ${series.vote_average}
            </p>
            <p> ${series.overview} </p>
          </div>
        </div>
        <hr />
        `;
      return seriesElement;
    };

    const renderSearchResults = (series) => {
      seriesListElement.innerHTML = "";

      if (series.length === 0) {
        seriesListElement.textContent = "No series found.";
        return;
      }

      const seriesElements = series.map(createSeriesElement);
      seriesElements.forEach((seriesElement) => {
        seriesListElement.appendChild(seriesElement);
      });
    };

    const searchSeriess = (query) => {
      const searchUrl = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${query}`;

      axios
        .get(searchUrl)
        .then((response) => {
          const seriess = response.data.results;
          renderSearchResults(seriess);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = searchInput.value.trim();
      if (query !== "") {
        searchSeriess(query);
      }
    });
  }

  render() {
    this.innerHTML = `
      <form id="search-form">
        <input
          type="text"
          id="search-input"
          placeholder="Search Tv Series"
        />
        <button type="submit">Search</button>
      </form>
      <ul id="series-list"></ul>
    `;
  }
}

customElements.define("search-series", SeriesSearch);
