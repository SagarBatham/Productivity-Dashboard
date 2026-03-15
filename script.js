var form = document.querySelector(".todo-page .taskcontainer .taskadd form ");
var txtinput = document.querySelector(".todo-page .taskcontainer .taskadd form input");
var txtarea = document.querySelector(".todo-page .taskcontainer .taskadd form textarea");
var checkbx = document.querySelector("#tick input");
let alltask = document.querySelector(".todo-page .taskcontainer .tasklist");
var imptask = document.querySelector(".imp h4");
var subButton=document.querySelector(".todo-page .taskcontainer .tasklist .tasks button");
subButton.addEventListener("click",function(){
    console.log("Helloo");
    
})


//Basic Opening Features
function openFeatures() {
    let allelem = document.querySelectorAll(".elem");
    let fullelems = document.querySelectorAll(".fullelem");

    allelem.forEach(function (elem) {
        elem.addEventListener("click", function () {
            fullelems[elem.id].style.display = "block";
        });
    });

    let btnelem = document.querySelectorAll(".clse");
    btnelem.forEach(function (button) {
        button.addEventListener("click", function () {
            allelem.forEach(function (elem) {
                fullelems[elem.id].style.display = "none";
            })
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
    currtask.forEach(function (ele) {
        taskadd += `<div class="tasks">
                        <h3>${ele.task}</h3>
                        <div id="imp" class="${ele.impo}">
                            Imp
                        </div>
                        <button>Mark as Completed</button>
                    </div>`
    })
    alltask.innerHTML = taskadd;
    txtinput.value = '';
    txtarea.value = '';
    checkbx.checked = false;
}
renderTask();


form.addEventListener("submit", function (evt) {
    evt.preventDefault();
    if(txtinput.value.trim()===""){
        alert("Enter a Valid Task")
        return;
    }
    currtask.push({ task: txtinput.value, details: txtarea.value, impo: checkbx.checked });
    localStorage.setItem("currtask", JSON.stringify(currtask));
    renderTask();
})






