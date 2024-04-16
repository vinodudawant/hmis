<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Consultation Charges Master</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">
<!-- css for developer -->
	<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.core.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/alertify/alertify.default.css" />
<!-- css for developer -->	

<!-- include js for development -->
	<script type="text/javascript" src="ehat-design/alertify/alertify.js"></script>
	<!-- JQUERY -->
	<script src="ehat-design/js/jquery/jquery-2.0.3.min.js"></script>
	<!-- JQUERY UI-->
	<script src="ehat-design/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
	<!-- BOOTSTRAP -->
	<script src="ehat-design/bootstrap-dist/js/bootstrap.min.js"></script>
		
	<!-- JQUERY UI-->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/jquery-ui-1.10.3.custom/css/custom-theme/jquery-ui-1.10.3.custom.min.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/css/cloud-admin.css" >
	<link rel="stylesheet" type="text/css"  href="ehat-design/css/themes/default.css" id="skin-switcher" >
	<link rel="stylesheet" type="text/css"  href="ehat-design/css/responsive.css" >
	<link href="ehat-design/font-awesome/css/font-awesome.min.css" rel="stylesheet">
	<!-- DATE RANGE PICKER -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
	<!-- SELECT2 -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/select2/select2.min.css" />
	<!-- TYPEAHEAD -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/typeahead/typeahead.css" />
	<!-- UNIFORM -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/uniform/css/uniform.default.min.css" />
	<!-- DATA TABLES -->
	<link rel="stylesheet" type="text/css" href="ehat-design/js/datatables/media/css/jquery.dataTables.min.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/js/datatables/media/assets/css/datatables.min.css" />
	<link rel="stylesheet" type="text/css" href="ehat-design/js/datatables/extras/TableTools/media/css/TableTools.min.css" />

