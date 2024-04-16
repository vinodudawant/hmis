<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Out Source Master</title>

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

<!-- New Js Files -->
<script type="text/javascript" src="js/jquery/jquery-2.0.3.min.js"></script>
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
<script type="text/javascript" src="js/OutsourceMaster.js"></script>
<!-- /for Developers  -->

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<script>
	jQuery(document).ready(function() {
		App.setPage("UserManagement"); //Set current page
		App.init(); //Initialise plugins and elements

		$(function() {
			$('[data-toggle="tooltip"]').tooltip();
		});

		getAlloutSourcelist();
		/* getAlloutSourceTestlist();  */

	});
</script>

<script type="text/javascript">
	onload = function() {
		//getTempMasterList();
		//setAutoCompleteForTempMaster('country_select','country_select');
		/* getAllTemp(); */
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

				<%-- <%@include file="left_menu_pathology.jsp"%> --%>
					<%@include file="left_menu_pathologyNew.jsp"%>
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
								<div class="row">
									<div class="col-sm-12">
										<div class="page-header">

											<ul class="breadcrumb col-md-12-1"
												style="padding: 7px 10px; margin-top: 1px;">
												<li>Date : <%=todays_date%></li>
												<li><a href="diagnoPatBillDashboard.jsp">Diagnostics</a></li>
												<li><a href="PathologyGroups.jsp">Pathology
														Management</a></li>
												<li><a href="PathologyOwnLab.jsp">Lab Information</a></li>
												<li><a href="outSourceTestMaster.jsp">Out Source
														Master</a></li>
											</ul>

										</div>
									</div>
								</div>




								<div style="margin-left: 280px;" id="SearchContent"
									class="col-md-12-1">
									<div class='col-md-1-1'>Search By:</div>
									<div class='col-md-1-1'>Lab Name</div>
									<div class='col-md-3-1'>
										<input class="col-md-12-1" name="userName" type="text"
											onkeyup="setAutoCompleteForPaymentMaster(this.id,'search')"
											class="typeahead form-control input-SmallText " id="byName" />
									</div>


									<div style="font-weight: bold; margin-left: 50px;"
										class="col-md-2-1">
										<button class="btn btn-xs btn-success pull-left" type='button'
											onclick="openOutSourcePopup();" data-toggle="modal">
											<i class="fa fa-plus"></i> Add New
										</button>
									</div>
									<div>
										<!-- <button class="btn btn-xs btn-danger" data-toggle="tooltip"
														data-placement="left" title="Refresh"
														onclick="refreshPayment()">
														<i class="fa fa-refresh"></i>
													</button>  -->



									</div>
								</div>
								<!-- 	<div class="divide-20"></div> -->
								<div class="divide-40"></div>
								<!-- /Common -->
								<div id="patientcontainer"
									style="width: 99.80%; margin-top: -50px; height: 450Px; overflow-y: scroll; border: 1px solid #436a9d;">
									<div style="margin-top: 15px; padding-left: 6%;">
										<div id="MRNcontent">
											<table style="width: 1200px;">
												<tbody id="masterModuleBodyNarr" style="width: 100px;"></tbody>
												<thead class="cf" style="background: wheat;" id="ehatTHead">
												
												
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!--Start #showSubModulesPopup Popup -->
			<div id="showSubModulesPopup" class="modal fade in">
				<!--End #showSubModulesPopup Popup -->
				<input id="objUserAccess" type="hidden" value="" />
				<input id="inho" type="hidden" value="0" />
			</div>
			</div>
		</c:if>
		<%@include file="footer_nobel.jsp"%>
	</section>
<%-- 	<%@include file="Footer.jsp"%> --%>
		<%@include file="footer_nobel.jsp"%>



	<div id="outSourcelabpopup" class="modal fade in"
		style="min-height: 819px tabindex=" -1" role="dialog"
		aria-labelledby="myModalLabel" aria-hidden="true">
		<div id="outSourcelab"  class="modal-content" style="height:600px">
			<div class="modal-header">
				<div class="box-title">
					<i class="fa fa-calendar"></i> <font size="3" color="red">
						Out Source shares </font>
					<div class="pull-right">
						<button class="btn btn-primary editUserAccess"
							onclick="saveOutSourceLab()" style="margin-left: 620px;"
							type="button">Save</button>
						<button id="CloseBTN" class="btn btn-default"
							onclick="onCloseBtnRefrshPage()" data-dismiss="modal"
							type="button">Cancel</button>
						<!-- <button id="cancelID" class="btn btn-default"
								onclick="reloadPage()" data-dismiss="modal"
								style="display: none; margin-left: 0px;" type="button">Close</button> -->
					</div>
				</div>
			</div>
			<div class="modal-body">
				<div class="row">

					<form class="form-horizontal col-md-4" role="form">
						<div class='form-group Remove-Padding col-md-12-1 hidden'
							style='padding-right: 8px; margin-top: 9px;'>
							<div class='divide-20'></div>
							<label class='TextFont col-md-4-1'>out_Source_labId</label> <input
								id='outSourcelabId' type='text' placeholder='outSourcelabId'
								style='background-color: #ddd' ,disabled="disabled"
								;class='form-control input-SmallText col-md-7-1'
								readonly='readonly' style='margin-left:0%;' value='0' /> <input
								id="outSourcelabId" type="hidden" value="0">
						</div>
						<div class="form-group">
							<label for="outSourcelabName TextFont" class="col-sm-4">
								Lab Name<b style="color: red;">*</b>
							</label>
							<div class="col-sm-6">
								</b> <input type="text" class="form-control input-SmallText"
									maxlength="40" id="outSourcelabName"
									placeholder="Enter lab Name">
							</div>
						</div>



						<div class="form-group">
							<label for="address" class="col-sm-4 ">Address<b
								style="color: red;">*</b>
							</label>
							<div class="col-sm-6">
								<input type="text" class="form-control input-SmallText"
									maxlength="40" id="address" placeholder="Enter address">
							</div>
						</div>


						<div class="form-group">
							<label for="contactperson" class="col-sm-4 ">Contact
								Person<b style="color: red;"></b>
							</label>
							<div class="col-sm-6">
								<input type="text" class="form-control input-SmallText"
									maxlength="40" id="contactperson"
									placeholder="Enter contact person">
							</div>
						</div>
						<div class="form-group">
							<label for="contactno" class="col-sm-4 ">Contact No<b
								style="color: red;">*</b>
							</label>
							<div class="col-sm-6">
								<input type="text" class="form-control input-SmallText"
									maxlength="10" id="contactno" placeholder="Enter Contact No">
							</div>
						</div>


						<input type="hidden" id="txtpartymastercode" value=0 />
					</form>
					<form class="form-horizontal col-md-6" role="form">
						<div class="form-group">
							<label for="emailId" class="col-sm-2 ">Email Id<b
								style="color: red;">*</b>
							</label>
							<div class="col-sm-3">
								<input type="text" class="form-control input-SmallText"
									maxlength="40" id="emailId" placeholder="Enter Email ID">
							</div>
						</div>


						<div class="form-group">
							<label for="panno" class="col-sm-2 ">Pan No <b
								style="color: red;">*</b>
							</label>
							<div class="col-sm-3">
								<input type="text" class="form-control input-SmallText"
									maxlength="40" id="panno" placeholder="Enter Pan No">
							</div>
						</div>

						<div class="form-group">
							<label for="gstno" class="col-sm-2 ">GST No <b
								style="color: red;"></b>
							</label>
							<div class="col-sm-3">
								<input type="text" class="form-control input-SmallText"
									maxlength="40" id="gstno" placeholder="Enter GST No">
							</div>
						</div>

					</form>
				</div>
			</div>


			<div class="row">
				<div id="outSourceinhouse" style="" class="col-xs-10 col-sm-4 col-md-6 col-lg-6">
					<div class="panel panel-default">
						<div class="panel-heading">InHouse And OutHouse Shares</div>
						<div class="panel-body">
							<div class="col-md-12-1"
								style="height: 140px; overflow-y: scroll; overflow-x: hidden; border: 1px solid #b8b8b8;">
								<br>
								<!-- <div class="col-md-6"> -->
								<div class="row">
									<div class="col-md-8">
										<div class="col-md-5">
											<div class="divide-20"></div>
											<label for="exampleInputEmail1" style="color: red;">InHouse
												Shares</label> <input type="text" id="outtestInhousepercentage" onkeyup="adding()"
												class="form-control" placeholder="Percentage">
												 <input id="outSalveId" type="hidden" value="0">
										</div>
										<div class="col-md-5">
											<div class="divide-20"></div>
											<label for="exampleInputEmail1" style="color: red;">OutHouse
												Shares</label> <input type="text" id="outtestOuthousepercentage" onkeyup="subtract()" value="100"
												class="form-control"  readonly="readonly"  placeholder="Percentage">
												<input id="divouthouseId" type="hidden" value="100">
										</div>
										<div class="col-md-5">
										<div class="divide-20"></div>
										<button class="btn btn-primary editUserAccess"
											onclick="saveInhousePercentage()" style="margin-top: -70px;margin-left:364px;width:72px"
											type="button">Save</button>

									</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>



				<div id="outSourceTest" class="col-xs-10 col-sm-4 col-md-6 col-lg-6">
					<div class="col-md-10-1"
						style="height: 190px; overflow-y: scroll; overflow-x: scroll; border: 1px solid #b8b8b8; margin-left: 35px; margin-top: 1px;">
						<br>
						<div class="row">
							<div class="col-md-8">
								<table style="width: 1200px;">
									<tbody id="masterModuleBodyNarr1" style="width: 100px;"></tbody>
								</table>

							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="row">
				<div  id="outSourceOuthouse" style="" class="col-xs-10 col-sm-4 col-md-6 col-lg-6">
					<div class="panel panel-default">
						<div class="panel-heading">Exceptional Test</div>
						<div class="panel-body">
							<div class="col-md-12-1"
								style="height: 140px; overflow-y: scroll; border: 1px solid #b8b8b8;">
								<br> <br>
								<!-- <div class="col-md-6"> -->
								<!-- <h4 class="divide-15">Exceptional Test</h4> -->

								<div class="col-md-12">


									<div class='form-group Remove-Padding col-md-12-1 hidden'
										style='padding-right: 8px; margin-top: 9px;'>
										<div class='divide-20'></div>
										<label class='TextFont col-md-4-1'>TestId</label> <input
											id='outsourceslaveId' type='text' placeholder='testId'
											style='background-color: #ddd' ,disabled="disabled"
											;class='form-control input-SmallText col-md-7-1'
											readonly='readonly' style='margin-left:0%;' value='0' />
										<!-- <input
											id="testId" type="hidden" value="0"> -->
									</div>
									<div class="col-md-3">
										<div class="divide-20"></div>
										<label for="exampleInputEmail1" style="color: red;">Test
											Name</label> <input type="text" id="testName" class="form-control"
											placeholder="Test Name"
											onkeypress="autoSuggestionForSubServiceName(this.id, 'onchange');">
										<input type="hidden" id="testId"/>
									</div>
									<div class="col-md-3">
										<div class="divide-20"></div>
										<label for="exampleInputEmail1" style="color: red;">MRP</label>
										<input type="text" id="testcharges" readonly="readonly"
											class="form-control" placeholder="MRP">
									</div>

									<div class="col-md-3">
										<div class="divide-20"></div>
										<label for="exampleInputEmail1" style="color: red;">Percentage
										</label> <input type="text" id="percentage"
											onkeyup="calculatepercentage()" class="form-control"
											placeholder="Percentage">
									</div>

									<div class="col-md-3">
										<div class="divide-20"></div>
										<label for="exampleInputEmail1" style="color: red;">Amount
										</label> <input type="text" id="amount" onkeyup="calculateAmount()"
											class="form-control" placeholder="Amount">
									</div>
									
									
									<div class="col-md-3">
										<div class="divide-20"></div>
										<label for="exampleInputEmail1" style="color: red;">Out MRP
										</label> <input type="text" id="outSourceRate"
											class="form-control" placeholder="OutSource MRP" style="margin-top:0px">
									</div>

									<div class="col-md-3">
										<div class="divide-20"></div>
										<button class="btn btn-primary editUserAccess"
											onclick="saveOutTestLab()"  style="margin-top: 9px;margin-left:420px"
											type="button">Save</button>

									</div>
								</div>


							</div>
						</div>
					</div>
				</div>
			</div>
			</div>
			</div>
			<input id="hideSalesItemSaveUpdate" type="hidden" value="0">
</body>
</html>