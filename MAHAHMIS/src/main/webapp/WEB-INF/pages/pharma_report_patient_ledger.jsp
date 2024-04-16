<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.io.File"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>E-Hat | Pharmacy</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">


<link rel="stylesheet" type="text/css"
	href="<c:url value="/pharmacy/resources/css/ehat_general.css"/>">
<link rel="stylesheet" type="text/css"
	href="<c:url value="/pharmacy/resources/css/default.css"/>"
	id="skin-switcher">
<link rel="stylesheet" type="text/css"
	href="<c:url value="/pharmacy/resources/css/responsive.css"/>">
<link
	href="<c:url value="/pharmacy/resources/bootstrap-dist/css/bootstrap.min.css"/>"
	rel="stylesheet" media="screen">
<link
	href="<c:url value="/pharmacy/resources/font-awesome/css/font-awesome.min.css"/>"
	rel="stylesheet">


<!-- JQUERY -->
<script
	src="<c:url value="/pharmacy/resources/jquery/jquery-2.1.1.js"/>"></script>
<!-- JQUERY UI-->
<script
	src="<c:url value="/pharmacy/resources/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"/>"></script>
<!-- BOOTSTRAP -->
<script
	src="<c:url value="/pharmacy/resources/bootstrap-dist/js/bootstrap.min.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/bootstrap-dist/js/bootstrap.js"/>"></script>


<link rel="stylesheet"
	href="<c:url value="/pharmacy/resources/alertify/alertify.core.css"/>" />
<link rel="stylesheet"
	href="<c:url value="/pharmacy/resources/alertify/alertify.default.css"/>"
	id="toggleCSS" />

<!--calender Files  -->
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"/>"></script>
<link type="text/css" rel="stylesheet"
	href="<c:url value="/pharmacy/resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"/>"
	media="screen"></link>

<!-- SLIMSCROLL -->
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"/>"></script>
<!-- BLOCK UI -->
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/jQuery-BlockUI/jquery.blockUI.min.js"/>"></script>

<script type="text/javascript" src="<c:url value="/js/report.js"/>"></script>

<script src="<c:url value="/pharmacy/resources/alertify.js"/>"></script>

<!-- for Developers  -->
<!-- <script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script> -->
<!-- <script type="text/javascript"
	src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/additional-methods.min.js"></script>
<script type="text/javascript" src="js/Admin.js"></script>
<script type="text/javascript" src="js/validate.js"></script> -->
<!-- /for Developers  -->

<!-- CUSTOM SCRIPT -->
<script
	src="<c:url value="/pharmacy/resources/js/auto/jquery.mockjax.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/auto/bootstrap-typeahead.js"/>"></script>

<script src="<c:url value="/pharmacy/resources/js/script.js"/>"></script>
<style type="text/css">
.table-fixed thead {
	width: 100%;
}

.table-fixed tbody {
	height: 400px;
	overflow-y: auto;
	width: 100%;
}

.table-fixed thead,.table-fixed tbody,.table-fixed th {
	display: block;
}

.table-fixed thead>tr>th {
	float: left;
	border-bottom-width: 0;
	height: 50px;
}

.table-fixed tbody>tr>td {
	width: 100px;
}
</style>

<style type="text/css">

/* Start by setting display:none to make this hidden.
   Then we position it in relation to the viewport window
   with position:fixed. Width, height, top and left speak
   speak for themselves. Background we set to 80% white with
   our animation centered, and no-repeating */
.ajaxmodal {
	display: none;
	position: fixed;
	z-index: 199000;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background: rgba(255, 255, 255, .8)
		url('/EhatEnterprise/pharmacy/resources/images/ajax_loader_blue_64.gif')
		50% 50% no-repeat;
}

/* When the body has the loading class, we turn
   the scrollbar off with overflow:hidden */
body.loading {
	overflow: hidden;
}

/* Anytime the body has the loading class, our
   ajaxmodal element will be visible */
