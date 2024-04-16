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
<title>Pro-fees Finance</title>

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
<link rel="stylesheet" type="text/css" href="css/jquery-ui-1.10.3.custom.min.css" />
<!-- Auto-Suggestion 16/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>
	
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
		//loadTestType(); 
		getServicesOnBilling();
		//getFinaceDetails('hisab',3);
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
											<li><i class="fa fa-home"></i> <a href="ehat_finance_dashboard.jsp">Finance</a>
											</li>
											<li><a href="hisabProFees.jsp">Pro-fees Finance</a></li>
											<li class="pull-right">

												<button id="btnPrint" class="btn btn-xs btn-warning"
													value="" onclick="" title=""
													data-placement="left" data-toggle="tooltip"
													data-original-title="Print">Export To Excel</button>
													
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
														    link.download = "Pro-fees Finance.xls";
														    link.href = result;
														    link.click();
														});											
												</script>	
																								
											</li>
										</ul>
										<!-- /BREADCRUMBS -->
										<div class="clearfix">
											<h3 class="content-title pull-left">Fixed Header & Sidebar</h3>
										</div>
										<div class="description">Fixed Header & Sidebar Layout</div>
									</div>
								</div>
							</div>
							<!-- /PAGE HEADER -->
							
							<div class="panel panel-default">

								<div class="panel-body">

									<div class="col-md-12">
										
										<div class="col-md-3" style="margin-top: 2px">
											<div class="col-md-2">
												<label>From</label>
											</div>
											<div class="col-md-10">
												<input id="fromDate" class="form-control input-SmallText" type="text" onchange=""
													onclick="displayCalendar(document.getElementById('fromDate'),'dd/mm/yyyy',this)"
													readonly="readonly" name="date" placeholder="Date" value="<%=todays_date%>">
											</div>
										</div>

										<div class="col-md-3" style="margin-top: 2px">
											<div class="col-md-2">
						 						<label>To</label>
											</div>
											<div class="col-md-10">
												<input id="toDate" class="form-control input-SmallText" type="text" onchange="validateDateToCloseHisab()"
													onclick="displayCalendar(document.getElementById('toDate'),'dd/mm/yyyy',this)"
													readonly="readonly" name="date" placeholder="Date" value="<%=todays_date%>">
											</div>
										</div>

										<div class="col-md-3" style="margin-top: 2px">
											<div class="col-md-2">
												<label>Doctor</label>
											</div>
											<div class="col-md-10">
												<input type="text" onkeyup="setAutoSugForDoctorList(this.id,'profees')" class="form-control input-SmallText" id="byName">
												<input type="hidden" id="drId" value="0">
											</div>										
										</div>
										
										<div class="col-sm-2">
										<!-- <div class="col-md-2"><label>Pay Mode</label></div> -->
										<!-- <div class="col-md-12"> -->
											<select class="form-control input-SmallText" id="deptId">
												<option value="0">--- Select Department ----</option>
												<option value="1">opd</option>
												<option value="2">diagnosis</option>
												<option value="3">Ipd</option>											
											</select>
										<!-- </div> -->
										</div>

										<div class="col-md-1" style="margin-top: 2px">
											<input type="button" onclick="fetchProFeesHisab()" class="btn btn-primary" value="Show">
										</div>

										<div class="divide-20"></div>
									</div>

									<div class="col-md-12">

										<div class="col-md-3" style="margin-top: 2px">
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
										
										<div class="col-md-3" style="margin-top: 2px">
											<div class="col-md-2">
												<label>Pmode</label>
											</div>
											<div class="col-md-10">
												<select class="form-control" id="payMode">
													<option value="0">All</option>
													<option value="1">Cash</option>
													<option value="2">Card</option>
													<option value="3">Cheque</option>
												</select>
											</div>										
										</div>

										<!-- <div class="col-md-4" style="margin-top: 10px">

											<div class="col-sm-3">
												<label class="radio-inline">Consolodated <input
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

										</div> -->		
										
										<div class="col-md-6" style="margin-top: 10px">

											<div class="col-sm-12">
												<label>From-To Range
												<input type="checkbox" name="billType" id="chkFromTo">
												</label>
											</div>

											<!-- <div class="col-sm-2">
												<label class="radio-inline">bill <input type="radio"
													name="billType" id="bill" value="2">
												</label>
											</div>

											<div class="col-sm-2">
												<label class="radio-inline">Dues <input type="radio"
													name="billType" id="dues" value="3">
												</label>
											</div> -->

										</div>
																		
									</div>
								</div>								
							</div>
							
							<div class="divide-10"></div>					

							<div class="panel panel-default">
								<div class="panel-body">

									<div id="diveMain" class="col-md-12" style="margin-top: 5px">
									
										<div id="divLine4" class="box border col-md-12">
												<!-- <div class="divide-20"></div> -->
												<form class="form-horizontal col-md-12" style="margin-top:10px">
												<div class="col-md-12">
													<label> <i class="fa fa-arrow-down"></i> Finance Summary
													</label>
												</div>
												<br>

												<table class="table table-condensed col-md-12" id="totTbl"
													style="background: Scrollbar; border-bottom: 1px solid black;border-top: 1px solid black;">
													<thead>

														<tr>
															<th class="col-md-3 center">
																<div class="TextFont">Total PF Paid</div>
															</th>
															<th class="col-md-3 center">
																<div class="TextFont">Total Fixed Income</div>
															</th>
															<th class="col-md-3 center">
																<div class="TextFont">Total Final PF</div>
															</th>															
														</tr>

													</thead>
												</table>
												
												<div id="divTestDashVouchar" class="box border col-md-12"
													style="margin-top: -21px;">

													<table class="table table-striped table-condensed">
														<tbody id="tableTestVouchar">
																														
															  <tr>
																 <th class="col-md-3 center">
																	<div class="TextFont" id="pfTot">0</div>
																 </th>
																 <th class="col-md-3 center">
																	<div class="TextFont" id="hospTot">0</div>
																 </th>
																 <th class="col-md-3 center">
																	<div class="TextFont" id="pfPaidTot">0</div>
																 </th>
																
															 </tr>
															
														</tbody>
													</table>
												</div>
											</form>
										</div>
									

										<div id="divLine2" class=" box border col-md-12">
											<form class="form-horizontal col-md-12" style="margin-top:10px">

												<!-- <div class="divide-20"></div> -->
												<div class="col-md-12">
													<label> <i class="fa fa-arrow-down"></i>Finance
														Receipt Details :
													</label>
												</div>
												<br>

												<table class="datatable table table-bordered table-striped table-condensed cf" id="hisabTbl"
													   style="background: Scrollbar; border-bottom: 1px solid black;border-top: 1px solid black;">
													<thead class="cf">
														<tr>
															<th style="height: 21.5px;" class="col-md-1 center"><div
																	class="TextFont">#</div></th>															
															<th style="height: 21.5px;" class="numeric col-md-3"><div
																	class="TextFont">Name of Doctor</div></th>										
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
															<!-- <th style="height: 21.5px;" class="numeric col-md-2"><div
																	class="TextFont">PF Amount</div></th>	
															<th style="height: 21.5px;" class="numeric col-md-2"><div
																	class="TextFont">Hosp Amount</div></th> -->	
															<th style="height: 21.5px;" class="numeric col-md-2"><div
																	class="TextFont">PF Paid</div></th>																		
															<th style="height: 21.5px;" class="numeric col-md-3"><div
																	class="TextFont">Fixed Income</div></th>	
															<th style="height: 21.5px;" class="numeric col-md-2"><div
																	class="TextFont">Final PF</div></th>	
															<th style="height: 21.5px;" class="numeric col-md-1"><div
																	class="TextFont"><input type="checkbox" id="dignoRecChk" onclick="checkUncheck(this.id,'recChk')"></div></th>								
														</tr>
													</thead>
												</table>

												<div id="divTestDash" class="box border col-md-12"
													style="overflow-y: scroll; margin-top: -21px; height: 250px; overflow: auto;">

													<table class="table table-striped table-condensed" id="tblProfees">
														<tbody id="tableTestDash">

														</tbody>
													</table>
												</div>
												
											</form>
										</div>

										<!-- <div id="divLine3" class=" box border col-md-12">
											<form class="form-horizontal col-md-12" style="margin-top:10px">
												<div class="divide-20"></div>
												<div class="col-md-12">
													<label> <i class="fa fa-arrow-down"></i> Finance
														Refund Details :
													</label>
												</div>
												<br>

												<table class="table table-condensed col-md-12"
													style="background: Scrollbar; border-bottom: 1px solid black;border-top: 1px solid black;">
													<thead class="cf">
														<tr>
															<th style="height: 21.5px;" class="col-md-1 center"><div
																	class="TextFont">#</div></th>
															<th style="height: 21.5px;" class="col-md-1 center"><div
																	class="TextFont">Patient Id</div></th>
															<th style="height: 21.5px;" class="numeric col-md-5"><div
																	class="TextFont">Patient Name</div></th>										
															<th style="height: 21.5px;" class="col-md-1-1 center"><div
																	class="TextFont">Cash</div></th>
															<th style="height: 21.5px;" class="col-md-1-1 center"><div
																	class="TextFont">Card</div></th>
															<th style="height: 21.5px;" class="col-md-1-1 center"><div
																	class="TextFont">Cheque</div></th>
															<th style="height: 21.5px;" class="col-md-1-1 center"><div
																	class="TextFont">Common Adv</div></th>
															<th style="height: 21.5px;" class="numeric col-md-1-1 center"><div
																	class="TextFont">Multiple</div></th>	
															<th style="height: 21.5px;" class="numeric col-md-3"><div
																	class="TextFont">Total</div></th>	
															<th style="height: 21.5px;" class="numeric col-md-1"><div
																	class="TextFont"><input type="checkbox" id="dignoRefChk" onclick="checkUncheck(this.id,'refChk')"></div></th>								
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
										</div> -->										
										
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
				<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
				<input type="hidden" id="operation"/>
				<input type="hidden" id="CurrentuserName"  value="<%= session.getAttribute("userName")%>"/>
				<input type="hidden" id="currentUserID"  value="<%= session.getAttribute("userId")%>"/>
				
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