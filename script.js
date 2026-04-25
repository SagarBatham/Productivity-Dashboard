function toDoList() {
    var form     = document.querySelector(".todo-page .taskcontainer .taskadd form");
    var txtinput = document.querySelector(".todo-page .taskcontainer .taskadd form input[type='text']");
    var txtarea  = document.querySelector(".todo-page .taskcontainer .taskadd form textarea");
    var checkbx  = document.querySelector("#tick input");
    var alltask  = document.querySelector(".todo-page .taskcontainer .tasklist .tasklist-inner");

    function openFeatures() {
        var allelem   = document.querySelectorAll(".elem");
        var fullelems = document.querySelectorAll(".fullelem");

        allelem.forEach(function (elem) {
            elem.addEventListener("click", function () {
                fullelems[elem.id].style.display = "block";
                localStorage.setItem("activePage", elem.id);
            });
        });

        var savedPage = localStorage.getItem("activePage");
        if (savedPage != null) {
            fullelems[savedPage].style.display = "block";
        }

        var btnelem = document.querySelectorAll(".clse");
        btnelem.forEach(function (button) {
            button.addEventListener("click", function () {
                allelem.forEach(function (elem) {
                    fullelems[elem.id].style.display = "none";
                });
                localStorage.removeItem("activePage");
            });
        });
    }
    openFeatures();

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
                            <div id="imp" class="${ele.impo}">IMP</div>
                            <button id="${idx}">✓ Done</button>
                        </div>`;
        });
        alltask.innerHTML = taskadd;
        txtinput.value  = '';
        txtarea.value   = '';
        checkbx.checked = false;

        document.querySelectorAll(".tasks button").forEach(function (btn) {
            btn.addEventListener("click", function () {
                currtask.splice(btn.id, 1);
                localStorage.setItem("currtask", JSON.stringify(currtask));
                renderTask();
            });
        });
    }
    renderTask();

    form.addEventListener("submit", function (evt) {
        evt.preventDefault();
        if (txtinput.value.trim() === "") {
            alert("Enter a valid task name.");
            return;
        }
        currtask.push({ task: txtinput.value, details: txtarea.value, impo: checkbx.checked });
        localStorage.setItem("currtask", JSON.stringify(currtask));
        renderTask();
    });
}
toDoList();


function dailyPlanner() {
    var timeTable = document.querySelector(".day-planner");
    var timeEver  = Array.from({ length: 18 }, function (ele, idx) {
        return `${6 + idx}:00 – ${7 + idx}:00`;
    });

    var dailyTask = {};
    var refTask   = JSON.parse(localStorage.getItem("dailyTask")) || {};

    var totalDaytime = '';
    timeEver.forEach(function (ele, idx) {
        totalDaytime += `<div class="day-planner-time">
                            <p>${ele}</p>
                            <input type="text" placeholder="What's planned…" id="${idx}" value="${refTask[idx] || ''}">
                         </div>`;
    });
    timeTable.innerHTML = totalDaytime;

    document.querySelectorAll(".dailyplanner-page .day-planner .day-planner-time input").forEach(function (ele) {
        ele.addEventListener("input", function () {
            dailyTask[ele.id] = ele.value;
            localStorage.setItem("dailyTask", JSON.stringify(dailyTask));
        });
    });
}
dailyPlanner();


function motivation_page() {
    var btnClick = document.querySelector(".motivation-page .clse");
    if (btnClick) {
        btnClick.addEventListener("click", function () {
            motivation_page();
        });
    }

    var quotes_add = document.querySelector(".motivation-page .mot-Contain .motiv");
    fetch("https://dummyjson.com/quotes/random")
        .then(function (response) { return response.json(); })
        .then(function (data) {
            quotes_add.innerHTML = `
                <h3 class="heading">✦ Quote of the Moment</h3>
                <p>"${data.quote}"</p>
                <h3 class="auth">— ${data.author}</h3>
            `;
        })
        .catch(function () {
            quotes_add.innerHTML = `<p style="color:rgba(255,255,255,.7)">Could not load quote. Check your connection.</p>`;
        });
}
motivation_page();


function pomodoro_page() {
    var timer        = document.querySelector(".pomodoro-page .time");
    var session      = document.querySelector(".pomodoro-page .timer .session");
    var startbtn     = document.querySelector(".start-button");
    var pausebtn     = document.querySelector(".pause-button");
    var resetbtn     = document.querySelector(".reset-button");

    var totalSeconds  = 25 * 60;
    var timeInterval  = null;
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
                    totalSeconds  = 5 * 60;
                    updateTime();
                    session.innerHTML = "🎉 Take a Break!";
                    session.style.background = "#EF4444";
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
                    totalSeconds  = 25 * 60;
                    updateTime();
                    session.innerHTML = "Work Session";
                    session.style.background = "var(--accent)";
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
        timeInterval  = null;
        totalSeconds  = 25 * 60;
        isWorkSession = true;
        session.innerHTML = "Work Session";
        session.style.background = "var(--accent)";
        updateTime();
    }

    startbtn.addEventListener("click", start_timer);
    pausebtn.addEventListener("click", pause_timer);
    resetbtn.addEventListener("click", reset_timer);

    updateTime();
}
pomodoro_page();


function main_page() {
    var dateSet   = document.querySelector(".header1 .date-main");
    var dateMonth = document.querySelector(".header1 .date-sub");
    var temp      = document.querySelector("#temp");
    var Cond      = document.querySelector("#cond");
    var w0        = document.querySelector("#w0");
    var w1        = document.querySelector("#w1");
    var w2        = document.querySelector("#w2");

    var apiKey = "8a94a1ac092145a290f133905262203";
    var city = "Noida"
    async function weather_API() {
        try {
            var response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
            var data     = await response.json();
            temp.innerHTML = `${data.current.temp_c} °C`;
            Cond.innerHTML = data.current.condition.text;
            w0.innerHTML   = `<i class='ri-temp-hot-line'></i> HeatIndex: ${data.current.heatindex_c ?? '--'}`;
            w1.innerHTML   = `<i class='ri-drop-line'></i> Humidity: ${data.current.humidity}%`;
            w2.innerHTML   = `<i class='ri-windy-line'></i> Wind: ${data.current.wind_kph} km/hr`;
        } catch (e) {
            Cond.innerHTML = "Weather unavailable";
        }
    }

    var months  = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var weekDay = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    function get_date() {
        var date    = new Date();
        var hours   = date.getHours();
        var ampm    = hours >= 12 ? "PM" : "AM";
        var currDate  = date.getDate();
        var currMonth = months[date.getMonth()];
        var currYear  = date.getFullYear();

        dateMonth.innerHTML = `${currDate} ${currMonth} ${currYear}`;

        hours = hours % 12 || 12;
        var minutes = String(date.getMinutes()).padStart(2, "0");
        var seconds = String(date.getSeconds()).padStart(2, "0");
        dateSet.innerHTML = `${weekDay[date.getDay()]}, ${String(hours).padStart(2,"0")}:${minutes}:${seconds} ${ampm}`;
    }

    weather_API();
    get_date();
    setInterval(() => { get_date(); }, 1000);
    setInterval(() => { weather_API(); }, 60000);
}
main_page();


function dailyGoals() {
    const input   = document.getElementById("goal-input");
    const addBtn  = document.getElementById("add-goal");
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
        goals.push({ text: input.value.trim(), done: false });
        localStorage.setItem("goals", JSON.stringify(goals));
        input.value = "";
        renderGoals();
    });

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") addBtn.click();
    });

    renderGoals();
}
dailyGoals();


const themeBtn = document.querySelector(".theme-toggle");
let darkMode   = false;

themeBtn.addEventListener("click", () => {
    darkMode = !darkMode;
    document.body.classList.toggle("dark", darkMode);

    if (darkMode) {
        document.documentElement.style.setProperty("--m", "#0F172A");
        document.documentElement.style.setProperty("--pri", "#1E293B");
        document.documentElement.style.setProperty("--ter1", "#111827");
        document.documentElement.style.setProperty("--ter2", "#1F2937");
        document.documentElement.style.setProperty("--ter3", "#22C55E");
        document.documentElement.style.setProperty("--text-main", "#F1F5F9");
        themeBtn.querySelector("i").className = "ri-moon-line";
    } else {
        document.documentElement.style.setProperty("--m", "#F0F2FF");
        document.documentElement.style.setProperty("--pri", "#4F46E5");
        document.documentElement.style.setProperty("--ter1", "#E8EBFF");
        document.documentElement.style.setProperty("--ter2", "#FFFFFF");
        document.documentElement.style.setProperty("--ter3", "#22C55E");
        document.documentElement.style.setProperty("--text-main", "#1F2937");
        themeBtn.querySelector("i").className = "ri-sun-line";
    }
});