body.loading .ajaxmodal {
	display: block;
}
</style>
</head>
<script>
	jQuery(document).ready(function() {
		//App.setPage("UserManagement"); //Set current page
		App.init(); //Initialise plugins and elements

	});

	jQuery(document).ajaxStart(function() {
		//alert("hi ajax start");
		$("body").addClass("loading");
	});

	jQuery(document).ajaxStop(function() {
		$("body").removeClass("loading");
		//alert("hi ajax stop");
	});

	var total = 0;
	var total1 = 0;
	var total2= 0;
	var total3=0;
	//patient Sale
	function loadPopUp() {
		
		var from = $("#popup_container2").val();
		var to = $("#popup_container3").val();
		var hiddenPatientId = $("#hiddenPatientId").val();
		
		if ((from != null && to != "")) 
		{
		
		if ((hiddenPatientId != null && hiddenPatientId != "")) 
		{
			var inputs = [];
			inputs.push('from=' + from);
			inputs.push('to=' + to);
			inputs.push('hiddenPatientId=' + hiddenPatientId);
			var str = inputs.join('&');

			jQuery.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "../report/getPatientSaleDetailsByPatientId",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					$("#patient_ledger_report").show();
					setBatchWiseSaleResult(r);

				}
			});
			return true;
		}else
		{
			alert("Select patient name");
		}
		}
		else
		{
			alert("Please select date range");
		}
	}
	
	function setBatchWiseSaleResult(result) {
		var r = result;
		var divContent = "";
		var amtbalance=0;
		var creditAmt=0,cashAmt=0,rec=0;
		if(r.length>0)
		{
			   divContent = divContent
				+"<div class='col-md-12-1' style='margin-top:10px;'></div><div class='col-md-4-1'><font color='red'><B>Patient Sale:</b></font>"
				+"</div><table class='table  table-bordered table-striped header-fixed cf' border=1> <thead style='background-color: peachpuff;'><tr><th>Bill No</th><th>Bill Date</th><th>Credit Amt</th><th>Cash Amt</th> <th>Amt Receive</th><th>Amt Balance</th><th>Patient Type</th></tr></thead>"
						+ "	<tbody id='patientSaleData' class='success'> ";
			
						
				for ( var i = 0; i < r.length; i++) {
				if(r[i].billMode=="Credit"){
					creditAmt=r[i].amount;
					cashAmt=0;
				}
				else{
					cashAmt=r[i].amount;
					creditAmt=0;
				}
				 amtbalance=(r[i].amount-r[i].amountReceive).toFixed(2);
					divContent = divContent + "<tr><td>" + r[i].credtiNoteInvoiceNo + "</td><td>" + r[i].date
							+ "</td><td align='right'>" + creditAmt + "</td><td align='right'>" +cashAmt + "</td><td align='right'>" + r[i].amountReceive
							+ "</td><td>" + amtbalance
							+ "</td><td>" + r[i].patientType
							+ "</td></tr>";
							
							total = total + parseFloat(creditAmt);
							total1 = total1 + parseFloat(cashAmt);
							rec=rec +parseFloat(r[i].amountReceive);
				
					 //calculateTotalAmountForPatientSale(r[i].amount); 
					// calculateTotalAmountForPatientSettle(r[i].amountReceive);
			}
			divContent = divContent + "</tbody><tfoot><tr><td></td><td>Total</td><td align='right'>"+total+"</td><td align='right'>"+total1+"</td><td align='right'>"+rec+"</td><td></td><td></td></tr></tfoot></table>";
		}
	//	$('#creditAmt').val(total.toFixed(2));
	//	$('#cashAmt').val(total1.toFixed(2));
	//	$('#indentTotalAmount').val((total + total1).toFixed(2));
	//	$("#creditNoteData").html(divContent);
	//	$('#patientSaleDueAmount').val(rec.toFixed(2));
	}
	
	
