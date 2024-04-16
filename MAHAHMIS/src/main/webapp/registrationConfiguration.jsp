<%-- <%@page import="org.json.simple.JSONObject"%> --%>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Registration Charges Configuration</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<link rel="stylesheet" type="text/css" href="css/bootstrap-chosen.css" />

<%@include file="inv_header.jsp"%>

</head>
<body>
	<c:if test="${ sessionScope.userType != null }">
	
		<%
			java.util.Calendar currentDate = java.util.Calendar.getInstance();
			java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("dd-MM-yyyy");
			String todays_date = formatter.format(currentDate.getTime());
		%>
	
		<!-- HEADER -->
		<header class="navbar clearfix" id="header">
			<%@include file="Menu_Header_Nobel.jsp"%>
		</header>
		<!--/HEADER -->

		<!-- PAGE -->
		<section id="page">
			<!-- SIDEBAR -->

			<%@include file="left_menu_admin.jsp"%>

			<!-- /SIDEBAR -->
			<div id="main-content">

				<div class="container">
					<div class="row">
						<div id="content" class="col-lg-12">
							<!-- PAGE HEADER-->
							<div class="row">
								<div class="col-sm-12">
									<div class="page-header">
										
										<!-- BREADCRUMBS -->
										<ul class="breadcrumb">
											<li>Date : <%=todays_date%></li>
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a>	</li>
											<li><i class="fa fa-home"></i> <a href="registrationConfiguration.jsp">Registration Charges Configuration</a></li>
											
											<div class="pull-right">
																							
												<button class="btn btn-xs btn-success editSubService"
													id="saveBtn" value="Save Now" data-toggle="tooltip"
													data-placement="left" title="Save Master"
													onclick="saveConfigurationRegistrationService()">
													<i class="fa fa-save"></i>
												</button>
												<button class="btn btn-xs btn-danger" data-toggle="tooltip"
													data-placement="left" title="Refresh"
													onclick="reload()">
													<i class="fa fa-refresh"></i>
												</button>
												<!-- Edit Button for Configuratio -->
												<input type="button" class="btn btn-xs btn-success"
													style="font-size: 12px;" data-toggle="modal"
													data-target="#myModal" value="EDIT"
													onclick="fetchConfigurationRegistrationChargeList()">
												<!-- Edit Button for Configuratio -->

												<!-- Apply Button for Configuratio -->
												<!-- <input type="button" id="apply"
													class="0btn btn-xs btn-success" style="font-size: 12px;"
													onclick="apply()" value="APPLY"> -->
													
												
											</div>
											
											<!-- <div class="pull-right">
												
												<a class="col-md-4"><label class="control-label"> YearWise</label>
												   <input type="checkbox" value="Y" id="yearwise" onclick="hideAllDiv(this.id)">
												</a>
												
												<a class="col-md-8">
													<form name="importConfigurationForm" id="importConfigurationForm">
														<div class="col-sm-6">
															<input required id="importFile" name="file" type="file">
														</div>
														<div class="col-sm-4">
															<input class="btn btn-xs btn-info editUserAccess"
																onclick="importConfigurationExcel();" value="Start Import"
																type="submit">
														</div>
													</form>
												</a>
												
											</div> -->
										</ul>
										<!-- /BREADCRUMBS -->

									</div>
								</div>
							</div>

							<div id="divLine1" class="box border col-md-12" style="padding: 10px">

								<form class="form-horizontal col-md-12">

									<div class="col-md-4">
										<div class="row">
											<!-- ---------Touheed Plugin Multi select Plugin-------------- -->
											<label class="TextFont">Select Sponsor</label>
											<!-- <div id="" class="form-group Remove-Padding col-md-12">

												<div class="form-group">
													<div class="col-md-8">
														<select name="listmstr" id="listmstr_select_service" class="col-md-12"
															onchange="setDyanamicDivForCharges('dynamicItems',this.id)">
															<option id="firstElmts" value="0">--- Select Charges ---</option>
														</select>														
													</div>
												</div>

												<div class="col-md-12 select2-container select2-container-multi ">
													<ul id="dynamicItems" class="select2-choices" style="overflow-y: scroll;height: 40px"></ul>
												</div>

											</div> -->
											
											<div id="" class="form-group Remove-Padding col-md-12">

												<div class="form-group">
													<div class="col-md-8">
														<select name="listmstr" id="listmstr_select_service" class="col-md-12"
															onchange="fetchMulSuperSlaveOnChargesConfiguration(this.value)">
															<option id="firstElmts" value="0">--- Select Charges ---</option>
														</select>														
													</div>
												</div>

												<div class="col-md-12 select2-container select2-container-multi ">
													<ul id="dynamicItems" class="select2-choices" style="overflow-y: scroll;height: 40px"></ul>
												</div>

											</div>
											<!-- ---------Touheed Plugin Multi select Plugin-------------- -->
										</div>
									</div>
									
									<div class="col-md-4">
										<div class="row">
											<!-- ---------Touheed Plugin Multi select Plugin-------------- -->
											<label class="TextFont">Select Hall Charges</label>
											<div class="form-group Remove-Padding col-md-12">

												<div class="form-group">

													<div class="col-md-8">
														<select name="listmstr" id="listmstr_select_Hall"  class="col-md-12"
															onchange="setDyanamicDivForCharges2('dynamicItems2',this.id)">
															<option id="firstElmts2">--- Select Hall wise Charges ---</option>
														</select>
													</div>
												</div>

												<div class="col-md-12 select2-container select2-container-multi ">
													<ul id="dynamicItems2" class="select2-choices"	style="overflow-y: scroll;height: 40px"></ul>
												</div>

											</div>
										</div>
									</div>

									<div class="col-md-4">
										<div class="row">
											<label class="TextFont">Select Combination Services </label>
											<div class="form-group Remove-Padding col-md-12">

												<div class="form-group">

													<div class="col-md-8">
														<select name="listmstrcom" id="listmstr_select_combination"	class="col-md-12"
															onclick="setDyanamicDivcom('dynamicItemcom',this.id)">
															<option id="firstElmtcom" value="0">--- Select Services	---</option>

														</select>
													</div>
												</div>

												<div class="col-md-12 select2-container select2-container-multi ">
													<ul id="dynamicItemcom" class="select2-choices" style="overflow-y: scroll;height: 40px"></ul>
												</div>

											</div>
										</div>
									</div>
								</form>
							</div>
							
							<div id="divLine2" class="box border col-md-12" style="padding: 10px">
								<form class="form-horizontal col-md-12" id="myform">
									<div class="col-md-1">
										<div class="row">
											<label class="TextFont">Number </label> 
											<input id="number" type="text" placeholder="Number" class="form-control input-SmallText" type="number"
												value="0" maxlength="5"	onkeypress=" return validateNumbers(event)" onkeyup="validationsonkeyup()" />
										</div>
									</div>

									<div class="col-md-1">
										<div class="row">
											<label class="TextFont"> Operator </label> <select
												id="operator" title="Select one of these options"
												class="form-control input-SmallText col-md-11 TextFont margin-1">
												<option value="0">-SELECT-</option>
												<option value="+">+</option>
												<option value="-">-</option>
												<option value="%">%</option>
											</select>
										</div>
									</div>

									<div class="col-md-2">
										<div>
											<label class="TextFont"></label> 
											<label class="checkbox input-SmallText col-md-3"> 
												<input type="radio" id="increase" value="+" name="incdecType">Increase
											</label> 
											<label class="checkbox input-SmallText col-md-offset-4 col-md-3">
												<input type="radio" id="decrease" value="-"	name="incdecType"> Decrease
											</label>
										</div>
									</div>

									<div class="col-md-1">
										<div class="row">
											<label class="TextFont"> Distribute </label> 
											<input id="distribute" class="form-control input-SmallText"
												type="text" placeholder="Distribute" onkeyup="validationsonkeyup()">
										</div>
									</div>
									
									<div class="col-md-1">
										<div class="row">
											<label class="TextFont"> HallCharges </label> 
											<input id="hallCharges" class="form-control input-SmallText" type="text" value="0" maxlength="5"
												onkeypress=" return validateNumbers(event)" >
										</div>
									</div>
									
									<div class="col-md-2">
										<div class="row">
											<label class="TextFont"> MedicalTeamCharges </label> 
											<input id="medicalCharges" class="form-control input-SmallText"
												type="text"	value="0" maxlength="5"	onkeypress=" return validateNumbers(event)" >
										</div>
									</div>
									
									<div class="col-md-2">
										<div class="row">
											<label class="TextFont">Iso HallCharges </label> 
											<input id="isoHallCharges" class="form-control input-SmallText" type="text" value="0" maxlength="5"
												onkeypress=" return validateNumbers(event)" >
										</div>
									</div>
									
									<div class="col-md-2">
										<div class="row">
											<label class="TextFont">Iso MedicalTeamCharges </label> 
											<input id="isoMedicalCharges" class="form-control input-SmallText"
												type="text"	value="0" maxlength="5"	onkeypress=" return validateNumbers(event)" >
										</div>
									</div>
									
								</form>
							</div>
							
							<div id="divLine10" class=" box border col-md-12" style="padding: 10px">
								<form class="form-horizontal col-md-12" id="myform">
									
									<div class="col-md-3">
										<div class="row">
											<label class="TextFont">OPD Charges</label> 
											<input id="opdChargesConfig" class="form-control input-SmallText"
												type="text"	value="0" maxlength="5"	onkeypress=" return validateNumbers(event)" >
											<!-- <select id="deptIdForConfig" class="form-control"></select> -->
										</div>
									</div>
									<!-- <div class="col-md-offset-1 col-md-4">
										<div class="row">
											<label class="TextFont" >Select	Services </label>
											<div class="form-group col-md-12">
												
												<div class="form-group">

													<div class="col-md-8">
														<select name="listmstr" id="listmstr_select" style="width: 200px"
															onchange="setDyanamicDiv('dynamicItem',this.id)">
															<option id="firstElmt" value="0">--- Select Services ---</option>
														</select>
													</div>
												</div>
                                            </div>
                                        </div>
										<div class="col-md-12 select2-container select2-container-multi ">
											<ul id="dynamicItem" class="select2-choices" style="overflow-y: scroll;height:40px;margin-left: -15px"></ul>
										</div>

									</div> -->

									<div class="col-md-3">
										<div class="row">
											<label class="TextFont">Ipd Charges</label> 
											<input
												id="ipdChargesConfig" class="form-control input-SmallText"
												type="text" name="date" placeholder="" value="0"> <%-- <%=todays_date%> --%>
										</div>
									</div>
									
									<div class="col-md-3">
										<div class="row">
											<label class="TextFont">Diagnostics Charges </label> 
											<input id="diagnoChargeConfig" class="form-control input-SmallText"
												type="text" 
												 name="diag" placeholder="" value="0">
										</div>
									</div>
									
								</form>
							</div>
							
							
						<%-- 	<div id="divLine3" class=" col-md-12">
								<form class="form-horizontal col-md-12">
									<div class="divide-20"></div>
									<div class="col-md-6">
										<div class="row">

											<div class="form-group col-md-12">
												<div class="box border primary">
													<div class="box-title">
														<h4 id="">
															<i class="fa fa-table"></i>Services
														</h4>
													</div>

													<div class="box-body" style="height: 320px;">
														<div class='col-sm-12'>
															<div class="col-md-3">
																<label class="TextFont">Search By:</label>
															</div>

															<div class="col-md-8" id="divbyName">
																<input class="col-md-8 typeahead form-control" name="byName" type="text"
																	onkeyup="setAutoCompleteForConfiguration(this.id,'search')" id="byName" />
															</div>
															
															<div class="col-md-1" style="text-align: center;">
																<input type="button" value="show"
																	class="btn btn-xs btn-primary" id="showdata"
																	onclick="showData()" />
																	
																	<div class="divide-10"></div>
															</div> 
															
															
														
															<table class='table table-bordered'>
																<thead class='cf'>
																	<tr>
																		<th class='col-md-7 center'
																			style='height: 21.5px;'><div
																				class='TextFont'>Service Name</div></th>
																		<th class='col-md-3 center'
																			style='height: 21.5px;'><div
																				class='TextFont'>Charges</div></th>
																		<th class='col-md-2 center'
																			style='height: 21.5px;'><input
																			type='button' value='>>'
																			onclick='addAllTrFromBackend()'></th>
																	</tr>
																</thead>
															</table>
														</div>

														<div class='col-sm-12' style='height: 220px; width: 100%; overflow-y: scroll; border: 1px solid #ddd;'>

															<table class='table table-striped table-condensed cf'>
																<tbody id="leftDiv">
																</tbody>
															</table>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="divide-20"></div>
									</div>

									<div class="col-md-6">
										<div class="row">
											<div class="form-group col-md-12">
												
												<div class="box border blue">
													<div class="box-title">
														<h4 id="">
															<i class="fa fa-table"></i>Charges Configuration

														</h4>
														<div class="pull-right"></div>
													</div>
													<div class="box-body" style="height: 320px;">
														<div class='col-sm-12'>
														
														<div class="col-md-7">														
														
															<div class="col-md-5">
																<label class="TextFont">Total Charges</label>
															</div>

															<div class="col-md-7">
																<input class="form-control" id="totalcharges" type="text" maxlength="200" name="toatalCharges"
																	value="0" readonly="readonly">
															</div>
															
														</div>
														
														<div class="col-md-5">
															<input class="form-control input-sm" id="byName4" onkeyup="searchservicesonui()" 
															type="text" placeholder="Search">
														</div>
															<table class='table table-bordered'>
																<thead class='cf'>
																	<tr>

																		<th class='col-md-5 center'
																			style='height: 21.5px;'><div
																				class='TextFont'>Service Name</div></th>

																		<th class='col-md-3 center'
																			style='height: 21.5px;'><div
																				class='TextFont'>Charges</div></th>
																				
																		<th class='col-md-2 center'
																			style='height: 21.5px;'><div
																				class='TextFont'>CGHS Code</div></th>
																				
																		<th class='col-md-2 center'
																			style='height: 21.5px;'><input type='button' value="<<">
																		</th>
																			
																	</tr>
																</thead>
															</table>
														</div>

														<div class='col-sm-12'
															style='height: 224px; overflow-y: scroll; border: 1px solid #ddd;'>

															<table class='table table-striped table-condensed cf'>
																<tbody id="rightDiv" class="rightDivClass">

																</tbody>
															</table>
														</div>
														
													</div>
												</div>
											</div>
										</div>
									</div>

								</form>
							</div> --%>
							<input id="chargesId" class="hidden">
							
							<!-- /NEW ORDERS -->

						</div>

						<div class="footer-tools">
							<span class="go-top"> <i class="fa fa-chevron-up"></i> Top
							</span>
						</div>
					</div>
					<!-- /CONTENT-->
				</div>
			</div>			
			<div id="pleaseWait" style="text-align: center; display: none;">
				<img style="margin-top: 250px;" height="43px"
					src="images/loading_black.gif" />
				<div style="margin-top: 10px; color: white">
					<b>Please wait...</b>
				</div>
			</div>
			
			<%@include file="footer_nobel.jsp"%>
		</section>
		<!--/PAGE -->

	<!-- JAVASCRIPTS -->
	<%@include file="inv_footer.jsp"%>
	
	<!-- CUSTOM SCRIPT -->
	<!-- <script src="js/script.js"></script> -->
	<script src="js/UserAccess.js"></script>
	<script src="js/chosen.jquery.js"></script>
	<script src='js/jquery.sortable.js'></script>
	
	<script type="text/javascript" src="js/unit_master.js"></script>
	<script src="js/demoConfiguration2.js"></script>
	<script src="js/yearWiseConfiguration.js"></script>
	
	<script>		
		jQuery(document).ready(function() {
			App.setPage("UserManagement"); //Set current page 
			App.init(); //Initialise plugins and elements  
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});
			//fetchAllService();
			//fetchConfigurationChargesList('all');
			fetchRegistrationConfigurationChargesList('all');
			getAllChargesMaster();
			getAllChargesMaster2();
			getAllDeptForConfiguration();
			fetchAllServicecom();	
			getSponsorRecordsOnChargesConfiguration();

			$("#listmstr_select_service").select2();	
			$("#listmstr_select_Hall").select2();	
			$("#listmstr_select_combination").select2();	
		});
	</script>
	
	
	<!-- Modal popu for edit -->
	<div class="modal fade" id="myModal" role="dialog" class="popup">
		<div class="modal-dialog">

			<!-- Modal content-->
			<div class="modal-content" style="width: min-content;">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					
					<h4 class="modal-title">Registration Charges Configuration</h4>
				</div>
				<div class="modal-body" style="width: min-content;">
				
					<div class="pull-right">
						<input class="form-control input-sm" id="byName2" onkeyup="searchall(this.id)" 
                          	type="text" placeholder="Search" aria-controls="datatable1">
                    </div>	

					<!--  -->

					<!-- <div id="divLinePopup" class=" box border col-md-12"
										style="margin-left: 0%; margin-top: -1%;"> -->
					<form class="form-horizontal col-md-12">
					<!--tabs for combination and hall wise and sponsor wise charges  -->
						<div class="col-md-12 box" >

							<div style="height: 20px;">
								<div class="panel-body">
									<div class="tabbable">
										<ul class="nav nav-tabs">
										<li class="active" id="allCharges" >
												<a onclick="fetchRegistrationConfigurationChargesList('all')" data-toggle="tab" style="cursor: pointer"><i class="fa fa-user-md"></i>
													AllCharges</a></li>
													
											<!-- <li  id="combination" >
												<a onclick="getConfigurationdata('combination')" data-toggle="tab" style="cursor: pointer"><i class="fa fa-user-md"></i>
													Combination</a></li>
											<li>
												<a onclick="getConfigurationdata('sponsor')" data-toggle="tab" style="cursor: pointer"><i class="fa fa-user-md"></i>
													Sponsor Wise</a></li>
											<li>
												<a onclick="getConfigurationdata('hallwise')" data-toggle="tab" style="cursor: pointer"><i class="fa fa-user-md"></i> 
													Hall Wise</a></li>
											<li>
												<a onclick="getYearWisedata()" data-toggle="tab" style="cursor: pointer"><i class="fa fa-user-md"></i> 
													Year Wise</a>
											</li>	 -->																						
																							
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
						<div class="col-md-12">
							<div class="row">
								<div class="form-group col-md-12">							
									<div class="box border blue">
										<div class="box-title">
											<h4 id="">
												<i class="fa fa-table"></i>Configuration Service                  
											</h4>
											
										</div>
										<!-- <div ></div> -->
										<div class="box-body" style="height: 320px;width: 800px">
											<div class='col-sm-12'
												style='height: 298px; overflow: scroll; border: 0px solid #ddd;'>
												<table  id="popupDiv" class="datatable table table-bordered " >
																										
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
			
			
	<div id="year_Pop_Up" class="modal fade in" style="height:500px;">
		<div class="modal-dialog" style="width:;">
			<form action="">
				<div class="modal-content center" class="col-md-12">
					<div class="modal-header">
						<div class="box-title">
							<h4>
								<i class="fa fa-calendar"></i>Year wise Configuration
							</h4>
						</div>
					</div>
								
					<div class="modal-body" style="margin-top:9px;">
						<div class="col-md-12-1" style="margin-top: 9px;">
							<div class="col-md-2-1" style="margin-top: 0px;"></div>
						</div>
	
						<div class="col-md-12-1"
							style="height: 100%; width: 100%; padding-left: 0px;">
							<table id="ItemInfoTable" border="1"
								class="table table-bordered table-striped table-condensed"
								style="height: 100%; width: 100%;">
								<thead>
									<tr>
										<th class='col-md-1-1 center' style='height: 21.5px;'><div
												class='TextFont'>#</div></th>
										<th class=' col-md-2-1 center' style='height: 21.5px;'><div
												class='TextFont'>Service Nmae</div></th>
										<th class='col-md-1-1 center' style='height: 21.5px;'><div
												class='TextFont'>Service Id</div></th>
										<th class=' col-md-2-1 center' style='height: 21.5px;'><div
												class='TextFont'>Now Charges</div></th>
										<th class=' col-md-2-1 center' style='height: 21.5px;'><div
												class='TextFont'>Old Charges</div></th>
	
									</tr>
								</thead>
	
								<tbody id="yearData"
									style="height: 87%; overflow-y: scroll; border: 1px solid #436a9d;">
								</tbody>
							</table>
						</div>
						<!-- /BOX-->
					</div>
					<!-- /BODY-->
					<div class="modal-footer">
						<div class="form-group col-md-7-1" style="margin-top: 15px;">
							<button type="submit" class="btn btn-primary"
								id="btnSubContractingMaterialIssueSave"
								name="btnSubContractingMaterialIssueSave"
								onclick="saveandOverride()" data-dismiss="modal">Override</button>
							<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
	
	<input type="hidden" id=doc_id value="0">
	<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
	<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
	<div id="showSubModulesPopup" class="modal fade in">
		<!--End #showSubModulesPopup Popup -->
		<input id="objUserAccess" type="hidden" value="" /> 
		<input id="ChargesIdHidden" type="hidden" value="0" /> 
		<input id="ChargesSlaveIdHidden" type="hidden" value="0" />
	</div>
	<div id="subIDs" style="display: none;"></div>
	
	<input type="hidden" id="queryType" value="insert">
	<div id="configIdsFor" style="display: none;"></div>
	<input type="hidden" id="servicesInfo" value="demoConfiInfo">
	<input type="hidden" id="iscombination" value="N">
	<input type="hidden" id="callfrom" value="all">
	
	<input type="hidden" id="selfId" value="-1">
	<input type="hidden" id="iscatHall" value="-">
	
	<input type="hidden" id="fromYear" value="N">
	
	<input type="hidden" id="countDates" value="0">
	<!-- /JAVASCRIPTS -->
	
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>