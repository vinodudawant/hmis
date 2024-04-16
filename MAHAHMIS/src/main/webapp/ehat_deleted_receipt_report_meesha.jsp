<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">
<title>Opd Deleted Receipt Report</title>

<link rel="stylesheet" type="text/css" href="ehat-design/css/cloud-admin.css" >
<link rel="stylesheet" type="text/css"  href="ehat-design/css/themes/default.css" id="skin-switcher" >
<link rel="stylesheet" type="text/css"  href="ehat-design/css/responsive.css" >
<link rel="stylesheet" type="text/css"  href="ehat-design/css/report_header.css" >
<!-- SELECT2 -->
<link rel="stylesheet" type="text/css" href="ehat-design/js/select2/select2.min.css" />

<link href="ehat-design/font-awesome/css/font-awesome.min.css" rel="stylesheet">
<!-- DATE RANGE PICKER -->
<link rel="stylesheet" type="text/css" href="ehat-design/js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
<!-- FONTS -->
<!-- <link href='http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700' rel='stylesheet' type='text/css'> -->
<link href='ehat-design/css/family.css' rel='stylesheet' type='text/css'>

<!-- JQUERY -->
<script src="jquery/jquery-2.1.1.js"></script>

<!--calender Files  -->
<script type="text/javascript" src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link type="text/css" rel="stylesheet" href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112" media="screen"></link>
	
<!-- chart -->
<script src="js/hisab/Chart.js"></script>
	<!-- for Developers  -->
<script type="text/javascript" src="js/hisab/hisab.js"></script>
<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript" src="js/jquery-validate/additional-methods.min.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/Admin.js"></script>
<script type="text/javascript" src="js/bill.js"></script>
<script type="text/javascript" src="js/billNoble.js"></script>
<script type="text/javascript" src="js/financeMeesha.js"></script>

<!-- /for Developers  -->

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<script type="text/javascript">
	
	jQuery(document).ajaxStart(function() {		
		
		$("#pleaseWait").show();
	});
	
	jQuery(document).ajaxStop(function() {
		
		$("#pleaseWait").hide();
	});
	
	onload = function() {
		getAllPaymentModes();
		getOpdDiagnoRecData("deleted");
	};

</script>

