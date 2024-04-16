<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Registration Charges Configuration</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<!-- css for developer -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.core.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/alertify/alertify.default.css" />
<!-- css for developer -->

<!-- include js for development -->
<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>
<!-- JQUERY -->
<script src="ehat-design/js/jquery/jquery-2.0.3.min.js"></script>
<!-- JQUERY UI-->
<script
	src="ehat-design/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
<!-- BOOTSTRAP -->
<script src="ehat-design/bootstrap-dist/js/bootstrap.min.js"></script>

<!-- JQUERY UI-->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/jquery-ui-1.10.3.custom/css/custom-theme/jquery-ui-1.10.3.custom.min.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/css/cloud-admin.css">
<link rel="stylesheet" type="text/css"
	href="ehat-design/css/themes/default.css" id="skin-switcher">
<link rel="stylesheet" type="text/css"
	href="ehat-design/css/responsive.css">
<link href="ehat-design/font-awesome/css/font-awesome.min.css"
	rel="stylesheet">
<!-- DATE RANGE PICKER -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
<!-- SELECT2 -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/select2/select2.min.css" />
<!-- TYPEAHEAD -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/typeahead/typeahead.css" />
<!-- UNIFORM -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/uniform/css/uniform.default.min.css" />
<!-- DATA TABLES -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/datatables/media/css/jquery.dataTables.min.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/datatables/media/assets/css/datatables.min.css" />
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/datatables/extras/TableTools/media/css/TableTools.min.css" />

<!-- CUSTOM SCRIPT -->
<script src="js/script.js"></script>

<!-- <script src="js/demoConfiguration2.js"></script> -->

<script src="js/registrationConfigurationMaster.js"></script>
<script src="js/yearWiseConfiguration.js"></script>

<script type="text/javascript" src="js/docroundcharg.js"></script>


<script type="text/javascript">
	onload = function() {		
		//fetchSubServiceCategoryList();
	//	getAllChargesMaster();
		setDocNameOT();
		fetchHeaderList();
		//getAllChargeslot();
		getSponsorRecordsForReg("sourceid","1");

		setsponsor();

		//fetchAllListForUpdateFromCOnfiguration();
		//fetchAllListByHallIdAndByChargesId();
		//fetchehatHallTypeId();
		//fetchehatHallNmaeId();
		
		//fetchehatConfiguration();
	};
	</script>
	<script type="text/javascript">
	$(document).ready(function() {
		App.setPage("wizards_validations"); 
		App.init(); 
		//FormWizard.init();
	});
	</script>

<script type="text/javascript">
	$(function() {		
		
		$("#myform :input").tooltip({

			// place tooltip on the right edge
			position : "center right",

			// a little tweaking of the position
			offset : [ -2, 10 ],

			// use the built-in fadeIn/fadeOut effect
			effect : "fade",

			// custom opacity setting
			opacity : 0.7

		});

	});
</script>
 <style>
