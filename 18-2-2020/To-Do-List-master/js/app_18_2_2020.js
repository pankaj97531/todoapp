//https://www.youtube.com/watch?v=b8sUhU_eq3g
const clear = document.querySelector(".clear");

const dateElement = document.getElementById("date");

const list = document.getElementById("list");

const input = document.getElementById("input");

let listarr=[] , id=0;

//class names

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//show date

const options = {weekday : "long", month : "short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-us",options);

//add to functionality
function addTodo(todo,id,done,trash){
	if(trash){
		return;
	}
	const DONE = done ? CHECK : UNCHECK;
	const LINE = done ? LINE_THROUGH : "";
	const item = `
		<li class="item">
						<i class="fa ${DONE} co" job="complete" id="${id}"></i>
						<p class="text ${LINE}">${todo}</p>
						<i class="fa fa-trash-o de" job="delete" id="${id}"></i>
					</li>
	`;
	const position = "beforeend";
	list.insertAdjacentHTML(position,item);
	
}

document.addEventListener("keyup",function(event){
	var inputvalue = input.value;
	if(event.keyCode==13){
		if(inputvalue){
			addTodo(inputvalue,id,false,false);	
			listarr.push({
				name : inputvalue,
				id : id,
				done : false,
				trash : false
			})
		id= id+1;			
		}
		input.value = "";
	}
})

function completeToDo(element){
	element.classList.toggle(CHECK);
	element.classList.toggle(UNCHECK);
	element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
	listarr[element.id].done = listarr[element.id].done ? false : true; 
}
function removeToDo(element){
	element.parentNode.parentNode.removeChild(element.parentNode);
	listarr[element.id].trash = true; 
}
list.addEventListener("click",function(event){
	const element = event.target;
	const elementJob = element.attributes.job.value;
	if(elementJob=="complete"){
		completeToDo(element);
	}else if(elementJob=="delete"){
		removeToDo(element)
	}
})