/***
 * @author: mohd Tarique Aalam
 * @date: 10/1/2018
 * @code to get emergency charges and apply
 * 
 */

function setBoxIpd() {
	
	if ($("#emrChrFlag").is(":checked")) {

		$('#emrPer').css("display","inline");
		getEmergancyChargesIpd();
		calculateEmrCheIpd('main');
	} else {
		$('#emrPer').css("display","none");
		$('#emrPer').val(0);
		calculateEmrCheIpd('main');
	}
}


/*******************************************************************************
 * @author Mohd Tarique Aalam
 * @date: 10/1/2018
 * @Code Fetching Day of week to check wether it is sunday or any other day
 ******************************************************************************/
function getDayOfWeekIpd() {
	
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/ipdbill/getEmerChrTimeSunday",
		
		error : function() {
			alert('error');
		},
		success : function(response) {

						if (response == true) {
				$("#emrChrFlag").val('Y');
				$("#emrChrFlag").prop("checked", true);
				$('#emrPer').css("display", "inline");
				getEmergancyChargesIpd();
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
		getEmergancyChargesIpd();
	} */
}




/*******************************************************************************
 * @author Mohd Tarique Aalam
 * @date: 10/1/2018
 * @Code to fetch Holiday Date from data base
 ******************************************************************************/
function fetchHospitalHolidayEmrPerIpd(pageName) {

	
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
		data : str +"&reqType=AJAX",
		//url : "AdminServlet",
		url : "ehat/hospitalholiday/fetchHospitalHoliday",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(ajaxResponse) {
			
			objc = eval('(' + ajaxResponse + ')');
			compareDateIpd(objc);
		}
	});
}


/*******************************************************************************
 * @author Mohd Tarique Aalam
 * @date: 10/1/2018
 * @Code to compare current date with holiday date
 ******************************************************************************/

function compareDateIpd(r)
{	
	for ( var i = 0; i < r.liHoliday.length; i++) {
		var date=r.liHoliday[i].dt;
		var sysDate=$('#todayDateForemprIpd').val();
		
		if (date == sysDate) {
			$("#emrChrFlag").val('Y');
			$("#emrChrFlag").prop("checked", true);
			$('#emrPer').css("display","inline");
			getEmergancyChargesIpd();
		} 
	}
}

/*******************************************************************************
 * @author Mohd Tarique Aalam
 * @date: 10/1/2018
 * @Code getting emergency percentage when it is sunday and holiday and if user want
 * 
 ******************************************************************************/
function getEmergancyChargesIpd() {
	
	
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






/*******************************************************************************
 * @author Mohd Tarique Aalam
 *  @date: 10/1/2018
 * @Code to calculate rate,amount,coPay with emergency charges
 ******************************************************************************/

function calculateEmrCheIpd(callfrom)
{
	setHiddenFieldeIpd($("#rate").val());
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
		//alert("call");
	if (callfrom =="general") {
		rate =parseFloat($("#rate2").val());
		
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
		calculateEmrCheIpdSponsor();
	}
	
}


/*******************************************************************************
 * @author Mohd Tarique Aalam
 * @Code to calculate rate,amount,coPay with emergency charges for sponsor
 ******************************************************************************/
function calculateEmrCheIpdSponsor()
{
	//alert("sponsor");
	var emrgancyper=parseFloat($('#emrPer').val());

	if (emrgancyper > 100) {
		alert("Percentage should be less than 100");
		$("#emrPer").val(0);
		return false;
	}
	    var rate =parseFloat($("#rateIpdSponsor").val());
		var qtyOpdSponsor=$('#qtyIpdSponsor').val();
		
		var emp=parseFloat(rate*emrgancyper/100);
		//amount = parseFloat(emp + amount);
		rate = parseFloat( rate + emp);
		var amount =parseFloat((qtyOpdSponsor*rate)); 
		$("#rateIpdSponsor").val(rate);
		$("#payIpdSponsor").val(amount);
		$("#amountIpdSponsor").val(amount);
		
	
}




/*******************************************************************************
 * @author Mohd Tarique Aalam
 * @date 10-jan 2018 
 * @Code setting Hidden Field for genral and sponsor
 ******************************************************************************/
function setHiddenFieldeIpd(value)
{	

	$("#rate2").val(value);

}

function setHiddenFielde2Ipd(value)
{
	$("#rateIpdSponsor2").val(value);
}


function EmerChrAccordingToTime()
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
				getEmergancyChargesIpd();
			}
			return false;
		}
	});
}