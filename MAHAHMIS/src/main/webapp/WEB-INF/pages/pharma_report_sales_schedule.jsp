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
	
	var total=0;

	function getPatientSaleData() {
		var from = $("#popup_container2").val();
		var to = $("#popup_container3").val();

		if (from != '' && to != '') {
			var inputs = [];

			inputs.push('from=' + from);
			inputs.push('to=' + to);

			var str = inputs.join('&');

			jQuery.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "../report/getTotalSchH1PatientSaleData",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					setPartyResult(r);

				}
			});
			return true;
		} else {
			alertify.error('Please Fill All the Details');
		}
	}
	
	function getCounterSaleData() {
		var from = $("#popup_container2").val();
		var to = $("#popup_container3").val();

		if (from != '' && to != '') {
			var inputs = [];

			inputs.push('from=' + from);
			inputs.push('to=' + to);

			var str = inputs.join('&');

			jQuery.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "../report/getTotalSchH1CounterSaleData",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					setPartyResult(r);
				}
			});
			return true;
		} else {
			alertify.error('Please Fill All the Details');
		}
	}
	
	
	
	function getTotalSaleData()
	{
		var from = $("#popup_container2").val();

		var to = $("#popup_container3").val();

		if (from != '' && to != '') {
			var inputs = [];

			inputs.push('from=' + from);
			inputs.push('to=' + to);

			var str = inputs.join('&');

			jQuery.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "../report/getTotalSchH1SaleData",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					setPartyResult(r);

				}
			});
			return true;
		} else {
			alertify.error('Please Fill All the Details');
		}
	}
	
	function getHospitalSaleData()
	{
		var from = $("#popup_container2").val();

		var to = $("#popup_container3").val();

		if (from != '' && to != '') {
			var inputs = [];

			inputs.push('from=' + from);
			inputs.push('to=' + to);

			var str = inputs.join('&');

			jQuery.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "../report/getTotalSchH1HospitalSaleData",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					setPartyResult(r);

				}
			});
			return true;
		} else {
			alertify.error('Please Fill All the Details');
		}
	}
	
	function loadPopUp() {
		var from = $("#popup_container2").val();

		var to = $("#popup_container3").val();

		if (from != '' && to != '') {
			var inputs = [];

			inputs.push('from=' + from);
			inputs.push('to=' + to);

			var str = inputs.join('&');

			jQuery.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "../report/getTotalSchH1IndentSaleData",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					$("#schedule_sale").show();
					setPartyResult(r);

				}
			});
			return true;
		} else {
			alertify.error('Please Fill All the Details');
		}
	}

	function loadPopUp1() {
		var from = $("#popup_container2").val();

		var to = $("#popup_container3").val();

		if (from != '' && to != '') {
			var inputs = [];

			inputs.push('from=' + from);
			inputs.push('to=' + to);

			var str = inputs.join('&');

			jQuery.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "../report/getTotalSchH1CounterSaleData",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					$("#schedule_sale").show();
					setPartyResult(r);

				}
			});
			return true;
		} else {
			alertify.error('Please Fill All the Details');
		}

	}

	function setPartyResult(result) {
		var r = result;
		var divContent = "";
		total=0;
		$('#totalAmount').val('');
		divContent = divContent
				+ "<table class= 'table table-striped table-bordered header-fixed cf ' border=1>";
		for ( var i = 0; i < r.length; i++) {

			divContent = divContent + "<tr><td class='col-md-0.5'>" + (i+1) + "</td><td class='col-md-0.5'>" + r[i].doctorName
			+ "</td><td class='col-md-0.5'>"
					+ r[i].vouNo + "</td><td class='col-md-1'>" + r[i].vendorAddress + "</td><td class='col-md-1'>"
					+ r[i].patientName + "</td><td class='col-md-1'>"+r[i].patientAddress+"</td><td class='col-md-1'>" + r[i].productName
					+ "</td><td class='col-md-1' align='center'>" + parseInt(r[i].qty)
					+ "</td><td class='col-md-0.5'>" + r[i].patientId
					+ "</td><td class='col-md-0.5'>" + r[i].date
					+ "</td></tr>";
					//calculateTotalAmount(r[i].amount);

		}
		$("#dailySaleData").html(divContent);
	}
	
	function calculateTotalAmount(amount)
	{
		
		if(parseFloat(amount)!='' && parseFloat(amount)!='null' && amount.length>0)
		{	
			total=total+parseFloat(amount);
			$('#totalAmount').val(total.toFixed(3));
			$('#totalAmount2').html(total.toFixed(3));
		}	
	}

	function getProductSaleDataByBatchId() {
		/*var indentId = $('#selectIndentId').val();*/

		var from = $("#popup_container2").val();
		var to = $("#popup_container3").val();

		var vendorId = $("input[name=row]:checked").val();

		/* var indentId = indentId; */
		if (vendorId != '' && vendorId.length > 0) {
			var inputs = [];
			inputs.push('vendorId=' + vendorId);
			inputs.push('from=' + from);
			inputs.push('to=' + to);

			var str = inputs.join('&');

			jQuery
					.ajax({
						async : true,
						type : "GET",
						data : str + "&reqType=AJAX",
						url : "/EhatEnterprise/pharmacy/report/getPartyWiseProductSaleList",
						timeout : 1000 * 60 * 5,
						catche : false,
						error : function() {

						},
						success : function(r) {

							setPartyWiseSaleResult(r);

						}
					});
			return true;
		}
	}

	function getDailySaleData() {
		/*var indentId = $('#selectIndentId').val();*/

		var saleType = $("input[name=saleType]:checked").val();
		var from = $("#popup_container2").val();
		var to = $("#popup_container3").val();
		var totalAmount=$("#totalAmount").val();
		
		/* var indentId = indentId; */
		
			var inputs = [];
			inputs.push('saleType=' + saleType);
			inputs.push('from=' + from);
			inputs.push('to=' + to);
			inputs.push('totalAmount=' + totalAmount);
			

			var str = inputs.join('&');

			jQuery
					.ajax({
						async : true,
						type : "GET",
						data : str + "&reqType=AJAX",
						url : "/EhatEnterprise/pharmacy/report/getTotalScheduleSaleReport",
						timeout : 1000 * 60 * 5,
						catche : false,
						error : function() {

						},
						success : function(r) {
							alert("Report Generated Successfully");
							setResult(r);

						}
					});
			return true;
		}
	

	function setResult(result) {
		var splitResult = result.split('$');
		$('#setButtons')
				.html(
						"<button onclick='getDailySaleData()' class='btn btn-xs btn-success' type='button'>Get"
								+ "Report</button> <a title='' target='_blank' id='getPDFFile' name='getPDFFile' style='text-decoration: none;' href='/EhatEnterprise/ehat_Reports/"+splitResult[0]+"'> <input type='button' class='btn btn-xs btn-warning' value='View PDF' style=''></a>"
								/* + "<a title='' target='_blank' id='getPDFFile' style='text-decoration: none;' name='getPDFFile' href='/EhatEnterprise/ehat_Reports/"+splitResult[1]+"'> <input type='button' class='btn btn-xs btn-warning' value='View Excel' style=''></a>"
								 */
								 
								 + "<button style='margin-top: 1px;' type='button' class='btn btn-xs btn-danger' onclick='closePopUp()' data-dismiss='modal'>Close</button>");
	}

	function setPartyWiseSaleResult(result) {
		var r = result;
		var divContent = "";

		if (r.length > 0) {
			divContent = divContent + "";
			for ( var i = 0; i < r.length; i++) {
				divContent = divContent + "<tr><td>" + r[i].patientName
						+ "</td><td>" + r[i].type + "</td>" + "<td>" + r[i].qty
						+ "</td> </tr>";
			}
			divContent = divContent + "";
		} else {
			divContent = divContent + "<b><center>No Record Found</center></b>";
		}

		$("#batchWiseProductData").html(divContent);
	}

	function hidePopUp() {
		/* $('#daily_sale').hide(); */
		location.reload(true);
	}

	function displayResult(item) {
		var content = item.value.split("-");
		$('#hiddenProductId').val(content[0]);
		$('#txtUnit').val(content[1]);
		$('#txtPack').val(content[2]);
		$('#txtComp').val(content[3]);
		$('#txtShelf').val(content[4]);

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
			<%@include file="pharma_report_sales_schedule_pop_up.jsp"%>


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
											<li>Scheduled H1 sales Report</li>
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
											<h4 id="title">Scheduled H1 sales Report</h4>
										</div>

										<div class="col-md-6-1"
											style="margin-top: 0px; margin-bottom: 10px">
											<div class="col-md-2-1" style="margin-top: 9px;">
												<b>For Date:</b>
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
													id="getIndentData" onclick="loadPopUp()"
													style="margin-left: 5%;">Get Data</button>
											</div>

										</div>
									</div>

									<div class="col-md-1-1"
										style="height: 100%; margin-top: 2%; padding-left: 20px;"></div>

									<div class="col-md-6-1"
										style="padding-left: 1%; padding-right: 0%;">
										<div class="box border purple">
											<div class="box-title" style="background-color: #a696ce">
												<h4>
													<i class="fa fa-bitbucket"></i>Scheduled H1 sales Report
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
																			request.getRealPath("/ehat_Reports/Pharmacy/Sales/schh1sale/"));
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
																		href='/EhatEnterprise/ehat_Reports/Pharmacy/Sales/schh1sale/<%=listOfFiles[i].getName()%>'><%=listOfFiles[i].getName()%></a>
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