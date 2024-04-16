function validatealphabetic(key) {

	var keycode = (key.which) ? key.which : key.keyCode;
	if ((keycode > 64 && keycode < 91) || (keycode > 96 && keycode < 123)
			|| keycode == 32 || keycode == 8 || keycode == 9 || keycode == 127
			|| keycode == 13 || (keycode > 34 && keycode < 40) || keycode == 46) {
		return true;
	} else {
		alert("Please Enter Alphabets only");
		return false;
	}
};

function validateOnlyName(key) {

	var keycode = (key.which) ? key.which : key.keyCode;
	if ((keycode > 64 && keycode < 91) || (keycode > 96 && keycode < 123)
			|| keycode == 8 || keycode == 9 || keycode == 127 || keycode == 13
			|| (keycode > 34 && keycode < 41) || keycode == 32) {
		return true;
	} else {
		alert("Please Enter Alphabets Only!");
		return false;
	}

}

function validateNumbers(key) {
	//alert(key.keyCode);
	var keycode = (key.which) ? key.which : key.keyCode;
	if ((keycode > 47 && keycode < 58) || (keycode > 95 && keycode < 106) || keycode == 8 || keycode == 9
			|| keycode == 127 || keycode == 13 || keycode == 27 || keycode == 46 ) {

		return true;
	} else {
		alert("Please Enter Numbers Only!");
		return false;
	}
}

function validatePrice(key) {
	//alert(key.keyCode);
	var keycode = (key.which) ? key.which : key.keyCode;
	if ((keycode > 47 && keycode < 58) || keycode == 8 || keycode == 9
			|| keycode == 127 || keycode == 13 || keycode == 46
			|| (keycode > 34 && keycode < 41)) {

		return true;
	} else {
		alert("Please Enter Numbers Only!");
		return false;
	}
};

function validatePassportVisaNo(key) {
	var keycode = (key.which) ? key.which : key.keyCode;
	if ((keycode > 47 && keycode < 58) || (keycode > 64 && keycode < 91)
			|| (keycode > 96 && keycode < 123) || keycode == 8 || keycode == 9
			|| keycode == 127 || keycode == 13 || keycode == 46
			|| (keycode > 34 && keycode < 41)) {

		return true;
	} else {
		alert("Please Enter Alphabets And Numbers Only!");
		return false;
	}
};

// function to check special characters(~)
function validateComma(key) {
	var keycode = (key.which) ? key.which : key.keyCode;
	if (!(keycode == 126) && !(keycode == 64)) {

		return true;
	} else {
		alert("Entered key is not allowed.");
		return false;
	}
};

/*
 * function checkEmail(emailId) {
 * 
 * 
 * var email = $("#email").val(); var reg =
 * /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/; if (email != "" &&
 * reg.test(email) == false) { alert('Please Provide a Valid Email Address!');
 * email.focus; return false; } };
 */

function ValidateEmail() {
	var inputText = $("#emailId").val() || $("#email").val();
	// alert(inputText);

	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (inputText != "") {
		if (inputText.match(mailformat)) {
			return true;
		} else {
			alert("You have entered an invalid email address!");
			return false;
		}
	}
};

function ValidateMlcInformerEmail() {

	var inputText = $("#mlcInformerEmail").val();

	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (inputText != "") {
		if (inputText.match(mailformat)) {
			return true;
		} else {
			alert("You have entered an invalid email address!");
			return false;
		}
	}
}

function ValidateInsuredEmail() {
	var inputText = $("#insuredEmail").val();

	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (inputText != "") {
		if (inputText.match(mailformat)) {
			return true;
		} else {
			alert("You have entered an invalid email address!");
			return false;
		}
	}

}

function ValidateRelativeEmail() {
	var inputText = $("#relativeEmail").val();

	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (inputText != "") {
		if (inputText.match(mailformat)) {
			return true;
		} else {
			alert("You have entered an invalid email address!");
			return false;
		}
	}

}

function ValidateErInformerEmail() {
	var inputText = $("#erInformerEmail").val();

	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (inputText != "") {
		if (inputText.match(mailformat)) {
			return true;
		} else {
			alert("You have entered an invalid email address!");
			return false;
		}
	}
}

function ValidateAllEmail(inputTextID) {
	var inputText = $("#" + inputTextID).val();
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (inputText != "") {
		if (inputText.match(mailformat)) {
			return true;
		} else {
			alert("You have entered an invalid email address!");
			$("#" + inputTextID).val("");
			$("#" + inputTextID).focus();
			return false;
		}
	}
}

