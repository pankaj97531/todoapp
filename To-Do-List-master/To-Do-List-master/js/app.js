//https://www.youtube.com/watch?v=b8sUhU_eq3g
const clearElement = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const listElement = document.getElementById("list");
const inputElement = document.getElementById("input");

let today = new Date();

let options = {weekday : "long", month:"short", day:"numeric" }
dateElement.innerHTML = today.toLocaleDateString("en-us",options);
  
//define constant
const CHECK="fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINETHROUGH = "lineThrough";

let listArr, id;
let localData = localStorage.getItem("ToDoItem");

if(localData){
	listArr = JSON.parse(localData);
	id=listArr.length;
	loadTodoList(listArr);
}else{
	listArr=[];
	id=0;
}
function loadTodoList(arr){
	arr.forEach(function(ele){
		addTodo(ele.name,ele.id,ele.done,ele.trash);
	})
}
clearElement.addEventListener('click',function(){
	localStorage.clear();
	listElement.innerHTML="";
});

function addTodo(todotext,id,done,trash){
	if(trash){return;}
	let doneTask = done ? CHECK : UNCHECK;
	let breakLine = done ? LINETHROUGH : "";
	let addElement = `<li class="item">
					<i class="fa ${doneTask} co" job="complete" id=${id}></i> 
					<p class="text ${breakLine}">${todotext}</p>
					<i class="fa fa-trash de" job="delete" id=${id}></i>
				</li>`;
	let position = "beforeend";
	listElement.insertAdjacentHTML(position,addElement);	
}
document.addEventListener("keyup",function(e){
	let inputVlaue = inputElement.value;
	if(e.keyCode==13){
		if(inputVlaue){
			addTodo(inputVlaue,id,false,false);
		}
		inputElement.value="";
		
		listArr.push({
			name : inputVlaue,
			id: id,
			done : false,
			trash : false
		});
		localStorage.setItem("ToDoItem",JSON.stringify(listArr));
		id=id+1;
	}
});
function taskDone(ele){
	ele.parentNode.querySelector(".text").classList.toggle(LINETHROUGH);
	ele.classList.toggle(CHECK);
	ele.classList.toggle(UNCHECK);
	listArr[ele.id].done = true;
	localStorage.setItem("ToDoItem",JSON.stringify(listArr));
}
function taskDelete(ele){
	ele.parentNode.parentNode.removeChild(ele.parentNode);
	listArr[ele.id].trash = true;
	localStorage.setItem("ToDoItem",JSON.stringify(listArr));
}

list.addEventListener('click',function(e){
	let getElement = e.target;
	let actionElement = getElement.attributes.job ? getElement.attributes.job.value : "";
		if(actionElement=='complete'){
			taskDone(getElement);
		}
		if(actionElement=='delete'){
			taskDelete(getElement);
		}
});