#pleaseWait {
			width:100%;
			height:100%;
			position:fixed;
			z-index:10000000;
			top:0;
			left:0;
			right:0;
			bottom:0;
			margin:auto;
			background-color: #272424;
			opacity: 0.7;
}
</style>
</head>
<body style="background: white ! important;">
	<section id="page">
		<c:if test="${sessionScope.userType == null}">
			<jsp:forward page="index.jsp"></jsp:forward>
		</c:if>
		<c:if test="${sessionScope.userType != null }">

			<!-- Common -->
			<!-- DASHBOARD CONTENT -->
			<div id="outer" class="container-main" style="width: 100%;">
				<!-- HEADER -->
				<header class="navbar clearfix" id="header">
					<%@include file="Menu_Header.jsp"%>
					<%-- <%@include file="Menu_Header_Nobel.jsp"%> --%>
				</header>
				<!--/HEADER -->

				<%@include file="left_menu_admin.jsp"%>
				<%-- <%@include
					file="left_menu_admin.jsp"%> --%>
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
												<li><a href="registrationConfiguration.jsp">Registration Charges Configuration </a></li>

										
												<!-- <li>Module Master</li> -->
											
												<!-- Apply Button for Configuratio -->
											</ul>

										</div>
									</div>
								</div>
								<!-- /Common -->

								<!-- <div class="divide-20"></div> -->
								<div class="panel panel-default">
									<div class="panel-body">
										<div class="col-md-12-1">

											<!-- configuration id -->
											<div class='divide-20'></div>
											<div class='form-group Remove-Padding col-md-12-1'
												style='padding-right: 8px; margin-top: 9px; display: none;'>
												<div class='divide-20'></div>
												<label class='TextFont col-md-4-1'>Config Id</label> <input
													id='configId' type='text' placeholder='Slave ID'
													style='background-color: #ddd'
													class='form-control input-SmallText col-md-7-1'
													readonly='readonly' style='margin-left:0%;' value='0' />
													
											</div>
											<!-- configuration id -->
											<!-- masters of masters  -->

											<div id="divLine1" class=" col-md-12"
												style="margin-left: 0%; margin-top: -2%;">
													<!-- <div  style="margin-left: 0%; margin-top: 1%;" class="col-md-6-1">
													<div class="row">
													<div class="col-md-3">
													<label class="checkbox input-SmallText">
													<input type="radio" checked="checked" name="typeOfDoctor" value="np" id="chkno" onclick="setnormal()"> Normal </label></div>
													<div class="col-md-3">
													<label class="checkbox input-SmallText">
													<input type="radio" name="typeOfDoctor" value="sp" id="chksp" onclick="setsponsor()"> Sponsor</label>
													</div></div></div> -->
													
													<div  style="margin-left: 0%; margin-top: 1%;" style="display: none" class="col-md-6-1">
													<div class="row">
													<!-- <div class="col-md-3">
													<label class="checkbox input-SmallText">
													<input type="radio" checked="checked" name="typeOfDoctor" value="np" id="chkno" onclick="setnormal()"> Normal </label></div> -->
													<div class="col-md-3">
													<label class="checkbox input-SmallText" style="display: none">
													<input  style="display: none" type="radio" name="typeOfDoctor" checked="checked" value="sp" id="chksp" onclick="setsponsor()"> Sponsor</label>
													</div></div></div>

												<form class="form-horizontal col-md-12">

													<div class="divide-40"></div>
													<!-- <div class="col-md-3">
														<div class="row">
															---------Touheed Plugin Multi select Plugin--------------
															<label class="TextFont" style="margin-bottom: -1px;">Select
																Doctor</label>
															<div id="" class="form-group Remove-Padding col-md-12-1"
																style="margin-left: -10%; height: 80px; width: 98%;">

																<div class="divide-20"></div>

																<div class="form-group">
																	<div class="col-md-8">
																		<select name="doctorNameOT" id="doctorNameOT"
																			style="width: 200px"
																			onchange="getDrhallSponsercharg('Hall')">
																		
																		</select>
																		
																	</div>
																</div>

															

															</div>
															---------Touheed Plugin Multi select Plugin--------------
														</div>
														<div class="divide-20"></div>
													</div> -->
													

														<div class="col-md-7" id="divsp" style="display: none">
														<div class="row">
															
															<label class="TextFont" style="margin-bottom: -1px;">Select
																Sponsor</label>
															<div id="" class="form-group Remove-Padding col-md-12-1"
																style="margin-left: -10%; height: 80px; width: 98%;">

																<div class="divide-20"></div>

																<div class="form-group">
																	<div class="col-md-8">
																		<!-- <select name="listmstr" id="listmstr_select_service"
																			style="width: 200px"
																			onchange="fetchChargesSlaveListById(this.id)">
																			<option id="firstElmts" value="0">--- Select Sponsor
																				---</option>
																		</select> -->
																		
																		
																	<!-- 	<select name="listmstr" id="listmstr_select_service" style="width: 200px"
																			   onchange="fetchSuperCatogoiresSlaveReg(this.id)">
																			<option id="firstElmts" value="0">--- Select Sponsor---</option>
																		</select> -->
																		
																		<!--  change by Rohini -->
																			<select name="listmstr" id="listmstr_select_service" style="width: 200px"
																			   onchange="fetchSuperCatogoiresSlaveReg('mulDynamicItem',this.id,'sponsor')">
																			<option id="firstElmts" value="0">--- Select Sponsor---</option>
																		</select>
																		
																	</div>
																</div>
															</div>
															<!-- ---------Touheed Plugin Multi select Plugin-------------- -->
														</div>
														<div class="divide-20"></div>
													</div>
	                                                 
	                                                <div class="col-md-3"  style="margin-left:30px">
														<div class="row">
																	<label for="numeric">Rate:</label> <input type="text"  onkeypress="return validatePrice(event)"  onkeyup="applytoallReg()" name="rate" id="rate" value="0" class="form-control" style="text-align: right;width:60%">
																		
																	<input type="hidden" name="rate2" id="rate2" value="0">
																</div>
													</div>
																
													<div class="col-md-2">
														<div class="row">
															<input id="btnhall" type="button" onclick="savedrroundcharge()"  name="saveBill" id="saveBill" value="save" class="form-control btn btn-primary" style="width:40%;margin-top:20px;margin-left:-41px" >
															<input  id="btnsp" type="button" onclick="savedrroundchargespReg()"  name="saveBill" id="saveBill" value="save" class="form-control btn btn-primary" style="width:40%;margin-top:20px;margin-left:-41px;display: none;" >
																
														</div>
													</div>			
													<div id="mulDynamicItemDiv" style=" width: 48%;margin-left:-303px;margin-top:21px;display: none;" class="col-md-12 select2-container select2-container-multi ">
																<ul	style="overflow-y: scroll; min-height: 56px;margin-left:-9px;width: 65%;"
																		class="select2-choices" id="mulDynamicItem">
																</ul>
													</div>			
												</form>
											</div>
											<!-- masters of masters -->
									
											<input id="chargesId" class="hidden">

											<div class="divide-20"></div>
										</div>
									</div>
								</div>
								
								
								
								<div class="panel panel-default">
											<div class="panel-body">
									
												<div class='col-md-9-1'
													style='height: 201px; max-height: auto;  overflow-x: scroll; overflow-y: scroll;width:-moz-available' id="divdrr">
													<table id="hallwiseTable"
														class='table table-bordered table-condensed cf table-fixed'
														style='margin-bottom: 9px;  overflow-x: scroll; overflow-y: scroll; max-width: 1000%;'>
														<thead  style="background-color: lightgray;"
																id="serviceHeader">
															
														</thead>
														<tbody class="table-striped"  id="servicesDiv">
															
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




			<!-- Modal popu for edit -->
			<div class="modal fade" id="myModal" role="dialog" class="popup">
				<div class="modal-dialog">

					<!-- Modal content-->
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal">&times;</button>
							
							<h4 class="modal-title">Charges Configuration</h4>
						</div>
						<div class="modal-body">

							<!--  -->

							<!-- <div id="divLinePopup" class=" box border col-md-12"
												style="margin-left: 0%; margin-top: -1%;"> -->
							<form class="form-horizontal col-md-12" style="margin-top: 0%;">
							<!--tabs for combination and hall wise and sponsor wise charges  -->
												<div class="col-md-12 box" >

									<div  style="height: 20px;">
										<div class="panel-body">
											<div class="tabbable">
												<ul class="nav nav-tabs">
												<li class="active" id="allCharges" >
														<a onclick="fetchConfigurationChargesList('all')" data-toggle="tab" style="cursor: pointer"><i class="fa fa-user-md"></i>
															AllCharges</a></li>
															
													<li  id="combination" >
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
															Year Wise</a></li>													
																									
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
														<i class="fa fa-table"></i>Configuration Service
                    
													</h4>
													<div class="pull-right">
													<input class="form-control input-sm" id="byName2" onkeyup="searchall(this.id)" 
	                                                      type="text" placeholder="Search" aria-controls="datatable1"></div>
												</div>
												<!-- <div ></div> -->
												<div class="box-body" style="height: 320px;">
													<div class='col-sm-12-1'
														style='height: 298px; overflow-y: scroll; border: 0px solid #ddd; margin-top: -1px;'>
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
			
			
			<!--  -->

			<div id="pleaseWait" style="text-align: center; display: none;">
				<img style="margin-top: 250px;" height="43px"
					src="images/loading_black.gif" />
				<div style="margin-top: 10px; color: white">
					<b>Please wait...</b>
				</div>
			</div>

			<div id="showSubModulesPopup" class="modal fade in">
				<!--End #showSubModulesPopup Popup -->
				<input id="objUserAccess" type="hidden" value="" /> <input
					id="ChargesIdHidden" type="hidden" value="0" /> <input
					id="ChargesSlaveIdHidden" type="hidden" value="0" />
			</div>
			<div id="subIDs" style="display: none;"></div>
			<div id="hallistdiv" style="display: none;"></div>
			<div id="splistdiv" style="display: none;"></div>
			<input type="hidden" id="queryType" value="insert">
			<div id="configIdsFor" style="display: none;"></div>
			<input type="hidden" id="servicesInfo" value="demoConfiInfo">
			<input type="hidden" id="iscombination" value="N">
			<input type="hidden" id="callfrom" value="all">
			
			<input type="hidden" id="selfId" value="-1">
			<input type="hidden" id="iscatHall" value="-">
			
			<input type="hidden" id="fromYear" value="N">
			
			<input type="hidden" id="countDates" value="0">
			
			<input type="hidden" id="lengthhead" value="0">
			<input type="hidden" id="lengthsp" value="0">
			<div></div>
		</c:if>
	</section>
	<%@include file="Footer.jsp"%>


	<!-- =-=-=-=-Touheed multiselect plugin=-=-=-=-=- -->
	<!-- =-=-=-=-=-=Multiselect=-=-=-=-=-=-=-=- -->
	<!-- JAVASCRIPTS -->
	<!-- Placed at the end of the document so the pages load faster -->

	<!-- DATE RANGE PICKER -->
	<!-- <script src="ehat-design/js/bootstrap-daterangepicker/moment.min.js"></script>

	<script src="ehat-design/datepicker/bootstrap-datepicker.js"></script> -->
	<!-- SLIMSCROLL -->
	<script type="text/javascript"
		src="ehat-design/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
	<script type="text/javascript"
		src="ehat-design/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
	<!-- BLOCK UI -->
	<script type="text/javascript"
		src="ehat-design/js/jQuery-BlockUI/jquery.blockUI.min.js"></script>
	<!-- SELECT2 -->
	<script type="text/javascript"
		src="ehat-design/js/select2/select2.min.js"></script>
	<!-- UNIFORM -->
	<script type="text/javascript"
		src="ehat-design/js/uniform/jquery.uniform.min.js"></script>
	<!-- WIZARD -->
	<script
		src="ehat-design/js/bootstrap-wizard/jquery.bootstrap.wizard.min.js"></script>
	<!-- WIZARD -->
	<script src="ehat-design/js/jquery-validate/jquery.validate.min.js"></script>
	<script src="ehat-design/js/jquery-validate/additional-methods.min.js"></script>
	<script type="text/javascript" src="js/validate.js"></script>
	<!-- BOOTBOX -->
	<script type="text/javascript"
		src="ehat-design/js/bootbox/bootbox.min.js"></script>
	<!-- COOKIE -->
	<script type="text/javascript"
		src="ehat-design/js/jQuery-Cookie/jquery.cookie.min.js"></script>
	<!-- CUSTOM SCRIPT -->
	<script src="ehat-design/js/script.js"></script>
	<script src="ehat-design/js/bootstrap-wizard/form-wizard.min.js"></script>
	<!-- -=-=-=-=-=-=-=-=-=-=-=-=Multi select-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- -->
	<!-- -=-=-=-=-=Touheed Multiselect plugin-=-=-=-=-= -->
</body>
</html>