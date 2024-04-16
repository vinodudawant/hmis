<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Request Generated Form</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no" />
<meta name="description" content="" />
<meta name="author" content="" />
<meta name="viewport" content="user-scalable=no, width=device-width" />

<link rel="stylesheet" type="text/css" href="css/ehat_general.css" />
<link rel="stylesheet" type="text/css" href="css/default.css"
	id="skin-switcher" />
<link rel="stylesheet" type="text/css" href="css/responsive.css" />
<link href="bootstrap-dist/css/bootstrap.min.css" rel="stylesheet"
	media="screen" />
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet" />

<link rel="stylesheet" type="text/css"
	href="css/jquery-ui-1.10.3.custom.min.css" />
	
<!-- JQUERY -->
<script type="text/javascript" src="jquery/jquery-2.1.1.js"></script>
<!-- JQUERY UI-->
<script type="text/javascript"
	src="js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<!-- BOOTSTRAP -->
<script type="text/javascript" src="bootstrap-dist/js/bootstrap.min.js"></script>
<script type="text/javascript" src="bootstrap-dist/js/bootstrap.js"></script>
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
<!-- <script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script> -->
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/additional-methods.min.js"></script>
<script type="text/javascript" src="js/Admin.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
<script type="text/javascript" src="js/patient.js"></script>
<script type="text/javascript" src="js/serviceMaster.js"></script>

<!-- /for Developers  -->

<!-- Auto-Suggestion 7/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<script src="js/UserAccess.js"></script>