function validateSelectBox(inputText, string) {

	if (inputText.indexOf("select") > -1 || inputText.indexOf("Select") > -1) {
		alert("Please select " + string + " ..!");
		return true;
	}
	return false;
}
function validateAlphaNumberic(key) {
	var keycode = (key.which) ? key.which : key.keyCode;

	if ((keycode > 64 && keycode < 91) || (keycode > 96 && keycode < 123)
			|| keycode == 8 || keycode == 9 || keycode == 46 || keycode == 13
			|| keycode == 8 || keycode == 9 || keycode == 127 || keycode == 13
			|| keycode == 27 || (keycode > 34 && keycode < 41)) {
		return true;
	} else if ((keycode > 47 && keycode <= 57) || (keycode > 34 && keycode < 43)
			|| keycode == 64 && keycode == 94) {
		alert("Please Enter Only Characters and Numbers..!");
		return false;
	}

}

function validateAlphaNumberic1(key) {
	var keycode = (key.which) ? key.which : key.keyCode;

	if ((keycode > 64 && keycode < 91) || (keycode > 96 && keycode < 123)
			|| keycode == 8 || (keycode > 47 && keycode <= 57) || keycode == 8
			|| keycode == 9 || keycode == 127 || keycode == 13 || keycode == 27) {
		return true;
	} else {
		alert("Please Enter Only Characters and Numbers..!");
		return false;
	}

}
/*
 * function checkNum(val) { // alert("hhh"); var inputText = $("#mobNo").val(); //
 * var re = /^[\@]*$/; '/[^A-Za-z0-9 !@#$%^&*().]/u var re =
 * /^[0-9\-~!@#$%^&*]+$/; // var re='/[^0-9 !@#$%^&*().]/u';
 * 
 * if (!(found = inputText.match(re))) { alert("Please Enter Valid Number");
 * return false; } else { //alert("yes"); return true; } }
 */
/*
 * $(document).ready(function() { $("#txtboxToFilter").keydown(function (e) { //
 * Allow: backspace, delete, tab, escape, enter and . if ($.inArray(e.keyCode,
 * [46, 8, 9, 27, 13, 110, 190]) !== -1 || // Allow: Ctrl+A (e.keyCode == 65 &&
 * e.ctrlKey === true) || // Allow: home, end, left, right (e.keyCode >= 35 &&
 * e.keyCode <= 39)) { // let it happen, don't do anything return; } // Ensure
 * that it is a number and stop the keypress if ((e.shiftKey || (e.keyCode < 48 ||
 * e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
 * e.preventDefault(); } }); });
 */
/*
 * jQuery.fn.ForceNumericOnly = function() { // alert("1"); return this
 * .each(function() { // alert("2"); $(this) .keydown( function(e) {
 * 
 * var key = e.charCode || e.keyCode || 0; // allow backspace, tab, delete,
 * arrows, // numbers and keypad numbers ONLY // home, end, period, and numpad
 * decimal return ( key == 8 || key == 9 //backspace,tab || key == 46 || key ==
 * 127//delete || key == 190//decimal || key == 16 //shift || (key >= 35 && key <=
 * 40)//up,down,home,end,right,left || (key >= 48 && key <= 57) || (key >= 96 &&
 * key <= 105));
 * 
 * 
 * 
 * 
 * });
 * 
 * }); };
 */

$(document)
		.ready(
				function() {
					// alert("hi");

					$("#mobNo")
							.keydown(
									function(e) {
										// alert("1");
										// Allow: backspace, delete, tab,
										// escape, enter and .
										if ($.inArray(e.keyCode, [ 46, 8, 9,
												27, 13, 190, 16 ]) !== -1
												||
												// Allow: Ctrl+A
												(e.keyCode == 65 && e.ctrlKey === true)
												||
												// Allow: home, end, left, right
												(e.keyCode >= 35 && e.keyCode <= 39)) {
											// let it happen, don't do anything
											return;
										}
										// Ensure that it is a number and stop
										// the keypress
										if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57))
												&& (e.keyCode < 96 || e.keyCode > 105)) {
											e.preventDefault();
										}
									});
				});
// };
function stringlength() {

	var field = $("#password").val();
	var mnlen = 6;
	var mxlen = 12;

	if (field.length < mnlen || field.length > mxlen) {
		alert("Password Should be In Between " + mnlen + " And " + mxlen
				+ " Characters!");
		$("#" + inputID).focus();
		return false;
	}

	return true;

};

