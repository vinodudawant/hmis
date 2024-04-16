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
<title>Bill Estimate Report</title>

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
<!-- <script type="text/javascript" src="js/hisab/hisab.js"></script> -->
<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript" src="js/jquery-validate/additional-methods.min.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<!-- <script type="text/javascript" src="js/Admin.js"></script>
<script type="text/javascript" src="js/bill.js"></script>
<script type="text/javascript" src="js/billNoble.js"></script> -->
<!-- <script type="text/javascript" src="js/registration.js"></script>
<script src="js/chargesMasterSlave.js"></script> -->
<script type="text/javascript" src="js/ehat_billing.js"></script>
<script type="text/javascript" src="js/finance.js"></script>

<!-- /for Developers  -->

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<script type="text/javascript">
	onload = function() {
		//loadTestType();
		/* getServicesOnBilling();
		getFinaceDetails('hisab',1);
		getAllChargesl();
		getBankMasterList(); */ 
		getBillEstimateReport();		
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
											<li><a href="ehat_admission_report.jsp">Sourcewise Bill Register Report</a></li>
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
<button id="btnPrint12" class="btn btn-xs btn-warning"
													value="" onclick="receiptBillPrintSourceWisePdfPrint()" title="" 
													data-toggle="tooltip" data-original-title="Print">Print</button>
						

												<button id="btnPrint" class="btn btn-xs btn-warning"
													value="" onclick="" title="" data-placement="left"
													data-toggle="tooltip" data-original-title="Print">Export
													To Excel</button> <script type="text/javascript">
														$("[id$=btnPrint]").click(function(e) {
																		
															window.open('data:application/vnd.ms-excel,'+ encodeURIComponent($('div[id$=diveMain]').html()));
															e.preventDefault();
														});
														
														
														function receiptBillPrintSourceWisePdfPrint(){

															
															
															var source = parseInt($("#sourceType").val());	
															if(source == 0 || isNaN(source)){
																source=0;
															}
															var sponsorId=0;															
															//For Hall Wise Id  
															var sponsorF = $("#lisH0").val();// chargesId
															var sponsorL = 0;// static chargesSlaveId
															var liSizeHall = $("#dynamicItemsinfo li").length;
															sponsorL = $("#lisH" + (liSizeHall - 1)).val();
															
															if(sponsorF=="" || sponsorF==null || sponsorF==""){
																
																sponsorF=0;
															}
															
															if(sponsorL=="" || sponsorL==null || sponsorL==""){
																
																sponsorL=0;
															}
															
															
															var userId = parseInt($("#userId").val());	
															var unitId = parseInt($("#unitId").val()); 	
															var fromDate=$("#fromDate").val();
															var toDate = $("#lastDate").val();
															
															window.open("ehat_billreg_sourcewise_receipt.jsp?unitId="+unitId+"&userId="+userId+
																	"&fromDate="+fromDate+"&toDate="+toDate+
																	"&source="+source+"&sponsorId="+sponsorId+
																	"&sponsorF="+sponsorF+"&sponsorL="+sponsorL);
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
										
										<!-- <div class="col-md-5" style="margin-top: 2px">
										
											 <div class="col-md-6">
												<div class="col-md-3">
													<label>Source</label>
												</div>
												<div class="col-md-9">
													<select id="sourceType" name="sourceType" onchange="setSponser('ehat_patient')" class="form-control input-SmallText">
														<option value="-1">All</option>
														<option value="0">Self</option>
														<option value="1">Sponsor</option>													
													</select>
												</div>
											</div>
											
											<div class="col-md-6 TextFont" id="sponserselect" style="display: none;">
																																						
												<div class="form-group col-md-12"> 
													<div class="form-group"> 
														<div class="col-md-12">  
															<select class="col-md-8" name="listmstr" id="listmstr_select_chargesinfo" 
																style="width: 150px" 
																onchange="setDyanamicDivForChargesinfo('dynamicItemsinfo',this.id)"> 
																<option id="firstElmts2">--- Select Charges Info ---</option> 
															</select> 
															<div class="col-md-12 select2-container select2-container-multi " 
																style="margin-top: 2%; width: 150px"> 
																<ul id="dynamicItemsinfo" class="select2-choices" 
																	style="overflow-y: scroll; min-height: 30px"> 
																</ul>
															</div> 
														</div>
														
													</div> 
												</div>														
												
											</div>
											
											<div class="col-md-3">
												<div class="col-md-2">
													<label>To</label>
												</div>
												<div class="col-md-10">
													<select id="sourceType" name="sourceType" onchange="setSponser('ehat_patient')" class="form-control input-SmallText">
														<option value="-1">All</option>
														<option value="0">Self</option>
														<option value="1">Sponsor</option>													
													</select>
												</div>
											</div>
											
											<div class="col-md-9">
												<div id="sponserselectDiv" class="form-group">
													<label class="control-label col-md-4">Source Name</label>
													<div class="col-md-8" id="sponserselect">
														<select name="country" id="sponsor_select"
															class="col-md-12 full-width-fix" onchange="updateChargesMasterSlave(this.value),fetchSuperCatogoiresSlave(this.value)">
															<option value=""></option>
															<option value="20">Sponser1</option>
															<option value="AL">Sponser2</option>
															<option value="DZ">Sponser3</option>

														</select>

														<div  id="dynamicItemDiv"style="margin-top: 2%; width: 100%"
															class="col-md-12 select2-container select2-container-multi ">
															<ul
																style="overflow-y: scroll; min-height: 70px"
																class="select2-choices" id="dynamicItem"></ul>
														</div>
													</div>
												</div>
											</div>										
										
										</div> -->

										<div class="col-md-1" style="margin-top: 2px">
											<input type="button" onclick="getPatientTypeWiseIpdBill();"
												class="btn btn-primary" value="Show">
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

													<div id="divLine2" class=" box border col-md-12" style="overflow: auto;">
														<form class="form-horizontal col-md-12"
															style="margin-top: 10px">

															<!-- <div class="divide-20"></div> -->
															<div class="col-md-12">
																<label> <i class="fa fa-arrow-down"></i>Patient Details :
																</label>
															</div>
															<br>
															
															<div style="width: 1500px;">													
																<table class="datatable table table-bordered table-striped table-condensed cf" id="hisabTbl"
																	style="background: Scrollbar; border-bottom: 1px solid black; border-top: 1px solid black;">
																	<thead class="cf">
																		<tr>
																			<th style="height: 21.5px;width: 5%">Sr No</th>
																			<th style="height: 21.5px;width: 7%">Bill No</th>			
																			<th style="height: 21.5px;width: 7%">Estimate No</th>	
																			<th style="height: 21.5px;width: 7%">Ipd No</th>																		
																			<th style="height: 21.5px;width: 20%">Patient Name</th>					
																			<th style="height: 21.5px;width: 12%">Diagnosis</th>																			
																			<th style="height: 21.5px;width: 6%">D.O.A.</th>	
																			<th style="height: 21.5px;width: 6%">D.O.D.</th>		
																			<th style="height: 21.5px;width: 10%">Estimate For 2 Days</th>	
																			<th style="height: 21.5px;width: 10%">Actual Bill For 2 Days</th>	
																			<th style="height: 21.5px;width: 10%">Difference in %</th>																																																																					
																		</tr>
																	</thead>
																	
																	<!-- <tbody id="container">
	
																	</tbody> -->
																</table>
															</div>
														
															<div
																style="overflow: auto; margin-top: -21px; height: 350px;width: 1500px"
																class="col-md-12-1 box border">
																<table class="table table-bordered table-striped table-condensed cf">
																	<tbody id="container">

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