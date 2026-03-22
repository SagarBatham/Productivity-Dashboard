
function toDoList() {
    var form = document.querySelector(".todo-page .taskcontainer .taskadd form ");
    var txtinput = document.querySelector(".todo-page .taskcontainer .taskadd form input");
    var txtarea = document.querySelector(".todo-page .taskcontainer .taskadd form textarea");
    var checkbx = document.querySelector("#tick input");
    let alltask = document.querySelector(".todo-page .taskcontainer .tasklist");
    var imptask = document.querySelector(".imp h4");




    //Basic Opening Features
    function openFeatures() {
        let allelem = document.querySelectorAll(".elem");
        let fullelems = document.querySelectorAll(".fullelem");

        allelem.forEach(function (elem) {
            elem.addEventListener("click", function () {
                fullelems[elem.id].style.display = "block";
                localStorage.setItem("activePage", elem.id);

            });
        });

        let savedPage = localStorage.getItem("activePage");

        if (savedPage != null) {
            let fullelems = document.querySelectorAll(".fullelem");
            fullelems[savedPage].style.display = "block";
        }

        let btnelem = document.querySelectorAll(".clse");
        btnelem.forEach(function (button) {
            button.addEventListener("click", function () {
                allelem.forEach(function (elem) {
                    fullelems[elem.id].style.display = "none";
                })
                localStorage.removeItem("activePage");
            })
        })
    }
    openFeatures();
    //Render Tasks after Submitting in To-Do List


    var currtask = [];
    if (localStorage.getItem("currtask")) {
        currtask = JSON.parse(localStorage.getItem("currtask"));
    } else {
        localStorage.setItem("currtask", JSON.stringify(currtask));

    }

    function renderTask() {
        var taskadd = '';
        currtask.forEach(function (ele, idx) {
            taskadd += `<div class="tasks">
                        <h3>${ele.task}</h3>
                        <div id="imp" class="${ele.impo}">
                            Imp
                        </div>
                        <button id="${idx}">Mark as Completed</button>
                    </div>`
        })
        alltask.innerHTML = taskadd;
        txtinput.value = '';
        txtarea.value = '';
        checkbx.checked = false;

        var btnSub = document.querySelectorAll(".tasks button");
        btnSub.forEach(function (btn) {
            btn.addEventListener("click", function () {
                currtask.splice(btn.id, 1);
                localStorage.setItem("currtask", JSON.stringify(currtask));
                renderTask();
            })
        })
    }
    renderTask();



    form.addEventListener("submit", function (evt) {
        evt.preventDefault();
        if (txtinput.value.trim() === "") {
            alert("Enter a Valid Task")
            return;
        }
        currtask.push({ task: txtinput.value, details: txtarea.value, impo: checkbx.checked });
        localStorage.setItem("currtask", JSON.stringify(currtask));
        renderTask();
    })

}
toDoList();


function dailyPlanner() {
    var timeTable = document.querySelector(".day-planner");
    var timeEver = Array.from({ length: 18 }, function (ele, idx) {
        return `${6 + idx}:00 - ${7 + idx}:00 `
    })

    var dailyTask = {};



    var totalDaytime = '';

    var refTask = JSON.parse(localStorage.getItem("dailyTask")) || {};

    timeEver.forEach(function (ele, idx) {
        totalDaytime = totalDaytime + `<div class="day-planner-time">
                    <p>${ele}</p>
                    <input type="text" placeholder="..." id="${idx}" value="${refTask[idx] || ""}">
                </div>`
    })

    timeTable.innerHTML = totalDaytime;


    var timeDetail = document.querySelectorAll(".dailyplanner-page .day-planner .day-planner-time input");

    timeDetail.forEach(function (ele) {
        ele.addEventListener("input", function () {
            dailyTask[ele.id] = ele.value;

            localStorage.setItem("dailyTask", JSON.stringify(dailyTask))
        })
    })
}
dailyPlanner()


function motivation_page() {
    var btnClick = document.querySelector(".motivation-page .clse")
    if (btnClick) {
        btnClick.addEventListener("click", function () {
            motivation_page()
        })
    }

    var sum = '';
    var quotes_add = document.querySelector(".motivation-page .mot-Contain .motiv")
    fetch("https://api.quotable.io/random")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            sum = `<h3 class="heading">Today Quotes</h3>
                <p>"${data.content}"</p>
                <h3 class="auth">-${data.author}</h3>
                <div class="icon">
                <img src="img/quote-icon.png" alt=""></img>`
            quotes_add.innerHTML = sum;
        });



}
motivation_page();


function pomodoro_page(){
    var timer = document.querySelector(".pomodoro-page .time");
var totalSeconds = 25 * 60;

var startbtn = document.querySelector(".start-button");
var pausebtn = document.querySelector(".pause-button");
var resetbtn = document.querySelector(".reset-button");
var session = document.querySelector(".pomodoro-page .timer .session")

var timeInterval = null;
var isWorkSession=true;

function updateTime() {
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = totalSeconds % 60;

    timer.innerHTML = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function start_timer() {
    if (timeInterval) return;

    if (isWorkSession) {
        totalSeconds = 25 * 60;

        timeInterval = setInterval(() => {
            if (totalSeconds > 0) {
                totalSeconds--;
                updateTime();

            } else {
                isWorkSession = false;
                totalSeconds = 5 * 60; 
                updateTime();
                timer.innerHTML="05:00"      
                session.innerHTML = "Let's Take a Break"; 
                session.style.backgroundColor = "#ee0c0c";

                clearInterval(timeInterval);
                timeInterval = null; 
            }

        }, 1000); 
    } else {
        totalSeconds = 5 * 60;

        timeInterval = setInterval(() => {
            if (totalSeconds > 0) {
                totalSeconds--;
                updateTime();

            } else {
                isWorkSession = true;
                totalSeconds = 25 * 60; 
                updateTime();           
                session.innerHTML = "Work Session";
                session.style.backgroundColor = "rgb(16, 236, 0)";

                clearInterval(timeInterval);
                timeInterval = null; 
            }

        }, 1000); 
    }
}

function pause_timer() {
    clearInterval(timeInterval);
    timeInterval = null;
}

function reset_timer() {
    clearInterval(timeInterval);
    timeInterval = null;
    totalSeconds = 25 * 60;
    updateTime();
}

startbtn.addEventListener("click", start_timer);
pausebtn.addEventListener("click", pause_timer);
resetbtn.addEventListener("click", reset_timer);

updateTime();
}

pomodoro_page()

var dateSet=document.querySelector(".header1 h1")
var apiKey="8a94a1ac092145a290f133905262203";
var city="Noida"
async function  weather_API(){
    var response= await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
    
    var data=await response.json();    
}
weather_API()

var weekDay=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
var date=null;
function get_date(){
    setInterval(() => {
         date=new Date();
    dateSet.innerHTML=`${weekDay[date.getDay()]}, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} pm`
    }, 1000);
       
    
    
    console.log();
    console.log();
        console.log();

}
get_date()















