<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ page import="com.hms.admin.util.FetchHospitalDetails"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>IVF Discharge Summary</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<!-- css for developer -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.core.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.default.css" />
	
	
<!-- css for developer -->

<!-- include js for development -->
<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>
<!-- JQUERY -->
<script src="ehat-design/js/jquery/jquery-2.0.3.min.js"></script>
<!-- JQUERY UI-->
<script
	src="ehat-design/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<!-- BOOTSTRAP -->
<script src="ehat-design/bootstrap-dist/js/bootstrap.min.js"></script>
<script type="text/javascript" src="js/Admin.js"></script>
<!-- JQUERY UI-->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/jquery-ui-1.10.3.custom/css/custom-theme/jquery-ui-1.10.3.custom.min.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/css/cloud-admin.css">
<link rel="stylesheet" type="text/css"
	href="ehat-design/css/themes/default.css" id="skin-switcher">
<link rel="stylesheet" type="text/css"
	href="ehat-design/css/responsive.css">
<link href="ehat-design/font-awesome/css/font-awesome.min.css"
	rel="stylesheet">
<!-- DATE RANGE PICKER -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
<!-- SELECT2 -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/select2/select2.min.css" />
<!-- TYPEAHEAD -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/typeahead/typeahead.css" />
<!-- UNIFORM -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/uniform/css/uniform.default.min.css" />
<!-- DATA TABLES -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/datatables/media/css/jquery.dataTables.min.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/datatables/media/assets/css/datatables.min.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/datatables/extras/TableTools/media/css/TableTools.min.css" />

<link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen"></link>
<script type="text/javascript"
	src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link rel="stylesheet" type="text/css"
	href="timepeacker/jquery.datetimepicker.css" />
	
	<!-- bootstrap datepicker new added  js-->
<script src="css/inventoryDatepicker/js/jsDatePick.full.1.3.js"
	type="text/javascript"></script>
<script src="css/inventoryDatepicker/js/jsDatePick.min.1.3.js"
	type="text/javascript"></script>
	
	<!-- bootstrap datepicker new added  csss-->
<link rel="stylesheet" type="text/css"
	href="css/inventoryDatepicker/css/jsDatePick_ltr.css" />
<script src="css/inventoryDatepicker/js/jsDatePick.full.1.3.js"
	type="text/javascript"></script>
	
	<!-- DATE RANGE PICKER -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
<script src="timepeacker/jquery.datetimepicker.js"></script>


<!-- include js for development -->

<script type="text/javascript" src="js/ivf_doctor_desk.js"></script>
<script type="text/javascript" src="js/ivf_autosummary.js"></script>


<!-- <style>
.tabledynamicscroll {
	max-height: 400px;
	overflow: auto;
	scrollbar-width: thin;
} 


</style>-->

<style>
.tableFixHead { 
	overflow-y: auto; 
	height: 400px;
	width: 98%;
 }
.tableFixHead thead th { 
	position: sticky; top: 0; 
	z-index: 100 !important;
}

