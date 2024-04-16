<%@page import="java.util.Calendar"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">
<title>Services List</title>
<link rel="stylesheet" type="text/css" href="css/ehat_general.css">
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher">
<link rel="stylesheet" type="text/css" href="css/responsive.css">
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet"
	media="screen">
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet">

<!-- <link rel="stylesheet" type="text/css" href="js/datePicker.css" />

<script src="js/jquery.datePicker-min.js" type="text/javascript"></script> -->
<!-- JQUERY -->
<script src="jquery/jquery-2.1.1.js"></script>
<!-- JQUERY UI-->
<script
	src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<!-- BOOTSTRAP -->
<script src="bootstrap-dist/js/bootstrap.min.js"></script>
<script src="bootstrap-dist/js/bootstrap.js"></script>
<!-- SLIMSCROLL -->
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
<!-- BLOCK UI -->
<script type="text/javascript" src="js/jQuery-BlockUI/jquery.blockUI.min.js"></script>
<script type="text/javascript" src="ehat-design/js/jspdf.min.js"></script>

<!-- for Developers  -->
<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/additional-methods.min.js"></script>
<script type="text/javascript" src="js/validate.js"></script>

<!-- SELECT2 -->
<link rel="stylesheet" type="text/css" href="ehat-design/js/select2/select2.min.css" />

<!-- Auto-Suggestion 8/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<!--calender Files  -->
<script type="text/javascript"
	src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen"></link>
<script src="js/ehatmasterInfo.js"></script>
<script src="js/packagereport.js"></script>
<!-- CUSTOM SCRIPT -->


<script type="text/javascript">
	onload = function() {

		fetchAllServicemasterInfo();	
	};

	/* jQuery(document).ajaxStart(function() {
		
		$("body").addClass("loading");
	});

	jQuery(document).ajaxStop(function() {
		$("body").removeClass("loading");
		
	}); */
</script>

<style type="text/css">


