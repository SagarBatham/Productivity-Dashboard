
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


function motivation_page(){
    var btnClick=document.querySelector(".motivation-page .clse")
    if(btnClick){
        btnClick.addEventListener("click",function(){
        motivation_page()
    })
    }
    
    var sum='';
    var quotes_add=document.querySelector(".motivation-page .mot-Contain .motiv")
    fetch("https://api.quotable.io/random")
        .then(function (response) {
            return response.json();   
        })
        .then(function (data) {
            sum=`<h3 class="heading">Today Quotes</h3>
                <p>"${data.content}"</p>
                <h3 class="auth">-${data.author}</h3>
                <div class="icon">
                <img src="img/quote-icon.png" alt=""></img>`
            quotes_add.innerHTML=sum;
        });


    
}
motivation_page();















