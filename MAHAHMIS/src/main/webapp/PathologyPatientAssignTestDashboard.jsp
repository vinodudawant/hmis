<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Pathology Assign Test Dashboard</title>

<link rel="stylesheet" type="text/css" href="css/ehat_general.css" />
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher" />
<link rel="stylesheet" type="text/css" href="css/responsive.css" />
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet"
	media="screen" />
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" />

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

<!-- DATE RANGE PICKER -->
<link rel="stylesheet" type="text/css"
	href="js/bootstrap-daterangepicker/daterangepicker-bs3.css" />

<!-- FULL CALENDAR -->
<link rel="stylesheet" type="text/css"
	href="js/fullcalendar/fullcalendar.min.css" />


<!-- New Js Files -->
<script type="text/javascript"
	src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/additional-methods.min.js"></script>
<!-- End New JS File -->

<!-- for Devalopers -->
<script type="text/javascript" src="jquery/jquery-2.1.1.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>

<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="js/Pathology.js"></script>
<script type="text/javascript" src="js/jquery.autocomplete.js"></script>
<script src="js/validate.js" type="text/javascript"></script>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>


<script>
	jQuery(document).ready(function() {
		App.setPage("UserManagement"); //Set current page
		App.init(); //Initialise plugins and elements
	});
</script>

<script type="text/javascript">
	onload = function() {
		fetchRegPatientsForPathalogyTests();
		$("#patEntry").addClass("anchorActive");
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

			<%
				String moduleName = (String) session.getAttribute("moduleName");
					if (moduleName.equals("ipd")) {
			%>
			<%@include file="left_menu_IPD.jsp"%>
			<%
				} else if (moduleName.equals("path")) {
			%>
			<%@include file="left_menu_pathology.jsp"%>
			<%
				} else if (moduleName.equals("opd")) {
			%>
			<%@include file="menu_HelpDesk.jsp"%>
			<%
				} else {
			%>
			<%@include file="menu_DoctorDesk.jsp"%>
			<%
				}
			%>
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
											<li><a href="IPD_OPD_Database.jsp">Doctor Desk</a></li>
											<li>Other Services/Assign Services</li>
											<li><i class="fa fa-question"></i></li>
											<li><i class="fa fa-exclamation-circle"
												style="color: red;">12</i></li>
											<li class="pull-right">
												<button class="btn btn-xs btn-success">Save</button>
												<button class="btn btn-xs btn-warning">Print</button>
												<button class="btn btn-xs btn-danger">Discard</button>
											</li>
										</ul>

									</div>
								</div>
							</div>
							<!-- /Common -->


							<div id="rightContActual">
								<div style="font-weight: bold;" class="col-md-1">Search
									By:</div>
								<div class="col-md-1">Patient Name</div>
								<div style="padding-left: 2%;" class="col-md-2 TextFont">
									<input style="width: 100%;" name="byName" id="byName" class="form-control input-SmallText "
										class="auto" type="text"
										onkeypress="return validatealphabetic(event)"
										onchange="setSplitId()" />

									<script type="text/javascript">
										$(".auto")
												.autocomplete(
														"AutoSuggetionServlet?auto=PayAssTestPatient")
									</script>
								</div>
								<div class="col-md-1" style="text-align: center;">or</div>
								<div class="col-md-1" style="text-align: center;">Patient
									ID</div>
								<div class="col-md-2" style="text-align: center;">
									<input style="width: 100%;" name="byId" id="byId" type="text" class="form-control input-SmallText "
										onkeypress="return validateNumbers(event)" />
								</div>
								<div class="col-md-1" style="text-align: center;">
									<input type="button" value="search" class="btn btn-xs btn-primary" class='edit'
										onclick="searchRegPatientsForPathologyTest()" />
								</div>


								<div class="divide-20"></div>
								<div class="panel panel-default">
									<div class="panel-body">
										<div style="width: 100%;">
											<div class="col-md-12-1">
												<table class="table table-bordered table-condensed cf"
													style="width: 1075px; margin-top: 10px;">
													<thead class='cf'>
														<tr>
															<th class='col-md-1-1 center' style='height: 21.5px;'><div
																	class='TextFont'>#</div></th>
															<th class='col-md-1-1 center' style='height: 21.5px;'><div
																	class='TextFont'>Date</div></th>
															<th class='col-md-1-1 center' style='height: 21.5px;'><div
																	class='TextFont'>Patient Name</div></th>

															<th class='col-md-1-1 center' style='height: 21.5px;'><div
																	class='TextFont'>Admission No</div></th>
															<th class='col-md-1-1 center' style='height: 21.5px;'><div
																	class='TextFont'>Age</div></th>
															<th class='col-md-1-1 center' style='height: 21.5px;'><div
																	class='TextFont'>Gender</div></th>
															<th class='col-md-1-1 center' style='height: 21.5px;'><div
																	class='TextFont'>Contact No</div></th>

															<th class='col-md-2-1 center' style='height: 21.5px;'><div
																	class='TextFont'>Add Routine Tests</div></th>
														</tr>
													</thead>
												</table>
											</div>
											<div class='col-md-12-1'
												style='margin-top: -21px; border:1px solid #b8b8b8; overflow-y: scroll; width: 1090px; height: 460px; max-height: auto;'>
												<table
													class='table table-bordered table-striped table-condensed cf'>
													<tbody id="container">														
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
			</div>

			<%@include file="Footer.jsp"%>
			<div id="pathologyAllPatInfo" style="display: none;"></div>
			<div id="modName" style="display: none;"><%=session.getAttribute("moduleName")%></div>
		</div>
	</c:if>

	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>

	</c:if>
</section>

</body>
</html>
