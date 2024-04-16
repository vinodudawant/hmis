function isCompanyName(id, minlen, maxlen)
{
	// alert("cmpany name");
	var min = parseInt(minlen);
	var max = parseInt(maxlen);
	var name =/^[A-Za-z0-9&._ ]+$/;
	var value = $('#' + id).val();
	
	if (min > value.length || max < value.length) 
	{
		alert("Please Enter Valid company name!");
		$('#' + id).focus();
		$('#' + id).val('');
		return false;
	}
	else {
		if (value != "" && !name.test(value)) {
			alert("Please Enter Valid Company name!");
			$('#' + id).focus();
			$('#' + id).val('');
			return false;
		}

		return true;
	}

}
//Registration number in Doctor
function isFloatingPoint(id, minLen, maxLen) {
	var min = parseInt(minLen);
	var max = parseInt(maxLen);
   
	// alert("number field");
	var name1 = /^[0-9]*(\.{0,1}[0-9]{1,10})+$/;
	var value1 = $('#' + id).val();
	
	if (min > value1.length || max < value1.length) {
		alert("Please Enter Only number!");
		$('#' + id).focus();
		return false;
	} else if (value1 != "" && !name1.test(value1)) {
		alert("Please Enter Only number!");
		$('#' + id).val('');
		$('#' + id).focus();
		return false;

	}
	return true;
}
//Registration number in Doctor/^\d{1,2}[\/\-](0?[1-9]|1[012])+$/;
function isExpiryDate(id) {
	// alert("number field");/^[0-9]{2}\[-]{1}[0-9]{4}+$/;
	// /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/
	//var name1 = /^\d{1,2}[\/\-](\d{2})+$/;
	var name1 = /^(0[1-9]|1[0-2])\/\d{2}$/;
	var value1 = $('#' + id).val();
	var insertedDate = value1.split("/");
	var today = new Date();
	var currentMonth = (today.getMonth() + 1);
	var currentY = today.getFullYear();
	var currentYear = currentY.toString().substring(2);
	
	if (value1 != "" && !name1.test(value1)) {
		alert("Please Enter in 'MM/YY' format!!");
		$('#txtExpiry').focus();
		return false;
	}else if(insertedDate[1] < currentYear) {
		alert("Expiry date can not be less than today!!!");
		$('#txtExpiry').focus();
		return false;
	}else if(insertedDate[1] <= currentYear) {
		if (insertedDate[0] < currentMonth) {
			alert("Expiry date can not be less than today!!!");
			$('#txtExpiry').focus();
			return false;
		}

	}

	//alert("success!!");
	return true;
}
//only for phone number
function isPhoneNumber(id, minLen, maxLen) {
	var min = parseInt(minLen);
	var max = parseInt(maxLen);
   
	// alert("number field");
	var name1 = /^[0-9]+$/;
	var value1 = $('#' + id).val();
	if (11 > value1.length || 11 < value1.length) {
		alert("Please Enter Valid number!");
		$('#' + id).val('');
		$('#' + id).focus();
		return false;
	} else if (value1 != "" && !name1.test(value1)) {
		alert("Please Enter Only number!");
		$('#' + id).focus();
		$('#' + id).val('');
		
		return false;

	}
	return true;
}
//Registration number in Doctor
function isNumber(id, minLen, maxLen) 
{
	var min = parseInt(minLen);
	var max = parseInt(maxLen);
	// alert("number field");
	var name1 = /^[0-9.]+$/;
	var value1 = $('#' + id).val();
	if (min > value1.length || max < value1.length) {
		alert("Please Enter Valid number!");
		$("#"+ id).val('');
		setTimeout(function() {
			$("#"+id).focus();
			},0);
		return false;
	} else if (value1 != "" && !name1.test(value1)) {
		alert("Please Enter Only number!");
		$("#"+id).val('');
		setTimeout(function() {
		$("#"+id).focus();
		},0);
		return false;

	}
	return true;
}

