<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>IPD Patient</title>
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
<link rel="stylesheet" type="text/css" href="css/Ipdblock.css">

<!-- include js for development -->
<!-- <script type="text/javascript" src="js/ehat_ipd_bed.js"></script> -->
<script type="text/javascript" src="js/registration.js"></script>
<script type="text/javascript" src="js/ipd_bed_mgt.js"></script>
<script type="text/javascript" src="js/IpdBlockWise.js"></script>
<script type="text/javascript" src="js/patient.js"></script>

<style type="text/css">

headerwidth{
width: 19%;
}

.lblBold {
	font-weight: 600;
	color: #518e2e;
}
</style>

</head>
<body>
	<c:if test="${ sessionScope.userType != null }">
		<!-- HEADER -->
		<header class="navbar clearfix" id="header">

			<%@include file="Menu_Header_Nobel.jsp"%>

		</header>
		<!--/HEADER -->

		<!-- PAGE -->
		<section id="page">
			<!-- SIDEBAR -->

			<%@include file="left_menu_IPDMain.jsp"%>

			<!-- /SIDEBAR -->
			<div id="main-content">

				<div class="container">
					<div class="row">
											<!-- Statr of bedTable --></div>
						 <div class="tabbable col-md-12-1" id="bedTable" style="display:none">
										<div class="col-md-12-1" >
									<div class="col-md-3-1">
										<table class="table table-striped col-md-12-1"
											style="margin-top: -1px;">
										</table>
									</div>
									


									<div class="col-md-9-1" style="overflow-x: auto;">

										<table class="table table-striped "
											style="margin-bottom: 0px;">
											<tbody>
												<tr id="bedAccupiedPer">
													<td style="vertical-align: middle; text-align: center;"
														height="310"><img alt=""
														src="images/ajax_loader_blue_64.gif"></td>
												</tr>
												<tr id="bedTotals" style="background: #dddddd;">
												</tr>
												<tr id="bedOccuppieds" style="color: red;">
												</tr>
												<tr id="bedVacBtUnavl" style="background: #dddddd;">
												</tr>
												<tr id="bedTotUnAvl" style="color: red;">
												</tr>
												<tr id="bedAvlWait"
													style="background: #dddddd; color: green;">
												</tr>
												<tr id="bedTotAvl" style="color: green;">
												</tr>
											</tbody>
										</table>
									</div>
								</div>
						</div> 
						<!-- End of Bed TAbles  -->
						
						
						
						<div id="content" class="col-lg-12">
							<!-- PAGE HEADER-->
							<div class="row">
								<div class="col-sm-12">
									<div class="page-header" style="margin-bottom: 5px">
										<!-- STYLER -->

										<!-- /STYLER -->
										<!-- BREADCRUMBS -->
										<ul class="breadcrumb">
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
											<li><i class="fa fa-home"></i> <a
												href="ipd_patient.jsp">IPD Patient</a></li>
										</ul>
										<!-- /BREADCRUMBS -->

									</div>
								</div>
							</div>
						
							<div class="row">
								<!-- NEW ORDERS -->
								<div class="col-md-12">
									<div class="panel panel-default">
										<div class="panel-body">
											<div class="row">
												
												<ul class="nav nav-tabs">

													<li id="blockWisePat" class="active"><a data-toggle="tab" href="#IPDBlock" id="block_wise"
														onclick="showHideDiv(this.id),getIpdBillPatientsBlockBeds('onload')"><i
															class="fa fa-user"></i><span class="hidden-inline-mobile">IPD
																Block Wise</span></a></li>
		
													<li id="ipdactive" ><a data-toggle="tab" href="#IPD" id="ipd_active_patient" 
														onclick="showHideDiv(this.id),getIpdBillPatients2('onload', '1')"><i class="fa fa-user"></i><span
															class="hidden-inline-mobile">IPD Active Patient</span></a></li>
													
													<li id="ipdPhyDisc" onclick="showHideDiv(this.id),getPhysicalDischargedPatient1('onload', '1')">
														<a data-toggle="tab" href="#IPD"><i
															class="fa fa-user"></i> <span class="hidden-inline-mobile">Physical
																Discharged Patients</span></a>
													</li>
													
													
													
														<li class="pull-right col-md-3" id="searchIpd">
															<li class="form-group col-md-1">
																<input type="button" id="wardShow" class="btn btn-xs btn-primary"
																	value="show beds statistics"
																	onclick="showHideWard()" />
			
															</li>
														</li>
														
													
												</ul>

												<div class="tab-content">

													<div class="divide-10"></div>
													<div class="row">
														<div class="col-md-12">

															<div class="form-group col-md-3">
																<label>Select Ward Type:</label> <select
																	name='listmstr' class="input-group" id="wardTypeHall" style='width: 100%' onchange="getWardTypeList()">
																	<!-- style='width: 100%' onchange="getWardTypeList(),getIpdBillPatientsBlockBeds('onload'),getIpdBillPatients2('onload')"> -->
																	
																	<option value="0">----Ward Type----</option>
																</select>
															</div>
			
															<div class="form-group col-md-3">
																<label>Select Ward Name:</label> <select
																	name='listmstr' class="input-group" id="wardName" style='width: 100%' onchange="getIpdBillPatientsBlockBeds('onload')"> 
																	<!-- style='width: 100%' onchange="getIpdBillPatientsBlockBeds('onload'),getIpdBillPatients2('onload')"> -->
																	<option value="0">-- Ward Name --</option>
																</select>
															</div>
															
															<div class="form-group col-md-2">
																<label>Search By:</label> 
																<select id="patSearchType"
																	class="form-control input-SmallText"
																	onchange="setPatientSearchType()">
																	<option value="1">UHID</option>
																	<option value="2">Patient Name</option>
																	<option value="3">Patient Mobile</option>
																	<!-- <option value="4">Patient AddharNo</option> -->
																</select>
															</div>

															<div class="col-md-2 TextFont" id="divbyName" style="margin-top: 18px">
																<input name="byName" type="text" id="byName"
																	class="typeahead form-control input-SmallText"
																	onkeyup="setAutoPatientNameBlock(this.id,'prevIpd',event)" autocomplete="off"/>
															</div>
															
															<div id="allBedsBlockWise"
																style="font-size: 11px; text-decoration: blink; color: red; padding-top: 5px;">

																<div class="col-md-2">
																	<label style="padding: 0 0 0 27px">Total Beds:
																		<span id="totalbedscount"></span>
																	</label>
																</div>

																<div class="col-md-2">
																	<label style="padding: 0 0 0 27px">Occupied
																		Beds: <span id="ba3"></span>
																	</label>
																</div>

																<!-- <div class="col-md-2">
																	<label style="padding: 0 0 0 27px">Available
																		Beds: <span id="ba4"></span>
																	</label>
																</div>

																<div class="col-md-2">
																	<label style="padding: 0 0 0 27px">Cleaning
																		Beds: <span id="bclean2"></span>
																	</label>
																</div> -->

															</div>
															
															<!-- <div class="form-group col-md-3">
																<table>
																	<tr>
																		<td class="col-md-2">
																			<label style="color: red">Total :</label> 
																			<label id="totalBeds">0</label>
																		</td>
																		<td class="col-md-2">
																			<label style="color: red">Allocated :</label> 
																			<label id="allocatesBeds">0</label>
																		</td>
																	</tr>
																	
																	<tr>
																		<td class="col-md-2">
																			<label style="color: red">Available :</label> 
																			<label id="AvailableBeds">0</label>
																		</td>
																		<td class="col-md-2">
																			<label style="color: red">Cleaning :</label> 
																			<label id="cleaningBeds">0</label>
																		</td>
																	</tr>
																</table>
															</div> -->
															
														</div>
													</div>
													
													 <!-- <div class="row">
														<div class="col-md-12">

															<div id="allBedsBlockWise"
																style="font-size: 11px; text-decoration: blink; color: red; padding-top: 5px;">

																<div class="col-md-2">
																	<label style="padding: 0 0 0 27px">Total Beds:
																		<span id="totalbedscount"></span>
																	</label>
																</div>

																<div class="col-md-2">
																	<label style="padding: 0 0 0 27px">Occupied
																		Beds: <span id="ba3"></span>
																	</label>
																</div>

																<div class="col-md-2">
																	<label style="padding: 0 0 0 27px">Available
																		Beds: <span id="ba4"></span>
																	</label>
																</div>

																<div class="col-md-2">
																	<label style="padding: 0 0 0 27px">Cleaning
																		Beds: <span id="bclean2"></span>
																	</label>
																</div>

															</div>


														</div>
													</div>  -->
													
													<!-- End for ward and ward type filter  -->

													<div id="IPDBlock" class="tab-pane fade in active "
														style="margin-top: 0px;">


														<div class="panel panel-default">
															<div class="panel-body" id="ipdBillPatientsblock"
																style="overflow: auto;height: 420px"></div>

														</div>
													</div>
													<div id="IPD" class="tab-pane fade in active "
														style="margin-top: 0px;">

														<div class="panel panel-default">
															<div class="panel-body" id="ipdBillPatients"
																style="overflow: auto;"></div>

														</div>
													</div>
												
												<div id="ChangeAppointment" class="popup modal fade in"
														tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
														aria-hidden="true">
														<div class="modal-dialog col-md-6-1"
															style="margin-top: 13%; margin-left: 23%">
															<div class="modal-content">

																<div class="modal-header"
																	style="padding-bottom: 0px; padding-top: 7px;">
																	<div class="box-title">
																		<h4>Billable Bed Tariff</h4>
																	</div>
																	<div
																		style="float: right; padding-right: 6px; margin-top: -3%;">
																		<button type="button"
																			class="btn btn-xs btn-danger exit"
																			data-dismiss="modal">
																			<i class="fa fa-arrows"></i> Close
																		</button>
																		<input id="bedIDPop" type="hidden"> <input
																			id="htPop" type="hidden"> <input
																			id="patientTypePop" type="hidden">
																	</div>
																</div>

																<div class="modal-body" style="height: 125px;">
																	<div class="col-md-12">
																		<form class="form-horizontal col-md-12-1"
																			style="margin: 0px;">
																			<!--Panel Body-->
																			<div class="form-group col-md-6-1"
																				style="margin: 0px;">
																				<label class="checkbox-inline input-SmallText"
																					style="padding-left: 20px;"> <input
																					onclick="setBillableBed2()" name="radBillableBed"
																					type="radio" id="radBillableBed1" value="sameBed">
																					Selected Bed
																				</label>
																			</div>
																			<div class="form-group col-md-6-1"
																				style="margin: 0px;">
																				<label class="checkbox-inline input-SmallText"
																					style="padding-left: 20px;"> <input
																					onclick="setBillableBed2()" name="radBillableBed"
																					type="radio" id="radBillableBed2"
																					value="differentBed"> Select Bed Type
																				</label>
																			</div>
																			<div id="divWardType" class="form-group col-md-12-1"
																				style="float: right; margin-top: 3%; margin-bottom: 0%; display: none;">
																				<div class="col-md-12-1"
																					style="margin-left: 0px; margin-top: 10px;">
																					<div class="form-group col-md-2-1">
																						<label class='TextFont'>Ward Type</label>
																					</div>
																					<div id="wardTypeSelectIDBB"
																						class="form-group col-md-4-1"
																						style="padding: 0px 5px;"></div>

																					<div class="col-md-4-1" style="padding-top: 9px;">
																						<div class="form-group col-md-3-1">
																							<label class='TextFont'>Hall</label>
																						</div>
																						<div class="form-group col-md-9-1">
																							<select id="hallTypeSelectIDBB"
																								class="form-control input-SmallText">
																							</select>
																						</div>
																					</div>

																					<button type="button" class="btn btn-primary"
																						onclick="updateBillableBed12()"
																						style="line-height: 0.6">
																						<i class="fa fa-save"></i> Save
																					</button>

																				</div>


																			</div>
																		</form>
																	</div>
																	<!-- /BOX-->
																</div>
																<!-- /BODY-->
															</div>
														</div>
													</div>

												</div>

												
										</div>
										
									</div>
								</div>

							</div>
							<!-- /NEW ORDERS -->
                                                <div class="pull-right">
													<ul class="pagination" id="opdpagenation">

													</ul>
												</div>
												<div class="col-md-4 col-md-offset-8">
													<div class="pull-right">
														<ul class="pagination pagination-blue margin-bottom-10"
															id="totalNumberOfPagesOpd">

														</ul>
													</div>
												</div>
						</div>

						<div class="footer-tools">
							<span class="go-top"> <i class="fa fa-chevron-up"></i> Top
							</span>
						</div>
					</div>
					<!-- /CONTENT-->
				</div>
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

		<script
			src="ehat-design/js/bootstrap-daterangepicker/daterangepicker.min.js"></script>
		<!-- SLIMSCROLL -->
		<script type="text/javascript"
			src="ehat-design/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>

		<!-- BLOCK UI -->
		<script type="text/javascript"
			src="ehat-design/js/jQuery-BlockUI/jquery.blockUI.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/autosize/jquery.autosize.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/select2/select2.min.js"></script>
		<!-- TYPEHEAD -->
		<script type="text/javascript"
			src="ehat-design/js/typeahead/typeahead.min.js"></script>
		<!-- UNIFORM -->
		<script type="text/javascript"
			src="ehat-design/js/uniform/jquery.uniform.min.js"></script>
		<!-- DATA TABLES -->
		<script type="text/javascript"
			src="ehat-design/js/datatables/media/js/jquery.dataTables.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/datatables/media/assets/js/datatables.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/datatables/extras/TableTools/media/js/TableTools.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/datatables/extras/TableTools/media/js/ZeroClipboard.min.js"></script>

		<!-- COOKIE -->
		<script type="text/javascript"
			src="ehat-design/js/jQuery-Cookie/jquery.cookie.min.js"></script>

		<!-- CUSTOM SCRIPT -->
		<script src="ehat-design/js/script.js"></script>

		<script src="auto/jquery.mockjax.js"></script>
		<script src="auto/bootstrap-typeahead.js"></script>
		<!-- <script src="js/demoConfiguration2.js"></script> -->
		
		<!-- CUSTOM SCRIPT -->
		
		
		<script>
		
		jQuery(document).ready(function() {
			App.setPage("wizards_validations"); //Set current page 
			App.init(); //Initialise plugins and elements  
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});
			$("#wardTypeHall").select2();
			$("#wardName").select2();
			$("#ipdView").select2();
			$("#viewInfo").select2();
			
			getWardTypeList();
			getIpdBillPatientsBlockBeds('onload');
			setPatientSearchType();
			getBedStacticsData() ;
		});
	</script>
	    <input type="hidden" id="hallTypeId" value="0">
	    <input type="hidden" id="hallID" value="<0">
		<input type="hidden" id=stateId value="0">
		<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
		<input type="hidden" id="BedAllocStatus" value="new" />
		<input type="hidden" id="DallocBedId" value="0"	/>
		<input type="hidden" id="chargesSlaveId" value="0">
		<input type='hidden' id="count" value='0' />
		
		<input type="hidden" id="normalBedCharges" value="0">	
		<input type="hidden" id="isolationBedCharges" value="0">	
		<input type="hidden" id="normalNursingCharges" value="0">	
		<input type="hidden" id="isolationNursingCharges" value="0">
		
		<input type="hidden" id="sponsorBedCharges"	value="0">	
		<input type="hidden" id="sponsorIsolationBedCharges" value="0">	
		<input type="hidden" id="sponsorNursingCharges"	value="0">	
		<input type="hidden" id="sponsorIsolationNursingCharges" value="0">
		<input type="hidden" id="isBedAllocationScreen"	value="Y">	
		<input type="hidden" id="adminChargesIpd" value="0">
		
		<input type="hidden" id="callfrom" value="block">
		<input type="hidden" id="callfrom1" value="">
		<input id="allBedObj" type="hidden" value="">
		<input id="hallDetailDiv" type="hidden" value="">
		<input id="wardType" type="hidden"  value="wardwise"/>
		
        <div id="divPatId2" style="display: none;"></div>
        <input id="bedIDPop" type="hidden">
        <input type="hidden" id="BedAllocStatus" value="new"
		style="display: none;" />
		<input type="hidden" id="DallocBedId" value="0"
		style="display: none;" />
		<input id="tId" type="hidden">
		
		<div id="OPDPatientList" style="display: none;"></div>
		<div id="patobject" style="display: none;"></div>
		<div id="patobjectPDP" style="display: none;"></div>
		<div id="hospDetails" style="display: none;"></div>
		<%-- <input type="hidden" id="risingFlow" value="<%=risingFlow%>"> --%>	

		<div id="divBillableBedChargesHiddenFields">
		</div>		
	
		<%
			ResourceBundle resourceBundle = ResourceBundle.getBundle("EhatEnterpriseConfigurationFile");
			int servId = Integer.parseInt(resourceBundle.getObject("adminServId").toString());
			int subServId = Integer.parseInt(resourceBundle.getObject("adminSubServId").toString());
		%>
		<input type="hidden" id="adminServId" value=<%=servId%>>	
		<input type="hidden" id="adminSubServId" value=<%=subServId%>>
		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
	
</body>
</html>

