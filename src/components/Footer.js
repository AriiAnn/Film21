class Footer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="footer">
      <h2>DIBUAT OLEH MUHAMMAD ARIANSYAH</h2>
    </div>`;
  }
}

customElements.define("foo-ter", Footer);
