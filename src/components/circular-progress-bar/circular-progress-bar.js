const CIRCLE_PROGRESS_CLASSNAME = "circular-progress";

export default class CircularProgressBar extends HTMLElement {
    constructor(
        size = 120,
        strokeWidth = 4,
        progress = 50,
        progressChangeCallback = null) {
        super();

        this.size = this.getAttribute("size") ?? size;

        this.strokeWidth = this.getAttribute("strokeWidth") ?? strokeWidth;

        this.progress = this.getAttribute("progress") ?? progress;

        this.strokeColor = "#ff9d00";

        this.radius = (this.size / 2) - this.strokeWidth;

        this.circleLength = 2 * Math.PI * this.radius;

        this.progressChangeCallback = progressChangeCallback;

        this._root = this.attachShadow({mode: "closed"});

        this.build();
    }

    buildRaw() {
        this._root.innerHTML = `
            <style>
               svg {
                   transform: rotate(-90deg);
               }
               circle {
                   stroke-dasharray: ${this.circleLength}, ${this.circleLength};
                   stroke-dashoffset: ${this.circleLength};
               }
            </style>

            <svg 
                width="${this.size}" 
                height="${this.size}">
                <circle class="${CIRCLE_PROGRESS_CLASSNAME}"
                        r="${this.radius}"
                        fill="transparent"
                        stroke-width="${this.strokeWidth}"
                        stroke="${this.strokeColor}"
                        cx="${this.size / 2}"
                        cy="${this.size / 2}"/>
            </svg>
        `;

        this.setProgress();
    }

    build() {
        this._root.appendChild(this.createProgressBar());
        this.setProgress();
    }


    createProgressBar() {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttributeNS(null, "height", this.size.toString());
        svg.setAttributeNS(null, "width", this.size.toString());
        svg.style.transform = "rotate(-90deg)";

        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.classList.add(CIRCLE_PROGRESS_CLASSNAME);
        circle.setAttributeNS(null, "r", this.radius.toString());
        circle.setAttributeNS(null, "fill", "transparent");
        circle.setAttributeNS(null, "stroke-width", this.strokeWidth.toString());
        circle.setAttributeNS(null, "stroke", this.strokeColor);
        circle.setAttributeNS(null, "cx", (this.size / 2).toString());
        circle.setAttributeNS(null, "cy", (this.size / 2).toString());
        circle.style.strokeDasharray = `${this.circleLength}, ${this.circleLength}`;
        circle.style.strokeDashoffset = `${this.circleLength}`;
        circle.style.strokeLinecap = "round";
        circle.style.transition = "all 150ms ease-in-out";

        svg.appendChild(circle);

        return svg;
    }

    setProgress(progress = this.progress) {
        this.progress = progress <= 100 ? progress : 100;

        const offset = this.circleLength - ((this.circleLength * this.progress) / 100);

        const circle = this._root.querySelector("."+ CIRCLE_PROGRESS_CLASSNAME);

        circle.style.strokeDashoffset = offset;

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

window.customElements.define("circular-progress-bar", CircularProgressBar);
