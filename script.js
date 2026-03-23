
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
dailyPlanner();


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


function pomodoro_page() {
    var timer = document.querySelector(".pomodoro-page .time");
    var totalSeconds = 25 * 60;

    var startbtn = document.querySelector(".start-button");
    var pausebtn = document.querySelector(".pause-button");
    var resetbtn = document.querySelector(".reset-button");
    var session = document.querySelector(".pomodoro-page .timer .session")

    var timeInterval = null;
    var isWorkSession = true;

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
                    timer.innerHTML = "05:00"
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

pomodoro_page();


function main_page() {
    var dateSet = document.querySelector(".header1 h1");
    var dateMonth = document.querySelector(".header1 h2");
    var temp = document.querySelector(".header2 h2");
    var Cond = document.querySelector(".header2 h4");
    var other = document.querySelectorAll(".header2 h3")


    var apiKey = "8a94a1ac092145a290f133905262203";
    var city = "Noida"
    async function weather_API() {
        var response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
        var data = await response.json();
        var currtemp = data.current.temp_c;
        var currCond = data.current.condition.text
        var currHeat = data.current.heatindex_c
        var humid = data.current.humidity;
        var windspeed = data.current.wind_kph
        temp.innerHTML = `${currtemp} °C`
        Cond.innerHTML = `${currCond}`
        other[0].innerHTML = `HeatIndex: ${currHeat}`
        other[1].innerHTML = `Humidity: ${humid}`
        other[2].innerHTML = `Wind: ${windspeed} km/hr`
    }

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    var date = null;
    function get_date() {
        date = new Date();
        let hours = date.getHours();
        let ampm = hours >= 12 ? "PM" : "AM";
        let currDate = date.getDate();
        let currMonth = months[date.getMonth()];
        let currYear = date.getFullYear();

        dateMonth.innerHTML = `${currDate} ${currMonth} ${currYear}`


        hours = hours % 12 || 12;

        let minutes = String(date.getMinutes()).padStart(2, "0");
        let seconds = String(date.getSeconds()).padStart(2, "0");

        dateSet.innerHTML = `${weekDay[date.getDay()]}, ${String(hours).padStart(2, "0")}:${minutes}:${seconds} ${ampm}`;
    }
    setInterval(() => {
        weather_API();
        get_date();
    }, 1000)
}

main_page();

function dailyGoals() {
    const input = document.getElementById("goal-input");
    const addBtn = document.getElementById("add-goal");
    const goalList = document.querySelector(".goal-list");

    let goals = JSON.parse(localStorage.getItem("goals")) || [];

    function renderGoals() {
        goalList.innerHTML = "";

        goals.forEach((goal, index) => {
            goalList.innerHTML += `
                <div class="goal-item">
                    <input class="chkbox" type="checkbox" ${goal.done ? "checked" : ""} data-id="${index}">
                    <p class="${goal.done ? "done" : ""}">${goal.text}</p>
                    <button data-del="${index}">❌</button>
                </div>
            `;
        });

        document.querySelectorAll(".goal-item input").forEach(cb => {
            cb.addEventListener("change", function () {
                goals[this.dataset.id].done = this.checked;
                localStorage.setItem("goals", JSON.stringify(goals));
                renderGoals();
            });
        });

        document.querySelectorAll(".goal-item button").forEach(btn => {
            btn.addEventListener("click", function () {
                goals.splice(this.dataset.del, 1);
                localStorage.setItem("goals", JSON.stringify(goals));
                renderGoals();
            });
        });
    }

    addBtn.addEventListener("click", () => {
        if (input.value.trim() === "") return;
        goals.push({ text: input.value, done: false });
        localStorage.setItem("goals", JSON.stringify(goals));
        input.value = "";
        renderGoals();
    });

    renderGoals();
}

dailyGoals();

const themeBtn = document.querySelector(".dash i");

let darkMode = false;

themeBtn.addEventListener("click", () => {
    darkMode = !darkMode;

    if (darkMode) {
        document.documentElement.style.setProperty("--m", "#0F172A");
        document.documentElement.style.setProperty("--pri", "#1E293B");
        document.documentElement.style.setProperty("--ter1", "#111827");
        document.documentElement.style.setProperty("--ter2", "#1F2937");
        document.documentElement.style.setProperty("--ter3", "#22C55E");


        document.documentElement.style.setProperty("--text-main", "#FFFFFF");

        themeBtn.classList.remove("ri-sun-line");
        themeBtn.classList.add("ri-moon-line");

    } else {

        document.documentElement.style.setProperty("--m", "#F5F7FB");
        document.documentElement.style.setProperty("--pri", "#4F46E5");
        document.documentElement.style.setProperty("--ter1", "#EEF2FF");
        document.documentElement.style.setProperty("--ter2", "#FFFFFF");
        document.documentElement.style.setProperty("--ter3", "#22C55E");

        document.documentElement.style.setProperty("--text-main", "#1F2937");

        themeBtn.classList.remove("ri-moon-line");
        themeBtn.classList.add("ri-sun-line");
    }
});