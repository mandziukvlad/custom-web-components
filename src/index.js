import "./style.scss";
import ProgressBar from "./components/progress-bar/progress-bar";
import CircularProgressBar from "./components/circular-progress-bar/circular-progress-bar";


const progressChangeCallback = (progress) => console.log("Progress callback! Value is:", progress);

const createdProgressBar = new ProgressBar(69, progressChangeCallback);

setInterval(() => {
    const rand = Math.floor(Math.random() * 100);
    createdProgressBar.setProgress(rand);
}, 2000);

document.body.appendChild(createdProgressBar);


const circularProgressChangeCallback = (progress) => console.log("Circular Progress callback! Value is:", progress);

const createdCircularProgressBar = new CircularProgressBar(120, 10, 69, circularProgressChangeCallback);

setInterval(() => {
    const rand = Math.floor(Math.random() * 100);
    createdCircularProgressBar.setProgress(rand);
}, 2000);

document.body.appendChild(createdCircularProgressBar);

