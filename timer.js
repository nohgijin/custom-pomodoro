const { ipcRenderer } = require("electron");

let remainTime = Number(localStorage.getItem("time"));
let visited = false;

let min = String(parseInt(remainTime / 60));
let seconds = String(remainTime % 60);
let startTimer;

if (min.length === 1) {
  min = `0${min}`;
}

if (seconds.length === 1) {
  seconds = `0${seconds}`;
}
document.querySelector(".min").value = min;
document.querySelector(".seconds").value = seconds;

const setTime = () => {
  if (!visited) {
    remainTime = Number(localStorage.getItem("time"));
    visited = true;
  }
  let min = String(parseInt(remainTime / 60));
  let seconds = String(remainTime % 60);

  if (min.length === 1) {
    min = `0${min}`;
  }

  if (seconds.length === 1) {
    seconds = `0${seconds}`;
  }
  document.querySelector(".min").value = min;
  document.querySelector(".seconds").value = seconds;
};

const progressTimer = () => {
  setTime();
  remainTime--;
};

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

const handleStartClick = () => {
  displayStopButton();
  startTimer = setInterval(() => {
    progressTimer();
    if (remainTime < 0) {
      clearInterval(startTimer);
      remainTime = Number(localStorage.getItem("time"));
      displayStartButton();
      ipcRenderer.invoke("my-invokable-ipc");
    }
  }, 1000);
};

//일시정지
const handlePauseClick = () => {
  displayStartButton();
  clearInterval(startTimer);
};

//첨부터
const handleStopClick = () => {
  clearInterval(startTimer);
  displayStartButton();
  remainTime = Number(localStorage.getItem("time"));
  setTime();
};

const handleSaveClick = () => {
  const min = Number(document.querySelector(".min").value);
  const seconds = Number(document.querySelector(".seconds").value);
  localStorage.setItem("time", min * 60 + seconds);
  document.querySelector(".start").className = "start";
  document.querySelector(".save").className = "hide save";
  document.querySelector(".min").readOnly = true;
  document.querySelector(".seconds").readOnly = true;
};

const setting = () => {
  handleStopClick();
  document.querySelector(".start").className = "hide start";
  document.querySelector(".pause").className = "hide pause";
  document.querySelector(".stop").className = "hide stop";
  document.querySelector(".save").className = "save";
  document.querySelector(".min").readOnly = false;
  document.querySelector(".seconds").readOnly = false;
  visited = false;
};
