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
		getPatientwiseTotalSale();
	});

	function getPatientwiseTotalSale() 
	{
		var from = $("#popup_container2").val();
		var to = $("#popup_container3").val();

			var inputs = [];
			inputs.push('from=' + from);
			inputs.push('to=' + to);
		
			var str = inputs.join('&');
			jQuery
					.ajax({
						async : true,
						type : "POST",
						data : str + "&reqType=AJAX",
						url : "../pharmacyReport/getTotalPatientData",
						timeout : 1000 * 60 * 5,
						catche : false,
						error : function() {

						},
						success : function(r) {
							//alert(JSON.stringify(r));
						//	$("#partywise_purchase").show();
								setPartyWisePurchaseResult(r); 
							
						}
					});
			return true;
		}
	
	function setPartyWisePurchaseResult(result) 
	{
		var r = result;
		var divContent = "";
		total=0;
	divContent = divContent
				+ "<table class= 'table table-striped table-bordered header-fixed cf ' border=1>";
		for ( var i = 0; i < r.length; i++) 
		{
			var patientTransType = r[i].billMode;
			if(patientTransType ==1){
				patientTransType ="Credit"
			}else{
				patientTransType ="Cash"
				}
			divContent = divContent + "<tr><td class='col-md-1'>" + r[i].id + "</td><td class='col-md-1'>" + r[i].date1 + "</td><td class='col-md-1'>" + r[i].patientName
			+ "</td><td class='col-md-1'>"
					+ r[i].netAmt + "</td><td class='col-md-1'>" + r[i].amtRec + "</td><td class='col-md-1'>"
					+ r[i].totalVat5 + "</td><td class='col-md-1'>"
					+ r[i].taxable55 + "</td><td class='col-md-1'>"+r[i].totalVat12+"</td><td class='col-md-1'>"
					+ r[i].taxable12 + "</td><td class='col-md-1'>" + r[i].totalVat0
					+ "</td><td class='col-md-1'>"
					+ r[i].taxable0 + "</td><td class='col-md-1'>" + r[i].amtBal
					+ "</td><td class='col-md-1'>" + patientTransType
					+ "</td></tr>";
			calculateTotal55(r[i].totalVat5);  
			calculateTotal125(r[i].totalVat12);
			calculateTotal0(r[i].totalVat0);
			calculateTotalNet(r[i].netAmt);
			calculateTotalTaxable55(r[i].taxable55);  
			calculateTotalTaxable12(r[i].taxable12);  
			calculateTotalTaxable0(r[i].taxable0);  
			
		}
		$("#prodList").html(divContent);
	}
	
	function calculateTotalTaxable55(amount) 
	{
		if (parseFloat(amount) != '' && parseFloat(amount) != 'null')
		{
			taxable55 = taxable55 + parseFloat(amount);
		}
		$('#taxable55').val(taxable55.toFixed(2));		
	}
	
	function calculateTotalTaxable12(amount) 
	{
		if (parseFloat(amount) != '' && parseFloat(amount) != 'null')
		{
			taxable12 = taxable12 + parseFloat(amount);
		}
		$('#taxable125').val(taxable12.toFixed(2));		
	}
	
	function calculateTotalTaxable0(amount) 
	{
		if (parseFloat(amount) != '' && parseFloat(amount) != 'null')
		{
			taxable0= taxable0 + parseFloat(amount);
		}
		$('#taxable0').val(taxable0.toFixed(2));		
	}
	
	
	
	function calculateTotal55(amount) 
	{
		if (parseFloat(amount) != '' && parseFloat(amount) != 'null')
		{
			total55 = total55 + parseFloat(amount);
		}
		$('#vat55').val(total55.toFixed(2));		
	}
	
	function calculateTotal125(amount) 
	{
	if (parseFloat(amount) != '' && parseFloat(amount) != 'null')
		{
			total125 = total125 + parseFloat(amount);
		}
		$('#vat125').val(total125.toFixed(2));
	}
	
	
	function calculateTotal0(amount) 
	{
		if (parseFloat(amount) != '' && parseFloat(amount) != 'null')
		{
			total0 = total0 + parseFloat(amount);
		}
		$('#vat0').val(total0.toFixed(2));
	}
	
	function calculateTotalNet(amount) 
	{
		if (parseFloat(amount) != '' && parseFloat(amount) != 'null')
		{
			totalNetAmt = totalNetAmt + parseFloat(amount);
		}
		$('#netAmt').val(totalNetAmt.toFixed(2));		
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
											<li>Total Sale Vat Report</li>
											
											<!-- <li class="pull-right" id="template" style="display: none;">
												<button type="submit" class="btn btn-xs btn-success"
													onclick="getReportForPharmacyCompanyList();">Get
													Vendor Report</button> 
											</li> -->
											<li class="pull-right">
											<button id="btnExport"
												class="btn btn-xs btn-info pull-right" value="Excel"
												title="" data-placement="left" data-toggle="tooltip"
												data-original-title="Excel">Export To Excel</button>

											<script type="text/javascript">
												$("[id$=btnExport]")
														.click(
																function(e) {
																	window
																			.open('data:application/vnd.ms-excel,'
																					+ encodeURIComponent($(
																							'div[id$=reportList]')
																							.html()));
																	e
																			.preventDefault();
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
												<b>Total Net Amount:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<input id="netAmt"
													
													type="text" readonly
													>
													
													
											</div>
										</div>
										
									</div>
									
									<div class="col-md-12-1">
										
										<div class="col-md-4-1 "
											style="margin-top: 0px; margin-bottom: 10px;">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>Total Taxable 6:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<input id="taxable55" readonly
													
													
													>
											</div>
										</div>

                                      <div class="col-md-4-1 "
											style="margin-top: 0px; margin-bottom: 10px;">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>Total Vat 6:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<input id="vat55"
													type="text">
											</div>
										</div>
										<div class="col-md-4-1 "
											style="margin-top: 0px; margin-bottom: 10px;">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>Total Taxable13.5:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<input id="taxable125" readonly
													type="text" >
											</div>
										
										
										
										
										</div>
									</div>

									<div class="col-md-12-1">
										
										<div class="col-md-4-1 "
											style="margin-top: 0px; margin-bottom: 10px;">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>Total Vat 13.5:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<input id="vat125" readonly
													type="text" >
											</div>
										
										
										
										
										</div>

                                    <div class="col-md-4-1 "
											style="margin-top: 0px; margin-bottom: 10px;">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>Total Taxable0:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<input id="taxable0" readonly
													type="text" >
											</div>
										
										
										
										
										</div>
										<div class="col-md-4-1 "
											style="margin-top: 0px; margin-bottom: 10px;">
											<div class="col-md-4-1 "
											style="margin-top: 0px; margin-bottom: 10px;">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>Total vat0:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<input id="vat0" readonly
													type="text" >
											</div>
										
										
										
										
										</div>
										
										
										
										
										<div style="margin-top: 0px; margin-bottom: 10px" class="col-md-4-1">
											<div class="col-md-4-1" style="margin-top: 9px;">
												<b></b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<button style="margin-left: 5%;" onclick="getPatientwiseTotalSale()" id="getproductData" type="button" class="btn btn-xs btn-success">Get Data</button>
											</div>

										</div>
										</div>
									</div>
								</div>

								<div class="col-md-12-1 panel-body" style="border: 2px solid;margin-top: 2%;" id="reportList">
										<div class="col-md-12-1 center" style="margin-bottom: 10px;">
											<h4 id="title">Total Sale Vat Report</h4>


										</div>
										
									<div class="col-md-12-1" style="width: 100%; overflow-y: scroll; height: 400px; max-height: auto;">
											
									<div class="tab-content">
										<div  class="tab-pane fade in active">
											<table  class="table  table-bordered table-striped header-fixed cf" border="1">
												<thead>
													<tr>
														<!-- <th>Sr No</th>  -->
														<th>Bill Id</th>
														<th>Date</th>
														<th>Patient Name</th>
														<th>Net Amount</th>
														<th>Cash Receive</th>
														<th>Vat 6</th> 
														<th>Taxable 6</th>
														
														<th>Vat 13.5</th>
														<th>Taxable 13.5</th>
														<th>Vat 0</th>
														<th>Taxable 0</th>
														<th>Pending AMount</th>
														<th>Transaction Type</th>
													</tr>
												</thead>
												<tbody id="prodList">
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
		<input type="hidden" id="hiddenProductId" value="0">
		<input type="hidden" id="hiddencompanyId" value="0">
		<input type="hidden" id="hiddencategoryId" value="0">
		<%-- </c:if>  --%>
	</section>
</body>
</html>