function isUserName(id, minlen, maxlen) {
	var name = /^[A-Za-z0-9]+$/;
	var min = parseInt(minlen);
	var max = parseInt(maxlen);
	// alert("user name field");
	var value = $('#' + id).val();
	if (min > value.length || max < value.length) {
		alert("Please Enter Valid Data!");
		$('#' + id).focus();
		return false;
	} else if (value != "" && !name.test(value)) {
		alert("Please Enter Valid Data!");
		$('#' + id).val('');
		$('#' + id).focus();
		return false;

	}
	return true;
}
function checkNull(id) 
{
	var value = $('#' + id).val();
    if(value!=null)
    	{
		$('#' + id).focus();
    	}
    else 
    	{
    	alert("Enter Company Name!");
		$('#' + id).focus();
    	}
}
//Packing type,Drug name
function isName(id, minlen, maxlen) {
	// alert("first n last name field");
	var min = parseInt(minlen);
	var max = parseInt(maxlen);
	var name = /^[A-Za-z0-9 _]+$/;
	var value = $('#' + id).val();
		if (min > value.length || max < value.length) {
		alert("Please Enter Valid Data!");
		$('#' + id).focus();
		return false;
	} else {
		if (value != "" && !name.test(value)) {
			alert("Please Enter Valid Data!");
			$('#' + id).val('');
			$('#' + id).focus();
			return false;
		}

		return true;
	}
}
//branch address
function isAddress(id, minlen, maxlen) {
	// alert("first n last name field");
	var min = parseInt(minlen);
	var max = parseInt(maxlen);
	var name = /^[A-Za-z0-9 -.]+$/;
	var value = $('#' + id).val();
	if (min > value.length || max < value.length) {
		alert("Please Enter Valid Address!");
		$('#' + id).focus();
		return false;
	} else {
		if (value != "" && !name.test(value)) {
			alert("Please Enter Valid Address!");
			$('#' + id).val('');
			$('#' + id).focus();
			return false;
		}

		return true;
	}
}

// Use in drug master
function isAlphabet(id, minlen, maxlen) {
	var name = /^[A-Za-z]+$/;
	var min = parseInt(minlen);
	var max = parseInt(maxlen);
	// alert(" alphabet field");
	var value = $('#' + id).val();
	if (min > value.length || max < value.length) {
		alert("Please Enter Valid name!");
		$('#' + id).focus();
		return false;
	} else {
		if (value != "" && !name.test(value)) {
			alert("Please Enter Valid name!");
			$('#' + id).val('');
			$('#' + id).focus();
			return false;
		}

		return true;
	}
}
//Doctor Name,Patient Name,bank name
function isAlphaWithSpace(id, minlen, maxlen) {
	var name = /^[A-Za-z .-]+$/;
	var min = parseInt(minlen);
	var max = parseInt(maxlen);
	// alert(" alphabet field");
	var value = $('#' + id).val();
	if (min > value.length || max < value.length) {
		alert("Please Enter Only Charactor!");
		$('#' + id).focus();
		return false;
	} else {
		if (value != "" && !name.test(value)) {
			alert("Please Enter Only Charactor!");
			$('#' + id).val('');
			$('#' + id).focus();
			return false;
		}

		return true;
	}
}
//Pdoduct Name
function isProductName(id, minlen, maxlen) {
	var name = /^[A-Za-z0-9 -]+$/;
	var min = parseInt(minlen);
	var max = parseInt(maxlen);
	// alert(" alphabet field");
	var value = $('#' + id).val();
	if (min > value.length || max < value.length) {
		alert("Please Enter Valid Product Name!");
		$('#' + id).focus();
		return false;
	} else {
		if (value != "" && !name.test(value)) {
			alert("Please Enter Valid Product Name!");
			$('#' + id).val('');
			$('#' + id).focus();
			return false;
		}

		return true;
	}
}



