<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>Process Master</title>
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
<script src="js/jquery.datePicker-min.js" type="text/javascript"></script>

<script type="text/javascript"
	src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/additional-methods.min.js"></script>

<!-- for Developers  -->
<script type="text/javascript" src="js/LaundryLinonManagement.js"></script>
<script type="text/javascript" src="js/CSSD.js"></script>
<!-- /for Developers  -->

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<script>
	jQuery(document).ready(function() {
		App.setPage("Master_LaundryLinen"); //Set current page
		App.init(); //Initialise plugins and elements
	});
</script>

<script type="text/javascript">
	onload = function() {
		getProseccmasterRecordsCsd();

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
			</div>
		</c:if>
		
		<%@include file="left_menu_LinenLaundry.jsp"%>
		
		<%
			java.util.Calendar currentDate = java.util.Calendar.getInstance();
			java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
					"dd-MM-yyyy");
			String todays_date = formatter.format(currentDate.getTime());
		%>
		<div id="main-content">
						<div class="container">
						<div class="row" style="margin-top: -2px;">
							<div id="content" class="col-lg-12">
								<!-- PAGE HEADER-->
								<div class="row">
									<div class="col-sm-12">
										<div class="page-header">

											<ul class="breadcrumb col-md-12-1"
												style="padding: 7px 10px; margin-top: 1px;">
												<li>Date :<%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
												</li>								
											<li><i class="fa fa-home"></i> <a href="lnl_Dashboard.jsp">Ancillaries</a></li>
												<li><a href="cssdProcessMaster2.jsp">Process Master
														</a></li>
											</ul>

										</div>
									</div>
								</div>
								<!-- /Common -->

								<div id="SearchContent" class="col-md-12-1">
									<div class='col-md-1-1'>Search By:</div>
									<div class='col-md-1-1'>Process Name</div>
									<div class='col-md-2-1'>
										<input name="byName" id="byName" type="text"
									maxlength="40" placeholder="Process Name" onkeyup="autoCompleteForProcessMasterCsd()"	/>
									</div>
									<div class='col-md-2-1'>
										<input id='searchDiscount' type='button' value='Search' placeholder="Subinventory Id"
											class='btn btn-xs btn-primary' onkeyup="autoCompleteForProcessMaster()" />
									</div>
								</div>
								<div class="divide-20"></div>
								<div class="panel panel-default">
									<div class="panel-body">
										<div id="shelfMaster" class="col-md-4-1"
										style="height: 150%; margin-top: 1%; padding-left: 20px; border: 1px solid #b8b8b8;">
											<form action="" id="shelfMasterForm" method="post">
												<div class="col-md-12-1 center">
													<h4 id="title">Process Master</h4>
												</div>
												<div class="col-md-12-1 ">
													<div class="divide-20"></div>
													<div class="col-md-4-1"
														style="padding-right: 6%; padding-top: 2%;"><b>Process Code</b></div>
													<div class="col-md-7-1" style="padding-top: 2%;">
														<input type="text" name="processCode" id="processCode"
															placeholder="Process Code">
													</div>
													<!-- <div class="col-md-1-1" style=" color: red; padding-left: 3%">
													<b>*</b>
												</div> -->
												</div>
												<br>
												<div class="col-md-12-1 ">
													<div class="divide-20"></div>
													<div class="col-md-4-1"
														style="padding-right: 6%; padding-top: 2%;"><b>Process Name
														<b style="color: red;">*</b></b></div>
													<div class="col-md-7-1" style="padding-top: 2%;">
														<input name="sectionnumber" id="processName" placeholder="Process Name" >															
													</div>
													<!-- <div class="col-md-1-1"
														style="color: red; padding-left: 3%">
														<b>*</b>
													</div> -->
												</div>

										<br>
										<div class="col-md-12-1 ">
											<div class="divide-20"></div>
											<div class="col-md-4-1"
												style="padding-right: 6%; padding-top: 2%;">
												<b>Description <b style="color: red;">*</b> </b>
											</div>
											<div class="col-md-7-1" style="padding-top: 2%;">
												<input name="sectionnumber" id="discription"
													placeholder="Description">
											</div>
											<div class="col-md-1-1" style="color: red; padding-left: 3%">
												
											</div>
										</div>
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
												
												
												<div class="col-md-12-1 ">
													<div class="divide-20"></div>
													<div class="col-md-4-1"
														style="padding-right: 6%; padding-top: 2%;"><b>Sequence No. </b></div>
													<div class="col-md-7-1" style="padding-top: 2%;">
														<input type="text" name="txtcontactNo" id="seqNo"  maxlength="10"
														placeholder="Sequence No." onkeypress="return validateNumbers(event)" >
													</div>
													<!-- <div class="col-md-1-1"
														style="color: red; padding-left: 3%">
														<b>*</b>
													</div> -->
												</div>
												
												<div class="col-md-12-1 ">
													<div class="divide-20"></div>
													<div class="col-md-4-1"
														style="padding-right: 6%; padding-top: 2%;margin-left: 120px;margin-bottom:15px;">
														<button class="btn btn-xs btn-primary editUserAccess" type="button" onclick="saveProcessingRecordsCsd()" disabled="disabled">Save</button>
													</div>
													<div class="col-md-4-1"
														style="padding-right: 6%; padding-top: 2%;margin-left: -40px;">
														<button class="btn btn-xs btn-danger" type="button" onclick="refreshProcessMasterCsd();" >Clear</button>
													</div>
												</div>
											</form>
										</div>
										<div class="col-md-7-1"
											style="height: 5%; max-height: auto; margin-left: 4%;">

											<div style="margin-top: 15px; padding-left:6%;">
												<div class="container-main col-md-7-1"
													style="overflow:auto; height: 450px; maxheight: auto;">
													<div id="shelfContent">
														<table class='table table-bordered table-condensed cf'>
														<tbody id="masterModuleBodyNarr">

															

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

		</div>
	</section>
	
	<input type="hidden" id="processId" value="0">
</body>
</html>