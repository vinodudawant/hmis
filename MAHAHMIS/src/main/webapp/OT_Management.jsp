<!DOCTYPE html>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Team Management</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">

<link rel="stylesheet" type="text/css" href="css/ehat_general.css">
<link rel="stylesheet" type="text/css" href="css/default.css" id="skin-switcher">
<link rel="stylesheet" type="text/css" href="css/responsive.css">
<link rel="stylesheet" type="text/css" href="bootstrap-dist/css/bootstrap.min.css" media="screen">
<link rel="stylesheet" type="text/css" href="font-awesome/css/font-awesome.min.css">
<link rel="stylesheet" type="text/css" href="css/jquery-ui-1.10.3.custom.min.css" />
<!-- for alert -->
<link href="ehat-design/alertify/alertify.core.css" type="text/css"
	rel="stylesheet">
<link href="ehat-design/alertify/alertify.default.css" type="text/css"
	rel="stylesheet">

<!-- for alert  -->

<script src="ehat-design/alertify/alertify.js" type="text/javascript"></script>
<!-- JQUERY -->
<script type="text/javascript" src="jquery/jquery-2.1.1.js"></script>
<script type="text/javascript" src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="js/operation.js"></script>
<script type="text/javascript" src="js/validate.js" ></script>
<script type="text/javascript" src="bootstrap-dist/js/bootstrap.min.js"></script>
<script type="text/javascript" src="bootstrap-dist/js/bootstrap.js"></script>
<script type="text/javascript" src="js/Admin.js"></script>

<!-- UNIFORM -->
<script type="text/javascript" src="js/uniform/jquery.uniform.min.js"></script>

<!-- SLIMSCROLL -->
<script type="text/javascript" src="js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
<script type="text/javascript" src="js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
<!-- BLOCK UI -->
<script type="text/javascript" src="js/jQuery-BlockUI/jquery.blockUI.min.js"></script>
<!-- DATA TABLES -->
<script type="text/javascript" src="js/datatables/media/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="js/datatables/extras/TableTools/media/js/TableTools.min.js"></script>
<script type="text/javascript" src="js/datatables/extras/TableTools/media/js/ZeroClipboard.min.js"></script>
<!-- FULL CALENDAR -->
<script type="text/javascript" src="js/fullcalendar/fullcalendar.min.js"></script>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script> 
	
<!-- AUTOSUGGESTION -->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<script type="text/javascript">
	jQuery(document).ready(function() {
		App.setPage("OT_Management"); //Set current page
		App.init(); //Initialise plugins and elements
		
		$(function () {
			  $('[data-toggle="tooltip"]').tooltip();
		})

		defaultViewUser('OTManagement');
		fetchOperationTeamList('OTManagement');
		setAutoDoctorNameForTeamMember("userName","onload");
	});
</script>
<script type="text/javascript">
	onload = function() {
		
	}
</script>
</head>
<%
	Calendar currentDate = Calendar.getInstance();
	SimpleDateFormat dateformatter = new SimpleDateFormat("dd-MM-yyyy");
	String todays_date = dateformatter.format(currentDate.getTime());
%>


