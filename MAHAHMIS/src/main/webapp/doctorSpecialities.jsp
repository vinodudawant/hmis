<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<title>Doctor Specialities</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<meta name="viewport" content="user-scalable=no, width=device-width">


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
<script type="text/javascript" src="js/Admin.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<!-- /for Developers  -->

<!-- Auto-Suggestion 6/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<script>
	jQuery(document).ready(function() {
		App.setPage("doctorSpecialities"); //Set current page
		App.init(); //Initialise plugins and elements
		$(function () {
			  $('[data-toggle="tooltip"]').tooltip();
		})
	});
</script>


<script type="text/javascript">
	onload = function() {
		$("#hospDetail").addClass("anchorActive");
		defaultViewDoctorSpeciality();
	}
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
			<!-- <div id="top18">
				<div style="width: 100%;">
					<div style="width: 60%;">
						<img src="images/logo.jpg" />
					</div>
					<div
					style="width: 20%; float: right; padding-left: 15%; padding-top: 2%;">
						<div
							style="width: 92%; float: right; padding-top: 3%; padding-right: 8%">
							<div style="padding-right: 2%; width: 30%;" id="savebtn"></div>

						</div>
					</div>
				</div>
			</div> -->
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
												<li><a href="UserManagement.jsp">Administrator</a></li>
												<li><a href="hospital_info.jsp">Hospital Detail</a></li>
												<li>Doctor Specialities</li>
												<div class="pull-right">
													<button class="btn btn-xs btn-success editUserAccess" 
													data-toggle="tooltip" data-placement="left" title="Save Doctor Speciality"
													onclick="saveDoctorSpeciality()" disabled="disabled">
													<i class="fa fa-save"></i>
													</button>
												</div>
											</ul>
										</div>
									</div>
								</div>
								<!-- /Common -->	

						<div class="panel panel-default">
							<div class="panel-body">
							<div class="col-md-12-1" style="margin-top: 15px; padding-left: 0%;">
							<div class="col-md-4-1" style="width: 35%; border: 1px solid #ddd; height: 435px;" id="">
								<div style='width: 100%; padding-top: 2.5%; padding-left: 10%'>
									<div style='width: 100%;'>
										<h2>Update Speciality Information</h2>
									</div>
									
									<div class="form-group col-md-9-1">
										<div class="divide-10"></div>
											<label class="TextFont">Speciality Name:</label> 												
												<select id="selDocSpeciality" name="selDocSpeciality"
														class="form-control input-SmallText" disabled="disabled">
												<!-- <option value="select" selected="selected">-Select-</option>
												<option value="CMO/RMO" onclick="setCmoTemplate()">CMO/RMO</option>
												<option value="Speciality" onclick="setSpecialityTemplate()">Speciality</option>
												<option value="Super Speciality" onclick="setSpecialityTemplate()">Super Speciality</option> -->
												</select>
									</div>
									
									
									<div class="form-group col-md-9-1">
										<div class="divide-10"></div>
											<label class="TextFont" id="wdConsultation">Week Day Consultation:</label> 
												<input  id='txtwdConsultation' name='txtwdConsultation'
														type="text" onkeypress="return validatePrice(event)"  value=""
														class="form-control input-SmallText" required="required" readonly="readonly"/>													
									</div>
									
									<div class="form-group col-md-9-1">
										<div class="divide-10"></div>
											<label class="TextFont" id="wdFollowup">Week Day Followup:</label> 
												<input  id='txtwdFollowup' name='txtwdFollowup' value=""
														type="text" onkeypress="return validatePrice(event)" 
														class="form-control input-SmallText" required="required" readonly="readonly"/>													
									</div>
									<div class="form-group col-md-9-1">
										<div class="divide-10"></div>
											<label class="TextFont" id="weConsultation">Week End Consultation:</label> 
												<input  id='txtweConsultation' name='txtweConsultation' value=""
														type="text" onkeypress="return validatePrice(event)" 
														class="form-control input-SmallText" required="required" readonly="readonly" />													
									</div>
									<div class="form-group col-md-9-1">
										<div class="divide-10"></div>
											<label class="TextFont" id="weFollowup">Week End Followup:</label> 
												<input  id='txtweFollowup' name='txtweFollowup' value=""
														type="text" onkeypress="return validatePrice(event)" 
														class="form-control input-SmallText" required="required" readonly="readonly" />													
									</div>

								</div>
							</div>
							
					
								
										
								<div class="col-md-7-1" style="height: 5%; max-height: auto; margin-left: 4%;">

									<table class="table table-striped table-bordered header-fixed cf "
										style="margin-top: 0px; width : 98%;">
										<thead class="cf" style="background: white;">
											<tr>
												<th style="height: 21.5px;" class="col-md-1 center"><div>#</div></th>
												<th style="height: 21.5px;" class="col-md-2 center"><div>Id</div></th>
												<th style="height: 21.5px;" class="col-md-2 center"><div>Name</div></th>														
												<th style="height: 21.5px;" class="col-md-1 center"><div>Edit</div></th>
												
											</tr>
										</thead>						
									</table>
							
									<div class="container-main col-md-7-1"
										style="overflow-y: scroll;margin-top: -20px; height: 410px; maxheight: auto; border: 1px solid #ddd;">

										<table class="table table-striped table condensed cf">
											
											<tbody id="userMangTemp">
											</tbody>
										</table>
									</div>
									</div>
										

									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<%@include file="Footer.jsp"%></div>
			<input type="hidden" id="docSplId" /> <input id="queryType"
				type="hidden" value="insert">
		</div>

		<div id="userObj" style="display: none;"></div>
	</c:if>
</section>
</body>
</html>