/* Just common table stuff. Really. */
table  { border-collapse: separate; width: 100%; }
th, td { padding: 8px 16px; }
th     { background:#eee; }
</style>


</head>
<body>
	<c:if test="${ sessionScope.userType != null }">
		<%
			java.util.Calendar currentDate = java.util.Calendar.getInstance();
				java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyy-MM-dd");
				String todays_date = formatter.format(currentDate.getTime());
		%>
		<!-- HEADER -->
		<header class="navbar clearfix navbar-fixed-top" id="header">
			<%@include file="Menu_Header_Nobel.jsp"%>
		</header>
		<!--/HEADER -->

		<!-- PAGE -->
		<section id="page">
			<!-- SIDEBAR -->
					<%@include file="left_menu_ivf.jsp"%>
			
			<!-- /SIDEBAR -->
			<div id="main-content">
				<%-- <input type="hidden" value="<%=request.getParameter("patientId")%>" id="patientId">
				<input type="hidden" value="<%=request.getParameter("treatmentId")%>" id="treatmentId">
				<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
				<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
				<input type="hidden" id="ovamPickUpMasterId" value="0"> --%>
				
				<div class="container">
					<div class="row">
						<div id="content" class="col-lg-12">
							<!-- PAGE HEADER-->
							<div class="row">
								<div class="col-sm-12">
									<div class="page-header">
										<!-- BREADCRUMBS -->
										<ul class="breadcrumb">
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
											<li><a href="ivf_doctor_desk.jsp">IVF Doctor Desk</a></li>
											<li><a></a></li>
										</ul>
										<!-- /BREADCRUMBS -->
									</div>
								</div>
							</div>
							<div class="panel panel-primary">
								<div class="panel-heading">
									<label>IVF Patient Info</label>
								</div>
								
								<div class="panel-body" style="margin-top: 1%;">
									<div class="panel panel-default" style="margin-top: 1%;">

										<div class="panel-body">
											<div class="form-group col-md-12">
												
												<div class="tableFixHead">
												<table class="table table-bordered responsive "
													id="ivfDoctorDeskTabel">
													<thead>
														<tr>
															<th>#</th>
															<th>UHID</th>
															<th>MRN.No.</th>
															<th>Admission Date</th>
															<th>Patient Name</th>
															<th>Age/Gender</th>
															<th>Action</th>
															
														</tr>
													</thead>
													<tbody id="ivfDischargeSummaryTabelBody">
													</tbody>
												</table>
												</div>

											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="footer-tools">
							<span class="go-top"> <i class="fa fa-chevron-up"></i> Top
							</span>
						</div>
					</div>
					<!-- /CONTENT-->
				</div>
			</div>
			<div id="pleaseWait" style="text-align: center; display: none;">
				<img style="margin-top: 250px;" height="43px"
					src="images/loading_black.gif" />
				<div style="margin-top: 10px; color: white">
					<b>Please wait...</b>
				</div>
			</div>
			<%-- <%@include file="footer_nobel.jsp"%> --%>
		</section>
		<!--/PAGE -->

		<!-- JAVASCRIPTS -->

		<script
			src="ehat-design/js/bootstrap-daterangepicker/daterangepicker.min.js"></script>
		<!-- SLIMSCROLL -->
		<script type="text/javascript"
			src="ehat-design/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>

		<!-- BLOCK UI -->
		<script type="text/javascript"
			src="ehat-design/js/jQuery-BlockUI/jquery.blockUI.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/autosize/jquery.autosize.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/select2/select2.min.js"></script>
		<!-- TYPEHEAD -->
		<script type="text/javascript"
			src="ehat-design/js/typeahead/typeahead.min.js"></script>
		<!-- UNIFORM -->
		<script type="text/javascript"
			src="ehat-design/js/uniform/jquery.uniform.min.js"></script>
		<!-- DATA TABLES -->
		<script type="text/javascript"
			src="ehat-design/js/datatables/media/js/jquery.dataTables.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/datatables/media/assets/js/datatables.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/datatables/extras/TableTools/media/js/TableTools.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/datatables/extras/TableTools/media/js/ZeroClipboard.min.js"></script>

		<!-- COOKIE -->
		<script type="text/javascript"
			src="ehat-design/js/jQuery-Cookie/jquery.cookie.min.js"></script>

		<!-- CUSTOM SCRIPT -->
		<script src="ehat-design/js/script.js"></script>

		<script src="auto/jquery.mockjax.js"></script>
		<script src="auto/bootstrap-typeahead.js"></script>
		<!-- CUSTOM SCRIPT -->

		<script>
			jQuery(document).ready(function() {
				App.setPage("wizards_validations"); //Set current page 
				App.init(); //Initialise plugins and elements  
				$(function() {
					$('[data-toggle="tooltip"]').tooltip();
				});
				
				getListIVFRegPatientDTO('dischargeSummary','current');
				
				
			});
		</script>

		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>