<body style="background: white ! important;">

	<section id="page">
		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>
		</c:if>
		<c:if test="${ sessionScope.userType != null }">

			<div id="outer" class="container-main" style="width: 100%;">
				<!-- HEADER -->
				<header class="navbar clearfix" id="header">
					<%@include file="Menu_Header.jsp"%>
				</header>
				<!--/HEADER -->

				<!--Start Left Menu -->
				<%@include file="left_menu_otmanagement.jsp"%>
				<!--End Left Menu -->
				
				<div id="main-content">
					<div class="container">
						<div class="row">
							<div id="content" class="col-lg-12">

								<!-- Page Date Print Discards-->
								<div class="row">
									<div class="col-sm-12">
										<div class="page-header">
											<ul class="breadcrumb col-md-12-1"
												style="padding: 4px 10px; margin-top: 1px;">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
												<li><a href="operationTypeManagement.jsp">OT</a></li>
												<li><a href="OT_Management.jsp">Team Management</a></li>
												<div class="pull-right">
													<button class="btn btn-xs btn-success editUserAccess"
													data-toggle="tooltip" data-placement="left" title="Save OT Management"
														onclick="saveEditOperationTeam()">
														<i class="fa fa-save"></i>
														</button>
													<button class="btn btn-xs btn-warning editUserAccess"
													 data-toggle="tooltip" data-placement="left" title="New Team "
														onclick="newOperationTeam()">
														<i class="fa fa-users"></i>
														</button>
												</div>
											</ul>
										</div>
									</div>
								</div>
								<!-- Page Date Print Discards-->
								
								<div class="col-md-8-1"
									style="padding-left: 25px;">
									<!-- Search Procedure Header -->
									<div style="font-weight: bold;" class="col-md-2-1">Search:
									</div>
									<div style="font-weight: bold;" class="col-md-2-1">Team
										Name</div>
									<div class="form-group col-md-3-1">
										<input id='strValue' name='strValue' type='text'
											class="form-group"
											onkeypress="return validatealphabetic(event)" />
									</div>
									<div class="form-group col-md-2-1">
										<button class="btn btn-xs btn-primary" class="edit"
											onclick="fetchOperationTeamList('TeamSearch')">Search</button>
									</div>
									<!-- Search Procedure Header -->
								</div>
								
								<!--Start First Panel -->
								<div class="divide-20"></div>
								<div class="panel panel-default">
									<div class="panel-body">
										<div class='col-sm-12-1'>
											<div class='col-sm-5-1' style="border:1px solid #ddd;margin-top: 10px;height: 370px;">
												<div class="form-group Remove-Padding col-md-12-1"
													style="margin-top: 9px; padding-left: 7%;">
													<div class="form-group Remove-Padding col-md-8-1"
														style="margin-top: 9px;">
														<label class="TextFont">Team Name</label> <input
															id='teamName' name='' value=""
															class="form-control input-SmallText" />
													</div>
												</div>
												<div class="form-group Remove-Padding col-md-12-1"
													style="margin-top: 9px; padding-left: 7%;">
													
													<div class="col-md-12-1" >
														<div class="form-group Remove-Padding col-md-4-1"
															style="margin-top: 9px;">
															<label class="TextFont">Type</label> <select name="" onchange=""
																id="type" class="form-control input-SmallText TextFont">
																<option value="select">-Select-</option>
																<option value="admin">Admin</option>
																<option value="anesthetist">Anesthetist</option>
																<option value="doctor">Doctor</option>
																<option value="General">General</option>
																<option value="nurse">Nurse</option>
																<option value="rmo">RMO</option>
																<option value="visitingdoctor">Visiting Doctor</option>
															</select>
														</div>
														<div class="form-group Remove-Padding col-md-1-1"></div>
														<div class="form-group Remove-Padding col-md-4-1"
															style="margin-top: 9px;">
															<label class="TextFont">Name</label><div id = "divuserName">
															<input id='userName' autocomplete="off"
																name='userName' onkeyup="setAutoDoctorNameForTeamMember(this.id,'onchange')"
																class="typeahead form-control input-SmallText" />
															</div>
														</div>
												
													<div class="form-group Remove-Padding col-md-1-1"
														style="margin-top: 29px;">
														<img width="18" height="18" onclick="addUserToList()"
															src="images/plus.jpg">
													</div>
													<div class="form-group Remove-Padding col-md-1-1"
														style="margin-top: 29px;">
														<img width="18" height="18" onclick="removeUserFromList()"
															src="images/minus.jpg">
													</div>
												</div>
												<div class="col-md-12-1" id=""> 
												<div class="form-group Remove-Padding col-md-4-1"
														style="margin-top: 18px;">
														<label class="TextFont">Doctor Type</label> <select name=""
															id="doctype" class="form-control input-SmallText TextFont">
															<option value="select">-Select-</option>
																					<option value="surgeon">Surgeon</option>
																					<option value="surgeon1">Surgeon 1</option>
																					<option value="surgeon2">Surgeon 2</option>
																					<option value="surgeon3">Surgeon 3</option>
																					<option value="asssurgeon">Assistant Surgeon</option>
																					<option value="assSurgeon1">Assistant Surgeon 1</option>
																					<option value="assSurgeon2">Assistant Surgeon 2</option>
																					<option value="assSurgeon3">Assistant Surgeon 3</option>
																					<option value="scrubNurse1">Scrub Nurse 1</option>
																					<option value="scrubNurse2">Scrub Nurse 2</option>
																					<option value="scrubNurse3">Scrub Nurse 3</option>
																					<option value="circulatingNurse1">Circulating Nurse 1</option>
																					<option value="circulatingNurse2">Circulating Nurse 2</option>
																					<option value="circulatingNurse3">Circulating Nurse 3</option>
																					<!-- <option value="anesthetist">Anaesthesiologist</option> -->
																					<option value="anaesthesiologist">Anaesthesiologist</option>
																					<option value="anaesthesiologist1">Anaesthesiologist 1</option>
																					<option value="anaesthesiologist2">Anaesthesiologist 2</option>
																					<option value="anaesthesiologist3">Anaesthesiologist 3</option>
																					<option value="assAnaesthesiologist1">Assistant Anaesthesiologist 1</option>
																					<option value="assAnaesthesiologist2">Assistant Anaesthesiologist 2</option>
																					<option value="assAnaesthesiologist3">Assistant Anaesthesiologist 3</option>
																					<option value="other">Other</option>
														</select>
													</div>
												</div>
											</div>
												<div class="form-group Remove-Padding col-md-12-1"
													style="margin-top: 9px;padding-left: 7%;">
													<div class="form-group Remove-Padding col-md-8-1"
														style="margin-top: 9px;">
														<label class="TextFont"></label>
														<select size="10" style="width: 100%;" multiple="multiple" id="txtDocName">
														</select>
													</div>
												</div>
											</div>

										<div class="col-md-7-1"
											style="padding-left: 25px; margin-top: 10px;">

											<!-- Start Table Gui -->
											<div class='col-sm-12-1'>
												<table
													class='table'
													style='margin-top: 10px;'>
													<thead>
														<tr>
															<th class='col-sm-1-1 center' style='height: 21.5px;'><label
																class='TextFont'>#</label></th>
															<th class='col-sm-1-1 center' style='height: 21.5px;'><label
																class='TextFont'>Team ID</label></th>
															<th class='col-sm-2-1' style='height: 21.5px;'><label
																class='TextFont'>Team Name</label></th>
															<th class='col-sm-1-1 center' style='height: 21.5px;'><label
																class='TextFont'>Edit</label></th>
															<th class='col-sm-1-1 center' style='height: 21.5px;'><label
																class='TextFont'>Delete</label></th>
														</tr>
													</thead>
												</table>
											</div>

											<div id="divTeamList" class="col-md-12-1"></div>

										</div>









											<!-- <div class='col-sm-7-1'>
												<div class="divide-40"></div>
												<div class='col-sm-12-1' id="">
													<table style="margin-bottom: 0px;width:98%;"
														class="datatable table table-bordered table-condensed cf">
														<thead class="cf">
															<tr>
																<th style="height: 21.5px;" class="col-md-1-1 center"><div
																		class="TextFont">#</div></th>
																<th style="height: 21.5px;" class="col-md-2-1 center"><div
																		class="TextFont">Team Id</div></th>
																<th style="height: 21.5px;"
																	class="numeric col-md-4-1 center"><div
																		class="TextFont">Team Name</div></th>
																<th style="height: 21.5px;"
																	class="numeric col-md-3-1 center"><div
																		class="TextFont">Edit</div></th>
																<th style="height: 21.5px;"
																	class="numeric col-md-3-1 center"><div
																		class="TextFont">Delete</div></th>
															</tr>
														</thead>
													</table>
													<div style="max-height: auto; margin-top:5px;" class="col-md-12-1">
														<table
															class="table table-bordered table-condensed cf">
															<tbody id="divTeamList" class="col-md-12-1">

															</tbody>
														</table>
													</div>


												</div>
											</div> -->

										</div>
									</div>
								</div>
								<!--End First Panel -->

							</div>
							<!-- End id="content" -->
						</div>
						<!-- End class="row" -->
					</div>
					<!-- class="container" -->
				</div>
				<!-- id="main-content" -->
			</div>
			<!-- id="outer" -->

			<div><%@include file="Footer.jsp"%></div>
			<input type="hidden" id="todays_date" value="<%=todays_date%>" />
			<input type="hidden" value="insert" id="queryType">
			<input type="hidden" value="0" id="teamId">
			<div id="userObj" style="display: none;"></div>
			<div id="teamList" style="display: none;"></div>
			<input type="hidden" id="userDocId" value="0" />

		</c:if>
	</section>
</body>
</html>