//patient sale settle bill
	function getPatientSettleBill() 
	{
	
		var from = $("#popup_container2").val();
		var to = $("#popup_container3").val();
		var hiddenPatientId = $("#hiddenPatientId").val();
		
		if ((from != null && to != "")) 
		{
		if ((hiddenPatientId != null && hiddenPatientId != "")) 
		{
			var inputs = [];
			inputs.push('from=' + from);
			inputs.push('to=' + to);
			inputs.push('hiddenPatientId=' + hiddenPatientId);
			var str = inputs.join('&');

			jQuery.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "../report/getSettleBillByPatientId",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					$("#patient_ledger_report").show();
							if(r!="")
								{ 
					setSettleBillSaleResult(r);
								}

				}
			});
			return true;
		}
		}
		
	}
	
	function setSettleBillSaleResult(result) 
	{
		var r = result;
		var divContent = "";
		var disc=0;
		if(r.length>0)
		{
			for ( var i = 0; i < r.length; i++) 
				{
			for ( var j = 0; j < r[i].purchaseSlaves.length; j++) {
				
				divContent = divContent
			    +"<div class='col-md-12-1' style='margin-top:10px;><div class='col-md-4-1'><font color='red'><B>Patient Sale Due Collection:</b></font>"
				+"</div>";
		divContent = divContent
		+"<table class='table  table-bordered table-striped header-fixed cf' border=1> <thead style='background-color: peachpuff;'><tr><th>Bill Id</th><th>Amount Balance</th> <th>Amount Receive</th><th>Discount</th><th>Date</th></tr></thead>"
				+ "	<tbody id='patientSaleSettleData' class='success'> ";
					
				var purchaseSlaves=r[i].purchaseSlaves[j];
				if(purchaseSlaves.purSlaveBillRate!=null)
					disc=purchaseSlaves.purSlaveBillRate;
				else
					disc=0;
								
					divContent = divContent + "<tr><td>" + purchaseSlaves.purSlaveQty + "</td><td>" + purchaseSlaves.batchCode
							+ "</td><td>" + purchaseSlaves.purSlaveAmt + "</td><td>" + disc + "</td><td>" +  purchaseSlaves.productMaster.productName + "</td></tr>";
				divContent = divContent + "</tbody></table>";
									
				 calculateTotalAmountForPatientSettle(purchaseSlaves.purSlaveAmt);
				
			}
			}
		
		}
			
		$("#patientSaleSettleData").html(divContent);
	}
	
	
	/* function calculateTotalAmountForPatientSettle(amount) 
	{
			$('#patientSaleDueAmount').val(amount);
	} */
	
	
		
	
	//Indent Sale
	function getIndentData() {
		var from = $("#popup_container2").val();
		var to = $("#popup_container3").val();
		var hiddenPatientId = $("#hiddenPatientId").val();
		
		if ((from != null && to != "")) 
		{
		if ((hiddenPatientId != null && hiddenPatientId != "")) 
		{
			var inputs = [];
			inputs.push('from=' + from);
			inputs.push('to=' + to);
			inputs.push('hiddenPatientId=' + hiddenPatientId);
			var str = inputs.join('&');

			jQuery.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "../report/getIndentSaleDetailsByPatientId",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					$("#patient_ledger_report").show();
							if(r!="")		
					setIndentSaleSaleResult(r);

				}
			});
			return true;
		}
		}
			
	}

	
	function setIndentSaleSaleResult(result) {
	
		var r = result;
		var divContent = "";
		var amtbalance=0;
  
		if(r.length>0)
		{
		      divContent = divContent
				+"<div class='col-md-12-1' style='margin-top:10px;'></div><div class='col-md-4-1'><font color='red'><B>Indent Sale:</b></font>"
				+"</div><table class='table  table-bordered table-striped header-fixed cf' border=1> <thead style='background-color: peachpuff;'><tr><th>Bill No</th><th>Bill Date</th><th>Bill mode</th><th>Net Amt</th><th>Amt Receive</th><th>Amt Balance</th></tr></thead>"
						+ "	<tbody id='indentSaleData' class='success'> ";
			for ( var i = 0; i < r.length; i++) {
				amtbalance=(r[i].amount-r[i].amountReceive).toFixed(2);
					divContent = divContent + "<tr><td>" + r[i].indentSaleInvoiceNo + "</td><td>" + r[i].date
							+ "</td><td>" + r[i].billMode + "</td><td>" +r[i].amount + "</td><td>" + r[i].amountReceive
							+ "</td><td>" + amtbalance
							+ "</td></tr>";
				
							calculateTotalAmountForPatientSale(r[i].amount);  
							 calculateTotalAmountForPatientSettle( r[i].amountReceive);
			}
			divContent = divContent + "</tbody></table>";
		}
	
		$("#indentSaleData").html(divContent);
		
		
	}
	
