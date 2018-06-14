var shoppingList = document.getElementById("shoplist");
var addButton = document.getElementById("addbutton");
var hideButton = document.getElementById("hidebutton");
var unfinishedTasks = document.getElementById("unfinished-tasks");
var deleteButton = document.getElementById("deletebutton");

if (localStorage.getItem('buy_list')) loadPage()
else (localStorage.setItem('buy_list',''));

function addTask(e){
	e.preventDefault();
	var text = shoppingList.value.split(',');
	
	if (shoppingList.value){
		for (var i = 0; i<text.length; i++){
			newLi = document.createElement('li');
			newLi.innerHTML = text[i];
			unfinishedTasks.insertBefore(newLi, unfinishedTasks.children[0]);
		}
		shoppingList.value = '';
		save();
	}
};

//заюзаем делегирование
function doneIt(event){
	var target = event.target;
	target.classList.add('bought');
	var ul = target.parentNode;
	ul.appendChild(target);
	save();
}

function clearAll(){
	while(unfinishedTasks.children.length>0){
				unfinishedTasks.removeChild(unfinishedTasks.children[0]);
				}
	save()
};

function save(){
	var tasksArr = [],
			stateArr = [];
	
	for (var i = 0; i<unfinishedTasks.childElementCount; i++ ){
			tasksArr[i] = unfinishedTasks.children[i]
																	.innerHTML;
			if (unfinishedTasks.children[i].classList.contains('bought')) stateArr[i] = 1;
			else stateArr[i] = 0; 
	}
	localStorage.removeItem('buy_list');
	localStorage.setItem('buy_list', JSON.stringify({buyList:tasksArr,state:stateArr}))
}

function load(){
	return JSON.parse(localStorage.getItem('buy_list'));
}

//выгрузка из localStorage
function loadPage(){
	 var parsed = load();

	for (var i = 0; i<parsed.buyList.length; i++) {
		var listItem = document.createElement('LI');
		listItem.innerHTML = parsed.buyList[i];
		unfinishedTasks.appendChild(listItem);
		if (parsed.state[i] ==1 ) listItem.classList.add('bought');
	}
}
function hideArea(){
	if (shoppingList.classList.contains('hidden')) hideButton.innerHTML = 'Скрыть'
	else hideButton.innerHTML = 'Показать';
	shoppingList.classList.toggle('hidden');
}


addButton.addEventListener("click", addTask);
unfinishedTasks.addEventListener("click", doneIt);
deleteButton.addEventListener("click", clearAll);
hideButton.addEventListener("click", hideArea);
