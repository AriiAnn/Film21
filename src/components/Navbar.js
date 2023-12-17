import "./SearchSeries.js";

class Navbar extends HTMLElement {
  connectedCallback() {
    this.render();
  }
  render() {
    this.innerHTML = `
    <div class="topnav">
      <a href="/">FILM21</a>
    </div>`;
  }
}

customElements.define("nav-bar", Navbar);