/* function calculateTotalAmountForIndent(amount) {
		
		$('#indentTotalAmount').val(amount.toFixed(2));
	} */
	
	//Indent Sale Settle Bill
	function getIndentSettleBill() 
	{
		var from = $("#popup_container2").val();
		var to = $("#popup_container3").val();
		
		if ((from != null && to != "")) 
		{
		var hiddenPatientId = $("#hiddenPatientId").val();
			var inputs = [];
			inputs.push('from=' + from);
			inputs.push('to=' + to);
			inputs.push('hiddenPatientId=' + hiddenPatientId);
			if ((hiddenPatientId != null && hiddenPatientId != "")) 
			{
			var str = inputs.join('&');
			jQuery.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "../report/getIndentSettleBillByPatientId",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					$("#patient_ledger_report").show();
					if(r!="")
						setIndentSettleBillSaleResult(r);
					

				}
			});
			return true;
			}
		}
	}
	
	function setIndentSettleBillSaleResult(result) 
	{
		var r = result;
		var divContent = "";
		 var disc=0;
	
	if(r.length>0)
	{
		for ( var i = 0; i < r.length; i++) 
			{
			for ( var j = 0; j < r[i].debitNoteSlave.length; j++) 
			{
				var debitNoteSlave=r[i].debitNoteSlave[j];
				
				divContent = divContent
			    +"<div class='col-md-12-1' style='margin-top:10px;'><div class='col-md-4-1'><font color='red'><B>Indent Sale Due Collection:</b></font>"
				+"</div>";	
		divContent = divContent
		+"<table class='table  table-bordered table-striped header-fixed cf' border=1> <thead style='background-color: peachpuff;'><tr><th>Bill Id</th><th>Amount Balance</th> <th>Amount Receive</th><th>Discount</th><th>Date</th></tr></thead>"
				+ "	<tbody id='indentSaleSettleBill' class='success'> ";
				
				if(debitNoteSlave.debitNoteSlaveRate!=null)
					disc=debitNoteSlave.debitNoteSlaveRate;
				else
					disc=0;
			
					divContent = divContent + "<tr><td>" + debitNoteSlave.debitNoteSlaveQty + "</td><td>" + debitNoteSlave.debitNoteSlaveBatchCode
							+ "</td><td>" + debitNoteSlave.debitNoteSlaveAmt + "</td><td>" + disc + "</td><td>" +  debitNoteSlave.productMaster.productName + "</td></tr>";
				divContent = divContent + "</tbody></table>";
				
				calculateTotalAmountForPatientSettle(debitNoteSlave.debitNoteSlaveAmt);  
				
			}
			}
		}
	else
	{
		divContent="<b><h3>No Record Found</h3></b>";
	}	
	$("#indentSaleSettleBill").html(divContent);
	}
	
	/* function calculateTotalAmountForIndentSettle(amount) 
	{
		if (parseFloat(amount) != '' && parseFloat(amount) != 'null')
		{
			total1 = total1 + parseFloat(amount);
			$('#indentSaleDueAmount').val(total1.toFixed(2));
		}
	}  */
	
	//Credit Note
	function getCreditNoteData() 
	{
		var from = $("#popup_container2").val();
		var to = $("#popup_container3").val();
		if ((from != null && to != "")) 
		{
		var hiddenPatientId = $("#hiddenPatientId").val();
			var inputs = [];
			inputs.push('from=' + from);
			inputs.push('to=' + to);
			inputs.push('hiddenPatientId=' + hiddenPatientId);
			if ((hiddenPatientId != null && hiddenPatientId != "")) 
			{
			var str = inputs.join('&');

			jQuery.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "../report/getCreditNoteDetailsByPatientId",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					$("#patient_ledger_report").show();
						if(r!="")			
					setCreditNoteResult(r);

				}
			});
			return true;
			}
		}
	}

	
	function setCreditNoteResult(result) {
	/* 	var r = result;
		var divContent = "";

		if(r.length>0)
		{
			for ( var i = 0; i < r.length; i++) {
				
				divContent = divContent
				+"<div class='col-md-12-1' style='margin-top:10px;background-color:yellow'><div class='col-md-4-1'><font color='red'><B>Credit Note No:</b></font>"
						+ r[i].indentSaleId
						+ "</div> <div class='col-md-4-1'><font color='red'>Credit Note Amount Receive:</b></font>"
						+ r[i].amount
						+ "</div> <div class='col-md-4-1'><font color='red'>Indent Sale Date:</font>"+r[i].date+"(YYYY-MM-DD)</b></div> </div><table class='table  table-bordered table-striped header-fixed cf' border=1> <thead style='background-color: peachpuff;'><tr><th>Product Name</th> <th>Qty</th> <th>BatchCode</th><th>Rate</th> <th>Amount</th> </tr></thead>"
						+ "	<tbody id='CreditNoteTotalData' class='success'> ";
						
				for ( var j = 0; j < r[i].patientSlaves.length; j++) {
					
					var patientSlaves=r[i].patientSlaves[j];
					divContent = divContent + "<tr><td>" + patientSlaves.productMaster.productName + "</td><td>" + patientSlaves.patientSlaveMrp
							+ "</td><td>" + patientSlaves.patientSlaveBatchCode + "</td><td>" + patientSlaves.patientSlaveRate + "</td><td>" + patientSlaves.patientSlaveAmt
							+ "</td></tr>";
					
				}
				divContent = divContent + "</tbody></table>";
			}
		
		}
	
		$("#CreditNoteTotalData").html(divContent); */
		var r = result;
		var divContent = "";
       var amtBal=0;
		if(r.length>0)
		{
			 divContent = divContent
				+"<div class='col-md-12-1' style='margin-top:10px;'></div><div class='col-md-4-1'><font color='red'><B>Credit Note:</b></font>"
				+"</div><table class='table  table-bordered table-striped header-fixed cf' border=1> <thead style='background-color: peachpuff;'><tr><th>Credit No</th><th>Bill Date</th><th>Bill mode</th><th>Net Amt</th><th>Sale Type</th></tr></thead>"
						+ "	<tbody id='CreditNoteTotalData' class='success'> ";
			for ( var i = 0; i < r.length; i++) {
				amtBal=(r[i].amount-r[i].creditNotePayable).toFixed(2);
					divContent = divContent + "<tr><td>" + r[i].indentSaleId + "</td><td>" + r[i].date
							+ "</td><td>" + r[i].billMode + "</td><td align='right'>" +(parseFloat(r[i].amount)).toFixed(2) + "</td><td>" + r[i].patientType
							+ "</td></tr>";
							
					 /* calculateTotalAmount(r[i].amount);  */
					 
					calculateTotalAmountForCreditNote(r[i].amount);  
					calculateTotalAmountReceiveForCreditNote(r[i].creditNotePayable) ;
			}
			divContent = divContent + "</tbody><tfoot><tr><td></td><td></td><td>Total</td><td align='right'>"+total2+"</td><td></td></tr></tfoot></table>";
		}
	
		$("#CreditNoteTotalData").html(divContent);
		
	}
	//get opening Balance
	function getOpeningBalance() 
	{
	
		var from = $("#popup_container2").val();
		var to = $("#popup_container3").val();
		var hiddenPatientId = $("#hiddenPatientId").val();
		
		if ((from != null && to != "")) 
		{
		if ((hiddenPatientId != null && hiddenPatientId != "")) 
		{
			var inputs = [];
			inputs.push('from=' + from);
			inputs.push('to=' + to);
			inputs.push('hiddenPatientId=' + hiddenPatientId);
			var str = inputs.join('&');

			jQuery.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "../report/getOpeningBalanceByPatientId",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
				
							if(r!="")
								{ 
							$('#openingBal').val(r);
								}
							else
								{
								$('#openingBal').val('0');
								}

				}
			});
			return true;
		}
		}
		
	}
	
	function calculateTotalAmountForCreditNote(amount) 
	{
		if (parseFloat(amount) != '' && parseFloat(amount) != 'null')
		{
			total2 = total2 + parseFloat(amount);
			$('#creditAmt').val(total2.toFixed(2));
		}
	} 
	function calculateTotalAmountReceiveForCreditNote(amount) 
	{
		if (parseFloat(amount) != '' && parseFloat(amount) != 'null')
		{
			total3 = total3 + parseFloat(amount);
			$('#creditAmtReceive').val(total3.toFixed(2));
		}
	} 
	