/*
 * function isDateYYYYMMDD(txtDate) { var currVal = txtDate; if (currVal == '')
 * return false;
 * 
 * var rxDatePattern = /^(\d{4})(\/|-)(\d{1,2})(\/|-)(\d{1,2})$/; // Declare //
 * Regex var dtArray = currVal.match(rxDatePattern); // is format OK?
 * 
 * if (dtArray == null) return false; // Checks for mm/dd/yyyy format. dtMonth =
 * dtArray[3]; dtDay = dtArray[5]; dtYear = dtArray[1];
 * 
 * if (dtMonth < 1 || dtMonth > 12) return false; else if (dtDay < 1 || dtDay >
 * 31) return false; else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 ||
 * dtMonth == 11) && dtDay == 31) return false; else if (dtMonth == 2) { var
 * isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0)); if
 * (dtDay > 29 || (dtDay == 29 && !isleap)) return false; } return true; }
 * 
 */

function isFutureDate(idate) {
	// alert("4");
	var today = new Date().getTime(), idate = idate.split("-");
	// alert("5");

	idate = new Date(idate[0], idate[1] - 1, idate[2]).getTime();

	return (today - idate) < 0 ? true : false;
};

function checkDateLast() {

	// treatment Start date

	var treStart = $("#popup_container3").val();
	var tempDate = treStart.split("/");

	var addDate = new Date(tempDate[2], tempDate[1] - 1, tempDate[0]);

	var idate = document.getElementById("popup_container3");

	var temp = (idate.value).split("/");
	var currentDate = new Date(temp[0], temp[1] - 1, temp[2]);

	dateReg = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
	// alert("2f");
	if (dateReg.test(idate.value)) {
		// alert("3");
		if (isPrevDate(idate.value)) {
			// resultDiv.innerHTML = "Entered date is a future date";
			// resultDiv.style.color = "red";
			alert("Entered date is a Past date.");
			$("#date-pick").val("");
			return false;
		}
	}
};

function checkBirthDate(callfrom) {

	var dtDate = "";
	if (callfrom == 'dob') {
		dtDate = document.getElementById("dob").value;
	} else if (callfrom == 'mlc') {
		dtDate = document.getElementById("mlcDate").value;
	}

	var tempDate = dtDate.split("/");

	var addDate = new Date(tempDate[2], tempDate[1] - 1, tempDate[0]);
	var currentDate = new Date();

	if (addDate.getTime() > currentDate.getTime()) {
		if (callfrom == "dob") {
			alert("Please select BirthDate Before Today's Date !");
			$("#dob").val("");
			return false;
		} else if (callfrom == "mlc") {
			alert("Please select MLCDate Before Today's Date !");
			$("#mlcDate").val("");
			return false;
		}
	}

};

function checkFutureDate(callfrom) {
	var dtDate = "";
	if (callfrom == 'opd') {
		dtDate = document.getElementById("opdVisitDate").value;
	} else if (callfrom == 'surgaryAdvice') {
		dtDate = document.getElementById("adviceDate").value;
	} else if (callfrom == 'conductAnaesthesia') {
		dtDate = document.getElementById("date").value;
	} else if (callfrom == 'ot') {
		dtDate = document.getElementById("idTourDateDetails").value;
	}else if (callfrom == 'multipleConsDoc') {
		dtDate = document.getElementById("iDate").value;
	}

	var tempDate = dtDate.split("/");

	var addDate = new Date(tempDate[2], tempDate[1] - 1, tempDate[0]);
	var currentDate = new Date();
	currentDate.setHours(0, 0, 0, 0);

	var dd = currentDate.getDate();
	var mm = currentDate.getMonth() + 1; // January is 0!

	var yyyy = currentDate.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	}
	if (mm < 10) {
		mm = '0' + mm;
	}
	var today = dd + '/' + mm + '/' + yyyy;

	if (addDate.getTime() >= currentDate.getTime()) {
		return true;
	} else {
		if (callfrom == "opd") {
			alert("Please select Current date!");
			$("#opdVisitDate").val(today);
			return false;
		} else if (callfrom == "conductAnaesthesia") {
			alert("Please select Date as Today's Date or Future Date !");
			return false;
		} else if (callfrom == "ot") {
			alert("Please select Date as Today's Date or Future Date !");
			$("#idTourDateDetails").val(today);
			return false;
		} else if (callfrom == "surgaryAdvice") {
			alert("Please select Date as Today's Date or Future Date!");
			$("#adviceDate").val(today);
			return false;
		}else if (callfrom == "multipleConsDoc") {
			alert("Please select Date as Today's Date or Future Date!");
			return false;
		}
	}
};

