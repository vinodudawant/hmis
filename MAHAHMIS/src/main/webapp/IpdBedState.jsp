<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>bedState Management</title>
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

<!-- css for developer -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.core.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.default.css" />
<!-- css for developer -->

<!-- include js for development -->
<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>


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
<script type="text/javascript" src="js/js.js"></script>
<script type="text/javascript" src="js/ipdBedState.js"></script>

<!-- /for Developers  -->

<!-- Auto-Suggestion 6/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>
<script>
	jQuery(document).ready(function() {
		App.setPage("bedState"); //Set current page
		App.init(); //Initialise plugins and elements
	});
</script>

<script type="text/javascript">
	onload = function() {
		//defaultViewHall('bedState');
		fetchBedStateSettingList();
		$("#bedState").addClass("anchorActive");
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
				<%@include file="left_menu_IPDMain.jsp"%>
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
												<li>Date : <%=todays_date%>
												</li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
												</li>
												<li><a href="IPD_Dashboard.jsp">IPD</a></li>
												<li>IPD Bed State</li>
											</ul>
										</div>
									</div>
								</div>
								<!-- Page Date Print Discards-->

								<!-- Page Search Header -->
								<!-- Page Search Header -->

								<div class="divide-20"></div>
								<div class="panel panel-default">
									<div class="panel-body">

										<div class="col-sm-6-1">
											<table class="table table-bordered table-condensed cf"
												style="width: 97.5%; margin-top: 10px;">
												<thead class="cf">
													<tr>
														<th class="col-md-1-1 center" style="height: 21.5px;"><div
																class="TextFont">#</div></th>
														<th class="col-md-2-1 center" style="height: 21.5px;"><div
																class="TextFont">Bed Mode.</div></th>
														<th class="col-md-5-1 center" style="height: 21.5px;"><div
																class="TextFont">Bed Hour</div></th>
														<th class="col-md-2-1 center" style="height: 21.5px;"><div
																class="TextFont">Edit</div></th>
														<th class="col-md-2-1 center" style="height: 21.5px;"><div
																class="TextFont">Delete</div></th>
													</tr>
												</thead>
												<tbody id="tbody_bedstate">
													
												
												</tbody>
											</table>

											<!-- from js/ipdTreatment.js <var hallBedsTemplate> -->
											<div id="container" class="col-sm-12-1"
												style="margin-top: -21px; overflow-y: scroll; height: 400px; max-height: auto; border: 1px solid #ddd;"></div>
										</div>




										<div class="col-sm-5-1" style="margin-left: 4%;">
											<div id="container" class="col-sm-12-1"
												style="margin-top: 10px; height: 425px; max-height: auto; border: 1px solid #ddd;"
												align="center">
												<div class="form-group Remove-Padding col-md-12-1">
												<h3>Bed State Setting</h3>
												</div>
												<input id="id" type="hidden" value="0"/>	
												<div class="form-group Remove-Padding col-md-12-1"
													style="margin-top: 1px; padding-left: 5px;">
													<label class="form-group Remove-Padding col-md-5-1"
														style="margin-top: 9px;">Mode: &nbsp;</label>
														<select id="bedMode" style="margin-top: 6px;" class="form-control input-SmallText TextFont col-md-5-1">
														<option	value="auto">Automatic</option>
														<option value="manual">Manual</option></select>
												</div>

												<div class="form-group Remove-Padding col-md-12-1"
													style="margin-top: 20px; padding-left: 5px;">
													<label class="form-group Remove-Padding col-md-5-1"
														style="margin-top: 9px;">Hour: &nbsp;</label><input
														type="text" placeholder="Hours"
														class="form-control input-SmallText TextFont col-md-5-1"
														style="margin-top: 6px;" id="hours" />
												</div>
												
												<div class="form-group Remove-Padding col-md-12-1"
													style="margin-top: 20px; padding-left: 5px;">
													<label class="form-group Remove-Padding col-md-5-1"
														style="margin-top: 9px;"></label>
														<input type="button" value="Save"
														class="btn btn-xs btn-success col-md-2-1"
														style="margin-top: 6px;" onclick="saveUpdateBedStateSetting('save')"/>
												</div>
												<!-- from js/ipdTreatment.js <var hallBedsTemplate> -->
											</div>
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
			<!-- id="outer" -->

		</c:if>
	</section>
</body>
</html>