//Shelf num,Category name
function isAlphaWithDigitSpace(id, minlen, maxlen) {
	var name = /^[A-Za-z0-9 ]+$/;
	var min = parseInt(minlen);
	var max = parseInt(maxlen);
	// alert(" alphabet field");
	var value = $('#' + id).val();
	if (min > value.length || max < value.length) {
		alert("Please Enter Valid name!");
		$('#' + id).focus();
		return false;
	} else {
		if (value != "" && !name.test(value)) {
			alert("Please Enter Valid name!");
			$('#' + id).val('');
			$('#' + id).focus();
			return false;
		}

		return true;
	}
}



function isPin(id, maxlen) {

	var max = parseInt(maxlen);

	// alert("pin code field");
	var name = /^[0-9]+$/;
	var value = $('#' + id).val();
	if (value != "" && max > value.length) {
		alert("Please Enter Valid pincode!");
		$('#' + id).focus();
		return false;
	} else {
		if (value != "" && !name.test(value)) {
			alert("Please Enter Valid pincode!");
			$('#' + id).focus();
			return false;
		}
		return true;
	}
}
function ismaxLength(id, minlen, maxlen) {

	// alert("maxlen field");
	var min = parseInt(minlen);
	var max = parseInt(maxlen);
	var name = /^[A-Za-z0-9]+$/;
	var value = $('#' + id).val();
	if (min > parseInt(value.length) || max < parseInt(value.length)) {
		alert("Please Enter Valid maxlength!");
		$('#' + id).focus();
		return false;
	} else {
		if (value != "" && !name.test(value)) {
			alert("Please Enter Valid maxlength!");
			$('#' + id).focus();
			return false;
		}

		return true;
	}
}

/*function isPhonNo(id) 
{
  var value = $('#' + id).val();
	var len = value.length;

	if ((value.charAt(0) == '0' && len == 11)
			|| (value.charAt(0) != '0' && len == 10)) {
		for ( var i = 0; i < value.length; i++) {
						
			if (value = "" && value.charCodeAt(i) < 48
					|| value.charCodeAt(i) > 57) {
				$('#' + id).val("");
				alert("Please enter valid Phone number!");
				$('#' + id).val('');
				$('#' + id).focus();
				return false;
			}
			
		}
		return true;
	} 
	else if (len != 0) 
	{ for ( var i = 0; i < value.length; i++) {
		if((value.charCodeAt(i) > 64 && value.charCodeAt(i) < 91)
				|| (value.charCodeAt(i) > 96  && value.charCodeAt(i) < 123)) {
		
			$('#' + id).val("");
			alert("Please enter only number!");
			$('#' + id).val('');
			$('#' + id).focus();
			return false;
		}
		else
	   {
		alert("Please enter valid Phone number!");
		$('#' + id).val("");
		$('#' + id).focus();
		return false;
	   }
}
}
}
*/


function isMobileNum(id) {

	var value = $('#' + id).val();
	var len = value.length;

	if ((value.charAt(0) == '0' && len == 11)
			|| (value.charAt(0) != '0' && len == 10)) {
		for ( var i = 0; i < value.length; i++) {
			
			if (value = "" && value.charCodeAt(i) < 48
					|| value.charCodeAt(i) > 57) {
				$('#' + id).val("");
				alert("Please enter valid mobile number!");
				$('#' + id).val('');
				$('#' + id).focus();
				return false;
			}
		}
		return true;
	} 
	else if (len != 0) 
	{ for ( var i = 0; i < value.length; i++) {
		if((value.charCodeAt(i) > 64 && value.charCodeAt(i) < 91)
				|| (value.charCodeAt(i) > 96  && value.charCodeAt(i) < 123)) {
		
			$('#' + id).val("");
			alert("Please enter only number!");
			$('#' + id).val('');
			$('#' + id).focus();
			return false;
		}
		else
	   {
		alert("Please enter valid Mobile number!");
		$('#' + id).val("");
		$('#' + id).focus();
		return false;
	   }
}
}
}
function isPhonNo(id) {

	var value = $('#' + id).val();
	var len = value.length;

	if ((value.charAt(0) == '0' && len == 11)
			|| (value.charAt(0) != '0' && len == 10)) {
		for ( var i = 0; i < value.length; i++) {
			
			if (value = "" && value.charCodeAt(i) < 48
					|| value.charCodeAt(i) > 57) {
				$('#' + id).val("");
				alert("Please enter valid phone number!");
				$('#' + id).val('');
				$('#' + id).focus();
				return false;
			}
		}
		return true;
	} 
	else if (len != 0) 
	{ for ( var i = 0; i < value.length; i++) {
		if((value.charCodeAt(i) > 64 && value.charCodeAt(i) < 91)
				|| (value.charCodeAt(i) > 96  && value.charCodeAt(i) < 123)) {
		
			$('#' + id).val("");
			alert("Please enter only number!");
			$('#' + id).val('');
			$('#' + id).focus();
			return false;
		}
		else
	   {
		alert("Please enter valid phone number!");
		$('#' + id).val("");
		$('#' + id).focus();
		return false;
	   }
}
}
}