function checkPrevCurrDate(callfrom) {
	var dtDate = "";
	if (callfrom == 'doctorDesk') {
		dtDate = document.getElementById("allergyDate").value;
	} else if (callfrom == 'surgaryAdvice') {
		dtDate = document.getElementById("adviceDate").value;
	} else if (callfrom == 'IPD_Billing') {
		dtDate = document.getElementById("popup_container2").value;
	} else if (callfrom == 'IPD_Bill_Discharge_Date') {
		dtDate = document.getElementById("dischargeDate").value;
	}

	var tempDate = dtDate.split("/");

	var addDate = new Date(tempDate[2], tempDate[1] - 1, tempDate[0]);
	var currentDate = new Date();
	currentDate.setHours(0, 0, 0, 0);

	var dd = currentDate.getDate();
	var mm = currentDate.getMonth() + 1; // January is 0!

	var yyyy = currentDate.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	}

	if (mm < 10) {
		mm = '0' + mm;
	}

	var today = dd + '/' + mm + '/' + yyyy;

	if (addDate.getTime() <= currentDate.getTime()) {
		if (callfrom == "IPD_Billing" || callfrom == "IPD_Bill_Discharge_Date") {
			var regdate = $("#tStartDate").html();
			var rdate = new Date(regdate); 
			rdate.setHours(0, 0, 0, 0);
			if (addDate.getTime() < rdate.getTime()) {
				alert("Date should not be before registration date!");
				if (callfrom == "IPD_Billing"){
					$("#popup_container2").val(today);
					return false;
				}else{
					$("#dischargeDate").val(today);
					return false;
				}
			}else{
				return true;
			}
		}else{
			return true;
		}
	} else {
		if (callfrom == "doctorDesk") {
			//alert("First obeserved date should not be future date!");
			// $("#allergyDate").val(today);
			return false;
		} else if (callfrom == "surgaryAdvice") {
			alert("Surgary Advice date should not be future date!");
			$("#adviceDate").val(today);
			return false;
		} else if (callfrom == "IPD_Billing") {
			alert("Date should not be future date!");
			$("#popup_container2").val(today);
			return false;
		}
	}
};

function checkCurrentDate(callfrom) {
	var dtDate = "";
	if (callfrom == 'DoctorStation') {
		dtDate = document.getElementById("assesmentDate").value;
	} else if (callfrom == 'conductAnaesthesia') {
		dtDate = document.getElementById("date").value;
	}

	var tempDate = dtDate.split("/");

	var addDate = new Date(tempDate[2], tempDate[1] - 1, tempDate[0]);
	var currentDate = new Date();
	currentDate.setHours(0, 0, 0, 0);

	if (addDate.getTime() == currentDate.getTime()) {
		return true;
	} else {
		if (callfrom == "DoctorStation") {
			alert("Please select Assesment Date as Today's Date !");
			$("#assesmentDate").val("");
			return false;
		} else if (callfrom == "conductAnaesthesia") {
			alert("Please select Date as Today's Date or Future Date !");
			return false;
		}
	}
};

function checkDate() {

	// treatment Start date
	var treStart = $("#treStart").val();
	// alert("CheckDate Function"+treStart);
	var tempDate = treStart.split("-");

	var addDate = new Date(tempDate[2], tempDate[1] - 1, tempDate[0]);

	var idate = document.getElementById("OFdate-pick");

	var temp = (idate.value).split("-");
	var currentDate = new Date(temp[0], temp[1] - 1, temp[2]);

	if (addDate.getTime() > currentDate.getTime()) {
		alert("You can't select Investigation date before Admission date !");
		$("#date-pick").val("");
	}

	if (currentDate > treStart) {
		alert("wrong Date");
	}

	dateReg = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
	// alert("2f");
	if (dateReg.test(idate.value)) {
		// alert("3");
		if (isFutureDate(idate.value)) {
			// resultDiv.innerHTML = "Entered date is a future date";
			// resultDiv.style.color = "red";
			alert("Entered date is a future date.");
			$("#OFdate-pick").val("");
			return false;
		}
	}
};

function checkDateManage() {

	// treatment Start date
	var treStart = "14-05-2015"; /* $("#treStart").val(); */
	// alert("CheckDate Function"+treStart);
	var tempDate = treStart.split("-");

	var addDate = new Date(tempDate[2], tempDate[1] - 1, tempDate[0]);

	var idate = document.getElementById("OFdate-pick");

	var temp = (idate.value).split("-");
	var currentDate = new Date(temp[0], temp[1] - 1, temp[2]);

	if (addDate.getTime() > currentDate.getTime()) {
		alert("You can't select Investigation date before Admission date !");
		$("#date-pick").val("");
	}

	if (currentDate > treStart) {
		alert("wrong Date");
	}

	dateReg = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
	// alert("2f");
	if (dateReg.test(idate.value)) {
		// alert("3");
		if (isFutureDate(idate.value)) {
			// resultDiv.innerHTML = "Entered date is a future date";
			// resultDiv.style.color = "red";
			alert("Entered date is a future date.");
			$("#OFdate-pick").val("");
			return false;
		}
	}
};

