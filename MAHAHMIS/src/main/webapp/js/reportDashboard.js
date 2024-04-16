
/**@author  :Bilal
 * @date    :22-Aug-2017
 * @code    :when we call on today**/
function setDateWise(callfrom){
	
	$("#datecallfrom").val(callfrom);
	
	getTotalAmountOfOPD('total');
	getTotalCashOfOPD('cash');
	getTotalCriditOfOPD('cridit');
	
	getTotalAmountOfIPD('total');
	getTotalCashOfIPD('cash');
	getTotalCriditOfIPD('cridit');
	
	getTotalRefundAmountOfOPD('onloadtotal');
	getTotalRefundCashOfOPD('onloadcash');
	getTotalRefundCriditOfOPD('onloadcridit');
	
	getTotalRefundAmountOfIPD('onloadtotal');
	getTotalRefundCashOfIPD('onloadcash');
	getTotalRefundCriditOfIPD('onloadcridit');
	 
	getTotalPatientOPD('total');
	getTotalPatientOPDActive('active');
	getTotalPatientOPDInActive('inactive');
	getTotalPatientIPD('total');
	getTotalPatientIPDActive('active');
	getTotalPatientIPDInActive('inactive');
	getTotalPatientDiagnostics('total');
	getTotalPatientDiagnosticsActive('active');
	getTotalPatientDiagnosticsInActive('inactive');
}

/**@author   :Bilal
 * @date     :22-Aug-2017
 * @code     :for getting total amount of opd patient***/
function getTotalAmountOfOPD(callfrom) {
	
	
	var datecallfrom =$("#datecallfrom").val();
	
	jQuery.ajax({
		type : "POST",
		url : "ehat/reportdashboard/getTotalAmountOfOPD",
		data : {
			"callfrom" : callfrom,
			"datecallfrom" : datecallfrom

		},
		success : function(response) {
		
			var topdc = response;
			$("#total_opd_collection").text(topdc.toFixed(2));
			total();
		}
	});
	
}

/**@author   :Bilal
 * @date     :22-Aug-2017
 * @code     :for getting total amount of opd patient of cash mode***/
function getTotalCashOfOPD(callfrom) {
	
	var datecallfrom =$("#datecallfrom").val();
	
	jQuery.ajax({
		type : "POST",
		url : "ehat/reportdashboard/getTotalAmountOfOPD",
		data : {
			"callfrom" : callfrom,
			"datecallfrom" :datecallfrom
		},
		success : function(response) {
			var topdc = response;
			$("#cash_opd_collection").text(topdc.toFixed(2));
			total();
		}
	});
}

/**@author   :Bilal
 * @date     :22-Aug-2017
 * @code     :for getting total amount of opd patient of cridit mode ***/
function getTotalCriditOfOPD(callfrom) {
	

	var datecallfrom =$("#datecallfrom").val();
	
	jQuery.ajax({
		type : "POST",
		url : "ehat/reportdashboard/getTotalAmountOfOPD",
		data : {
			"callfrom" : callfrom,	
			"datecallfrom" :datecallfrom

		},
		success : function(response) {
			var topdc = response;
			$("#cheque_card_opd_collection").text(topdc.toFixed(2));
			total();
		}
	});
}


/*****************IPD ***********************/

/**@author   :Bilal
 * @date     :22-Aug-2017
 * @code     :for getting total amount of Ipd patient***/
function getTotalAmountOfIPD(callfrom) {

	//var fromDate=$("#admsnCount").val();
	//var toDate  =$("#admsnCount").val();
	var datecallfrom =$("#datecallfrom").val();

		jQuery.ajax({
		type : "POST",
		url : "ehat/reportdashboard/getTotalAmountOfIPD",
		data : {
			"callfrom" : callfrom,
			"datecallfrom" :datecallfrom

		},
		success : function(response) {
			var topdc = response;
			$("#total_ipd_collection").text(topdc.toFixed(2));
			total();
		}
	});
	
}

/**@author   :Bilal
 * @date     :22-Aug-2017
 * @code     :for getting total amount of ipd patient of cash mode***/
function getTotalCashOfIPD(callfrom) {
	
	
	//var fromDate=$("#admsnCount").val();
	//var toDate  =$("#admsnCount").val();
	var datecallfrom =$("#datecallfrom").val();
	jQuery.ajax({
		type : "POST",
		url : "ehat/reportdashboard/getTotalAmountOfIPD",
		data : {
			"callfrom" : callfrom,
			"datecallfrom" :datecallfrom
			
		},
		success : function(response) {
			var topdc = response;
			$("#cash_ipd_collection").text(topdc.toFixed(2));
			total();
		}
	});
}

/**@author   :Bilal
 * @date     :22-Aug-2017
 * @code     :for getting total amount of ipd patient of cridit mode ***/
function getTotalCriditOfIPD(callfrom) {
	
	//var fromDate=$("#admsnCount").val();
	//var toDate  =$("#admsnCount").val();
	var datecallfrom =$("#datecallfrom").val();
	
	jQuery.ajax({
		type : "POST",
		url : "ehat/reportdashboard/getTotalAmountOfIPD",
		data : {
			"callfrom" : callfrom,
			"datecallfrom" :datecallfrom

		},
		success : function(response) {
			var topdc = response;
			$("#cheque_card_ipd_collection").text(topdc.toFixed(2));
			total();
		}
	});
}
/***********Refund opd*****************/

/**@author   :Bilal
 * @date     :23-Aug-2017
 * @code     :for getting Refund of opd***/
