const axios = require("axios");

class SeriesPopular extends HTMLElement {
  connectedCallback() {
    const apiKey = "b1deafc902776a1472a7e2048f3f03e1";
    const apiUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`;

    axios
      .get(apiUrl)
      .then((response) => {
        const seriess = response.data.results;
        const seriesPopular = new SeriesPopularRenderer(seriess);
        this.innerHTML = seriesPopular.render();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

class SeriesPopularRenderer {
  constructor(seriess) {
    this.seriess = seriess;
  }

  render() {
    return `
    <h1>Series</h1>
      ${this.seriess
        .slice(0, 8)
        .map(
          (series) => `
        <div class="card column">
          <img src="https://image.tmdb.org/t/p/w200${series.poster_path}" alt="${series.title}" /> &emsp;
          <div >
            <h2>${series.name}</h2>
            <p><strong>Release Date :</strong> ${series.first_air_date} <br/><strong>Rating :</strong> ⭐ ${series.vote_average} </p>
            <p>
            ${series.overview}
            </p>
          </div>
        </div>`
        )
        .join("")}
    `;
  }
}

customElements.define("series-popular", SeriesPopular);
