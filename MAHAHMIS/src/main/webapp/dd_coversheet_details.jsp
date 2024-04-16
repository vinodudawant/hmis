<%@ taglib uri="http://java.sun.com/jstl/core_rt" prefix="c"%>

<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Doctor Desk</title>
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no">
<meta name="description" content="">
<meta name="author" content="">

<link rel="stylesheet" type="text/css"
	href="ehat-design/css/cloud-admin.css">
<link rel="stylesheet" type="text/css"
	href="ehat-design/css/themes/default.css" id="skin-switcher">
<link rel="stylesheet" type="text/css"
	href="ehat-design/css/responsive.css">
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
<script src="jquery/jquery-2.1.1.js"></script>
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
<link href="ehat-design/font-awesome/css/font-awesome.min.css"
	rel="stylesheet">
<!-- DATE RANGE PICKER -->
<link rel="stylesheet" type="text/css"
	href="ehat-design/js/bootstrap-daterangepicker/daterangepicker-bs3.css" />
<!-- FONTS -->
<script type="text/javascript" src="jquery/jquery-jtemplates.js"></script>
<script type="text/javascript" src="jquery/jquery-migrate-1.2.1.js"></script>
<!--Toggle switch  -->
<script type="text/javascript"
	src="js/bootstrap-switch/bootstrap-switch.min.js"></script>
<link rel="stylesheet" type="text/css"
	href="js/bootstrap-switch/bootstrap-switch.min.css" />
	<script type="text/javascript"
	src="js/bootstrap-switch/bootstrap-switch.js"></script>
	<link rel="stylesheet" type="text/css"
	href="js/bootstrap-switch/bootstrap-switch.min.css" />
<!-- <link
	href='http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700'
	rel='stylesheet' type='text/css'> -->

<!-- include js for development -->
<script type="text/javascript" src="js/dd_complaint_demo_master.js"></script>
<script type="text/javascript" src="js/radiology.js"></script>
<script type="text/javascript" src="js/Pathology.js"></script>
<script type="text/javascript" src="js/ehat_OPDDoctorsDesk.js"></script>
<script type="text/javascript" src="js/dd_demo_master.js"></script>
<script type="text/javascript" src="js/CommonTemplate.js"></script>
<script type="text/javascript" src="js/dd_demo_doctor.js"></script>
<script type="text/javascript" src="js/dd_complaintmaster.js"></script>

<style>
.tabFont {
	font-size: 9px
}

.patientFont {
	font-size: 11px
}

.patHeader {
	font-size: 10px
}

.noteBox {
	background: #f4f4f4;
	color: #555555;
	border-color: #dddddd;
}

.panel-body {
	padding: 10px;
}

.col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7,
	.col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12 {
	padding-left: 8px;
	padding-right: 8px
}