function getTotalRefundAmountOfOPD(callfrom) {


	var datecallfrom =$("#datecallfrom").val();
	
	jQuery.ajax({
		type : "POST",
		url : "ehat/reportdashboard/getTotalRefundAmountOfOPD",
		data : {
			"callfrom" : callfrom,
			"datecallfrom" :datecallfrom

		},
		success : function(response) {
			var topdc = response;
			$("#total_opd_refund_amt").text(topdc.toFixed(2));
			totalRef();
		}
	});
}
function getTotalRefundCashOfOPD(callfrom) {
	var datecallfrom = $("#datecallfrom").val();

	jQuery.ajax({
		type : "POST",
		url : "ehat/reportdashboard/getTotalRefundAmountOfOPD",
		data : {
			"callfrom" : callfrom,
			"datecallfrom" : datecallfrom

		},
		success : function(response) {
			var topdc = response;
			$("#cash_opd_refund_amt").text(topdc.toFixed(2));
			totalRef();
		}
	});
}
function getTotalRefundCriditOfOPD(callfrom){
	var datecallfrom = $("#datecallfrom").val();

	jQuery.ajax({
		type : "POST",
		url : "ehat/reportdashboard/getTotalRefundAmountOfOPD",
		data : {
			"callfrom" : callfrom,
			"datecallfrom" : datecallfrom

		},
		success : function(response) {
			var topdc = response;
			$("#card_opd_refund_amt").text(topdc.toFixed(2));
			totalRef();
		}
	});
}

/***********Refund opd*****************/


/***********Refund ipd*****************/
/**@author   :Bilal
 * @date     :23-Aug-2017
 * @code     :for getting total refund of ipd patient***/
function getTotalRefundAmountOfIPD(callfrom) {


	var datecallfrom =$("#datecallfrom").val();
	
	jQuery.ajax({
		type : "POST",
		url : "ehat/reportdashboard/getTotalRefundAmountOfIPD",
		data : {
			"callfrom" : callfrom,
			"datecallfrom" :datecallfrom

		},
		success : function(response) {
			var topdc = response;
			$("#total_ipd_refund_amt").text(topdc.toFixed(2));
			totalRef();
		}
	});
}
function getTotalRefundCashOfIPD(callfrom) {
	var datecallfrom = $("#datecallfrom").val();

	jQuery.ajax({
		type : "POST",
		url : "ehat/reportdashboard/getTotalRefundAmountOfIPD",
		data : {
			"callfrom" : callfrom,
			"datecallfrom" : datecallfrom

		},
		success : function(response) {
			var topdc = response;
			$("#cash_ipd_refund_amt").text(topdc.toFixed(2));
			totalRef();
		}
	});
}
function getTotalRefundCriditOfIPD(callfrom){
	var datecallfrom = $("#datecallfrom").val();

	jQuery.ajax({
		type : "POST",
		url : "ehat/reportdashboard/getTotalRefundAmountOfIPD",
		data : {
			"callfrom" : callfrom,
			"datecallfrom" : datecallfrom

		},
		success : function(response) {
			var topdc = response;
			$("#card_ipd_refund_amt").text(topdc.toFixed(2));
			totalRef();
		}
	});
}
/***********Refund ipd*****************/

/**********From date to date**************/

/**@author  :Bilal
 * @date    :23-Aug-2017
 * @code    :when we call from date to date**/
function setFromDateToDate(callfrom){

	
	$("#datecallfrom").val(callfrom);
	
	getTotalAmountOfOPDDateWise('total');
	getTotalCashOfOPDDateWise('cash');
	getTotalChequeCardOfOPDDateWise('card');
	
	getTotalAmountOfIPDDateWise('total');
	getTotalCashOfIPDDateWise('cash');
	getTotalChequeCardOfIPDDateWise('card');
	
	getTotalRefundAmountOfOPDDateWise('total');
	getTotalRefundCashOfOPDDateWise('cash');
	getTotalRefundCriditOfOPDDateWise('card');
	
	getTotalRefundAmountOfIPDDateWise('total');
	getTotalRefundCashOfIPDDateWise('cash');
	getTotalRefundCriditOfIPDDateWise('card');
	
	getTotalPatientOPDDatewise('totalp') ;
	getTotalPatientOPDDatewiseActive('activep');
	getTotalPatientOPDDatewiseInActive('inactivep');
	
	getTotalPatientIPDDatewise('totalp') ;
	getTotalPatientIPDDatewiseActive('activep');
	getTotalPatientIPDDatewiseInActive('inactivep');
	
	getTotalPatientDiagnosticsDatewise('totalp') ;
	getTotalPatientDiagnosticsDatewiseActive('activep');
	getTotalPatientDiagnosticsDatewiseInActive('inactivep');
	
	//loadPopUp();
}
/************OPD*from date to date********************/
//total
function getTotalAmountOfOPDDateWise(callfrom){
	var datecallfrom=$("#datecallfrom").val(callfrom);
	var fromDate = $("#inputFromDate").val();
	var toDate = $("#inputToDate").val();
	
   if (fromDate == "" || fromDate == undefined) {
		alert("Please Select From Date!");
		$("#inputFromDate").val("");
		SetFocus("inputFromDate");
		return false;
	}
   if (toDate == "" || toDate == undefined) {
		alert("Please Select To Date!");
		$("#inputToDate").val("");
		SetFocus("inputToDate");
		return false;
	}
	var inputs = [];
	
	inputs.push('fromDate=' + fromDate);
	inputs.push('toDate=' + toDate);
	inputs.push('callfrom=' + callfrom);
	inputs.push('datecallfrom=' + datecallfrom);
	

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/reportdashboard/getTotalAmountDateWise",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(response) {
			var topdc = response;
			$("#total_opd_collection").text(topdc.toFixed(2));
			total();
		}
	});
}
//cash
function getTotalCashOfOPDDateWise(callfrom){
	var datecallfrom=$("#datecallfrom").val(callfrom);
	var fromDate = $("#inputFromDate").val();
	var toDate = $("#inputToDate").val();
	
   if (fromDate == "" || fromDate == undefined) {
		alert("Please Select From Date!");
		$("#inputFromDate").val("");
		SetFocus("inputFromDate");
		return false;
	}
   if (toDate == "" || toDate == undefined) {
		alert("Please Select To Date!");
		$("#inputToDate").val("");
		SetFocus("inputToDate");
		return false;
	}
	var inputs = [];
	
	inputs.push('fromDate=' + fromDate);
	inputs.push('toDate=' + toDate);
	inputs.push('callfrom=' + callfrom);
	inputs.push('datecallfrom=' + datecallfrom);
	

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/reportdashboard/getTotalAmountDateWise",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(response) {
			var topdc = response;
		
			$("#cash_opd_collection").text(topdc.toFixed(2));
			total();
		}
	});
}
//ChequeCard
function getTotalChequeCardOfOPDDateWise(callfrom){
	var datecallfrom=$("#datecallfrom").val(callfrom);
	var fromDate = $("#inputFromDate").val();
	var toDate = $("#inputToDate").val();
	
   if (fromDate == "" || fromDate == undefined) {
		alert("Please Select From Date!");
		$("#inputFromDate").val("");
		SetFocus("inputFromDate");
		return false;
	}
   if (toDate == "" || toDate == undefined) {
		alert("Please Select To Date!");
		$("#inputToDate").val("");
		SetFocus("inputToDate");
		return false;
	}
	var inputs = [];
	
	inputs.push('fromDate=' + fromDate);
	inputs.push('toDate=' + toDate);
	inputs.push('callfrom=' + callfrom);
	inputs.push('datecallfrom=' + datecallfrom);
	

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/reportdashboard/getTotalAmountDateWise",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(response) {
			var topdc = response;
			$("#cheque_card_opd_collection").text(topdc.toFixed(2));
			total();
		}
	});
}

