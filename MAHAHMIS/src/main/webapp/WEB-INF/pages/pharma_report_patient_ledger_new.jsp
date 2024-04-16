<%@page import="java.util.Comparator"%>
<%@page import="java.util.Collections"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.io.File"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
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
	href="<c:url value="../.././pharma-resources/css/ehat_general.css"/>">
<link rel="stylesheet" type="text/css"
	href="<c:url value="../.././pharma-resources/css/default.css"/>"
	id="skin-switcher">
<link rel="stylesheet" type="text/css"
	href="<c:url value="../.././pharma-resources/css/responsive.css"/>">
<link
	href="<c:url value="../.././pharma-resources/bootstrap-dist/css/bootstrap.min.css"/>"
	rel="stylesheet" media="screen">
<link
	href="<c:url value="../.././pharma-resources/font-awesome/css/font-awesome.min.css"/>"
	rel="stylesheet">


<!-- JQUERY -->
<script
	src="<c:url value="../.././pharma-resources/jquery/jquery-2.1.1.js"/>"></script>
<!-- JQUERY UI-->
<script
	src="<c:url value="../.././pharma-resources/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"/>"></script>
<!-- BOOTSTRAP -->
<script
	src="<c:url value="../.././pharma-resources/bootstrap-dist/js/bootstrap.min.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/bootstrap-dist/js/bootstrap.js"/>"></script>


<!--calender Files  -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"/>"></script>
<link type="text/css" rel="stylesheet"
	href="<c:url value="../.././pharma-resources/dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"/>"
	media="screen"></link>

<!-- SLIMSCROLL -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"/>"></script>
<!-- BLOCK UI -->
<script type="text/javascript"
	src="<c:url value="../.././pharma-resources/js/jQuery-BlockUI/jquery.blockUI.min.js"/>"></script>

<script type="text/javascript" src="<c:url value="/js/report.js"/>"></script>

<script
	src="<c:url value="../.././pharma-resources/js/auto/bootstrap-typeahead.js"/>"></script>

<!-- CUSTOM SCRIPT -->
<script src="<c:url value="../.././pharma-resources/js/script.js"/>"></script>
<script src="<c:url value="../.././pharma-resources/js/pharma_productList_report.js"/>"></script>