function checkSampleDate(callfrom) {
	var colDate = "";
	var samDate = "";

	if (callfrom == 'collection' || callfrom == 'sample') {
		colDate = document.getElementById("collectionDate").value;
		samDate = document.getElementById("collectionOutDate").value;
	}

	var tempDate = colDate.split("/");
	var tempDate1 = samDate.split("/");

	var addDate = new Date(tempDate[2], tempDate[1] - 1, tempDate[0]);
	var addDate1 = new Date(tempDate1[2], tempDate1[1] - 1, tempDate1[0]);
	addDate.setHours(0, 0, 0, 0);
	addDate1.setHours(0, 0, 0, 0);

	if (callfrom == "collection") {
		if (addDate.getTime() > addDate1.getTime()) {
			return true;
		} else {
			alert("Please select Collection Date as Future Date or same as Sample Date!");
			$("#collectionDate").val("");
			return false;
		}
	} else if (callfrom == "sample") {
		if (addDate1.getTime() > addDate.getTime()) {
			alert("Please select Sample Date as previous than Collection Date or Same as Collection Date!");
			$("#collectionOutDate").val("");
			return false;
		} else {
			return true;
		}
	}
};

function checkSampleDate1(callfrom) {
	var colDate = "";
	var samDate = "";

	if (callfrom == 'collection' || callfrom == 'sample') {
		colDate = document.getElementById("collectionDate").value;
		samDate = document.getElementById("collectionOutDate").value;
	}

	var tempDate = colDate.split("/");
	var tempDate1 = samDate.split("/");

	var addDate = new Date(tempDate[2], tempDate[1] - 1, tempDate[0]);
	var addDate1 = new Date(tempDate1[2], tempDate1[1] - 1, tempDate1[0]);
	addDate.setHours(0, 0, 0, 0);
	addDate1.setHours(0, 0, 0, 0);

	if (callfrom == "collection") {
		if (addDate.getTime() >= addDate1.getTime()) {
			return true;
		} else {
			alert("Please select Collection Date as Future Date or same as Sample Date!");
			$("#collectionDate").val("");
			return false;
		}
	} else if (callfrom == "sample") {
		if (addDate1.getTime() < addDate.getTime()) {
			alert("Please select Sample Date as after than Collection Date or Same as Collection Date!");
			$("#collectionOutDate").val("");
			return false;
		} else {
			return true;
		}
	}
};

function validateTextFields(textId, msg) {
	var textVal = $(textId).val();

	if (textVal == null || textVal == "") {

		alert("Plz Enter " + msg);
		$(textId).focus();
		return true;
	}
	return false;
}

function validateRegex(textVal) {
	var value = $(textVal).val();

	return ture;
}

function phonenumber(inputtxt) {
	var phoneno = /^\d{10}$/;
	if (inputtxt.value.match(phoneno)) {
		return true;
	} else {
		alert("Not a valid Phone Number");
		return false;
	}
}

function refreshTrue() {
	window.location.reload(true);
}

/* Start code validate date format (dd/mm/yyyy) */

var dtCh = "/";
var minYear = 1900;
var maxYear = 2100;

function isInteger(s) {
	var i;
	for (i = 0; i < s.length; i++) {
		// Check that current character is number.
		var c = s.charAt(i);
		if (((c < "0") || (c > "9")))
			return false;
	}
	// All characters are numbers.
	return true;
}

function stripCharsInBag(s, bag) {
	var i;
	var returnString = "";
	// Search through string's characters one by one.
	// If character is not in bag, append to returnString.
	for (i = 0; i < s.length; i++) {
		var c = s.charAt(i);
		if (bag.indexOf(c) == -1)
			returnString += c;
	}
	return returnString;
}

function daysInFebruary(year) {
	// February has 29 days in any year evenly divisible by four,
	// EXCEPT for centurial years which are not also divisible by 400.
	return (((year % 4 == 0) && ((!(year % 100 == 0)) || (year % 400 == 0))) ? 29
			: 28);
}
function DaysArray(n) {
	for ( var i = 1; i <= n; i++) {
		this[i] = 31;
		if (i == 4 || i == 6 || i == 9 || i == 11) {
			this[i] = 30;
		}
		if (i == 2) {
			this[i] = 29;
		}
	}
	return this;
}