/************OPD*from date to date********************/

/************IPD*from date to date********************/

//total IPD
function getTotalAmountOfIPDDateWise(callfrom){
	var datecallfrom=$("#datecallfrom").val(callfrom);
	var fromDate = $("#inputFromDate").val();
	var toDate = $("#inputToDate").val();
	
   if (fromDate == "" || fromDate == undefined) {
		alert("Please Select From Date!");
		$("#inputFromDate").val("");
		SetFocus("inputFromDate");
		return false;
	}
   if (toDate == "" || toDate == undefined) {
		alert("Please Select To Date!");
		$("#inputToDate").val("");
		SetFocus("inputToDate");
		return false;
	}
	var inputs = [];
	
	inputs.push('fromDate=' + fromDate);
	inputs.push('toDate=' + toDate);
	inputs.push('callfrom=' + callfrom);
	inputs.push('datecallfrom=' + datecallfrom);
	

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/reportdashboard/getTotalAmountDateWiseIPD",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(response) {
			var topdc = response;
			$("#total_ipd_collection").text(topdc.toFixed(2));
			total();
		}
	});
}
//cash IPD
function getTotalCashOfIPDDateWise(callfrom){
	var datecallfrom=$("#datecallfrom").val(callfrom);
	var fromDate = $("#inputFromDate").val();
	var toDate = $("#inputToDate").val();
	
   if (fromDate == "" || fromDate == undefined) {
		alert("Please Select From Date!");
		$("#inputFromDate").val("");
		SetFocus("inputFromDate");
		return false;
	}
   if (toDate == "" || toDate == undefined) {
		alert("Please Select To Date!");
		$("#inputToDate").val("");
		SetFocus("inputToDate");
		return false;
	}
	var inputs = [];
	
	inputs.push('fromDate=' + fromDate);
	inputs.push('toDate=' + toDate);
	inputs.push('callfrom=' + callfrom);
	inputs.push('datecallfrom=' + datecallfrom);
	

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/reportdashboard/getTotalAmountDateWiseIPD",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(response) {
			var topdc = response;
			$("#cash_ipd_collection").text(topdc.toFixed(2));
			total();
		}
	});
}
//ChequeCard IPD
function getTotalChequeCardOfIPDDateWise(callfrom){
	var datecallfrom=$("#datecallfrom").val(callfrom);
	var fromDate = $("#inputFromDate").val();
	var toDate = $("#inputToDate").val();
	
   if (fromDate == "" || fromDate == undefined) {
		alert("Please Select From Date!");
		$("#inputFromDate").val("");
		SetFocus("inputFromDate");
		return false;
	}
   if (toDate == "" || toDate == undefined) {
		alert("Please Select To Date!");
		$("#inputToDate").val("");
		SetFocus("inputToDate");
		return false;
	}
	var inputs = [];
	
	inputs.push('fromDate=' + fromDate);
	inputs.push('toDate=' + toDate);
	inputs.push('callfrom=' + callfrom);
	inputs.push('datecallfrom=' + datecallfrom);
	

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/reportdashboard/getTotalAmountDateWiseIPD",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(response) {
			var topdc = response;
			$("#cheque_card_ipd_collection").text(topdc.toFixed(2));
			total();
		}
	});
}

/**********From date to date**************/

/************OPD Refund*from date to date********************/

//total
function getTotalRefundAmountOfOPDDateWise(callfrom){
	var datecallfrom=$("#datecallfrom").val(callfrom);
	var fromDate = $("#inputFromDate").val();
	var toDate = $("#inputToDate").val();
	
 if (fromDate == "" || fromDate == undefined) {
		alert("Please Select From Date!");
		$("#inputFromDate").val("");
		SetFocus("inputFromDate");
		return false;
	}
 if (toDate == "" || toDate == undefined) {
		alert("Please Select To Date!");
		$("#inputToDate").val("");
		SetFocus("inputToDate");
		return false;
	}
	var inputs = [];
	
	inputs.push('fromDate=' + fromDate);
	inputs.push('toDate=' + toDate);
	inputs.push('callfrom=' + callfrom);
	inputs.push('datecallfrom=' + datecallfrom);
	

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/reportdashboard/getTotalRefundAmtDateWise",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(response) {
			var topdc = response;
			$("#total_opd_refund_amt").text(topdc.toFixed(2));
			totalRef();
		}
	});
}
//cash
function getTotalRefundCashOfOPDDateWise(callfrom){
	var datecallfrom=$("#datecallfrom").val(callfrom);
	var fromDate = $("#inputFromDate").val();
	var toDate = $("#inputToDate").val();
	
 if (fromDate == "" || fromDate == undefined) {
		alert("Please Select From Date!");
		$("#inputFromDate").val("");
		SetFocus("inputFromDate");
		return false;
	}
 if (toDate == "" || toDate == undefined) {
		alert("Please Select To Date!");
		$("#inputToDate").val("");
		SetFocus("inputToDate");
		return false;
	}
	var inputs = [];
	
	inputs.push('fromDate=' + fromDate);
	inputs.push('toDate=' + toDate);
	inputs.push('callfrom=' + callfrom);
	inputs.push('datecallfrom=' + datecallfrom);
	

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/reportdashboard/getTotalRefundAmtDateWise",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(response) {
			var topdc = response;
		
			$("#cash_opd_refund_amt").text(topdc.toFixed(2));
			totalRef();
		}
	});
}
//ChequeCard
function getTotalRefundCriditOfOPDDateWise(callfrom){
	var datecallfrom=$("#datecallfrom").val(callfrom);
	var fromDate = $("#inputFromDate").val();
	var toDate = $("#inputToDate").val();
	
 if (fromDate == "" || fromDate == undefined) {
		alert("Please Select From Date!");
		$("#inputFromDate").val("");
		SetFocus("inputFromDate");
		return false;
	}
 if (toDate == "" || toDate == undefined) {
		alert("Please Select To Date!");
		$("#inputToDate").val("");
		SetFocus("inputToDate");
		return false;
	}
	var inputs = [];
	
	inputs.push('fromDate=' + fromDate);
	inputs.push('toDate=' + toDate);
	inputs.push('callfrom=' + callfrom);
	inputs.push('datecallfrom=' + datecallfrom);
	

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/reportdashboard/getTotalRefundAmtDateWise",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(response) {
			var topdc = response;
			$("#card_opd_refund_amt").text(topdc.toFixed(2));
			totalRef();
		}
	});
}

