<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Lab Test Patient Worksheet</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">

<!-- css for developer -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.core.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.default.css" />

<!-- include js for development -->
<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>

<link rel="stylesheet" type="text/css" href="css/ehat_general.css">
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher">
<link rel="stylesheet" type="text/css" href="css/responsive.css">
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet"
	media="screen">
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet">
<!-- JQUERY -->
<script src="jquery/jquery-2.1.1.js"></script>
<!-- JQUERY UI-->
<!--calender Files  -->
<script type="text/javascript"
	src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen"></link>
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
<script type="text/javascript"
	src="js/jQuery-BlockUI/jquery.blockUI.min.js"></script>

<!-- for Developers  -->
<script type="text/javascript"
	src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript" src="js/jquery-validate/additional-methods.min.js"></script>
<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>
<script type="text/javascript" src="js/Treatment.js"></script>
<script type="text/javascript" src="js/Pathology.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/ehat_admin.js"></script>
<script type="text/javascript" src="js/labWorksheet.js"></script>
<script type="text/javascript"
	src="<c:url value="/pharmacy/resources/js/app_js/Pharma_Validation.js"/>"></script>
<!-- /for Developers  -->

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<!-- Auto-Suggestion 2/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<script>
	jQuery(document).ready(function() {
		App.setPage("labWorksheet"); //Set current page
		App.init(); //Initialise plugins and elements
		$(function() {
			$('[data-toggle="tooltip"]').tooltip();
		});
	});
	
	/* touheed____FOr loading loop*/
	jQuery(document).ajaxStart(function() {
		//alert("hi ajax start");
		$("body").addClass("loading");
	});

	jQuery(document).ajaxStop(function() {
		$("body").removeClass("loading");
		//alert("hi ajax stop");
	});

</script>

<script type="text/javascript">
	onload = function() {

		$("#dignoMgmt").addClass("anchorActive");
		getLabWorksheetDash('onload', 'labTestworksheet');
		$("#chkTotal").prop("checked", true);
		setCurrentDate();
	}
</script>

<!-- Touheed  for laoding loop-->
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
<body style="background: white ! important;">

	<section id="page">

		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>

		</c:if>
		<c:if test="${sessionScope.userType != null }">


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

				<%@include file="left_menu_pathologyNew.jsp"%>

				<%
					java.util.Calendar currentDate = java.util.Calendar
								.getInstance();
						java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
								"dd-MM-yyyy");
						String todays_date = formatter.format(currentDate.getTime());
				%>
				<div id="main-content">
					<div class="container">
						<div class="row">
							<div id="content" class="col-lg-12">
								<!-- PAGE HEADER-->
								<div class="row">
									<div class="col-sm-12">
										<div class="page-header">

											<ul class="breadcrumb col-md-12-1"
												style="padding: 6px 10px; margin-top: 1px;">
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
												<li><a href="pathology_dashboard.jsp">LIS</a></li>
												<li><a href="labWorksheet.jsp">Lab Worksheet</a></li>
											
											</ul>
										</div>
									</div>
								</div>
								<!-- /Common -->

								<div class="col-md-12-1">
									
									<div class="col-md-1-1">
										<label class="TextFont" style="padding-left: 2%;padding-top:7px;"> From Date :
										<b style="color: red; padding-left: 3px;">*</b></label>
									</div>
									
									<div style="padding-top:3px;width:113px" class="col-md-3-1">
										<input type="text" class="form-control input-SmallText" onclick="displayCalendar(document.getElementById('txtFdate'),'dd/mm/yyyy',this)" readonly="readonly" id="txtFdate">
									</div>
								
									<div class="col-md-1-1">
										<label class="TextFont" style="padding-left: 30%;padding-top:7px;"> To Date :
										<b style="color: red; padding-left: 3px;">*</b></label>
									</div>
								
									<div class="col-md-3-1" style="padding-top:3px;width:111px">
										<input type="text" id="txtTdate"  readonly="readonly" onclick="displayCalendar(document.getElementById('txtTdate'),'dd/mm/yyyy',this)" class="form-control input-SmallText">
									</div>
									
									
									<div class="col-md-2-1">
										<label class="TextFont" style="padding-left: 23%;padding-top:7px;"> From Bill No :</label>
									</div>
									
									<div style="padding-top:3px;width:113px" class="col-md-3-1">
										<input type="text" class="form-control input-SmallText"  id="frmRecNo" 
										onkeypress="return validateNumOnly(event)">
									</div>
								
									<div class="col-md-2-1">
										<label class="TextFont" style="padding-left: 30%;padding-top:7px;"> To Bill No :</label>
									</div>
								
									<div class="col-md-3-1" style="padding-top:3px;width:111px">
										<input type="text" class="form-control input-SmallText" id="toRecNo" 
										onkeypress="return validateNumOnly(event)">
									</div>
									
									<div class="col-md-1-1" style="text-align: center;">
										<input type="button" value="show"
											class="btn btn-xs btn-primary"
											onclick="getLabWorksheetDash('show', 'labTestworksheet')" />
											
											<button onclick='printLabWorksheet();' style='float:right;' data-placement='left' title='Get Report' class='btn btn-xs btn-warning'><i class='fa fa-print'></i></button>
									</div>
								
								</div>
								
								
								<div class="divide-20"></div>

								<div class="panel panel-default" style="margin-top:0px;">
									<div class="panel-body" class="col-md-12-1">

										<!-- ---------------------------__Touheed Code For Previous__(Start)------------------------- -->
										<!-- <form name="mysearchForm"> -->
											<div style="width: 100%; height: 99%;">
												<div id="rightContActual">

													<!-- Start Tab UI -->
													<div class="col-md-12-1"
														style="margin-top: 5px; margin-left: 0px;">
														<!-- Start BOX -->
														<div class="box border col-md-12-1">
															<div class="divide-10"></div>
															<div class="tabbable col-md-12-1">
																<ul class="nav nav-tabs">
																	<li class="active" onclick="getLabWorksheetDash('onload','labTestworksheet');"><a
																		id="ct" data-toggle="tab" href="#CT"
																		style="background-color: #00ff80"> <span
																			class="hidden-inline-mobile"><b><i
																					class="fa fa-book fa-fw"></i>Lab Worksheet</b></span></a></li>
																</ul>
																<div class="tab-content">

																	<div id="CT" class="tab-pane fade in active">
																		
																		<div id="patientcontainer" class=""
																			style="margin-top: 0%; width: 99.80%; height: 450px; overflow-y: scroll; border: 1px solid #ddd;">
																		</div>

																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										<!-- </form> -->

									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<%@include file="Footer.jsp"%>
				<div id="pathologyAllPatInfo" style="display: none;"></div>
				<input type='hidden' id="idPatPrevSelTest" value='0' />
				<div type="hidden" id="CollectedFlag"  value="0"></div>
				<input type="hidden" id="user" value="${sessionScope.userName}" />
				<input type="hidden" id="treatmentId" value="0" />
			</div>
			
			
			<!-- ______Touheed For loading loop____ -->
				<div class="ajaxmodal">
								<!-- Place at bottom of page -->
				</div>
				
		</c:if>

		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>

		</c:if>
	</section>


</body>
</html>