function getPatientSaleReportVouwise() 
{
	var TotalbilAmt;
	var TotalamtReceive;
	var creditNote;
		var patientId = $("#hiddenPatientId").val();
		var from = $("#popup_container2").val();
		var to = $("#popup_container3").val();
		var patName = $("#txtPatientName").val();
		
		if(($("#indentTotalAmount").val())!="")
			TotalbilAmt=parseFloat($("#indentTotalAmount").val());
		else
			TotalbilAmt=0;
		 
		if(($("#patientSaleDueAmount").val())!="")
			TotalamtReceive=parseFloat($("#patientSaleDueAmount").val());
		else
			TotalamtReceive=0;
		
	/* 	if(($("#creditAmtReceive").val())!="")
		 creditNote=parseFloat($("#creditAmtReceive").val());
		else
			creditNote=0; */
		
		var netAmt=((TotalbilAmt-TotalamtReceive).toFixed(2));
				
			var inputs = [];
			inputs.push('treatId=' + $("#treatmentSelect").val());
			inputs.push('from=' + from);
			inputs.push('to=' + to);

			var str = inputs.join('&');
			
			window.open("/EhatEnterprise/pharmacy/report/getPatientLedgerReport?patientId="+patientId+"&from="+from+"&to="+to+"&netAmt="+netAmt+"&patName="+patName,'_blank');
			
	} 
	
	
	function setResult(result) {
		var splitResult = result.split('$');
		$('#setButtons')
				.html(
						"<button onclick='getPatientSaleReportVouwise();' class='btn btn-xs btn-success' type='button'>Get"
								+ "Report</button> <a title='' target='_blank' id='getPDFFile' name='getPDFFile' style='text-decoration: none;' href='/EhatEnterprise/ehat_Reports/"+splitResult[0]+"'> <input type='button' class='btn btn-xs btn-warning' value='View PDF' style=''></a>"
								+ "<a title='' target='_blank' id='getPDFFile' style='text-decoration: none;' name='getPDFFile' href='/EhatEnterprise/ehat_Reports/"+splitResult[1]+"'> <input type='button' class='btn btn-xs btn-warning' value='View Excel' style=''></a>"
								+ "<button style='margin-top: 1px;' type='button' class='btn btn-xs btn-danger' onclick='closePopUp()' data-dismiss='modal'>Close</button>");
	}

	function autoSuggestionForPateintNameIndentSale1(inputID, typeauto) {

		var typeOfpatient = 'diagnosis';
		var inputs = [];

		if (typeOfpatient == "diagnosis") {
			inputs.push('isEdit=yes');
		} else {
			inputs.push('isEdit=no');
		}

		var resultData = [];
		var txtVal1 = $('#' + inputID).val();

		if ((typeauto == "onload") || (txtVal1 != null && txtVal1 != "")) {

			inputs.push('action=fetchPharmaPateintNameAutosugg');
			inputs.push('patientName=' + txtVal1);
			inputs.push('typeOfpatient=' + typeOfpatient);

			var str = inputs.join('&');

			jQuery
					.ajax({
						async : true,
						type : "POST",
						data : str + "&reqType=AJAX",
						url : "../../InventoryServlet",
						timeout : 1000 * 60 * 15,
						cache : true,
						error : function() {
							alert('error');
						},
						success : function(r) {

							// alert(r.length);
							var availableTags = [];

							ajaxResponse = eval('(' + r + ')');

							for ( var i = 0; i < ajaxResponse.ltInventoryFetchPateintNameDTO.length; i++) {

								availableTags
										.push(ajaxResponse.ltInventoryFetchPateintNameDTO[i].fName
												+ " "
												+ ajaxResponse.ltInventoryFetchPateintNameDTO[i].mName
												+ " "
												+ ajaxResponse.ltInventoryFetchPateintNameDTO[i].lName
												+ "__"
												+ ajaxResponse.ltInventoryFetchPateintNameDTO[i].Patient_ID
												+ "_"
												+ ajaxResponse.ltInventoryFetchPateintNameDTO[i].Treatment_ID
												+ "_"
												+ ajaxResponse.ltInventoryFetchPateintNameDTO[i].referedTo);
							}

							var template = "";
							for ( var j = 0; j < availableTags.length; j++) {
								var arrValue = (availableTags[j]).split("__");
								var idValue = (arrValue[1]);
								resultData.push({
									ID : idValue,
									Name : arrValue[0]
								});

								template = template + '<li data-value="'
										+ (arrValue[1])
										+ '" class=""><a href="#">'
										+ arrValue[0] + '</a></li>';

							}

							$("#div" + inputID + " .typeahead").html(template);

							setTimeout(
									function() {
										$('#' + inputID).typeahead({
											source : resultData,
											displayField : 'Name',
											valueField : 'ID',
											onSelect : displayResult1,
											scrollBar : true,

										});
										$("#txtPatientName").data('typeahead').source = resultData;
									}, 500);

						}
					});

		}

	}

	function hidePopUp() {
		$('#patient_ledger_report').hide();
		location.reload(true);
	}

	function displayResult1(item) {

		var content = item.value.split("_");
		$('#hiddenPatientId').val(content[0]);
		
	}
		
