import "./style.scss";
import ProgressBar from "./components/progress-bar/progress-bar";


const progressChangeCallback = (progress) => console.log("Progress callback! Value is:", progress);

const createdProgressBar = new ProgressBar(69, progressChangeCallback);

setInterval(() => {
    const rand = Math.floor(Math.random() * 100);
    createdProgressBar.setProgress(rand);
}, 2000);

document.body.appendChild(createdProgressBar);
