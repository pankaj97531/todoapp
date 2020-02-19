//https://www.youtube.com/watch?v=b8sUhU_eq3g
//select elements
const clear = document.querySelector('.clear');
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//class name
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";
let listArr, id;

let localData = localStorage.getItem("TODO");

if(localData){
	listArr = JSON.parse(localData);
	loadList(listArr);
	id = listArr.length;
}else{
	listArr = [];
	id=0;
}
function loadList(array){
	array.forEach(function(ele){
		addTodo(ele.name,ele.id,ele.job,ele.trash);
	})
}
//show the date
const options = { weekday : "long", month:"short", day:"numeric" };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-us",options);
//add to do
function addTodo(todo,id,done,trash){
	if(trash){ return ;}
	let donejob = done ? CHECK : UNCHECK;
	let bokenline = done ? LINE_THROUGH : "";
	let idExists = listArr.filter((ele)=> ele.id==id);	
	let listElement = `
	<li class="item">
				<i class="fa ${donejob} co" job="complete" id=${id}></i>
				<p class="text ${bokenline}">${todo}</p>
				<i class="fa fa-trash de" job="delete" id=${id}></i>
				</li>
	`;
	if(idExists==false){
	listArr.push({
		id : id,
		name : todo,
		job : done,
		trash : trash
	});
	localStorage.setItem("TODO",JSON.stringify(listArr));			
		
	}
let position = "beforeend";
	list.insertAdjacentHTML(position,listElement);

}
function deleteElement(element){
//	element.parentNode.style.display = "none";
	element.parentNode.parentNode.removeChild(element.parentNode);
	listArr[element.id].trash = true;
localStorage.setItem("TODO",JSON.stringify(listArr));	
}
list.addEventListener("click",function(e){
	var getElement = e.target;
	let elementType = getElement.attributes.job ? getElement.attributes.job.value : "";
	if(elementType=='complete'){
		taskComplete(e.target);
	}
	if(elementType=='delete'){
		deleteElement(e.target);
	}	
})

document.addEventListener("keyup",function(e){
	let inputvalue= input.value;
	console.log();	
	if(e.keyCode==13){
	if(inputvalue){
		addTodo(inputvalue,id,false,false);
	}
	input.value="";	
	id=id+1;
	}
})

function taskComplete(element){
	element.classList.toggle(CHECK);
	element.classList.toggle(UNCHECK);
	element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
	listArr[element.id].job = listArr[element.id].job ? false : true;
localStorage.setItem("TODO",JSON.stringify(listArr));	
}
clear.addEventListener('click',function(){
	listArr = [];
	list.innerHTML = "";
	localStorage.clear();
})