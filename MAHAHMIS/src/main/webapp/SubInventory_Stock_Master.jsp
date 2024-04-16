<%@page import="java.util.Date"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>OT SubInventory Stock</title>
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
<script type="text/javascript"
	src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/additional-methods.min.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<!-- /for Developers  -->

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>
<script type="text/javascript" src="js/ExtraJs/inventory_subInventory_Master.js"></script> 
<script>
	jQuery(document).ready(function() {
		App.setPage("UserManagement"); //Set current page
		App.init(); //Initialise plugins and elements
	});
</script>
<script type="text/javascript">
	onload = function() {
		getNextSubInventoryStocktblId();
		fetchSubInventoryNew();
		fetchSubInventoryName();
		
	   
	}
	 
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

				<%@include file="left_menu_otmanagement.jsp"%>
			<%
				java.util.Calendar currentDate = java.util.Calendar
							.getInstance();
					java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
							"dd-MM-yyyy");
					String todays_date = formatter.format(currentDate.getTime());
			%>
				<div id="main-content">
					<div class="container">
						<div class="row" style="margin-top: -2px;">
							<div id="content" class="col-lg-12">
								<!-- PAGE HEADER-->
									<div class="col-sm-12">
										<div class="page-header">

											<ul class="breadcrumb col-md-12-1"
												style="padding: 7px 10px; margin-top: 1px;">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
												</li>								
											<li><a href="OTScheduler.jsp">OTScheduler</a></li>
												<li><a href="SubInventory_Stock_Master.jsp">SubInventory Stock
														</a></li>
											</ul>

										</div>
									</div>
								<div class="divide-20"></div>
								<div class="panel panel-default">
									<div class="panel-body">
										<div id="shelfMaster" class="col-md-4-1"
											style="height: 400px; margin-top: 0%; padding-left: 20px;">
											<form action="" id="shelfMasterForm" method="post">
												<div class="col-md-12-1 center">
													<h4 id="title">SubInventory Stock For OT</h4>
												</div>
												<!-- <div class="col-md-12-1 ">
													<div class="divide-20"></div>
													<div class="col-md-4-1"
														style="padding-right: 6%; padding-top: 2%;">Subinventory Id</div>
													<div class="col-md-7-1" style="padding-top: 2%;">
														<input type="text" name="subInvStockID" id="subInvStockID" disabled
															style="width: 100%;">
													</div>
												</div> -->
												<br>
												<div class="col-md-12-1 ">
													<div class="divide-20"></div>
													<div class="col-md-4-1"
														style="padding-right: 6%; padding-top: 2%;">Subinventory Name
														</div>
													<div class="col-md-7-1" style="padding-top: 2%;">
														<select id="selDocument" name="document" style="width: 100%;">
												   <!--       <option value="0">Select</option> -->
												
										 	          </select>		
													</div>
												</div>
												<div id="shelfAjaxResp" style="display: none;"></div>
												<!-- <div class="col-md-12-1 ">
													<div class="divide-20"></div>
													<div class="col-md-4-1"
														style="padding-right: 6%; padding-top: 2%;">Location</div>
													<div class="col-md-7-1" style="padding-top: 2%;">
														<input type="text" name="details" id="txtLocation" style="width: 100%;">
													</div>
													<div class="col-md-1-1"
														style="color: red; padding-left: 3%">
														<b>*</b>
													</div>
												</div> -->
												
												
												<!-- <div class="col-md-12-1 ">
													<div class="divide-20"></div>
													<div class="col-md-4-1"
														style="padding-right: 6%; padding-top: 2%;">Contact No</div>
													<div class="col-md-7-1" style="padding-top: 2%;">
														<input type="text" name="txtcontactNo" id="txtcontactNo" style="width: 100%;" maxlength="10"
														onkeypress="return validateNumbers(event)" >
													</div>
													<div class="col-md-1-1"
														style="color: red; padding-left: 3%">
														<b>*</b>
													</div>
												</div> -->
												
												<div class="col-md-12-1 ">
													<div class="divide-20"></div>
													<div class="col-md-4-1"
														style="padding-right: 6%; padding-top: 2%;margin-left: 150px;">
														<button class="btn btn-xs btn-primary editUserAccess" type="button" onclick="savesubInventoryName();">Save</button>
													</div>
													<!-- <div class="col-md-4-1"
														style="padding-right: 6%; padding-top: 2%;margin-left: -40px;">
														<button class="btn btn-xs btn-default" type="button" onclick="" >Cancel</button>
													</div> -->
												</div>
											</form>
										</div>
					<!-- 					<div class="col-md-7-1"
											style="height: 5%; max-height: auto; margin-left: 4%;">

											<div style="margin-top: 15px; padding-left: 0%;">
												<div class="container-main col-md-7-1"
													style="height: 450px; maxheight: auto;">
													<div id="shelfContent"></div>
												</div>
											</div>
											<div id="shelfAjaxResp" style="visibility: hidden;"></div>

										</div> -->
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
					
				<script type="text/javascript">
					
				</script>
				<%@include file="Footer.jsp"%></div>
		</c:if>
		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>
		</c:if>
	</section>
</body>
</html>