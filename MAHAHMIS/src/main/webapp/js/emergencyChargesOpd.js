/*******************************************************************************
 * @author Mohd Tarique Aalam
 * @Code Fetching Day of week to check wether it is sunday or any other day
 ******************************************************************************/
function getDayOfWeek2() {
	
	
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/ipdbill/getEmerChrTimeSunday",
		
		error : function() {
			alert('error');
		},
		success : function(response) {
			/*alert(response);*/

						if (response == true) {
				$("#emrChrFlag").val('Y');
				$("#emrChrFlag").prop("checked", true);
				$('#emrPer').css("display", "inline");
				getEmergancyCharges();
			}
			return false;
		}
	});
		
/*	var sunday = 0;
	var a = new Date();
	var day = a.getDay();
	
	if (sunday == day) {
		$("#emrChrFlag").val('Y');
		$("#emrChrFlag").prop("checked", true);
		$('#emrPer').css("display","inline");
		getEmergancyCharges();
	} */
}




/*******************************************************************************
 * @author Mohd Tarique Aalam
 * @Code getting emergency percentage when it is sunday and holiday and if user want
 ******************************************************************************/
function getEmergancyCharges() {
	
	
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/bill/getEmergancyCharges",
		
		error : function() {
			alert('error');
		},
		success : function(response) {
			
			$('#emrPer').val(response);
		}
	});
}





function setBox() {
	
	if ($("#emrChrFlag").is(":checked")) {

		$('#emrPer').css("display","inline");
		getEmergancyCharges();
		calculate123('main');
	} else {
		$('#emrPer').css("display","none");
		$('#emrPer').val(0);
		calculate123('main');
	}
}



/*******************************************************************************
 * @author Mohd Tarique Aalam
 * @Code to calculate rate,amount,coPay with emergency charges
 ******************************************************************************/

function calculate123(callfrom)
{
	//alert("cal");
	
	if (callfrom == "main") {
		callfrom =$('#receiptOf').val();
	}
	var emrgancyper=parseFloat($('#emrPer').val());

	if (emrgancyper > 100) {
		alert("Percentage should be less than 100");
		$("#emrPer").val(0);
		return false;
	}
	
		var rate=0;
		//set on refresh
	if (callfrom =="general") {
		rate =parseFloat($("#rate2").val());
		
		/*//set on refresh and edit
		if(rate==0 || rate==undefined || rate== null)
			{
			var r=$("#rate").val();
			var emp2=parseFloat(r*10/100);
			r=parseFloat(r-emp2);
			$("#rate2").val(r);
			}
		*/
		//alert($("#rate2").val());
		var quantity=parseFloat($("#qty").val());
		
		
		//taking percentage and setting value
		var emp=parseFloat(rate*emrgancyper/100);
		//amount = parseFloat(emp + amount);
		rate = parseFloat(emp + rate);
		var amount=parseFloat((quantity*rate));
		
		$("#rate").val(rate);
		$("#coPay").val(amount);
		$("#amount").val(amount);
		
	}else{
		calculate123sponsor();
	}
	
}


/*******************************************************************************
 * @author Mohd Tarique Aalam
 * @Code to calculate rate,amount,coPay with emergency charges for sponsor
 * @Date
 ******************************************************************************/
function calculate123sponsor()
{

	var emrgancyper=parseFloat($('#emrPer').val());

	if (emrgancyper > 100) {
		alert("Percentage should be less than 100");
		$("#emrPer").val(0);
		return false;
	}
	    var rate =parseFloat($("#rateOpdSponsor2").val());
	    
		var qtyOpdSponsor=$('#qtyOpdSponsor').val();
		
		var emp=parseFloat(rate*emrgancyper/100);
		//amount = parseFloat(emp + amount);
		rate = parseFloat(emp + rate);
		var amount =parseFloat((qtyOpdSponsor*rate)); 
		$("#rateOpdSponsor").val(rate);
		$("#payOpdSponsor").val(amount);
		$("#amountOpdSponsor").val(amount);
		
	
}



/*******************************************************************************
 * @author Mohd Tarique Aalam
 * @Code to fetch Holiday Date from data base
 ******************************************************************************/
function fetchHospitalHolidayEmrPer(pageName) {

	
	var selYear =  new Date().getFullYear();//$("#selYear").val();
	//alert(selYear);
	countForNATable = 1;
	var inputs = [];
	inputs.push('action=fetchHospitalHoliday');
	inputs.push('pageName=' + pageName);
	inputs.push('selYear=' + selYear);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		//url : "AdminServlet",
		url : "ehat/hospitalholiday/fetchHospitalHoliday",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(ajaxResponse) {
			
			//objc = JSON.parse(ajaxResponse); //eval('(' + ajaxResponse + ')');
			compareDate(ajaxResponse);
		}
	});
}


/*******************************************************************************
 * @author Mohd Tarique Aalam
 * @Code to compare current date with holiday date
 ******************************************************************************/

function compareDate(r)
{	
	for ( var i = 0; i < r.listHoliday.length; i++) {
		var date=r.listHoliday[i].date;
		var sysDate=$('#todayDateForempr').val();
		
		if (date == sysDate) {
			$("#emrChrFlag").val('Y');
			$("#emrChrFlag").prop("checked", true);
			$('#emrPer').css("display","inline");
			getEmergancyCharges();
		} 
	}
}

/*******************************************************************************
 * @author Mohd Tarique Aalam
 * @date 4 - jan 2018 
 * @Code setting Hidden Field for genral and sponsor
 ******************************************************************************/
function setHiddenFielde(value)
{	

	$("#rate2").val(value);

}

function setHiddenFielde2(value)
{
	$("#rateOpdSponsor2").val(value);
}


/*function setHiddenFielde3()
{	

	var vall=$("#rate").val();
	$("#rate2").val(vall);
	

}*/



function EmerChrAccordingToTimeOpd()
{
	
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/ipdbill/getEmerChrTime",
		
		error : function() {
			alert('error');
		},
		success : function(response) {
			//alert(response);

						if (response == true) {
				$("#emrChrFlag").val('Y');
				$("#emrChrFlag").prop("checked", true);
				$('#emrPer').css("display", "inline");
				getEmergancyCharges();
			}
			return false;
		}
	});
}

function EmrChrAccordingToTimeDR(callFrom){
	
	jQuery.ajax({
		async : false,
		type : "GET",
		data : {
			"callFrom" : callFrom
		},
		url : "ehat/ipdbill/getEmerChrTimeDR",
		
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			if (r.isEmrTime == true) {
				$("#emrChrFlag").val('Y');
				$("#emrChrFlag").prop("checked", true);
				$('#emrPer').css("display", "inline");
				//getEmergancyCharges();
				$('#emrPer').val(r.emrPer);
			}
			return false;
		}
	});
}
