export default class Footer {
    constructor() {
        this.app = document.querySelector("#main-content-container");

        this.footer = document.createElement("footer");

        this.sourceContainer = document.createElement("div");

        this.sourceLink = document.createElement("a");
        this.sourceLink.target = "_blank";
        this.sourceLink.textContent = "Michael F. 2024";
        this.sourceLink.href = "https://github.com/michael-f-portfolio/";
        this.sourceContainer.appendChild(this.sourceLink);
        this.footer.appendChild(this.sourceContainer);
        this.app.appendChild(this.footer);
    }
}