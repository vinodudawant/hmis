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
<script
	src="<c:url value="../.././pharma-resources/js/pharma_productList_report.js"/>"></script>

</head>
<script>
	jQuery(document).ready(function() {
		//App.setPage("UserManagement"); //Set current page
		App.init(); //Initialise plugins and elements
		
		getAllUnit();
	});

	function loadPopUp() {
		var productId = $("#hiddenProductId").val();
		var from = $("#popup_container2").val();
		var to = $("#popup_container3").val();
		var saleTye = $("input:radio[name='saleTye']:checked").val();

		if (productId != '' && from != '' && to != '') {
			var inputs = [];
			inputs.push('productId=' + productId);
			inputs.push('from=' + from);
			inputs.push('to=' + to);
			inputs.push('saleTye=' + saleTye);
			

			var str = inputs.join('&');

			jQuery.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "../pharmacyReport/getProductWiseBatchList",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					$("#product_batch").show();
					setBatchResult(r);

				}
			});
			return true;
		}
		else
		{
			alertify.error('Please Fill All the Details');
		}	

	}

	function setBatchResult(result) 
	{
		var r = result;
		var divContent = "";
		total=0;
	divContent = divContent
				+ "<table class= 'table table-striped table-bordered header-fixed cf ' border=1>";
		for ( var i = 0; i < r.length; i++) 
		{
			var unit = r[i].unit;
			 var date=new Date(r[i].date).toLocaleString();
			 var date = (date.split(",")[0]).split('/');
			 var datetime = date[1]+'/'+date[0]+'/'+date[2] 
			divContent = divContent + "<tr><td class='col-md-1'>" + (i+1) + "</td><td class='col-md-1'>" + datetime + "</td><td class='col-md-1'>" + r[i].batchId
			+ "</td><td class='col-md-1'>"
					+ r[i].productName + "</td><td class='col-md-1'>" + r[i].patientName + "</td><td class='col-md-1'>"
					+ r[i].patientId + "</td><td class='col-md-1'>"
					+ r[i].categoryName + "</td><td class='col-md-1'>"+r[i].qty+"</td><td class='col-md-1'>"
					+ r[i].batchCode + "</td><td class='col-md-1'>" + (r[i].mrp/unit) + "</td></tr>";
					//+ "</td><td class='col-md-1'>" t) 
				//	+ r[i].taxable0 + "</td><td class='col-md-1'>" + r[i].amtBal
					//+ "</td><td class='col-md-1'>" + patientTransType
					
			
			
		}
		$("#purchasedetails").html(divContent);
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
											<li>Purchase Details Report</li>

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

												<input type="text" id="popup_container2" name="txtBillDate"
													class="form-control input-SmallText" readonly
													placeholder="From Date" required
													onfocus="displayCalendar(document.getElementById('popup_container2'),'dd/mm/yyyy',this)">
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
													onclick="displayCalendar(document.getElementById('popup_container3'),'dd/mm/yyyy',this)"
													name="popup_container3" id="popup_container3">
											</div>
										</div>

										<div class="col-md-4-1 "
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
										</div>

									</div>

								<!-- 	<div class="col-md-12-1">

										<div class="col-md-4-1 "
											style="margin-top: 0px; margin-bottom: 10px;">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>Mfg Name:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<input id="searchBox2"
													class="form-control input-SmallText ui-autocomplete-input typeahead2"
													type="text" autocomplete="off" name="searchBox2"
													placeholder="Mfg Name" onkeyup="searchMfg(this.id);">
											</div>
										</div>

										<div class="col-md-4-1 "
											style="margin-top: 0px; margin-bottom: 10px;">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>Vendor Name:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<input id="searchBox4"
													class="form-control input-SmallText ui-autocomplete-input typeahead4"
													type="text" autocomplete="off" name="searchBox4"
													placeholder="Vendor Name"
													onkeyup="autosuggetionVendorView(this.id);">
											</div>
										</div>
										<div class="col-md-4-1 "
											style="margin-top: 0px; margin-bottom: 10px;">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>Category:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<input id="searchBox3"
													class="form-control input-SmallText ui-autocomplete-input typeahead3"
													type="text" autocomplete="off" name="searchBox3"
													placeholder="Category" onkeyup="searchcategory(this.id);">
											</div>




										</div>
									</div> -->

									<div class="col-md-12-1">
<!-- 
										<div class="col-md-4-1 "
											style="margin-top: 0px; margin-bottom: 10px;">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>Store Name:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												<input id="searchBox5"
													class="form-control input-SmallText ui-autocomplete-input typeahead5"
													type="text" autocomplete="off" name="searchBox5"
													placeholder="Store Name" onkeyup="searchcategory(this.id);">
											</div>




										</div> -->
										
										<div class="col-md-4-1 "
											style="margin-top: 6px; margin-bottom: 10px;">
											
															
																<input type="radio" value="counterSale" name="purTransType" id="saleTye">
																<b>CounterSale</b>
																<input type="radio" value="indentSale" style="margin-left:2%;"  name="saleTye" id="rdoCash">
																<b>IndentSale</b>
																<input type="radio" value="patientSale" style="margin-left:2%;"  name="saleTye" id="rdoCard">
																<b>PatientSale </b>
																
																<input type="radio" value="all" checked="true" style="margin-left:2%;"  name="saleTye" id="rdoCard">
																<b>All </b>
															
													
										</div>

										
										<div class="col-md-4-1 "
											style="margin-top: 0px; margin-bottom: 10px;">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>Hospital Unit:</b>
											</div>
											<div class="col-md-4-1" style="margin-top: 9px;">
												 <select class="form-control input-SmallText"
													style="" id="unitId">
													
												</select>
											</div>




											<div style="margin-top: 0px; margin-bottom: 10px"
												class="col-md-4-1">
												<div class="col-md-4-1" style="margin-top: 9px;">
													<b></b>
												</div>
												<div class="col-md-4-1" style="margin-top: 9px;">
													<button style="margin-left: 5%;" onclick="loadPopUp()"
														id="getproductData" type="button"
														class="btn btn-xs btn-success">Get Data</button>
												</div>

											</div>
										</div>
									</div>
								</div>

								<div class="col-md-12-1 panel-body"
									style="border: 2px solid; margin-top: 2%;" id="reportList">
									<div class="col-md-12-1 center" style="margin-bottom: 10px;">
										


										<table>
										<thead>
										<tr><th colspan="7" align="center"><h4 id="titlepurchaseDetail" align="center">Purchase Details Report</h4></th></tr>
										<tr><th  align="center"></th></tr>
										
										</thead>
										</table>
									</div>

									<div class="col-md-12-1"
										style="width: 100%; overflow-y: scroll; height: 400px; max-height: auto;">

										<div class="tab-content">
											<div class="tab-pane fade in active">
												<table
													class="table  table-bordered table-striped header-fixed cf"
													border="1">
													<thead>
														<tr>
															<th>Sr No</th>
															<th>Date</th>
															<th>Bill No</th>
															<th>Product Name</th>
															<th>Patient Name</th>
															<th>Patient Id</th>
															<th>Category Name</th>
															<th>QTY</th>
															<th>Batch No</th>
															<th>Rate</th>
														</tr>
													</thead>
													<tbody id="purchasedetails">
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
			
		<%-- </c:if>  --%>
	</section>
</body>
</html>