function isDate(dtStr) {
	var daysInMonth = DaysArray(12);
	var pos1 = dtStr.indexOf(dtCh);
	var pos2 = dtStr.indexOf(dtCh, pos1 + 1);

	var strDay = dtStr.substring(0, pos1);
	var strMonth = dtStr.substring(pos1 + 1, pos2);
	var strYear = dtStr.substring(pos2 + 1);

	strYr = strYear;
	if (strDay.charAt(0) == "0" && strDay.length > 1)
		strDay = strDay.substring(1);
	if (strMonth.charAt(0) == "0" && strMonth.length > 1)
		strMonth = strMonth.substring(1);
	for ( var i = 1; i <= 3; i++) {
		if (strYr.charAt(0) == "0" && strYr.length > 1)
			strYr = strYr.substring(1);
	}
	month = parseInt(strMonth);
	day = parseInt(strDay);
	year = parseInt(strYr);
	if (pos1 == -1 || pos2 == -1) {
		alert("The date format should be : dd/mm/yyyy");
		return false;
	}
	if (strMonth.length < 1 || month < 1 || month > 12) {
		alert("Please enter a valid month");
		return false;
	}
	if (strDay.length < 1 || day < 1 || day > 31
			|| (month == 2 && day > daysInFebruary(year))
			|| day > daysInMonth[month]) {
		alert("Please enter a valid day");
		return false;
	}
	if (strYear.length != 4 || year == 0 || year < minYear || year > maxYear) {
		alert("Please enter a valid 4 digit year between " + minYear + " and "
				+ maxYear);
		return false;
	}
	if (dtStr.indexOf(dtCh, pos2 + 1) != -1
			|| isInteger(stripCharsInBag(dtStr, dtCh)) == false) {
		alert("Please enter a valid date");
		return false;
	}
	return true;
}

function ValidateDateFormat(dateString) {
	// var dt = document.frmSample.txtDate;
	if (isDate(dateString) == false) {
		return false;
	}
	return true;
}
/* End code validate date format (dd/mm/yyyy) */

/* Start code for validate Effective From Date */
function validateEffectiveToDate(value) {
	alert(value);
	var fromDate = $("effectiveFromDate").val();
	// var toDate = $("effectiveToDate").val();
	if (value != "" || value != null || value != undefined) {

		var tempDate = fromDate.split("/");

		var addDate = new Date(tempDate[2], tempDate[1] - 1, tempDate[0]);

		var tempDate1 = value.split("/");

		var currentDate = new Date(tempDate1[2], tempDate1[1] - 1, tempDate1[0]);

		if (addDate.getTime() > currentDate.getTime()) {
			alert("You can't select Effective From Date after Effective To Date !");
			$("#effectiveToDate").val("");
		}
	}
}

/* End code for validate Effective From Date */

function attachTime(fieldID) {

	var tempFieldID = $("#" + fieldID).val();
	var today = new Date();
	var time = today.getHours() + ":" + today.getMinutes() + ":"
			+ today.getSeconds();
	$("#" + fieldID).val(tempFieldID + " " + time);

}

/* ========age caluclator from DOB to Todays_date=================== */
// dateString = dd/mm/yyyy
function getAgeYMD(dateString) {

	var now = new Date();
	var today = new Date(now.getYear(), now.getMonth(), now.getDate());

	var yearNow = now.getYear();
	var monthNow = now.getMonth();
	var dateNow = now.getDate();

	var dob = new Date(dateString.substring(6, 10),
			dateString.substring(3, 5) - 1, dateString.substring(0, 2));

	// alert("dob: " + dob);

	var yearDob = dob.getYear();
	var monthDob = dob.getMonth();
	var dateDob = dob.getDate();
	var age = {};
	var ageString = "0___0___0";
	var seperatorString = "___";

	yearAge = yearNow - yearDob;

	if (monthNow >= monthDob)
		var monthAge = monthNow - monthDob;
	else {
		yearAge--;
		var monthAge = 12 + monthNow - monthDob;
	}

	if (dateNow >= dateDob)
		var dateAge = dateNow - dateDob;
	else {
		monthAge--;
		var dateAge = 31 + dateNow - dateDob;

		if (monthAge < 0) {
			monthAge = 11;
			yearAge--;
		}
	}

	age = {
		years : yearAge,
		months : monthAge,
		days : dateAge
	};

	if ((age.years > 0) && (age.months > 0) && (age.days > 0))
		ageString = (age.years + seperatorString)
				+ (age.months + seperatorString) + (age.days);
	else if ((age.years == 0) && (age.months == 0) && (age.days > 0))
		ageString = (age.years + seperatorString)
				+ (age.months + seperatorString) + (age.days);
	else if ((age.years > 0) && (age.months == 0) && (age.days == 0))
		ageString = (age.years + seperatorString)
				+ (age.months + seperatorString) + (age.days);
	else if ((age.years > 0) && (age.months > 0) && (age.days == 0))
		ageString = (age.years + seperatorString)
				+ (age.months + seperatorString) + (age.days);
	else if ((age.years == 0) && (age.months > 0) && (age.days > 0))
		ageString = (age.years + seperatorString)
				+ (age.months + seperatorString) + (age.days);
	else if ((age.years > 0) && (age.months == 0) && (age.days > 0))
		ageString = (age.years + seperatorString)
				+ (age.months + seperatorString) + (age.days);
	else if ((age.years == 0) && (age.months > 0) && (age.days == 0))
		ageString = (age.years + seperatorString)
				+ (age.months + seperatorString) + (age.days);
	else
		ageString = "0___0___0";

	// alert("Y___M___D: " + ageString);

	return ageString;

}