/************OPD Refund*from date to date********************/



/************IPD Refund*from date to date********************/

//total
function getTotalRefundAmountOfIPDDateWise(callfrom){
	var datecallfrom=$("#datecallfrom").val(callfrom);
	var fromDate = $("#inputFromDate").val();
	var toDate = $("#inputToDate").val();
	
if (fromDate == "" || fromDate == undefined) {
		alert("Please Select From Date!");
		$("#inputFromDate").val("");
		SetFocus("inputFromDate");
		return false;
	}
if (toDate == "" || toDate == undefined) {
		alert("Please Select To Date!");
		$("#inputToDate").val("");
		SetFocus("inputToDate");
		return false;
	}
	var inputs = [];
	
	inputs.push('fromDate=' + fromDate);
	inputs.push('toDate=' + toDate);
	inputs.push('callfrom=' + callfrom);
	inputs.push('datecallfrom=' + datecallfrom);
	

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/reportdashboard/getTotalRefundAmtDateWiseIPD",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(response) {
			var topdc = response;
			$("#total_ipd_refund_amt").text(topdc.toFixed(2));
			totalRef();
		}
	});
}
//cash
function getTotalRefundCashOfIPDDateWise(callfrom){
	var datecallfrom=$("#datecallfrom").val(callfrom);
	var fromDate = $("#inputFromDate").val();
	var toDate = $("#inputToDate").val();
	
if (fromDate == "" || fromDate == undefined) {
		alert("Please Select From Date!");
		$("#inputFromDate").val("");
		SetFocus("inputFromDate");
		return false;
	}
if (toDate == "" || toDate == undefined) {
		alert("Please Select To Date!");
		$("#inputToDate").val("");
		SetFocus("inputToDate");
		return false;
	}
	var inputs = [];
	
	inputs.push('fromDate=' + fromDate);
	inputs.push('toDate=' + toDate);
	inputs.push('callfrom=' + callfrom);
	inputs.push('datecallfrom=' + datecallfrom);
	

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/reportdashboard/getTotalRefundAmtDateWiseIPD",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(response) {
			var topdc = response;
		
			$("#cash_ipd_refund_amt").text(topdc.toFixed(2));
			totalRef();
		}
	});
}
//ChequeCard
function getTotalRefundCriditOfIPDDateWise(callfrom){
	var datecallfrom=$("#datecallfrom").val(callfrom);
	var fromDate = $("#inputFromDate").val();
	var toDate = $("#inputToDate").val();
	
if (fromDate == "" || fromDate == undefined) {
		alert("Please Select From Date!");
		$("#inputFromDate").val("");
		SetFocus("inputFromDate");
		return false;
	}
if (toDate == "" || toDate == undefined) {
		alert("Please Select To Date!");
		$("#inputToDate").val("");
		SetFocus("inputToDate");
		return false;
	}
	var inputs = [];
	
	inputs.push('fromDate=' + fromDate);
	inputs.push('toDate=' + toDate);
	inputs.push('callfrom=' + callfrom);
	inputs.push('datecallfrom=' + datecallfrom);
	

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/reportdashboard/getTotalRefundAmtDateWiseIPD",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(response) {
			var topdc = response;
			$("#card_ipd_refund_amt").text(topdc.toFixed(2));
			totalRef();
		}
	});
}

/************IPD Refund*from date to date********************/

/***********OPD Total Patient ******************************/
function getTotalPatientOPD(callfrom) {//All P

	var datecallfrom = $("#datecallfrom").val();

	jQuery.ajax({
		type : "POST",
		url : "ehat/reportdashboard/getTotalPatientOPD",
		data : {
			"callfrom" : callfrom,
			"datecallfrom" : datecallfrom

		},
		success : function(response) {

			var topdc = response;
			
			$("#total_opd_patients").text(topdc);
			totalPat();
		}
	});
}
function getTotalPatientOPDActive(callfrom) {//Active

	var datecallfrom = $("#datecallfrom").val();

	jQuery.ajax({
		type : "POST",
		url : "ehat/reportdashboard/getTotalPatientOPD",
		data : {
			"callfrom" : callfrom,
			"datecallfrom" : datecallfrom

		},
		success : function(response) {

			var topdc = response;
			
			$("#cash_opd_patients").text(topdc);
			totalPat();
		}
	});
}

function getTotalPatientOPDInActive(callfrom) {//inactive 

	var datecallfrom = $("#datecallfrom").val();

	jQuery.ajax({
		type : "POST",
		url : "ehat/reportdashboard/getTotalPatientOPD",
		data : {
			"callfrom" : callfrom,
			"datecallfrom" : datecallfrom

		},
		success : function(response) {

			var topdc = response;
			
			$("#cheque_card_opd_patients").text(topdc);
			totalPat();
		}
	});
}
/** *********OPD Total Patient ***************************** */

