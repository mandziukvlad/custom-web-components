import "./style.scss";
import ProgressBar from "./components/progress-bar/progress-bar";
import CircularProgressBar from "./components/circular-progress-bar/circular-progress-bar";

function createWrapper(child) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");

    wrapper.appendChild(child);

    return wrapper;
}

const progressChangeCallback = (progress) => console.log("Progress callback! Value is:", progress);
const circularProgressChangeCallback = (progress) => console.log("Circular Progress callback! Value is:", progress);

const createdProgressBar = new ProgressBar(69, progressChangeCallback);
const createdCircularProgressBar = new CircularProgressBar(120, 10, 69, circularProgressChangeCallback);

setInterval(() => {
    const rand = Math.floor(Math.random() * 100);
    createdProgressBar.setProgress(rand);
    createdCircularProgressBar.setProgress(rand);
}, 2000);

const root = document.getElementById("root");

root.appendChild(
   createWrapper(createdProgressBar)
);

root.appendChild(
    createWrapper(createdCircularProgressBar)
 );