</head>
<body>
	
	<div id="pleaseWait" style="text-align: center;">
	        <img style="margin-top: 250px;" height="43px" src="images/loading_black.gif"/>
	        <div style="margin-top: 10px; color: white">
	            <b>Please wait...</b>
	        </div>
	</div>

	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>

	</c:if>
	<c:if test="${sessionScope.userType != null}">
	
	<%
		java.util.Calendar currentDate = java.util.Calendar.getInstance();
		java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyy-MM-dd");
		String todays_date = formatter.format(currentDate.getTime());
	
		Object CurrentuserName = session.getAttribute("userName");
		Object currentUserId = session.getAttribute("userId");
		session.setAttribute("CurrentuserName", CurrentuserName);
		session.setAttribute("currentUserID", currentUserId);
		System.out.println("Your Current NAme is ************* "+CurrentuserName);			
	%>

	<!-- HEADER -->
	<header class="navbar clearfix navbar-fixed-top" id="header">
		
		<%@include file="Menu_Header_Nobel.jsp"%>
		
	</header>
	<!--/HEADER -->
	
	<!-- PAGE -->
	<section id="page">
		
		<!-- SIDEBAR -->
		<%@include file="ehat_finance_leftmenu.jsp"%>
		<!-- /SIDEBAR -->
			<div id="main-content">
				<div class="container">
					<div class="row">
						<div id="content" class="col-lg-12">
							
							<!-- PAGE HEADER-->
							<div class="row">
								<div class="col-sm-12">
									<div class="page-header" style="margin-bottom: 4px">
										<!-- STYLER -->

										<!-- /STYLER -->
										<!-- BREADCRUMBS -->
										<ul class="breadcrumb" style="margin-top: -10px;">
											<li>Date : <%=todays_date%></li>
											<li><i class="fa fa-home"></i> <a
												href="ehat_finance_dashboard.jsp">Finance</a></li>
											<li><a href="ehat_deleted_receipt_report.jsp">Opd Deleted Receipt Report</a></li>
											<li class="pull-right">
												<!-- <button class="btn btn-xs btn-success" data-toggle="tooltip"
													data-placement="left" title=""
													onclick="showOpdHisab('hisab')">
													<b> Show </b>
												</button>

												<button id="txtbtnClear" class="btn btn-xs btn-danger"
													value="" onclick="clearDiagnosisHisab();" title=""
													data-placement="left" data-toggle="tooltip"
													data-original-title="">Clear</button> -->
												<!-- <button id="btnPrint1" class="btn btn-xs btn-warning"
													value="" onclick="receiptBillPrintRecReport()" title="" 
													data-toggle="tooltip" data-original-title="Print">Print</button> -->
													

												<button id="btnPrint" class="btn btn-xs btn-warning"
													value="" onclick="" title="" data-placement="left"
													data-toggle="tooltip" data-original-title="Print">Export
													To Excel</button> <script type="text/javascript">
														$("[id$=btnPrint]").click(function(e) {
																		
															//window.open('data:application/vnd.ms-excel,'+ encodeURIComponent($('div[id$=diveMain]').html()));
															//e.preventDefault();

															 //getting values of current time for generating the file name
													        var dt = new Date();
													        var day = dt.getDate();
													        var month = dt.getMonth() + 1;
													        var year = dt.getFullYear();
													      
													        var postfix = day + "." + month + "." + year;
													        //creating a temporary HTML link element (they support setting file names)
													        var a = document.createElement('a');
													        //getting data from our div that contains the HTML table
													        var data_type = 'data:application/vnd.ms-excel';
													        var table_div = document.getElementById('diveMain');
													        var table_html = table_div.outerHTML.replace(/ /g, '%20');
													        a.href = data_type + ', ' + table_html;
													        //setting the file name
													        a.download = 'Deleted_Receipt_Report_' + postfix + '.xls';
													        //triggering the function
													        a.click();
													        //just in case, prevent default behaviour
													        e.preventDefault();
                                                           

															
														});
														
														
														function receiptBillPrintRecReport(){

															var userId = parseInt($("#userId").val());	
															var unitId = parseInt($("#unitId").val());  	
															var fromDate=$("#fromDate").val();
															var toDate = $("#lastDate").val();
															var payMode = $("#payMode").val();
															
															window.open("ehat_opd_diagno_rec_receipt.jsp?unitId="+unitId+"&userId="+userId+
																	"&fromDate="+fromDate+"&toDate="+toDate+"&payMode="+payMode);
														}
														
														
													</script> 
											</li>
										</ul>
										<!-- /BREADCRUMBS -->
										<div class="clearfix">
											<h3 class="content-title pull-left">Fixed Header &
												Sidebar</h3>
										</div>
										<div class="description">Fixed Header & Sidebar Layout</div>
									</div>
								</div>
							</div>
							<!-- /PAGE HEADER -->


							<!-- /Common -->

							<div class="panel panel-default">

								<div class="panel-body">

									<div class="col-md-12">
										
										<div class="col-md-3" style="margin-top: 2px">
											<div class="col-md-2">
												<label>From</label>
											</div>
											<div class="col-md-10">
												<input id="fromDate" class="form-control input-SmallText"
													type="text"
													onclick="displayCalendar(document.getElementById('fromDate'),'yyyy-mm-dd',this)"
													readonly="readonly" name="date" placeholder="Date"
													value="<%=todays_date%>">
											</div>
										</div>

										<div class="col-md-3" style="margin-top: 2px">
											<div class="col-md-2">
												<label>To</label>
											</div>
											<div class="col-md-10">
												<input id="lastDate" class="form-control input-SmallText"
													type="text"
													onclick="displayCalendar(document.getElementById('lastDate'),'yyyy-mm-dd',this)"
													readonly="readonly" name="date" placeholder="Date"
													value="<%=todays_date%>">
											</div>
										</div>
										
										<div class="col-md-3" style="margin-top: 2px">
											<div class="col-md-2">
												<label>To</label>
											</div>
											<div class="col-md-10">
												<select id="payModeId" style="width: 100%" class="form-control"></select>
											</div>
										</div>

										<!-- <select onchange="BankOnSelect();" style="width: 100%"
											id="payMode" class="form-control"><option class="un"
												value="1">Cash</option>
											<option class="un" value="2">Card</option>
											<option class="un" value="3">Cheque</option>
											<option class="un" value="4">CAdvance</option>
											<option class="un" value="5">Credit</option>
											<option class="un" value="-1">Multiple</option>
										</select> -->

										<div class="col-md-1" style="margin-top: 2px">
											<input type="button" onclick="getOpdDiagnoRecData('deleted');"
												class="btn btn-primary" value="search">
										</div>
										
									</div>
								</div>								
							</div>

							<div class="divide-10"></div>

							<div class="box border">
								<div class="box-title">
									<h4>
										<i class="fa fa-colum"></i> <span class="hidden-inline-mobi"></span>
									</h4>
								</div>
								<div class="box-body">
									<div class="tabbable header-tabs">
										
										<div class="panel panel-default"
											style="border: none; margin-top: -9px">
											<div class="panel-body">

												<div id="diveMain" class="col-md-12" style="margin-top: 5px">

													<div id="divLine2" class=" box border col-md-12" style="overflow: auto;height: 450px;">
														<form class="form-horizontal col-md-12"
															style="margin-top: 10px">

															<!-- <div class="divide-20"></div> -->
															<div class="col-md-12">
																<label> <i class="fa fa-arrow-down"></i>Patient Details :
																</label>
															</div>
															<br>
															
															<div style="width: 1900px;">													
																<table class="datatable table table-bordered table-striped table-condensed cf" id="hisabTbl"
																	style="background: Scrollbar; border-bottom: 1px solid black; border-top: 1px solid black;">
																	<thead class="cf">
																		<tr>
																			<th style="height: 21.5px;width: 5%" >Receipt No</th>
																			<th style="height: 21.5px;width: 5%" >Rec Date</th>																		
																			<th style="height: 21.5px;width: 12%" >Patient Name</th>																			
																			<th style="height: 21.5px;width: 5%" >Rec Amount</th>	
																			<th style="height: 21.5px;width: 5%" >Pay Mode</th>	
																			<th style="height: 21.5px;width: 5%" >Card/Chq No</th>	
																			<!-- <th style="height: 21.5px;width: 5%" >Expiry</th>	 -->	
																			<th style="height: 21.5px;width: 7%" >Bank</th>	
																			<th style="height: 21.5px;width: 5%" >Bill No</th>	
																			<th style="height: 21.5px;width: 5%" >Bill Date</th>		
																			<th style="height: 21.5px;width: 7%" >Source</th>	
																			<th style="height: 21.5px;width: 10%" >User</th>																			
																			<th style="height: 21.5px;width: 7%" >Deleted Date</th>		
																			<th style="height: 21.5px;width: 10%" >Deleted By</th>		
																			<th style="height: 21.5px;width: 7%" >Deleted Remark</th>
																			<!-- <th style="height: 21.5px;width: 5%" >Unit</th>		 -->																																																		
																		</tr>
																	</thead>
																	
																	< <tbody id="container">
	
																	</tbody> 
																</table>
															</div>
														
															<!-- <div
																style="margin-top: -21px; width: 1900px"
																class="col-md-12-1 box border">
																<table class="table table-bordered table-striped table-condensed cf">
																	<tbody id="container">

																	</tbody>
																</table>
															</div> -->

														</form>
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

				<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
				<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
				<input type="hidden" id="operation" />
				<input type="hidden" id="CurrentuserName" value="<%=session.getAttribute("userName")%>" />
				<input type="hidden" id="currentUserID" value="<%= session.getAttribute("userId")%>" />

				<%@include file="Footer.jsp"%>
			</div>
		</section>
	<!--/PAGE -->
	<!-- JAVASCRIPTS -->
	<!-- Placed at the end of the document so the pages load faster -->
	<!-- JQUERY -->
	<!-- <script src="ehat-design/js/jquery/jquery-2.0.3.min.js"></script> -->
	<!-- JQUERY UI-->
	<script src="ehat-design/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
	<!-- BOOTSTRAP -->
	<script src="ehat-design/bootstrap-dist/js/bootstrap.min.js"></script>
	
	<!-- SELECT2 -->
	<script type="text/javascript" src="ehat-design/js/select2/select2.min.js"></script>	
	
	<!-- DATE RANGE PICKER -->
	<script src="ehat-design/js/bootstrap-daterangepicker/moment.min.js"></script>
	
	<script src="ehat-design/js/bootstrap-daterangepicker/daterangepicker.min.js"></script>
	<!-- SLIMSCROLL -->
	<script type="text/javascript" src="ehat-design/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script><script type="text/javascript" src="js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
	<!-- COOKIE -->
	<script type="text/javascript" src="ehat-design/js/jQuery-Cookie/jquery.cookie.min.js"></script>
	<!-- CUSTOM SCRIPT -->
	<script src="ehat-design/js/script.js"></script>
	<script>
		jQuery(document).ready(function() {		
			App.setPage("fixed_header_sidebar");  //Set current page
			App.init(); //Initialise plugins and elements
		});
	</script>
	<!-- /JAVASCRIPTS -->
	
	</c:if>
	
</body>
</html>