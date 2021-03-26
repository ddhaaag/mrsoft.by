const resultDiv = document.querySelector('#result');
const btnSearchByLength =  document.querySelector('.btnByLength');
const btnSearchByString =  document.querySelector('.btnByString');
let dataFromServer = {};

// получение json
let request = new XMLHttpRequest();

request.open('GET', 'data.json');
request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

request.send();

request.addEventListener('readystatechange', function() {
	if (request.readyState === 4 && request.status == 200) {
		dataFromServer = JSON.parse(request.response);
		dataFromServer = dataFromServer['data'];

	} else {
        dataFromServer = 'Что-то пошло не так!';
    }
})


// получение данных инпут и чекбокс
function getForm(){
	let form = {};
	form.input = document.getElementById('search').value;
	form.checkbox = document.getElementById('check').checked;
	return form;
}

// проверка на пустоту
function inputIsNull(form){
	
	if(!form['input'] || form['input'].length === 0){
		resultDiv.innerHTML = ' строка поиска не должна быть пустой ';
		return true;
	}
	return false;
}

// проверка на число 
function inputIsNumber(form){
	let number = Number(form['input']);
	if(!isNaN(number) && /\S/.test(form['input'])){
		return number;
	}
	return false;
}

// поиск по длине
function searchByLength(e){
    e.preventDefault();
	let form = getForm();

	if (inputIsNull(form)) {
		return;
	}
	
	number = inputIsNumber(form)
	if(number !== false){
		let result = '';
		for (let key in dataFromServer){
			if(number < dataFromServer[key].length){
				result += dataFromServer[key]+'<br>';
			} 
		}
		resultDiv.innerHTML = result  || 'такой длинной строки нет';
	} else {
		resultDiv.innerHTML = ' нельзя искать длину по подстроке<br> попробуйте соседнюю кнопку ';	
	};
}

// поиск по подстроке
function searchBySubstring(e){
    e.preventDefault();
	let form = getForm();

	if (inputIsNull(form)) {
		return;
	}
	
	substr = form['input'];
	let result = '';
	if (form['checkbox']) {
		for (let key in dataFromServer){
			if(dataFromServer[key].indexOf(substr) >= 0){
				result += dataFromServer[key]+'<br>';
			} 
		}
	} else {
		for (let key in dataFromServer){
			if(dataFromServer[key].toUpperCase().indexOf(substr.toUpperCase()) >= 0){
				result += dataFromServer[key]+'<br>';
			} 
		}
	}
	resultDiv.innerHTML = result || 'такой подстроки не найдено';

}

btnSearchByLength.addEventListener('click', searchByLength)
btnSearchByString.addEventListener('click', searchBySubstring)
