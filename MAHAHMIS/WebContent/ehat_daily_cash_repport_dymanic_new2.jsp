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
<title>Daily Collection Report</title>
<link rel="stylesheet" type="text/css" href="css/ehat_general.css">
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher">
<link rel="stylesheet" type="text/css" href="css/responsive.css">
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet"
	media="screen">
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet">

<!--Datepikaer  -->
<link rel="stylesheet" type="text/css"
	href="timepeacker/jquery.datetimepicker.css" />
<!-- JQUERY -->
<script src="jquery/jquery-2.1.1.js"></script>
<!-- JQUERY UI-->
<script
	src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<!-- BOOTSTRAP -->
<!-- <script src="bootstrap-dist/js/bootstrap.min.js"></script>
<script src="bootstrap-dist/js/bootstrap.js"></script> -->
<!-- SLIMSCROLL -->
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
<script type="text/javascript"
	src="js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
<!-- BLOCK UI -->
<!-- <script type="text/javascript" src="js/jQuery-BlockUI/jquery.blockUI.min.js"></script>
<script type="text/javascript" src="ehat-design/js/jspdf.min.js"></script> -->

<!-- for Developers  -->
<!-- <script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/additional-methods.min.js"></script> -->
<script type="text/javascript" src="js/validate.js"></script>

<script type="text/javascript" src="js/finance.js"></script>
<script type="text/javascript" src="js/Admin.js"></script>
<script type="text/javascript" src="js/ehat_billing.js"></script>

<!-- /for Developers  -->

<!-- Auto-Suggestion 8/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>


<script src="timepeacker/jquery.datetimepicker.js"></script>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<script type="text/javascript">
	onload = function() {
		
		getAllPaymentModes();
		getDailyCollectionReportNew('onload');		
		setAutoPatientName("byUName","onload","HRMgmt_Database");		
		setUserInputReadonly();
		
		
		
	};

	jQuery(document).ajaxStart(function() {
		//alert("hi ajax start");
		$("body").addClass("loading");
	});

	jQuery(document).ajaxStop(function() {
		$("body").removeClass("loading");
		//alert("hi ajax stop");
	});
	
	 $(function() {
		 
         $( "#fromDate" ).datetimepicker({
        	timepicker:false,
        	format: 'd/m/Y',
    	 	formatTime: 'H:i',
    	 	formatDate: 'd/m/Y',
         });
         $( "#lastDate" ).datetimepicker({
        	 timepicker:false,
        	 format: 'd/m/Y',
        	 	formatTime: 'H:i',
        	 	formatDate: 'd/m/Y',
        		 
         });  
       
      });
	 
</script>

<style type="text/css">

/* Start by setting display:none to make this hidden.
   Then we position it in relation to the viewport window
   with position:fixed. Width, height, top and left speak
   speak for themselves. Background we set to 80% white with
   our animation centered, and no-repeating */
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

table {
	text-align: left;
	position: relative;
	border-collapse: collapse;
	width: 1000px;
}

th, td {
	padding: 0.25rem;
}

tr.red th {
	background: red;
	color: white;
}

tr.green th {
	background: green;
	color: white;
}

tr.purple th {
	background: purple;
	color: white;
}

th {
	background: white;
	width: 1000px;
	position: sticky;
	top: 0;
	box-shadow: 0 2px 2px -1px rgba(0, 0, 0, 0.4);
}

.dynamicstructurescroll {
	max-height: 350px;
	overflow: auto;
	scrollbar-width: thin;
}

.select2-container-multi .select2-choices {
	min-height: 81px;
	scrollbar-width: thin;
}
</style>

<script>
	jQuery(document).ready(function() {
		App.setPage("Report"); //Set current page
		App.init(); //Initialise plugins and elements
	});
	
	
</script>