</script>
<script type="text/javascript">
	onload = function() {

		autoSuggestionForPateintNameIndentSale1("txtPatientName", "onload");
	}
</script>
<%
	java.util.Calendar currentDate = java.util.Calendar.getInstance();
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
			"dd/MM/yyyy");
	String todays_date = formatter.format(currentDate.getTime());
%>

<body style="background: white ! important;">
	<section id="page">

		<!-- Common -->
		<!-- DASHBOARD CONTENT -->
		<%-- <div id="footer1" style="text-align: right;"><%@include
				file="Session_Info.jsp"%></div> --%>
		<div id="outer" class="container-main" style="width: 100%;">
			<!-- HEADER -->
			<header class="navbar clearfix" id="header">
				<%@include file="Pharma_Menu_Header.jsp"%>
			</header>
			<!--/HEADER -->

			<%@include file="Pharma_left_menu_reports.jsp"%>
			<%@include file="pharma_report_patient_ledger_details_pop_up.jsp"%>

			<!-- 			content -->

			<input type="hidden" id="userID" />
			<div id="main-content">
				<div class="container">
					<div class="row">
						<div id="content" class="col-lg-12">
							<!-- PAGE HEADER-->
							<div class="row">
								<div class="col-sm-12">
									<div class="page-header">

										<ul class="breadcrumb col-md-12-1"
											style="padding: 4px 10px; margin-top: 1px;">
											<li>Date : <%=todays_date%></li>
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
											</li>
											<li><a href="IPD_OPD_Database.jsp">Pharmacy</a></li>
											<li>Patient Ledger Report</li>
											<!-- <li><i class="fa fa-question"></i></li>
											<li><i class="fa fa-exclamation-circle"
												style="color: red;">12</i></li> -->
											<!-- <li class="pull-right" id="template">
												<button type="submit" class="btn btn-xs btn-success"
													onclick="getPharmacyCompanyWiseProductReport()">Get
													Product Report</button> <button class="btn btn-xs btn-danger">Discard</button>
											</li> -->
										</ul>

									</div>
								</div>
							</div>
							<div id="SearchContent" class="col-md-12-1"></div>

							<div id="SearchContent" class="col-md-12-1"></div>
							<div class="divide-20"></div>
							<div class="col-md-12-1">


								<div class="col-md-12-1">


									<div id="companyReport" class="col-md-5-1"
										style="height: 100%; margin-top: 2%; padding-left: 20px; border: 1px solid #b8b8b8;">

										<div class="col-md-12-1 center" style="margin-bottom: 10px;">
											<h4 id="title">Patient Ledger</h4>
										</div>

										<div class="col-md-12-1" style="margin-top: 10px;">


											<div class="col-md-4-1" style="margin-top: 0px;">

												<label for="product">Patient Name</label>
											</div>
											<div class="col-md-6-1"
												style="margin-top: 0px;">
												<input name="txtPatientName" type="text" id="txtPatientName"
													autocomplete="off"
													class="typeahead form-control input-SmallText "
													onkeypress="autoSuggestionForPateintNameIndentSale1('txtPatientName', 'onchange');" />


												<input type="hidden" id="hiddenPatientId">

											</div>


										</div>
						
							
										<div class="col-md-6-1"
											style="margin-top: 0px; margin-bottom: 10px">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>From:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<!-- <input type="text" class="form-control input-SmallText"
													placeholder="From Date" readonly="readonly"
													onclick="displayCalendar(document.getElementById('popup_container3'),'dd/mm/yyyy',this)"
													name="popup_container3" id="popup_container3"> -->
												<input type="text" id="popup_container2" name="txtBillDate"
													class="form-control input-SmallText" readonly
													placeholder="From Date" required
													onfocus="displayCalendar(document.getElementById('popup_container2'),'dd/mm/yyyy',this)">
											</div>
										</div>

										<div class="col-md-6-1 "
											style="margin-top: 0px; margin-bottom: 10px;">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>To:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<input type="text" class="form-control input-SmallText"
													placeholder="To Date" readonly="readonly"
													onclick="displayCalendar(document.getElementById('popup_container3'),'dd/mm/yyyy',this)"
													name="popup_container3" id="popup_container3">
											</div>
										</div>

										<div class="col-md-12-1"
											style="margin-top: 0px; margin-bottom: 10px">
											<div style="margin-top: 9px;" class="col-md-4-1">
												<B></B>
											</div>
											<div style="margin-top: 9px;" class="col-md-4-1">
												<button class="btn btn-xs btn-success" type="button"
													id="getIndentData" onclick="loadPopUp(),getIndentData(),getPatientSettleBill(),getIndentSettleBill(),getCreditNoteData(),getOpeningBalance();"
													style="margin-left: 5%;">Get Data</button>
											</div>

										</div>
									</div>

									<div class="col-md-1-1"
										style="height: 100%; margin-top: 2%; padding-left: 20px;"></div>

									<%-- <div class="col-md-6-1"
										style="padding-left: 1%; padding-right: 0%;">
										<div class="box border purple">
											<div class="box-title" style="background-color: #a696ce">
												<h4>
													<i class="fa fa-bitbucket"></i>Patient Ledger
												</h4>
												<div class="tools">
													<a href="#box-config" data-toggle="modal" class="config">
														<i class="fa fa-cog"></i>
													</a>
													<!-- <a href="javascript:;" class="reload">
												<i class="fa fa-refresh"></i>
											</a> -->
													<a href="javascript:;" class="collapse"> <i
														class="fa fa-chevron-up"></i>
													</a> <a href="javascript:;" class="remove"> <i
														class="fa fa-times"></i>
													</a>
												</div>
											</div>
											<div class="box-body " id='well'
												style="height: 350px; overflow-y: Scroll; width: 100%;">

												<div class="col-md-12-1" style="border: 2px solid;"
													id="reportList">
													<div class="col-md-12-1 center"
														style="margin-bottom: 10px;"></div>
													<div class="col-md-12-1"
														style="width: 100%; overflow-y: scroll; height: 400px; max-height: auto;">
														<table border='1'
															class="table table-striped table-bordered header-fixed cf "
															style="Width: 100%; margin-top: 5px;">
															<thead class="cf" style="background: white;">
																<tr>
																	<th>File Id</th>
																	<th>File Name</th>
																	<th>Date</th>
																</tr>
															</thead>
															<tbody>
																<%
																	File folder = new File(
																			request.getRealPath("/ehat_Reports/Pharmacy/Sales/patientSaleVouwise/"));
																	File[] listOfFiles = folder.listFiles();

																	if (listOfFiles != null) {
																		for (int i = 0; i < listOfFiles.length; i++) {
																%>
																<tr>
																	<td><%=i + 1%></td>
																	<td>
																		<%
																			if (listOfFiles[i].isFile()) {
																		%> <a
																		href='/EhatEnterprise/ehat_Reports/Pharmacy/Sales/patientSaleVouwise/<%=listOfFiles[i].getName()%>'><%=listOfFiles[i].getName()%></a>
																	</td>
																	<td>
																		<%
																			SimpleDateFormat sdf = new SimpleDateFormat(
																								"dd/MM/yyyy HH:mm:ss");

																						/* System.out.println("After Format : " + sdf.format(listOfFiles[i].lastModified())); */
																		%> <%=sdf.format(listOfFiles[i].lastModified())%>
																	</td>
																</tr>
																<%
																	}
																		}
																	}
																%>
															</tbody>
														</table>
													</div>
												</div>

											</div>
										</div>
									</div>
 --%>

								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div><%@include file="Pharma_Footer.jsp"%></div>
		<div id="userObj" style="display: none;"></div>
		<%-- </c:if> --%>
	</section>

	<div class="ajaxmodal">
		<!-- Place at bottom of page -->
	</div>
</body>
</html>