/***********IPD Total Patient ******************************/

function getTotalPatientIPD(callfrom) {

	var datecallfrom = $("#datecallfrom").val();

	jQuery.ajax({
		type : "POST",
		url : "ehat/reportdashboard/getTotalPatientIPD",
		data : {
			"callfrom" : callfrom,
			"datecallfrom" : datecallfrom

		},
		success : function(response) {

			var topdc = response;
			
			$("#total_ipd_patients").text(topdc);
			totalPat();
		}
	});
}
function getTotalPatientIPDActive(callfrom) {

	var datecallfrom = $("#datecallfrom").val();

	jQuery.ajax({
		type : "POST",
		url : "ehat/reportdashboard/getTotalPatientIPD",
		data : {
			"callfrom" : callfrom,
			"datecallfrom" : datecallfrom

		},
		success : function(response) {

			var topdc = response;
			
			$("#cash_ipd_patients").text(topdc);
			totalPat();
		}
	});
}
function getTotalPatientIPDInActive(callfrom) {

	var datecallfrom = $("#datecallfrom").val();

	jQuery.ajax({
		type : "POST",
		url : "ehat/reportdashboard/getTotalPatientIPD",
		data : {
			"callfrom" : callfrom,
			"datecallfrom" : datecallfrom

		},
		success : function(response) {

			var topdc = response;
			
			$("#cheque_card_ipd_patients").text(topdc);
			totalPat();
		}
	});
}
/** *********IPD Total Patient ***************************** */

/***********Daignostics Total Patient ******************************/

function getTotalPatientDiagnostics(callfrom) {

	var datecallfrom = $("#datecallfrom").val();

	jQuery.ajax({
		type : "POST",
		url : "ehat/reportdashboard/getTotalPatientDiagnostics",
		data : {
			"callfrom" : callfrom,
			"datecallfrom" : datecallfrom

		},
		success : function(response) {

			var topdc = response;
			
			$("#total_diag_patients").text(topdc);
			totalPat();
		}
	});
}
function getTotalPatientDiagnosticsActive(callfrom) {

	var datecallfrom = $("#datecallfrom").val();

	jQuery.ajax({
		type : "POST",
		url : "ehat/reportdashboard/getTotalPatientDiagnostics",
		data : {
			"callfrom" : callfrom,
			"datecallfrom" : datecallfrom

		},
		success : function(response) {

			var topdc = response;
			
			$("#cash_diag_patients").text(topdc);
			totalPat();
		}
	});
}

function getTotalPatientDiagnosticsInActive(callfrom) {

	var datecallfrom = $("#datecallfrom").val();

	jQuery.ajax({
		type : "POST",
		url : "ehat/reportdashboard/getTotalPatientDiagnostics",
		data : {
			"callfrom" : callfrom,
			"datecallfrom" : datecallfrom

		},
		success : function(response) {

			var topdc = response;
			
			$("#cheque_card_diag_patients").text(topdc);
			totalPat();
		}
	});
}
/** *********Daignostics Total Patient ***************************** */

/***********OPD Total Patient from date to date******************************/
function getTotalPatientOPDDatewise(callfrom) {
	
	var datecallfrom = $("#datecallfrom").val();
	var fromDate = $("#inputFromDate").val();
	var toDate = $("#inputToDate").val();

	if (fromDate == "" || fromDate == undefined) {
		alert("Please Select From Date!");
		$("#inputFromDate").val("");
		SetFocus("inputFromDate");
		return false;
	}
	if (toDate == "" || toDate == undefined) {
		alert("Please Select To Date!");
		$("#inputToDate").val("");
		SetFocus("inputToDate");
		return false;
	}
	var inputs = [];

	inputs.push('fromDate=' + fromDate);
	inputs.push('toDate=' + toDate);
	inputs.push('callfrom=' + callfrom);
	inputs.push('datecallfrom=' + datecallfrom);

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/reportdashboard/getTotalPatientOPDDatewise",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(response) {
			var topdc = response;
			$("#total_opd_patients").text(topdc);
			totalPat();
		}
	});
}
function getTotalPatientOPDDatewiseActive(callfrom) {

	var datecallfrom = $("#datecallfrom").val();
	var fromDate = $("#inputFromDate").val();
	var toDate = $("#inputToDate").val();

	if (fromDate == "" || fromDate == undefined) {
		alert("Please Select From Date!");
		$("#inputFromDate").val("");
		SetFocus("inputFromDate");
		return false;
	}
	if (toDate == "" || toDate == undefined) {
		alert("Please Select To Date!");
		$("#inputToDate").val("");
		SetFocus("inputToDate");
		return false;
	}
	var inputs = [];

	inputs.push('fromDate=' + fromDate);
	inputs.push('toDate=' + toDate);
	inputs.push('callfrom=' + callfrom);
	inputs.push('datecallfrom=' + datecallfrom);

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/reportdashboard/getTotalPatientOPDDatewise",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(response) {
			var topdc = response;
			$("#cash_opd_patients").text(topdc);
			totalPat();
		}
	});
}
function getTotalPatientOPDDatewiseInActive(callfrom) {

	var datecallfrom = $("#datecallfrom").val();
	var fromDate = $("#inputFromDate").val();
	var toDate = $("#inputToDate").val();

	if (fromDate == "" || fromDate == undefined) {
		alert("Please Select From Date!");
		$("#inputFromDate").val("");
		SetFocus("inputFromDate");
		return false;
	}
	if (toDate == "" || toDate == undefined) {
		alert("Please Select To Date!");
		$("#inputToDate").val("");
		SetFocus("inputToDate");
		return false;
	}
	var inputs = [];

	inputs.push('fromDate=' + fromDate);
	inputs.push('toDate=' + toDate);
	inputs.push('callfrom=' + callfrom);
	inputs.push('datecallfrom=' + datecallfrom);

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/reportdashboard/getTotalPatientOPDDatewise",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(response) {
			var topdc = response;
			$("#cheque_card_opd_patients").text(topdc);
			totalPat();
		}
	});
}
/** *********OPD Total Patient from date to date***************************** */

