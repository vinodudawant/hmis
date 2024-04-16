<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>Dialysis Dashboard</title>
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
<link href="css/pop_up.css" rel="stylesheet" type="text/css" />

<!-- JQUERY -->
<script src="jquery/jquery-2.1.1.js"></script>
<!-- JQUERY UI-->

<!-- ----for table auto complete-------------- -->
<link rel="stylesheet" type="text/css"
	href="css/jquery-ui-1.10.3.custom.min.css" />
<!-- ----for table auto complete-------------- -->

<script	src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
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


<!---------------------------- Added by vinod ----------------------------------------->

<!-- for table auto complete-->
<link rel="stylesheet" type="text/css" href="css/jquery-ui-1.10.3.custom.min.css"/>
<!-- SELECT2 -->
<link rel="stylesheet" type="text/css" href="ehat-design/js/select2/select2.min.css"/>
<link rel="stylesheet" type="text/css" href="ehat-design/js/uniform/css/uniform.default.min.css"/>
<link rel="stylesheet" type="text/css" href="ehat-design/js/bootstrap-wizard/wizard.css"/>
<link rel="stylesheet" type="text/css" href="ehat-design/js/bootstrap-wizard/wizard.css" />

<script type="text/javascript" src="ehat-design/js/select2/select2.min.js"></script>
<script type="text/javascript" src="ehat-design/js/uniform/jquery.uniform.min.js"></script>
<script src="ehat-design/js/bootstrap-wizard/form-wizard.min.js"></script>
<script type="text/javascript" src="ehat-design/js/jQuery-Cookie/jquery.cookie.min.js"></script> 

<!---------------------------- /Added by vinod ----------------------------------------->


<!-- for Developers  -->

<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>

<script type="text/javascript" src="js/js.js"></script>
<script src="js/validate.js" type="text/javascript"></script>
<script type="text/javascript" src="js/Dashboard.js"></script>
<script type="text/javascript" src="js/ehat_dialysis.js"></script>

<script type="text/javascript"
	src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/additional-methods.min.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<!-- /for Developers  -->

<!-- Auto-Suggestion 1/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<!-- CUSTOM SCRIPT -->
<!-- <script src="js/script.js"></script> -->
<script src="ehat-design/js/script.js"></script>

<script>
	/* jQuery(document).ready(function() {
		App.setPage("IPD_BedWardDashboard"); //Set current page
		App.init(); //Initialise plugins and elements
	}); */
	
	$(document).ready(function() {
		App.setPage("wizards_validations"); // Set current page
		App.init(); // Initialise plugins and elements
		FormWizard.init();
	});
</script>

<script type="text/javascript">
	onload = function() {

		getHomoDailaysisPatient();
		$("#bedwar").addClass("anchorActive");
	}
</script>

</head>

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
				<%
					String moduleName = (String) session.getAttribute("moduleName");
						System.out.println(moduleName);
						if (moduleName.equals("ipd")) {
				%>
				<%@include file="left_menu_IPDMain.jsp"%>
				<%
					} else if (moduleName.equals("DoctorDesk")) {
				%><div id="leftContent" style="height: 100%;">
					<%@include file="menu_DoctorDesk.jsp"%>
				</div>
				<%
					} else {
				%><div id="leftContent" style="height: 100%;">
					<%@include file="menu_HelpDesk.jsp"%>
				</div>
				<%
					}
				%>
				<!--End Left Menu -->
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

								<!-- Page Date Print Discards-->
								<div class="row">
									<div class="col-sm-12">
										<div class="page-header">
											<ul class="breadcrumb col-md-12-1"
												style="padding: 6px 10px; margin-top: 1px;">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
												</li>
												<li><a href="IPD_Dashboard.jsp">Dialysis</a></li>
												<li>Dialysis DashBoard</li>
											</ul>
										</div>
									</div>
								</div>
								<!-- Page Date Print Discards-->

								<!-- Page Search Header -->
								
								<div class="col-md-12-1">
									<div style="font-weight: bold;" class="col-md-1">Search :</div>
									<div class="col-md-1-1"><label class="TextFont" style="margin-left: 10%;margin-top:3%;">Patient Name:</label></div>

									<div style="" class="col-md-2-1 TextFont" id="divbyName">
										<input name="byName" type="text" id="byName" class="typeahead form-control input-SmallText"
											onkeyup="setAutoCompleteForIpdQueue(this.id,'search')" autocomplete="off"/>
									</div>
									
								</div>
								
								<!-- Page Search Header -->

								<div class="divide-20"></div>
								<div class="panel panel-default">
									<div class="panel-body">

										
										<div id="container" class="col-md-12-1"></div>

										<div id="login-box" class="login-popup">
											<a href="#" class="close"><img src="images/close_pop.png"
												class="btn_close" title="Close Window" alt="Close" /></a>
											<fieldset class="textbox">
												<label> <span>Enter Cancel Reason:<input
														id="reasonTxt" type="text" value="" style="width: 300px;"
														maxlength="1000" />
												</span></label> <label><span><button class="submit button"
															type="button" onclick="submilReason()">OK</button></span> </label>

											</fieldset>
										</div>

									</div>
								</div>

							</div>
							<!-- End id="content" -->
						</div>
						<!-- End class="row" -->
					</div>
					<!-- class="container" -->
				</div>
				<!-- id="main-content" -->
			</div>
		
			<div id="cancellAdmissionPopUp" class="popup modal fade in" tabindex="-1"
					role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
					<div class="modal-dialog" style="width: 500px;">
						<div class="modal-content">
							<div class="modal-header">
								<div class="box-title">
									<h4>Narration </h4>
								</div>
							</div>
							<div class="modal-body">
								<div class="row">
									<div class="col-md-12">
										<!-- BOX -->
										<div class="box-body">
											<!--Panel Body-->
											<div class="col-xs-12 col-md-12">
												<div class="col-xs-4 col-md-12">
													<div class="divide-20"></div>
													<label>Reason to cancel Admission</label>
													<textarea id="narrationid" name="addressText" cols="46" rows="2"></textarea>
												</div>
											</div>
										</div>
									</div>
									<!-- /BOX-->
								</div>
							</div>
							<div class="modal-footer">
								<input type="button" value="submit" class="btn btn-primary"
									onclick="cancelAdmission()" />
								<button type="button" class="btn btn-default"
									data-dismiss="modal">Close</button>
							</div>
						</div>
						<!-- /BODY-->
					</div>
				</div>
	<!-- ends here -->

			<div><%@include file="Footer.jsp"%></div>
			<div id="patobject" style="display: none;"></div>
			<div id="trid" style="display: none;"></div>
			<div id="pid" style="display: none;"></div>
		</c:if>
	</section>
</body>
</html>