<!-- include js for development -->
	 <script src="js/demoConfiguration2.js"></script>
	
	<script src="js/yearWiseConfiguration.js"></script>
	<script type="text/javascript" src="js/patient.js"></script>
	<!-- <script type="text/javascript" src="js/consultation_charges_master.js"></script> -->
	<script src="js/consultationChargesMasterNew.js"></script>
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
											<li><i class="fa fa-home"></i> <a href="Dashboard.jsp">Home</a></li>
											<li><i class="fa fa-home"></i> <a href="ehat_center_state_master.jsp">Consultation Charges Master</a></li>
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
												<div class="col-md-12 panel panel-default">
												
													<div class="col-md-3">
														<label class="checkbox input-SmallText"> 
														<input type="radio" checked="checked" name="typeOfDoctor"
															value="np" id="chkno" onclick="setnormal()">  Normal
														</label>
													</div>
													<div class="col-md-3">
														<label class="checkbox input-SmallText"> 
														<input type="radio" name="typeOfDoctor" value="sp" id="chksp"
															onclick="setsponsor(),refereshSonsorData()">  Sponsor
														</label>
													</div>
												</div>
												
												<div class="col-md-12 panel panel-default" style="margin-top: 5px">
													<div class="divide-20"></div>
													<div class="form-group col-md-4" id="divsp" style="display: none">
														<label class="TextFont">Select Sponsor</label>
														<!-- <select name="listmstr" id="listmstr_select_service"
															style="width: 80%" onchange="fetchSuperCatogoiresSlave(this.id),getConsulthallSponsercharg('Hall')">
														</select> -->
														
														<!-- Rohini Changed on 21/03/2024 -->
														<select name="listmstr" id="listmstr_select_service"
															style="width: 80%" onchange="fetchSuperCatogoiresSlaveConsultation('mulDynamicItem',this.id,'sponsor'),getConsulthallSponsercharg('Hall')">
														</select>
														
														<div id="mulDynamicItemDiv" style="margin-top: 5px"
															class="col-md-12 select2-container select2-container-multi ">
															<ul style="overflow-y: scroll; min-height: 56px;width: 80%"
																class="select2-choices" id="mulDynamicItem"></ul>
														</div>
													</div>
													
													<div class="form-group col-md-4">
														<label class="TextFont">Select Doctor</label>
														<!-- <select name="doctorNameOT" id="doctorNameOT"
															style="width: 80%" onchange="getConsulthallSponsercharg('Hall')">
														</select> -->
														<select name="doctorNameOT" id="doctorNameOT"
															style="width: 80%" onchange="getConsulthallSponserchargNew('Hall')">
														</select>
													</div>
													
													<div class="form-group col-md-3">
														<label class="TextFont">Rate</label>
														<input type="text" onkeypress="return validatePrice(event)"
															onkeyup="applytoall()" name="rate" id="rate" value="0" class="form-control"> 
														<input type="hidden" name="rate2" id="rate2" value="0">
													</div>
													
													<div class="form-group col-md-3" style="margin-top: 10px">
														<!-- <input id="btnhall" type="button" class="btn btn-success"
															onclick="saveConsultationCharges('hall')" name="saveBill" value="save"> -->
													<input id="btnhall" type="button" class="btn btn-success"
															onclick="saveConsultationChargesNew('hall')" name="saveBill" value="save">
													
														<!-- <input id="btnsp" type="button" class="btn btn-success" style="display: none;"
															onclick="saveConsultationCharges('sponsor')" name="saveBill" value="save"> -->
															
															<input id="btnsp" type="button" class="btn btn-success" style="display: none;"
															onclick="saveConsultationChargesNew('sponsor')" name="saveBill" value="save">
													</div>
												</div>
												
												<div class="col-md-12">
													<div class="tabbable header-tabs">
														<div class="row" style="margin-top: 10px">
															<div class="col-md-12">
																<div class="col-sm-12">
																	<div class="pull-right">
																		<div id="datatable1_filter" class="dataTables_filter">
																			<label id="searchlabel"> </label>
																		</div>
																	</div>
																</div>
																<div class="panel panel-primary"
																	style="margin-top: 20px">
																	<div class="panel-heading" id="divEhatContent">HallWise Consultation Charges Details</div>
																	<div class="panel-body"
																		style="overflow: auto; height: 250px">
																		<table id="hallwiseTable" class='table table-bordered table-condensed cf table-fixed'
																			style='overflow-x: scroll; overflow-y: scroll; max-width: 1000%;'>
																			<thead style="background-color: lightgray;"
																				id="serviceHeader">
							
																			</thead>
																			<tbody class="table-striped" id="servicesDiv">
							
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
							</div>
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
		
	<script src="ehat-design/js/bootstrap-daterangepicker/daterangepicker.min.js"></script>
	<!-- SLIMSCROLL -->
	<script type="text/javascript" src="ehat-design/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
	<!-- BLOCK UI -->
	<script type="text/javascript" src="ehat-design/js/jQuery-BlockUI/jquery.blockUI.min.js"></script>	
	<script type="text/javascript" src="ehat-design/js/autosize/jquery.autosize.min.js"></script>	
	<script type="text/javascript" src="ehat-design/js/select2/select2.min.js"></script>
	<!-- TYPEHEAD -->
	<script type="text/javascript" src="ehat-design/js/typeahead/typeahead.min.js"></script>	
	<!-- UNIFORM -->
	<script type="text/javascript" src="ehat-design/js/uniform/jquery.uniform.min.js"></script>		
	<!-- DATA TABLES -->
	<script type="text/javascript" src="ehat-design/js/datatables/media/js/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/datatables/media/assets/js/datatables.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/datatables/extras/TableTools/media/js/TableTools.min.js"></script>
	<script type="text/javascript" src="ehat-design/js/datatables/extras/TableTools/media/js/ZeroClipboard.min.js"></script>
	<!-- COOKIE -->
	<script type="text/javascript" src="ehat-design/js/jQuery-Cookie/jquery.cookie.min.js"></script>
	<!-- CUSTOM SCRIPT -->
	<script src="ehat-design/js/script.js"></script>
	<script src="auto/jquery.mockjax.js"></script>
	<script src="auto/bootstrap-typeahead.js"></script>
	<!-- CUSTOM SCRIPT -->
	
	<script>
		
		jQuery(document).ready(function() {
			App.setPage("wizards_validations"); //Set current page 
			App.init(); //Initialise plugins and elements  
			$(function() {
				$('[data-toggle="tooltip"]').tooltip();
			});
			setDocNameOT();
			getConsulthallSponsercharg("Hall");
		});
	</script>
	<!-- /JAVASCRIPTS -->
	
	<input type="hidden" id=stateId value="0">
	<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
	<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">
	
	<div id="showSubModulesPopup" class="modal fade in">
		<input id="objUserAccess" type="hidden" value="" /> 
		<input id="ChargesIdHidden" type="hidden" value="0" /> 
		<input id="ChargesSlaveIdHidden" type="hidden" value="0" />
	</div>
	<div id="subIDs" style="display: none;"></div>
	<div id="hallistdiv" style="display: none;"></div>
	<div id="splistdiv" style="display: none;"></div>
	<div id="configIdsFor" style="display: none;"></div>
	<input type="hidden" id="queryType" value="insert">
	<input type="hidden" id="servicesInfo" value="demoConfiInfo">
	<input type="hidden" id="iscombination" value="N">
	<input type="hidden" id="callfrom" value="all">
	<input type="hidden" id="selfId" value="-1">
	<input type="hidden" id="iscatHall" value="-">
	<input type="hidden" id="fromYear" value="N">
	<input type="hidden" id="countDates" value="0">
	<input type="hidden" id="lengthhead" value="0">
	<input type="hidden" id="lengthsp" value="0">
	<input id="chargesId" class="hidden" value="0">
	<input id="configId" class="hidden" value="0">
	
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>ss