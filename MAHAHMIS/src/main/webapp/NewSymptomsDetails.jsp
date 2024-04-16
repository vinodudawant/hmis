<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>Symptoms Management</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">

<link rel="stylesheet" type="text/css" href="js/datePicker.css" />
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
<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/patient_management.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/jquery.datePicker-min.js"></script>

<!-- /for Developers  -->
<script type="text/javascript"
	src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen"></link>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<script>
	jQuery(document).ready(function() {
		App.setPage("HospitalHoliday"); //Set current page
		App.init(); //Initialise plugins and elements
		$(function () {
			  $('[data-toggle="tooltip"]').tooltip();
		})
	});
</script>

<script type="text/javascript">
	onload = function() {
		$("#txtTempName").val("");
		fetchDoctorSpecilizations1();
	};
</script>
</head>

<body style="background: white ! important;">
	<section id="page">
		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>
		</c:if>
		<c:if test="${sessionScope.userType != null }">

			<div id="outer" class="container-main" style="width: 100%;">
				<!-- HEADER -->
				<header class="navbar clearfix" id="header">
					<%@include file="Menu_Header.jsp"%>
				</header>
				<!--/HEADER -->

				<%@include file="left_menu_admin.jsp"%>
			<div class="panel-body">
			<div id="main-content">
					<div class="container">
						<div class="row">
							<div id="content" class="col-lg-12">
								<!-- PAGE HEADER-->
								<div class="row">
									<div class="col-sm-12">
										<div class="page-header" style="margin-top:0%;">

											<ul class="breadcrumb col-md-12-1"
												style="padding: 4px 10px; margin-top: 1px;">
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
												<li><a href="UserManagement.jsp">Administrator</a></li>
												<li><a href="UserManagement.jsp">Administrator</a></li>
												<li><a href="NewPatientTitle.jsp">Patient Management</a></li>
												<li>Symptoms Details</li>
												<div class="pull-right">
													<button class="btn btn-xs btn-success editUserAccess" 
													data-toggle="tooltip" data-placement="left" title="Save symptom details"
													onclick="saveSymDetail()" name="saveButton"><!-- onclick="saveSymDetail()" disabled="disabled" name="saveButton"> -->	
													<i class="fa fa-save"></i>
													</button>
												</div>
											</ul>
										</div>
									</div>
								</div>
								<!-- /Common -->	

						<div style="width: 50%;">
							<h3 style="margin-top: 0px;">Symptoms Management</h3>
										</div>
						<div class="panel panel-default">
							<div class="panel-body" class="col-md-12-1">
								<div class="form-group col-md-3">
								<label for="inputEmail4">Select Specialization :</label> 
									<select onchange="fetchSymptoms()" id="selName" name="selName"  style="width: 100%;">
										<option value="0">--Select--</option>
									</select>
								</div>
								<div class='col-sm-12-1'>
									<table class='table table-bordered' style='margin-top: 20px;width:98.8%;'>
										<thead>
											<tr>
												<th class='col-md-1-1 center' style='height: 21.5px;'><label
														class='TextFont'>#</label></th>
												<th class='col-md-7-1 center' style='height: 21.5px;'><label
														class='TextFont'>Symptoms Name</label></th>
												<th class='col-md-2-1 center' style='height: 21.5px;'><input
														type="button" onclick="createDivSym()" value="+"
														id="btnAdd" class="editUserAccess" disabled="disabled"/> <input type="button"
														onclick="deleteSymptomDetail()" value="-" class="editUserAccess" disabled="disabled"/></th>
												</tr>
											</thead>
										</table>
									</div>

									<div class="col-md-12-1"
										style="margin-top: -21px; overflow-y: scroll; height: 250px; max-height: auto;border: 1px solid #ddd">
										<table class="table table-bordered table-condensed">
											<tbody id='divSym'>
											</tbody>
										</table>
									</div>
									<input type="hidden" value='0' id='addRowCount' /><input
										type="hidden" value='0' id='RowCount' />
								</div>
							</div>
							</div>
						</div>
						</div>
						</div>
						</div>
					</div>

			<%@include file="Footer.jsp"%>
	</c:if>

	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>

	</c:if>
	</section>
</body>
</html>
