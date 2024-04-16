<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@page import="java.util.Calendar"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<title>Operation Management</title>
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
<script type="text/javascript" src="js/CommonTemplate.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/additional-methods.min.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/Admin.js"></script>
<!-- /for Developers  -->

<!-- Auto-Suggestion 16/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<script>
	jQuery(document).ready(function() {
		App.setPage("UserManagement"); //Set current page
		App.init(); //Initialise plugins and elements
		$(function () {
			  $('[data-toggle="tooltip"]').tooltip();
		})

		$("#opeman").addClass("anchorActive");
		defaultViewOperation();
		setOperation();
	//	$("#BtnValue").hide();
	   // fetchHallwiseChargesForOperation();
		//defaultViewHall("OperationManagement");
		setAutoSuggestionForOT("strValue", "onload", "OperationManagement");
		fetchprocedureCatsedradmin();

		function dispMessage() {

			flag = 0;
			//var x = document.forms["myform"]["oname"].value
			//var y = document.forms["myform"]["tCharge"].value

			if ($("#opType").val() == "Select") {
				flag = 1;
				alert("Please Select The Procedure Type");
				return false;
			} else if ($("#oname").val() == null || $("#oname").val() == "") {
				flag = 1;
				alert("Please Enter The Procedure Name");
				SetFocus("oname");
				return false;
			}

			if (flag == 0) {
				saveOperationDetails();
			}
		}
		
		jQuery(document).ajaxStart(function() {
			//alert("hi ajax start");
			$("body").addClass("loading");
		});

		jQuery(document).ajaxStop(function() {
			$("body").removeClass("loading");
			//alert("hi ajax stop");
		});
	});
</script>


</head>
<style type="text/css">

/* Start by setting display:none to make this hidden.
   Then we position it in relation to the viewport window
   with position:fixed. Width, height, top and left speak
   speak for themselves. Background we set to 80% white with
   our animation centered, and no-repeating */
.ajaxmodal {
	display: none;
	position: fixed;
	z-index: 1000;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	background: rgba(255, 255, 255, .8)
		url('images/ajax_loader_blue_64.gif') 50% 50% no-repeat;
}

/* When the body has the loading class, we turn
   the scrollbar off with overflow:hidden */
body.loading {
	overflow: hidden;
}

/* Anytime the body has the loading class, our
   ajaxmodal element will be visible */
body.loading .ajaxmodal {
	display: block;
}
</style>

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
												style="padding: 4px 10px; margin-top: 1px;">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
												<li><a href="operationTypeManagement.jsp">OT</a></li>
												<li><a href="operationTypeManagement.jsp">Operation
														Management</a></li>
												<li><a href="OperationManagement.jsp">Operation</a></li>
												<div class="pull-right">
													<button class="btn btn-xs btn-success editUserAccess" id="saveOnlyOperation"
													data-toggle="tooltip" data-placement="left" title="Save Operation"
														onclick="saveOperationDetails()">
														<i class = "fa fa-save"></i>
														</button>
												</div>
											</ul>
										</div>
									</div>
								</div>
								<!-- Page Date Print Discards-->
								<div class="col-md-12-1" style="padding-left: 25px;">
									<!-- Search Procedure Header -->
									<div style="font-weight: bold;" class="col-md-1-1">Search:
									</div>
									<div style="font-weight: bold;" class="col-md-1-1">Operation
										Name : </div>
									<div style="padding-left: 2%;" class="form-group col-md-3-1" id="divstrValue">
										<input id='strValue' name='strValue' type='text'
											class="typeahead form-control input-SmallText" />
									</div>
									<div class="form-group col-md-1-1">
										<button class="btn btn-xs btn-primary" class="edit"
										data-toggle="tooltip" data-placement="right" title="Search"
											onclick="searchOperation()">
											<i class = "fa fa-search"></i>
											</button>
									</div>
									<!-- Search Procedure Header -->
								</div>

								<div class="divide-20"></div>
								<div class="panel panel-default">
									<div class="panel-body">

										<div id="OperationContent" class="col-md-4-1"
											style='margin-top: 10px;'></div>



										<!-- Start Table Gui -->

										<div class='col-sm-7-1' style="margin-left: 5%;">
											<table class='table' style='margin-top: 10px;'>
												<thead>
													<tr>
														<th class='col-md-1-1 center' style='height: 21.5px;'><label
															class='TextFont'>#</label></th>
														<th class='col-md-1-1 center' style='height: 21.5px;'><label
															class='TextFont'>ID</label></th>
														<th class='col-md-4-1' style='height: 21.5px;'><label
															class='TextFont'>Operation Name</label></th>
														<th class='col-md-1-1 center' style='height: 21.5px;'><label
															class='TextFont'>Charges</label></th>
														<th class='col-md-1-1 center' style='height: 21.5px;'><label
															class='TextFont'>Edit</label></th>
														<th class='col-md-1-1 center' style='height: 21.5px;'><label
															class='TextFont'>Delete</label></th>
													</tr>
												</thead>
											</table>
										</div>

										<!-- from .js <var > -->
										<div id="OperationMgmContent" class="col-md-7-1"
											style="margin-left: 5%;"></div>

										<!-- End Table Gui -->
									</div>

								</div>
								<!-- End class="panel-body" -->
							</div>
						</div>
						<!-- End id="content" -->
			<div id="Operation_Managment_Popup" class="modal fade in" tabindex="-1" data-backdrop="static" data-keyboard="false">
				<div class="modal-dialog col-md-10-1" style="margin-top: 40px;">
					<!-- Modal content-->
					<div class="modal-content" style="margin-left: 120px;">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" onclick="ClosePopup()">&times;</button>
							<h4 class="modal-title">Operation hallwise charges</h4>
						</div>
						  <div class="modal-body">
							<div class="panel panel-default">
									<div class="panel-body" style='height: 140px;'>
										<div class='col-md-12-1'
											style='height: 105px; max-height: auto; overflow: auto'>
											<table id="OperationManagmentChrgsTable"
												class='table table-bordered table-condensed cf table-fixed'
												style='margin-bottom: 9px; width: 500%; max-width: 1000%;'>
												<thead>
													<tr id="OperationHeading"></tr>
												</thead>
												<tbody class="table-striped">
													<tr id="Operation0"></tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
							<div style="margin-left: 850px;" id="">
							   <!--  <button   class="btn btn-danger" id="" title="Cancel"
								onclick="hidePOpup()">Cancel
								</button> -->
								<button  class="btn btn-success editUserAccess" id="" title="Save Operation"
								onclick="saveOperationDetails()">Save Operation
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
						
					</div>
					<!-- End class="row" -->
			
				</div>
				<!-- class="container" -->
			</div>
		<!-- 	<div class="ajaxmodal">
				Place at bottom of page
			  </div> -->
			<!-- id="main-content" -->
			<!-- id="outer" -->
			<input type="hidden" id="OTId" value=""/>
            <div id="testDetails" style="display: none;"></div>
            <div style="display: none;" id="InvTestAllHallDetails"></div>
			<div><%@include file="Footer.jsp"%></div>
			<div id="operationDataDiv" style="display: none;"></div>
			<div id="hallwiseChargesDetailDiv" style="display: none;"></div>
			</c:if>
	</section>
</body>
</html>