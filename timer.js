const init = () => {};

localStorage.setItem("time", 5);
let remainTime = Number(localStorage.getItem("time"));

let flag = true;
let initVisit = true;

const displayStartButton = () => {
  document.querySelector(".start").className = "start";
  document.querySelector(".pause").className = "hide pause";
  document.querySelector(".stop").className = "hide stop";
};

const displayStopButton = () => {
  document.querySelector(".start").className = "hide start";
  document.querySelector(".pause").className = "pause";
  document.querySelector(".stop").className = "stop";
};

const timer = setInterval(() => {
  if (!initVisit) {
    remainTime = Number(localStorage.getItem("time"));
  }
  let min = String(parseInt(remainTime / 60));
  let seconds = String(remainTime % 60);
  if (flag) {
    displayStopButton();
    flag = false;
  }
  if (min.length == 1) {
    min = `0${min}`;
  }
  if (seconds.length == 1) {
    seconds = `0${seconds}`;
  }
  document.querySelector(".min").innerHTML = min;
  document.querySelector(".seconds").innerHTML = seconds;
  remainTime--;

  if (remainTime < 0) {
    displayStartButton();
    clearInterval(timer);
    flag = true;
    initVisit = false;
  }
}, 1000);

const handleStartClick = () => {
  timer();
};

const handlePauseClick = () => {};

//첨부터
const handleStopClick = () => {
  displayStartButton();
  clearInterval(timer);
};