/***********IPD Total Patient from date to date******************************/
function getTotalPatientIPDDatewise(callfrom) {
	
	var datecallfrom = $("#datecallfrom").val();
	var fromDate = $("#inputFromDate").val();
	var toDate = $("#inputToDate").val();

	if (fromDate == "" || fromDate == undefined) {
		alert("Please Select From Date!");
		$("#inputFromDate").val("");
		SetFocus("inputFromDate");
		return false;
	}
	if (toDate == "" || toDate == undefined) {
		alert("Please Select To Date!");
		$("#inputToDate").val("");
		SetFocus("inputToDate");
		return false;
	}
	var inputs = [];

	inputs.push('fromDate=' + fromDate);
	inputs.push('toDate=' + toDate);
	inputs.push('callfrom=' + callfrom);
	inputs.push('datecallfrom=' + datecallfrom);

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/reportdashboard/getTotalPatientIPDDatewise",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(response) {
			var topdc = response;
			$("#total_ipd_patients").text(topdc);
			totalPat();
		}
	});
}
function getTotalPatientIPDDatewiseActive(callfrom) {

	var datecallfrom = $("#datecallfrom").val();
	var fromDate = $("#inputFromDate").val();
	var toDate = $("#inputToDate").val();

	if (fromDate == "" || fromDate == undefined) {
		alert("Please Select From Date!");
		$("#inputFromDate").val("");
		SetFocus("inputFromDate");
		return false;
	}
	if (toDate == "" || toDate == undefined) {
		alert("Please Select To Date!");
		$("#inputToDate").val("");
		SetFocus("inputToDate");
		return false;
	}
	var inputs = [];

	inputs.push('fromDate=' + fromDate);
	inputs.push('toDate=' + toDate);
	inputs.push('callfrom=' + callfrom);
	inputs.push('datecallfrom=' + datecallfrom);

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/reportdashboard/getTotalPatientIPDDatewise",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(response) {
			var topdc = response;
			$("#cash_ipd_patients").text(topdc);
			totalPat();
		}
	});
}
function getTotalPatientIPDDatewiseInActive(callfrom) {

	var datecallfrom = $("#datecallfrom").val();
	var fromDate = $("#inputFromDate").val();
	var toDate = $("#inputToDate").val();

	if (fromDate == "" || fromDate == undefined) {
		alert("Please Select From Date!");
		$("#inputFromDate").val("");
		SetFocus("inputFromDate");
		return false;
	}
	if (toDate == "" || toDate == undefined) {
		alert("Please Select To Date!");
		$("#inputToDate").val("");
		SetFocus("inputToDate");
		return false;
	}
	var inputs = [];

	inputs.push('fromDate=' + fromDate);
	inputs.push('toDate=' + toDate);
	inputs.push('callfrom=' + callfrom);
	inputs.push('datecallfrom=' + datecallfrom);

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/reportdashboard/getTotalPatientIPDDatewise",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(response) {
			var topdc = response;
			$("#cheque_card_ipd_patients").text(topdc);
			totalPat();
		}
	});
}
/** *********IPD Total Patient from date to date***************************** */

/***********Diagnostics Total Patient from date to date******************************/

function getTotalPatientDiagnosticsDatewise(callfrom) {
	
	var datecallfrom = $("#datecallfrom").val();
	var fromDate = $("#inputFromDate").val();
	var toDate = $("#inputToDate").val();

	if (fromDate == "" || fromDate == undefined) {
		alert("Please Select From Date!");
		$("#inputFromDate").val("");
		SetFocus("inputFromDate");
		return false;
	}
	if (toDate == "" || toDate == undefined) {
		alert("Please Select To Date!");
		$("#inputToDate").val("");
		SetFocus("inputToDate");
		return false;
	}
	var inputs = [];

	inputs.push('fromDate=' + fromDate);
	inputs.push('toDate=' + toDate);
	inputs.push('callfrom=' + callfrom);
	inputs.push('datecallfrom=' + datecallfrom);

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/reportdashboard/getTotalPatientDiagnosticsDatewise",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(response) {
			var topdc = response;
			$("#total_diag_patients").text(topdc);
			totalPat();
		}
	});
}
function getTotalPatientDiagnosticsDatewiseActive(callfrom) {

	var datecallfrom = $("#datecallfrom").val();
	var fromDate = $("#inputFromDate").val();
	var toDate = $("#inputToDate").val();

	if (fromDate == "" || fromDate == undefined) {
		alert("Please Select From Date!");
		$("#inputFromDate").val("");
		SetFocus("inputFromDate");
		return false;
	}
	if (toDate == "" || toDate == undefined) {
		alert("Please Select To Date!");
		$("#inputToDate").val("");
		SetFocus("inputToDate");
		return false;
	}
	var inputs = [];

	inputs.push('fromDate=' + fromDate);
	inputs.push('toDate=' + toDate);
	inputs.push('callfrom=' + callfrom);
	inputs.push('datecallfrom=' + datecallfrom);

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/reportdashboard/getTotalPatientDiagnosticsDatewise",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(response) {
			var topdc = response;
			$("#cash_diag_patients").text(topdc);
			totalPat();
		}
	});
}
function getTotalPatientDiagnosticsDatewiseInActive(callfrom) {

	var datecallfrom = $("#datecallfrom").val();
	var fromDate = $("#inputFromDate").val();
	var toDate = $("#inputToDate").val();

	if (fromDate == "" || fromDate == undefined) {
		alert("Please Select From Date!");
		$("#inputFromDate").val("");
		SetFocus("inputFromDate");
		return false;
	}
	if (toDate == "" || toDate == undefined) {
		alert("Please Select To Date!");
		$("#inputToDate").val("");
		SetFocus("inputToDate");
		return false;
	}
	var inputs = [];

	inputs.push('fromDate=' + fromDate);
	inputs.push('toDate=' + toDate);
	inputs.push('callfrom=' + callfrom);
	inputs.push('datecallfrom=' + datecallfrom);

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/reportdashboard/getTotalPatientDiagnosticsDatewise",
		error : function() {
			alert('Network Issue!!!');
		},
		success : function(response) {
			var topdc = response;
			$("#cheque_card_diag_patients").text(topdc);
			totalPat();
		}
	});
}
/** *********OPD Total Patient from date to date***************************** */

