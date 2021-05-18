const PROGRESS_BAR_CLASSNAME = "progress-bar";

export default class ProgressBar extends HTMLElement {
    constructor(progress = 0, progressChangeCallback = null) {
        super();

        this.progress = this.getAttribute("progress") ?? progress;

        this.progressChangeCallback = progressChangeCallback;

        this._root = this.attachShadow({mode: "closed"});

        // this.buildRaw();
        this.buildInBetterWay();
    }

    buildRaw() {
        this._root.innerHTML = `
            <div class="${PROGRESS_BAR_CLASSNAME}"></div>

            <style>
                .${PROGRESS_BAR_CLASSNAME} {
                    background: rgb(255, 157, 0);
                    width: 0%;
                    height: 10px;
                    border-radius: 4px;
                    transition: width 150ms ease-in;
                }
            </style>
        `;

        this.setProgress();
    }

    buildInBetterWay() {
        this._root.appendChild(this.createProgressBar());

        this.setProgress();
    }

    createProgressBar() {
        const progressBar = document.createElement("div");
        progressBar.classList.add(PROGRESS_BAR_CLASSNAME);
        progressBar.style.background = "rgb(255, 157, 0)";
        progressBar.style.width = `${this.progress}%`;
        progressBar.style.height = "10px";
        progressBar.style.borderRadius = "4px";
        progressBar.style.transition = "width 150ms ease-in";

        progressBar.addEventListener("click", (event) => {
            alert(`Current progress is ${this.progress}`)
        });

        return progressBar;
    }

    setProgress(progress = this.progress) {
        this.progress = progress;

        const progressBar = this._root.querySelector("." + PROGRESS_BAR_CLASSNAME);
        
        progressBar.style.width = `${this.progress}%`;

        // Check if callback is function.
        if (this.progressChangeCallback
            && {}.toString.call(this.progressChangeCallback) === "[object Function]") {
                this.progressChangeCallback(this.progress);
        }
    }

    static get observedAttributes() {
        return [ "progress" ];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "progress") {
          this.setProgress(newValue);
        }
    }
}

window.customElements.define("progress-bar", ProgressBar);
