<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Pathology Patient Type</title>
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
<script type="text/javascript"
	src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/additional-methods.min.js"></script>
<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>
<script type="text/javascript" src="js/Admin.js"></script>
<script type="text/javascript" src="js/Pathology.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<!-- /for Developers  -->

	<!--TIMEPEACKER -->
<link rel="stylesheet" type="text/css"
	href="timepeacker/jquery.datetimepicker.css" />
<script src="timepeacker/jquery.datetimepicker.js"></script>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>


<script>
	jQuery(document).ready(function() {
		App.setPage("PathologyOwnLab"); //Set current page
		App.init(); //Initialise plugins and elements
		$(function () {
			  $('[data-toggle="tooltip"]').tooltip();
		})

	});
</script>

<script type="text/javascript">
	onload = function() {
		fetchOwnLabDetails('LabForm');
		$("#pathManagement").addClass("anchorActive");

		$('#txtOpeningTime').datetimepicker({
			 datepicker:false,
			 format:'H:i',
			 step:15
			 }); 
		$('#txtLunchTime').datetimepicker({
			 datepicker:false,
			 format:'H:i',
			 step:15
			 }); 
		$('#txtClosingTime').datetimepicker({
			 datepicker:false,
			 format:'H:i',
			 step:15
			 }); 
	}
</script>



</head>

<body>
	<c:if test="${ sessionScope.userType != null }">
		<%-- <div id="footer1" style="text-align: right;"><%@include
				file="Session_Info.jsp"%></div> --%>
		
		<!-- Common -->
		<!-- DASHBOARD CONTENT -->
		<%-- <div id="footer1" style="text-align: right;"><%@include
				file="Session_Info.jsp"%></div> --%>
		<div id="outer" class="container-main" style="width: 100%;">
			<!-- HEADER -->
			<header class="navbar clearfix" id="header"> <%@include
				file="Menu_Header.jsp"%> </header>
			<!--/HEADER -->

			<%@include file="left_menu_pathology.jsp"%>

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
											<li><a href="diagnoPatBillDashboard.jsp">Diagnostics</a></li>
											<li><a href="PathologyGroups.jsp">Pathology Management</a></li>
											<li><a href="PathologyOwnLab.jsp">Lab Information</a></li>
											<div class="li pull-right">
												<button class="btn btn-xs btn-success"
												data-toggle="tooltip" data-placement="left" title="Save Lab Info"
													onclick="saveOwnLabDetails()">
													<i class = "fa fa-save"></i>
													</button>
											</div>
										</ul>
									</div>
								</div>
							</div>
							<!-- /Common -->
							
					<div class="panel panel-default">
						<div class="panel-body" class="col-md-12-1">
							<div  class="form-group col-md-12-1" style='padding-left: 15px;'>
							<h3>Own Lab Details</h3>
							</div>
							<div  class="form-group col-md-6-1" style='padding-left: 15px;'>			
								<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>
									<div class='divide-10'></div>
									<label class='TextFont col-md-4-1' for='Name'>Name:<b style='color: red; padding-left: 3px;'>*</b></label>
									<input id='txtLabName' name='txtLabName' type='text' placeholder='Lab Name' onkeypress="return validatealphabetic(event)"
									class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' maxlength='150'/>
								</div>
								<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>
									<div class='divide-10'></div>
									<label class='TextFont col-md-4-1' for='Address'>Address:</label>
									<textarea id='txtAddress' name='txtAddress' class='col-md-7-1'
												rows="3" cols="56" style='margin-left:0%;'></textarea>
								</div>
								<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>
									<div class='divide-10'></div>
									<label class='TextFont col-md-4-1' for='Email'>Email:</label>
									<input id='email' name='email' type='text' placeholder='Email' onblur="return ValidateEmail()"
									class='form-control input-SmallText col-md-7-1' style='margin-left:0%;'/>
								</div>
								<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>
									<div class='divide-10'></div>
									<label class='TextFont col-md-4-1' for='Telephone No'>Telephone No:<b style='color: red; padding-left: 3px;'>*</b></label>
									<input id='txtTelephone' name='txtTelephone' type='text' placeholder='Telephone No' onkeypress="return validateNumbers(event)"
									class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' maxlength="12"/>
								</div>
								<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>
									<div class='divide-10'></div>
									<label class='TextFont col-md-4-1' for='Lab Code'>Lab Code:</label>
									<input id='txtLabCode' name='txtLabCode' type='text' placeholder='Lab Code'
									class='form-control input-SmallText col-md-7-1' style='margin-left:0%;'/>
								</div>
								<!-- <div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>
									<div class='divide-10'></div>
									<label class='TextFont col-md-4-1' for='Footer Name'>Footer Name:</label>
									<textarea id='txtFooter' name='txtFooter' class='col-md-7-1' placeholder='Footer Name'
												rows="2" cols="56" style='margin-left:0%;'></textarea>
								</div> -->
							</div>
							<div  class="form-group col-md-6-1" style='padding-left: 15px;'>			
								<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>
									<div class='divide-10'></div>
									<label class='TextFont col-md-4-1' for='Pathologist'>Pathologist:<b style='color: red; padding-left: 3px;'>*</b></label>
									<input id='txtPathologist' name='txtPathologist' type='text' placeholder='Pathologist' onkeypress="return validatealphabetic(event)"
									class='form-control input-SmallText col-md-7-1' style='margin-left:0%;'/>
								</div>
								<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>
									<div class='divide-10'></div>
									<label class='TextFont col-md-4-1' for='Degree'>Degree:</label>
									<input id='txtDegree' name='txtDegree' type='text' placeholder='Degree' onkeypress="return validatealphabetic(event)"
									class='form-control input-SmallText col-md-7-1' style='margin-left:0%;'/>
								</div>
								<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>
									<div class='divide-10'></div>
									<label class='TextFont col-md-4-1' for='Opening Time'>Opening Time:</label>
									<input id='txtOpeningTime' name='txtOpeningTime' type='text' placeholder='Opening Time'
									class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' readonly="readonly"/>
								</div>
								<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>
									<div class='divide-10'></div>
									<label class='TextFont col-md-4-1' for='Lunch Time'>Lunch Time:</label>
									<input id='txtLunchTime' name='txtLunchTime' type='text' placeholder='Lunch Time'
									class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' readonly="readonly"/>
								</div>
								<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>
									<div class='divide-10'></div>
									<label class='TextFont col-md-4-1' for='Closing Time'>Closing Time:</label>
									<input id='txtClosingTime' name='txtClosingTime' type='text' placeholder='Closing Time'
									class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' readonly="readonly"/>
								</div>
								<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>
									<div class='divide-10'></div>
									<label class='TextFont col-md-4-1' for='Closed Day'>Closed Day:</label>
									<select id='selClosedDay' name='selClosedDay'
												class='form-control input-SmallText col-md-7-1' style='margin-left:0%;'>
												<option value="SUNDAY">SUNDAY</option>
												<option value="MONDAY">MONDAY</option>
												<option value="TUESDAY">TUESDAY</option>
												<option value="WEDNESDAY">WEDNESDAY</option>
												<option value="THURSDAYS">THURSDAY</option>
												<option value="FRIDAY">FRIDAY</option>
												<option value="SATURDAY">SATURDAY</option>
											</select>
								</div>
							</div>
								
								
						</div>		
					</div>
						
						</div>
					</div>
				</div>
			</div>
			<%@include file="Footer.jsp"%></div>

		<input type="hidden" id="hiddenMainLabId" />


	</c:if>

	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>

	</c:if>

</body>
</html>
