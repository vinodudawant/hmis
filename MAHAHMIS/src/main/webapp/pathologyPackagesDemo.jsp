<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Pathology Packages Advanced</title>
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

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<!-- Touheed 
	code for Drag and Drop with sorting 
	Date  14-Dec-2015
  -->
<!-- <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.4/jquery.min.js"></script> -->
<script src='js/jquery.sortable.js'></script>
<!-- Touheed 
	code for Drag and Drop with sorting 
  -->



<!-- Auto-Suggestion 2/1/2015-->
<script src="auto/jquery.mockjax.js"></script>
<script src="auto/bootstrap-typeahead.js"></script>


<script>
	jQuery(document).ready(function() {
		App.setPage("PathologyPackages"); //Set current page
		App.init(); //Initialise plugins and elements
		$(function () {
			  $('[data-toggle="tooltip"]').tooltip();
		})

	});
</script>

<script type="text/javascript">
	onload = function() {
		$("#pathManagement").addClass("anchorActive");
		getPackages("onload");
		getAllHeading("onload" ,"onPkgAdd");
		autoSuggestionForLab("byName", "onload","pathologyPackages");
		$("#headingCall").val(0);
		
	}
</script>
</head>
<body>

	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>

	</c:if>
	<c:if test="${sessionScope.userType != null }">

		<%-- <div id="footer1" style="text-align: right;"><%@include
			file="Session_Info.jsp"%></div> --%>
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
											<li><a href="PathologyPackages.jsp">Pathology
													Management</a></li>
											<li><a href="PathologyPackages.jsp">Lab Packages</a></li>
											<div class="li pull-right">
												 <button class="btn btn-xs btn-success" style="data-keyboard="false" 
												 title="Add Lab Package"
												data-backdrop="static" data-target="#popPackage" data-toggle="modal" 
												type="button">
												<i class = "fa fa-plus"></i>
												</button>
											</div>
										</ul>
									</div>
								</div>
							</div>
							<!-- /Common -->

							<div class="col-md-12-1">
								<div style="" class="col-md-1-1">
									<label class="TextFont"
										style="margin-left: 20%; margin-top: 3%; font-size: 11px;">Search
										By:</label>
								</div>
								<div class="col-md-2-1">
									<label class="TextFont"
										style="margin-left: 30%; margin-top: 3%;"> Package
										Name:</label>
								</div>

								<div style="" class="col-md-2-1 TextFont" id="divbyName">
									<input id="byName" class="typeahead form-control input-SmallText" 
									type="text" placeholder="-Select-" style="width: 200px;" name="byName"
									onkeypress = "SearchPathologyOnEnter(event,'searchPkg')" />
										</div>
								<div class="col-md-1-1" style="text-align: center;">
									<input type="button" value="search"
										class="btn btn-xs btn-primary" onclick="getPackages('searchPkg')" />
								</div>
							</div>

							<div class="divide-20"></div>
							<div class="panel panel-default">
								<div class="panel-body" class="col-md-12-1">
									<div class="col-md-12-1" id="userMangTempPakDemo"
										style="max-height: auto;"></div>
									
								</div>
							</div>



						</div>
					</div>
				</div>


				<div id="popPackage" class="modal fade in" tabindex="-1">
									<div class="modal-dialog">
										<div class="modal-content col-md-12"
											style="margin-top: 0px; margin-left: 0px;">
												<div class="modal-header">	
													<h4 id="testHead">Add Lab Package</h4>
												
													<div style="margin-top: -30px;">
														<button class="btn btn-xs btn-success"
															style="margin-left: 690px;"
															onclick="savePackagesDemo();">Save</button>
														<button id="cancel" class="btn btn-xs btn-default"
															data-dismiss="modal" onclick="redirectPackage();">Cancel</button>
													</div>
												</div>
												
												<div class="modal-body">
													
													<div class="form-group col-md-6-1" style='padding-left: 15px;'>
														<div class='form-group Remove-Padding col-md-12-1'
															style='padding-right: 8px; margin-top: 9px;'>
															<div class='divide-10'></div>
															<label class='TextFont col-md-4-1' for='Heading Name'>Heading
																Name:<b style='color: red; padding-left: 3px;'>*</b>
															</label> <select id='heading' name='heading'
																onchange="featchProAndTest(0,'pkg')"
																class='form-control input-SmallText col-md-7-1'
																style='margin-left: 0%;'></select>
														</div>
														<div class='form-group Remove-Padding col-md-12-1'
															style='padding-right: 8px; margin-top: 13px;'>
															<div class='divide-10'></div>
															<label class='TextFont col-md-4-1' for='Package Name'>Package
																Name<b style='color: red; padding-left: 3px;'>*</b>
															</label> <input id='proNm' name='proNm' type='text'
																placeholder='Package Name' maxlength="45"
																class='form-control input-SmallText col-md-7-1'
																style='margin-left: 0%;' maxlength='150' /> <input
																type='hidden' id='idPro' value='0'>
														</div>
													</div>
													
													
													<div class="form-group col-md-6-1" style='padding-left: 15px;'>
														<div class='form-group Remove-Padding col-md-12-1'
															style='padding-right: 8px; margin-top: 13px;'>
															<div class='divide-10'></div>
															<label class='TextFont col-md-4-1' for='Package Code'>Package
																Code<b style='color: red; padding-left: 3px;'>*</b>
															</label> <input id='proCode' name='proCode' type='text'
																placeholder='Package Code' maxlength="45"
																class='form-control input-SmallText col-md-7-1'
																style='margin-left: 0%;' maxlength='150' />
														</div>
								
														<div class='form-group Remove-Padding col-md-12-1'
															style='padding-right: 8px; margin-top: 13px;'>
															<div class='divide-10'></div>
															<label class='TextFont col-md-4-1' for='Package Charges'>Package
																Charges:<b style='color: red; padding-left: 3px;'>*</b>
															</label> <input id='proCharge' name='proCharge' type='text'
																placeholder='Package Charges'
																onkeypress="return validateNumbers(event)"
																class='form-control input-SmallText col-md-7-1'
																style='margin-left: 0%;' maxlength='6' /> 
																<input type='hidden' id='queryType' value='insert' />
														</div>
														</div>
														
														<div class="form-group col-md-6-1" style='padding-left: 15px;'>
														<div class='form-group Remove-Padding col-md-12-1'
															style='padding-right: 8px; margin-top: 13px;'>
															<div class='divide-10'></div>
															<label class='TextFont col-md-4-1' for='Motivator Cash'>Motivator Cash <!-- <b style='color: red; padding-left: 3px;'>*</b> -->
															</label> <input id='motivatorCash' name='motivatorCash' type='text'
																placeholder='Motivator Cash' value="0"
																onkeypress="return validateNumbers(event)"
																class='form-control input-SmallText col-md-7-1'
																style='margin-left: 0%;' maxlength='6' /> 
														</div>
														</div>
														<div class="form-group col-md-6-1" style='padding-left: 15px;'>
														<div class='form-group Remove-Padding col-md-12-1'
															style='padding-right: 8px; margin-top: 13px;'>
															<div class='divide-10'></div>
															<label class='TextFont col-md-4-1' for='Motivator Sponsored'>Motivator Sponsored <!-- <b style='color: red; padding-left: 3px;'>*</b> -->
															</label> <input id='motivatorSponsored' name='motivatorSponsored' type='text'
																placeholder='Motivator Sponsored' value="0"
																onkeypress="return validateNumbers(event)"
																class='form-control input-SmallText col-md-7-1'
																style='margin-left: 0%;' maxlength='6' /> 
														</div>
														</div>
														
														
																<!-- // nEWLY aDDED START -->
														<div class="form-group col-md-6-1" style='padding-left: 15px;'>
															<div class='form-group Remove-Padding col-md-12-1'
																style='padding-right: 8px; margin-top: 13px;'>
															<div class="divide-10"></div>
																<label class="TextFont col-md-4-1" for='Interpretation'>Interpretation :
																</label>
																<textarea id="txtPkgInterpretation" name="txtPkgInterpretation" style="margin-left:0%;" 
																class="form-control col-md-7-1" placeholder="Interpretation" >
																</textarea>
															</div>
														</div>	
															
														<div class="form-group col-md-6-1" style='padding-left: 15px;'>
															<div class='form-group Remove-Padding col-md-12-1'
																style='padding-right: 8px; margin-top: 13px;'>	
																<div class="divide-10"></div>
																<label class="TextFont col-md-4-1" for='Comments'>Comments :</label>
																<textarea id="txtPkgComments" name="txtPkgComments" style="margin-left:0%;"  
																	class='form-control col-md-7-1'  placeholder="Comments" >
																</textarea>
															</div>
														</div>	
														<!-- 	// NEWLY ADDED END -->
															
														<div class="form-group col-md-6-1" style='padding-left: 15px;'>
														<div class='form-group Remove-Padding col-md-12-1'
															style='padding-right: 8px; margin-top: 13px;'>
															<div class='divide-10'></div>
															<label class='TextFont col-md-4-1' for='Clinic %'>Clinic %
															</label> <input id='txtClinicPercent' name='txtClinicPercent' type='text'
																placeholder='Clinic %'
																onkeypress="return validateNumPer(event)"
																class='form-control input-SmallText col-md-7-1'
																style='margin-left: 0%;' maxlength='6' /> 
														</div>
												</div>
												<div class="form-group col-md-6-1" style='padding-left: 15px;'>
														<div class='form-group Remove-Padding col-md-12-1'
															style='padding-right: 8px; margin-top: 13px;'>
															<div class='divide-10'></div>
															<label class='TextFont col-md-4-1' >Search By: Test Name:
															</label> <input id='strValue1' name='strValue1' type='text'
																class='inpSearchBox form-control input-SmallText col-md-5-1'
																style='margin-left: 0%;' />
																<button type="button" value="search"
																	class="btn btn-xs btn-primary col-md-2-1" 
																	onclick="searchProAndTest('pkg')"
																		style='margin-left: 1%;'
															id="inpSearchBtn"><i class="fa fa-search"></i></button>
														</div>
														</div>
												<div class="divide-40"></div>
												<div class="divide-20"></div>
												
												<div class="divide-40"></div>
												<div class="divide-40"></div>
												<div class="separator" style="margin-top: 12%;"></div>
								
										<div class="form-group col-md-12-1">
												<div class="form-group col-md-5-1" style="margin-left: 3%;">
												<div class="box border primary">
													 <div class="box-title">
														<h4 id="">
															<i class="fa fa-table"></i>Profiles & Tests
														</h4>
													</div> 

													<div class="box-body" style="height: 300px;">
														<div class='col-sm-12-1' style="margin-top: 1%;">
															<table class='table table-bordered' style='width: 100%;'>
																<thead class='cf'>
																	<tr>
																		<th class='col-md-1-1 center' style='height: 21.5px;'><div
																				class='TextFont'>#</div></th>
																		<th class='col-md-11-1 center' style='height: 21.5px;'><div
																				class='TextFont'>Test Name</div></th>
																	</tr>
																</thead>
															</table>
														</div>
														<div class="col-md-12-1" id="leftDiv"
															style='height: 250px; overflow-y: scroll; border: 1px solid #ddd; margin-top: -21px;'>
														</div>
													</div>
												</div>
											</div>	
					
					
												<div class="form-group col-md-5-1" style="margin-left: 8%;">
												<div class="box border blue">
													<div class="box-title">
														<h4 id="">
															<i class="fa fa-table"></i>Package Profiles & Tests
															
														</h4>
														<div class="pull-right">
															<label id="newVitals" style="cursor: pointer;" onclick="addHeadingPopup()">
																	<i class="fa fa-plus-square"></i>
																	Add Heading
																</label>
														</div>
													</div>
													<div class="box-body" style="height: 300px;">
														<div class='col-sm-12-1' style="margin-top: 1%;">
															<table class='table table-bordered' style='width: 100%;'>
																<thead class='cf'>
																	<tr>
																		<th class='col-md-1-1 center' style='height: 21.5px;'><div
																				class='TextFont'>#</div></th>
																		<th class='col-md-11-1 center' style='height: 21.5px;'><div
																				class='TextFont'>Test Name</div></th>
																		<!-- <th class='col-md-4-1 center' style='height: 21.5px;'><div
																				class='TextFont'>Amount</div></th> -->
																	</tr>
																</thead>
															</table>
														</div>
														<div class="col-md-12-1" id="rightDiv"
															style='height: 250px; overflow-y: scroll; border: 1px solid #ddd; margin-top: -21px;'>
														</div>
													</div>
												</div>
											</div>
										</div>
				
													
										</div>
									</div>
				</div>
				<!-- <div id="addViewProfileTemp" style="display: none;">
					
				</div> -->

					<div id="editViewLabProfileTemp" style="display: none;">
						<div class="form-group col-md-12-1" style='padding-left: 15px;'>
							<h3>Edit Package</h3>
						</div>
						<div class="form-group col-md-6-1" style='padding-left: 15px;'>
							<div class='form-group Remove-Padding col-md-12-1'
								style='padding-right: 8px; margin-top: 9px;'>
								<div class='divide-10'></div>
								<label class='TextFont col-md-4-1' for='Heading Name'>Heading
									Name:<b style='color: red; padding-left: 3px;'>*</b>
								</label> <select id='heading' name='heading'
									onchange="featchProAndTest(0,'pkg')"
									class='form-control input-SmallText col-md-7-1'
									style='margin-left: 0%;'></select>
							</div>
							<div class='form-group Remove-Padding col-md-12-1'
								style='padding-right: 8px; margin-top: 13px;'>
								<div class='divide-10'></div>
								<label class='TextFont col-md-4-1' for='Package Name'>Package
									Name<b style='color: red; padding-left: 3px;'>*</b>
								</label> <input id='proNm' name='proNm' type='text'
									placeholder='Package Name' value="{$T.pkgnm}" maxlength="45"
									class='form-control input-SmallText col-md-7-1'
									style='margin-left: 0%;' maxlength='150' /> <input
									type='hidden' id='idPro' value="{$T.idlbpkg}">
							</div>
						</div>
						<div class="form-group col-md-6-1" style='padding-left: 15px;'>
							<div class='form-group Remove-Padding col-md-12-1'
								style='padding-right: 8px; margin-top: 13px;'>
								<div class='divide-10'></div>
								<label class='TextFont col-md-4-1' for='Package Code'>Package
									Code<b style='color: red; padding-left: 3px;'>*</b>
								</label> <input id='proCode' name='proCode' type='text'
									placeholder='Package Code' value="{$T.pkgcod}" maxlength="45"
									class='form-control input-SmallText col-md-7-1'
									style='margin-left: 0%;' maxlength='150' />
							</div>

							<div class='form-group Remove-Padding col-md-12-1'
								style='padding-right: 8px; margin-top: 13px;'>
								<div class='divide-10'></div>
								<label class='TextFont col-md-4-1' for='Package Charges'>Package
									Charges:<b style='color: red; padding-left: 3px;'>*</b>
								</label> <input id='proCharge' name='proCharge' type='text'
									placeholder='Package Charges' value="{$T.pkgchrg}"
									onkeypress="return validateNumbers(event)"
									class='form-control input-SmallText col-md-7-1'
									style='margin-left: 0%;' maxlength='6' /> <input type='hidden'
									id='queryType' value='update' />
							</div>
						</div>
						<div class="col-md-12-1" style="margin-top: 10px;">
							<div style="" class="col-md-1-1">
								<label class="TextFont"
									style="margin-left: 20%; margin-top: 3%; font-size: 11px;">Search
									By:</label>
							</div>
							<div class="col-md-2-1">
								<label class="TextFont"
									style="margin-left: 30%; margin-top: 3%;"> Test Name:</label>
							</div>

							<div style="margin-top: 0px;" class="col-md-3-1 TextFont">
								<input class="col-md-12-1" name="strValue1" type="text"
									class="inpSearchBox form-control input-SmallText "
									id="strValue1" onkeypress="return validatealphabetic(event)" />
							</div>
							<div class="col-md-1-1" style="text-align: center; margin-left: 20%;">
								<input type="button" value="search"
									class="btn btn-xs btn-primary"
									style="margin-left: 20%;"
									onclick="searchProAndTest('pkg')" id="inpSearchBtn" />
							</div>
						</div>

						<div class="divide-40"></div>
						<div class="divide-40"></div>
						<div class="divide-40"></div>
						<div class="divide-40"></div>
						<div class="divide-40"></div>
						<div class="form-group col-md-12-1">

							<div class="form-group col-md-5-1" style="margin-left: 3%;">
								<div class="box border">
									<div class="box-title">
										<h4 id="">
											<i class="fa fa-table"></i>Profiles & Tests
										</h4>
									</div>
									<div class="box-body" style="height: 200px;">
										<div class='col-sm-12-1' style="margin-top: 1%;">
											<table class='table table-bordered' style='width: 100%;'>
												<thead class='cf'>
													<tr>
														<th class='col-md-1-1 center' style='height: 21.5px;'><div
																class='TextFont'>#</div></th>
														<th class='col-md-11-1 center' style='height: 21.5px;'><div
																class='TextFont'>Test Name</div></th>
													</tr>
												</thead>
											</table>
										</div>
										<div class="col-md-12-1" id="testDiv"
											style='height: 148px; overflow-y: scroll; border: 1px solid #ddd; margin-top: -21px;'>
										</div>
									</div>
								</div>
							</div>
							<div class="form-group col-md-5-1" style="margin-left: 8%;">
								<div class="box border">
									<div class="box-title">
										<h4 id="">
											<i class="fa fa-table"></i>Package Profiles & Tests
										</h4>
									</div>
									<div class="box-body" style="height: 200px;">
										<div class='col-sm-12-1' style="margin-top: 1%;">
											<table class='table table-bordered' style='width: 100%;'>
												<thead class='cf'>
													<tr>
														<th class='col-md-1-1 center' style='height: 21.5px;'><div
																class='TextFont'>#</div></th>
														<th class='col-md-7-1 center' style='height: 21.5px;'><div
																class='TextFont'>Test Name</div></th>
														<th class='col-md-4-1 center' style='height: 21.5px;'><div
																class='TextFont'>Amount</div></th>
													</tr>
												</thead>
											</table>
										</div>
										<div class="col-md-12-1" id="assignTestDiv"
											style='height: 148px; overflow-y: scroll; border: 1px solid #ddd; margin-top: -21px;'>
										</div>
									</div>
								</div>
							</div>

						</div>
					</div>
				</div>


				<div id="testHeadingTemp" style="display: none;">
					{#foreach $T.tli as tli}
					<div style="width: 100%; border-bottom: 1px solid #b8b8b8;"
						id="TimeslotTD">
						<div
							style="width: 5.3%; padding-left: 1%; padding-right: 1%; padding-top: 2px; border-right: 1px solid #b8b8b8; height: 24px;">{count}.</div>
						<div
							style="width: 55.8%; padding-left: 1%; padding-right: 1%; padding-top: 2px; border-right: 1px solid #b8b8b8; height: 24px;"
							id="txtTestNm{count}">{$T.tli.tnm}</div>
						<div
							style="width: 11.3%; padding-left: 1%; padding-right: 1%; padding-top: 2px; border-right: 1px solid #b8b8b8; height: 24px;"
							id="testCode{count}">{$T.tli.tcd}</div>
						<div
							style="width: 12.5%; padding-left: 1%; padding-right: 1%; padding-top: 2px; border-right: 1px solid #b8b8b8; height: 24px;"
							id="testCharge{count}">{$T.tli.trt}</div>
						<div
							style="width: 1%; padding-top: 2px; height: auto; margin-left: 3px">
							<input id="checkbox{count++}" type="checkbox"
								value="{$T.tli.tid}" />
						</div>
					</div>
					{#/for}<input type="hidden" id="testRowCount" value="{--count}" /><input
						type="hidden" id="testCount" value="1" /> <input type="hidden"
						id="profileCount" value="1" />
				</div>


				<div style="display: none;" id="pathologyPackagesTemp">
					{#foreach $T.lbHedLi[0].lbProLi as lbProLi}
					<div style='width: 100%; margin-top: 20px;'
						id="proDiv{$T.lbProLi.proId}">
						<div class="col-sm-12-1"
							style='border-bottom: 1px solid #b8b8b8; border-top: 0px solid #b8b8b8; padding-bottom: 5px;'
							id="proIdDiv{$T.lbProLi.proId}">
							<div class="divide-20"></div>
							<div class="col-sm-1-1"
								style='text-align: center; padding-top: 5px;'>
								<input type="checkbox" value="{$T.lbProLi.proId}"
									id="procheck{$T.lbProLi.proId}"
									onclick="sendProToAsignPkg({$T.lbProLi.proId})" />
							</div>
							<div class="col-sm-10-1"
								style='padding-left: 1%; padding-top: 5px; text-align: left;'
								id="ProCodNm{$T.lbProLi.proId}">{$T.lbProLi.proCode} -
								{$T.lbProLi.proNm}</div>
							<input type="hidden" id="ProCodCharge{$T.lbProLi.proId}"
								value="{$T.lbProLi.proChr}" />
						</div>
						{#param name=x value=1} {#foreach $T.lbProLi.protestLi as protestLi}
						<div class="col-sm-12-1"
							style='width: 94%; float: right; margin-top: 0px; padding-bottom: 5px; border-bottom: 1px solid #b8b8b8; border-left: 1px solid #b8b8b8; border-top: 0px solid blue;'
							id="proTestDiv-{$T.protestLi.testId}-{$T.lbProLi.proId}">
							<div class="divide-10"></div>
							<div class="col-sm-1-1"
								style='text-align: center; padding-top: 5px;'>
								<input type="checkbox" value="{$T.protestLi.testId}"
									id="proTestcheck-{$T.protestLi.testId}-{$T.lbProLi.proId}"
									id="proTestcheck{$T.lbProLi.proId}" />
							</div>
							<div class="col-sm-10-1"
								style='padding-left: 1%; padding-top: 5px; text-align: left;'
								id='proTestNm-{$T.protestLi.testId}-{$T.lbProLi.proId}'>
								{$T.protestLi.tstCod} - {$T.protestLi.tstNm}</div>
							<input type='hidden'
								id='proTestCharge-{$T.protestLi.testId}-{$T.lbProLi.proId}'
								value='{$T.protestLi.tstRt}' />
						</div>
						<input type="hidden" value="{$T.protestLi.testId}"
							id="ProTestId-{$T.lbProLi.proId}-{$P.x++}" /> {#/for} <input
							type="hidden" id="proTestCount{$T.lbProLi.proId}"
							value="{--$P.x}" />
					</div>
					{#/for} {#foreach $T.lbHedLi[0].lbTestLi as lbTestLi}
					<div class="col-sm-12-1"
						style='width: 100%; border-bottom: 1px solid #b8b8b8; padding-bottom: 5px; margin-top: 10px;'
						id="testDiv{$T.lbTestLi.tid}">
						<div class="col-sm-1-1"
							style='text-align: center; padding-top: 5px;'>
							<input type="checkbox" value="{$T.lbTestLi.tid}"
								id="testcheck{$T.lbTestLi.tid}"
								onclick="sendTestToAsignPkg({$T.lbTestLi.tid})" />
						</div>
						<div class="col-sm-10-1"
							style='padding-left: 1%; padding-top: 5px; text-align: left;'
							id="testNm{$T.lbTestLi.tid}">
							{$T.lbTestLi.tcd} - {$T.lbTestLi.tnm} <input type="hidden"
								id="testCharge{$T.lbTestLi.tid}" value="{$T.lbTestLi.trt}" />
						</div>
					</div>
					{#/for}
				</div>





				<%@include file="Footer.jsp"%></div>
		</div>
		<div id="userObj" style="display: none;"></div>
		<div id="allHeadingDiv" style="display: none;"></div>
		<input id="userID" type="hidden" value="0">
		<input id="edit" type="hidden" value="0">
		<div id="testDetails" style="display: none;"></div>
		
		<div id="pakpro" style="display: none;"></div>
		
		<input id="headingCall" type="hidden" value="0">
		
			
	</c:if>
	
	<div id="ipopHead" class="modal fade in" tabindex="-1">
				<div class="modal-dialog">
					<div class="modal-content col-md-5-1"
						style="margin-top: 200px; margin-left: 250px;">
						
						
						<div class="modal-header">
						
							 <div class='col-md-9-1 '>
								<h4 id="testHead" style="margin-top: 0px;">Please Enter
									Heading Name:</h4>
							</div>
							
							<div class='col-md-3-1 '>
								<div class="pull-right">
									<button class="btn btn-xs btn-success"
										style="margin-top: 0px; margin-left: 0px;"
										
										data-placement="left" title="Add Heading"
										onclick="addHeadingAsRow('package');">
										<i class="fa fa-plus-square"></i>
									</button>
									<button class="btn btn-xs btn-danger" data-toggle="tooltip" title="Close"
										data-dismiss="modal" type="button"
										style="margin-top: 0px;; margin-left: 0px"
										onclick="addHeadingPopupHide()">
										<i class="fa  fa-times"></i>
									</button>
									
								
								</div>
							</div>
						</div>

						<div class="modal-body">
							<div class='col-md-4-1 '>
								<label class="TextFont">Heading Name:</label>
							</div>
							<div class='col-md-6-1 center'>
									 <input type='text' style="width: 100%;"
									name='headingNamePck' id='headingNamePck' maxlength='200' placeholder="Heading Name" />
							</div>
						</div>

					</div>
				</div>
			</div>
</body>
</html>