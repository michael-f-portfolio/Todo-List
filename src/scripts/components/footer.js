import "styles/footer.css";
import githubLogoPNG from "../../assets/imgs/github-mark.png";

export default class Footer {
    constructor() {
        this.app = document.querySelector("#main-content-container");

        this.footer = document.createElement("footer");
        this.sourceContainer = document.createElement("div");

        this.sourceLink = document.createElement("a");
        this.sourceLink.target = "_blank";
        this.sourceLink.textContent = "Copyright © 2024 Michael F.";
        this.sourceLink.href = "https://github.com/michael-f-portfolio/Todo-List";

        this.githubLogo = document.createElement("img");
        this.githubLogo.src = githubLogoPNG;
        this.sourceLink.appendChild(this.githubLogo);


        this.sourceContainer.appendChild(this.sourceLink);
        this.footer.appendChild(this.sourceContainer);
        this.app.appendChild(this.footer);
    }
}