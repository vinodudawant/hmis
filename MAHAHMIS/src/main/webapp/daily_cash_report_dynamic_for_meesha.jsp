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
	<link rel="stylesheet" type="text/css"	href="timepeacker/jquery.datetimepicker.css" />
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
		getDailyCollectionReportForMeesha('onload');		
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
        	format: 'Y-m-d',
    	 	formatTime: 'H:i',
    	 	formatDate: 'Y-m-d',
         });
         $( "#lastDate" ).datetimepicker({
        	 timepicker:false,
        	 format: 'Y-m-d',
        	 	formatTime: 'H:i',
        	 	formatDate: 'Y-m-d',
        		 
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
</style>
<style>


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

			<%
				java.util.Calendar currentDate = java.util.Calendar.getInstance();
				java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyy-MM-dd");
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
											<li>Date :<%= todays_date %> </li>
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
											</li>
											<li>Report</li>
											 
											 
											 
											<div class="pull-right">
											<button onclick="exportToPdf();" title="Print Daily Collection" data-placement="left" data-toggle="tooltip" class="btn btn-xs btn-warning" data-original-title="Print Daily Collection">
														<i class="fa fa-print"></i>
													</button>
												<input id="getExcelReportBtn" type='button' onclick="exportToExcel()"
													value='Export To Excel' class='btn btn-xs btn-success' />											
													
											</div>
											
											<!-- <script type="text/javascript">
												
												$("[id$=getPdfBtn]").click(function(e) {
												    window.open('data:application/vnd.pdf,' + encodeURIComponent( $('div[id$=tblReport]').html()));
												    e.preventDefault();
												});
											
											</script> -->
											
										</ul>

									</div>
								</div>
							</div>
							<!-- /Common -->

							<div class="col-md-12-1">
								<!-- <div style="font-weight: bold;" class="col-md-1-1">Search
									By:</div> -->

								<div class="col-md-2-1" style="margin-top: 2px">
								 	<div class="col-md-2-1"><label>From</label></div>
								 	<div class="col-md-5-1">
								 	<input id="fromDate" type="text" style="width: 100%;"  value="<%=todays_date%>" >
									</div>
									<div class="col-md-5-1">
								 	<input id="fromTime" type="text" style="width: 100%;" placeholder="From Time" value="" onclick="getRepTime(this.id);">
									</div>
								</div>
								
								 <div class="col-md-2-1 center" style="margin-top: 2px">
									<div class="col-md-2-1"><label>To</label></div>
									<div class="col-md-5-1">
										<input id="lastDate" style="width: 100%;" type="text"  value="<%=todays_date%>">
									
									</div>
									<div class="col-md-5-1">
										<input id="lastTime" style="width: 100%;" type="text" placeholder="To Time"  value="" onclick="getRepTime(this.id);">
									
									</div>
								 </div>	

								<!-- <div style="font-weight: bold;" class="col-md-1-1">User</div> -->

								<div class="col-md-3-1" id="divbyName" style="margin-top: 2px">		
									<div class="col-md-2-1"><label>User</label></div>	
									<div class="col-md-6-1">						
										<!-- <select class="form-control input-SmallText" id="user">
											<option value="1">Mangesh Virkar</option>
											<option value="2">Vinod Udawant</option>
											<option value="3">Ramesh Pawar</option>
											<option value="4">Lokesh Rahul</option>
										</select> -->
										<!-- <input id="user"
											class="form-control input-SmallText" type="text"										
											name="date" placeholder="User Name"	value="1"> -->
										
										<input name="byName" type="text" id="byName" class="typeahead form-control input-SmallText"
											onkeypress="return validatealphabetic(event)" value="<%=session.getAttribute("userName")%>" style="display: none;"/>
																				 
										 <input name="byName" type="text" id="byUName" class="typeahead form-control input-SmallText"
											onkeyup="getUserDetailsByName(this.id)" onkeypress="return validatealphabetic(event)"/>
											
									</div>
								</div>
								
								
								<div class="col-md-2-1" style="margin-top: 2px">
									<div class="col-md-2-1"><label>Dept</label></div>
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
									<div class="col-md-2-1"><label>PayBy</label></div>
									<div class="col-md-6-1">
									 	<select id="payModeId" class="form-control input-SmallText">
									 		<!-- <option value="0">All</option>
									 		<option value="1">Cash</option>
									 		<option value="2">Card</option>
									 		<option value="3">Cheque</option> -->
									 	</select>
									</div>
								</div>	
								<!-- <div class="col-md-1-1">
									<label class="radio-inline">Pharmacy <input id="idPharmacy" type="checkbox"
										value='Get Report' class='btn btn-xs btn-success' />
									</label>											
										
								</div> -->

								<div class="col-md-1-1">
									<input type="button" value="Show"
										class="btn btn-xs btn-primary" class="edit"
										onclick="getDailyCollectionReportForMeesha('search')" />
								</div>
								
							</div>
							
							<div></div>
							
							
							<%
							
								if(risingFlow.equals("on")){
							%>
							
							<div id="tblDailyCashReport">

								<div id="opdDiv">
									<table style="margin-top: 20px;" class="datatable table table-bordered table-striped table-condensed cf">
										<thead class="cf">										
											<!-- <tr>
												<th colspan=8 style="color: blue;">Opd Total Collection</th>						
											</tr> -->										
											<tr>									
												<th style="height: 21.5px;width: 40px" >#</th>
												<th style="height: 21.5px;width: 45px" class="col-md-1 center hidden" >Patient Id</th>		
												<th style="height: 21.5px;width: 45px" id="thCenterPatientId" >Patient Id</th>		
												
												<th style="height: 21.5px;width: 45px" >bill Id</th>	
												<th style="height: 21.5px;width: 90px" >Opd No</th>		
												<th style="height: 21.5px;width: 50px" >Rec Id</th>													
												<th style="height: 21.5px;width: 150px" >Patient Name</th>						
												<th style="height: 21.5px;width: 90px" >Rec Date</th>												
												<th style="height: 21.5px;width: 65px" >Pay Mode</th>														
												<th style="height: 21.5px;width: 65px" >Total</th>												
												<th style="height: 21.5px;width: 100px" >User</th>		
												<th style="height: 21.5px;width: 100px" >Remark</th>	
												<th style="height: 21.5px;width: 100px" >Dept</th>									
											</tr>									
										</thead>
									</table>
								
								
									<div style="height: 180px; max-height: auto; overflow: auto;" class="col-md-12-1">
										
										<div class="divide-40"></div>
										
										<table class="table table-bordered table-striped table-condensed cf">
											<tbody id="opdCollection">
		
											</tbody>
										</table>
									</div>
								
									
									
									<div style="height: 180px; max-height: auto; overflow: auto;" class="col-md-12-1">
										
										<div class="divide-40"></div>
										
										<table
											class="table table-bordered table-striped table-condensed cf">
											<tbody id="opdRefund">
		
											</tbody>
										</table>
									</div>
								</div>
								
								<div id="ipdDiv">
								
									
									<div style="height: 180px; max-height: auto; overflow: auto;" class="col-md-12-1">
										
										<div class="divide-40"></div>
										
										<table class="table table-bordered table-striped table-condensed cf">
											<tbody id="ipdCollection">
		
											</tbody>
										</table>
									</div>			
									
									
									
									
									
									<div style="height: 180px; max-height: auto; overflow: auto;" class="col-md-12-1">
										
										<div class="divide-40"></div>
										
										<table
											class="table table-bordered table-striped table-condensed cf">
											<tbody id="ipdRefund">
		
											</tbody>
										</table>
									</div>
								</div>
								
								<div id="diagDiv">
									
									
									<div style="height: 180px; max-height: auto; overflow: auto;" class="col-md-12-1">
										
										<div class="divide-40"></div>
										
										<table class="table table-bordered table-striped table-condensed cf">
											<tbody id="diagCollection">
		
											</tbody>
										</table>
									</div>
									
									
									
									<div style="height: 180px; max-height: auto; overflow: auto;" class="col-md-12-1">
										
										<div class="divide-40"></div>
										
										<table
											class="table table-bordered table-striped table-condensed cf">
											<tbody id="diagRefund">
		
											</tbody>
										</table>
									</div>
								</div>
								
							
							</div>	
							
							<%
							
								}else{
							%>
								<div id="tblDailyCashReport">

								<div id="opdDiv">
									<!-- <table style="margin-top: 20px;" class="datatable table table-bordered table-striped table-condensed cf">
										<thead class="cf">										
											<tr>
												<th colspan=8 style="color: blue;">Opd Total Collection</th>						
											</tr>										
											<tr>									
												<th style="height: 21.5px;width: 40px" >#</th>
												<th style="height: 21.5px;width: 45px" class="col-md-1 center hidden" >Patient Id</th>		
												<th style="height: 21.5px;width: 14.2%" id="thCenterPatientId" >Patient Id</th>		
																	
												<th style="height: 21.5px;width: 45px" >bill Id</th>	
												<th style="height: 21.5px;width: 90px" >Opd No</th>		
												<th style="height: 21.5px;width: 50px" >Rec Id</th>													
												<th style="height: 21.5px;width: 150px" >Patient Name</th>						
												<th style="height: 21.5px;width: 90px" >Rec Date</th>												
												<th style="height: 21.5px;width: 65px" >Pay Mode</th>														
												<th style="height: 21.5px;width: 65px" >Total</th>
												<th style="height: 21.5px;width: 65px" >Total Bill</th>	
												<th style="height: 21.5px;width: 65px" >Total Remain</th>													
												<th style="height: 21.5px;width: 100px" >User</th>		
												<th style="height: 21.5px;width: 100px" >Remark</th>																					
											</tr>									
										</thead>
									</table>
								
								
									<div style="height: 180px; max-height: auto; overflow: auto;" class="col-md-12-1">
										<table
											class="table table-bordered table-striped table-condensed cf">
											<tbody id="opdCollection">
		
											</tbody>
										</table>
									</div> -->

									<div style="margin-top: 12px;">

										<table class="table table-bordered responsive "
											id="">
											<thead>
												<tr>
													<th style="color: blue;">Opd Total Collection</th>
												</tr>
											</thead>
										</table>
									</div>

									<div class="col-md-12" >
									
										<div style="height: 100px;overflow: auto;">
												<table class="table table-bordered responsive "
													id="opdCollectonM" >
													<thead>
												<!-- 	<tr>
												  <th colspan=8 style="color: blue;">Opd Total Collection</th>						
											          </tr> -->
														<tr>
													<th>#</th>
													<th id="thCenterPatientId1">Patient Id</th>
													<th>bill Id</th>
													<th >Opd No</th>
													<th>Rec Id</th>
													<th>Patient Name</th>
													<th>Rec Date</th>
													<th >Pay Mode</th>
													<th >Total Paid</th>
													<th> Total Bill</th>
													<th >Total Remain</th>
													<th >User</th>
													<th >Remark</th>
												</tr>
													</thead>
													<tbody id="opdCollection"  >
													</tbody>
												</table>
												</div>
											</div>
												<!-- <div style="overflow: auto;max-height: 150px">
												<table class="table table-bordered responsive">
												
													</table>
													</div> -->
												
												
								
								<!-- 	<table style="margin-top: 20px;" class="datatable table table-bordered table-striped table-condensed cf">
										<thead class="cf">										
											<tr>
												<th colspan=8 style="color: blue;">Opd Total Refund</th>						
											</tr>										
											<tr>									
												<th style="height: 21.5px;width: 40px" >#</th>
												<th style="height: 21.5px;width: 45px" class="col-md-1 center hidden">Patient Id</th>		
												<th style="height: 21.5px;width: 45px" id="thCenterPatientId1">Patient Id</th>												
												<th style="height: 21.5px;width: 45px" >bill Id</th>	
												<th style="height: 21.5px;width: 90px" >Opd No</th>		
												<th style="height: 21.5px;width: 50px" >Rec Id</th>													
												<th style="height: 21.5px;width: 150px" >Patient Name</th>						
												<th style="height: 21.5px;width: 90px" >Rec Date</th>												
												<th style="height: 21.5px;width: 65px" >Pay Mode</th>														
												<th style="height: 21.5px;width: 65px" >Total</th>	
												<th style="height: 21.5px;width: 65px" >Total Bill</th>	
												<th style="height: 21.5px;width: 65px" >Total Remain</th>												
												<th style="height: 21.5px;width: 100px" >User</th>		
												<th style="height: 21.5px;width: 100px" >Remark</th>										
											</tr>									
										</thead>
									</table>	
									
									<div style="height: 180px; max-height: auto; overflow: auto;" class="col-md-12-1">
										
										<div class="divide-40"></div>
										
										<table
											class="table table-bordered table-striped table-condensed cf">
											<tbody id="opdRefund">
		
											</tbody>
										</table>
									</div> -->
										<div style="margin-top: 12px;">

										<table class="table table-bordered responsive "
											id="">
											<thead>
												<tr>
													<th style="color: blue;">Opd Total Refund</th>
												</tr>
											</thead>
										</table>
									</div>
									
									<div class="col-md-12" >
										<div style="height: 100px;overflow: auto;">
												<table class="table table-bordered responsive "
													id="ovampickupTabel">
													<thead>
													<!-- <tr>
												  <th colspan=8 style="color: blue;">Opd Total Refund</th>						
											          </tr> -->
														<tr>
													<th>#</th>
													<th id="thCenterPatientId1">Patient Id</th>
													<th>bill Id</th>
													<th >Opd No</th>
													<th>Rec Id</th>
													<th>Patient Name</th>
													<th>Rec Date</th>
													<th >Pay Mode</th>
													<th >Total Refund</th>
													<th> Total Bill</th>
													<th >Total Remain</th>
													<th >User</th>
													<th >Remark</th>
												</tr>
													</thead>
													<tbody id="opdRefund">
													</tbody>
												</table>
												</div>
												</div>
									
								</div>
								
							<!-- 	<div id="ipdDiv" style="display: none">
									<table style="margin-top: 20px;" class="datatable table table-bordered table-striped table-condensed cf">
										<thead class="cf">										
											<tr>
												<th colspan=8 style="color: blue;">Ipd Total Collection</th>						
											</tr>										
											<tr>									
												<th style="height: 21.5px;width: 40px" >#</th>
												<th style="height: 21.5px;width: 45px" class="col-md-1 center hidden">Patient Id</th>
												<th style="height: 21.5px;width: 45px" id="thCenterPatientId2">Patient Id</th>		
												<th style="height: 21.5px;width: 45px" >bill Id</th>	
												<th style="height: 21.5px;width: 90px" >Ipd No</th>		
												<th style="height: 21.5px;width: 50px" >Rec Id</th>													
												<th style="height: 21.5px;width: 150px" >Patient Name</th>						
												<th style="height: 21.5px;width: 90px" >Rec Date</th>												
												<th style="height: 21.5px;width: 65px" >Pay Mode</th>														
												<th style="height: 21.5px;width: 65px" >Total</th>
												<th style="height: 21.5px;width: 65px" >Total Bill</th>	
												<th style="height: 21.5px;width: 65px" >Total Remain</th>													
												<th style="height: 21.5px;width: 100px" >User</th>		
												<th style="height: 21.5px;width: 100px" >Remark</th>										
											</tr>									
										</thead>
									</table>	
									
									<div style="height: 180px; max-height: auto; overflow: auto;" class="col-md-12-1">
										<table
											class="table table-bordered table-striped table-condensed cf">
											<tbody id="ipdCollection">
		
											</tbody>
										</table>
									</div>			
									
									<table style="margin-top: 20px;" class="datatable table table-bordered table-striped table-condensed cf">
										<thead class="cf">										
											<tr>
												<th colspan=8 style="color: blue;">Ipd Total Refund</th>						
											</tr>										
											<tr>									
												<th style="height: 21.5px;width: 40px" >#</th>
												<th style="height: 21.5px;width: 45px" class="col-md-1 center hidden">Patient Id</th>
												<th style="height: 21.5px;width: 45px" id="thCenterPatientId3">Patient Id</th>				
												<th style="height: 21.5px;width: 45px" >bill Id</th>	
												<th style="height: 21.5px;width: 90px" >Ipd No</th>		
												<th style="height: 21.5px;width: 50px" >Rec Id</th>													
												<th style="height: 21.5px;width: 150px" >Patient Name</th>						
												<th style="height: 21.5px;width: 90px" >Rec Date</th>												
												<th style="height: 21.5px;width: 65px" >Pay Mode</th>														
												<th style="height: 21.5px;width: 65px" >Total</th>	
												<th style="height: 21.5px;width: 65px" >Total Bill</th>	
												<th style="height: 21.5px;width: 65px" >Total Remain</th>												
												<th style="height: 21.5px;width: 100px" >User</th>		
												<th style="height: 21.5px;width: 100px" >Remark</th>										
											</tr>									
										</thead>
									</table>	
									
									
									
									<div style="height: 180px; max-height: auto; overflow: auto;" class="col-md-12-1">
										
										<div class="divide-40"></div>
										
										<table
											class="table table-bordered table-striped table-condensed cf">
											<tbody id="ipdRefund">
		
											</tbody>
										</table>
									</div>
								</div> -->
								
								<div id="diagDiv">
								<!-- 	<table style="margin-top: 20px;" class="datatable table table-bordered table-striped table-condensed cf">
										<thead class="cf">										
											<tr>
												<th colspan=8 style="color: blue;">Diagnosis Total Collection</th>						
											</tr>										
											<tr>									
												<th style="height: 21.5px;width: 40px" >#</th>
												<th style="height: 21.5px;width: 45px" class="col-md-1 center hidden">Patient Id</th>
												<th style="height: 21.5px;width: 45px" id="thCenterPatientId4">Patient Id</th>			
												<th style="height: 21.5px;width: 45px" >bill Id</th>	
												<th style="height: 21.5px;width: 90px" >Diag No</th>		
												<th style="height: 21.5px;width: 50px" >Rec Id</th>													
												<th style="height: 21.5px;width: 150px" >Patient Name</th>						
												<th style="height: 21.5px;width: 90px" >Rec Date</th>												
												<th style="height: 21.5px;width: 65px" >Pay Mode</th>														
												<th style="height: 21.5px;width: 65px" >Total</th>	
												<th style="height: 21.5px;width: 65px" >Total Bill</th>	
												<th style="height: 21.5px;width: 65px" >Total Remain</th>												
												<th style="height: 21.5px;width: 100px" >User</th>		
												<th style="height: 21.5px;width: 100px" >Remark</th>										
											</tr>									
										</thead>
									</table>	
									
									<div style="height: 180px; max-height: auto; overflow: auto;" class="col-md-12-1">
										<table
											class="table table-bordered table-striped table-condensed cf">
											<tbody id="diagCollection">
		
											</tbody>
										</table>
									</div> -->
									
										<div style="margin-top: 12px;">

										<table class="table table-bordered responsive "
											id="">
											<thead>
												<tr>
													<th style="color: blue;">Diagnosis Total Collection</th>
												</tr>
											</thead>
										</table>
									</div>
									
									<div class="col-md-12" >
										<div style="height: 100px;overflow: auto;">
												<table class="table table-bordered responsive "
													id="diagnoCollectionM">
													<thead>
													<!-- <tr>
												  <th colspan=8 style="color: blue;">Opd Total Refund</th>						
											          </tr> -->
														<tr>
													<th>#</th>
													<th id="thCenterPatientId1">Patient Id</th>
													<th>bill Id</th>
													<th >Diag No</th>
													<th>Rec Id</th>
													<th>Patient Name</th>
													<th>Rec Date</th>
													<th >Pay Mode</th>
													<th >Total Paid</th>
													<th> Total Bill</th>
													<th >Total Remain</th>
													<th >User</th>
													<th >Remark</th>
												</tr>
													</thead>
													<tbody id="diagCollection">
													</tbody>
												</table>
												</div>
												</div>
									
									
									
									<!-- <table style="margin-top: 20px;" class="datatable table table-bordered table-striped table-condensed cf">
										<thead class="cf">										
											<tr>
												<th colspan=8 style="color: blue;">Diagnosis Total Refund</th>						
											</tr>										
											<tr>									
												<th style="height: 21.5px;width: 40px" >#</th>
												<th style="height: 21.5px;width: 45px" class="col-md-1 center hidden" >Patient Id</th>
												<th style="height: 21.5px;width: 45px" id="thCenterPatientId5" >Patient Id</th>		
												<th style="height: 21.5px;width: 45px" >bill Id</th>	
												<th style="height: 21.5px;width: 90px" >Diag No</th>		
												<th style="height: 21.5px;width: 50px" >Rec Id</th>													
												<th style="height: 21.5px;width: 150px" >Patient Name</th>						
												<th style="height: 21.5px;width: 90px" >Rec Date</th>												
												<th style="height: 21.5px;width: 65px" >Pay Mode</th>														
												<th style="height: 21.5px;width: 65px" >Total</th>	
												<th style="height: 21.5px;width: 65px" >Total Bill</th>	
												<th style="height: 21.5px;width: 65px" >Total Remain</th>												
												<th style="height: 21.5px;width: 100px" >User</th>		
												<th style="height: 21.5px;width: 100px" >Remark</th>										
											</tr>									
										</thead>
									</table>	
									
									<div style="height: 180px; max-height: auto; overflow: auto;" class="col-md-12-1">
										
										<div class="divide-40"></div>
										
										<table
											class="table table-bordered table-striped table-condensed cf">
											<tbody id="diagRefund">
		
											</tbody>
										</table>
									</div> -->
									
										<div style="margin-top: 12px;">

										<table class="table table-bordered responsive "
											id="">
											<thead>
												<tr>
													<th style="color: blue;">Diagnosis Total Refund</th>
												</tr>
											</thead>
										</table>
									</div>
									
									<div class="col-md-12" >
										<div style="height: 100px;overflow: auto;">
												<table class="table table-bordered responsive "
													id="diagnoCollectionM">
													<thead>
													<!-- <tr>
												  <th colspan=8 style="color: blue;">Opd Total Refund</th>						
											          </tr> -->
														<tr>
													<th>#</th>
													<th id="thCenterPatientId1">Patient Id</th>
													<th>bill Id</th>
													<th >Diag No</th>
													<th>Rec Id</th>
													<th>Patient Name</th>
													<th>Rec Date</th>
													<th >Pay Mode</th>
													<th >Total Refund</th>
													<th> Total Bill</th>
													<th >Total Remain</th>
													<th >User</th>
													<th >Remark</th>
												</tr>
													</thead>
													<tbody id="diagRefund">
													</tbody>
												</table>
												</div>
												</div>
									
									
								</div>
															
							</div>		
								
							
							<%} %>
												
						</div>
					</div>
				</div>
				<%@include file="Footer.jsp"%></div>
		</div>
		<div class="ajaxmodal">
			<!-- Place at bottom of page -->
		</div>
	</c:if>
	
	<div id="userObj" style="display: none;"></div>
	<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
	<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
	<!-- <input type="hidden" id="userId" value="0"> -->
	<input type="hidden" id="userType" value="<%=session.getAttribute("userType")%>">
	<input type="hidden" id="risingFlow" value="<%=risingFlow%>">
</body>
</html>