function isPrice(id) {

	// alert("price field");
	var value = $('#' + id).val();
	alert(value);
	var cnt = 0;
	for ( var i = 0; i < value.length; i++) {

		var temp = value.charCodeAt(i);

		if ((temp > 47 && temp < 59)) {
		} else if (temp == 46 && cnt == 0 && i != 0 && i < (value.length - 1)) {
			cnt++;
		} else {
			alert("Please Enter Valid price!");
			$('#' + id).focus();
			return false;
		}

		return true;
	}
}
function isPassword(id, minlen, maxlen, strong) {
	// alert("password field");
	// var name = /^[A-Za-z0-9]+$/;

	var specialChar = 0;
	var lowerCase = 0;
	var upperCase = 0;
	var digit = 0;
	var min = parseInt(minlen);
	var max = parseInt(maxlen);
	var value = $('#' + id).val();

	if (strong == false) {
		if (value != "" && min < value.length || max > value.length) {
			alert("Please Enter Valid password!");
			$('#' + id).focus();
			return false;
		}
	}

	// true condition
	// alert(parseInt(value.charCodeAt(0)));
	else {
		for ( var i = 0; i < value.length; i++) {

			var temp = 0;
			temp = parseInt(value.charCodeAt(i));
			if (temp > 47 && temp < 58) {
				digit += 1;
			} else if (temp > 64 && temp < 91) {
				upperCase += 1;
			} else if (temp > 96 && temp < 123) {
				lowerCase += 1;
			} else {
				specialChar += 1;
			}
		}

		if (digit < 1 || lowerCase < 1 || upperCase < 1 || specialChar < 1) {
			alert("Please Enter Valid password!");
			$('#' + id).focus();
			return false;
		}
	}
	return true;
}

function isSelect(id, text) {
	var index = parseInt($("#" + id)[0].selectedIndex);
	if (value != "" && index == 0) {
		alert("Please select " + text + " ..!");
		$('#' + id).focus();
		return false;
	}
	return true;
}
function ValidateEmail(id) {
	var inputText = $('#' + id).val();
	// alert(inputText);

	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (inputText != "") {
		if (inputText.match(mailformat)) {
			return true;
		} else {
			alert("You have entered an invalid email address!");
			$('#' + id).val('');
			return false;
		}
	}
}

//Todays Bdate
function checkBirthdate(id) {
	
	var dtDate = "";
	
		dtDate = document.getElementById("txtPatDOB").value;
	

var tempDate = dtDate.split("/");

	var addDate = new Date(tempDate[2], tempDate[1] - 1, tempDate[0]);
	var currentDate = new Date();

	if (addDate.getTime() > currentDate.getTime()) {
		
			alert("Please select BirthDate Before Today's Date !");
			$("#txtPatDOB").val("");
			return false;
		
	
	}
}
