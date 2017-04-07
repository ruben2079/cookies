'use strict';

var validateForm = validateForm || {};

validateForm.init = () => {
	let d = new Date(),
		year = d.getFullYear(),
		month = d.getMonth(),
		getDate = d.getDate(),
		getTime = d.getTime(),
		daySel = document.getElementById('day'),
		monthSel = document.getElementById('month'),
		yearSel = document.getElementById('year'),
		MonthName = ['January','February','March','April','May','June','July','August','September','October','November','December'];
	
	//Hide containers
	errorContainer.style.display = 'none';
	successContainer.style.display = 'none';
	
	//Generate dropdowns
	for(var i = year - 100; i < year; i++){
		let optionEl = document.createElement('option');
			optionEl.setAttribute('value',i);
			optionEl.text = i;
			yearSel.appendChild(optionEl);
	}
	
	for(var j = 0; j < MonthName.length; j++){
		let optionEl = document.createElement('option');
			optionEl.setAttribute('value',j+1);
			optionEl.text = MonthName[j];
			monthSel.appendChild(optionEl);
	}
	
	for(var k = 1; k < validateForm.daysInMonth(month,year); k++){
		let optionEl = document.createElement('option');
			optionEl.setAttribute('value',k);
			optionEl.text = k;
			daySel.appendChild(optionEl);
	}
	validateForm.checkCookie();
};
validateForm.checkCookie = () => {
	let checkAgeForm = document.getElementById('checkAge'),
		successContainer = document.getElementById('successContainer'),
		errorContainer = document.getElementById('errorContainer');
	
	if (document.cookie.indexOf('userage') > -1) {
		if(validateForm.checkAgeCookie()){
			checkAgeForm.style.display = 'none';
			successContainer.style.display = 'block';
			errorContainer.style.display = 'none';
		} else {
			checkAgeForm.style.display = 'none';
			successContainer.style.display = 'none';
			errorContainer.style.display = 'block';
		}
	}
};
validateForm.checkPersonAge = () =>  {
	
	let today = new Date(),
		daySel = document.getElementById('day'),
		monthSel = document.getElementById('month'),
		yearSel = document.getElementById('year'),
		daySelected = daySel.options[daySel.selectedIndex].value,
		monthSelected = monthSel.options[monthSel.selectedIndex].value,
		yearSelected = yearSel.options[yearSel.selectedIndex].value,
		dateString = yearSelected + "/" + monthSelected + "/" + daySelected;
		dateString.toString();
		
	let birthDate = new Date(dateString),
		age = today.getFullYear() - birthDate.getFullYear(),
		m = today.getMonth() - birthDate.getMonth(),
		
		checkAgeForm = document.getElementById('checkAge'),
		successContainer = document.getElementById('successContainer'),
		errorContainer = document.getElementById('errorContainer'),
		checkboxEl = document.getElementById('checkbox');
		
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if(age > 20){
		checkAgeForm.style.display = 'none';
		successContainer.style.display = 'block';
		errorContainer.style.display = 'none';
	} else {
		checkAgeForm.style.display = 'none';
		successContainer.style.display = 'none';
		errorContainer.style.display = 'block';
	}
	
	if(checkboxEl.checked){
		validateForm.setAgeCookie(age);
	}
};
validateForm.notLegalAge = () => {
	validateForm.setAgeCookie(0);
	location.reload();
};
validateForm.setAgeCookie = (age) => {
	document.cookie = "userage="+age+"";
};
validateForm.checkAgeCookie = () => {
	let getCookie = document.cookie,
		cookieArr =	getCookie.split(';'),
		getCookieValArr = cookieArr[0].split("="),
		getAge = parseInt(getCookieValArr[1]);
	
	if(!isNaN(getAge)){
		if(getAge > 20){
			return true;
		} else {
			return false;
		}
	}
};
validateForm.daysInMonth = (month,year) => {
	return new Date(year, month, 0).getDate();
};

//init function
validateForm.init();