.ajaxmodal {
	display: none;
	position: fixed;
	z-index: 1000;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background: rgba(255, 255, 255, .8)
		url('images/ajax_loader_blue_64.gif') 50% 50% no-repeat;
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

<script>
	jQuery(document).ready(function() {
		App.setPage("Report"); //Set current page
		App.init(); //Initialise plugins and elements
	});
</script>
</head>
<body>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
	<c:if test="${sessionScope.userType != null}">

	
		<div id="outer" class="container-main" style="width: 100%;">
			<!-- HEADER -->
			<header class="navbar clearfix" id="header">
				<%@include file="Menu_Header.jsp"%>
			</header>
			<!--/HEADER -->

			<%@include file="menu_report.jsp"%>

			<%
				java.util.Calendar currentDate = java.util.Calendar.getInstance();
				java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("dd/MM/yyyy");
				String todays_date = formatter.format(currentDate.getTime());
			%>
		
			<div id="main-content">
				<div class="container">
					<div class="row">
						<div id="content" class="col-lg-12">
							<!-- PAGE HEADER-->
							<div class="row">
								<div class="col-sm-12">
									<div class="page-header" style="">

										<ul class="breadcrumb col-md-12-1"
											style="padding: 4px 10px; margin-top: 1px;">
											<li>Date : <%=todays_date%></li>
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
											<li><a href="ReportDashboard.jsp">Reports</a></li>
											<li><a href="service_master_report.jsp">Service report</a></li>
											<li class="pull-right">
												<button id="btnExport"
													class="btn btn-xs btn-info pull-right" value="Excel"
													title="" data-placement="left" data-toggle="tooltip"
													data-original-title="Excel">Export To Excel</button>
												<script type="text/javascript">
										
												$(document).on('click', '#btnExport', function (e) {
													var clonedContent = $('div[id$=reportListpackage]').clone();

												    clonedContent.find('th').css({
												        'background-color': '#CCFF66',
												        'border': '1px solid black', // Add border to heading cells
												        	 'text-align': 'center',
												        	 'vertical-align': 'middle'
												    });

												    clonedContent.find('td').css({
												    	 'background-color': '#d3d3d3', 
												        'border': '1px solid black',
												        //'width': '100px', // Adjust width as per your requirement
												        	 'text-align': 'center',
												        	 'vertical-align': 'middle'
												    });
												    var result = 'data:application/vnd.ms-excel,' + encodeURIComponent(clonedContent.html());
												    var link = document.createElement("a");
												    document.body.appendChild(link);
												    link.download = "Service Report.xls";
												    link.href = result;
												    link.click();
												});
											</script>
											</li>
										</ul>
									</div>

									<div class="col-md-12-1">

										<div
											style="height: 50%; margin-top: -1%; padding-left: 20px; border: 1px solid #b8b8b8;"
											class="col-md-12-1" id="companyReport">

											<div style="margin-top: 0%" class="col-md-12-1">

												<div class="col-md-4"
													style="margin-top: 0px; margin-bottom: 0px; margin-left: 23px;">
													<div class="row">

														<label class="TextFont" style="margin-bottom: -1px;">Select
															Services </label>
														<div id="" class="form-group Remove-Padding col-md-12-1"
															style="margin-left: -10%; height: 50px; width: 98%;">

															<div class="divide-20"></div>

															<div class="form-group">

																<div class="col-md-12">
																	<select name="listmstr"
																		id="listmstr_select" style="width: 200px"
																		onclick="setDyanamicDiv('dynamicItem',this.id)">
																		<option id="firstElmt" value="0">---
																			Select Services ---</option>

																	</select>
																</div>
															</div>
														</div>
													</div>
												</div>

												<div
													class="col-md-4 select2-container select2-container-multi "
													style="margin-top: 1%; margin-left: -15%">
													<ul id="dynamicItem" class="select2-choices"
														style="overflow-y: scroll;">

													</ul>
												</div>
												<div
													style="margin-top: 0px; margin-bottom: 0px; display: none;"
													class="col-md-4-1">
													<div style="margin-top: 9px;" class="col-md-4-1">
														<b>From:</b>
													</div>
													<div style="margin-top: 9px;" class="col-md-4-1">

														<input id="inputFromDate"
															class="form-control input-SmallText" type="text" value=""
															placeholder="From Date" name="date" readonly="readonly"
															onchange="checkWithCurrentDate('payAll')"
															onclick="displayCalendar(document.getElementById('inputFromDate'),'yyyy-mm-dd',this)">
													</div>
												</div>

												<div
													style="margin-top: 0px; margin-bottom: 0px; display: none;"
													class="col-md-4-1 ">
													<div style="margin-top: 5px;" class="col-md-4-1">
														<b>To:</b>
													</div>
													<div style="margin-top: 5px;" class="col-md-4-1">
														<input id="inputToDate"
															class="form-control input-SmallText" type="text" value=""
															placeholder="To Date" name="date" readonly="readonly"
															onchange="checkWithCurrentDate('ReportToProFees')"
															onclick="displayCalendar(document.getElementById('inputToDate'),'yyyy-mm-dd',this)">
													</div>
												</div>

												<div class="col-md-1-1"
													style="margin-top: 12px; margin-bottom: 0px">
													<div style="margin-top: 0px;" class="col-md-0-1">
														<b></b>
													</div>
													<div style="margin-top: 0px;" class="col-md-0-1">
														<button class="btn btn-xs btn-success" type="button"
															id="getproductData" onclick="getpServiceDetailsData()"
															style="margin-left: 5%;">Get Data</button>
													</div>
												</div>
											</div>
										</div>

										<div id="reportListpackage"
											style="border: 2px solid; margin-top: 2%;"
											class="col-md-12-1 panel-body">
											<div style="margin-bottom: 10px;" class="col-md-12-1 center">
												<h4 id="serviceName">Services information</h4>
											</div>

											<div
												style="width: 100%; overflow-y: scroll; height: 400px; max-height: auto;"
												class="col-md-12-1">

												<div class="tab-content">
													<div class="tab-pane fade in active">
														<table border="1"
															class="table  table-bordered table-striped header-fixed cf">
															<thead>
																
																<tr>
																	<th>Sr No</th>
																	<th>Service Name</th>
																	<th>Sub Service Name</th>
																	<th>Sub Service Code Name</th>
																	<th>CGHS Code Name</th>
																	<th>Category</th>
																	<th>Charges</th>
																	<th>CreatedBy</th>
																	<th>CreateddateTime</th>
																	<th>UpdatedBy</th>
																	<th>UpdateddateTime</th>
																</tr>
															</thead>
															<tbody id="servicesdetails">
															</tbody>
															
														</table>
													</div>
												</div>
											</div>
										</div>
									</div>

								</div>
							</div>

							<%@include file="Footer.jsp"%></div>
					</div>
					<div class="ajaxmodal">
						<!-- Place at bottom of page -->
					</div>

				</div>
			</div>
		</div>
		<input type="hidden" id="admsnCount" value="<%=todays_date%>" />
	
		<input type="hidden" name="from" id="popup_container3"
			value="<%=todays_date%>" />
		<input type="hidden" name="to" value="<%=todays_date%>"
			id="popup_container2" />

		<input type="hidden" id="datecallfrom" value="" />

		<input type="hidden" id="fromdate" value="0" />
		<input type="hidden" id="todate" value="0" />
		</div>
		
	</c:if>
	<!-- JAVASCRIPTS -->
		
	<script src="ehat-design/js/bootstrap-daterangepicker/daterangepicker.min.js"></script>
	<!-- SLIMSCROLL -->
	<script type="text/javascript" src="ehat-design/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
	
	<!-- BLOCK UI -->
	<script type="text/javascript" src="ehat-design/js/jQuery-BlockUI/jquery.blockUI.min.js"></script>	
	<script type="text/javascript" src="ehat-design/js/autosize/jquery.autosize.min.js"></script>	
	<script type="text/javascript" src="ehat-design/js/select2/select2.min.js"></script>
	<!-- TYPEHEAD -->
	<script type="text/javascript" src="ehat-design/js/typeahead/typeahead.min.js"></script>	
	<!-- UNIFORM -->
	<script type="text/javascript" src="ehat-design/js/uniform/jquery.uniform.min.js"></script>		
	<!-- DATA TABLES -->
	<script type="text/javascript" src="ehat-design/js/datatables/media/js/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/datatables/media/assets/js/datatables.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/datatables/extras/TableTools/media/js/TableTools.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/datatables/extras/TableTools/media/js/ZeroClipboard.min.js"></script>
	
	<!-- COOKIE -->
	<script type="text/javascript" src="ehat-design/js/jQuery-Cookie/jquery.cookie.min.js"></script>
	
	<!-- CUSTOM SCRIPT -->
	<script src="ehat-design/js/script.js"></script>
	<div id="userObj" style="display: none;"></div>
	<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
	<input type="hidden" id="userType" value="<%=session.getAttribute("userType")%>">
	
</body>
</html>
