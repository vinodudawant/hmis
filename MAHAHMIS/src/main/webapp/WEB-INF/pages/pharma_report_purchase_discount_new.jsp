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

<script
	src="<c:url value="/pharmacy/resources/js/auto/bootstrap-typeahead.js"/>"></script>

<!-- CUSTOM SCRIPT -->
<script src="<c:url value="/pharmacy/resources/js/script.js"/>"></script>
<script
	src="<c:url value="/pharmacy/resources/js/pharma_productList_report.js"/>"></script>
	
<script
	src="<c:url value="/pharmacy/resources/js/pharma_gst_sale_report.js"/>"></script>

</head>
<script>
	jQuery(document).ready(function() {
		//App.setPage("UserManagement"); //Set current page
		App.init(); //Initialise plugins and elements
		
	//	getAllUnit();
	});
	
	function getPurchaseDiscount(){
		var from = $("#popup_container2").val();
		var to = $("#popup_container3").val();

		if (from != '' && to != '') {
			var inputs = [];
			
			inputs.push('from=' + from);
			inputs.push('to=' + to);

			var str = inputs.join('&');

			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "../report/getPurchaseDiscount",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					//$("#discountPopUp").show();
					setPurchaseDiscountResult(r);

				}
			});
			return true;
		} else {
			alertify.error('Please Fill All the Details');
		}


	}
	
	function setPurchaseDiscountResult(result) {
		var r = result;
		var divContent = "";
		total=0;
		totalItemDisc=0;
		totalSchemeDisc=0;
		totalSplDisc=0;
		totalCdDisc=0;
		

		if (r.lstpurc.length > 0) {
			divContent = divContent + "";
			for ( var i = 0; i < r.lstpurc.length; i++) {
				var type ="Cash/Credit";
				divContent = divContent + "<tr><td class='col-md-1-1'>" + r.lstpurc[i].pur_id + "</td><td class='col-md-1-1'>"
						+ type + "</td><td class='col-md-1-1'>" + r.lstpurc[i].pur_entry_date + "</td><td class='col-md-1-1'>" + r.lstpurc[i].purBillNo + "</td><td class='col-md-1-1'>"
						+ r.lstpurc[i].date + "</td><td class='col-md-1-1'>"+r.lstpurc[i].vendorName+"</td><td class='col-md-1-1'>"+r.lstpurc[i].productName+"</td><td class='col-md-1-1'>"+r.lstpurc[i].amnt+"</td><td class='col-md-1-1'>"+r.lstpurc[i].discount+"</td><td class='col-md-1-1'>"+r.lstpurc[i].pur_schm_disc+"</td><td class='col-md-1-1'>"+r.lstpurc[i].pur_spl_disc+"</td><td class='col-md-1-1'>"+r.lstpurc[i].pur_cd+"</td></tr>";
		            	
				calculateTotalAmount(r.lstpurc[i].amnt);
				calculateTotalItemDisc(r.lstpurc[i].discount);
				calculateTotalSchemeDisc(r.lstpurc[i].pur_schm_disc);
				calculateTotalSplDisc(r.lstpurc[i].pur_spl_disc);
				calculateTotalCDPer(r.lstpurc[i].pur_cd);
			}
			divContent = divContent + "";
		} else {
			divContent = divContent + "<b><center>No Record Found</center></b>";
		}
		$("#totalDisc").val(totalItemDisc+totalSchemeDisc+totalSplDisc+totalCdDisc);
		
		$("#pendingBillResult").html(divContent);
	}
	
	
	function calculateTotalAmount(amount) {
		if (parseFloat(amount) != '' && parseFloat(amount) != 'null'
				&& amount.length > 0) {
			total = total + parseFloat(amount);
		}
		$("#totalAmount").val(total);
	}
	
	function calculateTotalItemDisc(amount) {
		if (parseFloat(amount) != '' && parseFloat(amount) != 'null'
				&& amount.length > 0) {
			totalItemDisc = totalItemDisc + parseFloat(amount);
		}
		$("#itemDisc").val(totalItemDisc);
	}
	
	function calculateTotalCDPer(amount) {
		if (parseFloat(amount) != '' && parseFloat(amount) != 'null'
				&& amount.length > 0) {
			totalCdDisc = totalCdDisc + parseFloat(amount);
		}
		$("#cd").val(totalCdDisc);
	}
	
	function calculateTotalSchemeDisc(amount) {
		if (parseFloat(amount) != '' && parseFloat(amount) != 'null'
				&& amount.length > 0) {
			totalSchemeDisc = totalSchemeDisc + parseFloat(amount);
		}
		$("#schmDisc").val(totalSchemeDisc);
	}
	
	function calculateTotalSplDisc(amount) {
		if (parseFloat(amount) != '' && parseFloat(amount) != 'null'
				&& amount.length > 0) {
			totalSplDisc = totalSplDisc + parseFloat(amount);
		}
		$("#splDisc").val(totalSplDisc);
	}
	
	function calculateTotalSpecialDisc(amount) {
		if (parseFloat(amount) != '' && parseFloat(amount) != 'null'
				&& amount.length > 0) {
			totalItemDisc = totalItemDisc + parseFloat(amount);
		}
		$("#itemDisc").val(totalItemDisc);
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
											<li>Purchase Discount Report</li>

											<!-- <li class="pull-right" id="template" style="display: none;">
												<button type="submit" class="btn btn-xs btn-success"
													onclick="getReportForPharmacyCompanyList();">Get
													Vendor Report</button> 
											</li> -->
											<li class="pull-right">
												<button id="btnExport"
													class="btn btn-xs btn-info pull-right" value="Excel"
													title="" data-placement="left" data-toggle="tooltip"
													data-original-title="Excel">Export To Excel</button> <script
													type="text/javascript">
												$("[id$=btnExport]")
														.click(
																function(e) {
																	window
																			.open('data:application/vnd.ms-excel,'
																					+ encodeURIComponent($(
																							'div[id$=purchaseDayBookData]')
																							.html()));
																	e
																			.preventDefault();
																});
											</script>
											</li>
											
												<li class="pull-right">
												<button id="btnPdf"
													class="btn btn-xs btn-info pull-right" value="Pdf"
													title="" data-placement="left" data-toggle="tooltip"
													data-original-title="pdf">Export To PDF</button> <script
													type="text/javascript">
												$("[id$=btnPdf]")
														.click(
																function(e) {
																	window
																			.open('data:application/vnd.ms-pdf,'
																					+ encodeURIComponent($(
																							'div[id$=purchaseDayBookData]')
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

												<input type="text" id="popup_container2" name="txtBillDate"
													class="form-control input-SmallText" readonly
													placeholder="From Date" required
													onfocus="displayCalendar(document.getElementById('popup_container2'),'yyyy-mm-dd',this)">
											</div>
										</div>

										<div class="col-md-4-1 "
											style="margin-top: 0px; margin-bottom: 10px;">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>To:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<input type="text" class="form-control input-SmallText"
													placeholder="To Date" readonly="readonly"
													onclick="displayCalendar(document.getElementById('popup_container3'),'yyyy-mm-dd',this)"
													name="popup_container3" id="popup_container3">
											</div>
										</div>
										<div style="margin-top: 0px; margin-bottom: 10px"
											class="col-md-4-1">
											<div class="col-md-4-1" style="margin-top: 9px;">
												<b></b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<button style="margin-left: 5%;"
													onclick="getPurchaseDiscount()" id="getproductData"
													type="button" class="btn btn-xs btn-success">Get
													Data</button>
											</div>

										</div>
										<!-- <div class="col-md-4-1 "
											style="margin-top: 0px; margin-bottom: 10px;">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>Product Name:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<input id="searchBox1"
													class="form-control input-SmallText ui-autocomplete-input typeahead1"
													type="text" autocomplete="off" name="searchBox1"
													placeholder="Product Name"
													onkeyup="searchProductList(this.id);">


											</div>
										</div> -->

									</div>

									<div class="col-md-12-1">
<!-- 
										<div class="col-md-4-1 "
											style="margin-top: 6px; margin-bottom: 10px;">


											<input type="radio" value="1" onclick="myFunction(1)"
												name="purTransType" id="rdoCashCredit"> <b>Credit</b>
											<input type="radio" value="0" style="margin-left: 2%;"
												onclick="myFunction(2)" name="purTransType" id="rdoCash">
											<b>Cash</b> <input type="radio" value="2"
												style="margin-left: 2%;" onclick="myFunction(3)"
												name="purTransType" id="rdoCard"> <b>Card </b> <input
												type="radio" value="3" checked="true"
												style="margin-left: 2%;" onclick="myFunction(3)"
												name="purTransType" id="rdoCard"> <b>All </b>


										</div>
 -->

										<!-- <div class="col-md-4-1 "
											style="margin-top: 0px; margin-bottom: 10px;">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>Hospital Unit:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<select class="form-control input-SmallText" style=""
													id="unitId">

												</select>
											</div>
										</div> -->
									<!-- 	<div class="col-md-4-1 "
											style="margin-top: 0px; margin-bottom: 10px;">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>Patient Name:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<input id="searchBox5"
													class="form-control input-SmallText ui-autocomplete-input typeahead3"
													type="text" autocomplete="off" name="searchBox5"
													placeholder="Patient Name"
													onkeyup="autoSuggestionForPateintNameIndentSale1('searchBox5', 'onchange');">
											</div>




										</div> -->
									</div>

									<div class="col-md-12-1">




										<!-- <div class="col-md-5-1 "
											style="margin-top: 6px; margin-bottom: 10px;">


											<input type="radio" value="patient" 
												name="saleTye" id="patientsaletype"> <b>Patient
												Sale Total</b> <input type="radio" value="counter"
												style="margin-left: 2%;" name="saleTye" id="countersaletype">
											<b>CounterSale</b> <input type="radio" value="indent"
												style="margin-left: 2%;" name="saleTye" id="indentsaletype">
											<b>IndentSale </b> <input type="radio" value="all" checked="checked"
												style="margin-left: 2%;" name="saleTye" id="allsaletype">
											<b>Total Sale </b>


										</div> -->



										<!-- <div style="margin-top: 0px; margin-bottom: 10px"
											class="col-md-4-1">
											<div class="col-md-4-1" style="margin-top: 9px;">
												<b></b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<button style="margin-left: 5%;"
													onclick="getsaleReportDatawithgstwhole()" id="getproductData"
													type="button" class="btn btn-xs btn-success">Get
													Data</button>
											</div>

										</div> -->
									</div>

								</div>

								<div class="col-md-12-1 panel-body"
									style="border: 2px solid; margin-top: 2%;" id="purchaseDayBookData">
									<div class="col-md-12-1 center" style="margin-bottom: 10px;">
										

										<table>
										<thead>
										<!-- <tr><th colspan="7" align="center"><h4 id="titlesalewithgst" align="center">Purchase Discount Report</h4></th></tr> -->
										<tr><th  align="center"></th></tr>
										<tr>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
										
										<td><span style="float: right"><b>Total Amount</b><input type="text"
												name="totalAmount" id="totalAmount" readonly
												style="float: right" placeholder="Total Amount"></span>
										</td>
										<td><span style="float: right"><b>Total Item Discount</b><input type="text"
												id="itemDisc" readonly
												style="float: right" placeholder="Total Item Disc"></span></td>
										<td><span style="float: right"><b>Total Schm Discount</b><input type="text"
												id="schmDisc" readonly
												style="float: right" placeholder="Total SChm Disc"></span></td>		
										<td><span style="float: right"><b>Total Special Discount</b><input type="text"
												id="splDisc" readonly
												style="float: right" placeholder="Total Special Disc"></span></td>		
										<td><span style="float: right"><b>Total CD Discount</b><input type="text"
												id="cd" readonly
												style="float: right" placeholder="Total cd"></span></td>		
										
									</tr>
									<tr></tr>
									<tr>
										<td colspan='11'><span style="float:right"><strong>Total Disc Received</strong>&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" name="totalAmount" id="totalDisc" readonly style="float:right" placeholder="Total Amount"></span></td>
									</tr>
										</thead>
										</table>

									</div>

									<div class="col-md-12-1"
										style='height: 485px; max-height: auto;  overflow-x: scroll; overflow-y: scroll;'>

										<div class="tab-content">
											<div class="tab-pane fade in active"
											>
												<table
													class='table table-bordered table-condensed cf table-fixed'
														style='margin-bottom: 9px;  overflow-x: scroll; overflow-y: scroll; max-width: 1000%;'>
													<thead style="background-color: lightgray;">
														<tr>
															<th>Vou No</th>
															<th>Type</th>
															<th>Voucher Date</th>
	
															<th>Bill No</th>
															<th>Bill Date</th>
															<th>vendor Name</th>
														 	<th>Product Name</th> 
															
															<th>Bill Amount</th>
																														
															<th>Item Disc</th>
															<th>Schm Disc</th>
															<th>Spl Disc</th>
															<th>CD%</th>
				
															
														</tr>
													</thead>
													<tbody id="pendingBillResult">
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
		<input type="hidden" id="hiddenProductId" value="0"> <input
			type="hidden" id="hiddencompanyId" value="0"> <input
			type="hidden" id="hiddencategoryId" value="0">
			<input type="hidden" id="hiddenvendorId" value="0"> 
			<input type="hidden" id="hiddenPatientId" value="0"> 
			<input type="hidden" id="ReportData" value=""> 
			
		<%-- </c:if>  --%>
	</section>
</body>
</html>