// ageString = Y___M___D
function getAgeInMonths(ageString) {

	var ageStringArray = ageString.split("___");

	var yearsInMonths = ((ageStringArray[0]) * (12));
	// alert("yearsInMonths :" + yearsInMonths);

	var date = new Date();
	var lastDayDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
	var lastDateOfCurrentMonth = (lastDayDate.getDate());// 30 || 31 || 28
	var daysInMonths = ((ageStringArray[2]) / (lastDateOfCurrentMonth));
	// alert("daysInMonths :" + daysInMonths);

	var months = (ageStringArray[1]);
	// alert("months :" + months);

	var finalAgeInMonths = 0.00;
	finalAgeInMonths = (parseFloat(daysInMonths) + parseFloat(months) + parseFloat(yearsInMonths));
	// end: code for finalAgeInMonths

	return (parseFloat(finalAgeInMonths).toFixed(2));

}

function validateNumberMinusSign(key) {

	var keycode = (key.which) ? (key.which) : (key.keyCode);

	// only numbers, minus sign, tab, fullstop and backspace.
	if (((keycode > 47) && (keycode < 58)) || (keycode == 45) || (keycode == 8)
			|| (keycode == 9) || (keycode == 46)) {
		return true;
	} else {
		return false;
	}

};

/***********
 * @author	: Touheed Khan
 * @date 	: 06-May-2016
 * @reason 	: validate Special charector
 **********/
function validateSpecialChar(key) {
	//alert(key.keyCode);
	var keycode = (key.which) ? key.which : key.keyCode;
	if (keycode == 38 || keycode == 35 || keycode == 33 || keycode == 36 ||keycode == 94 ||keycode == 64
			|| keycode == 37 || keycode == 37 ||keycode == 40 ||keycode == 41 ||keycode == 42 ||keycode == 43) {
		alert("Please Don't Enter Special Character Like : (!@#$%^&*) ");
		return false;
	} else {
		return true;
	}

}

/***********
 * @author	: Touheed Khan
 * @date 	: 11-May-2016
 * @reason 	: for lab result validation
 **********/
function validateSpecialMoreChar(key) { 

	var keycode = (key.which) ? key.which : key.keyCode;
	if (keycode == 38 || keycode == 35 || keycode == 33 || keycode == 36 ||keycode == 94 ||keycode == 64
			 ||keycode == 40 ||keycode == 41 ||keycode == 42 ||keycode == 43 
			|| keycode == 45 || keycode ==44 || keycode== 47 || keycode ==34 || keycode==39 || keycode==62 
			|| keycode==60 || keycode == 59 || keycode ==95 || keycode ==96 || keycode==126 || keycode==123 || keycode==124 || keycode==125) {
		alert("Special Characters are not Allowed here, only dot/decimal point(.) and percentage (%) is allowed...! ");
		return false;
	} else {
		return true;
	}

}

/***********
 * @author	: Tushar Sonawane
 * @date 	: 13-Sep-2016
 * @reason 	: for lab result validation Special Characters
 
function validateSpecialMoreChar1(key) { 

	var keycode = (key.which) ? key.which : key.keyCode;
	if (keycode == 35 || keycode == 33 || keycode == 36 ||keycode == 94 ||keycode == 64
			 ||keycode == 42 || keycode== 47 || keycode ==34 || keycode==39 || keycode==62 
			|| keycode==60 || keycode == 59 || keycode ==95 || keycode ==96 || keycode==126 
			|| keycode==123 || keycode==124 || keycode==125) {
		alert("You Can use (+-,():%&) only this Characters ");
		return false;
	} else {
		return true;
	}

}
**********/



