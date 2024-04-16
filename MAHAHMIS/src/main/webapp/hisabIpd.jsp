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
<title>Ipd Finance</title>

<link rel="stylesheet" type="text/css" href="ehat-design/css/cloud-admin.css" >
<link rel="stylesheet" type="text/css"  href="ehat-design/css/themes/default.css" id="skin-switcher" >
<link rel="stylesheet" type="text/css"  href="ehat-design/css/responsive.css" >
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
<script type="text/javascript" src="js/finance.js"></script>

<!-- /for Developers  -->

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<script type="text/javascript">
	onload = function() {
		loadTestType();
		getServicesOnBilling();
		getFinaceDetails('hisab',2);
		getAllChargesl();
		getBankMasterList(); 
	}

	jQuery(document).ajaxStart(function() {
		//alert("hi ajax start");
		$("body").addClass("loading");
	})

	jQuery(document).ajaxStop(function() {
		$("body").removeClass("loading");
		//alert("hi ajax stop");
	})
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

<!-- <script>
	jQuery(document).ready(function() {
		App.setPage("Report"); //Set current page
		App.init(); //Initialise plugins and elements
	});
</script> -->
</head>
<body>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>

	</c:if>
	<c:if test="${sessionScope.userType != null}">
	
	<%
		java.util.Calendar currentDate = java.util.Calendar.getInstance();
		java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("dd/MM/yyyy");
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

									<ul class="breadcrumb col-md-12" style="margin-top: -10px;">
										<li>Date : <%=todays_date%></li>
										<li><i class="fa fa-home"></i> <a href="ehat_finance_dashboard.jsp">Finance</a>
										</li>
										<li><a href="hisabIpd.jsp">Ipd Finance</a></li>
										<li class="pull-right">
												
											<!-- <script type="text/javascript">
												$("[id$=btnPrint]").click(function(e) {
												    window.open('data:application/vnd.ms-excel,' + encodeURIComponent( $('div[id$=diveMain]').html()));
												    e.preventDefault();
												});													
											</script>	 -->
											
											<button id="btnPrint" class="btn btn-xs btn-warning"
												data-placement="left" data-toggle="tooltip"
												data-original-title="Print">Export To EXCEL</button>
												<script type="text/javascript">
														$(document).on('click', '#btnPrint', function (e) {
															var clonedContent = $('div[id$=diveMain]').clone();
		
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
															    link.download = "IPD Finance.xls";
															    link.href = result;
															    link.click();
															});
													</script>
											
										</li>
									</ul>
								</div>
							</div>
						</div>
						<!-- /Common -->

						
						<!-- <div class="panel panel-default">
							<div class="panel-body">
							
								<div id="diveMain" class="col-md-12" style="margin-top: 5px">
								
									<div id="divLine5" class="box border col-md-12">
											<div class="divide-20"></div>
											<form class="form-horizontal col-md-12" style="margin-top:10px">
											<div class="col-md-12">
												<label> <i class="fa fa-arrow-down"></i> Finance Summary
												</label>
											</div>
											<br>

											<table class="table table-condensed col-md-12"
												style="background: Scrollbar; border-bottom: 1px solid black;border-top: 1px solid black;">
												<thead>

													<tr>
														<th class="col-md-3 center">
															<div class="TextFont">Total Receipt</div>
														</th>
														<th class="col-md-3 center">
															<div class="TextFont">Total Discount</div>
														</th>
														<th class="col-md-3 center">
															<div class="TextFont">Total Refund</div>
														</th>
														<th class="col-md-3 center">
															<div class="TextFont">Total Cash</div>
														</th>

													</tr>

												</thead>
											</table>

											<div id="divTestDash4" class="box border col-md-12"
												style="margin-top: -21px;">

												<table class="table table-striped table-condensed">
													<tbody id="tableTotalHisab">
														
													</tbody>
												</table>
											</div>
										</form>
									</div>
															
									<div id="divLine2" class="col-md-6" style="border:1px solid #c4c4c4;border-radius: 4px;width: 58%;margin-right: 3px;margin-top: 5px ">
										<form class="form-horizontal col-md-12" style="margin-top:10px">

											<div class="divide-20"></div>
											<div class="col-md-12">
												<label> <i class="fa fa-arrow-down"></i>Details
													Receipt :
												</label>
											</div>
											<br>

											<table class="table table-condensed col-md-12"
												style="background: Scrollbar; border-bottom: 1px solid black;border-top: 1px solid black;">
												<thead>
													<tr>
														<th class="col-md-1 center"><div class="TextFont">#</div></th>
														<th class="col-md-2 center">
															<div class="TextFont">Date</div>
														</th>
														<th class="col-md-2 center">
															<div class="TextFont">MRNo.</div>
														</th>
														<th class="col-md-2 center">
															<div class="TextFont">RegNo</div>
														</th>
														<th class="col-md-2 center">
															<div class="TextFont">Head</div>
														</th>
														<th class="col-md-2 center">
															<div class="TextFont">Amount</div>
														</th>															
													</tr>
												</thead>
											</table>

											<div id="divTestDash" class="box border col-md-12"
												style="overflow-y: scroll; margin-top: -21px; height: 130px; overflow: auto;">

												<table class="table table-striped table-condensed">
													<tbody id="tableReceiptDetails">

													</tbody>
												</table>
											</div>
										</form>
									</div>
									
									<div id="divLine3" class="col-md-5" style="border:1px solid #c4c4c4;border-radius: 4px;margin-top: 5px;margin-bottom: 25px">
										<form class="form-horizontal col-md-12" style="margin-top:10px">
											<div class="divide-20"></div>
											<div class="col-md-12">
												<label> <i class="fa fa-arrow-down"></i> Details
													Refunds
												</label>
											</div>
											<br>

											<table class="table table-condensed col-md-12"
												style="background: Scrollbar; border-bottom: 1px solid black;border-top: 1px solid black;">
												<thead>

													<tr>
														<th class="col-md-1 center">
															<div class="TextFont">#</div>
														</th>
														<th class="col-md-2 center">
															<div class="TextFont">Date</div>
														</th>
														<th class="col-md-2 center">
															<div class="TextFont">MRNo.</div>
														</th>
														<th class="col-md-2 center">
															<div class="TextFont">RegNo</div>
														</th>															
														<th class="col-md-2 center">
															<div class="TextFont">Amount</div>
														</th>															
													</tr>

												</thead>
											</table>

											<div id="divTestDash3"
												class="box border col-md-12"
												style="overflow: auto; margin-top: -21px; height: 130px;">

												<table class="table table-striped table-condensed">
													<tbody id="tableRefundDetails">

													</tbody>
												</table>

											</div>
										</form>
									</div>										
									
									<div id="divLine4" class=" box border col-md-12" style="margin-top: -21px;">
										<form class="form-horizontal col-md-12" style="margin-top:10px">

											<div class="divide-20"></div>
											<div class="col-md-12">
												<label> <i class="fa fa-arrow-down"></i>Details Discount :	</label>
											</div>
											<br>

											<table class="table table-condensed col-md-12"
												style="background: Scrollbar; border-bottom: 1px solid black;border-top: 1px solid black;">
												<thead>
													<tr>
														<th class="col-md-1 center"><div class="TextFont">#</div></th>
														<th class="col-md-2 center">
															<div class="TextFont">Bill No</div>
														</th>
														<th class="col-md-2 center">
															<div class="TextFont">Discount</div>
														</th>
														<th class="col-md-2 center">
															<div class="TextFont">Reg ID</div>
														</th>
														<th class="col-md-2 center">
															<div class="TextFont">Total Amount</div>
														</th>
														<th class="col-md-2 center">
															<div class="TextFont">Narration</div>
														</th>															
													</tr>
												</thead>
											</table>

											<div id="divTestDash2" class="box border col-md-12"
												style="overflow-y: scroll; margin-top: -21px; height: 150px; overflow: auto;">

												<table class="table table-striped table-condensed">
													<tbody id="tableDiscountDetails">

													</tbody>
												</table>
											</div>
										</form>
									</div>						
									
								</div>
							</div>
						</div> -->
						
						
						<div class="panel panel-default">

								<div class="panel-body">

									<div class="col-md-12">
										<!-- <div class="col-md-6"> -->
										<%-- <div class="row">
										<label class="TextFont"> Date To View Daily Report </label> <input
											id="txtcurrentDate" class="form-control input-SmallText"
											type="text" onchange="validateDateToCloseHisab()"
											onclick="displayCalendar(document.getElementById('txtcurrentDate'),'yyyy-mm-dd',this)"
											readonly="readonly" name="date" placeholder="Date"
											value="<%=todays_date%>">
									</div> --%>

										<div class="col-md-3" style="margin-top: 2px">
											<div class="col-md-2">
												<label>From</label>
											</div>
											<div class="col-md-10">
												<input id="fromDate" class="form-control input-SmallText"
													type="text"
													onclick="displayCalendar(document.getElementById('fromDate'),'dd/mm/yyyy',this)"
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
													onclick="displayCalendar(document.getElementById('lastDate'),'dd/mm/yyyy',this)"
													readonly="readonly" name="date" placeholder="Date"
													value="<%=todays_date%>">
											</div>
										</div>


										<!-- <div class="divide-20"></div> -->
										<!-- </div> -->

										<!-- <div class="col-md-4" style="margin-top: 2px">
											<div class="row">
										<label class="TextFont"> Service Department </label> <select
											id="txtSelectService" class="form-control input-SmallText"
											onchange=""></select>
									</div>

											<div class="col-md-6">
												<label>Service Department</label>
											</div>
											<div class="col-md-6">
												<select id="txtSelectService"
													class="form-control input-SmallText" onchange=""></select>
											</div>
											<div class="divide-20"></div>
										</div> -->
										
										<div class="col-md-3" style="margin-top: 2px;display: none;">
											<div class="col-md-2">
												<label>Bank</label>
											</div>
											<div class="col-md-10">
												<select class="form-control" id="bankID" style="width: 100%">
													<option value="1">ICICI</option>
													<option value="2">HDFC</option>
													<option value="3">YES BANK</option>
													<option value="4">IDBI</option>
												</select>
											</div>										
										</div>
										
										<div class="col-sm-2" style="display: none;">
										<!-- <div class="col-md-2"><label>Pay Mode</label></div> -->
										<!-- <div class="col-md-12"> -->
											<select class="form-control" id="payMode">
												<option value="0">All</option>
												<option value="1">Cash</option>
												<option value="2">Card</option>
												<option value="3">Cheque</option>
											</select>
										<!-- </div> -->
										</div>

										<div class="col-md-1" style="margin-top: 2px">
											<input type="button" onclick="getFinaceDetails('hisab',2)"
												class="btn btn-primary" value="Show">
										</div>

										<div class="divide-20"></div>
									</div>

									<div class="col-md-12">

										<!-- <div class="col-md-3 TextFont" id="sponserselect">
											<div class="form-group col-md-12">
												<div class="form-group">
													<div class="col-md-12">
														<select class="col-md-8" name="listmstr"
															id="listmstr_select_chargesinfo"
															style="margin-left: 20px; width: 160px;"
															onchange="setDyanamicDivForChargesinfo('dynamicItemsinfo',this.id)">
															<option id="firstElmts2">--- Select Company ---</option>
														</select>
														<div
															class="col-md-12 select2-container select2-container-multi "
															id="compDiv"
															style="margin-top: 2%; margin-left: 20px; width: 160px; display: none;">
															<ul id="dynamicItemsinfo" class="select2-choices"
																style="overflow-y: scroll; min-height: 30px">
															</ul>
														</div>
													</div>
												</div>
											</div>
										</div> -->

										

										<div class="col-md-6" style="margin-top: 10px;display: none;">

											<div class="col-sm-3">
												<label class="radio-inline">Consolidated <input
													type="radio" name="billType" checked="checked"
													id="consolidated" value="1">
												</label>
											</div>

											<div class="col-sm-2">
												<label class="radio-inline">bill <input type="radio"
													name="billType" id="bill" value="2">
												</label>
											</div>

											<div class="col-sm-2">
												<label class="radio-inline">Dues <input type="radio"
													name="billType" id="dues" value="3">
												</label>
											</div>

											<!-- <div class="col-sm-3">
												<label class="radio-inline">credit <input
													type="radio" name="billType" id="provisionalBill" value="3">
												</label>
											</div> -->																			

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
										<!-- <ul class="nav nav-tabs">

											<li onclick="setNewTemp(this.id);" id="chrgsMaster"
												class="ehatList"><a><i class="fa fa-bookmark"></i>
													<span class="hidden-inline-mobile">Other</span><span
													id="chrgCount" class="badge badge-blue font-11">2</span> </a></li>

											<li onclick="setNewTemp(this.id);" id="subServMaster"
												class="ehatList"><a><i class="fa fa-bookmark"></i>
													<span class="hidden-inline-mobile">NEFT</span> <span
													id="subCount" class="badge badge-blue font-11">23</span> </a></li>

											<li onclick="setNewTemp(this.id);" id="servMaster"
												class="ehatList"><a><i class="fa fa-bookmark"></i>
													<span class="hidden-inline-mobile">Cheque</span> <span
													id="servCount" class="badge badge-blue font-11">31</span> </a></li>

											<li onclick="setNewTemp(this.id);" id="deptMaster"
												class="ehatList"><a><i class="fa fa-bookmark"></i>
													<span class="hidden-inline-mobile">Card</span> <span
													id="deptCount" class="badge badge-blue font-11">3</span> </a></li>

											<li class="ehatList active" onclick="setNewTemp(this.id);"
												id="unitMaster"><a><i class="fa fa-bookmark"></i> <span
													class="hidden-inline-mobile">Cash</span> <span
													id="unitCount" class="badge badge-blue font-11">1</span> </a></li>

										</ul> -->

										<div class="panel panel-default"
											style="border: none; margin-top: -9px">
											<div class="panel-body">

												<div id="diveMain" class="col-md-12" style="margin-top: 5px">

													<div id="divLine4" class="box border col-md-12">
														<!-- <div class="divide-20"></div> -->
														<form class="form-horizontal col-md-12"
															style="margin-top: 10px">
															<div class="col-md-12">
																<label> <i class="fa fa-arrow-down"></i> Finance
																	Summary
																</label>
															</div>
															<br>

															<table class="table table-condensed col-md-12"
																id="totTbl"
																style="background: Scrollbar; border-bottom: 1px solid black; border-top: 1px solid black;">
																<thead>

																	<tr>
																		<th class="col-md-3 center">
																			<div class="TextFont">Total Receipt</div>
																		</th>
																		<th class="col-md-3 center">
																			<div class="TextFont">Total Refund</div>
																		</th>
																		<th class="col-md-3 center">
																			<div class="TextFont">Total Concession</div>
																		</th>
																		<th class="col-md-3 center">
																			<div class="TextFont">Total Cash</div>
																		</th>

																	</tr>

																</thead>
															</table>

															<div id="divTestDashVouchar" class="box border col-md-12"
																style="margin-top: -21px; max-height: 30px">

																<table class="table table-striped table-condensed">
																	<tbody id="tableTestVouchar">

																		 <tr>
																			 <th class="col-md-3 center">
																				<div class="TextFont" id="recTot">0</div>
																			 </th>
																			 <th class="col-md-3 center">
																				<div class="TextFont" id="refTot">0</div>
																			 </th>
																			 <th class="col-md-3 center">
																				<div class="TextFont" id="conTot">0</div>
																			 </th>
																			 <th class="col-md-3 center">
																				<div class="TextFont" id="remTot">0</div>
																			 </th>
																		 </tr>
																		 
																	</tbody>
																</table>
															</div>
														</form>
													</div>


													<div id="divLine2" class=" box border col-md-12">
														<form class="form-horizontal col-md-12"
															style="margin-top: 10px">

															<!-- <div class="divide-20"></div> -->
															<div class="col-md-12">
																<label> <i class="fa fa-arrow-down"></i>Finance
																	Receipt Details :
																</label>
															</div>
															<br>

															<!-- <table class="table table-condensed col-md-12"
													style="background: Scrollbar; border-bottom: 1px solid black;border-top: 1px solid black;">
													<thead>
														<tr>
															<th class="col-md-1 center"><div class="TextFont">#</div></th>
															<th class="col-md-2 center">
																<div class="TextFont">Name of Patient</div>
															</th>
															<th class="col-md-3 center">
																<div class="TextFont">Name of Doctor</div>
															</th>
															<th class="col-md-3 center">
																<div class="TextFont">Receipt No-Compt No</div>
															</th>
															<th class="col-md-1 center">
																<div class="TextFont">Amount</div>
															</th>
															<th class="col-md-1 center">
																<div class="TextFont">Concession</div>
															</th>
															<th class="col-md-1 center">
																<div class="TextFont">Net</div>
															</th>


														</tr>
													</thead>
												</table> -->

														<table class="datatable table table-bordered table-striped table-condensed cf" id="hisabTbl"
																style="background: Scrollbar; border-bottom: 1px solid black; border-top: 1px solid black;">
																<thead class="cf">
																	<tr>
																		<th style="height: 21.5px;" class="col-md-1 center"><div
																				class="TextFont">#</div></th>
																		<th style="height: 21.5px;" class="col-md-1 center"><div
																				class="TextFont">Patient Id</div></th>
																		<th style="height: 21.5px;" class="numeric col-md-5"><div
																				class="TextFont">Patient Name</div></th>										
																		<!-- <th style="height: 21.5px;" class="col-md-1-1 center"><div
																				class="TextFont">Cash</div></th>
																		<th style="height: 21.5px;" class="col-md-1-1 center"><div
																				class="TextFont">Card</div></th>
																		<th style="height: 21.5px;" class="col-md-1-1 center"><div
																				class="TextFont">Cheque</div></th>
																		<th style="height: 21.5px;" class="col-md-1-1 center"><div
																				class="TextFont">Common Adv</div></th>
																		<th style="height: 21.5px;" class="numeric col-md-1-1 center"><div
																				class="TextFont">Multiple</div></th>	 -->
																		<th style="height: 21.5px;" class="numeric col-md-3"><div
																				class="TextFont">Total</div></th>	
																		<th style="height: 21.5px;" class="numeric col-md-1"><div
																				class="TextFont"><input type="checkbox" id="ipdRecChk" onclick="checkUncheck(this.id,'recChk')"></div></th>								
																	</tr>
																</thead>
															</table>

															<!-- <div id="divTestDash" class="box border col-md-12"
													style="overflow-y: scroll; margin-top: -21px; height: 150px; overflow: auto;">

													<table class="table table-striped table-condensed">
														<tbody id="tableTestDash">

														</tbody>
													</table>
												</div> -->

															<div
																style="overflow: auto; margin-top: -21px; height: 160px;"
																class="col-md-12-1 box border">
																<table
																	class="table table-bordered table-striped table-condensed cf">
																	<tbody id="container">

																	</tbody>
																</table>
															</div>

														</form>
													</div>

													<div id="divLine3" class=" box border col-md-12">
														<form class="form-horizontal col-md-12"
															style="margin-top: 10px">
															<!-- <div class="divide-20"></div> -->
															<div class="col-md-12">
																<label> <i class="fa fa-arrow-down"></i> Finance
																	Refund Details :
																</label>
															</div>
															<br>

															<table class="table table-condensed col-md-12"
																style="background: Scrollbar; border-bottom: 1px solid black; border-top: 1px solid black;">
																<thead class="cf">
																	<tr>
																		<th style="height: 21.5px;" class="col-md-1 center"><div
																				class="TextFont">#</div></th>
																		<th style="height: 21.5px;" class="col-md-1 center"><div
																				class="TextFont">Patient Id</div></th>
																		<th style="height: 21.5px;" class="numeric col-md-5"><div
																				class="TextFont">Patient Name</div></th>										
																		<!-- <th style="height: 21.5px;" class="col-md-1-1 center"><div
																				class="TextFont">Cash</div></th>
																		<th style="height: 21.5px;" class="col-md-1-1 center"><div
																				class="TextFont">Card</div></th>
																		<th style="height: 21.5px;" class="col-md-1-1 center"><div
																				class="TextFont">Cheque</div></th>
																		<th style="height: 21.5px;" class="col-md-1-1 center"><div
																				class="TextFont">Common Adv</div></th>
																		<th style="height: 21.5px;" class="numeric col-md-1-1 center"><div
																				class="TextFont">Multiple</div></th>	 -->
																		<th style="height: 21.5px;" class="numeric col-md-3"><div
																				class="TextFont">Total</div></th>	
																		<th style="height: 21.5px;" class="numeric col-md-1"><div
																				class="TextFont"><input type="checkbox" id="opdRefChk" onclick="checkUncheck(this.id,'refChk')"></div></th>								
																	</tr>
																</thead>
															</table>

															<div id="divTestDashVoucharList"
																class="box border col-md-12"
																style="overflow: auto; margin-top: -21px; height: 160px;">

																<table class="table table-striped table-condensed">
																	<tbody id="tableTestVoucharList">

																	</tbody>
																</table>

															</div>
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
				
			<%-- <input type="hidden" id="operation"/>
			<input type="hidden" id="CurrentuserName"  value="<%= session.getAttribute("userName")%>"/>
			<input type="hidden" id="currentUserID"  value="<%= session.getAttribute("userId")%>"/> --%>
			
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