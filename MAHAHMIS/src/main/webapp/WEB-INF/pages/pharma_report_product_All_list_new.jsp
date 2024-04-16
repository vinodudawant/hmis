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

<%-- <%@include file="pha_header.jsp"%> --%>
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
	<script
	src="<c:url value="../.././pharma-resources/jquery/jquery-2.0.3.min.js"/>"></script>
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

<%-- <script type="text/javascript" src="<c:url value="/js/report.js"/>"></script> --%>

<script
	src="<c:url value="../.././pharma-resources/js/auto/bootstrap-typeahead.js"/>"></script>

<!-- CUSTOM SCRIPT -->
<script src="<c:url value="../.././pharma-resources/js/script.js"/>"></script>
<!-- SELECT2 -->
<link
	href="<c:url value="../../../pharma-resources/js/select2/select2.min.css"/>"
	rel="stylesheet">
	<script
	src="<c:url value="../../../pharma-resources/js/select2/select2.min.js"/>"></script>
<script
	src="<c:url value="../.././pharma-resources/js/pharma_productList_report.js"/>"></script>
	
<script
	src="<c:url value="../.././pharma-resources/js/pharma_gst_sale_report.js"/>"></script>

</head>
<script>
	jQuery(document).ready(function() {
		//App.setPage("UserManagement"); //Set current page
		App.init(); //Initialise plugins and elements
		//alert("hello");
		getCompanyList();
		getProductListData('onload');
			$("#userData").select2();
			
	});
	

	function getCompanyList() {
		var inputs = [];
		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/report/getCompanyWiseBatchExpiry",
					timeout : 1000 * 60 * 5,
					cache : false,
					error : function() {
						alert('error');
					},
					success : function(r) {
						 var divContent = "";
							divContent = divContent
									+ "<select><option value='0'>--Select--</option>";
								
							for ( var i = 0; i < r.length; i++) {
								divContent = divContent
										+ "<option value='"+r[i].compId+"'>"
										+ r[i].compId + " "
										+ r[i].compName + "</option>";
							}
						divContent = divContent + "</select>";
						$("#userData").html(divContent);
						$("#userData").show('show'); 
						$("#userData").select2();
					}
				});

	}

function loadPopup(){
	var userData = $("#userData").val();
	if(userData==undefined || userData==""||userData==null){
		getProductListData(callform)
		}else{
			getProductListDataCompanyWise('comapnyWise')
			}

	
}	
	function getProductListData(callform){
		//var userData = $("#userData").val();
		var from = $("#popup_container2").val();
		var to = $("#popup_container3").val();
		if(from==""&& to==""){
			from = new Date().toISOString().slice(0, 10);
			to= new Date().toISOString().slice(0, 10);
			
		}
		
		//alert("userData>>"+callform);
		var inputs = [];
		inputs.push('callform=' + callform);
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/report/getProductListData",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {

			},
			success : function(r) {
				setCurrentStockResult(r);
			}
		});
	}

	function getProductListDataCompanyWise(callform){
		var userData = $("#userData").val();
		var from = $("#popup_container2").val();
		var to = $("#popup_container3").val();
		if(from==""){
			alert("Please select date");
			return false;
			
		}
		if(to==""){
			alert("Please select date");
			return false;
			
		}
		
		//alert("userData>>"+callform);
		var inputs = [];
		inputs.push('callform=' + callform);
		inputs.push('from=' + from);
		inputs.push('to=' + to);
		inputs.push('userData=' + userData);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/report/getProductListData",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {

			},
			success : function(r) {
				setCurrentStockResult(r);
			}
		});
	}	
	
	
	function setCurrentStockResult(result) {
		var divContent = "";			
		for ( var i = 0; i < result.length; i++) {
	
				divContent = divContent
				+ '<tr>'
				+ '<td>'+ result[i].name	+'</td>'
				+ '<td>'+ result[i].shortName+'</td>'
				+ '<td>'+ result[i].companyName+'</td>'
				+'</tr>';
				
					
		   
		$("#currentstockdetails").html(divContent);
		}
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
											<li>Product List</li>

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
																							'div[id$=salereportListwithgstwhole]')
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
													data-original-title="Pdf">Export To Excel</button> <script
													type="text/javascript">
												$("[id$=btnPdf]")
														.click(
																function(e) {
																	window
																			.open('data:application/vnd.ms-pdf,'
																					+ encodeURIComponent($(
																							'div[id$=salereportListwithgstwhole]')
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

				
										
										
										<div class="form-group col-md-4-1" style="margin-top: 9px;">
															<select class="form-control" id="userData" name="userData">
																			<option value="0">Select</option>
																		</select>
																	</div>	
																	
										

									</div>
									
									<div class="col-md-12-1"></div>

									<div class="col-md-12-1">

									</div>

									<div class="col-md-12-1">
								<div class="col-md-4-1">
					
										</div> 
										
										
											<div style="margin-top: 0px; margin-bottom: 10px"
											class="col-md-4-1">
											<div class="col-md-4-1" style="margin-top: 9px;">
												<b></b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<button style="margin-left: 5%;"
													onclick="loadPopup()" id="getproductData"
													type="button" class="btn btn-xs btn-success">Get
													Data</button>
											</div>

										</div>	

 
									</div>

								</div>

								<div class="col-md-12-1 panel-body"
									style="border: 2px solid; margin-top: 2%;" id="salereportListwithgstwhole">
									<div class="col-md-12-1 center" style="margin-bottom: 10px;">
										

								<!-- 	<table>
										<thead>
										<tr><th colspan="7" align="center"><h4 id="titlesalewithgst" align="center">Product List</h4></th></tr>
										<tr><th  align="center"></th></tr>
										<span style="float: right"><strong>Total Amount</strong>&nbsp;&nbsp;&nbsp;&nbsp;<input
											type="text" name="totalAmount" id="totalAmount" readonly
											style="float: right" placeholder="Total Amount"></span>
										</thead>
										</table> -->


									</div>

									<div class="col-md-12-1"
										>

										<div class="tab-content">
											<div class="tab-pane fade in active"
											>
												<table
													class='table table-bordered table-condensed cf table-fixed'
														style='margin-bottom: 9px;'>
													<thead style="background-color: lightgray;">
														<tr>
															<th>Product Name</th>
															<th>Short Name</th>
															<th>Comapny Name</th>
															<!-- <th>Packing</th> -->
															
															<<!-- th>Company Name</th>
															<th>Batch Code</th>
															<th>Batch Exp Date</th>
															<th>MRP</th>
															
															<th>Clear Stock</th>
															<th>Pur Rate Per Unit</th>
															<th>AMOUNT</th> -->
															
														</tr>
													</thead>
													<tbody id="currentstockdetails">
													</tbody>
												</table>
													<div class="pull-right" >
														<ul class="pagination" id="opdpagenation">
																							
																	</ul>
																					</div>
																					<div class="col-md-4 col-md-offset-8">
																						<div class="pull-right">
																							<ul
																								class="pagination pagination-blue margin-bottom-10"
																								id="totalNumberOfPagesOpd">
																							
																							</ul>
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
			</div>
		</div>
		<div><%@include file="Pharma_Footer.jsp"%></div>
		
		<input type="hidden" id="countopdpage"
			value="">	
		<%-- </c:if>  --%>
	</section>
</body>
</html>