.btn-default.btn-on.active{background-color: #5BB75B;color: white;}
.btn-default.btn-off.active{background-color: #337ab7;color: white;}

.btn-default.btn-on-1.active{background-color: #337ab7;color: white;}
.btn-default.btn-off-1.active{background-color: #337ab7;color: white;}

.btn-default.btn-on-2.active{background-color: #00D590;color: white;}
.btn-default.btn-off-2.active{background-color: #A7A7A7;color: white;}

.btn-default.btn-on-3.active{color: #5BB75B;font-weight:bolder;}
.btn-default.btn-off-3.active{color: #337ab7;font-weight:bolder;}

.btn-default.btn-on-4.active{background-color: #337ab7;color: #5BB75B;}
.btn-default.btn-off-4.active{background-color: #337ab7;color: #337ab7;}
</style>


<!-- <script>
		$('#complaintName').keydown(function (e) {
		   alert('aaa');
			if (e.which === 13) {
		       $(this).next('.inputs').focus();
		    }
		 });
	</script> -->

</head>
<body>
	<!-- HEADER -->
	<c:if test="${ sessionScope.userType != null }">
		<header class="navbar clearfix" id="header">
			<%@include file="Menu_Header_Nobel.jsp"%>
		</header>
		<!--/HEADER -->

		<!-- PAGE -->
		<section id="page">
			<!-- SIDEBAR -->
			<div id="sidebar" class="sidebar">
				<div class="sidebar-menu nav-collapse"></div>
				<!--  <div class="sidebar-menu nav-collapse">
				
			</div>-->
			</div>
			<!-- /SIDEBAR -->

			<div id="main-content">
				<div class="container">
					<div class="row">
						<div id="content" class="col-lg-12">
							<!-- PAGE HEADER-->
							<div class="row">
								<div class="col-sm-12">
									<div class="page-header"
										style="margin: 0 -15px 5px; min-height: 0px;">
										<!-- BREADCRUMBS -->
										<ul class="breadcrumb">
											<li><i class="fa fa-home"></i> <a href="index.html">Home</a>
											</li>
											<li><a href="#">Doctor Desk</a></li>
										</ul>
										<!-- /BREADCRUMBS -->
									</div>
								</div>
							</div>
							<!-- /PAGE HEADER -->

							<!-- INLINE TABS -->
							<div class="row">
								<div class="col-md-12">

									<div class="box-body big col-md-3">
										<div class="row patientFont">
											<div class="col-md-3">
												<img class="img-responsive" src="patImages/patientPhoto.jpg"></img>
											</div>
											<div class="col-md-8">
												<p>Mr. Vinod Udawant</p>
												<p>UHID : MH00000001</p>
											</div>

											<div class="col-md-12">
												<div class="panel panel-default" style="height: 510px">
													<div class="panel-body">
														<div class="tabbable">
															<ul class="nav nav-tabs">
																<li class="active"><a href="#tab_1_1"
																	data-toggle="tab">Treatment</a></li>
																<li><a href="#tab_1_2" data-toggle="tab">Uploads</a></li>
															</ul>
															<div class="tab-content">
																<div class="tab-pane fade in active" id="tab_1_1">
																	<div class="divide-10"></div>
																	<div class="col-md-2"
																		style="background: orange; height: 20px; font-size: 15px">
																		<a style="cursor: pointer;"><i class="fa fa-home"></i></a>
																	</div>
																	<div class="col-md-10"
																		style="background: gray; height: 20px">
																		<a style="cursor: pointer; color: white;"
																			onclick="displayHideDiv()">Current : 03/01/2020</a>
																	</div>
																	<div class="col-md-12" style="overflow: auto;">
																		<table class="table">
																			<thead>
																				<tr>
																					<th style="width: 5%">#</th>
																					<th style="width: 60%">Date</th>
																					<th style="width: 20%">Dept.</th>
																					<th style="width: 15%"></th>
																				</tr>
																			</thead>
																			<tbody>
																				<tr>
																					<td>1</td>
																					<td>04/01/2020</td>
																					<td>OPD</td>
																					<td><button>
																							<i class="fa fa-print"></i>
																						</button></td>
																				</tr>
																				<tr>
																					<td>2</td>
																					<td>07/01/2020</td>
																					<td>OPD</td>
																					<td><button>
																							<i class="fa fa-print"></i>
																						</button></td>
																				</tr>
																			</tbody>
																		</table>
																	</div>
																</div>
																<div class="tab-pane fade" id="tab_1_2">
																	<div class="divide-10"></div>
																	<p>Notes</p>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div class="box-body big col-md-9">
										<div class="alert alert-success"
											style="padding: 10px; margin-bottom: 5px; height: 50px; background: white; color: #555555">
											<div class="col-md-12">
												<label class="col-md-3 patHeader">Treatment No :
													opd/1920/0001</label> <label class="col-md-3 patHeader">Age
													: 25y</label> <label class="col-md-3 patHeader">Bill
													Category : Self</label> <label class="col-md-3 patHeader">Consultant
													: Dr. Suresh Wagh</label>
													<i class="fa fa-plus fa-4 pull-right" style="font-size:20px;color:red" aria-hidden="true" ></i>
												
											</div>
											
											<div class="divide-20"></div>
											<div class="col-md-12">
												<label class="col-md-3 patHeader">DOA : 29/04/1993</label> <label
													class="col-md-3 patHeader">Gender : Male</label> <label
													class="col-md-3 patHeader">Bill No : 1524</label> <label
													class="col-md-3 patHeader">Ref By : Dr. Sunita lad</label>
											</div>
											
											
											
										</div>
										<div class="row">

											<div class="col-md-10" id="divHide" style="display: none;">

												<div class="col-md-12">
													<div class="box-body">
														<div class="row">
															<div class="col-md-2">
																<a class="btn noteBox btn-icon input-block-level"
																	href="javascript:void(0);"> <i
																	class="fa fa-facebook-square fa-2x"></i>
																	<div style="font-size: 11px">Total Visits</div> <span
																	class="label label-right label-danger">7</span>
																</a>
															</div>
															<div class="col-md-2">
																<a class="btn noteBox btn-icon input-block-level"
																	href="javascript:void(0);"> <i
																	class="fa fa-facebook-square fa-2x"></i>
																	<div style="font-size: 11px">Lab Orders</div> <span
																	class="label label-right label-danger">7</span>
																</a>
															</div>
															<div class="col-md-2">
																<a class="btn noteBox btn-icon input-block-level"
																	href="javascript:void(0);"> <i
																	class="fa fa-facebook-square fa-2x"></i>
																	<div style="font-size: 11px">Radiology Order</div> <span
																	class="label label-right label-danger">7</span>
																</a>
															</div>
															<div class="col-md-2">
																<a class="btn noteBox btn-icon input-block-level"
																	href="javascript:void(0);"> <i
																	class="fa fa-facebook-square fa-2x"></i>
																	<div style="font-size: 11px">Notes</div> <span
																	class="label label-right label-danger">7</span>
																</a>
															</div>
															<div class="col-md-2">
																<a class="btn noteBox btn-icon input-block-level"
																	href="javascript:void(0);"> <i
																	class="fa fa-facebook-square fa-2x"></i>
																	<div style="font-size: 11px">Reccomandations</div> <span
																	class="label label-right label-danger">7</span>
																</a>
															</div>
														</div>
													</div>
												</div>

												<div class="col-md-6">
													<div class="panel-group" id="accordion">
														<div class="panel panel-default">
															<div class="panel-heading">
																<h3 class="panel-title">
																	<a class="accordion-toggle" data-toggle="collapse"
																		data-parent="#accordion" href="#collapseOne">Lab
																		Orders</a>
																</h3>
															</div>
															<div id="collapseOne" class="panel-collapse collapse in">
																<div class="panel-body tabFont"
																	style="height: 100px; overflow: auto;">
																	<table class="table">
																		<thead>
																			<tr>
																				<th style="width: 5%">#</th>
																				<th style="width: 60%">Particulars</th>
																				<th style="width: 20%">Date</th>
																				<th style="width: 15%">Report</th>
																			</tr>
																		</thead>
																		<tbody>
																			<tr>
																				<td>1</td>
																				<td>CBC</td>
																				<td>04/01/2020</td>
																				<td><button>
																						<i class="fa fa-print"></i>
																					</button></td>
																			</tr>
																			<tr>
																				<td>2</td>
																				<td>Lipid Profile</td>
																				<td>04/01/2020</td>
																				<td><button>
																						<i class="fa fa-print"></i>
																					</button></td>
																			</tr>
																		</tbody>
																	</table>
																</div>
															</div>
														</div>
														<div class="panel panel-default">
															<div class="panel-heading">
																<h3 class="panel-title">
																	<a class="accordion-toggle" data-toggle="collapse"
																		data-parent="#accordion" href="#collapseTwo">Radiology
																		Orders</a>
																</h3>
															</div>
															<div id="collapseTwo" class="panel-collapse collapse">
																<div class="panel-body">Radiology Orders</div>
															</div>
														</div>
														<div class="panel panel-default">
															<div class="panel-heading">
																<h3 class="panel-title">
																	<a class="accordion-toggle" data-toggle="collapse"
																		data-parent="#accordion" href="#collapseThree">Medication</a>
																</h3>
															</div>
															<div id="collapseThree" class="panel-collapse collapse">
																<div class="panel-body">Medication</div>
															</div>
														</div>
													</div>
												</div>

												<div class="col-md-6">
													<div class="panel-group" id="accordion2">
														<div class="panel panel-default">
															<div class="panel-heading">
																<h3 class="panel-title">
																	<a class="accordion-toggle" data-toggle="collapse"
																		data-parent="#accordion2" href="#collapseFour">Vitals
																	</a>
																</h3>
															</div>
															<div id="collapseFour" class="panel-collapse collapse in">
																<div class="panel-body tabFont"
																	style="height: 100px; overflow: auto;">
																	<table class="table">
																		<thead>
																			<tr>
																				<th style="width: 5%">#</th>
																				<th style="width: 60%">Particulars</th>
																				<th style="width: 20%">Date</th>
																				<th style="width: 15%">Report</th>
																			</tr>
																		</thead>
																		<tbody>
																			<tr>
																				<td>1</td>
																				<td>Temparature (0 F)</td>
																				<td>04/01/2020</td>
																				<td>----</td>
																			</tr>
																			<tr>
																				<td>2</td>
																				<td>Pulse(Min)</td>
																				<td>04/01/2020</td>
																				<td>----</td>
																			</tr>
																		</tbody>
																	</table>
																</div>
															</div>
														</div>
														<div class="panel panel-default">
															<div class="panel-heading">
																<h3 class="panel-title">
																	<a class="accordion-toggle" data-toggle="collapse"
																		data-parent="#accordion2" href="#collapseFive">Measurements
																	</a>
																</h3>
															</div>
															<div id="collapseFive" class="panel-collapse collapse">
																<div class="panel-body">Measurements</div>
															</div>
														</div>
														<div class="panel panel-default">
															<div class="panel-heading">
																<h3 class="panel-title">
																	<a class="accordion-toggle" data-toggle="collapse"
																		data-parent="#accordion2" href="#collapseSix">Alergies
																	</a>
																</h3>
															</div>
															<div id="collapseSix" class="panel-collapse collapse">
																<div class="panel-body">Alergies</div>
															</div>
														</div>
													</div>
												</div>
												<div class="col-md-12" style="margin-top: 5px">
													<div class="panel panel-default">
														<div class="panel-heading">
															<h3 class="panel-title" style="font-size: 15px">
																<a>Reccomandations</a>
															</h3>
														</div>
														<div class="panel-body">
															<div class="tabbable tabs-left">
																<ul class="nav nav-tabs">
																	<li class="active"><a href="#tab_3_1"
																		data-toggle="tab">Surgery Advice</a></li>
																	<li><a href="#tab_3_2" data-toggle="tab">General
																			Advice</a></li>
																	<li><a href="#tab_3_3" data-toggle="tab">Radiotheoropy</a></li>
																	<li><a href="#tab_3_4" data-toggle="tab">Chemotheropy</a></li>
																</ul>
																<div class="tab-content">
																	<div class="tab-pane fade in active" id="tab_3_1">
																		<p>
																			Surgery Advice Content
																			<!-- <table class="table col-md-12">
																	<thead>
																		<tr>
																			<th style="width: 5%">#</th>
																			<th style="width: 40%">Recomandation</th>
																			<th style="width: 40%">Recomanded By</th>
																			<th style="width: 15%">Date</th>
																		</tr>
																	</thead>																
																 </table> -->
																		</p>
																	</div>
																	<div class="tab-pane fade" id="tab_3_2">
																		<p></p>
																	</div>
																	<div class="tab-pane fade" id="tab_3_3">
																		<p></p>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div class="col-md-10" id="accordion2">
											<div class="panel panel-default alert alert-success" style="padding: 10px; margin-bottom: 5px; height: 50px; background: white; color: #555555">
											<div class="col-md-12"> 
											<div class="col-md-1 mb-1"></div>
												<label class="col-md-3 patHeader">Appointment With <b>Dr.Giri</b></label>
												<label class="col-md-3 patHeader">Treatment No:</label>
												<label class="col-md-3 patHeader">Follow Up:17/3/2020</label>
												<i class="fa fa-clock-o" style="font-size:15px;" aria-hidden="true"></i>&nbsp;&nbsp;
												<i class="fa fa-copy" style="font-size:15px;" aria-hidden="true"></i>&nbsp;&nbsp;
												<i class="fa fa-print" style="font-size:15px;" aria-hidden="true"></i>&nbsp;&nbsp;
												<i class="fa fa-share" style="font-size:15px;" aria-hidden="true"></i>&nbsp;&nbsp;
												<i class="fa fa-file" style="font-size:15px;" aria-hidden="true"></i>
												<!-- <i class="fa fa-save" style="font-size:20px;" aria-hidden="true"></i> -->

													<!-- <button ><i class="fa fa-share-alt"></i></button> 
													<button><i class="fa fa-print"></i></button> -->
													<!-- </label> <label class="col-md-3 patHeader">Consultant
													: Dr. Suresh Wagh</label> -->
											</div>
											<div class="divide-20"></div>
											<div class="col-md-12">
											<div class="col-md-1 mb-1"></div>
												<label class="col-md-3 patHeader">05.33 pm</label> <label
													class="col-md-3 patHeader">DOA : </label> <label
													class="col-md-3 patHeader">11:30 AM : [Friday]</label> 
													<!-- <label class="col-md-3 patHeader">Ref By : Dr. Sunita lad</label> -->
											</div>
												</div>
												<!--Start Complaints and Symptoms-->
												<div class="panel panel-default">
													<div class="panel-heading">
														<h3 class="panel-title">
															<a style="text-decoration: none; font-size: 12px;"
																class="accordion-toggle " data-toggle="collapse"
																data-parent="#accordion2" href="#collapse3"><b>
																	Complaints & Symptoms</b><i class="fa fa-pencil"
																aria-hidden="true" style="padding: 10px; left: 800px;"></i></a>
														</h3>
													</div>
													<div id="collapse3" class="panel-collapse collapse">
														<div class="panel-body">
															<div class="tab-content col-md-12">
																<div id="collapse3" class="tab-pane fade in active">
																	<br /> <br />
																	<form>
																		<div class="col-md-12" id="divForEntry">
																			<div class="form-group row">
																				<label for="inputPassword"
																					class="col-sm-3 col-form-label"> </label>
																				<div class="col-sm-5 "
																					style="border: solid 1px #C7CBD5;">
																					<table id="tblForAutosuggest">
																						<tr>
																							<td>
																								<div class="col-sm-12" id="div0">
																									<input type="hidden" id="complaint0"> <input
																										type="text" id="0"
																										class="form-control typeahead"
																										style="border: none; outline: none; width: 100%;"
																										placeholder="Complaints" size="70"
																										onkeyup="centerComplaintAutoSuggestion(this.id);" />
																								</div>
																							</td>
																						</tr>
																					</table>
																				</div>
																				<li class="pull-right" id="divEntry1">
																				<div class="btn-group" role="group"
																					aria-label="Third group">
																					<button type="reset" class="btn btn-xs btn-danger"
																						value="cancel">Cancel</button>
																				</div>
																				<div class="btn-group" role="group"
																					aria-label="Third group">
																					<button class="btn btn-primary btn-xs"
																						onclick="saveComplaintMaster();">Submit</button>
																				</div>
																			</li>
																			</div>
																		</div>
																	</form>
																</div>
															</div>
														</div>
													</div>
												</div>
												<!--End Complaints and Symptoms-->
												
												<!--Start Clinical Evaluation-->
												<div class="panel panel-default">
													<div class="panel-heading">
														<h3 class="panel-title">
															<a style="text-decoration: none; font-size: 12px;"
																class="accordion-toggle " data-toggle="collapse"
																data-parent="#accordion2" href="#clinical_evolution"><b>
																	Clinical Evaluation</b><i class="fa fa-pencil" 
																aria-hidden="true" style="padding: 10px; left: 800px;"></i></a>
														</h3>
													</div>
													<div id="clinical_evolution"
														class="panel-collapse collapse">
														<div class="panel-body">
															<div class="tab-content">
																<div id="clinical_evolution"
																	class="tab-pane fade in active">
																	<br /> <br />
																	<form>
																		<div class="col-md-12" id="divForEntry1">
																			<div class="form-group row">
																				<label for="inputPassword"
																					class="col-sm-3 col-form-label"> </label>
																				<div class="col-sm-5 "
																					style="border: solid 1px #C7CBD5;">
																					<table id="tblForAutosuggestForClinical">
																						<tr>
																							<td>
																								<div class="col-sm-12" id="divBy10">
																									<input type="hidden" id="clinical10"> <input
																										type="text" id="10"
																										class="form-control typeahead"
																										style="border: none; outline: none; width: 100%;"
																										placeholder="Clinical Evaluation" size="70"
																										onkeyup="centerClinicalEvolutionAutoSuggestion(this.id);" />
																								</div>
																							</td>
																						</tr>
																					</table>
																				</div>
																				<li class="pull-right">
																				<div class="btn-group" role="group"
																					aria-label="Third group">
																					<button type="reset" class="btn btn-xs btn-danger"
																						value="cancel">Cancel</button>
																				</div>
																				<div class="btn-group" role="group"
																					aria-label="Third group" id="divForEntry5">
																					<button class="btn btn-primary btn-xs"
																						onclick="saveClinical();">Submit</button>
																				</div>
																			</li>
																			</div>
																			
																		</div>
																	</form>
																</div>
															</div>
														</div>
													</div>
												</div>
												<!--End Clinical Evaluation-->
												<!--Start Service Advised  -->
												<div class="panel panel-default">
													<div class="panel-heading">
														<h3 class="panel-title">
															<a style="text-decoration: none; font-size: 12px;"
																class="accordion-toggle " data-toggle="collapse"
																data-parent="#accordion2" href="#service_advised"
																onclick="toggleEntryDivService('divForEntry3')"><b>
																	Service Advised</b><i class="fa fa-pencil"
																aria-hidden="true" style="padding: 10px; left: 800px;"></i></a>
														</h3>
													</div>
													<div id="service_advised" class="panel-collapse collapse">
														<div class="panel-body">
															<div class="tab-content">
																<div id="service_advised"
																	class="tab-pane fade in active">
																	<br /> <br />
																	<form>
																		<div class="col-md-12" id="divForEntry3"
																			style="display: none">
																			<div class="form-group row">
																				<label for="inputPassword"
																					class="col-sm-3 col-form-label">Service
																					Name</label>
																				<div class="col-sm-5"
																					style="border: 2px solid #C7CBD5;">
																					<input class="form-control typeahead sss"
																						style="border: none; outline: none;"
																						title="Please enter notes" id="txtautoserviceName"
																						type="text" placeholder="Service Name"
																						onkeyup="setallservautocomplete(this.id)" />

																				</div>

																			</div>
																			<div class="form-group row">
																				<label for="inputPassword"
																					class="col-sm-3 col-form-label"> </label>
																				<div
																					class="col-sm-5 select2-container select2-container-multi"
																					style="border: 2px solid #C7CBD5;">
																					<ul id="dynamicItem" class="select2-choices"
																						style="overflow-y: scroll;"></ul>
																					<!-- <input class="form-control typeahead sss"
																						style="border: none; outline: none;"
																						title=" " id="cvs" type="text"
																						placeholder=" " /> -->
																				</div>
																			</div>
																			<div class="form-group row">
																				<label for="inputPassword"
																					class="col-sm-3 col-form-label">Urgent</label>
																				<div class="col-sm-5">
																					<input id="cpoeUrgent" type="checkbox" />
																				</div>
																				<div class="col-sm-3" id="cpoesndtolabdiv"
																					style="display: none">
																					<label for="inputPassword"
																						class="col-sm-6 col-form-label">Send To
																						Lab</label>
																					<div class="col-sm-5">
																						<input id="cpoesndtolab" type="checkbox"
																							name="cpoesndtolab" />
																					</div>
																				</div>
																				<div class="col-sm-3" id="cpoeSendToRisdiv"
																					style="display: none">
																					<label for="inputPassword"
																						class="col-sm-6 col-form-label">Send To
																						RIS</label>
																					<div class="col-sm-5">
																						<input id="cpoeSendToRis" type="checkbox"
																							name="cpoeSendToRis" />
																					</div>
																				</div>
																				<div class="col-sm-3" id="cpoeSendToRaddiv"
																					style="display: none">
																					<label for="inputPassword"
																						class="col-sm-6 col-form-label">Send To
																						Radiation</label>
																					<div class="col-sm-5">
																						<input id="cpoeSendToRad" type="checkbox"
																							name="cpoeSendToRad" />
																					</div>
																				</div>
																			</div>
																			<div class="form-group row" style="display: none">
																				<label for="inputPassword"
																					class="col-sm-3 col-form-label">Doctor</label>
																				<div class="col-sm-5"
																					style="border: 2px solid #C7CBD5;">
																					<select onchange="fetchDoctor();"
																						class="form-control typeahead sss"
																						style="border: none; outline: none;"
																						title="Please enter doctor" id="doctorDetails">
																					</select>
																				</div>
																			</div>
																			<div class="form-group row" style="display: none">
																				<label for="inputPassword"
																					class="col-sm-3 col-form-label">Hospital</label>
																				<div class="col-sm-5"
																					style="border: 2px solid #C7CBD5;">
																					<select class="form-control typeahead sss"
																						style="border: none; outline: none;"
																						title="Select Hospital" id="hospitalId">
																						<option value="0">Select</option>
																					</select>
																				</div>
																			</div>
																			<div class="form-group row" style="display: none">
																				<label for="inputPassword"
																					class="col-sm-3 col-form-label">Unit</label>
																				<div class="col-sm-5"
																					style="border: 2px solid #C7CBD5;">
																					<select onchange="fetchUnit();"
																						class="form-control typeahead sss"
																						style="border: none; outline: none;"
																						title="select unit" id="uId"></select>

																				</div>
																			</div>
																			<div class="form-group row">
																				<label for="exampleInputEmail1"
																					class="col-sm-3 col-form-label">charges</label>
																				<div class="col-sm-5"
																					style="border: 2px solid #C7CBD5;">
																					<input class="form-control typeahead "
																						readonly="readonly"
																						style="border: none; outline: none;"
																						title="Please enter charges" id="chargesubservice"
																						type="text" placeholder="charges"
																						onchange="setHiddenFieldOpdDokDesk(this.value),calculateEmerChrForDocDesskOpd()" />
																					<input type="hidden" value="" id="cpoeCharges2">
																				</div>
																			</div>
																			<div class="form-group row">
																				<label for="inputPassword"
																					class="col-sm-3 col-form-label">Instructions</label>
																				<div class="col-sm-5"
																					style="border: 2px solid #C7CBD5;">
																					<input class="form-control typeahead sss"
																						style="border: none; outline: none;"
																						title="Please enter instructions" id="instruction"
																						type="text" placeholder="instructions" />

																				</div>
																			</div>
																			<div class="form-group row">
																				<label for="inputPassword"
																					class="col-sm-3 col-form-label">Clinical
																					Notes</label>
																				<div class="col-sm-5"
																					style="border: 2px solid #C7CBD5;">
																					<input class="form-control typeahead sss"
																						style="border: none; outline: none;"
																						title="Please enter notes" id="clinicalNotes"
																						type="text" placeholder="notes" />

																				</div>
																			</div>
																			<li class="pull-right">
																				<div class="btn-group" role="group"
																					aria-label="Third group">
																					<button type="reset" class="btn btn-xs btn-danger"
																						value="cancel">Cancel</button>
																				</div>
																				<div class="btn-group" role="group"
																					aria-label="Third group">
																					<button class="btn btn-primary btn-xs"
																						onclick="saveCpoe('DoctorStation')">Submit</button>
																				</div>
																			</li>

																		</div>
																		<div class="col-md-12">
																			<div class="tabbable header-tabs">
																				<div class="row" style="margin-top: 5px">
																					<div class="col-md-12">
																						<div class="col-sm-12">
																							<div class="pull-right">
																								<div id="datatable1_filter"
																									class="dataTables_filter">
																									<label id="searchlabel"> </label>
																								</div>
																							</div>
																						</div>
																						<div class="panel-body">
																							<table id="ehatTable"
																								class="datatable table table-striped table-bordered"
																								style="height: 100px;">
																								<thead id="ehatTHead" class="fixedheaderdemo">
																									<tr>
																										<th class="col-md-1 center">#</th>
																										<th class="col-md-1 center">Particulars</th>
																										<th class="col-md-1 center">Date</th>
																										<!-- <th class="col-md-1 center">Consultant Name</th> -->
																										<th class="col-md-1 center">Type</th>
																										<th class="col-md-1 center">Status</th>

																									</tr>
																								</thead>
																								<!-- <tbody id="tcpoeservices">
																								</tbody> -->
																							</table>

																							<div id="flip-scroll" class="col-sm-12-1"
																								style="overflow-y: scroll; height: 115px; maxheight: auto; margin-top: -21px;">
																								<table
																									class="table table-striped table-condensed">
																									<tbody id="tcpoeservices">

																									</tbody>
																								</table>
																								<input id="CPOErowCount" type="hidden" value="0">
																							</div>
																						</div>

																					</div>
																				</div>
																			</div>
																		</div>
																	</form>
																</div>
															</div>
														</div>
													</div>
												</div>
												<!--End Service Advised  -->
												<!--Start History  -->
												<div class="panel panel-default">
													<div class="panel-heading">
														<h3 class="panel-title">
															<a style="text-decoration: none; font-size: 12px;"
																class="accordion-toggle " data-toggle="collapse"
																data-parent="#accordion2" onclick="resetDiagoForm()"
																href="#collapseHistory"><b>History </b><i
																class="fa fa-pencil" aria-hidden="true"
																style="padding: 10px; left: 800px;"></i></a>
														</h3>
													</div>
													<div id="collapseHistory" class="panel-collapse collapse">

														<div class="panel-body">
															<!-- panel-body start -->

															<div class="form-row">
																<div class="col-md-4 mb-3" id="diagByName">
																	<label>Personal History</label> 
																	<table id="tblForAutosuggestForHistory" style="border: solid 1px #C7CBD5;">
																						<tr>
																							<td>
																								<div class="col-sm-12"  id="documentByName20">
																									<input type="hidden" id="history20"> <input
																										type="text" id="20"
																										class="form-control typeahead"
																										style="border: none; outline: none; width: 100%;"
																										placeholder="Personal History" size="70"
																										onkeyup="centerHistoryAutoSuggestion(this.id);" />
																								</div>
																							</td>
																						</tr>
																					</table>
																</div>
																<div class="col-md-4 mb-3" id="diagBydesc">
																	<label>Family History</label> 
																	 <table id="tblForAutosuggestForFamilyHistory" style="border: solid 1px #C7CBD5;">
																						<tr>
																							<td>
																								<div class="col-sm-12"  id="documentByName30">
																									<input type="hidden" id="familyhistoryid30"> <input
																										type="text" id="familyhistory30"
																										class="form-control typeahead"
																										style="border: none; outline: none; width: 100%;"
																										placeholder="Family History" size="70"
																										onkeyup="centerFamilyHistoryAutoSuggestion(this.id);" />
																								</div>
																							</td>
																						</tr>
																					</table>
																</div>
																<!-- <div class="col-md-12">&nbsp;</div> -->
																<div class="col-md-4 mb-9 pull-right" id="divEntry">
																<div class="col-md-4 mb-9">&nbsp;</div>
																<div class="col-md-2 mb-3">&nbsp;</div>
																<button type="reset" class="btn btn-xs btn-danger " id="cancel"
																		value="cancel">Cancel</button>
																	<button class="btn btn-primary btn-xs " name="submit" id="submit"
																		onclick="saveHistory();">Submit</button>
																	
																</div>
															</div>
															<hr></hr>
															<!-- panel-body end -->
														</div>
													</div>
												</div>
													<!--End History  -->
											</div>
											<div class="col-md-2" style="padding-left: 0px">
												<div class="panel panel-default" style="height: 525px">
													<div class="panel-body">
														<div class="tabbable">
															<ul class="nav nav-tabs" style="font-size: 10px">
																<li class="active"><a href="#tab_1_1"
																	data-toggle="tab"><b>Navigation</b></a></li>
																<li><a href="#tab_1_2" data-toggle="tab"><b>Notes</b></a></li>
															</ul>
															<div class="tab-content">
																<div class="tab-pane fade in active" id="tab_1_1">
																	<div class="divide-10">
																	<!-- <p>Content</p> -->
																	<div class="divide-10">&nbsp;</div>
																	<div class="divide-10">&nbsp;</div>
																	<div class="form-group col-md-12">
																					<select name='optionalormandatory'  class="input-group form-control" id="optionalormandatory" style='width: 100%' > 
																							<option value="0" >SPECIALITY</option> 
																							</select>
																			</div>
																			<!-- <div class="form-group col-md-12">
																					<div class="col-md-6">
																					<button type="button" class="btn btn-default" style="border: solid 1px #C7CBD5;" data-target="#ViewBMIDetailsPopup" data-toggle="modal" onclick="viewBMIDetailsFromDoctorDesk('onclick');" id="viewBMI">BMI&BSI</button>
																					</div>
																					<div class="col-md-6">
																					<button type="button" class="btn btn-default" style="border: solid 1px #C7CBD5;">Charts</button>
																					</div>
																			</div> -->
																			<!-- <div class="form-group col-md-12">
																					<div class="col-md-12">
																					<button type="button" class="btn btn-default" style="border: solid 1px #C7CBD5;">&nbsp;&nbsp;&nbsp;Access Templates&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
																			</div>
																			</div > -->
																			 <!-- <div class="form-group col-md-12">
																					<div class="col-md-12">
																					<button type="button" class="btn btn-default" style="border: solid 1px #C7CBD5;">Immunization Schedule </button>
																			</div> 
																			</div> -->
																			<!-- <div class="form-group col-md-12">
																					<div class="col-md-12">
																					<button type="button" class="btn btn-default" style="border: solid 1px #C7CBD5;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Formulae&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
																		
																			</div>
																			</div> -->
																			<hr/>
																			<div class="col-md-12">&nbsp;</div>
																			<div class="col-md-12">&nbsp;</div>
																			<div class="col-md-12">&nbsp;</div>
																			<div class="form-group col-md-12">
																			<label for="inputPassword"
																					class="col-sm-3 col-form-label">Emergency/<br>High&nbsp;Risk </label>
																			<div class="btn-group pull-right" id="status" data-toggle="buttons" data-size="mini">
																	              <label class="btn btn-default btn-off-1 btn-sm">
																	              <input type="radio" value="1" name="multifeatured_module[module_id][status]" data-size="mini">ON</label>
																	              <label class="btn btn-default btn-on-1 btn-sm active  ">
																	              <input type="radio" value="0" name="multifeatured_module[module_id][status]"checked="checked" data-size="mini">OFF</label>
																	        </div>
																		</div>
																		<div class="col-md-12">&nbsp;</div>
																			<div class="form-group col-md-12">
																			<label for="inputPassword"
																					class="col-sm-3 col-form-label">Seropositive</label>
																			<div class="btn-group pull-right" id="status" data-toggle="buttons" >
																	              <label class="btn btn-default btn-off-1 btn-sm">
																	              <input type="radio" value="1" name="multifeatured_module[module_id][status]">ON</label>
																	              <label class="btn btn-default btn-on-1 btn-sm active ">
																	              <input type="radio" value="0" name="multifeatured_module[module_id][status]"checked="checked">OFF</label>
																	        </div>
																		</div>
																</div>
																</div>
																<div class="tab-pane fade" id="tab_1_2">
																	<div class="divide-10"></div>
																	<p>Notes</p>
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
							<!-- /INLINE TABS -->
<!-- <div id="ViewBMIDetailsPopup" class="modal fade in" tabindex="-1"
	role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" >
	<div class="modal-dialog">
		<div class="modal-content col-md-12">
			<div class="modal-body">
				<div class="col-md-3-1 pull-right" style="margin-top: 5px;">
					<label>Patient DOB: </label><label id="pdob"
						style="padding-left: 15px;"></label>
				</div>
				<div class="modal-header" style="padding-top: 3%;">
					<div class="col-md-10-1">
						<div class="col-md-2-1">
							<label class="TextFont">Weight (Kg)<b
								style="color: red; padding-left: 2px;">*</b></label>
							<div class="col-md-12-1" style="margin-top: 10px;">
								<input id="weight" onkeyup="calculateBMI()"
									class="form-control input-SmallText col-md-9-1" type="text"
									placeholder="Weight" name="weight"
									onkeypress="return validateNumbers(event)" />
							</div>
						</div>
						<div class="col-md-2-1">
							<label class="TextFont">Height (Cm)<b
								style="color: red; padding-left: 2px;">*</b></label>
							<div class="col-md-12-1" style="margin-top: 10px;">
								<input id="height" onkeyup="calculateBMI()"
									onkeypress="return validateNumbers(event)"
									class="form-control input-SmallText col-md-9-1" type="text"
									placeholder="height" name="height" />
							</div>
						</div>
						<div class="col-md-2-1">
							<label class="TextFont">BMI (Kg/(M<sup>2</sup>))
							</label>
							<div class="col-md-12-1" style="margin-top: 10px;">
								<input id="BMI" class="form-control input-SmallText col-md-9-1"
									type="text" placeholder="BMI" name="BMI" readonly="readonly" />
							</div>
						</div>
						<div class="col-md-2-1">
							<label class="TextFont">BSA (M<sup>2</sup>)
							</label>
							<div class="col-md-12-1" style="margin-top: 10px;">
								<input id="BSA" class="form-control input-SmallText col-md-9-1"
									type="text" placeholder="BSA" name="BSA" readonly="readonly" />
							</div>
						</div>
						<div class="col-md-2-1">
							<label class="TextFont">Head CIM (Cm/In)</label>
							<div class="col-md-12-1" style="margin-top: 10px;">
								<input id="HCIM" onkeypress="return validateNumbers(event)"
									class="form-control input-SmallText col-md-9-1" type="text"
									placeholder="HCIM" name="HCIM" />
							</div>
						</div>
						<div class="col-md-2-1">
							<label class="TextFont">BMI Date</label>
							<div class="col-md-12-1" style="margin-top: 10px;">
								<input id="BMIDate" readonly="readonly"
									class="form-control input-SmallText col-md-9-1" type="text"
									placeholder="BMI Date" />
							</div>
						</div>
					</div>
					<div>
						<div class="col-md-1-1" style="margin-top: 0px; line-height: 1.2">
							<button class="btn btn-xs btn-success editUserAccess"
								onclick="saveBMIFromDoctorDesk();" disabled="disabled">
								<i class="fa fa-save"></i>
							</button>
							<button onclick="refreshBMIBSA();" title="" data-placement="left"
								data-toggle="tooltip" class="btn btn-xs btn-danger"
								data-original-title="Refresh">
								<i class="fa fa-refresh"></i>
							</button>
						</div>
						<button class="btn btn-xs btn-danger coversheetBtn cls" type="button"
							style="margin-top: 0px;" data-dismiss="modal">
							<i class="fa fa-arrows"></i> Close
						</button>
					</div>
				</div>
				<div class="modal-body">
					<div class="col-sm-12-1">
						<table class="table table-condensed">
							<thead>
								<tr>
									<th class="col-md-1-1 center"><div class="TextFont">#</div></th>
									<th class="col-md-2-1 center"><div class="TextFont">Adm.
											no.</div></th>
									<th class="col-md-1-1 center"><div class="TextFont">Weight
											(Kg)</div></th>
									<th class="col-md-1-1 center"><div class="TextFont">Height
											(Cm)</div></th>
									<th class="col-md-1-1 center"><div class="TextFont">
											BMI (Kg/M<sup>2</sup>)
										</div></th>
									<th class="col-md-1-1 center"><div class="TextFont">
											BSA (M<sup>2</sup>)
										</div></th>
									<th class="col-md-1-1 center"><div class="TextFont">Head
											CIM (Cm/In)</div></th>
									<th class="col-md-1-1"><div class="TextFont">BMI
											Date</div></th>
									<th class="col-md-1-1 center"><div class="TextFont">Edit</div></th>
								</tr>
							</thead>
						</table>
					</div>
					<div class="col-sm-12-1"
						style="margin-top: -21px; border: 1px solid #b8b8b8; overflow-y: scroll; height: 230px; max-height: auto;">
						<table class="table table-striped table-condensed">
							<tbody id="PatientBMIInfoTable">
							</tbody>
						</table>
						<input id="patBMI_BSA_ID" value="0" type="hidden"
							style="display: none;" />
					</div>					'
				</div>
			</div>
		</div>
	</div>
</div> -->
							<div class="footer-tools">
								<span class="go-top"> <i class="fa fa-chevron-up"></i>
									Top
								</span>
							</div>
						</div>
						<!-- /CONTENT-->
					</div>
				</div>
			</div>
		</section>
		<!--/PAGE -->
		<!-- JAVASCRIPTS -->
		<!-- Placed at the end of the document so the pages load faster -->
		<!-- JQUERY -->
		<script src="ehat-design/js/jquery/jquery-2.0.3.min.js"></script>
		<!-- JQUERY UI-->
		<script
			src="ehat-design/js/jquery-ui-1.10.3.custom/js/jquery-ui-1.10.3.custom.min.js"></script>
		<!-- BOOTSTRAP -->
		<script src="ehat-design/bootstrap-dist/js/bootstrap.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/select2/select2.min.js"></script>

		<!-- DATE RANGE PICKER -->
		<script src="ehat-design/js/bootstrap-daterangepicker/moment.min.js"></script>

		<script
			src="ehat-design/js/bootstrap-daterangepicker/daterangepicker.min.js"></script>
		<!-- SLIMSCROLL -->
		<script
			src="ehat-design/js/jQuery-slimScroll-1.3.0/jquery.slimscroll.min.js"></script>
		<script type="text/javascript"
			src="ehat-design/js/jQuery-slimScroll-1.3.0/slimScrollHorizontal.min.js"></script>
		<!-- BLOCK UI -->
		<script src="ehat-design/js/jQuery-BlockUI/jquery.blockUI.min.js"></script>
		<!-- COOKIE -->
		<script src="ehat-design/js/jQuery-Cookie/jquery.cookie.min.js"></script>
		<!-- CUSTOM SCRIPT -->
		<script src="ehat-design/js/script.js"></script>
		<script src="auto/bootstrap-typeahead.js"></script>
 		<!-- <script>
// Remember set you events before call bootstrapSwitch or they will fire after bootstrapSwitch's events
$("[name='checkbox1']").change(function() {
	if(!confirm('Do you wanna cancel me!')) {
		this.checked = true;
	}
});

$("[name='checkbox1']").bootstrapSwitch();

$("[name='checkbox1']").bootstrapSwitch({
		  on: 'On',
		  off: 'Off ',
		  onLabel: '&nbsp;&nbsp;&nbsp;',
		  offLabel: '&nbsp;&nbsp;&nbsp;',
		  same: false,//same labels for on/off states
		  size: 'md',
		  onClass: 'primary',
		  offClass: 'default'
		});
</script>  -->
		<script>
			jQuery(document).ready(function() {
				App.setPage("tabs_accordions"); //Set current page
				App.init(); //Initialise plugins and elements
				$(function() {
					$('[data-toggle="tooltip"]').tooltip();
				});
				fetchComplaint();
				fetchClinical();
				fetchHistory();
				fetchUnit();
				fetchDoctor();
				fetchHistory();
				//fetchService();
				fetchbilldetails();

				/* $(function() {
					  $(".mGrid >input").on('keyup', function(e) {
					    if (e.which === 13) {
					      $(this).next('input').focus();
					    }
					  });
					}); */
					$('input:checkbox').bootstrapSwitch();
					$(document).ready(function() {
						  $("#divEntry1").click(function() {
						    $("#divEntry1").hide();
						  });
						});
			});
		</script>
		<input type="hidden" id="complaintId" value="0">
		<input type="hidden" id="historyId" value="0">
		<input type="hidden" id="clinicalId" value="0">
		<!-- <input type="hidden" id="Doctor_ID" value="0"> -->
		<input type="hidden" id="charges1" value="0">
		<input type="hidden" id="investigationtestId" value="0">
		<input type="hidden" id="idTestSlave" value="0">
		<input type="hidden" id="subserviceid" value="0">
		<input type="hidden" id="serviceid" value="0">
		<input type="hidden" id="iscombination" value="0">
		<input type="hidden" id="depdocdeskid" value="0">
		<!-- <input type="hidden" id="dept_id" value="0"> -->
		<input type="hidden" id="cpoeCharges2" value="" />
		<input type="hidden" value="0" id="SponsorsourceTypeId" />
		<input type="hidden" value="0" id="chargesSlaveId" />
		<input type="hidden" value="0" id="chargesfromConf" />
		<input type="hidden" value="insert" id="InvestigationQueryType" />
		<input type="hidden" value="0" id="billSlaveID" />
		<input type="hidden" value="0" id="investigationSlaveID" />
		<input type="hidden" value="0" id="billDetailsId">
		<input type="hidden" value="0" id="billidservice">
		<!-- <input type="hidden" id="unitId" value="1"> -->
		<input type="hidden" id="serviceId" value="0" />
		<input type="hidden" id="complaintcount" value="" />
		<input type="hidden" id="clinicalcount" value="" />
		<input type="hidden" id="historycount" value="" />
		<input type="hidden" id="familyhistorycount" value="" />
		<input type="hidden" id="tr_Id" value="0" />
		<input type="hidden" id="his_Id" value="0" />
		
		<input type="hidden" id="userId"
			value="<%=session.getAttribute("userId1")%>">
		<input type="hidden" id="unitId"
			value="<%=session.getAttribute("uId")%>">
	</c:if>
	<!-- /JAVASCRIPTS -->
</body>
</html>