<%	
	ResourceBundle resourceBundleEha = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
	String risingFlow = resourceBundleEha.getObject("dailyCollectionRising").toString();	
	ResourceBundle resourcebundle = ResourceBundle.getBundle("hospitalaccess");	 
	String hospName = resourcebundle.getObject("hospitalname").toString();
	ResourceBundle resourceBundleehat = ResourceBundle.getBundle("Ehat");   
	String CAdvanceFlow = resourceBundleehat.getObject("dailyCollectionReportCAdvanceFlow").toString();
%>

</head>
<body>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
	<c:if test="${sessionScope.userType != null}">

		<!-- Common -->
		<!-- DASHBOARD CONTENT -->
		<%-- <div id="footer1" style="text-align: right;"><%@include
				file="Session_Info.jsp"%></div> --%>
		<div id="outer" class="container-main" style="width: 100%;">
			<!-- HEADER -->
			<header class="navbar clearfix" id="header">
				<%@include file="Menu_Header.jsp"%>
			</header>
			<!--/HEADER -->

			<%@include file="ehat_finance_leftmenu.jsp"%>


			<%--  <%
        String callfrom = request.getParameter("callfrom");

        if(callfrom.equalsIgnoreCase("Reports") ||callfrom=="Reports" )  {
    %>            
       <%@include file="menu_HelpDesk.jsp"%>
    <%
        } else {
    %>
        <%@include file="menu_report.jsp"%>
    <%
        }
    %> --%>


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
											<li>Date :<%= todays_date %>
											</li>
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
											<li><a href="ehat_daily_cash_repport_dymanic_new.jsp">Report</a></li>





											<div class="pull-right">
												<button onclick="exportToPdf();"
													title="Print Daily Collection" data-placement="left"
													data-toggle="tooltip" class="btn btn-xs btn-warning"
													data-original-title="Print Daily Collection">
													<i class="fa fa-print"></i>
												</button>
												 <input id="getExcelReportBtn" type='button'
													onclick="exportToExcel()" value='Export To Excel'
													class='btn btn-xs btn-success' /> 
													
												<!-- Added New Excel Code -->
													<!-- <button id="getExcelReportBtn" class="btn btn-xs btn-success"
													data-placement="left" data-toggle="tooltip" data-original-title="Print">Export
													To Excel</button>
											
													following code for Excel sheet
													<script type="text/javascript">

														$(document).on('click','#getExcelReportBtn',function(e) {
													        var result = 'data:application/vnd.ms-excel,' + encodeURIComponent($('div[id$=diveMain]').html());
													        var link = document.createElement("a");
													        document.body.appendChild(link);
													        link.download = "Daily_Collection_Report.xls"; //You need to change file_name here.
													        link.href = result;
													        link.click();
													    }); -->
											</div>
										</ul>
									</div>
								</div>
							</div>
							<!-- /Common -->

							<div class="col-md-12-1">
								<!-- <div style="font-weight: bold;" class="col-md-1-1">Search
									By:</div> -->

								<div class="col-md-2-1" style="margin-top: 2px">
									<div class="col-md-2-1">
										<label>From</label>
									</div>
									<div class="col-md-5-1">
										<input id="fromDate" type="text" style="width: 100%;"
											value="<%=todays_date%>">
									</div>
									<div class="col-md-5-1">
										<input id="fromTime" type="text" style="width: 100%;"
											placeholder="From Time" value=""
											onclick="getRepTime(this.id);">
									</div>
								</div>

								<div class="col-md-2-1 center" style="margin-top: 2px">
									<div class="col-md-2-1">
										<label>To</label>
									</div>
									<div class="col-md-5-1">
										<input id="lastDate" style="width: 100%;" type="text"
											value="<%=todays_date%>">

									</div>
									<div class="col-md-5-1">
										<input id="lastTime" style="width: 100%;" type="text"
											placeholder="To Time" value="" onclick="getRepTime(this.id);">

									</div>
								</div>

								<!-- <div style="font-weight: bold;" class="col-md-1-1">User</div> -->

								<div class="col-md-3-1" id="divbyName" style="margin-top: 2px">
									<div class="col-md-2-1 center">
										<label>User</label>
									</div>
									<div class="col-md-6-1">
										<input name="byName" type="text" id="byName"
											class="typeahead form-control input-SmallText"
											onkeypress="return validatealphabetic(event)"
											value="<%=session.getAttribute("userName")%>"
											style="display: none;" /> <input name="byName" type="text"
											id="byUName" class="typeahead form-control input-SmallText"
											onkeyup="getUserDetailsByName(this.id)"
											onkeypress="return validatealphabetic(event)" />

									</div>
								</div>


								<div class="col-md-2-1" style="margin-top: 2px">
									<div class="col-md-2-1">
										<label>Dept</label>
									</div>
									<div class="col-md-6-1">
										<select id="deptId" class="form-control input-SmallText">
											<option value="0">All</option>
											<option value="1">Opd</option>
											<option value="2">Ipd</option>
											<option value="3">Diagnosis</option>
										</select>
									</div>
								</div>

								<div class="col-md-2-1" style="margin-top: 2px">
									<div class="col-md-2-1">
										<label>PayBy</label>
									</div>
									<div class="col-md-6-1">
										<select id="payModeId" class="form-control input-SmallText">
										</select>
									</div>
								</div>

								<div class="col-md-1-1">
									<input type="button" value="Show"
										class="btn btn-xs btn-primary" class="edit"
										onclick="getDailyCollectionReportNew('search')" />
								</div>

							</div>

							<div></div>

							<!-- start Daily Collection Repprt Table  -->
							<div id="tblDailyCashReport">

								<div id="opdDiv">
									<div class="row">
										<table style="margin-top: 20px;"
											class="datatable table table-bordered table-striped table-condensed cf">
											<thead class="cf">
												<th colspan=8 style="color: blue;">Opd Total Collection</th>
											</thead>
										</table>
									</div>

									<div class="row" style="height: 150px; overflow: auto;">
										<table
											class="datatable table table-bordered table-striped table-condensed cf">
											<thead style= 'color: blue;'class="cf">
												<tr>
													<th style="height: 21.5px; width: 30px;">#</th>
													<th style="height: 21.5px; width: 35px;"style= 'background-color: #EEEEEE; color: blue;'>UHID</th>
													<th style="height: 21.5px; width: 45px;">Bill ID</th>
													<th style="height: 21.5px; width: 80px;">Opd No</th>
													<th style="height: 21.5px; width: 45px;">Rec Id</th>
													<th style="height: 21.5px; width: 150px;">Patient Name</th>
													<th style="height: 21.5px; width: 150px;">Consulting
														Doctor</th>
													<th style="height: 21.5px; width: 90px;">Rec Date</th>
													<th style="height: 21.5px; width: 45px;">Pay Mode</th>
													<th style="height: 21.5px; width: 65px;">Total</th>
													<th style="height: 21.5px; width: 100px">User</th>
													<th style="height: 21.5px; width: 90px">Remark</th>
												</tr>
											</thead>

											<tbody id="opdCollection">

											</tbody>
										</table>
									</div>



									<div class="row">
										<table style="margin-top: 20px;"
											class="datatable table table-bordered table-striped table-condensed cf">
											<thead  class="cf">
												<th colspan=8 style="color: blue;">Opd Total Refund</th>
											</thead>
										</table>
									</div>

									<div class="row" style="height: 150px; overflow: auto;">
										<table 
											class="datatable table table-bordered table-striped table-condensed cf">
											<thead style= 'color: blue;' class="cf">

												<tr>
													<th style="height: 21.5px; width: 30px;">#</th>
													<th style="height: 21.5px; width: 35px;">UHID</th>
													<th style="height: 21.5px; width: 45px;">Bill ID</th>
													<th style="height: 21.5px; width: 80px;">Opd No</th>
													<th style="height: 21.5px; width: 45px;">Rec Id</th>
													<th style="height: 21.5px; width: 150px;">Patient Name</th>
													<th style="height: 21.5px; width: 150px;">Consulting
														Doctor</th>
													<th style="height: 21.5px; width: 90px;">Rec Date</th>
													<th style="height: 21.5px; width: 45px;">Pay Mode</th>
													<th style="height: 21.5px; width: 65px;">Total</th>
													<th style="height: 21.5px; width: 100px">User</th>
													<th style="height: 21.5px; width: 90px">Remark</th>

												</tr>
											</thead>

											<tbody id="opdRefund">

											</tbody>
										</table>
									</div>
								</div>


								<div id="ipdDiv">
									<div class="row">
										<table style="margin-top: 20px;"
											class="datatable table table-bordered table-striped table-condensed cf">
											<thead class="cf">
												<th colspan=8 style="color: blue;">Ipd Total Collection</th>
											</thead>
										</table>
									</div>
									<div class="row" style="height: 150px; overflow: auto;">
										<table 
											class="datatable table table-bordered table-striped table-condensed cf">
											<thead style= 'color: blue;' class="cf">
												<tr>
													<th style="height: 21.5px; width: 30px;">#</th>
													<th style="height: 21.5px; width: 35px;">UHID</th>
													<th style="height: 21.5px; width: 45px;">Bill ID</th>
													<th style="height: 21.5px; width: 80px;">Ipd No</th>
													<th style="height: 21.5px; width: 45px;">Rec Id</th>
													<th style="height: 21.5px; width: 150px;">Patient Name</th>
													<th style="height: 21.5px; width: 150px;">Consulting
														Doctor</th>
													<th style="height: 21.5px; width: 90px;">Rec Date</th>
													<th style="height: 21.5px; width: 45px;">Pay Mode</th>
													<th style="height: 21.5px; width: 65px;">Total</th>
													<th style="height: 21.5px; width: 100px">User</th>
													<th style="height: 21.5px; width: 90px">Remark</th>
												</tr>
											</thead>

											<tbody id="ipdCollection">

											</tbody>
										</table>
									</div>


									<div class="row">
										<table style="margin-top: 20px;"
											class="datatable table table-bordered table-striped table-condensed cf">
											<thead style= 'color: blue;' class="cf">
												<th colspan=8 style="color: blue;">Ipd Total Refund</th>
											</thead>
										</table>
									</div>

									<div class="row" style="height: 150px; overflow: auto;">
										<table 
											class="datatable table table-bordered table-striped table-condensed cf">
											<thead style= 'color: blue;' class="cf">
												<tr>
													<th style="height: 21.5px; width: 30px;">#</th>
													<th style="height: 21.5px; width: 35px;">UHID</th>
													<th style="height: 21.5px; width: 45px;">Bill ID</th>
													<th style="height: 21.5px; width: 80px;">Ipd No</th>
													<th style="height: 21.5px; width: 45px;">Rec Id</th>
													<th style="height: 21.5px; width: 150px;">Patient Name</th>
													<th style="height: 21.5px; width: 150px;">Consulting
														Doctor</th>
													<th style="height: 21.5px; width: 90px;">Rec Date</th>
													<th style="height: 21.5px; width: 45px;">Pay Mode</th>
													<th style="height: 21.5px; width: 65px;">Total</th>
													<th style="height: 21.5px; width: 100px">User</th>
													<th style="height: 21.5px; width: 90px">Remark</th>
												</tr>
											</thead>

											<tbody id="ipdRefund">

											</tbody>
										</table>
									</div>
								</div>

								<div id="diagDiv">
									<div class="row">
										<table style="margin-top: 20px;"
											class="datatable table table-bordered table-striped table-condensed cf">
											<thead class="cf">
												<th colspan=8 style="color: blue;">Diagnosis Total
													Collection</th>
											</thead>
										</table>
									</div>

									<div class="row" style="height: 150px; overflow: auto;">
										<table 
											class="datatable table table-bordered table-striped table-condensed cf">
											<thead style= 'color: blue;' class="cf">
												<tr>
												<th style="height: 21.5px; width: 30px;">#</th>
													<th style="height: 21.5px; width: 35px;">UHID</th>
													<th style="height: 21.5px; width: 45px;">Bill ID</th>
													<th style="height: 21.5px; width: 80px;">Diag No</th>
													<th style="height: 21.5px; width: 45px;">Rec Id</th>
													<th style="height: 21.5px; width: 150px;">Patient Name</th>
													<th style="height: 21.5px; width: 150px;">Consulting
														Doctor</th>
													<th style="height: 21.5px; width: 90px;">Rec Date</th>
													<th style="height: 21.5px; width: 45px;">Pay Mode</th>
													<th style="height: 21.5px; width: 65px;">Total</th>
													<th style="height: 21.5px; width: 100px">User</th>
													<th style="height: 21.5px; width: 90px;">Remark</th>
												</tr>
											</thead>

											<tbody id="diagCollection">

											</tbody>
										</table>
									</div>

									<div class="row">
										<table style="margin-top: 20px;"
											class="datatable table table-bordered table-striped table-condensed cf">
											<thead class="cf">
												<th colspan=8 style="color: blue;">Diagnosis Total
													Refund</th>
											</thead>
										</table>
									</div>

									<div class="row" style="height: 150px; overflow: auto;">
										<table 
											class="datatable table table-bordered table-striped table-condensed cf">
											<thead style= 'color: blue;' class="cf">
												<tr>
													<th style="height: 21.5px; width: 30px;">#</th>
													<th style="height: 21.5px; width: 35px;">UHID</th>
													<th style="height: 21.5px; width: 45px;">Bill ID</th>
													<th style="height: 21.5px; width: 80px;">Diag No</th>
													<th style="height: 21.5px; width: 45px;">Rec Id</th>
													<th style="height: 21.5px; width: 150px;">Patient Name</th>
													<th style="height: 21.5px; width: 150px;">Consulting
														Doctor</th>
													<th style="height: 21.5px; width: 90px;">Rec Date</th>
													<th style="height: 21.5px; width: 45px;">Pay Mode</th>
													<th style="height: 21.5px; width: 65px;">Total</th>
													<th style="height: 21.5px; width: 100px">User</th>
													<th style="height: 21.5px; width: 90px">Remark</th>
												</tr>
											</thead>

											<tbody id="diagRefund">

											</tbody>
										</table>
									</div>
								</div>
								<br> </br>
								<br> </br>
								<br> </br>
								<br> </br>
								<!--Start TotalCount receipt/refund  -->
                               <div class="row" style="height: 40px;display: none;">
									<table>
										<thead>
											<tr>
												<th class="col-md-2"><label
													style="color: Red; Bold; font-size: 12px;">Total
														 Collection :</label></th>
												<th class="col-md-2"><label
													style="color: Green; Bold; font-size: 12px;"
													id="totalCollection"></label></th>												
											</tr>
									</table>
									</thead>
								</div>
								
								<div class="row" style="height: 20px;display: none;">
									<table>
										<thead>
											<tr>
												<th class="col-md-2"><label
													style="color: Red; Bold; font-size: 12px;">Total
														Receipt Collection :</label></th>
												<th class="col-md-2"><label
													style="color: Green; Bold; font-size: 12px;"
													id="totalRecCollection"></label></th>

												<th class="col-md-2"><label
													style="color: Red; Bold; font-size: 12px;">Total
														Refunded Amount : </label></th>

												<th class="col-md-2"><label
													style="color: Green; Bold; font-size: 12px;"
													id="totalRefAmt"></label></th>
											</tr>
									</table>
									</thead>
								</div>
								
								<div class="row" style="height: 20px;display: none;">
									<table>
										<thead>
											<tr>
												<th class="col-md-2"><label
													style="color: Red; Bold; font-size: 12px;">Total
														Cheque Amt :</label></th>
												<th class="col-md-2"><label
													style="color: Green; Bold; font-size: 12px;"
													id="totalChequeRec"></label></th>

												<th class="col-md-2"><label
													style="color: Red; Bold; font-size: 12px;">Total
														Cheque RefundedAmt : </label></th>

												<th class="col-md-2"><label
													style="color: Green; Bold; font-size: 12px;"
													id="totalChequeRef"></label></th>
											</tr>
									</table>
									</thead>
								</div>
								<div class="row" style="height: 20px;display: none;">
									<table>
										<thead>
											<tr>
												<th class="col-md-2"><label
													style="color: Red; Bold; font-size: 12px;">Total
														Cash Amt :</label></th>
												<th class="col-md-2"><label
													style="color: Green; Bold; font-size: 12px;"
													id="totalCashRec"></label></th>

												<th class="col-md-2"><label
													style="color: Red; Bold; font-size: 12px;">Total
														Cash RefundedAmt : </label></th>

												<th class="col-md-2"><label
													style="color: Green; Bold; font-size: 12px;"
													id="totalCashRef"></label></th>
											</tr>
									</table>
									</thead>
								</div>
								
								<div class="row" style="height: 20px;display: none;">
									<table>
										<thead>
											<tr>
												<th class="col-md-2"><label
													style="color: Red; Bold; font-size: 12px;">Total
														Card Amt :</label></th>
												<th class="col-md-2"><label
													style="color: Green; Bold; font-size: 12px;"
													id="totalCardRec"></label></th>

												<th class="col-md-2"><label
													style="color: Red; Bold; font-size: 12px;">Total
														Card RefundedAmt : </label></th>

												<th class="col-md-2"><label
													style="color: Green; Bold; font-size: 12px;"
													id="totalCardRef"></label></th>
											</tr>
									</table>
									</thead>
								</div>
								<div class="row" style="height: 20px;display: none;">
									<table>
										<thead>
											<tr>
												<th class="col-md-2"><label
													style="color: Red; Bold; font-size: 12px;">Total
														UPI Amt :</label></th>
												<th class="col-md-2"><label
													style="color: Green; Bold; font-size: 12px;"
													id="totalNetBankRec"></label></th>

												<th class="col-md-2"><label
													style="color: Red; Bold; font-size: 12px;">Total
														UPI RefundedAmt : </label></th>

												<th class="col-md-2"><label
													style="color: Green; Bold; font-size: 12px;"
													id="totalNetBankRef"></label></th>
											</tr>
									</table>
									</thead>
								</div>
								
								<div class="row" style="height: 20px;display: none;">
									<table>
										<thead>
											<tr>
												<th class="col-md-2"><label
													style="color: Red; Bold; font-size: 12px;">Total
														GPay Amt :</label></th>
												<th class="col-md-2"><label
													style="color: Green; Bold; font-size: 12px;"
													id="totalGoPayRec"></label></th>

												<th class="col-md-2"><label
													style="color: Red; Bold; font-size: 12px;">Total
														GPay RefundedAmt : </label></th>

												<th class="col-md-2"><label
													style="color: Green; Bold; font-size: 12px;"
													id="totalGoPayRef"></label></th>
											</tr>
									</table>
									</thead>
								</div>
								
								<div class="row" style="height: 20px;display: none;">
									<table>
										<thead>
											<tr>
												<th class="col-md-2"><label
													style="color: Red; Bold; font-size: 12px;">Total
														Paytm Amt :</label></th>
												<th class="col-md-2"><label
													style="color: Green; Bold; font-size: 12px;"
													id="totalPayTMRec"></label></th>

												<th class="col-md-2"><label
													style="color: Red; Bold; font-size: 12px;">Total
														Paytm RefundedAmt : </label></th>

												<th class="col-md-2"><label
													style="color: Green; Bold; font-size: 12px;"
													id="totalPayTMRef"></label></th>
											</tr>
									</table>
									</thead>
								</div>
								
								<div class="row" style="height: 20px;display: none;">
									<table>
										<thead>
											<tr>
												<th class="col-md-2"><label
													style="color: Red; Bold; font-size: 12px;">Total
														PhonePe Amt :</label></th>
												<th class="col-md-2"><label
													style="color: Green; Bold; font-size: 12px;"
													id="totalPhonePayRec"></label></th>

												<th class="col-md-2"><label
													style="color: Red; Bold; font-size: 12px;">Total
														PhonePe RefundedAmt : </label></th>

												<th class="col-md-2"><label
													style="color: Green; Bold; font-size: 12px;"
													id="totalPhonePayRef"></label></th>
											</tr>
									</table>
									</thead>
								</div>
								
								<div class="row" style="height: 20px;display: none;">
									<table>
										<thead>
											<tr>
												<th class="col-md-2"><label
													style="color: Red; Bold; font-size: 12px;">Total
														RTGS Amt :</label></th>
												<th class="col-md-2"><label
													style="color: Green; Bold; font-size: 12px;"
													id="totalRTGSRec"></label></th>

												<th class="col-md-2"><label
													style="color: Red; Bold; font-size: 12px;">Total
														RTGS RefundedAmt : </label></th>

												<th class="col-md-2"><label
													style="color: Green; Bold; font-size: 12px;"
													id="totalRTGSRef"></label></th>
											</tr>
									</table>
									</thead>
								</div>
								
									<div class="row" style="height: 20px;display: none;">
									<table>
										<thead>
											<tr>
												<th class="col-md-2"><label
													style="color: Red; Bold; font-size: 12px;">Total
														CAdvance Amt :</label></th>
												<th class="col-md-2"><label
													style="color: Green; Bold; font-size: 12px;"
													id="totalCAdvanceRec"></label></th>

												<th class="col-md-2"><label
													style="color: Red; Bold; font-size: 12px;">Total
														CAdvance RefundedAmt : </label></th>

												<th class="col-md-2"><label
													style="color: Green; Bold; font-size: 12px;"
													id="totalCAdvanceRef"></label></th>
											</tr>
									</table>
									</thead>
								</div>
									
										      
								
								
									<!-- End TotalCount receipt/refund  -->
								
							</div>
                           </div>
						</div>
					</div>
				</div>
				<%@include file="Footer.jsp"%>
				<div class="ajaxmodal">
					<!-- Place at bottom of page -->
				</div>
	</c:if>

	<div id="userObj" style="display: none;"></div>
	<input type="hidden" id="userId"
		value="<%=session.getAttribute("userId1")%>">
	<!-- <input type="hidden" id="userId" value="0"> -->
	<input type="hidden" id="userType"
		value="<%=session.getAttribute("userType")%>">
	<input type="hidden" id="risingFlow" value="<%=risingFlow%>">
	<input type="hidden" id="hospName" value="<%=hospName%>">
	<input type="hidden" id="CAdvanceFlow" value="<%=CAdvanceFlow%>">
	Session session= new Session();
	<input type="hidden" id="unitId"
		value="<%=session.getAttribute("uId")%>">
	<input type="hidden" id="totRecAmtOpd" value="0">
	<input type="hidden" id="totRecAmtIpd" value="0">
	<input type="hidden" id="totRecAmtDiag" value="0">
	<input type="hidden" id="totRefAmtOpd" value="0">
	<input type="hidden" id="totRefAmtIpd" value="0">
	<input type="hidden" id="totRefAmtDiag" value="0">
	


</body>
</html>