// @author	: Kavita Bhangale
// @date 	: 19-Oct-2016
// @reason 	: for validation of Numbers(Only Numbers are allowed).

function validateNumberByRegEx(id){
	var reg = /^[0-9]+$/;
	var value = $('#' + id).val();
	
	if (value != "" && !reg.test(value)) {
		alert("Please Enter Only number!");
		$('#' + id).val("");
		return false;
	}
}

//@author	: Irfan Khan
//@date 	: 11-Nov-2016
//@reason 	: for accepting only numbers and '.' for Percentage(use to accept percentage(double).
function validateNumPer(key) {
	var keycode = (key.which) ? key.which : key.keyCode;
	if (keycode == 46 || keycode >= 48 && keycode <= 57 || keycode == 09
			|| keycode == 08) {
		return true;
	} else {
		alert("Enter numbers/percentage value only");
		return false;
	}
}

//@author	: Kavita Bhangale
//@date 	: 31-Dec-2016
//@reason 	: for validation of Alphabets(Only alphabets are allowed).

function validateAlphabetsByRegEx(id){
	var reg = /^[A-Za-z]+$/;
	var value = $('#' + id).val();
	
	if (value != "" && !reg.test(value)) {
		alert("Please Enter Only Alphabets!");
		$('#' + id).val("");
		return false;
	}
}

function validateNotAlphabetsByRegEx(id){
	var reg = /^[A-Za-z]+$/;
	var value = $('#' + id).val();
	
	if (value != "" && reg.test(value)) {
		alert("Please Enter Only Proper Date!");
		$('#' + id).val("");
		return false;
	}
}
/*Added By Annapurna (allow alphabets with spaces)*/
function validateAlphabets(id){
	var reg =  /^[a-zA-Z ]*$/;
	var value = $('#' + id).val();
	
	if (!value.match(reg)) {
		alert("Please Enter only alphabets!");
		$('#' + id).val("");
		return false;
	}
}

//@author	: Tushar
//@date 	: 16-Feb-2017
//@reason 	: for validation of Number and Slash.
function validateNumbersWithSlash(key) {
	//alert(key.keyCode);
	var keycode = (key.which) ? key.which : key.keyCode;
	if ((keycode >= 47 && keycode < 58) || (keycode > 95 && keycode < 106) || keycode == 8 || keycode == 9
			|| keycode == 127 || keycode == 13 || keycode == 27 || keycode == 46 ) {

		return true;
	} else {
		alert("Please Enter Numbers Only!");
		return false;
	}
}


//@author	: Kavita Bhangale
//@date 	: 17-Feb-2017
//@reason 	: for validation of Numbers and Forward Slash(Only Numbers and Forward Slash are allowed).

function validateNumberWithSlashByRegEx(id){
	var reg = /^[0-9\/]+$/;
	var value = $('#' + id).val();
	
	if (value != "" && !reg.test(value)) {
		alert("Please Enter Only Numbers with Forward Slash!");
		$('#' + id).val("");
		return false;
	}
}

//@author	: Kavita Bhangale
//@date 	: 17-Feb-2017
//@reason 	: for validation of Numbers and Dot(Only Numbers and dot are allowed).

function validateNumberWithDotByRegEx(id){
	var reg = /^[0-9\.]+$/;
	var value = $('#' + id).val();
	
	if (value != "" && !reg.test(value)) {
		alert("Please Enter Only Numbers with Dot!");
		$('#' + id).val("");
		return false;
	}
}

//Irfan khan 7-Nov-2017 To validate only Numbers
function validateNumOnly(evt) {
	evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    alert("Enter Number Only.!!!");
        return false;
    }
    return true;
}

//Irfan khan 9-Mar-2018 To validate percent value keys
function isPercentKey(evt,inputId)
{
    var charCode = (evt.which) ? evt.which : event.keyCode

    if (charCode == 46)
    {
        var inputValue = $("#"+inputId).val();
        if (inputValue.indexOf('.') < 1)
        {
            return true;
        }
        alert("Can't Enter Another Decimal '.'");
        return false;
    }
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57))
    {
    	alert("Enter Number Only.!!!");
        return false;
    }
    return true;
}

//Irfan khan 9-Mar-2018 To validate value greater than 100%
function isGTHundred(inputId){
	var inputValue = parseFloat($("#"+inputId).val());
	if(inputValue > 100){
		alert("Can't be greater than 100%.");
		$("#"+inputId).val(100);
		return false;
	}
}