<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Percentage Master</title>
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
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/jquery.validate.min.js"></script>
<script type="text/javascript"
	src="js/jquery-validate/additional-methods.min.js"></script>
<script type="text/javascript" src="js/validate.js"></script>
 <script type="text/javascript" src="js/professionalFees.js"></script>
 <script type="text/javascript" src="js/profees.js"></script>
 <script type="text/javascript" src="js/profeesAdvance.js"></script>
  <script type="text/javascript" src="js/profeesAdvance2.js"></script>
 <script type="text/javascript" src="js/ehat_billing.js"></script>
 <script type="text/javascript" src="ehat-design/js/select2/select2.min.js"></script>
 <!-- SELECT2 -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/select2/select2.min.css" />

<!-- /for Developers  -->

<!-- Auto-Suggestion 7/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<script src="js/UserAccess.js"></script>

<script>
	jQuery(document).ready(function() {
		App.setPage("PercentMaster"); //Set current page
		App.init(); //Initialise plugins and elements
		$(function() {
			$('[data-toggle="tooltip"]').tooltip();
		});

		//auto-suggestion in house doctors list
		//setAutoSuggestDocName("doctorName", "onload", "proFees");
		
		//getAllRecords1();
		//fetch all units and set on unitId
		
		//getAllDeptForDrPer();
		//getAllServicesForDrPer();
		//getDoctorsListForDrPer();
		getAllUnitForProfees();
	//	fetchDeptAndServices();
		//fetchPercentRecords("onload");
		
		//Dr.dept == hospspecialisation
	//	getHospSpecialization();//profeesAdvance.js
	getHospDepartmentOfDoctor(); // for Department of doc added Rohini 
	//	getAllChargesl();
		getAllChargeslave();
		fetchAllService();
		chargesSlaveHideShow();

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

				<%@include file="ehat_finance_leftmenu.jsp"%>
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
										<div class="page-header" style="margin-bottom: 15px">
											<ul class="breadcrumb col-md-12-1"
												style="padding: 4px 10px; margin-top: 1px;">
												<li>Date : <%=todays_date%></li>
												<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>
												</li>
												<li><a href="hisabDiagnostics.jsp">Diagnosis Finance</a></li>
												<li><a href="profees_percent_master2.jsp">Percentage Master</a></li>
												
												<div class="pull-right">
													<button class="btn btn-xs btn-success editUserAccess"
														id="saveBtn" value="Save Now" data-toggle="tooltip"
														data-placement="left" title="Save Module"
														onclick="savePercentMaster2()">
														<i class="fa fa-save"></i>
													</button>
													<button class="btn btn-xs btn-danger" data-toggle="tooltip"
														data-placement="left" title="Refresh"
														onclick="resetProfeesPercentMaster()">
														<i class="fa fa-refresh"></i>
													</button>
													<input type="button" class="btn btn-xs btn-success"
														style="font-size: 12px;" data-toggle="modal"
														data-target="#myModal" value="EDIT"
														onclick="fetchConfgDrDeptList('onclick')">
												</div>
											</ul>

										</div>
									</div>
								</div>
								<!-- /Common -->
								<!-- search charges master -->
								<!-- <div class="col-md-12-1" style="margin: 1%;">
									<div style="" class="col-md-1-1">
										<label class="TextFont"
											style="margin-left: 10%; margin-top: 3%; font-size: 11px;">Search
											By:</label>
									</div>
									<div class="col-md-1-1">
										<label class="TextFont"
											style="margin-left: 10%; margin-top: 3%;">Service
											Name:</label>
									</div>

									<div style="margin-top: 0px; margin-left: 1%" class="col-md-2-1 TextFont"
										id="divbyName">
										<input class="col-md-11-1" name="byName" type="text"
											onkeypress="setAutoCompleteForServiceMaster(this.id,'auto')"
											class="typeahead form-control input-SmallText " id="byName" />
									</div>

									<div class="col-md-1-1" style="text-align: center;">
										<input type="button" value="search"
											class="btn btn-xs btn-primary" id="searchCharges"
											onclick="setAutoCompleteForServiceMaster(this.id,'search')" />
									</div>
								</div> -->

								<!-- search charges master -->



								<!-- <div class="divide-20"></div> -->
								<div class="panel panel-default" >
									<div class="panel-body" >

										<form class="form-horizontal col-md-12" >
											<div class="divide-10"></div>
											<div class="row">
											<div class="col-md-2">
												<label><b>UNIT</b></label>
												<select id="unitId" class="form-control input-SmallText TextFont" 
												onchange="chargesSlaveHideShow()"
												 style="width: 100%;">
												</select>
												<!-- onchange="chargesSlaveHideShow()" -->
											</div>
											<div class="col-md-3">
											<label><b>Doctor Name<span style="color: red;">*</span></b></label>
												<input type="text" id="doctorName" 
												onkeyup="setAutoSugForDoctorList(this.id,'profees')"
												placeholder="Doctor Name" style="width: 100%;">
												<!-- onchange="callForEdit()" -->
											</div>
											<div class="col-md-2">
											<label><b>Doctor Id</b></label>
												<input type="text" id="txtDoctorId" value="0" placeholder="Doctor Id" 
												 readonly="readonly" style="width: 100%;">
											</div>
											<div class="col-md-2">
												<label><b>Dr.Department</b></label>
												<select id="drDeptId" class="form-control input-SmallText TextFont" style="width: 100%;">
												</select>
											</div>
											<div class="col-md-3" id="caseTypeDiv">
											<label><b>Case Type<span style="color: red;">*</span></b></label>
														&nbsp&nbsp<label style="margin-top: 10%;"><input name="refByRadio" 
														id="chkHospital" type="radio" name="refByRadio" checked="checked"
														value="1">Hospital</label>&nbsp&nbsp <label><input name="refByRadio"
														id="chkPrivate" type="radio" name="refByRadio"
														value="2">Private</label>
											</div>
												
											</div>
											<div class="row">
											<div class="form-group col-md-12" id="chargesSlaveDiv">
													<div class="form-group">
														<div class="col-md-12">
															<!-- <select class="col-md-8" name="listmstr"
																id="listmstr_select_chargesinfo" style="width: 180px;margin-top: 13px;margin-left: -33px"
																onchange="setDyanamicDivForChargesinfo('dynamicItemsinfo',this.id)">
																<option id="firstElmts2">--- Select Charges
																	Info ---</option>
															</select> -->
															
															<select class="col-md-8" name="listmstr"
																id="listmstr_select_chargesinfo" style="width: 180px;margin-top: 13px;margin-left: -33px"
																onchange="setDyanamicDivForChargesinfoProfees('dynamicItemsinfo',this.id)">
																<option id="firstElmts2">--- Select Charges
																	Info ---</option>
															</select>
															
															<div
																class="col-md-12 select2-container select2-container-multi "
																style="margin-top: 10px; width: 385px;">
																<ul id="dynamicItemsinfo" class="select2-choices"
																	style="overflow-y: scroll; min-height: 50px">
																</ul>
															</div>
															<div class="col-md-4" >
															<div class="col-md-6" style="margin-top: 5%;">
														<label><input name="refParentage" 
														id="parentage" type="radio"  checked="checked"
														value="parentage">Percentage</label></div>
														<!-- <div class="col-md-6" style="margin-top: 5%;"> <label><input name="refParentage"
														id="chkPrivate" type="radio" 
														value="rupay">Rupay</label>
														</div> -->
														</div>
														</div>
														</div>
													</div>
												</div>
											</div>
											<!-- <div class="row">
											<div class="divide-20"></div>
												<hr class="col-md-12">
											</div>
											<div class="divide-20"></div> -->
											<!-- <div class="row" style="overflow-y: auto;">
											
										
												<div style="width: 1500px;min-height: 300px">
													<table>

														<thead style="background-color: lightgray;"
															id=tHeadDeptTable>

														</thead>

														<tbody id=tBodyServiceTable>

														</tbody>
													</table>
												</div>
											</div> -->
											
											<hr>
											<div id="tableDiv" class="col-md-12-1" style="height: 430px;overflow: auto;">
											<div class="box border blue">
												<div class="box-body">
											<table class="table table-striped">
												<thead id="tHeadDeptTable">
													<!-- <tr>
														<th>Services</th>
																<th>View <label class="checkbox-inline"> <input
																		type="checkbox" id="viewAll" onchange="selectAll('viewAll')">
																</label></th>
																<th>Create/Edit <label class="checkbox-inline"> <input
																		type="checkbox" id="editAll" onchange="selectAll('editAll')">
																</label></th>
														<th>Delete <label class="checkbox-inline"> <input
																		type="checkbox" id="deleteAll" onchange="selectAll('deleteAll')">
																</label></th>
														<th>Sub-Services</th>
													</tr> -->
												</thead>
												<tbody id="moduleBody">
												</tbody>
											</table>
											</div>
											</div>
										</div>
											
										</form>
										
									</div>
								</div>
								<!-- <div class="panel panel-default">
									<div class="panel-body">
									
										<form class="form-horizontal col-md-12" >
										<div class="row" style="overflow-y: auto;">
										<div class="divide-10"></div>
										<table class="col-md-12" >
										<thead style="background-color: lightgray;"><th class="col-md-1">SR.NO</th>
												<th class="col-md-3">Doctor Name</th>
												<th class="col-md-1">Doctor Id</th>
												<th class="col-md-3">Unit Name</th>
												<th class="col-md-1">Unit Id</th>
												<th class="col-md-1">Case Type</th>
												<th class="col-md-1">Edit</th>
												<th class="col-md-1">Delete</th>
										</thead>
										<tbody id=listOfRecordsPerBody></tbody>
										</table>
										</div>
										</form>
										
									</div>
								</div> -->
							</div>
						</div>
					</div>
				</div>

				<!-- Modal popu for edit -->
				<div class="modal fade" id="myModal" role="dialog" class="popup">
					<div class="modal-dialog">

						<!-- Modal content-->
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal">&times;</button>

								<h4 class="modal-title">Percentage Master</h4>
							</div>
							<div class="modal-body">

								<!--  -->

								<!-- <div id="divLinePopup" class=" box border col-md-12"
												style="margin-left: 0%; margin-top: -1%;"> -->
								<form class="form-horizontal col-md-12" style="margin-top: 0%;">
									<!--tabs for combination and hall wise and sponsor wise charges  -->
									<div class="col-md-12 box">

										<div style="height: 20px;">
											<div class="panel-body">
												<div class="tabbable">
													<ul class="nav nav-tabs">
														<li class="active" id="confgDrDeptsListconfgDrDeptsList"><a
															onclick="fetchConfgDrDeptList('onclick');"
															data-toggle="tab" style="cursor: pointer"><i
																class="fa fa-user-md"></i> Dr.Departments</a></li>

														<li id="confgDrPersonalList"><a
															onclick="fetchConfgDrPersonalList('doctorPersonal','onclick');"
															data-toggle="tab" style="cursor: pointer"><i
																class="fa fa-user-md"></i>Self Doctor Pers.Percent</a></li>
																
														<li id="confgDrPersonalListsp"><a
															onclick="fetchConfgDrPersonalList('doctorPersonalSponser','onclick');"
															data-toggle="tab" style="cursor: pointer"><i
																class="fa fa-user-md"></i>Sponser Doctor Pers.Percent</a></li>
																
																
														<li id="confgroupDrPersonalList"><a onclick="fetchConfgDrPersonalList('groupPersonal','onclick');"
															data-toggle="tab" style="cursor: pointer"><i
																class="fa fa-user-md"></i> Group Pers.Percent</a></li>
														<!-- <li><a onclick="getConfigurationdata('hallwise')"
															data-toggle="tab" style="cursor: pointer"><i
																class="fa fa-user-md"></i> Hall Wise</a></li> -->

													</ul>
													<!-- <div class="tab-content">
													<div class="tab-pane fade in active" id="cashReceipts">

													</div>													
												</div> -->
												</div>
											</div>
										</div>

									</div>
									<!--  -->
									<div class="divide-20"></div>
									<div class="col-md-12">
										<div class="row">
											<div class="form-group col-md-12-1"
												style="margin-left: 1%; margin-top: 0%; margin-right: 1%; margin-bottom: 1%;">
												<div class="box border blue">
													<div class="box-title">
														<h4 id="">
															<i class="fa fa-table"></i>List Of Record's

														</h4>
														<div class="pull-right">
															<input class="form-control input-sm" id="byName2"
																onkeyup="dynamicSearch('search')" type="text"
																placeholder="Search" aria-controls="datatable1">
														</div>
													</div>
													<!-- <div ></div> -->
													<div class="box-body" style="height: 320px;">
														<div class='col-sm-12-1'
															style='height: 298px; overflow-y: scroll; border: 0px solid #ddd; margin-top: -1px;'>
															<table id="popupDiv"
																class="datatable table table-bordered ">


															</table>
														</div>

													</div>
												</div>
											</div>
										</div>
									</div>

								</form>
								<!-- 	</div> -->

							</div>
							<div class="modal-footer">
								<!-- <button type="button" class="btn btn-default"
								data-dismiss="modal">Close</button> -->
							</div>
						</div>

					</div>
				</div>
				<!-- Modal popu for edit -->

				<!--Start #showSubModulesPopup Popup -->
				<div id="showSubModulesPopup" class="modal fade in">
					<!--End #showSubModulesPopup Popup -->
					<input id="objUserAccess" type="hidden" value="" />
					<input id="callFrom" type="hidden" value="insert" />
					<input id="listSize" type="hidden" value="0" />
					<input id="tabNo" type="hidden" value=1 />
					
					<input id="subHiddenId" type="hidden" value=0 />					
					<input id="subserviceHiddenIdvalue" type="hidden" value="off" />
					
					<input type="hidden" id="uId" value="<%=session.getAttribute("uId")%>">
				</div>
			</div>
			<div id="pleaseWait" style="text-align: center; display: none;">
				<img style="margin-top: 250px;" height="43px"
					src="images/loading_black.gif" />
				<div style="margin-top: 10px; color: white">
					<b>Please wait...</b>
				</div>
			</div>
		</c:if>
	</section>
	<%@include file="Footer.jsp"%>
</body>
</html>