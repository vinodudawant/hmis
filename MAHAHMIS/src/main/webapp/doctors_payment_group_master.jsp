<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Group Master</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
<meta name="description" content="" />
<meta name="author" content="" />
<meta name="viewport" content="user-scalable=no, width=device-width" />

<link rel="stylesheet" type="text/css" href="css/ehat_general.css" />
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher" />
<link rel="stylesheet" type="text/css" href="css/responsive.css" />
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet"
	media="screen" />
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" />

<link rel="stylesheet" type="text/css"
	href="css/jquery-ui-1.10.3.custom.min.css" />

<!-- JQUERY -->
<script type="text/javascript" src="jquery/jquery-2.1.1.js"></script>
<!-- JQUERY UI-->
<script type="text/javascript"
	src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<!-- BOOTSTRAP -->
<script type="text/javascript" src="bootstrap-dist/js/bootstrap.min.js"></script>
<script type="text/javascript" src="bootstrap-dist/js/bootstrap.js"></script>
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
<script type="text/javascript" src="js/CommonTemplate.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/additional-methods.min.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/professionalFees.js"></script>
<script type="text/javascript" src="js/profees.js"></script>
<script type="text/javascript" src="js/profeesAdvance.js"></script>

<!-- /for Developers  -->

<!-- Auto-Suggestion 7/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<script src="js/UserAccess.js"></script>

<script>
	jQuery(document).ready(function() {
		App.setPage("PercentMaster"); //Set current page
		App.init(); //Initialise plugins and elements
		$(function() {
			$('[data-toggle="tooltip"]').tooltip();
		});

		//auto-suggestion in house doctors list
		setAutoSuggestDocName("doctorName", "onload", "proFees");

		fetchGroupMasterList("onload");
		//getAllRecords1();
		//fetch all units and set on unitId 

		//getAllDeptForDrPer();
		//getAllServicesForDrPer();
		//getDoctorsListForDrPer();
		getAllUnitForProfees();
		fetchDeptAndServices();
		fetchPercentRecords("onload");

	});
</script>
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

				<%@include file="ehat_finance_leftmenu.jsp"%>
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
												style="padding: 4px 10px; margin-top: 1px;">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
												</li>
												<li><a href="hisabDiagnostics.jsp">Finance</a></li>
												<li><a href="doctors_payment_group_master.jsp">Group
														Master</a></li>

												<div class="pull-right">
													<button class="btn btn-xs btn-success editUserAccess"
														id="saveBtn" value="Save Now" data-toggle="tooltip"
														data-placement="left" title="Save Module"
														onclick="saveGroupDetails1()">
														<i class="fa fa-save"></i>
													</button>
													<button class="btn btn-xs btn-danger" data-toggle="tooltip"
														data-placement="left" title="Refresh"
														onclick="resetGroupMaster()">
														<i class="fa fa-refresh"></i>
													</button>
												</div>
											</ul>

										</div>
									</div>
								</div>
								<!-- /Common -->
								<div class="panel panel-default col-md-6" style="min-height: 200px;width: 49%">
									<div class="panel-body ">
										<div class="row">
											<div class="col-md-6">
												<label><b>Group Id<span style="color: red;">*</span></b></label>
												<input type="text" id="groupId" readonly="readonly"
													placeholder="Group Id"
													style="width: 100%;" value="0">
											</div>
											<div class="col-md-6">
												<label><b>Group Name<span style="color: red;">*</span></b></label>
												<input type="text" id="groupName" 
													placeholder="Group Name" style="width: 100%;">
											</div>
										</div>
										 <div class="divide-20"></div>
										<div class="row">

											<div class="col-md-6">
												<label><b>Equal %<span style="color: red;">*</span></b></label>
												<input type="text" id="equalPercent"
													placeholder="Equal %"
													style="width: 100%;" value="0">
											</div>
											<div class="col-md-6">
												<label><b>Individual %<span style="color: red;">*</span></b></label>
												<input type="text" id="individualPercent"
													placeholder="Individual %"
													style="width: 100%;" value="0">
											</div>
										</div>
									</div>

								</div>
								
								
								<div class="panel panel-default col-md-6" style="min-height: 200px;margin-left: 2px">
								
									<div class="panel-body">
										<div class="row">
											<div class="col-md-3">
												<label><b>Doctor Id<span style="color: red;">*</span></b></label>
												<input type="text" id="txtDoctorId" readonly="readonly"
													placeholder="Doctor Id"  
													style="width: 100%;" value="0">
											</div>
											<div id="divbyName" class="col-md-4">
												<label><b>Doctor Name<span style="color: red;">*</span></b></label>
												<input type="text" class="typeahead form-control input-SmallText" id="doctorName"
													onkeyup ="setAutoSuggestDocName('doctorName','onload','proFees')"
													placeholder="Doctor Name" style="width: 100%;">
											</div>
											<div class="col-md-3">
												<label><b>Doctor %<span style="color: red;">*</span></b></label>
												<input type="text" id="doctorPercent"
													placeholder="0.00" maxlength="5"
													style="width: 100%;">
											</div>
											<div class="col-md-2">
												<button class="btn btn-xs btn-success" id="addBtn"
													value="Add Doctor" data-toggle="tooltip"
													data-placement="right" title="Add Doctor"
													onclick="addDoctorsInList()"
													style="width: 100%; margin-top: 35%;">ADD</button>
											</div>
										</div>
										<div class="divide-20"></div>
										<div class="row">
											<div class="panel panel-default col-md-12" style="max-height: 105px;overflow: auto;">
												<div class="panel-body">
												<table>
													<thead id="addDoctorThead">
														<th class="col-md-1">Sr.No</th>
														<th class="col-md-1">Dr.Id</th>
														<th class="col-md-6">Doctor Name</th>
														<th class="col-md-2">Percent</th>
														<th class="col-md-2">Delete</th>
														
													</thead>
													<tbody id="addDoctorTbody"></tbody>
												</table>
												</div>
											</div>
										</div>
									</div>
								</div>
								
								
								<div class="col-md-1-1">
								
										<label class="TextFont">Group
											Name:</label>
									</div>
								<div id="divbyName" class="col-md-2-1 TextFont">
										<input type="text" onkeyup="fetchGroupMasterList('search')" class="typeahead form-control input-SmallText ui-autocomplete-input" id="byName3" name="byName3" autocomplete="off">
									</div>
									
								
								<div class="panel panel-default col-md-12" style="top:20px;min-height: 250px">
								
									<div class="panel-body">
									<div class="col-md-12">
										<table>
											<thead id="fetchGroupListHead">
												<th class="col-md-1">Sr.No</th>
												<th class="col-md-1">Group.Id</th>
												<th class="col-md-6">Group Name</th>
												<th class="col-md-2">Equal %</th>
												<th class="col-md-2">Individual %</th>
												<th class="col-md-2">Edit</th>
												<th class="col-md-2">Delete</th>

											</thead>
											<tbody id="fetchGroupListBody"></tbody>
										</table>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<input type="hidden" value="insert" id="callFrom" />
			<!-- //added by kishor -->
			<table id='tktG' class='table table-hover' style="display:none;">
			<table id='Doctor_ID' class='table table-hover' style="display:none;">
					<tbody id="tkbG">
					</tbody>
			</table>
		</c:if>
	</section>
	<%@include file="Footer.jsp"%>
</body>
</html>