</head>
<script>
var total55 = 0;
var total125= 0;
var total0=0;
var taxable55=0;
var taxable12=0;
var taxable0=0;
var totalNetAmt=0;

	jQuery(document).ready(function() {
		//App.setPage("UserManagement"); //Set current page
		App.init(); //Initialise plugins and elements
	
	});

	/*****
	 * @author    :Akshata Desai
	 * @Code      :For auto suggestion patient list report
	 * ******/
	function searchPatientList(inputID){

		var findingName = $("#" + inputID).val();
		var inputs = [];
		inputs.push('letter=' + findingName);
		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "../pharmacyReport/autoSuggestionPatientlist",
					timeout : 1000 * 60 * 15,

					error : function(error) {
						alert('error' + error);
					},
					success : function(response) {
						var resultData = [];
						var template = "";
						
						for ( var j = 0; j < response.lstIpdbillPatients.length; j++) {
							var arrValue = response.lstIpdbillPatients[j].patient_id +"-"+response.lstIpdbillPatients[j].patient_name;
							var idValue = response.lstIpdbillPatients[j].patient_id;
							var stateName = response.lstIpdbillPatients[j].patient_name;
							resultData.push({
								ID : idValue,
								Name : stateName
							});
							template = template + '<li data-value="' + idValue
									+ '" class=""><a href="#">' + arrValue + '</a></li>';
						}
				
						setTimeout(function() {
							$("div#documentByName .typeahead").html(template);
							$("div#documentByName .typeahead").show();
				
							$("input#" + inputID).typeahead({
								source : resultData,
								displayField : 'Name',
								valueField : 'ID',
								onSelect : displayResult,
								scrollBar : true
							});
							$("input#" + inputID).data('typeahead').source = resultData;
						}, 500);
						
						
						
					}
					
				});
	}
	/*****
	 * @author    :Akshata Desai	
	 * @Code      :For setting hidden patient id
	 * ******/
	function displayResult(item) {
		var content = item.value.split("-");
		$('#hiddenPatientId').val(content[0]);
		
	}
	
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
				url : "../pharmacyReport/getPatientSaleDetailsByPatientId",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					//$("#patient_ledger_report").show();
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
					//<th>Patient Type</th>
				for ( var i = 0; i < r.length; i++) {
				if(r[i].billMode=="Credit"){
					creditAmt=r[i].amount;
					cashAmt=0;
				}
				else{
					cashAmt=r[i].amount;
					creditAmt=0;
				}
				var date=r[i].date;
				//var billd=billdate.split("-");
			//	var date= billd[2]+"-"+billd[1]+"-"+billd[0];
				 amtbalance=(r[i].amount-r[i].amountReceive).toFixed(2);
					divContent = divContent + "<tr><td>" + r[i].credtiNoteInvoiceNo + "</td><td>" + date
							+ "</td><td align='right'>" + r[i].amount + "</td><td align='right'>" + r[i].amountReceive
							+ "</td><td>" + amtbalance
							+ "</td></tr>";
							
							total = total + parseFloat(creditAmt);
							total1 = total1 + parseFloat(cashAmt);
							rec=rec +parseFloat(r[i].amountReceive);
				
					
			}
		}
		$("#patientLedgerpatient").html(divContent);
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
				url : "../pharmacyReport/getSettleBillByPatientId",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					//$("#patient_ledger_report").show();
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
		
			
			var patientdueAmtBalTotal = 0;
			var patientdueAmtReceiveTotal = 0;
			
			for ( var i = 0; i < r.length; i++) 
				{
			for ( var j = 0; j < r[i].purchaseSlaves.length; j++) {
				
					divContent = divContent + "<tr><td>" + purchaseSlaves.purSlaveQty + "</td><td>" +  purchaseSlaves.finalDate + "</td><td>" + purchaseSlaves.patient_sales_bill_net_amt
							+ "</td><td>" + purchaseSlaves.discount + "</td><td>" + purchaseSlaves.amtReceive + "</td><td>" + purchaseSlaves.discount + "</td></tr>";
								
				
			  }
			}

		}
		
		$("#patientLedgerpatientdue").html(divContent);
	}

	
	
	
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
				url : "../pharmacyReport/getIndentSaleDetailsByPatientId",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					//$("#patient_ledger_report").show();
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
		
		var IndentNetAmtTotal = 0;
		var IndentAmtReceiveTotal = 0;
		var IndentAmtBalanceTotal= 0;
  
		if(r.length>0)
		{
		     
			for ( var i = 0; i < r.length; i++) {
				
           var indentSaleReturn=r[i].creditNoteNetAmt;
				if(r[i].billMode=="Credit"){
					creditAmt=r[i].amount;
					cashAmt=0;
				}
				else{
					cashAmt=r[i].amount;
					creditAmt=0;
				}
			 var amountReceive=r[i].amountReceive-Number(indentSaleReturn);
				amtbalance=(r[i].amount-r[i].amountReceive).toFixed(2);
					divContent = divContent + "<tr><td>" + r[i].indentSaleInvoiceNo + "</td><td>" + r[i].indentDate
							+ "</td><td>" +r[i].amount + "</td><td>" + amountReceive
							+ "</td><td>" + amtbalance
							+ "</td></tr>";
							
							var IndentNetAmt = r[i].amount;
							var IndentAmtReceive = r[i].amountReceive;
							
							IndentNetAmtTotal = IndentNetAmtTotal + parseFloat(IndentNetAmt);
							IndentAmtReceiveTotal = IndentAmtReceiveTotal + parseFloat(IndentAmtReceive);
							IndentAmtBalanceTotal = IndentAmtBalanceTotal + parseFloat(amtbalance);
						var	IndentCreditSaleReturn = IndentCreditSaleReturn + parseFloat(indentSaleReturn);
							
			}
			
		}
	$("#patientLedgerindent").html(divContent);		
	}
	
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
				//	$("#patient_ledger_report").show();
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
		 
				var indentdueAmtBalTotal = 0;
				var indentdueAmtReceiveTotal = 0;
		for ( var i = 0; i < r.length; i++) 
			{
			for ( var j = 0; j < r[i].debitNoteSlave.length; j++) 
			{
				var debitNoteSlave=r[i].debitNoteSlave[j];
				
				
		
				
				if(debitNoteSlave.debitNoteSlaveRate!=null)
					disc=debitNoteSlave.debitNoteSlaveRate;
				else
					disc=0;
			
					divContent = divContent + "<tr><td>" + debitNoteSlave.debitNoteSlaveId + "</td><td>" +  debitNoteSlave.productMaster.productName + "</td><td>" + debitNoteSlave.indentNetAmount
							+ "</td><td>" + debitNoteSlave.debitNoteSlaveRate + "</td><td>" + debitNoteSlave.debitNoteSlaveAmt + "</td><td>" + debitNoteSlave.amountBal + "</td></tr>";
				
							var indentNetAmt = debitNoteSlave.debitNoteSlaveBatchCode;
							var indentAmtReceive = debitNoteSlave.debitNoteSlaveAmt
							
							indentdueAmtBalTotal = indentdueAmtBalTotal + parseFloat(indentNetAmt);
							indentdueAmtReceiveTotal = indentdueAmtReceiveTotal + parseFloat(indentAmtReceive);	
				
				
			}
			}
		
	$("#patientLedgerindentDue").html(divContent);
	}
	
	}

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
					//$("#patient_ledger_report").show();
						if(r!="")			
					setCreditNoteResult(r);

				}
			});
			return true;
			}
		}
	}

	
	function setCreditNoteResult(result) {

	
		
		var r = result;
		var divContent = "";
       var amtBal=0;
		if(r.length>0)
		{
	
			for ( var i = 0; i < r.length; i++) {
				var date=r[i].date;
				
				if(r[i].billMode=="Credit"){
					creditAmtReturn=r[i].amount;
					cashAmtReturn=0;
				}
				else{
					cashAmtReturn=r[i].amount;
					creditAmtReturn=0;
				}
			var indentSaleId=	r[i].IndentSaleInvoiceNo;
			var patientSaleId=r[i].patientSaleInvoiceNo;
			
				amtBal=(r[i].amount-r[i].creditNotePayable).toFixed(2);
					divContent = divContent + "<tr><td>" + r[i].creditNoteId + "</td><td>" + r[i].indentSaleId + "</td><td>" + date
							+ "</td><td>" + r[i].amount + "</td><td>" + r[i].patientType
							+ "</td></tr>";
							
					
					 
					calculateTotalAmountForCreditNote(r[i].amount);  
					calculateTotalAmountReceiveForCreditNote(r[i].creditNotePayable) ;
			}
			
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
		//	$('#creditAmt').val(total2.toFixed(2));
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
		// Added By Annapurna Get Data for Patient Ledger Indent Sale 	
		
 function getAllIndentSalePatientHeader() {
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
				url : "../report/getAllIndentSalePatientHeader", 
				
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					//$("#patient_ledger_report").show();
							if(r!="")		
					setPatientLedgerHeaderInformation(r);

				}
			});
			return true;
		}
		}
			
	}


	function setPatientLedgerHeaderInformation(r) {

		var totalCreditAmt = 0;
		var totalCashAmt = 0;
		var totalFinalAmt = 0;
		var saleAmountReceive=0;
		var settleBillAmountReceive=0;
		var saleAmountBalance=0;
		var settleAmountbalance=0;
		var creditSaleReturn=0;
		var settlediscount=0;

		for (var i = 0; i < r.length; i++) {
			if (r.length > 0) {

				var totalNetAmount = Number(r[i].netAmount);
				totalFinalAmt += totalNetAmount;				
				saleAmountReceive =parseFloat(saleAmountReceive) + parseFloat(r[i].saleAmountReceive);
			    settleBillAmountReceive += parseFloat(r[i].amountReceive);
			    saleAmountBalance +=parseFloat(r[i].saleAmountBal);
			    settleAmountbalance += parseFloat(r[i].amountBalance);
			    creditSaleReturn +=parseFloat( r[i].creditNotePayable);
			    settlediscount +=parseFloat(r[i].discount);
				
				var TotalAmountReceive =saleAmountReceive + settleBillAmountReceive-creditSaleReturn;
				//var totalRemainingBalance = saleAmountBalance + settleAmountbalance;
				var totalRemainingBalance = totalNetAmount - saleAmountReceive-settleBillAmountReceive-creditSaleReturn-settlediscount;

			}
		}
		$('#indentTotalAmount').val(totalFinalAmt.toFixed(2));
		$('#patientSaleDueAmount').val(TotalAmountReceive);
		if(TotalAmountReceive>0){
			$("#patientSaleDueAmount").css('color','darkgreen')
			}
		$("#creditSaleReturn").val(creditSaleReturn);
		$("#remainAmtBal").val(totalRemainingBalance);
		if(totalRemainingBalance>0){
			$("#remainAmtBal").css('color','red')
			}
	//	$("#companyReport").html(divContent);
		
	}
	function getPatientSaleReportVouwise() {
		var TotalbilAmt;
		var TotalamtReceive;
		var creditNote;
			var patientId = $("#hiddenPatientId").val();
			var from = $("#popup_container2").val();
			var to = $("#popup_container3").val();
			var patName = $("#byName").val();
			
			if(($("#indentTotalAmount").val())!="")
				TotalbilAmt=parseFloat($("#indentTotalAmount").val());
			else
				TotalbilAmt=0;
			 
			if(($("#patientSaleDueAmount").val())!="")
				TotalamtReceive=parseFloat($("#patientSaleDueAmount").val());
			else
				TotalamtReceive=0;
			
		
			var netAmt=((TotalbilAmt-TotalamtReceive).toFixed(2));
					
				var inputs = [];
				inputs.push('treatId=' + $("#treatmentSelect").val());
				inputs.push('from=' + from);
				inputs.push('to=' + to);

				var str = inputs.join('&');
				
				//window.open("../report/getPatientLedgerReport?patientId="+patientId+"&from="+from+"&to="+to+"&netAmt="+netAmt+"&patName="+patName,'_blank');
				
		} 

	// Added By Annapurna
	function getPatientSalePdfReportVouwise() {
		var TotalbilAmt;
		var TotalamtReceive;
		var creditNote;
			var patientId = $("#hiddenPatientId").val();
			var from = $("#popup_container2").val();
			var to = $("#popup_container3").val();
			var patName = $("#byName").val();
			
			if(($("#indentTotalAmount").val())!="")
				TotalbilAmt=parseFloat($("#indentTotalAmount").val());
			else
				TotalbilAmt=0;
			 
			if(($("#patientSaleDueAmount").val())!="")
				TotalamtReceive=parseFloat($("#patientSaleDueAmount").val());
			else
				TotalamtReceive=0;
			
		
			var netAmt=((TotalbilAmt-TotalamtReceive).toFixed(2));
					
				var inputs = [];
				inputs.push('treatId=' + $("#treatmentSelect").val());
				inputs.push('from=' + from);
				inputs.push('to=' + to);

				var str = inputs.join('&');
				
				window.open("../report/getPatientLedgerReport?patientId="+patientId+"&from="+from+"&to="+to+"&netAmt="+netAmt+"&patName="+patName,'_blank');
				
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
											
											<!-- <li class="pull-right" id="template" style="display: none;">
												<button type="submit" class="btn btn-xs btn-success"
													onclick="getReportForPharmacyCompanyList();">Get
													Vendor Report</button> 
											</li> -->
											<li class="pull-right">
											<button id="btnPdf" onClick="getPatientSalePdfReportVouwise();"
													class="btn btn-xs btn-info pull-right" title="PDF"
													data-placement="left" data-toggle="tooltip"
													data-original-title="Print Patient Ledger Report"
													style="background-color: orange;">
													<i class="fa fa-print"></i>
												</button>
												
													<button id="btnExport"
												class="btn btn-xs btn-info pull-right" value="Excel"
												title="" data-placement="left" data-toggle="tooltip" onClick="getPatientSaleReportVouwise();"
												data-original-title="Excel">Export To Excel</button>

											<script type="text/javascript">
											
														$(document).on('click', '#btnExport', function (e) {
														var clonedContent = $('div[id$=reportList]').clone();
				
														    clonedContent.find('th').css({
														        'background-color': '#CCFF66',
														        'border': '1px solid black', // Add border to heading cells
														        	 'text-align': 'center',
														        	 'vertical-align': 'middle'
														    });
				
														    clonedContent.find('td').css({
														    	 'background-color': '#d3d3d3', 
														        'border': '1px solid black',
														        'width': '100px', // Adjust width as per your requirement
														        	 'text-align': 'center',
														        	 'vertical-align': 'middle'
														    });
														    var result = 'data:application/vnd.ms-excel,' + encodeURIComponent(clonedContent.html());
														    var link = document.createElement("a");
														    document.body.appendChild(link);
														    link.download = "Patient Ledger Report.xls";
														    link.href = result;
														    link.click();
													});
			
													</script>
											</li>
										</ul>

									</div>
								</div>
							</div>
							

							<div id="SearchContent" class="col-md-12-1"></div>
							<div class="col-md-12-1">
						
							
									<div id="companyReport" class="col-md-12-1"
										style="height: 50%; margin-top: -1%; padding-left: 20px; border: 1px solid #b8b8b8;">
                            
                                    <div class="col-md-12-1" style="margin-top: 0%">
										
										<div class="col-md-4-1"
											style="margin-top: 0px; margin-bottom: 10px;">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>From:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												
												<input type="text" id="popup_container2" name="txtBillDate" value="<%=todays_date%>" 
													class="form-control input-SmallText" readonly
													 required 
													onfocus="displayCalendar(document.getElementById('popup_container2'),'dd/mm/yyyy',this)">
											</div>
										</div>

										<div class="col-md-4-1 "
											style="margin-top: 0px; margin-bottom: 10px;">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>To:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<input type="text" class="form-control input-SmallText" value="<%=todays_date%>" 
													 readonly="readonly"
													onclick="displayCalendar(document.getElementById('popup_container3'),'dd/mm/yyyy',this)"
													name="popup_container3" id="popup_container3">
											</div>
										</div>
										
										<div class="col-md-4-1 "
											style="margin-top: 0px; margin-bottom: 10px;">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>Patient Search:</b>
											</div>
											<!-- <div class="col-md-4-1" style="margin-top: 9px;">
												<input id="searchBox1"
													class="form-control input-SmallText ui-autocomplete-input typeahead1"
													type="text" autocomplete="off" name="searchBox1"
													placeholder="Patient Name"
													onkeyup="searchPatientList(this.id);">

											</div> -->
											<div class="col-md-4-1" style="margin-top: 9px;" id="divbyName">
																<input name="byName" type="text" id="byName" class="typeahead form-control input-SmallText"
																	onkeyup="searchPatientList(this.id,event)" />
															</div>
										</div>
										
									</div>
									
									<div class="col-md-12-1">


										<div class="col-md-4-1 "
											style="margin-top: 0px; margin-bottom: 10px;">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>Total Bill NetAmount:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<input id="indentTotalAmount" value="0"
													type="text">
											</div>
										</div>
										<div class="col-md-4-1 "
											style="margin-top: 0px; margin-bottom: 10px;">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>Total Amount Receive:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<input id="patientSaleDueAmount" readonly value="0"
													type="text" >
											</div>																			   
										</div>
										
										<div style="margin-top: 0px; margin-bottom: 10px" class="col-md-4-1">
											<div class="col-md-3-1" style="margin-top: 9px;">
												<b></b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<button style="margin-left: 4%;" onclick="loadPopUp(),getPatientSettleBill(),getIndentData(),getIndentSettleBill(),getCreditNoteData(),getOpeningBalance(),getAllIndentSalePatientHeader();" type="button" class="btn btn-xs btn-success">Get Data</button>
											</div>

										</div>
										
									</div>

									<div class="col-md-12-1">
										
										<div class="col-md-4-1 "
											style="margin-top: 0px; margin-bottom: 10px; display: none;">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>Opening Balance:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px; display: none;">
												<input id="openingBal" readonly value="0"
													type="text" >
											</div>										
										</div>
										
																			<div class="col-md-4-1 "
											style="margin-top: 0px; margin-bottom: 10px; ">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>Credit Sale Return:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px; ">
												<input id="creditSaleReturn" readonly value="0" >
											</div>										
										</div>
																														
									 <div class="col-md-4-1 "
											style="margin-top: 0px; margin-bottom: 10px;">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>Amount Balance:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<input id="remainAmtBal"  value="0" readonly >
											</div>
										</div>
										
										
										
										<div class="col-md-2-1 "
											style="margin-top: 0px; margin-bottom: 10px;">
											<div class="col-md-4-1 "
											style="margin-top: 0px; margin-bottom: 10px;">										
										</div>
										
										
										
										
										</div>
									</div>
								</div>

								<div class="col-md-12-1 panel-body" style="border: 2px solid;margin-top: 2%;" id="reportList">
										<div class="col-md-12-1 center" style="margin-bottom: 10px;">
											<h4 id="title">Patient Ledger Report</h4>


										</div>
										
									<div class="col-md-12-1" style="width: 100%; overflow-y: scroll; height: 400px; max-height: auto;">
									
									<div class="row">
										<table style="margin-top: 20px;"
											class="datatable table table-bordered table-striped table-condensed cf">
											<thead class="cf">
												<th style="color: blue;">""Indent Sale Bill</th>
											</thead>
										</table>
									</div>
										<div class="tab-content">
										<div  class="tab-pane fade in active">
											<table  class="table  table-bordered table-striped header-fixed cf" border="1">
												<thead>
													<tr>
														<th>Bill No</th>
														<th>Bill Date</th>
														<th>IndentSale Net Amount</th>
														<th>Amount Receive</th>
														<th>Amount Balance</th> 
													</tr>
												</thead>
												<tbody id="patientLedgerindent">
												</tbody>
											</table>
										</div>
									</div>
									<div class="row">
										<table style="margin-top: 20px;"
											class="datatable table table-bordered table-striped table-condensed cf">
											<thead class="cf">
												<th style="color: blue;">""Indent Settle Bill</th>
											</thead>
										</table>
									</div>
	
									<div class="tab-content">
										<div  class="tab-pane fade in active">
											<table  class="table  table-bordered table-striped header-fixed cf" border="1">
												<thead>
													<tr>
														<th>Bill No</th>
														<th>Bill Date</th>
														<th>IndentSale Net Amount</th>
														<th>Discount</th>
														<th>Amount Receive</th>
														<th>Amount Balance</th> 
													</tr>
												</thead>
												<tbody id="patientLedgerindentDue">
												</tbody>
											</table>
										</div>
									</div>
									
									<div class="row">
										<table style="margin-top: 20px;"
											class="datatable table table-bordered table-striped table-condensed cf">
											<thead class="cf">
												<th style="color: blue;">""Patient Sale Bill</th>
											</thead>
										</table>
									</div>
										
									<div class="tab-content">
										<div  class="tab-pane fade in active">
											<table  class="table  table-bordered table-striped header-fixed cf" border="1">
												<thead>
													<tr>
													
														<th>Bill No</th>
														<th>Bill Date</th>
														<th>PatientSale Net Amount</th>
														<th>Amount Receive</th>
														<th>Amount Balance</th> 
													</tr>
												</thead>
												<tbody id="patientLedgerpatient">
												</tbody>
											</table>
										</div>
									</div>
									<div class="row">
										<table style="margin-top: 20px;"
											class="datatable table table-bordered table-striped table-condensed cf">
											<thead class="cf">
												<th style="color: blue;">""Patient Settle Bill</th>
											</thead>
										</table>
									</div>
									
									<div class="tab-content">
										<div  class="tab-pane fade in active">
											<table  class="table  table-bordered table-striped header-fixed cf" border="1">
												<thead>
													<tr>
														<th>Bill No</th>
														<th>Bill Date</th>
														<th>PatientSale Net Amount</th>
														<th>Discount</th>
														<th>Amount Receive</th>
														<th>Amount Balance</th> 
													</tr>
												</thead>
												<tbody id="patientLedgerpatientdue">
												</tbody>
											</table>
										</div>
									</div>
									
									<div class="row">
										<table style="margin-top: 20px;"
											class="datatable table table-bordered table-striped table-condensed cf">
											<thead class="cf">
												<th style="color: blue;">""Credit / Sale Return</th>
											</thead>
										</table>
									</div>
									<div class="tab-content">
										<div  class="tab-pane fade in active">
											<table  class="table  table-bordered table-striped header-fixed cf" border="1">
												<thead>
													<tr>
														<th>Bill No</th>
														<th>Sale Id</th>
														<th>Bill Date</th>
														<th>Credit Net Amount</th>
														<th>Sale Type</th>													</tr>
												</thead>
												<tbody id="CreditNoteTotalData">
												</tbody>
											</table>
										</div>
									</div>
                                 </div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div><%@include file="Pharma_Footer.jsp"%></div>
		<div id="userObj" style="display: none;"></div>
		<input type="hidden" id="hiddenPatientId" value="0">
		<input type="hidden" id="hiddencompanyId" value="0">
		<input type="hidden" id="hiddencategoryId" value="0">
		<%-- </c:if>  --%>
	</section>
</body>
</html>