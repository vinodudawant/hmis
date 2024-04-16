<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.hms.admin.util.FetchHospitalDetails"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Embryo Transfer</title>
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
<script type="text/javascript" src="js/Admin.js"></script>
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

<link type="text/css" rel="stylesheet"
	href="dhtmlgoodies_calendar/dhtmlgoodies_calendar.css?random=20051112"
	media="screen"></link>
<script type="text/javascript"
	src="dhtmlgoodies_calendar/dhtmlgoodies_calendar.js?random=20060118"></script>
<link rel="stylesheet" type="text/css"
	href="timepeacker/jquery.datetimepicker.css" />
<script src="timepeacker/jquery.datetimepicker.js"></script>


<!-- include js for development -->
<script type="text/javascript" src="js/embryo_transper.js"></script>

<style>
.tabledynamicscroll {
	max-height: 200px;
	overflow: auto;
	scrollbar-width: thin;
}

table>tbody>tr>td>span{
position:unset !important;
}

</style>

</head>
<body>
	<c:if test="${ sessionScope.userType != null }">
		<%
			java.util.Calendar currentDate = java.util.Calendar
						.getInstance();
				java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat(
						"yyyy-MM-dd");
				String todays_date = formatter.format(currentDate.getTime());
		%>
		<!-- HEADER -->
		<header class="navbar clearfix navbar-fixed-top" id="header">
			<%@include file="Menu_Header_Nobel.jsp"%>
		</header>
		<!--/HEADER -->

		<!-- PAGE -->
		<section id="page">
			<!-- SIDEBAR -->
			<%@include file="left_menu_ivf.jsp"%>

			<!-- /SIDEBAR -->
			<div id="main-content">
				<input type="hidden" value="<%=request.getParameter("patientId")%>"
					id="patientId"> <input type="hidden"
					value="<%=request.getParameter("treatmentId")%>" id="treatmentId">
					<input type="hidden"
					value="<%=request.getParameter("IVFTreatmentId")%>" id="IVFTreatmentId">
					
					<input type="hidden" value="0"	id="embryoTransferMasterId">
					<input type="hidden" value="0"	id="coupleId">
					<input type="hidden" value="0"	id="batchCreationId">
					<input type="hidden" id="userId" value="<%=session.getAttribute("userId1")%>">
				<input type="hidden" id="unitId" value="<%=session.getAttribute("uId")%>">


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
											<li><a href="embryo_transper.jsp">Embryo Transper</a></li>
											<li><a></a></li>
										</ul>
										<!-- /BREADCRUMBS -->
									</div>
								</div>
							</div>
							<div class="panel panel-primary">
								<div class="panel-heading">
									<label>Embryo Transper</label>
								</div>
								<div class="col-md-4"
									style="margin-top: 2px; float: right; margin-right: -212px">
									<label><input type="button"
										class="btn btn-xs btn-success pull-right" value="Save"
										id="Save" onclick="saveEmbryoTransperForm()"></label> <label><button
											type="button" class="btn btn-xs btn-warning pull-right"
											style="margin-right: 0%" value="Print" id="Print"
											onclick="embryoTransperPrint()">
											<i class="fa fa-print"></i>
										</button></label> 
								</div>
								<div class="panel-body" style="margin-top: 1%;">
									<div class="panel panel-default" style="margin-top: 0%;">
										<div class="panel-heading">
											<label>A: Patient Information</label>
										</div>
										<div class="panel-body">
											<div class="form-group col-md-4">
												<label>Name Of Patient</label> <input type="text"
													class="form-control" id="nameOfPatient"
													placeholder="Name Of Patient" readonly="true">
											</div>

											<div class="form-group col-md-4">
												<label>Age</label> <input type="text" class="form-control"
													id="patientsAge" placeholder="Age" readonly="true">
											</div>

											<div class="form-group col-md-4">
												<label>HusBand's Name</label> <input type="text"
													class="form-control" id="husbanName"
													"
													placeholder="HusBand's Name"
													disabled="disabled">
											</div>

											<div class="form-inline col-md-12">
												<div class="col-md-2 form-inline">
													<label>Gender:</label>
												</div>
												<div class=" col-md-2" style="margin-top: 0%">
													<label class="radio-inline"><input type="radio"
														name="gender" value="Male">Male</label>
												</div>
												<div class=" col-md-2" style="margin-top: 0%">
													<label class="radio-inline"><input type="radio"
														name="gender" value="Female">Female </label>
												</div>
											</div>
										</div>
										<div class="panel-body">
											<div class="form-group col-md-4">
												<label>Cycle No</label> <input type="text"
													class="form-control" id="cycleNo" placeholder="Cycle No"
													value="<%=request.getParameter("cycleNo")%>"
													readonly="readonly">
											</div>

											<div class="form-group col-md-4">
												<label>Embryologist</label> <input type="text"
													class="form-control" id="embryologist"
													placeholder="Embryologist">
											</div>
											<div class="form-group col-md-4">
												<label>Embryo Transper Date</label> <input type="text"
													class="form-control" id="dateofembryotransper"
													onclick="displayCalendar(document.getElementById('dateofembryotransper'),'yyyy-mm-dd',this)"
													onchange="getBetaHCGDueDateForFresh()"
													placeholder="Date Of Embryo Transper" readonly="readonly">
											</div>

										</div>

										<div class="panel-body">
											<div class="col-md-2 form-inline">
												<label>Embryo Transper:</label>
											</div>
											<div class=" col-md-2" style="margin-top: 0%">
												<label class="radio-inline"><input type="radio"
													name="embryotransper" value="Fresh"
													checked="checked"
													onclick="showFreshFrozenEmbryoTransper('Fresh')">Fresh</label>
											</div>
											<div class=" col-md-2" style="margin-top: 0%">
												<label class="radio-inline"><input type="radio"
													name="embryotransper" value="Frozen"
													onclick="showFreshFrozenEmbryoTransper('Frozen')">Frozen
												</label>
											</div>
										</div>



									</div>
									<!------------------Start Fresh Embryo Transper-------------  -->
									<div class="panel panel-default" style="margin-top: 1%;"
										id="freshembryotransperinfo">
										<div class="panel-heading">
											<label>Embryo grading and quality of embryos formed</label>
										</div>
										<div class="panel-body">
											<div class="form-group col-md-12">
												<div class="pull-right">
													<input type="button" value="+"
														onclick="createRowForFreshEmbryo()"
														id="ovampickupaddid" class="btn btn-xs btn-success" /> <input
														type="button" value="-"
														onclick="deleteFreshEmbryos('embryotransperFreshTabel','chkfreshembryo')"
														id="deletefreshembryo" class="btn btn-xs btn-danger" />&nbsp;
												</div>
												<div class="tabledynamicscroll">
													<table class="table table-bordered responsive "
														id="embryotransperFreshTabel">
														<thead>
															<tr>
																<th>Select</th>
																<th>Embryo</th>
																<th>Egg Number</th>
																<th>Number Of Cells</th>
																<th>Grade</th>
															</tr>
														</thead>
														<tbody id="embryotransperFreshBody">
														</tbody>
													</table>
												</div>

											</div>
										</div>
										<div class="panel-body">
											<div class="form-group col-md-4">
												<label>Anaethesia</label> <input type="text"
													class="form-control" id="anaethesia"
													placeholder="Anaethesia">
											</div>

											<div class="form-group col-md-4">
												<label>No of Embryos Transfered</label> <input type="text"
													class="form-control" id="noofemtranspered"
													placeholder="No of Embryos Transfered">
											</div>
											<div class="form-group col-md-2">
												<label>Time Of Embryo Transper</label> <input type="text"
													class="form-control" id="timeofembryotransper"
													placeholder="Time Of Embryo Transper" readonly="readonly">
											</div>

										</div>

										<div class="panel-body">
											<div class="form-group col-md-4">
												<label>EmbryoLogist</label> 
												<select  class="  col-md-12"   multiple id="emrylogistFresh" name="emrylogistFresh"  style="width: 98%;height: 200%">	
													
												</select>
											</div>

											<div class="form-group col-md-4">
												<label>Endometrium</label> <input type="text"
													class="form-control" id="endometrium"
													placeholder="Endometrium">
											</div>
											<div class="form-group col-md-4">
												<label>Doctor</label> 
												<select  class="col-md-12"   multiple id="doctorNameForFresh" name="doctorNameForFresh"  style="width: 98%;height: 200%">	
													
												</select>
											</div>

										</div>


										<div class="panel-body">
											<div class="form-group col-md-4">
												<label> Cathetor Used</label> <input type="text"
													class="form-control" id="cathetorused"
													placeholder=" Cathetor Used">
											</div>

											<div class="form-group col-md-4">
												<label>Witness</label> <input type="text"
													class="form-control" id="witness" placeholder="Witness">
											</div>
											<div class="form-group col-md-4">
												<label>Nature Of ET</label> <input type="text"
													class="form-control" id="natureofet"
													placeholder="Nature Of ET">
											</div>

										</div>

										<div class="panel-body">
											<div class="col-md-2 form-inline">
												<label>Blood in catheter:</label>
											</div>
											<div class=" col-md-2" style="margin-top: 0%">
												<label class="radio-inline"><input type="radio"
													name="bloodincatheter"  checked="checked"   value="Yes">Yes</label>
											</div>
											<div class=" col-md-2" style="margin-top: 0%">
												<label class="radio-inline"><input type="radio"
													name="bloodincatheter" value="No">NO </label>
											</div>

											<div class="col-md-2 form-inline">
												<label>Embryo returned:</label>
											</div>
											<div class=" col-md-2" style="margin-top: 0%">
												<label class="radio-inline"><input type="radio"
													name="embryoReturned" checked="checked" value="Yes">Yes</label>
											</div>
											<div class=" col-md-2" style="margin-top: 0%">
												<label class="radio-inline"><input type="radio"
													name="embryoReturned" value="No">NO </label>
											</div>

										</div>



										<div class="panel-body">
											<div class="form-group col-md-4">
												<label> Beta HCG Due on</label> <input type="text"
													class="form-control" id="betahcgduedatefresh"
													placeholder=" Beta HCG Due on" readonly="readonly">
											</div>
										</div>

										<div class="panel panel-default" style="margin-top: 0%;">
											<div class="panel-heading">
												<label style="text-decoration: underline;">Fate of
													spare embryos</label>
											</div>
										</div>

										<div class="panel panel-default" style="margin-top: 0%;">
											<div class="panel-heading">
												<label style="text-decoration: underline;">Freezing</label>
											</div>
											<div class="panel-body">
												<div class="form-group col-md-4">
													<label>Number frozen</label> <input type="text"
														class="form-control" id="numberfrozen"
														placeholder="Number frozen">
												</div>

												<div class="form-group col-md-4">
													<label> Embryo Number</label> <input type="text"
														class="form-control" id="embryonumber"
														placeholder="Embryo Number">
												</div>
												<div class="form-group col-md-4">
													<label>Number of straws</label> <input type="text"
														class="form-control" id="numberofstraws"
														placeholder="Number of straws">
												</div>

											</div>

											<div class="panel-body">
												<div class="form-group col-md-4">
													<label>Straw Description</label>
													<textarea id="strawdescription"
														placeholder="Straw Description" name="Straw Description"
														rows="4" cols="50"></textarea>
												</div>

												<div class="form-group col-md-4">
													<label> Storage site</label> <input type="text"
														class="form-control" id="storagesite"
														placeholder="Storage site">
												</div>
												<div class="form-group col-md-2">
													<label>Comments</label>
													<textarea id="comments" placeholder="Comments"
														name="Comments" rows="4" cols="50"></textarea>
												</div>

											</div>


										</div>



										<div class="panel-body">
											<div class="col-md-2 form-inline">
												<label>Assisted Hatching:</label>
											</div>
											<div class=" col-md-2" style="margin-top: 0%">
												<label class="radio-inline"><input type="radio"
													name="assistedhatching"  checked="checked"  value="Yes">Yes</label>
											</div>
											<div class=" col-md-2" style="margin-top: 0%">
												<label class="radio-inline"><input type="radio"
													name="assistedhatching" value="No">NO </label>
											</div>
											<div class="form-group col-md-4">
												<label> Date</label> <input type="text" class="form-control"
													id="dateofattachedhatching"
													onclick="displayCalendar(document.getElementById('dateofattachedhatching'),'yyyy-mm-dd',this)"
													placeholder="Date Of Assisted Hatching" readonly="readonly">
											</div>
											<div class="form-group col-md-2">
												<label>Time </label> <input type="text" class="form-control"
													id="timeofattachedhatching"
													placeholder="Time Of Assisted Hatching" readonly="readonly">
											</div>

										</div>

										<div class="panel-body">
											<div class="col-md-2 form-inline">
												<label>Blastocyst:</label>
											</div>
											<div class=" col-md-2" style="margin-top: 0%">
												<label class="radio-inline"><input type="radio"
													name="blastocyst"  checked="checked"  value="Yes">Yes</label>
											</div>
											<div class=" col-md-2" style="margin-top: 0%">
												<label class="radio-inline"><input type="radio"
													name="blastocyst" value="No">NO </label>
											</div>
											<div class="form-group col-md-4">
												<label> Date</label> <input type="text" class="form-control"
													id="dateofblastocyst"
													onclick="displayCalendar(document.getElementById('dateofblastocyst'),'yyyy-mm-dd',this)"
													placeholder="Date Of Blastocyst" readonly="readonly">
											</div>
											<div class="form-group col-md-2">
												<label>Time </label> <input type="text" class="form-control"
													id="timeofblastocyst" placeholder="Time Of Blastocyst"
													readonly="readonly">
											</div>

										</div>

									</div>
									<!------------------END Fresh Embryo Transper-------------  -->
									<!----------------Start Frozon Embryo Transper---------  -->
									<div class="panel panel-default"
										style="margin-top: 1%; display: none"
										id="frozenembryotransperinfo">
										<div class="panel-heading">
											<label>Frozen Embryo Transper</label>
										</div>
										<div class="panel-body">
											<div class="form-group col-md-4">
												<label> Date</label> <input type="text" class="form-control"
													id="dateoffrozentransper"
													onclick="displayCalendar(document.getElementById('dateoffrozentransper'),'yyyy-mm-dd',this)"
													onchange="getBetaHCGDueDateForFrozen()"
													placeholder="Date Of Frozen Transper" readonly="readonly">
											</div>
											<div class="form-group col-md-2">
												<label>Time </label> <input type="text" class="form-control"
													id="timeoffrozentransper"
													placeholder="Time Of Frozen Transper" readonly="readonly">
											</div>
											<div class="form-group col-md-4">
												<label>Thawed</label> <input type="text"
													class="form-control" id="thawed" placeholder="Thawed">
											</div>
										</div>

										<div class="panel-body">
											<div class="form-group col-md-4">
												<label>Transfered</label> <input type="text"
													class="form-control" id="frozentransfered"
													placeholder="Frozen Transfered">
											</div>
											<div class="form-group col-md-4">
												<label>Balance</label> <input type="text"
													class="form-control" id="frozenbalance"
													placeholder="Frozen Balance">
											</div>
											<div class="form-group col-md-4">
												<label> Beta HCG Due on</label> <input type="text"
													class="form-control" id="betahcgduedatefrozen"
													placeholder=" Beta HCG Due on Frozen" readonly="readonly">
											</div>
										</div>

										<div class="panel-body">
											<div class="form-group col-md-12">
												 <div class="pull-right">
													<input type="button" value="+"
														onclick="createRowFrozenEmbryo()"
														id="frozenembryo" class="btn btn-xs btn-success" /> <input
														type="button" value="-"
														onclick="deleteFrozenEmbryos('embryotransperFrozenTabel','chkfrozenembryo')"
														id="deletefrozenembryo" class="btn btn-xs btn-danger" />&nbsp;
												</div>
												<div class="tabledynamicscroll">
													<table class="table table-bordered responsive "
														id="embryotransperFrozenTabel">
														<thead>
															<tr>
																<th>Select</th>
																<th>#</th>
																<th>Post Thaw Cell Stage</th>
																<th>Grade</th>
															</tr>
														</thead>
														<tbody id="embryotransperFrozenBody">
														</tbody>
													</table>
												</div>
											</div>
										</div>

									</div>
									<!-------------END Frozon Embryo Transper---------  -->
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
		<!-- CUSTOM SCRIPT -->

		<script>
			jQuery(document).ready(function() {
				App.setPage("wizards_validations"); //Set current page 
				App.init(); //Initialise plugins and elements  
				$(function() {
					$('[data-toggle="tooltip"]').tooltip();
				});
				
				$("#emrylogistFresh").select2();
				$("#doctorNameForFresh").select2();
				getPatientInfoForEmbryoTransper();
				getHusbandNameForEmbryoTransper();
				getDoctorListForEmbryoTransper();
				
				getEmbryoMasterInfo();
				//getFormAByTreatmentId();
			});
		</script>

		<script>
			$('#timeofembryotransper').datetimepicker({
				datepicker : false,
				format : 'H:i',
				step : 15
			});
			$('#timeofattachedhatching').datetimepicker({
				datepicker : false,
				format : 'H:i',
				step : 15
			});
			$('#timeofblastocyst').datetimepicker({
				datepicker : false,
				format : 'H:i',
				step : 15
			});
			$('#timeoffrozentransper').datetimepicker({
				datepicker : false,
				format : 'H:i',
				step : 15
			});
		</script>

		<!-- /JAVASCRIPTS -->
	</c:if>
	<c:if test="${sessionScope.userType == null}">
		<jsp:forward page="index.jsp"></jsp:forward>
	</c:if>
</body>
</html>