<script>
	jQuery(document).ready(function() {
		App.setPage("UserManagement"); //Set current page
		App.init(); //Initialise plugins and elements
		$(function() {
			$('[data-toggle="tooltip"]').tooltip();
		});

		getAllReq("onload");
		//getreqCount();

	});
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

				<%@include file="left_menu_admin.jsp"%>
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
												<li><a href="hospital_info.jsp">Administrator</a></li>
												<li><a href="user_access_user_master.jsp">User
														Management</a></li>
												<li>Module Master</li>
												<div class="pull-right">
													<button class="btn btn-xs btn-success editUserAccess"
														id="saveBtn" value="Save Now" data-toggle="tooltip"
														data-placement="left" title="Save Module"
														onclick="saveReq()" disabled="disabled">
														<i class="fa fa-save"></i>
													</button>
													<button class="btn btn-xs btn-danger" data-toggle="tooltip"
														data-placement="left" title="Refresh"
														onclick="resetReqMaster()">
														<i class="fa fa-refresh"></i>
													</button>
												</div>
											</ul>

										</div>
									</div>
								</div>
								<!-- /Common -->
								<!-- search charges master -->
								<div class="col-md-12-1" style="margin: 1%;">
									<div style="" class="col-md-1-1">
										<label class="TextFont"
											style="margin-left: 10%; margin-top: 3%; font-size: 11px;">Search
											By:</label>
									</div>
									<div class="col-md-1-1">
										<label class="TextFont"
											style="margin-left: 10%; margin-top: 3%;">Name:</label>
									</div>

									<div style="margin-top: 0px; margin-left: 1%" class="col-md-2-1 TextFont"
										id="divbyName">
										<input class="col-md-11-1" name="byName" type="text"
											onkeypress="setAutoCompleteForReqMaster(this.id,'auto')"
											class="typeahead form-control input-SmallText " id="byName" />
									</div>

									<div class="col-md-1-1" style="text-align: center;">
										<input type="button" value="search"
											class="btn btn-xs btn-primary" id="searchReq"
											onclick="setAutoCompleteForReqMaster(this.id,'search')" />
									</div>
								</div>

								<!-- search charges master -->



								<!-- <div class="divide-20"></div> -->
								<div class="panel panel-default">
									<div class="panel-body">
										<div class="col-md-12-1">
											<div class="col-md-4-1" style="height: 450px; margin-top: 0%">

												<input id="masterModuleId" class="hidden">

												<div style='height: 100%; border: 1px solid #ddd;'>
													<div style='padding-top: 0%; padding-left: 8%'>
														<div>
															<h3 id='title'>Request Generated Form :</h3>
														</div>
														<div class='divide-20'></div>
														<div class='form-group Remove-Padding col-md-12-1 hide'
															style='padding-right: 8px; margin-top: 9px;'>
															<div class='divide-20'></div>
															<label class='TextFont col-md-4-1'>ID</label> <input
																id='reqId' type='text' placeholder='Service ID'
																style='background-color: #ddd'
																class='form-control input-SmallText col-md-7-1'
																readonly='readonly' style='margin-left:0%;' value='0' />
														</div> 
														<div class='form-group Remove-Padding col-md-12-1'
															style='padding-right: 8px; margin-top: 13px;'>
															<div class='divide-20'></div>
															<label class='TextFont col-md-4-1'>Name<b
																style='color: red; padding-left: 3px;'>*</b></label> <input
																id='reqName' type='text' placeholder='Name'
																
																class='form-control input-SmallText col-md-7-1'
																required='true' style='margin-left: 0%;' maxlength='150' />
														</div>
														<div class='form-group Remove-Padding col-md-12-1'
															style='padding-right: 8px; margin-top: 13px;'>
															<div class='divide-20'></div>
															<label class='TextFont col-md-4-1'>Code<b
																style='color: red; padding-left: 3px;'>*</b></label> <input
																id='reqCode' type='text' placeholder='Code'
																class='form-control input-SmallText col-md-7-1'
																required='true' style='margin-left: 0%;' maxlength='150' />
														</div>
														<!-- <div class='form-group Remove-Padding col-md-12-1'
															style='padding-right: 8px; margin-top: 13px;'>
															<div class='divide-20'></div>
															<label class='TextFont col-md-4-1'>Service Charges<b
																style='color: red; padding-left: 3px;'>*</b></label> <input
																id='serviceCharges' type='text' placeholder='Service Charges'
																class='form-control input-SmallText col-md-7-1'
																required='true' style='margin-left: 0%;' maxlength='150' 
																value='0'/>
														</div> -->
													</div>
												</div>

											</div>
											<div class="divide-10"></div>
											<div class="col-md-8-1"
												style="max-height: auto; padding-left: 15px;">

												<div class='col-sm-12-1'>
													<table class='table table-bordered table-condensed cf'
														style='width: 100%; margin-top: 10px;'>
														<thead class='cf'>
															<tr>
																<th class='col-md-1-1 center' style='height: 21.5px;'><div
																		class='TextFont'>#</div></th>
																<th class='col-md-1-1 center' style='height: 21.5px;'><div
																		class='TextFont'>Req-ID</div></th>
																<th class='col-md-4-1 center' style='height: 21.5px;'><div
																		class='TextFont'>Req Name</div></th>
																<th class='col-md-2-1 center' style='height: 21.5px;'><div
																		class='TextFont'>Req Code</div></th>
																<!-- <th class='col-md-2-1 center' style='height: 21.5px;'><div
																		class='TextFont'>Service Charges</div></th> -->
																<th class='numeric col-md-2-1 center'
																	style='height: 21.5px;'><div class='TextFont'>Edit</div></th>
																<th class='numeric col-md-2-1 center'
																	style='height: 21.5px;'><div class='TextFont'>Delete</div></th>
															</tr>
														</thead>
													</table>
												</div>
												<div class='col-sm-12-1'
													style='margin-top: -21px; border: 1px solid #ddd; overflow-y: scroll; height: 425px; max-height: auto;'>
													<table class='table table-striped table-condensed cf'>
														<tbody id="masterReqBody">

															<!-- <tr>
	<td class='col-sm-1-1 center' style='height: 21.5px;'></td>
	<td class='col-sm-1-1 center' style='height: 21.5px;'></td>
	<td class='col-sm-1-1 center' style='height: 21.5px;'>
	<button class='btn btn-xs btn-success' value='EDIT' id='btnEdit2' onclick='editModule({$T.stateList.state_id})'>
	<i class='fa fa-edit'></i>
	</button>
	<td class='col-sm-1-1 center' style='height: 21.5px;'>
	<button class='btn btn-xs btn-success' value='DELETE' id='btnDelete2' onclick='deleteState({$T.stateList.state_id})'>
	<i class='fa fa-trash-o'></i></button></td></tr> -->

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


				<!--Start #showSubModulesPopup Popup -->
				<div id="showSubModulesPopup" class="modal fade in">
					<!--End #showSubModulesPopup Popup -->
					<input id="objUserAccess" type="hidden" value="" />
				</div>
			</div>
		</c:if>
	</section>
	<%@include file="Footer.jsp"%>
	<input id="ReqCount" type="hidden" value="0" />	
</body>
</html>