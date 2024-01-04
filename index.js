

const display = document.getElementById("display");
const calc = document.getElementById("calculator");
const counter = document.getElementById("counter");
const hello = document.getElementById("hello");
const count = document.getElementById("result");
const name = document.getElementById("name");
const cps = document.getElementById("cps");
const startBtn = document.getElementById("startBtn");
const title = document.getElementById("title");
const clickCounter = document.getElementById("clicks");
const timer = document.getElementById("time");
const menu = document.getElementById("menu");
const clock = document.getElementById("clock");
const nowDate = document.getElementById("nowDate");
const nowTime = document.getElementById("nowTime");



const updateDateTime = () => {
    const today = new Date();
    nowDate.textContent = new Intl.DateTimeFormat('pl-PL', { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric' }).format(today);
    nowTime.textContent = new Intl.DateTimeFormat('pl-PL', { hour: 'numeric', minute: 'numeric', second: 'numeric' }).format(today);
};

updateDateTime();
setInterval(updateDateTime, 1000);


function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const hourDeg = (hours % 12 + minutes / 60) * 30;
    const minuteDeg = (minutes + seconds / 60) * 6;
    const secondDeg = seconds * 6;

    document.getElementById('hourHand').style.transform = `rotate(${hourDeg}deg)`;
    document.getElementById('minuteHand').style.transform = `rotate(${minuteDeg}deg)`;
    document.getElementById('secondHand').style.transform = `rotate(${secondDeg}deg)`;
}

setInterval(updateClock, 1000);
updateClock(); // Initial update

display.value = "0";
let pages = [calc,counter,hello,cps,clock];
let page = 0;

function addToDisplay(input){
    if (display.value === "error" || display.value === "NaN") display.value = input;
    else if (display.value === "0" && !isNaN(input)) display.value = input;
    else if (display.value.length < 15) display.value += input;
}


function dropFromDisplay(){
    if (display.value === "error" || display.value === "NaN") display.value = "0";
    else display.value = display.value.slice(0, -1);
}


function clearDisplay(){
    display.value = "0";
}


function calculate(){
    try{
        if (eval(display.value) == "Infinity") display.value = "error";
        else display.value= eval(display.value);
    }
    catch(eror)
    {
        display.value = "error";
    }

}

function changePage(dif){
    switch (dif) {
        case -1: {
            if(page != 0){
                pages[page].style.left = "150%";
                pages[page-1].style.left = "50%";
                page -= 1;
            
            }
            break;
        }
        case 1: {
          // Przesuń kalkulator w lewo (poza ekran)
          if(page != pages.length-1){
                pages[page].style.left = "-100%";
                pages[page+1].style.left = "50%";
                page += 1;
          }
          break;
        }
      }
}

function decrease(){
    count.textContent = Number(count.textContent) - 1;
}
function increase(){
    count.textContent = Number(count.textContent) + 1;
}
function reset(){
    count.textContent = 0;
}

function sayHello(){
    window.alert("Hello " + name.value +"!");
}
let clicks = 0;
function click(){
    clicks += 1;
    clickCounter.textContent = "Clicks: "+clicks;


}

let remainingTime;
let timerInterval;

function play() {
  remainingTime = 10;
  clicks = 0;
  title.style.visibility = "hidden";
  startBtn.style.visibility = "hidden";
  cps.style.cursor = "crosshair";
  cps.onclick = click;
  timerInterval = setInterval(updateTimer, 100);
}

function updateTimer() {
  remainingTime -= 0.1;
  timer.textContent = "Time: " + remainingTime.toFixed(1) + "s";
  console.log(remainingTime.toFixed(1));
  if (remainingTime < 0.01) {
    clearInterval(timerInterval);
    timer.textContent = "Time: 0.0s";
    title.textContent = "Your score: "+(clicks/10)+" CPS";
    startBtn.textContent = "Play again"
    title.style.visibility = "visible";
    startBtn.style.visibility = "visible";
    cps.onclick = "";
    cps.style.cursor = "default";
    setTimeout(function () {
        alert("GAME OVER");
      }, 5);
  }
}


function showApps() {
    menu.style.bottom = "0%";
    menu.style.backgroundColor = "#ffffffbd";
  }

function hideApps() {
    if (menu) {
      menu.style.bottom = "-20%";
      menu.style.backgroundColor = "#f8f8f87e";
    }
}
let clickedMenu = false;
function goTo(pageId){
    clickedMenu = true;
    hideApps(); // Wyłącz obsługę onmouseover
    setTimeout(() => {
      clickedMenu = false; // Włącz obsługę onmouseover po opóźnieniu
    }, 500);
    if(pageId > page){
        for (let i=page; i<pageId; i++){
            changePage(1);
        }
    }
    else{
        for (let i=page; i>pageId; i--){
                changePage(-1);
        }
    }
    console.log(page);
}


function handleMouseOver() {
    if (!clickedMenu) {
      showApps();
    }
  }