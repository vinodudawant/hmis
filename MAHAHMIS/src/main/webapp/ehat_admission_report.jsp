
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
<title>Admission Report</title>

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
	
	<link rel="stylesheet" type="text/css" href="ehat-design/js/datatables/media/css/jquery.dataTables.min.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/js/datatables/media/assets/css/datatables.min.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/js/datatables/extras/TableTools/media/css/TableTools.min.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/modal/css/component.css" />
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
	<script type="text/javascript" src="js/demoConfiguration2.js"></script>

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
		getPatientData();
		getAllChargesMaster();
		$('#listmstr_select_service').select2();
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
.loading {
	overflow: hidden;
	/* background-color: red; */
	background: rgba(255, 255, 255, .8)
		url('images/ajax_loader_blue_64.gif') 50% 50% no-repeat;
	z-index: 1000;
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
		ResourceBundle resourceBundle = ResourceBundle.getBundle("Ehat");   
		String meeshaFlow = resourceBundle.getObject("meesha").toString();
	
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
												href="">Finance</a></li>
											<li><a href="ehat_admission_report.jsp">Admission Report</a></li>
											<li class="pull-right">

												<button id="btnPrint" class="btn btn-xs btn-warning"
													value="" onclick="" title="" data-placement="left"
													data-toggle="tooltip" data-original-title="Print">Export
													To Excel</button>
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
															        //'width': '100px', // Adjust width as per your requirement
															        	 'text-align': 'center',
															        	 'vertical-align': 'middle'
															    });
															    var result = 'data:application/vnd.ms-excel,' + encodeURIComponent(clonedContent.html());
															    var link = document.createElement("a");
															    document.body.appendChild(link);
															    link.download = "Reg/Admission Report.xls";
															    link.href = result;
															    link.click();
															});
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
											<div class="col-md-9">
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
											<div class="col-md-9">
												<input id="lastDate" class="form-control input-SmallText"
													type="text"
													onclick="displayCalendar(document.getElementById('lastDate'),'dd/mm/yyyy',this)"
													readonly="readonly" name="date" placeholder="Date"
													value="<%=todays_date%>">
											</div>
										</div>
										
										<div class="col-md-4" style="margin-top: 2px">
											<div  class="col-md-2" style="float:left;">
												<label>Dept</label>
											</div>
											<div  class="col-md-6" style="float:left;">
												<select id="deptId" class="form-control input-SmallText">
									 				<option value="0">All</option>
									 				<option value="1">Opd</option>
									 				<option value="2">Ipd</option>
									 				<option value="3">Diagnostics</option>
									 			</select>
											</div>
										</div>
												
												
										<div id="" class="form-group Remove-Padding col-md-12-1"
																style="margin-left: 61%; height: 47px; width: 27%;">

																<div class="form-group">
																	<div class="col-md-8">
																		<select name="listmstr" id="listmstr_select_service"
																			style="width: 184px;margin-top: -41px;"
																			onchange="setDyanamicDivForCharges('dynamicItems',this.id)">
																			<option id="firstElmts" value="0">--- Select Scheme
																				---</option>
																		</select>
																		
																	</div>
																</div>

																<div
																	class="col-md-9 select2-container select2-container-multi "
																	style="margin-top: 2%;">
																	<ul id="dynamicItems" class="select2-choices"
																		style="overflow-y: scroll; min-height: 55px;">

																	</ul>
																</div>
															</div>									

										<div class="col-md-1" style="margin-top: 2px">
											<input type="button" onclick="getPatientData();"
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

													<div id="divLine2" class=" table table-condensed table-bordered table-responsive table-striped" style="overflow: auto;height: 450px;">
														<form class="form-horizontal col-md-12"
															style="margin-top: 10px">

															<!-- <div class="divide-20"></div> -->
															<div class="col-md-12">
																<label> <i class="fa fa-arrow-down"></i>Patient Details :
																</label>
															</div>
															<br>
															
															<div class ="dynamicstructurescroll" style="width: 1700px;">													
															
																<table class="table table-condensed table-bordered table-responsive table-striped" id="hisabTbl"
																	style="background: Scrollbar; border-bottom: 1px solid black; border-top: 1px solid black;">
																	<thead class="cf"  id="containerHeader">
																	</thead>
																	<!-- <tbody id="containerHeader">

																	</tbody> -->
																	<tbody id="container">

																	</tbody>
																	</table>
															</div>
														
															<!-- <div
																style="overflow: auto; margin-top: -21px; height: 350px;width: 1200px"
																class="col-md-12-1 box border">
																<table class="table table-bordered table-condensed cf">
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
				<div id="pleaseWait" style="text-align: center; display: none;">
			<img style="margin-top: 250px;" height="43px"
				src="images/loading_black.gif" />
			<div style="margin-top: 10px; color: white">
				<b>Please wait...</b>
			</div>
		</div>

				<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
				<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
				<input type="hidden" id="operation" />
				<input type="hidden" id="CurrentuserName" value="<%=session.getAttribute("userName")%>" />
				<input type="hidden" id="currentUserID" value="<%= session.getAttribute("userId")%>" />
				<input type="hidden" id="meeshaFlow" value='<%=meeshaFlow%>'>
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