/************Total caculation of Collection Summary *************************************************/
/***@author  :Bilal
 * @date     :28-08-2017
 * @code     :for total calculations**/
 function total(){
	//total amount
	 var t_opd_c=parseFloat($('#total_opd_collection').text());
	 var t_ipd_c=parseFloat($('#total_ipd_collection').text());
	 var t_ph_c =parseFloat($("#total_ph_collection").text());
	 var t_diag_c=parseFloat($("#total_diag_collection").text());
	 if (t_opd_c == "" || t_opd_c == null || t_opd_c == undefined || isNaN(t_opd_c)) {
		 t_opd_c = 0.0;
		}
	 if (t_ipd_c == "" || t_ipd_c == null || t_ipd_c == undefined || isNaN(t_ipd_c)) {
		 t_ipd_c =  0.0;
		}
	 if (t_ph_c == "" || t_ph_c == null || t_ph_c == undefined || isNaN(t_ph_c)) {
		 t_ph_c =  0.0;
		}
	 if (t_diag_c == "" || t_diag_c == null || t_diag_c == undefined || isNaN(t_diag_c)) {
		 t_diag_c =  0.0;
		}
	 
	 var total= (t_opd_c) + (t_ipd_c) + (t_ph_c)+ (t_diag_c);
	
	 $('#total_co_t').text(total.toFixed(2));
	 
	//total cash amount
	 var t_opd_cash=parseFloat($('#cash_opd_collection').text());
	 var t_ipd_cash=parseFloat($('#cash_ipd_collection').text());
	 var t_ph_cash =parseFloat($("#cash_ph_collection").text());
	 var t_diag_cash=parseFloat($("#cash_diag_collection").text());
	 if (t_opd_cash == "" || t_opd_cash == null || t_opd_cash == undefined || isNaN(t_opd_cash)) {
		 t_opd_cash = 0.0;
		}
	 if (t_ipd_cash == "" || t_ipd_cash == null || t_ipd_cash == undefined || isNaN(t_ipd_cash)) {
		 t_ipd_cash =  0.0;
		}
	 if (t_ph_cash == "" || t_ph_cash == null || t_ph_cash == undefined || isNaN(t_ph_cash)) {
		 t_ph_cash =  0.0;
		}
	 if (t_diag_cash == "" || t_diag_cash == null || t_diag_cash == undefined || isNaN(t_diag_cash)) {
		 t_diag_cash =  0.0;
		}
	 
	 var totalcash= (t_opd_cash) + (t_ipd_cash) + (t_ph_cash)+ (t_diag_cash);
	
	 $('#total_co_cash').text(totalcash.toFixed(2));
	 
	//total card and cheque amount
	 var t_opd_card=parseFloat($('#cheque_card_opd_collection').text());
	 var t_ipd_card=parseFloat($('#cheque_card_ipd_collection').text());
	 var t_ph_card =parseFloat($("#cheque_card_ph_collection").text());
	 var t_diag_card=parseFloat($("#cheque_card_diag_collection").text());
	 
	 if (t_opd_card == "" || t_opd_card == null || t_opd_card == undefined || isNaN(t_opd_card)) {
		 t_opd_card = 0.0;
		}
	 if (t_ipd_card == "" || t_ipd_card == null || t_ipd_card == undefined || isNaN(t_ipd_card)) {
		 t_ipd_card =  0.0;
		}
	 if (t_ph_card == "" || t_ph_card == null || t_ph_card == undefined || isNaN(t_ph_card)) {
		 t_ph_card =  0.0;
		}
	 if (t_diag_card == "" || t_diag_card == null || t_diag_card == undefined || isNaN(t_diag_card)) {
		 t_diag_card =  0.0;
		}
	 
	 var totalCard= (t_opd_card) + (t_ipd_card) + (t_ph_card)+ (t_diag_card);
	
	 $('#total_co_chequecard').text(totalCard.toFixed(2));
 }
/************Total caculation of Collection Summary *************************************************/
 
 /************Total caculation of Refund Summary *************************************************/
 /***@author  :Bilal
  * @date     :28-08-2017
  * @code     :for total calculations Refund Summary**/
  function totalRef(){
 	//total amount
 	 var t_opd_c=parseFloat($('#total_opd_refund_amt').text());
 	 var t_ipd_c=parseFloat($('#total_ipd_refund_amt').text());
 	 var t_ph_c =parseFloat($("#total_ph_refund_amt").text());
 	 var t_diag_c=parseFloat($("#total_diag_refund_amt").text());
 	 if (t_opd_c == "" || t_opd_c == null || t_opd_c == undefined || isNaN(t_opd_c)) {
 		 t_opd_c = 0.0;
 		}
 	 if (t_ipd_c == "" || t_ipd_c == null || t_ipd_c == undefined || isNaN(t_ipd_c)) {
 		 t_ipd_c =  0.0;
 		}
 	 if (t_ph_c == "" || t_ph_c == null || t_ph_c == undefined || isNaN(t_ph_c)) {
 		 t_ph_c =  0.0;
 		}
 	 if (t_diag_c == "" || t_diag_c == null || t_diag_c == undefined || isNaN(t_diag_c)) {
 		 t_diag_c =  0.0;
 		}
 	 
 	 var total= (t_opd_c) + (t_ipd_c) + (t_ph_c)+ (t_diag_c);
 	
 	 $('#total_re_t').text(total.toFixed(2));
 	 
 	//total cash amount
 	 var t_opd_cash=parseFloat($('#cash_opd_refund_amt').text());
 	 var t_ipd_cash=parseFloat($('#cash_ipd_refund_amt').text());
 	 var t_ph_cash =parseFloat($("#cash_ph_refund_amt").text());
 	 var t_diag_cash=parseFloat($("#cash_diag_refund_amt").text());
 	 if (t_opd_cash == "" || t_opd_cash == null || t_opd_cash == undefined || isNaN(t_opd_cash)) {
 		 t_opd_cash = 0.0;
 		}
 	 if (t_ipd_cash == "" || t_ipd_cash == null || t_ipd_cash == undefined || isNaN(t_ipd_cash)) {
 		 t_ipd_cash =  0.0;
 		}
 	 if (t_ph_cash == "" || t_ph_cash == null || t_ph_cash == undefined || isNaN(t_ph_cash)) {
 		 t_ph_cash =  0.0;
 		}
 	 if (t_diag_cash == "" || t_diag_cash == null || t_diag_cash == undefined || isNaN(t_diag_cash)) {
 		 t_diag_cash =  0.0;
 		}
 	 
 	 var totalcash= (t_opd_cash) + (t_ipd_cash) + (t_ph_cash)+ (t_diag_cash);
 	
 	 $('#total_re_cash').text(totalcash.toFixed(2));
 	 
 	//total card and cheque amount
 	 var t_opd_card=parseFloat($('#card_opd_refund_amt').text());
 	 var t_ipd_card=parseFloat($('#card_ipd_refund_amt').text());
 	 var t_ph_card =parseFloat($("#card_ph_refund_amt").text());
 	 var t_diag_card=parseFloat($("#card_diag_refund_amt").text());
 	 
 	 if (t_opd_card == "" || t_opd_card == null || t_opd_card == undefined || isNaN(t_opd_card)) {
 		 t_opd_card = 0.0;
 		}
 	 if (t_ipd_card == "" || t_ipd_card == null || t_ipd_card == undefined || isNaN(t_ipd_card)) {
 		 t_ipd_card =  0.0;
 		}
 	 if (t_ph_card == "" || t_ph_card == null || t_ph_card == undefined || isNaN(t_ph_card)) {
 		 t_ph_card =  0.0;
 		}
 	 if (t_diag_card == "" || t_diag_card == null || t_diag_card == undefined || isNaN(t_diag_card)) {
 		 t_diag_card =  0.0;
 		}
 	 
 	 var totalCard= (t_opd_card) + (t_ipd_card) + (t_ph_card)+ (t_diag_card);
 	
 	 $('#total_re_chequecard').text(totalCard.toFixed(2));
  }
 /************Total caculation of Refund Summary *************************************************/
  
  /************Total caculation of Patient Details *************************************************/
  /***@author  :Bilal
   * @date     :28-08-2017
   * @code     :for total calculations Patient Details**/
   function totalPat(){
  	//total amount
  	 var t_opd_c=parseFloat($('#total_opd_patients').text());
  	 var t_ipd_c=parseFloat($('#total_ipd_patients').text());
  	 var t_ph_c =parseFloat($("#total_diag_patients").text());
  
  	 if (t_opd_c == "" || t_opd_c == null || t_opd_c == undefined || isNaN(t_opd_c)) {
  		 t_opd_c = 0.0;
  		}
  	 if (t_ipd_c == "" || t_ipd_c == null || t_ipd_c == undefined || isNaN(t_ipd_c)) {
  		 t_ipd_c =  0.0;
  		}
  	 if (t_ph_c == "" || t_ph_c == null || t_ph_c == undefined || isNaN(t_ph_c)) {
  		 t_ph_c =  0.0;
  		}
  	
  	 
  	 var total= (t_opd_c) + (t_ipd_c) + (t_ph_c);
  	
  	 $('#total_patients').text(total);
  	 
  	//total Active p
  	 var t_opd_cash=parseFloat($('#cash_opd_patients').text());
  	 var t_ipd_cash=parseFloat($('#cash_ipd_patients').text());
  	 var t_ph_cash =parseFloat($("#cash_diag_patients").text());
  	
  	 if (t_opd_cash == "" || t_opd_cash == null || t_opd_cash == undefined || isNaN(t_opd_cash)) {
  		 t_opd_cash = 0.0;
  		}
  	 if (t_ipd_cash == "" || t_ipd_cash == null || t_ipd_cash == undefined || isNaN(t_ipd_cash)) {
  		 t_ipd_cash =  0.0;
  		}
  	 if (t_ph_cash == "" || t_ph_cash == null || t_ph_cash == undefined || isNaN(t_ph_cash)) {
  		 t_ph_cash =  0.0;
  		}
  	 
  	 
  	 var totalcash= (t_opd_cash) + (t_ipd_cash) + (t_ph_cash);
  	
  	 $('#total_patients_active').text(totalcash);
  	 
  	//total In Active Pate
  	 var t_opd_card=parseFloat($('#cheque_card_opd_patients').text());
  	 var t_ipd_card=parseFloat($('#cheque_card_ipd_patients').text());
  	 var t_ph_card =parseFloat($("#cheque_card_diag_patients").text());
  	 
  	 
  	 if (t_opd_card == "" || t_opd_card == null || t_opd_card == undefined || isNaN(t_opd_card)) {
  		 t_opd_card = 0.0;
  		}
  	 if (t_ipd_card == "" || t_ipd_card == null || t_ipd_card == undefined || isNaN(t_ipd_card)) {
  		 t_ipd_card =  0.0;
  		}
  	 if (t_ph_card == "" || t_ph_card == null || t_ph_card == undefined || isNaN(t_ph_card)) {
  		 t_ph_card =  0.0;
  		}
  	
  	 
  	 var totalCard= (t_opd_card) + (t_ipd_card) + (t_ph_card);
  	
  	 $('#total_patients_Inactive').text(totalCard);
   }
  /************Total caculation of Patient Details*************************************************/

function loadPopUp() {
	alert("Hi");
	var from = $("#inputFromDate").val();
	var to = $("#inputToDate").val();
	if (from != '' && to != '') {
		var inputs = [];
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			//url : "ehat/reportdashboard/getTotalPatientDiagnosticsDatewise",
			url : "ehat/report/getTotalSale",
			error : function() {
				alert("error");
			},
			success : function(r) {
				console.log(r);
				//$("#daily_sale").show();
				//setPartyResult(r);
			}
		});
		return true;
	} else {
		alertify.error('Please Fill All the Details');
	}
}